// Session-226 verification probe: does the WEALTHOS reference itself carry
// ring-offset-background on its pill/segmented triggers, and what does its
// --background token compute? (The neo-crm F-129c1 retirement doctrine
// applied to a DIFFERENT reference whose background was #f9fafb; ours was
// live-measured #faf9f7 FROM this reference — if the reference carries the
// class, dropping it here would CREATE a divergence, not cure one.)
import { chromium, type Page } from "@playwright/test";
import * as path from "node:path";

if (path.basename(process.argv[1] ?? "") !== "probe-226-ring.ts") process.exit(0);

const OURS = "http://localhost:3000";
const REF = "https://wealth-os-d93bd04e.base44.app";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

async function login(page: Page, base: string) {
  await page.goto(`${base}/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(2000);
}

async function probe(page: Page, label: string) {
  await page.goto(`${page.url().startsWith("http://localhost") ? OURS : REF}/Analytics`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);
  const out = await page.evaluate(() => {
    // Any pill/segmented/tab trigger or select trigger
    const cands = Array.from(document.querySelectorAll('[role="tab"], button[role="tab"]')).slice(0, 4);
    const bg = getComputedStyle(document.body).backgroundColor;
    const html = document.documentElement;
    const rootBg = getComputedStyle(html).backgroundColor;
    const tabInfo = cands.map((el) => {
      const cs = getComputedStyle(el);
      return {
        cls: (el.getAttribute("class") ?? "").slice(0, 200),
        offsetColor: cs.getPropertyValue("--tw-ring-offset-color").trim() || "(unset)",
      };
    });
    // The --background token value on :root
    const tokenBg = getComputedStyle(html).getPropertyValue("--background").trim();
    return { bodyBg: bg, rootBg, tokenBg, tabInfo };
  });
  console.log(`[${label}]`, JSON.stringify(out, null, 2));
}

const browser = await chromium.launch();
try {
  const ours = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await ours.goto(OURS, { waitUntil: "networkidle" }).catch(() => {});
  if (ours.url().includes("login")) await login(ours, OURS);
  await probe(ours, "ours");

  const ref = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await login(ref, REF);
  await probe(ref, "reference");
} finally {
  await browser.close();
}
