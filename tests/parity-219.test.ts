// Session-219 (R-16): the parity-default and perceivability round's
// source pins. Every pin was born RED against the pre-round tree and
// carries its finding's citation. The live-reference measurements this
// round: the amber CTAs compute stone-900 rgb(28,25,23) (NOT white —
// the F-218w citation disproven); the per-page CTA genera are
// emerald→teal+white (Income/Investments), rose→red+white (Expenses),
// amber→yellow+stone-900 (Dashboard/Accounts/Goals/Settings); the
// mobile drawer must scroll internally below ~800px viewport height
// (Sign Out live-measured unreachable at 390×667).
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = (p: string) => readFileSync(p, "utf8");

// ---- F-219a: the amber CTA text genus -------------------------------------

describe("F-219a — the amber CTA text genus (stone-900, not white)", () => {
  it("BUTTONS.primary carries text-stone-900 (the reference's measured genus)", () => {
    const layout = read("src/lib/page-layout.ts");
    const primary = layout.match(/primary:\s*\n?\s*"([^"]+)"/)?.[1] ?? "";
    expect(primary).toContain("text-stone-900");
    expect(primary).not.toContain("text-white");
  });

  it("--color-primary-foreground is the stone-900 ink (#1c1917)", () => {
    const css = read("src/app/globals.css");
    expect(css).toMatch(/--color-primary-foreground:\s*#1c1917/);
  });

  it("the ai-coach user bubble rides the stone-900 ink on amber", () => {
    const coach = read("src/components/shared/ai-coach.tsx");
    expect(coach).not.toMatch(/bg-amber-500 text-white/);
  });
});

// ---- F-219b: the per-page CTA gradient genus -------------------------------

