import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { incomeSourceUpdateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;

  const parsed = await parseBody(req, incomeSourceUpdateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    const existing = await db.incomeSource.findFirst({
      where: { id, ownerId: guard.user.id },
    });
    if (!existing) return ERR.NOT_FOUND();

    const source = await db.incomeSource.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.type !== undefined && { type: body.type }),
        ...(body.amount !== undefined && { amount: body.amount }),
        ...(body.frequency !== undefined && { frequency: body.frequency }),
        ...(body.active !== undefined && { active: body.active }),
        ...(body.nextPaymentDate !== undefined && {
          nextPaymentDate: body.nextPaymentDate ? new Date(body.nextPaymentDate) : null,
        }),
        ...(body.notes !== undefined && { notes: body.notes }),
      },
    });
    return ok(source);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;
  try {
    const existing = await db.incomeSource.findFirst({
      where: { id, ownerId: guard.user.id },
    });
    if (!existing) return ERR.NOT_FOUND();
    await db.incomeSource.delete({ where: { id } });
    return ok({ id });
  } catch {
    return ERR.INTERNAL();
  }
}
