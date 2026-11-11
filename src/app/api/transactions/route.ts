import { db } from "@/lib/db";
import { ERR, isGuarded, logApiError, ok, parseBody, requireSession } from "@/lib/api";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { transactionCreateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

// Session-222 (R-19, F-222p — recorded, not cured): the family GETs
// ride unbucketed BY DESIGN — the same F-219m per-navigation class as
// /api/dashboard (the store's refreshAll fires this family on every
// hydrate; capping it re-trips the e2e battery, the sweep toolchain,
// and any fast-navigating user inside one window). The dashboard
// route's docblock carries the original decode; this note extends the
// documented posture to the whole authenticated light-read family.
export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const transactions = await db.transaction.findMany({
      where: { ownerId: guard.user.id },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });
    return ok(transactions);
  } catch (error) {
    logApiError("transactions GET", error);
    return ERR.INTERNAL();
  }
}

export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-219 (R-16, F-219m): the sessioned-CRUD writes bucket —
  // 60 / 15 min / IP across the resource family (the import route's
  // own 5/15 cap was bypassable via direct single-row POSTs).
  const limit = rateLimit(`writes:${clientKey(req)}`, 60, 15 * 60 * 1000);
  sweepRateLimits();
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

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
  } catch (error) {
    logApiError("transactions POST", error);
    return ERR.INTERNAL();
  }
}
