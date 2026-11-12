// Session-231 probe 2: raw dump of the reference's /Analytics — every
// heading, every svg shape fill, and the card-title census — to locate
// the day-of-week surface (or establish it absent) with no assumptions
// about the reference's markup.
import { chromium, type Page } from "@playwright/test";
import * as path from "node:path";

if (path.basename(process.argv[1] ?? "") !== "probe-231b.ts") process.exit(0);

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
  await page.waitForTimeout(6000);

  const report = await page.evaluate(() => {
    // every heading-ish element with text
    const heads = Array.from(document.querySelectorAll<HTMLElement>("h1,h2,h3,h4,h5, [class*='title'], p.font-semibold, p.font-bold"))
      .map((h) => ({ tag: h.tagName, text: (h.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 60) }))
      .filter((h) => h.text.length > 2);
    // every svg shape with an explicit fill attr
    const fills: Record<string, number> = {};
    for (const s of Array.from(document.querySelectorAll("path[fill], rect[fill], circle[fill], area"))) {
      const f = s.getAttribute("fill") ?? s.tagName;
      fills[f] = (fills[f] ?? 0) + 1;
    }
    // svg count + text census of main
    const svgs = document.querySelectorAll("svg").length;
    const mainText = (document.querySelector("main")?.textContent ?? document.body.textContent ?? "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 1500);
    return { heads: heads.slice(0, 40), fills, svgs, mainText };
  });
  console.log("[probe-231b]", JSON.stringify(report, null, 1));
} catch (err) {
  console.log("[probe-231b] FAILED:", String(err));
} finally {
  await browser.close();
}
