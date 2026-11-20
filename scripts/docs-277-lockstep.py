#!/usr/bin/env python3
"""Session-277 docs lockstep (R-74.3) — the count ladder, the SR block,
the trio advance, and the README status row.

Scope discipline (the F-242j doctrine): every replacement is scoped to
the live-tense site it carries; HISTORICAL mentions (the v2.73.0 SR
block's ship counts, session records) keep the counts that were true at
their time. The count ladder: 2008 → 2019 unit · 128 → 129 files ·
badge 2169 → 2180. The trio advance: v2.72.0/v2.73.0/v2.74.0 (the
v2.71.0 pin ages out) — the F-249b structural gate enforces the pairing."""

import sys


def fail(msg: str) -> None:
    sys.exit(f"[docs-277] {msg}")


def replace_once(text: str, old: str, new: str, label: str) -> str:
    n = text.count(old)
    if n != 1:
        fail(f"[{label}] expected exactly 1 site, found {n}: {old[:70]!r}")
    return text.replace(old, new, 1)


# ---- README.md ------------------------------------------------------------
with open("README.md", encoding="utf-8") as f:
    r = f.read()

r = replace_once(r, "tests-2169%20checks", "tests-2180%20checks", "badge")
r = replace_once(r, "2008 checks incl. property tests", "2019 checks incl. property tests", "stack-row")
r = replace_once(r, "# 128 unit suites + 📂 e2e/ 7 specs", "# 129 unit suites + 📂 e2e/ 7 specs", "hierarchy")
r = replace_once(r, "| Unit (Vitest) | `bun run test` | 2008 checks / 128 files |", "| Unit (Vitest) | `bun run test` | 2019 checks / 129 files |", "testing-table")
r = replace_once(r, "2008 unit · 161 e2e · 15 smoke · full gate green", "2019 unit · 161 e2e · 15 smoke · full gate green", "verification-row")

# The status row rewrite (the F-274d form: written WHOLE with the single lead-in)
OLD_STATUS_ANCHOR = "| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 276: "
if r.count(OLD_STATUS_ANCHOR) != 1:
    fail("[status-row] the R-73 status row lead-in not found")
start = r.index(OLD_STATUS_ANCHOR)
end = r.index(" |", start + len(OLD_STATUS_ANCHOR)) if False else None
# The row ends at the line's trailing " |" before the newline — find it as the
# end of the physical line.
line_end = r.index("\n", start)
row_old = r[start:line_end]
if not row_old.rstrip().endswith("|"):
    fail("[status-row] the row does not end with a cell terminator")

ROW_NEW = """| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 277: **R-74 shipped — the blank-row-split, census-scope, and audit-census round**: the fresh-eyes audit (three Mode-C passes — the R-73 cure surfaces (all five HOLDING inside the cold-gate's full-suite run) · the API/auth/security layer's thirtieth consecutive clean bill (all thirteen house contracts, 45 handlers / 30 route files) · the UI/a11y/shell layer — all eight standing contracts verified holding live): 0 Critical / 0 High / 2 Medium / 2 Low / 6 Informational NEW after dedup, every material claim re-verified at file:line. THE ROUND'S FLAGSHIP: **F-277a the plan's own §2 ledger carried the F-276a genus at three sites — internal blank lines split three tables into orphan pipe-paragraph blocks (50 rows including Medium-severity findings)** (the three blanks dropped, the rows rejoined their tables, a fence-aware contiguity census leg now pinned structurally). Plus the riders (F-277b the advisory census re-anchored 1 → 2 — the NEW dev-chain effect HIGH decoded in the §10 row, the runtime chain clean, the security-ledger pin pair flipped same-commit · F-277c the api.ts guards comment's stale twelve-route census reworded to the twenty-route-file truth, the CRM-era URL-param fossils retired · F-277d the parity-276 census hardened — fence-aware, worklog.md the seventh doc): **2019 unit (+11) · 161 e2e (zero new legs — no swept surface moves) · smoke 15/15 · census MATCH**; the mobile-nav comparison verified on BOTH sides at TRUE 390×844; probe:ref STABLE on every layer) |"""
r = r[:start] + ROW_NEW + r[line_end:]

