import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  filterAndSortExpenses,
  type ExpenseListFilters,
} from "@/lib/finance";

// Session-266 (R-63): the pins for the range-return, empty-truth, and
// escape-stack round. Every cure leg was born RED over the pre-cure
// tree (the F-266 ledger rows in docs/remediation_plan_v2.md §2.24
// carry the verified evidence — both Medium findings live on the
// R-62 flagship itself: the range select's six window options carried
// no path back to the un-filtered state, and a filtered-to-empty
// list rendered the onboarding face for a full ledger).
//
// The round's genus: one selectable no-window arm (the All-dates
// first option — the seam's own "" value, named at last), one
// empty-state truth split (the no-matches face keyed on the honest
// discriminator), one Escape-stack guard (a dialog over the open card
// owns the key), one input-genus unification, one dead-import
// retirement, one comment truing, one pure-updater cleanup, one seam
// form guard (the partial-ISO day invention refused), and the README
// status row's structural pin (the docs-counts battery's new leg —
// the F-249b pattern on the last unpinned status site).
//
// Prose pins hard-wrap and ride comment-line prefixes: containment runs
// over the comment-stripped, whitespace-normalized form (the F-239f
// lesson). Source pins anchor on construction-site forms (the F-239e
// lesson) and admit comment lines between their anchors (the F-248e
// lesson).

function read(rel: string): string {
  return readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf8");
}

const norm = (s: string): string =>
  s
    .replace(/^[ \t]*(?:\/\/|\*|\{\/\*)[ \t]?/gm, "")
    .replace(/\s+/g, " ");

// ---- F-266b: the All-dates first option -----------------------------------

describe("F-266b — the range select's All-dates arm (the range return)", () => {
  it("the select carries a first All-dates option on the all sentinel", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    // THE RADIX SENTINEL: a SelectItem may not carry the empty string
    // (Radix's own placeholder predicate reads an empty value as
    // "nothing selected" — the trigger renders blank; live-caught by
    // the captures face), so the option rides the "all" sentinel —
    // the category select's own idiom.
    expect(src).toMatch(/<SelectItem value="all">All dates<\/SelectItem>/);
    // FIRST position: the no-window arm precedes the Today arm.
    const allDates = src.indexOf('<SelectItem value="all">All dates</SelectItem>');
    const today = src.indexOf('<SelectItem value="today">Today</SelectItem>');
    expect(allDates).toBeGreaterThan(-1);
    expect(today).toBeGreaterThan(-1);
    expect(allDates).toBeLessThan(today);
  });

  it("the sentinel maps onto the seam's empty-string no-window contract at both boundaries", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    // The controlled value maps the seam's "" out to the sentinel…
    expect(src).toMatch(/value=\{rangeFilter === "" \? "all" : rangeFilter\}/);
    // …and the pick maps the sentinel back in.
    expect(src).toMatch(/onValueChange=\{\(v\) => setRangeFilter\(v === "all" \? "" :/);
  });

  it("the placeholder retires with the named no-window state", () => {
    // The named option IS the no-window state's face; a dead
    // placeholder attribute is not an honest construction.
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).not.toContain('placeholder="Select range"');
  });

  it("the seam's no-window value stays the documented empty string", () => {
    const src = read("src/lib/finance.ts");
    expect(src).toMatch(/\/\*\* The panel's date-window select \("" = no window\)\. \*\//);
    expect(src).toMatch(/range: "" \| "today" \| "7d" \| "30d" \| "this-month" \| "last-month" \| "custom";/);
  });
});

// ---- F-266c: the no-matches empty variant ----------------------------------

describe("F-266c — the filtered-to-empty truth (the empty-state split)", () => {
  it("the empty arm splits on the honest discriminator", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    // The no-matches face renders when the panel filters are active
    // OR the search box is non-empty — the two constraint dimensions
    // the page owns.
    expect(src).toMatch(/activeFilters > 0 \|\| search\.trim\(\) !== ""/);
    expect(src).toContain("No expenses match your filters");
    // The onboarding face keeps the genuinely-empty ledger.
    expect(src).toContain("No expenses yet");
    expect(src).toContain("Add Your First Expense");
  });

  it("the Clear Filters action clears the panel controls AND the search box", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toMatch(/const clearFiltersAndSearch = \(\) => \{/);
    // The handler body: the panel reset, then the search reset.
    expect(src).toMatch(/clearAllFilters\(\);\s*\n\s*setSearch\(""\);/);
    expect(src).toMatch(/onClick=\{clearFiltersAndSearch\}/);
  });
});

