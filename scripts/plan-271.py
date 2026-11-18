#!/usr/bin/env python3
"""Session-271 plan write — remediation_plan_v2.md v2.67.0 → v2.68.0
(R-68, the doc-truth, pin-depth, and register-note round).

Insertions only, every site asserted (the F-242j lesson): the new
Current-version header block (the v2.67.0 block flips to Previous),
the §2.29 ledger (before §3's heading), the R-68 section (above
R-67's), and the §5 execution-history row (above v2.67.0's)."""

import sys


def insert_before(text: str, anchor: str, block: str, label: str) -> str:
    n = text.count(anchor)
    if n != 1:
        sys.exit(f"[{label}] expected 1 anchor, found {n}: {anchor[:60]!r}")
    return text.replace(anchor, block + anchor)


with open("docs/remediation_plan_v2.md", encoding="utf-8") as f:
    p = f.read()

# ---- 1. the head: the new Current block; v2.67.0 flips to Previous ------
CUR_HEAD = "> **Current version: v2.67.0** (session 270 — the"
if p.count(CUR_HEAD) != 1:
    sys.exit("[head] the v2.67.0 Current header not found in the expected form")
p = p.replace(CUR_HEAD, "> **Previous version: v2.67.0** (session 270 — the", 1)

NEW_HEAD = """> **Current version: v2.68.0** (session 271 — the
doc-truth, pin-depth, and register-note round R-68: the operator
re-sent the standing directive after the R-67 ship pair (854e9438 +
the owner's fbb29c86 session-log update carrying docs/session_124.md,
the owner's session-270 transcript — fetched and reviewed at intake
per the odd-number record convention, this record riding
docs/session_125.md). Per the recorded rhythm, findings-led
iteration: refresh, re-audit, remediate, verify, capture, document,
commit, push — with the operator's named asks (the mobile navigation
comparison, the Tailwind v4 state, the .env/db contract, the
vitest/playwright configs, the sitemap/SEO surface, the .env.example,
the screenshots, the SSH-wrapper push) re-verified along the way.)

The intake: the workspace stood at HEAD fbb29c86 (tree clean; the
prior session's work ALREADY SHIPPED as 854e9438 + the owner's
session-log update; git pull fast-forwarded 854e9438..fbb29c86
carrying docs/session_124.md alone), the environment already built
warm (bun install's node_modules + the generated prisma client
standing, .env on the DATABASE_URL="file:../db/custom.db" contract,
db/ at the repo root, census MATCH (81/4/3/6/5/7, users=1) on the
first run — no cold rebuild needed this round). THE BASELINE GATE
GREEN AT HEAD — the v2.67.0 ship state reproduced exactly, no
discovery: lint 0/0 · tsc 0 · 1932/1932 unit (122 files) · build
(the 4 documented Turbopack tracing warnings) · smoke 15/15 ·
161/161 e2e.

The standing layers: probe:ref STABLE on every layer (the app bundle
1,402,874 bytes / md5 6d3779af…, the stylesheet md5 96f24d45…, the
demo-data ZERO census, the desktop nav census 256px · 9 links, the
TRUE-390 menu census opens=true · 9 destinations) · **the mobile-nav
comparison verified on BOTH sides at TRUE 390×844** (the reference
through probe:ref's TRUE-390 menu census; the clone side riding the
standing comparison-265.ts on the production artifact over the
scratch db/comparison.db — pre-open 0 · 9 destinations + Sign Out ·
aria-expanded true→false · post-close 0 · census tripwire MATCH ·
no Tailwind v4 regression) · `bun audit` UNCHANGED (the 2-advisory
dev-chain census — the picomatch HIGH plus the minimatch chain, both
under F-268d's standing posture, zero runtime) · neo-crm unchanged
(b3d0fbe) · the SEO surface verified (smoke leg 12: sitemap + robots
+ manifest 200) · the .env contract + the db/ at the repo root + the
vitest/playwright configs + the .env.example standing.

The session-271 fresh-eyes audit (three Mode-C passes dispatched as
parallel research subagents per the house convention, every material
claim re-verified at file:line by the driving session — the R-67 cure
surfaces (all five HOLDING: the collapsed ladder read directly with
its airtight counts; the hash-dialect arm's edge cases each checked —
the code-shaped env lines stay code, the hash-marked prose routes to
comments, the widened ignore-list walk yields no class-shaped token;
the trued F-266d comment; the stacked-order e2e leg read behavioral;
both rider comments) · the API/auth/security layer (the TWENTY-FOURTH
consecutive clean bill — all twelve house contracts, 30 route files /
45 handlers read line-by-line, the census exact; three candidates
dismissed into documented postures: the uploads GET public
capability-URL enumeration, the forgot-password timing rationale's
stale status citation, the in-band OTP accepted-risk re-verification)
· the UI/a11y/shell layer (all eight standing contracts verified
holding; the genuine rot found in the DISTILLED DOCS — the skill doc
and the README claim mechanisms and inventories that do not exist in
the tree, and two pin-depth gaps ride the R-67 guards)): 0 Critical /
0 High / 2 Medium / 7 Low / 9 Informational NEW after dedup, every
material claim re-verified at file:line by the driving session (the
a11y battery counted live through the playwright --list census — 46
tests at 1280×800, not 10 at 1440×900; the phantom UI inventory
counted against the actual directory — 18 tsx, not 23, with five
phantom ui files named; the Radix label claim grepped against
package.json — no react-label dependency exists; the three 3-step
carriers read against the import page's two Step headings; the
stacked-order pointer pin read against the leg's behavioral body).

THE ROUND'S TWO MEDIUMS: **F-271c the skill doc's a11y battery claim
is wrong on count and viewport** (the §8 opener claims 10 checks at
the 1440×900 and 390×844 viewports; the spec runs 46 tests — 45 axe
legs (light + dark × desktop and phone across all nine sections, the
anonymous faces, the 404, the open drawer/dialog states) plus the
devDep declaration leg — and the desktop viewport is 1280×800; 1440
belongs to the parity sweeps, a different tool; the skill doc is the
document CLAUDE.md directs every session to read, and an agent
reasoning from it about gate coverage gets both the size and the
reference viewport wrong) · **F-271d the skill doc's UI inventory
names a primitive and five files that do not exist** (the stack table
claims the Radix label package among the primitives — no such
dependency rides package.json; the component inventory claims 13 ui
tsx including card, icons, input, label, and table — the directory
holds 8, and the five named files are phantoms; the heading claims 23
tsx — the tree holds 18; and the §8 labels bullet claims every input
pairs with the Radix Label primitive — the vendored input/label stock
retired at F-232a and inputs pair plain label htmlFor elements; an
agent implementing a form per the skill doc would import a component
that is not there).

THE ROUND'S SEVEN LOWS: **F-271a the stacked-order e2e pointer pin is
title-deep** (the parity-270 leg pins two title strings — a gutted
leg body would survive it, and E2E_TOTAL rides a hardcoded constant
with no count-derived backstop; the pin-depth leg anchors on the
behavioral body: the 390 viewport, the card open, the drawer over it,
two Escape presses with the one-surface-per-press assertions —
mutation-verified: a hollowed body REDs the new pin while the
title-deep pin stays green, the depth gap live-proven) · **F-271b the
dialect probe can go vacuously green** (the parity-229 zero-config
leg's only assertion passes vacuously if the env example's prose
rewords away the probe token — the re-pick instruction is
comment-only, the F-249b convention-lives-in-comments genus; the
companion leg REDs on the reword until the probe is re-picked) ·
**F-271e the three-step wizard claim rides three carriers against a
two-step UI** (the README feature row, the README API row, and the
skill doc's import paragraph all describe a three-step wizard; the
page renders Step 1 Upload File and Step 2 Review and Import — the
column detection is a synchronous in-pick pass, never a user-visible
step) · **F-271f the README's AI-coach row claims an env-wired LLM
provider that is not wired** (getAiProvider unconditionally returns
the deterministic local engine; the env name exists only as a future
comment — the F-203f adjudication: a named future hook, not a wired
env) · **F-271g the README's goals rows claim contribution
round-trips — no such affordance exists** (the goals API carries CRUD
with an editable saved amount; the UI path is the Edit dialog's Saved
So Far field) · **F-271h the skill doc's focus-ring mechanism is
misdescribed as a base-layer rule** (the base layer only tints the UA
outline color; the house rings ride per-component focus-visible
utilities — an agent adding a control per the doc would skip the
per-control classes, reintroducing the exact class the base rule
never covered) · **F-271i the skill doc's mobile-battery count and
touch-target posture are overstated** (the mobile battery carries 19
checks, not 10, at both citation sites; the tree holds the WCAG
2.5.8 24px floor with the padding extensions on the smallest glyphs —
nav rows are 44px-class, the stock button is 36px, the table actions
28px).

Plus the three riders cured with the round: F-271j the
forgot-password timing rationale cites signup's 409 — signup answers
the duplicate-email case with 400 (the one-word truing) · F-271k the
vendored link variant rides an unregistered sub-AA arm (the amber
primary as text ink measures roughly 2.1 to 1 on the light surface —
the destructive sibling carries the never-inherit-silently warning,
the link arm now carries its own register note) · F-271l the stale
contrast figures (the inactive-tab figure trued to the computed
4.40:1; the KPI delta pair trued to the 600 light / 400 dark arms at
both citation sites, with the reference-genus line trued to name the
reference's own 500-step red and our AA re-pin).

Registered, not cured: the no-doubled-ladder leg's coverage boundary
(F-271m — the contiguous comment-run scope catches the observed
genus), the isClassShaped case sensitivity (F-271n — capitalized
prose hyphenations evade the net; Tailwind utilities are lowercase,
no emission risk), the audit-brief text's public-route enumeration
and outside-close contract text (F-271o/F-271p — both one genus
behind the code, the refresh rides the next dispatch), the filters
Cancel snapshot's dead-by-type fields (F-271q — deliberate, the
comment explains), and the in-band OTP delivery posture (F-271r —
re-verified intact, the standing accepted risk). A tooling note for
future passes: the sandbox's bash display pipeline eats the literal
left-bracket-h sequence — a displayed selector that looks malformed
must be re-verified byte-wise before becoming a finding.

The round changes ZERO application code: the cures are the doc
truing (the skill doc's §8, its stack table, its component
inventory, its import paragraph, its design-genus delta line; the
README's three feature rows and two API rows), one comment truing in
the forgot-password rationale, one register note on the vendored link
variant, and the two pin-depth hardenings (the parity-271 battery's
spec-body depth leg and the dialect-probe companion leg). The
verification contract: the parity-271 battery born honest RED against
the pre-cure tree (the 14 cure legs fail — the false forms ride the
docs at HEAD) with the 2 hardening legs green at birth and
mutation-verified (the hollowed spec body REDs the depth leg while
the title-deep pin stays green; the reworded probe line REDs the
companion) → the cures → parity-271 GREEN · parity-229 GREEN over
the standing walk · parity-270 GREEN (the title pin keeps its place —
the depth leg ADDS teeth, it does not move the old pin) ·
docs-counts GREEN at the advanced trio → lint 0/0 · tsc 0 · the unit
suite at the new count · build · smoke 15/15 · the FULL e2e battery
161/161 (zero UI change, zero new legs — the battery is the standing
proof the doc round changed no behavior) · census MATCH · the
captures (the standing evidence faces — the round's rendered subject
is the documentation set itself, so the captures evidence the
remediated app still renders: the dashboard, the expenses section
with its filters card, the mobile drawer at 390).

§5 carries the execution history.)

"""

