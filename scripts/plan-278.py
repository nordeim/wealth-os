#!/usr/bin/env python3
"""Session-278 plan write — remediation_plan_v2.md v2.74.0 → v2.75.0
(R-75, the census-family, indented-walker, and register-hygiene round).

Insertions only, every site asserted (the F-242j lesson): the new
Current-version header block (the v2.74.0 block flips to Previous),
the §2.36 ledger (before §3's heading), and the R-75 section (above
R-74's). The §5 execution-history row rides scripts/history-278.py at
lockstep time (after the gate runs, so the counts carry the verified
values).

The round's ledger (every material claim re-verified at file:line by
the driving session after the three Mode-C passes): 0 Critical /
0 High / 0 Medium / 1 Low / 3 Informational NEW after dedup —
F-278a the table-truth censuses' DOCS set never covered the curated
tracked-doc family (two live unescaped-pipe rows outside every
census: the sibling skill doc's debugging row and the session-199
implementation plan's stack-mapping row; the pass-A "ungated twin"
claim refuted — docs/worklog.md is the F-227a symlink, content-pinned
by parity-227) · F-278b the two census walkers' indented-row blind
spot (column-0-only pipe predicates; GFM admits up to three leading
spaces) · F-278c the a11y register's duplicate sanctioned matcher
(text-stone-400 riding two arms — the F-220p stale-arm class's
de-dup edition) · F-278d registered (the @theme prose var citation
— parity-229 does not trip CSS-var-shaped prose)."""

import sys


def insert_before(text: str, anchor: str, block: str, label: str) -> str:
    n = text.count(anchor)
    if n != 1:
        sys.exit(f"[{label}] expected 1 anchor, found {n}: {anchor[:60]!r}")
    return text.replace(anchor, block + anchor, 1)


with open("docs/remediation_plan_v2.md", encoding="utf-8") as f:
    p = f.read()

# ---- 1. the head: flip v2.74.0 to Previous, insert v2.75.0 above it -----
CUR_HEAD = "> **Current version: v2.74.0** (session 277 — the"
if p.count(CUR_HEAD) != 1:
    sys.exit("[head] the v2.74.0 Current header not found in the expected form")
p = p.replace(CUR_HEAD, "> **Previous version: v2.74.0** (session 277 — the", 1)

