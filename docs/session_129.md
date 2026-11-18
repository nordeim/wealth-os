# Session 273 (R-70) — the dynamic-viewport, config-loader, and register-promotion round

The standing directive re-sent after the R-69 ship pair (488b49c2 + the
owner's 545710ad carrying docs/session_128.md, the session-272
transcript). This session: repo session 273, R-70, plan v2.70.0, this
record riding session_129.md, worklog Task ID 273.

The intake: the workspace had been reset (a fresh clone at HEAD
545710ad, tree clean — the prior session's work ALREADY SHIPPED), the
environment rebuilt cold (bun install + the postinstall prisma
generate, .env from .env.example on the DATABASE_URL="file:../db/
custom.db" contract, db/ at the repo root, db push + seed, census
MATCH (81/4/3/6/5/7, users=1)). The one cold-start deviation was
environmental — the cached Playwright chromium build did not match the
1.65 pin (the headless-shell 1254 build installed, then the battery
ran green). THE COLD BASELINE GATE GREEN AT HEAD — the v2.69.0 ship
state reproduced exactly, no discovery: lint 0/0 · tsc 0 · 1972/1972
unit (124 files) · build (the 4 documented Turbopack tracing
warnings) · smoke 15/15 · 161/161 e2e.

The standing asks: probe:ref STABLE on every layer (the bundle
1,402,874 bytes / md5 6d3779af…, the stylesheet md5 96f24d45…, the
demo-data ZERO census, the desktop nav census 256px · 9 links, the
TRUE-390 menu census opens=true · 9 destinations) · the mobile-nav
comparison verified on BOTH sides at TRUE 390×844 (the reference
through probe:ref's TRUE-390 menu census; the clone side riding
comparison-265.ts on the production artifact over the scratch
db/comparison.db — pre-open 0 · 9 destinations + Sign Out · the
aria-expanded flip · post-close 0 · census tripwire MATCH · no
Tailwind v4 regression) · `bun audit` UNCHANGED (the 1-advisory
dev-chain census the R-69 re-anchor carries — the minimatch moderate,
zero runtime) · neo-crm unchanged (b3d0fbe) · the SEO surface
verified (smoke leg 12: sitemap + robots + manifest 200; the
metadata/pwa-metadata/page-titles pins 30/30) · the .env contract +
the db/ at the repo root + the vitest/playwright configs + the
.env.example standing.

The audit: three Mode-C passes dispatched as parallel research
subagents per the house convention, every material claim re-verified
at file:line by the driving session. The R-69 cure surfaces: all
seventeen HOLDING (the parity-272 battery 23/23 re-run green). The
API/auth/security layer: the TWENTY-SIXTH consecutive clean bill (all
thirteen house contracts, 45 handlers / 30 route files; every
candidate dismissed into documented postures). The UI/a11y/shell
layer: all eight standing contracts verified holding live (the a11y
two-gate 47/47, the mobile battery 20/20, the guard suites 72/72).
Final ledger: 0 Critical / 0 High / 0 Medium / 2 Low / 3 Informational
NEW after dedup.

The round's flagship: **F-273a the shell root's h-screen (100vh)
dynamic-viewport trap — the F-220p register entry promoted with the
reference construction DECODED.** The R-17 registration said "h-dvh is
the robust form — reference construction unknown"; the decode: the
reference has NO fixed-height shell at all (F-207e: its section shells
are min-h-screen document-scrolled; F-210a: the scroll-model
divergence is the deliberately absorbed superset), so no parity
constraint binds our shell's height MECHANISM and the swap is
parity-neutral by construction. In headless Chromium 100dvh equals
100vh — every pixel-level gate stays byte-identical — while on iOS
Safari the static 100vh root plus overflow-hidden left the bottom of
main's scroll region unreachable behind the expanded browser chrome
(the F-219h drawer genus at the shell). The cure: the root swaps to
h-dvh, both comment carriers reworded (a comment-carried h-screen
emits dead CSS once the code site cures — the F-229d net's own
trigger), and the toast column's max-h-screen rides the same cure (a
fixed-position element capped at the static viewport on the mobile
widths where the dynamic toolbar lives). The min-h-screen
document-scrolled forms are classified SAFE by construction and
recorded, not touched.

The round's rider: **F-273b the vitest config-loader deprecation** —
the warning fired on every unit run ("ESM syntax in a file loaded as
CommonJS"); the .mts rename cures it, empirically validated pre-plan
with a scratch rename (0 warnings after; the parity-229 walk pin
trips born-RED exactly as the contract-change rule predicts). The
cure: vitest.config.ts → vitest.config.mts + the tsconfig **/*.mts
include (the renamed file cannot escape the type gate — "**/*.ts"
does not match ".mts") + the six reference sites (the next.config
exclusion entry, the parity-229 walk lists at both sites, the README
tree row, the skill doc's file card, the playwright config comment).

Registered: F-273c the §2.30 ledger's PAD anchors (+59 lines —
inherent to the revision-block-prepend convention; navigation is by
content-grep), F-273d the axe sanctioned-register substring matching
(the register discipline manages it; the tightening deferred), F-273e
the iOS background-attachment: fixed degradation (the decorative
page-wash glow only).

The execution: the plan v2.70.0 written via the assert-guarded script
(insertions only, every anchor asserted); the parity-273 battery born
honest RED (9 legs fail — the false forms ride the tree at HEAD); the
cures (scripts/cures-273.py + scripts/cures-273b.py after the first
script's 2-space window missed the parity-229 ROOT_CONFIGS twin at
4-space indentation — the F-247e slice-window lesson's own edition,
the continuation recorded per the one-shot convention). The
verification: parity-273 GREEN 9/9 · parity-229 GREEN 23/23 at the
updated walk lists · docs-counts GREEN at the advanced trio (the
twenty-fourth gate-enforced ride) · parity-272/271/243/236/270 GREEN
· lint 0/0 · tsc 0 · 1981/1981 unit (125 files, +9) · build · smoke
15/15 · 161/161 e2e (zero new legs) · **THE SIX PARITY DRIFT GATES
RE-RUN CLEAN** (the round changed a swept surface — the shell root
class — and the drift chain itself proved zero pixel movement: the
four sweep classes at 1440/390/768/1024, the fullpage axis within
baseline + 0.5, the interior census at 0-event margin) · census MATCH.

The captures: the standing evidence faces + the round's proof faces,
live-asserted before committing — 263 the shell's desktop face at
1280×800 (the computed-height dvh proof: the h-dvh root's computed
height 800px equals the viewport; the flagship dashboard's KPIs and
charts asserted) · 264 the main scroller's reachability at 1280×800
(the expenses page scrolled to the bottom, the copyright footer
visible — the genus's desktop proof) · 265 the mobile drawer at
390×844 (9 destinations + Sign Out). All three PNGs validated
(dimensions + solid surfaces); the census tripwire MATCH.

The docs lockstep: the count ladder 1972→1981 / 124→125 / badge
2133→2142 across README/AGENTS/CLAUDE/SKILL/PAD, the §7.1 rows (arch
pins 92→93 + parity-273 in the list, the arithmetic comment), the
v2.70.0 SR block (its verification line in the trio-regex form from
birth), the trio advance (docs-counts + the parity-243 mirror), the
README status row to R-70, the §5 execution-history row.

The ship: the conventional commit on main, the push via the SSH
wrapper (the runbook's paramiko shim), the key shredded after.

Next round defaults to findings-led iteration — re-send the standing
directive to continue the rhythm.
