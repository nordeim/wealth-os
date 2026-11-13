# Session 59 — repo session 238 (R-35): the history-width, third-window, and slice-hygiene round

The operator re-sent the standing directive after the R-34 ship pair
(eeabf52 + the owner's session_58.md log capture). Per the recorded
rhythm, this session defaulted to findings-led iteration: refresh,
re-audit, remediate, verify, capture, document, commit, push — with
the operator's named asks (the mobile navigation comparison, the
Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.

## Intake — a green cold baseline

A fresh clone (sandbox reset); bun install (601 packages, the prisma
client regenerated into src/generated/prisma); the .env rebuilt from
.env.example (the DATABASE_URL="file:../db/custom.db" contract + a
fresh 64-char AUTH_SECRET); db:push/db:seed; the census MATCH
(78/4/3/6/5/7, users=1). The chromium-1254 install the e2e battery
needs landed.

The baseline gate was GREEN at HEAD 7a66465 — the exact v2.34.0
ship state reproduced, no cold-baseline discovery this round: lint
0/0 · tsc 0 · 1421/1421 unit (86 files) · build · smoke 15/15 ·
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

## The fresh-eyes audit — a session-199 original, hiding from every gate

Three Mode-C passes (the R-34 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 1 High / 2 Medium / 2 Low / 10 Informational** raw
after dedup, every material claim re-verified at file:line by the
driving session; R-34's nine cures verified holding; the recorded
tail (F-237j-r) re-verified at its recorded status.

The High: **the F-238a history-width defect** — the Expenses
history list has rendered INSIDE the page-header flex row since
the session-199 original: the `<Tabs>` wrapper (tablist AND all
four panels — the whole list body) was the row's second flex item,
so at every viewport ≥ sm the entire list collapsed to a ~427px
right-side column while the h2 floated vertically centered beside
it. Live-measured by the driving session on the standalone with a
scratch probe (the list ul x=957 w=427 h=4330 inside the 1120px
card at 1440; the same squeeze at 1280; correct at 390 where the
row stacks), and against the reference (its own history card
stacks the title, the tablist, and the content full-width —
live-probed). Invisible to every gate: the drift sweeps capture
the ZERO-DATA state (the squeezed element's computed classes are
unchanged — the genus is geometry, not classes), the interior
census counts elements (unchanged by nesting moves), and the e2e
legs were functional-only. The F-221f/F-225d gate-blind-spot
genus: a visible defect no gate models — for 39 sessions.

The Mediums: the third revocation window (F-238b — the wall
covered hydrate and refreshAll, but all 18 mutation actions
refreshed only on success: a revocation surfacing on the mutation
POST itself toasted "Save failed — Sign in required" over a dead
stale workspace, the wall unreachable without a navigation) and
the slice hygiene (F-238c — neither UNAUTHORIZED branch cleared
the domain slices: the compound path revocation-without-logout →
different-user sign-in → failed first hydrate rendered the
PREVIOUS user's financial data under the error banner).

The Lows: the sync fs walk on the uploads request paths (F-238d —
the F-235d availability genus' fs edition: readdirSync + statSync
per entry, twice per upload POST, plus a per-call mkdirSync); the
dead dompurify override (F-238e — the package does not exist in
the dependency graph); the popover-under-sticky-header scroll
edge (F-238f); the stale sitemap docblock (F-238g). The
Informations cured this round: the transient-arm unification
(F-238k — five inline arms across forgot-password,
reset-password, and reset join the seam), the health docblock
splice (F-238l), the explicit-any net (F-238m — the F-214k
precedent), the dead boot-loop arm (F-238n), the uploads comment
(F-238o), the isTransientDbError behavioral rider (F-238i), and
the mobile-nav e2e completion (F-238p — the Shift+Tab backward
leg + the scroller-lock assertion).

## The plan and the TDD execution

The plan v2.35.0 written (the F-238a-q ledger + the R-35 section
+ the header) and validated against the tree before execution —
the same-commit pin recalibrations identified up front (the
auth-reset forms, the parity-217/218/220 store pins, the
parity-229 carrier net, the parity-233/234/235 upload+reset
forms, the parity-237 mirror, the sweep-tool and
interior-census-tool literals, the uploads-path promise forms,
the docs-counts constants).

The pins born RED: **parity-238 (20 checks: 19 RED + 1
green-by-design genus guard)** + **the store-hydrate extensions
(4 checks — 3 RED, 1 genus guard)** + **the db-transient
behavioral rider (6 checks, green at birth — the helper's
acceptance set pinned behaviorally for the first time)** + **the
mutation-401 e2e leg and the history-geometry e2e leg, both
RED-proven against the standing pre-cure .next artifact** (the
stash-free proof) + the mobile-nav Shift+Tab + scroller-lock legs
(green at birth, the coverage completion).

The cures: **the history-width restoration** (F-238a — the Tabs
wrapper hoists out of the header flex row to a direct section
child: the h2 keeps its header row, the tablist renders below it,
the four panels carry the list full-width — the reference's own
form; the repo's first GEOMETRY-based e2e pin lands with it: the
active tabpanel ≥ 90% of the card's width at the left edge);
**the third revocation window** (F-238b — one shared
`mutate(path, init, set)` wrapper owns the F-217l entry-captured
token, the F-216d post-success refresh, AND the 401 wall commit;
all 18 actions ride it; updateSettings and askCoach carry the arm
inline behind their own token guards); **the slice hygiene**
(F-238c — the shared `commitRevocationWall` commits the
logout-parity clear on all three 401 surfaces: the user nulls
with error-null (the F-237a discriminator keeps firing the wall)
and every domain slice empties); plus the async uploads walk, the
dompurify retirement, the popover scroll-close, the docblock set,
the transient-arm unification, the any-net, the dead arm, the
rider, and the mobile-nav legs.

Two test-authoring lessons surfaced inside the RED/GREEN cycle
and were fixed before anything shipped: the round's own cure
comments tripped the scanners three times (a hyphenated layering
nickname the parity-229 whole-tree invariant caught; the retired
sync-fs call names the parity-238 pin greps; the dead boot-env
disjunct quoted verbatim — the F-229d discipline's catches seven
and eight: describe, never cite, in cures AND pins), and the
mutation-401 e2e leg's transient-face assertion timed out against
an already-landed login wall (the redirect completed in under one
poll interval — the leg now asserts the from_url round-trip, the
redirect's signature; the F-236f captures lesson's e2e edition).

## The verification

The full offline gate: **lint 0/0 (under the strengthened
any-net) · tsc 0 · 1450/1450 unit (88 files, +29) · build ·
smoke 15/15 · 147/147 e2e** (the mutation-401 wall and the
history-geometry legs RED-proven; the two mobile-nav genus legs
green at birth). **All six parity drift gates CLEAN** — the
expenses page's allowances re-derived same-commit per the F-236e
doctrine's geometry edition (the tablet sweep baseline
29.1→30.5; the census mainH phone −261→−273, landscape 103→119;
the element census itself unchanged — same nodes, different
nesting; the tool-test pins recalibrated in-commit with the
decode documented). census MATCH; `bun audit` unchanged (the
override retirement is lockfile-neutral to the advisory census);
docs-counts 13/13 after the lockstep.

The capture set 155-157 (scripts/captures-238.ts, on the
own-database convention + the F-226g liveness check): **155** the
mobile drawer at 390×844 with all 9 destinations + Sign Out (the
standing operator ask, asserted by link census); **156** the
restored full-width Expense History at 1440 (asserted: 70 rows at
1072px inside the 1120px card, ≥90% width at the left edge — the
pre-cure squeeze was 427px at the card's right side); **157** the
mutation-401 wall face (held by the route-delay pattern;
asserted: the redirect face + the from_url round-trip). The
census tripwire MATCHed at exit; custom.db untouched; all three
faces pixel-verified non-blank and VLM-verified — the round's
live rider honestly recorded: the action's own failure toast
rides the wall's redirect face for its auto-dismiss window
(F-238q — the toast is accurate feedback for the failed action;
the wall owns the screen; no stale workspace).

## The lockstep and the delivery

docs-counts 1421→1450 / 86→88 / the badge 1564→1597 / the e2e
143→147 / the arch-pins row 56→58 (parity-238 + db-transient) —
35 assert-each replacements across CLAUDE/README/PAD/SKILL/
AGENTS/tests; README (the badge, the stack table, the testing
table, the hierarchy, the verification row, the R-35 program
row); AGENTS (the counts + five new gotchas: the geometry-genus
pin, the shared-wrapper convergence, the redirect-outcome e2e
form, the carrier-comment catches, the F-238q rider's record);
CLAUDE (the gate contract, the command table, the test pyramid);
PAD (the v2.35.0 revision block, the §7.1 distribution rows +
the pins row, the §7.4 checklist, the §9/§10 sites); SKILL (the
header, the stack table, the commands, the pre-ship checklist);
the plan closed (R-35 → Done, the §5 execution row); the worklog
entry; this record.

R-35 is shipped and verified. No open R-item; the
recorded-not-cured tail (F-238h + F-238q + the F-237j-r standing
families) stays documented in the plan. Next session defaults to
findings-led iteration — re-send the standing directive and it
will refresh, re-audit, and continue the rhythm.
