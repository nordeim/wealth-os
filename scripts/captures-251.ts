// Session-251 evidence captures (R-48 — the focus-ring, cli-anchor, and
// settings-flag round). Five faces freeze the post-round surfaces with
// the R-48 behavior asserted in-flight:
// 202: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census), then closes on the toggle (aria-expanded flip).
// 203: THE AUTH-FACE FOCUS-RING CURE FACE (F-251a, the flagship): the
//      login card with the Sign in submit keyboard-FOCUSED — the
//      computed focus ring carries the ring token ink rgb(28,25,23)
//      (the F-218i stone-900), NOT the retired amber rgb(251,191,36)
//      that measured 1.67:1 on the white card (asserted from the
//      live computed box-shadow before the capture).
// 204: THE SETTINGS-SETTLED RIDER FACE (F-251c, the live proof): the
//      198 interleaving re-run — the remount hydrate's settings tail
//      GET is held and fulfilled with the pre-PUT USD read AFTER the
//      EUR PUT's commit; the store's committed slice keeps EUR (the
//      R-47 sequence) AND settingsSettled stays true (the R-48 rider
//      — the pre-cure tree stranded the flag false over the fresh
//      slice).
// 205: THE DASHBOARD USER PROJECTION FACE (F-251d): after a fresh
//      hydrate, the store's user slice carries the FULL User shape —
//      role === "user" and the photoUrl key present (the pre-cure
//      projection narrowed both away; the store's `as User` cast was
//      a runtime lie).
// 206: THE TABS PANEL OFFSET-HALO FACE (F-251g): the Expenses page in
//      the fresh-visitor DARK default with a tab panel keyboard-
//      FOCUSED — the computed ring-offset shadow carries the flipped
//      background token rgb(14,19,16), not the v4 default
//      rgb(255,255,255) halo the retired adjudication left.
// The script rides the own-database convention (session 225, R-22,
// F-225e + session 226's F-226g liveness check): db/captures.db
// recreated + seeded per run, the spawned dev server carries
// DATABASE_URL=file:../db/captures.db, custom.db is never touched,
// and a census tripwire guards the exit.
import { chromium, type Page } from "@playwright/test";
import { statSync, unlinkSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import * as path from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-251.ts") process.exit(0);

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
    console.error("[captures-251] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-251] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-251] ${file} — ${note} (${bytes}B)`);
}

/** Read the STORE's committed slices directly off the globalThis
 * singleton — the assertion surface for the settings-flag and
 * user-projection cures (the rendered forms re-derive from these). */
async function storeSlice<T>(page: Page, pick: (state: Record<string, unknown>) => T): Promise<T> {
  return page.evaluate((p) => {
    const w = window as unknown as {
      __wealthosStore?: { getState: () => Record<string, unknown> };
    };
    const store = w.__wealthosStore;
    if (!store) throw new Error("the store singleton is absent from globalThis");
    const pickFn = new Function("s", `return (${p})(s);`) as (s: Record<string, unknown>) => unknown;
    return pickFn(store.getState()) as T;
  }, pick.toString());
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-251] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-251] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-251] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-251] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-251] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-251] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  let exitCode = 0;
  try {
    const browser = await chromium.launch();

    // ---- 202: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("202: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`202: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("202: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/202-session251-mobile-drawer-390.png` });
      commit("202-session251-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
      // The close half of the standing ask: the toggle collapses the
      // drawer and the aria-expanded state flips back.
      await page.getByRole("button", { name: "Close navigation menu" }).click();
      await page.waitForTimeout(700);
      const expanded = await page
        .getByRole("button", { name: "Open navigation menu" })
        .getAttribute("aria-expanded");
      if (expanded !== "false") throw new Error(`202: the drawer toggle did not close (aria-expanded=${expanded})`);
      console.log("[captures-251] 202: the drawer closed on the toggle (aria-expanded=false) — the standing mobile-menu comparison complete");
      await page.close();
    }

    // ---- 203: THE AUTH-FACE FOCUS-RING CURE FACE (F-251a) ---------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      // Walk focus forward by keyboard until the Sign in submit holds it
      // (a fixed Tab count is fragile — the starting anchor varies with
      // the page's load state; the walk is deterministic either way).
      for (let i = 0; i < 15; i++) {
        const focused = await page.evaluate(() => {
          const el = document.activeElement;
          return el && el.tagName === "BUTTON" && (el.textContent ?? "").trim() === "Sign in";
        });
        if (focused) break;
        await page.keyboard.press("Tab");
      }
      // The submit carries transition-all (duration-200) — the focus
      // ring FADES IN; read the computed style only after the transition
      // settles (an early read catches alpha≈0 and false-negatives).
      await page.waitForTimeout(450);
      const computed = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return "(no active element)";
        const cs = getComputedStyle(el);
        return `${el.tagName}::${(el.textContent ?? "").slice(0, 24)}::${cs.boxShadow}`;
      });
      if (!computed.includes("28, 25, 23")) {
        throw new Error(`203: the focused submit's ring is not the ring token ink — computed: ${computed}`);
      }
      if (computed.includes("251, 191, 36")) {
        throw new Error(`203: the retired amber ring still paints — computed: ${computed}`);
      }
      await page.screenshot({ path: `${OUT}/203-session251-authfocus-ring-1440.png` });
      commit("203-session251-authfocus-ring-1440.png", `the login submit keyboard-focused — the computed ring carries the ring token ink rgb(28,25,23) (17.5:1), the retired amber arm gone (F-251a)`);
      await page.close();
    }

    // ---- 204: THE SETTINGS-SETTLED RIDER FACE (F-251c) -------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2200);
      if ((await storeSlice(page, (s) => (s.settings as { defaultCurrency: string } | null)?.defaultCurrency)) !== "USD") {
        throw new Error("204: the pre-state failed — the store's settings slice is not the seed's USD");
      }
      // Hold EVERY settings GET at the route; the held reads fulfill
      // with the pre-PUT USD payload (the 198 convention — the honest
      // stale-read simulation). PUTs pass through untouched.
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
      // The A→B crossing — the client-nav to Settings fires the remount
      // hydrate; its tail GET is the HELD one.
      await page.getByRole("link", { name: "Settings", exact: true }).click();
      await page.waitForURL((u) => u.pathname.toLowerCase().endsWith("/settings"), { timeout: 15_000 });
      await page.waitForTimeout(2200);
      if (heldGets < 1) {
        throw new Error("204: the held route caught no settings GET — the remount hydrate never issued its tail");
      }
      // The currency Select → EUR, then Save (the PUT passes through and
      // commits on the era key; the "Settings saved" toast stands).
      await page.getByRole("combobox").first().click();
      await page.getByRole("option", { name: /EUR/i }).click();
      await page.getByRole("button", { name: /save settings/i }).click();
      await page.waitForTimeout(1500);
      // Release the stale tail — it lands AFTER the PUT's commit.
      releaseTail();
      await page.waitForTimeout(1500);
      const after = await storeSlice(page, (s) => ({
        currency: (s.settings as { defaultCurrency: string } | null)?.defaultCurrency,
        settled: s.settingsSettled,
      }));
      if (after.currency !== "EUR") {
        throw new Error(`204: the R-47 sequence failed — the committed slice is ${after.currency}, not EUR`);
      }
      if (after.settled !== true) {
        throw new Error("204: THE F-251c DEFECT — settingsSettled stranded false over the fresh EUR slice (the rider did not land)");
      }
      await page.screenshot({ path: `${OUT}/204-session251-settings-settled-rider-1440.png` });
      commit("204-session251-settings-settled-rider-1440.png", "the Settings page under the superseded-tail interleaving — the store keeps EUR AND settingsSettled=true (the F-251c rider proven live; the pre-cure tree stranded the flag false)");
      await page.close();
    }

    // ---- 205: THE DASHBOARD USER PROJECTION FACE (F-251d) ----------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2200);
      const userShape = await storeSlice(page, (s) => {
        const u = s.user as { role?: string; photoUrl?: string | null } | null;
        return { role: u?.role ?? "(missing)", hasPhotoUrl: u ? "photoUrl" in u : false };
      });
      if (userShape.role !== "user") {
        throw new Error(`205: THE F-251d DEFECT — the store's user slice carries role=${userShape.role} (undefined pre-cure)`);
      }
      if (!userShape.hasPhotoUrl) {
        throw new Error("205: THE F-251d DEFECT — the store's user slice lacks the photoUrl key (narrowed away pre-cure)");
      }
      await page.screenshot({ path: `${OUT}/205-session251-user-projection-1440.png` });
      commit("205-session251-user-projection-1440.png", "the hydrated dashboard — the store's user slice carries the FULL User shape (role=\"user\", photoUrl present; the `as User` cast honest at last)");
      await page.close();
    }

    // ---- 206: THE TABS PANEL OFFSET-HALO FACE (F-251g) -------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      // The fresh-visitor DARK default rides the app routes.
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2000);
      const isDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
      if (!isDark) throw new Error("206: the fresh-visitor dark default did not apply (html lacks .dark)");
      // Focus the tab panel itself (tabIndex=0 — the surface the halo
      // paints on). Plain tab-walking visits the panel's CONTENT
      // focusables first and may never land on the shell, so: one real
      // keypress establishes the keyboard interaction, then the panel
      // takes programmatic focus (Chrome's :focus-visible heuristic
      // honors keyboard-origin focus chains — asserted before the read).
      await page.keyboard.press("Tab");
      const focusedVisible = await page.evaluate(() => {
        const panel = document.querySelector('[role="tabpanel"]');
        if (!panel || !(panel instanceof HTMLElement)) return "(no tabpanel)";
        panel.focus();
        return panel.matches(":focus-visible") ? "ok" : "no-focus-visible";
      });
      if (focusedVisible !== "ok") {
        throw new Error(`206: the tabpanel did not take keyboard-visible focus (${focusedVisible})`);
      }
      // Let any focus transition settle before the computed read.
      await page.waitForTimeout(450);
      const halo = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return "(no active element)";
        const cs = getComputedStyle(el);
        return `${el.tagName}[role=${el.getAttribute("role")}]::${cs.boxShadow}`;
      });
      // The flipped dark background token rgb(14,19,16) must paint the
      // offset band; the v4 default halo would paint rgb(255,255,255).
      if (!halo.includes("14, 19, 16")) {
        throw new Error(`206: the focused panel's offset band is not the flipped background token — computed: ${halo}`);
      }
      if (halo.includes("255, 255, 255")) {
        throw new Error(`206: the white halo still paints in dark mode — computed: ${halo}`);
      }
      await page.screenshot({ path: `${OUT}/206-session251-tabs-panel-halo-1440.png` });
      commit("206-session251-tabs-panel-halo-1440.png", "the Expenses tab panel keyboard-focused in the dark default — the ring-offset band carries the flipped background token rgb(14,19,16), the white halo retired (F-251g)");
      await page.close();
    }

    await browser.close();
    console.log("[captures-251] all five faces captured");
  } catch (e) {
    console.error("[captures-251] FAILED:", e);
    exitCode = 1;
  } finally {
    if (spawned && spawned.pid !== undefined) {
      try {
        process.kill(-spawned.pid, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
  }
  if ((await censusCheck()) !== 0) exitCode = 1;
  process.exit(exitCode);
}

function censusCheck(): number {
  return censusTripwire();
}

main().catch((e) => {
  console.error("[captures-251]", e);
  process.exit(1);
});
