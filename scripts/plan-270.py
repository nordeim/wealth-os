#!/usr/bin/env python3
"""Session-270 plan write — remediation_plan_v2.md v2.66.0 → v2.67.0
(R-67, the liveness-fabrication, stacked-escape, and comment-truth
round).

Insertions only, every site asserted (the F-242j lesson): the new
Current-version header block (the v2.66.0 block flips to Previous),
the §2.28 ledger (before §3's heading), the R-67 section (above
R-66's), and the §5 execution-history row (above v2.66.0's)."""

import sys


def insert_before(text: str, anchor: str, block: str, label: str) -> str:
    n = text.count(anchor)
    if n != 1:
        sys.exit(f"[{label}] expected 1 anchor, found {n}: {anchor[:60]!r}")
    return text.replace(anchor, block + anchor)


with open("docs/remediation_plan_v2.md", encoding="utf-8") as f:
    p = f.read()

# ---- 1. the head: the new Current block; v2.66.0 flips to Previous ------
CUR_HEAD = "> **Current version: v2.66.0** (session 269 — the"
if p.count(CUR_HEAD) != 1:
    sys.exit("[head] the v2.66.0 Current header not found in the expected form")
p = p.replace(CUR_HEAD, "> **Previous version: v2.66.0** (session 269 — the", 1)

