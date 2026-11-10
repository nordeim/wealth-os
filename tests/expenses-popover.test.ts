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
