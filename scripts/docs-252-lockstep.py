#!/usr/bin/env python3
"""Session-252 (R-49): the docs lockstep — the count ladder
(1686→1704 / 103→104 / 151→152 / badge 1837→1856) + the PAD's
v2.49.0 revision block + the guard-trio advance + the README program
row + the plan closure + the §5 row.

Scoped, live-tense only (the F-242j lesson): every sub() REFUSES
unless its anchor matches exactly once, and historical blocks are
never touched."""

import sys

def sub(path, old, new, label):
    t = open(path, encoding="utf-8").read()
    n = t.count(old)
    if n != 1:
        sys.exit(f"REFUSED: {label} matched {n} times in {path}")
    open(path, "w", encoding="utf-8").write(t.replace(old, new, 1))
    print(f"edited: {label}")

# ---- 1. tests/docs-counts.test.ts — the pin constants (the gate-enforced lockstep) ----
sub(
    "tests/docs-counts.test.ts",
    "const UNIT_TOTAL = 1686;\nconst E2E_TOTAL = 151;\nconst SMOKE_TOTAL = 15;\nconst TEST_FILES = 103;",
    "const UNIT_TOTAL = 1704;\nconst E2E_TOTAL = 152;\nconst SMOKE_TOTAL = 15;\nconst TEST_FILES = 104;",
    "the docs-counts constants",
)

sub(
    "tests/docs-counts.test.ts",
    """    // Session-251 (R-48): parity-251 joins the architecture family
    // (70 -> 71): 4 + 71 + 28 = 103.""",
    """    // Session-252 (R-49): parity-252 joins the architecture family
    // (71 -> 72): 4 + 72 + 28 = 104.
    // Session-251 (R-48): parity-251 joins the architecture family
    // (70 -> 71): 4 + 71 + 28 = 103.""",
    "the §7.1 arithmetic comment",
)

sub(
    "tests/docs-counts.test.ts",
    "| — architecture pins | 71 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, db-transient) |",
    "| — architecture pins | 72 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, db-transient) |",
    "the docs-counts architecture family row",
)

# ---- 2. the guard trio advance (the F-243b/F-244a window — the same commit as the v2.49.0 block) ----
sub(
    "tests/docs-counts.test.ts",
    """    // Session-250 (R-47): the structural leg's second gate-enforced
    // ride — the v2.47.0 block lands below together with the trio's
    // advance to v2.45.0/v2.46.0/v2.47.0 in the SAME commit (the leg
    // derives the PAD's newest block at test time and fails the unit
    // gate if the window lags).
    expect(p).toMatch(/\\[SR\\] v2\\.46\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1645 unit \\(101 files, \\+23\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.47\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1668 unit \\(102 files, \\+23\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.48\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1686 unit \\(103 files, \\+18\\)/);""",
    """    // Session-252 (R-49): the structural leg's third gate-enforced
    // ride — the v2.49.0 block lands below together with the trio's
    // advance to v2.47.0/v2.48.0/v2.49.0 in the SAME commit (the leg
    // derives the PAD's newest block at test time and fails the unit
    // gate if the window lags).
    expect(p).toMatch(/\\[SR\\] v2\\.47\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1668 unit \\(102 files, \\+23\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.48\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1686 unit \\(103 files, \\+18\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.49\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1704 unit \\(104 files, \\+18\\)/);""",
    "the guard trio advance",
)

