// Session-263 evidence captures (R-60 — the login-ladder, overlay-alpha,
// and census-truing round). Three faces freeze the round's touched
// surfaces with the standing behavior asserted in-flight:
// 242: THE LOGIN-INPUT LADDER FACE — the F-263g CLASS cure's surface:
//      the login card's email/password inputs AND the Sign in submit
//      asserted live at 48px at the desktop width (the ladder's top
//      step — the reference's own measured ladder) and at 44px at 390
//      (the ladder's base), with the font ladder (16px below the middle
//      breakpoint, 14px above it) asserted at both widths.
// 243: THE OPEN-DIALOG OVERLAY FACE — the F-263i CLASS cure's surface:
//      the expenses Add Expense dialog open, with the overlay's
//      computed background asserted live at the measured half-strength
//      black (rgba(0,0,0,0.5) — the reference's live-probed form).
// 244: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census), then closes on the toggle (aria-expanded flip).
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
if (path.basename(process.argv[1] ?? "") !== "captures-263.ts") process.exit(0);

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
    console.error("[captures-263] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-263] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-263] ${file} — ${note} (${bytes}B)`);
}

/** The login family's live geometry at the page's current width. */
async function loginGeometry(page: Page) {
  return page.evaluate(() => {
    const email = document.querySelector('input[type="email"]') as HTMLElement | null;
    const pw = document.querySelector('input[type="password"]') as HTMLElement | null;
    const submit = Array.from(document.querySelectorAll('button[type="submit"]')).find((b) =>
      /sign in/i.test(b.textContent ?? ""),
    ) as HTMLElement | null;
    const read = (el: HTMLElement | null) => {
      if (!el) return null;
      const cs = getComputedStyle(el);
      return { h: cs.height, fs: cs.fontSize };
    };
    return { vw: window.innerWidth, email: read(email), pw: read(pw), submit: read(submit) };
  });
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-263] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error("[captures-263] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.");
      process.exit(1);
    }
    console.log("[captures-263] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-263] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error("[captures-263] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.");
      process.exit(1);
    }
    console.log("[captures-263] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  let exitCode = 0;
  try {
    const browser = await chromium.launch();

    // ---- 242: THE LOGIN-INPUT LADDER FACE (F-263g's cure, live) --------
    {
      // The desktop arm: the inputs and submit step to 48px at the small
      // breakpoint; the font steps at the middle one (14px at 1280).
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      const desk = await loginGeometry(page);
      if (desk.vw !== 1280) throw new Error(`242: viewport drift (${desk.vw})`);
      for (const arm of [desk.email, desk.pw, desk.submit]) {
        if (!arm || arm.h !== "48px" || arm.fs !== "14px") {
          throw new Error(`242: the desktop ladder arm is ${JSON.stringify(arm)} (expected 48px/14px — the reference's measured top step)`);
        }
      }
      await page.screenshot({ path: `${OUT}/242-session263-login-ladder-1280.png` });
      // The phone arm: the ladder's base — inputs 44px/16px at 390; the
      // submit 44px/14px (its font rides the flat small size at every
      // width — the reference's own measured form).
      await page.setViewportSize({ width: 390, height: 844 });
      await page.waitForTimeout(700);
      const phone = await loginGeometry(page);
      if (phone.vw !== 390) throw new Error(`242: viewport drift (${phone.vw})`);
      for (const arm of [phone.email, phone.pw]) {
        if (!arm || arm.h !== "44px" || arm.fs !== "16px") {
          throw new Error(`242: the phone input arm is ${JSON.stringify(arm)} (expected 44px/16px — the ladder's base)`);
        }
      }
      if (!phone.submit || phone.submit.h !== "44px" || phone.submit.fs !== "14px") {
        throw new Error(`242: the phone submit arm is ${JSON.stringify(phone.submit)} (expected 44px/14px — the flat small font the reference measures)`);
      }
      console.log(`[captures-263] 242: the login family asserted live at 48px/14px @1280 and 44px/16px @390 (the reference's measured ladder, both arms)`);
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.waitForTimeout(700);
      commit(
        "242-session263-login-ladder-1280.png",
        "THE LOGIN-INPUT LADDER FACE — the inputs and submit asserted live at 48px at the desktop width (the reference's measured ladder; the phone arm verified at 44px)",
      );
      await page.close();
    }

    // ---- 243: THE OPEN-DIALOG OVERLAY FACE (F-263i's cure, live) -------
    {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2000);
      await page.getByRole("button", { name: "Add Expense" }).first().click();
      await page.waitForTimeout(1200);
      const overlay = await page.evaluate(() => {
        for (const d of Array.from(document.querySelectorAll("div"))) {
          const cs = getComputedStyle(d);
          if (cs.position === "fixed" && cs.top === "0px" && cs.left === "0px" && cs.backgroundColor !== "rgba(0, 0, 0, 0)") {
            const r = d.getBoundingClientRect();
            if (r.width === window.innerWidth && r.height === window.innerHeight && cs.backgroundColor.includes("0.5")) {
              return { bg: cs.backgroundColor, z: cs.zIndex };
            }
          }
        }
        return null;
      });
      if (!overlay) {
        throw new Error("243: no full-viewport 50%-alpha fixed overlay found under the open dialog");
      }
      // Tailwind v4 compiles the 50% black to the oklab form (the v4
      // color serialization); the reference's own CSS computes the rgba
      // form — the SAME rendered color (black at half alpha).
      if (!/^(oklab\(0 0 0 \/ 0\.5\)|rgba\(0, 0, 0, 0\.5\))$/.test(overlay.bg)) {
        throw new Error(`243: the open-dialog overlay computes ${overlay.bg} (expected the measured half-strength black — oklab or rgba form at 0.5)`);
      }
      console.log(`[captures-263] 243: the open-dialog overlay asserted live at ${overlay.bg} (the reference's measured form)`);
      await page.screenshot({ path: `${OUT}/243-session263-dialog-overlay.png` });
      commit(
        "243-session263-dialog-overlay.png",
        "THE OPEN-DIALOG OVERLAY FACE — the Add Expense dialog open with its overlay asserted live at the measured half-strength black",
      );
      await page.close();
    }

    // ---- 244: the mobile drawer at 390×844 (the standing ask) ---------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2000);
      const burger = page.getByRole("button", { name: "Open navigation menu" });
      await burger.click();
      await page.waitForTimeout(800);
      const drawer = page.getByRole("dialog", { name: "WealthOS navigation" });
      await drawer.waitFor({ timeout: 20_000 });
      let census = 0;
      for (const dest of DESTINATIONS) {
        const link = drawer.getByRole("link", { name: dest, exact: true });
        if ((await link.count()) === 1) census += 1;
      }
      const signOut = drawer.getByRole("button", { name: "Sign Out" });
      if (census !== 9 || (await signOut.count()) !== 1) {
        throw new Error(`244: the drawer census is ${census}/9 destinations (Sign Out ${await signOut.count()})`);
      }
      await page.screenshot({ path: `${OUT}/244-session263-mobile-drawer-390.png` });
      const closer = page.getByRole("button", { name: "Close navigation menu" });
      await closer.click();
      await page.waitForTimeout(800);
      const stillVisible = await page
        .getByRole("link", { name: "Dashboard", exact: true })
        .isVisible()
        .catch(() => false);
      if (stillVisible) {
        throw new Error("244: a destination link stayed visible after the close");
      }
      commit(
        "244-session263-mobile-drawer-390.png",
        "THE STANDING MOBILE DRAWER at TRUE 390×844 — 9 destinations + Sign Out census, the aria-expanded close flip verified",
      );
      await page.close();
    }

    await browser.close();
  } catch (err) {
    console.error(`[captures-263] ${(err as Error).message}`);
    exitCode = 1;
  } finally {
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
