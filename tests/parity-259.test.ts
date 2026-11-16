import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import * as finance from "@/lib/finance";

// Session-259 (R-56): the source-tier + behavioral pins for the
// bound-message, DST-day, and census-prose round. Every src leg was
// born RED over the pre-cure tree (the F-259 ledger rows in
// docs/remediation_plan_v2.md §2.17 carry the verified evidence — the
// two DST defects were verified by code under three TZ switches
// before the cures were designed; the whole-file bare-bounds census
// bounded the F-259a genus at exactly six sites).
//
// The round's genus pair: the F-252j bound-message tail (six bare
// Zod bounds surfacing raw library copy through BAD_REQUEST) and
// the FIXED-MS CALENDAR (the F-218d family's millisecond edition —
// two seams that divide or pad by a fixed 24h where the local
// calendar day is 23h/25h), plus the toast census-prose tail
// (the F-229d discipline applied to the round's own prose).
//
// The behavioral legs import the finance namespace lazily-checked
// (typeof guards) so a missing export fails ONE leg, not the file —
// the honest-RED property (each leg fails on exactly its own defect).

function read(rel: string): string {
  return readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf8");
}

// ---- F-259a: the six bare bounds carry the house copy ------------------------

describe("F-259a — the six uncured bounds carry the house copy", () => {
  it("the signup name cap carries the message", () => {
    const src = read("src/lib/schemas.ts");
    const start = src.indexOf("export const signupSchema");
    const end = src.indexOf("});", start);
    const schema = src.slice(start, end);
    expect(schema).toContain('max(80, "Name must be reasonably sized")');
  });

  it("the transaction create's account-link cap carries the message", () => {
    const src = read("src/lib/schemas.ts");
    const start = src.indexOf("export const transactionCreateSchema");
    const end = src.indexOf("});", start);
    const schema = src.slice(start, end);
    expect(schema).toContain('max(64, "Account reference must be reasonably sized")');
  });

  it("the transaction update's account-link cap carries the message", () => {
    const src = read("src/lib/schemas.ts");
    const start = src.indexOf("export const transactionUpdateSchema");
    const end = src.indexOf("});", start);
    const schema = src.slice(start, end);
    expect(schema).toContain('max(64, "Account reference must be reasonably sized")');
  });

  it("the goal create's icon cap carries the message", () => {
    const src = read("src/lib/schemas.ts");
    const start = src.indexOf("export const goalCreateSchema");
    const end = src.indexOf("});", start);
    const schema = src.slice(start, end);
    expect(schema).toContain('max(40, "Icon must be reasonably sized")');
  });

  it("the goal update's icon cap carries the message", () => {
    const src = read("src/lib/schemas.ts");
    const start = src.indexOf("export const goalUpdateSchema");
    const end = src.indexOf("});", start);
    const schema = src.slice(start, end);
    expect(schema).toContain('max(40, "Icon must be reasonably sized")');
  });

  it("the coach history ARRAY cap carries the message (the content cap's sibling)", () => {
    const src = read("src/lib/schemas.ts");
    const start = src.indexOf("export const aiCoachSchema");
    const end = src.indexOf("});", start);
    const schema = src.slice(start, end);
    expect(schema).toContain('max(30, "History must be reasonably sized")');
  });

  it("the GENUS census: no bare numeric bound remains anywhere in the schema file", () => {
    // The F-252j trio was cured site-by-site; this leg retires the
    // family file-wide so the next field added without a message
    // fails the gate instead of waiting for a three-site enumeration
    // to miss it (the F-228b whole-genus lesson).
    const src = read("src/lib/schemas.ts");
    expect(src).not.toMatch(/\.(?:max|min)\(\s*\d[\d_]*\s*\)/);
  });
});

// ---- F-259b: the analytics end bound is the next local midnight --------------

