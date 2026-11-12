// Session-233 evidence captures (R-30 — the OTP-paste, live-region,
// and dependency-hygiene round). Three faces freeze the post-round
// surfaces with the R-30 behavior asserted in-DOM:
// 140: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census).
// 141: the OTP paste distribution (F-233a's surface) — a whole-code
//      entry into box 1 (the fill path a paste or a one-time-code
//      autofill takes) distributes across all six boxes and focus
//      lands on the final box (asserted: every box's value equals its
//      digit of the code + activeElement is box 6).
// 142: the reset-token URL strip (F-233f's surface) — the set-password
//      form renders from a tokened link AND the one-time credential
//      has left the address bar (asserted: the URL is the bare
//      /reset-password + the form stays live off the captured value).
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
if (path.basename(process.argv[1] ?? "") !== "captures-233.ts") process.exit(0);

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
    console.error("[captures-233] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-233] the census tripwire: custom.db MATCH");
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

function commit(file: string, note: string) {
  const bytes = statSync(`${OUT}/${file}`).size;
  if (bytes < 30_000) throw new Error(`${file}: suspiciously small (${bytes}B) — blank?`);
  console.log(`[captures-233] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-233] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-233] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-233] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-233] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-233] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-233] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 140: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("140: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`140: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("140: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/140-session233-mobile-drawer-390.png` });
      commit("140-session233-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
    }

    // ---- 141: the OTP paste distribution (F-233a) ------------------------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      // The scratch signup rides the captures db (recreated per run —
      // the scratch user dies with it; the in-app OTP delivery answers
      // the code for the capture).
      await page.goto(`${BASE}/signup`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1200);
      const scratchEmail = `captures-233-${Date.now()}@wealthos.local`;
      await page.getByLabel("Email", { exact: true }).fill(scratchEmail);
      await page.getByLabel("Password", { exact: true }).fill("Captures233!");
      await page.getByLabel("Confirm password").fill("Captures233!");
      await page.getByRole("button", { name: "Create account" }).click();
      await page
        .getByRole("heading", { name: /verify/i })
        .waitFor({ state: "visible", timeout: 30_000 });
      await page.waitForTimeout(1200);
      // The demo-code hint carries the six digits (in-app delivery).
      const hint = await page
        .getByText(/Demo code:/)
        .textContent()
        .catch(() => null);
      const code = (hint ?? "").replace(/\D/g, "").slice(0, 6);
      if (code.length !== 6) {
        throw new Error(`141: the demo code hint is unreadable (${JSON.stringify(hint)})`);
      }
      // The whole-code entry into box 1 — the exact path a paste or a
      // one-time-code autofill takes (the value lands in ONE input).
      await page.getByLabel("Digit 1").fill(code);
      await page.waitForTimeout(600);
      const boxes = page.locator('input[aria-label^="Digit "][inputmode="numeric"]');
      const count = await boxes.count();
      if (count !== 6) throw new Error(`141: expected 6 code boxes — found ${count}`);
      for (let i = 0; i < 6; i++) {
        const value = await boxes.nth(i).inputValue();
        if (value !== code[i]) {
          throw new Error(
            `141: box ${i + 1} carries ${JSON.stringify(value)} — expected ${code[i]} (the paste did not distribute, F-233a)`,
          );
        }
      }
      // Focus lands on the final box (the after-last-filled clamp).
      const focusOnLast = await boxes
        .nth(5)
        .evaluate((el) => el === document.activeElement);
      if (!focusOnLast) {
        throw new Error("141: focus did not land on the final box after the distribution (F-233a)");
      }
      await page.screenshot({ path: `${OUT}/141-session233-otp-paste-distribution.png` });
      commit("141-session233-otp-paste-distribution.png", `the verify view with the whole code (${code}) distributed across all six boxes from a single entry — focus on the final box (F-233a)`);
    }

    // ---- 142: the reset-token URL strip (F-233f) --------------------------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await page.goto(`${BASE}/reset-password?token=captures-233-strip-probe`, {
        waitUntil: "networkidle",
      });
      await page
        .getByRole("heading", { name: "Set new password" })
        .waitFor({ state: "visible", timeout: 15_000 });
      await page.waitForTimeout(900);
      // The one-time credential has left the address bar…
      const url = new URL(page.url());
      if (url.search !== "" || url.pathname !== "/reset-password") {
        throw new Error(`142: the URL still carries the token — ${page.url()} (F-233f)`);
      }
      // …and the form stays live off the captured value.
      if (!(await page.locator("input#password").isVisible())) {
        throw new Error("142: the set-password form did not survive the strip (F-233f)");
      }
      await page.screenshot({ path: `${OUT}/142-session233-reset-token-stripped.png` });
      commit("142-session233-reset-token-stripped.png", "the set-password form rendered from a tokened link with the one-time credential stripped from the address bar (F-233f)");
    }

    await browser.close();
    console.log("[captures-233] all three faces verified");
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
  console.error(`[captures-233] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
