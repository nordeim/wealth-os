#!/usr/bin/env python3
"""Session-270 docs lockstep — the count ladder 1924→1932 / 121→122
files (fresh file) / 160→161 e2e / badge 2084→2093, the PAD's v2.67.0
revision block, the §7.1 family rows (arch pins 89→90 + parity-270 in
the list), the guard trio's advance (the parity-243 mirror), the README
remediation row's advance (R-67), and the arithmetic comment. Every
replacement is scoped and asserted (the F-242j lesson); historical
count mentions are untouched (the scope note at
tests/docs-counts.test.ts)."""

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

r = swap(r, "tests-2084%20checks", "tests-2093%20checks", 1, "README badge")
r = swap(r, "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1924 checks incl. property tests |",
            "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1932 checks incl. property tests |", 1, "README stack")
r = swap(r, "| E2E tests | Playwright + axe-core | 1.65.0 / 4.14.0 | 160 checks; chromium; seeded `db/e2e.db` |",
            "| E2E tests | Playwright + axe-core | 1.65.0 / 4.14.0 | 161 checks; chromium; seeded `db/e2e.db` |", 1, "README e2e stack")
r = swap(r, "# 121 unit suites + 📂 e2e/ 7 specs",
            "# 122 unit suites + 📂 e2e/ 7 specs", 1, "README hierarchy")
r = swap(r, "| Unit (Vitest) | `bun run test` | 1924 checks / 121 files |",
            "| Unit (Vitest) | `bun run test` | 1932 checks / 122 files |", 1, "README testing table")
r = swap(r, "| E2E (Playwright, chromium) | `CI=1 bun run test:e2e` | 160 checks / 7 specs",
            "| E2E (Playwright, chromium) | `CI=1 bun run test:e2e` | 161 checks / 7 specs", 1, "README e2e table")
r = swap(r, "| Verification layer | ✅ Complete | 1924 unit · 160 e2e · 15 smoke · full gate green |",
            "| Verification layer | ✅ Complete | 1932 unit · 161 e2e · 15 smoke · full gate green |", 1, "README verification row")

# The remediation-program status row advances to R-67 (the structural
# docs-counts leg derives the PAD's newest round and asserts this row
# cites it — the F-266a pattern).
row_start = r.index("| Remediation program | 🔀 Active |")
row_end = r.index("\n", row_start)
old_row = r[row_start:row_end]
if "R-67 shipped" not in old_row:
    if "R-66 shipped" not in old_row:
        sys.exit("[README row] the row is neither the R-66 form nor the applied R-67 form — re-read before replacing")
new_row = (
    "| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program "
    "(session 270: **R-67 shipped — the liveness-fabrication, stacked-escape, and comment-truth round**: the fresh-eyes audit "
    "(three Mode-C passes — the R-66 cure surfaces (the parity-269/parity-229/docs-counts batteries + the security-ledger pin "
    "re-run green) · the API/auth/security layer's twenty-third consecutive clean bill (all twelve house contracts, 45 handlers "
    "/ 30 route files; 7 candidates dismissed into documented postures) · the UI/a11y/shell layer — all eight standing contracts "
    "verified, three new findings after dedup, every material claim re-verified at file:line (the duplicated lockstep comment "
    "read directly; the liveness fabrication live-proven through the engine's own semantics; the stacked-order interleaving "
    "decoded through both guards' verbatim logic)): 0 Critical / 0 High / 0 Medium / 3 Low / 2 Informational NEW after dedup. "
    "THE ROUND'S THREE LOWS: **F-270a the R-66 lockstep double-appended its own comment block** (the docs-counts comment ladder "
    "carried the Session-269 trio-advance comment twice — collapsed to one copy with the no-doubled-ladder pin) · **F-270b the "
    "env example's hash-marked prose fabricated live tokens** (the parity-229 splitter stripped only the slash-forms, so the "
    "env example's prose landed on the code side and self-satisfied the net AND fabricated repo-wide liveness through the "
    "invariant's early-continue; the hash-dialect arm routes the env-dialect files' hash-marked lines to the comments side, the "
    "ignore list joins the walk, the residue trues to the lockfile and the license, and the maiden run caught its second "
    "offender live) · **F-270c the F-266d comment's standing-gap parenthetical was half-stale** (the drawer's twin guard "
    "landed with F-269d; the comment trues and the stacked-order e2e leg lands — the filters card + drawer both open at 390, "
    "one press one surface). Plus F-270d/F-270e the two comment riders. The mobile-nav comparison verified on BOTH sides at "
    "TRUE 390×844; probe:ref STABLE on every layer) |"
)
r = r[:row_start] + new_row + r[row_end:]

with open("README.md", "w", encoding="utf-8") as f:
    f.write(r)

