#!/usr/bin/env python3
# Session-265 (R-62) docs lockstep: the count ladder (UNIT 1838→1860,
# FILES 116→117, BADGE 1990→2012) across the doc set, the PAD's v2.62.0
# revision block + hierarchy/tree/§7.1 rows, the guard trio's SIXTEENTH
# gate-enforced advance (docs-counts + the parity-243 mirror), the plan's
# §5 history-row count trues, and the worklog entry. Each edit asserted
# (the docs-243 scoping doctrine); the count-lockstep live-tense scope
# (the F-242j lesson — replace only the LIVE sites, never historical
# revision blocks).
import sys

def load(p):
    return open(p, encoding="utf-8").read()

def save(p, s):
    open(p, "w", encoding="utf-8").write(s)

def sub1(src, old, new, path):
    assert src.count(old) == 1, f"{path}: anchor not unique ({src.count(old)}): {old[:70]!r}"
    return src.replace(old, new, 1)

# ---- 1. README: badge + stack table + hierarchy + testing + verification ----
p = "README.md"
s = load(p)
s = sub1(s, "tests-1990%20checks", "tests-2012%20checks", p)
s = sub1(s, "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1838 checks incl. property tests |",
            "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1860 checks incl. property tests |", p)
s = sub1(s, "├── 📂 tests/                  # 116 unit suites + 📂 e2e/ 7 specs",
            "├── 📂 tests/                  # 117 unit suites + 📂 e2e/ 7 specs", p)
s = sub1(s, "| Unit (Vitest) | `bun run test` | 1838 checks / 116 files |",
            "| Unit (Vitest) | `bun run test` | 1860 checks / 117 files |", p)
s = sub1(s, "| Verification layer | ✅ Complete | 1838 unit · 152 e2e · 15 smoke · full gate green |",
            "| Verification layer | ✅ Complete | 1860 unit · 152 e2e · 15 smoke · full gate green |", p)
save(p, s)
print("README: 5 edits")

# ---- 2. AGENTS.md: the command row ------------------------------------------
p = "AGENTS.md"
s = load(p)
s = sub1(s, "| Unit tests (1838) | `bun run test` |",
            "| Unit tests (1860) | `bun run test` |", p)
save(p, s)
print("AGENTS: 1 edit")

# ---- 3. CLAUDE.md: the gate line + command table + test pyramid -------------
p = "CLAUDE.md"
s = load(p)
s = sub1(s, "lint 0/0 · tsc 0 · 1838 unit · build ·",
            "lint 0/0 · tsc 0 · 1860 unit · build ·", p)
s = sub1(s, "| `bun run test` | Unit suite (Vitest, 1838 checks) |",
            "| `bun run test` | Unit suite (Vitest, 1860 checks) |", p)
s = sub1(s, "tests via fast-check. 1838 checks / 116 files.",
            "tests via fast-check. 1860 checks / 117 files.", p)
save(p, s)
print("CLAUDE: 3 edits")

# ---- 4. wealth-os_SKILL.md: the four sites -----------------------------------
p = "wealth-os_SKILL.md"
s = load(p)
s = sub1(s, "layer (Vitest 1838 / Playwright 152 / smoke 15). Covers the design system,",
            "layer (Vitest 1860 / Playwright 152 / smoke 15). Covers the design system,", p)
s = sub1(s, "| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 1838 checks / 116 files |",
            "| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 1860 checks / 117 files |", p)
s = sub1(s, "| Unit tests | `bun run test` (1838 checks) |",
            "| Unit tests | `bun run test` (1860 checks) |", p)
s = sub1(s, "- [ ] `bun run test` — 1838 passed / 116 files",
            "- [ ] `bun run test` — 1860 passed / 117 files", p)
save(p, s)
print("SKILL: 4 edits")

# ---- 5. PAD: the live-tense sites + the v2.62.0 revision block ---------------
p = "Project_Architecture_Document.md"
s = load(p)
s = sub1(s, "→ vitest (1838) → `next build` → the 15-assertion smoke ladder on the",
            "→ vitest (1860) → `next build` → the 15-assertion smoke ladder on the", p)
s = sub1(s, "├── tests/                       # 116 unit suites (incl. architecture pins) + e2e/ 7 specs",
            "├── tests/                       # 117 unit suites (incl. architecture pins) + e2e/ 7 specs", p)
