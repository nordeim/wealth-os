// Session-224 evidence captures (R-21 — the date-guard completion
// and resilience-surface round). Six faces freeze the post-round
// surfaces with the R-21 behavior asserted in-DOM:
// 111: the import-preview date guards (the F-224a/c cures — asserted
//      in America/New_York: "2026 Nov 15 10:00" previews Nov 15 (the
//      day-carrying reversed twin KEEPS staging) while the rolled YMD
//      "2026/02/30 10:00" and the reversed no-day "2026 Nov 10:00"
//      count as skipped (pre-cure: the YMD form staged Mar 2; the
//      no-day form invented day 1))
// 112: the skip-to-content link revealed on the first Tab (the
//      F-224s cure — asserted: pre-focus the link sits in its 1x1
//      sr-only box; Tab reveals a real box and focus lands ON it
//      (pre-cure: no skip link existed — the shell's first Tab ran
//      into the sidebar's ~10 controls))
// 113: the phone 390 DARK Dashboard (the F-224r genus face — asserted:
//      html.dark carries; the nine phone×dark a11y legs are the
//      structural pins, this is the standing perceivable face)
// 114: the phone 390 DARK Expenses with the seeded corpus (the F-224r
//      genus face — asserted: html.dark + "Whole Foods Run" renders)
// 115: the verify view's first-rung answer (the F-224b cure — asserted:
//      a scratch account's first wrong code answers "Invalid
//      verification code. 4 attempts remaining." — the value the
//      no-pending branch now shares (pre-cure: the no-pending probe
//      read "5 attempts remaining", a value the genuine ladder could
//      never produce — the numeric tell; the byte-identical API pair
//      is the e2e pin)
// 116: the drawer Sign Out's login wall (the F-224e honest pair —
//      asserted: the URL is /login, the Welcome heading renders, and
//      NO loading gate lingers (pre-cure world: a failed POST was
//      silently treated as success — the store cleared and navigated
//      regardless; the honesty branch itself is the mocked-fetch unit
//      pin)
// The script boots (or reuses) the dev server on :3000 — the sweep
// convention (delete the platform DATABASE_URL override guard, wait
// on /login) — and kills only what it spawned.
import { chromium, type Page } from "@playwright/test";
import { statSync } from "node:fs";
import { spawn } from "node:child_process";
import * as path from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-224.ts") process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

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
  const bytes = statSync(file).size;
  if (bytes < 30_000) throw new Error(`${file}: suspiciously small (${bytes}B) — blank?`);
  console.log(`[captures-224] ${file} — ${note} (${bytes}B)`);
}

