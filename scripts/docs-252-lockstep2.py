#!/usr/bin/env python3
"""Session-252 (R-49): the docs lockstep, part 2 — the sites the
docs-counts battery flagged (the F-204a family + the §7.1 E2E row +
the §9/§10/ADR-006/pre-push sites the first pass missed)."""

import sys

def sub(path, old, new, label):
    t = open(path, encoding="utf-8").read()
    n = t.count(old)
    if n != 1:
        sys.exit(f"REFUSED: {label} matched {n} times in {path}")
    open(path, "w", encoding="utf-8").write(t.replace(old, new, 1))
    print(f"edited: {label}")

sub("README.md", "├── 📂 tests/                  # 103 unit suites + 📂 e2e/ 7 specs", "├── 📂 tests/                  # 104 unit suites + 📂 e2e/ 7 specs", "README hierarchy")

sub("Project_Architecture_Document.md", "| E2E | 7 | 151 | `tests/e2e/*.spec.ts` | Playwright (chromium) + axe-core |", "| E2E | 7 | 152 | `tests/e2e/*.spec.ts` | Playwright (chromium) + axe-core |", "PAD §7.1 E2E row")

sub("Project_Architecture_Document.md", "  → vitest (1686) → `next build` → the 15-assertion smoke ladder on the\n  standalone artifact → Playwright e2e (151) against a pinned `db/e2e.db`.", "  → vitest (1704) → `next build` → the 15-assertion smoke ladder on the\n  standalone artifact → Playwright e2e (152) against a pinned `db/e2e.db`.", "PAD ADR-006 gate chain")

sub("Project_Architecture_Document.md", "- [ ] `bun run test` → 1686/1686 (counts re-pinned if tests added/removed)", "- [ ] `bun run test` → 1704/1704 (counts re-pinned if tests added/removed)", "PAD pre-push unit")

sub("Project_Architecture_Document.md", "| `bun run test` / `CI=1 bun run test:e2e` | root | 1686 unit / 151 e2e |", "| `bun run test` / `CI=1 bun run test:e2e` | root | 1704 unit / 152 e2e |", "PAD §9 command row")

sub("Project_Architecture_Document.md", "the time of writing (lint 0/0 · tsc 0 · 1686 unit · build · smoke 15/15 ·\n151 e2e).", "the time of writing (lint 0/0 · tsc 0 · 1704 unit · build · smoke 15/15 ·\n152 e2e).", "PAD §10 closing")

sub("wealth-os_SKILL.md", "| E2E (boots own server) | `CI=1 bun run test:e2e` (151 checks) |", "| E2E (boots own server) | `CI=1 bun run test:e2e` (152 checks) |", "SKILL commands e2e")

sub("wealth-os_SKILL.md", "- [ ] `CI=1 bun run test:e2e` — 151/151 (7 specs)", "- [ ] `CI=1 bun run test:e2e` — 152/152 (7 specs)", "SKILL checklist e2e")

print("docs lockstep part 2 complete")
