import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-258 (R-55): the source-tier pins for the citation-math,
// input-flip, and render-cap round. Every src leg was born RED over the
// pre-cure tree (the F-258 ledger rows in docs/remediation_plan_v2.md
// §2.16 carry the verified evidence; every contrast figure recomputed
// by code against the pinned palette before the cure was designed).
// Source-scanning contracts per the house convention: read the file,
// assert the contract.
//
// The round's genus: MEASUREMENT-TRUTH DRIFT — comments citing
// contrast figures that do not compute on the pinned palette (the
// F-256e token-citation genus's ratio edition: the hex citations were
// pinned, the math citations were not), plus the input-flip dead arms
// (the F-252g genus), the stale consumer-truth tail (F-257m/n genus),
// and the one unbounded render (the render-cap cure).
//
// The F-258i leg is the structural rider: the §5 execution-history
// table's two-block ordering contract (head newest-first, tail
// chronological, no duplicates). It was born GREEN by design — the
// F-215b precedent: the cure landed with the plan's own lockstep
// edits in this same commit; the RED was demonstrated against the
// shipped tree at 9ad69e1 (the session narrative records the
// head-block slip v2.53.0→v2.54.0→v2.52.0 and the tail-block
// v2.24/v2.23 swap, both failing this leg's assertions there).

function read(rel: string): string {
  return readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf8");
}

/** Whitespace-normalized containment (the s198 lesson — docblocks
 *  hard-wrap at ~80 cols; a pin that depends on the wrap fails on the
 *  next innocent reword). Comment-continuation asterisks AND
 *  slash-slash prefixes are stripped first so a pinned phrase may span
 *  wrapped docblock or line-comment lines. */
const norm = (s: string): string =>
  s
    .replace(/\n\s*\*\s?/g, " ")
    .replace(/\n\s*\/\/\s?/g, " ")
    .replace(/\s+/g, " ");

// ---- F-258a: the impossible 4.95:1 citations trued --------------------------

describe("F-258a — the stone-500 citations compute on their surfaces", () => {
  it("DIALOG_CLOSE names 4.80:1 on the white dialog card (4.95:1 is unreachable on ANY surface)", () => {
    const src = read("src/lib/page-layout.ts");
    // WCAG math caps stone-500 (#78716c) at 4.80:1 against pure white —
    // the lightest background there is; the old note's 4.95:1 could not
    // compute anywhere. The dialog card is white.
    expect(src).toContain("stone-500 computes 4.80:1 on the white dialog card");
    expect(src).not.toContain("4.95:1");
  });

  it("the settings switch note names 4.75:1 on the white/80 card", () => {
    const src = read("src/app/(app)/settings/page.tsx");
    // The row card is white/80 over the #faf9f7 wash (≈ #fefefd) —
    // stone-500 on it computes 4.75:1, not the note's old 4.95:1.
    expect(src).toContain("stone-500 border computes 4.75:1");
    expect(src).not.toContain("4.95:1");
  });
});

// ---- F-258b: the .dark .input-base dead arms retired -------------------------

describe("F-258b — the .dark input-base carries only the live override", () => {
  it("the block carries border-color alone (the ink token flips carry color and placeholder)", () => {
    const css = read("src/app/globals.css");
    const start = css.indexOf(".dark .input-base {");
    expect(start).toBeGreaterThan(-1);
    const block = css.slice(start, css.indexOf("\n}", start));
    // The retired arms duplicated the .dark flips of --color-ink
    // (#f5f5f4) and --color-muted-ink (#a8a29e) byte-for-byte; the
    // unlayered block beat the utilities layer, so a future token edit
    // would silently never reach the native date inputs (the F-252g
    // genus). The token flips carry both arms now.
    expect(block).toContain("border-color: rgba(255, 255, 255, 0.1)");
    expect(block).not.toContain("color: #f5f5f4");
    expect(block).not.toContain("color: #a8a29e");
    expect(block).not.toMatch(/&::placeholder/);
  });

  it("the .dark token comment names the token-carried truth (the precedent framing retired)", () => {
    const css = norm(read("src/app/globals.css"));
    expect(css).not.toContain("follow the existing `.dark .input-base` precedent");
  });

  it("the palette-pins twin carries the reworded framing", () => {
    const pin = norm(read("tests/palette-pins.test.ts"));
    // norm(): the twin's phrase hard-wraps at ~80 cols (the s198
    // lesson — a raw-containment pin would pass vacuously).
    expect(pin).not.toContain("follow the existing .dark .input-base precedent");
  });
});

// ---- F-258c: the QUICK_PICK citation names the live truth -------------------

describe("F-258c — the income-chip retirement note carries no phantom constant", () => {
  it("the note names the live dialog (Selects over the source-type maps, no chips)", () => {
    const src = read("src/lib/constants.ts");
    // The old note justified the retirement with "the income dialog's
    // chips ride QUICK_PICK's income arm" — QUICK_PICK exists nowhere
    // in the tree and the live dialog renders no chips at all.
    expect(src).not.toContain("QUICK_PICK");
    const start = src.indexOf("F-229f");
    expect(start).toBeGreaterThan(-1);
    const note = src.slice(start, src.indexOf("Reintroduce WITH a consumer", start));
    expect(note).toContain("no chips");
    expect(note).toContain("INCOME_SOURCE_TYPES");
  });
});

// ---- F-258d: the import reassurance glyph rides the F-221m pair -------------

