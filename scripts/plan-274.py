#!/usr/bin/env python3
"""Session-274 plan write — remediation_plan_v2.md v2.70.0 → v2.71.0
(R-71, the predicate-outlier, mechanism-truth, and phantom-pin round).

Insertions only, every site asserted (the F-242j lesson): the new
Current-version header block (the v2.70.0 block flips to Previous),
the §2.32 ledger (before §3's heading), and the R-71 section (above
R-70's). The §5 execution-history row rides scripts/history-274.py at
lockstep time (after the gate runs, so the counts carry the verified
values)."""

import sys


def insert_before(text: str, anchor: str, block: str, label: str) -> str:
    n = text.count(anchor)
    if n != 1:
        sys.exit(f"[{label}] expected 1 anchor, found {n}: {anchor[:60]!r}")
    return text.replace(anchor, block + anchor, 1)


with open("docs/remediation_plan_v2.md", encoding="utf-8") as f:
    p = f.read()

# ---- 1. the head: flip v2.70.0 to Previous, insert v2.71.0 above it -----
CUR_HEAD = "> **Current version: v2.70.0** (session 273 — the"
if p.count(CUR_HEAD) != 1:
    sys.exit("[head] the v2.70.0 Current header not found in the expected form")
p = p.replace(CUR_HEAD, "> **Previous version: v2.70.0** (session 273 — the", 1)

