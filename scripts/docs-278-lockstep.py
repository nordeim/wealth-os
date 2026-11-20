#!/usr/bin/env python3
"""Session-278 docs lockstep (R-75.3) — the count ladder, the SR block,
the trio advance, and the README status row.

Scope discipline (the F-242j doctrine): every replacement is scoped to
the live-tense site it carries; HISTORICAL mentions (the v2.74.0 SR
block's ship counts, session records) keep the counts that were true at
their time. The count ladder: 2019 → 2029 unit · 129 → 130 files ·
badge 2180 → 2190. The trio advance: v2.73.0/v2.74.0/v2.75.0 (the
v2.72.0 pin ages out) — the F-249b structural gate enforces the pairing
(the TWENTY-NINTH gate-enforced ride)."""

import sys


def fail(msg: str) -> None:
    sys.exit(f"[docs-278] {msg}")


def replace_once(text: str, old: str, new: str, label: str) -> str:
    n = text.count(old)
    if n != 1:
        fail(f"[{label}] expected exactly 1 site, found {n}: {old[:70]!r}")
    return text.replace(old, new, 1)


# ---- README.md ------------------------------------------------------------
with open("README.md", encoding="utf-8") as f:
    r = f.read()

r = replace_once(r, "tests-2180%20checks", "tests-2190%20checks", "badge")
r = replace_once(r, "2019 checks incl. property tests", "2029 checks incl. property tests", "stack-row")
r = replace_once(r, "# 129 unit suites + 📂 e2e/ 7 specs", "# 130 unit suites + 📂 e2e/ 7 specs", "hierarchy")
r = replace_once(r, "| Unit (Vitest) | `bun run test` | 2019 checks / 129 files |", "| Unit (Vitest) | `bun run test` | 2029 checks / 130 files |", "testing-table")
r = replace_once(r, "2019 unit · 161 e2e · 15 smoke · full gate green", "2029 unit · 161 e2e · 15 smoke · full gate green", "verification-row")

# The status row rewrite (the F-274d form: written WHOLE with the single lead-in)
OLD_STATUS_ANCHOR = "| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 277: "
if r.count(OLD_STATUS_ANCHOR) != 1:
    fail("[status-row] the R-74 status row lead-in not found")
start = r.index(OLD_STATUS_ANCHOR)
line_end = r.index("\n", start)
row_old = r[start:line_end]
if not row_old.rstrip().endswith("|"):
    fail("[status-row] the row does not end with a cell terminator")

ROW_NEW = """| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 278: **R-75 shipped — the census-family, indented-walker, and register-hygiene round**: the fresh-eyes audit (three Mode-C passes — the R-74 cure surfaces (all five HOLDING inside the cold-gate's full-suite run, one pass-A claim REFUTED at re-verification: the "ungated twin" is the F-227a symlink, parity-227-pinned) · the API/auth/security layer's thirty-first consecutive clean bill (all thirteen house contracts, 45 handlers / 30 route files) · the UI/a11y/shell layer — all eight standing contracts verified holding live, every SKILL file-card count drift-free): 0 Critical / 0 High / 0 Medium / 1 Low / 3 Informational NEW after dedup, every material claim re-verified at file:line. THE ROUND'S FLAGSHIP: **F-278a the table-truth censuses' DOCS set never covered the curated tracked-doc family — two live unescaped-pipe rows rode outside every census** (the sibling skill doc's debugging row + the session-199 implementation plan's stack-mapping row, both escaped now; both DOCS lists extended to the fifteen-file curated family with the scope doctrine registered — the transcript family and the skills library stay outside by the immutable-record doctrine and the owner's exclusion directive). Plus the riders (F-278b both census walkers gain the indented-row predicate — GFM admits up to three leading spaces · F-278c the a11y register's duplicated stone caption matcher de-dups to one cite, the union unchanged): **2029 unit (+10) · 161 e2e (zero new legs — no swept surface moves) · smoke 15/15 · census MATCH**; the mobile-nav comparison verified on BOTH sides at TRUE 390×844; probe:ref STABLE on every layer) |"""
r = r[:start] + ROW_NEW + r[line_end:]

