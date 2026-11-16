#!/usr/bin/env python3
# Session-259 (R-56) plan writer: the version header, the §2.17 audit
# ledger, the R-56 section, and the §5 execution-history row — each edit
# asserted (the docs-243 scoping doctrine: every replacement asserts the
# OLD form inside its slice before writing).
import re, sys

PATH = "docs/remediation_plan_v2.md"
src = open(PATH, encoding="utf-8").read()
orig = src

# ---- 1. the version header: insert v2.56.0 above, demote v2.55.0 ---------
cur = "> **Current version: v2.55.0** (session 258 — the"
assert src.count(cur) == 1, "v2.55.0 current-version anchor not unique"
NEW_HEADER = """> **Current version: v2.56.0** (session 259 — the
bound-message, DST-day, and census-prose round R-56: the owner's
standing directive re-sent after the R-55 ship pair (134ced0 + the
owner's 6415372 session-log update carrying docs/session_99.md, the
session-258 record, and docs/session_100.md, the transcript capture).
Per the recorded rhythm, this session defaulted to findings-led
iteration: refresh, re-audit, remediate, verify, capture, document,
commit, push — with the operator's named asks (the mobile navigation
comparison, the Tailwind v4 state, the .env/db contract, the
vitest/playwright configs, the sitemap/SEO surface, the .env.example,
the screenshots, the SSH-wrapper push) re-verified along the way. The
intake: the workspace PULLED to HEAD 6415372 (the R-55 ship state,
tree clean); the environment rebuilt from cold (bun install — also
regenerating the prisma client into src/generated/prisma · a fresh
.env on the DATABASE_URL="file:../db/custom.db" contract with a fresh
AUTH_SECRET · db:push · db:seed · playwright chromium install) with
db/ at the repo root; the census MATCH (80/4/3/6/5/7, users=1). The
cold baseline gate GREEN — the v2.55.0 ship state reproduced exactly,
no discovery: lint 0/0 · tsc 0 · 1762/1762 unit (110 files) · build
(the 4 documented Turbopack tracing warnings) · smoke 15/15 ·
152/152 e2e · census MATCH. The standing asks: probe:ref STABLE on
every layer (the bundle md5 6d3779af… unchanged, the F-250q stylesheet
fingerprint 96f24d45… unchanged, the demo data zero, the desktop nav
256/9, the TRUE-390 menu census standing); THE MOBILE-NAVIGATION
COMPARISON re-run through agent-browser at TRUE 390×844 on BOTH sides
(the viewport verified by computed innerWidth; the reference: 9
destinations + Sign Out, closes on the X toggle, unmounted; OURS —
the production artifact on a scratch db per the session-253 toolchain
note — the identical destinations via the labeled hamburger, the
aria-expanded flip verified on open AND close, zero visible nav links
after the close — parity plus the documented superset, NO Tailwind v4
regression; both comparison captures re-saved PNG-valid at the true
viewport); `bun audit` unchanged (1 moderate dev-chain minimatch, the
documented deferral); neo-crm unchanged (b3d0fbe) — nothing to port;
the SEO surface verified (smoke leg 12: sitemap + robots + manifest
200); the .env contract + the db/ at the repo root + the
vitest/playwright configs + the .env.example six-knob set all
standing. The session-259 fresh-eyes audit (three Mode-C passes: the
R-55 cure surfaces driven by the session — the parity-258 battery
re-run green 18/18 at HEAD · the API/auth/security layer — the
TWELFTH consecutive clean bill (all ten house contracts, all 45
exported handlers across 30 route files, the counts confirmed
exactly) · the UI/a11y/shell layer — clean on every named contract
(the shell family, the theme system, the Tailwind v4 token
discipline, the store, the date doctrine, the route twins, the
metadata family — all holding)): 0 Critical / 0 High / 0 Medium /
2 Low / 2 Informational NEW after dedup, every material claim
re-verified at file:line by the driving session — whose own
whole-tree sweeps bounded each genus (the bare-bounds census exactly
six sites; the fixed-ms calendar-arithmetic genus exactly two code
sites; the scope-claim prose genus exactly one carrier) and whose
arithmetic verifications (Node, TZ-switched) confirmed both DST
defects live on three zones. THE ROUND'S GENUS PAIR: the
bound-message tail (the F-252j genus's six uncured sites) and the
FIXED-MS CALENDAR (the F-218d family's millisecond edition — two
seams that divide or pad by a fixed 24h where the calendar is not
24h: the analytics range's end-of-day pad admits the day-after rows
on every 23h spring-forward day, and the Upcoming list's day count
reads one day late through the fall-back window).)

"""
src = src.replace(cur, NEW_HEADER + cur, 1)
# demote the v2.55.0 header
assert src.count("> **Current version: v2.55.0** (session 258 — the") == 1
src = src.replace("> **Current version: v2.55.0** (session 258 — the",
                  "> **Previous version: v2.55.0** (session 258 — the", 1)

