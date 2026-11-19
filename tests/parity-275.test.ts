import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-275 (R-72): the docblock-tail, pipe-truth, and gate-coverage
// round's battery. Born honest RED against the v2.71.0 ship state — every
// leg pins a false or missing form that rides the tree at HEAD (the
// F-229e authoring tradition: the pin holds the CONTENT, never the wrap —
// all containment rides the whitespace-normalized form).
//
// The round's five cures:
//   F-275a  the DialogHeader docblock's opacity tail reworded to the
//           mechanism truth (the F-274b genus one file over)
//   F-275b  the PAD §7.1 domain-seams row's pipes escaped (F-247i genus)
//   F-275c  the a11y spec header's coverage-truth note
//   F-275d  the three open-state a11y legs gain the scroll helper
//   F-275e  the AGENTS F-217a entry's genus-retirement cross-ref

const ROOT = path.resolve(import.meta.dirname, "..");
const read = (rel: string): string => readFileSync(path.join(ROOT, rel), "utf-8");
const norm = (s: string): string => s.replace(/\s+/g, " ");
// The F-239f comment-wrapped-phrase doctrine: a phrase spanning a
// hard-wrapped comment line carries the "//" prefix after plain
// normalization — strip the line-comment markers first.
const normComment = (s: string): string =>
  norm(s.replace(/^[ \t]*\/\/[ \t]*/gm, " "));

// ---- F-275a: the DialogHeader docblock's mechanism truth ------------------

describe("F-275a — the DialogHeader docblock carries the close-X mechanism truth", () => {
  const src = read("src/components/ui/dialog.tsx");

  it("the false opacity-pattern tail is gone (the F-221l retirement)", () => {
    expect(norm(src)).not.toContain("the X is the opacity pattern");
  });

  it("the docblock cites the F-221l contrast cure for the close X", () => {
    // The truth marker: the docblock names the cure that retired the
    // dimming, so a reader restoring "the pattern" meets the citation
    // first. DIALOG_CLOSE's own comment (page-layout.ts) carries the
    // measured ratios; the header's parenthetical now agrees with it.
    // (The marker-stripped form: the citation spans a wrapped comment
    // line — the s198/F-239f lesson.)
    expect(normComment(src)).toContain("the F-221l contrast cure");
    expect(normComment(src)).toMatch(/full[- ]opacity/i);
  });
});

// ---- F-275b: the PAD §7.1 domain-seams row's escaped pipes ----------------

describe("F-275b — the PAD domain-seams row escapes its in-cell pipes", () => {
  const pad = read("Project_Architecture_Document.md");

  it("the code span rides the escaped-pipe form (the row renders five columns)", () => {
    // The F-247i doctrine: a pipe inside a markdown table cell — even
    // inside a code span — splits the row unless it rides the backslash
    // escape. The location cell's four-file list must carry the escaped
    // form; the arithmetic leg (docs-counts) matches only the leading
    // cells, so THIS pin is the row's render-truth guard.
    const row = pad
      .split("\n")
      .find((l) => l.startsWith("| — domain seams |"));
    expect(row, "the domain-seams row").toBeDefined();
    expect(row).toContain(String.raw`tests/finance\|ai\|schemas-finance\|verification-code.test.ts`);
    // The raw unescaped form must not survive anywhere in the row.
    expect(row).not.toMatch(/finance\|ai\|schemas/);
  });
});

// ---- F-275c: the a11y spec header's coverage truth ------------------------

describe("F-275c — the a11y spec header names what the blanket gate evaluates", () => {
  const spec = read("tests/e2e/a11y.spec.ts");

  it("the coverage note rides the header (the default-enabled set + the 2.2 register)", () => {
    // The blanket run carries no runOnly, so it evaluates the engine's
    // default-enabled set (the WCAG 2.0/2.1 A and AA rules); the 2.2-only
    // target-size criterion ships disabled in axe-core and rides the
    // bespoke hit-area pins. The note is the claim-vs-mechanism bridge the
    // doc set's "WCAG 2.2 AA" design target needs to stay honest.
    const header = norm(spec.slice(0, spec.indexOf("const AXE_PATH")));
    expect(header).toContain("F-275c");
    expect(header).toMatch(/default-enabled/i);
    expect(header).toMatch(/target[- ]size/i);
    expect(header).toMatch(/bespoke/i);
  });
});

// ---- F-275d: the three open-state legs carry the scroll helper ------------

describe("F-275d — every axe leg scrolls first, the open-state trio included", () => {
  const spec = read("tests/e2e/a11y.spec.ts");
  const OPEN_LEGS = [
    "phone /Dashboard with the drawer OPEN",
    "desktop /Expenses with the Add Expense dialog OPEN",
    "desktop /Accounts DARK with the Add dialog OPEN",
  ] as const;

  it("each open-state leg calls the helper before the gate", () => {
    for (const title of OPEN_LEGS) {
      const at = spec.indexOf(`test("${title}`);
      expect(at, `the leg: ${title}`).toBeGreaterThan(-1);
      const gate = spec.indexOf("assertTwoGate(await runAxe(page));", at);
      expect(gate, `the gate call in: ${title}`).toBeGreaterThan(at);
      const scroll = spec.indexOf("await scrollThrough(page);", at);
      expect(
        scroll,
        `the scroll call in: ${title} (the F-221f letter: before every axe run)`,
      ).toBeGreaterThan(at);
      expect(scroll).toBeLessThan(gate);
    }
  });

  it("the source-site census: 13 helper calls (10 standing + the open-state trio)", () => {
    // The count-lockstep form: a future leg that adds or drops a call
    // updates this pin in the same commit. The loops expand the 13 source
    // sites into the 47 runtime legs (the section loops + the trio).
    const calls = (spec.match(/await scrollThrough\(page\);/g) ?? []).length;
    expect(calls).toBe(13);
  });
});

// ---- F-275e: the AGENTS F-217a entry's genus-retirement cross-ref ---------

describe("F-275e — the AGENTS F-217a entry names the genus retirement", () => {
  it("the gotcha carries the F-265b cross-ref (the lesson binds portaled surfaces)", () => {
    const agents = read("AGENTS.md");
    // Anchor on the entry's unique opening (the F-247e window lesson:
    // the pre-cure "F-217a):" form the original pin targeted is itself
    // rewritten by the cure — the window must ride through the cure's
    // own shape).
    const at = agents.indexOf("A DOM-scoped outside-close listener fires on PORTALED Radix");
    expect(at, "the F-217a entry").toBeGreaterThan(-1);
    // The cross-ref lands inside the entry's opening (before the mechanism
    // prose), so a reader meets the retirement before the guards.
    const opening = agents.slice(at, at + 400);
    expect(norm(opening)).toContain("F-265b");
  });
});
