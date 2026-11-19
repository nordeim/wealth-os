#!/usr/bin/env python3
"""Session-276 plan write — remediation_plan_v2.md v2.72.0 → v2.73.0
(R-73, the table-structure, census-truth, and phantom-comment round).

Insertions only, every site asserted (the F-242j lesson): the new
Current-version header block (the v2.72.0 block flips to Previous),
the §2.34 ledger (before §3's heading), and the R-73 section (above
R-72's). The §5 execution-history row rides scripts/history-276.py at
lockstep time (after the gate runs, so the counts carry the verified
values) — and the §5 table-structure cure (F-276a) lands BEFORE that
row so the new row rides the healed table."""

import sys


def insert_before(text: str, anchor: str, block: str, label: str) -> str:
    n = text.count(anchor)
    if n != 1:
        sys.exit(f"[{label}] expected 1 anchor, found {n}: {anchor[:60]!r}")
    return text.replace(anchor, block + anchor, 1)


with open("docs/remediation_plan_v2.md", encoding="utf-8") as f:
    p = f.read()

# ---- 1. the head: flip v2.72.0 to Previous, insert v2.73.0 above it -----
CUR_HEAD = "> **Current version: v2.72.0** (session 275 — the"
if p.count(CUR_HEAD) != 1:
    sys.exit("[head] the v2.72.0 Current header not found in the expected form")
p = p.replace(CUR_HEAD, "> **Previous version: v2.72.0** (session 275 — the", 1)

