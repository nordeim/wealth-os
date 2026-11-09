// Session-211 evidence captures (the R-4.5 gate:full-reactivation round +
// the F-211a package-identity cure): three faces, each with a live DOM
// assertion before the shot + the non-blank pixel check after. The round
// changed no rendered surface (docs + manifest identity only) — these faces
// freeze the surfaces the NOW-ACTIVE drift gates guard, from the seeded
// demo corpus the chain restores.
// 44: the desktop dashboard (the flagship, dark theme — the reference's
//     app-shell genus the sweep matches per-page)
// 45: the mobile drawer OPEN at 390×844 (the directive's standing
//     mobile-nav emphasis — all 9 destinations + the active pill + the
//     footer Sign Out, the functional mobile-menu census the drift-probe
//     runs against the reference)
// 46: the investments gradient KPIs (an R-7 converged face — the
//     standing genus the active sweep tables now guard)
import { chromium } from "@playwright/test";
import { statSync } from "node:fs";
import { login } from "./sweep";

const OURS = process.env.OUR_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";

const SECTIONS = [
  "Dashboard",
  "Income",
  "Expenses",
  "Accounts",
  "Investments",
  "Import",
  "Analytics",
  "Goals",
  "Settings",
];

async function shot(
  page: import("@playwright/test").Page,
  path: string,
  url: string,
  assert: () => Promise<void>,
) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 15000 });
  await page.waitForTimeout(2500);
  await assert();
  await page.screenshot({ path });
  const bytes = statSync(path).size;
  if (bytes < 30_000) throw new Error(`${path}: suspiciously small (${bytes}B) — blank?`);
  console.log(`[captures-211] ${path} (asserted, ${bytes}B)`);
}

async function main() {
  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await login(page, OURS);
    await page.evaluate(() => window.localStorage.setItem("wealthos-theme", "dark"));

    // 44: desktop dashboard — the KPI row + the cash flow card render (seeded)
    await shot(page, `${OUT}/44-session211-dashboard-desktop.png`, `${OURS}/dashboard`, async () => {
      const text = await page.locator("main").innerText();
      if (!/Net Balance|Monthly/i.test(text)) throw new Error("dashboard: KPI copy missing");
    });

    // 46: investments — the three gradient KPI cards render (seeded)
    await shot(page, `${OUT}/46-session211-investments-gradients.png`, `${OURS}/investments`, async () => {
      const text = await page.locator("main").innerText();
      if (!/Total Investments|Portfolio/i.test(text)) {
        throw new Error(`investments: KPI copy missing (got: ${text.slice(0, 120)})`);
      }
    });

    await ctx.close();

    // 45: the mobile drawer OPEN at 390 — the full functional census
    const phoneCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const phone = await phoneCtx.newPage();
    await login(phone, OURS);
    await phone.goto(`${OURS}/dashboard`, { waitUntil: "domcontentloaded" });
    await phone.locator("main").first().waitFor({ state: "visible", timeout: 15000 });
    // Dev-server hydration tolerance: a click before React attaches the
    // onClick handler does nothing (the e2e suite runs the production
    // build and never sees this). The "Open navigation menu" aria-label
    // only exists while the drawer is CLOSED, so a retry click can never
    // toggle it shut — retry until the dialog mounts.
    await phone.waitForLoadState("networkidle");
    await phone.waitForTimeout(3000);
    const dialog = phone.getByRole("dialog");
    let drawerOpen = false;
    for (let attempt = 1; attempt <= 4 && !drawerOpen; attempt++) {
      const trigger = phone.getByRole("button", { name: "Open navigation menu" });
      await trigger.waitFor({ state: "visible", timeout: 10000 });
      await trigger.click();
      try {
        await dialog.waitFor({ state: "visible", timeout: 4000 });
        drawerOpen = true;
      } catch {
        console.log(`[captures-211] drawer not open after click #${attempt} — retrying (dev hydration)`);
        await phone.waitForTimeout(1500);
      }
    }
    if (!drawerOpen) throw new Error("drawer never opened after 4 clicks");
    for (const label of SECTIONS) {
      await dialog.getByRole("link", { name: label, exact: true }).waitFor({ state: "visible", timeout: 5000 });
    }
    await phone.getByRole("button", { name: "Sign Out" }).waitFor({ state: "visible", timeout: 5000 });
    const activePill = await dialog
      .getByRole("link", { name: "Dashboard", exact: true })
      .getAttribute("class");
    if (!activePill || !/amber|bg-white|font-semibold/i.test(activePill)) {
      throw new Error(`drawer: the active pill class missing on Dashboard (got: ${activePill?.slice(0, 80)}`);
    }
    await phone.waitForTimeout(400);
    await phone.screenshot({ path: `${OUT}/45-session211-mobile-drawer-open-390.png` });
    const bytes = statSync(`${OUT}/45-session211-mobile-drawer-open-390.png`).size;
    if (bytes < 30_000) throw new Error(`45: suspiciously small (${bytes}B) — blank?`);
    console.log(`[captures-211] 45-session211-mobile-drawer-open-390.png (9 destinations + Sign Out + active pill asserted, ${bytes}B)`);
    await phoneCtx.close();
  } finally {
    await browser.close();
  }
  console.log("[captures-211] done");
}
main().catch((e) => { console.error(e); process.exit(1); });
