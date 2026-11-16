#!/usr/bin/env python3
# Session-262 (R-59) plan writer: the version header, the §2.20 audit
# ledger, the R-59 section, and the §5 execution-history row — each edit
# asserted (the docs-243 scoping doctrine: every replacement asserts the
# OLD form inside its slice before writing).
import sys

PATH = "docs/remediation_plan_v2.md"
src = open(PATH, encoding="utf-8").read()
orig = src

# ---- 1. the version header: insert v2.59.0 above, demote v2.58.0 ---------
cur = "> **Current version: v2.58.0** (session 261 — the"
assert src.count(cur) == 1, "v2.58.0 current-version anchor not unique"
NEW_HEADER = """> **Current version: v2.59.0** (session 262 — the
description-length, muted-figure, and citation-completion round R-59: the
operator re-sent the standing directive after the R-58 ship pair
(929f4a72 + the owner's 13dabf13 session-log update carrying
docs/session_106.md, the session-261 transcript capture). Per the
recorded rhythm, this session defaulted to findings-led iteration:
refresh, re-audit, remediate, verify, capture, document, commit, push —
with the operator's named asks (the mobile navigation comparison, the
Tailwind v4 state, the .env/db contract, the vitest/playwright configs,
the sitemap/SEO surface, the .env.example, the screenshots, the
SSH-wrapper push) re-verified along the way. The intake: the workspace
RE-CLONED from cold (the sandbox reset left no wealth-os directory) to
HEAD 13dabf13 (the R-58 ship 929f4a72 + the owner's session-log update;
tree clean); the environment rebuilt from cold (bun install — also
regenerating the prisma client into src/generated/prisma · a fresh .env
on the DATABASE_URL="file:../db/custom.db" contract with a fresh openssl
AUTH_SECRET · db:push · db:seed · playwright chromium install), db/ at
the repo root, and the census MATCH (80/4/3/6/5/7, users=1). The cold
baseline gate ran GREEN — the v2.58.0 ship state reproduced exactly, no
discovery: lint 0/0 · tsc 0 · 1800/1800 unit (113 files) · build (the 4
documented Turbopack tracing warnings) · smoke 15/15 · 152/152 e2e ·
census MATCH. The standing asks: probe:ref STABLE on every layer (the
bundle md5 6d3779af… unchanged, the F-250q stylesheet fingerprint
96f24d45… unchanged, the demo data zero, the desktop nav 256/9, the
TRUE-390 menu census standing); THE MOBILE-NAVIGATION COMPARISON re-run
at TRUE 390×844 on BOTH sides (the reference through agent-browser —
the viewport verified by computed innerWidth: 9 destinations + Sign
Out, closes on the X toggle, zero visible nav links after the close;
OUR SIDE — the production artifact on the scratch db/comparison.db per
the session-253 toolchain note, booted in a single invocation per the
session-98 server-death lesson — the identical 9 destinations + Sign
Out via the labeled hamburger, the aria-expanded flip verified on open
AND close, zero visible nav links after the close — parity plus the
documented superset, NO Tailwind v4 regression; both comparison
captures re-saved PNG-valid at the true viewport, 98.37% and 99.99%
non-white); `bun audit` unchanged (1 moderate dev-chain minimatch, the
documented deferral); neo-crm unchanged (b3d0fbe) — nothing to port;
the SEO surface verified (smoke leg 12: sitemap + robots + manifest
200); the .env contract + the db/ at the repo root + the
vitest/playwright configs + the .env.example six-knob set all standing.
The session-262 fresh-eyes audit (three Mode-C passes: the R-58 cure
surfaces driven by the session — the parity-261 battery re-run green
11/11 at HEAD · the API/auth/security layer — the FIFTEENTH consecutive
clean bill (all ten house contracts, 40 handlers / 24 route files read
line-by-line, every candidate examined and dismissed into a documented
posture) · the UI/a11y/shell layer — clean on every named contract with
eight new findings): 0 Critical / 0 High / 0 Medium / 5 Low /
3 Informational NEW after dedup, every material claim re-verified at
file:line by the driving session — whose whole-tree sweeps EXTENDED two
genera beyond the audit's bounds (the description-length genus from
four to SIX carriers — the audit missed the two pwa-metadata test-file
comment carriers; the muted-figure genus from one to TWO carriers — the
audit missed the dark-tokens test-file comment carrier) and whose
independent WCAG recomputation (a second engine, Python against the
live palette) confirmed every figure the audit challenged and every
figure the audit cleared. The plan v2.59.0 written and validated against
the tree (the genus sweeps above; the cure directions resolved against
the metadata family's own 314-length pin — the stale citations
contradict the tree's own test).

"""
src = src.replace(cur, NEW_HEADER + cur, 1)
print("plan-262: version header written (v2.59.0 above v2.58.0)")