NEW_HEAD = """> **Current version: v2.67.0** (session 270 — the
liveness-fabrication, stacked-escape, and comment-truth round R-67:
the operator re-sent the standing directive after the R-66 ship pair
(3f54e94c + the owner's 006c3c39 session-log update carrying
docs/session_122.md, the owner's session-269 transcript — fetched and
reviewed at intake per the odd-number record convention, this record
riding docs/session_123.md). Per the recorded rhythm, findings-led
iteration: refresh, re-audit, remediate, verify, capture, document,
commit, push — with the operator's named asks (the mobile navigation
comparison, the Tailwind v4 state, the .env/db contract, the
vitest/playwright configs, the sitemap/SEO surface, the .env.example,
the screenshots, the SSH-wrapper push) re-verified along the way.)

The intake: the workspace had been reset — a fresh clone at HEAD
006c3c39 (tree clean), the environment rebuilt cold (bun install with
the postinstall prisma generate, .env from .env.example on the
DATABASE_URL="file:../db/custom.db" contract, db/ at the repo root,
db push + seed, census MATCH (81/4/3/6/5/7, users=1); the one
cold-start deviation environmental again — the cached Playwright
chromium build did not match the 1.65 pin (the headless-shell 1254
build installed, then the battery ran green). THE COLD BASELINE GREEN
AT HEAD — the v2.66.0 ship state reproduced exactly, no discovery:
lint 0/0 · tsc 0 · 1924/1924 unit (121 files) · build (the 4
documented Turbopack tracing warnings) · smoke 15/15 · 160/160 e2e ·
census MATCH.

The standing layers: probe:ref STABLE on every layer (the app bundle
1,402,874 bytes / md5 6d3779af…, the stylesheet md5 96f24d45…, the
demo-data ZERO census, the desktop nav census 256px · 9 links, the
TRUE-390 menu census opens=true · 9 destinations) · **the mobile-nav
comparison verified on BOTH sides at TRUE 390×844** (the reference
through probe:ref's agent-browser leg; the clone side riding the
production artifact on the scratch db/comparison.db per the
session-253 toolchain note — pre-open 0 · 9 destinations + Sign Out ·
the aria-expanded flip verified on open AND close · post-close 0 ·
no Tailwind v4 regression) · `bun audit` UNCHANGED (the 2-advisory
dev-chain census — the picomatch HIGH with no fix released plus the
minimatch chain, both re-triaged under F-268d's standing posture,
zero runtime) · neo-crm unchanged (b3d0fbe) · the SEO surface
verified (smoke leg 12: sitemap + robots + manifest 200) · the .env
contract + the db/ at the repo root + the vitest/playwright configs
+ the .env.example standing.

The session-270 fresh-eyes audit (three Mode-C passes — the R-66 cure
surfaces (the parity-269 battery 12/12, the parity-229 battery 21/21,
the docs-counts battery 18/18, and the security-ledger pin re-run
green at HEAD; every F-269 surface re-verified at file:line — the
padded-year bridge and its four consumers, the widened walk, the PAD
line with its widened pin window, the drawer guard with its self
carve-out, the sub-100 posture lock, the three comment riders) · the
API/auth/security layer (the TWENTY-THIRD consecutive clean bill —
all twelve house contracts, 30 route files / 45 handlers read
line-by-line, the census exact: GET 15 · POST 17 · PUT 6 · DELETE 6 ·
PATCH 1; seven fresh-eyes candidates dismissed into documented
postures: the upload/uploads key-collision arithmetic, the
colon-bearing email bucket mint, the reset-token timing channel, the
stale-version cookie mint, the settings/users no-op forms, the
unbounded-read posture, the coach network surface) · the UI/a11y/shell
layer (all eight standing contracts verified, the pinned battery
green; three new findings after dedup)): 0 Critical / 0 High / 0
Medium / 3 Low / 2 Informational NEW after dedup, every material
claim re-verified at file:line by the driving session (the duplicated
lockstep comment read directly against the R-66 commit diff; the
liveness fabrication live-proven through the engine's own semantics —
the offending token grepped absent from every walked code site while
passing the whole-tree invariant by self-satisfaction; the
stacked-order interleaving decoded through both guards' verbatim
logic — the card's dialog check stands down for the drawer, the
drawer's self-carved census sees no other dialog).

THE ROUND'S THREE LOWS: **F-270a the R-66 lockstep double-appended
its own comment block** (the docs-counts comment ladder carries the
Session-269 trio-advance comment twice — the insert form without the
idempotency guard, the F-242j genus biting the comment ladder; inert
today, the pins below it are correct, but the ladder's history is a
lie by duplication) · **F-270b the env example's hash-marked prose
fabricates live tokens** (the parity-229 splitter strips only the
slash-forms, so the env example's fifty hash-marked prose lines land
on the CODE side and their tokens join the live universe — the file's
prose self-satisfies the net AND fabricates repo-wide liveness for
the same token quoted in any other file's comment (the engine's
early-continue); live-proven: the offending first-session hyphenated
prose token rides .env.example line 36, appears nowhere in src, and
passes the whole-tree invariant by self-satisfaction; plus the
residue claim "the ignore list — never human-editable source" is
wrong — the ignore list is human-edited, comment-bearing, and inside
the scan set) · **F-270c the F-266d comment's standing-gap
parenthetical is half-stale and the stacked-order interleaving rides
unpinned** (the expenses guard's comment still names the
mobile-drawer stacking order as the standing battery gap, but R-66
landed the drawer's own twin guard — what genuinely rides unpinned is
the stacked-order e2e leg: the REACHABLE card-plus-drawer
interleaving below lg, where the in-flow filters card and the drawer
are both open and one Escape must close exactly one surface — decoded
through both guards' verbatim logic and correct at HEAD, but no e2e
ever exercised it). Plus: F-270d the post-F-238a history header row
keeps its two-child layout machinery with one child (inert; a comment
rider records why it stays — class changes on swept faces need
baseline re-derivation, the F-236e doctrine) · F-270e the drawer's
focus cycle excludes the skip link by design, unrecorded (the trade
is right — the drawer IS the navigation surface — but the contract
comment documented the scope without the exclusion; the one-line
registration lands).

**R-67.1** the pins born RED (the parity-270 battery: the
no-duplicated-ladder leg — the doubled Session-269 comment trips it ·
the F-270c comment-truth source leg · the F-270d/F-270e rider source
legs; the parity-229 engine extensions: the universe leg — the ignore
list joins the walk · the dialect leg — a hash-marked-only token of
the env example never joins the live universe; the maiden run catches
its second offender live — the .env.example prose carrier rewords
same-commit) → **R-67.2** the cures → **R-67.3** the verification
(parity-270 GREEN · parity-229 GREEN over the widened walk · lint 0/0
· tsc 0 · the unit suite at the new count · build · smoke 15/15 · the
FULL e2e battery (+1 leg: the stacked-order interleaving at 390 — the
filters card open, the drawer opened over it, the first Escape closes
the drawer ONLY, the second closes the card; zero new
signups/logins, the shared storageState rides) · census MATCH · the
six parity drift gates re-run (REQUIRED: the expenses page and the
drawer shell carry comment-only changes — the closed-state DOM is
unchanged by construction, and the chain is the proof) · the captures
(the stacked-order faces at 390: the both-open interleaving, the
post-first-Escape one-surface state) · the docs lockstep (the count
ladder 1924→1930 / 121→122 files / 160→161 e2e / badge 2084→2090,
the PAD v2.67.0 revision block, the §7.1 arch-pins advance, the guard
trio's advance to v2.65.0/v2.66.0/v2.67.0, the README row's advance
to R-67, the plan §5 gate cell). §5 carries the execution history.)

"""
p = insert_before(p, "> **Previous version: v2.66.0** (session 269 — the", NEW_HEAD, "head")

