#!/usr/bin/env python3
"""Session-244 (R-41) plan writer — the v2.41.0 ledger insertion.

House convention (assert-each-insertion, the F-242j lesson): every
replacement is scoped to a SLICED anchor and asserts the OLD form exactly
once inside the slice before writing. Idempotent: a second run finds the
new form and skips.
"""

import sys
from pathlib import Path

PLAN = Path(__file__).resolve().parent.parent / "docs" / "remediation_plan_v2.md"
src = PLAN.read_text(encoding="utf-8")
changes = 0

# ---------------------------------------------------------------------------
# 1. The header: the new current-version paragraph; v2.40.0 demoted to
#    "Previous version".
# ---------------------------------------------------------------------------
if "> **Current version: v2.41.0**" not in src:
    old_head = "> **Current version: v2.40.0** (session 243"
    assert src.count(old_head) == 1, "v2.40.0 current-version head not found once"
    src = src.replace(old_head, "> **Previous version: v2.40.0** (session 243", 1)
    new_current = """> **Current version: v2.41.0** (session 244 — the guard-advance,
> upload-sniff, and select-seam round R-41: the owner's standing
> directive — refresh → review → validate → audit → parity iteration →
> remediation plan → TDD execution → captures → docs lockstep →
> commit → push, with the reference STABLE on all standing drift
> layers and the TRUE-390 mobile menu re-verified by probe:ref this
> session; the cold-baseline gate GREEN at HEAD b5e1be6 — no
> discovery this round, the v2.40.0 ship state reproduced exactly:
> lint 0/0 · tsc 0 · 1552/1552 unit (93 files) · build · smoke 15/15
> · 150/150 e2e · census MATCH). The session-244 fresh-eyes audit
> (three Mode-C passes: the R-40 cure surfaces driven by the session,
> the API/auth/security layer, and the UI/a11y/shell layer — 0
> Critical / 0 High / 0 Medium / 5 Low / 9 Informational NEW after
> dedup, every material claim re-verified at file:line by the
> driving session; all eight R-40 cure surfaces verified holding —
> the logout burn after the session read inside the sessioned arm,
> the docs-counts guard trio, the three OTP docblock truths, the two
> scanner jsx admissions, the import label-in-name, the
> readStoredTheme retirement, the globals prose rewords; the API
> layer clean again — burn-order sweep over all 22 sessioned
> mutating handlers, parse-before-DB, owner-scoping, injection and
> enumeration sweeps all clean; the UI layer clean — the drawer
> mechanics, the v4 scanner discipline (a live compile probe over
> every comment-carried class token: zero dead emissions), the
> theme system, the store era discipline, the a11y contracts all
> holding). The round's flagship: THE UPLOAD MAGIC-BYTE SNIFF
> (F-244b — the POST route's only content gate on stored bytes was
> the multipart part's CLIENT-DECLARED Content-Type; a sessioned
> caller could store arbitrary non-image bytes — polyglots, HTML,
> binaries — under pinned image extensions, and the GET then served
> them with the extension's image content-type on immutable
> 1-year cache: stored-XSS is already closed by the SVG-excluding
> MIME map + nosniff + extension-pinned types, but arbitrary-content
> hosting on the app's own origin under immutable caching is its own
> defect; the cure adds a pure sniffImageMagic(bytes) seam to
> src/lib/uploads.ts and the route now requires the sniffed family
> to match the declared MIME family before writeFile — mismatch
> answers 400). Plus: the F-243b RECURRENCE cure (F-244a — the
> docs-counts guard trio aged out by exactly one block again: the
> v2.40.0 block landed at HEAD carrying the LIVE 1552/93 pair while
> the guard still pins v2.37.0/v2.38.0/v2.39.0; the trio advances to
> v2.38.0/v2.39.0/v2.40.0, green-by-design BEFORE this session's
> own lockstep pass per the F-242j lesson's own rule); the
> SELECT-TRIGGER APPENDAGE CONVERSION (F-244c — the one cn()-wrapped
> template-literal class construction in src/, invisible to the
> F-242e genus guard's className={` scan, now the appendage form
> with the guard widened to flag any backtick arriving inside a
> cn( call); computed-identical by twMerge's merge semantics); the
> OTP DOCBLOCK CONSOLE TRUTH (F-244d — "leaves the console log for
> the operator" understated the knob's effect: the console line
> itself drops to the code-less audit entry); the PARITY-243 PIN
> HARDENING (F-244e — the two comment-satisfiable scanner pins now
> assert the walker REGEX forms; the F-243a order pin gains the
> arm-containment leg the burn-inside-the-if-user-arm cure actually
> shipped); the SESSION-TOKEN TTL BOUND (F-244f — verifySessionToken
> honored any signed exp with no iat-relative bound; a far-future
> exp now nulls); the SIGNIN-ICONS ARIA-HIDDEN RIDER (F-244g); and
> the ROLE-DOCBLOCK TRUTH (F-244h — the role column mints
> "admin"/"rep" at signup but gates nothing; the docblock records
> that role carries no authority today). Registered, not cured:
> the tee'd dev/server logs carrying OTP lines (F-244i), the
> __Host- cookie prefix (F-244j — single-origin posture; the cookie
> name is load-bearing across the smoke ladder), the whole-store
> subscriptions (F-244k), the per-render clocks (F-244l), the
> picked-state label edge (F-244m), the live-utility prose citations
> (F-244n), plus the standing families (F-242h/i, F-240k-n,
> F-239l-s). Gate at ship: lint 0/0 · tsc 0 · unit (93+ files) ·
> build · smoke 15/15 · 150 e2e · the six parity drift gates CLEAN ·
> census MATCH · captures 178-181.)
"""
    marker = "\n\n## 0. Versioning contract"
    assert src.count(marker) == 1, "the versioning-contract heading anchor not found once"
    src = src.replace(marker, "\n" + new_current + marker, 1)
    changes += 1

