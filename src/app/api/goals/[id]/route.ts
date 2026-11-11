import { db, isRecordNotFound } from "@/lib/db";
import { ERR, isGuarded, logApiError, ok, parseBody, requireSession } from "@/lib/api";
import { goalUpdateSchema } from "@/lib/schemas";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-220 (R-17, F-220c): the writes bucket on the [id] mutations —
  // the F-219m family the collection POSTs already carry (a direct
  // single-row PUT/DELETE loop is the same unthrottled bypass).
  const limit = rateLimit(`writes:${clientKey(req)}`, 60, 15 * 60 * 1000);
  sweepRateLimits();
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);
  const { id } = await params;

  const parsed = await parseBody(req, goalUpdateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    // Session-227 (R-24, F-227c): the atomic conditional form — ownerId
    // rides the mutation's WHERE (the reset-password precedent), closing
    // the guard-then-mutate TOCTOU. count===0 answers NOT_FOUND and a
    // fresh re-read feeds the envelope (the store refreshes after every
    // mutation and never consumes the stale record).
    const result = await db.goal.updateMany({
      where: { id, ownerId: guard.user.id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.targetAmount !== undefined && { targetAmount: body.targetAmount }),
        ...(body.currentAmount !== undefined && { currentAmount: body.currentAmount }),
        ...(body.targetDate !== undefined && {
          targetDate: body.targetDate ? new Date(body.targetDate) : null,
        }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.icon !== undefined && { icon: body.icon ?? null }),
      },
    });
    if (result.count === 0) return ERR.NOT_FOUND();
    const goal = await db.goal.findFirst({
      where: { id, ownerId: guard.user.id },
    });
    if (!goal) return ERR.NOT_FOUND();
    return ok(goal);
  } catch (e) {
    logApiError("goals/:id PUT", e);
    // Session-222 (R-19, F-222o): a record that vanished between the
    // findFirst and the mutation is NOT_FOUND, never INTERNAL.
    if (isRecordNotFound(e)) return ERR.NOT_FOUND();
    return ERR.INTERNAL();
  }
}

export async function DELETE(req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-220 (R-17, F-220c): the writes bucket on the [id] mutations —
  // the F-219m family the collection POSTs already carry (a direct
  // single-row PUT/DELETE loop is the same unthrottled bypass).
  const limit = rateLimit(`writes:${clientKey(req)}`, 60, 15 * 60 * 1000);
  sweepRateLimits();
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);
  const { id } = await params;
  try {
    // Session-227 (R-24, F-227c): the atomic conditional form — ownerId
    // rides the mutation's WHERE (the reset-password precedent).
    const result = await db.goal.deleteMany({
      where: { id, ownerId: guard.user.id },
    });
    if (result.count === 0) return ERR.NOT_FOUND();
    return ok({ id });
  } catch (e) {
    logApiError("goals/:id DELETE", e);
    // Session-222 (R-19, F-222o): a record that vanished between the
    // findFirst and the mutation is NOT_FOUND, never INTERNAL.
    if (isRecordNotFound(e)) return ERR.NOT_FOUND();
    return ERR.INTERNAL();
  }
}
