#!/usr/bin/env python3
"""Session-275 docs lockstep — the count ladder 1990→1997 / 126→127 /
badge 2151→2158, the §7.1 rows (arch pins 94→95 + parity-275), the PAD
v2.72.0 SR block, the trio advance (docs-counts + the parity-243
mirror), and the README status row to R-72.

The count-lockstep doctrine (F-242j/F-243b): every replacement is
scoped to LIVE-TENSE sites — historical revision blocks, worklog
entries, and session records keep the counts that were true at their
time. Each replacement asserts its old form occurs exactly-once (or
the stated count) before writing; the script exits before any write
on failure."""

import sys


def sub1(text: str, old: str, new: str, label: str, count: int = 1) -> str:
    n = text.count(old)
    if n != count:
        sys.exit(f"[{label}] expected {count} occurrence(s), found {n}: {old[:70]!r}")
    return text.replace(old, new)


def rw(path: str, pairs: list[tuple[str, str, str, int]]) -> None:
    with open(path, encoding="utf-8") as f:
        s = f.read()
    for old, new, label, count in pairs:
        s = sub1(s, old, new, label, count)
    with open(path, "w", encoding="utf-8") as f:
        f.write(s)
    print(f"lockstepped {path}")


OLD_UNIT = "1990"
NEW_UNIT = "1997"
OLD_FILES = "126"
NEW_FILES = "127"
OLD_BADGE = "2151"
NEW_BADGE = "2158"

ARCH_ROW_OLD_COUNT = "94"
ARCH_ROW_NEW_COUNT = "95"

# ---- A. tests/docs-counts.test.ts — the constants, the arch row, the trio -

rw("tests/docs-counts.test.ts", [
    (
        "const UNIT_TOTAL = 1990;",
        "const UNIT_TOTAL = 1997;",
        "unit constant",
        1,
    ),
    (
        "const TEST_FILES = 126;",
        "const TEST_FILES = 127;",
        "files constant",
        1,
    ),
    (
        f"| — architecture pins | {ARCH_ROW_OLD_COUNT} | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, parity-264, parity-265, parity-266, parity-267, parity-268, parity-269, parity-270, parity-271, parity-272, parity-273, parity-274, db-transient) |",
        f"| — architecture pins | {ARCH_ROW_NEW_COUNT} | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, parity-264, parity-265, parity-266, parity-267, parity-268, parity-269, parity-270, parity-271, parity-272, parity-273, parity-274, parity-275, db-transient) |",
        "arch-pins pin row",
        1,
    ),
    (
        """    // Session-274 (R-71): parity-274 joins the family (93 → 94): the
    // file count takes the suite to 126 — 4 + 94 + 28 = 126.
""",
        """    // Session-274 (R-71): parity-274 joins the family (93 → 94): the
    // file count takes the suite to 126 — 4 + 94 + 28 = 126.
    // Session-275 (R-72): parity-275 joins the family (94 → 95): the
    // file count takes the suite to 127 — 4 + 95 + 28 = 127.
""",
        "arithmetic comment ladder",
        1,
    ),
    (
        """    // Session-274 (R-71): the TWENTY-FIFTH gate-enforced ride — the
    // v2.71.0 block lands together with the trio's advance to
    // v2.69.0/v2.70.0/v2.71.0 (the v2.68.0 pin ages out).
    expect(p).toMatch(/\\[SR\\] v2\\.71\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1990 unit \\(126 files, \\+9\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.70\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1981 unit \\(125 files, \\+9\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.69\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1972 unit \\(124 files, \\+23\\)/);
""",
        """    // Session-274 (R-71): the TWENTY-FIFTH gate-enforced ride — the
    // v2.71.0 block lands together with the trio's advance to
    // v2.69.0/v2.70.0/v2.71.0 (the v2.68.0 pin ages out).
    // Session-275 (R-72): the TWENTY-SIXTH gate-enforced ride — the
    // v2.72.0 block lands together with the trio's advance to
    // v2.70.0/v2.71.0/v2.72.0 (the v2.69.0 pin ages out).
    expect(p).toMatch(/\\[SR\\] v2\\.72\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1997 unit \\(127 files, \\+7\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.71\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1990 unit \\(126 files, \\+9\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.70\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1981 unit \\(125 files, \\+9\\)/);
""",
        "trio pins",
        1,
    ),
])

