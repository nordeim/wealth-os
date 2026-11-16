import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import * as path from "node:path";

// Session-256 (R-53): the token-citation, header-block, and
// prose-truth round's source pins. The round's verified genus: the
// session-199 stone rebrand moved the palette one step off the
// CRM-era neutral pins, and the older construction-claim header
// blocks in the UI primitives (the Session-12/13/82 lineage — the
// R-52 docblock sweep's consumer-rhythm focus never reached them)
// still cite the pre-rebrand geometry and values as present-tense
// truth: the Button header's one-pixel near-black ring (the live
// arm is the shared two-pixel token-keyed ring at the stone pair),
// the Tabs Session-12 block's three falsifiable claims (the
// muted-ink track no track carries, the bare default shadow the
// live pill never rode, the no-hover claim the underline variant
// breaks), the Dialog title's "inherited" neutral foreground (the
// live constant is the explicit stone pair), the Dialog
// description's cross-app token equality (ours is one step off the
// cited hex), and — found by the driving session's whole-tree
// sweep, the F-228b lesson recurring — the Select and Dropdown
// computed-equal citations riding the reference's neutral hex on
// OUR token names. The structural rider (F-256e) closes the genus's
// gate gap: the standing nets watch class-shaped CARRIERS, never
// VALUE truth — this battery derives the palette from globals.css
// at test time and fails on any comment citing a --color token at
// a hex the token no longer holds, so the next rebrand fails the
// unit gate instead of silently re-staling the prose. Every leg was
// born RED over the pre-cure tree.

const read = (p: string) => readFileSync(p, "utf8");

const sliceFrom = (src: string, startMark: string, endMark: string) => {
  const start = src.indexOf(startMark);
  expect(start).toBeGreaterThan(-1);
  const end = src.indexOf(endMark, start);
  expect(end).toBeGreaterThan(-1);
  return src.slice(start, end);
};

// ---- F-256a: the Button header's focus-ring claims -------------------------

describe("F-256a — the Button header names the live focus-ring arm", () => {
  it("the two-pixel token-keyed ring with the stone pair; the neutral-era claims gone", () => {
    const src = read("src/components/ui/button.tsx");
    const head = sliceFrom(src, "Session-82", "const buttonVariants");
    // The CRM-era header claimed a one-pixel near-black ring keyed to
    // the neutral ink value. The live arm is the shared two-pixel
    // token-keyed focus ring (BUTTON_BASE.focusRing) whose token is
    // the stone pair — a reader auditing focus appearance (WCAG
    // 2.4.13) or contrast must meet the live geometry, not the
    // pre-rebrand citation.
    expect(head).not.toContain("1px near-black");
    expect(head).not.toContain("#0a0a0a");
    expect(head).toContain("--color-ring = #1c1917");
    expect(head).toContain("#f5f5f4");
  });
});

// ---- F-256b: the Tabs Session-12 header block -------------------------------

describe("F-256b — the Tabs Session-12 block describes the shipped construction", () => {
  it("the stone track ink, the small-shadow pill, and the underline hover pair — the falsified claims gone", () => {
    const src = read("src/components/ui/tabs.tsx");
    const block = sliceFrom(src, "Session-12 (S12-P4", "Session-23 (S23-P1");
    // Three present-tense claims were falsified at HEAD: the track
    // ink (the stone-600 pair since the session-199 AA re-pin, never
    // the muted token), the active pill (the small-shadow step,
    // never the bare default), and the hover story (the segmented
    // triggers ship none, but the underline variant's inactive arm
    // carries the border and ink hover pair). A reader implementing
    // a new variant from this block must meet the shipped form.
    expect(block).not.toContain("text-muted-ink");
    expect(block).not.toContain("the bare `shadow`");
    expect(block).not.toContain("NO hover classes");
    expect(block).toContain("stone-600");
    expect(block).toContain("shadow-sm");
    expect(block).toContain("hover");
  });
});

// ---- F-256c: the Dialog title and description citations ---------------------

