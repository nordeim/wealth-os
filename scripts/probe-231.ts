// Session-231 probe (C-I6 decisive): the reference's own /Analytics
// "Spending by Day of Week" card — does it exist, does it render at the
// standing zero demo data, and what FILL do its bars carry? Our chart
// paints the bars amber (CHART_COLORS.net #f59e0b) while the chart is a
// spending series — the audit asks whether the amber is the reference's
// own genus or our mis-assignment. Decisive either way: dump every rect
// fill + the sibling chart cards' fills for context.
import { chromium, type Page } from "@playwright/test";
import * as path from "node:path";

if (path.basename(process.argv[1] ?? "") !== "probe-231.ts") process.exit(0);

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
  await page.waitForTimeout(5000);

  // Every card title on the page (the section census), then the bar/area
  // fills grouped by their owning card.
  const report = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>("section, article, div")).filter((el) => {
      const t = (el.textContent ?? "").trim();
      return t.includes("Spending by Day of Week");
    });
    const titles = Array.from(document.querySelectorAll("h1,h2,h3,h4"))
      .map((h) => (h.textContent ?? "").trim())
      .filter(Boolean);
    const dayCard = cards[cards.length - 1] ?? null;
    const fills: Record<string, unknown> = {};
    if (dayCard) {
      const rects = Array.from(dayCard.querySelectorAll("path[fill], rect[fill]"));
      fills.dayOfWeekCard = {
        rectCount: rects.length,
        fills: Array.from(new Set(rects.map((r) => r.getAttribute("fill")))).slice(0, 8),
        text: (dayCard.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 120),
        hasEmptyState: /no spending/i.test(dayCard.textContent ?? ""),
      };
    } else {
      fills.dayOfWeekCard = "CARD NOT FOUND";
    }
    // Sibling context: every chart-ish card and its bar fills, so the
    // palette per card is visible.
    const perCard: Array<Record<string, unknown>> = [];
    for (const el of Array.from(document.querySelectorAll<HTMLElement>("section"))) {
      const txt = (el.textContent ?? "").replace(/\s+/g, " ").trim();
      const title = (el.querySelector("h1,h2,h3,h4")?.textContent ?? "").trim();
      if (!title) continue;
      const rs = Array.from(el.querySelectorAll("path[fill], rect[fill]"));
      perCard.push({
        title,
        fills: Array.from(new Set(rs.map((r) => r.getAttribute("fill")))).slice(0, 6),
        shapes: rs.length,
      });
    }
    fills.sectionTitles = titles;
    fills.perCard = perCard;
    return fills;
  });
  console.log("[probe-231]", JSON.stringify(report, null, 1));
} catch (err) {
  console.log("[probe-231] FAILED:", String(err));
} finally {
  await browser.close();
}
