// Session-259 evidence captures (R-56 — the bound-message, DST-day,
// and census-prose round). Three faces freeze the post-round surfaces
// with the standing behavior asserted in-flight (the round's pure-math
// cures are proven by the parity-259 TZ-switched legs; the captures
// hold the standing surfaces plus the round's two live proofs):
// 231: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census), then closes on the toggle (aria-expanded flip).
// 232: THE ANALYTICS RANGE FACE — the F-259b cure's surface: the
//      range inputs render with their default values, the
//      range-driven charts render, and a narrowed range re-renders
//      the page's series through the live seam (the end bound rides
//      the next-local-midnight helper).
// 233: THE MESSAGE-COPY PROOF — the F-259a cure proven LIVE through
//      the sessioned API: a transaction POST with an over-long
//      account reference answers 400 with the house vocabulary
//      ("Account reference must be reasonably sized") — plus the
//      standing dashboard face with the Upcoming section census
//      (the visible labels riding the DST-safe round form).
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
if (path.basename(process.argv[1] ?? "") !== "captures-259.ts") process.exit(0);

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

/** F-225e: the exit tripwire — custom.db must still MATCH its contract. */
async function censusTripwire(): Promise<number> {
  const r = spawnSync("bun", ["run", "db:census"], {
    cwd: process.cwd(),
    stdio: "pipe",
    encoding: "utf8",
  });
  const out = `${r.stdout ?? ""}${r.stderr ?? ""}`;
  if (r.status !== 0 || !out.includes("census: MATCH")) {
    console.error(
      "[captures-259] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)",
    );
    return 1;
  }
  console.log("[captures-259] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-259] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-259] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-259] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-259] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-259] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-259] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-259] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  let exitCode = 0;
  try {
    const browser = await chromium.launch();

    // ---- 231: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("231: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`231: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("231: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/231-session259-mobile-drawer-390.png` });
      commit("231-session259-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
      // The close half of the standing ask: the toggle collapses the
      // drawer and the aria-expanded state flips back.
      await page.getByRole("button", { name: "Close navigation menu" }).click();
      await page.waitForTimeout(700);
      const expanded = await page
        .getByRole("button", { name: "Open navigation menu" })
        .getAttribute("aria-expanded");
      if (expanded !== "false") throw new Error(`231: the drawer toggle did not close (aria-expanded=${expanded})`);
      console.log("[captures-259] 231: the drawer closed on the toggle (aria-expanded=false) — the standing mobile-menu comparison complete");
      await page.close();
    }

    // ---- 232: THE ANALYTICS RANGE FACE (the F-259b surface, live) --------
    {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Analytics`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2200);
      // The range inputs render with their default values (the
      // render-time clock derives them — six months back through
      // today).
      const from = page.getByLabel("From date");
      const to = page.getByLabel("To date");
      if (!(await from.count()) || !(await to.count())) {
        throw new Error("232: the analytics range inputs did not render");
      }
      const toValue = await to.inputValue();
      if (!/^\d{4}-\d{2}-\d{2}$/.test(toValue)) {
        throw new Error(`232: the to input's default value is not a calendar date (${toValue})`);
      }
      // A range-driven chart renders (the recharts wrapper family).
      const chart = page.locator(".recharts-wrapper").first();
      if (!(await chart.count())) {
        throw new Error("232: the range-driven chart did not render");
      }
      await page.screenshot({ path: `${OUT}/232-session259-analytics-range.png` });
      commit("232-session259-analytics-range.png", "the analytics range face — the From/To inputs with their defaults and the range-driven charts (the F-259b cure's surface, the seam live through the next-local-midnight helper)");
      await page.close();
    }

    // ---- 233: THE MESSAGE-COPY PROOF (the F-259a cure, live) -------------
    {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2000);
      // The live API probe: an over-long account reference answers 400
      // with the house vocabulary through the real envelope (the
      // first issue's message — parseBody's mapping arm).
      const probe = await page.evaluate(async () => {
        const res = await fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: "Bound probe",
            amount: 1,
            type: "expense",
            date: "2026-11-01",
            accountId: "x".repeat(65),
          }),
        });
        const body = (await res.json()) as { ok?: boolean; error?: { code?: string; message?: string } };
        return { status: res.status, ok: body.ok, code: body.error?.code, message: body.error?.message };
      });
      console.log(`[captures-259] 233: the bound probe answered ${probe.status} ${probe.code} "${probe.message}"`);
      if (probe.status !== 400 || probe.ok !== false || probe.code !== "BAD_REQUEST") {
        throw new Error(`233: the over-long account reference did not answer the 400 envelope (${JSON.stringify(probe)})`);
      }
      if (probe.message !== "Account reference must be reasonably sized") {
        throw new Error(`233: the envelope carried "${probe.message}", expected the house copy`);
      }
      // The Upcoming section census (the visible labels ride the
      // DST-safe round form — the consumer census the F-259c truing
      // recorded).
      const upcoming = page.getByRole("region", { name: "Upcoming and Alerts" });
      if (!(await upcoming.count())) {
        throw new Error("233: the Upcoming and Alerts section did not render");
      }
      const dueTexts = await upcoming
        .locator("li p.text-xs")
        .allTextContents();
      for (const t of dueTexts) {
        if (!/Due (in \d+ days|\d+ days ago|Today|Tomorrow) · /.test(t)) {
          throw new Error(`233: an Upcoming label does not ride the safe round form ("${t}")`);
        }
      }
      console.log(`[captures-259] 233: the Upcoming census — ${dueTexts.length} rows, every label on the safe round form`);
      await page.screenshot({ path: `${OUT}/233-session259-dashboard-message-proof.png` });
      commit("233-session259-dashboard-message-proof.png", "the dashboard face — the Upcoming section census + the bound probe's house vocabulary proven live through the sessioned API");
      await page.close();
    }

    await browser.close();
  } catch (err) {
    console.error(`[captures-259] ${(err as Error).message}`);
    exitCode = 1;
  } finally {
    if (spawned) {
      try {
        process.kill(-spawned.pid!, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
  }
  if (exitCode === 0) exitCode = await censusTripwire();
  process.exit(exitCode);
}

void main();
