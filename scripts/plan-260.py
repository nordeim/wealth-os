#!/usr/bin/env python3
# Session-260 (R-57) plan writer: the version header, the §2.18 audit
# ledger, the R-57 section, and the §5 execution-history row — each edit
# asserted (the docs-243 scoping doctrine: every replacement asserts the
# OLD form inside its slice before writing).
import re, sys

PATH = "docs/remediation_plan_v2.md"
src = open(PATH, encoding="utf-8").read()
orig = src

# ---- 1. the version header: insert v2.57.0 above, demote v2.56.0 ---------
cur = "> **Current version: v2.56.0** (session 259 — the"
assert src.count(cur) == 1, "v2.56.0 current-version anchor not unique"
NEW_HEADER = """> **Current version: v2.57.0** (session 260 — the
afternoon-label and register-truing round R-57: the owner's standing
directive re-sent after the R-56 ship pair (b10aa7dc + the owner's
992e4b44 session-log update carrying docs/session_101.md, the
session-259 record, and docs/session_102.md, the transcript capture).
Per the recorded rhythm, this session defaulted to findings-led
iteration: refresh, re-audit, remediate, verify, capture, document,
commit, push — with the operator's named asks (the mobile navigation
comparison, the Tailwind v4 state, the .env/db contract, the
vitest/playwright configs, the sitemap/SEO surface, the .env.example,
the screenshots, the SSH-wrapper push) re-verified along the way. The
intake: the workspace RE-CLONED from cold (the sandbox reset left the
clone directory empty) to HEAD 992e4b44 (the R-56 ship b10aa7dc + the
owner's session-log update; tree clean); the environment rebuilt from
cold (bun install — also regenerating the prisma client into
src/generated/prisma · a fresh .env on the
DATABASE_URL="file:../db/custom.db" contract with a fresh openssl
AUTH_SECRET · db:push · db:seed · playwright chromium install), db/
at the repo root, and the census MATCH (80/4/3/6/5/7, users=1). The
cold baseline gate ran GREEN — the v2.56.0 ship state reproduced
exactly, no discovery: lint 0/0 · tsc 0 · 1779/1779 unit (111 files)
· build (the 4 documented Turbopack tracing warnings) · smoke 15/15
· 152/152 e2e · census MATCH. The standing asks: probe:ref STABLE on
every layer (the bundle md5 6d3779af… unchanged, the F-250q stylesheet
fingerprint 96f24d45… unchanged, the demo data zero, the desktop nav
256/9, the TRUE-390 menu census standing); THE MOBILE-NAVIGATION
COMPARISON re-run through agent-browser at TRUE 390×844 on BOTH sides
(the viewport verified by computed innerWidth; the reference: 9
destinations + Sign Out, closes on the X toggle, zero visible nav
links after the close; OURS — the production artifact on a scratch
db per the session-253 toolchain note — the identical destinations +
Sign Out via the labeled hamburger, the aria-expanded flip
Open→Close navigation menu verified on open AND close, zero visible
nav links after the close — parity plus the documented superset, NO
Tailwind v4 regression; both comparison captures re-saved PNG-valid
at the true viewport); `bun audit` unchanged (1 moderate dev-chain
minimatch, the documented deferral); neo-crm unchanged (b3d0fbe) —
nothing to port; the SEO surface verified (smoke leg 12: sitemap +
robots + manifest 200); the .env contract + the db/ at the repo root
+ the vitest/playwright configs + the .env.example six-knob set all
standing. The session-260 fresh-eyes audit (three Mode-C passes: the
R-56 cure surfaces driven by the session — the parity-259 battery
re-run green 17/17 at HEAD · the API/auth/security layer — the
THIRTEENTH consecutive clean bill (all ten house contracts, all 45
exported handlers across 30 route files, the counts confirmed
exactly) · the UI/a11y/shell layer — clean on every named contract
(the shell family, the theme system, the Tailwind v4 token
discipline, the store, the route twins, the metadata family all
holding; the date doctrine's residual is the round's finding)): 0
Critical / 0 High / 1 Medium / 0 Low / 0 Informational NEW after
dedup, every material claim re-verified at file:line by the driving
session — whose whole-tree fixed-24h sweep bounded the genus at
exactly one uncured site and whose two-zone arithmetic reproduction
confirmed the defect live on ordinary days (the morning-run gates
the blindness: every pre-noon ref computes correctly). THE ROUND'S
FINDING: **F-260a the relativeDays afternoon mislabel** — the
visible day-label seam still divides a millisecond span by a fixed
24h and rounds, so any ref after local noon crosses the half-day
threshold and mislabels the whole ±1-day band on ORDINARY days (a
today-dated row renders "Yesterday", a tomorrow-dated row "Today",
a yesterday-dated row "2 days ago" — verified by code in both the
UTC sandbox and America/New_York on non-DST dates; three
user-visible consumers: the dashboard's Upcoming label, the Recent
Activity label, the income page's next-payment label; the R-56
cure's unmigrated sibling — F-259b/F-259c retired the fixed-24h
genus from the analytics pad and the daysAway count but left the
VISIBLE-label seam; the sort key (calendar-correct daysAway) and the
rendered label can now disagree after noon — the F-259c split
inverted; zero test coverage, no e2e asserts the labels). Plus the
**register truing**: §2.17's F-259c exoneration clause ("the
Math.round form whose ±1h DST shift never crosses its rounding
threshold") is stale as written — the ±1h DST assessment missed
that ordinary afternoon time-of-day crosses the threshold DAILY;
the clause trues in the same commit (the label was never safe in
the afternoon band; F-260a is the proof). The plan v2.57.0 written
and validated against the tree (the genus sweep: exactly one
uncured site — finance.ts:757; SESSION_TTL is absolute-span
semantics, correct by construction; calendarDaysBetween's own
ordinal division is the UTC-parts form). **R-57.1** the pins born
RED (the parity-260 battery — the seam-shape leg, the six
TZ-switched behavioral legs over the verified defect forms and
their morning equivalences, the genus census leg, the
register-truing leg) → **R-57.2** the cure (relativeDays derives
its day count through the R-56 calendarDaysBetween helper — the
UTC-parts calendar-day difference, DST-free AND time-of-day-free by
construction; the Today/Tomorrow/Yesterday/in-N-days/N-days-ago
formatting unchanged) → **R-57.3** the verification (parity-260
GREEN · lint 0/0 · tsc 0 · the unit suite at the new count · build
· smoke 15/15 · 152 e2e · census MATCH · the captures — the
afternoon-label live proof + the standing drawer face + the two
comparison captures at TRUE 390×844; the six parity drift gates per
the session-253 precedent — the cures touch no baseline-carried
parity surface: the sweeps compare computed classes, the label text
is content not class).

"""
src = src.replace(cur, NEW_HEADER + cur, 1)
print("plan-260: version header written (v2.57.0 above v2.56.0)")

