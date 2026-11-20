#!/usr/bin/env python3
"""Session-280 docs lockstep (R-77.3) — the count ladder, the SR block,
the trio advance, and the README status row.

Scope discipline (the F-242j doctrine): every replacement is scoped to
the live-tense site it carries; HISTORICAL mentions (the v2.76.0 SR
block's ship counts, session records) keep the counts that were true at
their time. The count ladder: 2042 → 2052 unit · 131 → 132 files ·
161 → 162 e2e · badge 2203 → 2214. The trio advance: v2.75.0/v2.76.0/
v2.77.0 (the v2.74.0 pin ages out) — the F-249b structural gate
enforces the pairing (the THIRTY-FIRST gate-enforced ride)."""

import sys


def fail(msg: str) -> None:
    sys.exit(f"[docs-280] {msg}")


def replace_once(text: str, old: str, new: str, label: str) -> str:
    n = text.count(old)
    if n != 1:
        fail(f"[{label}] expected exactly 1 site, found {n}: {old[:70]!r}")
    return text.replace(old, new, 1)


# ---- README.md ------------------------------------------------------------
with open("README.md", encoding="utf8") as f:
    r = f.read()

r = replace_once(r, "tests-2203%20checks", "tests-2214%20checks", "badge")
r = replace_once(r, "2042 checks incl. property tests", "2052 checks incl. property tests", "stack-row")
r = replace_once(r, "161 checks; chromium; seeded `db/e2e.db` |", "162 checks; chromium; seeded `db/e2e.db` |", "stack-e2e-row")
r = replace_once(r, "# 131 unit suites + 📂 e2e/ 7 specs", "# 132 unit suites + 📂 e2e/ 7 specs", "hierarchy")
r = replace_once(r, "| Unit (Vitest) | `bun run test` | 2042 checks / 131 files |", "| Unit (Vitest) | `bun run test` | 2052 checks / 132 files |", "testing-table")
r = replace_once(r, "| E2E (Playwright, chromium) | `CI=1 bun run test:e2e` | 161 checks / 7 specs", "| E2E (Playwright, chromium) | `CI=1 bun run test:e2e` | 162 checks / 7 specs", "testing-e2e-table")
r = replace_once(r, "2042 unit · 161 e2e · 15 smoke · full gate green", "2052 unit · 162 e2e · 15 smoke · full gate green", "verification-row")

# The status row rewrite (the F-274d form: written WHOLE with the single lead-in)
OLD_STATUS_ANCHOR = "| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 279: "
if r.count(OLD_STATUS_ANCHOR) != 1:
    fail("[status-row] the R-76 status row lead-in not found")
start = r.index(OLD_STATUS_ANCHOR)
line_end = r.index("\n", start)
row_old = r[start:line_end]
if not row_old.rstrip().endswith("|"):
    fail("[status-row] the row does not end with a cell terminator")

ROW_NEW = """| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 280: **R-77 shipped — the hyphen-required, whole-tree-net, and open-axe round**: the fresh-eyes audit (three Mode-C passes — the R-76 cure surfaces all holding (the four-battery family 45/45) · the API/auth/security layer's thirty-third consecutive clean bill (45 handlers / 30 route files) · the UI/a11y/shell layer — all eight standing contracts holding, every SKILL file-card count drift-free): 0 Critical / 0 High / 0 Medium / 4 Low / 8 Informational NEW after dedup, every material claim re-verified at file:line. THE ROUND'S FLAGSHIP: **F-280a the delimiter predicate admits cells carrying no hyphen — the cmark-gfm reference scanner demands one hyphen per cell, and a hyphen-less row renders NO table while passing every census's shape and count gates** (all four batteries' predicate unifies to the cmark-exact cell form; zero live carriers). Plus the riders (F-280k the phantom-breakpoint net widens from the enumerated fifteen-file set to the whole 116-file src tree — the F-207a genus returning as a coverage hole · F-280j the filters expansion card's OPEN state joins the a11y two-gate's open-state family — the surface pre-flighted clean): **2052 unit (+10) · 162 e2e (+1 — the filters-card axe leg) · smoke 15/15 · census MATCH**; the mobile-nav comparison verified on BOTH sides at TRUE 390×844; probe:ref STABLE on every layer) |"""
r = r[:start] + ROW_NEW + r[line_end:]

with open("README.md", "w", encoding="utf8") as f:
    f.write(r)
print("[docs-280] README: badge + stack + hierarchy + testing tables + verification row + the R-77 status row")

# ---- AGENTS.md ------------------------------------------------------------
with open("AGENTS.md", encoding="utf8") as f:
    a = f.read()
