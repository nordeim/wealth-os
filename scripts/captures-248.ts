// Session-248 evidence captures (R-45 — the guard-advance,
// pause-composition, and write-path-select round). Three faces freeze
// the post-round surfaces with the R-45 behavior asserted in-flight:
// 191: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census).
// 192: THE COMPOSED PAUSE FACE (F-248b, the flagship's live proof):
//      an expense delete lands the success toast; the Dismiss button
//      is FOCUSED (keyboard), the pointer ENTERS the card and then
//      LEAVES it (the mixed-modality sequence that killed the
//      pre-cure tree — the shared boolean's mouseleave un-paused the
//      timer with the focus still inside), and the toast SURVIVES
//      past the 4s mark after the pointer exit (asserted at 4.6s —
//      the pre-cure card died ~4s after the exit); the blur then
//      dismisses it (~4s later, asserted gone).
// 193: THE IMPORT DISCARD RIDER FACE (F-248c): a staged CSV parses
//      into the review; the POST /api/import is held by route
//      interception (the F-236f pattern) while the Import commit is
//      in flight — the Discard button is asserted DISABLED inside the
//      commit window (the pre-cure tree kept it live), the face is
//      captured, the POST releases and the import succeeds.
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
if (path.basename(process.argv[1] ?? "") !== "captures-248.ts") process.exit(0);

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
    console.error("[captures-248] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-248] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-248] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-248] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-248] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-248] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-248] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-248] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-248] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 191: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("191: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`191: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("191: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/191-session248-mobile-drawer-390.png` });
      commit("191-session248-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
      await page.close();
    }

    // ---- 192: THE COMPOSED PAUSE FACE (F-248b) ---------------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      // Land a success toast: the first row's one-click delete (the
      // captures db is recreated per run — the mutation is the
      // convention's own surface).
      const firstDelete = page.getByRole("button", { name: /^Delete / }).first();
      if (!(await firstDelete.count())) throw new Error("192: no expense row delete trigger found");
      await firstDelete.click();
      const dismiss = page.getByRole("button", { name: "Dismiss notification" });
      await dismiss.waitFor({ state: "visible", timeout: 10_000 });
      // The mixed-modality sequence (the F-248b differential): focus
      // the Dismiss button (the keyboard arm), then run the pointer
      // THROUGH the card and OUT again — the mouseleave that un-paused
      // the pre-cure shared boolean while the focus still sat inside.
      await dismiss.focus();
      const card = dismiss.locator("..");
      await card.hover();
      await page.mouse.move(20, 20);
      await page.waitForTimeout(300);
      // The pointer is gone, the focus HOLDS — the composed pause must
      // outlive the 4s mark after the exit (asserted at 4.6s; the
      // pre-cure card died ~4s after the exit with the focus inside).
      await page.waitForTimeout(4300);
      if (!(await dismiss.count())) {
        throw new Error("192: the toast died inside the post-exit window — the composed pause does not hold (the pointer exit un-paused a focus-held card)");
      }
      await page.screenshot({ path: `${OUT}/192-session248-toast-composed-pause-1440.png` });
      // The blur arm: unpause dismisses (~4s later, asserted gone).
      await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
      await page.waitForTimeout(4500);
      if (await dismiss.count()) {
        throw new Error("192: the blurred toast survived past the unpause window — the timer did not resume");
      }
      commit(
        "192-session248-toast-composed-pause-1440.png",
        "the success toast at 1440 with its Dismiss button keyboard-focused AFTER a pointer entered and left the card — the card asserted ALIVE at 4.6s past the pointer exit (the composition holds; the pre-cure shared boolean died ~4s after the exit with the focus inside), then asserted dismissed ~4s after the blur",
        20_000,
      );
      await page.close();
    }

    // ---- 193: THE IMPORT DISCARD RIDER FACE (F-248c) ---------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Import`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      // Stage a small valid CSV (the captures-220 form): two rows the
      // wizard detects and parses into the review.
      const csv = [
        "Description,Amount,Date,Category",
        "Rent,2000.00,2026-11-01,Housing",
        "Coffee,-4.50,2026-11-03,Food",
      ].join("\n");
      await page.setInputFiles('input[type="file"]', {
        name: "bank.csv",
        mimeType: "text/csv",
        buffer: Buffer.from(csv, "utf8"),
      });
      await page.waitForTimeout(1500);
      const discard = page.getByRole("button", { name: "Discard" });
      if (!(await discard.count())) throw new Error("193: the Discard button did not stand after the parse");
      if (await discard.isDisabled()) throw new Error("193: the Discard button is disabled OUTSIDE the commit window — the idle face must stay live");
      // Hold the import POST (the F-236f route-interception pattern) so
      // the commit window stays paintable for the assertion + capture.
      // The definite-assignment form: the promise executor assigns the
      // resolver synchronously, so the release is live by the time the
      // held POST resolves it.
      let releasePost!: () => void;
      const held = new Promise<void>((r) => {
        releasePost = r;
      });
      await page.route("**/api/import", async (route) => {
        await held;
        await route.continue();
      });
      await page.getByRole("button", { name: /Import \d+ Transactions/ }).click();
      // Inside the commit window: the Discard button must ride disabled
      // (the pre-cure tree kept it live — the implied cancellation).
      await page.waitForTimeout(600);
      if (!(await discard.isDisabled())) {
        throw new Error("193: the Discard button is LIVE inside the commit window — the busy rider does not hold");
      }
      await page.screenshot({ path: `${OUT}/193-session248-import-discard-rider-1440.png` });
      // Release the POST; the import completes (the success toast).
      releasePost();
      const success = page.getByText(/Imported 2 transactions/);
      await success.waitFor({ state: "visible", timeout: 15_000 });
      commit(
        "193-session248-import-discard-rider-1440.png",
        "the import review mid-commit at 1440 — the POST held by interception, the Discard button asserted DISABLED inside the commit window (the pre-cure tree kept it live), then released: the import lands (Imported 2 transactions)",
        20_000,
      );
      await page.close();
    }

    await browser.close();
    console.log("[captures-248] all three faces verified");
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
  console.error(`[captures-248] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
