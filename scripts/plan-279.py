#!/usr/bin/env python3
"""Session-279 plan write — remediation_plan_v2.md v2.75.0 → v2.76.0
(R-76, the walker-unification, cell-count, and indented-fence round).

Insertions only, every site asserted (the F-242j lesson): the new
Current-version header block (the v2.75.0 block flips to Previous),
the §2.37 ledger (before §3's heading), and the R-76 section (above
R-75's). The §5 execution-history row rides scripts/history-279.py at
lockstep time (after the gate runs, so the counts carry the verified
values).

The round's ledger (every material claim re-verified at file:line by
the driving session after the three Mode-C passes): 0 Critical /
0 High / 0 Medium / 3 Low / 2 Informational NEW after dedup —
F-279a the census walkers' delimiter-shape drift (parity-276's
colon-blind predicate walks the evaluation report's sixteen
colon-aligned delimiter rows as DATA rows — green only because each
delimiter's pipe count happens to equal its header's) · F-279b no
census validates GFM's header-vs-delimiter cell-count requirement (a
delimiter that drops a cell passes all three batteries while GitHub
renders paragraphs — 126/126 live tables clean today) · F-279c the
fence strippers toggle only on column-0 fences (the indented
list-item fences at README/SKILL/DEPLOYMENT never blanked — the
F-277d fence-awareness's indented sibling, zero live pipe rows
inside them) · F-279d registered-then-cured rider (the two
instant-parse sites gain the instant-vs-calendar comments) · F-279e
registered (the a11y claim-vs-mechanism bridge — already
parity-275-pinned). The in-cell regex pipes ride the escaped house
form (the F-247i doctrine — the round's own plan rows must pass the
round's own censuses)."""

import sys


def insert_before(text: str, anchor: str, block: str, label: str) -> str:
    n = text.count(anchor)
    if n != 1:
        sys.exit(f"[{label}] expected 1 anchor, found {n}: {anchor[:60]!r}")
    return text.replace(anchor, block + anchor, 1)


with open("docs/remediation_plan_v2.md", encoding="utf8") as f:
    p = f.read()

# ---- 1. the head: flip v2.75.0 to Previous, insert v2.76.0 above it -----
CUR_HEAD = "> **Current version: v2.75.0** (session 278 — the"
if p.count(CUR_HEAD) != 1:
    sys.exit("[head] the v2.75.0 Current header not found in the expected form")
p = p.replace(CUR_HEAD, "> **Previous version: v2.75.0** (session 278 — the", 1)

