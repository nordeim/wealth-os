# Session 53 — repo session 235 (R-32): the oracle-reorder, async-scrypt, and live-region-seed round

The owner re-sent the standing directive after the R-31 record pair
(docs/session_51.md + the owner's session_52.md log capture of the
session-234 round). Per the recorded rhythm, this session defaulted to
findings-led iteration: refresh, re-audit, remediate, verify, capture,
document, commit, push — with the operator's named asks (the mobile
navigation comparison, the Tailwind v4 state, the .env/db contract,
the vitest/playwright configs, the sitemap/SEO surface, the
.env.example, the screenshots, the SSH-wrapper push) re-verified along
the way.

## Intake — a green cold baseline

A fresh clone (sandbox reset); bun install (594 packages, the prisma
client regenerated into src/generated/prisma); the .env rebuilt from
.env.example (the DATABASE_URL="file:../db/custom.db" contract + a
fresh 64-char AUTH_SECRET); db:push/db:seed; the census MATCH
(78/4/3/6/5/7, users=1). One sandbox wrinkle from the session-234
record re-encountered and resolved by the seam itself: the platform
shell exports an absolute DATABASE_URL pointing at the sandbox-root db
— its value exactly equals bun's absolutization of the repo .env's
relative form, so the db-path seam re-anchored it to the repo-root db
(the .env contract path); the census confirms the resolved URL. The
chromium-1254 install the e2e battery needs landed.

The baseline gate was GREEN at HEAD 20a97b0 — the exact v2.31.0
ship state reproduced, no cold-baseline discovery this round: lint
0/0 · tsc 0 · 1302/1302 unit (82 files) · build · smoke 15/15 ·
140/140 e2e.

The standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the demo data zero, the desktop nav 256/9, the
TRUE-390 menu census standing — the reference's own mobile menu
opens with 9 destination links). `bun audit` unchanged (1 moderate
dev-chain). The neo-crm upstream check: unchanged (b3d0fbe) —
nothing to port. The SEO surface verified (smoke leg 12: sitemap +
robots + manifest 200 on the standalone artifact). The .env
contract, the db/ at the repo root, the vitest/playwright configs,
and the .env.example six-knob set all standing.

## The fresh-eyes audit — one Medium, and the tail re-verified

