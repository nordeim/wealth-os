#!/usr/bin/env python3
"""Session-268 docs lockstep — the count ladder 1895→1911 / 119→120
(fresh file) / 157→159 e2e / badge 2052→2070, the PAD's v2.65.0
revision block, the §7.1 family rows, the guard trio's advance (+
the parity-243 mirror), the README remediation row's advance (R-65),
and the plan's §5 row fill. Every replacement is scoped and asserted
(the F-242j lesson); historical count mentions are untouched (the
scope note at tests/docs-counts.test.ts:15-18)."""

import sys

def swap(text: str, old: str, new: str, count: int = 1, label: str = "") -> str:
    n = text.count(old)
    if n == 0 and text.count(new) == count:
        # already applied (a prior partial run) — idempotent re-entry
        return text
    if n != count:
        sys.exit(f"[{label}] expected {count} occurrence(s), found {n}: {old[:70]!r}")
    return text.replace(old, new)


# ---------------------------------------------------------------- README.md
with open("README.md", encoding="utf-8") as f:
    r = f.read()

r = swap(r, "tests-2052%20checks", "tests-2070%20checks", 1, "README badge")
r = swap(r, "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1895 checks incl. property tests |",
            "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1911 checks incl. property tests |", 1, "README stack")
r = swap(r, "| E2E tests | Playwright + axe-core | 1.65.0 / 4.14.0 | 157 checks; chromium; seeded `db/e2e.db` |",
            "| E2E tests | Playwright + axe-core | 1.65.0 / 4.14.0 | 159 checks; chromium; seeded `db/e2e.db` |", 1, "README e2e stack")
r = swap(r, "# 119 unit suites + 📂 e2e/ 7 specs",
            "# 120 unit suites + 📂 e2e/ 7 specs", 1, "README hierarchy")
r = swap(r, "| Unit (Vitest) | `bun run test` | 1895 checks / 119 files |",
            "| Unit (Vitest) | `bun run test` | 1911 checks / 120 files |", 1, "README testing table")
r = swap(r, "| E2E (Playwright, chromium) | `CI=1 bun run test:e2e` | 157 checks / 7 specs",
            "| E2E (Playwright, chromium) | `CI=1 bun run test:e2e` | 159 checks / 7 specs", 1, "README e2e table")
r = swap(r, "| Verification layer | ✅ Complete | 1895 unit · 157 e2e · 15 smoke · full gate green |",
            "| Verification layer | ✅ Complete | 1911 unit · 159 e2e · 15 smoke · full gate green |", 1, "README verification row")

# The remediation-program status row advances to R-65 (the structural
# docs-counts leg derives the PAD's newest round and asserts this row
# cites it — the F-266a pattern).
row_start = r.index("| Remediation program | 🔀 Active |")
row_end = r.index("\n", row_start)
old_row = r[row_start:row_end]
if "R-65 shipped" not in old_row:
    if "R-64 shipped" not in old_row:
        sys.exit("[README row] the row is neither the R-64 form nor the applied R-65 form — re-read before replacing")
new_row = (
    "| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program "
    "(session 268: **R-65 shipped — the year-remap, switch-target, and cleared-bound round**: the fresh-eyes audit "
    "(three Mode-C passes — the R-64 cure surfaces (the parity-267 battery re-run green 18/18 at HEAD) · the "
    "API/auth/security layer's twenty-first consecutive clean bill (all twelve house contracts, 45 handlers / 30 route "
    "files; 15 candidates dismissed into documented postures) · the UI/a11y/shell layer — all eight standing contracts "
    "verified, four new findings after dedup, every material claim re-verified at file:line (the year-remap "
    "runtime-proven on both sides of the seam, the reference's own 36×20 switch live-measured, the cleared-bound NaN "
    "zeroing runtime-proven)): 0 Critical / 0 High / 0 Medium / 4 Low / 3 Informational NEW after dedup. THE ROUND'S "
    "FOUR LOWS: **F-268a the API date validator admitted sub-100 years the toDate constructor remaps to 19xx** (a "
    "stored \"0050-06-15\" row read 1950 on every render and the edit prefill silently rewrote the stored year — the "
    "cure: boundary rejection + the remap-safe setter arm) · **F-268b the settings switch's touch target sat under "
    "the WCAG 2.5.8 24px floor** (the reference's own 36×20 genus is parity-faithful, so the cure is the "
    "paint-invisible hit-area extension to a 36×32 clickable box + F-248j's aria-describedby completion) · **F-268c a "
    "cleared analytics date input silently zeroed the page** (toDate(\"\") is an Invalid Date, so both range "
    "predicates went false for every row — the $0.00 stat row and the headers-only export; the cure: the "
    "empty-bound-is-open doctrine) · **F-268d the security census re-anchored 1 → 2** (a NEW dev-chain picomatch HIGH "
    "with no fix released — 4.0.7 IS the latest npm dist; the PAD row + the pin moved same-commit). Plus: F-268e/F-268f "
    "the battery-gap riders · F-268g the carrier net's root-config extension. The mobile-nav comparison verified on "
    "BOTH sides at TRUE 390×844; probe:ref STABLE on every layer) |"
)
if "R-65 shipped" not in old_row:
    r = r[:row_start] + new_row + r[row_end:]

