#!/usr/bin/env python3
"""Session-274 docs lockstep — the count ladder 1981→1990 / 125→126 /
badge 2142→2151, the §7.1 rows (arch pins 93→94 + parity-274), the PAD
v2.71.0 SR block, the trio advance (docs-counts + the parity-243
mirror), and the README status row to R-71 (written whole with the
SINGLE lead-in — the F-274d dedup cure rides here).

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


OLD_UNIT = "1981"
NEW_UNIT = "1990"
OLD_FILES = "125"
NEW_FILES = "126"
OLD_BADGE = "2142"
NEW_BADGE = "2151"

# ---- A. tests/docs-counts.test.ts — the constants, the arch row, the trio -

rw("tests/docs-counts.test.ts", [
    (
        "const UNIT_TOTAL = 1981;",
        "const UNIT_TOTAL = 1990;",
        "unit constant",
        1,
    ),
    (
        "const TEST_FILES = 125;",
        "const TEST_FILES = 126;",
        "files constant",
        1,
    ),
    (
        "| — architecture pins | 93 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, parity-264, parity-265, parity-266, parity-267, parity-268, parity-269, parity-270, parity-271, parity-272, parity-273, db-transient) |",
        "| — architecture pins | 94 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, parity-264, parity-265, parity-266, parity-267, parity-268, parity-269, parity-270, parity-271, parity-272, parity-273, parity-274, db-transient) |",
        "arch-pins pin row",
        1,
    ),
    (
        """    // Session-273 (R-70): parity-273 joins the family (92 → 93): the
    // file count takes the suite to 125 — 4 + 93 + 28 = 125.
""",
        """    // Session-273 (R-70): parity-273 joins the family (92 → 93): the
    // file count takes the suite to 125 — 4 + 93 + 28 = 125.
    // Session-274 (R-71): parity-274 joins the family (93 → 94): the
    // file count takes the suite to 126 — 4 + 94 + 28 = 126.
