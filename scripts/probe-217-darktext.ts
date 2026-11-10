// Session-217: does our dark dashboard carry invisible inherited text today?
// (Informs the --color-foreground flip's sweep impact: elements with NO
// explicit color inherit body's stone-900 — dark-on-dark.)
import { chromium, type Page } from "@playwright/test";

if (!process.argv[1]?.endsWith("probe-217-darktext.ts")) process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

async function login(page: Page) {
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(1500);
}

function lum(r: number, g: number, b: number) {
  const a = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await login(page);
  await page.evaluate(() => localStorage.setItem("wealthos-theme", "dark"));
  await page.goto(`${BASE}/dashboard`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const bad = await page.evaluate(() => {
    const out: string[] = [];
    const els = document.querySelectorAll("main *, header *, aside *");
    for (const el of els) {
      if (!(el instanceof HTMLElement)) continue;
      if (!el.textContent?.trim()) continue;
      if (el.children.length > 0) continue; // leaf nodes only
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      // walk up for the nearest opaque-ish background
      let bg = "rgba(0, 0, 0, 0)";
      let p: HTMLElement | null = el;
      while (p) {
        const b = getComputedStyle(p).backgroundColor;
        if (b !== "rgba(0, 0, 0, 0)" && b !== "transparent") { bg = b; break; }
        p = p.parentElement;
      }
      out.push(`${el.tagName}.${String(el.className).slice(0, 40)} color=${cs.color} bg=${bg} text="${el.textContent.trim().slice(0, 24)}"`);
    }
    return out;
  });

  // parse + compute contrast for the reported leaf texts
  const lines = bad.map((line) => {
    const colorM = line.match(/color=rgb\((\d+), (\d+), (\d+)\)/);
    const bgM = line.match(/bg=rgb\((\d+), (\d+), (\d+)\)/);
    if (!colorM || !bgM) return `${line} [no parse]`;
    const [_, r1, g1, b1] = colorM.map(Number);
    const [__, r2, g2, b2] = bgM.map(Number);
    const l1 = lum(r1, g1, b1);
    const l2 = lum(r2, g2, b2);
    const ratio = ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2);
    return `${line} contrast=${ratio}`;
  }).filter((l) => !/contrast=\d+\.\d\d>/.test(l)); // keep all; filter below

  const lowContrast = lines.filter((l) => {
    const m = l.match(/contrast=([0-9.]+)/);
    return m && parseFloat(m[1]) < 3;
  });
  console.log(`leaf text nodes sampled: ${lines.length}`);
  console.log(`LOW CONTRAST (<3:1) in dark:\n${lowContrast.slice(0, 25).join("\n") || "(none)"}`);
  await browser.close();
}

main().catch((e) => { console.error("PROBE FAILED:", e); process.exit(1); });
