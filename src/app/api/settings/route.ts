import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { settingsUpdateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

async function readSettings() {
  let row = await db.setting.findUnique({ where: { id: "singleton" } });
  if (!row) {
    row = await db.setting.create({ data: { id: "singleton" } });
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
    return ok(await readSettings());
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
    await readSettings(); // lazily create the singleton
    await db.setting.update({
      where: { id: "singleton" },
      data: parsed.data,
    });
    return ok(await readSettings());
  } catch {
    return ERR.INTERNAL();
  }
}
