# Session 77 — repo session 247 (R-44): the guard-advance, iat-bound, and focus-pause round

The operator re-sent the standing directive after the R-43 ship pair
(93ef98c + the owner's session_76.md log capture). Per the recorded
rhythm, this session defaulted to findings-led iteration: refresh,
re-audit, remediate, verify, capture, document, commit, push — with the
operator's named asks (the mobile navigation comparison, the Tailwind v4
state, the .env/db contract, the vitest/playwright configs, the
sitemap/SEO surface, the .env.example, the screenshots, the SSH-wrapper
push) re-verified along the way.

## Intake — a green cold baseline

The workspace refreshed via git pull (docs/session_76.md, the owner's
log capture of session 246, the only delta); the environment standing
(the prisma client regenerated, the .env six-knob contract unchanged,
db:push/db:seed; the census MATCH 80/4/3/6/5/7, users=1).

The baseline gate was GREEN at HEAD c19c242 — the exact v2.43.0 ship
state reproduced, no cold-baseline discovery this round: lint 0/0 · tsc
0 · 1601/1601 unit (97 files) · build · smoke 15/15 · 151/151 e2e.

The standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the demo data zero, the desktop nav 256/9, the
TRUE-390 menu census standing — the reference's own mobile menu opens
with 9 destination links). `bun audit` unchanged (1 moderate dev-chain
minimatch, the documented deferral). The neo-crm upstream check:
unchanged (b3d0fbe) — nothing to port. The SEO surface verified (smoke
leg 12: sitemap + robots + manifest 200 on the standalone artifact).
The .env contract, the db/ at the repo root, the vitest/playwright
configs, and the .env.example six-knob set all standing.

## The first docs act — the guard-trio advance (the genus's FIFTH edition)

