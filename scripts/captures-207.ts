// Session-207 captures (R-7): the round's evidence set — the F-207a
// cure (the Synced pill VISIBLE at 390 in the reference's right
// cluster), the converged topbar genus, the drawer footer band + active
// pill (the F-207c withdrawal), the navy-H1 section shells with their
// gradient wash + inner containers, and Import's own navy wash (the
// F-205b import half cured). The captures-206 authenticated pattern:
// login → navigate → LIVE-ASSERT the content → freeze.
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

  // 1. the login face at 1440x900 — the R-7.4 auth-card glass
  //    (border-0 shadow-2xl bg-white/95 + the slate accent bar)
  const auth = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await auth.goto(`${OUR_URL}/login`, { waitUntil: "networkidle" });
  await auth.waitForTimeout(1500);
  const cardCls = await auth
    .locator("div.rounded-2xl")
    .first()
    .getAttribute("class");
  if (!cardCls || !cardCls.includes("shadow-2xl") || !cardCls.includes("bg-white/95")) {
    throw new Error(`login card genus not live: ${cardCls}`);
  }
  await auth.screenshot({ path: path.join(OUT, "23-session207-login-card-glass.png") });
  console.log("[capture] 23-session207-login-card-glass.png — border-0 shadow-2xl bg-white/95 live-asserted");

  // 2. the mobile topbar at 390x844 — the F-207a cure: the pill VISIBLE
  //    beside the theme toggle + hamburger (the reference's right cluster)
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await login(m, OUR_URL);
  await m.goto(`${OUR_URL}/dashboard`, { waitUntil: "domcontentloaded" });
  await m.locator("main").first().waitFor({ state: "visible", timeout: 15000 });
  await m.waitForTimeout(2000);
  const pillVisible = await m.evaluate(() => {
    const header = document.querySelector("header");
    const pill = Array.from(header?.querySelectorAll("span") ?? []).find((s) =>
      s.textContent?.includes("Synced"),
    );
    return pill ? pill.offsetParent !== null : false;
  });
  if (!pillVisible) throw new Error("the Synced pill is NOT visible at 390 — the F-207a cure regressed");
  await m.screenshot({ path: path.join(OUT, "24-session207-mobile-topbar-pill.png") });
  console.log("[capture] 24-session207-mobile-topbar-pill.png — the Synced pill visible in the right cluster at 390 (F-207a cure live-asserted)");

  // 3. the drawer at 390x844 — the footer band + the active pill
  //    (the F-207c withdrawal: the reference renders it too)
  await m.getByRole("button", { name: "Open navigation menu" }).click({ timeout: 5000 });
  await m.waitForTimeout(800);
  const drawer = await m.evaluate(() => {
    const d = document.querySelector('[role="dialog"]');
    if (!d) return { ok: false };
    const footer = d.querySelector("div[class*='border-t']");
    const active = d.querySelector("a[aria-current='page']");
    const signOut = Array.from(d.querySelectorAll("button")).find((b) =>
      b.textContent?.includes("Sign Out"),
    );
    return {
      ok: true,
      footerBand: footer?.className.includes("border-amber-500/20") ?? false,
      activePill: active?.className.includes("from-amber-500/20") ?? false,
      signOut: signOut?.textContent?.includes("Sign Out") ?? false,
    };
  });
  if (!drawer.ok || !drawer.footerBand || !drawer.activePill || !drawer.signOut) {
    throw new Error(`drawer genus not live: ${JSON.stringify(drawer)}`);
  }
  await m.screenshot({ path: path.join(OUT, "25-session207-mobile-drawer-footer.png") });
  console.log("[capture] 25-session207-mobile-drawer-footer.png — the footer band + active pill + Sign Out live-asserted");

  // 4. the Income shell at 1440x900 — the R-7.3 convergence: the warm
  //    gradient wash + the max-w-6xl container + the navy H1
  const d = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await login(d, OUR_URL);
  await d.goto(`${OUR_URL}/income`, { waitUntil: "domcontentloaded" });
  await d.locator("main").first().waitFor({ state: "visible", timeout: 15000 });
  await d.waitForTimeout(2500);
  const income = await d.evaluate(() => {
    const wash = document.querySelector("main div[class*='min-h-screen']");
    const h1 = document.querySelector("h1");
    return {
      wash: wash?.className.includes("via-amber-50/30") ?? false,
      container: wash?.firstElementChild?.className.includes("max-w-6xl") ?? false,
      navyH1: h1?.className.includes("text-primary-navy") ?? false,
    };
  });
  if (!income.wash || !income.container || !income.navyH1) {
    throw new Error(`income shell genus not live: ${JSON.stringify(income)}`);
  }
  await d.screenshot({ path: path.join(OUT, "26-session207-income-shell-navy-h1.png") });
  console.log("[capture] 26-session207-income-shell-navy-h1.png — the gradient wash + max-w-6xl container + text-primary-navy H1 live-asserted");

  // 5. the Import page at 1440x900 — its own navy wash (F-205b's import half)
  await d.goto(`${OUR_URL}/import`, { waitUntil: "domcontentloaded" });
  await d.locator("main").first().waitFor({ state: "visible", timeout: 15000 });
  await d.waitForTimeout(2500);
  const imp = await d.evaluate(() => {
    const wash = document.querySelector("main div[class*='min-h-screen']");
    return {
      navy: wash?.className.includes("to-blue-50") ?? false,
      container: wash?.firstElementChild?.className.includes("max-w-6xl") ?? false,
    };
  });
  if (!imp.navy || !imp.container) {
    throw new Error(`import navy wash not live: ${JSON.stringify(imp)}`);
  }
  await d.screenshot({ path: path.join(OUT, "27-session207-import-navy-wash.png") });
  console.log("[capture] 27-session207-import-navy-wash.png — the slate→blue navy wash + max-w-6xl container live-asserted");

  await browser.close();
}

main().catch((e) => {
  console.error("[capture]", e);
  process.exit(1);
});
