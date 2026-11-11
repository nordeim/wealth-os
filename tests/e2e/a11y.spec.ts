import { expect, test, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";

// Session-199: THE A11Y TWO-GATE, recast onto the WealthOS surfaces.
//   1. STRUCTURAL violations must be ZERO — button-name, link-name,
//      label, list, heading-order, every rule outside the sanctioned
//      set. Every open-surface SelectTrigger / icon-only Button carries
//      an accessible name.
//   2. COLOR-CONTRAST + SVG-IMG-ALT nodes must cite the SANCTIONED
//      matchers — the parity palette (amber/stone on the dark gradient
//      surfaces — the reference's own palette, live-extracted) and the
//      recharts genus.
//
// The axe engine rides the DECLARED devDep (package.json: axe-core).

const AXE_PATH = "node_modules/axe-core/axe.min.js";

type Violation = { id: string; targets: string[] };

// The SANCTIONED register — rule → matcher list, every matcher carrying
// its citation. A flagged node matching NONE of them REDs the gate.
const SANCTIONED: Record<string, Array<{ any: string[]; cite: string }>> = {
  "color-contrast": [
    {
      // the amber-on-gradient sidebar + drawer faces — the reference's own
      // palette (verified on its DOM: text-amber-200/stone-300 over the
      // stone-900 gradient)
      // Session-220 (R-17, F-220p): the amber-500 TEXT arm RETIRED —
      // zero live CONTRAST-relevant consumers since F-219k (the
      // remaining amber-500 hits are aria-hidden decorative icons,
      // which axe excludes); a stale arm auto-sanctions a future
      // regression riding it.
      any: ["text-amber-200", "text-amber-400", "text-stone-300", "text-stone-400"],
      cite: "the amber/stone-on-gradient sidebar + muted captions — the reference's own palette",
    },
    {
      // the white-wash family on the dark surfaces. Session-219
      // (F-219a): the amber+white combination is GONE (stone-900 ink
      // now); this umbrella covers the white ink on the DARK surfaces
      // and the F-219b gradient CTAs (emerald/rose — the measured
      // register class).
      any: ["text-white"],
      cite: "white ink on dark surfaces + the emerald/rose gradient CTAs — the reference's own palette",
    },
    // Session-220 (R-17, F-220p): the residual bg-primary /
    // button[type="submit"] arm RETIRED — every live submit now either
    // passes contrast outright (stone-900 on amber since F-219a; white
    // on the #131b33 login navy) or rides the gradient arms below
    // (CTA.emerald/rose). A stale arm auto-sanctions a future
    // white-on-amber regression.
    {
      // Session-219 (R-16, F-219b): the per-page CTA gradient genera —
      // the reference's own measured families: emerald→teal + white
      // (Income/Investments) and rose→red + white (Expenses) ride the
      // F-208a KPI_TONES register class (white-on-gradient, the
      // reference's own palette).
      any: ["from-emerald-500", "from-rose-500"],
      cite: "the per-page CTA gradient genera — the reference's own measured palette (F-219b)",
    },
    {
      // the ACTIVE period chip (bg-amber-500 + white 12px) — the
      // reference's own segmented control genus (live-observed: the 6M
      // chip renders amber with white text)
      any: ["bg-amber-500"],
      cite: "the active period chip — the reference's own palette",
    },
    {
      // the muted micro-captions (the % funded, the synced pill)
      any: ["text-stone-400", "text-stone-500"],
      cite: "the muted caption family — the reference's own palette",
    },
  ],
  "svg-img-alt": [
    {
      // recharts renders role=img SVGs without alt text on every chart
      any: ["recharts"],
      cite: "the recharts genus — library internals",
    },
  ],
};

async function runAxe(page: import("@playwright/test").Page): Promise<Violation[]> {
  await page.addScriptTag({ path: AXE_PATH });
  return page.evaluate(() => {
    const axe = (window as unknown as { axe: { run: () => Promise<{ violations: Array<{ id: string; nodes: Array<{ target: string[] }> }> }> } }).axe;
    return axe.run().then((results) =>
      results.violations.map((v) => ({
        id: v.id,
        targets: v.nodes.map((n) => n.target.join(" ")),
      })),
    );
  });
}

function assertTwoGate(violations: Violation[]): void {
  const structural = violations.filter((v) => !(v.id in SANCTIONED));
  expect(
    structural.map((v) => v.id),
    `structural violations must be zero: ${JSON.stringify(structural)}`,
  ).toEqual([]);

  for (const violation of violations) {
    const matchers = SANCTIONED[violation.id] ?? [];
    for (const target of violation.targets) {
      const matched = matchers.some((m) => m.any.some((needle) => target.includes(needle)));
      expect(
        matched,
        `${violation.id} on "${target}" is not in the sanctioned register`,
      ).toBe(true);
    }
  }
}

// The surfaces — every WealthOS section at desktop + phone, the anon
// auth family, the 404, and the two open-state faces (the mobile drawer
// + the Add Expense dialog).
const SECTIONS = [
  "/Dashboard",
  "/Income",
  "/Expenses",
  "/Accounts",
  "/Investments",
  "/Import",
  "/Analytics",
  "/Goals",
  "/Settings",
];

// Session-220 (R-17, F-220o): the dark-mode two-gate's section set —
// all nine, matching SECTIONS (the fresh-visitor default theme).
const DARK_SECTIONS = [
  "/Dashboard",
  "/Income",
  "/Expenses",
  "/Accounts",
  "/Investments",
  "/Import",
  "/Analytics",
  "/Goals",
  "/Settings",
];

// Session-220 (R-17, F-220p): the DOCUMENTED chart-stroke deviation —
// CHART_COLORS (src/lib/constants.ts: teal #14b8a6, amber #f59e0b,
// red, emerald) measures 2.15-2.5:1 against the light card surface
// (WCAG 1.4.11 non-text contrast wants 3:1). The strokes are the
// reference's live-observed palette (parity-mandated — live-measured
// on its charts), the same documented-deviation posture as the text-
// side sanctions above; axe-core does not evaluate SVG stroke
// contrast, so no register arm is needed — this note IS the citation.
// The dark-mode legs pass (~5.9-6.8:1 on #0a0a0a).

// Session-221 (R-18, F-221f): the two-gate's SCROLL cure — axe only
// evaluates what is (or can be) rendered in view, and the loops' fixed
// 1280×800 / 390×844 viewports never moved: the Settings Export card
// (below the fold since session 208) passed every gate with its 3.38:1
// ink — live A/B on the identical page state: 0 violations unscrolled,
// the failure surfaced once the section scrolled into view. The helper
// steps the app's scroll container (SHELL_LAYOUT.main — <main> carries
// overflow-y-auto) to the bottom in 600px increments with a settle
// between steps (lazy content mounts), then returns to the top so the
// assertion evaluates the WHOLE page.
async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    const scroller =
      document.querySelector("main") ?? document.scrollingElement;
    if (!scroller) return;
    const step = 600;
    for (let y = 0; y < scroller.scrollHeight; y += step) {
      scroller.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    scroller.scrollTo(0, 0);
  });
}

