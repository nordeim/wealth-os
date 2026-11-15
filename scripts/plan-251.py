#!/usr/bin/env python3
"""Session-251 (R-48): write remediation plan v2.48.0 — the
focus-ring, cli-anchor, and settings-flag round.

Assert-each-insertion convention (the plan-250q form): every sub()
REFUSES unless its anchor matches exactly once."""

import sys

p = "docs/remediation_plan_v2.md"
t = open(p, encoding="utf-8").read()

def sub(old, new, label):
    global t
    n = t.count(old)
    if n != 1:
        sys.exit(f"REFUSED: {label} matched {n} times")
    t = t.replace(old, new, 1)
    print("edited:", label)

# 1. Demote the v2.47.0 head and insert the v2.48.0 current block above it.
sub(
    "> **Current version: v2.47.0** (session 250 — the",
    """> **Current version: v2.48.0** (session 251 — the
focus-ring, cli-anchor, and settings-flag round R-48: the owner's
standing directive — refresh → review → validate → audit → parity
iteration → remediation plan → TDD execution → captures → docs
lockstep → commit → push, with the reference STABLE on every standing
drift layer (probe:ref — the bundle md5 6d3779af… unchanged, the
F-250q stylesheet fingerprint unchanged, the demo data zero, the
desktop nav 256/9, the TRUE-390 menu 9 destinations) and the
mobile-navigation ask verified on BOTH sides through agent-browser at
TRUE 390×844 (the reference's drawer: 9 destinations + Sign Out,
opens and closes on the toggle; OUR drawer: the same 9 destinations +
the labeled superset — the aria-label hamburger, the navigation
landmark, the skip link — closing on the toggle with the
aria-expanded flip; no Tailwind v4 regression, the token discipline
clean on every audited axis); the cold-baseline gate GREEN at HEAD
c903958 — the exact v2.47.0 ship state reproduced: lint 0/0 · tsc 0 ·
1668/1668 unit (102 files) · build · smoke 15/15 · 151/151 e2e ·
census MATCH · ALL SIX parity drift gates CLEAN at 0.5pct margin; the
chromium-1254 install the one toolchain step; `bun audit` unchanged
(1 moderate dev-chain minimatch, the documented deferral); neo-crm
unchanged (b3d0fbe) — nothing to port; the SEO surface verified
(smoke leg 12: sitemap + robots + manifest 200); the .env
DATABASE_URL="file:../db/custom.db" contract + the db/ at the repo
root + the vitest/playwright configs + the .env.example six-knob set
all standing). The session-251 fresh-eyes audit (three Mode-C passes:
the R-47 cure surfaces driven by the session, the API/auth/security
layer, and the UI/a11y/shell layer — 0 Critical / 0 High / 1 Medium /
6 Low cured + 2 Informational cured-as-riders + 3 Informational
registered after dedup, every material claim re-verified at
file:line by the driving session, the prisma-config divergence
LIVE-PROBED under the repo's own bun; all seven R-47 cure surfaces
verified holding). The round's flagship: THE AUTH-FACE FOCUS-RING
CURE (F-251a — nine constants on the forced-light auth faces carried
focus-visible:ring-amber-400 computing 1.67:1 against the white card
— below the 3:1 non-text bar (WCAG 1.4.11) and the only focus
affordance on their controls (the UA outline suppressed); the three
funnel submits already carried the F-218i ring-ring ink at 17.5:1, so
the round aligns the nine stragglers with the submits' own standing
standard — the F-222g/F-223h rounds had re-introduced the amber genus
citing a submit genus that had already been cured, with no
contrast re-measure and no register entry). Plus: THE PRISMA.CONFIG
CLI-ANCHOR CURE (F-251b — the mirror-db trap's CLI half: under bun,
a direct `bun x prisma …` reads the bun-absolutized DATABASE_URL
(file:/parent-of-repo/db/custom.db) and the config's
resolveDatabaseUrl passes absolute URLs through, so the CLI operates
on a mirror db while the app serves the repo db — live-probed; the
datasource URL re-routes through runtimeDatabaseUrl(), the
signature-aware seam, making the wrapper belt-and-braces); THE
SETTINGS-SETTLED RIDER (F-251c — updateSettings' commit never
re-flips settingsSettled, so a superseded tail skip strands the flag
false over fresh data — the F-234a both-arms contract's one
uncovered arm); THE DASHBOARD USER PROJECTION (F-251d — the store's
`as User` upcast asserts photoUrl/role the payload never carried; the
projection widens to the full six-field User shape, both fields
already in requireSession's select); THE DRIFT-PROBE CSS POSITIVE
SELECTION + EXIT HYGIENE (F-251e); THE DEAD gray-500 PIN RETIREMENT +
THE PALETTE CENSUS COMMENT-STRIP (F-251f — the pin's only consumer
was a docblock citation; the reverse leg now strips comment spans so
a carrier can never satisfy it again); THE WHITE RING-OFFSET HALO
CURE (F-251g — four dark-capable focus surfaces gain
ring-offset-background, the F-226i token form; the F-129c1 panel
retirement predates the dark era and left a #fff halo on the
fresh-visitor dark posture); and THE AMBER METER-FILL REGISTER ENTRY
(F-251h — the F-220p exemption pattern). Registered, not cured: the
drawer sign-out rider unmount (F-251i — the store's exactly-own-bump
era guard holds the concurrent-POST corner), the settings theme dead
round-trip (F-251j), the reset route's schema-less body (F-251k),
plus the standing families (F-250h-p, F-249j-n, F-248h-n, F-247g-l,
F-246g/h, F-245g/h, F-244i-n, F-242h/i, F-240k-n, F-239l-s). §5
carries the execution history.)


> **Previous version: v2.47.0** (session 250 — the""",
    "the v2.48.0 current-version block",
)

