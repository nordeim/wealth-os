#!/usr/bin/env python3
"""Session-245 (R-42) plan writer — the v2.42.0 ledger insertion.

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
# 1. The header: the new current-version paragraph; v2.41.0 demoted to
#    "Previous version".
# ---------------------------------------------------------------------------
if "> **Current version: v2.42.0**" not in src:
    old_head = "> **Current version: v2.41.0** (session 244"
    assert src.count(old_head) == 1, "v2.41.0 current-version head not found once"
    src = src.replace(old_head, "> **Previous version: v2.41.0** (session 244", 1)
    new_current = """> **Current version: v2.42.0** (session 245 — the gate-order,
> bare-carrier, and lockstep-truth round R-42: the owner's standing
> directive — refresh → review → validate → audit → parity iteration →
> remediation plan → TDD execution → captures → docs lockstep →
> commit → push, with the reference STABLE on all standing drift
> layers and the TRUE-390 mobile menu re-verified by probe:ref this
> session; the cold-baseline gate GREEN at HEAD 30a261d — no
> discovery this round, the v2.41.0 ship state reproduced exactly:
> lint 0/0 · tsc 0 · 1581/1581 unit (95 files) · build · smoke 15/15
> · 150/150 e2e · census MATCH). The session-245 fresh-eyes audit
> (three Mode-C passes: the R-41 cure surfaces driven by the session,
> the API/auth/security layer, and the UI/a11y/shell layer — 0
> Critical / 0 High / 0 Medium / 6 Low / 2 Informational NEW after
> dedup, every material claim re-verified at file:line by the
> driving session; seven of eight R-41 cure surfaces verified
> holding — the eighth, the guard advance itself, aged out by one
> block inside its own ship commit, the F-243b/F-244a genus's third
> recurrence; the API layer clean on every dimension but the
> burn-ordering sweep, which found the public family burning its
> per-IP buckets BEFORE the CSRF content-type gate; the UI layer
> clean on shell/theme/state/pages/metadata/a11y, with the
> emission-verified dead-carrier census expanded from the audit's
> three words to six — bare utilities with no hyphen or colon are
> invisible to the parity-229 class-shape heuristic by construction).
> The round's flagship: THE PUBLIC-FAMILY GATE-ORDER CURE (F-245a —
> the six public auth routes burned the per-IP bucket before the
> content-type CSRF gate inside parseBody, so a cross-site
> plain-text volley — the exact F-234g technique the logout cure
> documents — burned the VICTIM's own IP budget at zero attacker
> cost and 429'd every real login for a renewable 15-minute window;
> the shared requireJsonContentType seam joins src/lib/api.ts, the
> six routes gate first and burn after, and the uploads GET moves
> its name-regex 404 ahead of its 240/15 burn — the F-243a doctrine
> ("burn on the path that carries the cost") extended to the public
> family; every brute-force bound preserved: a guesser can trivially
> carry the JSON content-type, a cross-site form volley cannot).
> Plus: THE GUARD-TRIO ADVANCE (F-245b — v2.39.0/v2.40.0/v2.41.0,
> green-by-design before this session's own lockstep pass, the
> F-244a lesson's own rule); THE PAD HIERARCHY TRUTH (F-245c — the
> file-hierarchy line said 93 suites against 95 reality, unwatched
> by any pin; corrected plus the new docs-counts leg so the leg
> never drops again); THE §7.1 FAMILY-ROW COMPLETION (F-245d — the
> arch-pins row lagged two rounds at 62 with parity-243/parity-244
> unlisted and upload-sniff in no row, sub-rows summing 92 against
> the pinned Unit row 95; the rows complete with the arithmetic leg
> added); THE SIX BARE-CARRIER RETIREMENTS (F-245e — antialiased,
> flow-root, lowercase, inline, invisible, and grow: forty-six
> comment sites reworded per the F-229d discipline, the parity-229
> invariant gains the BARE_UTILITY_WORDS leg so the bare-word genus
> can never ship silently again, and the before/after build probe
> proves all six rules vanish from the stylesheet); and THE HEALTH
> DOCBLOCK TRUTH (F-245f — auth/me joins the documented exception
> enumeration). Registered, not cured: the scrypt cost parameters
> (F-245g — Node defaults vs the OWASP floor, hardening headroom),
> the uploads GET octet-stream fallback (F-245h — defensive dead
> code, kept deliberately), plus the standing families (F-244i-n,
> F-242h/i, F-240k-n, F-239l-s). Gate at ship: lint 0/0 · tsc 0 ·
> unit (95+ files) · build · smoke 15/15 · 150+ e2e · the six parity
> drift gates CLEAN · census MATCH · captures.)
"""
    marker = "\n\n## 0. Versioning contract"
    assert src.count(marker) == 1, "the versioning-contract heading anchor not found once"
    src = src.replace(marker, "\n" + new_current + marker, 1)
    changes += 1

# ---------------------------------------------------------------------------
# 2. The §2.5 audit ledger (after §2.4's last row, before "## 3.").
# ---------------------------------------------------------------------------
if "### 2.5 Session-245 audit ledger" not in src:
    anchor = "## 3. The remediation program (R-items)"
    assert src.count(anchor) == 1, "the §3 heading anchor not found once"
    ledger = """### 2.5 Session-245 audit ledger (the fresh-eyes round over the v2.41.0 ship state)

