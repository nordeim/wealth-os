#!/usr/bin/env python3
"""Session 249 (R-46) plan writer — inserts the v2.46.0 blocks into
docs/remediation_plan_v2.md (assert-each-insertion: every anchor must
match exactly once or the script refuses)."""

import re
import sys

PLAN = "docs/remediation_plan_v2.md"

with open(PLAN, encoding="utf-8") as f:
    text = f.read()

def insert_once(anchor: str, payload: str, label: str) -> None:
    global text
    n = text.count(anchor)
    if n != 1:
        sys.exit(f"REFUSED: anchor for {label} matched {n} times (expected 1)")
    text = text.replace(anchor, payload + anchor, 1)
    print(f"inserted: {label}")

# ---------------------------------------------------------------- 1. the header
NEW_HEADER = """> **Current version: v2.46.0** (session 249 — the stale-read,
> era-thread, and guard-structural round R-46: the owner's standing
> directive — refresh → review → validate → audit → parity iteration →
> remediation plan → TDD execution → captures → docs lockstep →
> commit → push, with the reference STABLE on all standing drift
> layers and the TRUE-390 mobile menu re-verified by probe:ref this
> session; the cold-baseline gate GREEN at HEAD d10b299 — no
> discovery this round, the v2.45.0 ship state reproduced exactly:
> lint 0/0 · tsc 0 · 1622/1622 unit (99 files) · build · smoke 15/15
> · 151/151 e2e · census MATCH). The session-249 fresh-eyes audit
> (three Mode-C passes: the R-45 cure surfaces driven by the session,
> the API/auth/security layer, and the UI/a11y/shell layer — 0
> Critical / 0 High / 0 Medium / 7 Low / 7 Informational NEW after
> dedup, every material claim re-verified at file:line by the driving
> session; all six R-45 cure surfaces verified holding — the toast
> composed pause, the import Discard rider, the seven widened
> walkers, the five write-path selects, the logout envelope rider,
> and the guard trio itself aged out by its own ship commit again,
> the F-243b/F-244a genus's SEVENTH edition, cured first per its own
> rule; the API layer clean again — owner-scoping, Zod, buckets,
> injection, enumeration, session, errors, secrets, deps all clean,
> the ADR-014 in-band-delivery posture re-confirmed and its
> fail-secure hardening option registered; the UI layer clean, with
> the store's remount-interleaving surfaces mapped for the flagship).
> The round's flagship: THE REMOUNT-HYDRATE STALE-READ CURE (F-249c
> — F-248f's dedicated round: a mutation issued from a section page
> and a root-crossing remount hydrate interleaved so the hydrate's
> pre-write dashboard payload stood while the mutation's post-write
> refreshAll was discarded on the token dimension alone — the user
> saw the row they deleted beside its success toast until the next
> fetch; the cure re-keys refreshAll's success/failure commit from
> the entry token to the CALLER's entry era + the sequence, threads
> mutate's entry era into the refresh (closing the post-logout
> re-wall window), and joins hydrate's dashboard GET to the shared
> refresh sequence at issue time so the later-issued read wins in
> both landing orders — the superseded landing skips only the slice
> commit, the settings tail still settles, and the write paths keep
> the token key). Plus: THE GUARD-TRIO ADVANCE (F-249a — the
> SEVENTH edition, green-by-design first); THE STRUCTURAL GUARD LEG
> (F-249b — the aging genus's structural cure: the docs-counts
> battery now derives the PAD's newest revision block at test time
> and asserts the guard's pinned window covers it, so the EIGHTH
> edition fails the unit gate inside its own ship commit — the
> manual first-docs-act convention retires); THE LOGOUT RETURN ERA
> RE-KEY (F-249d — a remount hydrate inside the POST window used to
> stale the token guard and flip a server-SUCCESSFUL logout to false
> with no clear; the exactly-own-bump era form); THE SIGNUP
> CREATE-ARM SELECT (F-249e — the F-228h doctrine's create half,
> the one arm the read/update sweeps never covered); THE LOGOUT
> VANISHED-ROW ARM'S ENVELOPE (F-249f — the F-248g cure wrapped only
> the final clear; the arm's clear sat inside the catch where a
> throw escapes as a raw non-JSON 500); and THE FOUR WALKER DOCBLOCK
> TRUTHS (F-249g — the F-248d widening left the ts/tsx/css comments
> under jsx-admitting filters). Registered, not cured: the
> settings-tail vs updateSettings ordering race (F-249h — the
> flagship genus on the settings slice, its own settingsSeq rider),
> the eighth pending-face member (F-249i — the Settings budget Add),
> the import commit's non-idempotency (F-249j — a batch-key schema
> change, its own round), the three generated-skip-less walkers
> (F-249k), the import mid-commit navigation vectors (F-249l —
> browser back/refresh cannot be rider-guarded), the verify/resend
> clear race (F-249m — availability-only micro-race), and the
> ADR-014 fail-secure hardening option (F-249n — the owner's call).
> §5 carries the execution history.)
>
"""

