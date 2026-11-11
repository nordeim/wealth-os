import { db, isRecordNotFound } from "@/lib/db";
import { ERR, isGuarded, logApiError, ok, parseBody, requireSession } from "@/lib/api";
import { investmentUpdateSchema } from "@/lib/schemas";
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

  const parsed = await parseBody(req, investmentUpdateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    const existing = await db.investment.findFirst({
      where: { id, ownerId: guard.user.id },
    });
    if (!existing) return ERR.NOT_FOUND();

    const investment = await db.investment.update({
      where: { id },
      data: {
        ...(body.symbol !== undefined && { symbol: body.symbol }),
        ...(body.name !== undefined && { name: body.name }),
        ...(body.type !== undefined && { type: body.type }),
        ...(body.shares !== undefined && { shares: body.shares }),
        ...(body.avgCost !== undefined && { avgCost: body.avgCost }),
        ...(body.currentValue !== undefined && { currentValue: body.currentValue }),
        ...(body.purchaseDate !== undefined && {
          purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : null,
        }),
        ...(body.notes !== undefined && { notes: body.notes }),
      },
    });
    return ok(investment);
  } catch (e) {
    logApiError("investments/:id PUT", e);
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
    const existing = await db.investment.findFirst({
      where: { id, ownerId: guard.user.id },
    });
    if (!existing) return ERR.NOT_FOUND();
    await db.investment.delete({ where: { id } });
    return ok({ id });
  } catch (e) {
    logApiError("investments/:id DELETE", e);
    // Session-222 (R-19, F-222o): a record that vanished between the
    // findFirst and the mutation is NOT_FOUND, never INTERNAL.
    if (isRecordNotFound(e)) return ERR.NOT_FOUND();
    return ERR.INTERNAL();
  }
}
