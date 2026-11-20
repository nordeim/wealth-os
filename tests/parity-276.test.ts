import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-276 (R-73): the table-structure, census-truth, and
// phantom-comment round's battery. Born honest RED against the
// v2.72.0 ship state — every leg pins a false or missing form that
// rides the tree at HEAD (the F-229e authoring tradition: the pin
// holds the CONTENT, never the wrap — all containment rides the
// whitespace-normalized form).
//
// The round's five cures:
//   F-276a  the §5 execution-history table's GFM structure repaired
//           (delimiter, contiguity, the v2.47.0 row's cells)
//   F-276b  the ten §2-ledger rows' in-cell pipes escaped (F-247i genus)
//   F-276c  the three open-state a11y legs gain the modal-rationale
//           comment (the phantom ledger element completed in the tree)
//   F-276d  the api.ts body-ceiling docblock's family census reworded
//           to the fifteen-route truth (the budgets pair named)
//   F-276e  the AGENTS a11y contract line gains the floor pointer

const ROOT = path.resolve(import.meta.dirname, "..");
const read = (rel: string): string => readFileSync(path.join(ROOT, rel), "utf-8");
const norm = (s: string): string => s.replace(/\s+/g, " ");
// The F-239f comment-wrapped-phrase doctrine: a phrase spanning a
// hard-wrapped comment line carries the marker prefix after plain
// normalization — strip BOTH line-comment and docblock markers first
// (api.ts's docblocks ride the star form, the spec's comments the
// slash form).
const normComment = (s: string): string =>
  norm(s.replace(/^[ \t]*(?:\/\/|\*)[ \t]*/gm, " "));

// ---- F-276a: the §5 execution-history table renders as a table -----------

describe("F-276a — the §5 execution-history table's GFM structure", () => {
  const plan = read("docs/remediation_plan_v2.md");
  const s5 = plan.indexOf("## 5. Execution history");
  expect(s5, "the §5 heading").toBeGreaterThan(-1);
  const section = plan.slice(s5);
  const lines = section.split("\n");

  it("the header row is immediately followed by the delimiter row", () => {
    // GFM renders a table ONLY when the delimiter row directly follows
    // the header — the pre-cure form carried no delimiter there (the
    // one delimiter sat orphaned mid-table after a blank line), so the
    // whole history rendered as pipe-laden paragraphs.
    const headerAt = lines.findIndex((l) => l.startsWith("| Version | Session |"));
    expect(headerAt, "the §5 header row").toBeGreaterThan(-1);
    const next = lines[headerAt + 1];
    expect(next, "the delimiter directly under the header").toMatch(
      /^\|[-| ]+\|$/,
    );
  });

  it("the table block is contiguous — no blank lines, exactly one delimiter", () => {
    // The nine pre-cure blank separators split the row block into
    // paragraphs (GFM ends a table at the first blank line); the
    // contiguity leg pins the healed form end-to-end: from the header
    // to the last v2.x row, every line is a table row and exactly one
    // is the delimiter.
    const headerAt = lines.findIndex((l) => l.startsWith("| Version | Session |"));
    const rows: number[] = [];
    for (let i = headerAt; i < lines.length; i++) {
      const l = lines[i];
      if (!l.startsWith("|")) break;
      rows.push(i);
    }
    expect(rows.length, "the table's line span").toBeGreaterThan(60);
    const delimiters = rows.filter((i) =>
      /^\|[-| ]+\|$/.test(lines[i] as string),
    );
    expect(delimiters.length, "exactly one delimiter row").toBe(1);
    // Every row in the span is a data row with the header's cell
    // count (the per-table census form, scoped to §5): six pipes =
    // five cells, no in-cell pipes (escaped pipes are removed before
    // the count).
    for (const i of rows) {
      const l = lines[i] as string;
      if (/^\|[-| ]+\|$/.test(l)) continue;
      const unescaped = l.replace(/\\\|/g, "").split("|").length - 1;
      expect(unescaped, `row at §5 offset ${i - headerAt} pipe count`).toBe(6);
    }
  });

  it("the v2.47.0 row carries its gate and commit cells (the five-cell form)", () => {
    // The pre-cure row carried only three cells — its prose cell
    // swallowed the tail; the session-250 ship counts live in the
    // worklog (1668 unit / 102 files, 151 e2e, the re-derived drift
    // gates). The sibling rows' shape: gate cell, then the commit cell.
    const row = lines.find(
      (l) => l.startsWith("| v2.47.0 | 250 |"),
    );
    expect(row, "the v2.47.0 row").toBeDefined();
    // Six pipes = five cells (escaped pipes removed before the count).
    const unescaped = (row ?? "").replace(/\\\|/g, "").split("|").length - 1;
    expect(unescaped).toBe(6);
    expect(row).toContain("1668 unit (102 files");
    expect(row).toContain("151 e2e");
    expect(row).toContain("(this session's execution commit)");
  });
});

