#!/usr/bin/env python3
"""Session-272 plan write — remediation_plan_v2.md v2.68.0 → v2.69.0
(R-69, the census-reanchor, phantom-primitive, and layer-map round).

Insertions only, every site asserted (the F-242j lesson): the new
Current-version header block (the v2.68.0 block flips to Previous),
the §2.30 ledger (before §3's heading), and the R-69 section (above
R-68's). The §5 execution-history row rides scripts/history-272.py at
lockstep time (after the gate runs, so the counts carry the verified
values)."""

import sys


def insert_before(text: str, anchor: str, block: str, label: str) -> str:
    n = text.count(anchor)
    if n != 1:
        sys.exit(f"[{label}] expected 1 anchor, found {n}: {anchor[:60]!r}")
    return text.replace(anchor, block + anchor)


with open("docs/remediation_plan_v2.md", encoding="utf-8") as f:
    p = f.read()

# ---- 1. the head: flip v2.68.0 to Previous, insert v2.69.0 above it -----
CUR_HEAD = "> **Current version: v2.68.0** (session 271 — the"
if p.count(CUR_HEAD) != 1:
    sys.exit("[head] the v2.68.0 Current header not found in the expected form")
p = p.replace(CUR_HEAD, "> **Previous version: v2.68.0** (session 271 — the", 1)