a = replace_once(a, "| Unit tests (2042) | `bun run test` |", "| Unit tests (2052) | `bun run test` |", "agents-cmd")
a = replace_once(a, "| E2E (boots own server, 161) | `CI=1 bun run test:e2e` |", "| E2E (boots own server, 162) | `CI=1 bun run test:e2e` |", "agents-e2e-cmd")
with open("AGENTS.md", "w", encoding="utf8") as f:
    f.write(a)
print("[docs-280] AGENTS: the command table's unit + e2e counts")

# ---- CLAUDE.md -------------------------------------------------------------
with open("CLAUDE.md", encoding="utf8") as f:
    c = f.read()
c = replace_once(c, "lint 0/0 · tsc 0 · 2042 unit · build ·\n  smoke 15/15 · 161 e2e.", "lint 0/0 · tsc 0 · 2052 unit · build ·\n  smoke 15/15 · 162 e2e.", "claude-gate")
c = replace_once(c, "| `bun run test` | Unit suite (Vitest, 2042 checks) |", "| `bun run test` | Unit suite (Vitest, 2052 checks) |", "claude-cmd")
c = replace_once(c, "| `CI=1 bun run test:e2e` | E2E suite (Playwright, 161 checks, own db + :3100) |", "| `CI=1 bun run test:e2e` | E2E suite (Playwright, 162 checks, own db + :3100) |", "claude-e2e-cmd")
c = replace_once(c, "tests via fast-check. 2042 checks / 131 files.", "tests via fast-check. 2052 checks / 132 files.", "claude-pyramid")
c = replace_once(c, "161 checks / 7 specs. `playwright.config.ts` pins `db/e2e.db`", "162 checks / 7 specs. `playwright.config.ts` pins `db/e2e.db`", "claude-pyramid-e2e")
with open("CLAUDE.md", "w", encoding="utf8") as f:
    f.write(c)
print("[docs-280] CLAUDE: the gate contract + command table + test pyramid")

# ---- wealth-os_SKILL.md ----------------------------------------------------
with open("wealth-os_SKILL.md", encoding="utf8") as f:
    s = f.read()
s = replace_once(s, "Vitest 2042 / Playwright 161 / smoke 15", "Vitest 2052 / Playwright 162 / smoke 15", "skill-header")
s = replace_once(s, "Node env, jsdom-free; 2042 checks / 131 files", "Node env, jsdom-free; 2052 checks / 132 files", "skill-stack")
s = replace_once(s, "161 checks / 7 specs; own db + port 3100", "162 checks / 7 specs; own db + port 3100", "skill-stack-e2e")
s = replace_once(s, "`bun run test` (2042 checks)", "`bun run test` (2052 checks)", "skill-cmd")
s = replace_once(s, "`CI=1 bun run test:e2e` (161 checks)", "`CI=1 bun run test:e2e` (162 checks)", "skill-cmd-e2e")
s = replace_once(s, "- [ ] `bun run test` — 2042 passed / 131 files", "- [ ] `bun run test` — 2052 passed / 132 files", "skill-precheck")
s = replace_once(s, "- [ ] `CI=1 bun run test:e2e` — 161/161 (7 specs)", "- [ ] `CI=1 bun run test:e2e` — 162/162 (7 specs)", "skill-precheck-e2e")
with open("wealth-os_SKILL.md", "w", encoding="utf8") as f:
    f.write(s)
print("[docs-280] SKILL: header + stack + commands + pre-ship checklist")

# ---- Project_Architecture_Document.md -------------------------------------
with open("Project_Architecture_Document.md", encoding="utf8") as f:
    pad = f.read()

