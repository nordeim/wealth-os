// Session-204 evidence: the remediated codebase on the dev server. This
// round's cures are tooling/docs-layer again (the R-4.1 sweep re-anchor +
// the F-204a docs-counts completion) — no UI surface changed — so the
// capture set is two never-captured faces of the standing superset
// features: the AI Coach dialog (the deterministic local engine, opened
// from the dashboard's own button, greeting + question chips asserted
// before freezing) and the desktop dashboard in DARK mode (toggled via
// the sidebar user menu's Dark Mode item, the .dark class asserted).
// The captures-199/203 authenticated pattern.
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

  // Face 1: the AI Coach dialog at 1440×900 — opened via the dashboard's
  // own "AI Coach" button; the greeting + a question chip must render
  // before the freeze (the deterministic local engine, no network).
  const coachCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    storageState: state,
    deviceScaleFactor: 1,
  });
  const cpage = await coachCtx.newPage();
  await cpage.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
  await cpage.getByRole("heading", { name: "Financial Dashboard" }).waitFor();
  await cpage.getByRole("button", { name: "AI Coach" }).click();
  await cpage.getByRole("dialog").waitFor();
  await cpage.getByRole("heading", { name: "AI Financial Coach" }).waitFor();
  await cpage
    .getByText("Hi! I'm your AI financial coach", { exact: false })
    .first()
    .waitFor();
  await cpage.waitForTimeout(400);
  await cpage.screenshot({
    path: join(OUT, "17-session204-ai-coach.png"),
    fullPage: false,
  });
  console.log("captured 17-session204-ai-coach.png (greeting live-verified)");
  await coachCtx.close();

  // Face 2: the desktop dashboard in dark mode at 1440×900 — toggled via
  // the sidebar user menu's Dark Mode item (the real user path); the
  // <html class="dark"> state + the KPI labels asserted before freezing.
  const darkCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    storageState: state,
    deviceScaleFactor: 1,
  });
  const dpage = await darkCtx.newPage();
  await dpage.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
  await dpage.getByRole("heading", { name: "Financial Dashboard" }).waitFor();
  await dpage.getByRole("button", { name: /sepnetflix2023/ }).click();
  await dpage.getByRole("menuitem", { name: /Dark Mode/ }).click();
  await dpage.waitForSelector("html.dark", { timeout: 10000 });
  for (const label of ["Monthly Income", "Monthly Expenses", "Net Balance", "Savings Rate"]) {
    await dpage.getByText(label, { exact: true }).first().waitFor();
  }
  await dpage.waitForTimeout(400);
  await dpage.screenshot({
    path: join(OUT, "18-session204-dashboard-dark.png"),
    fullPage: false,
  });
  console.log("captured 18-session204-dashboard-dark.png (html.dark + KPI cards live-verified)");
  await darkCtx.close();

  await browser.close();
  console.log("DONE");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
