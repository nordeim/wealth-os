#!/usr/bin/env python3
"""Session-248 (R-45) plan writer — the v2.45.0 ledger insertion.

House convention (assert-each-insertion, the F-242j lesson): every
replacement is scoped to a SLICED anchor and asserts the OLD form exactly
once inside the slice before writing. Idempotent: a second run finds the
new form and skips.
"""

from pathlib import Path

PLAN = Path(__file__).resolve().parent.parent / "docs" / "remediation_plan_v2.md"
src = PLAN.read_text(encoding="utf-8")
changes = 0

# ---------------------------------------------------------------------------
# 1. The header: the new current-version paragraph; v2.44.0 demoted to
#    "Previous version".
# ---------------------------------------------------------------------------
if "> **Current version: v2.45.0**" not in src:
    old_head = "> **Current version: v2.44.0** (session 247"
    assert src.count(old_head) == 1, "v2.44.0 current-version head not found once"
    src = src.replace(old_head, "> **Previous version: v2.44.0** (session 247", 1)
    new_current = """> **Current version: v2.45.0** (session 248 — the guard-advance,
> pause-composition, and write-path-select round R-45: the owner's
> standing directive — refresh → review → validate → audit → parity
> iteration → remediation plan → TDD execution → captures → docs
> lockstep → commit → push, with the reference STABLE on all standing
> drift layers and the TRUE-390 mobile menu re-verified by probe:ref
> this session; the cold-baseline gate GREEN at HEAD 02a4ae7 — no
> discovery this round, the v2.44.0 ship state reproduced exactly:
> lint 0/0 · tsc 0 · 1610/1610 unit (98 files) · build · smoke 15/15
> · 151/151 e2e · census MATCH). The session-248 fresh-eyes audit
> (three Mode-C passes: the R-44 cure surfaces driven by the session,
> the API/auth/security layer, and the UI/a11y/shell layer — 0
> Critical / 0 High / 0 Medium / 6 Low / 8 Informational NEW after
> dedup, every material claim re-verified at file:line by the driving
> session; all six R-44 cure surfaces verified holding — the guard
> advance itself aged out by one block again, the F-243b/F-244a
> genus's SIXTH recurrence, cured first this session per the F-244a
> rule). The round's flagship: THE TOAST PAUSE COMPOSITION HOLE
> (F-248b — the F-247c cure shared ONE paused boolean between the
> hover and focus pairs, so a pointer EXITING the card un-paused the
> timer while keyboard focus still sat on the Dismiss button — the
> mixed-modality arm re-opens the exact 4s death-with-focus the cure
> targeted; hover and focus become independent flags, OR-composed,
> resuming only when both clear). Plus: THE GUARD-TRIO ADVANCE
> (F-248a — v2.42.0/v2.43.0/v2.44.0, green-by-design before this
> session's own lockstep pass, the parity-243 mirror recalibrated
> same-commit); THE IMPORT DISCARD COMMIT-WINDOW GUARD (F-248c — the
> F-247e rider covered the file input only; the Step 2 Discard button
> stayed live through the import POST, an implied cancellation that
> isn't); THE SEVEN SIBLING WALKER JSX COMPLETIONS (F-248d — the
> F-243d whole-tree doctrine was applied to parity-229/242, route-case
> and palette-pins only; parity-230/231/232/233/240/241 and
> gate-script's src walkers still excluded the nine bridges);
> THE AUTH-FAMILY WRITE-PATH SELECTS (F-248e — Prisma update without
> select returns the complete post-update row, so five auth-family
> updates materialized passwordHash/resetToken/verificationCodeHash in
> handler scope, the F-228h insurance doctrine's write-path half);
> and THE LOGOUT CLEAR ENVELOPE RIDER (F-248g — the final
> clearSessionCookie sat outside the try, the family's one envelope
> escape; promoted from Informational because the route is touched
> for F-248e this round). Registered, not cured: the
> remount-hydrate stale-read leg (F-248f — the F-237c rider's
> unrecorded user-visible half; a sub-second self-healing window whose
> cure redesigns the token machinery four sessions of wall/era
> hardening ride), the login mint version window (F-248h — the
> F-239p genus at its login sibling), the app-side pending-face gap
> (F-248i — seven submits keep idle labels through the in-flight
> window), the settings switch description association (F-248j), the
> expenses filter result silence (F-248k — the parity posture), the
> login-card banner timing (F-248l — parity-pinned), the transaction
> account-check full rows (F-248m — no secret columns exist), and the
> iat finite rider's unreachable-by-construction note (F-248n —
> defense in depth). §5 carries the execution history.)

"""
    anchor = "> **Previous version: v2.43.0** (session 246"
    assert src.count(anchor) == 1, "v2.43.0 previous-version head not found once"
    src = src.replace(anchor, new_current + anchor, 1)
    changes += 1