NEW_HEAD = """> **Current version: v2.75.0** (session 278 — the
census-family, indented-walker, and register-hygiene round R-75: the
operator re-sent the standing directive after the R-74 ship pair
(685e705d + the owner's 4983fd08 session-log update carrying
docs/session_138.md, the session-277 transcript — fetched by the
fresh clone and reviewed at intake per the odd-number record
convention, this record riding docs/session_139.md). Per the
recorded rhythm, findings-led iteration: refresh, re-audit,
remediate, verify, capture, document, commit, push — with the
operator's named asks (the mobile navigation comparison, the
Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.)

The intake: the workspace had been RESET (a fresh clone at HEAD
4983fd08 — tree clean; the prior session's work ALREADY SHIPPED as
685e705d + the owner's session-log update); the environment rebuilt
cold (bun install, 594 packages, the postinstall prisma generate
into src/generated/prisma; .env from .env.example on the
DATABASE_URL="file:../db/custom.db" contract; db/ at the repo root;
db push + seed; census MATCH (81/4/3/6/5/7, users=1)); the toolchain
legs (the chromium headless-shell 1254 install the e2e battery
rides; paramiko 5.1.0 for the SSH push shim).

THE COLD BASELINE GATE GREEN AT HEAD — the v2.74.0 ship state
reproduced exactly, no discovery: lint 0/0 · tsc 0 · 2019/2019 unit
(129 files) · build (the 4 documented Turbopack tracing warnings) ·
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
UNCHANGED (the two-vulnerability dev-chain census the R-74
re-anchor carries — the effect HIGH via prisma CLI's
@prisma/config exact-pin plus the minimatch moderate; the runtime
@prisma/client chain clean) · neo-crm unchanged (b3d0fbe) · the
SEO surface verified (smoke leg 12: sitemap + robots + manifest 200;
the metadata/pwa/page-titles pins green inside the unit suite) ·
the .env contract + the db/ at the root + the vitest/playwright
configs + the .env.example standing.

The session-278 fresh-eyes audit (three Mode-C research passes
dispatched as parallel research subagents per the house convention,
every material claim re-verified at file:line by the driving session
— the R-74 cure surfaces: all five HOLDING (the parity-277 battery
11/11 inside the cold-gate's full-suite run; the three healed §2
splits, the re-anchored advisory census + the flipped pin pair, the
reworded api.ts guards comment at the live twenty-route-file count,
the hardened parity-276 census all read at file:line — one pass-A
claim REFUTED at re-verification: the "ungated docs/worklog.md twin"
is the F-227a symlink, its content already pinned to the root log by
parity-227's alias legs) · the API/auth/security layer: the
THIRTY-FIRST consecutive clean bill (all thirteen house contracts,
45 handlers / 30 route files read line-by-line — the census
re-verified at exactly 30; every candidate dismissed into
documented postures; the api.ts 455-line file-card and the
fifteen/twenty-route comment censuses live-accurate) · the
UI/a11y/shell layer: all eight standing contracts verified holding
live (the drawer mechanics, the theme three-way seam, the v4
scanner with the whole-tree invariant + the bare-word net, the a11y
two-gate, the shell twins, the geometry pin, the date seams, the
escape stacking; the z-ladder census exact at 10/40/50/60/100; every
SKILL file-card count verified drift-free)): 0 Critical / 0 High /
0 Medium / 1 Low / 3 Informational NEW after dedup, every material
claim re-verified at file:line.

The round's flagship: **F-278a the table-truth censuses' DOCS set
never covered the curated tracked-doc family — two live
unescaped-pipe rows ride outside every census (the F-277d genus one
family over).** Both batteries' DOCS lists enumerate the seven
living docs while the tracked markdown family at the root and under
docs/ carries fifteen curated files (the eight more: DEPLOYMENT,
the Tailwind-V4 validation report, coding_agent_prompt, the push
runbook skill, the session-199 implementation plan,
skills-inventory, the web-app evaluation report, and the sibling
neo-crm skill doc at the root) — and a driving-session census over
that family found two genuine offenders: neo-crm_SKILL.md:1133 (a
debugging-guide row whose command pipe inside the code span splits
the row into five cells against a four-cell header) and
docs/implementation-plan-session-199-wealthos.md:123 (the
stack-mapping row whose envelope-form pipe inside the code span
splits it into six against five) — each rendering phantom cells on
GitHub, invisible to every gate. The scope rationale (living docs
only) lived in session records, never pinned.

The round's riders: **F-278b the two census walkers' indented-row
blind spot** (both pipe predicates are column-0-only while GFM
admits tables indented up to three leading spaces — the
fence-awareness hardening's soundness sibling; zero live instances
outside fences today, the F-277d(a) genus's own remainder) ·
**F-278c the a11y register's duplicate sanctioned matcher**
(text-stone-400 rides both the amber/stone gradient arm and the
muted-captions arm — the F-220p stale-arm warning class: a
duplicate entry means retiring one arm would not retire the class;
the register's union is unchanged by the de-dup) · **F-278d
registered** (the @theme block's one prose var citation — the
do-NOT-"fix"-a-chart warning at globals.css:136; parity-229 does
not trip CSS-var-shaped prose, and rewording standing prose for
zero gate value is gratuitous). Registered: F-278e–F-278h (the
pass-B and pass-C informational postures re-confirmed standing, the
historical advisory snapshots' session-record doctrine, the standing
PNG regeneration).

The execution contract (R-75): the plan v2.75.0 written and
validated against the tree (this script, insertions only, every
anchor asserted) → **R-75.1** the pins born honest RED (the
parity-278 battery: 10 legs — the false and missing forms ride the
tree at HEAD: the two unescaped rows, the two DOCS-list gaps, the
two walker forms, the register's duplicate) → **R-75.2** the cures
(scripts/cures-278.py — the two in-cell pipes escape, both DOCS
lists extend to the fifteen-file curated family with the scope
doctrine registered, both walkers gain the indented-row predicate,
the a11y register de-dups with the single-cite annotation; every
site asserted exactly-once, the script resumable, zero application
behavior changed) → **R-75.3** the verification (parity-278 GREEN
10/10 · the sibling batteries GREEN (parity-276 and parity-277 at
the extended family · security-ledger · parity-272's F-272n
dynamic file-card at 455 · parity-243 at the advanced mirror) ·
docs-counts GREEN at the advanced trio — the TWENTY-NINTH
gate-enforced ride, the v2.75.0 block landing together with the
advance · lint 0/0 · tsc 0 · 2029/2029 unit (130 files, +10) ·
build · smoke 15/15 · 161/161 e2e (zero new legs — the round
changes doc rows and test files; the register's matcher union is
unchanged; no swept surface moves, no pixel can shift) · census
MATCH · the captures — the round's touched surfaces are doc rows
and test files, so the standing faces ride: the flagship dashboard
at 1280×800 and the mobile drawer at 390×844; the census tripwire
MATCH).

"""

