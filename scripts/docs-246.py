#!/usr/bin/env python3
"""Session-246 (R-43) plan writer — the v2.43.0 ledger insertion.

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
# 1. The header: the new current-version paragraph; v2.42.0 demoted to
#    "Previous version".
# ---------------------------------------------------------------------------
if "> **Current version: v2.43.0**" not in src:
    old_head = "> **Current version: v2.42.0** (session 245"
    assert src.count(old_head) == 1, "v2.42.0 current-version head not found once"
    src = src.replace(old_head, "> **Previous version: v2.42.0** (session 245", 1)
    new_current = """> **Current version: v2.43.0** (session 246 — the guard-advance,
> seam-convergence, and palette-truth round R-43: the owner's standing
> directive — refresh → review → validate → audit → parity iteration →
> remediation plan → TDD execution → captures → docs lockstep →
> commit → push, with the reference STABLE on all standing drift
> layers and the TRUE-390 mobile menu re-verified by probe:ref this
> session; the cold-baseline gate GREEN at HEAD d4aaf5d — no
> discovery this round, the v2.42.0 ship state reproduced exactly:
> lint 0/0 · tsc 0 · 1591/1591 unit (96 files) · build · smoke 15/15
> · 151/151 e2e · census MATCH). The session-246 fresh-eyes audit
> (three Mode-C passes: the R-42 cure surfaces driven by the session,
> the API/auth/security layer, and the UI/a11y/shell layer — 0
> Critical / 0 High / 0 Medium / 3 Low / 11 Informational raw, 6 Low
> / 4 Informational NEW after dedup, every material claim re-verified
> at file:line by the driving session; all eight R-42 cure surfaces
> verified holding — the guard advance itself aged out by one block
> again, the F-243b/F-244a genus's FOURTH recurrence, cured first
> this session per the F-244a rule). The round's flagship: THE
> LOGOUT SEAM CONVERGENCE (F-246b — the JSON content-type predicate
> lived at three hand-maintained sites: readBoundedJson's Layer 1,
> the requireJsonContentType seam, and logout's inline copy; the
> seam's own docblock cites the F-238b never-N-copies rule while
> knowingly mirroring logout's form — logout now joins the seam,
> byte-identical behavior, the family converged through one wrapper).
> Plus: THE GUARD-TRIO ADVANCE (F-246a — v2.40.0/v2.41.0/v2.42.0,
> green-by-design before this session's own lockstep pass, the
> parity-243 mirror recalibrated same-commit); THE TWENTY-FOUR DEAD
> PALETTE PIN RETIREMENTS (F-246c — 24 pinned-but-unused (family,
> step) tokens in the v3 re-pin block, dual-verified dead against
> src usage and the built stylesheet, retired per the F-228b
> precedent + the REVERSE palette leg so the dead-pin genus can
> never ship silently); THE AUTH-FAMILY SELECT NARROWINGS
> (F-246d — the four findUnique full-row reads narrowed to explicit
> selects, the F-228h getSessionUser form); and the two hygiene
> retirements (F-246e the unused fail import; F-246f the grow
> zero-match symmetry leg). Registered, not cured: the signup
> first-admin TOCTOU (F-246g — cosmetic under the F-244h no-authority
> posture) and the budgets second-strike P2002 edge (F-246h)."""
    src = src.replace(
        "> **Previous version: v2.42.0** (session 245",
        new_current + "\n>\n" + "> **Previous version: v2.42.0** (session 245",
        1,
    )
    changes += 1

# ---------------------------------------------------------------------------
# 2. The §2.6 audit ledger — inserted after §2.5's table, before §3.
# ---------------------------------------------------------------------------
if "### 2.6 Session-246 audit ledger" not in src:
    anchor = "\n## 3. The remediation program (R-items)"
    idx = src.index(anchor)
    slice_ = src[:idx]
    assert slice_.count("| F-245h |") == 1, "the F-245h tail row not found once in the pre-§3 slice"
    ledger = """
### 2.6 Session-246 audit ledger (the fresh-eyes round over the v2.42.0 ship state)

Three Mode-C passes (the R-42 cure surfaces · the API/auth/security layer ·
the UI/a11y/shell layer); every material claim re-verified at file:line by
the driving session before planning. NEW findings after dedup (the passes
re-confirmed the documented postures without exception):
0 Critical / 0 High / 0 Medium / 6 Low / 4 Informational.

