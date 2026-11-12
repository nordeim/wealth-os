"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download, RefreshCw, TrendingUp, Calendar } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsPanel } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardTitleRow, EmptyState, PageHeader } from "@/components/shared/page-parts";
import { useWealthOs } from "@/stores/wealthos-store";
import { useIsDark } from "@/components/layout/theme";
import { CHART_COLORS, INVESTMENT_TYPES } from "@/lib/constants";
import {
  assetAllocation,
  budgetCategorySplit,
  cashFlowSeries,
  categoryTrend,
  expenseBreakdown,
  formatAxisMoney,
  formatMoney,
  monthlyAverages,
  portfolioStats,
  gainBySymbol,
  spendingByDayOfWeek,
  toDate,
} from "@/lib/finance";
// Session-215 (R-12, F-215b): the export rides the guarded seam.
import { toCsv, csvFilename } from "@/lib/csv";
import { toDateInputValue } from "@/lib/format";
import { CARD, GLASS_CARD, PAGE_ROOT, STAT_GRADIENTS } from "@/lib/page-layout";
import { cn } from "@/lib/utils";

const PERIODS = [
  { value: "3", label: "3 Months" },
  { value: "6", label: "6 Months" },
  { value: "12", label: "12 Months" },
];

export default function AnalyticsPage() {
  const store = useWealthOs();
  const isDark = useIsDark();
  const now = new Date();

  const [from, setFrom] = React.useState(
    toDateInputValue(new Date(now.getFullYear(), now.getMonth() - 5, 1)),
  );
  const [to, setTo] = React.useState(toDateInputValue(now));
  const [months, setMonths] = React.useState("6");
  const [tab, setTab] = React.useState("overview");

  const axisColor = isDark ? "#a8a29e" : "#78716c";
  const gridColor = isDark ? "#292524" : "#e7e5e4";
  // Session-222 (R-19, F-222i): every analytics tooltip joins the
  // isDark family — the bare <Tooltip /> sites rendered recharts'
  // default white chip over dark cards.
  const tooltipInk = isDark ? "#f5f5f4" : "#1c1917";
  const tooltipStyle = {
    borderRadius: 12,
    border: `1px solid ${isDark ? "#44403c" : "#e7e5e4"}`,
    background: isDark ? "#1c1917" : undefined,
  } as const;
  const tooltipLabelStyle = { color: tooltipInk, fontWeight: 600 } as const;
  const tooltipItemStyle = { color: tooltipInk } as const;
  const n = Number(months);

  const txs = store.transactions;
  // Session-227 (R-24, F-227m): all three parses route through toDate
  // (the F-218d doctrine — NEVER a raw new Date() on stored dates; the
  // F-219e mixed-mode regression is one single-side edit away).
  // Behavior-identical here: both sides resolved to the same calendar
  // date either way — the tidy buys doctrine uniformity at the seam.
  const inRange = React.useMemo(
    () =>
      txs.filter((t) => {
        const d = toDate(t.date).getTime();
        return d >= toDate(from).getTime() && d <= toDate(to).getTime() + 86_399_000;
      }),
    [txs, from, to],
  );

  // Session-219 (R-16, F-219e): the refs ride toDate — the same local-
  // midnight re-anchor the seams apply to rows. The raw parse of `to`
  // was the mixed-mode regression the F-218d cure itself introduced: on
  // a 1st-of-month `to` a UTC-negative user's trailing bucket keyed on
  // the previous month for a full day.
  const refDate = React.useMemo(() => toDate(to), [to]);
  const trend = React.useMemo(() => cashFlowSeries(inRange, n, refDate), [inRange, n, refDate]);
  const avg = React.useMemo(() => monthlyAverages(trend), [trend]);
  const breakdown = React.useMemo(() => expenseBreakdown(inRange, refDate), [inRange, refDate]);
  const split = React.useMemo(() => budgetCategorySplit(inRange, refDate), [inRange, refDate]);
  const byDay = React.useMemo(() => spendingByDayOfWeek(inRange, refDate), [inRange, refDate]);
  const incomeTrend = React.useMemo(
    () => categoryTrend(inRange, n, refDate, null, "income"),
    [inRange, n, refDate],
  );
  const stats = portfolioStats(store.investments);
  // Session-228 (R-25, F-228a): the per-symbol gain fold — the Holdings
  // Performance chart's seam. Two same-symbol lots are normal multi-lot
  // state (the F-227b premise); the chart renders ONE bar per symbol
  // (gains summed), so duplicate keys and overlapping bars are
  // impossible by construction.
  const foldedGains = gainBySymbol(stats.holdings);
  const allocation = assetAllocation(store.investments);

  const exportCsv = () => {
    // Session-215 (R-12, F-215b): the export serializes through the
    // guarded seam (toCsv — the S48-P1 formula-injection guard rides
    // every free-text cell; the pre-215 hand-rolled quote-doubling
    // bypassed it) and names the artifact by the reference's own
    // prefix_YYYY-MM-DD convention (csvFilename).
    const csv = toCsv(inRange, [
      { header: "Date", value: (t) => t.date.slice(0, 10) },
      { header: "Description", value: (t) => t.description },
      { header: "Type", value: (t) => t.type },
      { header: "Category", value: (t) => t.category },
      { header: "Budget Category", value: (t) => t.budgetCategory },
      { header: "Amount", value: (t) => t.amount },
    ]);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = csvFilename("wealthos-analytics");
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={PAGE_ROOT.standard}>
      <div className={PAGE_ROOT.containerWide}>
        <PageHeader
        tone="navy"
          title="Analytics & Reports"
          subtitle="Real-time insights into your financial performance"
          actions={
            <>
              <input
                type="date"
                aria-label="From date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="input-base h-10 w-36"
              />
              <input
                type="date"
                aria-label="To date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="input-base h-10 w-36"
              />
              <Select value={months} onValueChange={setMonths}>
                <SelectTrigger className="w-32" aria-label="Period">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PERIODS.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() =>
                  void store.refresh().then((res) => {
                    if (!res.ok) toast.error("Refresh failed", res.error);
                  })
                }
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button variant="outline" onClick={exportCsv}>
                <Download className="h-4 w-4" />
                Export
              </Button>
            </>
          }
        />

        {/* Session-209 (F-209b): the reference's stat row — three saturated
            to-r gradient tiles directly under the page header (its icons:
            TrendingUp · TrendingUp flipped · Calendar; the flipped icon is
            the reference's own "down" expression). */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            label="Avg Monthly Income"
            value={formatMoney(avg.income)}
            gradient={STAT_GRADIENTS.emerald}
            labelClass="text-emerald-100"
            icon={<TrendingUp className="w-8 h-8 text-emerald-200" aria-hidden="true" />}
          />
          <StatCard
            label="Avg Monthly Expenses"
            value={formatMoney(avg.expenses)}
            gradient={STAT_GRADIENTS.red}
            labelClass="text-red-100"
            icon={<TrendingUp className="w-8 h-8 text-red-200 rotate-180" aria-hidden="true" />}
          />
          <StatCard
            label="Avg Monthly Savings"
            value={formatMoney(avg.savings)}
            gradient={STAT_GRADIENTS.blue}
            labelClass="text-blue-100"
            icon={<Calendar className="w-8 h-8 text-blue-200" aria-hidden="true" />}
          />
        </div>

        <Tabs
          value={tab}
          onValueChange={setTab}
          variant="segmented"
          tabs={[
            { id: "overview", label: "Overview" },
            { id: "expenses", label: "Expenses" },
            { id: "income", label: "Income" },
            { id: "investments", label: "Investments" },
          ]}
        >
          <TabsPanel tab="overview" className="mt-4 space-y-4">
            <section className={cn(GLASS_CARD.base, CARD.padding)}>
              <CardTitleRow title="Income vs Expenses Trend" />
              {inRange.length === 0 ? (
                <EmptyState icon={RefreshCw} title="No data in the selected range" />
              ) : (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                      <XAxis dataKey="label" tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={formatAxisMoney} tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} width={56} />
                      <Tooltip
                        formatter={(v) => formatMoney(Number(v))}
                        labelStyle={tooltipLabelStyle}
                        itemStyle={tooltipItemStyle}
                        contentStyle={tooltipStyle}
                      />
                      {/* Session-208 (F-208f): recharts v3 sorts the
                          legend payload alphabetically by default
                          (itemSorter: 'value' → Expenses, Income, Net)
                          while the reference (v2) preserves series order —
                          Income first. itemSorter={null} disables the sort
                          (the selector skips sortBy when falsy). */}
                      <Legend itemSorter={null} />
                      <Line type="monotone" dataKey="income" name="Income" stroke={CHART_COLORS.income} strokeWidth={2.5} dot={false} />
                      <Line type="monotone" dataKey="expenses" name="Expenses" stroke={CHART_COLORS.expenses} strokeWidth={2.5} dot={false} />
                      <Line type="monotone" dataKey="net" name="Net" stroke={CHART_COLORS.net} strokeWidth={2} strokeDasharray="5 3" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </section>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <section className={cn(GLASS_CARD.base, CARD.padding)}>
                <CardTitleRow title="Spending by Day of Week" caption="This month" />
                {inRange.length === 0 ? (
                  <EmptyState icon={RefreshCw} title="No spending in range" />
                ) : (
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={byDay}>
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                      <XAxis dataKey="day" tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={formatAxisMoney} tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} width={56} />
                      <Tooltip
                        formatter={(v) => formatMoney(Number(v))}
                        labelStyle={tooltipLabelStyle}
                        itemStyle={tooltipItemStyle}
                        contentStyle={tooltipStyle}
                      />
                      <Bar dataKey="value" name="Spending" radius={[6, 6, 0, 0]} fill={CHART_COLORS.net} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                )}
              </section>
              <section className={cn(GLASS_CARD.base, CARD.padding)}>
                <CardTitleRow title="Needs vs Wants vs Savings" />
                {inRange.length === 0 ? (
                  <EmptyState icon={RefreshCw} title="No budget split in range" />
                ) : (
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Needs", value: split.needs },
                        { name: "Wants", value: split.wants },
                        { name: "Savings", value: split.savings },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={formatAxisMoney} tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} width={56} />
                      <Tooltip
                        formatter={(v) => formatMoney(Number(v))}
                        labelStyle={tooltipLabelStyle}
                        itemStyle={tooltipItemStyle}
                        contentStyle={tooltipStyle}
                      />
                      <Bar dataKey="value" name="Amount" radius={[6, 6, 0, 0]}>
                        <Cell fill="#3b82f6" />
                        <Cell fill="#a855f7" />
                        <Cell fill="#10b981" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                )}
              </section>
            </div>
          </TabsPanel>

          <TabsPanel tab="expenses" className="mt-4 space-y-4">
            <section className={cn(GLASS_CARD.base, CARD.padding)}>
              <CardTitleRow title="Expenses by Category" />
              {breakdown.length === 0 ? (
                <EmptyState icon={RefreshCw} title="No expenses in range" />
              ) : (
                <div className="flex flex-col items-center gap-6 lg:flex-row">
                  <div className="h-60 w-60 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={breakdown} dataKey="value" nameKey="category" innerRadius={62} outerRadius={100} paddingAngle={2} strokeWidth={0}>
                          {breakdown.map((slice) => (
                            <Cell key={slice.category} fill={slice.color} />
                          ))}
                        </Pie>
                        <Tooltip
                        formatter={(v) => formatMoney(Number(v))}
                        labelStyle={tooltipLabelStyle}
                        itemStyle={tooltipItemStyle}
                        contentStyle={tooltipStyle}
                      />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <ul className="w-full flex-1 space-y-2">
                    {breakdown.map((slice) => (
                      <li key={slice.category} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
                          {slice.category}
                        </span>
                        <span className="font-medium">
                          {formatMoney(slice.value)} <span className="text-xs text-stone-500 dark:text-stone-400">({slice.pct}%)</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </TabsPanel>

          <TabsPanel tab="income" className="mt-4 space-y-4">
            <section className={cn(GLASS_CARD.base, CARD.padding)}>
              <CardTitleRow title="Income Trend" />
              {incomeTrend.length === 0 ? (
                <EmptyState icon={RefreshCw} title="No income in range" />
              ) : (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={incomeTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="incFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={CHART_COLORS.income} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={CHART_COLORS.income} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={formatAxisMoney} tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} width={56} />
                    <Tooltip
                      formatter={(v) => formatMoney(Number(v))}
                      labelStyle={tooltipLabelStyle}
                      itemStyle={tooltipItemStyle}
                      contentStyle={tooltipStyle}
                    />
                    <Area type="monotone" dataKey="value" name="Income" stroke={CHART_COLORS.income} strokeWidth={2.5} fill="url(#incFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              )}
            </section>
          </TabsPanel>

          <TabsPanel tab="investments" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <section className={cn(GLASS_CARD.base, CARD.padding)}>
                <CardTitleRow title="Portfolio Composition" />
                {allocation.length === 0 ? (
                  <EmptyState icon={RefreshCw} title="No holdings to allocate" />
                ) : (
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={allocation} dataKey="value" nameKey="type" innerRadius={56} outerRadius={90} paddingAngle={2} strokeWidth={0}>
                        {allocation.map((slice) => {
                          const meta = INVESTMENT_TYPES.find((t) => t.value === slice.type);
                          return <Cell key={slice.type} fill={meta?.color ?? "#78716c"} />;
                        })}
                      </Pie>
                      <Tooltip
                        formatter={(v) => formatMoney(Number(v))}
                        labelStyle={tooltipLabelStyle}
                        itemStyle={tooltipItemStyle}
                        contentStyle={tooltipStyle}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                )}
              </section>
              <section className={cn(GLASS_CARD.base, CARD.padding)}>
                <CardTitleRow title="Holdings Performance" />
                {stats.holdings.length === 0 ? (
                  <EmptyState icon={RefreshCw} title="No holdings yet" />
                ) : (
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={foldedGains}>
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                      <XAxis dataKey="symbol" tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={formatAxisMoney} tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} width={56} />
                      <Tooltip
                        formatter={(v) => formatMoney(Number(v))}
                        labelStyle={tooltipLabelStyle}
                        itemStyle={tooltipItemStyle}
                        contentStyle={tooltipStyle}
                      />
                      <Bar dataKey="gain" name="Gain/Loss" radius={[6, 6, 0, 0]}>
                        {foldedGains.map((d) => (
                          <Cell key={d.symbol} fill={d.gain >= 0 ? "#10b981" : "#f43f5e"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                )}
              </section>
            </div>
          </TabsPanel>
        </Tabs>
      </div>
    </div>
  );
}

/** Session-209 (F-209b): the reference's Analytics stat tile — a saturated
 *  to-r gradient card (`rounded-xl <gradient> text-white border-0
 *  shadow-lg` > p-6 > label `text-X-100 text-sm font-medium mb-1` +
 *  `text-2xl font-bold` value + the w-8 h-8 tone icon right). */
function StatCard({
  label,
  value,
  gradient,
  labelClass,
  icon,
}: {
  label: string;
  value: string;
  gradient: string;
  labelClass: string;
  icon: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-xl text-white border-0 shadow-lg", gradient)}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={cn("text-sm font-medium mb-1", labelClass)}>{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          {icon}
        </div>
      </div>
    </div>
  );
}