s = sub1(s, "| Unit | 116 | 1838 | `tests/*.test.ts` | Vitest 5 + fast-check |",
            "| Unit | 117 | 1860 | `tests/*.test.ts` | Vitest 5 + fast-check |", p)
s = sub1(s, "- [ ] `bun run test` → 1838/1838 (counts re-pinned if tests added/removed)",
            "- [ ] `bun run test` → 1860/1860 (counts re-pinned if tests added/removed)", p)
s = sub1(s, "| `bun run test` / `CI=1 bun run test:e2e` | root | 1838 unit / 152 e2e |",
            "| `bun run test` / `CI=1 bun run test:e2e` | root | 1860 unit / 152 e2e |", p)
s = sub1(s, "the time of writing (lint 0/0 · tsc 0 · 1838 unit · build · smoke 15/15 ·",
            "the time of writing (lint 0/0 · tsc 0 · 1860 unit · build · smoke 15/15 ·", p)

# The §7.1 architecture-family row: parity-265 joins the list (84→85)
# and the Unit row was already trued to 117 by the earlier edit — the
# arithmetic 4 + 85 + 28 = 117 is the docs-counts pin's own leg.
OLD_PINS = "| — architecture pins | 84 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, parity-264, db-transient) | `tests/` | source-scanning contracts |"
NEW_PINS = "| — architecture pins | 85 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, parity-253, parity-254, parity-255, parity-256, parity-257, parity-258, parity-259, parity-260, parity-261, parity-262, parity-263, parity-264, parity-265, db-transient) | `tests/` | source-scanning contracts |"
s = sub1(s, OLD_PINS, NEW_PINS, p)

# The v2.62.0 revision block, inserted above the v2.61.0 head.
SR_ANCHOR = "- [SR] v2.61.0 (session 264, R-61 — the muted-flip, sidebar-figure,"
assert s.count(SR_ANCHOR) == 1
SR_NEW = """- [SR] v2.62.0 (session 265, R-62 — the expenses-filters, coach-count,
  and live-region round): the fresh-eyes audit (three Mode-C passes —
  the R-61 cure surfaces driven by the session (the parity-264 battery
  re-run green 8/8 at HEAD), the API/auth/security layer (the
  EIGHTEENTH consecutive clean bill — all twelve house contracts,
  45 handlers / 30 route files, every candidate examined and dismissed
  into a documented posture), and the UI/a11y/shell layer (clean on
  every named contract with three new findings)) PLUS the reference
  probe that surfaced the round's flagship. THE EXPENSES FILTER
  SURFACE SUBSET GAP (F-265b, High — live-probed at TRUE 1440×900
  through agent-browser: the reference's surface is a full-width
  IN-FLOW EXPANSION CARD carrying SIX controls — the Date Range
  select with its Custom-range Start/End reveal, the Category select,
  Min Amount, Max Amount, the Sort By field/direction pair — over a
  Clear All / Cancel / Apply Filters footer; our clone carried ONLY
  the Category select inside a w-64 anchored popover, invisible to
  every settled-state gate (both forms close in captures — the
  F-217c dialogs-blindness genus). The cure rebuilds the surface as
  the reference's card genus with LIVE-APPLY semantics (the superset
  over the reference's commit step), the close-guard family re-scoped
  with the genus (the outside-pointerdown and scroll-close hazards
  retire with the anchoring; Escape + the F-241e focus return
  survive), and the list pipeline hoisted into the new pure finance
  seam filterAndSortExpenses (the date-window through the toDate
  doctrine, the bounds, and the four-field × direction sort — the
  default reproducing the API's own order). Its siblings: F-265c the
  coach's save-more answer hardcoded "Three levers:" while a
  one-nonzero-category month renders two bullets (the header now
  derives from the bullet count — the multi-category answer
  byte-identical) · F-265d the coach's polite live region wrapped the
  whole message list so the user's own bubble was echoed back every
  turn (the announcements moved to a dedicated always-present sr-only
  polite region carrying the assistant column only) · F-265e the
  Filters badge counted the budget-tab filter the popover never owned
  (resolved inside the flagship's re-scope — the badge counts the
  panel's own controls, the honest live count versus the reference's
  own never-changing "2", live-probed). The toolchain finding cured
  at discovery: F-265a the comparison script's AUTH_SECRET fallback
  rode the nullish form — bun loads the .env's empty-string value
  into process.env, the ?? form passes "" through, and the production
  boot gate refused to serve (a bare 500 on every request,
  live-reproduced from the spawned server's stderr); the truthy form
  cures it and the battery pins the form. Registered, not cured:
  F-265f the census script's missing exact-basename guard (cosmetic —
  no test importer exists). The parity-265 battery born honest RED
  (23 RED legs + 4 green-by-design riders) with TWO
  regression-contract catches (the parity-229 class-shape net caught
  the round's own cure comments — a hyphenated focus nickname and a
  hyphenated direction description, the twelfth catch of its genus;
  both reworded before ship) and the coach-leg scoping lesson (the
  e2e getByText resolved to two elements once the announcement region
  mirrored the reply — the visible face scoped with .first()). The
  verification: lint 0/0 · tsc 0 · 1860 unit (117 files, +22) ·
  build · smoke 15/15 · 152 e2e · census MATCH · THE SIX PARITY
  DRIFT GATES RE-RUN (required — a parity surface changed): the four
  sweep classes CLEAN, the fullpage sweep CLEAN, the interior census
  CLEAN (the closed-state DOM unchanged by construction) · the
  captures 246 (THE EXPANSION CARD AT DESKTOP 1440×900 — in-flow
  position static, full-width, six controls + footer, the Custom
  reveal, the live-apply sort flip proven on the dev server) and 247
  (THE EXPANSION CARD AT MOBILE 390×844 — one stacked column, all
  controls reachable) + the two comparison captures at TRUE 390×844.
  Mid-session server recycles interrupted the round twice (the audit
  dispatch, then the drift chain) — the workspace rebuilt each time,
  the work re-applied from the session record, every gate re-run
  green on the rebuilt tree.
"""
s = s.replace(SR_ANCHOR, SR_NEW + SR_ANCHOR, 1)
save(p, s)
print("PAD: 7 edits + the v2.62.0 revision block")

