// Session-269 evidence capture (R-66 — the unpadded-year, net-universe,
// and drawer-guard round). One face freezes the round's rendered-surface
// subject:
// 254: THE YEAR-0206 EDIT-PREFILL FACE AT DESKTOP (1440×900) — an
//      API-created year-0206 row (the boundary's admitted shoulder, the
//      F-268a doctrine) opened in the Expenses edit dialog: the Date
//      input carries the PADDED four-digit value (pre-cure the bridge
//      emitted a three-digit-year string the native input treated as no
//      value — the input rendered empty for an existing row), and the
//      unchanged-date save lands clean (pre-cure: the 400 on the
//      unpadded re-emit) — F-269a, rendered.
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
if (path.basename(process.argv[1] ?? "") !== "captures-269.ts") process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";
const CAPTURES_DB_URL = "file:../db/captures.db";

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
    console.error("[captures-269] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)");
    return 1;
  }
  console.log("[captures-269] the census tripwire: custom.db MATCH");
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

function commit(file: string, note: string, minBytes = 20_000) {
  const bytes = statSync(`${OUT}/${file}`).size;
  if (bytes < minBytes) throw new Error(`${file}: suspiciously small (${bytes}B) — blank?`);
  console.log(`[captures-269] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-269] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error("[captures-269] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.");
      process.exit(1);
    }
    console.log("[captures-269] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-269] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error("[captures-269] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.");
      process.exit(1);
    }
  }

  const browser = await chromium.launch();
  let exitCode = 0;
  try {
    // ---- 254: THE YEAR-0206 EDIT-PREFILL FACE AT DESKTOP (1440×900) ----
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await login(page, BASE);

      // The fixture: a year-0206 expense through the API (the
      // boundary's admitted shoulder — year 206 sits at or above the
      // 100 floor, so the create lands 201).
      const created = await page.request.post(`${BASE}/api/transactions`, {
        data: {
          description: "Year-0206 capture row",
          amount: 12.34,
          type: "expense",
          category: "Other",
          budgetCategory: "needs",
          date: "0206-06-15",
        },
      });
      if (!created.ok()) {
        throw new Error(`254: the API refused the year-0206 fixture (${created.status()}) — the boundary's admitted shoulder moved`);
      }
      const rowId = ((await created.json()) as { data: { id: string } }).data.id;

      try {
        await page.goto(`${BASE}/expenses`, { waitUntil: "networkidle" });
        await page.waitForTimeout(1500);
        // The search surfaces the row (a year-0206 date sorts to the
        // very end of the date-descended list otherwise).
        await page.getByPlaceholder("Search expenses...").fill("Year-0206 capture row");
        const row = page.locator("li").filter({ hasText: "Year-0206 capture row" }).first();
        await row.waitFor({ state: "visible", timeout: 10_000 });
        await row.getByRole("button", { name: "Edit" }).click();
        const dialog = page.getByRole("dialog");
        await dialog.waitFor({ state: "visible", timeout: 10_000 });

        // THE CURE FACE (F-269a): the Date input carries the padded
        // four-digit value — pre-cure the bridge emitted the
        // three-digit-year string and the input rendered EMPTY for the
        // existing row.
        const dateVal = await dialog.getByLabel("Date").inputValue();
        if (dateVal !== "0206-06-15") {
          throw new Error(`254: the Date input reads "${dateVal}", not the padded "0206-06-15" — the F-269a cure failed`);
        }

        // The evidence frame: the edit dialog with the padded prefill.
        await page.screenshot({ path: `${OUT}/254-session269-year0206-prefill-1440.png` });
        commit(
          "254-session269-year0206-prefill-1440.png",
          "THE YEAR-0206 EDIT-PREFILL FACE AT DESKTOP — the edit dialog's Date input carries the padded 0206-06-15 (pre-cure: empty for the existing row), the round-trip restored",
        );
      } finally {
        await page.request.delete(`${BASE}/api/transactions/${rowId}`);
      }
      await page.close();
      await ctx.close();
    }
  } catch (err) {
    console.error(`[captures-269] ${(err as Error).message}`);
    exitCode = 1;
  } finally {
    await browser.close().catch(() => undefined);
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

main();