p = insert_before(p, "> **Previous version: v2.74.0**", NEW_HEAD, "new-head")

# ---- 2. the §2.36 ledger (before §3's heading) --------------------------
LEDGER = """### 2.36 Session-278 audit ledger (the fresh-eyes round over the v2.74.0 ship state)

Three Mode-C passes (the R-74 cure surfaces · the API/auth/security
layer · the UI/a11y/shell layer) + the driving session's own
re-verification, every material claim re-verified at file:line. The
API layer's thirty-first consecutive clean bill and the UI layer's
eight standing contracts are the round's clean columns; the genuine
rot is two unescaped-pipe rows in the never-censused tracked-doc
family, two column-0-only pipe predicates, and one duplicated
sanctioned matcher.

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-278a | Low | **THE TABLE-TRUTH CENSUSES' DOCS SET NEVER COVERED THE CURATED TRACKED-DOC FAMILY — two live unescaped-pipe rows ride outside every census (the F-277d genus one family over).** Both batteries' DOCS lists enumerate the seven living docs while the tracked markdown family at the root and under docs/ carries fifteen curated files — the eight never-walked: docs/DEPLOYMENT.md, the Tailwind-V4 validation report, coding_agent_prompt, the push runbook skill, the session-199 implementation plan, skills-inventory, the web-app evaluation report, and the sibling neo-crm_SKILL.md at the root. A driving-session census over the family found two genuine offenders: neo-crm_SKILL.md:1133 (the debugging-guide row whose `fd \\| grep .db` command pipe inside the code span splits the row into five cells against a four-cell header — the F-247i genus in a file every census excludes) and docs/implementation-plan-session-199-wealthos.md:123 (the stack-mapping row whose `{ok,data\\|error}` envelope form inside the code span splits it into six cells against a five-cell header) — each rendering phantom cells on GitHub, invisible to every gate. The scope rationale (living docs only) lived in session records, never pinned; the F-274f posture (the sibling doc's content is correct FOR ITS OWN REPO) binds content sweeps, not structure censuses. The pass-A subagent's twin claim (docs/worklog.md an ungated md5-twin of the root log) was REFUTED at re-verification: the file is the F-227a symlink and parity-227's alias legs already pin its content to the canonical root worklog. | `tests/parity-276.test.ts:134-141` + `tests/parity-277.test.ts:33-41` (the DOCS lists) vs the tracked-doc census; the offenders at `neo-crm_SKILL.md:1133` and `docs/implementation-plan-session-199-wealthos.md:123` | **R-75** (the two in-cell pipes escape — the F-247i house form; both DOCS lists extend to the fifteen-file curated family; the scope doctrine registered: the transcript family docs/session_*.md + docs/prompt-to-*.md excluded by the immutable-record doctrine, the skills/ library by the owner's exclusion directive; pinned by the parity-278 family-census legs + the DOCS source pins) |
| F-278b | Informational | **THE TWO CENSUS WALKERS' INDENTED-ROW BLIND SPOT — the fence-awareness hardening's soundness sibling.** Both walkers gate table rows on a column-0 pipe prefix (`startsWith("\\|")`) while GFM admits tables indented up to three leading spaces — an indented orphan block or blank-split fragment would evade both batteries exactly the way fenced pipe-lines did before F-277d. Zero live instances outside fences today (the only two indented pipe lines in the whole family ride inside the skill doc's ts fence, blanked by fence-stripping — luck, not soundness). | `tests/parity-277.test.ts:83-85` and `tests/parity-276.test.ts:169` (the column-0 predicates) | **R-75** (both walkers gain the indented-row predicate — up to three leading spaces admitted; the parity-278 census leg carries the hardened walker from birth) |
| F-278c | Informational | **THE A11Y REGISTER'S DUPLICATE SANCTIONED MATCHER — the F-220p stale-arm class's de-dup edition.** `text-stone-400` rides TWO arms of the color-contrast register: the amber/stone-on-gradient arm (whose cite already covers "sidebar + muted captions") and the muted-captions arm — the union is unchanged (either arm sanctions the class) but a future retirement of one arm would silently leave the class auto-sanctioned via the other, exactly the stale-arm auto-sanction the file's own comments warn against. Register hygiene, not a defect. | `tests/e2e/a11y.spec.ts:47` and `:87` (the two arms) | **R-75** (the muted arm drops the duplicate with the single-cite annotation — the gradient arm's cite covers both surfaces; pinned by the parity-278 cite-uniqueness legs) |
| F-278d | Informational | **THE @theme BLOCK'S ONE PROSE var CITATION — registered, not cured.** The block's single `var(` string is the do-NOT-"fix"-a-chart warning (a chart wired to the CSS variable would silently diverge from the constants the charts actually read); the parity-229 class-shape net does not trip CSS-var-shaped prose, and the warning has stood ~50 sessions without a scanner conflict. Rewording standing prose for zero gate value is gratuitous. | `src/app/globals.css:136` | Registered (the warning stands; the net's blindness to CSS-var shapes is the net's own scope) |
| F-278e | Informational | **THE PASS-B CLEAN-BILL INFORMATIONAL POSTURES STAND — the documented trades, re-confirmed at the thirty-first consecutive clean bill.** The in-band OTP and reset-link delivery (the NEO_DISABLE_IN_APP_OTP/RESET knobs, warned at every production boot), the default direct-exposure limiter keying, the login per-account third-party-exhaustable trade, the unbucketed health/auth-me families, the reset literal check, the seed-script exception and the structural casts, the unlogged-surface register — every one dismissed into its documented posture again this round. | `src/app/api/auth/signup/route.ts:169` et al. | Registered (the documented postures) |
| F-278f | Informational | **THE PASS-C INFORMATIONAL POSTURES STAND — the documented dependencies.** The eight render-time clock sites in client pages are hydration-safe only by the AppShell loading gate (already documented); the reserved soft tokens stay light in dark mode by documented design; the a11y spec's register now carries the round's de-dup — the remaining informational notes (the two-fence splitter blind spot, the geometry leg's coverage) re-confirmed standing. | `src/app/(app)/expenses/page.tsx:128` et al. | Registered (the documented postures) |
| F-278g | Informational | **THE HISTORICAL ADVISORY SNAPSHOTS STAND AS SESSION RECORDS.** The PAD's past-tense re-anchor narratives, the worklog's per-session STANDING-ASKS blocks, and the docs/session_*.md transcripts keep the counts that were true at their time — the rot rides only the living sites the F-277b re-anchor carries (the §10 row, the pin pair). Editing session records retroactively is the docs-counts doctrine's own negative. | `Project_Architecture_Document.md:218-226`; `worklog.md` (the session-277 record) | Registered (the session-record doctrine) |
| F-278h | Informational | **THE STANDING PNG REGENERATION — the comparison run rewrites `mobile-nav-clone-390.png` at the standing name.** The session's comparison-265.ts run (live-asserted: 9 destinations + Sign Out, the aria-expanded flip, the census tripwire MATCH) rewrites the tracked standing capture — the live-asserted capture IS the session's evidence and rides the round's commit. | `docs/screenshots/mobile-nav-clone-390.png` | Registered (the standing-name convention) |

Recorded, not cured: F-278d through F-278h. The audit's clean
columns: the API/auth/security layer's thirty-first consecutive
clean bill (thirteen contracts, 45 handlers / 30 route files — the
census re-verified at exactly 30 this round) and the UI/a11y/shell
layer's eight standing contracts all holding live. The round also
re-confirmed the standing registered postures (the ADR-014
in-band OTP/reset delivery, the capability-URL publicity, the CSP
fetch-directive pin, the scrypt promisification, the empty-PUT
guard, the clear-era contract, the burn-order doctrine).

"""