with open("README.md", "w", encoding="utf-8") as f:
    f.write(r)
print("[docs-278] README: badge + stack + hierarchy + testing table + verification row + the R-75 status row")

# ---- AGENTS.md ------------------------------------------------------------
with open("AGENTS.md", encoding="utf-8") as f:
    a = f.read()
a = replace_once(a, "| Unit tests (2019) | `bun run test` |", "| Unit tests (2029) | `bun run test` |", "agents-cmd")
with open("AGENTS.md", "w", encoding="utf-8") as f:
    f.write(a)
print("[docs-278] AGENTS: the command table's unit count")

# ---- CLAUDE.md -------------------------------------------------------------
with open("CLAUDE.md", encoding="utf-8") as f:
    c = f.read()
c = replace_once(c, "lint 0/0 · tsc 0 · 2019 unit · build ·", "lint 0/0 · tsc 0 · 2029 unit · build ·", "claude-gate")
c = replace_once(c, "Unit suite (Vitest, 2019 checks)", "Unit suite (Vitest, 2029 checks)", "claude-cmd")
c = replace_once(c, "tests via fast-check. 2019 checks / 129 files.", "tests via fast-check. 2029 checks / 130 files.", "claude-pyramid")
with open("CLAUDE.md", "w", encoding="utf-8") as f:
    f.write(c)
print("[docs-278] CLAUDE: the gate contract + command table + test pyramid")

# ---- wealth-os_SKILL.md ----------------------------------------------------
with open("wealth-os_SKILL.md", encoding="utf-8") as f:
    s = f.read()
s = replace_once(s, "Vitest 2019 / Playwright 161 / smoke 15", "Vitest 2029 / Playwright 161 / smoke 15", "skill-header")
s = replace_once(s, "Node env, jsdom-free; 2019 checks / 129 files", "Node env, jsdom-free; 2029 checks / 130 files", "skill-stack")
s = replace_once(s, "`bun run test` (2019 checks)", "`bun run test` (2029 checks)", "skill-cmd")
s = replace_once(s, "- [ ] `bun run test` — 2019 passed / 129 files", "- [ ] `bun run test` — 2029 passed / 130 files", "skill-precheck")
with open("wealth-os_SKILL.md", "w", encoding="utf-8") as f:
    f.write(s)
print("[docs-278] SKILL: header + stack + commands + pre-ship checklist")

# ---- Project_Architecture_Document.md -------------------------------------
with open("Project_Architecture_Document.md", encoding="utf-8") as f:
    pad = f.read()

