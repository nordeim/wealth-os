// Session-230 evidence captures (R-27 — the register-and-hygiene
// round). Three faces freeze the post-round surfaces with the R-27
// behavior asserted in-DOM:
// 131: the Analytics Avg Monthly stat tiles at 1440×900 (F-230a's
//      surface) — asserted: the emerald tile's label computes
//      emerald-100 rgb(209,250,229) over the live 500→600 gradient,
//      the value white bold — the REGISTER-RECORDED genus stands
//      byte-for-byte (the register is the record, never a recolor;
//      the same face the reference's own tiles carry, probe-230c).
// 132: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted:
//      the link census).
// 133: the AI Coach exchange (F-230e's surface) — asserted: the
//      greeting bubble renders, a sent question lands the user
//      bubble, and the deterministic assistant reply arrives (the
//      message list grows to three) — the id-model change broke no
//      exchange behavior; the keys are now identity-minted.
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
if (path.basename(process.argv[1] ?? "") !== "captures-230.ts") process.exit(0);

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
    console.error("[captures-230] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-230] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-230] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-230] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-230] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-230] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-230] the captures dev server never came up on :3000");
      process.exit(1);
    }
    // F-226g: the spawn-liveness check — a dead spawn means an INCUMBENT
    // server (whose database is unknowable) answered the wait.
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-230] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-230] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  try {
    const browser = await chromium.launch();

    // ---- 131: the register-recorded Avg Monthly tiles (F-230a) ---------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Analytics`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const tile = page
        .locator("p")
        .filter({ hasText: "Avg Monthly Income" })
        .first();
      if (!(await tile.count())) throw new Error("131: the Avg Monthly Income tile did not render");
      const measured = await tile.evaluate((el) => getComputedStyle(el).color);
      // The register's recorded genus (probe-230c confirmed the
      // reference's own tiles carry it): emerald-100 on the gradient.
      if (measured !== "rgb(209, 250, 229)") {
        throw new Error(`131: the tile label ink is ${measured} — the register-recorded genus is emerald-100 rgb(209, 250, 229)`);
      }
      // Walk up from the label to the gradient card (the tile wrapper
      // carrying STAT_GRADIENTS.emerald).
      const grad = await tile.evaluate((el) => {
        for (let p = el.parentElement; p; p = p.parentElement) {
          const bi = getComputedStyle(p).backgroundImage ?? "";
          if (bi.includes("linear-gradient")) return bi;
        }
        return "none";
      });
      if (!(grad.includes("rgb(16, 185, 129)") && grad.includes("rgb(5, 150, 105)"))) {
        throw new Error(`131: the tile gradient is not the live 500→600 emerald pair (${grad})`);
      }
      await page.screenshot({ path: `${OUT}/131-session230-statcard-register.png` });
      commit("131-session230-statcard-register.png", "the Avg Monthly tiles carrying the register-recorded genus — emerald-100 on the 500→600 gradient, the recolor rejected (F-230a)");
    }

    // ---- 132: the mobile drawer at 390×844 (the standing ask) ----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("132: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`132: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("132: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/132-session230-mobile-drawer-390.png` });
      commit("132-session230-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing mobile-nav ask)");
    }

    // ---- 133: the AI Coach exchange on the id-minted list (F-230e) -----
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      await page.getByRole("button", { name: /AI Coach/ }).first().click();
      await page.waitForTimeout(1500);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("133: the AI Coach dialog did not open");
      const list = dialog.locator("div[aria-live='polite']");
      if (!(await list.getByText(/AI financial coach/).count())) {
        throw new Error("133: the greeting bubble did not render");
      }
      await dialog.getByLabel("Ask the AI coach a question").fill("What is my savings rate?");
      await dialog.getByRole("button", { name: "Send question" }).click();
      await page.waitForTimeout(2500);
      if (!(await list.getByText("What is my savings rate?").count())) {
        throw new Error("133: the user bubble did not land");
      }
      const bubbles = await list.locator("div.flex").count();
      if (bubbles < 3) {
        throw new Error(`133: the exchange is incomplete — ${bubbles} bubbles (expected greeting + user + assistant)`);
      }
      await page.screenshot({ path: `${OUT}/133-session230-ai-coach-exchange.png` });
      commit("133-session230-ai-coach-exchange.png", "the AI Coach exchange — greeting + user question + the deterministic reply, all three bubbles on the id-minted list (F-230e)");
    }

    await browser.close();
    console.log("[captures-230] all three faces verified");
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
  console.error(`[captures-230] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
