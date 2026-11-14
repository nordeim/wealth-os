# Session 73 — repo session 245 (R-42): the gate-order, bare-carrier, and lockstep-truth round

The operator re-sent the standing directive after the R-41 ship pair
(102252a + the owner's session_72.md log capture). Per the recorded
rhythm, this session defaulted to findings-led iteration: refresh,
re-audit, remediate, verify, capture, document, commit, push — with the
operator's named asks (the mobile navigation comparison, the Tailwind v4
state, the .env/db contract, the vitest/playwright configs, the
sitemap/SEO surface, the .env.example, the screenshots, the SSH-wrapper
push) re-verified along the way.

## Intake — a green cold baseline

A fresh clone (sandbox reset); bun install (594 packages, the prisma
client regenerated into src/generated/prisma); the .env rebuilt from
.env.example (the DATABASE_URL="file:../db/custom.db" contract + a
fresh 64-char AUTH_SECRET); db:push/db:seed; the census MATCH
(79/4/3/6/5/7, users=1). The chromium-1254 install the e2e battery
needs landed.

The baseline gate was GREEN at HEAD 30a261d — the exact v2.41.0 ship
state reproduced, no cold-baseline discovery this round: lint 0/0 ·
tsc 0 · 1581/1581 unit (95 files) · build · smoke 15/15 · 150/150 e2e.

The standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the demo data zero, the desktop nav 256/9, the
TRUE-390 menu census standing — the reference's own mobile menu opens
with 9 destination links). `bun audit` unchanged (1 moderate dev-chain
minimatch, the documented deferral). The neo-crm upstream check:
unchanged (b3d0fbe) — nothing to port. The SEO surface verified (smoke
leg 12: sitemap + robots + manifest 200 on the standalone artifact).
The .env contract, the db/ at the repo root, the vitest/playwright
configs, and the .env.example six-knob set all standing.

## The fresh-eyes audit — the layers holding, a third guard recurrence, a public-family burn-order gap, and a bare-word carrier genus

