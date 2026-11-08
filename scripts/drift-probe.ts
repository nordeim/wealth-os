// Session-206 (R-4.3): the REFERENCE-STABILITY DRIFT PROBE — the
// WealthOS re-anchor (the CRM-era S101-P1 tool, its NEO-CRM standing
// layers retired with the R-4.1/R-4.3 page-set re-anchors). The
// probe's question never changed: HAS THE REFERENCE ITSELF MOVED?
// Every drift gate below it (the sweep class tables, the interior
// census) judges OUR tree against the reference's STANDING state —
// a reference-side change invalidates them all. The standing layers,
// derived from the session-206 maiden (every constant measured live):
//
//   1. the reference bundle fingerprint — the POST-LOGIN app-shell
//      JS (index-BMU57229.js · md5 6d3779af85c060852d9b7cd10bacecab
//      · 1,402,874 bytes; the only other post-login script is the
//      21,914-byte badge.js — the Base44 edit pill).
//   2. the demo-data census — the reference's workspace renders its
//      EMPTY STATES: $0.00 KPIs, "No expenses yet", "No Income
//      Sources Yet", "No accounts yet", "No Goals Set Yet", "0
//      holdings" (the F-206a decode — the R-4.2-era "demo corpus"
//      belief was a misdecode; the session-205 captures AND the live
//      quiescence-settled census both read empty). ZERO is the
//      standing state (the CRM-era semantics restored): a re-seed
//      changes every zero-data parity baseline the sweep rides. The
//      census keys on per-page SENTINELS — the reference's data
//      renders div/card lists, not table rows, so the CRM row-count
//      detector would read 0 even on a seeded workspace.
//   3. the desktop sidebar census — 256px + 9 visible links (the
//      w-64 ASIDE; Dashboard/Income/Expenses/Accounts/Investments/
//      Import/Analytics/Goals/Settings — measured live, in order).
//   4. the TRUE-390 mobile menu census — FUNCTIONAL: the reference's
//      non-semantic topbar (div.lg:hidden.fixed, h65 — no <header>,
//      no <nav>) carries the brand left and the Synced pill + sun
//      toggle + icon-only hamburger BUTTON right; the click opens
//      the full-screen plain-div overlay drawer (div.lg:hidden.
//      fixed.inset-0.z-40 > nav) with the 9 destinations (0 links
//      visible before the click, 9 after — measured). The button
//      carries no aria-label (the reference's own a11y gap; OUR
//      hamburger is the labeled superset — the e2e battery's
//      accessible-name open). Drift in EITHER direction (the menu
//      breaking, the destination count changing) is the event.
//
// The CRM-era marketing-LANDING census is RETIRED: the WealthOS
// reference has no public landing — `/` login-walls guests (a
// client redirect to /login?from_url=…, verified live session 206).
// The s142 surface does not exist here to guard.
//
// A CHANGED verdict anywhere is a parity EVENT, not a failure of
// this repo: re-run the maiden sweeps, re-walk the interactive
// families, and re-evaluate the standing baselines before trusting
// any drift-gate result. The probe exits 1 on any CHANGED —
// gateable.
//
// Run: bun run probe:ref   (or: bun scripts/drift-probe.ts)
//   --json   machine-readable output (one verdict object per check)
// Env:  REF_URL (default https://wealth-os-d93bd04e.base44.app)
//       REF_EMAIL / REF_PASSWORD (the documented demo login defaults)
//       HEADLESS=0 to watch the drive
// NOT part of `gate`/`gate:full` — the reference is a NETWORK
// dependency; the offline gate must stay offline-runnable. The e2e
// mobile battery covers OUR mobile-nav superset; this probe covers
// the reference side.

import { createHash } from "node:crypto";
import { chromium } from "@playwright/test";
import path from "node:path";

const REF_URL = process.env.REF_URL ?? "https://wealth-os-d93bd04e.base44.app";
const REF_EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const REF_PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

const log = (s: string) => console.log(`[probe] ${s}`);

// ---------------------------------------------------------------------------
// The PURE seams (pinned by tests/drift-probe-tool.test.ts — the same
// node-side contract the live probe run reports against)
// ---------------------------------------------------------------------------

export interface ScriptCandidate {
  url: string;
  bytes: number;
}

/** PURE: the app-shell bundle discovery — the largest JS by bytes
 *  (POST-LOGIN; ties keep the first). An empty list returns null:
 *  never guess a bundle. */
export function pickAppBundle(scripts: ScriptCandidate[]): string | null {
  let best: ScriptCandidate | null = null;
  for (const s of scripts) {
    if (!best || s.bytes > best.bytes) best = s;
  }
  return best?.url ?? null;
}

export interface BundleFingerprint {
  md5: string;
  bytes: number;
}

/** PURE: STABLE only on the EXACT md5 + byte count — a new reference
 *  bundle is a parity EVENT (a reference redeploy rewrites every
 *  standing layer below this one). */
export function stabilityVerdict(
  observed: BundleFingerprint,
  standing: BundleFingerprint,
): "STABLE" | "CHANGED" {
  return observed.md5 === standing.md5 && observed.bytes === standing.bytes ? "STABLE" : "CHANGED";
}

