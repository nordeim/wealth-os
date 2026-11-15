#!/usr/bin/env python3
"""Session-250 (R-47) docs lockstep — moves every live-tense count site
to the ship counts (1668 unit / 102 files / 1819 badge), lands the PAD's
v2.47.0 revision block, advances the guard trio to v2.45.0/v2.46.0/
v2.47.0 (the structural leg's gate-enforced ride), and closes the plan
(R-47 -> Done + the section-5 row). Assert-each-replacement: scoped
slices, exactly-once anchors, REFUSED on any mismatch."""

import sys

def sub_once(text, old, new, label, scope=""):
    hay = text if not scope else scope
    n = hay.count(old)
    if n != 1:
        sys.exit(f"REFUSED: {label} matched {n} times (expected 1)")
    return text.replace(old, new, 1)

def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()

def write(p, s):
    with open(p, "w", encoding="utf-8") as f:
        f.write(s)

U_OLD, U_NEW = "1645", "1668"
F_OLD, F_NEW = "101", "102"
B_OLD, B_NEW = "1796", "1819"

# ------------------------------------------------------- 1. the pin constants
p = "tests/docs-counts.test.ts"
t = read(p)
t = sub_once(t, "const UNIT_TOTAL = 1645;", "const UNIT_TOTAL = 1668;", "UNIT_TOTAL")
t = sub_once(t, "const TEST_FILES = 101;", "const TEST_FILES = 102;", "TEST_FILES")

# The trio advance (45/46/47 — the structural leg's second gate-enforced
# ride; the v2.47.0 block lands at its ship counts in the PAD below).
t = sub_once(
    t,
    """    // Session-249 (R-46, F-249a): the trio advances to
    // v2.43.0/v2.44.0/v2.45.0 green-by-design FIRST (the SEVENTH
    // edition cured before this session's own lockstep pass, the
    // F-244a rule); the lockstep below then lands the v2.46.0 block
    // and advances AGAIN to v2.44.0/v2.45.0/v2.46.0 in the same
    // commit — the structural leg beneath now enforces the window at
    // test time (F-249b: the PAD's newest block must sit inside the
    // pinned window; the eighth edition fails `bun run test` inside
    // its own ship commit — the manual first-docs-act convention
    // retires).
    expect(p).toMatch(/\\[SR\\] v2\\.44\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1610 unit \\(98 files, \\+9\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.45\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1622 unit \\(99 files, \\+12\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.46\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1645 unit \\(101 files, \\+23\\)/);""",
    """    // Session-250 (R-47): the structural leg's second gate-enforced
    // ride — the v2.47.0 block lands below together with the trio's
    // advance to v2.45.0/v2.46.0/v2.47.0 in the SAME commit (the leg
    // derives the PAD's newest block at test time and fails the unit
    // gate if the window lags).
    expect(p).toMatch(/\\[SR\\] v2\\.45\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1622 unit \\(99 files, \\+12\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.46\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1645 unit \\(101 files, \\+23\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.47\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1668 unit \\(102 files, \\+23\\)/);""",
    "the guard trio advance",
)

# The arch-pins family row (69 -> 70, parity-250 joins the list).
t = sub_once(
    t,
    "| — architecture pins | 69 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, db-transient) |",
    "| — architecture pins | 70 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, db-transient) |",
    "the arch-pins family row pin",
)
write(p, t)
print("docs-counts pins moved")

# ------------------------------------------------------------- 2. the PAD
p = "Project_Architecture_Document.md"
t = read(p)

