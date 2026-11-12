// Session-230 probe 2 (F-230a refinement): dump EVERY gradient-bearing
// card on the reference's /Analytics at its standing zero data — text
// content + computed background-image + label/value ink — to find the
// stat tile row (the F-209b live-extracted saturated to-r genus) and
// measure its actual contrast posture.
import { chromium, type Page } from "@playwright/test";
import * as path from "node:path";

if (path.basename(process.argv[1] ?? "") !== "probe-230b.ts") process.exit(0);

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
  const dump = await page.evaluate(() => {
    const main = document.querySelector("main") ?? document.body;
    const out: Array<Record<string, string>> = [];
    const seen = new Set<HTMLElement>();
    for (const el of Array.from(main.querySelectorAll<HTMLElement>("div"))) {
      if (seen.has(el)) continue;
      const cs = getComputedStyle(el);
      if (!cs.backgroundImage.includes("linear-gradient")) continue;
      // Skip if an ancestor already captured (report the OUTERMOST gradient card).
      let covered = false;
      for (let p = el.parentElement; p; p = p.parentElement) {
        if (seen.has(p)) { covered = true; break; }
        if (getComputedStyle(p).backgroundImage.includes("linear-gradient")) { covered = true; break; }
      }
      if (covered) continue;
      seen.add(el);
      el.querySelectorAll("*").forEach((d) => seen.add(d as HTMLElement));
      const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
      // The first light-ink child (label) and first bold child (value).
      const light = Array.from(el.querySelectorAll<HTMLElement>("p, span")).find((c) => {
        const ccs = getComputedStyle(c);
        return ccs.color !== "rgb(255, 255, 255)" && (ccs.fontSize === "14px" || ccs.fontSize === "13px") && (c.textContent ?? "").trim().length > 1;
      });
      const bold = Array.from(el.querySelectorAll<HTMLElement>("p, span")).find((c) => {
        const ccs = getComputedStyle(c);
        return +ccs.fontWeight >= 700 && (c.textContent ?? "").trim().length > 0 && (c.textContent ?? "").trim().length < 24;
      });
      out.push({
        text: text.slice(0, 70),
        gradient: cs.backgroundImage.replace(/\s+/g, " ").slice(0, 110),
        lightInk: light ? `${getComputedStyle(light).color} ${getComputedStyle(light).fontSize}` : "-",
        boldVal: bold ? `${bold.textContent?.trim().slice(0, 14)} @${getComputedStyle(bold).color}` : "-",
      });
      if (out.length >= 8) break;
    }
    return out;
  });
  console.log("[reference /Analytics gradient cards @ zero data]", JSON.stringify(dump, null, 1));
} catch (err) {
  console.log("[probe] FAILED:", String(err));
} finally {
  await browser.close();
}