p = insert_before(p, "## 3. The remediation program (R-items)", LEDGER, "ledger")

# ---- 3. the R-75 section (above R-74's) ----------------------------------
R75 = """### R-75 — The census-family, indented-walker, and register-hygiene round (session 278)

The operator re-sent the standing directive after the R-74 ship pair
(685e705d + the owner's 4983fd08 session-log update carrying
docs/session_138.md, the session-277 transcript — fetched by the
fresh clone and reviewed at intake per the odd-number record
convention, this record riding docs/session_139.md). Per the
recorded rhythm, findings-led iteration. The intake and the standing
layers are recorded in the version header above; this section
carries the findings, the cures, and the verification contract.

**The findings (each verified at file:line by the driving session —
the API layer's thirty-first consecutive clean bill and the UI
layer's eight standing contracts are the round's clean columns; the
genuine rot is two unescaped-pipe rows in the never-censused
tracked-doc family, two column-0-only pipe predicates, and one
duplicated sanctioned matcher):** the §2.36 ledger's rows — F-278a
THE ROUND'S FLAGSHIP (the table-truth censuses' DOCS set — seven
living docs — never covered the fifteen-file curated tracked-doc
family; two genuine unescaped-in-cell-pipe rows ride outside every
census: the sibling skill doc's debugging-guide row and the
session-199 implementation plan's stack-mapping row; the scope
rationale lived in session records, never pinned; the pass-A "ungated
twin" claim refuted at re-verification — the F-227a symlink is
parity-227-pinned) · F-278b THE INDENTED WALKER (both censuses'
pipe predicates are column-0-only while GFM admits up to three
leading spaces — the fence-awareness hardening's soundness sibling)
· F-278c THE REGISTER DE-DUP (text-stone-400 riding two sanctioned
arms — the F-220p stale-arm class's de-dup edition; the union
unchanged) · F-278d registered (the @theme prose var citation —
parity-229 does not trip CSS-var-shaped prose).

**The cures (R-75.2):** the two in-cell pipes escape (the
debugging-guide row's command pipe and the stack-mapping row's
envelope-form pipe — the F-247i house form, each row rendering its
header's cell count again); both DOCS lists extend to the
fifteen-file curated family (the seven living docs plus DEPLOYMENT,
the Tailwind-V4 validation report, coding_agent_prompt, the push
runbook skill, the session-199 implementation plan,
skills-inventory, the web-app evaluation report, and the sibling
neo-crm skill doc — the structure census is content-agnostic, the
F-274f content posture untouched); the scope doctrine registered
at the census sites (the transcript family and the skills/ library
excluded — the immutable-record doctrine and the owner's exclusion
directive); both walkers gain the indented-row predicate (up to
three leading spaces admitted — GFM's actual form); the a11y
register de-dups (the muted arm drops the duplicate with the
single-cite annotation — the gradient arm's cite covers both
surfaces; the register's union is unchanged).

**The verification contract (R-75.3):** the parity-278 battery born
honest RED against the pre-cure tree (the false and missing forms
ride the tree at HEAD: the two unescaped rows, the two DOCS-list
gaps, the two walker forms, the register's duplicate — the orphan
census leg rides green-by-design, the standing form from birth) →
the cures → parity-278 GREEN · the sibling batteries GREEN
(parity-276 and parity-277 at the extended family · security-ledger
· parity-272's F-272n dynamic file-card · docs-counts at the
advanced trio — the v2.75.0 block landing together with the
advance, the F-249b structural gate enforcing the pairing) → lint
0/0 · tsc 0 · the unit suite at the new count · build · smoke
15/15 · the FULL e2e battery 161/161 (zero new legs — the round
changes doc rows and test files; the register's matcher union is
unchanged; no swept surface moves, no pixel can shift) · census
MATCH · the captures (the standing evidence faces — the round's
touched surfaces are doc rows and test files, so the flagship
dashboard and the mobile drawer ride).

"""

