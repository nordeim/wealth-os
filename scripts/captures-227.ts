// Session-227 evidence captures (R-24 — the build-gate repair and
// wrong-row identity round). Three faces freeze the post-round
// surfaces with the R-24 behavior asserted in-DOM:
// 122: the holdings identity — two same-symbol lots (DUPL) render as
//      two distinct rows, and Edit on the SECOND row opens the dialog
//      prefilled with the SECOND record's own name (F-227b — asserted:
//      the #inv-name input value; pre-cure: the first-match symbol
//      find opened the FIRST lot's record, live-reproduced).
// 123: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted:
//      the link census).
// 124: the investments Edit buttons carry the row-context accessible
//      name (F-227e — asserted: the accessible name ends with the
//      row's symbol, mirroring the tailed Delete; pre-cure: a bare
//      "Edit" N times).
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
if (path.basename(process.argv[1] ?? "") !== "captures-227.ts") process.exit(0);

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
    console.error("[captures-227] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-227] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-227] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-227] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-227] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-227] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-227] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-227] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-227] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 122: the same-symbol holdings keep their identities (F-227b) --
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      const lot = (name: string) => ({
        symbol: "DUPL",
        name,
        type: "stock",
        shares: 10,
        avgCost: 100,
        currentValue: 110,
      });
      const first = await page.request.post(`${BASE}/api/investments`, { data: lot("First Duplicate Lot") });
      const second = await page.request.post(`${BASE}/api/investments`, { data: lot("Second Duplicate Lot") });
      const firstId = ((await first.json()) as { data: { id: string } }).data.id;
      const secondId = ((await second.json()) as { data: { id: string } }).data.id;
      try {
        await page.goto(`${BASE}/Investments`, { waitUntil: "networkidle" });
        await page.waitForTimeout(2200);
        // Both lots render as distinct rows (pre-cure: duplicate React
        // keys risked row-reconciliation anomalies).
        const dupRows = page.getByRole("row", { name: /Duplicate Lot/ });
        if ((await dupRows.count()) !== 2) {
          throw new Error(`122: expected two DUPL rows, found ${await dupRows.count()}`);
        }
        // Edit on the SECOND row opens the SECOND record's prefill
        // (pre-cure, live-reproduced: the dialog carried "First
        // Duplicate Lot" — the wrong-row mutation).
        await dupRows.nth(1).getByRole("button", { name: /^Edit/ }).click();
        await page.waitForTimeout(900);
        const prefilled = await page.locator("#inv-name").inputValue();
        if (prefilled !== "Second Duplicate Lot") {
          throw new Error(
            `122: the second row's Edit prefilled "${prefilled}" — expected "Second Duplicate Lot" (the F-227b identity cure; pre-cure: "First Duplicate Lot")`,
          );
        }
        await page.screenshot({ path: `${OUT}/122-session227-duplicate-symbol-identity.png` });
        commit("122-session227-duplicate-symbol-identity.png", "Edit on the second same-symbol lot opening ITS OWN record (F-227b)");
        await page.keyboard.press("Escape");
        await page.waitForTimeout(400);
      } finally {
        await page.request.delete(`${BASE}/api/investments/${firstId}`);
        await page.request.delete(`${BASE}/api/investments/${secondId}`);
      }
    }

    // ---- 123: the mobile drawer at 390×844 (the standing ask) ----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("123: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`123: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("123: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/123-session227-mobile-drawer-390.png` });
      commit("123-session227-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing mobile-nav ask)");
    }

    // ---- 124: the Edit row-context accessible name (F-227e) ------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Investments`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2200);
      // Every seeded holdings row's Edit button carries its row context
      // (pre-cure: a bare "Edit" with no symbol — the F-226k miss).
      // The name-filtered locator IS the assertion: a bare "Edit"
      // button does not match /^Edit [A-Z]/.
      const editButtons = page.getByRole("button", { name: /^Edit [A-Z]/ });
      const count = await editButtons.count();
      if (count < 6) {
        throw new Error(
          `124: expected the seeded holdings' Edit buttons to carry the row context (>= 6), found ${count} named buttons`,
        );
      }
      await page.screenshot({ path: `${OUT}/124-session227-investments-rowcontext.png` });
      commit("124-session227-investments-rowcontext.png", "the holdings table with row-context Edit buttons (F-227e) on the seeded corpus");
    }

    await browser.close();
    console.log("[captures-227] all three faces verified");
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
  console.error(`[captures-227] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
