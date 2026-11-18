#!/usr/bin/env python3
"""Session-271 docs lockstep — the count ladder 1932→1949 / 122→123
files (fresh file) / badge 2093→2110 (e2e stays 161, smoke stays 15),
the PAD's v2.68.0 revision block, the §7.1 family rows (arch pins
90→91 + parity-271 in the list), the guard trio's advance (the
parity-243 mirror), the README remediation row's advance (R-68), and
the arithmetic comment. Every replacement is scoped and asserted (the
F-242j lesson); historical count mentions are untouched (the scope
note at tests/docs-counts.test.ts)."""

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

r = swap(r, "tests-2093%20checks", "tests-2110%20checks", 1, "README badge")
r = swap(r, "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1932 checks incl. property tests |",
            "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1949 checks incl. property tests |", 1, "README stack")
r = swap(r, "# 122 unit suites + 📂 e2e/ 7 specs",
            "# 123 unit suites + 📂 e2e/ 7 specs", 1, "README hierarchy")
r = swap(r, "| Unit (Vitest) | `bun run test` | 1932 checks / 122 files |",
            "| Unit (Vitest) | `bun run test` | 1949 checks / 123 files |", 1, "README testing table")
r = swap(r, "| Verification layer | ✅ Complete | 1932 unit · 161 e2e · 15 smoke · full gate green |",
            "| Verification layer | ✅ Complete | 1949 unit · 161 e2e · 15 smoke · full gate green |", 1, "README verification row")

# The remediation-program status row advances to R-68 (the structural
# docs-counts leg derives the PAD's newest round and asserts this row
# cites it — the F-266a pattern).
row_start = r.index("| Remediation program | 🔀 Active |")
row_end = r.index("\n", row_start)
old_row = r[row_start:row_end]
if "R-68 shipped" not in old_row:
    if "R-67 shipped" not in old_row:
        sys.exit("[README row] the row is neither the R-67 form nor the applied R-68 form — re-read before replacing")
new_row = (
    "| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program "
    "(session 271: **R-68 shipped — the doc-truth, pin-depth, and register-note round**: the fresh-eyes audit (three Mode-C "
    "passes — the R-67 cure surfaces (all five HOLDING: the collapsed ladder, the hash-dialect arm with its edge cases each "
    "checked, the trued comment, the behavioral e2e leg, both riders) · the API/auth/security layer's twenty-fourth "
    "consecutive clean bill (all twelve house contracts, 45 handlers / 30 route files; 3 candidates dismissed into "
    "documented postures) · the UI/a11y/shell layer — all eight standing contracts verified, the genuine rot found in the "
    "distilled docs): 0 Critical / 0 High / 2 Medium / 7 Low / 9 Informational NEW after dedup, every material claim "
    "re-verified at file:line (the a11y battery counted live through the playwright list census; the phantom UI inventory "
    "counted against the actual directory; the Radix label claim grepped against package.json). THE ROUND'S TWO MEDIUMS: "
    "**F-271c the skill doc's a11y battery claim wrong on count and viewport** (10 checks at 1440×900 claimed vs 46 tests "
    "at 1280×800 + 390×844 actual — 1440 belongs to the parity sweeps) · **F-271d the skill doc's UI inventory names a "
    "primitive and five files that do not exist** (the Radix label package, a 13-tsx ui row with five phantom files, a "
    "23-tsx heading vs the real 18, and the §8 Label-primitive claim vs plain label htmlFor). Plus the pin-depth pair "
    "(F-271a the stacked-order pointer pin title-deep — the depth leg anchors on the behavioral body, mutation-verified · "
    "F-271b the dialect probe's vacuity companion), the README feature-truth trio (the three-step wizard vs the two-step "
    "UI · the env-wired LLM provider claim vs the unwired seam · the goals contribution claim vs the editable saved-amount "
    "path), the skill doc's mechanism truth (the focus-ring base-layer claim vs the per-component utilities · the "
    "mobile-battery count and touch-target posture), and three riders (the 409 citation, the link variant's register "
    "note, the stale contrast figures — including a third red-700 carrier the battery's whole-file pin caught live). "
    "Zero application behavior changed: 1949 unit (+17) · 161 e2e (the standing battery, zero new legs) · smoke 15/15 · "
    "census MATCH; the mobile-nav comparison verified on BOTH sides at TRUE 390×844; probe:ref STABLE on every layer) |"
)
r = r[:row_start] + new_row + r[row_end:]

