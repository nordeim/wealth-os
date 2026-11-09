// Session-214 evidence captures (R-10 — the owner-scoping round: every
// install-global table row became the demo user's OWN row, the seed's
// budget ceiling included). Four faces freeze the post-round surfaces with
// the SEEDED corpus asserted in-DOM (the proof the owner-scoped rows still
// serve the finance data, not just the shells):
// 51: the desktop Financial Dashboard at 1440×900 (the flagship — the
//     h1 + the Net Balance KPI + a seeded money figure)
// 52: the Settings page's Category Budgets section (the R-10 proof
//     surface — the demo user's own Groceries ceiling rendering as a row)
// 53: the mobile drawer OPEN at 390×844 (the directive's standing
//     mobile-nav emphasis — all 9 destinations visible inside the dialog)
// 54: the logged-out login card on mobile (the WealthOS logo + the
//     email/password form, no session)
import { chromium, type Page } from "@playwright/test";
import { statSync } from "node:fs";
import * as path from "node:path";

// Double-execution guard (the repo idiom): importing this module from any
// other script or runner must never fire the captures — only a direct
// `bun scripts/captures-214.ts` invocation proceeds past this line.
if (path.basename(process.argv[1] ?? "") !== "captures-214.ts") process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
// NOTE: the demo password STARTS WITH "$" — always single-quoted in shells.
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

const SECTIONS = [
  "Dashboard",
  "Income",
  "Expenses",
  "Accounts",
  "Investments",
  "Import",
  "Analytics",
  "Goals",
  "Settings",
] as const;

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
  console.log(`[captures-214] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  const browser = await chromium.launch();
  try {
    // ---- (a) desktop 1440×900: the Financial Dashboard -------------------
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await login(page);
    // the post-login redirect lands on the dashboard root
    await page.getByRole("heading", { name: "Financial Dashboard" }).waitFor({ state: "visible", timeout: 20000 });
    await page.locator("main").first().waitFor({ state: "visible", timeout: 15000 });
    await page.waitForTimeout(2500); // let the KPI row + charts settle
    const dashText = await page.locator("main").innerText();
    if (!/Net Balance/.test(dashText)) throw new Error("dashboard: 'Net Balance' KPI missing");
    if (!/\$\s?\d/.test(dashText)) {
      throw new Error("dashboard: no seeded money figure rendered — owner-scoped data not served?");
    }
    await page.screenshot({ path: `${OUT}/51-session214-dashboard-desktop.png`, fullPage: false });
    commit(`${OUT}/51-session214-dashboard-desktop.png`, "ASSERT OK: Financial Dashboard h1 + Net Balance KPI + seeded money figures");

    // ---- (b) settings: the Category Budgets section (R-10 proof) ---------
    await page.goto(`${BASE}/settings`, { waitUntil: "domcontentloaded" });
    // exact: the h1 "Settings" — "Profile Settings" also substring-matches
    await page.getByRole("heading", { name: "Settings", exact: true }).waitFor({ state: "visible", timeout: 20000 });
    const budgets = page.locator('section[aria-label="Category Budgets"]');
    await budgets.waitFor({ state: "visible", timeout: 20000 });
    await budgets.getByRole("heading", { name: "Category Budgets" }).waitFor({ state: "visible", timeout: 10000 });
    // the seeded, owner-scoped ceiling renders as a row (store hydration)
    await budgets.getByText("Groceries", { exact: true }).waitFor({ state: "visible", timeout: 30000 });
    const budgetRows = await budgets.locator("ul li").count();
    if (budgetRows < 1) throw new Error("settings: Category Budgets has no rows — seeded budgets missing?");
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/52-session214-settings-budgets.png`, fullPage: false });
    commit(`${OUT}/52-session214-settings-budgets.png`, `ASSERT OK: Settings + Category Budgets section + Groceries row (${budgetRows} budget rows)`);

    await ctx.close();

    // ---- (c) mobile 390×844: the drawer census ----------------------------
    const phoneCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const phone = await phoneCtx.newPage();
    await login(phone);
    await phone.goto(`${BASE}/Dashboard`, { waitUntil: "domcontentloaded" });
    await phone.locator("main").first().waitFor({ state: "visible", timeout: 15000 });
    // Dev-server hydration tolerance (the captures-211 lesson): a click
    // before React attaches the onClick handler does nothing. The "Open
    // navigation menu" aria-label only exists while the drawer is CLOSED,
    // so a retry click can never toggle it shut — retry until the dialog
    // mounts.
    await phone.waitForLoadState("networkidle");
    await phone.waitForTimeout(3000);
    const dialog = phone.getByRole("dialog");
    let drawerOpen = false;
    for (let attempt = 1; attempt <= 4 && !drawerOpen; attempt++) {
      const trigger = phone.getByRole("button", { name: "Open navigation menu" });
      await trigger.waitFor({ state: "visible", timeout: 10000 });
      await trigger.click();
      try {
        await dialog.waitFor({ state: "visible", timeout: 4000 });
        drawerOpen = true;
      } catch {
        console.log(`[captures-214] drawer not open after click #${attempt} — retrying (dev hydration)`);
        await phone.waitForTimeout(1500);
      }
    }
    if (!drawerOpen) throw new Error("drawer never opened after 4 clicks");
    for (const label of SECTIONS) {
      await dialog.getByRole("link", { name: label, exact: true }).waitFor({ state: "visible", timeout: 5000 });
    }
    await phone.waitForTimeout(400);
    await phone.screenshot({ path: `${OUT}/53-session214-mobile-drawer-open.png`, fullPage: false });
    commit(`${OUT}/53-session214-mobile-drawer-open.png`, `ASSERT OK: drawer dialog open + ${SECTIONS.length}/${SECTIONS.length} nav links visible (${SECTIONS.join(", ")})`);

    await phoneCtx.close();

    // ---- (d) mobile 390×844 logged-out: the login card --------------------
    // a brand-new context carries no session — the logged-out face.
    const guestCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const guest = await guestCtx.newPage();
    await guest.goto(`${BASE}/login`, { waitUntil: "networkidle" });
    await guest.locator('img[alt="WealthOS logo"]').waitFor({ state: "visible", timeout: 20000 });
    await guest.locator('input[type="email"]').waitFor({ state: "visible", timeout: 10000 });
    await guest.locator('input[type="password"]').waitFor({ state: "visible", timeout: 10000 });
    await guest.locator('button[type="submit"]').waitFor({ state: "visible", timeout: 10000 });
    await guest.waitForTimeout(1200); // let the card + info banner settle
    await guest.screenshot({ path: `${OUT}/54-session214-login-mobile.png`, fullPage: false });
    commit(`${OUT}/54-session214-login-mobile.png`, "ASSERT OK: login card renders (WealthOS logo + email/password inputs + submit)");

    await guestCtx.close();
  } finally {
    await browser.close();
  }
  console.log("[captures-214] done");
}
main().catch((e) => { console.error(e); process.exit(1); });
