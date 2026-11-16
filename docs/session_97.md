# Session 97 — repo session 257 (R-54): the stale-consumer, dead-arm, and glyph-citation round

The operator re-sent the standing directive after the R-53 ship pair
(f452af4 + the owner's 40b21cb session-log update carrying
docs/session_95.md, the session-256 record, and docs/session_96.md,
the transcript capture). Per the recorded rhythm, this session
defaulted to findings-led iteration: refresh, re-audit, remediate,
verify, capture, document, commit, push — with the operator's named
asks (the mobile navigation comparison, the Tailwind v4 state, the
.env/db contract, the vitest/playwright configs, the sitemap/SEO
surface, the .env.example, the screenshots, the SSH-wrapper push)
re-verified along the way.

## Intake — a fresh clone and a rebuilt environment

The sandbox had been RESET: the workspace came back as a fresh
`git clone` at HEAD 40b21cb. The environment was rebuilt from cold
(bun install — also regenerating the prisma client into
src/generated/prisma · cp .env.example .env with a fresh openssl
AUTH_SECRET · db:push · db:seed · playwright chromium install), the
.env on the DATABASE_URL="file:../db/custom.db" contract, db/ at
the repo root, and the census MATCH (80/4/3/6/5/7, users=1).

The cold baseline gate ran GREEN — the v2.53.0 ship state reproduced
exactly, no discovery: lint 0/0 · tsc 0 · 1737/1737 unit (108 files)
· build (the 4 documented Turbopack tracing warnings) · smoke 15/15
· 152/152 e2e · census MATCH.

The standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the F-250q stylesheet fingerprint 96f24d45…
unchanged, the demo data zero, the desktop nav 256/9, the TRUE-390
menu census standing). THE MOBILE-NAVIGATION COMPARISON ran through
agent-browser at TRUE 390×844 on BOTH sides (the viewport verified
by computed innerWidth): the reference's drawer opens with the 9
destinations + Sign Out and closes on the X toggle; OUR drawer (the
production artifact on a scratch db, the session-253 toolchain
note) opens with the identical destinations + Sign Out via the
labeled hamburger, the aria-expanded flip Open→Close navigation
menu verified on open AND close, the sheet unmounted and zero
visible nav links after the close — parity plus the documented
superset, NO Tailwind v4 regression; both comparison captures
re-saved (PNG-valid at the true viewport). `bun audit` unchanged (1
moderate dev-chain minimatch, the documented deferral). The
neo-crm upstream check: unchanged (b3d0fbe) — nothing to port. The
SEO surface verified (smoke leg 12: sitemap + robots + manifest
200). The .env contract, the db/ at the repo root, the
vitest/playwright configs, and the .env.example six-knob set all
standing.

## The fresh-eyes audit — three passes, a tenth clean bill, and a false premise caught

Three Mode-C passes (the R-53 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer): all SIX
R-53 cure surfaces verified HOLDING at file:line (the parity-256
battery re-run green 6/6 at HEAD, the seven reworded primitives'
citations re-checked against the live palette); the API layer's
TENTH consecutive clean bill (all ten house contracts, all 45
exported handlers across 30 route files — the counts confirmed
exactly; one candidate withdrawn by the audit itself after proving
it unreachable: the verifySessionToken NaN-exp shape, covered by
the JSON.parse throw + the exp and span bounds); the UI source
layer clean on every named contract (the shell family, the theme
system, the Tailwind v4 token discipline, the store, the date
doctrine, the route twins, the metadata family — all holding) with
four NEW findings. After dedup: **0 Critical / 0 High / 0 Medium /
5 Low / 2 Informational NEW**, every material claim re-verified at
file:line by the driving session — whose own verification caught
the audit's one FALSE PREMISE: the badge F-252f comment's "zero
consumers today" (the settings page has rendered four-plus Badges
since the settings glass round, commit b1d38de — roughly forty-six
sessions BEFORE session 252 landed the claim; the finding elevated
to the cure set on the falsified-prose arm).