# ---- 2. the §2.20 ledger (before §3) --------------------------------------
SEC3 = "## 3. The remediation program (R-items)"
assert src.count(SEC3) == 1, "§3 heading not unique"
LEDGER = """### 2.20 Session-262 audit ledger (the fresh-eyes round over the v2.58.0 ship state)

Three Mode-C passes (the R-58 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer); every material
claim re-verified at file:line by the driving session before planning
(the parity-261 battery re-run green 11/11 at HEAD; the API layer's
fifteenth consecutive clean bill — 40 handlers / 24 route files read
line-by-line, every candidate examined and dismissed into a documented
posture; the UI layer clean on every named contract with eight new
findings — all in the two genera the recent rounds harvest, mis-cited
figures and stale prose). NEW after dedup: 0 Critical / 0 High /
0 Medium / 5 Low / 3 Informational.

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-262a | Low | **THE DESCRIPTION-LENGTH CITATION GENUS — six prose carriers cite a 405-char description the tree serves at 314 chars.** The live SITE_DESCRIPTION measures 314 characters and the tree's own metadata pin asserts exactly that (`tests/metadata.test.ts` toHaveLength(314)) — yet SIX comment carriers still claim 405, a figure that dates from the pre-rebrand (NEO CRM) description mirrored "verbatim" at session 18; the WealthOS rewrite (session 199) never trued it. The impact sits on a fidelity assertion: a maintainer auditing parity would compute 314, find a 91-char discrepancy, and could "restore" a padded string, regressing the test-pinned parity value. The driving session's whole-tree sweep bounds the genus at SIX carriers (the audit found four; the two pwa-metadata test-file comment carriers are the completion). | `src/lib/site.ts:25,45` · `src/app/layout.tsx:18` · `src/app/login/page.tsx:15` · `tests/pwa-metadata.test.ts:12,27` | **cured in R-59** (all six carriers trued to the measured 314) |
| F-262b | Low | **THE MUTED-TOKEN FLIP'S MIS-CITED FIGURE — "a dark surface would compute 2.9:1" reproduces on no dark surface.** Recomputed by code (two independent engines against the live palette): the light muted #78716c on the dark surface token #0a0a0a computes **4.13:1**, on the dark page wash #0e1310 **3.91:1**, on stone-900 **3.65:1** — no plausible dark surface yields 2.9 (the nearest straddlers are 3.16 and 2.16). The conclusion survives (under the 4.5:1 text bar on every dark surface — the flip is still needed), but the figure was wrong by ~30%. TWO carriers (the audit found one; the dark-tokens test-file comment carrier is the completion). | `src/app/globals.css:391` · `tests/dark-tokens.test.ts:106` | **cured in R-59** (both carriers trued to the computed figures — under the 4.5:1 bar, 4.13:1 on the surface token / 3.91:1 on the page wash) |
| F-262c | Low | **THE DIALOG-CLOSE FIGURE CITED THE WRONG SURFACE — "2.47:1 in dark (stone-600 on the flipped surface)" computes 2.59:1 on the surface.** Stone-600 #57534e on the dialog's flipped surface token #0a0a0a (set five sessions before this citation) computes **2.59:1**; 2.47 is the page-wash pairing (#0e1310) — the wrong surface for a glyph that rides the dialog's bg-surface. The conclusion (below the 3:1 non-text bar) is unchanged on every candidate surface. The sibling stone-500 figure in the same comment was already trued once (4.95→4.80, R-55/F-258a); this one was missed by that sweep. | `src/lib/page-layout.ts:329` | **cured in R-59** (the figure trued to 2.59:1; the retired pairing described without citation per the F-229d discipline) |
| F-262d | Low | **THE BADGE COMMENT ATTRIBUTES THE WHITE PAIR'S FIGURE TO THE NEUTRAL-50 PAIR — "text-neutral-50 on --color-danger #ef4444 = 3.76:1" computes 3.61:1.** The destructive badge variant renders text-neutral-50 #fafafa, which computes **3.61:1** on #ef4444; 3.76:1 is the white-on-danger figure — correctly cited at its four sibling carriers (button, toast, dropdown, page-parts, all white or red-on-white pairs). The badge comment is the one mis-attributed instance; both values are sub-4.5:1 so the registered conclusion (latent sub-AA arm) is unchanged. | `src/components/ui/badge.tsx:39` | **cured in R-59** (the pair's own 3.61:1 cited; the white family's figure stays at its correct carriers) |
| F-262e | Low | **THE INVESTMENT-CHIP RANGE SPAN — "the 500-level `color` renders 2.1–3.7:1" understates both ends.** Recomputed per type against the live palette (10% tint over white): bond #f59e0b **1.99:1** (the cited 2.1 floor overstates the worst case), etf #10b981 2.31, realestate #f43f5e 3.23, stock #3b82f6 3.27, crypto #a855f7 **3.50:1**, other #78716c **4.25:1** (the neutral fallback — the cited 3.7 ceiling understates it). The adjacent 600/700-level claim verifies (4.65–6.76 across all six). The conclusion (500-level colors sub-AA as chip text; the `text`/`textDark` fields exist for that reason) is unchanged and arguably reinforced. | `src/lib/constants.ts:109` | **cured in R-59** (the range trued to 1.99–3.50:1 with the neutral fallback's 4.25:1 named) |
| F-262f | Informational | **THE SITE.TS HEADER NAMES RETIRED FILE PATHS — app/sitemap.ts and app/robots.ts do not exist.** The header claims "Every metadata surface (the root layout's metadataBase + OG/Twitter cards, app/sitemap.ts, app/robots.ts) derives from siteUrl()" — but those file-convention paths were retired in the same session-18 commit that wrote this comment, replaced by the route handlers (src/app/sitemap.xml/route.ts, src/app/robots.txt/route.ts); a third consumer (the manifest.json route) is unnamed. The claim's substance holds (all three handlers call siteUrl()). | `src/lib/site.ts:7-8` | **cured in R-59** (the three real route handlers named) |
| F-262g | Informational | **THE GLOBALS.CSS EXTRACTOR CLAIM IS FALSE FOR THE CURRENT TOOLCHAIN — "the extractor scans stylesheets as well."** Build-probed twice (the audit and the driving session): globals.css names the token scale member at its own line, yet the fresh production stylesheet carries no standalone rule for it — only the live backdrop form from src code; every vendored animation utility name is likewise absent from the build. Automatic content detection does not scan stylesheets in the current pipeline. The conservative practice the comment justifies (class-free comments) stays — the mechanism claim goes. | `src/app/globals.css:14` | **cured in R-59** (the parenthetical reworded to the convention form — the discipline kept, the false mechanism retired) |
| F-262h | Informational | **TWO LOOSE SOFT-FIGURE CITATIONS (the same genus, folded).** (a) The synced-pill comment attributes one figure to two tokens — "green-400/green-600 compute 10.04:1": green-400 computes 10.04:1 on the sidebar gradient but the green-600 border computes **5.31:1** (both pass their bars — text ≥4.5, border ≥3 — so no a11y impact). (b) The gradient-card register's "text-white/60 ≈ 1.6:1" computes **1.73:1** (the adjacent white/70 ≈ 1.9 verifies at 1.91). | `src/lib/page-layout.ts:46` · `src/components/shared/page-parts.tsx:136` | **cured in R-59** (the pill's two figures named separately; the register trued to ≈ 1.7:1) |

Recorded, not cured: F-257a and F-257r (the standing registers,
plan §2.15), the ai-coach `history` caution (the R-5 register — the LLM
provider's wiring must treat the field as client-supplied untrusted
input), the sidebar h2-before-h1 observation (the reference's own
construction), plus the standing families (F-252k, F-251i-k, F-250h-p,
F-249j-n, F-248h-n, F-247g-l, F-246g/h, F-245g/h, F-244i-n, F-242h/i,
F-240k-n, F-239l-s — plan §2.12's register), plus the toolchain note
(the agent-browser/HeadlessChrome-157 dev-build hydration gap — session
253; re-confirmed this session: the clone-side comparison rode the
production artifact cleanly, the reference side rode agent-browser).
Next session defaults to findings-led iteration — re-send the standing
directive to continue the rhythm.

"""
src = src.replace(SEC3, LEDGER + SEC3, 1)
print("plan-262: §2.20 ledger written (before §3)")

