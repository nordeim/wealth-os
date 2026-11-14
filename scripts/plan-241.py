#!/usr/bin/env python3
"""Session-241 (R-38): write the plan v2.38.0 into the ledger — the
header block, the F-241 ledger rows, the R-38 section, the §5 execution
row, and the tail-note extension. Assert-each-insertion form (the house
convention): every anchor asserted before insertion, the file written
once, every insertion re-verified after the write."""

from pathlib import Path

PLAN = Path("docs/remediation_plan_v2.md")
src = PLAN.read_text()

HEADER_NEW = """\
> **Current version: v2.38.0** (session 241 — the clear-era,
> creation-path, and seam-completion round R-38: the owner's standing
> directive — refresh → review → validate → audit → parity iteration →
> remediation plan → TDD execution → captures → docs lockstep →
> commit → push, with the reference STABLE on all standing drift
> layers and the TRUE-390 mobile menu re-verified by probe:ref this
> session; the cold-baseline gate GREEN at HEAD 71a4d9f — no
> discovery this round, the v2.37.0 ship state reproduced exactly:
> lint 0/0 · tsc 0 · 1485/1485 unit (90 files) · build · smoke 15/15
> · 147/147 e2e · census MATCH). The session-241 fresh-eyes audit
> (three Mode-C passes: the R-37 cure surfaces driven by the session,
> the API/auth/security layer, and the UI/a11y/shell layer — 0
> Critical / 0 High / 2 Medium / 7 Low / 4 Informational raw after
> dedup, every material claim re-verified at file:line by the driving
> session; the R-37 cure surfaces verified holding — the six user-keyed
> 401 arms, the signup process ceiling's bucket form, the FORM_INPUT
> seam's 16 consumers byte-identical, the verify equalizer's twin
> burns, the DialogFooter docblock, both test batteries green; the
> API layer clean again — owner-scoping census, bucket coverage, Zod
> sweep, injection sweep, enumeration sweep all clean; the UI layer
> clean — the drawer mechanics, the v4 scanner discipline, the theme
> system, the live-region contracts all holding). The round's
> flagships: THE CLEAR-ERA CURE (F-241a Medium — the R-37 live-user
> re-key removed the session-ERA dimension the old entry-token check
> carried: a previous user's late-landing 401 now walls a live NEW
> user's session face (the cross-era leg), a 401 landing inside
> logout's POST window aborts the clear and returns a false negative
> (the mid-logout leg), a first-load concurrent-hydrate twin can slip
> a revoked 200 past the wall (the twin leg), and a genuine 401 on
> the first-load error face skips the wall entirely (the error-face
> leg) — four interleavings, one root cause: user-standing cannot
> distinguish "no deliberate clear owns the face" from "a clear
> happened and a NEW session now owns it"; the uniform cure is a
> module-level CLEAR-ERA counter (bumped by the wall's commit and at
> logout's ENTRY — hydrate's entry bump, the F-240a staleness source,
> deliberately does NOT bump it) that every 401 arm captures at entry
> and compares before walling: an era match means no deliberate clear
> intervened since the fetch was issued → wall; a mismatch means the
> 401 belongs to the pre-clear session → discard; the fresh-token
> disjunct retires (subsumed), and the four legs gain behavioral
> proofs); THE SIGNUP CEILING HONESTY (F-241b Medium — the R-37
> global bucket counted every attempt that reached the handler: a
> single client's 20 requests (10 per-IP-passed + 10 per-IP-DENIED —
> the global call ran before the per-IP return) blocked every signup
> app-wide for 15 minutes, and the bucket's key "signup:process" was
> mintable from the client-suppliable per-IP keyspace (an XFF of
> "process" made both calls share one bucket); the cure moves the
> ceiling to the CREATION PATH — after parseBody and after the
> existing-email early-return, before the double scrypt — so junk
> bodies and duplicate-email floods consume nothing, only
> fresh-email creation attempts count, and the key leaves the
> colliding namespace; the exact 20/15min form pinned). Plus: the
> limiter's cardinality cap (F-241c — the per-account buckets minted
> unbounded in-memory keys on the unauthenticated routes; a
> fail-closed shared-overflow bucket at a 10k cap), the P2025 arms on
> the auth writers (F-241d — verify/resend/logout's catches answer
> the vanished-row forms instead of the generic 500), the expenses
> popover's focus return (F-241e — the drawer's own cleanup pattern:
> focus that died to body on the unmount lands back on the trigger),
> and the FORM-INPUT-family seam completion (F-241f — the
> dialog-textarea genus re-grown as a byte-identical two-site paste
> re-enters as FORM_TEXTAREA WITH its consumers, the F-229f rule; the
> settings inline input joins FORM_INPUT as a w-auto/flex-1
> appendage; the icon-bearing search input registered as the
> deliberate single-site genus). Registered, not cured: the CSP
> default-src headroom (F-241g — the five pinned directives leave
> img-src/connect-src unrestricted; needs a source inventory), the
> seeded demo credentials posture (F-241h — documented, deliberate,
> the README carries the demo login). §5 carries the execution
> history.)
>
"""

