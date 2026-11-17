# Session 115 — repo session 266 (R-63): the range-return, empty-truth, and escape-stack round

The operator re-sent the standing directive after the R-62 ship pair
(b80c06e6 + the owner's cfadc7e0 session-log update carrying
docs/session_114.md, the owner's session-265 log). Per the recorded
rhythm, this session defaulted to findings-led iteration: refresh,
re-audit, remediate, verify, capture, document, commit, push — with
the operator's named asks (the mobile navigation comparison, the
Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.

## Intake — the third recycle, a fresh clone, and a green baseline

The sandbox had recycled again — the uncommitted tree was lost, but
the prior session's work was already shipped (b80c06e6, the R-62
round; the owner's cfadc7e0 added the session-265 log). A fresh clone
at HEAD cfadc7e0 (tree clean), the environment rebuilt cold: bun
install (with the postinstall prisma generate), .env from
.env.example on the DATABASE_URL="file:../db/custom.db" contract, db
push + seed, census MATCH (80/4/3/6/5/7, users=1). The one cold-start
deviation was ENVIRONMENTAL: the cached Playwright chromium build did
not match the 1.65 pin (the headless-shell 1254 build installed, then
the battery ran green). The cold baseline gate ran GREEN — the v2.62.0
ship state reproduced exactly, no discovery: lint 0/0 · tsc 0 ·
1860/1860 unit (117 files) · build (the 4 documented Turbopack
tracing warnings) · smoke 15/15 · 152/152 e2e · census MATCH.

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
surface verified (smoke leg 12: sitemap + robots + manifest 200).
The .env contract, the db/ at the repo root, the vitest/playwright
configs, and the .env.example six-knob set all standing.

## The fresh-eyes audit — a clean API column and nine findings where the new code landed

Three Mode-C passes (the R-62 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer), dispatched in
parallel, every material claim re-verified at file:line by the
driving session before planning. The parity-265 battery re-ran green
27/27 at HEAD (all R-62 cure surfaces holding). The API layer's
NINETEENTH consecutive clean bill: all twelve house contracts
verified with file:line evidence, the tree measured at exactly 30
route files / 45 handlers (GET 15 · POST 17 · PUT 6 · DELETE 6 ·
PATCH 1), every candidate examined and dismissed into a documented
posture. The UI layer verified all eight standing contracts (the
plain drawer, the theme-default seam and its mirrors, the Tailwind v4
hazard axes, the carrier net, the a11y family, the toDate routing,
the hydration carriers, the route twins) plus a close data-flow trace
of the R-62 cure surfaces — eight new findings.

The round's ledger (§2.24): 0 Critical / 0 High / 2 Medium / 4 Low /
3 Informational, plus the driving session's own docs discovery. THE
FLAGSHIP PAIR LIVES ON THE R-62 CARD ITSELF: F-266b the Date Range
select's six window options carried NO All-dates arm — once a window
was picked, the live-apply list could not be widened back from the
select alone (recovery required Clear All or Cancel; the reference's
identical option set hides the same trap behind its commit step) ·
F-266c a filtered-to-empty list rendered the ONBOARDING empty state
("No expenses yet" + the Add Your First Expense CTA) for a full
ledger that over-constrains any live control — the genus predates
R-62's category select, but the five new controls multiply its reach.
Their siblings: F-266d one Escape press dismissed TWO surfaces when a
Radix dialog opened over the open card (the dismissable layer closes
without stopping propagation — the window listener closed the card
beneath; the mobile drawer carries the same role and stacking) ·
F-266e the card's two input genera (the Custom dates on the analytics
search-box genus vs Min/Max on the house form genus) · F-266f the
dead Minus import (lint-blind: no-unused-vars off by config) · F-266a
the README's remediation-program status row stale at R-61 — the R-62
lockstep advanced the count ladder but missed the row; nothing pins
it (the F-245c genus) · F-266g the coach announcement region's
comment overstating ("empty when idle" is false after the first turn;
the F-235a doctrine makes the carry benign — the comment-truth genus)
· F-266h the snapshot capture writing a ref inside a state updater
(impure, idempotent in effect) · F-266i the seam's custom bounds
accepting non-bare forms silently (V8 stages "2026-11" as the first
of the month — an invented day, the F-222a genus; unreachable through
the type=date UI).

## The cures — and the Radix trap the captures face caught

The plan v2.63.0 was written and validated against the tree
(scripts/plan-266.py), then the parity-266 battery was born honest RED
(11 RED cure legs + 4 green-by-design riders, plus the docs-counts
structural leg RED against the stale README row). The cures:

