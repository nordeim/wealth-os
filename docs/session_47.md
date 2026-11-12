# Session 47 — repo session 232 (R-29): the dead-stock retirement, carrier-net repair, and dialog-focus round

The owner re-sent the standing directive after the R-28 record pair
(docs/session_45.md + the owner's session_46.md log capture of the
session-231 round). Per the recorded
rhythm, this session defaulted to findings-led iteration: refresh,
re-audit, remediate, verify, capture, document, commit, push — with
the operator's named asks (the mobile navigation comparison, the
Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.

## Intake — a green cold baseline

A fresh clone (sandbox reset); bun install; the .env rebuilt from
.env.example (the DATABASE_URL="file:../db/custom.db" contract +
a fresh 64-char AUTH_SECRET); db:push/db:seed; the census MATCH
(78/4/3/6/5/7, users=1); the chromium-1254 install the e2e battery
needs.

The baseline gate was GREEN at HEAD f57fb0d — the exact v2.28.0
ship state reproduced, no cold-baseline discovery this round: lint
0/0 · tsc 0 · 1235/1235 unit (78 files) · build · smoke 15/15 ·
139/139 e2e.

The standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the demo data zero, the desktop nav 256/9, the
TRUE-390 menu census standing — the reference's own mobile menu
opens with 9 destination links). `bun audit` unchanged (1 moderate
dev-chain). The neo-crm upstream check: unchanged (b3d0fbe) —
nothing to port. The SEO surface verified (smoke leg 12: sitemap +
robots + manifest 200 on the standalone artifact). The .env
contract, the db/ at the repo root, the vitest/playwright configs,
and the .env.example six-knob set all standing.

## The fresh-eyes audit — every claim confirmed, none inverted

Three Mode-C passes (the R-28 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 0 High / 0 Medium / 13 Low / 9 Informational** raw.
The driving session re-verified every material claim at file:line.
No adjudications this round — and R-28's twelve pinned cures all
verified holding: the F-231b value-comparison guards are
StrictMode-idempotent across every view swap, the F-231h retirement
family intact, the token system mechanically airtight (the palette
and semantic diffs both empty), no aria-hidden misuse, no
layer-map violations, no phantom breakpoints.

The two headline Lows: **four vendored shadcn-stock files carry
zero consumers and no KEEP register entry** (card.tsx, table.tsx,
label.tsx, input.tsx — the F-231h genus, file edition, with their
page-layout riders), and **the parity-229 PROSE_ALLOWLIST itself
carries a compound entry whose first part is a dead utility** —
"border-primary/text-primary" hid border-primary (zero live
consumers) behind its live text-primary sibling; the tabs.tsx
comment riding the entry was the sole carrier emitting the dead
rule. The allowlist is not a carrier sanctuary.

The rest of the round: the Expenses dialog's quick→form step swap
dropped focus to the container (the F-231b genus on the app's
highest-traffic dialog); the hamburger lacked aria-controls (the
drawer had no id); the LoadingBlock live region arrived with its
content (the F-218h genus on the mid-session retry path); the
bg-amber-500 axe sanction arm was stale (every live amber fill
carries stone-900 ink since F-219a — the arm could only ever
sanction a future regression); the upload capacity guard was a
check-then-write race (bounded, but cheap to close); the low tail
(an unused import, a dead prop arm, three dead constant members, a
synchronous object-URL revoke); and --color-line-strong sat pinned,
flipped, and unconsumed with no register entry.

## The plan and the TDD execution

The plan v2.29.0 written (the F-232a-o ledger + the R-29 section)
and validated against the tree. The pins born RED: 20 parity-232
checks — eighteen RED + two green-by-design genus guards (the
import-absence census and the live-family keep list) — plus one
e2e leg born RED with the honest focus failure (Expected focused,
Received inactive at the pre-cure build, verified by a stash
round-trip).

The cures: **the vendored dead-stock retirement** (F-232a — the
four files deleted with their riders, the Event/Activity citation
gone with its file, the F-230f pin retired with its subject, the
parity-228 carriers list recalibrated); **the carrier-net repair**
(F-232b — the tabs citation reworded, the compound allowlist entry
REMOVED so the whole-tree invariant nets the genus, the globals
comment reworded); **the expenses dialog step-swap focus** (F-232c
— the prevStepRef value-guard effect; quick→form the description
input, form→quick the Quick Select heading; edit-opens land on the
form's primary control); **the hamburger aria-controls** (F-232d);
**the always-mounted loading live region** (F-232e — outside main,
the census-safe placement; LoadingBlock becomes the visual only;
the F-224aa pin re-anchored); **the stale amber arm retirement**
(F-232f); **the upload post-write re-check** (F-232g — unlink on
breach); the low tail (F-232h); **the line-strong registration**
(F-232i — the F-224t reserved register).

The recursive genus, caught twice more by the parity-229 whole-tree
carrier invariant: the retirement comments themselves named the
retired identifiers (the riders note, the BrandMark note) and the
line-strong registration cited the utility forms verbatim — all
reworded per the F-229d discipline. Five invariant catches across
three sessions now. The AGENTS gotcha gained the allowlist edition:
a compound entry is only honest when EVERY part is live or visibly
not-a-class.

## The verification

The full offline gate: **lint 0/0 · tsc 0 · 1254/1254 unit (79
files, +19) · build · smoke 15/15 · 139/139 e2e** (the step-swap
focus assertions extend the existing +$10 quick-add leg). ALL SIX
parity drift gates CLEAN at 0-event margin (the four sweep classes
1440/390/768/1024 + the fullpage sweep + the interior census).
census MATCH; `bun audit` unchanged; docs-counts 13/13 after the
lockstep.

The capture set 137-139 (scripts/captures-232.ts, on the
own-database convention + the F-226g liveness check): **137** the
mobile drawer at 390×844 with all 9 destinations + Sign Out and the
trigger↔drawer aria pair live (asserted: aria-controls + the id —
F-232d); **138** the Add Expense form with focus landed on
Description after the quick-select prefill (asserted on both the
manual and chip paths, plus the Back swap's heading focus —
F-232c); **139** the desktop shell at the standing 256px/9-links
geometry with the always-mounted loading region pre-existing empty
outside main (asserted: the sidebar census genus + the region's
presence, placement, emptiness, and sr-only clip — F-232e +
F-232h). The census tripwire MATCHed at exit; custom.db untouched.

## The lockstep and the delivery

docs-counts 1235→1254 / 78→79 / the badge 1374→1393 / the pins row
50→51 with parity-232; README (the badge, the stack table, the
testing table, the hierarchy, the verification row, the R-29
program row); AGENTS (the counts + the F-229d gotcha's allowlist
edition); CLAUDE (the gate contract); PAD (the v2.29.0 revision
block, the live sites, the pins row); SKILL (the counts); the plan
closed (R-29 → Done, the §5 execution row); the worklog entry;
this record.

R-29 is shipped and verified. No open R-item; the recorded-not-cured
tail (F-232j the whole-store subscription idiom — a dedicated
round; F-232k the import replay guard; F-232l the first-admin race
— role is inert; F-232m the CSP posture; F-232n/F-232o the comment
hygiene pair; plus the standing F-217m/F-215m/F-210a/F-214l/
F-230b/F-230g/F-231m-r family) stays documented in the plan. Next
session defaults to findings-led iteration — re-send the standing
directive and it will refresh, re-audit, and continue the rhythm.
