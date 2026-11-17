#!/usr/bin/env python3
"""Session-267 plan writer — v2.64.0 (R-64, the savings-tab,
sort-count, and calendar-roundtrip round).

Follows the plan-266 conventions exactly (validated against the tree):
  1. the version header — the new Current-version block above the
     v2.63.0 block, which retitles to Previous;
  2. the §2.25 audit ledger before "## 3.";
  3. the R-64 section above R-63's;
  4. the §5 execution-history row above v2.63.0's.
Every replacement is scoped and asserted (the F-242j lesson: assert the
old form inside the slice, never a whole-file occurrence count).
"""

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
CURRENT_MARKER = "> **Current version: v2.63.0** (session 266 — the"
header = """> **Current version: v2.64.0** (session 267 — the
savings-tab, sort-count, and calendar-roundtrip round R-64: the operator
re-sent the standing directive after the R-63 ship pair (36353d8c + the
owner's 70bb0fc3 session-log update carrying docs/session_116.md, the
owner's session-266 log). Per the recorded rhythm, findings-led
iteration: refresh, re-audit, remediate, verify, capture, document,
commit, push — with the operator's named asks (the mobile navigation
comparison, the Tailwind v4 state, the .env/db contract, the
vitest/playwright configs, the sitemap/SEO surface, the .env.example,
the screenshots, the SSH-wrapper push) re-verified along the way. The
intake: the sandbox had been reset (a fresh clone at HEAD 70bb0fc3,
tree clean), the environment rebuilt cold (bun install + the
postinstall prisma generate, .env from .env.example on the
DATABASE_URL="file:../db/custom.db" contract, db/ at the repo root,
db push + seed, census MATCH (80/4/3/6/5/7, users=1)); the one
cold-start deviation was environmental again — the cached Playwright
chromium build did not match the 1.65 pin (the headless-shell 1254
build installed, then the battery ran green). The cold baseline gate
ran GREEN at HEAD — the v2.63.0 ship state reproduced exactly, no
discovery: lint 0/0 · tsc 0 · 1877/1877 unit (118 files) · build (the
4 documented Turbopack tracing warnings) · smoke 15/15 · 155/155 e2e ·
census MATCH. The standing asks: probe:ref STABLE on every layer (the
bundle md5 6d3779af… unchanged, the F-250q stylesheet fingerprint
96f24d45… unchanged, the demo data zero, the desktop nav 256/9, the
TRUE-390 menu census standing); THE MOBILE-NAVIGATION COMPARISON
re-run at TRUE 390×844 on BOTH sides (the reference through
agent-browser — the viewport verified by computed innerWidth: the
drawer opens with the 9 destinations + Sign Out and closes on the X
toggle, zero nav destination links in the viewport after the close,
the capture re-saved at the standing name; OUR SIDE — the production
artifact on the scratch db/comparison.db, booted in a single
invocation per the session-98 server-death lesson — the identical
destinations + Sign Out via the labeled hamburger, the aria-expanded
flip Open→Close verified on open AND close, zero visible nav links
after the close, the census tripwire MATCH, the capture re-saved —
parity plus the documented superset, NO Tailwind v4 regression). `bun
audit` unchanged (1 moderate dev-chain minimatch, the documented
deferral); neo-crm unchanged (b3d0fbe, remote-verified) — nothing to
port; the SEO surface verified (smoke leg 12: sitemap + robots +
manifest 200); the .env contract + the db/ at the repo root + the
vitest/playwright configs + the .env.example six-knob set all
standing. The session-267 fresh-eyes audit (three Mode-C passes: the
R-63 cure surfaces driven by the session — the parity-266 battery
re-run green 16/16 at HEAD · the API/auth/security layer — the
TWENTIETH consecutive clean bill (all twelve house contracts, 45
handlers / 30 route files, the census re-derived independently; every
candidate examined and dismissed into a documented posture) · the
UI/a11y/shell layer — all eight standing contracts verified, five new
findings after dedup with the driving session's own re-verification
and live adjudications): 0 Critical / 0 High / 1 Medium / 4 Low /
4 Informational NEW after dedup, every material claim re-verified at
file:line by the driving session before planning. THE ROUND'S MEDIUM
LIVES INSIDE F-266c'S OWN CHARTER: F-267a the no-matches
discriminator misses the budget TAB — the page's third constraint
dimension, the one live control that can empty a list without being
counted: the corpus's savings bucket is EMPTY (needs 46 · wants 26 ·
savings 0, census-verified), so the Savings tab alone renders the
ONBOARDING face ("No expenses yet" + the Add Your First Expense CTA)
for a 72-expense ledger TODAY — and the Clear Filters action the
F-266c cure built does not reset the tab, so the still-empty list
flips from the no-matches face to the onboarding face after its own
Clear button. Their siblings: F-267b the discriminator reuses the
badge count verbatim, so the SORT pair (a control that can only
reorder, never empty) counts as an over-constraint — a genuinely
empty ledger with a touched sort renders the no-matches face (the
mirror edge) · F-267c the seam's custom-bound form guard admits
calendar-invalid forms — the shape regex passes "2026-02-31" and
toDate's normalizing constructor invents Mar 3 (runtime-verified; the
exact F-222a invented-day doctrine the guard was built to enforce)
· F-267d the four Add/Edit dialogs' Date inputs still ride the
input-base genus while their siblings ride FORM_INPUT — the F-266e
split's dialog edition (live-measured on the reference: its own
Add-Expense inputs carry ONE genus across every field) · F-267e
budgetCategorySplit unmemoized on the expenses surface (the F-231j
memo contract its two siblings already honor). The API layer's
twentieth clean bill is the round's clean column; the findings
cluster exactly where the recent code landed. The plan v2.64.0
written and validated against the tree.

"""

