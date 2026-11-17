#!/usr/bin/env python3
# Session-265 (R-62) plan writer: the version header, the §2.23 audit
# ledger, the R-62 section, and the §5 execution-history row — each edit
# asserted (the docs-243 scoping doctrine: every replacement asserts the
# OLD form inside its slice before writing). The F-247i escape rule: every
# literal pipe inside cell content rides \|\|.
import sys

PATH = "docs/remediation_plan_v2.md"
src = open(PATH, encoding="utf-8").read()
orig = src

# ---- 1. the version header: insert v2.62.0 above, demote v2.61.0 ---------
cur = "> **Current version: v2.61.0** (session 264 — the"
assert src.count(cur) == 1, "v2.61.0 current-version anchor not unique"
NEW_HEADER = """> **Current version: v2.62.0** (session 265 — the
expenses-filters, coach-count, and live-region round R-62: the operator
re-sent the standing directive after the R-61 ship pair (cfb6becb + the
owner's cf191dea session-log update carrying docs/session_111.md, the
session-264 record; mid-session server recycles interrupted the round
twice — the audit dispatch and the drift chain — and the workspace was
rebuilt each time, the work re-applied from the session record). Per
the recorded rhythm, findings-led iteration: refresh, re-audit,
remediate, verify, capture, document, commit, push — with the
operator's named asks (the mobile navigation comparison, the Tailwind
v4 state, the .env/db contract, the vitest/playwright configs, the
sitemap/SEO surface, the .env.example, the screenshots, the
SSH-wrapper push) re-verified along the way. The intake: a fresh clone
at HEAD cf191dea (tree clean), the environment rebuilt cold (bun
install + the postinstall prisma generate, .env from .env.example on
the DATABASE_URL="file:../db/custom.db" contract, db push + seed,
census MATCH (80/4/3/6/5/7, users=1)); the one cold-start deviation
was environmental — the cached Playwright chromium build did not match
the 1.65 pin (the headless-shell build installed, then the battery ran
green). The cold baseline gate ran GREEN at HEAD — the v2.61.0 ship
state reproduced exactly, no discovery: lint 0/0 · tsc 0 · 1838/1838
unit (116 files) · build (the 4 documented Turbopack tracing warnings)
· smoke 15/15 · 152/152 e2e · census MATCH. The standing asks:
probe:ref STABLE on every layer (the bundle md5 6d3779af… unchanged,
the F-250q stylesheet fingerprint 96f24d45… unchanged, the demo data
zero, the desktop nav 256/9, the TRUE-390 menu census standing); THE
MOBILE-NAVIGATION COMPARISON re-run at TRUE 390×844 on BOTH sides (the
reference through agent-browser — the viewport verified by computed
innerWidth: the drawer opens with the 9 destinations + Sign Out and
closes on the X toggle, zero nav destination links in the viewport
after the close; OUR SIDE — the production artifact on the scratch
db/comparison.db, booted in a single invocation — the identical
destinations + Sign Out via the labeled hamburger, the aria-expanded
flip verified on open AND close, zero visible nav links after the
close — parity plus the documented superset, NO Tailwind v4 regression;
both comparison captures re-saved at the standing names, PNG-valid at
the true viewport). THE COMPARISON TOOLCHAIN'S OWN FINDING (F-265a,
cured at discovery): the clone-side script's AUTH_SECRET fallback rode
the NULLISH form — bun loads the .env's empty-string value into
process.env, the ?? form passes "" through, and the production boot
gate refused to serve (a bare 500 on every request, live-reproduced
from the instrumentation hook's refusal); the truthy \\|\\| form cures
it and the battery pins the form. `bun audit` unchanged (1 moderate
dev-chain minimatch, the documented deferral); neo-crm unchanged
(b3d0fbe, re-cloned) — nothing to port; the SEO surface verified
(smoke leg 12: sitemap + robots + manifest 200); the .env contract +
the db/ at the repo root + the vitest/playwright configs + the
.env.example six-knob set all standing. The session-265 fresh-eyes
audit (three Mode-C passes: the R-61 cure surfaces driven by the
session — the parity-264 battery re-run green 8/8 at HEAD · the
API/auth/security layer — the EIGHTEENTH consecutive clean bill (all
twelve house contracts, 45 handlers / 30 route files read line-by-line;
every candidate examined and dismissed into a documented posture) · the
UI/a11y/shell layer — clean on every named contract with THREE new
findings — 0 Critical / 0 High / 0 Medium / 2 Low / 1 Informational
NEW after dedup, every material claim re-verified at file:line by the
driving session). THE ROUND'S FLAGSHIP CAME FROM THE REFERENCE PROBE
ITSELF, NOT THE PASSES: F-265b the Expenses filter surface is a
FUNCTIONAL SUBSET of the reference (live-probed at 1440×900 through
agent-browser this session — the reference's surface is a full-width
IN-FLOW EXPANSION CARD carrying SIX controls: the Date Range select —
Today / Last 7 days / Last 30 days / This month / Last month / Custom
range, the last revealing Start and End date inputs — plus the Category
select, Min Amount, Max Amount, the Sort By select — Date / Amount /
Name / Category — and the direction pair, over a Clear All \\|\\|
Cancel + Apply Filters footer; OUR clone carried ONLY the Category
select inside a small anchored popover — a w-64 absolute div invisible
to every settled-state gate, the F-217c dialogs-blindness genus: both
forms close in captures, so the sweeps, the census, and the e2e battery
never saw the delta). Its siblings: F-265c the coach's save-more
answer hardcodes the "Three levers:" header while a one-nonzero-
category month renders TWO bullets (the prose-truth genus in rendered
output) · F-265d the coach's polite live region wraps the WHOLE message
list, so the user's own bubble is committed into the region and echoed
back on every turn · F-265e the Filters badge counted the budget-tab
filter the popover never owned (resolved inside F-265b's re-scope: the
badge counts the panel's own controls, the honest live count versus
the reference's own never-changing "2"). Registered, not cured: F-265f
the census script's missing exact-basename guard (cosmetic — no test
importer exists; the pinned guard set covers the tools with importers).
The driving session re-verified every material claim at file:line and
live-probed the reference's filter card twice (the control inventory
enumerated option-by-option, the geometry read from computed styles:
position static, the 1120px card, the blue-tinted border pair, the
md:grid-cols-2 lg:grid-cols-3 inner grid, the border-t footer). The
plan v2.62.0 written and validated against the tree.

"""
src = src.replace(cur, NEW_HEADER + "> **Previous version: v2.61.0** (session 264 — the", 1)

