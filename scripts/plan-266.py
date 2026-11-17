#!/usr/bin/env python3
"""Session-266 plan writer — v2.63.0 (R-63, the range-return,
empty-truth, and escape-stack round).

Follows the plan-265 conventions exactly (validated against the tree):
  1. the version header — the new Current-version block above the
     v2.62.0 block, which retitles to Previous;
  2. the §2.24 audit ledger before "## 3.";
  3. the R-63 section above R-62's;
  4. the §5 execution-history row above v2.62.0's.
Every replacement is scoped and asserted (the F-242j lesson: assert the
old form inside the slice, never a whole-file occurrence count).
"""

import re
import sys

PLAN = "docs/remediation_plan_v2.md"

with open(PLAN, encoding="utf-8") as f:
    text = f.read()

orig_len = len(text)


def splice(haystack: str, anchor: str, insertion: str, before: bool) -> str:
    """Assert the anchor is unique, then insert around it."""
    n = haystack.count(anchor)
    if n != 1:
        sys.exit(f"anchor not unique ({n}): {anchor[:70]!r}")
    return haystack.replace(
        anchor, (insertion + anchor) if before else (anchor + insertion)
    )


# ---------------------------------------------------------------------------
# 1. The version header
# ---------------------------------------------------------------------------
CURRENT_MARKER = "> **Current version: v2.62.0** (session 265 — the"
header = """> **Current version: v2.63.0** (session 266 — the
range-return, empty-truth, and escape-stack round R-63: the operator
re-sent the standing directive after the R-62 ship pair (b80c06e6 + the
owner's cfadc7e0 session-log update carrying docs/session_114.md, the
owner's session-265 log). Per the recorded rhythm, findings-led
iteration: refresh, re-audit, remediate, verify, capture, document,
commit, push — with the operator's named asks (the mobile navigation
comparison, the Tailwind v4 state, the .env/db contract, the
vitest/playwright configs, the sitemap/SEO surface, the .env.example,
the screenshots, the SSH-wrapper push) re-verified along the way. The
intake: the sandbox recycled again mid-program (the third recycle of
the run — the uncommitted tree lost), a fresh clone at HEAD cfadc7e0
(tree clean), the environment rebuilt cold (bun install + the
postinstall prisma generate, .env from .env.example on the
DATABASE_URL="file:../db/custom.db" contract, db push + seed, census
MATCH (80/4/3/6/5/7, users=1)); the one cold-start deviation was
environmental again — the cached Playwright chromium build did not
match the 1.65 pin (the headless-shell 1254 build installed, then the
battery ran green). The cold baseline gate ran GREEN at HEAD — the
v2.62.0 ship state reproduced exactly, no discovery: lint 0/0 · tsc 0
· 1860/1860 unit (117 files) · build (the 4 documented Turbopack
tracing warnings) · smoke 15/15 · 152/152 e2e · census MATCH. The
standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the F-250q stylesheet fingerprint 96f24d45…
unchanged, the demo data zero, the desktop nav 256/9, the TRUE-390
menu census standing); THE MOBILE-NAVIGATION COMPARISON re-run at TRUE
390×844 on BOTH sides (the reference through agent-browser — the
viewport verified by computed innerWidth: the drawer opens with the 9
destinations + Sign Out and closes on the X toggle, zero nav
destination links in the viewport after the close, the capture
re-saved at the standing name; OUR SIDE — the production artifact on
the scratch db/comparison.db, booted in a single invocation — the
identical destinations + Sign Out via the labeled hamburger, the
aria-expanded flip verified on open AND close, zero visible nav links
after the close, the census tripwire MATCH, the capture re-saved —
parity plus the documented superset, NO Tailwind v4 regression). `bun
audit` unchanged (1 moderate dev-chain minimatch, the documented
deferral); neo-crm unchanged (b3d0fbe, remote-verified); the SEO
surface verified (smoke leg 12: sitemap + robots + manifest 200); the
.env contract + the db/ at the repo root + the vitest/playwright
configs + the .env.example six-knob set all standing. The session-266
fresh-eyes audit (three Mode-C passes: the R-62 cure surfaces driven
by the session — the parity-265 battery re-run green 27/27 at HEAD ·
the API/auth/security layer — the NINETEENTH consecutive clean bill
(all twelve house contracts, 45 handlers / 30 route files read
line-by-line; every candidate examined and dismissed into a
documented posture) · the UI/a11y/shell layer — clean on every named
contract with EIGHT new findings, plus the driving session's own docs
discovery) — 0 Critical / 0 High / 2 Medium / 4 Low / 3 Informational
NEW after dedup, every material claim re-verified at file:line by the
driving session before planning. THE ROUND'S TWO MEDIUMS LIVE ON THE
R-62 FLAGSHIP ITSELF: F-266b the Date Range select cannot return to
the un-filtered state (six window options, no All-dates arm — the
live-apply superset surfaces the trap on every pick: once a window is
chosen the select alone cannot widen it back) · F-266c a
filtered-to-empty list renders the ONBOARDING empty state ("No
expenses yet / Start tracking your spending" + the Add Your First
Expense CTA) — actively misleading for a user with a full ledger who
over-constrains any of the five live controls (the genus predates
R-62's category select, but the five new controls multiply its
reach). Their siblings: F-266d one Escape press dismisses TWO
surfaces when a Radix dialog opens over the open card (DismissableLayer
closes the dialog without stopping propagation — the window listener
closes the card underneath; the mobile drawer carries the same
role) · F-266e the card's Custom date inputs and its Min/Max amount
inputs render TWO different control genera (the analytics input-base
pairing vs the house FORM_INPUT — different fills, borders, and focus
ring weights side by side in one panel, dark mode diverging most) ·
F-266f the dead Minus import (lint-blind: no-unused-vars is off by
config) · F-266a the README's remediation-program status row still
describes R-61 (the R-62 lockstep advanced the count ladder but
missed the row — the docs-counts battery pins the counts, nothing
pins the row: the F-245c genus, "a leg that rides only in the script
rots the site") · F-266g the coach announcement region's comment
overstates ("empty when idle" — the region persistently carries the
last reply after the first turn) · F-266h toggleFilters writes a ref
inside a state updater (impure updater, idempotent in effect) ·
F-266i the pure seam's custom bounds accept non-bare forms silently
(V8 stages a "2026-11" partial as the first of the month — an
invented day, the F-222a genus; unreachable through the type=date
UI). The API layer's nineteenth clean bill is the round's clean
column; the findings cluster exactly where new code landed. The plan
v2.63.0 written and validated against the tree.

"""

