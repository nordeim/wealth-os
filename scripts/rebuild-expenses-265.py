#!/usr/bin/env python3
# Session-265 (R-62): applies the Expenses-page rebuild (F-265b/F-265e)
# to the fresh tree — the four edits from the session record, each
# asserted (the docs-243 scoping doctrine).
import sys

PATH = "src/app/(app)/expenses/page.tsx"
src = open(PATH, encoding="utf-8").read()
orig = src

# ---- 1. the import arm ------------------------------------------------------
OLD = 'import { budgetCategorySplit, formatMoney, toDate } from "@/lib/finance";'
NEW = '''import {
  budgetCategorySplit,
  filterAndSortExpenses,
  formatMoney,
  toDate,
  type ExpenseListFilters,
} from "@/lib/finance";'''
assert src.count(OLD) == 1, "import anchor not unique"
src = src.replace(OLD, NEW, 1)

# ---- 2. the state arm (after filtersTriggerRef + categoryFilter) ------------
OLD = '''  const filtersTriggerRef = React.useRef<HTMLButtonElement | null>(null);
  const [categoryFilter, setCategoryFilter] = React.useState("all");

  const now = new Date();'''
NEW = '''  // The Filters trigger's own ref — the F-241e focus return target (the
  // card's cleanup lands focus back here when an interior-focused close
  // path unmounts the card). Session-218 (R-15, F-218b) first scoped it
  // to the trigger's pointerdown exclusion on the anchored popover; the
  // pointerdown guard retired with that genus (session 265, F-265b) and
  // the ref survives as the focus contract's anchor.
  const filtersTriggerRef = React.useRef<HTMLButtonElement | null>(null);
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  // Session-265 (R-62, F-265b): the expansion card's own controls —
  // every state the reference's filter panel carries (live-probed at
  // 1440×900): the date window with its Custom reveal, the amount
  // bounds, and the sort field/direction pair. Every control applies
  // LIVE (the superset over the reference's commit step — the e2e
  // mouse-pick contract, the F-217a leg, pins the instant form); the
  // footer's Cancel reverts to the open snapshot, Clear All resets.
  const [rangeFilter, setRangeFilter] = React.useState<ExpenseListFilters["range"]>("");
  const [customStart, setCustomStart] = React.useState("");
  const [customEnd, setCustomEnd] = React.useState("");
  const [minAmount, setMinAmount] = React.useState("");
  const [maxAmount, setMaxAmount] = React.useState("");
  const [sortField, setSortField] = React.useState<ExpenseListFilters["sortField"]>("date");
  const [sortDir, setSortDir] = React.useState<ExpenseListFilters["sortDir"]>("desc");
  // The Cancel arm's revert target: captured when the card OPENS (a
  // ref, not state — the snapshot never renders).
  const openSnapshotRef = React.useRef<ExpenseListFilters | null>(null);

  const now = new Date();'''
assert src.count(OLD) == 1, "state anchor not unique"
src = src.replace(OLD, NEW, 1)

# ---- 3. the badge count ------------------------------------------------------
OLD = '  const activeFilters = [categoryFilter !== "all", tab !== "all"].filter(Boolean).length;'
NEW = '''  // Session-265 (R-62, F-265e): the badge counts the panel's OWN
  // controls — the pre-cure form also counted the budget tab, a
  // control the popover never owned, so the Needs/Wants/Savings tabs
  // lit a badge whose panel still read all-defaults. The reference's
  // own badge is decorative (a never-changing two, live-probed: Clear
  // All, a Min value, and a Category pick all leave it standing) —
  // the honest live count is the documented superset.
  const activeFilters = [
    rangeFilter !== "",
    categoryFilter !== "all",
    minAmount !== "",
    maxAmount !== "",
    sortField !== "date" || sortDir !== "desc",
  ].filter(Boolean).length;'''
assert src.count(OLD) == 1, "badge anchor not unique"
src = src.replace(OLD, NEW, 1)

