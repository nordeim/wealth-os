// Session-223 (R-20): the dead-signout and dark-surface completion
// round's source pins. Every pin was born RED against the pre-round
// tree and carries its finding's citation. The round's verified
// defects: the desktop sidebar's Sign Out called bare logout() while
// the navigating signOut helper sat dead beside it (the infinite
// loading gate); the R-19 round's own dark:text-stone-50 painted
// 2.06:1 ink on the unflipped amber Try-again; the dashboard and
// investments donut Tooltips missed the isDark completion (the only
// two bare sites repo-wide); the F-222d rollover guard's $-anchor
// missed time-suffixed numeric dates; month-only named forms
// invented day 1; the desktop synced pill's light arm rendered on
// the always-dark sidebar gradient; the investments type chips'
// 600/700 inks computed 2.02:1 over dark cards; the F-222g ring
// family missed four controls; the income/expenses pastel tiles
// rendered bright on dark cards; the import alert's light arm
// measured 4.41:1; logout performed no server-side revocation; the
// verify route's message ladder was a pending-state enumeration
// oracle. The behavioral csv pins live in tests/csv.test.ts; the
// desktop sign-out e2e leg lives in tests/e2e/mobile-navigation.spec.ts.
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = (p: string) => readFileSync(p, "utf8");

// ---- F-223a: the desktop sidebar's Sign Out navigates ------------------------

describe("F-223a — the desktop Sign Out wires the navigating signOut helper", () => {
  it("the MenuItem calls signOut() (not the bare store logout)", () => {
    const src = read("src/components/layout/sidebar.tsx");
    expect(src).toContain("onSelect={() => void signOut()}");
    expect(src).not.toContain("onSelect={() => void logout()}");
  });

  it("the signOut helper keeps the logout + push + refresh contract (the drawer's form)", () => {
    const src = read("src/components/layout/sidebar.tsx");
    expect(src).toContain('router.push("/login");');
    expect(src).toContain("router.refresh();");
  });
});

// ---- F-223b: the error boundary's Try-again keeps the F-219a genus -----------

describe("F-223b — the Try-again ink is stone-900 on amber in BOTH modes", () => {
  it("error.tsx carries NO dark ink arm on the amber button (the unflipped fill)", () => {
    const src = read("src/app/error.tsx");
    expect(src).toContain("text-stone-900 bg-primary");
    expect(src).not.toContain("dark:text-stone-50");
    expect(src).not.toContain("dark:text-white");
  });
});

// ---- F-223c: the two missed donut Tooltips join the isDark family ------------

describe("F-223c — every Tooltip site carries the isDark styles (per-page counts)", () => {
  it("dashboard: both Tooltip sites carry contentStyle={tooltipStyle}", () => {
    const src = read("src/app/(app)/dashboard/page.tsx");
    const sites = src.split("<Tooltip").length - 1;
    const styled = src.split("contentStyle={tooltipStyle}").length - 1;
    expect(sites).toBe(2);
    expect(styled).toBe(2);
  });

  it("investments: both Tooltip sites carry contentStyle={tooltipStyle}", () => {
    const src = read("src/app/(app)/investments/page.tsx");
    const sites = src.split("<Tooltip").length - 1;
    const styled = src.split("contentStyle={tooltipStyle}").length - 1;
    expect(sites).toBe(2);
    expect(styled).toBe(2);
  });
});

// ---- F-223d/e: the csv guard completion ---------------------------------------

describe("F-223d — the numeric locale anchor tolerates a trailing time", () => {
  it("NUMERIC_LOCALE anchors on (?![0-9]) lookahead, not end-of-string", () => {
    const src = read("src/lib/csv.ts");
    // Session-224 (R-21, F-224a) recalibration: the separators are
    // NON-LETTER runs — the old \\D+ matched " Nov ", so the named
    // form "2026 Nov 15 10:00" rode the NUMERIC guard and the widened
    // year gate failed it (live-reproduced in-commit). The anchor
    // contract (the trailing-time tolerance) is unchanged.
    expect(src).toContain(
      "const NUMERIC_LOCALE = /^(\\d{1,4})[^\\dA-Za-z]+(\\d{1,2})[^\\dA-Za-z]+(\\d{2,4})(?!\\d)/;",
    );
    expect(src).not.toContain("(\\d{2,4})$;");
  });
});

describe("F-223e — month-only named forms skip (never an invented day)", () => {
  it("the MONTH_ONLY rejection rides the seam head beside PARTIAL_ISO", () => {
    const src = read("src/lib/csv.ts");
    // Session-224 (R-21, F-224c) recalibration: the bare forward form
    // became the FORM-PRECISE family — separators [\\s.-], an
    // optional TIME tail (a bare lookahead would reject the
    // day-carrying "Nov 2026 15"), and the REVERSED twin. The seam
    // head contract (the rejection fires beside PARTIAL_ISO) is
    // unchanged; the behavioral pins live in tests/csv.test.ts.
    // Session-226 (R-23, F-226a) recalibration: the family gained the
    // DESIGNATED_NAMED_TAIL ("Nov 2026 UTC" — the invented day AND the
    // zone shift; the bare offset stays excluded for the ISO-date
    // hazard) and the `i` flag (lowercase utc/gmt).
    expect(src).toContain(
      "const MONTH_ONLY = new RegExp(",
    );
    expect(src).toContain(
      "`^[A-Za-z]{3,9}[\\\\s.-]+\\\\d{4}${MONTH_YEAR_TIME}${DESIGNATED_NAMED_TAIL}`",
    );
    expect(src).toContain("const REV_MONTH_ONLY = new RegExp(");
    expect(src).toContain(
      "if (MONTH_ONLY.test(trimmed) || REV_MONTH_ONLY.test(trimmed)) return null;",
    );
  });
});

