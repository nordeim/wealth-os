#!/usr/bin/env python3
"""Session-280 plan write — remediation_plan_v2.md v2.76.0 → v2.77.0
(R-77, the hyphen-required, whole-tree-net, and open-axe round).

Insertions only, every site asserted (the F-242j lesson): the new
Current-version header block (the v2.76.0 block flips to Previous),
the §2.38 ledger (before §3's heading), and the R-77 section (above
R-76's). The §5 execution-history row rides scripts/history-280.py at
lockstep time (after the gate runs, so the counts carry the verified
values).

The round's ledger (every material claim re-verified at file:line by
the driving session after the three Mode-C passes): 0 Critical /
0 High / 0 Medium / 4 Low / 8 Informational NEW after dedup —
F-280a the delimiter predicate admits cells carrying no hyphen (the
cmark-gfm reference scanner demands one hyphen per cell — verified
against the reference source this round; zero live carriers) ·
F-280b one real count-mismatch table lives in the excluded skills
library (registered — the owner's exclusion directive) · F-280j the
open-state axe census misses the filters card (the leg joins the
family) · F-280k the phantom-breakpoint net is file-scoped, not
whole-tree (the F-207a genus returning as a coverage hole; zero live
offenders across all 116 src files). The in-cell regex pipes ride the
escaped house form (the F-247i doctrine — the round's own plan rows
must pass the round's own censuses)."""

import sys


def insert_before(text: str, anchor: str, block: str, label: str) -> str:
    n = text.count(anchor)
    if n != 1:
        sys.exit(f"[{label}] expected 1 anchor, found {n}: {anchor[:60]!r}")
    return text.replace(anchor, block + anchor, 1)


with open("docs/remediation_plan_v2.md", encoding="utf8") as f:
    p = f.read()

# ---- 1. the head: flip v2.76.0 to Previous, insert v2.77.0 above it -----
CUR_HEAD = "> **Current version: v2.76.0** (session 279 — the"
if p.count(CUR_HEAD) != 1:
    sys.exit("[head] the v2.76.0 Current header not found in the expected form")
p = p.replace(CUR_HEAD, "> **Previous version: v2.76.0** (session 279 — the", 1)

