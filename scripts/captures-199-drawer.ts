// Session-199 fix-up: recapture 13-mobile-drawer-open.png with the
// CORRECT hamburger selector (aria-label "Open navigation menu") — the
// previous run's header-button-first() click hit the theme toggle.
import { chromium } from "@playwright/test";
import { join } from "node:path";

const BASE = "http://localhost:3000";
const OUT = join(import.meta.dirname, "..", "docs", "screenshots");

async function main(): Promise<void> {
  const browser = await chromium.launch();

  // Login through the real UI (the auth.setup pattern).
  const authCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const apage = await authCtx.newPage();
  await apage.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await apage.getByLabel("Email").fill("sepnetflix2023@outlook.com");
  await apage.getByLabel("Password").fill("$Abcd1234");
  await apage.getByRole("button", { name: "Sign in" }).click();
  await apage.waitForURL(`${BASE}/`);
  await apage.getByRole("heading", { name: "Financial Dashboard" }).waitFor();
  const state = await authCtx.storageState();
  await authCtx.close();

  const mctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    storageState: state,
    deviceScaleFactor: 1,
  });
  const mpage = await mctx.newPage();
  await mpage.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
  await mpage.waitForTimeout(400);
  // The hamburger — its accessible name, NOT its DOM position (the theme
  // toggle sits first in the header's action cluster).
  await mpage.getByRole("button", { name: "Open navigation menu" }).click();
  await mpage.waitForTimeout(700); // drawer animation
  await mpage.screenshot({ path: join(OUT, "13-mobile-drawer-open.png"), fullPage: false });
  console.log("recaptured 13-mobile-drawer-open");
  await mctx.close();

  await browser.close();
  console.log("DONE");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
