import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
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
  } catch {
    return ERR.INTERNAL();
  }
}

export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

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
  } catch {
    return ERR.INTERNAL();
  }
}
