#!/usr/bin/env python3
# Session-265 (R-62): the contract-change pin riders — the popover-guard
# pin family, the parity-216/238 legs, the parity-242 F-242d leg, and the
# two e2e sections. Each edit asserted (the docs-243 scoping doctrine).
import sys

def patch(path, pairs):
    src = open(path, encoding="utf-8").read()
    orig = src
    for old, new in pairs:
        assert src.count(old) == 1, f"{path}: anchor not unique: {old[:60]!r}"
        src = src.replace(old, new, 1)
    assert src != orig
    open(path, "w", encoding="utf-8").write(src)
    print(f"patched {path} ({len(pairs)} edits)")

# ---- tests/expenses-popover.test.ts — full rewrite (the genus retired) -------
open("tests/expenses-popover.test.ts", "w", encoding="utf-8").write('''import { readFileSync } from "node:fs";
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
    expect(PAGE).not.toMatch(/addEventListener\\("pointerdown"/);
    expect(PAGE).not.toMatch(/addEventListener\\("scroll"/);
    expect(PAGE).toMatch(/if \\(e\\.key !== "Escape"\\) return;/);
  });
});
''')
print("rewrote tests/expenses-popover.test.ts")

# ---- tests/parity-216.test.ts — the F-216i legs re-scoped ---------------------
patch("tests/parity-216.test.ts", [(
'''describe("parity-216: the Expenses filters popover closes (F-216i)", () => {
  it("the popover wires an Escape handler", () => {
    expect(EXPENSES).toMatch(/Escape/);
    expect(EXPENSES).toMatch(/addEventListener|onKeyDown/);
  });

  it("the popover closes on an outside pointerdown", () => {
    expect(EXPENSES).toMatch(/pointerdown/);
  });
});''',
'''describe("parity-216: the Expenses filters surface closes on Escape (F-216i, re-scoped F-265b)", () => {
  it("the surface wires an Escape handler", () => {
    expect(EXPENSES).toMatch(/Escape/);
    expect(EXPENSES).toMatch(/addEventListener|onKeyDown/);
  });

  it("the outside-pointerdown listener is retired with the anchored genus", () => {
    // Session-265 (R-62, F-265b): the surface is the reference's IN-FLOW
    // EXPANSION CARD (live-probed: position static, a sibling below the
    // search row) — it owns no overlay semantics, so the F-216i
    // outside-pointerdown arm retired with the anchoring (the pre-cure
    // pin matched the word in prose alone — the F-244e prose-satisfiable
    // genus; the honest form pins the listener's absence).
    expect(EXPENSES).not.toMatch(/addEventListener\\("pointerdown"/);
  });
});''')])

# ---- tests/parity-238.test.ts — the F-238f leg re-scoped ----------------------
patch("tests/parity-238.test.ts", [(
'''describe("F-238f — the Expenses filters popover closes on scroller movement", () => {
  it("the outside-close effect carries the scroll listener pair", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    // The genus: a non-portal popover anchored to the trigger slides
    // under the sticky z-50 header when the main scroller moves while
    // open — closing on scroll is the one-line cure (the z-map stays).
    expect(src).toMatch(/const onScroll = \\(\\) => setFiltersOpen\\(false\\);/);
    expect(src).toMatch(/addEventListener\\("scroll", onScroll/);
    expect(src).toMatch(/removeEventListener\\("scroll", onScroll/);
  });
});''',
'''describe("F-238f — the filters surface owns no scroller-close (retired with the anchored genus)", () => {
  it("the in-flow expansion card wires no scroll listener", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    // Session-265 (R-62, F-265b): the pre-cure surface was a non-portal
    // popover ANCHORED to the trigger — it slid under the sticky
    // z-50 header when the main scroller moved while open, and closing
    // on scroll was the one-line cure. The surface is now the
    // reference's IN-FLOW EXPANSION CARD (live-probed: position
    // static, a sibling below the search row) — nothing anchors,
    // nothing slides, and the scroll listener retired with the genus
    // (re-adding it would close a card the user is reading because
    // the PAGE scrolled).
    expect(src).not.toMatch(/addEventListener\\("scroll"/);
    expect(src).not.toMatch(/removeEventListener\\("scroll"/);
  });
});''')])

