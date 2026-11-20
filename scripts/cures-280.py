#!/usr/bin/env python3
"""Session-280 cures — R-77.2 (the hyphen-required, whole-tree-net, and
open-axe round).

Six cure sites across six files, every one asserted exactly-once, the
script RESUMABLE (the F-242j doctrine: a half-cured shape refuses
loudly, an already-healed site skips):

  1. tests/parity-276.test.ts   the delimiter predicate gains the
                                 hyphen-required cell form (F-280a)
  2. tests/parity-277.test.ts   the delimiter predicate hardening
                                 (F-280a)
  3. tests/parity-278.test.ts   the delimiter predicate hardening
                                 (F-280a)
  4. tests/parity-279.test.ts   the delimiter predicate hardening
                                 (F-280a)
  5. tests/shell-parity.test.ts  the phantom-breakpoint net widens to
                                 the whole src tree (F-280k: the import
                                 arm, the walkSrcRel helper, the leg's
                                 loops)
  6. tests/e2e/a11y.spec.ts      the filters-card open-state axe leg
                                 joins the two-gate's family (F-280j)

ZERO application behavior changed: five test files' scanners and one
new e2e leg (a coverage closure on a surface pre-flighted clean)."""

import sys


def heal(text: str, old: str, new: str, label: str, fname: str) -> str:
    """Replace exactly-once; resume if already healed; refuse ambiguity."""
    if new in text and old not in text:
        print(f"  [skip] {fname}: {label} already healed")
        return text
    n = text.count(old)
    if n != 1:
        sys.exit(f"[{label}] {fname}: expected exactly 1 old form, found {n}")
    if text.count(new) != 0:
        sys.exit(f"[{label}] {fname}: the new form already present alongside the old")
    print(f"  [cure] {fname}: {label}")
    return text.replace(old, new, 1)


# ---- 1-2. parity-276 / parity-277: the annotated predicate ----------------
PRED_NOTE_A = """// Session-280 (R-77, F-280a): the colon-tolerant shape gains its
// substance — the cmark-gfm reference scanner admits a delimiter cell
// as spaces, an optional edge colon, a NON-EMPTY hyphen run, an
// optional edge colon, spaces; a cell carrying no hyphen, or a colon
// inside the run, renders NO table on GitHub while passing the loose
// shape this round retires.
const isDelimiter = (l: string): boolean => /^\\s*\\|(\\s*:?-+:?\\s*\\|)+\\s*$/.test(l);"""

PRED_OLD_A = """const isDelimiter = (l: string): boolean => /^\\s*\\|[\\s:|-]+\\|\\s*$/.test(l);"""

for fname in ("tests/parity-276.test.ts", "tests/parity-277.test.ts"):
    with open(fname, encoding="utf8") as f:
        t = f.read()
    t = heal(t, PRED_OLD_A, PRED_NOTE_A, "the hyphen-required predicate", fname)
    with open(fname, "w", encoding="utf8") as f:
        f.write(t)

# ---- 3-4. parity-278 / parity-279: the bare predicate ----------------------
PRED_NOTE_B = """// Session-280 (R-77, F-280a): the colon-tolerant shape gains its
// substance — the cmark-gfm reference scanner admits a delimiter cell
// as spaces, an optional edge colon, a NON-EMPTY hyphen run, an
// optional edge colon, spaces; a cell carrying no hyphen, or a colon
// inside the run, renders NO table on GitHub while passing the loose
// shape this round retires.
const isDelimiter = (l: string) => /^\\s*\\|(\\s*:?-+:?\\s*\\|)+\\s*$/.test(l);"""

PRED_OLD_B = """const isDelimiter = (l: string) => /^\\s*\\|[\\s:|-]+\\|\\s*$/.test(l);"""

for fname in ("tests/parity-278.test.ts", "tests/parity-279.test.ts"):
    with open(fname, encoding="utf8") as f:
        t = f.read()
    t = heal(t, PRED_OLD_B, PRED_NOTE_B, "the hyphen-required predicate", fname)
    with open(fname, "w", encoding="utf8") as f:
        f.write(t)

