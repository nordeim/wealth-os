// Session-240 evidence captures (R-37 — the revocation-signal,
// signup-ceiling, and form-seam round). Four faces freeze the
// post-round surfaces with the R-37 behavior asserted in-DOM:
// 162: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census).
// 163: the Expenses Add-Expense dialog at 1440 (F-240d) — the form
//      input seam face: the description input computes the exact
//      genus geometry the sixteen sites carried before the swap
//      (asserted: 40px height, 8px radius, 14px font — computed
//      styles, the honest form after a class-string seam change).
// 164: the Settings budget row at 1440 (F-240d's width appendage) —
//      the monthly-amount input computes the small-breakpoint width
//      override (asserted: 128px width) on top of the seam's base
//      geometry.
// 165: the Investments Add-Investment dialog at 1440 (F-240d's
//      mono-caps appendage) — the symbol field computes the monospace
//      stack + the uppercase transform (asserted) over the same base
//      geometry.
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
if (path.basename(process.argv[1] ?? "") !== "captures-240.ts") process.exit(0);

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
    console.error("[captures-240] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-240] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-240] ${file} — ${note} (${bytes}B)`);
}

/** The FORM_INPUT base geometry (the F-240d seam's computed contract):
 *  the height-10 / rounded-lg / text-sm triple every one of the
 *  sixteen sites computed before the swap — the seam must compute
 *  byte-identically (geometry, not classes — the F-238a lesson). */
async function assertFormInputGeometry(page: Page, selector: string) {
  const geo = await page.evaluate((sel) => {
    const el = document.querySelector(sel) as HTMLElement | null;
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      height: cs.height,
      radius: cs.borderTopLeftRadius,
      fontSize: cs.fontSize,
      width: cs.width,
      fontFamily: cs.fontFamily,
      textTransform: cs.textTransform,
    };
  }, selector);
  if (!geo) throw new Error(`the ${selector} input not found`);
  if (geo.height !== "40px") {
    throw new Error(`${selector}: computed height ${geo.height} (expected 40px — the seam's height step)`);
  }
  if (geo.radius !== "8px") {
    throw new Error(`${selector}: computed radius ${geo.radius} (expected 8px — the seam's rounding)`);
  }
  if (geo.fontSize !== "14px") {
    throw new Error(`${selector}: computed font ${geo.fontSize} (expected 14px — the seam's text step)`);
  }
  return geo;
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-240] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-240] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-240] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-240] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-240] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-240] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 162: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("162: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`162: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("162: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/162-session240-mobile-drawer-390.png` });
      commit("162-session240-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
    }

    // ---- 163: the Expenses dialog's seam geometry (F-240d) --------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      await page.getByRole("button", { name: "Add Expense", exact: true }).click();
      const dialog = page.getByRole("dialog");
      await dialog.waitFor({ state: "visible", timeout: 10_000 });
      await page.waitForTimeout(700);
      // The dialog opens on the QUICK step (pick a category) — advance
      // to the manual form where the seam input lives.
      await dialog.getByRole("button", { name: "Or fill manually" }).click();
      await page.waitForTimeout(600);
      const geo = await assertFormInputGeometry(page, "#expense-description");
      await page.screenshot({ path: `${OUT}/163-session240-expenses-dialog-form-input-1440.png` });
      commit(
        "163-session240-expenses-dialog-form-input-1440.png",
        `the Add-Expense manual form at 1440 — the description input computes the seam's base geometry (F-240d, asserted: ${geo.height} height · ${geo.radius} radius · ${geo.fontSize} text — byte-identical to the sixteen sites' pre-swap genus)`,
      );
    }

    // ---- 164: the Settings budget row's width appendage (F-240d) --------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Settings`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const geo = await assertFormInputGeometry(
        page,
        'input[aria-label="Monthly budget amount"]',
      );
      // The small-breakpoint width override: 8rem = 128px at ≥640px.
      if (geo.width !== "128px") {
        throw new Error(`164: the budget input computes width ${geo.width} (expected 128px — the width appendage over the seam)`);
      }
      await page.screenshot({ path: `${OUT}/164-session240-settings-budget-width-1440.png` });
      commit(
        "164-session240-settings-budget-width-1440.png",
        `the Settings budget row at 1440 — the monthly-amount input computes the width appendage (${geo.width}, asserted) over the seam's base geometry (F-240d's per-site cn() form)`,
      );
    }

    // ---- 165: the Investments symbol field's mono-caps (F-240d) ---------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Investments`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      await page.getByRole("button", { name: "Add Investment", exact: true }).click();
      const dialog = page.getByRole("dialog");
      await dialog.waitFor({ state: "visible", timeout: 10_000 });
      await page.waitForTimeout(700);
      const geo = await assertFormInputGeometry(page, "#inv-symbol");
      if (!geo.fontFamily.includes("ui-monospace")) {
        throw new Error(`165: the symbol field computes font ${geo.fontFamily} (expected the monospace stack — the mono appendage)`);
      }
      if (geo.textTransform !== "uppercase") {
        throw new Error(`165: the symbol field computes transform ${geo.textTransform} (expected uppercase — the caps appendage)`);
      }
      await page.screenshot({ path: `${OUT}/165-session240-investments-symbol-mono-1440.png` });
      commit(
        "165-session240-investments-symbol-mono-1440.png",
        `the Add-Investment dialog at 1440 — the symbol field computes the mono-caps appendage (asserted: the monospace stack + uppercase transform) over the seam's base geometry (F-240d's third variant)`,
      );
    }

    await browser.close();
    console.log("[captures-240] all four faces verified");
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
  console.error(`[captures-240] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
