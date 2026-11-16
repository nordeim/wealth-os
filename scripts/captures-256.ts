// Session-256 evidence captures (R-53 — the token-citation,
// header-block, and prose-truth round). Three faces freeze the
// post-round surfaces with the standing behavior asserted in-flight
// (the round's cures are comment-level — the captures hold the
// standing surfaces plus the round's citations proven LIVE on the
// cured components):
// 222: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census), then closes on the toggle (aria-expanded flip).
// 223: THE DASHBOARD DESKTOP FACE — the remediated codebase's flagship
//      page in the fresh-visitor dark default (the operator's
//      screenshots-of-the-dev-server ask), the shell wash asserted.
// 224: THE PRIMITIVES FACE — the round's reworded citations proven
//      LIVE on the cured components: the Expenses segmented tabs'
//      inactive ink (the stone pair the F-256b reword names) and the
//      AI-coach dialog's title + description inks (the explicit stone
//      pair and the muted-ink pair the F-256c reword names) — the
//      computed values must equal the cited tokens exactly.
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
if (path.basename(process.argv[1] ?? "") !== "captures-256.ts") process.exit(0);

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
      "[captures-256] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)",
    );
    return 1;
  }
  console.log("[captures-256] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-256] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-256] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-256] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-256] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-256] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-256] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-256] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  let exitCode = 0;
  try {
    const browser = await chromium.launch();

    // ---- 222: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("222: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`222: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("222: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/222-session256-mobile-drawer-390.png` });
      commit("222-session256-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
      // The close half of the standing ask: the toggle collapses the
      // drawer and the aria-expanded state flips back.
      await page.getByRole("button", { name: "Close navigation menu" }).click();
      await page.waitForTimeout(700);
      const expanded = await page
        .getByRole("button", { name: "Open navigation menu" })
        .getAttribute("aria-expanded");
      if (expanded !== "false") throw new Error(`222: the drawer toggle did not close (aria-expanded=${expanded})`);
      console.log("[captures-256] 222: the drawer closed on the toggle (aria-expanded=false) — the standing mobile-menu comparison complete");
      await page.close();
    }

    // ---- 223: THE DASHBOARD DESKTOP FACE ----------------------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2200);
      // The remediated codebase's flagship page: the KPI cards +
      // charts render in the fresh-visitor dark default, the shell
      // wash carries the token flip, and the heading stands.
      const state = await page.evaluate(() => {
        const heading = document.querySelector("h1");
        const shell = document.querySelector(".page-wash");
        return {
          heading: heading?.textContent ?? "(none)",
          dark: document.documentElement.classList.contains("dark"),
          shellBg: shell ? getComputedStyle(shell).backgroundColor : "(no shell)",
        };
      });
      if (!state.dark) throw new Error("223: the fresh visitor did not land the dark default");
      if (state.heading !== "Financial Dashboard") {
        throw new Error(`223: the dashboard heading reads ${state.heading}`);
      }
      if (state.shellBg !== "rgb(14, 19, 16)") {
        throw new Error(`223: the shell wash drifted — computed: ${state.shellBg}`);
      }
      console.log(`[captures-256] 223: the dashboard renders (${state.heading}, dark default, shell ${state.shellBg})`);
      await page.screenshot({ path: `${OUT}/223-session256-dashboard-desktop-1440.png` });
      commit(
        "223-session256-dashboard-desktop-1440.png",
        "the remediated codebase's flagship page — the Financial Dashboard at 1440×900 in the fresh-visitor dark default (the dev-server screenshots ask)",
      );
      await page.close();
    }

    // ---- 224: THE PRIMITIVES FACE (the round's citations, live) ---------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      // First leg: the Expenses segmented tabs — the F-256b reword's
      // track ink, computed. The INACTIVE trigger inherits the dark
      // stone-300 pair the reword names.
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const tabInk = await page.evaluate(() => {
        const tabs = [...document.querySelectorAll('[role="tab"]')];
        const needs = tabs.find((t) => t.textContent?.trim() === "Needs");
        return needs ? getComputedStyle(needs).color : "(no tab)";
      });
      if (tabInk !== "rgb(214, 211, 209)") {
        throw new Error(`224: the Expenses inactive tab ink computed ${tabInk} (expected the dark stone-300 pair rgb(214, 211, 209) the F-256b reword names)`);
      }
      console.log("[captures-256] 224: the Expenses segmented inactive ink computes rgb(214, 211, 209) — the stone pair the Tabs reword cites, live");
      // Second leg: the AI-coach dialog — the F-256c reword's title
      // and description inks, computed. The dialog is the live
      // DialogTitle/DialogDescription consumer.
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      await page.getByRole("button", { name: "AI Coach" }).first().click();
      await page.waitForTimeout(900);
      const inks = await page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"]');
        const title = dlg?.querySelector("h2");
        const desc = dlg?.querySelector('[id^="radix-description"], .sr-only');
        return {
          title: title ? getComputedStyle(title).color : "(no title)",
          desc: desc ? getComputedStyle(desc).color : "(no desc)",
          heading: title?.textContent ?? "(none)",
        };
      });
      if (inks.heading !== "AI Financial Coach") {
        throw new Error(`224: the coach dialog heading reads ${inks.heading}`);
      }
      if (inks.title !== "rgb(245, 245, 244)") {
        throw new Error(`224: the coach title ink computed ${inks.title} (expected the dark stone-100 pair rgb(245, 245, 244) the F-256c reword names)`);
      }
      if (inks.desc !== "rgb(168, 162, 158)") {
        throw new Error(`224: the coach description ink computed ${inks.desc} (expected the dark muted-ink pair rgb(168, 162, 158) the F-256c reword names)`);
      }
      console.log(`[captures-256] 224: the coach dialog inks compute title ${inks.title} / description ${inks.desc} — the reworded citations live`);
      await page.screenshot({ path: `${OUT}/224-session256-primitives-face-1440.png` });
      commit(
        "224-session256-primitives-face-1440.png",
        "the primitives face — the AI-coach dialog open with the Expenses segmented tabs asserted on the way: the reworded token citations compute exactly (the F-256b/c cures, live)",
      );
      await page.close();
    }

    await browser.close();
  } catch (err) {
    console.error(`[captures-256] ${(err as Error).message}`);
    exitCode = 1;
  } finally {
    if (spawned) {
      try {
        process.kill(-spawned.pid!, "SIGTERM");
      } catch {
        try {
          spawned.kill("SIGTERM");
        } catch {
          /* already gone */
        }
      }
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  if ((await censusTripwire()) !== 0) exitCode = 1;
  process.exit(exitCode);
}

void main();