SR_BLOCK = """- [SR] v2.77.0 (session 280, R-77 — the hyphen-required,
  whole-tree-net, and open-axe round): the fresh-eyes audit (three
  Mode-C passes — the R-76 cure surfaces driven by the session (all
  HOLDING at file:line inside the cold-gate's full-suite run: the
  four-battery family at 45/45 legs, the unified colon-tolerant
  predicate, the three cell-count comparisons, the three
  indented-fence strippers, the two instant-parse riders — plus the
  live coverage census re-derived: exactly 16 tracked markdown at
  root/docs = the 15 family files + the F-227a symlink, zero strays;
  127 live tables, 127 count-matched, zero hyphen-less delimiter
  rows), the API/auth/security layer (the THIRTY-THIRD consecutive
  clean bill — all thirteen house contracts, 45 handlers / 30 route
  files read line-by-line, the route census re-verified at exactly
  30; every candidate dismissed into documented postures), and the
  UI/a11y/shell layer (all eight standing contracts verified holding
  live — the drawer mechanics, the theme three-way seam, the v4
  scanner with the whole-tree invariant and the bare-word net, the
  a11y two-gate, the shell twins, the geometry pin, the date seams,
  the escape stacking; the z-ladder census exact at 10/40/50/60/100;
  every SKILL file-card count verified drift-free)) — 0 Critical /
  0 High / 0 Medium / 4 Low / 8 Informational NEW after dedup,
  every material claim re-verified at file:line. THE HYPHEN-REQUIRED
  CELL FORM (F-280a, Low — the flagship: the delimiter predicate
  admits cells carrying no hyphen while the cmark-gfm reference
  scanner demands one hyphen per cell; a colon-only or all-space
  cell row renders NO table on GitHub yet passes every census's
  shape and count gates; all four batteries' predicate unifies to
  the cmark-exact cell form — zero live carriers at the audit). THE
  WHOLE-TREE PHANTOM-BREAKPOINT NET (F-280k, Low — shell-parity's
  xs/2xs/3xs net enumerated fifteen files while the login card, the
  reset screens, the guest redirect, the nav config, the layout
  bridges, and the ui primitives sat outside; the net widens to the
  whole 116-file src tree, the regenerated client skipped — the
  F-207a genus returning as a coverage hole, zero live offenders).
  THE FILTERS-CARD OPEN-AXE LEG (F-280j, Low — the a11y two-gate's
  open-state family gains its fourth surface: the session-265
  in-flow filters expansion card, scrollThrough'd and two-gated;
  the surface pre-flighted clean). Registered: F-280b the
  skills-library count-mismatch (the owner's exclusion directive) ·
  F-280c the 126-vs-127 record lag · F-280d/e the strippers' latent
  rims · F-280f the docstring undercount · F-280g the §5 scope
  posture · F-280h/i the pass-B postures · F-280l the dead defensive
  arm. The verification: lint 0/0 · tsc 0 · 2052 unit (132 files,
  +10) · build · smoke 15/15 · 162 e2e (one new leg — the
  filters-card open-state axe face; no swept surface moves, no
  pixel can shift) · census MATCH · the captures (the standing
  evidence faces — the flagship dashboard and the mobile drawer at
  390; the round's touched surfaces are test files).
"""
SR_ANCHOR = "- [SR] v2.76.0 (session 279, R-76 — the walker-unification,"
if pad.count(SR_ANCHOR) != 1:
    fail("[sr-block] the v2.76.0 SR block anchor not found")
pad = pad.replace(SR_ANCHOR, SR_BLOCK + SR_ANCHOR, 1)

pad = replace_once(pad, "→ vitest (2042) → `next build` →", "→ vitest (2052) → `next build` →", "pad-adr006")
pad = replace_once(pad, "→ Playwright e2e (161) against a pinned `db/e2e.db`.", "→ Playwright e2e (162) against a pinned `db/e2e.db`.", "pad-adr006-e2e")
pad = replace_once(pad, "# 131 unit suites (incl. architecture pins) + e2e/ 7 specs", "# 132 unit suites (incl. architecture pins) + e2e/ 7 specs", "pad-hierarchy")
pad = replace_once(pad, "| Unit | 131 | 2042 |", "| Unit | 132 | 2052 |", "pad-unit-row")
pad = replace_once(pad, "| E2E | 7 | 161 |", "| E2E | 7 | 162 |", "pad-e2e-row")
pad = replace_once(pad, "| — architecture pins | 99 |", "| — architecture pins | 100 |", "pad-arch-count")
pad = replace_once(pad, "parity-279, db-transient) |", "parity-279, parity-280, db-transient) |", "pad-arch-list")
pad = replace_once(pad, "- [ ] `bun run test` → 2042/2042 (counts re-pinned if tests added/removed)", "- [ ] `bun run test` → 2052/2052 (counts re-pinned if tests added/removed)", "pad-prepush")
pad = replace_once(pad, "- [ ] `CI=1 bun run test:e2e` → 161/161", "- [ ] `CI=1 bun run test:e2e` → 162/162", "pad-prepush-e2e")
pad = replace_once(pad, "| 2042 unit / 161 e2e |", "| 2052 unit / 162 e2e |", "pad-cmd-row")
pad = replace_once(pad, "(lint 0/0 · tsc 0 · 2042 unit · build · smoke 15/15 ·\n161 e2e — the e2e tail", "(lint 0/0 · tsc 0 · 2052 unit · build · smoke 15/15 ·\n162 e2e — the e2e tail", "pad-closing")

with open("Project_Architecture_Document.md", "w", encoding="utf8") as f:
    f.write(pad)
print("[docs-280] PAD: the v2.77.0 SR block + the count sites + the §7.1 rows")

# ---- tests/docs-counts.test.ts --------------------------------------------
with open("tests/docs-counts.test.ts", encoding="utf8") as f:
    dc = f.read()

