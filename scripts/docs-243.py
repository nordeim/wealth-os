#!/usr/bin/env python3
"""Session-243 (R-40) plan writer — the v2.40.0 ledger insertion.

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
# 1. The header: the new current-version paragraph; v2.39.0 demoted to
#    "Previous version".
# ---------------------------------------------------------------------------
if "> **Current version: v2.40.0**" not in src:
    old_head = "> **Current version: v2.39.0** (session 242"
    assert src.count(old_head) == 1, "v2.39.0 current-version head not found once"
    src = src.replace(old_head, "> **Previous version: v2.39.0** (session 242", 1)
    new_current = """> **Current version: v2.40.0** (session 243 — the logout-bucket,
> guard-advance, and label-truth round R-40: the owner's standing
> directive — refresh → review → validate → audit → parity iteration →
> remediation plan → TDD execution → captures → docs lockstep →
> commit → push, with the reference STABLE on all standing drift
> layers and the TRUE-390 mobile menu re-verified by probe:ref this
> session; the cold-baseline gate GREEN at HEAD ddf2396 — no
> discovery this round, the v2.39.0 ship state reproduced exactly:
> lint 0/0 · tsc 0 · 1539/1539 unit (92 files) · build · smoke 15/15
> · 150/150 e2e · census MATCH). The session-243 fresh-eyes audit
> (three Mode-C passes: the R-39 cure surfaces driven by the session,
> the API/auth/security layer, and the UI/a11y/shell layer — 0
> Critical / 0 High / 1 Medium / 5 Low / 5 Informational NEW after
> dedup, every material claim re-verified at file:line by the driving
> session; all eight R-39 cure surfaces verified holding — the CSP
> fetch-directive pin with its three e2e legs, the rate-limit
> battery's crossing cleanup, the parity-240 retitle, the popover
> docblock truth across all three carriers, the login-card cn()
> conversion with zero template literals tree-wide, the globals/
> page-layout comment truths, the hydration-rationale truths, and
> the count-lockstep restoration; the API layer clean again —
> owner-scoping census, Zod sweep, bucket coverage, injection and
> enumeration sweeps all clean; the UI layer clean — the drawer
> mechanics, the v4 scanner discipline, the theme system, the a11y
> contracts all holding). The round's flagship: THE LOGOUT
> WRITES-BUCKET POISONING CURE (F-243a Medium — the one `writes:`
> family route that burned its bucket BEFORE the session read: a
> cookie-less direct caller posting JSON content-type passed the
> F-234g gate, burned 60 slots of the shared writes bucket every
> sessioned mutation rides, and collected the guest-logout no-op 200
> — on the default direct-exposure posture (no XFF, every browser
> keys "unknown") a renewable unauthenticated write-DoS across all
> users; the burn now rides the sessioned path, after the session
> read, so a guest logout consumes nothing — possession of the
> cookie IS the credential, the route's own doctrine). Plus: the
> F-242j guard advance (F-243b — the over-replacement guard pinned
> only v2.36.0/37.0/38.0, leaving the v2.39.0 block — the exact
> block THIS session's own count replacement would corrupt —
> unpinned; the guard now pins the three-most-recent trio
> v2.37.0/v2.38.0/v2.39.0, and the v2.39.0 block's stale-at-birth
> "docs-counts 13/13" becomes the true 14/14); the OTP
> delivery docblock truths (F-243c — three session-21-era carriers
> still claimed the verification code is "never shipped to the
> client" while signup/resend ship it in-band by default, the
> ADR-014/F-242i posture the escalation itself turns on); the
> whole-tree scanner jsx completion (F-243d — the parity-229 and
> parity-242 walkers both excluded jsx, leaving the nine
> capital-route bridges invisible to both "whole-tree" guards; both
> filters widen, the route-case precedent); the import dropzone
> label-in-name cure (F-243e — the sr-only input's aria-label
> "Upload a CSV file" overrode the wrapping label without
> containing the visible "Upload a file" text, a WCAG 2.5.3 Level A
> failure for speech-input users); the readStoredTheme export
> retirement (F-243f — the F-234j genus one function later); and
> the globals prose-token rider (F-243g — the two plain-prose
> utility mentions reworded to token form). Registered, not cured:
> the committed docs-242.py constant (F-243h — the script targets
> 1538 where the tree shipped 1539; a session artifact, inert by
> its own assert guard), the PAD v2.36.0 historical block's
> pre-F-242g F-239c framing (F-243i — defensible history), and the
> disabled-in-flight focus drop (F-243j — Reasoned; the house async
> idiom, success paths self-heal). §5 carries the execution
> history.)
"""
    idx = src.index("> **Previous version: v2.39.0**")
    src = src[:idx] + new_current + "\n" + src[idx:]
    changes += 1
    print("[ok] header: v2.40.0 current-version paragraph")
else:
    print("[skip] header: v2.40.0 already present")

# ---------------------------------------------------------------------------
# 2. The §2.3 audit ledger (inserted before "## 3. The remediation program").
# ---------------------------------------------------------------------------
if "### 2.3 Session-243 audit ledger" not in src:
    anchor = "## 3. The remediation program (R-items)"
    assert src.count(anchor) == 1, "program anchor not found once"
    ledger = """### 2.3 Session-243 audit ledger (the fresh-eyes round over the v2.39.0 ship state)

