#!/usr/bin/env python3
"""Session 249 (R-46) docs lockstep — moves every live-tense count site
to the ship counts (1645 unit / 101 files / 1796 badge), advances the
guard trio to v2.44.0/v2.45.0/v2.46.0 (the structural leg's first
gate-enforced advance), lands the PAD's v2.46.0 revision block, and
closes the plan (R-46 → Done + the §5 row). Assert-each-replacement:
scoped slices, exactly-once anchors, REFUSED on any mismatch."""

import sys

def sub_once(text: str, old: str, new: str, label: str, scope: str = "") -> str:
    hay = text if not scope else scope
    n = hay.count(old)
    if n != 1:
        sys.exit(f"REFUSED: {label} matched {n} times (expected 1)")
    return text.replace(old, new, 1)

def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()

def write(p, s):
    with open(p, "w", encoding="utf-8") as f:
        f.write(s)

U_OLD, U_NEW = "1622", "1645"
F_OLD, F_NEW = "99", "101"
B_OLD, B_NEW = "1773", "1796"

# ------------------------------------------------------- 1. the pin constants
p = "tests/docs-counts.test.ts"
t = read(p)
t = sub_once(t, "const UNIT_TOTAL = 1622;", "const UNIT_TOTAL = 1645;", "UNIT_TOTAL", t)
t = sub_once(t, "const TEST_FILES = 99;", "const TEST_FILES = 101;", "TEST_FILES", t)
# The trio advance (44/45/46 — the structural leg's first enforced ride).
t = sub_once(
    t,
    """    // Session-249 (R-46, F-249a): the trio advances to
    // v2.43.0/v2.44.0/v2.45.0 — the F-243b/F-244a recurrence's SEVENTH
    // edition cured (session 248 landed the v2.45.0 block while the
    // guard still pinned v2.42.0/v2.43.0/v2.44.0 — the genus walked
    // past the window again inside the round that advanced it; the
    // advance lands green-by-design BEFORE this session's own
    // lockstep pass, the F-244a lesson's own rule executed first). The
    // next session that ships a revision block advances the trio
    // again — first docs act, before its own lockstep.
    expect(p).toMatch(/\\[SR\\] v2\\.43\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1601 unit \\(97 files, \\+10\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.44\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1610 unit \\(98 files, \\+9\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.45\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1622 unit \\(99 files, \\+12\\)/);""",
    """    // Session-249 (R-46, F-249a): the trio advances to
    // v2.43.0/v2.44.0/v2.45.0 green-by-design FIRST (the SEVENTH
    // edition cured before this session's own lockstep pass, the
    // F-244a rule); the lockstep below then lands the v2.46.0 block
    // and advances AGAIN to v2.44.0/v2.45.0/v2.46.0 in the same
    // commit — the structural leg beneath now enforces the window at
    // test time (F-249b: the PAD's newest block must sit inside the
    // pinned window; the eighth edition fails `bun run test` inside
    // its own ship commit — the manual first-docs-act convention
    // retires).
    expect(p).toMatch(/\\[SR\\] v2\\.44\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1610 unit \\(98 files, \\+9\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.45\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1622 unit \\(99 files, \\+12\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.46\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1645 unit \\(101 files, \\+23\\)/);""",
    "the trio advance",
    t,
)
write(p, t)
print("docs-counts.test.ts: constants + trio advanced")

