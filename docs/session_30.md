# Session 30 — repo session 224 (R-21): the date-guard completion and resilience-surface round

Continuing from the interrupted session (the context ran out mid-e2e; all
R-21 work was saved on disk uncommitted). This session resumed at the
re-verification step, then carried the round through the drift gates, the
captures, the docs lockstep, and the delivery.

## Resuming — verifying the on-disk state

The workspace survived the reset. `git status`: 34 modified + 4 new paths,
all on `main` at d8098e6, exactly the uncommitted R-21 state. The two e2e
leg fixes saved just before the interruption were confirmed in place (the
logout-replay leg's JSON content-type; the skip-link leg's 1×1 sr-only box
assertions). The environment stood: `.env` + `.env.example` both at
`DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root (custom /
e2e / smoke dbs), the prisma 7 datasource contract, the build current with
the source tree (BUILD_ID newer than every src file).

## The e2e re-run — and the order-poisoning discovery

The re-run failed: 122 tests planned, the a11y + auth + data-import specs
passed, then EVERY mobile-navigation leg failed with 45s timeouts — the page
snapshot showed the LOGIN page: the shared demo session was dead. The
isolation run (mobile-navigation alone) passed 16/16 — order poisoning, not
an app break.

Root cause, traced to the source: the F-224d logout-replay leg (auth.spec,
the previous session's new leg) minted the DEMO account and logged out —
and `POST /api/auth/logout` increments the USER's `tokenVersion`
(F-223k's multi-device eviction). The shared `auth.setup` storageState
cookie embeds the pre-bump version and died at every later spec's
`getSessionUser` comparison. The previous run had masked this: the leg
failed at the 415 content-type gate, so the logout never EXECUTED; the
content-type fix let it run — and poison. The verify route was ruled out
(it only READS tokenVersion for the session cookie).

The fix: the leg rewritten onto a SCRATCH user (signup → verify → login →
capture → logout → replay), the data-import doctrine — the pin is
user-agnostic, and no demo-account logout can ever again evict the shared
state. The poisoning rationale documented in the leg's comment block; the
lesson recorded in AGENTS.md's gotchas and the plan's §5 row.

Suite re-run: **122/122 (2.4m)**.

## The full gate ladder (the gate:full composition, in segments)

The detached nohup run was reaped by the sandbox (background processes do
not survive between tool calls) — the ladder ran as explicit segments:
lint 0/0 · tsc 0 · unit **1060/1060 (71 files)** · build · smoke **15/15**
(leg 15: rounded-full's infinity radius) · e2e **122/122** on the fresh
build.

## The six parity drift gates + census

- sweep 1440×900 — CLEAN (margin 0.5pct; 2m38s)
- sweep 390×844 — CLEAN (the mobile-nav width, the owner's named focus)
- sweep 768×1024 — CLEAN
- sweep 1024×768 — CLEAN
- fullpage sweep — CLEAN (all 11 pages within baseline + margin)
- interior census — CLEAN (0-event margin)
- `db:census` — MATCH (77 / 4 / 3 / 6 / 5 / 7, users=1)

## The capture set (111-116)

`scripts/captures-224.ts` written on the captures-223 pattern, extended
with the sweep's boot-or-reuse dev-server convention (the
platform-DATABASE_URL guard, killed in the finally block). Six faces, each
asserted in-DOM before the shot, all above the 30KB blank-guard:

- 111 the import date-guard preview — "2026 Nov 15 10:00" stages Nov 15
  (the day-carrying reversed twin KEEPS staging); the rolled YMD
  "2026/02/30 10:00" and the reversed no-day "2026 Nov 10:00" skip
- 112 the skip link revealed on the first Tab (pre-focus 1×1 sr-only box →
  a real box, focus ON it)
- 113 the phone 390 DARK Dashboard (html.dark asserted)
- 114 the phone 390 DARK Expenses with the seeded corpus
- 115 the verify first-rung (a scratch account's first wrong code answers
  "Invalid verification code. 4 attempts remaining.")
- 116 the drawer Sign Out's login wall (no loading gate)

The honest-set exclusions: the F-224j search strip has no UI consumer
(/api/search is API-only — the pins carry it); global-error.tsx is
reachable only on a hard crash (the dark arms unit-pinned); the password
max is schema-level (.max(200)), not a DOM face; no app surface renders the
destructive dropdown (the danger-soft flip is token-level).

## The docs lockstep

- docs-counts constants 1060 / 122 / 15 / 71; the pins row 42→43 with
  parity-224; TWO new site pins — the §7.1 E2E row (stale 99) and the
  ADR-006 e2e count (stale 88), live-tense sites no pin had watched; the
  CLAUDE smoke line joined the pin family
- README: badge 1140→1182, the stack/hierarchy/testing/status rows, the
  remediation-program row → the R-21 summary prepended
- AGENTS: the command-table counts + four new gotchas (the @source
  three-way family, the order-poisoning signature, the rounded-full radius)
- CLAUDE: the gate contract + the smoke line
- PAD: the v2.21.0 revision block, the §7.1 table (71/1060, 43 pins,
  25 infrastructure, 122 e2e, 15 smoke), ADR-006, §7.4, §10's closing line
- wealth-os_SKILL.md: header + stack + commands + pre-ship checklist
- the plan closed: R-21 → Done(v2.21.0), the §5 execution row, the closing
  pointer → session 225
- worklog.md: the session-224 entry

## The delivery

The atomic commits on main; the SSH-wrapper push with the remote ref
verified post-push; the key shredded.

## The shipped state

v2.21.0 · lint 0/0 · tsc 0 · **1060 unit (71 files)** · build · smoke
**15/15** · **122 e2e (7 specs)** · all six parity drift gates CLEAN ·
census MATCH · `bun audit` unchanged · no open R-item — the next session
defaults to findings-led iteration.