with open("README.md", "w", encoding="utf-8") as f:
    f.write(r)

# ---------------------------------------------------------------- AGENTS.md
with open("AGENTS.md", encoding="utf-8") as f:
    a = f.read()

a = swap(a, "| Unit tests (1932) | `bun run test` |",
            "| Unit tests (1949) | `bun run test` |", 1, "AGENTS unit")

with open("AGENTS.md", "w", encoding="utf-8") as f:
    f.write(a)

# ---------------------------------------------------------------- CLAUDE.md
with open("CLAUDE.md", encoding="utf-8") as f:
    c = f.read()

c = swap(c, "lint 0/0 · tsc 0 · 1932 unit · build ·",
            "lint 0/0 · tsc 0 · 1949 unit · build ·", 1, "CLAUDE gate contract")
c = swap(c, "| `bun run test` | Unit suite (Vitest, 1932 checks) |",
            "| `bun run test` | Unit suite (Vitest, 1949 checks) |", 1, "CLAUDE unit cmd")
c = swap(c, "tests via fast-check. 1932 checks / 122 files.",
            "tests via fast-check. 1949 checks / 123 files.", 1, "CLAUDE pyramid")

with open("CLAUDE.md", "w", encoding="utf-8") as f:
    f.write(c)

# --------------------------------------------------------- wealth-os_SKILL.md
with open("wealth-os_SKILL.md", encoding="utf-8") as f:
    s = f.read()

s = swap(s, "layer (Vitest 1932 / Playwright 161 / smoke 15). Covers the design system,",
            "layer (Vitest 1949 / Playwright 161 / smoke 15). Covers the design system,", 1, "SKILL header")
s = swap(s, "| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 1932 checks / 122 files |",
            "| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 1949 checks / 123 files |", 1, "SKILL stack unit")
s = swap(s, "| Unit tests | `bun run test` (1932 checks) |",
            "| Unit tests | `bun run test` (1949 checks) |", 1, "SKILL cmd unit")
s = swap(s, "- [ ] `bun run test` — 1932 passed / 122 files",
            "- [ ] `bun run test` — 1949 passed / 123 files", 1, "SKILL checklist unit")

with open("wealth-os_SKILL.md", "w", encoding="utf-8") as f:
    f.write(s)

# ------------------------------------------- Project_Architecture_Document.md
with open("Project_Architecture_Document.md", encoding="utf-8") as f:
    p = f.read()

p = swap(p, "| Unit | 122 | 1932 |", "| Unit | 123 | 1949 |", 1, "PAD §7.1 unit row")
p = swap(p, "| — architecture pins | 90 | (", "| — architecture pins | 91 | (", 1, "PAD §7.1 arch count")
p = swap(p, " parity-270, db-transient) |", " parity-270, parity-271, db-transient) |", 1, "PAD §7.1 arch list")
p = swap(p, "→ vitest (1932) →", "→ vitest (1949) →", 1, "PAD ADR-006 vitest")
p = swap(p, "# 122 unit suites (incl. architecture pins)", "# 123 unit suites (incl. architecture pins)", 1, "PAD hierarchy")
p = swap(p, "`bun run test` → 1932/1932", "`bun run test` → 1949/1949", 1, "PAD §7.4 unit")
p = swap(p, "1932 unit / 161 e2e", "1949 unit / 161 e2e", 1, "PAD §9 row")
p = swap(p, "lint 0/0 · tsc 0 · 1932 unit · build · smoke 15/15 ·",
            "lint 0/0 · tsc 0 · 1949 unit · build · smoke 15/15 ·", 1, "PAD §10 closing")

# The v2.68.0 revision block lands above v2.67.0's (idempotency-guarded
# — the F-242j lesson's insert form).
SR_ANCHOR = "- [SR] v2.67.0 (session 270, R-67 — the liveness-fabrication,"
if p.count(SR_ANCHOR) != 1:
    sys.exit("[PAD SR] the v2.67.0 SR anchor not found in the expected form")
