import { db } from "@/lib/db";
import { ERR, isGuarded, requireSession } from "@/lib/api";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** GDPR-compliant full export — the Settings page's "Export All Data"
 *  button (live-observed copy: "Download all your data in JSON format.
 *  This includes expenses, income, goals, and account information."). */
export async function GET(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-219 (R-16, F-219m): the heavy-read bucket — 240 / 15 min / IP
  // (the six-full-table findMany read was unbounded; a co-tenant could
  // hammer it — the same class that earned the coach its 30/15 cap).
  const limit = rateLimit(`export:${clientKey(req)}`, 240, 15 * 60 * 1000);
  sweepRateLimits();
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  try {
    // Session-221 (R-18, F-221s): the settings row joins the dump — the
    // Settings page's own copy promises "Download all your data in JSON
    // format", and the per-user preferences (currency, date format,
    // notification booleans, theme — owner-keyed since R-10) were
    // absent, so a re-import into a fresh account silently lost them.
    // The profile metadata (photoUrl/createdAt) rides the user block.
    const [transactions, incomeSources, accounts, investments, goals, budgets, settings] =
      await Promise.all([
        db.transaction.findMany({
          where: { ownerId: guard.user.id },
          orderBy: [{ date: "desc" }],
        }),
        db.incomeSource.findMany({ where: { ownerId: guard.user.id } }),
        db.bankAccount.findMany({ where: { ownerId: guard.user.id } }),
        db.investment.findMany({ where: { ownerId: guard.user.id } }),
        db.goal.findMany({ where: { ownerId: guard.user.id } }),
        db.budget.findMany({ where: { ownerId: guard.user.id } }),
        db.setting.findFirst({ where: { ownerId: guard.user.id } }),
      ]);

    const payload = {
      exportedAt: new Date().toISOString(),
      format: "wealthos-export-v1",
      user: {
        email: guard.user.email,
        name: guard.user.name,
        photoUrl: guard.user.photoUrl,
        createdAt: guard.user.createdAt,
      },
      data: {
        transactions,
        incomeSources,
        accounts,
        investments,
        goals,
        budgets,
        settings,
      },
    };
    return new NextResponse(JSON.stringify(payload, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": 'attachment; filename="wealthos-export.json"',
        // Session-218 (R-15, F-218c): the GDPR dump rides the same
        // no-store posture as the envelope's financial GETs — this raw
        // response never passed through ok(), so the F-217g header
        // api.ts's comment names for it never landed (live-reproduced:
        // cc:null on the authenticated 200).
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return ERR.INTERNAL();
  }
}
