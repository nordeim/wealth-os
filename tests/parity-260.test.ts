import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import * as finance from "@/lib/finance";

// Session-260 (R-57): the source-tier + behavioral pins for the
// afternoon-label and register-truing round. Every leg was born RED
// over the pre-cure tree (the F-260a ledger row in
// docs/remediation_plan_v2.md §2.18 carries the verified evidence —
// the two-zone arithmetic reproduction confirmed the defect live on
// ordinary, non-DST days; the whole-tree sweep bounded the genus at
// exactly one uncured site; the morning-run gates the blindness:
// every pre-noon ref computes correctly).
//
// The round's genus: the VISIBLE day-label seam (relativeDays)
// still divided a millisecond span by a fixed 24h and rounded — any
// ref after local noon crossed the half-day threshold and mislabeled
// the whole one-day band on ordinary days (the R-56 cure's
// unmigrated sibling: the analytics end-pad and the Upcoming day
// count were retired that round, the visible label was not).
//
// The behavioral legs mirror the production call forms: the date
// rides the toDate re-anchored local midnight, the ref is the
// render-time clock carrying a time of day.

function read(rel: string): string {
  return readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf8");
}

// ---- F-260a: the visible day-label seam is calendar-day arithmetic ----

describe("F-260a — the visible day-label seam is calendar-day arithmetic", () => {
  const SAVED_TZ = process.env.TZ;
  afterEach(() => {
    process.env.TZ = SAVED_TZ;
  });

  it("the seam derives its day count through the calendar-day helper (no fixed 24h division)", () => {
    const src = read("src/lib/finance.ts");
    const start = src.indexOf("export function relativeDays");
    expect(start).toBeGreaterThan(-1);
    const seam = src.slice(start);
    expect(seam).toContain("calendarDaysBetween(");
    expect(seam).not.toMatch(/86_400_000/);
  });

  it("a same-day row labels Today under an afternoon ref (the verified defect form A)", () => {
    process.env.TZ = "UTC";
    const date = finance.toDate("2026-11-10");
    const ref = new Date(2026, 10, 10, 12, 30);
    expect(finance.relativeDays(date, ref)).toBe("Today");
  });

  it("a next-day row labels Tomorrow under an afternoon ref (form B); the morning ref agrees", () => {
    process.env.TZ = "UTC";
    const date = finance.toDate("2026-11-11");
    expect(finance.relativeDays(date, new Date(2026, 10, 10, 12, 30))).toBe("Tomorrow");
    // The morning equivalence rider: pre-noon refs computed
    // correctly even pre-cure (the blindness that kept gates green).
    expect(finance.relativeDays(date, new Date(2026, 10, 10, 9, 0))).toBe("Tomorrow");
  });

  it("a yesterday row labels Yesterday under an afternoon ref (the verified defect form C)", () => {
    process.env.TZ = "UTC";
    const date = finance.toDate("2026-11-09");
    const ref = new Date(2026, 10, 10, 12, 30);
    expect(finance.relativeDays(date, ref)).toBe("Yesterday");
  });

  it("the same-day label holds from both sides of noon into the late evening (the threshold retirement)", () => {
    process.env.TZ = "UTC";
    const date = finance.toDate("2026-11-10");
    expect(finance.relativeDays(date, new Date(2026, 10, 10, 9, 0))).toBe("Today");
    expect(finance.relativeDays(date, new Date(2026, 10, 10, 23, 59))).toBe("Today");
  });

  it("the far band counts calendar days (in N days under an afternoon ref)", () => {
    process.env.TZ = "UTC";
    const date = finance.toDate("2026-11-25");
    const ref = new Date(2026, 10, 10, 12, 30);
    expect(finance.relativeDays(date, ref)).toBe("in 15 days");
  });

  it("the far past band counts calendar days (N days ago under an afternoon ref)", () => {
    process.env.TZ = "UTC";
    const date = finance.toDate("2026-11-07");
    const ref = new Date(2026, 10, 10, 12, 30);
    expect(finance.relativeDays(date, ref)).toBe("3 days ago");
  });

  it("a DST zone reads the calendar truth on ordinary days (the corrected exoneration: a one hour DST shift never changes the label)", () => {
    process.env.TZ = "America/New_York";
    const date = finance.toDate("2026-11-10");
    expect(finance.relativeDays(date, new Date(2026, 10, 10, 12, 30))).toBe("Today");
    const next = finance.toDate("2026-11-11");
    expect(finance.relativeDays(next, new Date(2026, 10, 10, 12, 30))).toBe("Tomorrow");
  });

  it("the GENUS census: the fixed 24h literal survives only inside the calendar-day helper's own ordinal form", () => {
    const src = read("src/lib/finance.ts");
    const occurrences = src.match(/86_400_000/g) ?? [];
    expect(occurrences).toHaveLength(1);
    // The one survivor is the helper's own UTC-parts ordinal division
    // (calendar arithmetic over Date.UTC parts, not a span division).
    const helperStart = src.indexOf("export function calendarDaysBetween");
    const helperEnd = src.indexOf("}", src.indexOf("86_400_000", helperStart));
    expect(src.slice(helperStart, helperEnd + 1)).toContain("86_400_000");
  });

  it("the F-259c register no longer carries the stale threshold exoneration (the plan truing)", () => {
    const plan = read("docs/remediation_plan_v2.md");
    expect(plan).not.toContain("never crosses its rounding threshold");
    const rowStart = plan.indexOf("| F-259c |");
    expect(rowStart).toBeGreaterThan(-1);
    const rowEnd = plan.indexOf("\n", rowStart);
    const row = plan.slice(rowStart, rowEnd);
    expect(row).toContain("trued in R-57");
  });
});