// ---- F-276b: the ten §2-ledger rows escape their in-cell pipes ----------

describe("F-276b — the §2 ledger rows escape their in-cell pipes", () => {
  const plan = read("docs/remediation_plan_v2.md");

  it("the ten rows now carry the escaped forms (the render-truth spots)", () => {
    // The F-275b pattern, one row per genus site: the pipe inside a
    // markdown table cell splits the row unless it rides the
    // backslash escape — pin the escaped forms at the four
    // representative sites (the regex tails, the class lists, the
    // field list, the auth-path regex) and the absence of the raw
    // forms.
    const f222a = plan.split("\n").find((l) => l.startsWith("| F-222a |"));
    expect(f222a).toContain(String.raw`(?:Z\|[+-]00:00)`);
    expect(f222a).not.toContain(String.raw`(?:Z|[+-]00:00)`);
    const f244e = plan.split("\n").find((l) => l.startsWith("| F-244e |"));
    expect(f244e).toContain(String.raw`(ts\|tsx\|jsx\|css)`);
    expect(f244e).toContain(String.raw`(tsx?\|jsx\|css)`);
    const f251d = plan.split("\n").find((l) => l.startsWith("| F-251d |"));
    expect(f251d).toContain(String.raw`"id"\|"name"\|"email"\|"avatarColor"`);
    const f257r = plan.split("\n").find((l) => l.startsWith("| F-257r |"));
    expect(f257r).toContain(String.raw`^/(login\|signup\|reset-password)(/\|$\|\?)`);
  });

  it("the whole-doc per-table census: every data row matches its header's cell count", () => {
    // The structural cure (the F-245c/F-249b tradition — pin the
    // invariant, not the enumeration): a data row whose unescaped
    // pipe count deviates from its table header's count splits cells
    // in GFM. The census walks every table in the seven-file doc set
    // and fails on any offender — future rows must escape their
    // in-cell pipes or update this pin with a stated reason.
    // Session-277 (R-74, F-277d) hardened the census on two gaps:
    // pipe-prefixed lines inside fenced code blocks are CODE, never
    // table rows (stripFences toggles the fence state at every fence
    // line and blanks the fenced lines before the walk), and
    // worklog.md — the seventh living doc — joins the DOCS list.
    const DOCS = [
      "docs/remediation_plan_v2.md",
      "README.md",
      "AGENTS.md",
      "CLAUDE.md",
      "wealth-os_SKILL.md",
      "Project_Architecture_Document.md",
      "worklog.md",
    ] as const;
    // Fence-awareness (F-277d): fence lines toggle the state; lines
    // inside a fence read as blanks to the walk.
    const stripFences = (text: string): string[] => {
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
    };
    const offenders: string[] = [];
    for (const rel of DOCS) {
      const lines = stripFences(read(rel));
      let headerCount: number | null = null;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i] as string;
        if (!line.startsWith("|")) {
          headerCount = null; // a table block ends
          continue;
        }
        if (/^\|[-| ]+\|$/.test(line)) continue; // the delimiter row
        const unescaped = line.replace(/\\\|/g, "").split("|").length - 1;
        if (headerCount === null) {
          headerCount = unescaped; // the block's first row is the header
          continue;
        }
        if (unescaped !== headerCount) {
          offenders.push(`${rel}:${i + 1} pipes=${unescaped} header=${headerCount}`);
        }
      }
    }
    expect(offenders, "the per-table pipe census over the doc set").toEqual([]);
  });
});

// ---- F-276c: the three open-state legs carry the modal-rationale comment -

