#!/usr/bin/env python3
"""Session-269 docs lockstep — the count ladder 1911→1924 / 120→121
files (fresh file) / 159→160 e2e / badge 2070→2084, the PAD's v2.66.0
revision block, the §7.1 family rows (arch pins 88→89 + parity-269 in
the list), the guard trio's advance (the parity-243 mirror), the README
remediation row's advance (R-66), and the plan's §5 gate cell fill.
Every replacement is scoped and asserted (the F-242j lesson); historical
count mentions are untouched (the scope note at
tests/docs-counts.test.ts:15-18)."""

import sys

def swap(text: str, old: str, new: str, count: int = 1, label: str = "") -> str:
    n = text.count(old)
    if n == 0 and text.count(new) == count:
        # already applied (a prior partial run) — idempotent re-entry
        return text
    if n != count:
        sys.exit(f"[{label}] expected {count} occurrence(s), found {n}: {old[:70]!r}")
    return text.replace(old, new)


# ---------------------------------------------------------------- README.md
with open("README.md", encoding="utf-8") as f:
    r = f.read()

r = swap(r, "tests-2070%20checks", "tests-2084%20checks", 1, "README badge")
r = swap(r, "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1911 checks incl. property tests |",
            "| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | 1924 checks incl. property tests |", 1, "README stack")
r = swap(r, "| E2E tests | Playwright + axe-core | 1.65.0 / 4.14.0 | 159 checks; chromium; seeded `db/e2e.db` |",
            "| E2E tests | Playwright + axe-core | 1.65.0 / 4.14.0 | 160 checks; chromium; seeded `db/e2e.db` |", 1, "README e2e stack")
r = swap(r, "# 120 unit suites + 📂 e2e/ 7 specs",
            "# 121 unit suites + 📂 e2e/ 7 specs", 1, "README hierarchy")
r = swap(r, "| Unit (Vitest) | `bun run test` | 1911 checks / 120 files |",
            "| Unit (Vitest) | `bun run test` | 1924 checks / 121 files |", 1, "README testing table")
r = swap(r, "| E2E (Playwright, chromium) | `CI=1 bun run test:e2e` | 159 checks / 7 specs",
            "| E2E (Playwright, chromium) | `CI=1 bun run test:e2e` | 160 checks / 7 specs", 1, "README e2e table")
r = swap(r, "| Verification layer | ✅ Complete | 1911 unit · 159 e2e · 15 smoke · full gate green |",
            "| Verification layer | ✅ Complete | 1924 unit · 160 e2e · 15 smoke · full gate green |", 1, "README verification row")

# The remediation-program status row advances to R-66 (the structural
# docs-counts leg derives the PAD's newest round and asserts this row
# cites it — the F-266a pattern).
row_start = r.index("| Remediation program | 🔀 Active |")
row_end = r.index("\n", row_start)
old_row = r[row_start:row_end]
if "R-66 shipped" not in old_row:
    if "R-65 shipped" not in old_row:
        sys.exit("[README row] the row is neither the R-65 form nor the applied R-66 form — re-read before replacing")
