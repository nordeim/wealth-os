# Session 89 — repo session 253 (R-50): the order-dependence, burn-ledger, and fixed-email round

The operator re-sent the standing directive after the R-49 ship pair
(99bf966 + the owner's 198ac00 prompt update carrying
docs/session_88.md, the session-252 transcript capture). Per the
recorded rhythm, this session defaulted to findings-led iteration:
refresh, re-audit, remediate, verify, capture, document, commit, push —
with the operator's named asks (the mobile navigation comparison, the
Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.

## Intake — a green baseline and a real discovery

The workspace pulled to HEAD 198ac00 (the v2.49.0 ship state + the
owner's prompt update). The environment stood (bun 1.3.14, the prisma
client, the .env contract, the census MATCH 80/4/3/6/5/7, users=1).
The cold baseline gate ran GREEN — lint 0/0 · tsc 0 · 1704/1704 unit
(104 files) · build (the 4 documented Turbopack warnings) · smoke
15/15 · 152/152 e2e on the re-run (the first battery run's one
failure was the F-236f mid-flight revocation timing leg — the known
flake family documented at R-47; the isolated-spec re-run re-verified
the family).

THE ROUND'S DISCOVERY, found at the baseline itself: the
AGENTS-documented single-spec invocation
(`CI=1 ./node_modules/.bin/playwright test tests/e2e/<spec>.spec.ts`)
FAILS on wealthos.spec.ts. The F-225c verify-bucket leg is
ORDER-DEPENDENT — its setup signup rides the shared no-XFF signup
bucket with its response ignored: in battery order the earlier specs'
burns deny it (no account exists; the timing-equalized miss arm
answers every probe; the assertions pass), while in isolation the
signup SUCCEEDS, the minted code's wrong-code ladder answers
VERIFICATION_LOCKED 429s from the fifth probe, and the 60-by-400
assertion dies. Root cause isolated by Mode B: reproduced (the
isolated run fails deterministically), the ladder live-probed against
the standalone artifact ([400,400,400,400,429,429] — signup mints a
pending code; the ladder is unavoidable on a live account), and the
burn ledger reconstructed from the specs' own signup POSTs (auth.spec
EIGHT no-XFF burns — three UI form submits + five API posts, the
route burns before the parse; data-import NINTH; multi-user TENTH at
cap; the bucket legs' own signups ELEVENTH and TWELFTH, denied
silently).

The standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the F-250q stylesheet fingerprint 96f24d45…
unchanged, the demo data zero, the desktop nav 256/9, the TRUE-390
menu census standing). THE MOBILE-NAVIGATION COMPARISON ran through
agent-browser at TRUE 390×844 on BOTH sides (the viewport verified by
computed innerWidth after the set-viewport call): the reference's
drawer opens with 9 destinations + Sign Out and closes on the X
toggle; OUR drawer carries the identical 9 destinations + the labeled
superset (the skip link, the navigation landmark, the aria-label
hamburger) and closes with the aria-expanded flip — parity plus the
documented superset, NO Tailwind v4 regression. TOOLCHAIN NOTE: the
clone-side comparison rode the PRODUCTION standalone artifact —
agent-browser's HeadlessChrome-157 tab does not hydrate the Turbopack
DEV build (the login form's native GET submission fires, no
preventDefault; every chunk 200; zero console errors; the production
build hydrates and logs in cleanly under the same browser; Playwright's
chromium works on both builds — the e2e battery and the captures
family prove it). Recorded as an environment note for the
agent-browser comparison workflow, not a product defect.
`bun audit` unchanged (1 moderate dev-chain minimatch, the documented
deferral). The neo-crm upstream check: unchanged (b3d0fbe) — nothing
to port. The SEO surface verified (smoke leg 12: sitemap + robots +
manifest 200). The .env contract, the db/ at the repo root, the
vitest/playwright configs, and the .env.example six-knob set all
standing. Comparison captures saved
(docs/screenshots/mobile-nav-{clone,reference}-390.png, both
PNG-valid at the true viewport).

## The fresh-eyes audit — the legs, the ledger, and the arm

Three Mode-C passes (the R-49 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer): **0 Critical /
0 High / 3 Medium / 3 Low cured** NEW after dedup, every material
claim re-verified at file:line by the driving session (the ladder
live-probed; the burn ledger reconstructed; the fixed-email arithmetic
read off the route seams). All ten R-49 cure surfaces verified
holding. The API layer's SIXTH consecutive clean bill (one Low + one
Informational NEW — both cured as F-253d/e). The UI source layer
clean — the findings cluster in the e2e battery's own legs. The
headline findings: THE ORDER-DEPENDENT VERIFY-BUCKET LEG (F-253a — the
baseline discovery above); THE STALE SIGNUP-BUDGET LEDGER (F-253b —
the F-229a census arithmetic was wrong at all three carriers
(auth.spec burns EIGHT, not five; the battery burned TWELVE against
the ten cap, the last two denials silent) while data-import's and
multi-user's success-asserting signups sat at burns nine and ten with
zero headroom); THE FIXED-EMAIL LOGIN-BUCKET LEG (F-253c — the F-222n
leg's compile-time-constant probe email keyed a per-account
30-per-15-minute bucket that survives a reused-server re-run inside
the window — the N-69a class, per-account edition); THE RESEND
VANISHED-ROW ARM (F-253d — the P2025 catch still shipped the two-key
envelope, the F-252b shape oracle's one surviving arm, reachable only
for a hash-present row vanishing mid-request); THE PARITY-252 PIN'S
MISS-ARM-ONLY SLICE (F-253e — the coverage gap that let F-253d
through); and THE STALE CSRF-PROBE COMMENT (F-253f — it described the
pre-F-245a bucket-before-parse order). The UI pass's explicit clear:
the resend-bucket leg is order-INVARIANT (both arms answer 200) — its
signup retired anyway as a rider of F-253a (a silent burn + a false
premise comment).

