import { db } from "@/lib/db";
import { ERR, MAX_IMPORT_BODY_BYTES, isGuarded, logApiError, ok, parseBody, requireSession } from "@/lib/api";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { csvImportSchema } from "@/lib/schemas";
import { BUDGET_CATEGORIES, EXPENSE_CATEGORIES } from "@/lib/constants";

export const dynamic = "force-dynamic";

/** The Import page's commit step — validated rows (parsed + mapped
 *  client-side through the preview table) land here. Every row rides the
 *  csvImportSchema (Zod at the boundary); the response reports the
 *  created count. Session-216 (R-13, F-216a): the commit rides the
 *  import-specific body ceiling (MAX_IMPORT_BODY_BYTES, 4MB) — the
 *  16KB auth-family default rejected any real ≳140-row import against
 *  the page's own 5000-row contract. */
export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-218 (R-15, F-218g): a 4MB / 5000-row createMany per call —
  // 5 / 15 min / IP (the e2e battery's one import leg rides comfortably
  // under it; the sessioned-bucket pattern).
  const limit = rateLimit(`import:${clientKey(req)}`, 5, 15 * 60 * 1000);
  sweepRateLimits();
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  const parsed = await parseBody(req, csvImportSchema, MAX_IMPORT_BODY_BYTES);
  if (!parsed.ok) return parsed.response;
  const rows = parsed.data.rows;

  try {
    const created = await db.transaction.createMany({
      data: rows.map((r) => ({
        description: r.description,
        amount: r.amount,
        type: r.type,
        category: r.category || "Other",
        budgetCategory: r.budgetCategory,
        date: new Date(r.date),
        ownerId: guard.user.id,
      })),
    });
    return ok({ imported: created.count });
  } catch (error) {
    logApiError("import POST", error);
    return ERR.INTERNAL();
  }
}

/** Column-hint vocabulary for the client's mapping UI: the known
 *  description/date/amount/category headers (case/space-insensitive
 *  contains) + the budget-category inference from the category label. */
export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  return ok({
    categories: EXPENSE_CATEGORIES.map((c) => ({
      label: c.label,
      budgetCategory: c.budgetCategory,
    })),
    budgetCategories: BUDGET_CATEGORIES,
  });
}
