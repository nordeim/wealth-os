import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-229 (R-26): the source-tier pins for the empty-state repair
// and dead-carrier retirement round. Every pin was born RED over the
// pre-cure tree (the F-229 ledger rows in docs/remediation_plan_v2.md
// carry the verified evidence). Source-scanning contracts per the house
// convention: read the file, assert the contract.

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// ---- the shared comment/code splitter (F-229d's engine) --------------

/** Split source into (comment-stripped code, comments-only). */
function splitSource(src: string): { code: string; comments: string } {
  const code: string[] = [];
  const coms: string[] = [];
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    if (c === "/" && src[i + 1] === "/") {
      while (i < n && src[i] !== "\n") coms.push(src[i++]);
      coms.push("\n");
      code.push("\n");
    } else if (c === "/" && src[i + 1] === "*") {
      i += 2;
      while (i < n && !(src[i] === "*" && src[i + 1] === "/")) coms.push(src[i++]);
      i += 2;
      coms.push("\n");
      code.push("\n");
    } else if (c === '"' || c === "'" || c === "`") {
      const quote = c;
      code.push(c);
      i++;
      while (i < n && src[i] !== quote) {
        if (src[i] === "\\") code.push(src[i++]);
        code.push(src[i++]);
      }
      i++;
    } else {
      code.push(src[i++]);
    }
  }
  return { code: code.join(""), comments: coms.join("") };
}

/** The candidate token set of a text fragment: whitespace-split words
 *  with sentence punctuation trimmed (brackets, slashes and inner
 *  colons stay — they are class-name characters). */
function tokens(text: string): Set<string> {
  const out = new Set<string>();
  for (const raw of text.split(/[\s<>"'`]+/)) {
    const t = raw.replace(/^[.,;:()]+/, "").replace(/[.,;:()]+$/, "");
    if (t.length >= 3) out.add(t);
  }
  return out;
}

const UTILITY_HEADS = new Set([
  "bg", "text", "border", "ring", "from", "via", "to", "rounded", "shadow", "w", "h",
  "min", "max", "p", "px", "py", "pt", "pb", "pl", "pr", "m", "mx", "my", "mt", "mb", "ml", "mr",
  "gap", "grid", "col", "flex", "items", "justify", "font", "tracking", "leading", "list",
  "transition", "duration", "animate", "slide", "fade", "zoom", "spin", "inset", "z",
  "opacity", "underline", "decoration", "sr", "size", "space", "divide", "place", "self",
  "overflow", "whitespace", "break", "uppercase", "lowercase", "capitalize", "accent",
  "cursor", "select", "pointer", "order", "basis", "shrink", "grow", "table", "object",
  "aspect", "outline", "scroll", "isolate", "mix", "filter", "blur", "brightness",
  "contrast", "grayscale", "invert", "sepia", "drop", "transform", "origin", "scale",
  "rotate", "translate", "skew", "will", "backface", "container", "appearance", "resize",
  "columns", "content", "backdrop", "peer", "group", "data", "aria", "hover", "focus",
  "active", "disabled", "sm", "md", "lg", "xl", "2xl", "dark", "light", "placeholder",
  "selection", "marker", "file", "first", "last", "odd", "even", "only", "open",
  "checked", "inert", "motion", "starting", "supports", "rtl", "ltr", "not",
]);

/** A token looks like a Tailwind utility/variant candidate when its
 *  first hyphen-segment or colon-segment is a known utility/variant
 *  head (e.g. `bg-blue-50`, `from-stone-900`, `sm:text-left`,
 *  `focus:bg-accent`, `max-w-[420px]`, `data-[state=open]:animate-in`). */
function isClassShaped(token: string): boolean {
  const colon = token.indexOf(":");
  if (colon > 0) {
    const head = token.slice(0, colon);
    if (UTILITY_HEADS.has(head) || /^\[[^\]]+\]$/.test(head)) return true;
  }
  const hyphen = token.indexOf("-");
  if (hyphen > 0 && UTILITY_HEADS.has(token.slice(0, hyphen))) return true;
  return false;
}

function walkSrc(dir: string, files: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === "generated") continue; // the regenerated prisma client
    const p = path.join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkSrc(p, files);
    else if (/\.(ts|tsx|css)$/.test(name)) files.push(p);
  }
  return files;
}

