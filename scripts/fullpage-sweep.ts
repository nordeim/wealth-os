// ---------------------------------------------------------------------------
// scripts/fullpage-sweep.ts — the FULL-PAGE below-the-fold drift gate (the FIFTH gate)
//
// Session-149 (F-149c3, walk39): born as the CRM landing's full-page gate —
// the four viewport sweeps structurally clip at their capture height
// (y≈900), and the marketing landing's below-the-fold sections (preview
// rows · pricing · FAQ · footer) had never been pixel-compared end-to-end.
// The owner's full-page-screenshot skill (skills/full-page-screenshot/
// SKILL.md) closed the axis as a one-off walk; this tool promoted it into
// a standing gate over the GUEST landing at 1920×1080 + 390×844.
//
// Session-210 (R-4.4, the plan-v2 F-203e program's fourth slice): the tool
// is RE-ANCHORED to the WealthOS reference, following the R-4.1/R-4.2/
// R-4.3 ladder. The CRM-era config retired wholesale:
//   • REF -> https://wealth-os-d93bd04e.base44.app (the env-overridable
//     REF_URL, the sweep's own name)
//   • the page set -> sweep.ts's PAGES (the 11-entry WealthOS set: the 9
//     sections + the login/reset-password faces), IMPORTED not duplicated
//     (the reuse doctrine; the interior-census lockstep idiom)
//   • the GUEST doctrine RETIRES: the WealthOS `/` login-walls guests
//     (verified live at R-4.3 — the drift-probe retired its marketing-
//     landing census for exactly this), so a guest capture here would
//     photograph the login redirect, not a landing. The 9 sections are
//     auth-walled on both apps: the tool rides the sweep's
//     preflightPairState (the cross-process login pair — the same state
//     file the other gates share; the 162-c consolidation).
//   • the classes -> the sweep's own desktop/phone classes (1440×900 +
//     390×844): the five gates' axes now coincide, so drift decodes
//     transfer between the viewport sweep and this axis. The CRM-era
//     1920×1080 was the marketing-landing choice — an un-walked band in
//     this repo's class tables.
//   • the baselines -> per-class per-page tables in the sweep's shape
//     (STANDING_FULLPAGE_BASELINES), derived from the theme-matched
//     zero-data maiden (the R-4.2 doctrine) — the CRM landing values
//     (0.14/0.49, the "Edit with Base 44" pill genus) retired with the
//     guest landing.
//   • THE ZERO-DATA SENTINEL (the F-210b lesson, this session's own
//     maiden finding): the first maiden's our-side captures came back
//     seeded mid-run (analytics/goals/settings rendered the demo corpus
//     while dashboard..import rendered the empty states — an external
//     actor reseeded the workspace between captures; the sandbox's
//     lifecycle is not trustworthy over an 8-minute run). A corrupted
//     state must fail LOUDLY, never silently bake into the baselines:
//     assertZeroData probes /api/dashboard (all six domain arrays) after
//     the zero and after EACH class's our-side loop, and throws naming
//     the violated tables (the login-wall doctrine's state edition).
//
// What the fullpage axis adds over the four viewport sweeps: the
// below-the-fold DOCUMENT axis. The (app) shell scrolls internally
// (h-screen overflow-hidden + main.overflow-y-auto — the interior census
// owns that scroller's geometry), but the auth faces scroll the document
// (min-h-screen wrappers): at 390 the login document runs past the 844
// viewport, invisible to the clipped sweeps. The padTo pair also makes
// any future docH divergence a loud diff on every page (the white-pad
// rows are counted as differing pixels — the height delta itself is the
// drift signal).
//
// The doctrine (the drift-probe at s101, the sweep classes at s96–s99,
// the theme match at R-4.2, the never-zeroed restore at R-4.3):
//   • the protocol is the sweep's, reused not duplicated: reuse-or-boot
//     the dev server (the platform DATABASE_URL spawn guard) → zero our
//     domain data (scripts/zero-data.ts) → the login pair → per class:
//     the reference captured FIRST with the resolved-theme probe riding
//     its settle, our side theme-matched per page (planThemeWrites — the
//     F-205a cure: the reference serves its app shell dark, its auth
//     faces light) → the pairwise padTo+diffPixels diff → the seed
//     restored in a FINALLY (the workspace is never left zeroed).
//   • the capture follows the skill's phases: the viewport exists before
//     navigation (the context carries it), the main-visible content-wait
//     (width-agnostic — the sweep's captureOne idiom), the lazy-content
//     scroll pass (bottom, then back to top — a no-op on the internal-
//     scroller app pages, the real thing on the document-scrolled auth
//     faces), the reference's Base44 badge closed, then the fullPage shot.
//   • the diff is the browser twin of sweep.ts's PURE diffPixels seam
//     (tol = TOLERANCE 12) with the canvas twin of the PURE padTo seam
//     (opaque white rows below — the height delta is part of the signal).
//   • --fail-on-drift exits 1 when any page exceeds its class baseline
//     by more than FULLPAGE_MARGIN (the sweep's standing 0.5pct margin;
//     --drift-margin overrides, the teeth-check form).
//
// Run: bun run sweep:fullpage [--fail-on-drift] [--json]
//      [--pages dashboard,login]  (the sweep's subset filter; unknown
//      names fail fast) [--drift-margin <pct>]
// Env: OUR_URL (default http://localhost:3000)
//      REF_URL (default https://wealth-os-d93bd04e.base44.app)
// ---------------------------------------------------------------------------