NEW_HEAD = """> **Current version: v2.73.0** (session 276 — the
table-structure, census-truth, and phantom-comment round R-73: the
operator re-sent the standing directive after the R-72 ship pair
(9d20a0cb + the owner's 009f5035 session-log update carrying
docs/session_134.md, the session-275 transcript — fetched by the
fresh clone and reviewed at intake per the odd-number record
convention, this record riding docs/session_135.md). Per the
recorded rhythm, findings-led iteration: refresh, re-audit,
remediate, verify, capture, document, commit, push — with the
operator's named asks (the mobile navigation comparison, the
Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.)

The intake: the workspace had been RESET (a fresh clone at HEAD
009f5035 — tree clean; the prior session's work ALREADY SHIPPED as
9d20a0cb + the owner's session-log update); the environment rebuilt
cold (bun install, 594 packages, the postinstall prisma generate into
src/generated/prisma; .env from .env.example on the
DATABASE_URL="file:../db/custom.db" contract; db/ at the repo root;
db push + seed; census MATCH (81/4/3/6/5/7, users=1)); the toolchain
legs (the chromium headless-shell 1254 install the e2e battery
rides; paramiko 5.1.0 for the SSH push shim).

THE COLD BASELINE GATE GREEN AT HEAD — the v2.72.0 ship state
reproduced exactly, no discovery: lint 0/0 · tsc 0 · 1997/1997 unit
(127 files) · build (the 4 documented Turbopack tracing warnings) ·
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
200; the metadata/pwa/page-titles pins green inside the 1997) · the
.env contract + the db/ at the repo root + the vitest/playwright
configs + the .env.example standing.

The session-276 fresh-eyes audit (three Mode-C research passes
dispatched as parallel research subagents per the house convention,
every material claim re-verified at file:line by the driving session
— the R-72 cure surfaces: all five HOLDING (the parity-275 battery
7/7 inside the cold-gate's 1997/1997 full-suite run; the dialog
docblock truth, the PAD pipes, the a11y coverage note, the scroll
calls, the AGENTS cross-ref all read at file:line) · the
API/auth/security layer: the TWENTY-NINTH consecutive clean bill
(all thirteen house contracts, 45 handlers / 30 route files read
line-by-line — the census re-verified at exactly 30 this round;
every candidate dismissed into documented postures) · the UI/a11y/
shell layer: all eight standing contracts verified holding live (a
custom repo-wide class scanner swept src for phantom variants and
unpinned token classes — zero finds; the store's clear-era contract
intact; the .dark token flip complete)). The genuine rot this round:
FIVE LOW findings (the plan's own §5 history table broken at the
GFM structure layer, ten ledger rows carrying unescaped pipes, one
phantom cure element in the R-72 ledger, one stale docblock census,
one missing contract pointer) and the registered notes — 0 Critical
/ 0 High / 0 Medium / 5 Low / 7 Informational NEW after dedup, every
material claim re-verified at file:line.

The round's flagship: **F-276a the §5 execution-history table never
renders as a table — the GFM structure is broken.** The header row
carries NO delimiter row after it (the only delimiter sits orphaned
mid-table after a blank line), nine blank lines split the row block
into paragraphs, and the v2.47.0 row carries only three cells (the
gate-at-ship and commit cells were never written — its prose cell
swallows the tail). On GitHub the plan's central history artifact
renders as pipe-laden text walls; the raw text is intact and every
§5 pin is a leading-cell regex (the F-275b blind-spot class), so the
rot was invisible to every gate. The F-247i/F-275b genus one layer
deeper: not pipes inside cells this time but the table's own
structure.

The round's riders: **F-276b the ten §2-ledger rows' unescaped
pipes** (the F-247i genus, the uncured remainder — R-72 cured the
PAD's one row while the plan file's own ledger never got the sweep;
a whole-doc per-table pipe census found exactly these ten: F-222a,
F-226k, F-236f, F-238k, F-238n, F-242g, F-244e, F-244i, F-251d,
F-257r) · **F-276c the R-72 ledger's phantom comment** (the F-275d
disposition claims the three open-state a11y legs gained the scroll
helper call "with the modal-rationale comment" — the comment never
shipped; the parity-275 pins assert only the calls, so the tree and
the ledger disagree on what the cure was; the cure completes the
claimed form rather than rewording the ledger twice) · **F-276d the
body-ceiling docblock's stale family census** (src/lib/api.ts's
present-tense "the family is THIRTEEN routes" under-counts — the
budgets POST and budgets DELETE pair rides the same default 16KB
ceiling through parseBody; the honest census is 15 routes; the
pass-B clean bill caught it) · **F-276e the AGENTS a11y contract
line's missing floor pointer** (the "WCAG 2.2 AA" design-target
claim rides the contract site unqualified while the F-275c
coverage-truth note lives only inside the spec header — the one-line
pointer lands where contributors read). Registered: F-276f the
doc-set's remaining design-target phrasing (the F-275c adjudicated
posture), F-276g the pass-B informational postures (the in-band
OTP/reset delivery and the default direct-exposure keying — both
warned at production boot, both documented trades), F-276h the
pass-C informational postures (the render-time clocks' loading-gate
dependency documented at page-parts.tsx; the reserved soft tokens'
dark-flip rule documented at globals.css), F-276i the standing PNG
regeneration (the comparison run rewrites mobile-nav-clone-390.png at
the standing name — the live-asserted capture is the session's
evidence, committed with the round).

The execution contract (R-73): the plan v2.73.0 written and
validated against the tree (this script, insertions only, every
anchor asserted) → **R-73.1** the pins born honest RED (the
parity-276 battery — 10 legs over the false and missing forms at
HEAD) → **R-73.2** the cures (the §5 table repair: the delimiter
under the header, the nine blank separators dropped, the orphan
delimiter dropped, the v2.47.0 row's gate + commit cells restored
from the session-250 worklog record; the ten §2 rows' pipes
escaped; the three open-state legs' modal-rationale comment; the
api.ts docblock's fifteen-route census; the AGENTS pointer) →
**R-73.3** the verification (parity-276 GREEN · the sibling
batteries GREEN · docs-counts GREEN at the advanced trio (the
v2.73.0 block lands together with the advance — the F-249b
structural gate enforces the pairing) · lint 0/0 · tsc 0 · the unit
suite at the new count · build · smoke 15/15 · the FULL e2e battery
161/161 (zero new legs — the round changes comments, doc tables,
and docblocks; no swept surface moves, no pixel can shift) · census
MATCH · the captures (the standing evidence faces + the round's
touched faces — the a11y dialog family's own face, the drawer at
390, the flagship dashboard).

"""

p = insert_before(p, "> **Previous version: v2.72.0**", NEW_HEAD, "new-head")

