// Session-270 evidence capture (R-67 — the liveness-fabrication,
// stacked-escape, and comment-truth round). Two faces freeze the
// round's rendered-surface subject (the stacked-order interleaving
// the F-266d comment once named the standing battery gap):
// 255: THE BOTH-OPEN INTERLEAVING AT 390×844 — the Expenses filters
//      card (the in-flow expansion, role group) open UNDER the mobile
//      drawer (role dialog): the reachable stacked order below lg,
//      live-asserted before committing (both surfaces visible).
// 256: THE POST-FIRST-ESCAPE FACE AT 390×844 — one Escape later: the
//      drawer closed, the card STILL open — one press, one surface
//      (the round's e2e leg, rendered as the standing proof face).
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
if (path.basename(process.argv[1] ?? "") !== "captures-270.ts") process.exit(0);

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
    console.error("[captures-270] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-270] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-270] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-270] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error("[captures-270] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.");
      process.exit(1);
    }
    console.log("[captures-270] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-270] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error("[captures-270] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.");
      process.exit(1);
    }
  }

  const browser = await chromium.launch();
  let exitCode = 0;
  try {
    // ---- 255 + 256: THE STACKED-ORDER FACES AT 390×844 -----------------
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
      const page = await ctx.newPage();
      await login(page, BASE);

      await page.goto(`${BASE}/expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);

      // The filters card opens (the in-flow expansion, the F-265b form).
      await page.getByRole("button", { name: "Filters", exact: true }).click();
      const card = page.getByRole("group", { name: "Expense filters" });
      await card.waitFor({ state: "visible", timeout: 10_000 });

      // The drawer opens OVER the open card — the reachable stacked
      // order below lg (the card is non-modal: the hamburger stays
      // clickable).
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      const drawer = page.getByRole("dialog");
      await drawer.waitFor({ state: "visible", timeout: 10_000 });
      await card.waitFor({ state: "visible", timeout: 10_000 });

      // FACE 255: the both-open interleaving — live-asserted (both
      // surfaces visible) before committing.
      await page.screenshot({ path: `${OUT}/255-session270-stacked-order-both-open-390.png` });
      commit(
        "255-session270-stacked-order-both-open-390.png",
        "THE BOTH-OPEN STACKED ORDER AT 390 — the filters card under the open drawer (the interleaving the F-270c leg pins)",
      );

      // One press: the drawer alone closes (the card's guard stands
      // down for the dialog; the drawer's self-carved census sees no
      // other dialog).
      await page.keyboard.press("Escape");
      await drawer.waitFor({ state: "hidden", timeout: 10_000 });
      await card.waitFor({ state: "visible", timeout: 10_000 });

      // FACE 256: the one-press-one-surface proof — live-asserted.
      await page.screenshot({ path: `${OUT}/256-session270-stacked-order-after-escape-390.png` });
      commit(
        "256-session270-stacked-order-after-escape-390.png",
        "THE POST-FIRST-ESCAPE FACE AT 390 — the drawer closed, the card still open: one press, one surface",
      );

      // The second press closes the card (the round's e2e leg, verified
      // against the dev build too).
      await page.keyboard.press("Escape");
      await card.waitFor({ state: "hidden", timeout: 10_000 });

      await page.close();
      await ctx.close();
    }
  } catch (err) {
    console.error(`[captures-270] ${(err as Error).message}`);
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
