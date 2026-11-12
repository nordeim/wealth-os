// Session-229 parity probes (the M1 + L4 cure-form adjudication):
//
//   M1 — our Analytics Income tab's empty state is unreachable
//        (categoryTrend always returns n points). The reference's demo
//        data is ZERO — what does ITS Income tab render with zero
//        income: an empty state or a flat chart?
//   L4 — our Analytics "Expenses by Category" / "Needs vs Wants" cards
//        lack the caption their Dashboard twins carry. Does the
//        reference's Analytics carry card captions — and what form?
import { chromium, type Page } from "@playwright/test";
import * as path from "node:path";

if (path.basename(process.argv[1] ?? "") !== "probe-229-analytics.ts") process.exit(0);

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

  // The tab set on the reference's Analytics page.
  const tabs = await page
    .locator('[role="tab"], button')
    .allTextContents()
    .then((xs) => xs.map((x) => x.trim()).filter((x) => x && x.length < 20));
  console.log("[tabs/buttons]", JSON.stringify(tabs));

  // Card titles + captions in the current (default) view.
  const readCards = async (label: string) => {
    const cards = await page.evaluate(() => {
      // Card-ish containers: sections/divs with a heading child.
      const heads = Array.from(document.querySelectorAll<HTMLElement>("main h2, main h3, main [class*='font-semibold']"));
      return heads
        .map((h) => {
          const text = (h.textContent ?? "").trim().slice(0, 50);
          if (!text) return null;
          // A caption: a sibling small/muted text near the heading.
          const parent = h.parentElement;
          const sib = parent ? (parent.querySelector("span.text-xs, span.text-sm, p.text-xs, p.text-sm") as HTMLElement | null) : null;
          return { text, caption: sib ? (sib.textContent ?? "").trim().slice(0, 40) : "" };
        })
        .filter((x): x is { text: string; caption: string } => x !== null)
        .slice(0, 16);
    });
    console.log(`[cards ${label}]`, JSON.stringify(cards, null, 1));
  };
  await readCards("default");

  // Walk every tab and read the empty-state vs chart posture.
  for (const name of ["Expenses", "Income", "Investments", "Overview"]) {
    const tab = page.locator(`[role="tab"]:has-text("${name}"), button:has-text("${name}")`).first();
    if (!(await tab.count())) continue;
    await tab.click().catch(() => {});
    await page.waitForTimeout(1800);
    const read = await page.evaluate(() => {
      const body = document.querySelector("main") ?? document.body;
      const text = (body.textContent ?? "").slice(0, 400);
      const svgs = body.querySelectorAll("svg.recharts-surface, svg[class*=recharts]").length;
      const emptyish = /no |nothing|empty|yet|start|add your|create/i.test(text);
      return { recharts: svgs, emptyish, text: text.slice(0, 200) };
    });
    console.log(`[tab ${name}]`, JSON.stringify(read));
  }
  // Captions on the Expenses tab (after the walk, land back on Expenses).
  const tab = page.locator('[role="tab"]:has-text("Expenses"), button:has-text("Expenses")').first();
  if (await tab.count()) {
    await tab.click().catch(() => {});
    await page.waitForTimeout(1500);
    await readCards("expenses tab");
  }
} catch (err) {
  console.log("[probe] FAILED:", String(err));
} finally {
  await browser.close();
}
