#!/usr/bin/env python3
"""Session-272 docs lockstep — the count ladder 1949→1972 / 123→124 /
badge 2110→2133 across README/AGENTS/CLAUDE/SKILL/PAD, the §7.1 rows
(arch pins 91→92 + parity-272 in the list), the PAD v2.69.0 revision
block, the guard-trio advance (v2.67.0/v2.68.0/v2.69.0 — the
twenty-third gate-enforced ride) + the parity-243 mirror, and the
README status row to R-69.

Every swap asserts the old form appears exactly once (the F-242j
lesson). Historical revision blocks keep their own ship counts — the
count ladder touches only live-tense sites."""

import sys


def swap(text: str, old: str, new: str, label: str) -> str:
    n = text.count(old)
    if n != 1:
        sys.exit(f"[{label}] expected 1 occurrence, found {n}: {old[:70]!r}")
    return text.replace(old, new, 1)


def read(rel: str) -> str:
    with open(rel, encoding="utf-8") as f:
        return f.read()


def write(rel: str, content: str) -> None:
    with open(rel, "w", encoding="utf-8") as f:
        f.write(content)


OLD_UNIT, NEW_UNIT = "1949", "1972"
OLD_FILES, NEW_FILES = "123", "124"
OLD_BADGE, NEW_BADGE = "2110", "2133"

# ==========================================================================
# README
# ==========================================================================
r = read("README.md")
r = swap(r, f"tests-{OLD_BADGE}%20checks", f"tests-{NEW_BADGE}%20checks", "readme-badge")
r = swap(r, f"| {OLD_UNIT} checks incl. property tests |", f"| {NEW_UNIT} checks incl. property tests |", "readme-arch")
r = swap(r, f"| {OLD_UNIT} checks / {OLD_FILES} files |", f"| {NEW_UNIT} checks / {NEW_FILES} files |", "readme-tests")
r = swap(r, f"| {OLD_UNIT} unit · 161 e2e · 15 smoke · full gate green |", f"| {NEW_UNIT} unit · 161 e2e · 15 smoke · full gate green |", "readme-status-count")

# the status row: replace the whole row (line) wholesale
lines = r.split("\n")
idx = [i for i, l in enumerate(lines) if l.startswith("| Remediation program |")]
if len(idx) != 1:
    sys.exit(f"[readme-status-row] expected 1 status row, found {len(idx)}")
NEW_STATUS = (
    "| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program "
    "(session 272: **R-69 shipped — the census-reanchor, phantom-primitive, and layer-map round**: the fresh-eyes audit "
    "(three Mode-C passes — the R-68 cure surfaces (all twelve HOLDING, the parity-271 battery 17/17 re-run green) · "
    "the API/auth/security layer's twenty-fifth consecutive clean bill (all twelve house contracts, 45 handlers / 30 "
    "route files; 10 candidates dismissed into documented postures) · the UI/a11y/shell layer — all eight standing "
    "contracts verified holding live): 0 Critical / 0 High / 7 Medium / 11 Low / 2 Informational NEW after dedup, "
    "every material claim re-verified at file:line. THE ROUND'S FLAGSHIP: **F-272a the security ledger's advisory "
    "census moved 2 → 1** (npm's audit endpoint stopped returning the picomatch HIGH against the same picomatch@4.0.7 "
    "the lockfile still resolves — verified at the registry's bulk endpoint; the GitHub advisory still publishes it; "
    "the PAD §10 row + the security-ledger pin re-anchored same-commit). Plus the phantom-primitive family (the skill "
    "doc's stack table still naming the tabs twin after R-68 trued the label twin in the same row · the README "
    "architecture row naming Label and Tabs · the PAD §1.2/§3.2/§5.3 twins naming input/label/textarea) and the "
    "layer-map/token-mirror pair (the §18 z-index ladder drifted four rows deep against the tree and its own §17 · "
    "the §4/§19 mirrors carrying the pre-cure white ink for the primary-foreground the F-219a cure set to stone-900, "
    "retired tokens, stale ramp ranges) plus the count family (18 families, the phantom api family and phantom "
    "names, the 15-assertion smoke counts, the stone-500 arithmetic, the contrast figures, the line counts) and the "
    "box-text constant wiring at the three settings sites (byte-identical classes — zero DOM change): "
    "1972 unit (+23) · 161 e2e (zero new legs) · smoke 15/15 · census MATCH; the mobile-nav comparison verified on "
    "BOTH sides at TRUE 390×844; probe:ref STABLE on every layer) |"
)
lines[idx[0]] = NEW_STATUS
r = "\n".join(lines)
write("README.md", r)
print("README: badge + counts + status row to R-69 — done")