# ---------------------------------------------------------------------------
# 2. The §2.4 audit ledger (after §2.3's last row, before "## 3.").
# ---------------------------------------------------------------------------
if "### 2.4 Session-244 audit ledger" not in src:
    anchor = "## 3. The remediation program (R-items)"
    assert src.count(anchor) == 1, "the §3 heading anchor not found once"
    ledger = """### 2.4 Session-244 audit ledger (the fresh-eyes round over the v2.40.0 ship state)

Three Mode-C passes (the R-40 cure surfaces · the API/auth/security layer ·
the UI/a11y/shell layer); every material claim re-verified at file:line by
the driving session before planning. NEW findings after dedup (the passes
re-confirmed the documented postures without exception):
0 Critical / 0 High / 0 Medium / 5 Low / 9 Informational.

| ID | Severity | Finding (adjudicated) | Location | Disposition |
|---|---|---|---|---|
| F-244a | Low | **The F-243b recurrence: the docs-counts guard window has aged out by one block — again.** The guard pins the trio v2.37.0/v2.38.0/v2.39.0, but the same session that advanced it also landed the v2.40.0 block at HEAD carrying the NOW-LIVE 1552/93 pair; the doctrine's own line ("the pinned trio is the THREE MOST RECENT revision blocks") is one block behind reality, and the next lockstep replacement targets exactly the 1552/93 the v2.40.0 block's historical line carries — the precise corruption shape the guard exists to intercept. The v2.37.0 pin now guards a count pair two generations stale that no plausible replacement would touch. | `tests/docs-counts.test.ts:180-197`; `Project_Architecture_Document.md:19,62-63` | **cured in R-41** (the trio advances to v2.38.0/v2.39.0/v2.40.0, landed green-by-design BEFORE this session's own lockstep pass per the F-242j lesson's own rule) |
| F-244b | Low | **THE UPLOAD MIME-TRUST GAP.** The upload POST's only content gate on the STORED BYTES is the multipart part's client-declared `Content-Type` (`file.type.startsWith("image/")` + `EXT_BY_MIME[file.type]`); the buffer itself is never inspected. A sessioned caller can store arbitrary non-image bytes (polyglots, HTML, binaries) under a pinned `.jpg/.png/.webp/.gif` extension; the GET then serves them with the EXTENSION's image content-type on immutable 1-year caching. Stored-XSS is already closed by three independent layers (the SVG-excluding MIME map, `X-Content-Type-Options: nosniff` on every response, the extension-pinned content-type that never serves `text/html`) — the residual is arbitrary-content hosting on the app's own origin under immutable caching plus mismatched-type bytes reaching browser image decoders. | `src/app/api/upload/route.ts:103-112`; `src/lib/uploads.ts:93-107` | **cured in R-41** (the pure `sniffImageMagic(bytes)` seam joins `src/lib/uploads.ts`; the route requires the sniffed family to match the declared MIME family before writeFile — mismatch answers 400 with the family named) |
| F-244c | Low | **The one cn()-wrapped template-literal class construction in src/ escapes the F-242e genus guard.** `select.tsx`'s SelectTrigger builds its class string by runtime string interpolation — `` cn(`${SELECT_TRIGGER.base} ${…} ${…} disabled:cursor-not-allowed …`, className) `` — the only `cn(` + backtick site in src/ (grep-verified). The F-242e doctrine ("join through cn(), never string interpolation") is honored at both login-card sites while this vendored primitive rides the interpolated form; the genus guard scans only for the literal `className={` prefix, so a backtick arriving after `cn(` is invisible to it. All constituent classes DO emit today (the interpolated parts are static literals in page-layout.ts, itself content-scanned) — zero current visual impact; the defect is the doctrine/guard gap: a future edit making any interpolated part dynamic silently drops CSS with no failing test. | `src/components/ui/select.tsx:44-47`; `tests/parity-242.test.ts:97-104` | **cured in R-41** (the appendage form `cn(SELECT_TRIGGER.base, SELECT_TRIGGER.placeholderState, SELECT_TRIGGER.focusRing, "disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className)` — twMerge-identical output; the parity-242 genus guard widens to flag any backtick arriving inside a `cn(` call) |
| F-244d | Low | **The signup/resend docblocks understate the knob's console-side effect.** "setting it nulls the response copy and leaves the console log for the operator" (signup) and "(NEO_DISABLE_IN_APP_OTP nulls the response copy; …)" (resend) — with the knob SET, the console line itself drops to the code-less audit entry (`verification code issued for … (delivery delegated to the mail transport)`). The phrasing invites the misreading that the OTP stays console-recoverable in production-knob mode — it does not; the precise truth lives 40 lines below in the F-216g branch. | `src/app/api/auth/signup/route.ts:99-100`; `src/app/api/auth/resend/route.ts:19` | **cured in R-41** (both reworded: "nulls the response copy and drops the console line to a code-less audit entry") |
| F-244e | Low | **Two parity-243 legs are weaker than the cures they claim.** (a) The F-243d scanner pins assert `toContain("jsx")` over the sliced walker — satisfiable by the Session-243 comment inside each walker ("jsx joins the filter") even after a regex revert; the pin proves prose, not the filter form. (b) The F-243a pin asserts `burnAt > readAt` only — a burn relocated after the session read but OUTSIDE the `if (user)` arm (re-opening the guest-burn poisoning) passes all three legs; the describe text says "inside the sessioned arm" but no assertion pins the arm. | `tests/parity-243.test.ts:45-59,130-148` | **cured in R-41** (the scanner pins assert the walker regex forms `(ts|tsx|jsx|css)` / `(tsx?|jsx|css)` character-classes, not prose substrings; the F-243a battery gains the arm-containment leg — the burn between `if (user) {` and the tokenVersion update, with no `rateLimit(` call outside the sessioned arm) |
| F-244f | Informational | **verifySessionToken honors any signed exp with no TTL bound.** Only `exp < now` is checked; nothing validates `exp ≤ iat + SESSION_TTL_MS`. A token with a far-future exp would be honored for that duration. Unforgeable without AUTH_SECRET (which fail-fasts in production) — defense-in-depth: a future signer bug (a millisecond-vs-second unit slip) would not be caught by the verifier. | `src/lib/auth.ts:96-121` | **cured in R-41** (the span guard: exp − (iat ?? 0) beyond SESSION_TTL_MS + 60s slack nulls the token) |
| F-244g | Informational | **The signin view's Mail/Lock icons omit the explicit aria-hidden their sibling views carry.** The reset/signup/verify/sent views carry `aria-hidden="true"` on the same icon genus; inert today by the lucide-react library's own auto-injection, but attribute-consistency with the four siblings is the family's documented form. | `src/components/layout/login-card.tsx:776,795` | **cured in R-41** (the explicit riders, matching the sibling views) |
| F-244h | Informational | **The role column is minted at signup but gates nothing — no docblock records that.** `role: count === 0 ? "admin" : "rep"` on open signup makes a fresh install's FIRST visitor the admin, while zero routes read the field for a decision (display metadata only). Latent hazard: a future contributor adding a role-gated route silently inherits "first signup = admin" as the trust model. | `src/app/api/auth/signup/route.ts:112`; grep: no `role ===` gate in src/app/api | **cured in R-41** (the docblock truth at the mint site: role carries NO authority today and must not be used for authz without a provisioning design) |
| F-244i | Informational | **The tee'd dev/start scripts persist the OTP console lines to disk.** `"dev": "… | tee dev.log"` and `"start": "… | tee server.log"` convert the documented ephemeral console emission into on-disk files outliving the code's 15-minute TTL (gitignored; readable by anything with filesystem access). An operator-posture extension of the documented ADR-014 delivery, not a code defect in the seam. | `package.json:7,9` | recorded (operator posture; filter the `[verification]` lines from the tee'd stream if a multi-operator host ever ships) |
| F-244j | Informational | **The session cookie lacks the `__Host-` prefix.** `neo_session` is httpOnly/sameSite=lax/secure(prod)/path=/ — good, but unprefixed; `__Host-` would additionally forbid a Domain attribute and non-`/` paths by construction. Minimal on the single-origin self-hosted posture; the name is load-bearing across the smoke ladder (grepped by name) and the e2e storageState. | `src/lib/auth.ts:125-134` | recorded (deployment-shape decision; a rename is a coordinated smoke+e2e+pin round if ever shipped) |
| F-244k | Informational | **Whole-store useWealthOs() subscriptions re-render entire page trees.** All nine section pages + their dialogs call the no-selector form (17 sites); every set() re-renders the full page. Performance-only (pages consume most slices; atomic selectors everywhere derived state matters; zero useShallow violations — nothing derives). | `src/app/(app)/*/page.tsx` (representative: dashboard:70) | recorded (revisit only if profiling flags churn) |
| F-244l | Informational | **Per-render `new Date()` in three pages (the dashboard's render-stabilized idiom not mirrored).** expenses/goals/analytics mint a fresh clock each render feeding unmemoized derivations; hydration-safe by construction under the AppShell loading gate (the F-239c/F-242g doctrine) — churn-only, plus a theoretical month-boundary categorization shift if a render straddles midnight mid-session. | `src/app/(app)/expenses/page.tsx:77`; `goals/page.tsx:41`; `analytics/page.tsx:65` | recorded (the dashboard's `useState(() => new Date())` idiom if ever swept) |
| F-244m | Informational | **The import dropzone's picked-state visible label is not in the static aria-label.** With a file selected the visible `<p>` shows the filename; the static aria-label carries only the empty-state phrase. The F-243e cure's scope (the empty state — the upload interaction) holds; this is the dynamic-label edge. | `src/app/(app)/import/page.tsx:210,221` | recorded (mirror the filename into the aria-label when `file` is set, if a round touches the dropzone) |
| F-244n | Informational | **Live-utility plain-prose citations remain in the cured globals block.** `bg-white` (:362) and `dark:bg-[#0e1310]` (:343/:359) in prose inside the comment block F-243g cured — both LIVE utilities (button.tsx, login-card.tsx, page-layout.ts consumers), so they pass the parity-229 live-token invariant; a maximal token-form discipline would reword. | `src/app/globals.css:343,359,362` | recorded (live tokens — the invariant holds by construction) |

"""
    src = src.replace(anchor, ledger + anchor, 1)
    changes += 1

