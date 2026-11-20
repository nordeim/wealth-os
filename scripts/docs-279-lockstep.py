#!/usr/bin/env python3
"""Session-279 docs lockstep (R-76.3) — the count ladder, the SR block,
the trio advance, and the README status row.

Scope discipline (the F-242j doctrine): every replacement is scoped to
the live-tense site it carries; HISTORICAL mentions (the v2.75.0 SR
block's ship counts, session records) keep the counts that were true at
their time. The count ladder: 2029 → 2042 unit · 130 → 131 files ·
badge 2190 → 2203. The trio advance: v2.74.0/v2.75.0/v2.76.0 (the
v2.73.0 pin ages out) — the F-249b structural gate enforces the pairing
(the THIRTIETH gate-enforced ride)."""

import sys


def fail(msg: str) -> None:
    sys.exit(f"[docs-279] {msg}")


def replace_once(text: str, old: str, new: str, label: str) -> str:
    n = text.count(old)
    if n != 1:
        fail(f"[{label}] expected exactly 1 site, found {n}: {old[:70]!r}")
    return text.replace(old, new, 1)


# ---- README.md ------------------------------------------------------------
with open("README.md", encoding="utf8") as f:
    r = f.read()

r = replace_once(r, "tests-2190%20checks", "tests-2203%20checks", "badge")
r = replace_once(r, "2029 checks incl. property tests", "2042 checks incl. property tests", "stack-row")
r = replace_once(r, "# 130 unit suites + 📂 e2e/ 7 specs", "# 131 unit suites + 📂 e2e/ 7 specs", "hierarchy")
r = replace_once(r, "| Unit (Vitest) | `bun run test` | 2029 checks / 130 files |", "| Unit (Vitest) | `bun run test` | 2042 checks / 131 files |", "testing-table")
r = replace_once(r, "2029 unit · 161 e2e · 15 smoke · full gate green", "2042 unit · 161 e2e · 15 smoke · full gate green", "verification-row")

# The status row rewrite (the F-274d form: written WHOLE with the single lead-in)
OLD_STATUS_ANCHOR = "| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 278: "
if r.count(OLD_STATUS_ANCHOR) != 1:
    fail("[status-row] the R-75 status row lead-in not found")
start = r.index(OLD_STATUS_ANCHOR)
line_end = r.index("\n", start)
row_old = r[start:line_end]
if not row_old.rstrip().endswith("|"):
    fail("[status-row] the row does not end with a cell terminator")

ROW_NEW = """| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 279: **R-76 shipped — the walker-unification, cell-count, and indented-fence round**: the fresh-eyes audit (three Mode-C passes — the R-75 cure surfaces all five HOLDING · the API/auth/security layer's thirty-second consecutive clean bill (45 handlers / 30 route files, the focused battery 153/153) · the UI/a11y/shell layer — all eight standing contracts holding, every SKILL file-card count drift-free): 0 Critical / 0 High / 0 Medium / 3 Low / 2 Informational NEW after dedup, every material claim re-verified at file:line. THE ROUND'S FLAGSHIP: **F-279a the census walkers' delimiter-shape drift — parity-276's colon-blind predicate walked the evaluation report's sixteen colon-aligned delimiter rows as DATA rows, green only by pipe-count luck** (the predicate unifies to the shared colon-tolerant shape the siblings already ship). Plus the riders (F-279b all three censuses gain the header-vs-delimiter cell-count comparison — GFM renders no table on a mismatch · F-279c all three fence strippers admit up-to-three-space-indented list-item fences with the opener-indent tracker · F-279d the two instant-parse sites gain the instant-vs-calendar comments): **2042 unit (+13) · 161 e2e (zero new legs — no swept surface moves) · smoke 15/15 · census MATCH**; the mobile-nav comparison verified on BOTH sides at TRUE 390×844; probe:ref STABLE on every layer) |"""
r = r[:start] + ROW_NEW + r[line_end:]

