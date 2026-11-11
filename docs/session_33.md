# Session 33 — repo session 225 (R-22): the designated-tail completion and tooling-hygiene round

The owner re-sent the standing directive after pushing the R-21 record
pair (docs/session_31.md + session_32.md — "update session log"). Per
the recorded rhythm, this session defaulted to findings-led iteration:
refresh, re-audit, remediate, verify, capture, document, commit, push.

## Intake — and the census that wasn't

`git pull` brought in the owner's two session-log commits (1e6af21).
The workspace stood intact: node_modules, `.env`/`.env.example` both at
`DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root,
chromium 1254, a clean tree. The cold-baseline gate ran green exactly
as the v2.21.0 ship state documented — lint 0/0 · tsc 0 · 1060/1060
unit (71 files) · build · smoke 15/15 · 122/122 e2e — until the
census: **MISMATCH, users expected 1, found 2.**

The decode: the R-21 capture set's face 115 (the verify first-rung
answer) needs a fresh signup, and it signed the scratch account up
against the DEV database. The reseed's deletes are owner-scoped, so
the scratch user survives `db:seed` forever — and the R-21 session had
verified its "census MATCH" BEFORE the capture set ran. The shipped
state carried the breakage silently; the census is the tripwire. A
reseed restored the contract (the grep confirmed the class spans
captures-218/219/224 — every capture set since session 218 that needed
a fresh signup). Ledgered as F-225e; the structural cure came later in
the round.

The six parity drift gates ran CLEAN at 0-event margin with the census
MATCH; `bun audit` unchanged (1 moderate, dev-chain); the neo-crm
reference re-checked — no new upstream commits, nothing to port.

## The fresh-eyes audit

Three parallel Mode-C passes (the R-21 cure surfaces · the
API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 1 High standing (the F-217m in-band-delivery owner-ask
re-confirmed, NOT reopened) / 5 Medium / 8 Low / 9 Informational**
raw. Per the house pattern, the driving session re-verified every
material claim at file:line before the ledger:

- The two csv claims live-probed under TZ switching across three zones
  (a committed probe, scripts/probe-225-csv.ts): the numeric
  year-month partials ("2026/11" / "2026.11" / "2026 11" / "2026/1")
  stage the invented day 1 while the hyphen partials null — the exact
  statement-period shape the month-year family's own rationale cites;
  and the designated tails the R-19 taxonomy missed (" UTC"/" GMT"
  named tails, a space before the offset) stage the VIEWER's calendar
  — New York reads "Nov 1, 2026 UTC" as 2026-10-31 (a wrong day) and
  "Jan 1, 2026 UTC" as 2025-12-31 (a wrong day AND year) while Tokyo
  stages the written day: the identical file imports different books
  for different users.
- The skip-link paint order live-reproduced against the real dev
  server (scripts/probe-225-skip.ts): the focused link IS focused, its
  reveal box sits at 8,8 — and `elementFromPoint` at its center
  returns the mobile header's wordmark at 390 while the link itself
  answers at 1280. Both z-50 in the same stacking context; the header
  is later in DOM and wins the paint order. The e2e leg ran 1280-only
  and axe cannot model paint order — which is why 122/122 stayed
  green. A paint defect, not a functional one (Enter lands
  #main-content at both widths).

## The plan and the TDD execution

The remediation plan v2.22.0 written (22 F-225 ledger rows + the R-22
section with the settled design decisions) and validated against the
tree before execution. The V8 design probes ran BEFORE the
implementation (18 designated forms — every one parseable; the
whole-parse guard holds; the rolled ones roll, the unknown names NaN).

The pins born RED: 9 csv tests, 19 parity-225 source pins, 4 e2e legs
(the 390 topmost skip link; the verify-acct 61-probe rotating leg; the
resend-acct 11-probe rotating leg; the search strip end-to-end). One
legitimate mid-flight recalibration: the parity-222 designator pin —
the contract grew (the F-224a lesson's own doctrine).

The cures: **the numeric year-month partial null-arm** (`$`-anchored so
the three-group forms keep staging; non-letter separators so named
forms never ride a numeric arm); **the designated-tail family** (the
ISO arm tolerates `\s*` before the designator and the UTC/GMT named
tails; the named MDY, day-first named, and numeric designated arms —
4-digit years, month-names mapped, shape by the a≥1000 convention,
whole-parse-guarded through V8, round-trip-guarded — stage the WRITTEN
calendar; the two-digit-year designated numerics SKIP: the remap
boundary is engine-internal, a visible skip beats a silent wrong day);
**the verify/resend email-keyed buckets** (verify-acct 60/15,
resend-acct 10/15 — sized above the IP caps so single-IP flows are
unchanged, fired after the Zod parse and before any account-existence
check; the rotating-XFF e2e legs mirror the F-222n pattern); **the
skip link's z-[60]** (clearing the z-50 header/drawer/dialog family,
staying under the toasts); **the capture family's own-database
retrofit** (db/captures.db recreated + seeded per run; the spawned
server carries the override explicitly; a census tripwire at exit; a
server already on :3000 is a REFUSAL, not a reuse — a reused server's
database is unknowable); **the hygiene tail** (the search docblock's
delivered truth; the two-digit rolled residual pinned; the route-level
search leg; the uploads GET's 240/15 bucket; the global-error `<main>`;
the six decorative icons aria-hidden; the destructive-ink
measured-value citation; the shell re-indent + the dead
focus:outline-none retirement).

## The verification

The full offline gate: **lint 0/0 · tsc 0 · 1088/1088 unit (72 files)
· build · smoke 15/15 · 126/126 e2e** — the four new legs green (the
verify-acct leg capped the 61st probe, the resend-acct leg the 11th,
the search leg proved q="%" empty / q="Whole" populated, the 390 leg
proved the focused link topmost). ALL SIX parity drift gates CLEAN at
0-event margin (no baseline re-derivation — the cures visually inert
by construction); census MATCH; `bun audit` unchanged.

The F-225e retrofit was live-verified end-to-end, not just pinned:
captures-218 ran clean on the convention — db/captures.db seeded, the
server booted on it, all six historical faces green (no bit-rot), the
census tripwire MATCHed at exit, custom.db untouched (the regenerated
working-tree PNGs were discarded; the committed evidence stands).

The capture set 117-118 (scripts/captures-225.ts, born on the
own-database convention): **117** the skip link focused at 390,
topmost at its own center (elementFromPoint === self; Enter lands
#main-content); **118** the import preview in America/New_York —
"Nov 1, 2026 10:00 +09:00" and "2026/11/01 UTC" stage Nov 1
(pre-cure in New York: Oct 31 wrong-day and a zone-split skip) while
the numeric partial "2026/11" skips (pre-cure: the invented Nov 1) —
exactly the two designated rows preview.

## The lockstep and the delivery

docs-counts 1060→1088 / 71→72 / 122→126 / the badge 1182→1214 / the
pins row 43→44 with parity-225; README (badge, stack, hierarchy,
testing, the program row's R-22 summary); AGENTS (counts + the two
R-22 gotchas: the capture-db doctrine, the equal-z paint order);
CLAUDE (the gate contract); PAD (the v2.22.0 revision block + the
live sites); SKILL (counts); the plan closed (R-22 → Done, the §5
execution row); this record.

R-22 is shipped and verified. No open R-item; the recorded-not-cured
tail stays documented in the plan and the worklog. Next session
defaults to findings-led iteration — re-send the standing directive
and it will refresh, re-audit, and continue the rhythm.
