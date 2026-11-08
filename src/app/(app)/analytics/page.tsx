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
import { Download, RefreshCw } from "lucide-react";
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
  portfolioStats,
  spendingByDayOfWeek,
} from "@/lib/finance";
import { toDateInputValue } from "@/lib/format";
import { CARD, PAGE_ROOT } from "@/lib/page-layout";
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
  const n = Number(months);

  const txs = store.transactions;
  const inRange = React.useMemo(
    () =>
      txs.filter((t) => {
        const d = new Date(t.date).getTime();
        return d >= new Date(from).getTime() && d <= new Date(to).getTime() + 86_399_000;
      }),
    [txs, from, to],
  );

  const trend = React.useMemo(() => cashFlowSeries(inRange, n, new Date(to)), [inRange, n, to]);
  const breakdown = React.useMemo(() => expenseBreakdown(inRange, new Date(to)), [inRange, to]);
  const split = React.useMemo(() => budgetCategorySplit(inRange, new Date(to)), [inRange, to]);
  const byDay = React.useMemo(() => spendingByDayOfWeek(inRange, new Date(to)), [inRange, to]);
  const incomeTrend = React.useMemo(
    () => categoryTrend(inRange, n, new Date(to), null, "income"),
    [inRange, n, to],
  );
  const stats = portfolioStats(store.investments);
  const allocation = assetAllocation(store.investments);

  const exportCsv = () => {
    const header = "Date,Description,Type,Category,Budget Category,Amount";
    const lines = inRange.map(
      (t) =>
        `${new Date(t.date).toISOString().slice(0, 10)},"${t.description.replace(/"/g, '""')}",${t.type},"${t.category}",${t.budgetCategory},${t.amount}`,
    );
    const blob = new Blob([[header, ...lines].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wealthos-analytics.csv";
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
              <Button variant="outline" onClick={() => void store.refresh()}>
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button onClick={exportCsv}>
                <Download className="h-4 w-4" />
                Export
              </Button>
            </>
          }
        />

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
            <section className={cn(CARD.base, CARD.padding)}>
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
                      <Tooltip formatter={(v) => formatMoney(Number(v))} />
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
              <section className={cn(CARD.base, CARD.padding)}>
                <CardTitleRow title="Spending by Day of Week" caption="This month" />
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={byDay}>
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                      <XAxis dataKey="day" tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={formatAxisMoney} tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} width={56} />
                      <Tooltip formatter={(v) => formatMoney(Number(v))} />
                      <Bar dataKey="value" name="Spending" radius={[6, 6, 0, 0]} fill={CHART_COLORS.net} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>
              <section className={cn(CARD.base, CARD.padding)}>
                <CardTitleRow title="Needs vs Wants vs Savings" />
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
                      <Tooltip formatter={(v) => formatMoney(Number(v))} />
                      <Bar dataKey="value" name="Amount" radius={[6, 6, 0, 0]}>
                        <Cell fill="#3b82f6" />
                        <Cell fill="#a855f7" />
                        <Cell fill="#10b981" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>
            </div>
          </TabsPanel>

          <TabsPanel tab="expenses" className="mt-4 space-y-4">
            <section className={cn(CARD.base, CARD.padding)}>
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
                        <Tooltip formatter={(v) => formatMoney(Number(v))} />
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
                          {formatMoney(slice.value)} <span className="text-xs text-stone-500">({slice.pct}%)</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </TabsPanel>

          <TabsPanel tab="income" className="mt-4 space-y-4">
            <section className={cn(CARD.base, CARD.padding)}>
              <CardTitleRow title="Income Trend" />
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
                    <Tooltip formatter={(v) => formatMoney(Number(v))} />
                    <Area type="monotone" dataKey="value" name="Income" stroke={CHART_COLORS.income} strokeWidth={2.5} fill="url(#incFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>
          </TabsPanel>

          <TabsPanel tab="investments" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <section className={cn(CARD.base, CARD.padding)}>
                <CardTitleRow title="Portfolio Composition" />
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={allocation} dataKey="value" nameKey="type" innerRadius={56} outerRadius={90} paddingAngle={2} strokeWidth={0}>
                        {allocation.map((slice) => {
                          const meta = INVESTMENT_TYPES.find((t) => t.value === slice.type);
                          return <Cell key={slice.type} fill={meta?.color ?? "#78716c"} />;
                        })}
                      </Pie>
                      <Tooltip formatter={(v) => formatMoney(Number(v))} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </section>
              <section className={cn(CARD.base, CARD.padding)}>
                <CardTitleRow title="Holdings Performance" />
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.holdings.map((h) => ({ symbol: h.symbol, gain: h.gainLoss }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                      <XAxis dataKey="symbol" tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={formatAxisMoney} tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} width={56} />
                      <Tooltip formatter={(v) => formatMoney(Number(v))} />
                      <Bar dataKey="gain" name="Gain/Loss" radius={[6, 6, 0, 0]}>
                        {stats.holdings.map((h) => (
                          <Cell key={h.symbol} fill={h.gainLoss >= 0 ? "#10b981" : "#f43f5e"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>
            </div>
          </TabsPanel>
        </Tabs>
      </div>
    </div>
  );
}