NEW_HEAD = """> **Current version: v2.71.0** (session 274 — the
predicate-outlier, mechanism-truth, and phantom-pin round R-71: the
operator re-sent the standing directive after the R-70 ship pair
(a2ddc41b + the owner's db2215bf session-log update carrying
docs/session_130.md, the session-273 transcript — fetched by the
git-pull refresh and reviewed at intake per the odd-number record
convention, this record riding docs/session_131.md). Per the
recorded rhythm, findings-led iteration: refresh, re-audit,
remediate, verify, capture, document, commit, push — with the
operator's named asks (the mobile navigation comparison, the
Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.)

The intake: the workspace STOOD (no reset this session — the tree
clean at HEAD db2215bf after the git-pull refresh brought the
owner's session-log update; the environment verified in place: the
.env on the DATABASE_URL="file:../db/custom.db" contract, db/ at the
repo root, node_modules live, census MATCH (81/4/3/6/5/7, users=1)).

THE COLD BASELINE GATE GREEN AT HEAD — the v2.70.0 ship state
reproduced exactly, no discovery: lint 0/0 · tsc 0 · 1981/1981 unit
(125 files) · build (the 4 documented Turbopack tracing warnings) ·
smoke 15/15 · 161/161 e2e · census MATCH.

The standing layers: probe:ref STABLE on every layer (the app
bundle 1,402,874 bytes / md5 6d3779af…, the stylesheet md5 96f24d45…,
the demo-data ZERO census, the desktop nav census 256px · 9 links,
the TRUE-390 menu census opens=true · 9 destinations) · **the
mobile-nav comparison verified on BOTH sides at TRUE 390×844** (the
reference through probe:ref's TRUE-390 menu census; the clone side
riding the standing comparison-265.ts on the production artifact
over the scratch db/comparison.db — pre-open 0 · 9 destinations +
Sign Out · aria-expanded true→false · post-close 0 · census
tripwire MATCH · no Tailwind v4 regression) · `bun audit` UNCHANGED
(the 1-advisory dev-chain census the R-69 re-anchor carries — the
minimatch moderate, zero runtime) · neo-crm unchanged (b3d0fbe) ·
the SEO surface verified (smoke leg 12: sitemap + robots + manifest
200; the metadata/pwa/page-titles pins green inside the 1981) · the
.env contract + the db/ at the repo root + the vitest/playwright
configs + the .env.example standing.

The session-274 fresh-eyes audit (three Mode-C research passes
dispatched as parallel research subagents per the house convention,
every material claim re-verified at file:line by the driving
session — the R-70 cure surfaces: all six HOLDING (the parity-273
battery 9/9, parity-229 23/23, parity-243 14/14, docs-counts 18/18
re-run green — 64/64 across the four; the h-screen census over the
whole tree clean, ten min-h-screen safe forms; the docs count family
aligned) · the API/auth/security layer: the TWENTY-SEVENTH
consecutive clean bill (all thirteen house contracts, 45 handlers /
29 route files read line-by-line, the census corrected 30→29; every
candidate dismissed into documented postures — the in-band OTP/reset
knobs, the uploads GET capability-URL publicity, the logout-429
availability edge, the per-navigation unbounded reads, the
Content-type substring gate, the users-PATCH/reset pre-burn safety)
· the UI/a11y/shell layer: all eight standing contracts verified
holding live (the drawer mechanics with the stacked guard, the theme
system with the bootstrap equivalence, the v4 scanner discipline,
the a11y two-gate with the scrollThrough helper, the shell twins,
the geometry pin, the date seams, the escape stacking — 148/148
across the ten re-run batteries)). The genuine rot this round: FOUR
LOW findings (one the driving session's own — the README row's
duplicated lead-in, invisible to every pin) and the registered
notes — 0 Critical / 0 High / 0 Medium / 4 Low / 8 Informational NEW
after dedup, every material claim re-verified at file:line.

The round's flagship: **F-274a the signup unique-violation arm's
duck-typed predicate — the lone Prisma-code outlier of its family**
(its own comment cites "the settings route's pattern" while the code
carries the structural `"code" in e` shape; every Prisma-code
sibling — settings twice, budgets, forgot-password, and the three
db.ts seams — rides `instanceof Prisma.PrismaClientKnownRequestError`;
behaviorally equivalent today, but the one drift a future reader
cannot tell from the pattern the comment names. The uploads family's
structural checks are a DIFFERENT genus — Node fs codes with no
Prisma class — and stay as they are). The round's riders: **F-274b
the drawer sign-out docblock's mechanism claim** (the re-arm it
describes lands on an unmounted component — onNavigate closes the
drawer before the POST resolves; the honest re-arm is the remount's
fresh initial state, the claim true only for the sidebar twin whose
rail stays mounted) · **F-274c the skill doc's phantom dompurify
pin** (the §2 stack table's Validation row still says the npm
override "stays as a defensive pin" in live tense — the override
retired at F-238e when the package left the tree; parity-238 pins
its ABSENCE; the F-272 phantom-primitive genus) · **F-274d the
README remediation row's duplicated lead-in** (the phrase naming
the plan file and its gloss rides TWICE — introduced by the R-69
lockstep's replacement range, preserved by R-70's; the driving
session's own find). Registered: F-274e the reserved softs' dark
asymmetry (cured as the register-note rider — the F-224t comment
now names that only the danger soft flips in dark mode and a future
dark consumer must flip its own token in the same commit), plus the
standing registered postures (the sibling skill doc's config table,
the AGENTS count-family subset, the logout-429 cookie consideration,
the per-navigation reads, the whole-store subscriptions, the toast
double-cast, the analytics render clock).

The execution contract (R-71): the plan v2.71.0 written and
validated against the tree (this script, insertions only, every
anchor asserted) → **R-71.1** the pins born honest RED (the
parity-274 battery — 9 legs over the false forms at HEAD) →
**R-71.2** the cures (the signup arm's instanceof convergence + the
generated-client import; the drawer docblock's remount-truth
reword; the skill doc row's retirement truth; the README row's
dedup riding the lockstep's status-row replacement; the globals
register comment's dark-flip asymmetry note) → **R-71.3** the
verification (parity-274 GREEN · the sibling batteries GREEN ·
docs-counts GREEN at the advanced trio (the v2.71.0 block lands
together with the advance — the F-249b structural gate enforces the
pairing) · lint 0/0 · tsc 0 · the unit suite at the new count ·
build · smoke 15/15 · the FULL e2e battery 161/161 (zero new legs —
the round changes an error-path predicate and comments; no swept
surface moves) · census MATCH · the captures (the standing evidence
faces + the round's touched faces — the signup route's own form
face, the drawer, the flagship dashboard).

"""

p = insert_before(p, "> **Previous version: v2.70.0**", NEW_HEAD, "new-head")

