#!/usr/bin/env python3
# Session-261 (R-58) docs lockstep: the count ladder across the doc set
# (README · AGENTS · CLAUDE · SKILL · PAD), the PAD's v2.58.0 revision
# block, and the docs-counts same-commit advance (the gate-enforced
# contract: UNIT_TOTAL/TEST_FILES constants, the §7.1 family-row pin
# string, the guard trio's TWELFTH ride, and the arithmetic comment
# chain) — every edit asserts its OLD form.
def edit(path, old, new, count=1):
    src = open(path, encoding="utf-8").read()
    assert src.count(old) == count, f"{path}: anchor x{src.count(old)} (expected {count}): {old[:70]!r}"
    open(path, "w", encoding="utf-8").write(src.replace(old, new, count))
    print(f"  ok {path}: {old[:52]!r}")

# ---- README -----------------------------------------------------------------
edit("README.md", "tests-1941%20checks", "tests-1952%20checks")
edit("README.md", "| 1789 checks incl. property tests |", "| 1800 checks incl. property tests |")
edit("README.md", "# 112 unit suites + 📂 e2e/ 7 specs", "# 113 unit suites + 📂 e2e/ 7 specs")
edit("README.md", "| 1789 checks / 112 files |", "| 1800 checks / 113 files |")
edit("README.md", "| 1789 unit · 152 e2e · 15 smoke · full gate green |",
     "| 1800 unit · 152 e2e · 15 smoke · full gate green |")

# ---- AGENTS -----------------------------------------------------------------
edit("AGENTS.md", "| Unit tests (1789) | `bun run test` |", "| Unit tests (1800) | `bun run test` |")

# ---- CLAUDE ------------------------------------------------------------------
edit("CLAUDE.md", "lint 0/0 · tsc 0 · 1789 unit · build ·", "lint 0/0 · tsc 0 · 1800 unit · build ·")
edit("CLAUDE.md", "Unit suite (Vitest, 1789 checks)", "Unit suite (Vitest, 1800 checks)")
edit("CLAUDE.md", "tests via fast-check. 1789 checks / 112 files.", "tests via fast-check. 1800 checks / 113 files.")

# ---- SKILL -------------------------------------------------------------------
edit("wealth-os_SKILL.md", "(Vitest 1789 / Playwright 152 / smoke 15)",
     "(Vitest 1800 / Playwright 152 / smoke 15)")
edit("wealth-os_SKILL.md", "Node env, jsdom-free; 1789 checks / 112 files",
     "Node env, jsdom-free; 1800 checks / 113 files")
edit("wealth-os_SKILL.md", "`bun run test` (1789 checks)", "`bun run test` (1800 checks)")
edit("wealth-os_SKILL.md", "`bun run test` — 1789 passed / 112 files",
     "`bun run test` — 1800 passed / 113 files")

# ---- PAD ---------------------------------------------------------------------
edit("Project_Architecture_Document.md", "→ vitest (1789) →", "→ vitest (1800) →")
edit("Project_Architecture_Document.md", "| Unit | 112 | 1789 |", "| Unit | 113 | 1800 |")
edit("Project_Architecture_Document.md", "parity-258, parity-259, parity-260, db-transient) |",
     "parity-258, parity-259, parity-260, parity-261, db-transient) |")
edit("Project_Architecture_Document.md", "| — architecture pins | 80 |",
     "| — architecture pins | 81 |")
edit("Project_Architecture_Document.md", "# 112 unit suites (incl. architecture pins) + e2e/ 7 specs",
     "# 113 unit suites (incl. architecture pins) + e2e/ 7 specs")
edit("Project_Architecture_Document.md", "`bun run test` → 1789/1789 (counts re-pinned if tests added/removed)",
     "`bun run test` → 1800/1800 (counts re-pinned if tests added/removed)")
edit("Project_Architecture_Document.md", "| 1789 unit / 152 e2e |", "| 1800 unit / 152 e2e |")
edit("Project_Architecture_Document.md",
     "the time of writing (lint 0/0 · tsc 0 · 1789 unit · build · smoke 15/15 ·",
     "the time of writing (lint 0/0 · tsc 0 · 1800 unit · build · smoke 15/15 ·")

