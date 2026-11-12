# Session 39 — repo session 228 (R-25): the second holdings surface and hygiene round

The owner re-sent the standing directive after the R-24 record pair
(docs/session_37.md + the owner's session_38.md log capture). Per the
recorded rhythm, this session defaulted to findings-led iteration:
refresh, re-audit, remediate, verify, capture, document, commit, push
— with the operator's named asks (the mobile navigation comparison,
the Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.

## Intake — a green cold baseline

A fresh clone (the sandbox had reset): bun install, the .env rebuilt
from .env.example (`DATABASE_URL="file:../db/custom.db"` + a fresh
64-char AUTH_SECRET), db:push/db:seed, census MATCH, and the
chromium-1254 install the e2e battery needs.

The baseline gate was GREEN at HEAD b89d5b2 — the exact v2.24.0 ship
state reproduced, no cold-baseline discovery this round (the
session-227 symlink loop stays cured): lint 0/0 · tsc 0 · 1162/1162
unit (74 files) · build · smoke 15/15 · 136/136 e2e.

The standing asks: probe:ref STABLE on every layer (the bundle md5
unchanged, the demo data zero, the desktop nav standing, the TRUE-390
menu census standing — the reference's own mobile menu opens with 9
destination links; our drawer battery green inside the e2e suite).
`bun audit` unchanged (1 moderate dev-chain). The neo-crm upstream
check: no new commits since Nov 5 — nothing to port. The SEO surface
verified (smoke leg 12: sitemap + robots + manifest 200 on the
standalone artifact). The .env contract, the vitest/playwright
configs, and the .env.example six-knob set all standing.

## The fresh-eyes audit

Three parallel Mode-C passes (the R-24 cure surfaces · the
API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 0 High / 0 Medium / 7 Low / 10 Informational** raw.
The driving session re-verified every material claim before the
ledger — and the re-verification itself caught what a pass missed
(two more comment carriers in button.tsx keeping dead CSS alive
beyond the six the UI pass named).

- The API layer (Pass B): clean at every dimension — the envelope,
  the owner-scoping census, the logApiError seam, the atomic
  conditional mutations (R-24 holding at all 10 sites), the P2003
  seam, the body caps, the injection surfaces. The residue: the
  verify/resend scrypt TIMING side-channel (F-228e — the miss
  branches answer immediately while the known branches burn scrypt;
  login's own equalizer pattern never reached this pair), the
  write-only uploads surface (F-228f — zero UI consumers, nothing
  ever deletes a file, growth bounded per window but not over time),
  the Transaction.accountId FK index gap (F-228g — the SetNull
  cascade full-scans), and the informational tail (the getSessionUser
  full-row fetch, the budgets no-op divergence, the uploadsDir
  re-resolution, the scale/header ceilings).
- The UI layer (Pass C): the headline — **the Analytics Holdings
  Performance chart still keyed by SYMBOL** (F-228a), the F-227b
  genus surviving in its last surface (two same-symbol lots:
  duplicate React keys AND two bars overlapping at one X category).
  Plus the dead-token family with its comment carriers (F-228b), the
  CSV export's raw-parse identity (F-228c — correct today, but a
  future toDate "tidy" would corrupt every UTC+ export a day early),
  the upcomingAlerts id drop (F-228d), and the informational tail.
  The Tailwind v4 hazard scan CLEAN again.
- Pass A (the R-24 cure surfaces, driven by the session): all
  verified holding — the green unit suite carries the parity-227
  pins; both passes independently confirmed the holdings identity,
  the sr-only tail, and the toDate routing.

## The plan and the TDD execution

The plan v2.25.0 written (the F-228a-r ledger + the R-25 section)
and validated against the tree. The pins born RED: 19 of 20
parity-228 source pins (the 20th green-by-design — the
LIVE-members-stay pin), 6 finance behavioral pins (4 gainBySymbol +
2 upcomingAlerts id), 4 uploads-capacity seam pins on temp-dir
fixtures, and the e2e leg RED with the honest overlap failure —
Expected 7 / Received 8 bar rectangles.

The cures: **the second holdings surface** (F-228a — `gainBySymbol`
joins the finance seams; the chart renders one bar per symbol);
**the timing-equalizer family completion** (F-228e — both miss
branches burn the equalizer, the DB-write residual documented);
**the upload capacity ceiling** (F-228f + F-228i — 256 MB / 4096
files, the `uploadsCapacity` walk, the new `ERR.STORAGE_FULL()` 507
envelope member, the memoized repo root, the owner-tag design
recorded); **the schema round** (F-228g + F-227h —
`@@index([accountId])` on Transaction, `@@index([resetToken])` on
User); the low tail (F-228b the eight dead tokens retire + eleven
comment carriers reworded; F-228c the CSV Date string-slice;
F-228d the upcoming id; F-228h the getSessionUser projection;
F-228j the budgets NOT_FOUND alignment; F-228k the aria-controls
pair; F-228l the two docblocks). Two legitimate pin recalibrations
(the palette-pins F-214e row and the dark-tokens subtle-flip
assertion — contracts that legitimately shrank).

## The verification

The full offline gate: **lint 0/0 · tsc 0 · 1192/1192 unit (75
files) · build · smoke 15/15 · 137/137 e2e** — the aggregated-bar
leg green. ALL SIX parity drift gates CLEAN (the four sweep classes,
the fullpage sweep, the interior census). census MATCH; `bun audit`
unchanged. **The CSS sentinel probe**: the pre-cure built chunk
carried the five dead utilities (`.bg-popover`,
`.text-popover-foreground`, `.text-muted-foreground`,
`.focus\:bg-accent`, `.hover\:text-accent-foreground`); the post-cure
build drops all five, the live pair (`border-input`,
`hover:bg-secondary`) stays, and the stylesheet shrank 104,409 →
103,673 bytes.

The capture set 125-127 (scripts/captures-228.ts, on the
own-database convention + the F-226g liveness check): **125** the
Holdings Performance chart folding two same-symbol FOLD lots into
ONE bar (asserted: exactly 7 bar rectangles — the seeded 6 symbols +
the folded pair; pre-cure: 8); **126** the mobile drawer open at
390×844 with all 9 destinations + Sign Out (the standing operator
ask, asserted by link census); **127** the Expenses filters popover
open with the trigger's aria-controls linked to the panel id
(asserted: the attribute pair). The census tripwire MATCHed at exit;
custom.db untouched.

## The lockstep and the delivery

docs-counts 1162→1192 / 74→75 / 136→137 / the badge 1298→1329 /
the pins row 46→47 with parity-228; README (badge, stack, testing
table, hierarchy, the verification row, the R-25 program row);
AGENTS (counts + two new gotchas: the inverse-hazard tidy lesson —
a doctrine-uniformity sweep can itself be the bug; and the
whole-tree carrier grep — a dead-token retirement is only complete
when `rg "<class-string>" src/` returns nothing); CLAUDE (the gate
contract); PAD (the v2.25.0 revision block, the live sites, the
pins row); SKILL (counts); the plan closed (R-25 → Done, the §5
execution row); the worklog entry; this record.

R-25 is shipped and verified. No open R-item; the recorded-not-cured
tail (the F-228f owner-tag design, the F-228m/n/o/p/q standings,
the F-227g scrypt design, the F-217m owner-ask) stays documented in
the plan. Next session defaults to findings-led iteration — re-send
the standing directive and it will refresh, re-audit, and continue
the rhythm.