describe("F-219b — the per-page CTA genera", () => {
  it("page-layout exports the three measured CTA constants", () => {
    const layout = read("src/lib/page-layout.ts");
    expect(layout).toMatch(/CTA\s*=\s*\{/);
    expect(layout).toMatch(/from-amber-500 to-yellow-600[^\n]*text-stone-900/);
    expect(layout).toMatch(/from-emerald-500 to-teal-600[^\n]*text-white/);
    expect(layout).toMatch(/from-rose-500 to-red-600[^\n]*text-white/);
  });

  const ctaSites: Array<[string, string, RegExp]> = [
    ["income", "Add Income Source", /CTA\.emerald/],
    ["investments", "Add Investment", /CTA\.emerald/],
    ["expenses", "Add Expense", /CTA\.rose/],
    ["accounts", "Add Account", /CTA\.amber/],
    ["goals", "New Goal", /CTA\.amber/],
  ];
  for (const [page, label, genus] of ctaSites) {
    it(`${page}: the ${label} CTA + its dialog submit ride the measured genus`, () => {
      const src = read(`src/app/(app)/${page}/page.tsx`);
      expect(src).toMatch(genus);
    });
  }
});

// ---- F-219c tail: the a11y register's stale arm retires --------------------

describe("F-219a tail — the a11y register's stale citation retires", () => {
  it("the white-on-amber primary arm no longer sanctions text-white wholesale", () => {
    const spec = read("tests/e2e/a11y.spec.ts");
    // The register's primary arm narrows to the gradient CTA faces that
    // legitimately carry white (the emerald/rose genera) — the bare
    // text-white umbrella retires with the stone-900 cure.
    expect(spec).not.toMatch(/white-on-amber primaries — the reference's own palette/);
  });
});

// ---- F-219h: the mobile drawer internal scroll -----------------------------

describe("F-219h — the drawer scrolls internally below ~800px", () => {
  it("MOBILE_NAV_SHEET.inner carries overflow-y-auto", () => {
    const layout = read("src/lib/page-layout.ts");
    const inner = layout.match(/inner:\s*"([^"]+)"/)?.[1] ?? "";
    expect(inner).toContain("overflow-y-auto");
  });
});

// ---- F-219d/e/f/g: the date-seam completion --------------------------------

describe("F-219d/e/f/g — every stored-date parse routes through toDate", () => {
  it("investments: the purchaseDate prefill routes through toDate (the FIFTH site)", () => {
    const src = read("src/app/(app)/investments/page.tsx");
    expect(src).toMatch(/toDateInputValue\(toDate\(editing\.purchaseDate\)\)/);
    expect(src).not.toMatch(/new Date\(editing\.purchaseDate\)/);
  });

  it("analytics: the series refs route through toDate (the mixed-mode cure)", () => {
    const src = read("src/app/(app)/analytics/page.tsx");
    expect(src).toMatch(/const refDate = React\.useMemo\(\(\) => toDate\(to\)/);
    // the five series seams consume refDate (not the raw new Date(to))
    expect(src).not.toMatch(/cashFlowSeries\(inRange, n, new Date\(to\)\)/);
    expect(src).not.toMatch(/expenseBreakdown\(inRange, new Date\(to\)\)/);
    expect(src).not.toMatch(/budgetCategorySplit\(inRange, new Date\(to\)\)/);
    expect(src).not.toMatch(/spendingByDayOfWeek\(inRange, new Date\(to\)\)/);
    expect(src).not.toMatch(/categoryTrend\(inRange, n, new Date\(to\)/);
    // (the RANGE FILTER's new Date(to).getTime() comparison stays raw by
    // design — UTC instants on both sides, the audit's own carve-out)
  });

  it("goals: the card label routes through toDate", () => {
    const src = read("src/app/(app)/goals/page.tsx");
    expect(src).toMatch(/toDate\(goal\.targetDate\)/);
    expect(src).not.toMatch(/new Date\(goal\.targetDate\)/);
  });

  it("income: the next-payment label routes through toDate", () => {
    const src = read("src/app/(app)/income/page.tsx");
    expect(src).toMatch(/toDate\(source\.nextPaymentDate\)/);
    expect(src).not.toMatch(/new Date\(source\.nextPaymentDate\)/);
  });
});

// ---- F-219i/k/n: the perceivability constants -------------------------------

describe("F-219i/k — the AA constants", () => {
  it("EMPTY_STATE.subtitle carries the AA arms (stone-500 light / stone-400 dark)", () => {
    const layout = read("src/lib/page-layout.ts");
    const subtitle = layout.match(/subtitle:\s*"([^"]+)"/)?.[1] ?? "";
    expect(subtitle).toContain("text-stone-500");
    expect(subtitle).toContain("dark:text-stone-400");
  });

  it("APP_FOOTER carries the AA arms", () => {
    const layout = read("src/lib/page-layout.ts");
    const block = layout.match(/export const APP_FOOTER = \{[\s\S]*?\} as const;/)?.[0] ?? "";
    expect(block).toContain("text-stone-500");
    expect(block).toContain("dark:text-stone-400");
  });

  it("the metadata family's dark arm is stone-400 (the ~30-site sweep)", () => {
    const pages = [
      "expenses", "income", "accounts", "goals", "import",
      "dashboard", "investments",
    ];
    for (const p of pages) {
      const src = read(`src/app/(app)/${p}/page.tsx`);
      expect(src, `${p} still carries the failing dark arm`).not.toMatch(
        /dark:text-stone-500/,
      );
    }
  });

  it("the error boundaries' h1 is the readable slate-500 genus", () => {
    for (const p of ["src/app/error.tsx", "src/app/global-error.tsx"]) {
      const src = read(p);
      expect(src).not.toMatch(/text-slate-300/);
    }
  });

  it("the Quick Actions h2 carries the amber-700 step (2.09:1 → AA)", () => {
    const src = read("src/app/(app)/dashboard/page.tsx");
    expect(src).not.toMatch(/text-xl font-bold text-amber-500/);
  });

  it("the import preview income amounts ride emerald-700 (the F-218j step)", () => {
    const src = read("src/app/(app)/import/page.tsx");
    expect(src).not.toMatch(/text-emerald-600\b/);
  });
});

describe("F-219n — the ring leftovers", () => {
  it("the dashboard quick-action carries ring-2", () => {
    const src = read("src/app/(app)/dashboard/page.tsx");
    expect(src).not.toMatch(/focus-visible:ring-1/);
  });

  it("the import dropzone's focus ring is the token genus", () => {
    const src = read("src/app/(app)/import/page.tsx");
    expect(src).not.toMatch(/ring-amber-400\/40/);
  });
});

// ---- F-219j: the AI coach announcements -------------------------------------

describe("F-219j — the coach announces", () => {
  it("the messages container is the polite live region", () => {
    const src = read("src/components/shared/ai-coach.tsx");
    expect(src).toMatch(/aria-live="polite"/);
  });

  it("the busy row carries announced text (not just dots)", () => {
    const src = read("src/components/shared/ai-coach.tsx");
    expect(src).toMatch(/Coach is thinking|sr-only/);
  });
});

// ---- F-219l/m/o/p: the API-layer pins ---------------------------------------

describe("F-219l — the reset-family bucket keys are disjoint", () => {
  it("/api/reset keys data-reset: and /api/auth/reset-password keys pw-reset:", () => {
    const data = read("src/app/api/reset/route.ts");
    const pw = read("src/app/api/auth/reset-password/route.ts");
    expect(data).toMatch(/data-reset:/);
    expect(pw).toMatch(/pw-reset:/);
  });
});

describe("F-219m — the sessioned CRUD family carries buckets", () => {
  const writeRoutes = [
    "src/app/api/transactions/route.ts",
    "src/app/api/accounts/route.ts",
    "src/app/api/budgets/route.ts",
    "src/app/api/goals/route.ts",
    "src/app/api/investments/route.ts",
    "src/app/api/income-sources/route.ts",
  ];
  for (const r of writeRoutes) {
    it(`${r.split("/").slice(-2).join("/")}: POST carries the writes bucket`, () => {
      const src = read(r);
      expect(src).toMatch(/rateLimit\(/);
    });
  }

  it("the heavy EXPLICIT reads carry buckets; the per-navigation aggregate does not (the F-219m refinement)", () => {
    for (const r of [
      "src/app/api/export/route.ts",
      "src/app/api/search/route.ts",
    ]) {
      expect(read(r), `${r}`).toMatch(/rateLimit\(/);
    }
    // The dashboard aggregate read fires on EVERY navigation — the
    // sweep/census toolchain and fast real navigation legitimately
    // exceed any per-IP cap (the maiden census run tripped it
    // mid-run). It stays unbucketed BY DESIGN; the decode is pinned
    // in the route's own docblock.
    const dash = read("src/app/api/dashboard/route.ts");
    expect(dash).toMatch(/NO bucket here[\s\S]*?by design/);
    expect(dash).not.toMatch(/rateLimit\(/);
  });
});

describe("F-219o — the logout gate lowercases (the family seam)", () => {
  it("the content-type check is case-insensitive", () => {
    const src = read("src/app/api/auth/logout/route.ts");
    expect(src).toMatch(/toLowerCase\(\)/);
  });
});

describe("F-219p — moneyField normalizes to 2dp", () => {
  it("the field builder rounds at the boundary", async () => {
    const { transactionCreateSchema } = await import("@/lib/schemas");
    const parsed = transactionCreateSchema.safeParse({
      description: "2dp probe",
      amount: 3.14159,
      type: "expense",
      category: "Other",
      date: "2026-11-10",
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.amount).toBe(3.14);
  });
});

// ---- F-219r/s/u/v: the low tail ---------------------------------------------

describe("F-219r — the four analytics sections gate their empty states", () => {
  it("the bare-chart sections carry EmptyState gates", () => {
    const src = read("src/app/(app)/analytics/page.tsx");
    // Four more EmptyState faces beyond the existing two.
    const count = (src.match(/<EmptyState/g) ?? []).length;
    expect(count).toBeGreaterThanOrEqual(6);
  });
});

describe("F-219s — the Analytics Export rides the outline genus", () => {
  it("the export button is no longer the amber default variant", () => {
    const src = read("src/app/(app)/analytics/page.tsx");
    const exportSite = src.match(/<Button[^>]*onClick=\{exportCsv\}[^>]*>/)?.[0] ?? "";
    expect(exportSite).toContain("outline");
  });
});

describe("F-219u — the dead constants retire", () => {
  it("BUTTONS.outline and BUTTONS.ghost are gone (zero consumers)", () => {
    const layout = read("src/lib/page-layout.ts");
    const buttons = layout.match(/export const BUTTONS = \{[\s\S]*?\} as const;/)?.[0] ?? "";
    expect(buttons).not.toMatch(/\boutline:/);
    expect(buttons).not.toMatch(/\bghost:/);
  });
});

describe("F-219v — InfoCallout is the polite status", () => {
  // Session-233 (R-30, F-233c): the role moved — a live region that
  // ARRIVES with its content is not announced (the F-218h genus), so
  // the InfoCallout became the visual only and the verify view carries
  // an ALWAYS-MOUNTED sr-only status region (the F-232e form). The
  // F-219v contract stands — the resend confirmation announces
  // politely — at its new seam; pinned in parity-233.
  it("the polite status role rides the always-mounted region, not the banner", () => {
    const src = read("src/components/layout/login-card.tsx");
    const region = src.match(
      /<div role="status"[\s\S]{0,400}?<\/div>/,
    )?.[0] ?? "";
    expect(region).not.toBe("");
    expect(region).toMatch(/aria-live="polite"/);
    expect(region).toMatch(/sr-only/);
    const fn = src.match(/function InfoCallout[\s\S]{0,600}/)?.[0] ?? "";
    expect(fn).not.toContain('role="status"');
  });
});