describe("F-256c — the Dialog title and description carry the live ink", () => {
  it("the explicit stone title pair named; the inherited-neutral and cross-app equality claims gone", () => {
    const src = read("src/components/ui/dialog.tsx");
    // The title's stock string cites the reference dump (a true
    // decode) but claimed OUR title inherits the neutral foreground
    // — the live constant carries the explicit stone pair. The
    // description equated the reference's muted hex with OUR
    // muted-ink token; ours is the stone value, one step off the
    // cited neutral pin.
    expect(src).not.toContain("inheriting the");
    expect(src).not.toContain("= our muted-ink token");
    expect(src).toContain("stone-900");
    expect(src).toContain("#78716c");
  });
});

// ---- F-256d: the Select and Dropdown computed-equal citations ---------------

describe("F-256d — the Select and Dropdown equality citations match the live palette", () => {
  it("the Select header's trio and wash arm carry the stone values, not the neutral-era hex", () => {
    const src = read("src/components/ui/select.tsx");
    // The header's "all verified" line claimed computed-equality
    // with the reference's neutral popover trio on both apps — two
    // of three false since the rebrand. The wash arm's citation
    // rode the reference's neutral line-soft hex on our token's
    // name. Both keep the reference decodes as dated history with
    // correct attribution while carrying OUR stone values.
    expect(src).not.toContain("all verified: #e5e5e5");
    expect(src).not.toContain("#f5f5f5 = its accent");
    expect(src).toContain("#e7e5e4");
    expect(src).toContain("#f5f5f4");
  });

  it("the Dropdown header's line token carries the stone value", () => {
    const src = read("src/components/ui/dropdown.tsx");
    expect(src).not.toContain("--color-line #e5e5e5");
    expect(src).toContain("--color-line #e7e5e4");
  });
});

// ---- F-256e: the token-citation truth leg (the structural rider) ------------

describe("F-256e — the token-citation truth leg (the genus's gate)", () => {
  it("every --color-NAME hex citation in src comments matches a live palette entry", () => {
    // Derive the palette from globals.css at TEST TIME — both the
    // light @theme block and the .dark overrides contribute values.
    // A comment may cite a token at either of its live values.
    const css = read("src/app/globals.css");
    const palette = new Map<string, Set<string>>();
    for (const m of css.matchAll(/--color-([a-z-]+):\s*(#[0-9a-fA-F]{6})/g)) {
      if (!palette.has(m[1])) palette.set(m[1], new Set());
      palette.get(m[1])!.add(m[2].toLowerCase());
    }
    expect(palette.size).toBeGreaterThan(20);

    // Walk src (the generated prisma client excluded), extract
    // comment text (line + block forms), and collect every
    // --color-NAME citation followed by a hex value. The tempered
    // window cannot cross a sibling --color- token, so a sentence
    // citing two tokens attributes each hex to its own name.
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        if (e.name === "generated") continue;
        const p = path.join(dir, e.name);
        if (e.isDirectory()) {
          walk(p);
          continue;
        }
        if (!/\.(ts|tsx)$/.test(e.name)) continue;
        const src = read(p);
        const comments = [
          ...src.matchAll(/\/\/[^\n]*/g),
          ...src.matchAll(/\/\*[\s\S]*?\*\//g),
        ].map((m) => m[0]);
        const text = comments.join("\n");
        for (const m of text.matchAll(
          /--color-([a-z-]+)(?:(?!--color-)[^#\n]){0,60}?(#[0-9a-fA-F]{6})/g,
        )) {
          const values = palette.get(m[1]);
          if (!values || !values.has(m[2].toLowerCase())) {
            offenders.push(
              `${p}: --color-${m[1]} ${m[2]} (live: ${[...(values ?? [])].join(" ") || "none"})`,
            );
          }
        }
      }
    };
    walk("src");
    expect(
      offenders,
      "comments citing a --color token at a hex it no longer holds " +
        "(reword the citation or re-derive the value — the F-229d " +
        "discipline: describe, never re-cite a stale value):\n  " +
        offenders.join("\n  "),
    ).toEqual([]);
  });
});
