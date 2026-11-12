// Session-231 probe 3: walk the reference's /Analytics TABS (Overview /
// Expenses / Income / Investments) and dump each tab's card-title census
// + svg fills — locating the day-of-week surface wherever it lives.
import { chromium, type Page } from "@playwright/test";
import * as path from "node:path";

if (path.basename(process.argv[1] ?? "") !== "probe-231c.ts") process.exit(0);

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

async function dumpTab(label: string) {
  // tab triggers are role=tab in this genus (native-ARIA tabs)
  const tab = page.getByRole("tab", { name: label }).first();
  await tab.click({ timeout: 15000 });
  await page.waitForTimeout(2500);
  const report = await page.evaluate(() => {
    const main = document.querySelector("main") ?? document.body;
    // card titles: the biggest-weight short text lines (h1-4 + bold p/div)
    const heads = Array.from(main.querySelectorAll<HTMLElement>("h1,h2,h3,h4"))
      .map((h) => (h.textContent ?? "").replace(/\s+/g, " ").trim())
      .filter((t) => t && t !== "WealthOS" && t !== "Analytics & Reports");
    const fills: Record<string, number> = {};
    for (const s of Array.from(main.querySelectorAll("path[fill], rect[fill]"))) {
      const f = s.getAttribute("fill") ?? "?";
      fills[f] = (fills[f] ?? 0) + 1;
    }
    const text = (main.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 900);
    return { heads, fills, text };
  });
  console.log(`[tab ${label}]`, JSON.stringify(report, null, 1));
}

try {
  await login(page);
  await page.goto(`${REF}/Analytics`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(5000);
  for (const t of ["Expenses", "Income", "Investments"]) {
    await dumpTab(t);
  }
} catch (err) {
  console.log("[probe-231c] FAILED:", String(err));
} finally {
  await browser.close();
}
