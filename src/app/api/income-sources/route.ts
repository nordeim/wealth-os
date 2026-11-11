import { db } from "@/lib/db";
import { ERR, isGuarded, logApiError, ok, parseBody, requireSession } from "@/lib/api";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { incomeSourceCreateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const sources = await db.incomeSource.findMany({
      where: { ownerId: guard.user.id },
      orderBy: [{ active: "desc" }, { name: "asc" }],
    });
    return ok(sources);
  } catch (error) {
    logApiError("income-sources GET", error);
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

  const parsed = await parseBody(req, incomeSourceCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    const source = await db.incomeSource.create({
      data: {
        name: body.name,
        type: body.type,
        amount: body.amount,
        frequency: body.frequency,
        active: body.active,
        nextPaymentDate: body.nextPaymentDate ? new Date(body.nextPaymentDate) : null,
        notes: body.notes,
        ownerId: guard.user.id,
      },
    });
    return ok(source);
  } catch (error) {
    logApiError("income-sources POST", error);
    return ERR.INTERNAL();
  }
}