if p.count("- [SR] v2.68.0 (session 271, R-68") == 0:
    SR_BLOCK = """- [SR] v2.68.0 (session 271, R-68 — the doc-truth, pin-depth,
  and register-note round): the fresh-eyes audit (three Mode-C
  passes — the R-67 cure surfaces driven by the session (all five
  HOLDING at file:line: the collapsed comment ladder with its
  airtight counts, the hash-dialect arm with each edge case checked,
  the trued F-266d comment, the behavioral stacked-order e2e leg,
  both rider comments), the API/auth/security layer (the TWENTY-
  FOURTH consecutive clean bill — all twelve house contracts, 45
  handlers / 30 route files read line-by-line, the census exact, 3
  candidates dismissed into documented postures), and the
  UI/a11y/shell layer (all eight standing contracts verified, the
  pinned battery green, the genuine rot found in the distilled
  docs)) — 0 Critical / 0 High / 2 Medium / 7 Low / 9 Informational
  NEW after dedup, every material claim re-verified at file:line by
  the driving session (the a11y battery counted live through the
  playwright list census — 46 tests at 1280×800, not 10 at 1440×900;
  the phantom UI inventory counted against the actual directory — 18
  tsx, not 23, with five phantom ui files named; the Radix label
  claim grepped against package.json — no react-label dependency
  exists). THE SKILL DOC'S A11Y BATTERY CLAIM WRONG ON COUNT AND
  VIEWPORT (F-271c, Medium — the §8 opener claimed 10 checks at the
  1440×900 viewport, the sweeps' axis, not the battery's; trued to
  the real shape: 46 tests, 45 axe legs across light + dark at
  desktop and phone, at 1280×800 and 390×844). THE SKILL DOC'S UI
  INVENTORY NAMES A PRIMITIVE AND FIVE FILES THAT DO NOT EXIST
  (F-271d, Medium — the stack table's label package claim, the
  13-tsx ui row naming card/icons/input/label/table against the real
  eight, the 23-tsx heading against the real 18, and the §8
  Label-primitive claim against the plain label htmlFor association
  the tree actually holds — the vendored label stock retired at
  F-232a; an agent implementing a form per the skill doc would
  import a component that is not there). Plus the pin-depth pair
  (F-271a the stacked-order pointer pin title-deep — the parity-271
  depth leg anchors on the leg's behavioral body, mutation-verified:
  a hollowed body REDs the depth leg while the title pin stays
  green · F-271b the dialect probe's vacuity companion — a reworded
  probe line REDs the battery instead of passing vacuously), the
  README feature-truth trio (F-271e the three-step wizard claim on
  three carriers against the two-step UI · F-271f the env-wired LLM
  provider claim against the unwired seam · F-271g the contribution
  round-trips claim against the editable saved-amount path), the
  skill doc's mechanism truth (F-271h the focus-ring base-layer
  claim against the per-component utilities · F-271i the
  mobile-battery count 10-vs-19 and the touch-target posture — the
  24px floor with the padding extensions, nav rows 44px-class), and
  three riders (F-271j the forgot-password rationale's 409 citation
  trued to the real 400 · F-271k the vendored link variant's
  contrast register note, the F-227f register's link edition ·
  F-271l the stale contrast figures — the computed 4.40:1, the
  600-light/400-dark delta pair, and a third red-700 carrier the
  battery's whole-file pin caught live). Registered: F-271m through
  F-271r (the ladder-scope boundary, the isClassShaped case
  sensitivity, the audit-brief text refreshes, the cancel
  snapshot's dead-by-type fields, the in-band OTP posture). ZERO
  application behavior changed. The verification: lint 0/0 · tsc 0 ·
  1949 unit (123 files, +17) · build · smoke 15/15 · 161 e2e (the
  standing battery, zero new legs — the proof the doc round changed
  no behavior; the +17 is the parity-271 battery) · census MATCH ·
  the captures (the standing evidence faces: the dashboard at
  1280×800, the expenses filters card and the mobile drawer at
  390×844).
"""
    p = p.replace(SR_ANCHOR, SR_BLOCK + SR_ANCHOR, 1)

with open("Project_Architecture_Document.md", "w", encoding="utf-8") as f:
    f.write(p)

# ---------------------------------------------------- tests/docs-counts.test.ts
with open("tests/docs-counts.test.ts", encoding="utf-8") as f:
    d = f.read()

