#!/usr/bin/env python3
"""Session-276 docs lockstep — the count ladder 1997→2008 / 127→128 /
badge 2158→2169, the §7.1 rows (arch pins 95→96 + parity-276), the PAD
v2.73.0 SR block, the trio advance (docs-counts + the parity-243
mirror), the skill doc's api.ts line-count recalibration (446→451, the
F-272n same-commit pin ride — the F-247d precedent), and the README
status row to R-73.

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


OLD_UNIT = "1997"
NEW_UNIT = "2008"
OLD_FILES = "127"
NEW_FILES = "128"
OLD_BADGE = "2158"
NEW_BADGE = "2169"

ARCH_ROW_OLD_COUNT = "95"
ARCH_ROW_NEW_COUNT = "96"

# ---- A. tests/docs-counts.test.ts — the constants, the arch row, the trio -

rw("tests/docs-counts.test.ts", [
    (
        "const UNIT_TOTAL = 1997;",
        "const UNIT_TOTAL = 2008;",
        "unit constant",
        1,
    ),
    (
        "const TEST_FILES = 127;",
        "const TEST_FILES = 128;",
        "files constant",
        1,
    ),
    (
        f"| — architecture pins | {ARCH_ROW_OLD_COUNT} | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, parity-264, parity-265, parity-266, parity-267, parity-268, parity-269, parity-270, parity-271, parity-272, parity-273, parity-274, parity-275, db-transient) |",
        f"| — architecture pins | {ARCH_ROW_NEW_COUNT} | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, parity-264, parity-265, parity-266, parity-267, parity-268, parity-269, parity-270, parity-271, parity-272, parity-273, parity-274, parity-275, parity-276, db-transient) |",
        "arch-pins pin row",
        1,
    ),
    (
        """    // Session-275 (R-72): parity-275 joins the family (94 → 95): the
    // file count takes the suite to 127 — 4 + 95 + 28 = 127.
""",
        """    // Session-275 (R-72): parity-275 joins the family (94 → 95): the
    // file count takes the suite to 127 — 4 + 95 + 28 = 127.
    // Session-276 (R-73): parity-276 joins the family (95 → 96): the
    // file count takes the suite to 128 — 4 + 96 + 28 = 128.
