#!/usr/bin/env python3
"""Session-275 plan write — remediation_plan_v2.md v2.71.0 → v2.72.0
(R-72, the docblock-tail, pipe-truth, and gate-coverage round).

Insertions only, every site asserted (the F-242j lesson): the new
Current-version header block (the v2.71.0 block flips to Previous),
the §2.33 ledger (before §3's heading), and the R-72 section (above
R-71's). The §5 execution-history row rides scripts/history-275.py at
lockstep time (after the gate runs, so the counts carry the verified
values)."""

import sys


def insert_before(text: str, anchor: str, block: str, label: str) -> str:
    n = text.count(anchor)
    if n != 1:
        sys.exit(f"[{label}] expected 1 anchor, found {n}: {anchor[:60]!r}")
    return text.replace(anchor, block + anchor, 1)


with open("docs/remediation_plan_v2.md", encoding="utf-8") as f:
    p = f.read()

# ---- 1. the head: flip v2.71.0 to Previous, insert v2.72.0 above it -----
CUR_HEAD = "> **Current version: v2.71.0** (session 274 — the"
if p.count(CUR_HEAD) != 1:
    sys.exit("[head] the v2.71.0 Current header not found in the expected form")
p = p.replace(CUR_HEAD, "> **Previous version: v2.71.0** (session 274 — the", 1)

