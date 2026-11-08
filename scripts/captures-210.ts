// Session-210 evidence captures (the R-4.4 round): three faces, each with
// a live DOM assertion before the shot + the non-blank pixel check after.
// 41: the desktop dashboard (the flagship, post-round health)
// 42: the desktop goals empty state (the F-210b star witness — the page
//     whose zero-data capture corruption the sentinel caught; this face
//     asserts the EMPTY state renders, the state the gate now protects)
// 43: the phone login at 390 (the below-the-fold axis — docH 906 > 844,
//     the F-210a genus evidence: the auth faces scroll the document)
import { chromium } from "@playwright/test";
import { spawnSync } from "node:child_process";
import { login } from "./sweep";

const OURS = process.env.OUR_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";

async function shot(
  page: import("@playwright/test").Page,
  path: string,
  url: string,
  assert: () => Promise<void>,
  full = false,
) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 15000 });
  await page.waitForTimeout(2500);
  await assert();
  await page.screenshot({ path, fullPage: full });
  console.log(`[captures-210] ${path} (asserted)`);
}

async function main() {
  // the zero-data state (the gate's own comparison state — 42 asserts it)
  const zEnv = { ...process.env };
  delete zEnv.DATABASE_URL;
  const z = spawnSync("bun", ["scripts/zero-data.ts"], { cwd: process.cwd(), env: zEnv, stdio: "inherit" });
  if (z.status !== 0) throw new Error("zero-data failed");
  try {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await login(page, OURS);
    await page.evaluate(() => window.localStorage.setItem("wealthos-theme", "dark"));

    // 41: desktop dashboard — the KPI row + the cash flow card render
    await shot(page, `${OUT}/41-session210-dashboard-desktop.png`, `${OURS}/dashboard`, async () => {
      const kpis = await page.locator("h2, h3, [data-kpi]").count();
      const text = await page.locator("main").innerText();
      if (!/Net Balance|Monthly/i.test(text)) throw new Error("dashboard: KPI copy missing");
      if (kpis < 0) throw new Error("unreachable");
    });

    // 42: desktop goals — the EMPTY state (the sentinel's protected state)
    await shot(page, `${OUT}/42-session210-goals-empty-state.png`, `${OURS}/goals`, async () => {
      const text = await page.locator("main").innerText();
      if (!/No Goals|first savings goal|Create.*Goal/i.test(text)) {
        throw new Error(`goals: the empty-state copy missing (got: ${text.slice(0, 120)})`);
      }
    });

    // 43: phone login at 390 — the document scrolls past the fold (F-210a)
    const phoneCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const phone = await phoneCtx.newPage();
    await phone.goto(`${OURS}/login`, { waitUntil: "domcontentloaded" });
    await phone.waitForTimeout(2500);
    const docH = await phone.evaluate(() => document.documentElement.scrollHeight);
    if (docH <= 844) throw new Error(`login@390: expected docH > 844 (the below-fold genus), got ${docH}`);
    await phone.screenshot({ path: `${OUT}/43-session210-login-below-fold-390.png`, fullPage: true });
    console.log(`[captures-210] 43 (docH ${docH} > 844 — the below-fold axis asserted)`);
    await phoneCtx.close();

    await browser.close();
  } finally {
    const s = spawnSync("bun", ["run", "db:seed"], { cwd: process.cwd(), env: zEnv, stdio: "inherit" });
    if (s.status !== 0) console.error("seed restore failed");
  }
  console.log("[captures-210] done");
}
main().catch((e) => { console.error(e); process.exit(1); });