with open("README.md", "w", encoding="utf8") as f:
    f.write(r)
print("[docs-279] README: badge + stack + hierarchy + testing table + verification row + the R-76 status row")

# ---- AGENTS.md ------------------------------------------------------------
with open("AGENTS.md", encoding="utf8") as f:
    a = f.read()
a = replace_once(a, "| Unit tests (2029) | `bun run test` |", "| Unit tests (2042) | `bun run test` |", "agents-cmd")
with open("AGENTS.md", "w", encoding="utf8") as f:
    f.write(a)
print("[docs-279] AGENTS: the command table's unit count")

# ---- CLAUDE.md -------------------------------------------------------------
with open("CLAUDE.md", encoding="utf8") as f:
    c = f.read()
c = replace_once(c, "lint 0/0 · tsc 0 · 2029 unit · build ·", "lint 0/0 · tsc 0 · 2042 unit · build ·", "claude-gate")
c = replace_once(c, "Unit suite (Vitest, 2029 checks)", "Unit suite (Vitest, 2042 checks)", "claude-cmd")
c = replace_once(c, "tests via fast-check. 2029 checks / 130 files.", "tests via fast-check. 2042 checks / 131 files.", "claude-pyramid")
with open("CLAUDE.md", "w", encoding="utf8") as f:
    f.write(c)
print("[docs-279] CLAUDE: the gate contract + command table + test pyramid")

# ---- wealth-os_SKILL.md ----------------------------------------------------
with open("wealth-os_SKILL.md", encoding="utf8") as f:
    s = f.read()
s = replace_once(s, "Vitest 2029 / Playwright 161 / smoke 15", "Vitest 2042 / Playwright 161 / smoke 15", "skill-header")
s = replace_once(s, "Node env, jsdom-free; 2029 checks / 130 files", "Node env, jsdom-free; 2042 checks / 131 files", "skill-stack")
s = replace_once(s, "`bun run test` (2029 checks)", "`bun run test` (2042 checks)", "skill-cmd")
s = replace_once(s, "- [ ] `bun run test` — 2029 passed / 130 files", "- [ ] `bun run test` — 2042 passed / 131 files", "skill-precheck")
with open("wealth-os_SKILL.md", "w", encoding="utf8") as f:
    f.write(s)
print("[docs-279] SKILL: header + stack + commands + pre-ship checklist")

# ---- Project_Architecture_Document.md -------------------------------------
with open("Project_Architecture_Document.md", encoding="utf8") as f:
    pad = f.read()