# ---- 2. the §2.23 ledger: insert above the section-3 anchor ----------------
LEDGER_ANCHOR = "## 3. The remediation program (R-items)"
assert src.count(LEDGER_ANCHOR) == 1, "section-3 anchor not unique"
LEDGER = """### 2.23 Session-265 audit ledger (the fresh-eyes round over the v2.61.0 ship state)

Three Mode-C passes (the R-61 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer) plus the
reference probe that surfaced the round's flagship; every material
claim re-verified at file:line by the driving session before planning
(the parity-264 battery re-run green 8/8 at HEAD; the API layer's
eighteenth consecutive clean bill — 45 handlers / 30 route files read
line-by-line; the UI layer clean on every named contract with three
new findings). NEW after dedup: 0 Critical / 1 High / 0 Medium /
2 Low / 1 Informational (plus one Low toolchain finding cured at
discovery, and one Informational registered row).

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-265a | Low | **THE COMPARISON SCRIPT'S AUTH_SECRET FALLBACK RODE THE NULLISH FORM — the empty-string .env value defeats it and the production boot gate refused to serve.** `bootArtifact()` built the child env with `process.env.AUTH_SECRET ?? "comparison-secret-…"` — but bun loads the repo .env's `AUTH_SECRET=""` into process.env as the EMPTY STRING, `??` only replaces null/undefined, and the standalone server's instrumentation hook (boot-env) refused to boot: every request answered a bare framework 500 while the script's health probe retried to timeout (live-reproduced this session — the root cause read from the spawned server's own stderr, not inferred). The genus: a TRUTHY fallback (`\\|\\|`) is required wherever an env knob has an empty-string default in .env. | `scripts/comparison-265.ts` (the bootArtifact env arm) | **cured at discovery** (the truthy form; the parity-265 battery pins the form) |
| F-265b | High | **THE EXPENSES FILTER SURFACE IS A FUNCTIONAL SUBSET OF THE REFERENCE — six controls missing, and the genus itself diverges.** Live-probed at 1440×900 through agent-browser this session: the reference's Filters button opens a full-width IN-FLOW EXPANSION CARD (position static, w≈1120, rounded-xl, bg-card, the blue-tinted border pair, inner `grid md:grid-cols-2 lg:grid-cols-3 gap-4`, footer `flex justify-between … border-t`) carrying: (1) the Date Range select — Today / Last 7 days / Last 30 days / This month / Last month / Custom range, the last revealing Start Date + End Date inputs; (2) the Category select; (3) Min Amount; (4) Max Amount; (5) the Sort By select — Date / Amount / Name / Category; (6) the direction select; over a Clear All \\|\\| Cancel + Apply Filters footer (the reference's badge itself reads a never-changing "2" — decorative, live-probed: Clear All, a Min value, and a Category pick all leave it at 2). OUR clone carried ONLY the Category select inside a w-64 absolute anchored popover — a functional-SUBSET violation of the standing superset doctrine, invisible to every settled-state gate (both surfaces close/collapse in captures — the F-217c dialogs-blindness genus; the sweeps compare computed classes, the census counts elements, the e2e battery pinned the popover's own mechanics). The F-231n register's "the reference's own popover is the same plain-div genus" letter predates any probe of the reference's OPEN-panel inventory — the F-226i lesson (probe THIS reference before porting a doctrine) in the positive direction. | `src/app/(app)/expenses/page.tsx:334-401` (the search+filters row and the popover) vs the reference's open card (live-probed; `docs/screenshots/ref-expenses-filters-open-1440.png`) | **R-62** (the expansion-card rebuild: the six controls + the footer, live-apply semantics — the superset over the reference's commit step — Cancel reverts to the open snapshot, Clear All resets, Escape closes with focus return; the badge re-scopes to the panel's own controls) |
| F-265c | Low | **THE COACH'S SAVE-MORE ANSWER HARDCODES "Three levers:" WHILE A ONE-CATEGORY MONTH RENDERS TWO BULLETS.** The save-more arm builds `wants = cats.filter(v>0).slice(0, 2)` then answers `"Three levers:\\n" + suggestions.join + automation bullet` — with exactly ONE nonzero expense category the month renders two bullets under the three-count header (reachable from the coach chip "How can I save more money?" on any single-category month, e.g. a fresh account with one category of spend; the ai test battery pins only the multi-category shape). The prose-truth genus in RENDERED output — the count the user reads contradicts the body it labels. | `src/lib/ai.ts:258-269` (the save-more arm) | **R-62** (the header derives from the bullet count — the multi-category output stays byte-identical; the one-category pin rides the parity-265 battery) |
| F-265d | Low | **THE COACH'S POLITE LIVE REGION WRAPS THE WHOLE MESSAGE LIST — the user's own bubble is echoed back every turn.** The F-219j cure made the message LIST the aria-live="polite" region so assistant replies are announced — but `send()` commits the user bubble into the same list, so a screen-reader user hears their own just-typed question re-announced, then "Coach is thinking…", then the answer: three announcements per turn where two are informative. No information loss; an announcement-polish gap (aria-hidden on user bubbles would hide them from browse mode — the wrong cure; the live region must scope to the assistant column). | `src/components/shared/ai-coach.tsx:89-155` (send + the live list) | **R-62** (the list drops the live attribute; a dedicated always-present polite region carries the assistant announcements — the toast viewport's own construction) |
| F-265e | Informational | **THE FILTERS BADGE COUNTED THE BUDGET-TAB FILTER THE POPOVER NEVER OWNED.** `activeFilters` counted `tab !== "all"` alongside `categoryFilter !== "all"`, so clicking the Needs/Wants/Savings segmented tab lit the Filters badge while the popover's only control still read "All categories" — the count and the control it annotated were momentarily inconsistent. Resolved inside F-265b's re-scope: the badge now counts the panel's OWN controls (range, category, min, max, sort deviations) — the honest live count versus the reference's own never-changing "2" (live-probed), the superset adjudication. | `src/app/(app)/expenses/page.tsx:98` (the count) + `:356-360` (the badge) | **R-62** (resolved inside the F-265b cure) |
| F-265f | Informational | **THE CENSUS SCRIPT CARRIES NO DIRECT-EXECUTION GUARD.** `scripts/census.ts` runs `main()` unconditionally; every sibling tool that a test imports carries the exact-basename guard (the F-210c doctrine), but no test imports census today (grep-verified) — the pinned guard set covers exactly the tools with importers, so the omission is cosmetic. A future round that adds a census importer must land the guard first. | `scripts/census.ts` vs the pinned set at `tests/script-guards.test.ts` | **registered, not cured** (no live hazard; the guard lands with the first importer) |

Recorded, not cured: the API layer's EIGHTEENTH consecutive clean bill
(the optional census-guard observation above is its only output); the
standing registers (F-257a, F-257r, the ai-coach history caution, the
sidebar h2-before-h1 observation, the reference's reset-screen
back-button genus delta, the standing families), plus the toolchain
note (the agent-browser/HeadlessChrome-157 dev-build hydration gap —
session 253; re-confirmed this session: the clone-side comparison rode
the production artifact cleanly, the reference side rode agent-browser).
Next session defaults to findings-led iteration — re-send the standing
directive to continue the rhythm.

"""
src = src.replace(LEDGER_ANCHOR, LEDGER + LEDGER_ANCHOR, 1)