text = splice(text, CURRENT_MARKER, header, before=True)
# retitle the v2.63.0 block
RETITLE_OLD = "> **Current version: v2.63.0** (session 266 — the"
RETITLE_NEW = "> **Previous version: v2.63.0** (session 266 — the"
# the splice above inserted a new Current block; the v2.63.0 marker is
# now the ONLY remaining "Current version: v2.63.0" occurrence.
if text.count(RETITLE_OLD) != 1:
    sys.exit("v2.63.0 retitle anchor not unique after header insert")
text = text.replace(RETITLE_OLD, RETITLE_NEW)

# ---------------------------------------------------------------------------
# 2. The §2.25 audit ledger (before "## 3.")
# ---------------------------------------------------------------------------
SECTION_3 = "## 3. The remediation program (R-items)"
ledger = """
### 2.25 Session-267 audit ledger (the fresh-eyes round over the v2.63.0 ship state)

Three Mode-C passes over HEAD 70bb0fc3 (the R-63 cure surfaces driven
by the session · the API/auth/security layer · the UI/a11y/shell
layer), every material claim re-verified at file:line by the driving
session before planning; the parity-266 battery re-run green 16/16
(all R-63 cure surfaces holding — the All-dates sentinel and its two
boundary mappings, the no-matches variant, the Escape stack guard, the
input-genus unification, the pure updater, the seam form-guard, the
coach comment, the dead-import retirement). The API/auth/security
layer's TWENTIETH consecutive clean bill: all twelve house contracts
verified with file:line evidence (the envelope, the session guard
ordering, the Zod parse surface, the burn-placement family, the
empty-update refines, the transient-503 family including the seam
catches, the logout arm containment, the CSP form, the content-type
gate, the signup ceiling, the db singleton, the auth funnel's gate
ordering and async scrypt); the tree measured at exactly 30 route
files / 45 handlers (GET 15 · POST 17 · PUT 6 · DELETE 6 · PATCH 1),
unchanged since R-52. The UI/a11y/shell layer: all eight standing
contracts verified (the plain drawer, the theme-default seam and its
two mirrors, the Tailwind v4 hazard axes, the carrier net re-run
green, the label/focus/live-region family, the toDate routing on
every stored-date read, the suppressHydrationWarning carriers, the
route twins) — and a close data-flow trace of the R-63 cure surfaces
plus the fresh-eyes sweep surfaced the round's findings. NEW after
dedup: 0 Critical / 0 High / 1 Medium / 4 Low / 4 Informational.

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-267a | Medium | **THE NO-MATCHES DISCRIMINATOR MISSES THE BUDGET TAB — the one live constraint that can empty a list without being counted.** F-266c's discriminator keys on the badge count (the panel's five controls) plus the search box; the budget TAB — a third constraint dimension the page owns, passed into the seam as budgetTab — appears in neither term. LIVE-REACHABLE TODAY: the corpus's savings bucket is EMPTY (needs 46 · wants 26 · savings 0, census-verified on db/custom.db), so the Savings tab alone empties the expense list and renders the ONBOARDING face ("No expenses yet" + the Add Your First Expense CTA) for a 72-expense ledger — the exact non-sequitur genus F-266c was chartered to cure. Compound: with the tab constraining, the Clear Filters action (the F-266c cure's "lifts EVERY constraint the page owns" promise) clears the search and the panel but NOT the tab, so the still-empty list flips from the no-matches face to the onboarding face after its own Clear button. | `src/app/(app)/expenses/page.tsx:133-139` (the count, tab absent) · `:263-264` (the tab is a live seam constraint) · `:247-250` (Clear Filters never resets the tab) · `:295-296` (the discriminator) | **R-64** (a dedicated over-constraint predicate that counts the list-narrowing constraints the page owns — range, category, min, max, the TAB, and the search — with the sort pair excluded (F-267b); the Clear Filters action adds the tab reset; the badge keeps its own honest panel count, the registered F-265e posture unchanged) |
| F-267b | Low | **THE DISCRIMINATOR REUSES THE BADGE COUNT, WHICH INCLUDES THE SORT PAIR — a control that can only reorder, never empty, a list.** `activeFilters` counts `sortField !== "date" \|\| sortDir !== "desc"` (the F-265e badge's honest panel count), and the F-266c empty arm reuses it verbatim — so a GENUINELY-EMPTY ledger with a touched sort renders the no-matches face ("No expenses match your filters" + "Try widening the date range…" — misleading copy for a zero-row ledger) instead of the onboarding face. The mirror edge of F-266c's own cure. | `src/app/(app)/expenses/page.tsx:138` (the sort term) · `:296` (the reuse) | **R-64** (the over-constraint predicate of F-267a's cure is SEPARATE from the badge count — it carries only the list-narrowing terms; sort stays in the badge where it belongs) |
| F-267c | Low | **THE SEAM'S CUSTOM-BOUND FORM GUARD ADMITS CALENDAR-INVALID FORMS — the exact F-222a invented-day doctrine it was built to enforce.** The F-266i guard tests SHAPE (the UTC_MIDNIGHT_ISO regex, `\\d{2}` fields), not calendar validity: "2026-02-31" passes and toDate's normalizing constructor (`new Date(y, m-1, d)`) silently invents Mar 3 — runtime-verified; "2026-13-01" invents Jan 1, 2027. The guard refuses V8's partial-ISO inventions but not its overflow inventions; the F-266i comment stakes the opposite claim ("a skip beats an invented day"). Unreachable through the type=date UI; latent for the future free-text caller the guard's own comment binds the seam for. The house's own standing doctrine (session-222: "EVERY literal-staging branch round-trips its calendar") already cures this genus in csv.ts's stageWrittenLiteral. | `src/lib/finance.ts:72` (the shape-only regex) · `:90-92` (the normalizing constructor) · `:266-271` (the guard) | **R-64** (the custom-bound branch gains the calendar round-trip — a bound that constructs off the regex groups must LAND on the calendar its digits wrote (getFullYear/getMonth/getDate vs the groups) or be DROPPED as open, the csv.ts stageWrittenLiteral doctrine in its local-midnight form; seam legs pin the Feb-31 and month-13 drops at both bounds plus the twin-form admission the battery gap left unpinned) |
| F-267d | Low | **THE FOUR ADD/EDIT DIALOGS' DATE INPUTS STILL RIDE THE input-base GENUS while their siblings ride FORM_INPUT — the F-266e split's dialog edition.** The expenses dialog's Date input renders input-base (transparent fill, the line-token border, the 1px focus ring) beside Description/Amount/Notes on FORM_INPUT (bg-white / dark:bg-stone-900 fill, the stone border pair, the 2px ring) — and the same split rides the income, goals, and investments dialogs (four surfaces, the file's own convention diverging inside each). LIVE-ADJUDICATED on the reference: its own Add-Expense manual form carries ONE computed genus across every input (transparent bg, the #e5e5e5 border, 6px radius — Description, Amount, Date, and Notes all identical), so the reference's dialogs carry no split to preserve. | `src/app/(app)/expenses/page.tsx:978` · `src/app/(app)/income/page.tsx:356` · `src/app/(app)/goals/page.tsx:344` · `src/app/(app)/investments/page.tsx:565` (the four date inputs) vs their FORM_INPUT siblings | **R-64** (the four dialog Date inputs join the FORM_INPUT genus — the R-63 house direction extended to the last split surfaces; the analytics page's own two input-base usages stay, the documented search-box genus of a different surface's convention; parity-safe by construction — the sweeps capture closed-state pages and the dialogs render closed) |
| F-267e | Low | **budgetCategorySplit RUNS UNMEMOIZED ON EVERY RENDER — the F-231j memo contract its two siblings already honor.** The bare call re-runs the O(n) fold over the full transaction set (up to 5,000 imported rows) on every render — every search keystroke included — while `expenses` (the memoized filter above it) and `visible` (the memoized pipeline below) both carry the F-231j memo contract with the explanatory comment. Wasted work on the highest-traffic list surface; no correctness impact. | `src/app/(app)/expenses/page.tsx:124` (the bare call) vs `:117-123` (the memoized sibling) | **R-64** (the memo wrap, keyed on the store's stable transactions array) |
| F-267f | Informational | **THE SEAM'S INTERFACE DOCBLOCKS ARE NARROWER THAN THE ENFORCED BOUND CONTRACT.** The customStart/customEnd field docs read "(bare yyyy-mm-dd, "" = open)" while the F-266i guard also admits the two UTC-midnight twins (`…T00:00:00Z`, `…T00:00:00.000Z` — the stored form re-anchoring identically through toDate, as the F-266i comment itself states truthfully). The interface docs and the enforcement diverge in letter. | `src/lib/finance.ts:217-220` (the field docs) vs `:258-265` (the enforced contract) | **R-64** (the field docs gain the twin clause — the doc-truth genus, one phrase) |
| F-267g | Informational | **THE ESCAPE GUARD'S "DOM presence is the exact test" RESTS ON AN UNPINNED INVARIANT.** The F-266d guard is exact TODAY (the only two [role="dialog"] genera — Radix Dialog content and the mobile drawer's conditional div — both unmount on close, verified: no forceMount anywhere; the card is role="group") — but the exactness is an invariant of the current genera, not of the test: a future force-mounted or CSS-hidden dialog genus would leave a stale [role="dialog"] in the DOM and the card's Escape would silently stop working. The e2e battery pins the Radix-dialog stacking order only; the mobile-drawer order rides unpinned. | `src/app/(app)/expenses/page.tsx:162-170` (the guard + comment) | **R-64** (the comment states the invariant it rests on — "exact WHILE both dialog genera unmount on close" — the comment-truth genus; the mobile-drawer stacking order recorded as the battery's standing gap, not a new leg (the desktop leg pins the mechanism; the drawer carries the same role and the same unmount semantics)) |
| F-267h | Informational | **THE DEFENSIVE useTheme FALLBACK'S setTheme NEVER PERSISTS — the two setTheme seams diverge.** The provider's seam writes localStorage then applies; the out-of-provider fallback applies only, so a hypothetical out-of-provider consumer's choice would survive neither reload nor the bootstrap. Zero impact today (the provider wraps the tree from the root layout; the fallback is the documented F-264d defensive posture). | `src/components/layout/theme.tsx:162-170` (the fallback) vs `:138-142` (the provider seam) | registered (Verified; the fallback is defensive dead-arm posture — a storage write there would arm the arm; leave as documented) |
| F-267i | Informational | **THE DASHBOARD'S RENDER-STABLE CLOCK GOES STALE ACROSS MIDNIGHT — the date subtitle and the month-bucketed KPIs bucket into the previous calendar day until a remount.** `useState(() => new Date())` is pinned at mount (the deliberate memo-stability trade, F-231j's era); a tab left open overnight shows yesterday's date line. The reference (a client SPA) carries the same freshness class; the captures remount by construction. | `src/app/(app)/dashboard/page.tsx:74-75` | registered (Reasoned; the deliberate trade stands — a visibilitychange re-derivation noted as the minimal superset if ever revisited) |

Recorded, not cured: F-267h and F-267i above, plus the standing
registers (F-265f the census script's guard, F-264g/h/i, F-257a/r —
all standing; the API layer's twentieth clean bill recorded above; the
battery-gap legs — the twin-bound admission and the calendar-invalid
drops — ride F-267c's cure). The toolchain note stands
(agent-browser/HeadlessChrome vs the Turbopack dev build — session
253; this session's clone-side comparison rode the production artifact
cleanly again). Next session defaults to findings-led iteration —
re-send the standing directive to continue the rhythm.

"""

