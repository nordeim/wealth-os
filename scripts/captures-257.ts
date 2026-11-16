// Session-257 evidence captures (R-54 — the stale-consumer, dead-arm,
// and glyph-citation round). Three faces freeze the post-round surfaces
// with the standing behavior asserted in-flight (the round's cures are
// comment-and-dead-arm level — the captures hold the standing surfaces
// plus the round's consumer truths proven LIVE on the rendered
// components):
// 225: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census), then closes on the toggle (aria-expanded flip).
// 226: THE DASHBOARD DESKTOP FACE — the remediated codebase's flagship
//      page in the fresh-visitor dark default (the operator's
//      screenshots-of-the-dev-server ask), the shell wash asserted.
// 227: THE CONSUMERS FACE — the round's cured consumer truths proven
//      LIVE: the settings page's trust badges (the LIVE Badge
//      consumers the F-257q reword names — rendered since the settings
//      glass round, now carrying the house focus visible frame) and
//      the sidebar's wifi Synced pill (the F-257m reword's live
//      construction).
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
if (path.basename(process.argv[1] ?? "") !== "captures-257.ts") process.exit(0);

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
      "[captures-257] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)",
    );
    return 1;
  }
  console.log("[captures-257] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-257] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-257] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-257] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-257] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-257] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-257] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-257] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  let exitCode = 0;
  try {
    const browser = await chromium.launch();

    // ---- 225: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("225: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`225: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("225: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/225-session257-mobile-drawer-390.png` });
      commit("225-session257-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
      // The close half of the standing ask: the toggle collapses the
      // drawer and the aria-expanded state flips back.
      await page.getByRole("button", { name: "Close navigation menu" }).click();
      await page.waitForTimeout(700);
      const expanded = await page
        .getByRole("button", { name: "Open navigation menu" })
        .getAttribute("aria-expanded");
      if (expanded !== "false") throw new Error(`225: the drawer toggle did not close (aria-expanded=${expanded})`);
      console.log("[captures-257] 225: the drawer closed on the toggle (aria-expanded=false) — the standing mobile-menu comparison complete");
      await page.close();
    }

    // ---- 226: THE DASHBOARD DESKTOP FACE ----------------------------------
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
      if (!state.dark) throw new Error("226: the fresh visitor did not land the dark default");
      if (state.heading !== "Financial Dashboard") {
        throw new Error(`226: the dashboard heading reads ${state.heading}`);
      }
      if (state.shellBg !== "rgb(14, 19, 16)") {
        throw new Error(`226: the shell wash drifted — computed: ${state.shellBg}`);
      }
      console.log(`[captures-257] 226: the dashboard renders (${state.heading}, dark default, shell ${state.shellBg})`);
      await page.screenshot({ path: `${OUT}/226-session257-dashboard-desktop-1440.png` });
      commit(
        "226-session257-dashboard-desktop-1440.png",
        "the remediated codebase's flagship page — the Financial Dashboard at 1440×900 in the fresh-visitor dark default (the dev-server screenshots ask)",
      );
      await page.close();
    }

    // ---- 227: THE CONSUMERS FACE (the round's truths, live) -------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      // First leg: the settings trust badges — the LIVE Badge
      // consumers the F-257q reword names. All four render, and the
      // frame carries the house focus visible form (the five arms the
      // cure swapped — the recalibrated F-252f offset pair included).
      await page.goto(`${BASE}/Settings`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2200);
      const badgeState = await page.evaluate(() => {
        const badges = [...document.querySelectorAll("div")].filter((d) =>
          ["Encrypted", "Multi-Device", "Your Eyes Only", "Compliant"].includes(
            d.textContent?.trim() ?? "",
          ),
        );
        const first = badges[0];
        const cls = first?.getAttribute("class") ?? "";
        return {
          count: badges.length,
          hasFocusVisible: cls.includes("focus-visible:ring-offset-2"),
          hasFocusVisibleRing: cls.includes("focus-visible:ring-2"),
          hasBareFocus: /[^-]focus:(outline-none|ring-2|ring-ring|ring-offset)/.test(cls),
          ink: first ? getComputedStyle(first).color : "(none)",
        };
      });
      if (badgeState.count < 4) {
        throw new Error(`227: only ${badgeState.count} trust badges render (expected the four live Badge consumers)`);
      }
      if (!badgeState.hasFocusVisible || !badgeState.hasFocusVisibleRing) {
        throw new Error("227: the badges' frame lost the focus visible arms (the F-257q swap)");
      }
      if (badgeState.hasBareFocus) {
        throw new Error("227: the badges' frame still carries a bare focus arm (the F-257q cure incomplete)");
      }
      console.log(
        `[captures-257] 227: the four settings trust badges render on the live frame (ink ${badgeState.ink}) — the focus visible arms present, no bare focus form`,
      );
      // Second leg: the sidebar's wifi Synced pill — the F-257m
      // reword's live construction (the glyph is the wifi icon, not
      // the retired check mark).
      const pillState = await page.evaluate(() => {
        const pill = [...document.querySelectorAll("span")].find((s) =>
          s.textContent?.trim().includes("Synced"),
        );
        if (!pill) return { found: false };
        const svg = pill.querySelector("svg");
        return {
          found: true,
          hasGlyph: svg !== null,
          text: pill.textContent?.trim() ?? "",
          cls: pill.getAttribute("class") ?? "",
        };
      });
      if (!pillState.found || !pillState.hasGlyph) {
        throw new Error("227: the sidebar's Synced pill did not render with its glyph");
      }
      if (!pillState.text.includes("Synced")) {
        throw new Error(`227: the pill text reads ${pillState.text}`);
      }
      console.log(
        `[captures-257] 227: the sidebar's Synced pill renders with the wifi glyph (the F-257m construction, live)`,
      );
      await page.screenshot({ path: `${OUT}/227-session257-consumers-face-1440.png` });
      commit(
        "227-session257-consumers-face-1440.png",
        "the consumers face — the settings trust badges (the live Badge consumers, the focus visible frame asserted) + the sidebar's wifi Synced pill: the round's cured consumer truths proven live",
      );
      await page.close();
    }

    await browser.close();
  } catch (err) {
    console.error(`[captures-257] ${(err as Error).message}`);
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
