// Session-229 exploratory companion (L2): what DO the reference's
// Add/Edit buttons open? Dump each candidate's effect: new [role=dialog],
// [data-radix-popper-content-wrapper], sheets, or navigation.
import { chromium, type Page } from "@playwright/test";
import * as path from "node:path";

if (path.basename(process.argv[1] ?? "") !== "probe-229-dialog2.ts") process.exit(0);

const REF = "https://wealth-os-d93bd04e.base44.app";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

async function login(page: Page) {
  await page.goto(`${REF}/login`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('input[type="email"]', { timeout: 30000 });
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 45000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(3000);
}

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();
try {
  await login(page);
  for (const route of ["/Expenses", "/Goals", "/Accounts"]) {
    await page.goto(`${REF}${route}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(4000);
    const before = await page
      .locator("button")
      .allTextContents()
      .then((xs) => xs.map((x) => x.trim().slice(0, 40)).filter(Boolean));
    console.log(`\n[${route}] buttons:`, JSON.stringify(before));
    // Try every visible button that is not a menu/nav toggle.
    const cands = await page.locator("main button, button").all();
    for (let i = 0; i < cands.length; i++) {
      const btn = cands[i];
      const label = ((await btn.textContent().catch(() => "")) ?? "").trim().slice(0, 30);
      if (!label) continue;
      if (/menu|sign out|synced/i.test(label)) continue;
      const urlBefore = page.url();
      await btn.click().catch(() => {});
      await page.waitForTimeout(1500);
      const dialog = await page.locator('[role="dialog"], [data-state="open"]').count();
      const urlAfter = page.url();
      if (dialog > 0 || urlAfter !== urlBefore) {
        console.log(`[${route}] "${label}" → dialog=${dialog} url=${urlAfter}`);
        const dlg = page.locator('[role="dialog"]').first();
        if (await dlg.count()) {
          const read = await dlg.evaluate((el) => {
            const kids = Array.from(el.children).slice(0, 2).map((k) => ({
              tag: k.tagName,
              cls: (k.getAttribute("class") ?? "").slice(0, 220),
              textAlign: getComputedStyle(k).textAlign,
            }));
            return { cls: el.getAttribute("class")?.slice(0, 220), kids };
          });
          console.log(JSON.stringify(read, null, 2));
        }
        await page.goto(`${REF}${route}`, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(2500);
      } else {
        await page.keyboard.press("Escape");
        await page.waitForTimeout(300);
      }
    }
  }
} catch (err) {
  console.log("[probe] FAILED:", String(err));
} finally {
  await browser.close();
}
