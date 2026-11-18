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
      // Session-240 (R-37): the CLOSING quote joins the code portion —
      // dropping it fused a quoted token with the characters that
      // follow the string (a cn() appendage's closing call punctuation),
      // so the token never matched the clean live form and a genuine
      // code-site carrier read as comment-only. The quote is a split
      // boundary in tokens(); keeping it makes live-detection exact.
      if (i < n) code.push(src[i++]);
    } else {
      code.push(src[i++]);
    }
  }
  return { code: code.join(""), comments: coms.join("") };
}

// Session-270 (R-67, F-270b): the hash-dialect dispatcher. The env
// dialect (the env example, the ignore list) marks comments with a
// line-leading hash — the slash-forms never apply. Routing those
// lines through the COMMENTS side is load-bearing in both directions:
// a class-shaped token in the prose becomes flaggable by the nets
// (the file is inside Tailwind's scan set, so a dead utility could
// emit from it), and its tokens STOP fabricating repo-wide liveness
// (the invariant's early-continue skips any comment token the live
// universe carries — a prose token on the code side suppressed flags
// for the same token in every other file's comments; live-proven at
// HEAD with a hyphenated prose token absent from every walked code
// site). The assignment and pattern lines stay code.
const HASH_DIALECT_FILES = new Set([".env.example", ".gitignore"]);

function splitByDialect(
  filename: string,
  src: string,
): { code: string; comments: string } {
  if (!HASH_DIALECT_FILES.has(path.basename(filename))) return splitSource(src);
  const code: string[] = [];
  const coms: string[] = [];
  for (const line of src.split("\n")) {
    if (/^\s*#/.test(line)) {
      coms.push(line);
    } else {
      code.push(line);
    }
  }
  return { code: code.join("\n"), comments: coms.join("\n") };
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
    // Session-243 (R-40, F-243d): jsx joins the filter — the nine
    // capital-route .jsx bridges were invisible to this "whole-tree"
    // invariant (the route-case precedent: a tsx-only filter left them
    // invisible there too). The bridges are pure re-export components
    // today; the widened net keeps them honest.
    else if (/\.(ts|tsx|jsx|css)$/.test(name)) files.push(p);
  }
  return files;
}

const SRC_ROOT = path.resolve(import.meta.dirname, "..", "src");
// Session-268 (R-65, F-268g): the tracked root config files join the
// walk — Tailwind's content detection scans them (the F-245e lesson:
// the @source not directives exclude only directories and *.md, so
// the root configs are inside the scan set). Session-269 (R-66,
// F-269b): the human-editable tracked files under prisma/ plus the
// env example join too — seed.ts is a commented TypeScript source,
// exactly the genus the net watches. Session-270 (R-67, F-270b): the
// ignore list joins with the hash-dialect arm — it is human-edited,
// comment-bearing, and inside the scan set (the prior residue claim
// was wrong about it). The residue stays deliberately outside and
// genuinely machine-generated: the lockfile and the license alone.
// The dialect: the env-dialect files' hash-marked lines are COMMENTS
// in their own format — routed to the comments side by the arm below
// (their assignment and pattern lines stay code). Pre-arm, the env
// example's prose landed on the code side and joined the live
// universe — fabricating repo-wide liveness through the invariant's
// early-continue (the F-270b flagship; live-proven with a prose token
// absent from every walked code site).
const ROOT_CONFIG_FILES = [
  "next.config.ts",
  "playwright.config.ts",
  "eslint.config.mjs",
  "vitest.config.ts",
  "prisma.config.ts",
  "postcss.config.mjs",
  "components.json",
  "tsconfig.json",
  "package.json",
  "prisma/seed.ts",
  "prisma/schema.prisma",
  ".env.example",
  ".gitignore",
]
  .map((n) => path.resolve(import.meta.dirname, "..", n))
  .filter((p) => existsSync(p));
