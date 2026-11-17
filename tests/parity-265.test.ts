import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  filterAndSortExpenses,
  type ExpenseListFilters,
} from "@/lib/finance";
import { getAiProvider, type AiContext } from "@/lib/ai";

// Session-265 (R-62): the pins for the expenses-filters, coach-count, and
// live-region round. Every cure leg was born RED over the pre-cure tree
// (the F-265 ledger rows in docs/remediation_plan_v2.md §2.23 carry the
// verified evidence — the reference's filter card live-probed at TRUE
// 1440×900 through agent-browser, its control inventory enumerated
// option-by-option and its geometry read from computed styles: an
// in-flow expansion card, position static, the blue-tinted border pair,
// the three-column inner grid at lg, the border-t footer).
//
// The round's genus: one functional-parity rebuild (the Expenses filter
// surface — the reference's six-control expansion card over our
// single-control anchored popover, both forms closed in settled captures
// so every gate was blind to the delta), one rendered-prose cure (the
// coach's lever header derives from the bullet count), one
// live-region scoping cure (the assistant announcements leave the
// visual message list), and one toolchain pin (the comparison script's
// truthy AUTH_SECRET fallback — the empty-string .env value defeats the
// nullish form and the production boot gate refuses to serve).
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

// ---- F-265b: the filter surface is the reference's expansion card ------

describe("F-265b — the Expenses filter surface is the in-flow expansion card", () => {
  it("the panel carries the reference's card genus, not the anchored popover", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    // The reference's own computed card classes (live-probed at
    // 1440×900): rounded-xl, bg-card, the blue-tinted border pair.
    expect(src).toContain(
      "rounded-xl border border-blue-200 bg-card p-4 text-card-foreground shadow dark:border-blue-800",
    );
    // The anchored-popover form is retired with the genus.
    expect(src).not.toContain("absolute right-0 top-12 z-20 w-64");
  });

  it("the inner grid and the footer mirror the reference's construction", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toContain("grid gap-4 md:grid-cols-2 lg:grid-cols-3");
    expect(src).toContain("mt-4 flex items-center justify-between border-t pt-4");
  });

  it("the six controls are present with their labels", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    // Wrap-independent forms (the F-239f lesson): the labels ride
    // htmlFor pairs, and the label text sits on its own JSX line.
    for (const [label, target] of [
      ["Date Range", "expense-range-filter"],
      ["Category", "expense-category-filter"],
      ["Min Amount", "expense-min-amount"],
      ["Max Amount", "expense-max-amount"],
      ["Sort By", "expense-sort-field"],
    ] as const) {
      expect(src).toContain(`htmlFor="${target}"`);
      expect(norm(src)).toContain(`${label}`);
    }
    // The direction select is labeled for assistive tech (the visible
    // face is the glyph pair, per the reference).
    expect(src).toMatch(/aria-label="Sort direction"/);
  });

  it("the range select carries the reference's six options and the custom reveal", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    for (const option of ["Today", "Last 7 days", "Last 30 days", "This month", "Last month", "Custom range"]) {
      expect(src).toContain(option);
    }
    // The Custom arm reveals the Start/End date pair (the analytics
    // date-input pattern).
    expect(src).toMatch(/aria-label="Start date"/);
    expect(src).toMatch(/aria-label="End date"/);
    expect(src).toContain('placeholder="Select range"');
  });

  it("the sort select carries the reference's four fields and the direction pair", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    // The four field options ride the same Select as literal labels.
    expect(src).toMatch(/<SelectItem value="date">Date<\/SelectItem>/);
    expect(src).toMatch(/<SelectItem value="amount">Amount<\/SelectItem>/);
    expect(src).toMatch(/<SelectItem value="name">Name<\/SelectItem>/);
    expect(src).toMatch(/<SelectItem value="category">Category<\/SelectItem>/);
    // The direction options carry the glyph with an honest accessible
    // name (the superset over the reference's bare glyph).
    expect(src).toMatch(/aria-hidden="true">↓</);
    expect(src).toMatch(/aria-hidden="true">↑</);
  });

  it("the footer carries Clear All, Cancel, and Apply Filters", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    // The three actions are wired to their handlers (wrap-independent:
    // the visible labels sit on their own JSX lines).
    expect(src).toMatch(/onClick=\{clearAllFilters\}/);
    expect(src).toMatch(/onClick=\{cancelFilters\}/);
    expect(norm(src)).toContain("Clear All");
    expect(norm(src)).toContain("Apply Filters");
  });
});

// ---- F-265b: the close-guard family re-scoped with the genus ------------