// ---- F-266d: the Escape stack guard ----------------------------------------

describe("F-266d — one Escape per surface (the stacked-dialog guard)", () => {
  it("the guard defers to any open dialog layer", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    // The popper check survives (an open Select listbox owns the
    // key); the dialog check joins it — Radix's dismissable layer
    // closes the dialog on the keydown WITHOUT stopping propagation,
    // so an unguarded window listener would close the card beneath
    // as well.
    expect(src).toMatch(/document\.querySelector\("\[data-radix-popper-content-wrapper\]"\)/);
    expect(src).toMatch(/document\.querySelector\('\[role="dialog"\]'\)/);
    // The check precedes the close.
    const guard = src.indexOf("querySelector('[role=\"dialog\"]')");
    const close = src.indexOf("setFiltersOpen(false)", guard);
    expect(guard).toBeGreaterThan(-1);
    expect(close).toBeGreaterThan(guard);
  });
});

// ---- F-266e: one input genus per panel --------------------------------------

describe("F-266e — the card's single input genus", () => {
  it("the Custom date inputs join the house form genus (the width appendage)", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).not.toContain("input-base h-10 flex-1");
    // The settings page's own appendage convention: w-auto freeing
    // the full-width form for the flex row.
    expect(src).toMatch(/cn\(FORM_INPUT, "w-auto flex-1"\)/);
  });
});

// ---- F-266f: the dead import ------------------------------------------------

describe("F-266f — the dead Minus import retires", () => {
  it("the page imports only what it uses", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).not.toMatch(/^  Minus,$/m);
    // The live icon imports stay (the Receipt tile, the Search box).
    expect(src).toMatch(/^  Receipt,$/m);
    expect(src).toMatch(/^  Search,$/m);
  });
});

// ---- F-266g: the coach region's comment truth --------------------------------

describe("F-266g — the announcement region's comment carries the construction's truth", () => {
  it("the false empty-when-idle claim is gone; the carry semantics are stated", () => {
    const src = read("src/components/shared/ai-coach.tsx");
    expect(norm(src)).not.toContain("empty when idle");
    // The trued form: the region must pre-exist its first announcement
    // (the F-218h doctrine) and carries the latest reply once one
    // exists — a region arriving with content is not announced (the
    // F-235a doctrine).
    expect(norm(src)).toContain("pre-exist its first announcement");
    expect(norm(src)).toContain("carries the latest reply");
  });
});

// ---- F-266h: the pure updater -------------------------------------------------

