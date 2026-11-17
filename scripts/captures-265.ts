// Session-265 evidence capture (R-62 — the expenses-filters, coach-count,
// and live-region round). Two faces freeze the round's rendered-surface
// subject (the F-265b expansion card):
// 246: THE EXPANSION CARD AT DESKTOP (1440×900) — the reference's own
//      filter genus: an in-flow card below the search row with the six
//      controls (Date Range + the Custom reveal, Category, Min, Max,
//      Sort By + direction) and the Clear All / Cancel / Apply Filters
//      footer. Asserted live: the panel is position static and
//      full-width (the anchored w-64 popover form is gone), a Custom
//      range pick reveals the Start/End inputs, and the sort pair
//      reorders the list INSTANTLY (the live-apply superset).
// 247: THE EXPANSION CARD AT MOBILE (390×844) — the same card stacks
//      (grid md:grid-cols-2 lg:grid-cols-3 collapses to one column),
//      the footer wraps, and Escape closes with the focus return.
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
if (path.basename(process.argv[1] ?? "") !== "captures-265.ts") process.exit(0);

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
    console.error("[captures-265] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-265] the census tripwire: custom.db MATCH");
  return 0;
}


async function expectVisible(loc: import("@playwright/test").Locator) {
  await loc.waitFor({ state: "visible", timeout: 10_000 });
}

