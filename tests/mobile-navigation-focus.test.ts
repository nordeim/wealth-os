import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-217 (R-14, F-217e — the mobile drawer focus pin): the sheet
// renders BEFORE the header+main in DOM and nothing moved focus on
// open — from the hamburger, Tab landed on page content BEHIND the
// full-screen overlay (WCAG 2.4.3; live-probed by the audit). The
// non-Radix construction is correct (the aria-hidden trap) — the cure
// adds the compensating focus management: focus moves INTO the sheet
// on open, Tab cycles the visible modal surface (the sticky header's
// controls + the sheet's links), and focus returns to the trigger on
// close. Behavioral legs live in tests/e2e/mobile-navigation.spec.ts.

const ROOT = path.resolve(import.meta.dirname, "..");
const NAV = readFileSync(
  path.join(ROOT, "src/components/layout/mobile-nav.tsx"),
  "utf-8",
);

describe("R-14: the drawer owns its focus contract (F-217e)", () => {
  it("focus moves into the sheet on open", () => {
    expect(NAV).toMatch(/\.focus\(\)/);
    expect(NAV).toMatch(/querySelector<HTMLElement>\("a, button"\)/);
  });

  it("Tab cycles the modal surface — never the page content behind the overlay", () => {
    // The cycle scope = the header's buttons + the sheet's links
    // (the ✕ stays reachable — the non-modal construction preserved).
    expect(NAV).toMatch(/header button/);
    expect(NAV).toMatch(/e\.key !== "Tab"/);
    expect(NAV).toMatch(/preventDefault\(\)/);
  });

  it("the cycle visibility filter handles position:fixed (the sheet itself)", () => {
    // offsetParent is null for fixed-position elements — the filter
    // must use getClientRects, or the sheet's links drop out of scope.
    expect(NAV).toMatch(/getClientRects\(\)\.length > 0/);
  });

  it("focus returns to the trigger on close", () => {
    // The working shape (the useEffect-cleanup timing decode): cleanups
    // run AFTER the sheet leaves the DOM — activeElement is already
    // <body>, so the guard is "focus not already in the header," never
    // "focus inside the (removed) sheet."
    expect(NAV).toMatch(/header button\[aria-expanded\]/);
    expect(NAV).toMatch(/closest\("header"\)/);
    expect(NAV).toMatch(/trigger\.focus\(\)/);
  });
});
