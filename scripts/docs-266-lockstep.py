#!/usr/bin/env python3
"""Session-266 docs lockstep — the count ladder 1860→1877 / 116→118
(fresh file) / 152→155 e2e / badge 2012→2032, the PAD's v2.63.0
revision block, the §7.1 family rows, the guard trio's advance, the
README remediation row's advance (F-266a's cure), and the plan's §5
row fill. Every replacement is scoped and asserted (the F-242j
lesson); historical count mentions are untouched (the scope note at
tests/docs-counts.test.ts:15-18)."""

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

r = swap(r, "tests-2012%20checks", "tests-2032%20checks", 1, "README badge")
r = swap(r, "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1860 checks incl. property tests |",
            "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1877 checks incl. property tests |", 1, "README stack")
r = swap(r, "| E2E tests | Playwright + axe-core | 1.65.0 / 4.14.0 | 152 checks; chromium; seeded `db/e2e.db` |",
            "| E2E tests | Playwright + axe-core | 1.65.0 / 4.14.0 | 155 checks; chromium; seeded `db/e2e.db` |", 1, "README e2e stack")
r = swap(r, "# 117 unit suites + 📂 e2e/ 7 specs",
            "# 118 unit suites + 📂 e2e/ 7 specs", 1, "README hierarchy")
r = swap(r, "| Unit (Vitest) | `bun run test` | 1860 checks / 117 files |",
            "| Unit (Vitest) | `bun run test` | 1877 checks / 118 files |", 1, "README testing table")
r = swap(r, "| E2E (Playwright, chromium) | `CI=1 bun run test:e2e` | 152 checks / 7 specs",
            "| E2E (Playwright, chromium) | `CI=1 bun run test:e2e` | 155 checks / 7 specs", 1, "README e2e table")
r = swap(r, "| Verification layer | ✅ Complete | 1860 unit · 152 e2e · 15 smoke · full gate green |",
            "| Verification layer | ✅ Complete | 1877 unit · 155 e2e · 15 smoke · full gate green |", 1, "README verification row")

# F-266a: the remediation-program status row advances (the whole row —
# one line, the only carrier of "session 264: **R-61 shipped").
row_start = r.index("| Remediation program | 🔀 Active |")
row_end = r.index("\n", row_start)
old_row = r[row_start:row_end]
if "R-63 shipped" not in old_row:
    if "R-61 shipped" not in old_row:
        sys.exit("[README row] the row is neither the R-61 form nor the applied R-63 form — re-read before replacing")
new_row = (
    "| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program "
    "(session 266: **R-63 shipped — the range-return, empty-truth, and escape-stack round**: the fresh-eyes audit "
    "(three Mode-C passes — the R-62 cure surfaces (the parity-265 battery re-run green 27/27 at HEAD) · the "
    "API/auth/security layer's nineteenth consecutive clean bill (all twelve house contracts, 45 handlers / 30 route "
    "files; every candidate dismissed into a documented posture) · the UI/a11y/shell layer — eight new findings plus "
    "the driving session's own docs discovery, every material claim re-verified at file:line): 0 Critical / 0 High / "
    "2 Medium / 4 Low / 3 Informational NEW after dedup. THE ROUND'S FLAGSHIP PAIR LIVES ON THE R-62 CARD ITSELF: "
    "**F-266b the Date Range select's no return path** (six window options, no All-dates arm — once a window was "
    "picked the live-apply list could not be widened back from the select; the cure adds the All-dates first option "
    "on the all sentinel — a Radix SelectItem may not carry the empty string, its placeholder predicate reads an "
    "empty value as nothing selected, live-caught by the captures face) · **F-266c the filtered-to-empty list "
    "rendered the onboarding face** (\"No expenses yet\" + the Add First CTA for a full ledger; the cure splits the "
    "empty arm on the honest discriminator — panel filters or search — with a Clear Filters action that lifts every "
    "constraint). Plus: F-266d one Escape dismissed two surfaces over a stacked dialog (the guard now defers to any "
    "open dialog layer) · F-266e the card's two input genera unified on the form genus · F-266f the dead Minus "
    "import retired · F-266a the README status row itself was stale at R-61 (the R-62 lockstep's own miss — now "
    "structurally pinned: the docs-counts battery derives the PAD's newest revision round and asserts this row "
    "cites it) · F-266g the coach region's comment trued · F-266h the snapshot capture left the state updater · "
    "F-266i the seam's custom-bound form guard (V8's partial-ISO day invention refused). The mobile-nav comparison "
    "verified on BOTH sides at TRUE 390×844; probe:ref STABLE on every layer) |"
)
if "R-63 shipped" not in old_row:
    r = r[:row_start] + new_row + r[row_end:]

with open("README.md", "w", encoding="utf-8") as f:
    f.write(r)

