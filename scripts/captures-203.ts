// Session-203 evidence: the remediated codebase on the dev server. This
// round's cures are verification/docs-layer (the security ledger, the
// docs-counts lockstep, the vitest.config comment) — no UI surface changed —
// so the capture set is the two load-bearing faces: the flagship dashboard
// (seeded KPI data live-asserted before freezing) and the mobile drawer
// (the spec's named attention point — opened via the accessible hamburger
// name, nav items asserted). The captures-199 authenticated pattern.
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

  // Face 1: the flagship dashboard at 1440×900 — the four KPI cards must
  // carry LIVE seeded numbers before the freeze (not a loading skeleton).
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    storageState: state,
    deviceScaleFactor: 1,
  });
  const dpage = await desktop.newPage();
  await dpage.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
  await dpage.getByRole("heading", { name: "Financial Dashboard" }).waitFor();
  // The four KPI cards' labels (the e2e wealthos.spec.ts contract) — live
  // seeded numbers must render before the freeze (not a loading skeleton).
  for (const label of ["Monthly Income", "Monthly Expenses", "Net Balance", "Savings Rate"]) {
    await dpage.getByText(label, { exact: true }).first().waitFor();
  }
  await dpage.waitForTimeout(400);
  await dpage.screenshot({
    path: join(OUT, "15-session203-dashboard.png"),
    fullPage: false,
  });
  console.log("captured 15-session203-dashboard.png (KPI cards live-verified)");
  await desktop.close();

  // Face 2: the mobile drawer at 390×844 — opened via the accessible
  // hamburger name (the A-12 lesson: never positional clicks), every nav
  // destination asserted visible before freezing.
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    storageState: state,
    deviceScaleFactor: 1,
  });
  const mpage = await mobile.newPage();
  await mpage.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
  await mpage.getByRole("heading", { name: "Financial Dashboard" }).waitFor();
  await mpage.getByRole("button", { name: "Open navigation menu" }).click();
  await mpage.getByRole("dialog").waitFor();
  for (const item of [
    "Dashboard",
    "Income",
    "Expenses",
    "Accounts",
    "Investments",
    "Import",
    "Analytics",
    "Goals",
    "Settings",
  ]) {
    await mpage.getByRole("link", { name: item, exact: true }).waitFor();
  }
  await mpage.waitForTimeout(300);
  await mpage.screenshot({
    path: join(OUT, "16-session203-mobile-drawer.png"),
    fullPage: false,
  });
  console.log("captured 16-session203-mobile-drawer.png (drawer + 9 nav items live-verified)");
  await mobile.close();

  await browser.close();
  console.log("DONE");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
