#!/usr/bin/env python3
"""Session-277 plan write — remediation_plan_v2.md v2.73.0 → v2.74.0
(R-74, the blank-row-split, census-scope, and audit-census round).

Insertions only, every site asserted (the F-242j lesson): the new
Current-version header block (the v2.73.0 block flips to Previous),
the §2.35 ledger (before §3's heading), and the R-74 section (above
R-73's). The §5 execution-history row rides scripts/history-277.py at
lockstep time (after the gate runs, so the counts carry the verified
values).

The round's ledger (every material claim re-verified at file:line by
the driving session after the three Mode-C passes): 0 Critical /
0 High / 2 Medium / 2 Low / 6 Informational NEW after dedup —
F-277a the three §2 blank-line table splits (the F-276a genus
survived in the plan's own §2; 50 orphan rows) · F-277b the advisory
census stale vs the live bun audit (a NEW dev-chain effect HIGH rides
nowhere in the doc set; the pin enforces the rot) · F-277c the
api.ts guards comment's stale census (twelve body routes; CRM-era
URL-param surfaces) · F-277d the parity-276 census's two latent
soundness gaps (not fence-aware; worklog.md absent)."""

import sys


def insert_before(text: str, anchor: str, block: str, label: str) -> str:
    n = text.count(anchor)
    if n != 1:
        sys.exit(f"[{label}] expected 1 anchor, found {n}: {anchor[:60]!r}")
    return text.replace(anchor, block + anchor, 1)


with open("docs/remediation_plan_v2.md", encoding="utf-8") as f:
    p = f.read()

# ---- 1. the head: flip v2.73.0 to Previous, insert v2.74.0 above it -----
CUR_HEAD = "> **Current version: v2.73.0** (session 276 — the"
if p.count(CUR_HEAD) != 1:
    sys.exit("[head] the v2.73.0 Current header not found in the expected form")
p = p.replace(CUR_HEAD, "> **Previous version: v2.73.0** (session 276 — the", 1)

