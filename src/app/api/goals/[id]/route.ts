import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { goalUpdateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;

  const parsed = await parseBody(req, goalUpdateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    const existing = await db.goal.findFirst({
      where: { id, ownerId: guard.user.id },
    });
    if (!existing) return ERR.NOT_FOUND();

    const goal = await db.goal.update({
      where: { id },
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
    return ok(goal);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;
  try {
    const existing = await db.goal.findFirst({
      where: { id, ownerId: guard.user.id },
    });
    if (!existing) return ERR.NOT_FOUND();
    await db.goal.delete({ where: { id } });
    return ok({ id });
  } catch {
    return ERR.INTERNAL();
  }
}