# ---- 3. CLAUDE.md — the live-tense sites ----
sub(
    "CLAUDE.md",
    "- **The gate is the contract**: lint 0/0 · tsc 0 · 1686 unit · build ·\n  smoke 15/15 · 151 e2e.",
    "- **The gate is the contract**: lint 0/0 · tsc 0 · 1704 unit · build ·\n  smoke 15/15 · 152 e2e.",
    "CLAUDE gate contract",
)
sub("CLAUDE.md", "| `bun run test` | Unit suite (Vitest, 1686 checks) |", "| `bun run test` | Unit suite (Vitest, 1704 checks) |", "CLAUDE test row")
sub("CLAUDE.md", "| `CI=1 bun run test:e2e` | E2E suite (Playwright, 151 checks, own db + :3100) |", "| `CI=1 bun run test:e2e` | E2E suite (Playwright, 152 checks, own db + :3100) |", "CLAUDE e2e row")
sub("CLAUDE.md", "tests via fast-check. 1686 checks / 103 files.", "tests via fast-check. 1704 checks / 104 files.", "CLAUDE pyramid counts")
sub("CLAUDE.md", "151 checks / 7 specs. `playwright.config.ts` pins `db/e2e.db`, global", "152 checks / 7 specs. `playwright.config.ts` pins `db/e2e.db`, global", "CLAUDE e2e pyramid")

# ---- 4. README.md ----
sub("README.md", "[![Tests](https://img.shields.io/badge/tests-1837%20checks-brightgreen)](#testing)", "[![Tests](https://img.shields.io/badge/tests-1856%20checks-brightgreen)](#testing)", "README badge")
sub("README.md", "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1686 checks incl. property tests |", "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1704 checks incl. property tests |", "README stack table unit")
sub("README.md", "| E2E tests | Playwright + axe-core | 1.65.0 / 4.14.0 | 151 checks; chromium; seeded `db/e2e.db` |", "| E2E tests | Playwright + axe-core | 1.65.0 / 4.14.0 | 152 checks; chromium; seeded `db/e2e.db` |", "README stack table e2e")
sub("README.md", "| Unit (Vitest) | `bun run test` | 1686 checks / 103 files |", "| Unit (Vitest) | `bun run test` | 1704 checks / 104 files |", "README testing table unit")
sub("README.md", "| E2E (Playwright, chromium) | `CI=1 bun run test:e2e` | 151 checks / 7 specs — boots its own server on :3100 with `db/e2e.db` |", "| E2E (Playwright, chromium) | `CI=1 bun run test:e2e` | 152 checks / 7 specs — boots its own server on :3100 with `db/e2e.db` |", "README testing table e2e")
sub("README.md", "| Verification layer | ✅ Complete | 1686 unit · 151 e2e · 15 smoke · full gate green |", "| Verification layer | ✅ Complete | 1704 unit · 152 e2e · 15 smoke · full gate green |", "README verification row")

# ---- 5. AGENTS.md ----
sub("AGENTS.md", "| Unit tests (1686) | `bun run test` |", "| Unit tests (1704) | `bun run test` |", "AGENTS unit row")
sub("AGENTS.md", "| E2E (boots own server, 151) | `CI=1 bun run test:e2e` |", "| E2E (boots own server, 152) | `CI=1 bun run test:e2e` |", "AGENTS e2e row")

# ---- 6. wealth-os_SKILL.md ----
sub("wealth-os_SKILL.md", "layer (Vitest 1686 / Playwright 151 / smoke 15). Covers the design system,", "layer (Vitest 1704 / Playwright 152 / smoke 15). Covers the design system,", "SKILL head counts")
sub("wealth-os_SKILL.md", "| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 1686 checks / 103 files |", "| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 1704 checks / 104 files |", "SKILL stack unit")
sub("wealth-os_SKILL.md", "| E2E tests | `@playwright/test` + `axe-core` | 1.65.0 / 4.14.0 | Chromium; 151 checks / 7 specs; own db + port 3100 |", "| E2E tests | `@playwright/test` + `axe-core` | 1.65.0 / 4.14.0 | Chromium; 152 checks / 7 specs; own db + port 3100 |", "SKILL stack e2e")
sub("wealth-os_SKILL.md", "| Unit tests | `bun run test` (1686 checks) |", "| Unit tests | `bun run test` (1704 checks) |", "SKILL commands unit")
sub("wealth-os_SKILL.md", "- [ ] `bun run test` — 1686 passed / 103 files", "- [ ] `bun run test` — 1704 passed / 104 files", "SKILL checklist unit")

