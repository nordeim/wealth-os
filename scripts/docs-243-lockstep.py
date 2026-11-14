#!/usr/bin/env python3
"""Session-243 (R-40) docs lockstep — the count advance 1539→1552 / 92→93 /
badge 1689→1702 across every LIVE-TENSE site. The F-242j discipline: each
replacement asserts its OLD form exactly once at a UNIQUE anchor first;
HISTORICAL revision blocks (the PAD's per-session verification lines) are
never touched — the v2.39.0 block is now pinned by the docs-counts guard.
"""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OLD_UNIT, NEW_UNIT = "1539", "1552"
OLD_FILES, NEW_FILES = "92", "93"
OLD_BADGE, NEW_BADGE = "1689", "1702"
changes = 0


def swap(path: str, pairs: list[tuple[str, str]], label: str) -> None:
    """Unique-anchor replacements: each old form must appear exactly once."""
    global changes
    p = ROOT / path
    src = p.read_text(encoding="utf-8")
    for old, new in pairs:
        n = src.count(old)
        assert n == 1, f"{label}: expected {old!r} once in {path}, found {n}"
        src = src.replace(old, new, 1)
        changes += 1
    p.write_text(src, encoding="utf-8")
    print(f"[ok] {label}: {len(pairs)} site(s)")


# ---- tests/docs-counts.test.ts — the constants ------------------------------
swap("tests/docs-counts.test.ts", [
    ("const UNIT_TOTAL = 1539;", "const UNIT_TOTAL = 1552;"),
    ("const TEST_FILES = 92;", "const TEST_FILES = 93;"),
], "docs-counts constants")

# ---- CLAUDE.md ---------------------------------------------------------------
swap("CLAUDE.md", [
    ("- **The gate is the contract**: lint 0/0 · tsc 0 · 1539 unit · build ·",
     "- **The gate is the contract**: lint 0/0 · tsc 0 · 1552 unit · build ·"),
    ("| `bun run test` | Unit suite (Vitest, 1539 checks) |",
     "| `bun run test` | Unit suite (Vitest, 1552 checks) |"),
    ("tests via fast-check. 1539 checks / 92 files.",
     "tests via fast-check. 1552 checks / 93 files."),
], "CLAUDE.md")

# ---- README.md ---------------------------------------------------------------
swap("README.md", [
    ("[![Tests](https://img.shields.io/badge/tests-1689%20checks-brightgreen)](#testing)",
     "[![Tests](https://img.shields.io/badge/tests-1702%20checks-brightgreen)](#testing)"),
    ("| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1539 checks incl. property tests |",
     "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1552 checks incl. property tests |"),
    ("├── 📂 tests/                  # 92 unit suites + 📂 e2e/ 7 specs",
     "├── 📂 tests/                  # 93 unit suites + 📂 e2e/ 7 specs"),
    ("| Unit (Vitest) | `bun run test` | 1539 checks / 92 files |",
     "| Unit (Vitest) | `bun run test` | 1552 checks / 93 files |"),
    ("| Verification layer | ✅ Complete | 1539 unit · 150 e2e · 15 smoke · full gate green |",
     "| Verification layer | ✅ Complete | 1552 unit · 150 e2e · 15 smoke · full gate green |"),
], "README.md")

# ---- AGENTS.md ---------------------------------------------------------------
swap("AGENTS.md", [
    ("| Unit tests (1539) | `bun run test` |",
     "| Unit tests (1552) | `bun run test` |"),
], "AGENTS.md")

# ---- wealth-os_SKILL.md ------------------------------------------------------
swap("wealth-os_SKILL.md", [
    ("layer (Vitest 1539 / Playwright 150 / smoke 15). Covers the design system,",
     "layer (Vitest 1552 / Playwright 150 / smoke 15). Covers the design system,"),
    ("| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 1539 checks / 92 files |",
     "| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 1552 checks / 93 files |"),
    ("| Unit tests | `bun run test` (1539 checks) |",
     "| Unit tests | `bun run test` (1552 checks) |"),
    ("- [ ] `bun run test` — 1539 passed / 92 files",
     "- [ ] `bun run test` — 1552 passed / 93 files"),
], "wealth-os_SKILL.md")

# ---- Project_Architecture_Document.md (live-tense sites ONLY) ----------------
swap("Project_Architecture_Document.md", [
    ("→ vitest (1539) → `next build` → the 15-assertion smoke ladder on the",
     "→ vitest (1552) → `next build` → the 15-assertion smoke ladder on the"),
    ("├── tests/                       # 92 unit suites (incl. architecture pins) + e2e/ 7 specs",
     "├── tests/                       # 93 unit suites (incl. architecture pins) + e2e/ 7 specs"),
    ("| Unit | 92 | 1539 | `tests/*.test.ts` | Vitest 5 + fast-check |",
     "| Unit | 93 | 1552 | `tests/*.test.ts` | Vitest 5 + fast-check |"),
    ("- [ ] `bun run test` → 1539/1539 (counts re-pinned if tests added/removed)",
     "- [ ] `bun run test` → 1552/1552 (counts re-pinned if tests added/removed)"),
    ("| `bun run test` / `CI=1 bun run test:e2e` | root | 1539 unit / 150 e2e |",
     "| `bun run test` / `CI=1 bun run test:e2e` | root | 1552 unit / 150 e2e |"),
    ("the time of writing (lint 0/0 · tsc 0 · 1539 unit · build · smoke 15/15 ·",
     "the time of writing (lint 0/0 · tsc 0 · 1552 unit · build · smoke 15/15 ·"),
], "PAD live-tense sites")

# ---- The guard: the v2.39.0 historical block must be UNTOUCHED ---------------
pad = (ROOT / "Project_Architecture_Document.md").read_text(encoding="utf-8")
# Line-wrap-aware: the block's verification line wraps ("The\n verification:");
# check the raw wrapped form AND that the live-tense sites no longer carry
# the old counts.
start = pad.index("[SR] v2.39.0 (session 242")
end = pad.index("[SR] v2.38.0", start)
block = pad[start:end]
assert "verification: lint 0/0 · tsc 0 · 1539 unit (92 files)" in block, \
    "the v2.39.0 historical block was corrupted by this pass"
print("[ok] the v2.39.0 historical block still carries its own ship counts (1539/92)")

print(f"done: {changes} site(s) advanced")
sys.exit(0)