d = swap(d, "const UNIT_TOTAL = 1932;", "const UNIT_TOTAL = 1949;", 1, "docs-counts unit const")
d = swap(d, "const TEST_FILES = 122;", "const TEST_FILES = 123;", 1, "docs-counts files const")
d = swap(d, '"| — architecture pins | 90 | (', '"| — architecture pins | 91 | (', 1, "docs-counts arch pin count")
d = swap(d, " parity-270, db-transient) |\",", " parity-270, parity-271, db-transient) |\",", 1, "docs-counts arch pin list")
d = swap(d, """    // Session-270 (R-67): parity-270 joins the family and the file
    // count takes the suite to 122 — 4 + 90 + 28 = 122.""",
            """    // Session-270 (R-67): parity-270 joins the family and the file
    // count takes the suite to 122 — 4 + 90 + 28 = 122.
    // Session-271 (R-68): parity-271 joins the family and the file
    // count takes the suite to 123 — 4 + 91 + 28 = 123.""", 1, "docs-counts arithmetic comment")
d = swap(d, """    // Session-270 (R-67): the TWENTY-FIRST gate-enforced ride — the
    // v2.67.0 block lands together with the trio's advance to
    // v2.65.0/v2.66.0/v2.67.0 (the v2.64.0 pin ages out).""",
            """    // Session-270 (R-67): the TWENTY-FIRST gate-enforced ride — the
    // v2.67.0 block lands together with the trio's advance to
    // v2.65.0/v2.66.0/v2.67.0 (the v2.64.0 pin ages out).
    // Session-271 (R-68): the TWENTY-SECOND gate-enforced ride — the
    // v2.68.0 block lands together with the trio's advance to
    // v2.66.0/v2.67.0/v2.68.0 (the v2.65.0 pin ages out).""", 1, "docs-counts ladder comment")
d = swap(d, """    expect(p).toMatch(/\\[SR\\] v2\\.67\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1932 unit \\(122 files, \\+8\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.66\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1924 unit \\(121 files, \\+13\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.65\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1911 unit \\(120 files, \\+16\\)/);""",
            """    expect(p).toMatch(/\\[SR\\] v2\\.68\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1949 unit \\(123 files, \\+17\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.67\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1932 unit \\(122 files, \\+8\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.66\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1924 unit \\(121 files, \\+13\\)/);""", 1, "docs-counts trio")

with open("tests/docs-counts.test.ts", "w", encoding="utf-8") as f:
    f.write(d)

# ------------------------------------------------------ tests/parity-243.test.ts
with open("tests/parity-243.test.ts", encoding="utf-8") as f:
    t = f.read()

t = swap(t, """    // structural leg's twentieth gate-enforced ride. Session-270
    // (R-67) advances it with the v2.67.0 block:
    // v2.65.0/v2.66.0/v2.67.0 (the v2.64.0 pin ages out) — the
    // F-247d same-commit recalibration, the structural leg's
    // twenty-first gate-enforced ride.""",
            """    // structural leg's twentieth gate-enforced ride. Session-270
    // (R-67) advances it with the v2.67.0 block:
    // v2.65.0/v2.66.0/v2.67.0 (the v2.64.0 pin ages out) — the
    // F-247d same-commit recalibration, the structural leg's
    // twenty-first gate-enforced ride. Session-271 (R-68) advances
    // it with the v2.68.0 block: v2.66.0/v2.67.0/v2.68.0 (the
    // v2.65.0 pin ages out) — the F-247d same-commit recalibration,
    // the structural leg's twenty-second gate-enforced ride.""", 1, "parity-243 ladder comment")
t = swap(t, '    expect(guardIt).toContain("v2\\\\.65\\\\.0");\n    expect(guardIt).toContain("v2\\\\.66\\\\.0");\n    expect(guardIt).toContain("v2\\\\.67\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.64\\\\.0");',
            '    expect(guardIt).toContain("v2\\\\.66\\\\.0");\n    expect(guardIt).toContain("v2\\\\.67\\\\.0");\n    expect(guardIt).toContain("v2\\\\.68\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.65\\\\.0");', 1, "parity-243 guard trio")
t = swap(t, 'expect(guardIt).toContain("1932 unit \\\\(122 files"',
            'expect(guardIt).toContain("1949 unit \\\\(123 files"', 1, "parity-243 unit form")

with open("tests/parity-243.test.ts", "w", encoding="utf-8") as f:
    f.write(t)

print("[docs-271] lockstep applied: README/AGENTS/CLAUDE/SKILL/PAD counts, the v2.68.0 SR block,")
print("[docs-271] the §7.1 rows, the trio advance (docs-counts + parity-243), the README row to R-68")