# ---- 6. the guard trio's SIXTEENTH advance (docs-counts + parity-243) --------
p = "tests/docs-counts.test.ts"
s = load(p)
s = sub1(s, """    // Session-264 (R-61): the FIFTEENTH gate-enforced ride — the
    // v2.61.0 block lands together with the trio's advance to
    // v2.59.0/v2.60.0/v2.61.0 (the v2.58.0 pin ages out).""",
            """    // Session-264 (R-61): the FIFTEENTH gate-enforced ride — the
    // v2.61.0 block lands together with the trio's advance to
    // v2.59.0/v2.60.0/v2.61.0 (the v2.58.0 pin ages out).
    // Session-265 (R-62): the SIXTEENTH gate-enforced ride — the
    // v2.62.0 block lands together with the trio's advance to
    // v2.60.0/v2.61.0/v2.62.0 (the v2.59.0 pin ages out).""", p)
s = sub1(s, """  expect(p).toMatch(/\\[SR\\] v2\\.61\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1838 unit \\(116 files, \\+8\\)/);""",
            """  expect(p).toMatch(/\\[SR\\] v2\\.61\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1838 unit \\(116 files, \\+8\\)/);
  expect(p).toMatch(/\\[SR\\] v2\\.62\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1860 unit \\(117 files, \\+22\\)/);""", p)
save(p, s)
print("docs-counts: guard trio advanced + the v2.62.0 pin")

p = "tests/parity-243.test.ts"
s = load(p)
# The mirror pin (find the v2.59.0/v2.60.0/v2.61.0 mention and advance).
OLD_MIRROR = "v2.59.0/v2.60.0/v2.61.0"
assert s.count(OLD_MIRROR) == 1, f"parity-243 mirror: {s.count(OLD_MIRROR)} anchors"
s = sub1(s, OLD_MIRROR, "v2.60.0/v2.61.0/v2.62.0", p)
save(p, s)
print("parity-243: mirror pin advanced")

# ---- 7. the plan's §5 row count-ladder trues ---------------------------------
# The fresh row's count placeholders land now that the counts are known.
p = "docs/remediation_plan_v2.md"
s = load(p)
s = sub1(s, "**(the unit count lands with the battery)** · build · smoke 15/15 · **(the e2e count lands with the battery)** · census MATCH | (this session's execution commit) |",
            "**1860 unit (117 files, +22)** · build · smoke 15/15 · **152 e2e** · census MATCH | (this session's execution commit) |", p)
save(p, s)
print("plan: §5 row counts trued")

print("docs lockstep complete")
