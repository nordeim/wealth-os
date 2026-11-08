// Session-204 pins (R-4.1, the plan-v2 F-203e program's first slice): the
// sweep re-anchored to the WealthOS reference. The tool shipped from the
// CRM era carrying the NEO-CRM reference URL, the CRM page list (contacts/
// leads/calendar/activities/reports/profile/about/contact), and the
// CRM-measured standing baselines — dormant and documented honestly since
// D-201b. This pin is the re-anchor's contract: the reference URL, the
// WealthOS page set (the 9 sections + the login/reset-password public
// faces — all 11 verified 200 on the reference live this session), and
// the negative guard (the CRM reference URL may not return). The PURE
// seams (parsePagesArg / driftVerdict) stay pinned against the new
// reality — the CRM page names must now FAIL fast.
//
// Session-205 pins (R-4.2, the derivation): the maiden baseline tables
// are DERIVED — measured theme-matched (F-205a: the per-page resolved-
// theme match) at the four widths against the WealthOS reference, with a
// byte-identical re-run at 1440x900 as the noise calibration (every page
// within 0.01pct — the margin's headroom is real). The three session-204
// pending-state pins (empty tables / pending note / baseline-0 verdict)
// are REPLACED by the derived-state pins below — the interim state they
// pinned is legitimately over (the doctrine: update the pin in the same
// commit as the contract change, with the why).
//
// Scope note: drift-probe.ts / interior-census.ts / fullpage-sweep.ts are
// R-4.3/R-4.4 (still CRM-era by the plan's ladder) — NOT this pin's scope.
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf-8");

const sweep = () => import("../scripts/sweep");

describe("session-204 (R-4.1): the sweep re-anchored to the WealthOS reference", () => {
  it("PAGES is the 11-entry WealthOS set — the 9 sections + the login/reset-password public faces (no CRM pages)", async () => {
    const { PAGES } = await sweep();
    expect(PAGES).toEqual([
      { name: "dashboard", path: "/dashboard" },
      { name: "income", path: "/income" },
      { name: "expenses", path: "/expenses" },
      { name: "accounts", path: "/accounts" },
      { name: "investments", path: "/investments" },
      { name: "import", path: "/import" },
      { name: "analytics", path: "/analytics" },
      { name: "goals", path: "/goals" },
      { name: "settings", path: "/settings" },
      { name: "login", path: "/login" },
      { name: "reset-password", path: "/reset-password" },
    ]);
  });

  it("sweep.ts's REF_URL default is the WealthOS reference (the R-4.1 re-anchor)", () => {
    expect(read("scripts/sweep.ts")).toContain(
      `?? "https://wealth-os-d93bd04e.base44.app"`,
    );
  });

  it("sweep-state.ts's REF_URL default is re-anchored with it (the login-chain consistency — the pair state probes the reference on its own)", () => {
    expect(read("scripts/sweep-state.ts")).toContain(
      `?? "https://wealth-os-d93bd04e.base44.app"`,
    );
  });

  it("the NEO-CRM reference URL is gone from both tools (the re-anchor's negative guard)", () => {
    expect(read("scripts/sweep.ts")).not.toContain("neo-crm-8ab2c17c.base44.app");
    expect(read("scripts/sweep-state.ts")).not.toContain("neo-crm-8ab2c17c.base44.app");
  });

  it("the four class tables carry the R-7.9 re-derivation — the R-7 tail cures collapsed settings everywhere + investments at desktop/phone (the literal values are the contract)", async () => {
    const { STANDING_BASELINES } = await sweep();
    expect({ ...STANDING_BASELINES.desktop }).toEqual({
      dashboard: 10.4, income: 48.2, expenses: 47.3, accounts: 21.3,
      investments: 9.6, import: 31.2, analytics: 53.8, goals: 33.4,
      settings: 20.0, login: 6.0, "reset-password": 3.9,
    });
    expect({ ...STANDING_BASELINES.phone }).toEqual({
      dashboard: 18.7, income: 60.8, expenses: 51.8, accounts: 29.0,
      investments: 27.7, import: 36.2, analytics: 59.1, goals: 41.2,
      settings: 18.7, login: 11.0, "reset-password": 16.5,
    });
    expect({ ...STANDING_BASELINES.tablet }).toEqual({
      dashboard: 9.0, income: 50.7, expenses: 49.1, accounts: 21.6,
      investments: 22.3, import: 31.5, analytics: 54.1, goals: 34.4,
      settings: 32.4, login: 11.5, "reset-password": 6.5,
    });
    expect({ ...STANDING_BASELINES.landscape }).toEqual({
      dashboard: 12.5, income: 51.7, expenses: 49.3, accounts: 23.9,
      investments: 24.8, import: 33.9, analytics: 49.0, goals: 36.1,
      settings: 19.6, login: 4.6, "reset-password": 6.4,
    });
  });

  it("standingBaseline maps each walked width to its class table (and the band boundaries hold)", async () => {
    const { standingBaseline, STANDING_BASELINES } = await sweep();
    expect(standingBaseline(1440)).toEqual({ ...STANDING_BASELINES.desktop });
    expect(standingBaseline(390)).toEqual({ ...STANDING_BASELINES.phone });
    expect(standingBaseline(768)).toEqual({ ...STANDING_BASELINES.tablet });
    expect(standingBaseline(1024)).toEqual({ ...STANDING_BASELINES.landscape });
    // the 4-way banding: <768 phone · <1024 tablet · <1280 landscape · else desktop
    expect(standingBaseline(767)).toEqual({ ...STANDING_BASELINES.phone });
    expect(standingBaseline(1023)).toEqual({ ...STANDING_BASELINES.tablet });
    expect(standingBaseline(1279)).toEqual({ ...STANDING_BASELINES.landscape });
    expect(standingBaseline(1280)).toEqual({ ...STANDING_BASELINES.desktop });
  });

  it("standingExplained decodes the WealthOS standing genera (the R-4.2 derivation — not the pending note)", async () => {
    const { standingExplained } = await sweep();
    for (const width of [390, 768, 1024, 1440]) {
      const line = standingExplained(width);
      expect(line).toContain("R-4.2");
      expect(line).toContain("theme-matched");
      expect(line).toContain("empty-state construction");
      expect(line).not.toContain("data-vs-empty");
      expect(line).not.toContain("no WealthOS baselines derived yet");
      expect(line).not.toContain("picklist-data genus");
    }
  });

  it("driftVerdict against the derived desktop table: within baseline+margin passes, above it fails", async () => {
    const { driftVerdict, STANDING_BASELINES } = await sweep();
    // the measured standing shares sit INSIDE their baselines + margin
    const ok = driftVerdict(
      [
        ["dashboard", 10.23],
        ["settings", 19.91],
      ],
      { ...STANDING_BASELINES.desktop },
      0.5,
    );
    expect(ok.ok).toBe(true);
    // a real drift — above the baseline + margin — fails with the evidence
    const drift = driftVerdict(
      [
        ["dashboard", 10.23],
        ["settings", 19.91],
        ["login", 7.3],
      ],
      { ...STANDING_BASELINES.desktop },
      0.5,
    );
    expect(drift.ok).toBe(false);
    expect(drift.failures).toEqual([
      { page: "login", pct: 7.3, baseline: 6.0, allowed: 6.5 },
    ]);
  });

  it("parsePagesArg: the WealthOS names filter — and the CRM names now FAIL fast (the re-anchor's own regression guard)", async () => {
    const { PAGES, parsePagesArg } = await sweep();
    const filtered = parsePagesArg(["--pages", "income,goals"], PAGES);
    expect(filtered.map((p) => p.name)).toEqual(["income", "goals"]);
    expect(() => parsePagesArg(["--pages", "leads,contacts"], PAGES)).toThrow(
      /unknown page name\(s\) "leads", "contacts"/,
    );
  });
});

