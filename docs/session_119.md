# Session 119 — repo session 268 (R-65): the year-remap, switch-target, and cleared-bound round

The operator re-sent the standing directive after the R-64 ship pair
(4f537779 + the owner's 5c6c8a34 session-log update carrying
docs/session_118.md, the owner's session-267 transcript — fetched and
reviewed at intake; this record rides the next number per the
odd-number record convention, the f11c1951 precedent). Per the
recorded rhythm, this session defaulted to findings-led iteration:
refresh, re-audit, remediate, verify, capture, document, commit, push
— with the operator's named asks (the mobile navigation comparison,
the Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.

## Intake — the reset, a fresh clone, and a green baseline

The workspace had been reset — a fresh clone at HEAD 5c6c8a34 (tree
clean; the prior session's work already shipped). The environment
rebuilt cold: bun install (with the postinstall prisma generate), .env
from .env.example on the DATABASE_URL="file:../db/custom.db" contract,
db/ at the repo root, db push + seed, census MATCH (80/4/3/6/5/7,
users=1). The one cold-start deviation was environmental: the cached
Playwright chromium build did not match the 1.65 pin (the
headless-shell 1254 build installed, then the battery ran green). The
cold baseline gate ran GREEN — the v2.64.0 ship state reproduced
exactly, no discovery: lint 0/0 · tsc 0 · 1895/1895 unit (119 files) ·
build (the 4 documented Turbopack tracing warnings) · smoke 15/15 ·
157/157 e2e · census MATCH.

The standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the F-250q stylesheet fingerprint 96f24d45…
unchanged, the demo data zero, the desktop nav 256/9, the TRUE-390
menu census standing). THE MOBILE-NAVIGATION COMPARISON ran at TRUE
390×844 on BOTH sides: the reference through agent-browser (the
viewport verified by computed innerWidth — the drawer opens with the
9 destinations + Sign Out and closes on the X toggle, zero nav
destination links in the viewport after the close; the capture
re-saved at the standing name) and OUR SIDE through the production
artifact on the scratch db/comparison.db (booted in a single
invocation per the session-98 server-death lesson) — the identical
destinations + Sign Out via the labeled hamburger, the aria-expanded
flip Open→Close navigation menu verified on open AND close, zero
visible nav links after the close, the census tripwire MATCH — parity
plus the documented superset, NO Tailwind v4 regression; the clone
capture re-saved at the standing name. `bun audit` CHANGED — the
advisory census moved 1 → 2: a NEW dev-chain HIGH (picomatch
GHSA-fc5q-39xc-vjpf / CVE-2026-112366, ReDoS via single-branch
repeated extglob, CVSS 8.7) with NO FIX RELEASE (4.0.7 IS the latest
npm dist; every dependency path dev-toolchain — typescript-estree→
tinyglobby and vite, 26 terminal paths, all dev; zero runtime chains)
— the re-triage became the round's F-268d. neo-crm unchanged (b3d0fbe,
remote-verified) — nothing to port. The SEO surface verified (smoke
leg 12: sitemap + robots + manifest 200). The .env contract, the db/
at the repo root, the vitest/playwright configs, and the .env.example
six-knob set all standing.

## The fresh-eyes audit — a clean API column and the seam-side lows

Three Mode-C passes (the R-64 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer), dispatched in
parallel, every material claim re-verified at file:line by the driving
session before planning. The parity-267 battery re-ran green 18/18 at
HEAD (all R-64 cure surfaces holding). The API layer's TWENTY-FIRST
consecutive clean bill: all twelve house contracts verified with
file:line evidence, the tree measured at exactly 30 route files / 45
handlers (GET 15 · POST 17 · PUT 6 · DELETE 6 · PATCH 1), 15
candidates examined and dismissed into a documented posture. The UI
layer verified all eight standing contracts (the plain drawer, the
theme-default seam and its mirrors, the Tailwind v4 hazard axes, the
carrier net, the a11y family, the toDate routing, the hydration
carriers, the route twins) — plus a close data-flow trace of the
R-64 cure surfaces — four new findings after dedup.

