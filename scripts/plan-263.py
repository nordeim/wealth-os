#!/usr/bin/env python3
# Session-263 (R-60) plan writer: the version header, the §2.21 audit
# ledger, the R-60 section, and the §5 execution-history row — each edit
# asserted (the docs-243 scoping doctrine: every replacement asserts the
# OLD form inside its slice before writing). The F-247i escape rule: every
# literal pipe inside cell content rides \|\|.
import sys

PATH = "docs/remediation_plan_v2.md"
src = open(PATH, encoding="utf-8").read()
orig = src

# ---- 1. the version header: insert v2.60.0 above, demote v2.59.0 ---------
cur = "> **Current version: v2.59.0** (session 262 — the"
assert src.count(cur) == 1, "v2.59.0 current-version anchor not unique"
NEW_HEADER = """> **Current version: v2.60.0** (session 263 — the
login-ladder, overlay-alpha, and census-truing round R-60: the operator
re-sent the standing directive after the R-59 ship pair (fab41cb9 + the
owner's 1c1f5dcb session-log update carrying docs/session_108.md, the
session-262 transcript capture). Per the recorded rhythm, this session
defaulted to findings-led iteration: refresh, re-audit, remediate,
verify, capture, document, commit, push — with the operator's named
asks (the mobile navigation comparison, the Tailwind v4 state, the
.env/db contract, the vitest/playwright configs, the sitemap/SEO
surface, the .env.example, the screenshots, the SSH-wrapper push)
re-verified along the way. The intake: the workspace PERSISTED (no
sandbox reset this session); refreshed by git pull to HEAD 1c1f5dcb
(the R-59 ship fab41cb9 + the owner's session-log update; tree clean);
the environment verified standing (.env on the
DATABASE_URL="file:../db/custom.db" contract, db/ at the repo root,
census MATCH (80/4/3/6/5/7, users=1), node_modules + the generated
prisma client intact — no cold rebuild required). The cold baseline
gate ran GREEN — the v2.59.0 ship state reproduced exactly, no
discovery: lint 0/0 · tsc 0 · 1814/1814 unit (114 files) · build (the
4 documented Turbopack tracing warnings) · smoke 15/15 · 152/152 e2e ·
census MATCH. The standing asks: probe:ref STABLE on every layer (the
bundle md5 6d3779af… unchanged, the F-250q stylesheet fingerprint
96f24d45… unchanged, the demo data zero, the desktop nav 256/9, the
TRUE-390 menu census standing); THE MOBILE-NAVIGATION COMPARISON
re-run at TRUE 390×844 on BOTH sides (the reference through
agent-browser — the viewport verified by computed innerWidth: the
drawer opens with the 9 destinations + Sign Out and closes on the X
toggle, zero nav destination links in the viewport after the close;
OUR SIDE — the production artifact on the scratch db/comparison.db
per the session-253 toolchain note, booted in a single invocation per
the session-98 server-death lesson — the identical destinations + Sign
Out via the labeled hamburger, the aria-expanded flip Open→Close
navigation menu verified on open AND close, zero visible nav links
after the close — parity plus the documented superset, NO Tailwind v4
regression; both comparison captures re-saved at the standing names,
PNG-valid at the true viewport); `bun audit` unchanged (1 moderate
dev-chain minimatch, the documented deferral); neo-crm unchanged
(b3d0fbe) — nothing to port; the SEO surface verified (smoke leg 12:
sitemap + robots + manifest 200); the .env contract + the db/ at the
repo root + the vitest/playwright configs + the .env.example six-knob
set all standing. The session-263 fresh-eyes audit (three Mode-C
passes: the R-59 cure surfaces driven by the session — the parity-262
battery re-run green 14/14 at HEAD · the API/auth/security layer —
the SIXTEENTH consecutive clean bill (all ten house contracts, 45
handlers / 30 route files read line-by-line, the true census confirmed
by the driving session's own grep; every candidate examined and
dismissed into a documented posture) · the UI/a11y/shell layer —
clean on every named contract with EIGHT new findings — 0 Critical /
0 High / 1 Medium / 5 Low / 2 Informational NEW after dedup): the
round's flagship is THE LOGIN-FAMILY HEIGHT-LADDER PARITY GAP (F-263g
Medium — live-probed on the reference at TRUE widths 390/639/640/
767/768/1280: the sign-in inputs step 44px→48px at the 640px break
and the Sign in submit steps with them, while our LOGIN_LAYOUT
constants render flat 44px — the height step dropped at the WealthOS
rebase while FOUR prose carriers still describe the ladder: the prose
was right, the code was wrong; the gap survived every gate because
the sweep bakes it into the login page's standing baseline allowance).
Its adjudication siblings: F-263i the dialog-overlay alpha (the
comment claims the reference ships a stock 80% black fade; our
constant ships 60%; the live-probed reference overlay computes
rgba(0,0,0,0.5) — BOTH sides were wrong, the constant trues to the
measured 50%). The prose genera: F-263h the select-trigger comment
inverts the live width mechanism (the base CARRIES the full-width
form; the comment claims the inverse and names CRM-era surfaces) ·
F-263j the tabs docblock's equal-width-grid claim (the live track is
the natural-width inline row, as the same docblock's own F-229f note
records) · F-263k the import parse-walk's 5001 figure (the exclusive
slice bound, not a row count; every sibling says 5000) · F-263l the
investment-chip dark-arm span (the "≈2:1" citation understates: the
live-surface recomputation — the 600/700 text steps over each chip's
10% tint composited on the CARD gradient, stone-900/90 over the wash
— spans 2.10–3.42:1; the audit's own first pass assumed a flat
stone-900 card and reported 2.07–2.94:1, the session-262 lesson
recurring: recompute against the LIVE surface) · F-263m the savings
tile's 2.42:1 (computes 2.41:1; the sibling 3.58 verifies exactly).
F-263n the session-262 record's stale handler census (EIGHT carriers
across six files still carry the 40/24 figure — the count
session-261 recorded correctly at 45/30; the session-262 record
regressed to the pre-session-255 era counts — stale at birth, trued
per the F-242j doctrine's honest form). The driving session
re-verified every material claim at file:line, recomputed every
challenged figure in a second engine against the live palette, and
live-probed both adjudication surfaces on the reference. The plan
v2.60.0 written and validated against the tree.

"""
src = src.replace(cur, NEW_HEADER + "> **Previous version: v2.59.0** (session 262 — the", 1)
# the demoted block keeps its full body; only its label flips (the new
# current-version header now sits above it).

