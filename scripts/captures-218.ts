// Session-218 evidence captures (R-15 — the recovery-loop and
// perceivability round). Six faces freeze the post-round surfaces with
// the R-15 behavior asserted in-DOM:
// 71: the signin 403 → the VERIFY VIEW (the F-218a cure — a hash-present
//     account's signin lands the verify view, not the banner dead-end;
//     asserted: the h2 + the email line + the Resend visible)
// 72: the Resend's green banner on that view (the loop CLOSED — the
//     F-217d re-arm now reachable from the client; asserted: the text)
// 73: the Expenses filters popover TOGGLED CLOSED by its own trigger
//     (the F-218b cure — the R-14 regression's own face; asserted:
//     open → trigger click → count 0)
// 74: the toast live region (the F-218h cure — a mutation outcome
//     announced; asserted: the viewport's aria-live="polite" + the
//     toast card rendered, per-card role gone)
// 75: the dark-mode focus ring (the F-218i cure — the token flips;
//     asserted: the focused input's box-shadow carries rgb(245,245,244))
// 76: the Investments type badges (the F-218k cure — the dark-step text
//     over the 10% tints; asserted: a badge's color computes the 600/
//     700-level step). Plus the F-218c export no-store header, fetched
//     with the live session and printed in the log.
import { chromium, type Page } from "@playwright/test";
import { statSync, unlinkSync } from "node:fs";
import * as path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { join } from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-218.ts") process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
// NOTE: the demo password STARTS WITH "$" — always single-quoted in shells.
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

/** The sweep.ts login protocol, verbatim. */
async function login(page: Page) {
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(1500);
}

function commit(file: string, note: string) {
  const bytes = statSync(file).size;
  if (bytes < 30_000) throw new Error(`${file}: suspiciously small (${bytes}B) — blank?`);
  console.log(`[captures-218] ${file} — ${note} (${bytes}B)`);
}

// ---- the own-database boot (session 225, R-22, F-225e) ------------
// The e2e doctrine for the capture family. This set signs up scratch
// accounts; a scratch signup on the DEV database survives the
// owner-scoped reseed — the census MISMATCHed at users=2 (live,
// session 225's intake). The family now rides db/captures.db:
// recreated + seeded per run; the spawned dev server carries
// DATABASE_URL=file:../db/captures.db (an explicit SET — the F-123a1
// stale-override guard, upgraded); a server already on :3000 is a
// REFUSAL, not a reuse — a reused server's database is unknowable
// (that reuse was the defect); and a census tripwire at exit fails
// the run if custom.db is not at its contract state.
const CAPTURES_DB_URL = "file:../db/captures.db";

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
  const child = spawn("bun", ["run", "dev"], {
    cwd: process.cwd(),
    env: devEnv,
    stdio: "ignore",
    detached: true,
  });
  return child;
}

