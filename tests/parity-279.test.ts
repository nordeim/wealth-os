import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-279 (R-76): the walker-unification, cell-count, and
// indented-fence round's battery. Born honest RED against the
// v2.75.0 ship state — every leg except the live-census legs (the
// standing green-by-design forms per the S49-P3 precedent) pins a
// false or missing form that rides the tree at HEAD.
//
// The round's four cures:
//   F-279a  parity-276's delimiter predicate unifies to the shared
//           colon-tolerant shape the sibling batteries already ship
//           (the evaluation report's sixteen colon-aligned delimiter
//           rows stop walking as DATA rows — the pipe-count luck
//           dependency retires)
//   F-279b  all three censuses gain the header-vs-delimiter
//           cell-count comparison (GFM renders no table when the
//           delimiter's cell count mismatches the header's — the
//           render-killing genus closes)
//   F-279c  all three fence strippers admit up-to-three-space-
//           indented fences (the list-item fences) with the
//           opener-indent tracker
//   F-279d  the two instant-parse sites gain the instant-vs-calendar
//           comments (the F-228c identity lesson's prophylactic
//           form — a future doctrine sweep cannot "fix" them
//           backwards)

const ROOT = path.resolve(import.meta.dirname, "..");
const read = (rel: string): string => readFileSync(path.join(ROOT, rel), "utf-8");

// The curated tracked-doc family (the R-75 scope doctrine, unchanged
// this round: everything at the root and under docs/ EXCEPT the
// transcript family — the immutable-record doctrine — and the
// skills/ library — the owner's standing exclusion directive;
// docs/worklog.md is the F-227a symlink, content-pinned to the root
// log by parity-227).
const FAMILY = [
  "docs/remediation_plan_v2.md",
  "README.md",
  "AGENTS.md",
  "CLAUDE.md",
  "wealth-os_SKILL.md",
  "Project_Architecture_Document.md",
  "worklog.md",
  "docs/DEPLOYMENT.md",
  "docs/Tailwind-V4-Validation-Report.md",
  "docs/coding_agent_prompt.md",
  "docs/how-to-git-push-using-ssh-wrapper_SKILL.md",
  "docs/implementation-plan-session-199-wealthos.md",
  "docs/skills-inventory.md",
  "docs/web-app-codebase-evaluation-report.md",
  "neo-crm_SKILL.md",
] as const;