# ---- 2. the §2.21 ledger: insert after the §2.20 block's tail -------------
LEDGER_ANCHOR = """## 3. The remediation program (R-items)"""
assert src.count(LEDGER_ANCHOR) == 1, "section-3 anchor not unique"
LEDGER = """### 2.21 Session-263 audit ledger (the fresh-eyes round over the v2.59.0 ship state)

Three Mode-C passes (the R-59 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer); every material
claim re-verified at file:line by the driving session before planning
(the parity-262 battery re-run green 14/14 at HEAD; the API layer's
sixteenth consecutive clean bill — 45 handlers / 30 route files read
line-by-line, the census confirmed by the driving session's own grep;
the UI layer clean on every named contract with eight new findings).
NEW after dedup: 0 Critical / 0 High / 1 Medium / 5 Low /
2 Informational.

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-263g | Medium | **THE LOGIN-FAMILY HEIGHT-LADDER PARITY GAP — the reference's sign-in inputs and submit step 44px→48px at the 640px break; our constants render flat 44px.** Live-probed on the reference at TRUE widths (390/639/640/767/768/1280): the email/password inputs compute 44px below 640 and 48px at ≥640 (the small-breakpoint height step) with the font stepping 16px→14px at 768 (our font ladder already matches); the Sign in submit computes 44px→48px at the same break. Our LOGIN_LAYOUT input and submit constants render the flat 44px height at every width — the height step existed in the CRM era, dropped at the WealthOS rebase (9050b90c ships the flat form), and FOUR prose carriers still describe the ladder (the login-card docblock, the reset-screen docblock, the two login-reset docblocks, plus the login-reset test's own DOM record): the prose was right, the code was wrong. The gap survived every gate: the sweep bakes it into the login/reset-password pages' standing baseline allowances (the pixel diff at the ≥640 classes), and no pin asserts the input geometry. Nine render sites ride the two constants (the sign-in email/password, the reset-screen password/confirm, the Sign in / Reset password / two Back-to-login submits). | `src/lib/page-layout.ts:475-478` (the two constants) · the prose carriers at `src/components/layout/login-card.tsx:54` · `src/components/layout/reset-password-screen.tsx:22` · `src/lib/login-reset.ts:110,190` | **cured in R-60** (both constants regain the height step — the four prose carriers and the DOM record become true with no prose edit; the login/reset-password sweep baselines re-derived same-commit) |
| F-263h | Low | **THE SELECT-TRIGGER COMMENT INVERTS THE LIVE WIDTH MECHANISM AND NAMES CRM-ERA SURFACES.** The comment claims the trigger base carries no full width and that surfaces add their own ("270px rails" / a toolbar form this tree does not carry); the live base CARRIES the full-width form, and the tree's one custom-width select surface (the analytics period select) overrides it through its cn appendage — the merge resolves the pair. Zero live carriers of the cited example forms exist in src. A reader truing the code to the comment would collapse every dialog/settings select to natural width. | `src/components/ui/select.tsx:27-29` vs the constant at `src/lib/page-layout.ts:375` | **cured in R-60** (the comment reworded to the live mechanism — the base carries the full-width form, the one custom-width surface overrides through the merge) |
| F-263i | Low | **THE DIALOG-OVERLAY ALPHA — the comment claims a stock 80% black fade, the constant ships 60%, and the live reference computes 50%.** Live-probed on the reference's open Add Expense dialog: the overlay is a full-viewport fixed layer computing rgba(0,0,0,0.5) — the measured 50% black wash (no backdrop blur, which the comment already records correctly). Our DIALOG_OVERLAY constant ships the 60% form — a parity drift on a surface invisible to every gate (the sweeps capture settled pages with dialogs closed). Both sides of the citation were wrong; the constant trues to the measured form. No test pins the current value. | `src/lib/page-layout.ts:302-303` (the constant) · `src/components/ui/dialog.tsx:22-23` (the comment) | **cured in R-60** (the constant trued to the measured 50% form; the comment reworded to the live-probed measurement) |
| F-263j | Low | **THE TABS DOCBLOCK'S EQUAL-WIDTH-GRID CLAIM — the live track is the natural-width inline row.** The docblock says the reference track is "the equal-width grid"; the live TABS_SEGMENTED track is the inline natural-width form, and the SAME docblock's own F-229f note six lines below records that the grid claim was factually wrong — the two notes contradict each other in one docblock. The grid-track description is the surviving citation of the CRM-era mechanism; the WealthOS-era constant was re-derived as the inline form at the rebase. | `src/components/ui/tabs.tsx:12-13` vs the constant at `src/lib/page-layout.ts:427` | **cured in R-60** (the docblock trued to the live genus — the natural-width inline row on the muted-surface wash) |
| F-263k | Low | **THE IMPORT PARSE-WALK'S 5001 FIGURE — the exclusive slice bound cited as a row count.** The comment says the eager parse "walks up to 5001 rows"; the walk is slice(1, 5001) — at most 5000 data rows (indices 1–5000). Every sibling citation of the same contract says 5000 (the expenses page comment, the import route's docblock, the schema's max bound). A reader reconciling the three citations finds a one-row discrepancy with no code change behind it. | `src/app/(app)/import/page.tsx:252` vs the walk at `:128` | **cured in R-60** (the figure trued to 5000 — the exclusive bound described in words, never re-cited as a count) |
| F-263l | Low | **THE INVESTMENT-CHIP DARK-ARM SPAN — the "≈2:1" citation understates both ends.** Recomputed by the driving session in a second engine against the LIVE surface (the 600/700 text steps over each chip's 10% tint composited on the CARD gradient — stone-900/90 over the dark wash — at both gradient ends): the span is **2.10–3.42:1** (stock 2.35–2.68, etf 2.80–3.21, bond 2.97–3.42, crypto 2.25–2.55, realestate 2.54–2.89, other 2.10–2.39 across the gradient). The audit's own first pass assumed a flat stone-900 card and reported 2.07–2.94:1 — the session-262 lesson recurring (recompute against the live surface, never the recalled one); the driving session's recomputation is the trued form. The conclusion (sub-4.5:1 text bar on every member — the 400-level textDark arms exist for that reason) is unchanged. TWO carriers (the constants block and the investments page's twin comment). | `src/lib/constants.ts:114-117` · `src/app/(app)/investments/page.tsx:301-304` | **cured in R-60** (both carriers trued to the per-type span with the gradient noted) |
| F-263m | Informational | **THE SAVINGS TILE'S 2.42:1 — computes 2.41:1.** The iconLight comment cites "savings at 2.42:1"; #10b981 on the soft tile #ecfdf5 computes 2.408 → 2.41:1 (recomputed in the second engine; the sibling #059669 figure in the same comment verifies exactly at 3.58:1, which pins the method). A 0.01 mis-citation at the rounding floor — the same genus as the R-59 truing set. | `src/lib/constants.ts:12` | **cured in R-60** (the figure trued to 2.41:1) |
| F-263n | Low | **THE SESSION-262 RECORD'S STALE HANDLER CENSUS — EIGHT carriers across six files carry the 40/24 figure; the true census is 45 handlers / 30 route files.** Session-261's record carries the correct 45/30 (confirmed by grep census then and re-confirmed by the driving session this session); the session-262 record regressed to the pre-session-255 era figure — stale at birth (the tree at session 262 had exactly the 45 handlers / 30 route files it has now). The genus: the plan's v2.59.0 version header, the §2.20 ledger header, and the §5 execution-history row; the session record (docs/session_107.md); the worklog's session-262 entry; the README program row; the PAD's overview line. A future audit comparing the record against the tree would find a five-handler/four-file discrepancy that never existed. | `docs/remediation_plan_v2.md:1567,3644,8194` · `docs/session_107.md` · `worklog.md` (the session-262 entry) · `README.md:225` · `Project_Architecture_Document.md:24` | **cured in R-60** (all eight carriers trued to 45/30 per the F-242j stale-at-birth doctrine) |

Recorded, not cured: F-257a and F-257r (the standing registers,
plan §2.15), the ai-coach `history` caution (the R-5 register — the LLM
provider's wiring must treat the field as client-supplied untrusted
input), the sidebar h2-before-h1 observation (the reference's own
construction), plus the standing families (F-252k, F-251i-k, F-250h-p,
F-249j-n, F-248h-n, F-247g-l, F-246g/h, F-245g/h, F-244i-n, F-242h/i,
F-240k-n, F-239l-s — plan §2.12's register), plus the toolchain note
(the agent-browser/HeadlessChrome-157 dev-build hydration gap — session
253; re-confirmed this session: the clone-side comparison rode the
production artifact cleanly, the reference side rode agent-browser).
Next session defaults to findings-led iteration — re-send the standing
directive to continue the rhythm.

"""
src = src.replace(LEDGER_ANCHOR, LEDGER + LEDGER_ANCHOR, 1)