SR_BLOCK = """- [SR] v2.76.0 (session 279, R-76 — the walker-unification,
  cell-count, and indented-fence round): the fresh-eyes audit (three
  Mode-C passes — the R-75 cure surfaces driven by the session (all
  five HOLDING at file:line inside the cold-gate's full-suite run:
  the parity-278 battery 10/10, the two escaped rows, the two
  fifteen-file DOCS lists, the two indented-row predicates, the a11y
  register's cite-unique de-dup — plus the live coverage census
  re-derived: exactly 16 tracked markdown at root/docs = the 15
  family files + the F-227a symlink, zero strays), the
  API/auth/security layer (the THIRTY-SECOND consecutive clean bill
  — all thirteen house contracts, 45 handlers / 30 route files read
  line-by-line, the route census re-verified at exactly 30; the
  focused security battery 153/153; every candidate dismissed into
  documented postures), and the UI/a11y/shell layer (all eight
  standing contracts verified holding live — the drawer, the theme,
  the v4 scanner with the whole-tree invariant and the bare-word
  net, the a11y two-gate, the shell twins, the geometry pin, the
  date seams, the escape stacking; the z-ladder census exact at the
  documented rungs; every SKILL file-card count verified
  drift-free)) — 0 Critical / 0 High / 0 Medium / 3 Low /
  2 Informational NEW after dedup, every material claim re-verified
  at file:line. THE DELIMITER-SHAPE UNIFICATION (F-279a, Low — the
  flagship: parity-276's colon-blind inline delimiter predicate
  walked the evaluation report's sixteen colon-aligned delimiter
  rows as DATA rows, green only because each carried its header's
  pipe count; the predicate unifies to the shared colon-tolerant
  shape the sibling batteries already ship — the luck dependency
  retires). THE CELL-COUNT COMPARISON (F-279b, Low — all three
  censuses gain the header-vs-delimiter cell-count check: GFM
  renders no table when the delimiter's cell count mismatches the
  header's; 126/126 live tables count-matched at the audit, the
  genus closes with zero live offenders). THE INDENTED-FENCE
  HARDENING (F-279c, Low — all three fence strippers admit
  up-to-three-space-indented list-item fences with the opener-indent
  tracker: an indented fence line inside an outer fence stays
  content; the README/SKILL/DEPLOYMENT carrier population is
  non-vacuous, zero live pipe rows inside them). THE COMMENT RIDERS
  (F-279d, Informational — the finance tiebreak and the verification
  pending check, both correct raw instant parses on TIMESTAMP
  columns, gain the instant-vs-calendar comments so a future
  doctrine sweep cannot "fix" them backwards). Registered: F-279e
  (the a11y claim-vs-mechanism bridge — already parity-275-pinned).
  The verification: lint 0/0 · tsc 0 · 2042 unit (131 files, +13) ·
  build · smoke 15/15 · 161 e2e (zero new legs — the round changes
  walker predicates inside test files plus two source comments; no
  swept surface moves, no pixel can shift) · census MATCH · the
  captures (the standing evidence faces — the flagship dashboard
  and the mobile drawer at 390; the round's touched surfaces are
  test walkers and two comments).
"""
SR_ANCHOR = "- [SR] v2.75.0 (session 278, R-75 — the census-family,"
if pad.count(SR_ANCHOR) != 1:
    fail("[sr-block] the v2.75.0 SR block anchor not found")
pad = pad.replace(SR_ANCHOR, SR_BLOCK + SR_ANCHOR, 1)

pad = replace_once(pad, "→ vitest (2029) → `next build` →", "→ vitest (2042) → `next build` →", "pad-adr006")
pad = replace_once(pad, "# 130 unit suites (incl. architecture pins) + e2e/ 7 specs", "# 131 unit suites (incl. architecture pins) + e2e/ 7 specs", "pad-hierarchy")
pad = replace_once(pad, "| Unit | 130 | 2029 |", "| Unit | 131 | 2042 |", "pad-unit-row")
pad = replace_once(pad, "| — architecture pins | 98 |", "| — architecture pins | 99 |", "pad-arch-count")
pad = replace_once(pad, "parity-276, parity-277, parity-278, db-transient) |", "parity-276, parity-277, parity-278, parity-279, db-transient) |", "pad-arch-list")
pad = replace_once(pad, "- [ ] `bun run test` → 2029/2029 (counts re-pinned if tests added/removed)", "- [ ] `bun run test` → 2042/2042 (counts re-pinned if tests added/removed)", "pad-prepush")
pad = replace_once(pad, "| 2029 unit / 161 e2e |", "| 2042 unit / 161 e2e |", "pad-cmd-row")
pad = replace_once(pad, "(lint 0/0 · tsc 0 · 2029 unit · build · smoke 15/15 ·\n161 e2e — the e2e tail", "(lint 0/0 · tsc 0 · 2042 unit · build · smoke 15/15 ·\n161 e2e — the e2e tail", "pad-closing")

with open("Project_Architecture_Document.md", "w", encoding="utf8") as f:
    f.write(pad)
print("[docs-279] PAD: the v2.76.0 SR block + the seven count sites + the §7.1 arch row")

# ---- tests/docs-counts.test.ts --------------------------------------------
with open("tests/docs-counts.test.ts", encoding="utf8") as f:
    dc = f.read()

