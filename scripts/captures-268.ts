// Session-268 evidence capture (R-65 — the year-remap, switch-target, and
// cleared-bound round). Two faces freeze the round's rendered-surface
// subjects:
// 252: THE CLEARED-BOUND ANALYTICS FACE AT DESKTOP (1440×900) — the From
//      date input cleared (the one-keystroke path that used to NaN every
//      comparison): the stat row keeps the corpus's real averages (never
//      the $0.00 averages-of-an-undefined-window), the trend card stays
//      populated (no "No data in the selected range" face) — F-268c's
//      empty-bound-is-open doctrine, rendered.
// 253: THE SETTINGS SWITCH HIT-AREA FACE AT DESKTOP (1440×900) — the
//      Notifications card's switch paints the reference's own 36-by-20
//      track (parity-faithful) while the hit area extends past the
//      painted box: elementFromPoint 6px ABOVE the track center resolves
//      to the switch itself (the F-225d doctrine), and the switch's
//      aria-describedby names the row's description (F-248j's completion)
//      — F-268b, rendered.
// The script rides the own-database convention (session 225, R-22,
// F-225e + session 226's F-226g liveness check): db/captures.db
// recreated + seeded per run, the spawned dev server carries
// DATABASE_URL=file:../db/captures.db, custom.db is never touched,
// and a census tripwire guards the exit.
import { chromium, type Page } from "@playwright/test";
import { unlinkSync, statSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import * as path from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-268.ts") process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";
const CAPTURES_DB_URL = "file:../db/captures.db";

/** F-225e: recreate + seed db/captures.db (deterministic per run). */
function seedCapturesDb() {
  try {
    unlinkSync(path.join(process.cwd(), "db", "captures.db"));
  } catch {
    /* absent — a fresh run */
  }
  for (const cmd of [["run", "db:push"], ["run", "db:seed"]] as const) {
    const r = spawnSync("bun", [...cmd], { cwd: process.cwd(), env: { ...process.env, DATABASE_URL: CAPTURES_DB_URL }, stdio: "ignore" });
    if (r.status !== 0) {
      throw new Error(`the captures db: bun ${cmd.join(" ")} failed (${r.status})`);
    }
  }
}

/** F-225e: spawn the dev server riding db/captures.db. */
function bootCapturesDb(): ReturnType<typeof spawn> {
  const devEnv: NodeJS.ProcessEnv = { ...process.env, DATABASE_URL: CAPTURES_DB_URL };
  return spawn("bun", ["run", "dev"], { cwd: process.cwd(), env: devEnv, stdio: "ignore", detached: true });
}

/** F-225e: the exit tripwire — custom.db must still MATCH its contract. */
function censusTripwire(): number {
  const r = spawnSync("bun", ["run", "db:census"], { cwd: process.cwd(), stdio: "pipe", encoding: "utf8" });
  const out = `${r.stdout ?? ""}${r.stderr ?? ""}`;
  if (r.status !== 0 || !out.includes("census: MATCH")) {
    console.error("[captures-268] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-268] the census tripwire: custom.db MATCH");
  return 0;
}

async function expectVisible(loc: import("@playwright/test").Locator) {
  await loc.waitFor({ state: "visible", timeout: 10_000 });
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

function commit(file: string, note: string, minBytes = 20_000) {
  const bytes = statSync(`${OUT}/${file}`).size;
  if (bytes < minBytes) throw new Error(`${file}: suspiciously small (${bytes}B) — blank?`);
  console.log(`[captures-268] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-268] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error("[captures-268] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.");
      process.exit(1);
    }
    console.log("[captures-268] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-268] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error("[captures-268] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.");
      process.exit(1);
    }
  }

  const browser = await chromium.launch();
  let exitCode = 0;
  try {
    // ---- 252: THE CLEARED-BOUND ANALYTICS FACE AT DESKTOP (1440×900) ----
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await login(page, BASE);
      await page.goto(`${BASE}/analytics`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);

      // Sanity: the default range renders the trend card.
      await expectVisible(page.getByText("Income vs Expenses Trend"));

      // The baseline stat row (the default 6-month window).
      const statRow = page.locator("div.grid").filter({ hasText: "Avg Monthly Income" }).first();
      await expectVisible(statRow);
      const beforeText = await statRow.textContent();
      if (beforeText!.includes("$0.00")) {
        throw new Error(`252: the baseline stat row already reads $0.00 (${beforeText}) — the corpus fixture broke`);
      }

      // THE CLEARED BOUND (F-268c): the one-keystroke path that used to
      // NaN every comparison — From cleared, the stat row keeps the
      // corpus's real averages and the trend stays populated.
      await page.getByLabel("From date").fill("");
      await page.waitForTimeout(500);
      const fromVal = await page.getByLabel("From date").inputValue();
      if (fromVal !== "") {
        throw new Error(`252: the From input did not clear ("${fromVal}")`);
      }
      const afterText = await statRow.textContent();
      if (afterText!.includes("$0.00")) {
        throw new Error(`252: the cleared bound zeroed the stat row ("${afterText}") — the F-268c guard failed`);
      }
      const noData = await page.getByText("No data in the selected range").count();
      if (noData !== 0) {
        throw new Error("252: the no-data face renders for the cleared-bound range — the F-268c guard failed");
      }

      await page.screenshot({ path: `${OUT}/252-session268-cleared-bound-analytics-1440.png`, fullPage: true });
      commit(
        "252-session268-cleared-bound-analytics-1440.png",
        `THE CLEARED-BOUND ANALYTICS FACE AT DESKTOP — From empty, the stat row keeps the real averages (the post-clear row reads ${afterText!.replace(/\s+/g, " ").trim().slice(0, 90)}…), the trend populated`,
      );
      await page.close();
      await ctx.close();
    }

    // ---- 253: THE SETTINGS SWITCH HIT-AREA FACE AT DESKTOP (1440×900) --
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await login(page, BASE);
      await page.goto(`${BASE}/settings`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);

      const sw = page.getByRole("switch").first();
      await sw.scrollIntoViewIfNeeded();
      await expectVisible(sw);
      const box = await sw.boundingBox();
      if (!box) throw new Error("253: the switch never boxed");
      // The painted genus rider: the reference's own 36-by-20 track.
      if (Math.round(box.width) !== 36 || Math.round(box.height) !== 20) {
        throw new Error(`253: the painted track measures ${box.width}x${box.height}, not the reference's 36x20 — the paint must not change`);
      }

      // THE HIT AREA (F-268b): elementFromPoint 4px ABOVE the track's
      // top edge resolves to the switch itself (the F-225d doctrine —
      // the honest form of "is the hit area extended"): pre-cure the
      // point sat in the row's dead space. The extension is 6px past
      // the border box each way (the 8px insets offset from the padding
      // box — the 2px border spends 2px), so 4px probes sit solidly
      // inside the clickable 36-by-32 box, outside the painted 20px.
      const hitAbove = await page.evaluate(
        ([x, y]) => {
          const el = document.elementFromPoint(x as number, y as number);
          return el ? el.closest('button[role="switch"]') !== null : false;
        },
        [box.x + box.width / 2, box.y - 4],
      );
      if (!hitAbove) {
        throw new Error("253: elementFromPoint 4px above the track does not resolve to the switch — the hit-area extension failed");
      }
      // And 4px BELOW the bottom edge (the symmetric arm).
      const hitBelow = await page.evaluate(
        ([x, y]) => {
          const el = document.elementFromPoint(x as number, y as number);
          return el ? el.closest('button[role="switch"]') !== null : false;
        },
        [box.x + box.width / 2, box.y + box.height + 4],
      );
      if (!hitBelow) {
        throw new Error("253: elementFromPoint 4px below the track does not resolve to the switch — the hit-area extension failed");
      }

      // THE DESCRIBED-BY WIRING (F-248j's completion): the switch's
      // accessible description names the row's description text.
      const descId = await sw.getAttribute("aria-describedby");
      if (!descId) {
        throw new Error("253: the switch carries no aria-describedby — the F-248j wiring failed");
      }
      const descText = await page.locator(`#${descId}`).textContent();
      if (!descText || descText.trim().length < 8) {
        throw new Error(`253: the described-by target #${descId} carries no real description text`);
      }
      console.log(`[captures-268] 253 wiring: aria-describedby=${descId} → "${descText.trim()}"`);

      // The evidence frame: the Notifications card with its switches.
      await page.screenshot({ path: `${OUT}/253-session268-switch-hit-area-1440.png` });
      commit(
        "253-session268-switch-hit-area-1440.png",
        "THE SETTINGS SWITCH HIT-AREA FACE AT DESKTOP — the 36-by-20 painted track (the reference's own genus) with the 36-by-32 clickable box, the description wired to the switch",
      );
      await page.close();
      await ctx.close();
    }
  } catch (err) {
    console.error(`[captures-268] ${(err as Error).message}`);
    exitCode = 1;
  } finally {
    await browser.close().catch(() => undefined);
    if (spawned?.pid) {
      try {
        process.kill(-spawned.pid, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
    if (censusTripwire() !== 0) exitCode = 1;
  }
  process.exit(exitCode);
}

void main();