NEW_HEAD = """> **Current version: v2.77.0** (session 280 — the
hyphen-required, whole-tree-net, and open-axe round R-77: the
operator re-sent the standing directive after the R-76 ship pair
(dc433ced + the owner's 39da530e session-log update carrying
docs/session_142.md, the session-279 transcript — fetched by the
fresh clone and reviewed at intake per the record convention, this
record riding docs/session_143.md). Per the recorded rhythm,
findings-led iteration: refresh, re-audit, remediate, verify,
capture, document, commit, push — with the operator's named asks
(the mobile navigation comparison, the Tailwind v4 state, the
.env/db contract, the vitest/playwright configs, the sitemap/SEO
surface, the .env.example, the screenshots, the SSH-wrapper push)
re-verified along the way.)

The intake: the workspace had been RESET (a fresh clone at HEAD
39da530e — tree clean; the prior session's work ALREADY SHIPPED as
dc433ced + the owner's session-log update); the environment rebuilt
cold (bun install, 594 packages, the postinstall prisma generate
into src/generated/prisma; .env from .env.example on the
DATABASE_URL="file:../db/custom.db" contract; db/ at the repo root;
db push + seed; census MATCH (81/4/3/6/5/7, users=1)); the toolchain
legs (the chromium headless-shell install the e2e battery rides;
paramiko 5.1.0 for the SSH push shim).

THE COLD BASELINE GATE GREEN AT HEAD — the v2.76.0 ship state
reproduced exactly, no discovery: lint 0/0 · tsc 0 · 2042/2042 unit
(131 files) · build (the 4 documented Turbopack tracing warnings) ·
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

The session-280 fresh-eyes audit (three Mode-C research passes
dispatched as parallel research subagents per the house convention,
every material claim re-verified at file:line by the driving session
— the R-76 cure surfaces: all HOLDING (the four-battery family
green at 45/45 legs inside the cold gate's full-suite run; the
unified colon-tolerant predicate, the three cell-count comparisons,
the three indented-fence strippers, the two instant-parse riders,
the parity-279 battery's 13 legs all read at file:line; the live
coverage census re-derived: exactly 16 tracked markdown at root/docs
= the 15 family files + the F-227a symlink, zero strays; 127 live
tables, 127 count-matched, zero hyphen-less delimiter rows) · the
API/auth/security layer: the THIRTY-THIRD consecutive clean bill
(all thirteen house contracts, 45 handlers / 30 route files — the
census re-verified at exactly 30; every candidate dismissed into
documented postures) · the UI/a11y/shell layer: all eight standing
contracts verified holding live (the drawer mechanics, the theme
three-way seam, the v4 scanner with the whole-tree invariant + the
bare-word net, the a11y two-gate, the shell twins, the geometry pin,
the date seams, the escape stacking; the z-ladder census exact at
10/40/50/60/100; every SKILL file-card count verified
drift-free)): 0 Critical / 0 High / 0 Medium / 4 Low /
8 Informational NEW after dedup, every material claim re-verified
at file:line.

The round's flagship: **F-280a the delimiter predicate admits cells
carrying NO hyphen — the cmark-gfm reference scanner's cell form is
missing from all four batteries.** GFM's reference implementation
(the scanner cmark-gfm actually runs) demands each delimiter cell
carry at least one hyphen — the cell form is spaces, an optional
edge colon, a NON-EMPTY hyphen run, an optional edge colon, spaces
(verified against the reference source this round); the batteries'
shared shape `/^\\s*\\|[\\s:\\|-]+\\|\\s*$/` admits colon-only and
all-space cells and colon-misplaced forms — every one renders NO
table on GitHub yet passes every census's shape and count gates (a
hyphen-less row can still match its header's pipe count). Zero live
carriers (the driving-session census: 0 of the family's 127
delimiter rows rejected by the hardened shape) — the
render-killing genus's third rim, the R-76 round's own family.

The round's riders: **F-280j the open-state axe census misses the
filters card** (the two-gate's open-state family covers the drawer,
the Add Expense dialog, and the Accounts Add dialog — the
session-265 in-flow filters expansion card has never been
axe-asserted open; the pre-flight ran the surface clean) ·
**F-280k the phantom-breakpoint net is file-scoped, not
whole-tree** (shell-parity's net enumerates fifteen files; the login
card, the reset screens, the guest redirect, the nav config, the
section layout bridges, and the ui primitives sit outside every net
— the tree is clean today across all 116 src files, but a future
variant in an uncovered file passes every gate silently: the exact
F-207a shape, returning as a coverage hole).

Registered, not cured: F-280b (one real count-mismatch table lives
in the excluded skills library — the owner's standing exclusion
directive + the immutable-record doctrine; the family boundary
stays pinned) · F-280c (the recorded 126/126 ships one behind the
live 127 — true-at-time by the ledger's own insert order) ·
F-280d (tilde fences and the close-length rule — two latent rims on
the F-279c genus, zero live) · F-280e (the per-table walks skip a
leading delimiter-shaped row — the orphan censuses alone cover the
class, zero live) · F-280f (cures-279.py's docstring undercount) ·
F-280g (the §5-scoped colon-blind residual — the standing F-242j
scope doctrine) · F-280h/F-280i (the pass-B informational postures:
the reset miss arm's timing, the login acct-bucket's pre-format
keying — both documented) · F-280l (the isAuthFace question-mark
arm — defensive dead code, the F-245h precedent).

The execution contract (R-77): the plan v2.77.0 written and
validated against the tree (this script, insertions only, every
anchor asserted) → **R-77.1** the pins born honest RED (the
parity-280 battery: the false and missing forms ride the tree at
HEAD — the four loose delimiter predicates, the enumerated
phantom-breakpoint net, the missing filters-card axe leg; the
live-census legs ride green-by-design, the standing form from
birth) → **R-77.2** the cures (scripts/cures-280.py — all four
batteries' delimiter predicate unifies to the cmark-exact hyphen-
required cell shape, the phantom-breakpoint net widens to the whole
src tree, the filters-card open-state axe leg joins the a11y
two-gate's family; every site asserted exactly-once, the script
resumable, zero application behavior changed) → **R-77.3** the
verification (parity-280 GREEN · the sibling batteries GREEN
(parity-276, parity-277, parity-278, parity-279 at the hardened
predicate · security-ledger · parity-229's whole-tree invariant ·
parity-272's F-272n dynamic file-card · docs-counts GREEN at the
advanced trio — the v2.77.0 block landing together with the
advance · parity-243 GREEN at the advanced mirror) · lint 0/0 ·
tsc 0 · the unit suite at the new count · build · smoke 15/15 · the
FULL e2e battery at the new count (one new leg — the filters-card
open-state axe face; no swept surface moves, no pixel can shift) ·
census MATCH · the captures — the standing evidence faces (the
flagship dashboard at 1280×800 and the mobile drawer at 390×844);
the census tripwire MATCH).

"""

