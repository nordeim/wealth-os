#!/usr/bin/env python3
"""Session 250 (R-47) plan writer — inserts the v2.47.0 blocks into
docs/remediation_plan_v2.md (assert-each-insertion: every anchor must
match exactly once or the script refuses)."""

import sys

PLAN = "docs/remediation_plan_v2.md"

with open(PLAN, encoding="utf-8") as f:
    text = f.read()

def insert_once(anchor: str, payload: str, label: str) -> None:
    global text
    n = text.count(anchor)
    if n != 1:
        sys.exit(f"REFUSED: anchor for {label} matched {n} times (expected 1)")
    text = text.replace(anchor, payload + anchor, 1)
    print(f"inserted: {label}")

def demote_once(old: str, new: str, label: str) -> None:
    global text
    n = text.count(old)
    if n != 1:
        sys.exit(f"REFUSED: demote anchor for {label} matched {n} times (expected 1)")
    text = text.replace(old, new, 1)
    print(f"demoted: {label}")

# ---------------------------------------------------------------- 1. the header
demote_once(
    "> **Current version: v2.46.0** (session 249 — the stale-read,",
    "> **Previous version: v2.46.0** (session 249 — the stale-read,",
    "v2.46.0 current -> previous",
)

NEW_HEADER = """> **Current version: v2.47.0** (session 250 — the
settings-sequence, superseded-error, and select-completion round R-47:
the owner's standing directive — refresh → review → validate → audit →
parity iteration → remediation plan → TDD execution → captures → docs
lockstep → commit → push, with the reference STABLE on all standing
drift layers (probe:ref — the bundle md5 unchanged, the demo data zero,
the desktop nav 256/9, the TRUE-390 menu 9 destinations; re-probed a
second time through agent-browser with the drawer census + open/close
toggle verified) and the mobile-navigation ask holding on BOTH sides
(ours: the labeled hamburger, the 9 destinations, the Sign Out superset;
the reference: its own unlabeled genus); the cold-baseline gate GREEN
at HEAD 043b998 — the exact v2.46.0 ship state reproduced: lint 0/0 ·
tsc 0 · 1645/1645 unit (101 files) · build · smoke 15/15 · 151/151 e2e
· census MATCH, the six parity drift gates CLEAN at 0-event margin, the
chromium-1254 toolchain gap the round's one discovery (the documented
session-248 class)). The session-250 fresh-eyes audit (three Mode-C
passes: the R-46 cure surfaces driven by the session, the
API/auth/security layer, and the UI/a11y/shell layer — 0 Critical / 0
High / 3 Medium / 7 Low / 7 Informational raw, every material claim
re-verified at file:line by the driving session; all four R-46 cure
surfaces verified holding — the flagship's three coordinated re-keys,
the logout exactly-own-bump guard, the signup create select, the logout
arm envelope; the F-249i eighth pending-face member RE-ADJUDICATED as
already holding (the F-234f rider sits at the site — the census
undercounted the cure, not the gap); the API layer clean again —
owner-scoping, Zod, buckets, injection, enumeration, session, errors,
secrets, deps all clean; the UI layer's Tailwind v4 token discipline
fully clean — zero unresolvable color tokens across the whole tree).
The round's flagship: THE SETTINGS SEQUENCE (F-250b — F-249h's
dedicated round: neither the hydrate tail's settings commit nor
updateSettings' carried an ordering dimension, so a stale tail read
landing after the PUT's commit silently reverted the saved preferences
under their "Settings saved" toast (the page's render-time form sync
followed the revert), and a remount hydrate's entry token bump dropped
the PUT's commit entirely; the cure mints a settings sequence at issue
— the tail's GET guards on era + sequence, the PUT bumps the sequence
(staling every in-flight older read) and re-keys its own commit from
the token to the era, the F-249c reasoning verbatim: a concurrent
hydrate's entry bump must not discard a mutation's fresher post-write
commit). Plus: THE SUPERSEDED ERROR COMMIT (F-250a — the R-46
flagship's own surface: hydrate's failure path carried a pre-R-46
leftover duplicate error commit OUTSIDE the superseded guard, so a
slow-failing dashboard GET landing after a fresher refresh committed
its stale error over a fully loaded workspace — the else arm retires);
THE READ-BOUNDED-JSON STREAM GUARD (F-250c — the Layer-3 read loop
could reject outside every route's try on a client disconnect
mid-body, answering a raw non-JSON 500 — the exact class the envelope
doctrine exists to bar; the loop gains its own catch resolving to the
unparseable contract); THE THREE SELECT COMPLETIONS (F-250d — the
settings upsert + its P2002 retry + the readSettings reads gain the
seven-field select, and the two transactions FK-existence findFirsts
gain select id — the F-228h insurance doctrine completed on its last
unswept sites); THE SIGN-OUT BUSY RIDERS (F-250e — the sidebar
MenuItem and the drawer button, the pending-face family's ninth and
tenth members); and THE EXPENSES BUCKET A11Y CURE (F-250f — the
budget category was color-only on every expense row (a WCAG 1.4.1
Level A miss) and the savings icon arm sat at 2.42:1 in light mode
(1.4.11); the row gains an sr-only bucket label — invisible to the
captured zero-data faces — and the light-mode savings icon ink steps
to emerald-600 at 3.58:1). Registered, not cured: the SSR theme-glyph
flash (F-250h), the aria-invalid wiring family (F-250i), the
button-link variant contrast caveat (F-250k), the badge dead focus
arms (F-250l), the OTP group label polish (F-250m), the dateField
datetime-instant note (F-250n), the create-null asymmetry (F-250o),
the export anchor outside the wall (F-250p), and the LWW theoretical
residual generalized to the settings family (F-250q), plus the
standing families (F-249j-n, F-248h-n, F-247g-l, F-246g/h, F-245g/h,
F-244i-n, F-242h/i, F-240k-n, F-239l-s). §5 carries the execution
history.)

"""

