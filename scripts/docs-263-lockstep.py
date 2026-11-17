#!/usr/bin/env python3
# Session-263 (R-60) docs lockstep: the count ladder (UNIT 1814→1830,
# FILES 114→115, BADGE 1966→1982) across the doc set, the PAD's v2.60.0
# revision block, the guard trio's FOURTEENTH gate-enforced advance, and
# the README program row's R-60 summary. Every replacement asserts the
# OLD form first (the docs-243 scoping doctrine).
import sys

def edit(path, pairs):
    src = open(path, encoding="utf-8").read()
    orig = src
    for old, new in pairs:
        n = src.count(old)
        assert n == 1, f"{path}: anchor not unique ({n}): {old[:70]!r}"
        src = src.replace(old, new)
    if src == orig:
        print(f"{path}: NO-OP?!", file=sys.stderr); sys.exit(1)
    open(path, "w", encoding="utf-8").write(src)
    print(f"{path}: {len(pairs)} edit(s)")

# ---- README.md ---------------------------------------------------------------
edit("README.md", [
    ("tests-1966%20checks", "tests-1982%20checks"),
    ("| 1814 checks incl. property tests |", "| 1830 checks incl. property tests |"),
    ("# 114 unit suites + 📂 e2e/ 7 specs", "# 115 unit suites + 📂 e2e/ 7 specs"),
    ("| `bun run test` | 1814 checks / 114 files |", "| `bun run test` | 1830 checks / 115 files |"),
    ("| 1814 unit · 152 e2e · 15 smoke · full gate green |", "| 1830 unit · 152 e2e · 15 smoke · full gate green |"),
])

# The program row: prepend the R-60 summary (the R-59 row keeps its place).
ROW_TAIL = "(session 262: **R-59 shipped — the description-length, muted-figure, and citation-completion round**:"
R60_SUMMARY = """(session 263: **R-60 shipped — the login-ladder, overlay-alpha, and census-truing round**: the fresh-eyes audit (three Mode-C passes — the R-59 cure surfaces all holding (the parity-262 battery re-run green 14/14) · the API/auth/security layer's sixteenth consecutive clean bill (all ten house contracts, 45 handlers / 30 route files, the census confirmed by the driving session's own grep) · the UI/a11y/shell layer — eight new findings, both adjudication surfaces LIVE-PROBED on the reference (the login family's inputs and submit measured at TRUE widths — the 44px→48px step at the 640px break; the open-dialog overlay measured at the half-strength black) and every challenged figure recomputed in a second engine against the LIVE surfaces): 0 Critical / 0 High / 1 Medium / 5 Low / 2 Informational NEW after dedup. THE ROUND'S FLAGSHIP: **F-263g the login-family height-ladder parity gap** (the reference's sign-in inputs AND submit step 44px→48px at the small breakpoint — live-probed at 390/639/640/767/768/1280; our constants rendered flat 44px since the WealthOS rebase while FOUR prose carriers described the ladder — the prose was right, the code was wrong) · F-263h the select-trigger comment's inverted width mechanism · **F-263i the dialog-overlay alpha** (the comment claimed a stock 80% fade, our constant shipped 60%, and the live reference computes 50% — BOTH sides wrong; the constant trues to the measured form) · F-263j the tabs docblock's equal-width-grid claim · F-263k the import parse-walk's 5001 figure · F-263l the investment-chip dark-arm span (the live-surface recomputation 2.10–3.42:1) · F-263m the savings tile's 2.41:1 · F-263n the session-262 record's stale 40/24 handler census (eight carriers trued to 45/30). The six parity drift gates re-run with the login/reset-password baseline literals re-derived same-commit; the captures 242-244 (the login ladder face at 48px live, the open-dialog overlay face, the standing mobile drawer); the parity-263 battery born honest RED (12 RED legs + 4 riders, stash-re-proven) with the parity-229 bare-word net catching the round's own cure comment (the tenth catch of its genus — reworded before ship)) """
edit("README.md", [
    (ROW_TAIL, R60_SUMMARY + ROW_TAIL),
])

