#!/usr/bin/env python3
# Session-260 (R-57) docs lockstep, part 2: the PAD's v2.57.0 revision
# block (the [SR] newest-first list head) + the docs-counts same-commit
# advance (the gate-enforced contract: UNIT_TOTAL/TEST_FILES constants,
# the §7.1 family-row pin string, the guard trio's ELEVENTH ride, and
# the arithmetic comment chain).
def edit(path, old, new, count=1):
    src = open(path, encoding="utf-8").read()
    assert src.count(old) == count, f"{path}: anchor x{src.count(old)} (expected {count}): {old[:70]!r}"
    open(path, "w", encoding="utf-8").write(src.replace(old, new, count))
    print(f"  ok {path}: {old[:52]!r}")

# ---- 1. the PAD v2.57.0 [SR] block at the head --------------------------------
pad = open("Project_Architecture_Document.md", encoding="utf-8").read()
head = "- [SR] v2.56.0 (session 259, R-56 — the bound-message, DST-day, and"
assert pad.count(head) == 1, "v2.56.0 head anchor"
BLOCK = """- [SR] v2.57.0 (session 260, R-57 — the afternoon-label and
  register-truing round): the fresh-eyes audit (three Mode-C passes —
  the R-56 cure surfaces driven by the session (the parity-259 battery
  re-run green 17/17 at HEAD), the API/auth/security layer (the
  THIRTEENTH consecutive clean bill — all ten house contracts, all 45
  exported handlers across 30 route files, the counts confirmed
  exactly), and the UI/a11y/shell layer (clean on every named
  contract — the shell family, the theme system, the Tailwind v4
  token discipline, the store, the route twins, the metadata family
  all holding; the date doctrine's residual is the round's finding));
  0 Critical / 0 High / 1 Medium / 0 Low / 0 Informational NEW after
  dedup, every material claim re-verified at file:line by the driving
  session — the whole-tree fixed-24h sweep bounded the genus at
  exactly ONE uncured site (the SESSION_TTL absolute span and the
  calendarDaysBetween ordinal division are correct by construction)
  and the two-zone arithmetic reproduction confirmed the defect live
  on ordinary, non-DST days in both the UTC sandbox and
  America/New_York (the morning-run gates the blindness: every
  pre-noon ref computes correctly). The finding: F-260a the
  relativeDays afternoon mislabel — the visible day-label seam still
  divided a millisecond span by a fixed 24h and rounded, so any ref
  after local noon crossed the half-day threshold and mislabeled the
  whole one-day band on ORDINARY days (a today row read Yesterday; a
  tomorrow row read Today; three user-visible consumers — the
  dashboard's Upcoming label, the Recent Activity label, the income
  page's next-payment label; the R-56 cure's unmigrated sibling —
  the analytics end-pad and the Upcoming day count were retired that
  round, the visible label was not; the calendar-correct sort key
  and the rendered label could disagree after noon; zero test
  coverage, no e2e leg asserts the labels). Plus the register
  truing: the F-259c exoneration clause (assessing the label's
  rounding only for its plus-minus one hour DST behavior) was stale
  as written — ordinary afternoon time-of-day crosses the threshold
  daily; the clause trues in the same commit. The cure: the day
  count derives through the R-56 calendarDaysBetween helper (the
  UTC-parts calendar-day difference — DST-free AND time-of-day-free
  by construction); the Today/Tomorrow/Yesterday/in-N-days/N-days-ago
  formatting arms unchanged. The parity-260 battery born honest RED
  10/10 with one regression-contract catch (the register-truing note
  initially quoted the retired clause verbatim — the pin caught its
  own cure's prose, reworded per the describe-with-spaces
  discipline). The verification: lint 0/0 · tsc 0 · 1789 unit (112
  files, +10) · build · smoke 15/15 · 152 e2e · census MATCH · bun
  audit unchanged · the captures 234-235 (THE AFTERNOON-LABEL LIVE
  PROOF — the Recent Activity labels asserted in-flight against the
  domain seam's own output under the live afternoon clock, the
  yesterday row rendering its calendar truth where the pre-cure span
  rounding read one day late; the Upcoming census; the standing
  mobile drawer at 390 with the census and the close flip) + the two
  comparison captures at TRUE 390×844; the six parity drift gates per
  the session-253 precedent (no baseline-carried surface touched —
  the sweeps compare computed classes, the label text is content
  not class).
"""
edit("Project_Architecture_Document.md", head, BLOCK + head)

# ---- 2. the docs-counts constants ---------------------------------------------
edit("tests/docs-counts.test.ts", "const UNIT_TOTAL = 1779;", "const UNIT_TOTAL = 1789;")
edit("tests/docs-counts.test.ts", "const TEST_FILES = 111;", "const TEST_FILES = 112;")

# ---- 3. the §7.1 family-row pin string (parity-260 joins, 79→80) ---------------
edit("tests/docs-counts.test.ts",
     '"| — architecture pins | 79 | (gate-script,',
     '"| — architecture pins | 80 | (gate-script,')
edit("tests/docs-counts.test.ts",
     "parity-257, parity-258, parity-259, db-transient) |",
     "parity-257, parity-258, parity-259, parity-260, db-transient) |")

# ---- 4. the arithmetic comment chain -------------------------------------------
edit("tests/docs-counts.test.ts",
     "    // Session-259 (R-56): parity-259 joins the architecture family\n    // (78 -> 79): 4 + 79 + 28 = 111.",
     "    // Session-259 (R-56): parity-259 joins the architecture family\n    // (78 -> 79): 4 + 79 + 28 = 111.\n    // Session-260 (R-57): parity-260 joins the architecture family\n    // (79 -> 80): 4 + 80 + 28 = 112.")

# ---- 5. the guard trio advance (the ELEVENTH gate-enforced ride) --------------------
edit("tests/docs-counts.test.ts",
     "    expect(p).toMatch(/\\[SR\\] v2\\.54\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1744 unit \\(109 files, \\+7\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.55\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1762 unit \\(110 files, \\+18\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.56\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1779 unit \\(111 files, \\+17\\)/);",
     "    expect(p).toMatch(/\\[SR\\] v2\\.55\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1762 unit \\(110 files, \\+18\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.56\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1779 unit \\(111 files, \\+17\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.57\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1789 unit \\(112 files, \\+10\\)/);")

edit("tests/docs-counts.test.ts",
     "    // Session-259 (R-56): the TENTH gate-enforced ride — the\n    // v2.56.0 block lands together with the trio's advance to\n    // v2.54.0/v2.55.0/v2.56.0 (the v2.53.0 pin ages out).",
     "    // Session-259 (R-56): the TENTH gate-enforced ride — the\n    // v2.56.0 block lands together with the trio's advance to\n    // v2.54.0/v2.55.0/v2.56.0 (the v2.53.0 pin ages out).\n    // Session-260 (R-57): the ELEVENTH gate-enforced ride — the\n    // v2.57.0 block lands together with the trio's advance to\n    // v2.55.0/v2.56.0/v2.57.0 (the v2.54.0 pin ages out).")

print("docs-260 lockstep part 2 complete (PAD block + docs-counts advance, 8 asserted edits)")