# ---- 7. PAD — the Unit row, the family row, the hierarchy line ----
sub("Project_Architecture_Document.md", "| Unit | 103 | 1686 | `tests/*.test.ts` | Vitest 5 + fast-check |", "| Unit | 104 | 1704 | `tests/*.test.ts` | Vitest 5 + fast-check |", "PAD Unit row")
sub(
    "Project_Architecture_Document.md",
    "| — architecture pins | 71 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, db-transient) | `tests/` | source-scanning contracts |",
    "| — architecture pins | 72 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, parity-252, db-transient) | `tests/` | source-scanning contracts |",
    "PAD architecture family row",
)
sub("Project_Architecture_Document.md", "├── tests/                       # 103 unit suites (incl. architecture pins) + e2e/ 7 specs", "├── tests/                       # 104 unit suites (incl. architecture pins) + e2e/ 7 specs", "PAD hierarchy line")

# ---- 8. PAD — the v2.49.0 revision block (newest-first) ----
sub(
    "Project_Architecture_Document.md",
    "- [SR] v2.48.0 (session 251, R-48 — the focus-ring, cli-anchor, and",
    """- [SR] v2.49.0 (session 252, R-49 — the list-focus-ring, resend-shape,
  and type-lag round): the fresh-eyes audit (three Mode-C passes — the
  R-48 cure surfaces driven by the session, the API/auth/security
  layer, and the UI/a11y/shell layer; 0 Critical / 0 High / 1 Medium /
  5 Low cured + 4 Informational cured-as-riders + 1 Informational
  registered after dedup, every material claim re-verified at
  file:line by the driving session, the contrast math re-computed by
  code; all eight R-48 cure surfaces verified holding; the API
  layer's fifth consecutive clean bill, independently re-derived; the
  Tailwind v4 standing-ask hunt clean on every audited axis). The
  round's flagship: THE LIST-ITEM KEYBOARD-FOCUS RING (F-252a — the
  Radix list-item families, the sidebar user-menu items and every
  Select option, indicated keyboard focus through a background wash
  computing 1.09:1 light / 1.31:1 dark against their panels — the
  only interactive families with the outline suppressed and no ring
  replacement, invisible to axe (focus visibility is not modeled)
  and to the sweeps (dialogs closed on settled pages); the keyboard
  ring arm joins the wash — the F-218i ring-ring ink at 17.49:1
  light / 18.15:1 dark — while the wash stays for pointer users,
  proven live by capture 208's computed-style read of rgb(245,245,244)
  over the stone-800 wash, and pinned by the e2e ring leg). Plus: THE
  RESEND SHAPE ORACLE (F-252b — the miss arm's two-key envelope vs
  the known arm's three-key form was a never-verified-state
  enumeration signal that survived the production OTP knob; both arms
  are three-key now, the forgot-password always-present-key form,
  proven live by capture 209's probe); THE DASHBOARD USER TYPE LAG
  (F-252c — the wire type widens to User and the store's two upcasts
  retire, closing the narrowing trap at the type level); THE PALETTE
  CENSUS TRAILING-COMMENT ARM (F-252d — the strip completes with the
  URL-colon exemption; the docblock's undercount-only guarantee is
  true again); THE THEME-BLIND SCROLLBAR (F-252e — the .dark arm at
  3.91:1, proven live by capture 210); THE LATENT RING-OFFSET ARMS
  (F-252f — the tabs underline variant and the badge gain the offset
  token before a first consumer can ship the halo). Riders: the
  vestigial dark-wash literal retirement (F-252g — the token flip
  alone carries the shell wash, proven live by capture 211), the red
  over-budget meter register note (F-252h — 3.0:1, exactly at the
  bar), the e2e-pin prose truths (F-252i), and the un-messaged Zod
  fields (F-252j — the house copy reaches the three bare fields).
  Registered, not cured: the useTheme no-provider fallback divergence
  (F-252k — zero live consumers, a product decision). The
  verification: lint 0/0 · tsc 0 · 1704 unit (104 files, +18) ·
  build · smoke 15/15 · 152 e2e (+1, the F-252a ring leg) · the six
  parity drift gates CLEAN at 0.5pct margin · census MATCH · the
  captures 207-211 (the own-database convention + the census
  tripwire).
- [SR] v2.48.0 (session 251, R-48 — the focus-ring, cli-anchor, and""",
    "the PAD v2.49.0 revision block",
)

