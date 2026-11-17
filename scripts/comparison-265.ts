// Session-264 evidence: the mobile-nav comparison, CLONE side, at TRUE
// 390×844 — the standing operator ask. Per the session-253 toolchain note,
// agent-browser's bundled HeadlessChrome does not hydrate the Turbopack
// dev build, so the clone-side comparison rides the PRODUCTION artifact
// (already built by the session's gate) on a SCRATCH database
// (db/comparison.db — the own-database convention, F-225e), booted in a
// SINGLE invocation (the session-98 server-death lesson: the standalone
// server dies when its parent shell exits).
//
// The standing census, asserted in-flight:
//   - before open: zero visible nav links at 390
//   - the labeled hamburger (aria-label "Open navigation menu") opens the
//     drawer: 9 destination links + Sign Out visible
//   - the aria-expanded flip verified on open AND close
//   - after close: zero visible nav links
//   - the capture saved at the standing name (mobile-nav-clone-390.png)
import { chromium } from "@playwright/test";
import { unlinkSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import * as path from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "comparison-265.ts") process.exit(0);

const PORT = "3220";
const BASE = `http://localhost:${PORT}`;
const OUT = "docs/screenshots/mobile-nav-clone-390.png";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";
const COMPARISON_DB_URL = "file:../db/comparison.db";

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

/** F-225e: recreate + seed db/comparison.db (deterministic per run). */
function seedComparisonDb() {
  try {
    unlinkSync(path.join(process.cwd(), "db", "comparison.db"));
  } catch {
    /* absent — a fresh run */
  }
  for (const cmd of [["run", "db:push"], ["run", "db:seed"]] as const) {
    const r = spawnSync("bun", [...cmd], {
      cwd: process.cwd(),
      env: { ...process.env, DATABASE_URL: COMPARISON_DB_URL },
      stdio: "ignore",
    });
    if (r.status !== 0) {
      throw new Error(`the comparison db: bun ${cmd.join(" ")} failed (${r.status})`);
    }
  }
}

/** Boot the PRODUCTION standalone artifact on the scratch db, single invocation. */
function bootArtifact() {
  const env: NodeJS.ProcessEnv = {
    ...process.env,
    DATABASE_URL: COMPARISON_DB_URL,
    // F-265a: TRUTHY fallback — bun loads .env's AUTH_SECRET="" into
    // process.env as the EMPTY STRING, and the ?? form passes "" through
    // (nullish-coalescing only replaces null/undefined), so the production
    // boot-gate refused to serve and every request answered a bare 500
    // (live-reproduced: the instrumentation hook's AUTH_SECRET refusal).
    AUTH_SECRET: process.env.AUTH_SECRET || "comparison-secret-0123456789ab",
    PORT,
    NODE_ENV: "production",
  };
  delete env.NEXT_PUBLIC_SITE_URL; // dev default is fine; metadata is not the face under test
  return spawn("bun", [".next/standalone/server.js"], {
    cwd: process.cwd(),
    env,
    stdio: "ignore",
    detached: true,
  });
}

