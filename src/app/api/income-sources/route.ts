import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
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
  } catch {
    return ERR.INTERNAL();
  }
}

export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

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
  } catch {
    return ERR.INTERNAL();
  }
}