# ---- 2. the §2.34 ledger (before §3's heading) ---------------------------
LEDGER = """### 2.34 Session-276 audit ledger (the fresh-eyes round over the v2.72.0 ship state)

Three Mode-C passes (the R-72 cure surfaces · the API/auth/security
layer · the UI/a11y/shell layer) + the driving session's own
re-verification, every material claim re-verified at file:line. The
API layer's twenty-ninth consecutive clean bill and the UI layer's
eight standing contracts are the round's clean columns; the genuine
rot is one broken table structure, ten unescaped-pipe rows, one
phantom cure element, one stale census, and one missing pointer.

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-276a | Low | **THE §5 EXECUTION-HISTORY TABLE NEVER RENDERS AS A TABLE — the GFM structure is broken.** The header row (`\\| Version \\| Session \\| R-items executed \\| Gate at ship \\| Commit \\|`) carries NO delimiter row after it; the only delimiter row sits orphaned mid-table after a blank line; nine blank lines split the row block into paragraphs; and the v2.47.0 row carries only three cells (its prose cell swallows what the sibling rows split into gate-at-ship and commit cells — the session-250 ship counts live in the worklog: 1668 unit (102 files), 151 e2e, six drift gates CLEAN at the re-derived baselines). On GitHub the plan's central history artifact renders as pipe-laden text walls. Every §5 pin is a leading-cell regex (the F-275b blind-spot class), so the rot was invisible to every gate — the parity-258 ordering leg extracts rows by regex and never checks the rendered form. | `docs/remediation_plan_v2.md:11087-11110` (the header, the blank separators, the orphan delimiter) + `:11120` (the v2.47.0 row) | **R-73** (the delimiter lands under the header; the nine blank separators drop; the orphan delimiter drops; the v2.47.0 row gains its gate + commit cells from the session-250 worklog record — the table renders as a table; pinned by the parity-276 table-structure legs) |
| F-276b | Low | **TEN §2-LEDGER ROWS CARRY UNESCAPED PIPES INSIDE CELL CONTENT — the F-247i genus, the uncured remainder.** R-72 cured the PAD's one domain-seams row while the plan file's own §2 ledger never got the sweep; a whole-doc per-table pipe census (each data row's unescaped-pipe count vs its table header's) found exactly these ten: F-222a (the designated-tail regex), F-226k (the Pause and Activate pair), F-236f (the shell gate), F-238k (the transient codes), F-238n (the bootEnvCheck disjunct), F-242g (the loading gate), F-244e (the walker character classes), F-244i (the tee'd scripts), F-251d (the Pick field list), F-257r (the auth-path regex). Each row renders with phantom cells that shift Location and bleed Disposition. | `docs/remediation_plan_v2.md:4080, 4175, 4382, 4440, 4443, 4540, 4580, 4584, 4771, 4886` | **R-73** (the in-cell pipes escape — every row renders its header's cell count; pinned by the parity-276 per-row legs + the whole-doc per-table census leg) |
| F-276c | Low | **THE R-72 LEDGER'S F-275d DISPOSITION CLAIMS A MODAL-RATIONALE COMMENT THAT NEVER SHIPPED — a phantom cure element in the round's own ledger.** The F-275d row says the three open-state a11y legs gain the helper call "with the modal-rationale comment" and the R-72.2 prose repeats it, while the tree carries only the bare calls (zero modal, no-op, or lock rationale text in the spec) — the parity-275 pins assert only the calls and the 13-call census, so nothing watched the comment. The tree and the ledger disagree on what the cure was; worse, the rationale that explains why a no-op call must stay is absent exactly where a future tidy-up would delete it. | `docs/remediation_plan_v2.md:5633` (the F-275d row) + `:8018` (the R-72.2 prose) vs `tests/e2e/a11y.spec.ts:311, 322, 395` (the bare calls) | **R-73** (the comment lands at the three legs — the tree now matches the ledger's claim; pinned by the parity-276 per-leg comment pins + the comment census) |
| F-276d | Low | **THE BODY-CEILING DOCBLOCK'S PRESENT-TENSE FAMILY CENSUS IS STALE.** `MAX_AUTH_BODY_BYTES`' docblock claims "the family is THIRTEEN routes (the sessioned resource families x(root+[id]) + settings + users + reset)" while the budgets POST and budgets DELETE pair also rides the default 16KB ceiling through `parseBody` — the honest census is 15 routes. Zero runtime effect (the ceiling applies either way); the house treats seam docblocks as load-bearing records — a future family sweep keyed on the enumeration would miss the budgets pair (the F-237b docblock edition). | `src/lib/api.ts:124-129` (the census) vs `src/app/api/budgets/route.ts:41, 112` (the pair) | **R-73** (the census reworded to the fifteen-route truth naming the budgets pair — the historical narrative kept, the present-tense claim fixed; pinned by the parity-276 docblock legs) |
| F-276e | Informational | **THE AGENTS A11Y CONTRACT LINE CARRIES THE DESIGN TARGET WITHOUT THE FLOOR POINTER.** The "every page must stay axe-clean at WCAG 2.2 AA" line rides the contract site (where contributors read standing rules) unqualified, while the F-275c coverage-truth note lives only inside the a11y spec header — a contributor adding a small control could believe the blanket gate covers the 2.2-only target-size criterion; it does not (disabled by default in axe-core 4.14, rides the bespoke hit-area pins). The one-line pointer lands at the contract site. | `AGENTS.md:99` vs `tests/e2e/a11y.spec.ts:16-28` (the note) | **R-73, the doc-truth rider** (the line gains the pointer — the design target named as the design target, the bespoke-pin register cited; pinned by the parity-276 pointer leg) |
| F-276f | Informational | **THE DOC SET'S REMAINING DESIGN-TARGET PHRASING STANDS THE F-275c ADJUDICATION.** README:47 and SKILL §8 keep the "WCAG 2.2 AA" design-target form without the floor qualifier; the bridge now lives at the spec header (F-275c) and the contract pointer (F-276e). | `README.md:47`; `wealth-os_SKILL.md:475-477` | Registered (the adjudicated posture — the design target stands as the design target) |
| F-276g | Informational | **THE PASS-B CLEAN-BILL INFORMATIONAL POSTURES STAND — the documented trades.** The in-band OTP and reset-link delivery (knobs `NEO_DISABLE_IN_APP_OTP` and `NEO_DISABLE_IN_APP_RESET`, warned at every production boot) and the default direct-exposure limiter keying (unset `NEO_PROXY_HOPS` trusts the last XFF hop; operators on direct exposure set 0). Both recorded so a fresh operator sees the boot warnings' origin. | `src/app/api/auth/signup/route.ts:169`; `src/lib/rate-limit.ts:118-127` | Registered (the documented postures) |
| F-276h | Informational | **THE PASS-C INFORMATIONAL POSTURES STAND — the documented dependencies.** The eight render-time clock sites in client pages are hydration-safe only by the AppShell loading gate (the belt-and-suspenders suppression and the page-parts comment are the tripwire — already documented); the reserved soft tokens stay light in dark mode by documented design (the globals rule: a future dark consumer flips its own token in the same commit). | `src/app/(app)/expenses/page.tsx:128` et al.; `src/app/globals.css:129-151` | Registered (the documented postures) |
| F-276i | Informational | **THE STANDING PNG REGENERATION — the comparison run rewrites `mobile-nav-clone-390.png` at the standing name.** The session's comparison-265.ts run (live-asserted: 9 destinations + Sign Out, the aria-expanded flip, the census tripwire MATCH) rewrites the tracked standing capture — the live-asserted capture IS the session's evidence and rides the round's commit. | `docs/screenshots/mobile-nav-clone-390.png` | Registered (the standing-name convention) |

Recorded, not cured: F-276f through F-276i. The audit's clean
columns: the API/auth/security layer's twenty-ninth consecutive
clean bill (thirteen contracts, 45 handlers / 30 route files — the
census re-verified at exactly 30 this round) and the UI/a11y/shell
layer's eight standing contracts all holding live. The round also
re-confirmed the standing registered postures (the ADR-014 in-band
OTP/reset delivery, the capability-URL publicity, the CSP
fetch-directive pin, the scrypt promisification, the empty-PUT
guard, the clear-era contract, the burn-order doctrine).

"""

