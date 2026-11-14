# Session 63 — repo session 240 (R-37): the revocation-signal, signup-ceiling, and form-seam round

The operator re-sent the standing directive after the R-36 ship pair
(fe5dfe7 + the owner's session_62.md log capture). Per the recorded
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
(79/4/3/6/5/7, users=1 — the date-dependent transaction bound
respected). The chromium-1254 install the e2e battery needs landed.

The baseline gate was GREEN at HEAD 884a4ff — the exact v2.36.0
ship state reproduced, no cold-baseline discovery this round: lint
0/0 · tsc 0 · 1469/1469 unit (89 files) · build · smoke 15/15 ·
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

## The fresh-eyes audit — one Medium genus, the layer otherwise holding

Three Mode-C passes (the R-36 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 0 High / 1 Medium / 8 Low / 7 Informational** raw
after dedup, every material claim re-verified at file:line by the
driving session. All nine R-36 cure surfaces verified holding (the
wall's bump/caller contracts, the reset's verification clears, the
hydration suppressions, the 507 copy, the settings upsert —
live-probed on a temp db, the upload catch arms, the sidebar pair,
the animation-token retirement); the API layer's owner-scoping
census (60+ DB call sites), bucket coverage, and Zod boundary
sweep all clean — genuinely clean passes, with three residual
findings and the register tail.

The Medium: **the F-240a revocation-signal discard genus** —
refreshAll's combined token+sequence guard discarded a live-session
401 on the stale-SEQUENCE dimension alone (two overlapping
dashboard fetches whose server reads straddle a revocation: the
older-seq read postdating it → 401 discarded, the newer-seq read
predating it → 200 committing the old user's ledger over the live
store — the F-239a threat model through the sequence dimension),
and the same staleness window rode EVERY 401 arm keyed on the entry
token, because a concurrent hydrate's own ENTRY bump (the
shell-remount re-hydrate) stales the captured token without any
clear happening. The uniform cure keys every 401 arm on the LIVE
USER — the wall and the logout are the only clear-owners that null
it, so user-standing is exactly "no deliberate clear owns the
face".

The plan validation itself caught an interleaving error in the
first-draft audit phrasing: refresh CAPTURES the live token without
bumping (hydrate is the only non-clearing bumper), so the
mutation-staleness leg was restructured to the hydrate-driven form
before the RED proof — the validate-against-the-tree step paying
for itself.

## R-37 — TDD execution

**R-37.1 — the pins born RED (honest RED: 15)**: the parity-240
source battery (12 RED + 1 green-by-design genus guard — the
success arm's last-request-wins contract); the store-battery
behavioral extensions (3 RED: the two-overlapping-refreshes leg,
the mutation-401-with-hydrate-staled-token leg, the
settings-tail-401 amber-settle leg); the F-240f loading assertions
and the F-240h bulk-form ban green at birth as regression guards;
the F-240g mechanism comment aligned to the leg it drives.

**R-37.2 — the cures**: THE REVOCATION-SIGNAL DISCARD GENUS
(F-240a — every 401 arm re-keyed on the live user: refreshAll's arm
hoisted above the combined guard, mutate's/updateSettings'/
askCoach's arms re-keyed, hydrate's dashboard arm hoisted above the
entry-token guard with the fresh-token disjunct preserving the
first-load wall; the helpers gain the get carrier — 19 call
sites); the hydrate settings-tail wall (F-240b — a revocation
between hydrate's two calls walls instead of settling the amber
face); THE SIGNUP PROCESS CEILING (F-240c — the only public
mutating route with no IP-independent bound gains the uploads
family's process-level capacity form: a global 20/15min bucket
keyed WITHOUT the IP, sized 2x the e2e battery's ten-signup
budget); THE FORM-INPUT SEAM (F-240d — the sixteen-site
byte-identical section-page input literal unified into the
FORM_INPUT constant, the F-229f re-entry rule honored: the constant
ships WITH its consumers; the per-site modifiers ride cn()
appendages; the two sibling genera stay); the DialogFooter docblock
truth (F-240e); the F-239g pin hardening (F-240h — the
count-mapped bulk-update form joins the forbidden set); the verify
lockout equalizer (F-240i — the timing-equalizer family's one
uncovered arm); the wall docblock truth (F-240j — six callers, the
user-key contract).

The same-commit pin recalibrations rode the round: parity-217/238
(the get carrier + the live-user key), parity-239 (the bulk-form
ban), and parity-229's SCANNER CLOSING-QUOTE FIX — a latent
tokenization defect (the scanner dropped string-closing quotes, so
a quoted token fused with its trailing call punctuation) that
surfaced exactly when the bare literal became a cn() appendage; the
fix keeps the closing quote in the code portion, making
live-detection exact.

**R-37.3 — the verification**: lint 0/0 · tsc 0 · **1485 unit (90
files, +16)** · build · smoke 15/15 · **147 e2e** · ALL SIX parity
drift gates CLEAN (the four sweep classes + the fullpage sweep +
the interior census — the standing allowances held UNMOVED: the
seam swap is byte-identical by construction, the 401 arms are
store-internal, the ceiling + equalizer are server-side) · census
MATCH · `bun audit` unchanged. The captures **162-165** (the
own-database F-225e convention + the census tripwire MATCH): the
mobile drawer at 390 (the standing ask — 9 destinations + Sign Out
asserted), the Add-Expense manual form (the seam's computed
geometry: 40px/8px/14px), the Settings budget row (the 128px width
appendage), the Investments symbol field (the mono-caps appendage)
— all four pixel-verified non-blank.

## Delivery

Docs lockstep complete: docs-counts 13/13 (the 18 live-tense count
sites re-pinned 1469→1485 / 89→90 via the assert-each-replacement
script), the README program row (R-37), AGENTS +3 gotchas (the
live-user 401 key; the process-level ceiling for persistent-state
public routes; the scanner closing-quote lesson), CLAUDE, PAD
v2.37.0 revision block, SKILL, the plan closed (R-37 → Done + §5
execution row + the tail note's running list extended through
R-37), worklog, and this session record.

**Recorded, not cured** (documented in the plan): F-240k (the
upload declared-MIME trust — the pre-registered F-219v posture),
F-240l (the inert native-validation attributes on the noValidate
auth forms — the banner-only parity UX), F-240m (the dashboard's
pinned clock — the deliberate render-stability trade), F-240n (the
a11y open-state scroll gap — latent; the faces are single-screen
today), plus the standing F-239l-s families. Next session defaults
to findings-led iteration — re-send the standing directive to
continue the rhythm.
