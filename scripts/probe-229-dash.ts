// Session-229 probe (L4 genus): the reference's DASHBOARD card titles
// and any captions — the provenance of our "This month" caption
// convention. Zero demo data.
import { chromium, type Page } from "@playwright/test";
import * as path from "node:path";

if (path.basename(process.argv[1] ?? "") !== "probe-229-dash.ts") process.exit(0);

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
  await page.goto(`${REF}/Dashboard`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(4500);
  const cards = await page.evaluate(() => {
    const main = document.querySelector("main") ?? document.body;
    // Card titles: font-semibold divs/h tags; captions: xs muted siblings.
    const heads = Array.from(main.querySelectorAll<HTMLElement>("h2, h3, [class*='font-semibold']")).filter((el) => {
      const t = (el.textContent ?? "").trim();
      return t && t.length < 40 && el.getBoundingClientRect().height < 60;
    });
    const seen = new Set<string>();
    return heads
      .map((h) => {
        const text = (h.textContent ?? "").trim();
        if (seen.has(text)) return null;
        seen.add(text);
        // Caption: any small muted text within the heading's container.
        const container = h.closest("section, div[class*=rounded]") as HTMLElement | null;
        const cap = container
          ? Array.from(container.querySelectorAll<HTMLElement>("span, p"))
              .filter((s) => {
                const cs = getComputedStyle(s);
                return cs.fontSize <= "13px" && s !== h && (s.textContent ?? "").trim().length < 30;
              })
              .map((s) => (s.textContent ?? "").trim())
              .slice(0, 2)
          : [];
        return { title: text.slice(0, 44), captionish: cap };
      })
      .filter((x): x is { title: string; captionish: string[] } => x !== null)
      .slice(0, 18);
  });
  console.log("[reference dashboard cards]", JSON.stringify(cards, null, 1));
} catch (err) {
  console.log("[probe] FAILED:", String(err));
} finally {
  await browser.close();
}
