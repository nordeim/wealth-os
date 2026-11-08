// Session-206 pins (R-4.3, the plan-v2 F-203e program's third slice):
// the drift probe re-anchored to the WealthOS reference. The CRM-era
// pins (S101-P1, re-anchored s142/s147) asserted the NEO-CRM standing
// layers — the 8-link desktop sidebar, the TRUE-390 defect vocabulary
// (DEFECT-STANDS at the triple-zero), the marketing-landing census,
// and the table-row demo-data census. All retired with this re-anchor:
//
//   - the WealthOS reference has NO marketing landing (`/` login-walls
//     guests — verified live, session 206); landingNavVerdict + its
//     pins are RETIRED (the surface does not exist here to guard).
//   - the reference's mobile shell is a non-semantic topbar whose
//     icon-only hamburger opens a full-screen plain-div drawer — the
//     mobile census is FUNCTIONAL now (opens + drawerLinks), replacing
//     the CRM shape vocabulary.
//   - the reference's workspace renders EMPTY STATES (the F-206a
//     decode: the R-4.2-era "demo corpus" belief was a misdecode —
//     both the session-205 captures and the live census show $0.00
//     KPIs and the empty-state copy); the demo-data census keys on
//     per-page empty-state SENTINELS, ZERO standing (the CRM-era
//     semantics restored: a re-seed changes every zero-data baseline).
//
// The standing constants below are the session-206 maiden's live
// measurements (the bundle fingerprint, the 256/9 sidebar, the
// 9-destination drawer) — the literals are the contract.
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");

const probe = () => import("../scripts/drift-probe");

describe("session-206 (R-4.3): the drift probe re-anchored to the WealthOS reference", () => {
  it("pickAppBundle: the largest script by bytes wins (the app-shell bundle discovery — POST-LOGIN)", async () => {
    const { pickAppBundle } = await probe();
    expect(
      pickAppBundle([
        { url: "https://ref/assets/badge.js", bytes: 21_914 },
        { url: "https://ref/assets/index-BMU57229.js", bytes: 1_402_874 },
      ]),
    ).toBe("https://ref/assets/index-BMU57229.js");
  });

  it("pickAppBundle: an empty list returns null (fail fast — never guess a bundle)", async () => {
    const { pickAppBundle } = await probe();
    expect(pickAppBundle([])).toBe(null);
  });

  it("stabilityVerdict: STABLE only on the EXACT md5 + byte count (a new reference bundle is a parity EVENT)", async () => {
    const { stabilityVerdict, STANDING } = await probe();
    expect(stabilityVerdict(STANDING.bundle, STANDING.bundle)).toBe("STABLE");
    expect(
      stabilityVerdict({ md5: "deadbeefdeadbeefdeadbeefdeadbeef", bytes: STANDING.bundle.bytes }, STANDING.bundle),
    ).toBe("CHANGED");
    expect(
      stabilityVerdict({ md5: STANDING.bundle.md5, bytes: STANDING.bundle.bytes + 1 }, STANDING.bundle),
    ).toBe("CHANGED");
  });

  it("desktopNavVerdict: STANDING at 256px + 9 visible links (the WealthOS w-64 sidebar, the 9 finance destinations)", async () => {
    const { desktopNavVerdict } = await probe();
    expect(desktopNavVerdict({ width: 256, visibleLinks: 9 })).toBe("STANDING");
    expect(desktopNavVerdict({ width: 240, visibleLinks: 9 })).toBe("CHANGED");
    expect(desktopNavVerdict({ width: 256, visibleLinks: 8 })).toBe("CHANGED");
  });

  it("mobileMenuVerdict: STANDING at opens + 9 drawer links (the functional TRUE-390 census — the ref's plain-div overlay drawer); CHANGED on any drift in EITHER direction", async () => {
    const { mobileMenuVerdict } = await probe();
    expect(mobileMenuVerdict({ opens: true, drawerLinks: 9 })).toBe("STANDING");
    expect(mobileMenuVerdict({ opens: false, drawerLinks: 0 })).toBe("CHANGED");
    expect(mobileMenuVerdict({ opens: true, drawerLinks: 8 })).toBe("CHANGED");
    expect(mobileMenuVerdict({ opens: true, drawerLinks: 10 })).toBe("CHANGED");
  });

  it("demoDataVerdict: ZERO when every walked surface shows its empty-state sentinel; SEEDED the moment any does not (the F-206a decode — the reference's workspace is EMPTY, the standing state)", async () => {
    const { demoDataVerdict } = await probe();
    expect(
      demoDataVerdict({ expenses: true, income: true, accounts: true, goals: true, investments: true }),
    ).toBe("ZERO");
    expect(
      demoDataVerdict({ expenses: true, income: false, accounts: true, goals: true, investments: true }),
    ).toBe("SEEDED");
  });

  it("DEMO_SENTINELS: the walked empty-state pages + the reference's own copy (the live-measured phrases)", async () => {
    const { DEMO_SENTINELS } = await probe();
    expect({ ...DEMO_SENTINELS }).toEqual({
      expenses: "No expenses yet",
      income: "No Income Sources Yet",
      accounts: "No accounts yet",
      goals: "No Goals Set Yet",
      investments: "0 holdings",
    });
  });

  it("STANDING: the pinned constants — the maiden bundle fingerprint · the 256/9 sidebar · the 9-destination drawer (the census contract the probe reports against)", async () => {
    const { STANDING } = await probe();
    expect(STANDING.bundle).toEqual({ md5: "6d3779af85c060852d9b7cd10bacecab", bytes: 1_402_874 });
    expect(STANDING.desktopNav).toEqual({ width: 256, visibleLinks: 9 });
    expect(STANDING.mobileMenu).toEqual({ opens: true, drawerLinks: 9 });
  });

  it("STANDING: the TRUE-390 census targets the app shell at /dashboard (the lowercase canonical — the s14 house rule)", async () => {
    const { STANDING } = await probe();
    expect(STANDING.mobileCensusPage).toBe("/dashboard");
  });

  it("the marketing-landing census is RETIRED (the WealthOS reference has no public landing — `/` login-walls guests; the s142 CRM surface does not exist here)", async () => {
    const m = await probe();
    expect("landingNavVerdict" in m).toBe(false);
    expect("landing" in m.STANDING).toBe(false);
  });

  it("the probe wires the seams: the WealthOS reference URL · package.json keeps probe:ref · the --json flag · NOT part of the offline gate", () => {
    const src = read("scripts/drift-probe.ts");
    expect(src).toContain('?? "https://wealth-os-d93bd04e.base44.app"');
    expect(src).not.toContain("neo-crm-8ab2c17c.base44.app");
    expect(src).toContain("export function pickAppBundle(");
    expect(src).toContain("export function stabilityVerdict(");
    expect(src).toContain("export function desktopNavVerdict(");
    expect(src).toContain("export function mobileMenuVerdict(");
    expect(src).toContain("export function demoDataVerdict(");
    expect(src).toContain("export const STANDING");
    expect(src).toContain("export const DEMO_SENTINELS");
    expect(src).toContain('process.argv.includes("--json")');
    expect(src).toMatch(/reference-stability/i);
    expect(src).toContain("NOT part of");
    const pkg = JSON.parse(read("package.json"));
    expect(pkg.scripts["probe:ref"]).toBe("bun scripts/drift-probe.ts");
    expect(pkg.scripts["gate:full"]).not.toContain("probe:ref");
    expect(pkg.scripts["gate"]).not.toContain("probe:ref");
  });
});