# ==========================================================================
# AGENTS.md + CLAUDE.md
# ==========================================================================
a = read("AGENTS.md")
a = swap(a, f"Unit tests ({OLD_UNIT})", f"Unit tests ({NEW_UNIT})", "agents-unit")
write("AGENTS.md", a)

c = read("CLAUDE.md")
c = swap(c, f"tsc 0 · {OLD_UNIT} unit · build ·", f"tsc 0 · {NEW_UNIT} unit · build ·", "claude-gate")
c = swap(c, f"Unit suite (Vitest, {OLD_UNIT} checks)", f"Unit suite (Vitest, {NEW_UNIT} checks)", "claude-cmd")
c = swap(c, f"fast-check. {OLD_UNIT} checks / {OLD_FILES} files.", f"fast-check. {NEW_UNIT} checks / {NEW_FILES} files.", "claude-strategy")
write("CLAUDE.md", c)
print("AGENTS + CLAUDE: counts — done")

# ==========================================================================
# SKILL
# ==========================================================================
s = read("wealth-os_SKILL.md")
s = swap(s, f"Vitest {OLD_UNIT} / Playwright 161 / smoke 15", f"Vitest {NEW_UNIT} / Playwright 161 / smoke 15", "skill-frontmatter")
s = swap(s, f"jsdom-free; {OLD_UNIT} checks / {OLD_FILES} files |", f"jsdom-free; {NEW_UNIT} checks / {NEW_FILES} files |", "skill-stack")
s = swap(s, f"`bun run test` ({OLD_UNIT} checks)", f"`bun run test` ({NEW_UNIT} checks)", "skill-cmd")
s = swap(s, f"`bun run test` — {OLD_UNIT} passed / {OLD_FILES} files", f"`bun run test` — {NEW_UNIT} passed / {NEW_FILES} files", "skill-checklist")
write("wealth-os_SKILL.md", s)
print("SKILL: counts — done")

# ==========================================================================
# PAD: the live-tense counts + the §7.1 rows + the v2.69.0 block
# ==========================================================================
p = read("Project_Architecture_Document.md")
p = swap(p, f"→ vitest ({OLD_UNIT}) →", f"→ vitest ({NEW_UNIT}) →", "pad-topology")
p = swap(p, f"| Unit | {OLD_FILES} | {OLD_UNIT} |", f"| Unit | {NEW_FILES} | {NEW_UNIT} |", "pad-dist-unit")
p = swap(
    p,
    "| — architecture pins | 91 | (gate-script, db-census, docs-counts, security-ledger,",
    "| — architecture pins | 92 | (gate-script, db-census, docs-counts, security-ledger,",
    "pad-archpins-count",
)
p = swap(
    p,
    " parity-271, db-transient) | `tests/` | source-scanning contracts |",
    " parity-271, parity-272, db-transient) | `tests/` | source-scanning contracts |",
    "pad-archpins-list",
)
p = swap(p, f"→ {OLD_UNIT}/{OLD_UNIT} (counts re-pinned", f"→ {NEW_UNIT}/{NEW_UNIT} (counts re-pinned", "pad-checklist")
p = swap(p, f"| {OLD_UNIT} unit / 161 e2e |", f"| {NEW_UNIT} unit / 161 e2e |", "pad-devhandbook")
p = swap(
    p,
    f"lint 0/0 · tsc 0 · {OLD_UNIT} unit · build · smoke 15/15 ·\n161 e2e — the e2e tail rides",
    f"lint 0/0 · tsc 0 · {NEW_UNIT} unit · build · smoke 15/15 ·\n161 e2e — the e2e tail rides",
    "pad-tail",
)

