// Session-229 evidence captures (R-26 — the empty-state repair and
// dead-carrier retirement round). Three faces freeze the post-round
// surfaces with the R-26 behavior asserted in-DOM:
// 128: the Analytics Income tab's REACHABLE empty state (F-229a — a
//      from/to range before the seeded corpus empties the range domain;
//      asserted: the "No income in range" EmptyState renders and NO
//      recharts surface rides the card; pre-cure: a flat all-zero
//      chart — the length gate could never fire, the e2e leg's
//      born-RED proof).
// 129: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted:
//      the link census).
// 130: the Add Expense dialog at 390×844 with its title LEFT-ALIGNED
//      (F-229e — asserted: the DialogTitle element computes
//      textAlign start, the reference's own genus live-probed at 390
//      by probe-229-dialog4; the pre-229 docblock's "centers below sm"
//      claim was false and is corrected in the source).
// The script rides the own-database convention (session 225, R-22,
// F-225e + session 226's F-226g liveness check): db/captures.db
// recreated + seeded per run, the spawned dev server carries
// DATABASE_URL=file:../db/captures.db, the spawn-liveness check
// guards the :3000 race, custom.db is never touched, and a census
// tripwire guards the exit.
import { chromium, type Page } from "@playwright/test";
import { statSync, unlinkSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import * as path from "node:path";
import { join } from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-229.ts") process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";
const CAPTURES_DB_URL = "file:../db/captures.db";

const DESTINATIONS = [
  "Dashboard",
  "Income",
  "Expenses",
  "Accounts",
  "Investments",
  "Import",
  "Analytics",
  "Goals",
  "Settings",
];

/** F-225e: recreate + seed db/captures.db (deterministic per run). */
function seedCapturesDb() {
  try {
    unlinkSync(join(process.cwd(), "db", "captures.db"));
  } catch {
    /* absent — a fresh run */
  }
  for (const cmd of [["run", "db:push"], ["run", "db:seed"]] as const) {
    const r = spawnSync("bun", [...cmd], {
      cwd: process.cwd(),
      env: { ...process.env, DATABASE_URL: CAPTURES_DB_URL },
      stdio: "ignore",
    });
    if (r.status !== 0) {
      throw new Error(`the captures db: bun ${cmd.join(" ")} failed (${r.status})`);
    }
  }
}

/** F-225e: spawn the dev server riding db/captures.db. */
function bootCapturesDb(): ReturnType<typeof spawn> {
  const devEnv: NodeJS.ProcessEnv = { ...process.env, DATABASE_URL: CAPTURES_DB_URL };
  return spawn("bun", ["run", "dev"], {
    cwd: process.cwd(),
    env: devEnv,
    stdio: "ignore",
    detached: true,
  });
}

/** F-225e: the census tripwire — custom.db must MATCH at exit. */
function censusTripwire(): number {
  const censusEnv: NodeJS.ProcessEnv = { ...process.env };
  delete censusEnv.DATABASE_URL; // .env's file:../db/custom.db rides (the F-123a1 guard)
  const census = spawnSync("bun", ["run", "db:census"], {
    cwd: process.cwd(),
    env: censusEnv,
    stdio: "ignore",
  });
  if (census.status !== 0) {
    console.error("[captures-229] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-229] the census tripwire: custom.db MATCH");
  return 0;
}

async function waitOnUrl(url: string, ms: number): Promise<boolean> {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(url, { redirect: "follow" });
      if (r.ok) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

async function login(page: Page, base: string) {
  await page.goto(`${base}/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(1800);
}

function commit(file: string, note: string) {
  const bytes = statSync(`${OUT}/${file}`).size;
  if (bytes < 30_000) throw new Error(`${file}: suspiciously small (${bytes}B) — blank?`);
  console.log(`[captures-229] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-229] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-229] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-229] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-229] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-229] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-229] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 128: the reachable Income-tab empty state (F-229a) ------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Analytics`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      // A range entirely before the corpus — no rows, income or otherwise.
      await page.getByLabel("From date").fill("2024-01-01");
      await page.getByLabel("To date").fill("2024-03-31");
      await page.getByRole("tab", { name: "Income" }).click();
      await page.waitForTimeout(1500);
      const incomeCard = page.locator("section").filter({ hasText: "Income Trend" }).first();
      if (!(await incomeCard.getByText("No income in range").count())) {
        throw new Error("128: the Income-tab empty state did not render (pre-cure: the flat all-zero chart)");
      }
      const surfaces = await incomeCard.locator("svg.recharts-surface").count();
      if (surfaces !== 0) {
        throw new Error(`128: ${surfaces} recharts surface(s) ride the empty Income card — expected none`);
      }
      await page.screenshot({ path: `${OUT}/128-session229-income-empty-state.png` });
      commit("128-session229-income-empty-state.png", "the Analytics Income tab showing the REACHABLE 'No income in range' empty state on a pre-corpus range (F-229a)");
    }

    // ---- 129: the mobile drawer at 390×844 (the standing ask) ----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("129: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`129: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("129: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/129-session229-mobile-drawer-390.png` });
      commit("129-session229-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing mobile-nav ask)");
    }

    // ---- 130: the left-aligned dialog title at 390 (F-229e) ------------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      await page.getByRole("button", { name: /Add Expense/i }).first().click();
      await page.waitForTimeout(1500);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("130: the Add Expense dialog did not open");
      // The reference's own genus (probe-229-dialog4): the title computes
      // textAlign start — left-aligned at every width. The pre-229
      // docblock claimed the reference centers below sm (it does not).
      const titleAlign = await dialog
        .locator("[class*='font-semibold']")
        .first()
        .evaluate((el) => getComputedStyle(el).textAlign);
      if (titleAlign === "center") {
        throw new Error(`130: the dialog title centers ("${titleAlign}") — the reference's own genus is left-aligned at 390`);
      }
      await page.screenshot({ path: `${OUT}/130-session229-dialog-title-left-390.png` });
      commit("130-session229-dialog-title-left-390.png", "the Add Expense dialog at 390×844 with its left-aligned title — the reference's live-probed genus (F-229e)");
    }

    await browser.close();
    console.log("[captures-229] all three faces verified");
  } finally {
    if (spawned?.pid) {
      try {
        process.kill(-spawned.pid, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
    if (censusTripwire() !== 0) process.exit(1);
  }
}

main().catch((e) => {
  console.error(`[captures-229] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
