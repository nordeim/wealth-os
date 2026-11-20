import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-277 (R-74): the blank-row-split, census-scope, and
// audit-census round's battery. Born honest RED against the
// v2.73.0 ship state — every leg pins a false or missing form that
// rides the tree at HEAD (the F-229e authoring tradition: the pin
// holds the CONTENT, never the wrap — all containment rides the
// whitespace-normalized form).
//
// The round's four cures:
//   F-277a  the §2 ledger's three blank-line table splits healed
//           (the F-276a genus one section over — 50 orphan rows)
//   F-277b  the advisory census re-anchored to the live bun audit
//           (the NEW dev-chain effect HIGH decoded in the ledger)
//   F-277c  the api.ts guards comment's honest body-route census
//           (twenty route files; the CRM-era URL surfaces retired)
//   F-277d  the parity-276 census's two soundness gaps closed
//           (fence-aware; worklog.md joins the DOCS list)

const ROOT = path.resolve(import.meta.dirname, "..");
const read = (rel: string): string => readFileSync(path.join(ROOT, rel), "utf-8");
const norm = (s: string): string => s.replace(/\s+/g, " ");
// The F-239f comment-wrapped-phrase doctrine: a phrase spanning a
// hard-wrapped comment line carries the marker prefix after plain
// normalization — strip BOTH line-comment and docblock markers first.
const normComment = (s: string): string =>
  norm(s.replace(/^[ \t]*(?:\/\/|\*)[ \t]*/gm, " "));

// The doc set the table-truth censuses walk (the seven living docs —
// worklog.md joined at this round, the F-277d scope cure).
const DOCS = [
  "docs/remediation_plan_v2.md",
  "README.md",
  "AGENTS.md",
  "CLAUDE.md",
  "wealth-os_SKILL.md",
  "Project_Architecture_Document.md",
  "worklog.md",
] as const;

// Strip fenced code blocks (the F-277d fence-awareness): a line that
// starts a ``` fence toggles the fence state; lines inside a fence
// are CODE, never table rows.
function stripFences(text: string): string[] {
  const out: string[] = [];
  let fence = false;
  for (const raw of text.split("\n")) {
    if (raw.startsWith("```")) {
      fence = !fence;
      out.push("");
      continue;
    }
    out.push(fence ? "" : raw);
  }
  return out;
}

// The delimiter-row shape a GFM table's second line must carry.
const isDelimiter = (l: string): boolean => /^\s*\|[\s:|-]+\|\s*$/.test(l);

// ---- F-277a: the §2 ledger's tables render as tables --------------------

describe("F-277a — the §2 ledger tables render as tables (no blank-line splits)", () => {
  const plan = read("docs/remediation_plan_v2.md");

  it("the fence-aware orphan census over the doc set: zero pipe-blocks without a delimiter row", () => {
    // The structural cure (the F-249b tradition — pin the invariant,
    // not the enumeration): GFM renders a table ONLY when the
    // delimiter row directly follows the header row and NO blank
    // line splits the row block. The census walks every pipe-prefixed
    // block in the seven-file doc set (fences stripped first) and
    // fails on any block whose second line is not a delimiter row —
    // the pre-cure tree carries exactly three (the session-225,
    // session-231, and session-241 audit rows orphaned after internal
    // blank lines).
    const offenders: string[] = [];
    for (const rel of DOCS) {
      const lines = stripFences(read(rel));
      let i = 0;
      while (i < lines.length) {
        if ((lines[i] ?? "").startsWith("|")) {
          let j = i;
          while (j < lines.length && (lines[j] ?? "").startsWith("|")) j += 1;
          const block = lines.slice(i, j) as string[];
          if (block.length < 2 || !isDelimiter(block[1] as string)) {
            offenders.push(`${rel}:${i + 1}..${j} (${block.length} lines)`);
          }
          i = j;
        } else {
          i += 1;
        }
      }
    }
    expect(offenders, "the fence-aware NOT-A-TABLE census over the doc set").toEqual([]);
  });

  it("the session-225 rows rejoin the session-203 ledger table (the F-224bb→F-225a adjacency)", () => {
    // The pre-cure blank line sat between F-224bb (the session-224
    // pass's last row) and F-225a (the session-225 pass's first) —
    // no section heading separates the passes, so the blank was the
    // ONLY thing splitting one table in two. The adjacency form: the
    // row after F-224bb is a pipe row, not a blank.
    const lines = plan.split("\n");
    const at = lines.findIndex((l) => l.startsWith("| F-224bb |"));
    expect(at, "the F-224bb row").toBeGreaterThan(-1);
    expect(lines[at + 1], "the row after F-224bb").toMatch(/^\| F-225a \|/);
  });

  it("the session-231 rows rejoin their table (the F-230h→F-231a adjacency)", () => {
    // Same genus, second site: the blank between F-230h (the
    // session-230 pass's last row) and F-231a (session-231's first).
    const lines = plan.split("\n");
    const at = lines.findIndex((l) => l.startsWith("| F-230h |"));
    expect(at, "the F-230h row").toBeGreaterThan(-1);
    expect(lines[at + 1], "the row after F-230h").toMatch(/^\| F-231a \|/);
  });

  it("the session-241 rows rejoin their table (the F-240n→F-241a adjacency)", () => {
    // Same genus, third site: the blank between F-240n (the
    // session-240 pass's last row) and F-241a (session-241's first).
    const lines = plan.split("\n");
    const at = lines.findIndex((l) => l.startsWith("| F-240n |"));
    expect(at, "the F-240n row").toBeGreaterThan(-1);
    expect(lines[at + 1], "the row after F-240n").toMatch(/^\| F-241a \|/);
  });
});

