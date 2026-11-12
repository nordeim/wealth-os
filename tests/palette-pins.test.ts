import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-214 (R-11, the palette-completion round — the plan v2.11.0
// enumeration pin): the F-207a lesson has had THREE editions now — the
// phantom `xs:` variant (F-207a), the inert `text-card-foreground` tokens
// (F-209a / A-209), and this round's 23 unpinned (family, step) pairs +
// 7 inert shadcn semantic tokens (F-214d/e). Each edition was found by
// hand; this pin makes finding them AUTOMATIC:
//
//   1. EVERY (family, step) pair used in any class string under src/
//      (including `/opacity` modifier forms) MUST have its
//      `--color-<family>-<step>` token pinned in globals.css's @theme —
//      the documented v3 re-pin contract (globals.css's own header).
//   2. EVERY shadcn semantic token used through a utility prefix
//      (bg-/text-/border-/ring-/divide-/from-/to-/via-/fill-/stroke-/
//      outline-/shadow-/accent-/caret-/placeholder-) MUST be pinned too —
//      an unpinned semantic token generates NO CSS AT ALL in v4 (the
//      class is inert, not merely off-palette).
//
// The two defect classes differ (wrong-but-present vs absent), but the
// guard is the same: the token must exist in @theme.

const ROOT = path.resolve(import.meta.dirname, "..");

const CSS = readFileSync(path.join(ROOT, "src/app/globals.css"), "utf-8");
const PINNED = new Set(
  [...CSS.matchAll(/--color-([a-z][a-z0-9-]*[a-z0-9])\s*:/g)].map((m) => m[1]),
);

const COLOR_FAMILIES = [
  "stone", "amber", "yellow", "emerald", "teal", "rose", "red", "blue",
  "cyan", "purple", "violet", "indigo", "green", "orange", "slate",
  "gray", "zinc", "neutral", "lime", "sky", "fuchsia", "pink",
];
const FAMILY_RE = COLOR_FAMILIES.join("|");
const PAIR_RE = new RegExp(`\\b(${FAMILY_RE})-(\\d{2,3})(?:/\\d+)?\\b`, "g");

const SEMANTIC_TOKENS = [
  "background", "foreground", "card", "card-foreground", "popover",
  "popover-foreground", "primary", "primary-foreground", "secondary",
  "secondary-foreground", "muted", "muted-foreground", "accent",
  "accent-foreground", "destructive", "destructive-foreground", "border",
  "input", "ring", "brand", "surface", "subtle", "line", "line-strong",
  "line-soft", "ink", "muted-ink", "primary-hover", "primary-navy",
  "success", "success-soft", "warning", "warning-soft", "danger",
  "danger-soft", "info", "info-soft", "chart-income", "chart-expense",
  "chart-net",
];
const SEMANTIC_RE = new RegExp(
  `\\b(?:bg|text|border|ring|divide|from|to|via|fill|stroke|outline|shadow|decoration|accent|caret|placeholder)-(${SEMANTIC_TOKENS.join("|")})(?![\\w-])`,
  "g",
);

/** Recursively collect src/**\/*.{ts,tsx} (the generated client excluded). */
function collectSrcFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === "generated" || entry.startsWith(".")) continue;
    const p = path.join(dir, entry);
    if (statSync(p).isDirectory()) collectSrcFiles(p, out);
    else if (p.endsWith(".ts") || p.endsWith(".tsx")) out.push(p);
  }
  return out;
}

interface Usage {
  token: string;
  files: Set<string>;
}

const pairUsage = new Map<string, Usage>();
const semanticUsage = new Map<string, Usage>();

for (const file of collectSrcFiles(path.join(ROOT, "src"))) {
  const rel = path.relative(ROOT, file);
  const text = readFileSync(file, "utf-8");
  for (const m of text.matchAll(PAIR_RE)) {
    const token = `${m[1]}-${m[2]}`;
    if (!pairUsage.has(token)) pairUsage.set(token, { token, files: new Set() });
    pairUsage.get(token)!.files.add(rel);
  }
  for (const m of text.matchAll(SEMANTIC_RE)) {
    const token = m[1];
    if (!semanticUsage.has(token)) semanticUsage.set(token, { token, files: new Set() });
    semanticUsage.get(token)!.files.add(rel);
  }
}

describe("R-11: every (family, step) pair used in src/ is pinned in @theme", () => {
  it("the src tree actually uses pairs (the enumerator is alive)", () => {
    expect(pairUsage.size).toBeGreaterThan(80);
  });

  it("every used pair has its --color token in globals.css", () => {
    const missing = [...pairUsage.values()].filter((u) => !PINNED.has(u.token));
    if (missing.length > 0) {
      const detail = missing
        .map((u) => `${u.token} (used in ${[...u.files].slice(0, 3).join(", ")})`)
        .join("; ");
      throw new Error(
        `unpinned (family, step) pairs compute through v4's oklch defaults — pin their v3 values in globals.css @theme: ${detail}`,
      );
    }
  });
});

