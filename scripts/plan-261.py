#!/usr/bin/env python3
# Session-261 (R-58) plan writer: the version header, the §2.19 audit
# ledger, the R-58 section, and the §5 execution-history row — each edit
# asserted (the docs-243 scoping doctrine: every replacement asserts the
# OLD form inside its slice before writing).
import sys

PATH = "docs/remediation_plan_v2.md"
src = open(PATH, encoding="utf-8").read()
orig = src

# ---- 1. the version header: insert v2.58.0 above, demote v2.57.0 ---------
cur = "> **Current version: v2.57.0** (session 260 — the"
assert src.count(cur) == 1, "v2.57.0 current-version anchor not unique"
NEW_HEADER = """> **Current version: v2.58.0** (session 261 — the
heading-prose, dead-brand, and citation-truing round R-58: the owner's
standing directive re-sent after the R-57 ship pair (06c52d1b + the
owner's 74e7eec5 session-log update carrying docs/session_103.md, the
session-260 record, and docs/session_104.md, the transcript capture).
Per the recorded rhythm, this session defaulted to findings-led
iteration: refresh, re-audit, remediate, verify, capture, document,
commit, push — with the operator's named asks (the mobile navigation
comparison, the Tailwind v4 state, the .env/db contract, the
vitest/playwright configs, the sitemap/SEO surface, the .env.example,
the screenshots, the SSH-wrapper push) re-verified along the way. The
intake: the workspace RE-CLONED from cold (the sandbox reset left the
clone directory empty) to HEAD 74e7eec5 (the R-57 ship 06c52d1b + the
owner's session-log update; tree clean); the environment rebuilt from
cold (bun install — also regenerating the prisma client into
src/generated/prisma · a fresh .env on the
DATABASE_URL="file:../db/custom.db" contract with a fresh openssl
AUTH_SECRET · db:push · db:seed · playwright chromium install), db/
at the repo root, and the census MATCH (80/4/3/6/5/7, users=1). The
cold baseline gate ran GREEN — the v2.57.0 ship state reproduced
exactly, no discovery: lint 0/0 · tsc 0 · 1789/1789 unit (112 files)
· build (the 4 documented Turbopack tracing warnings) · smoke 15/15
· 152/152 e2e · census MATCH. The standing asks: probe:ref STABLE on
every layer (the bundle md5 6d3779af… unchanged, the F-250q stylesheet
fingerprint 96f24d45… unchanged, the demo data zero, the desktop nav
256/9, the TRUE-390 menu census standing); THE MOBILE-NAVIGATION
COMPARISON re-run through agent-browser at TRUE 390×844 on BOTH sides
(the viewport verified by computed innerWidth; the reference: 9
destinations + Sign Out, closes on the X toggle, zero visible nav
links after the close; OURS — the production artifact on a scratch
db per the session-253 toolchain note, booted in a single invocation
per the session-98 server-death lesson — the identical destinations +
Sign Out via the labeled hamburger, the aria-expanded flip
Open→Close navigation menu verified on open AND close, zero visible
nav links after the close — parity plus the documented superset, NO
Tailwind v4 regression; both comparison captures re-saved PNG-valid
at the true viewport); `bun audit` unchanged (1 moderate dev-chain
minimatch, the documented deferral); neo-crm unchanged (b3d0fbe) —
nothing to port; the SEO surface verified (smoke leg 12: sitemap +
robots + manifest 200); the .env contract + the db/ at the repo root
+ the vitest/playwright configs + the .env.example six-knob set all
standing. The session-261 fresh-eyes audit (three Mode-C passes: the
R-57 cure surfaces driven by the session — the parity-260 battery
re-run green 10/10 at HEAD · the API/auth/security layer — the
FOURTEENTH consecutive clean bill (all ten house contracts, all 45
exported handlers across 30 route files, the counts confirmed
exactly) · the UI/a11y/shell layer — clean on every named contract
(the shell family, the theme system, the Tailwind v4 token
discipline, the store, the route twins, the metadata family, the
day-label seams, the focus/contrast family all holding; every
recomputed contrast figure checks out except the round's one stale
citation)): 0 Critical / 0 High / 0 Medium / 3 Low / 1 Informational
NEW after dedup, every material claim re-verified at file:line by
the driving session — whose whole-tree sweeps bounded each genus
(the h2 prose genus at exactly SEVEN carriers across three files;
the never-consumed constants genus at exactly the brand pair against
the 19-export census; the mis-cited figure at exactly two carriers;
the vestigial-export genus at exactly two survivors) and whose code
recomputation confirmed the citation defect (white #ffffff vs
stone-300 #d6d3d1 computes 1.49:1 — the cited 1.63:1 fails to
reproduce on any surface pairing; the companion figures 1.48 and
4.75 check out). The plan v2.58.0 written and validated against the
tree (the genus sweeps above; the cure directions resolved against
the F-231b/R-28 heading-focus record — the h1 renders are the
deliberate heading-order construction, the prose trues TO them).

"""
src = src.replace(cur, NEW_HEADER + cur, 1)
print("plan-261: version header written (v2.58.0 above v2.57.0)")