# 2. The session-251 audit ledger (§2.11) before §3.
sub(
    """| F-250p | Informational | **THE LWW THEORETICAL RESIDUAL, GENERALIZED""",
    """| F-251a | Medium | **THE AUTH-FACE FOCUS-RING REGRESSION — nine constants carry `focus-visible:ring-amber-400` at 1.67:1 on the forced-light auth surfaces (a WCAG 1.4.11 miss with no register entry).** The F-222g/F-223h rounds re-introduced the amber ring on the auth faces "matching its own submit genus" — but the submits had already been cured to `ring-ring` (17.5:1, the F-218i round, still standing at login-reset.ts:106/198/254), so the cited genus no longer existed in that form; neither round re-ran the contrast math. Measured: amber-400 #fbbf24 on the white card = 1.67:1, below the 3:1 non-text bar, on the only focus affordance (the UA outline is suppressed) of ten+ controls on every visitor's first surface — the reference's own ring there (slate-400, ≈2.5:1) is sub-3:1 too, so parity does not clear it either. | `src/lib/page-layout.ts:440,455,460` (google/submit/footerLink); `src/lib/login-reset.ts:91,144,166,220,261` (the four backs + resend); `src/components/layout/reset-password-screen.tsx:216` | **cured in R-48** (the nine constants adopt `focus-visible:ring-ring` — the submits' own standing standard, the F-218i ink; the four-file pin recalibration rides the same commit per the F-247d precedent) |
| F-251b | Low | **THE PRISMA.CONFIG CLI-HALF ANCHORING GAP — direct `bun x prisma …` invocations under bun resolve to the parent-of-repo mirror db.** `prisma.config.ts:30` feeds the CLI `resolveDatabaseUrl(process.env.DATABASE_URL ?? …)` — the DIRECT form, without the bun-absolutization signature check the runtime seam applies. Under bun, a relative `file:../db/custom.db` is rewritten to `file:/<parent-of-repo>/db/custom.db` (against the .env file's own directory), and `resolveDatabaseUrl` passes absolute URLs through untouched — LIVE-PROBED this session: the config hands the CLI the mirror path while `runtimeDatabaseUrl()` returns the contract location. Every sanctioned path is guarded (db:push via the prisma-env wrapper; db:seed via the db singleton; e2e via its pin), but a direct CLI call (Prisma's own documented invocation shape) silently operates on the mirror — the exact trap AGENTS.md elevates to a non-negotiable gotcha, and the config docblock's "no invocation pattern can land the database outside `<repo>/db/`" claim is falsified by this pattern. | `prisma.config.ts:30` vs the seam `src/lib/db-path.ts:126-161,192-227`; the live probe (bun -e under the repo root) | **cured in R-48** (the datasource URL re-routes through `runtimeDatabaseUrl()` — the signature-aware seam that handles node/dotenv, bun-absolutized, wrapper, and caller-override shapes alike (verified against all four patterns); the prisma-7-contract pin updates in the same commit, and the db-path battery gains the config-shape leg) |
| F-251c | Low | **THE SETTINGS-SETTLED STRAND — updateSettings' success commit never re-flips `settingsSettled`, so a superseded tail skip strands the flag `false` over fresh data.** The R-47 sequence's settle guard skips BOTH the settings commit and the `settingsSettled: true` flip when the tail is superseded (`:472-478`), and `updateSettings`' commit sets `settings` but not the flag (`:667`) — so a remount hydrate in flight (entry flips the flag false) whose tail is then superseded by a PUT leaves `settingsSettled: false` over a fresh, committed settings slice until the next full hydrate. No consumer today (the flag's only reader keys on `!settings` in conjunction, and the PUT always commits a non-null slice) — but it silently violates the F-234a contract ("the flag flips in BOTH arms of the fetch") and is a trap for any future `settingsSettled`-keyed consumer. A FAILED PUT (429/500) produces the same strand (the entry bump is unconditional). | `src/stores/wealthos-store.ts:472-478 vs :667 vs :378-380` | **cured in R-48** (the settle rider — `settingsSettled: true` joins the PUT's success commit; plus the comment-truth rider at :444-447 naming the F-250p generalized residual the "wins honestly" line overstated) |
| F-251d | Low | **THE DASHBOARD USER PROJECTION NARROWNESS — the store's `as User` upcast asserts fields the payload never carries.** `DashboardData.user` is `Pick<User, "id"|"name"|"email"|"avatarColor">` and the dashboard route returns exactly those four fields, while the store commits `res.data.user as User` — after every hydrate, `store.user.photoUrl` and `.role` are runtime-undefined despite the full-shape type. Benign today (zero client consumers of either field), but the cast masks the narrowing for any future consumer. Both fields already ride `requireSession()`'s F-228h select (`auth.ts:206-207`) — the projection narrows them away at zero cost. | `src/stores/wealthos-store.ts:286,426`; `src/types/index.ts:110`; `src/app/api/dashboard/route.ts:42-47` | **cured in R-48** (the projection widens to the full six-field User shape — the cast becomes honest; no extra query, no secret exposure: passwordHash and the verification/reset columns are never in the session select) |
| F-251e | Low | **THE DRIFT-PROBE'S POSITIONAL CSS TARGET + EXIT HYGIENE — `css[0]` can silently re-target, and the in-main `process.exit(1)` paths bypass the finally's `browser.close()`.** The F-250q styling fingerprint hashes the FIRST same-origin stylesheet (`css[0]`), while the JS layer positively identifies its bundle (largest-by-bytes); if the platform inserts another same-origin stylesheet ahead of the app's `/assets/*.css`, the hash silently re-targets — re-opening exactly the blind spot F-250q closed. The four in-main `process.exit(1)` sites (:260, :285, :291, :399) skip the `finally` teardown (tool hygiene only). | `scripts/drift-probe.ts:277-282` (css[0]); `:260,285,291,399` vs the try/finally at `:231/402-404` | **cured in R-48** (positive `/assets/` pathname selection with the positional form as the annotated fallback; the four exits become `process.exitCode = 1` + return) |
| F-251f | Low | **THE DEAD gray-500 PIN + THE PALETTE CENSUS'S COMMENT BLINDNESS — the @theme pin's only consumer is a docblock citation.** `--color-gray-500: #6b7280` (globals.css:210) has zero class-string and zero var() consumers; its only occurrence in src/ is the COMMENT at tabs.tsx:22 — and `tests/palette-pins.test.ts` builds its usage census from raw file text (comments included), so the docblock token registers as live usage and the F-246c reverse leg ("the @theme pin block carries no dead pairs") passes on a phantom consumer. The F-229d carrier-comment genus in its census-scanner edition; the pin block's own header claims "exactly the used census". | `src/app/globals.css:210`; `src/components/ui/tabs.tsx:22`; `tests/palette-pins.test.ts:38` (the raw-text matchAll) | **cured in R-48** (the comment reworded per the F-229d describe-never-cite discipline; the pin retired; the reverse leg strips comment spans before matching so a carrier can never satisfy it again) |
| F-251g | Low | **THE WHITE RING-OFFSET HALO ON DARK-CAPABLE FOCUS SURFACES — the F-226i class outside its trigger-only scope.** Tailwind v4's default `--tw-ring-offset-color` is #fff; four focusable dark-capable surfaces carry `ring-offset-2` with no offset token: the Tabs PANEL_BASE (tabs.tsx:80 — `tabIndex={0}` panels paint a 2px white frame around the entire content area on Expenses/Analytics in the fresh-visitor DARK default), the two error-page Try-again buttons (error.tsx:69, global-error.tsx:70 — `html.dark` persists across a client-side root crash per F-224p), and the 404 home button (page-layout.ts:484, dark-armed since F-222f). The F-129c1 panel retirement was a light-mode byte-parity adjudication from session 129 — four sessions before the dark era began; in the dark default the retired class leaves a white halo where the reference's own stock Radix class computes a dark offset. Cosmetic (the indicator stays high-contrast) but visible on two of the app's ten sections in the default theme. | `src/components/ui/tabs.tsx:80`; `src/app/error.tsx:69`; `src/app/global-error.tsx:70`; `src/lib/page-layout.ts:484` | **cured in R-48** (the four sites gain `ring-offset-background` — the flipped token, the F-226i cure form; the F-129c1 adjudication is superseded by the dark-era posture and its comment rewritten to the current truth) |
| F-251h | Informational | **THE AMBER METER-FILL CONTRAST — the F-220p parity-palette genus without its register entry.** The goal/budget progress fills (`from-amber-400 to-amber-500` on stone-200 tracks) measure 1.33:1/1.71:1 in light mode (dark arms pass at ~6:1); the bars carry role=progressbar + aria-valuenow/min/max + adjacent text values (the F-235n/F-236i cures holding), so no information is lost — but the graphical-object contrast sits under the 3:1 bar on the reference's own genus, exactly the class F-220p registered for the chart strokes, with no entry of its own. | `src/app/(app)/goals/page.tsx:139`; `src/app/(app)/dashboard/page.tsx:429` | **cured in R-48** (the exemption-register entry in the a11y spec's F-220p block — the measured values cited so a future contrast sweep cannot "discover" it) |
| F-251i | Informational | **THE DRAWER SIGN-OUT RIDER UNMOUNT — the F-250e rider's busy state is component-local and the drawer unmounts on activation.** `onNavigate?.()` closes the drawer on click, `if (!open) return null` unmounts DrawerNav, and reopening remounts with `busy=false` — admitting a second concurrent logout POST inside the first's window. The store holds the corner safely (the exactly-own-bump era guard lets only the newest logout commit the clear; the degraded case is the documented honest-failure face), and the desktop sidebar is unaffected. | `src/components/layout/mobile-nav.tsx:124,147-160` | recorded (Reasoned; the structural fix — a store-level `logoutInFlight` slice — is prophylactic; revisit if a third sign-out surface ever lands) |
| F-251j | Informational | **THE SETTINGS THEME DEAD ROUND-TRIP — a stored field with no writer and no reader.** The settings route selects/accepts `theme` (schema + SETTINGS_SELECT) but the Settings page never posts it and the theme bootstrap is purely localStorage-based (theme.tsx) — the DB row's theme forever returns its default. Unlike `defaultCurrency` (F-228m) it has no UI at all; the dead round-trip is undocumented. Possibly deliberate reference-schema parity. | `src/app/api/settings/route.ts:33`; `src/lib/schemas.ts:565`; `src/app/(app)/settings/page.tsx:95-102` | recorded (either document it as parity-only beside the F-228m precedent, or wire `setTheme` through `updateSettings({ theme })` — a product decision, not a rider) |
| F-251k | Informational | **THE RESET ROUTE'S SCHEMA-LESS BODY — the API's one body parse that bypasses the Zod seam.** The reset route validates its body with readBoundedJson + a hand-rolled literal compare (`body.confirm !== "RESET"`) rather than a schema through parseBody; behavior is exactly equivalent to `z.object({ confirm: z.literal("RESET") })` (bounded, content-type-gated, unknown keys ignored) — a consistency note in the F-247i/F-248m genus, not a defect. | `src/app/api/reset/route.ts:25-31` vs the convention at AGENTS.md:58-62 | recorded (if the route is ever touched, add `resetConfirmSchema` and ride parseBody; otherwise the documented one-hand-rolled-site) |
| F-250p | Informational | **THE LWW THEORETICAL RESIDUAL, GENERALIZED""",
    "the §2.11 session-251 audit ledger",
)

