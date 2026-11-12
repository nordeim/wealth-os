# Session 41 — repo session 229 (R-26): the empty-state repair and dead-carrier retirement round

The owner re-sent the standing directive after the R-25 record pair
(docs/session_39.md + the owner's session_40.md log capture). Per the
recorded rhythm, this session defaulted to findings-led iteration:
refresh, re-audit, remediate, verify, capture, document, commit, push
— with the operator's named asks (the mobile navigation comparison,
the Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.

## Intake — a green cold baseline

git pull brought in the owner's session_40.md log commit (HEAD
a7975e5); the install was current, the census MATCHed (77/4/3/6/5/7,
users=1), chromium-1254 stood, and :3000 was free.

The baseline gate was GREEN at HEAD — the exact v2.25.0 ship state
reproduced, no cold-baseline discovery this round: lint 0/0 · tsc 0 ·
1192/1192 unit (75 files) · build · smoke 15/15 · 137/137 e2e.

The standing asks: probe:ref STABLE on every layer (the bundle md5
unchanged, the demo data zero, the desktop nav 256/9, the TRUE-390
menu census standing — the reference's own mobile menu opens with 9
destination links). `bun audit` unchanged (1 moderate dev-chain). The
neo-crm upstream check: unchanged since Nov 5 (b3d0fbe) — nothing to
port. The SEO surface verified (smoke leg 12: sitemap + robots +
manifest 200 on the standalone artifact). The .env contract
(`DATABASE_URL="file:../db/custom.db"`, db/ at the repo root), the
vitest/playwright configs, and the .env.example six-knob set all
standing.

## The fresh-eyes audit — and two inverted adjudications