# ---- 2. the §2.19 ledger (before §3) --------------------------------------
SEC3 = "## 3. The remediation program (R-items)"
assert src.count(SEC3) == 1, "§3 heading not unique"
LEDGER = """### 2.19 Session-261 audit ledger (the fresh-eyes round over the v2.57.0 ship state)

Three Mode-C passes (the R-57 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer); every
material claim re-verified at file:line by the driving session
before planning (the parity-260 battery re-run green 10/10 at HEAD;
the API layer's fourteenth consecutive clean bill — all ten house
contracts, 45 handlers / 30 route files confirmed by grep census; the
UI layer clean on every named contract with four new findings).
NEW after dedup: 0 Critical / 0 High / 0 Medium / 3 Low /
1 Informational.

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-261a | Low | **THE AUTH-VIEW HEADING PROSE GENUS — the vocabulary docblocks and test comments still describe an h2 the tree no longer renders.** All five in-place auth-card views render `<h1>` with the shared title family (the F-231b/R-28 heading-focus construction: one h1 per view, the shared titleRef, tabIndex -1 on swap-focus; the heading-order normalization) while SEVEN prose carriers still claim h2 — the LOGIN_RESET_LAYOUT / LOGIN_SIGNUP_LAYOUT / LOGIN_VERIFY_LAYOUT title docblocks ("Both views' h2", "The view's h2", "The view's h2"), the login-reset test's DOM comment ("DOM: <h2 class=…"), and the login-views comment + test title ("→ h2 \\"Create your account\\"", "the h2 reuses the s11 title vocabulary"). Prose-only: zero rendering or a11y impact (one h1 per view passes heading-order; the class strings are identical either way); the tree is internally inconsistent about its own construction, the exact genus the prose-truth rounds exist to purge. The whole-tree sweep bounds the genus at exactly these seven carriers across three files (LOGIN_LAYOUT's title docblock claims nothing; the login-card comments already say h1 truthfully). | `src/lib/login-reset.ts:98,169,234` · `tests/login-reset.test.ts:76-77` · `tests/login-views.test.ts:35,200` | **cured in R-58** (the seven prose carriers trued to the rendered h1 — the F-231b heading-focus vocabulary; the rendered construction itself unchanged) |
| F-261b | Low | **THE NEVER-CONSUMED BRAND CONSTANTS — APP_NAME / APP_TAGLINE ride constants.ts with zero consumers.** The 19-export census of src/lib/constants.ts finds exactly these two members unreferenced anywhere in src/, tests/, or scripts/ (the same literals live on hand-inlined at their three render sites: BrandMark's wordmark + tagline, the mobile header's wordmark, the footer copyright). The F-229f unwired-constant genus's brand edition — the currency-symbol map, the gray-500 pin, and the BUTTON_BASE radius member were retired the same way; the file's own currency-map comment already names the doctrine ("Reintroduce WITH a consumer"). | `src/lib/constants.ts:202-203` | **cured in R-58** (the pair retired; the literals live on inline at their three sites) |
| F-261c | Low | **THE SETTINGS-SWITCH COMMENT'S MIS-CITED FIGURE — "the white thumb vs it 1.63:1" fails to reproduce.** Recomputed by code (both the audit's and the driving session's): white #ffffff against stone-300 #d6d3d1 = **1.49:1** (the companion figures check out: stone-300 on the white/80-over-wash card 1.48:1 as cited 1.49 within rounding, the stone-500 border 4.75:1 exactly); the cited 1.63 computes on no surface pairing — the F-258a/F-258h citation-math genus's one stale survivor (every other recomputed figure in the audit's ~20-figure census checks out exactly). The same stale 1.63 rides the plan's F-221n register row. | `src/app/(app)/settings/page.tsx:456-457` · `docs/remediation_plan_v2.md:2517` (the F-221n row) | **cured in R-58** (both carriers trued to the computed 1.49:1) |
| F-261d | Informational | **THE VESTIGIAL-EXPORT GENUS'S NEXT TWO CARRIERS — BrandMark and DEFAULT_DATABASE_URL export for no external consumer.** The whole-tree vestigial sweep (exported declarations whose only consumers are same-file) finds exactly two survivors alongside the F-261b dead pair: BrandMark (sidebar.tsx:47 — its only call site is the same file's aside; the parity-232 test names it in a TITLE, not an import) and DEFAULT_DATABASE_URL (db-path.ts:45 — consumed only by the same file's fallback arm at line 161; the db-path tests import the four seam functions, not the constant). The F-234j genus (resolveTheme / readStoredTheme / ExpenseDialog cured before). | `src/components/layout/sidebar.tsx:47` · `src/lib/db-path.ts:45` | **cured in R-58** (the export keywords dropped, module-local; the declarations and their same-file consumers unchanged) |

Recorded, not cured: the sidebar wordmark h2 precedes the page h1
in DOM order across aside→main (the reference's own live-extracted
construction, NAV_LAYOUT-pinned; axe's heading-order rule flags
upward skips only — an observation, no action), F-257a and F-257r
(the standing registers, plan §2.15), the ai-coach `history` caution
(folded into the R-5 register — the LLM provider's wiring must
treat the field as client-supplied untrusted input), plus the
standing families (F-252k, F-251i-k, F-250h-p, F-249j-n, F-248h-n,
F-247g-l, F-246g/h, F-245g/h, F-244i-n, F-242h/i, F-240k-n,
F-239l-s — plan §2.12's register), plus the toolchain note (the
agent-browser/HeadlessChrome-157 dev-build hydration gap — session
253; re-confirmed this session: the clone-side comparison rode the
production artifact cleanly).

"""
src = src.replace(SEC3, LEDGER + SEC3, 1)
print("plan-261: §2.19 ledger written (before §3)")

