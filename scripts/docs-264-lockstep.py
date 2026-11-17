#!/usr/bin/env python3
# Session-264 (R-61) docs lockstep: the count ladder (UNIT 1830→1838,
# FILES 115→116, BADGE 1982→1990) across the doc set, the PAD's v2.61.0
# revision block, the guard trio's FIFTEENTH gate-enforced advance, the
# README program row's R-61 summary, and the plan §5 row's count true-up.
# Every replacement asserts the OLD form first (the docs-243 scoping
# doctrine).
import sys

def edit(path, pairs):
    src = open(path, encoding="utf-8").read()
    orig = src
    for old, new in pairs:
        n = src.count(old)
        assert n == 1, f"{path}: anchor not unique ({n}): {old[:70]!r}"
        src = src.replace(old, new)
    if src == orig:
        print(f"{path}: NO-OP?!", file=sys.stderr); sys.exit(1)
    open(path, "w", encoding="utf-8").write(src)
    print(f"{path}: {len(pairs)} edit(s)")

# ---- README.md ---------------------------------------------------------------
edit("README.md", [
    ("tests-1982%20checks", "tests-1990%20checks"),
    ("| 1830 checks incl. property tests |", "| 1838 checks incl. property tests |"),
    ("# 115 unit suites + 📂 e2e/ 7 specs", "# 116 unit suites + 📂 e2e/ 7 specs"),
    ("| `bun run test` | 1830 checks / 115 files |", "| `bun run test` | 1838 checks / 116 files |"),
    ("| 1830 unit · 152 e2e · 15 smoke · full gate green |", "| 1838 unit · 152 e2e · 15 smoke · full gate green |"),
])

# The program row: prepend the R-61 summary (the R-60 row keeps its place).
ROW_TAIL = "(session 263: **R-60 shipped — the login-ladder, overlay-alpha, and census-truing round**:"
R61_SUMMARY = """(session 264: **R-61 shipped — the muted-flip, sidebar-figure, and fallback-resolution round**: the fresh-eyes audit (three Mode-C passes — the R-60 cure surfaces all holding (the parity-263 battery re-run green 16/16) · the API/auth/security layer's seventeenth consecutive clean bill (all twelve house contracts, 45 handlers / 30 route files, the census confirmed by the driving session's own re-derivation; every candidate dismissed into a documented posture) · the UI/a11y/shell layer — four new findings, every challenged figure recomputed in a second engine against the LIVE palette and the sidebar stack LIVE-MEASURED on the production artifact): 0 Critical / 0 High / 0 Medium / 1 Low / 3 Informational NEW after dedup plus four registered rows. THE ROUND'S FLAGSHIP: **F-264a the muted-flip comment's unnamed pre-flip figures** (the comment cited 4.13:1 / 3.91:1 without naming the color they describe — those are the UNFLIPPED stone-500 readings; the flipped token computes 7.85:1 / 7.44:1 on the same pair, comfortably above the bar — the comment read as if the flip still failed) · F-264b the sidebar-content figure (cited ≈620px; live-measured ≈729px — brand 64 + nav 546 + footer 119) · F-264c the dialog-close dark figure (2.59 truncated the computed 2.5950 — trued to 2.60:1, the parity-262 pin riding) · F-264d the no-provider theme fallback's system arm (forced light instead of resolving prefers-color-scheme — latent only; routed through the module's own applyTheme seam). The letter-drift genera: F-264e the api.ts no-store comment's exception family completed (the export GET named) · F-264f the AGENTS.md raw-PrismaClient letter amended (the seed script's standing exception). Registered: F-264g the OTP console line (the ADR-014 demo posture) · F-264h the parse letter deviations · F-264i the AUTH_SECRET length-only floor · F-264j the standing F-218t register. The parity-264 battery born honest RED (6 RED legs + 2 riders, stash-re-proven) with the parity-229 bare-word net catching the round's own cure comment (the eleventh catch of its genus — reworded before ship); the capture 245 (the sidebar short-viewport face at 1024×600 — the nav scrolling internally with the footer reachable) + the two comparison captures at TRUE 390×844 re-saved) """
edit("README.md", [
    (ROW_TAIL, R61_SUMMARY + ROW_TAIL),
])

# ---- AGENTS.md ----------------------------------------------------------------
edit("AGENTS.md", [
    ("| Unit tests (1830) | `bun run test` |", "| Unit tests (1838) | `bun run test` |"),
])