# --------------------------------------------------------------- AGENTS.md
with open("AGENTS.md", encoding="utf-8") as f:
    a = f.read()
a = swap(a, "| Unit tests (1860) | `bun run test` |", "| Unit tests (1877) | `bun run test` |", 1, "AGENTS unit")
a = swap(a, "| E2E (boots own server, 152) | `CI=1 bun run test:e2e` |",
            "| E2E (boots own server, 155) | `CI=1 bun run test:e2e` |", 1, "AGENTS e2e")
with open("AGENTS.md", "w", encoding="utf-8") as f:
    f.write(a)

# --------------------------------------------------------------- CLAUDE.md
with open("CLAUDE.md", encoding="utf-8") as f:
    c = f.read()
c = swap(c, "lint 0/0 · tsc 0 · 1860 unit · build ·", "lint 0/0 · tsc 0 · 1877 unit · build ·", 1, "CLAUDE gate")
c = swap(c, "smoke 15/15 · 152 e2e.", "smoke 15/15 · 155 e2e.", 1, "CLAUDE gate2")
c = swap(c, "| `bun run test` | Unit suite (Vitest, 1860 checks) |",
            "| `bun run test` | Unit suite (Vitest, 1877 checks) |", 1, "CLAUDE unit")
c = swap(c, "| `CI=1 bun run test:e2e` | E2E suite (Playwright, 152 checks, own db + :3100) |",
            "| `CI=1 bun run test:e2e` | E2E suite (Playwright, 155 checks, own db + :3100) |", 1, "CLAUDE e2e")
c = swap(c, "tests via fast-check. 1860 checks / 117 files.", "tests via fast-check. 1877 checks / 118 files.", 1, "CLAUDE counts")
c = swap(c, "152 checks / 7 specs. `playwright.config.ts` pins", "155 checks / 7 specs. `playwright.config.ts` pins", 1, "CLAUDE e2e counts")
with open("CLAUDE.md", "w", encoding="utf-8") as f:
    f.write(c)

# ------------------------------------------------------- wealth-os_SKILL.md
with open("wealth-os_SKILL.md", encoding="utf-8") as f:
    s = f.read()
s = swap(s, "layer (Vitest 1860 / Playwright 152 / smoke 15).", "layer (Vitest 1877 / Playwright 155 / smoke 15).", 1, "SKILL head")
s = swap(s, "Node env, jsdom-free; 1860 checks / 117 files |", "Node env, jsdom-free; 1877 checks / 118 files |", 1, "SKILL stack")
s = swap(s, "Chromium; 152 checks / 7 specs; own db + port 3100 |", "Chromium; 155 checks / 7 specs; own db + port 3100 |", 1, "SKILL e2e")
s = swap(s, "| Unit tests | `bun run test` (1860 checks) |", "| Unit tests | `bun run test` (1877 checks) |", 1, "SKILL cmd")
s = swap(s, "| E2E (boots own server) | `CI=1 bun run test:e2e` (152 checks) |",
            "| E2E (boots own server) | `CI=1 bun run test:e2e` (155 checks) |", 1, "SKILL e2e cmd")
s = swap(s, "- [ ] `bun run test` — 1860 passed / 117 files", "- [ ] `bun run test` — 1877 passed / 118 files", 1, "SKILL checklist")
s = swap(s, "- [ ] `CI=1 bun run test:e2e` — 152/152 (7 specs)", "- [ ] `CI=1 bun run test:e2e` — 155/155 (7 specs)", 1, "SKILL e2e checklist")
with open("wealth-os_SKILL.md", "w", encoding="utf-8") as f:
    f.write(s)

# ------------------------------------------- Project_Architecture_Document
with open("Project_Architecture_Document.md", encoding="utf-8") as f:
    p = f.read()

p = swap(p, "→ vitest (1860) → `next build` →", "→ vitest (1877) → `next build` →", 1, "PAD pipeline")
p = swap(p, "├── tests/                       # 117 unit suites (incl. architecture pins) + e2e/ 7 specs",
            "├── tests/                       # 118 unit suites (incl. architecture pins) + e2e/ 7 specs", 1, "PAD hierarchy")
p = swap(p, "| Unit | 117 | 1860 | `tests/*.test.ts` | Vitest 5 + fast-check |",
            "| Unit | 118 | 1877 | `tests/*.test.ts` | Vitest 5 + fast-check |", 1, "PAD 7.1 unit row")
p = swap(p, "| — architecture pins | 85 |", "| — architecture pins | 86 |", 1, "PAD 7.1 arch row")
p = swap(p, "parity-264, parity-265, db-transient) | `tests/` | source-scanning contracts |",
            "parity-264, parity-265, parity-266, db-transient) | `tests/` | source-scanning contracts |", 1, "PAD 7.1 arch list")
