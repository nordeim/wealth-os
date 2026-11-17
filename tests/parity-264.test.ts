import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-264 (R-61): the source-tier pins for the muted-flip,
// sidebar-figure, and fallback-resolution round. Every cure leg was born
// RED over the pre-cure tree (the F-264 ledger rows in
// docs/remediation_plan_v2.md §2.22 carry the verified evidence — every
// challenged figure recomputed by the driving session in a second engine
// against the LIVE palette tokens, and the sidebar stack live-measured on
// the production artifact at the constrained viewport: brand 64 + nav 546
// + footer 119 = 729px).
//
// The round's genus: prose-truth cures (the muted-flip comment's unnamed
// pre-flip figures, the sidebar-content figure, the dialog-close
// rounding) plus a latent-fallback cure (the no-provider theme arm's
// system resolution) plus two letter-truth cures (the api.ts exception
// family completion, the AGENTS.md seed-exception amendment). No class
// strings change and no swept parity surface renders differently — the
// standing baselines hold by construction.
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
    .replace(/^[ \t]*(?:\/\/|\*|\{\/\*)[ \t]?/gm, "")
    .replace(/\s+/g, " ");

// ---- F-264a: the muted-flip comment names the color its figures describe --

describe("F-264a — the muted-flip comment names the unflipped color", () => {
  it("globals.css no longer cites the unflipped readings as the live token's", () => {
    // Pre-cure: "any future text-muted consumer on a dark surface would
    // compute under the 4.5:1 text bar — 4.13:1 … 3.91:1" — those are the
    // UNFLIPPED stone-500 readings (recomputed: 4.1267 / 3.9107); the
    // flipped #a8a29e the next line declares computes 7.85:1 / 7.44:1 on
    // the same pair (7.8503 / 7.4393). The comment read as if the flipped
    // token still failed the bar.
    const src = read("src/app/globals.css");
    expect(norm(src)).not.toContain("would compute under the 4.5:1 text bar");
    // The parity-229 bare-word net caught the first wording (a hyphenated
    // mode nickname parsed as a variant-prefixed utility — catch #11 of
    // its genus); the pin is named by its color, described in words.
    expect(norm(src)).toContain("UNFLIPPED stone-500 pin");
    expect(norm(src)).toContain("4.13:1 on the dark surface token");
    expect(norm(src)).toContain("3.91:1 on the dark page wash");
    expect(norm(src)).toContain("7.85:1 / 7.44:1");
  });

  it("the unflipped figures stay, now owned by their named color (the rider)", () => {
    // Green-by-design: the cure rewords, it never retires the figures —
    // they describe the unflipped pin and stay as its readings.
    const src = read("src/app/globals.css");
    expect(norm(src)).toContain("4.13:1");
    expect(norm(src)).toContain("3.91:1");
  });
});

// ---- F-264b: the sidebar-content figure trues to the live-measured stack ---

describe("F-264b — the sidebar-content figure trues to the live measurement", () => {
  it("page-layout cites the measured ≈730px stack (the ≈620px figure retired)", () => {
    // Live-measured on the production artifact at the constrained
    // viewport: brand 64 + nav content 546 + footer 119 = 729px; the box
    // model independently computes ≈726 (the 3px spread is sub-pixel
    // rounding). The cited ≈620px was unreachable under any line-height
    // assumption. The conclusion (the footer unreachable at 1024×600
    // without the overflow pair) holds a fortiori at 729.
    const src = read("src/lib/page-layout.ts");
    expect(src).not.toContain("≈620px");
    expect(norm(src)).toContain("≈730px (brand 64 + nav 546 + footer 119");
  });
});

// ---- F-264c: the dialog-close dark figure trues to the rounded form --------

describe("F-264c — the dialog-close dark figure trues to 2.60:1", () => {
  it("page-layout cites the rounded 2.60:1 (the truncated 2.59 retired)", () => {
    // stone-600 #57534e on the flipped dialog surface #0a0a0a computes
    // 2.595029 — 2.60:1 at two decimals (the pre-cure citation truncated
    // instead of rounding, in a figure a prior round itself trued).
    const src = read("src/lib/page-layout.ts");
    expect(norm(src)).toContain("DOWN to 2.60:1 in dark (stone-600 on the flipped surface");
    expect(src).not.toContain("2.59:1");
  });
});

// ---- F-264d: the no-provider fallback resolves the system arm --------------

describe("F-264d — the no-provider theme fallback resolves the system arm", () => {
  it("the fallback's setTheme routes through the module's applyTheme seam", () => {
    // Pre-cure: classList.toggle("dark", t === "dark") — the system arm
    // FORCED light instead of resolving prefers-color-scheme (latent only:
    // the provider is wired in the root layout). The cure routes the
    // fallback through applyTheme — the same resolution the provider's
    // own arm carries.
    const src = read("src/components/layout/theme.tsx");
    const fallback = src.match(/export function useTheme[\s\S]{0,900}/)?.[0] ?? "";
    expect(fallback).not.toContain('t === "dark");');
    expect(fallback).toContain("applyTheme(t)");
  });

  it("the real arm still routes through applyTheme (the standing carrier)", () => {
    const src = read("src/components/layout/theme.tsx");
    expect(src).toMatch(/const setTheme = React\.useCallback\(\(next: Theme\) => \{\s*setThemeState\(next\);\s*window\.localStorage\.setItem\(STORAGE_KEY, next\);\s*applyTheme\(next\);/);
  });
});

// ---- F-264e: the api.ts exception family is complete ------------------------

describe("F-264e — the api.ts comment names both non-envelope faces", () => {
  it("the no-store comment's exception family covers uploads AND export", () => {
    // Pre-cure: only the uploads GET was named as the non-envelope
    // member; the export GET (a raw JSON attachment consumed by a direct
    // anchor click — wrapping it in the envelope would break the
    // download) is the second member of the same family.
    const src = read("src/lib/api.ts");
    // Wrap-independent forms (the F-239f lesson: a comment-wrapped phrase
    // must not depend on where the wrap happens to fall — the first
    // authoring matched the OLD wrap's casing and tripped on the cure's
    // own rewrap).
    expect(norm(src)).toContain("exception family has TWO members");
    expect(norm(src)).toContain("uploads GET is NOT an envelope response");
    expect(norm(src)).toContain("export GET answers a raw JSON download");
  });
});

// ---- F-264f: the AGENTS.md letter names the seed script's exception ---------

describe("F-264f — the AGENTS.md raw-PrismaClient letter carries the seed exception", () => {
  it("the rule names prisma/seed.ts's standing exception and its seam", () => {
    // Pre-cure: the letter said "Never introduce a raw new PrismaClient()
    // outside src/lib/db" with no exception — but prisma/seed.ts
    // constructs one (the script seam; auth.ts is un-importable from the
    // bare script) through the shared runtime db seam, which closes the
    // mirror-db risk the rule exists for. The letter and the code
    // diverged; the letter now names the exception.
    const src = read("AGENTS.md");
    expect(src).toContain("Never introduce a raw");
    expect(src).toContain("prisma/seed.ts");
    expect(src).toContain("runtimeDatabaseUrl()");
  });
});