/** The sweep's boot wait (a 200 on the URL). */
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
  // 0. the dev server: reuse :3000 or boot one (the sweep convention).
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${BASE}/login`, 5000)) {
    console.log(`[captures-224] reusing the dev server on ${BASE}`);
  } else {
    console.log("[captures-224] booting the dev server (bun run dev)…");
    // The F-123a1 guard: the platform shell may export a STALE absolute
    // DATABASE_URL; unset it so .env's file:../db/custom.db rides.
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL;
    spawned = spawn("bun", ["run", "dev"], {
      cwd: process.cwd(),
      env: devEnv,
      stdio: "ignore",
      detached: true,
    });
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[captures-224] the dev server never came up on :3000");
      process.exit(1);
    }
    console.log("[captures-224] dev server up");
  }

  try {
    const browser = await chromium.launch();

    // ---- 111: the import-preview date guards (F-224a/c) -------------
    {
      // America/New_York — the house doctrine pins the zone edge (the
      // forms here are TZ-independent at 10:00).
      const page = await browser.newPage({
        viewport: { width: 1440, height: 900 },
        timezoneId: "America/New_York",
      });
      await page.addInitScript(() => {
        try {
          localStorage.setItem("wealthos-theme", "dark");
        } catch {
          /* storage sandbox */
        }
      });
      await login(page, BASE);
      await page.goto(`${BASE}/Import`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      const csv = [
        "Description,Amount,Date,Category",
        "Kept day-carrying,25.00,2026 Nov 15 10:00,Other",
        "Rolled YMD,10.00,2026/02/30 10:00,Other",
        "Reversed no-day,5.00,2026 Nov 10:00,Other",
      ].join("\n");
      await page.setInputFiles('input[type="file"]', {
        name: "bank.csv",
        mimeType: "text/csv",
        buffer: Buffer.from(csv, "utf8"),
      });
      await page.getByRole("button", { name: /upload and extract/i }).click();
      await page.waitForTimeout(1500);
      const preview = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll("tbody tr"));
        const cells = rows.flatMap((r) =>
          Array.from(r.querySelectorAll("td")).map((td) => td.textContent ?? ""),
        );
        const skipped =
          document.querySelector('[class*="text-orange"], [class*="amber"]')?.textContent ?? "";
        return { cells, skipped, rowCount: rows.length };
      });
      // F-224c: the day-carrying reversed twin KEEPS staging its day.
      if (!preview.cells.some((c) => /Nov\s*15/.test(c))) {
        throw new Error(
          `111: the day-carrying reversed form must keep staging Nov 15 — got ${JSON.stringify(preview.cells)}`,
        );
      }
      // F-224a: the ROLLED YMD form is skipped (pre-cure: staged Mar 2).
      if (preview.cells.some((c) => /Mar\s*2/.test(c))) {
        throw new Error(
          `111: the rolled YMD form must be skipped — got ${JSON.stringify(preview.cells)}`,
        );
      }
      // F-224c: the reversed no-day form is skipped — exactly the
      // day-carrying row previews (pre-cure: invented day 1 → 2 rows).
      if (preview.rowCount !== 1) {
        throw new Error(
          `111: exactly the day-carrying row previews (${preview.rowCount} rows) — got ${JSON.stringify(preview.cells)}`,
        );
      }
      await page.screenshot({ path: `${OUT}/111-session224-import-date-guards.png`, fullPage: false });
      commit(
        `${OUT}/111-session224-import-date-guards.png`,
        "F-224a/c cures — '2026 Nov 15 10:00' stages Nov 15; the rolled YMD + reversed no-day forms skip",
      );
      await page.close();
    }

    // ---- 112: the skip link revealed on the first Tab (F-224s) ------
    {
      const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1200);
      const skip = page.getByRole("link", { name: "Skip to main content" });
      // Pre-focus: the sr-only pattern — a 1x1 clipped box.
      const before = await skip.boundingBox();
      if (before?.width !== 1 || before?.height !== 1) {
        throw new Error(
          `112: pre-focus the link must sit in its 1x1 sr-only box — got ${JSON.stringify(before)}`,
        );
      }
      await page.keyboard.press("Tab");
      await skip.waitFor({ state: "visible", timeout: 5000 });
      const after = await skip.boundingBox();
      if (!after || after.width <= 50) {
        throw new Error(
          `112: on focus the link must reveal a real box — got ${JSON.stringify(after)}`,
        );
      }
      const onLink = await page.evaluate(() =>
        document.activeElement?.textContent?.includes("Skip to main content") ?? false,
      );
      if (!onLink) throw new Error("112: the first Tab must land focus ON the skip link");
      await page.screenshot({ path: `${OUT}/112-session224-skip-link-revealed.png`, fullPage: false });
      commit(
        `${OUT}/112-session224-skip-link-revealed.png`,
        "F-224s cure — the sr-only skip link reveals on the first Tab (1x1 → a real box, focus on it)",
      );
      await page.close();
    }

    // ---- 113 + 114: the phone 390 DARK genus faces (F-224r) ---------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await page.addInitScript(() => {
        try {
          localStorage.setItem("wealthos-theme", "dark");
        } catch {
          /* storage sandbox */
        }
      });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      const darkDash = await page.evaluate(() =>
        document.documentElement.classList.contains("dark"),
      );
      if (!darkDash) throw new Error("113: the phone dark Dashboard must carry html.dark");
      await page.screenshot({ path: `${OUT}/113-session224-phone-dark-dashboard.png`, fullPage: false });
      commit(
        `${OUT}/113-session224-phone-dark-dashboard.png`,
        "F-224r genus — the phone 390 dark Dashboard (html.dark asserted)",
      );
      await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      const darkExp = await page.evaluate(() =>
        document.documentElement.classList.contains("dark"),
      );
      if (!darkExp) throw new Error("114: the phone dark Expenses must carry html.dark");
      const seeded = await page.getByText("Whole Foods Run").first().isVisible();
      if (!seeded) throw new Error("114: the seeded expense must render (the standing corpus)");
      await page.screenshot({ path: `${OUT}/114-session224-phone-dark-expenses.png`, fullPage: false });
      commit(
        `${OUT}/114-session224-phone-dark-expenses.png`,
        "F-224r genus — the phone 390 dark Expenses with the seeded corpus",
      );
      await page.close();
    }

    // ---- 115: the verify view's first-rung answer (F-224b) ----------
    {
      // The auth faces render their light genus (no theme write).
      const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
      const email = `e2e-capture-${Date.now()}@example.com`;
      const signup = await page.request.post(`${BASE}/api/auth/signup`, {
        data: { email, password: "TestPass123" },
      });
      if (!signup.ok()) throw new Error("115: the scratch signup failed");
      const signupBody = (await signup.json()) as {
        data?: { verificationCode?: string | null };
      };
      const realCode = signupBody.data?.verificationCode ?? null;
      if (!realCode || !/^\d{6}$/.test(realCode)) {
        throw new Error("115: the in-app OTP must carry the code (the dev posture)");
      }
      // The UI signin — the 403 arm lands the verify view.
      await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1200);
      await page.fill('input[type="email"]', email);
      await page.fill('input[type="password"]', "TestPass123");
      await page.getByRole("button", { name: "Sign in" }).click();
      await page.getByRole("heading", { name: "Verify your email" }).waitFor({ timeout: 10_000 });
      // The wrong code — deterministic (never the real one).
      const wrongCode = realCode === "000000" ? "000001" : "000000";
      for (let i = 0; i < 6; i++) {
        await page.getByLabel(`Digit ${i + 1}`).fill(wrongCode[i] ?? "0");
      }
      await page.getByRole("button", { name: "Verify email" }).click();
      const alert = page.getByRole("alert").filter({ hasText: /4 attempts remaining/ });
      await alert.waitFor({ timeout: 10_000 });
      await page.screenshot({ path: `${OUT}/115-session224-verify-first-rung.png`, fullPage: false });
      commit(
        `${OUT}/115-session224-verify-first-rung.png`,
        "F-224b cure — the first wrong code answers '4 attempts remaining' (the first rung)",
      );
      await page.close();
    }

    // ---- 116: the drawer Sign Out's login wall (F-224e) -------------
    {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await login(page, BASE);
      await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      const drawer = page.getByRole("dialog");
      await drawer.getByRole("button", { name: "Sign Out" }).waitFor({ timeout: 10_000 });
      await drawer.getByRole("button", { name: "Sign Out" }).click();
      await page.waitForURL("**/login**", { timeout: 15_000 });
      await page
        .getByRole("heading", { name: "Welcome to WealthOS" })
        .waitFor({ timeout: 10_000 });
      // The dead-end guard: no lingering loading block.
      const loading = await page.getByText("Loading your workspace").count();
      if (loading !== 0) {
        throw new Error("116: the loading gate survived the drawer sign-out — the dead-end is back");
      }
      await page.screenshot({ path: `${OUT}/116-session224-drawer-signout-wall.png`, fullPage: false });
      commit(
        `${OUT}/116-session224-drawer-signout-wall.png`,
        "F-224e honest pair — the drawer Sign Out lands the login wall, no loading gate",
      );
      await page.close();
    }

    await browser.close();
    console.log("[captures-224] all faces committed (111-116)");
  } finally {
    if (spawned?.pid) {
      try {
        process.kill(-spawned.pid, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
  }
}

main().catch((err) => {
  console.error(`[captures-224] FAILED: ${err.message}`);
  process.exit(1);
});
