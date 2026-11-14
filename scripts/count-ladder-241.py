#!/usr/bin/env python3
"""Session-241 (R-38): the docs-counts re-pin — 1485→1519 unit checks,
90→91 test files, the badge 1632→1666. Assert-each-replacement form
(the house convention): every site asserted BEFORE the replace, the
counts verified against the live suite output afterward by the
docs-counts pin itself. Historical session records (worklog entries,
session logs, the plan's execution rows, the PAD's per-round revision
blocks) keep their at-the-time counts — only LIVE-TENSE sites move."""

from pathlib import Path

REPLACEMENTS = [
    # the pin's own constants
    ("tests/docs-counts.test.ts", "const UNIT_TOTAL = 1485;", "const UNIT_TOTAL = 1519;"),
    ("tests/docs-counts.test.ts", "const TEST_FILES = 90;", "const TEST_FILES = 91;"),
    # README
    ("README.md",
     "tests-1632%20checks-brightgreen",
     "tests-1666%20checks-brightgreen"),
    ("README.md",
     "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1485 checks incl. property tests |",
     "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1519 checks incl. property tests |"),
    ("README.md",
     "# 90 unit suites + 📂 e2e/ 7 specs",
     "# 91 unit suites + 📂 e2e/ 7 specs"),
    ("README.md",
     "| Unit (Vitest) | `bun run test` | 1485 checks / 90 files |",
     "| Unit (Vitest) | `bun run test` | 1519 checks / 91 files |"),
    ("README.md",
     "| Verification layer | ✅ Complete | 1485 unit · 147 e2e · 15 smoke · full gate green |",
     "| Verification layer | ✅ Complete | 1519 unit · 147 e2e · 15 smoke · full gate green |"),
    # CLAUDE
    ("CLAUDE.md",
     "**The gate is the contract**: lint 0/0 · tsc 0 · 1485 unit · build ·",
     "**The gate is the contract**: lint 0/0 · tsc 0 · 1519 unit · build ·"),
    ("CLAUDE.md",
     "| `bun run test` | Unit suite (Vitest, 1485 checks) |",
     "| `bun run test` | Unit suite (Vitest, 1519 checks) |"),
    ("CLAUDE.md",
     "tests via fast-check. 1485 checks / 90 files.",
     "tests via fast-check. 1519 checks / 91 files."),
    # AGENTS
    ("AGENTS.md",
     "| Unit tests (1485) | `bun run test` |",
     "| Unit tests (1519) | `bun run test` |"),
    # SKILL
    ("wealth-os_SKILL.md",
     "layer (Vitest 1485 / Playwright 147 / smoke 15). Covers the design system,",
     "layer (Vitest 1519 / Playwright 147 / smoke 15). Covers the design system,"),
    ("wealth-os_SKILL.md",
     "| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 1485 checks / 90 files |",
     "| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 1519 checks / 91 files |"),
    ("wealth-os_SKILL.md",
     "| Unit tests | `bun run test` (1485 checks) |",
     "| Unit tests | `bun run test` (1519 checks) |"),
    ("wealth-os_SKILL.md",
     "- [ ] `bun run test` — 1485 passed / 90 files",
     "- [ ] `bun run test` — 1519 passed / 91 files"),
    # PAD live-tense sites
    ("Project_Architecture_Document.md",
     "F-236r-era registers). The verification: lint 0/0 · tsc 0 · 1485",
     "F-236r-era registers). The verification: lint 0/0 · tsc 0 · 1519"),
    ("Project_Architecture_Document.md",
     "  unit (90 files) · build · smoke 15/15 · 147 e2e · ALL SIX parity",
     "  unit (91 files) · build · smoke 15/15 · 147 e2e · ALL SIX parity"),
    ("Project_Architecture_Document.md",
     "→ vitest (1485) → `next build` → the 15-assertion smoke ladder on the",
     "→ vitest (1519) → `next build` → the 15-assertion smoke ladder on the"),
    ("Project_Architecture_Document.md",
     "| Unit | 90 | 1485 | `tests/*.test.ts` | Vitest 5 + fast-check |",
     "| Unit | 91 | 1519 | `tests/*.test.ts` | Vitest 5 + fast-check |"),
    ("Project_Architecture_Document.md",
     "- [ ] `bun run test` → 1485/1485 (counts re-pinned if tests added/removed)",
     "- [ ] `bun run test` → 1519/1519 (counts re-pinned if tests added/removed)"),
    ("Project_Architecture_Document.md",
     "| `bun run test` / `CI=1 bun run test:e2e` | root | 1485 unit / 147 e2e |",
     "| `bun run test` / `CI=1 bun run test:e2e` | root | 1519 unit / 147 e2e |"),
    ("Project_Architecture_Document.md",
     "the time of writing (lint 0/0 · tsc 0 · 1485 unit · build · smoke 15/15 ·",
     "the time of writing (lint 0/0 · tsc 0 · 1519 unit · build · smoke 15/15 ·"),
]

for file, old, new in REPLACEMENTS:
    p = Path(file)
    s = p.read_text()
    assert s.count(old) == 1, f"{file}: anchor not unique or absent: {old[:60]}..."
    p.write_text(s.replace(old, new, 1))

# post-write verification: no live-tense stragglers outside historical records
for file in ["README.md", "CLAUDE.md", "AGENTS.md", "wealth-os_SKILL.md"]:
    s = Path(file).read_text()
    assert "1485" not in s, f"{file}: a stale 1485 remains"
    assert " 90 files" not in s and "/ 90 " not in s, f"{file}: a stale 90-file count remains"
print(f"docs-counts re-pin complete: {len(REPLACEMENTS)} assert-each replacements (1485→1519 · 90→91 · badge 1632→1666)")
