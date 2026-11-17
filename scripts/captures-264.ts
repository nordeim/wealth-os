// Session-264 evidence capture (R-61 — the muted-flip, sidebar-figure,
// and fallback-resolution round). One face freezes the round's one
// rendered-surface subject:
// 245: THE SIDEBAR SHORT-VIEWPORT FACE — the F-264b subject mechanism:
//      at 1024×600 (the comment's own example viewport) the nav's
//      content stack (≈730px live-measured) exceeds the h-screen rail,
//      the nav scrolls INTERNALLY, and the footer (the user trigger +
//      the Synced pill) is REACHABLE through that scroll — asserted
//      live: nav scrollHeight > clientHeight before the scroll, the
//      footer's user trigger visible in the viewport after it.
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
if (path.basename(process.argv[1] ?? "") !== "captures-264.ts") process.exit(0);

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
    console.error("[captures-264] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-264] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-264] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-264] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error("[captures-264] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.");
      process.exit(1);
    }
    console.log("[captures-264] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-264] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error("[captures-264] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.");
      process.exit(1);
    }
  }

  const browser = await chromium.launch();
  let exitCode = 0;
  try {
    // ---- 245: THE SIDEBAR SHORT-VIEWPORT FACE (F-264b) ----------------
    {
      // 1024×600 — the comment's own example: the lg rail is exactly the
      // viewport height, and the ≈730px content stack (brand 64 + nav
      // 546 + footer 119) exceeds the 600px rail, so the nav must scroll
      // INTERNALLY with the footer reachable through it.
      const ctx = await browser.newContext({ viewport: { width: 1024, height: 600 } });
      const page = await ctx.newPage();
      await login(page, BASE);
      await page.goto(`${BASE}/dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);

      const before = await page.evaluate(() => {
        const nav = document.querySelector("nav[aria-label='Main navigation']") as HTMLElement | null;
        if (!nav) return null;
        return {
          vw: window.innerWidth,
          vh: window.innerHeight,
          navScrollH: nav.scrollHeight,
          navClientH: nav.clientHeight,
          overflowY: getComputedStyle(nav).overflowY,
        };
      });
      if (!before) throw new Error("245: the desktop nav is absent at 1024×600");
      if (before.vw !== 1024 || before.vh !== 600) {
        throw new Error(`245: viewport drift — ${before.vw}×${before.vh}`);
      }
      if (before.navScrollH <= before.navClientH) {
        throw new Error(`245: the nav does NOT overflow at 1024×600 (scroll ${before.navScrollH} vs client ${before.navClientH}) — the short-viewport mechanism is absent`);
      }

      // Scroll the nav to its bottom, then assert the footer's user
      // trigger is visible within the viewport (reachable through the
      // internal scroll — the overflow pair's whole point).
      const after = await page.evaluate(() => {
        const nav = document.querySelector("nav[aria-label='Main navigation']") as HTMLElement;
        nav.scrollTop = nav.scrollHeight;
        // The footer's USER TRIGGER row (the MenuTrigger carrying the
        // avatar + name + email — the footer's last interactive element;
        // the Sign Out item lives inside its dropdown).
        const aside = document.querySelector("aside");
        const footer = aside?.firstElementChild?.lastElementChild ?? null;
        const trigger = footer?.querySelector("button") as HTMLElement | null;
        if (!trigger) return { found: false, triggerTop: 0, triggerBottom: 0, vh: 0 };
        const r = trigger.getBoundingClientRect();
        return { found: true, triggerTop: Math.round(r.top), triggerBottom: Math.round(r.bottom), vh: window.innerHeight };
      });
      if (!after.found) throw new Error("245: the user trigger row is absent from the sidebar footer");
      if (after.triggerBottom <= 0 || after.triggerTop >= after.vh) {
        throw new Error(`245: the footer trigger is NOT reachable in the viewport after the scroll (top ${after.triggerTop}, bottom ${after.triggerBottom}, vh ${after.vh})`);
      }

      await page.waitForTimeout(400);
      await page.screenshot({ path: `${OUT}/245-session264-sidebar-short-viewport.png` });
      commit(
        "245-session264-sidebar-short-viewport.png",
        `THE SIDEBAR SHORT-VIEWPORT FACE at 1024×600 — the nav overflows internally (scroll ${before.navScrollH} > client ${before.navClientH}), scrolled to bottom, the footer's user trigger row reachable in-viewport (${after.triggerTop}..${after.triggerBottom} within ${after.vh})`,
      );
      await page.close();
      await ctx.close();
    }
  } catch (err) {
    console.error(`[captures-264] ${(err as Error).message}`);
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
