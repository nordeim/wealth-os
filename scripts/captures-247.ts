// Session-247 evidence captures (R-44 — the guard-advance, iat-bound,
// and focus-pause round). Three faces freeze the post-round surfaces
// with the R-44 behavior asserted in-volley:
// 188: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census).
// 189: THE IAT BOUND CANARY (F-247b, the flagship's live proof on the
//      running server): the MINTED session cookie answers 200 on the
//      requireSession-gated /api/transactions (the bound never eats
//      legitimate sessions); a hand-forged cookie under the SAME
//      secret + the REAL uid with a FUTURE iat (a valid exp−iat span
//      — the exact token the pre-cure verifier honored) answers the
//      401 wall; the non-numeric-iat twin (the NaN'd span arm)
//      answers 401 too. The screenshot freezes the LOGIN WALL the
//      forged cookie lands on at /Dashboard — the bound's own face.
// 190: THE TOAST FOCUS-PAUSE FACE (F-247c's own UI surface): an
//      expense delete lands the success toast; the Dismiss button is
//      FOCUSED (keyboard) and the toast SURVIVES past the 4s timer
//      (asserted at 4.6s — the pre-cure card died at 4s with the
//      focus inside it), then the blur dismisses it (~4s later,
//      asserted gone).
// The script rides the own-database convention (session 225, R-22,
// F-225e + session 226's F-226g liveness check): db/captures.db
// recreated + seeded per run, the spawned dev server carries
// DATABASE_URL=file:../db/captures.db, the spawn-liveness check
// guards the :3000 race, custom.db is never touched, and a census
// tripwire guards the exit.
import { chromium, type Page } from "@playwright/test";
import { readFileSync, statSync, unlinkSync } from "node:fs";
import { createHmac } from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import * as path from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-247.ts") process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";
const CAPTURES_DB_URL = "file:../db/captures.db";
const SESSION_COOKIE = "neo_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

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
    console.error("[captures-247] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-247] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-247] ${file} — ${note} (${bytes}B)`);
}

/** The .env AUTH_SECRET the spawned dev server itself rides. */
function readAuthSecret(): string {
  const env = readFileSync(".env", "utf-8");
  const m = env.match(/^AUTH_SECRET="?([^"\n]+)"?$/m);
  const secret = m?.[1] ?? "";
  if (secret.length < 16) {
    throw new Error("the .env AUTH_SECRET is missing/short — the canary cannot forge under the server's own key");
  }
  return secret;
}

/** A hand-forged neo_session token under the server's own secret. */
function forgeToken(secret: string, payload: Record<string, unknown>): string {
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const sig = createHmac("sha256", secret).update(body).digest("hex");
  return `${body}.${sig}`;
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-247] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-247] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-247] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-247] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-247] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-247] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 188: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("188: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`188: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("188: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/188-session247-mobile-drawer-390.png` });
      commit("188-session247-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
      await page.close();
    }

    // ---- 189: THE IAT BOUND CANARY (F-247b) ------------------------------
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      await login(page, BASE);
      // The minted-cookie control: the requireSession-gated family
      // answers 200 (the bound never eats legitimate sessions — live).
      const minted = await page.evaluate(
        async (url) => (await fetch(url)).status,
        `${BASE}/api/transactions`,
      );
      if (minted !== 200) {
        throw new Error(`189: the minted session answered ${minted} on /api/transactions (expected 200 — the bound never eats legitimate sessions)`);
      }
      // The real uid (so the forged token isolates the IAT arm — a
      // wrong-uid would conflate the owner-scoping 404s with the bound).
      const uid = await page.evaluate(async (url) => {
        const r = await fetch(url);
        const j = (await r.json()) as { ok: boolean; data: { id: string } | null };
        return j.data?.id ?? "";
      }, `${BASE}/api/auth/me`);
      if (!uid) throw new Error("189: the me probe returned no uid — the canary cannot isolate the iat arm");
      const secret = readAuthSecret();
      const now = Date.now();
      // The future-iat twin: a valid exp−iat span (the exact token the
      // pre-cure verifier honored — iat+TTL).
      const futureIat = forgeToken(secret, {
        uid,
        iat: now + 3_600_000,
        exp: now + 3_600_000 + SESSION_TTL_MS,
        v: 0,
      });
      // The non-numeric-iat twin: the NaN'd-span arm.
      const stringIat = forgeToken(secret, { uid, iat: "not-a-number", exp: now + 60_000, v: 0 });
      for (const [name, token] of [
        ["future-iat", futureIat],
        ["non-numeric-iat", stringIat],
      ] as const) {
        await context.addCookies([{ name: SESSION_COOKIE, value: token, url: BASE }]);
        const status = await page.evaluate(
          async (url) => (await fetch(url)).status,
          `${BASE}/api/transactions`,
        );
        if (status !== 401) {
          throw new Error(`189: the ${name} forged cookie answered ${status} (expected 401 — the iat bound rejects it live; the pre-cure verifier honored it)`);
        }
        console.log(`[captures-247] the ${name} forged cookie → 401 (the bound fires live)`);
      }
      // The bound's own face: the forged cookie at /Dashboard lands the
      // login wall (the server-side session decision nulls the token).
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      await page.waitForURL((u) => u.pathname.endsWith("/login"), { timeout: 15000 });
      await page.screenshot({ path: `${OUT}/189-session247-iat-bound-login-wall-1440.png` });
      commit(
        "189-session247-iat-bound-login-wall-1440.png",
        "the login wall at 1440 — the iat bound proven live: the minted cookie answers 200 on the gated family, the future-iat and non-numeric-iat forged cookies (same secret, same uid) both answer 401, and the forged session lands the wall",
        20_000,
      );
      await context.close();
    }

    // ---- 190: THE TOAST FOCUS-PAUSE FACE (F-247c) ------------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      // Land a success toast: the first row's one-click delete (the
      // captures db is recreated per run — the mutation is the
      // convention's own surface).
      const firstDelete = page.getByRole("button", { name: /^Delete / }).first();
      if (!(await firstDelete.count())) throw new Error("190: no expense row delete trigger found");
      await firstDelete.click();
      const dismiss = page.getByRole("button", { name: "Dismiss notification" });
      await dismiss.waitFor({ state: "visible", timeout: 10_000 });
      // The keyboard arm: focus the Dismiss button and OUTLIVE the 4s
      // timer (asserted at 4.6s — the pre-cure card died at 4s with
      // the focus inside it).
      await dismiss.focus();
      await page.waitForTimeout(4600);
      if (!(await dismiss.count())) {
        throw new Error("190: the focused toast died inside the 4.6s window — the focus-pause does not hold");
      }
      await page.screenshot({ path: `${OUT}/190-session247-toast-focus-pause-1440.png` });
      // The blur arm: unpause dismisses (~4s later, asserted gone).
      await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
      await page.waitForTimeout(4500);
      if (await dismiss.count()) {
        throw new Error("190: the blurred toast survived past the unpause window — the timer did not resume");
      }
      commit(
        "190-session247-toast-focus-pause-1440.png",
        "the success toast at 1440 with its Dismiss button keyboard-focused — the card asserted ALIVE at 4.6s (the focus-pause holds; the pre-cure card died at 4s), then asserted dismissed ~4s after the blur",
        20_000,
      );
      await page.close();
    }

    await browser.close();
    console.log("[captures-247] all three faces verified");
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
  console.error(`[captures-247] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
