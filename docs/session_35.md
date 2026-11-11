# Session 35 — repo session 226 (R-23): the escape-family completion and per-casing metadata round

The owner re-sent the standing directive after the R-22 record pair
(session_33.md + session_34.md). Per the recorded rhythm, this session
defaulted to findings-led iteration: refresh, re-audit, remediate,
verify, capture, document, commit, push — with the operator's named
asks (the mobile navigation comparison, the Tailwind v4 state, the
.env/db contract, the vitest/playwright configs, the sitemap/SEO
surface, the .env.example, the screenshots, the SSH-wrapper push)
re-verified along the way.

## Intake

A fresh clone (the sandbox had reset): bun install, the .env rebuilt
from .env.example (`DATABASE_URL="file:../db/custom.db"` + a fresh
64-char AUTH_SECRET), db:push/db:seed, census MATCH, and the
chromium-1254 install the e2e battery needs. The cold-baseline gate
ran green at the exact v2.22.0 ship state — lint 0/0 · tsc 0 ·
1088/1088 unit (72 files) · build · smoke 15/15 · 126/126 e2e — with
the census the tripwire it became at R-22.

The standing asks: probe:ref STABLE on every layer (the bundle
fingerprint unchanged, the demo data zero, the desktop nav standing,
the TRUE-390 menu census standing — the reference's own mobile menu
opens with 9 destination links; our drawer's 15-leg e2e battery is
green inside the 135). The six drift gates CLEAN at 0-event margin.
`bun audit` unchanged (1 moderate dev-chain). The neo-crm upstream
check: no new commits since Nov 5 — nothing to port. The SEO surface
verified byte-exact (sitemap 9 URLs, robots, manifest).

## The fresh-eyes audit

Three parallel Mode-C passes (the R-22 cure surfaces · the
API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 0 High / 4 Medium / 8 Low / 8 Informational** raw.
The driving session re-verified every material claim before the
ledger — and two probes INVERTED audit claims:

- The csv escapes (F-226a, live-probed in three zones,
  scripts/probe-226-csv.ts): SEVEN regex-shape families the R-22
  designated-tail taxonomy missed still staged the VIEWER's calendar
  — case-insensitive utc/gmt; the RFC-822 weekday prefix ("Thu, 01
  Jan 2026 00:00:00 GMT" staged 2025-12-31 in New York — a wrong day
  AND year); separator lenience; the meridiem before the designator;
  V8's named zones ("Nov 1, 2026 8:00 PM EST" staged Nov 2,
  "Dec 31, 2026 8:00 PM EST" staged 2027-01-01); the compound
  UTC+01:00/GMT+5 tails; and the month-year family WITH a tail
  ("Nov 2026 UTC" — the invented day AND the zone shift; the
  name-year-day form "Nov 2026 15 UTC" staged Nov 14 where 15 was
  written). R-22's own docblock claimed "recorded residual: nothing"
  — false.
- The dark menu surface (F-226l, live-probed on BOTH apps,
  scripts/probe-226-menu.ts): the reference's dark user-menu panel
  measures rgb(10,10,10)/rgb(38,38,38) — the flipped token family —
  while ours rendered stone-900 literals.
