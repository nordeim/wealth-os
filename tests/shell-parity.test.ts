import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session 207 (R-7.1–R-7.4): the shell/nav/auth parity re-pin — every
// constant below was live-extracted from the logged-in reference
// (agent-browser census, both themes, full class strings — the F-207
// findings). The F-207c withdrawal is pinned too: the reference's drawer
// DOES render the active pill (the session-206-era "no active state"
// decode was a 150-char truncation artifact), so MOBILE_NAV_SHEET must
// KEEP linkActive.
//
// The two documented supersets (kept deliberately, cited):
//   - the Synced pill reads green-700 (not the reference's green-600) in
//     light mode — green-600 on the light wash measures 3.16:1, under the
//     AA floor; the sanctioned fix is darkening one Tailwind step
//     (AGENTS.md testing rules), never restyling;
//   - the drawer sheet stays an OPAQUE gradient (the reference's sheet is
//     a transparent veil whose light mode ships stone-300-on-light text —
//     unreadable); we adopt its 3% gold/emerald sheen as a second layer.

const repoFile = (rel: string) => path.resolve(import.meta.dirname, "..", rel);

const readOr = (rel: string): string => {
  const p = repoFile(rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// The house source-scanning idiom: strip comments so pins match CODE,
// not the documentation that describes it (session-207's own docblocks
// quote the retired `xs:` construction — the guard must not self-trip).
const stripComments = (src: string): string =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");

const codeOf = (rel: string): string => stripComments(readOr(rel));

const layout = async () =>
  (await import("@/lib/page-layout")) as unknown as Record<string, Record<string, string>>;
const mobileHeaderSrc = () => readOr("src/components/layout/mobile-header.tsx");
const mobileNavSrc = () => readOr("src/components/layout/mobile-nav.tsx");
const sidebarSrc = () => readOr("src/components/layout/sidebar.tsx");
const pagePartsSrc = () => readOr("src/components/shared/page-parts.tsx");
const globalsSrc = () => readOr("src/app/globals.css");
const pageSrc = (p: string) => readOr(`src/app/(app)/${p}/page.tsx`);

const APP_PAGES = [
  "dashboard",
  "income",
  "expenses",
  "accounts",
  "investments",
  "import",
  "analytics",
  "goals",
  "settings",
] as const;

// The per-page container map (the reference's measured set): the wide
// 7xl family, the mid 6xl family, and Settings' 4xl.
const CONTAINER_OF: Record<(typeof APP_PAGES)[number], string> = {
  dashboard: "containerWide",
  income: "containerMid",
  expenses: "containerWide",
  accounts: "containerMid",
  investments: "containerWide",
  import: "containerMid",
  analytics: "containerWide",
  goals: "containerMid",
  settings: "containerNarrow",
};

// The H1 tone map: Dashboard + Investments keep the stone H1 (mb-1); the
// other seven carry the reference's text-primary-navy token (mb-2).
const NAVY_TONE_PAGES = new Set([
  "income",
  "expenses",
  "accounts",
  "import",
  "analytics",
  "goals",
  "settings",
]);

describe("session-207: the phantom-breakpoint guard (F-207a — the Tailwind v4 class that never existed)", () => {
  it("no src file references a variant this Tailwind v4 setup never defines (xs/2xs/3xs silently generate NO CSS)", () => {
    const offenders: string[] = [];
    for (const page of APP_PAGES) {
      const src = codeOf(pageSrc(page));
      if (/\b(?:xs|2xs|3xs):/.test(src)) offenders.push(`(app)/${page}/page.tsx`);
    }
    for (const rel of [
      "src/components/layout/mobile-header.tsx",
      "src/components/layout/mobile-nav.tsx",
      "src/components/layout/sidebar.tsx",
      "src/components/layout/app-shell.tsx",
      "src/components/shared/page-parts.tsx",
      "src/components/shared/ai-coach.tsx",
    ]) {
      if (/\b(?:xs|2xs|3xs):/.test(codeOf(rel))) offenders.push(rel);
    }
    expect(offenders, `phantom breakpoint variants found: ${offenders.join(", ")}`).toEqual([]);
  });

  it("the mobile header's pill carries no display-hiding class (the F-207a cure: visible at 390, like the reference)", () => {
    const src = codeOf(mobileHeaderSrc());
    expect(src).not.toMatch(/hidden\s+xs:inline-flex/);
    expect(src).not.toMatch(/syncedPill[^}]*\bhidden\b/);
  });
});

describe("session-207: MOBILE_HEADER — the reference's topbar genus (F-207b)", () => {
  it("the root carries the gradient wash + amber border + shadow-lg + backdrop-blur (the reference's own topbar)", async () => {
    const L = await layout();
    const root = L.MOBILE_HEADER.root;
    expect(root).toContain("bg-gradient-to-r from-stone-50 via-amber-50/50 to-stone-50");
    expect(root).toContain("dark:from-stone-950 dark:via-stone-900 dark:to-stone-950");
    expect(root).toContain("border-b border-amber-500/20");
    expect(root).toContain("shadow-lg");
    expect(root).toContain("backdrop-blur-md");
  });

  it("the brand row is the reference's: w-8 h-8 logo + gradient-clip wordmark", async () => {
    const L = await layout();
    expect(L.MOBILE_HEADER.brandLogo).toMatch(/^w-8 h-8 /);
    expect(L.MOBILE_HEADER.brandWordmark).toContain("bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600");
    expect(L.MOBILE_HEADER.brandWordmark).toContain("dark:from-amber-400 dark:via-yellow-300 dark:to-amber-400");
    expect(L.MOBILE_HEADER.brandWordmark).toContain("bg-clip-text text-transparent");
  });

  it("the Synced pill is the reference's badge genus (rounded-md, semibold, green) at the AA-safe step", async () => {
    const L = await layout();
    const pill = L.MOBILE_HEADER.syncedPill;
    expect(pill).toContain("rounded-md");
    expect(pill).toContain("text-xs font-semibold");
    expect(pill).toContain("text-green-700");
    expect(pill).toContain("border-green-300");
    expect(pill).toContain("dark:text-green-400");
    expect(pill).toContain("dark:border-green-600");
    // negative: the old emerald-full genus is gone
    expect(pill).not.toContain("rounded-full");
    expect(pill).not.toContain("emerald");
  });

  it("the icon buttons are the reference's borderless ghosts (no chip border, rounded-md)", async () => {
    const L = await layout();
    const btn = L.MOBILE_HEADER.iconButton;
    expect(btn).toContain("rounded-md");
    expect(btn).not.toContain("border-stone-200");
    expect(btn).not.toContain("bg-white");
    expect(btn).toContain("text-gray-700");
    expect(btn).toContain("dark:text-gray-300");
  });

  it("the pill renders in the RIGHT cluster beside the theme toggle + hamburger, with the wifi glyph", () => {
    const src = mobileHeaderSrc();
    // The right cluster div opens after the brand row; the pill must sit
    // inside it, BEFORE the two icon buttons.
    const brandRowEnd = src.indexOf("</div>", src.indexOf("brandRow"));
    const pillAt = src.indexOf("syncedPill");
    const themeToggleAt = src.indexOf('aria-label={isDark');
    expect(pillAt).toBeGreaterThan(brandRowEnd);
    expect(pillAt).toBeLessThan(themeToggleAt);
    expect(src).toContain("Wifi");
    expect(src).not.toMatch(/\bCheck\b/);
  });
});

describe("session-207: MOBILE_NAV_SHEET — the drawer footer + sheen (F-207d) and the F-207c withdrawal", () => {
  it("the footer is the reference's bordered band (p-4 + border-t + amber/20)", async () => {
    const L = await layout();
    expect(L.MOBILE_NAV_SHEET.footer).toBe("p-4 border-t border-amber-500/20");
  });

  it("Sign Out is the reference's ghost (slate border, white/10 hover, no filled chip)", async () => {
    const L = await layout();
    const so = L.MOBILE_NAV_SHEET.signOut;
    expect(so).toContain("border-slate-600");
    expect(so).toContain("hover:bg-white/10");
    expect(so).not.toContain("bg-stone-800");
    expect(so).not.toContain("rounded-xl");
  });

  it("the drawer sheet carries the reference's gold/emerald sheen utility over the opaque gradient (the readable superset)", async () => {
    const L = await layout();
    expect(L.MOBILE_NAV_SHEET.content).toContain("mobile-drawer-sheen");
    // the sheen utility itself: the two-layer background-image (3% tints
    // over the stone gradient), defined once in globals.css
    const css = globalsSrc();
    expect(css).toMatch(/@utility\s+mobile-drawer-sheen\s*{[^}]*212 175 55[^}]*4 120 87[^}]*}/);
  });

  it("the F-207c withdrawal pin: the drawer's ACTIVE PILL STAYS (the reference renders it — the session-206 'no active state' read was a truncation artifact)", async () => {
    const L = await layout();
    expect(L.MOBILE_NAV_SHEET.linkActive).toContain("bg-gradient-to-r from-amber-500/20 to-emerald-600/20");
    expect(L.MOBILE_NAV_SHEET.linkActive).toContain("border border-amber-400/30");
    // and mobile-nav.tsx still applies it
    expect(mobileNavSrc()).toContain("MOBILE_NAV_SHEET.linkActive");
  });

  it("the drawer's Sign Out wraps in the footer band", () => {
    const src = mobileNavSrc();
    expect(src).toContain("MOBILE_NAV_SHEET.footer");
  });
});