text = splice(text, CURRENT_MARKER, header, before=True)
# retitle the v2.62.0 block
RETITLE_OLD = "> **Current version: v2.62.0** (session 265 — the"
RETITLE_NEW = "> **Previous version: v2.62.0** (session 265 — the"
# the splice above inserted a new Current block; the v2.62.0 marker is
# now the ONLY remaining "Current version: v2.62.0" occurrence.
if text.count(RETITLE_OLD) != 1:
    sys.exit("v2.62.0 retitle anchor not unique after header insert")
text = text.replace(RETITLE_OLD, RETITLE_NEW)

# ---------------------------------------------------------------------------
# 2. The §2.24 audit ledger (before "## 3.")
# ---------------------------------------------------------------------------
SECTION_3 = "## 3. The remediation program (R-items)"
ledger = """
### 2.24 Session-266 audit ledger (the fresh-eyes round over the v2.62.0 ship state)

Three Mode-C passes over HEAD cfadc7e0 (the R-62 cure surfaces driven
by the session · the API/auth/security layer · the UI/a11y/shell
layer), every material claim re-verified at file:line by the driving
session before planning; the parity-265 battery re-run green 27/27
(all R-62 cure surfaces holding — the expansion-card inventory, the
close-guard retirement, the badge re-scope, the seam's date-window
doctrine, the lever-count derivation, the live-region split, the
truthy toolchain fallback). The API/auth/security layer's NINETEENTH
consecutive clean bill: all twelve house contracts verified with
file:line evidence (the envelope, the session guard ordering, the Zod
parse surface, the burn-placement family, the empty-update refines,
the transient-503 family including the seam catches, the logout arm
containment, the CSP form, the content-type gate, the signup ceiling,
the db singleton, the auth funnel's gate ordering and async scrypt);
the tree measured at exactly 30 route files / 45 handlers (GET 15 ·
POST 17 · PUT 6 · DELETE 6 · PATCH 1), unchanged since R-52. The
UI/a11y/shell layer: all eight standing contracts verified (the plain
drawer, the theme-default seam and its two mirrors, the Tailwind v4
hazard axes, the carrier net re-run green, the label/focus/live-region
family, the toDate routing on every stored-date read, the
suppressHydrationWarning carriers, the route twins) — and a
close trace of the R-62 cure surfaces' data flow (invalid dates,
inverted bounds, the badge derivation, the snapshot semantics, the
Escape focus return, the sort stability) surfaced the round's
findings. NEW after dedup: 0 Critical / 0 High / 2 Medium / 4 Low /
3 Informational, plus the driving session's own docs discovery
(F-266a).

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-266a | Low | **THE README'S REMEDIATION-PROGRAM STATUS ROW IS STALE AT R-61 — the R-62 lockstep advanced the count ladder (1838→1860 / 116→117 / badge 1990→2012) but missed the row.** The README's status table still reads "(session 264: R-61 shipped — the muted-flip, sidebar-figure, and fallback-resolution round)" while the repo shipped R-62 (v2.62.0); every prior R-commit advanced the row (verified in the R-60 and R-61 commit diffs — the convention is load-bearing: the row is the README's only pointer into the program's state). Nothing pins it: the docs-counts battery pins the count ladder and the PAD's structures, not the row — the F-245c genus ("a correction that lives only in a one-shot script is a correction that already stopped happening"). | `README.md:225` (the status row) vs the shipped v2.62.0 state | **R-63** (the row advances to the shipped round + a STRUCTURAL docs-counts leg: the battery derives the PAD's newest [SR] revision block at test time and asserts the README row cites that round's R-item — the F-249b pattern applied to the README row, so the next stale row fails `bun run test` inside its own ship commit) |
| F-266b | Medium | **THE DATE RANGE SELECT CANNOT RETURN TO THE UN-FILTERED STATE — six window options, no All-dates arm.** The R-62 card's range select offers Today / Last 7 days / Last 30 days / This month / Last month / Custom range only; the initial state (range "", the seam's documented no-window value) renders the placeholder "Select range" — which is NOT an option, so once a window is picked the select alone cannot widen the list back (recovery requires Clear All — resetting all six controls — or Cancel — reverting but closing the card). The live-apply superset surfaces the trap on EVERY pick (the reference commits on Apply, so its own identical option set hides the same trap behind the commit step; parity-neutral, superset-relevant). | `src/app/(app)/expenses/page.tsx:452-464` (the options) vs `src/lib/finance.ts:216` (the "" = no-window contract) | **R-63** (a first "All dates" option with value "" — the no-window state becomes named and selectable; the placeholder retires with it (a Radix Select renders the matching item, never the placeholder, once the item exists); the parity-265 placeholder pin leg updates in the same commit with the contract-change rationale) |
| F-266c | Medium | **A FILTERED-TO-EMPTY LIST RENDERS THE ONBOARDING EMPTY STATE — "No expenses yet / Start tracking your spending to better manage your budget / Add Your First Expense" — for a user with a full ledger who over-constrains any live control.** The history body's ternary keys on visible.length alone: min 10 / max 5, an inverted Custom window, or a no-match category each render the onboarding face with its non-sequitur CTA (live-traced on the seam). The genus predates R-62 (the category select carried it), but the five new live controls multiply its reach; the reference's own demo data is zero so its empty face is unobservable there (the probe's standing "demo data: ZERO" layer). | `src/app/(app)/expenses/page.tsx:267-278` (the historyBody ternary) | **R-63** (a no-matches variant keyed on the honest discriminator — panel filters active OR search non-empty — rendering "No expenses match your filters" with a Clear Filters action that clears the panel controls AND the search box; the onboarding variant keeps the genuinely-empty ledger) |
| F-266d | Low | **ONE ESCAPE PRESS DISMISSES TWO SURFACES WHEN A DIALOG OPENS OVER THE OPEN FILTER CARD.** The card's window keydown guard checks only the Radix popper wrapper; Radix Dialog's DismissableLayer closes on Escape with preventDefault but NO stopPropagation (verified in @radix-ui/react-dismissable-layer's dist source), so the keydown still reaches the window listener — card open → "Add Expense" → Escape closes the dialog AND the filter card underneath (the filter STATE survives; only the visibility is lost — but the user's working context vanishes). The mobile drawer carries the same role and the same stacking. | `src/app/(app)/expenses/page.tsx:160-164` (the onKey guard) | **R-63** (the guard extends to any open [role="dialog"] — Radix Dialog content and the mobile drawer both UNMOUNT when closed (verified: the drawer's conditional return, Radix's unmount-on-close), so presence in the DOM is the exact open-surface test; the card itself is role="group" and cannot self-match) |
| F-266e | Low | **THE CARD'S TWO INPUT GENERA DIVERGE — the Custom Start/End date inputs render the analytics input-base genus while the Min/Max amount inputs render the house FORM_INPUT genus.** input-base: transparent fill, the line-token border, a 1px focus-visible box-shadow ring; FORM_INPUT: bg-white / dark:bg-stone-900 fill, the stone border pair, the 2px focus-visible ring — two visibly different control families side by side in one panel (dark mode diverging most). Both accessible; a cosmetic-consistency gap on the flagship surface. | `src/app/(app)/expenses/page.tsx:467-480` (input-base h-10 flex-1) vs `:510-536` (FORM_INPUT) | **R-63** (the Custom date inputs join FORM_INPUT with the flex-1 appendage — one genus per panel; the analytics page's own input-base usage is untouched (its search-box genus is a different surface's convention)) |
| F-266f | Low | **THE DEAD Minus IMPORT — imported from lucide-react, zero uses in the file.** Pre-dates R-62 (present in the parent commit) and survived the rebuild; the lint gate is blind to it (@typescript-eslint/no-unused-vars is "off" by config — a deliberate house choice), so the dead import rides the tree against the unused-imports retirement discipline. | `src/app/(app)/expenses/page.tsx:7` | **R-63** (the import retires) |
| F-266g | Informational | **THE COACH ANNOUNCEMENT REGION'S COMMENT OVERSTATES — "empty when idle" is false after the first turn.** The region renders the latest assistant message content whenever not busy, so after the first turn it persistently carries the last reply (and mounts with it on dialog reopen). Benign under the house's own F-235a doctrine (a live region arriving WITH content is not announced), but the comment claims a semantics the construction does not carry — the comment-truth genus (F-264a's kin), invisible to the class-shape nets (not a class-shaped carrier). | `src/components/shared/ai-coach.tsx:178-184` (the comment) vs `:185-189` (the construction) | **R-63** (the comment trued: the region is always-present and pre-exists its first announcement (the F-218h doctrine); once a reply exists it carries the latest — which the doctrine does not announce on (re)mount) |
| F-266h | Informational | **toggleFilters WRITES A REF INSIDE A STATE UPDATER — an impure updater.** The open-snapshot capture (openSnapshotRef.current = …) happens inside the setFiltersOpen(updater) callback; React may double-invoke updaters (StrictMode dev). The write is idempotent (closure-read values), so no user-facing effect — a React-discipline gap, not a behavior bug. | `src/app/(app)/expenses/page.tsx:186-203` | **R-63** (the capture moves to the handler body, guarded on the closed state; the setter call goes pure — the snapshot semantics byte-identical: captured at the closed-to-open transition only) |
| F-266i | Informational | **THE PURE SEAM'S CUSTOM BOUNDS ACCEPT NON-BARE FORMS SILENTLY — V8 stages a "2026-11" partial as the first of the month.** The bounds' documented form is the bare yyyy-mm-dd (the date-input contract, finance.ts's own docblock), but the custom branch parses whatever arrives: garbage no-ops through NaN comparisons (already the drop-the-bound behavior), while a partial ISO form invents a day (live-traced: "2026-11" windows from Nov 1 — the F-222a genus, "a skip beats an invented day"). Unreachable through the type=date UI (the browser yields "" or the full form); latent for a future free-text caller. | `src/lib/finance.ts:257-261` (the custom branch) | **R-63** (a form guard: a bound outside the bare yyyy-mm-dd form is DROPPED (treated as open) rather than parsed — the garbage no-op becomes the documented contract for every non-conforming form; seam legs pin the partial and the garbage both) |

Recorded, not cured: none NEW this round beyond the standing registers
(F-265f the census script's guard, F-264g/h/i, F-257a/r — all standing;
the API layer's nineteenth clean bill recorded above). The toolchain
note stands (agent-browser/HeadlessChrome vs the Turbopack dev build —
session 253; this session's clone-side comparison rode the production
artifact cleanly again). Next session defaults to findings-led
iteration — re-send the standing directive to continue the rhythm.

"""

