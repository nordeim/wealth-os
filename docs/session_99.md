# Session 99 — repo session 258 (R-55): the citation-math, input-flip, and render-cap round

The operator re-sent the standing directive after the R-54 ship pair
(9ad69e1 + the owner's 8f54c1e session-log update carrying
docs/session_97.md, the session-257 record, and docs/session_98.md,
the transcript capture). Per the recorded rhythm, this session
defaulted to findings-led iteration: refresh, re-audit, remediate,
verify, capture, document, commit, push — with the operator's named
asks (the mobile navigation comparison, the Tailwind v4 state, the
.env/db contract, the vitest/playwright configs, the sitemap/SEO
surface, the .env.example, the screenshots, the SSH-wrapper push)
re-verified along the way.

## Intake — a fresh clone and a rebuilt environment

The sandbox had been RESET: the workspace came back as a fresh
`git clone` at HEAD 8f54c1e. The environment was rebuilt from cold
(bun install — also regenerating the prisma client into
src/generated/prisma · cp .env.example .env with a fresh openssl
AUTH_SECRET · db:push · db:seed · playwright chromium install), the
.env on the DATABASE_URL="file:../db/custom.db" contract, db/ at
the repo root, and the census MATCH (80/4/3/6/5/7, users=1).

The cold baseline gate ran GREEN — the v2.54.0 ship state reproduced
exactly, no discovery: lint 0/0 · tsc 0 · 1744/1744 unit (109 files)
· build (the 4 documented Turbopack tracing warnings) · smoke 15/15
· 152/152 e2e · census MATCH.

The standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the F-250q stylesheet fingerprint 96f24d45…
unchanged, the demo data zero, the desktop nav 256/9, the TRUE-390
menu census standing). THE MOBILE-NAVIGATION COMPARISON ran through
agent-browser at TRUE 390×844 on BOTH sides (the viewport verified
by computed innerWidth): the reference's drawer opens with the 9
destinations + Sign Out and closes on the X toggle (unmounted, zero
visible links); OUR drawer (the production artifact on a scratch db,
the session-253 toolchain note) opens with the identical
destinations + Sign Out via the labeled hamburger, the aria-expanded
flip Open→Close navigation menu verified on open AND close, zero
visible nav links after the close — parity plus the documented
superset, NO Tailwind v4 regression; both comparison captures
re-saved (PNG-valid at the true viewport). `bun audit` unchanged (1
moderate dev-chain minimatch, the documented deferral). The neo-crm
upstream check: unchanged (b3d0fbe) — nothing to port. The SEO
surface verified (smoke leg 12: sitemap + robots + manifest 200).
The .env contract, the db/ at the repo root, the vitest/playwright
configs, and the .env.example six-knob set all standing.

## The fresh-eyes audit — three passes, an eleventh clean bill, and a genus extended by the driving session

Three Mode-C passes (the R-54 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer): all FIVE
R-54 cure surfaces verified HOLDING at file:line (the parity-257
battery re-run green 7/7 at HEAD; the wifi pill, the login-card
header, the toast text-muted arm, the BUTTON_BASE shape, the badge
focus-visible arms + the live settings consumers); the API layer's
ELEVENTH consecutive clean bill (all ten house contracts, all 45
exported handlers across 30 route files — the counts confirmed
exactly; one informational caution folded into the R-5 register:
the ai-coach `history` field is accepted-but-unconsumed today, and
when the LLM provider lands its client-supplied role/content is
untrusted input — prompt-injection surface exactly like `question`);
the UI source layer clean on every named contract (the shell family,
the theme system, the Tailwind v4 token discipline, the store, the
date doctrine, the route twins, the metadata family — all holding)
with six NEW findings after dedup (with the driving session's
lockstep rider).

The driving session re-verified every material claim at file:line
and recomputed every contrast figure by code against the pinned
palette — the whole-tree census of all ~50 ratio citations EXTENDED
the audit's ratio family with FOUR more carriers (the segmented-
track trio and the import income tail, beyond the audit's toast/tabs
pair), and the driving session's own §5 structure check caught the
shipped v2.54.0 execution-history row mis-sorted one slot low (plus
a pre-existing v2.24/v2.23 tail swap — F-258i, the ordering blind
spot in the parity-254 no-duplicate battery).