# ---- 2. the §2.17 audit ledger before §3 ----------------------------------
sec3 = "## 3. The remediation program (R-items)"
assert src.count(sec3) == 1, "§3 anchor not unique"
LEDGER = """### 2.17 Session-259 audit ledger (the fresh-eyes round over the v2.55.0 ship state)

Three Mode-C passes (the R-55 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer); every
material claim re-verified at file:line by the driving session
before planning (the parity-258 battery re-run green 18/18 at HEAD;
the six-site bare-bounds census recomputed by code — a paren-balance
walker over schemas.ts found exactly the audit's six sites and
nothing more; the fixed-ms calendar-arithmetic genus swept
tree-wide — exactly two code sites (the analytics pad and the
Upcoming day count; the SESSION_TTL absolute span and the
setDate/addMonths calendar forms are correct by construction); the
scope-claim prose census — exactly one carrier; both DST defects
verified by code under three TZ switches (America/New_York ·
Europe/Berlin · Australia/Sydney — the pad exceeds the true next
midnight on every 23h day; the day count reads one late through the
fall-back window with ref in the first hour after midnight)).
NEW after dedup: 0 Critical / 0 High / 0 Medium / 2 Low /
2 Informational.

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-259a | Informational | **THE F-252J GENUS'S UNCURED TAIL — six bare Zod bounds still surface the raw library copy through the BAD_REQUEST envelope.** F-252j (session 252, R-49.2) cured its three sites (the budget category pair, the CSV row category cap, the coach content cap) and pinned them; six sibling bounds carry no authored message, so a direct API caller exceeding them receives Zod's default English ("Too big: string must contain at most 80 character(s)" etc.) through parseBody's first-issue mapping instead of the house vocabulary. The six: the signup name cap (80), the transaction account-link cap (64, both create and update twins), the goal icon cap (40, both twins), and the coach history ARRAY cap (30 — the sibling of the round-cured per-entry content cap). First-party UI never trips them (no >80-char name field, no >64-char account id input); the whole-file census (paren-balance walker) bounds the genus at exactly six. | `src/lib/schemas.ts:64,224,270,509,530,625` (the map: parseBody's first-message arm at `src/lib/api.ts:337-342`) | **cured in R-56** (the house "must be reasonably sized" vocabulary; the parity-259 genus leg retires the family file-wide) |
| F-259b | Low | **THE ANALYTICS RANGE END-PAD ASSUMES 24-HOUR DAYS — a 23h DST spring-forward `to` day admits the day-after rows into the range.** The seam's end bound is `toDate(to).getTime() + 86_399_000` (23h 59m 59s) — a fixed-millisecond pad, not the next local midnight. On a 23h day (verified by code on America/New_York 2026-03-08, Europe/Berlin 2026-03-29, Australia/Sydney 2026-10-04) the next calendar day's local midnight sits at +23h — INSIDE the pad — so a transaction dated the day after the user's chosen end passes the filter and leaks into every inRange-derived aggregate (expenseBreakdown, spendingByDayOfWeek, categoryTrend, cashFlowSeries — month-scoped children drop cross-month leaks, same-month boundary rows do not) and the range export. One boundary day, twice a year, per timezone; the UTC sandbox is why every gate is blind (the F-218d genus's millisecond edition — the seams all re-anchor CALENDAR dates through toDate, then compare against MILLISECONDS that assume the calendar is 24h). | `src/app/(app)/analytics/page.tsx:113` (the inRange seam) | **cured in R-56** (a next-local-midnight comparison — the Date constructor's calendar arithmetic is DST-correct; the helper lives in finance.ts per the domain-math seam, pinned by a TZ-switched behavioral leg) |
| F-259c | Low | **THE UPCOMING LIST'S DAY COUNT DIVIDES BY A FIXED 24H — the fall-back window reads one day late.** The daysAway construction is `Math.ceil((next.getTime() - ref.getTime()) / 86_400_000)`; next is toDate'd local midnight but ref carries a time of day, so the division is calendar arithmetic in milliseconds — across a 25h fall-back day with ref in the first hour after midnight (verified by code: ref 2026-11-01 00:30, nextDate 2026-11-02, America/New_York) the ceil reads 2 where the calendar truth is 1, and the row renders "in 2 days" for a next-dated-tomorrow bill. Display-only, and the window is ref-within-1h-after-midnight coincident with a fall-back boundary — but the same fixed-24h genus as F-259b, one seam over. | `src/lib/finance.ts:426` (upcomingAlerts's daysAway) | **cured in R-56** (a calendar-day difference over local parts — the UTC-parts form is DST-free by construction; pinned by a TZ-switched behavioral leg on upcomingAlerts itself) |
| F-259d | Informational | **THE TOAST CENSUS PROSE CONTRADICTS ITS SOURCE-VISIBLE TWIN — "the LAST live hover:text-foreground ride in src/." while tabs.tsx:179 carries the same utility in live source.** The claim was true under the F-225l rendered-liveness definition when written (the tabs underline variant has zero call sites — the utility is scanner-live via tabs but never painted); the phrasing "in src/" now contradicts the source-visible twin the way F-258c's phantom-constant citation did. Not a dead carrier (the utility IS emitted — no rule to retire) — a prose-precision tail under the F-229d discipline. | `src/components/ui/toast.tsx:172` vs `src/components/ui/tabs.tsx:179` | **cured in R-56** (the prose claims rendered liveness explicitly and names the uncalled source twin — describe with spaces, no class citation) |

Recorded, not cured: the sidebar wordmark h2 precedes the page h1 in
DOM order across aside→main (the reference's own live-extracted
construction, NAV_LAYOUT-pinned; axe's heading-order rule flags
upward skips only — the two-gate passes all nine sections at both
viewports; an observation, no action), the driving session's own
brief-side citation error (an audit prompt named a dates module that
exists nowhere — the seam is finance.ts's toDate; no repo carrier,
recorded for citation honesty), F-257a and F-257r (the standing
registers, plan §2.15), the ai-coach `history` caution (folded into
the R-5 register — the LLM provider's wiring must treat the field as
client-supplied untrusted input), plus the standing families
(F-252k, F-251i-k, F-250h-p, F-249j-n, F-248h-n, F-247g-l,
F-246g/h, F-245g/h, F-244i-n, F-242h/i, F-240k-n, F-239l-s —
plan §2.12's register), plus the toolchain note (the
agent-browser/HeadlessChrome-157 dev-build hydration gap — session
253; re-confirmed this session: the clone-side comparison rode the
production artifact cleanly).

"""
src = src.replace(sec3, LEDGER + sec3, 1)