text = splice(text, SECTION_3, ledger, before=True)

# ---------------------------------------------------------------------------
# 3. The R-63 section (above R-62's)
# ---------------------------------------------------------------------------
R62_ANCHOR = "### R-62 — The expenses-filters, coach-count, and live-region round (session 265)"
r63 = """### R-63 — The range-return, empty-truth, and escape-stack round (session 266)

The operator re-sent the standing directive after the R-62 ship pair
(b80c06e6 + the owner's cfadc7e0 session-log update carrying
docs/session_114.md, the owner's session-265 log). Per the recorded
rhythm, findings-led iteration. The intake and the standing layers are
recorded in the version header above; this section carries the
findings, the cures, and the verification contract.

**The findings (each verified at file:line by the driving session —
the API layer's nineteenth consecutive clean bill is the round's clean
column; every finding lives on the UI/docs side, clustered exactly
where the R-62 code landed):** the §2.24 ledger's nine rows — F-266b
THE RANGE RETURN TRAP (the round's flagship: the Date Range select's
six window options carry no All-dates arm, so the live-apply superset
narrows the list on every pick with no select-only path back) · F-266c
THE EMPTY-TRUTH GAP (a filtered-to-empty list renders the onboarding
face — "No expenses yet" + the Add Your First Expense CTA — for a full
ledger) · F-266d the Escape double-dismissal over a stacked dialog ·
F-266e the card's two input genera · F-266f the dead Minus import ·
F-266a the README status row stale at R-61 (the R-62 lockstep's own
miss, the F-245c genus) · F-266g the coach region's overstated
comment · F-266h the impure updater · F-266i the seam's non-bare
custom bounds.

**The cures (R-63.2):** the range select gains a FIRST option "All
dates" (value "" — the seam's own no-window value, already documented
and already the initial state): the un-filtered state becomes named
and selectable, the placeholder retires with it (a Radix Select
renders the matching item once it exists — the placeholder was only
reachable pre-first-pick), and the parity-265 placeholder pin updates
in the same commit (the contract change rides the commit that changes
it). The history body's empty arm SPLITS on the honest discriminator
(panel filters active OR search non-empty): the no-matches variant
renders "No expenses match your filters" with a Clear Filters action
that clears the panel controls AND the search box (the onboarding
variant keeps the genuinely-empty ledger — the two truths no longer
share a face). The Escape guard EXTENDS to stacked surfaces: any open
[role="dialog"] owns the Escape (Radix Dialog content and the mobile
drawer both unmount when closed, so DOM presence is the exact
open-surface test; the card is role="group" and cannot self-match) —
one Escape per surface, the dialog first, the card second. The Custom
date inputs JOIN the FORM_INPUT genus (the flex-1 appendage) — one
control genus per panel. The dead Minus import RETIRES. The coach
region's comment TRUES to the construction (always-present,
pre-exists its first announcement; carries the latest reply once one
exists — which the F-235a doctrine does not announce on mount). The
toggleFilters snapshot capture MOVES to the handler body (guarded on
the closed state; the setter goes pure — the capture semantics
byte-identical). The seam's custom bounds GAIN the form guard (a
bound outside the bare yyyy-mm-dd form is dropped — treated as open —
rather than parsed: V8's partial-ISO day invention refused, the
garbage no-op becomes the documented contract). The README status row
ADVANCES to the shipped round and the docs-counts battery gains the
STRUCTURAL leg (derive the PAD's newest [SR] revision block at test
time; assert the README row cites that round's R-item — the F-249b
pattern applied to the last unpinned status site).

**The verification contract (R-63.3):** the parity-266 battery born
honest RED against the pre-cure tree (the All-dates option leg · the
no-matches variant leg · the Escape-stack guard leg · the input-genus
leg · the dead-import negative leg · the comment-truth leg · the
pure-updater leg · the seam form-guard legs · the README-row
structural leg) → the cures → parity-266 GREEN → lint 0/0 · tsc 0 ·
the unit suite at the new count · build · smoke 15/15 · the FULL e2e
battery (+3 legs: the All-dates return round-trip, the no-matches
variant with its Clear Filters restore, the Escape stack over the Add
Expense dialog — zero new signups/logins, the shared storageState
rides) · census MATCH · the drift chain re-run (the four sweep
classes + the fullpage sweep + the interior census — REQUIRED again:
the Expenses parity surface changed; the closed-state DOM is unchanged
by construction — the new option lives inside the closed card's
select, the no-matches variant only renders under active filters — so
the standing baselines are expected to hold, and the chain is the
proof) · the captures (the All-dates return and the no-matches variant
on the dev server, desktop + mobile).

"""
text = splice(text, R62_ANCHOR, r63, before=True)