""",
        "arithmetic comment ladder",
        1,
    ),
    (
        """    // Session-273 (R-70): the TWENTY-FOURTH gate-enforced ride — the
    // v2.70.0 block lands together with the trio's advance to
    // v2.68.0/v2.69.0/v2.70.0 (the v2.67.0 pin ages out).
    expect(p).toMatch(/\\[SR\\] v2\\.70\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1981 unit \\(125 files, \\+9\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.69\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1972 unit \\(124 files, \\+23\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.68\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1949 unit \\(123 files, \\+17\\)/);
""",
        """    // Session-273 (R-70): the TWENTY-FOURTH gate-enforced ride — the
    // v2.70.0 block lands together with the trio's advance to
    // v2.68.0/v2.69.0/v2.70.0 (the v2.67.0 pin ages out).
    // Session-274 (R-71): the TWENTY-FIFTH gate-enforced ride — the
    // v2.71.0 block lands together with the trio's advance to
    // v2.69.0/v2.70.0/v2.71.0 (the v2.68.0 pin ages out).
    expect(p).toMatch(/\\[SR\\] v2\\.71\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1990 unit \\(126 files, \\+9\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.70\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1981 unit \\(125 files, \\+9\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.69\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1972 unit \\(124 files, \\+23\\)/);
""",
        "trio pins",
        1,
    ),
])

# ---- B. tests/parity-243.test.ts — the mirror ----------------------------

rw("tests/parity-243.test.ts", [
    (
        """    // twenty-third gate-enforced ride. Session-273 (R-70) advances
    // it with the v2.70.0 block: v2.68.0/v2.69.0/v2.70.0 (the
    // v2.67.0 pin ages out) — the F-247d same-commit
    // recalibration, the structural leg's twenty-fourth
    // gate-enforced ride.
""",
        """    // twenty-third gate-enforced ride. Session-273 (R-70) advances
    // it with the v2.70.0 block: v2.68.0/v2.69.0/v2.70.0 (the
    // v2.67.0 pin ages out) — the F-247d same-commit
    // recalibration, the structural leg's twenty-fourth
    // gate-enforced ride. Session-274 (R-71) advances it with the
    // v2.71.0 block: v2.69.0/v2.70.0/v2.71.0 (the v2.68.0 pin ages
    // out) — the F-247d same-commit recalibration, the structural
    // leg's twenty-fifth gate-enforced ride.
""",
        "mirror comment",
        1,
    ),
    (
        """    expect(guardIt).toContain("v2\\\\.68\\\\.0");
    expect(guardIt).toContain("v2\\\\.69\\\\.0");
    expect(guardIt).toContain("v2\\\\.70\\\\.0");
    expect(guardIt).not.toContain("v2\\\\.67\\\\.0");
    expect(guardIt).toContain("1981 unit \\\\(125 files");
""",
        """    expect(guardIt).toContain("v2\\\\.69\\\\.0");
    expect(guardIt).toContain("v2\\\\.70\\\\.0");
    expect(guardIt).toContain("v2\\\\.71\\\\.0");
    expect(guardIt).not.toContain("v2\\\\.68\\\\.0");
    expect(guardIt).toContain("1990 unit \\\\(126 files");
""",
        "mirror guard assertions",
        1,
    ),
])

# ---- C. the PAD — the v2.71.0 SR block + the live-tense counts ------------

SR_BLOCK = """- [SR] v2.71.0 (session 274, R-71 — the predicate-outlier,
  mechanism-truth, and phantom-pin round): the fresh-eyes audit
  (three Mode-C passes — the R-70 cure surfaces driven by the session
  (all six HOLDING at file:line: the parity-273 battery 9/9,
  parity-229 23/23, parity-243 14/14, docs-counts 18/18 re-run green
  — 64/64 across the four; the h-screen census over the whole tree
  clean; the docs count family aligned), the API/auth/security layer
  (the TWENTY-SEVENTH consecutive clean bill — all thirteen house
  contracts, 45 handlers / 29 route files read line-by-line, the
  file census corrected 30→29, every candidate dismissed into
  documented postures), and the UI/a11y/shell layer (all eight
  standing contracts verified holding live — the drawer, the theme,
  the v4 scanner, the a11y two-gate, the shell twins, the geometry
  pin, the date seams, the escape stacking; 148/148 across the ten
  re-run batteries)) — 0 Critical / 0 High / 0 Medium / 4 Low /
  8 Informational NEW after dedup, every material claim re-verified
  at file:line. THE SIGNUP ARM'S INSTANCEOF CONVERGENCE (F-274a,
  Low — the flagship: the P2002 catch carried the lone duck-typed
  predicate of the Prisma-code family while its own comment cited
  the settings route's pattern; the arm now rides the family form
  with the generated-client import, and the genus leg pins every
  P-coded literal comparison in src to the instanceof shape — the
  uploads family's fs-code checks exempt by construction). THE
  DOC-TRUTH TRIO (F-274b the drawer sign-out docblock's re-arm
  claim reworded to the remount truth — the navigate unmounts the
  component before the POST resolves, the honest re-arm is the fresh
  initial state a reopen remounts with, the sidebar twin the arm
  where an in-place re-arm actually runs; F-274c the skill doc's
  Validation row reworded from the phantom dompurify pin (retired at
  F-238e when the package left the tree) to the retirement truth;
  F-274d the README remediation row's lead-in deduplicated — the
  phrase rode twice since the R-69 lockstep, found by the driving
  session at re-verification). THE REGISTER RIDER (F-274e — the
  reserved softs' dark-flip asymmetry named in the F-224t register:
  only the danger soft flips in dark mode; a future dark consumer
  must flip its own token in the same commit). Registered:
  F-274f–F-274l the sibling skill doc's config table, the AGENTS
  count subset, the logout-429 cookie consideration, the
  per-navigation reads, the whole-store subscriptions, the toast
  double-cast, the analytics render clock. The verification: lint
  0/0 · tsc 0 · 1990 unit (126 files, +9) · build · smoke 15/15 ·
  161 e2e (zero new legs — the round changes an error-path
  predicate and comments; no swept surface moves, no pixel can
  shift) · census MATCH · the captures (the signup form face — the
  touched route's own face, the drawer at 390, the flagship
  dashboard).
"""

rw("Project_Architecture_Document.md", [
    (
        "- [SR] v2.70.0 (session 273, R-70 — the dynamic-viewport,",
        SR_BLOCK + "- [SR] v2.70.0 (session 273, R-70 — the dynamic-viewport,",
        "the v2.71.0 SR block",
        1,
    ),
    (
        "→ vitest (1981) → `next build` → the 15-assertion smoke ladder on the",
        "→ vitest (1990) → `next build` → the 15-assertion smoke ladder on the",
        "ADR-006 gate chain",
        1,
    ),
    (
        "├── tests/                       # 125 unit suites (incl. architecture pins) + e2e/ 7 specs",
        "├── tests/                       # 126 unit suites (incl. architecture pins) + e2e/ 7 specs",
        "the file-tree row",
        1,
    ),
    (
        "| Unit | 125 | 1981 | `tests/*.test.ts` | Vitest 5 + fast-check |",
        "| Unit | 126 | 1990 | `tests/*.test.ts` | Vitest 5 + fast-check |",
        "the §7.1 Unit row",
        1,
    ),
    (
        "| — architecture pins | 93 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, parity-264, parity-265, parity-266, parity-267, parity-268, parity-269, parity-270, parity-271, parity-272, parity-273, db-transient) | `tests/` | source-scanning contracts |",
        "| — architecture pins | 94 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, parity-264, parity-265, parity-266, parity-267, parity-268, parity-269, parity-270, parity-271, parity-272, parity-273, parity-274, db-transient) | `tests/` | source-scanning contracts |",
        "the §7.1 arch row",
        1,
    ),
    (
        "- [ ] `bun run test` → 1981/1981 (counts re-pinned if tests added/removed)",
        "- [ ] `bun run test` → 1990/1990 (counts re-pinned if tests added/removed)",
        "the §7.4 checklist",
        1,
    ),
    (
        "| `bun run test` / `CI=1 bun run test:e2e` | root | 1981 unit / 161 e2e |",
        "| `bun run test` / `CI=1 bun run test:e2e` | root | 1990 unit / 161 e2e |",
        "the §9 command row",
        1,
    ),
    (
        "time of writing (lint 0/0 · tsc 0 · 1981 unit · build · smoke 15/15 ·",
        "time of writing (lint 0/0 · tsc 0 · 1990 unit · build · smoke 15/15 ·",
        "the §10 gate line",
        1,
    ),
])

# ---- D. README.md — the badge, the counts, the status row to R-71 ---------
# The status row is written WHOLE with the SINGLE lead-in — the F-274d
# dedup cure rides this replacement (the duplicated phrase rode since
# the R-69 lockstep's range started after the first copy).

STATUS_R71 = (
    "`docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program "
    "(session 274: **R-71 shipped — the predicate-outlier, mechanism-truth, and "
    "phantom-pin round**: the fresh-eyes audit (three Mode-C passes — the R-70 cure "
    "surfaces (all six HOLDING, 64/64 across the four re-run batteries) · the "
    "API/auth/security layer's twenty-seventh consecutive clean bill (all thirteen "
    "house contracts, 45 handlers / 29 route files) · the UI/a11y/shell layer — all "
    "eight standing contracts verified holding live, 148/148 across the ten re-run "
    "batteries): 0 Critical / 0 High / 0 Medium / 4 Low / 8 Informational NEW after "
    "dedup, every material claim re-verified at file:line. THE ROUND'S FLAGSHIP: "
    "**F-274a the signup P2002 arm's instanceof convergence** — the lone duck-typed "
    "predicate of the Prisma-code family retired (its own comment cited the settings "
    "route's pattern; the genus leg now pins every P-coded literal comparison in src "
    "to the family form). Plus the doc-truth trio (F-274b the drawer sign-out "
    "docblock reworded to the remount truth · F-274c the skill doc's phantom "
    "dompurify pin reworded to the retirement truth · F-274d the README row's "
    "duplicated lead-in deduplicated) and F-274e the reserved softs' dark-flip "
    "asymmetry named in the F-224t register: **1990 unit (+9) · 161 e2e (zero new "
    "legs — no swept surface moves) · smoke 15/15 · census MATCH**; the mobile-nav "
    "comparison verified on BOTH sides at TRUE 390×844; probe:ref STABLE on every "
    "layer)"
)

with open("README.md", encoding="utf-8") as f:
    readme = f.read()

DUP_LEADIN = (
    "`docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program "
    "`docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program "
    "(session 273:"
)
if readme.count(DUP_LEADIN) != 1:
    sys.exit(f"[status-row] the duplicated lead-in not found in the expected form "
             f"(count={readme.count(DUP_LEADIN)})")
start = readme.index(DUP_LEADIN)
TAIL = "probe:ref STABLE on every layer)"
end = readme.index(TAIL, start) + len(TAIL)
readme = readme[:start] + STATUS_R71 + readme[end:]

readme = sub1(readme, "tests-2142%20checks", "tests-2151%20checks", "badge")
readme = sub1(readme, "| 1981 checks incl. property tests |", "| 1990 checks incl. property tests |", "arch table unit row")
readme = sub1(readme, "# 125 unit suites + 📂 e2e/ 7 specs", "# 126 unit suites + 📂 e2e/ 7 specs", "file tree")
readme = sub1(readme, "| 1981 checks / 125 files |", "| 1990 checks / 126 files |", "testing table")
readme = sub1(readme, "| 1981 unit · 161 e2e · 15 smoke · full gate green |", "| 1990 unit · 161 e2e · 15 smoke · full gate green |", "status row counts")

with open("README.md", "w", encoding="utf-8") as f:
    f.write(readme)
print("lockstepped README.md")

# ---- E/F/G. AGENTS / CLAUDE / SKILL — the live-tense count sites ----------

rw("AGENTS.md", [
    (
        "| Unit tests (1981) | `bun run test` |",
        "| Unit tests (1990) | `bun run test` |",
        "commands table",
        1,
    ),
])

rw("CLAUDE.md", [
    (
        "- **The gate is the contract**: lint 0/0 · tsc 0 · 1981 unit · build ·",
        "- **The gate is the contract**: lint 0/0 · tsc 0 · 1990 unit · build ·",
        "gate contract line",
        1,
    ),
    (
        "| `bun run test` | Unit suite (Vitest, 1981 checks) |",
        "| `bun run test` | Unit suite (Vitest, 1990 checks) |",
        "commands table",
        1,
    ),
    (
        "tests via fast-check. 1981 checks / 125 files.",
        "tests via fast-check. 1990 checks / 126 files.",
        "test pyramid",
        1,
    ),
])

rw("wealth-os_SKILL.md", [
    (
        "layer (Vitest 1981 / Playwright 161 / smoke 15).",
        "layer (Vitest 1990 / Playwright 161 / smoke 15).",
        "frontmatter",
        1,
    ),
    (
        "| 5.1.0 / 4.10.2 | Node env, jsdom-free; 1981 checks / 125 files |",
        "| 5.1.0 / 4.10.2 | Node env, jsdom-free; 1990 checks / 126 files |",
        "stack table",
        1,
    ),
    (
        "| Unit tests | `bun run test` (1981 checks) |",
        "| Unit tests | `bun run test` (1990 checks) |",
        "commands table",
        1,
    ),
    (
        "- [ ] `bun run test` — 1981 passed / 125 files",
        "- [ ] `bun run test` — 1990 passed / 126 files",
        "pre-ship checklist",
        1,
    ),
])

print("docs-274-lockstep complete: ladder 1981→1990 / 125→126 / badge 2142→2151 · §7.1 rows · v2.71.0 SR block · trio advance · README status row to R-71 (the single lead-in)")