async function waitOnUrl(url: string, ms: number): Promise<boolean> {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

async function main(): Promise<number> {
  seedComparisonDb();
  const server = bootArtifact();
  let exit = 1;
  const browser = await chromium.launch();
  try {
    if (!(await waitOnUrl(`${BASE}/api/health`, 30_000))) {
      throw new Error("the standalone artifact never came up on :" + PORT);
    }
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    const trueViewport = await page.evaluate(() => window.innerWidth);
    if (trueViewport !== 390) throw new Error(`viewport drift: innerWidth=${trueViewport}`);

    // Login (the demo credentials, against the scratch db's seeded demo user).
    await page.goto(`${BASE}/login`);
    await page.getByLabel("Email", { exact: true }).fill(EMAIL);
    await page.getByLabel("Password", { exact: true }).fill(PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.waitForURL(/dashboard|\/$/, { timeout: 20_000 });
    await page.waitForLoadState("networkidle");
    console.log(`[comparison-265] post-login URL: ${page.url()}`);
    const hamburger = await page
      .getByRole("button", { name: "Open navigation menu" })
      .isVisible({ timeout: 5_000 })
      .catch(() => false);
    if (!hamburger) {
      await page.screenshot({ path: "/tmp/comparison-debug.png" });
      const html = await page.content();
      console.log(
        `[comparison-265] DEBUG: hamburger absent; title=${await page.title()}; body-head=${html.slice(0, 400)}`,
      );
      throw new Error("the labeled hamburger is not visible at 390 after login");
    }

    // Pre-open census: zero visible nav links at 390.
    const before = await page.evaluate(
      () => Array.from(document.querySelectorAll("nav a")).filter((a) => (a as HTMLElement).offsetParent !== null).length,
    );
    if (before !== 0) throw new Error(`pre-open census expected 0 visible links, saw ${before}`);

    // Open via the labeled hamburger (OUR superset: the accessible name).
    // The button's aria-label FLIPS on open, so address it by the stable
    // aria-expanded carrier (the label census asserts the flip instead).
    const toggle = page.locator("header button[aria-expanded]");
    const openLabel = await toggle.getAttribute("aria-label");
    if (openLabel !== "Open navigation menu") {
      throw new Error(`pre-open hamburger label = ${openLabel}`);
    }
    await toggle.click();
    await page.waitForSelector("#mobile-nav-drawer", { state: "visible" });
    const openState = await toggle.getAttribute("aria-expanded");
    const links = await page.evaluate(() =>
      Array.from(document.querySelectorAll("nav a"))
        .filter((a) => (a as HTMLElement).offsetParent !== null)
        .map((a) => (a.textContent ?? "").trim()),
    );
    const signOut = await page.getByRole("button", { name: "Sign Out" }).isVisible();
    const expected = [...DESTINATIONS];
    if (JSON.stringify(links) !== JSON.stringify(expected)) {
      throw new Error(`destination census mismatch: ${JSON.stringify(links)}`);
    }
    if (!signOut) throw new Error("Sign Out not visible in the open drawer");
    if (openState !== "true") throw new Error(`aria-expanded on open = ${openState}, expected true`);

    // Capture the open drawer at the standing name.
    await page.screenshot({ path: OUT });

    // Close via the SAME toggle — now labeled "Close navigation menu".
    const closeLabel = await toggle.getAttribute("aria-label");
    if (closeLabel !== "Close navigation menu") {
      throw new Error(`open-drawer hamburger label = ${closeLabel}`);
    }
    await toggle.click();
    await page.waitForSelector("#mobile-nav-drawer", { state: "hidden" });
    const closeState = await toggle.getAttribute("aria-expanded");
    const after = await page.evaluate(
      () => Array.from(document.querySelectorAll("nav a")).filter((a) => (a as HTMLElement).offsetParent !== null).length,
    );
    if (closeState !== "false") throw new Error(`aria-expanded on close = ${closeState}, expected false`);
    if (after !== 0) throw new Error(`post-close census expected 0 visible links, saw ${after}`);

    console.log(
      `[comparison-265] clone side VERIFIED at TRUE ${trueViewport}x844: pre-open 0 · open 9 destinations + Sign Out · aria-expanded true→false · post-close 0 · capture ${OUT}`,
    );
    exit = 0;
  } finally {
    await browser.close().catch(() => undefined);
    if (server.pid) {
      try {
        process.kill(-server.pid, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
    // The census tripwire (F-225e): custom.db must still MATCH its contract.
    const r = spawnSync("bun", ["run", "db:census"], { cwd: process.cwd(), stdio: "pipe", encoding: "utf8" });
    const out = `${r.stdout ?? ""}${r.stderr ?? ""}`;
    console.log(out.includes("census: MATCH") ? "[comparison-265] census tripwire: custom.db MATCH" : `[comparison-265] census tripwire FAILED:\n${out}`);
  }
  return exit;
}

process.exit(await main());