# ---- 3. the R-60 section: insert above R-59 -------------------------------
R59_HEAD = "### R-59 — The description-length, muted-figure, and citation-completion round (session 262)"
assert src.count(R59_HEAD) == 1, "R-59 section head not unique"
R60 = """### R-60 — The login-ladder, overlay-alpha, and census-truing round (session 263)

The operator re-sent the standing directive after the R-59 ship pair
(fab41cb9 + the owner's 1c1f5dcb session-log update carrying
docs/session_108.md, the session-262 transcript capture). Per the
recorded rhythm, findings-led iteration. The intake and the standing
layers are recorded in the version header above; this section carries
the findings, the cures, and the verification contract.

**The findings (each verified at file:line by the driving session —
both adjudication surfaces live-probed on the reference at TRUE
widths, every challenged figure recomputed by code in a second engine
against the LIVE palette and surfaces):** the §2.21 ledger's eight
rows — F-263g the login-family height-ladder parity gap (the
reference's inputs AND submit step 44px→48px at the 640px break; our
constants flat — the round's flagship, a CLASS cure with the four
prose carriers already describing the truth), F-263h the
select-trigger comment's inverted width mechanism, F-263i the
dialog-overlay alpha (the constant trues 60%→the measured 50%),
F-263j the tabs docblock's equal-width-grid claim, F-263k the import
parse-walk's 5001 figure, F-263l the investment-chip dark-arm span
(the live-surface recomputation 2.10–3.42:1 — the audit's flat-card
assumption corrected), F-263m the savings tile's 2.42→2.41, F-263n
the session-262 record's stale 40/24 handler census (eight carriers,
the true census 45/30).

**The cures (R-60.2):** the two LOGIN_LAYOUT constants regain the
small-breakpoint height step (the input and the submit — nine render
sites across the login card and the reset screen; the font ladder
already matched; the four prose carriers and the login-reset DOM
record become true with no prose edit) · the DIALOG_OVERLAY constant
trues to the measured 50% black form with the dialog.tsx comment
reworded to the live-probed measurement (no class-shaped tokens in
the cure comments — the F-229d discipline) · the select-trigger
comment reworded to the live width mechanism (the base carries the
full-width form; the one custom-width surface overrides through the
merge) · the tabs docblock trued to the natural-width inline row ·
the import parse-walk figure trued to 5000 · both investment-chip
dark-arm carriers trued to the per-type span (2.10–3.42:1 across the
card gradient) · the savings figure trued to 2.41:1 · the eight
handler-census carriers trued to 45/30. The two CLASS cures touch
swept parity surfaces (the login/reset-password pages at the ≥640
classes; the dialog overlay rides no swept face — dialogs are closed
in every settled capture), so the six parity drift gates re-run this
session with the login/reset-password baseline literals re-derived
same-commit (the R-7.10/F-238a doctrine).

**The verification contract (R-60.3):** the parity-263 battery born
honest RED against the pre-cure tree (the two login-ladder legs · the
overlay-alpha leg · the select-comment leg · the tabs-grid leg · the
import-walk leg · the two chip-span legs · the savings-figure leg ·
the census-genus legs across the six carrier files, with the
font-ladder and DOM-record riders green-by-design) → the cures →
parity-263 GREEN → lint 0/0 · tsc 0 · the unit suite at the new
count · build · smoke 15/15 · the FULL e2e battery 152/152 · census
MATCH · the six parity drift gates at the four sweep classes + the
fullpage axis + the interior census (the login/reset-password
baselines re-derived; the interior census unchanged — no DOM elements
added or removed) · the captures (the login-input ladder face — the
inputs and submit asserted live at 48px at the desktop width on the
clone, the round's headline surface; the open-dialog overlay face at
the measured alpha; the standing mobile drawer at 390 with the
9-destination + Sign Out census) + the two comparison captures at
TRUE 390×844 (re-saved this session at the standing names).

"""
src = src.replace(R59_HEAD, R60 + R59_HEAD, 1)

