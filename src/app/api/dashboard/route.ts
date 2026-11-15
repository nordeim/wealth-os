import { db, isTransientDbError } from "@/lib/db";
import { ERR, isGuarded, logApiError, ok, requireSession } from "@/lib/api";

export const dynamic = "force-dynamic";

/** The dashboard aggregate: one envelope carrying every family the
 *  Financial Dashboard renders (KPIs, cash-flow, health, breakdown,
 *  budgets, upcoming, recent, goals, portfolio, AI insights). The pure
 *  derivation happens client-side through src/lib/finance.ts + ai.ts —
 *  the route stays a thin, owner-scoped read. */
export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  // Session-219 (R-16, F-219m — the design refinement): NO bucket here
  // by design. The aggregate read fires on EVERY navigation (hydrate) —
  // the e2e battery, the sweep/fullpage/census toolchain, and any real
  // user navigating fast all legitimately exceed any per-IP cap inside
  // one window (the maiden census run tripped it mid-run). The heavy
  // EXPLICIT actions carry the buckets instead: writes (60/15), export
  // (240/15), search (60/15), import (5/15), coach (30/15).
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
        // Session-251 (R-48, F-251d): the projection widens to the full
        // User shape — the store commits this payload `as User`, and the
        // narrowed four-field form left photoUrl/role runtime-undefined
        // under the full-shape type (both fields already ride
        // requireSession's F-228h select, so this adds no query and
        // exposes nothing the session guard does not already carry).
        photoUrl: guard.user.photoUrl,
        role: guard.user.role,
      },
    });
  } catch (error) {
    logApiError("dashboard GET", error);
    if (isTransientDbError(error)) return ERR.UNAVAILABLE();
    return ERR.INTERNAL();
  }
}
