// Session-229 probe (M1/L4 final): the reference's Analytics Income tab
// DOM (zero data — what renders instead of a chart?) + the Overview
// tab's full card list with any captions.
import { chromium, type Page } from "@playwright/test";
import * as path from "node:path";

if (path.basename(process.argv[1] ?? "") !== "probe-229-income.ts") process.exit(0);

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

  // Income tab deep dump.
  const incomeTab = page.locator('[role="tab"]:has-text("Income"), button:has-text("Income")').first();
  await incomeTab.click();
  await page.waitForTimeout(2000);
  const incomeDump = await page.evaluate(() => {
    const main = document.querySelector("main") ?? document.body;
    // The active tab panel: find the visible panel under the tab bar.
    const panels = Array.from(main.querySelectorAll<HTMLElement>('[role="tabpanel"], div')).filter((el) => {
      const cs = getComputedStyle(el);
      return cs.display !== "none" && el.offsetHeight > 100 && el.offsetWidth > 200;
    });
    // Take the LAST big visible container (the content area).
    const content = panels[panels.length - 1] ?? main;
    const walk = (el: HTMLElement, depth: number): Array<Record<string, string>> => {
      const out: Array<Record<string, string>> = [];
      if (depth > 5) return out;
      const ownText = Array.from(el.childNodes)
        .map((n) => (n.nodeType === 3 ? n.textContent?.trim() : ""))
        .join("")
        .slice(0, 60);
      if (ownText) {
        out.push({
          depth: String(depth),
          tag: el.tagName,
          text: ownText,
          cls: (el.getAttribute("class") ?? "").slice(0, 120),
        });
      }
      for (const c of Array.from(el.children)) out.push(...walk(c as HTMLElement, depth + 1));
      return out;
    };
    return walk(content, 0).slice(0, 30);
  });
  console.log("[income tab dump]", JSON.stringify(incomeDump, null, 1));

  // Overview tab card list.
  const overviewTab = page.locator('[role="tab"]:has-text("Overview"), button:has-text("Overview")').first();
  await overviewTab.click();
  await page.waitForTimeout(1800);
  const overviewCards = await page.evaluate(() => {
    const heads = Array.from(document.querySelectorAll<HTMLElement>("main h3, main h2"));
    return heads.map((h) => {
      const container = h.closest("section, div.rounded-xl, div.rounded-2xl") as HTMLElement | null;
      const smalls = container
        ? Array.from(container.querySelectorAll<HTMLElement>("span.text-xs, p.text-xs, span.text-sm.text-muted-foreground, span[class*=muted]"))
            .map((s) => (s.textContent ?? "").trim().slice(0, 30))
            .filter(Boolean)
            .slice(0, 2)
        : [];
      return { title: (h.textContent ?? "").trim().slice(0, 50), smallTexts: smalls };
    });
  });
  console.log("[overview cards]", JSON.stringify(overviewCards, null, 1));
} catch (err) {
  console.log("[probe] FAILED:", String(err));
} finally {
  await browser.close();
}