REV_BLOCK = """- [SR] v2.69.0 (session 272, R-69 — the census-reanchor,
  phantom-primitive, and layer-map round): the fresh-eyes audit
  (three Mode-C passes — the R-68 cure surfaces driven by the session
  (all twelve HOLDING at file:line: the §8 battery opener, the stack
  table, the inventory, the import paragraph, the design-genus line,
  the §19 pairings, both mobile-count sites, the README trio, the
  forgot-password rationale, the register note, the parity-271
  battery 17/17 re-run green), the API/auth/security layer (the
  TWENTY-FIFTH consecutive clean bill — all twelve house contracts,
  45 handlers / 30 route files read line-by-line, 10 candidates
  dismissed into documented postures), and the UI/a11y/shell layer
  (all eight standing contracts verified holding live — the drawer,
  the theme, the v4 scanner with a fresh 110/110 color-token census,
  the a11y two-gate, the shell, the geometry pin, the date seams, the
  escape stacking)) — 0 Critical / 0 High / 7 Medium / 11 Low /
  2 Informational NEW after dedup, every material claim re-verified
  at file:line (the npm bulk-endpoint probe; the Radix dependency
  census; the ui-directory count; the @theme extraction — 142 tokens
  and the real ramp steps; the z-index census; the contrast ratios
  computed independently; the line counts taken live). THE SECURITY
  LEDGER'S ADVISORY CENSUS MOVED 2 → 1 (F-272a, Medium — the
  flagship: npm's audit endpoint stopped returning the picomatch HIGH
  (GHSA-fc5q-39xc-vjpf) against the same picomatch@4.0.7 the lockfile
  still resolves, while the GitHub advisory page still publishes it;
  the §10 advisories row and the security-ledger census pin
  re-anchored same-commit with the decode and the re-triage duty).
  THE PHANTOM-PRIMITIVE FAMILY (F-272b/F-272c/F-272d/F-272e, Medium —
  the skill doc's stack table still naming the tabs twin after the
  R-68 cure trued the label twin in the same row; the README
  architecture row naming Label and Tabs; the PAD §1.2 "label 2.1.17"
  package row; the PAD §3.2/§5.3 ui inventories naming
  input/label/textarea — the F-271d genus surviving in the PAD twins
  the R-68 battery never read). THE LAYER-MAP AND TOKEN-MIRROR PAIR
  (F-272f/F-272g, Medium — the §18 z-index ladder drifted four rows
  deep against the tree and its own §17 (a phantom z-20 sticky-header
  layer, the header at the wrong step, the drawer at the wrong step,
  the skip link's step misattributed); the §4 mirror and §19 reference
  carrying the pre-cure white ink for the primary-foreground the
  F-219a cure set to stone-900, the retired subtle and radius tokens,
  the retired dark-body mechanism prose, and seven stale ramp ranges).
  Plus the count family (F-272h the "20 families" on five carriers
  against the real 18/30/45 · F-272i the phantom /api/analytics
  family · F-272j the phantom names PageCard/AccountView/StatCard ·
  F-272k/F-272l the 14-vs-15 smoke counts · F-272m the stone-500
  arithmetic (4.40:1 computed) · F-272n/F-272o the stale line counts
  · F-272p the three understated contrast figures (4.80/5.48/4.83) ·
  F-272q the phantom input and the wrapping gloss · F-272r the dead
  box-text constant wired at its three settings sites — byte-identical
  classes, zero DOM change · F-272t the Bun floor rider). Registered:
  F-272s (the PAD H1 marker convention). The verification: lint 0/0 ·
  tsc 0 · 1972 unit (124 files, +23) · build ·
  smoke 15/15 · 161 e2e (zero new legs — the box-text wiring is
  class-string consolidation over a byte-identical DOM; the standing
  battery the proof) · census MATCH · the captures (the standing
  evidence faces: the dashboard, the expenses section, the mobile
  drawer at 390).
"""

p = swap(
    p,
    "- [SR] v2.68.0 (session 271, R-68 — the doc-truth, pin-depth,",
    REV_BLOCK + "- [SR] v2.68.0 (session 271, R-68 — the doc-truth, pin-depth,",
    "pad-rev-block",
)
write("Project_Architecture_Document.md", p)
print("PAD: counts + §7.1 rows + v2.69.0 revision block — done")