Three Mode-C passes (the R-39 cure surfaces · the API/auth/security layer ·
the UI/a11y/shell layer); every material claim re-verified at file:line by
the driving session before planning. NEW findings after dedup (the passes
re-confirmed the documented postures without exception):
0 Critical / 0 High / 1 Medium / 5 Low / 5 Informational.

| ID | Severity | Finding (adjudicated) | Location | Disposition |
|---|---|---|---|---|
| F-243a | Medium | **THE LOGOUT WRITES-BUCKET POISONING.** `POST /api/auth/logout` is the only `writes:` family route whose bucket burn precedes its session read: the F-234g content-type gate (which closed the cross-site no-preflight volley) still admits a plain unauthenticated direct caller posting `Content-Type: application/json` with no cookie — the burn lands (60/15min on `writes:${clientKey(req)}`), `getSessionUser()` returns null, and the caller collects the guest-logout no-op 200. On the default direct-exposure posture (NEO_PROXY_HOPS unset, no proxy: browsers send no XFF/x-real-ip, so every legitimate user keys the shared "unknown" bucket — docs/DEPLOYMENT.md's documented `bun run start` path), 60 such requests 429 every user's CRUD for a renewable 15-minute window while the attacker mints their own XFF hop to keep their own writes alive. The upload route's own docblock states the violated doctrine verbatim ("bucketing pre-auth would let an attacker exhaust a legitimate IP's budget without ever holding a session"); the F-221r addition and the F-234g gate each closed a different surface and left this one. Availability only — no data exposure or integrity impact. | `src/app/api/auth/logout/route.ts:43` (the burn) vs `:55` (the session read) | **cured in R-40** (the burn rides the sessioned path, after the session read — a guest logout consumes nothing; the F-234g gate-first order and the F-221r bucket form both preserved) |
| F-243b | Low | **The F-242j over-replacement guard omits the v2.39.0 block — the recurrence pattern is not intercepted.** The guard pins v2.36.0=1469/89, v2.37.0=1485/90, v2.38.0=1519/91, but not v2.39.0=1539/92 — and the documented defect pattern (sessions 240 and 241 each corrupted exactly the then-most-recent block) makes v2.39.0 the block session 243's own lockstep pass would corrupt. Its counts are the live counts (1539/92) the next replacement targets. Plus the v2.39.0 block's "docs-counts 13/13" verification claim was stale at birth: session 242 shipped 14 its (the F-242j guard itself added the 14th; session_67.md's delivery record says "docs-counts 14/14" while the PAD block says 13/13). | `tests/docs-counts.test.ts:180-190` (the guard), `Project_Architecture_Document.md:74` (the 13/13) | **cured in R-40** (the guard advances to the three-most-recent trio v2.37.0/v2.38.0/v2.39.0 — the v2.36.0 pin retires from the guard as the block ages out; the 13/13 becomes the true 14/14) |
| F-243c | Low | **Three session-21-era docblocks claim the verification code is "never shipped to the client" — contradicted by the shipped in-band delivery.** signup/resend/verification.ts each carry the S21-P5 rationale ("logged to the SERVER console for the demo workflow (never shipped to the client, never committed)") while signup/route.ts and resend answer `verificationCode: inAppOtpEnabled ? code : null` — the digma ADR-014 in-band delivery (the F-217m/F-242i posture). A future auditor reading the S21-P5 comment would mis-read the exact exposure channel the F-242i escalation turns on. | `src/app/api/auth/signup/route.ts:92-98`, `src/app/api/auth/resend/route.ts:12-19`, `src/lib/verification.ts:21-23` | **cured in R-40** (all three reworded to the delivered truth: console log AND response while the knob is unset; the knob nulls both) |
| F-243d | Low | **The two "whole-tree" class-string guards exclude the nine capital-route .jsx bridges.** The parity-229 comment-carrier walker (a ts/tsx/css-only filter) and the parity-242 template-literal genus walker (a tsx/css-only filter) both omit jsx — the nine `src/app/(app)/{Dashboard,…}/page.jsx` re-export bridges are invisible to both guards. The route-case test's own comment documents this exact filter class ("a .tsx-only filter left them invisible") and widened its own scan. The bridges are clean by inspection today (pure re-exports, zero className strings) — a latent guard-coverage gap, not a live violation. | `tests/parity-229.test.ts:108`, `tests/parity-242.test.ts:23` | **cured in R-40** (both filters admit jsx; the parity-243 pin asserts the walker forms — born RED against the pre-cure filters) |
| F-243e | Low | **The import dropzone's accessible name does not contain the visible label text (WCAG 2.5.3 Label in Name, Level A).** The sr-only file input carries `aria-label="Upload a CSV file"`, which overrides the wrapping label's text as its accessible name; the visible label text is "Upload a file" (the picked filename after selection) — not a substring of "Upload a CSV file". Speech-input users saying "click Upload a file" get no match on the Import flow's primary control. axe-core's label-content-name-mismatch rule does not apply (the input has no visible own-content), so the two-gate e2e is blind to it. | `src/app/(app)/import/page.tsx:221` | **cured in R-40** (the aria-label becomes "Upload a file — CSV, XLS or XLSX up to 10MB": contains the visible phrase, keeps the format hint) |
| F-243f | Informational | **readStoredTheme remains exported with zero importers outside its own module — the F-234j genus one function later.** The file's own theme.tsx:26-28 comment records the resolveTheme retirement ("module-local — consumed only by readStoredTheme in this file; the export keyword was vestigial") while readStoredTheme itself (:34) keeps its export keyword with the same shape: consumed only inside the file. | `src/components/layout/theme.tsx:34` | **cured in R-40** (the export keyword retires; the parity-234 pin form mirrored) |
| F-243g | Informational | **Two plain-prose utility mentions survive in globals.css (the F-224v doctrine's non-backticked cousin).** The session-220 dark-flip comment says "every bg-background consumer now resolve…" and "its old bg-background read" — prose naming the utility form where the doctrine names the token. Both predate the F-242f round's scope (which cured the backticked citations). | `src/app/globals.css:361,363` | **cured in R-40** (reworded to token form — the background-token consumer, the old background-token read) |
| F-243h | Informational | **The committed lockstep script is one count behind the tree it shipped.** scripts/docs-242.py targets NEW_UNIT=1538 while the shipped tree carries 1539 everywhere (the final +1 bump — the docs-counts pin's own test — happened outside the committed script). Re-running the committed script against the current tree fails its first assert (the swap guard), so it is inert; a future session copying it as a template inherits a stale example. | `scripts/docs-242.py:15-18` | recorded (session artifact; the assert guard makes it inert) |
| F-243i | Informational | **The PAD's v2.36.0 historical block narrates F-239c in the pre-F-242g framing.** The two operative code carriers were reworded (F-242g), but the historical block still records the superseded "server and client diverge at the text level" mechanism as session-239's rationale. Defensible as history (it records what that session shipped and believed). | `Project_Architecture_Document.md:251-258` | recorded (history; a "(superseded by F-242g)" rider if a future docs round touches the block) |
| F-243j | Informational | **Disabling an in-flight control drops keyboard focus to `<body>` (the async busy-state window).** The house async idiom (native `disabled` + opacity) blurs the focused element the moment it disables; on failure paths where the surface stays mounted, the next Tab restarts from the document top. Success paths mostly self-heal (row unmounts, Radix returns focus). Reasoned, not live-probed. | `src/app/(app)/expenses/page.tsx:245-246` (representative), the dialog submits | recorded (not worth a dedicated round; the aria-disabled + guarded-handler form if ever swept) |

"""
    src = src.replace(anchor, ledger + anchor, 1)
    changes += 1
    print("[ok] 2.3 session-243 audit ledger inserted")
else:
    print("[skip] 2.3 ledger already present")

# ---------------------------------------------------------------------------
# 3. The R-40 section (inserted before R-39's heading — the newest-first
#    position the R-39/R-38/R-37 cluster uses).
# ---------------------------------------------------------------------------
if "### R-40 —" not in src:
    anchor = "### R-39 — The CSP-inventory pin, test-hygiene, and carrier-truth round (session 242) — Status: Done(v2.39.0)"
    assert src.count(anchor) == 1, "R-39 heading anchor not found once"
    r40 = """### R-40 — The logout-bucket, guard-advance, and label-truth round (session 243) — Status: In progress

The session-243 findings-led round over the v2.39.0 ship state. Six cures
(F-243a-g), three registrations (F-243h-j).

1. **R-40.1 — the pins born RED**: tests/parity-243.test.ts (the source
   battery: the logout burn AFTER the session read + the F-234g gate-first
   order + the F-221r bucket form preserved; the v2.39.0 block's 14/14;
   the three OTP docblock truths; the two scanner walker forms admitting
   jsx; the import aria-label containing the visible phrase;
   readStoredTheme module-local) + the docs-counts guard advance (the
   three-most-recent trio, green-by-design — a guard, landed BEFORE this
   session's own lockstep pass per the F-242j lesson).
2. **R-40.2 — the cures**: THE LOGOUT WRITES-BUCKET POISONING CURE
   (F-243a — the burn moves inside the `if (user)` block, after the
   session read; guest logout consumes nothing; sessioned logout rides
   the writes family exactly as before); THE F-242j GUARD ADVANCE +
   THE 14/14 TRUTH (F-243b); THE OTP DELIVERY DOCBLOCK TRUTHS
   (F-243c — three carriers); THE WHOLE-TREE SCANNER JSX COMPLETION
   (F-243d — two filters); THE IMPORT DROPZONE LABEL-IN-NAME CURE
   (F-243e); THE READSTOREDTHEME EXPORT RETIREMENT (F-243f); THE
   GLOBALS PROSE-TOKEN RIDER (F-243g).
3. **R-40.3 — the verification**: the full gate (lint → typecheck →
   test → build → smoke → e2e) + the six parity drift gates (the
   standing allowances should hold UNMOVED — the round's surfaces are
   server-side ordering, guard internals, docblocks, one aria-label,
   and one export keyword, all pixel-invisible; any movement
   re-derives per the F-236e doctrine) + census MATCH + `bun audit`
   re-triage + the captures set (the standing operator asks: the
   mobile drawer + this round's cured surfaces) + the docs lockstep
   (README/AGENTS/CLAUDE/PAD/SKILL/this plan/worklog/the session
   record) in the same commit.

"""
    src = src.replace(anchor, r40 + anchor, 1)
    changes += 1
    print("[ok] R-40 section inserted")
else:
    print("[skip] R-40 section already present")

PLAN.write_text(src, encoding="utf-8")
print(f"done: {changes} change(s) written")
sys.exit(0)