import { chromium } from "@playwright/test";
import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

import {
  PAGES,
  driftVerdict,
  parseNumberArg,
  parsePagesArg,
  planThemeWrites,
  waitOnUrl,
  type BaselineTable,
  type PageEntry,
  type ResolvedThemes,
} from "./sweep";
import { preflightPairState } from "./sweep-state";

// The lockstep export: the fullpage tool sweeps exactly the sweep's set —
// re-exported so the pin can hold the identity (the interior-census
// lockstep idiom).
export { PAGES };

const REPO = path.resolve(import.meta.dirname, "..");
const OUR_URL = process.env.OUR_URL ?? "http://localhost:3000";
const REF_URL = process.env.REF_URL ?? "https://wealth-os-d93bd04e.base44.app";
const SHOTS = path.join(REPO, "scripts", "sweep-shots", "fullpage");

const log = (s: string) => console.log(`[fullpage] ${s}`);

/** The standing classes — the sweep's own desktop/phone classes, so the
 *  five gates' axes coincide (drift decodes transfer between them). */
export const FULLPAGE_CLASSES = [
  { width: 1440, height: 900, label: "desktop" },
  { width: 390, height: 844, label: "phone" },
] as const;

/** Session-210 (R-4.4): the WealthOS standing fullpage baselines —
 *  measured theme-matched (planThemeWrites) at the two classes against
 *  the WealthOS reference, our side in the zero-data state (the R-4.2
 *  stability call), every page at its measured standing share rounded
 *  up to the next 0.1pct — the sweep's derivation doctrine. The noise
 *  calibration: a byte-identical re-run (every page within 0.000pct),
 *  so the 0.5pct margin's headroom is real. The standing genera the
 *  tables absorb are decoded in STANDING_EXPLAINED (never for
 *  mirroring); where both documents are viewport-height the values
 *  track the sweep's own tables (income 30.0 · expenses 13.5 · accounts
 *  10.9 · analytics 40.4 · goals 7.2 · reset 3.9 — the shared-viewport
 *  cross-check). */