NEW_HEAD = """> **Current version: v2.74.0** (session 277 — the
blank-row-split, census-scope, and audit-census round R-74: the
operator re-sent the standing directive after the R-73 ship pair
(92f7d0ce + the owner's 1679f4fd session-log update carrying
docs/session_136.md, the session-276 transcript — fetched by the
fresh clone and reviewed at intake per the odd-number record
convention, this record riding docs/session_137.md). Per the
recorded rhythm, findings-led iteration: refresh, re-audit,
remediate, verify, capture, document, commit, push — with the
operator's named asks (the mobile navigation comparison, the
Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.)

The intake: the workspace had been RESET (a fresh clone at HEAD
1679f4fd — tree clean; the prior session's work ALREADY SHIPPED as
92f7d0ce + the owner's session-log update); the environment rebuilt
cold (bun install, 594 packages, the postinstall prisma generate
into src/generated/prisma; .env from .env.example on the
DATABASE_URL="file:../db/custom.db" contract; db/ at the repo root;
db push + seed; census MATCH (81/4/3/6/5/7, users=1)); the toolchain
legs (the chromium headless-shell 1254 install the e2e battery
rides; paramiko 5.1.0 for the SSH push shim).

THE COLD BASELINE GATE GREEN AT HEAD — the v2.73.0 ship state
reproduced exactly, no discovery: lint 0/0 · tsc 0 · 2008/2008 unit
(128 files) · build (the 4 documented Turbopack tracing warnings) ·
smoke 15/15 · 161/161 e2e · census MATCH.

The standing layers: probe:ref STABLE on every layer (the app
bundle 1,402,874 bytes / md5 6d3779af…, the stylesheet md5
96f24d45…, the demo-data ZERO census, the desktop nav census
256px · 9 links, the TRUE-390 menu census opens=true · 9
destinations) · **the mobile-nav comparison verified on BOTH sides
at TRUE 390×844** (the reference through probe:ref's TRUE-390 menu
census; the clone side riding the standing comparison-265.ts on the
production artifact over the scratch db/comparison.db — pre-open 0 ·
9 destinations + Sign Out · aria-expanded true→false · post-close 0 ·
census tripwire MATCH · no Tailwind v4 regression) · `bun audit`
MOVED 1 → 2 (the fresh environment census: a NEW dev-chain HIGH —
effect GHSA-7589-6fvf-x4pw, ReDoS in Schema.TemplateLiteral, affected
≤ 3.22.0 — rides prisma CLI's @prisma/config@7.10.1 which
exact-pins effect@3.20.0; the runtime @prisma/client chain is clean,
the fix is unreachable without a prisma bump and 7.10.1 is the
latest stable — the round's own F-277b re-anchored the ledger the
same session; the minimatch moderate stands unchanged) · neo-crm
unchanged (b3d0fbe) · the SEO surface verified (smoke leg 12:
sitemap + robots + manifest 200; the metadata/pwa/page-titles pins
green inside the unit suite) · the .env contract + the db/ at the
root + the vitest/playwright configs + the .env.example standing.

The session-277 fresh-eyes audit (three Mode-C research passes
dispatched as parallel research subagents per the house convention,
every material claim re-verified at file:line by the driving session
— the R-73 cure surfaces: all five HOLDING (the parity-276 battery
11/11 inside the cold-gate's full-suite run; the §5 table structure,
the ten escaped rows, the modal-rationale comment trio, the
fifteen-route docblock census, the AGENTS floor pointer all read at
file:line) · the API/auth/security layer: the THIRTIETH consecutive
clean bill (all thirteen house contracts, 45 handlers / 30 route
files read line-by-line — the census re-verified at exactly 30;
every candidate dismissed into documented postures) · the UI/a11y/
shell layer: all eight standing contracts verified holding live (the
drawer mechanics, the theme three-way seam, the v4 scanner with the
whole-tree invariant + the bare-word net, the a11y surfaces, the
clear-era contract, the .dark token flip — 217 targeted unit tests
re-run green inside the pass)): 0 Critical / 0 High / 2 Medium /
2 Low / 6 Informational NEW after dedup, every material claim
re-verified at file:line.

The round's flagship: **F-277a the §2 ledger's three tables split
by internal blank lines — 50 ledger rows render as pipe-paragraphs
(the F-276a genus one section over).** R-73 repaired the §5
execution-history table's GFM structure while the plan's own §2
ledger carried the same genus at three sites: a blank line inside
each row block ends the table there (GFM terminates at the first
blank), and every row after the split renders as raw pipe-laden
text — the session-225 audit rows (F-225a–v, 22 rows orphaned under
the session-203 ledger table), the session-231 audit rows (F-231a–s,
19 rows), and the session-241 audit rows (F-241a–i, 9 rows),
Medium-severity finding rows among them. The parity-276 census is
structurally blind to the genus: its walker resets the header count
on any non-pipe line, so an orphan block's first row becomes a
pseudo-header and passes green, and the round's only contiguity pin
is §5-scoped.

The round's riders: **F-277b the advisory census re-anchored to the
live bun audit** (the F-272a same-commit precedent: the §10 row and
the security-ledger pin pair re-worded to the two-vulnerability
census with the effect decode — dev-chain only, the exact-pin
enumerated, the dedicated-dependency-round posture named, the
re-triage duty watching the parent's releases) · **F-277c the
api.ts hand-rolled-guards comment's honest census** (the F-220n/
F-276d genus one comment over: "the twelve body routes" reworded
to the twenty-route-file truth, the CRM-era events/reports/export
URL-param surfaces retired — asString survives at search's q parse
alone, asDate has zero live route consumers) · **F-277d the
parity-276 census's two latent soundness gaps closed** (the walker
strips fenced code before the table walk — pipe-prefixed lines
inside ``` fences are code, never rows; worklog.md joins the DOCS
list as the seventh living doc; the parity-277 census leg carries
the same hardened form from birth). Registered: F-277e–F-277h (the
pass-B and pass-C informational postures re-confirmed standing, the
historical advisory snapshots' past-tense record, the standing PNG
regeneration).

The execution contract (R-74): the plan v2.74.0 written and
validated against the tree (this script, insertions only, every
anchor asserted) → **R-74.1** the pins born honest RED (the
parity-277 battery: 11 legs — the false and missing forms ride the
tree at HEAD: the three blank splits, the stale advisory census,
the stale comment census, the census's two gaps) → **R-74.2** the
cures (scripts/cures-277.py — the three blank lines drop, the §10
row + the pin pair re-anchor, the api.ts comment rewords, the
parity-276 census hardens; every site asserted exactly-once,
zero application behavior changed) → **R-74.3** the verification
(parity-277 GREEN 11/11 · the sibling batteries GREEN ·
docs-counts GREEN at the advanced trio — the TWENTY-EIGHTH
gate-enforced ride, the v2.74.0 block landing together with the
advance · parity-243 GREEN at the advanced mirror · lint 0/0 ·
tsc 0 · 2019/2019 unit (129 files, +11) · build · smoke 15/15 ·
161/161 e2e (zero new legs — the round changes doc tables, one
comment, and pin files; no swept surface moves, no pixel can
shift) · census MATCH · the captures — the round's touched
surfaces are docs and pins, so the standing faces ride: the
flagship dashboard at 1280×800, the mobile drawer at 390×844, and
the mobile-nav comparison capture already live-asserted this
session; the census tripwire MATCH).

"""

