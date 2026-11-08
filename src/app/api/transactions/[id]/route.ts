import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { transactionUpdateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;

  const parsed = await parseBody(req, transactionUpdateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    const existing = await db.transaction.findFirst({
      where: { id, ownerId: guard.user.id },
    });
    if (!existing) return ERR.NOT_FOUND();

    if (body.accountId) {
      const account = await db.bankAccount.findFirst({
        where: { id: body.accountId, ownerId: guard.user.id },
      });
      if (!account) return ERR.BAD_REQUEST("Selected account does not exist");
    }

    const transaction = await db.transaction.update({
      where: { id },
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
    return ok(transaction);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;
  try {
    const existing = await db.transaction.findFirst({
      where: { id, ownerId: guard.user.id },
    });
    if (!existing) return ERR.NOT_FOUND();
    await db.transaction.delete({ where: { id } });
    return ok({ id });
  } catch {
    return ERR.INTERNAL();
  }
}
