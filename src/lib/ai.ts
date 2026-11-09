// The WealthOS AI seam — session-199.
//
// The reference calls Base44's hosted LLM for its AI Coach chat and the
// dashboard's AI Insights card. The self-hosted clone implements the
// SAME user-visible capability behind a provider interface with a
// deterministic local engine (rule-based financial analysis over the
// user's own data) so the feature is fully functional offline and
// unit-testable. An env-configured LLM provider can supersede it later
// without touching the callers (the replicate-web-app §3.1-D policy:
// never a hardcoded key, never a call to the reference's endpoint).

import {
  budgetVsActual,
  cashFlowSeries,
  deltaPct,
  expenseBreakdown,
  financialHealthScore,
  formatMoney,
  goalProgress,
  monthlyExpenses,
  monthlyIncomeFromTx,
  portfolioStats,
  previousMonth,
  savingsRate,
  unusualTransactions,
  type BudgetLike,
  type GoalLike,
  type IncomeSourceLike,
  type InvestmentLike,
  type TxLike,
} from "./finance";

export interface AiContext {
  transactions: TxLike[];
  incomeSources: IncomeSourceLike[];
  investments: InvestmentLike[];
  goals: GoalLike[];
  budgets: BudgetLike[];
  currency?: string;
  now?: Date;
}

export interface Insight {
  id: string;
  tone: "positive" | "neutral" | "warning";
  title: string;
  body: string;
}

export interface CoachAnswer {
  answer: string;
}

/** The provider contract — swap in an LLM-backed implementation by
 *  setting WEALTHOS_AI_PROVIDER and its credentials in the environment. */
export interface AiProvider {
  readonly name: string;
  insights(ctx: AiContext): Insight[];
  coach(question: string, ctx: AiContext): CoachAnswer;
}

// ---------------------------------------------------------------------------
// The deterministic local engine
// ---------------------------------------------------------------------------

