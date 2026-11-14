# Session 71 — repo session 244 (R-41): the guard-advance, upload-sniff, and select-seam round

The operator re-sent the standing directive after the R-40 ship pair
(d128ee2 + the owner's session_70.md log capture). Per the recorded
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

The baseline gate was GREEN at HEAD b5e1be6 — the exact v2.40.0 ship
state reproduced, no cold-baseline discovery this round: lint 0/0 ·
tsc 0 · 1552/1552 unit (93 files) · build · smoke 15/15 · 150/150 e2e.

The standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the demo data zero, the desktop nav 256/9, the
TRUE-390 menu census standing — the reference's own mobile menu opens
with 9 destination links). `bun audit` unchanged (1 moderate dev-chain
minimatch, the documented deferral). The neo-crm upstream check:
unchanged (b3d0fbe) — nothing to port. The SEO surface verified (smoke
leg 12: sitemap + robots + manifest 200 on the standalone artifact).
The .env contract, the db/ at the repo root, the vitest/playwright
configs, and the .env.example six-knob set all standing.

## The fresh-eyes audit — the layers holding, one recurring guard and a byte-trust gap

Three Mode-C passes (the R-40 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 0 High / 0 Medium / 5 Low / 9 Informational** NEW
after dedup, every material claim re-verified at file:line by the
driving session. All eight R-40 cure surfaces verified holding (the
logout burn-order sweep extended across all 22 sessioned mutating
handlers — no new member of the F-243a genus); the API layer clean
(parse-before-DB, owner-scoping, injection/enumeration sweeps, bucket
coverage); the UI layer clean (a live compile probe over every
comment-carried class token found zero dead emissions).

The findings ledger: the F-243b guard-aging RECURRENCE (F-244a — the
docs-counts trio aged out one block again: the v2.40.0 block landed
at HEAD carrying the live 1552/93 pair while the guard still pinned
v2.37.0/v2.38.0/v2.39.0); THE UPLOAD MIME-TRUST GAP (F-244b — the
one genuinely recommendable code change: the POST route's only
content gate on the stored bytes was the client-declared
Content-Type); the select-trigger template literal escaping the
F-242e genus guard (F-244c); the OTP docblock console-truth gaps
(F-244d); the two prose-satisfiable/order-only parity-243 legs
(F-244e); the session-token TTL bound (F-244f); the signin icons'
aria-hidden riders (F-244g); the role column's no-authority docblock
(F-244h); plus six registrations (F-244i-n — the tee'd OTP logs, the
__Host- prefix, the whole-store subscriptions, the per-render clocks,
the picked-state label edge, the live-utility prose).

## R-41 — TDD execution

**R-41.1 — the pins born RED (honest RED: 25 + the guard advance
green-by-design)**: tests/parity-244.test.ts (the source battery:
the sniff seam's export + the route's family-match gate + the 400
form; the select appendage form + the widened parity-242 guard; the
two OTP docblock truths; the two parity-243 hardenings; the TTL-bound
span guard; the signin aria-hidden riders; the role docblock — 12 RED
+ 2 green-by-design regression guards), tests/upload-sniff.test.ts
(the pure-seam behavioral battery: the four accepted families, the
HTML/SVG/GZIP/truncated/empty/RIFF-cousin negatives, the cross-family
discriminator — 11 RED), and the auth TTL-bound legs (2 RED: the
far-future exp under a VALID signature honored by the pre-cure
verifier; the no-iat strict arm). The docs-counts guard advance landed
green-by-design BEFORE this session's own lockstep pass (the F-242j
lesson's own rule).

**R-41.2 — the cures**: THE UPLOAD MAGIC-BYTE SNIFF (F-244b — the
pure sniffImageMagic seam joins src/lib/uploads.ts; the POST route
reads the already-materialized buffer, sniffs its magic, and requires
the sniffed family to equal the declared MIME's extension before
writeFile — a null for unknown bytes and a cross-family mismatch for
polyglots both answer the 400 family; the honest image still lands);
THE F-243B RECURRENCE GUARD ADVANCE (F-244a — the trio advances to
v2.38.0/v2.39.0/v2.40.0); THE SELECT-TRIGGER APPENDAGE CONVERSION
(F-244c — the one cn()-wrapped template-literal class construction in
src/ becomes the appendage form; the parity-242 genus guard widens to
flag any backtick arriving inside a cn( call); THE OTP DOCBLOCK
CONSOLE TRUTHS (F-244d — the knob drops the console line to the
code-less audit entry, it does not leave the code
console-recoverable); THE PARITY-243 PIN HARDENING (F-244e — the
scanner pins assert the walker character classes; the F-243a battery
gains the arm-containment leg with the increment-site anchor); THE
SESSION-TOKEN TTL BOUND (F-244f — exp-iat spans beyond the session
TTL plus 60s slack null; a missing iat reads as the epoch, strict by
design); THE SIGNIN-ICONS ARIA-HIDDEN RIDERS (F-244g); and THE
ROLE-DOCBLOCK TRUTH (F-244h — the column carries NO authority; open
signup makes a fresh install's first visitor the "admin", which is
not a trust model an authenticated surface can lean on).

Six authoring defects were caught and fixed at the RED→GREEN pass
(this session's own editions of the F-239e/F-239f lessons): two
line-wrapped docblock phrases the raw-source pins could not match,
the GIF test's below-floor buffer, the v2.40.0 pin's +13 delta form,
the tokenVersion anchor matching the route's docblock before the arm,
and the parity-243 advance pin's same-commit recalibration.

**R-41.3 — the verification**: lint 0/0 · tsc 0 · **1581 unit (95
files, +29)** · build · smoke 15/15 · **150 e2e** · ALL SIX parity
drift gates CLEAN (the four sweep classes 1440/390/768/1024, the
fullpage sweep, the interior census — the standing allowances held
UNMOVED at 0-event margin: the round's surfaces are a server-side 400
on invalid bytes, a computed-identical class-string join, docblocks,
pins, attribute-only riders, and a server-side span guard, all
pixel-invisible) · census MATCH · `bun audit` unchanged. The captures
**178-181** (the own-database F-225e convention + the census tripwire
MATCH): the mobile drawer at 390 (the standing ask — 9 destinations +
Sign Out asserted), the Settings currency Select open at 1440 (the
appendage conversion's computed-identical proof — the class string
carries every genus part, the 6px radius and 36px height unchanged,
8 options render), the login signin view at 1440 (both field icons
carry the aria-hidden rider), and **the polyglot upload canary** — a
sessioned POST declaring image/png while carrying HTML bytes answers
400 (the sniff gate fires), a JPEG-bytes-as-png POST answers 400 the
same way, and a valid 1x1 PNG still lands 200 with the capability URL
serving image/png — all four PNG-verified non-blank.

## Delivery

Docs lockstep complete: docs-counts 14/14 (1552→1581 / 93→95 / badge
1702→1731 via the scoped scripts/docs-244-lockstep.py with the
v2.40.0 historical block verified untouched), the README program row
(R-41), AGENTS (the aging-guard recurrence amendment + the
prose-satisfiable-pin gotcha), CLAUDE, PAD v2.41.0 revision block,
SKILL, the plan closed (R-41 → Done + the §5 gate row filled),
worklog, and this session record.

**Recorded, not cured** (documented in the plan): F-244i (the tee'd
dev/server OTP lines — operator posture), F-244j (the __Host- cookie
prefix — a deployment-shape decision; the name is load-bearing across
the smoke ladder), F-244k/F-244l (performance-only), F-244m/F-244n
(edge/prose), plus the standing families (F-242h sidebar heading
order, F-242i in-band-delivery default — the owner's call, F-240k-n,
F-239l-s). Next session defaults to findings-led iteration — re-send
the standing directive to continue the rhythm.
