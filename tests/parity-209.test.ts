import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session 209 (R-7.10, the F-209a per-surface card convergence — refining
// F-208g's single-genus belief): every constant below was live-extracted
// from the logged-in reference (agent-browser census, every page walked,
// full class strings + CSSOM rules — the F-209 findings). The reference
// deploys FOUR card families by surface, plus the Quick Actions one-off
// and the Analytics saturated stat row (F-209b). The kept supersets
// (cited): our h2 card titles stay (the reference uses DIV CardTitles;
// our semantic headings keep the a11y heading-order gate green — the
// R-7.7 precedent); our Quick Actions card keeps its h2 + aria-label.

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

const globalsSrc = () => codeOf("src/app/globals.css");
const pagePartsSrc = () => codeOf("src/components/shared/page-parts.tsx");
const dashboardSrc = () => codeOf("src/app/(app)/dashboard/page.tsx");
const analyticsSrc = () => codeOf("src/app/(app)/analytics/page.tsx");
const incomeSrc = () => codeOf("src/app/(app)/income/page.tsx");
const expensesSrc = () => codeOf("src/app/(app)/expenses/page.tsx");
const accountsSrc = () => codeOf("src/app/(app)/accounts/page.tsx");
const importSrc = () => codeOf("src/app/(app)/import/page.tsx");
const goalsSrc = () => codeOf("src/app/(app)/goals/page.tsx");
const investmentsSrc = () => codeOf("src/app/(app)/investments/page.tsx");

const layout = async () =>
  (await import("@/lib/page-layout")) as unknown as Record<string, Record<string, string>>;

describe("session-209 R-7.10a: the four card-family constants (F-209a)", () => {
  it("CARD.base is the reference's WARM-SIMPLE genus (Dashboard mid + Investments)", async () => {
    const mod = (await import("@/lib/page-layout")) as { CARD: Record<string, string> };
    expect(mod.CARD.base).toBe(
      "rounded-xl text-card-foreground bg-gradient-to-br from-white/90 to-stone-50/90 dark:from-stone-900/90 dark:to-stone-950/90 border border-amber-100/50 dark:border-amber-900/30 shadow-xl",
    );
  });

  it("CARD.kpi is the reference's WARM-HOVER genus (via + card-hover + p-6 in-base + backdrop-blur-md)", async () => {
    const mod = (await import("@/lib/page-layout")) as { CARD: Record<string, string> };
    expect(mod.CARD.kpi).toBe(
      "rounded-xl text-card-foreground p-6 card-hover bg-gradient-to-br from-white/90 via-amber-50/20 to-white/90 dark:from-stone-900/90 dark:via-amber-950/10 dark:to-stone-900/90 backdrop-blur-md border border-amber-100/50 dark:border-amber-900/30 shadow-xl",
    );
  });

  it("CARD.padding is the reference's fixed 24px (the md: upsize retired)", async () => {
    const mod = (await import("@/lib/page-layout")) as { CARD: Record<string, string> };
    expect(mod.CARD.padding).toBe("p-6");
  });

  it("GLASS_CARD carries the base + hover variants (the Expenses summary cards append card-hover)", async () => {
    const mod = (await import("@/lib/page-layout")) as { GLASS_CARD: Record<string, string> };
    expect(mod.GLASS_CARD.base).toBe(
      "rounded-xl text-card-foreground bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg",
    );
    expect(mod.GLASS_CARD.hover).toBe(
      "rounded-xl text-card-foreground bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg card-hover",
    );
  });

  it("STOCK_CARD is the reference's shadcn stock card (Accounts, Import)", async () => {
    const mod = (await import("@/lib/page-layout")) as { STOCK_CARD: string };
    expect(mod.STOCK_CARD).toBe("rounded-xl border bg-card text-card-foreground shadow");
  });

  it("QUICK_ACTIONS_CARD is the reference's one-off (via-30, rounded-2xl, amber-200 border)", async () => {
    const mod = (await import("@/lib/page-layout")) as { QUICK_ACTIONS_CARD: string };
    expect(mod.QUICK_ACTIONS_CARD).toBe(
      "bg-gradient-to-br from-white/90 via-amber-50/30 to-white/90 dark:from-stone-900/90 dark:via-amber-950/10 dark:to-stone-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-amber-200/50 dark:border-amber-900/30 p-6",
    );
  });

  it("STAT_GRADIENTS carries the Analytics saturated to-r pairs (F-209b)", async () => {
    const mod = (await import("@/lib/page-layout")) as { STAT_GRADIENTS: Record<string, string> };
    expect(mod.STAT_GRADIENTS.emerald).toBe("bg-gradient-to-r from-emerald-500 to-emerald-600");
    expect(mod.STAT_GRADIENTS.red).toBe("bg-gradient-to-r from-red-500 to-red-600");
    expect(mod.STAT_GRADIENTS.blue).toBe("bg-gradient-to-r from-blue-500 to-blue-600");
  });
});

describe("session-209 R-7.10b: the two primitives (the .card-hover utility + the shadcn tokens)", () => {
  it("globals pins --color-card-foreground + --color-card (the A-209 inert-class cure)", () => {
    const src = globalsSrc();
    expect(src).toContain("--color-card-foreground: #0a0a0a;");
    expect(src).toContain("--color-card: #ffffff;");
  });

  it("the .dark runtime overrides flip both tokens (the reference's :root/.dark mechanism)", () => {
    const src = globalsSrc();
    expect(src).toMatch(/\.dark\s*\{[^}]*--color-card-foreground:\s*#fafafa;/);
    expect(src).toMatch(/\.dark\s*\{[^}]*--color-card:\s*#0a0a0a;/);
  });

  it("the card-hover utility is the reference's CSSOM rule verbatim", () => {
    const src = globalsSrc();
    expect(src).toContain("@utility card-hover");
    expect(src).toContain("transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1)");
    expect(src).toContain("transform: translateY(-2px)");
    // the two shadow layers (the rule body is prettier-formatted multi-line)
    expect(src).toContain("0 20px 25px -5px rgba(0, 0, 0, 0.1)");
    expect(src).toContain("0 10px 10px -5px rgba(0, 0, 0, 0.04)");
  });
});

describe("session-209 R-7.10c: monthlyAverages (F-209b — the Analytics stat math)", () => {
  it("averages the monthly series (income, expenses, net-as-savings)", async () => {
    const mod = (await import("@/lib/finance")) as {
      monthlyAverages: (points: Array<{ label: string; income: number; expenses: number; net: number }>) => {
        income: number;
        expenses: number;
        savings: number;
      };
    };
    const avg = mod.monthlyAverages([
      { label: "a", income: 3000, expenses: 1000, net: 2000 },
      { label: "b", income: 5000, expenses: 2000, net: 3000 },
      { label: "c", income: 4000, expenses: 2500, net: 1500 },
    ]);
    expect(avg.income).toBe(4000);
    expect(avg.expenses).toBe(1833.33);
    expect(avg.savings).toBe(2166.67);
  });

  it("returns zeros for an empty series (no divide-by-zero)", async () => {
    const mod = (await import("@/lib/finance")) as {
      monthlyAverages: (points: Array<{ label: string; income: number; expenses: number; net: number }>) => {
        income: number;
        expenses: number;
        savings: number;
      };
    };
    expect(mod.monthlyAverages([])).toEqual({ income: 0, expenses: 0, savings: 0 });
  });
});

describe("session-209 R-7.10d: the per-surface consumption", () => {
  it("KpiCard wraps in CARD.kpi (p-6 in-base — no padding composition, no relative/overflow chrome)", () => {
    const src = pagePartsSrc();
    expect(src).toContain("cn(CARD.kpi)");
    expect(src).not.toContain('cn(CARD.base, CARD.padding, "relative overflow-hidden")');
  });

  it("dashboard: mid sections keep CARD.base with the cash flow backdrop-blur-md; the bottom row + quick actions carry their own genera", () => {
    const src = dashboardSrc();
    expect(src).toContain('aria-label="Cash Flow Overview"');
    expect(src).toMatch(/cn\(CARD\.base, "backdrop-blur-md", CARD\.padding\)/);
    expect(src).toContain('aria-label="Recent Activity"');
    expect(src).toContain("GLASS_CARD.base");
    expect(src).toContain('aria-label="Quick Actions"');
    expect(src).toContain("QUICK_ACTIONS_CARD");
  });

  it("dashboard: the Quick Action tiles are the reference's shadcn-outline tone buttons (h-16 flex-col, View Reports = TrendingUp)", () => {
    const src = dashboardSrc();
    expect(src).toContain("w-full h-16 flex-col gap-2");
    expect(src).toContain("border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:border-emerald-300");
    expect(src).toContain("border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:border-rose-300");
    expect(src).toContain("border-amber-200 dark:border-amber-900/50 hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:border-amber-300");
    expect(src).toContain("border-blue-200 dark:border-blue-900/50 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:border-blue-300");
    expect(src).toContain('label="View Reports" icon={TrendingUp}');
  });

  it("expenses: the needs/wants/savings summary cards are GLASS_CARD.hover; the content card GLASS_CARD.base", () => {
    const src = expensesSrc();
    expect(src).toContain("GLASS_CARD.hover");
    expect(src).not.toContain("cn(CARD.base");
  });

  it("income + goals render the glass genus", () => {
    expect(incomeSrc()).toContain("GLASS_CARD.base");
    expect(incomeSrc()).not.toContain("cn(CARD.base");
    expect(goalsSrc()).toContain("GLASS_CARD.base");
    expect(goalsSrc()).not.toContain("cn(CARD.base");
  });

  it("accounts + import render the stock card", () => {
    expect(accountsSrc()).toContain("STOCK_CARD");
    expect(accountsSrc()).not.toContain("cn(CARD.base");
    expect(importSrc()).toContain("STOCK_CARD");
    expect(importSrc()).not.toContain("cn(CARD.base");
  });

  it("investments: the chart/table sections stay CARD.base (the warm-simple family)", () => {
    const src = investmentsSrc();
    expect(src).toContain("cn(CARD.base");
  });

  it("analytics: chart sections are glass; the stat row is the reference's three-gradient construction", () => {
    const src = analyticsSrc();
    expect(src).not.toContain("cn(CARD.base");
    expect(src).toContain("GLASS_CARD.base");
    expect(src).toContain("grid md:grid-cols-3 gap-6");
    expect(src).toContain("STAT_GRADIENTS.emerald");
    expect(src).toContain("STAT_GRADIENTS.red");
    expect(src).toContain("STAT_GRADIENTS.blue");
    expect(src).toContain("Avg Monthly Income");
    expect(src).toContain("Avg Monthly Expenses");
    expect(src).toContain("Avg Monthly Savings");
    expect(src).toContain("monthlyAverages");
    // the red card's flipped TrendingUp + the blue Calendar (the reference's icons)
    expect(src).toContain("rotate-180");
    expect(src).toContain("<Calendar className=");
  });
});

describe("session-209 R-7.10e: the retired stone genus is gone from the in-page surfaces", () => {
  it("no (app) page or page-parts carries the retired CARD literals", () => {
    const files = [
      pagePartsSrc(),
      dashboardSrc(),
      analyticsSrc(),
      incomeSrc(),
      expensesSrc(),
      accountsSrc(),
      importSrc(),
      goalsSrc(),
      investmentsSrc(),
    ];
    for (const src of files) {
      // the retired CARD.base trio (a bare token may survive on inner list
      // rows — the genus literal itself must be gone)
      expect(src).not.toContain("border-stone-200/70 bg-white shadow-sm");
      expect(src).not.toContain("p-4 md:p-6");
    }
  });

  it("SETTINGS_CARD keeps its converged glass base (R-7.7's pin, unchanged)", async () => {
    const mod = (await import("@/lib/page-layout")) as { SETTINGS_CARD: Record<string, string> };
    expect(mod.SETTINGS_CARD.base).toBe(
      "rounded-xl text-card-foreground bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg",
    );
  });
});