const SRC_ROOT = path.resolve(import.meta.dirname, "..", "src");
const SRC_FILES = walkSrc(SRC_ROOT);
const SRC_REL = (f: string) => path.relative(path.resolve(import.meta.dirname, ".."), f);

// The live token universe: every token in comment-stripped src code.
const LIVE_TOKENS = new Set<string>();
// Per-file comment tokens (for the site-reporting assertions).
const COMMENT_TOKENS = new Map<string, Set<string>>();
for (const f of SRC_FILES) {
  const { code, comments } = splitSource(readFileSync(f, "utf8"));
  for (const t of tokens(code)) LIVE_TOKENS.add(t);
  for (const t of tokens(comments)) {
    if (!isClassShaped(t)) continue;
    if (!COMMENT_TOKENS.has(SRC_REL(f))) COMMENT_TOKENS.set(SRC_REL(f), new Set());
    COMMENT_TOKENS.get(SRC_REL(f))!.add(t);
  }
}

// ---- F-229a: the Income tab gates on income presence -----------------

describe("F-229a — the Analytics Income tab's empty state is reachable", () => {
  const src = read("src/app/(app)/analytics/page.tsx");

  it("the gate rides an income-presence predicate over the range domain", () => {
    expect(src).toContain('t.type === "income"');
    expect(src).toMatch(/hasIncome/);
  });

  it("the structurally-dead length gate is gone (categoryTrend always returns n points)", () => {
    // Pre-cure: `incomeTrend.length === 0` could never fire — the seam
    // unconditionally pushes one point per month (the F-219r birth
    // defect; pinned behaviorally in tests/finance.test.ts).
    expect(src).not.toContain("incomeTrend.length === 0");
  });
});

// ---- F-229b: the budgets P2002 race arm -------------------------------

describe("F-229b — the budgets upsert carries the concurrent-create arm", () => {
  it("the POST catch recognizes P2002 and retries once (the settings F-215i family)", () => {
    const src = read("src/app/api/budgets/route.ts");
    expect(src).toContain("P2002");
    // The retry must exist inside the catch (a second upsert call).
    const catchIdx = src.indexOf("} catch (error) {");
    const tail = src.slice(catchIdx);
    expect((tail.match(/db\.budget\.upsert/g) ?? []).length).toBeGreaterThanOrEqual(1);
  });
});

// ---- F-229c: the seed stages UTC-midnight calendar dates --------------

describe("F-229c — the seed writes UTC midnights, not local-noon instants", () => {
  const src = read("prisma/seed.ts");

  it("no setHours-noon form remains (the sole non-midnight writer)", () => {
    expect(src).not.toContain("setHours(12");
  });

  it("dayOffset builds a UTC midnight from the local calendar date", () => {
    expect(src).toMatch(/Date\.UTC\(x\.getFullYear\(\), x\.getMonth\(\), x\.getDate\(\)\)/);
  });

  it("the transaction + nextDate constructions ride Date.UTC", () => {
    expect(src).toContain("new Date(Date.UTC(base.getFullYear(), base.getMonth(), day))");
    expect(src).toMatch(
      /new Date\(Date\.UTC\(base\.getFullYear\(\), base\.getMonth\(\) \+ 1, Math\.min\(e\.dayOfMonth, 28\)\)\)/,
    );
  });
});

// ---- F-229d: the whole-tree dead-carrier retirement -------------------

/** The 30 emission-verified dead tokens (the session-229 build-probe:
 *  each emitted a rule in the pre-cure stylesheet with zero live
 *  consumers — docs/remediation_plan_v2.md F-229d). */
const DEAD_CARRIER_TOKENS = [
  "accent-foreground",
  "animate-out",
  "appearance-none",
  "backdrop-blur",
  "bg-muted",
  "flex-row",
  "focus:border-slate-400",
  "focus:ring-slate-400",
  "from-stone-900",
  "lg:grid-cols-5",
  "max-h-72",
  "max-w-[420px]",
  "md:h-14",
  "md:p-6",
  "md:w-14",
  "min-h-[72px]",
  "mr-0",
  "mr-1",
  "p-12",
  "pr-6",
  "pt-4",
  "ring-ring",
  "slide-in-from-bottom-4",
  "sm:h-12",
  "sm:space-x-2",
  "sm:text-left",
  "sm:text-lg",
  "text-blue-700",
  "to-stone-900",
  "via-stone-800",
];