# 2a. The v2.47.0 revision block (newest-first: inserted at the [SR] list head).
REV = """- [SR] v2.47.0 (session 250, R-47 — the settings-sequence,
  superseded-error, and select-completion round): the fresh-eyes audit
  (three Mode-C passes — the R-46 cure surfaces driven by the session,
  the API/auth/security layer, and the UI/a11y/shell layer; 0 Critical /
  0 High / 3 Medium / 3 Low cured + 10 Informational registered after
  dedup, every material claim re-verified at file:line by the driving
  session; all four R-46 cure surfaces verified holding; the F-249i
  eighth pending-face member re-adjudicated as already carrying its
  F-234f rider — the census undercounted the cure, not the gap). The
  round's flagship: THE SETTINGS SEQUENCE (F-250b — F-249h's dedicated
  round: neither the hydrate tail's settings commit nor
  updateSettings' carried an ordering dimension, so a stale tail read
  landing after the PUT's commit silently reverted the saved
  preferences under their success toast, and a remount hydrate's entry
  token bump dropped the PUT's commit entirely; the cure mints a
  settings sequence at issue — the tail's GET guards on era + sequence,
  the PUT bumps the sequence at entry and re-keys its own commit from
  the token to the era; **proven live by the captures face**: the held
  tail GET fulfilled with the pre-PUT read, the PUT committed EUR
  under its toast, the stale read released — the store's committed
  slice keeps EUR). Plus: THE SUPERSEDED ERROR COMMIT (F-250a — the
  R-46 flagship's own failure arm carried a pre-R-46 leftover duplicate
  error commit OUTSIDE the superseded guard; the else arm retires;
  **proven live**: the held 500-fulfilled dashboard GET released after
  the DELETE's fresh commit — no banner, the store's error slice
  null); THE READ-BOUNDED-JSON STREAM GUARD (F-250c — the Layer-3 read
  loop's own catch keeps a mid-body transport fault inside the
  envelope); THE THREE SELECT COMPLETIONS (F-250d — the settings
  family's five query sites + the two transactions existence checks,
  the F-228h doctrine completed); THE SIGN-OUT BUSY RIDERS (F-250e —
  the sidebar MenuItem and the drawer button, the family's ninth and
  tenth members); THE EXPENSES BUCKET A11Y CURE (F-250f — the budget
  category was color-only on every row, a WCAG 1.4.1 Level A miss;
  every tile gains a screen reader bucket label and the light mode
  savings icon ink steps to the emerald-600 arm at 3.58:1); and THE
  REFERENCE STYLING-EVENT RESPONSE (F-250q — the verification-time
  discovery: the platform redeployed the reference's stylesheets with
  the JS bundle byte-identical, every DOM census read STANDING while
  the pixel sweeps drifted on two pages; the probe's standing set
  gains the POST-LOGIN app stylesheet's content hash so the next
  styling-only redeploy reads CHANGED, and the eight affected
  per-class sweep baselines re-derive against the restyled state —
  the R-7.5 doctrine). The verification: lint 0/0 · tsc 0 · 1668 unit
  (102 files, +23) · build · smoke 15/15 · 151 e2e · the six parity
  drift gates CLEAN at the re-derived baselines · census MATCH ·
  captures 197-201.
"""
t = sub_once(t, "- [SR] v2.46.0 (session 249, R-46", REV + "- [SR] v2.46.0 (session 249, R-46", "the v2.47.0 revision block")

# 2b. The 7.1 table (Unit row + the arch row + arithmetic).
t = sub_once(t, "| Unit | 101 | 1645 | `tests/*.test.ts` | Vitest 5 + fast-check |",
                "| Unit | 102 | 1668 | `tests/*.test.ts` | Vitest 5 + fast-check |", "the 7.1 Unit row")
t = sub_once(t, "| — architecture pins | 69 | (gate-script,", "| — architecture pins | 70 | (gate-script,", "the 7.1 arch row count")
t = sub_once(t, "parity-248, parity-249, db-transient) | `tests/` | source-scanning contracts |",
                "parity-248, parity-249, parity-250, db-transient) | `tests/` | source-scanning contracts |", "the 7.1 arch row list")

# 2c. The 9 command table + the 10 closing line.
t = sub_once(t, "| `bun run test` / `CI=1 bun run test:e2e` | root | 1645 unit / 151 e2e |",
                "| `bun run test` / `CI=1 bun run test:e2e` | root | 1668 unit / 151 e2e |", "the 9 command row")
import re
m = re.search(r"lint 0/0 · tsc 0 · 1645 unit · build · smoke 15/15", t)
if not m:
    sys.exit("REFUSED: the §10 closing line not found")
t = t.replace("lint 0/0 · tsc 0 · 1645 unit · build · smoke 15/15", "lint 0/0 · tsc 0 · 1668 unit · build · smoke 15/15", 1)
print("the 10 closing line moved")
write(p, t)
print("PAD moved")