old_current = "> **Current version: v2.45.0** (session 248 — the guard-advance,"
n = text.count(old_current)
if n != 1:
    sys.exit(f"REFUSED: v2.45.0 current-version line matched {n} times")
text = text.replace(
    old_current,
    "> **Previous version: v2.45.0** (session 248 — the guard-advance,",
    1,
)
print("demoted: v2.45.0 current -> previous")

anchor_header = "> **Previous version: v2.45.0** (session 248 — the guard-advance,"
insert_once(anchor_header, NEW_HEADER, "the v2.46.0 current-version header block")

# ------------------------------------------------------- 2. the §2.9 audit ledger
LEDGER = """
### 2.9 Session-249 audit ledger (the fresh-eyes round over the v2.45.0 ship state)

Three Mode-C passes (the R-45 cure surfaces · the API/auth/security layer ·
the UI/a11y/shell layer); every material claim re-verified at file:line by
the driving session before planning. NEW findings after dedup (the passes
re-confirmed the documented postures without exception — the ADR-014
in-band-delivery default (the pass's Medium, adjudicated as the documented
F-217m posture with its fail-secure hardening option registered as
F-249n), the F-228f uploads-owner gap, the F-218t proxy-hops default, the
email-keyed bucket availability trade-off, the F-248i/j/k/l/m families,
the F-247h password-cap asymmetry — the negative results are recorded so
the next pass does not re-chase them):
0 Critical / 0 High / 0 Medium / 7 Low / 7 Informational.

| ID | Severity | Finding (adjudicated) | Location | Disposition |
|---|---|---|---|---|
| F-249a | Low | **THE GUARD-TRIO AGING, SEVENTH EDITION — the genus walked inside its own curing round again.** Session 248 landed the v2.45.0 PAD block carrying the NOW-LIVE 1622/99 pair while the trio still pinned v2.42.0/v2.43.0/v2.44.0 (`tests/docs-counts.test.ts:221-223`); the PAD's three most recent blocks were v2.43.0/v2.44.0/v2.45.0 — the newest block stood outside the pinned window for the whole inter-session stretch, the exact corruption shape the guard exists to intercept. | `tests/docs-counts.test.ts:206-224`; `Project_Architecture_Document.md:19,82,138` | **cured in R-46** (the trio advances to v2.43.0/v2.44.0/v2.45.0, landed green-by-design BEFORE this session's own lockstep pass — the F-244a lesson's own rule, executed first; the parity-243 mirror pin recalibrated same-commit) |
| F-249b | Low | **THE GUARD-TRIO AGING IS PROCEDURAL, NOT STRUCTURAL — seven consecutive recurrences because nothing executable verifies the window.** The advance convention lives in comments, session records, and the next session's discipline; the lockstep pass that lands a revision block never checks that the guard's pinned window still covers the newest block — so every ship commit re-opens the hole by construction. The structural cure: a docs-counts leg that derives the PAD's newest `[SR]` revision block at test time and asserts the guard's pinned window COVERS it — the eighth edition fails `bun run test` inside its own ship commit. | `tests/docs-counts.test.ts:210-224` (the guard it-block); `Project_Architecture_Document.md` (the newest-first `[SR]` list) | **cured in R-46** (the structural leg, green-by-design at birth over the current window; the manual first-docs-act convention retires — the lockstep script's advance becomes a gate-enforced leg) |
| F-249c | Low | **THE REMOUNT-HYDRATE STALE-READ LEG — F-248f's dedicated round (the registered interleaving, its reverse, and the era-threading window).** The registered leg: `mutate` captures `sessionWriteToken` at entry (:278); a root-crossing remount hydrate bumps the token with no clear and issues its own dashboard GET (:314, :341); the mutation's post-write `refreshAll` lands with the stale token and is DISCARDED at the combined guard (:242) while hydrate's pre-write payload committed unconditionally (:361-374) — the user sees the row they deleted beside its success toast until the next fetch. The reverse leg (S1): hydrate's GET issued before a mutation's POST lands carries a pre-write read that OVERWRITES the mutation's fresher refreshAll commit — no ordering dimension exists between the two dashboard-GET families (`refreshSeq` orders refreshAll against itself only). The era-threading leg (I-3): `refreshAll` re-captures its OWN era at entry (:228) instead of the mutate wrapper's (:281) — a mutation landing 200 after a completed logout re-captures the POST-logout era, its 401 arm matches, and the wall fires OVER the logout face (loading:false over the F-240f login-transition discriminator). Sub-second, self-healing, no data loss — but the store's fetch-coordination contract is wrong in all three windows. | `src/stores/wealthos-store.ts:242,314,341,361-374,228 vs :281` | **cured in R-46** (the flagship: refreshAll's success/failure commit re-keys from the entry token to the CALLER's entry era + the sequence; mutate threads its entry era into the refresh; hydrate's dashboard GET joins the shared refresh sequence at issue time and its landing guard gains the seq dimension — the superseded landing skips only the slice commit (the settings tail still settles: the F-234a cycle completes, and its guards no-op on dead sessions); the write paths (updateSettings, logout's clear) keep the token key) |
| F-249d | Low | **THE LOGOUT RETURN GUARD'S HYDRATE STALENESS — a concurrent remount-hydrate flips a server-SUCCESSFUL logout to false.** Logout's return guard compares the entry token (:424); a hydrate entering inside the POST window bumps the token (the non-clearing bumper, :314), so the successful landing reads stale, `logout()` returns false, the clear never commits, and the signOut helper skips the login navigation (the face self-heals through the wall's era arm on the next fetch — but the F-224e honest-sign-out contract misreports, and the user-null + dead-session window stands until something fetches). | `src/stores/wealthos-store.ts:412,424 vs :314` | **cured in R-46** (the exactly-own-bump era form: capture the era BEFORE the entry bump and require era === entry+1 at landing — a hydrate never advances the era (the guard passes, the clear commits), a wall does (correctly false)) |
| F-249e | Low | **THE SIGNUP CREATE-ARM FULL-ROW RETURN — the F-228h insurance doctrine's create half was never swept.** The read path (F-246d/F-247d) and the update path (F-248e) were narrowed; signup's `db.user.create` carries no select, so Prisma materializes the complete post-create row — passwordHash, verificationCodeHash, resetToken, resetTokenExpiresAt, verificationExpiresAt — in handler scope (the `user` local lingers past response construction; only id + email are consumed). Today's marginal exposure is nil (the handler computed the secrets itself; resetToken is null at create); the residual is the doctrine's forward-insurance clause verbatim: a future `return ok(user)` edit leaks the scrypt password hash in one step. | `src/app/api/auth/signup/route.ts:116-135` (consumed at :167-168) | **cured in R-46** (the create gains `select: { id: true, email: true }` — the F-248e battery form) |
| F-249f | Low | **THE LOGOUT VANISHED-ROW ARM'S UNPROTECTED CLEAR — the F-248g cure wrapped only the final clear.** The `isRecordNotFound` arm's `clearSessionCookie()` sits inside the main catch (:99-100), and a throw FROM WITHIN a catch block is not caught by that catch — it propagates to Next's framework layer as a raw non-JSON 500 for an already-completed eviction (the session cannot outlive its vanished row; the arm's own comment says the logout COMPLETES) — the exact class the envelope doctrine exists to bar, on the exact route the F-248g round touched. | `src/app/api/auth/logout/route.ts:99-100` vs the cured final clear `:116-121` | **cured in R-46** (the arm's clear gains its own minimal try — log + still answer the completed sign-out, the F-248g form completed across the route's two clear sites) |
| F-249g | Low | **THE FOUR STALE WALKER DOCBLOCKS — the F-248d widening left the doc comments under-documenting the filters.** parity-230/231/232/233's `walkSrc` docblocks still say "(ts/tsx/css)" while the filters admit jsx — docblock-vs-code truth drift (the F-240e/F-243g genus); a future maintainer reading the docblock believes the nine capital-route bridges are excluded. | `tests/parity-230.test.ts:16`; `tests/parity-231.test.ts:17`; `tests/parity-232.test.ts:17`; `tests/parity-233.test.ts:17` | **cured in R-46** (the four docblocks carry the ts/tsx/jsx/css truth) |
| F-249h | Informational | **THE SETTINGS-TAIL vs UPDATESETTINGS ORDERING RACE — the F-248f genus on the settings slice.** Neither the hydrate tail's settings commit (:392-395) nor updateSettings' (:565) carries an ordering dimension; whichever lands last wins, so a remount-hydrate's pre-PUT settings read landing after the PUT's commit overwrites the fresh settings under their "Settings saved" toast — self-healing on the next hydrate, no data loss. | `src/stores/wealthos-store.ts:388-396 vs :551-579` | recorded (Reasoned, control-flow verified; its own settingsSeq rider — the flagship round's machinery is the natural vehicle if promoted) |
| F-249i | Informational | **THE EIGHTH PENDING-FACE MEMBER — the F-248i census undercounts by one.** The Settings page's Category-Budgets Add button carries the family's exact shape (a text submit, disabled-only through its busy flag) beside the seven registered sites; the icon-only row controls are a different idiom. | `src/app/(app)/settings/page.tsx:264-267` | recorded (fold into the F-248i completion pass when promoted — eight sites) |
| F-249j | Informational | **THE IMPORT COMMIT'S NON-IDEMPOTENCY — a plain createMany with no batch key.** A double-submit (a retry after a lost response, a back-forward replay) duplicates every row silently into every aggregate. Bounded: sessioned, 5 commits/15min/IP, 5000 rows max — the worst self-inflicted case is 2×25k rows/15min, no cross-user impact. | `src/app/api/import/route.ts:31-43` | recorded (a client batchId + per-owner unique constraint is the structural fix — a schema change, its own round) |
| F-249k | Informational | **THE THREE GENERATED-SKIP-LESS WALKERS — the walker family's directory behavior is not uniform.** parity-240/241's `listSrcFiles` and gate-script's `walkSources` do not skip `src/generated` (the parity-229/230/231/232/233/242 walkers do); benign today (all green — the F-248d cure deliberately made the minimal edit), latent if the generated client ever carries a scanned literal. | `tests/parity-240.test.ts:24-32`; `tests/parity-241.test.ts:16-24`; `tests/gate-script.test.ts:186-194` | recorded (a hygiene-round completion) |
| F-249l | Informational | **THE IMPORT MID-COMMIT NAVIGATION VECTORS — enumerated and adjudicated out of the rider pattern's scope.** Browser back/refresh/tab-close can abort the fetch client-side while the server-side import still commits (no beforeunload guard exists — the classic un-guardable SPA window); in-app navigation does NOT abort the POST (the commit completes, the store refreshes, the module-level toast renders from the always-mounted viewport). No corruption either way. | `src/app/(app)/import/page.tsx` (the page controls all rider-gated — the F-248c verification); the shell nav family | recorded (the F-248c ledger row scoped the cure to the page's controls; the navigation vectors are the documented residual) |
| F-249m | Informational | **THE VERIFY/RESEND CLEAR RACE — a micro-race with an availability-only cost.** A resend landing between verify's read and its clearing update has its fresh code destroyed (the user resends again); the session mint uses the pre-read tokenVersion and is fail-safe (a concurrent reset bumps the version and the minted cookie dies at the next getSessionUser). | `src/app/api/auth/verify/route.ts:164-176` | recorded (no action; the family's documented fail-safe shape) |
| F-249n | Informational | **THE ADR-014 IN-BAND-DELIVERY POSTURE, RE-CONFIRMED AT MEDIUM — the audit's severity and the documented posture reconciled.** The fresh-eyes pass re-surfaced the demo default (the OTP and reset link returned in-band while the knobs are unset) as a full account-takeover chain on any public deployment that leaves them default — true, and precisely the documented F-217m/ADR-014 posture (boot-warned, knob-gated, DEPLOYMENT-documented). The pass's hardening suggestion is registered: make the knobs fail-secure (opt-IN to in-band delivery when the environment is production and the site URL is public), keeping the localhost demo flow. | `src/app/api/auth/forgot-password/route.ts:153-155`; `resend/route.ts:123-127`; `src/lib/boot-env.ts:103-110` | recorded (the documented posture stands — the fail-secure default is the owner's product call; surfaced for decision) |

"""

