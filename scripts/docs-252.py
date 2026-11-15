#!/usr/bin/env python3
"""Session-252 (R-49): write remediation plan v2.49.0 — the
list-focus-ring, resend-shape, and type-lag round.

Assert-each-insertion convention (the plan-251 form): every sub()
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

# 1. Demote the v2.48.0 head and insert the v2.49.0 current block above it.
sub(
    "> **Current version: v2.48.0** (session 251 — the",
    """> **Current version: v2.49.0** (session 252 — the
list-focus-ring, resend-shape, and type-lag round R-49: the owner's
standing directive — refresh → review → validate → audit → parity
iteration → remediation plan → TDD execution → captures → docs
lockstep → commit → push, with the reference STABLE on every standing
drift layer (probe:ref — the bundle md5 6d3779af… unchanged, the
F-250q stylesheet fingerprint 96f24d45… unchanged, the demo data
zero, the desktop nav 256/9, the TRUE-390 menu 9 destinations) and
the mobile-navigation ask verified on BOTH sides through agent-browser
at TRUE 390×844 (the reference's drawer: 9 destinations + Sign Out,
opens and closes on the X toggle; OUR drawer: the same 9 destinations
+ the labeled superset — the aria-label hamburger, the navigation
landmark, the skip link, Sign Out — closing on the toggle with the
aria-expanded flip; no Tailwind v4 regression, the token discipline
clean on every audited axis — the pass-C five-leg verdict: zero
phantom breakpoints, zero unpinned tokens, no config file, no misused
renamed utilities, the .dark flips complete); the cold-baseline gate
GREEN at HEAD 04fd4f6 — the exact v2.48.0 ship state reproduced
(plus the owner's session_86.md transcript capture): lint 0/0 · tsc 0
· 1686/1686 unit (103 files) · build · smoke 15/15 · 151/151 e2e
(one transient timing-leg failure on the first e2e run — the known
flake family, two consecutive green runs after) · census MATCH · ALL
SIX parity drift gates CLEAN at 0.5pct margin; the chromium-1254
install the one toolchain step; `bun audit` unchanged (1 moderate
dev-chain minimatch, the documented deferral); neo-crm unchanged
(b3d0fbe) — nothing to port; the SEO surface verified (smoke leg 12:
sitemap + robots + manifest 200); the .env
DATABASE_URL="file:../db/custom.db" contract + the db/ at the repo
root + the vitest/playwright configs + the .env.example six-knob set
all standing). The session-252 fresh-eyes audit (three Mode-C passes:
the R-48 cure surfaces driven by the session, the API/auth/security
layer, and the UI/a11y/shell layer — 0 Critical / 0 High / 1 Medium /
5 Low cured + 4 Informational cured-as-riders + 1 Informational
registered after dedup, every material claim re-verified at file:line
by the driving session, the contrast math re-computed by code; all
eight R-48 cure surfaces verified holding; the API layer's fifth
consecutive clean bill, this time independently re-derived; the
negative results recorded so the next pass does not re-chase them).
The round's flagship: THE LIST-ITEM KEYBOARD-FOCUS RING (F-252a —
the wash-only keyboard indicator on the Radix list-item families:
the sidebar user-menu's items and every Select listbox option ride a
background wash computing 1.09:1 light / 1.31:1 dark against their
panels — the only interactive families with the outline suppressed
and no ring replacement, invisible to axe (focus visibility is not
modeled) and to the sweeps (dialogs closed on settled pages); the
cure adds the keyboard ring arm — the F-218i ring-ring ink at
17.49:1 light / 18.15:1 dark — while the wash stays for pointer
users, proven live by the computed-style capture). Plus: THE RESEND
SHAPE ORACLE (F-252b — the miss arm's two-key envelope vs the known
arm's three-key form is a never-verified-state enumeration signal
that survives the production OTP knob; the miss arm joins the
forgot-password always-present-key form); THE DASHBOARD USER TYPE
LAG (F-252c — the wire type stays four-field while the route ships
six; the type widens to User and the two as-casts retire); THE
PALETTE CENSUS TRAILING-COMMENT GAP (F-252d — the stripComments
full-line-only blind spot the R-48 comment-strip left, the docblock's
"never invent it" claim falsifiable by a trailing citation; the
strip completes with the URL-colon exemption); THE THEME-BLIND
SCROLLBAR (F-252e — the scaffold-era utility ships the light thumb
in both modes; the dark arm lands at 3.91:1); THE LATENT RING-OFFSET
ARMS (F-252f — the tabs underline variant and the badge carry the
offset without its token, the F-251g genus's uncalled members).
Riders: the vestigial dark-wash literal retirement (F-252g — the
token flip made it byte-redundant nine rounds ago), the red
over-budget meter register note (F-252h — 3.0:1, exactly at the
bar), the e2e-pin prose truths (F-252i), and the un-messaged Zod
fields (F-252j — the house copy reaches the three bare fields).
Registered, not cured: the useTheme no-provider fallback divergence
(F-252k — zero live consumers, a product decision), plus the standing
families (F-251i-k, F-250h-p, F-249j-n, F-248h-n, F-247g-l,
F-246g/h, F-245g/h, F-244i-n, F-242h/i, F-240k-n, F-239l-s). §5
carries the execution history.)