dc = replace_once(dc, "const UNIT_TOTAL = 2029;", "const UNIT_TOTAL = 2042;", "dc-unit")
dc = replace_once(dc, "const TEST_FILES = 130;", "const TEST_FILES = 131;", "dc-files")
dc = replace_once(dc, "parity-276, parity-277, parity-278, db-transient) |", "parity-276, parity-277, parity-278, parity-279, db-transient) |", "dc-arch-row")
dc = replace_once(
    dc,
    "// Session-278 (R-75): parity-278 joins the family (97 → 98): the\n    // file count takes the suite to 130 — 4 + 98 + 28 = 130.",
    "// Session-278 (R-75): parity-278 joins the family (97 → 98): the\n    // file count takes the suite to 130 — 4 + 98 + 28 = 130.\n    // Session-279 (R-76): parity-279 joins the family (98 → 99): the\n    // file count takes the suite to 131 — 4 + 99 + 28 = 131.",
    "dc-arch-comment",
)
dc = replace_once(
    dc,
    "// Session-278 (R-75): the TWENTY-NINTH gate-enforced ride — the\n    // v2.75.0 block lands together with the trio's advance to\n    // v2.73.0/v2.74.0/v2.75.0 (the v2.72.0 pin ages out).",
    "// Session-278 (R-75): the TWENTY-NINTH gate-enforced ride — the\n    // v2.75.0 block lands together with the trio's advance to\n    // v2.73.0/v2.74.0/v2.75.0 (the v2.72.0 pin ages out).\n    // Session-279 (R-76): the THIRTIETH gate-enforced ride — the\n    // v2.76.0 block lands together with the trio's advance to\n    // v2.74.0/v2.75.0/v2.76.0 (the v2.73.0 pin ages out).",
    "dc-trio-comment",
)
dc = replace_once(
    dc,
    'expect(p).toMatch(/\\[SR\\] v2\\.73\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 2008 unit \\(128 files, \\+11\\)/);',
    'expect(p).toMatch(/\\[SR\\] v2\\.76\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 2042 unit \\(131 files, \\+13\\)/);',
    "dc-trio-newest",
)

with open("tests/docs-counts.test.ts", "w", encoding="utf8") as f:
    f.write(dc)
print("[docs-279] docs-counts: the constants + the arch row + the trio advance (v2.73.0 pin retired)")

# ---- tests/parity-243.test.ts ---------------------------------------------
with open("tests/parity-243.test.ts", encoding="utf8") as f:
    p243 = f.read()

p243 = replace_once(
    p243,
    'expect(guardIt).toContain("v2\\\\.73\\\\.0");\n    expect(guardIt).toContain("v2\\\\.74\\\\.0");\n    expect(guardIt).toContain("v2\\\\.75\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.72\\\\.0");\n    expect(guardIt).toContain("2029 unit \\\\(130 files");',
    'expect(guardIt).toContain("v2\\\\.74\\\\.0");\n    expect(guardIt).toContain("v2\\\\.75\\\\.0");\n    expect(guardIt).toContain("v2\\\\.76\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.73\\\\.0");\n    expect(guardIt).toContain("2042 unit \\\\(131 files");',
    "p243-mirror",
)
p243 = replace_once(
    p243,
    "twenty-ninth gate-enforced ride.",
    "twenty-ninth gate-enforced ride. Session-279 (R-76) advances it\n    // with the v2.76.0 block: v2.74.0/v2.75.0/v2.76.0 (the v2.73.0 pin\n    // ages out) — the F-247d same-commit recalibration, the structural\n    // leg's thirtieth gate-enforced ride.",
    "p243-comment",
)

with open("tests/parity-243.test.ts", "w", encoding="utf8") as f:
    f.write(p243)
print("[docs-279] parity-243: the mirror advance + the comment trail")

print("[docs-279] lockstep complete")
