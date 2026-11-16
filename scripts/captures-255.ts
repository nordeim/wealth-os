// Session-255 evidence captures (R-52 — the strict-parse,
// derived-truth, and docblock-precision round). Three faces freeze
// the post-round surfaces with the standing behavior asserted
// in-flight (the docblock cures are comment level — the captures
// hold the standing surfaces plus the round's flagship LIVE):
// 219: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census), then closes on the toggle (aria-expanded flip).
// 220: THE DASHBOARD DESKTOP FACE — the remediated codebase's flagship
//      page in the fresh-visitor dark default (the operator's
//      screenshots-of-the-dev-server ask), the shell wash asserted.
// 221: THE STRICT-PARSE FACE — the round's flagship proven LIVE: the
//      production artifact booted with a trailing-garbage
//      NEO_PROXY_HOPS ("2x"), the boot warning asserted in the server
//      log (the operator-facing honesty), and the discriminating
//      volley proving the login bucket keys the LAST XFF hop despite
//      the garbage depth (the pre-cure parse keyed the attacker-
//      padded FIRST hop — the F-255a drift, live-discriminated); the
//      login face captured under the same boot.
// The script rides the own-database convention (session 225, R-22,
// F-225e + session 226's F-226g liveness check): db/captures.db
// recreated + seeded per run, the spawned dev server carries
// DATABASE_URL=file:../db/captures.db, custom.db is never touched,
// and a census tripwire guards the exit.
import { chromium, type Page } from "@playwright/test";
import { openSync, readFileSync, statSync, unlinkSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import * as path from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-255.ts") process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";
const CAPTURES_DB_URL = "file:../db/captures.db";
const ARTIFACT_PORT = "3221";
const ARTIFACT_BASE = `http://127.0.0.1:${ARTIFACT_PORT}`;
const ARTIFACT_LOG = "/tmp/captures-255-strict-parse.log";

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

/** F-255a: boot the PRODUCTION artifact with a trailing-garbage depth. */
function bootStrictParseArtifact(): ReturnType<typeof spawn> {
  const logFd = openSync(ARTIFACT_LOG, "w");
  const env: NodeJS.ProcessEnv = {
    ...process.env,
    DATABASE_URL: CAPTURES_DB_URL,
    AUTH_SECRET: "capture-secret-0123456789abcdef",
    NODE_ENV: "production",
    PORT: ARTIFACT_PORT,
    NEO_PROXY_HOPS: "2x",
  };
  return spawn("node", [".next/standalone/server.js"], {
    cwd: process.cwd(),
    env,
    stdio: ["ignore", logFd, logFd],
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
      "[captures-255] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)",
    );
    return 1;
  }
  console.log("[captures-255] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-255] ${file} — ${note} (${bytes}B)`);
}

/** F-255a: the discriminating volley — same LAST hop, rotating first. */
async function strictParseVolley(): Promise<void> {
  const stamp = Date.now();
  const body = JSON.stringify({
    email: `strict-parse-${stamp}@example.com`,
    password: "WrongPassword123",
  });
  const post = (xff: string) =>
    fetch(`${ARTIFACT_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": xff },
      body,
    });
  // Ten attempts through one first hop — the per-IP bucket (10/15min)
  // fills on the LAST hop at the strict default.
  for (let i = 1; i <= 10; i += 1) {
    const r = await post("203.0.113.7, 198.51.100.77");
    if (r.status !== 401) {
      throw new Error(`221: volley attempt ${i} answered ${r.status} (expected the non-enumerating 401)`);
    }
  }
  // The discriminator: a DIFFERENT first hop, the SAME last hop. At
  // the strict default the bucket keys the last hop → the 11th is
  // 429. Under the pre-cure parse ("2x" read as depth 2) the bucket
  // keyed the attacker-padded FIRST hop — a fresh 198.51.100.99
  // bucket — and this request answered 401.
  const r11 = await post("198.51.100.99, 198.51.100.77");
  if (r11.status !== 429) {
    throw new Error(
      `221: the discriminating volley answered ${r11.status} (expected 429 — the bucket must key the LAST hop under the garbage depth)`,
    );
  }
  console.log(
    "[captures-255] 221: the strict-parse volley — ten 401s through one first hop, the rotated-first-hop 11th answered 429 (the bucket keyed the LAST hop: the F-255a cure proven live on the artifact)",
  );
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  let artifact: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-255] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-255] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-255] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-255] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-255] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-255] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  let exitCode = 0;
  try {
    const browser = await chromium.launch();

    // ---- 219: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("219: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`219: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("219: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/219-session255-mobile-drawer-390.png` });
      commit("219-session255-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
      // The close half of the standing ask: the toggle collapses the
      // drawer and the aria-expanded state flips back.
      await page.getByRole("button", { name: "Close navigation menu" }).click();
      await page.waitForTimeout(700);
      const expanded = await page
        .getByRole("button", { name: "Open navigation menu" })
        .getAttribute("aria-expanded");
      if (expanded !== "false") throw new Error(`219: the drawer toggle did not close (aria-expanded=${expanded})`);
      console.log("[captures-255] 219: the drawer closed on the toggle (aria-expanded=false) — the standing mobile-menu comparison complete");
      await page.close();
    }

    // ---- 220: THE DASHBOARD DESKTOP FACE ----------------------------------
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
      if (!state.dark) throw new Error("220: the fresh visitor did not land the dark default");
      if (state.heading !== "Financial Dashboard") {
        throw new Error(`220: the dashboard heading reads ${state.heading}`);
      }
      if (state.shellBg !== "rgb(14, 19, 16)") {
        throw new Error(`220: the shell wash drifted — computed: ${state.shellBg}`);
      }
      console.log(`[captures-255] 220: the dashboard renders (${state.heading}, dark default, shell ${state.shellBg})`);
      await page.screenshot({ path: `${OUT}/220-session255-dashboard-desktop-1440.png` });
      commit(
        "220-session255-dashboard-desktop-1440.png",
        "the remediated codebase's flagship page — the Financial Dashboard at 1440×900 in the fresh-visitor dark default (the dev-server screenshots ask)",
      );
      await page.close();
    }

    // ---- 221: THE STRICT-PARSE FACE (the round's flagship, live) ---------
    {
      if (process.env.OUR_URL) {
        console.log("[captures-255] 221 skipped under OUR_URL — the strict-parse face needs the script's own artifact boot with the garbage depth");
      } else {
        if (await waitOnUrl(`${ARTIFACT_BASE}/api/health`, 1500)) {
          console.error("[captures-255] a server is already on :" + ARTIFACT_PORT + " — stop it first (the strict-parse face must boot its own artifact).");
          process.exit(1);
        }
        artifact = bootStrictParseArtifact();
        if (!(await waitOnUrl(`${ARTIFACT_BASE}/api/health`, 60_000))) {
          console.error("[captures-255] the strict-parse artifact never came up — see " + ARTIFACT_LOG);
          process.exit(1);
        }
        // The boot warning: the operator-facing honesty — the garbage
        // value is NAMED and the fail-closed behavior is PROMISED.
        const log = readFileSync(ARTIFACT_LOG, "utf8");
        if (!log.includes('NEO_PROXY_HOPS="2x" is unparsable')) {
          throw new Error("221: the boot warning did not name the garbage depth");
        }
        if (!log.includes("fails CLOSED onto hop 1")) {
          throw new Error("221: the boot warning did not promise the fail-closed default");
        }
        console.log('[captures-255] 221: the boot warning fired for NEO_PROXY_HOPS="2x" (the fail-closed promise, now true)');
        // The discriminating volley: the bucket keys the LAST hop.
        await strictParseVolley();
        // The face: the login page renders under the same boot.
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
        await page.goto(`${ARTIFACT_BASE}/login`, { waitUntil: "networkidle" });
        await page.waitForTimeout(1200);
        const light = await page.evaluate(() => !document.documentElement.classList.contains("dark"));
        if (!light) throw new Error("221: the login face did not force the light posture");
        const card = page.getByRole("heading", { name: "Welcome to WealthOS" });
        if (!(await card.isVisible())) throw new Error("221: the login card heading is not visible");
        await page.screenshot({ path: `${OUT}/221-session255-strict-parse-login-1440.png` });
        commit(
          "221-session255-strict-parse-login-1440.png",
          "the strict-parse face — the production artifact booted with a trailing-garbage NEO_PROXY_HOPS, the boot warning asserted, the login bucket proven to key the LAST XFF hop (the F-255a cure, live)",
        );
        await page.close();
      }
    }

    await browser.close();
  } catch (err) {
    console.error(`[captures-255] ${(err as Error).message}`);
    exitCode = 1;
  } finally {
    for (const proc of [spawned, artifact]) {
      if (proc) {
        try {
          process.kill(-proc.pid!, "SIGTERM");
        } catch {
          try {
            proc.kill("SIGTERM");
          } catch {
            /* already gone */
          }
        }
      }
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  if ((await censusTripwire()) !== 0) exitCode = 1;
  process.exit(exitCode);
}

void main();
