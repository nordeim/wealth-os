#!/usr/bin/env python3
"""Session-275 cures (R-72.2) — every site asserted exactly-once (or the
stated count) before any write:

  F-275a  the DialogHeader docblock's opacity tail reworded to the
          mechanism truth (the full stone ink + the F-221l citation)
  F-275b  the PAD §7.1 domain-seams row's three pipes escaped inside
          the code span (the F-247i form)
  F-275c  the a11y spec header's coverage-truth note
  F-275d  the three open-state a11y legs gain the scroll helper call
  F-275e  the AGENTS F-217a entry's genus-retirement cross-ref

The F-229d discipline binds every reword: describe with spaces and
numbers, never coin a hyphenated form a scanner could read as a class
("the full stone ink", not a utility citation)."""

import sys


def sub(text: str, old: str, new: str, label: str, count: int = 1) -> str:
    n = text.count(old)
    if n != count:
        sys.exit(f"[{label}] expected {count} occurrence(s), found {n}: {old[:70]!r}")
    return text.replace(old, new)


def rw(path: str, pairs: list[tuple[str, str, str, int]]) -> None:
    with open(path, encoding="utf-8") as f:
        s = f.read()
    for old, new, label, count in pairs:
        s = sub(s, old, new, label, count)
    with open(path, "w", encoding="utf-8") as f:
        f.write(s)
    print(f"cured {path}")


# ---- F-275a: the DialogHeader docblock's mechanism truth -------------------

rw("src/components/ui/dialog.tsx", [
    (
        """  // The old right-side clearance is gone (the X is the opacity pattern
  // now).""",
        """  // The old right-side clearance is gone (the close X rides the full
  // stone ink with a hover one step deeper in each mode — the F-221l
  // contrast cure; the S15 opacity dimming retired with it, and the
  // constant's own comment carries the measured ratios).""",
        "F-275a the opacity tail",
        1,
    ),
])

# ---- F-275b: the PAD domain-seams row's escaped pipes ----------------------

rw("Project_Architecture_Document.md", [
    (
        "`tests/finance|ai|schemas-finance|verification-code.test.ts`",
        r"`tests/finance\|ai\|schemas-finance\|verification-code.test.ts`",
        "F-275b the domain-seams pipes",
        1,
    ),
])

# ---- F-275c: the a11y spec header's coverage note --------------------------

rw("tests/e2e/a11y.spec.ts", [
    (
        """// The axe engine rides the DECLARED devDep (package.json: axe-core).
""",
        """// The axe engine rides the DECLARED devDep (package.json: axe-core).
//
// Session-275 (R-72, F-275c — the coverage truth): the blanket gate
// rides axe.run() with NO runOnly, which evaluates the engine's
// DEFAULT-ENABLED set — the WCAG 2.0/2.1 A and AA rules. The
// 2.2-only criteria ride elsewhere: target-size (2.5.8) ships
// DISABLED BY DEFAULT in axe-core 4.14 (the sole wcag22aa-tagged
// rule, switched off at registration) and is covered by the bespoke
// hit-area pins (the switch leg, the dialog close and toast dismiss
// targets); dragging (2.5.7) and focus-not-obscured (2.4.11) carry
// no default-enabled rule and ride the escape-stacking and skip-link
// legs. The doc set's "WCAG 2.2 AA" is the design target; this gate
// is its executable floor — a future small-control surface needs its
// own targeted pin, not a blanket runOnly (the reference's own
// parity-mandated small controls would trip the rule family).
""",
        "F-275c the coverage note",
        1,
    ),
])

# ---- F-275d: the three open-state legs gain the scroll helper --------------

with open("tests/e2e/a11y.spec.ts", encoding="utf-8") as f:
    spec = f.read()

OPEN_PATTERN = """    await expect(page.getByRole("dialog")).toBeVisible();
    assertTwoGate(await runAxe(page));"""
OPEN_CURE = """    await expect(page.getByRole("dialog")).toBeVisible();
    await scrollThrough(page);
    assertTwoGate(await runAxe(page));"""

spec = sub(spec, OPEN_PATTERN, OPEN_CURE, "F-275d the open-state trio", 3)

with open("tests/e2e/a11y.spec.ts", "w", encoding="utf-8") as f:
    f.write(spec)
print("cured tests/e2e/a11y.spec.ts (the open-state trio)")

# ---- F-275e: the AGENTS F-217a entry's genus-retirement cross-ref ----------

rw("AGENTS.md", [
    (
        "- **A DOM-scoped outside-close listener fires on PORTALED Radix\n"
        "  surfaces** (session-217, F-217a): the Expenses filters popover's",
        "- **A DOM-scoped outside-close listener fires on PORTALED Radix\n"
        "  surfaces** (session-217, F-217a — the Expenses popover genus\n"
        "  retired at F-265b for the reference's in-flow expansion card;\n"
        "  the lesson binds portaled surfaces generally): the Expenses\n"
        "  filters popover's",
        "F-275e the genus-retirement cross-ref",
        1,
    ),
])

print("cures-275 complete: F-275a dialog truth · F-275b pipes · F-275c coverage · F-275d trio · F-275e cross-ref")
