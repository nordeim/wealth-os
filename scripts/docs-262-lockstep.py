#!/usr/bin/env python3
# Session-262 (R-59) docs lockstep: the count ladder across the doc set
# (README · AGENTS · CLAUDE · SKILL · PAD), the PAD's v2.59.0 revision
# block, and the docs-counts same-commit advance (the gate-enforced
# contract: UNIT_TOTAL/TEST_FILES constants, the §7.1 family-row pin
# string, the guard trio's THIRTEENTH ride, and the arithmetic comment
# chain) — every edit asserts its OLD form.
def edit(path, old, new, count=1):
    src = open(path, encoding="utf-8").read()
    assert src.count(old) == count, f"{path}: anchor x{src.count(old)} (expected {count}): {old[:70]!r}"
    open(path, "w", encoding="utf-8").write(src.replace(old, new, count))
    print(f"  ok {path}: {old[:52]!r}")

# ---- README -----------------------------------------------------------------
edit("README.md", "tests-1952%20checks", "tests-1966%20checks")
edit("README.md", "| 1800 checks incl. property tests |", "| 1814 checks incl. property tests |")
edit("README.md", "# 113 unit suites + 📂 e2e/ 7 specs", "# 114 unit suites + 📂 e2e/ 7 specs")
edit("README.md", "| 1800 checks / 113 files |", "| 1814 checks / 114 files |")
edit("README.md", "| 1800 unit · 152 e2e · 15 smoke · full gate green |",
     "| 1814 unit · 152 e2e · 15 smoke · full gate green |")

# ---- AGENTS -----------------------------------------------------------------
edit("AGENTS.md", "| Unit tests (1800) | `bun run test` |", "| Unit tests (1814) | `bun run test` |")

# ---- CLAUDE ------------------------------------------------------------------
edit("CLAUDE.md", "lint 0/0 · tsc 0 · 1800 unit · build ·", "lint 0/0 · tsc 0 · 1814 unit · build ·")
edit("CLAUDE.md", "Unit suite (Vitest, 1800 checks)", "Unit suite (Vitest, 1814 checks)")
edit("CLAUDE.md", "tests via fast-check. 1800 checks / 113 files.", "tests via fast-check. 1814 checks / 114 files.")

# ---- SKILL -------------------------------------------------------------------
edit("wealth-os_SKILL.md", "(Vitest 1800 / Playwright 152 / smoke 15)",
     "(Vitest 1814 / Playwright 152 / smoke 15)")
edit("wealth-os_SKILL.md", "Node env, jsdom-free; 1800 checks / 113 files",
     "Node env, jsdom-free; 1814 checks / 114 files")
edit("wealth-os_SKILL.md", "`bun run test` (1800 checks)", "`bun run test` (1814 checks)")
edit("wealth-os_SKILL.md", "`bun run test` — 1800 passed / 113 files",
     "`bun run test` — 1814 passed / 114 files")

# ---- PAD ---------------------------------------------------------------------
edit("Project_Architecture_Document.md", "→ vitest (1800) →", "→ vitest (1814) →")
edit("Project_Architecture_Document.md", "| Unit | 113 | 1800 |", "| Unit | 114 | 1814 |")
edit("Project_Architecture_Document.md", "parity-258, parity-259, parity-260, parity-261, db-transient) |",
     "parity-258, parity-259, parity-260, parity-261, parity-262, db-transient) |")
edit("Project_Architecture_Document.md", "| — architecture pins | 81 |",
     "| — architecture pins | 82 |")
edit("Project_Architecture_Document.md", "# 113 unit suites (incl. architecture pins) + e2e/ 7 specs",
     "# 114 unit suites (incl. architecture pins) + e2e/ 7 specs")
edit("Project_Architecture_Document.md", "`bun run test` → 1800/1800 (counts re-pinned if tests added/removed)",
     "`bun run test` → 1814/1814 (counts re-pinned if tests added/removed)")
edit("Project_Architecture_Document.md", "| 1800 unit / 152 e2e |", "| 1814 unit / 152 e2e |")
edit("Project_Architecture_Document.md",
     "the time of writing (lint 0/0 · tsc 0 · 1800 unit · build · smoke 15/15 ·",
     "the time of writing (lint 0/0 · tsc 0 · 1814 unit · build · smoke 15/15 ·")

