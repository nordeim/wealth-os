#!/usr/bin/env python3
# Session-260 (R-57) docs lockstep, part 1: the count ladder across the
# doc set (README · AGENTS · CLAUDE · SKILL · PAD) — every live-tense
# count site advances 1779→1789 / 111→112 / 1931→1941, the §7.1 family
# row gains parity-260 (79→80), and each edit asserts its OLD form.
# Historical count mentions (the v2.56.0 block's own ship counts, the
# session records) keep their ship-time counts — only live-tense sites
# advance (the docs-counts scope note).
import re

def edit(path, old, new, count=1):
    src = open(path, encoding="utf-8").read()
    assert src.count(old) == count, f"{path}: anchor x{src.count(old)} (expected {count}): {old[:60]!r}"
    open(path, "w", encoding="utf-8").write(src.replace(old, new, count))
    print(f"  ok {path}: {old[:44]!r} -> {new[:44]!r}")

# ---- README -----------------------------------------------------------------
edit("README.md", "tests-1931%20checks", "tests-1941%20checks")
edit("README.md", "| 1779 checks incl. property tests |", "| 1789 checks incl. property tests |")
edit("README.md", "# 111 unit suites + 📂 e2e/ 7 specs", "# 112 unit suites + 📂 e2e/ 7 specs")
edit("README.md", "| 1779 checks / 111 files |", "| 1789 checks / 112 files |")
edit("README.md", "| 1779 unit · 152 e2e · 15 smoke · full gate green |",
     "| 1789 unit · 152 e2e · 15 smoke · full gate green |")

# ---- AGENTS -----------------------------------------------------------------
edit("AGENTS.md", "| Unit tests (1779) | `bun run test` |", "| Unit tests (1789) | `bun run test` |")

# ---- CLAUDE ------------------------------------------------------------------
edit("CLAUDE.md", "lint 0/0 · tsc 0 · 1779 unit · build ·", "lint 0/0 · tsc 0 · 1789 unit · build ·")
edit("CLAUDE.md", "Unit suite (Vitest, 1779 checks)", "Unit suite (Vitest, 1789 checks)")
edit("CLAUDE.md", "tests via fast-check. 1779 checks / 111 files.", "tests via fast-check. 1789 checks / 112 files.")

# ---- SKILL -------------------------------------------------------------------
edit("wealth-os_SKILL.md", "(Vitest 1779 / Playwright 152 / smoke 15)",
     "(Vitest 1789 / Playwright 152 / smoke 15)")
edit("wealth-os_SKILL.md", "Node env, jsdom-free; 1779 checks / 111 files",
     "Node env, jsdom-free; 1789 checks / 112 files")
edit("wealth-os_SKILL.md", "`bun run test` (1779 checks)", "`bun run test` (1789 checks)")
edit("wealth-os_SKILL.md", "`bun run test` — 1779 passed / 111 files",
     "`bun run test` — 1789 passed / 112 files")

# ---- PAD ---------------------------------------------------------------------
edit("Project_Architecture_Document.md", "→ vitest (1779) →", "→ vitest (1789) →")
edit("Project_Architecture_Document.md", "| Unit | 111 | 1779 |", "| Unit | 112 | 1789 |")
edit("Project_Architecture_Document.md", "parity-258, parity-259, db-transient) |",
     "parity-258, parity-259, parity-260, db-transient) |")
edit("Project_Architecture_Document.md", "| — architecture pins | 79 |",
     "| — architecture pins | 80 |")
edit("Project_Architecture_Document.md", "# 111 unit suites (incl. architecture pins) + e2e/ 7 specs",
     "# 112 unit suites (incl. architecture pins) + e2e/ 7 specs")
edit("Project_Architecture_Document.md", "`bun run test` → 1779/1779 (counts re-pinned if tests added/removed)",
     "`bun run test` → 1789/1789 (counts re-pinned if tests added/removed)")
edit("Project_Architecture_Document.md", "| 1779 unit / 152 e2e |", "| 1789 unit / 152 e2e |")
edit("Project_Architecture_Document.md",
     "the time of writing (lint 0/0 · tsc 0 · 1779 unit · build · smoke 15/15 ·",
     "the time of writing (lint 0/0 · tsc 0 · 1789 unit · build · smoke 15/15 ·")

print("docs-260 lockstep part 1 complete (18 asserted edits)")
