import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-217 (R-14, F-217a — the Expenses filters popover pin): the
// F-216i outside-close listener closes on any pointerdown outside the
// popover group — but the Category <Select> renders its options through
// a BODY PORTAL (SelectPrimitive.Portal — outside the group in DOM),
// and a SelectItem is a div[role="option"], not a button[aria-expanded]:
// a mouse pick fired setFiltersOpen(false) MID-INTERACTION, the popover
// (parent of the Select root) unmounted, and the category filter was
// NEVER applied (live-reproduced this session). The e2e Escape leg
// never covered the pointer path. These pins freeze the cure: the
// outside-close guard EXCLUDES the Radix portal surfaces, the
// expanded-button guard is scoped to the popover's OWN trigger, and
// Escape closes the popover only when no Radix layer is open above it.

const ROOT = path.resolve(import.meta.dirname, "..");
const PAGE = readFileSync(
  path.join(ROOT, "src/app/(app)/expenses/page.tsx"),
  "utf-8",
);

describe("R-14: the filters popover's outside-close spares the portaled Select (F-217a)", () => {
  it("the pointerdown guard excludes the Radix portal surfaces", () => {
    // An option lives in document.body (the portal), NOT inside the
    // popover group — the guard must skip it or the pick dies mid-flight.
    expect(PAGE).toMatch(
      /\[role="option"\], \[role="listbox"\], \[data-radix-popper-content-wrapper\]/,
    );
  });

  it("the expanded-button guard is scoped to the popover's own trigger, not every expanded button", () => {
    // The pre-cure form matched ANY button[aria-expanded] — including
    // the drawer hamburger — leaving the popover mounted behind it.
    expect(PAGE).not.toMatch(/closest\('button\[aria-expanded\]'\)/);
  });

  it("Escape closes the popover only when no Radix layer is open above it", () => {
    // One Escape with the Select open must close the Select (Radix's
    // own layer dismissal) and LEAVE the popover mounted for the pick.
    expect(PAGE).toMatch(/data-radix-popper-content-wrapper/);
  });

  it("the guard family documents the portal mechanism (the why)", () => {
    expect(PAGE).toMatch(/portal/i);
  });
});

// Session-218 (R-15, F-218b — the trigger-scoped guard): the R-14 cure
// removed the bare button[aria-expanded] guard but never landed the
// scoped replacement its own comment claimed — the trigger carries no
// aria-label (that label rides the popover PANEL, a DOM sibling, so
// closest() never matches it), pointerdown closed the popover, the
// effect detached, and the subsequent click toggled false→true: the
// toggle flicker-reopened (live-reproduced — the e2e battery covered
// the Select pick and the outside close, never the trigger toggle).
describe("R-15: the trigger-scoped guard exists (F-218b)", () => {
  it("the filters trigger's own pointerdown never closes the popover", () => {
    // The positive form: the trigger's ref is excluded BEFORE
    // setFiltersOpen(false) — the bare-selector absence pin above let
    // the regression ship.
    expect(PAGE).toMatch(/filtersTriggerRef/);
    expect(PAGE).toMatch(/filtersTriggerRef\.current\?\.contains\(e\.target\)/);
  });

  it("the ref rides the Filters button (the toggle itself, not a stranger)", () => {
    expect(PAGE).toMatch(/ref=\{filtersTriggerRef\}/);
  });
});

// Session-241 (R-38, F-241e — the popover's focus return): every
// interior-focus close path (the ✕ click/Enter, the Escape close, the
// scroll-close) unmounted the focused control with no restoration —
// focus died to <body> and the next Tab restarted at the document top
// instead of the Filters trigger. The drawer's own cleanup pattern
// (cleanups run AFTER the commit that removed the surface): when
// activeElement is <body>, land focus back on the trigger; the toggle
// path (focus already on the trigger) is spared by construction.
// Session-242 (R-39, F-242d — the truth reword): the outside-pointer
// path can also fire the return — a pointerdown on non-focusable
// space moves focus to <body> in Chrome/Firefox — so outside
// pointerdowns keep whatever focus the mousedown lands on.
describe("R-38: the filters popover restores focus on close (F-241e)", () => {
  it("the open-effect's cleanup returns focus that died to body", () => {
    expect(PAGE).toContain("document.activeElement === document.body");
    expect(PAGE).toContain("trigger?.focus()");
  });
});