new_row = (
    "| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program "
    "(session 269: **R-66 shipped — the unpadded-year, net-universe, and drawer-guard round**: the fresh-eyes audit "
    "(three Mode-C passes — the R-65 cure surfaces (the parity-267 and parity-268 batteries re-run green at HEAD) · the "
    "API/auth/security layer's twenty-second consecutive clean bill (all twelve house contracts, 45 handlers / 30 route "
    "files; 3 candidates dismissed into documented postures) · the UI/a11y/shell layer — all eight standing contracts "
    "verified, four new findings after dedup, every material claim re-verified at file:line (the year-206 prefill "
    "divergence runtime-proven through the seam's verbatim semantics, the sub-100 custom-bound flip runtime-proven "
    "through a verbatim replica, the stale PAD tail read directly)): 0 Critical / 0 High / 0 Medium / 4 Low / "
    "6 Informational NEW after dedup. THE ROUND'S FOUR LOWS: **F-269a the prefill bridge emitted unpadded years** (a "
    "stored year-0206 row — admitted by the boundary, read honestly by the seam — prefilled a three-digit-year string "
    "the native input treated as no value and the boundary rejected on save, blocking a description-only edit; the "
    "cure: the year pads to four digits, the whole admitted class round-trips) · **F-269b the carrier net's universe "
    "claim overstated** (prisma/seed.ts, prisma/schema.prisma, and .env.example sat tracked and unexcluded — inside "
    "Tailwind's scan set, outside the walk; the three join, the maiden run caught one prose carrier, the residue "
    "documented) · **F-269c the PAD §10 closing line's e2e tail was stale** (152 while the ships carried 159 — the "
    "docs-counts pin's window ended at the smoke figure; the line trued AND the window widened to carry the e2e tail) · "
    "**F-269d the mobile drawer's Escape listener carried no stacked-dialog guard** (its expenses twin does — the repo's "
    "own named standing battery gap; the twin guard lands with the self carve-out). Plus: F-269e the sub-100 "
    "custom-bound posture pinned · F-269f/F-269g/F-269h the three comment-truth riders. The mobile-nav comparison "
    "verified on BOTH sides at TRUE 390×844; probe:ref STABLE on every layer) |"
)
r = r[:row_start] + new_row + r[row_end:]

with open("README.md", "w", encoding="utf-8") as f:
    f.write(r)

# --------------------------------------------------------------- AGENTS.md
with open("AGENTS.md", encoding="utf-8") as f:
    a = f.read()
a = swap(a, "| Unit tests (1911) | `bun run test` |", "| Unit tests (1924) | `bun run test` |", 1, "AGENTS unit")
a = swap(a, "| E2E (boots own server, 159) | `CI=1 bun run test:e2e` |",
            "| E2E (boots own server, 160) | `CI=1 bun run test:e2e` |", 1, "AGENTS e2e")
with open("AGENTS.md", "w", encoding="utf-8") as f:
    f.write(a)

# --------------------------------------------------------------- CLAUDE.md
with open("CLAUDE.md", encoding="utf-8") as f:
    c = f.read()
c = swap(c, "lint 0/0 · tsc 0 · 1911 unit · build ·", "lint 0/0 · tsc 0 · 1924 unit · build ·", 1, "CLAUDE gate")
c = swap(c, "smoke 15/15 · 159 e2e.", "smoke 15/15 · 160 e2e.", 1, "CLAUDE gate2")
c = swap(c, "| `bun run test` | Unit suite (Vitest, 1911 checks) |",
            "| `bun run test` | Unit suite (Vitest, 1924 checks) |", 1, "CLAUDE unit")
c = swap(c, "| `CI=1 bun run test:e2e` | E2E suite (Playwright, 159 checks, own db + :3100) |",
            "| `CI=1 bun run test:e2e` | E2E suite (Playwright, 160 checks, own db + :3100) |", 1, "CLAUDE e2e")
c = swap(c, "tests via fast-check. 1911 checks / 120 files.", "tests via fast-check. 1924 checks / 121 files.", 1, "CLAUDE counts")
c = swap(c, "159 checks / 7 specs. `playwright.config.ts` pins", "160 checks / 7 specs. `playwright.config.ts` pins", 1, "CLAUDE e2e counts")
with open("CLAUDE.md", "w", encoding="utf-8") as f:
    f.write(c)

# ------------------------------------------------------- wealth-os_SKILL.md
with open("wealth-os_SKILL.md", encoding="utf-8") as f:
    s = f.read()
s = swap(s, "layer (Vitest 1911 / Playwright 159 / smoke 15).", "layer (Vitest 1924 / Playwright 160 / smoke 15).", 1, "SKILL head")
s = swap(s, "Node env, jsdom-free; 1911 checks / 120 files |", "Node env, jsdom-free; 1924 checks / 121 files |", 1, "SKILL stack")
s = swap(s, "Chromium; 159 checks / 7 specs; own db + port 3100 |", "Chromium; 160 checks / 7 specs; own db + port 3100 |", 1, "SKILL e2e")
s = swap(s, "| Unit tests | `bun run test` (1911 checks) |", "| Unit tests | `bun run test` (1924 checks) |", 1, "SKILL cmd")
s = swap(s, "| E2E (boots own server) | `CI=1 bun run test:e2e` (159 checks) |",
            "| E2E (boots own server) | `CI=1 bun run test:e2e` (160 checks) |", 1, "SKILL e2e cmd")