p = insert_before(
    p, "### R-74 — The blank-row-split, census-scope, and audit-census round (session 277)", R75, "r75"
)

with open("docs/remediation_plan_v2.md", "w", encoding="utf-8") as f:
    f.write(p)

# ---- post-write validation ----------------------------------------------
checks = [
    ("> **Current version: v2.75.0** (session 278 — the", 1, "new current header"),
    ("> **Previous version: v2.74.0** (session 277 — the", 1, "flipped previous header"),
    ("### 2.36 Session-278 audit ledger", 1, "the §2.36 ledger"),
    ("### R-75 — The census-family, indented-walker, and register-hygiene round (session 278)", 1, "the R-75 section"),
    ("| F-278a | Low |", 1, "the flagship row"),
    ("| F-278h | Informational |", 1, "the last ledger row"),
    ("## 3. The remediation program (R-items)", 1, "§3 heading intact"),
    ("### R-74 — The blank-row-split, census-scope, and audit-census round (session 277)", 1, "R-74 section intact"),
]
with open("docs/remediation_plan_v2.md", encoding="utf-8") as f:
    final = f.read()
for needle, want, label in checks:
    got = final.count(needle)
    if got != want:
        sys.exit(f"[post] {label}: expected {want}, found {got}")
print("[plan-278] v2.75.0 written — head block, §2.36 ledger (8 rows), R-75 section; all anchors asserted.")