# ---------------------------------------------------------------------------
# 3. The R-41 section (before R-40, reverse-chronological order).
# ---------------------------------------------------------------------------
if "### R-41 — " not in src:
    anchor = "### R-40 — The logout-bucket, guard-advance, and label-truth round (session 243) — Status: Done(v2.40.0)"
    assert src.count(anchor) == 1, "the R-40 heading anchor not found once"
    r41 = """### R-41 — The guard-advance, upload-sniff, and select-seam round (session 244) — Status: In progress (v2.41.0)

The session-244 findings-led round over the v2.40.0 ship state. Eight
cures (F-244a-h), six registrations (F-244i-n).

1. **R-41.1 — the pins born RED**: tests/parity-244.test.ts (the source
   battery: the sniff seam's export + the route's family-match gate; the
   select appendage form + the parity-242 widened genus guard; the two
   OTP docblock truths; the two parity-243 pin-strength hardenings —
   the walker regex forms + the arm-containment leg; the TTL-bound span
   guard; the signin aria-hidden riders; the role docblock) +
   tests/upload-sniff.test.ts (the pure-seam behavioral battery:
   JPEG/PNG/GIF/WEBP positives, mismatched-family and truncated-buffer
   negatives, empty-buffer nulls) + the auth TTL-bound behavioral legs
   (a far-future exp nulls; the minted form honors) + the docs-counts
   guard advance (green-by-design — the v2.40.0 block exists at its
   ship counts; landed BEFORE this session's own lockstep pass per the
   F-242j lesson's own rule).
2. **R-41.2 — the cures**: THE UPLOAD MAGIC-BYTE SNIFF (F-244b — the
   pure seam + the route gate, family mismatch answers 400); THE
   F-243B RECURRENCE GUARD ADVANCE (F-244a — the trio
   v2.38.0/v2.39.0/v2.40.0); THE SELECT-TRIGGER APPENDAGE CONVERSION +
   THE WIDENED GENUS GUARD (F-244c — computed-identical by twMerge,
   proven by a live compile probe); THE OTP DOCBLOCK CONSOLE TRUTHS
   (F-244d); THE PARITY-243 PIN HARDENING (F-244e); THE SESSION-TOKEN
   TTL BOUND (F-244f); THE SIGNIN-ICONS ARIA-HIDDEN RIDERS (F-244g);
   THE ROLE-DOCBLOCK TRUTH (F-244h).
3. **R-41.3 — the verification**: the full gate (lint 0/0 · tsc 0 ·
   unit · build · smoke 15/15 · 150 e2e) · the six parity drift gates
   CLEAN (the round's surfaces are a server-side 400 on invalid bytes,
   a computed-identical class-string join, docblocks, pins, an
   attribute-only rider, and a server-side span guard — the login
   aria-hidden riders add attributes to two inert icons, census-neutral
   by construction) · census MATCH · `bun audit` unchanged · the
   captures **178-181** (the own-database F-225e convention + the
   census tripwire MATCH): the mobile drawer at 390 (the standing
   ask — 9 destinations + Sign Out asserted), the Select listbox open
   face (the appendage conversion's computed-identical proof), the
   login signin view (the aria-hidden riders), and THE POLYGLOT UPLOAD
   CANARY (the flagship's live proof: a sessioned POST carrying
   image-declared PNG headers with non-PNG bytes answers 400 — the
   sniff gate fires — and a valid PNG still lands 200 with the
   capability URL).

"""
    src = src.replace(anchor, r41 + anchor, 1)
    changes += 1