p = insert_before(p, "> **Previous version: v2.76.0**", NEW_HEAD, "new-head")

# ---- 2. the §2.38 ledger (before §3's heading) --------------------------
LEDGER = r"""### 2.38 Session-280 audit ledger (the fresh-eyes round over the v2.76.0 ship state)

Three Mode-C passes (the R-76 cure surfaces · the API/auth/security
layer · the UI/a11y/shell layer) + the driving session's own
re-verification, every material claim re-verified at file:line. The
API layer's thirty-third consecutive clean bill and the UI layer's
eight standing contracts are the round's clean columns; the genuine
rot is a hyphen-less delimiter predicate, a file-scoped
phantom-breakpoint net, and a missing open-state axe surface — two
latent genus gaps in the census-walker family and one coverage hole
(zero live offenders on all three).

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-280a | Low | **THE DELIMITER PREDICATE ADMITS CELLS CARRYING NO HYPHEN — the cmark-gfm reference scanner's cell form is missing from all four batteries.** GFM's reference implementation demands each delimiter cell carry at least one hyphen (the cmark-gfm scanner's cell form: spaces, an optional edge colon, a NON-EMPTY hyphen run, an optional edge colon, spaces — verified against the reference source this round); the batteries' shared shape `/^\\s*\\|[\\s:\\|-]+\\|\\s*$/` admits colon-only and all-space cells (`\\| : \\| : \\|`, `\\|   \\|   \\|`) AND colon-misplaced forms (`\\| :-:-: \\|`) — every one renders NO table on GitHub yet passes every census's shape and count gates (the F-279b cell-count comparison compares pipe counts a hyphen-less row can still match). Zero live carriers (driving-session census: 0 of the family's 127 delimiter rows rejected by the hardened shape) — the render-killing genus's third rim. | `tests/parity-276.test.ts:45`, `tests/parity-277.test.ts:89`, `tests/parity-278.test.ts:87`, `tests/parity-279.test.ts:89` (the four predicate sites) | **R-77** (all four batteries' predicate unifies to the cmark-exact cell shape `/^\\s*\\|(\\s*:?-+:?\\s*\\|)+\\s*$/` — pinned by the parity-280 source legs + the cmark matrix + the live zero-census from birth) |
| F-280b | Low | **ONE REAL COUNT-MISMATCH TABLE LIVES OUTSIDE THE CENSUSED FAMILY — the render-killing genus is live for real, in the excluded skills library.** skills/nextjs16-react19-tailwind4-auth5-video-gen/SKILL_ALIGNMENT_REPORT_v9.md's Final Validation Matrix carries a five-cell header (line 448) over a six-cell delimiter (line 449) — GitHub renders no table there today, undetected because skills/ rides the owner's standing exclusion directive (the R-75 scope doctrine's boundary). | `skills/nextjs16-react19-tailwind4-auth5-video-gen/SKILL_ALIGNMENT_REPORT_v9.md:448-449` | Registered (the owner's exclusion directive + the immutable-record doctrine — the skills library stays outside the censused family) |
| F-280c | Informational | **THE RECORDED 126/126 SHIPS ONE BEHIND THE LIVE CENSUS — true-at-time by the ledger's own insert order.** The session-279 records (worklog Task 279, the plan's F-279b row, the v2.76.0 SR block) record 126 delimiter-bearing tables all count-matched at the audit; the live family now derives 127 (the §2.37 ledger's own five-row table, inserted AFTER the audit's census ran, is the 127th). The immutable-record doctrine keeps true-at-time counts; every battery walks all 127 today. | `worklog.md:11`; `docs/remediation_plan_v2.md` (the F-279b row + the v2.76.0 SR block) | Registered (historical counts stay true-at-time) |
| F-280d | Informational | **THE FENCE STRIPPERS MISS TILDE FENCES AND THE CLOSE-LENGTH RULE — two latent rims on the F-279c genus.** GFM admits tilde fences (never toggled by any stripper — their contents walk as live lines) and requires a closing fence at least as long as the opener (a four-tick fence closes on a three-tick line today — the leak would expose fenced pipe rows to the walk). Zero live carriers (no tilde fences, no four-plus-tick fences in the 15 files). | `tests/parity-276.test.ts:194-214`, `tests/parity-277.test.ts:66-86`, `tests/parity-278.test.ts:57-77`, `tests/parity-279.test.ts:60-80` (the strippers) | Registered (latent genus, zero live) |
| F-280e | Informational | **THE PER-TABLE WALKS SILENTLY SKIP A LEADING DELIMITER-SHAPED ROW — the orphan censuses alone cover the class.** parity-276/279's walks and parity-278's per-table census skip a delimiter-shaped row that OPENS a block (the null-header guard) while parity-277/278's orphan censuses catch orphan leading delimiters — an intra-family asymmetry; zero live (all 127 blocks are header-first). | `tests/parity-276.test.ts:231`, `tests/parity-278.test.ts:113`, `tests/parity-279.test.ts:191` (the skip guards) | Registered (latent, zero live) |
| F-280f | Informational | **THE CURES-279 DOCSTRING UNDERCOUNTS ITS OWN SITES** — the docstring says "Eight cure sites" while the script implements nine (site 9 at line 411; the exit print already says nine). | `scripts/cures-279.py:4` | Registered (historical script — the docstring is the sole stale site) |
| F-280g | Informational | **THE §5-SCOPED LEGS' COLON-BLIND INLINE REGEXES COEXIST WITH THE UNIFIED PREDICATE** — the documented F-242j scope doctrine: the §5 legs keep their plain single-table forms by design (a false-failure surface only if §5's delimiter ever gains alignment colons). | `tests/parity-276.test.ts:72`, `:91`, `:100` | Registered (the standing scope posture) |
| F-280h | Informational | **THE RESET-PASSWORD MISS ARM LACKS A TIMING EQUALIZER** — the invalid/expired token answers 400 immediately while the success path burns a scrypt and a conditional updateMany. Non-exploitable: the 256-bit random token space defeats probing, and the unknown-vs-dead arms (the pair the route's contract names) are byte-identical. | `src/app/api/auth/reset-password/route.ts:80-84` vs `:99-127` | Registered (documented posture family) |
| F-280i | Informational | **LOGIN'S ACCT-BUCKET KEYS ON THE PRE-FORMAT EMAIL** — loginSchema's bare emailField (the deliberate don't-reveal choice) lets arbitrary strings mint per-account keys; bounded by the fail-closed overflow cap. | `src/lib/schemas.ts:45`; `src/lib/rate-limit.ts:44-83` | Registered (documented posture) |
| F-280j | Low | **THE OPEN-STATE AXE CENSUS MISSES THE FILTERS CARD — the two-gate's open-state family covers three surfaces, not four.** The open-state legs assert the drawer, the Add Expense dialog, and the Accounts Add dialog; the session-265 in-flow filters expansion card (four labeled Selects, two date inputs, the quick-amount group, the three-action footer) has never been axe-asserted open — the F-216f below-the-fold class's open-state edition. | `tests/e2e/a11y.spec.ts:308-413` (the open-state family) | **R-77** (the leg joins the family — desktop /Expenses with the card OPEN, scrollThrough'd, two-gated; the pre-flight ran the surface clean) |
| F-280k | Low | **THE PHANTOM-BREAKPOINT NET IS FILE-SCOPED, NOT WHOLE-TREE — the F-207a genus returning as a coverage hole.** shell-parity's xs/2xs/3xs net enumerates nine pages plus six components (fifteen files); the login card, the reset screens, the guest redirect, the nav config, the section layout bridges, and the ui primitives sit outside every net. The tree is clean today (driving-session whole-tree census: 0 offenders across all 116 src files) — but a future variant in an uncovered file passes every gate silently, exactly the F-207a shape. | `tests/shell-parity.test.ts:87-103` (the enumerated net) | **R-77** (the net widens to the whole src tree — a walkSrc helper, the regenerated client skipped, the same comment-stripped code; pinned by the parity-280 source leg + the whole-tree live census) |
| F-280l | Informational | **THE ISAUTHFACE QUESTION-MARK ARM IS DEFENSIVE DEAD CODE** — both callers pass pathname-only values (the router hooks never carry query strings), so the query-prefix arm never fires at either caller. | `src/lib/theme-default.ts:38` | Registered (defensive mirror — the F-245h precedent: kept deliberately so a future href-passing refactor keeps the three-way seam honest) |

Recorded, not cured: F-280b/c/d/e/f/g/h/i/l. The audit's clean
columns: the API/auth/security layer's thirty-third consecutive
clean bill (thirteen contracts, 45 handlers / 30 route files — the
census re-verified at exactly 30 this round) and the UI/a11y/shell
layer's eight standing contracts all holding live. The round also
re-confirmed the standing registered postures (the ADR-014 in-band
OTP/reset delivery, the capability-URL publicity, the CSP
fetch-directive pin, the scrypt promisification, the empty-PUT guard,
the clear-era contract, the burn-order doctrine).

"""