export interface NavCensus {
  width: number;
  visibleLinks: number;
}

/** PURE: the desktop sidebar census — STANDING at 256px + 9 visible
 *  links (any drift is a reference layout change worth a re-walk). */
export function desktopNavVerdict(
  nav: NavCensus,
  standing: { width: number; visibleLinks: number } = STANDING.desktopNav,
): "STANDING" | "CHANGED" {
  return nav.width === standing.width && nav.visibleLinks === standing.visibleLinks
    ? "STANDING"
    : "CHANGED";
}

export interface MobileMenuCensus {
  opens: boolean;
  drawerLinks: number;
}

/** PURE: the TRUE-390 mobile-menu census — the FUNCTIONAL form (the
 *  session-206 decode: the reference's mobile shell is a non-semantic
 *  topbar whose icon-only hamburger button opens the full-screen
 *  plain-div overlay drawer). STANDING when the menu opens and shows
 *  the 9 destinations; CHANGED when it breaks, the destination count
 *  moves, or the anatomy changes again — drift in EITHER direction is
 *  the event (the CRM-era DEFECT-STANDS vocabulary retired with the
 *  CRM reference: the WealthOS menu was never broken). */
export function mobileMenuVerdict(
  menu: MobileMenuCensus,
  standing: { opens: boolean; drawerLinks: number } = STANDING.mobileMenu,
): "STANDING" | "CHANGED" {
  return menu.opens === standing.opens && menu.drawerLinks === standing.drawerLinks
    ? "STANDING"
    : "CHANGED";
}

/** The walked empty-state sentinels — the WealthOS reference's own
 *  empty-state copy, live-measured (session 206, quiescence-settled).
 *  A page counts as EMPTY iff its sentinel appears in main's text.
 *  (The R-4.2-era belief that the reference carried a demo corpus was
 *  the F-206a misdecode — both the session-205 captures and the live
 *  census read empty.) */
export const DEMO_SENTINELS = {
  expenses: "No expenses yet",
  income: "No Income Sources Yet",
  accounts: "No accounts yet",
  goals: "No Goals Set Yet",
  investments: "0 holdings",
} as const;

/** PURE: the demo-data census — ZERO when every walked surface shows
 *  its empty-state sentinel; SEEDED the moment any does not (the
 *  standing state: the reference's workspace is EMPTY — a re-seed
 *  changes every zero-data parity baseline the sweep rides). */
export function demoDataVerdict(emptyByPage: Record<string, boolean>): "ZERO" | "SEEDED" {
  const seeded = Object.values(emptyByPage).some((v) => !v);
  return seeded ? "SEEDED" : "ZERO";
}

/** The standing reference fingerprint + census the probe reports
 *  against (re-anchor deliberately — every value here is a decoded,
 *  live-measured constant from the session-206 maiden, not a guess). */
export const STANDING = {
  bundle: { md5: "6d3779af85c060852d9b7cd10bacecab", bytes: 1_402_874 },
  desktopNav: { width: 256, visibleLinks: 9 },
  mobileMenu: { opens: true, drawerLinks: 9 },
  mobileCensusPage: "/dashboard",
} as const;

// ---------------------------------------------------------------------------
// The live probe (Playwright)
// ---------------------------------------------------------------------------