p = insert_before(p, "> **Previous version: v2.73.0**", NEW_HEAD, "new-head")

# ---- 2. the §2.35 ledger (before §3's heading) --------------------------
LEDGER = """### 2.35 Session-277 audit ledger (the fresh-eyes round over the v2.73.0 ship state)

Three Mode-C passes (the R-73 cure surfaces · the API/auth/security
layer · the UI/a11y/shell layer) + the driving session's own
re-verification, every material claim re-verified at file:line. The
API layer's thirtieth consecutive clean bill and the UI layer's eight
standing contracts are the round's clean columns; the genuine rot is
three blank-line table splits, one stale advisory census, one stale
comment census, and two latent census gaps.

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-277a | Medium | **THE §2 LEDGER'S THREE TABLES SPLIT BY INTERNAL BLANK LINES — 50 rows render as pipe-paragraphs (the F-276a genus one section over).** A blank line inside a table's row block ends the table there (GFM terminates at the first blank); every row after the split renders as raw pipe-laden text. Three sites in the plan's own §2: the session-225 audit rows (F-225a–v, 22 rows orphaned under the session-203 ledger table after the blank), the session-231 audit rows (F-231a–s, 19 rows), and the session-241 audit rows (F-241a–i, 9 rows) — Medium-severity finding rows among the 50. The R-73 round cured exactly this genus for §5 while §2 carried it on; the parity-276 census is structurally blind to it (the walker resets its header count on any non-pipe line, so an orphan block's first row becomes a pseudo-header and passes green; the round's only contiguity pin is §5-scoped). | `docs/remediation_plan_v2.md:4270, 4392, 4643` (the three blank lines) + the orphan spans `:4271-4292, :4393-4411, :4644-4652`; `tests/parity-276.test.ts:146-151` (the pseudo-header reset) | **R-74** (the three blank lines drop — the rows rejoin their parent tables; a fence-aware contiguity census leg rides the parity-277 battery as the structural pin, so the genus can never re-enter) |
| F-277b | Medium | **THE ADVISORY CENSUS IS STALE VS THE LIVE `bun audit` — a NEW dev-chain HIGH rides nowhere in the doc set, and the pin enforces the rot.** The live census (re-run this session) is 2 vulnerabilities (1 high / 1 moderate): a NEW HIGH — effect ≤ 3.22.0, GHSA-7589-6fvf-x4pw (ReDoS in Schema.TemplateLiteral) — rides `prisma › @prisma/config@7.10.1`, which exact-pins effect@3.20.0 in the lockfile; the prisma CLI is a devDependency (the RUNTIME `@prisma/client` chain is clean — zero runtime exposure), and the minimatch moderate (GHSA-g3hv-75wg-m249) stands unchanged. The §10 row still records "1 advisory: 1 moderate — all dev-toolchain, zero runtime chains" (re-triaged session 272) while the security-ledger pin pair asserts that stale form as the contract — the re-triage duty's own record rotted (a HIGH advisory unrecorded anywhere; whether effect entered npm's audit data after the R-73 push or the re-triage was a copy-forward is undeterminable from the tree — today's truth is 2). | `Project_Architecture_Document.md:4070` (the §10 row) + `tests/security-ledger.test.ts:117-118` (the pin pair) vs the live `bun audit` + `bun.lock` (@prisma/config exact-pins effect 3.20.0) | **R-74** (the F-272a same-commit precedent: the row re-anchored to the live two-vulnerability census with the effect decode — dev-chain only, the exact-pin enumerated, the fix (> 3.22.0) unreachable without a prisma/@prisma/config bump while 7.10.1 is the latest stable and the 8.x line is RC-only, so the dedicated-dependency-round posture; the pin pair flipped same-commit) |
| F-277c | Low | **THE HAND-ROLLED-GUARDS COMMENT'S CENSUS IS STALE — the F-220n/F-276d genus one comment over.** The session-166 retirement record claims "the twelve body routes ride parseBody/safeParse … now" while the live tree carries TWENTY route files calling parseBody (the six auth-family POSTs, the twelve sessioned-CRUD files, import and the AI coach with their own ceilings; reset and users ride readBoundedJson directly at the same gate) — twelve is the s166-era count, never re-counted through the family's growth. The same comment's URL-param survivors enumeration names CRM-era fossils — "events' from/to windows, the reports/export/search period+q parses" — while no /api/events or /api/reports route exists, the export route parses no URL params at all, asString's sole live consumer is search's q parse, and asDate has zero live route consumers (battery-only). The F-276d cure reworded the adjacent MAX_AUTH_BODY_BYTES docblock and left this comment standing. | `src/lib/api.ts:355-363` vs the live census (`rg 'parseBody\\(' src/app/api -l` = 20 files; `src/app/api/search/route.ts:37` the sole asString consumer; the routes tree) | **R-74** (the comment reworded to the honest census — the historical narrative kept in past tense, the present-tense count fixed, the CRM-era fossils retired; pinned by the parity-277 comment-truth legs) |
| F-277d | Low | **THE PARITY-276 CENSUS HAS TWO LATENT SOUNDNESS GAPS — both luck-of-the-tree today.** (a) The walker is not fence-aware: pipe-prefixed lines inside ``` code fences would be walked as table rows (a fenced sample could mint a pseudo-header or mask a deviation); today zero pipe-prefixed lines ride any fence in the six-file set, so the census's result coincides with fence-aware truth. (b) The DOCS list covers six files; worklog.md (the seventh living doc) is absent — today worklog.md carries zero pipe-prefixed blocks. Both are luck, not soundness. | `tests/parity-276.test.ts:127-164` (DOCS at :134-141, the walker at :143-161) | **R-74** (the walker strips fenced code before the table walk — the fence state toggles at every ``` line; worklog.md joins the DOCS list; the parity-277 census leg carries the same hardened form from birth) |
| F-277e | Informational | **THE PASS-B CLEAN-BILL INFORMATIONAL POSTURES STAND — re-confirmed, documented.** The in-band OTP delivery (the `NEO_DISABLE_IN_APP_OTP` knob, ADR-014 demo posture), the forgot-password timing residual (the known-email branch's randomBytes+fsync vs the unknown-email immediate return — fsync-scale, four-part documented rationale), the per-process in-memory limiter (single-node deploy contract; restart clears buckets), and the sanitizeSearchQuery under-inclusion (metacharacter-bearing terms strip to literals, F-225f — deliberate, unit-pinned). | `src/app/api/auth/signup/route.ts:169`; `src/app/api/auth/forgot-password/route.ts:77-87`; `src/lib/rate-limit.ts:1-2`; `src/lib/search-query.ts:7-13` | Registered (the documented postures) |
| F-277f | Informational | **THE PASS-C CLEAN-BILL INFORMATIONAL POSTURES STAND — re-confirmed, documented.** The SelectTrigger focus ring rides plain `focus:` (the N-77c11 parity decision — it fires on mouse click like the reference's stock trigger), the vendored stock's latent sub-AA arms carry zero live consumers (button/badge/dropdown destructive inks, each with its measured ratio and pin-an-ink-pair guidance in source), the package-lock/LICENSE scan residual (machine-generated strings outside the parity-229 net by documented design), and the DrawerNav failed-logout re-arm lands on an unmounted tree (the failure surfaces through the store-error banner; the sidebar twin carries the real re-arm — the F-274b record). | `src/components/ui/select.tsx:24-27`; `src/components/ui/button.tsx:72-99`; `tests/parity-229.test.ts:158-167`; `src/components/layout/mobile-nav.tsx:176-189` | Registered (the documented postures) |
| F-277g | Informational | **THE HISTORICAL ADVISORY SNAPSHOTS STAND AS SESSION RECORDS.** The PAD's past-tense re-anchor narratives (the R-65/R-69 blocks), the worklog's per-session STANDING-ASKS blocks, and the docs/session_*.md transcripts keep the counts that were true at their time — the rot rides only the living sites the F-277b re-anchor carries (the §10 row, the pin pair). Editing session records retroactively is the docs-counts doctrine's own negative. | `Project_Architecture_Document.md:218-226`; `worklog.md:8` (the session-276 record) | Registered (the session-record doctrine) |
| F-277h | Informational | **THE STANDING PNG REGENERATION — the comparison run rewrites `mobile-nav-clone-390.png` at the standing name.** The session's comparison-265.ts run (live-asserted: 9 destinations + Sign Out, the aria-expanded flip, the census tripwire MATCH) rewrites the tracked standing capture — the live-asserted capture IS the session's evidence and rides the round's commit. | `docs/screenshots/mobile-nav-clone-390.png` | Registered (the standing-name convention) |

Recorded, not cured: F-277e through F-277h. The audit's clean
columns: the API/auth/security layer's thirtieth consecutive clean
bill (all thirteen house contracts, 45 handlers / 30 route files —
the census re-verified at exactly 30 this round) and the UI/a11y/
shell layer's eight standing contracts all holding live. The round
also re-confirmed the R-73 cure surfaces (all five verified holding
at file:line inside the cold gate's full-suite run — the parity-276
battery 11/11) and the standing registered postures (the ADR-014
in-band OTP/reset delivery, the capability-URL publicity, the CSP
fetch-directive pin, the scrypt promisification, the empty-PUT
guard, the clear-era contract, the burn-order doctrine).

"""