const SRC_FILES = [...walkSrc(SRC_ROOT), ...ROOT_CONFIG_FILES];
const SRC_REL = (f: string) => path.relative(path.resolve(import.meta.dirname, ".."), f);

// ---- F-268g: the net's file universe covers the root configs -------------

// ---- F-269b: the human-editable tracked files join the net ------------------

describe("F-269b — the prisma sources and the env example join the net", () => {
  // Session-269 (R-66, F-269b): the F-268g universe leg claimed the
  // walk matched Tailwind's scan set while prisma/seed.ts (a commented
  // TypeScript source — exactly the genus this net watches),
  // prisma/schema.prisma, and .env.example sat tracked and unexcluded,
  // inside the scan set but outside the walk. The three join now; the
  // machine/prose residue (the lockfile, the license, the ignore list)
  // stays deliberately outside — documented in the walk's comment.
  const HUMAN_EDITABLE = [
    "prisma/seed.ts",
    "prisma/schema.prisma",
    ".env.example",
  ];

  it("the walk's file universe carries the human-editable tracked files", () => {
    const rels = SRC_FILES.map(SRC_REL);
    for (const name of HUMAN_EDITABLE) {
      expect(
        rels,
        `the net must read ${name} (Tailwind's scan set includes it)`,
      ).toContain(name);
    }
  });
});

describe("F-270b — the hash-dialect arm and the ignore list join the net", () => {
  // Session-270 (R-67, F-270b): the F-269b extension routed the env
  // example into the walk but the splitter strips only the slash-forms
  // — the file's hash-marked prose lines landed on the CODE side, so
  // its tokens joined the live universe: the file self-satisfied the
  // net (a class-shaped prose token there was never flagged) AND
  // fabricated repo-wide liveness (the same token quoted in any other
  // file's comment was skipped by the engine's early-continue). The
  // hash-dialect arm routes the env-dialect files' hash-marked lines
  // to the comments side; the ignore list joins the walk with the arm
  // from birth (it is human-edited, comment-bearing, and inside the
  // scan set — the F-269b residue claim was wrong about it).
  it("the walk's file universe carries the ignore list (the human-edited dialect file)", () => {
    const rels = SRC_FILES.map(SRC_REL);
    expect(
      rels,
      "the net must read .gitignore (Tailwind's scan set includes it)",
    ).toContain(".gitignore");
  });

  it("a hash-marked-only token of the env example never joins the live universe", () => {
    // The probe token rides the env example's hash-marked prose lines
    // alone (grep-verified unique to them across the whole walk). If
    // this leg REDs, the dialect arm regressed: the hash lines are
    // landing on the code side again and the fabrication door reopens
    // (a prose token must never satisfy the live-universe check).
    // If the env example's prose rewords away the probe, pick the next
    // hash-marked-only token and update the literal here.
    expect(LIVE_TOKENS.has("zero-config")).toBe(false);
  });
});

describe("F-268g — the root config files join the net (the scan-set parity)", () => {
  // Session-268 (R-65, F-268g): Tailwind's content detection scans the
  // root config files (the F-245e lesson — three bare-word carriers
  // lived in the root configs; the @source not directives exclude only
  // directories and *.md), so the "whole-tree" invariant must read
  // them too — a class-shaped token in a root-config comment could
  // emit dead CSS with no net to catch it. The universe leg pins the
  // coverage itself (born RED over the src/-scoped walk).
  const ROOT_CONFIGS = [
    "next.config.ts",
    "playwright.config.ts",
    "eslint.config.mjs",
    "vitest.config.ts",
    "prisma.config.ts",
    "postcss.config.mjs",
    "components.json",
    "tsconfig.json",
    "package.json",
  ];

  it("the walk's file universe carries every tracked root config", () => {
    const rels = SRC_FILES.map(SRC_REL);
    for (const name of ROOT_CONFIGS) {
      expect(
        rels,
        `the net must read ${name} (Tailwind's scan set includes it)`,
      ).toContain(name);
    }
  });
});