# ---- the PAD v2.59.0 [SR] block at the head ------------------------------------
pad = open("Project_Architecture_Document.md", encoding="utf-8").read()
head = "- [SR] v2.58.0 (session 261, R-58 — the heading-prose, dead-brand,"
assert pad.count(head) == 1, "v2.58.0 head anchor"
BLOCK = """- [SR] v2.59.0 (session 262, R-59 — the description-length,
  muted-figure, and citation-completion round): the fresh-eyes audit
  (three Mode-C passes — the R-58 cure surfaces driven by the session
  (the parity-261 battery re-run green 11/11 at HEAD), the
  API/auth/security layer (the FIFTEENTH consecutive clean bill — all
  ten house contracts, 40 handlers / 24 route files, every candidate
  dismissed into a documented posture), and the UI/a11y/shell layer
  (clean on every named contract — the shell family, the theme
  system, the Tailwind v4 token discipline, the store, the route
  twins, the metadata family, the carrier nets all holding; every
  recomputed contrast figure checked by a second engine)); 0 Critical
  / 0 High / 0 Medium / 5 Low / 3 Informational NEW after dedup,
  every material claim re-verified at file:line by the driving
  session — whose whole-tree sweeps EXTENDED two genera beyond the
  audit's bounds (the description-length genus four→SIX carriers; the
  muted-figure genus one→TWO carriers) and whose second-engine WCAG
  recomputation confirmed every challenged figure. The findings:
  F-262a the description-length citation genus (six carriers citing
  405 chars against the tree's own 314-length pin) · F-262b the
  muted-token flip's mis-cited figure (the retired form reproduced on
  no dark surface; the true span 3.91–4.13:1, still under the text
  bar) · F-262c the dialog-close figure (the retired form was the
  page-wash pairing; the surface computes 2.59:1) · F-262d the badge
  comment's mis-attributed figure (the neutral-50 pair computes
  3.61:1; the white family's figure stays at its correct carriers) ·
  F-262e the investment-chip range (the true span 1.99–3.50:1 with
  the neutral fallback at 4.25:1) · F-262f the retired sitemap/robots
  file paths in the site seam's header · F-262g the false
  extractor-scans-stylesheets mechanism claim (build-probed) · F-262h
  the two loose soft figures. The cures: the six description-length
  carriers trued to the measured 314; both muted-figure carriers
  trued to the computed span; the dialog-close figure trued to 2.59:1
  with the retired pairing described without citation; the badge
  comment trued to its own pair's 3.61:1; the chip range trued to the
  per-type computation; the site seam's header names the three real
  route handlers; the globals parenthetical reworded to the convention
  form; the synced pill's two figures named separately and the
  gradient register trued. The parity-262 battery born honest RED (12
  RED legs + 2 green-by-design riders, stash-re-proven) with ONE
  regression-contract catch (the parity-227 badge citation pin read
  the retired figure form — updated in the same commit with the
  rationale, per the count-lockstep doctrine) and one authoring lesson
  applied (the comment-wrapped prose pins ride the comment-stripped
  normalized form, the wrap-lesson's structural edition). The
  verification: lint 0/0 · tsc 0 · 1814 unit (114 files, +14) ·
  build · smoke 15/15 · 152 e2e · census MATCH · bun audit unchanged
  · the captures 239-241 (THE SERVED META-DESCRIPTION FACE — the
  login page's description asserted live at exactly 314 chars; THE
  INVESTMENT-CHIP FACE — the six seeded holdings with their type
  chips asserted live; the standing mobile drawer at 390 with the
  9-destination + Sign Out census and the aria-expanded close flip) +
  the two comparison captures at TRUE 390×844; the six parity drift
  gates per the session-253 precedent (no baseline-carried surface
  touched — the cures are prose, not class).
"""
edit("Project_Architecture_Document.md", head, BLOCK + head)

# ---- the docs-counts constants ---------------------------------------------
edit("tests/docs-counts.test.ts", "const UNIT_TOTAL = 1800;", "const UNIT_TOTAL = 1814;")
edit("tests/docs-counts.test.ts", "const TEST_FILES = 113;", "const TEST_FILES = 114;")

# ---- the §7.1 family-row pin string (parity-262 joins, 81→82) ---------------
edit("tests/docs-counts.test.ts",
     '"| — architecture pins | 81 | (gate-script,',
     '"| — architecture pins | 82 | (gate-script,')
edit("tests/docs-counts.test.ts",
     "parity-257, parity-258, parity-259, parity-260, parity-261, db-transient) |",
     "parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, db-transient) |")

# ---- the arithmetic comment chain -------------------------------------------
edit("tests/docs-counts.test.ts",
     "    // Session-261 (R-58): parity-261 joins the architecture family\n    // (80 -> 81): 4 + 81 + 28 = 113.",
     "    // Session-261 (R-58): parity-261 joins the architecture family\n    // (80 -> 81): 4 + 81 + 28 = 113.\n    // Session-262 (R-59): parity-262 joins the architecture family\n    // (81 -> 82): 4 + 82 + 28 = 114.")

# ---- the guard trio advance (the THIRTEENTH gate-enforced ride) --------------------
edit("tests/docs-counts.test.ts",
     "    expect(p).toMatch(/\\[SR\\] v2\\.55\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1762 unit \\(110 files, \\+18\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.56\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1779 unit \\(111 files, \\+17\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.57\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1789 unit \\(112 files, \\+10\\)/);",
     "    expect(p).toMatch(/\\[SR\\] v2\\.56\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1779 unit \\(111 files, \\+17\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.57\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1789 unit \\(112 files, \\+10\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.58\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1800 unit \\(113 files, \\+11\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.59\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1814 unit \\(114 files, \\+14\\)/);")

edit("tests/docs-counts.test.ts",
     "    // Session-261 (R-58): the TWELFTH gate-enforced ride — the\n    // v2.58.0 block lands together with the trio's advance to\n    // v2.56.0/v2.57.0/v2.58.0 (the v2.55.0 pin ages out).",
     "    // Session-261 (R-58): the TWELFTH gate-enforced ride — the\n    // v2.58.0 block lands together with the trio's advance to\n    // v2.56.0/v2.57.0/v2.58.0 (the v2.55.0 pin ages out).\n    // Session-262 (R-59): the THIRTEENTH gate-enforced ride — the\n    // v2.59.0 block lands together with the trio's advance to\n    // v2.57.0/v2.58.0/v2.59.0 (the v2.56.0 pin ages out).")

print("docs-262 lockstep complete (count ladder + PAD block + docs-counts advance)")
