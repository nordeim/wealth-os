import { expect, test } from "@playwright/test";
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
      any: ["text-amber-200", "text-amber-400", "text-stone-300", "text-stone-400", "text-amber-500"],
      cite: "the amber/stone-on-gradient sidebar + muted captions — the reference's own palette",
    },
    {
      // the white-wash family on the dark surfaces
      any: ["text-white"],
      cite: "white-on-amber primaries — the reference's own palette",
    },
    {
      // the amber primary button family (bg-primary = #f59e0b + white
      // bold text) — the reference's own "Add Transaction" genus
      // (live-observed: amber gradient + white bold label)
      any: ["bg-primary"],
      cite: "the amber primary buttons — the reference's own palette",
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

test.describe("a11y two-gate (WealthOS)", () => {
  for (const section of SECTIONS) {
    test(`desktop ${section} — structural zero + sanctioned citations`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(section);
      await page.waitForLoadState("networkidle");
      assertTwoGate(await runAxe(page));
    });

    test(`phone ${section} — structural zero + sanctioned citations`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(section);
      await page.waitForLoadState("networkidle");
      assertTwoGate(await runAxe(page));
    });
  }

  test("desktop /login (anon) — structural zero + sanctioned citations", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/login");
    await page.waitForLoadState("networkidle");
    assertTwoGate(await runAxe(page));
  });

  test("desktop /signup (anon) — structural zero + sanctioned citations", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/signup");
    await page.waitForLoadState("networkidle");
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
    assertTwoGate(await runAxe(page));
  });

  test("phone /login (anon) — structural zero + sanctioned citations", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/login");
    await page.waitForLoadState("networkidle");
    assertTwoGate(await runAxe(page));
  });

  test("desktop 404 (anon) — structural zero + sanctioned citations", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/this-page-does-not-exist");
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

  test("axe-core is the declared devDep (not a stray transitive)", () => {
    const pkg = JSON.parse(readFileSync("package.json", "utf8"));
    expect(pkg.devDependencies["axe-core"]).toBeDefined();
  });
});