p = swap(p, "| E2E | 7 | 152 | `tests/e2e/*.spec.ts` | Playwright (chromium) + axe-core |",
            "| E2E | 7 | 155 | `tests/e2e/*.spec.ts` | Playwright (chromium) + axe-core |", 1, "PAD 7.1 e2e row")
p = swap(p, "| `bun run test` / `CI=1 bun run test:e2e` | root | 1860 unit / 152 e2e |",
            "| `bun run test` / `CI=1 bun run test:e2e` | root | 1877 unit / 155 e2e |", 1, "PAD 9 cmd")
p = swap(p, "- [ ] `bun run test` → 1860/1860 (counts re-pinned if tests added/removed)",
            "- [ ] `bun run test` → 1877/1877 (counts re-pinned if tests added/removed)", 1, "PAD 10 checklist")
p = swap(p, "the time of writing (lint 0/0 · tsc 0 · 1860 unit · build · smoke 15/15 ·",
            "the time of writing (lint 0/0 · tsc 0 · 1877 unit · build · smoke 15/15 ·", 1, "PAD 10 closing")

# The v2.63.0 revision block, above v2.62.0's.
V262_HEAD = "- [SR] v2.62.0 (session 265, R-62 — the expenses-filters, coach-count,"
block = """- [SR] v2.63.0 (session 266, R-63 — the range-return, empty-truth, and
  escape-stack round): the fresh-eyes audit (three Mode-C passes — the
  R-62 cure surfaces driven by the session (the parity-265 battery
  re-run green 27/27 at HEAD), the API/auth/security layer (the
  NINETEENTH consecutive clean bill — all twelve house contracts,
  45 handlers / 30 route files, every candidate examined and dismissed
  into a documented posture), and the UI/a11y/shell layer (clean on
  every named contract with eight new findings plus the driving
  session's own docs discovery)) — 0 Critical / 0 High / 2 Medium /
  4 Low / 3 Informational NEW after dedup, every material claim
  re-verified at file:line, both Medium findings living on the R-62
  flagship surface itself. THE RANGE-RETURN TRAP (F-266b, Medium —
  the Date Range select's six window options carried no All-dates
  arm: once a window was picked the live-apply list could not be
  widened back from the select alone; the cure adds the All-dates
  first option — the no-window state named and selectable, the
  placeholder retired with it, the option riding the "all" sentinel
  because a Radix SelectItem may not carry the empty string (the
  placeholder predicate reads an empty value as nothing selected —
  live-caught by the captures face, the trigger rendered blank) with
  the two boundary expressions mapping the sentinel onto the seam's
  "" no-window contract) · THE EMPTY-TRUTH SPLIT (F-266c, Medium — a
  filtered-to-empty list rendered the onboarding face for a full
  ledger; the empty arm now splits on the honest discriminator —
  panel filters active or search non-empty — rendering the
  no-matches face with a Clear Filters action that lifts every
  constraint the page owns) · the Escape stack guard (F-266d — a
  Radix dialog over the open card no longer falls with it on one
  press: the guard defers to any open dialog layer, both dialog
  genera unmounting when closed) · the card's input genera unified
  (F-266e — the Custom date inputs join the form genus with the
  width appendage) · the dead Minus import retired (F-266f) · the
  README status row advanced and STRUCTURALLY PINNED (F-266a — the
  row was stale at R-61, the R-62 lockstep's own miss; the
  docs-counts battery now derives the PAD's newest revision round
  and asserts the row cites it, the F-249b pattern on the last
  unpinned status site) · the coach region's comment trued (F-266g)
  · the snapshot capture left the state updater (F-266h) · the
  seam's custom-bound form guard (F-266i — a bound outside the bare
  yyyy-mm-dd form is dropped rather than parsed; V8's partial-ISO
  day invention refused). The regression contract worked again (the
  parity-229 class-shape net caught the round's own cure comment —
  a hyphenated open surface nickname, the thirteenth catch of its
  genus; reworded before ship — and the captures face caught the
  Radix empty-value trap the unit battery could not see). The
  verification: lint 0/0 · tsc 0 · 1877 unit (118 files, +17) ·
  build · smoke 15/15 · 155 e2e (+3 — the All-dates return
  round-trip, the no-matches variant with its Clear Filters
  restore, the Escape stack over the Add Expense dialog) · census
  MATCH · THE SIX PARITY DRIFT GATES RE-RUN (required again — the
  Expenses parity surface changed): the four sweep classes CLEAN,
  the fullpage sweep CLEAN, the interior census CLEAN (the
  closed-state DOM unchanged by construction) · the captures 248
  (THE ALL-DATES RETURN AT DESKTOP 1440×900 — the named no-window
  state, the window pick narrowing, the exact restore, the
  form-genus custom dates, the Escape stack proven) and 249 (THE
  NO-MATCHES VARIANT AT MOBILE 390×844 — the over-constrained
  face, Clear Filters standing) + the two comparison captures at
  TRUE 390×844.

"""
if p.count(V262_HEAD) != 1:
    sys.exit("[PAD block] the v2.62.0 block head is not unique")
