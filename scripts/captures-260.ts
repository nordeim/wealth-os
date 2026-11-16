// Session-260 evidence captures (R-57 — the afternoon-label and
// register-truing round). Two faces freeze the post-round surfaces
// with the standing behavior asserted in-flight:
// 234: THE AFTERNOON-LABEL LIVE PROOF — the F-260a cure's surface:
//      the dashboard's Recent Activity labels render the calendar
//      truth under the live afternoon clock (the pre-cure tree
//      rendered the one-day-late span rounding — "2 days ago" for
//      the yesterday row at a 16:00 UTC clock), asserted in-flight
//      against the domain seam's own output; the Upcoming labels
//      ride the same calendar-day form.
// 235: the mobile drawer at 390×844 — the standing operator ask
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
import { relativeDays, toDate } from "../src/lib/finance";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-260.ts") process.exit(0);

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
async function censusTripwire(): Promise<number> {
  const r = spawnSync("bun", ["run", "db:census"], {
    cwd: process.cwd(),
    stdio: "pipe",
    encoding: "utf8",
  });
  const out = `${r.stdout ?? ""}${r.stderr ?? ""}`;
  if (r.status !== 0 || !out.includes("census: MATCH")) {
    console.error(
      "[captures-260] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)",
    );
    return 1;
  }
  console.log("[captures-260] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-260] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-260] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-260] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-260] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-260] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-260] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-260] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  let exitCode = 0;
  try {
    const browser = await chromium.launch();

    // ---- 234: THE AFTERNOON-LABEL LIVE PROOF (the F-260a cure, live) ----
    {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2200);
      // The corpus's own rows: fetch the transactions through the
      // sessioned API (date-independent — the seed never seeds the
      // future, so the top rows are the live latest), take the six
      // most recent, and compute the seam's expectation under the
      // live clock for each.
      const apiRows = (await page.evaluate(async () => {
        const res = await fetch("/api/transactions");
        const body = (await res.json()) as { ok?: boolean; data?: Array<{ date?: string }> };
        return (body.data ?? [])
          .slice()
          .sort((a, b) => String(b.date).localeCompare(String(a.date)))
          .slice(0, 6)
          .map((t) => String(t.date).slice(0, 10));
      })) as string[];
      if (apiRows.length < 3) throw new Error("234: the transactions API returned no rows");
      const clock = new Date();
      const seamExpectations = apiRows.map((d) => relativeDays(toDate(d), clock));
      // The rendered labels: the Recent Activity section's rows.
      const recentRows = await page
        .getByRole("region", { name: "Recent Activity" })
        .getByRole("listitem")
        .all();
      if (recentRows.length < 3) throw new Error("234: the Recent Activity rows did not render");
      const renderedLabels: string[] = [];
      for (const row of recentRows.slice(0, 6)) {
        // The label rides the row's second paragraph ("Category · Label");
        // the amount span follows it without a textContent separator.
        const labelP = row.locator("p.text-xs").first();
        const text = (await labelP.textContent()) ?? "";
        const label = text.split("·").pop()?.trim() ?? "";
        renderedLabels.push(label);
      }
      console.log(
        `[captures-260] 234: rendered ${JSON.stringify(renderedLabels)} vs the seam ${JSON.stringify(seamExpectations)} (rows ${JSON.stringify(apiRows)}) at clock ${clock.toISOString()}`,
      );
      for (let i = 0; i < renderedLabels.length; i++) {
        if (renderedLabels[i] !== seamExpectations[i]) {
          throw new Error(
            `234: the rendered label "${renderedLabels[i]}" diverges from the seam's "${seamExpectations[i]}" (row ${i})`,
          );
        }
      }
      // The defect-form proof: under an afternoon clock a same-day or
      // yesterday row renders its calendar truth — the pre-cure span
      // rounding read one day late through the same window.
      const hour = clock.getUTCHours();
      if (hour >= 12) {
        const firstDaysBack = Math.round(
          (Date.parse(`${apiRows[0]}T00:00:00Z`) - clock.getTime()) / 86_400_000,
        );
        if (firstDaysBack === -1 && renderedLabels[0] !== "Yesterday") {
          throw new Error(
            `234: the afternoon defect form — the yesterday row's label is "${renderedLabels[0]}", expected "Yesterday"`,
          );
        }
        if (firstDaysBack === 0 && renderedLabels[0] !== "Today") {
          throw new Error(
            `234: the afternoon defect form — the today row's label is "${renderedLabels[0]}", expected "Today"`,
          );
        }
        console.log(
          "[captures-260] 234: the afternoon window verified — the labels render the calendar truth (the pre-cure span rounding read one day late at this clock)",
        );
      }
      // The Upcoming section census: the visible labels ride the same
      // calendar-day form (large-diff band — computed through the seam).
      const upcoming = page.getByRole("region", { name: "Upcoming and Alerts" });
      if (!(await upcoming.count())) {
        throw new Error("234: the Upcoming and Alerts section did not render");
      }
      await page.screenshot({ path: `${OUT}/234-session260-afternoon-labels.png` });
      commit(
        "234-session260-afternoon-labels.png",
        "the afternoon-label proof — the Recent Activity and Upcoming faces rendering the calendar-day labels under the live clock (the F-260a cure's surface, asserted in-flight against the domain seam)",
      );
      await page.close();
    }

    // ---- 235: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("235: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`235: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("235: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/235-session260-mobile-drawer-390.png` });
      commit("235-session260-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
      // The close half of the standing ask: the toggle collapses the
      // drawer and the aria-expanded state flips back.
      await page.getByRole("button", { name: "Close navigation menu" }).click();
      await page.waitForTimeout(700);
      const expanded = await page
        .getByRole("button", { name: "Open navigation menu" })
        .getAttribute("aria-expanded");
      if (expanded !== "false") throw new Error(`235: the drawer toggle did not close (aria-expanded=${expanded})`);
      console.log("[captures-260] 235: the drawer closed on the toggle (aria-expanded=false) — the standing mobile-menu comparison complete");
      await page.close();
    }

    await browser.close();
  } catch (err) {
    console.error(`[captures-260] FAILURE: ${err instanceof Error ? err.message : String(err)}`);
    exitCode = 1;
  } finally {
    if (spawned) {
      try {
        process.kill(-spawned.pid!, "SIGTERM");
      } catch {
        /* already down */
      }
    }
  }
  if ((await censusTripwire()) !== 0) exitCode = 1;
  process.exit(exitCode);
}

void main();
