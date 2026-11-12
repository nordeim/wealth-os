// Session-230 probe 3 (F-230a decisive): raw dump of EVERY element with a
// computed linear-gradient background on the reference's /Analytics and
// /Dashboard — tag, class, geometry, text — no skip logic, so the true
// stat-tile row and its ink values are visible whatever the wrappers.
import { chromium, type Page } from "@playwright/test";
import * as path from "node:path";

if (path.basename(process.argv[1] ?? "") !== "probe-230c.ts") process.exit(0);

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

async function dumpGradients(url: string, tag: string) {
  await page.goto(`${REF}${url}`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(4500);
  const rows = await page.evaluate(() => {
    const main = document.querySelector("main") ?? document.body;
    const out: Array<Record<string, string>> = [];
    for (const el of Array.from(main.querySelectorAll<HTMLElement>("*"))) {
      const cs = getComputedStyle(el);
      const bi = cs.backgroundImage ?? "";
      if (!bi.includes("linear-gradient")) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 8 || r.height < 8) continue;
      const colorOf = (c: Element | null) => (c ? getComputedStyle(c as HTMLElement).color : "-");
      const label = Array.from(el.querySelectorAll<HTMLElement>("p, span")).find((c) => {
        const ccs = getComputedStyle(c);
        return (ccs.fontSize === "14px" || ccs.fontSize === "13px") && (c.textContent ?? "").trim().length > 1 && !/^\$/.test((c.textContent ?? "").trim());
      });
      const value = Array.from(el.querySelectorAll<HTMLElement>("p, span")).find((c) => +getComputedStyle(c).fontWeight >= 700 && /^\$/.test((c.textContent ?? "").trim()));
      out.push({
        cls: (el.getAttribute("class") ?? "").replace(/\s+/g, " ").slice(0, 64),
        size: `${Math.round(r.width)}x${Math.round(r.height)}`,
        text: (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 46),
        grad: bi.replace(/\s+/g, " ").slice(0, 88),
        labelInk: label ? `${colorOf(label)} ${getComputedStyle(label).fontSize}` : "-",
        valInk: value ? `${value.textContent?.trim().slice(0, 12)} @${colorOf(value)}` : "-",
      });
      if (out.length >= 24) break;
    }
    return out;
  });
  console.log(`[${tag}]`, JSON.stringify(rows, null, 1));
}

try {
  await login(page);
  await dumpGradients("/Analytics", "reference /Analytics gradient elements");
  await dumpGradients("/Dashboard", "reference /Dashboard gradient elements");
} catch (err) {
  console.log("[probe] FAILED:", String(err));
} finally {
  await browser.close();
}
