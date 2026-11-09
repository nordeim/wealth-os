import { db } from "@/lib/db";
import { ok, ERR, isGuarded, requireSession } from "@/lib/api";

export const dynamic = "force-dynamic";

/** The dashboard aggregate: one envelope carrying every family the
 *  Financial Dashboard renders (KPIs, cash-flow, health, breakdown,
 *  budgets, upcoming, recent, goals, portfolio, AI insights). The pure
 *  derivation happens client-side through src/lib/finance.ts + ai.ts —
 *  the route stays a thin, owner-scoped read. */
export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const [transactions, incomeSources, accounts, investments, goals, budgets] =
      await Promise.all([
        db.transaction.findMany({
          where: { ownerId: guard.user.id },
          orderBy: [{ date: "desc" }, { createdAt: "desc" }],
        }),
        db.incomeSource.findMany({ where: { ownerId: guard.user.id } }),
        db.bankAccount.findMany({ where: { ownerId: guard.user.id } }),
        db.investment.findMany({ where: { ownerId: guard.user.id } }),
        db.goal.findMany({ where: { ownerId: guard.user.id } }),
        db.budget.findMany({ where: { ownerId: guard.user.id } }),
      ]);

    return ok({
      transactions,
      incomeSources,
      accounts,
      investments,
      goals,
      budgets,
      user: {
        id: guard.user.id,
        name: guard.user.name,
        email: guard.user.email,
        avatarColor: guard.user.avatarColor,
      },
    });
  } catch {
    return ERR.INTERNAL();
  }
}