# ---- 2. the §2.18 ledger (before §3) --------------------------------------
SEC3 = "## 3. The remediation program (R-items)"
assert src.count(SEC3) == 1, "§3 heading not unique"
LEDGER = """### 2.18 Session-260 audit ledger (the fresh-eyes round over the v2.56.0 ship state)

Three Mode-C passes (the R-56 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer); every
material claim re-verified at file:line by the driving session
before planning (the parity-259 battery re-run green 17/17 at HEAD;
the whole-tree fixed-24h sweep bounded the genus at exactly ONE
uncured site — the SESSION_TTL absolute span and the
calendarDaysBetween ordinal division are correct by construction;
the two-zone arithmetic reproduction confirmed the defect live on
ordinary, non-DST days in both the UTC sandbox and
America/New_York). NEW after dedup: 0 Critical / 0 High /
1 Medium / 0 Low / 0 Informational.

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-260a | Medium | **THE VISIBLE DAY-LABEL SEAM STILL DIVIDES BY A FIXED 24H — every afternoon ref mislabels the whole ±1-day band on ordinary days.** The relativeDays construction is `Math.round((date.getTime() - ref.getTime()) / 86_400_000)`; stored dates re-anchor to LOCAL MIDNIGHT through toDate while ref is a render-time clock carrying a time of day, so the round threshold sits at a HALF DAY — any ref after local noon crosses it (Math.round rounds ±0.5 to the away-from-zero side, so a −12.5h span reads −1 and a +11.5h span reads 0). Verified by code on non-DST dates in both the UTC sandbox and America/New_York: a row dated TODAY with a 12:30 ref renders "Yesterday" (calendar 0); a row due TOMORROW renders "Today" (calendar 1); a row dated YESTERDAY renders "2 days ago" (calendar −1); the same inputs at 09:00 render correctly — the morning-run blindness that kept every gate green. THREE user-visible consumers: the dashboard's Upcoming label (`Due {relativeDays(item.nextDate, now)}`), the Recent Activity label (`{row.category} · {relativeDays(row.date, now)}`), and the income page's next-payment label (`· next {relativeDays(toDate(source.nextPaymentDate), new Date())}`) — the R-56 cure's unmigrated sibling: F-259b/F-259c retired the fixed-24h genus from the analytics end-pad and the daysAway count but left the VISIBLE-label seam; the Upcoming sort key (the calendar-correct daysAway) and its rendered label can now DISAGREE after noon — the F-259c split inverted (sorted as 1 day away, displayed "Today"). Zero test coverage (no pin in any suite mentions the seam); no e2e leg asserts the label strings; the whole-tree sweep bounds the genus at exactly one uncured site. | `src/lib/finance.ts:757` (relativeDays; consumers at `src/app/(app)/dashboard/page.tsx:460,507`, `src/app/(app)/income/page.tsx:175`) | **cured in R-57** (the day count derives through the R-56 calendarDaysBetween helper — the UTC-parts calendar-day difference, DST-free AND time-of-day-free by construction; the label formatting unchanged; pinned by the parity-260 TZ-switched behavioral legs over the verified defect forms) |

The register truing (text-only, same commit): §2.17's F-259c row
carries the exoneration "the rendered label rides relativeDays, the
Math.round form whose ±1h DST shift never crosses its rounding
threshold" — STALE AS WRITTEN: the ±1h DST assessment missed that
ordinary afternoon time-of-day crosses the half-day threshold DAILY
(the exoneration was false in the afternoon band; F-260a is the
proof). The clause trues to name the afternoon genus explicitly.

Recorded, not cured: the sidebar wordmark h2 precedes the page h1
in DOM order across aside→main (the reference's own live-extracted
construction, NAV_LAYOUT-pinned; axe's heading-order rule flags
upward skips only — the two-gate passes all nine sections at both
viewports; an observation, no action), F-257a and F-257r (the
standing registers, plan §2.15), the ai-coach `history` caution
(folded into the R-5 register — the LLM provider's wiring must
treat the field as client-supplied untrusted input), plus the
standing families (F-252k, F-251i-k, F-250h-p, F-249j-n, F-248h-n,
F-247g-l, F-246g/h, F-245g/h, F-244i-n, F-242h/i, F-240k-n,
F-239l-s — plan §2.12's register), plus the toolchain note (the
agent-browser/HeadlessChrome-157 dev-build hydration gap — session
253; re-confirmed this session: the clone-side comparison rode the
production artifact cleanly).

"""
src = src.replace(SEC3, LEDGER + SEC3, 1)
print("plan-260: §2.18 ledger written (before §3)")