export const STANDING_FULLPAGE_BASELINES: Record<string, BaselineTable> = {
  // 1440×900 — the desktop class (the sweep's own) — session-210 maiden,
  // re-derived session-217 (R-14): the dark-mode completion converged the
  // shared-viewport values onto the sweep's own fresh tables.
  desktop: {
    dashboard: 59.88,
    income: 29.93,
    expenses: 13.48,
    accounts: 10.8,
    investments: 49.43,
    import: 26.51,
    analytics: 40.13,
    goals: 7.16,
    settings: 50.5,
    login: 7.82,
    "reset-password": 3.87,
  },
  // 390×844 — the phone class (the sweep's own) — session-210 maiden,
  // re-derived session-217 (R-14).
  phone: {
    dashboard: 77.9,
    income: 45.32,
    expenses: 61.0,
    accounts: 23.21,
    investments: 80.89,
    import: 31.06,
    analytics: 66.9,
    goals: 17.87,
    settings: 60.79,
    login: 16.5,
    "reset-password": 16.42,
  },
};

/** The standing genera the baselines absorb (never for mirroring) —
 *  decoded from the maiden's band analysis + the docH telemetry. */
export const STANDING_EXPLAINED: Record<string, string> = {
  desktop:
    "the DOC-HEIGHT genus (dominant): the reference's app pages scroll the DOCUMENT (dashboard 2054 · settings 1460 · investments 1632 tall at 1440) while our shell is the viewport-locked internal scroller (900 exactly) — the padTo white rows below our document count as diff, the height delta itself the drift signal; the IMPORT horizontal-overflow genus (the reference's import pokes to 1778px wide — a white right column ~19pct); and where both documents are viewport-height, the sweep's own standing genera (the empty-state construction + the content supersets — income 30.0 · expenses 13.5 · accounts 10.9 · analytics 40.4 · goals 7.2 track the viewport tables)",
  phone:
    "the DOC-HEIGHT genus (dominant): the reference's documents run to 3311 (dashboard) · 2236 (investments) · 1768 (settings) · 1262 (expenses) · 1232 (analytics) · 908 (income/import/goals/accounts) while ours lock at 844 — the padTo white rows are the bulk of every tall share; the auth-face below-fold band (the login document runs to 906 vs the reference's 928 — the cardH micro-deltas the interior census knows, now visible below the 844 fold); the same sweep content genera where the frames coincide",
};

/** The sweep's standing drift margin (pct over the baseline). */
export const FULLPAGE_MARGIN = 0.5;

/** The sweep's pixel tolerance (diffPixels semantics). */
const TOLERANCE = 12;

/** The verdict seam: over the line ONLY when strictly past
 *  baseline + margin (the boundary itself is clean, the sweep's rule). */
export function failOnDrift(baseline: number, pct: number, margin: number): boolean {
  return pct > baseline + margin;
}

/** The class table for a class label — the sweep's standingBaseline
 *  idiom. An unknown label judges at the empty table: every page at
 *  baseline 0 + margin (the fail-fast doctrine — a new class joins the
 *  tables deliberately). */
export function fullpageBaseline(label: string): BaselineTable {
  return { ...(STANDING_FULLPAGE_BASELINES[label] ?? {}) };
}

/** The zero-data sentinel's view of /api/dashboard's payload — the six
 *  domain arrays the zero-data state must hold empty (users + the
 *  Setting singleton stay — the sweep's doctrine). PURE: the unit pins
 *  exercise the verdict; the caller owns the fetch. */
export interface ZeroDataPayload {
  transactions?: unknown[];
  incomeSources?: unknown[];
  accounts?: unknown[];
  investments?: unknown[];
  goals?: unknown[];
  budgets?: unknown[];
}

/** PURE (the F-210b guard): the zero-data state is intact only when ALL
 *  six domain arrays are empty. Returns the violated table names so the
 *  throw names the corruption, not just the fact of it. */
export function zeroDataIntact(payload: ZeroDataPayload): {
  ok: boolean;
  violated: string[];
} {
  const violated: string[] = [];
  for (const table of [
    "transactions",
    "incomeSources",
    "accounts",
    "investments",
    "goals",
    "budgets",
  ] as const) {
    const rows = payload[table];
    if (Array.isArray(rows) && rows.length > 0) violated.push(table);
  }
  return { ok: violated.length === 0, violated };
}