old_current_marker = "> **Current version: v2.37.0** (session 240"
assert src.count(old_current_marker) == 1, "v2.37.0 current-version anchor"
src = src.replace(old_current_marker, HEADER_NEW + "> **Previous version: v2.37.0** (session 240", 1)

LEDGER_ROWS = """\
| F-241a | Medium | **The R-37 live-user re-key removed the session-ERA dimension — four 401 interleavings the entry-token check used to cover (or that predate it), one root cause.** User-standing cannot distinguish "no deliberate clear owns the face" (wall) from "a deliberate clear happened and a NEW session now owns the face" (discard): (1) THE CROSS-ERA LEG — a fetch issued under user A whose 401 lands after A logged out and user B signed in and hydrated finds `get().user !== null` (B stands) → the wall fires and wipes B's live session face; the askCoach docblock still CLAIMS the old guarantee ("a coach answer landing after a logout → different-user sign-in must never clear the NEW session") and its captured `token` is now dead — the fingerprint of the removed guard; (2) THE MID-LOGOUT LEG — logout bumps the token then awaits its POST before clearing; a mutation/settings/coach 401 landing inside that window finds the user still standing → the wall fires → logout's `token !== sessionWriteToken` guard aborts the clear → `logout()` returns false with no error banner despite the server logout SUCCEEDING (the F-224e honest-sign-out contract inverted); (3) THE FIRST-LOAD TWIN LEG — two concurrent first-load hydrates (the Try-again button has no busy guard; StrictMode double-mounts in dev): the twin's entry bump stales H1's token while the user is still null, so H1's genuine 401 fails BOTH disjuncts (`user !== null` false, fresh-token false) → skipped; H2's pre-revocation 200 then commits the revoked user's ledger with a fresh token — the F-240a threat model re-entering through the first-load edge; (4) THE ERROR-FACE LEG — on the first-load error face (non-401 hydrate failure: user null, error set, children rendered), a dead session's 401 via Refresh or a quick-add mutation finds user-null → arm skips → only a toast fires over the stale banner; pre-R-37 refreshAll's arm walled this leg (verified in the 86ebe0a diff). The uniform cure: a module-level CLEAR-ERA counter bumped by `commitRevocationWall` and at LOGOUT'S ENTRY (the moment the clear intent is declared — this alone cures leg 2, the mid-logout 401 becomes era-stale and logout completes); hydrate's entry bump (the F-240a staleness source) deliberately does NOT bump it. Every 401 arm captures the era at entry and walls iff the era is UNCHANGED — an era match means no wall/logout intervened since the fetch was issued (the 401 is live for the current face-owner → wall); a mismatch means the 401 belongs to the pre-clear session → discard (the wall/logout already owns the face — the idempotent skip). The fresh-token disjunct retires (subsumed: first-load 401s wall by era-match). The F-217l logout contract, the F-240a hydrate-bump requirement, the wall idempotence, and all R-37 behavioral observables verified preserved leg-by-leg. | `src/stores/wealthos-store.ts:219-221` (refreshAll arm), `:264` (mutate), `:322-323` (hydrate dashboard arm + the retiring disjunct), `:353` (settings tail), `:380-403` (logout), `:531` (updateSettings), `:539-551` (askCoach — the stale docblock + dead capture); `src/components/layout/app-shell.tsx:136-139` (the unguarded Try-again) | **cured in R-38** (the clear-era counter + the six re-keyed arms + the four behavioral legs + the Try-again busy guard as belt-and-suspenders) |
| F-241b | Medium | **The R-37 signup process ceiling counts every attempt that reaches the handler — a single client can block all signups app-wide — and its key is mintable from the client-controlled per-IP keyspace.** The global `rateLimit("signup:process", 20, 15min)` call runs BEFORE the per-IP denial return and BEFORE parseBody, and `rateLimit()` increments on every call: one IP's requests 1-10 pass per-IP (global count 10), requests 11-20 are per-IP-DENIED but already incremented the global bucket (count 20) — request 21 from ANY IP answers 429 worldwide for up to 15 minutes; junk bodies (non-JSON, invalid payloads) count identically (they reach the global call before parseBody), so the "2x the e2e ten-signup budget" sizing undercounts real-world attempts and an availability bound inverts into an availability kill-switch (~1.3 req/min sustains the saturation indefinitely). The key collision: the per-IP key is `signup:${clientKey(req)}` and clientKey at the default depth returns the client-suppliable last XFF hop verbatim — `X-Forwarded-For: process` mints the per-IP key `signup:process`, EXACTLY the global bucket's key: each such request increments the shared bucket twice (~11 requests to saturate). The cure: the ceiling moves to the CREATION PATH — after parseBody and after the existing-email early-return, before the double scrypt — so only fresh-email valid-shaped creation attempts consume global capacity (junk, duplicates, and per-IP-denied requests consume nothing; the attacker's saturation vector now requires 20 real row creations the ceiling itself bounds); the key leaves the colliding namespace (`signup-process-ceiling` — no colon, unreachable from the `signup:<hop>` keyspace); the exact 20 / 15*60*1000 form pinned (the R-37 pin asserted only ≥20 with no window pin — a 20/1min regression passed green). | `src/app/api/auth/signup/route.ts:29-51` (the ordering), `:38` (the key); `src/lib/rate-limit.ts:45-59` (increment-on-every-call), `:85-91` (clientKey); `tests/parity-240.test.ts:182-184` (the weak pin) | **cured in R-38** (the creation-path placement + the collision-free key + the exact-form pin) |
| F-241c | Low | **The per-account rate-limit buckets mint unbounded in-memory keys on the unauthenticated routes; `NEO_PROXY_HOPS=0` does not close it.** The secondary per-email buckets (login-acct, verify-acct, resend-acct, forgot-acct) are keyed on caller-supplied strings on public routes, and the in-process `buckets` Map has no cardinality cap: every fresh email string mints a `{count, resetAt}` entry that persists for the 15-minute window (the sweep bounds entry LIFETIME, never entry COUNT within a window). A sustained random-email flood holds ~R×900 live entries at 15 min regardless of proxy depth — memory-amplification DoS on the single-process self-hosted posture (~5k req/s for 15 min ≈ 4-5M entries ≈ 0.5-1.5 GB). The cure: a MAX_BUCKETS cap (10_000 — far above legit single-node scale) with fail-closed overflow routing — a NEW key arriving at cap joins a shared overflow bucket whose count the caller's own limit bounds (conservative per-route; the flood's keys churn in overflow while EXISTING keys — the legit traffic already admitted — keep their own buckets and count normally); the cap check rides the rateLimit insertion path (O(1); no eviction scan to abuse). | `src/lib/rate-limit.ts:26` (the uncapped Map), `:45-59` (the insertion path); `src/app/api/auth/{login,verify,resend,forgot-password}/route.ts` (the four per-email key families) | **cured in R-38** (the cap + the shared overflow bucket + the cardinality battery) |
| F-241d | Low | **The auth-family user-table writers lack the P2025/`isRecordNotFound` arm the rest of the layer carries.** The `db.user.update` calls in verify (attempt-increment + code-clear), resend (code re-arm), and logout (tokenVersion eviction) surface the generic 500 when the row vanishes mid-request — the layer's own established answers are users PATCH → 401 and the CRUD families → 404; the F-222o doctrine ("vanished row is NOT_FOUND/401, never INTERNAL") is not applied at exactly these three seams (no user-delete API exists today — the row can only vanish out-of-band; error-vocabulary uniformity drift, not a reachable vulnerability). The cure: verify/resend's catches answer the no-enumeration invalid-code 400 the miss arm already answers (a vanished row IS a miss); logout's catch clears the cookie and answers ok — the session cannot survive its user row, so the logout completes (the guest-logout no-op 200 form). | `src/app/api/auth/verify/route.ts:129-138` (catch `:154-163`), `src/app/api/auth/resend/route.ts:79-86` (catch `:108-116`), `src/app/api/auth/logout/route.ts:57-60` (catch `:62-71`) | **cured in R-38** (the three isRecordNotFound arms, mirroring the family's own forms) |
| F-241e | Low | **The expenses filters popover never restores focus on close — every interior-focus close path lands on `<body>`.** The ✕ click/Enter, the Escape close, and the scroll-close (F-238f) all unmount the focused control (the ✕ button or the Category Select trigger) with no focus return: a keyboard user's next Tab restarts from the document top instead of the Filters trigger — below the repo's own transient-surface doctrine (the drawer restores focus, the login view-swap lands on the heading, the expense dialog step-swap moves focus). The cure: the drawer's own cleanup pattern — the open-effect's cleanup runs after the DOM commit removed the popover, so focus that died to `<body>` is detectable exactly there: when `document.activeElement === document.body`, land focus back on the trigger; the toggle path (focus already on the trigger) and the outside-pointerdown path (focus elsewhere) are naturally spared. | `src/app/(app)/expenses/page.tsx:107-144` (the effect + cleanup), `:324-331` (the ✕); contrast `src/components/layout/mobile-nav.tsx:88-98` (the drawer's return) | **cured in R-38** (the cleanup focus-return + the expenses-popover focus leg) |
| F-241f | Low | **The FORM-INPUT-family seam is incomplete: the dialog-textarea genus re-grew as a byte-identical two-site paste, and the settings inline input is a one-utility variant of FORM_INPUT.** The expenses notes textarea (`:690`) and the income notes textarea (`:370`) carry the byte-identical 15-utility string — the F-232h divergence-point genus, textarea edition (a DIALOG_TEXTAREA constant was retired at session-232 under the F-229f zero-consumer rule, then re-grew as a paste — the F-240d story again); the settings budget-category inline input (`:247`) is FORM_INPUT with exactly `w-full` swapped for `flex-1` (a future FORM_INPUT edit silently misses it). The cure: FORM_TEXTAREA re-enters page-layout WITH its two consumers (the F-229f re-entry rule — the constant ships WITH its consumers; byte-identical values, no appendages needed); the settings input joins as `cn(FORM_INPUT, "w-auto flex-1")` — the appendage form the F-240d round established (investments mono-caps, budget sm:w-32), `w-auto` overriding `w-full` in the twMerge width group with `flex-1` governing the flex row (computed-identical, capture-verified); the icon-bearing search input (`expenses:296`, asymmetric pl-9/pr-3 + the placeholder arms) stays a literal — REGISTERED as the deliberate single-site genus (nothing to diverge from; the R-37 round's own "separate genera" call, now documented in the seam's docblock). | `src/lib/page-layout.ts:346` (FORM_INPUT; FORM_TEXTAREA lands beside it), `src/app/(app)/expenses/page.tsx:690`, `src/app/(app)/income/page.tsx:370`, `src/app/(app)/settings/page.tsx:247`, `:296` (the registered search genus) | **cured in R-38** (the FORM_TEXTAREA re-entry + the settings appendage + the scanner extension + the docblock registration) |
| F-241g | Informational | **The R-37 pins' residual looseness (the audit's test-hygiene riders).** (1) parity-240's F-240b leg carried a no-op assertion — `tail.slice(tail.indexOf("settingsSettled: true"))` with `indexOf` −1 yields `slice(−1)` = the last character (length 1 > 0), so `expect(settledArm.length).toBeGreaterThan(0)` could never fail independently (the follow-up `toBeGreaterThan(-1)` carried the leg); (2) the F-240c ceiling pin asserted only `≥ 20` with the 15-minute window unpinned — cured with F-241b's exact-form pin; (3) the F-240e docblock pin anchored on `/gap/i` — any gap mention passed; now anchored on the actual construction phrase; (4) the bare-literal scan is prefix-only (inherent to paste-detection, documented). | `tests/parity-240.test.ts:159-161` (the no-op), `:182-184` (the weak ceiling pin), `:254-255` (the weak anchor) | **cured in R-38** (the no-op repaired, the exact pins ride F-241b, the anchor tightened) |
| F-241h | Informational | **The CSP omits `default-src` (and img-src/connect-src/style-src) — five directives pinned, the rest unrestricted.** The shipped set (frame-ancestors, script-src, object-src, base-uri, form-action) is deliberate and documented; the app's actual consumption is self-only fetches and self/data images, so a `default-src 'self'` + `style-src 'self' 'unsafe-inline'` form would tighten the exfil/beacon surface without functional loss — but it needs a source inventory (PWA icons, route surfaces, dev branches) to land safely. | `next.config.ts:130-135` | recorded (the hardening headroom; land with a source inventory the next time the config is touched) |
| F-241i | Informational | **The seeded demo account carries source-visible credentials (the documented posture).** `bun run db:seed` upserts the demo account whose credentials print in the seed header — the deliberate mirrors-the-reference demo posture; any deployment that seeds AND exposes the origin carries a publicly-known-credential foothold (role "user", demo data only). | `prisma/seed.ts:5,42,67-72` | recorded (a boot-time or README warning, or a SEED_DEMO_PASSWORD override, if an exposed deployment posture ever lands) |

"""

