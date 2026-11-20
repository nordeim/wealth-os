import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-278 (R-75): the census-family, indented-walker, and
// register-hygiene round's battery. Born honest RED against the
// v2.74.0 ship state — every leg except the orphan census (the
// standing form, green-by-design per the S49-P3 precedent) pins a
// false or missing form that rides the tree at HEAD.
//
// The round's three cures:
//   F-278a  the curated tracked-doc family joins the table-truth
//           censuses (both DOCS lists extend to fifteen files) and
//           the two never-censused unescaped-pipe rows escape
//           (the sibling skill doc's debugging row + the session-199
//           implementation plan's stack-mapping row)
//   F-278b  both census walkers gain the indented-row predicate
//           (GFM admits up to three leading spaces)
//   F-278c  the a11y register's duplicated muted caption matcher
//           de-dups to one cite (the gradient arm's cite covers
//           both surfaces; the union is unchanged)

const ROOT = path.resolve(import.meta.dirname, "..");
const read = (rel: string): string => readFileSync(path.join(ROOT, rel), "utf-8");

// The curated tracked-doc family the round's censuses walk: the
// seven living docs plus the eight never-walked curated files
// (everything at the root and under docs/ EXCEPT the transcript
// family — docs/session_*.md and docs/prompt-to-*.md, excluded by
// the immutable-record doctrine — and the skills/ library, excluded
// by the owner's standing directive; docs/worklog.md is the F-227a
// symlink, already content-pinned to the root log by parity-227).
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

// Fence-awareness (the F-277d form, hardened session 279, R-76,
// F-279c): a fence line at up to three leading spaces (GFM's
// list-item fences) toggles the fence state — an indented fence line
// inside an outer fence stays content unless its indent does not
// exceed the opener's; lines inside a fence are CODE, never table
// rows.
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

// The indented-row predicate (the round's F-278b hardening, born
// in this battery's own walker): GFM admits tables indented up to
// three leading spaces — a column-0-only predicate is blind to an
// indented orphan block exactly the way it was blind to fenced
// pipe lines before the F-277d cure.
const isPipeRow = (l: string) => /^ {0,3}\|/.test(l);

// The delimiter-row shape a GFM table's second line must carry.
const isDelimiter = (l: string) => /^\s*\|[\s:|-]+\|\s*$/.test(l);

const unescapedPipes = (l: string): number =>
  l.replace(/\\\|/g, "").split("|").length - 1;

// ---- F-278a: the curated family's tables render as tables ----------

describe("F-278a — the curated tracked-doc family joins the table-truth censuses", () => {
  it("the whole-family per-table census: every data row matches its header's cell count", () => {
    // The structural cure (the F-249b tradition — pin the invariant,
    // not the enumeration): a data row whose unescaped pipe count
    // deviates from its table header's count splits cells in GFM.
    // Pre-cure, two rows in the never-censused family fail exactly
    // here: the sibling skill doc's debugging row (five pipes
    // against a four-pipe header) and the session-199 implementation
    // plan's stack-mapping row (six against five).
    const offenders: string[] = [];
    for (const rel of FAMILY) {
      const lines = stripFences(read(rel));
      let headerCount: number | null = null;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i] as string;
        if (!isPipeRow(line)) {
          headerCount = null; // a table block ends
          continue;
        }
        if (isDelimiter(line)) continue; // the delimiter row
        const unescaped = unescapedPipes(line);
        if (headerCount === null) {
          headerCount = unescaped; // the block's first row is the header
          continue;
        }
        if (unescaped !== headerCount) {
          offenders.push(`${rel}:${i + 1} pipes=${unescaped} header=${headerCount}`);
        }
      }
    }
    expect(offenders, "the per-table pipe census over the curated family").toEqual([]);
  });

  it("the whole-family orphan census: zero pipe-blocks without a delimiter row", () => {
    // The standing F-277a form, extended to the family (green-by-
    // design at birth — zero orphan blocks ride the family today;
    // the leg guards the genus for every file the round brought
    // under the census).
    const offenders: string[] = [];
    for (const rel of FAMILY) {
      const lines = stripFences(read(rel));
      let i = 0;
      while (i < lines.length) {
        if (isPipeRow(lines[i] ?? "")) {
          let j = i;
          while (j < lines.length && isPipeRow(lines[j] ?? "")) j += 1;
          const block = lines.slice(i, j) as string[];
          if (block.length < 2 || !isDelimiter(block[1] as string)) {
            offenders.push(`${rel}:${i + 1}..${j} (${block.length} lines)`);
          } else if (unescapedPipes(block[0] as string) !== unescapedPipes(block[1] as string)) {
            // Session-279 (R-76, F-279b): GFM renders no table when
            // the delimiter's cell count mismatches the header's —
            // the shape check alone cannot catch the render-killing
            // genus.
            offenders.push(
              `${rel}:${i + 1} header=${unescapedPipes(block[0] as string)} delim=${unescapedPipes(block[1] as string)}`,
            );
          }
          i = j;
        } else {
          i += 1;
        }
      }
    }
    expect(offenders, "the NOT-A-TABLE census over the curated family").toEqual([]);
  });

  it("the sibling skill doc's debugging row escapes its in-cell pipe", () => {
    // The row's command pipe inside the code span splits the row
    // into five cells against the four-cell header — the F-247i
    // genus in a file every census excluded until this round. The
    // escape lands inside the code span (the F-247i house form:
    // the table parser consumes the backslash before inline
    // parsing).
    const lines = read("neo-crm_SKILL.md").split("\n");
    const at = lines.findIndex((l) => l.startsWith('| DB "outside the repo" |'));
    expect(at, "the debugging row").toBeGreaterThan(-1);
    // Derive the header's pipe count from the block's first row.
    let headerAt = at;
    while (headerAt > 0 && isPipeRow(lines[headerAt - 1] ?? "")) headerAt -= 1;
    const headerPipes = unescapedPipes(lines[headerAt] as string);
    expect(unescapedPipes(lines[at] as string), "the row renders its header's cell count").toBe(
      headerPipes,
    );
  });

  it("the session-199 implementation plan's stack-mapping row escapes its in-cell pipe", () => {
    // Same genus, the repo's own historical plan: the envelope form
    // inside the code span carries a raw pipe that splits the row
    // into six cells against the five-cell header.
    const lines = read("docs/implementation-plan-session-199-wealthos.md").split("\n");
    const at = lines.findIndex((l) => l.startsWith("| DB / API |"));
    expect(at, "the stack-mapping row").toBeGreaterThan(-1);
    let headerAt = at;
    while (headerAt > 0 && isPipeRow(lines[headerAt - 1] ?? "")) headerAt -= 1;
    const headerPipes = unescapedPipes(lines[headerAt] as string);
    expect(unescapedPipes(lines[at] as string), "the row renders its header's cell count").toBe(
      headerPipes,
    );
  });

  it("the parity-276 census's DOCS list walks the curated family", () => {
    // The scope cure's source pin: the standing census's own DOCS
    // list carries the eight family entries (the census walks what
    // the list names — the pre-cure list names seven).
    const census = read("tests/parity-276.test.ts");
    for (const entry of [
      '"docs/DEPLOYMENT.md"',
      '"docs/Tailwind-V4-Validation-Report.md"',
      '"docs/coding_agent_prompt.md"',
      '"docs/how-to-git-push-using-ssh-wrapper_SKILL.md"',
      '"docs/implementation-plan-session-199-wealthos.md"',
      '"docs/skills-inventory.md"',
      '"docs/web-app-codebase-evaluation-report.md"',
      '"neo-crm_SKILL.md"',
    ]) {
      expect(census, `the census list carries ${entry}`).toContain(entry);
    }
  });

  it("the parity-277 census's DOCS list walks the curated family", () => {
    // The F-277a orphan census's own DOCS list carries the same
    // eight entries — both batteries walk the same family.
    const census = read("tests/parity-277.test.ts");
    for (const entry of [
      '"docs/DEPLOYMENT.md"',
      '"docs/Tailwind-V4-Validation-Report.md"',
      '"docs/coding_agent_prompt.md"',
      '"docs/how-to-git-push-using-ssh-wrapper_SKILL.md"',
      '"docs/implementation-plan-session-199-wealthos.md"',
      '"docs/skills-inventory.md"',
      '"docs/web-app-codebase-evaluation-report.md"',
      '"neo-crm_SKILL.md"',
    ]) {
      expect(census, `the census list carries ${entry}`).toContain(entry);
    }
  });
});