# ---------------------------------------------------------------------------
# 2. The §2.8 audit ledger (inserted before "## 3. The remediation
#    program (R-items)").
# ---------------------------------------------------------------------------
if "### 2.8 Session-248 audit ledger" not in src:
    ledger = """### 2.8 Session-248 audit ledger (the fresh-eyes round over the v2.44.0 ship state)

Three Mode-C passes (the R-44 cure surfaces · the API/auth/security layer ·
the UI/a11y/shell layer); every material claim re-verified at file:line by
the driving session before planning. NEW findings after dedup (the passes
re-confirmed the documented postures without exception — the API layer
came back clean: owner-scoping, Zod, buckets, injection, enumeration,
session, errors, secrets, deps all clean; the negative results are
recorded in the session log):
0 Critical / 0 High / 0 Medium / 6 Low / 8 Informational.

| ID | Severity | Finding (adjudicated) | Location | Disposition |
|---|---|---|---|---|
| F-248a | Low | **The F-243b/F-244a recurrence, SIXTH edition — the guard trio aged out inside R-44's own ship commit again.** The guard pins v2.41.0/v2.42.0/v2.43.0 (`tests/docs-counts.test.ts:217-219`) while the PAD's three most recent revision blocks are v2.42.0 (:128), v2.43.0 (:75), v2.44.0 (:19) — session 247 landed the v2.44.0 block carrying the NOW-LIVE 1610/98 pair with no pin watching it, the exact corruption shape the guard exists to intercept. The recurrence walks inside every ship commit that lands a block, by construction, until the advance is structural. | `tests/docs-counts.test.ts:206-220`; `Project_Architecture_Document.md:19,75,128` | **cured in R-45** (the trio advances to v2.42.0/v2.43.0/v2.44.0, landed green-by-design BEFORE this session's own lockstep pass — the F-244a lesson's own rule, executed FIRST this session; the parity-243 mirror pin recalibrated same-commit) |
| F-248b | Low | **THE TOAST PAUSE COMPOSITION HOLE — the F-247c cure shares ONE paused boolean between the hover and focus pairs.** `onMouseLeave` fires without blur, so a pointer exiting the card while keyboard focus sits on the Dismiss button sets paused false and the toast auto-dismisses at 4s WITH the focus inside it — the exact failure F-247c targeted, re-openable by a mouse event after the cure (the mixed-modality arm: four writers, one non-composed boolean). | `src/components/ui/toast.tsx:104,135-142` | **cured in R-45** (hover and focus become independent state flags OR-composed into the paused the timer reads — resume only when both clear; the toast-anatomy and parity-247 pins recalibrated to the composed form same-commit) |
| F-248c | Low | **THE IMPORT DISCARD COMMIT-WINDOW GAP — F-247e disabled the file input through the import POST, but the Step 2 Discard button carries no busy rider.** Step 2 stays rendered while the POST is in flight (rows non-null until resolution): a mid-commit Discard is an implied cancellation that isn't (the import still lands, the success toast fires after the user discarded), and on a FAILED import the review is already destroyed (re-pick + re-parse of up to 10 MB). No data corruption — the commit closure captured its rows. | `src/app/(app)/import/page.tsx:271-282` (the commit window at :173-186) | **cured in R-45** (the Discard button gains the busy rider — the F-247e form completed across the page's controls) |
| F-248d | Low | **THE SEVEN SIBLING WALKERS STILL EXCLUDE JSX — the F-243d whole-tree doctrine is incomplete beyond palette-pins.** parity-230 (:23), parity-231 (:24), parity-232 (:24), parity-233 (:24) filter `/\\.(ts\\|tsx\\|css)$/`, parity-240 (:29) and parity-241 (:21) filter `/\\.(tsx?\\|css)$/`, gate-script (:191) filters `/\\.(ts\\|tsx)$/` — none admits the nine capital-route .jsx bridges, so a future class-string, retired-import, or rendered-brand carrier added to a bridge is invisible to these "whole-tree" invariants. Zero live miss today (the bridges are pure re-export wrappers, verified). | `tests/parity-230.test.ts:23`; `tests/parity-231.test.ts:24`; `tests/parity-232.test.ts:24`; `tests/parity-233.test.ts:24`; `tests/parity-240.test.ts:29`; `tests/parity-241.test.ts:21`; `tests/gate-script.test.ts:191` | **cured in R-45** (the seven filters widen to the F-247f form — green-by-design over the re-export-only bridges) |
| F-248e | Low | **THE AUTH-FAMILY WRITE-PATH FULL-ROW RETURNS — the F-228h insurance doctrine's read-path completion (F-246d/F-247d) left the write path untouched.** Prisma `update` without `select` returns the complete post-update row: five auth-family updates materialize `passwordHash`/`resetToken`/`verificationCodeHash` in handler scope (forgot-password :129, verify :147 and :160, resend :95, logout :79 — all but verify's counter destructure discard the result entirely). No live leak; the insurance gap is a future "return the updated row" edit leaking every secret at once. | `src/app/api/auth/forgot-password/route.ts:129-135`; `src/app/api/auth/verify/route.ts:147-150,160-167`; `src/app/api/auth/resend/route.ts:95-102`; `src/app/api/auth/logout/route.ts:79-82` | **cured in R-45** (consumed-fields selects on all five — the users-PATCH form; verify's counter destructure selects its one field) |
| F-248f | Low | **THE REMOUNT-HYDRATE STALE-READ LEG — F-237c's rider adjudicated the wasted WRITE, not the surviving stale READ.** mutate captures sessionWriteToken at entry; a remount hydrate (the root-to-section AppShell crossing) bumps the token with no clear and issues its own dashboard GET; if the GET's server read predates an in-flight mutation's commit, the mutation's post-write refreshAll lands with the stale token and is DISCARDED — the store commits hydrate's pre-write payload and the user sees the row they deleted beside its success toast until the next fetch. Sub-second, self-healing, no data loss; the cure redesigns the token/sequence interplay the F-217l/F-239a/F-240a/F-241a wall-and-era machinery rides. | `src/stores/wealthos-store.ts:278,284` (the discard at :242; the entry bump at :314) | recorded (Reasoned, control-flow verified, not live-reproduced; its own round — the fetch-coordination design needs the wall machinery re-validated with it) |
| F-248g | Informational | **THE LOGOUT FINAL CLEAR OUTSIDE THE ENVELOPE — `clearSessionCookie()` + `ok()` sit after the catch closes.** Every other cookie operation in the auth family rides inside a try, and the route's own vanished-row arm clears inside its catch; a framework-level failure in the unprotected call would surface a raw non-JSON 500 for an already-completed eviction — the class the envelope doctrine exists to bar. Near-zero reachability. | `src/app/api/auth/logout/route.ts:104-105` | **cured in R-45** (the promoted rider — the route is touched for F-248e; the clear gains its own minimal arm that still answers the completed sign-out: the eviction committed, and the cookie dies at the next session read by the tokenVersion bump regardless) |
| F-248h | Informational | **THE LOGIN MINT VERSION WINDOW — F-239p's registered verify-site genus, at its login sibling.** Login selects tokenVersion at :70-82, burns one scrypt (~28 ms) at :124, then mints at :131 — a concurrent logout or password reset inside the window yields a 200 whose cookie dies at the next getSessionUser comparison. Self-healing; the logout-concurrent outcome matches the documented evict-all semantic. | `src/app/api/auth/login/route.ts:70-82,124,131` | recorded (the F-239p register row's own disposition — re-read before mint if the family is ever touched) |
| F-248i | Informational | **THE APP-SIDE PENDING-FACE GAP — the busy label idiom never reached this family.** The auth family and the import parse window swap their submit label while pending ("Please wait…" / "Reading file…"); the seven app-side submits (Settings save :407, Import commit :339, and the five section-dialog submits at expenses :744, income :377, accounts :323, goals :352, investments :570) keep their idle label through the in-flight window — disabled + eventual toast only. No WCAG violation (disabled-state semantics are met); a house-idiom consistency gap. | `src/app/(app)/settings/page.tsx:407-415` et al. | recorded (a seven-site consistency completion; promote with a mandate) |
| F-248j | Informational | **THE SETTINGS SWITCH DESCRIPTION ASSOCIATION — NotificationRow's description is a sibling paragraph with no aria-describedby wiring.** The switch's accessible name is the label (htmlFor to the button id — 4.1.2 satisfied); the description text is reachable but not announced on focus. Four settings controls. | `src/app/(app)/settings/page.tsx:436-468` | recorded (the standard completion for the row pattern; census-visible — re-derive the interior allowance in the same commit if ever promoted) |
| F-248k | Informational | **THE EXPENSES FILTER RESULT SILENCE — search, tab, and category rewrites the history list and its count with no status announcement.** SC 4.1.3 is genuinely arguable (results render in the region the user manipulates; the reference's own tabs announce nothing — the parity posture). The one high-traffic results-changing surface with no region. | `src/app/(app)/expenses/page.tsx:169-179,396` | recorded (the F-232e always-mounted region form if ever promoted; adjudicated parity posture) |
| F-248l | Informational | **THE LOGIN-CARD BANNER TIMING — the 3s resend-confirmation info auto-dismiss carries no pause of any modality.** Not the F-247c genus (no pause exists to be asymmetric); parity-pinned (the reference auto-dismisses ~3s). The remaining setTimeout sites are 0 ms defers and cleanup, not dismissals. | `src/components/layout/login-card.tsx:47,103-107` | recorded (parity; a pause rider only if parity ever allows) |
| F-248m | Informational | **THE TRANSACTION ACCOUNT-CHECK FULL ROWS — the two account-existence checks haul full BankAccount rows.** Existence-only consumption (`if (!account) return ERR.BAD_REQUEST`); BankAccount carries no secret columns, so this is F-247d-genus consistency only. | `src/app/api/transactions/route.ts:48-51`; `src/app/api/transactions/[id]/route.ts:28-31` | recorded (a select would complete the form; zero secret surface today) |
| F-248n | Informational | **THE IAT FINITE RIDER'S UNREACHABLE-BY-CONSTRUCTION NOTE — JSON.parse cannot yield NaN, and an Infinity iat nulls at the present bound regardless.** The F-247b rider is defense in depth, not a closed hole; the audit verified empirically that no non-finite iat reaches the span comparison. Documented so a future pass does not re-chase it. | `src/lib/auth.ts:121-124` | recorded (no action; the belt-and-braces form stands) |


"""
    anchor = "## 3. The remediation program (R-items)"
    assert src.count(anchor) == 1, "section-3 anchor not found once"
    src = src.replace(anchor, ledger + anchor, 1)
    changes += 1