# ---- 2. the §2.28 ledger (before §3's heading) --------------------------
LEDGER = """### 2.28 Session-270 audit ledger (the fresh-eyes round over the v2.66.0 ship state)

Three Mode-C passes over HEAD 006c3c39 (the R-66 cure surfaces · the
API/auth/security layer · the UI/a11y/shell layer): all eight R-66
cure surfaces verified holding at file:line (the parity-269 battery
12/12, the parity-229 battery 21/21, the docs-counts battery 18/18,
and the security-ledger pin re-run green — the padded-year bridge with
its four consumers and the byte-identical current-year rider, the
widened walk over the prisma sources and the env example, the PAD
line with its widened pin window, the drawer's stacked-dialog guard
with the self carve-out and its three-way id pairing, the sub-100
custom-bound posture lock in both directions, the reset exception
claim, the upsert comment truing, the clock staleness registration —
every surface re-read); the API layer's TWENTY-THIRD consecutive
clean bill (all twelve house contracts, 30 route files / 45 handlers
— GET 15 · POST 17 · PUT 6 · DELETE 6 · PATCH 1, the census exact;
seven fresh-eyes candidates dismissed into documented postures); the
UI/a11y/shell layer — all eight standing contracts verified (the
plain drawer with its guard family, the theme-default seam and its
two mirrors, the v4 hazard axes, the carrier net, the label/focus/
live-region family, the stored-date routing, the
suppressHydrationWarning carriers, the route twins), three new
findings after dedup (one candidate dismissed: a claimed contract
citation drift traced to the audit prompt's own stale citation, not a
repo surface — the plan's contract texts carry no file path). Every
material claim re-verified at file:line by the driving session (the
duplicated ladder comment read directly; the liveness fabrication
proven through the engine's verbatim semantics with the offending
token grepped absent from every walked code site; the stacked-order
interleaving decoded through both guards' logic and confirmed
reachable below lg). The standing layers recorded in the version
header. NEW after dedup: 0 Critical / 0 High / 0 Medium / 3 Low /
2 Informational.

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-270a | Low | **THE R-66 LOCKSTEP DOUBLE-APPENDED ITS OWN COMMENT BLOCK — the docs-counts comment ladder carries the Session-269 trio-advance comment twice.** The R-66 session's lockstep rode partial re-runs (its own record names the PAD block stacking it deduped), and the comment-ladder insert — the plain form, no idempotency guard — appended the same three lines twice (287-292). Inert today: the pins below the ladder are correct and the battery is green. But the ladder is the guard's own history (the F-249b structural cure's paper trail), and a doubled row is the F-242j genus wearing a comment: the next lockstep's insert anchor becomes ambiguous and a future reader counts TWENTIETH twice. | `tests/docs-counts.test.ts:287-292` (the doubled block; the R-66 commit diff shows the same three lines added twice) | **R-67** (collapse to one copy; the parity-270 battery gains the no-duplicated-ladder leg — the comment ladder may never carry two adjacent identical blocks, the lockstep double-append genus gets its own teeth) |
| F-270b | Low | **THE ENV EXAMPLE'S HASH-MARKED PROSE FABRICATES LIVE TOKENS — the net's own disclosure names the routing but not the two consequences, and the residue claim about the ignore list is wrong.** The parity-229 splitter strips only the slash-slash and slash-star forms, so the env example's fifty hash-marked prose lines land on the CODE side and their tokens join the live universe. Two consequences: (a) a class-shaped token in the env example's prose is never flagged (the file self-satisfies the net — it is inside Tailwind's scan set, so a dead utility could emit from it with no net to catch it); (b) because the live universe is global, such a token FABRICATES repo-wide liveness — the same token quoted in any other file's comment is skipped by the engine's early-continue. Live-proven at HEAD: the offending first-session hyphenated prose token (head "first", a utility variant head) rides the env example line 36, appears nowhere in src or any walked code site, and passes the whole-tree invariant by self-satisfaction. Plus the F-269b residue claim ("the ignore list — machine-generated or non-code prose, never human-editable source") is factually wrong: the ignore list is human-edited, comment-bearing, and inside the scan set. | `tests/parity-229.test.ts` (the splitter's slash-forms; the LIVE_TOKENS collection; the early-continue; the residue claim) vs `.env.example:36` (the live proof) | **R-67** (the hash-dialect arm: the env example's and the ignore list's hash-marked lines route to the comments side — the env-dialect files get their own splitter branch; the ignore list joins the walk with the arm from birth; the residue shrinks to the lockfile and the license, both genuinely machine-generated; the maiden run catches the env example's prose carrier and rewords it same-commit; the dialect leg pins that a hash-marked-only token never joins the live universe) |
| F-270c | Low | **THE F-266d COMMENT'S STANDING-GAP PARENTHETICAL IS HALF-STALE — and the stacked-order interleaving it points at rides unpinned by e2e.** The expenses guard's comment still names "the mobile-drawer stacking order rides unpinned" as the standing battery gap, but R-66 landed the drawer's own twin guard (F-269d, source-pinned in parity-269, solo-Escape behavior pinned in the mobile battery). What genuinely rides unpinned is the stacked-order E2E leg: the REACHABLE interleaving below lg where the in-flow filters card (role group, position static — the F-265b re-scoping) and the drawer are both open. Decoded through both guards' verbatim logic and correct at HEAD: the card's dialog check stands down for the drawer (role dialog), the drawer's self-carved census sees no other dialog and closes — exactly one surface per press, the card on the second. No e2e ever exercised it; a fresh reader of the stale comment would re-derive F-269d as an open gap. | `src/app/(app)/expenses/page.tsx:196-199` (the stale parenthetical) vs `src/components/layout/mobile-nav.tsx:61-65` (the landed twin guard) | **R-67** (the comment trued to name the surviving e2e gap and cite the F-269d twin; the stacked-order e2e leg lands in the mobile battery — the filters card open, the drawer opened over it at 390, the first Escape closes the drawer ONLY, the second closes the card, the trigger face restored) |
| F-270d | Informational | **THE POST-F-238A HISTORY HEADER ROW KEEPS ITS TWO-CHILD LAYOUT MACHINERY WITH ONE CHILD.** After the F-238a cure moved the Tabs out as a sibling, the header row retains the responsive spread utilities with only the heading child — inert at every viewport (a single child; the spread never fires), no visual impact (the audited geometry pins stay green). A future reader may mistake it for the squeezed-row regression's remnant or "restore" a second child expecting the old geometry. The class set on a swept face is baseline-pinned — removing the machinery would need sweep re-derivation (the F-236e doctrine), a heavy round for a cosmetic win. | `src/app/(app)/expenses/page.tsx:715` (the single-child row) | **R-67** (the comment rider: one line recording that the row predates the sibling form and the machinery is inert-by-design — zero DOM change, zero drift; the F-236e cost is why the classes stay) |
| F-270e | Informational | **THE DRAWER'S FOCUS CYCLE EXCLUDES THE SKIP LINK BY DESIGN, UNRECORDED.** The wrap interceptor's scope (the header buttons plus the sheet's links and buttons) means backward Tab from the sheet's first link wraps to the cycle's tail — the skip link, which sits before the sheet in DOM order, is unreachable while the drawer is open. The trade is right (the drawer IS the navigation surface; a skip link behind a full-screen overlay is meaningless), and the e2e Tab-walk leg pins the scope's behavior — but the contract comment documents the scope without the exclusion, so a future a11y sweep will rediscover it as a gap. | `src/components/layout/mobile-nav.tsx:81-99` (the cycle scope) | **R-67** (the one-line trade registration in the focus-contract comment — the exclusion is deliberate, the drawer is the navigation surface) |

Recorded, not cured: the standing registers (F-269i/F-269j, F-268h/i/j,
F-267h/i, F-265f, F-264g/h/i, F-257a/r — all standing; the API layer's
twenty-third clean bill recorded above; the security census unchanged
under F-268d's standing posture). The toolchain note stands
(agent-browser/HeadlessChrome vs the Turbopack dev build — session
253; this session's clone-side comparison rode the production
artifact cleanly again). Next session defaults to findings-led
iteration — re-send the standing directive to continue the rhythm.

"""
p = insert_before(p, "## 3. The remediation program (R-items)", LEDGER, "ledger")

