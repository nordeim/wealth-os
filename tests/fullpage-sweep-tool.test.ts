import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Session-210 pins (R-4.4, the plan-v2 F-203e program's fourth slice): the
 * fullpage sweep re-anchored to the WealthOS reference. The tool shipped
 * from the CRM era (session 149) carrying the NEO-CRM reference URL, the
 * single-page LANDING page set (the public marketing surface, swept as a
 * GUEST), the 1920×1080 desktop class, and the CRM-measured landing
 * baselines (0.14/0.49 — the "Edit with Base 44" pill genus) — dormant
 * with the whole R-4 ladder since D-201b, and structurally wrong for this
 * repo: the WealthOS `/` login-walls guests (verified live at R-4.3 — the
 * drift-probe's marketing-landing census was RETIRED for exactly this),
 * so a guest capture of `/` here photographs the login redirect, not a
 * landing.
 *
 * The re-anchor's contract (this pin):
 *   • the REF default -> the WealthOS reference; the NEO-CRM URL may not
 *     return (the R-4.1 negative-guard idiom)
 *   • the page set -> sweep.ts's own PAGES (the 11-entry WealthOS set:
 *     the 9 sections + the login/reset-password faces), IMPORTED — the
 *     reuse-not-duplicate doctrine, lockstep-pinned the way the interior
 *     census's set is
 *   • the auth doctrine RETIRES the CRM guest form: the 9 sections are
 *     auth-walled on both apps, so the tool rides the sweep's
 *     preflightPairState (the cross-process login pair — the same state
 *     file the other five gates share)
 *   • the theme match: planThemeWrites + the per-page resolved-theme
 *     probe (the F-205a cure — the reference serves its app shell dark,
 *     its auth faces light; an unmatched pair would bake a full-frame
 *     inversion into every baseline)
 *   • the zero-data + seed-restore protocol (the sweep's
 *     apples-to-apples doctrine; the restore rides a FINALLY — the
 *     never-zeroed rule the interior census established)
 *   • the classes -> the sweep's own desktop/phone classes (1440×900 +
 *     390×844): the five gates' axes now coincide, so drift decodes
 *     transfer between the viewport sweep and the fullpage axis (the
 *     CRM-era 1920×1080 was the marketing-landing choice — an un-walked
 *     band in this repo's class tables)
 *   • the baselines -> per-class per-page tables in the sweep's shape
 *     (the maiden derivation), replacing the CRM-era single landing
 *     values
 *
 * What the fullpage axis adds over the four viewport sweeps: the
 * below-the-fold DOCUMENT axis. The (app) shell scrolls internally
 * (h-screen overflow-hidden + main.overflow-y-auto — the interior census
 * owns that scroller's geometry), but the auth faces scroll the document
 * (min-h-screen wrappers): at 390 the login document runs past the 844
 * viewport, invisible to the clipped sweeps. The fullpage capture +
 * padTo pair also makes any future docH divergence a loud diff (the
 * white-pad rows), on every page.
 *
 * The kept seams from session 149 (padTo, failOnDrift, the capture
 * phases, the DIRECT-EXECUTION guard) stay pinned — the re-anchor
 * changes the config, not the doctrine.
 */
const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf-8");

const TOOL = "scripts/fullpage-sweep.ts";
const toolSrc = () => read(TOOL);
const pkgSrc = () => JSON.parse(read("package.json"));
const fullpage = () => import("../scripts/fullpage-sweep");

describe("session-210 (R-4.4): the fullpage sweep re-anchored to the WealthOS reference", () => {
  it("the tool exists", () => {
    expect(toolSrc().length).toBeGreaterThan(0);
  });

  it("the package wiring: `bun run sweep:fullpage` + the FIFTH gate in gate:full", () => {
    const pkg = pkgSrc();
    expect(pkg.scripts["sweep:fullpage"]).toBe("bun scripts/fullpage-sweep.ts");
    // the fifth gate sits between the four viewport sweeps and the interior census
    expect(pkg.scripts["gate:full"]).toMatch(/sweep:fullpage/);
  });

  it("the REF default is the WealthOS reference (the R-4.4 re-anchor) + the NEO-CRM URL is gone (the negative guard)", () => {
    expect(toolSrc()).toContain(`?? "https://wealth-os-d93bd04e.base44.app"`);
    expect(toolSrc()).not.toContain("neo-crm-8ab2c17c.base44.app");
  });

  it("the OUR_URL/REF_URL env overrides ride the sweep's own names (the operator seam parity)", () => {
    expect(toolSrc()).toMatch(/process\.env\.OUR_URL/);
    expect(toolSrc()).toMatch(/process\.env\.REF_URL/);
  });

  it("the page set is sweep.ts's PAGES — the 11-entry WealthOS set, IMPORTED not duplicated (the reuse doctrine; the interior-census lockstep idiom)", async () => {
    const src = toolSrc();
    expect(src).toMatch(/import\s*\{[^}]*PAGES[^}]*\}\s*from\s*"\.\/sweep"/);
    const [m, sweep] = await Promise.all([fullpage(), import("../scripts/sweep")]);
    // the lockstep: the fullpage tool sweeps exactly the sweep's set
    expect(m.PAGES).toBe(sweep.PAGES);
    expect(m.PAGES).toHaveLength(11);
    expect(m.PAGES.map((p: { name: string }) => p.name)).toEqual([
      "dashboard", "income", "expenses", "accounts", "investments",
      "import", "analytics", "goals", "settings", "login", "reset-password",
    ]);
  });

  it("the classes are the sweep's own desktop/phone classes — 1440×900 + 390×844 (the five gates' axes coincide)", async () => {
    const m = await fullpage();
    const classes = m.FULLPAGE_CLASSES as ReadonlyArray<{ width: number; height: number; label: string }>;
    expect(classes).toEqual([
      { width: 1440, height: 900, label: "desktop" },
      { width: 390, height: 844, label: "phone" },
    ]);
  });

  it("the auth doctrine: the sweep's login pair (preflightPairState) — the CRM guest doctrine RETIRED with the marketing landing", () => {
    const src = toolSrc();
    // the login pair rides the shared cross-process state file
    expect(src).toMatch(/import\s*\{[^}]*preflightPairState[^}]*\}\s*from\s*"\.\/sweep-state"/);
    expect(src).toMatch(/preflightPairState\(/);
    // the pair state feeds a storageState context (the sweep's own form)
    expect(src).toMatch(/storageState/);
  });

  it("the theme match: planThemeWrites + the per-page resolved-theme probe on the reference capture (the F-205a cure rides here too)", () => {
    const src = toolSrc();
    expect(src).toMatch(/import\s*\{[^}]*planThemeWrites[^}]*\}\s*from\s*"\.\/sweep"/);
    expect(src).toMatch(/planThemeWrites\(/);
    expect(src).toMatch(/classList\.contains\("dark"\)/);
    // our side writes the wealthos-theme localStorage at boundaries
    expect(src).toMatch(/wealthos-theme/);
  });

  it("the zero-data + seed-restore protocol: zero before the captures, the seed restored in a FINALLY (the never-zeroed doctrine)", () => {
    const src = toolSrc();
    expect(src).toMatch(/zero-data\.ts/);
    expect(src).toMatch(/db:seed/);
    // the restore must ride the finally, not the happy path only
    expect(src).toMatch(/finally\s*\{[\s\S]*?db:seed/);
  });

  it("the dev-server protocol: reuse-or-boot with the DATABASE_URL spawn guard (the sweep's idiom)", () => {
    const src = toolSrc();
    expect(src).toMatch(/waitOnUrl/);
    expect(src).toMatch(/delete\s+\w+Env\.DATABASE_URL/);
  });

  it("the capture methodology: the skill's phases + the sweep's content-wait (main-visible, width-agnostic)", () => {
    const src = toolSrc();
    // the full-page-screenshot skill's phases: the lazy-content scroll
    // pass, the return-to-top settle, the fullPage shot
    expect(src).toMatch(/scrollHeight\)/); // scrollTo bottom
    expect(src).toMatch(/scrollTo\(0, 0\)/); // return to top
    expect(src).toMatch(/fullPage: true/);
    // the sweep's content-wait: main paints at every width
    expect(src).toMatch(/locator\("main"\)/);
    // the reference's Base44 badge closes before the shot (the sweep's idiom)
    expect(src).toMatch(/closeBadge/);
  });

  it("the browser twin carries the diffPixels cross-reference (the no-bundling doctrine) + tol 12 + the padTo twin", () => {
    const src = toolSrc();
    expect(src).toMatch(/diffPixels/);
    expect(src).toMatch(/12/); // TOLERANCE 12, the sweep's semantics
    // the unequal-height pad happens BEFORE the diff (the height delta
    // itself is the drift signal)
    expect(src).toMatch(/padTo/);
  });

  it("the zero-data sentinel (the F-210b lesson): zeroDataIntact flags ANY seeded domain table, and the tool asserts the state after the zero AND after each class's captures — a mid-run reseed fails LOUDLY, never silently bakes into the baselines", async () => {
    const m = await fullpage();
    const zeroDataIntact = m.zeroDataIntact as (p: {
      transactions?: unknown[]; incomeSources?: unknown[]; accounts?: unknown[];
      investments?: unknown[]; goals?: unknown[]; budgets?: unknown[];
    }) => { ok: boolean; violated: string[] };
    // the intact zero-data payload (users + settings stay; six arrays empty)
    expect(zeroDataIntact({
      transactions: [], incomeSources: [], accounts: [],
      investments: [], goals: [], budgets: [],
    })).toEqual({ ok: true, violated: [] });
    // the maiden's own corruption: goals seeded -> the verdict NAMES the table
    expect(zeroDataIntact({
      transactions: [], incomeSources: [], accounts: [],
      investments: [], goals: [{ id: "g1" }], budgets: [],
    })).toEqual({ ok: false, violated: ["goals"] });
    // multiple violations named in order
    expect(zeroDataIntact({
      transactions: [{ id: "t1" }], goals: [{ id: "g1" }, { id: "g2" }],
    })).toEqual({ ok: false, violated: ["transactions", "goals"] });
    // missing arrays (an unexpected payload shape) do not false-trip; the
    // caller's ok-envelope check owns that failure mode
    expect(zeroDataIntact({})).toEqual({ ok: true, violated: [] });
    // the tool wires the sentinel at both gates
    const src = toolSrc();
    expect(src).toMatch(/assertZeroData\(/);
    expect(src).toContain("after zero (pre-captures)");
    expect(src).toMatch(/after \$\{cls\.label\} our-side captures/);
    // the loud failure names the violated tables (the diagnostic contract)
    expect(src).toContain("seeded tables: ${verdict.violated.join(");
  });

  it("the derived baselines: both class tables carry the 11-entry WealthOS set at the maiden's measured shares (the literal values are the contract — the R-4.2 derivation doctrine, round-up to the next 0.1pct; the byte-identical re-run proved the noise floor at 0.000pct)", async () => {
    const m = await fullpage();
    const baselines = m.STANDING_FULLPAGE_BASELINES as Record<string, Record<string, number>>;
    // both classes carry the full 11-entry tables (the sweep's
    // STANDING_BASELINES shape) — the CRM-era single landing values
    // (desktop: 0.14 / phone: 0.49) are retired
    expect(Object.keys(baselines).sort()).toEqual(["desktop", "phone"]);
    expect(Object.keys(baselines.desktop).sort()).toEqual([
      "accounts", "analytics", "dashboard", "expenses", "goals", "import",
      "income", "investments", "login", "reset-password", "settings",
    ]);
    expect(Object.keys(baselines.phone).sort()).toEqual([
      "accounts", "analytics", "dashboard", "expenses", "goals", "import",
      "income", "investments", "login", "reset-password", "settings",
    ]);
    // the maiden's measured tables (session 210), rounded up
    expect(baselines.desktop).toEqual({
      dashboard: 60.1, income: 30.0, expenses: 13.5, accounts: 10.9,
      investments: 49.5, import: 26.6, analytics: 40.4, goals: 7.2,
      settings: 50.7, login: 7.9, "reset-password": 3.9,
    });
    expect(baselines.phone).toEqual({
      dashboard: 78.5, income: 45.4, expenses: 61.1, accounts: 23.3,
      investments: 80.9, import: 31.3, analytics: 67.3, goals: 17.9,
      settings: 61.0, login: 16.5, "reset-password": 16.5,
    });
    // the shared-viewport cross-check: where both documents are
    // viewport-height the fullpage values track the sweep's own tables
    // (the F-210b corruption's tell was goals at 20.76 vs the sweep's
    // 7.2 — the empty-state capture must match)
    const { STANDING_BASELINES } = await import("../scripts/sweep");
    expect(baselines.desktop.income).toBe(STANDING_BASELINES.desktop.income);
    expect(baselines.desktop.expenses).toBe(STANDING_BASELINES.desktop.expenses);
    expect(baselines.desktop.goals).toBe(STANDING_BASELINES.desktop.goals);
    expect(baselines.desktop.analytics).toBe(STANDING_BASELINES.desktop.analytics);
    expect(m.FULLPAGE_MARGIN).toBe(0.5);
  });

  it("the standing genera decoded: the DOC-HEIGHT genus (the reference scrolls the document, ours locks at the viewport) — not the CRM pill", async () => {
    const m = await fullpage();
    const explained = m.STANDING_EXPLAINED as Record<string, string>;
    expect(Object.keys(explained).sort()).toEqual(["desktop", "phone"]);
    for (const line of Object.values(explained)) {
      // the dominant genus is the document-height divergence; the CRM-era
      // guest-pill genus retired with the marketing landing
      expect(line).toMatch(/DOC-HEIGHT/i);
      expect(line).not.toMatch(/pill/i);
    }
  });

  it("fullpageBaseline maps a class label to its table (a page missing from the table is judged at 0 — the fail-fast doctrine via the sweep's driftVerdict)", async () => {
    const m = await fullpage();
    const fullpageBaseline = m.fullpageBaseline as (label: string) => Record<string, number>;
    const { STANDING_FULLPAGE_BASELINES } = await fullpage();
    expect(fullpageBaseline("desktop")).toEqual({ ...STANDING_FULLPAGE_BASELINES.desktop });
    expect(fullpageBaseline("phone")).toEqual({ ...STANDING_FULLPAGE_BASELINES.phone });
    // an unknown label judges at the empty table — every page at baseline
    // 0 + margin (the pending state fails loudly on real drift)
    expect(fullpageBaseline("watch")).toEqual({});
  });

  it("the drift verdict reuses the sweep's driftVerdict seam (the per-page baseline + margin semantics, one implementation)", async () => {
    const src = toolSrc();
    expect(src).toMatch(/import\s*\{[^}]*driftVerdict[^}]*\}\s*from\s*"\.\/sweep"/);
    const { driftVerdict } = await import("../scripts/sweep");
    const verdict = driftVerdict(
      [["dashboard", 9.0], ["login", 6.4]],
      { dashboard: 9.1, login: 6.0 },
      0.5,
    );
    expect(verdict.ok).toBe(true); // both within baseline + margin
    const failed = driftVerdict([["dashboard", 9.62]], { dashboard: 9.1 }, 0.5);
    expect(failed.ok).toBe(false); // over the line
    expect(failed.failures[0].page).toBe("dashboard");
  });

  it("padTo (the PURE pad seam): white-pads an RGBA buffer to the target height, preserving the rows", async () => {
    const m = await fullpage();
    const padTo = m.padTo as (buf: Uint8ClampedArray, w: number, h: number, targetH: number) => Uint8ClampedArray;
    // a 2×1 image: two solid pixels
    const buf = new Uint8ClampedArray([10, 20, 30, 255, 40, 50, 60, 255]);
    const out = padTo(buf, 2, 1, 3);
    expect(out.length).toBe(2 * 3 * 4);
    // the original row is preserved byte-equal
    expect(Array.from(out.subarray(0, 8))).toEqual([10, 20, 30, 255, 40, 50, 60, 255]);
    // the padded rows are opaque white
    for (let row = 1; row < 3; row++) {
      expect(Array.from(out.subarray(row * 8, row * 8 + 8))).toEqual([255, 255, 255, 255, 255, 255, 255, 255]);
    }
  });

  it("padTo: REFUSES to shrink (the NaN/undersize doctrine)", async () => {
    const m = await fullpage();
    const padTo = m.padTo as (buf: Uint8ClampedArray, w: number, h: number, targetH: number) => Uint8ClampedArray;
    const buf = new Uint8ClampedArray(2 * 3 * 4);
    expect(() => padTo(buf, 2, 3, 2)).toThrow();
  });

  it("failOnDrift: over the line ONLY when strictly past baseline + margin (the boundary itself is clean, the sweep's rule)", async () => {
    const m = await fullpage();
    const failOnDrift = m.failOnDrift as (baseline: number, pct: number, margin: number) => boolean;
    expect(failOnDrift(9.1, 9.5, 0.5)).toBe(false); // within margin
    expect(failOnDrift(9.1, 9.6, 0.5)).toBe(false); // exactly at the line
    expect(failOnDrift(9.1, 9.61, 0.5)).toBe(true); // over
  });

  it("the DIRECT-EXECUTION guard (the 157-c finding): run() fires ONLY when the script is executed directly, never on the vitest import — the sweep.ts/interior-census.ts idiom both siblings shipped with, missed here at s149. An unguarded top-level run() launches chromium INSIDE the unit suite and process.exit(1)s whenever no dev server stands. Session-210 (F-210c): the guard is the EXACT basename form — the suffix form (endsWith) is the collision bug that let THIS tool's import of ./sweep fire the SWEEP's run() inside this process (the F-210b corruption's root cause)", () => {
    const src = toolSrc();
    // the guard's discriminator (the exact-basename form, F-210c)
    expect(src).toMatch(/path\.basename\(process\.argv\[1\]\) === "fullpage-sweep\.ts"/);
    // the UNGUARDED top-level call RETIRED — run() must never fire at
    // module top level (the guarded form is indented inside the if)
    expect(src).not.toMatch(/^run\(\)\.catch/m);
    // the guarded catch keeps the [fullpage] prefix + exit 1 (the
    // fail-on-drift contract for the direct run)
    expect(src).toMatch(/console\.error\(`\[fullpage\] \$\{e instanceof Error \? e\.message : e\}`\)/);
  });

  it("the F-210c collision guard: sweep.ts's own direct-execution guard is the EXACT basename form — importing ./sweep from a sibling tool (THIS tool, the R-4.4 re-anchor's own pattern) must never fire the sweep's run() inside the importer's process (the suffix form matched fullpage-sweep.ts and DID: zero → capture → RESEED mid-fullpage-run, the corruption the zero-data sentinel caught)", () => {
    const sweepSrc = read("scripts/sweep.ts");
    expect(sweepSrc).toMatch(/path\.basename\(process\.argv\[1\]\) === "sweep\.ts"/);
    // the suffix GUARD form is retired (the pin targets usage, not prose —
    // the s142 own-doc-comment lesson: the F-210c story itself names the
    // old form in a comment)
    expect(sweepSrc).not.toMatch(/process\.argv\[1\]\.endsWith\("sweep\.ts"\)/);
    // the sibling tools carry the same exact form (the class cure, not
    // the instance)
    expect(read("scripts/interior-census.ts")).toMatch(
      /path\.basename\(process\.argv\[1\]\) === "interior-census\.ts"/,
    );
    expect(read("scripts/drift-probe.ts")).toMatch(
      /path\.basename\(process\.argv\[1\]\) === "drift-probe\.ts"/,
    );
  });
});
