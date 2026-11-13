// Session-239 evidence captures (R-36 — the wall-token, recovery-gate,
// and hydration-window round). Four faces freeze the post-round surfaces
// with the R-36 behavior asserted in-DOM:
// 158: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census).
// 159: the desktop user menu open (F-239i) — the Dark-Mode item now
//      exposes its state to the accessibility tree (the sr-only
//      suffix; asserted via the item's accessible name) while the
//      visible label stays the reference's own string.
// 160: the desktop sidebar at a SHORT viewport (1024×600 — F-239j):
//      the nav scrolls internally; the footer (user row + Synced pill)
//      is reachable by scrolling (asserted: the footer's user email
//      scrolls into view — the pre-cure clipped it unreachable inside
//      the h-screen overflow-hidden root).
// 161: the Analytics page at 1440 (F-239c): the date inputs render
//      with their initial range values and the page stays interactive
//      — the suppression attribute is inert when the clocks agree
//      (asserted: both inputs carry yyyy-mm-dd values + the tabs
//      respond to a click).
// The script rides the own-database convention (session 225, R-22,
// F-225e + session 226's F-226g liveness check): db/captures.db
// recreated + seeded per run, the spawned dev server carries
// DATABASE_URL=file:../db/captures.db, the spawn-liveness check
// guards the :3000 race, custom.db is never touched, and a census
// tripwire guards the exit.
import { chromium, type Page } from "@playwright/test";
import { statSync, unlinkSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import * as path from "node:path";
import { join } from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-239.ts") process.exit(0);

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
    unlinkSync(join(process.cwd(), "db", "captures.db"));
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

/** F-225e: the census tripwire — custom.db must MATCH at exit. */
function censusTripwire(): number {
  const censusEnv: NodeJS.ProcessEnv = { ...process.env };
  delete censusEnv.DATABASE_URL; // .env's file:../db/custom.db rides (the F-123a1 guard)
  const census = spawnSync("bun", ["run", "db:census"], {
    cwd: process.cwd(),
    env: censusEnv,
    stdio: "ignore",
  });
  if (census.status !== 0) {
    console.error("[captures-239] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-239] the census tripwire: custom.db MATCH");
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
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(1800);
}

function commit(file: string, note: string, minBytes = 30_000) {
  const bytes = statSync(`${OUT}/${file}`).size;
  if (bytes < minBytes) throw new Error(`${file}: suspiciously small (${bytes}B) — blank?`);
  console.log(`[captures-239] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-239] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-239] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-239] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-239] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-239] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-239] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 158: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("158: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`158: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("158: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/158-session239-mobile-drawer-390.png` });
      commit("158-session239-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
    }

    // ---- 159: the desktop user menu with the Dark-Mode state (F-239i) ---
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      // The avatar trigger opens the user menu.
      await page.getByRole("button", { name: new RegExp(EMAIL) }).click();
      await page.waitForTimeout(700);
      // The state-exposed item: the accessible name carries the
      // suffix (Playwright's name-matching reads the accname tree —
      // the sr-only span's whole point).
      const item = page.getByRole("menuitem", { name: /Dark Mode — currently (on|off)/ });
      if (!(await item.count())) {
        throw new Error("159: the Dark-Mode item does not expose its state (the sr-only suffix missing?)");
      }
      // The suffix stays VISUALLY hidden: textContent always carries
      // it (the DOM text), so the visual check is the span's rendered
      // geometry (the sr-only clip: a 1px box outside the paint).
      const spanBox = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('[role="menuitem"]'));
        const dark = items.find((m) => (m.textContent ?? "").startsWith("Dark Mode"));
        const span = dark?.querySelector("span.sr-only");
        if (!span) return null;
        const r = span.getBoundingClientRect();
        return { w: r.width, h: r.height };
      });
      if (!spanBox) throw new Error("159: the sr-only span not found inside the theme item");
      if (spanBox.w > 2 || spanBox.h > 2) {
        throw new Error(`159: the state suffix renders visually (${spanBox.w}×${spanBox.h}px) — it must be screen-reader-only`);
      }
      await page.screenshot({ path: `${OUT}/159-session239-usermenu-darkmode-state.png` });
      commit(
        "159-session239-usermenu-darkmode-state.png",
        `the desktop user menu open — the theme item's accessible name carries the state (F-239i, asserted: the accname match + the suffix span clipped to ${spanBox.w}×${spanBox.h}px) while the visible label stays the reference's own string`,
      );
    }

    // ---- 160: the short-viewport sidebar scroll (F-239j) -----------------
    {
      const page = await browser.newPage({ viewport: { width: 1024, height: 600 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      // The footer's user email must be SCROLLABLE into view — the
      // pre-cure nav had no overflow and the footer sat clipped
      // inside the h-screen overflow-hidden root (unreachable).
      const emailLine = page.locator("aside").getByText(EMAIL);
      if (!(await emailLine.count())) throw new Error("160: the sidebar footer email line not found");
      await emailLine.scrollIntoViewIfNeeded();
      const visible = await emailLine.isVisible();
      if (!visible) throw new Error("160: the sidebar footer is not scrollable into view (the nav overflow missing?)");
      // The nav element itself carries the overflow pair.
      const navOverflow = await page.evaluate(() => {
        const nav = document.querySelector("aside nav");
        return nav ? getComputedStyle(nav).overflowY : null;
      });
      if (navOverflow !== "auto") {
        throw new Error(`160: the nav's overflow-y computes ${navOverflow} (expected auto)`);
      }
      await emailLine.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.screenshot({ path: `${OUT}/160-session239-sidebar-scroll-1024x600.png` });
      commit(
        "160-session239-sidebar-scroll-1024x600.png",
        "the desktop sidebar at 1024×600 scrolled to the footer — the nav's internal scroll (F-239j, asserted: overflow-y auto + the user email scrolls into view; the pre-cure clipped the footer unreachable)",
      );
    }

    // ---- 161: the Analytics date inputs (F-239c) -------------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Analytics`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2000);
      const values = await page.evaluate(() => {
        const inputs = Array.from(document.querySelectorAll('input[type="date"]'));
        return inputs.map((i) => (i as HTMLInputElement).value);
      });
      if (values.length !== 2) throw new Error(`161: expected 2 date inputs, found ${values.length}`);
      for (const v of values) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) {
          throw new Error(`161: a date input carries a non-date value (${JSON.stringify(v)}) — the initial range broke?`);
        }
      }
      // The page stays interactive: the tab family responds (the
      // suppression attribute must never break the control surface).
      await page.getByRole("tab", { name: "Expenses" }).click();
      await page.waitForTimeout(600);
      const activeTab = await page.evaluate(() => {
        const t = document.querySelector('[role="tab"][data-state="active"]');
        return t ? t.textContent : null;
      });
      if (activeTab !== "Expenses") {
        throw new Error(`161: the tab family did not respond after the date-input render (active: ${JSON.stringify(activeTab)})`);
      }
      await page.screenshot({ path: `${OUT}/161-session239-analytics-date-inputs-1440.png` });
      commit(
        "161-session239-analytics-date-inputs-1440.png",
        `the Analytics header at 1440 — both date inputs carry their initial range (${values[0]} → ${values[1]}) and the tab family responds (F-239c: the hydration suppression is inert when the clocks agree; asserted: values + interactivity)`,
      );
    }

    await browser.close();
    console.log("[captures-239] all four faces verified");
  } finally {
    if (spawned?.pid) {
      try {
        process.kill(-spawned.pid, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
    if (censusTripwire() !== 0) process.exit(1);
  }
}

main().catch((e) => {
  console.error(`[captures-239] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
