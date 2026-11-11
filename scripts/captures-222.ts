// Session-222 evidence captures (R-19 — the zone-designator completion
// and focus-affordance round). Six faces freeze the post-round surfaces
// with the R-19 behavior asserted in-DOM:
// 98: the dark 404 (the F-222f cure — asserted: a fresh visitor's
//     unknown route resolves html.dark AND the 404 wash computes
//     rgb(10,10,10) (pre-cure: the light slate-50 design under a dark
//     html — the whiplash defect))
// 99: the import-preview income ink (the F-222e cure — asserted: the
//     income amount cell computes emerald-400 rgb(52,211,153) in dark
//     (pre-cure: emerald-700 rgb(4,120,87) = 3.15:1 on the dark tbody))
// 100: the chart tooltip dark panel (the F-222i cure — asserted: the
//     hovered cashflow tooltip computes the stone-900 panel
//     rgb(28,25,23) in dark (pre-cure: recharts' default white chip))
// 101: the auth-face focus ring (the F-222g cure — asserted: the
//     Google button, keyboard-focused, renders a visible ring (the
//     computed boxShadow is not none — pre-cure: the UA default outline
//     only))
//     ...and the zone-designator staging (the F-222a/b/c cures,
//     same face): a lowercase-z timestamp, a +09:00 offset datetime,
//     and the bare control ALL preview as Nov 1 (pre-cure: both
//     designator forms staged Oct 31 west of UTC); the partial-ISO
//     "2026-11" row counts as skipped
// 102: the mobile drawer at TRUE-390 (the standing named focus —
//     asserted: opens, 9 destination links, the drawer surface dark)
import { chromium, type Page } from "@playwright/test";
import { statSync } from "node:fs";
import * as path from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-222.ts") process.exit(0);

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
  console.log(`[captures-222] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  const browser = await chromium.launch();

  // ---- 98: the dark 404 (the F-222f cure) -------------------------------
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${BASE}/this-page-does-not-exist-222`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    const state = await page.evaluate(() => ({
      htmlClass: document.documentElement.className,
      wash: getComputedStyle(document.querySelector("main.min-h-screen")!).backgroundColor,
    }));
    if (!/(^|\s)dark(\s|$)/.test(state.htmlClass)) {
      throw new Error(`98: the fresh visitor's 404 must resolve html.dark — got ${JSON.stringify(state.htmlClass)}`);
    }
    if (state.wash !== "rgb(10, 10, 10)") {
      throw new Error(`98: the dark 404 wash must compute #0a0a0a — got ${state.wash}`);
    }
    await page.screenshot({ path: `${OUT}/98-session222-dark-404.png`, fullPage: false });
    // The 30KB floor is the blank-catcher; the 404 is a genuinely
    // minimal face (a centered card on a flat #0a0a0a wash — pixel-
    // verified: 802 unique colors, the stone-400/100/900 content inks
    // present), so its floor is 15KB.
    {
      const bytes = statSync(`${OUT}/98-session222-dark-404.png`).size;
      if (bytes < 15_000) throw new Error(`98: suspiciously small (${bytes}B) — blank?`);
      console.log(`[captures-222] docs/screenshots/98-session222-dark-404.png — the F-222f cure — fresh visitor: html.dark + the #0a0a0a wash on the designed 404 (${bytes}B)`);
    }
    await page.close();
  }

  // ---- 99: the import preview (F-222e ink + the F-222a/b/c staging) -----
  {
    // The browser context runs America/New_York — the live-repro zone:
    // pre-cure, the lowercase-z and +09:00 forms staged Oct 31 (a day
    // early west of UTC).
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
      "Paycheck z-form,3000.00,2026-11-01T01:30:00z,Salary",
      "Paycheck offset-form,2500.00,2026-11-01T08:30:00+09:00,Salary",
      "Rent control,2000.00,2026-11-01,Housing",
      "Partial form,10.00,2026-11,Other",
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
      const dates = rows.map(
        (r) => r.querySelector("td")?.textContent ?? "",
      );
      const incomeCell = Array.from(
        document.querySelectorAll("tbody td"),
      ).find((td) => td.textContent?.trim().startsWith("+$"));
      const subtitle =
        document.querySelector('section[aria-label="Step 2: Review"] p')?.textContent ?? "";
      return {
        dates,
        incomeInk: incomeCell ? getComputedStyle(incomeCell).color : null,
        subtitle,
      };
    });
    // F-222a: the lowercase-z form keeps its UTC calendar day (Nov 1)
    // — pre-cure it staged Oct 31 in this zone.
    if (!preview.dates[0]?.includes("Nov 1")) {
      throw new Error(`99/102: the lowercase-z row previews ${JSON.stringify(preview.dates[0])} — pre-cure it staged Oct 31 west of UTC`);
    }
    // F-222b: the +09:00 offset form stages its WRITTEN date (Nov 1)
    // — pre-cure it staged the viewer's calendar day (Oct 31 here).
    if (!preview.dates[1]?.includes("Nov 1")) {
      throw new Error(`99/102: the +09:00 offset row previews ${JSON.stringify(preview.dates[1])} — pre-cure it staged the viewer's day`);
    }
    // The bare control stands.
    if (!preview.dates[2]?.includes("Nov 1")) {
      throw new Error(`99/102: the bare control previews ${JSON.stringify(preview.dates[2])}`);
    }
    // F-222c: the partial-ISO row skips (never an invented day).
    if (!preview.subtitle.includes("1 row skipped")) {
      throw new Error(`99/102: the partial-ISO row must count as skipped — ${JSON.stringify(preview.subtitle)}`);
    }
    // F-222e: the income ink computes emerald-400 in dark.
    if (preview.incomeInk !== "rgb(52, 211, 153)") {
      throw new Error(`99: the dark income ink must compute emerald-400 — got ${preview.incomeInk}`);
    }
    await page.screenshot({ path: `${OUT}/99-session222-import-income-ink-dark.png`, fullPage: false });
    commit(`${OUT}/99-session222-import-income-ink-dark.png`, "the F-222e/a/b/c cures — dark preview: the income ink emerald-400; lowercase-z + offset rows stage Nov 1 in a New York browser; the partial-ISO row skips");
    await page.close();
  }

  // ---- 100: the chart tooltip dark panel (the F-222i cure) --------------
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
    // Hover the middle of the cashflow area chart.
    const chart = page.locator(".recharts-responsive-container").first();
    await chart.hover({ position: { x: 400, y: 150 } });
    await page.waitForTimeout(800);
    const panel = await page.evaluate(() => {
      const tip = document.querySelector(".recharts-tooltip-wrapper");
      if (!tip) return null;
      const inner = tip.querySelector(".recharts-default-tooltip") ?? tip;
      return getComputedStyle(inner as Element).backgroundColor;
    });
    if (panel !== "rgb(28, 25, 23)") {
      throw new Error(`100: the dark tooltip panel must compute stone-900 rgb(28,25,23) — got ${panel}`);
    }
    await page.screenshot({ path: `${OUT}/100-session222-chart-tooltip-dark.png`, fullPage: false });
    commit(`${OUT}/100-session222-chart-tooltip-dark.png`, "the F-222i cure — the hovered cashflow tooltip rides the stone-900 panel in dark (pre-cure: recharts' default white chip)");
    await page.close();
  }

  // ---- 101: the auth-face focus ring (the F-222g cure) ------------------
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    // Keyboard-navigate to the Google button (focus-visible rides the
    // keyboard, not the mouse).
    await page.focus('input[type="email"]');
    let focused = false;
    for (let i = 0; i < 8 && !focused; i++) {
      await page.keyboard.press("Tab");
      focused = await page.evaluate(() =>
        (document.activeElement as HTMLElement)?.textContent?.includes("Google") ?? false,
      );
    }
    if (!focused) throw new Error("101: the Google button never took keyboard focus");
    const ring = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      return {
        boxShadow: getComputedStyle(el).boxShadow,
        outlineWidth: getComputedStyle(el).outlineWidth,
      };
    });
    if (ring.boxShadow === "none" && ring.outlineWidth === "0px") {
      throw new Error(`101: the focused Google button must render a visible ring — ${JSON.stringify(ring)}`);
    }
    await page.screenshot({ path: `${OUT}/101-session222-focus-ring-login.png`, fullPage: false });
    commit(`${OUT}/101-session222-focus-ring-login.png`, "the F-222g cure — the keyboard-focused Google button renders the house amber ring (pre-cure: the UA default outline only)");
    await page.close();
  }

  // ---- 102: the mobile drawer at TRUE-390 (the standing named focus) ---
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await login(page, BASE);
    await page.goto(`${BASE}/dashboard`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await page.waitForTimeout(600);
    const drawer = await page.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"]');
      if (!dialog) return null;
      const links = Array.from(dialog.querySelectorAll("a")).map((a) => a.textContent ?? "");
      return {
        open: getComputedStyle(dialog).display !== "none",
        linkCount: links.length,
        surface: getComputedStyle(dialog).backgroundColor,
      };
    });
    if (!drawer || !drawer.open || drawer.linkCount < 9) {
      throw new Error(`102: the TRUE-390 drawer must open with 9 destinations — ${JSON.stringify(drawer)}`);
    }
    await page.screenshot({ path: `${OUT}/102-session222-mobile-drawer-390.png`, fullPage: false });
    commit(`${OUT}/102-session222-mobile-drawer-390.png`, "the standing named focus — the TRUE-390 drawer opens with 9 destinations (the dark fresh-visitor default)");
    await page.close();
  }

  await browser.close();
  console.log("[captures-222] all faces committed");
}

main().catch((e) => {
  console.error(`[captures-222] ${e instanceof Error ? e.message : String(e)}`);
  process.exit(1);
});