with open("README.md", "w", encoding="utf-8") as f:
    f.write(r)
print("[docs-277] README: badge + stack + hierarchy + testing table + verification row + the R-74 status row")

# ---- AGENTS.md ------------------------------------------------------------
with open("AGENTS.md", encoding="utf-8") as f:
    a = f.read()
a = replace_once(a, "| Unit tests (2008) | `bun run test` |", "| Unit tests (2019) | `bun run test` |", "agents-cmd")
with open("AGENTS.md", "w", encoding="utf-8") as f:
    f.write(a)
print("[docs-277] AGENTS: the command table's unit count")

# ---- CLAUDE.md -------------------------------------------------------------
with open("CLAUDE.md", encoding="utf-8") as f:
    c = f.read()
c = replace_once(c, "lint 0/0 · tsc 0 · 2008 unit · build ·", "lint 0/0 · tsc 0 · 2019 unit · build ·", "claude-gate")
c = replace_once(c, "Unit suite (Vitest, 2008 checks)", "Unit suite (Vitest, 2019 checks)", "claude-cmd")
c = replace_once(c, "tests via fast-check. 2008 checks / 128 files.", "tests via fast-check. 2019 checks / 129 files.", "claude-pyramid")
with open("CLAUDE.md", "w", encoding="utf-8") as f:
    f.write(c)
print("[docs-277] CLAUDE: the gate contract + command table + test pyramid")

# ---- wealth-os_SKILL.md ----------------------------------------------------
with open("wealth-os_SKILL.md", encoding="utf-8") as f:
    s = f.read()
s = replace_once(s, "Vitest 2008 / Playwright 161 / smoke 15", "Vitest 2019 / Playwright 161 / smoke 15", "skill-header")
s = replace_once(s, "Node env, jsdom-free; 2008 checks / 128 files", "Node env, jsdom-free; 2019 checks / 129 files", "skill-stack")
s = replace_once(s, "`bun run test` (2008 checks)", "`bun run test` (2019 checks)", "skill-cmd")
s = replace_once(s, "- [ ] `bun run test` — 2008 passed / 128 files", "- [ ] `bun run test` — 2019 passed / 129 files", "skill-precheck")
with open("wealth-os_SKILL.md", "w", encoding="utf-8") as f:
    f.write(s)
print("[docs-277] SKILL: header + stack + commands + pre-ship checklist")

# ---- Project_Architecture_Document.md -------------------------------------
with open("Project_Architecture_Document.md", encoding="utf-8") as f:
    pad = f.read()

