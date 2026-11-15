// Session-249 evidence captures (R-46 — the stale-read, era-thread,
// and guard-structural round). Three faces freeze the post-round
// surfaces with the R-46 behavior asserted in-flight:
// 194: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census).
// 195: THE STALE-READ CURE FACE (F-249c, the flagship's live proof):
//      a unique expense row is staged via the import wizard; its
//      DELETE POST is held by route interception (the F-236f pattern)
//      while the shell crosses to the ROOT route and back through
//      history (the AppShell remount — hydrate's pre-write dashboard
//      payload commits over the pending mutation, the registered
//      interleaving); the POST releases, the mutation's post-write
//      refreshAll lands, and the STORE'S COMMITTED SLICE (read
//      directly off the globalThis singleton) is asserted POST-write
//      — the row gone — with the success toast standing over the
//      fresh state (the pre-cure tree discarded the refresh on the
//      token dimension alone and the deleted row survived beside its
//      toast).
// 196: THE LOGOUT-RETURN FACE (F-249d): the logout POST is held while
//      a root-crossing remount hydrate runs INSIDE the window (its
//      entry bump is what staled the pre-cure token guard); the POST
//      releases, the era-keyed guard passes, the sign-out completes
//      and the helper navigates — asserted at /login (the pre-cure
//      tree returned false and never navigated).
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
if (path.basename(process.argv[1] ?? "") !== "captures-249.ts") process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";
const CAPTURES_DB_URL = "file:../db/captures.db";
const PROBE_ROW = "StaleReadProbe249";

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
    console.error("[captures-249] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-249] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-249] ${file} — ${note} (${bytes}B)`);
}

/** Read the STORE's committed transactions slice directly off the
 * globalThis singleton — the assertion surface for the fetch-
 * coordination cure (the rendered pages re-derive from this slice). */
