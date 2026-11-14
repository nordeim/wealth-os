// Session-245 evidence captures (R-42 — the gate-order, bare-carrier,
// and lockstep-truth round). Three faces freeze the post-round surfaces
// with the R-42 behavior asserted in-volley:
// 182: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census).
// 183: THE PLAIN-TEXT VOLLEY CANARY (F-245a, the flagship's live
//      proof on the family): ten text/plain login posts on a pinned
//      fake XFF all answer 400 UN-BUCKETED (the gate fires first),
//      then a credential-carrying JSON login on the SAME client key
//      still lands 401 (the timing-equalized miss — NOT the 429 the
//      pre-cure volley earned; the e2e leg proved the pre-cure 429
//      at RED birth). Sibling probes: a text/plain signup post and a
//      text/plain verify post answer the gate's 400 the same way.
//      The screenshot freezes the login card — the family's own UI
//      face at 1440.
// 184: THE UPLOADS GET SIBLING (F-245a's second surface): a volley of
//      100 invalid-name capability GETs all answer 404 UN-BURNED
//      (the regex check rides before the bucket), then a valid
//      1x1 PNG upload lands 200 and its capability URL serves
//      image/png — the victim's budget survives the storm. The
//      screenshot freezes the Profile Settings card (the upload
//      family's own UI face).
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

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-245.ts") process.exit(0);

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
    console.error("[captures-245] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-245] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-245] ${file} — ${note} (${bytes}B)`);
}

