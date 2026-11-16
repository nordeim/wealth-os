# Session 91 — repo session 254 (R-51): the ordinal, spatial-reference, and lockstep-duplication round

The operator re-sent the standing directive after the R-50 ship pair
(305da31 + the owner's 0d236d3 session-log update carrying
docs/session_90.md, the session-253 transcript capture). Per the
recorded rhythm, this session defaulted to findings-led iteration:
refresh, re-audit, remediate, verify, capture, document, commit, push
— with the operator's named asks (the mobile navigation comparison,
the Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.

## Intake — a green baseline, a fresh sandbox, and a genus in the lockstep

The workspace had been reset by the sandbox — the repo re-cloned to
HEAD 0d236d3 (the v2.50.0 ship state + the owner's session-log
update), .env re-created on the DATABASE_URL="file:../db/custom.db"
contract + the AUTH_SECRET, bun install (594 packages, the prisma
client regenerated into src/generated/prisma), db:push + db:seed,
and the census MATCH (80/4/3/6/5/7, users=1).

The cold baseline gate ran GREEN — the v2.50.0 ship state reproduced
exactly, no discovery: lint 0/0 · tsc 0 · 1712/1712 unit (105 files)
· build (the 4 documented Turbopack tracing warnings) · smoke 15/15
· 152/152 e2e (one Playwright browser-install infrastructure gap on
the first run — the fresh sandbox lacked the chromium build; the
tool's installer heals it, the source unaffected) · census MATCH.

The standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the F-250q stylesheet fingerprint 96f24d45…
unchanged, the demo data zero, the desktop nav 256/9, the TRUE-390
menu census standing). THE MOBILE-NAVIGATION COMPARISON ran through
agent-browser at TRUE 390×844 on BOTH sides (the viewport verified
by computed innerWidth after the set-viewport call; the
poll-until-rendered snapshot form cured the open/snapshot race the
fresh run hit — the first snapshot rode a not-yet-rendered page and
saw only the platform badge): the reference's drawer opens with the
9 destinations + Sign Out and closes on the X toggle; OUR drawer
(the production artifact, the session-253 toolchain note) carries
the identical destinations + the labeled superset (the skip link,
the navigation landmark, the aria-label hamburger) and closes with
the aria-expanded flip — parity plus the documented superset, NO
Tailwind v4 regression. Both comparison captures re-saved at the
true viewport (PNG-valid, non-blank; the reference-side pixel
variance is live-content noise — probe:ref verified layer-level
stability). `bun audit` unchanged (1 moderate dev-chain minimatch,
the documented deferral). The neo-crm upstream check: unchanged
(b3d0fbe) — nothing to port. The SEO surface verified (smoke leg
12: sitemap + robots + manifest 200 — the sitemap's 9-URL reference
set and the robots' byte-verified form re-read at the source). The
.env contract, the db/ at the repo root, the vitest/playwright
configs, and the .env.example six-knob set all standing.

## The fresh-eyes audit — three passes, a clean API layer, and a genus in the docs lockstep

Three Mode-C passes (the R-50 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer): all six R-50
cure surfaces verified HOLDING at file:line (the parity-253 battery
re-run green 8/8 at HEAD); the API layer's SEVENTH consecutive
clean bill (all ten dimensions, all 44 handlers read); the UI source
layer clean again (one Informational). After dedup: **0 Critical /
0 High / 0 Medium / 6 Low / 2 Informational NEW**, every material
claim re-verified at file:line by the driving session.

The findings: THE CENSUS ORDINAL (F-254a — the corrected F-253b
census named the recovery leg's signup as the file's EIGHTH no-XFF
burn while it is the SEVENTH; the revoke leg's signup, later in the
same file, is the eighth — the total EIGHT and the two-spare
headroom were already true, and no test asserted the ordinal); THE
STALE SPATIAL REFERENCE (F-254b — the wealthos-side census pointed
down the file at bucket legs that sit above it); THE WHOLE-ROUTE
PIN'S AT-LEAST FORM (F-254c — the parity-253 pin's match window
cannot cross a nested closing brace, so a future arm with a nested
body would silently drop from the match set while the at-least
floor kept passing on the stale matches); THE PREMISE PIN'S
NARRATIVE ANCHOR (F-254d — the F-253a pin anchored the pre-round
narrative's lowercase parenthetical instead of the premise
sentence); THE STORE DOCBLOCK'S SELECTOR-ONLY EXAMPLE (F-254e —
fourteen page and dialog call sites subscribe bare, the house page
idiom; the docblock prescribed the selector form alone); and THE
ROUND'S HEADLINE — A GENUS: the session-253 docs-lockstep script
duplicated insertions at THREE sites, every gate green through all
three because no pin watched occurrence multiplicity — F-254f the
docs-counts guard trio's v2.50.0 pin line pasted four-fold
([v2.48.0, v2.49.0, v2.50.0, v2.50.0, v2.50.0, v2.50.0] against
198ac00's three distinct lines), F-254g the README program row's
R-50 round summary pasted three-fold, and F-254h the PAD revision
list's v2.50.0 block pasted three-fold (byte-identical
3,675-character blocks; every prior version carries exactly one).

