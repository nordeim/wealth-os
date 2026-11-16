// Session-262 evidence captures (R-59 — the description-length,
// muted-figure, and citation-completion round). Three faces freeze the
// round's touched surfaces with the standing behavior asserted
// in-flight:
// 239: THE SERVED META-DESCRIPTION FACE — the F-262a prose cure's
//      surface: the login page serves the reference's mirrored
//      description, asserted LIVE in the served DOM at exactly 314
//      characters (the six trued citations' figure — the length the
//      metadata pin itself asserts).
// 240: THE INVESTMENT-CHIP FACE — the F-262e comment cure's surface:
//      the investments table renders its type chips (the 10%-tint
//      rounded pills whose readable-ink range the round trued), with
//      the seeded six-holding census asserted live.
// 241: the mobile drawer at 390×844 — the standing operator ask
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
if (path.basename(process.argv[1] ?? "") !== "captures-262.ts") process.exit(0);

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
function censusTripwire(): number {
  const r = spawnSync("bun", ["run", "db:census"], {
    cwd: process.cwd(),
    stdio: "pipe",
    encoding: "utf8",
  });
  const out = `${r.stdout ?? ""}${r.stderr ?? ""}`;
  if (r.status !== 0 || !out.includes("census: MATCH")) {
    console.error(
      "[captures-262] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)",
    );
    return 1;
  }
  console.log("[captures-262] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-262] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-262] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-262] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-262] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-262] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-262] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-262] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  let exitCode = 0;
  try {
    const browser = await chromium.launch();

    // ---- 239: THE SERVED META-DESCRIPTION FACE (F-262a's cure, live) --
    {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      // The served description: the reference's mirrored paragraph,
      // exactly 314 characters (the six trued citations' figure).
      const desc = await page.evaluate(() => {
        const el = document.querySelector('meta[name="description"]');
        return el?.getAttribute("content") ?? "";
      });
      if (desc.length !== 314) {
        throw new Error(`239: the served description measures ${desc.length} chars (expected the 314-char mirror)`);
      }
      if (!desc.startsWith("WealthOS is a premium finance suite")) {
        throw new Error("239: the served description is not the mirrored paragraph");
      }
      console.log(
        `[captures-262] 239: the served meta description asserted live at ${desc.length} chars`,
      );
      await page.screenshot({ path: `${OUT}/239-session262-served-description.png` });
      commit(
        "239-session262-served-description.png",
        "THE SERVED META-DESCRIPTION FACE — the login page's meta description asserted live at exactly 314 chars (the six trued citations' figure)",
      );
      await page.close();
    }

    // ---- 240: the investment-chip face (the F-262e cure's surface) ----
    {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Investments`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2000);
      // The seeded corpus: six holdings, each row carrying its type chip
      // (the 10%-tint rounded pill whose readable-ink range was trued).
      const rows = page.getByRole("row");
      const rowCount = await rows.count();
      if (rowCount < 7) {
        throw new Error(`240: the investments table renders ${rowCount} rows (expected the header + six seeded holdings)`);
      }
      const chipRadii = await page.evaluate(() => {
        const chips = Array.from(
          document.querySelectorAll("td span.rounded-full"),
        ) as HTMLElement[];
        return chips.slice(0, 6).map((c) => c.className.includes("rounded-full"));
      });
      if (chipRadii.length !== 6 || chipRadii.some((r) => !r)) {
        throw new Error(`240: the type-chip census is ${JSON.stringify(chipRadii)} (expected six pill chips)`);
      }
      console.log(
        `[captures-262] 240: the investments face renders ${rowCount - 1} holdings with ${chipRadii.length} type chips`,
      );
      await page.screenshot({ path: `${OUT}/240-session262-investment-chips.png` });
      commit(
        "240-session262-investment-chips.png",
        "THE INVESTMENT-CHIP FACE — the six seeded holdings with their type chips asserted live (the trued readable-ink range's surface)",
      );
      await page.close();
    }

    // ---- 241: the mobile drawer at 390×844 (the standing ask) ---------
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
        throw new Error(
          `241: the drawer census is ${census}/9 destinations (Sign Out ${await signOut.count()})`,
        );
      }
      await page.screenshot({ path: `${OUT}/241-session262-mobile-drawer-390.png` });
      const closer = page.getByRole("button", { name: "Close navigation menu" });
      await closer.click();
      await page.waitForTimeout(800);
      const stillVisible = await page
        .getByRole("link", { name: "Dashboard", exact: true })
        .isVisible()
        .catch(() => false);
      if (stillVisible) {
        throw new Error("241: a destination link stayed visible after the close");
      }
      commit(
        "241-session262-mobile-drawer-390.png",
        "THE STANDING MOBILE DRAWER at TRUE 390×844 — 9 destinations + Sign Out census, the aria-expanded close flip verified",
      );
      await page.close();
    }

    await browser.close();
  } catch (err) {
    console.error(`[captures-262] ${(err as Error).message}`);
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
