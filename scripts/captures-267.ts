// Session-267 evidence capture (R-64 — the savings-tab, sort-count, and
// calendar-roundtrip round). Two faces freeze the round's rendered-surface
// subjects:
// 250: THE SAVINGS-TAB NO-MATCHES FACE AT DESKTOP (1440×900) — the
//      corpus's own empty savings bucket (needs 46 · wants 26 ·
//      savings 0) empties the expense list through the tab ALONE: the
//      face reads "No expenses match your filters" with Clear Filters
//      standing (never the onboarding CTA for the 72-expense ledger),
//      and Clear Filters lifts the tab with every other constraint
//      (the All tab returns, the list restores exactly — F-267a).
//      The Add Expense dialog's Date input carries the FORM genus
//      (F-267d): the computed fill reads the dark stone-900 family,
//      the genus its siblings always rode.
// 251: THE COMPOUND RESTORE AT MOBILE (390×844) — the Savings tab plus
//      a search constraint empties the list, and Clear Filters lifts
//      BOTH (the tab AND the search box): the All tab returns, the
//      search empties, the list restores (the compound the pre-cure
//      Clear left half-lifted).
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
if (path.basename(process.argv[1] ?? "") !== "captures-267.ts") process.exit(0);

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
    console.error("[captures-267] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-267] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-267] ${file} — ${note} (${bytes}B)`);
}

async function listCount(page: Page): Promise<number> {
  return page.evaluate(() => document.querySelectorAll("ul.divide-y li").length);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-267] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error("[captures-267] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.");
      process.exit(1);
    }
    console.log("[captures-267] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-267] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error("[captures-267] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.");
      process.exit(1);
    }
  }

  const browser = await chromium.launch();
  let exitCode = 0;
  try {
    // ---- 250: THE SAVINGS-TAB NO-MATCHES FACE AT DESKTOP (1440×900) ----
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await login(page, BASE);
      await page.goto(`${BASE}/expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);

      const baseline = await listCount(page);
      if (baseline < 5) throw new Error(`250: the seeded ledger looks wrong (${baseline} rows)`);

      // The corpus's empty savings bucket: the Savings tab ALONE empties
      // the list — and the face is the OVER-CONSTRAINED truth (F-267a),
      // never the onboarding non-sequitur the pre-cure page rendered.
      await page.getByRole("tab", { name: "Savings" }).click();
      await page.waitForTimeout(400);
      const emptied = await listCount(page);
      if (emptied !== 0) {
        throw new Error(`250: the Savings tab left ${emptied} rows — the corpus's savings bucket is no longer empty (the fixture assumption broke; re-derive)`);
      }
      await expectVisible(page.getByText("No expenses match your filters"));
      const onboarding = await page.getByText("Add Your First Expense").count();
      if (onboarding !== 0) {
        throw new Error("250: the onboarding CTA renders for the tab-emptied list — the F-267a discriminator failed");
      }

      // The dialog Date input carries the FORM genus (F-267d): the
      // computed fill reads the dark stone-900 form family (the
      // fresh-visitor dark posture) — the genus its siblings always
      // rode, not the transparent search-box genus it rode before.
      // NB: the dialog opens on its QUICK-SELECT step (the reference's
      // own two-step convention) — the manual form surfaces after the
      // "Or fill manually" reveal.
      await page.getByRole("button", { name: "Add Expense" }).first().click();
      const dialog = page.getByRole("dialog");
      await expectVisible(dialog);
      await page.getByRole("button", { name: /fill manually/i }).click();
      const dateInput = page.locator("#expense-date");
      await expectVisible(dateInput);
      const dateFill = await dateInput.evaluate((el) => getComputedStyle(el).backgroundColor);
      if (dateFill !== "rgb(28, 25, 23)") {
        throw new Error(`250: the dialog Date input's fill is ${dateFill}, not the form genus's dark stone-900 rgb(28, 25, 23)`);
      }
      await page.keyboard.press("Escape");
      await expectCount0(dialog);

      // The evidence frame: the Savings tab's no-matches face.
      await page.screenshot({ path: `${OUT}/250-session267-savings-tab-no-matches-1440.png` });
      commit(
        "250-session267-savings-tab-no-matches-1440.png",
        "THE SAVINGS-TAB NO-MATCHES FACE AT DESKTOP — the tab-emptied list wears the over-constrained truth (Clear Filters standing, the onboarding CTA absent), the dialog Date input on the form genus",
      );

      // Clear Filters lifts the tab with every other constraint: the
      // All tab returns (aria-selected) and the list restores exactly.
      await page.getByRole("button", { name: "Clear Filters" }).click();
      await page.waitForTimeout(600);
      const allSelected = await page.getByRole("tab", { name: "All" }).getAttribute("aria-selected");
      if (allSelected !== "true") {
        throw new Error(`250: Clear Filters left the All tab aria-selected="${allSelected}" — the tab did not reset`);
      }
      const restored = await listCount(page);
      if (restored !== baseline) {
        throw new Error(`250: Clear Filters restored ${restored} rows, not the ${baseline} baseline`);
      }
      await page.close();
      await ctx.close();
    }

    // ---- 251: THE COMPOUND RESTORE AT MOBILE (390×844) (F-267a) --------
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
      const page = await ctx.newPage();
      const vw = await page.evaluate(() => window.innerWidth);
      if (vw !== 390) throw new Error(`251: viewport drift — innerWidth=${vw}`);
      await login(page, BASE);
      await page.goto(`${BASE}/expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);

      const baseline = await listCount(page);
      if (baseline < 5) throw new Error(`251: the seeded ledger looks wrong (${baseline} rows)`);

      // The compound: the Savings tab plus a search constraint. The
      // pre-cure Clear lifted the search but NOT the tab — the
      // still-empty list flipped to the onboarding face after its own
      // button. The cure lifts BOTH.
      await page.getByRole("tab", { name: "Savings" }).click();
      await page.getByPlaceholder("Search expenses...").fill("zzz-no-match");
      await expectVisible(page.getByText("No expenses match your filters"));
      await page.screenshot({ path: `${OUT}/251-session267-savings-tab-compound-390.png`, fullPage: true });
      commit(
        "251-session267-savings-tab-compound-390.png",
        `THE COMPOUND OVER-CONSTRAINT AT MOBILE — the tab plus the search box (${vw}px, full page), Clear Filters standing`,
      );

      await page.getByRole("button", { name: "Clear Filters" }).click();
      await page.waitForTimeout(600);
      const allSelected = await page.getByRole("tab", { name: "All" }).getAttribute("aria-selected");
      if (allSelected !== "true") {
        throw new Error(`251: Clear Filters left the All tab aria-selected="${allSelected}" — the compound tab reset failed`);
      }
      const searchVal = await page.getByPlaceholder("Search expenses...").inputValue();
      if (searchVal !== "") {
        throw new Error(`251: Clear Filters left the search at "${searchVal}"`);
      }
      const restored = await listCount(page);
      if (restored !== baseline) {
        throw new Error(`251: Clear Filters restored ${restored} rows, not the ${baseline} baseline`);
      }
      await page.close();
      await ctx.close();
    }
  } catch (err) {
    console.error(`[captures-267] ${(err as Error).message}`);
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