# ---- 3. the R-56 section before R-55 ---------------------------------------
r55 = "### R-55 — The citation-math, input-flip, and render-cap round (session 258)"
assert src.count(r55) == 1, "R-55 anchor not unique"
R56 = """### R-56 — The bound-message, DST-day, and census-prose round (session 259)

The owner re-sent the standing directive after the R-55 ship pair
(134ced0 + the owner's 6415372 session-log update carrying
docs/session_99.md, the session-258 record, and docs/session_100.md,
the transcript capture). Per the recorded rhythm, findings-led
iteration. The intake and the standing layers are recorded in the
version header above; this section carries the findings, the cures,
and the verification contract.

**The findings (all four verified at file:line by the driving
session — the two DST figures verified by code under three TZ
switches; the genera bounded by whole-tree sweeps):** F-259a the
F-252j genus's six uncured bare bounds (the signup name 80, the
transaction account-link 64 on both twins, the goal icon 40 on both
twins, the coach history array 30 — the whole-file census bounds the
family at exactly six) · F-259b the analytics range's fixed
end-of-day pad admits the day-after rows on every 23h DST
spring-forward day (three zones verified by code; the UTC sandbox is
why every gate is blind — the F-218d family's millisecond edition) ·
F-259c the Upcoming list's fixed-24h day division reads one day late
through the fall-back window with ref in the first hour after
midnight (verified by code; display-only) · F-259d the toast census
prose claims src-wide lastness for a utility its source twin still
carries (the F-229d discipline applied to the round's own prose).

**The cures (R-56.2):** the six bounds messaged with the house
vocabulary ("Name must be reasonably sized", "Account reference must
be reasonably sized" on both twins, "Icon must be reasonably sized"
on both twins, "History must be reasonably sized") · the analytics
end bound becomes the next local midnight through a new finance.ts
helper (the Date constructor's calendar arithmetic is DST-correct
where the fixed pad is not; the domain-math seam owns the helper,
the page seam calls it — the parity-227 pin's no-raw-parse contract
holds because the constructor lives in the helper) · the daysAway
construction becomes a calendar-day difference over local parts (a
second finance.ts helper — the UTC-parts form is DST-free by
construction, behavior-identical outside the DST windows) · the
toast prose claims rendered liveness explicitly and names the
uncalled tabs twin. Companion recalibrations same-commit: the
parity-252 describe framing (the F-252j trio wording gains the
widened-family note — the historical pins keep their ship-time
truth), and any pin whose slice the cures reshape.

**The verification contract (R-56.3):** the parity-259 battery born
honest RED against the pre-cure tree (one leg per cure surface — the
six message legs + the whole-file bare-bounds census genus leg + the
analytics seam-shape leg + the TZ-switched behavioral legs for both
DST cures + the toast prose leg) → the cures → parity-259 GREEN →
lint 0/0 · tsc 0 · the unit suite at the new count · build · smoke
15/15 · the FULL e2e battery 152/152 · census MATCH · the captures
(the standing mobile drawer at 390 + the round's analytics face +
the two comparison captures at TRUE 390×844). The six parity drift
gates: the session-253 precedent applies — the cures touch no
baseline-carried parity surface (the messages are API-copy, the DST
cures are pure computation seams whose row sets are identical under
the UTC runner, the toast edit is a comment) — re-run only if a
baseline leg flags.

"""
src = src.replace(r55, R56 + r55, 1)

