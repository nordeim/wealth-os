// Session-201 (D-201c evidence): capture the remediated reset-password
// set-password card — the surface whose subtitle read "Enter your new
// password for NEO CRM" since the scaffold era. The card renders its
// form state for any non-empty ?token= (the e2e shape-probe idiom);
// no auth needed (the route is public and session-agnostic).
import { chromium } from "@playwright/test";
import { join } from "node:path";

const BASE = "http://localhost:3000";
const OUT = join(import.meta.dirname, "..", "docs", "screenshots");

async function main(): Promise<void> {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/reset-password?token=capture-probe`, {
    waitUntil: "networkidle",
  });
  await page.getByRole("heading", { name: "Set new password" }).waitFor();
  // The remediated brand line — assert it in the live render, then freeze it.
  await page
    .getByText("Enter your new password for WealthOS")
    .waitFor();
  await page.waitForTimeout(300);
  await page.screenshot({
    path: join(OUT, "14-reset-password.png"),
    fullPage: false,
  });
  console.log("captured 14-reset-password.png (WealthOS brand line verified live)");
  await ctx.close();
  await browser.close();
  console.log("DONE");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
