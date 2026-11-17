import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { toDate } from "@/lib/finance";
import { transactionCreateSchema } from "@/lib/schemas";

// Session-268 (R-65): the pins for the year-remap, switch-target, and
// cleared-bound round. Every cure leg was born RED over the pre-cure
// tree (the F-268 ledger rows in docs/remediation_plan_v2.md §2.26
// carry the verified evidence — the round's flagship: the API date
// validator admitted sub-100 years the toDate constructor remaps to
// 19xx, so a stored year-50 row read 1950 and the edit prefill
// silently rewrote the stored year on save).
//
// The round's genus: one boundary rejection + one remap-safe seam arm
// (the two halves of the year-remap cure), one paint-invisible hit-area
// extension + one description wiring (the F-248j completion), one
// empty-bound-is-open guard family (the Expenses parseBound doctrine
// carried to the analytics seam), one census re-anchor (the security
// ledger's picomatch decode), and the two battery-gap riders.
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

// ---- F-268a: the sub-100-year remap — boundary + seam ----------------------

describe("F-268a — sub-100 years: rejected at the boundary, honest at the seam", () => {
  const valid = {
    description: "Whole Foods run",
    amount: 142.67,
    type: "expense",
    date: "2026-11-08",
  };

  it("dateField rejects a year-0050 date (the remap doctrine at the boundary)", () => {
    // Pre-cure: the string parser does NOT remap sub-100 years, so the
    // round-trip check passed "0050-06-15" — while toDate's numeric
    // constructor shifted it to 1950 on every read. A skip beats an
    // invented century (the csv.ts two-digit-year doctrine).
    expect(
      transactionCreateSchema.safeParse({ ...valid, date: "0050-06-15" }).success,
    ).toBe(false);
  });

  it("dateField rejects the year-0000 edge and the year-0099 shoulder", () => {
    expect(
      transactionCreateSchema.safeParse({ ...valid, date: "0000-01-01" }).success,
    ).toBe(false);
    expect(
      transactionCreateSchema.safeParse({ ...valid, date: "0099-12-31" }).success,
    ).toBe(false);
  });

  it("the boundary keeps the honest shoulders (0099 refuses, 0100 admits)", () => {
    // The first unremapped year still parses — the rejection floor is
    // exactly the remap range, not a wider ban.
    expect(
      transactionCreateSchema.safeParse({ ...valid, date: "0100-01-01" }).success,
    ).toBe(true);
    expect(
      transactionCreateSchema.safeParse({ ...valid, date: "2026-11-08" }).success,
    ).toBe(true);
  });

  it("toDate's branch 2 no longer remaps sub-100 years (the remap-safe arm)", () => {
    // Pre-cure: toDate("0050-06-15T00:00:00.000Z") returned June 15
    // 1950. The arm constructs the written calendar via the setter
    // that does not remap, keeping the local-midnight anchor.
    const d = toDate("0050-06-15T00:00:00.000Z");
    expect(d.getFullYear()).toBe(50);
    expect(d.getMonth()).toBe(5);
    expect(d.getDate()).toBe(15);
    expect(d.getHours()).toBe(0);
  });

  it("the arm carries both twins and the bare form identically", () => {
    const noMillis = toDate("0050-06-15T00:00:00Z");
    expect(noMillis.getFullYear()).toBe(50);
    const bare = toDate("0050-06-15");
    expect(bare.getFullYear()).toBe(50);
    expect(bare.getMonth()).toBe(5);
    expect(bare.getDate()).toBe(15);
  });

  it("normal years are untouched (the rider over the common path)", () => {
    // Green-by-design rider: the constructor's fast path stays for
    // every year the remap cannot touch.
    const d = toDate("2026-11-08T00:00:00.000Z");
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(10);
    expect(d.getDate()).toBe(8);
  });

  it("the dateField docblock states the sub-100 clause (the doc-truth genus)", () => {
    const src = read("src/lib/schemas.ts");
    expect(norm(src)).toContain("sub-100 years");
  });
});

// ---- F-268b: the settings switch — hit area + description ------------------

describe("F-268b — the switch's hit area and described-by wiring", () => {
  const SWITCH_ANCHOR = 'role="switch"';

  it("the button carries the hit-area extension family (paint-invisible)", () => {
    const src = read("src/app/(app)/settings/page.tsx");
    // The construction site: the switch button's class list, sliced
    // from the role attribute through the className (the F-239e
    // lesson), window sized past the comments the cure writes.
    const idx = src.indexOf(SWITCH_ANCHOR);
    expect(idx).toBeGreaterThan(-1);
    // The window is sized past the cure's own comment block (the
    // F-247e lesson — the geometry-truing edit lengthened it).
    const window = src.slice(idx, idx + 2200);
    // The extension: positioning context + the empty-content pseudo
    // at negative vertical insets — 36x32 clickable (the 2px border
    // spends 2px of each 8px inset), 36x20 painted.
    expect(window).toMatch(/relative/);
    expect(window).toMatch(/after:absolute/);
    expect(window).toMatch(/after:-inset-y-2/);
    expect(window).toMatch(/after:content-\[''\]/);
  });

  it("the painted track keeps the reference's own genus (the rider)", () => {
    // Green-by-design rider: the reference's switch measures 36x20
    // (live-measured through agent-browser) — the cure must not touch
    // the painted box, only the clickable one.
    const src = read("src/app/(app)/settings/page.tsx");
    const idx = src.indexOf(SWITCH_ANCHOR);
    const window = src.slice(idx, idx + 2200);
    expect(window).toMatch(/h-5 w-9/);
  });

  it("the description joins the switch's a11y chain (F-248j's completion)", () => {
    const src = read("src/app/(app)/settings/page.tsx");
    const idx = src.indexOf(SWITCH_ANCHOR);
    const window = src.slice(idx, idx + 2200);
    expect(window).toMatch(/aria-describedby=\{`switch-\$\{id\}-desc`\}/);
    // …and the paragraph carries the matching id.
    expect(src).toMatch(/id=\{`switch-\$\{id\}-desc`\}/);
  });
});

