// Session-204 pins (R-4.1, the plan-v2 F-203e program's first slice): the
// sweep re-anchored to the WealthOS reference. The tool shipped from the
// CRM era carrying the NEO-CRM reference URL, the CRM page list (contacts/
// leads/calendar/activities/reports/profile/about/contact), and the
// CRM-measured standing baselines — dormant and documented honestly since
// D-201b. This pin is the re-anchor's contract: the reference URL, the
// WealthOS page set (the 9 sections + the login/reset-password public
// faces — all 11 verified 200 on the reference live this session), the
// RETIRED baselines (empty class tables pending the R-4.2 maiden
// derivation), and the negative guard (the CRM reference URL may not
// return). The PURE seams (parsePagesArg / driftVerdict) stay pinned
// against the new reality — the CRM page names must now FAIL fast.
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

  it("the CRM genera/baselines are RETIRED: all four class tables empty (the R-4.2 pending state)", async () => {
    const { STANDING_BASELINES } = await sweep();
    for (const cls of ["desktop", "phone", "tablet", "landscape"] as const) {
      expect(Object.keys(STANDING_BASELINES[cls])).toHaveLength(0);
    }
  });

  it("standingBaseline returns the empty tables at all four bands (every page judges at baseline 0 until R-4.2)", async () => {
    const { standingBaseline } = await sweep();
    for (const width of [390, 768, 1024, 1440]) {
      expect(Object.keys(standingBaseline(width))).toHaveLength(0);
    }
  });

  it("standingExplained carries the R-4.2 pending-derivation note (the honest interim state, not stale CRM genera)", async () => {
    const { standingExplained } = await sweep();
    for (const width of [390, 768, 1024, 1440]) {
      const line = standingExplained(width);
      expect(line).toContain("R-4.2");
      expect(line).not.toContain("picklist-data genus");
    }
  });

  it("driftVerdict with the empty tables gates tightly: any page over the margin fails, baseline 0", async () => {
    const { driftVerdict, STANDING_BASELINES } = await sweep();
    const verdict = driftVerdict(
      [
        ["dashboard", 0.4],
        ["settings", 0.6],
      ],
      { ...STANDING_BASELINES.desktop },
      0.5,
    );
    expect(verdict.ok).toBe(false);
    expect(verdict.failures).toEqual([
      { page: "settings", pct: 0.6, baseline: 0, allowed: 0.5 },
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