SR_BLOCK = """- [SR] v2.75.0 (session 278, R-75 — the census-family,
  indented-walker, and register-hygiene round): the fresh-eyes audit
  (three Mode-C passes — the R-74 cure surfaces driven by the session
  (all five HOLDING at file:line inside the cold-gate's full-suite
  run: the parity-277 battery 11/11, the three healed §2 splits, the
  re-anchored advisory census with the flipped pin pair, the reworded
  api.ts guards comment at the live twenty-route-file count, the
  hardened parity-276 census — one pass-A claim REFUTED at
  re-verification: the "ungated docs/worklog.md twin" is the F-227a
  symlink, its content already pinned by parity-227's alias legs),
  the API/auth/security layer (the THIRTY-FIRST consecutive clean
  bill — all thirteen house contracts, 45 handlers / 30 route files
  read line-by-line, the route census re-verified at exactly 30;
  every candidate dismissed into documented postures; the api.ts
  455-line file-card and the fifteen/twenty-route comment censuses
  live-accurate), and the UI/a11y/shell layer (all eight standing
  contracts verified holding live — the drawer, the theme, the v4
  scanner with the whole-tree invariant and the bare-word net, the
  a11y two-gate, the shell twins, the geometry pin, the date seams,
  the escape stacking; the z-ladder census exact at the documented
  rungs; every SKILL file-card count verified drift-free)) —
  0 Critical / 0 High / 0 Medium / 1 Low / 3 Informational NEW after
  dedup, every material claim re-verified at file:line. THE
  CENSUS-FAMILY SCOPE (F-278a, Low — the flagship: the table-truth
  censuses' DOCS lists covered the seven living docs while the
  curated tracked-doc family carries fifteen files; two genuine
  unescaped-in-cell-pipe rows rode outside every census — the
  sibling skill doc's debugging-guide row and the session-199
  implementation plan's stack-mapping row — both escaped now, both
  DOCS lists extended to the family, the scope doctrine registered
  at the census sites: the transcript family and the skills library
  stay outside by the immutable-record doctrine and the owner's
  exclusion directive). THE INDENTED WALKER (F-278b — both census
  walkers gain the indented-row predicate: GFM admits tables
  indented up to three leading spaces, the fence-awareness
  hardening's soundness sibling; the parity-278 census carries the
  hardened walker from birth). THE REGISTER DE-DUP (F-278c — the
  a11y register's duplicated stone caption matcher de-dups to one
  cite — the gradient arm's cite covers both surfaces; the
  register's union is unchanged). Registered: F-278d–F-278h (the
  @theme prose var citation — parity-229 does not trip CSS-var
  shapes; the pass-B and pass-C informational postures re-confirmed;
  the historical advisory snapshots' session-record doctrine; the
  standing PNG regeneration). The verification: lint 0/0 · tsc 0 ·
  2029 unit (130 files, +10) · build · smoke 15/15 · 161 e2e (zero
  new legs — the round changes doc rows and test files; the
  register's matcher union is unchanged; no swept surface moves, no
  pixel can shift) · census MATCH · the captures (the standing
  evidence faces — the flagship dashboard and the mobile drawer at
  390; the round's touched surfaces are doc rows and test files).
"""
SR_ANCHOR = "- [SR] v2.74.0 (session 277, R-74 — the blank-row-split,"
if pad.count(SR_ANCHOR) != 1:
    fail("[sr-block] the v2.74.0 SR block anchor not found")
pad = pad.replace(SR_ANCHOR, SR_BLOCK + SR_ANCHOR, 1)

pad = replace_once(pad, "→ vitest (2019) → `next build` →", "→ vitest (2029) → `next build` →", "pad-adr006")
pad = replace_once(pad, "# 129 unit suites (incl. architecture pins) + e2e/ 7 specs", "# 130 unit suites (incl. architecture pins) + e2e/ 7 specs", "pad-hierarchy")
pad = replace_once(pad, "| Unit | 129 | 2019 |", "| Unit | 130 | 2029 |", "pad-unit-row")
pad = replace_once(pad, "| — architecture pins | 97 |", "| — architecture pins | 98 |", "pad-arch-count")
pad = replace_once(pad, "parity-276, parity-277, db-transient) |", "parity-276, parity-277, parity-278, db-transient) |", "pad-arch-list")
pad = replace_once(pad, "- [ ] `bun run test` → 2019/2019 (counts re-pinned if tests added/removed)", "- [ ] `bun run test` → 2029/2029 (counts re-pinned if tests added/removed)", "pad-prepush")
pad = replace_once(pad, "| 2019 unit / 161 e2e |", "| 2029 unit / 161 e2e |", "pad-cmd-row")
pad = replace_once(pad, "(lint 0/0 · tsc 0 · 2019 unit · build · smoke 15/15 ·\n161 e2e — the e2e tail", "(lint 0/0 · tsc 0 · 2029 unit · build · smoke 15/15 ·\n161 e2e — the e2e tail", "pad-closing")

with open("Project_Architecture_Document.md", "w", encoding="utf-8") as f:
    f.write(pad)
print("[docs-278] PAD: the v2.75.0 SR block + the seven count sites + the §7.1 arch row")

