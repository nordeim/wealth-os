#!/usr/bin/env python3
"""Session-248 (R-45) docs lockstep — the count + status + revision-block pass.

House convention (the F-242j lesson, scoped to LIVE-TENSE sites only):
every replacement is a unique-anchor assert; HISTORICAL count mentions
(the [SR] revision blocks, worklog entries, session logs) keep the
counts that were true at their time. Idempotent: a second run finds
the new forms and skips.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def edit(rel: str, pairs: list[tuple[str, str]], count_edits: int) -> int:
    p = ROOT / rel
    src = p.read_text(encoding="utf-8")
    done = 0
    for old, new in pairs:
        if new in src and old not in src:
            done += 1
            continue
        assert src.count(old) == 1, f"{rel}: anchor not found exactly once: {old[:70]!r} ({src.count(old)})"
        src = src.replace(old, new, 1)
        done += 1
    p.write_text(src, encoding="utf-8")
    assert done == count_edits, f"{rel}: {done}/{count_edits} edits"
    return done


total = 0

# 1. tests/docs-counts.test.ts — the constants + the arch row + the comment.
total += edit(
    "tests/docs-counts.test.ts",
    [
        ("const UNIT_TOTAL = 1610;", "const UNIT_TOTAL = 1622;"),
        ("const TEST_FILES = 98;", "const TEST_FILES = 99;"),
        (
            "    // Session-247 (R-44): parity-247 joins the architecture family\n"
            "    // (66 → 67; the two auth.test.ts iat legs add tests inside an\n"
            "    // existing domain file, no new row): 4 + 67 + 27 = 98.",
            "    // Session-247 (R-44): parity-247 joins the architecture family\n"
            "    // (66 → 67; the two auth.test.ts iat legs add tests inside an\n"
            "    // existing domain file, no new row): 4 + 67 + 27 = 98.\n"
            "    // Session-248 (R-45): parity-248 joins the architecture family\n"
            "    // (67 → 68; the toast-anatomy/parity-247 recalibrations edit\n"
            "    // tests inside existing family files, no new rows): 4 + 68 +\n"
            "    // 27 = 99.",
        ),
        (
            '"| — architecture pins | 67 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, db-transient) |",',
            '"| — architecture pins | 68 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, db-transient) |",',
        ),
    ],
    4,
)

# 2. CLAUDE.md — the gate line + the two table/pyramid sites.
total += edit(
    "CLAUDE.md",
    [
        (
            "- **The gate is the contract**: lint 0/0 · tsc 0 · 1610 unit · build ·\n  smoke 15/15 · 151 e2e.",
            "- **The gate is the contract**: lint 0/0 · tsc 0 · 1622 unit · build ·\n  smoke 15/15 · 151 e2e.",
        ),
        ("| `bun run test` | Unit suite (Vitest, 1610 checks) |", "| `bun run test` | Unit suite (Vitest, 1622 checks) |"),
        ("tests via fast-check. 1610 checks / 98 files.", "tests via fast-check. 1622 checks / 99 files."),
    ],
    3,
)

# 3. README.md — the badge + the four count sites + the program row rewrite.
readme_row_old = None
readme = (ROOT / "README.md").read_text(encoding="utf-8")
for line in readme.splitlines():
    if line.startswith("| Remediation program |"):
        readme_row_old = line
        break
assert readme_row_old is not None, "README program row not found"
readme_row_new = (
    "| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 248: **R-45 shipped — the guard-advance, pause-composition, and write-path-select round**: the fresh-eyes audit (three Mode-C passes — the R-44 cure surfaces · the API/auth/security layer · the UI/a11y/shell layer — 0 Critical / 0 High / 0 Medium / 6 Low / 8 Informational NEW after dedup, every material claim re-verified at file:line; all six R-44 cure surfaces holding — the guard advance aged out by its own ship again, the F-243b/F-244a genus's SIXTH recurrence); the cold baseline GREEN at HEAD 02a4ae7 (the v2.44.0 ship state reproduced exactly); the reference STABLE on every drift layer incl. the TRUE-390 mobile menu with 9 destinations); the flagship **toast pause composition** (F-248b — the F-247c cure shared one paused boolean between the hover and focus pairs, so a pointer leaving the card un-paused the timer while keyboard focus still sat on the Dismiss button; hover and focus are now independent flags OR-composed, **proven live by the captures face**: the focused toast survived a pointer enter-and-exit at 4.6s past the exit, then dismissed ~4s after the blur); the **guard-trio advance** (F-248a — v2.42.0/v2.43.0/v2.44.0, green-by-design FIRST, the F-244a rule executed before its own lockstep); the **import Discard commit-window guard** (F-248c — the Step 2 Discard button rides disabled through the import POST, closing the implied-cancellation window the F-247e input rider never covered — asserted live mid-commit under a held POST); the **seven sibling walker jsx completions** (F-248d — parity-230/231/232/233/240/241 and gate-script's src walkers admit the nine .jsx bridges per the F-243d doctrine); the **auth-family write-path selects** (F-248e — the five updates that returned full rows — logout, forgot-password, verify ×2, resend — select only their consumed fields, the F-228h insurance doctrine completed on the write path); and the **logout clear envelope rider** (F-248g — the final cookie clear joins the envelope with its own minimal arm). Registered, not cured: F-248f (the remount-hydrate stale-read leg) + F-248h-n, plus the standing families. Gate: lint 0/0 · tsc 0 · **1622 unit / 99 files** · build · smoke 15/15 · 151 e2e · all six parity drift gates CLEAN (0-event margin) · census MATCH · captures 191-193) |"
)
total += edit(
    "README.md",
    [
        ("tests-1761%20checks", "tests-1773%20checks"),
        ("| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1610 checks incl. property tests |", "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1622 checks incl. property tests |"),
        ("├── 📂 tests/                  # 98 unit suites + 📂 e2e/ 7 specs", "├── 📂 tests/                  # 99 unit suites + 📂 e2e/ 7 specs"),
        ("| Unit (Vitest) | `bun run test` | 1610 checks / 98 files |", "| Unit (Vitest) | `bun run test` | 1622 checks / 99 files |"),
        ("| Verification layer | ✅ Complete | 1610 unit · 151 e2e · 15 smoke · full gate green |", "| Verification layer | ✅ Complete | 1622 unit · 151 e2e · 15 smoke · full gate green |"),
        (readme_row_old, readme_row_new),
    ],
    6,
)

# 4. AGENTS.md — the commands table count.
total += edit(
    "AGENTS.md",
    [
        ("| Unit tests (1610) | `bun run test` |", "| Unit tests (1622) | `bun run test` |"),
    ],
    1,
)

# 5. wealth-os_SKILL.md — the header + the three table/checklist sites.
total += edit(
    "wealth-os_SKILL.md",
    [
        ("layer (Vitest 1610 / Playwright 151 / smoke 15). Covers the design system,", "layer (Vitest 1622 / Playwright 151 / smoke 15). Covers the design system,"),
        ("| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 1610 checks / 98 files |", "| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 1622 checks / 99 files |"),
        ("| Unit tests | `bun run test` (1610 checks) |", "| Unit tests | `bun run test` (1622 checks) |"),
        ("- [ ] `bun run test` — 1610 passed / 98 files", "- [ ] `bun run test` — 1622 passed / 99 files"),
    ],
    4,
)

# 6. PAD — the six live-tense sites + the arch row + the v2.45.0 block.
pad_arch_old = None
pad = (ROOT / "Project_Architecture_Document.md").read_text(encoding="utf-8")
for line in pad.splitlines():
    if line.startswith("| — architecture pins | 67 |"):
        pad_arch_old = line
        break
assert pad_arch_old is not None, "PAD arch row not found"
pad_arch_new = pad_arch_old.replace("| — architecture pins | 67 |", "| — architecture pins | 68 |", 1).replace(
    "parity-247, db-transient)", "parity-247, parity-248, db-transient)", 1
)

pad_block = """- [SR] v2.45.0 (session 248, R-45 — the guard-advance, pause-composition,
  and write-path-select round): the fresh-eyes audit (three Mode-C
  passes — the R-44 cure surfaces driven by the session, the
  API/auth/security layer, and the UI/a11y/shell layer; 0 Critical /
  0 High / 0 Medium / 6 Low / 8 Informational NEW after dedup, every
  material claim re-verified at file:line by the driving session; all
  six R-44 cure surfaces verified holding — the guard advance itself
  aged out by one block again, the F-243b/F-244a genus's SIXTH
  edition, cured first per its own rule; the API layer clean again —
  owner-scoping, Zod, buckets, injection, enumeration, session,
  errors, secrets all clean, the negative results recorded; the UI
  layer clean, with the composed-pause and store stale-read edges
  surfaced by the pass). The round's flagship: THE TOAST PAUSE
  COMPOSITION (F-248b — the F-247c cure shared ONE paused boolean
  between the hover and focus pairs, so a pointer leaving the card
  un-paused the timer while keyboard focus still sat on the Dismiss
  button — the mixed-modality arm re-opening the exact 4s
  death-with-focus the cure targeted; hover and focus became
  independent state flags OR-composed into the paused the timer
  reads; the captures face proved it live: the focused toast
  survived a pointer enter-and-exit at 4.6s past the exit, then
  dismissed ~4s after the blur). Plus: THE GUARD-TRIO ADVANCE
  (F-248a — v2.42.0/v2.43.0/v2.44.0, green-by-design before this
  session's own lockstep pass, the parity-243 mirror recalibrated
  same-commit); THE IMPORT DISCARD COMMIT-WINDOW GUARD (F-248c — the
  Step 2 Discard button rides disabled through the import POST,
  closing the implied-cancellation window the F-247e input rider
  never covered — asserted live mid-commit under a held POST); THE
  SEVEN SIBLING WALKER JSX COMPLETIONS (F-248d — the parity-230/
  231/232/233/240/241 and gate-script src walkers admit the nine
  .jsx bridges per the F-243d whole-tree doctrine, green-by-design
  over the re-export-only bridges); THE AUTH-FAMILY WRITE-PATH
  SELECTS (F-248e — the five updates that returned full rows —
  logout, forgot-password, verify's counter and success-path clear,
  resend's rotation — select only their consumed fields, the F-228h
  insurance doctrine completed on the write path); and THE LOGOUT
  CLEAR ENVELOPE RIDER (F-248g — the final cookie clear joins the
  envelope with its own minimal arm answering the completed
  sign-out). Registered, not cured: the remount-hydrate stale-read
  leg (F-248f — Reasoned; its own round, the fetch-coordination
  design must re-validate the wall machinery with it), the login
  mint version window (F-248h — the F-239p genus at its login
  sibling), the app-side pending-face gap (F-248i), the settings
  switch description association (F-248j), the expenses filter
  result silence (F-248k — the parity posture), the login-card
  banner timing (F-248l — parity-pinned), the transaction
  account-check full rows (F-248m), and the iat finite rider's
  unreachable-by-construction note (F-248n), plus the standing
  families (F-247g-l, F-246g/h, F-245g/h, F-244i-n, F-242h/i,
  F-240k-n, F-239l-s).
  The verification: lint 0/0 · tsc 0 · 1622 unit (99 files, +12) ·
  build · smoke 15/15 · 151 e2e · ALL SIX parity drift gates CLEAN —
  the standing allowances held UNMOVED (the round's surfaces are a
  client-side state composition on a transient surface, an
  attribute-only disable rider, test-walker widenings, select
  narrowing, and a catch-arm addition — pixel-invisible by
  construction) · census MATCH · `bun audit` unchanged ·
  docs-counts 16/16 · captures 191-193 (the mobile drawer at 390 —
  the standing operator ask; the composed-pause face — the focused
  toast alive 4.6s past a pointer exit, dismissed after the blur;
  the import Discard rider — the button disabled mid-commit under a
  held POST, the import landing on release).

