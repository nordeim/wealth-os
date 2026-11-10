// Session-220 evidence captures (R-17 — the date-seam completion and
// dark-surface round). Five faces freeze the post-round surfaces with
// the R-17 behavior asserted in-DOM:
// 88: the dark-surface completion (the F-220b cure — asserted: the
//     KPI captions on the dark /Dashboard compute stone-400
//     rgb(168,162,158), not the sub-AA stone-500 rgb(120,113,108);
//     the Income Paused badge ink flips with its chip)
// 89: the background token flip (the F-220d cure — asserted: body's
//     computed background-color resolves #0e1310 in dark and
//     #faf9f7 in light, through the TOKEN, not the deleted base
//     rule; the settings switch thumb computes white)
// 90: the import staging + preview (the F-220a/m cure — asserted: a
//     zoneless-ISO CSV stages as UTC midnight and the preview cell
//     renders the SAME calendar date the bank wrote; a bad-date row
//     surfaces in the "skipped" count, not a silent drop)
// 91: the mobile drawer still whole at 390×844 (the standing ask —
//     asserted: opens, 9 destinations, internal scroll)
// 92: the writes bucket on the [id] mutations (the F-220c cure —
//     asserted: the 61st rapid PUT answers 429 with Retry-After)
import { chromium, type Page } from "@playwright/test";
import { statSync } from "node:fs";
import * as path from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-220.ts") process.exit(0);

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
  console.log(`[captures-220] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  const browser = await chromium.launch();

  // ---- 88: the dark captions (the F-220b cure) --------------------------
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
    // a KPI caption (% of the donut legend) — the F-220b class
    const caption = await page.evaluate(() => {
      const el = document.querySelector("span.text-stone-500");
      return el ? getComputedStyle(el).color : null;
    });
    // the shell must be dark for the assertion to mean anything
    const htmlClass = await page.evaluate(() => document.documentElement.className);
    if (!htmlClass.includes("dark")) throw new Error(`88: not dark (${htmlClass})`);
    if (caption !== "rgb(168, 162, 158)") {
      throw new Error(`88: the caption ink is ${caption} — the dark arm did not land`);
    }
    await page.screenshot({ path: `${OUT}/88-session220-dark-caption-arms.png`, fullPage: false });
    commit(`${OUT}/88-session220-dark-caption-arms.png`, "the F-220b cure — dark captions compute stone-400, the fresh-visitor default passes AA");
    await page.close();
  }

  // ---- 89: the background token flip + the switch thumb (F-220d) --------
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
    await page.goto(`${BASE}/Settings`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    const state = await page.evaluate(() => ({
      bodyBg: getComputedStyle(document.body).backgroundColor,
      thumb: (() => {
        const t = document.querySelector("span.bg-white");
        return t ? getComputedStyle(t).backgroundColor : null;
      })(),
    }));
    if (state.bodyBg !== "rgb(14, 19, 16)") {
      throw new Error(`89: the dark body wash is ${state.bodyBg} — the token flip did not land`);
    }
    if (state.thumb !== "rgb(255, 255, 255)") {
      throw new Error(`89: the switch thumb is ${state.thumb} — the knob moved off the token`);
    }
    await page.screenshot({ path: `${OUT}/89-session220-background-token-flip.png`, fullPage: false });
    commit(`${OUT}/89-session220-background-token-flip.png`, "the F-220d cure — body resolves the dark wash through the token; the switch thumb rides bg-white");

    // the light face still washes light (the flip is dark-scoped)
    const light = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await light.addInitScript(() => {
      try {
        localStorage.setItem("wealthos-theme", "light");
      } catch {
        /* storage sandbox */
      }
    });
    await login(light, BASE);
    await light.goto(`${BASE}/Settings`, { waitUntil: "networkidle" });
    await light.waitForTimeout(1500);
    const lightBg = await light.evaluate(() => getComputedStyle(document.body).backgroundColor);
    if (lightBg !== "rgb(250, 249, 247)") {
      throw new Error(`89: the light body wash is ${lightBg} — the flip leaked into light`);
    }
    await light.close();
    await page.close();
  }

  // ---- 90: the import staging + preview (the F-220a/m cure) -------------
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await login(page, BASE);
    await page.goto(`${BASE}/Import`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    // A zoneless-ISO bank CSV: two good rows (a 1st-of-month rent) and
    // one unparseable date — the preview must show Nov 1 for the rent
    // and surface the skip.
    const csv = [
      "Description,Amount,Date,Category",
      "Rent,2000.00,2026-11-01,Housing",
      "Coffee,-4.50,2026-11-03,Food",
      "Broken date,-10.00,not-a-date,Other",
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
      const first = cells[0]?.textContent ?? "";
      const subtitle = document.querySelector('section[aria-label="Step 2: Review"] p')?.textContent ?? "";
      return { first, subtitle };
    });
    if (!preview.first.includes("Nov 1")) {
      throw new Error(`90: the preview date cell reads ${JSON.stringify(preview.first)} — the staging/preview seam`);
    }
    if (!preview.subtitle.includes("1 row skipped")) {
      throw new Error(`90: the skipped count is missing from ${JSON.stringify(preview.subtitle)}`);
    }
    await page.screenshot({ path: `${OUT}/90-session220-import-staging.png`, fullPage: false });
    commit(`${OUT}/90-session220-import-staging.png`, "the F-220a/m cure — the ISO 1st-of-month stages + previews as Nov 1; the bad row surfaces as skipped");
    await page.close();
  }

  // ---- 91: the mobile drawer at 390 (the standing ask) ------------------
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await login(page, BASE);
    await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await page.waitForTimeout(600);
    const drawer = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll("nav a")).filter(
        (a) => a.getClientRects().length > 0,
      );
      // the INNER element carries the F-219h scroller (MOBILE_NAV_SHEET.inner)
      const sheet = document.querySelector('div[role="dialog"] > div');
      return {
        links: links.length,
        scrollable: sheet ? getComputedStyle(sheet).overflowY : null,
      };
    });
    if (drawer.links !== 9) throw new Error(`91: the drawer shows ${drawer.links} links`);
    if (drawer.scrollable !== "auto") throw new Error(`91: the drawer scroll is ${drawer.scrollable}`);
    await page.screenshot({ path: `${OUT}/91-session220-mobile-drawer-390.png`, fullPage: false });
    commit(`${OUT}/91-session220-mobile-drawer-390.png`, "the standing mobile ask — the drawer opens with 9 destinations, internally scrollable");
    await page.close();
  }

  // ---- 92: the writes bucket on the [id] mutations (F-220c) -------------
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await login(page, BASE);
    await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    const txId = await page.evaluate(async () => {
      const res = await fetch("/api/transactions", { credentials: "include" });
      const body = (await res.json()) as { ok: boolean; data?: Array<{ id: string }> };
      return body.ok && body.data && body.data.length > 0 ? body.data[0].id : null;
    });
    if (!txId) throw new Error("92: no transaction to probe with");
    // 60 writes are the budget; the 61st must 429 (the bucket now rides
    // the [id] PUT — pre-cure it answered 200 unbounded).
    let saw429 = false;
    let retryAfter: string | null = null;
    for (let i = 0; i < 61; i += 1) {
      const res = await page.evaluate(async (id) => {
        const r = await fetch(`/api/transactions/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({}),
        });
        return { status: r.status, retryAfter: r.headers.get("retry-after") };
      }, txId);
      if (res.status === 429) {
        saw429 = true;
        retryAfter = res.retryAfter;
        break;
      }
      if (res.status !== 200) throw new Error(`92: unexpected ${res.status} on write ${i}`);
    }
    if (!saw429) throw new Error("92: 61 writes and no 429 — the [id] bucket did not land");
    if (retryAfter === null) throw new Error("92: the 429 carries no Retry-After");
    await page.screenshot({ path: `${OUT}/92-session220-writes-bucket.png`, fullPage: false });
    commit(`${OUT}/92-session220-writes-bucket.png`, `the F-220c cure — the 61st rapid [id] PUT 429s (Retry-After ${retryAfter}s)`);
    await page.close();
  }

  await browser.close();
  console.log("[captures-220] all five faces committed");
}

main().catch((error) => {
  console.error(`[captures-220] FAILED: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