# ---- 3. the R-67 section (above R-66's) ---------------------------------
R67 = """### R-67 — The liveness-fabrication, stacked-escape, and comment-truth round (session 270)

The operator re-sent the standing directive after the R-66 ship pair
(3f54e94c + the owner's 006c3c39 session-log update carrying
docs/session_122.md, the owner's session-269 transcript — fetched and
reviewed at intake per the odd-number record convention). Per the
recorded rhythm, findings-led iteration. The intake and the standing
layers are recorded in the version header above; this section carries
the findings, the cures, and the verification contract.

**The findings (each verified at file:line by the driving session —
the API layer's twenty-third consecutive clean bill is the round's
clean column; every finding lives on the net, the docs, or the
shell):** the §2.28 ledger's five rows — F-270a THE DUPLICATED
LOCKSTEP COMMENT (the comment ladder's plain-form insert
double-appended the Session-269 trio-advance block; the F-242j genus
biting the ladder) · F-270b THE ENV EXAMPLE'S PROSE FABRICATES LIVE
TOKENS (the round's flagship: the splitter's slash-forms route the
env example's hash-marked prose to the CODE side — the file
self-satisfies the net and fabricates repo-wide liveness through the
engine's early-continue; live-proven with a hyphenated prose token
absent from every walked code site; the ignore-list residue claim
wrong the same way) · F-270c THE HALF-STALE STANDING-GAP COMMENT AND
THE UNPINNED STACKED-ORDER INTERLEAVING (the F-266d parenthetical
predates the F-269d twin guard; the reachable card-plus-drawer
interleaving below lg decoded correct but never e2e-exercised) ·
F-270d/F-270e the two comment riders (the inert single-child row, the
skip-link cycle exclusion).

**The cures (R-67.2):** the docs-counts comment ladder collapses to
one copy. The parity-229 engine gains the hash-dialect arm — the env
example's and the ignore list's hash-marked lines route to the
comments side (the env-dialect branch lives beside the slash-forms;
the assignment lines and the pattern lines stay code), the ignore
list joins the walk with the arm from birth, the residue comment
trues to the lockfile and the license alone, and the maiden run's
catch — the env example's prose carrier — rewords same-commit (the
session-169 throw on the first session operation; the reword's own
discipline: describe with spaces, never a hyphenated coinage after a
variant head). The expenses F-266d comment trues to name the
surviving e2e gap and cite the F-269d twin. The single-child history
row gains its inert-by-design rider. The drawer's focus-contract
comment registers the skip-link exclusion. The mobile battery gains
the stacked-order e2e leg.

**The verification contract (R-67.3):** the parity-270 battery born
honest RED against the pre-cure tree (the no-duplicated-ladder leg —
the doubled Session-269 comment trips it · the F-270c comment-truth
source leg · the F-270d/F-270e rider source legs) with the
parity-229 engine extensions RED (the universe leg — the ignore list
joins the walk · the dialect leg — a hash-marked-only token of the
env example never joins the live universe; the maiden run catches the
prose carrier live, the second offender the net has ever taken) →
the cures → parity-270 GREEN · parity-229 GREEN over the widened walk
→ lint 0/0 · tsc 0 · the unit suite at the new count · build · smoke
15/15 · the FULL e2e battery (+1 leg: the stacked-order interleaving
at 390 — the filters card open, the drawer opened over it, the first
Escape closes the drawer ONLY, the second closes the card; zero new
signups/logins, the shared storageState rides) · census MATCH · the
drift chain re-run (the four sweep classes + the fullpage sweep + the
interior census — REQUIRED again: the expenses page and the drawer
shell changed; the changes are comment-only, the closed-state DOM is
unchanged by construction, so the standing baselines are expected to
hold, and the chain is the proof) · the captures (the stacked-order
faces at 390: the both-open interleaving, the post-first-Escape
one-surface state — the round's rendered subject, plus the standing
mobile drawer).

"""
p = insert_before(p, "### R-66 — The unpadded-year, net-universe, and drawer-guard round (session 269)", R67, "R-67 section")