p = insert_before(p, "## 3. The remediation program (R-items)", LEDGER, "ledger")

# ---- 3. the R-74 section (above R-73's) ---------------------------------
R74 = """### R-74 — The blank-row-split, census-scope, and audit-census round (session 277)

The operator re-sent the standing directive after the R-73 ship pair
(92f7d0ce + the owner's 1679f4fd session-log update carrying
docs/session_136.md, the session-276 transcript — fetched by the
fresh clone and reviewed at intake per the odd-number record
convention, this record riding docs/session_137.md). Per the
recorded rhythm, findings-led iteration. The intake and the standing
layers are recorded in the version header above; this section
carries the findings, the cures, and the verification contract.

**The findings (each verified at file:line by the driving session —
the API layer's thirtieth consecutive clean bill and the UI layer's
eight standing contracts are the round's clean columns; the genuine
rot is three blank-line table splits, one stale advisory census, one
stale comment census, and two latent census gaps):** the §2.35
ledger's rows — F-277a THE ROUND'S FLAGSHIP (the §2 ledger's three
tables split by internal blank lines — 50 rows render as
pipe-paragraphs, the F-276a genus surviving one section over from
the round that cured §5; the parity-276 census blind to the genus:
its walker's non-pipe reset mints pseudo-headers from orphan
blocks, and the contiguity pin is §5-scoped) · F-277b THE AUDIT
CENSUS (the advisory census stale vs the live bun audit — a NEW
dev-chain effect HIGH rides nowhere in the doc set while the
security-ledger pin pair holds the stale one-advisory form as the
contract) · F-277c THE COMMENT CENSUS (the api.ts
hand-rolled-guards comment's "twelve body routes" vs the
twenty-route-file truth, plus CRM-era events/reports/export
URL-param fossils — the F-220n genus one comment over from the
F-276d cure) · F-277d THE CENSUS SCOPE (the parity-276 census's two
latent soundness gaps — the walker is not fence-aware and worklog.md
is absent from the DOCS list; both luck-of-the-tree today).

**The cures (R-74.2):** the three §2 blank lines drop (the
session-225 rows rejoin the session-203 ledger table, the
session-231 rows their table, the session-241 rows theirs — every
orphan row already carries its parent header's cell shape, so the
merge is seamless); the §10 advisories row and the security-ledger
pin pair re-anchor to the live two-vulnerability census with the
effect decode (dev-chain only — the runtime @prisma/client chain
clean; the exact-pin enumerated; the fix unreachable without a
prisma bump while 7.10.1 is the latest stable and the 8.x line is
RC-only, so the dedicated-dependency-round posture; the re-triage
duty watches the parent's releases); the api.ts comment rewords to
the honest census (twenty route files ride parseBody — the six
auth-family POSTs, the twelve sessioned-CRUD files, import and the
AI coach with their own ceilings, reset and users riding
readBoundedJson directly; asString survives at search's q parse
alone; asDate has zero live route consumers — the historical
narrative kept in past tense, the CRM-era fossils retired); the
parity-276 census hardens (the walker strips fenced code before
the table walk; worklog.md joins the DOCS list as the seventh
living doc).

**The verification contract (R-74.3):** the parity-277 battery born
honest RED against the pre-cure tree (the false and missing forms
ride the tree at HEAD: the three blank splits, the stale advisory
census, the stale comment census, the census's two gaps) → the
cures → parity-277 GREEN · the sibling batteries GREEN (parity-276
at the hardened census · security-ledger at the flipped pin pair ·
the standing family · docs-counts at the advanced trio — the
v2.74.0 block landing together with the advance, the F-249b
structural gate enforcing the pairing) → lint 0/0 · tsc 0 · the
unit suite at the new count · build · smoke 15/15 · the FULL e2e
battery 161/161 (zero new legs — the round changes doc tables, one
comment, and pin files; no swept surface moves, no pixel can
shift) · census MATCH · the captures (the standing evidence faces —
the round's touched surfaces are docs and pins, so the flagship
dashboard, the mobile drawer, and the comparison capture ride).

"""

p = insert_before(
    p,
    "### R-73 — The table-structure, census-truth, and phantom-comment round (session 276)",
    R74,
    "r74-section",
)

with open("docs/remediation_plan_v2.md", "w", encoding="utf-8") as f:
    f.write(p)

print("[plan-277] v2.74.0 written: head block + §2.35 ledger + R-74 section inserted")