p = insert_before(p, "> **Previous version: v2.67.0**", NEW_HEAD, "new-head")

# ---- 2. the §2.29 ledger (before §3's heading) ---------------------------
LEDGER = """### 2.29 Session-271 audit ledger (the fresh-eyes round over the v2.67.0 ship state)

Three Mode-C passes (the R-67 cure surfaces · the API/auth/security
layer · the UI/a11y/shell layer), every material claim re-verified at
file:line by the driving session. The API layer's twenty-fourth
consecutive clean bill is the round's clean column; every finding
lives on the distilled docs, the pins, or the registers.

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-271a | Low | **THE STACKED-ORDER E2E POINTER PIN IS TITLE-DEEP — a gutted leg body would survive every gate.** The parity-270 leg pins only two title strings ("stacked surfaces", "Expense filters"); the leg's behavioral body (the 390 viewport, the card open, the drawer over it, two Escape presses with the one-surface-per-press assertions) could be hollowed to prose while the pin stays green — and E2E_TOTAL rides a hardcoded constant (161), so no count-derived backstop exists either. The e2e leg at HEAD is genuinely behavioral; the defect is pin depth. | `tests/parity-270.test.ts:94-102` (the two toContain strings) vs `tests/e2e/mobile-navigation.spec.ts:86-122` (the behavioral body); `tests/docs-counts.test.ts:21` (the hardcoded total) | **R-68** (the parity-271 depth leg anchors on the body: the 390 viewport pair, the two Escape presses, the group/dialog assertions — mutation-verified: the hollowed body REDs the new pin while the title pin stays green) |
| F-271b | Low | **THE DIALECT PROBE CAN GO VACUOUSLY GREEN.** The parity-229 zero-config leg's only assertion is LIVE_TOKENS-has-zero-config false; if the env example's prose rewords away the probe token, the leg passes vacuously while the hash-dialect arm could regress silently — the re-pick instruction ("pick the next hash-marked-only token and update the literal") is comment-only, the F-249b convention-lives-in-comments genus. Nothing pins the probe token still exists in the file. | `tests/parity-229.test.ts:237-246` (the assertion + the comment-only instruction) vs `.env.example:1,6` (the probe's two hash-marked carriers) | **R-68** (the companion leg: the probe literal must still ride the env example's hash-marked prose — a reword REDs the leg until the probe is re-picked in the same commit) |
| F-271c | Medium | **THE SKILL DOC'S A11Y BATTERY CLAIM IS WRONG ON COUNT AND VIEWPORT.** The §8 opener claims the axe battery runs "10 checks across the section pages + dialogs" at "the 1440×900 and 390×844 viewports". Both numbers are stale: the spec runs 46 tests (45 axe legs — light and dark × desktop and phone across all nine sections, the anonymous faces, the 404, and the open drawer/dialog states — plus the axe-core devDep declaration leg; counted live through the playwright list census) and the desktop viewport is 1280×800 — 1440 belongs to the parity sweeps, a different tool. The skill doc is the document CLAUDE.md directs every session to read before building. | `wealth-os_SKILL.md:479-480` (the claim) vs `tests/e2e/a11y.spec.ts:203` (the 1280×800 setViewportSize) and the live list census (46 tests) | **R-68** (the §8 opener trued to the real shape — the count, the two viewports, the leg families; pinned by the parity-271 source leg) |
| F-271d | Medium | **THE SKILL DOC'S UI INVENTORY NAMES A PRIMITIVE AND FIVE FILES THAT DO NOT EXIST.** Three carriers: the stack table claims the Radix label package among the primitives (no react-label dependency rides package.json — the actual five are dialog, dropdown-menu, popover, select, slot); the component inventory claims 13 ui tsx including card, icons, input, label, and table (the directory holds 8: avatar, badge, button, dialog, dropdown, select, tabs, toast — the five named files are phantoms) with the heading claiming 23 tsx total (the tree holds 18: layout 8 + shared 2 + ui 8); and the §8 labels bullet claims every input pairs with the Radix Label primitive (the vendored input/label stock retired at F-232a — inputs pair plain label htmlFor elements). An agent implementing a form per the skill doc would import a component that is not there. | `wealth-os_SKILL.md:119` (the stack table's label claim), `:327,332` (the inventory heading and row), `:492-494` (the §8 bullet) vs `package.json:32-36` (the actual Radix deps) and the actual directory census (18 tsx) | **R-68** (all four sites trued: the stack table names slot not label, the inventory row reads 8 tsx with the real eight, the heading reads 18 tsx, the §8 bullet describes the htmlFor association and the F-232a retirement; pinned by the parity-271 source legs) |
| F-271e | Low | **THE THREE-STEP WIZARD CLAIM RIDES THREE CARRIERS AGAINST A TWO-STEP UI.** The README feature row, the README API row, and the skill doc's import paragraph all describe a three-step wizard (upload → column detection → review). The page renders exactly two steps — "Step 1: Upload File" and "Step 2: Review & Import" — and the column detection is a synchronous in-pick pass, never a user-visible step. The skill doc and the README even disagree on what the phantom middle step is. | `README.md:39,194` + `wealth-os_SKILL.md:474-475` (the three carriers) vs `src/app/(app)/import/page.tsx:199,265` (the two Step headings) | **R-68** (all three carriers trued to the two-step form with the in-pick detection named; pinned by the parity-271 source legs) |
| F-271f | Low | **THE README'S AI-COACH ROW CLAIMS AN ENV-WIRED LLM PROVIDER THAT IS NOT WIRED.** The feature row says "optional LLM provider via env"; getAiProvider unconditionally returns the deterministic local engine and the env name exists only as a future-comment — the F-203f adjudication already recorded this as a named future hook, not a wired env. A deployer setting the env expects an LLM-backed coach and silently gets the deterministic engine. | `README.md:43` (the claim) vs `src/lib/ai.ts:301-305` (the unconditional localProvider return) | **R-68** (the row trued: the provider seam is reserved but unwired; pinned by the parity-271 source leg) |
| F-271g | Low | **THE README'S GOALS ROWS CLAIM CONTRIBUTION ROUND-TRIPS — NO SUCH AFFORDANCE EXISTS.** The feature row says "progress bars and contribution round-trips" and the API row says "goals carry contribution round-trips"; the goals API carries CRUD with an editable saved amount and the UI path is the Edit dialog's "Saved So Far" field. A reader expects a one-click add-contribution flow that does not exist. | `README.md:41,191` (the two rows) vs `src/app/(app)/goals/page.tsx:303-315` (the Saved So Far edit field) | **R-68** (both rows trued to the editable saved-amount form; pinned by the parity-271 source leg) |
| F-271h | Low | **THE SKILL DOC'S FOCUS-RING MECHANISM IS MISDESCRIBED AS A BASE-LAYER RULE.** The §8 focus bullet claims "a global focus-visible ring in @layer base"; the base layer only tints the UA outline color — no focus-visible rule exists in it. The house rings ride per-component focus-visible utilities (the Button base, the menu item, the select item, every raw control). An agent adding a control per the doc would assume a base-layer ring and skip the per-control classes — reintroducing the exact class the base rule never covered. | `wealth-os_SKILL.md:487-488` (the claim) vs `src/app/globals.css:304-335` (the base layer — outline-color tint only) | **R-68** (the bullet trued: the per-component utilities carry the ring, the base layer tints the UA outline; pinned by the parity-271 source leg) |
| F-271i | Low | **THE SKILL DOC'S MOBILE-BATTERY COUNT AND TOUCH-TARGET POSTURE ARE OVERSTATED.** Two citation sites claim the mobile battery carries 10 checks (it carries 19 — counted live); the touch-target bullet claims "nav rows and buttons meet the 44px-class targets" (nav rows do at roughly 48px; the stock button is 36px, the row actions 32px, the table actions 28px — the tree holds the WCAG 2.5.8 24px floor with the F-235f/F-236d/F-268b padding extensions on the smallest glyphs). | `wealth-os_SKILL.md:499-501,990` (the two count sites + the target claim) vs the live list census (19 tests) and `src/lib/page-layout.ts` (the size constants) | **R-68** (both count sites trued to 19; the target bullet trued to the 24px-floor form with the nav-row 44px-class named; pinned by the parity-271 source legs) |
| F-271j | Informational | **THE FORGOT-PASSWORD TIMING RATIONALE CITES A WRONG STATUS CODE.** The accepted-residual rationale says "signup's 409 openly enumerates by design" — signup answers the duplicate-email case with 400 (ERR.BAD_REQUEST), not 409. Comment-truth drift in a rationale a future enumeration audit would mis-trace. | `src/app/api/auth/forgot-password/route.ts:85` (the citation) vs `src/app/api/auth/signup/route.ts:73` (the 400) | **R-68** (the one-word truing; pinned by the parity-271 source leg) |
| F-271k | Informational | **THE VENDORED LINK VARIANT RIDES AN UNREGISTERED SUB-AA ARM.** The link arm rides the amber primary as its text color — roughly 2.1 to 1 on the light surface (the dashboard's own measured family). The destructive sibling carries the never-inherit-silently contrast warning; the link arm carries only the F-236j zero-consumers register, not the contrast warning. Zero consumers today. | `src/components/ui/button.tsx:92` (the link arm) vs `:76-78` (the destructive sibling's warning form) | **R-68** (the one-line register note mirroring the destructive arm's; pinned by the parity-271 source leg) |
| F-271l | Informational | **THE STALE CONTRAST FIGURES IN THE SKILL DOC'S §8 AND DESIGN-GENUS LINE.** The §8 contrast bullet says the inactive-tab pair "measured 4.0:1" (the trued computed figure is 4.40:1 — the tabs comment's own session-256 truing) and the KPI delta pair is "emerald-700/red-700-class" (the actual pair: emerald-700 + red-600 in light mode with the 400 dark-mode arms); the design-genus line carries the same red-700-class citation about the reference's deltas (the reference's own red sat at the 500 step — our F-218j re-pin darkened it). | `wealth-os_SKILL.md:482-484` + `:93` (the two citation sites) vs `src/components/ui/tabs.tsx:22-24` (the 4.40:1 figure) and `src/components/shared/page-parts.tsx:80-89` (the actual pair) | **R-68** (both sites trued: the computed figure, the 600-light/400-dark pair, the reference's 500-step red with our re-pin named; pinned by the parity-271 source legs) |
| F-271m | Informational | **THE NO-DOUBLED-LADDER LEG'S COVERAGE BOUNDARY.** The dedup sees only contiguous comment-form runs in the docs-counts file; a doubled block split by a code line, in block-comment form, or in another file's ladder evades. The observed genus (the same-anchor adjacent double-append, line-comment form, this file) is fully covered. | `tests/parity-270.test.ts:49-75` (the run-based scanner) | Registered (defense-in-depth gap only; widen if the genus recurs in a new form) |
| F-271n | Informational | **ISCLASSSHAPED IS CASE-SENSITIVE — capitalized prose hyphenations evade the net.** "Self-hosted" (capital S) is not class-shaped while the lowercase form is; Tailwind utilities are lowercase so no emission risk exists. Pre-existing, not R-67-introduced. | `tests/parity-229.test.ts:122-131` (the heuristic) | Registered (case-fold only if the net is ever widened) |
| F-271o | Informational | **THE AUDIT-BRIEF TEXT'S PUBLIC-ROUTE ENUMERATION OMITS THE UPLOADS GET.** The route is deliberately public (the capability-URL posture documented at the route's own head, hardened across F-225i/F-244b/F-245a); no repo doc carries a wrong enumeration (the README says only "unless marked public"). The refresh rides the next audit dispatch, not the tree. | `src/app/api/uploads/[name]/route.ts:13-25` (the documented posture) | Registered (the audit-contract text refresh) |
| F-271p | Informational | **THE STANDING OUTSIDE-CLOSE CONTRACT TEXT IS ONE GENUS BEHIND THE CODE.** The F-217a/F-218b pointerdown-guard doctrine was retired at F-265b: the filters surface is an in-flow expansion card with no outside-pointerdown guard by design; comments and tests match the current behavior. | `src/app/(app)/expenses/page.tsx:80-96,164-217` (the in-flow card) | Registered (the audit-contract text refresh rides the next dispatch) |
| F-271q | Informational | **THE FILTERS CANCEL SNAPSHOT'S DEAD-BY-TYPE FIELDS.** The snapshot is typed over the full filters shape so the budget-tab and search fields must be written, but the cancel path never reads either — deliberate (the tab and search live outside the card; the comment explains). | `src/app/(app)/expenses/page.tsx:231-242` | Registered (the type is the contract; the comment carries the truth) |
| F-271r | Informational | **THE IN-BAND OTP/RESET DELIVERY POSTURE RE-VERIFIED.** While the delivery knobs are unset (the demo default), the signup code and the reset URL ride the response — the documented ADR-014 self-hosted posture with the full mitigation chain intact (hashed-at-rest, the production boot warning, the delivery knobs, the identical no-enumeration envelopes). | `src/app/api/auth/signup/route.ts:163-179` et al. | Standing (the operator duty: set both knobs in any multi-user production deployment) |

Recorded, not cured: the five registers above (F-271m through
F-271r) and one tooling note for future passes — the sandbox's bash
display pipeline eats the literal left-bracket-h sequence, so a
displayed selector that looks malformed must be re-verified
byte-wise before becoming a finding (a near-finding was disproven
exactly this way this round).

"""
p = insert_before(p, "## 3. The remediation program (R-items)", LEDGER, "ledger")

