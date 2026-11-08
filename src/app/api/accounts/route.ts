import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { bankAccountCreateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const accounts = await db.bankAccount.findMany({
      where: { ownerId: guard.user.id },
      orderBy: [{ createdAt: "asc" }],
    });
    return ok(accounts);
  } catch {
    return ERR.INTERNAL();
  }
}

export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  const parsed = await parseBody(req, bankAccountCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    const account = await db.bankAccount.create({
      data: {
        name: body.name,
        type: body.type,
        institution: body.institution,
        balance: body.balance,
        currency: body.currency,
        color: body.color,
        ownerId: guard.user.id,
      },
    });
    return ok(account);
  } catch {
    return ERR.INTERNAL();
  }
}