p = insert_before(p, "## 3. The remediation program (R-items)", LEDGER, "ledger")

# ---- 3. the R-77 section (above R-76's) ----------------------------------
R77 = """### R-77 — The hyphen-required, whole-tree-net, and open-axe round (session 280)

The operator re-sent the standing directive after the R-76 ship pair
(dc433ced + the owner's 39da530e session-log update carrying
docs/session_142.md, the session-279 transcript — fetched by the
fresh clone and reviewed at intake per the record convention, this
record riding docs/session_143.md). Per the recorded rhythm,
findings-led iteration. The intake and the standing layers are
recorded in the version header above; this section carries the
findings, the cures, and the verification contract.

**The findings (each verified at file:line by the driving session —
the API layer's thirty-third consecutive clean bill and the UI
layer's eight standing contracts are the round's clean columns; the
genuine rot is a hyphen-less delimiter predicate, a file-scoped
phantom-breakpoint net, and a missing open-state axe surface):** the
§2.38 ledger's rows — F-280a THE ROUND'S FLAGSHIP (the delimiter
predicate admits cells carrying no hyphen — the cmark-gfm reference
scanner demands one hyphen per cell, and a hyphen-less row renders
no table while passing every census's shape and count gates; zero
live carriers) · F-280j THE OPEN-AXE GAP (the two-gate's open-state
family never asserted the filters card — the F-216f class's
open-state edition) · F-280k THE NET-SCOPE GAP (shell-parity's
phantom-breakpoint net enumerates fifteen files while the login card,
the reset screens, the guest redirect, the nav config, the layout
bridges, and the ui primitives sit outside — the F-207a genus
returning as a coverage hole, zero live offenders) · the eight
registered rows (F-280b the skills-library count-mismatch — the
owner's exclusion directive · F-280c the 126-vs-127 record lag ·
F-280d/e the strippers' latent rims · F-280f the docstring
undercount · F-280g the §5 scope posture · F-280h/i the pass-B
postures · F-280l the dead defensive arm).

**The cures (R-77.2):** all four census batteries' delimiter
predicate unifies to the cmark-exact hyphen-required cell shape
(the colon-tolerant form gains its substance — a cell without a
hyphen, or with a misplaced colon, is no delimiter); the
phantom-breakpoint net widens from the enumerated fifteen-file set
to the WHOLE src tree (the walkSrc helper, the regenerated client
skipped, the same comment-stripped code — the net's coverage IS the
tree, never a subset); the filters-card open-state axe leg joins the
a11y two-gate's family (desktop /Expenses with the card open,
scrolled through, two-gated). Zero application behavior changed
(test files only).

**The verification contract (R-77.3):** the parity-280 battery born
honest RED against the pre-cure tree (the four loose predicates, the
enumerated net, the missing axe leg — the live-census legs ride
green-by-design, the standing form from birth) → the cures →
parity-280 GREEN · the sibling batteries GREEN (parity-276,
parity-277, parity-278, parity-279 at the hardened predicate — the
walkers' verdicts stay consistent on every row class ·
security-ledger · parity-229's whole-tree invariant · parity-272's
F-272n dynamic file-card · docs-counts at the advanced trio — the
v2.77.0 block landing together with the advance, the F-249b
structural gate enforcing the pairing) → lint 0/0 · tsc 0 · the
unit suite at the new count · build · smoke 15/15 · the FULL e2e
battery at the new count (one new leg — the filters-card open-state
axe face; no swept surface moves, no pixel can shift) · census
MATCH · the captures (the standing evidence faces — the round's
touched surfaces are test files, so the flagship dashboard and the
mobile drawer ride).

"""