"""
total += edit(
    "Project_Architecture_Document.md",
    [
        ("  → vitest (1610) → `next build` → the 15-assertion smoke ladder on the", "  → vitest (1622) → `next build` → the 15-assertion smoke ladder on the"),
        ("├── tests/                       # 98 unit suites (incl. architecture pins) + e2e/ 7 specs", "├── tests/                       # 99 unit suites (incl. architecture pins) + e2e/ 7 specs"),
        ("| Unit | 98 | 1610 | `tests/*.test.ts` | Vitest 5 + fast-check |", "| Unit | 99 | 1622 | `tests/*.test.ts` | Vitest 5 + fast-check |"),
        (pad_arch_old, pad_arch_new),
        ("- [ ] `bun run test` → 1610/1610 (counts re-pinned if tests added/removed)", "- [ ] `bun run test` → 1622/1622 (counts re-pinned if tests added/removed)"),
        ("| `bun run test` / `CI=1 bun run test:e2e` | root | 1610 unit / 151 e2e |", "| `bun run test` / `CI=1 bun run test:e2e` | root | 1622 unit / 151 e2e |"),
        ("the time of writing (lint 0/0 · tsc 0 · 1610 unit · build · smoke 15/15 ·", "the time of writing (lint 0/0 · tsc 0 · 1622 unit · build · smoke 15/15 ·"),
        ("- [SR] v2.44.0 (session 247, R-44 — the guard-advance, iat-bound, and", pad_block + "- [SR] v2.44.0 (session 247, R-44 — the guard-advance, iat-bound, and"),
    ],
    8,
)

# 7. The plan close: R-45 → Done + the §5 gate column at the real counts.
total += edit(
    "docs/remediation_plan_v2.md",
    [
        (
            "### R-45 — The guard-advance, pause-composition, and write-path-select round (session 248) — Status: In progress",
            "### R-45 — The guard-advance, pause-composition, and write-path-select round (session 248) — Status: Done(v2.45.0)",
        ),
        (
            "→ **R-45.3** the verification (the full gate + the six drift gates CLEAN + census MATCH + the captures + the docs lockstep) | (filled at close) |",
            "→ **R-45.3** the verification (the full gate + the six drift gates CLEAN + census MATCH + the captures + the docs lockstep) | lint 0/0 · tsc 0 · **1622 unit (99 files, +12)** · build · smoke 15/15 · **151 e2e** · six drift gates CLEAN (0-event margin) · census MATCH |",
        ),
    ],
    2,
)

print(f"docs lockstep: {total} live-tense edits across 7 files")
