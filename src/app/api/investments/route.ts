import { db, isTransientDbError } from "@/lib/db";
import { ERR, isGuarded, logApiError, ok, parseBody, requireSession } from "@/lib/api";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { investmentCreateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const investments = await db.investment.findMany({
      where: { ownerId: guard.user.id },
      orderBy: [{ createdAt: "asc" }],
    });
    return ok(investments);
  } catch (error) {
    logApiError("investments GET", error);
    if (isTransientDbError(error)) return ERR.UNAVAILABLE();
    return ERR.INTERNAL();
  }
}

export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-219 (R-16, F-219m): the sessioned-CRUD writes bucket —
  // 60 / 15 min / IP across the resource family (the import route's
  // own 5/15 cap was bypassable via direct single-row POSTs).
  const limit = rateLimit(`writes:${clientKey(req)}`, 60, 15 * 60 * 1000);
  sweepRateLimits();
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  const parsed = await parseBody(req, investmentCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    const investment = await db.investment.create({
      data: {
        symbol: body.symbol,
        name: body.name,
        type: body.type,
        shares: body.shares,
        avgCost: body.avgCost,
        currentValue: body.currentValue,
        purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : null,
        notes: body.notes,
        ownerId: guard.user.id,
      },
    });
    return ok(investment);
  } catch (error) {
    logApiError("investments POST", error);
    if (isTransientDbError(error)) return ERR.UNAVAILABLE();
    return ERR.INTERNAL();
  }
}
