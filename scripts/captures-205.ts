// Session-205 evidence: the R-4.2 round's cures are the sweep toolchain
// (the F-205a per-page theme match + the maiden baseline derivation) —
// again no product UI surface changed. The capture set documents the
// genus the sweep now compares: (1) the dark-mode dashboard exactly as
// the sweep writes it (wealthos-theme=dark via localStorage — the
// no-FOUC inline-script path, not the menu toggle: the sweep's own
// mechanism, live-asserted), and (2) the dark-mode mobile drawer at
// 390×844 the same way (the phone-class genus the maiden measured —
// never captured dark before). The captures-199/203/204 authenticated
// pattern.
import { chromium } from "@playwright/test";
import { join } from "node:path";

const BASE = "http://localhost:3000";
const OUT = join(import.meta.dirname, "..", "docs", "screenshots");
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

async function main(): Promise<void> {
  const browser = await chromium.launch();

  // Login through the real UI, persist the storage state.
  const authCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
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

  // Face 1: the desktop dashboard in dark mode at 1440×900 — written the
  // SWEEP's way (localStorage wealthos-theme=dark before the navigation,
  // applied by the no-FOUC inline script at document start), matching the
  // F-205a theme-match mechanism exactly. html.dark + the four KPI
  // labels asserted before freezing.
  const darkCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    storageState: state,
    deviceScaleFactor: 1,
  });
  await darkCtx.addInitScript(
    ([url, theme]) => {
      if (location.origin === url) window.localStorage.setItem("wealthos-theme", theme);
    },
    [BASE, "dark"],
  );
  const dpage = await darkCtx.newPage();
  await dpage.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
  await dpage.waitForSelector("html.dark", { timeout: 10000 });
  await dpage.getByRole("heading", { name: "Financial Dashboard" }).waitFor();
  for (const label of ["Monthly Income", "Monthly Expenses", "Net Balance", "Savings Rate"]) {
    await dpage.getByText(label, { exact: true }).first().waitFor();
  }
  await dpage.waitForTimeout(400);
  await dpage.screenshot({
    path: join(OUT, "19-session205-dashboard-dark-sweepstate.png"),
    fullPage: false,
  });
  console.log("captured 19-session205-dashboard-dark-sweepstate.png (html.dark via localStorage + KPI cards live-verified)");
  await darkCtx.close();

  // Face 2: the mobile drawer in dark mode at 390×844 — the phone-class
  // genus the maiden measured, never captured dark before. The drawer
  // opened via the accessible hamburger name; html.dark + all 9 nav
  // destinations asserted before freezing.
  const mobCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    storageState: state,
    deviceScaleFactor: 1,
  });
  await mobCtx.addInitScript(
    ([url, theme]) => {
      if (location.origin === url) window.localStorage.setItem("wealthos-theme", theme);
    },
    [BASE, "dark"],
  );
  const mpage = await mobCtx.newPage();
  await mpage.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
  await mpage.waitForSelector("html.dark", { timeout: 10000 });
  await mpage.getByRole("heading", { name: "Financial Dashboard" }).waitFor();
  await mpage.getByRole("button", { name: "Open navigation menu" }).click();
  await mpage.getByRole("dialog").waitFor();
  for (const dest of ["Dashboard", "Income", "Expenses", "Accounts", "Investments", "Import", "Analytics", "Goals", "Settings"]) {
    await mpage.getByRole("link", { name: dest, exact: true }).first().waitFor();
  }
  await mpage.waitForTimeout(400);
  await mpage.screenshot({
    path: join(OUT, "20-session205-mobile-drawer-dark.png"),
    fullPage: false,
  });
  console.log("captured 20-session205-mobile-drawer-dark.png (html.dark + drawer + 9 destinations live-verified)");
  await mobCtx.close();

  await browser.close();
  console.log("DONE");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
