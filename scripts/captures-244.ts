// Session-244 evidence captures (R-41 — the guard-advance, upload-sniff,
// and select-seam round). Four faces freeze the post-round surfaces with
// the R-41 behavior asserted in-DOM (or in-volley, for the flagship):
// 178: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census).
// 179: the Settings currency Select OPEN at 1440 (F-244c) — the
//      appendage conversion's computed-identical proof: the trigger's
//      class attribute still carries the full base genus (every
//      SELECT_TRIGGER part joined by the cn() appendage form), the
//      computed geometry is unchanged (the 6px radius, the 36px
//      height), and the listbox opens with the currency options.
// 180: the login signin view at 1440 (F-244g) — the Mail/Lock field
//      icons carry the explicit aria-hidden rider (asserted), matching
//      the sibling views' genus.
// 181: THE POLYGLOT UPLOAD CANARY (F-244b, the flagship's live proof):
//      a sessioned POST declaring image/png while carrying HTML bytes
//      answers 400 (the sniff gate fires — the pre-cure tree stored
//      them); a JPEG-bytes-as-png cross-family POST answers 400 the
//      same way; a VALID 1x1 PNG still lands 200 with the capability
//      URL, and the GET serves the stored bytes with the extension's
//      image/png content-type. The screenshot freezes the Profile
//      Settings card — the upload family's own UI face.
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
if (path.basename(process.argv[1] ?? "") !== "captures-244.ts") process.exit(0);

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
    console.error("[captures-244] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-244] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-244] ${file} — ${note} (${bytes}B)`);
}

/** The 66-byte 1x1 transparent PNG (the canary's honest positive). */
const VALID_PNG = new Uint8Array([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
  0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
  0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89, 0x00, 0x00, 0x00,
  0x0d, 0x49, 0x44, 0x41, 0x54, 0x28, 0x5c, 0x8d, 0x63, 0x00, 0x01, 0x18,
  0x00, 0x03, 0x9b, 0x31, 0x01, 0x82, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45,
  0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
]);

/** HTML bytes — the arbitrary-content payload the sniff must refuse. */
const HTML_BYTES = new TextEncoder().encode(
  "<html><body><h1>polyglot</h1><script>alert(1)</script></body></html>",
);