p = insert_before(
    p, "### R-76 — The walker-unification, cell-count, and indented-fence round (session 279)", R77, "r77"
)

with open("docs/remediation_plan_v2.md", "w", encoding="utf8") as f:
    f.write(p)

# ---- post-write validation ----------------------------------------------
checks = [
    ("> **Current version: v2.77.0** (session 280 — the", 1, "new current header"),
    ("> **Previous version: v2.76.0** (session 279 — the", 1, "flipped previous header"),
    ("### 2.38 Session-280 audit ledger", 1, "the §2.38 ledger"),
    ("### R-77 — The hyphen-required, whole-tree-net, and open-axe round (session 280)", 1, "the R-77 section"),
    ("| F-280a | Low |", 1, "the flagship row"),
    ("| F-280l | Informational |", 1, "the last ledger row"),
    ("## 3. The remediation program (R-items)", 1, "§3 heading intact"),
    ("### R-76 — The walker-unification, cell-count, and indented-fence round (session 279)", 1, "R-76 section intact"),
]
with open("docs/remediation_plan_v2.md", encoding="utf8") as f:
    final = f.read()
for needle, want, label in checks:
    got = final.count(needle)
    if got != want:
        sys.exit(f"[post] {label}: expected {want}, found {got}")
print("[plan-280] v2.77.0 written — head block, §2.38 ledger (12 rows), R-77 section; all anchors asserted.")