describe("F-265b — the close family re-scoped for the in-flow card", () => {
  it("Escape closes with the focus return (the F-241e contract survives)", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toMatch(/if \(e\.key !== "Escape"\) return;/);
    expect(src).toContain("document.activeElement === document.body");
    expect(src).toContain("trigger?.focus()");
  });

  it("the outside-pointerdown guard and its portal exclusions retire with the anchoring", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).not.toMatch(/addEventListener\("pointerdown"/);
    expect(src).not.toMatch(
      /\[role="option"\], \[role="listbox"\], \[data-radix-popper-content-wrapper\]/,
    );
  });

  it("the scroll-close retires with the anchoring (an in-flow card owns no overlay hazard)", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).not.toMatch(/addEventListener\("scroll"/);
  });

  it("the trigger stays id-linked and expanded-state wired (the F-228k pair)", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toContain('aria-controls="expense-filters"');
    expect(src).toContain('id="expense-filters"');
  });
});

// ---- F-265b: the list rides the pure seam (live apply) -------------------

describe("F-265b — the visible list rides filterAndSortExpenses (live apply)", () => {
  it("the memo routes through the finance seam", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toMatch(/filterAndSortExpenses\(\s*expenses,/);
    expect(src).toMatch(/range: rangeFilter,/);
    expect(src).toMatch(/sortField,/);
  });

  it("the seam is exported from finance.ts", () => {
    const src = read("src/lib/finance.ts");
    expect(src).toMatch(/export function filterAndSortExpenses/);
    expect(src).toMatch(/export interface ExpenseListFilters/);
  });
});

// ---- F-265e: the badge counts the panel's own controls -------------------

describe("F-265e — the Filters badge re-scopes to the panel's controls", () => {
  it("the count enumerates the panel controls and drops the tab term", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toMatch(/const activeFilters = \[\s*rangeFilter !== "",/);
    expect(src).not.toMatch(/tab !== "all"/);
  });
});

// ---- F-265c: the coach's lever header derives from the bullet count ------

const REF = new Date(2026, 10, 8); // Nov 8, 2026

function oneCategoryCtx(): AiContext {
  return {
    transactions: [
      { description: "Salary", amount: 7800, type: "income", category: "Salary", date: new Date(2026, 10, 1) },
      {
        description: "Rent",
        amount: 2150,
        type: "expense",
        category: "Rent/Mortgage",
        budgetCategory: "needs",
        date: new Date(2026, 10, 1),
      },
    ],
    incomeSources: [{ name: "Salary", amount: 7800, frequency: "monthly", active: true }],
    investments: [],
    goals: [],
    budgets: [],
    now: REF,
  };
}

describe("F-265c — the lever header derives from the bullet count", () => {
  it("a one-nonzero-category month answers TWO levers, not three", () => {
    const { answer } = getAiProvider().coach("How can I save more money?", oneCategoryCtx());
    expect(answer).toMatch(/^Two levers:$/m);
    const bullets = answer.split("\n").filter((line) => line.startsWith("•"));
    expect(bullets).toHaveLength(2);
  });

  it("the multi-category answer stays byte-identical (the rider)", () => {
    // The default two-category month keeps the historic "Three levers:"
    // header — the cure derives the count, it never rewords the text.
    const { answer } = getAiProvider().coach(
      "How can I save more money?",
      (() => {
        const base = oneCategoryCtx();
        return {
          ...base,
          transactions: [
            ...base.transactions,
            {
              description: "Whole Foods",
              amount: 142.67,
              type: "expense",
              category: "Groceries",
              budgetCategory: "needs",
              date: new Date(2026, 10, 4),
            },
          ],
        };
      })(),
    );
    expect(answer).toMatch(/^Three levers:$/m);
    expect(answer).toMatch(/Trim .+ by 15%/);
  });
});

// ---- F-265d: the live region scopes to the assistant column --------------

describe("F-265d — the coach's live region carries the assistant announcements only", () => {
  it("the message list is no longer the live region", () => {
    const src = read("src/components/shared/ai-coach.tsx");
    const listMatch = src.match(/listRef}[^>]*className="[^"]*scrollbar-thin"/);
    expect(listMatch).toBeTruthy();
    expect(listMatch![0]).not.toContain("aria-live");
  });

  it("a dedicated always-present polite region announces the assistant column", () => {
    const src = read("src/components/shared/ai-coach.tsx");
    expect(src).toMatch(/<div aria-live="polite" className="sr-only">/);
    // The busy announcement rides the same region (the thinking text
    // joins the answer it precedes — two announcements per turn, the
    // user's own bubble never enters).
    expect(src).toMatch(/Coach is thinking/);
  });
});

// ---- F-265a: the comparison toolchain's truthy fallback -------------------