- The ring-offset claim (F-226i, ADJUDICATED INVERTED,
  scripts/probe-226-ring.ts): the audit recommended retiring
  ring-offset-background from SELECT_TRIGGER/TABS_PILL per the
  neo-crm F-129c1 doctrine — but the live probe shows the REFERENCE
  ITSELF carries the class (its tab triggers compute the offset to
  its --background token, #0a0a0a in the fresh-visitor dark posture).
  Our TABS_SEGMENTED LACKED the class — the focused Analytics tab
  painted the v4 DEFAULT #fff offset: a WHITE halo under the focus
  ring on a dark page. The cure is the inverse of the claim: ADD the
  class.
- The API layer (Pass B): 31 catch sites swallow errors with zero
  server-side logging; the heavy read family ships unbounded findMany
  with single-column indexes; the uploads GET 429 drifts from the
  ERR.RATE_LIMITED family; verify/resend schemas accept non-format
  emails.
- The UI layer (Pass C): the lowercase section routes serve the ROOT
  head (title "WealthOS", canonical "/") while the reference serves
  per-casing canonicals at both casings — eight reachable URLs
  self-declare homepage duplicates; the gradient CTA/KPI contrast
  family is parity-sanctioned but unregistered; the quick-adder
  wrapper carries an inert aria-label; four surfaces' row buttons
  lack row context.

## The plan and the TDD execution

The plan v2.23.0 written (the F-226 ledger + the R-23 section) and
validated against the tree. The V8 design probes ran BEFORE the
implementation (scripts/probe-226-v8.ts): the named-zone acceptance
set (UT/EST/EDT/CST/CDT/MST/MDT/PST/PDT parse; CET/JST/BST/AEST are
V8-rejected and null through the whole-parse guard), the compound
tails, the meridiem, the weekday prefix, the separator lenience —
and the rejector-tail design hazard: a bare-offset tail on the
numeric month-year partial would make every ISO date ("2026-11-01",
read as year/11/-01-offset) match the partial rejector and null the
most common form in the seam.

The pins born RED: 12 csv escape tests (9 RED on the pre-cure tree),
34 parity-226 source pins (32 RED), the parity-225 window +
captures-225 list extensions, and 9 per-casing e2e legs. Three
legitimate mid-flight recalibrations — the parity-222 designator
pin, the parity-223 MONTH_ONLY pin, and the schemas verify/resend
message pins (contracts that grew, each with the F-226 citation).

The cures: **the designated-tail escape completion** (the `i` flag;
the named-zone set and compound suffixes in DESIGNATED_TAIL; the
weekday prefix on all three designated arms; the meridiem in
OPT_TIME; the lenient separators; the NEW name-year-day arm; the
rejection family's designated NAMED tail — never the bare offset;
ZONE_DESIGNATED's `i` flag; the false "no residual" docblock
corrected with the probed residuals); **the per-casing metadata**
(eight pass-through segment layouts exporting pageMetadata at the
lowercase routes; /Dashboard keeps the ROOT head — the reference's
own posture); **the API error logging** (the logApiError seam +
every catch site across the 30 route files + the session guard); **
the Transaction compound index** (@@index([ownerId, date])); the low
tail (the uploads 429 joins ERR.RATE_LIMITED; captures-225 joins the
pin family; the spawn-liveness check; the bucket-exhaustion record;
the TABS_SEGMENTED ring-offset ADD; the quick-adder role="group";
the row-context sr-only tail on four surfaces; MenuContent joins the
token family; the gradient-contrast exemption register — the F-224y
pattern; the ±HH comment truth; the 24:00 edge pin; the
bucket-window pin; the verify/resend email format).

## The verification

The full offline gate: **lint 0/0 · tsc 0 · 1136/1136 unit (73
files) · build · smoke 15/15 · 135/135 e2e** — the nine per-casing
legs green (each lowercase section serves its own title + canonical;
the /Dashboard bare-title control green). ALL SIX parity drift gates
CLEAN (the cures visually inert by construction: the metadata
layouts render nothing, the menu/ring changes paint only in
transient/focus states no settled capture holds, the sr-only spans
are invisible); census MATCH; `bun audit` unchanged.

The capture set 119-121 (scripts/captures-226.ts, born on the
own-database convention + the F-226g spawn-liveness check): **119**
the lowercase /income serving its own head (the title + canonical
asserted in-DOM; the /Dashboard bare-title control); **120** the
open user menu measuring the reference's dark token panel
(rgb(10,10,10)/rgb(38,38,38) asserted — pre-cure: the stone-900
literals); **121** the focused Analytics tab painting the dark ring
offset (#0e1310 asserted — pre-cure: the #fff default halo). The
census tripwire MATCHed at exit; custom.db untouched.

## The lockstep and the delivery

docs-counts 1088→1136 / 72→73 / 126→135 / the badge 1214→1271 / the
pins row 44→45 with parity-226; README (badge, testing table,
hierarchy, the R-23 program row); AGENTS (counts + three new
gotchas: the V8-probe doctrine — never claim "no residual" without
probing the engine's acceptance set; the sibling-doctrine
non-transfer — probe THIS reference before porting a retirement; the
rejector-tail hazard — enumerate what a widened tail can also
match); CLAUDE (the gate contract); PAD (the v2.23.0 revision block,
the historical rows' own counts preserved); SKILL (counts); the plan
closed (R-23 → Done, the §5 execution row); the worklog entry; this
record.

R-23 is shipped and verified. No open R-item; the recorded-not-cured
tail (the two-digit rolled residual, the V8-rejected zones, the
standing F-217m owner-ask) stays documented in the plan. Next
session defaults to findings-led iteration — re-send the standing
directive and it will refresh, re-audit, and continue the rhythm.
