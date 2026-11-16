import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-262 (R-59): the source-tier pins for the description-length,
// muted-figure, and citation-completion round. Every cure leg was born
// RED over the pre-cure tree (the F-262 ledger rows in
// docs/remediation_plan_v2.md §2.20 carry the verified evidence — the
// whole-tree sweeps bounded each genus: six description-length carriers
// across four files, two muted-figure carriers, one dialog-close
// carrier, one badge carrier, one chip-range carrier, one route-naming
// carrier, one extractor-parenthetical carrier, two soft-figure
// carriers; every figure recomputed by code in two independent
// engines against the live palette).
//
// The round's genus: CITATION AND PROSE TRUTH, not behavior — the
// rendered construction (the class strings, the components, the
// runtime seams) is unchanged by every cure; the pins therefore assert
// the prose cites the figures the palette actually computes and the
// description length the tree actually serves.
//
// Prose pins hard-wrap and ride comment-line prefixes: containment runs
// over the comment-stripped, whitespace-normalized form (the F-239f
// lesson — a comment-wrapped phrase needs comment-stripped matching, or
// the pin depends on where the wrap happens to fall).

function read(rel: string): string {
  return readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf8");
}

const norm = (s: string): string =>
  s
    .replace(/^[ \t]*(?:\/\/|\*)[ \t]?/gm, "")
    .replace(/\s+/g, " ");

// ---- F-262a: the description-length citation genus ---------------------------

describe("F-262a — the description-length citations true to the served 314", () => {
  it("site.ts cites the measured length (no 405-char claims; the 314 form present)", () => {
    const src = read("src/lib/site.ts");
    expect(src).not.toContain("405");
    expect(norm(src)).toContain("mirrored verbatim (314 chars)");
    expect(norm(src)).toContain("the 314-char root paragraph");
  });

  it("the root layout and the login page cite the measured length", () => {
    const layout = read("src/app/layout.tsx");
    expect(layout).not.toContain("405");
    expect(norm(layout)).toContain("the reference's 314-char description paragraph");
    const login = read("src/app/login/page.tsx");
    expect(login).not.toContain("405");
    expect(norm(login)).toContain("the plain 314-char description");
  });

  it("the pwa-metadata test comments cite the measured length (the genus's test-file carriers)", () => {
    const src = read("tests/pwa-metadata.test.ts");
    expect(src).not.toContain("405");
    expect(norm(src)).toContain("the same 314-char description");
    expect(norm(src)).toContain("the 314-char paragraph");
  });

  it("the metadata pin already asserts the served length (the green-by-design rider)", () => {
    // The tree's own length pin — the stale citations contradicted it;
    // this rider keeps the two honest forms in one battery.
    const src = read("tests/metadata.test.ts");
    expect(src).toContain("toHaveLength(314)");
  });
});

// ---- F-262b: the muted-token flip's figure -----------------------------------

describe("F-262b — the muted-flip figures true to the computed span", () => {
  it("globals.css cites the computed span (the 2.9 claim retired; 4.13 present)", () => {
    const src = read("src/app/globals.css");
    expect(src).not.toContain("2.9:1");
    expect(norm(src)).toContain("4.13:1 on the dark surface token");
    expect(norm(src)).toContain("3.91:1 on the dark page wash");
  });

  it("the dark-tokens test comment carries the trued span (the genus's test-file carrier)", () => {
    const src = read("tests/dark-tokens.test.ts");
    expect(src).not.toContain("2.9:1");
    expect(norm(src)).toContain("4.13:1 on the flipped surface token");
  });
});

// ---- F-262c: the dialog-close figure ------------------------------------------

describe("F-262c — the dialog-close figure trues to the surface pairing", () => {
  it("page-layout cites 2.59:1 for the dark hover pair (the retired page-wash figure gone)", () => {
    const src = read("src/lib/page-layout.ts");
    expect(src).not.toContain("2.47:1");
    expect(norm(src)).toContain("DOWN to 2.59:1 in dark (stone-600 on the flipped surface");
  });
});

// ---- F-262d: the badge comment's pair figure ----------------------------------

describe("F-262d — the badge comment cites its own pair's figure", () => {
  it("badge.tsx cites 3.61:1 for the neutral-50 pair (the white family's figure retired here)", () => {
    const src = read("src/components/ui/badge.tsx");
    expect(src).not.toContain("3.76:1");
    expect(norm(src)).toContain("--color-danger #ef4444 = 3.61:1 at badge text sizes");
  });

  it("the white family's 3.76:1 figures stay at their correct carriers (the sibling-safety rider)", () => {
    // button/toast/dropdown/page-parts cite white-on-danger or
    // danger-on-white pairs where 3.76:1 is the computed value — the
    // badge was the one mis-attributed instance, not the family.
    expect(read("src/components/ui/button.tsx")).toContain("3.76:1");
    expect(read("src/components/ui/toast.tsx")).toContain("3.76:1");
    expect(read("src/components/ui/dropdown.tsx")).toContain("3.76:1");
    expect(read("src/components/shared/page-parts.tsx")).toContain("3.76:1");
  });
});

// ---- F-262e: the investment-chip range ----------------------------------------

describe("F-262e — the chip range trues to the per-type computation", () => {
  it("constants.ts cites the computed span (1.99–3.50 with the neutral fallback named)", () => {
    const src = read("src/lib/constants.ts");
    expect(norm(src)).not.toContain("2.1–3.7:1");
    expect(norm(src)).toContain("renders 1.99–3.50:1 as text-xs on its own 10% tint");
    expect(norm(src)).toContain("the neutral fallback computes 4.25:1");
  });
});

// ---- F-262f: the site seam's route naming --------------------------------------

describe("F-262f — the site seam's header names the live route handlers", () => {
  it("site.ts names the sitemap/robots/manifest route handlers (the retired file paths gone)", () => {
    const src = read("src/lib/site.ts");
    expect(src).not.toContain("app/sitemap.ts");
    expect(src).not.toContain("app/robots.ts");
    expect(norm(src)).toContain(
      "the sitemap.xml / robots.txt / manifest.json route handlers",
    );
  });
});

// ---- F-262g: the globals.css extractor parenthetical ----------------------------

describe("F-262g — the extractor parenthetical drops the false mechanism claim", () => {
  it("globals.css states the convention, not the false stylesheet-scan mechanism", () => {
    const src = read("src/app/globals.css");
    expect(src).not.toContain("scans stylesheets");
    expect(norm(src)).toContain("does not scan stylesheets in the current toolchain");
  });
});

// ---- F-262h: the two soft figures -----------------------------------------------

describe("F-262h — the soft figures true (the pill's two tokens named separately)", () => {
  it("page-layout names the pill's text and border figures separately (10.04 and 5.31)", () => {
    const src = read("src/lib/page-layout.ts");
    expect(norm(src)).not.toContain("green-400/green-600 compute 10.04:1");
    expect(norm(src)).toContain("green-400 computes 10.04:1");
    expect(norm(src)).toContain("green-600 border computes 5.31:1");
  });

  it("page-parts' gradient register cites ≈ 1.7:1 for the white/60 label", () => {
    const src = read("src/components/shared/page-parts.tsx");
    expect(norm(src)).not.toContain("text-white/60 ≈ 1.6:1");
    expect(norm(src)).toContain("text-white/60 ≈ 1.7:1");
  });
});