Three Mode-C passes (the R-41 cure surfaces · the API/auth/security layer ·
the UI/a11y/shell layer); every material claim re-verified at file:line by
the driving session before planning. NEW findings after dedup (the passes
re-confirmed the documented postures without exception):
0 Critical / 0 High / 0 Medium / 6 Low / 2 Informational.

| ID | Severity | Finding (adjudicated) | Location | Disposition |
|---|---|---|---|---|
| F-245a | Low | **THE PUBLIC-FAMILY PRE-GATE BUCKET BURN.** All six public auth routes burn their per-IP bucket BEFORE the CSRF content-type gate (which lives as Layer 1 inside `parseBody`/`readBoundedJson`): login burns at :11 and parses at :22, signup :29/:50, verify :29/:40, resend :23/:33, forgot-password :47/:53, reset-password :35/:43. A cross-site plain-text volley — hidden auto-submitting forms or `mode:"no-cors"` fetches, the exact technique the repo's own F-234g logout cure documents — burns the VICTIM's own IP budget at zero attacker cost: ten embedded posts exhaust the 10/15 login cap and 429 every real sign-in attempt for a renewable 15-minute window (the same genus on signup/verify/resend/forgot/reset, milder). This is precisely the defect class the repo cured for logout (F-234g: "the cross-site burn dies at 400 un-bucketed") and generalized for the writes family (F-243a: "burn on the path that carries the cost the bucket bounds") — the public family was never brought under the doctrine. Sibling surface: the uploads GET burns its 240/15 bucket at :31 before the name-regex 404 at :40 — a 240-image tag volley breaks the victim's uploaded images for the window; the regex check carries no cost and the readFile does. | `src/app/api/auth/login/route.ts:11,22`; signup:29,50; verify:29,40; resend:23,33; forgot-password:47,53; reset-password:35,43; `src/app/api/uploads/[name]/route.ts:31,40` | **cured in R-42** (the shared `requireJsonContentType` seam joins `src/lib/api.ts` — gate-first at all six routes, the per-IP burn moves after the gate; the uploads GET moves its regex 404 ahead of the burn. Every brute-force bound preserved: a credential guesser can trivially set application/json — the gate stops only the cross-site volley, which then dies at 400 un-bucketed) |
| F-245b | Low | **The F-243b/F-244a recurrence, third edition — the guard trio aged out inside R-41's own ship commit.** The guard pins v2.38.0/v2.39.0/v2.40.0 (`tests/docs-counts.test.ts:197-208`) while the PAD's three most recent revision blocks are v2.39.0 (:128), v2.40.0 (:75), v2.41.0 (:19) — session 244 landed the v2.41.0 block carrying the NOW-LIVE 1581/95 pair with no pin watching it, the exact corruption shape the guard exists to intercept (the next lockstep targets 1581/95), and the v2.38.0 pin now guards a pair two generations stale. The F-244a lesson's own line ("the next session's FIRST docs act is the advance") was violated by the session that wrote it. | `tests/docs-counts.test.ts:199,202,208`; `Project_Architecture_Document.md:19,57` | **cured in R-42** (the trio advances to v2.39.0/v2.40.0/v2.41.0, landed green-by-design BEFORE this session's own lockstep pass — the F-244a lesson's own rule, executed first this time) |
| F-245c | Low | **The PAD file-hierarchy line is stale again: 93 suites against 95 reality.** `Project_Architecture_DDocument.md:1871` reads `# 93 unit suites (incl. architecture pins)` while the disk truth and the pinned Unit row (:2160) say 95 — the docs-243 lockstep carried the PAD hierarchy leg, docs-244 dropped it, and no pin watches the site (the docs-counts test pins only the README hierarchy line), so the gate cannot catch the drop. The F-242j genus recurring at the same site a second time. | `Project_Architecture_Document.md:1871` | **cured in R-42** (corrected to 95 + a new docs-counts pin on the PAD hierarchy line so the leg survives future lockstep scripts) |
| F-245d | Low | **The §7.1 test-distribution family rows lagged two rounds again.** The arch-pins row says 62 with parity-243 and parity-244 absent from both count and list (both are source-scanning architecture pins by their own headers and every precedent parity-208…242 listing); upload-sniff belongs to no family row at all; the sub-rows sum 4+62+26=92 against the pinned Unit row 95 — internally inconsistent. Neither session 243's nor 244's lockstep script carried an arch-pins-row leg, and the docs-counts pin pins the exact stale row string — the pin enshrines the rot rather than catching it. The F-242j genus ("the arch-pins row had lagged two rounds") recurring identically. | `Project_Architecture_Document.md:2160-2162`; `tests/docs-counts.test.ts:77-78` | **cured in R-42** (arch-pins advances to 65 with parity-243/244/245 listed; upload-sniff joins the infrastructure family 26→27; the sub-rows sum to the Unit row; the docs-counts pin recalibrated same-commit + the new arithmetic leg (sub-row sum must equal the Unit files count) so the genus fails loudly next time) |
| F-245e | Low | **SIX dead bare-word utility carriers emit rules in the production stylesheet.** Emission-verified against the built CSS: `.antialiased`, `.flow-root`, `.lowercase`, `.inline`, `.invisible`, `.grow` all ship with zero live className consumers — forty-six comment sites carry the bare words as plain English (layout.tsx:90's retirement comment names the retired utility verbatim; select.tsx:33's docblock writes "display flow-root"; "lowercase" across 21 route/CSV comments; "inline" across 15 store/lib/theme comments; "invisible" across 6; "grow" across 2). The whole genus is invisible to the parity-229 invariant by construction: its class-shape heuristic requires a hyphen or colon, and bare single-word utilities (antialiased, flow-root, lowercase, inline, invisible, grow) carry neither — the F-229d dead-carrier retirement's own blind spot. The audit's three-word census expanded to six by the driving session's emission probe. | `src/app/layout.tsx:90`; `src/components/ui/select.tsx:33`; +44 more sites (the F-245e census in the R-42 section) | **cured in R-42** (all 46 carrier sites reworded per the F-229d discipline — describe, never cite; the parity-229 invariant gains the BARE_UTILITY_WORDS leg so a comment-carried bare utility that is not live code fails `bun run test`; the before/after build probe proves all six rules vanish from the stylesheet) |
| F-245f | Informational | **The health route's "only deliberate exception" enumeration is now false.** The F-221t note records health as "the only deliberate exception" among unbucketed public families; `/api/auth/me` is a second (session-optional, no `rateLimit` import in the file). The mitigation is structural — a garbage cookie fails the HMAC in microseconds and never reaches the DB; only a valid signed cookie triggers the `findUnique` — so the unauthenticated-flood concern that justified health's exception does not apply; but the census prose is off by one against its own documentation. | `src/app/api/health/route.ts:9-24`; `src/app/api/auth/me/route.ts` | **cured in R-42** (the health docblock's enumeration extended to record auth/me as the second deliberate exception with its structural mitigation) |
| F-245g | Informational | **scrypt rides the Node default cost parameters (N=16384, r=8, p=1).** `scrypt(password, salt, 64)` without explicit cost options — consistent everywhere (routes, timing equalizers, verification codes, seed), timing-pinned by design (~28 ms, the F-235d availability cure's own arithmetic), and no claim of OWASP-grade parameters is made anywhere; OWASP's current guidance recommends N ≥ 2^17 for new deployments. Hardening headroom only: offline cracking of a leaked hash is ~4x cheaper than the OWASP floor; zero online-attack surface change. | `src/lib/password.ts:27-38` | recorded (a versioned `scrypt2:` format prefix with explicit N=1<<17 + legacy-row verification, if a dedicated hardening round ever opens — the F-216g format-prefix precedent; not urgent for the self-hosted single-node posture) |
| F-245h | Informational | **The uploads GET octet-stream fallback is unreachable code.** `CONTENT_TYPES[ext] ?? "application/octet-stream"` — the name regex pins ext ∈ {jpg,png,webp,gif} and the map covers all four, so the fallback never fires. Defensive dead code (a future regex/mapping divergence would serve octet-stream instead of an invalid undefined header — the safe failure), kept deliberately. | `src/app/api/uploads/[name]/route.ts` (the GET content-type line) | recorded (defensive by intent; delete only alongside a regex/map redesign) |

"""
    src = src.replace(anchor, ledger + anchor, 1)
    changes += 1

# ---------------------------------------------------------------------------
# 3. The R-42 section (before R-41, reverse-chronological order).
# ---------------------------------------------------------------------------
if "### R-42 — " not in src:
    anchor = "### R-41 — The guard-advance, upload-sniff, and select-seam round (session 244) — Status: Done(v2.41.0)"
    assert src.count(anchor) == 1, "the R-41 heading anchor not found once"
    r42 = """### R-42 — The gate-order, bare-carrier, and lockstep-truth round (session 245) — Status: In progress (v2.42.0)

The session-245 findings-led round over the v2.41.0 ship state. Six
cures (F-245a-f), two registrations (F-245g-h).

1. **R-42.1 — the pins born RED**: tests/parity-245.test.ts (the source
   battery: the requireJsonContentType seam's export + its
   gate-before-burn call ordering at all six public routes + the
   uploads GET's regex-before-burn ordering; the health docblock
   enumeration; the §7.1 row completion + the PAD hierarchy form) +
   the parity-229 BARE_UTILITY_WORDS leg (the bare-word genus guard —
   RED at birth over the 46 standing carrier sites) + the docs-counts
   legs (the PAD hierarchy pin + the §7.1 arithmetic leg, RED over the
   stale forms) + the docs-counts guard advance (green-by-design — the
   v2.41.0 block exists at its ship counts; landed BEFORE this
   session's own lockstep pass per the F-244a lesson's own rule) + the
   e2e canary (tests/e2e/wealthos.spec.ts: the plain-text volley — ten
   text/plain login POSTs on a pinned fake XFF all answer 400, then a
   JSON login on the SAME fake XFF answers 401, not 429 — the
   pre-cure tree 429s that login).
2. **R-42.2 — the cures**: THE PUBLIC-FAMILY GATE-ORDER CURE (F-245a —
   the shared `requireJsonContentType(req)` seam joins src/lib/api.ts
   (content-type check + stream cancel + the parseBody gate's own 400
   copy, one seam — the F-238b never-N-copies rule); the six public
   routes call it first and burn after; the uploads GET moves its
   name-regex 404 ahead of the burn); THE GUARD-TRIO ADVANCE (F-245b —
   v2.39.0/v2.40.0/v2.41.0); THE PAD HIERARCHY TRUTH (F-245c); THE
   §7.1 FAMILY-ROW COMPLETION (F-245d); THE SIX BARE-CARRIER
   RETIREMENTS (F-245e — 46 sites reworded; the parity-229 bare-word
   leg; the build probe); THE HEALTH DOCBLOCK TRUTH (F-245f).
3. **R-42.3 — the verification**: the full gate (lint 0/0 · tsc 0 ·
   unit · build · smoke 15/15 · e2e) · the six parity drift gates CLEAN
   (the round's surfaces are a server-side 400 on non-JSON
   content-type, a server-side 404-before-burn, comment rewords, and
   doc rows — pixel-invisible by construction; the reword sites are
   prose-only) · census MATCH · `bun audit` unchanged · the
   before/after BUILD PROBE (the six dead rules vanish from the
   stylesheet) · the captures (the own-database F-225e convention +
   the census tripwire): the mobile drawer at 390 (the standing ask —
   9 destinations + Sign Out asserted), the volley canary's faces
   (the plain-text 400 + the JSON login landing), and the upload GET
   canary.

"""
    src = src.replace(anchor, r42 + anchor, 1)
    changes += 1

# ---------------------------------------------------------------------------
# 4. The §5 execution-history row (filled at ship time; the plan-time row
#    carries the "(this session's execution commit)" placeholder).
# ---------------------------------------------------------------------------
if "| v2.42.0 | 245 |" not in src:
    anchor = "| v2.41.0 | 244 |"
    assert src.count(anchor) == 1, "the v2.41.0 execution-row anchor not found once"
    row = """| v2.42.0 | 245 | **R-42** (the gate-order, bare-carrier, and lockstep-truth round — findings-led, the standing directive with the reference STABLE on all standing drift layers and the TRUE-390 mobile menu re-verified by probe:ref; the cold baseline GREEN at HEAD 30a261d — the v2.41.0 ship state reproduced exactly, no discovery). The audit round first: the standing layers re-verified (probe:ref STABLE — bundle md5 6d3779af… unchanged, demo data zero, desktop nav 256/9, the TRUE-390 menu 9 destinations; `bun audit` unchanged — 1 moderate dev-chain minimatch, the documented deferral; neo-crm unchanged (b3d0fbe) — nothing to port; the SEO surface verified on the artifact (smoke leg 12: sitemap + robots + manifest 200); the .env DATABASE_URL="file:../db/custom.db" contract + the db/ at the repo root + the vitest/playwright configs + the .env.example six-knob set all standing). The session-245 fresh-eyes audit (three Mode-C passes: the R-41 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 0 High / 0 Medium / 6 Low / 2 Informational NEW after dedup, every material claim re-verified at file:line by the driving session; seven of eight R-41 cure surfaces holding, the guard advance aged out by its own ship). The plan v2.42.0 written (the F-245a-h ledger + the R-42 section) and validated against the tree. **R-42.1** the pins born RED → **R-42.2** the cures (THE PUBLIC-FAMILY GATE-ORDER CURE — the requireJsonContentType seam, the six routes, the uploads GET; THE GUARD-TRIO ADVANCE; THE PAD HIERARCHY TRUTH; THE §7.1 FAMILY-ROW COMPLETION; THE SIX BARE-CARRIER RETIREMENTS; THE HEALTH DOCBLOCK TRUTH) → **R-42.3** the verification (the full gate + the six drift gates CLEAN + census MATCH + the build probe + the captures + the docs lockstep) | (filled at ship) | (this session's execution commit) |
"""
    src = src.replace(anchor, row + anchor, 1)
    changes += 1

PLAN.write_text(src, encoding="utf-8")
print(f"docs-245.py: {changes} insertion(s) applied (idempotent skips counted as 0)")
sys.exit(0)
