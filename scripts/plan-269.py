#!/usr/bin/env python3
"""Session-269 plan write — remediation_plan_v2.md v2.65.0 → v2.66.0
(R-66, the unpadded-year, net-universe, and drawer-guard round).

Insertions only, every site asserted (the F-242j lesson): the new
Current-version header block (the v2.65.0 block flips to Previous),
the §2.27 ledger (before §3's heading), the R-66 section (above
R-65's), and the §5 execution-history row (above v2.65.0's)."""

import sys


def insert_before(text: str, anchor: str, block: str, label: str) -> str:
    n = text.count(anchor)
    if n != 1:
        sys.exit(f"[{label}] expected 1 anchor, found {n}: {anchor[:60]!r}")
    return text.replace(anchor, block + anchor)


def insert_after(text: str, anchor: str, block: str, label: str) -> str:
    n = text.count(anchor)
    if n != 1:
        sys.exit(f"[{label}] expected 1 anchor, found {n}: {anchor[:60]!r}")
    return text.replace(anchor, anchor + block)


with open("docs/remediation_plan_v2.md", encoding="utf-8") as f:
    p = f.read()

# ---- 1. the head: the new Current block; v2.65.0 flips to Previous ------
CUR_HEAD = "> **Current version: v2.65.0** (session 268 — the"
if p.count(CUR_HEAD) != 1:
    sys.exit("[head] the v2.65.0 Current header not found in the expected form")
p = p.replace(CUR_HEAD, "> **Previous version: v2.65.0** (session 268 — the", 1)

