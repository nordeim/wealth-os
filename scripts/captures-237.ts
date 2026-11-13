// Session-237 evidence captures (R-34 — the error-face, transient-seam,
// and remount-gate round). Three faces freeze the post-round surfaces
// with the R-34 behavior asserted in-DOM:
// 152: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census).
// 153: the first-load failure face (F-237a's surface) — a hydrate that
//      answers 500 (route-intercepted — the deterministic trigger for
//      the server-failure window) renders the F-216c/d error banner +
//      Try-again, NEVER the login wall (asserted: the banner text, the
//      retry button, and the URL still on the app route).
// 154: the transient-503 face (F-237b's surface) — the same banner
//      carrying the UNAVAILABLE family's copy ("The request took too
//      long — the database timed out. Try again.") — the honest answer
//      a pool/transaction timeout renders through the completed family
//      (asserted: the byte-exact copy in the alert).
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
if (path.basename(process.argv[1] ?? "") !== "captures-237.ts") process.exit(0);

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
    console.error("[captures-237] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-237] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-237] ${file} — ${note} (${bytes}B)`);
}

/** The F-237a/F-237b shared face harness: intercept /api/dashboard
 *  with a failure envelope, reload, and return the banner locator
 *  (scoped by text — Next's route announcer also carries the alert
 *  role on app pages, the round's third live lesson). */
async function failureFace(
  page: Page,
  base: string,
  envelope: { status: number; code: string; message: string },
) {
  // Pre-warm the lowercase twin (the dev server compiles each route on
  // demand; the first hit can outrun a face-wait). The warm pass
  // renders the NORMAL dashboard — the interception arms after.
  await page.goto(`${base}/dashboard`, { waitUntil: "load", timeout: 60_000 });
  await page.waitForTimeout(1500);
  await page.route("**/api/dashboard", (route) =>
    route.fulfill({
      status: envelope.status,
      contentType: "application/json",
      body: JSON.stringify({
        ok: false,
        error: { code: envelope.code, message: envelope.message },
      }),
    }),
  );
  await page.reload({ waitUntil: "domcontentloaded" });
  // The banner is STABLE on the failure path (no redirect fires — the
  // F-237a discriminator at work); no navigation hold is needed.
  const banner = page.getByRole("alert").filter({ hasText: "Couldn't load your data" });
  await banner.waitFor({ state: "visible", timeout: 30_000 });
  return { banner };
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-237] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-237] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-237] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-237] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-237] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-237] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 152: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("152: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`152: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("152: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/152-session237-mobile-drawer-390.png` });
      commit("152-session237-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
    }

    // ---- 153: the first-load failure face (F-237a) ----------------------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      const { banner } = await failureFace(page, BASE, {
        status: 500,
        code: "INTERNAL",
        message: "Something went wrong. Please try again.",
      });
      // The retry affordance rides the banner (the F-216c/d face).
      const retry = page.getByRole("button", { name: "Try again" });
      if (!(await retry.count())) throw new Error("153: the Try-again affordance did not render");
      // And NOT the wall: the URL stays on the app route.
      await page.waitForTimeout(700);
      if (page.url().includes("/login")) {
        throw new Error("153: the failure face bounced to the login wall (the F-236f regression)");
      }
      await page.screenshot({ path: `${OUT}/153-session237-firstload-failure-face.png` });
      commit(
        "153-session237-firstload-failure-face.png",
        "a first-load 500 renders the error banner + Try-again — the login wall never fires on a server failure (F-237a)",
      );
      await page.unroute("**/api/dashboard");
    }

    // ---- 154: the transient-503 face (F-237b) ----------------------------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      const { banner } = await failureFace(page, BASE, {
        status: 503,
        code: "UNAVAILABLE",
        message: "The request took too long — the database timed out. Try again.",
      });
      // The copy is the family's byte-exact honest answer (the same
      // string ERR.UNAVAILABLE() serves across the completed family).
      const expected = "Couldn't load your data — The request took too long — the database timed out. Try again.";
      if (!(await banner.getByText(expected).count())) {
        throw new Error("154: the 503 banner does not carry the UNAVAILABLE family copy");
      }
      await page.screenshot({ path: `${OUT}/154-session237-transient-503-face.png` });
      commit(
        "154-session237-transient-503-face.png",
        "a transient DB timeout (503) renders the honest copy through the error banner — the F-237b family's answer (F-237a's face carrying it)",
      );
      await page.unroute("**/api/dashboard");
    }

    await browser.close();
    console.log("[captures-237] all three faces verified");
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
  console.error(`[captures-237] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