anchor_sec3 = "## 3. The remediation program (R-items)"
insert_once(anchor_sec3, LEDGER, "the §2.9 session-249 audit ledger")

# ------------------------------------------------------------- 3. the R-46 section
R46 = """### R-46 — The stale-read, era-thread, and guard-structural round (session 249) — Status: In progress

The session-249 findings-led round over the v2.45.0 ship state. Seven
cures (F-249a-g), seven registrations (F-249h-n).

1. **R-46.1 — the pins born RED**: tests/store-staleness.test.ts (the
   behavioral battery, the deferred-response harness: the F-248f
   interleaving — a held mutation POST, a remount hydrate whose
   dashboard GET lands first carrying the pre-write payload, the
   release asserting the POST-WRITE state stands; the reverse leg —
   hydrate's GET held, the mutation completing first, the stale GET
   released last; the era-threading leg — a mutation 200 landing
   after a completed logout must not wall over the logout face (the
   loading discriminator); the logout-return leg — a hydrate inside
   the POST window must not flip a server-successful logout to
   false; the settings-tail settle rider — the superseded remount
   landing still settles the F-234a cycle) + tests/parity-249.test.ts
   (the source battery: refreshAll's caller-era signature + the
   era-and-sequence guard + the retired token-guard form's absence;
   mutate's threading + the retired token-capture form's absence;
   hydrate's sequence mint at issue + the superseded landing + the
   tail on the superseded path; logout's exactly-own-bump return
   guard; the signup create's select; the logout vanished-row arm's
   own try; the four docblock truths) + the docs-counts structural
   leg (green-by-design — the current window covers the current
   newest block; the F-248d precedent for a guard born green) + the
   same-commit recalibrations (parity-217's refresh-capture and
   call-form pins, parity-238's mutate-capture and call pins,
   parity-240's guard, signature, and hydrate-landing pins,
   parity-241's refreshAll-capture, guard, and hydrate-landing pins
   — the F-247d precedent for pins whose watched form legitimately
   changed, each recalibrated with its rationale in place).
2. **R-46.2 — the cures**: THE REMOUNT-HYDRATE STALE-READ CURE
   (F-249c — the flagship, three coordinated re-keys on one seam:
   refreshAll's success/failure commit guard becomes the caller's
   entry era + the sequence; mutate threads its entry era into the
   refresh; hydrate's dashboard GET mints the shared refresh
   sequence at issue and its landing guard gains the seq dimension
   with the superseded landing skipping only the slice commit — the
   settings tail still runs, settling the F-234a cycle, and its
   era/token guards no-op on dead sessions; the write paths
   (updateSettings, logout's clear) keep the token key; the wall
   and logout advance the era in the same commit as the token, so
   the F-217l/F-239a contracts survive in the era key); THE
   GUARD-TRIO ADVANCE (F-249a — v2.43.0/v2.44.0/v2.45.0,
   green-by-design before this session's own lockstep pass); THE
   STRUCTURAL GUARD LEG (F-249b — the aging genus's structural
   cure); THE LOGOUT RETURN ERA RE-KEY (F-249d); THE SIGNUP
   CREATE-ARM SELECT (F-249e); THE LOGOUT VANISHED-ROW ARM'S
   ENVELOPE (F-249f); THE FOUR WALKER DOCBLOCK TRUTHS (F-249g).
3. **R-46.3 — the verification**: the full gate (lint 0/0 · tsc 0 ·
   unit · build · smoke 15/15 · e2e) · the six parity drift gates
   CLEAN (the round's surfaces are client-side state-guard re-keys
   on transient interleavings, select narrowing, a catch-arm wrap,
   comment truths, and test-walker docblocks — pixel-invisible by
   construction) · census MATCH · `bun audit` unchanged · the
   captures (the own-database F-225e convention + the census
   tripwire): the mobile drawer at 390 (the standing ask — 9
   destinations + Sign Out asserted), plus the round's own faces.

"""

anchor_r45 = "### R-45 — The guard-advance, pause-composition, and write-path-select round (session 248) — Status: Done(v2.45.0)"
insert_once(anchor_r45, R46, "the R-46 section")

with open(PLAN, "w", encoding="utf-8") as f:
    f.write(text)
print("plan written: v2.46.0 blocks inserted (header + §2.9 + R-46)")