insert_once(
    "## 0. Versioning contract (how this file evolves)",
    NEW_HEADER,
    "the v2.47.0 current-version header block",
)

# ------------------------------------------------------ 2. the §2.10 audit ledger
LEDGER = """
### 2.10 Session-250 audit ledger (the fresh-eyes round over the v2.46.0 ship state)

Three Mode-C passes (the R-46 cure surfaces driven by the session · the
API/auth/security layer · the UI/a11y/shell layer); every material claim
re-verified at file:line by the driving session before planning. NEW
findings after dedup (the passes re-confirmed the documented postures
without exception — the F-247l avatar luminance heuristic re-surfaced by
the UI pass is the standing registration, not a new finding; the
F-217m/ADR-014 posture, the F-218t proxy-hops default, and the F-249j-n
registrations all stood; the negative results are recorded so the next
pass does not re-chase them):
0 Critical / 0 High / 3 Medium / 3 Low cured + 10 Informational
registered.

| ID | Severity | Finding (adjudicated) | Location | Disposition |
|---|---|---|---|---|
| F-250a | Medium | **THE SUPERSEDED ERROR COMMIT — the R-46 flagship's own failure arm escaped its superseded guard.** Hydrate's dashboard-GET failure path carried a pre-R-46 leftover duplicate error commit OUTSIDE the F-249c superseded dimension: the guarded form at :419-421 answers the legitimate failure landing, but the trailing else at :445-447 re-commits `{ hydrated: true, loading: false, error }` for EVERY failed landing regardless of supersession — a slow-failing dashboard GET (a transient 503, a network drop) landing after a fresher mutation-refresh or remount-hydrate already committed fresh data commits its stale error over `error: null`, and the shell's red could-not-load banner persists over a fully loaded workspace until the next committing action; a failed landing inside the logout window converts the logout face into the error face (masked only by the signOut navigation). The non-superseded case is a pure duplicate of the guarded form — the else arm is unreachable-in-effect except through the defect. | `src/stores/wealthos-store.ts:445-447` vs the guarded form `:419-421` | **cured in R-47** (the duplicate else arm retires — the guarded form owns the legitimate failure landing; the behavioral battery gains the superseded-error leg) |
| F-250b | Medium | **THE SETTINGS ORDERING RACE — F-249h's dedicated round (the F-248f genus on the settings slice, both windows live).** Window A (the stale overwrite): the hydrate tail's settings GET and updateSettings' PUT both guard their commits on the write token alone — a GET never bumps it, so an in-flight tail read landing after the PUT's commit passes its guard and overwrites the fresh settings with the pre-PUT read, and the Settings page's render-time form sync (`settingsKey !== settings`) silently REVERTS the form under its "Settings saved" toast (self-healing only on the next full hydrate). Window B (the dropped write): a remount hydrate's entry token bump (:341) stales updateSettings' captured token mid-PUT — the PUT's fresh commit is skipped while the page toasts success; convergence then depends on whether the hydrate tail's own GET read post-write data (in the server-out-of-order case it does not, and the stale tail's commit compounds the loss). | `src/stores/wealthos-store.ts:436-443 vs :614-628`; the amplifier `src/app/(app)/settings/page.tsx:79-90` | **cured in R-47** (the flagship: a module-level settings sequence — the tail's GET mints it at issue and its settle/commit guard re-keys from the token to era + sequence; updateSettings bumps the sequence at entry (staling every in-flight older read) and re-keys its own commit from the token to the era, the F-249c reasoning verbatim — a concurrent hydrate's entry bump must not discard the mutation's fresher post-write commit; last-write-wins with the landing-order residual registered as F-250q) |
| F-250c | Low | **THE READ-BOUNDED-JSON STREAM ESCAPE — Layer 3's read loop could reject outside every route's try.** `readBoundedJson`'s stream counter loop awaits `reader.read()` unguarded; every route awaits `parseBody` BEFORE its own try/catch, so a read rejection (a client disconnect mid-body, a transport fault) propagates past the handler to the framework's raw non-JSON 500 — the exact envelope class the F-249f round barred on the logout route, living on the one seam every body-consuming route shares. Practically minimal (the disconnected client cannot read any response), but the envelope contract is the contract. | `src/lib/api.ts:239` (the loop); the call-site shape e.g. `src/app/api/auth/login/route.ts:28` | **cured in R-47** (the loop gains its own catch: cancel the producer, resolve to the unparseable contract `{ tooLarge: false, value: null }` — the call sites' existing 400 arms answer unchanged) |
| F-250d | Low | **THE THREE SELECT COMPLETIONS — the F-228h insurance doctrine's last unswept sites.** The settings route's upsert (and its P2002-retry twin) plus readSettings' findUnique/findUniqueOrThrow/create materialize the full Setting row where exactly seven fields are consumed, and the two transactions FK-existence findFirsts (POST + PUT) materialize the full BankAccount row where existence alone is consumed — the F-247d precedent (signup's existence check) is the exact analogue. No secrets on either model today; the residual is the doctrine's forward-insurance clause (a future return-the-row edit leaks the row in one step). | `src/app/api/settings/route.ts:22-40,80-104`; `src/app/api/transactions/route.ts:48-50`; `src/app/api/transactions/[id]/route.ts:28-30` | **cured in R-47** (the seven-field select on the settings family's five query sites; `select: { id: true }` on both existence checks) |
| F-250e | Low | **THE SIGN-OUT BUSY RIDERS — the pending-face family's ninth and tenth members.** The sidebar's user-menu MenuItem and the mobile drawer's Sign Out button fire `signOut()` with no busy rider — the family census's only unguarded mutation triggers (F-249i's eighth member re-verified HOLDING: the Settings Category-Budgets Add carries its F-234f rider). Low in practice (both surfaces dismiss on activation; the logout guest arm is an idempotent no-op 200) — the guard is prophylactic, completing the family's census at ten sites. | `src/components/layout/sidebar.tsx:150-160`; `src/components/layout/mobile-nav.tsx:174-181` | **cured in R-47** (local busy state + entry guard + `disabled` on both surfaces; the parity-223 onSelect literal unchanged) |
| F-250f | Medium | **THE EXPENSES BUCKET COLOR-ONLY CARRIER — a WCAG 1.4.1 Level A miss with a 1.4.11 rider.** Every expense row conveys its 50/30/20 budget bucket ONLY through the tinted tile (an identical Receipt glyph inside `backgroundColor: meta.soft, color: meta.color`) — the row text never names the bucket, so the dimension the section's own Tabs filter on is invisible to non-sighted users (Use of Color, Level A). The savings arm's icon ink compounds it: emerald #10b981 on #ecfdf5 computes 2.42:1, below the 3:1 non-text bar (needs 3.58:1 at emerald-600; the blue and purple arms already pass at 3.38:1/3.75:1; dark mode passes on all three). | `src/app/(app)/expenses/page.tsx:204-213`; the palette `src/lib/constants.ts:10-16` | **cured in R-47** (an sr-only bucket label inside the tile — announced at the row head, invisible to every captured zero-data face (the rows do not render there); the light-mode savings icon ink steps to emerald-600 via a per-category `iconLight` field — the budgets-legend dots and the dark-mode arms unchanged) |
| F-250g | Informational | **THE F-249i RE-ADJUDICATION — the eighth pending-face member already carries its rider.** The session-249 registration read the Settings Category-Budgets Add button as the family's unguarded eighth member; the pass-A census found the F-234f rider standing at the site (`disabled={busyAdd}` + the paired entry guard) — the prior census undercounted the CURE, not the gap. The family stands at seven registered sites + the eighth holding + the two sign-out surfaces cured this round (F-250e). | `src/app/(app)/settings/page.tsx:108-120,264` | **adjudicated in R-47** (registration closed — the site is the F-234f cure's own) |
| F-250h | Informational | **THE SSR THEME-GLYPH FLASH — the chrome's toggle faces server-render the light arm.** `useIsDark()` server-snapshots false, so the server HTML paints Moon + "Switch to dark mode" (and the sidebar's sr-only "— currently off") even when the no-FOUC bootstrap has already added `.dark` pre-paint — the default for fresh app-route visitors. Self-corrects at hydration (useSyncExternalStore re-syncs, no warning); sub-second, cosmetic, the F-219c cure owned the color tokens and never the glyph/label chrome. | `src/components/layout/theme.tsx:78-84`; the faces `mobile-header.tsx:47-49`, `sidebar.tsx:148` | recorded (Reasoned; the pragmatic fix — render the glyph post-hydration with a placeholder — trades one flash for another; revisit only if a user report lands) |
| F-250i | Informational | **THE ARIA-INVALID WIRING FAMILY — zero aria-describedby/aria-invalid across the tree.** Error banners are role=alert (announced) but no input references its error: a screen-reader user tabbing back to the email field after a failed sign-in gets no error context in focus mode. WCAG 3.3.1 is arguably met via the alert; the association is the robustness step, systematically absent on every inline-error form. | `src/components/layout/login-card.tsx:815`; `reset-password-screen.tsx:198-205` (representative) | recorded (a dedicated round — the three auth forms + the section dialogs each need id plumbing; not a rider) |
| F-250j | Informational | **THE BUTTON LINK-VARIANT CONTRAST CAVEAT — a latent 2.15:1 arm without its register entry.** The `link` variant's `text-primary` (amber-500) sits at 2.15:1 on light surfaces — the F-219a measured family; the destructive and badge arms carry measured-contrast caveats, this one does not. Zero consumers today. | `src/components/ui/button.tsx:90` | recorded (annotate per the register discipline, or re-pin when a consumer lands) |
| F-250k | Informational | **THE BADGE'S DEAD FOCUS ARMS — focus (not focus-visible) affordances on a non-interactive div.** The badge carries `focus:ring-2` arms that can never fire without a tabindex (and the house doctrine is focus-visible since F-222g); the hover arms ride a static "Compliant" badge. | `src/components/ui/badge.tsx:51` | recorded (drop or convert if an interactive badge ever lands) |
| F-250l | Informational | **THE OTP GROUP POLISH — no group-level label, no arrow-key navigation.** The six boxes carry per-box labels, paste distribution, backspace step-back, one-time-code autofill (all excellent); missing: a `role="group" aria-label="Verification code"` wrapper and Left/Right arrow movement between boxes. | `src/components/layout/login-card.tsx:571-598` | recorded (polish; the per-box labels already carry the a11y floor) |
| F-250m | Informational | **THE DATEFIELD DATETIME-INSTANT NOTE — the Z-ISO arm admits non-midnight instants into calendar columns.** The sanctioned `(T…Z)?` tail accepts `2026-11-01T18:30:00.000Z`, which stores as an 18:30 UTC instant, not UTC midnight; `toDate` re-anchors only the midnight form, so local accessors can bucket a 23:30Z instant into the next local month for UTC-positive viewers. API-only (the app's own surfaces send `yyyy-mm-dd`); the two-shape contract is documented (F-216h/F-217j). | `src/lib/schemas.ts:146-155` | recorded (either normalize Z-ISO inputs to their written UTC calendar date at the boundary, or document the arm as instant-valued) |
| F-250n | Informational | **THE CREATE-NULL ASYMMETRY — create schemas reject the explicit nulls the app's own export emits.** The GDPR export serializes `notes: null`/`accountId: null` for unset fields; re-POSTing such a row fails Zod (`.optional()` admits undefined only) while the update twins accept null as the documented clear. No first-party consumer (the CSV import carries six fields). | `src/lib/schemas.ts:213-226,346-351,437-442` | recorded (mirror the update twins' nullable handling on create, or leave documented) |
| F-250o | Informational | **THE EXPORT ANCHOR OUTSIDE THE WALL — the one authenticated surface no 401 arm can reach.** The settings Export card's `<a href="/api/export" download>` bypasses the store's call wrapper; on a revoked session the user receives the 401 envelope as a downloaded file (or a dead click). It is a navigation, not a fetch — the wall family's documented one unreachable surface. | `src/app/(app)/settings/page.tsx:328-333` | recorded (accept, or intercept the click with a store-mediated fetch) |
| F-250p | Informational | **THE LWW THEORETICAL RESIDUAL, GENERALIZED — the sequence family's shared assumption.** The refresh sequence (and the new settings sequence) assumes a later-issued read sees equal-or-fresher server state; two concurrent in-flight reads can be processed server-side out of issue order across an interleaved write, inverting freshness — and two concurrent settings PUTs commit in landing order (last-landing, not last-write). Inherent to client-side LWW without server version tokens; no concrete interleaving demonstrated. | `src/stores/wealthos-store.ts` (the seq family) | recorded (the structural fix — server version tokens — is its own architecture round) |

"""

