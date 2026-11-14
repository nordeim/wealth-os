# Session 69 — repo session 243 (R-40): the logout-bucket, guard-advance, and label-truth round

The operator re-sent the standing directive after the R-39 ship pair
(faf229c + the owner's session_68.md log capture). Per the recorded
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

The baseline gate was GREEN at HEAD ddf2396 — the exact v2.39.0 ship
state reproduced, no cold-baseline discovery this round: lint 0/0 ·
tsc 0 · 1539/1539 unit (92 files) · build · smoke 15/15 · 150/150 e2e.

The standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the demo data zero, the desktop nav 256/9, the
TRUE-390 menu census standing — the reference's own mobile menu opens
with 9 destination links). `bun audit` unchanged (1 moderate dev-chain
minimatch, the documented deferral). The neo-crm upstream check:
unchanged (b3d0fbe) — nothing to port. The SEO surface verified (smoke
leg 12: sitemap + robots + manifest 200 on the standalone artifact).
The .env contract, the db/ at the repo root, the vitest/playwright
configs, and the .env.example six-knob set all standing.

## The fresh-eyes audit — one Medium flagship, the layers holding

Three Mode-C passes (the R-39 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 0 High / 1 Medium / 5 Low / 5 Informational** NEW
after dedup, every material claim re-verified at file:line by the
driving session. All eight R-39 cure surfaces verified holding (the
eighth — the count-lockstep restoration — holding in the PAD itself
but with its guard window aged out, F-243b); the API layer clean
again; the UI layer clean.

The flagship: **THE LOGOUT WRITES-BUCKET POISONING** (F-243a) —
`POST /api/auth/logout` was the only writes-family route whose bucket
burn preceded its session read. The F-234g content-type gate closed
the cross-site no-preflight volley, but a plain cookie-less DIRECT
caller posting JSON content-type still passed the gate, burned 60
slots of the shared writes bucket every sessioned mutation rides, and
collected the guest-logout no-op 200. On the default direct-exposure
posture (no XFF — every browser keys the same client bucket) that is
a renewable unauthenticated write-DoS across all users, exactly the
doctrine the upload route's own docblock states ("bucketing pre-auth
would let an attacker exhaust a legitimate IP's budget without ever
holding a session").

## R-40 — TDD execution

**R-40.1 — the pins born RED (honest RED: 11 + 2 green-by-design)**:
the parity-243 source battery — the burn AFTER the session read (one
false green caught at birth: the getSessionUser anchor matched the
import line, the F-239e lesson, fixed before any cure), the v2.39.0
block's true 14/14, the three OTP docblock truths, the two scanner
walker jsx admissions, the aria-label containment, the export
retirement, the globals prose, the guard trio — plus the F-234g
gate-first and F-221r bucket-form regression guards (green by design:
the surfaces the move must preserve). The docs-counts guard advance
landed green-by-design BEFORE this session's own lockstep pass (the
F-242j lesson's own rule).

**R-40.2 — the cures**: THE LOGOUT WRITES-BUCKET POISONING CURE
(F-243a — the burn rides the sessioned path, after the session read,
inside the if-user arm; a guest logout consumes nothing; the
F-234g gate-first order and the F-221r bucket form both preserved
and re-pinned); THE GUARD ADVANCE + THE 14/14 TRUTH (F-243b — the
over-replacement guard now pins the three-most-recent trio
v2.37.0/v2.38.0/v2.39.0; the v2.39.0 block's stale-at-birth
"docs-counts 13/13" corrected to the true 14/14); THE OTP DELIVERY
DOCBLOCK TRUTHS (F-243c — the three session-21-era "never shipped to
the client" carriers reworded to the ADR-014 in-band delivery they
actually ship); THE WHOLE-TREE SCANNER JSX COMPLETION (F-243d — both
walkers admit jsx, the nine capital-route bridges join both scans);
THE IMPORT DROPZONE LABEL-IN-NAME CURE (F-243e — the accessible name
now contains the visible "Upload a file" text, WCAG 2.5.3 Level A);
THE READSTOREDTHEME EXPORT RETIREMENT (F-243f); and THE GLOBALS
PROSE-TOKEN RIDER (F-243g).

**R-40.3 — the verification**: lint 0/0 · tsc 0 · **1552 unit (93
files, +13)** · build · smoke 15/15 · **150 e2e** · ALL SIX parity
drift gates CLEAN (the standing allowances held UNMOVED at 0-event
margin — the round's surfaces are server-side ordering, guard
internals, docblocks, one aria-label, and one export keyword, all
pixel-invisible) · census MATCH · `bun audit` unchanged. The captures
**174-177** (the own-database F-225e convention + the census tripwire
MATCH): the mobile drawer at 390 (the standing ask — 9 destinations +
Sign Out asserted), the Import dropzone's label-in-name at 1440 AND
390 (the accessible name contains the visible phrase, asserted both
widths), and **the logout-volley write canary** — 70 cookie-less JSON
logout POSTs, every one a no-op 200 that burns nothing, then the
sessioned Add Expense round-trip still lands (the pre-cure tree 429'd
that write at volley request 61) — all four PNG-verified non-blank.

## Delivery

Docs lockstep complete: docs-counts 14/14 (1539→1552 / 92→93 / badge
1689→1702, via the scoped scripts/docs-243-lockstep.py with the
v2.39.0 historical block verified untouched), the README program row
(R-40), AGENTS (+2 gotchas: the pre-auth shared-bucket burn, the
aging guard window), CLAUDE, PAD v2.40.0 revision block, SKILL, the
plan closed (R-40 → Done + §5 execution row), worklog, and this
session record.

**Recorded, not cured** (documented in the plan): F-243h (the
committed docs-242.py constant — inert by its own assert guard),
F-243i (the PAD v2.36.0 historical F-239c framing — defensible
history), F-243j (the disabled-in-flight focus drop — Reasoned), plus
the standing families (F-242h sidebar heading order, F-242i
in-band-delivery default — the owner's call, F-240k-n, F-239l-s).
Next session defaults to findings-led iteration — re-send the
standing directive to continue the rhythm.