describe("F-229d — the thirty dead carriers retire (the whole-tree form)", () => {
  it("no comment anywhere under src names any of the thirty tokens", () => {
    const offenders: string[] = [];
    for (const [file, toks] of COMMENT_TOKENS) {
      for (const dead of DEAD_CARRIER_TOKENS) {
        if (toks.has(dead)) offenders.push(`${file}: ${dead}`);
      }
    }
    expect(offenders, `dead carriers still quoted:\n  ${offenders.join("\n  ")}`).toEqual([]);
  });
});

/** Prose words that look class-shaped to the heuristic but are neither
 *  Tailwind utilities nor quoted classes — English, CSS property names,
 *  URL fragments, and placeholder forms. Anything added here must be
 *  visibly not-a-class; a real utility quoted in a comment is a
 *  REGRESSION (the F-224v/F-228b/F-229d family), not an allowlist
 *  candidate. */
const PROSE_ALLOWLIST = new Set([
  // ARIA/data ATTRIBUTES quoted in prose (HTML, not classes — none emit)
  "aria-label", "aria-controls", "aria-hidden", "aria-live", "aria-checked",
  "aria-labelledby", "aria-expanded", "aria-orientation",
  "data-state", "data-orientation", "data-[state]", "data-[state=open]",
  "data-[state=active]", "data-[state=selected]", "data-[state=active]:*",
  "data-[placeholder]",
  // English hyphenations with utility-shaped heads
  "self-heal", "self-healing", "self-consistent", "first-class", "first-ever",
  "first-party", "first-reload", "first-signups", "first-touch", "first-use",
  "first-writes", "last-reload", "last-request-wins", "last-writer-wins",
  "only-child", "hover-pause", "dark-mode",
  "dark-on-dark", "dark-surface", "light-only", "light-read", "text-only",
  "text-bearing", "text-overflow", "text-rendering", "font-face", "font-smoothing",
  "file-convention", "content-hashed", "content-max-4000", "content-random",
  "content-surface", "content-detection", "cursor-based-pagination", "break-even",
  "divide-by-zero", "border-less", "border-color", "outline-color",
  "placeholder-state", "resize-past-lg", "flex-shrinks", "mt-on-following",
  "space-y-4-only", "object-data", "data-attribute", "aria-hide", "aria-labels",
  "slide-in/out", "slide-over", "slide-in-from-", "slide-in-from-*",
  "text-X-100", "via-30", "to-br", "to-r", "grid-cols-", "grid-cols-{n}",
  "lg:grid-cols-{n}", "accent-", "text-", "focus-", "min-length", "min-height",
  "from-scratch", "whitespace-only", "focus-wash", "focus-visible",
  "focus-visible:", "dark-body", "disabled-input",
  // CSS property / value vocabulary quoted in prose
  "text-align", "accent-color", "backdrop-filter", "background-color",
  "border-radius", "border-collapse", "box-shadow", "accent-color:",
  // Wildcard/placeholder utility forms (the * and ${n} shapes never parse)
  "rounded-*", "mt-*", "mt-*/space-y-*", "fade-*", "grid-cols-${n}",
  // Multi-class prose runs (each names several live/retired classes at
  // once through separators — the parts are handled individually)
  "border-primary/text-primary", "z-50/rounded-md/shadow-md",
  "data-state/data-orientation/", "w-full+w-10",
  // Token-SCALE citations (custom-property names, not class quotes)
  "blur-sm",
  // URL/path fragments that parse with a variant head
  "data:null", "file:../db/custom.db", "file:../db/e2e.db", "file:../db/captures.db",
  "file:../db/smoke.db", "from:..", "order:..", "origin:..",
]);

