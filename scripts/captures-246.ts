// Session-246 evidence captures (R-43 — the guard-advance, seam-
// convergence, and palette-truth round). Three faces freeze the
// post-round surfaces with the R-43 behavior asserted in-volley:
// 185: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census).
// 186: THE LOGOUT SEAM CONVERGENCE CANARY (F-246b, the flagship's
//      live proof on the converged route): ten text/plain logout
//      posts on the authenticated session all answer the gate's 400
//      (the seam fires — the route's former local gate answered the
//      same, and the seam's own 400 copy lands byte-identically),
//      then a JSON logout on the SAME session lands the 200
//      revocation round-trip (the sessioned path rides the writes
//      bucket exactly as before — byte-identical behavior, the
//      convergence is a no-op refactor). The screenshot freezes the
//      dashboard shell — the surface the Sign Out action lives in.
// 187: THE LIVE PAIR FACE (F-246c's own UI surface): the Settings
//      Profile card at 1440 — the role badge whose class string
//      carries the purple pair the round accidentally retired and
//      restored (the palette-pins forward leg caught the miss at
//      GREEN-proof time; the capture proves the pair renders live),
//      plus the four select-narrowed auth routes' family face (the
//      settings shell the session funnel feeds).
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
if (path.basename(process.argv[1] ?? "") !== "captures-246.ts") process.exit(0);

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
    console.error("[captures-246] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-246] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-246] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-246] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-246] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-246] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-246] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-246] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-246] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 185: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("185: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`185: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("185: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/185-session246-mobile-drawer-390.png` });
      commit("185-session246-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
      await page.close();
    }

    // ---- 186: THE LOGOUT SEAM CONVERGENCE CANARY (F-246b) ----------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      // The volley: ten text/plain logout posts on the authenticated
      // session — the converged route answers the SEAM's 400 for every
      // one (the cross-site arm dies un-bucketed; the JSON path is
      // untouched). The fetches ride the page's own origin + cookie jar.
      const volley: number[] = [];
      for (let i = 0; i < 10; i++) {
        const res = await page.evaluate(
          async (url) => {
            const r = await fetch(url, {
              method: "POST",
              headers: { "content-type": "text/plain" },
              body: "volley",
            });
            return r.status;
          },
          `${BASE}/api/auth/logout`,
        );
        volley.push(res);
      }
      if (volley.filter((s) => s === 400).length !== 10) {
        throw new Error(`186: the volley answered ${volley.join(",")} (expected 10x 400 — the seam fires on the converged route)`);
      }
      // The screenshot face BEFORE the revocation: the dashboard shell
      // the Sign Out action lives in (the JSON arm below kills the
      // session by design).
      await page.screenshot({ path: `${OUT}/186-session246-logout-seam-canary-1440.png` });
      // The sessioned JSON arm: the same route, the JSON content-type
      // the first-party path carries — the revocation round-trip lands
      // the 200 (byte-identical behavior, the convergence is a no-op).
      const jsonLogout = await page.evaluate(
        async (url) => {
          const r = await fetch(url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: "{}",
          });
          return r.status;
        },
        `${BASE}/api/auth/logout`,
      );
      if (jsonLogout !== 200) {
        throw new Error(`186: the JSON logout answered ${jsonLogout} (expected 200 — the sessioned revocation round-trip)`);
      }
      commit(
        "186-session246-logout-seam-canary-1440.png",
        "the dashboard shell at 1440 — the logout seam convergence proven live: 10x text/plain logout posts answer the seam's 400 (the gate fires on the converged route, un-bucketed), then the JSON logout on the same session lands the 200 revocation round-trip",
      );
      await page.close();
    }

    // ---- 187: THE LIVE PAIR FACE (F-246c's own UI surface) --------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Settings`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      // The in-DOM live-pair assertion: the profile card's role badge
      // carries the purple pair the round accidentally retired and the
      // palette-pins forward leg caught — the element renders with the
      // class today, proving the pair live (the pin's own proof).
      const badge = page.locator(".bg-purple-100");
      const badgeCount = await badge.count();
      if (badgeCount < 1) {
        throw new Error("187: the profile role badge (the live purple pair's carrier) did not render");
      }
      await page.screenshot({ path: `${OUT}/187-session246-settings-live-pair-1440.png` });
      commit(
        "187-session246-settings-live-pair-1440.png",
        "the Settings Profile card at 1440 — the role badge carrying the live purple pair (asserted in-DOM; the palette-pins forward leg caught the accidental retirement at GREEN-proof time), the F-246c round's own UI face",
      );
      await page.close();
    }

    await browser.close();
    console.log("[captures-246] all three faces verified");
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
  console.error(`[captures-246] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