Three Mode-C passes (the R-25 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 0 High / 1 Medium / 6 Low / 5 Informational** raw.
The driving session re-verified every material claim at file:line —
and live-probed the reference for the two adjudication calls:

- The headline Medium (F-229a): **the Analytics Income tab's empty
  state is unreachable** — the F-219r gate reads
  `incomeTrend.length === 0`, but `categoryTrend` unconditionally
  returns one zero point per month, so the gate NEVER fired and a
  zero-income viewer saw a flat all-zero chart. Live-probed: the
  reference's zero-data Income tab omits the card entirely — our
  informative-empty-state superset is the established genus; the
  predicate was wrong from birth.
- **F-229e ADJUDICATED INVERTED** (probe-229-dialog4): the
  DialogHeader docblock's S15-P3 claim ("the reference centers the
  title below sm") is FALSE — the reference's own Add-Expense title
  computes `textAlign: start` at 390. Our constant already carried
  the left-aligned genus; the docblock is corrected, no constant
  change.
- **F-229g ADJUDICATED INVERTED** (probe-229-analytics +
  probe-229-dash): the reference's DASHBOARD captions exactly
  "Expense Breakdown" and "Budget vs Actual" with "This month" while
  its ANALYTICS cards carry NO captions — our uncaptioned analytics
  cards ARE the genus; the audit's "add captions" recommendation
  would have deviated from parity. Recorded, not cured.
- The API layer (Pass B): clean beyond the ledgered Lows — the
  budgets upsert's missing P2002 race arm (F-229b, the settings
  family's pattern), the seed's local-noon instants (F-229c — the
  sole non-midnight writer; a viewer 12h+ ahead of the seeding
  server reads every seeded date one day late), the search
  Postgres-path note (F-229h), and the upload-MIME claim
  re-deriving the recorded F-222p tail (not reopened).
- The UI layer (Pass C): the dead-API surfaces (F-229f — the
  unread presetCategory prop, two zero-consumer constant maps, five
  unused format helpers with a nonexistent-test citation, the empty
  nav array), the comment-carrier family (F-229d), and the
  informational tail (the F-214l/F-228m family re-derivations,
  recorded).
- **The driving session's own finding (Pass A)**: the whole-tree
  dead-carrier scan — a built-CSS × live-code diff against the
  cold-baseline artifact — grew the audit's NINE dead tokens to
  THIRTY across 16 files (the F-228b "carriers are never only where
  the audit found them" lesson, a third time); plus the pill Tabs
  variant + cols + GRID_COLS (zero consumers — the N-66b comment's
  grid-cols claim about page-layout was factually wrong).

## The plan and the TDD execution

The plan v2.26.0 written (the F-229a–k ledger + the R-26 section)
and validated against the tree. The pins born RED: 16 parity-229
source pins, the finance `categoryTrend` design-input pin (green at
birth — the invariant that made the length gate unreachable), and
the e2e leg (RED with the honest flat-chart failure).

The cures: **the Income-tab empty-state repair** (F-229a — an
income-presence predicate over the range domain gates the card; the
e2e leg rides a pre-corpus date range on the DEMO session after the
first design hit the battery's 10/15min SIGNUP budget exactly at cap
— the F-223k login-budget lesson's signup edition); **the budgets
P2002 race arm** (F-229b — the catch retries the upsert once,
last-writer-wins); **the seed UTC-midnight staging** (F-229c —
dayOffset + both transaction loops ride Date.UTC, the dateField
identity; the reseed's census MATCH at 78, the today-edge inside the
54..108 bounds); **the dead-carrier retirement** (F-229d — ~28
comment sites reworded across 16 files, incl. the F-228b note's own
re-quote and the false N-66b claim; FOUR of the rewords themselves
birthed new carriers — accent-ink, z-60 — and the retirement notes
tripped their own pins, the recursive genus, all caught by the new
whole-tree carrier invariant); **the dialog docblock truth**
(F-229e); **the dead-API retirement** (F-229f — six surfaces incl.
the pill variant; the underline variant stays as the documented
default genus); the low tail (F-229h the search note, F-229j the
hygiene pass). Two legitimate pin recalibrations (the parity-226
pill arm retires with its constant; the docs-counts constants).

## The verification

The full offline gate: **lint 0/0 · tsc 0 · 1211/1211 unit (76
files) · build · smoke 15/15 · 138/138 e2e** (the Income empty-state
leg green). ALL SIX parity drift gates CLEAN (the four sweep classes
+ the fullpage sweep + the interior census — every cure visually
inert or error-path by construction). census MATCH; `bun audit`
unchanged. **The CSS sentinel probe**: all 30 dead selectors leave
the built stylesheet (103,673 → 100,431 bytes), every live form
stays (the md viewport, the variant animation arms, the
focus-visible ring color).

The capture set 128-130 (scripts/captures-229.ts, on the
own-database convention + the F-226g liveness check): **128** the
Analytics Income tab showing the REACHABLE "No income in range"
empty state on a pre-corpus range (asserted: the EmptyState renders
+ zero recharts surfaces; pre-cure: the flat all-zero chart); **129**
the mobile drawer open at 390×844 with all 9 destinations + Sign Out
(the standing operator ask, asserted by link census); **130** the
Add Expense dialog at 390 with its left-aligned title (asserted: the
title's computed textAlign is start — the reference's live-probed
genus). The census tripwire MATCHed at exit; custom.db untouched.

## The lockstep and the delivery

docs-counts 1192→1211 / 75→76 / 137→138 / the badge 1329→1349 /
the pins row 47→48 with parity-229; README (badge, stack, testing,
hierarchy, the verification row, the R-26 program row); AGENTS
(counts + two new gotchas: the recursive-carrier lesson — a reword
can itself birth carriers, only the whole-tree invariant net catches
them — and the signup-budget lesson); CLAUDE (the gate contract);
PAD (the v2.26.0 revision block, the live sites, the pins row);
SKILL (the counts); the plan closed (R-26 → Done, the §5 execution
row); the worklog entry; this record.

R-26 is shipped and verified. No open R-item; the recorded-not-cured
tail (the F-228f owner-tag design, the F-228m/n/o/p/q standings, the
F-227g scrypt design, the F-217m owner-ask, the F-229g/i/k records)
stays documented in the plan. Next session defaults to findings-led
iteration — re-send the standing directive and it will refresh,
re-audit, and continue the rhythm.