# 3. The R-48 section before R-47.
sub(
    """### R-47 — The settings-sequence, superseded-error, and select-completion round (session 250) — Status: Done(v2.47.0)""",
    """### R-48 — The focus-ring, cli-anchor, and settings-flag round (session 251) — Status: Done(v2.48.0)

The session-251 findings-led round over the v2.47.0 ship state. Seven
cures (F-251a-g), one register rider (F-251h), three registrations
(F-251i-k).

1. **R-48.1 — the pins born RED**: tests/parity-251.test.ts (the
   source battery: the nine auth-face constants' ring-ring adoption +
   the retired amber form's absence on the auth faces (the drawer
   Sign Out's navy-surface /60 arm stays); the prisma.config
   runtimeDatabaseUrl routing + the retired direct resolveDatabaseUrl
   form's absence; updateSettings' settingsSettled rider; the
   dashboard route's six-field user projection; the drift-probe's
   /assets/ positive selection + the retired positional form's
   absence + the exitCode form; the globals gray-500 pin's retirement
   + the tabs docblock's carrier-free form + the palette-pins
   comment-strip; the four ring-offset-background sites; the a11y
   register's meter-fill entry) + tests/store-staleness.test.ts (the
   settingsSettled strand leg — a remount hydrate whose tail is
   superseded by a PUT must leave the flag true over the fresh slice)
   + the same-commit recalibrations (parity-222/parity-223/
   login-reset/login-views — the F-222g/F-223h pins whose watched
   amber forms legitimately change; prisma-7-contract's datasource
   pin — the F-247d precedent, each recalibrated with its rationale
   in place).
2. **R-48.2 — the cures**: THE AUTH-FACE FOCUS-RING CURE (F-251a —
   the flagship: the nine constants adopt focus-visible:ring-ring,
   the F-218i ink the three submits already carry — one constants
   edit at the seam, no per-page hunt); THE PRISMA.CONFIG CLI-ANCHOR
   CURE (F-251b — the datasource URL routes through
   runtimeDatabaseUrl(), the signature-aware seam; verified against
   all four invocation patterns: the wrapper's absolute override,
   node/dotenv's raw relative form, bun's absolutized form, and the
   e2e caller pin); THE SETTINGS-SETTLED RIDER (F-251c — the flag
   joins the PUT's success commit; the F-250p comment-truth rider
   rides); THE DASHBOARD USER PROJECTION (F-251d); THE DRIFT-PROBE
   CSS POSITIVE SELECTION + EXIT HYGIENE (F-251e); THE DEAD gray-500
   PIN RETIREMENT + THE PALETTE CENSUS COMMENT-STRIP (F-251f); THE
   WHITE RING-OFFSET HALO CURE (F-251g — the four sites gain
   ring-offset-background, the F-129c1 adjudication superseded by
   the dark-era posture); THE AMBER METER-FILL REGISTER ENTRY
   (F-251h — the F-220p exemption pattern).
3. **R-48.3 — the verification**: the full gate (lint 0/0 · tsc 0 ·
   unit · build · smoke 15/15 · e2e) · the six parity drift gates
   CLEAN (the round's surfaces are focus-ring ink, a CLI-config
   re-route, a store flag rider, a projection widening, probe/tool
   hygiene, a dead-pin retirement, and offset tokens — pixel-dark
   classes invisible to the settled-page sweeps, with the F-250q
   doctrine standing guard if the reference restyles mid-verification)
   · census MATCH · `bun audit` unchanged · the captures (the
   own-database F-225e convention + the census tripwire): the mobile
   drawer at 390 (the standing ask — 9 destinations + Sign Out
   asserted), plus the round's own faces · the docs lockstep
   (README/AGENTS/CLAUDE/PAD/SKILL/this plan/worklog/the session
   record) in the same commit.

### R-47 — The settings-sequence, superseded-error, and select-completion round (session 250) — Status: Done(v2.47.0)""",
    "the R-48 section",
)

open(p, "w", encoding="utf-8").write(t)
print("plan v2.48.0 written")