# ---- CLAUDE.md ----------------------------------------------------------------
edit("CLAUDE.md", [
    ("lint 0/0 · tsc 0 · 1830 unit · build ·", "lint 0/0 · tsc 0 · 1838 unit · build ·"),
    ("| `bun run test` | Unit suite (Vitest, 1830 checks) |", "| `bun run test` | Unit suite (Vitest, 1838 checks) |"),
    ("tests via fast-check. 1830 checks / 115 files.", "tests via fast-check. 1838 checks / 116 files."),
])

# ---- wealth-os_SKILL.md --------------------------------------------------------
edit("wealth-os_SKILL.md", [
    ("(Vitest 1830 / Playwright 152 / smoke 15)", "(Vitest 1838 / Playwright 152 / smoke 15)"),
    ("Node env, jsdom-free; 1830 checks / 115 files |", "Node env, jsdom-free; 1838 checks / 116 files |"),
    ("| Unit tests | `bun run test` (1830 checks) |", "| Unit tests | `bun run test` (1838 checks) |"),
    ("- [ ] `bun run test` — 1830 passed / 115 files", "- [ ] `bun run test` — 1838 passed / 116 files"),
])

# ---- Project_Architecture_Document.md ------------------------------------------
V261 = """- [SR] v2.61.0 (session 264, R-61 — the muted-flip, sidebar-figure,
  and fallback-resolution round): the fresh-eyes audit (three Mode-C
  passes — the R-60 cure surfaces driven by the session (the
  parity-263 battery re-run green 16/16 at HEAD), the API/auth/
  security layer (the SEVENTEENTH consecutive clean bill — all twelve
  house contracts, 45 handlers / 30 route files, the census confirmed
  by the driving session's own re-derivation; every candidate
  examined and dismissed into a documented posture, the one Low being
  the ADR-014 demo-delivery posture the ledger already registers),
  and the UI/a11y/shell layer (clean on every named contract with
  four new findings, every contrast citation recomputed in a second
  engine and the sidebar stack live-measured)). The round's flagship:
  THE MUTED-FLIP COMMENT'S UNNAMED PRE-FLIP FIGURES (F-264a, Low —
  the comment justifying the dark muted flip cited 4.13:1 and 3.91:1
  without naming the color they describe: those are the UNFLIPPED
  stone-500 readings; the flipped token the very next line declares
  computes 7.85:1 on the dark surface and 7.44:1 on the dark page
  wash — comfortably above the bar; the comment read as if the
  flipped token still failed AA on dark surfaces). Its siblings:
  F-264b the sidebar-content figure (cited ≈620px; the live-measured
  stack is ≈729px — brand 64 + nav 546 + footer 119, measured on the
  production artifact at the constrained viewport, the box model
  independently computing ≈726) · F-264c the dialog-close dark figure
  (2.59:1 truncated the computed 2.5950 — trued to 2.60:1, the
  parity-262 pin updated in the same commit per the
  legitimate-contract-change doctrine) · F-264d the no-provider
  theme fallback's system arm (setTheme("system") forced LIGHT
  instead of resolving prefers-color-scheme — latent only, the
  provider is wired in the root layout; the cure routes the fallback
  through the module's own applyTheme seam, one line, no
  duplication). The letter-drift genera from the API pass: F-264e
  the api.ts no-store comment names only the uploads GET as the
  non-envelope member (the export GET is the second — the comment
  completes the family) · F-264f the AGENTS.md raw-PrismaClient
  letter omits the seed script's documented exception (the letter
  amended). Registered, not cured: F-264g the OTP console line under
  the unset knob (the ADR-014 demo posture — knob-gated,
  boot-warned, seventeen clean bills) · F-264h the reset/users parse
  letter deviations (documented in-route) · F-264i the AUTH_SECRET
  length-only floor (hardening headroom) · F-264j the
  NEO_PROXY_HOPS default (the standing F-218t register). The
  parity-264 battery born honest RED (6 RED legs + 2
  green-by-design riders, stash-re-proven) with ONE
  regression-contract catch (the parity-229 bare-word net caught the
  round's own cure comment — a hyphenated mode nickname parsed as a
  variant-prefixed utility; reworded before ship, the eleventh catch
  of its genus) and one authoring lesson applied (the
  wrap-independent containment forms on the api-comment leg — the
  F-239f lesson recurring). The verification: lint 0/0 · tsc 0 · 1838
  unit (116 files, +8) · build · smoke 15/15 · 152 e2e · census
  MATCH · bun audit unchanged · the offline gate is this round's bar
  (no swept parity surface renders differently — comments and an
  unreachable fallback; the six drift gates' standing baselines hold
  by construction) · the capture 245 (THE SIDEBAR SHORT-VIEWPORT
  FACE at 1024×600 — the nav overflows internally, scroll 546 >
  client 417, scrolled to bottom with the footer's user trigger row
  reachable in-viewport, the F-264b subject mechanism asserted live
  on the dev server riding db/captures.db) + the two comparison
  captures at TRUE 390×844 re-saved (the reference through
  agent-browser, the clone through the production artifact on the
  scratch db/comparison.db — parity plus the documented superset, no
  Tailwind v4 regression).

"""
edit("Project_Architecture_Document.md", [
    # the revision block: insert v2.61.0 above v2.60.0
    ("- [SR] v2.60.0 (session 263, R-60 — the login-ladder, overlay-alpha,", V261 + "- [SR] v2.60.0 (session 263, R-60 — the login-ladder, overlay-alpha,"),
    # the gate ADR
    ("→ vitest (1830) → `next build` →", "→ vitest (1838) → `next build` →"),
    # the file-hierarchy line (F-245c's structural leg)
    ("├── tests/                       # 115 unit suites (incl. architecture pins) + e2e/ 7 specs",
     "├── tests/                       # 116 unit suites (incl. architecture pins) + e2e/ 7 specs"),
    # §7.1 the Unit row
    ("| Unit | 115 | 1830 | `tests/*.test.ts` | Vitest 5 + fast-check |", "| Unit | 116 | 1838 | `tests/*.test.ts` | Vitest 5 + fast-check |"),
    # the architecture-pins family row: parity-264 joins, 83→84
    ("parity-261, parity-262, parity-263, db-transient) | `tests/` | source-scanning contracts |",
     "parity-261, parity-262, parity-263, parity-264, db-transient) | `tests/` | source-scanning contracts |"),
    ("| — architecture pins | 83 | (gate-script,", "| — architecture pins | 84 | (gate-script,"),
    # the pre-push checklist
    ("- [ ] `bun run test` → 1830/1830 (counts re-pinned if tests added/removed)", "- [ ] `bun run test` → 1838/1838 (counts re-pinned if tests added/removed)"),
    # §9 command row
    ("| `bun run test` / `CI=1 bun run test:e2e` | root | 1830 unit / 152 e2e |", "| `bun run test` / `CI=1 bun run test:e2e` | root | 1838 unit / 152 e2e |"),
    # §10 closing line
    ("(lint 0/0 · tsc 0 · 1830 unit · build · smoke 15/15 ·", "(lint 0/0 · tsc 0 · 1838 unit · build · smoke 15/15 ·"),
])

