import { db } from "@/lib/db";
import { ERR, asString, isGuarded, logApiError, ok, requireSession } from "@/lib/api";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { sanitizeSearchQuery } from "@/lib/search-query";

export const dynamic = "force-dynamic";

/** Global search — descriptions/categories/institutions/symbols/goals
 *  across the finance families (the shell's "Search" genus). */
export async function GET(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-219 (R-16, F-219m): the heavy-read bucket — 60 / 15 min / IP
  // (the six-full-table findMany dashboard read + the full-dataset
  // export were unbounded; search rides its own lighter cap).
  const limit = rateLimit(`search:${clientKey(req)}`, 60, 15 * 60 * 1000);
  sweepRateLimits();
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  const url = new URL(req.url);
  // Session-224 (R-21, F-224j): the LIKE-metacharacter strip — a
  // literal "%"/"_" query must not act as a wildcard (the seam's
  // docblock carries the decode; the min-length check runs AFTER the
  // strip so a wildcard-only query short-circuits to the empty
  // result).
  const q = sanitizeSearchQuery(
    asString(url.searchParams.get("q"), { max: 80 }) ?? "",
  ).toLowerCase();
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
  } catch (error) {
    logApiError("search GET", error);
    return ERR.INTERNAL();
  }
}