s = swap(s, "- [ ] `bun run test` — 1911 passed / 120 files", "- [ ] `bun run test` — 1924 passed / 121 files", 1, "SKILL checklist")
s = swap(s, "- [ ] `CI=1 bun run test:e2e` — 159/159 (7 specs)", "- [ ] `CI=1 bun run test:e2e` — 160/160 (7 specs)", 1, "SKILL e2e checklist")
with open("wealth-os_SKILL.md", "w", encoding="utf-8") as f:
    f.write(s)

# ------------------------------------------- Project_Architecture_Document
with open("Project_Architecture_Document.md", encoding="utf-8") as f:
    p = f.read()

p = swap(p, "→ vitest (1911) → `next build` →", "→ vitest (1924) → `next build` →", 1, "PAD pipeline")
p = swap(p, "├── tests/                       # 120 unit suites (incl. architecture pins) + e2e/ 7 specs",
            "├── tests/                       # 121 unit suites (incl. architecture pins) + e2e/ 7 specs", 1, "PAD hierarchy")
p = swap(p, "| Unit | 120 | 1911 | `tests/*.test.ts` | Vitest 5 + fast-check |",
            "| Unit | 121 | 1924 | `tests/*.test.ts` | Vitest 5 + fast-check |", 1, "PAD 7.1 unit row")
p = swap(p, "| — architecture pins | 88 |", "| — architecture pins | 89 |", 1, "PAD 7.1 arch row")
p = swap(p, "parity-267, parity-268, db-transient) | `tests/` | source-scanning contracts |",
            "parity-267, parity-268, parity-269, db-transient) | `tests/` | source-scanning contracts |", 1, "PAD 7.1 arch list")
p = swap(p, "| E2E | 7 | 159 | `tests/e2e/*.spec.ts` | Playwright (chromium) + axe-core |",
            "| E2E | 7 | 160 | `tests/e2e/*.spec.ts` | Playwright (chromium) + axe-core |", 1, "PAD 7.1 e2e row")
p = swap(p, "| `bun run test` / `CI=1 bun run test:e2e` | root | 1911 unit / 159 e2e |",
            "| `bun run test` / `CI=1 bun run test:e2e` | root | 1924 unit / 160 e2e |", 1, "PAD 9 cmd")
p = swap(p, "- [ ] `bun run test` → 1911/1911 (counts re-pinned if tests added/removed)",
            "- [ ] `bun run test` → 1924/1924 (counts re-pinned if tests added/removed)", 1, "PAD 10 checklist")
p = swap(p, "the time of writing (lint 0/0 · tsc 0 · 1911 unit · build · smoke 15/15 ·",
            "the time of writing (lint 0/0 · tsc 0 · 1924 unit · build · smoke 15/15 ·", 1, "PAD 10 closing unit")

# The v2.66.0 revision block, above v2.65.0's.
V265_HEAD = "- [SR] v2.65.0 (session 268, R-65 — the year-remap, switch-target, and"
if p.count(V265_HEAD) != 1:
    sys.exit("[PAD block] the v2.65.0 revision head not found in the expected form")