""",
        "arithmetic comment ladder",
        1,
    ),
    (
        """    // Session-275 (R-72): the TWENTY-SIXTH gate-enforced ride — the
    // v2.72.0 block lands together with the trio's advance to
    // v2.70.0/v2.71.0/v2.72.0 (the v2.69.0 pin ages out).
    expect(p).toMatch(/\\[SR\\] v2\\.72\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1997 unit \\(127 files, \\+7\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.71\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1990 unit \\(126 files, \\+9\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.70\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1981 unit \\(125 files, \\+9\\)/);
""",
        """    // Session-275 (R-72): the TWENTY-SIXTH gate-enforced ride — the
    // v2.72.0 block lands together with the trio's advance to
    // v2.70.0/v2.71.0/v2.72.0 (the v2.69.0 pin ages out).
    // Session-276 (R-73): the TWENTY-SEVENTH gate-enforced ride — the
    // v2.73.0 block lands together with the trio's advance to
    // v2.71.0/v2.72.0/v2.73.0 (the v2.70.0 pin ages out).
    expect(p).toMatch(/\\[SR\\] v2\\.73\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 2008 unit \\(128 files, \\+11\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.72\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1997 unit \\(127 files, \\+7\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.71\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1990 unit \\(126 files, \\+9\\)/);
""",
        "trio pins",
        1,
    ),
])

# ---- B. tests/parity-243.test.ts — the mirror ----------------------------

rw("tests/parity-243.test.ts", [
    (
        """    // advances it with the v2.72.0 block: v2.70.0/v2.71.0/v2.72.0
    // (the v2.69.0 pin ages out) — the F-247d same-commit
    // recalibration, the structural leg's twenty-sixth gate-enforced
    // ride.
""",
        """    // advances it with the v2.72.0 block: v2.70.0/v2.71.0/v2.72.0
    // (the v2.69.0 pin ages out) — the F-247d same-commit
    // recalibration, the structural leg's twenty-sixth gate-enforced
    // ride. Session-276 (R-73) advances it with the v2.73.0 block:
    // v2.71.0/v2.72.0/v2.73.0 (the v2.70.0 pin ages out) — the
    // F-247d same-commit recalibration, the structural leg's
    // twenty-seventh gate-enforced ride.
""",
        "mirror comment",
        1,
    ),
    (
        """    expect(guardIt).toContain("v2\\\\.70\\\\.0");
    expect(guardIt).toContain("v2\\\\.71\\\\.0");
    expect(guardIt).toContain("v2\\\\.72\\\\.0");
    expect(guardIt).not.toContain("v2\\\\.69\\\\.0");
    expect(guardIt).toContain("1997 unit \\\\(127 files");
""",
        """    expect(guardIt).toContain("v2\\\\.71\\\\.0");
    expect(guardIt).toContain("v2\\\\.72\\\\.0");
    expect(guardIt).toContain("v2\\\\.73\\\\.0");
    expect(guardIt).not.toContain("v2\\\\.70\\\\.0");
    expect(guardIt).toContain("2008 unit \\\\(128 files");
""",
        "mirror guard assertions",
        1,
    ),
])

# ---- C. the PAD — the v2.73.0 SR block + the live-tense counts ------------

SR_BLOCK = """- [SR] v2.73.0 (session 276, R-73 — the table-structure,
  census-truth, and phantom-comment round): the fresh-eyes audit
  (three Mode-C passes — the R-72 cure surfaces driven by the
  session (all five HOLDING at file:line inside the cold-gate's
  full-suite run: the dialog docblock truth, the PAD pipes, the
  a11y coverage note, the scroll calls, the AGENTS cross-ref), the
  API/auth/security layer (the TWENTY-NINTH consecutive clean bill
  — all thirteen house contracts, 45 handlers / 30 route files read
  line-by-line, the route census re-verified at exactly 30; every
  candidate dismissed into documented postures), and the
  UI/a11y/shell layer (all eight standing contracts verified holding
  live — the drawer, the theme, the v4 scanner (a custom repo-wide
  class sweep found zero phantom variants and zero unpinned token
  classes), the a11y two-gate, the shell twins, the geometry pin,
  the date seams, the escape stacking)) — 0 Critical / 0 High /
  0 Medium / 5 Low / 7 Informational NEW after dedup, every material
  claim re-verified at file:line. THE §5 TABLE STRUCTURE (F-276a,
  Low — the flagship: the execution-history table never rendered
  as a table — no delimiter row under the header, nine blank
  separators, an orphan delimiter mid-table, and the v2.47.0 row
  three cells short; the table now renders as a table with the
  row's gate + commit cells restored from the session-250 worklog
  record). THE PIPE SWEEP (F-276b — the ten §2-ledger rows'
  in-cell pipes escaped, the F-247i genus swept; a whole-doc
  per-table pipe census now rides the parity-276 battery as the
  structural leg). THE PHANTOM COMMENT (F-276c — the R-72 ledger's
  F-275d disposition claimed a modal-rationale comment that never
  shipped; the comment landed at the three open-state a11y legs —
  the tree now matches the ledger's claim). THE CENSUS TRUTH
  (F-276d — the body-ceiling docblock's present-tense THIRTEEN
  route family census reworded to the fifteen-route truth naming
  the budgets POST and budgets DELETE pair). THE POINTER RIDER
  (F-276e — the AGENTS a11y contract line names the design target
  and points at the bespoke hit-area pins; the F-275c note's
  bridge lives at the contract site too). Registered: F-276f–
  F-276i the design-target phrasing posture, the pass-B
  informational postures, the pass-C informational postures, the
  standing PNG regeneration. The verification: lint 0/0 · tsc 0 ·
  2008 unit (128 files, +11) · build · smoke 15/15 · 161 e2e
  (zero new legs — the round changes comments, doc tables, and
  docblocks; no swept surface moves, no pixel can shift) ·
  census MATCH · the captures (the a11y dialog family's own dark
  face, the drawer at 390, the flagship dashboard).
"""

rw("Project_Architecture_Document.md", [
    (
        "- [SR] v2.72.0 (session 275, R-72 — the docblock-tail,",
        SR_BLOCK + "- [SR] v2.72.0 (session 275, R-72 — the docblock-tail,",
        "the v2.73.0 SR block",
        1,
    ),
    (
        "→ vitest (1997) → `next build` → the 15-assertion smoke ladder on the",
        "→ vitest (2008) → `next build` → the 15-assertion smoke ladder on the",
        "ADR-006 gate chain",
        1,
    ),
    (
        "├── tests/                       # 127 unit suites (incl. architecture pins) + e2e/ 7 specs",
        "├── tests/                       # 128 unit suites (incl. architecture pins) + e2e/ 7 specs",
        "the hierarchy line",
        1,
    ),
    (
        "| Unit | 127 | 1997 | `tests/*.test.ts` | Vitest 5 + fast-check |",
        "| Unit | 128 | 2008 | `tests/*.test.ts` | Vitest 5 + fast-check |",
        "the §7.1 Unit row",
        1,
    ),
    (
        "- [ ] `bun run test` → 1997/1997 (counts re-pinned if tests added/removed)",
        "- [ ] `bun run test` → 2008/2008 (counts re-pinned if tests added/removed)",
        "the pre-ship checklist",
        1,
    ),
    (
        "| `bun run test` / `CI=1 bun run test:e2e` | root | 1997 unit / 161 e2e |",
        "| `bun run test` / `CI=1 bun run test:e2e` | root | 2008 unit / 161 e2e |",
        "the command table",
        1,
    ),
    (
        "the time of writing (lint 0/0 · tsc 0 · 1997 unit · build · smoke 15/15 ·",
        "the time of writing (lint 0/0 · tsc 0 · 2008 unit · build · smoke 15/15 ·",
        "the time-of-writing line",
        1,
    ),
    (
        f"| — architecture pins | {ARCH_ROW_OLD_COUNT} | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, parity-264, parity-265, parity-266, parity-267, parity-268, parity-269, parity-270, parity-271, parity-272, parity-273, parity-274, parity-275, db-transient) |",
        f"| — architecture pins | {ARCH_ROW_NEW_COUNT} | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, parity-264, parity-265, parity-266, parity-267, parity-268, parity-269, parity-270, parity-271, parity-272, parity-273, parity-274, parity-275, parity-276, db-transient) |",
        "the PAD §7.1 arch row",
        1,
    ),
])

# ---- D. README — the badge, the counts, the status row ---------------------

README_ROW_OLD_START = "| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 275:"
README_ROW_NEW = """| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 276: **R-73 shipped — the table-structure, census-truth, and phantom-comment round**: the fresh-eyes audit (three Mode-C passes — the R-72 cure surfaces (all five HOLDING inside the cold-gate's full-suite run) · the API/auth/security layer's twenty-ninth consecutive clean bill (all thirteen house contracts, 45 handlers / 30 route files) · the UI/a11y/shell layer — all eight standing contracts verified holding live): 0 Critical / 0 High / 0 Medium / 5 Low / 7 Informational NEW after dedup, every material claim re-verified at file:line. THE ROUND'S FLAGSHIP: **F-276a the §5 execution-history table never rendered as a table** (no delimiter under the header, nine blank separators, an orphan delimiter mid-table, the v2.47.0 row three cells short — the table now renders as a table, the row's gate + commit cells restored from the session-250 record). Plus the riders (F-276b the ten §2-ledger rows' unescaped pipes escaped — the F-247i genus swept with a whole-doc per-table census now pinned structurally · F-276c the R-72 ledger's phantom modal-rationale comment landed at the three open-state a11y legs · F-276d the api.ts body-ceiling docblock's stale THIRTEEN-route census reworded to the fifteen-route truth (the budgets pair named) · F-276e the AGENTS a11y contract line's design-target/floor pointer): **2008 unit (+11) · 161 e2e (zero new legs — no swept surface moves) · smoke 15/15 · census MATCH**; the mobile-nav comparison verified on BOTH sides at TRUE 390×844; probe:ref STABLE on every layer) |"""

with open("README.md", encoding="utf-8") as f:
    readme = f.read()
at = readme.index(README_ROW_OLD_START)
end = readme.index("\n", at)
old_row = readme[at:end]

rw("README.md", [
    (
        "tests-2158%20checks",
        "tests-2169%20checks",
        "the badge",
        1,
    ),
    (
        "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1997 checks incl. property tests |",
        "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 2008 checks incl. property tests |",
        "the architecture table unit row",
        1,
    ),
    (
        "| Unit (Vitest) | `bun run test` | 1997 checks / 127 files |",
        "| Unit (Vitest) | `bun run test` | 2008 checks / 128 files |",
        "the testing table",
        1,
    ),
    (
        "| Verification layer | ✅ Complete | 1997 unit · 161 e2e · 15 smoke · full gate green |",
        "| Verification layer | ✅ Complete | 2008 unit · 161 e2e · 15 smoke · full gate green |",
        "the status row",
        1,
    ),
    (
        old_row,
        README_ROW_NEW,
        "the remediation program status row (whole-row write, single lead-in)",
        1,
    ),
])

# ---- E. AGENTS / CLAUDE / the skill doc — the live-tense counts ------------

rw("AGENTS.md", [
    (
        "| Unit tests (1997) | `bun run test` |",
        "| Unit tests (2008) | `bun run test` |",
        "the commands table",
        1,
    ),
])

rw("CLAUDE.md", [
    (
        "- **The gate is the contract**: lint 0/0 · tsc 0 · 1997 unit · build ·",
        "- **The gate is the contract**: lint 0/0 · tsc 0 · 2008 unit · build ·",
        "the gate contract line",
        1,
    ),
    (
        "| `bun run test` | Unit suite (Vitest, 1997 checks) |",
        "| `bun run test` | Unit suite (Vitest, 2008 checks) |",
        "the build commands table",
        1,
    ),
    (
        "tests via fast-check. 1997 checks / 127 files.",
        "tests via fast-check. 2008 checks / 128 files.",
        "the test pyramid line",
        1,
    ),
])

rw("wealth-os_SKILL.md", [
    (
        "layer (Vitest 1997 / Playwright 161 / smoke 15). Covers the design system,",
        "layer (Vitest 2008 / Playwright 161 / smoke 15). Covers the design system,",
        "the head line",
        1,
    ),
    (
        "| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 1997 checks / 127 files |",
        "| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 2008 checks / 128 files |",
        "the stack table row",
        1,
    ),
    (
        "| Unit tests | `bun run test` (1997 checks) |",
        "| Unit tests | `bun run test` (2008 checks) |",
        "the commands row",
        1,
    ),
    (
        "- [ ] `bun run test` — 1997 passed / 127 files",
        "- [ ] `bun run test` — 2008 passed / 128 files",
        "the pre-ship checklist",
        1,
    ),
    (
        "(`src/lib/api.ts`, 446 lines).",
        "(`src/lib/api.ts`, 451 lines).",
        "the api.ts file-card line count (the F-272n same-commit recalibration — the F-276d cure added five docblock lines)",
        1,
    ),
])

print(f"docs lockstep complete: {OLD_UNIT}→{NEW_UNIT} / {OLD_FILES}→{NEW_FILES} / badge {OLD_BADGE}→{NEW_BADGE}")