The findings — ONE DOMINANT GENUS: MEASUREMENT-TRUTH DRIFT,
comments citing contrast figures that do not compute on the pinned
palette. F-258a (Low): the impossible 4.95:1 stone-500 citations at
two carriers — WCAG math caps stone-500 (#78716c) at 4.80:1 against
pure white, so 4.95:1 is unreachable on ANY surface; the
DIALOG_CLOSE header (white card → 4.80:1) and the settings switch
note (white/80 card over the wash → 4.75:1). F-258h
(Informational): the ratio-citation drift family — six more sites
carrying figures that do not compute, all direction-safe (every
PASS/FAIL verdict the comments draw stays true at the computed
values): toast 3.66→3.77 / 4.83→5.02 (emerald-600/amber-700 on the
white surface card) · tabs 3.21→3.19 / 4.83→5.02 / 4.0→4.40 ·
segmented 5.4→6.99 / 4.0→4.40 (the track is bg-stone-100) · import
3.15→3.19 (emerald-700 on the dark stone-900 tbody). F-258b (Low):
the `.dark .input-base` dead arms — the color and `&::placeholder`
literals byte-equal to the flipped --color-ink/--color-muted-ink
tokens (the F-252g genus; unlayered `.dark .input-base` beats the
utilities layer, so a future token edit would silently never reach
the native date inputs; the border-color arm is a live override and
stays). F-258c (Low): the stale QUICK_PICK citation — the
income-chip retirement note names a constant that exists nowhere in
the tree, against a dialog that renders no chips (the F-257m/n
genus's last carrier family). F-258d (Low): the import reassurance
glyph rides the pre-F-221m step (text-emerald-500 at 2.54:1 where
the toast's identical glyph rides the emerald-600/400 pair).
F-258e (Low): the expenses history renders unbounded while every
sibling caps (the import path admits 5,000 rows; the search re-keys
the visible memo per keystroke; the seeded 72-expense corpus never
trips a 100-row cap). F-258f (Informational): the mobile-header
docblock's "✓→wifi" transition notation. F-258g (Informational):
the avatar prose says "relative luminance" where the formula is
gamma-encoded luma. F-258i (Low): the §5 execution-history ordering
contract — the head-block slip (the shipped v2.54.0 row between
v2.53.0 and v2.52.0) plus the tail-block v2.24/v2.23 swap.

## R-55 — TDD execution

**R-55.1 — the pins born RED (honest RED: 17/18)**: the parity-258
source battery — one leg per cure surface, the source-scan pattern.
The F-258i leg was born GREEN by design (the F-215b precedent: the
§5 re-sort landed with the plan's own lockstep edits in the same
commit; its RED was proven against the shipped tree, where the head
block reads [53, 54, 52, …] and the tail [22, 24, 23, …] — both
failing the leg's assertions there). Two harness fixes landed at RED
time (the norm() extension to strip `//` comment continuations —
the palette-pins twin's phrase hard-wraps; the F-258d leg's string
assertion form). The RED was re-proven against the pre-cure tree
via stash: the battery failed on exactly the seventeen expected
defects, the honest-RED discipline holding.

**R-55.2 — the cures (nine)**: the two 4.95:1 citations trued to
the computed values on their named surfaces (4.80:1 on the white
dialog card; 4.75:1 on the white/80 settings card) · the six
drifted figures trued likewise (3.77/5.02, 3.19/5.02, 4.40,
6.99/4.40, 3.19) · the `.dark .input-base` color and
`&::placeholder` arms retired (the token flips carry them; the
`.dark` block's "follow the existing precedent" framing reworded at
both carriers — globals.css and the palette-pins twin) · the
QUICK_PICK note reworded to the live truth (no chips; the selects
ride INCOME_SOURCE_TYPES/INCOME_FREQUENCIES) · the import glyph
stepped to the F-221m pair (text-emerald-600 dark:text-emerald-400)
· the expenses render capped at 100 with the import preview's own
rider pattern ("Showing the first 100 of N expenses — refine the
search or filters to narrow the list"; the HISTORY_RENDER_CAP
constant with its provenance) · the mobile-header pill named for
the live wifi glyph · the avatar prose trued to "perceptual luma" ·
the §5 re-sort (the v2.55.0 row at the head, the v2.54.0 row to
second, the v2.24/v2.23 pair re-sorted — the two-block contract
restored). The regression contract worked as designed: parity-219's
import emerald arm caught the glyph cure (the file-wide
emerald-600 ban predates the pair) — recalibrated same-commit to
scope the income-amount construction; the toast-anatomy comment
figures and the palette-pins precedent framing recalibrated
same-commit; the parity-243 mirror pin took the guard trio's ninth
ride.

**R-55.3 — the verification**: parity-258 GREEN 18/18 · lint 0/0 ·
tsc 0 · **1762 unit (110 files, +18)** · build (the 4 documented
Turbopack tracing warnings) · smoke 15/15 · the FULL e2e battery
152/152 (the seeded corpus never trips the cap — the demo view
renders complete) · census MATCH · `bun audit` unchanged · THE
CAPTURES 228-230 (the own-database convention + the census
tripwire + PNG validation + blank detection: the mobile drawer at
390 with the 9-destination + Sign Out census and the aria-expanded
close flip asserted; THE DARK INPUT FACE — the F-258b retirement
proven LIVE by the computed-style read: the dark date input
computes color rgb(245,245,244) (the flipped --color-ink),
placeholder rgb(168,162,158) (the flipped --color-muted-ink, via
the live type-flip probe), border rgba(255,255,255,0.1) (the live
override); THE RENDER-CAP FACE — the F-258e cure proven LIVE: 45
bulk creates past the cap, exactly 100 rows rendered, the rider
reading "Showing the first 100 of 117 expenses — refine the search
or filters to narrow the list.") + the two comparison captures at
TRUE 390×844. The six parity drift gates not re-run (the
session-253 precedent: the comment cures touch no baseline-carried
parity surface; the DOM riders are visible only at volumes the
zero-data baselines never carry — the seeded corpus sits under the
cap, the reference's own workspace is empty).

## Delivery

Docs lockstep complete: the count ladder (UNIT 1744→1762, FILES
109→110, BADGE 1896→1914 across the doc set — README's badge +
stack table + hierarchy + testing table + verification row +
program row; AGENTS's command row; CLAUDE's gate line + command
table + test pyramid; the SKILL's four sites; the PAD's gate ADR +
tree + §7.1 (the Unit row 110/1762, the architecture family 77→78
with parity-258 listed, the arithmetic 4+78+28=110) + §9 command
row + §10 closing line + pre-push checklist + the Last Updated
date), the PAD's v2.55.0 revision block, the guard trio's NINTH
gate-enforced advance (docs-counts: v2.53.0/v2.54.0/v2.55.0, with
the two pin constants + the family row advanced same-commit), the
README program row's R-55 summary prepended, the plan's §2.16
ledger + R-55 section + the v2.55.0 execution-history row at the
head (with F-258i's re-sort), the worklog entry, and this session
record. docs-counts 25/25 at the new counts (with parity-254:
the no-duplicate + ordering contracts green).

**Recorded, not cured**: F-257a (the signup TOCTOU — display-only)
and F-257r (the bootstrap regex's dead alternative — harmless
mirror symmetry), the ai-coach `history` caution (the R-5 register
— the LLM provider's wiring must treat the field as client-supplied
untrusted input), plus the standing families (F-252k, F-251i-k,
F-250h-p, F-249j-n, F-248h-n, F-247g-l, F-246g/h, F-245g/h,
F-244i-n, F-242h/i, F-240k-n, F-239l-s — plan §2.12's register),
plus the toolchain note (the agent-browser HeadlessChrome-157
dev-build hydration gap — session 253, re-confirmed this session:
the clone-side comparison rode the production artifact cleanly).
Next session defaults to findings-led iteration — re-send the
standing directive to continue the rhythm.