## R-50 — TDD execution

**R-50.1 — the pins born RED (honest RED: 8)**: the parity-253
source battery — every one verified failing for exactly the expected
defect (the two signup-carrying bucket legs; the two stale census
carriers; the two XFF-less scratch signups; the fixed probe email; the
two-key P2025 arm; the stale CSRF comment).

**R-50.2 — the cures**: THE ORDER-DEPENDENT VERIFY-BUCKET LEG
(F-253a — the flagship: the setup signup RETIRES; the 61 probes ride
an unknown timestamped email — the pure miss-arm contract the leg
always claimed: no account, no ladder, no dependence on which specs
ran first; the assertions unchanged (60 miss-arm 400s + the 61st
per-account 429 + the RATE_LIMITED body probe); the resend-bucket
leg's signup retires with its premise comment trued); THE STALE
SIGNUP-BUDGET LEDGER (F-253b — the census trued at all three carriers;
data-import's and multi-user's scratch signups move to dedicated
single-value XFF keys (the reset-password doctrine) — the shared
no-XFF burn drops to auth.spec's EIGHT, headroom restored); THE
FIXED-EMAIL LOGIN-BUCKET LEG (F-253c — the timestamp mint); THE
RESEND VANISHED-ROW ARM (F-253d — the third key joins the P2025
catch; every arm of the route three-key; the arm's comment and the
route-level claim trued); THE PARITY-252 PIN'S MISS-ARM-ONLY SLICE
(F-253e — closed by the parity-253 whole-route form: every ok(
return in the resend route carries the third key); and THE STALE
CSRF-PROBE COMMENT (F-253f — the gate-first truth: the content-type
gate sits above the burn, the volley dies un-bucketed, the dedicated
hop is belt-and-suspenders).

**R-50.3 — the verification**: parity-253 GREEN 8/8 · lint 0/0 ·
tsc 0 · **1712 unit (105 files, +8)** · build (the 4 documented
Turbopack tracing warnings) · smoke 15/15 · **the isolated
wealthos.spec run 63/63 GREEN — the F-253a order-independence proof
(RED at the baseline)** · the FULL e2e battery 152/152 · census MATCH
· `bun audit` unchanged. THE CAPTURES 212-215 (the own-database
convention + the census tripwire + PNG validation + blank detection):
the mobile drawer at 390 (the standing ask — 9 destinations + Sign
Out asserted + the close toggle), the resend every-arm face (the miss
arm three-key post-cure — the shipped arms unchanged, the vanished-row
arm pinned at the source level by the whole-route form), the
dashboard desktop (the remediated codebase's flagship in the dark
default), and the login face (the forced-light posture) — plus the
two agent-browser comparison captures at TRUE 390×844.

## Delivery

Docs lockstep complete: the count ladder (UNIT 1704→1712, FILES
104→105, BADGE 1856→1864 across the doc set — README's badge + stack
table + file hierarchy + testing table + verification row + program
row; AGENTS's command row; CLAUDE's gate line + command table + test
pyramid; the SKILL's four sites; the PAD's gate line + tree + §7.1
(Unit row, arch family 72→73 with parity-253 listed, the arithmetic
4+73+28=105) + §9 command row + §10 closing line + pre-push
checklist), the PAD's v2.50.0 revision block + the guard-trio advance
to v2.48.0/v2.49.0/v2.50.0 (the structural leg's fourth gate-enforced
ride, green-by-design BEFORE the block landed — the F-244a rule), the
plan's §5 execution-history row + the R-50 closure, the AGENTS.md
F-229a census correction (the true arithmetic + the dedicated-key
doctrine: a leg needing a real account rides its own XFF key, a leg
needing no account rides an unknown email — never an ignored signup),
the worklog entry, and this session record. docs-counts 17/17 at the
new counts.

**Recorded, not cured**: no NEW registrations this round (the standing
families ride: F-252k plus F-251i-k, F-250h-p, F-249j-n, F-248h-n,
F-247g-l, F-246g/h, F-245g/h, F-244i-n, F-242h/i, F-240k-n, F-239l-s
— plan §2.12's register), plus the toolchain note (the
agent-browser/HeadlessChrome-157 dev-build hydration gap — an
environment note for the comparison workflow; a future toolchain
round if the operator wants the dev-build path). Next session
defaults to findings-led iteration — re-send the standing directive
to continue the rhythm.
