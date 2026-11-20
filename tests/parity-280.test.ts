import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-280 (R-77): the hyphen-required, whole-tree-net, and
// open-axe round's battery. Born honest RED against the v2.76.0 ship
// state — the source-pin legs pin forms the tree does not carry yet
// (the four loose delimiter predicates, the enumerated
// phantom-breakpoint net, the missing filters-card axe leg); the
// live-census legs and the shape matrix ride green-by-design from
// birth (the standing S49-P3 form).
//
// The round's three cures:
//   F-280a  all four census batteries' delimiter predicate gains the
//           hyphen-required cell form the cmark-gfm reference scanner
//           demands (a cell carrying no hyphen, or a colon inside the
//           hyphen run, renders NO table — the R-76 shape gains its
//           substance; verified against the reference scanner source
//           this round: the cell form is spaces, an optional edge
//           colon, a non-empty hyphen run, an optional edge colon,
//           spaces)
//   F-280k  the phantom-breakpoint net widens from the enumerated
//           fifteen-file set to the whole src tree (the F-207a genus
//           returning as a coverage hole, zero live offenders)
//   F-280j  the filters expansion card's OPEN state joins the a11y
//           two-gate's open-state family (the F-216f gap class's
//           open-state edition; the pre-flight ran the surface clean)

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

// Fence-awareness, the F-279c-hardened form (carried unchanged from
// the sibling batteries): a fence line at up to three leading spaces
// toggles the fence state; an indented fence line INSIDE an outer
// fence stays content unless its indent does not exceed the opener's.
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

// The delimiter-row shape a GFM table's second line must carry — the
// cmark-gfm reference scanner's cell form (session 280, R-77,
// F-280a): each cell is spaces, an optional edge colon, a NON-EMPTY
// hyphen run, an optional edge colon, spaces. A cell carrying no
// hyphen, or a colon inside the hyphen run, renders NO table on
// GitHub — the R-76 colon-tolerant shape gains its substance.
const isDelimiter = (l: string): boolean => /^\s*\|(\s*:?-+:?\s*\|)+\s*$/.test(l);

// The loose R-76 shape (retired by this round): the char class admits
// colon-only and all-space cells — the drift carrier the hardening
// closes. Kept here only as the live-census comparator.
const looseDelimiter = (l: string): boolean => /^\s*\|[\s:|-]+\|\s*$/.test(l);

// ---- F-280a: the hyphen-required cell form --------------------------------

describe("F-280a — the delimiter predicate requires a hyphen in every cell (the cmark-gfm shape)", () => {
  const HARDENED = "(\\s*:?-+:?\\s*\\|)+";

  it("the parity-276 delimiter predicate carries the hyphen-required cell form", () => {
    // The pre-cure predicate admits colon-only and all-space cells —
    // shapes GitHub never renders as tables. The source pin holds the
    // hardened form (a future revert to the loose char class fails
    // here).
    const census = read("tests/parity-276.test.ts");
    expect(census, "the hyphen-required cell form").toContain(HARDENED);
  });

  it("the parity-277 delimiter predicate carries the hyphen-required cell form", () => {
    const census = read("tests/parity-277.test.ts");
    expect(census, "the hyphen-required cell form").toContain(HARDENED);
  });

  it("the parity-278 delimiter predicate carries the hyphen-required cell form", () => {
    const census = read("tests/parity-278.test.ts");
    expect(census, "the hyphen-required cell form").toContain(HARDENED);
  });

  it("the parity-279 delimiter predicate carries the hyphen-required cell form", () => {
    const census = read("tests/parity-279.test.ts");
    expect(census, "the hyphen-required cell form").toContain(HARDENED);
  });

  it("the cmark-gfm cell matrix — hyphen-less and misplaced-colon rows are not delimiters", () => {
    // The behavioral contract of the reference scanner's cell form,
    // over the battery's own predicate (the matrix documents the
    // exact accept/reject boundary the four censuses now share).
    const cases: Array<[string, boolean]> = [
      ["|---|---|", true],
      ["| --- | --- |", true],
      ["| :---: | :---: |", true],
      ["|:--|--:|", true],
      ["| :-- | --: |", true],
      ["|---|", true],
      ["| :--- | ---: |", true],
      ["| : | : |", false], // cells with no hyphen — no table on GitHub
      ["|   |   |", false], // all-space cells
      ["| :-:-: | :-:-: |", false], // a colon inside the hyphen run
      ["| -- : |", false], // a space before the trailing colon
      ["| --- --- |", false], // a space inside a cell's hyphen run
    ];
    for (const [form, want] of cases) {
      expect(isDelimiter(form), `the shape of ${JSON.stringify(form)}`).toBe(want);
    }
    // The retired loose shape admits the two render-killing forms —
    // the drift this round closes, proven on the same matrix.
    expect(looseDelimiter("| : | : |")).toBe(true);
    expect(looseDelimiter("|   |   |")).toBe(true);
  });

  it("the live family census: no delimiter-shaped row lacks the hyphen-required form", () => {
    // The standing-from-birth live census over the curated family
    // (fences stripped, the walker this battery itself ships): zero
    // rows ride the loose-but-not-hardened gap today — the
    // driving-session audit census; the leg guards the genus for the
    // whole family.
    const offenders: string[] = [];
    for (const rel of FAMILY) {
      for (const line of stripFences(read(rel))) {
        if (looseDelimiter(line) && !isDelimiter(line)) {
          offenders.push(`${rel}: ${line}`);
        }
      }
    }
    expect(offenders, "the hyphen-less delimiter census over the curated family").toEqual([]);
  });
});

