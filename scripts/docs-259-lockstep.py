#!/usr/bin/env python3
# Session-259 (R-56) docs lockstep, part 1: the count ladder across the
# doc set (README · AGENTS · CLAUDE · SKILL · PAD) — every live-tense
# count site advances 1762→1779 / 110→111 / 1914→1931, the §7.1 family
# row gains parity-259 (78→79), and each edit asserts its OLD form.
# Historical count mentions (the v2.55.0 block's own ship counts, the
# session records) keep their ship-time counts — only live-tense sites
# advance (the docs-counts scope note).
import re

def edit(path, old, new, count=1):
    src = open(path, encoding="utf-8").read()
    assert src.count(old) == count, f"{path}: anchor x{src.count(old)} (expected {count}): {old[:60]!r}"
    open(path, "w", encoding="utf-8").write(src.replace(old, new, count))
    print(f"  ok {path}: {old[:44]!r} -> {new[:44]!r}")

# ---- README -----------------------------------------------------------------
edit("README.md", "tests-1914%20checks", "tests-1931%20checks")
edit("README.md", "| 1762 checks incl. property tests |", "| 1779 checks incl. property tests |")
edit("README.md", "# 110 unit suites + 📂 e2e/ 7 specs", "# 111 unit suites + 📂 e2e/ 7 specs")
edit("README.md", "| 1762 checks / 110 files |", "| 1779 checks / 111 files |")
edit("README.md", "| 1762 unit · 152 e2e · 15 smoke · full gate green |",
     "| 1779 unit · 152 e2e · 15 smoke · full gate green |")

# ---- AGENTS -----------------------------------------------------------------
edit("AGENTS.md", "| Unit tests (1762) | `bun run test` |", "| Unit tests (1779) | `bun run test` |")

# ---- CLAUDE ------------------------------------------------------------------
edit("CLAUDE.md", "lint 0/0 · tsc 0 · 1762 unit · build ·", "lint 0/0 · tsc 0 · 1779 unit · build ·")
edit("CLAUDE.md", "Unit suite (Vitest, 1762 checks)", "Unit suite (Vitest, 1779 checks)")
edit("CLAUDE.md", "tests via fast-check. 1762 checks / 110 files.", "tests via fast-check. 1779 checks / 111 files.")

# ---- SKILL -------------------------------------------------------------------
edit("wealth-os_SKILL.md", "(Vitest 1762 / Playwright 152 / smoke 15)",
     "(Vitest 1779 / Playwright 152 / smoke 15)")
edit("wealth-os_SKILL.md", "Node env, jsdom-free; 1762 checks / 110 files",
     "Node env, jsdom-free; 1779 checks / 111 files")
edit("wealth-os_SKILL.md", "`bun run test` (1762 checks)", "`bun run test` (1779 checks)")
edit("wealth-os_SKILL.md", "`bun run test` — 1762 passed / 110 files",
     "`bun run test` — 1779 passed / 111 files")

# ---- PAD ---------------------------------------------------------------------
edit("Project_Architecture_Document.md", "→ vitest (1762) →", "→ vitest (1779) →")
edit("Project_Architecture_Document.md", "| Unit | 110 | 1762 |", "| Unit | 111 | 1779 |")
edit("Project_Architecture_Document.md", "parity-257, parity-258, db-transient) |",
     "parity-257, parity-258, parity-259, db-transient) |")
edit("Project_Architecture_Document.md", "| — architecture pins | 78 |",
     "| — architecture pins | 79 |")
edit("Project_Architecture_Document.md", "# 110 unit suites (incl. architecture pins) + e2e/ 7 specs",
     "# 111 unit suites (incl. architecture pins) + e2e/ 7 specs")
edit("Project_Architecture_Document.md", "`bun run test` → 1762/1762 (counts re-pinned if tests added/removed)",
     "`bun run test` → 1779/1779 (counts re-pinned if tests added/removed)")
edit("Project_Architecture_Document.md", "| 1762 unit / 152 e2e |", "| 1779 unit / 152 e2e |")
edit("Project_Architecture_Document.md",
     "the time of writing (lint 0/0 · tsc 0 · 1762 unit · build · smoke 15/15 ·",
     "the time of writing (lint 0/0 · tsc 0 · 1779 unit · build · smoke 15/15 ·")

# ---- the plan's §5 row count truing -------------------------------------------
edit("docs/remediation_plan_v2.md",
     "**1762 unit (110 files, +12)** · build · smoke 15/15 · **152 e2e** · census MATCH | (this session's execution commit) |",
     "**1779 unit (111 files, +17)** · build · smoke 15/15 · **152 e2e** · census MATCH | (this session's execution commit) |")

print("docs-lockstep part 1 complete (18 asserted edits)")
