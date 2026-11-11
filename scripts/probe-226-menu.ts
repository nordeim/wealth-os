// Session-226 verification probe (R-23 intake audit — the driving
// session's independent re-verification of the audit Pass C L-1 claim):
//
//   C-L1 — the desktop user-menu's dark surface: OUR MenuContent uses
//          stone literals (dark:bg-stone-900 ≈ #1c1917) while every
//          sibling popover family rides the flipped --color-surface
//          (#0a0a0a). Does the REFERENCE's own dark menu panel measure
//          #0a0a0a (token family) or #1c1917 (stone-900)?
//
// The probe logs into BOTH apps (dark default on app routes — the
// fresh-visitor posture), opens the desktop sidebar user menu at
// 1440x900, and reads the panel's computed background-color + border.
import { chromium, type Page } from "@playwright/test";
import * as path from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "probe-226-menu.ts") process.exit(0);

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

async function probeMenu(page: Page, label: string) {
  // The sidebar avatar trigger (desktop lg+)
  const trigger = page
    .locator("aside button, aside [role=button], aside [aria-haspopup=menu]")
    .filter({ hasText: /sepnetflix|S/i })
    .first();
  const fallback = page.locator("aside [aria-haspopup=menu]").first();
  const t = (await trigger.count()) ? trigger : fallback;
  await t.click();
  await page.waitForTimeout(900);
  const panel = page.locator('[role="menu"]').first();
  if (!(await panel.count())) {
    console.log(`[${label}] NO MENU PANEL FOUND`);
    return;
  }
  const box = await panel.boundingBox();
  const read = await panel.evaluate((el) => {
    const cs = getComputedStyle(el);
    return { bg: cs.backgroundColor, border: cs.borderColor, cls: el.getAttribute("class")?.slice(0, 160) };
  });
  console.log(`[${label}] menu panel:`, JSON.stringify({ box, ...read }, null, 2));
  await page.keyboard.press("Escape");
}

const browser = await chromium.launch();
try {
  // OURS (dev server should be running on :3000)
  const ours = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await ours.goto(OURS, { waitUntil: "networkidle" }).catch(() => {});
  if (ours.url().includes("login")) await login(ours, OURS);
  await ours.waitForTimeout(1500);
  const htmlDark = await ours.evaluate(() => document.documentElement.classList.contains("dark"));
  console.log(`[ours] html.dark=${htmlDark} at ${ours.url()}`);
  await probeMenu(ours, "ours");

  // REFERENCE
  const ref = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await login(ref, REF);
  await ref.waitForTimeout(1500);
  const refDark = await ref.evaluate(() => document.documentElement.classList.contains("dark"));
  console.log(`[ref] html.dark=${refDark} at ${ref.url()}`);
  await probeMenu(ref, "reference");
} finally {
  await browser.close();
}
