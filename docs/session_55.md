# Session 55 — repo session 236 (R-33): the empty-put, transient-503, and revocation-face round

The owner re-sent the standing directive after the R-32 record pair
(docs/session_53.md + the owner's session_54.md log capture of the
session-235 round). Per the recorded rhythm, this session defaulted to
findings-led iteration: refresh, re-audit, remediate, verify, capture,
document, commit, push — with the operator's named asks (the mobile
navigation comparison, the Tailwind v4 state, the .env/db contract,
the vitest/playwright configs, the sitemap/SEO surface, the
.env.example, the screenshots, the SSH-wrapper push) re-verified along
the way.

## Intake — a green cold baseline

A fresh clone (sandbox reset); bun install (594 packages, the prisma
client regenerated into src/generated/prisma); the .env rebuilt from
.env.example (the DATABASE_URL="file:../db/custom.db" contract + a
fresh 64-char AUTH_SECRET); db:push/db:seed; the census MATCH
(78/4/3/6/5/7, users=1). The platform shell's exported absolute
DATABASE_URL re-encountered and resolved by the seam itself (its value
exactly equals bun's absolutization of the repo .env's relative form —
the db-path seam re-anchored it to the repo-root db). The
chromium-1254 install the e2e battery needs landed.

The baseline gate was GREEN at HEAD 252a356 — the exact v2.32.0
ship state reproduced, no cold-baseline discovery this round: lint
0/0 · tsc 0 · 1337/1337 unit (83 files) · build · smoke 15/15 ·
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

## The fresh-eyes audit — one Medium, and the tail re-verified