describe("F-258d — the import reassurance glyph steps to the F-221m pair", () => {
  it("the CheckCircle2 carries emerald-600/400 (not the retired emerald-500)", () => {
    const src = read("src/app/(app)/import/page.tsx");
    const line = src.match(/<CheckCircle2[^/]*\/>/)?.[0] ?? "";
    // The toast's identical success glyph (toast.tsx, F-221m) rides the
    // 3.77:1 pair; this site kept the old 2.54:1 step through the cure.
    expect(line, `the glyph line not found in: ${src.length} chars`).toBeTruthy();
    expect(line).toContain("text-emerald-600 dark:text-emerald-400");
    expect(line).not.toContain("text-emerald-500");
  });
});

// ---- F-258e: the expenses render cap + rider ---------------------------------

describe("F-258e — the expenses history renders bounded", () => {
  it("the visible list renders through a named cap (the import preview's own pattern)", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toContain("HISTORY_RENDER_CAP");
    expect(src).toMatch(/visible\.slice\(0, HISTORY_RENDER_CAP\)\.map/);
  });

  it("the rider names the truncation and the escape hatch", () => {
    const src = norm(read("src/app/(app)/expenses/page.tsx"));
    expect(src).toContain("Showing the first");
    expect(src).toContain("refine the search or filters to narrow the list");
    // The cap only guards the render — the count stays honest.
    expect(src).toMatch(/visible\.length > HISTORY_RENDER_CAP/);
  });
});

// ---- F-258f: the mobile-header pill named for the live glyph ----------------

describe("F-258f — the mobile-header docblock names the wifi pill", () => {
  it("the pill is named through the live glyph (the check-mark form retired to history)", () => {
    const src = read("src/components/layout/mobile-header.tsx");
    expect(src).not.toContain("✓→wifi");
    expect(src).toContain("wifi Synced pill");
  });
});

// ---- F-258g: the avatar prose names luma -------------------------------------

describe("F-258g — the avatar ink prose names the actual formula", () => {
  it("perceptual luma (gamma-encoded), not relative luminance", () => {
    const src = read("src/components/ui/avatar.tsx");
    expect(src).toContain("perceptual luma");
    expect(src).not.toContain("relative luminance");
  });
});

// ---- F-258h: the ratio-citation family trued ---------------------------------

describe("F-258h — every cited ratio computes on the pinned palette", () => {
  it("the toast icon note: emerald-600 3.77:1, amber-700 5.02:1 (on the white surface card)", () => {
    const src = read("src/components/ui/toast.tsx");
    expect(src).toContain("emerald-600 = 3.77:1");
    expect(src).toContain("amber-700 = 5.02:1");
    expect(src).not.toContain("3.66:1");
    expect(src).not.toContain("4.83:1");
  });

  it("the toast-anatomy pin's twin prose carries the trued pair", () => {
    const pin = read("tests/toast-anatomy.test.ts");
    expect(pin).toContain("emerald-600 3.77:1");
    expect(pin).toContain("amber-700 5.02:1");
    expect(pin).not.toContain("3.66:1");
    expect(pin).not.toContain("4.83:1");
  });

  it("the tabs underline note: amber-600 border 3.19:1, amber-700 ink 5.02:1", () => {
    const src = norm(read("src/components/ui/tabs.tsx"));
    expect(src).toContain("amber-600 border 3.19:1");
    expect(src).toContain("amber-700 ink 5.02:1");
    expect(src).not.toContain("3.21:1");
  });

  it("the tabs header: stone-500 computed 4.40:1 on the stone-100 track", () => {
    const src = read("src/components/ui/tabs.tsx");
    expect(src).toContain("stone-500 computed 4.40:1 on the stone-100 track");
    expect(src).not.toContain("4.0:1");
  });

  it("the segmented note: stone-600 6.99:1, stone-500 4.40:1 on the stone-100 track", () => {
    const src = norm(read("src/lib/page-layout.ts"));
    expect(src).toContain("stone-600 (6.99:1 on the stone-100 track");
    expect(src).toContain("stone-500 computed 4.40:1 and failed the two-gate");
    expect(src).not.toContain("5.4:1");
  });

  it("the import income note: emerald-700 computes 3.19:1 on the dark stone-900 tbody", () => {
    const src = read("src/app/(app)/import/page.tsx");
    expect(src).toContain("computed 3.19:1");
    expect(src).not.toContain("3.15:1");
  });
});

// ---- F-258i: the §5 execution-history ordering contract (structural) --------

describe("F-258i — the §5 execution-history table's two-block ordering", () => {
  it("the head block is newest-first, the tail block chronological, no duplicates", () => {
    const plan = read("docs/remediation_plan_v2.md");
    const s5 = plan.indexOf("## 5. Execution history");
    expect(s5).toBeGreaterThan(-1);
    const section = plan.slice(s5);
    const rows = [...section.matchAll(/^\| v2\.(\d+)\.0 \|/gm)].map((m) =>
      Number(m[1]),
    );
    expect(rows.length).toBeGreaterThan(20);
    // No version appears twice (the parity-254 no-duplicate rule,
    // restated where the ordering contract lives).
    expect(new Set(rows).size, "duplicated version rows").toBe(rows.length);
    // The table's two-block structure: the recent rounds head-first
    // (newest at the top), then the v2.0.0-era chronological tail.
    const tailStart = rows.indexOf(0);
    expect(tailStart).toBeGreaterThan(0);
    const head = rows.slice(0, tailStart);
    const tail = rows.slice(tailStart);
    expect(head, "the head block must be strictly descending").toEqual(
      [...head].sort((a, b) => b - a),
    );
    expect(tail, "the tail block must be strictly ascending").toEqual(
      [...tail].sort((a, b) => a - b),
    );
    // The newest round sits at the very head — the slot the session-257
    // lockstep missed by one.
    expect(rows[0]).toBe(Math.max(...rows));
  });
});
