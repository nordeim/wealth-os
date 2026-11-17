# Session 117 — repo session 267 (R-64): the savings-tab, sort-count, and calendar-roundtrip round

The operator re-sent the standing directive after the R-63 ship pair
(36353d8c + the owner's 70bb0fc3 session-log update carrying
docs/session_116.md, the owner's session-266 log). Per the recorded
rhythm, this session defaulted to findings-led iteration: refresh,
re-audit, remediate, verify, capture, document, commit, push — with
the operator's named asks (the mobile navigation comparison, the
Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.

## Intake — the reset, a fresh clone, and a green baseline

The workspace had been reset — a fresh clone at HEAD 70bb0fc3 (tree
clean; the prior session's work already shipped). The environment
rebuilt cold: bun install (with the postinstall prisma generate), .env
from .env.example on the DATABASE_URL="file:../db/custom.db" contract,
db/ at the repo root, db push + seed, census MATCH (80/4/3/6/5/7,
users=1). The one cold-start deviation was environmental: the cached
Playwright chromium build did not match the 1.65 pin (the
headless-shell 1254 build installed, then the battery ran green). The
cold baseline gate ran GREEN — the v2.63.0 ship state reproduced
exactly, no discovery: lint 0/0 · tsc 0 · 1877/1877 unit (118 files) ·
build (the 4 documented Turbopack tracing warnings) · smoke 15/15 ·
155/155 e2e · census MATCH.

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
capture re-saved at the standing name. `bun audit` unchanged (1
moderate dev-chain minimatch, the documented deferral). neo-crm
unchanged (b3d0fbe, remote-verified) — nothing to port. The SEO
surface verified (smoke leg 12: sitemap + robots + manifest 200). The
.env contract, the db/ at the repo root, the vitest/playwright
configs, and the .env.example six-knob set all standing.

## The fresh-eyes audit — a clean API column and the tab the discriminator missed

Three Mode-C passes (the R-63 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer), dispatched in
parallel, every material claim re-verified at file:line by the
driving session before planning. The parity-266 battery re-ran green
16/16 at HEAD (all R-63 cure surfaces holding). The API layer's
TWENTIETH consecutive clean bill: all twelve house contracts verified
with file:line evidence, the tree measured at exactly 30 route files /
45 handlers (GET 15 · POST 17 · PUT 6 · DELETE 6 · PATCH 1), every
candidate examined and dismissed into a documented posture. The UI
layer verified all eight standing contracts (the plain drawer, the
theme-default seam and its mirrors, the Tailwind v4 hazard axes, the
carrier net, the a11y family, the toDate routing, the hydration
carriers, the route twins) plus a close data-flow trace of the R-63
cure surfaces — five new findings after dedup.

The round's ledger (§2.25): 0 Critical / 0 High / 1 Medium / 4 Low /
4 Informational. THE ROUND'S MEDIUM LIVES INSIDE F-266c'S OWN
CHARTER: F-267a the no-matches discriminator misses the budget TAB —
the page's third constraint dimension, the one live control that can
empty a list without being counted. The corpus's savings bucket is
EMPTY (needs 46 · wants 26 · savings 0 — census-verified on the live
db), so the Savings tab alone renders the ONBOARDING face ("No
expenses yet" + the Add Your First Expense CTA) for a 72-expense
ledger TODAY; the compound: the F-266c Clear Filters action the
previous round built never resets the tab, so the still-empty list
flips from the no-matches face to the onboarding face after its own
Clear button. Their siblings: F-267b the discriminator reuses the
badge count verbatim, so the SORT pair (a control that can only
reorder, never empty) counts as an over-constraint — a genuinely
empty ledger with a touched sort renders the no-matches face (the
mirror edge) · F-267c the seam's custom-bound form guard admits
calendar-invalid forms — the shape regex passes "2026-02-31" and
toDate's normalizing constructor invents Mar 3 (runtime-verified; the
exact F-222a invented-day doctrine the guard was built to enforce)
· F-267d the four Add/Edit dialogs' Date inputs still ride the
input-base genus while their siblings ride FORM_INPUT — the F-266e
split's dialog edition, live-adjudicated on the reference (its own
Add-Expense manual form carries ONE computed genus across every
input) · F-267e budgetCategorySplit unmemoized (the F-231j memo
contract its two siblings honor). The Informationals: F-267f the
bound-field docs' letter divergence · F-267g the Escape guard's
unpinned unmount invariant · F-267h the theme fallback's storage
divergence (registered) · F-267i the dashboard clock's midnight
staleness (registered, the deliberate trade).

## The cures — and the two-step dialog the captures face caught

The plan v2.64.0 was written and validated against the tree
(scripts/plan-267.py), then the parity-267 battery was born honest RED
(13 RED cure legs + 5 green-by-design riders). The cures:

- **F-267a/F-267b — the dedicated over-constraint predicate.** The
  history body's empty arm keys on listConstrained — the
  list-narrowing constraints the page owns (range, category, min,
  max, THE TAB, and the search box) — SEPARATE from the badge count
  (which keeps its honest F-265e panel count, sort included): a list
  emptied by ANY live narrowing constraint wears the no-matches face,
  and the Clear Filters action lifts EVERY constraint the page owns
  INCLUDING the tab (setTab("all") joins the resets).
- **F-267c — the calendar round-trip.** The seam's custom-bound
  branch gains customBoundMs: a bound that constructs off the regex
  groups must LAND on the calendar its digits wrote or be DROPPED as
  open — the csv.ts stageWrittenLiteral doctrine in its local-midnight
  form. The Feb-31 and month-13 overflow inventions are refused
  alongside the partial-ISO inventions the F-266i guard already
  refuses; the twin-form admission and the calendar drops are pinned
  (the battery gaps the audit named, closed).
- **F-267d — the four dialog Date inputs join the house genus.** The
  expenses/income/goals/investments dialogs' date inputs ride
  FORM_INPUT beside their siblings (the R-63 house direction extended
  to the last split surfaces; the analytics search-box genus stays by
  the documented adjudication).
- **F-267e — the memo wrap** (the clock derived inside the memo, the
  visible memo's own convention).
- **F-267f — the twin clause in the bound-field docs.**
- **F-267g — the Escape guard's comment states the unmount invariant
  it rests on.**

THE CAPTURES FACE LIVE-CAUGHT THE TWO-STEP DIALOG at first run: the
Add Expense dialog opens on its QUICK-SELECT step (the reference's own
convention — "Pick a category to prefill the form, or fill it
manually"), so the manual form with the Date input surfaces only
after the "Or fill manually" reveal; the capture script's manual-form
probe was re-anchored on the reveal, and the dialog Date input's
computed fill live-verified at rgb(28,25,23) — the FORM genus's dark
stone-900, the F-267d cure rendered. The pin families updated in the
same commit: the parity-265 F-265e leg re-scoped to the badge's own
construction site (the whole-file tab-term negative pin was
over-broad — the predicate legitimately carries the tab), the
parity-266 F-266c discriminator pin advanced to the predicate form,
and the two new e2e legs (the Savings-tab no-matches face with the
onboarding CTA absent; the compound with the Clear Filters restore
returning the tab to All — zero new signups, the corpus's own empty
savings bucket the deterministic fixture).

## The verification — the full gate, the six drift gates, and the captures

parity-267 GREEN 18/18 · lint 0/0 · tsc 0 · 1895 unit (119 files,
+18) · build (the 4 documented Turbopack tracing warnings) · smoke
15/15 · the FULL e2e battery 157/157 (+2 — both new legs green on
first run) · census MATCH. THE SIX PARITY DRIFT GATES RE-RUN
(required — the Expenses parity surface changed): the four sweep
classes CLEAN (1440/390/768/1024, 0.5pct margin), the fullpage sweep
CLEAN, the interior census CLEAN (0-event margin) — the closed-state
DOM unchanged by construction (the discriminator is render-logic, the
no-matches variant only renders under the tab constraint, the dialog
inputs live inside closed dialogs), and the chain is the proof.

THE CAPTURES (on the dev server riding db/captures.db, the census
tripwire MATCH on every run): 250 — THE SAVINGS-TAB NO-MATCHES FACE
AT DESKTOP 1440×900 (the tab-emptied list wearing the over-constrained
truth — Clear Filters standing, the onboarding CTA absent — and the
dialog Date input on the form genus); 251 — THE COMPOUND
OVER-CONSTRAINT AT MOBILE 390×844 (the tab plus the search box, the
Clear lifting both, the All tab returning, the list restored). Plus
the two comparison captures at TRUE 390×844.

## Delivery

The docs lockstep (scripts/docs-267-lockstep.py): the count ladder
UNIT 1877→1895 / FILES 118→119 / E2E 155→157 / BADGE 2032→2052 across
README/AGENTS/CLAUDE/SKILL/PAD; the README remediation-program row
ADVANCED to R-64 (the F-266a structural leg deriving the PAD's newest
round); the PAD's v2.64.0 revision block; the §7.1 family row 86→87
with parity-267; the guard trio's EIGHTEENTH gate-enforced advance
(v2.62.0/v2.63.0/v2.64.0 + the parity-243 mirror); the plan's §2.25
ledger + R-64 section + the v2.64.0 execution-history row with the
counts filled; the worklog entry; this session record. Committed on
main and pushed via the SSH wrapper (remote ref verified), key
shredded.

Recorded, not cured: F-267h (the theme fallback's storage divergence)
and F-267i (the dashboard clock's midnight staleness) beyond the
standing registers (F-265f, F-264g/h/i, F-257a/r, the standing
families) and the toolchain note (the agent-browser/HeadlessChrome
dev-build hydration gap — session 253; the clone-side comparison rode
the production artifact cleanly again). Next session defaults to
findings-led iteration — re-send the standing directive to continue
the rhythm.