# ---- 2. the §2.32 ledger (before §3's heading) ---------------------------
LEDGER = """### 2.32 Session-274 audit ledger (the fresh-eyes round over the v2.70.0 ship state)

Three Mode-C passes (the R-70 cure surfaces · the API/auth/security
layer · the UI/a11y/shell layer) + the driving session's own
re-verification, every material claim re-verified at file:line. The
API layer's twenty-seventh consecutive clean bill and the UI layer's
eight standing contracts are the round's clean columns; the genuine
rot is one lone idiom outlier, two stale doc-truth sites, and one
duplicated row lead-in.

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-274a | Low | **THE SIGNUP UNIQUE-VIOLATION ARM'S DUCK-TYPED PREDICATE — THE LONE PRISMA-CODE OUTLIER OF ITS FAMILY.** The P2002 catch carries `typeof e === "object" && e !== null && "code" in e && (e as { code?: string }).code === "P2002"` while its own comment (:149-151) claims "(the settings route's pattern)" — and every Prisma-code sibling rides `instanceof Prisma.PrismaClientKnownRequestError && code === "P20xx"`: settings/route.ts:47-48 and :118 (P2002), budgets/route.ts:71 (P2002), forgot-password/route.ts:144 (P2025), and the three db.ts seams isRecordNotFound/isForeignKeyViolation/isTransientDbError (P2025/P2003/P2024/P2028). Behaviorally equivalent today; the hazard is the drift (a comment naming a pattern the code does not follow — the reader cannot tell which is the house form). The uploads family's structural `"code" in error` checks (uploads/[name]:67 ENOENT, upload:204 ENOSPC/EDQUOT) are a DIFFERENT genus — Node fs error codes carry no Prisma class — and are correct as they stand. | `src/app/api/auth/signup/route.ts:152` vs `:149-151` (its own comment) and the sibling forms | **R-71** (the arm converges on the instanceof form + the `@/generated/prisma/client` Prisma import — the settings route's own import; the comment's claim becomes true; pinned by the parity-274 form legs + the family census leg) |
| F-274b | Low | **THE DRAWER SIGN-OUT DOCBLOCK'S MECHANISM CLAIM IS UNTRUE FOR ITS OWN ARM.** The F-250e rider comment says "(a failed POST re-arms for a retry)" — but `onNavigate?.()` fires at activation (:173) and closes the drawer, UNMOUNTING DrawerNav (mobile-nav.tsx:147-156 renders null when closed) before the POST resolves; the `setBusy(false)` re-arm (:178) lands on an unmounted component, a no-op. The BEHAVIOR is correct (a reopened drawer remounts fresh with busy=false — the honest re-arm is the remount itself; the failure surfaces through the store-error banner; the synchronous entry guard at :171 holds) — only the comment's mechanism is wrong, and it is true only for the sidebar twin (sidebar.tsx:104-108) whose rail stays mounted. The F-238d comment-truth genus at the drawer. | `src/components/layout/mobile-nav.tsx:163-167` (the claim) vs `:173` (the unmounting navigate) and `:178` (the no-op re-arm) | **R-71** (the docblock reworded to the remount-truth mechanism — the F-229d discipline binds the reword: describe, never coin; pinned by the parity-274 drawer-docblock legs scoped to the drawer file so the sidebar twin's true claim stands) |
| F-274c | Low | **THE SKILL DOC'S VALIDATION ROW CARRIES A PHANTOM PIN — THE F-272 GENUS.** wealth-os_SKILL.md's §2 stack table says, in live tense, "The `dompurify` npm override (3.4.17 — session 198's critical cure) stays as a defensive pin" — but the override RETIRED at F-238e (session 238) when the package left the tree entirely: zero dompurify matches in package.json and bun.lock (grep-verified), and tests/parity-238.test.ts:168-175 pins the ABSENCE. The row invites a reader to believe a defensive pin exists that does not — the phantom-primitive class the R-69 round cured across four doc sites (F-272b-e), surviving in the one row that round's doc reads never covered. | `wealth-os_SKILL.md:125` (the §2 stack table's Validation row) vs package.json/bun.lock (zero matches) and tests/parity-238.test.ts:168-175 | **R-71** (the row reworded to the retirement truth — the override retired at F-238e when the package left the graph, its absence pinned; pinned by the parity-274 skill-row legs) |
| F-274d | Low | **THE README REMEDIATION ROW'S LEAD-IN RIDES TWICE — a lockstep-mechanical duplication that rode two sessions.** The status row reads "`docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 273: **R-70 shipped…". The R-69 lockstep's status-row replacement (488b49c2) introduced the double — its new cell began with the lead-in phrase while the replacement range started after the phrase's first copy — and R-70's replacement (a2ddc41b, range from "(session 272:" onward) preserved it. Invisible to every pin (docs-counts watches the counts and the R-item citation, never the lead-in). Found by the driving session at re-verification — the audit passes' docs check covered the count family, not the row's prose shape. | `README.md:225` (the Remediation-program status row) vs the R-69/R-70 lockstep replacement ranges | **R-71** (the R-71 lockstep's status-row replacement writes the row whole with the SINGLE lead-in; pinned by the parity-274 single-occurrence leg) |
| F-274e | Informational | **THE RESERVED SOFT TOKENS' DARK ABSENCE — the F-224t register's unnamed asymmetry.** The @theme reserved family defines success/warning/info/-soft (globals.css:139-146) but the .dark block flips ONLY danger-soft (:409, the F-224q cure — the DropdownItem destructive hover's live consumer). Zero rendered consumers ride the other three softs today (the F-224t register's own census), so nothing paints wrong — but a FUTURE dark consumer of an unflipped soft would paint a light chip on a dark surface, the exact genus danger-soft's flip cured. The register comment documents the family as reserved-unwired without naming the asymmetry. | `src/app/globals.css:139-146` vs `:402-409` (the lone dark flip) | **R-71, the register-note rider** (the F-224t comment extended: only the danger soft flips in dark mode; a future dark consumer must flip its own token in the same commit — the F-224q doctrine; pinned by the parity-274 register leg) |
| F-274f | Informational | **THE SIBLING SKILL DOC'S CONFIG TABLE NAMES THE .ts FORM** — neo-crm_SKILL.md:540 carries `vitest.config.ts`, correct for the NEO CRM codebase it documents (its own frontmatter names that repo). Recorded so a future whole-repo config sweep does not misread it as a wealth-os regression. | `neo-crm_SKILL.md:540` | Registered (correct for the sibling repo) |
| F-274g | Informational | **AGENTS.md CARRIES THE COUNT FAMILY ONLY AS THE 1981/161 SUBSET** — no numeric 125-files or 15-smoke claim anywhere in its command table; no stale or conflicting number exists (docs-counts pins only its "docs-counts" mention). Cosmetic either way. | `AGENTS.md:24-29` | Registered (the documented subset; no action) |
| F-274h | Informational | **A LOGOUT TRIPPING THE WRITES BUCKET RETURNS 429 WITHOUT CLEARING THE COOKIE** — the user cannot sign out until the window resets (15 min). The F-243a doctrine deliberately buckets the eviction write; the session stays valid either way; the client sees the error and retries. An availability edge only. | `src/app/api/auth/logout/route.ts:76-78` | Registered (future consideration: answer the 429 but still clear the cookie — the clear is not the state-destructive write the bucket guards) |
| F-274i | Informational | **THE PER-NAVIGATION AGGREGATE READS ARE UNBOUNDED** — dashboard/export/ai-coach read all rows of each family per call (no take), by the documented per-navigation design; growth bounded only by rate caps and the import cap; index backing exists ([ownerId, date] compound). Perf-at-scale consideration, not a defect. | `src/app/api/dashboard/route.ts:22-33` et al. | Registered (documented design; pagination the future shape) |
| F-274j | Informational | **EVERY SECTION PAGE SUBSCRIBES TO THE WHOLE STORE** — the no-selector `useWealthOs()` form re-renders on every store commit; load-bearing memoization + HISTORY_RENDER_CAP bound the cost. The deliberate simplicity trade, consistent house-wide. | the 9 section pages | Registered (fine-grained selectors the future refactor if corpora grow) |
| F-274k | Informational | **THE TOAST EFFECT CLEANUP'S DOUBLE CAST** — `listeners.delete(listener) as unknown as void` is unnecessary (a boolean-returning destructor is assignable). Style only. | `src/components/ui/toast.tsx:58-63` | Registered (simplify in a future touch of the file) |
| F-274l | Informational | **THE ANALYTICS RENDER-TIME CLOCK RE-EVALUATES** — `const now = new Date()` plus two useState initializers re-run per render with values discarded after mount. No behavior impact; the F-267i staleness trade documented for the memo side. | `src/app/(app)/analytics/page.tsx:66-71` | Registered (none needed; a perf-sweep note) |

Recorded, not cured: F-274f through F-274l (F-274e cured as the
register-note rider). The audit's clean columns: the
API/auth/security layer's twenty-seventh consecutive clean bill
(thirteen contracts, 45 handlers / 29 route files — the file census
corrected 30→29 this round) and the UI/a11y/shell layer's eight
standing contracts all holding live (148/148 across the ten re-run
batteries). The round also re-confirmed the standing registered
postures (the ADR-014 in-band OTP/reset delivery, the capability-URL
publicity, the signup enumeration boundary, the Content-type
substring gate's threat model, the role metadata's non-gating).

"""