# ==========================================================================
# tests/docs-counts.test.ts: the constants + the arch-pins literal + the
# comment ladder + the trio advance
# ==========================================================================
d = read("tests/docs-counts.test.ts")
d = swap(d, "const UNIT_TOTAL = 1949;", "const UNIT_TOTAL = 1972;", "dc-unit-total")
d = swap(d, "const TEST_FILES = 123;", "const TEST_FILES = 124;", "dc-test-files")
d = swap(
    d,
    "| — architecture pins | 91 | (gate-script, db-census, docs-counts, security-ledger,",
    "| — architecture pins | 92 | (gate-script, db-census, docs-counts, security-ledger,",
    "dc-archpins-count",
)
d = swap(
    d,
    " parity-271, db-transient) |",
    " parity-271, parity-272, db-transient) |",
    "dc-archpins-list",
)
d = swap(
    d,
    "// Session-271 (R-68): parity-271 joins the family and the file\n    // count takes the suite to 123 — 4 + 91 + 28 = 123.",
    "// Session-271 (R-68): parity-271 joins the family and the file\n    // count takes the suite to 123 — 4 + 91 + 28 = 123.\n    // Session-272 (R-69): parity-272 joins the family and the file\n    // count takes the suite to 124 — 4 + 92 + 28 = 124.",
    "dc-comment-ladder",
)
d = swap(
    d,
    "// Session-271 (R-68): the TWENTY-SECOND gate-enforced ride — the\n    // v2.68.0 block lands together with the trio's advance to\n    // v2.66.0/v2.67.0/v2.68.0 (the v2.65.0 pin ages out).",
    "// Session-271 (R-68): the TWENTY-SECOND gate-enforced ride — the\n    // v2.68.0 block lands together with the trio's advance to\n    // v2.66.0/v2.67.0/v2.68.0 (the v2.65.0 pin ages out).\n    // Session-272 (R-69): the TWENTY-THIRD gate-enforced ride — the\n    // v2.69.0 block lands together with the trio's advance to\n    // v2.67.0/v2.68.0/v2.69.0 (the v2.66.0 pin ages out).",
    "dc-trio-comment",
)
d = swap(
    d,
    'expect(p).toMatch(/\\[SR\\] v2\\.68\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1949 unit \\(123 files, \\+17\\)/);',
    'expect(p).toMatch(/\\[SR\\] v2\\.69\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1972 unit \\(124 files, \\+23\\)/);\n    expect(p).toMatch(/\\[SR\\] v2\\.68\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1949 unit \\(123 files, \\+17\\)/);',
    "dc-trio-newest",
)
d = swap(
    d,
    'expect(p).toMatch(/\\[SR\\] v2\\.66\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1924 unit \\(121 files, \\+13\\)/);',
    "",
    "dc-trio-aged-out",
)
write("tests/docs-counts.test.ts", d)
print("docs-counts: constants + arch-pins + ladder + trio — done")

# ==========================================================================
# tests/parity-243.test.ts: the mirror trio (one block swap)
# ==========================================================================
t = read("tests/parity-243.test.ts")
t = swap(
    t,
    "// the structural leg's twenty-second gate-enforced ride.\n    const guardIt = t.slice(",
    "// the structural leg's twenty-second gate-enforced ride.\n    // Session-272 (R-69) advances it with the v2.69.0 block:\n    // v2.67.0/v2.68.0/v2.69.0 (the v2.66.0 pin ages out) — the\n    // F-247d same-commit recalibration, the structural leg's\n    // twenty-third gate-enforced ride.\n    const guardIt = t.slice(",
    "p243-comment",
)
t = swap(
    t,
    'expect(guardIt).toContain("v2\\\\.66\\\\.0");\n    expect(guardIt).toContain("v2\\\\.67\\\\.0");\n    expect(guardIt).toContain("v2\\\\.68\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.65\\\\.0");\n    expect(guardIt).toContain("1949 unit \\\\(123 files");',
    'expect(guardIt).toContain("v2\\\\.67\\\\.0");\n    expect(guardIt).toContain("v2\\\\.68\\\\.0");\n    expect(guardIt).toContain("v2\\\\.69\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.66\\\\.0");\n    expect(guardIt).toContain("1972 unit \\\\(124 files");',
    "p243-trio-block",
)
write("tests/parity-243.test.ts", t)
print("parity-243: mirror trio advanced — done")
