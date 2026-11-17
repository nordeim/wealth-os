#!/usr/bin/env python3
# Session-264 (R-61) plan writer: the version header, the §2.22 audit
# ledger, the R-61 section, and the §5 execution-history row — each edit
# asserted (the docs-243 scoping doctrine: every replacement asserts the
# OLD form inside its slice before writing). The F-247i escape rule: every
# literal pipe inside cell content rides \|\|.
import sys

PATH = "docs/remediation_plan_v2.md"
src = open(PATH, encoding="utf-8").read()
orig = src

# ---- 1. the version header: insert v2.61.0 above, demote v2.60.0 ---------
cur = "> **Current version: v2.60.0** (session 263 — the"
assert src.count(cur) == 1, "v2.60.0 current-version anchor not unique"
NEW_HEADER = """> **Current version: v2.61.0** (session 264 — the
muted-flip, sidebar-figure, and fallback-resolution round R-61: the
operator re-sent the standing directive after the R-60 ship pair
(5fa444c1 + the owner's dc99ff61 session-log update carrying
docs/session_109.md, the session-263 record). Per the recorded rhythm,
this session defaulted to findings-led iteration: refresh, re-audit,
remediate, verify, capture, document, commit, push — with the
operator's named asks (the mobile navigation comparison, the Tailwind
v4 state, the .env/db contract, the vitest/playwright configs, the
sitemap/SEO surface, the .env.example, the screenshots, the
SSH-wrapper push) re-verified along the way. The intake: the workspace
had been RESET (a fresh clone — the sandbox recycled between
sessions); the environment rebuilt cold (bun install + the postinstall
prisma generate, .env from .env.example on the
DATABASE_URL="file:../db/custom.db" contract, db push + seed, census
MATCH (80/4/3/6/5/7, users=1)); the one cold-start deviation was
environmental — the fresh sandbox carried no Playwright chromium
(executable absent; installed, then the battery ran green). The cold
baseline gate ran GREEN at HEAD dc99ff61 — the v2.60.0 ship state
reproduced exactly, no discovery: lint 0/0 · tsc 0 · 1830/1830 unit
(115 files) · build (the 4 documented Turbopack tracing warnings) ·
smoke 15/15 · 152/152 e2e · census MATCH. The standing asks: probe:ref
STABLE on every layer (the bundle md5 6d3779af… unchanged, the F-250q
stylesheet fingerprint 96f24d45… unchanged, the demo data zero, the
desktop nav 256/9, the TRUE-390 menu census standing); THE
MOBILE-NAVIGATION COMPARISON re-run at TRUE 390×844 on BOTH sides
(the reference through agent-browser — the viewport verified by
computed innerWidth: the drawer opens with the 9 destinations + Sign
Out and closes on the X toggle, zero nav destination links in the
viewport after the close; OUR SIDE — the production artifact on the
scratch db/comparison.db per the session-253 toolchain note, booted
in a single invocation per the session-98 server-death lesson — the
identical destinations + Sign Out via the labeled hamburger, the
aria-expanded flip Open→Close navigation menu verified on open AND
close, zero visible nav links after the close — parity plus the
documented superset, NO Tailwind v4 regression; both comparison
captures re-saved at the standing names, PNG-valid at the true
viewport); `bun audit` unchanged (1 moderate dev-chain minimatch, the
documented deferral); neo-crm unchanged (b3d0fbe, re-cloned after the
reset) — nothing to port; the SEO surface verified (smoke leg 12:
sitemap + robots + manifest 200); the .env contract + the db/ at the
repo root + the vitest/playwright configs + the .env.example six-knob
set all standing. The session-264 fresh-eyes audit (three Mode-C
passes: the R-60 cure surfaces driven by the session — the parity-263
battery re-run green 16/16 at HEAD · the API/auth/security layer —
the SEVENTEENTH consecutive clean bill (all twelve house contracts,
45 handlers / 30 route files read line-by-line, the census confirmed
by the driving session's own re-derivation; every candidate examined
and dismissed into a documented posture — the one Low is the
ADR-014 demo-delivery posture the ledger already registers) · the
UI/a11y/shell layer — clean on every named contract with FOUR new
findings — 0 Critical / 0 High / 0 Medium / 1 Low /
3 Informational NEW after dedup): the round's flagship is THE
MUTED-FLIP COMMENT'S UNNAMED PRE-FLIP FIGURES (F-264a Low — the
comment justifying the dark muted flip cites 4.13:1 and 3.91:1
without naming the color they describe: those are the UNFLIPPED
stone-500 readings; the flipped token the very next line declares
computes 7.85:1 on the dark surface and 7.44:1 on the dark page wash
— recomputed by the driving session in a second engine against the
live tokens, the audit's math exact). Its siblings: F-264b the
sidebar-content figure (the comment claims ≈620px; the live-measured
stack is ≈729px — brand 64 + nav 546 + footer 119, measured on the
production artifact at the constrained viewport, the box model
independently computing ≈726) · F-264c the dialog-close dark figure
(2.59:1 truncates the computed 2.5950 — trues to 2.60:1, the
parity-262 pin riding the same commit) · F-264d the no-provider
theme fallback's system arm (setTheme("system") forced LIGHT instead
of resolving prefers-color-scheme — latent only, the provider is
wired in the root layout; the cure routes the fallback through the
module's own applyTheme seam). The letter-drift genera from the API
pass: F-264e the api.ts no-store comment names only the uploads GET
as the non-envelope member (the export GET is the second — the
comment completes the family) · F-264f the AGENTS.md
raw-PrismaClient letter omits the seed script's documented exception
(the letter amended). Registered, not cured: F-264g the OTP console
line under the unset knob (the ADR-014 demo posture — knob-gated,
boot-warned, seventeen clean bills; the response body already carries
the code in that posture) · F-264h the reset/users parse letter
deviations (documented in-route) · F-264i the AUTH_SECRET length-only
floor (hardening headroom) · F-264j the NEO_PROXY_HOPS default (the
standing F-218t register). The driving session re-verified every
material claim at file:line, recomputed every challenged figure in a
second engine against the live palette, and live-measured the sidebar
stack on the production artifact. The plan v2.61.0 written and
validated against the tree.

"""
src = src.replace(cur, NEW_HEADER + "> **Previous version: v2.60.0** (session 263 — the", 1)