NEW_HEAD = """> **Current version: v2.69.0** (session 272 — the
census-reanchor, phantom-primitive, and layer-map round R-69: the
operator re-sent the standing directive after the R-68 ship pair
(64dd7be6 + the owner's 1761effb session-log update carrying
docs/session_126.md, the session-271 transcript — fetched by the
fresh clone and reviewed at intake per the odd-number record
convention, this record riding docs/session_127.md). Per the
recorded rhythm, findings-led iteration: refresh, re-audit,
remediate, verify, capture, document, commit, push — with the
operator's named asks (the mobile navigation comparison, the
Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.)

The intake: the workspace had been reset (a fresh clone at HEAD
1761effb — tree clean; the prior session's work ALREADY SHIPPED as
64dd7be6 + the owner's 1761effb session-log update carrying
docs/session_126.md), the environment rebuilt cold (bun install +
the postinstall prisma generate, .env from .env.example on the
DATABASE_URL="file:../db/custom.db" contract, db/ at the repo root,
db push + seed, census MATCH (81/4/3/6/5/7, users=1)); the one
cold-start deviation was environmental — the cached Playwright
chromium build did not match the 1.65 pin (the headless-shell 1254
build installed, then the battery ran green).

THE COLD BASELINE GATE GREEN AT HEAD — the v2.68.0 ship state
reproduced exactly, no discovery: lint 0/0 · tsc 0 · 1949/1949 unit
(123 files) · build (the 4 documented Turbopack tracing warnings) ·
smoke 15/15 · 161/161 e2e · census MATCH.

The standing layers: probe:ref STABLE on every layer (the app
bundle 1,402,874 bytes / md5 6d3779af…, the stylesheet md5
96f24d45…, the demo-data ZERO census, the desktop nav census 256px ·
9 links, the TRUE-390 menu census opens=true · 9 destinations) ·
**the mobile-nav comparison verified on BOTH sides at TRUE 390×844**
(the reference through probe:ref's TRUE-390 menu census; the clone
side riding the standing comparison-265.ts on the production
artifact over the scratch db/comparison.db — pre-open 0 · 9
destinations + Sign Out · aria-expanded true→false · post-close 0 ·
census tripwire MATCH · no Tailwind v4 regression) · neo-crm
unchanged (b3d0fbe) · the SEO surface verified (smoke leg 12:
sitemap + robots + manifest 200) · the .env contract + the db/ at
the repo root + the vitest/playwright configs + the .env.example
standing. **`bun audit` CHANGED — the census moved 2 → 1**: the
picomatch HIGH (GHSA-fc5q-39xc-vjpf) no longer rides npm's audit
data (verified at the registry's bulk advisory endpoint by the
driving session; the GitHub advisory page still publishes it;
picomatch@4.0.7 still resolves in the lockfile) — the round's
flagship finding, F-272a below.

The session-272 fresh-eyes audit (three Mode-C research passes
dispatched as parallel research subagents per the house convention,
every material claim re-verified at file:line by the driving
session — the R-68 cure surfaces: all twelve HOLDING (the §8
battery opener's real count and viewports, the stack table's
slot-not-label cure, the 8/18 inventory, the two-step import
paragraph, the design-genus delta line, the §19 AA-pairings list,
both mobile-battery count sites, the README feature/API trio, the
forgot-password 400 rationale, the link-variant register note, the
parity-271 battery 17/17 re-run green with both hardening legs
behavioral) · the API/auth/security layer: the TWENTY-FIFTH
consecutive clean bill (all twelve house contracts, 30 route files /
45 handlers read line-by-line, the census exact; 10 candidates
dismissed into documented postures — the in-band OTP/reset knobs,
the uploads GET capability-URL publicity, the signup enumeration
parity, the per-account bucket exhaustion trade-off, the unbucketed
read classes, health/me, the CSP inline floors, the reset confirm
literal, the verify differential, the HSTS parity pin) · the
UI/a11y/shell layer: all eight standing contracts verified holding
live (the drawer mechanics with the stacked guard and the skip-link
exclusion, the theme system with the inline bootstrap equivalence
traced, the v4 scanner discipline with a fresh 110/110 color-token
census, the a11y two-gate 46/46, the shell twins, the geometry pin,
the date seams, the escape stacking — plus the full unit 1949/1949
and the seven e2e specs re-run green inside the pass). The genuine
rot: the DOC SET again — the R-68 doc-truth round's own blind spots
and one security-ledger census event: 0 Critical / 0 High / 7 Medium
/ 11 Low / 2 Informational NEW after dedup, every material claim
re-verified at file:line (the npm bulk-endpoint probe; the Radix
dependency census against package.json and bun.lock; the
ui-directory count; the @theme token extraction — 142 tokens, the
real ramp steps per family; the z-index census; the contrast ratios
computed independently; the line counts taken by wc -l).

The round's flagship: **F-272a the security ledger's advisory
census moved 2 → 1** — npm's audit endpoint stopped returning the
picomatch HIGH (GHSA-fc5q-39xc-vjpf / CVE-2026-112366) against the
same picomatch@4.0.7 the lockfile still resolves, while the GitHub
advisory database still publishes it; the PAD §10 row and the
security-ledger pin both still say "2 advisories: 1 high / 1
moderate" — the F-268d doctrine binds the re-anchor to the same
commit as the discovery. The round's other two genus families: the
PHANTOM-PRIMITIVE family (F-272b the skill doc's stack table still
naming -tabs — the F-271d cure trued label→slot in the same row but
left the tabs twin; F-272c the README architecture row naming Label
and Tabs; F-272d the PAD §1.2 "label 2.1.17" package row; F-272e
the PAD §3.2/§5.3 ui inventories naming input/label/textarea — the
F-271d genus surviving in the PAD twins the R-68 battery never
read) and the LAYER-MAP/TOKEN-MIRROR family (F-272f the skill doc's
§18 z-index map drifted four rows deep against the tree and its own
§17; F-272g the §4 mirror and §19 reference carrying #ffffff for
the primary-foreground the F-219a cure set to #1c1917, the retired
--color-subtle and radius tokens, the retired .dark body mechanism
prose, and seven stale ramp ranges).

The round's lows: F-272h the "20 families" count on five carriers
against the real 18 directories / 30 route files / 45 handlers ·
F-272i the PAD §3.2 api enumeration listing the nonexistent
/api/analytics family · F-272j the phantom names PAD PageCard /
AccountView and SKILL StatCard against the real PageHeader /
BankAccount / KpiCard · F-272k/F-272l the 14-vs-15 smoke-ladder
counts on the PAD §11 and the skill doc's Appendix D · F-272m the
§19 stone-500 arithmetic claiming "never below 4.5:1" where the
computed figure is 4.40:1 (the same figure §8 trued at R-68) ·
F-272n/F-272o the stale line-count claims on the skill doc's eight
file cards and the PAD §11 (drifted 1.5–2.4×) · F-272p the PAD
§5.2's three understated contrast figures (4.7/5.2/4.5 against the
computed 4.80/5.48/4.83) · F-272q the README file-tree row's phantom
"input" and the "Radix-wrapped" gloss mischaracterizing four of the
eight ui files (the skill doc's inventory row carries the same
gloss) · F-272r the dead SETTINGS_CARD.boxText constant with its
value pasted literally at three settings sites (the F-240d
divergence-point genus). Registered: F-272s the PAD H1 v2.0.0
marker (the base-document convention, defensible) and F-272t the
Bun floor inconsistency (PAD ≥1.3.14 vs README/SKILL ≥ 1.3 — cured
as the round's one-word rider).

The execution contract (R-69): the plan v2.69.0 written and
validated against the tree (this script, insertions only, every
anchor asserted) → **R-69.1** the pins born honest RED (the
parity-272 battery over the false forms at HEAD + the
security-ledger census pin re-anchored against the PAD's stale "2
advisories" row) → **R-69.2** the cures (the PAD §10 re-anchor; the
phantom-primitive family across SKILL/README/PAD; the §18 layer map
trued to the real ladder; the §4/§19 token mirror trued to the real
@theme; the count family trued — 18 families, the phantom api
family and names, 15-assertion smoke, the stone-500 arithmetic, the
§5.2 figures, the line counts, the Bun floor; the boxText wiring at
the three settings sites) → **R-69.3** the verification (parity-272
GREEN · security-ledger GREEN at the re-anchored census ·
docs-counts GREEN at the advanced trio · the sibling batteries
GREEN · lint 0/0 · tsc 0 · the unit suite at the new count · build
· smoke 15/15 · the FULL e2e battery 161/161 (zero behavioral
change — the boxText wiring is class-string consolidation over a
byte-identical DOM) · census MATCH · the captures (the standing
evidence faces).

"""

