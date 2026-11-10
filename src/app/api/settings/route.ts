import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { settingsUpdateSchema } from "@/lib/schemas";
import { Prisma } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

/**
 * The session user's settings row — per-user since R-10 (session 214,
 * F-214c): the install-wide "singleton" died with the owner-scoping
 * round. Lazily created on first read (any user who never touched
 * Settings still gets the defaults); one row per user, keyed by ownerId.
 *
 * Session-215 (R-12, F-215i — the lazy-create race): two concurrent
 * first-touch reads both find null and both create; the loser used to
 * die on the Setting.ownerId unique constraint (P2002) and surface a
 * 500. The catch now re-reads the winner's row — the loser's answer is
 * identical to a single-touch read.
 */
async function readSettings(ownerId: string) {
  const existing = await db.setting.findUnique({ where: { ownerId } });
  const row =
    existing ??
    (await db.setting
      .create({ data: { ownerId } })
      .catch((e: unknown) => {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === "P2002"
        ) {
          // The unique-constraint race: the other first-touch request won.
          return db.setting.findUniqueOrThrow({ where: { ownerId } });
        }
        throw e;
      }));
  return {
    defaultCurrency: row.defaultCurrency,
    dateFormat: row.dateFormat,
    pushNotifications: row.pushNotifications,
    emailAlerts: row.emailAlerts,
    budgetWarnings: row.budgetWarnings,
    monthlyReports: row.monthlyReports,
    theme: row.theme,
  };
}

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    return ok(await readSettings(guard.user.id));
  } catch {
    return ERR.INTERNAL();
  }
}

export async function PUT(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-220 (R-17, F-220c): the writes bucket — the sessioned
  // mutation family (the F-219m threat model names settings).
  const limit = rateLimit(`writes:${clientKey(req)}`, 60, 15 * 60 * 1000);
  sweepRateLimits();
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  const parsed = await parseBody(req, settingsUpdateSchema);
  if (!parsed.ok) return parsed.response;

  try {
    await readSettings(guard.user.id); // lazily create the user's row
    await db.setting.update({
      where: { ownerId: guard.user.id },
      data: parsed.data,
    });
    return ok(await readSettings(guard.user.id));
  } catch {
    return ERR.INTERNAL();
  }
}
