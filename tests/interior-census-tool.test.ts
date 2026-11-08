// Session-206 pins (R-4.3, the plan-v2 F-203e program's third slice):
// the interior census re-anchored to the WealthOS reference. The tool
// shipped from the CRM era carrying the NEO-CRM reference URL, the CRM
// interior page set (contacts/leads/calendar/activities/reports/
// profile/about/contact + the login wall), the marketing-landing
// public leg, and the CRM data-page scope — dormant and documented
// honestly since D-201b. This pin is the re-anchor's contract: the
// reference URL, the WealthOS page set (lockstep with the sweep's
// PAGES list — the 9 sections + the login/reset-password auth faces),
// the public leg's RETIREMENT (the WealthOS reference has no public
// landing: `/` login-walls guests, verified live session 206), and
// the data-page scope (the 9 sections — the pages whose text-only
// pairs absorb as live-data).
//
// The pure decoder seams (alignCensus / attributeGenera /
// censusVerdict) are the CRM-era instruments, unchanged by design —
// they are signature-keyed rules, not page-keyed ones; the WealthOS
// maiden decodes which genera actually fire. The settings-rhythm
// additive exports (settingsRowSignature / censusPage / waitQuiescent)
// are pinned next door (tests/settings-rhythm-tool.test.ts) and
// guarded here at the source level.
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");

const census = () => import("../scripts/interior-census");

const WEALTHOS_PAGES = [
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
];

