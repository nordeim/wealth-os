// WealthOS finance seams — the PURE calculation layer (session-199).
// Every dashboard/analytics number derives through these functions so the
// unit suite can pin the math (the web-application-engineering §5.2
// doctrine: never calculate chart data inside a React component).

import {
  BUDGET_CATEGORIES,
  CATEGORY_PALETTE,
  FREQUENCY_TO_MONTHLY,
  type BudgetCategory,
} from "./constants";

export interface TxLike {
  id?: string;
  description: string;
  amount: number;
  type: string; // "income" | "expense"
  category: string;
  budgetCategory?: string;
  date: Date | string;
  recurring?: boolean;
  nextDate?: Date | string | null;
}

export interface IncomeSourceLike {
  id?: string;
  name: string;
  amount: number;
  frequency: string;
  active: boolean;
}

export interface InvestmentLike {
  id?: string;
  symbol: string;
  name: string;
  type: string;
  shares: number;
  avgCost: number;
  currentValue: number;
}

export interface GoalLike {
  id?: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: Date | string | null;
  status: string;
}

export interface BudgetLike {
  category: string;
  amount: number;
  period: string;
}

// ---- date helpers -------------------------------------------------------------

// A Prisma-serialized calendar date: stored UTC-midnight ISO strings
// (the dateField "yyyy-mm-dd" form parses as UTC midnight, and Prisma
// returns it as 2026-11-01T00:00:00.000Z). The UTC-calendar prefix is
// the date the USER chose — not an instant to zone-shift.
const UTC_MIDNIGHT_ISO = /^(\d{4})-(\d{2})-(\d{2})T00:00:00(?:\.000)?Z$/;

/**
 * Parse a stored date into the LOCAL calendar date it names.
 *
 * Session-218 (R-15, F-218d): UTC-midnight storage + local-accessor
 * bucketing mis-rendered 1st-of-month rows for every UTC-negative user
 * (verified live: in America/New_York a Nov 1 transaction rendered
 * 10/31/2026, bucketed into October — rent on the 1st — and the edit
 * prefill would re-store the wrong day). The cure re-anchors the exact
 * UTC-midnight form to LOCAL midnight of the same calendar date, so
 * every local-accessor consumer (sameMonth, startOfMonth, format
 * seams, native date inputs) reads the calendar the user meant. True
 * timestamps (any other ISO form) keep their instant; Date inputs pass
 * through untouched (the seed and tests construct local Dates).
 */
export function toDate(value: Date | string): Date {
  if (value instanceof Date) return value;
  const m = UTC_MIDNIGHT_ISO.exec(value);
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return new Date(value);
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

export function sameMonth(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
  );
}