describe("F-266h — the snapshot capture leaves the state updater", () => {
  it("toggleFilters captures in the handler body; the setter call is pure", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    const m = src.match(/const toggleFilters = \(\) => \{[\s\S]*?\n  \};/);
    expect(m).toBeTruthy();
    // The capture is guarded on the closed state, OUTSIDE any updater
    // callback (React may double-invoke updaters under StrictMode).
    expect(m![0]).toMatch(/if \(!filtersOpen\) \{\s*\n\s*openSnapshotRef\.current = \{/);
    expect(m![0]).toMatch(/setFiltersOpen\(!filtersOpen\);/);
    // The updater-carried write is gone.
    expect(src).not.toMatch(/setFiltersOpen\(\(open\) => \{/);
  });
});

// ---- F-266i: the seam's custom-bound form guard -------------------------------

interface Row {
  id: string;
  description: string;
  category: string;
  budgetCategory: "needs" | "wants" | "savings";
  amount: number;
  type: "expense";
  date: string; // the stored UTC-midnight ISO form
  notes?: string | null;
  createdAt: string;
}

const ROWS: Row[] = [
  {
    id: "t1",
    description: "Whole Foods Run",
    category: "Groceries",
    budgetCategory: "needs",
    amount: 84.12,
    type: "expense",
    date: "2026-11-08T00:00:00.000Z",
    createdAt: "2026-11-08T12:00:00.000Z",
  },
  {
    id: "t2",
    description: "Apartment Rent",
    category: "Rent/Mortgage",
    budgetCategory: "needs",
    amount: 2150,
    type: "expense",
    date: "2026-11-01T00:00:00.000Z",
    createdAt: "2026-11-01T09:00:00.000Z",
  },
  {
    id: "t3",
    description: "Dinner at Lucia",
    category: "Dining Out",
    budgetCategory: "wants",
    amount: 76.5,
    type: "expense",
    date: "2026-10-28T00:00:00.000Z",
    createdAt: "2026-10-28T20:00:00.000Z",
  },
];

const NOV8 = new Date(2026, 10, 8, 15, 0, 0); // Nov 8, 2026, local afternoon

const ALL: ExpenseListFilters = {
  budgetTab: "all",
  category: "all",
  search: "",
  range: "",
  customStart: "",
  customEnd: "",
  minAmount: "",
  maxAmount: "",
  sortField: "date",
  sortDir: "desc",
};

describe("filterAndSortExpenses — the F-266i custom-bound form guard", () => {
  it("a garbage start bound is dropped (treated as open)", () => {
    const out = filterAndSortExpenses(
      ROWS,
      { ...ALL, range: "custom", customStart: "garbage" },
      NOV8,
    );
    expect(out).toHaveLength(ROWS.length);
  });

  it("a garbage end bound is dropped too", () => {
    const out = filterAndSortExpenses(
      ROWS,
      { ...ALL, range: "custom", customEnd: "not-a-date" },
      NOV8,
    );
    expect(out).toHaveLength(ROWS.length);
  });

  it("a partial yyyy-mm start bound is dropped, not staged as the first of the month", () => {
    // Staged-as-Nov-1 would exclude the Oct 28 row; dropped keeps it.
    // (V8 parses "2026-11" as November 1st — an invented day; the
    // F-222a doctrine: a skip beats an invented day.)
    const out = filterAndSortExpenses(
      ROWS,
      { ...ALL, range: "custom", customStart: "2026-11" },
      NOV8,
    );
    expect(out.map((r) => r.id)).toContain("t3");
    expect(out).toHaveLength(ROWS.length);
  });

  it("a partial yyyy-mm end bound is dropped, not staged as the first of the month", () => {
    // Staged-as-Oct-1 would admit only rows before Oct 1 (none);
    // dropped leaves the end open — every row passes.
    const out = filterAndSortExpenses(
      ROWS,
      { ...ALL, range: "custom", customEnd: "2026-10" },
      NOV8,
    );
    expect(out).toHaveLength(ROWS.length);
  });

  it("the bare yyyy-mm-dd form still windows (the F-265b contract unchanged)", () => {
    const out = filterAndSortExpenses(
      ROWS,
      { ...ALL, range: "custom", customStart: "2026-11-01" },
      NOV8,
    );
    expect(out.map((r) => r.id)).not.toContain("t3");
    const both = filterAndSortExpenses(
      ROWS,
      { ...ALL, range: "custom", customStart: "2026-10-28", customEnd: "2026-11-01" },
      NOV8,
    );
    expect(both.map((r) => r.id)).toEqual(["t2", "t3"]);
  });
});