describe("F-265a — the comparison script's AUTH_SECRET fallback is truthy", () => {
  it("the boot env uses the truthy form (an empty-string .env value must fall back)", () => {
    const src = read("scripts/comparison-265.ts");
    expect(src).toMatch(/process\.env\.AUTH_SECRET \|\|/);
    expect(src).not.toMatch(/AUTH_SECRET \?\?/);
  });
});

// ---- F-265b: the pure seam's behavior (the date-window doctrine) ----------

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
  {
    id: "t4",
    description: "Coffee beans",
    category: "Coffee",
    budgetCategory: "wants",
    amount: 18.75,
    type: "expense",
    date: "2026-11-07T00:00:00.000Z",
    createdAt: "2026-11-07T08:00:00.000Z",
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

describe("filterAndSortExpenses — the F-265b pure seam", () => {
  it("the default state reproduces the API order (date desc, createdAt desc tiebreak)", () => {
    const out = filterAndSortExpenses(ROWS, ALL, NOV8);
    expect(out.map((r) => r.id)).toEqual(["t1", "t4", "t2", "t3"]);
  });

  it("the Today window keeps only the reference day (the UTC-midnight re-anchor)", () => {
    const out = filterAndSortExpenses(ROWS, { ...ALL, range: "today" }, NOV8);
    expect(out.map((r) => r.id)).toEqual(["t1"]);
  });

  it("the Last-7-days window spans the reference day and the six before it", () => {
    const out = filterAndSortExpenses(ROWS, { ...ALL, range: "7d" }, NOV8);
    // Nov 2..8 inclusive: t1 (Nov 8), t4 (Nov 7), t2 (Nov 1 misses).
    expect(out.map((r) => r.id)).toEqual(["t1", "t4"]);
  });

  it("the This-month window buckets by the local calendar month", () => {
    const out = filterAndSortExpenses(ROWS, { ...ALL, range: "this-month" }, NOV8);
    expect(out.map((r) => r.id)).toEqual(["t1", "t4", "t2"]);
  });

  it("the Last-month window buckets the previous calendar month", () => {
    const out = filterAndSortExpenses(ROWS, { ...ALL, range: "last-month" }, NOV8);
    expect(out.map((r) => r.id)).toEqual(["t3"]);
  });

  it("the Custom window is inclusive on both ends (bare yyyy-mm-dd inputs)", () => {
    const out = filterAndSortExpenses(
      ROWS,
      { ...ALL, range: "custom", customStart: "2026-10-28", customEnd: "2026-11-01" },
      NOV8,
    );
    expect(out.map((r) => r.id)).toEqual(["t2", "t3"]);
  });

  it("the min/max bounds are inclusive numeric filters", () => {
    const min = filterAndSortExpenses(ROWS, { ...ALL, minAmount: "76.5" }, NOV8);
    expect(min.map((r) => r.id)).toEqual(["t1", "t2", "t3"]);
    const max = filterAndSortExpenses(ROWS, { ...ALL, maxAmount: "84.12" }, NOV8);
    expect(max.map((r) => r.id)).toEqual(["t1", "t4", "t3"]);
  });

  it("each sort field honors the direction pair", () => {
    const byAmountDesc = filterAndSortExpenses(ROWS, { ...ALL, sortField: "amount" }, NOV8);
    expect(byAmountDesc.map((r) => r.id)).toEqual(["t2", "t1", "t3", "t4"]);
    const byAmountAsc = filterAndSortExpenses(
      ROWS,
      { ...ALL, sortField: "amount", sortDir: "asc" },
      NOV8,
    );
    expect(byAmountAsc.map((r) => r.id)).toEqual(["t4", "t3", "t1", "t2"]);
    const byNameAsc = filterAndSortExpenses(
      ROWS,
      { ...ALL, sortField: "name", sortDir: "asc" },
      NOV8,
    );
    expect(byNameAsc.map((r) => r.description)).toEqual([
      "Apartment Rent",
      "Coffee beans",
      "Dinner at Lucia",
      "Whole Foods Run",
    ]);
    const byCategoryAsc = filterAndSortExpenses(
      ROWS,
      { ...ALL, sortField: "category", sortDir: "asc" },
      NOV8,
    );
    expect(byCategoryAsc.map((r) => r.category)).toEqual([
      "Coffee",
      "Dining Out",
      "Groceries",
      "Rent/Mortgage",
    ]);
  });

  it("the budget tab, category, and search terms compose with the panel controls", () => {
    const out = filterAndSortExpenses(
      ROWS,
      { ...ALL, budgetTab: "wants", category: "all", search: "coffee" },
      NOV8,
    );
    expect(out.map((r) => r.id)).toEqual(["t4"]);
  });
});