# ---- 3. the R-57 section (above R-56) --------------------------------------
R56 = "### R-56 — The bound-message, DST-day, and census-prose round (session 259)"
assert src.count(R56) == 1, "R-56 heading not unique"
R57 = """### R-57 — The afternoon-label and register-truing round (session 260)

The operator re-sent the standing directive after the R-56 ship pair
(b10aa7dc + the owner's 992e4b44 session-log update carrying
docs/session_101.md, the session-259 record, and docs/session_102.md,
the transcript capture). Per the recorded rhythm, findings-led
iteration. The intake and the standing layers are recorded in the
version header above; this section carries the findings, the cures,
and the verification contract.

**The finding (verified at file:line by the driving session — the
arithmetic reproduced by code on non-DST dates in two zones; the
genus bounded by the whole-tree sweep):** F-260a the relativeDays
afternoon mislabel — the visible day-label seam still divides a
millisecond span by a fixed 24h and rounds; any ref after local
noon crosses the half-day threshold and mislabels the whole ±1-day
band on ordinary days (a today-dated row renders "Yesterday", a
tomorrow-dated row "Today", a yesterday-dated row "2 days ago";
three user-visible consumers — the Upcoming label, the Recent
Activity label, the income next-payment label; the R-56 cure's
unmapped sibling; the sort key and the rendered label can disagree
after noon; zero test coverage, no e2e asserts the labels). Plus
the register truing: §2.17's F-259c exoneration clause is stale as
written (the ±1h DST assessment missed the daily afternoon
crossing).

**The cure (R-57.2):** the relativeDays day count derives through
the R-56 calendarDaysBetween helper (the UTC-parts calendar-day
difference — DST-free AND time-of-day-free by construction; the
Date parts it reads are the LOCAL calendar fields, so the day count
is the calendar truth regardless of the ref's time of day or the
zone's DST state); the Today/Tomorrow/Yesterday/in-N-days/
N-days-ago formatting arms unchanged; the docblock documents the
afternoon genus it retired (describing with spaces per the F-229d
discipline). The register clause trues in the same commit.

**The verification contract (R-57.3):** the parity-260 battery born
honest RED against the pre-cure tree (the seam-shape leg + the six
TZ-switched behavioral legs over the verified defect forms and
their morning equivalences + the genus census leg + the
register-truing leg) → the cure → parity-260 GREEN → lint 0/0 ·
tsc 0 · the unit suite at the new count · build · smoke 15/15 · the
FULL e2e battery 152/152 · census MATCH · the captures (the
afternoon-label live proof — the Recent Activity face rendering the
calendar-correct label under the live afternoon clock, asserted
in-flight against the seam's own output + the standing mobile
drawer at 390 with the 9-destination + Sign Out census and the
aria-expanded close flip) + the two comparison captures at TRUE
390×844 (re-saved this session at the standing names). The six
parity drift gates: the session-253 precedent applies — the cures
touch no baseline-carried parity surface (the sweeps compare
computed classes; the label text is content, not class; the
register truing is plan text only).

"""
src = src.replace(R56, R57 + R56, 1)
print("plan-260: R-57 section written (above R-56)")