# ---- 9. the README program row (R-49 prepended, R-48 demoted to history) ----
sub(
    "README.md",
    "| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 251: **R-48 shipped — the focus-ring, cli-anchor, and settings-flag round**:",
    """| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 252: **R-49 shipped — the list-focus-ring, resend-shape, and type-lag round**: the fresh-eyes audit (three Mode-C passes — the R-48 cure surfaces · the API/auth/security layer · the UI/a11y/shell layer — 0 Critical / 0 High / 1 Medium / 5 Low cured + 4 Informational cured-as-riders + 1 Informational registered after dedup, every material claim re-verified at file:line, the contrast math re-computed by code; all eight R-48 cure surfaces holding; the API layer's fifth consecutive clean bill; the Tailwind v4 token discipline clean on every audited axis); the flagship **list-item keyboard-focus ring** (F-252a — the sidebar user-menu items and every Select option indicated keyboard focus through a wash computing 1.09:1 light / 1.31:1 dark; the keyboard ring arm joins the wash at 17.49:1/18.15:1, proven live by capture 208's computed-style read + the e2e ring leg); the **resend shape oracle** (F-252b — the miss arm joins the known arm's three-key envelope, the key-set enumeration signal closed, proven live); the **dashboard user type lag** (F-252c — the wire type widens to User, the store's two upcasts retire); the **palette census trailing-comment arm** (F-252d — URL-colon exempt, completing the F-251f genus); the **theme-blind scrollbar dark arm** (F-252e — 3.91:1, proven live); the **latent ring-offset arms** (F-252f — the tabs underline variant + the badge); plus riders: the **vestigial dark-wash literal retirement** (F-252g — the token flip alone carries the wash, proven live), the **red over-budget meter register note** (F-252h — 3.0:1), the **e2e-pin prose truths** (F-252i), and the **un-messaged Zod fields** (F-252j). Registered: F-252k (the useTheme fallback divergence). Gate: lint 0/0 · tsc 0 · **1704 unit / 104 files** · build · smoke 15/15 · 152 e2e · the six parity drift gates CLEAN at 0.5pct · census MATCH · captures 207-211) — the prior rounds' summary follows: (session 251: **R-48 shipped — the focus-ring, cli-anchor, and settings-flag round**:""",
    "the README program row",
)

# ---- 10. the plan's R-49 closure + the §5 execution-history row ----
sub(
    "docs/remediation_plan_v2.md",
    "### R-49 — The list-focus-ring, resend-shape, and type-lag round (session 252) — Status: In progress (planned; executed this session)",
    "### R-49 — The list-focus-ring, resend-shape, and type-lag round (session 252) — Status: Done(v2.49.0) — SHIPPED (lint 0/0 · tsc 0 · 1704 unit (104 files, +18) · build · smoke 15/15 · 152 e2e (+1, the ring leg) · the six parity drift gates CLEAN at 0.5pct · census MATCH · the captures 207-211 · the docs lockstep complete)",
    "the plan R-49 closure",
)