# ---------------------------------------------------------------- AGENTS.md
with open("AGENTS.md", encoding="utf-8") as f:
    a = f.read()

a = swap(a, "| Unit tests (1924) | `bun run test` |",
            "| Unit tests (1932) | `bun run test` |", 1, "AGENTS unit")
a = swap(a, "| E2E (boots own server, 160) | `CI=1 bun run test:e2e` |",
            "| E2E (boots own server, 161) | `CI=1 bun run test:e2e` |", 1, "AGENTS e2e")

with open("AGENTS.md", "w", encoding="utf-8") as f:
    f.write(a)

# ---------------------------------------------------------------- CLAUDE.md
with open("CLAUDE.md", encoding="utf-8") as f:
    c = f.read()

c = swap(c, "lint 0/0 · tsc 0 · 1924 unit · build ·\n  smoke 15/15 · 160 e2e.",
            "lint 0/0 · tsc 0 · 1932 unit · build ·\n  smoke 15/15 · 161 e2e.", 1, "CLAUDE gate contract")
c = swap(c, "| `bun run test` | Unit suite (Vitest, 1924 checks) |",
            "| `bun run test` | Unit suite (Vitest, 1932 checks) |", 1, "CLAUDE unit cmd")
c = swap(c, "| `CI=1 bun run test:e2e` | E2E suite (Playwright, 160 checks, own db + :3100) |",
            "| `CI=1 bun run test:e2e` | E2E suite (Playwright, 161 checks, own db + :3100) |", 1, "CLAUDE e2e cmd")
c = swap(c, "tests via fast-check. 1924 checks / 121 files.",
            "tests via fast-check. 1932 checks / 122 files.", 1, "CLAUDE pyramid")
c = swap(c, "160 checks / 7 specs. `playwright.config.ts` pins",
            "161 checks / 7 specs. `playwright.config.ts` pins", 1, "CLAUDE e2e pyramid")

with open("CLAUDE.md", "w", encoding="utf-8") as f:
    f.write(c)

# --------------------------------------------------------- wealth-os_SKILL.md
with open("wealth-os_SKILL.md", encoding="utf-8") as f:
    s = f.read()

s = swap(s, "layer (Vitest 1924 / Playwright 160 / smoke 15). Covers the design system,",
            "layer (Vitest 1932 / Playwright 161 / smoke 15). Covers the design system,", 1, "SKILL header")
s = swap(s, "| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 1924 checks / 121 files |",
            "| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 1932 checks / 122 files |", 1, "SKILL stack unit")
s = swap(s, "| E2E tests | `@playwright/test` + `axe-core` | 1.65.0 / 4.14.0 | Chromium; 160 checks / 7 specs; own db + port 3100 |",
            "| E2E tests | `@playwright/test` + `axe-core` | 1.65.0 / 4.14.0 | Chromium; 161 checks / 7 specs; own db + port 3100 |", 1, "SKILL stack e2e")
s = swap(s, "| Unit tests | `bun run test` (1924 checks) |",
            "| Unit tests | `bun run test` (1932 checks) |", 1, "SKILL cmd unit")
s = swap(s, "| E2E (boots own server) | `CI=1 bun run test:e2e` (160 checks) |",
            "| E2E (boots own server) | `CI=1 bun run test:e2e` (161 checks) |", 1, "SKILL cmd e2e")
s = swap(s, "- [ ] `bun run test` — 1924 passed / 121 files",
            "- [ ] `bun run test` — 1932 passed / 122 files", 1, "SKILL checklist unit")
s = swap(s, "- [ ] `CI=1 bun run test:e2e` — 160/160 (7 specs)",
            "- [ ] `CI=1 bun run test:e2e` — 161/161 (7 specs)", 1, "SKILL checklist e2e")

with open("wealth-os_SKILL.md", "w", encoding="utf-8") as f:
    f.write(s)

# ------------------------------------------- Project_Architecture_Document.md
with open("Project_Architecture_Document.md", encoding="utf-8") as f:
    p = f.read()