NEW_HEAD = """> **Current version: v2.66.0** (session 269 — the
unpadded-year, net-universe, and drawer-guard round R-66: the operator
re-sent the standing directive after the R-65 ship pair (df6ebc05 +
the owner's 1fa6f23f session-log update carrying docs/session_120.md,
the owner's session-268 transcript — fetched and reviewed at intake
per the odd-number record convention, this record riding
docs/session_121.md). Per the recorded rhythm, findings-led iteration:
refresh, re-audit, remediate, verify, capture, document, commit, push
— with the operator's named asks (the mobile navigation comparison,
the Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.)

The intake: the workspace had been reset — a fresh clone at HEAD
1fa6f23f (tree clean), the environment rebuilt cold (bun install with
the postinstall prisma generate, .env from .env.example on the
DATABASE_URL="file:../db/custom.db" contract, db/ at the repo root,
db push + seed, census MATCH (80/4/3/6/5/7, users=1); the one
cold-start deviation environmental again — the cached Playwright
chromium build did not match the 1.65 pin (the headless-shell 1254
build installed, then the battery ran green). THE COLD BASELINE GREEN
AT HEAD — the v2.65.0 ship state reproduced exactly, no discovery:
lint 0/0 · tsc 0 · 1911/1911 unit (120 files) · build (the 4
documented Turbopack tracing warnings) · smoke 15/15 · 159/159 e2e ·
census MATCH.

The standing layers: probe:ref STABLE on every layer (the app bundle
1,402,874 bytes / md5 6d3779af…, the stylesheet md5 96f24d45…, the
demo-data ZERO census, the desktop nav census 256px · 9 links, the
TRUE-390 menu census opens=true · 9 destinations) · **the mobile-nav
comparison verified on BOTH sides at TRUE 390×844** (the reference
through probe:ref's agent-browser leg; the clone side riding the
production artifact on the scratch db/comparison.db per the
session-253 toolchain note, booted in a single invocation per the
session-98 server-death lesson — pre-open 0 · 9 destinations + Sign
Out · the aria-expanded flip verified on open AND close · post-close
0 · no Tailwind v4 regression) · `bun audit` UNCHANGED (the 2-advisory
dev-chain census — the picomatch HIGH with no fix released plus the
minimatch chain, both re-triaged under F-268d's standing posture) ·
neo-crm unchanged (b3d0fbe) · the SEO surface verified (smoke leg 12:
sitemap + robots + manifest 200) · the .env contract + the db/ at the
repo root + the vitest/playwright configs + the .env.example standing.

The session-269 fresh-eyes audit (three Mode-C passes — the R-65 cure
surfaces driven by the session (the parity-267 battery re-run green
18/18 and the parity-268 battery re-run green 15/15 at HEAD, the
security-ledger pin green; every F-268 surface re-verified at
file:line, the sub-100 boundary/shoulder/leap-day edges re-probed at
runtime) · the API/auth/security layer (the TWENTY-SECOND consecutive
clean bill — all twelve house contracts, 45 handlers / 30 route files
read line-by-line, the census exact: GET 15 · POST 17 · PUT 6 ·
DELETE 6 · PATCH 1; three candidates dismissed into documented
postures) · the UI/a11y/shell layer (all eight standing contracts
verified, the pinned battery 105/105 green, four new findings after
dedup)): 0 Critical / 0 High / 0 Medium / 4 Low / 6 Informational NEW
after dedup, every material claim re-verified at file:line by the
driving session (the year-206 prefill divergence runtime-proven
through the seam's verbatim semantics — toDate reads the stored year
honestly while the prefill bridge emits a three-digit-year string the
native input treats as empty and the boundary rejects on save; the
sub-100 custom-bound flip runtime-proven through a verbatim replica;
the stale PAD tail read directly).

THE ROUND'S FOUR LOWS: **F-269a the prefill bridge emits unpadded
years** (the write-admitted year-100-to-999 class cannot round-trip
through the app's own edit dialog — a stored "0206-06-15" row reads
year 206 honestly through toDate, but toDateInputValue emits
"206-06-15", a string the native date input treats as NO value and
dateField's own regex rejects on save, so a description-only edit of
the row is blocked until the date is re-picked; the cure: pad the year
to 4 digits, the whole admitted class becomes round-trippable) ·
**F-269b the carrier net's universe claim overstates** (prisma/seed.ts,
prisma/schema.prisma, and .env.example are tracked and unexcluded —
inside Tailwind's scan set, outside the parity-229 walk; the cure: the
three human-editable files join the walk, the machine/prose residue
documented) · **F-269c the PAD §10 closing line's e2e tail is stale**
(the line reads 1911 unit — current — beside 152 e2e, four rounds
stale; the docs-counts pin's window ends at the smoke figure, so the
tail rode every lockstep unmoved — the F-204a genus recurring inside
its own blind spot; the cure: the line trued AND the pin window
widened to carry the e2e tail) · **F-269d the mobile drawer's Escape
listener carries no stacked-dialog guard** (its expenses twin does,
and that guard's own comment names the drawer gap as the standing
battery gap; the interleaving is unreachable today — the cure: the
twin guard with the self carve-out, pinned). Plus: F-269e the sub-100
custom-bound posture flip pinned · F-269f/F-269g/F-269h the three
comment-truth riders (the reset exception claim, the upsert truing,
the clock staleness registration) · F-269i/F-269j the two registered
postures (the store logout micro-race — the F-250p family; the
table/underline dead-rule posture — the F-259d family).

**R-66.1** the pins born RED (the parity-269 battery: the prefill
round-trip legs · the sub-100 legacy-row prefill leg · the
custom-bound posture leg · the drawer-guard source leg; the
parity-229 universe extension; the docs-counts window extension) →
**R-66.2** the cures → **R-66.3** the verification (all new pins
GREEN · lint 0/0 · tsc 0 · the unit suite at the new count · build ·
smoke 15/15 · the FULL e2e battery (+1 leg: the year-0206 edit
round-trip — the prefill shows the padded value and the save keeps
the stored date; zero new signups/logins, the shared storageState
rides) · census MATCH · the six parity drift gates re-run (the
expenses/income/investments/goals prefill surfaces and the drawer
shell changed — the closed-state DOM is unchanged by construction
(the padded year changes a value inside a closed dialog's input, the
drawer guard changes no DOM), so the standing baselines are expected
to hold, and the chain is the proof) · the captures (the year-0206
edit-prefill face at desktop, plus the standing mobile drawer at
390). §5 carries the execution history.)

"""
p = insert_before(p, "> **Previous version: v2.65.0** (session 268 — the", NEW_HEAD, "head insert")

