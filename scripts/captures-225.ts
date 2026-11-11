// Session-225 evidence captures (R-22 — the designated-tail
// completion and tooling-hygiene round). Two faces freeze the
// post-round surfaces with the R-22 behavior asserted in-DOM:
// 117: the skip link, focused at 390, is the TOPMOST element at its
//      own center (the F-225d cure — asserted: elementFromPoint at the
//      revealed pill's center returns the LINK ITSELF; pre-cure: the
//      sticky mobile header's wordmark won the equal-z-50 paint order
//      and the focused link was invisible below lg). Enter lands
//      #main-content — the functional control.
// 118: the import preview with the new forms (the F-225a/b cures —
//      asserted in America/New_York: "Nov 1, 2026 10:00 +09:00" and
//      "2026/11/01 UTC" stage Nov 1 (pre-cure in NY: Oct 31 wrong-day
//      and a skip — the zone split) while the numeric year-month
//      partial "2026/11" is skipped (pre-cure: the invented Nov 1) —
//      exactly the two designated rows preview.
// The script rides the own-database convention (session 225, R-22,
// F-225e): db/captures.db recreated + seeded per run, the spawned dev
// server carries DATABASE_URL=file:../db/captures.db, custom.db is
// never touched, and a census tripwire guards the exit.
import { chromium, type Page } from "@playwright/test";
import { statSync, unlinkSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import * as path from "node:path";
import { join } from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-225.ts") process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";
const CAPTURES_DB_URL = "file:../db/captures.db";

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
    console.error("[captures-225] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-225] the census tripwire: custom.db MATCH");
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
  const bytes = statSync(file).size;
  if (bytes < 30_000) throw new Error(`${file}: suspiciously small (${bytes}B) — blank?`);
  console.log(`[captures-225] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e) ---------------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-225] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-225] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-225] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-225] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // Session-226 (R-23, F-226g): the spawn-liveness check — a slow-booting
    // incumbent can win the :3000 race (the 2.5s refusal probe returns
    // "free" before it answers; our child then dies on EADDRINUSE silently
    // with stdio ignored; the 90s wait succeeds against the INCUMBENT whose
    // database is unknowable — the exact scenario the refusal excludes).
    // The child must still be alive: a dead spawn means someone else's
    // server answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-225] the spawned server DIED during the wait (exitCode=" +
          String(spawned.exitCode) +
          ") — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-225] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 117: the skip link, focused at 390, is topmost (F-225d) ---
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      const skip = page.getByRole("link", { name: "Skip to main content" });
      await page.keyboard.press("Tab");
      await skip.waitFor({ state: "visible", timeout: 5000 });
      if (!(await skip.evaluate((el) => el === document.activeElement))) {
        throw new Error("117: the first Tab must focus the skip link");
      }
      // The honest form of "the focused link is visible": the link
      // itself is the topmost element at its own center. Pre-cure:
      // elementFromPoint answered the header's wordmark (equal z-50,
      // later in DOM — the paint order put the pill UNDER the header).
      const topmost = await skip.evaluate((el) => {
        const r = el.getBoundingClientRect();
        const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
        return hit ? (hit === el ? "self" : hit.tagName.toLowerCase()) : "none";
      });
      if (topmost !== "self") {
        throw new Error(`117: the focused link must be topmost at its own center — got "${topmost}"`);
      }
      // The functional control: Enter lands #main-content.
      await page.keyboard.press("Enter");
      await page.waitForTimeout(400);
      const landed = await page.evaluate(() => document.activeElement?.getAttribute("id") ?? "<none>");
      if (landed !== "main-content") {
        throw new Error(`117: Enter must land #main-content — got "${landed}"`);
      }
      await page.screenshot({ path: `${OUT}/117-session225-skip-link-390-topmost.png`, fullPage: false });
      commit(
        `${OUT}/117-session225-skip-link-390-topmost.png`,
        "F-225d cure — the focused skip link at 390 is topmost at its own center (above the mobile header); Enter lands #main-content",
      );
      await page.close();
    }

    // ---- 118: the import preview, the new forms (F-225a/b) ---------
    {
      // America/New_York — the zone where the pre-cure forms staged
      // wrong days (Oct 31) or split by zone (null west / staged east).
      const page = await browser.newPage({
        viewport: { width: 1440, height: 900 },
        timezoneId: "America/New_York",
      });
      await page.addInitScript(() => {
        try {
          localStorage.setItem("wealthos-theme", "dark");
        } catch {
          /* storage sandbox */
        }
      });
      await login(page, BASE);
      await page.goto(`${BASE}/Import`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      const csv = [
        "Description,Amount,Date,Category",
        "Kept space-offset,25.00,Nov 1, 2026 10:00 +09:00,Other",
        "Numeric partial,10.00,2026/11,Other",
        "Kept 4-digit designated,5.00,2026/11/01 UTC,Other",
      ].join("\n");
      await page.setInputFiles('input[type="file"]', {
        name: "bank.csv",
        mimeType: "text/csv",
        buffer: Buffer.from(csv, "utf8"),
      });
      await page.getByRole("button", { name: /upload and extract/i }).click();
      await page.waitForTimeout(1500);
      const preview = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll("tbody tr"));
        const cells = rows.flatMap((r) =>
          Array.from(r.querySelectorAll("td")).map((td) => td.textContent ?? ""),
        );
        return { cells, rowCount: rows.length };
      });
      // F-225b: both designated rows stage the WRITTEN day (Nov 1) —
      // pre-cure in New York: the space-offset form staged Oct 31
      // (a wrong day west of the designation) and the 4-digit UTC form
      // was a skip (the zone split).
      if (!preview.cells.some((c) => /Nov\s*1\b/.test(c))) {
        throw new Error(
          `118: the designated rows must stage Nov 1 — got ${JSON.stringify(preview.cells)}`,
        );
      }
      if (preview.cells.some((c) => /Oct\s*3[01]|Dec\s*1\b/.test(c))) {
        throw new Error(
          `118: no wrong-day staging (Oct 31 / Dec 1) may appear — got ${JSON.stringify(preview.cells)}`,
        );
      }
      // F-225a: the numeric year-month partial is skipped — exactly the
      // two designated rows preview (pre-cure: the partial invented
      // Nov 1 and all three rows staged).
      if (preview.rowCount !== 2) {
        throw new Error(
          `118: exactly the two designated rows preview (${preview.rowCount} rows) — got ${JSON.stringify(preview.cells)}`,
        );
      }
      await page.screenshot({ path: `${OUT}/118-session225-import-designated-tails.png`, fullPage: false });
      commit(
        `${OUT}/118-session225-import-designated-tails.png`,
        "F-225a/b cures — 'Nov 1, 2026 10:00 +09:00' and '2026/11/01 UTC' stage Nov 1 in New York; the '2026/11' partial skips",
      );
      await page.close();
    }

    await browser.close();
    console.log("[captures-225] both faces verified");
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
  console.error(`[captures-225] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
