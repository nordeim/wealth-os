// Session-238 evidence captures (R-35 — the history-width, third-window,
// and slice-hygiene round). Three faces freeze the post-round surfaces
// with the R-35 behavior asserted in-DOM:
// 155: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census).
// 156: the restored full-width Expenses history at 1440 — the round's
//      flagship (F-238a): the Tabs wrapper hoisted out of the header
//      flex row, the list carrying (nearly) the card's full content
//      width (asserted: the active tabpanel ≥ 90% of the history
//      section's width, at the left edge — the pre-cure squeeze
//      measured w=427 inside the 1120px card).
// 157: the mutation-401 wall face (F-238b's surface) — a row Delete
//      answering 401 (route-intercepted — the deterministic trigger
//      for the third revocation window) renders the redirect face and
//      lands on /login?from_url=…, NEVER the "Delete failed — Sign in
//      required" toast over a stale workspace (asserted: the held
//      redirect face's text + the from_url round-trip; the face is
//      held by a brief route delay on the login target — the F-236f
//      captures pattern).
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
if (path.basename(process.argv[1] ?? "") !== "captures-238.ts") process.exit(0);

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
    console.error("[captures-238] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-238] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-238] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-238] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-238] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-238] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-238] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-238] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-238] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 155: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("155: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`155: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("155: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/155-session238-mobile-drawer-390.png` });
      commit("155-session238-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
    }

    // ---- 156: the restored full-width history (F-238a, the flagship) ----
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      // The geometry assertion (the e2e pin's own measurement): the
      // active panel carries ≥ 90% of the history card's width, at its
      // left edge — the pre-cure squeeze rendered w=427 at x=957 inside
      // the 1120px card.
      const m = await page.evaluate(() => {
        const section = [...document.querySelectorAll("section")].find((s) =>
          s.querySelector("h2")?.textContent?.startsWith("Expense History"));
        if (!section) return null;
        const panel = section.querySelector<HTMLElement>('[role="tabpanel"]:not([hidden])');
        const ul = section.querySelector("ul");
        if (!panel || !ul) return null;
        const sr = section.getBoundingClientRect();
        const pr = panel.getBoundingClientRect();
        const ur = ul.getBoundingClientRect();
        return {
          sectionW: sr.width,
          panelW: pr.width,
          panelX: pr.x,
          sectionX: sr.x,
          rows: ul.children.length,
          ulW: Math.round(ur.width),
        };
      });
      if (!m) throw new Error("156: the history section did not render");
      if (m.panelW < m.sectionW * 0.9) {
        throw new Error(`156: the history list is still squeezed (panelW ${Math.round(m.panelW)} of ${Math.round(m.sectionW)})`);
      }
      if (Math.abs(m.panelX - m.sectionX) > 24) {
        throw new Error(`156: the history list is pushed right (x ${Math.round(m.panelX - m.sectionX)}px into the card)`);
      }
      if (m.rows < 10) throw new Error(`156: the seeded list is unexpectedly short (${m.rows} rows)`);
      await page.screenshot({ path: `${OUT}/156-session238-expenses-history-fullwidth-1440.png` });
      commit(
        "156-session238-expenses-history-fullwidth-1440.png",
        `the restored full-width Expense History at 1440 — ${m.rows} rows at ${m.ulW}px inside the ${Math.round(m.sectionW)}px card (F-238a; asserted ≥90% width at the left edge — the pre-cure squeeze was 427px at the card's right side)`,
      );
    }

    // ---- 157: the mutation-401 wall face (F-238b) ------------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      // Hold the redirect target briefly (the F-236f captures pattern):
      // the wall's redirect face is transient under the dev server, and
      // the held navigation keeps it paintable for the assertion.
      await page.route("**/login*", (route) =>
        new Promise<void>((resolve) => {
          setTimeout(async () => {
            await route.continue();
            resolve();
          }, 2500);
        }),
      );
      await page.route("**/api/transactions/*", (route) =>
        route.fulfill({
          status: 401,
          contentType: "application/json",
          body: JSON.stringify({
            ok: false,
            error: { code: "UNAUTHORIZED", message: "Sign in required" },
          }),
        }),
      );
      await page.getByRole("button", { name: /Delete Apartment Rent/ }).first().click();
      const face = page.getByText("Redirecting to sign in…");
      await face.waitFor({ state: "visible", timeout: 30_000 });
      await page.waitForTimeout(600);
      await page.screenshot({ path: `${OUT}/157-session238-mutation-401-wall.png` });
      // The redirect face is the DELIBERATELY minimal surface (a full
      // window of the app's dark background + one muted line) — a flat
      // dark PNG compresses far below the 30KB heuristic; the honest
      // floor for this face is the pixel check (non-white throughout,
      // verified in the session log), not the generic byte floor.
      commit(
        "157-session238-mutation-401-wall.png",
        "a row Delete answering 401 renders the revocation wall's redirect face — the workspace is GONE (no stale ledger); the action's own failure toast rides the face for its auto-dismiss window (the recorded F-238q rider)",
        8_000,
      );
      // And the round-trip completes onto the login wall.
      await page.waitForURL(/\/login\?from_url=/, { timeout: 30_000 });
      await page.unroute("**/api/transactions/*");
      await page.unroute("**/login*");
    }

    await browser.close();
    console.log("[captures-238] all three faces verified");
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
  console.error(`[captures-238] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
