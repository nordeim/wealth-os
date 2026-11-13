# Session 51 — repo session 234 (R-31): the in-flight-guard, OTP-restart, and logout-gate round

The owner re-sent the standing directive after the R-30 record pair
(docs/session_49.md + the owner's session_50.md log capture of the
session-233 round). Per the recorded rhythm, this session defaulted to
findings-led iteration: refresh, re-audit, remediate, verify, capture,
document, commit, push — with the operator's named asks (the mobile
navigation comparison, the Tailwind v4 state, the .env/db contract,
the vitest/playwright configs, the sitemap/SEO surface, the
.env.example, the screenshots, the SSH-wrapper push) re-verified along
the way.

## Intake — a green cold baseline

A fresh clone (sandbox reset); bun install; the .env rebuilt from
.env.example (the DATABASE_URL="file:../db/custom.db" contract + a
fresh 64-char AUTH_SECRET); db:push/db:seed; the census MATCH
(78/4/3/6/5/7, users=1); the chromium-1254 install the e2e battery
needs. One sandbox-specific wrinkle surfaced and was resolved: the
platform shell exports an absolute DATABASE_URL pointing at the
sandbox-root db, which the db-path seam honors as an intentional
override by design — the repo-root db (the .env contract) was
additionally pushed + seeded so the env-guarded sweep tooling rides
the contract path (the sweep family deletes the platform var per its
own F-123a1 guard).

The baseline gate was GREEN at HEAD 7fccaab — the exact v2.30.0
ship state reproduced, no cold-baseline discovery this round: lint
0/0 · tsc 0 · 1282/1282 unit (81 files) · build · smoke 15/15 ·
140/140 e2e.

The standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the demo data zero, the desktop nav 256/9, the
TRUE-390 menu census standing — the reference's own mobile menu
opens with 9 destination links). `bun audit` unchanged (1 moderate
dev-chain). The neo-crm upstream check: unchanged (b3d0fbe) —
nothing to port. The SEO surface verified (smoke leg 12: sitemap +
robots + manifest 200 on the standalone artifact). The .env
contract, the db/ at the repo root, the vitest/playwright configs,
and the .env.example six-knob set all standing.

## The fresh-eyes audit — six Lows, and the tail re-verified

Three Mode-C passes (the R-30 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 0 High / 0 Medium / 6 Low / 8 Informational** raw.
The driving session re-verified every material claim at file:line;
R-30's nine pinned cures all verified holding.

The six Lows: **the settings could-not-load guard flashed on every
hard load under real latency** (hydrate commits its loading drop
BEFORE the settings await — the guard read the one-round-trip
in-flight window as failure; invisible to every gate because
localhost coalesces the two commits into one paint); **the import
parse had no staleness or in-flight guard** (a re-pick mid-parse let
the slower extract's state land last — a wrong-review-committed
path — and the extract button sat enabled inside the parse window,
re-firing the exact re-parse the F-233e round retired); **a
full-code paste into a later box distributed from the edited box**
(the type-then-paste flow — one digit typed, the whole code pasted
after it — submitted a complete but ROTATED code that passed the
length guard and burned an attempt: the fails-safe-to-fails-
dangerous residue of the F-233a cure); **the paste/autofill path
had no browser-level pin** (the R-30 headline was covered only by
pure units and source scans — the original defect lived precisely
in the browser-event layer); **the uploads capacity walk's
per-entry size read was unguarded** (a file vanishing between the
directory read and the size read threw past the envelope — a raw
non-JSON 500 at the pre-write call site outside the route's try,
and a skipped breach-unlink at the post-write site); **the budget
Add button was the mutation family's last unguarded trigger** (a
double-click fired two POSTs and twin toasts over the idempotent
upsert).

The Informations: the logout route burning the SHARED writes
bucket before the content-type gate (the pre-parse burn genus's
seventh surface, at broader scope — the victim's every sessioned
mutation 429able for the window; uniquely reorderable at zero cost
since logout reads no body and owns no brute-force surface); the
investments delete glyph's accessible-name noise; the gradient KPI
card's cascade-dead ink token (twMerge drops it before the DOM
whenever the literal white rides the same chain — a live-source
dead carrier of the dead-utility genus the content scan cannot
see); two dead exports (the expenses dialog, the theme resolver);
two stale e2e role-attribution comments; the verify success
write's unconditional form (benign, self-healing); the
un-memoized-derivation genus beyond the Dashboard; the footer
copyright's hardcoded year (parity-constrained).

## The plan and the TDD execution

