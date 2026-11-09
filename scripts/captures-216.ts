// Session-216 evidence captures (R-13 — the verification-gap convergence
// round: the client data layer's loading + error faces wired, the
// QuickAction single-anchor a11y cure, the Expenses filters popover
// Escape, and the reset-password face the a11y census gained).
// Five faces freeze the post-round surfaces with the R-13 behavior
// asserted in-DOM/in-event:
// 59: the dashboard at 1440×900 settled — the Quick Action tiles render
//     as single anchors (one tab stop each — F-216e; asserted by DOM:
//     no button nested inside the Quick Action links)
// 60: the loading gate at 1440×900 — a hard-load with /api/dashboard
//     DELIBERATELY delayed 3s: the shell renders LoadingBlock (its first
//     consumer — F-216c), not the misleading "No X yet" empty states
// 61: the error face at 1440×900 — /api/dashboard intercepted to 500:
//     the role="alert" banner with the Try again button (F-216d)
// 62: the Expenses filters popover OPEN at 1440×900 (F-216i's before
//     state; the Escape close itself is pinned in the e2e leg)
// 63: the mobile drawer OPEN at 390×844 (the directive's standing
//     mobile-nav emphasis — all 9 destinations visible inside the dialog)
// 64: the /reset-password anon face at 1280×800 — the surface the a11y
//     census gained this session (I-c6), the minLength inputs live
import { chromium, type Page } from "@playwright/test";
import { statSync } from "node:fs";
import * as path from "node:path";

// Double-execution guard (the repo idiom): importing this module from any
// other script or runner must never fire the captures — only a direct
// `bun scripts/captures-216.ts` invocation proceeds past this line.
if (path.basename(process.argv[1] ?? "") !== "captures-216.ts") process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
// NOTE: the demo password STARTS WITH "$" — always single-quoted in shells.
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

/** The sweep.ts login protocol, verbatim: goto /login, the hydration
 *  settle (filling during hydration gets cleared by the re-render before
 *  submit — the observed 400 race), the fill, then the click racing
 *  waitForURL off /login. */
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

/** Commit one capture: verify it exists non-trivially (a blank viewport
 *  PNG compresses far under 30KB) and print the path + assert result. */
