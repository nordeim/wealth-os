#!/usr/bin/env python3
"""count-ladder-251.py — the session-251 count-ladder flip script.

The house form (assert-first, idempotent, unique-anchor). The ladder:
UNIT 1668 -> 1686 (+18 — tests/parity-251.test.ts [the R-48 source
battery: 17 pins — the F-251a ring family's four · the F-251b config
seam's two · the F-251c settle rider · the F-251d projection · the
F-251e probe selection + exit hygiene · the F-251f pin retirement +
comment reword + census strip · the F-251g offset family's three ·
the F-251h register entry] + tests/store-staleness.test.ts [+1 — the
F-251c settingsSettled strand leg]). FILES 102 -> 103 (+1 — the new
parity-251 battery). E2E 151 HELD · SMOKE 15 HELD. BADGE 1819 -> 1837
(the unit+e2e arithmetic: 1686+151).
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

flips = 0


def flip(path: str, olds: list[str], new: str, count: int = 1, label: str = "") -> None:
    """Flip a site carrying one of the accepted old forms to the new form."""
    global flips
    p = ROOT / path
    t = p.read_text(encoding="utf-8")
    hits = sum(t.count(o) for o in olds)
    if hits == 0:
        if new in t:
            print(f"  (already flipped) {path}: {label}")
            return
        raise SystemExit(f"ERROR: no old form found in {path} for {label!r}")
    if hits != count:
        raise SystemExit(f"ERROR: {path}: {label!r} matched {hits} times (expected {count})")
    for o in olds:
        if o in t:
            t = t.replace(o, new, 1)
            p.write_text(t, encoding="utf-8")
            flips += 1
            print(f"  flipped {path}: {label}")
            return
    raise SystemExit(f"ERROR: unreachable in {path}")


# ---- CLAUDE.md -------------------------------------------------------------
flip("CLAUDE.md", ["lint 0/0 · tsc 0 · 1668 unit · build ·"], "lint 0/0 · tsc 0 · 1686 unit · build ·", 1, "the gate-contract line")
flip("CLAUDE.md", ["Unit suite (Vitest, 1668 checks)"], "Unit suite (Vitest, 1686 checks)", 1, "the commands table")
flip("CLAUDE.md", ["1668 checks / 102 files."], "1686 checks / 103 files.", 1, "the test-pyramid line")

# ---- README.md -------------------------------------------------------------
flip("README.md", ["tests-1819%20checks"], "tests-1837%20checks", 1, "the badge")
flip("README.md", ["1668 checks incl. property tests"], "1686 checks incl. property tests", 1, "the stack table")
flip("README.md", ["# 102 unit suites + 📂 e2e/ 7 specs"], "# 103 unit suites + 📂 e2e/ 7 specs", 1, "the file hierarchy")
flip("README.md", ["1668 checks / 102 files |"], "1686 checks / 103 files |", 1, "the testing table")
flip("README.md", ["1668 unit · 151 e2e · 15 smoke · full gate green"], "1686 unit · 151 e2e · 15 smoke · full gate green", 1, "the verification-layer row")

# ---- AGENTS.md -------------------------------------------------------------
flip("AGENTS.md", ["Unit tests (1668)"], "Unit tests (1686)", 1, "the commands table")

# ---- wealth-os_SKILL.md ----------------------------------------------------
flip("wealth-os_SKILL.md", ["Vitest 1668 / Playwright 151 / smoke 15"], "Vitest 1686 / Playwright 151 / smoke 15", 1, "the header")
flip("wealth-os_SKILL.md", ["Node env, jsdom-free; 1668 checks / 102 files"], "Node env, jsdom-free; 1686 checks / 103 files", 1, "the stack table")
flip("wealth-os_SKILL.md", ["`bun run test` (1668 checks)"], "`bun run test` (1686 checks)", 1, "the commands table")
flip("wealth-os_SKILL.md", ["`bun run test` — 1668 passed / 102 files"], "`bun run test` — 1686 passed / 103 files", 1, "the pre-ship checklist")

# ---- Project_Architecture_Document.md --------------------------------------
flip("Project_Architecture_Document.md", ["→ vitest (1668) →"], "→ vitest (1686) →", 1, "the ADR-006 gate chain")
flip("Project_Architecture_Document.md", ["# 102 unit suites (incl. architecture pins) + e2e/ 7 specs"], "# 103 unit suites (incl. architecture pins) + e2e/ 7 specs", 1, "the file hierarchy")
flip("Project_Architecture_Document.md", ["| Unit | 102 | 1668 |"], "| Unit | 103 | 1686 |", 1, "the §7.1 Unit row")
flip("Project_Architecture_Document.md", ["`bun run test` → 1668/1668"], "`bun run test` → 1686/1686", 1, "the §7.4 pre-push checklist")
flip("Project_Architecture_Document.md", ["1668 unit / 151 e2e"], "1686 unit / 151 e2e", 1, "the §9 command table")
flip("Project_Architecture_Document.md", ["lint 0/0 · tsc 0 · 1668 unit · build · smoke 15/15"], "lint 0/0 · tsc 0 · 1686 unit · build · smoke 15/15", 1, "the §10 closing line")

# ---- tests/docs-counts.test.ts (the pins themselves) ------------------------
flip("tests/docs-counts.test.ts", ["const UNIT_TOTAL = 1668;"], "const UNIT_TOTAL = 1686;", 1, "UNIT_TOTAL")
flip("tests/docs-counts.test.ts", ["const TEST_FILES = 102;"], "const TEST_FILES = 103;", 1, "TEST_FILES")
flip(
    "tests/docs-counts.test.ts",
    ["| — architecture pins | 70 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, db-transient) |"],
    "| — architecture pins | 71 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, db-transient) |",
    1,
    "the §7.1 arch-pins family row (70 -> 71, parity-251 listed)",
)
flip(
    "tests/docs-counts.test.ts",
    ["Session-246 (R-43): parity-246 joins the architecture family"],
    "Session-251 (R-48): parity-251 joins the architecture family\n    // (70 -> 71): 4 + 71 + 28 = 103.\n    // Session-246 (R-43): parity-246 joins the architecture family",
    1,
    "the arithmetic comment (4+71+28=103)",
)

print(f"\ncount-ladder-251: {flips} sites flipped (UNIT 1668->1686 · FILES 102->103 · BADGE 1819->1837)")