# ---- 5. shell-parity: the whole-tree net ------------------------------------
SHELL = "tests/shell-parity.test.ts"
with open(SHELL, encoding="utf8") as f:
    t = f.read()

# 5a. the fs imports widen.
t = heal(
    t,
    'import { existsSync, readFileSync } from "node:fs";',
    'import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";',
    "the fs imports",
    SHELL,
)

# 5b. the walkSrcRel helper lands after codeOf — the APPEND-STYLE site:
# the old line survives inside the new block, so the resume check keys
# on the helper's own name (the house marker-guard pattern).
HELPER = """const codeOf = (rel: string): string => stripComments(readOr(rel));

// The whole-tree source walk (session 280, R-77, F-280k): every
// .ts/.tsx/.jsx/.css under src/, the regenerated prisma client
// skipped (the parity-229 convention) — the phantom-breakpoint net's
// coverage IS the tree, never an enumerated subset.
const walkSrcRel = (): string[] => {
  const out: string[] = [];
  const dive = (dir: string) => {
    for (const name of readdirSync(dir)) {
      if (name === "generated") continue; // the regenerated prisma client
      const full = path.join(dir, name);
      if (statSync(full).isDirectory()) dive(full);
      else if (/\\.(ts|tsx|jsx|css)$/.test(name)) out.push(path.relative(repoFile("."), full));
    }
  };
  dive(repoFile("src"));
  return out;
};"""

if "const walkSrcRel" in t:
    print(f"  [skip] {SHELL}: the walkSrcRel helper already healed")
else:
    t = heal(
        t,
        "const codeOf = (rel: string): string => stripComments(readOr(rel));",
        HELPER,
        "the walkSrcRel helper",
        SHELL,
    )

# 5c. the phantom-breakpoint leg's loops widen to the walk.
LEG_OLD = """  it("no src file references a variant this Tailwind v4 setup never defines (xs/2xs/3xs silently generate NO CSS)", () => {
    const offenders: string[] = [];
    for (const page of APP_PAGES) {
      const src = codeOf(pageSrc(page));
      if (/\\b(?:xs|2xs|3xs):/.test(src)) offenders.push(`(app)/${page}/page.tsx`);
    }
    for (const rel of [
      "src/components/layout/mobile-header.tsx",
      "src/components/layout/mobile-nav.tsx",
      "src/components/layout/sidebar.tsx",
      "src/components/layout/app-shell.tsx",
      "src/components/shared/page-parts.tsx",
      "src/components/shared/ai-coach.tsx",
    ]) {
      if (/\\b(?:xs|2xs|3xs):/.test(codeOf(rel))) offenders.push(rel);
    }
    expect(offenders, `phantom breakpoint variants found: ${offenders.join(", ")}`).toEqual([]);
  });"""

LEG_NEW = """  it("no src file references a variant this Tailwind v4 setup never defines (xs/2xs/3xs silently generate NO CSS)", () => {
    // Session-280 (R-77, F-280k): the net widens from the enumerated
    // fifteen-file set to the WHOLE src tree — the login card, the
    // reset screens, the guest redirect, the nav config, the section
    // layout bridges, and the ui primitives all sat outside the old
    // net (the F-207a genus returning as a coverage hole; the tree is
    // clean, so the widening rides green from birth). The walk skips
    // the regenerated prisma client (the parity-229 convention).
    const offenders: string[] = [];
    for (const rel of walkSrcRel()) {
      if (/\\b(?:xs|2xs|3xs):/.test(codeOf(rel))) offenders.push(rel);
    }
    expect(offenders, `phantom breakpoint variants found: ${offenders.join(", ")}`).toEqual([]);
  });"""

t = heal(t, LEG_OLD, LEG_NEW, "the whole-tree phantom-breakpoint net", SHELL)

with open(SHELL, "w", encoding="utf8") as f:
    f.write(t)

# ---- 6. a11y.spec: the filters-card open-state leg --------------------------
AXE = "tests/e2e/a11y.spec.ts"
with open(AXE, encoding="utf8") as f:
    t = f.read()

