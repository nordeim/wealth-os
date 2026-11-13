# Session 61 — repo session 239 (R-36): the wall-token, recovery-gate, and hydration-window round

The operator re-sent the standing directive after the R-35 ship pair
(149d6e5 + the owner's session_60.md log capture). Per the recorded
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
(78/4/3/6/5/7, users=1). The chromium-1254 install the e2e battery
needs landed.

The baseline gate was GREEN at HEAD b1be1ca — the exact v2.35.0
ship state reproduced, no cold-baseline discovery this round: lint
0/0 · tsc 0 · 1450/1450 unit (88 files) · build · smoke 15/15 ·
147/147 e2e.

The standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the demo data zero, the desktop nav 256/9, the
TRUE-390 menu census standing — the reference's own mobile menu
opens with 9 destination links). `bun audit` unchanged (1 moderate
dev-chain). The neo-crm upstream check: unchanged (b3d0fbe) —
nothing to port. The SEO surface verified (smoke leg 12: sitemap +
robots + manifest 200 on the standalone artifact). The .env
contract, the db/ at the repo root, the vitest/playwright configs,
and the .env.example six-knob set all standing.

## The fresh-eyes audit — one race inside the new wall, one genus probed to the register

Three Mode-C passes (the R-35 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 1 High / 3 Medium / 13 Low / 18 Informational** raw
after dedup, every material claim re-verified at file:line by the
driving session; R-35's seven cure surfaces verified holding — and
pass A found ONE residual race inside the F-238b wall machinery
itself.

The Mediums: **the F-239a wall-token race** — commitRevocationWall
cleared every slice but never advanced sessionWriteToken, so a fetch
already in flight when the wall fired (its server-side read
predating the revocation, answering 200 with the OLD user's data)
still held the live token and committed AFTER the wall —
re-populating the just-cleared ledger over the login wall until the
next fetch 401s and re-walls (the store's guard chain re-read in
full: the logout branch's own F-217l bump was the missing half);
**the F-239b recovery gate** — the reset's atomic write updated the
hash, consumed the token, bumped the version, and left
verificationCodeHash standing, so a never-verified account (the
exact population most likely to need forgot-password) completed the
entire reset funnel and STILL answered the login gate's 403; and
**the F-239c hydration timezone window** — the dashboard's date
subtitle and the analytics date inputs derive from render-time
clocks on server-rendered client pages: a server and client on
different calendar dates (the daily TZ window) diverge at the text
level — a React 19 hydration error in that window, invisible to
every gate (the F-218d UTC-sandbox-blind genus).

The High (the Select/Menu keyboard-highlight wash computing below
the 3:1 focus-indicator guidance) was adjudicated by LIVE REFERENCE
PROBE — the F-226i doctrine before any cure: the reference's own
highlighted option computes rgb(38,38,38) on its dark panel
(scratch-playwright-probed this session) and its light pair was
M-81c2-live-measured at extraction — the same sub-3:1 genus both
apps ship. Unlike the F-221b cure (where OUR dark text was
unreadable — a defect the reference did not share), here the
highlighted text is readable in both modes in both apps; only the
wash-as-indicator is subtle. REGISTERED (F-239l), the
F-224y/F-230a pattern — a wash step-up would deviate from the
pinned interactive genus on every combobox. The reference's own
Expenses-history title (a bare div — F-239m recorded with the probe
evidence) and its justify-center segmented track (F-239n) were
probed in the same pass.

## The plan and the TDD execution

The plan v2.36.0 written (the F-239a-s ledger + the R-36 section +
the header) and validated against the tree before execution — the
pin interactions mapped up front (parity-238's wall-body keys
compatible with the bump line; the auth-reset updateMany pins
compatible with the new fields; owner-scoping's readSettings pins
riding the GET path; route-case's Dark-Mode regex and the mobile-nav
e2e's substring name-matching both compatible with the sr-only
suffix; parity-229's carrier invariant safe — the round's cited
utilities are live code).

The pins born RED: **parity-239 (14 checks: 13 RED + 1
green-by-design genus guard** — the F-239e key-set parity tie, after
its first draft's indentation-anchored regex was fixed to slice from
the construction site)** + the auth-reset extension (1 RED)** + the
store-hydrate behavioral extensions (**the late-200-after-wall leg
RED** — a held-pending dashboard 200 resolving after a mutation-401
wall re-populated the store on the pre-cure tree, observed live; the
idempotence, inline-arm, composition, and logout-mid-mutation legs
green at birth)** + the reset e2e leg RESTRUCTURED to the
never-verified population** — RED-proven against the pre-cure build
via the stash-rebuild-stash-pop cycle (the honest proof: the
pre-cure login step answered the 403 gate), GREEN post-cure, at
ZERO extra signup cost (the F-229a signup-budget lesson's
restructure-before-you-add form).

The cures: **the wall's write-token bump** (F-239a — the wall
advances the token before its set; every in-flight guard discards
late landings; all three wall callers compare their token BEFORE
invoking the wall, so the bump is sequencing-safe); **the recovery
gate** (F-239b — the reset clears the verification pair + attempts
counter: the reset token's possession proves email control, exactly
what verification attests); **the hydration timezone window**
(F-239c — suppressHydrationWarning on the subtitle carrier + both
date inputs, the theme-bootstrap's own pattern for inherent
server/client divergence); plus the store-battery completion
(F-239d), the logout↔wall key-set parity pin (F-239e), the 507
operator-copy truth (F-239f), the settings upsert (F-239g — the
budgets-POST house form), the upload catch arms (F-239h), the
Dark-Mode sr-only state suffix (F-239i), the desktop sidebar's
internal scroll (F-239j — the F-219h drawer cure's desktop twin),
and the dead animation-token retirement (F-239k).

## The verification

The full offline gate: **lint 0/0 · tsc 0 · 1469/1469 unit (89
files, +19) · build · smoke 15/15 · 147/147 e2e** (the restructured
reset leg GREEN in the full battery). **All six parity drift gates
CLEAN — the standing allowances held UNMOVED**: the round's surfaces
are pixel-invisible (sr-only, overflow-when-fits, a React-side
suppression attribute) or outside the censused DOM (the sidebar), so
no baseline re-derivations were needed — the plan's own prediction,
confirmed. census MATCH; `bun audit` unchanged.

The capture set 158-161 (scripts/captures-239.ts, on the
own-database convention + the F-226g liveness check): **158** the
mobile drawer at 390×844 with all 9 destinations + Sign Out (the
standing operator ask, asserted by link census); **159** the desktop
user menu open with the state-exposed theme item (asserted: the
accname match + the suffix span clipped to 1×1px — the visible
label stays the reference's own string); **160** the desktop
sidebar at 1024×600 scrolled to its footer (asserted: the nav's
overflow-y computes auto + the user email scrolls into view — the
pre-cure clipped it unreachable); **161** the analytics date inputs
(asserted: both carry yyyy-mm-dd values + the tab family responds —
the suppression is inert when the clocks agree). The census tripwire
MATCHed at exit; custom.db untouched; all four faces pixel-verified
non-blank.

## The lockstep and the delivery

docs-counts 1450→1469 / 88→89 files / the badge 1597→1616 / the
arch-pins row 58→59 (+parity-239) — 22 assert-each replacements
plus 2 SKILL stragglers the pin itself caught (13/13 GREEN);
README (the badge, the status row, the stack table, the hierarchy,
the testing table, the R-36 program row); AGENTS (the counts + five
new gotchas: the clear-without-bump genus, the recovery-gate
enumeration rule, the clock-suppression form, the parity-pin
authoring lessons); CLAUDE (the gate contract, the command table,
the test pyramid); PAD (the v2.36.0 revision block, the §7.1
distribution + pins rows, the §9/§10 sites); SKILL (the header, the
stack table, the commands, the pre-ship checklist); the plan closed
(R-36 → Done, the §5 execution row); the worklog entry; this
record.

R-36 is shipped and verified. No open R-item; the
recorded-not-cured tail (F-239l-n + F-239o-s + the F-238h/q +
F-237j-r standing families) stays documented in the plan. Next
session defaults to findings-led iteration — re-send the standing
directive and it will refresh, re-audit, and continue the rhythm.