# ---- 2. the §2.22 ledger: insert above the section-3 anchor ----------------
LEDGER_ANCHOR = "## 3. The remediation program (R-items)"
assert src.count(LEDGER_ANCHOR) == 1, "section-3 anchor not unique"
LEDGER = """### 2.22 Session-264 audit ledger (the fresh-eyes round over the v2.60.0 ship state)

Three Mode-C passes (the R-60 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer); every material
claim re-verified at file:line by the driving session before planning
(the parity-263 battery re-run green 16/16 at HEAD; the API layer's
seventeenth consecutive clean bill — 45 handlers / 30 route files read
line-by-line, the census confirmed by the driving session's own
re-derivation; the UI layer clean on every named contract with four
new findings, every contrast citation recomputed in a second engine
and the sidebar stack live-measured). NEW after dedup: 0 Critical /
0 High / 0 Medium / 1 Low / 3 Informational (plus four registered
rows from the API pass's letter-drift and documented-posture genera).

| ID | Severity | Finding (verified at file:line) | Location | Disposition |
|---|---|---|---|---|
| F-264a | Low | **THE MUTED-FLIP COMMENT'S UNNAMED PRE-FLIP FIGURES — the comment cites the unflipped color's ratios as if they were the live token's.** The comment justifying the dark `--color-muted` flip states "any future text-muted consumer on a dark surface would compute under the 4.5:1 text bar — 4.13:1 on the dark surface token, 3.91:1 on the dark page wash" — but those figures are the UNFLIPPED light-mode pin (stone-500 #78716c) readings; the flipped #a8a29e the very next line declares computes **7.85:1** on the dark surface (#0a0a0a) and **7.44:1** on the dark page wash (#0e1310) — comfortably ABOVE the bar (recomputed by the driving session in a second engine; the audit's math exact, corroborated by the same file's scrollbar comment independently owning 3.91:1 for the stone-500 family). As written, a reader auditing the token today concludes the flipped muted still fails AA on dark surfaces; it passes by a wide margin. The same file's own convention (the F-263l round) names the surface a figure describes — this comment predates it. | `src/app/globals.css:390-398` (the comment) vs the token at `:398` | **cured in R-61** (the comment reworded to name the unflipped color the figures describe, with the flipped token's own readings stated) |
| F-264b | Informational | **THE SIDEBAR-CONTENT FIGURE — "≈620px" understates the live stack by ~15%.** The comment justifying the nav's internal scroll claims "Content ≈620px (brand + 9 links + footer)"; the LIVE-MEASURED stack on the production artifact (the constrained-viewport probe, session 264) is **≈729px** — brand 64 + nav content 546 + footer 119 — with the box model independently computing ≈726 (the 3px spread is sub-pixel rounding). The comment's conclusion (the footer is unreachable at e.g. 1024×600 without the overflow pair) holds a fortiori at 729px; the figure itself is off. | `src/lib/page-layout.ts:27-34` (the nav member's comment) | **cured in R-61** (the figure trued to the live-measured ≈730px with the decode — brand 64 + nav 546 + footer 119) |
| F-264c | Informational | **THE DIALOG-CLOSE DARK FIGURE — "2.59:1" truncates the computed 2.5950.** The F-262c-trued citation says the hover pair "stepped DOWN to 2.59:1 in dark"; #57534e (stone-600) on the flipped dialog surface #0a0a0a computes 2.595029 → **2.60:1** at two decimals (every sibling figure in the same comment block verifies exactly). The citation truncates instead of rounds — a half-cent mis-citation in a figure a prior round itself trued. | `src/lib/page-layout.ts:336-338` · the pin at `tests/parity-262.test.ts:90-94` | **cured in R-61** (the figure trued to 2.60:1; the parity-262 pin updated in the same commit per the legitimate-contract-change doctrine) |
| F-264d | Informational | **THE NO-PROVIDER THEME FALLBACK'S SYSTEM ARM FORCES LIGHT.** The defensive `useTheme()` fallback (returned when a consumer renders outside ThemeProvider) implements setTheme as `classList.toggle("dark", t === "dark")` — for `t === "system"` this REMOVES the dark class (forces light) instead of resolving prefers-color-scheme, contradicting the docblock's "working no-op-free instance" claim (the real setTheme routes through applyTheme, which resolves the system arm via matchMedia). Latent only — the provider is wired in the root layout, so the fallback is unreachable in this tree; the cure routes the fallback through the module's own applyTheme seam (one line, no duplication). | `src/components/layout/theme.tsx:154-170` (the fallback) vs the real arm at `:138-142` and the seam at `:42-49` | **cured in R-61** (the fallback's setTheme routes through applyTheme — the system arm resolves prefers-color-scheme like the provider's own arm) |
| F-264e | Informational | **THE API.TS NO-STORE COMMENT NAMES ONLY ONE OF THE TWO NON-ENVELOPE FACES.** The envelope contract's own comment documents the uploads GET as "NOT an envelope response (its own immutable caching on capability URLs stands)" — but the export GET is the SECOND non-envelope success path (a raw JSON attachment with its own no-store, consumed by a direct anchor click at settings; wrapping it in the envelope would break the download). Both error paths use ERR.*; both carry deliberate cache policy; the only gap is that the in-code documentation of the exception family names one of the two members. | `src/lib/api.ts:12-17` (the comment) vs the faces at `src/app/api/export/route.ts:62-73` and `src/app/api/uploads/[name]/route.ts:76-82` | **cured in R-61** (the comment completes the exception family — both members named) |
| F-264f | Informational | **THE AGENTS.MD RAW-PRISMACLIENT LETTER OMITS THE SEED SCRIPT'S DOCUMENTED EXCEPTION.** The rule says "Never introduce a raw `new PrismaClient()` outside `src/lib/db`" — but `prisma/seed.ts` constructs one (the script seam: auth.ts is un-importable from the bare script, and the adapter URL routes through the shared `runtimeDatabaseUrl()` seam, closing the mirror-db risk the rule exists for). The house's own census test scopes the ban to the scripts family; the letter and the code diverge. | `AGENTS.md:52-54` vs `prisma/seed.ts:20-22` | **cured in R-61** (the letter amended to name the seed script's standing exception — always through the runtime db seam) |
| F-264g | Low | **THE OTP CONSOLE LINE UNDER THE UNSET KNOB — the documented ADR-014 demo posture, warn-only enforced.** While NEO_DISABLE_IN_APP_OTP is unset (the shipped default), signup and resend log the 6-digit code to the server console (the response body already carries it in that posture — the self-hosted demo delivery; the boot warning names the production knobs). Nothing FORCES the production posture: enforcement is a warn-only boot line, so a deployment that ignores warnings ships codes in both responses and logs. Seventeen clean bills accepted the documented posture; registered here so the letter of "secrets never logged" carries its documented exception. | `src/app/api/auth/signup/route.ts:163-168` · `src/app/api/auth/resend/route.ts:128-133` | **registered, not cured** (the ADR-014 posture is the design: the demo UX reads codes from dev.log; the knob + the boot warning own the production story) |
| F-264h | Informational | **TWO PARSE SURFACES DEVIATE FROM THE PARSEBODY/ZOD LETTER (both documented in-route).** The reset POST rides the bounded reader with a manual single-literal confirm check (no schema-worthy surface); the users PATCH rides a route-local safeParse preserving its own message. Both carry the content-type CSRF gate + bounded reads; no validation gap (profileUpdateSchema still gates the name field). | `src/app/api/reset/route.ts:25-31` · `src/app/api/users/route.ts:49-63` | **registered, not cured** (documented deviations; codifying them in the contract text is a future docs round) |
| F-264i | Informational | **THE AUTH_SECRET FLOOR IS LENGTH-ONLY.** Both gates (auth.ts and boot-env.ts) check ≥16 chars; a 16-char constant passes and mints HMACs over a tiny keyspace. The fail-hard boot gate + the documented openssl rand - hex 32 guidance close the practical gap. | `src/lib/auth.ts:39-46` · `src/lib/boot-env.ts:53-60` | **registered, not cured** (hardening headroom — a ≥32 production floor or a weak-literal reject; a future hardening round) |
| F-264j | Informational | **THE UNSET NEO_PROXY_HOPS DEFAULT KEYS PER-IP BUCKETS ON CLIENT-SUPPLIABLE HEADERS on direct-exposure deploys.** The documented F-218t/F-221t posture: the default trusts the last XFF hop; the boot warning names both headers; the credential routes carry email-keyed secondaries + the process-level signup ceiling to bound the voidable half. | `src/lib/rate-limit.ts:97-140` · `src/lib/boot-env.ts:129-138` | **already registered** (the standing F-218t register; re-confirmed standing this session) |

Recorded, not cured: F-257a and F-257r (the standing registers,
plan §2.15), the ai-coach `history` caution (the R-5 register — the LLM
provider's wiring must treat the field as client-supplied untrusted
input), the sidebar h2-before-h1 observation (the reference's own
construction), the reference's reset-screen back-button genus delta
and its unprobeable new-password form (the session-263 register), plus
the standing families (F-252k, F-251i-k, F-250h-p, F-249j-n, F-248h-n,
F-247g-l, F-246g/h, F-245g/h, F-244i-n, F-242h/i, F-240k-n, F-239l-s
— plan §2.12's register), plus the toolchain note
(the agent-browser/HeadlessChrome-157 dev-build hydration gap — session
253; re-confirmed this session: the clone-side comparison rode the
production artifact cleanly, the reference side rode agent-browser).
Next session defaults to findings-led iteration — re-send the standing
directive to continue the rhythm.

"""
src = src.replace(LEDGER_ANCHOR, LEDGER + LEDGER_ANCHOR, 1)