/** JPEG magic on a 12-plus-byte buffer — the cross-family polyglot. */
const JPEG_BYTES = new Uint8Array([
  0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01,
  0x00, 0x00, 0x00, 0x00,
]);

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-244] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-244] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-244] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-244] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-244] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-244] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 178: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("178: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`178: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("178: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/178-session244-mobile-drawer-390.png` });
      commit("178-session244-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
    }

    // ---- 179: the Select open face (F-244c, the appendage proof) --------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Settings`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      // The trigger's genus survived the appendage conversion: the
      // class attribute carries the full base string (all three
      // SELECT_TRIGGER parts + the static tail), and the computed
      // geometry is the rounded-md 6px radius / h-9 36px height the
      // template form produced (twMerge joins identically).
      const geo = await page.evaluate(() => {
        const trigger = document.querySelector("#settings-currency") as HTMLElement | null;
        if (!trigger) return null;
        const cls = trigger.getAttribute("class") ?? "";
        const cs = getComputedStyle(trigger);
        return { cls, radius: cs.borderRadius, height: cs.height };
      });
      if (!geo) throw new Error("179: the currency select trigger not found on /Settings");
      const expectedParts = [
        "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-line",
        "bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background",
        "data-[placeholder]:text-muted-ink",
        "focus:outline-none focus:ring-2 focus:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "[&>span]:line-clamp-1",
      ];
      for (const part of expectedParts) {
        if (!geo.cls.includes(part)) {
          throw new Error(`179: the trigger's class string lost the part "${part}" (the appendage join dropped a genus member)`);
        }
      }
      if (geo.radius !== "6px") throw new Error(`179: the trigger's radius computed ${geo.radius}, expected 6px (rounded-md)`);
      if (geo.height !== "36px") throw new Error(`179: the trigger's height computed ${geo.height}, expected 36px (h-9)`);
      // Open the listbox — the face the screenshot freezes.
      await page.click("#settings-currency");
      const listbox = page.getByRole("listbox");
      await listbox.waitFor({ state: "visible", timeout: 10_000 });
      const options = await listbox.getByRole("option").count();
      if (options < 2) throw new Error(`179: the currency listbox opened with ${options} options (expected the currency family)`);
      await page.waitForTimeout(600);
      await page.screenshot({ path: `${OUT}/179-session244-select-appendage-1440.png` });
      commit(
        "179-session244-select-appendage-1440.png",
        `the Settings currency Select open at 1440 — the appendage conversion's computed-identical proof (asserted: the class string carries every genus part; the radius ${geo.radius} and the height ${geo.height} unchanged; ${options} options render)`,
      );
      await page.keyboard.press("Escape");
    }

    // ---- 180: the signin view's aria-hidden riders (F-244g) -------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      const riders = await page.evaluate(() => {
        const icons = document.querySelectorAll('svg[class*="left-"]');
        return Array.from(icons).map((i) => i.getAttribute("aria-hidden"));
      });
      if (riders.length < 2) throw new Error(`180: the signin view rendered ${riders.length} field icons (expected Mail + Lock at minimum)`);
      const bare = riders.filter((r) => r !== "true");
      if (bare.length > 0) throw new Error(`180: ${bare.length} signin field icons carry no aria-hidden rider`);
      await page.screenshot({ path: `${OUT}/180-session244-signin-icons-aria-hidden-1440.png` });
      commit(
        "180-session244-signin-icons-aria-hidden-1440.png",
        `the login signin view at 1440 — every field icon (${riders.length}) carries the explicit aria-hidden rider (asserted), matching the sibling views' genus`,
      );
    }

    // ---- 181: the polyglot upload canary (F-244b, the flagship) ---------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      // The session cookie for the Node-side volley.
      const cookies = await page.context().cookies(BASE);
      const session = cookies.find((c) => c.name === "neo_session");
      if (!session) throw new Error("181: the neo_session cookie not found after login");
      const cookieHeader = `neo_session=${session.value}`;

      const postUpload = async (bytes: Uint8Array, type: string, name: string) => {
        const form = new FormData();
        form.append("file", new File([bytes as BlobPart], name, { type }));
        const r = await fetch(`${BASE}/api/upload`, {
          method: "POST",
          headers: { cookie: cookieHeader },
          body: form,
        });
        const body = (await r.json()) as { ok: boolean; data?: { file_url?: string }; error?: { message?: string } };
        return { status: r.status, body };
      };

      // The polyglot: image/png DECLARED, HTML bytes carried — the
      // pre-cure tree stored these under a .png name; the sniff gate
      // must answer the 400 family.
      const htmlAttempt = await postUpload(HTML_BYTES, "image/png", "polyglot.png");
      if (htmlAttempt.status !== 400 || htmlAttempt.body.ok !== false) {
        throw new Error(
          `181: the HTML-bytes-as-png POST answered ${htmlAttempt.status} ok=${htmlAttempt.body.ok} — the sniff gate did not fire (the pre-cure shape)`,
        );
      }
      // The cross-family polyglot: JPEG magic declared as png — the
      // family mismatch, not the unknown-null arm.
      const jpegAttempt = await postUpload(JPEG_BYTES, "image/png", "crossfamily.png");
      if (jpegAttempt.status !== 400 || jpegAttempt.body.ok !== false) {
        throw new Error(
          `181: the JPEG-bytes-as-png POST answered ${jpegAttempt.status} ok=${jpegAttempt.body.ok} — the family-match arm did not fire`,
        );
      }
      // The honest positive: a valid 1x1 PNG still lands.
      const valid = await postUpload(VALID_PNG, "image/png", "honest.png");
      if (valid.status !== 200 || valid.body.ok !== true || !valid.body.data?.file_url) {
        throw new Error(
          `181: the valid PNG POST answered ${valid.status} ok=${valid.body.ok} — the sniff must not eat honest images`,
        );
      }
      // The GET serves the stored bytes with the extension's type.
      const served = await fetch(`${BASE}${valid.body.data.file_url}`, {
        headers: { cookie: cookieHeader },
      });
      if (served.status !== 200 || served.headers.get("content-type") !== "image/png") {
        throw new Error(
          `181: the capability URL answered ${served.status} content-type=${served.headers.get("content-type")} (expected 200 image/png)`,
        );
      }

      // The screenshot face: the Profile Settings card — the upload
      // family's own UI surface, with the canary's verdicts asserted.
      await page.goto(`${BASE}/Settings`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      await page.screenshot({ path: `${OUT}/181-session244-polyglot-upload-canary-1440.png` });
      commit(
        "181-session244-polyglot-upload-canary-1440.png",
        `the Settings Profile card at 1440 — the polyglot upload canary proven live: HTML-as-png 400 + JPEG-as-png 400 (the sniff gate fires both arms) + the valid PNG's round-trip 200 (capability URL serves image/png)`,
      );
    }

    await browser.close();
    console.log("[captures-244] all four faces verified");
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
  console.error(`[captures-244] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
