// Session-258 evidence captures (R-55 — the citation-math, input-flip,
// and render-cap round). Three faces freeze the post-round surfaces
// with the standing behavior asserted in-flight (the round's comment
// cures are proven by the parity-258 battery; the captures hold the
// standing surfaces plus the round's two DOM-level cures proven LIVE):
// 228: the mobile drawer at 390×844 — the standing operator ask
//      (compare the mobile navigation menu): the hamburger opens the
//      drawer with the 9 destination links + Sign Out (asserted by
//      link census), then closes on the toggle (aria-expanded flip).
// 229: THE DARK INPUT FACE — the F-258b cure proven LIVE: the Add
//      Expense dialog's native date input (input-base) in the
//      fresh-visitor dark default, the computed color reading exactly
//      the flipped --color-ink value (rgb(245,245,244)) and the text
//      input's placeholder the flipped --color-muted-ink
//      (rgb(168,162,158)) — the retired .dark .input-base literals'
//      byte-equal values, now carried by the token flips alone.
// 230: THE RENDER-CAP FACE — the F-258e cure proven LIVE: bulk-created
//      expenses push the history past the 100-row cap; the list renders
//      exactly 100 rows and the rider names the truncation ("Showing
//      the first 100 of N expenses — refine the search or filters").
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
if (path.basename(process.argv[1] ?? "") !== "captures-258.ts") process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";
const CAPTURES_DB_URL = "file:../db/captures.db";
const HISTORY_RENDER_CAP = 100;

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
      "[captures-258] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)",
    );
    return 1;
  }
  console.log("[captures-258] the census tripwire: custom.db MATCH");
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
  console.log(`[captures-258] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  // ---- the own-database boot (F-225e + F-226g) -------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-258] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        "[captures-258] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.",
      );
      process.exit(1);
    }
    console.log("[captures-258] seeding db/captures.db + booting the dev server on it…");
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-258] the captures dev server never came up on :3000");
      process.exit(1);
    }
    if (spawned.exitCode !== null || spawned.killed) {
      console.error(
        "[captures-258] the spawned server DIED during the wait — the URL answered by an INCUMBENT server whose database is unknowable. Stop the :3000 server and re-run.",
      );
      process.exit(1);
    }
    console.log("[captures-258] the captures dev server up (db/captures.db, the spawned child alive)");
  }
  let exitCode = 0;
  try {
    const browser = await chromium.launch();

    // ---- 228: the mobile drawer at 390×844 (the standing ask) -----------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const trigger = page.getByRole("button", { name: "Open navigation menu" });
      await trigger.click();
      await page.waitForTimeout(900);
      const dialog = page.getByRole("dialog");
      if (!(await dialog.count())) throw new Error("228: the drawer did not open");
      for (const label of DESTINATIONS) {
        const link = dialog.getByRole("link", { name: label, exact: true });
        if (!(await link.count())) throw new Error(`228: the drawer is missing the ${label} destination`);
      }
      if (!(await dialog.getByRole("button", { name: "Sign Out" }).count())) {
        throw new Error("228: the drawer is missing the Sign Out face");
      }
      await page.screenshot({ path: `${OUT}/228-session258-mobile-drawer-390.png` });
      commit("228-session258-mobile-drawer-390.png", "the mobile drawer open at 390×844 — all 9 destinations + Sign Out (the standing operator ask, asserted by link census)");
      // The close half of the standing ask: the toggle collapses the
      // drawer and the aria-expanded state flips back.
      await page.getByRole("button", { name: "Close navigation menu" }).click();
      await page.waitForTimeout(700);
      const expanded = await page
        .getByRole("button", { name: "Open navigation menu" })
        .getAttribute("aria-expanded");
      if (expanded !== "false") throw new Error(`228: the drawer toggle did not close (aria-expanded=${expanded})`);
      console.log("[captures-258] 228: the drawer closed on the toggle (aria-expanded=false) — the standing mobile-menu comparison complete");
      await page.close();
    }

    // ---- 229: THE DARK INPUT FACE (the F-258b cure, live) ----------------
    {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      await login(page, BASE);
      // The fresh-visitor dark default rides the app routes.
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1800);
      const isDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
      if (!isDark) throw new Error("229: expected the dark default on the app route");
      // Open the Add Expense dialog (the create trigger in the header),
      // then step to the manual form (the two-step dialog opens on the
      // quick-select face; "Or fill manually" reveals the form).
      await page.getByRole("button", { name: "Add Expense" }).first().click();
      await page.waitForTimeout(900);
      await page.getByRole("button", { name: "Or fill manually" }).click();
      await page.waitForTimeout(600);
      const dateInput = page.locator("#expense-date");
      if (!(await dateInput.count())) throw new Error("229: the expense dialog's date input not found");
      // THE COMPUTED-STYLE READ — the F-252g verification pattern: the
      // retired .dark .input-base literals once carried these values;
      // the token flips alone must carry them now (byte-equal).
      const computed = await page.evaluate(() => {
        const date = document.getElementById("expense-date") as HTMLInputElement | null;
        if (!date) return null;
        const cs = window.getComputedStyle(date);
        const border = cs.borderColor;
        // The placeholder arm: every live input-base consumer is a
        // native date input (no placeholder attribute, and Chrome
        // resolves ::placeholder on date inputs as the element color),
        // so the probe flips the type to text live — the utility's own
        // placeholder rule must read the flipped --color-muted-ink
        // (the retired literal once duplicated it).
        date.type = "text";
        date.setAttribute("placeholder", "probe");
        const ph = window.getComputedStyle(date, "::placeholder").color;
        date.type = "date";
        date.removeAttribute("placeholder");
        return { color: cs.color, placeholder: ph, border };
      });
      if (!computed) throw new Error("229: the computed-style read failed");
      console.log(`[captures-258] 229: the dark date input computes color=${computed.color} placeholder=${computed.placeholder} border=${computed.border}`);
      if (computed.color !== "rgb(245, 245, 244)") {
        throw new Error(`229: the dark input ink is ${computed.color}, expected the flipped --color-ink rgb(245, 245, 244)`);
      }
      if (computed.placeholder !== "rgb(168, 162, 158)") {
        throw new Error(`229: the dark placeholder is ${computed.placeholder}, expected the flipped --color-muted-ink rgb(168, 162, 158)`);
      }
      await page.screenshot({ path: `${OUT}/229-session258-dark-input-flip.png` });
      commit("229-session258-dark-input-flip.png", "the Add Expense dialog in the dark default — the date input's ink and placeholder computing the flipped token values (the F-258b retirement proven live: the flips alone carry them)");
      await page.close();
    }

    // ---- 230: THE RENDER-CAP FACE (the F-258e cure, live) ----------------
    {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      // Bulk-create expenses past the cap through the sessioned API
      // (the writes bucket allows 60/15min; 45 posts fit in one pass —
      // the seeded 72 + 45 = 117 > 100).
      const created = await page.evaluate(async () => {
        let okCount = 0;
        for (let i = 1; i <= 45; i++) {
          const res = await fetch("/api/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              description: `Capture Bulk ${String(i).padStart(2, "0")}`,
              amount: 1.11,
              type: "expense",
              date: "2026-11-01",
            }),
          });
          const body = (await res.json()) as { ok?: boolean };
          if (body.ok) okCount++;
        }
        return okCount;
      });
      console.log(`[captures-258] 230: bulk-created ${created}/45 expenses past the cap`);
      if (created < 29) throw new Error(`230: only ${created} bulk creates landed — cannot clear the 100 cap from the 72-row seed`);
      await page.reload({ waitUntil: "networkidle" });
      await page.waitForTimeout(2000);
      // The cap census: exactly 100 list rows render, and the rider
      // names the truncation.
      const rowCount = await page.locator("ul.divide-y > li").count();
      console.log(`[captures-258] 230: the history renders ${rowCount} rows (cap ${HISTORY_RENDER_CAP})`);
      if (rowCount !== HISTORY_RENDER_CAP) {
        throw new Error(`230: expected exactly ${HISTORY_RENDER_CAP} rendered rows, got ${rowCount}`);
      }
      const rider = page.getByText("Showing the first 100 of", { exact: false });
      if (!(await rider.count())) throw new Error("230: the truncation rider did not render");
      const riderText = await rider.first().textContent();
      console.log(`[captures-258] 230: the rider reads "${(riderText ?? "").trim()}"`);
      if (!riderText?.includes("refine the search or filters")) {
        throw new Error("230: the rider is missing the escape-hatch phrase");
      }
      await page.screenshot({ path: `${OUT}/230-session258-expenses-render-cap.png` });
      commit("230-session258-expenses-render-cap.png", "the expenses history past the cap — exactly 100 rows rendered with the truncation rider naming the count and the escape hatch (the F-258e cure proven live)");
      await page.close();
    }

    await browser.close();
  } catch (err) {
    console.error(`[captures-258] ${(err as Error).message}`);
    exitCode = 1;
  } finally {
    if (spawned) {
      try {
        process.kill(-spawned.pid!, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
  }
  if (exitCode === 0) exitCode = await censusTripwire();
  process.exit(exitCode);
}

void main();