describe("F-229d — the whole-tree carrier invariant (the genus cure)", () => {
  it("every class-shaped comment token is live code or prose (never a dead utility)", () => {
    const offenders: string[] = [];
    for (const [file, toks] of COMMENT_TOKENS) {
      for (const tok of toks) {
        if (LIVE_TOKENS.has(tok)) continue;
        if (PROSE_ALLOWLIST.has(tok)) continue;
        offenders.push(`${file}: ${tok}`);
      }
    }
    expect(
      offenders,
      `comment-only class-shaped tokens (reword the comment or, if genuinely\n` +
        `prose, allowlist it with a justification — NEVER for a real utility):\n  ${offenders.join("\n  ")}`,
    ).toEqual([]);
  });

  it("the invariant has teeth: a synthetic dead carrier in a comment fails it", () => {
    // The mutation proof: the engine flags a token that is class-shaped,
    // absent from live code, and not allowlisted.
    const synthetic = "bg-never-exists-9999";
    expect(isClassShaped(synthetic)).toBe(true);
    expect(LIVE_TOKENS.has(synthetic)).toBe(false);
    expect(PROSE_ALLOWLIST.has(synthetic)).toBe(false);
  });
});

// ---- F-229e: the DialogHeader docblock truth --------------------------

describe("F-229e — the DialogHeader docblock records the left-aligned genus", () => {
  it("no false centering claim; the reference's own title is left-aligned (probed at 390)", () => {
    const src = read("src/components/ui/dialog.tsx");
    expect(src).not.toContain("centers the title below sm");
    expect(src).toMatch(/left-aligned/i);
  });
});

// ---- F-229f: the dead API surfaces retire ------------------------------

describe("F-229f — the six dead API surfaces retire; the live set stands", () => {
  it("ExpenseDialog no longer declares the unread presetCategory prop", () => {
    expect(read("src/app/(app)/expenses/page.tsx")).not.toContain("presetCategory");
  });

  it("INCOME_CATEGORIES and CURRENCY_SYMBOLS retire from constants.ts", () => {
    const src = read("src/lib/constants.ts");
    expect(src).not.toContain("INCOME_CATEGORIES");
    expect(src).not.toContain("CURRENCY_SYMBOLS");
  });

  it("format.ts keeps only its live export (toDateInputValue) and an honest header", () => {
    const src = read("src/lib/format.ts");
    expect(src).toContain("toDateInputValue");
    for (const dead of ["startOfDay", "startOfWeek", "startOfMonth", "startOfYear", "subMonthsClamped", "MONTHS_SHORT"]) {
      expect(src, `${dead} still rides format.ts`).not.toContain(dead);
    }
    expect(src).not.toContain("tests/format.test.ts");
  });

  it("NAV_FOOTER_ITEMS retires from nav-config.ts", () => {
    expect(read("src/components/layout/nav-config.ts")).not.toContain("NAV_FOOTER_ITEMS");
  });

  it("the pill Tabs variant + TABS_PILL + cols + GRID_COLS retire (zero consumers)", () => {
    expect(read("src/components/ui/tabs.tsx")).not.toContain("TABS_PILL");
    expect(read("src/components/ui/tabs.tsx")).not.toContain("GRID_COLS");
    expect(read("src/components/ui/tabs.tsx")).not.toContain('variant === "pill"');
    expect(read("src/components/ui/tabs.tsx")).not.toContain("cols?: number");
    expect(read("src/lib/page-layout.ts")).not.toContain("TABS_PILL");
  });

  it("the live Tabs contract stands (both consumers ride the segmented variant)", () => {
    const analytics = read("src/app/(app)/analytics/page.tsx");
    const expenses = read("src/app/(app)/expenses/page.tsx");
    expect(analytics).toContain('variant="segmented"');
    expect(expenses).toContain('variant="segmented"');
    expect(read("src/components/ui/tabs.tsx")).toContain("TABS_SEGMENTED");
  });
});

// ---- F-229h: the search Postgres-path note ------------------------------

describe("F-229h — the search docblock names the case-folding dependency", () => {
  it("the route documents the SQLite-LIKE posture and the Postgres migration step", () => {
    const src = read("src/app/api/search/route.ts");
    expect(src).toMatch(/case-insensitive/i);
    expect(src).toContain('mode: "insensitive"');
  });
});

// ---- F-229j: the hygiene tail ------------------------------------------

describe("F-229j — the source-hygiene tail", () => {
  it("mobile-nav imports next/navigation exactly once", () => {
    const src = read("src/components/layout/mobile-nav.tsx");
    expect((src.match(/from "next\/navigation"/g) ?? []).length).toBe(1);
  });
});
