// Session-243 evidence captures (R-40 — the logout-bucket, guard-advance,
// and label-truth round). Four faces freeze the post-round surfaces with
// the R-40 behavior asserted in-DOM (or in-volley, for the flagship):
// 174: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census).
// 175: the Import dropzone at 1440 (F-243e) — the sr-only input's
//      accessible name now CONTAINS the visible "Upload a file" label
//      text (asserted: the aria-label ⊇ the visible phrase — the WCAG
//      2.5.3 Label-in-Name cure, live-verified on the dev server).
// 176: the Import dropzone at 390×844 — the same surface's mobile form
//      (the visible label + the format hint render at the phone width).
// 177: THE LOGOUT-VOLLEY WRITE CANARY (F-243a, the flagship's live
//      proof): 70 cookie-less JSON-content-type logout POSTs — every
//      one a no-op 200 that burns NOTHING post-cure — then the
//      sessioned Add Expense round-trip still lands (toast + row).
//      On the pre-cure tree the same volley poisoned the shared
//      writes bucket (60/15min, every caller keys the same client on
//      the direct-exposure posture) and the write 429'd.
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
if (path.basename(process.argv[1] ?? "") !== "captures-243.ts") process.exit(0);

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
    console.error("[captures-243] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-243] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-243] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-243] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-243] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-243] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-243] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-243] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-243] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 174: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("174: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`174: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("174: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/174-session243-mobile-drawer-390.png` });
      commit("174-session243-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
    }

    // ---- 175: the Import dropzone label-in-name (F-243e, desktop) -------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Import`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const geo = await page.evaluate(() => {
        const input = document.querySelector('input[type="file"]') as HTMLInputElement | null;
        if (!input) return null;
        const accname = input.getAttribute("aria-label") ?? "";
        // The wrapping label's visible primary text (the p that carries
        // "Upload a file" before any pick).
        const labels = Array.from(document.querySelectorAll("label p"));
        const visible = labels
          .map((p) => p.textContent?.trim() ?? "")
          .find((t) => t === "Upload a file");
        return { accname, visible: visible ?? null };
      });
      if (!geo) throw new Error("175: the file input not found on /Import");
      if (!geo.visible) throw new Error("175: the visible 'Upload a file' label not found");
      if (!geo.accname.includes(geo.visible)) {
        throw new Error(
          `175: the accessible name "${geo.accname}" does not contain the visible label "${geo.visible}" (WCAG 2.5.3 Label in Name)`,
        );
      }
      await page.screenshot({ path: `${OUT}/175-session243-import-label-in-name-1440.png` });
      commit(
        "175-session243-import-label-in-name-1440.png",
        `the Import dropzone at 1440 — the accessible name contains the visible label (asserted: "${geo.accname}" ⊇ "${geo.visible}" — the WCAG 2.5.3 cure)`,
      );
    }

    // ---- 176: the Import dropzone at 390 (the mobile form) --------------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Import`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const geo = await page.evaluate(() => {
        const input = document.querySelector('input[type="file"]') as HTMLInputElement | null;
        if (!input) return null;
        const accname = input.getAttribute("aria-label") ?? "";
        const visible = Array.from(document.querySelectorAll("label p"))
          .map((p) => p.textContent?.trim() ?? "")
          .find((t) => t === "Upload a file");
        // The dropzone card must lay out inside the phone width.
        const card = input.closest("label") as HTMLElement | null;
        const overwide = card ? card.getBoundingClientRect().right > 391 : null;
        return { accname, visible: visible ?? null, overwide };
      });
      if (!geo) throw new Error("176: the file input not found on /Import at 390");
      if (!geo.visible) throw new Error("176: the visible 'Upload a file' label not found at 390");
      if (!geo.accname.includes(geo.visible)) {
        throw new Error(`176: the accessible name "${geo.accname}" does not contain "${geo.visible}" at 390`);
      }
      if (geo.overwide) throw new Error("176: the dropzone overflows the 390px viewport");
      await page.screenshot({ path: `${OUT}/176-session243-import-label-in-name-390.png` });
      commit(
        "176-session243-import-label-in-name-390.png",
        `the Import dropzone at 390×844 — the label-in-name cure holds at the phone width, no horizontal overflow (asserted: "${geo.accname}" ⊇ "${geo.visible}")`,
      );
    }

    // ---- 177: the logout-volley write canary (F-243a, the flagship) -----
    {
      // The guest volley FIRST: 70 cookie-less JSON-content-type logout
      // POSTs from the Node side (no XFF — the direct-exposure posture's
      // shared client key, the exact poisoning vector). Post-cure every
      // one is a no-op 200 that burns NOTHING.
      let volleyOk = 0;
      let volley429 = 0;
      for (let i = 0; i < 70; i++) {
        const r = await fetch(`${BASE}/api/auth/logout`, {
          method: "POST",
          headers: { "content-type": "application/json" },
        });
        if (r.status === 200) volleyOk++;
        if (r.status === 429) volley429++;
      }
      if (volley429 > 0) {
        throw new Error(
          `177: the guest volley tripped the limiter ${volley429}x — a cookie-less caller is being bucketed (the F-243a cure regressed)`,
        );
      }
      if (volleyOk !== 70) {
        throw new Error(`177: the guest volley answered ${volleyOk}/70 200s (expected all 70 no-ops)`);
      }
      // The sessioned write AFTER the volley must still land — the
      // shared writes bucket is unpoisoned. The UI path (the Add
      // Expense two-step dialog) is the user's own write.
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      await page.getByRole("button", { name: "Add Expense" }).first().click();
      const dialog = page.getByRole("dialog");
      await dialog.waitFor({ state: "visible", timeout: 10_000 });
      await dialog.getByRole("button", { name: /Groceries/ }).click();
      await dialog.getByLabel("Amount (USD)").fill("17.29");
      await dialog.getByRole("button", { name: "Add Expense", exact: true }).click();
      await page.getByText("Expense added").waitFor({ state: "visible", timeout: 15_000 });
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${OUT}/177-session243-logout-volley-write-1440.png` });
      commit(
        "177-session243-logout-volley-write-1440.png",
        `the Expenses page at 1440 AFTER a 70-request cookie-less JSON logout volley — every volley request a no-op 200, the sessioned Add Expense still lands (asserted: the volley all-200 + the "Expense added" toast — the shared writes bucket unpoisoned; the pre-cure tree 429'd this write at volley request 61)`,
      );
    }

    await browser.close();
    console.log("[captures-243] all four faces verified");
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
  console.error(`[captures-243] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