# ---- 2. the §2.27 ledger, before §3's heading ----------------------------
LEDGER = """
### 2.27 Session-269 audit ledger (the fresh-eyes round over the v2.65.0 ship state)

Three Mode-C passes over HEAD 1fa6f23f (the R-65 cure surfaces · the
API/auth/security layer · the UI/a11y/shell layer): all R-65 cure
surfaces verified holding at file:line (the parity-267 battery 18/18
and the parity-268 battery 15/15 re-run green at HEAD; the security
ledger pin green and matching the live `bun audit` output — the
2-advisory dev-chain census; the dateField sub-100 rejection with the
year-100 shoulder admitted, the toDate setFullYear arm with the
leap-day proof, the switch's 36×32 hit area with the describedby
wiring, the empty-bound guards with the refDate fallback — every
surface re-read, the V8 edges re-probed at runtime); the API layer's
TWENTY-SECOND consecutive clean bill (all twelve house contracts, 30
route files / 45 handlers — GET 15 · POST 17 · PUT 6 · DELETE 6 ·
PATCH 1, the census exact; three candidates dismissed into documented
postures: the reset confirm literal, the schemas comment drift, the
store logout micro-race); the UI/a11y/shell layer — all eight
standing contracts verified (the pinned battery 105/105 green: the
plain drawer, the theme-default seam and its two mirrors, the v4
hazard axes, the carrier net re-run green, the label/focus/
live-region family, the toDate routing on every stored-date read, the
suppressHydrationWarning carriers, the route twins), four new findings
after dedup. Every material claim re-verified at file:line by the
driving session (the year-206 prefill divergence runtime-proven
through the seam's verbatim semantics; the sub-100 custom-bound flip
runtime-proven through a verbatim replica of customBoundMs; the stale
PAD tail read directly). The standing layers recorded in the version
header. NEW after dedup: 0 Critical / 0 High / 0 Medium / 4 Low /
6 Informational.

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-269a | Low | **THE PREFILL BRIDGE EMITS UNPADDED YEARS — the write-admitted year-100-to-999 class cannot round-trip through the app's own edit dialog (the unclosed tail of the F-268a consumer chain).** toDateInputValue builds the prefill with the month and day padded but the year NOT, so a stored "0206-06-15" row — admitted by dateField (the boundary rejects only years under 100; the 0100 shoulder is admitted, parity-268-pinned) and read honestly by toDate (year 206, no remap at or above 100) — prefills "206-06-15": a string the native date input treats as NO value (HTML's date state requires a 4-digit year, so the input displays empty for an existing row) and dateField's own regex rejects on save (runtime-verified: the round-trip fails), so a description-only edit of the row is blocked until the date is re-picked. All four prefill bridges carry the class (expenses, income, investments, goals); the legacy sub-100 rows the F-268a setter arm exists to serve hit the same wall. Population: rows creatable today through the normal UI (the native picker accepts years 1-9999; a fat-fingered 0206 for 2026 stores fine). Loud failure, one-keystroke recovery, no corruption — but the internal asymmetry (the boundary admits what the prefill cannot re-emit) is real. | `src/lib/format.ts:10-15` (the bridge); consumers `src/app/(app)/expenses/page.tsx:813`, `income/page.tsx:236`, `investments/page.tsx:417`, `goals/page.tsx:229` | **R-66** (pad the year to 4 digits — every current-year consumer byte-identical, the whole admitted class round-trippable; the pin legs: the year-0206 round-trip through the bridge AND the update schema, plus the sub-100 legacy-row prefill form) |
| F-269b | Low | **THE CARRIER NET'S UNIVERSE CLAIM OVERSTATES — tracked, unexcluded files remain outside the walk.** The F-268g extension's own comment claims "the net's live universe must match the scan set for the invariant to be honest," but Tailwind's scan set is everything tracked and not excluded by the @source not directives (skills/, tests/, docs/, scripts/, and every .md) — and prisma/seed.ts, prisma/schema.prisma, and .env.example are tracked and unexcluded: inside the scan set, outside the parity-229 walk (src/ plus the nine root configs). prisma/seed.ts is the material one — a commented TypeScript source, exactly the genus the net watches (a future comment edit there could emit dead CSS with no net to catch it). Clean today: the driving session ran the house heuristic over all three — only prose-shaped tokens (open-signup, self-hosted, first-session-op), none parse to a Tailwind utility. | `tests/parity-229.test.ts:124-137` (the walk) vs `src/app/globals.css:17-24` (the exclusions) | **R-66** (the three human-editable files join the walk's file set; the comment documents the deliberate residue — the lockfile, the license, the ignore list: machine-generated or non-code prose; the universe leg extends to assert them) |
| F-269c | Low | **THE PAD §10 CLOSING LINE'S e2e TAIL IS STALE — the docs-counts pin's window ends before it.** The line reads "the verification gate is green at the time of writing (lint 0/0 · tsc 0 · 1911 unit · build · smoke 15/15 · 152 e2e)" — the unit figure is current (1911, the v2.65.0 ship) while the e2e figure is four rounds stale (152; the v2.63.0-v2.65.0 ships carried 155/157/159). The docs-counts pin for this line asserts containment of the window ending at the smoke figure, so the e2e tail after it rode every lockstep unmoved — the unit half moved at every count change because the pin covers it; the e2e half never moved because nothing pins it (the F-204a genus recurring inside its own blind spot). | `Project_Architecture_Document.md:3651-3652` (the closing line) vs `tests/docs-counts.test.ts:139-144` (the pin's window) | **R-66** (the line trued to the live count AND the pin window widened to carry the e2e tail — the next count change fails the gate until the line moves whole) |
| F-269d | Low | **THE MOBILE DRAWER'S ESCAPE LISTENER CARRIES NO STACKED-DIALOG GUARD — its expenses twin does, and the gap is the repo's own named standing battery gap.** The drawer's window keydown closes on any Escape; the expenses filter card's guard (the F-266d cure) first checks for open popper wrappers and any open dialog — and that guard's own comment names "the standing battery gap — the mobile-drawer stacking order rides unpinned." The interleaving is unreachable today (Radix modal dialogs disable pointer events on the page body, so the hamburger cannot open the drawer over a dialog; and with the drawer open, the page's dialog triggers sit behind its fixed cover) — but the guard is cheap, mirrors the house pattern, and closes the named gap before a future surface makes it reachable. | `src/components/layout/mobile-nav.tsx:46-53` (the listener) vs `src/app/(app)/expenses/page.tsx:183-201` (the twin guard) | **R-66** (the twin guard with the self carve-out — the drawer IS a dialog, so the census excludes its own element id; any OTHER dialog or a popper wrapper owns the Escape; a born-RED source pin asserts the guard form) |
| F-269e | Informational | **THE SUB-100 CUSTOM-BOUND POSTURE SILENTLY FLIPPED — the F-268a seam cure changed customBoundMs's behavior with no pin and a stale ledger description.** Pre-R-65, toDate remapped a year-50 bound to 1950, so customBoundMs's calendar round-trip failed and a sub-100 custom bound DROPPED OPEN (the F-268a row records this as the standing asymmetry). Post-R-65, toDate reads the year honestly, the round-trip passes, and a year-0050 custom bound now WINDOWS as a real bound (runtime-proven through a verbatim replica: the start bound resolves to a real epoch). The new posture is doctrine-consistent (the bound lands on the calendar its digits wrote — the F-267c doctrine; the rows-reject/bounds-admit asymmetry is defensible: storage validation vs a local view window), but the flip is a side effect no pin covers in either direction, and the F-268a row's description of the old posture now describes a tree that no longer exists. | `src/lib/finance.ts:303-318` (the seam) via `:100-105` (the setter arm); the F-268a row's asymmetry note | **R-66** (one behavioral pin locking the new posture — a sub-100 custom start bound windows, it does not drop; the ledger row is history and stays) |
| F-269f | Informational | **THE RESET CONFIRM LITERAL IS THE SOLE BODY-CONSUMING HANDLER NOT PARSED THROUGH A SCHEMAS.TS SCHEMA — the exception is unclaimed in code.** After the bounded reader, the route checks the confirm gate with a hand-rolled strict-equality literal. The substance of the Zod contract holds (bounded, content-type-gated, nothing touches the db before the check, strict equality leaves no coercion or injection surface) — but the letter deviates, and unlike the users-PATCH message-drift form (which claims its own exception in a comment), nothing in the route claims this one. | `src/app/api/reset/route.ts:25-31` | **R-66** (the one-line exception claim, the users precedent's lighter form — a schema for a single literal field is ceremony) |
| F-269g | Informational | **THE UPDATE-GUARD COMMENT CLAIMS SETTINGS PUT RIDES UPDATE — it has ridden upsert since F-239g.** The comment before updateSchema states settings PUT and users PATCH ride the record-returning update call, not the count-mapped updateMany; users PATCH does, but settings PUT has ridden db.setting.upsert since session 239 — upsert's update arm carries the same no-op-returns-record safety, so the contract's substance is intact; the comment names the wrong call. Comment-vs-code drift of exactly the genus the house polices. | `src/lib/schemas.ts:199-202` vs `src/app/api/settings/route.ts:102-108` | **R-66** (the comment trued) |
| F-269h | Informational | **THE DASHBOARD'S RENDER-STABLE CLOCK COMMENT LACKS THE STALENESS REGISTRATION ITS ANALYTICS TWIN CARRIES.** The dashboard mounts its clock once ("Render-stable timestamp — the memo derivations depend on it"), so an idle tab buckets the Today labels and KPI month windows to the mount-time calendar; the identical trade on the analytics refDate is explicitly registered as the F-267i staleness genus. A documentation asymmetry only — the behavior is the sanctioned trade on both surfaces. | `src/app/(app)/dashboard/page.tsx:74-75` vs `src/app/(app)/analytics/page.tsx:140-144` | **R-66** (the one-line registration, the analytics form) |
| F-269i | Informational | **THE STORE LOGOUT MICRO-RACE — the F-250p family.** Two concurrent sign-outs where the first POST succeeds server-side and the second POST fails leave both calls returning false with no client-side clear — the server session is dead but the store keeps the standing ledger until the next fetch 401s and the revocation wall fires (the era match). Same-user only, sub-second window, requires a network flake on the second POST, self-healing on the next interaction, no cross-user exposure. | `src/stores/wealthos-store.ts:507-543` (the exactly-own-bump guard) | Registered residual, no action (the F-250p "no concrete interleaving demonstrated" family; hardening keyed on era-unchanged-since-own-bump is not warranted) |
| F-269j | Informational | **THE TABLE/UNDERLINE DEAD RULES RIDE RAW-SOURCE SCANNING — the F-259d posture, extended.** The tabs variant value ("underline", never a rendered class) and the raw table tag names in the import and investments pages are valid v4 candidates that the raw-source content scan emits as dead rules (~30 bytes each). The house posture (the toast carrier note, F-259d): rendered liveness, never source-wide lastness — accepted, registered. | `src/components/ui/tabs.tsx:63,135`; `src/app/(app)/import/page.tsx:294`; `src/app/(app)/investments/page.tsx:267,280` | Registered posture, no action |

Recorded, not cured: F-269i/F-269j (the two registered postures above)
plus the standing registers (F-268h/i/j, F-267h/i, F-265f, F-264g/h/i,
F-257a/r — all standing; the API layer's twenty-second clean bill
recorded above; the security census unchanged under F-268d's standing
posture). The toolchain note stands (agent-browser/HeadlessChrome vs
the Turbopack dev build — session 253; this session's clone-side
comparison rode the production artifact cleanly again). Next session
defaults to findings-led iteration — re-send the standing directive to
continue the rhythm.

"""
p = insert_before(p, "## 3. The remediation program (R-items)", LEDGER, "ledger insert")