// ---- F-268c: the cleared analytics bound — empty means open ------------------

describe("F-268c — an empty analytics bound is an open bound", () => {
  it("the range seam guards both bounds before the toDate parse", () => {
    const src = read("src/app/(app)/analytics/page.tsx");
    // The construction site: the inRange filter. An empty bound must
    // never reach toDate ("" parses to an Invalid Date and NaN
    // compares false — the pre-cure zero-row range).
    const m = src.match(/const inRange = React\.useMemo\([\s\S]*?\[txs, from, to\],\s*\);/);
    expect(m).toBeTruthy();
    expect(m![0]).toMatch(/from === "" \? null : toDate\(from\)\.getTime\(\)/);
    expect(m![0]).toMatch(/to === "" \? null : endOfDayExclusive\(toDate\(to\)\)/);
    // The guard form: null means "no bound on this side".
    expect(m![0]).toMatch(/fromBound === null \|\| d >= fromBound/);
    expect(m![0]).toMatch(/toBound === null \|\| d < toBound/);
  });

  it("the refDate falls back when the upper bound is open", () => {
    const src = read("src/app/(app)/analytics/page.tsx");
    // The monthly series needs a real calendar to bucket against —
    // an Invalid Date ref buckets every month to NaN.
    expect(src).toMatch(
      /const refDate = React\.useMemo\(\(\) => \(to === "" \? new Date\(\) : toDate\(to\)\), \[to\]\);/,
    );
  });

  it("the non-empty path still routes through toDate (the F-227m doctrine rider)", () => {
    // Green-by-design rider: the guard sits BEFORE the parse; the
    // parse itself is unchanged (NEVER a raw new Date() on a stored
    // or input date — the F-218d/F-219e family).
    const src = read("src/app/(app)/analytics/page.tsx");
    const m = src.match(/const inRange = React\.useMemo\([\s\S]*?\[txs, from, to\],\s*\);/);
    expect(m).toBeTruthy();
    expect(m![0]).not.toMatch(/new Date\(from\)/);
    expect(m![0]).not.toMatch(/new Date\(to\)/);
  });
});

// ---- F-268e: the clearAllFilters body pin (the battery-gap rider) ------------

describe("F-268e — the clearAllFilters body carries every reset term", () => {
  it("the eight-setter body is pinned at its construction site", () => {
    // Green-by-design rider born over the holding body (the battery
    // gap the audit named): the panel's Clear All and the empty
    // state's Clear Filters both ride this function — a dropped
    // setter silently breaks both with every battery green.
    const src = read("src/app/(app)/expenses/page.tsx");
    const m = src.match(/const clearAllFilters = \(\) => \{[\s\S]*?\n  \};/);
    expect(m).toBeTruthy();
    for (const setter of [
      "setRangeFilter(\"\")",
      "setCustomStart(\"\")",
      "setCustomEnd(\"\")",
      "setCategoryFilter(\"all\")",
      "setMinAmount(\"\")",
      "setMaxAmount(\"\")",
      "setSortField(\"date\")",
      "setSortDir(\"desc\")",
    ]) {
      expect(m![0]).toContain(setter);
    }
  });
});

// ---- F-268f: the no-millis twin (the battery-gap rider) ----------------------

describe("F-268f — the no-millis twin still windows as a real bound", () => {
  it("a T00:00:00Z start bound windows identically to its .000 twin", async () => {
    // Green-by-design rider (the F-267 battery gap one twin short):
    // the regex admits the no-millis twin and toDate re-anchors it
    // identically — a future regex tightening that drops the optional
    // milliseconds arm must fail HERE, not silently in the seam.
    const { filterAndSortExpenses } = await import("@/lib/finance");
    const rows = [
      {
        id: "t1",
        description: "Whole Foods Run",
        category: "Groceries",
        budgetCategory: "needs" as const,
        amount: 84.12,
        type: "expense" as const,
        date: "2026-11-08T00:00:00.000Z",
        createdAt: "2026-11-08T12:00:00.000Z",
      },
      {
        id: "t3",
        description: "Dinner at Lucia",
        category: "Dining Out",
        budgetCategory: "wants" as const,
        amount: 76.5,
        type: "expense" as const,
        date: "2026-10-28T00:00:00.000Z",
        createdAt: "2026-10-28T20:00:00.000Z",
      },
    ];
    const out = filterAndSortExpenses(
      rows,
      {
        budgetTab: "all",
        category: "all",
        search: "",
        range: "custom",
        customStart: "2026-11-01T00:00:00Z",
        customEnd: "",
        minAmount: "",
        maxAmount: "",
        sortField: "date",
        sortDir: "desc",
      },
      new Date(2026, 10, 8, 15, 0, 0),
    );
    expect(out.map((r) => r.id)).not.toContain("t3");
    expect(out).toHaveLength(1);
  });
});
