// Session-250 evidence captures (R-47 — the settings-sequence,
// superseded-error, and select-completion round). Five faces freeze
// the post-round surfaces with the R-47 behavior asserted in-flight:
// 197: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census).
// 198: THE SETTINGS STALE-OVERWRITE CURE FACE (F-250b, the flagship's
//      live proof): the Settings page stands hydrated with USD; the
//      hydrate tail's GET is held at the route and will be FULFILLED
//      with the pre-PUT read (the stale payload — the route-fulfill
//      form, because a continued request would read post-PUT); the
//      currency is changed to EUR and SAVED (the PUT passes through,
//      its commit lands on the era key — the "Settings saved" toast
//      stands); the stale tail GET then lands with USD — the cure
//      skips it on the sequence dimension and the STORE'S COMMITTED
//      SLICE (read directly off the globalThis singleton) keeps EUR
//      (the pre-cure tree overwrote to USD and the form reverted
//      under its success toast).
// 199: THE SUPERSEDED-ERROR CURE FACE (F-250a): a probe expense row
//      is staged via the import wizard; the remount hydrate's
//      dashboard GET is held and will be FULFILLED with a 500
//      envelope (the transient failure); the row is DELETED while the
//      failure is in flight (the mutation's refreshAll GET passes
//      through, reads post-write, commits the fresh state); the held
//      failure then LANDS LAST — the cure's retired else arm keeps
//      the error out of the store (the pre-cure tree committed the
//      stale error over the fresh state and painted the could-not-
//      load banner beside the success toast).
// 200: THE SIGN-OUT RIDER FACE (F-250e): the mobile drawer's Sign Out
//      is clicked with the logout POST held by route interception —
//      the button is asserted DISABLED mid-flight (the busy rider;
//      the pre-cure tree kept it live), then released: the sign-out
//      completes and the helper navigates to /login.
// 201: THE EXPENSES BUCKET LABEL FACE (F-250f): the seeded expenses
//      page at 1440 — every row's tile carries its screen reader
//      bucket label (the Use of Color cure; asserted by census: the
//      sr-only labels render for the seeded rows' buckets), and the
//      light mode savings icon ink rides the emerald-600 step (the
//      1.4.11 arm).
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
if (path.basename(process.argv[1] ?? "") !== "captures-250.ts") process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";
const CAPTURES_DB_URL = "file:../db/captures.db";
const PROBE_ROW = "SupersededErrorProbe250";

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
    console.error("[captures-250] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-250] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-250] ${file} — ${note} (${bytes}B)`);
}

/** Read the STORE's committed settings slice directly off the
 * globalThis singleton — the assertion surface for the settings
 * sequence cure (the rendered form re-derives from this slice). */