# ---- 3. the R-66 section, above R-65's -----------------------------------
R66 = """### R-66 — The unpadded-year, net-universe, and drawer-guard round (session 269)

The operator re-sent the standing directive after the R-65 ship pair
(df6ebc05 + the owner's 1fa6f23f session-log update carrying
docs/session_120.md, the owner's session-268 transcript — fetched and
reviewed at intake per the odd-number record convention). Per the
recorded rhythm, findings-led iteration. The intake and the standing
layers are recorded in the version header above; this section carries
the findings, the cures, and the verification contract.

**The findings (each verified at file:line by the driving session —
the API layer's twenty-second consecutive clean bill is the round's
clean column; every finding lives on the seam, the net, the docs, or
the shell):** the §2.27 ledger's ten rows — F-269a THE UNPADDED-YEAR
PREFILL (the round's flagship: the write-admitted year-100-to-999
class cannot round-trip through the app's own edit dialog — the
prefill bridge emits a three-digit-year string the native input treats
as empty and the boundary rejects on save; runtime-proven through the
seam's verbatim semantics, both sides of the divergence observed) ·
F-269b the carrier net's universe claim vs the tracked unexcluded
files (prisma/seed.ts the material one, clean today) · F-269c the PAD
§10 closing line's stale e2e tail outside the docs-counts pin's
window (the F-204a genus recurring inside its own blind spot) ·
F-269d the drawer's unguarded Escape (the repo's own named standing
battery gap) · F-269e the sub-100 custom-bound posture flip (unpinned
either direction) · F-269f/F-269g/F-269h the three comment-truth
riders (the reset exception claim, the upsert truing, the clock
staleness registration) · F-269i/F-269j the two registered postures.

**The cures (R-66.2):** toDateInputValue pads the year to 4 digits
(the whole write-admitted class becomes round-trippable through the
edit dialog — every current-year consumer byte-identical). The
carrier-net walk gains prisma/seed.ts, prisma/schema.prisma, and
.env.example (the human-editable tracked files inside Tailwind's scan
set), the deliberate residue documented (the lockfile, the license,
the ignore list — machine-generated or non-code prose, not
human-editable source). The PAD §10 closing line trues to the live
e2e count and the docs-counts pin window widens to carry the e2e tail
(the line moves whole or the gate fails). The drawer's Escape listener
gains the stacked-dialog guard with the self carve-out (the drawer IS
a dialog — its own element id is excluded from the census; any OTHER
dialog or an open popper wrapper owns the Escape). The customBoundMs
sub-100 posture pins (a sub-100 custom start bound windows, it does
not drop). The three comment riders land (the reset exception claim,
the upsert truing, the clock staleness registration).

**The verification contract (R-66.3):** the parity-269 battery born
honest RED against the pre-cure tree (the prefill round-trip legs —
a year-0206 row prefills the padded form AND parses back through the
update schema · the sub-100 legacy-row prefill leg — the padded
honest display the boundary still rejects on save, the F-268a
posture · the custom-bound posture leg · the drawer-guard source
leg) with the green-by-design riders (the current-year prefill form
byte-identical, the admitted-shoulder rider) → the cures → parity-269
GREEN → the parity-229 universe extension RED → the walk extension →
GREEN → the docs-counts window extension RED → the line truing →
GREEN → lint 0/0 · tsc 0 · the unit suite at the new count · build ·
smoke 15/15 · the FULL e2e battery (+1 leg: the year-0206 edit
round-trip — the API-created row's edit dialog prefills the padded
value and the save keeps the stored date; zero new signups/logins,
the shared storageState rides, the row cleaned up) · census MATCH ·
the drift chain re-run (the four sweep classes + the fullpage sweep +
the interior census — REQUIRED again: the four section pages' prefill
surfaces and the drawer shell changed; the closed-state DOM is
unchanged by construction (the padded year changes a value inside a
closed dialog's input, the drawer guard adds no elements), so the
standing baselines are expected to hold, and the chain is the proof)
· the captures (the year-0206 edit-prefill face at desktop, plus the
standing mobile drawer at 390).

"""
p = insert_before(p, "### R-65 — The year-remap, switch-target, and cleared-bound round (session 268)", R66, "R-66 insert")

