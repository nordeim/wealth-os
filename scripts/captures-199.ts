// Session-199 screenshot battery: captures the dev server's key faces
// into docs/screenshots/ — desktop sections, the mobile drawer (opened
// via the hamburger, the plain-div non-Radix drawer), and the login page.
// Logs in through the real UI (the auth.setup pattern) to mint the
// session cookie, then reuses the storage state for every shot.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE = "http://localhost:3000";
const OUT = join(import.meta.dirname, "..", "docs", "screenshots");
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

const SHOTS: Array<{ name: string; route: string; width: number; height: number }> = [
  { name: "02-dashboard", route: "/Dashboard", width: 1440, height: 900 },
  { name: "03-income", route: "/Income", width: 1440, height: 900 },
  { name: "04-expenses", route: "/Expenses", width: 1440, height: 900 },
  { name: "05-accounts", route: "/Accounts", width: 1440, height: 900 },
  { name: "06-investments", route: "/Investments", width: 1440, height: 900 },
  { name: "07-import", route: "/Import", width: 1440, height: 900 },
  { name: "08-analytics", route: "/Analytics", width: 1440, height: 900 },
  { name: "09-goals", route: "/Goals", width: 1440, height: 900 },
  { name: "10-settings", route: "/Settings", width: 1440, height: 900 },
  { name: "11-mobile-dashboard", route: "/Dashboard", width: 390, height: 844 },
  { name: "12-mobile-expenses", route: "/Expenses", width: 390, height: 844 },
];

async function main(): Promise<void> {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();

  // 1. The login face (guest context).
  const guest = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const gpage = await guest.newPage();
  await gpage.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await gpage.screenshot({ path: join(OUT, "01-login.png"), fullPage: false });
  await guest.close();
  console.log("captured 01-login");

  // 2. Login through the real UI (the auth.setup pattern), persist state.
  const authCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const apage = await authCtx.newPage();
  await apage.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await apage.getByLabel("Email").fill(EMAIL);
  await apage.getByLabel("Password").fill(PASSWORD);
  await apage.getByRole("button", { name: "Sign in" }).click();
  await apage.waitForURL(`${BASE}/`);
  await apage.getByRole("heading", { name: "Financial Dashboard" }).waitFor();
  const state = await authCtx.storageState();
  await authCtx.close();
  console.log("authenticated");

  for (const shot of SHOTS) {
    const ctx = await browser.newContext({
      viewport: { width: shot.width, height: shot.height },
      storageState: state,
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE}${shot.route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(400); // let charts settle
    await page.screenshot({ path: join(OUT, `${shot.name}.png`), fullPage: false });
    await ctx.close();
    console.log(`captured ${shot.name}`);
  }

  // 3. The mobile drawer, opened via the hamburger (the plain-div drawer).
  const mctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    storageState: state,
    deviceScaleFactor: 1,
  });
  const mpage = await mctx.newPage();
  await mpage.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
  await mpage.waitForTimeout(400);
  // The mobile header's hamburger is the first button in the header bar.
  await mpage.locator("header button").first().click();
  await mpage.waitForTimeout(600); // drawer animation
  await mpage.screenshot({ path: join(OUT, "13-mobile-drawer-open.png"), fullPage: false });
  console.log("captured 13-mobile-drawer-open");
  await mctx.close();

  await browser.close();
  console.log("DONE");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