sub(
    "docs/remediation_plan_v2.md",
    "| Version | Session | R-items executed | Gate at ship | Commit |\n|---|---|---|---|---|\n| v2.48.0 | 251 |",
    """| Version | Session | R-items executed | Gate at ship | Commit |
|---|---|---|---|---|
| v2.49.0 | 252 | **R-49** (the list-focus-ring, resend-shape, and type-lag round — findings-led, the standing directive with the reference STABLE on every standing drift layer (the bundle md5, the F-250q stylesheet fingerprint, the demo data zero, the desktop nav 256/9, the TRUE-390 menu census) and the mobile-navigation ask verified on BOTH sides at TRUE 390×844 through agent-browser (the reference's drawer and ours each open with the same 9 destinations + Sign Out and close on the toggle; ours adds the labeled superset); the cold baseline GREEN at HEAD 04fd4f6 — the v2.48.0 ship state reproduced (one transient timing-leg e2e failure on the first run, the known flake family; two consecutive green runs after); the chromium-1254 install the one toolchain step). The audit round first: the standing layers re-verified (probe:ref STABLE; `bun audit` unchanged (1 moderate dev-chain minimatch, the documented deferral); neo-crm unchanged (b3d0fbe) — nothing to port; the SEO surface verified (smoke leg 12); the .env contract + the db/ at the repo root + the vitest/playwright configs + the .env.example six-knob set all standing). The session-252 fresh-eyes audit (three Mode-C passes: the R-48 cure surfaces · the API/auth/security layer · the UI/a11y/shell layer — 0 Critical / 0 High / 1 Medium / 5 Low cured + 4 Informational cured-as-riders + 1 Informational registered after dedup, every material claim re-verified at file:line by the driving session, the contrast math re-computed by code; all eight R-48 cure surfaces verified holding; the API layer's fifth consecutive clean bill; the Tailwind v4 hunt clean on every audited axis). The plan v2.49.0 written and validated against the tree. **R-49.1** the pins born RED (honest RED: 18 — the parity-252 source battery) → **R-49.2** the cures (THE LIST-ITEM KEYBOARD-FOCUS RING — the flagship; THE RESEND SHAPE ORACLE; THE DASHBOARD USER TYPE LAG; THE PALETTE CENSUS TRAILING-COMMENT ARM; THE THEME-BLIND SCROLLBAR DARK ARM; THE LATENT RING-OFFSET ARMS; riders: THE VESTIGIAL DARK-WASH LITERAL RETIREMENT, THE RED METER REGISTER NOTE, THE E2E-PIN PROSE TRUTHS, THE UN-MESSAGED ZOD FIELDS) + five comment rewords the nets caught mid-cure (the F-229d discipline: four hyphenated coins + the pinned-phrase wrap; the parity-243 phrase-split catch) → **R-49.3** the verification (lint 0/0 · tsc 0 · 1704 unit (104 files, +18) · build · smoke 15/15 · 152 e2e (+1, the F-252a ring leg — the stale-artifact lesson re-learned: the e2e boots the standalone build, rebuild before the leg) · the six parity drift gates CLEAN at 0.5pct margin · census MATCH · the captures 207-211: the mobile drawer at 390 (the standing ask), the keyboard-ring face (computed rgb(245,245,244) over the stone-800 wash — the flagship proven live), the resend three-key face (verificationCode present and null), the scrollbar dark arm (rgb(120,113,108)), the shell wash face (rgb(14,19,16) on the token flip alone)). The docs lockstep complete (the PAD v2.49.0 block + the trio's gate-enforced advance to v2.47.0/v2.48.0/v2.49.0 + the §7.1 family rows 71→72 with parity-252 listed + the arithmetic 4+72+28=104 + the README badge 1837→1856 + the program row + AGENTS/CLAUDE/SKILL counts + the plan closure + the worklog + docs/session_87.md). | lint 0/0 · tsc 0 · **1704 unit (104 files, +18)** · build · smoke 15/15 · **152 e2e** · six drift gates CLEAN (0.5pct) · census MATCH | (this session's execution commit) |
| v2.48.0 | 251 |""",
    "the §5 execution-history row",
)

print("docs lockstep complete")