async function storeHasProbeRow(page: Page): Promise<boolean> {
  return page.evaluate((needle) => {
    const w = window as unknown as {
      __wealthosStore?: { getState: () => { transactions: Array<{ description: string }> } };
    };
    const store = w.__wealthosStore;
    if (!store) throw new Error("the store singleton is absent from globalThis");
    return store.getState().transactions.some((t) => t.description === needle);
  }, PROBE_ROW);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-249] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-249] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-249] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-249] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-249] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-249] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 194: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("194: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`194: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("194: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/194-session249-mobile-drawer-390.png` });
      commit("194-session249-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
      await page.close();
    }

    // ---- 195: THE STALE-READ CURE FACE (F-249c) --------------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      // Stage the unique probe row through the import wizard (the
      // captures-248 staging form): one expense the census can name.
      await page.goto(`${BASE}/Import`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      const csv = [
        "Description,Amount,Date,Category",
        `${PROBE_ROW},-12.34,2026-11-05,Food`,
      ].join("\n");
      await page.setInputFiles('input[type="file"]', {
        name: "bank.csv",
        mimeType: "text/csv",
        buffer: Buffer.from(csv, "utf8"),
      });
      await page.waitForTimeout(1500);
      await page.getByRole("button", { name: /Import \d+ Transactions/ }).click();
      const imported = page.getByText(/Imported 1 transaction/);
      await imported.waitFor({ state: "visible", timeout: 15_000 });
      await page.waitForTimeout(800);
      // Land on the ROOT route (the AppShell position A), then client-
      // nav to Expenses (position B — the remount), so history.back()
      // crosses back to the root INSIDE the delete window.
      await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      await page.getByRole("link", { name: "Expenses", exact: true }).click();
      await page.waitForURL((u) => u.pathname.toLowerCase().endsWith("/expenses"), { timeout: 15_000 });
      await page.waitForTimeout(1800);
      // The probe row stands in the list (the pre-state).
      if (!(await page.getByText(PROBE_ROW).count())) {
        throw new Error("195: the staged probe row did not render on Expenses");
      }
      // Hold the DELETE POST (the F-236f route-interception pattern).
      let releaseDelete!: () => void;
      const held = new Promise<void>((r) => {
        releaseDelete = r;
      });
      await page.route("**/api/transactions/*", async (route) => {
        await held;
        await route.continue();
      });
      await page.getByRole("button", { name: `Delete ${PROBE_ROW}` }).click();
      await page.waitForTimeout(600);
      // The root crossing INSIDE the commit window: history.back() to
      // the root route — the AppShell remount fires hydrate, whose
      // dashboard GET reads PRE-write (the POST never reached the
      // server) and commits the stale payload over the pending
      // mutation — the registered interleaving.
      await page.goBack({ waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      // Release: the DELETE lands server-side, the mutation's
      // refreshAll reads POST-write and its commit must WIN over the
      // remount's stale payload (the pre-cure guard discarded it on
      // the token dimension alone — the hydrate's entry bump).
      releaseDelete();
      const success = page.getByText("Expense deleted");
      await success.waitFor({ state: "visible", timeout: 15_000 });
      await page.waitForTimeout(1200);
      // The store's committed slice, read directly: the probe row must
      // be GONE (the pre-cure tree kept it — the deleted row standing
      // beside its success toast).
      if (await storeHasProbeRow(page)) {
        throw new Error("195: the deleted row still stands in the store's committed slice — the post-write refresh was discarded (the stale-read defect)");
      }
      await page.screenshot({ path: `${OUT}/195-session249-stale-read-cure-1440.png` });
      commit(
        "195-session249-stale-read-cure-1440.png",
        "the root dashboard at 1440 after the interleaved delete — the DELETE POST held through a root-crossing remount (hydrate's pre-write payload committed over it), then released: the success toast stands over the FRESH state, the store's committed slice asserted POST-write (the probe row gone; the pre-cure tree kept the deleted row beside its toast)",
        20_000,
      );
      await page.close();
    }

    // ---- 196: THE LOGOUT-RETURN FACE (F-249d) ----------------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      // Root position first, then the Expenses crossing — so the
      // back-nav remount runs INSIDE the logout POST window.
      await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      await page.getByRole("link", { name: "Expenses", exact: true }).click();
      await page.waitForURL((u) => u.pathname.toLowerCase().endsWith("/expenses"), { timeout: 15_000 });
      await page.waitForTimeout(1800);
      // Hold the logout POST.
      let releaseLogout!: () => void;
      const held = new Promise<void>((r) => {
        releaseLogout = r;
      });
      await page.route("**/api/auth/logout", async (route) => {
        await held;
        await route.continue();
      });
      // The desktop Sign Out lives in the user dropdown (the Radix
      // menu at the sidebar's foot) — open the trigger first.
      await page.getByRole("button", { name: /sepnetflix2023/ }).click();
      await page.waitForTimeout(500);
      await page.getByRole("menuitem", { name: "Sign Out" }).click();
      await page.waitForTimeout(600);
      // The remount hydrate INSIDE the window: its entry bump is what
      // staled the pre-cure token guard (the pre-logout reads commit —
      // the session still stands server-side while the POST is held).
      await page.goBack({ waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      // Release: the era-keyed return guard passes (the hydrate never
      // advanced the era), the sign-out completes, and the helper
      // navigates — the pre-cure tree returned false and stayed put.
      releaseLogout();
      await page.waitForURL((u) => u.pathname.endsWith("/login"), { timeout: 20_000 });
      await page.waitForTimeout(1200);
      if (!(await page.getByRole("button", { name: /sign in/i }).count())) {
        throw new Error("196: the login face did not render after the navigation");
      }
      await page.screenshot({ path: `${OUT}/196-session249-logout-return-1440.png` });
      commit(
        "196-session249-logout-return-1440.png",
        "the login face at 1440 after the interleaved sign-out — the logout POST held through a root-crossing remount hydrate (the entry bump that staled the pre-cure token guard), then released: the era-keyed guard passed, the clear committed, and the helper navigated to /login (the pre-cure tree returned false and never navigated)",
        20_000,
      );
      await page.close();
    }

    await browser.close();
    console.log("[captures-249] all three faces verified");
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
  console.error(`[captures-249] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
