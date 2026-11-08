import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { budgetUpsertSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const budgets = await db.budget.findMany({
      orderBy: [{ category: "asc" }],
    });
    return ok(budgets);
  } catch {
    return ERR.INTERNAL();
  }
}

/** Upsert by (category, period) — the Settings/Budget surfaces edit the
 *  monthly ceiling per category; a re-POST of the same category updates
 *  the amount instead of duplicating the row. */
export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  const parsed = await parseBody(req, budgetUpsertSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    const budget = await db.budget.upsert({
      where: { category_period: { category: body.category, period: body.period } },
      update: { amount: body.amount },
      create: { category: body.category, amount: body.amount, period: body.period },
    });
    return ok(budget);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function DELETE(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  const parsed = await parseBody(req, (await import("@/lib/schemas")).budgetDeleteSchema);
  if (!parsed.ok) return parsed.response;

  try {
    await db.budget.deleteMany({
      where: { category: parsed.data.category, period: "monthly" },
    });
    return ok({ category: parsed.data.category });
  } catch {
    return ERR.INTERNAL();
  }
}