# ---- 3. the R-58 section (above R-57) --------------------------------------
R57 = "### R-57 — The afternoon-label and register-truing round (session 260)"
assert src.count(R57) == 1, "R-57 heading not unique"
R58 = """### R-58 — The heading-prose, dead-brand, and citation-truing round (session 261)

The operator re-sent the standing directive after the R-57 ship pair
(06c52d1b + the owner's 74e7eec5 session-log update carrying
docs/session_103.md, the session-260 record, and docs/session_104.md,
the transcript capture). Per the recorded rhythm, findings-led
iteration. The intake and the standing layers are recorded in the
version header above; this section carries the findings, the cures,
and the verification contract.

**The findings (each verified at file:line by the driving session —
the genera bounded by whole-tree sweeps, the citation recomputed by
code twice):** the §2.19 ledger's four rows — F-261a the auth-view
heading prose genus (seven carriers still describing an h2 the tree
renders as h1 — the F-231b heading-focus construction is the live,
deliberate form), F-261b the never-consumed brand constants (the
19-export census's only dead pair), F-261c the settings-switch
comment's mis-cited figure (the cited 1.63:1 computes on no
surface; the true figure is 1.49:1 — and the same stale figure rides
the plan's F-221n register row), F-261d the vestigial-export genus's
next two carriers (BrandMark, DEFAULT_DATABASE_URL).

**The cures (R-58.2):** the seven h2 prose carriers trued to the
rendered h1 (the docblocks describe the heading-focus construction —
one h1 per view, the shared titleRef, the one-step-down SIZE
vocabulary preserved; the test comment's DOM form and the test title
follow) · the APP_NAME / APP_TAGLINE pair retired from constants.ts
(the literals live on inline at their three sites) · the two
mis-cited figures trued to the computed 1.49:1 (the settings comment
and the plan's F-221n register row — describing without citing the
retired form, per the F-229d discipline) · the two vestigial export
keywords dropped (module-local declarations; the same-file consumers
unchanged). No rendered surface changes: the class strings, the
components, the runtime behavior, and the parity baselines are all
untouched (the sweeps compare computed classes; prose and export
keywords are not class).

**The verification contract (R-58.3):** the parity-261 battery born
honest RED against the pre-cure tree (the heading-prose genus legs —
per-file h2-claim absence plus the rendered-h1 census · the
dead-brand-pair absence leg · the citation legs — the 1.63 absence
at both carriers plus the 1.49 presence · the vestigial-export legs
— the export-form absence plus the module-local presence) → the
cures → parity-261 GREEN → lint 0/0 · tsc 0 · the unit suite at the
new count · build · smoke 15/15 · the FULL e2e battery 152/152 ·
census MATCH · the captures (the standing faces — the auth card's
view family, the settings face, the mobile drawer at 390 with the
9-destination + Sign Out census) + the two comparison captures at
TRUE 390×844 (re-saved this session at the standing names). The six
parity drift gates: the session-253 precedent applies — the cures
touch no baseline-carried parity surface.

"""
src = src.replace(R57, R58 + R57, 1)
print("plan-261: R-58 section written (above R-57)")

