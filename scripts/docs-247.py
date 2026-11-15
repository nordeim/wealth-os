#!/usr/bin/env python3
"""Session-247 (R-44) plan writer — the v2.44.0 ledger insertion.

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
# 1. The header: the new current-version paragraph; v2.43.0 demoted to
#    "Previous version".
# ---------------------------------------------------------------------------
if "> **Current version: v2.44.0**" not in src:
    old_head = "> **Current version: v2.43.0** (session 246"
    assert src.count(old_head) == 1, "v2.43.0 current-version head not found once"
    src = src.replace(old_head, "> **Previous version: v2.43.0** (session 246", 1)
    new_current = """> **Current version: v2.44.0** (session 247 — the guard-advance,
> iat-bound, and focus-pause round R-44: the owner's standing
> directive — refresh → review → validate → audit → parity iteration →
> remediation plan → TDD execution → captures → docs lockstep →
> commit → push, with the reference STABLE on all standing drift
> layers and the TRUE-390 mobile menu re-verified by probe:ref this
> session; the cold-baseline gate GREEN at HEAD c19c242 — no
> discovery this round, the v2.43.0 ship state reproduced exactly:
> lint 0/0 · tsc 0 · 1601/1601 unit (97 files) · build · smoke 15/15
> · 151/151 e2e · census MATCH). The session-247 fresh-eyes audit
> (three Mode-C passes: the R-43 cure surfaces driven by the session,
> the API/auth/security layer, and the UI/a11y/shell layer — 0
> Critical / 0 High / 0 Medium / 6 Low / 6 Informational NEW after
> dedup, every material claim re-verified at file:line by the driving
> session; all seven R-43 cure surfaces verified holding — the guard
> advance itself aged out by one block again, the F-243b/F-244a
> genus's FIFTH recurrence, cured first this session per the F-244a
> rule). The round's flagship: THE IAT SHAPE-AND-PRESENT BOUND
> (F-247b — the F-244f TTL guard closed only the exp half of the
> signer-bug class its own docblock names: a future iat kept a valid
> exp−iat span and was honored iat+TTL (the docblock's own named
> ms-vs-s unit-slip threat, uncaught on the iat field), and a
> non-numeric iat NaN'd the span comparison into a silent pass while
> flowing the raw value into SessionPayload; the iat now carries the
> exp/v family's own shape guard plus a present bound at the 60s
> clock-skew slack — the no-iat strict arm untouched). Plus: THE
> GUARD-TRIO ADVANCE (F-247a — v2.41.0/v2.42.0/v2.43.0,
> green-by-design before this session's own lockstep pass, the
> parity-243 mirror recalibrated same-commit); THE TOAST FOCUS-PAUSE
> RIDERS (F-247c — the 4s auto-dismiss paused on hover only; the
> onFocus/onBlur pair completes the keyboard arm so a tabbed-to
> Dismiss button no longer dies at 4s with the focus inside it); THE
> AUTH-FAMILY SELECT RESIDUALS (F-247d — signup's existence check and
> reset-password's token read, the two F-246d misses, narrowed to
> explicit selects, the F-228h insurance doctrine completed); THE
> IMPORT COMMIT-WINDOW GUARD (F-247e — the file input gains the busy
> rider, closing the commit-window re-pick the F-234b parse token
> never covered); and THE PALETTE ENUMERATOR JSX COMPLETION (F-247f —
> the walker admits the nine .jsx bridges per the F-243d whole-tree
> doctrine, green-by-design over the re-export-only bridges).
> Registered, not cured: the sessioned-family burn-before-gate
> consistency (F-247g), the login password cap asymmetry (F-247h),
> the csvImport category min(1) asymmetry (F-247i), the useTheme
> fallback's unresolved system arm (F-247j — latent), the theme-label
> bootstrap gap (F-247k — latent), and the avatar luminance heuristic
> (F-247l — decorative)."""
    src = src.replace(
        "> **Previous version: v2.43.0** (session 246",
        new_current + "\n>\n" + "> **Previous version: v2.43.0** (session 246",
        1,
    )
    changes += 1

# ---------------------------------------------------------------------------
# 2. The §2.7 audit ledger — inserted after §2.6's table, before §3.
# ---------------------------------------------------------------------------
if "### 2.7 Session-247 audit ledger" not in src:
    anchor = "\n## 3. The remediation program (R-items)"
    idx = src.index(anchor)
    slice_ = src[:idx]
    assert slice_.count("| F-246h |") == 1, "the F-246h tail row not found once in the pre-§3 slice"
    ledger = """