/** The loud sentinel: fetch /api/dashboard in the page's own context (the
 *  session cookie rides it) and throw naming the violated tables when
 *  the workspace drifted off the zero-data state mid-run (the F-210b
 *  lesson — a seeded our-side capture is a corrupted baseline, never a
 *  measurement). */
async function assertZeroData(
  page: import("@playwright/test").Page,
  base: string,
  where: string,
): Promise<void> {
  const res = await page.evaluate(async (url) => {
    const r = await fetch(url, { headers: { accept: "application/json" } });
    return (await r.json()) as { ok?: boolean; data?: ZeroDataPayload };
  }, `${base}/api/dashboard`);
  if (!res.ok || !res.data) {
    throw new Error(
      `assertZeroData(${where}): the dashboard probe failed (ok=${res.ok}) — the state cannot be verified`,
    );
  }
  const verdict = zeroDataIntact(res.data);
  if (!verdict.ok) {
    throw new Error(
      `assertZeroData(${where}): the zero-data state was CORRUPTED mid-run — seeded tables: ${verdict.violated.join(", ")}. ` +
        `An external actor reseeded the workspace (the F-210b lesson); the captures in this window are NOT valid measurements — re-run the tool.`,
    );
  }
  log(`zero-data sentinel intact (${where})`);
}

/** The PURE pad seam: white-pad an RGBA buffer (w×h) to targetH rows —
 *  opaque white rows (255,255,255,255) appended BELOW. The browser twin
 *  does the same via canvas fill + drawImage. Refuses to shrink (the
 *  undersize doctrine — the buffer already holds h rows). */
export function padTo(
  buf: Uint8ClampedArray,
  w: number,
  h: number,
  targetH: number,
): Uint8ClampedArray {
  if (targetH < h) {
    throw new Error(`padTo: target ${targetH} < h ${h} (refuses to shrink)`);
  }
  if (targetH === h) return buf;
  const out = new Uint8ClampedArray(w * targetH * 4);
  for (let i = 0; i < out.length; i += 4) {
    out[i] = 255;
    out[i + 1] = 255;
    out[i + 2] = 255;
    out[i + 3] = 255;
  }
  out.set(buf.subarray(0, w * h * 4));
  return out;
}

// -- the capture (the skill's phases + the sweep's content-wait) ----------

/** Close the reference's Base44 badge (it overlays the bottom-right —
 *  the sweep's idiom, reused verbatim). */
async function closeBadge(page: import("@playwright/test").Page) {
  await page
    .locator('button[aria-label*="close badge" i]')
    .click({ timeout: 2000 })
    .catch(() => undefined);
}

/** One fullpage capture: the sweep's content-wait (main paints at every
 *  width — the width-agnostic wait) + the settle, then the skill's
 *  phases (the lazy-content scroll pass to the document bottom, the
 *  return-to-top settle), the badge closed, the theme probed (the
 *  reference side only — recordThemes), and the fullPage shot. Returns
 *  the document's scrollHeight for the report's height telemetry. */
async function captureFull(
  page: import("@playwright/test").Page,
  base: string,
  dir: string,
  p: PageEntry,
  recordThemes?: ResolvedThemes,
): Promise<number> {
  mkdirSync(dir, { recursive: true });
  await page.goto(`${base}${p.path}`, { waitUntil: "domcontentloaded" });
  // the sweep's content-wait: the shell's main column must paint before
  // the capture (main paints at every width; nav-a visible-waits burn
  // their full timeout below md on both apps)
  await page
    .locator("main")
    .first()
    .waitFor({ state: "visible", timeout: 15000 })
    .catch(() => undefined);
  await page.waitForTimeout(2500);
  // the skill's phase 4: the lazy-content scroll pass (bottom, settle)
  const scrollH = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(900);
  // the skill's phase 5: return to top + settle (sticky chrome + entrance
  // animations photographed in their natural top-of-page state)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1100);
  await closeBadge(page);
  await page.waitForTimeout(300);
  // the F-205a probe rides the reference capture's settle (zero extra
  // navigation): the screenshot and the probe see the same state
  if (recordThemes) {
    recordThemes[p.name] = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );
  }
  // the skill's phase 6: the full-page shot
  await page.screenshot({ path: path.join(dir, `${p.name}.png`), fullPage: true });
  log(`captured ${dir}/${p.name}.png (docH ${scrollH})`);
  return scrollH;
}