// ---- F-280k: the whole-tree phantom-breakpoint net -------------------------

describe("F-280k — the phantom-breakpoint net walks the whole src tree", () => {
  // The whole-tree source walk (this battery's own copy, the
  // parity-229 convention): every .ts/.tsx/.jsx/.css under src/, the
  // regenerated prisma client skipped.
  const walkSrc = (): string[] => {
    const out: string[] = [];
    const dive = (dir: string) => {
      for (const name of readdirSync(dir)) {
        if (name === "generated") continue; // the regenerated prisma client
        const full = path.join(dir, name);
        if (statSync(full).isDirectory()) dive(full);
        else if (/\.(ts|tsx|jsx|css)$/.test(name)) out.push(path.relative(ROOT, full));
      }
    };
    dive(path.join(ROOT, "src"));
    return out;
  };

  // The house source-scanning idiom (carried from shell-parity):
  // strip comments so the census matches CODE, not the documentation
  // that describes it.
  const codeOf = (rel: string): string =>
    read(rel)
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/^\s*\/\/.*$/gm, "");

  it("the shell-parity net carries the whole-tree walk (the walkSrcRel helper)", () => {
    // The pre-cure net enumerates fifteen files — the login card,
    // the reset screens, the guest redirect, the nav config, the
    // layout bridges, and the ui primitives sit outside it. The
    // source pin holds the walk's helper form (a future revert to an
    // enumerated list fails here).
    const spec = read("tests/shell-parity.test.ts");
    expect(spec, "the walk helper").toContain("walkSrcRel()");
    expect(spec, "the walk consults the helper").toContain("for (const rel of walkSrcRel())");
  });

  it("the whole-tree census: zero phantom variants across every src file", () => {
    // The live census at the widened scope (green-by-design: the
    // driving-session audit walked the same 116 files and found zero
    // — the coverage hole is the finding, not a live offender).
    const offenders: string[] = [];
    for (const rel of walkSrc()) {
      if (/\b(?:xs|2xs|3xs):/.test(codeOf(rel))) offenders.push(rel);
    }
    expect(offenders, "the whole-tree phantom-variant census").toEqual([]);
  });

  it("the walk's coverage is non-vacuous — the files the enumerated set missed are inside it", () => {
    // The F-244e non-vacuousness form: the widening must cover real
    // files the old fifteen-file net missed. Derived at test time
    // from the walk's own output, never enumerated by hand.
    const walked = walkSrc();
    for (const missed of [
      "src/components/layout/login-card.tsx",
      "src/components/layout/reset-password-screen.tsx",
      "src/components/layout/guest-login-redirect.tsx",
      "src/components/layout/nav-config.ts",
      "src/components/layout/theme.tsx",
      "src/components/ui/button.tsx",
      "src/app/(app)/Dashboard/page.jsx",
      "src/app/login/page.tsx",
    ]) {
      expect(walked, `the walk covers ${missed}`).toContain(missed);
    }
  });
});

// ---- F-280j: the filters card's open state rides the two-gate --------------

describe("F-280j — the filters expansion card's open state rides the a11y two-gate", () => {
  it("the a11y spec carries the filters-card open-state leg", () => {
    // The pre-cure open-state family covers three surfaces (the
    // drawer, the Add Expense dialog, the Accounts Add dialog); the
    // session-265 in-flow filters card is the fourth. The source pin
    // holds the leg's presence (the leg itself runs inside the e2e
    // battery — the surface was pre-flighted clean this round).
    const spec = read("tests/e2e/a11y.spec.ts");
    expect(spec, "the filters-card open-state leg").toContain("filters expansion card OPEN");
    expect(spec, "the leg asserts the card group").toContain(
      'getByRole("group", { name: "Expense filters" })',
    );
  });
});
