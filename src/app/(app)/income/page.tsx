"use client";

import * as React from "react";
import { Briefcase, PlusCircle, TrendingUp } from "lucide-react";
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
import { EmptyState, PageHeader } from "@/components/shared/page-parts";
import { useWealthOs } from "@/stores/wealthos-store";
import {
  FREQUENCY_TO_MONTHLY,
  INCOME_FREQUENCIES,
  INCOME_SOURCE_TYPES,
} from "@/lib/constants";
import { formatMoney, relativeDays, toDate, totalMonthlyIncome } from "@/lib/finance";
import { toDateInputValue } from "@/lib/format";
import { CARD, GLASS_CARD, PAGE_ROOT } from "@/lib/page-layout";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import type { IncomeSource } from "@/types";

const TYPE_STYLES: Record<string, { color: string; soft: string }> = {
  salary: { color: "#10b981", soft: "#ecfdf5" },
  freelance: { color: "#3b82f6", soft: "#eff6ff" },
  business: { color: "#a855f7", soft: "#faf5ff" },
  investment: { color: "#f59e0b", soft: "#fffbeb" },
  rental: { color: "#14b8a6", soft: "#f0fdfa" },
  other: { color: "#78716c", soft: "#f5f5f4" },
};

export default function IncomePage() {
  const store = useWealthOs();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<IncomeSource | null>(null);

  const sources = store.incomeSources;
  const active = sources.filter((s) => s.active);
  const monthlyTotal = totalMonthlyIncome(sources);

  const openCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };
  const openEdit = (source: IncomeSource) => {
    setEditing(source);
    setDialogOpen(true);
  };

  const toggleActive = async (source: IncomeSource) => {
    const res = await store.updateIncomeSource(source.id, { active: !source.active });
    if (res.ok) {
      toast.success(source.active ? "Income source paused" : "Income source activated");
    } else {
      toast.error("Update failed", res.error);
    }
  };

  return (
    <div className={PAGE_ROOT.standard}>
      <div className={PAGE_ROOT.containerMid}>
        <PageHeader
        tone="navy"
          title="Income Sources"
          subtitle="Track and manage all your income streams"
          actions={
            <Button onClick={openCreate}>
              <PlusCircle className="h-4 w-4" />
              Add Income Source
            </Button>
          }
        />

        <div className={cn(GLASS_CARD.base, CARD.padding, "flex items-center gap-4")}>
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
            <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </span>
          <div>
            <p className="text-sm font-medium text-stone-500 dark:text-stone-500">Total Monthly Income</p>
            <p className="text-2xl font-bold text-stone-900 dark:text-stone-50">
              {formatMoney(monthlyTotal)}
            </p>
            <p className="text-xs text-stone-500">
              From {active.length} active source{active.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        {sources.length === 0 ? (
          <div className={cn(GLASS_CARD.base, CARD.padding)}>
            <EmptyState
              icon={Briefcase}
              title="No Income Sources Yet"
              subtitle="Start by adding your income sources to track your financial progress"
              action={
                <Button onClick={openCreate}>
                  <PlusCircle className="h-4 w-4" />
                  Add Your First Income Source
                </Button>
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sources.map((source) => {
              const style = TYPE_STYLES[source.type] ?? TYPE_STYLES.other;
              const monthly = source.amount * (FREQUENCY_TO_MONTHLY[source.frequency] ?? 1);
              return (
                <div key={source.id} className={cn(GLASS_CARD.base, CARD.padding, "group")}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: style.soft, color: style.color }}
                      >
                        <Briefcase className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-stone-900 dark:text-stone-100">{source.name}</p>
                        <p className="text-xs capitalize text-stone-500 dark:text-stone-500">
                          {source.type} · {source.frequency}
                        </p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        source.active
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-stone-100 text-stone-600 dark:bg-stone-800",
                      )}
                    >
                      {source.active ? "Active" : "Paused"}
                    </span>
                  </div>
                  <p className="mt-3 text-2xl font-bold text-stone-900 dark:text-stone-50">
                    {formatMoney(source.amount)}
                    <span className="ml-1 text-xs font-medium text-stone-500">
                      /{source.frequency.replace("biweekly", "2 weeks").replace("annually", "year")}
                    </span>
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-500">
                    ≈ {formatMoney(monthly)} / month
                    {source.nextPaymentDate
                      ? ` · next ${relativeDays(new Date(source.nextPaymentDate), new Date())}`
                      : ""}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="h-8 flex-1 text-xs" onClick={() => openEdit(source)}>
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-8 flex-1 text-xs"
                      onClick={() => void toggleActive(source)}
                    >
                      {source.active ? "Pause" : "Activate"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <IncomeSourceDialog open={dialogOpen} onOpenChange={setDialogOpen} editing={editing} />
      </div>
    </div>
  );
}

function IncomeSourceDialog({
  open,
  onOpenChange,
  editing,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: IncomeSource | null;
}) {
  const store = useWealthOs();
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("salary");
  const [amount, setAmount] = React.useState("");
  const [frequency, setFrequency] = React.useState("monthly");
  const [nextPaymentDate, setNextPaymentDate] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  // Prefill on open — RENDER-TIME adjustment (the sanctioned
  // pattern; no setState inside an effect): when the dialog's
  // identity changes, adjust this component's own state during
  // render before the children commit.
  const [formKey, setFormKey] = React.useState<string | null>(null);
  const nextKey = open ? (editing ? `edit-${editing.id}` : "create") : null;
  if (formKey !== nextKey) {
    setFormKey(nextKey);
      setName(editing?.name ?? "");
      setType(editing?.type ?? "salary");
      setAmount(editing ? String(editing.amount) : "");
      setFrequency(editing?.frequency ?? "monthly");
      setNextPaymentDate(
        editing?.nextPaymentDate ? toDateInputValue(toDate(editing.nextPaymentDate)) : "", // F-218d
      );
      setNotes(editing?.notes ?? "");
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const body: Record<string, unknown> = {
      name,
      type,
      amount: Number(amount),
      frequency,
      notes: notes || undefined,
    };
    if (nextPaymentDate) body.nextPaymentDate = nextPaymentDate;
    const res = editing
      ? await store.updateIncomeSource(editing.id, body)
      : await store.createIncomeSource(body);
    setBusy(false);
    if (res.ok) {
      toast.success(editing ? "Income source updated" : "Income source added");
      onOpenChange(false);
    } else {
      toast.error("Save failed", res.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "Edit Income Source" : "Add Income Source"}</DialogTitle>
          <DialogDescription>
            {editing ? "Update your income stream details." : "Add a recurring or one-off income stream."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="income-name" className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Name
            </label>
            <input
              id="income-name"
              required
              maxLength={120}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Software Engineering Salary"
              className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="income-type" className="text-sm font-medium text-stone-700 dark:text-stone-300">Type</label> {/* F-218u */}
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="income-type" aria-label="Income type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INCOME_SOURCE_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="income-frequency" className="text-sm font-medium text-stone-700 dark:text-stone-300">Frequency</label> {/* F-218u */}
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger id="income-frequency" aria-label="Payment frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INCOME_FREQUENCIES.map((f) => (
                    <SelectItem key={f.value} value={f.value}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="income-amount" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Amount (USD)
              </label>
              <input
                id="income-amount"
                required
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="income-next" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Next Payment Date (optional)
              </label>
              <input
                id="income-next"
                type="date"
                value={nextPaymentDate}
                onChange={(e) => setNextPaymentDate(e.target.value)}
                className="input-base"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="income-notes" className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Notes (optional)
            </label>
            <textarea
              id="income-notes"
              maxLength={1000}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="min-h-16 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={busy}>
              {editing ? "Save Changes" : "Add Income Source"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
