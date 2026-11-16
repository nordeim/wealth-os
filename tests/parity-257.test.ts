import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-257 (R-54): the source-tier pins for the stale-consumer,
// dead-arm, and glyph-citation round. Every pin was born RED over the
// pre-cure tree (the F-257 ledger rows in docs/remediation_plan_v2.md
// §2.15 carry the verified evidence). Source-scanning contracts per the
// house convention: read the file, assert the contract.
//
// The round's genus: comments claiming constructions or consumer sets
// the tree no longer (or never) carried — the R-53 token-citation genus
// generalized beyond color hexes, plus the dead-arm and dead-member
// retirements the F-229f re-entry rule already mandates.

function read(rel: string): string {
  return readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf8");
}

/** Whitespace-normalized containment (the s198 lesson — docblocks
 *  hard-wrap at ~80 cols; a pin that depends on the wrap fails on the
 *  next innocent reword). Comment-continuation asterisks are stripped
 *  first so a pinned phrase may span wrapped docblock lines. */
const norm = (s: string): string =>
  s.replace(/\n\s*\*\s?/g, " ").replace(/\s+/g, " ");

// ---- F-257m: the sidebar header names the live wifi pill -------------------

describe("F-257m — the sidebar header's Synced-pill glyph citation", () => {
  it("the header names the wifi pill (the live F-207h construction), not the retired check-mark glyph", () => {
    const src = read("src/components/layout/sidebar.tsx");
    expect(src).toContain("wifi Synced pill");
    expect(src).not.toContain("✓ Synced pill");
  });
});

// ---- F-257n: the login-card header names the live logo + buttons -----------

describe("F-257n — the login-card header's logo and social-button claims", () => {
  it("the header names the reference's own logo image asset, not the retired CSS construction", () => {
    const src = norm(read("src/components/layout/login-card.tsx"));
    expect(src).toContain("the reference's own logo image asset");
    expect(src).not.toContain("CSS brand mark");
  });

  it("the header names the four white social buttons, not the singular Google button", () => {
    const src = read("src/components/layout/login-card.tsx");
    const head = src.slice(0, src.indexOf("export function LoginCard"));
    expect(head).toContain("the four white social buttons");
    expect(head).not.toContain("white Google button");
  });
});

// ---- F-257o: the toast description carries no dead dark arm ----------------

describe("F-257o — the toast description's token-flip dead arm", () => {
  it("the description rides the muted token alone (the F-218l flip carries the dark theme)", () => {
    const src = read("src/components/ui/toast.tsx");
    // The retired arm overrode the dark description with the stone-400
    // value — byte-equal to the flipped muted token since F-218l, a
    // no-op whose only live effect is divergence on a future re-flip.
    expect(src).not.toContain("dark:text-stone-400");
  });
});

// ---- F-257p: BUTTON_BASE carries no dead radius member ---------------------

describe("F-257p — the BUTTON_BASE radius member retirement", () => {
  it("BUTTON_BASE carries only consumed members (focusRing + svgSize)", () => {
    const src = read("src/lib/page-layout.ts");
    const start = src.indexOf("export const BUTTON_BASE");
    expect(start).toBeGreaterThan(-1);
    const end = src.indexOf("} as const;", start);
    const block = src.slice(start, end);
    expect(block).toContain("focusRing");
    expect(block).toContain("svgSize");
    // The radius member never had a consumer (the cva base hardcodes the
    // six-pixel radius with its own Session-13 provenance); the F-229f
    // re-entry rule retires it rather than leaving an unwired constant.
    expect(block).not.toContain("rounded:");
  });
});

// ---- F-257q: the badge focus frame + the consumer truth --------------------

describe("F-257q — the badge focus frame and the consumer truth", () => {
  it("the five focus arms carry the focus-visible house form (the F-222g family)", () => {
    const src = read("src/components/ui/badge.tsx");
    expect(src).toContain(
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    );
    // The bare focus form painted the ring on mouse click too — the
    // divergence the F-252a/F-252f cures eliminated on every live
    // surface. (Substring-safe: the focus-visible forms never contain
    // the bare "focus:" forms.)
    expect(src).not.toContain("focus:outline-none");
    expect(src).not.toContain("focus:ring-2");
    expect(src).not.toContain("focus:ring-ring");
    expect(src).not.toContain("focus:ring-offset-2");
    expect(src).not.toContain("focus:ring-offset-background");
  });

  it("the focus-frame comment names the live settings consumers (the false zero-consumers claim retired)", () => {
    const src = read("src/components/ui/badge.tsx");
    const start = src.indexOf("Session-252 (R-49, F-252f)");
    expect(start).toBeGreaterThan(-1);
    const frame = src.slice(start, src.indexOf("variants[variant]"));
    // The settings page has rendered four+ Badges since the settings
    // glass round — the F-252f note's "zero consumers today" was false
    // at birth. The reworded note names the live consumers and the
    // latent-because-unfocusable truth (plain divs, no tabindex).
    expect(frame).toContain("settings");
    expect(frame).not.toContain("zero consumers today");
  });
});