# --------------------------------------------------- 2. the parity-243 mirror
p = "tests/parity-243.test.ts"
t = read(p)
t = sub_once(
    t,
    """    // — the SIXTH edition) advanced it once more; Session-249 (R-46,
    // F-249a — the SEVENTH edition) advances it again: after this round
    // it is v2.43.0/v2.44.0/v2.45.0 (the v2.42.0 pin ages out; its
    // counts no longer appear live anywhere a lockstep script would
    // target).""",
    """    // — the SIXTH edition) advanced it once more; Session-249 (R-46,
    // F-249a/F-249b) advances it twice in one session (the round-start
    // green-by-design advance to v2.43.0/v2.44.0/v2.45.0, then the
    // lockstep's gate-enforced advance with the v2.46.0 block):
    // v2.44.0/v2.45.0/v2.46.0 (the v2.43.0 pin ages out; its counts
    // no longer appear live anywhere a lockstep script would target).""",
    "the mirror comment",
    t,
)
t = sub_once(t, '    expect(guardIt).toContain("v2\\\\.43\\\\.0");', '    expect(guardIt).toContain("v2\\\\.44\\\\.0");', "mirror 43→44", t)
t = sub_once(t, '    expect(guardIt).toContain("v2\\\\.44\\\\.0");\n    expect(guardIt).toContain("v2\\\\.45\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.42\\\\.0");\n    expect(guardIt).toContain("1622 unit \\\\(99 files");',
             '    expect(guardIt).toContain("v2\\\\.45\\\\.0");\n    expect(guardIt).toContain("v2\\\\.46\\\\.0");\n    expect(guardIt).not.toContain("v2\\\\.43\\\\.0");\n    expect(guardIt).toContain("1645 unit \\\\(101 files");',
             "the mirror pins", t)
write(p, t)
print("parity-243.test.ts: mirror advanced")

# ------------------------------------------------------------- 3. CLAUDE.md
p = "CLAUDE.md"
t = read(p)
t = sub_once(t, "lint 0/0 · tsc 0 · 1622 unit · build ·", "lint 0/0 · tsc 0 · 1645 unit · build ·", "CLAUDE gate line", t)
t = sub_once(t, "Unit suite (Vitest, 1622 checks)", "Unit suite (Vitest, 1645 checks)", "CLAUDE command table", t)
t = sub_once(t, "1622 checks / 99 files.", "1645 checks / 101 files.", "CLAUDE pyramid", t)
write(p, t)
print("CLAUDE.md: 3 sites")

# ------------------------------------------------------------- 4. README.md
p = "README.md"
t = read(p)
t = sub_once(t, "tests-1773%20checks", "tests-1796%20checks", "README badge", t)
t = sub_once(t, "1622 checks incl. property tests", "1645 checks incl. property tests", "README arch table", t)
t = sub_once(t, "99 unit suites + 📂 e2e/ 7 specs", "101 unit suites + 📂 e2e/ 7 specs", "README hierarchy", t)
t = sub_once(t, "1622 checks / 99 files |", "1645 checks / 101 files |", "README testing table", t)
t = sub_once(t, "1622 unit · 151 e2e · 15 smoke · full gate green", "1645 unit · 151 e2e · 15 smoke · full gate green", "README status row", t)
# The program row (R-45 → R-46).
old_row_marker = "(session 248: **R-45 shipped"
idx = t.find(old_row_marker)
if idx < 0:
    sys.exit("REFUSED: the README program row anchor")
row_start = t.rfind("| Remediation program", 0, idx)
row_end = t.find("\n", idx)
new_row = (
    "| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 249: **R-46 shipped — the stale-read, era-thread, and guard-structural round**: the fresh-eyes audit (three Mode-C passes — the R-45 cure surfaces · the API/auth/security layer · the UI/a11y/shell layer — 0 Critical / 0 High / 0 Medium / 7 Low / 7 Informational NEW after dedup, every material claim re-verified at file:line; all six R-45 cure surfaces holding — the guard advance aged out by its own ship again, the F-243b/F-244a genus's SEVENTH recurrence); the cold baseline GREEN at HEAD d10b299 (the v2.45.0 ship state reproduced exactly); the reference STABLE on every drift layer incl. the TRUE-390 mobile menu with 9 destinations); the flagship **remount-hydrate stale-read cure** (F-249c — F-248f's dedicated round: a mutation and a root-crossing remount hydrate interleaved so the hydrate's pre-write payload stood while the mutation's post-write refresh was discarded on the token dimension alone — the commit re-keys to the caller's entry era + the shared sequence, the wrapper threads its era, hydrate's dashboard GET joins the sequence at issue, and the superseded landing skips only the slice commit; **proven live by the captures face**: the DELETE POST held through the remount, released, and the store's committed slice asserted post-write); the **guard-trio structural leg** (F-249b — the docs-counts battery derives the PAD's newest revision block at test time and asserts the pinned window covers it; the eighth edition fails the unit gate inside its own ship commit — the manual first-docs-act convention retires); the **logout return era re-key** (F-249d — a remount hydrate inside the POST window used to flip a server-successful logout to false with no clear; **proven live**: the held logout released through the window and the helper navigated to /login); the **signup create-arm select** (F-249e — the F-228h doctrine's create half); the **logout vanished-row arm envelope** (F-249f — the arm's clear rides its own minimal try); and the **four walker docblock truths** (F-249g). Registered, not cured: F-249h-n plus the standing families. Gate: lint 0/0 · tsc 0 · **1645 unit / 101 files** · build · smoke 15/15 · 151 e2e · all six parity drift gates CLEAN · census MATCH · captures 194-196) |"
)
t = t[:row_start] + new_row + t[row_end:]
write(p, t)
print("README.md: badge + 4 sites + the R-46 program row")

