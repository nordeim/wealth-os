// Session-252 evidence captures (R-49 — the list-focus-ring, resend-
// shape, and type-lag round). Five faces freeze the post-round
// surfaces with the R-49 behavior asserted in-flight:
// 207: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census), then closes on the toggle (aria-expanded flip).
// 208: THE LIST-ITEM KEYBOARD-RING FACE (F-252a, the flagship): the
//      Expenses category filter open with an option keyboard-
//      highlighted — the computed box-shadow carries the ring token
//      ink rgb(245,245,244) (the flipped dark token, 18.15:1 on the
//      listbox panel) over the stone-800 wash rgb(41,37,36), the
//      pre-cure wash-only indicator that computed 1.31:1 in the dark
//      default.
// 209: THE RESEND SHAPE FACE (F-252b): the resend route's MISS arm
//      (an unknown email) answers the SAME three-key envelope as the
//      known arm — verificationCode present and null (the pre-cure
//      tree omitted the key, an enumeration signal that survived the
//      production OTP knob).
// 210: THE SCROLLBAR DARK-ARM FACE (F-252e): the main scroller in
//      the fresh-visitor DARK default — the computed scrollbar-color
//      thumb reads the stone-500 family rgb(120,113,108) (3.91:1 on
//      the dark wash), not the light-mode gray-300 the theme-blind
//      utility shipped in both modes.
// 211: THE SHELL WASH FACE (F-252g): the dashboard in the dark
//      default — the shell root's computed background still reads
//      rgb(14,19,16) with the local literal patch retired: the
//      background token's dark flip alone carries the wash.
// The script rides the own-database convention (session 225, R-22,
// F-225e + session 226's F-226g liveness check): db/captures.db
// recreated + seeded per run, the spawned dev server carries
// DATABASE_URL=file:../db/captures.db, custom.db is never touched,
// and a census tripwire guards the exit.
import { chromium, type Locator, type Page } from "@playwright/test";
import { statSync, unlinkSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import * as path from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-252.ts") process.exit(0);

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
    console.error("[captures-252] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-252] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-252] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-252] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-252] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-252] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-252] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-252] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-252] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  let exitCode = 0;
  try {
    const browser = await chromium.launch();

    // ---- 207: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("207: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`207: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("207: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/207-session252-mobile-drawer-390.png` });
      commit("207-session252-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
      // The close half of the standing ask: the toggle collapses the
      // drawer and the aria-expanded state flips back.
      await page.getByRole("button", { name: "Close navigation menu" }).click();
      await page.waitForTimeout(700);
      const expanded = await page
        .getByRole("button", { name: "Open navigation menu" })
        .getAttribute("aria-expanded");
      if (expanded !== "false") throw new Error(`207: the drawer toggle did not close (aria-expanded=${expanded})`);
      console.log("[captures-252] 207: the drawer closed on the toggle (aria-expanded=false) — the standing mobile-menu comparison complete");
      await page.close();
    }

    // ---- 208: THE LIST-ITEM KEYBOARD-RING FACE (F-252a) ------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      await page.getByRole("button", { name: /Filters/ }).click();
      await expectVisible(page, page.getByRole("group", { name: "Expense filters" }));
      await page.locator("#expense-category-filter").click();
      await expectVisible(page, page.getByRole("option").first());
      await page.keyboard.press("ArrowDown");
      const highlighted = page.getByRole("option").nth(1);
      await expectVisible(page, highlighted);
      if (!(await highlighted.evaluate((el) => el === document.activeElement))) {
        throw new Error("208: the highlighted option does not hold DOM focus");
      }
      // The wash animates via the colors utility; give the paint a
      // frame to settle before the computed read (the R-48 lesson).
      await page.waitForTimeout(400);
      const state = await highlighted.evaluate((el) => {
        const cs = getComputedStyle(el);
        return { shadow: cs.boxShadow, wash: cs.backgroundColor };
      });
      if (!state.shadow.includes("245, 245, 244")) {
        throw new Error(`208: the keyboard ring is not the flipped ink token — computed shadow: ${state.shadow}`);
      }
      if (state.wash !== "rgb(41, 37, 36)") {
        throw new Error(`208: the wash beneath the ring is not the dark stone arm — computed: ${state.wash}`);
      }
      await page.screenshot({ path: `${OUT}/208-session252-listitem-keyboard-ring-1440.png` });
      commit(
        "208-session252-listitem-keyboard-ring-1440.png",
        "the Expenses category filter with a keyboard-highlighted option — the computed ring layer rgb(245,245,244) (18.15:1) over the stone-800 wash rgb(41,37,36); the pre-cure wash-only indicator computed 1.31:1 (F-252a, the flagship)",
      );
      await page.close();
    }

    // ---- 209: THE RESEND SHAPE FACE (F-252b) ------------------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1200);
      // The MISS arm (an unknown email): the pre-cure tree answered a
      // TWO-key envelope while the known never-verified arm always
      // carried the third — key-set presence was the enumeration
      // signal. Assert the key EXISTS and is null (the forgot-password
      // always-present-key form). NOTE: the `in` check, never a nullish
      // coalesce — `null ?? fallback` swallows exactly the value the
      // probe exists to observe.
      const shape = await page.evaluate(async () => {
        const r = await fetch("/api/auth/resend", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: "nobody@nowhere.test" }),
        });
        const body = (await r.json()) as {
          ok: boolean;
          data?: Record<string, unknown>;
        };
        const data = body.data ?? {};
        return {
          ok: r.ok,
          keys: Object.keys(data).sort(),
          verificationCode: "verificationCode" in data ? (data["verificationCode"] as unknown) : "MISSING-KEY",
          verificationCodeIsNull: "verificationCode" in data && data["verificationCode"] === null,
        };
      });
      if (!shape.ok) throw new Error(`209: the resend miss arm answered ${JSON.stringify(shape)}`);
      if (!shape.keys.includes("verificationCode")) {
        throw new Error(`209: the miss arm omits the verificationCode key — the shape oracle stands: ${JSON.stringify(shape)}`);
      }
      if (!shape.verificationCodeIsNull) {
        throw new Error(`209: the miss arm's verificationCode is not null: ${JSON.stringify(shape)}`);
      }
      console.log(`[captures-252] 209: the miss arm's envelope is three-key (${shape.keys.join(", ")}) — verificationCode present and null (F-252b proven live)`);
      await page.screenshot({ path: `${OUT}/209-session252-resend-shape-1440.png` });
      commit(
        "209-session252-resend-shape-1440.png",
        "the login face the resend miss-arm probe rode — both arms of the route answer the same three-key envelope (verificationCode: null on the miss arm), the key-set enumeration signal closed (F-252b)",
      );
      await page.close();
    }

    // ---- 210: THE SCROLLBAR DARK-ARM FACE (F-252e) ------------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      // The fresh-visitor DARK default; the main scroller carries the
      // scrollbar-thin utility — its computed thumb color must read the
      // stone-500 family, not the light gray-300 both modes shipped.
      const thumb = await page.evaluate(() => {
        const el = document.querySelector("main");
        if (!el) return "(no main)";
        return getComputedStyle(el).scrollbarColor;
      });
      if (!thumb.startsWith("rgb(120, 113, 108)")) {
        throw new Error(`210: the dark scroller's thumb is not the stone-500 family — computed: ${thumb}`);
      }
      console.log(`[captures-252] 210: the dark scroller's thumb computes ${thumb} (3.91:1 on the dark wash) — the theme-blind genus cured (F-252e)`);
      await page.screenshot({ path: `${OUT}/210-session252-scrollbar-dark-arm-1440.png` });
      commit(
        "210-session252-scrollbar-dark-arm-1440.png",
        "the dark-mode dashboard with its main scroller in view — the computed scrollbar thumb rgb(120,113,108), the .dark arm the scaffold-era utility lacked (F-252e)",
      );
      await page.close();
    }

    // ---- 211: THE SHELL WASH FACE (F-252g) ---------------------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const state = await page.evaluate(() => {
        const html = document.documentElement.classList.contains("dark");
        const shell = document.querySelector(".page-wash");
        return {
          dark: html,
          shellBg: shell ? getComputedStyle(shell).backgroundColor : "(no shell)",
        };
      });
      if (!state.dark) throw new Error("211: the fresh visitor did not land the dark default");
      if (state.shellBg !== "rgb(14, 19, 16)") {
        throw new Error(`211: the shell wash drifted with the literal retired — computed: ${state.shellBg}`);
      }
      console.log(`[captures-252] 211: the shell wash computes ${state.shellBg} on the token flip alone — the retired literal was byte-equal (F-252g)`);
      await page.screenshot({ path: `${OUT}/211-session252-shell-wash-token-1440.png` });
      commit(
        "211-session252-shell-wash-token-1440.png",
        "the dark-mode dashboard shell — the background token's dark flip alone carries the rgb(14,19,16) wash with the local literal patch retired (F-252g)",
      );
      await page.close();
    }

    await browser.close();
  } catch (err) {
    console.error(`[captures-252] ${(err as Error).message}`);
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
      await new Promise((r) => setTimeout(r, 1500));
    }
  }
  if ((await censusTripwire()) !== 0) exitCode = 1;
  process.exit(exitCode);
}

async function expectVisible(page: Page, locator: Locator) {
  for (let i = 0; i < 30; i++) {
    if (await locator.isVisible()) return;
    await page.waitForTimeout(200);
  }
  throw new Error("an expected face never became visible");
}

main().catch((err) => {
  console.error(`[captures-252] fatal: ${(err as Error).message}`);
  process.exit(1);
});