ledger_anchor = "## 3. The remediation program (R-items)"
assert src.count(ledger_anchor) == 1, "ledger section anchor"
src = src.replace(ledger_anchor, LEDGER_ROWS + ledger_anchor, 1)

R38_SECTION = """\
### R-38 — The clear-era, creation-path, and seam-completion round (session 241) — Status: Planned(v2.38.0)

The cure for F-241a/F-241b (the Mediums) + F-241c-f (the Lows) +
F-241g (the pin hardening), each verified at file:line over the
v2.37.0 ship state. TDD throughout: the pins born RED, then the
cures, then the full gate + the six parity drift legs.

1. **R-38.1 — the pins born RED**:
   - `tests/parity-241.test.ts` (the source battery): the clear-era
     counter exists and is bumped by the wall's commit and at logout's
     entry (and NOT by hydrate's entry); every 401 arm keys on the
     era match; the fresh-token disjunct is retired; the askCoach
     docblock names the era contract and the dead token capture is
     gone; the signup ceiling call sits after parseBody and the
     existing-email return and before the scrypt, keyed outside the
     colliding namespace at the exact 20/15min form; the limiter's
     cap + overflow constants and the fail-closed routing; the three
     isRecordNotFound arms; the popover cleanup's focus return; the
     FORM_TEXTAREA constant with its two byte-identical consumers and
     the settings appendage; the search input's registered-deliberate
     docblock note; the parity-240 no-op repaired.
   - `tests/store-hydrate.test.ts` (the behavioral battery): the four
     F-241a legs born RED against the live-user-keyed tree — the
     cross-era leg (A's late 401 must not wall B), the mid-logout leg
     (the 401 inside logout's POST window must not abort the clear),
     the first-load twin leg (H1's 401 + H2's pre-revocation 200 →
     the wall face, the 200 discarded), the error-face leg (a dead
     session's Refresh 401 walls over the stale banner).
   - `tests/rate-limit.test.ts` (the cardinality battery): the cap
     routes fresh keys to the shared overflow bucket at capacity;
     existing keys keep their own buckets; the overflow verdict
     applies the caller's limit; the sweep still reclaims.
2. **R-38.2 — the cures**: THE CLEAR-ERA CURE (F-241a — the
   `sessionClearSeq` module counter; `commitRevocationWall` and
   logout's entry bump it; the six 401 arms capture it at entry and
   wall iff unchanged; the fresh-token disjunct retired; the askCoach
   docblock truth; the Try-again busy guard); THE SIGNUP CEILING
   HONESTY (F-241b — the creation-path placement + the
   collision-free key + the exact-form pin); THE LIMITER
   CARDINALITY CAP (F-241c — MAX_BUCKETS + the shared overflow
   bucket, fail-closed); THE P2025 ARMS (F-241d — verify/resend's
   no-enumeration 400, logout's clear-and-complete); THE POPOVER
   FOCUS RETURN (F-241e — the drawer's cleanup pattern); THE SEAM
   COMPLETION (F-241f — FORM_TEXTAREA + the settings appendage + the
   scanner extension + the registered search genus); THE PIN
   HARDENING (F-241g — the no-op repair + the exact pins + the
   anchor).
3. **R-38.3 — the verification**: lint 0/0 · tsc 0 · the full unit
   suite · build · smoke 15/15 · 147 e2e · the six parity drift
   gates (the standing allowances — the round's surfaces are
   store-internal, server-side, or computed-identical by
   construction; the settings appendage and the textarea seam
   capture-verified) · census MATCH · `bun audit` re-triage · the
   captures set (the standing operator asks: the mobile drawer +
   this round's cured surfaces) · the docs lockstep
   (README/AGENTS/CLAUDE/PAD/SKILL/this plan/worklog/the session
   record) in the same commit.

"""

