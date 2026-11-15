# Session 85 — repo session 251 (R-48): the focus-ring, cli-anchor, and settings-flag round

The operator re-sent the standing directive after the R-47 ship pair
(e6b94ef + the owner's session_84.md transcript capture). Per the
recorded rhythm, this session defaulted to findings-led iteration:
refresh, re-audit, remediate, verify, capture, document, commit, push —
with the operator's named asks (the mobile navigation comparison, the
Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.

## Intake — a green cold baseline, no toolchain gap this time

The workspace had been reset (a fresh clone); the environment
re-anchored (bun install 594 packages after one transient tarball
retry; the prisma client regenerated; the .env rebuilt from
.env.example with the DATABASE_URL contract + a fresh AUTH_SECRET;
db:push/db:seed; the census MATCH 80/4/3/6/5/7, users=1). The
chromium-1254 install was the one toolchain step (the documented
session-248 class, pre-known this round).

The baseline gate was GREEN at HEAD c903958 — the exact v2.47.0 ship
state reproduced: lint 0/0 · tsc 0 · 1668/1668 unit (102 files) ·
build · smoke 15/15 · 151/151 e2e · ALL SIX parity drift gates CLEAN
at 0.5pct margin · census MATCH.

The standing asks: probe:ref STABLE on every layer — the bundle md5
6d3779af… unchanged, the F-250q stylesheet fingerprint 96f24d45…
unchanged, the demo data zero, the desktop nav 256/9, the TRUE-390
menu census standing. THE MOBILE-NAVIGATION COMPARISON ran through
agent-browser at TRUE 390×844 on BOTH sides: the reference's drawer
opens with 9 destinations (Dashboard, Income, Expenses, Accounts,
Investments, Import, Analytics, Goals, Settings) + Sign Out and closes
on the toggle; OUR clone's drawer carries the identical 9 destinations
+ the labeled superset (the aria-label hamburger, the navigation
landmark, the skip link) and closes with the aria-expanded flip —
parity plus the documented superset, NO Tailwind v4 regression (the
token discipline verified fully clean by the UI audit pass — zero
phantom breakpoints, zero unpinned tokens, no config file, no misused
renamed utilities). `bun audit` unchanged (1 moderate dev-chain
minimatch, the documented deferral). The neo-crm upstream check:
unchanged (b3d0fbe) — nothing to port. The SEO surface verified (smoke
leg 12: sitemap + robots + manifest 200). The .env contract, the db/
at the repo root, the vitest/playwright configs, and the .env.example
six-knob set all standing.

## The fresh-eyes audit — the amber ring, the mirror db, and the stranded flag

Three Mode-C passes (the R-47 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer): **0 Critical /
0 High / 1 Medium / 6 Low cured + 2 Informational cured-as-riders + 3
Informational registered** NEW after dedup, every material claim
re-verified at file:line by the driving session — the prisma-config
divergence LIVE-PROBED under the repo's own bun. All seven R-47 cure
surfaces verified holding. The headline findings: THE AUTH-FACE
FOCUS-RING REGRESSION (F-251a — nine constants carried
focus-visible:ring-amber-400 at 1.67:1 on the forced-light auth
surfaces, below the 3:1 non-text bar, while the three funnel submits
already carried the F-218i ring-ring ink at 17.5:1 — the
F-222g/F-223h rounds re-introduced the amber genus citing a submit
genus that had already been cured, with no contrast re-measure); THE
PRISMA.CONFIG CLI-HALF ANCHORING GAP (F-251b — under bun, a direct
`bun x prisma db push` read the bun-absolutized DATABASE_URL
(file:/parent-of-repo/db/custom.db) and the config's direct
resolveDatabaseUrl passed absolute URLs through, operating on a mirror
db while the app served the repo db — the exact trap AGENTS.md
elevates to a non-negotiable gotcha, reopened through the CLI half of
the db-path contract); THE SETTINGS-SETTLED STRAND (F-251c —
updateSettings' commit never re-flipped the flag, so a superseded
hydrerate tail stranded it false over a fresh committed slice); the
dashboard user projection narrowness (F-251d — the store's `as User`
cast asserted photoUrl/role the payload never carried); the
drift-probe's positional CSS target + exit hygiene (F-251e); the dead
gray-500 pin riding a docblock citation with the palette census blind
to comments (F-251f — the F-224v genus); the white ring-offset halo on
four dark-capable focus surfaces (F-251g — the F-129c1 panel
retirement predates the dark era); and the amber meter fills without
their F-220p register entry (F-251h).

## R-48 — TDD execution

**R-48.1 — the pins born RED (honest RED: 18)**: the parity-251 source
battery's seventeen pins (all eight cure surfaces) + the
store-staleness battery's settingsSettled strand leg — every one
verified failing for exactly the expected defect.

**R-48.2 — the cures**: THE AUTH-FACE FOCUS-RING CURE (F-251a — the
flagship: the nine constants adopt focus-visible:ring-ring, the
submits' own standing standard; the drawer Sign Out's navy-surface
amber-400/60 arm stands at ~4.4:1); THE PRISMA.CONFIG CLI-ANCHOR CURE
(F-251b — the datasource routes through runtimeDatabaseUrl(), the
signature-aware seam, verified live: the direct invocation now lands
on <repo>/db/custom.db with no mirror created, all four invocation
patterns preserved); THE SETTINGS-SETTLED RIDER (F-251c + the F-250p
comment-truth rider on the "wins honestly" line); THE DASHBOARD USER
PROJECTION (F-251d); THE DRIFT-PROBE CURES (F-251e — the /assets/
positive selection + the exitCode/return form; probe:ref re-run
STABLE); THE gray-500 RETIREMENT TRIO (F-251f — comment reword, pin
retirement, census comment-strip); THE WHITE HALO CURE (F-251g — four
sites, the F-129c1 adjudication superseded and its comment rewritten);
THE METER-FILL REGISTER ENTRY (F-251h). The same-commit recalibrations
rode eight pin files (parity-218/222/223/249/250, login-reset,
login-views, prisma-7-contract — the F-247d precedent), and the
parity-229 nets caught two of my own cure comments (the F-229d
discipline: "light-mode" and "invisible" carriers in the tabs
docblock) — reworded, never allowlisted.

**R-48.3 — the verification**: lint 0/0 · tsc 0 · **1686 unit (103
files, +18)** · build (the 4 pre-existing Turbopack tracing warnings,
untouched) · smoke 15/15 · 151 e2e · the six parity drift gates CLEAN
at 0.5pct margin · census MATCH · `bun audit` unchanged. THE CAPTURES
202-206 (the own-database convention + the census tripwire + PNG
validation + blank detection): the mobile drawer at 390 (the standing
ask — 9 destinations + Sign Out asserted + the close toggle), THE
AUTH-FOCUS RING FACE (the flagship proven live: the keyboard-focused
submit's computed ring reads rgb(28,25,23) — the token ink, the amber
arm gone; the harness learned the transition-settle discipline:
transition-all fades the ring in, and an early computed read
false-negatives at alpha 0.016), THE SETTINGS-SETTLED RIDER FACE
(proven live: the held stale tail released after the PUT — the store
keeps EUR AND settled=true), THE USER-PROJECTION FACE (proven live:
role="user" + photoUrl present), and THE TABS-PANEL HALO FACE (proven
live: the focused panel's computed offset band reads rgb(14,19,16) —
the flipped dark token, the white halo gone).

## Delivery

Docs lockstep complete: count-ladder-251 (23 sites — UNIT 1668→1686,
FILES 102→103, BADGE 1819→1837 across the doc set + the docs-counts
pins incl. the §7.1 arch family 70→71 with parity-251 listed + the
arithmetic 4+71+28=103), the PAD's v2.48.0 revision block + the
guard-trio advance to v2.46.0/v2.47.0/v2.48.0 (green-by-design BEFORE
the block landed — the F-244a rule, the structural leg's third
gate-enforced ride), the README program row, the plan's §5
execution-history row + the R-48 closure, the worklog entry, and this
session record. docs-counts 17/17 at the new counts.

**Recorded, not cured** (documented in the plan §2.11): F-251i (the
drawer sign-out rider unmount — the store's exactly-own-bump era guard
holds the corner), F-251j (the settings theme dead round-trip), F-251k
(the reset route's schema-less body), plus the standing families
(F-250h-p, F-249j-n, F-248h-n, F-247g-l, F-246g/h, F-245g/h,
F-244i-n, F-242h/i, F-240k-n, F-239l-s). Next session defaults to
findings-led iteration — re-send the standing directive to continue
the rhythm; the reference's styling layer remains fingerprinted, so a
styling redeploy reads CHANGED and the affected baselines re-derive
per the F-250q doctrine before the pixel gates are trusted.