describe("session-207: PAGE_ROOT — the section shells (F-207e/g)", () => {
  it("the standard shell is the reference's warm gradient wash + the p-4 lg:p-8 rhythm + min-h-screen", async () => {
    const L = await layout();
    const shell = L.PAGE_ROOT.standard;
    expect(shell).toContain("p-4 lg:p-8");
    expect(shell).toContain("min-h-screen");
    expect(shell).toContain("bg-gradient-to-br from-stone-50 via-amber-50/30 to-emerald-50/40");
    expect(shell).toContain("dark:from-stone-950 dark:via-stone-900 dark:to-emerald-950/30");
    // negative: the old flat shell is gone
    expect(shell).not.toContain("md:p-6");
  });

  it("the navy variant is Import's own wash (the reference's one divergent shell)", async () => {
    const L = await layout();
    const navy = L.PAGE_ROOT.navy;
    expect(navy).toContain("from-slate-50 to-blue-50");
    expect(navy).toContain("dark:from-gray-900 dark:to-gray-800");
    expect(navy).toContain("min-h-screen");
  });

  it("the per-page inner containers exist (7xl / 6xl / 4xl)", async () => {
    const L = await layout();
    expect(L.PAGE_ROOT.containerWide).toContain("max-w-7xl mx-auto");
    expect(L.PAGE_ROOT.containerMid).toContain("max-w-6xl mx-auto");
    expect(L.PAGE_ROOT.containerNarrow).toContain("max-w-4xl mx-auto");
  });

  it("every page wraps its content in the wash + its measured container", () => {
    for (const page of APP_PAGES) {
      const src = pageSrc(page);
      expect(src, `${page} must render PAGE_ROOT`).toContain("PAGE_ROOT.");
      expect(
        src,
        `${page} must use its measured container (${CONTAINER_OF[page]})`,
      ).toContain(`PAGE_ROOT.${CONTAINER_OF[page]}`);
    }
  });

  it("Import is the one navy shell; the other eight keep the warm wash", () => {
    expect(pageSrc("import")).toContain("PAGE_ROOT.navy");
    for (const page of APP_PAGES) {
      if (page === "import") continue;
      expect(pageSrc(page), `${page} must keep the standard shell`).toContain("PAGE_ROOT.standard");
    }
  });
});