The plan v2.31.0 written (the F-234a-n ledger + the R-31 section)
and validated against the tree (the blast-radius sweep: the
logout-bucket pin survives the reorder; the uploads pins survive
the walk guard; two same-commit pin recalibrations identified —
parity-233 F-233d/F-233e — plus the parity-217 F-217k
hydrate-entry pin discovered mid-execution). The pins born RED:
19 RED + 11 green (17 parity-234 source checks + the 3-check
restart battery, two RED at the seam + one green-by-design
boundary guard). One e2e leg extension born RED with the honest
rotation failure — Digit 2 carried the wrong digit at the pre-cure
build, proven by the stash round-trip.

The cures: **the settings-fetch tri-state** (F-234a — the store's
settled flag flips in BOTH arms of the settings fetch and resets on
every hydrate/logout cycle; the page's amber reason line keys on
settled-and-missing — the in-flight window renders nothing, the
failure face unchanged); **the import parse sequence guard**
(F-234b — the monotonic parse token guards every state landing past
the read (the store's refresh-sequence genus, page-local), the
in-flight flag joins the extract button's disabled set); **the
full-code paste restart** (F-234c — an exactly-full-length edit
restarts the distribution at box 1; partial pastes keep the
from-edited-box semantics all five existing pins hold); **the OTP
paste e2e leg** (F-234d — the signup-ladder leg extends with the
whole-code delivery into a later box, the six distributed boxes +
final-box focus + the signed-in landing asserted, riding the leg's
EXISTING signup so the battery's IP budget is untouched); **the
uploads capacity-walk guard** (F-234e — vanished entries skip both
counters); **the budget-add busy guard** (F-234f — the busy rider
mirrors the sibling delete control); **the logout gate reorder**
(F-234g — the content-type gate moves above the shared writes
bucket: the cross-site burn dies at 400 un-bucketed, the
first-party JSON path rides the bucket exactly as before); the low
tail (F-234h the glyph's aria-hidden wrap; F-234i the cascade-dead
ink token retires; F-234j the dead-export retirement; F-234k the
two e2e comment re-attributions).

The recursive F-229d genus caught once more — the restart cure's
own comment coined a hyphenated distribution description that
parsed as a from-scale utility; the parity-229 whole-tree invariant
caught it and the comment was reworded (catch six, the
cure-comment edition — the AGENTS gotcha's count updated).

## The verification

The full offline gate: **lint 0/0 · tsc 0 · 1302/1302 unit (82
files, +20) · build · smoke 15/15 · 140/140 e2e** (the paste leg
extends the existing test). ALL SIX parity drift gates CLEAN at
0-event margin (the four sweep classes 1440/390/768/1024 + the
fullpage sweep + the interior census). census MATCH; `bun audit`
unchanged; docs-counts 13/13 after the lockstep.

The capture set 143-145 (scripts/captures-234.ts, on the
own-database convention + the F-226g liveness check): **143** the
mobile drawer at 390×844 with all 9 destinations + Sign Out (the
standing operator ask, asserted by link census); **144** the verify
view with one digit typed then the whole code (835844) delivered
into box 2 — the distribution restarted at box 1, every box's value
asserted against its digit, focus on the final box (F-234c);
**145** the import review standing with the Upload and Extract
button disabled — the retry-affordance contract, its disabled set
now carrying the parse in-flight flag (F-234b). The census tripwire
MATCHed at exit; custom.db untouched.

## The lockstep and the delivery

docs-counts 1282→1302 / 81→82 / the badge 1422→1442 / the pins row
52→53 with parity-234; README (the badge, the stack table, the
testing table, the hierarchy, the verification row, the R-31
program row); AGENTS (the counts + two gotcha riders: the
null-slice in-flight/failed tri-state genus; the F-229d
cure-comment edition); CLAUDE (the gate contract, the command
table, the test pyramid); PAD (the v2.31.0 revision block, the
§7.1 distribution rows, the §9/§10/ADR-006 sites); SKILL (the
counts); the plan closed (R-31 → Done, the §5 execution row); the
worklog entry; this record.

R-31 is shipped and verified. No open R-item; the recorded-not-cured
tail (F-234l the verify write's unconditional form; F-234m the
derivation genus beyond the Dashboard; F-234n the footer year; plus
the standing F-232j whole-store migration — the dedicated-round
plan, its mitigations re-verified this session — and the
F-232k/l/m/n/o + F-233l/m/n/o + F-217m/F-215m/F-210a/F-214l/
F-230b/F-230g/F-231m-r family) stays documented in the plan. Next
session defaults to findings-led iteration — re-send the standing
directive and it will refresh, re-audit, and continue the rhythm.