Three Mode-C passes (the R-41 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 0 High / 0 Medium / 6 Low / 2 Informational** NEW
after dedup, every material claim re-verified at file:line by the
driving session. Seven of eight R-41 cure surfaces verified holding
(the upload sniff, the select appendage + the widened guard, the OTP
docblocks, the hardened parity-243 pins, the TTL bound, the signin
riders, the role docblock) — the EIGHTH, the guard advance itself,
aged out by one block inside its own ship commit (the F-243b/F-244a
genus's THIRD recurrence: session 244 landed the v2.41.0 block while
the trio still pins v2.38.0/v2.39.0/v2.40.0).

The findings ledger: THE PUBLIC-FAMILY PRE-GATE BUCKET BURN (F-245a —
the one genuinely recommendable code change: the six public auth
routes burn the per-IP bucket BEFORE the content-type CSRF gate, so a
cross-site plain-text volley burns the victim's own IP budget at zero
attacker cost and 429s every real login for a renewable 15-minute
window — the exact F-234g/F-243a genus the repo cured for logout and
the writes family, never extended to the public family; plus the
uploads GET sibling burning its 240 bucket before the name-regex
404); the F-243b/F-244a guard-aging THIRD RECURRENCE (F-245b); the
PAD file-hierarchy line stale 93-vs-95 with no pin watching the site
(F-245c — the lockstep script that carried the leg was dropped);
the §7.1 family rows lagged two rounds (F-245d — arch-pins 62 with
parity-243/244 unlisted, upload-sniff unhomed, sub-rows summing 92
against the pinned Unit row 95); THE SIX DEAD BARE-WORD CARRIERS
(F-245e — antialiased, flow-root, lowercase, inline, invisible, grow
emitting dead rules in the production stylesheet; the audit passes'
three-word census expanded to six by the driving session's emission
probe, and the reword pass then found the census incomplete again:
two next.config.ts sites + one tsconfig.json site OUTSIDE the
parity-229 walker's src-scoped net — 49 carrier sites total); the
health docblock's false "only deliberate exception" enumeration
(F-245f — auth/me is the second unbucketed family, structurally
mitigated); plus two registrations (F-245g — the scrypt Node-default
cost parameters vs the OWASP floor; F-245h — the uploads GET
octet-stream fallback, defensive dead code kept deliberately).

## R-42 — TDD execution

**R-42.1 — the pins born RED (honest RED: 11 + 1 green-by-design)**:
tests/parity-245.test.ts (the source battery: the seam's export +
the six routes' gate-before-burn ordering + the uploads GET's
regex-before-burn + the parity-229 BARE form + the reword zero-match
pins including the root-config carriers + the health docblock's exact
phrase), the parity-229 BARE_UTILITY_WORDS leg (RED at birth over 21
offender sites; the "lowercase" word is the recorded fake-live
exception — the csv.ts regex-quote swallow fabricates liveness in the
LIVE derivation, so its proof is the reword + the build probe), the
docs-counts legs (RED over the stale rows/hierarchy/arithmetic;
green-by-design over the trio advance), and the e2e volley canary
(the RED proof received exactly 429 on the post-volley JSON login).
ONE FALSE GREEN was caught at birth: the bare-word leg's first
authoring iterated the class-shape-filtered COMMENT_TOKENS map —
invisible to bare words — and was fixed to derive its own unfiltered
census BEFORE any cure landed.

**R-42.2 — the cures**: THE PUBLIC-FAMILY GATE-ORDER CURE (F-245a —
the shared `requireJsonContentType` seam joins src/lib/api.ts with
the parseBody gate's own 400 copy and the stream cancel; the six
public routes call it before their per-IP burn; the uploads GET
moves its name-regex 404 ahead of its burn. Every brute-force bound
preserved: a guesser can trivially carry application/json, a
cross-site form volley cannot); THE GUARD-TRIO ADVANCE (F-245b —
v2.39.0/v2.40.0/v2.41.0, green-by-design BEFORE this session's own
lockstep pass, the F-244a lesson's own rule finally executed first);
THE PAD HIERARCHY TRUTH (F-245c — corrected + the new docs-counts
pin so the leg survives future lockstep scripts); THE §7.1
FAMILY-ROW COMPLETION (F-245d — arch-pins 62→65 with
parity-243/244/245 listed, upload-sniff homed to infrastructure
26→27, and the ARITHMETIC LEG: domain + arch + infra must equal the
Unit row); THE SIX BARE-CARRIER RETIREMENTS (F-245e — 49 comment
sites reworded across src/ AND the root config files; the parity-229
invariant gains the BARE_UTILITY_WORDS leg; the build probe proves
all six rules vanish — with the CSP 'unsafe-inline' strings
proven non-extracting by the same probe); and THE HEALTH DOCBLOCK
TRUTH (F-245f).

**R-42.3 — the verification**: lint 0/0 · tsc 0 · **1591 unit (96
files, +10)** · build · smoke 15/15 · **151 e2e (+1 — the volley
canary)** · ALL SIX parity drift gates CLEAN at 0-event margin (the
round's surfaces are a server-side 400 on non-JSON content-type, a
server-side 404-before-burn, comment rewords, and doc rows — all
pixel-invisible) · census MATCH · `bun audit` unchanged · THE BUILD
PROBE: all six dead bare-word rules VANISH from the production
stylesheet. The captures **182-184** (the own-database F-225e
convention + the census tripwire MATCH): the mobile drawer at 390
(the standing ask — 9 destinations + Sign Out asserted), THE
PLAIN-TEXT VOLLEY CANARY (the flagship proven live: 10x text/plain
login posts 400 un-bucketed + the JSON login on the same client key
still landing 401, NOT the pre-cure 429 the e2e RED proof received +
the signup/verify text/plain sibling probes), and THE UPLOADS GET
SIBLING (100 invalid-name capability GETs all 404 un-burned + the
valid 1x1 PNG round-trip still landing 200 serving image/png — the
budget survived the storm).

## Delivery

Docs lockstep complete: docs-counts 16/16 (1581→1591 / 95→96 /
150→151 / badge 1731→1742 via the scoped scripts/docs-245-lockstep.py
— 32 live-tense sites; the TWO sites the script initially missed were
caught by the docs-counts pins themselves and added to the script —
the F-245c lesson's own proof), the PAD v2.42.0 revision block, the
README program row (R-42), AGENTS (+2 gotchas: the bare-word carrier
+ root-config census lesson, the lockstep-leg/structural-pin
lesson), CLAUDE, SKILL, the plan closed (R-42 → Done + the §5 gate
row filled), worklog, and this session record.

**Recorded, not cured** (documented in the plan): F-245g (the scrypt
cost parameters — the versioned scrypt2: format-prefix round if ever
opened), F-245h (the uploads GET octet-stream fallback — defensive),
plus the standing families (F-244i-n, F-242h/i, F-240k-n, F-239l-s).
Next session defaults to findings-led iteration — re-send the
standing directive to continue the rhythm.
