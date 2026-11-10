import { db } from "@/lib/db";
import { ERR, isGuarded, requireSession } from "@/lib/api";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** GDPR-compliant full export — the Settings page's "Export All Data"
 *  button (live-observed copy: "Download all your data in JSON format.
 *  This includes expenses, income, goals, and account information."). */
export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  try {
    const [transactions, incomeSources, accounts, investments, goals, budgets] =
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
      ]);

    const payload = {
      exportedAt: new Date().toISOString(),
      format: "wealthos-export-v1",
      user: { email: guard.user.email, name: guard.user.name },
      data: {
        transactions,
        incomeSources,
        accounts,
        investments,
        goals,
        budgets,
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
