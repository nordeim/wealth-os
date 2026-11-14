#!/usr/bin/env python3
"""Session-245 (R-42) docs lockstep — the live-tense count re-pin.

House convention (the F-242j discipline): every replacement is scoped to a
unique anchor, asserts the OLD form exactly once inside the slice before
writing, and never touches HISTORICAL count mentions (the PAD revision
blocks at their own ship counts, the §5 execution rows, the session
records). The F-245c lesson's own cure: the PAD hierarchy leg rides here
as a structural pin already verified by tests/docs-counts.test.ts — a
lockstep script that drops a leg fails the gate instead of silently
rotting the doc. Idempotent: a second run finds the new form and skips.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def repin(rel: str, old: str, new: str) -> int:
    p = ROOT / rel
    src = p.read_text(encoding="utf-8")
    if old not in src:
        if new in src:
            return 0  # already re-pinned (idempotent skip)
        raise AssertionError(f"{rel}: neither the old form ({old!r}) nor the new form found")
    n = src.count(old)
    assert n == 1, f"{rel}: the old form ({old!r}) appears {n}x (expected a unique live-tense site)"
    p.write_text(src.replace(old, new, 1), encoding="utf-8")
    return 1


changes = 0

# ---- README.md ---------------------------------------------------------------
changes += repin("README.md", "tests-1731%20checks-brightgreen", "tests-1742%20checks-brightgreen")
changes += repin("README.md", "1581 checks incl. property tests", "1591 checks incl. property tests")
changes += repin("README.md", "| Unit (Vitest) | `bun run test` | 1581 checks / 95 files |", "| Unit (Vitest) | `bun run test` | 1591 checks / 96 files |")
changes += repin("README.md", "1581 unit · 150 e2e · 15 smoke · full gate green", "1591 unit · 151 e2e · 15 smoke · full gate green")
changes += repin("README.md", "# 95 unit suites + 📂 e2e/ 7 specs", "# 96 unit suites + 📂 e2e/ 7 specs")
changes += repin("README.md", "| 150 checks; chromium; seeded `db/e2e.db` |", "| 151 checks; chromium; seeded `db/e2e.db` |")
changes += repin("README.md", "| 150 checks / 7 specs — boots its own server", "| 151 checks / 7 specs — boots its own server")

# ---- AGENTS.md ----------------------------------------------------------------
changes += repin("AGENTS.md", "| Unit tests (1581) | `bun run test` |", "| Unit tests (1591) | `bun run test` |")
changes += repin("AGENTS.md", "| E2E (boots own server, 150) |", "| E2E (boots own server, 151) |")

# ---- CLAUDE.md -----------------------------------------------------------------
changes += repin("CLAUDE.md", "lint 0/0 · tsc 0 · 1581 unit · build ·", "lint 0/0 · tsc 0 · 1591 unit · build ·")
changes += repin("CLAUDE.md", "| `bun run test` | Unit suite (Vitest, 1581 checks) |", "| `bun run test` | Unit suite (Vitest, 1591 checks) |")
changes += repin("CLAUDE.md", "tests via fast-check. 1581 checks / 95 files.", "tests via fast-check. 1591 checks / 96 files.")
changes += repin("CLAUDE.md", "smoke 15/15 · 150 e2e. A green gate", "smoke 15/15 · 151 e2e. A green gate")
changes += repin("CLAUDE.md", "E2E suite (Playwright, 150 checks, own db + :3100)", "E2E suite (Playwright, 151 checks, own db + :3100)")
changes += repin("CLAUDE.md", "150 checks / 7 specs. `playwright.config.ts`", "151 checks / 7 specs. `playwright.config.ts`")

# ---- wealth-os_SKILL.md ----------------------------------------------------------
changes += repin("wealth-os_SKILL.md", "layer (Vitest 1581 / Playwright 150 / smoke 15).", "layer (Vitest 1591 / Playwright 151 / smoke 15).")
changes += repin("wealth-os_SKILL.md", "jsdom-free; 1581 checks / 95 files |", "jsdom-free; 1591 checks / 96 files |")
changes += repin("wealth-os_SKILL.md", "| Unit tests | `bun run test` (1581 checks) |", "| Unit tests | `bun run test` (1591 checks) |")
changes += repin("wealth-os_SKILL.md", "- [ ] `bun run test` — 1581 passed / 95 files", "- [ ] `bun run test` — 1591 passed / 96 files")
changes += repin("wealth-os_SKILL.md", "Chromium; 150 checks / 7 specs; own db + port 3100", "Chromium; 151 checks / 7 specs; own db + port 3100")
changes += repin("wealth-os_SKILL.md", "| E2E (boots own server) | `CI=1 bun run test:e2e` (150 checks) |", "| E2E (boots own server) | `CI=1 bun run test:e2e` (151 checks) |")
changes += repin("wealth-os_SKILL.md", "- [ ] `CI=1 bun run test:e2e` — 150/150 (7 specs)", "- [ ] `CI=1 bun run test:e2e` — 151/151 (7 specs)")

# ---- Project_Architecture_Document.md (live-tense sites only; the
#      v2.41.0/v2.40.0/v2.39.0 revision blocks keep their own ship counts
#      — HISTORICAL; the §7.1 rows and hierarchy line were corrected in
#      the F-245c/F-245d cures) -----------------------------------------------
changes += repin("Project_Architecture_Document.md", "→ vitest (1581) → `next build`", "→ vitest (1591) → `next build`")
changes += repin("Project_Architecture_Document.md", "`bun run test` → 1581/1581 (counts re-pinned if tests added/removed)", "`bun run test` → 1591/1591 (counts re-pinned if tests added/removed)")
changes += repin("Project_Architecture_Document.md", "| `bun run test` / `CI=1 bun run test:e2e` | root | 1581 unit / 150 e2e |", "| `bun run test` / `CI=1 bun run test:e2e` | root | 1591 unit / 151 e2e |")
changes += repin("Project_Architecture_Document.md", "(lint 0/0 · tsc 0 · 1581 unit · build · smoke 15/15 ·", "(lint 0/0 · tsc 0 · 1591 unit · build · smoke 15/15 ·")
changes += repin("Project_Architecture_Document.md", "`CI=1 bun run test:e2e` → 150/150", "`CI=1 bun run test:e2e` → 151/151")
changes += repin("Project_Architecture_Document.md", "150 e2e).\n", "151 e2e).\n")
changes += repin("Project_Architecture_Document.md", "Playwright e2e (150) against a pinned `db/e2e.db`.", "Playwright e2e (151) against a pinned `db/e2e.db`.")

# ---- tests/docs-counts.test.ts (the live constants; the badge derives) ---------
changes += repin("tests/docs-counts.test.ts", "const UNIT_TOTAL = 1581;", "const UNIT_TOTAL = 1591;")
changes += repin("tests/docs-counts.test.ts", "const TEST_FILES = 95;", "const TEST_FILES = 96;")
changes += repin("tests/docs-counts.test.ts", "const E2E_TOTAL = 150;", "const E2E_TOTAL = 151;")

print(f"docs-245-lockstep.py: {changes} live-tense site(s) re-pinned (1581→1591 / 95→96 / 150→151 / badge 1731→1742)")