# ---------------------------------------------------------------------------
# 4. The §5 execution-history row (filled at ship time; the plan-time row
#    carries the "(this session's execution commit)" placeholder).
# ---------------------------------------------------------------------------
if "| v2.41.0 | 244 |" not in src:
    anchor = "| v2.40.0 | 243 |"
    assert src.count(anchor) == 1, "the v2.40.0 execution-row anchor not found once"
    row = """| v2.41.0 | 244 | **R-41** (the guard-advance, upload-sniff, and select-seam round — findings-led, the standing directive with the reference STABLE on all standing drift layers and the TRUE-390 mobile menu re-verified by probe:ref; the cold baseline GREEN at HEAD b5e1be6 — the v2.40.0 ship state reproduced exactly, no discovery). The audit round first: the standing layers re-verified (probe:ref STABLE — bundle md5 6d3779af… unchanged, demo data zero, desktop nav 256/9, the TRUE-390 menu 9 destinations; `bun audit` unchanged — 1 moderate dev-chain minimatch, the documented deferral; neo-crm unchanged (b3d0fbe) — nothing to port; the SEO surface verified on the artifact (smoke leg 12: sitemap + robots + manifest 200); the .env DATABASE_URL="file:../db/custom.db" contract + the db/ at the repo root + the vitest/playwright configs + the .env.example six-knob set all standing). The session-244 fresh-eyes audit (three Mode-C passes: the R-40 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 0 High / 0 Medium / 5 Low / 9 Informational NEW after dedup, every material claim re-verified at file:line by the driving session; all eight R-40 cure surfaces verified holding). The plan v2.41.0 written (the F-244a-n ledger + the R-41 section) and validated against the tree. **R-41.1** the pins born RED → **R-41.2** the cures (THE UPLOAD MAGIC-BYTE SNIFF — the pure seam + the family-match gate; THE F-243B RECURRENCE GUARD ADVANCE; THE SELECT-TRIGGER APPENDAGE CONVERSION + THE WIDENED GENUS GUARD; THE OTP DOCBLOCK CONSOLE TRUTHS; THE PARITY-243 PIN HARDENING; THE SESSION-TOKEN TTL BOUND; THE SIGNIN-ICONS ARIA-HIDDEN RIDERS; THE ROLE-DOCBLOCK TRUTH) → **R-41.3** the verification (the full gate + the six drift gates CLEAN + census MATCH + the captures 178-181 incl. the polyglot upload canary + the docs lockstep) | (filled at ship) | (this session's execution commit) |
"""
    src = src.replace(anchor, row + anchor, 1)
    changes += 1

PLAN.write_text(src, encoding="utf-8")
print(f"docs-244.py: {changes} insertion(s) applied (idempotent skips counted as 0)")
sys.exit(0)