block = """- [SR] v2.66.0 (session 269, R-66 — the unpadded-year, net-universe,
  and drawer-guard round): the fresh-eyes audit (three Mode-C passes —
  the R-65 cure surfaces driven by the session (the parity-267 battery
  re-run green 18/18 and the parity-268 battery re-run green 15/15 at
  HEAD, the security-ledger pin green; every surface re-verified at
  file:line, the sub-100 boundary/shoulder/leap-day edges re-probed at
  runtime), the API/auth/security layer (the TWENTY-SECOND consecutive
  clean bill — all twelve house contracts, 45 handlers / 30 route files
  read line-by-line, the census exact, 3 candidates dismissed into
  documented postures), and the UI/a11y/shell layer (all eight standing
  contracts verified, the pinned battery 105/105 green, four new
  findings after dedup)) — 0 Critical / 0 High / 0 Medium / 4 Low /
  6 Informational NEW after dedup, every material claim re-verified at
  file:line by the driving session (the year-206 prefill divergence
  runtime-proven through the seam's verbatim semantics — toDate reads
  the stored year honestly while the prefill bridge emitted a
  three-digit-year string the native input treated as no value and the
  boundary rejected on save; the sub-100 custom-bound flip
  runtime-proven through a verbatim replica; the stale PAD tail read
  directly). THE UNPADDED-YEAR PREFILL (F-269a, Low — the round's
  flagship: the write-admitted year-100-to-999 class could not
  round-trip through the app's own edit dialog — a stored "0206-06-15"
  row prefilled "206-06-15", so the input rendered empty for an
  existing row and a description-only edit was blocked until the date
  was re-picked; the cure: the year pads to four digits in the bridge,
  every current-year consumer byte-identical, the whole admitted class
  round-trippable — pinned at the bridge, at the update schema, and in
  a live e2e round-trip) · the carrier net's universe extension
  (F-269b, Low — prisma/seed.ts, prisma/schema.prisma, and
  .env.example sat tracked and unexcluded, inside Tailwind's scan set
  but outside the parity-229 walk while the walk's comment claimed the
  universe matched the scan set; the three human-editable files join,
  the maiden run caught one prose carrier (reworded same-commit), and
  the machine/prose residue — the lockfile, the license, the ignore
  list — stays deliberately outside, documented) · the PAD §10 closing
  line's e2e tail (F-269c, Low — the line read 1911 unit beside 152
  e2e, four rounds stale, because the docs-counts pin's window ended
  at the smoke figure; the line trued AND the pin window widened to
  carry the e2e tail so the next count change fails the gate until the
  line moves whole) · the drawer's stacked-dialog Escape guard
  (F-269d, Low — the expenses filter card's own guard doctrine
  (F-266d) carried to the shell with the self carve-out: the drawer IS
  a dialog, so the census excludes its own element id; the
  interleaving was unreachable today, but the repo's own comment named
  the gap as the standing battery gap — now guarded and pinned) · the
  sub-100 custom-bound posture pin (F-269e, Informational — the F-268a
  setter arm silently flipped customBoundMs's sub-100 posture from
  drop-open to a real bound; doctrine-consistent and now locked
  against regression in both directions) · the three comment-truth
  riders (F-269f the reset confirm literal's exception claim · F-269g
  the update-guard comment trued to the upsert call form · F-269h the
  dashboard clock's staleness registration, the analytics twin's own
  form). Registered: F-269i the store logout micro-race (the F-250p
  family — same-user, sub-second, self-healing), F-269j the
  table/underline dead-rule posture (the F-259d family — rendered
  liveness, never source-wide lastness). The verification: lint 0/0 ·
  tsc 0 · 1924 unit (121 files, +13) · build · smoke 15/15 · 160 e2e
  (+1 — the year-0206 edit round-trip: the API-created row's edit
  dialog prefills the padded value and the unchanged-date save lands
  clean, the row cleaned up; zero new signups/logins, the shared
  storageState rides; born RED against the pre-cure artifact — the leg
  caught the unpadded value attribute live) · census MATCH · THE SIX
  PARITY DRIFT GATES RE-RUN (required again — the four section pages'
  prefill surfaces and the drawer shell changed): the four sweep
  classes CLEAN (1440/390/768/1024, 0.5pct margin), the fullpage sweep
  CLEAN, the interior census CLEAN (the closed-state DOM unchanged by
  construction: the padded year changes a value inside a closed
  dialog's input, the drawer guard adds no elements — the chain is
  the proof) · the captures (254: the year-0206 edit-prefill face at
  desktop, live-asserted before committing) · the standing asks
  re-verified (probe:ref STABLE on every layer; the mobile-nav
  comparison on BOTH sides at TRUE 390×844 — the reference through
  probe:ref, the clone side riding the production artifact on the
  scratch db/comparison.db, pre-open 0 · 9 destinations + Sign Out ·
  the aria-expanded flip on open AND close · post-close 0; `bun audit`
  unchanged under the F-268d standing posture; neo-crm unchanged at
  b3d0fbe; the SEO surface green; the .env contract and the
  .env.example standing).
"""
p = p.replace(V265_HEAD, block + V265_HEAD, 1)