> **Previous version: v2.48.0** (session 251 — the""",
    "the v2.49.0 current-version block",
)

# 2. The session-252 audit ledger (§2.12) between §2.11's table and §3.
sub(
    """| F-251k | Informational | **THE RESET ROUTE'S SCHEMA-LESS BODY — the API's one body parse that bypasses the Zod seam.** The reset route validates its body with readBoundedJson + a hand-rolled literal compare (`body.confirm !== "RESET"`) rather than a schema through parseBody; behavior is exactly equivalent to `z.object({ confirm: z.literal("RESET") })` (bounded, content-type-gated, unknown keys ignored) — a consistency note in the F-247i/F-248m genus, not a defect. | `src/app/api/reset/route.ts:25-31` vs the convention at AGENTS.md:58-62 | recorded (if the route is ever touched, add `resetConfirmSchema` and ride parseBody; otherwise the documented one-hand-rolled-site) |

## 3. The remediation program (R-items)""",
    """| F-251k | Informational | **THE RESET ROUTE'S SCHEMA-LESS BODY — the API's one body parse that bypasses the Zod seam.** The reset route validates its body with readBoundedJson + a hand-rolled literal compare (`body.confirm !== "RESET"`) rather than a schema through parseBody; behavior is exactly equivalent to `z.object({ confirm: z.literal("RESET") })` (bounded, content-type-gated, unknown keys ignored) — a consistency note in the F-247i/F-248m genus, not a defect. | `src/app/api/reset/route.ts:25-31` vs the convention at AGENTS.md:58-62 | recorded (if the route is ever touched, add `resetConfirmSchema` and ride parseBody; otherwise the documented one-hand-rolled-site) |

### 2.12 Session-252 audit ledger (the fresh-eyes round over the v2.48.0 ship state)

Three Mode-C passes (the R-48 cure surfaces driven by the session · the
API/auth/security layer · the UI/a11y/shell layer); every material claim
re-verified at file:line by the driving session before planning (the
contrast math re-computed by code, not carried from the passes). NEW
findings after dedup (the passes re-confirmed the documented postures
without exception — all eight R-48 cure surfaces verified holding; the
Tailwind v4 standing-ask hunt clean on every audited axis (the five-leg
verdict: phantom breakpoints, unpinned tokens, config file, renamed
utilities, .dark completeness); the API layer clean on every dimension
for the fifth consecutive round — owner-scoping census, Zod sweep,
bucket coverage, injection/enumeration/session sweeps, bounded readers,
consumed-field selects all re-derived; the negative results are
recorded in the session record so the next pass does not re-chase
them): 0 Critical / 0 High / 1 Medium / 5 Low cured + 4 Informational
cured-as-riders + 1 Informational registered.

| ID | Severity | Finding (adjudicated) | Location | Disposition |
|---|---|---|---|---|
| F-252a | Medium | **THE LIST-ITEM KEYBOARD-FOCUS RING — the wash-only indicator on the Radix list-item families computes 1.09:1 light / 1.31:1 dark.** The sidebar user-menu items (`MENU_ITEM`) and every Select listbox option (`SelectItem`) — the only interactive families carrying `outline-none` with NO ring replacement — indicate keyboard focus purely through a background wash: stone-100 #f5f5f4 on the white surface = 1.09:1 in light (re-computed by code this session), stone-800 #292524 on the #0a0a0a dark surface = 1.31:1; the paired text shift is imperceptible. WCAG 2.4.7 arguably passes (an indicator exists) but 2.4.13 Focus Appearance does not — and the house bar (focus indicators at the 3:1 non-text contrast) is missed on the app's MOST keyboard-traveled surfaces (every combobox pick, the user menu). Invisible to every gate: axe does not model focus visibility, the sweeps capture settled pages with dialogs closed, the a11y two-gate runs on pages not open menus. The F-221b round cured the wash's dark TEXT leg (13.9:1 ink on the wash) — the indicator-vs-surface leg is a different axis nobody measured. The genus is vendored shadcn/Radix stock, but the repo already supersets rings on raw buttons (the F-222g family) — the same superset applies. | `src/lib/page-layout.ts:387-388` (MENU_ITEM); `src/components/ui/select.tsx:146` (SelectItem); `src/components/ui/dropdown.tsx:67` (DropdownItem — latent, zero live consumers) | **cured in R-49** (the keyboard ring arm joins the wash on all three constants — the ring-ring ink at 17.49:1 light / 18.15:1 dark; the wash stays for pointer users; proven live by the computed-style capture on the Expenses category filter) |
| F-252b | Low | **THE RESEND SHAPE ORACLE — the miss arm's envelope differs from the known arm's, and the asymmetry survives the production OTP knob.** The resend route's miss arm (unknown email or nothing pending) returns `ok({ resent: true, message })` — two keys; the known never-verified arm always carries the third key `verificationCode` (null under `NEO_DISABLE_IN_APP_OTP=1`). Key-set presence therefore distinguishes "never-verified account exists" from "unknown or already-verified" to any unauthenticated caller — and unlike the in-band delivery itself (killed by the knob), the shape asymmetry survives the production posture. The route's own docblock claims "the reference's non-leaking posture" — true of the copy, not of the envelope's shape. Account existence is already openly enumerated by signup's duplicate-email 400 (recorded, accepted), and the default in-band posture discloses strictly more — the genuinely new bit is only the never-verified state, the same class the house cured at verify (F-223l/F-224b) and rated Low. | `src/app/api/auth/resend/route.ts:90` (miss arm) vs `:123-127` (known arm) | **cured in R-49** (the miss arm joins the forgot-password always-present-key form — `verificationCode: null` rides the miss arm, both arms three-key) |
| F-252c | Low | **THE DASHBOARD USER TYPE LAG — the wire type still declares the four-field Pick the F-251d cure widened past.** `DashboardData.user` is `Pick<User, "id" \\| "name" \\| "email" \\| "avatarColor">` while the route now returns the full six-field User shape — so the store's two `as User` casts remain load-bearing widening assertions: if the route ever narrows again, TS compiles silently and the runtime-undefined photoUrl/role genus F-251d cured returns undetected at the type level (only the textual parity pin would catch it). The type seam lagging the cure it documents. | `src/types/index.ts:110`; the casts at `src/stores/wealthos-store.ts:286,426` | **cured in R-49** (the wire type widens to `User`; the two as-casts retire — the narrowing trap closes at the type level) |
| F-252d | Low | **THE PALETTE CENSUS TRAILING-COMMENT GAP — the R-48 comment-strip left the trailing-`//` blind spot, and the docblock's "never invent it" claim is falsifiable.** `stripComments` (tests/palette-pins.test.ts) strips block comments and full-line `//` only — a TRAILING `//` comment on a code line survives the strip, so a trailing citation (e.g. `// F-218j: red-500 was…`) registers as live usage and can silently mask a dead pin on the F-246c reverse leg, exactly the phantom-consumer genus F-251f cured for docblocks. Four trailing citations exist today (page-parts.tsx:84,88; investments/page.tsx:317; dashboard/page.tsx:411 — all citing live pairs, masking nothing), but the docblock's guarantee ("it can only UNDERCOUNT usage, never invent it") is false for this form. | `tests/palette-pins.test.ts:84-88` (the strip) vs the claim at `:80-83`; the four trailing carriers | **cured in R-49** (the strip completes — trailing line comments strip with the URL-colon exemption so `https://` literals survive; the docblock's claim rewritten to the true guarantee) |
| F-252e | Low | **THE THEME-BLIND SCROLLBAR — the scaffold-era `scrollbar-thin` utility ships the light thumb in both modes.** The custom scrollbar utility pins `#d1d5db` (gray-300) for `scrollbar-color` and the webkit thumb with NO `.dark` arm — while every neighboring custom utility carries one (`.dark .sidebar-gradient`, `.dark .page-wash`, `.dark .input-base`). Light mode: the thumb measures 1.4:1 on the near-white wash (custom-styled UA chrome; WCAG 1.4.11 applicability is a judgment call). Dark mode passes loudly (~9:1 bright gray on near-black) but reads as a light-mode artifact. No reference-parity constraint blocks a dark arm (the utility is a scaffold-era superset, not a byte-extracted form). | `src/app/globals.css:499-516` (`@utility scrollbar-thin`) | **cured in R-49** (the `.dark .scrollbar-thin` arm — the stone-500 family at 3.91:1 on the dark wash, computed by code) |
| F-252f | Low | **THE LATENT RING-OFFSET ARMS — the F-251g genus's uncalled members.** The tabs `underline` variant's trigger (the component's default genus, currently uncalled — both live consumers ride the segmented variant) and the Badge's focus frame carry `ring-offset-2`-shaped offsets with no offset token: a latent white halo in the dark default exactly the class F-251g cured on the four live surfaces, waiting on the first future consumer. | `src/components/ui/tabs.tsx:157` (the underline variant's trigger); `src/components/ui/badge.tsx:51` | **cured in R-49** (both gain the offset token — the F-226i/F-251g cure form, applied before the first consumer can ship the halo) |
| F-252g | Informational | **THE VESTIGIAL DARK-WASH LITERAL — the shell root's `dark:bg-[#0e1310]` patch is byte-redundant since the F-220d token flip.** The `.dark` block flips `--color-background: #0e1310` (globals.css:350), so the root's `bg-background` already resolves the wash — the local literal arm is the duplicate-literal genus F-232h retired for the sidebar, a latent divergence point (a future token edit would not reach the shell wash). Computed output identical today; the e2e dark-wash leg (rgb(14,19,16)) is unaffected. | `src/lib/page-layout.ts:7`; the two history comments citing the patch at `src/app/globals.css:328,344`; the e2e comment at `tests/e2e/wealthos.spec.ts:59` | **cured in R-49** (the literal retires; the citing comments reworded describe-never-cite — the F-238d discipline, so the parity-229 nets stay clean) |
| F-252h | Informational | **THE RED OVER-BUDGET METER — the F-251h register's missing sibling.** The dashboard's over-budget arm fills `bg-red-500` on the stone-200 track, computing 3.0:1 (re-computed by code — exactly at the WCAG 1.4.11 bar, unlike the amber fills' 1.33:1/1.71:1). The F-251h register entry cites only the amber genus; a future contrast sweep could "discover" the red arm. | `src/app/(app)/dashboard/page.tsx:429` (the over arm); the register at `tests/e2e/a11y.spec.ts:157-166` | **cured in R-49** (the register note extends to the red arm — the measured value cited) |
| F-252i | Informational | **THE E2E-PIN PROSE TRUTHS — two docblocks cite the e2e db pin in its relative form while the actual pin is absolute.** Both `prisma.config.ts:21` and `db-path.ts:37` describe "the e2e suite's `file:../db/e2e.db` pin" — the pin global-setup actually sets is the absolute `file:<root>/db/e2e.db` (since R-9). Behavior is unaffected (both forms land on `<repo>/db/e2e.db`); the citations are on the parity-229 prose allowlist as URL fragments, so no scanner risk — pure comment truth, the F-251f genus. | `prisma.config.ts:16-23`; `src/lib/db-path.ts:33-40` | **cured in R-49** (both docblocks describe the absolute pin form) |
| F-252j | Informational | **THE UN-MESSAGED ZOD FIELDS — three bare fields surface raw library copy through the BAD_REQUEST envelope.** `budgetDeleteSchema.category` (`z.string().trim().min(1).max(80)`, zero custom messages — the sibling `budgetUpsertSchema` messages every field), the csv row `category`'s 80-cap, and `aiCoachSchema.history[].content`'s 4000-cap: a caller posting an empty/oversized value gets Zod v4 default copy ("Too small: expected…") instead of the family's human messages. Cosmetic envelope-copy drift; no security or correctness impact. | `src/lib/schemas.ts:546-548,589,610` | **cured in R-49** (the house copy reaches the three fields) |
| F-252k | Informational | **THE useTheme NO-PROVIDER FALLBACK — the defensive branch diverges from the provider's semantics.** The fallback `toggle()` flips the html class with no localStorage write and no label sync; `setTheme("system")` forcibly removes dark instead of resolving prefers-color-scheme. Zero live consumers (the ThemeProvider is root-wired); latent-only — a future consumer rendered outside the provider would silently desync the stored label. | `src/components/layout/theme.tsx:154-170` | recorded (Reasoned; either mirror the provider's applyTheme + storage writes in the fallback, or throw in dev — a product decision, not a rider) |

## 3. The remediation program (R-items)""",
    "the §2.12 session-252 audit ledger",
)