NEW_HEAD = """> **Current version: v2.76.0** (session 279 — the
walker-unification, cell-count, and indented-fence round R-76: the
operator re-sent the standing directive after the R-75 ship pair
(2c33aa91 + the owner's bda839a8 session-log update carrying
docs/session_140.md, the session-278 transcript — fetched by the
fresh clone and reviewed at intake per the odd-number record
convention, this record riding docs/session_141.md). Per the
recorded rhythm, findings-led iteration: refresh, re-audit,
remediate, verify, capture, document, commit, push — with the
operator's named asks (the mobile navigation comparison, the
Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.)

The intake: the workspace had been RESET (a fresh clone at HEAD
bda839a8 — tree clean; the prior session's work ALREADY SHIPPED as
2c33aa91 + the owner's session-log update); the environment rebuilt
cold (bun install, 594 packages, the postinstall prisma generate
into src/generated/prisma; .env from .env.example on the
DATABASE_URL="file:../db/custom.db" contract; db/ at the repo root;
db push + seed; census MATCH (81/4/3/6/5/7, users=1)); the toolchain
legs (the chromium headless-shell 1254 install the e2e battery
rides; paramiko 5.1.0 for the SSH push shim).

THE COLD BASELINE GATE GREEN AT HEAD — the v2.75.0 ship state
reproduced exactly, no discovery: lint 0/0 · tsc 0 · 2029/2029 unit
(130 files) · build (the 4 documented Turbopack tracing warnings) ·
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
UNCHANGED (the two-vulnerability dev-chain census the R-74 re-anchor
carries — the effect HIGH via prisma CLI's @prisma/config exact-pin
plus the minimatch moderate; the runtime @prisma/client chain clean)
· neo-crm unchanged (b3d0fbe, ls-remote-verified) · the SEO surface
verified (smoke leg 12: sitemap + robots + manifest 200; the
metadata/pwa/page-titles pins green inside the unit suite) · the
.env contract + the db/ at the root + the vitest/playwright configs
+ the .env.example standing.

The session-279 fresh-eyes audit (three Mode-C research passes
dispatched as parallel research subagents per the house convention,
every material claim re-verified at file:line by the driving session
— the R-75 cure surfaces: all five HOLDING (the parity-278 battery
10/10 inside the cold-gate's full-suite run; the two escaped rows,
the two fifteen-file DOCS lists, the two indented-row predicates, the
a11y register's cite-unique dedup all read at file:line; the live
coverage census re-derived: exactly 16 tracked markdown at root/docs
= the 15 family files + the F-227a symlink, zero strays) · the
API/auth/security layer: the THIRTY-SECOND consecutive clean bill
(all thirteen house contracts, 45 handlers / 30 route files read
line-by-line — the census re-verified at exactly 30; the focused
security battery 153/153; every candidate dismissed into documented
postures) · the UI/a11y/shell layer: all eight standing contracts
verified holding live (the drawer mechanics, the theme three-way
seam, the v4 scanner with the whole-tree invariant + the bare-word
net, the a11y two-gate, the shell twins, the geometry pin, the date
seams, the escape stacking; the z-ladder census exact at
10/40/50/60/100; every SKILL file-card count verified
drift-free)): 0 Critical / 0 High / 0 Medium / 3 Low /
2 Informational NEW after dedup, every material claim re-verified
at file:line (the driving-session genus census: 16 live colon-aligned
delimiter rows walked as data by parity-276, 0 live cell-drop
instances, 0 live pipe rows inside indented fences).

The round's flagship: **F-279a the census walkers' delimiter-shape
drift — parity-276's colon-blind predicate walks the evaluation
report's sixteen colon-aligned delimiter rows as DATA rows, green
only because each delimiter's pipe count happens to equal its
header's.** The three batteries ship two different delimiter
predicates: parity-276's inline `/^ {0,3}\\|[-\\| ]+\\|$/` (no colons,
no trailing whitespace) skips only colon-less delimiters, while
parity-277/278's shared `isDelimiter` (`/^\\s*\\|[\\s:\\|-]+\\|\\s*$/`)
admits the colon-aligned GFM form — and
docs/web-app-codebase-evaluation-report.md carries sixteen
colon-aligned delimiter rows (the `|:---:|---|…` alignment form,
lines 15/39/192/214/228/242/263/279/294/312/328/348/375/396/421/438)
that parity-276's census counts as data rows: the census's green
rides the accident that every one of the sixteen carries the same
pipe count as its header (a colon-aligned delimiter that ever drops
or adds a cell would split the walkers' verdicts — split-brain genus
in a pair the round's own doctrine calls consistent).

The round's riders: **F-279b no census validates GFM's
header-vs-delimiter cell-count requirement** (GFM renders no table
when the delimiter's cell count mismatches the header's — a plain
delimiter that drops a cell passes all three batteries while GitHub
renders paragraphs; the live family's 126 delimiter-bearing tables
are all count-matched today, the driving-session census) · **F-279c
the fence strippers toggle only on column-0 fences** (the indented
list-item fences at README:117–143, wealth-os_SKILL.md:1192–1195,
and docs/DEPLOYMENT.md:51–64 — real GFM fences inside numbered lists
— are never blanked by any walker; zero pipe-prefixed lines ride
inside them today; the F-278b indented-row predicate's own fence
remainder) · **F-279d the two instant-parse sites' comment riders**
(finance.ts:379's createdAt tiebreak and verification.ts:73's
expiresAt check are raw instant parses CORRECT on stored TIMESTAMP
values — routing them through toDate would MIS-sort a timestamp
landing exactly on UTC midnight; the one-line comments name the
instant-vs-calendar split so a future doctrine sweep cannot "fix"
them backwards — the F-228c identity-proving lesson's prophylactic
form).

Registered, not cured: F-279e (the a11y two-gate's WCAG-2.2-AA
letter is an executable floor — axe's default-enabled set is
2.0/2.1 and the 2.2-only criteria ride the bespoke hit-area pins;
the claim-vs-mechanism bridge is already self-pinned at
parity-275 — re-registering it as cured would be gratuitous).

The execution contract (R-76): the plan v2.76.0 written and
validated against the tree (this script, insertions only, every
anchor asserted) → **R-76.1** the pins born honest RED (the
parity-279 battery: the false and missing forms ride the tree at
HEAD — the colon-blind delimiter predicate, the missing cell-count
legs, the column-0-only fence toggles, the missing instant-vs-
calendar comments) → **R-76.2** the cures (scripts/cures-279.py —
parity-276's delimiter predicate unifies to the shared
colon-tolerant shape, all three censuses gain the header-vs-
delimiter cell-count comparison, all three fence strippers admit
up-to-three-space-indented fences with the opener-indent tracker,
the two instant-parse sites gain the comment riders; every site
asserted exactly-once, the script resumable, zero application
behavior changed) → **R-76.3** the verification (parity-279 GREEN ·
the sibling batteries GREEN (parity-276, parity-277, parity-278 at
the unified walkers · security-ledger · parity-272's F-272n dynamic
file-card at 455 · parity-243 at the advanced mirror) · docs-counts
GREEN at the advanced trio — the THIRTIETH gate-enforced ride, the
v2.76.0 block landing together with the advance · lint 0/0 · tsc 0 ·
the unit suite at the new count · build · smoke 15/15 · 161/161 e2e
(zero new legs — the round changes walker predicates inside test
files plus two source comments; no swept surface moves, no pixel can
shift) · census MATCH · the captures — the round's touched surfaces
are test walkers and two comments, so the standing faces ride: the
flagship dashboard at 1280×800 and the mobile drawer at 390×844;
the census tripwire MATCH).

"""