# ---- 4. the §5 execution-history row (above v2.66.0's) ------------------
ROW = """| v2.67.0 | 270 | **R-67** (the liveness-fabrication, stacked-escape, and comment-truth round — findings-led, the standing directive with the reference STABLE on every standing drift layer and the mobile-navigation ask verified on BOTH sides at TRUE 390×844 (the reference through probe:ref's agent-browser leg; the clone side riding the production artifact on the scratch db/comparison.db per the session-253 toolchain note — the aria-expanded flip verified on open AND close, zero visible nav links after the close); the workspace had been RESET — a fresh clone at HEAD 006c3c39 with the environment rebuilt cold (the one deviation environmental: the fresh sandbox carried the wrong Playwright chromium build, the headless-shell 1254 installed before the battery); the cold baseline GREEN at HEAD — the v2.66.0 ship state reproduced exactly, no discovery). The audit round: the standing layers re-verified (probe:ref STABLE; `bun audit` UNCHANGED — the 2-advisory dev-chain census under F-268d's standing posture; neo-crm unchanged (b3d0fbe); the SEO surface verified (smoke leg 12); the .env contract + the db/ at the repo root + the configs + the .env.example standing). The session-270 fresh-eyes audit (three Mode-C passes: the R-66 cure surfaces — the parity-269/parity-229/docs-counts batteries + the security-ledger pin re-run green · the API/auth/security layer — the TWENTY-THIRD consecutive clean bill (twelve contracts, 45 handlers / 30 route files, 7 dismissed candidates) · the UI/a11y/shell layer — all eight standing contracts verified, three new findings after dedup, one candidate dismissed as the audit prompt's own stale citation): 0 Critical / 0 High / 0 Medium / 3 Low / 2 Informational NEW after dedup, every material claim re-verified at file:line (the duplicated ladder comment read directly; the liveness fabrication live-proven through the engine's semantics with the offending token grepped absent from every walked code site; the stacked-order interleaving decoded through both guards' verbatim logic). THE ROUND'S CURES: F-270a the docs-counts comment ladder collapsed to one copy + the no-duplicated-ladder pin · F-270b the hash-dialect arm (the env example's and the ignore list's hash-marked lines route to the comments side) + the ignore list joins the walk + the residue trued to the lockfile and license + the maiden catch reworded · F-270c the F-266d comment trued + the stacked-order e2e leg · F-270d/F-270e the two comment riders. The plan v2.67.0 written and validated against the tree. **R-67.1** the pins born RED (the parity-270 battery + the parity-229 engine extensions; the maiden run catches the env example's prose carrier live) → **R-67.2** the cures → **R-67.3** the verification (parity-270 GREEN · parity-229 GREEN over the widened walk · lint 0/0 · tsc 0 · the unit suite at the new count · build · smoke 15/15 · the FULL e2e battery (+1 leg) · census MATCH · the drift chain re-run · the captures — the stacked-order faces, the standing mobile drawer) | lint 0/0 · tsc 0 · **1930 unit (122 files, +6)** · build · smoke 15/15 · **161 e2e (+1)** · census MATCH · the six parity drift gates CLEAN | (this session's execution commit) |
"""
p = insert_before(p, "| v2.66.0 | 269 | **R-66** (the unpadded-year, net-universe, and drawer-guard round", ROW, "§5 row")

with open("docs/remediation_plan_v2.md", "w", encoding="utf-8") as f:
    f.write(p)

print("[plan-270] v2.67.0 written: head flip + §2.28 ledger + R-67 section + §5 row")