# ---------------------------------------------------------------------------
# 4. The §5 execution-history row (above v2.62.0's)
# ---------------------------------------------------------------------------
ROW62 = "| v2.62.0 | 265 |"
row = """| v2.63.0 | 266 | **R-63** (the range-return, empty-truth, and escape-stack round — findings-led, the standing directive with the reference STABLE on every standing drift layer and the mobile-navigation ask verified on BOTH sides at TRUE 390×844; the sandbox recycled mid-program — the workspace rebuilt from a fresh clone, the environment re-verified cold). The audit round: the standing layers re-verified (probe:ref STABLE; `bun audit` unchanged; neo-crm unchanged (b3d0fbe); the SEO surface verified (smoke leg 12); the .env contract + the db/ at the repo root + the configs + the .env.example standing). The session-266 fresh-eyes audit (three Mode-C passes: the R-62 cure surfaces — the parity-265 battery re-run green 27/27 · the API/auth/security layer — the NINETEENTH consecutive clean bill · the UI/a11y/shell layer — eight new findings plus the driving session's own docs discovery): 0 Critical / 0 High / 2 Medium / 4 Low / 3 Informational NEW after dedup, every material claim re-verified at file:line. THE ROUND'S CURES: F-266b the Date Range select's All-dates first option (the un-filtered state named and selectable; the placeholder retires; the parity-265 pin updates same-commit) · F-266c the no-matches empty variant with its Clear Filters action (the onboarding face keeps the genuinely-empty ledger) · F-266d the Escape stack guard (any open [role="dialog"] owns the Escape) · F-266e the Custom date inputs join the FORM_INPUT genus · F-266f the dead Minus import retires · F-266a the README status row advances + the docs-counts structural leg (the F-249b pattern on the last unpinned status site) · F-266g the coach region comment trued · F-266h the snapshot capture leaves the updater · F-266i the seam's custom-bound form guard. The plan v2.63.0 written and validated against the tree. **R-63.1** the pins born RED (the parity-266 battery) → **R-63.2** the cures → **R-63.3** the verification (parity-266 GREEN · lint 0/0 · tsc 0 · the unit suite at the new count · build · smoke 15/15 · the FULL e2e battery (+3 legs) · census MATCH · the drift chain re-run; the captures — the All-dates return, the no-matches variant) | (filled at ship) | (this session's execution commit) |

"""
text = splice(text, ROW62, row, before=True)

with open(PLAN, "w", encoding="utf-8") as f:
    f.write(text)

print(f"plan v2.63.0 written: {orig_len} -> {len(text)} bytes (+{len(text) - orig_len})")