The round's ledger (§2.26): 0 Critical / 0 High / 0 Medium / 4 Low /
3 Informational. THE ROUND'S FLAGSHIP (F-268a): the API date
validator's round-trip passed sub-100 years the string parser does
not remap, while toDate's branch-2 numeric constructor shifts them
+1900 — runtime-proven on both sides of the seam ("0050-06-15" parses
clean through dateField while toDate returns 1950), so a stored
year-50 row renders, buckets, and sorts as 1950 AND the edit prefill
silently rewrites the stored year on save. Pre-existing since F-218d
— the R-64 calendar round-trip closed only the bound half (its own
round-trip drops sub-100 bounds as open). Their siblings: F-268b the
settings switch's touch target sat under the WCAG 2.5.8 24px floor
(the F-235f/F-236d precedent class never swept the row;
live-adjudicated: the reference's own switch measures 36×20, so the
painted genus is parity-faithful and the cure must be paint-invisible)
· F-268c a cleared analytics date input silently zeroed the page
(toDate("") is an Invalid Date, so both range predicates went false
for every row — the $0.00 stat row, the no-data faces, the
headers-only export off one cleared keystroke) · F-268d the security
census re-triage (the PAD §10 row + the security-ledger pin must move
same-commit — the ledger cannot rot). The Informationals: F-268e the
clearAllFilters body unpinned · F-268f the no-millis twin admitted
but unpinned · F-268g the carrier net's src/-scope leaving the root
config files uncovered (Tailwind's content detection scans them —
the F-245e lesson).

## The cures — and the geometry the maiden capture trued

The plan v2.65.0 was written and validated against the tree
(scripts/plan-268.py), then the parity-268 battery was born honest RED
(9 cure legs + 6 green-by-design riders), the parity-229 universe leg
born RED over the src/-scoped walk, and the security-ledger census
pin born RED over the stale PAD row. The cures:

- **F-268a — both halves of the year-remap cure.** dateField rejects
  sub-100 years at the boundary (the csv.ts two-digit-year remap
  doctrine — a skip beats an invented century), AND toDate's branch 2
  gains the setFullYear arm (the remap-safe setter, still anchoring
  local midnight of the written calendar; a leap-day sub-100 year
  that survives the boundary round-trip keeps its date — every such
  year is divisible by 4 and the base year is leap).
- **F-268b — the paint-invisible hit-area extension + F-248j's
  completion.** The switch gains `relative` + an empty-content pseudo
  at negative vertical insets (clickable 36×32, painted 36×20,
  census-invisible by construction, sweep-invisible by construction)
  and the aria-describedby wiring (the description paragraph joins
  the switch's a11y chain — the reference's own switch carries no
  a11y attributes, the sanctioned superset). THE MAIDEN CAPTURE
  LIVE-TRUED THE GEOMETRY: the 8px insets offset from the PADDING
  box, so the 2px border spends 2px of each side — the effective
  extension is 6px past the border box (36×32 clickable, not the
  36×36 first written); the comments, the e2e offsets (6px→4px), and
  the plan figures were corrected to the computed truth in the same
  commit.
- **F-268c — the empty-bound-is-open doctrine.** The analytics seam
  guards both bounds BEFORE the toDate parse (from="" drops the lower
  bound, to="" drops the upper — the Expenses parseBound doctrine),
  and the refDate falls back to a stable now when the upper bound is
  open (the F-267i staleness genus, the registered trade). The
  parity-219 F-219e pin advanced to the guarded form in the same
  commit (the legitimate contract change, with the rationale).
- **F-268d — the census re-anchor.** The PAD §10 row + the
  security-ledger pin carry "2 advisories: 1 high / 1 moderate — all
  dev-toolchain, zero runtime chains" with the picomatch decode (no
  fix released; the re-triage duty watches the parent ranges).
- **F-268e/F-268f — the battery-gap riders.** The clearAllFilters
  body pinned at its construction site (all eight reset terms); the
  no-millis twin leg joins the F-267c battery-gap family.