const localProvider: AiProvider = {
  name: "local",

  insights(ctx) {
    const now = ctx.now ?? new Date();
    const cur = ctx.currency ?? "USD";
    const out: Insight[] = [];

    // 1. The month-over-month spend trend
    const thisMonth = monthlyExpenses(ctx.transactions, now);
    const lastMonth = monthlyExpenses(ctx.transactions, previousMonth(now));
    const delta = deltaPct(thisMonth, lastMonth);
    if (delta != null && Math.abs(delta) >= 5) {
      const down = delta < 0;
      out.push({
        id: "spend-trend",
        tone: down ? "positive" : "warning",
        title: down
          ? `Spending down ${Math.abs(delta)}% vs last month`
          : `Spending up ${delta}% vs last month`,
        body: down
          ? `You've spent ${formatMoney(thisMonth, cur)} this month versus ${formatMoney(lastMonth, cur)} last month. Keep it up.`
          : `You've spent ${formatMoney(thisMonth, cur)} this month versus ${formatMoney(lastMonth, cur)} last month. Review your top categories below.`,
      });
    }

    // 2. The savings rate verdict
    const rate = savingsRate(ctx.transactions, now);
    if (rate > 0) {
      out.push({
        id: "savings-rate",
        tone: rate >= 20 ? "positive" : "neutral",
        title: `You're saving ${rate}% of income`,
        body:
          rate >= 20
            ? "That's above the 20% benchmark — excellent discipline."
            : "Aim for 20%: every point closer compounds your goals faster.",
      });
    } else if (monthlyExpenses(ctx.transactions, now) > 0) {
      // Session-214 (F-214j): the overspend verdict keys on EXPENSES, not
      // income — the pre-214 `else if (income > 0)` left the most alarming
      // state (real spending, zero income) with no insight at all.
      // Session-215 (R-12, F-215j): savingsRate returns 0 at exact
      // break-even too, so keying the verdict on the rate alone titled
      // an income-equals-expenses month "spending more than you earn" —
      // false at equality. The comparison decides; break-even gets its
      // own neutral line.
      const income = monthlyIncomeFromTx(ctx.transactions, now);
      const expenses = monthlyExpenses(ctx.transactions, now);
      const zeroIncome = income === 0;
      const overspend = expenses > income;
      out.push({
        id: "savings-rate",
        tone: zeroIncome || overspend ? "warning" : "neutral",
        title: zeroIncome
          ? "You have no income this month"
          : overspend
            ? "You're spending more than you earn"
            : "You're breaking even this month",
        body: zeroIncome
          ? "This month shows expenses with no income recorded. Log your income sources so the savings math can guide you."
          : overspend
            ? "This month's expenses exceed income. Trim the largest discretionary category first."
            : "This month's spending matches income exactly. A small trim would move the needle toward your savings rate.",
      });
    }

    // 3. Budget breaches
    const rows = budgetVsActual(ctx.transactions, ctx.budgets, now).filter((r) => r.over);
    if (rows.length > 0) {
      const worst = rows[0];
      out.push({
        id: "budget-breach",
        tone: "warning",
        title: `${worst.category} is ${worst.pct}% of budget`,
        body: `You've spent ${formatMoney(worst.actual, cur)} of a ${formatMoney(worst.budget, cur)} budget — ${formatMoney(-worst.remaining, cur)} over.`,
      });
    }

    // 4. Unusual transactions
    const unusual = unusualTransactions(ctx.transactions, now);
    if (unusual.length > 0) {
      const u = unusual[0];
      out.push({
        id: "unusual",
        tone: "neutral",
        title: `Unusual charge: ${u.description}`,
        body: u.reason + ". Verify it if you don't recognize it.",
      });
    }

    // 5. Portfolio standing
    const pf = portfolioStats(ctx.investments);
    if (pf.value > 0) {
      out.push({
        id: "portfolio",
        tone: pf.gainLoss >= 0 ? "positive" : "warning",
        title: `Portfolio ${pf.gainLoss >= 0 ? "up" : "down"} ${Math.abs(pf.returnPct)}% all time`,
        body: `${formatMoney(pf.value, cur)} current value versus ${formatMoney(pf.invested, cur)} invested.`,
      });
    }

    // 6. Goal pacing
    const active = ctx.goals.filter((g) => g.status === "active");
    if (active.length > 0) {
      const g = active[0];
      const p = goalProgress(g, now);
      out.push({
        id: "goal-pacing",
        tone: "neutral",
        title: `${g.name}: ${p.pct}% funded`,
        body:
          p.perMonthNeeded != null
            ? `Save ${formatMoney(p.perMonthNeeded, cur)}/month to reach ${formatMoney(g.targetAmount, cur)} by the target date.`
            : `${formatMoney(p.remaining, cur)} to go.`,
      });
    }

    return out.slice(0, 4);
  },

  coach(question, ctx) {
    const now = ctx.now ?? new Date();
    const cur = ctx.currency ?? "USD";
    const q = question.toLowerCase();

    // Top spending categories
    if (/(top|biggest|largest).*(categor|spend)|spend.*most/.test(q)) {
      const cats = expenseBreakdown(ctx.transactions, now);
      if (cats.length === 0) {
        return { answer: "You have no expenses recorded this month — add a few and ask me again." };
      }
      const lines = cats.slice(0, 3).map(
        (c, i) => `${i + 1}. ${c.category} — ${formatMoney(c.value, cur)} (${c.pct}% of spending)`,
      );
      return {
        answer: `Your top spending categories this month:\n${lines.join("\n")}`,
      };
    }

    // Dining out (and food questions generally). "Dining" means the
    // discretionary food family (dining out + coffee + restaurants);
    // a groceries/food question widens to the grocery family too.
    const diningMatch = q.match(/dining|restaurant|eat out|food|grocer/);
    if (diningMatch) {
      const wide = /food|grocer/.test(q);
      const cats = expenseBreakdown(ctx.transactions, now);
      const dining = cats.filter((c) =>
        wide
          ? /dining|grocer|food|coffee|restaurant/i.test(c.category)
          : /dining|coffee|restaurant/i.test(c.category),
      );
      const total = dining.reduce((s, c) => s + c.value, 0);
      return {
        answer:
          dining.length === 0
            ? "No dining or food spending recorded this month."
            : `You've spent ${formatMoney(total, cur)} on food-related categories this month: ${dining
                .map((c) => `${c.category} ${formatMoney(c.value, cur)}`)
                .join(", ")}.`,
      };
    }

    // Savings goals
    if (/goal|on track|saving/.test(q)) {
      const active = ctx.goals.filter((g) => g.status === "active");
      if (active.length === 0) {
        return { answer: "You have no active savings goals yet — create one on the Goals page." };
      }
      const lines = active.map((g) => {
        const p = goalProgress(g, now);
        const pace = p.perMonthNeeded != null ? ` (${formatMoney(p.perMonthNeeded, cur)}/mo needed)` : "";
        return `• ${g.name}: ${p.pct}% funded${pace}`;
      });
      return { answer: `Your active goals:\n${lines.join("\n")}` };
    }

    // Unusual transactions
    if (/unusual|weird|anomal|suspicious/.test(q)) {
      const unusual = unusualTransactions(ctx.transactions, now);
      if (unusual.length === 0) {
        return { answer: "Nothing unusual this month — no transaction is more than double its category average." };
      }
      return {
        answer: unusual
          .slice(0, 3)
          .map((u) => `• ${u.description} — ${u.reason}`)
          .join("\n"),
      };
    }

    // Save more
    if (/save more|spend less|cut|reduce/.test(q)) {
      const cats = expenseBreakdown(ctx.transactions, now);
      const wants = cats.filter((c) => c.value > 0).slice(0, 2);
      const suggestions = wants.map(
        (c) => `• Trim ${c.category} (${formatMoney(c.value, cur)}/mo) by 15% — saves ${formatMoney(Math.round(c.value * 0.15), cur)}/mo`,
      );
      return {
        answer:
          suggestions.length > 0
            ? `Three levers:\n${suggestions.join("\n")}\n• Move the difference into your Emergency Fund automatically on payday.`
            : "Start by recording your expenses — I can only optimize what I can see.",
      };
    }

    // Income / net / overview fallback
    if (/income|earn|net|balance|overview|how am i/.test(q)) {
      const income = monthlyIncomeFromTx(ctx.transactions, now);
      const expenses = monthlyExpenses(ctx.transactions, now);
      return {
        answer: `This month: ${formatMoney(income, cur)} income, ${formatMoney(expenses, cur)} expenses — net ${formatMoney(income - expenses, cur)} (savings rate ${savingsRate(ctx.transactions, now)}%).`,
      };
    }

    // Generic answer with the health snapshot
    const health = financialHealthScore(ctx.transactions, ctx.investments, now);
    const series = cashFlowSeries(ctx.transactions, 3, now);
    const avgNet = series.length
      ? Math.round(series.reduce((s, p) => s + p.net, 0) / series.length)
      : 0;
    return {
      answer: `Here's your snapshot: financial health ${health.total}/100 (${health.band}), averaging ${formatMoney(avgNet, cur)} net per month over the last ${series.length} months. Ask me about your top categories, goals, or unusual transactions.`,
    };
  },
};

export function getAiProvider(): AiProvider {
  // Future: read WEALTHOS_AI_PROVIDER (+ credentials) and return an
  // LLM-backed implementation. Today the deterministic engine is the
  // shipped provider — always available, never keyed.
  return localProvider;
}

export type { TxLike, IncomeSourceLike, InvestmentLike, GoalLike, BudgetLike };