LEG_ANCHOR = """    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/Expenses");
    await page.getByRole("button", { name: "Add Expense" }).first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    // The modal surfaces lock the main scroller (the drawer's own
    // lock, Radix's body lock), so the helper is a no-op here today —
    // kept for the F-221f letter's uniformity (a tall dialog at
    // phone widths would otherwise slip the leg).
    await scrollThrough(page);
    assertTwoGate(await runAxe(page));
  });
"""

LEG_INSERT = LEG_ANCHOR + """
  // Session-280 (R-77, F-280j): the open-state family's fourth
  // surface — the session-265 in-flow filters expansion card (four
  // labeled Selects, two date inputs, the quick-amount group, the
  // three-action footer). The card grows the page IN-FLOW, so the
  // scroll-through matters (the F-221f form: axe sees only what is
  // rendered); the surface was pre-flighted clean this round.
  test("desktop /Expenses with the filters expansion card OPEN — structural zero + sanctioned citations (F-280j)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/Expenses");
    await page.getByRole("button", { name: /Filters/ }).click();
    await expect(page.getByRole("group", { name: "Expense filters" })).toBeVisible();
    await scrollThrough(page);
    assertTwoGate(await runAxe(page));
  });
"""

# The INSERT-STYLE site: the anchor survives inside the insert, so the
# resume check keys on the new leg's own name (the house marker-guard
# pattern — the same append-style edge as the walkSrcRel helper).
if "filters expansion card OPEN" in t:
    print(f"  [skip] {AXE}: the filters-card open-state leg already healed")
else:
    t = heal(t, LEG_ANCHOR, LEG_INSERT, "the filters-card open-state leg", AXE)

with open(AXE, "w", encoding="utf8") as f:
    f.write(t)

# ---- 7. parity-275: the F-275d census's same-commit recalibration ---------
# The standing pin counts the spec's scrollThrough calls (13: the 10
# standing legs + the open-state trio); the F-280j leg makes 14 (the
# open-state QUARTET), and the pin's own comment mandates the
# same-commit update ("a future leg that adds or drops a call updates
# this pin in the same commit" — the F-277d contract-change doctrine).
P275 = "tests/parity-275.test.ts"
with open(P275, encoding="utf8") as f:
    t = f.read()

t = heal(
    t,
    'describe("F-275d — every axe leg scrolls first, the open-state trio included", () => {\n  const spec = read("tests/e2e/a11y.spec.ts");\n  const OPEN_LEGS = [\n    "phone /Dashboard with the drawer OPEN",\n    "desktop /Expenses with the Add Expense dialog OPEN",\n    "desktop /Accounts DARK with the Add dialog OPEN",\n  ] as const;',
    'describe("F-275d — every axe leg scrolls first, the open-state quartet included", () => {\n  const spec = read("tests/e2e/a11y.spec.ts");\n  // Session-280 (R-77, F-280j): the open-state family gains its\n  // fourth surface — the filters expansion card leg rides the same\n  // helper-before-the-gate contract.\n  const OPEN_LEGS = [\n    "phone /Dashboard with the drawer OPEN",\n    "desktop /Expenses with the Add Expense dialog OPEN",\n    "desktop /Accounts DARK with the Add dialog OPEN",\n    "desktop /Expenses with the filters expansion card OPEN",\n  ] as const;',
    "the open-leg list gains the filters card",
    P275,
)

t = heal(
    t,
    '  it("the source-site census: 13 helper calls (10 standing + the open-state trio)", () => {\n    // The count-lockstep form: a future leg that adds or drops a call\n    // updates this pin in the same commit. The loops expand the 13 source\n    // sites into the 47 runtime legs (the section loops + the trio).',
    '  it("the source-site census: 14 helper calls (10 standing + the open-state quartet)", () => {\n    // The count-lockstep form: a future leg that adds or drops a call\n    // updates this pin in the same commit. The loops expand the 14 source\n    // sites into the runtime legs (the section loops + the quartet).',
    "the census count recalibrates to 14",
    P275,
)

t = heal(
    t,
    "    expect(calls).toBe(13);",
    "    expect(calls).toBe(14);",
    "the census pin moves to 14",
    P275,
)

with open(P275, "w", encoding="utf8") as f:
    f.write(t)

print("[cures-280] seven sites healed (4 predicates, the whole-tree net, the filters-card axe leg, the F-275d recalibration).")
