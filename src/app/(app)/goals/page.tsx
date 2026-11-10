"use client";

import * as React from "react";
import { PlusCircle, Target } from "lucide-react";
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
import { GOAL_CATEGORIES } from "@/lib/constants";
import { formatMoney, goalProgress, toDate } from "@/lib/finance";
import { toDateInputValue } from "@/lib/format";
import { CARD, GLASS_CARD, PAGE_ROOT, CTA } from "@/lib/page-layout";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import type { Goal } from "@/types";

export default function GoalsPage() {
  const store = useWealthOs();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Goal | null>(null);

  const goals = store.goals;
  const now = new Date();

  const openCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  return (
    <div className={PAGE_ROOT.standard}>
      <div className={PAGE_ROOT.containerMid}>
        <PageHeader
        tone="navy"
          title="Savings Goals"
          subtitle="Set and track your financial objectives"
          actions={
            <Button onClick={openCreate} className={CTA.amber}>
              <PlusCircle className="h-4 w-4" />
              New Goal
            </Button>
          }
        />

        {goals.length === 0 ? (
          <div className={cn(GLASS_CARD.base, CARD.padding)}>
            <EmptyState
              icon={Target}
              title="No Goals Set Yet"
              subtitle="Create your first savings goal to start tracking your financial objectives"
              action={
                <Button onClick={openCreate} className={CTA.amber}>
                  <PlusCircle className="h-4 w-4" />
                  Create Your First Goal
                </Button>
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {goals.map((goal) => {
              const progress = goalProgress(goal, now);
              const category = GOAL_CATEGORIES.find((c) => c.value === goal.category);
              const done = goal.status === "completed" || progress.pct >= 100;
              return (
                <div key={goal.id} className={cn(GLASS_CARD.base, CARD.padding)}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-xl dark:bg-amber-500/10"
                        aria-hidden="true"
                      >
                        {category?.emoji ?? "🎯"}
                      </span>
                      <div>
                        <p className="font-semibold text-stone-900 dark:text-stone-100">{goal.name}</p>
                        <p className="text-xs capitalize text-stone-500 dark:text-stone-400">
                          {category?.label ?? goal.category}
                        </p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        goal.status === "completed" || done
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : goal.status === "paused"
                            ? "bg-stone-100 text-stone-500 dark:bg-stone-800"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
                      )}
                    >
                      {goal.status === "completed" || done ? "Completed" : goal.status === "paused" ? "Paused" : "Active"}
                    </span>
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <p className="text-2xl font-bold text-stone-900 dark:text-stone-50">
                      {formatMoney(goal.currentAmount)}
                    </p>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      of {formatMoney(goal.targetAmount)}
                    </p>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        done
                          ? "bg-emerald-500"
                          : "bg-gradient-to-r from-amber-400 to-amber-500",
                      )}
                      style={{ width: `${progress.pct}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                    <span className="font-semibold text-amber-700 dark:text-amber-400">{progress.pct}% funded</span>
                    {goal.targetDate ? (
                      <span>
                        by{" "}
                        {toDate(goal.targetDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                        {progress.perMonthNeeded != null && !done
                          ? ` · ${formatMoney(progress.perMonthNeeded)}/mo`
                          : ""}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      className="h-8 flex-1 text-xs"
                      onClick={() => {
                        setEditing(goal);
                        setDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      className="h-8 flex-1 text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      onClick={async () => {
                        const res = await store.deleteGoal(goal.id);
                        if (res.ok) toast.success("Goal deleted");
                        else toast.error("Delete failed", res.error);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <GoalDialog open={dialogOpen} onOpenChange={setDialogOpen} editing={editing} />
      </div>
    </div>
  );
}

function GoalDialog({
  open,
  onOpenChange,
  editing,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: Goal | null;
}) {
  const store = useWealthOs();
  const [name, setName] = React.useState("");
  const [targetAmount, setTargetAmount] = React.useState("");
  const [currentAmount, setCurrentAmount] = React.useState("");
  const [targetDate, setTargetDate] = React.useState("");
  const [category, setCategory] = React.useState("other");
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
      setTargetAmount(editing ? String(editing.targetAmount) : "");
      setCurrentAmount(editing ? String(editing.currentAmount) : "");
      setTargetDate(editing?.targetDate ? toDateInputValue(toDate(editing.targetDate)) : ""); // F-218d
      setCategory(editing?.category ?? "other");
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const body: Record<string, unknown> = {
      name,
      targetAmount: Number(targetAmount),
      currentAmount: Number(currentAmount || 0),
      category,
      targetDate: targetDate || undefined,
    };
    const res = editing
      ? await store.updateGoal(editing.id, body)
      : await store.createGoal(body);
    setBusy(false);
    if (res.ok) {
      toast.success(editing ? "Goal updated" : "Goal created");
      onOpenChange(false);
    } else {
      toast.error("Save failed", res.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "Edit Goal" : "New Savings Goal"}</DialogTitle>
          <DialogDescription>
            {editing ? "Update your goal details." : "Define what you're saving toward."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="goal-name" className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Goal Name
            </label>
            <input
              id="goal-name"
              required
              maxLength={120}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Emergency Fund"
              className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="goal-target" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Target Amount (USD)
              </label>
              <input
                id="goal-target"
                required
                type="number"
                min="0"
                step="0.01"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="0.00"
                className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="goal-current" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Saved So Far (USD)
              </label>
              <input
                id="goal-current"
                type="number"
                min="0"
                step="0.01"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                placeholder="0.00"
                className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="goal-category" className="text-sm font-medium text-stone-700 dark:text-stone-300">Category</label> {/* F-218u */}
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="goal-category" aria-label="Goal category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GOAL_CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.emoji} {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="goal-date" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Target Date (optional)
              </label>
              <input
                id="goal-date"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="input-base"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={busy} className={CTA.amber}>
              {editing ? "Save Changes" : "Create Goal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