NEW_HEAD = """> **Current version: v2.72.0** (session 275 — the
docblock-tail, pipe-truth, and gate-coverage round R-72: the
operator re-sent the standing directive after the R-71 ship pair
(852c6836 + the owner's c18aabf8 session-log update carrying
docs/session_132.md, the session-274 transcript — fetched by the
git-pull refresh and reviewed at intake per the odd-number record
convention, this record riding docs/session_133.md). Per the
recorded rhythm, findings-led iteration: refresh, re-audit,
remediate, verify, capture, document, commit, push — with the
operator's named asks (the mobile navigation comparison, the
Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.)

The intake: the workspace STOOD (no reset this session — the tree
clean at HEAD c18aabf8 after the git-pull refresh brought the
owner's session-log update; the environment verified in place: the
.env on the DATABASE_URL="file:../db/custom.db" contract, db/ at the
repo root, node_modules live, census MATCH (81/4/3/6/5/7, users=1)).

THE COLD BASELINE GATE GREEN AT HEAD — the v2.71.0 ship state
reproduced exactly, no discovery: lint 0/0 · tsc 0 · 1990/1990 unit
(126 files) · build (the 4 documented Turbopack tracing warnings) ·
smoke 15/15 · 161/161 e2e · census MATCH.

The standing layers: probe:ref STABLE on every layer (the app
bundle 1,402,874 bytes / md5 6d3779af…, the stylesheet md5 96f24d45…,
the demo-data ZERO census, the desktop nav census 256px · 9 links,
the TRUE-390 menu census opens=true · 9 destinations) · **the
mobile-nav comparison verified on BOTH sides at TRUE 390×844** (the
reference through probe:ref's TRUE-390 menu census; the clone side
riding the standing comparison-265.ts on the production artifact
over the scratch db/comparison.db — pre-open 0 · 9 destinations +
Sign Out · aria-expanded true→false · post-close 0 · census
tripwire MATCH · no Tailwind v4 regression) · `bun audit` UNCHANGED
(the 1-advisory dev-chain census the R-69 re-anchor carries — the
minimatch moderate, zero runtime) · neo-crm unchanged (b3d0fbe) ·
the SEO surface verified (smoke leg 12: sitemap + robots + manifest
200; the metadata/pwa/page-titles pins green inside the 1990) · the
.env contract + the db/ at the repo root + the vitest/playwright
configs + the .env.example standing.

The session-275 fresh-eyes audit (three Mode-C research passes
dispatched as parallel research subagents per the house convention,
every material claim re-verified at file:line by the driving
session — the R-71 cure surfaces: all five HOLDING (the parity-274
battery 9/9, parity-273 9/9, parity-229 23/23, parity-243 14/14,
docs-counts 18/18 re-run green — 73/73 across the five; the
P-code instanceof census over the whole tree clean; the docs count
family aligned) · the API/auth/security layer: the TWENTY-EIGHTH
consecutive clean bill (all thirteen house contracts, 45 handlers /
30 route files read line-by-line, the route census re-verified at
exactly 30; every candidate dismissed into documented postures) ·
the UI/a11y/shell layer: all eight standing contracts verified
holding live (the drawer mechanics with the stacked guard, the theme
system with the bootstrap equivalence, the v4 scanner discipline,
the a11y two-gate with the scrollThrough helper, the shell twins,
the geometry pin, the date seams, the escape stacking)). The genuine
rot this round: FOUR LOW findings (one in the vendored dialog
header's mechanism tail, one a broken PAD table row, one a
gate-coverage claim gap, one the F-221f letter in the open-state
legs) and the registered notes — 0 Critical / 0 High / 0 Medium /
4 Low / 11 Informational NEW after dedup, every material claim
re-verified at file:line.

The round's flagship: **F-275a the DialogHeader docblock's opacity
tail — the F-274b genus one file over from the R-71 flagship.** The
vendored dialog header's session-229 reword left standing a
parenthetical from session 15 — "(the X is the opacity pattern
now)" — while F-221l retired the opacity dimming for contrast 53
sessions ago: DIALOG_CLOSE rides the full stone ink with a
text-color hover, and the constant's own comment carries the
measured ratios. A maintainer "restoring" the documented opacity
pattern would regress the F-221l 3:1 non-text contrast cure — the
comment is an active misdirection naming a mechanism the code does
not follow.

The round's riders: **F-275b the PAD §7.1 domain-seams row's
unescaped pipes** (three bare pipes inside the code span split the
row into eight cells in GFM — the F-247i genus; the row renders
garbled and the cell arithmetic pin matches only the leading cells,
so the rot was invisible to every gate) · **F-275c the a11y
two-gate's coverage truth** (the blanket axe run carries no runOnly,
so it evaluates the engine's DEFAULT-ENABLED set — the WCAG
2.0/2.1 A and AA rules — while the doc set claims "WCAG 2.2 AA";
the 2.2-only target-size criterion ships DISABLED BY DEFAULT in
axe-core 4.14 and rides only the bespoke hit-area pins; the cure is
the spec-header precision note, not opting the rule in — the
reference's own parity-mandated small controls would trip it) ·
**F-275d the three open-state a11y legs skip the scroll helper**
(the F-221f letter says "before every axe run" — the drawer leg,
the Add Expense leg, and the Accounts dark-dialog leg call the gate
directly; the modal scroller locks make the helper a no-op today,
but a tall dialog at phone widths would slip the leg; the calls land
for uniformity). Registered: F-275e cured as the doc-truth rider
(the AGENTS F-217a entry gains the genus-retirement cross-ref — the
Expenses popover genus retired at F-265b for the in-flow expansion
card; the lesson binds portaled surfaces generally), F-275f the
parity-229 splitter blind spot (documented in the net's own
docblock — no cure), plus the pass-B informational postures (the
login-acct availability trade, the reset literal check, the
dedicated-bucket census wording, the seed-script PrismaClient
exception, the three structural casts, the unlogged-surface
register, the bootstrap script element).

The execution contract (R-72): the plan v2.72.0 written and
validated against the tree (this script, insertions only, every
anchor asserted) → **R-72.1** the pins born honest RED (the
parity-275 battery — 6 legs over the false and missing forms at
HEAD) → **R-72.2** the cures (the dialog header's mechanism-truth
reword; the PAD row's pipes escaped; the a11y spec header's
coverage note; the three open-state legs' scroll calls; the AGENTS
entry's cross-ref) → **R-72.3** the verification (parity-275 GREEN ·
the sibling batteries GREEN · docs-counts GREEN at the advanced
trio (the v2.72.0 block lands together with the advance — the
F-249b structural gate enforces the pairing) · lint 0/0 · tsc 0 ·
the unit suite at the new count · build · smoke 15/15 · the FULL
e2e battery 161/161 (zero new legs — the round changes comments,
one doc table row, and no-op test calls; no swept surface moves, no
pixel can shift) · census MATCH · the captures (the standing
evidence faces + the round's touched faces — the dialog family's
own face, the drawer at 390, the flagship dashboard).

"""

p = insert_before(p, "> **Previous version: v2.71.0**", NEW_HEAD, "new-head")