p = insert_before(p, "> **Previous version: v2.75.0**", NEW_HEAD, "new-head")

# ---- 2. the §2.37 ledger (before §3's heading) --------------------------
LEDGER = """### 2.37 Session-279 audit ledger (the fresh-eyes round over the v2.75.0 ship state)

Three Mode-C passes (the R-75 cure surfaces · the API/auth/security
layer · the UI/a11y/shell layer) + the driving session's own
re-verification, every material claim re-verified at file:line. The
API layer's thirty-second consecutive clean bill and the UI layer's
eight standing contracts are the round's clean columns; the genuine
rot is a drifted delimiter predicate, a missing cell-count check,
and a column-0-only fence toggle — all latent genus gaps in the
census-walker family (zero live offenders beyond the sixteen benign
colon rows).

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-279a | Low | **THE CENSUS WALKERS' DELIMITER-SHAPE DRIFT — parity-276's colon-blind predicate walks the evaluation report's sixteen colon-aligned delimiter rows as DATA rows (green only by pipe-count luck).** The three batteries ship two different delimiter predicates: parity-276's inline `/^ {0,3}\\|[-\\| ]+\\|$/` (no colons, `$`-anchored, no trailing whitespace) vs parity-277/278's shared `isDelimiter` (`/^\\s*\\|[\\s:\\|-]+\\|\\s*$/`, colon-tolerant). docs/web-app-codebase-evaluation-report.md carries sixteen colon-aligned delimiter rows (the `\\|:---:\\|---\\|…` alignment form, lines 15/39/192/214/228/242/263/279/294/312/328/348/375/396/421/438 — driving-session re-census: exactly 16) that parity-276 counts as DATA rows — its green rides the accident that every one carries the same pipe count as its header; a colon-aligned delimiter that ever drops or adds a cell splits the walkers' verdicts (split-brain in the pair the R-75 doctrine calls consistent). | `tests/parity-276.test.ts:199` (the colon-blind predicate) vs `tests/parity-277.test.ts:78` / `tests/parity-278.test.ts:76` (the colon-tolerant shape); the live population at `docs/web-app-codebase-evaluation-report.md:15` et al. | **R-76** (parity-276's predicate unifies to the shared colon-tolerant shape — the sixteen rows SKIPPED as delimiters, the luck dependency retired; pinned by the parity-279 unification legs) |
| F-279b | Low | **NO CENSUS VALIDATES GFM'S HEADER-VS-DELIMITER CELL-COUNT REQUIREMENT — the render-killing genus is invisible to all three batteries.** GFM renders no table when the delimiter's cell count mismatches the header's — but parity-276's census SKIPS the delimiter row before the pipe-count comparison, and parity-277/278's orphan censuses check only that block[1] is delimiter-SHAPED; a plain delimiter that drops a cell (e.g. a two-cell `\\|---\\|---\\|` under a three-cell header) passes every census while GitHub renders paragraphs. The live family's 126 delimiter-bearing tables are all count-matched today (driving-session census: 0 live instances) — a genus gap with zero live offenders, the F-278b latent-blind-spot class's next member. | `tests/parity-276.test.ts:199-209` (the skip-before-compare walk) and `tests/parity-277.test.ts:106-113` / `tests/parity-278.test.ts:120-131` (the shape-only orphan check) | **R-76** (all three censuses gain the header-vs-delimiter cell-count comparison — the delimiter's unescaped pipe count must equal the header's; pinned by the parity-279 cell-count legs + the zero-live census from birth) |
| F-279c | Low | **THE FENCE STRIPPERS TOGGLE ONLY ON COLUMN-0 FENCES — the indented list-item fences are never blanked.** All three walkers' `stripFences` gates on `raw.startsWith("```")` while the family carries real GFM fences indented inside numbered lists (README:117–143 the bun-install block, wealth-os_SKILL.md:1192–1195 the push-wrapper block, docs/DEPLOYMENT.md:51–64 the DATABASE_URL block — three-space-indented openers/closers): their contents walk as live lines exactly the way fenced pipe-lines did before F-277d. Zero pipe-prefixed lines ride inside them today (driving-session census) — luck, not soundness; the F-278b indented-row predicate's own fence remainder (the pipe predicate and the fence predicate widened one round apart). | `tests/parity-276.test.ts:176-189`, `tests/parity-277.test.ts:64-76`, `tests/parity-278.test.ts:55-68` (the column-0 toggles) | **R-76** (all three strippers admit up-to-three-space-indented fences with the opener-indent tracker — an indented fence line INSIDE an outer column-0 fence stays content (the nested-fence guard); pinned by the parity-279 fence legs) |
| F-279d | Informational | **THE TWO INSTANT-PARSE SITES' MISSING DOCTRINE COMMENTS — correct raw `new Date()` parses a future sweep could "fix" backwards.** finance.ts:379's stable tiebreak (`new Date(a.createdAt).getTime()`) and verification.ts:73's `isVerificationPending` (`new Date(expiresAt).getTime()`) parse STORED values raw — correct semantics (createdAt/expiresAt are true TIMESTAMP columns: instants, not UTC-midnight calendar dates; routing them through `toDate` would MIS-sort a timestamp landing exactly on UTC midnight — the F-228c identity-proving lesson's live counter-example), but neither site names the instant-vs-calendar split, so a future raw-parse doctrine sweep would misset them. | `src/lib/finance.ts:379-381` and `src/lib/verification.ts:73` | **R-76** (the one-line comments name the instant-vs-calendar split at both sites — the F-228c doctrine's prophylactic form; pinned by the parity-279 comment legs) |
| F-279e | Informational | **THE A11Y TWO-GATE'S WCAG-2.2-AA LETTER IS AN EXECUTABLE FLOOR — the claim-vs-mechanism bridge rides the bespoke pins.** axe-core's default-enabled set evaluates WCAG 2.0/2.1; the 2.2-only criteria (target-size, focus-not-obscured, dragging) ride the repo's bespoke hit-area/escape-stacking/skip-link pins — the bridge is already self-pinned at parity-275 (the a11y spec's own header note carries it); curing it again would be gratuitous. | `tests/e2e/a11y.spec.ts:14-28` (the header note); the self-pin at `tests/parity-275.test.ts` | Registered (the self-pinned bridge stands) |

Recorded, not cured: F-279e. The audit's clean columns: the
API/auth/security layer's thirty-second consecutive clean bill
(thirteen contracts, 45 handlers / 30 route files — the census
re-verified at exactly 30 this round, the focused security battery
153/153) and the UI/a11y/shell layer's eight standing contracts all
holding live. The round also re-confirmed the standing registered
postures (the ADR-014 in-band OTP/reset delivery, the capability-URL
publicity, the CSP fetch-directive pin, the scrypt promisification,
the empty-PUT guard, the clear-era contract, the burn-order
doctrine).

"""

