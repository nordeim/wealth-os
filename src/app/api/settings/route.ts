import { db, isTransientDbError } from "@/lib/db";
import { ERR, isGuarded, logApiError, ok, parseBody, requireSession } from "@/lib/api";
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
  } catch (error) {
    logApiError("settings GET", error);
    if (isTransientDbError(error)) return ERR.UNAVAILABLE();
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
    // Session-239 (R-36, F-239g): the upsert — the budgets-POST house
    // form — replaces the read-create-then-update pair. One round-trip
    // on the hot path (the old form made three: lazy-create, update,
    // re-read); the vanishing-row window between the lazy create and
    // the update (a P2025 surfacing as a 500) can no longer open; the
    // create arm carries the lazy-create contract the pair had.
    const row = await db.setting
      .upsert({
        where: { ownerId: guard.user.id },
        update: parsed.data,
        create: { ownerId: guard.user.id, ...parsed.data },
      })
      .catch(async (e: unknown) => {
        // The budgets family's concurrent-first-touch race (F-229b):
        // two first-writes both miss the upsert's read and the loser
        // hits the ownerId unique constraint — a single retry is
        // semantically correct (the winner's row now exists, the
        // update arm fires, last-writer-wins exactly like any
        // concurrent update).
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === "P2002"
        ) {
          return db.setting.upsert({
            where: { ownerId: guard.user.id },
            update: parsed.data,
            create: { ownerId: guard.user.id, ...parsed.data },
          });
        }
        throw e;
      });
    return ok({
      defaultCurrency: row.defaultCurrency,
      dateFormat: row.dateFormat,
      pushNotifications: row.pushNotifications,
      emailAlerts: row.emailAlerts,
      budgetWarnings: row.budgetWarnings,
      monthlyReports: row.monthlyReports,
      theme: row.theme,
    });
  } catch (error) {
    logApiError("settings PUT", error);
    if (isTransientDbError(error)) return ERR.UNAVAILABLE();
    return ERR.INTERNAL();
  }
}