# ---- 2. the §2.33 ledger (before §3's heading) ---------------------------
LEDGER = """### 2.33 Session-275 audit ledger (the fresh-eyes round over the v2.71.0 ship state)

Three Mode-C passes (the R-71 cure surfaces · the API/auth/security
layer · the UI/a11y/shell layer) + the driving session's own
re-verification, every material claim re-verified at file:line. The
API layer's twenty-eighth consecutive clean bill and the UI layer's
eight standing contracts are the round's clean columns; the genuine
rot is one stale mechanism tail, one broken table row, one
gate-coverage gap, and one letter-level helper skip.

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-275a | Low | **THE DIALOGHEADER DOCBLOCK'S OPACITY TAIL — THE F-274b GENUS ONE FILE OVER FROM THE R-71 FLAGSHIP.** The vendored dialog header's session-229 reword corrected the title-alignment claim but left standing the session-15 parenthetical "(the X is the opacity pattern now)" — while F-221l (session 221) retired the opacity dimming for the 3:1 non-text contrast bar: DIALOG_CLOSE rides `text-stone-500` at full opacity with `transition-colors` text-color hovers (`hover:text-stone-600`, the 400/300 dark arms), and the constant's own comment carries the measured ratios (stone-500 computes 4.80:1 on the white card). The parenthetical has been false for ~53 sessions and survived the R-71 doc-truth round (the F-274b cure read the drawer file, never the vendored dialog header). A maintainer "restoring" the documented pattern would regress the F-221l cure — an active misdirection. | `src/components/ui/dialog.tsx:83-84` (the claim) vs `src/lib/page-layout.ts:330-346` (DIALOG_CLOSE's truth) | **R-72** (the parenthetical reworded to the mechanism truth — the full stone ink, a hover one step deeper in each mode, the F-221l citation; pinned by the parity-275 dialog-header legs) |
| F-275b | Low | **THE PAD §7.1 DOMAIN-SEAMS ROW CARRIES THREE UNESCAPED PIPES INSIDE ITS CODE SPAN** — the F-247i genus. The row's location cell reads `tests/finance\\|ai\\|…` in the raw form (bare pipes), which GFM splits into eight cells on a five-column table — the row renders garbled and the cell content bleeds. The docs-counts arithmetic leg matches only the leading cells (`\\| — domain seams \\| (\\d+) \\|`), so the rot was invisible to every gate. The plan-writer's own F-247i lesson prescribes the escape (`\\|` inside the code span); the row predates the lesson and was never swept. | `Project_Architecture_Document.md:3854` (the §7.1 domain-seams row) | **R-72** (the pipes escaped inside the code span — the row renders five columns; pinned by the parity-275 pipe-truth leg) |
| F-275c | Low | **THE A11Y TWO-GATE'S COVERAGE CLAIM OUTRUNS WHAT THE BLANKET RUN EVALUATES.** `runAxe` calls `axe.run()` with no options, which evaluates the engine's DEFAULT-ENABLED set — the WCAG 2.0/2.1 A and AA rules — while the doc set claims "WCAG 2.2 AA" (README:47, AGENTS:99, SKILL §8). axe-core 4.14 ships exactly one wcag22aa-tagged rule (target-size) and it is disabled by default (`enabled:!1`, verified in the vendored axe.min.js registration); 2.5.8 rides only the bespoke hit-area pins (the F-268b switch leg, the dialog-close and toast-dismiss targets). Opting the rule into the blanket gate would trip the reference's own parity-mandated small controls — the honest cure is the spec-header precision note (the design target vs the executable floor). | `tests/e2e/a11y.spec.ts:86-97` (runAxe) vs README:47 / AGENTS:99 / wealth-os_SKILL.md:475 | **R-72** (the spec header gains the coverage-truth note — the default-enabled set named, the 2.2-only criteria's bespoke-pin register cited; pinned by the parity-275 coverage leg) |
| F-275d | Low | **THE THREE OPEN-STATE A11Y LEGS SKIP THE SCROLL HELPER — the F-221f letter says "before every axe run".** The drawer-open leg (:290-298), the Add Expense dialog leg (:300-308), and the Accounts dark-dialog leg (:364-380) call `assertTwoGate(await runAxe(page))` directly while every other leg in the file carries `await scrollThrough(page)` first. No impact today (the modal surfaces lock the main scroller — the drawer's own lock, Radix's body lock — making the helper a no-op) but a dialog that ever grows tall at phone widths would slip its leg. | `tests/e2e/a11y.spec.ts:290-298, 300-308, 364-380` | **R-72** (the three legs gain the helper call with the modal-rationale comment — uniformity by construction; pinned by the parity-275 per-leg source pins) |
| F-275e | Informational | **THE AGENTS F-217a GOTCHA READS AS A STANDING CONTRACT FOR A GENUS THAT RETIRED.** The entry describes the Expenses filters popover's outside-close guard mechanics (the portal exclusions, the trigger-scoped pointerdown) in the present tense; session 265 (F-265b) rebuilt the surface as the reference's in-flow expansion card and both guards retired WITH the genus — pinned in tests/expenses-popover.test.ts:5-16 and parity-265. A future contributor reading the ledger would hunt for guards that intentionally no longer exist. | `AGENTS.md:228-238` (the F-217a entry) vs `src/app/(app)/expenses/page.tsx:164-174` (the F-265b re-scope) | **R-72, the doc-truth rider** (the entry gains the genus-retirement cross-ref — the lesson binds portaled surfaces generally; pinned by the parity-275 cross-ref leg) |
| F-275f | Informational | **THE PARITY-229 SPLITTER'S QUOTE-BEARING-REGEX BLIND SPOT** — documented in the net's own docblock (csv.ts's character-class regex mis-tracks the string spans; docblock text in the swallowed span lands on the live side). No class-shaped tokens ride the affected spans today (independently grepped). | `src/lib/csv.ts:44` vs `tests/parity-229.test.ts:486-494` | Registered (the splitter is load-bearing; the before/after build probe is the standing proof form) |
| F-275g | Informational | **THE LOGIN PER-ACCOUNT BUCKET IS THIRD-PARTY-EXHAUSTABLE** — a caller who knows a victim's email can burn the 30-slot `login-acct` bucket and 429 legitimate logins for the window. The documented availability-for-integrity trade (F-224k), mirrored by the verify/resend/forgot secondaries. | `src/app/api/auth/login/route.ts:44-54` | Registered (the documented trade) |
| F-275h | Informational | **THE RESET CONFIRM CHECK IS THE ONE NON-ZOD LITERAL** — `body.confirm !== "RESET"` (strict equality, bounded reader, the F-269f claimed exception). No coercion surface. | `src/app/api/reset/route.ts:35` | Registered (the documented exception) |
| F-275i | Informational | **THE BUCKET CENSUS'S PRECISE SHAPE: 20 writes-BUCKET MUTATORS + 4 DEDICATED-BUCKET MUTATORS** — import (5/15), reset (3/15), upload (20/15), and coach (30/15) carry their own buckets rather than additionally riding writes 60/15; each is equal or stricter for its surface. The house-contract enumeration names the CRUD family precisely; recorded so the census language stays exact. | `src/app/api/import/route.ts:23` et al. | Registered (the wording note) |
| F-275j | Informational | **THE SEED SCRIPT'S RAW PRISMACLIENT IS THE DOCUMENTED STANDALONE-SCRIPT EXCEPTION** — prisma/seed.ts:20 constructs the client directly (the auth.ts import is impossible from the bare script); it always routes through runtimeDatabaseUrl(), closing the mirror-db risk. The three `as unknown as` structural casts (db.ts globalThis, the store namespace, the toast listener cleanup) are the idiomatic singleton forms; zero `any` in src. | `prisma/seed.ts:20`; `src/lib/db.ts:20`; `src/stores/wealthos-store.ts:729`; `src/components/ui/toast.tsx:61` | Registered (the documented exceptions) |
| F-275k | Informational | **THE UNLOGGED/UNBUCKETED SURFACES STAND DOCUMENTED** — the uploads GET ENOENT stays out of the error log (the scan-rate rationale), /api/health and /api/auth/me are the recorded unbucketed public families, the light family GETs ride the F-222p per-navigation class, and the layout's one script element is the hardcoded no-FOUC bootstrap (zero dynamic interpolation). | `src/app/api/uploads/[name]/route.ts:56-58` et al. | Registered (the documented postures) |

Recorded, not cured: F-275f through F-275k. The audit's clean
columns: the API/auth/security layer's twenty-eighth consecutive
clean bill (thirteen contracts, 45 handlers / 30 route files — the
census re-verified at exactly 30 this round) and the UI/a11y/shell
layer's eight standing contracts all holding live. The round also
re-confirmed the standing registered postures (the ADR-014 in-band
OTP/reset delivery, the capability-URL publicity, the CSP
fetch-directive pin, the scrypt promisification, the empty-PUT
guard, the clear-era contract, the burn-order doctrine).

"""