# ---- 4. the §5 execution-history row: insert at the table head -------------
HIST_ANCHOR = "| v2.59.0 | 262 |"
assert src.count(HIST_ANCHOR) == 1, "v2.59.0 history row anchor not unique"
ROW = """| v2.60.0 | 263 | **R-60** (the login-ladder, overlay-alpha, and census-truing round — findings-led, the standing directive with the reference STABLE on every standing drift layer and the mobile-navigation ask verified on BOTH sides at TRUE 390×844 (the reference through agent-browser; the clone side riding the production artifact on the scratch db/comparison.db per the session-253 toolchain note, booted in a single invocation per the session-98 server-death lesson — the aria-expanded flip verified on open AND close, zero visible nav links after the close); the cold baseline GREEN at HEAD 1c1f5dcb — the v2.59.0 ship state reproduced exactly, no discovery). The audit round: the standing layers re-verified (probe:ref STABLE — the bundle md5, the F-250q stylesheet fingerprint, the demo data zero, the desktop nav 256/9, the TRUE-390 menu census; `bun audit` unchanged (1 moderate dev-chain minimatch, the documented deferral); neo-crm unchanged (b3d0fbe); the SEO surface verified (smoke leg 12); the .env contract + the db/ at the repo root + the vitest/playwright configs + the .env.example six-knob set all standing). The session-263 fresh-eyes audit (three Mode-C passes: the R-59 cure surfaces — the parity-262 battery re-run green 14/14 · the API/auth/security layer — the SIXTEENTH consecutive clean bill (all ten house contracts, 45 handlers / 30 route files, the census confirmed by the driving session's own grep; every candidate dismissed into a documented posture) · the UI/a11y/shell layer — clean on every named contract, eight new findings): 0 Critical / 0 High / 1 Medium / 5 Low / 2 Informational NEW after dedup, every material claim re-verified at file:line by the driving session — both adjudication surfaces LIVE-PROBED on the reference (the login-family inputs and submit measured at TRUE widths 390/639/640/767/768/1280: the 44px→48px step at the 640px break; the open-dialog overlay measured at rgba(0,0,0,0.5)), and every challenged figure recomputed in a second engine against the LIVE palette and surfaces (the chip dark-arm span corrected from the audit's flat-card 2.07–2.94 to the live-gradient 2.10–3.42:1 — the session-262 lesson recurring). THE ROUND'S FINDINGS: F-263g the login-family height-ladder parity gap · F-263h the select-trigger comment's inverted width mechanism · F-263i the dialog-overlay alpha (both sides wrong — the constant trues to the measured 50%) · F-263j the tabs docblock's equal-width-grid claim · F-263k the import parse-walk's 5001 figure · F-263l the investment-chip dark-arm span · F-263m the savings tile's 2.42→2.41 · F-263n the session-262 record's stale 40/24 handler census (eight carriers trued to 45/30). The plan v2.60.0 written and validated against the tree. **R-60.1** the pins born RED (the parity-263 battery — the login-ladder legs, the overlay-alpha leg, the select-comment leg, the tabs-grid leg, the import-walk leg, the chip-span legs, the savings leg, the census-genus legs) → **R-60.2** the cures (the two login constants + the overlay constant + the five prose genera + the eight census carriers) → **R-60.3** the verification (parity-263 GREEN · lint 0/0 · tsc 0 · the unit suite at the new count · build · smoke 15/15 · 152 e2e · census MATCH · the six parity drift gates re-run with the login/reset-password baselines re-derived same-commit; the captures — the login-input ladder face at 48px, the open-dialog overlay face, the standing mobile drawer at 390) | lint 0/0 · tsc 0 · **(the unit count lands with the battery)** · build · smoke 15/15 · **152 e2e** · census MATCH | (this session's execution commit) |
"""
src = src.replace(HIST_ANCHOR, ROW + HIST_ANCHOR, 1)

# ---- 5. the stale-census carriers inside the plan itself (F-263n) ----------
# The v2.59.0 header block, the §2.20 ledger header, and the §5 row —
# each asserted-sliced before replacement (the F-242j scoping doctrine:
# slice per-section, assert the OLD form inside the slice).
plan_carriers = src.count("40 handlers / 24 route files")
assert plan_carriers == 3, f"expected 3 plan carriers of the stale census, saw {plan_carriers}"
src = src.replace("40 handlers / 24 route files", "45 handlers / 30 route files")

if src == orig:
    print("NO EDITS APPLIED — anchors all matched but replacements were no-ops?!", file=sys.stderr)
    sys.exit(1)

open(PATH, "w", encoding="utf-8").write(src)
print("plan v2.60.0 written: version header + §2.21 ledger + R-60 section + §5 row + the 3 in-plan census carriers trued")