# ---- B. tests/parity-243.test.ts — the mirror ----------------------------

rw("tests/parity-243.test.ts", [
    (
        """    // gate-enforced ride. Session-274 (R-71) advances it with the
    // v2.71.0 block: v2.69.0/v2.70.0/v2.71.0 (the v2.68.0 pin ages
    // out) — the F-247d same-commit recalibration, the structural
    // leg's twenty-fifth gate-enforced ride.
""",
        """    // gate-enforced ride. Session-274 (R-71) advances it with the
    // v2.71.0 block: v2.69.0/v2.70.0/v2.71.0 (the v2.68.0 pin ages
    // out) — the F-247d same-commit recalibration, the structural
    // leg's twenty-fifth gate-enforced ride. Session-275 (R-72)
    // advances it with the v2.72.0 block: v2.70.0/v2.71.0/v2.72.0
    // (the v2.69.0 pin ages out) — the F-247d same-commit
    // recalibration, the structural leg's twenty-sixth gate-enforced
    // ride.
""",
        "mirror comment",
        1,
    ),
    (
        """    expect(guardIt).toContain("v2\\\\.69\\\\.0");
    expect(guardIt).toContain("v2\\\\.70\\\\.0");
    expect(guardIt).toContain("v2\\\\.71\\\\.0");
    expect(guardIt).not.toContain("v2\\\\.68\\\\.0");
    expect(guardIt).toContain("1990 unit \\\\(126 files");
""",
        """    expect(guardIt).toContain("v2\\\\.70\\\\.0");
    expect(guardIt).toContain("v2\\\\.71\\\\.0");
    expect(guardIt).toContain("v2\\\\.72\\\\.0");
    expect(guardIt).not.toContain("v2\\\\.69\\\\.0");
    expect(guardIt).toContain("1997 unit \\\\(127 files");
""",
        "mirror guard assertions",
        1,
    ),
])

# ---- C. the PAD — the v2.72.0 SR block + the live-tense counts ------------

SR_BLOCK = """- [SR] v2.72.0 (session 275, R-72 — the docblock-tail, pipe-truth,
  and gate-coverage round): the fresh-eyes audit (three Mode-C
  passes — the R-71 cure surfaces driven by the session (all five
  HOLDING at file:line: the parity-274 battery 9/9, parity-273 9/9,
  parity-229 23/23, parity-243 14/14, docs-counts 18/18 re-run
  green — 73/73 across the five; the P-code instanceof census over
  the whole tree clean; the docs count family aligned), the
  API/auth/security layer (the TWENTY-EIGHTH consecutive clean bill
  — all thirteen house contracts, 45 handlers / 30 route files read
  line-by-line, the route census re-verified at exactly 30; every
  candidate dismissed into documented postures), and the
  UI/a11y/shell layer (all eight standing contracts verified holding
  live — the drawer, the theme, the v4 scanner, the a11y two-gate,
  the shell twins, the geometry pin, the date seams, the escape
  stacking)) — 0 Critical / 0 High / 0 Medium / 4 Low /
  11 Informational NEW after dedup, every material claim re-verified
  at file:line. THE DIALOGHEADER DOCBLOCK'S OPACITY TAIL (F-275a,
  Low — the flagship: the F-274b genus one file over; the session-15
  parenthetical claimed the close X rides the opacity pattern while
  F-221l retired the dimming 53 sessions ago; the parenthetical now
  carries the mechanism truth with the F-221l citation and the
  measured-ratio pointer). THE PIPE TRUTH (F-275b — the §7.1
  domain-seams row's three unescaped pipes escaped inside the code
  span: the five-column row renders five columns, the F-247i form).
  THE GATE-COVERAGE TRUTH (F-275c — the a11y spec header names what
  the blanket run evaluates: the default-enabled 2.0/2.1 set, the
  2.2-only target-size rule's disabled-by-default registration, the
  bespoke hit-area pins that carry 2.5.8 — the design target vs the
  executable floor). THE HELPER LETTER (F-275d — the three
  open-state a11y legs gain the scroll helper call: no-op today
  behind the modal scroller locks, uniformity by construction
  tomorrow). THE CROSS-REF RIDER (F-275e — the AGENTS F-217a entry
  names the genus retirement: the Expenses popover genus retired at
  F-265b; the lesson binds portaled surfaces generally). Registered:
  F-275f–F-275k the parity-229 splitter blind spot, the login-acct
  availability trade, the reset literal check, the bucket-census
  wording, the seed-script exception and the structural casts, the
  unlogged-surface register. The verification: lint 0/0 · tsc 0 ·
  1997 unit (127 files, +7) · build · smoke 15/15 · 161 e2e (zero
  new legs — the round changes comments, one doc table row, and
  no-op test calls; no swept surface moves, no pixel can shift) ·
  census MATCH · the captures (the dialog family's own face, the
  drawer at 390, the flagship dashboard).
"""

