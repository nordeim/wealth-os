// Session-231 evidence captures (R-28 — the a11y-tail, logging-grain,
// and dead-family round). Three faces freeze the post-round surfaces
// with the R-28 behavior asserted in-DOM:
// 134: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted:
//      the link census).
// 135: the auth-card view swap (F-231b's surface) — asserted: clicking
//      "Need an account? Sign up" lands FOCUS on the "Create your
//      account" heading (document.activeElement is the h1) — the four
//      unmanaged swaps are managed now, and the initial load keeps
//      natural focus (the mount guard).
// 136: the Analytics "Spending by Day of Week" bars (F-231e's surface)
//      — asserted: the bars compute the spending rose rgb(244, 63, 94)
//      (CHART_COLORS.expenses), never the retired Net-Savings amber —
//      the palette doctrine on our own superset card (probe-231/b/c:
//      the reference has no such card).
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
if (path.basename(process.argv[1] ?? "") !== "captures-231.ts") process.exit(0);

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
    console.error("[captures-231] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-231] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-231] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-231] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-231] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-231] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-231] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-231] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-231] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 134: the mobile drawer at 390×844 (the standing ask) ----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("134: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`134: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("134: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/134-session231-mobile-drawer-390.png` });
      commit("134-session231-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing mobile-nav ask)");
    }

    // ---- 135: the auth-card view swap lands focus (F-231b) -------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      // The mount guard: the initial load keeps natural focus.
      const initialFocus = await page.evaluate(() => document.activeElement?.tagName ?? "none");
      if (initialFocus === "H1") {
        throw new Error("135: the initial load stole focus — the mount guard is broken");
      }
      await page.getByRole("button", { name: "Need an account? Sign up" }).click();
      await page.waitForTimeout(900);
      const heading = page.getByRole("heading", { name: "Create your account" });
      if (!(await heading.count())) throw new Error("135: the signup view did not render");
      const focused = await heading.evaluate((el) => el === document.activeElement);
      if (!focused) {
        throw new Error("135: the swap did not land focus on the Create-your-account heading (F-231b)");
      }
      // The back swap lands on the signin heading too (the pattern is
      // symmetric).
      await page.getByRole("button", { name: "Back to sign in" }).click();
      await page.waitForTimeout(600);
      const backFocused = await page
        .getByRole("heading", { name: "Welcome to WealthOS" })
        .evaluate((el) => el === document.activeElement);
      if (!backFocused) {
        throw new Error("135: the back-swap did not land focus on the signin heading");
      }
      // End on the signup view for the frozen face.
      await page.getByRole("button", { name: "Need an account? Sign up" }).click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: `${OUT}/135-session231-authcard-swap-focus.png` });
      commit("135-session231-authcard-swap-focus.png", "the auth-card signup swap with focus landed on the heading (F-231b) — the mount guard kept the initial load natural");
    }

    // ---- 136: the day-of-week bars in the spending hue (F-231e) --------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Analytics`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2200);
      const card = page
        .locator("section")
        .filter({ hasText: "Spending by Day of Week" })
        .first();
      if (!(await card.count())) throw new Error("136: the day-of-week card did not render");
      const rose = await card.locator('path[fill="#f43f5e"]').count();
      const amber = await card.locator('path[fill="#f59e0b"]').count();
      if (rose === 0) {
        throw new Error("136: no spending-hue bars in the day-of-week card (expected #f43f5e — CHART_COLORS.expenses)");
      }
      if (amber > 0) {
        throw new Error("136: the retired Net-Savings amber still rides the day-of-week bars (F-231e)");
      }
      await page.screenshot({ path: `${OUT}/136-session231-day-of-week-spending-hue.png` });
      commit("136-session231-day-of-week-spending-hue.png", "the Spending by Day of Week bars in the palette doctrine's spending rose (F-231e) — the superset card's own hue, never the retired amber");
    }

    await browser.close();
    console.log("[captures-231] all three faces verified");
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
  console.error(`[captures-231] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