# ---- 3. the R-62 section: insert above R-61 --------------------------------
R61_HEAD = "### R-61 — The muted-flip, sidebar-figure, and fallback-resolution round (session 264)"
assert src.count(R61_HEAD) == 1, "R-61 section head not unique"
R62 = """### R-62 — The expenses-filters, coach-count, and live-region round (session 265)

The operator re-sent the standing directive after the R-61 ship pair
(cfb6becb + the owner's cf191dea session-log update carrying
docs/session_111.md, the session-264 record; mid-session server
recycles interrupted the round twice — the audit dispatch and the
drift chain — and the workspace was rebuilt each time, the work
re-applied from the session record). Per the recorded rhythm,
findings-led iteration. The intake and the standing layers are
recorded in the version header above; this section carries the
findings, the cures, and the verification contract.

**The findings (each verified at file:line by the driving session —
the reference's filter card live-probed at TRUE 1440×900 through
agent-browser, its control inventory enumerated option-by-option and
its geometry read from computed styles):** the §2.23 ledger's five
rows — F-265b THE EXPENSES FILTER SURFACE SUBSET GAP (the round's
flagship: the reference's full-width in-flow expansion card carries
the Date Range select with its Custom-range Start/End reveal, the
Category select, Min Amount, Max Amount, the Sort By field/direction
pair, and the Clear All / Cancel / Apply Filters footer — our clone
carried only the Category select in a w-64 anchored popover; both
forms close in settled captures, so every gate was blind to the delta
— the F-217c genus) · F-265c the coach's "Three levers:" count lie in
the one-category month · F-265d the coach's live region echoing the
user's own bubble · F-265e the badge counting the tab the popover
never owned (resolved inside the flagship's re-scope) · plus F-265a
(the comparison toolchain's nullish AUTH_SECRET fallback — cured at
discovery, the boot gate's refusal live-reproduced from the spawned
server's stderr) and F-265f registered (the census script's missing
exact-basename guard — cosmetic, no importer).

**The cures (R-62.2):** the Expenses filter surface REBUILT as the
reference's expansion-card genus — an in-flow card below the search
row (rounded-xl border bg-card shadow with the blue-tinted border
pair), the inner `grid md:grid-cols-2 lg:grid-cols-3 gap-4` carrying
Date Range (Select: Today / Last 7 / Last 30 / This month / Last
month / Custom range — the Custom arm revealing Start/End date inputs
on the analytics pattern), Category (the standing Select, id
preserved), Min Amount + Max Amount (numeric inputs), and Sort By
(Select: Date / Amount / Name / Category) with the direction pair
(glyph-and-sr-name options); the footer carries Clear All (resets the
panel's controls), Cancel (reverts to the open-snapshot), and Apply
Filters (closes — the live-apply superset means every control already
applied). The close-guard family RE-SCOPED with the genus: the
anchored-popover hazards (outside pointerdown, the F-217a portal
exclusions, the F-238f scroll-close) retire with the anchoring — an
in-flow card owns no overlay hazards and the reference's own card
does not close on outside clicks; Escape closes with the F-241e focus
return, the trigger toggles, the ✕ retires with the popover's own
header (the reference's card carries no ✕; the e2e close step moves
to Escape). The `visible` memo EXTENDS: the list pipeline rides the
new pure finance seam `filterAndSortExpenses` (the date-window filter
through the toDate doctrine, the min/max bounds, and the sort —
date/amount/name/category × asc/desc, the default date-desc +
createdAt-desc matching the API order, the settled list order
unchanged). The badge RE-SCOPES to the panel's own controls (F-265e).
The coach's lever header DERIVES from the bullet count (F-265c — the
multi-category answer byte-identical). The coach's live region SPLITS
from the visual list (F-265d — a dedicated always-present polite
region carries the assistant announcements; the list keeps its visual
role). The comparison script's truthy fallback PINNED (F-265a).

**The verification contract (R-62.3):** the parity-265 battery born
honest RED against the pre-cure tree (the expansion-card inventory
leg · the live-apply/sort leg · the badge-re-scope leg · the
levers-count leg · the live-region leg · the toolchain-fallback leg)
→ the cures → parity-265 GREEN → lint 0/0 · tsc 0 · the unit suite at
the new count · build · smoke 15/15 · the FULL e2e battery (the
outside-close leg REWRITTEN to pin the in-flow genus — a page click
leaves the card standing; the F-217a leg's close step moves to
Escape; the popover-guard pin families updated in the same commit
with the genus rationale) · census MATCH · the drift chain re-run
(the four sweep classes + the fullpage sweep + the interior census —
REQUIRED this round: a parity surface changed; the closed-state DOM
is unchanged by construction, so the standing baselines are expected
to hold, and the chain is the proof) · the captures (the open
expansion card on the dev server, desktop and mobile).

"""
src = src.replace(R61_HEAD, R62 + R61_HEAD, 1)

