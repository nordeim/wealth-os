// Session-226 evidence captures (R-23 — the escape-family completion
// and per-casing metadata round). Three faces freeze the post-round
// surfaces with the R-23 behavior asserted in-DOM:
// 119: the per-casing metadata — /income (lowercase) serves its OWN
//      head (title "Income | WealthOS", the canonical link at
//      /income — never the root "/") while /Dashboard keeps the bare
//      ROOT title (the reference's own posture). Pre-cure: the eight
//      lowercase sections inherited the root family and declared
//      themselves homepage duplicates (F-226b).
// 120: the desktop user menu's dark panel — the reference's measured
//      rgb(10,10,10)/rgb(38,38,38) (the flipped token family), not
//      our pre-cure stone-900 literals rgb(28,25,23)/rgb(68,64,60)
//      (F-226l — asserted: the open panel's computed background and
//      border, in the fresh-visitor dark posture).
// 121: the Analytics segmented tab, focused in dark mode — the ring
//      offset paints the flipped --color-background (rgb(14,19,16)),
//      not the v4 DEFAULT #fff halo the pre-cure trigger painted
//      (F-226i — asserted: --tw-ring-offset-color on the focused
//      trigger in the fresh-visitor dark posture).
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
if (path.basename(process.argv[1] ?? "") !== "captures-226.ts") process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";
const CAPTURES_DB_URL = "file:../db/captures.db";

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
    console.error("[captures-226] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-226] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-226] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-226] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-226] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-226] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-226] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-226] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-226] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 119: the per-casing metadata (F-226b) -------------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/income`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1200);
      const title = await page.title();
      if (title !== "Income | WealthOS") {
        throw new Error(`119: /income title is "${title}" — expected "Income | WealthOS" (the per-casing head)`);
      }
      const canonical = await page.evaluate(
        () => document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
      );
      if (!canonical.endsWith("/income")) {
        throw new Error(`119: /income canonical is "${canonical}" — expected the per-casing self-canonical`);
      }
      // The control: /Dashboard keeps the bare ROOT title.
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1200);
      const dashTitle = await page.title();
      if (dashTitle !== "WealthOS") {
        throw new Error(`119 control: /Dashboard title is "${dashTitle}" — expected the bare root "WealthOS"`);
      }
      // The capture face: the Income page beside its own head.
      await page.goto(`${BASE}/income`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      await page.screenshot({ path: `${OUT}/119-session226-percasing-income-title.png` });
      commit("119-session226-percasing-income-title.png", "the lowercase /income serving its own head (F-226b)");
    }

    // ---- 120: the user menu's dark panel (F-226l) ----------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      // The fresh-visitor dark posture holds on app routes.
      await page.waitForTimeout(1500);
      const dark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
      if (!dark) throw new Error("120: expected html.dark (the fresh-visitor posture on app routes)");
      const trigger = page.locator("aside [aria-haspopup=menu]").first();
      await trigger.click();
      await page.waitForTimeout(900);
      const panel = page.locator('[role="menu"]').first();
      if (!(await panel.count())) throw new Error("120: the menu panel did not open");
      const read = await panel.evaluate((el) => {
        const cs = getComputedStyle(el);
        return { bg: cs.backgroundColor, border: cs.borderColor };
      });
      if (read.bg !== "rgb(10, 10, 10)") {
        throw new Error(`120: the dark panel bg is ${read.bg} — expected rgb(10, 10, 10) (the reference's measured token family; pre-cure: rgb(28, 25, 23))`);
      }
      if (read.border !== "rgb(38, 38, 38)") {
        throw new Error(`120: the dark panel border is ${read.border} — expected rgb(38, 38, 38) (pre-cure: rgb(68, 64, 60))`);
      }
      await page.screenshot({ path: `${OUT}/120-session226-usermenu-dark-token.png` });
      commit("120-session226-usermenu-dark-token.png", "the open user menu on the flipped token family in dark (F-226l)");
      await page.keyboard.press("Escape");
    }

    // ---- 121: the focused segmented tab's dark ring offset (F-226i) ----
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Analytics`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2200);
      const dark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
      if (!dark) throw new Error("121: expected html.dark (the fresh-visitor posture)");
      // Keyboard-focus the first tab (Tab from the body reaches the skip
      // link first, then the shell; the direct form: focus the trigger).
      const tab = page.locator('[role="tab"]').first();
      await tab.focus();
      await page.waitForTimeout(400);
      const offset = await tab.evaluate((el) => {
        const cs = getComputedStyle(el);
        return { offsetColor: cs.getPropertyValue("--tw-ring-offset-color").trim(), ring: cs.boxShadow.slice(0, 80) };
      });
      // Our flipped dark --color-background is #0e1310 = rgb(14,19,16).
      // (The raw custom property reads back as the hex literal; only a
      // USED color serializes to rgb() — both forms are the cure.)
      if (offset.offsetColor !== "rgb(14, 19, 16)" && offset.offsetColor !== "#0e1310") {
        throw new Error(
          `121: the focused tab's ring offset is "${offset.offsetColor}" — expected #0e1310 (the flipped dark --color-background; pre-cure: the v4 DEFAULT #fff halo)`,
        );
      }
      await page.screenshot({ path: `${OUT}/121-session226-segmented-focus-dark.png` });
      commit("121-session226-segmented-focus-dark.png", "the focused Analytics tab painting the dark ring offset (F-226i)");
    }

    await browser.close();
    console.log("[captures-226] all three faces verified");
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
  console.error(`[captures-226] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