r38_anchor = "### R-37 — The revocation-signal, signup-ceiling, and form-seam round (session 240) — Status: Done(v2.37.0)"
assert src.count(r38_anchor) == 1, "R-37 section anchor"
src = src.replace(r38_anchor, R38_SECTION + r38_anchor, 1)

S5_ROW = """\
| v2.38.0 | 241 | **R-38** (the clear-era, creation-path, and seam-completion round — findings-led, the standing directive with the reference STABLE on all standing drift layers and the TRUE-390 mobile menu re-verified by probe:ref; the cold baseline GREEN at HEAD 71a4d9f — the v2.37.0 ship state reproduced exactly, no discovery). The audit round first: the standing layers re-verified (probe:ref STABLE; `bun audit` unchanged; neo-crm unchanged (b3d0fbe); the SEO surface green (smoke leg 12); the .env contract, the vitest/playwright configs, the .env.example standing). The session-241 fresh-eyes audit (three Mode-C passes: the R-37 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 0 High / 2 Medium / 7 Low / 4 Informational raw after dedup, every material claim re-verified at file:line by the driving session; the R-37 cures verified holding across all six surfaces). The plan v2.38.0 written (the F-241a-i ledger + the R-38 section) and validated against the tree. **R-38.1** the pins born RED → **R-38.2** the cures (THE CLEAR-ERA CURE — the era counter + the six re-keyed arms + the four behavioral legs; THE SIGNUP CEILING HONESTY — the creation-path placement + the collision-free key; THE LIMITER CARDINALITY CAP; THE P2025 ARMS; THE POPOVER FOCUS RETURN; THE SEAM COMPLETION; THE PIN HARDENING) → **R-38.3** the verification (the full gate + the six drift gates + census + the captures + the docs lockstep) | (this session's execution — filled at ship) | (this session's execution commit) |
"""