# ---------------------------------------------------------------------------
# 3. The R-45 section (inserted before the R-44 section).
# ---------------------------------------------------------------------------
if "### R-45 — The guard-advance, pause-composition, and write-path-select round" not in src:
    section = """### R-45 — The guard-advance, pause-composition, and write-path-select round (session 248) — Status: In progress

The session-248 findings-led round over the v2.44.0 ship state. Five
cures + one promoted rider (F-248a-e + F-248g), eight registrations
(F-248f, F-248h-n).

1. **R-45.1 — the pins born RED**: tests/parity-248.test.ts (the source
   battery: the toast's composed pause — two independent flags, the OR
   composition, the four handler literals in their new forms; the import
   Discard's busy rider; the seven walkers' jsx-admitting filter forms;
   the five update selects' field sets) + the docs-counts guard advance
   (green-by-design — the v2.44.0 block exists at its ship counts;
   landed FIRST, before this session's own lockstep pass, the F-244a
   lesson's own rule; the parity-243 mirror recalibrated same-commit) +
   the toast-anatomy and parity-247 pin recalibrations to the composed
   pause form (same-commit, the F-247d precedent for a one-session-old
   pin whose watched form legitimately changed).
2. **R-45.2 — the cures**: THE TOAST PAUSE COMPOSITION (F-248b — the
   flagship: hover and focus become independent state flags OR-composed
   into the paused the timer effect reads — a pointer exit can no longer
   un-pause a focus-held card); THE GUARD-TRIO ADVANCE (F-248a —
   v2.42.0/v2.43.0/v2.44.0); THE IMPORT DISCARD COMMIT-WINDOW GUARD
   (F-248c — the Discard button's busy rider); THE SEVEN SIBLING WALKER
   JSX COMPLETIONS (F-248d — green-by-design widenings per the F-247f
   precedent); THE AUTH-FAMILY WRITE-PATH SELECTS (F-248e —
   consumed-fields selects on the five updates, the users-PATCH form);
   THE LOGOUT CLEAR ENVELOPE RIDER (F-248g — the final clear joins the
   envelope with its own minimal arm answering the completed sign-out).
3. **R-45.3 — the verification**: the full gate (lint 0/0 · tsc 0 ·
   unit · build · smoke 15/15 · e2e) · the six parity drift gates CLEAN
   (the round's surfaces are a client-side state composition on a
   transient surface, an attribute-only disable rider, test-walker
   widenings, select narrowing, and a catch-arm addition —
   pixel-invisible by construction) · census MATCH · `bun audit`
   unchanged · the captures (the own-database F-225e convention + the
   census tripwire): the mobile drawer at 390 (the standing ask — 9
   destinations + Sign Out asserted), plus the round's own faces (the
   composed pause proven live: a focus-held toast surviving a pointer
   exit past the 4s mark).

"""
    anchor = "### R-44 — The guard-advance, iat-bound, and focus-pause round (session 247) — Status: Done(v2.44.0)"
    assert src.count(anchor) == 1, "R-44 section anchor not found once"
    src = src.replace(anchor, section + anchor, 1)
    changes += 1