### 2.7 Session-247 audit ledger (the fresh-eyes round over the v2.43.0 ship state)

Three Mode-C passes (the R-43 cure surfaces · the API/auth/security layer ·
the UI/a11y/shell layer); every material claim re-verified at file:line by
the driving session before planning. NEW findings after dedup (the passes
re-confirmed the documented postures without exception):
0 Critical / 0 High / 0 Medium / 6 Low / 6 Informational.

| ID | Severity | Finding (adjudicated) | Location | Disposition |
|---|---|---|---|---|
| F-247a | Low | **The F-243b/F-244a recurrence, FIFTH edition — the guard trio aged out inside R-43's own ship commit again.** The guard pins v2.40.0/v2.41.0/v2.42.0 (`tests/docs-counts.test.ts:214-216`) while the PAD's three most recent revision blocks are v2.41.0 (:171), v2.42.0 (:119), v2.43.0 (:58) — session 246 landed the v2.43.0 block carrying the NOW-LIVE 1601/97 pair with no pin watching it, the exact corruption shape the guard exists to intercept (the next lockstep targets 1601/97), and the v2.40.0 pin now guards a pair two generations stale. The recurrence walks inside every ship commit that lands a block, by construction, until the advance is structural. | `tests/docs-counts.test.ts:205-216`; `Project_Architecture_Document.md:19,58` | **cured in R-44** (the trio advances to v2.41.0/v2.42.0/v2.43.0, landed green-by-design BEFORE this session's own lockstep pass — the F-244a lesson's own rule, executed FIRST this session; the parity-243 mirror pin recalibrated same-commit) |
| F-247b | Low | **THE HALF-CLOSED IAT BOUND — verifySessionToken's F-244f span guard closed only the exp half of the signer-bug class its own docblock names.** `iat` carries neither the shape guard `exp`/`v` enjoy nor a present bound: (1) a future iat (iat = now + X with exp = iat + 7d) keeps a valid exp−iat span and is honored X + TTL — the docblock's own named ms-vs-s unit-slip threat, uncaught on the iat field; (2) a non-numeric iat NaN's the span comparison (NaN > bound is false) into a silent pass while flowing the raw value into SessionPayload. No attacker path (iat rides the HMAC; exploitation requires a signer bug or secret compromise) — but the guard's entire purpose is signer-bug containment and it contains only half the class it names. | `src/lib/auth.ts:107-127`; the pin gap at `tests/parity-244.test.ts:117-126` | **cured in R-44** (the iat gains its own shape-and-present bound: a PRESENT iat must be a finite number and cannot sit further than the 60s clock-skew slack past now; the no-iat strict arm untouched (a missing iat still reads as the epoch against the span bound); two behavioral legs born RED — a future iat honored pre-cure, a non-numeric iat flowing a string into SessionPayload pre-cure) |
| F-247c | Low | **THE TOAST FOCUS-PAUSE ASYMMETRY — the 4s auto-dismiss pauses on hover only.** A keyboard user tabbing onto the card's Dismiss button (its one control) gets no pause: the card is removed at 4s and the focused button dies with it (focus falls to body); a screen-reader user can lose the live region's source node mid-read. The house adopted pause-on-hover as the design; the keyboard arm is the gap on the app's sole mutation-feedback channel. | `src/components/ui/toast.tsx:101-136` (the timer deps `[paused, item.id]`; the `onMouseEnter/Leave` pair at :135-136) | **cured in R-44** (the onFocus/onBlur pair joins the onMouseEnter/Leave pair — React's synthetic focus events bubble from the Dismiss button to the card, completing the design's keyboard arm) |
| F-247d | Low | **THE AUTH-FAMILY SELECT RESIDUALS — F-246d narrowed the four public-funnel reads but the family has two more full-row hauls.** Signup's `findUnique({ where: { email } })` (an existence check consuming truthiness alone) and reset-password's `findFirst({ where: { resetToken } })` (consuming id + resetTokenExpiresAt only) haul `passwordHash`/`resetToken`/`verificationCodeHash` into handler scope — the F-228h insurance doctrine ("a future return-the-fetched-row edit cannot silently leak the rest"), two routes short of complete. | `src/app/api/auth/signup/route.ts:65`; `src/app/api/auth/reset-password/route.ts:64-66` | **cured in R-44** (signup selects `{ id }`; reset-password selects `{ id, resetTokenExpiresAt }` with the narrowed type annotation — the F-246d family completed) |
| F-247e | Low | **THE IMPORT COMMIT-WINDOW RE-PICK — F-234b's monotonic parse token guards the parse window only; the commit window is unguarded.** The file input is never disabled while `busy`, so a re-pick during the import POST nulls rows mid-commit (pickFile clears unconditionally) while the in-flight commit's success path unconditionally clears file/rows/inputRef — clobbering whatever the new parse staged (or racing it), leaving the label at "Upload a file" with a stranded preview. No data corruption (the old rows import correctly); a confusing mid-flight UX in a ~1s window — the one unguarded interleaving on the page by the repo's own standard. | `src/app/(app)/import/page.tsx:70-75,173-186,216-223` | **cured in R-44** (the input gains `disabled={busy}` — a re-pick inside the commit window is a no-op; the parse window keeps its token-guarded re-pick semantics untouched) |
| F-247f | Low | **THE PALETTE ENUMERATOR JSX MISS — palette-pins' collectSrcFiles admits only .ts/.tsx.** The F-243d whole-tree doctrine (pinned for the parity-229/242 walkers at parity-243:163-182) requires class-string walkers to admit the nine .jsx capital bridges; the palette walker's filter excludes them — a latent escape hatch for both legs (a palette class added only to a bridge escapes the forward leg; a pin whose only usage is jsx false-reds the reverse leg). Zero live impact today (the bridges are pure re-exports, verified zero palette tokens — the widening is green-by-design). The reverse leg also counts comment mentions as liveness (the latent F-224v genus — registered, not cured: the anchored-match refinement would ripple into the forward leg's semantics). | `tests/palette-pins.test.ts:56-65` | **cured in R-44** (the walker admits `.jsx` per the F-243d form, the docblock's enumeration follows; the comment-liveness refinement registered) |
| F-247g | Informational | **The sessioned-family burn-before-gate ordering — F-245a's gate-before-burn doctrine applied to the public family only.** The sessioned writes family burns its per-IP bucket before the content-type gate (which rides parseBody's Layer 1) — e.g. transactions POST burns at :38 with the gate inside parseBody at :42; the same shape across the [id] mutations, accounts/goals/investments/income-sources/budgets/settings/users POST/PATCH/DELETE, import, ai/coach, reset. Effectively nil today: SameSite=Lax cookies do not ride cross-site POSTs and requireSession 401s cookie-less callers BEFORE the burn, so only a cookie-armed caller can burn (the victim's own traffic or a same-site sibling-subdomain, outside the single-origin self-hosted model). | `src/app/api/transactions/route.ts:38-42` et al. | recorded (consistency sweep only; the burn-on-the-cost-carrying-path doctrine stands — the cookie IS the credential on the sessioned family) |
| F-247h | Informational | **loginSchema.password carries no length cap (the set-time surfaces cap at 200 — the F-224h contract).** In practice the 16KB readBoundedJson ceiling bounds it and scrypt cost is length-insensitive: no DoS, no correctness issue — a field-contract asymmetry only. | `src/lib/schemas.ts:52` | recorded (a login-time cap flips the observable 401→400 on a pathological path; re-open only with a mandate) |
| F-247i | Informational | **csvImportSchema.category lacks min(1) — masked at the write site.** An all-whitespace import row category parses to "" and the import route's `r.category \\|\\| "Other"` normalizes it before the write, so no empty category ever lands (transactionCreateSchema's category carries min(1) at :208). Pure schema-consistency note. | `src/lib/schemas.ts:589`; `src/app/api/import/route.ts:37` | recorded (a schema min would flip normalize→reject — an observable behavior change without a parity mandate) |
| F-247j | Informational | **The useTheme no-provider fallback's system arm never resolves the OS preference.** Outside the provider, `setTheme("system")` removes `.dark` unconditionally instead of consulting prefers-color-scheme — divergent from applyTheme("system") in the same file; the fallback also skips localStorage. Both arms defensive-only: the provider wraps every consumer in the shipped tree (the two useTheme call sites consume `toggle` only). | `src/components/layout/theme.tsx:154-170` | recorded (latent; surfaces only if a consumer ever mounts outside the provider) |
| F-247k | Informational | **The ThemeProvider's theme label never bootstraps from storage.** The context's `theme` value starts "system" regardless of the stored choice and only re-reads on a resolved-dark flip; a page-load with stored "dark" and a dark OS leaves the label "system" until the next flip. No consumer of the label exists (verified — only `toggle` is destructured); the resolved state (useIsDark) reads the DOM class and is always accurate. | `src/components/layout/theme.tsx:90,132-136` | recorded (latent; promote when a consumer of the choice label exists) |
| F-247l | Informational | **avatarTextColor uses non-linearized luminance (the self-declared "WCAG-ish" heuristic).** Relative luminance computed on raw sRGB bytes with a 0.55 threshold — mid-saturation fills can compute sub-AA ink; the amber default computes ≈6.2:1 (readable). The avatar glyph is decorative and aria-hidden in the sidebar (the real name/email render adjacent); the docblock documents the heuristic. | `src/components/ui/avatar.tsx:14-22` | recorded (decorative; the linearized form if a real text carrier ever rides the avatar) |

