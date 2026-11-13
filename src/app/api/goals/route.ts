import { db, isTransientDbError } from "@/lib/db";
import { ERR, isGuarded, logApiError, ok, parseBody, requireSession } from "@/lib/api";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { goalCreateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const goals = await db.goal.findMany({
      where: { ownerId: guard.user.id },
      orderBy: [{ status: "asc" }, { targetDate: "asc" }],
    });
    return ok(goals);
  } catch (error) {
    logApiError("goals GET", error);
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

  const parsed = await parseBody(req, goalCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    const goal = await db.goal.create({
      data: {
        name: body.name,
        targetAmount: body.targetAmount,
        currentAmount: body.currentAmount,
        targetDate: body.targetDate ? new Date(body.targetDate) : null,
        category: body.category,
        status: body.status,
        icon: body.icon,
        ownerId: guard.user.id,
      },
    });
    return ok(goal);
  } catch (error) {
    logApiError("goals POST", error);
    if (isTransientDbError(error)) return ERR.UNAVAILABLE();
    return ERR.INTERNAL();
  }
}