describe("session-205 (R-4.2): the theme-matched maiden derivation (F-205a — the ~85% section share was a THEME genus, not data)", () => {
  // The maiden decode (this session, 1440x900 + the pixel fingerprint):
  // every section's diff was 98.4–99.7% ONE full-frame bucket, and the
  // region means proved why — the reference serves its app shell DARK
  // (whole-frame ≈ rgb(28,24,21)) while ours rendered LIGHT (≈
  // rgb(211,210,207)); the auth faces match (both light ≈ rgb(242,244,246)),
  // exactly why login/reset sat at 6.96%/3.84%. Baking a full-frame
  // inversion into the baselines would blind the drift gate. The cure:
  // the sweep probes the reference's resolved `dark` class PER PAGE and
  // writes our localStorage theme to match before each of our captures.
  const appPages = [
    "dashboard", "income", "expenses", "accounts", "investments",
    "import", "analytics", "goals", "settings",
  ];
  const authPages = ["login", "reset-password"];
  const refThemes: Record<string, boolean> = {
    ...Object.fromEntries(appPages.map((n) => [n, true])),
    ...Object.fromEntries(authPages.map((n) => [n, false])),
  };

  it("planThemeWrites: the ref's per-page resolved themes become OUR localStorage writes, only at boundaries (app-dark/auth-light = exactly two writes)", async () => {
    const { PAGES, planThemeWrites } = await sweep();
    expect(planThemeWrites(PAGES, refThemes)).toEqual([
      { before: "dashboard", theme: "dark" },
      { before: "login", theme: "light" },
    ]);
  });

  it("planThemeWrites: an all-light reference yields ONE write — and a missing probe FAILS FAST (the --pages typo doctrine)", async () => {
    const { PAGES, planThemeWrites } = await sweep();
    const allLight = Object.fromEntries(PAGES.map((p) => [p.name, false]));
    expect(planThemeWrites(PAGES, allLight)).toEqual([
      { before: "dashboard", theme: "light" },
    ]);
    expect(() => planThemeWrites(PAGES, {})).toThrow(/missing the resolved theme/);
  });

  it("planThemeWrites: an all-dark reference (a future ref default) also yields ONE write", async () => {
    const { PAGES, planThemeWrites } = await sweep();
    const allDark = Object.fromEntries(PAGES.map((p) => [p.name, true]));
    expect(planThemeWrites(PAGES, allDark)).toEqual([
      { before: "dashboard", theme: "dark" },
    ]);
  });
});
