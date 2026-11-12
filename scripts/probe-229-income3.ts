// Session-229 probe (M1 final, in-DOM): the reference's Analytics
// Income tab — every visible element in the MAIN content region
// (x > 300, below the header), zero demo data.
import { chromium, type Page } from "@playwright/test";
import * as path from "node:path";

if (path.basename(process.argv[1] ?? "") !== "probe-229-income3.ts") process.exit(0);

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
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
try {
  await login(page);
  await page.goto(`${REF}/Analytics`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(4500);
  const incomeTab = page.locator('[role="tab"]:has-text("Income"), button:has-text("Income")').first();
  await incomeTab.click();
  await page.waitForTimeout(2200);
  const dump = await page.evaluate(() => {
    const out: Array<Record<string, string>> = [];
    for (const el of Array.from(document.querySelectorAll<HTMLElement>("main *, [role=main] *"))) {
      const r = el.getBoundingClientRect();
      if (r.width < 40 || r.height < 8) continue;
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      const ownText = Array.from(el.childNodes)
        .map((n) => (n.nodeType === 3 ? n.textContent?.trim() : ""))
        .join("")
        .slice(0, 60);
      if (ownText || el.tagName === "SVG" || (el.getAttribute("class") ?? "").match(/recharts|chart/)) {
        out.push({
          tag: el.tagName,
          y: String(Math.round(r.top)),
          h: String(Math.round(r.height)),
          text: ownText,
          cls: (el.getAttribute("class") ?? "").slice(0, 110),
        });
      }
    }
    return out.slice(0, 40);
  });
  console.log("[income MAIN dump]", JSON.stringify(dump, null, 1));
} catch (err) {
  console.log("[probe] FAILED:", String(err));
} finally {
  await browser.close();
}
