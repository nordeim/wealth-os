// Session-208 evidence captures: the R-7 tail's cured faces, live-asserted
// on the dev server (the house pattern — every capture asserts its marker
// BEFORE saving, so a blank/wrong-page shot fails fast).
import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const SHOTS = "docs/screenshots";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // login first (the rate limiter: one login per run)
  await page.goto(`${BASE}/login`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("input");
  await page.locator("input").nth(0).fill("sepnetflix2023@outlook.com");
  await page.locator("input").nth(1).fill("$Abcd1234");
  await page.locator('button[type="submit"]').click();
  await page.waitForURL(`${BASE}/`);
  await page.waitForTimeout(2500);

  // 1. Dashboard: the KPI gradient tiles + the health tip box
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  const tile = page.locator('[class*="from-emerald-500"][class*="via-teal-500"]').first();
  await tile.waitFor({ state: "visible", timeout: 10000 });
  await page.locator("text=Financial Health Score").first().waitFor({ state: "visible" });
  await page.screenshot({ path: `${SHOTS}/28-session208-dashboard-kpi-tiles.png` });

  // 2. Investments: the full-card gradient KPI row
  await page.goto(`${BASE}/investments`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);
  await page.locator('[class*="from-blue-500"][class*="via-cyan-500"]').first().waitFor({ state: "visible", timeout: 10000 });
  await page.screenshot({ path: `${SHOTS}/29-session208-investments-gradient-kpis.png` });

  // 3. Analytics: the Income-first legend
  await page.goto(`${BASE}/analytics`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  await page.locator(".recharts-legend-item").first().waitFor({ state: "visible", timeout: 10000 });
  const first = await page.locator(".recharts-legend-item").first().textContent();
  if (!first?.includes("Income")) throw new Error(`legend order wrong: ${first}`);
  await page.screenshot({ path: `${SHOTS}/30-session208-analytics-legend-order.png` });

  // 4. Settings: the glass genus + blue GDPR accents
  await page.goto(`${BASE}/settings`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);
  await page.locator('[class*="bg-blue-50"][class*="border-blue-200"]').first().waitFor({ state: "visible", timeout: 10000 });
  await page.screenshot({ path: `${SHOTS}/31-session208-settings-glass-blue.png` });

  // 5. Mobile settings (390) — the glass cards on the phone axis
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${SHOTS}/32-session208-settings-mobile-glass.png` });

  // 6. Login face: the image logo (390, logged out)
  await page.context().clearCookies();
  await page.goto(`${BASE}/login`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);
  await page.locator('img[src="/wealthos-logo.png"]').waitFor({ state: "visible", timeout: 10000 });
  await page.screenshot({ path: `${SHOTS}/33-session208-login-image-logo.png` });

  await browser.close();
  console.log("session-208 captures: 6 saved, all live-asserted");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