# ---- 3. the R-59 section (above R-58) --------------------------------------
R58 = "### R-58 — The heading-prose, dead-brand, and citation-truing round (session 261)"
assert src.count(R58) == 1, "R-58 heading not unique"
R59 = """### R-59 — The description-length, muted-figure, and citation-completion round (session 262)

The operator re-sent the standing directive after the R-58 ship pair
(929f4a72 + the owner's 13dabf13 session-log update carrying
docs/session_106.md, the transcript capture). Per the recorded rhythm,
findings-led iteration. The intake and the standing layers are recorded
in the version header above; this section carries the findings, the
cures, and the verification contract.

**The findings (each verified at file:line by the driving session —
the genera bounded by whole-tree sweeps that EXTENDED two of them
beyond the audit's bounds, every figure recomputed by code in a second
engine):** the §2.20 ledger's eight rows — F-262a the
description-length citation genus (six carriers citing 405 chars
against the tree's own 314-length pin), F-262b the muted-token flip's
mis-cited figure (2.9:1 reproduces on no dark surface; the true span
is 3.91–4.13:1, still under the text bar), F-262c the dialog-close
figure (2.47:1 was the page-wash pairing; the surface computes
2.59:1), F-262d the badge comment's mis-attributed figure (the
neutral-50 pair computes 3.61:1; 3.76:1 is the white family's),
F-262e the investment-chip range (the true span is 1.99–3.50:1 with
the neutral fallback at 4.25:1), F-262f the retired sitemap/robots
file paths in the site seam's header, F-262g the false
extractor-scans-stylesheets mechanism claim (build-probed), F-262h the
two loose soft figures (the synced pill's dual-token attribution; the
gradient register's 1.6-vs-1.7 rounding).

**The cures (R-59.2):** the six description-length carriers trued to
the measured 314 (site.ts twice, the root layout, the login page, the
pwa-metadata test twice — the figure the tree's own metadata pin
asserts) · the two muted-figure carriers trued to the computed span
(under the 4.5:1 text bar: 4.13:1 on the dark surface token, 3.91:1 on
the dark page wash — globals.css + the dark-tokens test comment) · the
dialog-close figure trued to 2.59:1 with the retired pairing described
without citation · the badge comment trued to its own pair's 3.61:1
(the white family's 3.76:1 stays at its four correct carriers) · the
chip range trued to 1.99–3.50:1 with the neutral fallback's 4.25:1
named · the site seam's header names the three real route handlers
(sitemap.xml / robots.txt / manifest.json) · the globals.css
parenthetical reworded to the convention form (the class-free
discipline kept, the false mechanism retired) · the synced pill's two
figures named separately (10.04:1 text, 5.31:1 border) and the
gradient register trued to ≈ 1.7:1. No rendered surface changes: the
class strings, the components, the runtime behavior, and the parity
baselines are all untouched (prose-only cures; the sweeps compare
computed classes).

**The verification contract (R-59.3):** the parity-262 battery born
honest RED against the pre-cure tree (the description-length legs —
per-file 405-carrier absence plus the trued 314 presence, with the
metadata pin's own length assertion as the green-by-design rider · the
muted-figure legs at both carriers · the dialog-close leg · the badge
leg with the white-family sibling-safety rider · the chip-range leg ·
the site-seam route-naming leg · the extractor-parenthetical leg · the
two soft-figure legs) → the cures → parity-262 GREEN → lint 0/0 ·
tsc 0 · the unit suite at the new count · build · smoke 15/15 · the
FULL e2e battery 152/152 · census MATCH · the captures (the served
meta-description face asserted live at 314 chars — the round's
headline surface; the investment-chip face with the six-type census;
the standing mobile drawer at 390 with the 9-destination + Sign Out
census) + the two comparison captures at TRUE 390×844 (re-saved this
session at the standing names). The six parity drift gates: the
session-253 precedent applies — the cures are prose, not class; no
baseline-carried parity surface is touched.

"""
src = src.replace(R58, R59 + R58, 1)
print("plan-262: R-59 section written (above R-58)")

