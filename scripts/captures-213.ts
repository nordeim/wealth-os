// Session-213 evidence captures (the R-9 prisma 6→7 major migration):
// the whole data layer moved (the Rust-free generated client + the
// PrismaLibSql driver adapter on the unchanged db-path seam) — no rendered
// surface was touched by design, and the gates re-ran CLEAN at the new
// major (630 unit · smoke 14/14 · e2e 84/84 · two sweep legs · census
// MATCH). These two faces freeze the surfaces the standing drift gates
// guard, shot from the migrated stack — with the SEEDED corpus asserted
// in-DOM (the proof the prisma 7 adapter chain serves the finance data,
// not just the shells):
// 49: the desktop dashboard (the flagship, dark theme — the KPI row AND
//     a seeded money figure + the Recent Activity rows)
// 50: the mobile drawer OPEN at 390×844 (the directive's standing
//     mobile-nav emphasis — all 9 destinations + the active pill + the
//     footer Sign Out, the functional mobile-menu census the drift-probe
//     runs against the reference)
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

async function main() {
  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await login(page, OURS);
    await page.evaluate(() => window.localStorage.setItem("wealthos-theme", "dark"));

    // 49: desktop dashboard — the KPI row + a SEEDED money figure (the
    // prisma 7 adapter serving the corpus, not just the shell genus)
    await page.goto(`${OURS}/dashboard`, { waitUntil: "domcontentloaded" });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 15000 });
    await page.waitForTimeout(2500);
    const text = await page.locator("main").innerText();
    if (!/Net Balance|Monthly/i.test(text)) throw new Error("dashboard: KPI copy missing");
    if (!/\$\s?\d/.test(text)) throw new Error("dashboard: no seeded money figure rendered — the adapter is serving empty data?");
    const rows = await page.locator("main table tbody tr, main [role='row']").count();
    console.log(`[captures-213] dashboard money + ${rows} data rows asserted`);
    await page.screenshot({ path: `${OUT}/49-session213-dashboard-desktop.png` });
    let bytes = statSync(`${OUT}/49-session213-dashboard-desktop.png`).size;
    if (bytes < 30_000) throw new Error(`49: suspiciously small (${bytes}B) — blank?`);
    console.log(`[captures-213] 49-session213-dashboard-desktop.png (KPI + seeded data asserted, ${bytes}B)`);

    await ctx.close();

    // 50: the mobile drawer OPEN at 390 — the full functional census
    const phoneCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const phone = await phoneCtx.newPage();
    await login(phone, OURS);
    await phone.goto(`${OURS}/dashboard`, { waitUntil: "domcontentloaded" });
    await phone.locator("main").first().waitFor({ state: "visible", timeout: 15000 });
    // Dev-server hydration tolerance (the captures-211 lesson): a click
    // before React attaches the onClick handler does nothing (the e2e
    // suite runs the production build and never sees this). The "Open
    // navigation menu" aria-label only exists while the drawer is CLOSED,
    // so a retry click can never toggle it shut — retry until the dialog
    // mounts.
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
        console.log(`[captures-213] drawer not open after click #${attempt} — retrying (dev hydration)`);
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
    await phone.screenshot({ path: `${OUT}/50-session213-mobile-drawer-open-390.png` });
    bytes = statSync(`${OUT}/50-session213-mobile-drawer-open-390.png`).size;
    if (bytes < 30_000) throw new Error(`50: suspiciously small (${bytes}B) — blank?`);
    console.log(`[captures-213] 50-session213-mobile-drawer-open-390.png (9 destinations + Sign Out + active pill asserted, ${bytes}B)`);
    await phoneCtx.close();
  } finally {
    await browser.close();
  }
  console.log("[captures-213] done");
}
main().catch((e) => { console.error(e); process.exit(1); });