rw("Project_Architecture_Document.md", [
    (
        "- [SR] v2.71.0 (session 274, R-71 — the predicate-outlier,",
        SR_BLOCK + "- [SR] v2.71.0 (session 274, R-71 — the predicate-outlier,",
        "the v2.72.0 SR block",
        1,
    ),
    (
        "→ vitest (1990) → `next build` → the 15-assertion smoke ladder on the",
        "→ vitest (1997) → `next build` → the 15-assertion smoke ladder on the",
        "ADR-006 gate chain",
        1,
    ),
    (
        "├── tests/                       # 126 unit suites (incl. architecture pins) + e2e/ 7 specs",
        "├── tests/                       # 127 unit suites (incl. architecture pins) + e2e/ 7 specs",
        "the file-tree row",
        1,
    ),
    (
        "| Unit | 126 | 1990 | `tests/*.test.ts` | Vitest 5 + fast-check |",
        "| Unit | 127 | 1997 | `tests/*.test.ts` | Vitest 5 + fast-check |",
        "the §7.1 Unit row",
        1,
    ),
    (
        f"| — architecture pins | {ARCH_ROW_OLD_COUNT} | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, parity-264, parity-265, parity-266, parity-267, parity-268, parity-269, parity-270, parity-271, parity-272, parity-273, parity-274, db-transient) | `tests/` | source-scanning contracts |",
        f"| — architecture pins | {ARCH_ROW_NEW_COUNT} | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, parity-264, parity-265, parity-266, parity-267, parity-268, parity-269, parity-270, parity-271, parity-272, parity-273, parity-274, parity-275, db-transient) | `tests/` | source-scanning contracts |",
        "the §7.1 arch row",
        1,
    ),
    (
        "- [ ] `bun run test` → 1990/1990 (counts re-pinned if tests added/removed)",
        "- [ ] `bun run test` → 1997/1997 (counts re-pinned if tests added/removed)",
        "the §7.4 checklist",
        1,
    ),
    (
        "| `bun run test` / `CI=1 bun run test:e2e` | root | 1990 unit / 161 e2e |",
        "| `bun run test` / `CI=1 bun run test:e2e` | root | 1997 unit / 161 e2e |",
        "the §9 command row",
        1,
    ),
    (
        "time of writing (lint 0/0 · tsc 0 · 1990 unit · build · smoke 15/15 ·",
        "time of writing (lint 0/0 · tsc 0 · 1997 unit · build · smoke 15/15 ·",
        "the §10 gate line",
        1,
    ),
])

# ---- D. README.md — the badge, the counts, the status row to R-72 ---------

