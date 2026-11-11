// Session-223 evidence captures (R-20 — the dead-signout and
// dark-surface completion round). Eight faces freeze the post-round
// surfaces with the R-20 behavior asserted in-DOM:
// 103: the desktop user menu open (the F-223a stage — asserted: the
//     menu renders Dark Mode + Sign Out at 1280×800)
// 104: the login wall AFTER the desktop sign-out (the F-223a cure —
//     asserted: the URL is /login and the Welcome heading renders
//     (pre-cure: the bare logout() dead-ended on the "Loading your
//     workspace…" gate — the store cleared, nothing navigated))
// 105: the light-mode desktop sidebar's synced pill (the F-223f cure
//     — asserted: the pill computes green-400 rgb(74,222,128) on the
//     always-dark sidebar (pre-cure: green-700 rgb(21,128,61) =
//     3.49:1 in light mode))
// 106: the investments type chips in dark (the F-223g cure —
//     asserted: the Stock chip's ink computes the 400-level
//     rgb(147,197,253) (pre-cure: blue-700 rgb(29,78,216) = 2.02:1
//     on the dark tint))
// 107: the income icon tiles in dark (the F-223i cure — asserted:
//     the salary tile computes the 10%-alpha rgba(16,185,129,0.1)
//     (pre-cure: the hex pastel rgb(236,253,245) — a bright light
//     chip on the dark card))
// 108: the AI-coach suggested chips + Send with the keyboard ring
//     (the F-223h cure — asserted: the focused chip's computed
//     boxShadow is not none (pre-cure: the UA default outline only))
// 109: the dark dashboard donut tooltip (the F-223c cure — asserted:
//     the hovered Expense-Breakdown tooltip computes the stone-900
//     panel rgb(28,25,23) (pre-cure: recharts' default white chip))
// 110: the import-preview time-suffixed staging (the F-223d/e cures
//     — asserted in America/New_York: "11/01/2026 10:00" previews
//     Nov 1 (keeps staging) while "02/30/2026 10:00" and "Nov 2026"
//     count as skipped (pre-cure: the rolled form staged Mar 2; the
//     month-only form invented Nov 1))
import { chromium, type Page } from "@playwright/test";
import { statSync } from "node:fs";
import * as path from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-223.ts") process.exit(0);

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
  console.log(`[captures-223] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  const browser = await chromium.launch();

  // ---- 103 + 104: the desktop sign-out round-trip (F-223a) -----------
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await login(page, BASE);
    await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    // Open the sidebar footer's user menu.
    await page.getByRole("button", { name: /sepnetflix2023/ }).click();
    const menu = page.getByRole("menu");
    await menu.getByRole("menuitem", { name: "Dark Mode" }).waitFor({ timeout: 5000 });
    await menu.getByRole("menuitem", { name: "Sign Out" }).waitFor({ timeout: 5000 });
    await page.screenshot({ path: `${OUT}/103-session223-desktop-usermenu-open.png`, fullPage: false });
    commit(
      `${OUT}/103-session223-desktop-usermenu-open.png`,
      "F-223a stage — the desktop user menu renders Dark Mode + Sign Out",
    );

    // The cure: the click navigates (pre-cure: the loading gate).
    await menu.getByRole("menuitem", { name: "Sign Out" }).click();
    await page.waitForURL("**/login**", { timeout: 15000 });
    await page
      .getByRole("heading", { name: "Welcome to WealthOS" })
      .waitFor({ timeout: 10000 });
    // The dead-end guard: no lingering loading block.
    const loading = await page.getByText("Loading your workspace").count();
    if (loading !== 0) {
      throw new Error("104: the loading gate survived the desktop sign-out — the dead-end is back");
    }
    await page.screenshot({ path: `${OUT}/104-session223-desktop-signout-login-wall.png`, fullPage: false });
    commit(
      `${OUT}/104-session223-desktop-signout-login-wall.png`,
      "F-223a cure — the desktop sign-out lands on the login wall (no loading gate)",
    );
    await page.close();
  }

  // ---- 105: the light-mode synced pill on the desktop sidebar (F-223f)
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript(() => {
      try {
        localStorage.setItem("wealthos-theme", "light");
      } catch {
        /* storage sandbox */
      }
    });
    await login(page, BASE);
    await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    const pillInk = await page.evaluate(() => {
      const pill = Array.from(
        document.querySelectorAll<HTMLSpanElement>("aside span"),
      ).find((s) => s.textContent?.includes("Synced"));
      return pill ? getComputedStyle(pill).color : null;
    });
    if (pillInk !== "rgb(74, 222, 128)") {
      throw new Error(
        `105: the desktop pill must compute green-400 rgb(74,222,128) — got ${pillInk}`,
      );
    }
    await page.screenshot({ path: `${OUT}/105-session223-sidebar-pill-light.png`, fullPage: false });
    commit(
      `${OUT}/105-session223-sidebar-pill-light.png`,
      "F-223f cure — light mode: the synced pill reads green-400 on the always-dark sidebar",
    );
    await page.close();
  }

  // ---- 106: the investments type chips in dark (F-223g) ---------------
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript(() => {
      try {
        localStorage.setItem("wealthos-theme", "dark");
      } catch {
        /* storage sandbox */
      }
    });
    await login(page, BASE);
    await page.goto(`${BASE}/Investments`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    const chipInk = await page.evaluate(() => {
      const chip = Array.from(document.querySelectorAll("td span")).find((s) =>
        s.textContent?.trim() === "Stock",
      );
      return chip ? getComputedStyle(chip).color : null;
    });
    if (chipInk !== "rgb(147, 197, 253)") {
      throw new Error(
        `106: the Stock chip must compute the 400-level rgb(147,197,253) in dark — got ${chipInk}`,
      );
    }
    await page.screenshot({ path: `${OUT}/106-session223-investments-chips-dark.png`, fullPage: false });
    commit(
      `${OUT}/106-session223-investments-chips-dark.png`,
      "F-223g cure — dark: the type chips read their 400-level inks on the tinted tiles",
    );
    await page.close();
  }

  // ---- 107: the income icon tiles in dark (F-223i) --------------------
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript(() => {
      try {
        localStorage.setItem("wealthos-theme", "dark");
      } catch {
        /* storage sandbox */
      }
    });
    await login(page, BASE);
    await page.goto(`${BASE}/Income`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    const tile = await page.evaluate(() => {
      const el = document.querySelector<HTMLSpanElement>(
        'span[class*="h-10"][class*="rounded-lg"]',
      );
      return el ? getComputedStyle(el).backgroundColor : null;
    });
    if (tile !== "rgba(16, 185, 129, 0.1)") {
      throw new Error(
        `107: the salary tile must compute the 10%-alpha rgba(16,185,129,0.1) in dark — got ${tile}`,
      );
    }
    await page.screenshot({ path: `${OUT}/107-session223-income-tiles-dark.png`, fullPage: false });
    commit(
      `${OUT}/107-session223-income-tiles-dark.png`,
      "F-223i cure — dark: the icon tiles carry the alpha tint (no bright pastel chips)",
    );
    await page.close();
  }

  // ---- 108: the AI-coach chips with the keyboard ring (F-223h) --------
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
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
    await page.getByRole("button", { name: /ai coach/i }).click();
    const dialog = page.getByRole("dialog");
    await dialog.waitFor({ timeout: 5000 });
    await page.waitForTimeout(600);
    // Keyboard-focus a suggested-question chip: click the input (focus
    // anchor), then Shift+Tab — the LAST chip takes keyboard focus, and
    // :focus-visible only honors real keyboard navigation (a bare
    // el.focus() computes none).
    await dialog.locator('input[aria-label="Ask the AI coach a question"]').click();
    await page.keyboard.press("Shift+Tab");
    await page.waitForTimeout(300);
    const ring = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? getComputedStyle(el).boxShadow : null;
    });
    if (!ring || ring === "none") {
      throw new Error(`108: the focused coach chip must render a ring — got ${JSON.stringify(ring)}`);
    }
    const focusedText = await page.evaluate(() => document.activeElement?.textContent ?? "");
    if (!focusedText.trim()) {
      throw new Error("108: the focused element is not a suggested chip");
    }
    await page.screenshot({ path: `${OUT}/108-session223-coach-chip-ring.png`, fullPage: false });
    commit(
      `${OUT}/108-session223-coach-chip-ring.png`,
      "F-223h cure — the keyboard-focused suggested chip carries the house ring",
    );
    await page.close();
  }

  // ---- 109: the dark dashboard donut tooltip (F-223c) -----------------
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript(() => {
      try {
        localStorage.setItem("wealthos-theme", "dark");
      } catch {
        /* storage sandbox */
      }
    });
    await login(page, BASE);
    await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    // The Expense Breakdown donut is the page's second chart container.
    const donut = page.locator(".recharts-responsive-container").nth(1);
    await donut.scrollIntoViewIfNeeded();
    await donut.hover({ position: { x: 130, y: 90 } });
    await page.waitForTimeout(900);
    const panel = await page.evaluate(() => {
      const tip = document.querySelector(".recharts-tooltip-wrapper");
      const inner = tip?.querySelector(".recharts-default-tooltip");
      return inner ? getComputedStyle(inner).backgroundColor : null;
    });
    if (panel !== "rgb(28, 25, 23)") {
      throw new Error(
        `109: the donut tooltip must compute the stone-900 panel rgb(28,25,23) in dark — got ${panel}`,
      );
    }
    await page.screenshot({ path: `${OUT}/109-session223-donut-tooltip-dark.png`, fullPage: false });
    commit(
      `${OUT}/109-session223-donut-tooltip-dark.png`,
      "F-223c cure — dark: the Expense-Breakdown tooltip rides the stone-900 panel",
    );
    await page.close();
  }

  // ---- 110: the import-preview time-suffixed staging (F-223d/e) -------
  {
    // America/New_York — the F-221a live-repro zone (the forms here are
    // TZ-independent, but the house doctrine pins the zone edges).
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
      "Valid datetime,25.00,11/01/2026 10:00,Other",
      "Rolled datetime,10.00,02/30/2026 10:00,Other",
      "Month only,5.00,Nov 2026,Other",
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
      const dates = rows.map((r) => r.querySelector("td")?.textContent ?? "");
      const skipped =
        document.querySelector('[class*="text-orange"], [class*="amber"]')?.textContent ?? "";
      return { dates, skipped, rowCount: rows.length };
    });
    // F-223d: the VALID time-suffixed form keeps staging its written day.
    if (!preview.dates.some((d) => d.includes("Nov 1"))) {
      throw new Error(
        `110: the valid time-suffixed row must preview Nov 1 — got ${JSON.stringify(preview.dates)}`,
      );
    }
    // F-223d: the ROLLED time-suffixed form is skipped (pre-cure: Mar 2).
    if (preview.dates.some((d) => d.includes("Mar 2"))) {
      throw new Error(
        `110: the rolled time-suffixed form must be skipped — got ${JSON.stringify(preview.dates)}`,
      );
    }
    // F-223e: the month-only form is skipped (pre-cure: invented Nov 1).
    if (preview.rowCount !== 1) {
      throw new Error(
        `110: exactly the valid row previews (${preview.rowCount} rows) — got ${JSON.stringify(preview.dates)}`,
      );
    }
    await page.screenshot({ path: `${OUT}/110-session223-timesuffix-staging.png`, fullPage: false });
    commit(
      `${OUT}/110-session223-timesuffix-staging.png`,
      "F-223d/e cures — the valid datetime stages Nov 1; the rolled + month-only forms skip",
    );
    await page.close();
  }

  await browser.close();
  console.log("[captures-223] all faces committed (103-110)");
}

main().catch((err) => {
  console.error(`[captures-223] FAILED: ${err.message}`);
  process.exit(1);
});