## R-51 — TDD execution

**R-51.1 — the pins born RED (honest RED: 8)**: the parity-254
source battery — every one verified failing for exactly the expected
defect (the missing SEVENTH; the stale below; the at-least floor;
the lowercase narrative anchor; the missing blessing; the 6-pin
census against 3; the duplicated 253 summaries; the duplicated
v2.50.0 blocks).

**R-51.2 — the cures**: THE CENSUS ORDINAL (F-254a — the recovery
leg's true position stated, the revoke leg named as the eighth, the
parity-253 EIGHT total pin kept whole by the named leg's uppercase
form); THE SPATIAL REFERENCE (F-254b); THE EXACT-COUNT FORM (F-254c
— toBe(3), the conscious-update friction; the brace-window blindness
documented in the pin's own comment); THE PREMISE ANCHOR (F-254d);
THE DOCBLOCK BLESSING (F-254e — the bare page idiom named alongside
the selector form); THE TRIO ADVANCE + DEDUP (F-254f — the advance
to v2.49.0/v2.50.0/v2.51.0 with the three duplicate pin lines
retired, green-by-design with the v2.51.0 block in the same commit
per the F-244a rule; the parity-243 mirror pin's F-247d same-commit
recalibration, its fifth ride); THE PROGRAM ROW COLLAPSE (F-254g —
the three byte-identical summaries collapsed to one, the
session-254 summary prepended per the row's convention); and THE
REVISION LIST DEDUP (F-254h — the two duplicates retired, the
v2.51.0 block prepended). The structural rider: the parity-254
no-duplicate invariant battery (the trio's pin census, the program
row's each-session-once, the revision list's each-version-once) — a
future lockstep script that duplicates an insertion fails
`bun run test`.

**R-51.3 — the verification**: parity-254 GREEN 8/8 · lint 0/0 ·
tsc 0 · **1720 unit (106 files, +8)** · build (the 4 documented
Turbopack tracing warnings) · smoke 15/15 · the FULL e2e battery
152/152 · census MATCH · `bun audit` unchanged · THE SIX PARITY
DRIFT GATES CLEAN (the four sweep classes 1440/390/768/1024 at the
0.5pct margin, the fullpage sweep, the interior census within the
standing allowances at the 0-event margin — the ship verification,
the reference reachable) · THE CAPTURES 216-218 (the own-database
convention + the census tripwire + PNG validation + blank
detection: the mobile drawer at 390 with the 9-destination + Sign
Out census and the aria-expanded close flip asserted; the dashboard
desktop in the dark default with the shell wash rgb(14,19,16)
asserted; the login face in the forced light) + the two comparison
captures at TRUE 390×844.

## Delivery

Docs lockstep complete: the count ladder (UNIT 1712→1720, FILES
105→106, BADGE 1864→1872 across the doc set — README's badge +
stack table + file hierarchy + testing table + verification row +
program row; AGENTS's command row; CLAUDE's gate line + command
table + test pyramid; the SKILL's four sites; the PAD's gate line +
tree + §7.1 (Unit row, arch family 73→74 with parity-254 listed,
the arithmetic 4+74+28=106) + §9 command row + §10 closing line +
pre-push checklist), the PAD's v2.51.0 revision block + the trio's
gate-enforced advance to v2.49.0/v2.50.0/v2.51.0 (the structural
leg's fifth ride, green-by-design BEFORE the block landed — the
F-244a rule; the session-253 advance's duplicate pin lines retired
with it), the README program row's collapse + the session-254
summary, the plan's §5 execution-history row + the R-51 closure,
the worklog entry, and this session record. docs-counts 17/17 at
the new counts.

**Recorded, not cured**: no NEW registrations this round (the
standing families ride: F-252k plus F-251i-k, F-250h-p, F-249j-n,
F-248h-n, F-247g-l, F-246g/h, F-245g/h, F-244i-n, F-242h/i,
F-240k-n, F-239l-s — plan §2.12's register), plus the toolchain
note (the agent-browser/HeadlessChrome-157 dev-build hydration gap
— an environment note for the comparison workflow, session 253).
Next session defaults to findings-led iteration — re-send the
standing directive to continue the rhythm.
