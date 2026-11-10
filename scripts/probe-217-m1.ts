// Session-217 M-1 focused live repro (leg 2): open Expenses → Filters →
// click the Category select → click an option BY MOUSE → is the filter applied?
import { chromium, type Page } from "@playwright/test";

if (!process.argv[1]?.endsWith("probe-217-m1.ts")) process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

async function login(page: Page) {
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(1500);
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const report: string[] = [];
  await login(page);
  await page.goto(`${BASE}/expenses`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);

  await page.getByRole("button", { name: /filters/i }).click();
  await page.waitForTimeout(700);
  const popOpen = await page.locator('[aria-label="Expense filters"]').count();
  report.push(`popover open after Filters click: ${popOpen === 1}`);

  const sel = page.locator("#expense-category-filter");
  report.push(`select trigger present: ${(await sel.count()) === 1}`);
  await sel.click();
  await page.waitForTimeout(700);
  const options = await page.locator('[role="option"]').allTextContents();
  report.push(`options rendered: ${JSON.stringify(options.slice(0, 5))}`);

  if (options.length > 2) {
    const target = options[2].trim();
    await page.locator('[role="option"]').nth(2).click();
    await page.waitForTimeout(800);
    const after = await page.evaluate(() => {
      const pop = document.querySelector('[aria-label="Expense filters"]');
      const sel2 = document.querySelector("#expense-category-filter");
      return {
        popoverStillMounted: !!pop,
        selectText: sel2?.textContent?.trim() ?? null,
      };
    });
    report.push(`AFTER MOUSE PICK "${target}": popover mounted=${after.popoverStillMounted}, select="${after.selectText}"`);
    const history = await page.locator("h2").first().textContent().catch(() => null);
    report.push(`history heading after pick: ${history}`);
    await page.screenshot({ path: "/home/z/my-project/scripts/m1-after-mouse-pick.png" });
  }

  console.log(report.join("\n"));
  await browser.close();
}

main().catch((e) => { console.error("PROBE FAILED:", e); process.exit(1); });
