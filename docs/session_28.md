# Session 28 (repo session 223) — R-20: the dead-signout and dark-surface completion round

The standing directive executed end-to-end: refresh → review → validate →
audit → parity iteration → remediation plan → TDD execution → captures →
docs lockstep → commit → push.

## Intake & baseline

- The workspace SURVIVED the sandbox recycle (node_modules, db/, the
  generated prisma client, Playwright's chromium all intact) —
  `git pull` fast-forwarded `e873beb` (docs/session_27.md, the
  session-222 record). Doc set reviewed in full (AGENTS · CLAUDE ·
  README · PAD · SKILL · the plan v2.19.0 · worklog · session_26 ·
  session_27 · skills-catalog).
- Cold-baseline gate BEFORE any edit: lint 0/0 · tsc 0 · 1005/1005
  unit · build · smoke 14/14 · 110/110 e2e · census MATCH — the
  documented v2.19.0 state exactly. `bun audit`: unchanged (1
  moderate minimatch, dev-chain, range-unreachable).
- Standing deliverables verified: the .env/db contract (diff .env
  .env.example clean) · .env.example parity · sitemap/robots/
  manifest (smoke leg 12) · the vitest + playwright configs · the
  Tailwind v4 sweep (zero phantom breakpoints, zero inert tokens).
- Reference drift probe: STABLE on all four standing layers (bundle
  fingerprint BMU57229 · ZERO demo census · 256/9 desktop sidebar ·
  the TRUE-390 functional mobile menu — opens with 9 destinations;
  the owner's named focus verified live again).

## The audit (three parallel Mode-C passes)

**0 Critical / 2 High / 6 Medium / 4 Low raw**; every material claim
re-verified at file:line; the two csv claims live-reproduced under
TZ-switching probes on all three zones; the contrast claims computed
to two decimals; the two top security ratings adjudicated as
RE-DISCOVERIES of the standing F-217m owner-decision record — not
reopened.

- **F-223a (High)**: the desktop sidebar's Sign Out calls bare
  `logout()` while the navigating `signOut` helper sits DEAD beside
  it — the store clears to `hydrated:false, loading:true`, nothing
  re-renders the server layout, and the desktop sign-out dead-ends
  on "Loading your workspace…" until a manual reload. The mobile
  drawer's Sign Out works; the e2e battery covered the drawer path
  and only the desktop menu's ITEM VISIBILITY.
- **F-223b (High)**: the R-19 dark-arm regression — the round's own
  stone-50 dark ink on error.tsx's Try-again computes 2.06:1 on the
  UNFLIPPED amber fill (the light arm 8.14:1); every other amber
  CTA carries no dark ink arm (the F-219a genus); the R-19 parity
  pin ENSHRINED the defect.
- **F-223c (Medium)**: the dashboard Expense-Breakdown and
  investments Asset-Allocation donuts — the only two bare
  `<Tooltip>` sites repo-wide; the parity-222 pins for those pages
  were presence-only.
- **F-223d (Medium)**: the F-222d rollover guard's `$`-anchored
  NUMERIC_LOCALE cannot match a trailing time — "02/30/2026 10:00"
  stages the rolled Mar 2 while the date-only form nulls
  (live-reproduced, TZ-independent; "02/29/2026 12:00 AM" → Mar 1).
- **F-223e (Low)**: month-only named forms invent day 1 ("Nov 2026"
  → 2026-11-01, live) — the F-222c doctrine never covered the named
  twins.
- **F-223f (Medium)**: the desktop synced pill's green-700 light
  arm renders 3.49:1 on the ALWAYS-DARK sidebar gradient (the
  F-207h measurement rode the mobile topbar's light wash).
- **F-223g (Medium)**: the investments type chips' 600/700 text
  inks compute 2.02:1 on their 10% tints over dark cards (the
  F-218k cure measured light cards only).
- **F-223h (Medium)**: the F-222g ring family's tail — the sent
  view's Back, the AI-coach suggested-question chips + Send, the
  reset-password "Back to login".
- **F-223i (Medium)**: the income/expenses pastel icon tiles render
  bright light chips on dark cards (the accounts alpha pattern
  adapts; the hand-picked hex pastels don't).
- **F-223j/k/l (Low)**: the import alert's light arm 4.41:1;
  logout performs no server-side revocation (an exfiltrated cookie
  survives "sign out" for up to 7 days); the verify route's message
  ladder is a pending-state enumeration oracle.

## R-20 executed (TDD — pins born RED, cures, GREEN)

- **The dead signout**: the MenuItem wires `signOut()` + the
  DESKTOP sign-out e2e leg (mirroring the drawer's).
- **The R-19 regression**: the dark arm DROPPED (stone-900 on amber
  in both modes); the parity-222 pin recalibrated to the negative
  form.
- **The missed tooltips**: the sibling form on both donuts; the
  per-page pins become SITE COUNTS; the docblock's stale swatch
  claim corrected (recharts 3.10 has no swatch element).
- **The csv guard completion**: the `(?!\d)` prefix anchor (the
  guard fires through a trailing time; valid time-suffixed forms
  keep staging) + the MONTH_ONLY rejection (the named twins of the
  partial-ISO doctrine) — both TZ-switching-pinned.
- **The dark-surface family**: NAV_LAYOUT's pill carries the
  dark-surface pairing unconditionally (the mobile twin keeps its
  arms); INVESTMENT_TYPES gains `textDark` 400-level steps selected
  via isDark; the income/expenses tile backgrounds become isDark
  ternaries (the light rendering byte-identical — all six drift
  gates stayed CLEAN with no re-derivation).
- **The ring tail**: sentBack, the coach chips + Send, the
  reset-password back — the house/amber genus; the count pin 4→5.
- **The low tail**: the import alert red-700; **logout now
  REVOKES** (the tokenVersion bump — "sign out" means revoke; the
  e2e sign-out legs re-mint the shared storageState the per-USER
  eviction kills — the F-223k mid-flight discovery, the login
  budget counted 7/10); the verify no-pending branch unified to the
  remaining-message form.

## Verification

- Full gate: lint 0/0 · tsc 0 · **1029/1029 unit** (68 files, +24) ·
  build · smoke 14/14 · **111/111 e2e** (+1: the desktop sign-out
  leg).
- All six parity drift gates CLEAN (0-event margin — no baseline
  re-derivation; the light rendering unchanged by construction).
- Census MATCH before/after; audit unchanged.
- Eight capture faces committed (docs/screenshots/103-110), each
  asserted in-DOM: the desktop menu + the post-signout login wall;
  the light-mode green-400 pill; the dark 400-level chip inks; the
  dark alpha-tint tiles; the keyboard-focused coach chip ring; the
  dark donut tooltip panel; the time-suffixed staging preview.

## Docs lockstep & delivery

The plan → v2.20.0 (header · F-223 ledger · R-19 Done · the §5
execution row · the closing pointer — the pre-existing v2.19/v2.18
row-order defect fixed in-commit) · README (badge 1140, counts, the
R-20 status row) · AGENTS (counts + the storageState-revocation
gotcha) · CLAUDE (the gate contract) · PAD (the v2.20.0 revision
block + the live sites) · SKILL (counts) · docs-counts GREEN. The
atomic commits on main; the SSH-wrapper push with the remote ref
verified post-push; the key shredded.
