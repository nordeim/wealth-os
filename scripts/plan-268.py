#!/usr/bin/env python3
"""Session-268 plan writer — v2.65.0 (R-65, the year-remap,
switch-target, and cleared-bound round).

Follows the plan-267 conventions exactly (validated against the tree):
  1. the version header — the new Current-version block above the
     v2.64.0 block, which retitles to Previous;
  2. the §2.26 audit ledger before "## 3.";
  3. the R-65 section above R-64's;
  4. the §5 execution-history row above v2.64.0's.
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
CURRENT_MARKER = "> **Current version: v2.64.0** (session 267 — the"
header = """> **Current version: v2.65.0** (session 268 — the
year-remap, switch-target, and cleared-bound round R-65: the operator
re-sent the standing directive after the R-64 ship pair (4f537779 + the
owner's 5c6c8a34 session-log update carrying docs/session_118.md, the
owner's session-267 transcript — fetched and reviewed at intake per the
odd-number record convention). Per the recorded rhythm, findings-led
iteration: refresh, re-audit, remediate, verify, capture, document,
commit, push — with the operator's named asks (the mobile navigation
comparison, the Tailwind v4 state, the .env/db contract, the
vitest/playwright configs, the sitemap/SEO surface, the .env.example,
the screenshots, the SSH-wrapper push) re-verified along the way. The
intake: the workspace had been reset (a fresh clone at HEAD 5c6c8a34,
tree clean), the environment rebuilt cold (bun install + the
postinstall prisma generate, .env from .env.example on the
DATABASE_URL="file:../db/custom.db" contract, db/ at the repo root,
db push + seed, census MATCH (80/4/3/6/5/7, users=1)); the one
cold-start deviation was environmental again — the cached Playwright
chromium build did not match the 1.65 pin (the headless-shell 1254
build installed, then the battery ran green). The cold baseline gate
ran GREEN at HEAD — the v2.64.0 ship state reproduced exactly, no
discovery: lint 0/0 · tsc 0 · 1895/1895 unit (119 files) · build (the
4 documented Turbopack tracing warnings) · smoke 15/15 · 157/157 e2e ·
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
audit` CHANGED — the advisory census moved 1 → 2: a NEW dev-chain
HIGH (picomatch GHSA-fc5q-39xc-vjpf / CVE-2026-112366, ReDoS via
single-branch repeated extglob, CVSS 8.7) — every dependency path is
dev-toolchain (typescript-estree→tinyglobby, vite; 26 terminal paths,
all dev), 4.0.7 IS the latest npm release so NO FIX EXISTS, and the
census pin + the PAD row must move same-commit (F-268d); the minimatch
moderate deferral stands unchanged. neo-crm unchanged (b3d0fbe,
remote-verified) — nothing to port; the SEO surface verified (smoke
leg 12: sitemap + robots + manifest 200); the .env contract + the db/
at the repo root + the vitest/playwright configs + the .env.example
six-knob set all standing. The session-268 fresh-eyes audit (three
Mode-C passes: the R-64 cure surfaces driven by the session — the
parity-267 battery re-run green 18/18 at HEAD · the API/auth/security
layer — the TWENTY-FIRST consecutive clean bill (all twelve house
contracts, 45 handlers / 30 route files read line-by-line, 15
candidates examined and dismissed into documented postures) · the
UI/a11y/shell layer — all eight standing contracts verified, four new
findings after dedup with the driving session's own re-verification,
runtime probes, and live adjudications): 0 Critical / 0 High /
0 Medium / 4 Low / 3 Informational NEW after dedup, every material
claim re-verified at file:line by the driving session before planning
(the year-remap divergence runtime-proven on both sides of the seam;
the reference's own 36×20 switch live-measured — the painted genus is
parity-faithful, so the target cure must be paint-invisible; the
cleared-bound NaN zeroing runtime-proven through the seam's verbatim
semantics). THE ROUND'S LOWS: F-268a the API date validator admits
sub-100 years the toDate constructor remaps to 19xx (the stored-form
round-trip the calendar doctrine missed — "0050-06-15" passes
dateField while toDate shifts it to 1950, and the edit prefill
silently rewrites the stored year on save) · F-268b the settings
switch's touch target sits under the WCAG 2.5.8 24px floor (the
F-235f/F-236d precedent class never swept the row; the cure is the
after-pseudo hit-area extension + F-248j's aria-describedby
completion, both census- and paint-invisible) · F-268c a cleared
analytics date input silently zeroes the page (toDate("") is an
Invalid Date, so both range predicates go false for every row — the
$0.00 stat row, the no-data faces, the headers-only export; the cure
is the empty-bound-is-open doctrine, the Expenses seam's own parseBound
semantics) · F-268d the security ledger's census re-triage (the
picomatch decode + the PAD row + the pin, same-commit). The
Informationals: F-268e the clearAllFilters body unpinned · F-268f the
no-millis twin admitted but unpinned · F-268g the carrier net's
src/-scope leaves the root config files uncovered. The API layer's
twenty-first clean bill is the round's clean column. The plan v2.65.0
written and validated against the tree.

"""

text = splice(text, CURRENT_MARKER, header, before=True)
# retitle the v2.64.0 block
RETITLE_OLD = "> **Current version: v2.64.0** (session 267 — the"
RETITLE_NEW = "> **Previous version: v2.64.0** (session 267 — the"
# the splice above inserted a new Current block; the v2.64.0 marker is
# now the ONLY remaining "Current version: v2.64.0" occurrence.
if text.count(RETITLE_OLD) != 1:
    sys.exit("v2.64.0 retitle anchor not unique after header insert")
text = text.replace(RETITLE_OLD, RETITLE_NEW)

# ---------------------------------------------------------------------------
# 2. The §2.26 audit ledger (before "## 3.")
# ---------------------------------------------------------------------------
SECTION_3 = "## 3. The remediation program (R-items)"
ledger = """
### 2.26 Session-268 audit ledger (the fresh-eyes round over the v2.64.0 ship state)

Three Mode-C passes over HEAD 5c6c8a34 (the R-64 cure surfaces driven
by the session · the API/auth/security layer · the UI/a11y/shell
layer), every material claim re-verified at file:line by the driving
session before planning; the parity-267 battery re-run green 18/18
(all R-64 cure surfaces holding — the over-constraint predicate with
its six narrowing terms and the sort exclusion, the Clear Filters tab
reset, the badge separation, the calendar round-trip across both
bounds, the four dialogs' Date-input genus, the split memo, the doc
twin clause, the Escape guard's invariant comment). The API/auth/
security layer's TWENTY-FIRST consecutive clean bill: all twelve house
contracts verified with file:line evidence (the envelope, the session
guard set, the Zod parse surface with the bounded readers, the
ownership 404 family, the owner-scoping census across every read and
write, the full rate-limit census with the F-243a burn placement, the
no-enumeration family, the content-type gate, the transient-503 family
including the shared seams, the CSP served form, the boot gate +
artifact hygiene, the uploads family); the tree measured at exactly 30
route files / 45 handlers (GET 15 · POST 17 · PUT 6 · DELETE 6 ·
PATCH 1), unchanged since R-52; 15 candidates examined and dismissed
into documented postures. The UI/a11y/shell layer: all eight standing
contracts verified (the plain drawer with its superset behaviors, the
theme-default seam and its two mirrors with the dual-family .dark
flip, the Tailwind v4 hazard axes, the carrier net re-run green, the
a11y family with the z-ladder census, the toDate routing with the
form-branched CSV seam, the five hydration carriers, the route twins)
— and a close data-flow trace of the R-64 cure surfaces plus the
fresh-eyes sweep surfaced the round's findings. NEW after dedup:
0 Critical / 0 High / 0 Medium / 4 Low / 3 Informational.

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-268a | Low | **THE API DATE VALIDATOR ADMITS SUB-100 YEARS THE toDate CONSTRUCTOR REMAPS TO 19xx — the stored-form round-trip the calendar doctrine missed.** dateField's round-trip (`new Date(v).toISOString().slice(0,10) === v.slice(0,10)`) passes "0050-06-15" / "0000-01-01" / "0099-12-31" (runtime-verified — the STRING parser does not remap sub-100 years), but toDate's branch-2 NUMERIC constructor (`new Date(Number(m[1]), …)`) remaps years 0-99 by +1900 (toDate("0050-06-15T00:00:00.000Z") → 1950 — runtime-verified): a stored year-50 row renders, buckets, and sorts as 1950, and the edit prefill (`toDateInputValue(toDate(editing.date))`) shows 1950 — saving the edit SILENTLY REWRITES the stored year. Pre-existing since F-218d (not introduced by R-64); the R-64 round-trip closed only the bound half — customBoundMs already drops sub-100 bounds as open (its own round-trip fails on the remap), while the row half remaps. | `src/lib/schemas.ts:150-159` (the validator) vs `src/lib/finance.ts:88-93` (the constructor); consumers `src/app/(app)/expenses/page.tsx:384` (the edit-prefill seam) | **R-65** (BOTH halves: dateField rejects sub-100 years at the boundary — the csv.ts two-digit-year remap doctrine, "a skip beats an invented century" — AND toDate's branch 2 gains the setFullYear arm (the remap-safe setter) so any legacy row still reads its written calendar; seam legs pin the boundary rejection and the honest sub-100 read at both twins and the bare form) |
| F-268b | Low | **THE SETTINGS SWITCH'S TOUCH TARGET SITS UNDER THE WCAG 2.5.8 24PX FLOOR — the F-235f/F-236d precedent class never swept the row.** The NotificationRow's role="switch" button paints a 36×20 track (h-5 w-9) — 20px tall, four controls. LIVE-ADJUDICATED on the reference: its own switch measures 36×20 (getBoundingClientRect through agent-browser) — the painted genus is parity-faithful, so the cure must be paint-invisible. The a11y two-gate is structurally blind to the class (axe's default ruleset ships no target-size rule — the same blindness that hid F-235f's dialog close and F-236d's toast dismiss). | `src/app/(app)/settings/page.tsx:443-464` (the track) | **R-65** (the after-pseudo hit-area extension: `relative` + an empty-content pseudo at negative vertical insets extends the clickable box to 36×36 while the painted track and the focus ring stay 36×20 — census-invisible (no DOM element joins), sweep-invisible (no painted pixel changes); F-248j's aria-describedby wiring folds into the same edit (the description paragraph gains the id, the button the association — the reference's own switch carries no a11y attributes, so the wiring is the sanctioned superset); an e2e leg proves the hit area live (a click 6px above the track center toggles the switch)) |
| F-268c | Low | **A CLEARED ANALYTICS DATE INPUT SILENTLY ZEROES THE PAGE — the NaN-bound genus.** A cleared native date input yields from="" (or to=""); toDate("") → Invalid Date → getTime() NaN, so BOTH range predicates are false for every row (runtime-verified through the seam's verbatim semantics): all three range-scoped tabs read "No data in the selected range", the stat row asserts Avg Monthly Income/Expenses/Savings = $0.00 for a full ledger, and Export downloads a headers-only CSV — with no face naming the undefined range (the empty input is the only cue). | `src/app/(app)/analytics/page.tsx:110-124` (the seam) · `:196-222` (the inputs) · `:251-273` (the stat row) · `:160-185` (the export) | **R-65** (the empty-bound-is-open doctrine — the Expenses seam's own parseBound semantics: an empty from drops the lower bound, an empty to drops the upper; the refDate derivation falls back to a stable now when the upper bound is open (the F-267i staleness genus, the registered trade); construction-site pins carry the guard forms and an e2e leg proves the cleared From date keeps the ledger visible) |
| F-268d | Low | **THE SECURITY LEDGER'S ADVISORY CENSUS MOVED 1 → 2 — a NEW dev-chain HIGH, and the census pin must move same-commit (the ledger cannot rot).** picomatch GHSA-fc5q-39xc-vjpf / CVE-2026-112366 (ReDoS via single-branch repeated extglob, CVSS 8.7): affected ≤ 4.0.7, and 4.0.7 IS the latest npm release — NO FIX EXISTS; every dependency path is dev-toolchain (typescript-estree→tinyglobby and vite; the full bun-pm-why tree carries 26 terminal paths, all `dev wealth-os`), zero runtime chains, nothing in the shipped standalone artifact. The house contract: runtime-chain advisories cure same-session, dev-toolchain waits for a dedicated round — and the PAD §10 row + the security-ledger pin carry the census, so both move in the same commit with the picomatch decode. | `Project_Architecture_Document.md:3569` (the §10 advisories row) · `tests/security-ledger.test.ts:95-103` (the census pin) | **R-65** (the census re-anchored 1 → 2 — "2 advisories: 1 high / 1 moderate — all dev-toolchain, zero runtime chains" — with the picomatch decode (no fix released; the re-triage duty watches the parent ranges for the unlock); the PAD row + the pin + this plan's register in the same commit) |
| F-268e | Informational | **THE clearAllFilters BODY IS UNPINNED — the battery gap.** Both parity batteries (parity-266's discriminator pin, parity-267's Clear Filters leg) pin the FUNCTION by name as a call inside clearFiltersAndSearch, and parity-265 pins the footer's onClick wiring — but no test pins the eight-setter body itself (setRangeFilter("") … setSortDir("desc")): a future edit dropping one setter silently breaks the panel's Clear All AND the empty-state's Clear Filters (the exact F-266c/F-267a contract) with every battery green. | `src/app/(app)/expenses/page.tsx:261-270` (the body) vs the pins at `tests/parity-267.test.ts:72-82` | **R-65** (the construction-site pin — the same slice-and-assert form the listConstrained pin uses; a green-by-design rider born over the holding body) |
| F-268f | Informational | **THE NO-MILLIS TWIN IS ADMITTED BUT UNPINNED — the F-267 battery-gap rider one twin short.** The F-267c battery-gap closure pins the stored `.000` twin and the bare form; the "T00:00:00Z" (no-millis) twin rides the regex's optional-milliseconds arm unpinned (runtime-verified admitted and windowing) — a future regex tightening that drops the arm would silently convert such bounds to open. | `src/lib/finance.ts:72` (the regex) vs `tests/parity-267.test.ts:220-232` (the pinned twins) | **R-65** (one behavioral leg: the no-millis twin as a real start bound, mirroring the .000-twin leg) |
| F-268g | Informational | **THE CARRIER NET'S src/-SCOPE LEAVES THE ROOT CONFIG FILES UNCOVERED.** Tailwind's content detection scans the root configs (the F-245e lesson — three bare-word carriers lived in next.config.ts/tsconfig.json; the @source not directives exclude only directories and *.md), but parity-229's whole-tree invariant never reads them — a class-shaped token in a root-config comment could emit dead CSS with no net to catch it. Direct sweep: clean today (the only heuristic-shaped tokens — only-on-failure, self-heals — parse to no Tailwind utility). | `tests/parity-229.test.ts:102-119` (the src/-scoped walk) | **R-65** (the walk gains the tracked root config file set — next.config.ts, playwright.config.ts, eslint.config.mjs, vitest.config.ts, prisma.config.ts, postcss.config.mjs, components.json, tsconfig.json, package.json — so the net's live universe matches the scan set; a universe leg pins the coverage, born RED over the pre-extension walk) |

Recorded, not cured: F-268h (the dashboard KPI derivations unmemoized —
the benign F-267e tail: the seven O(n) folds feed only KpiCard props,
no downstream memo is defeated; fold into one memo if the file is ever
touched again) · F-268i (the listConstrained junk-bound posture — an
unparseable numeric bound ("1e999" through a type=number input) counts
as a constraint in the predicate while the seam drops it open; honest
enough, the user touched the panel) · F-268j (the custom-range
both-bounds-empty posture — the panel visibly shows Custom range
selected, so the no-matches copy stays defensible; the badge counts
the same term, consistent). Plus the standing registers (F-267h/i,
F-265f, F-264g/h/i, F-257a/r — all standing; the API layer's
twenty-first clean bill recorded above; the security census F-268d is
the round's own cure). The toolchain note stands (agent-browser/
HeadlessChrome vs the Turbopack dev build — session 253; this
session's clone-side comparison rode the production artifact cleanly
again). Next session defaults to findings-led iteration — re-send the
standing directive to continue the rhythm.

"""

text = splice(text, SECTION_3, ledger, before=True)

# ---------------------------------------------------------------------------
# 3. The R-65 section (above R-64's)
# ---------------------------------------------------------------------------
R64_ANCHOR = "### R-64 — The savings-tab, sort-count, and calendar-roundtrip round (session 267)"
r65 = """### R-65 — The year-remap, switch-target, and cleared-bound round (session 268)

The operator re-sent the standing directive after the R-64 ship pair
(4f537779 + the owner's 5c6c8a34 session-log update carrying
docs/session_118.md, the owner's session-267 transcript — fetched and
reviewed at intake per the odd-number record convention). Per the
recorded rhythm, findings-led iteration. The intake and the standing
layers are recorded in the version header above; this section carries
the findings, the cures, and the verification contract.

**The findings (each verified at file:line by the driving session —
the API layer's twenty-first consecutive clean bill is the round's
clean column; every finding lives on the UI/seam side or the ledger
itself):** the §2.26 ledger's ten rows — F-268a THE YEAR-REMAP
ADMISSION (the round's flagship: the API date validator admits
sub-100 years the toDate constructor remaps to 19xx — the
stored-form round-trip the calendar doctrine missed; runtime-proven
on both sides of the seam, with the edit prefill silently rewriting
the stored year) · F-268b the settings switch's touch target under
the WCAG 2.5.8 floor (parity-faithful paint, so the cure is the
after-pseudo hit-area extension + F-248j's aria-describedby
completion) · F-268c the cleared analytics date input's NaN zeroing
(the $0.00 stat row and the headers-only export; the cure is the
empty-bound-is-open doctrine) · F-268d the security census re-triage
(the picomatch dev-chain HIGH with no fix released; the PAD row + the
pin move same-commit) · F-268e/F-268f the two battery-gap riders (the
clearAllFilters body pin, the no-millis twin leg) · F-268g the
carrier net's root-config extension · F-268h/i/j the three registered
postures.

**The cures (R-65.2):** dateField rejects sub-100 years at the
boundary (the csv.ts two-digit-year remap doctrine — a skip beats an
invented century) AND toDate's branch 2 gains the setFullYear arm for
legacy rows (the remap-safe setter still anchors local midnight of
the written calendar; a leap-day sub-100 year that survives the
boundary's round-trip keeps its date because every such year is
divisible by 4 and the base year is leap). The settings switch gains
the hit-area extension (relative + the empty-content pseudo at
negative vertical insets — 36×36 clickable, 36×20 painted,
census- and sweep-invisible) and the F-248j aria-describedby wiring
(the description paragraph joins the switch's a11y chain). The
analytics seam treats an empty bound as an open bound (the Expenses
parseBound doctrine) with the refDate falling back to a stable now
when the upper bound is open. The PAD §10 row + the security-ledger
pin carry the new census with the picomatch decode. The clearAllFilters
body and the root-config universe join the batteries.

**The verification contract (R-65.3):** the parity-268 battery born
honest RED against the pre-cure tree (the year-remap boundary legs ·
the toDate sub-100 arm legs · the switch hit-area + describedby legs
+ the painted-genus rider · the cleared-bound guard legs · the
refDate fallback leg) with the green-by-design riders (the
clearAllFilters body pin, the no-millis twin leg, the painted-track
rider) → the cures → parity-268 GREEN → the parity-229 universe leg
RED → the walk extension → GREEN → the security-ledger census pin RED
→ the PAD row → GREEN → lint 0/0 · tsc 0 · the unit suite at the new
count · build · smoke 15/15 · the FULL e2e battery (+2 legs: the
cleared From date keeps the ledger's stat row non-zero and its tabs
populated; the switch hit-area click 6px above the track center
toggles the control — zero new signups/logins, the shared
storageState rides) · census MATCH · the drift chain re-run (the four
sweep classes + the fullpage sweep + the interior census — REQUIRED
again: the analytics and settings parity surfaces changed; the
closed-state DOM is unchanged by construction (the bound guard is
render-logic inside the memo, the hit-area extension paints nothing,
the describedby is an attribute), so the standing baselines are
expected to hold, and the chain is the proof) · the captures (the
cleared-bound recovery face at desktop, the switch hit-area face, plus
the standing mobile drawer at 390).

"""

text = splice(text, R64_ANCHOR, r65, before=True)

# ---------------------------------------------------------------------------
# 4. The §5 execution-history row (above v2.64.0's)
# ---------------------------------------------------------------------------
ROW64 = "| v2.64.0 | 267 |"
row = """| v2.65.0 | 268 | **R-65** (the year-remap, switch-target, and cleared-bound round — findings-led, the standing directive with the reference STABLE on every standing drift layer and the mobile-navigation ask verified on BOTH sides at TRUE 390×844 (the reference through agent-browser; the clone side riding the production artifact on the scratch db/comparison.db per the session-253 toolchain note, booted in a single invocation per the session-98 server-death lesson — the aria-expanded flip verified on open AND close, zero visible nav links after the close); the workspace had been RESET — a fresh clone at HEAD 5c6c8a34 with the environment rebuilt cold (the one deviation environmental: the fresh sandbox carried the wrong Playwright chromium build, the headless-shell 1254 installed before the battery); the cold baseline GREEN at HEAD — the v2.64.0 ship state reproduced exactly, no discovery). The audit round: the standing layers re-verified (probe:ref STABLE; `bun audit` CHANGED — the census moved 1 → 2, a NEW dev-chain picomatch HIGH with no fix released (F-268d's re-triage); neo-crm unchanged (b3d0fbe); the SEO surface verified (smoke leg 12); the .env contract + the db/ at the repo root + the configs + the .env.example standing). The session-268 fresh-eyes audit (three Mode-C passes: the R-64 cure surfaces — the parity-267 battery re-run green 18/18 · the API/auth/security layer — the TWENTY-FIRST consecutive clean bill (twelve contracts, 45 handlers / 30 route files, 15 dismissed candidates) · the UI/a11y/shell layer — all eight standing contracts verified, four new findings after dedup): 0 Critical / 0 High / 0 Medium / 4 Low / 3 Informational NEW after dedup, every material claim re-verified at file:line (the year-remap runtime-proven on both sides of the seam; the reference's own 36×20 switch live-measured; the cleared-bound NaN zeroing runtime-proven). THE ROUND'S CURES: F-268a dateField rejects sub-100 years + toDate's setFullYear arm (the remap doctrine at both the boundary and the seam) · F-268b the switch hit-area extension + F-248j's aria-describedby completion (paint- and census-invisible) · F-268c the analytics empty-bound-is-open doctrine + the refDate fallback · F-268d the security census re-anchored 1 → 2 with the picomatch decode (the PAD row + the pin same-commit) · F-268e/F-268f the battery-gap riders · F-268g the carrier net's root-config extension. Registered: F-268h the dashboard KPI memo tail, F-268i the junk-bound posture, F-268j the custom-empty posture. The plan v2.65.0 written and validated against the tree. **R-65.1** the pins born RED (the parity-268 battery + the parity-229 universe leg + the security-ledger census pin) → **R-65.2** the cures → **R-65.3** the verification (parity-268 GREEN · the universe leg GREEN · the census pin GREEN · lint 0/0 · tsc 0 · the unit suite at the new count · build · smoke 15/15 · the FULL e2e battery (+2 legs) · census MATCH · the drift chain re-run; the captures — the cleared-bound recovery, the switch hit-area face, the standing mobile drawer) | (filled at ship) | (this session's execution commit) |

"""

text = splice(text, ROW64, row, before=True)

with open(PLAN, "w", encoding="utf-8") as f:
    f.write(text)

print(f"plan v2.65.0 written: {orig_len} -> {len(text)} bytes (+{len(text) - orig_len})")