async function expectCount0(loc: import("@playwright/test").Locator) {
  await loc.waitFor({ state: "detached", timeout: 10_000 });
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
  console.log(`[captures-265] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-265] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error("[captures-265] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.");
      process.exit(1);
    }
    console.log("[captures-265] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-265] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error("[captures-265] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.");
      process.exit(1);
    }
  }

  const browser = await chromium.launch();
  let exitCode = 0;
  try {
    // ---- 246: THE EXPANSION CARD AT DESKTOP (1440×900) (F-265b) --------
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await login(page, BASE);
      await page.goto(`${BASE}/expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);

      // Open the card via the trigger.
      await page.getByRole("button", { name: /^Filters/ }).click();
      const panel = page.getByRole("group", { name: "Expense filters" });
      await expectVisible(panel);

      // The genus assertions: position static (in-flow), full-width
      // (the anchored w-64 form is gone), the six control labels.
      const genus = await page.evaluate(() => {
        const el = document.getElementById("expense-filters") as HTMLElement | null;
        if (!el) return null;
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
          position: cs.position,
          width: Math.round(r.width),
          hasRange: !!document.getElementById("expense-range-filter"),
          hasCategory: !!document.getElementById("expense-category-filter"),
          hasMin: !!document.getElementById("expense-min-amount"),
          hasMax: !!document.getElementById("expense-max-amount"),
          hasSort: !!document.getElementById("expense-sort-field"),
        };
      });
      if (!genus) throw new Error("246: the panel is absent");
      if (genus.position !== "static") {
        throw new Error(`246: the panel is ${genus.position}, not static (the in-flow genus)`);
      }
      if (genus.width < 800) {
        throw new Error(`246: the panel is ${genus.width}px wide — the anchored w-64 popover form survived`);
      }
      for (const [key, name] of [
        ["hasRange", "Date Range"],
        ["hasCategory", "Category"],
        ["hasMin", "Min Amount"],
        ["hasMax", "Max Amount"],
        ["hasSort", "Sort By"],
      ] as const) {
        if (!genus[key]) throw new Error(`246: the ${name} control is absent`);
      }

      // The Custom reveal: picking Custom range shows Start/End inputs.
      await page.locator("#expense-range-filter").click();
      await page.getByRole("option", { name: "Custom range" }).click();
      await expectVisible(page.getByLabel("Start date", { exact: true }));
      await expectVisible(page.getByLabel("End date", { exact: true }));

      // The live-apply superset: sorting by amount ASC reorders the
      // list INSTANTLY while the card stands open (no Apply needed).
      await page.locator("#expense-sort-field").click();
      await page.getByRole("option", { name: "Amount" }).click();
      await page.waitForTimeout(600);
      const orderAsc = await page.evaluate(() =>
        Array.from(document.querySelectorAll('ul.divide-y li'))
          .map((li) => li.textContent ?? "")
          .slice(0, 30),
      );
      await page.screenshot({ path: `${OUT}/246-session265-expenses-filters-card-1440.png` });
      commit(
        "246-session265-expenses-filters-card-1440.png",
        "THE EXPANSION CARD AT DESKTOP — in-flow (position static), full-width, six controls + footer, custom range revealed, sorted by amount",
      );

      // Flip to ASC and prove the list reorder (the live-apply proof).
      // The option's accessible name carries the sr-only text
      // ("Ascending"); the F-244e authoring lesson — assert the code
      // site, not the prose form, when the visible face is a glyph.
      await page.getByRole("group", { name: "Expense filters" }).locator('[aria-label="Sort direction"]').click();
      await page.getByRole("option", { name: /Ascending|↑/ }).click();
      await page.waitForTimeout(600);
      const orderFlip = await page.evaluate(() =>
        Array.from(document.querySelectorAll('ul.divide-y li'))
          .map((li) => li.textContent ?? "")
          .slice(0, 30),
      );
      if (orderAsc.join("|") === orderFlip.join("|")) {
        throw new Error(
          `246: the direction flip did NOT reorder the list — the live-apply contract failed (asc[0]=${orderAsc[0]?.slice(0, 40) ?? "none"}; flip[0]=${orderFlip[0]?.slice(0, 40) ?? "none"}; len asc=${orderAsc.length} flip=${orderFlip.length})`,
        );
      }

      // Escape closes with the focus return (the surviving close family).
      await page.keyboard.press("Escape");
      await expectCount0(panel);
      await page.close();
      await ctx.close();
    }

    // ---- 247: THE EXPANSION CARD AT MOBILE (390×844) (F-265b) -----------
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
      const page = await ctx.newPage();
      const vw = await page.evaluate(() => window.innerWidth);
      if (vw !== 390) throw new Error(`247: viewport drift — innerWidth=${vw}`);
      await login(page, BASE);
      await page.goto(`${BASE}/expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);

      await page.getByRole("button", { name: /^Filters/ }).click();
      const panel = page.getByRole("group", { name: "Expense filters" });
      await expectVisible(panel);

      // The stacked genus: at 390 the inner grid collapses to one
      // column and every control stays visible.
      const stacked = await page.evaluate(() => {
        const grid = document.getElementById("expense-filters")?.firstElementChild as HTMLElement | null;
        if (!grid) return null;
        const cs = getComputedStyle(grid);
        return { cols: cs.gridTemplateColumns.split(" ").length, vw: window.innerWidth };
      });
      if (!stacked) throw new Error("247: the inner grid is absent");
      if (stacked.cols !== 1) {
        throw new Error(`247: the grid is ${stacked.cols} columns at 390 — the stacked genus failed`);
      }
      for (const label of ["Date Range", "Category", "Min Amount", "Max Amount", "Sort By"]) {
        await expectVisible(page.getByRole("group", { name: "Expense filters" }).getByText(label, { exact: true }));
      }

      await page.screenshot({ path: `${OUT}/247-session265-expenses-filters-card-390.png`, fullPage: true });
      commit(
        "247-session265-expenses-filters-card-390.png",
        `THE EXPANSION CARD AT MOBILE — one column (${stacked.cols} col at ${stacked.vw}px), all controls + footer stacked`,
      );

      // Escape closes (the mobile keyboard contract).
      await page.keyboard.press("Escape");
      await expectCount0(panel);
      await page.close();
      await ctx.close();
    }
  } catch (err) {
    console.error(`[captures-265] ${(err as Error).message}`);
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