p = p.replace(V262_HEAD, block + V262_HEAD)
with open("Project_Architecture_Document.md", "w", encoding="utf-8") as f:
    f.write(p)

# ------------------------------------------------- tests/docs-counts.test.ts
with open("tests/docs-counts.test.ts", encoding="utf-8") as f:
    t = f.read()
t = swap(t, "const UNIT_TOTAL = 1860;", "const UNIT_TOTAL = 1877;", 1, "dc unit")
t = swap(t, "const E2E_TOTAL = 152;", "const E2E_TOTAL = 155;", 1, "dc e2e")
t = swap(t, "const TEST_FILES = 117;", "const TEST_FILES = 118;", 1, "dc files")

# The guard trio's advance (the seventeenth gate-enforced ride).
t = swap(t,
    """    // Session-265 (R-62): the SIXTEENTH gate-enforced ride — the
    // v2.62.0 block lands together with the trio's advance to
    // v2.60.0/v2.61.0/v2.62.0 (the v2.59.0 pin ages out).
    expect(p).toMatch(/\\[SR\\] v2\\.60\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1830 unit \\(115 files, \\+16\\)/);""",
    """    // Session-265 (R-62): the SIXTEENTH gate-enforced ride — the
    // v2.62.0 block lands together with the trio's advance to
    // v2.60.0/v2.61.0/v2.62.0 (the v2.59.0 pin ages out).
    // Session-266 (R-63): the SEVENTEENTH gate-enforced ride — the
    // v2.63.0 block lands together with the trio's advance to
    // v2.61.0/v2.62.0/v2.63.0 (the v2.60.0 pin ages out).
    expect(p).toMatch(/\\[SR\\] v2\\.63\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1877 unit \\(118 files, \\+17\\)/);""",
    1, "dc trio")
with open("tests/docs-counts.test.ts", "w", encoding="utf-8") as f:
    f.write(t)

# -------------------------------------------- docs/remediation_plan_v2.md
with open("docs/remediation_plan_v2.md", encoding="utf-8") as f:
    pl = f.read()

# §5 row fill (the gate column placeholder + the R-63.1 line trued for
# the sentinel discovery).
pl = swap(pl, "the captures — the All-dates return, the no-matches variant) | (filled at ship) |",
              "the captures — the All-dates return, the no-matches variant) | lint 0/0 · tsc 0 · **1877 unit (118 files, +17)** · build · smoke 15/15 · **155 e2e (+3)** · census MATCH · the six parity drift gates CLEAN |",
              1, "plan §5 gate fill")

# The F-266b ledger disposition gains the as-built sentinel.
pl = swap(pl,
    "**R-63** (a first \"All dates\" option with value \"\" — the no-window state becomes named and selectable; the placeholder retires with it (a Radix Select renders the matching item, never the placeholder, once the item exists); the parity-265 placeholder pin leg updates in the same commit with the contract-change rationale) |",
    "**R-63** (a first \"All dates\" option — the no-window state becomes named and selectable, the placeholder retiring with it. AS BUILT: the option rides the \"all\" sentinel, not the empty string — a Radix SelectItem may not carry \"\" (the placeholder predicate reads an empty value as nothing selected, live-caught by the captures face: the trigger rendered blank), so the two boundary expressions map the sentinel onto the seam's \"\" no-window contract; the parity-265 placeholder pin leg updates in the same commit with the contract-change rationale) |",
    1, "plan F-266b disposition")

# The R-63 cures paragraph gains the sentinel sentence.
pl = swap(pl,
    "the placeholder retires with it (a Radix Select\nrenders the matching item once it exists — the placeholder was only\nreachable pre-first-pick), and the parity-265 placeholder pin updates\nin the same commit (the contract change rides the commit that changes\nit).",
    "the placeholder retires with it — and the option rides the\n\"all\" SENTINEL, not the empty string: a Radix SelectItem may not\ncarry \"\" (the placeholder predicate reads an empty value as nothing\nselected — the trigger rendered blank, live-caught by the captures\nface at first run), so the two boundary expressions map the sentinel\nonto the seam's \"\" no-window contract. The parity-265 placeholder\npin updates in the same commit (the contract change rides the commit\nthat changes it).",
    1, "plan R-63 sentinel")

with open("docs/remediation_plan_v2.md", "w", encoding="utf-8") as f:
    f.write(pl)

print("docs-266 lockstep complete: counts 1860→1877 / 117→118 / 152→155 / badge 2012→2032,")
print("PAD v2.63.0 block + §7.1 rows, guard trio → v2.61/62/63, README row → R-63, plan §5 filled")
