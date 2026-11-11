// Session-225 verification probe (R-22 intake audit — the driving
// session's independent re-verification of the audit Pass A claims).
// The three claims live-probed here under TZ switching (the house
// doctrine: a date-seam claim is proven only over each zone edge):
//
//   A-M1 — the numeric year-month partials stage the invented day 1
//          ("2026/11" / "2026.11" / "2026 11" / "2026/1") while the
//          hyphen partials and "11/2026" null. Claim: MEDIUM.
//   A-M2 — the zone-carrying forms the designator regex misses (" UTC"
//          tails, a space before the offset) stage the VIEWER's calendar
//          — a wrong day west of the designation. Claim: MEDIUM.
//   A-L2 — the two-digit-year rolled numeric date "02/30/26" stages the
//          roll (2026-03-02) in every zone. Claim: LOW.
//
// Controls staged alongside (must KEEP staging — the day-carrying and
// 4-digit guarded forms): "2026 Nov 15 10:00", "2026/11/01" (a valid YMD),
// "2026/11/01 UTC" (the 4-digit numeric guard — must SKIP in New York).
import * as path from "node:path";
import { stageCsvDate } from "../src/lib/csv";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "probe-225-csv.ts") process.exit(0);

const ZONES = ["UTC", "America/New_York", "Asia/Tokyo"] as const;

const CASES: Array<{ group: string; input: string; claim: string }> = [
  // ---- A-M1: the numeric year-month partials (claimed: stage day 1) ----
  { group: "A-M1", input: "2026/11", claim: "stages 2026-11-01 (invented day 1)" },
  { group: "A-M1", input: "2026.11", claim: "stages 2026-11-01" },
  { group: "A-M1", input: "2026 11", claim: "stages 2026-11-01" },
  { group: "A-M1", input: "2026/1", claim: "stages 2026-01-01" },
  // ---- A-M1 controls: the shapes that must already null ----
  { group: "A-M1-ctl", input: "2026-11", claim: "nulls (the PARTIAL_ISO hyphen arm)" },
  { group: "A-M1-ctl", input: "11/2026", claim: "nulls (V8 rejects the reversed numeric)" },
  // ---- A-M2: the missed zone designators (claimed: the viewer's calendar) ----
  { group: "A-M2", input: "Nov 1, 2026 UTC", claim: "NY: 2026-10-31 (wrong day); Tokyo: Nov 1" },
  { group: "A-M2", input: "Jan 1, 2026 UTC", claim: "NY: 2025-12-31 (wrong day AND year)" },
  { group: "A-M2", input: "11/01/26 UTC", claim: "NY: 2026-10-31 (two-digit year skips the guard)" },
  { group: "A-M2", input: "Nov 1, 2026 10:00 +09:00", claim: "NY: 2026-10-31 (space before the offset)" },
  // ---- A-M2 controls: the guarded 4-digit numeric forms must SKIP in NY ----
  { group: "A-M2-ctl", input: "2026/11/01 UTC", claim: "NY: null (the F-224a guard converts to skip)" },
  { group: "A-M2-ctl", input: "2026-11-01 10:00 +09:00", claim: "NY: null (the designated ISO arm)" },
  // ---- A-L2: the two-digit-year rolled numeric date ----
  { group: "A-L2", input: "02/30/26", claim: "stages 2026-03-02 (the roll) in every zone" },
  { group: "A-L2-ctl", input: "11/1/26", claim: "stages 2026-11-01 (the valid pinned control)" },
  // ---- staging controls that must keep staging (regression tripwire) ----
  { group: "ctl-keep", input: "2026 Nov 15 10:00", claim: "stages Nov 15 (the R-21 cure's own face)" },
  { group: "ctl-keep", input: "2026/11/01", claim: "stages 2026-11-01 (valid YMD)" },
];

function ymd(d: string | null): string {
  if (!d) return "null";
  return d.slice(0, 10);
}

for (const zone of ZONES) {
  process.env.TZ = zone;
  console.log(`\n=== TZ=${zone} ===`);
  for (const c of CASES) {
    let out: string | null = null;
    try {
      out = stageCsvDate(c.input);
    } catch (e) {
      console.log(`  [${c.group}] ${JSON.stringify(c.input)} -> THREW ${(e as Error).message}`);
      continue;
    }
    console.log(`  [${c.group}] ${JSON.stringify(c.input)} -> ${ymd(out)}   (claim: ${c.claim})`);
  }
}
console.log("\n[probe-225-csv] done");