p = swap(p, "| Unit | 121 | 1924 |", "| Unit | 122 | 1932 |", 1, "PAD §7.1 unit row")
p = swap(p, "| E2E | 7 | 160 |", "| E2E | 7 | 161 |", 1, "PAD §7.1 e2e row")
p = swap(p, "| — architecture pins | 89 | (", "| — architecture pins | 90 | (", 1, "PAD §7.1 arch count")
p = swap(p, " parity-269, db-transient) |", " parity-269, parity-270, db-transient) |", 1, "PAD §7.1 arch list")
p = swap(p, "→ vitest (1924) →", "→ vitest (1932) →", 1, "PAD ADR-006 vitest")
p = swap(p, "Playwright e2e (160) against a pinned", "Playwright e2e (161) against a pinned", 1, "PAD ADR-006 e2e")
p = swap(p, "# 121 unit suites (incl. architecture pins)", "# 122 unit suites (incl. architecture pins)", 1, "PAD hierarchy")
p = swap(p, "`bun run test` → 1924/1924", "`bun run test` → 1932/1932", 1, "PAD §7.4 unit")
p = swap(p, "`CI=1 bun run test:e2e` → 160/160", "`CI=1 bun run test:e2e` → 161/161", 1, "PAD §7.4 e2e")
p = swap(p, "1924 unit / 160 e2e", "1932 unit / 161 e2e", 1, "PAD §9 row")
p = swap(p, "lint 0/0 · tsc 0 · 1924 unit · build · smoke 15/15 ·\n160 e2e",
            "lint 0/0 · tsc 0 · 1932 unit · build · smoke 15/15 ·\n161 e2e", 1, "PAD §10 closing")

# The v2.67.0 revision block lands above v2.66.0's (idempotency-guarded
# — the F-242j lesson's insert form).
SR_ANCHOR = "- [SR] v2.66.0 (session 269, R-66 — the unpadded-year, net-universe,"
if p.count(SR_ANCHOR) != 1:
    sys.exit("[PAD SR] the v2.66.0 SR anchor not found in the expected form")
if p.count("- [SR] v2.67.0 (session 270, R-67") == 0:
    SR_BLOCK = """- [SR] v2.67.0 (session 270, R-67 — the liveness-fabrication,
  stacked-escape, and comment-truth round): the fresh-eyes audit
  (three Mode-C passes — the R-66 cure surfaces driven by the session
  (the parity-269 battery re-run green 12/12, the parity-229 battery
  21/21, the docs-counts battery 18/18, and the security-ledger pin
  green at HEAD; every F-269 surface re-verified at file:line), the
  API/auth/security layer (the TWENTY-THIRD consecutive clean bill —
  all twelve house contracts, 45 handlers / 30 route files read
  line-by-line, the census exact, 7 candidates dismissed into
  documented postures), and the UI/a11y/shell layer (all eight
  standing contracts verified, the pinned battery green, three new
  findings after dedup)) — 0 Critical / 0 High / 0 Medium / 3 Low /
  2 Informational NEW after dedup, every material claim re-verified
  at file:line by the driving session (the duplicated lockstep
  comment read directly; the liveness fabrication live-proven through
  the engine's own semantics — the offending prose token grepped
  absent from every walked code site while passing the whole-tree
  invariant by self-satisfaction; the stacked-order interleaving
  decoded through both guards' verbatim logic). THE ENV EXAMPLE'S
  PROSE FABRICATES LIVE TOKENS (F-270b, Low — the round's flagship:
  the parity-229 splitter strips only the slash-forms, so the env
  example's hash-marked prose lines landed on the CODE side — the
  file self-satisfied the net AND fabricated repo-wide liveness
  through the invariant's early-continue; the hash-dialect arm routes
  the env-dialect files' hash-marked lines to the comments side, the
  ignore list joins the walk, the residue trues to the lockfile and
  the license alone, and the maiden run caught its second offender
  live — the reworded prose carrier). THE DUPLICATED LOCKSTEP COMMENT
  (F-270a, Low — the R-66 lockstep's plain-form insert double
  appended the Session-269 trio-advance block; collapsed to one copy
  with the no-doubled-ladder pin). THE HALF-STALE STANDING-GAP
  COMMENT AND THE UNPINNED STACKED-ORDER INTERLEAVING (F-270c, Low —
  the F-266d parenthetical predates the F-269d twin guard; the
  comment trues and the stacked-order e2e leg lands: the filters card
  open, the drawer opened over it at 390, the first Escape closes
  the drawer only, the second closes the card). Plus the two comment
  riders (F-270d the inert single-child history row · F-270e the
  drawer focus cycle's skip-link exclusion registration). Registered:
  the standing registers unchanged (F-269i/F-269j, F-268h/i/j,
  F-267h/i, F-265f, F-264g/h/i, F-257a/r). The verification: lint 0/0
  · tsc 0 · 1932 unit (122 files, +8) · build · smoke 15/15 · 161
  e2e (+1 — the stacked-order interleaving at 390: the filters card
  open, the drawer opened over it, the first Escape closes the drawer
  only, the second closes the card; zero new signups/logins, the
  shared storageState rides) · census MATCH · the six parity drift
  gates CLEAN (the expenses page and the drawer shell changed —
  comment-only by construction, the closed-state DOM unchanged, and
  the chain is the proof) · the captures (the stacked-order faces at
  390).
"""
    p = p.replace(SR_ANCHOR, SR_BLOCK + SR_ANCHOR, 1)

