#!/usr/bin/env python3
"""pad-251.py — the PAD lockstep: the §7.1 family row (70->71), the
guard-trio advance (green-by-design BEFORE this session's own revision
block, per the F-244a rule), and the v2.48.0 [SR] revision block."""

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

# 1. The PAD's own §7.1 architecture-pins family row (70 -> 71, parity-251).
sub(
    "Project_Architecture_Document.md",
    "| — architecture pins | 70 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, db-transient) |",
    "| — architecture pins | 71 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, parity-243, parity-244, parity-245, parity-246, parity-247, parity-248, parity-249, parity-250, parity-251, db-transient) |",
    "the §7.1 arch-pins family row (70 -> 71)",
)

# 2. The guard-trio advance (tests/docs-counts.test.ts): v2.46.0's pin
#    retires; the v2.48.0 block joins at its own ship counts. Landed
#    BEFORE the revision block below per the F-244a rule — the window
#    covers the newest block the moment it exists.
sub(
    "tests/docs-counts.test.ts",
    """    expect(p).toMatch(/\\[SR\\] v2\\.45\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1622 unit \\(99 files, \\+12\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.46\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1645 unit \\(101 files, \\+23\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.47\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1668 unit \\(102 files, \\+23\\)/);""",
    """    expect(p).toMatch(/\\[SR\\] v2\\.46\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1645 unit \\(101 files, \\+23\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.47\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1668 unit \\(102 files, \\+23\\)/);
    expect(p).toMatch(/\\[SR\\] v2\\.48\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1686 unit \\(103 files, \\+18\\)/);""",
    "the guard-trio advance (v2.46.0/v2.47.0/v2.48.0)",
)

# 3. The v2.48.0 [SR] revision block (newest-first, above v2.47.0's).
sub(
    "Project_Architecture_Document.md",
    """- [SR] v2.47.0 (session 250, R-47 — the settings-sequence,""",
    """- [SR] v2.48.0 (session 251, R-48 — the focus-ring, cli-anchor, and
  settings-flag round): the fresh-eyes audit (three Mode-C passes — the
  R-47 cure surfaces driven by the session, the API/auth/security
  layer, and the UI/a11y/shell layer; 0 Critical / 0 High / 1 Medium /
  6 Low cured + 2 Informational cured-as-riders + 3 Informational
  registered after dedup, every material claim re-verified at
  file:line by the driving session, the prisma-config divergence
  LIVE-PROBED under the repo's own bun; all seven R-47 cure surfaces
  verified holding; the Tailwind v4 standing-ask hunt clean on every
  axis — zero phantom breakpoints, zero unpinned tokens, no config
  file, no misused renamed utilities). The round's flagship: THE
  AUTH-FACE FOCUS-RING CURE (F-251a — nine constants on the
  forced-light auth faces carried the amber ring at 1.67:1 against the
  white card, below the 3:1 non-text bar (WCAG 1.4.11) and the only
  focus affordance on their controls; the three funnel submits already
  carried the F-218i ring-ring ink at 17.5:1 — the nine stragglers
  join them, proven live by capture 203's computed-style read of
  rgb(28,25,23) on the keyboard-focused submit). Plus: THE
  PRISMA.CONFIG CLI-ANCHOR CURE (F-251b — the mirror-db trap's CLI
  half: under bun, a direct `bun x prisma …` read the
  bun-absolutized DATABASE_URL (file:/parent-of-repo/db/custom.db)
  and the config's direct resolveDatabaseUrl passed absolute URLs
  through, so the CLI operated on a mirror db while the app served
  the repo db — live-probed, then cured by routing the datasource
  through runtimeDatabaseUrl(), the signature-aware seam; the direct
  invocation verified landing on <repo>/db/custom.db post-cure); THE
  SETTINGS-SETTLED RIDER (F-251c — updateSettings' commit never
  re-flipped the flag, so a superseded tail stranded it false over a
  fresh slice; the rider settles the cycle in the write's own commit,
  proven live by capture 204 — EUR kept AND settled=true under the
  held-tail interleaving); THE DASHBOARD USER PROJECTION (F-251d —
  the store's `as User` cast asserted photoUrl/role the payload never
  carried; the projection widens to the full six-field shape, proven
  live by capture 205); THE DRIFT-PROBE CSS POSITIVE SELECTION + EXIT
  HYGIENE (F-251e — the /assets/ pathname selection replaces the
  positional css[0], and the four in-main process.exit(1) paths become
  exitCode+return so the finally's browser.close() runs); THE DEAD
  gray-500 PIN RETIREMENT + THE PALETTE CENSUS COMMENT-STRIP (F-251f
  — the pin's only consumer was a docblock citation; the census now
  strips comment spans so a carrier can never satisfy it again — the
  F-224v genus's structural cure); THE WHITE RING-OFFSET HALO CURE
  (F-251g — four dark-capable focus surfaces gain ring-offset-background,
  the F-226i token form; the F-129c1 panel adjudication superseded by
  the dark-era posture, proven live by capture 206's computed
  rgb(14,19,16) offset band on the focused Expenses panel); and THE
  AMBER METER-FILL REGISTER ENTRY (F-251h — the F-220p exemption
  pattern, the measured 1.33:1/1.71:1 values cited). Registered, not
  cured: the drawer sign-out rider unmount (F-251i), the settings
  theme dead round-trip (F-251j), the reset route's schema-less body
  (F-251k), plus the standing families. The verification: lint 0/0 ·
  tsc 0 · 1686 unit (103 files, +18) · build · smoke 15/15 · 151 e2e
  · the six parity drift gates CLEAN at 0.5pct margin · census MATCH ·
  `bun audit` unchanged · the reference STABLE on every standing drift
  layer (the F-250q stylesheet fingerprint included) · the
  mobile-navigation ask verified on BOTH sides at TRUE 390×844 through
  agent-browser · the captures 202-206 (the own-database convention +
  the census tripwire) · the docs lockstep in the same commit.

- [SR] v2.47.0 (session 250, R-47 — the settings-sequence,""",
    "the v2.48.0 [SR] revision block",
)

print("pad-251: the family row, the guard trio, and the revision block landed")
