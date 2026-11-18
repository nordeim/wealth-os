#!/usr/bin/env python3
"""Session-273 plan write — remediation_plan_v2.md v2.69.0 → v2.70.0
(R-70, the dynamic-viewport, config-loader, and register-promotion
round).

Insertions only, every site asserted (the F-242j lesson): the new
Current-version header block (the v2.69.0 block flips to Previous),
the §2.31 ledger (before §3's heading), and the R-70 section (above
R-69's). The §5 execution-history row rides scripts/history-273.py at
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

# ---- 1. the head: flip v2.69.0 to Previous, insert v2.70.0 above it -----
CUR_HEAD = "> **Current version: v2.69.0** (session 272 — the"
if p.count(CUR_HEAD) != 1:
    sys.exit("[head] the v2.69.0 Current header not found in the expected form")
p = p.replace(CUR_HEAD, "> **Previous version: v2.69.0** (session 272 — the", 1)

NEW_HEAD = """> **Current version: v2.70.0** (session 273 — the
dynamic-viewport, config-loader, and register-promotion round R-70:
the operator re-sent the standing directive after the R-69 ship pair
(488b49c2 + the owner's 545710ad session-log update carrying
docs/session_128.md, the session-272 transcript — fetched by the
fresh clone and reviewed at intake per the odd-number record
convention, this record riding docs/session_129.md). Per the
recorded rhythm, findings-led iteration: refresh, re-audit,
remediate, verify, capture, document, commit, push — with the
operator's named asks (the mobile navigation comparison, the
Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.)

The intake: the workspace had been reset (a fresh clone at HEAD
545710ad — tree clean; the prior session's work ALREADY SHIPPED as
488b49c2 + the owner's 545710ad session-log update carrying
docs/session_128.md), the environment rebuilt cold (bun install +
the postinstall prisma generate, .env from .env.example on the
DATABASE_URL="file:../db/custom.db" contract, db/ at the repo root,
db push + seed, census MATCH (81/4/3/6/5/7, users=1)); the one
cold-start deviation was environmental — the cached Playwright
chromium build did not match the 1.65 pin (the headless-shell 1254
build installed, then the battery ran green).

THE COLD BASELINE GATE GREEN AT HEAD — the v2.69.0 ship state
reproduced exactly, no discovery: lint 0/0 · tsc 0 · 1972/1972 unit
(124 files) · build (the 4 documented Turbopack tracing warnings) ·
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
census tripwire MATCH · no Tailwind v4 regression) · `bun audit`
UNCHANGED (the 1-advisory dev-chain census the R-69 re-anchor
carries — the minimatch moderate, zero runtime) · neo-crm unchanged
(b3d0fbe) · the SEO surface verified (smoke leg 12: sitemap + robots
+ manifest 200; the metadata/pwa/page-titles pins 30/30) · the .env
contract + the db/ at the repo root + the vitest/playwright configs
+ the .env.example standing.

