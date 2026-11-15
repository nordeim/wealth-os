# Session 81 — repo session 249 (R-46): the stale-read, era-thread, and guard-structural round

The operator re-sent the standing directive after the R-45 ship pair
(4654978 + the owner's session_80.md log capture). Per the recorded
rhythm, this session defaulted to findings-led iteration: refresh,
re-audit, remediate, verify, capture, document, commit, push — with
the operator's named asks (the mobile navigation comparison, the
Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.

## Intake — a green cold baseline

The workspace survived the sandbox cycle (node_modules, the db files,
the chromium-1254 build all standing); `git pull` fast-forwarded
4654978 → d10b299 (the owner's log capture). The environment
re-anchored (bun install + the prisma client regenerated;
db:push/db:seed; the census MATCH 80/4/3/6/5/7, users=1) — no
toolchain gap this round.

The baseline gate was GREEN at HEAD d10b299 — the exact v2.45.0 ship
state reproduced: lint 0/0 · tsc 0 · 1622/1622 unit (99 files) ·
build · smoke 15/15 · 151/151 e2e.

The standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the demo data zero, the desktop nav 256/9, the
TRUE-390 menu census standing — the reference's own mobile menu opens
with 9 destination links). `bun audit` unchanged (1 moderate dev-chain
minimatch, the documented deferral). The neo-crm upstream check:
unchanged (b3d0fbe) — nothing to port. The SEO surface verified (smoke
leg 12: sitemap + robots + manifest 200 on the standalone artifact).
The .env contract, the db/ at the repo root, the vitest/playwright
configs, and the .env.example six-knob set all standing.

## The first docs act — the guard-trio advance (the genus's SEVENTH edition)

Session 248's own v2.45.0 ship left the trio pinned v2.42.0/v2.43.0/
v2.44.0 while the PAD's three most recent blocks became v2.43.0/
v2.44.0/v2.45.0 — the F-243b/F-244a genus's SEVENTH recurrence, by
construction, exactly as the doctrine documents. The advance landed
FIRST (green-by-design, before this session's own lockstep pass), with
the parity-243 mirror pin recalibrated same-commit: the trio pinned
v2.43.0 (1601/97) / v2.44.0 (1610/98) / v2.45.0 (1622/99), 30/30
green across the two batteries.

## The fresh-eyes audit — the interleaving surfaces, and a genus made structural

Three Mode-C passes (the R-45 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer): **0 Critical /
0 High / 0 Medium / 7 Low / 7 Informational** NEW after dedup, every
material claim re-verified at file:line by the driving session. All
six R-45 cure surfaces verified holding (the toast composed pause, the
import Discard rider, the seven widened walkers, the five write-path
selects, the logout envelope rider — and the guard advance itself aged
out by its own ship commit again, the genus's SEVENTH edition). The
API layer came back clean on every dimension — the pass's one Medium
(the ADR-014 in-band-delivery posture) was adjudicated as the
documented F-217m posture, its fail-secure hardening option registered
as F-249n for the owner's call.

The findings ledger: THE GUARD-TRIO AGING, SEVENTH EDITION (F-249a);
THE AGING IS PROCEDURAL, NOT STRUCTURAL (F-249b — seven recurrences
because nothing executable verifies the window); THE
REMOUNT-HYDRATE STALE-READ LEG (F-249c — F-248f's dedicated round:
the registered interleaving, its S1 reverse, and the era-threading
window I-3, all mapped end to end); THE LOGOUT RETURN GUARD'S HYDRATE
STALENESS (F-249d — a server-SUCCESSFUL logout flipped to false with
no clear); THE SIGNUP CREATE-ARM FULL-ROW RETURN (F-249e — the
F-228h doctrine's one unswept arm); THE LOGOUT VANISHED-ROW ARM'S
UNPROTECTED CLEAR (F-249f — a throw from inside a catch escapes as a
raw non-JSON 500); THE FOUR STALE WALKER DOCBLOCKS (F-249g); plus the
registrations (F-249h — the settings-tail vs updateSettings ordering
race; F-249i — the eighth pending-face member; F-249j — the import
commit's non-idempotency; F-249k — the three generated-skip-less
walkers; F-249l — the import mid-commit navigation vectors; F-249m —
the verify/resend clear race; F-249n — the ADR-014 fail-secure
hardening option).

## R-46 — TDD execution

**R-46.1 — the pins born RED (honest RED: 20)**:
tests/store-staleness.test.ts (the behavioral battery, the
deferred-response harness: the F-248f interleaving — a held mutation
POST, a remount hydrate whose GET lands first carrying the pre-write
payload, the release asserting the POST-WRITE state stands; the S1
reverse leg; the I-3 era-threading leg — a mutation 200 landing after
a completed logout must not wall over the logout face; the F-249d
logout-return leg; the settings-tail settle rider) +
tests/parity-249.test.ts (the source battery: the caller-era
signature, the era+sequence guard, the retired token-guard forms'
absence, the threading form, the sequence mint at issue, the
superseded landing, the tail on the superseded path, the
exactly-own-bump return guard, the signup select, the logout arm's own
try, the four docblocks — 18 pins, 2 born green as the negative
controls scoping the blast radius) + the docs-counts STRUCTURAL LEG
(F-249b — green-by-design at birth over the current window; the
F-248d precedent for a guard born green).

**R-46.2 — the cures**: THE REMOUNT-HYDRATE STALE-READ CURE (F-249c —
the flagship, three coordinated re-keys on one seam: refreshAll's
success/failure commit guard becomes the CALLER's entry era + the
sequence — the token's only non-clearing bumper was a concurrent
hydrate's entry bump, which must not discard a mutation's fresher
post-write payload; mutate threads its entry era into the refresh,
closing the post-logout re-wall window; hydrate's dashboard GET mints
the shared refresh sequence at ISSUE time and its landing guard gains
the seq dimension — the superseded landing skips only the slice
commit, the settings tail still runs (the F-234a cycle settles; the
guards no-op on dead sessions); the write paths keep the token key;
the F-217l/F-239a contracts survive in the era key); THE GUARD-TRIO
ADVANCE (F-249a); THE STRUCTURAL GUARD LEG (F-249b — the docs-counts
battery derives the PAD's newest revision block at test time and
asserts the pinned window covers it: the EIGHTH edition fails `bun run
test` inside its own ship commit, the manual first-docs-act convention
retires); THE LOGOUT RETURN ERA RE-KEY (F-249d); THE SIGNUP CREATE-ARM
SELECT (F-249e); THE LOGOUT VANISHED-ROW ARM'S ENVELOPE (F-249f); THE
FOUR WALKER DOCBLOCK TRUTHS (F-249g). Plus the same-commit
recalibrations (the F-247d precedent — twelve pins across
parity-217/224/238/240/241 whose watched forms legitimately changed).

Two authoring defects caught by the round's own nets mid-cure (both
documented genera, now recorded): the parity-229 carrier net flagged
the cure's own "last-issued" comment coin (the F-229d discipline:
describe with spaces), and the parity-224 logout window pin (a
900-char slice) went RED against its own cure's rationale block (the
F-247e window doctrine — widened to 1700, the rationale documented in
place).

**R-46.3 — the verification**: lint 0/0 · tsc 0 · **1645 unit (101
files, +23)** · build · smoke 15/15 · 151 e2e · ALL SIX parity drift
gates CLEAN (the round's surfaces are client-side state-guard re-keys
on transient interleavings, select narrowing, a catch-arm wrap,
comment truths, and docblocks — pixel-invisible by construction) ·
census MATCH · `bun audit` unchanged. The captures **194-196** (the
own-database F-225e convention + the spawn-liveness check + the
census tripwire MATCH + PNG-verified valid + pixel-level blank
detection): the mobile drawer at 390 (the standing ask — 9
destinations + Sign Out asserted), THE STALE-READ CURE FACE (the
flagship proven live: the DELETE POST held through a root-crossing
remount — hydrate's pre-write payload committed over the pending
mutation, the registered interleaving — then released: the success
toast stands over the fresh state and the STORE'S COMMITTED SLICE,
read directly off the globalThis singleton, asserted post-write), and
THE LOGOUT-RETURN FACE (the logout POST held through a root-crossing
remount hydrate, then released: the era-keyed guard passed, the clear
committed, and the helper navigated to /login).

## Delivery

Docs lockstep complete: docs-counts 17/17 at the new counts (1622→1645
/ 99→101 via the scoped scripts/docs-249-lockstep.py — the §7.1
family rows 68→69 with parity-249 listed + 27→28 with store-staleness
listed + the arithmetic 4+69+28=101, the README badge 1773→1796, the
README program row (R-46), the PAD v2.46.0 revision block, AGENTS (+
the F-243b gotcha's structural-cure note), CLAUDE counts, SKILL
counts), the plan closed (R-46 → Done + the §5 row at the real
counts), worklog, and this session record. THE STRUCTURAL ADVANCE
RODE THE LOCKSTEP: the v2.46.0 block landed together with the trio's
second advance (to v2.44.0/v2.45.0/v2.46.0) in the SAME commit — the
structural leg's first gate-enforced ride.

**Recorded, not cured** (documented in the plan): F-249h (the
settings-tail vs updateSettings ordering race — the flagship genus on
the settings slice, its own settingsSeq rider), F-249i (the eighth
pending-face member), F-249j (the import commit's non-idempotency —
a batch-key schema change), F-249k (the three generated-skip-less
walkers), F-249l (the import mid-commit navigation vectors), F-249m
(the verify/resend clear race), F-249n (the ADR-014 fail-secure
hardening option — the owner's call), plus the standing families
(F-248h-n, F-247g-l, F-246g/h, F-245g/h, F-244i-n, F-242h/i,
F-240k-n, F-239l-s). Next session defaults to findings-led iteration
— re-send the standing directive to continue the rhythm; the
guard-trio advance is now a GATE-ENFORCED lockstep leg (the structural
leg fails the unit gate if a revision block lands outside the pinned
window — the manual first-docs-act convention has retired).