text = splice(text, SECTION_3, ledger, before=True)

# ---------------------------------------------------------------------------
# 3. The R-64 section (above R-63's)
# ---------------------------------------------------------------------------
R63_ANCHOR = "### R-63 — The range-return, empty-truth, and escape-stack round (session 266)"
r64 = """### R-64 — The savings-tab, sort-count, and calendar-roundtrip round (session 267)

The operator re-sent the standing directive after the R-63 ship pair
(36353d8c + the owner's 70bb0fc3 session-log update carrying
docs/session_116.md, the owner's session-266 log). Per the recorded
rhythm, findings-led iteration. The intake and the standing layers are
recorded in the version header above; this section carries the
findings, the cures, and the verification contract.

**The findings (each verified at file:line by the driving session —
the API layer's twentieth consecutive clean bill is the round's clean
column; every finding lives on the UI side, clustered where the R-62
and R-63 code landed):** the §2.25 ledger's nine rows — F-267a THE
SAVINGS-TAB TRUTH GAP (the round's flagship: the no-matches
discriminator misses the budget tab — the corpus's savings bucket is
empty, so the Savings tab alone renders the onboarding face for a
72-expense ledger today, and the Clear Filters action does not reset
the tab) · F-267b the discriminator reuses the badge count so the
sort pair counts as an over-constraint (the empty-ledger mirror edge)
· F-267c the seam's custom-bound guard admits calendar-invalid forms
(toDate's normalizing constructor invents Mar 3 for "2026-02-31" —
the F-222a doctrine the guard was built to enforce) · F-267d the four
dialogs' Date inputs on the other genus (the F-266e split's dialog
edition, live-adjudicated against the reference's own one-genus
dialogs) · F-267e the unmemoized split derivation · F-267f the
interface docblocks' letter divergence · F-267g the Escape guard's
unpinned invariant · F-267h/F-267i the two registered Informationals
(the theme fallback's storage divergence, the dashboard clock's
midnight staleness).

**The cures (R-64.2):** the history body's empty arm keys on a
DEDICATED over-constraint predicate — the list-narrowing constraints
the page owns (range, category, min, max, THE TAB, and the search box)
— SEPARATE from the badge count (sort stays in the badge where it
belongs, the F-265e posture unchanged): a list emptied by ANY live
narrowing constraint renders the no-matches face with its Clear
Filters action, and the action now lifts EVERY constraint the page
owns INCLUDING the tab (setTab("all") joins the resets); the
genuinely-empty ledger keeps the onboarding truth. The seam's
custom-bound branch gains the CALENDAR ROUND-TRIP (the csv.ts
stageWrittenLiteral doctrine in its local-midnight form): a bound that
constructs off the regex groups must LAND on the calendar its digits
wrote or be DROPPED as open — the Feb-31 and month-13 overflow
inventions refused alongside the partial-ISO inventions the F-266i
guard already refuses; the field docs gain the twin clause. The four
dialog Date inputs JOIN the FORM_INPUT genus (the R-63 house direction
extended to the last split surfaces; the analytics search-box genus
stays). The split derivation gains the F-231j memo. The Escape guard's
comment STATES the unmount invariant it rests on. The battery gaps
close with the cures: the twin-bound admission leg and the
calendar-invalid drop legs join the parity battery.

**The verification contract (R-64.3):** the parity-267 battery born
honest RED against the pre-cure tree (the tab-discriminator leg · the
Clear-Filters tab-reset leg · the sort-exclusion leg · the
calendar-roundtrip seam legs · the twin-admission rider · the
dialog-genus legs · the memo leg · the doc-truth leg · the
invariant-comment leg) → the cures → parity-267 GREEN → lint 0/0 ·
tsc 0 · the unit suite at the new count · build · smoke 15/15 · the
FULL e2e battery (+2 legs: the Savings-tab no-matches face with the
onboarding CTA absent, and the Clear Filters restore returning the tab
to All with the list repopulated — zero new signups/logins, the shared
storageState rides, the corpus's own empty savings bucket is the
deterministic fixture) · census MATCH · the drift chain re-run (the
four sweep classes + the fullpage sweep + the interior census —
REQUIRED again: the Expenses parity surface changed; the closed-state
DOM is unchanged by construction (the discriminator is render-logic,
the no-matches variant only renders under the tab constraint, the
dialog inputs live inside closed dialogs), so the standing baselines
are expected to hold, and the chain is the proof) · the captures (the
Savings-tab no-matches face and the Clear Filters restore, desktop +
mobile).

"""