describe("session-207: PAGE_HEADER — the lg: rhythm + the navy H1 token (F-207e)", () => {
  it("the header row is the reference's (lg: breakpoints, mb-8, gap-4)", async () => {
    const L = await layout();
    const root = L.PAGE_HEADER.root;
    expect(root).toBe("flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4");
  });

  it("the stone H1: lg: step, no tracking-tight, dark:white, mb-1", async () => {
    const L = await layout();
    const title = L.PAGE_HEADER.title;
    expect(title).toContain("text-3xl lg:text-4xl");
    expect(title).toContain("text-stone-900 dark:text-white mb-1");
    expect(title).not.toContain("tracking-tight");
    expect(title).not.toContain("md:text-4xl");
  });

  it("the navy H1: the reference's text-primary-navy token + mb-2", async () => {
    const L = await layout();
    const title = L.PAGE_HEADER.titleNavy;
    expect(title).toContain("text-primary-navy");
    expect(title).toContain("dark:text-white mb-2");
  });

  it("PageHeader renders the navy tone; the seven navy pages ask for it, Dashboard + Investments do not", () => {
    const parts = pagePartsSrc();
    expect(parts).toContain('tone?: "stone" | "navy"');
    expect(parts).toContain("PAGE_HEADER.titleNavy");
    for (const page of APP_PAGES) {
      const src = pageSrc(page);
      if (NAVY_TONE_PAGES.has(page)) {
        expect(src, `${page} must pass tone="navy"`).toContain('tone="navy"');
      } else {
        expect(src, `${page} must keep the stone tone`).not.toContain('tone="navy"');
      }
    }
  });

  it("globals.css pins the navy token as a literal hex (the v4 doctrine: tokens are literal, never var() chains)", () => {
    expect(globalsSrc()).toContain("--color-primary-navy: #0f1419;");
  });
});