The session-273 fresh-eyes audit (three Mode-C research passes
dispatched as parallel research subagents per the house convention,
every material claim re-verified at file:line by the driving
session — the R-69 cure surfaces: all seventeen HOLDING (the PAD §10
census row + the security-ledger pin live-accurate against a fresh
`bun audit`; the phantom-primitive family trued across
SKILL/README/PAD; the §18 layer map; the §4/§19 token mirror; the
count family; the boxText wiring at its three settings sites; the
parity-272 battery 23/23 + parity-271 17/17 + docs-counts 18/18 +
security-ledger 2/2 all re-run green) · the API/auth/security layer:
the TWENTY-SIXTH consecutive clean bill (all thirteen house
contracts, 30 route files / 45 handlers read line-by-line, the
census exact; every candidate dismissed into documented postures —
the in-band OTP/reset knobs, the uploads GET capability-URL
publicity, the per-account bucket trade-offs, the unbucketed read
classes, the CSRF layering, the HSTS parity pin) · the UI/a11y/shell
layer: all eight standing contracts verified holding live (the
drawer mechanics with the stacked guard and the skip-link exclusion,
the theme system with the inline bootstrap equivalence traced, the v4
scanner discipline with the phantom-variant grep clean and the three
guard suites 72/72, the a11y two-gate 47/47 with the scrollThrough
helper, the shell twins 31/31, the geometry pin, the date seams 180
tests green, the escape stacking). The genuine rot this round: TWO
LOW findings and three registered notes — 0 Critical / 0 High / 0
Medium / 2 Low / 3 Informational NEW after dedup, every material
claim re-verified at file:line (the h-screen carrier census over the
whole tree; the vitest warning reproduced and its cure path
empirically validated by a scratch rename BEFORE the plan; the toast
max-height genus; the ledger anchor arithmetic).

The round's flagship: **F-273a the shell root's h-screen (100vh)
dynamic-viewport trap, promoted from F-220p's register with the
reference construction DECODED** — the R-17 registration said
"h-dvh is the robust form — reference construction unknown"; the
decode: the reference has NO fixed-height shell at all (F-207e: its
section shells are min-h-screen document-scrolled surfaces;
F-210a: the scroll-model divergence is the deliberately absorbed
superset — our viewport-locked internal scroller), so no parity
constraint binds our shell's height MECHANISM and the swap is
parity-neutral by construction; in headless Chromium 100dvh equals
100vh, so every pixel-level gate (the sweeps, the fullpage axis,
the interior census, the e2e battery) stays byte-identical. On iOS
Safari the static 100vh root plus overflow-hidden left the bottom
of main's scroll region (the copyright footer, list bottoms)
unreachable behind the expanded browser chrome — the exact genus
the F-219h drawer cure fixed inside the sheet, now cured at the
shell. The round's rider: **F-273b the vitest config-loader
deprecation** (the warning fired on every unit run; the .mts rename
cures it — empirically validated pre-plan, and the parity-229
root-config walk pins the rename in the same commit per the
contract-change rule). Registered: F-273c the §2.30 ledger PAD
anchors (inherent to the revision-block-prepend convention;
navigation is by content-grep), F-273d the axe sanctioned-register
substring matching (the register discipline manages it), F-273e the
iOS background-attachment: fixed degradation (the decorative
page-wash glow only; the flat background token still paints).

The execution contract (R-70): the plan v2.70.0 written and
validated against the tree (this script, insertions only, every
anchor asserted) → **R-70.1** the pins born honest RED (the
parity-273 battery over the false forms at HEAD) → **R-70.2** the
cures (the h-dvh swap at the shell root + the two comment carriers
reworded + the toast max-height same-genus completion; the
vitest.config.mts rename + its six reference sites) → **R-70.3**
the verification (parity-273 GREEN · parity-229 GREEN at the
updated walk list · docs-counts GREEN at the advanced trio · the
sibling batteries GREEN · lint 0/0 · tsc 0 · the unit suite at the
new count · build · smoke 15/15 · the FULL e2e battery 161/161 ·
**the six parity drift gates RE-RUN CLEAN** (this round changed a
swept surface — the shell root class string — and the honest
verification is the drift chain itself proving dvh equals vh in the
capture environment, not the assertion that it should) · census
MATCH · the captures (the standing evidence faces + the round's
touched face).

"""

p = insert_before(p, "> **Previous version: v2.69.0**", NEW_HEAD, "new-head")

# ---- 2. the §2.31 ledger (before §3's heading) ---------------------------
LEDGER = """### 2.31 Session-273 audit ledger (the fresh-eyes round over the v2.69.0 ship state)

Three Mode-C passes (the R-69 cure surfaces · the API/auth/security
layer · the UI/a11y/shell layer), every material claim re-verified at
file:line by the driving session. The API layer's twenty-sixth
consecutive clean bill and the UI layer's eight standing contracts
are the round's clean columns; the genuine rot is one promoted
register entry and one standing toolchain warning.

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-273a | Low | **THE SHELL ROOT'S h-screen (100vh) IS THE DYNAMIC-VIEWPORT TRAP — the F-220p register entry, promoted with the reference construction decoded.** SHELL_LAYOUT.root reads "flex h-screen overflow-hidden bg-background page-wash" — the viewport-locked internal-scroller shell (the F-210a absorbed superset). On iOS Safari the static 100vh extends under the expanded browser chrome while overflow-hidden keeps the document itself from ever scrolling, so the bottom of main's scroll region (the copyright footer, list bottoms) is unreachable until the toolbar collapses — the exact genus the F-219h drawer cure fixed inside the sheet, at the shell. The R-17 (F-220p) registration said "h-dvh is the robust form — reference construction unknown"; this session decoded it: the reference has NO fixed-height shell (F-207e: its shells are min-h-screen document-scrolled; F-210a: the scroll-model divergence is the deliberate superset), so no parity constraint binds the height mechanism and the swap is parity-neutral — in headless Chromium 100dvh equals 100vh, leaving every pixel-level gate byte-identical. Two comment carriers ride the same token (page-layout.ts:30, app-shell.tsx:15 — comment-carried h-screen emits dead CSS once the code site is cured, the F-229d net's own trigger). | `src/lib/page-layout.ts:12` (the code site) · `src/lib/page-layout.ts:30` + `src/components/layout/app-shell.tsx:15` (the comment carriers) vs the F-220p register row and the F-207e/F-210a reference decode | **R-70** (the root swaps to h-dvh; both comments reworded to the dynamic-viewport form; pinned by the parity-273 shell-root and comment-carrier legs) |
| F-273b | Low | **THE VITEST CONFIG RIDES THE DEPRECATED CONFIG-LOADER PATH — the warning fires on every unit run.** "Your Vite config uses features that are unsupported by `configLoader: 'native'`, which is planned to become the default in a future major version of Vite: ESM syntax in a file loaded as CommonJS (vitest.config.ts:1:1). Use a `.mjs` extension or set `\\"type\\": \\"module\\"`". The config already uses import.meta.dirname (ESM-only); the runner loader transpiles it today, the future native default would fail to load it. Cure path empirically validated pre-plan: the rename to vitest.config.mts eliminates the warning (0 occurrences on a scratch run) and trips exactly the parity-229 root-config walk pin (born RED by design — the contract-change rule updates it in the same commit). | `vitest.config.ts:1` vs the warning reproduced on every `CI=1 vitest run` · the scratch-rename validation (this session) | **R-70** (git mv to vitest.config.mts + the six reference sites trued: next.config.ts:75 exclusion entry, tests/parity-229.test.ts:172,261 walk lists, README.md:107 tree row, wealth-os_SKILL.md:185 file card, playwright.config.ts:19 comment; pinned by the parity-273 rename legs) |
| F-273c | Informational | **THE §2.30 LEDGER'S PAD LINE ANCHORS DRIFTED +59 LINES.** The R-69 commit prepended the v2.69.0 revision entry at the PAD head, shifting every downstream anchor cited in the ledger (3831→3890, 3184→3240, 3406→3462, 3627→3685, 3872→3931, 3616→3674). Inherent to the revision-block-prepend convention; the documented navigation practice is content-grep, not line numbers. | `docs/remediation_plan_v2.md` §2.30 citations vs the current PAD | Registered (the convention documented; not cured) |
| F-273d | Informational | **THE A11Y SPEC'S SANCTIONED-REGISTER MATCHING IS SUBSTRING-BASED.** The matcher's `target.includes(needle)` approves any flagged node carrying a sanctioned class on any surface — a future sub-AA regression reusing a sanctioned class would auto-pass the two-gate. The register discipline (retiring stale arms every round) is the documented mitigation; the tightening (full class-token equality) deferred to the next register touch. | `tests/e2e/a11y.spec.ts:109` | Registered (the tightening deferred; the discipline documented) |
| F-273e | Informational | **background-attachment: fixed IS IGNORED ON iOS SAFARI.** The page-wash's radial glows ride content instead of the viewport on WebKit. The flat --color-background base still paints the canvas — only the decorative glow positioning degrades on one browser family. | `src/app/globals.css:496` | Registered (no cure required; a @supports guard is the shape if ever revisited) |

Recorded, not cured: F-273c, F-273d, F-273e. The audit's clean
columns: the API/auth/security layer's twenty-sixth consecutive clean
bill (thirteen contracts, 45 handlers / 30 route files) and the
UI/a11y/shell layer's eight standing contracts all holding live. The
round also re-confirmed the standing registers (the sidebar brand h2
— the F-242h register; the WCAG-exemption register — the documented
parity posture; the toast max-h-screen — cured with F-273a as the
same-genus completion, not a separate row).

"""

p = insert_before(p, "## 3. The remediation program (R-items)", LEDGER, "ledger")

# ---- 3. the R-70 section (above R-69's) ----------------------------------
R70 = """### R-70 — The dynamic-viewport, config-loader, and register-promotion round (session 273)

The operator re-sent the standing directive after the R-69 ship pair
(488b49c2 + the owner's 545710ad session-log update carrying
docs/session_128.md, the session-272 transcript — fetched by the
fresh clone and reviewed at intake per the odd-number record
convention). Per the recorded rhythm, findings-led iteration. The
intake and the standing layers are recorded in the version header
above; this section carries the findings, the cures, and the
verification contract.

**The findings (each verified at file:line by the driving session —
the API layer's twenty-sixth consecutive clean bill and the UI
layer's eight standing contracts are the round's clean columns; the
genuine rot is one promoted register entry and one standing
toolchain warning):** the §2.31 ledger's five rows — F-273a THE
ROUND'S FLAGSHIP (the shell root's h-screen dynamic-viewport trap —
the F-220p register entry promoted with the reference construction
decoded: the reference has no fixed-height shell, the scroll-model
divergence is the F-210a absorbed superset, so the h-dvh swap is
parity-neutral by construction and byte-identical in headless
Chromium where 100dvh equals 100vh; on iOS Safari the static 100vh
plus overflow-hidden left the bottom of main's scroll region
unreachable behind the expanded browser chrome — the F-219h genus at
the shell; two comment carriers ride the same token) · F-273b THE
RIDER (the vitest config-loader deprecation — the warning fires on
every unit run; the .mts rename cures it, empirically validated
pre-plan; the parity-229 walk pin trips born-RED by design and rides
the contract-change rule) · F-273c/F-273d/F-273e THE THREE
REGISTERED NOTES (the ledger anchor drift inherent to the prepend
convention; the axe substring matching with its documented register
discipline; the iOS background-attachment degradation of the
decorative wash).

**The cures (R-70.2):** the shell root swaps h-screen → h-dvh
(SHELL_LAYOUT.root, page-layout.ts:12) with both comment carriers
reworded to the dynamic-viewport form (page-layout.ts:30,
app-shell.tsx:15 — a comment-carried h-screen would emit dead CSS
once the code site is cured, the F-229d net's own trigger) and the
toast column's max-h-screen → max-h-dvh (toast.tsx:94 — the
same-genus completion: a fixed-position element capped at the static
viewport on the mobile widths where the dynamic toolbar lives); the
min-h-screen document-scrolled forms (the auth faces, the error
pages, the body, the page shells) are classified SAFE by construction
(min-height on document-scrolled surfaces never traps content — the
page can always scroll) and recorded, not touched. The vitest config
renames to vitest.config.mts with its six reference sites trued in
the same commit (the next.config.ts outputFileTracingExcludes entry,
the parity-229 root-config walk lists at both sites, the README tree
row, the skill doc's file card, the playwright config comment).

**The verification contract (R-70.3):** the parity-273 battery born
honest RED against the pre-cure tree (the false forms ride the tree
at HEAD: the h-screen root and comments, the max-h-screen toast, the
.config.ts filename and its reference sites) → the cures →
parity-273 GREEN · parity-229 GREEN at the updated walk list ·
docs-counts GREEN at the advanced trio (the v2.70.0 block lands
together with the advance — the F-249b structural gate enforces the
pairing) · the sibling batteries GREEN (parity-272 · parity-271 ·
parity-243 · parity-236 · parity-270) → lint 0/0 · tsc 0 · the unit
suite at the new count · build · smoke 15/15 (leg 14's artifact
hygiene now excludes the .mts form) · the FULL e2e battery 161/161
(zero new legs — the swap is a class-token change over an identical
computed height in the e2e environment; the standing battery the
proof) · **the six parity drift gates RE-RUN CLEAN** (the round
changed a swept surface — the shell root class — and the honest
verification is the drift chain itself: the four sweep classes, the
fullpage axis, and the interior census proving zero pixel movement,
the dvh-equals-vh property demonstrated rather than asserted) ·
census MATCH · the captures (the standing evidence faces + the
round's touched surface — the shell, evidenced at desktop and the
390 drawer).

"""

p = insert_before(
    p,
    "### R-69 — The census-reanchor, phantom-primitive, and layer-map round (session 272)",
    R70,
    "r70-section",
)

with open("docs/remediation_plan_v2.md", "w", encoding="utf-8") as f:
    f.write(p)

print("plan v2.70.0 written: head flip + §2.31 ledger + R-70 section")