# ---- 4. the §5 execution-history row: insert at the table head -------------
HIST_ANCHOR = "| v2.61.0 | 264 |"
assert src.count(HIST_ANCHOR) == 1, "v2.61.0 history row anchor not unique"
ROW = """| v2.62.0 | 265 | **R-62** (the expenses-filters, coach-count, and live-region round — findings-led, the standing directive with the reference STABLE on every standing drift layer and the mobile-navigation ask verified on BOTH sides at TRUE 390×844; mid-session server recycles interrupted the round twice — the workspace rebuilt each time, the work re-applied from the session record; the cold baseline GREEN at HEAD cf191dea — the v2.61.0 ship state reproduced exactly, no discovery). The audit round: the standing layers re-verified (probe:ref STABLE; `bun audit` unchanged; neo-crm unchanged (b3d0fbe); the SEO surface verified (smoke leg 12); the .env contract + the db/ at the repo root + the configs + the .env.example standing). The session-265 fresh-eyes audit (three Mode-C passes: the R-61 cure surfaces — the parity-264 battery re-run green 8/8 · the API/auth/security layer — the EIGHTEENTH consecutive clean bill · the UI/a11y/shell layer — three new findings) PLUS the reference probe that surfaced the flagship: 0 Critical / 1 High / 0 Medium / 2 Low / 1 Informational NEW after dedup, every material claim re-verified at file:line, the reference's filter card live-probed at TRUE 1440×900 (control inventory + geometry). THE ROUND'S CURES: F-265b the Expenses filter surface rebuilt as the reference's in-flow expansion card (the six controls + the footer, live-apply superset, the close-guard family re-scoped with the genus, the badge re-scoped — resolving F-265e) · F-265c the coach's lever header derives from the bullet count · F-265d the coach's live region scoped to the assistant column · F-265a the comparison toolchain's truthy AUTH_SECRET fallback (cured at discovery, pinned). Registered: F-265f the census script's missing exact-basename guard. The plan v2.62.0 written and validated against the tree. **R-62.1** the pins born RED (the parity-265 battery) → **R-62.2** the cures → **R-62.3** the verification (parity-265 GREEN · lint 0/0 · tsc 0 · the unit suite at the new count · build · smoke 15/15 · the FULL e2e battery · census MATCH · the drift chain re-run; the captures — the open expansion card, desktop + mobile) | lint 0/0 · tsc 0 · **(the unit count lands with the battery)** · build · smoke 15/15 · **(the e2e count lands with the battery)** · census MATCH | (this session's execution commit) |
"""
src = src.replace(HIST_ANCHOR, ROW + HIST_ANCHOR, 1)

if src == orig:
    print("NO EDITS APPLIED — anchors all matched but replacements were no-ops?!", file=sys.stderr)
    sys.exit(1)

open(PATH, "w", encoding="utf-8").write(src)
print("plan v2.62.0 written: version header + §2.23 ledger + R-62 section + §5 row")
