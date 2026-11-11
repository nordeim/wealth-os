import { db, isForeignKeyViolation, isRecordNotFound } from "@/lib/db";
import { ERR, isGuarded, logApiError, ok, parseBody, requireSession } from "@/lib/api";
import { transactionUpdateSchema } from "@/lib/schemas";
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

  const parsed = await parseBody(req, transactionUpdateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    if (body.accountId) {
      const account = await db.bankAccount.findFirst({
        where: { id: body.accountId, ownerId: guard.user.id },
      });
      if (!account) return ERR.BAD_REQUEST("Selected account does not exist");
    }

    // Session-227 (R-24, F-227c): the atomic conditional form — ownerId
    // rides the mutation's WHERE (the reset-password precedent), closing
    // the guard-then-mutate TOCTOU. count===0 answers NOT_FOUND and a
    // fresh re-read feeds the envelope (the store refreshes after every
    // mutation and never consumes the stale record).
    const result = await db.transaction.updateMany({
      where: { id, ownerId: guard.user.id },
      data: {
        ...(body.description !== undefined && { description: body.description }),
        ...(body.amount !== undefined && { amount: body.amount }),
        ...(body.type !== undefined && { type: body.type }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.budgetCategory !== undefined && { budgetCategory: body.budgetCategory }),
        ...(body.date !== undefined && { date: new Date(body.date) }),
        ...(body.notes !== undefined && { notes: body.notes }),
        ...(body.recurring !== undefined && { recurring: body.recurring }),
        ...(body.nextDate !== undefined && {
          nextDate: body.nextDate ? new Date(body.nextDate) : null,
        }),
        ...(body.accountId !== undefined && { accountId: body.accountId ?? null }),
      },
    });
    if (result.count === 0) return ERR.NOT_FOUND();
    const transaction = await db.transaction.findFirst({
      where: { id, ownerId: guard.user.id },
    });
    if (!transaction) return ERR.NOT_FOUND();
    return ok(transaction);
  } catch (e) {
    logApiError("transactions/:id PUT", e);
    // Session-222 (R-19, F-222o): a record that vanished between the
    // guard and the mutation is NOT_FOUND, never INTERNAL.
    if (isForeignKeyViolation(e)) return ERR.BAD_REQUEST("Selected account does not exist");
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
    const result = await db.transaction.deleteMany({
      where: { id, ownerId: guard.user.id },
    });
    if (result.count === 0) return ERR.NOT_FOUND();
    return ok({ id });
  } catch (e) {
    logApiError("transactions/:id DELETE", e);
    // Session-222 (R-19, F-222o): a record that vanished between the
    // guard and the mutation is NOT_FOUND, never INTERNAL.
    if (isRecordNotFound(e)) return ERR.NOT_FOUND();
    return ERR.INTERNAL();
  }
}
