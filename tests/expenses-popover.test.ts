import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-217/218 (R-14/R-15, F-217a/F-218b) pinned the ANCHORED-POPOVER
// genus of the Expenses filters surface: the outside-close guard's Radix
// portal exclusions and the trigger-scoped pointerdown guard. Session-265
// (R-62, F-265b) REBUILT the surface as the reference's IN-FLOW EXPANSION
// CARD (live-probed at 1440×900: position static, a full-width sibling
// below the search row) — an in-flow card owns no outside-click overlay
// semantics (the reference's own card stays open through page clicks), so
// both guards retired WITH THE GENUS and their pins with them. The new
// genus is pinned in tests/parity-265.test.ts (the card inventory, the
// retired-listener family, the live-apply seam). What survives here is
// the R-38 focus-return contract: Escape closes the card and focus that
// died to <body> with the unmount lands back on the trigger.

const ROOT = path.resolve(import.meta.dirname, "..");
const PAGE = readFileSync(
  path.join(ROOT, "src/app/(app)/expenses/page.tsx"),
  "utf-8",
);

// Session-241 (R-38, F-241e — the card's focus return): the interior-
// focus close paths (the Escape key; the trigger toggle when focus sits
// inside) unmount the focused control with no restoration — focus dies
// to <body> and the next Tab restarts at the document top instead of the
// Filters trigger. The drawer's own cleanup pattern (cleanups run AFTER
// the commit that removed the surface): when activeElement is <body>,
// land focus back on the trigger; the trigger path (focus already on the
// trigger) is spared by construction.
// Session-242 (R-39, F-242d — the truth reword): the outside-pointer
// path no longer exists to spare — the guard retired with the anchored
// genus (session 265); the surviving close paths are the trigger toggle
// and Escape.
describe("R-38: the filters card restores focus on close (F-241e)", () => {
  it("the open-effect's cleanup returns focus that died to body", () => {
    expect(PAGE).toContain("document.activeElement === document.body");
    expect(PAGE).toContain("trigger?.focus()");
  });

  it("the retired anchored-popover guards stay retired (the F-265b genus)", () => {
    // The positive form of the retirement: the in-flow card wires NO
    // outside-pointerdown listener and NO scroller-close — re-adding
    // either would resurrect the anchored-genus hazards (the F-217a
    // portal trap, the F-238f under-header slide) on a surface that
    // no longer anchors.
    expect(PAGE).not.toMatch(/addEventListener\("pointerdown"/);
    expect(PAGE).not.toMatch(/addEventListener\("scroll"/);
    expect(PAGE).toMatch(/if \(e\.key !== "Escape"\) return;/);
  });
});