s5_anchor = "| v2.37.0 | 240 |"
assert src.count(s5_anchor) == 1, "§5 v2.37.0 row anchor"
src = src.replace(s5_anchor, S5_ROW + s5_anchor, 1)

TAIL_OLD = """\
> wall-token round (R-36) at v2.36.0, and the session-240
> revocation-signal round (R-37) at v2.37.0"""
TAIL_NEW = """\
> wall-token round (R-36) at v2.36.0, the session-240
> revocation-signal round (R-37) at v2.37.0, and the session-241
> clear-era round (R-38) at v2.38.0"""
assert src.count(TAIL_OLD) == 1, "tail-note anchor"
src = src.replace(TAIL_OLD, TAIL_NEW, 1)

PLAN.write_text(src)

# post-write verification
out = PLAN.read_text()
for marker in [
    "Current version: v2.38.0",
    "| F-241a | Medium |",
    "| F-241i | Informational |",
    "### R-38 — The clear-era, creation-path, and seam-completion round (session 241) — Status: Planned(v2.38.0)",
    "| v2.38.0 | 241 |",
    "clear-era round (R-38) at v2.38.0",
]:
    assert marker in out, f"post-write verification failed: {marker}"
assert out.count("Previous version: v2.37.0") == 1
assert out.count("Current version: v2.38.0") == 1
print("plan v2.38.0 written and verified: header + 9 ledger rows + R-38 section + §5 row + tail note")
