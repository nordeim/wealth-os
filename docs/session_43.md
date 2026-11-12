# Session 43 — repo session 230 (R-27): the register-and-hygiene round

The owner re-sent the standing directive after the R-26 record pair
(docs/session_41.md + the owner's session_42.md log capture). Per the
recorded rhythm, this session defaulted to findings-led iteration:
refresh, re-audit, remediate, verify, capture, document, commit, push
— with the operator's named asks (the mobile navigation comparison,
the Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.

## Intake — a green cold baseline

A fresh clone (sandbox reset); HEAD 6231d32 (the owner's
session_42.md log commit). The install, the .env rebuilt from
.env.example, db:push/db:seed, the census MATCH (78/4/3/6/5/7,
users=1), chromium-1254, and :3000 free.

The baseline gate was GREEN at HEAD — the exact v2.26.0 ship state
reproduced, no cold-baseline discovery this round: lint 0/0 · tsc 0 ·
1211/1211 unit (76 files) · build · smoke 15/15 · 138/138 e2e.

The standing asks: probe:ref STABLE on every layer (the bundle md5
unchanged, the demo data zero, the desktop nav 256/9, the TRUE-390
menu census standing — the reference's own mobile menu opens with 9
destination links). `bun audit` unchanged (1 moderate dev-chain). The
neo-crm upstream check: unchanged (b3d0fbe) — nothing to port. The
SEO surface verified (smoke leg 12: sitemap + robots + manifest 200
on the standalone artifact). The .env contract
(`DATABASE_URL="file:../db/custom.db"`, db/ at the repo root), the
vitest/playwright configs, and the .env.example six-knob set all
standing.

## The fresh-eyes audit — and two live-probe adjudications

Three Mode-C passes (the R-26 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 0 High / 2 Medium / 4 Low / 5 Informational** raw.
The driving session re-verified every material claim at file:line —
and live-probed the reference for the two adjudication calls:

- The headline Medium (F-230a): **the analytics StatCard's sub-AA ink
  arms carry no in-surface register entry** — the F-224y WCAG
  exemption register's one uncovered surface (GradientKpiCard, the
  CTA arms, syncedPill, and brandWordmark all carry theirs; the
  page-parts register mentions this surface's emerald-100 label only
  in passing). ADJUDICATED by live probe (probe-230c): the genus is
  the REFERENCE'S OWN — its /Analytics Avg Monthly tiles measured
  emerald-100 rgb(209,250,229), red-100 rgb(254,226,226), blue-100
  rgb(219,234,254) on the identical from-X-500 to-X-600 gradients
  with white bold $0.00 values, at its standing zero demo data. The
  cure is the register entry (measured 2.24:1 / 3.08:1 / 3.01:1
  labels; the white values 2.54:1 at the emerald-500 side) — NEVER a
  recolor (the audit's "darken the label ink" recommendation was
  rejected: it would deviate from parity, the F-226i lesson class).
- The second Medium (F-230b) **ADJUDICATED INVERTED** (probe-230):
  the audit claimed the dashboard Cash Flow Overview card lacks a
  zero-data policy (every sibling wrapper declares one) and
  recommended a presence-predicate gate — but the reference's own
  dashboard, at its standing ZERO demo state, renders the card
  UNCONDITIONALLY with four recharts surfaces, flat zero axes, and
  no empty state. Our unconditional render IS the parity genus; the
  recommendation would have deviated from parity (the F-229g mistake
  class). The same probe re-confirmed the reference's OTHER
  dashboard cards carry the empty states our gates match (Expense
  Breakdown "No expenses this month", Budget vs Actual "Add budgets
  to compare", Upcoming "No upcoming payments") — the split is the
  reference's own design.
- The API layer (Pass B): clean beyond the ledgered items — its
  Medium re-derived the standing F-217m owner-ask (in-band delivery
  default, boot-warned, knob-gated — not reopened); its Lows
  re-derived F-215m (the inert role dimension; the signup admin
  TOCTOU mints at most a second display-only admin), the F-218t XFF
  default posture, and the F-224k bucket lockout trade.
- The UI layer (Pass C): the lastSyncedAt raw parse (F-230c — the
  sole raw-parse survivor at a display seam), the phantom-breakpoint
  comment quotes (F-230d — adjudicated inert as a carrier, the
  letter broken), the index-key tail (F-230e — the ai-coach message
  list; the import preview and OTP boxes adjudicated
  index-identity), the pre-auth raw fetch (F-230g — recorded
  standing), the CARD_TITLE_OVERRIDE citation (F-230f).

## The plan and the TDD execution

The plan v2.27.0 written (the F-230a-h ledger + the R-27 section)
and validated against the tree. The pins born RED: 7 parity-230
checks — six RED (the StatCard register entry, the toDate tidy, the
phantom-comment retirement, the ai-coach message-id keys ×2, the
CARD_TITLE_OVERRIDE truth) + one green-by-design genus guard (the
register is a record, never a recolor — the guard asserts the parity
classes stand).

The cures: **the StatCard register entry** (F-230a — the F-224y-form
note on the analytics StatCard docblock with the measured trio, the
white-value note, the probe-230c genus citation, and the
"register-not-recolor" instruction); **the lastSyncedAt toDate
tidy** (F-230c — accounts:171 routes through toDate,
behavior-identical, the F-227m precedent); **the
phantom-breakpoint comment rewords** (F-230d — the two F-207a
history quotes retired to prose, the F-229d discipline); **the
ai-coach message-id keys** (F-230e — the model gains an id; the
first design's useRef counter tripped react-hooks/refs (the greeting
consumes the mint DURING render) and was cured to the sanctioned
module-level counter; the list keys by message.id; the import
preview rows and OTP boxes documented as index-identity by design);
**the CARD_TITLE_OVERRIDE truth** (F-230f — the docblock names the
real per-call className mechanism).

## The verification

The full offline gate: **lint 0/0 · tsc 0 · 1218/1218 unit (77
files, +7) · build · smoke 15/15 · 138/138 e2e** (no new leg — every
cure visually inert or comment-only by construction). ALL SIX parity
drift gates CLEAN at 0-event margin (the four sweep classes
1440/390/768/1024 + the fullpage sweep + the interior census).
census MATCH; `bun audit` unchanged. The parity-229 whole-tree
carrier invariant holds (18/18 — the new comments birthed no
carriers).

The capture set 131-133 (scripts/captures-230.ts, on the
own-database convention + the F-226g liveness check): **131** the
Analytics Avg Monthly tiles carrying the register-recorded genus
(asserted: the label computes emerald-100 rgb(209,250,229) over the
live 500→600 gradient — the recolor rejected); **132** the mobile
drawer open at 390×844 with all 9 destinations + Sign Out (the
standing operator ask, asserted by link census); **133** the AI
Coach exchange — greeting + user question + the deterministic reply,
all three bubbles on the id-minted list (asserted: the bubble census
+ the user text landed). The census tripwire MATCHed at exit;
custom.db untouched.

## The lockstep and the delivery

docs-counts 1211→1218 / 76→77 / the badge 1349→1356 / the pins row
48→49 with parity-230; README (the badge, the stack table, the
testing table, the hierarchy, the verification row, the R-27 program
row); AGENTS (the counts + the new gotcha: the render-time id mint
cannot read a ref — react-hooks/refs rejects ref access during
render; the module-level counter is the sanctioned form; keys for a
frozen slice or fixed slots may stay index-keyed); CLAUDE (the gate
contract); PAD (the v2.27.0 revision block, the live sites, the pins
row); SKILL (the counts); the plan closed (R-27 → Done, the §5
execution row); the worklog entry; this record.

R-27 is shipped and verified. No open R-item; the recorded-not-cured
tail (F-230b the inverted Cash Flow adjudication, F-230g the
pre-auth fetch standing, F-230h the clean-surface records, plus the
standing F-217m/F-215m/F-210a/F-214l family) stays documented in the
plan. Next session defaults to findings-led iteration — re-send the
standing directive and it will refresh, re-audit, and continue the
rhythm.