Three Mode-C passes (the R-31 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 0 High / 1 Medium / 9 Low / 5 Informational** raw.
The driving session re-verified every material claim at file:line;
R-31's nine pinned cures all verified holding. ONE adjudication: the
coach's user-message echo into the live region doubles as the SR
send-confirmation — recorded as F-235o, deliberate.

The Medium: **the AI-coach greeting seeded during render** — the
polite live region (the message list, F-219j) lives inside
DialogContent, which Radix unmounts while closed; the render-time
seed meant the region ARRIVED with the greeting already in it, and a
live region that arrives with its content is never announced (the
F-218h doctrine, fourth surface — the toast, the shell loading, and
the login verify view were cured in prior rounds; the coach was
never given the treatment because its region is conditionally
mounted).

The Lows: **the login verification oracle** (the password was
verified BEFORE the unverified-account gate: a correct password
answered 403 VERIFICATION_REQUIRED while a wrong one answered 401 —
confirming credential validity for every never-verified account;
subsumed under the default in-app-OTP posture, a genuine
password-reuse oracle under the production posture); **the reset
transaction's missing honest-failure arm** (the app's biggest
transaction mapped every failure to the generic 500; the sibling
auth routes answer P2024/P2028 with the 503 family copy); **the
synchronous scrypt** (~28 ms of blocked event loop per public auth
request — an unauthenticated availability amplifier under the
default direct-exposure posture); **six single-slot busyId sites**
(a completing row re-enabled a sibling's in-flight button); **the
dialog-close 16px touch target**; **emoji riding Select option
accessible names** (four sites); **the unnamed tablists**; **the
Expenses KPI glyph contradicting its signed number** ("↑ −5%" on
spending that fell); **the guest wall's blank null face**. The
Informations: the CSP containment backstop, the users-PATCH
record-not-found arm, the dead HealthGauge transition, the
progressbar roles.

## The plan and the TDD execution

The plan v2.32.0 written (the F-235a-o ledger + the R-32 section +
the §5 execution row) and validated against the tree before
execution — the blast-radius sweep identified four same-commit pin
recalibrations (the parity-221 DIALOG_CLOSE contiguous string, the
parity-228 equalizer forms, the auth-reset login form, the
http-headers CSP value), confirmed every cure DOM-inert on the
captured faces by construction, and censused the e2e login bucket
(the oracle probe lands the battery's 9th of 10 per-IP burns — one
slot of margin).

The pins born RED: **30 RED + 2 green-by-design genus guards**
(tests/parity-235.test.ts, 32 checks) + the password-seam async
riders (3 checks). One e2e leg extension born RED with the honest
oracle failure — the wrong-password probe answered 401 at the
pre-cure build (expected 403), proven by the stash round-trip.

The cures: **the AI-coach greeting live-region seed** (F-235a — the
seed rides a zero-delay timer effect: the region commits empty,
survives a paint cycle, and the greeting lands as a content change
— the announcement form; the timer callback keeps the house lint
contract (no synchronous state write in the effect body — the
login-card banner timer precedent), the cleanup cancels the
StrictMode double-invoke, the value guard keeps the thread
persistent across close/reopen); **the login verification-oracle
reorder** (F-235b — the gate moves above the credential check with
the equalizer burned on its branch: both arms 403 at equal latency,
every branch still burns exactly one scrypt; the F-218a e2e leg
extends with the request-level wrong-password probe — zero new
signups, the battery's IP budget untouched); **the reset
honest-failure arm** (F-235c); **the async-scrypt seam** (F-235d —
util.promisify over the callback form; the stored format,
parameters, and timing profile byte-identical; every call site was
already async — the five auth routes, the seed (the demo hash
computed once), the verification-server wrappers; the concurrent
memo race documented benign); the functional busy clears (F-235e,
six sites); the dialog-close padding (F-235f — the target measures
28×28px over the 24px floor); the aria-hidden emoji wraps (F-235g,
four sites); the tablist naming (F-235h); the KPI glyph/tone
decoupling (F-235i — the optional deltaTone override; the glyph
follows the sign, the tone keeps the good/bad channel); the
guest-wall status face (F-235j); the additive CSP (F-235k); the low
tail (F-235l/m/n).

**The live lesson:** the first CSP form (strict, no eval) broke the
dev toolchain — React's dev mode evals, the Next dev-tools issue
badge painted into every capture, and the 390 sweep's drift decode
caught it (login +9.23%, ten pages above baseline; the cluster map
pointed at the badge, the VLM read confirmed it). The cure branches
on NODE_ENV: 'unsafe-eval' rides the DEV branch only; the
production build bakes the strict header (curl-verified on the
standalone — the served policy carries no eval permission). The
recursive F-229d genus caught once more: the async-seam's own
comments coined two variant-shaped hyphenations; the whole-tree
invariant caught them (catch seven).

## The verification

The full offline gate: **lint 0/0 · tsc 0 · 1337/1337 unit (83
files, +35) · build · smoke 15/15 · 140/140 e2e** (the oracle probe
extends the existing leg). ALL SIX parity drift gates CLEAN at
0-event margin (the four sweep classes 1440/390/768/1024 + the
fullpage sweep + the interior census — the 390 gate green after the
CSP dev-branch cure). census MATCH; `bun audit` unchanged;
docs-counts 13/13 after the lockstep.

The capture set 146-148 (scripts/captures-235.ts, on the
own-database convention + the F-226g liveness check): **146** the
mobile drawer at 390×844 with all 9 destinations + Sign Out (the
standing operator ask, asserted by link census); **147** the AI-coach
dialog open with the greeting landed in the polite live region
(F-235a — the greeting asserted visible inside the aria-live list);
**148** the Add Expense dialog with the padded close target (F-235f
— the ✕ box asserted at 28×28px over the 24px floor). The census
tripwire MATCHed at exit; custom.db untouched; all three faces
VLM-verified.

## The lockstep and the delivery

docs-counts 1302→1337 / 82→83 / the badge 1442→1477 / the pins row
53→54 with parity-235; README (the badge, the stack table, the
testing table, the hierarchy, the verification row, the R-32 program
row); AGENTS (the counts + three new gotchas: the
auth-gate-after-credential oracle lesson, the sync-crypto
availability lesson, the CSP dev-branch eval lesson); CLAUDE (the
gate contract, the command table, the test pyramid); PAD (the
v2.32.0 revision block, the §7.1 distribution rows + the pins row,
the §9/§10/ADR-006 sites); SKILL (the counts); the plan closed
(R-32 → Done, the §5 execution row, the next-session number
refreshed); the worklog entry; this record.

R-32 is shipped and verified. No open R-item; the recorded-not-cured
tail (F-235o the deliberate user-echo adjudication, plus the
standing F-234l/m/n + F-233l-o + F-232j-o +
F-217m/F-215m/F-210a/F-214l/F-230b/F-230g/F-231m-r family) stays
documented in the plan. Next session defaults to findings-led
iteration — re-send the standing directive and it will refresh,
re-audit, and continue the rhythm.