# ---- tests/docs-counts.test.ts --------------------------------------------
with open("tests/docs-counts.test.ts", encoding="utf-8") as f:
    dc = f.read()

dc = replace_once(dc, "const UNIT_TOTAL = 2019;", "const UNIT_TOTAL = 2029;", "dc-unit")
dc = replace_once(dc, "const TEST_FILES = 129;", "const TEST_FILES = 130;", "dc-files")
dc = replace_once(dc, "parity-276, parity-277, db-transient) |", "parity-276, parity-277, parity-278, db-transient) |", "dc-arch-row")
dc = replace_once(
    dc,
    "// Session-277 (R-74): parity-277 joins the family (96 → 97): the\n    // file count takes the suite to 129 — 4 + 97 + 28 = 129.",
    "// Session-277 (R-74): parity-277 joins the family (96 → 97): the\n    // file count takes the suite to 129 — 4 + 97 + 28 = 129.\n    // Session-278 (R-75): parity-278 joins the family (97 → 98): the\n    // file count takes the suite to 130 — 4 + 98 + 28 = 130.",
    "dc-arch-comment",
)
dc = replace_once(
    dc,
    "// Session-277 (R-74): the TWENTY-EIGHTH gate-enforced ride — the\n    // v2.74.0 block lands together with the trio's advance to\n    // v2.72.0/v2.73.0/v2.74.0 (the v2.71.0 pin ages out).",
    "// Session-277 (R-74): the TWENTY-EIGHTH gate-enforced ride — the\n    // v2.74.0 block lands together with the trio's advance to\n    // v2.72.0/v2.73.0/v2.74.0 (the v2.71.0 pin ages out).\n    // Session-278 (R-75): the TWENTY-NINTH gate-enforced ride — the\n    // v2.75.0 block lands together with the trio's advance to\n    // v2.73.0/v2.74.0/v2.75.0 (the v2.72.0 pin ages out).",
    "dc-trio-comment",
)
dc = replace_once(
    dc,
    'expect(p).toMatch(/\\[SR\\] v2\\.72\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1997 unit \\(127 files, \\+7\\)/);',
    'expect(p).toMatch(/\\[SR\\] v2\\.75\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 2029 unit \\(130 files, \\+10\\)/);',
    "dc-trio-newest",
)

with open("tests/docs-counts.test.ts", "w", encoding="utf-8") as f:
    f.write(dc)
print("[docs-278] docs-counts: the constants + the arch row + the trio advance (v2.72.0 pin retired)")

# ---- tests/parity-243.test.ts ---------------------------------------------
with open("tests/parity-243.test.ts", encoding="utf-8") as f:
    p243 = f.read()

p243 = replace_once(
    p243,
    'expect(guardIt).toContain("v2\\\\.72\\\\.0");\n    expect(guardIt).toContain("v2\\\\.73\\\\.0");\n    expect(guardIt).toContain("v2\\\\.74\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.71\\\\.0");\n    expect(guardIt).toContain("2019 unit \\\\(129 files");',
    'expect(guardIt).toContain("v2\\\\.73\\\\.0");\n    expect(guardIt).toContain("v2\\\\.74\\\\.0");\n    expect(guardIt).toContain("v2\\\\.75\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.72\\\\.0");\n    expect(guardIt).toContain("2029 unit \\\\(130 files");',
    "p243-mirror",
)
p243 = replace_once(
    p243,
    "twenty-eighth gate-enforced ride.",
    "twenty-eighth gate-enforced ride. Session-278 (R-75) advances it\n    with the v2.75.0 block: v2.73.0/v2.74.0/v2.75.0 (the v2.72.0 pin ages\n    out) — the F-247d same-commit recalibration, the structural leg's\n    twenty-ninth gate-enforced ride.",
    "p243-comment",
)

with open("tests/parity-243.test.ts", "w", encoding="utf-8") as f:
    f.write(p243)
print("[docs-278] parity-243: the mirror advance + the comment trail")

print("[docs-278] lockstep complete")