# ---------------------------------------------------------------------------
# 4. The §5 execution-history row (inserted above the v2.44.0 row; the
#    gate column and status are finalized at close).
# ---------------------------------------------------------------------------
if "| v2.45.0 | 248 |" not in src:
    row = """| v2.45.0 | 248 | **R-45** (the guard-advance, pause-composition, and write-path-select round — findings-led, the standing directive with the reference STABLE on all standing drift layers and the TRUE-390 mobile menu re-verified by probe:ref; the cold baseline GREEN at HEAD 02a4ae7 — the v2.44.0 ship state reproduced exactly, no discovery). The audit round first: the standing layers re-verified (probe:ref STABLE — bundle md5 6d3779af… unchanged, demo data zero, desktop nav 256/9, the TRUE-390 menu 9 destinations; `bun audit` unchanged — 1 moderate dev-chain minimatch, the documented deferral; neo-crm unchanged (b3d0fbe) — nothing to port; the SEO surface verified on the artifact (smoke leg 12: sitemap + robots + manifest 200); the .env DATABASE_URL="file:../db/custom.db" contract + the db/ at the repo root + the vitest/playwright configs + the .env.example six-knob set all standing). The session-248 fresh-eyes audit (three Mode-C passes: the R-44 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 0 High / 0 Medium / 6 Low / 8 Informational NEW after dedup, every material claim re-verified at file:line by the driving session; all six R-44 cure surfaces holding — the guard advance aged out by one block again, the genus's SIXTH edition). The plan v2.45.0 written (the F-248a-n ledger + the R-45 section) and validated against the tree. **R-45.1** the pins born RED (the guard-trio advance green-by-design FIRST, per the F-244a rule; the parity-248 source battery + the toast-anatomy/parity-247 recalibrations) → **R-45.2** the cures (THE TOAST PAUSE COMPOSITION — the flagship; THE GUARD-TRIO ADVANCE; THE IMPORT DISCARD COMMIT-WINDOW GUARD; THE SEVEN SIBLING WALKER JSX COMPLETIONS; THE AUTH-FAMILY WRITE-PATH SELECTS; THE LOGOUT CLEAR ENVELOPE RIDER) → **R-45.3** the verification (the full gate + the six drift gates CLEAN + census MATCH + the captures + the docs lockstep) | (filled at close) | (this session's execution commit) |
"""
    anchor = "| v2.44.0 | 247 |"
    assert src.count(anchor) == 1, "v2.44.0 row anchor not found once"
    src = src.replace(anchor, row + anchor, 1)
    changes += 1

PLAN.write_text(src, encoding="utf-8")
print(f"plan insertions: {changes}/4")
assert changes == 4 or changes == 0, "unexpected insertion count"
