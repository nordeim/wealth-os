// Session-236 evidence captures (R-33 — the empty-put, transient-503, and
// revocation-face round). Three faces freeze the post-round surfaces with
// the R-33 behavior asserted in-DOM:
// 149: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census).
// 150: the mid-flight revocation face (F-236f's surface) — a hydrate
//      that answers UNAUTHORIZED (route-intercepted — the deterministic
//      trigger for the tokenVersion/TTL window) renders the guest-wall
//      login face, never an empty workspace (asserted: the status face
//      visible AND the from_url redirect fired).
// 151: the toast dismiss hit area (F-236d's surface) — a live toast's
//      dismiss control measures 26×26px over the 24px touch floor
//      (asserted: the bounding box clears the floor in BOTH axes).
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
if (path.basename(process.argv[1] ?? "") !== "captures-236.ts") process.exit(0);

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
    console.error("[captures-236] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-236] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-236] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-236] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-236] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-236] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-236] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-236] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-236] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 149: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("149: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`149: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("149: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/149-session236-mobile-drawer-390.png` });
      commit("149-session236-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
    }

    // ---- 150: the mid-flight revocation face (F-236f) --------------------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      // Pre-warm the lowercase twin (the dev server compiles each route
      // on demand; the first hit can outrun a 10s face-wait). The warm
      // pass renders the NORMAL dashboard — the interception arms after.
      await page.goto(`${BASE}/dashboard`, { waitUntil: "load", timeout: 60_000 });
      await page.waitForTimeout(1500);
      // The deterministic trigger for the revocation window: the client
      // hydrate's /api/dashboard leg answers the 401 envelope (a bumped
      // tokenVersion or a crossed TTL in the live case — the interception
      // freezes exactly that response). A second, BRIEF hold on the
      // /login navigation keeps the face painted long enough to assert
      // and capture — under the dev server the face's natural window is
      // sub-poll (the probe reproduced the full flow; the e2e leg's
      // production timing is slower and needed no hold).
      await page.route("**/login*", (route) =>
        new Promise<void>((resolve) => setTimeout(resolve, 2500)).then(() => route.continue()),
      );
      await page.route("**/api/dashboard", (route) =>
        route.fulfill({
          status: 401,
          contentType: "application/json",
          body: JSON.stringify({
            ok: false,
            error: { code: "UNAUTHORIZED", message: "Sign in required" },
          }),
        }),
      );
      await page.reload({ waitUntil: "domcontentloaded" });
      // The guest-wall face (F-235j's status surface, re-used by the
      // shell's post-hydrate gate) — NOT the empty workspace.
      const face = page.getByText("Redirecting to sign in…");
      await face.waitFor({ state: "visible", timeout: 30_000 });
      if (!(await face.count())) throw new Error("150: the revocation face did not render");
      await page.screenshot({ path: `${OUT}/150-session236-midflight-revocation-face.png` });
      // The face is a single centered status line on the background wash —
      // a legitimately sparse PNG (~5KB; pixel-verified non-blank: ~116
      // gray levels, the text + the wash). The in-DOM visibility
      // assertion above is the real proof; the byte floor drops for this
      // one face only.
      commit(
        "150-session236-midflight-revocation-face.png",
        "a mid-flight session revocation renders the login-wall face — the status redirect, never an empty workspace (F-236f)",
        3_000,
      );
      // The from_url round-trip completes once the hold releases; the
      // interception stays armed so no data leaks while it fires.
      await page.waitForURL(/\/login\?from_url=/, { timeout: 30_000 });
      await page.unroute("**/api/dashboard");
      await page.unroute("**/login*");
    }

    // ---- 151: the toast dismiss target clears the touch floor (F-236d) --
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      // A live toast: the Add Expense round-trip's success card.
      await page.getByRole("button", { name: "Add Expense" }).first().click();
      const dialog = page.getByRole("dialog");
      await dialog.waitFor({ state: "visible", timeout: 10_000 });
      await dialog.getByRole("button", { name: /Groceries/ }).click();
      await dialog.getByLabel("Amount (USD)").fill("12.34");
      await dialog.getByRole("button", { name: "Add Expense", exact: true }).click();
      // The toast viewport is the always-mounted polite region (F-218h
      // retired the per-card status role) — the card rides inside it.
      const toast = page
        .locator('div[role="region"][aria-label="Notifications"]')
        .filter({ hasText: "Expense added" })
        .last();
      await toast.waitFor({ state: "visible", timeout: 10_000 });
      const dismiss = toast.getByRole("button", { name: "Dismiss notification" });
      if (!(await dismiss.count())) throw new Error("151: the toast dismiss control did not render");
      const box = await dismiss.boundingBox();
      if (!box) throw new Error("151: the dismiss control has no box");
      // The WCAG 2.5.8 floor: 24px in both axes (the bare 4px padding
      // measured ~22×22; the lift measures 26×26).
      if (box.width < 24 || box.height < 24) {
        throw new Error(
          `151: the dismiss target measures ${box.width}x${box.height} — under the 24px floor (F-236d)`,
        );
      }
      await page.screenshot({ path: `${OUT}/151-session236-toast-dismiss-touch-target.png` });
      commit(
        "151-session236-toast-dismiss-touch-target.png",
        `a live toast with the padded dismiss target (${Math.round(box.width)}x${Math.round(box.height)}px — over the 24px touch floor, F-236d)`,
      );
    }

    await browser.close();
    console.log("[captures-236] all three faces verified");
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
  console.error(`[captures-236] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
