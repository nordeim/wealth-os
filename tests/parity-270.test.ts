import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-270 (R-67): the pins for the liveness-fabrication,
// stacked-escape, and comment-truth round. Every cure leg was born RED
// over the pre-cure tree (the F-270 ledger rows in
// docs/remediation_plan_v2.md §2.28 carry the verified evidence —
// the round's flagship: the env example's hash-marked prose landed on
// the splitter's CODE side, so its tokens joined the live universe
// and fabricated repo-wide liveness through the engine's
// early-continue).
//
// The round's genus: one lockstep comment dedupe with its own
// no-double-append teeth, one dialect arm over the net's engine, one
// comment-truth truing with the stacked-order e2e leg it names, and
// two comment riders (the inert single-child row, the skip-link
// cycle exclusion).
//
// Prose pins hard-wrap and ride comment-line prefixes: containment
// runs over the comment-stripped, whitespace-normalized form (the
// F-239f lesson). Source pins anchor on construction-site forms (the
// F-239e lesson), admit comment lines between their anchors (the
// F-248e lesson), and size their windows past the comments the same
// commit writes (the F-247e lesson).

function read(rel: string): string {
  return readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf8");
}

const norm = (s: string): string =>
  s
    .replace(/^[ \t]*(?:\/\/|\*|\{\/\*)[ \t]?/gm, "")
    .replace(/\s+/g, " ");

// ---- F-270a: the comment ladder carries no doubled block ---------------

describe("F-270a — the docs-counts comment ladder carries no doubled block", () => {
  // The R-66 lockstep's partial re-runs appended the Session-269
  // trio-advance comment twice (the plain insert form, no idempotency
  // guard — the F-242j genus biting the ladder). The ladder is the
  // guard's own history; a doubled row is a lie by duplication and a
  // future insert-anchor hazard. The teeth: within any contiguous
  // comment run, no non-trivial line may repeat (every ladder line is
  // unique prose — a repeated long line inside one run is always a
  // double-append).
  const src = read("tests/docs-counts.test.ts");

  it("no contiguous comment run carries a repeated non-trivial line", () => {
    const offenders: string[] = [];
    let run: string[] = [];
    const closeRun = () => {
      const seen = new Set<string>();
      for (const raw of run) {
        const line = raw.trim();
        if (line.length < 20) continue; // dividers and stubs may repeat
        if (seen.has(line)) offenders.push(line);
        seen.add(line);
      }
      run = [];
    };
    for (const line of src.split("\n")) {
      if (/^\s*\/\//.test(line)) {
        run.push(line);
      } else {
        closeRun();
      }
    }
    closeRun();
    expect(
      offenders,
      `doubled comment lines inside a single run (collapse the duplicate — ` +
        `the ladder's history must be linear):\n  ${offenders.join("\n  ")}`,
    ).toEqual([]);
  });
});

// ---- F-270c: the stacked-order comment names the surviving gap -----------

describe("F-270c — the F-266d comment names the surviving e2e gap and cites the twin", () => {
  const src = read("src/app/(app)/expenses/page.tsx");

  it("the parenthetical cites the drawer's landed twin guard (F-269d)", () => {
    expect(norm(src)).toContain(
      "the drawer's own twin guard landed with F-269d",
    );
  });

  it("the parenthetical names the stacked-order interleaving as the surviving e2e gap", () => {
    expect(norm(src)).toContain("the card-plus-drawer interleaving below lg");
    expect(norm(src)).toContain("one press one surface");
  });

  it("the mobile battery carries the stacked-order e2e leg", () => {
    // The behavior pin the comment points at: the interleaving leg in
    // the mobile battery (the filters card open, the drawer opened
    // over it at 390, the first Escape closes the drawer only, the
    // second closes the card).
    const spec = read("tests/e2e/mobile-navigation.spec.ts");
    expect(spec).toContain("stacked surfaces");
    expect(spec).toContain("Expense filters");
  });
});

// ---- F-270d: the single-child history row records its inertness ----------

describe("F-270d — the single-child history row records its inertness", () => {
  const src = read("src/app/(app)/expenses/page.tsx");

  it("the row's rider names the sibling form and the inert-by-design posture", () => {
    expect(norm(src)).toContain("the row predates the F-238a sibling form");
    expect(norm(src)).toContain("inert by design");
  });
});

// ---- F-270e: the drawer's focus cycle registers the skip-link exclusion --

describe("F-270e — the drawer's focus contract registers the skip-link exclusion", () => {
  const src = read("src/components/layout/mobile-nav.tsx");

  it("the cycle-scope comment registers the deliberate exclusion", () => {
    expect(norm(src)).toContain(
      "the cycle scope EXCLUDES the skip link by design",
    );
    expect(norm(src)).toContain("the drawer IS the navigation surface");
  });
});