# ---- 3. the R-61 section: insert above R-60 --------------------------------
R60_HEAD = "### R-60 — The login-ladder, overlay-alpha, and census-truing round (session 263)"
assert src.count(R60_HEAD) == 1, "R-60 section head not unique"
R61 = """### R-61 — The muted-flip, sidebar-figure, and fallback-resolution round (session 264)

The operator re-sent the standing directive after the R-60 ship pair
(5fa444c1 + the owner's dc99ff61 session-log update carrying
docs/session_109.md, the session-263 record). Per the recorded rhythm,
findings-led iteration. The intake and the standing layers are
recorded in the version header above; this section carries the
findings, the cures, and the verification contract.

**The findings (each verified at file:line by the driving session —
every challenged figure recomputed by code in a second engine against
the LIVE palette, and the sidebar stack LIVE-MEASURED on the
production artifact at the constrained viewport):** the §2.22 ledger's
six cured rows — F-264a the muted-flip comment's unnamed pre-flip
figures (4.13/3.91 are the unflipped stone-500 readings; the flipped
token computes 7.85/7.44 — the round's flagship, the F-263l
name-the-surface convention applied one comment later) · F-264b the
sidebar-content figure (≈620px cited; ≈729px live-measured — brand 64
+ nav 546 + footer 119, the box model independently at ≈726) · F-264c
the dialog-close dark figure (2.59 truncates 2.5950 — trues to 2.60,
the parity-262 pin riding) · F-264d the no-provider theme fallback's
system arm (forced light; the cure routes through the module's own
applyTheme seam) · F-264e the api.ts no-store comment's incomplete
exception family (the export GET joins the uploads GET) · F-264f the
AGENTS.md raw-PrismaClient letter (the seed script's documented
exception joins the rule). Plus four registered rows from the API
pass's genera (F-264g the OTP console line under the ADR-014 demo
posture · F-264h the two documented parse deviations · F-264i the
AUTH_SECRET length-only floor · F-264j the standing F-218t proxy-hops
register).

**The cures (R-61.2):** the globals.css muted-flip comment reworded to
name the unflipped color its figures describe, with the flipped
token's own readings stated (7.85:1 / 7.44:1 on the same pair) · the
page-layout nav comment's figure trued to the live-measured ≈730px
with the decode (brand 64 + nav 546 + footer 119) · the dialog-close
figure trued to 2.60:1 with the parity-262 pin updated in the same
commit (the legitimate-contract-change doctrine) · the theme fallback's
setTheme routed through applyTheme (the system arm resolves
prefers-color-scheme like the provider's own arm; one line, no
duplication) · the api.ts comment's exception family completed (both
non-envelope faces named) · the AGENTS.md letter amended (the seed
script's standing exception, always through the runtime db seam). No
class strings change; no swept parity surface renders differently
(comments and an unreachable fallback) — the six drift gates' standing
baselines hold unchanged, and the offline gate is this round's
verification bar (the AGENTS cadence rule: the parity chain rides when
parity surfaces change).

**The verification contract (R-61.3):** the parity-264 battery born
honest RED against the pre-cure tree (the muted-flip leg · the
sidebar-figure leg · the dialog-close leg · the fallback leg · the
api-comment leg · the AGENTS-letter leg, with the unflipped-span rider
green-by-design — the 4.13/3.91 figures stay, now describing their
named color) → the cures → parity-264 GREEN → lint 0/0 · tsc 0 · the
unit suite at the new count · build · smoke 15/15 · the FULL e2e
battery 152/152 · census MATCH · the captures (the sidebar
short-viewport face at 1024×600 — the nav scrolled internally with the
footer reachable through it, F-264b's subject mechanism, asserted live
on the production artifact) + the two comparison captures at TRUE
390×844 (re-saved this session at the standing names).

"""
src = src.replace(R60_HEAD, R61 + R60_HEAD, 1)