with open("README.md", "w", encoding="utf-8") as f:
    f.write(r)

# --------------------------------------------------------------- AGENTS.md
with open("AGENTS.md", encoding="utf-8") as f:
    a = f.read()
a = swap(a, "| Unit tests (1895) | `bun run test` |", "| Unit tests (1911) | `bun run test` |", 1, "AGENTS unit")
a = swap(a, "| E2E (boots own server, 157) | `CI=1 bun run test:e2e` |",
            "| E2E (boots own server, 159) | `CI=1 bun run test:e2e` |", 1, "AGENTS e2e")
with open("AGENTS.md", "w", encoding="utf-8") as f:
    f.write(a)

# --------------------------------------------------------------- CLAUDE.md
with open("CLAUDE.md", encoding="utf-8") as f:
    c = f.read()
c = swap(c, "lint 0/0 · tsc 0 · 1895 unit · build ·", "lint 0/0 · tsc 0 · 1911 unit · build ·", 1, "CLAUDE gate")
c = swap(c, "smoke 15/15 · 157 e2e.", "smoke 15/15 · 159 e2e.", 1, "CLAUDE gate2")
c = swap(c, "| `bun run test` | Unit suite (Vitest, 1895 checks) |",
            "| `bun run test` | Unit suite (Vitest, 1911 checks) |", 1, "CLAUDE unit")
c = swap(c, "| `CI=1 bun run test:e2e` | E2E suite (Playwright, 157 checks, own db + :3100) |",
            "| `CI=1 bun run test:e2e` | E2E suite (Playwright, 159 checks, own db + :3100) |", 1, "CLAUDE e2e")
c = swap(c, "tests via fast-check. 1895 checks / 119 files.", "tests via fast-check. 1911 checks / 120 files.", 1, "CLAUDE counts")
c = swap(c, "157 checks / 7 specs. `playwright.config.ts` pins", "159 checks / 7 specs. `playwright.config.ts` pins", 1, "CLAUDE e2e counts")
with open("CLAUDE.md", "w", encoding="utf-8") as f:
    f.write(c)

# ------------------------------------------------------- wealth-os_SKILL.md
with open("wealth-os_SKILL.md", encoding="utf-8") as f:
    s = f.read()
s = swap(s, "layer (Vitest 1895 / Playwright 157 / smoke 15).", "layer (Vitest 1911 / Playwright 159 / smoke 15).", 1, "SKILL head")
s = swap(s, "Node env, jsdom-free; 1895 checks / 119 files |", "Node env, jsdom-free; 1911 checks / 120 files |", 1, "SKILL stack")
s = swap(s, "Chromium; 157 checks / 7 specs; own db + port 3100 |", "Chromium; 159 checks / 7 specs; own db + port 3100 |", 1, "SKILL e2e")
s = swap(s, "| Unit tests | `bun run test` (1895 checks) |", "| Unit tests | `bun run test` (1911 checks) |", 1, "SKILL cmd")
s = swap(s, "| E2E (boots own server) | `CI=1 bun run test:e2e` (157 checks) |",
            "| E2E (boots own server) | `CI=1 bun run test:e2e` (159 checks) |", 1, "SKILL e2e cmd")
s = swap(s, "- [ ] `bun run test` — 1895 passed / 119 files", "- [ ] `bun run test` — 1911 passed / 120 files", 1, "SKILL checklist")
s = swap(s, "- [ ] `CI=1 bun run test:e2e` — 157/157 (7 specs)", "- [ ] `CI=1 bun run test:e2e` — 159/159 (7 specs)", 1, "SKILL e2e checklist")
with open("wealth-os_SKILL.md", "w", encoding="utf-8") as f:
    f.write(s)