p = insert_before(p, "## 3. The remediation program (R-items)", LEDGER, "ledger")

# ---- 3. the R-73 section (above R-72's) ----------------------------------
R73 = """### R-73 — The table-structure, census-truth, and phantom-comment round (session 276)

The operator re-sent the standing directive after the R-72 ship pair
(9d20a0cb + the owner's 009f5035 session-log update carrying
docs/session_134.md, the session-275 transcript — fetched by the
fresh clone and reviewed at intake per the odd-number record
convention, this record riding docs/session_135.md). Per the
recorded rhythm, findings-led iteration. The intake and the standing
layers are recorded in the version header above; this section
carries the findings, the cures, and the verification contract.

**The findings (each verified at file:line by the driving session —
the API layer's twenty-ninth consecutive clean bill and the UI
layer's eight standing contracts are the round's clean columns; the
genuine rot is one broken table structure, ten unescaped-pipe rows,
one phantom cure element, one stale census, and one missing
pointer):** the §2.34 ledger's rows — F-276a THE ROUND'S FLAGSHIP
(the §5 execution-history table never renders as a table: no
delimiter under the header, nine blank separators, an orphan
delimiter mid-table, and the v2.47.0 row three cells short — every
§5 pin is a leading-cell regex, the F-275b blind-spot class) · F-276b
THE PIPE SWEEP (the ten §2 rows carrying unescaped pipes — the
F-247i genus, the uncured remainder; found by a whole-doc per-table
pipe census) · F-276c THE PHANTOM COMMENT (the R-72 ledger's F-275d
disposition claims a modal-rationale comment that never shipped —
the tree and the ledger disagree on what the cure was) · F-276d THE
CENSUS TRUTH (the body-ceiling docblock's present-tense THIRTEEN
under-counts — the budgets pair rides the same ceiling; the honest
census is 15 routes) · F-276e THE POINTER RIDER (the AGENTS a11y
contract line's design-target claim carries no floor pointer — the
F-275c note lives only inside the spec header).

**The cures (R-73.2):** the §5 table repair (the delimiter lands
under the header; the nine blank separators drop; the orphan
delimiter drops; the v2.47.0 row gains its gate + commit cells from
the session-250 worklog record — 1668 unit (102 files), 151 e2e,
six drift gates CLEAN at the re-derived baselines); the ten §2
rows' in-cell pipes escape (the F-247i form — every row renders its
header's cell count); the three open-state a11y legs gain the
modal-rationale comment (the tree completes the ledger's claim —
the comment explains why the no-op call must stay, the exact
surface where a future tidy-up would delete it); the api.ts
docblock's family census rewords to the fifteen-route truth naming
the budgets pair (the historical narrative kept, the present-tense
claim fixed); the AGENTS a11y line gains the floor pointer (the
design target named as the design target, the bespoke-pin register
cited, the spec header note referenced).

**The verification contract (R-73.3):** the parity-276 battery born
honest RED against the pre-cure tree (the false and missing forms
ride the tree at HEAD: the broken table structure, the bare pipes,
the absent comments, the stale census, the absent pointer) → the
cures → parity-276 GREEN · the sibling batteries GREEN (parity-275 ·
the standing family · docs-counts at the advanced trio — the
v2.73.0 block lands together with the advance, the F-249b
structural gate enforcing the pairing) → lint 0/0 · tsc 0 · the
unit suite at the new count · build · smoke 15/15 · the FULL e2e
battery 161/161 (zero new legs — the round changes comments, doc
tables, and docblocks; no swept surface moves, no pixel can
shift) · census MATCH · the captures (the standing evidence faces +
the round's touched faces — the a11y dialog family's own face, the
drawer at 390, the flagship dashboard).

"""

p = insert_before(
    p,
    "### R-72 — The docblock-tail, pipe-truth, and gate-coverage round (session 275)",
    R73,
    "r73-section",
)

with open("docs/remediation_plan_v2.md", "w", encoding="utf-8") as f:
    f.write(p)

print("plan v2.73.0 written: head flip + §2.34 ledger + R-73 section")