# ---- 4. the §5 execution-history row -------------------------------------
ROW = """| v2.66.0 | 269 | **R-66** (the unpadded-year, net-universe, and drawer-guard round — findings-led, the standing directive with the reference STABLE on every standing drift layer and the mobile-navigation ask verified on BOTH sides at TRUE 390×844 (the reference through probe:ref's agent-browser leg; the clone side riding the production artifact on the scratch db/comparison.db per the session-253 toolchain note, booted in a single invocation per the session-98 server-death lesson — the aria-expanded flip verified on open AND close, zero visible nav links after the close); the workspace had been RESET — a fresh clone at HEAD 1fa6f23f with the environment rebuilt cold (the one deviation environmental: the fresh sandbox carried the wrong Playwright chromium build, the headless-shell 1254 installed before the battery); the cold baseline GREEN at HEAD — the v2.65.0 ship state reproduced exactly, no discovery). The audit round: the standing layers re-verified (probe:ref STABLE; `bun audit` UNCHANGED — the 2-advisory dev-chain census under F-268d's standing posture; neo-crm unchanged (b3d0fbe); the SEO surface verified (smoke leg 12); the .env contract + the db/ at the repo root + the configs + the .env.example standing). The session-269 fresh-eyes audit (three Mode-C passes: the R-65 cure surfaces — the parity-267 and parity-268 batteries re-run green · the API/auth/security layer — the TWENTY-SECOND consecutive clean bill (twelve contracts, 45 handlers / 30 route files, 3 dismissed candidates) · the UI/a11y/shell layer — all eight standing contracts verified, four new findings after dedup): 0 Critical / 0 High / 0 Medium / 4 Low / 6 Informational NEW after dedup, every material claim re-verified at file:line (the year-206 prefill divergence runtime-proven through the seam's verbatim semantics; the sub-100 custom-bound flip runtime-proven through a verbatim replica; the stale PAD tail read directly). THE ROUND'S CURES: F-269a the year padded to 4 digits in the prefill bridge (the write-admitted class round-trippable) · F-269b the carrier-net walk extended to the three human-editable tracked files (the residue documented) · F-269c the PAD §10 closing line trued + the docs-counts pin window widened to carry the e2e tail · F-269d the drawer Escape guard with the self carve-out · F-269e the sub-100 custom-bound posture pin · F-269f/F-269g/F-269h the three comment-truth riders. Registered: F-269i the store logout micro-race, F-269j the dead-rule posture. The plan v2.66.0 written and validated against the tree. **R-66.1** the pins born RED (the parity-269 battery + the parity-229 universe extension + the docs-counts window extension) → **R-66.2** the cures → **R-66.3** the verification (parity-269 GREEN · the universe leg GREEN · the window leg GREEN · lint 0/0 · tsc 0 · the unit suite at the new count · build · smoke 15/15 · the FULL e2e battery (+1 leg) · census MATCH · the drift chain re-run; the captures — the year-0206 edit-prefill face, the standing mobile drawer) | (pending at write time — the ship gate fills this cell) | (this session's execution commit) |
"""
p = insert_after(p, "| Version | Session | R-items executed | Gate at ship | Commit |\n", ROW, "§5 row insert")

with open("docs/remediation_plan_v2.md", "w", encoding="utf-8") as f:
    f.write(p)

# ---- post-write validation -------------------------------------------------
with open("docs/remediation_plan_v2.md", encoding="utf-8") as f:
    v = f.read()
checks = [
    ("Current v2.66.0", v.count("> **Current version: v2.66.0**"), 1),
    ("Previous v2.65.0", v.count("> **Previous version: v2.65.0**"), 1),
    ("§2.27", v.count("### 2.27 Session-269 audit ledger"), 1),
    ("R-66", v.count("### R-66 — The unpadded-year"), 1),
    ("§5 row", v.count("| v2.66.0 | 269 |"), 1),
    ("ledger rows", v.count("| F-269"), 10),
]
for label, got, want in checks:
    if got != want:
        sys.exit(f"[validate] {label}: expected {want}, found {got}")
print("plan v2.66.0 written and validated: head block, §2.27 (10 rows), R-66, §5 row")
