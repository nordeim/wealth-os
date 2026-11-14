"use client";

import * as React from "react";
import {
  ArrowLeft,
  Filter,
  Minus,
  PlusCircle,
  Receipt,
  Search,
  TrendingDown,
  X,
} from "lucide-react";
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
import { Tabs, TabsPanel } from "@/components/ui/tabs";
import { EmptyState, PageHeader } from "@/components/shared/page-parts";
import { useWealthOs } from "@/stores/wealthos-store";
import { useIsDark } from "@/components/layout/theme";
import {
  BUDGET_CATEGORY_META,
  EXPENSE_CATEGORIES,
  QUICK_EXPENSE_CATEGORIES,
} from "@/lib/constants";
import { budgetCategorySplit, formatMoney, toDate } from "@/lib/finance";
import { toDateInputValue } from "@/lib/format";
import { CARD, GLASS_CARD, PAGE_ROOT, CTA, FORM_INPUT } from "@/lib/page-layout";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types";

const QUICK_ADDS = [1, 5, 10, 50, 100, 500];

export default function ExpensesPage() {
  const store = useWealthOs();
  // Session-223 (R-20, F-223i): the icon-tile tint needs the theme —
  // the hex pastel renders a bright chip on dark cards; the 10%-alpha
  // form (the accounts genus) adapts to both surfaces.
  const isDark = useIsDark();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Transaction | null>(null);
  const [search, setSearch] = React.useState("");
  const [tab, setTab] = React.useState("all");
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  // Session-222 (R-19, F-222l): the row-delete busy rider — the
  // F-221q round covered the four card-button surfaces but missed
  // the app's highest-traffic delete (a rapid double-click fired two
  // DELETEs; the second 404s and toasts a spurious "Delete failed").
  const [busyId, setBusyId] = React.useState<string | null>(null);
  // Session-218 (R-15, F-218b): the trigger's own ref — the R-14 cure
  // removed the bare `button[aria-expanded]` outside-close guard but
  // never landed the scoped replacement its comment claimed (the
  // trigger carries no aria-label; that label rides the popover PANEL,
  // a DOM sibling, so the closest('[aria-label=…]') exclusion never
  // matched it): pointerdown on the toggle fired setFiltersOpen(false),
  // the effect detached, and the subsequent click toggled false→true —
  // the popover flicker-reopened and the toggle could not dismiss it
  // (live-reproduced). The ref scopes the exclusion to the toggle
  // itself: its pointerdown never closes, the click alone toggles.
  const filtersTriggerRef = React.useRef<HTMLButtonElement | null>(null);
  const [categoryFilter, setCategoryFilter] = React.useState("all");

  const now = new Date();
  // Session-231 (R-28, F-231j): memoized on the store's stable array —
  // a bare filter mints a fresh identity every render and defeats the
  // `visible` memo below (it recomputed every render for nothing).
  const expenses = React.useMemo(
    () => store.transactions.filter((t) => t.type === "expense"),
    [store.transactions],
  );
  const split = budgetCategorySplit(store.transactions, now);

  const activeFilters = [categoryFilter !== "all", tab !== "all"].filter(Boolean).length;
  // Session-216 (R-13, F-216i): the filters popover closes on Escape +
  // outside pointerdown — every other transient surface (the drawer,
  // the dialogs, the dropdowns) already did; keyboard users had to tab
  // back to the ✕ button.
  // Session-217 (R-14, F-217a): the outside-close must spare the
  // PORTALED Radix surfaces — the Category <Select> renders its
  // options through SelectPrimitive.Portal into document.body, OUTSIDE
  // the popover group in DOM; a pointerdown on div[role="option"] fired
  // setFiltersOpen(false) mid-pick, unmounting the popover (and the
  // Select root with it) before the selection registered — mouse users
  // could not apply a category filter at all (live-reproduced). The
  // exclusion list names the portal carriers; the expanded-button guard
  // is scoped to the popover's OWN trigger (the bare
  // button[aria-expanded] form also matched the drawer hamburger);
  // Escape closes the popover only when no Radix layer is open above
  // it (Radix preventDefault does not stopPropagation — one Escape
  // must dismiss the Select alone and leave the popover standing).
  // F-218b: the trigger guard keys on the ref (not the effect's deps —
  // the ref is stable across renders).
  React.useEffect(() => {
    if (!filtersOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (document.querySelector("[data-radix-popper-content-wrapper]")) return;
      setFiltersOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!(e.target instanceof HTMLElement)) return;
      // The toggle's OWN pointerdown never closes (F-218b): the click
      // that follows pointerdown owns the toggle; closing here would
      // fire twice (close + reopen) and the toggle could never dismiss.
      if (filtersTriggerRef.current?.contains(e.target)) return;
      if (e.target.closest('[aria-label="Expense filters"]')) return;
      // The portaled Select option/listbox surfaces — an option lives
      // in document.body, so "outside the popover group" is its NORMAL
      // address, not an outside click.
      if (e.target.closest('[role="option"], [role="listbox"], [data-radix-popper-content-wrapper]')) return;
      if (e.target.closest('button[aria-label="Close filters"]')) return;
      setFiltersOpen(false);
    };
    // Session-238 (R-35, F-238f): the popover is an in-flow absolute
    // surface anchored to the trigger — when the main scroller moves
    // while it is open, its top region travels UNDER the sticky mobile
    // header (the 50-level layer) and turns unclickable. Closing on
    // scroll is the one-line cure (the standard non-portal-popover
    // behavior); the layering stays untouched. `main` owns scrolling
    // in the shell model (the mobile drawer's own lock contract).
    const onScroll = () => setFiltersOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    document.querySelector("main")?.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      document.querySelector("main")?.removeEventListener("scroll", onScroll);
    };
  }, [filtersOpen]);


  const visible = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    return expenses.filter((t) => {
      if (tab !== "all" && t.budgetCategory !== tab) return false;
      if (categoryFilter !== "all" && t.category !== categoryFilter) return false;
      if (q && !`${t.description} ${t.category} ${t.notes ?? ""}`.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [expenses, tab, categoryFilter, search]);

  const openCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  // F-218o: the shared history body — rendered inside every tab panel
  // (the active one shows; the rest stay hidden but their
  // aria-controls now resolve).
  const historyBody = visible.length === 0 ? (
    <EmptyState
      icon={TrendingDown}
      title="No expenses yet"
      subtitle="Start tracking your spending to better manage your budget"
      action={
        <Button onClick={openCreate} className={CTA.rose}>
          <PlusCircle className="h-4 w-4" />
          Add Your First Expense
        </Button>
      }
    />
  ) : (
    <ul className="divide-y divide-stone-200/70 dark:divide-stone-800">
      {visible.map((tx) => {
        const meta = BUDGET_CATEGORY_META[tx.budgetCategory as "needs" | "wants" | "savings"] ?? BUDGET_CATEGORY_META.wants;
        return (
          <li key={tx.id} className="flex items-center justify-between gap-3 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: isDark ? `${meta.color}1a` : meta.soft, color: meta.color }}
              >
                <Receipt className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-stone-900 dark:text-stone-100">
                  {tx.description}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {tx.category} · {toDate(tx.date).toLocaleDateString("en-US", { // F-218d
                    month: "short",
                    day: "numeric",
                  })}
                  {tx.recurring ? " · recurring" : ""}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {formatMoney(tx.amount)}
              </span>
              <Button
                variant="ghost"
                className="h-8 px-2 text-xs"
                onClick={() => {
                  setEditing(tx);
                  setDialogOpen(true);
                }}
              >
                Edit
                <span className="sr-only">{tx.description}</span>
              </Button>
              <Button
                variant="ghost"
                className="h-8 px-2 text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                disabled={busyId === tx.id}
                onClick={() => void deleteExpense(tx)}
              >
                <X className="h-3.5 w-3.5" />
                <span className="sr-only">Delete {tx.description}</span>
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );

  const deleteExpense = async (tx: Transaction) => {
    setBusyId(tx.id);
    const res = await store.deleteTransaction(tx.id);
    // F-235e: clear only if this row still owns the slot — a sibling's
    // in-flight guard must survive another row's completion.
    setBusyId((prev) => (prev === tx.id ? null : prev));
    if (res.ok) toast.success("Expense deleted");
    else toast.error("Delete failed", res.error);
  };

  return (
    <div className={PAGE_ROOT.standard}>
      <div className={PAGE_ROOT.containerWide}>
        <PageHeader
          tone="navy"
          title="Expenses"
          subtitle="Track and categorize all your spending"
          actions={
            <Button onClick={openCreate} className={CTA.rose}>
              <PlusCircle className="h-4 w-4" />
              Add Expense
            </Button>
          }
        />

        {/* Summary trio — session-209 (F-209a): the reference's glass genus
            (its needs/wants/savings tiles carry card-hover; our Total tile is
            the documented superset, plain glass) */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <div className={cn(GLASS_CARD.base, CARD.padding)}>
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Total Expenses</p>
            <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-50">
              {formatMoney(split.needs + split.wants + split.savings)}
            </p>
          </div>
          {(["needs", "wants", "savings"] as const).map((key) => (
            <div key={key} className={cn(GLASS_CARD.hover, CARD.padding)}>
              <span className="flex items-center gap-1.5 text-sm font-medium text-stone-500 dark:text-stone-400">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: BUDGET_CATEGORY_META[key].color }}
                />
                {BUDGET_CATEGORY_META[key].label}
              </span>
              <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-50">
                {formatMoney(split[key])}
              </p>
            </div>
          ))}
        </div>

        {/* Search + filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500 dark:text-stone-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search expenses..."
              aria-label="Search expenses"
              className="h-10 w-full rounded-lg border border-stone-200 bg-white pl-9 pr-3 text-sm text-stone-900 shadow-sm placeholder:text-stone-500 dark:placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
            />
          </div>
          <div className="relative">
            <Button
              variant="outline"
              ref={filtersTriggerRef}
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              aria-controls="expense-filters"
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFilters > 0 ? (
                <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[11px] font-bold text-stone-900">
                  {activeFilters}
                </span>
              ) : null}
            </Button>
            {filtersOpen ? (
              <div
                className="absolute right-0 top-12 z-20 w-64 rounded-lg border border-stone-200 bg-white p-4 shadow-lg dark:border-stone-700 dark:bg-stone-900"
                role="group"
                aria-label="Expense filters"
                id="expense-filters"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">Filters</span>
                  <button
                    type="button"
                    aria-label="Close filters"
                    onClick={() => setFiltersOpen(false)}
                    className="rounded-md p-1 text-stone-500 hover:text-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-stone-400 dark:hover:text-stone-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <label className="mb-1 block text-xs font-medium text-stone-500 dark:text-stone-400" htmlFor="expense-category-filter">
                  Category
                </label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger id="expense-category-filter" aria-label="Filter by category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    <SelectItem value="all">All categories</SelectItem>
                    {EXPENSE_CATEGORIES.map((c) => (
                      <SelectItem key={c.label} value={c.label}>
                        {/* F-235g: the glyph is decorative — the chips face's
                            own convention (the emoji never rides the
                            accessible name of the option or the trigger
                            echo). */}
                        <span aria-hidden="true">{c.emoji}</span> {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : null}
          </div>
        </div>

        {/* History — the page's glass genus (F-209a) */}
        <section className={cn(GLASS_CARD.base, CARD.padding)}>
          {/* Session-238 (R-35, F-238a): the header row and the Tabs
              wrapper are SIBLINGS. The session-199 original nested the
              Tabs (tablist AND all four panels — the whole list body)
              INSIDE this sm:flex-row header div, so at every viewport
              ≥ sm the entire history list collapsed to a ~427px
              right-side column while the h2 floated vertically centered
              beside it (live-measured: the list ul x=957 w=427 inside
              the 1120px card at 1440 — invisible to every gate: the
              sweeps capture the zero-data state, where the squeezed
              element's computed classes are unchanged). The reference's
              own card stacks the title, the tablist, and the content
              full-width (live-probed); the Analytics page carries the
              same sibling form. */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className={CARD.title}>Expense History ({visible.length})</h2>
          </div>
          <Tabs
            value={tab}
            onValueChange={setTab}
            variant="segmented"
            ariaLabel="Filter expenses by budget category"
            tabs={[
              { id: "all", label: "All" },
              { id: "needs", label: "Needs" },
              { id: "wants", label: "Wants" },
              { id: "savings", label: "Savings" },
            ]}
          >
            {/* Session-218 (R-15, F-218o): one panel per trigger — the
                pre-cure single panel left three triggers' aria-controls
                dangling at dead ids (the F-217s promotion; the analytics
                pattern). The list body is the shared filtered view. */}
            {(["all", "needs", "wants", "savings"] as const).map((panelId) => (
              <TabsPanel key={panelId} tab={panelId}>
                {/* Only the ACTIVE panel carries the list — the hidden
                    shells stay empty so text selectors stay unique
                    (the maiden e2e run decoded the quadruplicated
                    hidden copies). aria-controls resolves for every
                    trigger; the content renders once. */}
                {tab === panelId ? historyBody : null}
              </TabsPanel>
            ))}
          </Tabs>
        </section>

        <ExpenseDialog open={dialogOpen} onOpenChange={setDialogOpen} editing={editing} />
      </div>
    </div>
  );
}

/** The Add/Edit Expense dialog — the reference's two-step genus: the
 * "Quick Select Category" chip grid → the manual form (prefilled by the
 * chosen chip), with the +$1..$500 quick-adds on the amount field.
 * Session-234 (R-31, F-234j): module-local — consumed only by this
 * page; the export keyword was vestigial (zero importers). */
function ExpenseDialog({
  open,
  onOpenChange,
  editing,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: Transaction | null;
}) {
  const store = useWealthOs();
  const [step, setStep] = React.useState<"quick" | "form">("quick");
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [budgetCategory, setBudgetCategory] = React.useState("needs");
  const [category, setCategory] = React.useState("Groceries");
  const [date, setDate] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [recurring, setRecurring] = React.useState(false);
  const [busy, setBusy] = React.useState(false);

  // Session-232 (R-29, F-232c): the step-swap focus — the F-231b genus
  // on the dialog surface. The value-comparison guard (StrictMode-safe,
  // no boolean mount flag) moves focus only on a real step CHANGE while
  // the dialog is open: quick→form lands on the description input (the
  // form's primary control — edit-mode opens included, the form IS the
  // view), form→quick on the Quick Select heading. The initial open in
  // create mode keeps Radix's natural content focus — no transition
  // fires; a close-time reset never fires (open is false).
  const descriptionRef = React.useRef<HTMLInputElement>(null);
  const quickHeadingRef = React.useRef<HTMLHeadingElement>(null);
  const prevStepRef = React.useRef(step);
  React.useEffect(() => {
    const changed = prevStepRef.current !== step;
    prevStepRef.current = step;
    if (!changed || !open) return;
    if (step === "form") {
      descriptionRef.current?.focus();
    } else {
      quickHeadingRef.current?.focus();
    }
  }, [step, open]);

  // Prefill on open — RENDER-TIME adjustment (the sanctioned
  // pattern; no setState inside an effect): when the dialog's
  // identity changes, adjust this component's own state during
  // render before the children commit.
  const [formKey, setFormKey] = React.useState<string | null>(null);
  const nextKey = open ? (editing ? `edit-${editing.id}` : "create") : null;
  if (formKey !== nextKey) {
    setFormKey(nextKey);
      if (nextKey && editing) {
        setStep("form");
        setDescription(editing.description);
        setAmount(String(editing.amount));
        setBudgetCategory(editing.budgetCategory);
        setCategory(editing.category);
        setDate(toDateInputValue(toDate(editing.date))); // F-218d: the stored UTC-midnight form, re-anchored
        setNotes(editing.notes ?? "");
        setRecurring(editing.recurring);
      } else {
        setStep("quick");
        setDescription("");
        setAmount("");
        setBudgetCategory("needs");
        setCategory("Groceries");
        setDate(toDateInputValue(new Date()));
        setNotes("");
        setRecurring(false);
      }
  }

  const pickQuick = (label: string, budget: string) => {
    setDescription(label);
    setCategory(label);
    setBudgetCategory(budget);
    setStep("form");
  };

  const bump = (n: number) => {
    setAmount((prev) => String(Number(prev || 0) + n));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const body: Record<string, unknown> = {
      description,
      amount: Number(amount),
      type: "expense",
      category,
      budgetCategory,
      date,
      // Session-221 (R-18, F-221d): the raw string, not the || undefined
      // collapse — the create schema normalizes "" to undefined and the
      // update schema to null (the F-219q clear contract), so one form
      // serves both modes AND an emptied Notes actually clears on edit.
      notes,
      recurring,
    };
    // Session-221 (R-18, F-221d): the null-clear rider — unchecking
    // recurring must CLEAR the stored nextDate on edit (the update
    // schema's null contract), not leave the stale date riding. The
    // create arm keeps the omit form (its dateField is not nullable).
    if (editing) body.nextDate = recurring ? date : null;
    else if (recurring) body.nextDate = date;
    const res = editing
      ? await store.updateTransaction(editing.id, body)
      : await store.createTransaction(body);
    setBusy(false);
    if (res.ok) {
      toast.success(editing ? "Expense updated" : "Expense added");
      onOpenChange(false);
    } else {
      toast.error("Save failed", res.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10"
            >
              $
            </span>
            {editing ? "Edit Expense" : "Add Expense"}
          </DialogTitle>
          <DialogDescription>
            {step === "quick" && !editing
              ? "Pick a category to prefill the form, or fill it manually."
              : "Enter the expense details."}
          </DialogDescription>
        </DialogHeader>

        {step === "quick" && !editing ? (
          <div>
            <h3
              ref={quickHeadingRef}
              tabIndex={-1}
              className="mb-3 text-sm font-semibold text-stone-900 outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-stone-100"
            >
              Quick Select Category
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {QUICK_EXPENSE_CATEGORIES.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => pickQuick(c.label, c.budgetCategory)}
                  className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-amber-300 hover:bg-amber-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-amber-500/40 dark:hover:bg-amber-500/5"
                >
                  <span aria-hidden="true">{c.emoji}</span>
                  {c.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep("form")}
              className="mt-4 w-full text-center text-sm font-medium text-stone-500 underline-offset-4 hover:text-amber-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm dark:text-stone-400"
            >
              Or fill manually
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="expense-description" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Description
              </label>
              <input
                ref={descriptionRef}
                id="expense-description"
                required
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Whole Foods run"
                className={FORM_INPUT}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="expense-amount" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Amount (USD)
              </label>
              <input
                id="expense-amount"
                required
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className={FORM_INPUT}
              />
              <div className="flex flex-wrap gap-1.5 pt-1" role="group" aria-label="Quick amount adders">
                {QUICK_ADDS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => bump(n)}
                    className="rounded-md border border-stone-200 bg-white px-2 py-1 text-xs font-semibold text-stone-600 transition-colors hover:border-amber-300 hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300"
                  >
                    +${n}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                {/* Session-221 (R-18, F-221j): the htmlFor/id association —
                    the F-218u pattern every sibling surface already uses
                    (clicking the label now focuses the combobox). */}
                <label htmlFor="expense-budget-category" className="text-sm font-medium text-stone-700 dark:text-stone-300">Budget Category</label>
                <Select value={budgetCategory} onValueChange={setBudgetCategory}>
                  <SelectTrigger id="expense-budget-category" aria-label="Budget category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="needs">Needs</SelectItem>
                    <SelectItem value="wants">Wants</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="expense-category" className="text-sm font-medium text-stone-700 dark:text-stone-300">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="expense-category" aria-label="Expense category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {EXPENSE_CATEGORIES.map((c) => (
                      <SelectItem key={c.label} value={c.label}>
                        {/* F-235g: the decorative glyph never rides the name. */}
                        <span aria-hidden="true">{c.emoji}</span> {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="expense-date" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Date
              </label>
              <input
                id="expense-date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-base"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="expense-notes" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Notes (optional)
              </label>
              <textarea
                id="expense-notes"
                maxLength={1000}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="min-h-16 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
              />
            </div>

            <label className="flex items-center gap-2.5 text-sm font-medium text-stone-700 dark:text-stone-300">
              <input
                type="checkbox"
                checked={recurring}
                onChange={(e) => setRecurring(e.target.checked)}
                className="h-4 w-4 rounded border-stone-300 accent-amber-600 focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-600" /* F-218u: accent- is the working native form — text- is a no-op on inputs */
              />
              This is a recurring expense
            </label>

            <DialogFooter className="sm:justify-between">
              {!editing ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep("quick")}
                  className="text-stone-500 dark:text-stone-400"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Quick Select
                </Button>
              ) : (
                <span />
              )}
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={busy} className={CTA.rose}>
                  <PlusCircle className="h-4 w-4" />
                  {editing ? "Save Changes" : "Add Expense"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