# ---- 4. the §5 execution-history row: insert at the table head -------------
HIST_ANCHOR = "| v2.60.0 | 263 |"
assert src.count(HIST_ANCHOR) == 1, "v2.60.0 history row anchor not unique"
ROW = """| v2.61.0 | 264 | **R-61** (the muted-flip, sidebar-figure, and fallback-resolution round — findings-led, the standing directive with the reference STABLE on every standing drift layer and the mobile-navigation ask verified on BOTH sides at TRUE 390×844 (the reference through agent-browser; the clone side riding the production artifact on the scratch db/comparison.db per the session-253 toolchain note, booted in a single invocation per the session-98 server-death lesson — the aria-expanded flip verified on open AND close, zero visible nav links after the close); the workspace had been RESET — a fresh clone with the environment rebuilt cold (the one deviation environmental: the fresh sandbox carried no Playwright chromium, installed before the battery); the cold baseline GREEN at HEAD dc99ff61 — the v2.60.0 ship state reproduced exactly, no discovery). The audit round: the standing layers re-verified (probe:ref STABLE — the bundle md5, the F-250q stylesheet fingerprint, the demo data zero, the desktop nav 256/9, the TRUE-390 menu census; `bun audit` unchanged (1 moderate dev-chain minimatch, the documented deferral); neo-crm unchanged (b3d0fbe, re-cloned after the reset); the SEO surface verified (smoke leg 12); the .env contract + the db/ at the repo root + the vitest/playwright configs + the .env.example six-knob set all standing). The session-264 fresh-eyes audit (three Mode-C passes: the R-60 cure surfaces — the parity-263 battery re-run green 16/16 · the API/auth/security layer — the SEVENTEENTH consecutive clean bill (all twelve house contracts, 45 handlers / 30 route files, the census confirmed by the driving session's own re-derivation; every candidate dismissed into a documented posture) · the UI/a11y/shell layer — clean on every named contract, four new findings): 0 Critical / 0 High / 0 Medium / 1 Low / 3 Informational NEW after dedup plus four registered rows, every material claim re-verified at file:line by the driving session — every challenged figure recomputed in a second engine against the LIVE palette (the muted-flip readings 4.13/3.91 owned by the unflipped stone-500, the flipped token computing 7.85/7.44; the dialog-close 2.5950), and the sidebar stack LIVE-MEASURED on the production artifact (brand 64 + nav 546 + footer 119 ≈ 729px vs the cited ≈620px). THE ROUND'S CURES: F-264a the muted-flip comment names the unflipped color its figures describe · F-264b the sidebar figure trued to the live-measured ≈730px · F-264c the dialog-close figure trued to 2.60:1 (the parity-262 pin riding) · F-264d the theme fallback's system arm routed through applyTheme · F-264e the api.ts exception family completed · F-264f the AGENTS.md letter amended. Registered: F-264g the OTP console line (ADR-014) · F-264h the parse letter deviations · F-264i the AUTH_SECRET floor · F-264j the standing F-218t register. The plan v2.61.0 written and validated against the tree. **R-61.1** the pins born RED (the parity-264 battery — the muted-flip, sidebar-figure, dialog-close, fallback, api-comment, and AGENTS-letter legs, with the unflipped-span rider green-by-design) → **R-61.2** the cures (the six surfaces) → **R-61.3** the verification (parity-264 GREEN · lint 0/0 · tsc 0 · the unit suite at the new count · build · smoke 15/15 · 152 e2e · census MATCH; the captures — the sidebar short-viewport face at 1024×600 with the footer reachable, plus the standing comparison captures) | lint 0/0 · tsc 0 · **(the unit count lands with the battery)** · build · smoke 15/15 · **152 e2e** · census MATCH | (this session's execution commit) |
"""
src = src.replace(HIST_ANCHOR, ROW + HIST_ANCHOR, 1)

if src == orig:
    print("NO EDITS APPLIED — anchors all matched but replacements were no-ops?!", file=sys.stderr)
    sys.exit(1)

open(PATH, "w", encoding="utf-8").write(src)
print("plan v2.61.0 written: version header + §2.22 ledger + R-61 section + §5 row")
