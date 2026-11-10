import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-217 (R-14, F-217c — the dark-mode token completion pin): the
// `.dark` block flipped the shadcn neutral set (R-11) but never the
// seven app-native tokens — so every dialog (DIALOG_CONTENT.base =
// bg-surface), the Select listbox, the dropdown menu, and every
// text-foreground inheritor rendered WHITE panels with light text in
// dark mode (live-verified: 1.09:1 dialog title, 1.00:1 menu item).
// The reference's own dark surfaces measure #0a0a0a panels / #262626
// borders / #fafafa text (live-probed this session). These pins freeze
// the completion: the seven flips + the explicit-light tails that must
// ride them.

const ROOT = path.resolve(import.meta.dirname, "..");
const CSS = readFileSync(path.join(ROOT, "src/app/globals.css"), "utf-8");

// The s64/s65/s66 needle-in-own-docs rule: an absence pin must read a
// COMMENT-STRIPPED source (the cure's own documentation names the retired
// form).
const stripComments = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
const TOAST = stripComments(readFileSync(path.join(ROOT, "src/components/ui/toast.tsx"), "utf-8"));
const BUTTON = stripComments(readFileSync(path.join(ROOT, "src/components/ui/button.tsx"), "utf-8"));

describe("R-14: the .dark block completes the app-native token set (F-217c)", () => {
  it("flips --color-surface to the reference's measured dark panel", () => {
    expect(CSS).toMatch(/--color-surface: #0a0a0a/);
  });

  it("flips --color-foreground (the body's text-foreground utility resolves in dark)", () => {
    // The base-layer `.dark body { color }` rule was INERT — a utility
    // on <body> always beats it. The token flip is the working seam.
    expect(CSS).toMatch(/--color-foreground: #fafafa/);
  });

  it("flips --color-ink and --color-muted-ink (dialog input text + placeholders)", () => {
    expect(CSS).toMatch(/--color-ink: #f5f5f4/);
    expect(CSS).toMatch(/--color-muted-ink: #a8a29e/);
  });

  it("flips the line family (dialog/listbox borders — the reference's #262626)", () => {
    expect(CSS).toMatch(/--color-line: #262626/);
    expect(CSS).toMatch(/--color-line-soft: #262626/);
    expect(CSS).toMatch(/--color-line-strong: #404040/);
  });

  it("the seven flips live INSIDE the .dark block (after the @theme :root emission)", () => {
    const darkStart = CSS.indexOf(".dark {");
    const rootEnd = CSS.indexOf("--color-line-strong");
    expect(darkStart).toBeGreaterThan(-1);
    expect(rootEnd).toBeGreaterThan(-1);
    // The :root declaration comes first (the light values); the .dark
    // override must exist as a separate later block.
    const darkBlock = CSS.slice(darkStart, darkStart + 2000);
    expect(darkBlock).toMatch(/--color-surface: #0a0a0a/);
    expect(darkBlock).toMatch(/--color-foreground: #fafafa/);
  });

  it("the light values still stand in @theme (the flips are additive)", () => {
    expect(CSS).toMatch(/--color-surface: #ffffff/);
    expect(CSS).toMatch(/--color-foreground: #1c1917/);
  });
});

describe("R-14: the explicit-light tails ride the flips (F-217c)", () => {
  it("the toast panel rides bg-surface (was bg-white — light text on white post-flip)", () => {
    expect(TOAST).not.toMatch(/bg-white/);
    expect(TOAST).toMatch(/bg-surface/);
  });

  it("the toast description gains a dark arm (stone-500 on #0a0a0a is 2.4:1)", () => {
    expect(TOAST).toMatch(/dark:text-stone-400/);
  });

  it("the toast dismiss hover gains a dark arm (neutral-900 on #262626 hover is dark-on-dark)", () => {
    expect(TOAST).toMatch(/dark:hover:text-neutral-50/);
  });

  it("the button secondary variant rides bg-surface (was bg-white)", () => {
    expect(BUTTON).not.toMatch(/secondary: "bg-white/);
    expect(BUTTON).toMatch(/secondary: "bg-surface/);
  });

  it("the ghost + outline hover-text arms gain dark partners", () => {
    expect(BUTTON).toMatch(/dark:hover:text-neutral-50/);
  });
});

// Session-218 (R-15, F-218i/F-218l — the completion's own gaps): the
// R-14 flip set left (i) --color-ring unflipped — input-base's focus
// box-shadow is near-black (#1c1917) on dark inputs, an invisible focus
// indicator, the exact F-217c token class on the ring token — and
// (l) --color-muted/--color-subtle unflipped (the disabled-input text
// rides muted; the dead exports would compute 2.9:1 on dark surfaces).
describe("R-15: the ring + muted/subtle flips complete the set (F-218i/l)", () => {
  it("flips --color-ring in .dark (the invisible dark focus ring)", () => {
    const darkStart = CSS.indexOf(".dark {");
    const darkBlock = CSS.slice(darkStart, CSS.indexOf("}", CSS.indexOf("--color-line-strong", darkStart)) + 1);
    expect(darkBlock).toMatch(/--color-ring:\s*#f5f5f4/);
  });

  it("flips --color-muted and --color-subtle", () => {
    const darkStart = CSS.indexOf(".dark {");
    const darkBlock = CSS.slice(darkStart, CSS.indexOf("}", CSS.indexOf("--color-line-strong", darkStart)) + 1);
    expect(darkBlock).toMatch(/--color-muted:\s*#a8a29e/);
    expect(darkBlock).toMatch(/--color-subtle:\s*#78716c/);
  });

  it("the light values still stand in @theme (the flips are additive)", () => {
    const themeStart = CSS.indexOf("@theme");
    const themeBlock = CSS.slice(themeStart, CSS.indexOf("}", CSS.indexOf("--color-subtle", themeStart)) + 1);
    expect(themeBlock).toMatch(/--color-ring:\s*#1c1917/);
  });
});