describe("F-276c — the open-state trio carries the modal-rationale comment", () => {
  const spec = read("tests/e2e/a11y.spec.ts");
  const OPEN_LEGS = [
    "phone /Dashboard with the drawer OPEN",
    "desktop /Expenses with the Add Expense dialog OPEN",
    "desktop /Accounts DARK with the Add dialog OPEN",
  ] as const;
  // The comment's unique marker (the F-239f comment-wrapped form).
  const MARKER = "the helper is a no-op here today";

  it("each open-state leg carries the comment with the helper call", () => {
    for (const title of OPEN_LEGS) {
      const at = spec.indexOf(`test("${title}`);
      expect(at, `the leg: ${title}`).toBeGreaterThan(-1);
      const gate = spec.indexOf("assertTwoGate(await runAxe(page));", at);
      expect(gate, `the gate call in: ${title}`).toBeGreaterThan(at);
      const comment = spec.indexOf(MARKER, at);
      expect(
        comment,
        `the modal-rationale comment in: ${title}`,
      ).toBeGreaterThan(at);
      // The comment rides WITH the helper call — between the dialog
      // visibility assert and the gate, where a future tidy-up would
      // meet it before deleting the call.
      expect(comment).toBeLessThan(gate);
    }
  });

  it("the comment census: three sites (the R-72 ledger's claimed form)", () => {
    // The count-lockstep form: the parity-275 pins asserted only the
    // CALLS; this census watches the comment the ledger claimed — a
    // future leg that adds or drops one updates this pin in the same
    // commit.
    const calls = (spec.match(new RegExp(MARKER, "g")) ?? []).length;
    expect(calls).toBe(3);
  });

  it("the comment explains the mechanism (the modal scroller locks)", () => {
    // The phantom-cure cure is only complete when the comment carries
    // the WHY — the modal surfaces lock the main scroller, uniformity
    // by construction — not a bare marker. Whole-file containment (the
    // F-247e lesson: never window a pin narrower than the cure's own
    // shape); the phrases are unique to the comment.
    expect(normComment(spec)).toMatch(
      /the modal surfaces lock the main scroller/i,
    );
    expect(normComment(spec)).toContain("uniformity");
  });
});

// ---- F-276d: the api.ts docblock's fifteen-route census truth ------------

describe("F-276d — the body-ceiling docblock's family census", () => {
  const api = read("src/lib/api.ts");

  it("the census names the budgets pair and the FIFTEEN-route truth", () => {
    // The docblock is the seam's load-bearing record (the F-237b
    // docblock edition): the enumeration must name every route that
    // rides the default ceiling — the budgets POST and budgets DELETE
    // pair joined after the s73 count and was never re-counted.
    expect(normComment(api)).toContain("FIFTEEN routes");
    expect(normComment(api)).toContain("budgets POST");
    expect(normComment(api)).toContain("budgets DELETE");
  });

  it("the stale present-tense THIRTEEN census is gone", () => {
    // The historical narrative stays (the family WAS thirteen then);
    // the present-tense claim — the false form the census rode on —
    // must not survive. Comment-wrap normalized (the F-239f lesson:
    // the phrase spans a hard-wrapped docblock line — a raw-form
    // negative pin is vacuously green against the wrapped form).
    expect(normComment(api)).not.toContain("the family is THIRTEEN routes");
  });
});

// ---- F-276e: the AGENTS a11y line carries the floor pointer --------------

describe("F-276e — the AGENTS a11y contract line carries the floor pointer", () => {
  it("the contract site names the design target and the bespoke-pin register", () => {
    // The F-275c coverage-truth note lived only inside the spec
    // header; the contract site (where contributors read standing
    // rules) now carries the same truth in one line — the design
    // target is the design target, the 2.2-only criteria ride the
    // bespoke pins.
    const agents = read("AGENTS.md");
    const at = agents.indexOf("a11y: every page must stay axe-clean");
    expect(at, "the a11y contract line").toBeGreaterThan(-1);
    const line = agents.slice(at, at + 500);
    expect(norm(line)).toContain("the design target");
    expect(norm(line)).toContain("2.2-only criteria ride the bespoke hit-area pins");
    expect(norm(line)).toContain("a11y spec header note");
  });
});
