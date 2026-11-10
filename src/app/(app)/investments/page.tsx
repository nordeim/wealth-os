"use client";

import * as React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  PieChart as PieIcon,
  PlusCircle,
  Wallet,
} from "lucide-react";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardTitleRow, EmptyState, GradientKpiCard, PageHeader, PeriodSegment } from "@/components/shared/page-parts";
import { useWealthOs } from "@/stores/wealthos-store";
import { useIsDark } from "@/components/layout/theme";
import { INVESTMENT_TYPES, PERIOD_MONTHS, PERIOD_OPTIONS } from "@/lib/constants";
import {
  assetAllocation,
  formatAxisMoney,
  formatMoney,
  portfolioStats,
  toDate,
} from "@/lib/finance";
import { toDateInputValue } from "@/lib/format";
import { CARD, PAGE_ROOT, CTA } from "@/lib/page-layout";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import type { Investment } from "@/types";

export default function InvestmentsPage() {
  const store = useWealthOs();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Investment | null>(null);
  const [period, setPeriod] = React.useState("6M");
  const isDark = useIsDark();

  const investments = store.investments;
  const stats = portfolioStats(investments);
  const allocation = assetAllocation(investments);

  const axisColor = isDark ? "#a8a29e" : "#78716c";
  const gridColor = isDark ? "#292524" : "#e7e5e4";

  // The performance chart: a deterministic value path from the invested
  // basis to today's value across the period (linear interpolation —
  // the real position history needs a price feed we deliberately do
  // not call at runtime).
  const series = React.useMemo(() => {
    const months = PERIOD_MONTHS[period as keyof typeof PERIOD_MONTHS] ?? 6;
    const points: Array<{ label: string; value: number }> = [];
    const now = new Date();
    for (let i = months; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const t = months === 0 ? 1 : (months - i) / months;
      points.push({
        label: month.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
        value: Math.round(stats.invested + (stats.value - stats.invested) * t),
      });
    }
    return points;
  }, [period, stats.invested, stats.value]);

  const openCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  return (
    <div className={PAGE_ROOT.standard}>
      <div className={PAGE_ROOT.containerWide}>
        <PageHeader
          title="Investments"
          subtitle="Track your portfolio performance"
          actions={
            <Button onClick={openCreate} className={CTA.emerald}>
              <PlusCircle className="h-4 w-4" />
              Add Investment
            </Button>
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <GradientKpiCard
            label="Portfolio Value"
            value={formatMoney(stats.value)}
            sub={`${investments.length} holdings`}
            icon={Wallet}
            gradient="bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600"
          />
          <GradientKpiCard
            label="Total Gain / Loss"
            value={formatMoney(stats.gainLoss)}
            sub={`${stats.gainLoss >= 0 ? "+" : ""}${stats.returnPct}% all time`}
            icon={stats.gainLoss >= 0 ? ArrowUpRight : ArrowDownRight}
            gradient="bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600"
          />
          <GradientKpiCard
            label="Total Return %"
            value={`${stats.returnPct}%`}
            sub="vs cost basis"
            icon={PieIcon}
            gradient="bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <section className={cn(CARD.base, CARD.padding, "lg:col-span-2")} aria-label="Portfolio Performance">
            <CardTitleRow
              title="Portfolio Performance"
              trailing={<PeriodSegment value={period} onChange={setPeriod} options={PERIOD_OPTIONS} />}
            />
            {investments.length === 0 ? (
              <EmptyState
                icon={PieIcon}
                title="Add investments to see performance chart"
              />
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="pfFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} />
                    <YAxis
                      tickFormatter={formatAxisMoney}
                      tick={{ fontSize: 12, fill: axisColor }}
                      axisLine={false}
                      tickLine={false}
                      width={56}
                    />
                    <Tooltip
                      formatter={(value) => [formatMoney(Number(value)), "Value"]}
                      contentStyle={{ borderRadius: 12, border: "1px solid #e7e5e4" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      name="Value"
                      stroke="#10b981"
                      strokeWidth={2.5}
                      fill="url(#pfFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>

          <section className={cn(CARD.base, CARD.padding)} aria-label="Asset Allocation">
            <CardTitleRow icon={PieIcon} title="Asset Allocation" />
            {allocation.length === 0 ? (
              <EmptyState icon={PieIcon} title="No investments to display" subtitle="Add investments to see risk analytics" />
            ) : (
              <>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocation}
                        dataKey="value"
                        nameKey="type"
                        innerRadius={48}
                        outerRadius={76}
                        paddingAngle={2}
                        strokeWidth={0}
                      >
                        {allocation.map((slice) => {
                          const meta = INVESTMENT_TYPES.find((t) => t.value === slice.type);
                          return <Cell key={slice.type} fill={meta?.color ?? "#78716c"} />;
                        })}
                      </Pie>
                      <Tooltip formatter={(value) => formatMoney(Number(value))} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {allocation.map((slice) => {
                    const meta = INVESTMENT_TYPES.find((t) => t.value === slice.type);
                    return (
                      <li key={slice.type} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: meta?.color }} />
                          {meta?.label ?? slice.type}
                        </span>
                        <span className="font-medium text-stone-900 dark:text-stone-100">
                          {slice.pct}%
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </section>
        </div>

        {/* Holdings table */}
        <section className={cn(CARD.base, CARD.padding)} aria-label="Portfolio Holdings">
          <h2 className={cn(CARD.title, "mb-4")}>Portfolio Holdings</h2>
          {investments.length === 0 ? (
            <EmptyState
              icon={Wallet}
              title="No investments yet"
              action={
                <Button onClick={openCreate} className={CTA.emerald}>
                  <PlusCircle className="h-4 w-4" />
                  Add Your First Investment
                </Button>
              }
            />
          ) : (
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-stone-200 text-left text-xs uppercase tracking-wide text-stone-500 dark:border-stone-800 dark:text-stone-400">
                    <th className="pb-2 pr-4 font-semibold">Asset</th>
                    <th className="pb-2 pr-4 font-semibold">Name</th>
                    <th className="pb-2 pr-4 font-semibold">Type</th>
                    <th className="pb-2 pr-4 text-right font-semibold">Invested</th>
                    <th className="pb-2 pr-4 text-right font-semibold">Current Value</th>
                    <th className="pb-2 pr-4 text-right font-semibold">Gain/Loss</th>
                    <th className="pb-2 pr-4 text-right font-semibold">% of Portfolio</th>
                    <th className="pb-2 font-semibold sr-only">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200/70 dark:divide-stone-800">
                  {stats.holdings.map((row) => {
                    const inv = investments.find((i) => i.symbol === row.symbol);
                    const meta = INVESTMENT_TYPES.find((t) => t.value === row.type);
                    return (
                      <tr key={row.symbol} className="group">
                        <td className="py-3 pr-4">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-xs font-bold text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                            {row.symbol.slice(0, 3)}
                          </span>
                        </td>
                        <td className="py-3 pr-4 font-medium text-stone-900 dark:text-stone-100">{row.name}</td>
                        <td className="py-3 pr-4">
                          <span
                            className="rounded-full px-2 py-0.5 text-xs font-medium"
                            style={{ backgroundColor: `${meta?.color ?? "#78716c"}1a`, color: meta?.text ?? "#57534e" }} /* F-218k: the readable step, the tint keeps the hue */
                          >
                            {meta?.label ?? row.type}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-right text-stone-600 dark:text-stone-400">{formatMoney(row.invested)}</td>
                        <td className="py-3 pr-4 text-right font-semibold text-stone-900 dark:text-stone-100">
                          {formatMoney(row.value)}
                        </td>
                        <td
                          className={cn(
                            "py-3 pr-4 text-right font-semibold",
                            row.gainLoss >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400", // F-218j
                          )}
                        >
                          {row.gainLoss >= 0 ? "+" : ""}
                          {formatMoney(row.gainLoss)}
                          <span className="ml-1 text-xs">
                            ({row.gainPct >= 0 ? "+" : ""}
                            {row.gainPct}%)
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-right text-stone-600 dark:text-stone-400">{row.pctOfPortfolio}%</td>
                        <td className="py-3 text-right">
                          <span className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              className="h-7 px-2 text-xs"
                              onClick={() => {
                                if (inv) {
                                  setEditing(inv);
                                  setDialogOpen(true);
                                }
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              className="h-7 px-2 text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                              onClick={async () => {
                                if (!inv) return;
                                const res = await store.deleteInvestment(inv.id);
                                if (res.ok) toast.success("Investment removed");
                                else toast.error("Delete failed", res.error);
                              }}
                            >
                              <span className="sr-only">Delete {row.symbol}</span>
                              ✕
                            </Button>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <InvestmentDialog open={dialogOpen} onOpenChange={setDialogOpen} editing={editing} />
      </div>
    </div>
  );
}

function InvestmentDialog({
  open,
  onOpenChange,
  editing,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: Investment | null;
}) {
  const store = useWealthOs();
  const [symbol, setSymbol] = React.useState("");
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("stock");
  const [shares, setShares] = React.useState("");
  const [avgCost, setAvgCost] = React.useState("");
  const [currentValue, setCurrentValue] = React.useState("");
  const [purchaseDate, setPurchaseDate] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  // Prefill on open — RENDER-TIME adjustment (the sanctioned
  // pattern; no setState inside an effect): when the dialog's
  // identity changes, adjust this component's own state during
  // render before the children commit.
  const [formKey, setFormKey] = React.useState<string | null>(null);
  const nextKey = open ? (editing ? `edit-${editing.id}` : "create") : null;
  if (formKey !== nextKey) {
    setFormKey(nextKey);
      setSymbol(editing?.symbol ?? "");
      setName(editing?.name ?? "");
      setType(editing?.type ?? "stock");
      setShares(editing ? String(editing.shares) : "");
      setAvgCost(editing ? String(editing.avgCost) : "");
      setCurrentValue(editing ? String(editing.currentValue) : "");
      setPurchaseDate(
        editing?.purchaseDate ? toDateInputValue(toDate(editing.purchaseDate)) : "",
      );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const body: Record<string, unknown> = {
      symbol,
      name,
      type,
      shares: Number(shares),
      avgCost: Number(avgCost),
      currentValue: Number(currentValue),
      purchaseDate: purchaseDate || undefined,
    };
    const res = editing
      ? await store.updateInvestment(editing.id, body)
      : await store.createInvestment(body);
    setBusy(false);
    if (res.ok) {
      toast.success(editing ? "Investment updated" : "Investment added");
      onOpenChange(false);
    } else {
      toast.error("Save failed", res.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "Edit Investment" : "Add Investment"}</DialogTitle>
          <DialogDescription>
            {editing ? "Update the holding's details." : "Add a holding to your portfolio."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="inv-symbol" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Symbol
              </label>
              <input
                id="inv-symbol"
                required
                maxLength={20}
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                placeholder="AAPL"
                className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 font-mono text-sm uppercase text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="investment-type" className="text-sm font-medium text-stone-700 dark:text-stone-300">Type</label> {/* F-218u */}
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="investment-type" aria-label="Investment type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INVESTMENT_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="inv-name" className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Name
            </label>
            <input
              id="inv-name"
              required
              maxLength={160}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Apple Inc."
              className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label htmlFor="inv-shares" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Shares
              </label>
              <input
                id="inv-shares"
                required
                type="number"
                min="0"
                step="any"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
                placeholder="0"
                className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="inv-cost" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Avg Cost (USD)
              </label>
              <input
                id="inv-cost"
                required
                type="number"
                min="0"
                step="0.01"
                value={avgCost}
                onChange={(e) => setAvgCost(e.target.value)}
                placeholder="0.00"
                className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="inv-price" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Current Price (USD)
              </label>
              <input
                id="inv-price"
                required
                type="number"
                min="0"
                step="0.01"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                placeholder="0.00"
                className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="inv-date" className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Purchase Date (optional)
            </label>
            <input
              id="inv-date"
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="input-base"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={busy} className={CTA.emerald}>
              {editing ? "Save Changes" : "Add Investment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
