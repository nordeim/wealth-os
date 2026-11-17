// Session-266 evidence capture (R-63 — the range-return, empty-truth,
// and escape-stack round). Two faces freeze the round's rendered-surface
// subjects:
// 248: THE ALL-DATES RETURN AT DESKTOP (1440×900) — the range select's
//      new first option names the no-window state (the placeholder
//      retired with it): the trigger reads "All dates" on open, a
//      window pick narrows the list, and the All-dates pick restores
//      it exactly. The Custom reveal's date inputs carry the FORM
//      genus (the F-266e unification — the computed dark fill reads
//      stone-900), and the Escape STACK proof rides the same session:
//      the Add Expense dialog over the open card takes one Escape,
//      the card survives it (F-266d).
// 249: THE NO-MATCHES VARIANT AT MOBILE (390×844) — an over-constrained
//      list (a search-only constraint) renders the no-matches face
//      ("No expenses match your filters" + Clear Filters — never the
//      onboarding CTA), and Clear Filters restores the list (F-266c).
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
if (path.basename(process.argv[1] ?? "") !== "captures-266.ts") process.exit(0);

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
    console.error("[captures-266] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-266] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-266] ${file} — ${note} (${bytes}B)`);
}

async function listCount(page: Page): Promise<number> {
  return page.evaluate(() => document.querySelectorAll("ul.divide-y li").length);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-266] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error("[captures-266] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.");
      process.exit(1);
    }
    console.log("[captures-266] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-266] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error("[captures-266] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.");
      process.exit(1);
    }
  }

  const browser = await chromium.launch();
  let exitCode = 0;
  try {
    // ---- 248: THE ALL-DATES RETURN AT DESKTOP (1440×900) (F-266b/d/e) --
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await login(page, BASE);
      await page.goto(`${BASE}/expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);

      const baseline = await listCount(page);
      if (baseline < 5) throw new Error(`248: the seeded ledger looks wrong (${baseline} rows)`);

      // Open the card; the range trigger NAMES the no-window state (the
      // placeholder retired with the All-dates option).
      await page.getByRole("button", { name: /^Filters/ }).click();
      const panel = page.getByRole("group", { name: "Expense filters" });
      await expectVisible(panel);
      const triggerText = (await page.locator("#expense-range-filter").textContent())?.trim() ?? "";
      if (triggerText !== "All dates") {
        throw new Error(`248: the initial range trigger reads "${triggerText}", not "All dates" (the named no-window state)`);
      }

      // A window pick narrows the list (live apply).
      await page.locator("#expense-range-filter").click();
      await page.getByRole("option", { name: "Last month" }).click();
      await page.waitForTimeout(600);
      const narrowed = await listCount(page);
      if (narrowed === baseline) {
        throw new Error("248: the Last-month window did not change the list — the live apply failed");
      }

      // The return arm: All dates restores the baseline EXACTLY.
      await page.locator("#expense-range-filter").click();
      await page.getByRole("option", { name: "All dates" }).click();
      await page.waitForTimeout(600);
      const restored = await listCount(page);
      if (restored !== baseline) {
        throw new Error(`248: the All-dates return restored ${restored} rows, not the ${baseline} baseline`);
      }

      // The Custom reveal carries the FORM genus (F-266e): the date
      // inputs' computed fill reads the dark stone-900 form family
      // (the fresh-visitor dark posture), not the transparent
      // search-box genus they rode before the unification.
      await page.locator("#expense-range-filter").click();
      await page.getByRole("option", { name: "Custom range" }).click();
      const startInput = page.getByLabel("Start date", { exact: true });
      await expectVisible(startInput);
      const fill = await startInput.evaluate((el) => getComputedStyle(el).backgroundColor);
      if (fill !== "rgb(28, 25, 23)") {
        throw new Error(`248: the Start date input's fill is ${fill}, not the form genus's dark stone-900 rgb(28, 25, 23)`);
      }

      // The Escape STACK (F-266d): the Add Expense dialog over the open
      // card takes ONE Escape; the card survives it; the second closes
      // the card.
      await page.getByRole("button", { name: "Add Expense" }).first().click();
      const dialog = page.getByRole("dialog");
      await expectVisible(dialog);
      await page.keyboard.press("Escape");
      await expectCount0(dialog);
      await expectVisible(panel);
      await page.keyboard.press("Escape");
      await expectCount0(panel);

      // Reopen on the All-dates posture for the evidence frame.
      await page.getByRole("button", { name: /^Filters/ }).click();
      await expectVisible(panel);
      await page.locator("#expense-range-filter").click();
      await page.getByRole("option", { name: "All dates" }).click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: `${OUT}/248-session266-all-dates-return-1440.png` });
      commit(
        "248-session266-all-dates-return-1440.png",
        "THE ALL-DATES RETURN AT DESKTOP — the named no-window state, the window pick narrowing, the exact restore, the form-genus custom dates, the Escape stack proven",
      );
      await page.close();
      await ctx.close();
    }

    // ---- 249: THE NO-MATCHES VARIANT AT MOBILE (390×844) (F-266c) -------
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
      const page = await ctx.newPage();
      const vw = await page.evaluate(() => window.innerWidth);
      if (vw !== 390) throw new Error(`249: viewport drift — innerWidth=${vw}`);
      await login(page, BASE);
      await page.goto(`${BASE}/expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);

      const baseline = await listCount(page);
      if (baseline < 5) throw new Error(`249: the seeded ledger looks wrong (${baseline} rows)`);

      // A search-only over-constraint renders the no-matches face —
      // never the onboarding CTA (the honest discriminator).
      await page.getByPlaceholder("Search expenses...").fill("zzz-no-match");
      await expectVisible(page.getByText("No expenses match your filters"));
      const onboarding = await page.getByText("Add Your First Expense").count();
      if (onboarding !== 0) {
        throw new Error("249: the onboarding CTA renders for an over-constrained list — the empty-state split failed");
      }
      await page.screenshot({ path: `${OUT}/249-session266-no-matches-clear-filters-390.png`, fullPage: true });
      commit(
        "249-session266-no-matches-clear-filters-390.png",
        `THE NO-MATCHES VARIANT AT MOBILE — the over-constrained face (${vw}px, full page), Clear Filters standing`,
      );

      // Clear Filters lifts EVERY constraint (the search included).
      await page.getByRole("button", { name: "Clear Filters" }).click();
      await page.waitForTimeout(600);
      const restored = await listCount(page);
      if (restored !== baseline) {
        throw new Error(`249: Clear Filters restored ${restored} rows, not the ${baseline} baseline`);
      }
      await page.close();
      await ctx.close();
    }
  } catch (err) {
    console.error(`[captures-266] ${(err as Error).message}`);
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
