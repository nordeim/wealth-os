"use client";

import * as React from "react";
import Link from "next/link";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  BarChart3,
  Bell,
  Brain,
  BrainCircuit,
  LineChart as LineChartIcon,
  MessageCircle,
  PieChart as PieIcon,
  PlusCircle,
  RefreshCw,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  CardTitleRow,
  EmptyState,
  KpiCard,
  PageHeader,
  PeriodSegment,
} from "@/components/shared/page-parts";
import { AiCoachDialog } from "@/components/shared/ai-coach";
import { useWealthOs } from "@/stores/wealthos-store";
import { useIsDark } from "@/components/layout/theme";
import { CHART_COLORS, PERIOD_OPTIONS, PERIOD_MONTHS } from "@/lib/constants";
import {
  budgetVsActual,
  cashFlowSeries,
  deltaPct,
  expenseBreakdown,
  financialHealthScore,
  formatAxisMoney,
  formatMoney,
  healthAdvice,
  longDate,
  monthlyExpenses,
  monthlyIncomeFromTx,
  netBalance,
  previousMonth,
  recentActivity,
  relativeDays,
  savingsRate,
  upcomingAlerts,
} from "@/lib/finance";
import { getAiProvider } from "@/lib/ai";
import { BUTTONS, CARD, GLASS_CARD, PAGE_ROOT, QUICK_ACTIONS_CARD } from "@/lib/page-layout";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const store = useWealthOs();
  const [period, setPeriod] = React.useState<string>("6M");
  const [coachOpen, setCoachOpen] = React.useState(false);

  // Render-stable timestamp (the memo derivations depend on it).
  const [now] = React.useState(() => new Date());
  const txs = store.transactions;
  const investments = store.investments;
  const budgets = store.budgets;

  // KPI derivations (pure seams).
  const income = monthlyIncomeFromTx(txs, now);
  const prevIncome = monthlyIncomeFromTx(txs, previousMonth(now));
  const expenses = monthlyExpenses(txs, now);
  const prevExpenses = monthlyExpenses(txs, previousMonth(now));
  const net = netBalance(txs, now);
  const prevNet = netBalance(txs, previousMonth(now));
  const rate = savingsRate(txs, now);

  const incomeDelta = deltaPct(income, prevIncome);
  const expenseDelta = deltaPct(expenses, prevExpenses);
  const netDelta = deltaPct(net, prevNet);

  const series = React.useMemo(
    () => cashFlowSeries(txs, PERIOD_MONTHS[period as keyof typeof PERIOD_MONTHS] ?? 6, now),
    [txs, period, now],
  );
  const breakdown = React.useMemo(() => expenseBreakdown(txs, now), [txs, now]);
  const budgetRows = React.useMemo(() => budgetVsActual(txs, budgets, now), [txs, budgets, now]);
  const upcoming = React.useMemo(() => upcomingAlerts(txs, now), [txs, now]);
  const recent = React.useMemo(() => recentActivity(txs, 6), [txs]);
  const health = React.useMemo(
    () => financialHealthScore(txs, investments, now),
    [txs, investments, now],
  );
  const insights = React.useMemo(
    () =>
      getAiProvider().insights({
        transactions: txs,
        incomeSources: store.incomeSources,
        investments,
        goals: store.goals,
        budgets,
      }),
    [txs, store.incomeSources, investments, store.goals, budgets],
  );

  const isDark = useIsDark();
  const axisColor = isDark ? "#a8a29e" : "#78716c";
  const gridColor = isDark ? "#292524" : "#e7e5e4";
  // Session-222 (R-19, F-222i): the tooltip panel joins the isDark
  // family — the axes/grid flipped but the tooltip rendered a white
  // chip over dark cards. The stone-900 panel + stone-100 ink mirror
  // the card surfaces. (Session-223, R-20: the docblock's old "the
  // swatch keeps the series color" claim was wrong — recharts 3.10's
  // DefaultTooltipContent has no swatch element; the per-series
  // color cue rides the legend.)
  const tooltipInk = isDark ? "#f5f5f4" : "#1c1917";
  const tooltipStyle = {
    borderRadius: 12,
    border: `1px solid ${isDark ? "#44403c" : "#e7e5e4"}`,
    background: isDark ? "#1c1917" : undefined,
    boxShadow: isDark ? "0 4px 12px rgba(0,0,0,0.4)" : "0 4px 12px rgba(0,0,0,0.08)",
  } as const;

  // Session-216 (R-13, F-216d): a failed refresh is no longer a silent
  // no-op — the Result rides back (refreshAll returns it) and the
  // button toasts the failure (the house mutation-feedback pattern).
  const onRefresh = () => {
    void store.refresh().then((res) => {
      if (!res.ok) toast.error("Refresh failed", res.error);
    });
  };

  return (
    <div className={PAGE_ROOT.standard}>
      <div className={PAGE_ROOT.containerWide}>
        <PageHeader
          title="Financial Dashboard"
          subtitle={longDate(now)}
          actions={
            <>
              <Button variant="outline" onClick={() => setCoachOpen(true)}>
                <BrainCircuit className="h-4 w-4" />
                AI Coach
              </Button>
              <Button variant="outline" onClick={onRefresh} aria-label="Refresh data">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Link href="/Expenses" className={BUTTONS.primary}>
                <PlusCircle className="h-4 w-4" />
                Add Transaction
              </Link>
            </>
          }
        />

        {/* KPI row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Monthly Income"
            value={formatMoney(income)}
            delta={incomeDelta != null ? `${incomeDelta > 0 ? "+" : ""}${incomeDelta}%` : null}
            deltaDirection={incomeDelta == null ? "flat" : incomeDelta >= 0 ? "up" : "down"}
            icon={TrendingUp}
            tone="emerald"
          />
          <KpiCard
            label="Monthly Expenses"
            value={formatMoney(expenses)}
            delta={expenseDelta != null ? `${expenseDelta > 0 ? "+" : ""}${expenseDelta}%` : null}
            deltaDirection={expenseDelta == null ? "flat" : expenseDelta <= 0 ? "up" : "down"}
            icon={TrendingDown}
            tone="rose"
          />
          <KpiCard
            label="Net Balance"
            value={formatMoney(net)}
            delta={netDelta != null ? `${netDelta > 0 ? "+" : ""}${netDelta}%` : null}
            deltaDirection={netDelta == null ? "flat" : netDelta >= 0 ? "up" : "down"}
            icon={Wallet}
            tone="amber"
          />
          <KpiCard
            label="Savings Rate"
            value={`${rate}%`}
            icon={Target}
            tone="purple"
          />
        </div>

        {/* Cash flow overview — the reference's mid-card genus, its cash-flow
            card alone carries backdrop-blur-md (the F-209a census) */}
        <section className={cn(CARD.base, "backdrop-blur-md", CARD.padding)} aria-label="Cash Flow Overview">
          <CardTitleRow
            icon={LineChartIcon}
            title="Cash Flow Overview"
            trailing={<PeriodSegment value={period} onChange={setPeriod} options={PERIOD_OPTIONS} />}
          />
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS.income} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={CHART_COLORS.income} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS.expenses} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={CHART_COLORS.expenses} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="netFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS.net} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={CHART_COLORS.net} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 12, fill: axisColor }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={formatAxisMoney}
                  tick={{ fontSize: 12, fill: axisColor }}
                  axisLine={false}
                  tickLine={false}
                  width={56}
                />
                <Tooltip
                  formatter={(value, name) => [formatMoney(Number(value)), name]}
                  labelStyle={{ color: tooltipInk, fontWeight: 600 }}
                  itemStyle={{ color: tooltipInk }}
                  contentStyle={tooltipStyle}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  name="Income"
                  stroke={CHART_COLORS.income}
                  strokeWidth={2.5}
                  fill="url(#incomeFill)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  name="Expenses"
                  stroke={CHART_COLORS.expenses}
                  strokeWidth={2.5}
                  fill="url(#expenseFill)"
                />
                <Area
                  type="monotone"
                  dataKey="net"
                  name="Net Savings"
                  stroke={CHART_COLORS.net}
                  strokeWidth={2.5}
                  fill="url(#netFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Health + breakdown row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <section className={cn(CARD.base, CARD.padding)} aria-label="Financial Health Score">
            <CardTitleRow icon={Activity} title="Financial Health Score" />
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <HealthGauge score={health.total} band={health.band} />
              <div className="w-full flex-1 space-y-4">
                {health.metrics.map((metric) => (
                  <div key={metric.key} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-600 dark:text-stone-400">{metric.label}</span>
                      <span className="font-semibold text-stone-700 dark:text-stone-300">
                        {metric.score}/{metric.max}
                      </span>
                    </div>
                    <div className="h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: healthBandColor(health.band),
                          width: `${(metric.score / metric.max) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-amber-50/60 dark:bg-amber-900/10 border border-amber-200/40 dark:border-amber-800/30">
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                💡 {healthAdvice(health)}
              </p>
            </div>
          </section>

          <section className={cn(CARD.base, CARD.padding)} aria-label="Expense Breakdown">
            <CardTitleRow icon={PieIcon} title="Expense Breakdown" caption="This month" />
            {breakdown.length === 0 ? (
              <EmptyState
                icon={PieIcon}
                title="No expenses this month"
                subtitle="Add expenses to see your category breakdown"
              />
            ) : (
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <div className="h-52 w-52 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={breakdown}
                        dataKey="value"
                        nameKey="category"
                        innerRadius={56}
                        outerRadius={88}
                        paddingAngle={2}
                        strokeWidth={0}
                      >
                        {breakdown.map((slice) => (
                          <Cell key={slice.category} fill={slice.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [formatMoney(Number(value)), name]}
                        // Session-223 (R-20, F-223c): this donut was one of
                        // the two bare sites the F-222i round missed (the
                        // presence-only pin could not see it) — the sibling
                        // form lands here too.
                        labelStyle={{ color: tooltipInk, fontWeight: 600 }}
                        itemStyle={{ color: tooltipInk }}
                        contentStyle={tooltipStyle}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="w-full flex-1 space-y-2">
                  {breakdown.slice(0, 6).map((slice) => (
                    <li key={slice.category} className="flex items-center justify-between gap-2 text-sm">
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: slice.color }} />
                        <span className="truncate text-stone-700 dark:text-stone-300">{slice.category}</span>
                      </span>
                      <span className="shrink-0 font-medium text-stone-900 dark:text-stone-100">
                        {formatMoney(slice.value)}
                        <span className="ml-1.5 text-xs text-stone-500 dark:text-stone-400">{slice.pct}%</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>

        {/* Budget vs actual + upcoming row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <section className={cn(CARD.base, CARD.padding)} aria-label="Budget vs Actual">
            <CardTitleRow icon={BarChart3} title="Budget vs Actual" caption="This month" />
            {budgetRows.length === 0 ? (
              <EmptyState
                icon={BarChart3}
                title="Add budgets to compare against spending"
                subtitle="Set category budgets on the Settings page"
              />
            ) : (
              <ul className="space-y-4">
                {budgetRows.slice(0, 5).map((row) => (
                  <li key={row.category}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium text-stone-700 dark:text-stone-300">{row.category}</span>
                      <span
                        className={cn(
                          "text-xs font-semibold",
                          row.over
                            ? "text-red-600 dark:text-red-400" // F-218j
                            : "text-stone-500 dark:text-stone-400",
                        )}
                      >
                        {formatMoney(row.actual)} / {formatMoney(row.budget)}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          row.over ? "bg-red-500" : "bg-gradient-to-r from-amber-400 to-amber-500",
                        )}
                        style={{ width: `${Math.min(100, row.pct)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className={cn(CARD.base, CARD.padding)} aria-label="Upcoming and Alerts">
            <CardTitleRow icon={Bell} title="Upcoming & Alerts" />
            {upcoming.length === 0 ? (
              <EmptyState
                icon={Bell}
                title="No upcoming payments"
                subtitle="Add recurring transactions to track bills"
              />
            ) : (
              <ul className="space-y-3">
                {upcoming.slice(0, 5).map((item, i) => (
                  <li
                    key={`${item.description}-${i}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-stone-200/70 bg-stone-50/60 p-3 dark:border-stone-800 dark:bg-stone-800/40"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-stone-900 dark:text-stone-100">
                        {item.description}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        Due {relativeDays(item.nextDate, now)} · {item.category}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-bold text-stone-900 dark:text-stone-100">
                      {formatMoney(item.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Recent activity + AI insights row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <section className={cn(GLASS_CARD.base, CARD.padding)} aria-label="Recent Activity">
            <h2 className="mb-4 text-lg font-bold text-stone-900 dark:text-stone-100">Recent Activity</h2>
            {recent.length === 0 ? (
              <EmptyState
                icon={Activity}
                title="No recent transactions"
                subtitle="Add income or expenses to see activity"
              />
            ) : (
              <ul className="divide-y divide-stone-200/70 dark:divide-stone-800">
                {recent.map((row) => (
                  <li key={row.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                          row.type === "income"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10"
                            : "bg-rose-50 text-rose-500 dark:bg-rose-500/10",
                        )}
                      >
                        {row.type === "income" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-stone-900 dark:text-stone-100">
                          {row.description}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          {row.category} · {relativeDays(row.date, now)}
                        </p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 text-sm font-bold",
                        row.type === "income"
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-stone-900 dark:text-stone-100",
                      )}
                    >
                      {row.type === "income" ? "+" : "−"}
                      {formatMoney(row.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className={cn(GLASS_CARD.base, CARD.padding)} aria-label="AI Insights">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-stone-700 dark:text-stone-200" />
                <h2 className={CARD.title}>AI Insights</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="h-8 rounded-full px-3 text-xs" onClick={() => setCoachOpen(true)}>
                  <MessageCircle className="h-3.5 w-3.5" />
                  Ask AI
                </Button>
                <Button
                  variant="ghost"
                  className="h-8 w-8 rounded-full p-0"
                  aria-label="Regenerate insights"
                  onClick={onRefresh}
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            {insights.length === 0 ? (
              <EmptyState
                icon={Brain}
                title="No insights available yet"
                subtitle="Add more transactions to see AI-powered insights"
              />
            ) : (
              <ul className="space-y-3">
                {insights.map((insight) => (
                  <li
                    key={insight.id}
                    className={cn(
                      "rounded-lg border p-3.5",
                      insight.tone === "positive"
                        ? "border-emerald-200 bg-emerald-50/60 dark:border-emerald-500/20 dark:bg-emerald-500/10"
                        : insight.tone === "warning"
                          ? "border-amber-200 bg-amber-50/60 dark:border-amber-500/20 dark:bg-amber-500/10"
                          : "border-stone-200 bg-stone-50/60 dark:border-stone-700 dark:bg-stone-800/40",
                    )}
                  >
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{insight.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-stone-600 dark:text-stone-400">{insight.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Quick actions — the reference's one-off warm variant (via-30,
            rounded-2xl, amber-200 border; p-6 in the literal) */}
        <section className={QUICK_ACTIONS_CARD} aria-label="Quick Actions">
          {/* Session-219 (R-16, F-219k): amber-700 — amber-500 measured 2.09:1
        on the light surface (the AA one-step doctrine). */}
        <h2 className="mb-4 text-xl font-bold text-amber-700 dark:text-amber-400">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <QuickAction href="/Income" label="Add Income" icon={TrendingUp} className="border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:border-emerald-300" iconClassName="text-emerald-600 dark:text-emerald-400" />
            <QuickAction href="/Expenses" label="Add Expense" icon={TrendingDown} className="border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:border-rose-300" iconClassName="text-rose-600 dark:text-rose-400" />
            <QuickAction href="/Goals" label="Set Goal" icon={Target} className="border-amber-200 dark:border-amber-900/50 hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:border-amber-300" iconClassName="text-amber-600 dark:text-amber-400" />
            <QuickAction href="/Analytics" label="View Reports" icon={TrendingUp} className="border-blue-200 dark:border-blue-900/50 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:border-blue-300" iconClassName="text-blue-600 dark:text-blue-400" />
          </div>
        </section>

        <AiCoachDialog open={coachOpen} onOpenChange={setCoachOpen} />
      </div>
    </div>
  );
}

function QuickAction({
  href,
  label,
  icon: Icon,
  className,
  iconClassName,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  iconClassName?: string;
}) {
  // Session-209 (F-209a) + session-216 (F-216e): the reference renders a
  // shadcn outline button inside a bare anchor — an interactive INSIDE
  // an interactive (two tab stops, ambiguous SR announcement), the one
  // a11y defect class axe-core structurally cannot see (its
  // nested-interactive rule matches childrenPresentational roles —
  // button yes, link no). Our cure keeps the visual genus byte-for-byte
  // (the exact class string, now carried by the anchor itself) while
  // fixing the nesting: ONE focusable element per destination. Token
  // notes (F-209a): the reference's `bg-background` reads our `bg-card`;
  // its `hover:text-accent-foreground` is the neutral literals (the
  // F-129c3 house precedent). The icon's effective size stays 16px —
  // the [&_svg]:size-4 arm outranks the icon's own w-5 h-5.
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-card shadow-sm hover:text-neutral-900 dark:hover:text-neutral-50 px-4 py-2 w-full h-16 flex-col gap-2",
        className,
      )}
    >
      <Icon className={cn("w-5 h-5", iconClassName)} aria-hidden="true" />
      {label}
    </Link>
  );
}

/** The semicircle gauge (the reference's genus: gray track, colored
 *  arc by band, big number + band label centered in the lower half —
 *  session-208, F-208c: the overlay rides `absolute inset-0 …
 * justify-end pb-1` with `font-black` weight, matching the reference's
 * recharts RadialBar construction). */
function healthBandColor(band: string): string {
  return band === "Excellent"
    ? "#10b981"
    : band === "Good"
      ? "#14b8a6"
      : band === "Fair"
        ? "#f59e0b"
        : "#f43f5e";
}

function HealthGauge({ score, band }: { score: number; band: string }) {
  const pct = Math.max(0, Math.min(100, score));
  const angle = (pct / 100) * 180;
  const color = healthBandColor(band);
  const radius = 70;
  const cx = 80;
  const cy = 80;
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const arc = (fromDeg: number, toDeg: number) => {
    const x1 = cx + radius * Math.cos(rad(fromDeg));
    const y1 = cy + radius * Math.sin(rad(fromDeg));
    const x2 = cx + radius * Math.cos(rad(toDeg));
    const y2 = cy + radius * Math.sin(rad(toDeg));
    return `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`;
  };
  return (
    <div className="relative flex flex-col items-center" role="img" aria-label={`Financial health score ${score} out of 100, ${band}`}> {/* F-218m: role-less aria-label is ignored by AT */}
      <svg width="160" height="96" viewBox="0 0 160 96" role="presentation">
        <path d={arc(0, 180)} fill="none" stroke="#e7e5e4" strokeWidth="12" strokeLinecap="round" className="dark:opacity-20" />
        <path
          d={arc(0, angle)}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.5s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
        {/* Session-219 (R-16, F-219k): the score + band ride the ink, not
            the band colors (emerald 2.54 / teal 2.49 / amber 2.15:1 as
            small text) — the colored arc carries the hue; role="img"
            carries the semantics. */}
        <span className="text-3xl font-black text-stone-900 dark:text-stone-100">
          {score}
        </span>
        <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
          {band}
        </span>
      </div>
    </div>
  );
}