// Fence-awareness, the F-279c-hardened form: a fence line at up to
// three leading spaces (GFM's list-item fences) toggles the fence
// state; an indented fence line INSIDE an outer fence stays content
// unless its indent does not exceed the opener's.
function stripFences(text: string): string[] {
  const out: string[] = [];
  let fence = false;
  let opener = 0;
  for (const raw of text.split("\n")) {
    const m = /^( {0,3})```/.exec(raw);
    if (m) {
      if (!fence) {
        fence = true;
        opener = (m[1] ?? "").length;
        out.push("");
        continue;
      }
      if ((m[1] ?? "").length <= opener) fence = false;
      out.push("");
      continue;
    }
    out.push(fence ? "" : raw);
  }
  return out;
}

// The indented-row predicate (the F-278b hardening, carried from
// the sibling batteries): GFM admits tables indented up to three
// leading spaces.
const isPipeRow = (l: string) => /^ {0,3}\|/.test(l);

// The delimiter-row shape a GFM table's second line must carry —
// the colon-tolerant form (alignment colons are legal delimiters).
// Session-280 (R-77, F-280a): the colon-tolerant shape gains its
// substance — the cmark-gfm reference scanner admits a delimiter cell
// as spaces, an optional edge colon, a NON-EMPTY hyphen run, an
// optional edge colon, spaces; a cell carrying no hyphen, or a colon
// inside the run, renders NO table on GitHub while passing the loose
// shape this round retires.
const isDelimiter = (l: string) => /^\s*\|(\s*:?-+:?\s*\|)+\s*$/.test(l);

const unescapedPipes = (l: string): number =>
  l.replace(/\\\|/g, "").split("|").length - 1;

// ---- F-279a: the delimiter-shape unification -----------------------------

describe("F-279a — the census walkers' delimiter predicates unify to the colon-tolerant shape", () => {
  it("the parity-276 census walker carries the shared delimiter predicate", () => {
    // The pre-cure walker tests the delimiter with a colon-blind
    // inline form while its two siblings ship the colon-tolerant
    // module-level predicate — the drift this round retires. The
    // source pin holds the unified form (a future revert to the
    // inline form fails here).
    const census = read("tests/parity-276.test.ts");
    expect(census, "the module-level predicate").toContain("const isDelimiter");
    expect(census, "the walk consults it").toContain("if (isDelimiter(line))");
  });

  it("the colon-blind inline delimiter form is retired from the parity-276 walker", () => {
    // The retired WALK form's char class carries no colons and its
    // prefix carries the indent quantifier — exactly the gap the
    // drift rode. Its absence from the file is the retirement's
    // second half; the positive pin above is the first (the F-218b
    // lesson: never the negative alone). The pin is scoped to the
    // walk's own form — the §5-scoped structure legs keep their
    // plain single-table regexes by design (the F-242j scope
    // doctrine: a cure touches the site it carries, never the
    // neighbors).
    const census = read("tests/parity-276.test.ts");
    expect(census).not.toContain(" {0,3}\\|[-| ]+\\|$");
  });

  it("the evaluation report's colon-aligned delimiter population is the live drift carrier", () => {
    // The drift's live population, derived at test time: rows the
    // colon-tolerant shape reads as delimiters while the colon-blind
    // form reads as data. Sixteen today — the census walks them as
    // delimiters once the predicate unifies (the pipe-count luck
    // dependency retires; the count re-trips legitimately if the
    // doc's tables change).
    const lines = read("docs/web-app-codebase-evaluation-report.md").split("\n");
    const colonAligned = lines.filter(
      (l) => isDelimiter(l) && !/^ {0,3}\|[-| ]+\| {0,3}$/.test(l),
    ).length;
    expect(colonAligned, "the colon-aligned delimiter rows").toBe(16);
  });
});

// ---- F-279b: the header-vs-delimiter cell-count comparison --------------

describe("F-279b — the censuses compare the delimiter's cell count to the header's", () => {
  it("the parity-276 census compares the delimiter row's cell count to the header's", () => {
    // The pre-cure walk SKIPS the delimiter row before the pipe-count
    // comparison — a plain delimiter that drops a cell passes the
    // census while GFM renders no table. The source pin holds the
    // comparison the cure lands (the delimiter consults the same
    // unescaped-pipe count the data rows do).
    const census = read("tests/parity-276.test.ts");
    expect(census, "the hoisted helper").toContain("const unescapedPipes");
    expect(census, "the delimiter-vs-header comparison").toContain(
      "unescapedPipes(line) !== headerCount",
    );
  });

  it("the parity-277 orphan census compares the delimiter's cell count to the header's", () => {
    // Same genus in the sibling battery: the orphan census checks
    // only that the block's second row is delimiter-SHAPED — the
    // cure adds the count comparison to the else arm.
    const census = read("tests/parity-277.test.ts");
    expect(census, "the hoisted helper").toContain("const unescapedPipes");
    expect(census, "the header-vs-delimiter comparison").toContain(
      "unescapedPipes(block[0] as string) !== unescapedPipes(block[1] as string)",
    );
  });

  it("the parity-278 orphan census compares the delimiter's cell count to the header's", () => {
    // The third battery ships the helper already; the orphan
    // census's else arm gains the comparison.
    const census = read("tests/parity-278.test.ts");
    expect(census, "the header-vs-delimiter comparison").toContain(
      "unescapedPipes(block[0] as string) !== unescapedPipes(block[1] as string)",
    );
  });

  it("the whole-family cell-count census: every delimiter row's cell count matches its header's", () => {
    // The standing-from-birth live census over the curated family
    // (the walker this battery itself ships — fences
    // indent-aware, rows indented-admitted, delimiters
    // colon-tolerant, counts compared). Zero live offenders today
    // (the driving-session audit census); the leg guards the genus
    // for the whole family.
    const offenders: string[] = [];
    for (const rel of FAMILY) {
      const lines = stripFences(read(rel));
      let headerCount: number | null = null;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i] as string;
        if (!isPipeRow(line)) {
          headerCount = null;
          continue;
        }
        if (isDelimiter(line)) {
          if (headerCount !== null && unescapedPipes(line) !== headerCount) {
            offenders.push(`${rel}:${i + 1} delim=${unescapedPipes(line)} header=${headerCount}`);
          }
          continue;
        }
        if (headerCount === null) {
          headerCount = unescapedPipes(line);
          continue;
        }
      }
    }
    expect(offenders, "the delimiter cell-count census over the curated family").toEqual([]);
  });
});

// ---- F-279c: the fence strippers admit indented fences ------------------

describe("F-279c — the fence strippers admit indented list-item fences", () => {
  const OPENERS = ["const m = /^( {0,3})```/.exec(raw);", "let opener = 0;"] as const;

  it("the parity-276 fence stripper toggles on indented fences", () => {
    // The pre-cure stripper gates on a column-0 fence prefix — the
    // list-item fences never blank. The source pin holds the
    // indent-aware toggle (the opener-indent tracker's two
    // load-bearing fragments).
    const census = read("tests/parity-276.test.ts");
    for (const frag of OPENERS) {
      expect(census, `the hardened stripper carries ${frag}`).toContain(frag);
    }
  });

  it("the parity-277 fence stripper toggles on indented fences", () => {
    const census = read("tests/parity-277.test.ts");
    for (const frag of OPENERS) {
      expect(census, `the hardened stripper carries ${frag}`).toContain(frag);
    }
  });

  it("the parity-278 fence stripper toggles on indented fences", () => {
    const census = read("tests/parity-278.test.ts");
    for (const frag of OPENERS) {
      expect(census, `the hardened stripper carries ${frag}`).toContain(frag);
    }
  });

  it("the family's list-item-fence population is non-vacuous (three carrier files)", () => {
    // The F-244e non-vacuousness form: the hardening must have live
    // carriers to harden. Three family files carry indented fence
    // lines outside column-0 fences (the README quick-start steps,
    // the skill doc's push-wrapper block, the deployment guide's
    // config blocks) — derived at test time, never enumerated.
    const carriers: string[] = [];
    for (const rel of FAMILY) {
      const rawLines = read(rel).split("\n");
      let fence = false;
      for (const raw of rawLines) {
        if (raw.startsWith("```")) {
          fence = !fence;
          continue;
        }
        if (!fence && /^ {1,3}```/.test(raw)) {
          carriers.push(rel);
          break;
        }
      }
    }
    expect(carriers.length, "the files carrying list-item fences").toBeGreaterThanOrEqual(3);
  });
});

// ---- F-279d: the instant-parse comment riders ---------------------------

describe("F-279d — the instant-parse sites name the instant-vs-calendar split", () => {
  it("the finance tiebreak site carries the instant-vs-calendar comment", () => {
    // createdAt is a TIMESTAMP column: the raw parse is CORRECT here
    // (an instant, not a UTC-midnight calendar date — routing it
    // through toDate would re-anchor a midnight-exact instant to
    // local midnight and mis-sort). The comment names the split so
    // a future raw-parse doctrine sweep cannot "fix" the site
    // backwards — the F-228c identity lesson's prophylactic form.
    const src = read("src/lib/finance.ts");
    expect(src, "the tiebreak comment").toContain("a timestamp instant");
  });

  it("the verification pending check carries the instant-vs-calendar comment", () => {
    // Same genus at the verification seam: expiresAt is a TIMESTAMP
    // column; the raw parse is the correct form.
    const src = read("src/lib/verification.ts");
    expect(src, "the pending-check comment").toContain("a timestamp instant");
  });
});