/** The browser twin: decode both PNGs, white-pad to the max frame (the
 *  canvas twin of the PURE padTo seam), then the tol-12 diff loop —
 *  the same seam as sweep.ts's diffPixels, inlined for the browser (the
 *  no-bundling doctrine; the pure seam is what the unit pins exercise). */
async function diffPair(
  page: import("@playwright/test").Page,
  refPng: Buffer,
  ourPng: Buffer,
): Promise<{ pct: number; diffPx: number; w: number; h: number }> {
  const a = `data:image/png;base64,${refPng.toString("base64")}`;
  const b = `data:image/png;base64,${ourPng.toString("base64")}`;
  return page.evaluate(
    async ({ a, b, tol }) => {
      const load = (src: string) =>
        new Promise<HTMLImageElement>((res, rej) => {
          const img = new Image();
          img.onload = () => res(img);
          img.onerror = () => rej(new Error("png decode failed"));
          img.src = src;
        });
      const [ia, ib] = await Promise.all([load(a), load(b)]);
      // the pad frame: the max of the pair (the height delta itself is
      // part of the drift signal — the canvas twin of padTo)
      const w = Math.max(ia.width, ib.width);
      const h = Math.max(ia.height, ib.height);
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d", { willReadFrequently: true })!;
      const px = (img: HTMLImageElement) => {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h); // padTo: opaque white rows
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0, 0, w, h).data;
      };
      const da = px(ia);
      const db = px(ib);
      // the diffPixels seam (sweep.ts, TOLERANCE 12) — inlined twin
      const total = w * h;
      let diffPx = 0;
      for (let i = 0; i < total; i++) {
        const o = i * 4;
        if (
          Math.abs(da[o] - db[o]) > tol ||
          Math.abs(da[o + 1] - db[o + 1]) > tol ||
          Math.abs(da[o + 2] - db[o + 2]) > tol ||
          Math.abs(da[o + 3] - db[o + 3]) > tol
        ) {
          diffPx++;
        }
      }
      return { pct: (100 * diffPx) / total, diffPx, w, h };
    },
    { a, b, tol: TOLERANCE },
  );
}

// -- the CLI ----------------------------------------------------------------

function parseFlag(argv: string[], name: string): boolean {
  return argv.includes(`--${name}`);
}

interface ClassRow {
  label: string;
  page: string;
  pct: number;
  refH: number;
  ourH: number;
  baseline: number;
  drifted: boolean;
}

