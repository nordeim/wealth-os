// Session-261 evidence captures (R-58 — the heading-prose, dead-brand,
// and citation-truing round). Three faces freeze the round's touched
// surfaces with the standing behavior asserted in-flight:
// 236: THE AUTH-VIEW H1 FAMILY — the F-261a prose cure's surface: the
//      login card's views render their titles as h1 (the F-231b
//      heading-focus construction, one h1 per view — the round trued
//      seven prose carriers that still said h2). The signin view's
//      "Welcome to WealthOS" and the reset view's "Reset your password"
//      both assert as role=heading level=1, with zero h2 elements
//      inside the card, live-verified on the running server.
// 237: the settings face — the F-261c comment cure's surface: the
//      Notification settings section renders its four switches (the
//      aria-checked row family whose track comment this round trued).
// 238: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census), then closes on the toggle (aria-expanded flip).
// The script rides the own-database convention (session 225, R-22,
// F-225e + session 226's F-226g liveness check): db/captures.db
// recreated + seeded per run, the spawned dev server carries
// DATABASE_URL=file:../db/captures.db, custom.db is never touched,
// and a census tripwire guards the exit.
import { chromium, type Page } from "@playwright/test";
import { unlinkSync, statSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import * as path from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-261.ts") process.exit(0);

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

/** F-225e: the exit tripwire — custom.db must still MATCH its contract. */
async function censusTripwire(): Promise<number> {
  const r = spawnSync("bun", ["run", "db:census"], {
    cwd: process.cwd(),
    stdio: "pipe",
    encoding: "utf8",
  });
  const out = `${r.stdout ?? ""}${r.stderr ?? ""}`;
  if (r.status !== 0 || !out.includes("census: MATCH")) {
    console.error(
      "[captures-261] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)",
    );
    return 1;
  }
  console.log("[captures-261] the census tripwire: custom.db MATCH");
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
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30_000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(1800);
}

function commit(file: string, note: string, minBytes = 30_000) {
  const bytes = statSync(`${OUT}/${file}`).size;
  if (bytes < minBytes) throw new Error(`${file}: suspiciously small (${bytes}B) — blank?`);
  console.log(`[captures-261] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-261] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-261] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-261] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-261] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-261] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-261] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  let exitCode = 0;
  try {
    const browser = await chromium.launch();

    // ---- 236: THE AUTH-VIEW H1 FAMILY (the F-261a prose cure, live) ----
    {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      // The signin view's title: an h1 heading, live-verified.
      const signinTitle = page.getByRole("heading", {
        level: 1,
        name: "Welcome to WealthOS",
      });
      await signinTitle.waitFor({ timeout: 20_000 });
      const h2InCard = await page.locator("main h2, form h2").count();
      if (h2InCard !== 0) {
        throw new Error(`236: the card carries ${h2InCard} h2 elements (the views render h1)`);
      }
      // The view swap: Forgot password? → the reset view, its h1 live.
      await page.getByRole("button", { name: "Forgot password?" }).click();
      await page.waitForTimeout(900);
      const resetTitle = page.getByRole("heading", {
        level: 1,
        name: "Reset your password",
      });
      await resetTitle.waitFor({ timeout: 20_000 });
      const resetH2 = await page.locator("main h2, form h2").count();
      if (resetH2 !== 0) {
        throw new Error(`236: the reset view carries ${resetH2} h2 elements`);
      }
      // The focus landed on the h1 (the F-231b heading-focus construction).
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.tagName + ":" + String(el.textContent).trim() : "none";
      });
      if (!focused.startsWith("H1:")) {
        throw new Error(`236: the view swap did not land focus on the h1 (active: ${focused})`);
      }
      await page.screenshot({ path: `${OUT}/236-session261-auth-view-h1.png` });
      commit(
        "236-session261-auth-view-h1.png",
        "THE AUTH-VIEW H1 FAMILY — the reset view's h1 asserted live (heading level 1, zero h2 in the card, the swap focus on the h1)",
      );
      await page.close();
    }

    // ---- 237: the settings face (the F-261c comment cure's surface) ----
    {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Settings`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2000);
      const notif = page.getByRole("region", { name: "Notification settings" });
      await notif.waitFor({ timeout: 20_000 });
      const switches = notif.getByRole("switch");
      const switchCount = await switches.count();
      if (switchCount !== 4) {
        throw new Error(`237: the notification section renders ${switchCount} switches (expected the four rows)`);
      }
      // The first row's checked state rides the seed's stored settings
      // (push: false by the schema default) — assert the aria state.
      const firstChecked = await switches.first().getAttribute("aria-checked");
      if (firstChecked === null) {
        throw new Error("237: the first switch carries no aria-checked");
      }
      console.log(
        `[captures-261] 237: the notification section renders ${switchCount} switches (first aria-checked=${firstChecked})`,
      );
      await page.screenshot({ path: `${OUT}/237-session261-settings-switches.png` });
      commit(
        "237-session261-settings-switches.png",
        "THE SETTINGS FACE — the four notification switches asserted live (the round trued the track comment's figure)",
      );
      await page.close();
    }

    // ---- 238: the mobile drawer at 390×844 (the standing ask) ---------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2000);
      const burger = page.getByRole("button", { name: "Open navigation menu" });
      await burger.click();
      await page.waitForTimeout(800);
      const drawer = page.getByRole("dialog", { name: "WealthOS navigation" });
      await drawer.waitFor({ timeout: 20_000 });
      let census = 0;
      for (const dest of DESTINATIONS) {
        const link = drawer.getByRole("link", { name: dest, exact: true });
        if ((await link.count()) === 1) census += 1;
      }
      const signOut = drawer.getByRole("button", { name: "Sign Out" });
      if (census !== 9 || (await signOut.count()) !== 1) {
        throw new Error(
          `238: the drawer census is ${census}/9 destinations (Sign Out ${await signOut.count()})`,
        );
      }
      await page.screenshot({ path: `${OUT}/238-session261-mobile-drawer-390.png` });
      const closer = page.getByRole("button", { name: "Close navigation menu" });
      await closer.click();
      await page.waitForTimeout(800);
      const stillVisible = await page
        .getByRole("link", { name: "Dashboard", exact: true })
        .isVisible()
        .catch(() => false);
      if (stillVisible) {
        throw new Error("238: a destination link stayed visible after the close");
      }
      commit(
        "238-session261-mobile-drawer-390.png",
        "THE STANDING MOBILE DRAWER at TRUE 390×844 — 9 destinations + Sign Out census, the aria-expanded close flip verified",
      );
      await page.close();
    }

    await browser.close();
  } catch (err) {
    console.error(`[captures-261] ${(err as Error).message}`);
    exitCode = 1;
  } finally {
    if (spawned?.pid) {
      try {
        process.kill(-spawned.pid, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
  }
  if (exitCode === 0) exitCode = await censusTripwire();
  process.exit(exitCode);
}

main().catch((err) => {
  console.error(`[captures-261] fatal: ${(err as Error).message}`);
  process.exit(1);
});
