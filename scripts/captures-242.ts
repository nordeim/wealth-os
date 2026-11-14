// Session-242 evidence captures (R-39 — the CSP-inventory pin,
// test-hygiene, and carrier-truth round). Four faces freeze the
// post-round surfaces with the R-39 behavior asserted in-DOM:
// 170: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census).
// 171: the login card's forgot-password link at 1440 (F-242e's second
//      conversion site) — the link rides the cn() appendage form
//      (asserted: the 14px text step + the 500 medium weight the
//      appendage carries; twMerge byte-identical to the retired
//      interpolation).
// 172: the signup verify view's six OTP boxes at 1440 (F-242e's first
//      conversion site) — the boxes ride the cn() appendage form
//      (asserted: 40px width · 44px height · centered text · 600
//      weight · the 14px desktop text step).
// 173: the Analytics Export at 1440 (F-242a's blob canary) — under
//      the pinned fetch directives the Export click still fires the
//      CSV DOWNLOAD (asserted: the download event + the
//      prefix_YYYY-MM-DD.csv name convention; an anchor-click download
//      is ungoverned by the fetch directives — the inventory's
//      canary, exercised live on the dev server).
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

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-242.ts") process.exit(0);

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
    unlinkSync(path.join(process.cwd(), "db", "captures.db"));
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
    console.error("[captures-242] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-242] the census tripwire: custom.db MATCH");
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

function commit(file: string, note: string, minBytes = 30_000) {
  const bytes = statSync(`${OUT}/${file}`).size;
  if (bytes < minBytes) throw new Error(`${file}: suspiciously small (${bytes}B) — blank?`);
  console.log(`[captures-242] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-242] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-242] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-242] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-242] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-242] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-242] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 170: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("170: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`170: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("170: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/170-session242-mobile-drawer-390.png` });
      commit("170-session242-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
    }

    // ---- 171: the forgot-password link appendage (F-242e, site 2) -------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1200);
      const geo = await page.evaluate(() => {
        const el = [
          ...document.querySelectorAll("button"),
        ].find((b) => b.textContent?.trim() === "Forgot password?") as HTMLElement | null;
        if (!el) return null;
        const cs = getComputedStyle(el);
        return { fontSize: cs.fontSize, fontWeight: cs.fontWeight };
      });
      if (!geo) throw new Error("171: the Forgot password? link not found");
      if (geo.fontSize !== "14px") {
        throw new Error(`171: the forgot link computes font ${geo.fontSize} (expected 14px — the footer link's text step)`);
      }
      if (geo.fontWeight !== "500") {
        throw new Error(`171: the forgot link computes weight ${geo.fontWeight} (expected 500 — the medium appendage)`);
      }
      await page.screenshot({ path: `${OUT}/171-session242-login-forgot-link-1440.png` });
      commit(
        "171-session242-login-forgot-link-1440.png",
        `the login card at 1440 — the forgot link rides the cn() appendage form (asserted: ${geo.fontSize}/${geo.fontWeight} — the medium weight the appendage carries, twMerge byte-identical to the retired interpolation)`,
      );
    }

    // ---- 172: the OTP boxes appendage (F-242e, site 1) ------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1200);
      // The in-place signup swap (the reference's own pattern) — a
      // fresh address on the captures db reaches the verify view.
      await page.getByRole("button", { name: "Need an account? Sign up" }).click();
      await page.waitForTimeout(600);
      await page.getByLabel("Email").fill("captures-otp-242@wealthos.local");
      await page.getByLabel("Password", { exact: true }).fill("CapturesPass123");
      await page.getByLabel("Confirm Password").fill("CapturesPass123");
      await page.getByRole("button", { name: "Create account" }).click();
      await page.getByRole("heading", { name: "Verify your email" }).waitFor({
        state: "visible",
        timeout: 15_000,
      });
      await page.waitForTimeout(900);
      const geo = await page.evaluate(() => {
        const el = document.querySelector('input[aria-label="Digit 1"]') as HTMLElement | null;
        if (!el) return null;
        const cs = getComputedStyle(el);
        return {
          width: cs.width,
          height: cs.height,
          textAlign: cs.textAlign,
          fontWeight: cs.fontWeight,
          fontSize: cs.fontSize,
        };
      });
      if (!geo) throw new Error("172: the Digit 1 OTP box not found");
      if (geo.width !== "40px") {
        throw new Error(`172: the OTP box computes width ${geo.width} (expected 40px — the code-input step)`);
      }
      if (geo.height !== "44px") {
        throw new Error(`172: the OTP box computes height ${geo.height} (expected 44px — the code-input height)`);
      }
      if (geo.textAlign !== "center") {
        throw new Error(`172: the OTP box computes text-align ${geo.textAlign} (expected center — the code-input centering)`);
      }
      if (geo.fontWeight !== "600") {
        throw new Error(`172: the OTP box computes weight ${geo.fontWeight} (expected 600 — the semibold digit)`);
      }
      if (geo.fontSize !== "14px") {
        throw new Error(`172: the OTP box computes font ${geo.fontSize} (expected 14px — the desktop text step)`);
      }
      await page.screenshot({ path: `${OUT}/172-session242-signup-otp-boxes-1440.png` });
      commit(
        "172-session242-signup-otp-boxes-1440.png",
        `the signup verify view at 1440 — the six OTP boxes ride the cn() appendage form (asserted: ${geo.width} × ${geo.height} · ${geo.textAlign} · ${geo.fontWeight} · ${geo.fontSize} — twMerge byte-identical to the retired interpolation)`,
      );
    }

    // ---- 173: the Analytics Export download (F-242a's blob canary) ------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Analytics`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const exportBtn = page.getByRole("button", { name: "Export" });
      if (!(await exportBtn.count())) throw new Error("173: the Export button not found");
      const [download] = await Promise.all([
        page.waitForEvent("download", { timeout: 15_000 }),
        exportBtn.click(),
      ]);
      const name = download.suggestedFilename();
      if (!/^wealthos-analytics_\d{4}-\d{2}-\d{2}\.csv$/.test(name)) {
        throw new Error(`173: the download name "${name}" does not match the csvFilename convention`);
      }
      await page.screenshot({ path: `${OUT}/173-session242-analytics-export-download-1440.png` });
      commit(
        "173-session242-analytics-export-download-1440.png",
        `the Analytics page at 1440 — the Export click fired the CSV download "${name}" under the pinned fetch directives (asserted: the download event + the prefix_YYYY-MM-DD.csv convention — the blob canary)`,
      );
    }

    await browser.close();
    console.log("[captures-242] all four faces verified");
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
  console.error(`[captures-242] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