test.describe("a11y two-gate (WealthOS)", () => {
  for (const section of SECTIONS) {
    test(`desktop ${section} — structural zero + sanctioned citations`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      // Session-219 (R-16, F-219c): the app's default is now DARK on
      // app routes — these light-mode legs set the theme EXPLICITLY so
      // the two-gate keeps covering BOTH modes regardless of default.
      await page.addInitScript(() => localStorage.setItem("wealthos-theme", "light"));
      await page.goto(section);
      await page.waitForLoadState("networkidle");
      await scrollThrough(page);
      assertTwoGate(await runAxe(page));
    });

    test(`phone ${section} — structural zero + sanctioned citations`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.addInitScript(() => localStorage.setItem("wealthos-theme", "light"));
      await page.goto(section);
      await page.waitForLoadState("networkidle");
      await scrollThrough(page);
      assertTwoGate(await runAxe(page));
    });
  }

  test("desktop /login (anon) — structural zero + sanctioned citations", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/login");
    await page.waitForLoadState("networkidle");
    // Session-222 (R-19): the F-221f completion — the anon faces join
    // the scroll-before-axe contract (short single-card pages today;
    // the class stays closed if they ever grow).
    await scrollThrough(page);
    assertTwoGate(await runAxe(page));
  });

  test("desktop /signup (anon) — structural zero + sanctioned citations", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/signup");
    await page.waitForLoadState("networkidle");
    await scrollThrough(page);
    assertTwoGate(await runAxe(page));
  });

  test("desktop /reset-password (anon, no token) — structural zero + sanctioned citations", async ({
    page,
  }) => {
    // Session-216 (R-13, F-216f tail): the reset landing was the one
    // auth surface absent from the axe census (login/signup/404 and
    // all nine sections were covered) — its token-less "invalid link"
    // state had never been asserted clean.
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/reset-password");
    await page.waitForLoadState("networkidle");
    await scrollThrough(page);
    assertTwoGate(await runAxe(page));
  });

  test("phone /login (anon) — structural zero + sanctioned citations", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/login");
    await page.waitForLoadState("networkidle");
    await scrollThrough(page);
    assertTwoGate(await runAxe(page));
  });

  test("desktop 404 (anon) — structural zero + sanctioned citations", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/this-page-does-not-exist");
    await scrollThrough(page);
    assertTwoGate(await runAxe(page));
  });

  // Session-222 (R-19, F-222f): the 404's dark arms — the theme seam
  // resolves DARK for any non-auth path with no stored choice, so the
  // fresh-visitor 404 previously rendered its light design under
  // html.dark (the whiplash defect; the reference's SPA serves its 404
  // inside the dark shell). The dark face now asserts its wash AND its
  // axe cleanliness.
  test("desktop 404 (fresh-visitor DARK) — the F-222f dark arms + axe-clean", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/this-page-does-not-exist");
    await expect(page.locator("html")).toHaveClass(/(^| )dark( |$)/);
    const wash = await page.evaluate(() =>
      getComputedStyle(document.querySelector("main.min-h-screen")!).backgroundColor,
    );
    expect(wash).toBe("rgb(10, 10, 10)");
    await scrollThrough(page);
    assertTwoGate(await runAxe(page));
  });

  test("phone /Dashboard with the drawer OPEN — structural zero + sanctioned citations", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/Dashboard");
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    assertTwoGate(await runAxe(page));
  });

  test("desktop /Expenses with the Add Expense dialog OPEN — structural zero + sanctioned citations", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/Expenses");
    await page.getByRole("button", { name: "Add Expense" }).first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    assertTwoGate(await runAxe(page));
  });

  // Session-217 (R-14, F-217n): the two-gate ran light-mode only — the
  // entire F-217c family (white dialog panels with light text in dark
  // mode) was invisible to it. The dark leg writes the persisted theme
  // BEFORE each navigation (the init script runs at document start,
  // before the no-FOUC bootstrap reads it) and re-runs the two-gate.
  // Session-220 (R-17, F-220o): the dark legs now walk ALL NINE
  // sections (dark is the fresh-visitor DEFAULT — the two-leg coverage
  // left seven sections' dark faces unverified; the F-220b missing-arm
  // class is exactly what these legs catch).
  for (const section of DARK_SECTIONS) {
    test(`desktop ${section} DARK — structural zero + sanctioned citations (F-217n/F-220o)`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.addInitScript(() => {
        try {
          localStorage.setItem("wealthos-theme", "dark");
        } catch {
          /* the storage sandbox — the light fallback still runs the gate */
        }
      });
      await page.goto(section);
      await page.waitForLoadState("networkidle");
      expect(await page.evaluate(() => document.documentElement.className)).toContain("dark");
      await scrollThrough(page);
      assertTwoGate(await runAxe(page));
    });
  }

  // Session-224 (R-21, F-224r): the coverage quadrature's missing
  // cell — phone×dark. Dark is the fresh-visitor DEFAULT and mobile
  // the majority posture, yet the section interiors were never
  // axe-checked at 390×844 under .dark (light×desktop ×9, light×phone
  // ×9, dark×desktop ×9 — the family's own history says this gap-class
  // ships real defects: F-217n, F-220o). The mobile-only arms (the
  // lg:hidden header, the stacked grids) are the blind spot closed.
  for (const section of DARK_SECTIONS) {
    test(`phone ${section} DARK — structural zero + sanctioned citations (F-224r)`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.addInitScript(() => {
        try {
          localStorage.setItem("wealthos-theme", "dark");
        } catch {
          /* the storage sandbox — the light fallback still runs the gate */
        }
      });
      await page.goto(section);
      await page.waitForLoadState("networkidle");
      expect(await page.evaluate(() => document.documentElement.className)).toContain("dark");
      await scrollThrough(page);
      assertTwoGate(await runAxe(page));
    });
  }

  test("desktop /Accounts DARK with the Add dialog OPEN — the F-217c cure pinned (F-217n)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      try {
        localStorage.setItem("wealthos-theme", "dark");
      } catch {
        /* see above */
      }
    });
    await page.goto("/Accounts");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: /add (your first )?account/i }).first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    assertTwoGate(await runAxe(page));
  });

  test("axe-core is the declared devDep (not a stray transitive)", () => {
    const pkg = JSON.parse(readFileSync("package.json", "utf8"));
    expect(pkg.devDependencies["axe-core"]).toBeDefined();
  });
});
