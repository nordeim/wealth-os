import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session 208 (R-7.6–R-7.8, the R-7 tail): the stat-face + settings +
// auth-face parity re-pin — every constant below was live-extracted from
// the logged-in reference (agent-browser census, full class strings — the
// F-208 findings). The kept supersets (cited):
//   - Category Budgets stays a Settings card (the reference has none — a
//     functional superset), restyled to the glass genus;
//   - our KPI cards keep CARD.base (the app-wide warm-gradient card genus
//     is F-208g, the NEXT slice — only the tiles/cards converge here);
//   - the gauge core stays our SVG semicircle (the reference's recharts
//     RadialBar renders the same semicircle genus — only the overlay,
//     score bars, and tip box converge).

const repoFile = (rel: string) => path.resolve(import.meta.dirname, "..", rel);

const readOr = (rel: string): string => {
  const p = repoFile(rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// The house source-scanning idiom: strip comments so pins match CODE,
// not the documentation that describes it.
const stripComments = (src: string): string =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");

const codeOf = (rel: string): string => stripComments(readOr(rel));

const layout = async () =>
  (await import("@/lib/page-layout")) as unknown as Record<string, Record<string, string>>;

const pagePartsSrc = () => codeOf("src/components/shared/page-parts.tsx");
const dashboardSrc = () => codeOf("src/app/(app)/dashboard/page.tsx");
const investmentsSrc = () => codeOf("src/app/(app)/investments/page.tsx");
const analyticsSrc = () => codeOf("src/app/(app)/analytics/page.tsx");
const settingsSrc = () => codeOf("src/app/(app)/settings/page.tsx");
const loginCardSrc = () => codeOf("src/components/layout/login-card.tsx");

describe("session-208 R-7.6a: the KpiCard gradient-tile genus (F-208a)", () => {
  it("KPI_TONES carries the reference's four exact gradient strings", async () => {
    const mod = (await import("@/lib/page-layout")) as { KPI_TONES: Record<string, string> };
    expect(mod.KPI_TONES.emerald).toBe(
      "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600",
    );
    expect(mod.KPI_TONES.rose).toBe("bg-gradient-to-r from-rose-500 via-red-500 to-rose-600");
    expect(mod.KPI_TONES.amber).toBe(
      "bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600",
    );
    expect(mod.KPI_TONES.purple).toBe(
      "bg-gradient-to-r from-purple-500 via-violet-500 to-purple-600",
    );
  });

  it("the tile is the reference's fixed-size rounded-xl gradient tile with a white icon", () => {
    const src = pagePartsSrc();
    expect(src).toContain("w-12 h-12 rounded-xl");
    expect(src).toContain("flex items-center justify-center");
    expect(src).toContain("h-6 w-6 text-white");
    // the retired flat-tile construction must not return
    expect(src).not.toContain("md:h-14");
    expect(src).not.toContain("iconSoft");
    expect(src).not.toContain("iconColor");
  });

  it("the dashboard consumes tone= (not the retired color props)", () => {
    const src = dashboardSrc();
    expect(src).toContain('tone="emerald"');
    expect(src).toContain('tone="rose"');
    expect(src).toContain('tone="amber"');
    expect(src).toContain('tone="purple"');
    expect(src).not.toContain("iconSoft");
    expect(src).not.toContain("iconColor");
  });
});

describe("session-208 R-7.6b: the Investments full-card gradient KPI genus (F-208a)", () => {
  it("GradientKpiCard carries the reference's construction", () => {
    const src = pagePartsSrc();
    expect(src).toContain("text-white/70 text-sm font-medium mb-1");
    expect(src).toContain("text-3xl font-black text-white");
    expect(src).toContain("text-white/60 text-xs mt-1");
    expect(src).toContain("w-12 h-12 text-white/30");
  });

  it("the investments page renders the reference's three gradient cards", () => {
    const src = investmentsSrc();
    expect(src).toContain("from-blue-500 via-cyan-500 to-blue-600");
    expect(src).toContain("from-emerald-500 via-teal-500 to-emerald-600");
    expect(src).toContain("from-amber-500 via-yellow-500 to-amber-600");
    expect(src).toContain("GradientKpiCard");
    expect(src).not.toContain("iconSoft");
    // the gradient-card construction itself (shadow-2xl + the white genus)
    // lives in GradientKpiCard — page-parts carries it
    expect(pagePartsSrc()).toContain("shadow-2xl");
  });
});

describe("session-208 R-7.6c: the Cash Flow legend row + PeriodSegment (F-208b)", () => {
  it("the dashboard's custom dot-marker legend row is gone (the reference renders none)", () => {
    const src = dashboardSrc();
    expect(src).not.toContain("flex flex-wrap items-center justify-center gap-6");
    expect(src).not.toContain("h-2.5 w-2.5 rounded-full");
  });

  it("PeriodSegment matches the reference's segmented control", () => {
    const src = pagePartsSrc();
    expect(src).toContain("flex gap-1 bg-stone-100 dark:bg-stone-800/80 rounded-lg p-1");
    expect(src).toContain("px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200");
    expect(src).not.toContain("inline-flex items-center rounded-lg bg-stone-100 p-1 dark:bg-stone-800");
  });
});

describe("session-208 R-7.6d: the Financial Health widget (F-208c)", () => {
  it("the score bars carry the reference's label + solid-fill construction", () => {
    const src = dashboardSrc();
    expect(src).toContain("flex justify-between text-xs");
    expect(src).toContain("text-stone-600 dark:text-stone-400");
    expect(src).toContain("font-semibold text-stone-700 dark:text-stone-300");
    // the retired gradient fills must not return
    expect(src).not.toContain("from-amber-400 to-emerald-500");
  });

  it("the amber tip box renders (the reference's advice row)", () => {
    const src = dashboardSrc();
    expect(src).toContain(
      "mt-4 p-3 rounded-xl bg-amber-50/60 dark:bg-amber-900/10 border border-amber-200/40 dark:border-amber-800/30",
    );
    expect(src).toContain("text-xs text-amber-800 dark:text-amber-300 leading-relaxed");
  });

  it("the gauge overlay carries the reference's construction", () => {
    const src = dashboardSrc();
    expect(src).toContain("absolute inset-0 flex flex-col items-center justify-end pb-1");
    expect(src).toContain("text-3xl font-black");
    expect(src).not.toContain("font-extrabold");
  });
});

describe("session-208 R-7.6e: the Analytics legend order (F-208f)", () => {
  it("the legend disables recharts v3's alphabetical sort (the reference preserves series order: Income first)", () => {
    const src = analyticsSrc();
    expect(src).toContain("<Legend itemSorter={null} />");
    // the income series renders before the expenses series (the order
    // itemSorter={null} now preserves)
    const income = src.indexOf('dataKey="income"');
    const expenses = src.indexOf('dataKey="expenses"');
    expect(income).toBeGreaterThan(-1);
    expect(expenses).toBeGreaterThan(-1);
    expect(income).toBeLessThan(expenses);
  });
});

describe("session-208 R-7.7: the Settings navy/blue tail (F-208d, the F-205b second half)", () => {
  it("SETTINGS_CARD carries the reference's glass genus + accents", async () => {
    const mod = (await import("@/lib/page-layout")) as { SETTINGS_CARD: Record<string, string> };
    expect(mod.SETTINGS_CARD.base).toBe(
      "rounded-xl text-card-foreground bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg",
    );
    expect(mod.SETTINGS_CARD.header).toBe("flex flex-col space-y-1.5 p-6");
    expect(mod.SETTINGS_CARD.title).toBe(
      "font-semibold leading-none tracking-tight flex items-center gap-2 text-primary-navy dark:text-white",
    );
    expect(mod.SETTINGS_CARD.content).toBe("p-6 pt-0 space-y-4");
    expect(mod.SETTINGS_CARD.gdprBox).toBe(
      "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4",
    );
    expect(mod.SETTINGS_CARD.gdprTitle).toBe("font-semibold text-blue-800 dark:text-blue-200 mb-1");
    expect(mod.SETTINGS_CARD.importBox).toBe(
      "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4",
    );
    expect(mod.SETTINGS_CARD.importTitle).toBe(
      "font-semibold text-amber-800 dark:text-amber-200 mb-1",
    );
  });

  it("the settings page consumes the glass genus + the reference's card titles", () => {
    const src = settingsSrc();
    expect(src).toContain("SETTINGS_CARD.base");
    expect(src).toContain("SETTINGS_CARD.header");
    expect(src).toContain("SETTINGS_CARD.title");
    expect(src).toContain("SETTINGS_CARD.content");
    expect(src).toContain("Export Your Data");
    expect(src).toContain("Import Data");
    // the retired stone-card + amber-washed-card constructions must not
    // return (word-bounded: SETTINGS_CARD.base is the new genus)
    expect(src).not.toMatch(/(?<![A-Z_])CARD\.base\b/);
    expect(src).not.toContain("bg-amber-50/60 dark:border-amber-500/20 dark:bg-amber-500/5");
  });

  it("the GDPR box + blue Export button render", () => {
    const src = settingsSrc();
    expect(src).toContain("SETTINGS_CARD.gdprBox");
    expect(src).toContain("w-full bg-blue-600 hover:bg-blue-700");
  });

  it("the Import-warning box renders INSIDE a standard glass card", () => {
    const src = settingsSrc();
    expect(src).toContain("SETTINGS_CARD.importBox");
    expect(src).toContain("Import Warning");
  });

  it("the data-summary badges carry the shadcn Badge genus in the reference's colors", () => {
    const src = settingsSrc();
    expect(src).toContain("bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300");
    expect(src).toContain("bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300");
    expect(src).toContain(
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    );
    expect(src).toContain(
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
    );
    expect(src).not.toContain("rounded-full border border-emerald-500/30");
  });

  it("the Save footer is the reference's bottom row with the amber-gradient button", async () => {
    const src = settingsSrc();
    expect(src).toContain("SETTINGS_CARD.saveRow");
    expect(src).toContain("SETTINGS_CARD.saveButton");
    const mod = (await import("@/lib/page-layout")) as { SETTINGS_CARD: Record<string, string> };
    expect(mod.SETTINGS_CARD.saveRow).toBe("flex justify-end");
    expect(mod.SETTINGS_CARD.saveButton).toContain(
      "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700",
    );
    // the Save button no longer rides the page header
    expect(src).not.toContain("actions={");
  });
});

describe("session-208 R-7.8: the auth-face residuals (F-208e)", () => {
  it("LOGIN_LAYOUT.title/subtitle use the reference's slate tokens (no drifted hexes)", async () => {
    const mod = await layout();
    expect(mod.LOGIN_LAYOUT.title).toBe("text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight");
    expect(mod.LOGIN_LAYOUT.subtitle).toBe("text-slate-500 text-sm sm:text-base font-medium");
  });

  it("the login logo is the reference's image asset in its wrapper construction", async () => {
    const src = loginCardSrc();
    expect(src).toContain("wealthos-logo.png");
    expect(src).toContain("aspect-square h-full w-full object-cover");
    const mod = await layout();
    expect(mod.LOGIN_LAYOUT.logo).toContain("h-20 w-20 sm:h-24 sm:w-24");
    expect(mod.LOGIN_LAYOUT.logo).toContain("ring-white/50");
    expect(mod.LOGIN_LAYOUT.logoWrap).toBe("relative group");
    // the CSS bar-chart mark is retired from the login face
    expect(src).not.toContain("WealthOsMark");
  });

  it("the fetched logo asset exists in public/", () => {
    expect(existsSync(repoFile("public/wealthos-logo.png"))).toBe(true);
  });
});