// ---- F-223f: the desktop synced pill's dark-surface pairing ------------------

describe("F-223f — the desktop synced pill pairs for the ALWAYS-DARK sidebar", () => {
  it("NAV_LAYOUT.syncedPill carries green-400/green-600 unconditionally (no light arm)", () => {
    const src = read("src/lib/page-layout.ts");
    const navBlock = src.slice(
      src.indexOf("syncedPill:"),
      src.indexOf("} as const;", src.indexOf("syncedPill:")),
    );
    expect(navBlock).toContain("text-green-400");
    expect(navBlock).toContain("border-green-600");
    expect(navBlock).not.toContain("text-green-700");
    expect(navBlock).not.toContain("dark:text-green-400");
  });

  it("MOBILE_HEADER.syncedPill keeps its light/dark arms (the topbar wash is light in light mode)", () => {
    const src = read("src/lib/page-layout.ts");
    const declAt = src.indexOf("MOBILE_HEADER = {");
    const mobileBlock = src.slice(
      declAt,
      src.indexOf("} as const;", declAt),
    );
    expect(mobileBlock).toContain("text-green-700");
    expect(mobileBlock).toContain("dark:text-green-400");
  });
});

// ---- F-223g: the investments type chips' dark ink -----------------------------

describe("F-223g — the investments type chips select a dark-surface ink", () => {
  it("INVESTMENT_TYPES carries a textDark 400-level step for every type", () => {
    const src = read("src/lib/constants.ts");
    const block = src.slice(
      src.indexOf("export const INVESTMENT_TYPES"),
      src.indexOf("] as const;", src.indexOf("export const INVESTMENT_TYPES")),
    );
    const rows = block.match(/\{ value: "[a-z]+"/g) ?? [];
    const darkSteps = block.match(/textDark: "#/g) ?? [];
    expect(rows.length).toBe(6);
    expect(darkSteps.length).toBe(6);
  });

  it("the chip ink selects via the page's isDark", () => {
    const src = read("src/app/(app)/investments/page.tsx");
    expect(src).toContain('color: isDark ? meta?.textDark ?? "#d6d3d1" : meta?.text ?? "#57534e"');
  });
});

// ---- F-223h: the focus-ring family's tail -------------------------------------

describe("F-223h — the four tail controls carry the house focus ring", () => {
  it("login-reset: the sent view's Back joins the amber genus (5 ring sites)", () => {
    const src = read("src/lib/login-reset.ts");
    const ring =
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2";
    const escaped = ring.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    expect(src.match(new RegExp(escaped, "g"))?.length).toBe(5);
  });

  it("ai-coach: the suggested-question chips and the Send button carry the ring", () => {
    const src = read("src/components/shared/ai-coach.tsx");
    const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
    const escaped = ring.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // one for the chip loop + one for the Send button
    expect(src.match(new RegExp(escaped, "g"))?.length).toBeGreaterThanOrEqual(2);
  });

  it("reset-password: the Back to login carries the amber ring", () => {
    const src = read("src/components/layout/reset-password-screen.tsx");
    expect(src).toContain(
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2",
    );
  });
});

// ---- F-223i: the income/expenses tile backgrounds adapt to dark ---------------

describe("F-223i — the pastel icon tiles flip to the alpha tint in dark", () => {
  it("income: the tile background selects the alpha form when dark", () => {
    const src = read("src/app/(app)/income/page.tsx");
    expect(src).toContain('backgroundColor: isDark ? `${style.color}1a` : style.soft');
  });

  it("expenses: the tile background selects the alpha form when dark", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toContain('backgroundColor: isDark ? `${meta.color}1a` : meta.soft');
  });
});

// ---- F-223j: the import error alert's light arm ------------------------------

describe("F-223j — the import error alert's light ink is red-700", () => {
  it("the role=alert text carries text-red-700 (red-600 measured 4.41:1 on red-50)", () => {
    const src = read("src/app/(app)/import/page.tsx");
    expect(src).toContain("text-red-700 dark:bg-red-500/10 dark:text-red-400");
    expect(src).not.toContain("text-red-600 dark:bg-red-500/10");
  });
});

// ---- F-223k: logout revokes the session server-side --------------------------

describe("F-223k — logout bumps tokenVersion before clearing the cookie", () => {
  it("the route resolves the session user and increments the version", () => {
    const src = read("src/app/api/auth/logout/route.ts");
    expect(src).toContain("getSessionUser");
    expect(src).toContain("tokenVersion: { increment: 1 }");
  });
});

// ---- F-223l: the verify route's unified no-pending message -------------------

describe("F-223l — the no-pending branch answers the remaining-message form", () => {
  it("the no-pending branch uses verificationRemainingMessage (no pending-state oracle)", () => {
    const src = read("src/app/api/auth/verify/route.ts");
    // Session-224 (R-21, F-224b) recalibration: the FIRST RUNG —
    // answering MAX left a numeric tell (the wrong-code ladder's
    // reachable values are 4…1, so a single probe read "5 remaining"
    // ⟺ no pending code). MAX-1 makes the single-probe reply
    // byte-identical to a fresh pending code's.
    expect(src).toContain(
      "verificationRemainingMessage(VERIFICATION_MAX_ATTEMPTS - 1)",
    );
    // The lockout message stays on the LOCKED branch only (429) —
    // the two 400 bodies must be identical in shape.
    const lockout400 = src.match(
      /fail\("VERIFICATION_INVALID", verificationLockoutMessage\(\), 400\)/,
    );
    expect(lockout400).toBeNull();
  });
});