| ID | Severity | Finding (adjudicated) | Location | Disposition |
|---|---|---|---|---|
| F-246a | Low | **The F-243b/F-244a recurrence, FOURTH edition — the guard trio aged out inside R-42's own ship commit again.** The guard pins v2.39.0/v2.40.0/v2.41.0 (`tests/docs-counts.test.ts:210-213`) while the PAD's three most recent revision blocks are v2.40.0 (:136), v2.41.0 (:80), v2.42.0 (:19) — session 245 landed the v2.42.0 block carrying the NOW-LIVE 1591/96 pair with no pin watching it, the exact corruption shape the guard exists to intercept (the next lockstep targets 1591/96), and the v2.39.0 pin now guards a pair two generations stale. The F-244a lesson's own line ("the next session's FIRST docs act is the advance") was violated by the session that re-stated it — the recurrence walks inside every ship commit that lands a block, by construction, until the advance is structural. | `tests/docs-counts.test.ts:200-213`; `Project_Architecture_Document.md:19,66` | **cured in R-43** (the trio advances to v2.40.0/v2.41.0/v2.42.0, landed green-by-design BEFORE this session's own lockstep pass — the F-244a lesson's own rule, executed FIRST this session; the parity-243 mirror pin recalibrated same-commit) |
| F-246b | Low | **THE THREE-SITE JSON CONTENT-TYPE PREDICATE — logout's inline gate never converged onto the R-42 seam.** The same predicate lives at three hand-maintained sites: `readBoundedJson`'s Layer 1 (structurally distinct — the null-value contract), the `requireJsonContentType` seam (`src/lib/api.ts:292-299`), and logout's inline copy (`route.ts:51-54` — the identical check + the identical 400 copy, minus the stream cancel, a no-op for a bodyless route). The seam's own docblock cites "the F-238b never-N-copies rule" while its pin comment records "the seam mirrors logout's cured inline form" — the family-convergence rule stated and knowingly not executed on its own seventh surface. Two source pins (parity-234:118, parity-243:63) grep the inline form and would catch a drift but also pin the divergence in place. | `src/lib/api.ts:292-299`; `src/app/api/auth/logout/route.ts:51-54`; `tests/parity-234.test.ts:118`; `tests/parity-243.test.ts:63` | **cured in R-43** (logout joins the seam — `const gate = await requireJsonContentType(req); if (gate) return gate;` — byte-identical behavior: the route reads no body so the stream cancel is a no-op and the 400 copy is the seam's own; the parity-234/243 gate-order pins recalibrated to the seam-call form same-commit; the parity-245 seam pin's mirror prose retired) |
| F-246c | Low | **TWENTY-FOUR dead palette pins in the v3 re-pin block.** The block's own header contract says "every literal (family, step) pair used in src/" — but 24 pinned pairs have zero consumers anywhere (dual-verified: a src/tests/public/root-config sweep finds only the definitions themselves, and the built stylesheet tree-shook every one): cyan-400; gray-50, gray-100, gray-200, gray-400, gray-600; green-500; orange-100, orange-500, orange-600; purple-50, purple-400, purple-700; rose-100, rose-700; teal-50, teal-100, teal-200, teal-400; yellow-50, yellow-100, yellow-200, yellow-400, yellow-800. The palette-pins guard covers only the used→pinned direction, so the dead direction is invisible to every gate — the F-228b zero-consumer-retirement precedent's palette edition (a future contrast sweep could mistake dead pins for live design intent; the interior-census selector string that greps gray-50 targets the REFERENCE's face and rides the @source-excluded scripts/ dir, so it is not a consumer). | `src/app/globals.css:191-303`; `tests/palette-pins.test.ts` | **cured in R-43** (the 24 pins retired per the F-228b precedent + the REVERSE leg in palette-pins: every pinned (family, step) token must be used in src/ class strings — the dead-pin genus fails `bun run test` from now on; the build probe before/after proves the built stylesheet unchanged token-for-token) |
| F-246d | Low | **The auth-family full-row reads haul secrets into handler scope.** Login/verify/resend/forgot-password all `findUnique({ where: { email } })` with no `select` (login:63, verify:79, resend:63, forgot:99) — `passwordHash`, `resetToken`, `verificationCodeHash` ride into scope where a subset is consumed. No route serializes the row today (responses carry explicit fields), so the exposure is latent — a future "return the fetched row" edit would silently leak the hashes. The F-228h precedent already narrowed `getSessionUser` to an explicit select; the four public-funnel reads never received the same narrowing. | `src/app/api/auth/login/route.ts:63`; `verify/route.ts:79`; `resend/route.ts:63`; `forgot-password/route.ts:99` | **cured in R-43** (the four reads narrowed to explicit selects mirroring the F-228h getSessionUser form — login: the credential/verification/session/response fields; verify: the verification trio + tokenVersion + identity; resend: the hash + identity; forgot: id only. No behavior change — the same fields the routes already touch) |
| F-246e | Low | **The unused `fail` import in forgot-password.** Imported at :5, never called (the file's only fail-shaped text is the word "failure" in comments) — blind to every gate (strict TS ships no noUnusedLocals; eslint's unused-imports rule is not configured for the no-effect import form). Dead identifier hygiene from before R-42. | `src/app/api/auth/forgot-password/route.ts:5` | **cured in R-43** (dropped from the import list — one line, zero behavior) |
| F-246f | Low | **The grow zero-match asymmetry.** Five of the six F-245e retired bare words carry parity-245 zero-match legs; `grow` relies solely on the BARE_UTILITY_WORDS leg whose recorded csv.ts regex-swallow blind spot could fabricate liveness for words in its span (grow's two former carriers — reset/route.ts and db-path.ts — sit outside the blind-spot span today, so the coverage is real but unproven by a dedicated pin). | `tests/parity-245.test.ts:90-152` | **cured in R-43** (the two-file grow zero-match leg joins the parity-246 battery — the symmetry completion, green-by-design over the already-reworded tree) |
| F-246g | Informational | **The signup first-admin role assignment carries a count TOCTOU.** The role (and the avatarColor cycling) derive from `db.user.count()` (:95) that races the insert (:127): two concurrent first signups can both read count===0 and both create with role "admin". Zero authority impact — no route reads `role` for any decision (grep-verified; display metadata on me/users/login only, the F-244h ledger note's own posture); worst case is two accounts labeled admin on a fresh install. | `src/app/api/auth/signup/route.ts:95,127` | recorded (no cure under the F-244h no-authority posture; re-open only if a future round gives the column authority — then the conditional-create form) |
| F-246h | Informational | **The budgets POST P2002-retry can itself P2002 and answer 500.** The concurrent-first-write cure retries the upsert once on P2002 (:90-94); the retry's own catch maps a SECOND P2002 (possible only if the winner's row is deleted between the retry's read and its create arm — a three-way POST/DELETE interleave on one (owner, category, period)) to `ERR.INTERNAL()`. A momentary 500; no data corruption; the next request succeeds. | `src/app/api/budgets/route.ts:90-94` | recorded (the marginal edge; the house 400/404 family answer only if a real interleave ever surfaces) |

"""
    src = src[:idx] + ledger + src[idx:]
    changes += 1

# ---------------------------------------------------------------------------
# 3. The R-43 section — inserted before the R-42 section head.
# ---------------------------------------------------------------------------
if "### R-43 — The guard-advance, seam-convergence, and palette-truth round" not in src:
    anchor = "### R-42 — The gate-order, bare-carrier, and lockstep-truth round (session 245) — Status: Done(v2.42.0)"
    assert src.count(anchor) == 1, "R-42 section head not found once"
    section = """### R-43 — The guard-advance, seam-convergence, and palette-truth round (session 246) — Status: Done(v2.43.0)

The session-246 findings-led round over the v2.42.0 ship state. Six
cures (F-246a-f), two registrations (F-246g-h).

1. **R-43.1 — the pins born RED**: tests/parity-246.test.ts (the source
   battery: logout's seam call form + its import, the retirement of the
   inline predicate, the four auth routes' findUnique-select forms with
   the documented field sets, the forgot-password import line, the grow
   two-file zero-match leg — green-by-design symmetry) + the
   palette-pins REVERSE leg (every pinned (family, step) token must be
   used in src/ class strings — RED at birth over the 24 dead pins) +
   the docs-counts guard advance (green-by-design — the v2.42.0 block
   exists at its ship counts; landed FIRST, before this session's own
   lockstep pass, the F-244a lesson's own rule; the parity-243 mirror
   recalibrated same-commit).
2. **R-43.2 — the cures**: THE LOGOUT SEAM CONVERGENCE (F-246b —
   logout calls `requireJsonContentType` like the six public routes;
   the parity-234/243 gate-order pins recalibrated to the seam-call
   form; the parity-245 seam pin's mirror prose retired); THE
   GUARD-TRIO ADVANCE (F-246a — v2.40.0/v2.41.0/v2.42.0); THE
   TWENTY-FOUR DEAD PALETTE PIN RETIREMENTS (F-246c — subtractive, per
   the F-228b precedent; the reverse palette leg added so the genus
   fails loudly); THE AUTH-FAMILY SELECT NARROWINGS (F-246d — the four
   reads, the F-228h form); THE UNUSED IMPORT RETIREMENT (F-246e); THE
   GROW SYMMETRY LEG (F-246f).
3. **R-43.3 — the verification**: the full gate (lint 0/0 · tsc 0 ·
   unit · build · smoke 15/15 · e2e) · the six parity drift gates CLEAN
   (the round's surfaces are a server-side no-op refactor, a
   subtractive CSS token retirement tree-shook by construction, select
   narrowing, and a dead import — pixel-invisible by construction) ·
   census MATCH · `bun audit` unchanged · the build probe (the built
   stylesheet unchanged token-for-token after the 24 retirements) ·
   the captures (the own-database F-225e convention + the census
   tripwire): the mobile drawer at 390 (the standing ask — 9
   destinations + Sign Out asserted), plus the round's own faces.

"""
    src = src.replace(anchor, section + anchor, 1)
    changes += 1

# ---------------------------------------------------------------------------
# 4. The §5 execution-history row — inserted above the v2.42.0 row.
# ---------------------------------------------------------------------------
if "| v2.43.0 | 246 |" not in src:
    anchor = "| v2.42.0 | 245 |"
    assert src.count(anchor) == 1, "the v2.42.0 execution row not found once"
    row = """| v2.43.0 | 246 | **R-43** (the guard-advance, seam-convergence, and palette-truth round — findings-led, the standing directive with the reference STABLE on all standing drift layers and the TRUE-390 mobile menu re-verified by probe:ref; the cold baseline GREEN at HEAD d4aaf5d — the v2.42.0 ship state reproduced exactly, no discovery). The audit round first: the standing layers re-verified (probe:ref STABLE — bundle md5 6d3779af… unchanged, demo data zero, desktop nav 256/9, the TRUE-390 menu 9 destinations; `bun audit` unchanged — 1 moderate dev-chain minimatch, the documented deferral; neo-crm unchanged (b3d0fbe) — nothing to port; the SEO surface verified on the artifact (smoke leg 12: sitemap + robots + manifest 200); the .env DATABASE_URL="file:../db/custom.db" contract + the db/ at the repo root + the vitest/playwright configs + the .env.example six-knob set all standing). The session-246 fresh-eyes audit (three Mode-C passes: the R-42 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 0 High / 0 Medium / 6 Low / 4 Informational NEW after dedup, every material claim re-verified at file:line by the driving session; all eight R-42 cure surfaces holding — the guard advance aged out by one block again, the genus's FOURTH edition). The plan v2.43.0 written (the F-246a-h ledger + the R-43 section) and validated against the tree. **R-43.1** the pins born RED (the guard-trio advance green-by-design FIRST, per the F-244a rule) → **R-43.2** the cures (THE LOGOUT SEAM CONVERGENCE; THE GUARD-TRIO ADVANCE; THE TWENTY-FOUR DEAD PALETTE PIN RETIREMENTS + THE REVERSE LEG; THE AUTH-FAMILY SELECT NARROWINGS; THE UNUSED IMPORT RETIREMENT; THE GROW SYMMETRY LEG) → **R-43.3** the verification (the full gate + the six drift gates CLEAN + census MATCH + the build probe + the captures + the docs lockstep) | lint 0/0 · tsc 0 · unit (+N) · build · smoke 15/15 · **151 e2e** · six drift gates CLEAN (0-event margin) · census MATCH | (this session's execution commit) |
"""
    src = src.replace(anchor, row + anchor, 1)
    changes += 1

PLAN.write_text(src, encoding="utf-8")
print(f"docs-246.py: {changes} insertion(s) applied")
