import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { investmentCreateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const investments = await db.investment.findMany({
      where: { ownerId: guard.user.id },
      orderBy: [{ createdAt: "asc" }],
    });
    return ok(investments);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  const parsed = await parseBody(req, investmentCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    const investment = await db.investment.create({
      data: {
        symbol: body.symbol,
        name: body.name,
        type: body.type,
        shares: body.shares,
        avgCost: body.avgCost,
        currentValue: body.currentValue,
        purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : null,
        notes: body.notes,
        ownerId: guard.user.id,
      },
    });
    return ok(investment);
  } catch {
    return ERR.INTERNAL();
  }
}