function commit(file: string, note: string) {
  const bytes = statSync(file).size;
  if (bytes < 30_000) throw new Error(`${file}: suspiciously small (${bytes}B) — blank?`);
  console.log(`[captures-216] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  const browser = await chromium.launch();
  try {
    // ---- (a) desktop 1440×900: the dashboard settled --------------------
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await login(page);
    await page.goto(`${BASE}/dashboard`, { waitUntil: "domcontentloaded" });
    await page.getByRole("heading", { name: "Financial Dashboard" }).waitFor({ state: "visible", timeout: 20000 });
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000); // hydration settle (the captures-211 lesson)

    // F-216e asserted in-DOM: the Quick Action tiles are single anchors —
    // NO button nests inside any link on the page.
    const nested = await page.locator("a button").count();
    if (nested !== 0) throw new Error(`dashboard: ${nested} nested button(s) inside links — the F-216e cure regressed`);
    const quickTiles = await page.getByRole("link", { name: /Add Income|Add Expense|Set Goal|View Reports/ }).count();
    if (quickTiles < 4) throw new Error(`dashboard: only ${quickTiles} Quick Action anchors found`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/59-session216-dashboard-quick-actions.png`, fullPage: false });
    commit(`${OUT}/59-session216-dashboard-quick-actions.png`, "ASSERT OK: 0 nested <a><button/> on the page — the Quick Action tiles are single anchors (F-216e)");

    await ctx.close();

    // ---- (b) desktop: the loading gate (F-216c) --------------------------
    // A fresh context hard-load with /api/dashboard deliberately delayed:
    // the shell must render LoadingBlock (its first consumer), never the
    // misleading empty states.
    const loadCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const loadPage = await loadCtx.newPage();
    await loadPage.route("**/api/dashboard", async (route) => {
      await new Promise((r) => setTimeout(r, 3000));
      await route.continue();
    });
    // log in inside this context first (so the hard-load is authenticated)
    await login(loadPage);
    await loadPage.goto(`${BASE}/expenses`, { waitUntil: "domcontentloaded" });
    await loadPage.getByText("Loading your workspace").waitFor({ state: "visible", timeout: 10000 });
    const emptyFlash = await loadPage.getByText("No expenses yet").count();
    if (emptyFlash !== 0) throw new Error("loading gate: the empty state flashed during load — the F-216c cure regressed");
    await loadPage.screenshot({ path: `${OUT}/60-session216-loading-gate.png`, fullPage: false });
    commit(`${OUT}/60-session216-loading-gate.png`, "ASSERT OK: LoadingBlock rendered during the in-flight hydrate — no empty-state flash (F-216c)");
    await loadCtx.close();

    // ---- (c) desktop: the error face (F-216d) ----------------------------
    // /api/dashboard intercepted to a 500: the alert banner + Try again.
    const errCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const errPage = await errCtx.newPage();
    await errPage.route("**/api/dashboard", (route) =>
      route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ ok: false, error: { code: "INTERNAL", message: "intercepted for the capture" } }) }),
    );
    await errPage.goto(`${BASE}/login`, { waitUntil: "networkidle" });
    await errPage.waitForTimeout(1200);
    await errPage.fill('input[type="email"]', EMAIL);
    await errPage.fill('input[type="password"]', PASSWORD);
    await errPage.click('button[type="submit"]');
    // the (app) shell renders; the banner appears
    await errPage.getByRole("alert").filter({ hasText: /Couldn't load your data/i }).waitFor({ state: "visible", timeout: 20000 });
    const retry = errPage.getByRole("button", { name: /Try again/i });
    if (!(await retry.isVisible())) throw new Error("error face: the Try again button is missing");
    await errPage.waitForTimeout(400);
    await errPage.screenshot({ path: `${OUT}/61-session216-error-banner.png`, fullPage: false });
    commit(`${OUT}/61-session216-error-banner.png`, "ASSERT OK: the role=alert error banner + the Try again retry (F-216d)");
    await errCtx.close();

    // ---- (d) desktop: the Expenses filters popover (F-216i) --------------
    const filtCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const filtPage = await filtCtx.newPage();
    await login(filtPage);
    await filtPage.goto(`${BASE}/expenses`, { waitUntil: "domcontentloaded" });
    await filtPage.getByRole("heading", { name: "Expenses" }).waitFor({ state: "visible", timeout: 20000 });
    await filtPage.waitForLoadState("networkidle");
    await filtPage.waitForTimeout(1500);
    await filtPage.getByRole("button", { name: /Filters/ }).click();
    await filtPage.getByRole("group", { name: "Expense filters" }).waitFor({ state: "visible", timeout: 10000 });
    // and the Escape behavior asserted live (the e2e pin + the capture):
    await filtPage.keyboard.press("Escape");
    await filtPage.waitForTimeout(300);
    if ((await filtPage.getByRole("group", { name: "Expense filters" }).count()) !== 0) {
      throw new Error("filters popover: Escape did not close it — the F-216i cure regressed");
    }
    // reopen for the open-state capture
    await filtPage.getByRole("button", { name: /Filters/ }).click();
    await filtPage.getByRole("group", { name: "Expense filters" }).waitFor({ state: "visible", timeout: 10000 });
    await filtPage.waitForTimeout(300);
    await filtPage.screenshot({ path: `${OUT}/62-session216-expenses-filters.png`, fullPage: false });
    commit(`${OUT}/62-session216-expenses-filters.png`, "ASSERT OK: the filters popover open (Escape close asserted live first — F-216i)");

    await filtCtx.close();

    // ---- (e) phone 390×844: the mobile drawer (the standing emphasis) ----
    const mobCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const mobPage = await mobCtx.newPage();
    await login(mobPage);
    await mobPage.goto(`${BASE}/dashboard`, { waitUntil: "domcontentloaded" });
    await mobPage.getByRole("button", { name: "Open navigation menu" }).waitFor({ state: "visible", timeout: 20000 });
    await mobPage.waitForLoadState("networkidle");
    await mobPage.waitForTimeout(1500);
    await mobPage.getByRole("button", { name: "Open navigation menu" }).click();
    const drawer = mobPage.getByRole("dialog", { name: "WealthOS navigation" });
    await drawer.waitFor({ state: "visible", timeout: 10000 });
    const dests = await drawer.getByRole("link").count();
    if (dests < 9) throw new Error(`mobile drawer: only ${dests} destination links — expected 9`);
    await mobPage.waitForTimeout(400);
    await mobPage.screenshot({ path: `${OUT}/63-session216-mobile-drawer-open.png`, fullPage: false });
    commit(`${OUT}/63-session216-mobile-drawer-open.png`, `ASSERT OK: the drawer open with ${dests} destinations (the standing mobile-nav emphasis)`);

    await mobCtx.close();

    // ---- (f) desktop 1280×800: the /reset-password anon face (I-c6) ------
    const rpCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const rpPage = await rpCtx.newPage();
    await rpPage.goto(`${BASE}/reset-password`, { waitUntil: "domcontentloaded" });
    await rpPage.waitForLoadState("networkidle");
    await rpPage.waitForTimeout(1200);
    // the token-less "invalid link" state renders the auth-card family
    await rpPage.getByText(/invalid|expired/i).first().waitFor({ state: "visible", timeout: 10000 });
    await rpPage.waitForTimeout(300);
    await rpPage.screenshot({ path: `${OUT}/64-session216-reset-password.png`, fullPage: false });
    commit(`${OUT}/64-session216-reset-password.png`, "ASSERT OK: the token-less reset face — the a11y census's newest surface (I-c6)");

    await rpCtx.close();
  } finally {
    await browser.close();
  }
  console.log("[captures-216] all 6 captures done");
}

void main();
