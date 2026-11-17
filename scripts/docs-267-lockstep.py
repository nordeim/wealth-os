#!/usr/bin/env python3
"""Session-267 docs lockstep — the count ladder 1877→1895 / 118→119
(fresh file) / 155→157 e2e / badge 2032→2052, the PAD's v2.64.0
revision block, the §7.1 family rows, the guard trio's advance (+
the parity-243 mirror), the README remediation row's advance (R-64),
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

r = swap(r, "tests-2032%20checks", "tests-2052%20checks", 1, "README badge")
r = swap(r, "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1877 checks incl. property tests |",
            "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1895 checks incl. property tests |", 1, "README stack")
r = swap(r, "| E2E tests | Playwright + axe-core | 1.65.0 / 4.14.0 | 155 checks; chromium; seeded `db/e2e.db` |",
            "| E2E tests | Playwright + axe-core | 1.65.0 / 4.14.0 | 157 checks; chromium; seeded `db/e2e.db` |", 1, "README e2e stack")
r = swap(r, "# 118 unit suites + 📂 e2e/ 7 specs",
            "# 119 unit suites + 📂 e2e/ 7 specs", 1, "README hierarchy")
r = swap(r, "| Unit (Vitest) | `bun run test` | 1877 checks / 118 files |",
            "| Unit (Vitest) | `bun run test` | 1895 checks / 119 files |", 1, "README testing table")
r = swap(r, "| E2E (Playwright, chromium) | `CI=1 bun run test:e2e` | 155 checks / 7 specs",
            "| E2E (Playwright, chromium) | `CI=1 bun run test:e2e` | 157 checks / 7 specs", 1, "README e2e table")
r = swap(r, "| Verification layer | ✅ Complete | 1877 unit · 155 e2e · 15 smoke · full gate green |",
            "| Verification layer | ✅ Complete | 1895 unit · 157 e2e · 15 smoke · full gate green |", 1, "README verification row")

# The remediation-program status row advances to R-64 (the structural
# docs-counts leg derives the PAD's newest round and asserts this row
# cites it — the F-266a pattern).
row_start = r.index("| Remediation program | 🔀 Active |")
row_end = r.index("\n", row_start)
old_row = r[row_start:row_end]
if "R-64 shipped" not in old_row:
    if "R-63 shipped" not in old_row:
        sys.exit("[README row] the row is neither the R-63 form nor the applied R-64 form — re-read before replacing")
new_row = (
    "| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program "
    "(session 267: **R-64 shipped — the savings-tab, sort-count, and calendar-roundtrip round**: the fresh-eyes audit "
    "(three Mode-C passes — the R-63 cure surfaces (the parity-266 battery re-run green 16/16 at HEAD) · the "
    "API/auth/security layer's twentieth consecutive clean bill (all twelve house contracts, 45 handlers / 30 route "
    "files; every candidate dismissed into a documented posture) · the UI/a11y/shell layer — all eight standing "
    "contracts verified, five new findings after dedup, every material claim re-verified at file:line (the "
    "savings-bucket emptiness census-verified, the calendar-overflow invention runtime-proven, the reference's "
    "one-genus dialog live-measured)): 0 Critical / 0 High / 1 Medium / 4 Low / 4 Informational NEW after dedup. "
    "THE ROUND'S MEDIUM LIVES INSIDE F-266c'S OWN CHARTER: **F-267a the no-matches discriminator misses the budget "
    "tab** — the corpus's savings bucket is empty, so the Savings tab alone rendered the onboarding face for a "
    "72-expense ledger, and the Clear Filters action did not reset the tab (the cure: a dedicated over-constraint "
    "predicate counting the tab, with the sort pair excluded — **F-267b** — and the Clear lifting every constraint "
    "the page owns). Plus: **F-267c** the seam's custom-bound guard admitted calendar-invalid forms (toDate's "
    "normalizing constructor invented Mar 3 for a Feb-31 bound — the cure: the calendar round-trip, the csv.ts "
    "stageWrittenLiteral doctrine) · **F-267d** the four dialogs' Date inputs joined the FORM_INPUT genus · "
    "**F-267e** the split derivation memoized · F-267f the bound-field docs' twin clause · F-267g the Escape "
    "guard's invariant comment. The mobile-nav comparison verified on BOTH sides at TRUE 390×844; probe:ref "
    "STABLE on every layer) |"
)
if "R-64 shipped" not in old_row:
    r = r[:row_start] + new_row + r[row_end:]

with open("README.md", "w", encoding="utf-8") as f:
    f.write(r)

# --------------------------------------------------------------- AGENTS.md
with open("AGENTS.md", encoding="utf-8") as f:
    a = f.read()
a = swap(a, "| Unit tests (1877) | `bun run test` |", "| Unit tests (1895) | `bun run test` |", 1, "AGENTS unit")
a = swap(a, "| E2E (boots own server, 155) | `CI=1 bun run test:e2e` |",
            "| E2E (boots own server, 157) | `CI=1 bun run test:e2e` |", 1, "AGENTS e2e")
with open("AGENTS.md", "w", encoding="utf-8") as f:
    f.write(a)

# --------------------------------------------------------------- CLAUDE.md
with open("CLAUDE.md", encoding="utf-8") as f:
    c = f.read()
c = swap(c, "lint 0/0 · tsc 0 · 1877 unit · build ·", "lint 0/0 · tsc 0 · 1895 unit · build ·", 1, "CLAUDE gate")
c = swap(c, "smoke 15/15 · 155 e2e.", "smoke 15/15 · 157 e2e.", 1, "CLAUDE gate2")
c = swap(c, "| `bun run test` | Unit suite (Vitest, 1877 checks) |",
            "| `bun run test` | Unit suite (Vitest, 1895 checks) |", 1, "CLAUDE unit")
c = swap(c, "| `CI=1 bun run test:e2e` | E2E suite (Playwright, 155 checks, own db + :3100) |",
            "| `CI=1 bun run test:e2e` | E2E suite (Playwright, 157 checks, own db + :3100) |", 1, "CLAUDE e2e")
c = swap(c, "tests via fast-check. 1877 checks / 118 files.", "tests via fast-check. 1895 checks / 119 files.", 1, "CLAUDE counts")
c = swap(c, "155 checks / 7 specs. `playwright.config.ts` pins", "157 checks / 7 specs. `playwright.config.ts` pins", 1, "CLAUDE e2e counts")
with open("CLAUDE.md", "w", encoding="utf-8") as f:
    f.write(c)

# ------------------------------------------------------- wealth-os_SKILL.md
with open("wealth-os_SKILL.md", encoding="utf-8") as f:
    s = f.read()
s = swap(s, "layer (Vitest 1877 / Playwright 155 / smoke 15).", "layer (Vitest 1895 / Playwright 157 / smoke 15).", 1, "SKILL head")
s = swap(s, "Node env, jsdom-free; 1877 checks / 118 files |", "Node env, jsdom-free; 1895 checks / 119 files |", 1, "SKILL stack")
s = swap(s, "Chromium; 155 checks / 7 specs; own db + port 3100 |", "Chromium; 157 checks / 7 specs; own db + port 3100 |", 1, "SKILL e2e")
s = swap(s, "| Unit tests | `bun run test` (1877 checks) |", "| Unit tests | `bun run test` (1895 checks) |", 1, "SKILL cmd")
s = swap(s, "| E2E (boots own server) | `CI=1 bun run test:e2e` (155 checks) |",
            "| E2E (boots own server) | `CI=1 bun run test:e2e` (157 checks) |", 1, "SKILL e2e cmd")
s = swap(s, "- [ ] `bun run test` — 1877 passed / 118 files", "- [ ] `bun run test` — 1895 passed / 119 files", 1, "SKILL checklist")
s = swap(s, "- [ ] `CI=1 bun run test:e2e` — 155/155 (7 specs)", "- [ ] `CI=1 bun run test:e2e` — 157/157 (7 specs)", 1, "SKILL e2e checklist")
with open("wealth-os_SKILL.md", "w", encoding="utf-8") as f:
    f.write(s)

# ------------------------------------------- Project_Architecture_Document
with open("Project_Architecture_Document.md", encoding="utf-8") as f:
    p = f.read()

p = swap(p, "→ vitest (1877) → `next build` →", "→ vitest (1895) → `next build` →", 1, "PAD pipeline")
p = swap(p, "├── tests/                       # 118 unit suites (incl. architecture pins) + e2e/ 7 specs",
            "├── tests/                       # 119 unit suites (incl. architecture pins) + e2e/ 7 specs", 1, "PAD hierarchy")
p = swap(p, "| Unit | 118 | 1877 | `tests/*.test.ts` | Vitest 5 + fast-check |",
            "| Unit | 119 | 1895 | `tests/*.test.ts` | Vitest 5 + fast-check |", 1, "PAD 7.1 unit row")
p = swap(p, "| — architecture pins | 86 |", "| — architecture pins | 87 |", 1, "PAD 7.1 arch row")
p = swap(p, "parity-265, parity-266, db-transient) | `tests/` | source-scanning contracts |",
            "parity-265, parity-266, parity-267, db-transient) | `tests/` | source-scanning contracts |", 1, "PAD 7.1 arch list")
p = swap(p, "| E2E | 7 | 155 | `tests/e2e/*.spec.ts` | Playwright (chromium) + axe-core |",
            "| E2E | 7 | 157 | `tests/e2e/*.spec.ts` | Playwright (chromium) + axe-core |", 1, "PAD 7.1 e2e row")
p = swap(p, "| `bun run test` / `CI=1 bun run test:e2e` | root | 1877 unit / 155 e2e |",
            "| `bun run test` / `CI=1 bun run test:e2e` | root | 1895 unit / 157 e2e |", 1, "PAD 9 cmd")
p = swap(p, "- [ ] `bun run test` → 1877/1877 (counts re-pinned if tests added/removed)",
            "- [ ] `bun run test` → 1895/1895 (counts re-pinned if tests added/removed)", 1, "PAD 10 checklist")
p = swap(p, "the time of writing (lint 0/0 · tsc 0 · 1877 unit · build · smoke 15/15 ·",
            "the time of writing (lint 0/0 · tsc 0 · 1895 unit · build · smoke 15/15 ·", 1, "PAD 10 closing")

# The v2.64.0 revision block, above v2.63.0's.
V263_HEAD = "- [SR] v2.63.0 (session 266, R-63 — the range-return, empty-truth,"
block = """- [SR] v2.64.0 (session 267, R-64 — the savings-tab, sort-count, and
  calendar-roundtrip round): the fresh-eyes audit (three Mode-C passes —
  the R-63 cure surfaces driven by the session (the parity-266 battery
  re-run green 16/16 at HEAD), the API/auth/security layer (the
  TWENTIETH consecutive clean bill — all twelve house contracts,
  45 handlers / 30 route files, the census re-derived independently,
  every candidate examined and dismissed into a documented posture),
  and the UI/a11y/shell layer (all eight standing contracts verified,
  five new findings after dedup)) — 0 Critical / 0 High / 1 Medium /
  4 Low / 4 Informational NEW after dedup, every material claim
  re-verified at file:line by the driving session (the savings-bucket
  emptiness census-verified on the live db, the calendar-overflow
  invention runtime-proven, the reference's one-genus dialog
  live-measured through agent-browser). THE SAVINGS-TAB TRUTH GAP
  (F-267a, Medium — the F-266c no-matches discriminator keyed on the
  badge count (the panel's controls) plus the search box, missing the
  budget TAB — the page's third constraint dimension, a control that
  can empty a list without being counted; the corpus's own savings
  bucket is empty (needs 46 · wants 26 · savings 0), so the Savings
  tab ALONE rendered the onboarding face ("No expenses yet" + the Add
  Your First Expense CTA) for a 72-expense ledger, and the Clear
  Filters action the F-266c cure built did not reset the tab — the
  still-empty list flipped from the no-matches face to the onboarding
  face after its own Clear button; the cure: a DEDICATED
  over-constraint predicate counting the list-narrowing constraints
  the page owns — range, category, min, max, the tab, and the search —
  with the Clear Filters action lifting every constraint including
  the tab) · the sort pair leaves the predicate (F-267b — the badge
  count included the sort pair, a control that can only reorder never
  empty, so an empty ledger with a touched sort rendered the
  no-matches face; the predicate is separate from the badge, which
  keeps its honest F-265e panel count) · the seam's calendar
  round-trip (F-267c — the F-266i form guard tested shape not
  calendar validity: "2026-02-31" passed and toDate's normalizing
  constructor invented Mar 3 (runtime-proven), the exact F-222a
  invented-day doctrine the guard was built to enforce; the cure: a
  bound must LAND on the calendar its digits wrote or be dropped as
  open — the csv.ts stageWrittenLiteral doctrine in its local-midnight
  form — with the twin-form admission and calendar-drop legs closing
  the battery gaps) · the four dialogs' Date inputs join the form
  genus (F-267d — the expenses/income/goals/investments dialogs' date
  inputs rode the other genus beside their FORM_INPUT siblings; the
  reference's own dialog carries one genus across every field,
  live-measured) · the split derivation memoized (F-267e — the F-231j
  contract its two siblings honor) · the bound-field docs' twin
  clause (F-267f) · the Escape guard's invariant comment (F-267g).
  Registered: F-267h the theme fallback's storage divergence,
  F-267i the dashboard clock's midnight staleness. The verification:
  lint 0/0 · tsc 0 · 1895 unit (119 files, +18) · build · smoke
  15/15 · 157 e2e (+2 — the Savings-tab no-matches face with the
  onboarding CTA absent, and the Clear Filters restore returning the
  tab to All with the list repopulated; zero new signups, the
  corpus's own empty savings bucket the deterministic fixture) ·
  census MATCH · THE SIX PARITY DRIFT GATES RE-RUN (required again —
  the Expenses parity surface changed): the four sweep classes CLEAN,
  the fullpage sweep CLEAN, the interior census CLEAN (the
  closed-state DOM unchanged by construction — the discriminator is
  render-logic, the no-matches variant only renders under the tab
  constraint, the dialog inputs live inside closed dialogs) · the
  captures 250 (THE SAVINGS-TAB NO-MATCHES FACE AT DESKTOP
  1440×900 — the tab-emptied list wearing the over-constrained truth,
  Clear Filters standing, the onboarding CTA absent, the dialog Date
  input on the form genus) and 251 (THE COMPOUND OVER-CONSTRAINT AT
  MOBILE 390×844 — the tab plus the search box, the Clear lifting
  both) + the two comparison captures at TRUE 390×844.

"""
if p.count(V263_HEAD) != 1:
    sys.exit("[PAD block] the v2.63.0 block head is not unique")
p = p.replace(V263_HEAD, block + V263_HEAD)
with open("Project_Architecture_Document.md", "w", encoding="utf-8") as f:
    f.write(p)

# ------------------------------------------------- tests/docs-counts.test.ts
with open("tests/docs-counts.test.ts", encoding="utf-8") as f:
    t = f.read()
t = swap(t, "const UNIT_TOTAL = 1877;", "const UNIT_TOTAL = 1895;", 1, "dc unit")
t = swap(t, "const E2E_TOTAL = 155;", "const E2E_TOTAL = 157;", 1, "dc e2e")
t = swap(t, "const TEST_FILES = 118;", "const TEST_FILES = 119;", 1, "dc files")

# The guard trio's advance (the eighteenth gate-enforced ride).
t = swap(t,
    """    // Session-266 (R-63): the SEVENTEENTH gate-enforced ride — the
    // v2.63.0 block lands together with the trio's advance to
    // v2.61.0/v2.62.0/v2.63.0 (the v2.60.0 pin ages out).
    expect(p).toMatch(/\\[SR\\] v2\\.63\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1877 unit \\(118 files, \\+17\\)/);""",
    """    // Session-266 (R-63): the SEVENTEENTH gate-enforced ride — the
    // v2.63.0 block lands together with the trio's advance to
    // v2.61.0/v2.62.0/v2.63.0 (the v2.60.0 pin ages out).
    // Session-267 (R-64): the EIGHTEENTH gate-enforced ride — the
    // v2.64.0 block lands together with the trio's advance to
    // v2.62.0/v2.63.0/v2.64.0 (the v2.61.0 pin ages out).
    expect(p).toMatch(/\\[SR\\] v2\\.64\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1895 unit \\(119 files, \\+18\\)/);""",
    1, "dc trio")

# The arch-pins family row inline literal (the F-245d arithmetic leg's
# source of truth): parity-267 joins at 87.
t = swap(t, "| — architecture pins | 86 | (gate-script,",
            "| — architecture pins | 87 | (gate-script,", 1, "dc arch row literal")
t = swap(t, 'parity-266, db-transient) |",',
            'parity-266, parity-267, db-transient) |",', 1, "dc arch list literal")
with open("tests/docs-counts.test.ts", "w", encoding="utf-8") as f:
    f.write(t)

# --------------------------------------------------- tests/parity-243.test.ts
# The mirror of the guard trio's advance.
with open("tests/parity-243.test.ts", encoding="utf-8") as f:
    m = f.read()
m = swap(m,
    """    // (R-63) advances it with the v2.63.0 block:
    // v2.61.0/v2.62.0/v2.63.0 (the v2.60.0 pin ages out) — the
    // F-247d same-commit recalibration, the structural leg's
    // seventeenth gate-enforced ride.""",
    """    // (R-63) advances it with the v2.63.0 block:
    // v2.61.0/v2.62.0/v2.63.0 (the v2.60.0 pin ages out) — the
    // F-247d same-commit recalibration, the structural leg's
    // seventeenth gate-enforced ride. Session-267 (R-64) advances it
    // with the v2.64.0 block: v2.62.0/v2.63.0/v2.64.0 (the v2.61.0
    // pin ages out) — the F-247d same-commit recalibration, the
    // structural leg's eighteenth gate-enforced ride.""",
    1, "p243 mirror comment")
m = swap(m, '    expect(guardIt).toContain("v2\\\\.61\\\\.0");\n    expect(guardIt).toContain("v2\\\\.62\\\\.0");\n    expect(guardIt).toContain("v2\\\\.63\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.60\\\\.0");\n    expect(guardIt).toContain("1877 unit \\\\(118 files");',
            '    expect(guardIt).toContain("v2\\\\.62\\\\.0");\n    expect(guardIt).toContain("v2\\\\.63\\\\.0");\n    expect(guardIt).toContain("v2\\\\.64\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.61\\\\.0");\n    expect(guardIt).toContain("1895 unit \\\\(119 files");',
            1, "p243 mirror pins")
with open("tests/parity-243.test.ts", "w", encoding="utf-8") as f:
    f.write(m)

# -------------------------------------------- docs/remediation_plan_v2.md
with open("docs/remediation_plan_v2.md", encoding="utf-8") as f:
    pl = f.read()

# §5 row fill (the gate column placeholder).
pl = swap(pl, "the captures — the Savings-tab no-matches face, the Clear Filters restore) | (filled at ship) |",
              "the captures — the Savings-tab no-matches face, the Clear Filters restore) | lint 0/0 · tsc 0 · **1895 unit (119 files, +18)** · build · smoke 15/15 · **157 e2e (+2)** · census MATCH · the six parity drift gates CLEAN |",
              1, "plan §5 gate fill")

with open("docs/remediation_plan_v2.md", "w", encoding="utf-8") as f:
    f.write(pl)

print("docs-267 lockstep complete: counts 1877→1895 / 118→119 / 155→157 / badge 2032→2052,")
print("PAD v2.64.0 block + §7.1 rows, guard trio → v2.62/63/64 (+ the parity-243 mirror), README row → R-64, plan §5 filled")
