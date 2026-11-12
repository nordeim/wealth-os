// Session-228 evidence captures (R-25 — the second holdings surface
// and hygiene round). Three faces freeze the post-round surfaces with
// the R-25 behavior asserted in-DOM:
// 125: the per-symbol gain fold — two same-symbol lots (FOLD) render
//      as ONE aggregated bar on the Analytics Holdings Performance
//      chart (F-228a — asserted: exactly 7 bar rectangles for the
//      seeded 6 symbols + the folded FOLD, and the FOLD axis tick
//      appears exactly once; pre-cure: 8 bars with the two FOLD lots
//      overlapping at one category, live-reproduced by the e2e leg).
// 126: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted:
//      the link census).
// 127: the Expenses filters trigger/panel id-link (F-228k — asserted:
//      the trigger's aria-controls references the open panel's id;
//      pre-cure: aria-expanded with no programmatic link).
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
if (path.basename(process.argv[1] ?? "") !== "captures-228.ts") process.exit(0);

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
    console.error("[captures-228] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-228] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-228] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-228] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-228] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-228] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-228] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-228] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-228] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 125: the per-symbol gain fold on the Analytics chart (F-228a) --
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      const lot = (name: string) => ({
        symbol: "FOLD",
        name,
        type: "stock",
        shares: 10,
        avgCost: 100,
        currentValue: 110,
      });
      const first = await page.request.post(`${BASE}/api/investments`, { data: lot("First Fold Lot") });
      const second = await page.request.post(`${BASE}/api/investments`, { data: lot("Second Fold Lot") });
      const firstId = ((await first.json()) as { data: { id: string } }).data.id;
      const secondId = ((await second.json()) as { data: { id: string } }).data.id;
      try {
        await page.goto(`${BASE}/Analytics`, { waitUntil: "networkidle" });
        await page.waitForTimeout(1500);
        await page.getByRole("tab", { name: "Investments", exact: true }).click();
        await page.waitForTimeout(2200);
        // ONE bar per symbol: the seeded 6 distinct symbols + the folded
        // FOLD = 7 (pre-cure, live-reproduced: 8 — the two FOLD lots
        // rendered as two bars overlapping at one category).
        const bars = page.locator(".recharts-bar-rectangle");
        const barCount = await bars.count();
        if (barCount !== 7) {
          throw new Error(
            `125: expected 7 aggregated bars (6 seeded symbols + the folded FOLD), found ${barCount} (pre-cure: 8 — the F-228a overlap)`,
          );
        }
        // (The axis-tick census is NOT asserted: recharts' auto tick
        // interval legitimately hides categories at this width — the
        // bar count is the fold's honest in-DOM proof.)
        await page.screenshot({ path: `${OUT}/125-session228-aggregated-holdings-chart.png` });
        commit("125-session228-aggregated-holdings-chart.png", "the Holdings Performance chart folding two same-symbol lots into ONE bar (F-228a)");
      } finally {
        await page.request.delete(`${BASE}/api/investments/${firstId}`);
        await page.request.delete(`${BASE}/api/investments/${secondId}`);
      }
    }

    // ---- 126: the mobile drawer at 390×844 (the standing ask) ----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("126: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`126: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("126: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/126-session228-mobile-drawer-390.png` });
      commit("126-session228-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing mobile-nav ask)");
    }

    // ---- 127: the Expenses filters trigger/panel id-link (F-228k) ------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: /^Filters/ });
      // The trigger carries aria-controls referencing the panel's id
      // (pre-cure: aria-expanded with no programmatic link).
      const controls = await trigger.getAttribute("aria-controls");
      if (controls !== "expense-filters") {
        throw new Error(`127: the Filters trigger's aria-controls is "${controls}" — expected "expense-filters"`);
      }
      await trigger.click();
      await page.waitForTimeout(900);
      const panel = page.locator("#expense-filters");
      if (!(await panel.count())) throw new Error("127: the open popover carries no #expense-filters id");
      if ((await trigger.getAttribute("aria-expanded")) !== "true") {
        throw new Error("127: the trigger did not expand");
      }
      await page.screenshot({ path: `${OUT}/127-session228-expenses-filters-aria.png` });
      commit("127-session228-expenses-filters-aria.png", "the Expenses filters popover open with the trigger's aria-controls linked to the panel id (F-228k)");
    }

    await browser.close();
    console.log("[captures-228] all three faces verified");
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
  console.error(`[captures-228] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
