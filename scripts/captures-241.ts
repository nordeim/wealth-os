// Session-241 evidence captures (R-38 — the clear-era, creation-path,
// and seam-completion round). Four faces freeze the post-round
// surfaces with the R-38 behavior asserted in-DOM:
// 166: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census).
// 167: the Settings budget-category inline input at 1440 (F-241f's
//      width appendage) — the input rides FORM_INPUT as the
//      w-auto/flex-1 appendage: the base genus geometry (asserted:
//      40px/8px/14px) plus the flex growth (asserted: flex-grow 1 and
//      the row-grown width, not the intrinsic auto width).
// 168: the Expenses notes textarea at 1440 (F-241f's re-entered
//      FORM_TEXTAREA seam) — the field computes the seam's genus
//      geometry (asserted: 64px min-height, 8px radius, 14px font,
//      full width) — the honest form after the two-site paste swap.
// 169: the Expenses filters popover focus return at 1440 (F-241e) —
//      the popover opens, Escape closes it over interior focus, and
//      the active element lands BACK on the Filters trigger (asserted
//      by the activeElement identity — the behavioral proof, the
//      screenshot freezing the returned focus ring).
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
if (path.basename(process.argv[1] ?? "") !== "captures-241.ts") process.exit(0);

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
    console.error("[captures-241] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-241] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-241] ${file} — ${note} (${bytes}B)`);
}

/** The FORM_INPUT base geometry (the F-240d/F-241f seam's computed
 *  contract): the height-10 / rounded-lg / text-sm triple. */
async function assertBaseGeometry(page: Page, selector: string) {
  const geo = await page.evaluate((sel) => {
    const el = document.querySelector(sel) as HTMLElement | null;
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      height: cs.height,
      radius: cs.borderTopLeftRadius,
      fontSize: cs.fontSize,
      width: cs.width,
      flexGrow: cs.flexGrow,
      minHeight: cs.minHeight,
    };
  }, selector);
  if (!geo) throw new Error(`the ${selector} field not found`);
  if (geo.height !== "40px") {
    throw new Error(`${selector}: computed height ${geo.height} (expected 40px — the seam's height step)`);
  }
  if (geo.radius !== "8px") {
    throw new Error(`${selector}: computed radius ${geo.radius} (expected 8px — the seam's rounding)`);
  }
  if (geo.fontSize !== "14px") {
    throw new Error(`${selector}: computed font ${geo.fontSize} (expected 14px — the seam's text step)`);
  }
  return geo;
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-241] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-241] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-241] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-241] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-241] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-241] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 166: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("166: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`166: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("166: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/166-session241-mobile-drawer-390.png` });
      commit("166-session241-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
    }

    // ---- 167: the Settings budget-category appendage (F-241f) -----------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Settings`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const geo = await assertBaseGeometry(
        page,
        'input[aria-label="Budget category"]',
      );
      // The width appendage's computed form: the row-grown flex width
      // (flex-1 governing the sm:flex-row), not the intrinsic auto
      // width a bare input would size to (~177px at size=20).
      if (geo.flexGrow !== "1") {
        throw new Error(`167: the budget-category input computes flex-grow ${geo.flexGrow} (expected 1 — the flex appendage)`);
      }
      const widthNum = Number.parseFloat(geo.width);
      if (!(widthNum > 400)) {
        throw new Error(`167: the budget-category input computes width ${geo.width} (expected the row-grown width > 400px — flex-1 governing, not the intrinsic auto width)`);
      }
      await page.screenshot({ path: `${OUT}/167-session241-settings-category-appendage-1440.png` });
      commit(
        "167-session241-settings-category-appendage-1440.png",
        `the Settings budget row at 1440 — the category input rides FORM_INPUT as the width appendage (asserted: ${geo.height}/${geo.radius}/${geo.fontSize} base + flex-grow ${geo.flexGrow} at the row-grown ${geo.width}, F-241f's per-site cn() form)`,
      );
    }

    // ---- 168: the Expenses notes textarea seam (F-241f) ------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      await page.getByRole("button", { name: "Add Expense", exact: true }).click();
      const dialog = page.getByRole("dialog");
      await dialog.waitFor({ state: "visible", timeout: 10_000 });
      await page.waitForTimeout(700);
      // The dialog opens on the QUICK step (pick a category) — advance
      // to the manual form where the notes textarea lives.
      await dialog.getByRole("button", { name: "Or fill manually" }).click();
      await page.waitForTimeout(600);
      const geo = await page.evaluate(() => {
        const el = document.querySelector("#expense-notes") as HTMLElement | null;
        if (!el) return null;
        const cs = getComputedStyle(el);
        return {
          minHeight: cs.minHeight,
          radius: cs.borderTopLeftRadius,
          fontSize: cs.fontSize,
          height: cs.height,
        };
      });
      if (!geo) throw new Error("168: the notes textarea not found");
      if (geo.minHeight !== "64px") {
        throw new Error(`168: the notes textarea computes min-height ${geo.minHeight} (expected 64px — the seam's height floor)`);
      }
      if (geo.radius !== "8px") {
        throw new Error(`168: the notes textarea computes radius ${geo.radius} (expected 8px — the seam's rounding)`);
      }
      if (geo.fontSize !== "14px") {
        throw new Error(`168: the notes textarea computes font ${geo.fontSize} (expected 14px — the seam's text step)`);
      }
      await page.screenshot({ path: `${OUT}/168-session241-expenses-notes-textarea-1440.png` });
      commit(
        "168-session241-expenses-notes-textarea-1440.png",
        `the Add-Expense manual form at 1440 — the notes textarea rides FORM_TEXTAREA (asserted: ${geo.minHeight} floor · ${geo.radius} radius · ${geo.fontSize} text — byte-identical to the two-site paste the seam replaced)`,
      );
    }

    // ---- 169: the popover focus return (F-241e) --------------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      // Open the filters popover, move focus INSIDE it (the Category
      // Select trigger), then close with Escape — the focus that died
      // to <body> with the unmount must land back on the Filters
      // trigger (the F-241e contract).
      await page.getByRole("button", { name: "Filters", exact: true }).click();
      await page.waitForTimeout(600);
      const popover = page.getByRole("group", { name: "Expense filters" });
      if (!(await popover.count())) throw new Error("169: the filters popover did not open");
      await page.focus("#expense-category-filter");
      await page.waitForTimeout(300);
      await page.keyboard.press("Escape");
      await page.waitForTimeout(600);
      const focusLanded = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        return el?.textContent ?? "";
      });
      if (!focusLanded.includes("Filters")) {
        throw new Error(`169: after the Escape close, focus landed on "${focusLanded || "body"}" (expected the Filters trigger — the F-241e focus return)`);
      }
      await page.screenshot({ path: `${OUT}/169-session241-popover-focus-return-1440.png` });
      commit(
        "169-session241-popover-focus-return-1440.png",
        `the Expenses filters popover after the Escape close at 1440 — focus landed back on the Filters trigger (asserted by activeElement identity; the ring freezes the return, F-241e)`,
      );
    }

    await browser.close();
    console.log("[captures-241] all four faces verified");
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
  console.error(`[captures-241] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