"""
    src = src[:idx] + ledger + src[idx:]
    changes += 1

# ---------------------------------------------------------------------------
# 3. The R-44 section — inserted before the R-43 section head.
# ---------------------------------------------------------------------------
if "### R-44 — The guard-advance, iat-bound, and focus-pause round" not in src:
    anchor = "### R-43 — The guard-advance, seam-convergence, and palette-truth round (session 246) — Status: Done(v2.43.0)"
    assert src.count(anchor) == 1, "R-43 section head not found once"
    section = """### R-44 — The guard-advance, iat-bound, and focus-pause round (session 247) — Status: Done(v2.44.0)

The session-247 findings-led round over the v2.43.0 ship state. Six
cures (F-247a-f), six registrations (F-247g-l).

1. **R-44.1 — the pins born RED**: tests/parity-247.test.ts (the source
   battery: the iat shape guard + the present-bound form + the
   no-iat-arm preservation, the toast focus-pause pair beside the hover
   pair, signup's findUnique-select form, reset-password's
   findFirst-select form, the import input's busy rider, the palette
   walker's jsx arm + its docblock) + the two auth.test.ts behavioral
   legs (a future iat beyond the skew slack — honored pre-cure; a
   non-numeric iat — a string flowed into SessionPayload pre-cure) +
   the docs-counts guard advance (green-by-design — the v2.43.0 block
   exists at its ship counts; landed FIRST, before this session's own
   lockstep pass, the F-244a lesson's own rule; the parity-243 mirror
   recalibrated same-commit). HONEST RED: 9 + the green-by-design
   advance.
2. **R-44.2 — the cures**: THE IAT SHAPE-AND-PRESENT BOUND (F-247b —
   the flagship: a present iat must be a finite number and cannot sit
   further than the 60s clock-skew slack past now; the exp/v family
   form; the no-iat strict arm untouched); THE GUARD-TRIO ADVANCE
   (F-247a — v2.41.0/v2.42.0/v2.43.0); THE TOAST FOCUS-PAUSE RIDERS
   (F-247c — onFocus/onBlur join onMouseEnter/onMouseLeave); THE
   AUTH-FAMILY SELECT RESIDUALS (F-247d — signup `{ id }`,
   reset-password `{ id, resetTokenExpiresAt }`); THE IMPORT
   COMMIT-WINDOW GUARD (F-247e — the input's busy rider); THE PALETTE
   ENUMERATOR JSX COMPLETION (F-247f — the walker admits the bridges
   per the F-243d doctrine).
3. **R-44.3 — the verification**: the full gate (lint 0/0 · tsc 0 ·
   unit · build · smoke 15/15 · e2e) · the six parity drift gates CLEAN
   (the round's surfaces are a server-side verifier bound, an
   attribute-only focus rider, select narrowing, an input-disable
   rider, and a test-walker widening — pixel-invisible by
   construction) · census MATCH · `bun audit` unchanged · the captures
   (the own-database F-225e convention + the census tripwire): the
   mobile drawer at 390 (the standing ask — 9 destinations + Sign Out
   asserted), plus the round's own faces.

"""
    src = src.replace(anchor, section + anchor, 1)
    changes += 1

# ---------------------------------------------------------------------------
# 4. The §5 execution-history row — inserted above the v2.43.0 row.
# ---------------------------------------------------------------------------
if "| v2.44.0 | 247 |" not in src:
    anchor = "| v2.43.0 | 246 |"
    assert src.count(anchor) == 1, "the v2.43.0 execution row not found once"
    row = """| v2.44.0 | 247 | **R-44** (the guard-advance, iat-bound, and focus-pause round — findings-led, the standing directive with the reference STABLE on all standing drift layers and the TRUE-390 mobile menu re-verified by probe:ref; the cold baseline GREEN at HEAD c19c242 — the v2.43.0 ship state reproduced exactly, no discovery). The audit round first: the standing layers re-verified (probe:ref STABLE — bundle md5 6d3779af… unchanged, demo data zero, desktop nav 256/9, the TRUE-390 menu 9 destinations; `bun audit` unchanged — 1 moderate dev-chain minimatch, the documented deferral; neo-crm unchanged (b3d0fbe) — nothing to port; the SEO surface verified on the artifact (smoke leg 12: sitemap + robots + manifest 200); the .env DATABASE_URL="file:../db/custom.db" contract + the db/ at the repo root + the vitest/playwright configs + the .env.example six-knob set all standing). The session-247 fresh-eyes audit (three Mode-C passes: the R-43 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 0 High / 0 Medium / 6 Low / 6 Informational NEW after dedup, every material claim re-verified at file:line by the driving session; all seven R-43 cure surfaces holding — the guard advance aged out by one block again, the genus's FIFTH edition). The plan v2.44.0 written (the F-247a-l ledger + the R-44 section) and validated against the tree. **R-44.1** the pins born RED (the guard-trio advance green-by-design FIRST, per the F-244a rule; honest RED: 9 — the parity-247 source battery + the two auth.test.ts iat legs) → **R-44.2** the cures (THE IAT SHAPE-AND-PRESENT BOUND — the flagship; THE GUARD-TRIO ADVANCE; THE TOAST FOCUS-PAUSE RIDERS; THE AUTH-FAMILY SELECT RESIDUALS; THE IMPORT COMMIT-WINDOW GUARD; THE PALETTE ENUMERATOR JSX COMPLETION) → **R-44.3** the verification (the full gate + the six drift gates CLEAN + census MATCH + the captures + the docs lockstep) | lint 0/0 · tsc 0 · **1610 unit (98 files, +9)** · build · smoke 15/15 · **151 e2e** · six drift gates CLEAN (0-event margin) · census MATCH | (this session's execution commit) |
"""
    src = src.replace(anchor, row + anchor, 1)
    changes += 1

PLAN.write_text(src, encoding="utf-8")
print(f"docs-247.py: {changes} insertion(s) applied")