# ---- 4. the guard effect + the toggle/cancel/clear handlers + the memo ------
# The old effect block runs from the F-216i comment to the old visible memo.
START = "  // Session-216 (R-13, F-216i): the filters popover closes on Escape +"
END = "  }, [expenses, tab, categoryFilter, search]);"
i = src.index(START)
j = src.index(END, i) + len(END)
NEW_BLOCK = '''  // Session-265 (R-62, F-265b): the close family RE-SCOPED with the
  // genus — the surface is now the reference's IN-FLOW EXPANSION CARD
  // (live-probed: position static, a full-width sibling below the
  // search row), so the anchored-popover hazards retire with the
  // anchoring: no outside-pointerdown guard (an in-flow card owns no
  // overlay to dismiss on page clicks — the reference's own card
  // stays open through them), no scroller-close (nothing slides under
  // the sticky header). Escape closes (the F-216i keyboard contract
  // survives), the trigger toggles, and the F-241e focus return rides
  // the same cleanup (cleanups run AFTER the commit that removed the
  // card; focus that died to <body> lands back on the trigger).
  React.useEffect(() => {
    if (!filtersOpen) return;
    // Capture the trigger node at OPEN time — the cleanup reads it
    // after the card's unmount commit, and the ref-read form trips
    // the exhaustive-deps net (the ref value "will likely have changed
    // by the time this cleanup runs"). The node is stable (the
    // Filters button renders in every state), so the capture is exact.
    const trigger = filtersTriggerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (document.querySelector("[data-radix-popper-content-wrapper]")) return;
      setFiltersOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      // Session-241 (R-38, F-241e): the focus return on close — the
      // drawer's own pattern (mobile-nav's cleanup): cleanups run AFTER
      // the DOM commit that removed the card, so focus that died to
      // <body> with the unmount is detectable exactly here. The
      // trigger path (focus already on the trigger) is spared by
      // construction.
      if (document.activeElement === document.body) {
        trigger?.focus();
      }
    };
  }, [filtersOpen]);

  // The Cancel arm's revert target: the panel's own controls at the
  // moment of OPENING (the budget tab and the search box live OUTSIDE
  // the card and never revert). Captured in the trigger's click — the
  // one place the closed-to-open transition is observable — so the
  // effect stays state-free (no mid-edit re-captures: Cancel reverts
  // to the OPEN posture, not the last keystroke).
  const toggleFilters = () => {
    setFiltersOpen((open) => {
      if (open) return false;
      openSnapshotRef.current = {
        budgetTab: "all",
        category: categoryFilter,
        search: "",
        range: rangeFilter,
        customStart,
        customEnd,
        minAmount,
        maxAmount,
        sortField,
        sortDir,
      };
      return true;
    });
  };

  const cancelFilters = () => {
    const snap = openSnapshotRef.current;
    if (snap) {
      setCategoryFilter(snap.category);
      setRangeFilter(snap.range);
      setCustomStart(snap.customStart);
      setCustomEnd(snap.customEnd);
      setMinAmount(snap.minAmount);
      setMaxAmount(snap.maxAmount);
      setSortField(snap.sortField);
      setSortDir(snap.sortDir);
    }
    setFiltersOpen(false);
  };

  const clearAllFilters = () => {
    setRangeFilter("");
    setCustomStart("");
    setCustomEnd("");
    setCategoryFilter("all");
    setMinAmount("");
    setMaxAmount("");
    setSortField("date");
    setSortDir("desc");
  };

  // Session-265 (R-62, F-265b): the whole list pipeline rides the pure
  // finance seam (filterAndSortExpenses) — the tab, the category, the
  // search, the date window, the bounds, and the sort all compose in
  // one tested function (the F-231j memo contract holds: the deps are
  // the store's stable array and the filter state; the clock is
  // derived inside the memo so a render-time `now` never defeats it).
  const visible = React.useMemo(
    () =>
      filterAndSortExpenses(
        expenses,
        {
          budgetTab:
            tab === "needs" || tab === "wants" || tab === "savings" ? tab : "all",
          category: categoryFilter,
          search,
          range: rangeFilter,
          customStart,
          customEnd,
          minAmount,
          maxAmount,
          sortField,
          sortDir,
        },
        new Date(),
      ),
    [expenses, tab, categoryFilter, search, rangeFilter, customStart, customEnd, minAmount, maxAmount, sortField, sortDir],
  );'''
src = src[:i] + NEW_BLOCK + src[j:]