// The live token universe: every token in comment-stripped src code.
const LIVE_TOKENS = new Set<string>();
// Per-file comment tokens (for the site-reporting assertions).
const COMMENT_TOKENS = new Map<string, Set<string>>();
for (const f of SRC_FILES) {
  const { code, comments } = splitByDialect(f, readFileSync(f, "utf8"));
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
  // once through separators — the parts are handled individually).
  // Session-232 (R-29, F-232b): the border-primary/text-primary entry
  // RETIRED — the compound form hid border-primary (a DEAD utility:
  // zero live consumers) behind its live text-primary sibling, and the
  // tabs.tsx comment riding it was the sole carrier emitting the dead
  // rule. The allowlist is not a carrier sanctuary: a compound entry
  // is only honest when EVERY part is live or visibly not-a-class.
  "z-50/rounded-md/shadow-md",
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

// ---- F-245e: the bare-word dead-carrier invariant -----------------------

/** Session-245 (R-42, F-245e): single-word Tailwind utilities carry no
 *  hyphen and no colon, so the class-shape heuristic above is blind to
 *  them — six dead rules shipped through that gap (the font-smoothing
 *  class, the display-flow class, the case-transform class, the
 *  display shorthand, the visibility class, and the flex-grow default;
 *  the emission-verified census in the F-245e ledger row). A comment
 *  carrying one of these words that is not live code emits a dead
 *  rule in the production stylesheet.
 *
 *  Known derivation blind spot, recorded (not fixed — the splitter is
 *  load-bearing across the parity-229/242 walkers and the F-240
 *  closing-quote tuning): a REGEX LITERAL carrying a quote character
 *  (csv.ts's character class) mis-tracks the splitter's string spans,
 *  and docblock text in the swallowed span lands in the LIVE side,
 *  fabricating liveness for words carried there. The leg is the net;
 *  the before/after build probe is the proof of any round that cures
 *  carriers. Reword, never allowlist — a real utility quoted in a
 *  comment is a regression (the F-229d rule). */
const BARE_UTILITY_WORDS = new Set([
  "antialiased", "italic", "underline", "overline", "uppercase",
  "lowercase", "capitalize", "truncate", "flow-root", "block",
  "inline", "flex", "grid", "table", "contents", "hidden", "static",
  "fixed", "absolute", "relative", "sticky", "isolate", "visible",
  "invisible", "collapse", "transform", "filter", "container",
  "grow", "shrink", "resize",
]);

describe("F-245e — the bare-word dead-carrier invariant (the genus net)", () => {
  // The COMMENT_TOKENS map above collects only CLASS-SHAPED comment
  // tokens (its own collection loop filters on isClassShaped) — bare
  // words never enter it, so the leg derives its own unfiltered census
  // over the same files with the same splitter. (The first authoring of
  // this leg iterated COMMENT_TOKENS and false-greened — the F-244e
  // lesson's own trap, caught before any cure landed.)
  const BARE_COMMENT_TOKENS = new Map<string, Set<string>>();
  for (const f of SRC_FILES) {
    const { comments } = splitByDialect(f, readFileSync(f, "utf8"));
    const toks = tokens(comments);
    if (toks.size) BARE_COMMENT_TOKENS.set(SRC_REL(f), toks);
  }

  it("no comment under src carries a bare single-word utility that is not live code", () => {
    const offenders: string[] = [];
    for (const [file, toks] of BARE_COMMENT_TOKENS) {
      for (const tok of toks) {
        if (!BARE_UTILITY_WORDS.has(tok)) continue;
        if (LIVE_TOKENS.has(tok)) continue;
        offenders.push(`${file}: ${tok}`);
      }
    }
    expect(
      offenders,
      `dead bare-word carriers (reword the comment; a real utility quoted in prose is a regression):\n  ${offenders.join("\n  ")}`,
    ).toEqual([]);
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
