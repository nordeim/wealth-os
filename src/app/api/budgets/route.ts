import { db, isTransientDbError } from "@/lib/db";
import { ERR, isGuarded, logApiError, ok, parseBody, requireSession } from "@/lib/api";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { budgetUpsertSchema, budgetDeleteSchema } from "@/lib/schemas";
import { Prisma } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    // R-10 (session 214): budgets are the session user's own rows.
    const budgets = await db.budget.findMany({
      where: { ownerId: guard.user.id },
      orderBy: [{ category: "asc" }],
    });
    return ok(budgets);
  } catch (error) {
    logApiError("budgets GET", error);
    if (isTransientDbError(error)) return ERR.UNAVAILABLE();
    return ERR.INTERNAL();
  }
}

/** Upsert by (ownerId, category, period) — the Settings/Budget surfaces
 *  edit the monthly ceiling per category; a re-POST of the same category
 *  updates the amount instead of duplicating the row. R-10 (session 214):
 *  the key grows the owner dimension — one ceiling per category PER USER. */
export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-219 (R-16, F-219m): the sessioned-CRUD writes bucket —
  // 60 / 15 min / IP across the resource family (the import route's
  // own 5/15 cap was bypassable via direct single-row POSTs).
  const limit = rateLimit(`writes:${clientKey(req)}`, 60, 15 * 60 * 1000);
  sweepRateLimits();
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  const parsed = await parseBody(req, budgetUpsertSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    const budget = await db.budget.upsert({
      where: {
        ownerId_category_period: {
          ownerId: guard.user.id,
          category: body.category,
          period: body.period,
        },
      },
      update: { amount: body.amount },
      create: {
        ownerId: guard.user.id,
        category: body.category,
        amount: body.amount,
        period: body.period,
      },
    });
    return ok(budget);
  } catch (error) {
    // Session-229 (R-26, F-229b): the concurrent-create race — two
    // first-writes for the same (owner, category, period) both miss
    // the upsert's read and the loser surfaces P2002 on the unique
    // key. The settings family's arm (F-215i): recover gracefully.
    // A single retry is semantically correct here — the winner's row
    // now exists, the update arm fires, and the loser's amount
    // applies last-writer-wins exactly like any concurrent update.
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      try {
        const budget = await db.budget.upsert({
          where: {
            ownerId_category_period: {
              ownerId: guard.user.id,
              category: body.category,
              period: body.period,
            },
          },
          update: { amount: body.amount },
          create: {
            ownerId: guard.user.id,
            category: body.category,
            amount: body.amount,
            period: body.period,
          },
        });
        return ok(budget);
      } catch (retryError) {
        logApiError("budgets POST (P2002 retry)", retryError);
        if (isTransientDbError(retryError)) return ERR.UNAVAILABLE();
        return ERR.INTERNAL();
      }
    }
    logApiError("budgets POST", error);
    if (isTransientDbError(error)) return ERR.UNAVAILABLE();
    return ERR.INTERNAL();
  }
}

export async function DELETE(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-220 (R-17, F-220c): the writes bucket — the family's DELETE
  // arm (the collection POST above already carries it).
  const limit = rateLimit(`writes:${clientKey(req)}`, 60, 15 * 60 * 1000);
  sweepRateLimits();
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  const parsed = await parseBody(req, budgetDeleteSchema);
  if (!parsed.ok) return parsed.response;

  try {
    // Session-228 (R-25, F-228j): the count feeds a NOT_FOUND arm — the
    // [id] families' conditional-mutation doctrine (R-24/F-227c) made
    // count===0 → 404 the house norm; a miss answering the hit's
    // envelope exactly was the one diverging mutation surface.
    const res = await db.budget.deleteMany({
      where: { ownerId: guard.user.id, category: parsed.data.category, period: "monthly" },
    });
    if (res.count === 0) return ERR.NOT_FOUND("Budget");
    return ok({ category: parsed.data.category });
  } catch (error) {
    logApiError("budgets DELETE", error);
    if (isTransientDbError(error)) return ERR.UNAVAILABLE();
    return ERR.INTERNAL();
  }
}