insert_once(
    "## 3. The remediation program (R-items)",
    LEDGER,
    "the §2.10 session-250 audit ledger",
)

# ------------------------------------------------------------- 3. the R-47 section
R47 = """### R-47 — The settings-sequence, superseded-error, and select-completion round (session 250) — Status: In progress

The session-250 findings-led round over the v2.46.0 ship state. Six
cures (F-250a-f), one re-adjudication (F-250g), ten registrations
(F-250h-p).

1. **R-47.1 — the pins born RED**: tests/store-staleness.test.ts (the
   behavioral battery's three new legs: the superseded-error leg — a
   held hydrate GET FAILING and landing after a mutation's refresh
   committed must not commit its stale error over the fresh state; the
   settings stale-overwrite leg — a held tail GET released after the
   PUT's commit must not overwrite the fresh settings; the settings
   dropped-write leg — a remount hydrate's entry bump inside the PUT
   window must not drop the PUT's commit) + tests/ai-body-cap.test.ts
   (the stream-rejection leg — a body stream whose read rejects
   resolves to the unparseable contract instead of throwing) +
   tests/parity-250.test.ts (the source battery: the retired duplicate
   error else's absence; the settings sequence's declaration; the
   tail's issue-time mint + the era-and-sequence guard + the retired
   token-keyed tail form's absence; updateSettings' entry bump + the
   era-keyed commit + the retired token-keyed form's absence; the
   readBoundedJson stream guard's catch + cancel + null-contract
   return; the settings family's select form across its five query
   sites; the two transactions findFirst select-id forms; the two
   sign-out busy riders + entry guards; the expenses sr-only bucket
   label + the light-mode savings icon ink).
2. **R-47.2 — the cures**: THE SETTINGS SEQUENCE (F-250b — the
   flagship: a module-level settings sequence joining the tail's GET
   and updateSettings' PUT — the read mints at issue and guards its
   settle/commit on era + sequence; the write bumps at entry (staling
   every in-flight older read) and re-keys its own commit from the
   token to the era, the F-249c reasoning applied to the settings
   slice: the token's only non-clearing bumper is a concurrent
   hydrate's entry bump, which must not discard the mutation's fresher
   post-write commit); THE SUPERSEDED ERROR COMMIT (F-250a — the
   duplicate else arm retires, the guarded form owns the failure
   landing); THE READ-BOUNDED-JSON STREAM GUARD (F-250c); THE THREE
   SELECT COMPLETIONS (F-250d); THE SIGN-OUT BUSY RIDERS (F-250e);
   THE EXPENSES BUCKET A11Y CURE (F-250f).
3. **R-47.3 — the verification**: the full gate (lint 0/0 · tsc 0 ·
   unit · build · smoke 15/15 · e2e) · the six parity drift gates
   CLEAN (the surfaces are store-guard re-keys, a catch-arm addition,
   select narrowing, disabled riders, an sr-only span on a data-only
   surface, and a light-mode icon ink — pixel-invisible on the
   captured zero-data faces by construction, the rows do not render
   there) · census MATCH · `bun audit` unchanged · the captures (the
   own-database F-225e convention + the census tripwire): the mobile
   drawer at 390 (the standing ask — 9 destinations + Sign Out
   asserted), plus the round's own faces.

"""

insert_once(
    "### R-46 — The stale-read, era-thread, and guard-structural round (session 249) — Status: Done(v2.46.0)",
    R47,
    "the R-47 section",
)

with open(PLAN, "w", encoding="utf-8") as f:
    f.write(text)
print("plan v2.47.0 written")
