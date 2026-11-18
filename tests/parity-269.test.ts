import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { toDate, filterAndSortExpenses } from "@/lib/finance";
import type { ExpenseListFilters } from "@/lib/finance";
import { toDateInputValue } from "@/lib/format";
import { transactionUpdateSchema } from "@/lib/schemas";

// Session-269 (R-66): the pins for the unpadded-year, net-universe, and
// drawer-guard round. Every cure leg was born RED over the pre-cure tree
// (the F-269 ledger rows in docs/remediation_plan_v2.md §2.27 carry the
// verified evidence — the round's flagship: the prefill bridge emitted
// unpadded years, so a stored year-0206 row — admitted by the boundary
// and read honestly by the seam — could not round-trip through the app's
// own edit dialog).
//
// The round's genus: one bridge padding (the unclosed tail of the F-268a
// consumer chain), one walk-universe extension with its maiden-run
// rewords, one pin-window widening (the stale tail the lockstep could
// not see), one stacked-dialog guard with a self carve-out, one posture
// lock, and three comment-truth riders.
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

// ---- F-269a: the prefill bridge pads the year ------------------------------

describe("F-269a — the prefill bridge emits four-digit years", () => {
  it("a stored year-0206 row prefills the padded form (the flagship leg)", () => {
    // Pre-cure: the month and day were padded but the year was NOT, so
    // the bridge emitted "206-06-15" — a string the native date input
    // treats as NO value and the boundary rejects on save (runtime-
    // verified). The stored form parses through toDate honestly (year
    // 206, no remap at or above 100); the bridge must re-emit what the
    // boundary admits.
    expect(toDateInputValue(toDate("0206-06-15T00:00:00.000Z"))).toBe("0206-06-15");
    // The bare stored form anchors the same calendar.
    expect(toDateInputValue(toDate("0206-06-15"))).toBe("0206-06-15");
  });

  it("the prefill output round-trips through the update schema (the consumer chain closed)", () => {
    // The compose the four edit bridges ride: stored row → toDate →
    // the bridge → the date input → the update body. Pre-cure the
    // chain broke at the bridge (the unpadded form failed dateField
    // on save — a description-only edit of the row was blocked).
    const prefill = toDateInputValue(toDate("0206-06-15T00:00:00.000Z"));
    expect(
      transactionUpdateSchema.safeParse({
        id: "year-0206-row",
        description: "Whole Foods run",
        amount: 142.67,
        type: "expense",
        date: prefill,
      }).success,
    ).toBe(true);
  });

  it("a legacy sub-100 row prefills the padded honest display (the F-268a posture held on the read side)", () => {
    // The setter arm reads the year as written; the bridge must still
    // emit a four-digit string so the native input can DISPLAY it (a
    // three-digit year renders empty). The save side keeps the F-268a
    // doctrine: the boundary rejects sub-100 years on write.
    expect(toDateInputValue(toDate("0050-06-15T00:00:00.000Z"))).toBe("0050-06-15");
    expect(
      transactionUpdateSchema.safeParse({
        id: "legacy-row",
        description: "Whole Foods run",
        amount: 142.67,
        type: "expense",
        date: "0050-06-15",
      }).success,
    ).toBe(false);
  });

  it("the current-year form is byte-identical (the rider)", () => {
    // Green-by-design rider: every current-era consumer emits the same
    // string as before the padding cure.
    expect(toDateInputValue(toDate("2026-11-08T00:00:00.000Z"))).toBe("2026-11-08");
    expect(toDateInputValue(new Date(2026, 10, 8, 15, 0, 0))).toBe("2026-11-08");
  });

  it("the bridge docblock states the four-digit contract (the doc-truth genus)", () => {
    const src = read("src/lib/format.ts");
    expect(norm(src)).toContain("four-digit");
  });
});

// ---- F-269d: the drawer's Escape guard (the stacked-dialog carve-out) ------

describe("F-269d — the drawer's Escape listener guards stacked surfaces", () => {
  const ANCHOR = 'if (e.key !== "Escape") return;';

  it("the listener tests for an open popper wrapper before closing (the F-266d twin)", () => {
    const src = read("src/components/layout/mobile-nav.tsx");
    const idx = src.indexOf(ANCHOR);
    expect(idx).toBeGreaterThan(-1);
    // The window is sized past the cure's own comment block (the
    // F-247e lesson).
    const window = src.slice(idx, idx + 1700);
    expect(window).toContain('[data-radix-popper-content-wrapper]');
  });

  it("the dialog census excludes the drawer's own element (the self carve-out)", () => {
    // The drawer IS a dialog, so a naive census would self-match and
    // never close — the guard must exclude its own element id and
    // yield the Escape to any OTHER open dialog (Radix's dismissable
    // layer closes the dialog on the keydown without stopping
    // propagation — the F-266d doctrine, carried to the shell).
    const src = read("src/components/layout/mobile-nav.tsx");
    const idx = src.indexOf(ANCHOR);
    const window = src.slice(idx, idx + 1700);
    expect(window).toContain('querySelectorAll(\'[role="dialog"]\')');
    expect(window).toContain('!== "mobile-nav-drawer"');
  });
});

// ---- F-269e: the sub-100 custom-bound posture lock --------------------------

describe("F-269e — a sub-100 custom bound windows, it does not drop (the posture lock)", () => {
  // Green-by-design rider at birth: the F-268a setter arm flipped this
  // posture silently (pre-cure, the year-50 bound remapped to 1950, the
  // calendar round-trip failed, and the bound DROPPED OPEN; post-cure
  // the seam reads the year honestly and the bound WINDOWS). The pin
  // locks the live posture against regression — the flip rode no pin in
  // either direction until this leg.
  interface Row {
    id: string;
    description: string;
    category: string;
    budgetCategory: "needs" | "wants" | "savings";
    amount: number;
    type: "expense";
    date: string;
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
  ];
  const NOV8 = new Date(2026, 10, 8, 15, 0, 0);
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

  it("a sub-100 custom END bound windows — the 2026 rows fall past it (zero rows)", () => {
    const out = filterAndSortExpenses(
      ROWS,
      { ...ALL, range: "custom", customEnd: "0050-06-15" },
      NOV8,
    );
    expect(out).toHaveLength(0);
  });

  it("a sub-100 custom START bound windows — the 2026 rows fall after it (all rows)", () => {
    const out = filterAndSortExpenses(
      ROWS,
      { ...ALL, range: "custom", customStart: "0050-06-15" },
      NOV8,
    );
    expect(out).toHaveLength(ROWS.length);
  });
});

// ---- F-269f/F-269g/F-269h: the three comment-truth riders -------------------

describe("F-269f — the reset confirm literal claims its exception", () => {
  it("the route's comment names the one-schema-family deviation (the users-PATCH precedent)", () => {
    const src = read("src/app/api/reset/route.ts");
    expect(norm(src)).toContain("outside the schemas.ts family");
  });
});

describe("F-269g — the update-guard comment names the upsert", () => {
  it("the comment trues to the settings PUT call form (the F-239g reality)", () => {
    const src = read("src/lib/schemas.ts");
    expect(norm(src)).toContain("settings PUT rides db.setting.upsert");
  });
});

describe("F-269h — the dashboard clock carries the staleness registration", () => {
  it("the comment registers the mount-time-calendar trade (the analytics twin's form)", () => {
    const src = read("src/app/(app)/dashboard/page.tsx");
    expect(norm(src)).toContain("mount-time calendar");
  });
});