SR_BLOCK = """- [SR] v2.74.0 (session 277, R-74 — the blank-row-split,
  census-scope, and audit-census round): the fresh-eyes audit (three
  Mode-C passes — the R-73 cure surfaces driven by the session (all
  five HOLDING at file:line inside the cold-gate's full-suite run: the
  §5 table structure, the ten escaped rows, the modal-rationale
  comment trio, the fifteen-route docblock census, the AGENTS floor
  pointer), the API/auth/security layer (the THIRTIETH consecutive
  clean bill — all thirteen house contracts, 45 handlers / 30 route
  files read line-by-line, the route census re-verified at exactly
  30; every candidate dismissed into documented postures), and the
  UI/a11y/shell layer (all eight standing contracts verified holding
  live — the drawer, the theme, the v4 scanner, the a11y two-gate,
  the shell twins, the geometry pin, the date seams, the escape
  stacking — 217 targeted unit tests re-run green inside the pass))
  — 0 Critical / 0 High / 2 Medium / 2 Low / 6 Informational NEW
  after dedup, every material claim re-verified at file:line. THE
  §2 BLANK-ROW SPLITS (F-277a, Medium — the flagship: the plan's own
  findings ledger carried the F-276a genus at three sites — internal
  blank lines split three §2 tables into orphan pipe-paragraph
  blocks, 50 rows including Medium-severity findings; the three
  blanks dropped, the rows rejoined their tables, and a fence-aware
  contiguity census leg rides the parity-277 battery so the genus
  can never re-enter). THE AUDIT CENSUS RE-ANCHOR (F-277b, Medium —
  the advisory census moved 1 → 2: a NEW dev-chain HIGH, effect
  GHSA-7589-6fvf-x4pw, rides prisma CLI's @prisma/config@7.10.1
  exact-pin of effect@3.20.0 — the runtime @prisma/client chain is
  clean; the §10 row and the security-ledger pin pair re-anchored
  same-commit with the decode and the dedicated-dependency-round
  posture). THE COMMENT CENSUS (F-277c — the api.ts guards comment's
  present-tense census reworded to the twenty-route-file truth; the
  CRM-era events/reports/export URL-param fossils retired; asString
  survives at search's q parse alone, asDate is battery-only). THE
  CENSUS SCOPE (F-277d — the parity-276 census hardened: the walker
  strips fenced code before the table walk, worklog.md joins the
  DOCS list as the seventh living doc). Registered: F-277e–F-277h
  (the pass-B and pass-C informational postures re-confirmed, the
  historical advisory snapshots' session-record doctrine, the
  standing PNG regeneration). The verification: lint 0/0 · tsc 0 ·
  2019 unit (129 files, +11) · build · smoke 15/15 · 161 e2e (zero
  new legs — the round changes doc tables, one comment, and pin
  files; no swept surface moves, no pixel can shift) · census MATCH
  · the captures (the standing evidence faces — the flagship
  dashboard, the mobile drawer at 390, the comparison capture; the
  round's touched surfaces are docs and pins).
"""
SR_ANCHOR = "- [SR] v2.73.0 (session 276, R-73 — the table-structure,"
if pad.count(SR_ANCHOR) != 1:
    fail("[sr-block] the v2.73.0 SR block anchor not found")
pad = pad.replace(SR_ANCHOR, SR_BLOCK + SR_ANCHOR, 1)

pad = replace_once(pad, "→ vitest (2008) → `next build` →", "→ vitest (2019) → `next build` →", "pad-adr006")
pad = replace_once(pad, "# 128 unit suites (incl. architecture pins) + e2e/ 7 specs", "# 129 unit suites (incl. architecture pins) + e2e/ 7 specs", "pad-hierarchy")
pad = replace_once(pad, "| Unit | 128 | 2008 |", "| Unit | 129 | 2019 |", "pad-unit-row")
pad = replace_once(pad, "| — architecture pins | 96 |", "| — architecture pins | 97 |", "pad-arch-count")
pad = replace_once(pad, "parity-276, db-transient) |", "parity-276, parity-277, db-transient) |", "pad-arch-list")
pad = replace_once(pad, "`bun run test` → 2008/2008 (counts re-pinned if tests added/removed)", "`bun run test` → 2019/2019 (counts re-pinned if tests added/removed)", "pad-prepush")
pad = replace_once(pad, "| 2008 unit / 161 e2e |", "| 2019 unit / 161 e2e |", "pad-cmd-row")
pad = replace_once(pad, "(lint 0/0 · tsc 0 · 2008 unit · build · smoke 15/15 ·\n161 e2e — the e2e tail", "(lint 0/0 · tsc 0 · 2019 unit · build · smoke 15/15 ·\n161 e2e — the e2e tail", "pad-closing")

with open("Project_Architecture_Document.md", "w", encoding="utf-8") as f:
    f.write(pad)
print("[docs-277] PAD: the v2.74.0 SR block + the seven count sites + the §7.1 arch row")

