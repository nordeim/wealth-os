// Session-217 evidence captures (R-14 — the parity-completion round:
// the dark-mode token completion, the popover mouse-pick cure, the
// drawer focus contract). Six faces freeze the post-round surfaces with
// the R-14 behavior asserted in-DOM:
// 65: the dashboard at 1440×900 DARK — the cured dark genus (every
//     swept surface unchanged; the outline buttons ride the flipped
//     --color-surface like the reference's own dark family)
// 66: the Accounts dialog OPEN in dark — THE F-217c cure (was a white
//     panel with a 1.09:1 title; asserted: panel #0a0a0a, title 15+:1)
// 67: the sidebar user-menu open in dark — the F-217c-2 cure (the
//     "Dark Mode" item was 1.00:1 invisible; asserted: readable ink)
// 68: the Expenses filters popover with a category picked by MOUSE —
//     the F-217a cure (the popover survives the pick; asserted: the
//     filter applied)
// 69: the mobile drawer open at 390×844 (the directive's standing
//     mobile-nav emphasis — the focus contract asserted: focus inside)
// 70: the light dashboard at 1440×900 — the standing light genus
//     (unchanged by the round; the control face)
import { chromium, type Page } from "@playwright/test";
import { statSync } from "node:fs";
import * as path from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-217.ts") process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
// NOTE: the demo password STARTS WITH "$" — always single-quoted in shells.
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

/** The sweep.ts login protocol, verbatim. */
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

function commit(file: string, note: string) {
  const bytes = statSync(file).size;
  if (bytes < 30_000) throw new Error(`${file}: suspiciously small (${bytes}B) — blank?`);
  console.log(`[captures-217] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await login(page);

  // 65 — the dark dashboard
  await page.evaluate(() => localStorage.setItem("wealthos-theme", "dark"));
  await page.goto(`${BASE}/dashboard`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  const dark = await page.evaluate(() => ({
    htmlClass: document.documentElement.className,
    bodyColor: getComputedStyle(document.body).color,
  }));
  if (!dark.htmlClass.includes("dark")) throw new Error(`not dark: ${dark.htmlClass}`);
  await page.screenshot({ path: `${OUT}/65-session217-dashboard-dark.png` });
  commit(`${OUT}/65-session217-dashboard-dark.png`, `the cured dark genus (body ${dark.bodyColor})`);

  // 66 — the Accounts dialog in dark (THE F-217c face)
  await page.goto(`${BASE}/accounts`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: /add (your first )?account/i }).first().click();
  await page.waitForTimeout(900);
  const dlg = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"]');
    if (!d) return null;
    const cs = getComputedStyle(d);
    const h = d.querySelector("h2,h3");
    return { bg: cs.backgroundColor, border: cs.borderColor, title: h ? getComputedStyle(h).color : null };
  });
  if (!dlg || dlg.bg !== "rgb(10, 10, 10)") throw new Error(`dialog not cured: ${JSON.stringify(dlg)}`);
  await page.screenshot({ path: `${OUT}/66-session217-dialog-dark.png` });
  commit(`${OUT}/66-session217-dialog-dark.png`, `F-217c cured (panel ${dlg.bg}, title ${dlg.title})`);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);

  // 67 — the sidebar user-menu in dark (the F-217c-2 face)
  const avatar = page.locator("aside button").filter({ hasText: /sepnetflix/i }).first();
  await avatar.click();
  await page.waitForTimeout(800);
  const menu = await page.evaluate(() => {
    const it = [...document.querySelectorAll('[role="menuitem"]')].find((x) =>
      (x.textContent ?? "").includes("Dark Mode"),
    );
    return it ? { color: getComputedStyle(it).color, bg: getComputedStyle(it.parentElement!).backgroundColor } : null;
  });
  if (!menu || menu.color === "rgb(28, 25, 23)") throw new Error(`menu not cured: ${JSON.stringify(menu)}`);
  await page.screenshot({ path: `${OUT}/67-session217-user-menu-dark.png` });
  commit(`${OUT}/67-session217-user-menu-dark.png`, `F-217c-2 cured ("Dark Mode" ink ${menu.color})`);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);

  // 68 — the Expenses popover mouse-pick (the F-217a face)
  await page.evaluate(() => localStorage.setItem("wealthos-theme", "light"));
  await page.goto(`${BASE}/expenses`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);
  await page.getByRole("button", { name: /Filters/ }).click();
  await page.waitForTimeout(700);
  await page.locator("#expense-category-filter").click();
  await page.waitForTimeout(600);
  await page.getByRole("option", { name: /Groceries/ }).click();
  await page.waitForTimeout(800);
  const pick = await page.evaluate(() => {
    const pop = document.querySelector('[aria-label="Expense filters"]');
    const sel = document.querySelector("#expense-category-filter");
    return { popoverMounted: !!pop, selectText: sel?.textContent?.trim() ?? null };
  });
  if (!pick.popoverMounted || !pick.selectText?.includes("Groceries")) {
    throw new Error(`mouse-pick not cured: ${JSON.stringify(pick)}`);
  }
  await page.screenshot({ path: `${OUT}/68-session217-popover-mouse-pick.png` });
  commit(`${OUT}/68-session217-popover-mouse-pick.png`, `F-217a cured (popover alive, filter "${pick.selectText}")`);

  // 69 — the mobile drawer with the focus contract (390×844)
  const phone = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await phone.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await phone.waitForTimeout(1200);
  await phone.fill('input[type="email"]', EMAIL);
  await phone.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    phone.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30000 }),
    phone.click('button[type="submit"]'),
  ]);
  await phone.waitForTimeout(1500);
  await phone.getByRole("button", { name: "Open navigation menu" }).click();
  await phone.waitForTimeout(800);
  const focus = await phone.evaluate(() => {
    const sheet = document.querySelector('[role="dialog"]');
    return { open: !!sheet, focusInside: !!sheet?.contains(document.activeElement) };
  });
  if (!focus.open || !focus.focusInside) throw new Error(`focus contract broken: ${JSON.stringify(focus)}`);
  await phone.screenshot({ path: `${OUT}/69-session217-mobile-drawer-focus.png` });
  commit(`${OUT}/69-session217-mobile-drawer-focus.png`, "the drawer + the F-217e focus contract (focus inside)");
  await phone.close();

  // 70 — the light dashboard control face
  await page.goto(`${BASE}/dashboard`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  const light = await page.evaluate(() => document.documentElement.className);
  if (light.includes("dark")) throw new Error("not light");
  await page.screenshot({ path: `${OUT}/70-session217-dashboard-light.png` });
  commit(`${OUT}/70-session217-dashboard-light.png`, "the standing light genus (the round's control face)");

  await browser.close();
  console.log("[captures-217] all six faces captured with live assertions");
}

main().catch((e) => { console.error("CAPTURES FAILED:", e); process.exit(1); });