async function login(page: import("@playwright/test").Page, base: string) {
  await page.goto(`${base}/login`, { waitUntil: "networkidle" });
  // hydration settle: filling during hydration gets cleared by the
  // re-render before submit (the same race scripts/sweep.ts guards)
  await page.waitForTimeout(1200);
  await page.fill('input[type="email"]', REF_EMAIL);
  await page.fill('input[type="password"]', REF_PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(1500);
}

/** The 9 finance destinations (the nav-config contract — the same
 *  list tests/nav-config.test.ts pins on OUR side). */
const SECTIONS = [
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

async function main(): Promise<void> {
  const json = process.argv.includes("--json");
  log(`reference: ${REF_URL}`);

  const browser = await chromium.launch({ headless: process.env.HEADLESS !== "0" });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    // 1. login (the probe cannot read the app shell unauthenticated)
    await login(page, REF_URL);
    log("logged in");

    // 2. the POST-LOGIN script inventory (script srcs + modulepreloads)
    const srcs = await page.evaluate((base: string) => {
      const raw = [
        ...Array.from(document.scripts).map((s) => s.src),
        ...Array.from(document.querySelectorAll('link[rel="modulepreload"]')).map((l) =>
          (l as HTMLLinkElement).href,
        ),
      ].filter((u) => u && u.endsWith(".js"));
      return [...new Set(raw)].map((u) => new URL(u, base).href);
    }, REF_URL);

    // 3. fetch each + pick the app-shell bundle (the largest by bytes)
    const candidates: ScriptCandidate[] = [];
    const bodies = new Map<string, Uint8Array>();
    for (const url of srcs) {
      const r = await page.request.get(url);
      if (!r.ok()) continue;
      const body = await r.body();
      candidates.push({ url, bytes: body.byteLength });
      bodies.set(url, body); // Buffer IS a Uint8Array (no copy needed)
    }
    const bundleUrl = pickAppBundle(candidates);
    if (!bundleUrl) {
      console.error("[probe] no scripts discovered post-login — the reference shell changed");
      process.exit(1);
    }
    const buf = bodies.get(bundleUrl)!;
    const md5 = createHash("md5").update(buf).digest("hex");
    const fingerprint: BundleFingerprint = { md5, bytes: buf.byteLength };
    const stability = stabilityVerdict(fingerprint, STANDING.bundle);
    const name = bundleUrl.split("/").pop()!;
    log(`app bundle: ${name} (${buf.byteLength.toLocaleString("en-US")} bytes)`);
    log(`bundle md5: ${md5} — ${stability}`);

    // 4. the demo-data census (the walked surfaces, sentinel-settled)
    const emptyByPage: Record<string, boolean> = {};
    for (const [p, sentinel] of Object.entries(DEMO_SENTINELS)) {
      await page.goto(`${REF_URL}/${p}`, { waitUntil: "domcontentloaded" });
      await page
        .locator("main")
        .first()
        .waitFor({ state: "visible", timeout: 15000 })
        .catch(() => undefined);
      await page.waitForTimeout(3000);
      emptyByPage[p] = await page.evaluate(
        (phrase) => (document.querySelector("main")?.textContent ?? "").includes(phrase),
        sentinel,
      );
    }
    const demo = demoDataVerdict(emptyByPage);
    log(
      `demo data: ${demo} (${Object.entries(emptyByPage)
        .map(([k, v]) => `${k} ${v ? "empty" : "SEEDED"}`)
        .join(" · ")})`,
    );

    // 5. the desktop nav census (the sidebar renders on every app page
    //    at 1440 — censused on the last demo-walked surface)
    const desktop: NavCensus = await page.evaluate(() => {
      const nav = document.querySelector("nav");
      return {
        width: nav ? Math.round(nav.getBoundingClientRect().width) : 0,
        visibleLinks: nav
          ? Array.from(nav.querySelectorAll("a")).filter((a) => a.getClientRects().length > 0).length
          : 0,
      };
    });
    const desktopVerdict = desktopNavVerdict(desktop);
    log(
      `desktop census: nav ${desktop.width}px · ${desktop.visibleLinks} visible links — ${desktopVerdict}`,
    );

    // 6. the TRUE-390 mobile-menu census (the functional form — the
    //    reference's icon-only hamburger button opens the overlay
    //    drawer; the census counts the visible destinations after)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${REF_URL}${STANDING.mobileCensusPage}`, { waitUntil: "domcontentloaded" });
    await page
      .locator("main")
      .first()
      .waitFor({ state: "visible", timeout: 15000 })
      .catch(() => undefined);
    await page.waitForTimeout(2500);
    const menuButton = page.locator('svg[class*="lucide-menu"]').first();
    const menu: MobileMenuCensus = { opens: false, drawerLinks: 0 };
    if ((await menuButton.count()) > 0) {
      await menuButton.click({ timeout: 5000 }).catch(() => undefined);
      await page.waitForTimeout(1200);
      const links = await page.evaluate((sects: string[]) => {
        return Array.from(document.querySelectorAll("a")).filter(
          (a) =>
            a.getClientRects().length > 0 &&
            sects.includes((a.textContent ?? "").replace(/\s+/g, " ").trim()),
        ).length;
      }, SECTIONS);
      menu.opens = links > 0;
      menu.drawerLinks = links;
    }
    const mobileVerdict = mobileMenuVerdict(menu);
    log(
      `TRUE-390 menu census (${STANDING.mobileCensusPage}): opens=${menu.opens} · ${menu.drawerLinks} destination links — ${mobileVerdict}`,
    );

    // 7. the report + the gate
    const changed =
      stability === "CHANGED" ||
      desktopVerdict === "CHANGED" ||
      mobileVerdict === "CHANGED" ||
      demo === "SEEDED";
    if (json) {
      console.log(
        JSON.stringify(
          {
            reference: REF_URL,
            bundle: { url: bundleUrl, ...fingerprint, verdict: stability },
            demoData: { emptyByPage, verdict: demo },
            desktopNav: { ...desktop, verdict: desktopVerdict },
            mobileMenu: { ...menu, verdict: mobileVerdict },
          },
          null,
          2,
        ),
      );
    }
    if (changed) {
      console.error(
        "[probe] CHANGED — a parity EVENT: re-run the maiden sweeps + re-walk the interactive families before trusting the drift gates",
      );
      process.exit(1);
    }
    log("all standing layers verified — the reference is stable");
  } finally {
    await browser.close();
  }
}

// run only when executed directly (EXACT basename — the F-210c
// suffix-collision lesson, session 210; bun scripts/drift-probe.ts /
// bun run probe:ref), never on the vitest import (the unit pins)
if (process.argv[1] && path.basename(process.argv[1]) === "drift-probe.ts") {
  main().catch((e) => {
    console.error("[probe]", e);
    process.exit(1);
  });
}
