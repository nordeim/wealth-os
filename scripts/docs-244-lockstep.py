#!/usr/bin/env python3
"""Session-244 (R-41) docs lockstep — the live-tense count re-pin.

House convention (the F-242j discipline): every replacement is scoped to a
unique anchor, asserts the OLD form exactly once inside the slice before
writing, and never touches HISTORICAL count mentions (the PAD revision
blocks at their own ship counts, the §5 execution rows, the session
records). Idempotent: a second run finds the new form and skips.
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
changes += repin("README.md", "tests-1702%20checks-brightgreen", "tests-1731%20checks-brightgreen")
changes += repin("README.md", "1552 checks incl. property tests", "1581 checks incl. property tests")
changes += repin("README.md", "| Unit (Vitest) | `bun run test` | 1552 checks / 93 files |", "| Unit (Vitest) | `bun run test` | 1581 checks / 95 files |")
changes += repin("README.md", "1552 unit · 150 e2e · 15 smoke · full gate green", "1581 unit · 150 e2e · 15 smoke · full gate green")
changes += repin("README.md", "# 93 unit suites + 📂 e2e/ 7 specs", "# 95 unit suites + 📂 e2e/ 7 specs")

# ---- AGENTS.md ----------------------------------------------------------------
changes += repin("AGENTS.md", "| Unit tests (1552) | `bun run test` |", "| Unit tests (1581) | `bun run test` |")

# ---- CLAUDE.md -----------------------------------------------------------------
changes += repin("CLAUDE.md", "lint 0/0 · tsc 0 · 1552 unit · build ·", "lint 0/0 · tsc 0 · 1581 unit · build ·")
changes += repin("CLAUDE.md", "| `bun run test` | Unit suite (Vitest, 1552 checks) |", "| `bun run test` | Unit suite (Vitest, 1581 checks) |")
changes += repin("CLAUDE.md", "tests via fast-check. 1552 checks / 93 files.", "tests via fast-check. 1581 checks / 95 files.")

# ---- wealth-os_SKILL.md ----------------------------------------------------------
changes += repin("wealth-os_SKILL.md", "layer (Vitest 1552 / Playwright 150 / smoke 15).", "layer (Vitest 1581 / Playwright 150 / smoke 15).")
changes += repin("wealth-os_SKILL.md", "jsdom-free; 1552 checks / 93 files |", "jsdom-free; 1581 checks / 95 files |")
changes += repin("wealth-os_SKILL.md", "| Unit tests | `bun run test` (1552 checks) |", "| Unit tests | `bun run test` (1581 checks) |")
changes += repin("wealth-os_SKILL.md", "- [ ] `bun run test` — 1552 passed / 93 files", "- [ ] `bun run test` — 1581 passed / 95 files")

# ---- Project_Architecture_Document.md (live-tense sites only; the v2.40.0
#      revision block at PAD:63 keeps its own ship counts — HISTORICAL) -----------
changes += repin("Project_Architecture_Document.md", "→ vitest (1552) → `next build`", "→ vitest (1581) → `next build`")
changes += repin("Project_Architecture_Document.md", "| Unit | 93 | 1552 | `tests/*.test.ts` | Vitest 5 + fast-check |", "| Unit | 95 | 1581 | `tests/*.test.ts` | Vitest 5 + fast-check |")
changes += repin("Project_Architecture_Document.md", "`bun run test` → 1552/1552 (counts re-pinned if tests added/removed)", "`bun run test` → 1581/1581 (counts re-pinned if tests added/removed)")
changes += repin("Project_Architecture_Document.md", "| `bun run test` / `CI=1 bun run test:e2e` | root | 1552 unit / 150 e2e |", "| `bun run test` / `CI=1 bun run test:e2e` | root | 1581 unit / 150 e2e |")
changes += repin("Project_Architecture_Document.md", "(lint 0/0 · tsc 0 · 1552 unit · build · smoke 15/15 ·", "(lint 0/0 · tsc 0 · 1581 unit · build · smoke 15/15 ·")

# ---- tests/docs-counts.test.ts (the live constants; the badge derives) ---------
changes += repin("tests/docs-counts.test.ts", "const UNIT_TOTAL = 1552;", "const UNIT_TOTAL = 1581;")
changes += repin("tests/docs-counts.test.ts", "const TEST_FILES = 93;", "const TEST_FILES = 95;")

print(f"docs-244-lockstep.py: {changes} live-tense site(s) re-pinned (1552→1581 / 93→95 / badge 1702→1731)")
