import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { transactionCreateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const transactions = await db.transaction.findMany({
      where: { ownerId: guard.user.id },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });
    return ok(transactions);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  const parsed = await parseBody(req, transactionCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    if (body.accountId) {
      const account = await db.bankAccount.findFirst({
        where: { id: body.accountId, ownerId: guard.user.id },
      });
      if (!account) return ERR.BAD_REQUEST("Selected account does not exist");
    }

    const transaction = await db.transaction.create({
      data: {
        description: body.description,
        amount: body.amount,
        type: body.type,
        category: body.category,
        budgetCategory: body.budgetCategory,
        date: new Date(body.date),
        notes: body.notes,
        recurring: body.recurring,
        nextDate: body.nextDate ? new Date(body.nextDate) : null,
        accountId: body.accountId ?? null,
        ownerId: guard.user.id,
      },
    });
    return ok(transaction);
  } catch {
    return ERR.INTERNAL();
  }
}