dc = replace_once(dc, "const UNIT_TOTAL = 2042;", "const UNIT_TOTAL = 2052;", "dc-unit")
dc = replace_once(dc, "const E2E_TOTAL = 161;", "const E2E_TOTAL = 162;", "dc-e2e")
dc = replace_once(dc, "const TEST_FILES = 131;", "const TEST_FILES = 132;", "dc-files")
dc = replace_once(dc, "parity-279, db-transient) |", "parity-279, parity-280, db-transient) |", "dc-arch-row")
dc = replace_once(dc, "| — architecture pins | 99 | (gate-script", "| — architecture pins | 100 | (gate-script", "dc-arch-expected-count")
dc = replace_once(
    dc,
    "// Session-279 (R-76): parity-279 joins the family (98 → 99): the\n    // file count takes the suite to 131 — 4 + 99 + 28 = 131.",
    "// Session-279 (R-76): parity-279 joins the family (98 → 99): the\n    // file count takes the suite to 131 — 4 + 99 + 28 = 131.\n    // Session-280 (R-77): parity-280 joins the family (99 → 100): the\n    // file count takes the suite to 132 — 4 + 100 + 28 = 132.",
    "dc-arch-comment",
)
dc = replace_once(
    dc,
    "// Session-279 (R-76): the THIRTIETH gate-enforced ride — the\n    // v2.76.0 block lands together with the trio's advance to\n    // v2.74.0/v2.75.0/v2.76.0 (the v2.73.0 pin ages out).",
    "// Session-279 (R-76): the THIRTIETH gate-enforced ride — the\n    // v2.76.0 block lands together with the trio's advance to\n    // v2.74.0/v2.75.0/v2.76.0 (the v2.73.0 pin ages out).\n    // Session-280 (R-77): the THIRTY-FIRST gate-enforced ride — the\n    // v2.77.0 block lands together with the trio's advance to\n    // v2.75.0/v2.76.0/v2.77.0 (the v2.74.0 pin ages out).",
    "dc-trio-comment",
)
dc = replace_once(
    dc,
    'expect(p).toMatch(/\\[SR\\] v2\\.76\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 2042 unit \\(131 files, \\+13\\)/);',
    'expect(p).toMatch(/\\[SR\\] v2\\.77\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 2052 unit \\(132 files, \\+10\\)/);',
    "dc-trio-newest",
)
dc = replace_once(
    dc,
    'expect(p).toMatch(/\\[SR\\] v2\\.74\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 2019 unit \\(129 files, \\+11\\)/);',
    'expect(p).toMatch(/\\[SR\\] v2\\.76\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 2042 unit \\(131 files, \\+13\\)/);',
    "dc-trio-oldest-retires",
)

with open("tests/docs-counts.test.ts", "w", encoding="utf8") as f:
    f.write(dc)
print("[docs-280] docs-counts: the constants + the arch row + the trio advance (v2.74.0 pin retired)")

# ---- tests/parity-243.test.ts ---------------------------------------------
with open("tests/parity-243.test.ts", encoding="utf8") as f:
    p243 = f.read()

p243 = replace_once(
    p243,
    'expect(guardIt).toContain("v2\\\\.74\\\\.0");\n    expect(guardIt).toContain("v2\\\\.75\\\\.0");\n    expect(guardIt).toContain("v2\\\\.76\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.73\\\\.0");\n    expect(guardIt).toContain("2042 unit \\\\(131 files");',
    'expect(guardIt).toContain("v2\\\\.75\\\\.0");\n    expect(guardIt).toContain("v2\\\\.76\\\\.0");\n    expect(guardIt).toContain("v2\\\\.77\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.74\\\\.0");\n    expect(guardIt).toContain("2052 unit \\\\(132 files");',
    "p243-mirror",
)
p243 = replace_once(
    p243,
    "twenty-ninth gate-enforced ride. Session-279 (R-76) advances it\n    // with the v2.76.0 block: v2.74.0/v2.75.0/v2.76.0 (the v2.73.0 pin\n    // ages out) — the F-247d same-commit recalibration, the structural\n    // leg's thirtieth gate-enforced ride.",
    "twenty-ninth gate-enforced ride. Session-279 (R-76) advances it\n    // with the v2.76.0 block: v2.74.0/v2.75.0/v2.76.0 (the v2.73.0 pin\n    // ages out) — the F-247d same-commit recalibration, the structural\n    // leg's thirtieth gate-enforced ride. Session-280 (R-77) advances it\n    // with the v2.77.0 block: v2.75.0/v2.76.0/v2.77.0 (the v2.74.0 pin\n    // ages out) — the F-247d same-commit recalibration, the structural\n    // leg's thirty-first gate-enforced ride.",
    "p243-comment",
)

with open("tests/parity-243.test.ts", "w", encoding="utf8") as f:
    f.write(p243)
print("[docs-280] parity-243: the mirror advance + the comment trail")

print("[docs-280] lockstep complete")