with open("Project_Architecture_Document.md", "w", encoding="utf-8") as f:
    f.write(p)

# ---------------------------------------------------- tests/docs-counts.test.ts
with open("tests/docs-counts.test.ts", encoding="utf-8") as f:
    d = f.read()

d = swap(d, "const UNIT_TOTAL = 1924;", "const UNIT_TOTAL = 1932;", 1, "docs-counts unit const")
d = swap(d, "const E2E_TOTAL = 160;", "const E2E_TOTAL = 161;", 1, "docs-counts e2e const")
d = swap(d, "const TEST_FILES = 121;", "const TEST_FILES = 122;", 1, "docs-counts files const")
d = swap(d, '"| — architecture pins | 89 | (', '"| — architecture pins | 90 | (', 1, "docs-counts arch pin count")
d = swap(d, " parity-269, db-transient) |\",", " parity-269, parity-270, db-transient) |\",", 1, "docs-counts arch pin list")
d = swap(d, """    // 27 = 99. Session-269 (R-66): parity-269 joins the family and
    // the file count takes the suite to 121 — 4 + 89 + 28 = 121.""",
            """    // 27 = 99. Session-269 (R-66): parity-269 joins the family and
    // the file count takes the suite to 121 — 4 + 89 + 28 = 121.
    // Session-270 (R-67): parity-270 joins the family and the file
    // count takes the suite to 122 — 4 + 90 + 28 = 122.""", 1, "docs-counts arithmetic comment")
d = swap(d, """    // Session-269 (R-66): the TWENTIETH gate-enforced ride — the
    // v2.66.0 block lands together with the trio's advance to
    // v2.64.0/v2.65.0/v2.66.0 (the v2.63.0 pin ages out).""",
            """    // Session-269 (R-66): the TWENTIETH gate-enforced ride — the
    // v2.66.0 block lands together with the trio's advance to
    // v2.64.0/v2.65.0/v2.66.0 (the v2.63.0 pin ages out).
    // Session-270 (R-67): the TWENTY-FIRST gate-enforced ride — the
    // v2.67.0 block lands together with the trio's advance to
    // v2.65.0/v2.66.0/v2.67.0 (the v2.64.0 pin ages out).""", 1, "docs-counts ladder comment")
d = swap(d, """    expect(p).toMatch(/\\[SR\\] v2\\.66\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1924 unit \\(121 files, \\+13\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.65\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1911 unit \\(120 files, \\+16\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.64\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1895 unit \\(119 files, \\+18\\)/);""",
            """    expect(p).toMatch(/\\[SR\\] v2\\.67\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1932 unit \\(122 files, \\+8\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.66\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1924 unit \\(121 files, \\+13\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.65\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1911 unit \\(120 files, \\+16\\)/);""", 1, "docs-counts trio")

with open("tests/docs-counts.test.ts", "w", encoding="utf-8") as f:
    f.write(d)

# ------------------------------------------------------ tests/parity-243.test.ts
with open("tests/parity-243.test.ts", encoding="utf-8") as f:
    t = f.read()

t = swap(t, """    // pin ages out) — the F-247d same-commit recalibration, the
    // structural leg's twentieth gate-enforced ride.""",
            """    // pin ages out) — the F-247d same-commit recalibration, the
    // structural leg's twentieth gate-enforced ride. Session-270
    // (R-67) advances it with the v2.67.0 block:
    // v2.65.0/v2.66.0/v2.67.0 (the v2.64.0 pin ages out) — the
    // F-247d same-commit recalibration, the structural leg's
    // twenty-first gate-enforced ride.""", 1, "parity-243 ladder comment")
t = swap(t, '    expect(guardIt).toContain("v2\\\\.64\\\\.0");\n    expect(guardIt).toContain("v2\\\\.65\\\\.0");\n    expect(guardIt).toContain("v2\\\\.66\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.63\\\\.0");',
            '    expect(guardIt).toContain("v2\\\\.65\\\\.0");\n    expect(guardIt).toContain("v2\\\\.66\\\\.0");\n    expect(guardIt).toContain("v2\\\\.67\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.64\\\\.0");', 1, "parity-243 guard trio")
t = swap(t, 'expect(guardIt).toContain("1924 unit \\\\(121 files"',
            'expect(guardIt).toContain("1932 unit \\\\(122 files"', 1, "parity-243 unit form")

with open("tests/parity-243.test.ts", "w", encoding="utf-8") as f:
    f.write(t)

print("[docs-270] lockstep applied: README/AGENTS/CLAUDE/SKILL/PAD counts, the SR block,")
print("[docs-270] the docs-counts constants + trio + ladder, the parity-243 mirror")