describe("R-11: every semantic token used in src/ is pinned in @theme", () => {
  it("the enumerator found semantic usages (the detector is alive)", () => {
    expect(semanticUsage.size).toBeGreaterThan(5);
  });

  it("every used semantic token has its --color token in globals.css", () => {
    const missing = [...semanticUsage.values()].filter((u) => !PINNED.has(u.token));
    if (missing.length > 0) {
      const detail = missing
        .map((u) => `--color-${u.token} (used in ${[...u.files].slice(0, 3).join(", ")})`)
        .join("; ");
      throw new Error(
        `inert semantic tokens — v4 generates NO CSS for unknown tokens, these classes are no-ops until the token is pinned in globals.css @theme: ${detail}`,
      );
    }
  });
});

describe("R-11: the v3 re-pin values (the F-214d cure literals)", () => {
  const V3_PINS: Record<string, string> = {
    "amber-950": "#451a03",
    "blue-300": "#93c5fd",
    "blue-800": "#1e40af",
    "blue-900": "#1e3a8a",
    "blue-950": "#172554",
    "emerald-900": "#064e3b",
    "emerald-950": "#022c22",
    "green-200": "#bbf7d0",
    "green-300": "#86efac",
    "green-800": "#166534",
    "green-900": "#14532d",
    "indigo-100": "#e0e7ff",
    "indigo-300": "#a5b4fc",
    "indigo-800": "#3730a3",
    "indigo-900": "#312e81",
    "purple-300": "#d8b4fe",
    "purple-800": "#6b21a8",
    "purple-900": "#581c87",
    "red-800": "#991b1b",
    "rose-300": "#fda4af",
    "rose-900": "#881337",
    "rose-950": "#4c0519",
    "violet-500": "#8b5cf6",
  };

  it("the 23 F-214d pairs carry their exact v3 hex values", () => {
    const wrong = Object.entries(V3_PINS).filter(
      ([token, hex]) => !CSS.includes(`--color-${token}: ${hex};`),
    );
    expect(wrong).toEqual([]);
  });

  // Session-228 (R-25, F-228b — the legitimate recalibration): the
  // F-214e set shipped 8 tokens; six had ZERO code consumers and lived
  // only through comment strings naming their utilities (the F-224v
  // violation) — retired with the comments reworded. The two LIVE
  // members (input via border-input, secondary via hover:bg-secondary)
  // keep their pins and .dark flips.
  it("the LIVE shadcn neutral tokens + the .dark flips stay pinned (F-214e, trimmed F-228b)", () => {
    const LIGHT: Record<string, string> = {
      input: "#e5e5e5",
      secondary: "#f5f5f5",
    };
    const missing = Object.entries(LIGHT).filter(
      ([token, hex]) => !CSS.includes(`--color-${token}: ${hex};`),
    );
    expect(missing).toEqual([]);

    // The retired six must stay RETIRED (the negative form — a token
    // resurrected by a stray comment or a re-added pin fails here).
    const retired = [
      "--color-secondary-foreground:",
      "--color-accent:",
      "--color-accent-foreground:",
      "--color-muted-foreground:",
      "--color-popover:",
      "--color-popover-foreground:",
      "--color-brand:",
      "--color-subtle:",
    ];
    expect(retired.filter((t) => CSS.includes(t))).toEqual([]);

    const DARK = CSS.slice(CSS.indexOf(".dark {"));
    const darkFlips: Record<string, string> = {
      input: "#262626",
      secondary: "#262626",
    };
    const missingDark = Object.entries(darkFlips).filter(
      ([token, hex]) => !DARK.includes(`--color-${token}: ${hex};`),
    );
    expect(missingDark).toEqual([]);
  });

  // Session-217 (R-14, F-217c — the dark-mode completion): the seven
  // APP-NATIVE tokens join the flip set — the reference's own dark
  // family (its dialog panel measures #0a0a0a with #262626 borders and
  // #fafafa labels; ink/muted-ink follow the existing .dark .input-base
  // precedent). Without these, every dialog, the Select listbox, and
  // the user-menu rendered white panels with light text (1.09:1).
  it("the 7 app-native tokens flip in .dark (F-217c)", () => {
    const DARK = CSS.slice(CSS.indexOf(".dark {"));
    const darkFlips: Record<string, string> = {
      surface: "#0a0a0a",
      foreground: "#fafafa",
      ink: "#f5f5f4",
      "muted-ink": "#a8a29e",
      line: "#262626",
      "line-soft": "#262626",
      "line-strong": "#404040",
    };
    const missingDark = Object.entries(darkFlips).filter(
      ([token, hex]) => !DARK.includes(`--color-${token}: ${hex};`),
    );
    expect(missingDark).toEqual([]);
  });
});