- **F-266b — the All-dates first option.** The no-window state
  becomes named and selectable; the placeholder retires with it. THE
  CAPTURES FACE LIVE-CAUGHT THE RADIX TRAP at first run: a SelectItem
  may not carry the empty string (Radix's own placeholder predicate
  reads an empty value as "nothing selected" — the trigger rendered
  BLANK), so the option rides the "all" sentinel (the category
  select's own idiom) with the two boundary expressions mapping it
  onto the seam's "" no-window contract. The parity-265 placeholder
  pin updated in the same commit with the contract-change rationale.
- **F-266c — the empty-state split.** The history body's empty arm
  splits on the honest discriminator (panel filters active OR search
  non-empty): the no-matches face renders "No expenses match your
  filters" with a Clear Filters action that clears the panel controls
  AND the search box; the genuinely-empty ledger keeps the
  onboarding truth.
- **F-266d — the Escape stack guard.** Any open [role="dialog"] owns
  the Escape: both dialog genera unmount when closed (the Radix
  content, the mobile drawer's conditional return), so DOM presence
  is the exact test — and the card is role group, never a match.
- **F-266e — one input genus per panel.** The Custom date inputs join
  the house form genus with the width appendage (the settings page's
  own convention).
- **F-266f — the dead Minus import retired.**
- **F-266a — the README row advanced and structurally pinned.** The
  row now describes R-63, and the docs-counts battery carries the
  structural leg: it derives the PAD's newest [SR] revision round at
  test time and asserts the README row cites that round's R-item —
  the F-249b pattern on the last unpinned status site. The next
  stale row fails `bun run test` inside its own ship commit.
- **F-266g — the coach region's comment trued** (the carry semantics
  stated; the false claim withdrawn).
- **F-266h — the snapshot capture moved to the handler body** (the
  setter pure; the capture semantics byte-identical).
- **F-266i — the seam's custom-bound form guard.** A bound outside
  the bare yyyy-mm-dd form is DROPPED (treated as open) rather than
  parsed — V8's partial-ISO day invention refused; the
  UTC_MIDNIGHT_ISO regex already accepts exactly the two sanctioned
  forms.

THE REGRESSION CONTRACT WORKED AGAIN: the parity-229 class-shape net
caught the round's own cure comment (a hyphenated open surface
nickname — catch #13 of the genus; reworded before ship), and the
captures face caught the Radix empty-value trap the unit battery
could not see. Three e2e legs joined the battery: the All-dates
return round-trip (on a deterministic inverted Custom window — the
leg never depends on the corpus's dates relative to today), the
no-matches variant with its Clear Filters restore, and the Escape
stack over the Add Expense dialog.

## The verification — the full gate, the six drift gates, and the captures

parity-266 GREEN 16/16 · lint 0/0 · tsc 0 · 1877 unit (118 files,
+17) · build (the 4 documented Turbopack tracing warnings) · smoke
15/15 · the FULL e2e battery 155/155 (+3 — all three new legs green
on first run) · census MATCH. THE SIX PARITY DRIFT GATES RE-RUN
(required — the Expenses parity surface changed): the four sweep
classes CLEAN (1440/390/768/1024), the fullpage sweep CLEAN, the
interior census CLEAN — the closed-state DOM unchanged by
construction (the new option lives inside the closed card's select;
the no-matches variant only renders under active filters), and the
chain is the proof.

THE CAPTURES (on the dev server riding db/captures.db, the census
tripwire MATCH on every run): 248 — THE ALL-DATES RETURN AT DESKTOP
1440×900: the trigger reading "All dates" on open, the Last-month
pick narrowing the list, the All-dates pick restoring the baseline
EXACTLY, the Custom dates' computed form-genus fill (the dark
stone-900 family), and the Escape stack PROVEN live (the Add Expense
dialog closes on the first press with the card standing; the second
press closes the card); 249 — THE NO-MATCHES VARIANT AT MOBILE
390×844: the search-only over-constraint rendering the face, the
onboarding CTA absent, Clear Filters restoring the baseline exactly.
Plus the two comparison captures at TRUE 390×844.

## Delivery

The docs lockstep (scripts/docs-266-lockstep.py): the count ladder
UNIT 1860→1877 / FILES 117→118 / E2E 152→155 / BADGE 2012→2032 across
README/AGENTS/CLAUDE/SKILL/PAD; the README remediation-program row
ADVANCED to R-63 (F-266a's cure) and STRUCTURALLY PINNED; the PAD's
v2.63.0 revision block; the §7.1 family row 85→86 with parity-266
listed; the guard trio's SEVENTEENTH gate-enforced advance
(v2.61.0/v2.62.0/v2.63.0); the plan's §2.24 ledger + R-63 section +
the v2.63.0 execution-history row with the counts filled and the
F-266b disposition trued to the as-built sentinel; the worklog entry;
this session record. Committed on main and pushed via the SSH wrapper
(remote ref verified), key shredded.

Recorded, not cured: none NEW this round beyond the standing
registers (F-265f, F-264g/h/i, F-257a/r, the standing families) and
the toolchain note (the agent-browser/HeadlessChrome dev-build
hydration gap — session 253; the clone-side comparison rode the
production artifact cleanly again). Next session defaults to
findings-led iteration — re-send the standing directive to continue
the rhythm.