Session 246's own v2.43.0 ship left the trio pinned v2.40.0/v2.41.0/
v2.42.0 while the PAD's three most recent blocks became v2.41.0/
v2.42.0/v2.43.0 — the F-243b/F-244a genus's FIFTH recurrence, by
construction, exactly as the doctrine documents. The advance landed
FIRST (green-by-design, before this session's own lockstep pass), with
the parity-243 mirror pin recalibrated same-commit: the trio now pins
v2.41.0 (1581/95) / v2.42.0 (1591/96) / v2.43.0 (1601/97), 30/30 green
across the two batteries.

## The fresh-eyes audit — the layers holding, a half-closed bound, and two interleaving edges

Three Mode-C passes (the R-43 cure surfaces driven by the session · the
API/auth/security layer · the UI/a11y/shell layer): **0 Critical / 0
High / 0 Medium / 6 Low / 6 Informational** NEW after dedup, every
material claim re-verified at file:line by the driving session. All
seven R-43 cure surfaces verified holding (the logout seam convergence,
the guard trio's prior form, the palette reverse leg, the four F-246d
selects, the forgot-password import, the grow symmetry leg).

The findings ledger: THE GUARD-TRIO AGING (F-247a — the expected
recurrence, cured first); THE HALF-CLOSED IAT BOUND (F-247b — the one
genuinely recommendable code change: the F-244f TTL guard closed only
the exp half of the signer-bug class its own docblock names — a future
iat kept a valid exp−iat span and was honored iat+TTL, and a
non-numeric iat NaN'd the span comparison into a silent pass while
flowing the raw value into SessionPayload); THE TOAST FOCUS-PAUSE
ASYMMETRY (F-247c — the 4s auto-dismiss paused on hover only; a
keyboard user's tabbed-to Dismiss button died with the card); THE
AUTH-FAMILY SELECT RESIDUALS (F-247d — signup's existence check and
reset-password's token read, the two F-246d misses); THE IMPORT
COMMIT-WINDOW RE-PICK (F-247e — the F-234b parse token guards the
parse window only; the commit window was unguarded); and THE PALETTE
ENUMERATOR JSX MISS (F-247f — the walker excluded the nine .jsx
bridges, against the F-243d whole-tree doctrine); plus six
registrations (F-247g-l: the sessioned-family gate ordering, the login
password cap, the csvImport category min, the useTheme fallback arms,
the theme-label bootstrap, the avatar luminance heuristic).

## R-44 — TDD execution

**R-44.1 — the pins born RED (honest RED: 9 + the green-by-design
advance)**: tests/parity-247.test.ts (the source battery: the iat shape
guard + the present-bound form + the no-iat-arm preservation, the
toast focus-pause pair beside the hover pair, signup's
findUnique-select form, reset-password's findFirst-select form, the
import input's busy rider, the palette walker's jsx arm + its
docblock) + the two auth.test.ts behavioral legs (a future iat beyond
the skew slack — HONORED by the pre-cure verifier; a non-numeric iat —
a string flowed into SessionPayload pre-cure).

**R-44.2 — the cures**: THE IAT SHAPE-AND-PRESENT BOUND (F-247b — the
flagship: a PRESENT iat must be a finite number and cannot sit further
than the 60s clock-skew slack past now; the exp/v family form; the
no-iat strict arm untouched); THE GUARD-TRIO ADVANCE (F-247a); THE
TOAST FOCUS-PAUSE RIDERS (F-247c — onFocus/onBlur join the hover pair,
React's synthetic focus events bubbling from the Dismiss button); THE
AUTH-FAMILY SELECT RESIDUALS (F-247d — signup selects {id};
reset-password selects {id, resetTokenExpiresAt} with the narrowed
type; the auth-reset historical pin recalibrated to the select form
same-commit); THE IMPORT COMMIT-WINDOW GUARD (F-247e — the input rides
disabled through the import POST); THE PALETTE ENUMERATOR JSX
COMPLETION (F-247f — green-by-design over the re-export-only bridges).

Two authoring defects caught by the round's own nets mid-cure (each
now an AGENTS.md gotcha): the F-247e pin's 400-char slice window went
RED against its own cure — the rider sat past the cure's own four-line
docblock inside the window's reach (widened to 700; the window must
ride through the comment the same commit writes); and the plan-writer's
markdown-pipe lesson — the ledger row's escaped pipe-pipe IS the
correct table form (the python escape warning fired on exactly the
correct form; the unescaped "fix" broke the row into phantom cells).

**R-44.3 — the verification**: lint 0/0 · tsc 0 · **1610 unit (98
files, +9)** · build · smoke 15/15 · 151 e2e · ALL SIX parity drift
gates CLEAN at 0-event margin (the round's surfaces are a server-side
verifier bound, attribute-only focus riders, select narrowing, an
input-disable rider, and a test-walker widening — pixel-invisible by
construction) · census MATCH · `bun audit` unchanged. The captures
**188-190** (the own-database F-225e convention + the spawn-liveness
check + the census tripwire MATCH + PNG-verified valid at their
viewports): the mobile drawer at 390 (the standing ask — 9 destinations
+ Sign Out asserted), THE IAT BOUND CANARY (the flagship proven live:
the minted cookie 200 on the gated family, the future-iat and
non-numeric-iat forged cookies (same secret, same uid) both 401, the
forged session landing the login wall — the capture's own face), and
THE TOAST FOCUS-PAUSE FACE (the focused toast asserted ALIVE at 4.6s —
the pre-cure card died at 4s with the focus inside it — then dismissed
~4s after the blur).

## Delivery

Docs lockstep complete: docs-counts 16/16 (1601→1610 / 97→98 via the
scoped scripts/docs-247-lockstep.py — 29 unique-anchor replacements
incl. the arch-pins family row 66→67 with parity-247 listed, the
arithmetic 4+67+27=98, the README badge 1752→1761, the README program
row (R-44), the PAD v2.44.0 revision block, AGENTS (+2 gotchas: the
slice-window lesson, the markdown-pipe lesson), CLAUDE counts, SKILL
counts), the plan closed (R-44 → Done + the §5 gate row at the real
counts), worklog, and this session record.

**Recorded, not cured** (documented in the plan): F-247g (the
sessioned-family burn-before-gate consistency), F-247h (the login
password cap asymmetry), F-247i (the csvImport category min(1)
asymmetry), F-247j (the useTheme fallback's system arm — latent),
F-247k (the theme-label bootstrap — latent), F-247l (the avatar
luminance heuristic — decorative), plus the standing families
(F-246g/h, F-245g/h, F-244i-n, F-242h/i, F-240k-n, F-239l-s). Next
session defaults to findings-led iteration — re-send the standing
directive to continue the rhythm; the guard-trio advance (to
v2.42.0/v2.43.0/v2.44.0) is its FIRST docs act.