// ---- F-277b: the advisory census re-anchored to the live audit -----------

describe("F-277b — the advisory census carries the live two-vulnerability truth", () => {
  const pad = read("Project_Architecture_Document.md");

  it("the §10 advisories row carries the live census (2 advisories: 1 high / 1 moderate)", () => {
    // The pre-cure row recorded the R-69 census ("1 advisory: 1
    // moderate — all dev-toolchain, zero runtime chains") while the
    // live `bun audit` reports 2 vulnerabilities — the NEW dev-chain
    // effect HIGH riding nowhere in the doc set. The row's census
    // cell now names the live form (the F-272a same-commit precedent).
    expect(norm(pad)).toContain(
      "2 advisories: 1 high / 1 moderate — all dev-toolchain, zero runtime chains",
    );
  });

  it("the effect decode is named (the dev-chain chain, the exact-pin, the posture)", () => {
    // The decode a fresh operator needs: the advisory's id, the
    // dependency chain, and why it is not being cured same-session
    // (the dedicated-dependency-round posture — the fix is
    // unreachable without a prisma bump while 7.10.1 is the latest
    // stable).
    expect(pad).toContain("GHSA-7589-6fvf-x4pw");
    expect(norm(pad)).toContain("effect@3.20.0");
    expect(norm(pad)).toContain("@prisma/config@7.10.1");
    expect(norm(pad)).toContain("the re-triage duty watches the parent's releases");
  });

  it("the stale one-advisory standing form is gone from the live-tense row", () => {
    // The historical narratives keep their past-tense mentions (the
    // session-record doctrine); the live-tense census clause must
    // not survive the re-anchor — the exact form the pre-cure pin
    // enforced as contract.
    expect(norm(pad)).not.toContain(
      "1 advisory: 1 moderate — all dev-toolchain, zero runtime chains",
    );
  });
});

// ---- F-277c: the api.ts guards comment's honest census ------------------

describe("F-277c — the hand-rolled-guards comment names the honest census", () => {
  const api = read("src/lib/api.ts");

  it("the comment names the twenty-route-file truth and the sole asString survivor", () => {
    // The s166 retirement record under-counted (twelve was the
    // then-census; the family grew through ten rounds without a
    // re-count — the F-276d genus one comment over). The honest
    // present-tense census: twenty route files ride parseBody; the
    // auth family's six and the sessioned CRUD's twelve plus import
    // and the AI coach with their own ceilings; reset and users ride
    // readBoundedJson directly at the same gate; asString survives
    // at search's q parse alone.
    expect(normComment(api)).toContain("TWENTY route files ride parseBody");
    expect(normComment(api)).toContain("search's q parse");
  });

  it("the stale present-tense twelve-census and the CRM-era URL surfaces are gone", () => {
    // The F-239f comment-wrap normalization is load-bearing: the
    // pre-cure phrase spans hard-wrapped comment lines. The CRM-era
    // events/reports/export enumeration named routes that do not
    // exist in this tree (the F-220n genus's uncured remainder).
    expect(normComment(api)).not.toContain("the twelve body routes ride");
    expect(normComment(api)).not.toContain("events' from/to windows");
    expect(normComment(api)).not.toContain("the reports/export/search");
  });
});

// ---- F-277d: the parity-276 census's soundness gaps closed ---------------

describe("F-277d — the parity-276 census is hardened (fence-aware, seven docs)", () => {
  const census = read("tests/parity-276.test.ts");

  it("the walker strips fenced code before the table walk (fence-awareness)", () => {
    // The pre-cure walker treats pipe-prefixed lines inside ```
    // fences as table rows — a fenced sample could mint a
    // pseudo-header or mask a deviation. The hardened census toggles
    // a fence state at every ``` line and skips fenced lines; the
    // source pin holds the cure's own code shape (a future revert
    // drops the toggle and fails here).
    expect(census).toContain("fence = !fence");
    expect(census).toContain("stripFences");
  });

  it("the DOCS list covers worklog.md (the seventh living doc)", () => {
    // The pre-cure DOCS list covered six files; worklog.md — the
    // seventh living doc — was absent (luck-of-the-tree: zero
    // pipe-prefixed blocks there today). The hardened census walks
    // all seven.
    expect(census).toContain('"worklog.md"');
  });
});