# ---- 4. the §5 execution-history row at the head ---------------------------
sep = "| Version | Session | R-items executed | Gate at ship | Commit |"
assert src.count(sep) == 1, "§5 table header not unique"
ROW = """| v2.58.0 | 261 | **R-58** (the heading-prose, dead-brand, and citation-truing round — findings-led, the standing directive with the reference STABLE on every standing drift layer and the mobile-navigation ask verified on BOTH sides at TRUE 390×844 through agent-browser (the viewport verified by computed innerWidth; the clone side riding the production artifact on a scratch db per the session-253 toolchain note, booted in a single invocation per the session-98 server-death lesson — the aria-expanded flip verified on open AND close, zero visible nav links after the close); the cold baseline GREEN at HEAD 74e7eec5 — the v2.57.0 ship state reproduced exactly, no discovery). The audit round: the standing layers re-verified (probe:ref STABLE — the bundle md5, the F-250q stylesheet fingerprint, the demo data zero, the desktop nav 256/9, the TRUE-390 menu census; `bun audit` unchanged (1 moderate dev-chain minimatch, the documented deferral); neo-crm unchanged (b3d0fbe); the SEO surface verified (smoke leg 12); the .env contract + the db/ at the repo root + the vitest/playwright configs + the .env.example six-knob set all standing). The session-261 fresh-eyes audit (three Mode-C passes: the R-57 cure surfaces — the parity-260 battery re-run green 10/10 · the API/auth/security layer — the FOURTEENTH consecutive clean bill (all ten house contracts, all 45 exported handlers across 30 route files) · the UI/a11y/shell layer — clean on every named contract, four new findings): 0 Critical / 0 High / 0 Medium / 3 Low / 1 Informational NEW after dedup, every material claim re-verified at file:line by the driving session — whose whole-tree sweeps bounded each genus (seven h2-prose carriers across three files; the 19-export census's only dead pair; the mis-cited figure at exactly two carriers; the vestigial-export sweep's two survivors) and whose code recomputation trued the citation (white vs stone-300 = 1.49:1; the cited 1.63:1 reproduces on no surface). THE ROUND'S FINDINGS: F-261a the auth-view heading prose genus · F-261b the never-consumed brand constants · F-261c the settings-switch comment's mis-cited figure (plus the plan register row carrying the same stale form) · F-261d the vestigial-export genus's next two carriers. The plan v2.58.0 written and validated against the tree. **R-58.1** the pins born RED (the parity-261 battery — the heading-prose genus legs, the dead-brand absence leg, the citation legs, the vestigial-export legs) → **R-58.2** the cures (the seven prose carriers trued to the rendered h1; the brand pair retired; both 1.63 citations trued to the computed 1.49:1; the two export keywords dropped) → **R-58.3** the verification (parity-261 GREEN · lint 0/0 · tsc 0 · the unit suite at the new count · build · smoke 15/15 · 152 e2e · census MATCH · the captures — the standing faces + the two comparison captures at TRUE 390×844; the six parity drift gates per the session-253 precedent — no baseline-carried surface touched) | lint 0/0 · tsc 0 · **1799 unit (113 files, +10)** · build · smoke 15/15 · **152 e2e** · census MATCH | (this session's execution commit) |
"""
src = src.replace(sep, sep + "\n" + ROW, 1)
print("plan-261: §5 execution-history row written")

assert src != orig, "no edits applied"
open(PATH, "w", encoding="utf-8").write(src)
print("plan-261: 4 edits written (version header · §2.19 ledger · R-58 section · §5 row)")
