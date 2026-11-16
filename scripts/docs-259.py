#!/usr/bin/env python3
# Session-259 (R-56) docs lockstep, part 2: the PAD's v2.56.0 revision
# block (the [SR] newest-first list head) + the docs-counts same-commit
# advance (the gate-enforced contract: UNIT_TOTAL/TEST_FILES constants,
# the §7.1 family-row pin string, the guard trio's TAKEN ride, and the
# arithmetic comment chain).
def edit(path, old, new, count=1):
    src = open(path, encoding="utf-8").read()
    assert src.count(old) == count, f"{path}: anchor x{src.count(old)} (expected {count}): {old[:70]!r}"
    open(path, "w", encoding="utf-8").write(src.replace(old, new, count))
    print(f"  ok {path}: {old[:52]!r}")

# ---- 1. the PAD v2.56.0 [SR] block at the head --------------------------------
pad = open("Project_Architecture_Document.md", encoding="utf-8").read()
head = "- [SR] v2.55.0 (session 258, R-55 — the citation-math, input-flip,"
assert pad.count(head) == 1, "v2.55.0 head anchor"
BLOCK = """- [SR] v2.56.0 (session 259, R-56 — the bound-message, DST-day, and
  census-prose round): the fresh-eyes audit (three Mode-C passes —
  the R-55 cure surfaces driven by the session (the parity-258
  battery re-run green 18/18 at HEAD), the API/auth/security layer
  (the TWELFTH consecutive clean bill — all ten house contracts, all
  45 exported handlers across 30 route files, the counts confirmed
  exactly), and the UI/a11y/shell layer (clean on every named
  contract, four NEW findings)); 0 Critical / 0 High / 0 Medium / 1
  Low / 3 Informational NEW after dedup, every material claim
  re-verified at file:line by the driving session — the whole-tree
  sweeps bounded each genus (the bare-bounds census exactly six
  sites, the fixed-ms calendar genus exactly two code sites, the
  scope-claim prose exactly one carrier) and the TZ-switched
  arithmetic verifications confirmed both DST defects live on three
  zones. The findings: F-259a the F-252j genus's uncured tail (six
  bare Zod bounds surfacing the raw library copy through
  BAD_REQUEST — the signup name cap, the transaction account-link
  cap on both twins, the goal icon cap on both twins, the coach
  history array cap); F-259b the analytics range's fixed end-of-day
  pad admits the day-after rows on every 23h DST spring-forward day
  (verified by code on three zones — the F-218d family's
  millisecond edition: the seams re-anchor CALENDAR dates through
  toDate, then compare against MILLISECONDS that assume the
  calendar is 24h); F-259c the Upcoming day field's fixed-24h
  division reads one day late through the fall-back window (verified
  by code; the sort key and the item field only — the visible label
  rides the DST-safe round form, the consumer census trued the
  impact); F-259d the toast census prose claiming src-wide lastness
  against its source twin. The cures: the six bounds messaged with
  the house vocabulary; the next-local-midnight helper (finance.ts,
  the domain-math seam) replacing the analytics pad; the
  calendar-day helper replacing the fixed-24h division; the toast
  prose reworded to rendered liveness. The parity-259 battery born
  honest RED 17/17 (re-proven
  via stash) with one companion recalibration (the parity-252
  describe framing — the F-252j family is now nine messaged bounds)
  and one regression-contract catch (the parity-229 whole-tree
  invariant caught the round's own hyphenated comment coinage —
  reworded per the F-229d discipline). The verification: lint 0/0 ·
  tsc 0 · 1779 unit (111 files, +17) · build · smoke 15/15 · 152
  e2e · census MATCH · bun audit unchanged · the captures 231-233
  (the standing mobile drawer at 390 with the census and the close
  flip; THE ANALYTICS RANGE FACE — the From/To inputs with their
  defaults and the range-driven charts through the live seam; THE
  MESSAGE-COPY PROOF — the bound probe answering 400 BAD_REQUEST
  with the house vocabulary through the live envelope, the Upcoming
  census on the safe labels) + the two comparison captures at TRUE
  390×844; the six parity drift gates per the session-253 precedent
  (no baseline-carried surface touched — the pure-math cures are
  row-set-identical under the UTC runner).
"""
edit("Project_Architecture_Document.md", head, BLOCK + head)

# ---- 2. the docs-counts constants ---------------------------------------------
edit("tests/docs-counts.test.ts", "const UNIT_TOTAL = 1762;", "const UNIT_TOTAL = 1779;")
edit("tests/docs-counts.test.ts", "const TEST_FILES = 110;", "const TEST_FILES = 111;")

# ---- 3. the §7.1 family-row pin string (parity-259 joins, 78→79) ---------------
edit("tests/docs-counts.test.ts",
     '"| — architecture pins | 78 | (gate-script,',
     '"| — architecture pins | 79 | (gate-script,')
edit("tests/docs-counts.test.ts",
     "parity-257, parity-258, db-transient) |", "parity-257, parity-258, parity-259, db-transient) |")

# ---- 4. the arithmetic comment chain -------------------------------------------
edit("tests/docs-counts.test.ts",
     "    // Session-258 (R-55): parity-258 joins the architecture family\n    // (77 -> 78): 4 + 78 + 28 = 110.",
     "    // Session-258 (R-55): parity-258 joins the architecture family\n    // (77 -> 78): 4 + 78 + 28 = 110.\n    // Session-259 (R-56): parity-259 joins the architecture family\n    // (78 -> 79): 4 + 79 + 28 = 111.")

# ---- 5. the guard trio advance (the TENTH gate-enforced ride) --------------------
edit("tests/docs-counts.test.ts",
     "    expect(p).toMatch(/\\[SR\\] v2\\.53\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1737 unit \\(108 files, \\+6\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.54\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1744 unit \\(109 files, \\+7\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.55\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1762 unit \\(110 files, \\+18\\)/);",
     "    expect(p).toMatch(/\\[SR\\] v2\\.54\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1744 unit \\(109 files, \\+7\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.55\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1762 unit \\(110 files, \\+18\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.56\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1779 unit \\(111 files, \\+17\\)/);")

edit("tests/docs-counts.test.ts",
     "  // Session-258 (R-55): the NINTH gate-enforced ride — the\n  // v2.55.0 block lands together with the trio's advance to\n  // v2.53.0/v2.54.0/v2.55.0 (the v2.52.0 pin ages out).",
     "  // Session-258 (R-55): the NINTH gate-enforced ride — the\n  // v2.55.0 block lands together with the trio's advance to\n  // v2.53.0/v2.54.0/v2.55.0 (the v2.52.0 pin ages out).\n  // Session-259 (R-56): the TENTH gate-enforced ride — the\n  // v2.56.0 block lands together with the trio's advance to\n  // v2.54.0/v2.55.0/v2.56.0 (the v2.53.0 pin ages out).")

print("docs-lockstep part 2 complete (PAD block + docs-counts advance, 8 asserted edits)")