async function run() {
  const argv = process.argv.slice(2);
  const json = parseFlag(argv, "json");
  const failOnDriftFlag = parseFlag(argv, "fail-on-drift");
  const driftMargin = parseNumberArg(argv, "--drift-margin", FULLPAGE_MARGIN) as number;
  // the sweep's --pages subset filter (unknown names fail fast there)
  const pages = parsePagesArg(argv, PAGES);

  // 1. the dev server: reuse :3000 or boot one (the sweep's protocol,
  //    the platform DATABASE_URL spawn guard included)
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${OUR_URL}/login`, 3000)) {
    log(`reusing the dev server on ${OUR_URL}`);
  } else {
    log("booting the dev server (bun run dev)…");
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL;
    spawned = spawn("bun", ["run", "dev"], {
      cwd: REPO,
      env: devEnv,
      stdio: "ignore",
      detached: true,
    });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) {
      console.error("[fullpage] the dev server never came up on :3000");
      process.exit(1);
    }
    log("dev server up");
  }

  // the zero-data env guard: UNSET the variable (env -u semantics),
  // never set it empty — Prisma rejects an empty URL (the sweep's rule)
  const zEnv: NodeJS.ProcessEnv = { ...process.env };
  delete zEnv.DATABASE_URL;

  const browser = await chromium.launch({ headless: process.env.HEADLESS === "0" ? false : true });
  const rows: ClassRow[] = [];

  // the seed restore rides the FINALLY — the workspace is never left
  // zeroed, even when a capture throws (the interior-census doctrine)
  try {
    // 2. the zero-data state on OUR side (users + settings kept — the
    //    R-4.2 stability call: both sides render their empty states)
    log("zeroing our domain data (scripts/zero-data.ts)…");
    const z = spawnSync("bun", ["scripts/zero-data.ts"], {
      cwd: REPO,
      env: zEnv,
      stdio: "inherit",
    });
    if (z.status !== 0) throw new Error("zero-data.ts failed");

    // 3. the cross-process login pair (the sweep's state file — ZERO
    //    logins when the chain's fresh; the self-heal re-derives on any
    //    authenticated-probe miss)
    const pairState = await preflightPairState(browser);

    // the F-210b sentinel, first gate: the zero must have HELD (an
    // external actor can reseed between the zero and the captures —
    // the maiden's own lesson). The probe page rides the pair context
    // (our cookie) and lands on OUR origin for the same-origin fetch.
    {
      const probeCtx = await browser.newContext({ storageState: pairState });
      try {
        const probePage = await probeCtx.newPage();
        await probePage.goto(`${OUR_URL}/login`, { waitUntil: "domcontentloaded" });
        await assertZeroData(probePage, OUR_URL, "after zero (pre-captures)");
      } finally {
        await probeCtx.close();
      }
    }

    // 4. per class: the reference captured first (the theme probe riding
    //    its settle), our side theme-matched per page, then the pairwise
    //    padTo+diff
    for (const cls of FULLPAGE_CLASSES) {
      const ctx = await browser.newContext({
        viewport: { width: cls.width, height: cls.height },
        storageState: pairState,
      });
      try {
        const classDir = path.join(SHOTS, cls.label);
        const refThemes: ResolvedThemes = {};
        const refPage = await ctx.newPage();
        const refH: Record<string, number> = {};
        for (const p of pages) {
          refH[p.name] = await captureFull(refPage, REF_URL, path.join(classDir, "ref"), p, refThemes);
        }
        log(`${cls.label} ref resolved themes: ${JSON.stringify(refThemes)}`);

        // the F-205a theme match: writes land BEFORE each navigation (the
        // no-FOUC contract); the first navigation gives the write an
        // origin's localStorage to hit
        const themeWrites = planThemeWrites(pages, refThemes);
        const writeByPage = new Map(themeWrites.map((w) => [w.before, w.theme]));
        const ourPage = await ctx.newPage();
        if (writeByPage.size > 0) {
          await ourPage.goto(`${OUR_URL}/login`, { waitUntil: "domcontentloaded" });
        }
        const ourH: Record<string, number> = {};
        for (const p of pages) {
          const theme = writeByPage.get(p.name);
          if (theme) {
            await ourPage.evaluate(
              (v) => window.localStorage.setItem("wealthos-theme", v),
              theme,
            );
            log(`${cls.label} our theme -> ${theme} (before ${p.name})`);
          }
          ourH[p.name] = await captureFull(ourPage, OUR_URL, path.join(classDir, "ours"), p);
        }

        // the F-210b sentinel, per-class gate: the captures just taken
        // are only valid measurements if the zero-data state held through
        // the whole loop — a mid-run reseed corrupts the class's table
        await assertZeroData(ourPage, OUR_URL, `after ${cls.label} our-side captures`);

        const diffPage = await ctx.newPage();
        await diffPage.goto("about:blank");
        log(`${cls.label}: pairwise fullpage diff (tolerance ${TOLERANCE})…`);
        const baselines = fullpageBaseline(cls.label);
        for (const p of pages) {
          const refPng = readFileSync(path.join(classDir, "ref", `${p.name}.png`));
          const ourPng = readFileSync(path.join(classDir, "ours", `${p.name}.png`));
          const d = await diffPair(diffPage, refPng, ourPng);
          const baseline = baselines[p.name] ?? 0;
          const drifted = failOnDrift(baseline, d.pct, driftMargin);
          rows.push({
            label: cls.label,
            page: p.name,
            pct: d.pct,
            refH: refH[p.name],
            ourH: ourH[p.name],
            baseline,
            drifted,
          });
          if (!json) {
            console.log(
              `[fullpage] ${cls.label} ${p.name}: ref H=${refH[p.name]} · ours H=${ourH[p.name]} · ${d.pct.toFixed(3)}% diff` +
                ` (baseline ${baseline} + margin ${driftMargin}) — ${drifted ? "DRIFT" : "CLEAN"}`,
            );
          }
        }
      } finally {
        await ctx.close();
      }
    }
    await browser.close();
  } finally {
    // 5. the seed restore (always — even when gated; the never-zeroed
    //    doctrine)
    log("restoring the seed (bun run db:seed)…");
    const s = spawnSync("bun", ["run", "db:seed"], { cwd: REPO, env: zEnv, stdio: "inherit" });
    if (s.status !== 0) console.error("[fullpage] db:seed failed — run it manually");
    else log("seed restored (verify: bun run db:census)");
    if (spawned?.pid) {
      try {
        process.kill(-spawned.pid, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
  }

  // 6. the verdict (the sweep's driftVerdict seam — one implementation)
  const verdictByClass = new Map<string, ReturnType<typeof driftVerdict>>();
  for (const cls of FULLPAGE_CLASSES) {
    const classRows = rows.filter((r) => r.label === cls.label).map((r) => [r.page, r.pct] as [string, number]);
    verdictByClass.set(cls.label, driftVerdict(classRows, fullpageBaseline(cls.label), driftMargin));
  }
  const drifted = [...verdictByClass.values()].some((v) => !v.ok);

  if (json) {
    console.log(JSON.stringify({ tool: "fullpage-sweep", results: rows, drifted }));
  } else {
    for (const [label, verdict] of verdictByClass) {
      if (!verdict.ok) {
        for (const f of verdict.failures) {
          console.error(
            `[fullpage] DRIFT: ${label} ${f.page} ${f.pct.toFixed(2)}% > baseline ${f.baseline} + margin ${driftMargin} (allowed ${f.allowed.toFixed(2)}%)`,
          );
        }
        console.error(`[fullpage]   standing genera: ${STANDING_EXPLAINED[label] ?? "see the baselines"}`);
      }
    }
    if (failOnDriftFlag && drifted) {
      console.error(`[fullpage] drift gate FAILED (margin ${driftMargin}pct over the standing baselines)`);
      process.exit(1);
    }
    log(
      failOnDriftFlag
        ? `drift gate clean (margin ${driftMargin}pct over the standing baselines)`
        : "done",
    );
  }
}

// run only when executed directly (bun scripts/fullpage-sweep.ts / bun
// sweep:fullpage), never on the vitest import (the unit pins) — the
// sweep.ts/interior-census.ts idiom (the 157-c fix: an unguarded top-level
// run() launches chromium inside the unit suite and process.exit(1)ed
// whenever no dev server stood — the fresh-clone `bun run test` failed
// with all checks passing). Session-210 (F-210c): the EXACT basename
// form — a suffix guard can be satisfied by a future sibling's filename
// (the sweep's own suffix guard fired inside THIS tool's process the
// moment this tool imported it, zeroing and reseeding mid-run — the
// F-210b corruption's root cause).
if (process.argv[1] && path.basename(process.argv[1]) === "fullpage-sweep.ts") {
  run().catch((e) => {
    console.error(`[fullpage] ${e instanceof Error ? e.message : e}`);
    process.exit(1);
  });
}