# ------------------------------------------------------------- 3. README
p = "README.md"
t = read(p)
t = sub_once(t, "tests-1796%20checks", "tests-1819%20checks", "the README badge")
t = sub_once(t, "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1645 checks incl. property tests |",
                "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1668 checks incl. property tests |", "the stack table row")
t = sub_once(t, "| Unit (Vitest) | `bun run test` | 1645 checks / 101 files |",
                "| Unit (Vitest) | `bun run test` | 1668 checks / 102 files |", "the testing table row")
t = sub_once(t, "| Verification layer | ✅ Complete | 1645 unit · 151 e2e · 15 smoke · full gate green |",
                "| Verification layer | ✅ Complete | 1668 unit · 151 e2e · 15 smoke · full gate green |", "the verification row")

# The program row (session 249 R-46 -> session 250 R-47).
old_prog_start = "| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 249:"
idx = t.find(old_prog_start)
if idx < 0:
    sys.exit("REFUSED: the program row start not found")
row_end = t.find("\n", idx)
NEW_PROG = """| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 250: **R-47 shipped — the settings-sequence, superseded-error, and select-completion round**: the fresh-eyes audit (three Mode-C passes — the R-46 cure surfaces · the API/auth/security layer · the UI/a11y/shell layer — 0 Critical / 0 High / 3 Medium / 3 Low cured + 10 Informational registered after dedup, every material claim re-verified at file:line; all four R-46 cure surfaces holding; F-249i re-adjudicated as already cured); the cold baseline GREEN at HEAD 043b998 (the v2.46.0 ship state reproduced; the chromium-1254 toolchain gap the round's one discovery); the reference STABLE on every probed layer incl. the TRUE-390 mobile menu with 9 destinations — re-verified twice, once through agent-browser with the open/close toggle census); the flagship **settings sequence** (F-250b — F-249h's dedicated round: a module-level sequence joining the hydrate tail's GET and updateSettings' PUT — the read mints at issue and guards on era + sequence, the write bumps at entry and re-keys its commit from the token to the era; **proven live**: the held stale tail read skipped, the PUT's EUR standing under its toast); the **superseded error commit** retirement (F-250a — the R-46 flagship's own failure arm; **proven live**: the held 500 landing left no banner over the fresh state); the **readBoundedJson stream guard** (F-250c); the **three select completions** (F-250d); the **sign-out busy riders** (F-250e); the **expenses bucket a11y cure** (F-250f — the screen reader bucket labels + the light mode savings icon step); and the **reference styling-event response** (F-250q — the verification-time discovery: the platform restyled the reference with the JS bundle byte-identical; the probe gains the app stylesheet's content hash and the eight affected sweep baselines re-derived). Registered, not cured: F-250h-p plus the standing families. Gate: lint 0/0 · tsc 0 · **1668 unit / 102 files** · build · smoke 15/15 · 151 e2e · the six parity drift gates CLEAN at the re-derived baselines · census MATCH · captures 197-201) |"""
t = t[:idx] + NEW_PROG + t[row_end:]
print("the README program row moved")
write(p, t)

# ------------------------------------------------------------- 4. AGENTS / CLAUDE / SKILL
p = "AGENTS.md"
t = read(p)
t = sub_once(t, "| Unit tests (1645) | `bun run test` |", "| Unit tests (1668) | `bun run test` |", "AGENTS commands row")
write(p, t)

p = "CLAUDE.md"
t = read(p)
t = sub_once(t, "- **The gate is the contract**: lint 0/0 · tsc 0 · 1645 unit · build ·",
                "- **The gate is the contract**: lint 0/0 · tsc 0 · 1668 unit · build ·", "CLAUDE gate line")
t = sub_once(t, "| `bun run test` | Unit suite (Vitest, 1645 checks) |",
                "| `bun run test` | Unit suite (Vitest, 1668 checks) |", "CLAUDE command row")
t = sub_once(t, "tests via fast-check. 1645 checks / 101 files.",
                "tests via fast-check. 1668 checks / 102 files.", "CLAUDE pyramid line")
write(p, t)

p = "wealth-os_SKILL.md"
t = read(p)
t = sub_once(t, "layer (Vitest 1645 / Playwright 151 / smoke 15). Covers the design system,",
                "layer (Vitest 1668 / Playwright 151 / smoke 15). Covers the design system,", "SKILL header")