# ------------------------------------------- Project_Architecture_Document
with open("Project_Architecture_Document.md", encoding="utf-8") as f:
    p = f.read()

p = swap(p, "→ vitest (1895) → `next build` →", "→ vitest (1911) → `next build` →", 1, "PAD pipeline")
p = swap(p, "├── tests/                       # 119 unit suites (incl. architecture pins) + e2e/ 7 specs",
            "├── tests/                       # 120 unit suites (incl. architecture pins) + e2e/ 7 specs", 1, "PAD hierarchy")
p = swap(p, "| Unit | 119 | 1895 | `tests/*.test.ts` | Vitest 5 + fast-check |",
            "| Unit | 120 | 1911 | `tests/*.test.ts` | Vitest 5 + fast-check |", 1, "PAD 7.1 unit row")
p = swap(p, "| — architecture pins | 87 |", "| — architecture pins | 88 |", 1, "PAD 7.1 arch row")
p = swap(p, "parity-266, parity-267, db-transient) | `tests/` | source-scanning contracts |",
            "parity-266, parity-267, parity-268, db-transient) | `tests/` | source-scanning contracts |", 1, "PAD 7.1 arch list")
p = swap(p, "| E2E | 7 | 157 | `tests/e2e/*.spec.ts` | Playwright (chromium) + axe-core |",
            "| E2E | 7 | 159 | `tests/e2e/*.spec.ts` | Playwright (chromium) + axe-core |", 1, "PAD 7.1 e2e row")
p = swap(p, "| `bun run test` / `CI=1 bun run test:e2e` | root | 1895 unit / 157 e2e |",
            "| `bun run test` / `CI=1 bun run test:e2e` | root | 1911 unit / 159 e2e |", 1, "PAD 9 cmd")
p = swap(p, "- [ ] `bun run test` → 1895/1895 (counts re-pinned if tests added/removed)",
            "- [ ] `bun run test` → 1911/1911 (counts re-pinned if tests added/removed)", 1, "PAD 10 checklist")
p = swap(p, "the time of writing (lint 0/0 · tsc 0 · 1895 unit · build · smoke 15/15 ·",
            "the time of writing (lint 0/0 · tsc 0 · 1911 unit · build · smoke 15/15 ·", 1, "PAD 10 closing")