with open("Project_Architecture_Document.md", "w", encoding="utf-8") as f:
    f.write(p)

# ---------------------------------------------- tests/docs-counts.test.ts
with open("tests/docs-counts.test.ts", encoding="utf-8") as f:
    d = f.read()
d = swap(d, "const UNIT_TOTAL = 1911;", "const UNIT_TOTAL = 1924;", 1, "docs-counts unit")
d = swap(d, "const E2E_TOTAL = 159;", "const E2E_TOTAL = 160;", 1, "docs-counts e2e")
d = swap(d, """    // Session-268 (R-65): the NINETEENTH gate-enforced ride — the
    // v2.65.0 block lands together with the trio's advance to
    // v2.63.0/v2.64.0/v2.65.0 (the v2.62.0 pin ages out).""",
          """    // Session-268 (R-65): the NINETEENTH gate-enforced ride — the
    // v2.65.0 block lands together with the trio's advance to
    // v2.63.0/v2.64.0/v2.65.0 (the v2.62.0 pin ages out).
    // Session-269 (R-66): the TWENTIETH gate-enforced ride — the
    // v2.66.0 block lands together with the trio's advance to
    // v2.64.0/v2.65.0/v2.66.0 (the v2.63.0 pin ages out).""", 1, "docs-counts ride comment")
d = swap(d, r"""    expect(p).toMatch(/\[SR\] v2\.65\.0[\s\S]*?The verification: lint 0\/0 · tsc 0 · 1911 unit \(120 files, \+16\)/);
    expect(p).toMatch(/\[SR\] v2\.64\.0[\s\S]*?The verification: lint 0\/0 · tsc 0 · 1895 unit \(119 files, \+18\)/);
    expect(p).toMatch(/\[SR\] v2\.63\.0[\s\S]*?The verification: lint 0\/0 · tsc 0 · 1877 unit \(118 files, \+17\)/);""",
          r"""    expect(p).toMatch(/\[SR\] v2\.66\.0[\s\S]*?The verification: lint 0\/0 · tsc 0 · 1924 unit \(121 files, \+13\)/);
    expect(p).toMatch(/\[SR\] v2\.65\.0[\s\S]*?The verification: lint 0\/0 · tsc 0 · 1911 unit \(120 files, \+16\)/);
    expect(p).toMatch(/\[SR\] v2\.64\.0[\s\S]*?The verification: lint 0\/0 · tsc 0 · 1895 unit \(119 files, \+18\)/);""", 1, "docs-counts trio")
with open("tests/docs-counts.test.ts", "w", encoding="utf-8") as f:
    f.write(d)

# ------------------------------------- docs/remediation_plan_v2.md §5 cell
with open("docs/remediation_plan_v2.md", encoding="utf-8") as f:
    plan = f.read()
plan = swap(plan, "; the captures — the year-0206 edit-prefill face, the standing mobile drawer) | (pending at write time — the ship gate fills this cell) | (this session's execution commit) |",
                " · the captures — the year-0206 edit-prefill face, the standing mobile drawer) | lint 0/0 · tsc 0 · **1924 unit (121 files, +13)** · build · smoke 15/15 · **160 e2e (+1)** · census MATCH · the six parity drift gates CLEAN | (this session's execution commit) |", 1, "plan §5 gate cell")
with open("docs/remediation_plan_v2.md", "w", encoding="utf-8") as f:
    f.write(plan)

print("docs-269 lockstep complete: README/AGENTS/CLAUDE/SKILL/PAD counts, the v2.66.0 revision block, the trio advance, the docs-counts constants, the plan's §5 gate cell")