The findings — ONE GENUS: STALE CONSUMER-TRUTH AND DEAD-ARM PROSE,
comments claiming constructions or consumer sets the tree no longer
(or never) carried. F-257m (Low): the sidebar header's retired
check-mark Synced-pill glyph — the live pill is the Wifi glyph the
F-207h swap landed. F-257n (Low): the login-card header's retired
CSS-drawn logo construction (the live card renders the reference's
own image asset, session-208/F-208e) plus the singular
Google-button phrase against the four social buttons. F-257o (Low):
the toast description's stone-400 dark arm — byte-equal to the
flipped muted token since the F-218l cure; the driving session's
whole-tree sweep confirmed the dead-arm genus carries exactly this
one site (every other dark:text-stone-400 carrier pairs a DIFFERENT
light value — a live arm). F-257p (Low): the BUTTON_BASE radius
member — zero consumers, no reserved-reason (the F-229f re-entry
rule's own violation). F-257q (Low): the badge focus-frame comment's
false-at-birth zero-consumers claim, with the five focus arms' bare
focus form swapped to the focus-visible house form as the rider.
Registered, not cured: F-257a (the signup count-then-create TOCTOU
— concurrent first signups can both mint the admin role tag;
display-only, the role column carries no authority) and F-257r (the
no-FOUC bootstrap's unreachable query-string regex alternative —
location.pathname never carries the query; harmless mirror
symmetry), plus the withdrawn NaN-exp candidate (recorded so the
next pass does not re-chase it).

## R-54 — TDD execution

**R-54.1 — the pins born RED (honest RED: 7)**: the parity-257
source battery — the five cure legs (F-257m/n/o/p/q). Two harness
fixes landed at GREEN-proof time (the docblock line-wrap span — a
pinned phrase crossing a comment wrap needs whitespace
normalization; and the comment-continuation asterisk — the " * "
prefix survives a plain whitespace collapse; both the s198 lesson's
docblock edition). The RED was re-proven against the pre-cure tree
via stash: the battery failed on EXACTLY the seven expected
defects, the honest-RED discipline holding.

**R-54.2 — the cures (five)**: the sidebar header reword (the
footer's wifi Synced pill); the login-card header reword (the
reference's own logo image asset with the CSS-drawn construction
named as retired history; the four white social buttons); the toast
dead-arm retirement (the description rides text-muted alone — the
F-218l token flip carries the dark theme); the BUTTON_BASE radius
member retirement (with the F-229f re-entry rationale in place);
the badge comment reword (the live settings consumers, the
latent-because-unfocusable truth) + the five focus arms' swap to
the focus-visible house form. Every reword follows the F-229d
discipline (describe with spaces and numbers, never coin a
hyphenated form, cite only live utilities) — the parity-229/242/256
carrier nets green through the edits. THREE COMPANION PINS
recalibrated same-commit (parity-252's badge offset arm,
toast-anatomy's description classes, dark-tokens' toast description
leg — each to the cured form, each with its rationale in the pin).

**R-54.3 — the verification**: parity-257 GREEN 7/7 · lint 0/0 ·
tsc 0 · **1744 unit (109 files, +7)** · build (the 4 documented
Turbopack tracing warnings) · smoke 15/15 · the FULL e2e battery
152/152 · census MATCH · `bun audit` unchanged · THE CAPTURES
225-227 (the own-database convention + the census tripwire + PNG
validation + blank detection: the mobile drawer at 390 with the
9-destination + Sign Out census and the aria-expanded close flip
asserted; the dashboard desktop in the dark default with the shell
wash rgb(14,19,16) asserted; THE CONSUMERS FACE — the round's cured
consumer truths proven LIVE: the four settings trust badges
rendering on the frame with the focus-visible arms present and NO
bare focus form, the sidebar's wifi Synced pill rendering with its
glyph) + the two comparison captures at TRUE 390×844. The six
parity drift gates not re-run (the session-253 precedent: the
comment-and-dead-arm cures touch no baseline-carried parity surface
— the one DOM change, the retired toast arm, computes the identical
value the token already provided; probe:ref verified the reference
side STABLE).

## Delivery

Docs lockstep complete: the count ladder (UNIT 1737→1744, FILES
108→109, BADGE 1889→1896 across the doc set — README's badge +
stack table + file hierarchy + testing table + verification row +
program row; AGENTS's command row; CLAUDE's gate line + command
table + test pyramid; the SKILL's four sites; the PAD's gate line +
tree + §7.1 (Unit row 109/1744, arch family 76→77 with parity-257
listed, the arithmetic 4+77+28=109) + §9 command row + §10 closing
line + pre-push checklist), the PAD's v2.54.0 revision block + the
trio's gate-enforced advance to v2.52.0/v2.53.0/v2.54.0 (the
structural leg's eighth ride, green-by-design with the v2.54.0
block in the same commit per the F-244a rule), the README program
row's R-54 summary prepended, the plan's §5 execution-history row,
the worklog entry, and this session record. The known companions
recalibrated same-commit: the docs-counts §7.1 family-row literal
(77 + parity-257) and the parity-243 mirror pin (the trio advance's
eighth ride). docs-counts 17/17 at the new counts.

**Recorded, not cured**: F-257a (the signup TOCTOU — display-only)
and F-257r (the bootstrap regex's dead alternative — harmless
mirror symmetry), plus the withdrawn NaN-exp candidate. The
standing families ride (F-252k plus the prior registers, plan
§2.15), plus the toolchain note (the agent-browser
HeadlessChrome-157 dev-build hydration gap — session 253,
re-confirmed this session: the clone-side comparison rode the
production artifact cleanly). Next session defaults to findings-led
iteration — re-send the standing directive to continue the rhythm.
