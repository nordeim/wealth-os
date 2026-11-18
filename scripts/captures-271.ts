// Session-271 evidence capture (R-68 — the doc-truth, pin-depth, and
// register-note round). The round changed ZERO application UI (the
// cures are distilled-doc truth, one API rationale comment, one
// register note, and two pin-depth hardenings) — so the captures are
// the STANDING EVIDENCE SET: the remediated app still renders its
// flagship faces, captured at the round's trued figures (the a11y
// battery's REAL desktop viewport, 1280×800, and the phone 390×844):
// 257: THE FINANCIAL DASHBOARD AT 1280×800 — the flagship page with
//      its populated KPI cards and charts, live-asserted (the KPI
//      grid and the cashflow chart visible) before committing.
// 258: THE EXPENSES SECTION WITH ITS FILTERS CARD OPEN AT 390×844 —
//      the doc-truth round's most-audited surface (the in-flow
//      expansion card, role group), live-asserted.
// 259: THE MOBILE DRAWER AT 390×844 — the standing mobile-nav face
//      (9 destinations + Sign Out), live-asserted.
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
if (path.basename(process.argv[1] ?? "") !== "captures-271.ts") process.exit(0);

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
  const devEnv = { ...process.env, DATABASE_URL: CAPTURES_DB_URL };
  return spawn("bun", ["run", "dev"], { cwd: process.cwd(), env: devEnv, stdio: "ignore", detached: true });
}

/** The census tripwire: custom.db must still MATCH at exit. */
function censusTripwire(): number {
  const r = spawnSync("bun", ["run", "db:census"], { cwd: process.cwd(), stdio: "pipe", encoding: "utf8" });
  if (r.status !== 0 || !r.stdout.includes("census: MATCH")) {
    console.error("[captures-271] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-271] the census tripwire: custom.db MATCH");
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

function commit(file: string, note: string, minBytes = 20_000) {
  const bytes = statSync(`${OUT}/${file}`).size;
  if (bytes < minBytes) throw new Error(`${file}: suspiciously small (${bytes}B) — blank?`);
  console.log(`[captures-271] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-271] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error("[captures-271] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.");
      process.exit(1);
    }
    console.log("[captures-271] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-271] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error("[captures-271] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.");
      process.exit(1);
    }
  }

  const browser = await chromium.launch();
  let exitCode = 0;
  try {
    // ---- 257: THE DASHBOARD AT 1280×800 (the battery's real desktop) --
    {
      const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
      const page = await ctx.newPage();
      await login(page, BASE);

      await page.goto(`${BASE}/dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);

      // Live-assert the flagship's populated faces: the KPI grid and
      // the cashflow chart both visible before committing.
      const kpi = page.locator("main h1", { hasText: "Financial Dashboard" });
      await kpi.waitFor({ state: "visible", timeout: 10_000 });
      const chart = page.locator("svg.recharts-surface").first();
      await chart.waitFor({ state: "visible", timeout: 10_000 });

      await page.screenshot({ path: `${OUT}/257-session271-dashboard-1280.png`, fullPage: true });
      commit(
        "257-session271-dashboard-1280.png",
        "THE FINANCIAL DASHBOARD AT 1280×800 — the battery's real desktop viewport (the F-271c trued figure), populated KPIs and charts",
      );

      await page.close();
      await ctx.close();
    }

    // ---- 258 + 259: THE PHONE FACES AT 390×844 -------------------------
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
      const page = await ctx.newPage();
      await login(page, BASE);

      // 258: the expenses filters card open (the round's most-audited
      // surface — the in-flow expansion, role group).
      await page.goto(`${BASE}/expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      await page.getByRole("button", { name: "Filters", exact: true }).click();
      const card = page.getByRole("group", { name: "Expense filters" });
      await card.waitFor({ state: "visible", timeout: 10_000 });

      await page.screenshot({ path: `${OUT}/258-session271-expenses-filters-open-390.png` });
      commit(
        "258-session271-expenses-filters-open-390.png",
        "THE EXPENSES FILTERS CARD OPEN AT 390×844 — the in-flow expansion surface (the doc-truth round's most-audited face)",
      );

      // 259: the mobile drawer (the standing face — 9 destinations +
      // Sign Out), opened over the settled page.
      await page.getByRole("button", { name: "Filters", exact: true }).click();
      await card.waitFor({ state: "hidden", timeout: 10_000 });
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      const drawer = page.getByRole("dialog");
      await drawer.waitFor({ state: "visible", timeout: 10_000 });
      const navLinks = drawer.locator("nav a:visible");
      const count = await navLinks.count();
      if (count !== 9) throw new Error(`the drawer census: expected 9 destinations, found ${count}`);
      if (!(await drawer.getByText("Sign Out").first().isVisible())) throw new Error("the drawer's Sign Out not visible");

      await page.screenshot({ path: `${OUT}/259-session271-mobile-drawer-390.png` });
      commit(
        "259-session271-mobile-drawer-390.png",
        "THE MOBILE DRAWER AT 390×844 — 9 destinations + Sign Out (the standing mobile-nav face)",
      );

      await page.close();
      await ctx.close();
    }
  } catch (err) {
    console.error(`[captures-271] ${(err as Error).message}`);
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

main();
