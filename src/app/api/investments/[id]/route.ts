import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { investmentUpdateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
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
  } catch {
    return ERR.INTERNAL();
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;
  try {
    const existing = await db.investment.findFirst({
      where: { id, ownerId: guard.user.id },
    });
    if (!existing) return ERR.NOT_FOUND();
    await db.investment.delete({ where: { id } });
    return ok({ id });
  } catch {
    return ERR.INTERNAL();
  }
}