/** F-225e: the census tripwire — custom.db must MATCH at exit. */
function censusTripwire(tag: string): number {
  const censusEnv: NodeJS.ProcessEnv = { ...process.env };
  delete censusEnv.DATABASE_URL; // .env's file:../db/custom.db rides (the F-123a1 guard)
  const census = spawnSync("bun", ["run", "db:census"], {
    cwd: process.cwd(),
    env: censusEnv,
    stdio: "ignore",
  });
  if (census.status !== 0) {
    console.error(`[${tag}] the census tripwire FAILED — custom.db is not at its contract state (reseed with bun run db:seed)`);
    return 1;
  }
  console.log(`[${tag}] the census tripwire: custom.db MATCH`);
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

async function main() {
  // ---- the own-database boot (F-225e) ---------------------------------
  let spawned: ReturnType<typeof spawn> | null = null;
  if (process.env.OUR_URL) {
    console.log(`[captures-218] riding the operator server at ${process.env.OUR_URL} (the documented override; the census tripwire still guards)`);
  } else {
    if (await waitOnUrl(`${BASE}/login`, 2500)) {
      console.error(
        `[captures-218] a server is already on :3000 — stop it first. The capture family must spawn its own server on db/captures.db (F-225e); a reused server's database is unknowable.`,
      );
      process.exit(1);
    }
    console.log(`[captures-218] seeding db/captures.db + booting the dev server on it…`);
    seedCapturesDb();
    spawned = bootCapturesDb();
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error(`[captures-218] the captures dev server never came up on :3000`);
      process.exit(1);
    }
  }
  try {
    const browser = await chromium.launch();

    // ---- 71 + 72: the recovery journey (a throwaway hash-present account) --
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      const recoveryEmail = `e2e-capture-218-${Date.now()}@example.com`;
      await page.request.post(`${BASE}/api/auth/signup`, {
        data: { email: recoveryEmail, password: "TestPass123" },
      });
      await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
      await page.waitForTimeout(800);
      await page.fill('input[type="email"]', recoveryEmail);
      await page.fill('input[type="password"]', "TestPass123");
      await page.click('button[type="submit"]');
      // The F-218a cure: the 403 lands the verify view.
      await page.waitForSelector('h1:has-text("Verify your email")', { timeout: 15000 });
      const verifyState = await page.evaluate((email) => ({
        heading: document.querySelector("h1")?.textContent ?? "",
        emailShown: document.body.textContent?.includes(email) ?? false,
        resend: [...document.querySelectorAll("button")].some((b) => b.textContent === "Resend"),
        bannerDeadEnd: document.body.textContent?.includes("Check your email for the verification code") ?? false,
      }), recoveryEmail);
      if (!verifyState.heading.includes("Verify your email")) throw new Error("71: the verify view did not land");
      if (!verifyState.emailShown) throw new Error("71: the email line missing");
      if (!verifyState.resend) throw new Error("71: the Resend missing");
      await page.screenshot({ path: `${OUT}/71-session218-recovery-verify-view.png`, fullPage: false });
      commit(`${OUT}/71-session218-recovery-verify-view.png`, "the F-218a cure — the signin 403 lands the verify view");

      // 72 — the Resend closes the loop.
      await page.click('button:has-text("Resend")');
      await page.waitForSelector("text=New verification code sent to your email", { timeout: 15000 });
      await page.screenshot({ path: `${OUT}/72-session218-recovery-resend-banner.png`, fullPage: false });
      commit(`${OUT}/72-session218-recovery-resend-banner.png`, "the loop closed — the Resend re-arms (F-217d reachable)");
      await page.close();
    }

    // ---- 73-76: the authenticated faces --------------------------------------
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await login(page);

      // 73 — the filters toggle (the F-218b cure).
      await page.goto(`${BASE}/expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1200);
      const trigger = page.getByRole("button", { name: /^Filters/ });
      await trigger.click();
      await page.waitForSelector('[aria-label="Expense filters"]', { timeout: 10000 });
      await page.waitForTimeout(300);
      await trigger.click();
      await page.waitForTimeout(600);
      const popoverCount = await page.locator('[aria-label="Expense filters"]').count();
      if (popoverCount !== 0) throw new Error(`73: the toggle left the popover open (count ${popoverCount})`);
      await page.screenshot({ path: `${OUT}/73-session218-filters-toggle-closed.png`, fullPage: false });
      commit(`${OUT}/73-session218-filters-toggle-closed.png`, "the F-218b cure — the trigger toggles the popover closed");

      // 74 — the toast live region (the F-218h cure): delete a row, the toast
      // announces. Assert the viewport's aria-live + the card, per-card role gone.
      await page.getByRole("button", { name: /^Filters/ }).click();
      await page.waitForSelector('[aria-label="Expense filters"]', { timeout: 10000 });
      await page.locator("#expense-category-filter").click();
      await page.getByRole("option", { name: /Groceries/ }).click();
      await page.getByRole("button", { name: "Close filters" }).click();
      await page.waitForTimeout(400);
      const firstDelete = page.getByRole("button", { name: /^Delete / }).first();
      await firstDelete.click();
      await page.waitForSelector('[aria-label="Notifications"] [class*="rounded-xl"]', { timeout: 10000 });
      const toastState = await page.evaluate(() => {
        const viewport = document.querySelector('[aria-label="Notifications"]');
        const card = viewport?.querySelector('[class*="rounded-xl"]');
        return {
          live: viewport?.getAttribute("aria-live"),
          cardRole: card?.getAttribute("role"),
          cardText: card?.textContent ?? "",
        };
      });
      if (toastState.live !== "polite") throw new Error(`74: the viewport is not the live region (${toastState.live})`);
      if (toastState.cardRole !== null) throw new Error("74: the per-card role survived");
      if (!/deleted/i.test(toastState.cardText)) throw new Error(`74: the toast text unexpected: ${toastState.cardText}`);
      await page.screenshot({ path: `${OUT}/74-session218-toast-live-region.png`, fullPage: false });
      commit(`${OUT}/74-session218-toast-live-region.png`, "the F-218h cure — the viewport announces (aria-live=polite)");
      // Undo the delete (restore the corpus for the seed-sensitive faces).
      await page.waitForTimeout(4500); // the toast auto-dismisses
      // The corpus: the sweep restores the seed afterwards anyway.

      // 75 — the dark focus ring (the F-218i cure): theme dark, focus the
      // search input, assert the token's flip rides the box-shadow/ring.
      await page.evaluate(() => localStorage.setItem("wealthos-theme", "dark"));
      await page.goto(`${BASE}/expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      await page.getByRole("button", { name: "Add Expense" }).first().click();
      await page.waitForTimeout(600);
      const amountInput = page.locator('input[aria-label="Amount"], input[placeholder*="mount"]').first();
      if ((await amountInput.count()) === 0) {
        // the dialog's amount field by position (the second input after description)
        await page.keyboard.press("Escape");
        await page.locator('input[aria-label="Search expenses"]').focus();
      } else {
        await amountInput.focus();
      }
      await page.waitForTimeout(300);
      const ring = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return { shadow: "none", outline: "none" };
        const cs = getComputedStyle(el);
        return { shadow: cs.boxShadow, outline: cs.outlineColor };
      });
      // --color-ring: #f5f5f4 → rgb(245, 245, 244) on the focused input.
      if (!/245,\s*245,\s*244/.test(ring.shadow)) {
        throw new Error(`75: the dark ring did not flip (${JSON.stringify(ring)})`);
      }
      await page.screenshot({ path: `${OUT}/75-session218-dark-focus-ring.png`, fullPage: false });
      commit(`${OUT}/75-session218-dark-focus-ring.png`, "the F-218i cure — the ring token flips in dark (rgb(245,245,244))");
      await page.keyboard.press("Escape");
      await page.evaluate(() => localStorage.setItem("wealthos-theme", "light"));

      // 76 — the Investments badges (the F-218k cure).
      await page.goto(`${BASE}/investments`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      const badge = await page.evaluate(() => {
        const spans = [...document.querySelectorAll("span")].filter(
          (s) => s.className.includes("rounded-full") && s.parentElement?.tagName === "TD",
        );
        const first = spans[0];
        if (!first) return null;
        return { text: first.textContent ?? "", color: getComputedStyle(first).color };
      });
      if (!badge) throw new Error("76: no badge found");
      // The dark steps: stock #1d4ed8, etf #047857, bond #b45309, crypto
      // #6d28d9, realestate #be123c, other #57534e — none the 500-level fills.
      const steps: Array<[string, string]> = [
        ["Stock", "rgb(29, 78, 216)"], ["ETF", "rgb(4, 120, 87)"],
        ["Bond", "rgb(180, 83, 9)"], ["Crypto", "rgb(109, 40, 217)"],
        ["Real Estate", "rgb(190, 18, 60)"], ["Other", "rgb(87, 83, 78)"],
      ];
      const expected = steps.find(([label]) => label === badge.text)?.[1];
      if (!expected || badge.color !== expected) {
        throw new Error(`76: the badge "${badge.text}" computes ${badge.color} (expected ${expected})`);
      }
      await page.screenshot({ path: `${OUT}/76-session218-investment-badges.png`, fullPage: false });
      commit(`${OUT}/76-session218-investment-badges.png`, `the F-218k cure — the badge text rides the dark step (${badge.text} ${badge.color})`);

      // The F-218c export header (fetched with the live session, printed).
      const exportRes = await page.request.get(`${BASE}/api/export`);
      const cc = exportRes.headers()["cache-control"];
      console.log(`[captures-218] /api/export cache-control: ${cc} (F-218c — expected no-store)`);
      if (cc !== "no-store") throw new Error(`F-218c: the export header is "${cc}"`);

      await page.close();
    }

    await browser.close();
    console.log("[captures-218] all six faces + the export header verified");
  } finally {
    if (spawned?.pid) {
      try {
        process.kill(-spawned.pid, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
    if (censusTripwire('captures-218') !== 0) process.exit(1);
  }
}

main().catch((e) => {
  console.error(`[captures-218] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
