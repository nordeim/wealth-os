// Session-230 probes (two adjudication calls in one run):
//  A) F-230b: the reference's DASHBOARD "Cash Flow" section at its standing
//     ZERO demo data — does it render the chart unconditionally, show an
//     empty state, or omit the card? (Our dashboard renders the AreaChart
//     unconditionally; cashFlowSeries always returns N points.)
//  B) F-230a: the reference's ANALYTICS stat tiles — confirm the saturated
//     to-r gradient + light -100 label ink genus is its own (the F-209b
//     live-extraction) before registering the sub-AA arm (the F-224y
//     pattern) instead of re-coloring it.
import { chromium, type Page } from "@playwright/test";
import * as path from "node:path";

if (path.basename(process.argv[1] ?? "") !== "probe-230.ts") process.exit(0);

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

  // ---- A) The dashboard cash-flow section at zero data -------------------
  await page.goto(`${REF}/Dashboard`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(4500);
  const cashflow = await page.evaluate(() => {
    const main = document.querySelector("main") ?? document.body;
    // Find the section/card whose heading mentions Cash Flow.
    const heads = Array.from(main.querySelectorAll<HTMLElement>("h2, h3, [class*='font-semibold']"));
    const head = heads.find((el) => /cash\s*flow/i.test(el.textContent ?? ""));
    if (!head) return { found: false };
    const card = head.closest("section, div[class*=rounded]") as HTMLElement | null;
    if (!card) return { found: true, card: false };
    const svg = card.querySelectorAll("svg.recharts-surface, svg[class*=recharts]").length;
    const emptyish = Array.from(card.querySelectorAll<HTMLElement>("p, span, div"))
      .map((el) => (el.textContent ?? "").trim())
      .filter((t) => /no |empty|nothing|start|add |track |monitor /i.test(t) && t.length < 90)
      .slice(0, 3);
    return {
      found: true,
      card: true,
      title: (head.textContent ?? "").trim().slice(0, 40),
      rechartsSurfaces: svg,
      emptyishText: emptyish,
      cardTextTail: (card.textContent ?? "").replace(/\s+/g, " ").slice(0, 220),
    };
  });
  console.log("[A: reference cash-flow section @ zero data]", JSON.stringify(cashflow, null, 1));

  // ---- B) The analytics stat tiles ----------------------------------------
  await page.goto(`${REF}/Analytics`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(4500);
  const tiles = await page.evaluate(() => {
    const main = document.querySelector("main") ?? document.body;
    // The stat tiles: saturated gradient cards near the page head —
    // look for elements whose background-image is a linear-gradient with
    // two saturated stops, containing a bold value.
    const out: Array<Record<string, string>> = [];
    const seen = new Set<HTMLElement>();
    for (const el of Array.from(main.querySelectorAll<HTMLElement>("div[class*=rounded], div[class*=p-]"))) {
      const cs = getComputedStyle(el);
      const bi = cs.backgroundImage;
      if (!bi.includes("linear-gradient")) continue;
      if (seen.has(el)) continue;
      // The tile is the gradient card: it must contain a bold child value.
      const value = Array.from(el.querySelectorAll<HTMLElement>("p, span, div")).find((c) => {
        const ccs = getComputedStyle(c);
        return (ccs.fontWeight === "700" || +ccs.fontWeight >= 700) && (c.textContent ?? "").trim().length > 0 && (c.textContent ?? "").trim().length < 24;
      });
      if (!value) continue;
      seen.add(el);
      // Mark the whole subtree so inner wrappers don't re-match.
      el.querySelectorAll("*").forEach((d) => seen.add(d as HTMLElement));
      const label = Array.from(el.querySelectorAll<HTMLElement>("p, span")).find((c) => {
        const ccs = getComputedStyle(c);
        return ccs.fontSize === "14px" && c !== value && (c.textContent ?? "").trim().length > 2;
      });
      out.push({
        label: (label?.textContent ?? "").trim().slice(0, 30),
        labelColor: label ? getComputedStyle(label).color : "-",
        labelFontSize: label ? getComputedStyle(label).fontSize : "-",
        valueText: (value.textContent ?? "").trim().slice(0, 16),
        valueColor: getComputedStyle(value).color,
        valueFontWeight: getComputedStyle(value).fontWeight,
        gradient: bi.slice(0, 96),
      });
      if (out.length >= 4) break;
    }
    return out;
  });
  console.log("[B: reference analytics stat tiles]", JSON.stringify(tiles, null, 1));
} catch (err) {
  console.log("[probe] FAILED:", String(err));
} finally {
  await browser.close();
}