t = sub_once(t, "| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 1645 checks / 101 files |",
                "| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 1668 checks / 102 files |", "SKILL stack row")
t = sub_once(t, "| Unit tests | `bun run test` (1645 checks) |", "| Unit tests | `bun run test` (1668 checks) |", "SKILL commands row")
t = sub_once(t, "- [ ] `bun run test` — 1645 passed / 101 files", "- [ ] `bun run test` — 1668 passed / 102 files", "SKILL pre-ship line")
write(p, t)
print("AGENTS/CLAUDE/SKILL moved")

# ------------------------------------------------------------- 5. the plan closure
p = "docs/remediation_plan_v2.md"
t = read(p)
t = sub_once(t, "### R-47 — The settings-sequence, superseded-error, and select-completion round (session 250) — Status: In progress",
                "### R-47 — The settings-sequence, superseded-error, and select-completion round (session 250) — Status: Done(v2.47.0)", "the R-47 status")

S5 = """| v2.47.0 | 250 | **R-47** (the settings-sequence, superseded-error, and select-completion round — findings-led, the standing directive with the reference STABLE on every probed drift layer and the TRUE-390 mobile menu re-verified twice — once through agent-browser with the open/close toggle census; the cold baseline GREEN at HEAD 043b998 — the v2.46.0 ship state reproduced, the chromium-1254 toolchain gap the round's one discovery). The audit round first: the standing layers re-verified (probe:ref STABLE; `bun audit` unchanged; neo-crm unchanged (b3d0fbe); the SEO surface verified; the .env contract + the vitest/playwright configs + the .env.example standing). The session-250 fresh-eyes audit (three Mode-C passes — 0 Critical / 0 High / 3 Medium / 3 Low cured + 10 Informational registered after dedup, every material claim re-verified at file:line). The plan v2.47.0 written and validated against the tree. **R-47.1** the pins born RED (honest RED: 19 — the store-staleness battery's three new interleaving legs + the bounded-reader stream-rejection leg + the parity-250 source battery's fifteen; one negative control born green scoping the blast radius) → **R-47.2** the cures (THE SETTINGS SEQUENCE — the flagship; THE SUPERSEDED ERROR COMMIT; THE READ-BOUNDED-JSON STREAM GUARD; THE THREE SELECT COMPLETIONS; THE SIGN-OUT BUSY RIDERS; THE EXPENSES BUCKET A11Y CURE) plus the same-commit recalibrations (parity-217/218/224/239/249 — the F-247d precedent) and two comment rewords the parity-229 nets caught mid-cure (the F-229d discipline) → **R-47.3** the verification (lint 0/0 · tsc 0 · 1668 unit (102 files, +23) · build · smoke 15/15 · 151 e2e) — mid-verification the six-gate run tripped the desktop sweep on two pages and the round gained its seventh cure: **THE REFERENCE STYLING-EVENT RESPONSE** (F-250q — the platform redeployed the reference's stylesheets with the JS bundle byte-identical; the stash-test bisect cleared our tree, the interior census stood at 0-event margin; the probe's standing set gained the POST-LOGIN app stylesheet's content hash and the eight affected per-class baselines re-derived: desktop 8.5→12.3/8.1→10.5 · phone 14.5→23.0/26.4→28.7 · tablet 7.2→12.7/20.3→24.9 · landscape 10.5→14.3/23.2→26.3); the six parity drift gates then CLEAN end-to-end · census MATCH · the captures 197-201 (the own-database convention + the census tripwire: the mobile drawer at 390 (the standing ask), the settings-sequence face, the superseded-error face, the sign-out sequencing face, the expenses bucket labels). The docs lockstep complete (the PAD v2.47.0 block + the trio's gate-enforced advance to v2.45.0/v2.46.0/v2.47.0 + the §7.1 family rows 69→70 with parity-250 listed + the arithmetic 4+70+28=102 + the README badge 1796→1819 + the program row + AGENTS/CLAUDE/SKILL counts + the plan closure + the worklog + docs/session_83.md). |
"""
t = sub_once(t, "| v2.46.0 | 249 |", S5 + "| v2.46.0 | 249 |", "the section-5 execution row")
write(p, t)
print("plan closed")
print("docs lockstep complete")