# ---- 5. the JSX: the search+filters row and the popover -> the card ----------
JSX_START = "        {/* Search + filters */}"
JSX_END = "        </div>\n\n        {/* History — the page's glass genus (F-209a) */}"
i2 = src.index(JSX_START)
j2 = src.index(JSX_END, i2)
NEW_JSX = '''        {/* Search + filters */}
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
          <Button
            variant="outline"
            ref={filtersTriggerRef}
            onClick={toggleFilters}
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
        </div>

        {/* Session-265 (R-62, F-265b): the reference's filter surface —
            an IN-FLOW EXPANSION CARD below the search row (live-probed
            at 1440×900: position static, the full-width card with the
            blue-tinted border pair, the three-column inner grid at lg,
            the border-t footer). Every control applies LIVE — the
            superset over the reference's commit step — and the footer
            carries the reference's three actions: Clear All resets the
            panel, Cancel reverts to the open snapshot, Apply Filters
            closes (everything is already applied). The e2e battery's
            mouse-pick contract (the F-217a leg) pins the live form. */}
        {filtersOpen ? (
          <div
            role="group"
            aria-label="Expense filters"
            id="expense-filters"
            className="rounded-xl border border-blue-200 bg-card p-4 text-card-foreground shadow dark:border-blue-800"
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-stone-500 dark:text-stone-400" htmlFor="expense-range-filter">
                  Date Range
                </label>
                <Select value={rangeFilter} onValueChange={(v) => setRangeFilter(v as ExpenseListFilters["range"])}>
                  <SelectTrigger id="expense-range-filter" aria-label="Filter by date range">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="this-month">This month</SelectItem>
                    <SelectItem value="last-month">Last month</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
                {rangeFilter === "custom" ? (
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="date"
                      aria-label="Start date"
                      value={customStart}
                      onChange={(e) => setCustomStart(e.target.value)}
                      className="input-base h-10 flex-1"
                    />
                    <input
                      type="date"
                      aria-label="End date"
                      value={customEnd}
                      onChange={(e) => setCustomEnd(e.target.value)}
                      className="input-base h-10 flex-1"
                    />
                  </div>
                ) : null}
              </div>
              <div>
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
              <div>
                <label className="mb-1 block text-xs font-medium text-stone-500 dark:text-stone-400" htmlFor="expense-min-amount">
                  Min Amount
                </label>
                <input
                  id="expense-min-amount"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  placeholder="0.00"
                  className={FORM_INPUT}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-stone-500 dark:text-stone-400" htmlFor="expense-max-amount">
                  Max Amount
                </label>
                <input
                  id="expense-max-amount"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  placeholder="No limit"
                  className={FORM_INPUT}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-stone-500 dark:text-stone-400" htmlFor="expense-sort-field">
                  Sort By
                </label>
                <div className="flex items-center gap-2">
                  <Select value={sortField} onValueChange={(v) => setSortField(v as ExpenseListFilters["sortField"])}>
                    <SelectTrigger id="expense-sort-field" aria-label="Sort expenses by" className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="amount">Amount</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="category">Category</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortDir} onValueChange={(v) => setSortDir(v as ExpenseListFilters["sortDir"])}>
                    <SelectTrigger aria-label="Sort direction" className="w-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {/* The visible face is the glyph pair (the
                          reference's own form); the honest accessible
                          name rides the screen-reader-only text. */}
                      <SelectItem value="desc">
                        <span aria-hidden="true">↓</span>
                        <span className="sr-only">Descending</span>
                      </SelectItem>
                      <SelectItem value="asc">
                        <span aria-hidden="true">↑</span>
                        <span className="sr-only">Ascending</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <Button variant="ghost" onClick={clearAllFilters}>
                Clear All
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={cancelFilters}>
                  Cancel
                </Button>
                <Button onClick={() => setFiltersOpen(false)}>Apply Filters</Button>
              </div>
            </div>
          </div>
        ) : null}
'''
src = src[:i2] + NEW_JSX + src[j2:]

if src == orig:
    print("NO EDITS APPLIED", file=sys.stderr)
    sys.exit(1)

open(PATH, "w", encoding="utf-8").write(src)
print("expenses page rebuilt: imports + state + badge + guards + memo + the expansion card")