/** The 66-byte 1x1 transparent PNG (the sibling canary's honest positive). */
const VALID_PNG = new Uint8Array([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
  0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
  0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89, 0x00, 0x00, 0x00,
  0x0d, 0x49, 0x44, 0x41, 0x54, 0x28, 0x5c, 0x8d, 0x63, 0x00, 0x01, 0x18,
  0x00, 0x03, 0x9b, 0x31, 0x01, 0x82, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45,
  0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
]);

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-245] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-245] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-245] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-245] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-245] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-245] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 182: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("182: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`182: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("182: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/182-session245-mobile-drawer-390.png` });
      commit("182-session245-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
      await page.close();
    }

    // ---- 183: THE PLAIN-TEXT VOLLEY CANARY (F-245a) ---------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      // The in-page context first: the fetches below run from the
      // server's own origin (about:blank has a null origin — the
      // same-origin fetch would die at the browser's cross-origin
      // gate, not ours).
      await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1200);
      // The volley — in the browser context, exactly as a cross-site
      // form volley would arrive (text/plain, no JSON content-type).
      const XFF = "203.0.113.88";
      const volley: number[] = [];
      for (let i = 0; i < 10; i++) {
        const res = await page.evaluate(
          async ({ url, xff, body }) => {
            const r = await fetch(url, {
              method: "POST",
              headers: { "content-type": "text/plain", "x-forwarded-for": xff },
              body,
            });
            return r.status;
          },
          { url: `${BASE}/api/auth/login`, xff: XFF, body: "email=volley&password=volley" },
        );
        volley.push(res);
      }
      if (volley.filter((s) => s === 400).length !== 10) {
        throw new Error(`183: the volley answered ${volley.join(",")} (expected 10x 400 — the gate fires un-bucketed)`);
      }
      // The credential-carrying login on the SAME client key: 401,
      // NOT the 429 the pre-cure volley earned (the e2e RED proof
      // received exactly 429 before the cure).
      const jsonLogin = await page.evaluate(
        async ({ url, xff }) => {
          const r = await fetch(url, {
            method: "POST",
            headers: { "content-type": "application/json", "x-forwarded-for": xff },
            body: JSON.stringify({
              email: "gate-order-capture-probe@example.com",
              password: "wrong-password-probe",
            }),
          });
          return r.status;
        },
        { url: `${BASE}/api/auth/login`, xff: XFF },
      );
      if (jsonLogin !== 401) {
        throw new Error(`183: the JSON login on the volley's client key answered ${jsonLogin} (expected 401 — 429 means the volley still burned the bucket)`);
      }
      // The family siblings: the same gate-first ordering on signup
      // and verify (the text/plain arm answers the gate's 400).
      for (const route of ["signup", "verify"]) {
        const sibling = await page.evaluate(
          async ({ url }) => {
            const r = await fetch(url, {
              method: "POST",
              headers: { "content-type": "text/plain" },
              body: "email=probe&password=probe",
            });
            return r.status;
          },
          { url: `${BASE}/api/auth/${route}` },
        );
        if (sibling !== 400) {
          throw new Error(`183: the ${route} text/plain probe answered ${sibling} (expected the gate's 400)`);
        }
      }
      // The screenshot face: the login card at 1440 — the family's own
      // UI surface, with the canary's verdicts asserted above.
      await page.screenshot({ path: `${OUT}/183-session245-plaintext-volley-canary-1440.png` });
      commit(
        "183-session245-plaintext-volley-canary-1440.png",
        "the login card at 1440 — the plain-text volley canary proven live: 10x text/plain login posts 400 un-bucketed, the JSON login on the same client key still lands 401 (NOT the pre-cure 429), the signup/verify text/plain probes answer the gate's 400",
      );
      await page.close();
    }

    // ---- 184: THE UPLOADS GET SIBLING (F-245a's second surface) ---------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      // The invalid-name volley: a storm of malformed capability URLs
      // must 404 WITHOUT burning the 240-slot uploads budget (the
      // regex check rides before the burn).
      const storm: number[] = [];
      for (let i = 0; i < 100; i++) {
        const res = await page.evaluate(
          async (url) => {
            const r = await fetch(url, { headers: { "x-forwarded-for": "203.0.113.99" } });
            return r.status;
          },
          `${BASE}/api/uploads/${encodeURIComponent(`../etc/passwd-${i}`)}`,
        );
        storm.push(res);
      }
      if (storm.filter((s) => s === 404).length !== 100) {
        throw new Error(`184: the invalid-name storm did not uniformly 404 (${storm.slice(0, 5).join(",")}…)`);
      }
      // The valid upload still lands (the budget survived the storm):
      // a sessioned 1x1 PNG POST + the capability URL round-trip.
      // FormData + File (binary-safe — a string-built multipart body
      // corrupts bytes ≥ 0x80 through the UTF-8 round-trip, and the
      // sniff gate honestly refuses the damaged PNG); the fetch rides
      // the page's own cookie jar (same-origin default credentials —
      // the httpOnly session cookie is invisible to document.cookie,
      // and the browser attaches it automatically).
      const upload = await page.evaluate(
        async ({ url, bytes }) => {
          const form = new FormData();
          form.append("file", new File([new Uint8Array(bytes)], "probe.png", { type: "image/png" }));
          const r = await fetch(url, { method: "POST", body: form });
          const body = (await r.json()) as {
            ok: boolean;
            data?: { file_url?: string };
          };
          return { status: r.status, fileUrl: body.data?.file_url ?? "" };
        },
        { url: `${BASE}/api/upload`, bytes: Array.from(VALID_PNG) },
      );
      if (upload.status !== 200 || !upload.fileUrl) {
        throw new Error(`184: the valid PNG upload answered ${upload.status} (expected 200 — the budget survived the storm, the sniff must not eat honest images)`);
      }
      const served = await page.evaluate(async (url) => {
        const r = await fetch(url);
        return { status: r.status, type: r.headers.get("content-type") };
      }, `${BASE}${upload.fileUrl}`);
      if (served.status !== 200 || served.type !== "image/png") {
        throw new Error(`184: the capability URL answered ${served.status}/${served.type} (expected 200 image/png)`);
      }
      // The screenshot face: the Profile Settings card — the upload
      // family's own UI surface, with the sibling canary's verdicts.
      await page.goto(`${BASE}/Settings`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      await page.screenshot({ path: `${OUT}/184-session245-uploads-get-sibling-canary-1440.png` });
      commit(
        "184-session245-uploads-get-sibling-canary-1440.png",
        "the Settings Profile card at 1440 — the uploads GET sibling proven live: 100 invalid-name capability GETs all 404 un-burned (the regex rides before the bucket), the valid 1x1 PNG round-trip still lands 200 serving image/png (the budget survived the storm)",
      );
      await page.close();
    }

    await browser.close();
    console.log("[captures-245] all three faces verified");
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
  console.error(`[captures-245] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