/** The reference's dashboard date line: "Sunday, November 8, 2026". */
export function longDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function monthLabel(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

// ---- KPI seams ------------------------------------------------------------------

/** Total monthly income from income sources, frequency-normalized
 *  (weekly × 52/12, quarterly ÷ 3, …) and restricted to active rows. */
export function totalMonthlyIncome(sources: IncomeSourceLike[]): number {
  return round2(
    sources
      .filter((s) => s.active)
      .reduce(
        (sum, s) => sum + s.amount * (FREQUENCY_TO_MONTHLY[s.frequency] ?? 1),
        0,
      ),
  );
}

export function transactionsInMonth(
  txs: TxLike[],
  ref: Date,
  type?: "income" | "expense",
): TxLike[] {
  return txs.filter((t) => {
    if (type && t.type !== type) return false;
    return sameMonth(toDate(t.date), ref);
  });
}

export function sumAmount(txs: TxLike[]): number {
  return round2(txs.reduce((sum, t) => sum + t.amount, 0));
}

export function monthlyExpenses(txs: TxLike[], ref: Date): number {
  return sumAmount(transactionsInMonth(txs, ref, "expense"));
}

export function monthlyIncomeFromTx(txs: TxLike[], ref: Date): number {
  return sumAmount(transactionsInMonth(txs, ref, "income"));
}

export function netBalance(txs: TxLike[], ref: Date): number {
  return round2(monthlyIncomeFromTx(txs, ref) - monthlyExpenses(txs, ref));
}

/** Savings rate: net / income × 100, guarding divide-by-zero. */
export function savingsRate(txs: TxLike[], ref: Date): number {
  const income = monthlyIncomeFromTx(txs, ref);
  if (income <= 0) return 0;
  return round1(((income - monthlyExpenses(txs, ref)) / income) * 100);
}

/** Percent delta between two numbers (KPI cards), guarding zero bases. */
export function deltaPct(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return round1(((current - previous) / Math.abs(previous)) * 100);
}

export function previousMonth(ref: Date): Date {
  return addMonths(ref, -1);
}

// ---- cash-flow chart seam ---------------------------------------------------------

export interface CashFlowPoint {
  label: string;
  income: number;
  expenses: number;
  net: number;
}

/** Monthly income/expenses/net buckets for the trailing N months ending
 *  at `ref` (inclusive). Labels ride the reference's "Jun 26" genus. */
export function cashFlowSeries(txs: TxLike[], months: number, ref: Date): CashFlowPoint[] {
  const points: CashFlowPoint[] = [];
  for (let i = months - 1; i >= 0; i--) {
    const month = addMonths(ref, -i);
    const income = monthlyIncomeFromTx(txs, month);
    const expenses = monthlyExpenses(txs, month);
    points.push({
      label: monthLabel(month),
      income,
      expenses,
      net: round2(income - expenses),
    });
  }
  return points;
}

/** Session-209 (F-209b): the Analytics stat row's averages — the mean of
 *  the monthly series over the walked window (the reference's "Avg Monthly
 *  Income / Expenses / Savings" cards). Savings averages the net series.
 *  An empty series (no months walked) returns zeros, never NaN. */
export function monthlyAverages(points: CashFlowPoint[]): {
  income: number;
  expenses: number;
  savings: number;
} {
  if (points.length === 0) return { income: 0, expenses: 0, savings: 0 };
  const mean = (pick: (p: CashFlowPoint) => number) =>
    round2(points.reduce((acc, p) => acc + pick(p), 0) / points.length);
  return {
    income: mean((p) => p.income),
    expenses: mean((p) => p.expenses),
    savings: mean((p) => p.net),
  };
}

// ---- financial health score ---------------------------------------------------------

export interface HealthMetric {
  key: "savingsRate" | "spendingControl" | "investments";
  label: string;
  score: number;
  max: number;
}

export interface HealthScore {
  total: number;
  band: "Excellent" | "Good" | "Fair" | "Needs Work";
  metrics: HealthMetric[];
}

/**
 * The Financial Health Score gauge (live-observed anatomy): three metric
 * rows — Savings Rate 0/40, Spending Control 0/30, Investments 0/30.
 *  - Savings rate: ≥20% of income saved scores full 40 (linear below).
 *  - Spending control: expenses ≤70% of income scores full 30 (linear to
 *    100%, zero past it).
 *  - Investments: portfolio value ≥ 6 months of income scores full 30.
 */
export function financialHealthScore(
  txs: TxLike[],
  investments: InvestmentLike[],
  ref: Date,
): HealthScore {
  const income = monthlyIncomeFromTx(txs, ref);
  const expenses = monthlyExpenses(txs, ref);

  const savingsPct = income > 0 ? (income - expenses) / income : 0;
  const savingsScore = clamp(Math.round((savingsPct / 0.2) * 40), 0, 40);

  const spendPct = income > 0 ? expenses / income : 1;
  const spendScore =
    spendPct >= 1 ? 0 : clamp(Math.round(((1 - spendPct) / 0.3) * 30), 0, 30);

  const portfolio = portfolioStats(investments).value;
  const investScore =
    income > 0
      ? clamp(Math.round((portfolio / (income * 6)) * 30), 0, 30)
      : portfolio > 0
        ? 30
        : 0;

  const total = savingsScore + spendScore + investScore;
  return {
    total,
    band: healthBand(total),
    metrics: [
      { key: "savingsRate", label: "Savings Rate", score: savingsScore, max: 40 },
      { key: "spendingControl", label: "Spending Control", score: spendScore, max: 30 },
      { key: "investments", label: "Investments", score: investScore, max: 30 },
    ],
  };
}

export function healthBand(total: number): HealthScore["band"] {
  if (total >= 80) return "Excellent";
  if (total >= 60) return "Good";
  if (total >= 40) return "Fair";
  return "Needs Work";
}

/** The gauge's advice callout (the reference's amber 💡 box). */
export function healthAdvice(score: HealthScore): string {
  const weakest = [...score.metrics].sort((a, b) => a.score / a.max - b.score / b.max)[0];
  switch (weakest.key) {
    case "savingsRate":
      return "Focus on reducing expenses below 80% of income and building an investment portfolio.";
    case "spendingControl":
      return "Your spending is high relative to income — trim discretionary categories first.";
    case "investments":
      return "Build an investment portfolio — even small monthly contributions compound.";
  }
}

// ---- expense breakdown ------------------------------------------------------------

export interface CategorySlice {
  category: string;
  value: number;
  pct: number;
  color: string;
}

/** Category breakdown for a month, sorted desc, palette assigned in rank
 *  order (stable — the pie's segment order is deterministic). */
export function expenseBreakdown(txs: TxLike[], ref: Date): CategorySlice[] {
  const inMonth = transactionsInMonth(txs, ref, "expense");
  const total = sumAmount(inMonth);
  const byCat = new Map<string, number>();
  for (const t of inMonth) {
    byCat.set(t.category, (byCat.get(t.category) ?? 0) + t.amount);
  }
  return [...byCat.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([category, value], i) => ({
      category,
      value: round2(value),
      pct: total > 0 ? round1((value / total) * 100) : 0,
      color: CATEGORY_PALETTE[i % CATEGORY_PALETTE.length],
    }));
}

/** Needs/Wants/Savings split for the Expenses page's summary trio. */
export function budgetCategorySplit(
  txs: TxLike[],
  ref: Date,
): Record<BudgetCategory, number> {
  const out: Record<BudgetCategory, number> = { needs: 0, wants: 0, savings: 0 };
  for (const t of transactionsInMonth(txs, ref, "expense")) {
    const key = (BUDGET_CATEGORIES as string[]).includes(t.budgetCategory ?? "")
      ? (t.budgetCategory as BudgetCategory)
      : "wants";
    out[key] += t.amount;
  }
  return {
    needs: round2(out.needs),
    wants: round2(out.wants),
    savings: round2(out.savings),
  };
}

// ---- budget vs actual ----------------------------------------------------------------

export interface BudgetRow {
  category: string;
  budget: number;
  actual: number;
  remaining: number;
  pct: number;
  over: boolean;
}

export function budgetVsActual(
  txs: TxLike[],
  budgets: BudgetLike[],
  ref: Date,
): BudgetRow[] {
  const actuals = new Map<string, number>();
  for (const t of transactionsInMonth(txs, ref, "expense")) {
    actuals.set(t.category, (actuals.get(t.category) ?? 0) + t.amount);
  }
  return budgets
    .map((b) => {
      const actual = round2(actuals.get(b.category) ?? 0);
      const pct = b.amount > 0 ? round1((actual / b.amount) * 100) : 0;
      return {
        category: b.category,
        budget: b.amount,
        actual,
        remaining: round2(b.amount - actual),
        pct,
        over: actual > b.amount,
      };
    })
    .sort((a, b) => b.pct - a.pct);
}

// ---- upcoming & alerts ------------------------------------------------------------------

export interface UpcomingItem {
  description: string;
  amount: number;
  nextDate: Date;
  daysAway: number;
  category: string;
}

/**
 * Recurring rows for the dashboard's "Upcoming & Alerts" section
 * (session-214, F-214g — the window made deliberate and pinned):
 * month-to-date OVERDUE rows stay visible (the "Alerts" half — they
 * render "Due N days ago" with a negative daysAway), everything from
 * today through the horizon (default 14 days) is upcoming, and rows
 * whose nextDate fell in a PREVIOUS month are stale and drop out.
 * Soonest first.
 */
export function upcomingAlerts(
  txs: TxLike[],
  ref: Date,
  horizonDays = 14,
): UpcomingItem[] {
  const horizon = new Date(ref);
  horizon.setDate(horizon.getDate() + horizonDays);
  return txs
    .filter(
      (t) =>
        t.recurring &&
        t.nextDate != null &&
        toDate(t.nextDate) >= startOfMonth(ref) &&
        toDate(t.nextDate) <= horizon,
    )
    .map((t) => {
      const next = toDate(t.nextDate as Date | string);
      const days = Math.ceil((next.getTime() - ref.getTime()) / 86_400_000);
      return {
        description: t.description,
        amount: t.amount,
        nextDate: next,
        daysAway: days,
        category: t.category,
      };
    })
    .sort((a, b) => a.daysAway - b.daysAway);
}

// ---- portfolio --------------------------------------------------------------------------

export interface PortfolioStats {
  value: number;
  invested: number;
  gainLoss: number;
  returnPct: number;
  holdings: Array<{
    symbol: string;
    name: string;
    type: string;
    invested: number;
    value: number;
    gainLoss: number;
    gainPct: number;
    pctOfPortfolio: number;
  }>;
}

export function portfolioStats(investments: InvestmentLike[]): PortfolioStats {
  const rows = investments.map((i) => ({
    symbol: i.symbol,
    name: i.name,
    type: i.type,
    invested: round2(i.shares * i.avgCost),
    value: round2(i.shares * i.currentValue),
    gainLoss: round2(i.shares * (i.currentValue - i.avgCost)),
    gainPct:
      i.avgCost > 0 ? round1(((i.currentValue - i.avgCost) / i.avgCost) * 100) : 0,
    pctOfPortfolio: 0,
  }));
  const value = round2(rows.reduce((s, r) => s + r.value, 0));
  const invested = round2(rows.reduce((s, r) => s + r.invested, 0));
  for (const r of rows) {
    r.pctOfPortfolio = value > 0 ? round1((r.value / value) * 100) : 0;
  }
  rows.sort((a, b) => b.value - a.value);
  return {
    value,
    invested,
    gainLoss: round2(value - invested),
    returnPct: invested > 0 ? round1(((value - invested) / invested) * 100) : 0,
    holdings: rows,
  };
}

export interface AllocationSlice {
  type: string;
  value: number;
  pct: number;
}

export function assetAllocation(investments: InvestmentLike[]): AllocationSlice[] {
  const stats = portfolioStats(investments);
  const byType = new Map<string, number>();
  for (const h of stats.holdings) {
    byType.set(h.type, (byType.get(h.type) ?? 0) + h.value);
  }
  return [...byType.entries()]
    .map(([type, value]) => ({
      type,
      value: round2(value),
      pct: stats.value > 0 ? round1((value / stats.value) * 100) : 0,
    }))
    .sort((a, b) => b.value - a.value);
}

// ---- goals ---------------------------------------------------------------------------------

export interface GoalProgress {
  pct: number;
  remaining: number;
  monthsLeft: number | null;
  perMonthNeeded: number | null;
  onTrack: boolean | null;
}

export function goalProgress(goal: GoalLike, ref: Date): GoalProgress {
  const pct =
    goal.targetAmount > 0
      ? Math.min(100, round1((goal.currentAmount / goal.targetAmount) * 100))
      : 0;
  const remaining = round2(Math.max(0, goal.targetAmount - goal.currentAmount));
  const target = goal.targetDate ? toDate(goal.targetDate) : null;
  const monthsLeft = target
    ? Math.max(
        0,
        (target.getFullYear() - ref.getFullYear()) * 12 +
          (target.getMonth() - ref.getMonth()),
      )
    : null;
  const perMonthNeeded = monthsLeft != null && monthsLeft > 0 ? round2(remaining / monthsLeft) : null;
  // "on track" is decidable only with a monthly-savings context; the
  // caller (dashboard/AI) supplies it — null = not decidable here.
  return { pct, remaining, monthsLeft, perMonthNeeded, onTrack: null };
}

// ---- recent activity ------------------------------------------------------------------------

export interface RecentActivityRow {
  id: string;
  description: string;
  amount: number;
  type: string;
  category: string;
  date: Date;
}

export function recentActivity(
  txs: TxLike[],
  limit = 8,
): RecentActivityRow[] {
  return txs
    .slice()
    .sort((a, b) => toDate(b.date).getTime() - toDate(a.date).getTime())
    .slice(0, limit)
    .map((t) => ({
      id: t.id ?? "",
      description: t.description,
      amount: t.amount,
      type: t.type,
      category: t.category,
      date: toDate(t.date),
    }));
}

// ---- analytics -------------------------------------------------------------------------------

export interface CategoryTrendPoint {
  label: string;
  value: number;
}

/** Monthly totals for one category (or all expenses when category is
 *  null) over the trailing N months. */
export function categoryTrend(
  txs: TxLike[],
  months: number,
  ref: Date,
  category: string | null,
  type: "income" | "expense" = "expense",
): CategoryTrendPoint[] {
  const points: CategoryTrendPoint[] = [];
  for (let i = months - 1; i >= 0; i--) {
    const month = addMonths(ref, -i);
    const rows = transactionsInMonth(txs, month, type).filter(
      (t) => category == null || t.category === category,
    );
    points.push({ label: monthLabel(month), value: sumAmount(rows) });
  }
  return points;
}

/** Day-of-month spending histogram (the Analytics "spending pattern"
 *  genus — early/late month weight). */
export function spendingByDayOfWeek(txs: TxLike[], ref: Date): Array<{ day: string; value: number }> {
  const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const totals = new Array(7).fill(0);
  for (const t of transactionsInMonth(txs, ref, "expense")) {
    totals[toDate(t.date).getDay()] += t.amount;
  }
  return names.map((day, i) => ({ day, value: round2(totals[i]) }));
}

// ---- AI-detected anomalies ----------------------------------------------------------------------

export interface UnusualTx {
  description: string;
  amount: number;
  category: string;
  date: Date;
  reason: string;
}

/** Rows at least 2× their category's mean (min 3 category samples) —
 *  the "Show me unusual transactions" engine, deterministic. */
export function unusualTransactions(txs: TxLike[], ref: Date): UnusualTx[] {
  const byCat = new Map<string, number[]>();
  for (const t of transactionsInMonth(txs, ref, "expense")) {
    const list = byCat.get(t.category) ?? [];
    list.push(t.amount);
    byCat.set(t.category, list);
  }
  const out: UnusualTx[] = [];
  for (const t of transactionsInMonth(txs, ref, "expense")) {
    const samples = byCat.get(t.category) ?? [];
    if (samples.length < 3) continue;
    const mean = samples.reduce((s, v) => s + v, 0) / samples.length;
    if (t.amount >= mean * 2) {
      out.push({
        description: t.description,
        amount: t.amount,
        category: t.category,
        date: toDate(t.date),
        reason: `${formatMoney(t.amount)} vs ${formatMoney(round2(mean))} average in ${t.category}`,
      });
    }
  }
  return out.sort((a, b) => b.amount - a.amount);
}

// ---- formatting -----------------------------------------------------------------------------------

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function formatMoney(n: number, currency = "USD"): string {
  const abs = Math.abs(n);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const symbol = currency === "USD" ? "$" : `${currency} `;
  return `${n < 0 ? "-" : ""}${symbol}${formatted}`;
}

/** The reference's compact axis labels ("$4k" genus). */
export function formatAxisMoney(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1000) {
    const k = Math.round(abs / 100) / 10;
    return `${n < 0 ? "-" : ""}$${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k`;
  }
  return `${n < 0 ? "-" : ""}$${abs.toFixed(0)}`;
}

/** "3 days ago" / "in 5 days" — the activity feed's relative stamps. */
export function relativeDays(date: Date, ref: Date): string {
  const days = Math.round((date.getTime() - ref.getTime()) / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days === -1) return "Yesterday";
  return days > 0 ? `in ${days} days` : `${-days} days ago`;
}