# ---- 4. the §5 execution-history row at the head ---------------------------
sep = "| Version | Session | R-items executed | Gate at ship | Commit |"
assert src.count(sep) == 1, "§5 table header not unique"
ROW = """| v2.57.0 | 260 | **R-57** (the afternoon-label and register-truing round — findings-led, the standing directive with the reference STABLE on every standing drift layer and the mobile-navigation ask verified on BOTH sides at TRUE 390×844 through agent-browser (the viewport verified by computed innerWidth; the clone side riding the production artifact on a scratch db per the session-253 toolchain note — the aria-expanded flip verified on open AND close, the sheet unmounted and zero visible nav links after the close); the cold baseline GREEN at HEAD 992e4b44 — the v2.56.0 ship state reproduced exactly, no discovery). The audit round: the standing layers re-verified (probe:ref STABLE — the bundle md5, the F-250q stylesheet fingerprint, the demo data zero, the desktop nav 256/9, the TRUE-390 menu census; `bun audit` unchanged (1 moderate dev-chain minimatch, the documented deferral); neo-crm unchanged (b3d0fbe); the SEO surface verified (smoke leg 12); the .env contract + the db/ at the repo root + the vitest/playwright configs + the .env.example six-knob set all standing). The session-260 fresh-eyes audit (three Mode-C passes: the R-56 cure surfaces — the parity-259 battery re-run green 17/17 · the API/auth/security layer — the THIRTEENTH consecutive clean bill (all ten house contracts, all 45 exported handlers across 30 route files) · the UI/a11y/shell layer — clean on every named contract, ONE new finding): 0 Critical / 0 High / 1 Medium / 0 Low / 0 Informational NEW after dedup, every material claim re-verified at file:line by the driving session — whose whole-tree fixed-24h sweep bounded the genus at exactly one uncured site and whose two-zone arithmetic reproduction confirmed the defect live on ordinary days (the morning-run gates the blindness: every pre-noon ref computes correctly). THE ROUND'S FINDING: F-260a the relativeDays afternoon mislabel (the visible day-label seam divides a millisecond span by a fixed 24h — every ref after local noon crosses the half-day threshold and mislabels the whole ±1-day band on ordinary days; three user-visible consumers; the R-56 cure's unmigrated sibling; the sort key and the rendered label can disagree after noon; zero test coverage) plus the register truing (§2.17's F-259c exoneration clause stale as written — the ±1h DST assessment missed the daily afternoon crossing). The plan v2.57.0 written and validated against the tree. **R-57.1** the pins born RED (the parity-260 battery — the seam-shape leg, the six TZ-switched behavioral legs, the genus census leg, the register-truing leg) → **R-57.2** the cure (the day count derives through the R-56 calendarDaysBetween helper; the label formatting unchanged; the register clause trued) → **R-57.3** the verification (parity-260 GREEN · lint 0/0 · tsc 0 · the unit suite at the new count · build · smoke 15/15 · 152 e2e · census MATCH · the captures — the afternoon-label live proof + the standing drawer face + the two comparison captures at TRUE 390×844; the six parity drift gates per the session-253 precedent — no baseline-carried surface touched) | lint 0/0 · tsc 0 · **1789 unit (112 files, +10)** · build · smoke 15/15 · **152 e2e** · census MATCH | (this session's execution commit) |
"""
src = src.replace(sep, sep + "\n" + ROW, 1)
print("plan-260: §5 execution-history row written")

assert src != orig, "no edits applied"
open(PATH, "w", encoding="utf-8").write(src)
print("plan-260: 4 edits written (version header · §2.18 ledger · R-57 section · §5 row)")
