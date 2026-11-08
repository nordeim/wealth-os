import { db } from "@/lib/db";
import { ok, ERR, asString, isGuarded, requireSession } from "@/lib/api";

export const dynamic = "force-dynamic";

/** Global search — descriptions/categories/institutions/symbols/goals
 *  across the finance families (the shell's "Search" genus). */
export async function GET(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  const url = new URL(req.url);
  const q = (asString(url.searchParams.get("q"), { max: 80 }) ?? "").toLowerCase();
  if (q.length < 2) {
    return ok({ transactions: [], accounts: [], investments: [], goals: [] });
  }

  try {
    const [transactions, accounts, investments, goals] = await Promise.all([
      db.transaction.findMany({
        where: {
          ownerId: guard.user.id,
          OR: [
            { description: { contains: q } },
            { category: { contains: q } },
            { notes: { contains: q } },
          ],
        },
        take: 5,
        orderBy: [{ date: "desc" }],
      }),
      db.bankAccount.findMany({
        where: {
          ownerId: guard.user.id,
          OR: [
            { name: { contains: q } },
            { institution: { contains: q } },
          ],
        },
        take: 5,
        orderBy: { name: "asc" },
      }),
      db.investment.findMany({
        where: {
          ownerId: guard.user.id,
          OR: [
            { symbol: { contains: q } },
            { name: { contains: q } },
          ],
        },
        take: 5,
        orderBy: { symbol: "asc" },
      }),
      db.goal.findMany({
        where: {
          ownerId: guard.user.id,
          OR: [{ name: { contains: q } }, { category: { contains: q } }],
        },
        take: 5,
        orderBy: { name: "asc" },
      }),
    ]);
    return ok({ transactions, accounts, investments, goals });
  } catch {
    return ERR.INTERNAL();
  }
}