# -------------------------------------------------------------- 5. AGENTS.md
p = "AGENTS.md"
t = read(p)
t = sub_once(t, "| Unit tests (1622) | `bun run test` |", "| Unit tests (1645) | `bun run test` |", "AGENTS commands table", t)
write(p, t)
print("AGENTS.md: commands table (the gotcha note landed separately)")

# ------------------------------------------------------ 6. wealth-os_SKILL.md
p = "wealth-os_SKILL.md"
t = read(p)
t = sub_once(t, "layer (Vitest 1622 / Playwright 151 / smoke 15)", "layer (Vitest 1645 / Playwright 151 / smoke 15)", "SKILL header", t)
t = sub_once(t, "jsdom-free; 1622 checks / 99 files |", "jsdom-free; 1645 checks / 101 files |", "SKILL stack table", t)
t = sub_once(t, "| Unit tests | `bun run test` (1622 checks) |", "| Unit tests | `bun run test` (1645 checks) |", "SKILL command table", t)
t = sub_once(t, "`bun run test` — 1622 passed / 99 files", "`bun run test` — 1645 passed / 101 files", "SKILL checklist", t)
write(p, t)
print("wealth-os_SKILL.md: 4 sites")

# --------------------------------- 7. PAD counts + §7.1 rows + v2.46.0 block
p = "Project_Architecture_Document.md"
t = read(p)
t = sub_once(t, "→ vitest (1622) → `next build` →", "→ vitest (1645) → `next build` →", "PAD §7 ladder", t)
t = sub_once(t, "├── tests/                       # 99 unit suites (incl. architecture pins) + e2e/ 7 specs",
             "├── tests/                       # 101 unit suites (incl. architecture pins) + e2e/ 7 specs", "PAD hierarchy", t)
t = sub_once(t, "| Unit | 99 | 1622 | `tests/*.test.ts` | Vitest 5 + fast-check |",
             "| Unit | 101 | 1645 | `tests/*.test.ts` | Vitest 5 + fast-check |", "PAD §7.1 Unit row", t)
t = sub_once(t, "| — architecture pins | 68 | (gate-script,", "| — architecture pins | 69 | (gate-script,", "PAD §7.1 arch row count", t)
t = sub_once(t, "parity-248, db-transient)", "parity-248, parity-249, db-transient)", "PAD §7.1 arch row list", t)
t = sub_once(t, "| — infrastructure | 27 | auth, rate-limit, csv, uploads, upload-sniff, headers, boot-env, search-query, store-logout, store-hydrate, … |",
             "| — infrastructure | 28 | auth, rate-limit, csv, uploads, upload-sniff, headers, boot-env, search-query, store-logout, store-hydrate, store-staleness, … |", "PAD §7.1 infra row", t)
t = sub_once(t, "- [ ] `bun run test` → 1622/1622 (counts re-pinned if tests added/removed)",
             "- [ ] `bun run test` → 1645/1645 (counts re-pinned if tests added/removed)", "PAD §9 checklist", t)