# ---- tests/docs-counts.test.ts --------------------------------------------
with open("tests/docs-counts.test.ts", encoding="utf-8") as f:
    dc = f.read()

dc = replace_once(dc, "const UNIT_TOTAL = 2008;", "const UNIT_TOTAL = 2019;", "dc-unit")
dc = replace_once(dc, "const TEST_FILES = 128;", "const TEST_FILES = 129;", "dc-files")
dc = replace_once(dc, "parity-276, db-transient) |", "parity-276, parity-277, db-transient) |", "dc-arch-row")
dc = replace_once(
    dc,
    "// Session-276 (R-73): parity-276 joins the family (95 → 96): the\n    // file count takes the suite to 128 — 4 + 96 + 28 = 128.",
    "// Session-276 (R-73): parity-276 joins the family (95 → 96): the\n    // file count takes the suite to 128 — 4 + 96 + 28 = 128.\n    // Session-277 (R-74): parity-277 joins the family (96 → 97): the\n    // file count takes the suite to 129 — 4 + 97 + 28 = 129.",
    "dc-arch-comment",
)
dc = replace_once(
    dc,
    "// Session-276 (R-73): the TWENTY-SEVENTH gate-enforced ride — the\n    // v2.73.0 block lands together with the trio's advance to\n    // v2.71.0/v2.72.0/v2.73.0 (the v2.70.0 pin ages out).",
    "// Session-276 (R-73): the TWENTY-SEVENTH gate-enforced ride — the\n    // v2.73.0 block lands together with the trio's advance to\n    // v2.71.0/v2.72.0/v2.73.0 (the v2.70.0 pin ages out).\n    // Session-277 (R-74): the TWENTY-EIGHTH gate-enforced ride — the\n    // v2.74.0 block lands together with the trio's advance to\n    // v2.72.0/v2.73.0/v2.74.0 (the v2.71.0 pin ages out).",
    "dc-trio-comment",
)
dc = replace_once(
    dc,
    'expect(p).toMatch(/\\[SR\\] v2\\.71\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1990 unit \\(126 files, \\+9\\)/);',
    'expect(p).toMatch(/\\[SR\\] v2\\.74\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 2019 unit \\(129 files, \\+11\\)/);',
    "dc-trio-newest",
)

with open("tests/docs-counts.test.ts", "w", encoding="utf-8") as f:
    f.write(dc)
print("[docs-277] docs-counts: the constants + the arch row + the trio advance (v2.71.0 pin retired)")

# ---- tests/parity-243.test.ts ---------------------------------------------
with open("tests/parity-243.test.ts", encoding="utf-8") as f:
    p243 = f.read()

p243 = replace_once(
    p243,
    'expect(guardIt).toContain("v2\\\\.71\\\\.0");\n    expect(guardIt).toContain("v2\\\\.72\\\\.0");\n    expect(guardIt).toContain("v2\\\\.73\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.70\\\\.0");\n    expect(guardIt).toContain("2008 unit \\\\(128 files");',
    'expect(guardIt).toContain("v2\\\\.72\\\\.0");\n    expect(guardIt).toContain("v2\\\\.73\\\\.0");\n    expect(guardIt).toContain("v2\\\\.74\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.71\\\\.0");\n    expect(guardIt).toContain("2019 unit \\\\(129 files");',
    "p243-mirror",
)
p243 = replace_once(
    p243,
    "twenty-seventh gate-enforced ride.",
    "twenty-seventh gate-enforced ride. Session-277 (R-74) advances it\n    with the v2.74.0 block: v2.72.0/v2.73.0/v2.74.0 (the v2.71.0 pin ages\n    out) — the F-247d same-commit recalibration, the structural leg's\n    twenty-eighth gate-enforced ride.",
    "p243-comment",
)

with open("tests/parity-243.test.ts", "w", encoding="utf-8") as f:
    f.write(p243)
print("[docs-277] parity-243: the mirror advance + the comment trail")

print("[docs-277] lockstep complete")
