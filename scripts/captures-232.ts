// Session-232 evidence captures (R-29 — the dead-stock retirement,
// carrier-net repair, and dialog-focus round). Three faces freeze the
// post-round surfaces with the R-29 behavior asserted in-DOM:
// 137: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out, AND the
//      trigger↔drawer programmatic association is live (asserted:
//      aria-controls on the trigger references the sheet's id —
//      F-232d).
// 138: the Expenses dialog step-swap focus (F-232c's surface) —
//      asserted: "Or fill manually" lands FOCUS on the Description
//      input (document.activeElement is the field) and "Back to Quick
//      Select" lands it on the Quick Select heading — the F-231b genus
//      extended to the app's highest-traffic dialog.
// 139: the desktop shell after the retirement round (F-232h's surface
//      + F-232e's region) — asserted: the sidebar (now consuming
//      SHELL_LAYOUT.sidebar) keeps the standing 256px/9-links geometry
//      the probe:ref census pins, and the always-mounted loading live
//      region pre-exists OUTSIDE main, empty when idle (F-218h genus)
//      with the role/live attributes on the shell's own seam.
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
if (path.basename(process.argv[1] ?? "") !== "captures-232.ts") process.exit(0);

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
    console.error("[captures-232] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-232] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-232] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-232] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-232] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-232] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-232] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-232] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-232] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 137: the mobile drawer at 390×844 + the aria pair (F-232d) ----
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      // F-232d: the programmatic association BEFORE the open (the
      // expenses-filters precedent — a dangling reference is benign).
      const controls = await trigger.getAttribute("aria-controls");
      if (controls !== "mobile-nav-drawer") {
        throw new Error(`137: the hamburger's aria-controls is ${JSON.stringify(controls)} — expected mobile-nav-drawer (F-232d)`);
      }
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("137: the drawer did not open");
      const sheetId = await dialog.getAttribute("id");
      if (sheetId !== "mobile-nav-drawer") {
        throw new Error(`137: the drawer's id is ${JSON.stringify(sheetId)} — expected mobile-nav-drawer (F-232d)`);
      }
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`137: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("137: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/137-session232-mobile-drawer-aria-pair.png` });
      commit("137-session232-mobile-drawer-aria-pair.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out, the trigger↔drawer aria pair live (F-232d)");
    }

    // ---- 138: the expenses step-swap focus (F-232c) ----------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      await page.getByRole("button", { name: "Add Expense" }).first().click();
      const dialog = page.getByRole("dialog");
      await dialog.waitFor({ state: "visible" });
      await page.waitForTimeout(600);
      // quick→form: the description input takes focus.
      await dialog.getByRole("button", { name: "Or fill manually" }).click();
      await page.waitForTimeout(600);
      const description = dialog.getByLabel("Description");
      if (!(await description.evaluate((el) => el === document.activeElement))) {
        throw new Error("138: the quick→form swap did not land focus on the Description input (F-232c)");
      }
      // form→quick: the Quick Select heading takes focus.
      await dialog.getByRole("button", { name: "Back to Quick Select" }).click();
      await page.waitForTimeout(600);
      const heading = dialog.getByRole("heading", { name: "Quick Select Category" });
      if (!(await heading.evaluate((el) => el === document.activeElement))) {
        throw new Error("138: the form→quick swap did not land focus on the Quick Select heading (F-232c)");
      }
      // End on the form view (the prefilled chip path) for the frozen face.
      await dialog.getByRole("button", { name: /Groceries/ }).click();
      await page.waitForTimeout(600);
      if (!(await description.evaluate((el) => el === document.activeElement))) {
        throw new Error("138: the chip prefill swap did not land focus on the Description input");
      }
      await page.screenshot({ path: `${OUT}/138-session232-expenses-stepswap-focus.png` });
      commit("138-session232-expenses-stepswap-focus.png", "the Add Expense form with focus landed on Description after the quick-select prefill (F-232c) — the F-231b genus on the dialog surface");
    }

    // ---- 139: the shell after the retirement round (F-232h + F-232e) ----
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2200);
      // F-232h: the sidebar keeps the standing geometry (the SHELL_LAYOUT
      // consumption is behavior-identical — the probe:ref census genus).
      const sidebarWidth = await page.evaluate(() => {
        const el = document.querySelector("aside");
        return el ? Math.round(el.getBoundingClientRect().width) : -1;
      });
      if (sidebarWidth !== 256) {
        throw new Error(`139: the sidebar computes ${sidebarWidth}px — expected the standing 256px (probe:ref census)`);
      }
      const navLinks = await page.evaluate(() => {
        const aside = document.querySelector("aside");
        return aside ? aside.querySelectorAll("a[href]").length : -1;
      });
      if (navLinks !== 9) {
        throw new Error(`139: the sidebar carries ${navLinks} links — expected the standing 9 (probe:ref census)`);
      }
      // F-232e: the always-mounted loading region pre-exists OUTSIDE
      // main, empty when idle (the F-218h genus).
      const region = await page.evaluate(() => {
        const region = document.querySelector<HTMLElement>('div[role="status"][aria-live="polite"]');
        if (!region) return null;
        const main = document.querySelector("main");
        return {
          text: region.textContent?.trim() ?? "",
          insideMain: main ? main.contains(region) : null,
          srOnly: getComputedStyle(region).position === "absolute" && getComputedStyle(region).width === "1px",
        };
      });
      if (!region) {
        throw new Error("139: the always-mounted loading live region is absent (F-232e)");
      }
      if (region.insideMain) {
        throw new Error("139: the loading region sits INSIDE main — the census-safe placement is outside (F-232e)");
      }
      if (region.text !== "") {
        throw new Error(`139: the idle region should be empty — got ${JSON.stringify(region.text)} (F-232e)`);
      }
      if (!region.srOnly) {
        throw new Error("139: the region is not visually hidden (expected the sr-only clip)");
      }
      await page.screenshot({ path: `${OUT}/139-session232-shell-geometry-live-region.png` });
      commit("139-session232-shell-geometry-live-region.png", "the desktop shell at the standing 256px/9-links geometry with the always-mounted loading region pre-exists empty outside main (F-232e + F-232h)");
    }

    await browser.close();
    console.log("[captures-232] all three faces verified");
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
  console.error(`[captures-232] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