# ---- 4. the §5 execution-history row at the head ---------------------------
sep = "| Version | Session | R-items executed | Gate at ship | Commit |\n|---|---|---|---|---|"
assert src.count(sep) == 1, "§5 table header not unique"
ROW = """| v2.56.0 | 259 | **R-56** (the bound-message, DST-day, and census-prose round — findings-led, the standing directive with the reference STABLE on every standing drift layer and the mobile-navigation ask verified on BOTH sides at TRUE 390×844 through agent-browser (the viewport verified by computed innerWidth; the clone side riding the production artifact on a scratch db per the session-253 toolchain note — the aria-expanded flip verified on open AND close, the sheet unmounted and zero visible nav links after the close); the cold baseline GREEN at HEAD 6415372 — the v2.55.0 ship state reproduced exactly, no discovery). The audit round: the standing layers re-verified (probe:ref STABLE — the bundle md5, the F-250q stylesheet fingerprint, the demo data zero, the desktop nav 256/9, the TRUE-390 menu census; `bun audit` unchanged (1 moderate dev-chain minimatch, the documented deferral); neo-crm unchanged (b3d0fbe); the SEO surface verified (smoke leg 12); the .env contract + the db/ at the repo root + the vitest/playwright configs + the .env.example six-knob set all standing). The session-259 fresh-eyes audit (three Mode-C passes: the R-55 cure surfaces — the parity-258 battery re-run green 18/18 · the API/auth/security layer — the TWELFTH consecutive clean bill (all ten house contracts, all 45 exported handlers across 30 route files) · the UI/a11y/shell layer — clean on every named contract, four NEW findings): 0 Critical / 0 High / 0 Medium / 2 Low / 2 Informational NEW after dedup, every material claim re-verified at file:line by the driving session — whose whole-tree sweeps bounded each genus and whose TZ-switched arithmetic verifications confirmed both DST defects live on three zones. THE ROUND'S GENUS PAIR: the F-252j bound-message tail (six bare Zod bounds surfacing raw library copy through BAD_REQUEST) and the FIXED-MS CALENDAR (F-259b the analytics end-pad admits the day-after rows on every 23h spring-forward day — three zones verified by code; F-259c the Upcoming day count reads one late through the fall-back window — verified by code); F-259d the toast census prose vs its source twin. The plan v2.56.0 written and validated against the tree. **R-56.1** the pins born RED (the parity-259 battery — the six message legs, the whole-file census leg, the seam-shape leg, the two TZ-switched behavioral legs, the prose leg) → **R-56.2** the cures (the six messaged bounds; the next-local-midnight helper + the analytics seam swap; the calendar-day helper + the daysAway swap; the toast prose reword) → **R-56.3** the verification (parity-259 GREEN · lint 0/0 · tsc 0 · the unit suite at the new count · build · smoke 15/15 · 152 e2e · census MATCH · the captures + the two comparison captures at TRUE 390×844; the six parity drift gates per the session-253 precedent — no baseline-carried surface touched) | lint 0/0 · tsc 0 · **1762 unit (110 files, +12)** · build · smoke 15/15 · **152 e2e** · census MATCH | (this session's execution commit) |
"""
src = src.replace(sep, sep + "\n" + ROW.rstrip("\n"), 1)

assert src != orig
open(PATH, "w", encoding="utf-8").write(src)
print("plan-259: 4 edits written (version header · §2.17 ledger · R-56 section · §5 row)")