text = splice(text, R63_ANCHOR, r64, before=True)

# ---------------------------------------------------------------------------
# 4. The §5 execution-history row (above v2.63.0's)
# ---------------------------------------------------------------------------
ROW63 = "| v2.63.0 | 266 |"
row = """| v2.64.0 | 267 | **R-64** (the savings-tab, sort-count, and calendar-roundtrip round — findings-led, the standing directive with the reference STABLE on every standing drift layer and the mobile-navigation ask verified on BOTH sides at TRUE 390×844; the workspace reset before the round — a fresh clone at HEAD 70bb0fc3 with the environment rebuilt cold). The audit round: the standing layers re-verified (probe:ref STABLE; `bun audit` unchanged; neo-crm unchanged (b3d0fbe); the SEO surface verified (smoke leg 12); the .env contract + the db/ at the repo root + the configs + the .env.example standing). The session-267 fresh-eyes audit (three Mode-C passes: the R-63 cure surfaces — the parity-266 battery re-run green 16/16 · the API/auth/security layer — the TWENTIETH consecutive clean bill · the UI/a11y/shell layer — all eight standing contracts verified, five new findings after dedup): 0 Critical / 0 High / 1 Medium / 4 Low / 4 Informational NEW after dedup, every material claim re-verified at file:line (the savings-bucket emptiness census-verified on the live db; the calendar-overflow invention runtime-verified; the reference's one-genus dialog live-measured). THE ROUND'S CURES: F-267a the dedicated over-constraint predicate counting the budget tab (the Savings tab's empty list now wears the no-matches face) + the Clear Filters tab reset · F-267b the sort pair leaves the over-constraint predicate (the badge keeps its honest count) · F-267c the seam's calendar round-trip (overflow bounds dropped as open, the stageWrittenLiteral doctrine) + the twin-form doc clause · F-267d the four dialog Date inputs join the FORM_INPUT genus · F-267e the split derivation memoized · F-267g the Escape guard's invariant comment. Registered: F-267h the theme fallback's storage divergence, F-267i the dashboard clock's midnight staleness. The plan v2.64.0 written and validated against the tree. **R-64.1** the pins born RED (the parity-267 battery) → **R-64.2** the cures → **R-64.3** the verification (parity-267 GREEN · lint 0/0 · tsc 0 · the unit suite at the new count · build · smoke 15/15 · the FULL e2e battery (+2 legs) · census MATCH · the drift chain re-run; the captures — the Savings-tab no-matches face, the Clear Filters restore) | (filled at ship) | (this session's execution commit) |

"""

text = splice(text, ROW63, row, before=True)

with open(PLAN, "w", encoding="utf-8") as f:
    f.write(text)

print(f"plan v2.64.0 written: {orig_len} -> {len(text)} bytes (+{len(text) - orig_len})")