describe("session-207: LOGIN_LAYOUT — the auth-card family (F-207f)", () => {
  it("the card is the reference's borderless glass (border-0, shadow-2xl, white/95, backdrop-blur)", async () => {
    const L = await layout();
    const card = L.LOGIN_LAYOUT.card;
    expect(card).toContain("border-0");
    expect(card).toContain("shadow-2xl");
    expect(card).toContain("bg-white/95");
    expect(card).toContain("backdrop-blur-sm");
    // negative: the old bordered opaque card is gone
    expect(card).not.toContain("border-slate-200/60");
    expect(card).not.toContain("shadow-xl");
  });

  it("the accent bar is the reference's slate strip (not our amber)", async () => {
    const L = await layout();
    const accent = L.LOGIN_LAYOUT.accent;
    expect(accent).toContain("from-slate-200 via-slate-300 to-slate-200");
    expect(accent).not.toContain("amber");
  });

  it("the inner padding carries the reference's taller md: rhythm", async () => {
    const L = await layout();
    expect(L.LOGIN_LAYOUT.inner).toContain("md:pt-12 md:pb-10 md:px-10");
  });
});

describe("session-207: the sidebar footer pill joins the badge family (F-207h)", () => {
  it("NAV_LAYOUT carries the same synced-pill genus as the topbar (rounded-md, semibold, green, wifi glyph)", async () => {
    const L = await layout();
    const pill = L.NAV_LAYOUT.syncedPill;
    expect(pill).toContain("rounded-md");
    expect(pill).toContain("text-xs font-semibold");
    // Session-223 (R-20, F-223f): the DESKTOP pairing is unconditional
    // green-400/green-600 — the sidebar gradient is near-black in both
    // themes (green-700 computed 3.49:1 in light mode). The mobile
    // twin keeps the light/dark arms.
    expect(pill).toContain("text-green-400");
    expect(pill).toContain("border-green-600");
    expect(pill).not.toContain("text-green-700");
    expect(pill).not.toContain("rounded-full");
    expect(pill).not.toContain("emerald");
  });

  it("the sidebar renders the pill through the constant, with the wifi glyph", () => {
    const src = sidebarSrc();
    expect(src).toContain("NAV_LAYOUT.syncedPill");
    expect(src).toContain("Wifi");
  });
});