Three Mode-C passes (the R-32 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 0 High / 1 Medium / 8 Low / 11 Informational** raw
after dedup. The driving session re-verified every material claim at
file:line; R-32's fourteen pinned cures all verified holding. The
Pass-C token system was verified by an out-of-tree compile of
globals.css against the real source set (no phantom breakpoints,
every custom-token utility compiles against its pin, zero
dead-family emissions), and the aria-live toast viewport's immunity
to Radix hideOthers was verified in node_modules (the aria-hidden
package spares live regions — toasts fired inside open dialogs ARE
announced).

The Medium: **the empty-put 404** — every field of the five update
schemas is `.optional()`, so a body of `{}` (or unknown-keys-only,
which Zod strips) parses to `{}`; the routes' conditional spreads
build an empty data object, and Prisma SHORT-CIRCUITS
`updateMany({ data: {} })` to `count: 0` WITHOUT executing a query
— a legitimate no-change PUT answered 404 for an existing, owned
row, indistinguishable from the vanished/foreign row the arm exists
for. Live-reproduced against the exact client before planning (the
control mutation with real data returns 1 on the same row; the
settings/users `db.<model>.update` form is a no-op that RETURNS the
record — the two forms diverge exactly here).

The Lows: the P2024/P2028 → 503 arm on only 3 of the DB-touching
routes (34 catch arms answered the generic 500 with retry advice
for a transient server condition); the asymmetric clear contract
(`""` cleared the F-219q string family but 400'd every nullable
date; the create twins rejected the `null` the update twins accept;
color/icon stored the empty string); the 22px toast-dismiss target
under the 24px floor (the very control the F-235f cure cited as its
precedent); the bare 💡 glyph on the dashboard health line (the one
site the F-235g round missed); the mid-flight revocation's empty
workspace (a session revoked between the server layout's pass and
the client hydrate's 401 rendered a $0 dashboard with a stale
sidebar); the falsified F-218a comment; the parity-235 timer-pin
gap; the goals valuenow rounding; the dead-arm register; the PAD
retrospective forms. The Informations: the SSR/hydration date
stability (recorded — the cure's blast radius spans the flagship
page's whole now-derived tree for a recoverable console-noise
class), the pagination posture, the first-admin race, the CSP
breadth, the upload magic bytes, the dialog glyph anchor, the
informational tail.

## The plan and the TDD execution

The plan v2.33.0 written (the F-236a-r ledger + the R-33 section +
the §5 execution row) and validated against the tree before
execution — the Prisma short-circuit and the db.update no-op
verified live on a scratch db, the POST routes' null pass-through
confirmed (the schema layer is the only gap), and two same-commit
pin recalibrations identified (the parity-220 contiguous string,
the parity-222 import form).

The pins born RED: **38 RED + 1 green-by-design genus guard**
(tests/parity-236.test.ts, 39 checks; one pin tightened to the
z.preprocess form after a pre-cure false-pass) + the schemas-finance
riders (14 checks, all RED at the missing seams) + the parity-235
timer/cleanup pins (F-236h). Two e2e legs born RED against the
standing pre-cure .next artifact — the empty-put probe answered 404
and the revocation face never rendered (the honest failures, no
stash round-trip needed: the build predated the cures).

The cures: **the empty-put 400** (F-236a — the updateSchema guard
over the five update schemas: `{}` and unknown-only bodies answer
the honest "No fields to update" 400 through the existing parseBody
issue mapping; the three-state single-field semantics unchanged);
**the transient-503 family completion** (F-236b — isTransientDbError
joins the db helpers, ERR.UNAVAILABLE() joins the envelope family
with the auth routes' byte-identical copy, and a brace-depth-matched
sweep armed all 33 catch sites across the 19 route files — the
first sweep's budgets outer-arm variable bug caught in diff review
and re-run clean); **the field-clear normalization** (F-236c — the
clearableDateField seam at all eight nullable-date sites, the
create twins join the nullable contract, color/icon ride the same
preprocess on both twins — one uniform clear shape works everywhere);
the toast-dismiss padding (F-236d — 26×26px); the dashboard glyph
wrap (F-236e); **the mid-flight revocation face** (F-236f — the
shell reads the store's OWN user and gates on
hydrated-and-settled-null: the guest-wall face re-establishes the
login wall client-side with the from_url round-trip; the logout
path's hydrated/loading reset keeps it clear); the stale comment
reword (F-236g); the timer pins (F-236h); the valuenow precision
(F-236i); the dead-arm register (F-236j — in words, never a
class-shaped form); the PAD retrospective forms (F-236k).

## The verification

The full offline gate: **lint 0/0 · tsc 0 · 1391/1391 unit (84
files, +54) · build · smoke 15/15 · 142/142 e2e** (the empty-put
probe + the revocation-face leg, both RED-proven). ALL SIX parity
drift gates CLEAN at 0-event margin — the four sweep classes
(1440/390/768/1024) + the fullpage sweep clean on the first
post-cure run; **the interior census REDed on the maiden run**: the
F-236e span is one element INSIDE main on a census-visible surface
(+1 unexplained on desktop/phone/landscape; the tablet axis
classifies it into the wrapper-twin genus, 259 → 258) — re-derived
per the R-7.10 doctrine (the touched page re-measured, same commit,
the decode documented in the table, the tool-test pins recalibrated)
and CLEAN at 0-event margin on the re-run. **The round's live
lesson:** "DOM-inert on captured faces" is only true for CLOSED
dialogs — an element-adding a11y cure on a VISIBLE surface shifts
the census. census MATCH; `bun audit` unchanged; docs-counts 13/13
after the lockstep.

The capture set 149-151 (scripts/captures-236.ts, on the
own-database convention + the F-226g liveness check): **149** the
mobile drawer at 390×844 with all 9 destinations + Sign Out (the
standing operator ask, asserted by link census); **150** the
mid-flight revocation face (F-236f — asserted: the status face
visible AND the from_url redirect fired; **the round's second live
lesson**: under the dev server the face's natural window is
SUB-POLL — it rendered and redirected in well under one waitFor
interval, while the e2e leg on the slower production build needed
no hold; the capture arms a brief route-interception delay on the
/login navigation so the face stays paintable; the sparse 5KB PNG
pixel-verified non-blank with a bespoke byte floor); **151** the
live toast with the padded dismiss target (F-236d — asserted
26×26px over the 24px floor; the locator rides the always-mounted
polite viewport, the per-card status role retired at F-218h). The
census tripwire MATCHed at exit; custom.db untouched; all three
faces VLM-verified.

## The lockstep and the delivery

docs-counts 1337→1391 / 83→84 / the badge 1477→1533 / the pins row
54→55 with parity-236 (twelve stale sites chased across
CLAUDE/README/PAD/SKILL/AGENTS); README (the program row, the
verification row, the badge, the testing table, the stack table,
the file hierarchy); AGENTS (the counts + four new gotchas: the
Prisma empty-data short-circuit, the census-visible superset
element, the sub-poll capture window — joining the standing set);
CLAUDE (the gate contract, the command table, the test pyramid);
PAD (the v2.33.0 revision block, the §7.1 distribution rows + the
pins row, the §9/§10/ADR-006 sites, the F-228e retrospective forms
corrected — F-236k); SKILL (the header, the stack table, the
commands, the pre-ship checklist); the plan closed (R-33 → Done,
the §5 execution row); the worklog entry; this record.

R-33 is shipped and verified. No open R-item; the recorded-not-cured
tail (F-236l the SSR/hydration date stability, F-236m-r the
postures, plus the standing F-235o + F-234l-n + F-233l-o + F-232j-o
families) stays documented in the plan. Next session defaults to
findings-led iteration — re-send the standing directive and it will
refresh, re-audit, and continue the rhythm.