# ---- tests/parity-242.test.ts — the F-242d leg re-scoped ----------------------
patch("tests/parity-242.test.ts", [(
'''// ---- F-242d: the popover docblock tells the truth about the outside path -------

describe("F-242d — the popover focus-return comments tell the truth about the outside path", () => {
  const carriers = [
    "src/app/(app)/expenses/page.tsx",
    "tests/expenses-popover.test.ts",
    "tests/parity-241.test.ts",
  ];

  it("no carrier claims the outside pointerdown path is naturally spared", () => {
    for (const rel of carriers) {
      expect(read(rel), `${rel} still carries the over-claim`).not.toContain("naturally spared");
    }
  });

  it("the page's comment describes the mousedown focus landing", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toContain("keep whatever focus the mousedown");
  });
});''',
'''// ---- F-242d: the popover docblock tells the truth about the outside path -------
// (re-scoped session 265, R-62/F-265b: the outside-pointerdown guard retired
// with the anchored-popover genus — the in-flow expansion card owns no
// outside-close path at all, so the mousedown-landing truth sentence rode
// the retirement with the mechanism it described.)

describe("F-242d — the popover focus-return comments tell the truth about the outside path", () => {
  const carriers = [
    "src/app/(app)/expenses/page.tsx",
    "tests/expenses-popover.test.ts",
    "tests/parity-241.test.ts",
  ];

  it("no carrier claims the outside pointerdown path is naturally spared", () => {
    for (const rel of carriers) {
      expect(read(rel), `${rel} still carries the over-claim`).not.toContain("naturally spared");
    }
  });

  it("the page's comment describes no retired outside-pointerdown path", () => {
    // The honest form of the truth after the genus change: the guard
    // family retired, and no comment may describe a mechanism the page
    // no longer wires (the pre-cure pin demanded the mousedown-landing
    // sentence — the mechanism it described retired with the genus).
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).not.toContain("keep whatever focus the mousedown");
    expect(src).not.toMatch(/addEventListener\\("pointerdown"/);
  });
});''')])

# ---- tests/e2e/wealthos.spec.ts — the two popover sections --------------------
patch("tests/e2e/wealthos.spec.ts", [(
'''    // Close cleanly and assert the list is filtered.
    await page.getByRole("button", { name: "Close filters" }).click();
    await expect(popover).toHaveCount(0);
    await expect(page.getByText("Whole Foods Run").first()).toBeVisible();
    await expect(page.getByText("Apartment Rent")).toHaveCount(0);
  });

  test("outside pointerdown still closes the popover (the F-216i contract kept)", async ({ page }) => {
    await page.goto("/Expenses");
    await page.getByRole("button", { name: /Filters/ }).click();
    const popover = page.getByRole("group", { name: "Expense filters" });
    await expect(popover).toBeVisible();
    // A pointerdown on the page HEADING (outside the popover, not a
    // portal surface, not an expanded trigger) closes it.
    await page.getByRole("heading", { name: /Expenses/ }).first().click();
    await expect(popover).toHaveCount(0);
  });''',
'''    // Close cleanly (Escape — the card's keyboard close) and assert
    // the list is filtered.
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
    await expect(page.getByText("Whole Foods Run").first()).toBeVisible();
    await expect(page.getByText("Apartment Rent")).toHaveCount(0);
  });

  test("an outside pointerdown leaves the expansion card standing (the F-265b genus)", async ({ page }) => {
    // Session-265 (R-62, F-265b): the reference's filter surface is an
    // IN-FLOW EXPANSION CARD (live-probed: position static, a sibling
    // below the search row) — it owns no overlay semantics and the
    // reference's own card stays open through page clicks. The
    // anchored-popover's outside-close contract (the F-216i leg this
    // replaces) retired with the genus: a click on the page heading
    // must leave the card standing; the trigger toggle and Escape
    // close it.
    await page.goto("/Expenses");
    await page.getByRole("button", { name: /Filters/ }).click();
    const panel = page.getByRole("group", { name: "Expense filters" });
    await expect(panel).toBeVisible();
    await page.getByRole("heading", { name: /Expenses/ }).first().click();
    await expect(panel).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
  });'''),
(
'''    await page.getByRole("button", { name: /Filters/ }).click();
    const popover = page.getByRole("group", { name: "Expense filters" });
    await expect(popover).toBeVisible();
    await page.locator("#expense-category-filter").click();
    await page.getByRole("option", { name: /Groceries/ }).click();
    // The popover SURVIVES the pick and the filter APPLIES — the
    // history count collapses to the seeded Groceries rows.
    await expect(popover).toBeVisible();''',
'''    await page.getByRole("button", { name: /Filters/ }).click();
    const panel = page.getByRole("group", { name: "Expense filters" });
    await expect(panel).toBeVisible();
    await page.locator("#expense-category-filter").click();
    await page.getByRole("option", { name: /Groceries/ }).click();
    // The panel SURVIVES the pick and the filter APPLIES (live) — the
    // history count collapses to the seeded Groceries rows.
    await expect(panel).toBeVisible();'''),
(
'''    // The cure: the guard spares the Radix portal surfaces.
    await page.goto("/Expenses");''',
'''    // The cure: the guard spares the Radix portal surfaces.
    // Session-265 (R-62, F-265b): the surface is now the IN-FLOW
    // EXPANSION CARD (no outside-close guard at all — the anchored-
    // popover genus retired), so the pick cannot die mid-interaction
    // by construction; the live-apply contract the leg pins survives.
    await page.goto("/Expenses");'''),
(
'''    await expect(
      dialog.getByText(/Your top spending categories this month:/),
    ).toBeVisible({ timeout: 15_000 });''',
'''    // Session-265 (R-62, F-265d): the answer now rides TWO elements —
    // the transcript bubble AND the dedicated announcement region (the
    // sr-only mirror that replaced the whole-list live region). The
    // transcript bubble is FIRST in DOM order (the list precedes the
    // region), so .first() scopes the visible face deterministically.
    await expect(
      dialog.getByText(/Your top spending categories this month:/).first(),
    ).toBeVisible({ timeout: 15_000 });''')])

print("all pin riders applied")