p = insert_before(p, "## 3. The remediation program (R-items)", LEDGER, "ledger")

# ---- 3. the R-71 section (above R-70's) ----------------------------------
R71 = """### R-71 — The predicate-outlier, mechanism-truth, and phantom-pin round (session 274)

The operator re-sent the standing directive after the R-70 ship pair
(a2ddc41b + the owner's db2215bf session-log update carrying
docs/session_130.md, the session-273 transcript — fetched by the
git-pull refresh and reviewed at intake per the odd-number record
convention). Per the recorded rhythm, findings-led iteration. The
intake and the standing layers are recorded in the version header
above; this section carries the findings, the cures, and the
verification contract.

**The findings (each verified at file:line by the driving session —
the API layer's twenty-seventh consecutive clean bill and the UI
layer's eight standing contracts are the round's clean columns; the
genuine rot is one lone idiom outlier, two stale doc-truth sites,
one duplicated row lead-in, and one register asymmetry):** the §2.32
ledger's rows — F-274a THE ROUND'S FLAGSHIP (the signup P2002 arm's
duck-typed predicate, the lone Prisma-code outlier of its family
while its own comment names the settings route's pattern the code
does not follow) · F-274b/F-274c/F-274d THE DOC-TRUTH TRIO (the
drawer sign-out docblock's re-arm claim untrue for its own unmounted
arm — the honest re-arm is the remount's fresh state, the claim true
only for the sidebar twin; the skill doc's Validation row carrying
the retired dompurify override as a live defensive pin — the F-272
phantom-primitive genus in the one row that round's reads never
covered; the README remediation row's lead-in phrase riding twice —
the R-69 lockstep's mechanical duplication, preserved by R-70's,
found by the driving session at re-verification) · F-274e THE
REGISTER RIDER (the reserved softs' dark asymmetry unnamed in the
F-224t register — only the danger soft flips in dark mode).

**The cures (R-71.2):** the signup arm converges on the family's
instanceof form with the generated-client Prisma import (the
settings route's own import form — the comment's pattern claim
becomes true, and the comment gains the R-71 convergence note); the
drawer docblock rewords to the remount-truth mechanism (the failure
surfaces through the store-error banner; the re-arm is the fresh
initial state a reopen remounts with; the sidebar twin — whose rail
stays mounted — is where an in-place re-arm actually runs); the
skill doc's Validation row rewords to the retirement truth (the
override retired at F-238e when the package left the graph; its
absence from the manifest is pinned); the README row's lead-in
dedups (riding the R-71 lockstep's status-row replacement — the row
written whole with the single lead-in); the globals register comment
extends with the dark-flip asymmetry note (a future dark consumer
must flip its own token in the same commit — the F-224q doctrine).

**The verification contract (R-71.3):** the parity-274 battery born
honest RED against the pre-cure tree (the false forms ride the tree
at HEAD: the duck-typed predicate, the drawer docblock's wrong
mechanism, the phantom pin row, the duplicated lead-in, the
register's unnamed asymmetry) → the cures → parity-274 GREEN · the
sibling batteries GREEN (parity-273 · parity-272 · parity-229 ·
parity-243 · docs-counts at the advanced trio — the v2.71.0 block
lands together with the advance, the F-249b structural gate
enforcing the pairing) → lint 0/0 · tsc 0 · the unit suite at the
new count · build · smoke 15/15 · the FULL e2e battery 161/161
(zero new legs — the round changes an error-path predicate and
comments; no swept surface moves, no pixel can shift) · census MATCH
· the captures (the standing evidence faces + the round's touched
faces — the signup route's own form face at desktop, the drawer at
390, the flagship dashboard).

"""

p = insert_before(
    p,
    "### R-70 — The dynamic-viewport, config-loader, and register-promotion round (session 273)",
    R71,
    "r71-section",
)

with open("docs/remediation_plan_v2.md", "w", encoding="utf-8") as f:
    f.write(p)

print("plan v2.71.0 written: head flip + §2.32 ledger + R-71 section")