# The v2.65.0 revision block, above v2.64.0's.
V264_HEAD = "- [SR] v2.64.0 (session 267, R-64 — the savings-tab, sort-count, and"
block = """- [SR] v2.65.0 (session 268, R-65 — the year-remap, switch-target, and
  cleared-bound round): the fresh-eyes audit (three Mode-C passes —
  the R-64 cure surfaces driven by the session (the parity-267 battery
  re-run green 18/18 at HEAD), the API/auth/security layer (the
  TWENTY-FIRST consecutive clean bill — all twelve house contracts,
  45 handlers / 30 route files read line-by-line, 15 candidates
  examined and dismissed into documented postures), and the
  UI/a11y/shell layer (all eight standing contracts verified, four new
  findings after dedup)) — 0 Critical / 0 High / 0 Medium / 4 Low /
  3 Informational NEW after dedup, every material claim re-verified
  at file:line by the driving session (the year-remap divergence
  runtime-proven on both sides of the seam, the reference's own 36×20
  switch live-measured through agent-browser, the cleared-bound NaN
  zeroing runtime-proven through the seam's verbatim semantics). THE
  YEAR-REMAP ADMISSION (F-268a, Low — the round's flagship: the API
  date validator's round-trip passed sub-100 years the string parser
  does not remap, while toDate's numeric constructor shifted them
  +1900 — a stored "0050-06-15" row rendered 1950 on every read and
  the edit prefill silently REWROTE the stored year on save; the cure
  closes BOTH halves — dateField rejects sub-100 years at the boundary
  (the csv.ts two-digit-year remap doctrine, a skip beats an invented
  century) AND toDate's branch 2 gains the setFullYear arm (the
  remap-safe setter, still anchoring local midnight of the written
  calendar)) · the settings switch's touch target (F-268b — the
  36×20 painted track sat under the WCAG 2.5.8 24px floor, the
  F-235f/F-236d precedent class never swept the row; live-adjudicated:
  the reference's own switch measures 36×20, so the cure is
  paint-invisible — the empty-content pseudo at negative vertical
  insets extends the clickable box to 36×32 (the 8px insets offset
  from the padding box, the 2px border spending 2px each side), with
  F-248j's aria-describedby completion folded into the same edit (the
  description paragraph joins the switch's a11y chain — the
  reference's own switch carries no a11y attributes, the sanctioned
  superset)) · the cleared analytics bound (F-268c — a cleared native
  date input yields "" and toDate("") is an Invalid Date, so both
  range predicates went false for EVERY row: the $0.00 stat row, the
  no-data faces, the headers-only export off one cleared keystroke;
  the cure is the empty-bound-is-open doctrine, the Expenses seam's
  own parseBound semantics, with the refDate falling back to a stable
  now when the upper bound is open) · the security census re-triage
  (F-268d — `bun audit` moved 1 → 2: a NEW dev-chain picomatch HIGH
  (GHSA-fc5q-39xc-vjpf / CVE-2026-112366, ReDoS via single-branch
  repeated extglob, CVSS 8.7) with NO FIX RELEASE (4.0.7 IS the latest
  npm dist); every dependency path is dev-toolchain (typescript-
  estree→tinyglobby, vite), zero runtime chains — the PAD §10 row +
  the security-ledger pin carry the census with the picomatch decode,
  same-commit) · the battery-gap riders (F-268e the clearAllFilters
  body pin, F-268f the no-millis twin leg) · the carrier net's
  root-config extension (F-268g — the walk gains the nine tracked
  root config files so the net's live universe matches Tailwind's scan
  set; the extension's maiden run caught three prose carriers —
  self contained, heals itself, and the file-URL literal — reworded
  same-commit). Registered: F-268h the dashboard KPI memo tail,
  F-268i the junk-bound posture, F-268j the custom-empty posture. The
  verification: lint 0/0 · tsc 0 · 1911 unit (120 files, +16) ·
  build · smoke 15/15 · 159 e2e (+2 — the cleared From date keeps the
  ledger's stat row non-zero with no no-data face, and the switch
  hit-area click 4px above the track's top edge toggles the control;
  zero new signups, the shared storageState rides) · census MATCH ·
  THE SIX PARITY DRIFT GATES RE-RUN (required again — the analytics
  and settings parity surfaces changed): the four sweep classes CLEAN
  (1440/390/768/1024, 0.5pct margin), the fullpage sweep CLEAN, the
  interior census CLEAN (0-event margin — the closed-state DOM
  unchanged by construction: the bound guard is render-logic inside
  the memo, the hit-area extension paints nothing, the describedby is
  an attribute) · the captures 252 (THE CLEARED-BOUND ANALYTICS FACE
  AT DESKTOP 1440×900 — From empty, the stat row reading the real
  averages $8,083.33 / $3,025.59 / $5,057.75, the trend populated)
  and 253 (THE SETTINGS SWITCH HIT-AREA FACE AT DESKTOP — the 36×20
  painted track with the 36×32 clickable box (elementFromPoint
  resolving to the switch 4px past both edges, the F-225d doctrine)
  and the description wired) + the two comparison captures at TRUE
  390×844.

"""
if p.count(V264_HEAD) != 1:
    sys.exit("[PAD block] the v2.64.0 block head is not unique")
p = p.replace(V264_HEAD, block + V264_HEAD)
with open("Project_Architecture_Document.md", "w", encoding="utf-8") as f:
    f.write(p)

# ------------------------------------------------- tests/docs-counts.test.ts
with open("tests/docs-counts.test.ts", encoding="utf-8") as f:
    t = f.read()
t = swap(t, "const UNIT_TOTAL = 1895;", "const UNIT_TOTAL = 1911;", 1, "dc unit")
t = swap(t, "const E2E_TOTAL = 157;", "const E2E_TOTAL = 159;", 1, "dc e2e")
t = swap(t, "const TEST_FILES = 119;", "const TEST_FILES = 120;", 1, "dc files")

