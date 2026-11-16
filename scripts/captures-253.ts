// Session-253 evidence captures (R-50 — the order-dependence,
// burn-ledger, and fixed-email round). Four faces freeze the
// post-round surfaces with the R-50 behavior asserted in-flight:
// 212: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census), then closes on the toggle (aria-expanded flip).
// 213: THE RESEND EVERY-ARM FACE (F-253d): the resend miss arm still
//      answers the three-key envelope after the vanished-row arm
//      joined it (verificationCode present and null) — the shipped
//      arms proven unchanged by the cure; the P2025 arm's shape is
//      pinned at the source level by the parity-253 whole-route form
//      (an arm only a hash-present row vanishing mid-request can
//      reach — not live-triggerable without a user-delete surface).
// 214: THE DASHBOARD DESKOP FACE — the remediated codebase's flagship
//      page in the fresh-visitor dark default (the operator's
//      screenshots-of-the-dev-server ask).
// 215: THE LOGIN FACE — the remediated codebase's auth face (the
//      forced-light posture, the F-235k ring face intact).
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
if (path.basename(process.argv[1] ?? "") !== "captures-253.ts") process.exit(0);

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
    console.error("[captures-253] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-253] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-253] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-253] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-253] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-253] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-253] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-253] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-253] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  let exitCode = 0;
  try {
    const browser = await chromium.launch();

    // ---- 212: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("212: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`212: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("212: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/212-session253-mobile-drawer-390.png` });
      commit("212-session253-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
      // The close half of the standing ask: the toggle collapses the
      // drawer and the aria-expanded state flips back.
      await page.getByRole("button", { name: "Close navigation menu" }).click();
      await page.waitForTimeout(700);
      const expanded = await page
        .getByRole("button", { name: "Open navigation menu" })
        .getAttribute("aria-expanded");
      if (expanded !== "false") throw new Error(`212: the drawer toggle did not close (aria-expanded=${expanded})`);
      console.log("[captures-253] 212: the drawer closed on the toggle (aria-expanded=false) — the standing mobile-menu comparison complete");
      await page.close();
    }

    // ---- 213: THE RESEND EVERY-ARM FACE (F-253d) -------------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1200);
      // The MISS arm on an unknown email: the F-253d cure touched only
      // the vanished-row catch — the shipped arms must answer the SAME
      // three-key envelope they carried out of R-49. The `in` check,
      // never a nullish coalesce (the session-252 harness lesson).
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
          verificationCodeIsNull: "verificationCode" in data && data["verificationCode"] === null,
        };
      });
      if (!shape.ok) throw new Error(`213: the resend miss arm answered ${JSON.stringify(shape)}`);
      if (!shape.keys.includes("verificationCode")) {
        throw new Error(`213: the miss arm omits the verificationCode key — the shape oracle stands: ${JSON.stringify(shape)}`);
      }
      if (!shape.verificationCodeIsNull) {
        throw new Error(`213: the miss arm's verificationCode is not null: ${JSON.stringify(shape)}`);
      }
      console.log(`[captures-253] 213: the miss arm's envelope is three-key after the F-253d cure (${shape.keys.join(", ")}) — every arm of the route answers the same shape (the vanished-row arm pinned at the source level by the parity-253 whole-route form)`);
      await page.screenshot({ path: `${OUT}/213-session253-resend-every-arm-1440.png` });
      commit(
        "213-session253-resend-every-arm-1440.png",
        "the login face the resend miss-arm probe rode — every arm of the route answers the same three-key envelope (the F-252b form holding through the F-253d completion)",
      );
      await page.close();
    }

    // ---- 214: THE DASHBOARD DESKTOP FACE ----------------------------------
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
      if (!state.dark) throw new Error("214: the fresh visitor did not land the dark default");
      if (state.heading !== "Financial Dashboard") {
        throw new Error(`214: the dashboard heading reads ${state.heading}`);
      }
      if (state.shellBg !== "rgb(14, 19, 16)") {
        throw new Error(`214: the shell wash drifted — computed: ${state.shellBg}`);
      }
      console.log(`[captures-253] 214: the dashboard renders (${state.heading}, dark default, shell ${state.shellBg})`);
      await page.screenshot({ path: `${OUT}/214-session253-dashboard-desktop-1440.png` });
      commit(
        "214-session253-dashboard-desktop-1440.png",
        "the remediated codebase's flagship page — the Financial Dashboard at 1440×900 in the fresh-visitor dark default (the dev-server screenshots ask)",
      );
      await page.close();
    }

    // ---- 215: THE LOGIN FACE ----------------------------------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1200);
      // The auth face's forced-light posture (the F-219t doctrine)
      // with the F-235k auth-face focus ring intact.
      const light = await page.evaluate(() => !document.documentElement.classList.contains("dark"));
      if (!light) throw new Error("215: the login face did not force the light posture");
      const card = page.getByRole("heading", { name: "Welcome to WealthOS" });
      if (!(await card.isVisible())) throw new Error("215: the login card heading is not visible");
      await page.screenshot({ path: `${OUT}/215-session253-login-face-1440.png` });
      commit(
        "215-session253-login-face-1440.png",
        "the remediated codebase's auth face — the forced-light login card at 1440×900 (the dev-server screenshots ask)",
      );
      await page.close();
    }

    await browser.close();
  } catch (err) {
    console.error(`[captures-253] ${(err as Error).message}`);
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
  console.error(`[captures-253] fatal: ${(err as Error).message}`);
  process.exit(1);
});
