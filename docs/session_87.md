# Session 87 — repo session 252 (R-49): the list-focus-ring, resend-shape, and type-lag round

The operator re-sent the standing directive after the R-48 ship pair
(b89b486 + the owner's session_86.md transcript capture). Per the
recorded rhythm, this session defaulted to findings-led iteration:
refresh, re-audit, remediate, verify, capture, document, commit, push —
with the operator's named asks (the mobile navigation comparison, the
Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.

## Intake — a green cold baseline, one known flake

The workspace had been reset (a fresh clone); the environment
re-anchored (bun install 594 packages; the prisma client regenerated;
the .env rebuilt from .env.example with the DATABASE_URL contract + a
fresh AUTH_SECRET; db:push/db:seed; the census MATCH 80/4/3/6/5/7,
users=1). The chromium-1254 install was the one toolchain step (the
documented session-248 class).

The baseline gate was GREEN at HEAD 04fd4f6 — the exact v2.48.0 ship
state reproduced: lint 0/0 · tsc 0 · 1686/1686 unit (103 files) ·
build · smoke 15/15 · 151/151 e2e (one transient timing-leg failure on
the first e2e run — the known flake family documented at R-47; two
consecutive green runs after) · ALL SIX parity drift gates CLEAN at
0.5pct margin · census MATCH.

The standing asks: probe:ref STABLE on every layer — the bundle md5
6d3779af… unchanged, the F-250q stylesheet fingerprint 96f24d45…
unchanged, the demo data zero, the desktop nav 256/9, the TRUE-390
menu census standing. THE MOBILE-NAVIGATION COMPARISON ran through
agent-browser at TRUE 390×844 on BOTH sides (the viewport verified by
computed innerWidth after the first captures came out 1280-wide — the
honest-viewport re-check): the reference's drawer opens with 9
destinations + Sign Out and closes on the X toggle; OUR clone's drawer
carries the identical 9 destinations + the labeled superset (the
aria-label hamburger, the navigation landmark, the skip link) and
closes with the aria-expanded flip — parity plus the documented
superset, NO Tailwind v4 regression (the audit's five-leg verdict:
zero phantom breakpoints, zero unpinned tokens, no config file, no
misused renamed utilities, the .dark flips complete). `bun audit`
unchanged (1 moderate dev-chain minimatch, the documented deferral).
The neo-crm upstream check: unchanged (b3d0fbe) — nothing to port.
The SEO surface verified (smoke leg 12: sitemap + robots + manifest
200). The .env contract, the db/ at the repo root, the
vitest/playwright configs, and the .env.example six-knob set all
standing. Comparison captures for the mobile-nav ask saved beside the
round's captures (mobile-nav-{clone,reference}-390.png).

## The fresh-eyes audit — the wash, the shape, and the lag

Three Mode-C passes (the R-48 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer): **0 Critical /
0 High / 1 Medium / 5 Low cured + 4 Informational cured-as-riders + 1
Informational registered** NEW after dedup, every material claim
re-verified at file:line by the driving session — every contrast
number re-computed by code, not carried from the passes. All eight
R-48 cure surfaces verified holding. The API layer's FIFTH consecutive
clean bill, this time independently re-derived (the negative results
recorded so the next pass does not re-chase them). The headline
findings: THE LIST-ITEM KEYBOARD-FOCUS RING (F-252a — the sidebar
user-menu items and every Select option indicated keyboard focus
through a wash computing 1.09:1 light / 1.31:1 dark against their
panels, the only interactive families with the outline suppressed and
no ring replacement, invisible to axe and to every sweep — the F-221b
round had cured the wash's dark TEXT leg; the indicator-vs-surface leg
was a different axis nobody measured); THE RESEND SHAPE ORACLE
(F-252b — the miss arm's two-key envelope vs the known arm's
three-key form was a never-verified-state enumeration signal
surviving the production OTP knob); THE DASHBOARD USER TYPE LAG
(F-252c — the wire type still declared the four-field Pick the F-251d
route cure widened past); the palette census's trailing-comment gap
(F-252d — the R-48 comment-strip left the trailing form alive, the
docblock's "never invent it" claim falsifiable); the theme-blind
scrollbar (F-252e); the latent ring-offset arms (F-252f — the F-251g
genus's uncalled members); and the riders — the vestigial dark-wash
literal (F-252g), the red over-budget meter register note (F-252h —
3.0:1, exactly at the bar), the e2e-pin prose truths (F-252i), and the
un-messaged Zod fields (F-252j).

## R-49 — TDD execution

**R-49.1 — the pins born RED (honest RED: 18)**: the parity-252
source battery — every one verified failing for exactly the expected
defect.

**R-49.2 — the cures**: THE LIST-ITEM KEYBOARD-FOCUS RING (F-252a —
the flagship: the ring arm joins the wash on MENU_ITEM, SelectItem,
and DropdownItem — the F-218i ring-ring ink at 17.49:1 light / 18.15:1
dark, the wash preserved for pointer users); THE RESEND SHAPE ORACLE
(F-252b — the miss arm carries the always-present null key, the
forgot-password form); THE DASHBOARD USER TYPE LAG (F-252c); THE
PALETTE CENSUS TRAILING-COMMENT ARM (F-252d — the URL-colon-exempt
strip, the docblock claim true again); THE THEME-BLIND SCROLLBAR DARK
ARM (F-252e); THE LATENT RING-OFFSET ARMS (F-252f); plus the four
riders (F-252g-j). The nets caught FIVE of the round's own comment
defects mid-cure (the F-229d discipline: four hyphenated coins the
class-shape scanner read as utilities — reworded with spaces, never
allowlisted — and the pinned-phrase wrap the parity-243 net caught).
The e2e battery gained the F-252a ring leg — whose first run failed
against the STALE standalone artifact (the cold-baseline build
predated the cures; the probe proved the ring paints, the rebuild
proved the leg — the verify-the-artifact lesson re-learned).

**R-49.3 — the verification**: lint 0/0 · tsc 0 · **1704 unit (104
files, +18)** · build (the 4 pre-existing Turbopack tracing warnings,
untouched) · smoke 15/15 · 152 e2e (+1) · the six parity drift gates
CLEAN at 0.5pct margin · census MATCH · `bun audit` unchanged. THE
CAPTURES 207-211 (the own-database convention + the census tripwire +
PNG validation + blank detection): the mobile drawer at 390 (the
standing ask — 9 destinations + Sign Out asserted + the close toggle),
THE LIST-ITEM KEYBOARD-RING FACE (the flagship proven live: the
computed ring layer rgb(245,245,244) over the stone-800 wash
rgb(41,37,36); the capture harness's own nullish-coalesce bug caught
and fixed mid-run — the `in` check is the honest form for observing a
null), THE RESEND THREE-KEY FACE (proven live: the miss arm's envelope
carries message, resent, AND verificationCode: null), THE SCROLLBAR
DARK-ARM FACE (proven live: the computed thumb rgb(120,113,108)), and
THE SHELL WASH FACE (proven live: rgb(14,19,16) on the token flip
alone, the retired literal byte-equal).

## Delivery

Docs lockstep complete: count-ladder-252 (27 sites — UNIT 1686→1704,
FILES 103→104, E2E 151→152, BADGE 1837→1856 across the doc set + the
docs-counts pins incl. the §7.1 arch family 71→72 with parity-252
listed + the arithmetic 4+72+28=104), the PAD's v2.49.0 revision block
+ the guard-trio advance to v2.47.0/v2.48.0/v2.49.0 (the structural
leg's third gate-enforced ride, green-by-design BEFORE the block landed
— the F-244a rule), the README program row, the plan's §5
execution-history row + the R-49 closure, the worklog entry, and this
session record. docs-counts 17/17 at the new counts.

**Recorded, not cured** (documented in the plan §2.12): F-252k (the
useTheme no-provider fallback divergence — zero live consumers, a
product decision), plus the standing families (F-251i-k, F-250h-p,
F-249j-n, F-248h-n, F-247g-l, F-246g/h, F-245g/h, F-244i-n, F-242h/i,
F-240k-n, F-239l-s). Next session defaults to findings-led iteration
— re-send the standing directive to continue the rhythm; the
reference's styling layer remains fingerprinted, so a styling redeploy
reads CHANGED and the affected baselines re-derive per the F-250q
doctrine before the pixel gates are trusted.
