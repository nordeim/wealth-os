// Session-206 captures (R-4.3): the round's evidence pair — the
// investments page (the interior census's largest standing genus: the
// empty-state construction delta, mainH -649 at desktop) + our mobile
// topbar with the drawer open (the round's mobile-nav decode: our
// labeled hamburger + the 9 destinations + the Synced pill placement
// the reference carries in its right cluster). The captures-205
// authenticated pattern: login → navigate → LIVE-ASSERT the content
// → freeze.
import { mkdirSync } from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const OUR_URL = process.env.OUR_URL ?? "http://localhost:3000";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";
const OUT = path.resolve(import.meta.dirname, "../docs/screenshots");

async function login(page: import("@playwright/test").Page, base: string) {
  await page.goto(`${base}/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(1500);
}

async function main(): Promise<void> {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  // 1. the investments page at 1440x900 — the census's largest genus
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await login(page, OUR_URL);
  await page.goto(`${OUR_URL}/investments`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 15000 });
  await page.waitForTimeout(2500);
  const heading = page.getByRole("heading", { name: "Investments", exact: true }).first();
  await heading.waitFor({ state: "visible", timeout: 10000 });
  const bodyText = (await page.locator("main").innerText()).replace(/\s+/g, " ");
  if (!bodyText.includes("0 holdings")) throw new Error("investments: the empty-state KPI '0 holdings' not live");
  if (!bodyText.includes("Portfolio Value")) throw new Error("investments: the Portfolio Value KPI not live");
  await page.screenshot({ path: path.join(OUT, "21-session206-investments-census.png") });
  console.log("[capture] 21-session206-investments-census.png — Investments heading + '0 holdings' + Portfolio Value live-asserted");

  // 2. the mobile topbar + open drawer at 390x844 — the mobile-nav decode
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await login(m, OUR_URL);
  await m.goto(`${OUR_URL}/dashboard`, { waitUntil: "domcontentloaded" });
  await m.locator("main").first().waitFor({ state: "visible", timeout: 15000 });
  await m.waitForTimeout(2000);
  await m.getByRole("button", { name: "Open navigation menu" }).click({ timeout: 5000 });
  await m.waitForTimeout(800);
  const drawerText = (await m.locator("body").innerText()).replace(/\s+/g, " ");
  const destinations = ["Dashboard", "Income", "Expenses", "Accounts", "Investments", "Import", "Analytics", "Goals", "Settings"];
  for (const d of destinations) {
    if (!drawerText.includes(d)) throw new Error(`mobile drawer: destination ${d} not live`);
  }
  await m.screenshot({ path: path.join(OUT, "22-session206-mobile-topbar-drawer.png") });
  console.log("[capture] 22-session206-mobile-topbar-drawer.png — the accessible hamburger opened the drawer; all 9 destinations live-asserted");

  await browser.close();
}

main().catch((e) => {
  console.error("[capture]", e);
  process.exit(1);
});
