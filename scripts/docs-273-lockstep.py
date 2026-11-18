#!/usr/bin/env python3
"""Session-273 docs lockstep — the count ladder 1972→1981 / 124→125 /
badge 2133→2142, the §7.1 rows (arch pins 92→93 + parity-273), the PAD
v2.70.0 SR block, the trio advance (docs-counts + the parity-243
mirror), and the README status row to R-70.

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


OLD_UNIT = "1972"
NEW_UNIT = "1981"
OLD_FILES = "124"
NEW_FILES = "125"
OLD_BADGE = "2133"
NEW_BADGE = "2142"

# ---- A. tests/docs-counts.test.ts — the constants, the arch row, the trio -

rw("tests/docs-counts.test.ts", [
    (
        "const UNIT_TOTAL = 1972;",
        "const UNIT_TOTAL = 1981;",
        "unit constant",
        1,
    ),
    (
        "const TEST_FILES = 124;",
        "const TEST_FILES = 125;",
        "files constant",
        1,
    ),
    (
        "| — architecture pins | 92 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, parity-264, parity-265, parity-266, parity-267, parity-268, parity-269, parity-270, parity-271, parity-272, db-transient) |",
        "| — architecture pins | 93 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, parity-264, parity-265, parity-266, parity-267, parity-268, parity-269, parity-270, parity-271, parity-272, parity-273, db-transient) |",
        "arch-pins pin row",
        1,
    ),
    (
        """    // Session-272 (R-69): parity-272 joins the family and the file
    // count takes the suite to 124 — 4 + 92 + 28 = 124.
""",
        """    // Session-272 (R-69): parity-272 joins the family and the file
    // count takes the suite to 124 — 4 + 92 + 28 = 124.
    // Session-273 (R-70): parity-273 joins the family (92 → 93): the
    // file count takes the suite to 125 — 4 + 93 + 28 = 125.