p = insert_before(p, "> **Previous version: v2.68.0**", NEW_HEAD, "new-head")

# ---- 2. the §2.30 ledger (before §3's heading) ---------------------------
LEDGER = """### 2.30 Session-272 audit ledger (the fresh-eyes round over the v2.68.0 ship state)

Three Mode-C passes (the R-68 cure surfaces · the API/auth/security
layer · the UI/a11y/shell layer), every material claim re-verified at
file:line by the driving session. The API layer's twenty-fifth
consecutive clean bill is the round's clean column; every finding
lives on the distilled docs, the security ledger, or one dead
constant.

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-272a | Medium | **THE SECURITY LEDGER'S ADVISORY CENSUS MOVED 2 → 1 — and the re-anchor is bound to the discovery commit.** `bun audit` at HEAD reports 1 advisory (the minimatch moderate); the standing census says "2 advisories: 1 high / 1 moderate". The picomatch HIGH (GHSA-fc5q-39xc-vjpf / CVE-2026-112366) no longer rides npm's audit data — verified by the driving session at the registry's bulk advisory endpoint (a direct POST for picomatch 4.0.7 returns only the minimatch row), while the GitHub advisory page still publishes it (affected ≤ 4.0.7, no patch) and picomatch@4.0.7 still resolves in the lockfile (26 terminal dev-chain paths, zero runtime). The PAD §10 row and the security-ledger census pin both carry the stale count. | `Project_Architecture_Document.md:3831` (the §10 advisories row) · `tests/security-ledger.test.ts:95-112` (the census pin) · the npm bulk-endpoint probe (this session) | **R-69** (the census re-anchored 2 → 1 — "1 advisory: 1 moderate — all dev-toolchain, zero runtime chains" — with the picomatch decode: dropped off npm's audit data at session 272, the GHSA still published upstream, the re-triage duty watches its return; the PAD row + the pin in the same commit, the F-268d doctrine) |
| F-272b | Medium | **THE SKILL DOC'S STACK TABLE STILL NAMES THE PHANTOM -tabs PRIMITIVE.** The §2 row reads "@radix-ui/react-dialog, -select, -tabs, -dropdown-menu, -popover, -slot" — package.json declares exactly five Radix deps (dialog, dropdown-menu, popover, select, slot), tabs.tsx is a hand-rolled native-ARIA strip importing no Radix, and @radix-ui/react-tabs rides neither package.json nor bun.lock. The F-271d cure trued label→slot in this exact row but left the tabs twin; the parity-271 leg guards only "-popover", "-slot" present and "-label" absent — the phantom tabs claim passes the battery (the pin-coverage gap). | `wealth-os_SKILL.md:120` (the stack-table row) vs `package.json:32-36` and `src/components/ui/tabs.tsx:1-8` | **R-69** (the row trued to the five real primitives; the parity-272 stack-table leg extends the containment to -tabs) |
| F-272c | Medium | **THE README ARCHITECTURE ROW NAMES LABEL AND TABS AMONG THE RADIX PRIMITIVES.** "Dialog, Select, Tabs, Dropdown, Popover, Label" — Label retired at F-232a (no react-label dependency), Tabs never was a Radix primitive here. The R-68 README cure trued the three feature rows but not this row. | `README.md:57` (the architecture table's UI-primitives row) | **R-69** (the row trued to "Dialog, Select, Dropdown, Popover, Slot"; pinned by the parity-272 README-arch-row leg) |
| F-272d | Medium | **THE PAD §1.2 STACK ROW CARRIES THE PHANTOM "label 2.1.17" PACKAGE.** "dialog 1.3.1 · select 2.4.1 · dropdown 2.2.1 · popover 1.3.1 · label 2.1.17 · slot 1.5.0" — react-label appears nowhere in package.json or bun.lock (rg: zero hits); the row names six packages where five exist. | `Project_Architecture_Document.md:3184` (the §1.2 stack table) | **R-69** (the row trued to the five real packages with versions; pinned by the parity-272 PAD-stack leg) |
| F-272e | Medium | **THE PAD §3.2 AND §5.3 UI INVENTORIES NAME THREE PHANTOM FILES.** §3.2: "ui/ # Radix-wrapped primitives: button, input, select, tabs, dialog, dropdown, label, popover, textarea" and §5.3: "(button/input/select/tabs/dialog/dropdown/popover/label/textarea)" — the directory holds exactly 8 tsx (avatar, badge, button, dialog, dropdown, select, tabs, toast); input.tsx, label.tsx, and textarea.tsx do not exist (the vendored stock retired at F-232a). This is the F-271d genus surviving in the PAD twin rows the R-68 battery never read (its doc reads cover SKILL.md and README.md only). | `Project_Architecture_Document.md:3406-3407` (§3.2) and `:3627-3628` (§5.3) vs the actual `src/components/ui/` census | **R-69** (both rows trued to the real eight with the honest wrapping gloss — only button/dialog/dropdown/select ride Radix; tabs/badge/toast are native-ARIA, avatar is a helper seam; pinned by the parity-272 PAD-inventory legs) |
| F-272f | Medium | **THE SKILL DOC'S §18 Z-INDEX LAYER MAP HAS DRIFTED FROM THE TREE.** Four wrong attributions and one phantom layer: a "z-20 expenses table sticky header" row (no z-20 exists anywhere in src; the expenses page has no sticky header); the mobile header listed at z-40 (it is z-50, page-layout.ts:100); the drawer content listed at z-50 (it is z-40, page-layout.ts:70); z-[60] attributed to "elevated select/dropdown surfaces" (it is the skip link's focused reveal, app-shell.tsx:92, the F-225d cure — no select or dropdown carries it, all ride z-50). §17 carries the correct story three sections earlier — the doc contradicts itself, and a contributor trusting §18 would misplace overlays and reintroduce the F-225d paint-order genus. | `wealth-os_SKILL.md:1002-1015` (§18) vs `src/lib/page-layout.ts:21,35,40,70,100,310,316,406` and `src/components/layout/app-shell.tsx:92` (the tree census: z-10 ×3 sidebar interior, z-40 the drawer, z-50 the header + dialog pair + select/dropdown content, z-[60] the skip link, z-[100] toasts) | **R-69** (the table trued to the real ladder with the census in the purpose column; pinned by the parity-272 layer-map leg) |
| F-272g | Medium | **THE SKILL DOC'S §4 TOKEN MIRROR AND §19 COLOR REFERENCE CARRY RETIRED VALUES AND PHANTOM TOKENS.** (a) --color-primary-foreground documented as #ffffff at both sites — the real token is #1c1917 (globals.css:64, the F-219a stone-900 ink cure; #ffffff measured 2.15:1 on the amber CTA — the doc invites reintroducing a cured systemic AA failure); (b) --color-subtle documented at both sites — the token retired at F-228b, zero occurrences in globals.css; (c) --radius-card/--radius-button/--radius-pill documented in the §4 mirror — retired at F-227n (globals.css:157-160 documents the retirement); (d) the §4 structure line and §19 dark-theme paragraph describe ".dark body, .sidebar-gradient, .page-wash re-maps" — the .dark body rule was deleted as inert at F-220d (grep: zero hits); the working mechanism is the .dark block's token flips, and the utilities are v4-native @utility forms, not an @layer utilities block; (e) §19's "Re-pinned ramps" ranges are stale against the actual @theme (142 tokens): amber documented 50–900 vs the real 50–950, blue 50–700 vs 50–950, cyan 400/500 vs 500 only, emerald 50–800 vs 50–950, red 50–700 vs 50–950, rose 50–700 vs the non-contiguous 50/200–600/800–950, teal 50–700 vs 500–700. | `wealth-os_SKILL.md:243,275,281-283,1029,1034` (the mirror rows) · `:212-221` (the §4 structure) · `:1051-1060` (§19 ramps + dark mechanism) vs `src/app/globals.css` (the @theme extraction) | **R-69** (the mirror trued: #1c1917, the subtle/radius rows dropped, the @utility + token-flip mechanism, the ramp ranges re-derived from the real @theme; pinned by the parity-272 token-mirror legs) |
| F-272h | Low | **THE "20 FAMILIES" COUNT RIDES FIVE CARRIERS AGAINST THE REAL 18/30/45.** README's mermaid "20 resource families", the file-tree "20 route-handler families", the status row "20 API families"; PAD's mermaid "20 families" and §3.2 "20 families:" — the api directory holds 18 families, 30 route files, 45 handlers; no counting scheme (18 logical families / 25 non-dynamic paths / 30 files) yields 20, and the R-68 audit's own record already says "45 handlers / 30 route files". | `README.md:73,92,222` · `Project_Architecture_Document.md:3321,3395` vs the `src/app/api/` census | **R-69** (all five carriers trued to 18; pinned by the parity-272 families-count leg) |
| F-272i | Low | **THE PAD §3.2 API ENUMERATION LISTS THE NONEXISTENT /api/analytics FAMILY.** The tree-walk block lists "analytics" among the families — `src/app/api/analytics/` does not exist; the Analytics page is client-side aggregation over /api/dashboard (the README's own feature row says so). | `Project_Architecture_Document.md:3396` vs the api directory census | **R-69** (the phantom family dropped from the enumeration; pinned by the parity-272 api-enumeration leg) |
| F-272j | Low | **THE PHANTOM NAMES: PAD PageCard AND AccountView, SKILL StatCard.** PAD §3.2's tree gloss "page-parts.tsx (PageCard, KpiCard, EmptyState, …)" — page-parts exports PageHeader, KpiCard, GradientKpiCard, EmptyState, CardTitleRow, PeriodSegment, LoadingBlock (no PageCard); PAD §3.2's types gloss "(Transaction, AccountView, …)" — types/index.ts exports BankAccount, not AccountView (zero hits repo-wide); SKILL §3's inventory "PageHeader, StatCard, EmptyState" — the component is KpiCard (no StatCard exists). | `Project_Architecture_Document.md:3404,3410` · `wealth-os_SKILL.md:332` vs the actual export censuses | **R-69** (all three trued to the real names; pinned by the parity-272 phantom-names leg) |
| F-272k | Low | **THE PAD §11 SAYS "14-assertion" SMOKE LADDER — the script runs 15.** The Key Files row contradicts the PAD's own §7 (15, twice) and the script's output (SMOKE: 15/15 PASS). | `Project_Architecture_Document.md:3872` vs `scripts/smoke-test.sh:204` | **R-69** (the row trued to 15; pinned by the parity-272 smoke-count leg) |
| F-272l | Low | **THE SKILL DOC'S APPENDIX D SAYS "14 checks" FOR THE SMOKE LADDER.** Same contradiction inside the skill doc (§11 and the frontmatter both say 15). | `wealth-os_SKILL.md:1207` vs the script | **R-69** (the line trued to 15; pinned by the parity-272 smoke-count leg) |
| F-272m | Low | **THE §19 AA-PAIRINGS LINE CARRIES AN ARITHMETICALLY FALSE stone-500 CLAIM.** "body stone-500+ never below 4.5:1 on stone-100" — stone-500 #78716c on stone-100 #f5f5f4 computes 4.40:1 (independently computed this session), exactly the figure §8 trued at R-68 for the inactive-tab pair (darkened one step to stone-600 for AA). The same document contradicts itself; the honest body-text floor is stone-600 (6.99:1). | `wealth-os_SKILL.md:1064` vs the computed ratio and `wealth-os_SKILL.md:485-488` (§8's trued figure) | **R-69** (the line trued to the stone-600 floor with the 4.40:1 computation named; pinned by the parity-272 arithmetic leg) |
| F-272n | Low | **THE SKILL DOC'S FILE-CARD LINE-COUNT AND LINE-ANCHOR CLAIMS HAVE DRIFTED 1.5–2.4×.** globals.css "(396 lines)" vs 589; api.ts "308 lines" vs 446; finance.ts "622 lines" vs 969; seed.ts "305 lines" vs 333; ai.ts "280 lines" vs 308; the store "384 lines" vs 738 (the useWealthOs anchor ":383" vs :737); page-layout.ts "262 lines" vs 526; schemas.ts "504 lines" vs 658 (the "24 exported schemas" claim holds — 24 counted); the useTheme anchor "theme.tsx:111" vs :154 and useIsDark "theme.tsx:63" vs :78. The doc's own maintenance contract requires re-verification; nothing pins them. | `wealth-os_SKILL.md:212,389,412-413,447,457,466,401,405,1147,1153` vs wc -l on the files | **R-69** (all counts and anchors trued to the current figures; pinned by the parity-272 self-verifying line-count leg — the battery parses the doc's claimed number and compares against the live file, so the doc can never silently drift again) |
| F-272o | Low | **THE PAD §11 KEY-FILES ~LINE COUNTS ARE STALE.** finance.ts "~400" vs 969; api.ts "~120" vs 446; page-layout.ts "~200" vs 526; globals.css "~250" vs 589; dashboard/page.tsx "~400" vs 701; db-path.ts "~100" vs 232; mobile-nav.tsx "~110" vs 220; wealthos.spec.ts "~260" vs 1205; schema.prisma "~150" vs 227. | `Project_Architecture_Document.md:3853-3876` vs wc -l | **R-69** (the tilde figures trued to current magnitudes; registered as soft claims — the exact-form pin lives on the skill doc's cards) |
| F-272p | Low | **THE PAD §5.2's THREE CONTRAST FIGURES UNDERSTATE THE COMPUTED VALUES.** --color-muted "4.7:1 on white" vs the computed 4.80:1; emerald-700 "5.2:1" vs 5.48:1; red-600 "4.5:1" vs 4.83:1 (independently computed this session from the pinned hexes). | `Project_Architecture_Document.md:3616-3619` | **R-69** (all three trued to the computed figures; pinned by the parity-272 contrast-figures leg) |
| F-272q | Low | **THE README FILE-TREE ROW NAMES A PHANTOM "input" AND THE "Radix-wrapped" GLOSS MISCHARACTERIZES FOUR OF EIGHT UI FILES.** README's tree: "ui/ # Radix-wrapped primitives (button, input, tabs, …)" — no input.tsx exists; badge.tsx, tabs.tsx, and toast.tsx import no Radix (toast.tsx records the @radix-ui/react-toast retirement), and avatar.tsx exports the avatarTextColor helper, not a component. The skill doc's §3 inventory row carries the same "Radix-wrapped primitives" gloss over the same directory. | `README.md:96` · `wealth-os_SKILL.md:333` vs the import censuses | **R-69** (both glosses trued — the four Radix-wrapped named, the native-ARIA trio and the helper named; pinned by the parity-272 ui-gloss legs) |
| F-272r | Low | **THE DEAD SETTINGS_CARD.boxText CONSTANT WITH ITS VALUE PASTED LITERALLY AT THREE SETTINGS SITES.** The member is defined (page-layout.ts:237) with zero consumers repo-wide (member census: 0 references in src/ and tests/); the settings page pastes the byte-identical literal "text-sm text-stone-600 dark:text-stone-400" at three sites (:277, :313, :351). The exact divergence-point genus F-240d/F-241f cured for FORM_INPUT/FORM_TEXTAREA: the constant rots while the sites drift. | `src/lib/page-layout.ts:237` · `src/app/(app)/settings/page.tsx:277,313,351` | **R-69** (the three sites wired to the constant — SETTINGS_CARD already imports at :28; the class string is byte-identical so the DOM is unchanged; pinned by the parity-272 wiring leg, the F-240d positive form) |
| F-272s | Informational | **THE PAD H1 VERSION MARKER READS v2.0.0 WHILE THE REVISION BLOCK'S NEWEST ENTRY IS v2.68.0.** The H1 carries the base-document version (the PAD format's own version), not the remediation-plan version — a defensible convention, ambiguous to a fresh reader. | `Project_Architecture_Document.md:1` | Registered (the convention documented; not cured) |
| F-272t | Informational | **THE BUN FLOOR RIDES TWO FORMS: PAD "≥1.3.14" vs README/SKILL "≥ 1.3".** No engines field rides package.json to arbitrate; the sandbox runs 1.3.14. | `Project_Architecture_Document.md:3192` vs `README.md:113` · `wealth-os_SKILL.md:144` | **R-69** (the rider: PAD aligned to the "≥ 1.3" family form) |

Recorded, not cured: F-272s (the PAD H1 convention). The audit's clean
columns: the API/auth/security layer's twenty-fifth consecutive clean
bill (twelve contracts, 45 handlers / 30 route files, 10 candidates
dismissed into documented postures) and the UI/a11y/shell layer's
eight standing contracts all holding live.

"""