- **F-268g — the carrier net's root-config extension.** The
  parity-229 walk gains the nine tracked root config files (the net's
  live universe matches Tailwind's scan set); the maiden run caught
  three prose carriers — "self contained", "heals itself", and the
  file-URL literal — reworded same-commit (reword, never allowlist).

## The verification — the full gate, the six drift gates, and the captures

parity-268 GREEN 15/15 · parity-229 GREEN 20/20 (with the extension)
· security-ledger GREEN 2/2 (with the new census) · lint 0/0 · tsc 0 ·
1911 unit (120 files, +16) · build (the 4 documented Turbopack
tracing warnings) · smoke 15/15 · the FULL e2e battery 159/159 (+2 —
both new legs green on first run: the cleared From date keeps the
ledger's stat row non-zero with no no-data face, and the switch
hit-area click 4px above the track's top edge toggles the control —
zero new signups/logins, the shared storageState rides) · census
MATCH. THE SIX PARITY DRIFT GATES RE-RUN (required — the analytics
and settings parity surfaces changed): the four sweep classes CLEAN
(1440/390/768/1024, 0.5pct margin), the fullpage sweep CLEAN, the
interior census CLEAN (0-event margin) — the closed-state DOM
unchanged by construction (the bound guard is render-logic inside the
memo, the hit-area extension paints nothing, the describedby is an
attribute), and the chain is the proof.

THE CAPTURES (on the dev server riding db/captures.db, the census
tripwire MATCH on every run): 252 — THE CLEARED-BOUND ANALYTICS FACE
AT DESKTOP 1440×900 (From empty, the stat row reading the real
averages $8,083.33 / $3,025.59 / $5,057.75, the trend populated — the
F-268c cure rendered live); 253 — THE SETTINGS SWITCH HIT-AREA FACE
AT DESKTOP (the 36×20 painted track with the 36×32 clickable box —
elementFromPoint resolving to the switch 4px past both edges, the
F-225d doctrine — and the description wired: aria-describedby=
switch-push-desc → "Receive notifications in your browser"). Plus the
two comparison captures at TRUE 390×844. NOTE: the VLM read was not
available in this environment's model configuration — the in-script
live assertions carried the capture verification (every face throws
on any failed expectation before committing the file).

## Delivery

The docs lockstep (scripts/docs-268-lockstep.py): the count ladder
UNIT 1895→1911 / FILES 119→120 / E2E 157→159 / BADGE 2052→2070 across
README/AGENTS/CLAUDE/SKILL/PAD — the maiden run missed two PAD F-204a
sites (the Playwright e2e chain line + the §7.4 checklist e2e line)
and over-replaced the v2.64 trio expect, all three caught by the
docs-counts battery and fixed with the script trued (the documented
F-242j recurrence genus, gate-caught same-session); the README
remediation-program row ADVANCED to R-65; the PAD's v2.65.0 revision
block; the §7.1 family row 87→88 with parity-268; the guard trio's
NINETEENTH gate-enforced advance (v2.63.0/v2.64.0/v2.65.0 + the
parity-243 mirror); the plan's §2.26 ledger + R-65 section + the
v2.65.0 execution-history row with the counts filled; the worklog
entry; this session record. Committed on main and pushed via the SSH
wrapper (remote ref verified), key shredded.

Recorded, not cured: F-268h (the dashboard KPI derivations
unmemoized — the benign F-267e tail; fold if the file is touched
again), F-268i (the listConstrained junk-bound posture — an
unparseable numeric bound counts as a constraint while the seam drops
it open; honest, the user touched the panel), F-268j (the
custom-range both-bounds-empty posture — the panel visibly shows
Custom range selected; documented posture) beyond the standing
registers (F-267h/i, F-265f, F-264g/h/i, F-257a/r, the standing
families) and the toolchain note (the agent-browser/HeadlessChrome
dev-build hydration gap — session 253; the clone-side comparison rode
the production artifact cleanly again; the VLM-read unavailability
noted above). Next session defaults to findings-led iteration —
re-send the standing directive to continue the rhythm.