# 3. The R-49 section before R-48.
sub(
    """### R-48 — The focus-ring, cli-anchor, and settings-flag round (session 251) — Status: Done(v2.48.0)""",
    """### R-49 — The list-focus-ring, resend-shape, and type-lag round (session 252) — Status: In progress (planned; executed this session)

The session-252 findings-led round over the v2.48.0 ship state. Six
cures (F-252a-f), four riders (F-252g-j), one registration (F-252k).

1. **R-49.1 — the pins born RED**: tests/parity-252.test.ts (the
   source battery: the three list-item constants' keyboard ring arms +
   the wash-only forms' absence; the resend miss arm's three-key
   envelope; the wire type's User form + the two as-casts' absence;
   the stripComments trailing-// completion; the scrollbar dark arm;
   the two latent offset tokens; the retired dark-wash literal's
   absence + the reworded citing comments; the register's red-arm
   note; the three Zod message forms; the two e2e-pin prose truths)
   + the e2e ring leg (the keyboard-highlighted Select option's
   computed ring, proven live at GREEN-proof).
2. **R-49.2 — the cures**: THE LIST-ITEM KEYBOARD-FOCUS RING
   (F-252a — the flagship: the ring arm joins the wash on MENU_ITEM,
   SelectItem, and DropdownItem — the F-218i ring-ring ink, the wash
   preserved for pointer users); THE RESEND SHAPE ORACLE (F-252b —
   the miss arm carries the always-present null key, the
   forgot-password form); THE DASHBOARD USER TYPE LAG (F-252c — the
   wire type widens to User, the casts retire); THE PALETTE CENSUS
   TRAILING-COMMENT GAP (F-252d — the strip completes with the
   URL-colon exemption, the docblock claim rewritten); THE
   THEME-BLIND SCROLLBAR (F-252e — the dark arm at 3.91:1); THE
   LATENT RING-OFFSET ARMS (F-252f — the underline variant and the
   badge gain the offset token). Riders: THE VESTIGIAL DARK-WASH
   LITERAL (F-252g); THE RED METER REGISTER NOTE (F-252h); THE
   E2E-PIN PROSE TRUTHS (F-252i); THE UN-MESSAGED ZOD FIELDS
   (F-252j).
3. **R-49.3 — the verification**: the full gate (lint 0/0 · tsc 0 ·
   unit · build · smoke 15/15 · e2e) · the six parity drift gates
   CLEAN (the round's surfaces are keyboard-focus ink, a response
   shape, a type widening, census hygiene, UA chrome, and latent
   tokens — invisible to the settled-page sweeps, with the F-250q
   doctrine standing guard if the reference restyles mid-verification)
   · census MATCH · `bun audit` unchanged · the captures (the
   own-database F-225e convention + the census tripwire): the mobile
   drawer at 390 (the standing ask — 9 destinations + Sign Out
   asserted), the list-focus ring face (the computed ring on the
   keyboard-highlighted option), plus the round's own faces · the
   docs lockstep (README/AGENTS/CLAUDE/PAD/SKILL/this plan/worklog/
   the session record) in the same commit.

### R-48 — The focus-ring, cli-anchor, and settings-flag round (session 251) — Status: Done(v2.48.0)""",
    "the R-49 section",
)

open(p, "w", encoding="utf-8").write(t)
print("plan written")