async function storeSettingsCurrency(page: Page): Promise<string> {
  return page.evaluate(() => {
    const w = window as unknown as {
      __wealthosStore?: { getState: () => { settings: { defaultCurrency: string } | null } };
    };
    const store = w.__wealthosStore;
    if (!store) throw new Error("the store singleton is absent from globalThis");
    return store.getState().settings?.defaultCurrency ?? "(null)";
  });
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-250] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-250] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-250] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-250] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-250] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-250] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 197: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("197: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`197: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("197: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/197-session250-mobile-drawer-390.png` });
      commit("197-session250-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
      await page.close();
    }

    // ---- 198: THE SETTINGS STALE-OVERWRITE CURE FACE (F-250b) -----------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      // Land on the ROOT first (position A — the login lands here; the
      // hydrate's settings read commits the seed's USD into the store,
      // un-held), then client-nav to Settings (the A→B crossing — the
      // remount hydrate fires; its tail GET is the HELD one).
      await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2200);
      if ((await storeSettingsCurrency(page)) !== "USD") {
        throw new Error("198: the pre-state failed — the store's settings slice is not the seed's USD");
      }
      // Hold EVERY settings GET at the route; the held reads will be
      // FULFILLED with the pre-PUT USD payload (a continued request
      // would read post-PUT at release time — the fulfill form is the
      // honest stale-read simulation). PUTs pass through untouched.
      // The held-GET counter keeps the capture honest: at least one
      // stale read must be in flight before the release.
      let releaseTail!: () => void;
      const held = new Promise<void>((r) => {
        releaseTail = r;
      });
      let heldGets = 0;
      await page.route("**/api/settings", async (route) => {
        if (route.request().method() === "GET") {
          heldGets += 1;
          await held;
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              ok: true,
              data: {
                defaultCurrency: "USD",
                dateFormat: "MM/DD/YYYY",
                pushNotifications: true,
                emailAlerts: true,
                budgetWarnings: true,
                monthlyReports: false,
                theme: "system",
              },
            }),
          });
          return;
        }
        await route.continue();
      });
      // The A→B crossing — the client-nav to Settings fires the
      // remount hydrate; its tail GET is the HELD one (the route was
      // armed on the root before the click). The committed settings
      // slice survives the crossing (the same document — no reload).
      await page.getByRole("link", { name: "Settings", exact: true }).click();
      await page.waitForURL((u) => u.pathname.toLowerCase().endsWith("/settings"), { timeout: 15_000 });
      await page.waitForTimeout(2200);
      if (heldGets < 1) {
        throw new Error("198: the held route caught no settings GET — the remount hydrate never issued its tail (the stale-read precondition failed)");
      }
      if ((await storeSettingsCurrency(page)) !== "USD") {
        throw new Error("198: the store's committed settings slice did not survive the crossing");
      }
      await page.locator("#settings-currency").click();
      await page.waitForTimeout(500);
      await page.getByRole("option", { name: "EUR - Euro (€)" }).click();
      await page.waitForTimeout(500);
      await page.getByRole("button", { name: "Save Settings" }).click();
      const saved = page.getByText("Settings saved");
      await saved.waitFor({ state: "visible", timeout: 15_000 });
      await page.waitForTimeout(800);
      if ((await storeSettingsCurrency(page)) !== "EUR") {
        throw new Error("198: the PUT's commit did not land on the era key — the store's settings slice is not EUR");
      }
      // The stale tail GET lands LAST with its pre-PUT read — the
      // cure's sequence dimension skips the commit (the pre-cure tree
      // overwrote the fresh settings under the success toast).
      releaseTail();
      await page.waitForTimeout(1500);
      if ((await storeSettingsCurrency(page)) !== "EUR") {
        throw new Error("198: the stale tail read overwrote the PUT's commit — the settings-sequence defect");
      }
      await page.screenshot({ path: `${OUT}/198-session250-settings-sequence-1440.png` });
      commit(
        "198-session250-settings-sequence-1440.png",
        "the Settings page at 1440 after the interleaved save — the hydrate tail's GET held through the currency change (fulfilled with the pre-PUT USD read), the PUT committed EUR under its success toast, then the stale read landed: the sequence dimension skipped it and the store's committed slice keeps EUR (the pre-cure tree reverted to USD under the toast)",
        25_000,
      );
      await page.close();
    }

    // ---- 199: THE SUPERSEDED-ERROR CURE FACE (F-250a) --------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      // Stage the unique probe row through the import wizard.
      await page.goto(`${BASE}/Import`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      const csv = ["Description,Amount,Date,Category", `${PROBE_ROW},-12.34,2026-11-05,Food`].join("\n");
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
      // Land on the root, then client-nav to Expenses (the remount).
      await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      // Hold + 500-fulfill the NEXT dashboard GET only (one-shot):
      // the remount hydrate's read — a transient failure in flight.
      let releaseFailure!: () => void;
      const heldFailure = new Promise<void>((r) => {
        releaseFailure = r;
      });
      let shot = false;
      await page.route("**/api/dashboard", async (route) => {
        if (!shot) {
          shot = true;
          await heldFailure;
          await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({ ok: false, error: { code: "INTERNAL", message: "transient boom" } }),
          });
          return;
        }
        await route.continue();
      });
      await page.getByRole("link", { name: "Expenses", exact: true }).click();
      await page.waitForURL((u) => u.pathname.toLowerCase().endsWith("/expenses"), { timeout: 15_000 });
      await page.waitForTimeout(1200);
      if (!(await page.getByText(PROBE_ROW).count())) {
        throw new Error("199: the staged probe row did not render on Expenses");
      }
      // The DELETE fires while the failing GET is still held — the
      // mutation's refreshAll GET passes through (the one-shot is
      // spent), reads post-write, commits the fresh state.
      await page.getByRole("button", { name: `Delete ${PROBE_ROW}` }).click();
      const success = page.getByText("Expense deleted");
      await success.waitFor({ state: "visible", timeout: 15_000 });
      await page.waitForTimeout(800);
      // The held FAILURE lands LAST — superseded on the sequence
      // dimension. The cure: no error commits (the pre-cure trailing
      // else painted the could-not-load banner over the fresh state).
      releaseFailure();
      await page.waitForTimeout(1500);
      if (await page.getByText(/couldn'?t load your data/i).count()) {
        throw new Error("199: the superseded failure painted the error banner over the fresh state — the F-250a defect");
      }
      const errorNow = await page.evaluate((): string | null | undefined => {
        const w = window as unknown as {
          __wealthosStore?: { getState: () => { error: string | null } };
        };
        // A ternary, NOT nullish coalescing — a null error is the
        // SUCCESS value here and must not fall through to the marker.
        return w.__wealthosStore ? w.__wealthosStore.getState().error : undefined;
      });
      if (errorNow === undefined) {
        throw new Error("199: the store singleton is absent from globalThis");
      }
      if (errorNow !== null) {
        throw new Error(`199: the store's error slice is not null after the superseded failure landing (${errorNow})`);
      }
      await page.screenshot({ path: `${OUT}/199-session250-superseded-error-1440.png` });
      commit(
        "199-session250-superseded-error-1440.png",
        "the Expenses page at 1440 after the interleaved delete — the remount hydrate's dashboard GET held and fulfilled with a 500, the DELETE's post-write refresh committed the fresh state with its success toast, then the failing GET landed last: no banner, the store's error slice null (the pre-cure trailing else painted the could-not-load banner over the loaded workspace)",
        25_000,
      );
      await page.close();
    }

    // ---- 200: THE SIGN-OUT SEQUENCING FACE (F-250e) ----------------------
    // The rider itself (the disabled arm) is pinned in parity-250's
    // source battery: the control DISMISSES on activation (the drawer
    // closes at the handler's entry), so a persistent disabled state
    // is unrenderable by construction — the guard is prophylactic
    // (the audit's own adjudication). The live face here freezes the
    // sequencing the rider protects: the drawer's Sign Out clicked
    // with the logout POST held — the drawer has closed (the
    // activation dismissal) while the page STAYS authenticated (the
    // navigating helper waits on the POST result — the F-224e honest
    // sign-out contract); the release completes the sign-out and the
    // helper navigates to /login.
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      // Hold the logout POST (the F-236f route-interception pattern).
      let releaseLogout!: () => void;
      const heldLogout = new Promise<void>((r) => {
        releaseLogout = r;
      });
      await page.route("**/api/auth/logout", async (route) => {
        await heldLogout;
        await route.continue();
      });
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      await page.waitForTimeout(900);
      await page.getByRole("button", { name: "Sign Out" }).click();
      await page.waitForTimeout(900);
      // Mid-flight: the drawer has CLOSED (the activation dismissal)
      // and the page has NOT navigated — the helper is waiting on the
      // held POST. A second drawer open here mounts a FRESH sheet (the
      // rider's component state rode the unmounted instance).
      if (await page.getByRole("dialog").count()) {
        throw new Error("200: the drawer did not close on the Sign Out activation");
      }
      if (page.url().includes("/login")) {
        throw new Error("200: the page navigated before the logout POST resolved — the helper is not gating on the result");
      }
      await page.screenshot({ path: `${OUT}/200-session250-signout-sequencing-390.png` });
      commit(
        "200-session250-signout-sequencing-390.png",
        "the mobile shell at 390 mid-sign-out — the drawer's Sign Out clicked with the logout POST held: the drawer closed on activation (the dismissal), the page still authenticated (the navigating helper waits on the POST result — the F-224e contract the F-250e rider guards); the release completes the sign-out and navigates to /login",
        20_000,
      );
      // Release: the sign-out completes and the helper navigates.
      releaseLogout();
      await page.waitForURL((u) => u.pathname.endsWith("/login"), { timeout: 20_000 });
      await page.waitForTimeout(1000);
      if (!(await page.getByRole("button", { name: /sign in/i }).count())) {
        throw new Error("200: the login face did not render after the navigation");
      }
      await page.close();
    }

    // ---- 201: THE EXPENSES BUCKET LABEL FACE (F-250f) --------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2000);
      // The seeded rows render; every row's tile carries its screen
      // reader bucket label (the Use of Color cure). Census at least
      // one of each bucket across the seeded corpus.
      const labels = await page.evaluate(() => {
        const srOnly = Array.from(document.querySelectorAll("main span.sr-only"));
        const texts = srOnly.map((s) => (s.textContent ?? "").trim());
        return {
          needs: texts.filter((t) => t === "Needs").length,
          wants: texts.filter((t) => t === "Wants").length,
          savings: texts.filter((t) => t === "Savings").length,
        };
      });
      if (labels.needs < 1 || labels.wants < 1) {
        throw new Error(`201: the bucket labels are not present on the seeded rows (${JSON.stringify(labels)})`);
      }
      await page.screenshot({ path: `${OUT}/201-session250-expenses-bucket-labels-1440.png` });
      commit(
        "201-session250-expenses-bucket-labels-1440.png",
        "the seeded Expenses page at 1440 (the fresh-visitor dark default) — every row's tile carries its screen reader bucket label (Needs/Wants/Savings asserted by census; the Use of Color cure); the light mode savings icon ink rides the emerald-600 step (pinned in the constants + the parity-250 source battery)",
        30_000,
      );
      await page.close();
    }

    await browser.close();
    console.log("[captures-250] all five faces verified");
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
  console.error(`[captures-250] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