STATUS_R72 = (
    "`docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program "
    "(session 275: **R-72 shipped — the docblock-tail, pipe-truth, and gate-coverage "
    "round**: the fresh-eyes audit (three Mode-C passes — the R-71 cure surfaces (all "
    "five HOLDING, 73/73 across the five re-run batteries) · the API/auth/security "
    "layer's twenty-eighth consecutive clean bill (all thirteen house contracts, 45 "
    "handlers / 30 route files) · the UI/a11y/shell layer — all eight standing "
    "contracts verified holding live): 0 Critical / 0 High / 0 Medium / 4 Low / "
    "11 Informational NEW after dedup, every material claim re-verified at "
    "file:line. THE ROUND'S FLAGSHIP: **F-275a the DialogHeader docblock's opacity "
    "tail** — the F-274b genus one file over (the session-15 parenthetical claimed "
    "the close X rides the opacity pattern while F-221l retired the dimming 53 "
    "sessions ago; the parenthetical now carries the mechanism truth with the "
    "F-221l citation). Plus the riders (F-275b the PAD §7.1 row's unescaped pipes "
    "escaped · F-275c the a11y spec header's coverage-truth note (the "
    "default-enabled set vs the 2.2-only bespoke pins) · F-275d the three "
    "open-state a11y legs' scroll helper · F-275e the AGENTS F-217a entry's "
    "genus-retirement cross-ref): **1997 unit (+7) · 161 e2e (zero new legs — no "
    "swept surface moves) · smoke 15/15 · census MATCH**; the mobile-nav comparison "
    "verified on BOTH sides at TRUE 390×844; probe:ref STABLE on every layer)"
)

with open("README.md", encoding="utf-8") as f:
    readme = f.read()

LEADIN = (
    "`docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program "
    "(session 274:"
)
if readme.count(LEADIN) != 1:
    sys.exit(f"[status-row] the R-71 status row's lead-in not found in the expected "
             f"form (count={readme.count(LEADIN)})")
start = readme.index(LEADIN)
TAIL = "probe:ref STABLE on every layer)"
end = readme.index(TAIL, start) + len(TAIL)
readme = readme[:start] + STATUS_R72 + readme[end:]

readme = sub1(readme, "tests-2151%20checks", "tests-2158%20checks", "badge")
readme = sub1(readme, "| 1990 checks incl. property tests |", "| 1997 checks incl. property tests |", "arch table unit row")
readme = sub1(readme, "# 126 unit suites + 📂 e2e/ 7 specs", "# 127 unit suites + 📂 e2e/ 7 specs", "file tree")
readme = sub1(readme, "| 1990 checks / 126 files |", "| 1997 checks / 127 files |", "testing table")
readme = sub1(readme, "| 1990 unit · 161 e2e · 15 smoke · full gate green |", "| 1997 unit · 161 e2e · 15 smoke · full gate green |", "status row counts")

with open("README.md", "w", encoding="utf-8") as f:
    f.write(readme)
print("lockstepped README.md")

# ---- E/F/G. AGENTS / CLAUDE / SKILL — the live-tense count sites ----------

rw("AGENTS.md", [
    (
        "| Unit tests (1990) | `bun run test` |",
        "| Unit tests (1997) | `bun run test` |",
        "commands table",
        1,
    ),
])

rw("CLAUDE.md", [
    (
        "- **The gate is the contract**: lint 0/0 · tsc 0 · 1990 unit · build ·",
        "- **The gate is the contract**: lint 0/0 · tsc 0 · 1997 unit · build ·",
        "gate contract line",
        1,
    ),
    (
        "| `bun run test` | Unit suite (Vitest, 1990 checks) |",
        "| `bun run test` | Unit suite (Vitest, 1997 checks) |",
        "commands table",
        1,
    ),
    (
        "tests via fast-check. 1990 checks / 126 files.",
        "tests via fast-check. 1997 checks / 127 files.",
        "test pyramid",
        1,
    ),
])

rw("wealth-os_SKILL.md", [
    (
        "layer (Vitest 1990 / Playwright 161 / smoke 15).",
        "layer (Vitest 1997 / Playwright 161 / smoke 15).",
        "frontmatter",
        1,
    ),
    (
        "| 5.1.0 / 4.10.2 | Node env, jsdom-free; 1990 checks / 126 files |",
        "| 5.1.0 / 4.10.2 | Node env, jsdom-free; 1997 checks / 127 files |",
        "stack table",
        1,
    ),
    (
        "| Unit tests | `bun run test` (1990 checks) |",
        "| Unit tests | `bun run test` (1997 checks) |",
        "commands table",
        1,
    ),
    (
        "- [ ] `bun run test` — 1990 passed / 126 files",
        "- [ ] `bun run test` — 1997 passed / 127 files",
        "pre-ship checklist",
        1,
    ),
])

print("docs-275-lockstep complete: ladder 1990→1997 / 126→127 / badge 2151→2158 · §7.1 rows · v2.72.0 SR block · trio advance · README status row to R-72")