p = insert_before(p, "## 3. The remediation program (R-items)", LEDGER, "ledger")

# ---- 3. the R-69 section (above R-68's) ----------------------------------
R69 = """### R-69 — The census-reanchor, phantom-primitive, and layer-map round (session 272)

The operator re-sent the standing directive after the R-68 ship pair
(64dd7be6 + the owner's 1761effb session-log update carrying
docs/session_126.md, the session-271 transcript — fetched by the
fresh clone and reviewed at intake per the odd-number record
convention). Per the recorded rhythm, findings-led iteration. The
intake and the standing layers are recorded in the version header
above; this section carries the findings, the cures, and the
verification contract.

**The findings (each verified at file:line by the driving session —
the API layer's twenty-fifth consecutive clean bill and the UI
layer's eight standing contracts are the round's clean columns; the
genuine rot lives on the distilled docs, the security ledger, and
one dead constant):** the §2.30 ledger's twenty rows — F-272a THE
ROUND'S FLAGSHIP (the security ledger's advisory census moved 2 → 1:
npm's audit endpoint stopped returning the picomatch HIGH against
the same picomatch@4.0.7 the lockfile still resolves, the GitHub
advisory still published; the PAD §10 row and the security-ledger
pin both carry the stale count — the F-268d doctrine binds the
re-anchor to the discovery commit) · F-272b/F-272c/F-272d/F-272e THE
PHANTOM-PRIMITIVE FAMILY (the skill doc's stack table still naming
-tabs — the F-271d cure trued label→slot in the same row but left
the tabs twin; the README architecture row naming Label and Tabs;
the PAD §1.2 "label 2.1.17" package row; the PAD §3.2/§5.3 ui
inventories naming input/label/textarea — the F-271d genus surviving
in the PAD twins the R-68 battery never read) · F-272f/F-272g THE
LAYER-MAP AND TOKEN-MIRROR PAIR (the skill doc's §18 z-index map
drifted four rows deep against the tree and its own §17; the §4
mirror and §19 reference carrying #ffffff for the primary-foreground
the F-219a cure set to #1c1917, the retired --color-subtle and
radius tokens, the retired .dark body mechanism prose, and seven
stale ramp ranges) · F-272h through F-272r THE ELEVEN LOWS (the
"20 families" count on five carriers against the real 18/30/45 ·
the phantom /api/analytics family · the phantom names PageCard /
AccountView / StatCard · the 14-vs-15 smoke counts on two carriers ·
the §19 stone-500 arithmetic (4.40:1 computed, the same figure §8
trued at R-68) · the stale line counts on the skill doc's eight file
cards and the PAD §11 · the PAD §5.2's three understated contrast
figures · the phantom "input" and the Radix-wrapped gloss · the dead
SETTINGS_CARD.boxText constant with its value pasted at three
settings sites). Registered: F-272s/F-272t.

**The cures (R-69.2):** the PAD §10 advisories row re-anchored 2 → 1
with the picomatch decode (dropped off npm's audit data at session
272; the GHSA still published upstream; picomatch@4.0.7 still rides
the lockfile; the re-triage duty watches its return) and the
security-ledger census pin moved in the same commit; the
phantom-primitive family trued across the doc set (the skill doc's
stack table to the five real primitives; the README architecture row
to Dialog/Select/Dropdown/Popover/Slot; the PAD §1.2 row to the five
real packages; the PAD §3.2/§5.3 inventories to the real eight with
the honest wrapping gloss; the README tree row and the skill doc's
gloss to the four-Radix/four-native truth); the §18 layer map trued
to the real ladder (z-10 sidebar interior · z-40 the drawer · z-50
the header, the dialog pair, the select/dropdown content · z-[60]
the skip link's focused reveal · z-[100] toasts); the §4/§19 token
mirror trued (primary-foreground #1c1917; the subtle and radius rows
dropped; the @utility + .dark token-flip mechanism; the ramp ranges
re-derived from the real 142-token @theme); the count family trued
(18 families on all five carriers; the phantom api family and the
phantom names dropped; 15-assertion smoke on both carriers; the §19
stone-600 floor with the 4.40:1 computation named; the §5.2 figures
to 4.80/5.48/4.83; the line counts and anchors to the current
figures; the Bun floor aligned); the boxText wiring at the three
settings sites (byte-identical classes — zero DOM change).

**The verification contract (R-69.3):** the parity-272 battery born
honest RED against the pre-cure tree (the doc-truth legs fail — the
false forms ride the docs at HEAD; the wiring leg fails — the three
literal sites stand) + the security-ledger census pin re-anchored
(born RED against the PAD's stale "2 advisories" row) → the cures →
parity-272 GREEN · security-ledger GREEN at the re-anchored census ·
docs-counts GREEN at the advanced trio (the v2.69.0 block lands
together with the advance — the F-249b structural gate enforces the
pairing) · the sibling batteries GREEN (parity-271 17/17 ·
parity-229 · parity-236 · parity-270 · parity-243) → lint 0/0 · tsc
0 · the unit suite at the new count · build · smoke 15/15 · the FULL
e2e battery 161/161 (zero new legs — the boxText wiring is
class-string consolidation over a byte-identical DOM; the standing
battery the proof) · census MATCH · the drift chain not required
(zero swept/censused surfaces changed — docs plus one
class-identical src consolidation) · the captures (the standing
evidence faces: the dashboard, the expenses section, the mobile
drawer at 390 — the round's rendered subject is the documentation
set and the security ledger, so the captures evidence the remediated
app still renders).

"""

p = insert_before(
    p,
    "### R-68 — The doc-truth, pin-depth, and register-note round (session 271)",
    R69,
    "r69-section",
)

with open("docs/remediation_plan_v2.md", "w", encoding="utf-8") as f:
    f.write(p)

print("plan v2.69.0 written: head flip + §2.30 ledger + R-69 section")