# ---- AGENTS.md ----------------------------------------------------------------
edit("AGENTS.md", [
    ("| Unit tests (1814) | `bun run test` |", "| Unit tests (1830) | `bun run test` |"),
])

# ---- CLAUDE.md ----------------------------------------------------------------
edit("CLAUDE.md", [
    ("lint 0/0 · tsc 0 · 1814 unit · build ·", "lint 0/0 · tsc 0 · 1830 unit · build ·"),
    ("| `bun run test` | Unit suite (Vitest, 1814 checks) |", "| `bun run test` | Unit suite (Vitest, 1830 checks) |"),
    ("tests via fast-check. 1814 checks / 114 files.", "tests via fast-check. 1830 checks / 115 files."),
])

# ---- wealth-os_SKILL.md --------------------------------------------------------
edit("wealth-os_SKILL.md", [
    ("(Vitest 1814 / Playwright 152 / smoke 15)", "(Vitest 1830 / Playwright 152 / smoke 15)"),
    ("Node env, jsdom-free; 1814 checks / 114 files |", "Node env, jsdom-free; 1830 checks / 115 files |"),
    ("| Unit tests | `bun run test` (1814 checks) |", "| Unit tests | `bun run test` (1830 checks) |"),
    ("- [ ] `bun run test` — 1814 passed / 114 files", "- [ ] `bun run test` — 1830 passed / 115 files"),
])

# ---- Project_Architecture_Document.md ------------------------------------------
V260 = """- [SR] v2.60.0 (session 263, R-60 — the login-ladder, overlay-alpha,
  and census-truing round): the fresh-eyes audit (three Mode-C passes —
  the R-59 cure surfaces driven by the session (the parity-262 battery
  re-run green 14/14 at HEAD), the API/auth/security layer (the
  SIXTEENTH consecutive clean bill — all ten house contracts, 45
  handlers / 30 route files, the census confirmed by the driving
  session's own grep; every candidate examined and dismissed into a
  documented posture), and the UI/a11y/shell layer (clean on every
  named contract with eight new findings)). The round's flagship:
  THE LOGIN-FAMILY HEIGHT-LADDER PARITY GAP (F-263g, Medium —
  live-probed on the reference at TRUE widths 390/639/640/767/768/
  1280: the sign-in inputs step 44px→48px at the 640px break and the
  Sign in submit steps with them, while our LOGIN_LAYOUT constants
  rendered flat 44px since the WealthOS rebase — FOUR prose carriers
  still described the ladder: the prose was right, the code was
  wrong). Its adjudication sibling: F-263i the dialog-overlay alpha
  (the comment claimed a stock 80% fade, the constant shipped 60%,
  and the live-probed reference overlay computes the half-strength
  black — BOTH sides wrong, the constant trued to the measured 50%
  form). The prose genera: F-263h the select-trigger comment's
  inverted width mechanism · F-263j the tabs docblock's
  equal-width-grid claim · F-263k the import parse-walk's 5001
  figure · F-263l the investment-chip dark-arm span (the
  live-surface recomputation 2.10–3.42:1 across the card gradient —
  the audit's flat-card assumption corrected, the session-262 lesson
  recurring) · F-263m the savings tile's 2.41:1 · F-263n the
  session-262 record's stale 40/24 handler census (eight carriers
  across six files trued to the true 45/30 per the stale-at-birth
  doctrine). The parity-263 battery born honest RED (12 RED legs + 4
  green-by-design riders, stash-re-proven) with ONE
  regression-contract catch (the parity-229 bare-word net caught the
  round's own cure comment — a bare display utility rode the tabs
  prose; reworded before ship, the tenth catch of its genus) and two
  authoring lessons applied (the wrap-harness containment on the
  figure legs; the overlay capture asserts the v4 oklab serialization
  of the 50% black). The verification: lint 0/0 · tsc 0 · 1830 unit
  (115 files, +16) · build · smoke 15/15 · 152 e2e · census MATCH ·
  bun audit unchanged · THE SIX PARITY DRIFT GATES re-run at the
  re-derived login/reset-password literals (the class cures touched
  swept surfaces — the first gate:full ride since session 253: the
  four sweep classes, the fullpage axis, and the interior census all
  clean; the login baselines dropped toward the reference at every
  ≥640 class) · the captures 242-244 (THE LOGIN-INPUT LADDER FACE —
  the inputs and submit asserted live at 48px at 1280 and 44px/16px
  at 390; THE OPEN-DIALOG OVERLAY FACE — the Add Expense dialog open
  with its overlay asserted live at the measured half-strength black;
  the standing mobile drawer at 390 with the 9-destination + Sign
  Out census and the aria-expanded close flip) + the two comparison
  captures at TRUE 390×844. Recorded, not cured: the reference's
  reset-screen back button is the STOCK form (rounded-md, flat 44px,
  the gray-900 navy) where ours rides the login family — a
  pre-existing genus delta baked into the baselines, registered in
  the plan's R-60 section; the reference's new-password form remains
  unprobeable (no in-band link; no UI strings in the bundle) — our
  family-form construction stands on the screen's docblock record.

"""
edit("Project_Architecture_Document.md", [
    # the revision block: insert v2.60.0 above v2.59.0
    ("- [SR] v2.59.0 (session 262, R-59 — the description-length,", V260 + "- [SR] v2.59.0 (session 262, R-59 — the description-length,"),
    # the gate ADR
    ("→ vitest (1814) → `next build` →", "→ vitest (1830) → `next build` →"),
    # §7.1 the Unit row + the architecture family
    ("| Unit | 114 | 1814 | `tests/*.test.ts` | Vitest 5 + fast-check |", "| Unit | 115 | 1830 | `tests/*.test.ts` | Vitest 5 + fast-check |"),
    ("| — architecture pins | 82 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, db-transient) | `tests/` | source-scanning contracts |",
     "| — architecture pins | 83 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, db-transient) | `tests/` | source-scanning contracts |"),
    # the pre-push checklist
    ("- [ ] `bun run test` → 1814/1814 (counts re-pinned if tests added/removed)", "- [ ] `bun run test` → 1830/1830 (counts re-pinned if tests added/removed)"),
    # §9 command row
    ("| `bun run test` / `CI=1 bun run test:e2e` | root | 1814 unit / 152 e2e |", "| `bun run test` / `CI=1 bun run test:e2e` | root | 1830 unit / 152 e2e |"),
    # §10 closing line
    ("(lint 0/0 · tsc 0 · 1814 unit · build · smoke 15/15 ·", "(lint 0/0 · tsc 0 · 1830 unit · build · smoke 15/15 ·"),
])