describe("session-206 (R-4.3): the interior census re-anchored to the WealthOS reference", () => {
  it("INTERIOR_PAGES is the 11-entry WealthOS set — lockstep with the sweep's PAGES (the 9 sections + the login/reset-password auth faces; no CRM pages)", async () => {
    const { INTERIOR_PAGES } = await census();
    expect([...INTERIOR_PAGES]).toEqual(WEALTHOS_PAGES);
  });

  it("PUBLIC_PAGES is RETIRED (empty) — the WealthOS reference has no public landing (`/` login-walls guests); the leg's machinery stays for a future public surface", async () => {
    const { PUBLIC_PAGES, CENSUS_ALL_PAGES, INTERIOR_PAGES, isPublicPage } = await census();
    expect([...PUBLIC_PAGES]).toEqual([]);
    expect([...CENSUS_ALL_PAGES]).toEqual([...INTERIOR_PAGES]);
    for (const p of INTERIOR_PAGES) expect(isPublicPage(p)).toBe(false);
  });

  it("CENSUS_DATA_PAGES is the 9 sections (the live-data absorption scope); the auth faces RED by default on text-only pairs", async () => {
    const { CENSUS_DATA_PAGES, isCensusDataPage } = await census();
    expect([...CENSUS_DATA_PAGES]).toEqual([
      "dashboard",
      "income",
      "expenses",
      "accounts",
      "investments",
      "import",
      "analytics",
      "goals",
      "settings",
    ]);
    expect(isCensusDataPage({ name: "income" })).toBe(true);
    expect(isCensusDataPage({ name: "login" })).toBe(false);
    expect(isCensusDataPage({ name: "reset-password" })).toBe(false);
  });

  it("interior-census.ts's REF_URL default is the WealthOS reference — and the NEO-CRM URL is gone (the re-anchor's negative guard)", () => {
    const src = read("scripts/interior-census.ts");
    expect(src).toContain('?? "https://wealth-os-d93bd04e.base44.app"');
    expect(src).not.toContain("neo-crm-8ab2c17c.base44.app");
  });

  it("the census page-set lockstep: INTERIOR_PAGES and the sweep's PAGES are the same list (the R-4.1 seam — one page set, two tools)", async () => {
    const sweep = await import("../scripts/sweep");
    const { INTERIOR_PAGES } = await census();
    expect([...INTERIOR_PAGES]).toEqual([...sweep.PAGES]);
  });

  it("the settings-rhythm additive exports survive the re-anchor (settingsRowSignature + censusPage + waitQuiescent — the reuse-not-duplicate doctrine)", async () => {
    const m = await census();
    expect(typeof m.settingsRowSignature).toBe("function");
    expect(typeof m.censusPage).toBe("function");
    expect(typeof m.waitQuiescent).toBe("function");
  });

  it("parseAxisArg: the four WealthOS census axes (phone/tablet/landscape/desktop) — unknown names fail fast", async () => {
    const { parseAxisArg, CENSUS_AXES } = await census();
    expect(parseAxisArg([])).toEqual([...CENSUS_AXES]);
    expect(parseAxisArg(["--axis", "desktop"])).toEqual([
      { name: "desktop", width: 1440, height: 900 },
    ]);
    expect(() => parseAxisArg(["--axis", "bogus"])).toThrow(/unknown --axis "bogus"/);
  });

  it("contentFloor travels with the frame (the L-153c2 seam: <640 → -32; 640-767 → -64; ≥768 → -320)", async () => {
    const { contentFloor } = await census();
    expect(contentFloor(390)).toBe(358);
    expect(contentFloor(640)).toBe(576);
    expect(contentFloor(768)).toBe(448);
    expect(contentFloor(1440)).toBe(1120);
  });

  it("planAxisBatches: order-preserving partition, capped at the axes count (the parallel protocol's pure seam)", async () => {
    const { planAxisBatches, CENSUS_AXES } = await census();
    expect(planAxisBatches(CENSUS_AXES, 1)).toHaveLength(4);
    expect(planAxisBatches(CENSUS_AXES, 4)).toHaveLength(1);
    expect(planAxisBatches(CENSUS_AXES, 99)).toHaveLength(1);
    expect(planAxisBatches([], 4)).toEqual([]);
    expect(planAxisBatches(CENSUS_AXES, 2).flat()).toEqual([...CENSUS_AXES]);
  });

  it("censusVerdict (the R-4.3 allowance doctrine): within standing+margin passes, above it fails with the evidence; a mainH off the standing value fails; unknown pages judge at the fail-safe zero; the settings mainH SKIP survives", async () => {
    const { censusVerdict, STANDING_CENSUS, CENSUS_MARGIN } = await census();
    expect(CENSUS_MARGIN).toBe(0);
    // within the standing allowance + margin → GREEN (the desktop login genus)
    const s = STANDING_CENSUS.desktop.login;
    const ok = censusVerdict([
      {
        page: "login", axis: "desktop", mainHDelta: s.mainH, oursEls: 57, refEls: 56, matches: 2,
        explained: [],
        unexplained: Array.from({ length: s.unexplained }, () => ({ kind: "shift" as const })),
      },
    ]);
    expect(ok.ok).toBe(true);
    // above the allowance → RED with the decode line
    const red = censusVerdict([
      {
        page: "login", axis: "desktop", mainHDelta: s.mainH, oursEls: 57, refEls: 56, matches: 2,
        explained: [],
        unexplained: Array.from({ length: s.unexplained + 3 }, () => ({ kind: "ours-extra" as const })),
      },
    ]);
    expect(red.ok).toBe(false);
    expect(red.failures[0]).toContain("[desktop] login: 66 unexplained");
    expect(red.failures[0]).toContain("standing 63 + margin 0");
    // a mainH drift off the standing value → RED
    const hRed = censusVerdict([
      { page: "login", axis: "desktop", mainHDelta: 0, oursEls: 57, refEls: 56, matches: 2, explained: [], unexplained: [] },
    ]);
    expect(hRed.ok).toBe(false);
    expect(hRed.failures[0]).toContain("mainH delta 0 ≠ standing -40");
    // an unknown page judges at the fail-safe zero (clean passes, any event REDs)
    const unknown = censusVerdict([
      { page: "future-page", axis: "desktop", mainHDelta: 0, oursEls: 5, refEls: 5, matches: 5, explained: [], unexplained: [] },
    ]);
    expect(unknown.ok).toBe(true);
    const unknownRed = censusVerdict([
      { page: "future-page", axis: "desktop", mainHDelta: 0, oursEls: 5, refEls: 5, matches: 4, explained: [], unexplained: [{ kind: "ours-extra" }] },
    ]);
    expect(unknownRed.ok).toBe(false);
    expect(unknownRed.failures[0]).toContain("no standing allowance — the fail-safe zero");
    // the settings mainH SKIP survives (the L-150c2 doctrine)
    const settings = censusVerdict([
      { page: "settings", axis: "desktop", mainHDelta: -93, oursEls: 105, refEls: 105, matches: 0, explained: [], unexplained: [] },
    ]);
    expect(settings.ok).toBe(true);
  });

  it("STANDING_CENSUS: the R-7.5 re-derivation — the parity-convergence cures dropped the allowances (the literal values are the contract; drift above them is the event)", async () => {
    const { STANDING_CENSUS } = await census();
    expect({ ...STANDING_CENSUS.desktop }).toEqual({
      dashboard: { unexplained: 284, mainH: -97 },
      income: { unexplained: 40, mainH: 49 },
      expenses: { unexplained: 115, mainH: 49 },
      accounts: { unexplained: 22, mainH: 49 },
      investments: { unexplained: 136, mainH: -641 },
      import: { unexplained: 31, mainH: 49 },
      analytics: { unexplained: 66, mainH: 49 },
      goals: { unexplained: 23, mainH: 49 },
      settings: { unexplained: 175, mainH: -81 },
      login: { unexplained: 63, mainH: -40 },
      "reset-password": { unexplained: 19, mainH: 0 },
    });
    expect({ ...STANDING_CENSUS.phone }).toEqual({
      dashboard: { unexplained: 323, mainH: 156 },
      income: { unexplained: 38, mainH: -15 },
      expenses: { unexplained: 112, mainH: -303 },
      accounts: { unexplained: 20, mainH: -15 },
      investments: { unexplained: 159, mainH: -727 },
      import: { unexplained: 32, mainH: -15 },
      analytics: { unexplained: 74, mainH: -45 },
      goals: { unexplained: 21, mainH: -15 },
      settings: { unexplained: 182, mainH: -167 },
      login: { unexplained: 52, mainH: -22 },
      "reset-password": { unexplained: 19, mainH: 0 },
    });
    expect({ ...STANDING_CENSUS.tablet }).toEqual({
      dashboard: { unexplained: 277, mainH: 43 },
      income: { unexplained: 38, mainH: -15 },
      expenses: { unexplained: 112, mainH: -15 },
      accounts: { unexplained: 20, mainH: -15 },
      investments: { unexplained: 150, mainH: -483 },
      import: { unexplained: 32, mainH: -15 },
      analytics: { unexplained: 73, mainH: 103 },
      goals: { unexplained: 21, mainH: -15 },
      settings: { unexplained: 176, mainH: -75 },
      login: { unexplained: 62, mainH: 0 },
      "reset-password": { unexplained: 19, mainH: 0 },
    });
    expect({ ...STANDING_CENSUS.landscape }).toEqual({
      dashboard: { unexplained: 278, mainH: 142 },
      income: { unexplained: 40, mainH: 49 },
      expenses: { unexplained: 116, mainH: 109 },
      accounts: { unexplained: 22, mainH: 49 },
      investments: { unexplained: 150, mainH: -451 },
      import: { unexplained: 31, mainH: 49 },
      analytics: { unexplained: 60, mainH: 65 },
      goals: { unexplained: 23, mainH: 49 },
      settings: { unexplained: 175, mainH: -63 },
      login: { unexplained: 65, mainH: -74 },
      "reset-password": { unexplained: 19, mainH: 0 },
    });
  });

  it("censusPage carries the reset-password ANCHOR FALLBACK (the reference's no-main card face — div.min-h-screen.bg-gray-50.p-4, measured live session 206; every other face on both apps carries a main)", () => {
    const src = read("scripts/interior-census.ts");
    expect(src).toContain('?? document.querySelector("div.min-h-screen.bg-gray-50.p-4")');
    // the content-wait accepts either anchor (no 15s burn on the no-main face)
    expect(src).toContain('locator("main, div.min-h-screen.bg-gray-50.p-4")');
  });
});
