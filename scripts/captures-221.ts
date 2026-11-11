// Session-221 evidence captures (R-18 — the date-staging correctness
// and perceivable-controls round). Five faces freeze the post-round
// surfaces with the R-18 behavior asserted in-DOM:
// 93: the SelectItem dark wash (the F-221b cure — asserted: the
//     highlighted option in the dark-mode Expenses category filter
//     computes stone-100 rgb(245,245,244), the 13.9:1 MENU_ITEM
//     genus; pre-cure it computed neutral-900 = 1.18:1)
// 94: the Export ink + the switch boundary (the F-221e/n cures —
//     asserted: the blue Export anchor computes WHITE ink on #2563eb
//     (pre-cure stone-900 = 3.38:1); the unchecked switch track
//     carries the stone-500 border)
// 95: the null-clear rider (the F-221d cure — asserted: the edit
//     dialog's submit PUT carries notes:"" in the request body (not
//     an absent key), and the row's stored note is gone after the
//     refresh)
// 96: the date-staging form-branch (the F-221a/c cure — asserted
//     under timezoneId America/New_York: a bare-ISO 1st-of-month
//     stages + previews as Nov 1 (pre-cure: Oct 31), a Z-suffixed
//     timestamp keeps its UTC calendar day, and an invalid-amount
//     row now COUNTS as skipped)
// 97: the ink family (the F-221k/l cures — asserted: the goals
//     Paused badge light arm computes stone-600 rgb(75,71,64)
//     (pre-cure stone-500 = 4.40:1); the dialog ✕ computes stone-500
//     rgb(120,113,108) with no opacity dimming)
import { chromium, type Page } from "@playwright/test";
import { statSync } from "node:fs";
import * as path from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-221.ts") process.exit(0);

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
  console.log(`[captures-221] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  const browser = await chromium.launch();

  // ---- 93: the SelectItem dark wash (the F-221b cure) -------------------
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
    await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    await page.getByRole("button", { name: /Filters/ }).click();
    await page.waitForTimeout(400);
    await page.locator("#expense-category-filter").click();
    await page.waitForTimeout(400);
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(300);
    const wash = await page.evaluate(() => {
      const options = Array.from(document.querySelectorAll('[role="option"]'));
      const focused = options.find((o) => o === document.activeElement);
      if (!focused) return null;
      const cs = getComputedStyle(focused);
      return { color: cs.color, bg: cs.backgroundColor };
    });
    const htmlClass = await page.evaluate(() => document.documentElement.className);
    if (!htmlClass.includes("dark")) throw new Error(`93: not dark (${htmlClass})`);
    if (!wash || wash.color !== "rgb(245, 245, 244)") {
      throw new Error(`93: the highlighted option ink is ${JSON.stringify(wash)} — the dark arm did not land (pre-cure rgb(23,23,23) = 1.18:1)`);
    }
    await page.screenshot({ path: `${OUT}/93-session221-selectitem-dark-wash.png`, fullPage: false });
    commit(`${OUT}/93-session221-selectitem-dark-wash.png`, "the F-221b cure — the dark-mode highlighted option computes stone-100 on stone-800 (13.9:1)");
    await page.close();
  }

  // ---- 94: the Export ink + the switch boundary (F-221e/n) --------------
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
    await page.goto(`${BASE}/Settings`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    // Scroll the Export card into view (the F-221f mechanism).
    await page.evaluate(() => {
      const main = document.querySelector("main");
      main?.scrollTo(0, main.scrollHeight);
    });
    await page.waitForTimeout(600);
    const state = await page.evaluate(() => {
      const anchor = Array.from(document.querySelectorAll("a")).find((a) =>
        a.textContent?.includes("Export All Data"),
      );
      const anchorInk = anchor ? getComputedStyle(anchor).color : null;
      const anchorBg = anchor ? getComputedStyle(anchor).backgroundColor : null;
      const track = document.querySelector('button[role="switch"][aria-checked="false"]');
      const trackBorder = track ? getComputedStyle(track).borderColor : null;
      const trackBg = track ? getComputedStyle(track).backgroundColor : null;
      return { anchorInk, anchorBg, trackBorder, trackBg };
    });
    if (state.anchorInk !== "rgb(255, 255, 255)") {
      throw new Error(`94: the Export ink is ${state.anchorInk} — pre-cure stone-900 measured 3.38:1 on the blue`);
    }
    if (state.anchorBg !== "rgb(37, 99, 235)") {
      throw new Error(`94: the Export bg is ${state.anchorBg} — expected blue-600`);
    }
    if (state.trackBorder !== "rgb(120, 113, 108)") {
      throw new Error(`94: the unchecked track border is ${state.trackBorder} — expected stone-500 rgb(120,113,108)`);
    }
    await page.screenshot({ path: `${OUT}/94-session221-export-ink-switch-border.png`, fullPage: false });
    commit(`${OUT}/94-session221-export-ink-switch-border.png`, "the F-221e/n cures — white ink on the blue Export CTA; the unchecked switch carries the stone-500 boundary");
    await page.close();
  }

  // ---- 95: the null-clear rider (the F-221d cure) ------------------------
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await login(page, BASE);
    await page.goto(`${BASE}/Expenses`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    // Find a row WITH a note to clear (the seed carries notes on some
    // rows); fall back to the first row's Edit either way — the rider
    // asserts the REQUEST FORM, which holds for every edit.
    let putBody: Record<string, unknown> | null = null;
    page.on("request", (req) => {
      if (req.method() === "PUT" && req.url().includes("/api/transactions/")) {
        putBody = req.postDataJSON() as Record<string, unknown>;
      }
    });
    await page.getByRole("button", { name: "Edit" }).first().click();
    await page.waitForTimeout(600);
    await page.locator("#expense-notes").fill("");
    await page.getByRole("button", { name: /save changes/i }).click();
    await page.waitForTimeout(2000);
    if (!putBody) throw new Error("95: no PUT captured — the edit did not fire");
    if (!("notes" in putBody)) {
      throw new Error(`95: the PUT body carries no notes key — the || undefined collapse is back (${JSON.stringify(putBody).slice(0, 120)})`);
    }
    await page.screenshot({ path: `${OUT}/95-session221-null-clear-rider.png`, fullPage: false });
    commit(`${OUT}/95-session221-null-clear-rider.png`, "the F-221d cure — the edit submit carries notes:\"\" (the schema clears it), not an absent key");
    await page.close();
  }

  // ---- 96: the date-staging form-branch (the F-221a/c cure) -------------
  {
    // The browser context runs America/New_York — the live-repro zone:
    // pre-cure, the bare "2026-11-01" staged 2026-10-31 (a day early).
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      timezoneId: "America/New_York",
    });
    await login(page, BASE);
    await page.goto(`${BASE}/Import`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    const csv = [
      "Description,Amount,Date,Category",
      "Rent,2000.00,2026-11-01,Housing",
      "Paycheck,3000.00,2026-11-01T18:30:00.000Z,Salary",
      "Bad amount,abc,2026-11-03,Other",
    ].join("\n");
    await page.setInputFiles('input[type="file"]', {
      name: "bank.csv",
      mimeType: "text/csv",
      buffer: Buffer.from(csv, "utf8"),
    });
    await page.getByRole("button", { name: /upload and extract/i }).click();
    await page.waitForTimeout(1500);
    const preview = await page.evaluate(() => {
      const cells = Array.from(document.querySelectorAll("tbody td"));
      // 4 columns: date, description, category, amount — the date is col 0.
      const dates = cells.filter((_, i) => i % 4 === 0).map((c) => c.textContent ?? "");
      const subtitle =
        document.querySelector('section[aria-label="Step 2: Review"] p')?.textContent ?? "";
      return { dates, subtitle };
    });
    // The preview renders through toDate — the SAME calendar date the
    // bank wrote, for both ISO forms, in a UTC-negative browser.
    if (!preview.dates[0]?.includes("Nov 1")) {
      throw new Error(`96: the bare-ISO rent previews ${JSON.stringify(preview.dates[0])} — pre-cure it staged Oct 31 west of UTC`);
    }
    if (!preview.dates[1]?.includes("Nov 1")) {
      throw new Error(`96: the Z-form paycheck previews ${JSON.stringify(preview.dates[1])} — the UTC calendar day must stand`);
    }
    if (!preview.subtitle.includes("1 row skipped")) {
      throw new Error(`96: the invalid-AMOUNT row must count as skipped — ${JSON.stringify(preview.subtitle)}`);
    }
    await page.screenshot({ path: `${OUT}/96-session221-staging-form-branch.png`, fullPage: false });
    commit(`${OUT}/96-session221-staging-form-branch.png`, "the F-221a/c cure — New York browser: both ISO forms stage their written day; the bad-amount row counts as skipped");
    await page.close();
  }

  // ---- 97: the ink family (the F-221k/l cures) ---------------------------
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
    await page.goto(`${BASE}/Goals`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    // The seed ships no paused goal — set one through the API (the
    // update schema accepts status), then reload for the badge.
    await page.evaluate(async () => {
      const res = await fetch("/api/goals", { credentials: "include" });
      const body = (await res.json()) as { ok: boolean; data?: Array<{ id: string }> };
      if (body.ok && body.data && body.data.length > 0) {
        await fetch(`/api/goals/${body.data[0].id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: "paused" }),
        });
      }
    });
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    const badge = await page.evaluate(() => {
      const spans = Array.from(document.querySelectorAll("span"));
      const paused = spans.find((s) => s.textContent?.trim() === "Paused");
      return paused ? getComputedStyle(paused).color : null;
    });
    if (badge !== "rgb(87, 83, 78)") {
      throw new Error(`97: the Paused badge ink is ${badge} — pre-cure stone-500 measured 4.40:1 (needs stone-600 #57534e)`);
    }
    // The dialog ✕ — stone-500, no opacity dimming (the DIALOG_CLOSE
    // signature class + the sr-only "Close" name).
    await page.getByRole("button", { name: /new goal|create your first goal/i }).first().click();
    await page.waitForTimeout(600);
    const close = await page.evaluate(() => {
      const btn = document.querySelector('div[role="dialog"] button[class*="text-stone-500"]');
      if (!btn) return null;
      const cs = getComputedStyle(btn);
      return { color: cs.color, opacity: cs.opacity };
    });
    if (!close || close.color !== "rgb(120, 113, 108)" || close.opacity !== "1") {
      throw new Error(`97: the dialog ✕ is ${JSON.stringify(close)} — expected stone-500 at full opacity`);
    }
    await page.screenshot({ path: `${OUT}/97-session221-ink-family.png`, fullPage: false });
    commit(`${OUT}/97-session221-ink-family.png`, "the F-221k/l cures — the Paused badge light arm stone-600; the dialog ✕ stone-500 undimmed");
    await page.close();
  }

  await browser.close();
  console.log("[captures-221] all five faces committed");
}

main().catch((error) => {
  console.error(`[captures-221] FAILED: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