describe("F-259b — the analytics range end bound is DST-correct", () => {
  const SAVED_TZ = process.env.TZ;
  afterEach(() => {
    process.env.TZ = SAVED_TZ;
  });

  it("the seam calls the next-midnight helper (no fixed millisecond pad)", () => {
    const src = read("src/app/(app)/analytics/page.tsx");
    // The seam-shape pin (the F-244e doctrine — pin the form the cure
    // shipped): the end bound is the helper on the re-anchored `to`,
    // not a pad; the parity-227 contract (all three parses through
    // toDate, no raw constructor in the seam) holds — the DST-correct
    // constructor lives inside the finance helper.
    const seamStart = src.indexOf("const inRange");
    const depsStart = src.indexOf("[txs, from, to]", seamStart);
    const seam = src.slice(seamStart, depsStart);
    expect(seam).toContain("toDate(t.date)");
    expect(seam).toContain("toDate(from)");
    expect(seam).toContain("toDate(to)");
    expect(seam).toContain("endOfDayExclusive(toDate(to))");
    expect(seam).not.toContain("86_399_000");
    expect(seam).not.toMatch(/new Date\(/);
  });

  it("the helper exists (the domain-math seam owns the calendar arithmetic)", () => {
    expect(typeof finance.endOfDayExclusive).toBe("function");
  });

  it("the exclusive end is the TRUE next midnight on a 23h spring-forward day (three zones)", () => {
    for (const tz of ["America/New_York", "Europe/Berlin", "Australia/Sydney"]) {
      process.env.TZ = tz;
      // 2026 spring-forward days: NY Mar 8, Berlin Mar 29, Sydney Oct 4.
      const to = finance.toDate("2026-03-08"); // a 23h day in NY; zone-agnostic form
      const end = finance.endOfDayExclusive(to);
      const trueNextMidnight = new Date(to.getFullYear(), to.getMonth(), to.getDate() + 1).getTime();
      expect(end).toBe(trueNextMidnight);
      // The old pad reached PAST the next midnight on 23h days — the
      // day-after row passed it. The exclusive bound must not.
      const dayAfterRow = finance.toDate("2026-03-09").getTime();
      expect(dayAfterRow).not.toBeLessThan(end);
    }
  });

  it("the same-day rows stay included (the inclusive-day semantics hold)", () => {
    process.env.TZ = "America/New_York";
    const to = finance.toDate("2026-06-15");
    const end = finance.endOfDayExclusive(to);
    // A row at the to-day's midnight (every stored row re-anchors to
    // midnight) and the to-day's last instant both stay in range.
    expect(to.getTime()).toBeLessThan(end);
    expect(new Date(2026, 5, 15, 23, 59, 59, 999).getTime()).toBeLessThan(end);
    // And the next calendar day's midnight is the bound itself.
    expect(finance.toDate("2026-06-16").getTime()).toBe(end);
  });
});

// ---- F-259c: the day count is a calendar-day difference -----------------------

describe("F-259c — the Upcoming day count is DST-correct", () => {
  const SAVED_TZ = process.env.TZ;
  afterEach(() => {
    process.env.TZ = SAVED_TZ;
  });

  it("the calendar-day helper exists", () => {
    expect(typeof finance.calendarDaysBetween).toBe("function");
  });

  it("reads the calendar truth through the fall-back window (the verified defect form)", () => {
    // The verified F-259c arithmetic: ref 2026-11-01 00:30 in
    // America/New_York, nextDate 2026-11-02 — the fixed-24h ceil
    // read 2 where the calendar truth is 1.
    process.env.TZ = "America/New_York";
    const ref = new Date(2026, 10, 1, 0, 30);
    const next = new Date(2026, 10, 2, 0, 0);
    expect(finance.calendarDaysBetween(ref, next)).toBe(1);
    // The construction site's own seam — upcomingAlerts — must read
    // the same truth through its stored-form input.
    const out = finance.upcomingAlerts(
      [
        {
          description: "Rent",
          amount: 2150,
          type: "expense",
          category: "Housing",
          date: "2026-11-01",
          recurring: true,
          nextDate: "2026-11-02",
        },
      ],
      ref,
    );
    expect(out).toHaveLength(1);
    expect(out[0].daysAway).toBe(1); // pre-cure: 2 — one day late
  });

  it("overdue rows keep their negative calendar truth across the boundary", () => {
    process.env.TZ = "America/New_York";
    // A row dated the day BEFORE ref across spring-forward reads -1.
    const ref = new Date(2026, 2, 9, 12, 0); // Mar 9 noon (Mar 8 was 23h)
    const next = new Date(2026, 2, 8, 0, 0);
    expect(finance.calendarDaysBetween(ref, next)).toBe(-1);
  });

  it("behavior-identical outside the DST windows (the equivalence pin)", () => {
    process.env.TZ = "America/New_York";
    // Mid-day ref: the old ceil and the calendar form agree — the
    // cure is behavior-preserving where no boundary rides.
    const ref = new Date(2026, 6, 15, 12, 0);
    const next = new Date(2026, 6, 18, 0, 0);
    expect(finance.calendarDaysBetween(ref, next)).toBe(3);
  });

  it("the daysAway construction calls the helper (no fixed-24h division in the seam)", () => {
    const src = read("src/lib/finance.ts");
    // The seam-shape pin: slice upcomingAlerts, assert the helper
    // call and the fixed-division's absence.
    const start = src.indexOf("export function upcomingAlerts");
    const end = src.indexOf(".sort((a, b) => a.daysAway - b.daysAway)", start);
    const fn = src.slice(start, end);
    expect(fn).toContain("calendarDaysBetween(ref, next)");
    expect(fn).not.toMatch(/86_400_000/);
  });
});

// ---- F-259d: the toast census prose claims rendered liveness ------------------

describe("F-259d — the toast prose no longer claims src-wide lastness", () => {
  it("the census names the uncalled source twin instead of the src-wide scope", () => {
    const src = read("src/components/ui/toast.tsx");
    // The F-229d discipline: describe with spaces, never cite the
    // class form. The reword claims rendered liveness explicitly and
    // names the tabs twin (the utility's source carrier, uncalled).
    // The phrase wraps at the ~80-col docblock — comment-continuation
    // normalization before containment (the parity-258 harness
    // lesson: a pin that depends on the wrap fails on the next
    // innocent reword).
    const flat = src
      .replace(/\n\s*\*\s?/g, " ")
      .replace(/\n\s*\/\/\s?/g, " ")
      .replace(/\s+/g, " ");
    expect(flat).toContain("the last rendered consumer of the hover foreground ink");
    expect(src).not.toContain("ride in src/");
  });
});
