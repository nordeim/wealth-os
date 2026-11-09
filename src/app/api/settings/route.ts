import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { settingsUpdateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

/**
 * The session user's settings row — per-user since R-10 (session 214,
 * F-214c): the install-wide "singleton" died with the owner-scoping
 * round. Lazily created on first read (any user who never touched
 * Settings still gets the defaults); one row per user, keyed by ownerId.
 */
async function readSettings(ownerId: string) {
  let row = await db.setting.findUnique({ where: { ownerId } });
  if (!row) {
    row = await db.setting.create({ data: { ownerId } });
  }
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