p = insert_before(p, "## 3. The remediation program (R-items)", LEDGER, "ledger")

# ---- 3. the R-72 section (above R-71's) ----------------------------------
R72 = """### R-72 — The docblock-tail, pipe-truth, and gate-coverage round (session 275)

The operator re-sent the standing directive after the R-71 ship pair
(852c6836 + the owner's c18aabf8 session-log update carrying
docs/session_132.md, the session-274 transcript — fetched by the
git-pull refresh and reviewed at intake per the odd-number record
convention). Per the recorded rhythm, findings-led iteration. The
intake and the standing layers are recorded in the version header
above; this section carries the findings, the cures, and the
verification contract.

**The findings (each verified at file:line by the driving session —
the API layer's twenty-eighth consecutive clean bill and the UI
layer's eight standing contracts are the round's clean columns; the
genuine rot is one stale mechanism tail, one broken table row, one
gate-coverage gap, one letter-level helper skip, and one
ledger-entry genus drift):** the §2.33 ledger's rows — F-275a THE
ROUND'S FLAGSHIP (the DialogHeader docblock's opacity tail — the
F-274b genus one file over: the session-15 parenthetical claims the
close X rides the opacity pattern while F-221l retired the dimming
53 sessions ago; the constant's own comment carries the measured
ratios) · F-275b THE PIPE TRUTH (the PAD §7.1 domain-seams row's
three unescaped pipes split the five-column row into eight cells in
GFM — the F-247i genus, invisible to the arithmetic pin that matches
only the leading cells) · F-275c THE GATE-COVERAGE TRUTH (the
blanket axe run evaluates the default-enabled 2.0/2.1 set while the
docs claim 2.2 AA; the 2.2-only target-size rule ships disabled in
axe-core 4.14 and rides the bespoke pins — the cure is the
spec-header precision note, not opting the rule in) · F-275d THE
HELPER LETTER (the three open-state legs skip the scroll helper the
F-221f doctrine names — no-op today behind the modal scroller locks,
uniformity by construction tomorrow) · F-275e THE CROSS-REF RIDER
(the AGENTS F-217a entry reads as a standing contract for the
popover genus that retired at F-265b).

**The cures (R-72.2):** the dialog header's parenthetical rewords to
the mechanism truth (the full stone ink, a hover one step deeper in
each mode, the F-221l citation — the F-229d discipline binds the
reword: describe, never coin); the PAD row's pipes escape inside the
code span (the row renders five columns); the a11y spec header gains
the coverage-truth note (the default-enabled set named, the
2.2-only criteria's bespoke-pin register cited, the design target
vs the executable floor); the three open-state legs gain the scroll
helper call with the modal-rationale comment; the AGENTS entry gains
the genus-retirement cross-ref (the lesson binds portaled surfaces
generally).

**The verification contract (R-72.3):** the parity-275 battery born
honest RED against the pre-cure tree (the false and missing forms
ride the tree at HEAD: the opacity tail, the bare pipes, the absent
coverage note, the skipped helper calls, the absent cross-ref) → the
cures → parity-275 GREEN · the sibling batteries GREEN (parity-274 ·
parity-273 · parity-229 · parity-243 · docs-counts at the advanced
trio — the v2.72.0 block lands together with the advance, the
F-249b structural gate enforcing the pairing) → lint 0/0 · tsc 0 ·
the unit suite at the new count · build · smoke 15/15 · the FULL
e2e battery 161/161 (zero new legs — the round changes comments, one
doc table row, and no-op test calls; no swept surface moves, no
pixel can shift) · census MATCH · the captures (the standing
evidence faces + the round's touched faces — the dialog family's own
face, the drawer at 390, the flagship dashboard).

"""

p = insert_before(
    p,
    "### R-71 — The predicate-outlier, mechanism-truth, and phantom-pin round (session 274)",
    R72,
    "r72-section",
)

with open("docs/remediation_plan_v2.md", "w", encoding="utf-8") as f:
    f.write(p)

print("plan v2.72.0 written: head flip + §2.33 ledger + R-72 section")