// ---- F-278b: the walkers admit GFM's indented table rows -------------

describe("F-278b — the census walkers admit indented table rows (up to three leading spaces)", () => {
  it("the parity-276 census walker carries the indented-row predicate", () => {
    // The pre-cure walker gates rows on a column-0 pipe prefix —
    // an indented orphan block or split fragment would evade the
    // census the way fenced pipe lines did before F-277d. The
    // cure lands the predicate; the source pin holds its shape
    // (a future revert to the column-0 form fails here).
    const census = read("tests/parity-276.test.ts");
    expect(census).toContain("const isPipeRow");
    expect(census).toContain("/^ {0,3}\\|/");
  });

  it("the parity-277 census walker carries the indented-row predicate", () => {
    // Same genus, the orphan census's own walker.
    const census = read("tests/parity-277.test.ts");
    expect(census).toContain("const isPipeRow");
    expect(census).toContain("/^ {0,3}\\|/");
  });
});

// ---- F-278c: the a11y register's sanctioned matchers are cite-unique -

describe("F-278c — the a11y register's sanctioned matchers are cite-unique", () => {
  const spec = read("tests/e2e/a11y.spec.ts");
  const start = spec.indexOf("const SANCTIONED");
  const end = spec.indexOf("\n};", start);
  expect(start, "the register block").toBeGreaterThan(-1);
  expect(end, "the register block's close").toBeGreaterThan(start);
  const register = spec.slice(start, end);
  // Every class-shaped quoted token the register sanctions, in
  // order — duplicates are the F-220p stale-arm class's de-dup
  // edition (retiring one arm would not retire the class).
  const tokens = [...register.matchAll(/"(?:text|from|bg)-[a-z0-9-]+"/g)].map(
    (m) => m[0] as string,
  );

  it("no sanctioned class token rides two arms", () => {
    const seen = new Set<string>();
    const dupes: string[] = [];
    for (const t of tokens) {
      if (seen.has(t)) dupes.push(t);
      seen.add(t);
    }
    expect(dupes, "the register's class tokens, each cited exactly once").toEqual([]);
  });

  it("the duplicated muted caption matcher de-dups with the single-cite annotation", () => {
    // Pre-cure, the muted caption family's stone ink matcher rides
    // both the gradient arm and the caption arm; the cure drops
    // the caption arm's copy (the gradient arm's cite already
    // covers both surfaces) and the annotation names the borrow.
    const quoted = (spec.match(/"text-stone-400"/g) ?? []).length;
    expect(quoted, "the matcher rides exactly one arm").toBe(1);
    expect(spec).toContain("the gradient arm's cite above");
  });
});