t = sub_once(t, "| `bun run test` / `CI=1 bun run test:e2e` | root | 1622 unit / 151 e2e |",
             "| `bun run test` / `CI=1 bun run test:e2e` | root | 1645 unit / 151 e2e |", "PAD §9 command table", t)
t = sub_once(t, "the time of writing (lint 0/0 · tsc 0 · 1622 unit · build · smoke 15/15 ·",
             "the time of writing (lint 0/0 · tsc 0 · 1645 unit · build · smoke 15/15 ·", "PAD §10 closing line", t)
# The v2.46.0 revision block (newest-first list head).
V246 = """- [SR] v2.46.0 (session 249, R-46 — the stale-read, era-thread, and
  guard-structural round): the fresh-eyes audit (three Mode-C passes
  — the R-45 cure surfaces driven by the session, the
  API/auth/security layer, and the UI/a11y/shell layer; 0 Critical /
  0 High / 0 Medium / 7 Low / 7 Informational NEW after dedup, every
  material claim re-verified at file:line by the driving session; all
  six R-45 cure surfaces verified holding — the guard advance itself
  aged out by one block again, the F-243b/F-244a genus's SEVENTH
  edition, cured first per its own rule; the API layer clean again —
  owner-scoping, Zod, buckets, injection, enumeration, session,
  errors, secrets, deps all clean, the ADR-014 in-band-delivery
  posture re-confirmed with its fail-secure hardening option
  registered; the UI layer clean, with the store's
  remount-interleaving surfaces mapped for the flagship). The round's
  flagship: THE REMOUNT-HYDRATE STALE-READ CURE (F-249c — F-248f's
  dedicated round: a mutation issued from a section page and a
  root-crossing remount hydrate interleaved so the hydrate's
  pre-write dashboard payload stood while the mutation's post-write
  refreshAll was discarded on the token dimension alone — the user
  saw the row they deleted beside its success toast until the next
  fetch; the cure re-keys refreshAll's success/failure commit from
  the entry token to the caller's entry era + the sequence, threads
  mutate's entry era into the refresh (closing the post-logout
  re-wall window), and joins hydrate's dashboard GET to the shared
  refresh sequence at issue time so the later issued read wins in
  both landing orders — the superseded landing skips only the slice
  commit, the settings tail still settles, and the write paths keep
  the token key; the captures face proved it live: the DELETE POST
  held through the remount, released, and the store's committed slice
  asserted post-write). Plus: THE GUARD-TRIO ADVANCE (F-249a — the
  SEVENTH edition, green-by-design first) and THE STRUCTURAL GUARD
  LEG (F-249b — the aging genus's structural cure: the docs-counts
  battery derives the PAD's newest revision block at test time and
  asserts the pinned window covers it, so the EIGHTH edition fails
  the unit gate inside its own ship commit — the manual
  first-docs-act convention retires); THE LOGOUT RETURN ERA RE-KEY
  (F-249d — a remount hydrate inside the POST window used to stale
  the token guard and flip a server-SUCCESSFUL logout to false with
  no clear; the exactly-own-bump era form, proven live by the
  captures face at /login); THE SIGNUP CREATE-ARM SELECT (F-249e —
  the F-228h insurance doctrine's create half, the one arm the
  read/update sweeps never covered); THE LOGOUT VANISHED-ROW ARM'S
  ENVELOPE (F-249f — the arm's clear rides its own minimal try; a
  throw from inside a catch is not caught by that catch); and THE
  FOUR WALKER DOCBLOCK TRUTHS (F-249g — the F-248d widening left the
  ts/tsx/css comments under jsx-admitting filters). Registered, not
  cured: the settings-tail vs updateSettings ordering race (F-249h),
  the eighth pending-face member (F-249i), the import commit's
  non-idempotency (F-249j), the three generated-skip-less walkers
  (F-249k), the import mid-commit navigation vectors (F-249l), the
  verify/resend clear race (F-249m), and the ADR-014 fail-secure
  hardening option (F-249n — the owner's call).
  The verification: lint 0/0 · tsc 0 · 1645 unit (101 files, +23) ·
  build · smoke 15/15 · 151 e2e · all six parity drift gates CLEAN ·
  census MATCH · `bun audit` unchanged · the captures 194-196 (the
  own-database F-225e convention + the census tripwire: the mobile
  drawer at 390 with all 9 destinations + Sign Out, the stale-read
  cure face with the store's committed slice asserted post-write
  under the held-POST remount interleaving, and the logout-return
  face with the helper navigating to /login through the window).
"""
t = sub_once(t, "- [SR] v2.45.0 (session 248, R-45 — the guard-advance, pause-composition,",
             V246 + "- [SR] v2.45.0 (session 248, R-45 — the guard-advance, pause-composition,",
             "the PAD v2.46.0 revision block", t)
