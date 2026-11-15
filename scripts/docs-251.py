#!/usr/bin/env python3
"""docs-251.py — the README program row, the plan's §5 execution-history
row + R-48.3 numbers, the worklog entry, and the session record."""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

def sub(path: str, old: str, new: str, label: str) -> None:
    p = ROOT / path
    t = p.read_text(encoding="utf-8")
    n = t.count(old)
    if n != 1:
        raise SystemExit(f"REFUSED: {label} matched {n} times in {path}")
    p.write_text(t.replace(old, new, 1), encoding="utf-8")
    print(f"  edited {path}: {label}")

# 1. The README's Remediation program status row.
sub(
    "README.md",
    """| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 250: **R-47 shipped""",
    """| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 251: **R-48 shipped — the focus-ring, cli-anchor, and settings-flag round**: the fresh-eyes audit (three Mode-C passes — 0 Critical / 0 High / 1 Medium / 6 Low cured + 2 Informational cured-as-riders + 3 Informational registered after dedup, every material claim re-verified at file:line, the prisma-config divergence live-probed under the repo's own bun; all seven R-47 cure surfaces holding; the Tailwind v4 token discipline clean on every audited axis); the flagship **auth-face focus-ring cure** (F-251a — nine constants carried the amber ring at 1.67:1 on the forced-light auth card, below the 3:1 non-text bar; they join the submits' F-218i ring-ring ink at 17.5:1, proven live by the computed-style capture); the **prisma.config CLI-anchor cure** (F-251b — the mirror-db trap's CLI half: a direct `bun x prisma …` under bun resolved to the parent-of-repo mirror db while the app served the repo db; the datasource re-routes through runtimeDatabaseUrl(), the signature-aware seam, verified live on all four invocation patterns); the **settings-settled rider** (F-251c — proven live: the held stale tail left EUR standing with the flag true); the **dashboard user projection** (F-251d); the **drift-probe /assets/ positive selection + exit hygiene** (F-251e); the **dead gray-500 pin retirement + the palette census comment-strip** (F-251f — the F-224v genus's structural cure); the **white ring-offset halo cure** (F-251g — four dark-capable surfaces, proven live by the computed rgb(14,19,16) offset band); and the **amber meter-fill register entry** (F-251h). Gate: lint 0/0 · tsc 0 · **1686 unit / 103 files** · build · smoke 15/15 · 151 e2e · the six parity drift gates CLEAN at 0.5pct · census MATCH · captures 202-206) — the prior rounds' summary follows: (session 250: **R-47 shipped""",
    "the README program row",
)

# 2. The plan's §5 execution-history row (above v2.47.0's).
sub(
    "docs/remediation_plan_v2.md",
    """| Version | Session | R-items executed | Gate at ship | Commit |
|---|---|---|---|---|
| v2.47.0 | 250 |""",
    """| Version | Session | R-items executed | Gate at ship | Commit |
|---|---|---|---|---|
| v2.48.0 | 251 | **R-48** (the focus-ring, cli-anchor, and settings-flag round — findings-led, the standing directive with the reference STABLE on every standing drift layer incl. the F-250q stylesheet fingerprint and the mobile-navigation ask verified on BOTH sides at TRUE 390×844 through agent-browser; the cold baseline GREEN at HEAD c903958 — the v2.47.0 ship state reproduced exactly, the chromium-1254 install the one toolchain step). The audit round first: the standing layers re-verified (probe:ref STABLE; `bun audit` unchanged (1 moderate dev-chain minimatch, the documented deferral); neo-crm unchanged (b3d0fbe) — nothing to port; the SEO surface verified (smoke leg 12); the .env contract + the db/ at the repo root + the vitest/playwright configs + the .env.example six-knob set all standing). The session-251 fresh-eyes audit (three Mode-C passes: the R-47 cure surfaces · the API/auth/security layer · the UI/a11y/shell layer — 0 Critical / 0 High / 1 Medium / 6 Low cured + 2 Informational cured-as-riders + 3 Informational registered after dedup, every material claim re-verified at file:line by the driving session, the prisma-config divergence LIVE-PROBED; all seven R-47 cure surfaces verified holding; the Tailwind v4 hunt clean on every axis). The plan v2.48.0 written and validated against the tree. **R-48.1** the pins born RED (honest RED: 18 — the parity-251 source battery's seventeen + the store-staleness settingsSettled strand leg) → **R-48.2** the cures (THE AUTH-FACE FOCUS-RING CURE — the flagship; THE PRISMA.CONFIG CLI-ANCHOR CURE; THE SETTINGS-SETTLED RIDER + the F-250p comment-truth rider; THE DASHBOARD USER PROJECTION; THE DRIFT-PROBE CSS POSITIVE SELECTION + EXIT HYGIENE; THE DEAD gray-500 PIN RETIREMENT + THE PALETTE CENSUS COMMENT-STRIP; THE WHITE RING-OFFSET HALO CURE; THE AMBER METER-FILL REGISTER ENTRY) plus the same-commit recalibrations (parity-218/222/223/249/250, login-reset, login-views, prisma-7-contract — the F-247d precedent) and two comment rewords the parity-229 nets caught mid-cure (the F-229d discipline — the light-mode/invisible carriers in the tabs docblock) → **R-48.3** the verification (lint 0/0 · tsc 0 · 1686 unit (103 files, +18) · build · smoke 15/15 · 151 e2e · the six parity drift gates CLEAN at 0.5pct margin · census MATCH · the captures 202-206: the mobile drawer at 390 (the standing ask, open + close asserted), the auth-focus ring face (computed rgb(28,25,23) — the flagship proven live), the settings-settled rider face (EUR kept, settled=true — the rider proven live), the user-projection face (role="user", photoUrl present), the tabs-panel halo face (computed rgb(14,19,16) — the F-251g cure proven live)). The docs lockstep complete (the PAD v2.48.0 block + the trio's gate-enforced advance to v2.46.0/v2.47.0/v2.48.0 + the §7.1 family rows 70→71 with parity-251 listed + the arithmetic 4+71+28=103 + the README badge 1819→1837 + the program row + AGENTS/CLAUDE/SKILL counts + the plan closure + the worklog + docs/session_85.md). | lint 0/0 · tsc 0 · **1686 unit (103 files, +18)** · build · smoke 15/15 · **151 e2e** · six drift gates CLEAN (0.5pct) · census MATCH | (this session's execution commit) |
| v2.47.0 | 250 |""",
    "the §5 execution-history row",
)

# 3. The R-48.3 verification line in the R-48 section (the plan).
sub(
    "docs/remediation_plan_v2.md",
    """### R-48 — The focus-ring, cli-anchor, and settings-flag round (session 251) — Status: Done(v2.48.0)""",
    """### R-48 — The focus-ring, cli-anchor, and settings-flag round (session 251) — Status: Done(v2.48.0) — SHIPPED (lint 0/0 · tsc 0 · 1686 unit (103 files, +18) · build · smoke 15/15 · 151 e2e · the six parity drift gates CLEAN at 0.5pct · census MATCH · the captures 202-206 · the docs lockstep complete)""",
    "the R-48 section status line",
)

print("docs-251: the README program row, the §5 row, and the R-48 status landed")