p = insert_before(p, "## 3. The remediation program (R-items)", LEDGER, "ledger")

# ---- 3. the R-76 section (above R-75's) ----------------------------------
R76 = """### R-76 — The walker-unification, cell-count, and indented-fence round (session 279)

The operator re-sent the standing directive after the R-75 ship pair
(2c33aa91 + the owner's bda839a8 session-log update carrying
docs/session_140.md, the session-278 transcript — fetched by the
fresh clone and reviewed at intake per the odd-number record
convention, this record riding docs/session_141.md). Per the
recorded rhythm, findings-led iteration. The intake and the standing
layers are recorded in the version header above; this section
carries the findings, the cures, and the verification contract.

**The findings (each verified at file:line by the driving session —
the API layer's thirty-second consecutive clean bill and the UI
layer's eight standing contracts are the round's clean columns; the
genuine rot is a drifted delimiter predicate, a missing cell-count
check, and a column-0-only fence toggle, all latent genus gaps in
the census-walker family):** the §2.37 ledger's rows — F-279a THE
ROUND'S FLAGSHIP (parity-276's colon-blind delimiter predicate walks
the evaluation report's sixteen colon-aligned delimiter rows as DATA
rows — the census's green rides the accident that every one carries
its header's pipe count; the walkers are not the consistent pair the
R-75 doctrine implies) · F-279b THE CELL-COUNT GAP (no census
validates GFM's header-vs-delimiter cell-count requirement — a plain
delimiter that drops a cell passes all three batteries while GitHub
renders paragraphs; 126/126 live tables count-matched today) ·
F-279c THE INDENTED-FENCE GAP (the strippers toggle only on
column-0 fences — the list-item fences at README/SKILL/DEPLOYMENT
never blanked; zero live pipe rows inside them) · F-279d the
instant-parse comment riders (the two correct raw parses gain the
instant-vs-calendar comments — the F-228c lesson's prophylactic
form) · F-279e registered (the a11y claim-vs-mechanism bridge —
already parity-275-pinned).

**The cures (R-76.2):** parity-276's delimiter predicate unifies to
the shared colon-tolerant shape (the sixteen colon-aligned rows
SKIPPED as delimiters — the luck dependency retired); all three
censuses gain the header-vs-delimiter cell-count comparison (the
delimiter's unescaped pipe count must equal the header's — the
render-killing genus closed); all three fence strippers admit
up-to-three-space-indented fences with the opener-indent tracker
(an indented fence line inside an outer column-0 fence stays content
— the nested-fence guard); the two instant-parse sites gain the
instant-vs-calendar comments. Zero application behavior changed
(walker predicates inside test files plus two source comments).

**The verification contract (R-76.3):** the parity-279 battery born
honest RED against the pre-cure tree (the false and missing forms
ride the tree at HEAD: the colon-blind predicate, the missing
cell-count legs, the column-0-only fence toggles, the missing
comments) → the cures → parity-279 GREEN · the sibling batteries
GREEN (parity-276, parity-277, parity-278 at the unified walkers —
the censuses' verdicts now agree on every row class · security-ledger
· parity-272's F-272n dynamic file-card · docs-counts at the advanced
trio — the v2.76.0 block landing together with the advance, the
F-249b structural gate enforcing the pairing) → lint 0/0 · tsc 0 ·
the unit suite at the new count · build · smoke 15/15 · the FULL e2e
battery 161/161 (zero new legs — the round changes walker
predicates inside test files plus two source comments; no swept
surface moves, no pixel can shift) · census MATCH · the captures
(the standing evidence faces — the round's touched surfaces are test
walkers and two comments, so the flagship dashboard and the mobile
drawer ride).

"""