""",
        "arithmetic comment ladder",
        1,
    ),
    (
        """    // Session-272 (R-69): the TWENTY-THIRD gate-enforced ride — the
    // v2.69.0 block lands together with the trio's advance to
    // v2.67.0/v2.68.0/v2.69.0 (the v2.66.0 pin ages out).
    expect(p).toMatch(/\\[SR\\] v2\\.69\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1972 unit \\(124 files, \\+23\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.68\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1949 unit \\(123 files, \\+17\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.67\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1932 unit \\(122 files, \\+8\\)/);
""",
        """    // Session-272 (R-69): the TWENTY-THIRD gate-enforced ride — the
    // v2.69.0 block lands together with the trio's advance to
    // v2.67.0/v2.68.0/v2.69.0 (the v2.66.0 pin ages out).
    // Session-273 (R-70): the TWENTY-FOURTH gate-enforced ride — the
    // v2.70.0 block lands together with the trio's advance to
    // v2.68.0/v2.69.0/v2.70.0 (the v2.67.0 pin ages out).
    expect(p).toMatch(/\\[SR\\] v2\\.70\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1981 unit \\(125 files, \\+9\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.69\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1972 unit \\(124 files, \\+23\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.68\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1949 unit \\(123 files, \\+17\\)/);
""",
        "trio pins",
        1,
    ),
])

# ---- B. tests/parity-243.test.ts — the mirror ----------------------------

rw("tests/parity-243.test.ts", [
    (
        """    // Session-272 (R-69) advances it with the v2.69.0 block:
    // v2.67.0/v2.68.0/v2.69.0 (the v2.66.0 pin ages out) — the
    // F-247d same-commit recalibration, the structural leg's
    // twenty-third gate-enforced ride.
""",
        """    // Session-272 (R-69) advances it with the v2.69.0 block:
    // v2.67.0/v2.68.0/v2.69.0 (the v2.66.0 pin ages out) — the
    // F-247d same-commit recalibration, the structural leg's
    // twenty-third gate-enforced ride. Session-273 (R-70) advances
    // it with the v2.70.0 block: v2.68.0/v2.69.0/v2.70.0 (the
    // v2.67.0 pin ages out) — the F-247d same-commit
    // recalibration, the structural leg's twenty-fourth
    // gate-enforced ride.
""",
        "mirror comment",
        1,
    ),
    (
        """    expect(guardIt).toContain("v2\\\\.67\\\\.0");
    expect(guardIt).toContain("v2\\\\.68\\\\.0");
    expect(guardIt).toContain("v2\\\\.69\\\\.0");
    expect(guardIt).not.toContain("v2\\\\.66\\\\.0");
    expect(guardIt).toContain("1972 unit \\\\(124 files");
""",
        """    expect(guardIt).toContain("v2\\\\.68\\\\.0");
    expect(guardIt).toContain("v2\\\\.69\\\\.0");
    expect(guardIt).toContain("v2\\\\.70\\\\.0");
    expect(guardIt).not.toContain("v2\\\\.67\\\\.0");
    expect(guardIt).toContain("1981 unit \\\\(125 files");
""",
        "mirror guard assertions",
        1,
    ),
])

# ---- C. the PAD — the v2.70.0 SR block + the live-tense counts ------------

SR_BLOCK = """- [SR] v2.70.0 (session 273, R-70 — the dynamic-viewport,
  config-loader, and register-promotion round): the fresh-eyes audit
  (three Mode-C passes — the R-69 cure surfaces driven by the session
  (all seventeen HOLDING at file:line: the advisory census
  live-accurate against a fresh bun audit, the phantom-primitive
  family, the §18 layer map, the §4/§19 token mirror, the count
  family, the box-text wiring, the parity-272 battery 23/23 +
  parity-271 17/17 + docs-counts 18/18 re-run green), the
  API/auth/security layer (the TWENTY-SIXTH consecutive clean bill —
  all thirteen house contracts, 45 handlers / 30 route files read
  line-by-line, every candidate dismissed into documented postures),
  and the UI/a11y/shell layer (all eight standing contracts verified
  holding live — the drawer, the theme, the v4 scanner, the a11y
  two-gate 47/47, the shell twins, the geometry pin, the date seams,
  the escape stacking)) — 0 Critical / 0 High / 0 Medium / 2 Low /
  3 Informational NEW after dedup, every material claim re-verified
  at file:line (the h-screen carrier census over the whole tree; the
  vitest warning reproduced and its cure path empirically validated
  by a scratch rename BEFORE the plan; the toast max-height genus;
  the ledger anchor arithmetic). THE SHELL ROOT'S DYNAMIC-VIEWPORT
  SWAP (F-273a, Low — the flagship: the F-220p register entry
  promoted with the reference construction DECODED — the reference
  has NO fixed-height shell (the F-207e document-scrolled original;
  the F-210a absorbed superset), so the h-screen → h-dvh swap is
  parity-neutral by construction and byte-identical in headless
  Chromium where 100dvh equals 100vh; on iOS Safari the static 100vh
  root plus overflow-hidden left the bottom of main's scroll region
  unreachable behind the expanded browser chrome — the F-219h genus
  at the shell; two comment carriers reworded; the toast column's
  max-height rides the same cure). THE VITEST CONFIG-LOADER CURE
  (F-273b, Low — the rider: the deprecated-path warning fired on
  every unit run; vitest.config.ts renames to .mts with the tsconfig
  *.mts include (the renamed file cannot escape the type gate) and
  the six reference sites trued same-commit per the contract-change
  rule). Registered: F-273c the ledger anchor drift (the prepend
  convention), F-273d the axe substring matching, F-273e the iOS
  background-attachment degradation. The verification: lint 0/0 ·
  tsc 0 · 1981 unit (125 files, +9) · build ·
  smoke 15/15 · 161 e2e (zero new legs — the swap is a class-token
  change over an identical computed height in the e2e environment;
  the standing battery the proof) · THE SIX PARITY DRIFT GATES
  RE-RUN CLEAN (the round changed a swept surface — the shell root
  class — and the drift chain itself proved zero pixel movement:
  the four sweep classes, the fullpage axis, the interior census at
  0-event margin) · census MATCH · the captures (the shell's desktop
  face with the computed-height dvh proof, the main scroller's
  reachability face with the footer visible, the mobile drawer at
  390).
"""

rw("Project_Architecture_Document.md", [
    (
        "- [SR] v2.69.0 (session 272, R-69 — the census-reanchor,",
        SR_BLOCK + "- [SR] v2.69.0 (session 272, R-69 — the census-reanchor,",
        "the v2.70.0 SR block",
        1,
    ),
    (
        "→ vitest (1972) → `next build` → the 15-assertion smoke ladder on the",
        "→ vitest (1981) → `next build` → the 15-assertion smoke ladder on the",
        "ADR-006 gate chain",
        1,
    ),
    (
        "├── tests/                       # 124 unit suites (incl. architecture pins) + e2e/ 7 specs",
        "├── tests/                       # 125 unit suites (incl. architecture pins) + e2e/ 7 specs",
        "the file-tree row",
        1,
    ),
    (
        "| Unit | 124 | 1972 | `tests/*.test.ts` | Vitest 5 + fast-check |",
        "| Unit | 125 | 1981 | `tests/*.test.ts` | Vitest 5 + fast-check |",
        "the §7.1 Unit row",
        1,
    ),
    (
        "| — architecture pins | 92 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, parity-264, parity-265, parity-266, parity-267, parity-268, parity-269, parity-270, parity-271, parity-272, db-transient) | `tests/` | source-scanning contracts |",
        "| — architecture pins | 93 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, parity-264, parity-265, parity-266, parity-267, parity-268, parity-269, parity-270, parity-271, parity-272, parity-273, db-transient) | `tests/` | source-scanning contracts |",
        "the §7.1 arch row",
        1,
    ),
    (
        "- [ ] `bun run test` → 1972/1972 (counts re-pinned if tests added/removed)",
        "- [ ] `bun run test` → 1981/1981 (counts re-pinned if tests added/removed)",
        "the §7.4 checklist",
        1,
    ),
    (
        "| `bun run test` / `CI=1 bun run test:e2e` | root | 1972 unit / 161 e2e |",
        "| `bun run test` / `CI=1 bun run test:e2e` | root | 1981 unit / 161 e2e |",
        "the §9 command row",
        1,
    ),
    (
        "time of writing (lint 0/0 · tsc 0 · 1972 unit · build · smoke 15/15 ·",
        "time of writing (lint 0/0 · tsc 0 · 1981 unit · build · smoke 15/15 ·",
        "the §10 gate line",
        1,
    ),
])

# ---- D. README.md — the badge, the counts, the status row to R-70 ---------

STATUS_R70 = (
    "`docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program "
    "(session 273: **R-70 shipped — the dynamic-viewport, config-loader, and "
    "register-promotion round**: the fresh-eyes audit (three Mode-C passes — the "
    "R-69 cure surfaces (all seventeen HOLDING, the parity-272 battery 23/23 "
    "re-run green) · the API/auth/security layer's twenty-sixth consecutive clean "
    "bill (all thirteen house contracts, 45 handlers / 30 route files) · the "
    "UI/a11y/shell layer — all eight standing contracts verified holding live): "
    "0 Critical / 0 High / 0 Medium / 2 Low / 3 Informational NEW after dedup, "
    "every material claim re-verified at file:line. THE ROUND'S FLAGSHIP: "
    "**F-273a the shell root's h-screen → h-dvh swap** — the F-220p register "
    "entry promoted with the reference construction decoded (the reference has "
    "no fixed-height shell — the F-210a absorbed superset — so the swap is "
    "parity-neutral by construction; in headless Chromium 100dvh equals 100vh, "
    "and the six parity drift gates re-ran CLEAN to prove it; on iOS Safari the "
    "static root left the scroller's bottom unreachable behind the expanded "
    "chrome — the F-219h genus cured at the shell, with the toast column's "
    "max-height riding the same cure). Plus F-273b the vitest config-loader "
    "deprecation cured (vitest.config.mts + the tsconfig *.mts include + the six "
    "reference sites, the parity-229 walk pins updated same-commit): **1981 unit "
    "(+9) · 161 e2e (zero new legs) · smoke 15/15 · census MATCH · the six drift "
    "gates CLEAN**; the mobile-nav comparison verified on BOTH sides at TRUE "
    "390×844; probe:ref STABLE on every layer)"
)

with open("README.md", encoding="utf-8") as f:
    readme = f.read()

# The status row: replace the R-69 cell (from "(session 272:" to the row end).
start = readme.index("(session 272: **R-69 shipped")
end = readme.index("probe:ref STABLE on every layer) |", start) + len("probe:ref STABLE on every layer)")
old_cell = readme[start:end]
new_cell = STATUS_R70
readme = readme[:start] + new_cell + readme[end:]

readme = sub1(readme, "tests-2133%20checks", "tests-2142%20checks", "badge")
readme = sub1(readme, "| 1972 checks incl. property tests |", "| 1981 checks incl. property tests |", "arch table unit row")
readme = sub1(readme, "# 124 unit suites + 📂 e2e/ 7 specs", "# 125 unit suites + 📂 e2e/ 7 specs", "file tree")
readme = sub1(readme, "| 1972 checks / 124 files |", "| 1981 checks / 125 files |", "testing table")
readme = sub1(readme, "| 1972 unit · 161 e2e · 15 smoke · full gate green |", "| 1981 unit · 161 e2e · 15 smoke · full gate green |", "status row counts")

with open("README.md", "w", encoding="utf-8") as f:
    f.write(readme)
print("lockstepped README.md")

# ---- E/F/G. AGENTS / CLAUDE / SKILL — the live-tense count sites ----------

rw("AGENTS.md", [
    (
        "| Unit tests (1972) | `bun run test` |",
        "| Unit tests (1981) | `bun run test` |",
        "commands table",
        1,
    ),
])

rw("CLAUDE.md", [
    (
        "- **The gate is the contract**: lint 0/0 · tsc 0 · 1972 unit · build ·",
        "- **The gate is the contract**: lint 0/0 · tsc 0 · 1981 unit · build ·",
        "gate contract line",
        1,
    ),
    (
        "| `bun run test` | Unit suite (Vitest, 1972 checks) |",
        "| `bun run test` | Unit suite (Vitest, 1981 checks) |",
        "commands table",
        1,
    ),
    (
        "tests via fast-check. 1972 checks / 124 files.",
        "tests via fast-check. 1981 checks / 125 files.",
        "test pyramid",
        1,
    ),
])

rw("wealth-os_SKILL.md", [
    (
        "layer (Vitest 1972 / Playwright 161 / smoke 15).",
        "layer (Vitest 1981 / Playwright 161 / smoke 15).",
        "frontmatter",
        1,
    ),
    (
        "| 5.1.0 / 4.10.2 | Node env, jsdom-free; 1972 checks / 124 files |",
        "| 5.1.0 / 4.10.2 | Node env, jsdom-free; 1981 checks / 125 files |",
        "stack table",
        1,
    ),
    (
        "| Unit tests | `bun run test` (1972 checks) |",
        "| Unit tests | `bun run test` (1981 checks) |",
        "commands table",
        1,
    ),
    (
        "- [ ] `bun run test` — 1972 passed / 124 files",
        "- [ ] `bun run test` — 1981 passed / 125 files",
        "pre-ship checklist",
        1,
    ),
])

print("docs-273-lockstep complete: ladder 1972→1981 / 124→125 / badge 2133→2142 · §7.1 rows · v2.70.0 SR block · trio advance · README status row to R-70")