write(p, t)
print("PAD: 9 sites + the v2.46.0 revision block")

# ---------------------------------------------- 8. the plan closure + §5 row
p = "docs/remediation_plan_v2.md"
t = read(p)
t = sub_once(t,
             "### R-46 — The stale-read, era-thread, and guard-structural round (session 249) — Status: In progress",
             "### R-46 — The stale-read, era-thread, and guard-structural round (session 249) — Status: Done(v2.46.0)",
             "the R-46 status flip", t)
ROW = """| v2.46.0 | 249 | **R-46** (the stale-read, era-thread, and guard-structural round — findings-led, the standing directive with the reference STABLE on all standing drift layers and the TRUE-390 mobile menu re-verified by probe:ref; the cold baseline GREEN at HEAD d10b299 — the v2.45.0 ship state reproduced exactly, no discovery). The audit round first: the standing layers re-verified (probe:ref STABLE — bundle md5 6d3779af… unchanged, demo data zero, desktop nav 256/9, the TRUE-390 menu 9 destinations; `bun audit` unchanged — 1 moderate dev-chain minimatch, the documented deferral; neo-crm unchanged (b3d0fbe) — nothing to port; the SEO surface verified on the artifact (smoke leg 12: sitemap + robots + manifest 200); the .env DATABASE_URL="file:../db/custom.db" contract + the db/ at the repo root + the vitest/playwright configs + the .env.example six-knob set all standing). The session-249 fresh-eyes audit (three Mode-C passes: the R-45 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 0 High / 0 Medium / 7 Low / 7 Informational NEW after dedup, every material claim re-verified at file:line by the driving session; all six R-45 cure surfaces holding — the guard advance aged out by one block again, the genus's SEVENTH edition). The plan v2.46.0 written (the F-249a-n ledger + the R-46 section) and validated against the tree. **R-46.1** the pins born RED (the guard-trio advance green-by-design FIRST, per the F-244a rule; honest RED: 20 — the store-staleness behavioral battery's four interleaving legs + the parity-249 source battery's sixteen; the docs-counts structural leg green-by-design at birth) → **R-46.2** the cures (THE REMOUNT-HYDRATE STALE-READ CURE — the flagship, three coordinated re-keys on one seam; THE GUARD-TRIO ADVANCE; THE STRUCTURAL GUARD LEG; THE LOGOUT RETURN ERA RE-KEY; THE SIGNUP CREATE-ARM SELECT; THE LOGOUT VANISHED-ROW ARM'S ENVELOPE; THE FOUR WALKER DOCBLOCK TRUTHS) + the same-commit recalibrations (parity-217/224/238/240/241 — twelve pins whose watched forms legitimately changed, each with its rationale in place) → **R-46.3** the verification (the full gate + the six drift gates CLEAN + census MATCH + the captures + the docs lockstep) | lint 0/0 · tsc 0 · **1645 unit (101 files, +23)** · build · smoke 15/15 · **151 e2e** · six drift gates CLEAN · census MATCH | (this session's execution commit) |
"""
t = sub_once(t, "| v2.45.0 | 248 | **R-45** (the guard-advance, pause-composition, and write-path-select round",
             ROW + "| v2.45.0 | 248 | **R-45** (the guard-advance, pause-composition, and write-path-select round",
             "the §5 execution-history row", t)
write(p, t)
print("plan: R-46 → Done + the §5 row")

print("docs lockstep complete")
