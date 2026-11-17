import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  filterAndSortExpenses,
  type ExpenseListFilters,
} from "@/lib/finance";

// Session-267 (R-64): the pins for the savings-tab, sort-count, and
// calendar-roundtrip round. Every cure leg was born RED over the
// pre-cure tree (the F-267 ledger rows in docs/remediation_plan_v2.md
// §2.25 carry the verified evidence — the round's Medium lives inside
// F-266c's own charter: the no-matches discriminator missed the budget
// tab, the one live constraint that can empty a list without being
// counted, and the corpus's own empty savings bucket made the Savings
// tab render the onboarding face for a 72-expense ledger TODAY).
//
// The round's genus: one dedicated over-constraint predicate (the
// list-narrowing constraints the page owns — the budget TAB joining
// the panel controls and the search box, the sort pair leaving), one
// Clear Filters action that lifts EVERY constraint including the tab,
// one calendar round-trip on the seam's custom bounds (the csv.ts
// stageWrittenLiteral doctrine: a bound must LAND on the calendar its
// digits wrote or be dropped as open), one input-genus completion
// (the four dialogs' Date inputs joining the house form genus), one
// memo wrap (the F-231j contract), one doc clause, one invariant
// comment.
//
// Prose pins hard-wrap and ride comment-line prefixes: containment runs
// over the comment-stripped, whitespace-normalized form (the F-239f
// lesson). Source pins anchor on construction-site forms (the F-239e
// lesson), admit comment lines between their anchors (the F-248e
// lesson), and size their windows past the comments the same commit
// writes (the F-247e lesson).

function read(rel: string): string {
  return readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf8");
}

const norm = (s: string): string =>
  s
    .replace(/^[ \t]*(?:\/\/|\*|\{\/\*)[ \t]?/gm, "")
    .replace(/\s+/g, " ");

// ---- F-267a: the tab joins the over-constraint predicate -------------------

describe("F-267a — the budget tab counts as a list constraint", () => {
  it("the over-constraint predicate is its own declaration carrying the tab term", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    // The predicate block: the list-narrowing constraints the page
    // owns, sliced from its own construction site (the F-239e lesson).
    const m = src.match(/const listConstrained = \[[\s\S]*?\]\.some\(Boolean\);/);
    expect(m).toBeTruthy();
    // The tab — the constraint dimension the badge never counted —
    // joins the predicate.
    expect(m![0]).toMatch(/tab !== "all"/);
    // The panel controls and the search box stay.
    expect(m![0]).toMatch(/rangeFilter !== ""/);
    expect(m![0]).toMatch(/categoryFilter !== "all"/);
    expect(m![0]).toMatch(/minAmount !== ""/);
    expect(m![0]).toMatch(/maxAmount !== ""/);
    expect(m![0]).toMatch(/search\.trim\(\) !== ""/);
  });

  it("the empty arm keys on the predicate, not the badge count", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    // The discriminator: the predicate alone (the F-266b-era reuse of
    // the badge count — sort included — retires with this).
    expect(src).toMatch(/visible\.length === 0 \? \(\s*listConstrained \? \(/);
  });

  it("the Clear Filters action lifts EVERY constraint including the tab", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    const m = src.match(/const clearFiltersAndSearch = \(\) => \{[\s\S]*?\n  \};/);
    expect(m).toBeTruthy();
    // The F-266c promise — "lifts EVERY constraint the page owns" —
    // now includes the tab (the savings-tab round's compound: the
    // still-constrained list flipped faces after its own Clear).
    expect(m![0]).toMatch(/setTab\("all"\)/);
    expect(m![0]).toMatch(/clearAllFilters\(\);/);
    expect(m![0]).toMatch(/setSearch\(""\);/);
  });
});

// ---- F-267b: the sort pair leaves the over-constraint predicate -------------

describe("F-267b — sort can reorder, never empty (the predicate excludes it)", () => {
  it("the predicate carries no sort term — the badge keeps its own honest count", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    const m = src.match(/const listConstrained = \[[\s\S]*?\]\.some\(Boolean\);/);
    expect(m).toBeTruthy();
    expect(m![0]).not.toContain("sortField");
    expect(m![0]).not.toContain("sortDir");
    // The badge (the F-265e posture) keeps counting the panel's five
    // controls — sort included: the rider proving the cure did not
    // touch the badge's own contract.
    const badge = src.match(/const activeFilters = \[[\s\S]*?\]\.filter\(Boolean\)\.length;/);
    expect(badge).toBeTruthy();
    expect(badge![0]).toMatch(/sortField !== "date" \|\| sortDir !== "desc"/);
  });
});

// ---- F-267c: the custom-bound calendar round-trip ----------------------------

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

