import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession, MAX_AI_BODY_BYTES } from "@/lib/api";
import { aiCoachSchema } from "@/lib/schemas";
import { getAiProvider } from "@/lib/ai";

export const dynamic = "force-dynamic";

/** The AI Coach chat endpoint. The deterministic local provider answers
 *  from the user's own finance context; an env-configured LLM provider
 *  can supersede it (src/lib/ai.ts — the provider seam). */
export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-217 (R-14, F-217b): the schema contracts history 30 × 4000
  // (the LLM-provider surface) — the 16KB default rejected the schema's
  // own worst case before validation ran. The route rides its own cap.
  const parsed = await parseBody(req, aiCoachSchema, MAX_AI_BODY_BYTES);
  if (!parsed.ok) return parsed.response;
  const { question, history } = parsed.data;

  try {
    const [transactions, incomeSources, investments, goals, budgets] =
      await Promise.all([
        db.transaction.findMany({
          where: { ownerId: guard.user.id },
          orderBy: [{ date: "desc" }, { createdAt: "desc" }],
        }),
        db.incomeSource.findMany({ where: { ownerId: guard.user.id } }),
        db.investment.findMany({ where: { ownerId: guard.user.id } }),
        db.goal.findMany({ where: { ownerId: guard.user.id } }),
        db.budget.findMany({ where: { ownerId: guard.user.id } }),
      ]);

    const provider = getAiProvider();
    const { answer } = provider.coach(question, {
      transactions,
      incomeSources,
      investments,
      goals,
      budgets,
    });
    // `history` rides the request for a future LLM provider; the local
    // engine is stateless per question (its answers embed the live
    // context), so it is deliberately unconsumed here.
    void history;
    return ok({ answer });
  } catch {
    return ERR.INTERNAL();
  }
}
