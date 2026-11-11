# Session 26 (repo session 222) — R-19: the zone-designator completion and focus-affordance round

The standing directive executed end-to-end: refresh → review → validate →
audit → parity iteration → remediation plan → TDD execution → captures →
docs lockstep → commit → push.

## Intake & baseline

- Fresh sandbox; re-cloned at `bedea88`. Doc set reviewed in full
  (AGENTS · CLAUDE · README · PAD · SKILL · the plan v2.18.0 · worklog ·
  session_25). Environment rebuilt: bun install, `.env` from
  `.env.example` (`DATABASE_URL="file:../db/custom.db"`), db:push +
  db:seed — census MATCH. Playwright chromium 1254 reinstalled.
- Cold-baseline gate BEFORE any edit: lint 0/0 · tsc 0 · 961/961 unit ·
  build · smoke 14/14 · 108/108 e2e · census MATCH — the documented
  v2.18.0 state exactly. `bun audit`: unchanged (1 moderate minimatch,
  dev-chain).
- Standing deliverables verified: the .env/db contract · .env.example
  parity · sitemap/robots/manifest (smoke leg 12) · the vitest +
  playwright configs · the Tailwind v4 sweep (zero phantom breakpoints,
  zero inert tokens).
- Reference drift probe: STABLE on all four standing layers (bundle
  fingerprint · ZERO demo census · 256/9 desktop sidebar · the TRUE-390
  functional mobile menu — opens with 9 destinations; the owner's named
  focus verified live again).

## The audit (three parallel Mode-C passes)

**0 Critical / 5 Medium / 8 Low / ~12 Informational** raw; every
material claim re-verified at file:line; the headline live-reproduced
under TZ-switching probes on both zone edges + the year boundary:

- **F-222a (Medium)**: the R-18 `UTC_DESIGNATED` regex is
  case-sensitive — RFC-3339-legal lowercase `z` falls to the locale
  branch: New York `2026-11-01T01:30:00z` → 2026-10-31, Tokyo
  `2026-11-01T18:30:00z` → Nov 2, the Tokyo year boundary → 2027-01-01.
- **F-222b (Medium)**: non-UTC offsets stage the VIEWER's calendar date
  — `+09:00` in New York → Oct 31, `-05:00` in Tokyo → Nov 2, the year
  boundary → 2027-01-01: the identical file imports different books for
  different users.
- **F-222c/d (Low)**: partial ISO forms (`2026`, `2026-11`) silently
  stage a rolled day west of UTC; the rollover guard covered the bare
  branch only (`02/30/2026` staged Mar 2).
- **F-222e/f/g (Medium)**: the import-preview income ink has no dark
  arm (3.15:1); the 404 + segment-error faces render light-only under
  the dark default (the reference's SPA serves its 404 INSIDE the dark
  shell — dark arms are the parity-correct genus); the hand-rolled
  interactives (PeriodSegment · toast ✕ · app-shell Try-again · the
  auth face's Google/footer/back/resend · the Expenses chips) carry no
  house focus ring.
- **F-222h–k (Low)**: DIALOG_CLOSE's hover degrades in dark (2.47:1);
  the recharts tooltips stay light-locked while the axes flip; the
  accounts red pair; the tabs/badge latent arms.
- **F-222l/m (Low)**: the busy rider's last two surfaces (the Expenses
  row-delete; the Settings budget-delete, which also discarded its
  result); the import skip copy.
- **F-222n (Medium)**: login/forgot carry no per-account bucket — the
  default proxy posture (unset `NEO_PROXY_HOPS`) keys clientKey on
  client-suppliable XFF/x-real-ip, so a header-rotating caller voids
  every per-IP cap on a direct-exposure deploy.
- **F-222o (Low)**: the `[id]` mutations' vanish race answers INTERNAL,
  not NOT_FOUND.
- **F-222p (Informational)**: the recorded-not-cured tail (the
  family-GET posture, the security Info-tier residuals).

## R-19 executed (TDD — pins born RED, cures, GREEN)

- **The zone-designator completion**: the designated branch widens to
  every zone-designated ISO datetime (`[Zz]`, ±HH:MM/±HHMM) and stages
  the WRITTEN date literal — the offset's own wall-clock date, never
  the viewer's (for Z-forms observationally identical to the R-18 cure,
  so those pins stand); the partial-ISO rejection (null — a skip beats
  an invented day); the rollover guard extends to every literal-staging
  branch; the whole-string V8-parity check (an invalid TIME invalidates
  the cell).
- **The focus-affordance family**: the house ring on the shared
  constants (the amber genus on the auth face).
- **The perceivable tail**: the import ink's dark arm; the 404/error
  dark arms; DIALOG_CLOSE's dark hover; the tooltip isDark completion
  on all three chart pages (9 Tooltip sites); the accounts red pair;
  the tabs/badge latent arms + the `--color-neutral-800` @theme pin.
- **The security hardening**: email-keyed per-account secondary buckets
  (login-acct 30/15, forgot-acct 20/15 — above the IP caps, before the
  lookups, no enumeration oracle; a rotating-XFF e2e leg proves the
  bound); the `isRecordNotFound` P2025 seam across all ten `[id]`
  mutation catches.
- **The interaction tail**: the two busy riders; the skip copy; the
  a11y scrollThrough extension to the five anon legs.

## Verification

- Full gate: lint 0/0 · tsc 0 · **1005/1005 unit** (67 files, +44) ·
  build · smoke 14/14 · **110/110 e2e** (+2: the dark-404 leg, the
  rotating-XFF per-account bound).
- All six parity drift gates CLEAN (the four sweep classes · the
  fullpage sweep · the interior census at 0-event margin).
- Census MATCH before/after every run; audit unchanged.
- Five capture faces committed (docs/screenshots/98–102), each asserted
  in-DOM: the dark 404 wash; the dark import ink + the lowercase-z and
  offset staging + the partial-ISO skip; the dark chart tooltip panel;
  the keyboard-focused Google ring; the TRUE-390 mobile drawer.

## Docs lockstep & delivery

The plan → v2.19.0 (header · F-222 ledger · R-19 Done · the §5
execution row) · README (badge 1115, counts, the status row) · AGENTS
(counts + the zone-designator gotcha) · CLAUDE (the gate contract) ·
PAD (the v2.19.0 revision block) · SKILL (counts) · docs-counts GREEN.
Three atomic commits on main; the SSH-wrapper push with the remote ref
verified post-push; the key shredded.
