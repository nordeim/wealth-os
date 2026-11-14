# Session 67 — repo session 242 (R-39): the CSP-inventory pin, test-hygiene, and carrier-truth round

The operator re-sent the standing directive after the R-38 ship pair
(ae773a6 + the owner's session_66.md log capture). Per the recorded
rhythm, this session defaulted to findings-led iteration: refresh,
re-audit, remediate, verify, capture, document, commit, push — with
the operator's named asks (the mobile navigation comparison, the
Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.

## Intake — a green cold baseline

A fresh clone (sandbox reset); bun install (594 packages, the prisma
client regenerated into src/generated/prisma); the .env rebuilt from
.env.example (the DATABASE_URL="file:../db/custom.db" contract + a
fresh 64-char AUTH_SECRET); db:push/db:seed; the census MATCH
(79/4/3/6/5/7, users=1). The chromium-1254 install the e2e battery
needs landed.

The baseline gate was GREEN at HEAD 1b038d7 — the exact v2.38.0
ship state reproduced, no cold-baseline discovery this round: lint
0/0 · tsc 0 · 1519/1519 unit (91 files) · build · smoke 15/15 ·
147/147 e2e.

The standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the demo data zero, the desktop nav 256/9, the
TRUE-390 menu census standing — the reference's own mobile menu
opens with 9 destination links). `bun audit` unchanged (1 moderate
dev-chain minimatch, the documented deferral). The neo-crm upstream
check: unchanged (b3d0fbe) — nothing to port. The SEO surface
verified (smoke leg 12: sitemap + robots + manifest 200 on the
standalone artifact). The .env contract, the db/ at the repo root,
the vitest/playwright configs, and the .env.example six-knob set
all standing.

## The fresh-eyes audit — the layers holding, one rider ready to land

Three Mode-C passes (the R-38 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 0 High / 1 Medium / 5 Low / 3 Informational** NEW
after dedup, every material claim re-verified at file:line by the
driving session. All seven R-38 cure surfaces verified holding; the
API layer clean again (owner-scoping, Zod, buckets, injection,
enumeration, session, errors, secrets, deps all clean); the UI layer
clean (the drawer mechanics, the theme system, the a11y contracts,
the shell all holding).

The pass-B deliverable the round was built around: **the CSP source
inventory** — the registered F-241h rider's own precondition ("land
with a source inventory the next time the config is touched"). The
sweep found the app consumes ZERO third-party origins: every fetch
is a same-origin relative path, every image same-origin (the logo,
the metadata icons, the og-image, the /api/uploads capability URLs),
no webfonts ship, the charts' inline style attributes need only the
style 'unsafe-inline' floor, and the analytics CSV export is an
anchor-click DOWNLOAD (ungoverned by the fetch directives).

## R-39 — TDD execution

**R-39.1 — the pins born RED (honest RED: 21)**: the parity-242
source battery (18 RED + 1 green-by-design genus guard), the
http-headers recalibration (RED until the config cure), and the e2e
served-header leg (RED against the pre-cure standalone — the header
lacked the fetch directives; the zero-violation sweep and the
Export-CSV download canary were green at birth as coverage legs).

**R-39.2 — the cures**: THE CSP FETCH-DIRECTIVE PIN (F-242a —
default-src/style-src/img-src/font-src/connect-src all 'self'
joining the shipped five, the dev eval branch preserved, the
manifest-icon caveat documented at the pin); THE RATE-LIMIT CLEANUP
FIX (F-242b — the sweep was watermark-gated off while claiming
"restoring headroom"; now it crosses the pinned watermark, asserts
its reclaimed count, and proves the fresh key earns its own bucket);
THE PARITY-240 RETITLE (F-242c); THE POPOVER DOCBLOCK TRUTH
(F-242d — the "naturally spared" over-claim, three carriers); THE
LOGIN-CARD CONVERSION (F-242e — the only two template-literal class
strings in src, now the cn() appendage form, twMerge
byte-identity live-verified); THE GLOBALS/PAGE-LAYOUT COMMENT
TRUTHS (F-242f — the self-contradictory neutral-token docblock +
six class-shaped citations reworded to token form); THE
HYDRATION-RATIONALE TRUTHS (F-242g — the loading-gate mechanism
recorded); and THE COUNT-LOCKSTEP HISTORICAL-BLOCK RESTORATION
(F-242j — the round's own discovery at the docs pass: git diff
against the ship commits proved the two prior sessions' replacement
scripts had each over-replaced the then-most-recent HISTORICAL
revision block; both restored to their own ship counts and pinned by
the docs-counts over-replacement guard, plus the arch-pins row
completed and the PAD hierarchy line re-pinned).

**R-39.3 — the verification**: lint 0/0 · tsc 0 · **1539 unit (92
files, +20)** · build · smoke 15/15 · **150 e2e** (the three new
legs: the served-header pin, the zero-violation sweep, the CSV
download canary) · ALL SIX parity drift gates CLEAN (the standing
allowances UNMOVED at 0-event margin) · census MATCH · `bun audit`
unchanged. The served header curl-verified on the standalone (the
exact pinned ten-directive form, strict production, no eval). The
captures **170-173** (the own-database F-225e convention + the
census tripwire MATCH): the mobile drawer at 390 (the standing ask —
9 destinations + Sign Out asserted), the login forgot link (the
appendage's 14px/500 computed form), the signup verify view's six
OTP boxes (the appendage's 40×44px/center/600/14px computed form),
and the Analytics Export CSV download fired under the pinned policy
(the blob canary) — all four PNG-verified non-blank.

## Delivery

Docs lockstep complete: docs-counts 14/14 (1519→1539 / 91→92 /
147→150 / badge 1666→1689; the arch-pins row 59→62; the F-242j
guard added), the README program row (R-39), AGENTS (the counts + 3
new gotchas), CLAUDE, PAD v2.39.0 revision block (+ the two
historical restorations), SKILL, the plan closed (R-39 → Done + §5
execution row + the F-242j rider), worklog, and this session record.

**Recorded, not cured** (documented in the plan): F-242h (the
sidebar brand heading order — a census-visible DOM change), F-242i
(the in-band-delivery production default — the F-217m owner-decision
family with the pass-B escalation recorded: the default-on posture
escalates to account-takeover for a production deploy that ignores
the boot warning; the flip trades the zero-config self-host demo
posture for the hardening, so it stays the owner's call), plus the
standing F-240k-n and F-239l-s families. Next session defaults to
findings-led iteration — re-send the standing directive to continue
the rhythm.