# ---- 3. the R-68 section (above R-67's) ----------------------------------
R68 = """### R-68 — The doc-truth, pin-depth, and register-note round (session 271)

The operator re-sent the standing directive after the R-67 ship pair
(854e9438 + the owner's fbb29c86 session-log update carrying
docs/session_124.md, the owner's session-270 transcript — fetched and
reviewed at intake per the odd-number record convention). Per the
recorded rhythm, findings-led iteration. The intake and the standing
layers are recorded in the version header above; this section carries
the findings, the cures, and the verification contract.

**The findings (each verified at file:line by the driving session —
the API layer's twenty-fourth consecutive clean bill is the round's
clean column; every finding lives on the distilled docs, the pins, or
the registers):** the §2.29 ledger's eighteen rows — F-271c/F-271d
THE TWO MEDIUMS (the skill doc's a11y battery claim wrong on count
and viewport; the skill doc's UI inventory naming a primitive and
five files that do not exist) · F-271a/F-271b THE PIN-DEPTH PAIR (the
stacked-order pointer pin title-deep; the dialect probe
vacuity-prone) · F-271e/F-271f/F-271g THE README FEATURE-TRUTH TRIO
(the three-step wizard, the env-wired LLM provider, the contribution
round-trips) · F-271h/F-271i THE SKILL DOC'S MECHANISM TRUTH (the
focus-ring base-layer claim; the mobile-battery count and
touch-target posture) · F-271j/F-271k/F-271l THE THREE RIDERS (the
409 citation, the link variant's register note, the stale contrast
figures) · F-271m through F-271r the six registers.

**The cures (R-68.2):** the skill doc's §8 trued end to end (the
battery opener — the real count, the two real viewports; the contrast
figures — the computed 4.40:1 and the 600-light/400-dark delta pair;
the focus bullet — the per-component ring with the base layer's
outline-tint role; the labels bullet — the htmlFor association and
the F-232a retirement; the touch-target bullet — the 24px floor with
the nav-row 44px class and the padding extensions) plus its stack
table (slot, not label), its component inventory (the real eight ui
files, the real 18-total), its import paragraph (the two-step
wizard), its design-genus delta line (the reference's 500-step red
with our re-pin), and its second mobile-battery count site; the
README's three feature rows and two API rows trued; the
forgot-password rationale's status citation trued; the vendored link
variant gains its contrast register note; the parity-271 battery
lands the two hardening legs (the spec-body depth anchor, the
dialect-probe companion).

**The verification contract (R-68.3):** the parity-271 battery born
honest RED against the pre-cure tree (the 14 cure legs fail — the
false forms ride the docs at HEAD) with the 2 hardening legs green at
birth and mutation-verified (the hollowed spec body REDs the depth
leg while the title-deep pin stays green — the depth gap
live-proven; the reworded probe line REDs the companion) → the cures
→ parity-271 GREEN · parity-229 GREEN over the standing walk ·
parity-270 GREEN (the title pin keeps its place — the depth leg adds
teeth, it does not move the old pin) · docs-counts GREEN at the
advanced trio (the v2.68.0 block lands together with the advance —
the F-249b structural gate enforces the pairing) → lint 0/0 · tsc 0 ·
the unit suite at the new count · build · smoke 15/15 · the FULL e2e
battery 161/161 (zero UI change, zero new legs — the standing battery
is the proof the doc round changed no behavior) · census MATCH · the
captures (the standing evidence faces: the dashboard, the expenses
section with its filters card, the mobile drawer at 390 — the round's
rendered subject is the documentation set itself, so the captures
evidence the remediated app still renders).

"""
p = insert_before(
    p, "### R-67 — The liveness-fabrication, stacked-escape, and comment-truth round (session 270)",
    R68, "r68-section",
)

# ---- 4. the §5 execution-history row (above v2.67.0's) -------------------
# The row is appended at lockstep time (after the gate runs) so the
# counts and the commit cell carry the verified values. This script
# reserves nothing; see docs-271-lockstep.py.

with open("docs/remediation_plan_v2.md", "w", encoding="utf-8") as f:
    f.write(p)

print("plan v2.68.0 written: head flip + §2.29 ledger + R-68 section")