# ---- docs/remediation_plan_v2.md: the §5 row's count true-up ------------------
edit("docs/remediation_plan_v2.md", [
    ("**(the unit count lands with the battery)**", "**1838 unit (116 files, +8)**"),
])

# ---- tests/docs-counts.test.ts: the constants + the guard trio's 15th ride ----
edit("tests/docs-counts.test.ts", [
    ("const UNIT_TOTAL = 1830;", "const UNIT_TOTAL = 1838;"),
    ("const TEST_FILES = 115;", "const TEST_FILES = 116;"),
    ("""    // Session-263 (R-60): the FOURTEENTH gate-enforced ride — the
    // v2.60.0 block lands together with the trio's advance to
    // v2.58.0/v2.59.0/v2.60.0 (the v2.57.0 pin ages out).
    expect(p).toMatch(/\\[SR\\] v2\\.58\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1800 unit \\(113 files, \\+11\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.59\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1814 unit \\(114 files, \\+14\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.60\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1830 unit \\(115 files, \\+16\\)/);""",
     """    // Session-263 (R-60): the FOURTEENTH gate-enforced ride — the
    // v2.60.0 block lands together with the trio's advance to
    // v2.58.0/v2.59.0/v2.60.0 (the v2.57.0 pin ages out).
    // Session-264 (R-61): the FIFTEENTH gate-enforced ride — the
    // v2.61.0 block lands together with the trio's advance to
    // v2.59.0/v2.60.0/v2.61.0 (the v2.58.0 pin ages out).
    expect(p).toMatch(/\\[SR\\] v2\\.59\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1814 unit \\(114 files, \\+14\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.60\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1830 unit \\(115 files, \\+16\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.61\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1838 unit \\(116 files, \\+8\\)/);"""),
])

print("docs lockstep complete")