p = insert_before(
    p, "### R-75 — The census-family, indented-walker, and register-hygiene round (session 278)", R76, "r76"
)

with open("docs/remediation_plan_v2.md", "w", encoding="utf8") as f:
    f.write(p)

# ---- post-write validation ----------------------------------------------
checks = [
    ("> **Current version: v2.76.0** (session 279 — the", 1, "new current header"),
    ("> **Previous version: v2.75.0** (session 278 — the", 1, "flipped previous header"),
    ("### 2.37 Session-279 audit ledger", 1, "the §2.37 ledger"),
    ("### R-76 — The walker-unification, cell-count, and indented-fence round (session 279)", 1, "the R-76 section"),
    ("| F-279a | Low |", 1, "the flagship row"),
    ("| F-279e | Informational |", 1, "the last ledger row"),
    ("## 3. The remediation program (R-items)", 1, "§3 heading intact"),
    ("### R-75 — The census-family, indented-walker, and register-hygiene round (session 278)", 1, "R-75 section intact"),
]
with open("docs/remediation_plan_v2.md", encoding="utf8") as f:
    final = f.read()
for needle, want, label in checks:
    got = final.count(needle)
    if got != want:
        sys.exit(f"[post] {label}: expected {want}, found {got}")
print("[plan-279] v2.76.0 written — head block, §2.37 ledger (5 rows), R-76 section; all anchors asserted.")