# ---- 4. the §5 execution-history row at the head ---------------------------
sep = "| Version | Session | R-items executed | Gate at ship | Commit |"
assert src.count(sep) == 1, "§5 table header not unique"
ROW = """| v2.59.0 | 262 | **R-59** (the description-length, muted-figure, and citation-completion round — findings-led, the standing directive with the reference STABLE on every standing drift layer and the mobile-navigation ask verified on BOTH sides at TRUE 390×844 (the reference through agent-browser, the viewport verified by computed innerWidth; the clone side riding the production artifact on the scratch db/comparison.db per the session-253 toolchain note, booted in a single invocation per the session-98 server-death lesson — the aria-expanded flip verified on open AND close, zero visible nav links after the close); the cold baseline GREEN at HEAD 13dabf13 — the v2.58.0 ship state reproduced exactly, no discovery). The audit round: the standing layers re-verified (probe:ref STABLE — the bundle md5, the F-250q stylesheet fingerprint, the demo data zero, the desktop nav 256/9, the TRUE-390 menu census; `bun audit` unchanged (1 moderate dev-chain minimatch, the documented deferral); neo-crm unchanged (b3d0fbe); the SEO surface verified (smoke leg 12); the .env contract + the db/ at the repo root + the vitest/playwright configs + the .env.example six-knob set all standing). The session-262 fresh-eyes audit (three Mode-C passes: the R-58 cure surfaces — the parity-261 battery re-run green 11/11 · the API/auth/security layer — the FIFTEENTH consecutive clean bill (all ten house contracts, 40 handlers / 24 route files, every candidate dismissed into a documented posture) · the UI/a11y/shell layer — clean on every named contract, eight new findings): 0 Critical / 0 High / 0 Medium / 5 Low / 3 Informational NEW after dedup, every material claim re-verified at file:line by the driving session — whose whole-tree sweeps EXTENDED two genera beyond the audit's bounds (the description-length genus four→SIX carriers; the muted-figure genus one→TWO carriers) and whose second-engine WCAG recomputation confirmed every challenged figure. THE ROUND'S FINDINGS: F-262a the description-length citation genus · F-262b the muted-token flip's mis-cited figure · F-262c the dialog-close figure's wrong surface · F-262d the badge comment's mis-attributed figure · F-262e the investment-chip range span · F-262f the retired sitemap/robots file paths · F-262g the false extractor mechanism claim · F-262h the two loose soft figures. The plan v2.59.0 written and validated against the tree. **R-59.1** the pins born RED (the parity-262 battery — the description-length genus legs, the muted-figure legs, the dialog-close leg, the badge leg, the chip-range leg, the route-naming leg, the extractor-parenthetical leg, the soft-figure legs) → **R-59.2** the cures (thirteen carrier edits across seven files + the two test-file carriers) → **R-59.3** the verification (parity-262 GREEN · lint 0/0 · tsc 0 · the unit suite at the new count · build · smoke 15/15 · 152 e2e · census MATCH · the captures — the served meta face at 314 chars, the chip face with the six-type census, the standing mobile drawer at 390; the two comparison captures at TRUE 390×844; the six parity drift gates per the session-253 precedent — no baseline-carried surface touched) | (the gate column is completed at ship — see the worklog row) | (this session's execution commit) |
"""
src = src.replace(sep, sep + "\n" + ROW, 1)
print("plan-262: §5 execution-history row written")

assert src != orig, "no edits applied"
open(PATH, "w", encoding="utf-8").write(src)
print("plan-262: 4 edits written (version header · §2.20 ledger · R-59 section · §5 row)")
