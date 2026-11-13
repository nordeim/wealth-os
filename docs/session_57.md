# Session 57 — repo session 237 (R-34): the error-face, transient-seam, and remount-gate round

The owner re-sent the standing directive after the R-33 record pair
(docs/session_55.md + the owner's session_56.md log capture of the
session-236 round). Per the recorded rhythm, this session defaulted to
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

The baseline gate was GREEN at HEAD 0773de0 — the exact v2.33.0
ship state reproduced, no cold-baseline discovery this round: lint
0/0 · tsc 0 · 1391/1391 unit (84 files) · build · smoke 15/15 ·
142/142 e2e.

The standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the demo data zero, the desktop nav 256/9, the
TRUE-390 menu census standing — the reference's own mobile menu
opens with 9 destination links). `bun audit` unchanged (1 moderate
dev-chain). The neo-crm upstream check: unchanged (b3d0fbe) —
nothing to port. The SEO surface verified (smoke leg 12: sitemap +
robots + manifest 200 on the standalone artifact). The .env
contract, the db/ at the repo root, the vitest/playwright configs,
and the .env.example six-knob set all standing.

## The fresh-eyes audit — one High, and it was a regression

Three Mode-C passes (the R-33 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 1 High / 3 Medium / 8 Low / 12 Informational** raw
after dedup (the transient-seam gap found by two passes, deduped).
The driving session re-verified every material claim at file:line;
R-33's cures all verified holding — except the one the audit
live-reproduced against the standalone.

The High: **the F-236f regression** — the revocation gate keyed on
`storeUser === null`, but the store's non-401 failure branch commits
`{ hydrated: true, loading: false, error }` WITHOUT touching `user`
(on a first load it is still the initial null), so the gate cannot
distinguish "unauthenticated" from "fetch failed" and its early
return fires ahead of the error banner: a 500, a 503 (the F-236b
family's own answer class), and a network abort ALL bounced a
valid-session user to `/login?from_url=…` with zero banners — the
F-216c/d "Couldn't load your data" + Try-again face was unreachable
in its primary scenario. No e2e covered the failure face, so nothing
failed.

The Mediums: the transient-503 family counted only the in-route
arms — `requireSession()`'s own catch (the one DB call EVERY
protected route makes) and the six auth routes' catches (login,
signup, verify, resend, logout, me) answered the generic 500 for a
P2024/P2028 while their own siblings carried the honest 503; and the
`/` ↔ section-route AppShell remount — the root dashboard route and
the (app) group render two tree positions, the post-login landing
on `/` makes the first sidebar click a remount, and the mount
effect's hydrate() unconditionally re-gated with loading:true (a
full-screen loader over already-loaded data plus a redundant
dashboard+settings refetch, despite the store living on globalThis
precisely so it survives the remount).