describe("filterAndSortExpenses — the F-267c calendar round-trip", () => {
  it("a Feb-31 end bound is DROPPED, not invented as Mar 3 (the F-222a doctrine)", () => {
    // Pre-cure: the shape regex passes, toDate's normalizing
    // constructor invents Mar 3 as the end, and every Oct/Nov row
    // lands past it — a zero-row list off an overflow bound. The
    // round-trip drops the bound: the end stays open, every row passes
    // (a skip beats an invented day).
    const out = filterAndSortExpenses(
      ROWS,
      { ...ALL, range: "custom", customEnd: "2026-02-31" },
      NOV8,
    );
    expect(out).toHaveLength(ROWS.length);
  });

  it("a month-13 start bound is DROPPED, not invented as Jan 1 of the next year", () => {
    // Pre-cure: "2026-13-01" invents Jan 1, 2027 as the start and
    // every 2026 row lands before it — zero rows again. Dropped: the
    // start stays open.
    const out = filterAndSortExpenses(
      ROWS,
      { ...ALL, range: "custom", customStart: "2026-13-01" },
      NOV8,
    );
    expect(out).toHaveLength(ROWS.length);
  });

  it("a Feb-29 NON-LEAP start bound is dropped too (the leap-year twin)", () => {
    // 2026 is not a leap year: Feb 29 invents Mar 1. Dropped: open.
    const out = filterAndSortExpenses(
      ROWS,
      { ...ALL, range: "custom", customStart: "2026-02-29" },
      NOV8,
    );
    expect(out).toHaveLength(ROWS.length);
  });

  it("a valid LEAP-day bound still windows (the round-trip admits honest calendars)", () => {
    // 2024 was a leap year: Feb 29 is a real day, and the round-trip
    // must admit it as a genuine start bound (rows after it pass).
    const out = filterAndSortExpenses(
      ROWS,
      { ...ALL, range: "custom", customStart: "2024-02-29" },
      NOV8,
    );
    expect(out).toHaveLength(ROWS.length);
    // …and as a genuine end bound it excludes every later row.
    const endOut = filterAndSortExpenses(
      ROWS,
      { ...ALL, range: "custom", customEnd: "2024-02-29" },
      NOV8,
    );
    expect(endOut).toHaveLength(0);
  });

  it("the stored UTC-midnight twin still re-anchors as a real bound (the battery-gap closure)", () => {
    // Green-by-design rider (the F-267 battery gap the audit named):
    // the F-266i guard admits the two UTC-midnight twins and toDate
    // re-anchors them identically — a future regex tightening to
    // bare-only must fail HERE, not silently in the seam.
    const out = filterAndSortExpenses(
      ROWS,
      { ...ALL, range: "custom", customStart: "2026-11-01T00:00:00.000Z" },
      NOV8,
    );
    expect(out.map((r) => r.id)).not.toContain("t3");
    expect(out).toHaveLength(2);
  });

  it("the bare yyyy-mm-dd form still windows (the F-265b contract unchanged)", () => {
    const out = filterAndSortExpenses(
      ROWS,
      { ...ALL, range: "custom", customStart: "2026-11-01" },
      NOV8,
    );
    expect(out.map((r) => r.id)).not.toContain("t3");
  });
});

// ---- F-267d: the four dialogs' Date inputs join the house genus --------------

describe("F-267d — one input genus per dialog (the Date inputs join FORM_INPUT)", () => {
  const files = [
    "src/app/(app)/expenses/page.tsx",
    "src/app/(app)/income/page.tsx",
    "src/app/(app)/goals/page.tsx",
    "src/app/(app)/investments/page.tsx",
  ] as const;

  it.each(files)("the dialog Date input rides the house form genus (%s)", (rel) => {
    const src = read(rel);
    // The other genus is gone from the file entirely (each file's only
    // input-base consumer was its dialog Date input).
    expect(src).not.toContain('className="input-base"');
    // The positive form: the date input carries the house genus — the
    // window sized past the attributes and any comment the same commit
    // writes (the F-247e lesson).
    expect(src).toMatch(/type="date"[\s\S]{0,400}?className=\{FORM_INPUT\}/);
  });

  it("the analytics search-box genus stays (a different surface's convention)", () => {
    const src = read("src/app/(app)/analytics/page.tsx");
    // Green-by-design rider: the analytics date refs are the
    // documented input-base consumers post-cure (the R-63 adjudication
    // left them deliberately — the search-box genus).
    expect(src).toMatch(/input-base h-10 w-36/);
    const count = src.match(/input-base/g) ?? [];
    expect(count.length).toBe(2);
  });
});

// ---- F-267e: the split derivation gains the F-231j memo ----------------------

describe("F-267e — budgetCategorySplit rides the memo contract", () => {
  it("the fold is memoized on the store's stable transactions array", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    // The F-231j form its two siblings already honor; the clock is
    // derived inside the memo (the visible memo's own convention — a
    // render-time clock never defeats the memo).
    expect(src).toMatch(
      /const split = React\.useMemo\(\s*\(\) => budgetCategorySplit\(store\.transactions, new Date\(\)\),\s*\[store\.transactions\],\s*\);/,
    );
    // The bare call is gone.
    expect(src).not.toMatch(/const split = budgetCategorySplit\(/);
  });
});

// ---- F-267f: the interface docblocks carry the enforced contract --------------

describe("F-267f — the bound-field docs admit the stored twin", () => {
  it("the customStart/customEnd docblocks state the twin clause", () => {
    const src = read("src/lib/finance.ts");
    expect(norm(src)).toContain("or its stored UTC-midnight twin");
  });
});

// ---- F-267g: the Escape guard's invariant comment ----------------------------

describe("F-267g — the DOM-presence test states the invariant it rests on", () => {
  it("the guard's comment names the unmount-on-close invariant", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    // The F-266d guard is exact only WHILE both dialog genera unmount
    // on close — the comment now says so (a future force-mounted genus
    // would leave a stale dialog in the DOM and silently break the
    // card's Escape).
    expect(norm(src)).toContain("both dialog genera unmount on close");
  });
});