# The guard trio's advance (the nineteenth gate-enforced ride): the
# comment joins, the new expect lands at the top (the v2.64 expect it
# anchors on STAYS — the window keeps the three newest), the v2.62.0
# pin ages out below.
t = swap(t,
    """    // Session-267 (R-64): the EIGHTEENTH gate-enforced ride — the
    // v2.64.0 block lands together with the trio's advance to
    // v2.62.0/v2.63.0/v2.64.0 (the v2.61.0 pin ages out).
    expect(p).toMatch(/\\[SR\\] v2\\.64\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1895 unit \\(119 files, \\+18\\)/);""",
    """    // Session-267 (R-64): the EIGHTEENTH gate-enforced ride — the
    // v2.64.0 block lands together with the trio's advance to
    // v2.62.0/v2.63.0/v2.64.0 (the v2.61.0 pin ages out).
    // Session-268 (R-65): the NINETEENTH gate-enforced ride — the
    // v2.65.0 block lands together with the trio's advance to
    // v2.63.0/v2.64.0/v2.65.0 (the v2.62.0 pin ages out).
    expect(p).toMatch(/\\[SR\\] v2\\.65\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1911 unit \\(120 files, \\+16\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.64\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1895 unit \\(119 files, \\+18\\)/);""",
    1, "dc trio")
t = swap(t,
    """    expect(p).toMatch(/\\[SR\\] v2\\.63\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1877 unit \\(118 files, \\+17\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.62\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1860 unit \\(117 files, \\+22\\)/);""",
    """    expect(p).toMatch(/\\[SR\\] v2\\.63\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1877 unit \\(118 files, \\+17\\)/);""",
    1, "dc trio aged line")

# The arch-pins family row inline literal (the F-245d arithmetic leg's
# source of truth): parity-268 joins at 88.
t = swap(t, "| — architecture pins | 87 | (gate-script,",
            "| — architecture pins | 88 | (gate-script,", 1, "dc arch row literal")
t = swap(t, 'parity-267, db-transient) |",',
            'parity-267, parity-268, db-transient) |",', 1, "dc arch list literal")
with open("tests/docs-counts.test.ts", "w", encoding="utf-8") as f:
    f.write(t)

# --------------------------------------------------- tests/parity-243.test.ts
# The mirror of the guard trio's advance.
with open("tests/parity-243.test.ts", encoding="utf-8") as f:
    m = f.read()
m = swap(m,
    """    // structural leg's eighteenth gate-enforced ride.""",
    """    // structural leg's eighteenth gate-enforced ride. Session-268
    // (R-65) advances it with the v2.65.0 block:
    // v2.63.0/v2.64.0/v2.65.0 (the v2.62.0 pin ages out) — the
    // F-247d same-commit recalibration, the structural leg's
    // nineteenth gate-enforced ride.""",
    1, "p243 mirror comment")
m = swap(m, '    expect(guardIt).toContain("v2\\\\.62\\\\.0");\n    expect(guardIt).toContain("v2\\\\.63\\\\.0");\n    expect(guardIt).toContain("v2\\\\.64\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.61\\\\.0");\n    expect(guardIt).toContain("1895 unit \\\\(119 files");',
            '    expect(guardIt).toContain("v2\\\\.63\\\\.0");\n    expect(guardIt).toContain("v2\\\\.64\\\\.0");\n    expect(guardIt).toContain("v2\\\\.65\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.62\\\\.0");\n    expect(guardIt).toContain("1911 unit \\\\(120 files");',
            1, "p243 mirror pins")
with open("tests/parity-243.test.ts", "w", encoding="utf-8") as f:
    f.write(m)

# -------------------------------------------- docs/remediation_plan_v2.md
with open("docs/remediation_plan_v2.md", encoding="utf-8") as f:
    pl = f.read()

# §5 row fill (the gate column placeholder).
pl = swap(pl, "the captures — the cleared-bound recovery, the switch hit-area face, the standing mobile drawer) | (filled at ship) |",
              "the captures — the cleared-bound recovery, the switch hit-area face, the standing mobile drawer) | lint 0/0 · tsc 0 · **1911 unit (120 files, +16)** · build · smoke 15/15 · **159 e2e (+2)** · census MATCH · the six parity drift gates CLEAN |",
              1, "plan §5 gate fill")

with open("docs/remediation_plan_v2.md", "w", encoding="utf-8") as f:
    f.write(pl)

print("docs-268 lockstep complete: counts 1895→1911 / 119→120 / 157→159 / badge 2052→2070,")
print("PAD v2.65.0 block + §7.1 rows, guard trio → v2.63/64/65 (+ the parity-243 mirror), README row → R-65, plan §5 filled")