# ---- the PAD v2.58.0 [SR] block at the head ------------------------------------
pad = open("Project_Architecture_Document.md", encoding="utf-8").read()
head = "- [SR] v2.57.0 (session 260, R-57 — the afternoon-label and"
assert pad.count(head) == 1, "v2.57.0 head anchor"
BLOCK = """- [SR] v2.58.0 (session 261, R-58 — the heading-prose, dead-brand,
  and citation-truing round): the fresh-eyes audit (three Mode-C passes —
  the R-57 cure surfaces driven by the session (the parity-260 battery
  re-run green 10/10 at HEAD), the API/auth/security layer (the
  FOURTEENTH consecutive clean bill — all ten house contracts, all 45
  exported handlers across 30 route files, the counts confirmed
  exactly), and the UI/a11y/shell layer (clean on every named contract
  — the shell family, the theme system, the Tailwind v4 token
  discipline, the store, the route twins, the metadata family, the
  day-label seams, the focus/contrast family all holding; every
  recomputed contrast figure checks out except the round's one stale
  citation)); 0 Critical / 0 High / 0 Medium / 3 Low / 1 Informational
  NEW after dedup, every material claim re-verified at file:line by
  the driving session — whose whole-tree sweeps bounded each genus
  (the h2 prose genus at exactly SEVEN carriers across three files;
  the never-consumed constants genus at exactly the brand pair against
  the 19-export census; the mis-cited figure at exactly two carriers;
  the vestigial-export genus at exactly two survivors) and whose code
  recomputation confirmed the citation defect (white against stone-300
  computes 1.49:1; the cited 1.63:1 fails to reproduce on any surface
  pairing). The findings: F-261a the auth-view heading prose genus
  (seven carriers still describing an h2 the tree renders as h1 — the
  F-231b heading-focus construction is the live, deliberate form) ·
  F-261b the never-consumed brand constants (APP_NAME and APP_TAGLINE,
  the constants census's only dead pair) · F-261c the settings-switch
  comment's mis-cited figure (the stale 1.63 citation at both carriers
  — the settings comment and the plan's F-221n register row) · F-261d
  the vestigial-export genus's next two carriers (BrandMark and
  DEFAULT_DATABASE_URL). The cures: the seven prose carriers trued to
  the rendered h1; the brand pair retired (the literals live on at
  their three inline sites); both figures trued to the computed 1.49:1;
  both export keywords dropped (module-local). The parity-261 battery
  born honest RED (9 RED legs + 2 green-by-design riders) with TWO
  regression-contract catches (the census leg's own expect strings
  false-greened its walk — the self-mention trap, the leg now excludes
  itself from its own census; the parity-229 bare-word invariant caught
  the round's own single-word coinage in the constants retirement
  comment — the ninth catch of its genus, reworded per the
  describe-with-spaces discipline). The verification: lint 0/0 · tsc 0 ·
  1800 unit (113 files, +11) · build · smoke 15/15 · 152 e2e · census
  MATCH · bun audit unchanged · the captures 236-238 (THE AUTH-VIEW
  H1 FAMILY — the reset view's h1 asserted live with the swap focus
  landed on it and zero h2 in the card; THE SETTINGS FACE — the four
  notification switches asserted live; the standing mobile drawer at
  390 with the 9-destination + Sign Out census and the aria-expanded
  close flip) + the two comparison captures at TRUE 390×844; the six
  parity drift gates per the session-253 precedent (no
  baseline-carried surface touched — the cures are prose and export
  keywords, not class).
"""
edit("Project_Architecture_Document.md", head, BLOCK + head)

# ---- the docs-counts constants ---------------------------------------------
edit("tests/docs-counts.test.ts", "const UNIT_TOTAL = 1789;", "const UNIT_TOTAL = 1800;")
edit("tests/docs-counts.test.ts", "const TEST_FILES = 112;", "const TEST_FILES = 113;")

# ---- the §7.1 family-row pin string (parity-261 joins, 80→81) ---------------
edit("tests/docs-counts.test.ts",
     '"| — architecture pins | 80 | (gate-script,',
     '"| — architecture pins | 81 | (gate-script,')
edit("tests/docs-counts.test.ts",
     "parity-257, parity-258, parity-259, parity-260, db-transient) |",
     "parity-257, parity-258, parity-259, parity-260, parity-261, db-transient) |")

# ---- the arithmetic comment chain -------------------------------------------
edit("tests/docs-counts.test.ts",
     "    // Session-260 (R-57): parity-260 joins the architecture family\n    // (79 -> 80): 4 + 80 + 28 = 112.",
     "    // Session-260 (R-57): parity-260 joins the architecture family\n    // (79 -> 80): 4 + 80 + 28 = 112.\n    // Session-261 (R-58): parity-261 joins the architecture family\n    // (80 -> 81): 4 + 81 + 28 = 113.")

# ---- the guard trio advance (the TWELFTH gate-enforced ride) --------------------
edit("tests/docs-counts.test.ts",
     "    expect(p).toMatch(/\\[SR\\] v2\\.55\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1762 unit \\(110 files, \\+18\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.56\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1779 unit \\(111 files, \\+17\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.57\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1789 unit \\(112 files, \\+10\\)/);",
     "    expect(p).toMatch(/\\[SR\\] v2\\.56\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1779 unit \\(111 files, \\+17\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.57\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1789 unit \\(112 files, \\+10\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.58\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1800 unit \\(113 files, \\+11\\)/);")

edit("tests/docs-counts.test.ts",
     "    // Session-260 (R-57): the ELEVENTH gate-enforced ride — the\n    // v2.57.0 block lands together with the trio's advance to\n    // v2.55.0/v2.56.0/v2.57.0 (the v2.54.0 pin ages out).",
     "    // Session-260 (R-57): the ELEVENTH gate-enforced ride — the\n    // v2.57.0 block lands together with the trio's advance to\n    // v2.55.0/v2.56.0/v2.57.0 (the v2.54.0 pin ages out).\n    // Session-261 (R-58): the TWELFTH gate-enforced ride — the\n    // v2.58.0 block lands together with the trio's advance to\n    // v2.56.0/v2.57.0/v2.58.0 (the v2.55.0 pin ages out).")

print("docs-261 lockstep complete (count ladder + PAD block + docs-counts advance)")
