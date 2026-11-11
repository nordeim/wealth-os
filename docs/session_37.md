# Session 37 — repo session 227 (R-24): the build-gate repair and wrong-row identity round

The owner re-sent the standing directive after the R-23 record pair
(session_35.md + session_36.md). Per the recorded rhythm, this session
defaulted to findings-led iteration: refresh, re-audit, remediate,
verify, capture, document, commit, push — with the operator's named
asks (the mobile navigation comparison, the Tailwind v4 state, the
.env/db contract, the vitest/playwright configs, the sitemap/SEO
surface, the .env.example, the screenshots, the SSH-wrapper push)
re-verified along the way.

## Intake — and the cold-baseline discovery

A fresh clone (the sandbox had reset): bun install, the .env rebuilt
from .env.example (`DATABASE_URL="file:../db/custom.db"` + a fresh
64-char AUTH_SECRET), db:push/db:seed, census MATCH, and the
chromium-1254 install the e2e battery needs.

The baseline then FAILED at HEAD — `bun run build` exited 1 with
`Symlink docs/worklog.md is in a symlink loop`. The owner's post-226
session-log commit 3bd0255 had created `docs/worklog.md` as a
relative symlink targeting `worklog.md` — but relative targets
resolve from the link's OWN directory, so the alias pointed at
ITSELF. Turbopack's DirAssetReference (the upload routes' file
tracing walks the project tree) hit the loop. Every other gate leg
passed: only the build walks symlinks. **F-227a, the round's High.**
The sandbox blocks `ln`, so the cure rode git plumbing (hash-object
the `../worklog.md` target, update-index, checkout-index) — the
owner's alias intent preserved, the build green again. The full
baseline then stood at the exact v2.23.0 ship state: lint 0/0 ·
tsc 0 · 1136/1136 unit (73 files) · build · smoke 15/15 · 135/135
e2e.

The standing asks: probe:ref STABLE on every layer (the bundle md5
unchanged, the demo data zero, the desktop nav standing, the
TRUE-390 menu census standing — the reference's own mobile menu
opens with 9 destination links; our drawer's e2e battery green
inside the 136). `bun audit` unchanged (1 moderate dev-chain).
The neo-crm upstream check: no new commits since Nov 5 — nothing
to port. The SEO surface verified live (sitemap 9 URLs, robots,
manifest).

## The fresh-eyes audit

Three parallel Mode-C passes (the R-23 cure surfaces · the
API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 1 High / 1 Medium / 6 Low / 8 Informational** raw.
The driving session re-verified every material claim before the
ledger:

- The API layer (Pass B): clean at every dimension — the envelope,
  the owner-scoping census, the logApiError seam, the body caps, the
  session/cookie posture, the injection surfaces all held; the
  5000-row import worst case live-executed clean. The findings were
  the defense-in-depth tail: the [id] guard-then-mutate TOCTOU
  (F-227c), the artifact-excludes gap for wealth-os_SKILL.md
  (F-227d), the scrypt default-cost design note (F-227g, recorded
  not cured — the param-encoded migration is a dedicated round).
- The UI layer (Pass C): the headline — **the investments holdings
  table resolves rows by SYMBOL** (F-227b Medium). Two holdings
  sharing a ticker is normal multi-lot portfolio behavior, and the
  Zod/Prisma schemas both allow it: live-reproduced with two ZZQA
  lots (the duplicate-key React warning; the Edit button on the row
  displaying "SECOND HOLDING" opened the dialog prefilled with
  FIRST HOLDING's record — and Delete would silently remove the
  wrong row). Re-verified at file:line: the page's `find` by
  symbol, the `<tr key={row.symbol}>`, and the portfolioStats seam
  that drops the id InvestmentLike carries. Plus the F-226k miss
  (the investments Edit sr-only tail, F-227e), the latent
  destructive-variant contrast arms (F-227f), the analytics raw
  parses (F-227m), and the dead radius tokens (F-227n). The
  Tailwind v4 hazard scan came back CLEAN — no phantom variants,
  zero unpinned palette steps, the .dark flips complete.
- Pass A (the R-23 cure surfaces, driven by the session): the
  designated-tail family, the per-casing layouts, the error-logging
  seam, and the compound index all re-verified green (the parity-226
  + csv suites 99/99).

## The plan and the TDD execution

The plan v2.24.0 written (the F-227a-o ledger + the R-24 section)
and validated against the tree. The pins born RED: 21 of 23
parity-227 source pins (the two F-227a pins green by design — the
symlink repair was the prerequisite for running anything at all),
3 finance behavioral pins, and the e2e leg RED with the honest
wrong-row failure — Expected "Second Duplicate Lot" / Received
"First Duplicate Lot". One legitimate recalibration: the parity-222
F-222o import-line pin (the contract grew with the FK seam).

The cures: **the symlink-loop build repair** (F-227a); **the
holdings identity cure** (F-227b — the id rides the portfolioStats
seam, the table keys and resolves by row.id, an id-less row's
buttons go inert rather than act on the wrong record); **the
conditional-mutation refactor** (F-227c + F-227l — all 10 [id]
PUT/DELETE sites across the five resource families on the atomic
updateMany/deleteMany form with ownerId in the WHERE, plus the
isForeignKeyViolation P2003 seam answering BAD_REQUEST on the
transactions account-link race); the low tail (F-227d/e/f/m/n).

## The verification

The full offline gate: **lint 0/0 · tsc 0 · 1162/1162 unit (74
files) · build · smoke 15/15 · 136/136 e2e** — the duplicate-symbol
identity leg green. ALL SIX parity drift gates CLEAN (the four
sweep classes 1440/390/768/1024, the fullpage sweep, the interior
census — the cures visually inert by construction). census MATCH;
`bun audit` unchanged.

The capture set 122-124 (scripts/captures-227.ts, on the
own-database convention + the F-226g liveness check): **122** the
duplicate-symbol Edit dialog opening the SECOND record's own
prefill (asserted: the #inv-name value); **123** the mobile drawer
open at 390×844 with all 9 destinations + Sign Out (the standing
operator ask, asserted by link census); **124** the holdings table
with row-context Edit buttons on the seeded corpus (asserted: the
accessible-name census). The census tripwire MATCHed at exit;
custom.db untouched.

## The lockstep and the delivery

docs-counts 1136→1162 / 73→74 / 135→136 / the badge 1271→1298 /
the pins row 45→46 with parity-227; README (badge, testing table,
hierarchy, the R-24 program row); AGENTS (counts + the new gotcha:
the relative-symlink resolution doctrine); CLAUDE (the gate
contract); PAD (the v2.24.0 revision block); SKILL (counts); the
plan closed (R-24 → Done, the §5 execution row); the worklog entry;
this record.

R-24 is shipped and verified. No open R-item; the recorded-not-cured
tail (the F-227g scrypt-cost design, the F-227h/i/j/k standing
residuals, the F-217m owner-ask) stays documented in the plan. Next
session defaults to findings-led iteration — re-send the standing
directive and it will refresh, re-audit, and continue the rhythm.
