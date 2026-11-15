#!/usr/bin/env python3
"""Session-246 (R-43) docs lockstep — the live-tense count re-pin.

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
changes += repin("README.md", "tests-1742%20checks-brightgreen", "tests-1752%20checks-brightgreen")
changes += repin("README.md", "1591 checks incl. property tests", "1601 checks incl. property tests")
changes += repin("README.md", "| Unit (Vitest) | `bun run test` | 1591 checks / 96 files |", "| Unit (Vitest) | `bun run test` | 1601 checks / 97 files |")
changes += repin("README.md", "1591 unit · 151 e2e · 15 smoke · full gate green", "1601 unit · 151 e2e · 15 smoke · full gate green")
changes += repin("README.md", "# 96 unit suites + 📂 e2e/ 7 specs", "# 97 unit suites + 📂 e2e/ 7 specs")

# ---- AGENTS.md ---------------------------------------------------------------
changes += repin("AGENTS.md", "| Unit tests (1591) | `bun run test` |", "| Unit tests (1601) | `bun run test` |")

# ---- CLAUDE.md ---------------------------------------------------------------
changes += repin("CLAUDE.md", "lint 0/0 · tsc 0 · 1591 unit · build ·", "lint 0/0 · tsc 0 · 1601 unit · build ·")
changes += repin("CLAUDE.md", "| `bun run test` | Unit suite (Vitest, 1591 checks) |", "| `bun run test` | Unit suite (Vitest, 1601 checks) |")
changes += repin("CLAUDE.md", "tests via fast-check. 1591 checks / 96 files.", "tests via fast-check. 1601 checks / 97 files.")

# ---- wealth-os_SKILL.md --------------------------------------------------------
changes += repin("wealth-os_SKILL.md", "layer (Vitest 1591 / Playwright 151 / smoke 15).", "layer (Vitest 1601 / Playwright 151 / smoke 15).")
changes += repin("wealth-os_SKILL.md", "jsdom-free; 1591 checks / 96 files |", "jsdom-free; 1601 checks / 97 files |")
changes += repin("wealth-os_SKILL.md", "| Unit tests | `bun run test` (1591 checks) |", "| Unit tests | `bun run test` (1601 checks) |")
changes += repin("wealth-os_SKILL.md", "- [ ] `bun run test` — 1591 passed / 96 files", "- [ ] `bun run test` — 1601 passed / 97 files")

# ---- Project_Architecture_Document.md ------------------------------------------
changes += repin("Project_Architecture_Document.md", "→ vitest (1591) → `next build`", "→ vitest (1601) → `next build`")
changes += repin("Project_Architecture_Document.md", "`bun run test` → 1591/1591 (counts re-pinned if tests added/removed)", "`bun run test` → 1601/1601 (counts re-pinned if tests added/removed)")
changes += repin("Project_Architecture_Document.md", "| `bun run test` / `CI=1 bun run test:e2e` | root | 1591 unit / 151 e2e |", "| `bun run test` / `CI=1 bun run test:e2e` | root | 1601 unit / 151 e2e |")
changes += repin("Project_Architecture_Document.md", "(lint 0/0 · tsc 0 · 1591 unit · build · smoke 15/15 ·", "(lint 0/0 · tsc 0 · 1601 unit · build · smoke 15/15 ·")
changes += repin("Project_Architecture_Document.md", "| Unit | 96 | 1591 |", "| Unit | 97 | 1601 |")
changes += repin("Project_Architecture_Document.md", "# 96 unit suites (incl. architecture pins) + e2e/ 7 specs", "# 97 unit suites (incl. architecture pins) + e2e/ 7 specs")
# The arch-pins family row: parity-246 joins (65 -> 66); the sub-rows sum to 97.
changes += repin(
    "Project_Architecture_Document.md",
    "| — architecture pins | 65 | (gate-script,",
    "| — architecture pins | 66 | (gate-script,",
)
changes += repin(
    "Project_Architecture_Document.md",
    " parity-245, db-transient) | `tests/` |",
    " parity-245, parity-246, db-transient) | `tests/` |",
)

# ---- tests/docs-counts.test.ts (the constants + the family-row pin) -------------
changes += repin("tests/docs-counts.test.ts", "const UNIT_TOTAL = 1591;", "const UNIT_TOTAL = 1601;")
changes += repin("tests/docs-counts.test.ts", "const TEST_FILES = 96;", "const TEST_FILES = 97;")
changes += repin(
    "tests/docs-counts.test.ts",
    "| — architecture pins | 65 | (gate-script,",
    "| — architecture pins | 66 | (gate-script,",
)
changes += repin(
    "tests/docs-counts.test.ts",
    " parity-245, db-transient) |",
    " parity-245, parity-246, db-transient) |",
)

# ---- docs/remediation_plan_v2.md (the R-43 §5 row's gate cell) -----------------
changes += repin(
    "docs/remediation_plan_v2.md",
    "the docs lockstep) | lint 0/0 · tsc 0 · unit (+N) · build · smoke 15/15 · **151 e2e**",
    "the docs lockstep) | lint 0/0 · tsc 0 · **1601 unit (97 files, +10)** · build · smoke 15/15 · **151 e2e**",
)

print(f"docs-246-lockstep.py: {changes} site(s) re-pinned")