The Lows: the upload route's pre-write capacity read outside the
try its own docblock claims covers it; the whitespace-only clear
divergence (icon stored the empty string, color and the clearable
dates 400'd, only the notes family cleared); the import parse
window's missing pending face; the three refresh controls' missing
busy riders (the F-236r(a) posture); GuestLoginRedirect's status
region arriving with its content (the F-218h genus' fifth surface);
the F-236j register's missed small size arm. The Informations: the
presence-only route-pin residual, the upload arm's
unreachable-but-defensive standing, the import idempotency posture,
the auth-funnel full-row reads, the dateField year range, the
drawer-open skip-link window, the avatar luminance approximation,
the dead defensive pathname arm, the placeholder-color exemption
note.

## The plan and the TDD execution

The plan v2.34.0 written (the F-237a-r ledger + the R-34 section +
the §5 execution row) and validated against the tree before
execution — four same-commit pin recalibrations identified (the
parity-236 F-236c/F-236f pins, the parity-217 F-217k pin, the
parity-232 F-232g pin, the parity-234 F-234a pin) and every cure
verified DOM-inert on the census-visible surfaces by construction.

The pins born RED: **parity-237 (21 checks, all RED)** + **the
store-hydrate behavioral battery (6 checks — 2 RED, 4 green-by-
design genus guards)** + **the schemas-finance whitespace riders (3
checks, all RED)** + **the 500-hydrate e2e leg RED against the
pre-cure build** (the failure face bounced to the login wall — the
honest regression proof, no stash round-trip needed: the standing
.next artifact predated the cures).

The cures: **the error-face restoration** (F-237a — the gate's
auth-specific discriminator: the 401 branch commits error-null
alongside user-null, so `&& !storeError` fires the wall ONLY for
the revocation; refreshAll gains the UNAUTHORIZED branch mirroring
hydrate's — the mid-session revocation window joins the wall
instead of the "Sign in required" banner over a stale workspace);
**the transient-seam completion** (F-237b — the arm joins
requireSession's catch and the six auth routes' catches; the
parity-237 family pin covers the seam + the six with the tightened
arm form; the parity-236 comment drift corrects); **the remount
gate** (F-237c — hydrate's remount discriminator: a live user in
the store means refresh in place, no loading re-gate; first loads
and the failure-face retry keep the gate); the upload pre-write
wrap (F-237d); the whitespace-clear normalization (F-237e — all
five preprocess guards ride the trim-aware form); the import
pending face (F-237f); the refresh busy riders (F-237g); the
redirect-face live-region seed (F-237h — the F-235a zero-delay
timer with its cleanup); the register completion (F-237i).

Two test-authoring lessons surfaced inside the RED/GREEN cycle
itself and were fixed before anything shipped: a shared Response
constant's body is consumed on first read (factories, never
constants — a genus guard failed on the call() seam's fallback
message), and the globalThis store singleton survives
vi.resetModules (each leg drops the key or the previous test's
user leaks into the next — the first-load control leg caught it).

## The verification

The full offline gate: **lint 0/0 · tsc 0 · 1421/1421 unit (86
files, +30) · build · smoke 15/15 · 143/143 e2e** (the 500-hydrate
probe, RED-proven). **All six parity drift gates CLEAN at 0-event
margin** — the four sweep classes (1440/390/768/1024) + the
fullpage sweep + the interior census, clean on the first post-cure
run (no census-visible DOM change by construction — the round's
design claim held). census MATCH; `bun audit` unchanged;
docs-counts 13/13 after the lockstep.

**The round's live lesson:** Next's route announcer carries the
alert role on app pages — the new e2e leg's bare
`getByRole("alert")` passed standalone and failed inside the full
battery on the strict-mode double match (the announcer mounts on
navigation, a timing-dependent second match). The locator scopes by
text now; the lesson joins the AGENTS gotcha set (locator
discipline: scope by content when a role is framework-shared — the
same family as the positional-selector lesson A-12).

The capture set 152-154 (scripts/captures-237.ts, on the
own-database convention + the F-226g liveness check): **152** the
mobile drawer at 390×844 with all 9 destinations + Sign Out (the
standing operator ask, asserted by link census); **153** the
first-load failure face (F-237a — asserted: the banner + Try-again
visible AND the URL still on the app route, never the login wall;
the face is STABLE on the failure path — no navigation hold
needed, the mirror image of last round's sub-poll revocation
window); **154** the transient-503 face (F-237b — asserted: the
byte-exact UNAVAILABLE family copy rendered through the banner).
The census tripwire MATCHed at exit; custom.db untouched; all
three faces pixel-verified non-blank (191/233/234 gray levels) and
VLM-verified.

## The lockstep and the delivery

docs-counts 1391→1421 / 84→86 / the badge 1533→1564 / the pins row
55→56 with parity-237 + the infrastructure row 25→26 with
store-hydrate (16 stale sites chased across CLAUDE/README/PAD/
SKILL/AGENTS); README (the badge, the stack table, the testing
table, the hierarchy, the verification row, the R-34 program row);
AGENTS (the counts + four new gotchas: the gate-state/failure-
branch collision lesson, the remount re-gate lesson, the
family-seam enumeration lesson, the route-announcer locator
lesson); CLAUDE (the gate contract, the command table, the test
pyramid); PAD (the v2.34.0 revision block, the §7.1 distribution
rows + the pins row, the §7.4 checklist, the §9/§10 sites); SKILL
(the header, the stack table, the commands, the pre-ship
checklist); the plan closed (R-34 → Done, the §5 execution row,
the next-session number refreshed); the worklog entry; this
record.

R-34 is shipped and verified. No open R-item; the recorded-not-cured
tail (F-237j-r + the standing families) stays documented in the
plan. Next session defaults to findings-led iteration — re-send the
standing directive and it will refresh, re-audit, and continue the
rhythm.