# ---- tests/docs-counts.test.ts: the constants + the guard trio's 14th ride ----
edit("tests/docs-counts.test.ts", [
    ("const UNIT_TOTAL = 1814;", "const UNIT_TOTAL = 1830;"),
    ("const TEST_FILES = 114;", "const TEST_FILES = 115;"),
    ("""    // Session-262 (R-59): the THIRTEENTH gate-enforced ride — the
    // v2.59.0 block lands together with the trio's advance to
    // v2.57.0/v2.58.0/v2.59.0 (the v2.56.0 pin ages out).
    expect(p).toMatch(/\\[SR\\] v2\\.57\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1789 unit \\(112 files, \\+10\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.58\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1800 unit \\(113 files, \\+11\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.59\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1814 unit \\(114 files, \\+14\\)/);""",
     """    // Session-262 (R-59): the THIRTEENTH gate-enforced ride — the
    // v2.59.0 block lands together with the trio's advance to
    // v2.57.0/v2.58.0/v2.59.0 (the v2.56.0 pin ages out).
    // Session-263 (R-60): the FOURTEENTH gate-enforced ride — the
    // v2.60.0 block lands together with the trio's advance to
    // v2.58.0/v2.59.0/v2.60.0 (the v2.57.0 pin ages out).
    expect(p).toMatch(/\\[SR\\] v2\\.58\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1800 unit \\(113 files, \\+11\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.59\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1814 unit \\(114 files, \\+14\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.60\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1830 unit \\(115 files, \\+16\\)/);"""),
])

print("docs lockstep complete")
