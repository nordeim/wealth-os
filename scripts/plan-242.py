#!/usr/bin/env python3
"""Session-242 (R-39): write the plan v2.39.0 into the ledger — the
header block, the F-242 ledger rows, the R-39 section, the §5 execution
row, and the tail-note extension. Assert-each-insertion form (the house
convention): every anchor asserted before insertion, the file written
once, every insertion re-verified after the write."""

from pathlib import Path

PLAN = Path("docs/remediation_plan_v2.md")
src = PLAN.read_text()

HEADER_NEW = """\
> **Current version: v2.39.0** (session 242 — the CSP-inventory,
> test-hygiene, and carrier-truth round R-39: the owner's standing
> directive — refresh → review → validate → audit → parity iteration →
> remediation plan → TDD execution → captures → docs lockstep →
> commit → push, with the reference STABLE on all standing drift
> layers and the TRUE-390 mobile menu re-verified by probe:ref this
> session; the cold-baseline gate GREEN at HEAD 1b038d7 — no
> discovery this round, the v2.38.0 ship state reproduced exactly:
> lint 0/0 · tsc 0 · 1519/1519 unit (91 files) · build · smoke 15/15
> · 147/147 e2e · census MATCH). The session-242 fresh-eyes audit
> (three Mode-C passes: the R-38 cure surfaces driven by the session,
> the API/auth/security layer, and the UI/a11y/shell layer — 0
> Critical / 0 High / 1 Medium / 5 Low / 3 Informational NEW after
> dedup (the passes also re-confirmed the documented postures — the
> F-217m in-band-delivery default, the F-218t proxy-hops default, the
> signup enumeration parity, the HSTS/cookie/limiter informationals),
> every material claim re-verified at file:line by the driving
> session; all seven R-38 cure surfaces verified holding — the era
> counter's two-site mutation set, the six era-keyed 401 arms, the
> creation-path ceiling's ordering and collision-free key, the
> cardinality cap's fail-closed overflow, the three P2025 arms, the
> popover focus return, the FORM_TEXTAREA seam's two consumers; the
> API layer clean again — owner-scoping, Zod, buckets, injection,
> enumeration, session, errors, secrets, deps all clean; the UI layer
> clean — the drawer mechanics, the theme system, the a11y contracts,
> the shell all holding). The round's flagship: THE CSP
> FETCH-DIRECTIVE PIN (F-242a, closing the registered F-241h rider —
> its own registration said "land with a source inventory the next
> time the config is touched", and the pass-B inventory delivered
> exactly that: the app consumes ZERO third-party origins — all
> fetches same-origin, all images same-origin (the /api/uploads
> capability URLs + the PWA icons via siteUrl()), no webfonts, inline
> style attributes on the charts — so the pinned form is
> default-src 'self' + style-src 'self' 'unsafe-inline' + img-src
> 'self' + font-src 'self' + connect-src 'self' joining the five
> shipped directives, the dev 'unsafe-eval' branch preserved; the
> exfil/beacon surface closes with zero functional loss, verified by
> the served-header e2e leg + the zero-violation sweep + the
> Export-CSV download canary + the live curl on the standalone — the
> F-235k protocol automated). Plus: the rate-limit battery's cleanup
> sweep fix (F-242b — the sweep was watermark-gated off by the
> earlier crossing leg's ~66-min-ahead watermark while its comment
> claimed "restoring headroom"; now the sweep crosses the pinned
> watermark, asserts its reclaimed count, and proves the fresh key
> earns its OWN bucket back), the parity-240 title recalibration
> (F-242c — the F-240b leg's title still named the retired live-user
> key), the popover docblock truth (F-242d — the "naturally spared"
> over-claim on the outside-pointerdown path, reworded across the
> page + both test echoes), the login-card template-literal
> conversion (F-242e — the only two template-literal class strings in
> src, static constants today but the exact shape the v4 discipline
> prohibits, now the cn() appendage form, byte-identical under
> twMerge), the globals/page-layout comment truths (F-242f — the
> self-contradictory neutral-token pin docblock plus four
> class-shaped comment citations reworded to token form, the safe
> direction for the parity-229 scanner), and the hydration-rationale
> truth (F-242g — the two F-239c suppressions' comments describe a
> server/client divergence the AppShell loading gate precludes; now
> they record the true mechanism + the gate dependency). Registered,
> not cured: the sidebar brand heading order (F-242h — a
> census-visible DOM change, the mobile header's span form is the
> cure if ever taken) and the in-band-delivery production default
> (F-242i Medium — the F-217m owner-decision family with the pass-B
> escalation recorded: the default-on posture escalates to
> account-takeover for a production deploy that ignores the boot
> warning; the flip trades the zero-config self-host demo posture —
> signup unusable without a mail transport — for the hardening, so it
> stays the owner's call). §5 carries the execution history.)
>
"""

OLD_CURRENT_MARK = "> **Current version: v2.38.0** (session 241"
OLD_CURRENT_REPLACEMENT = "> **Previous version: v2.38.0** (session 241"

LEDGER_NEW = """
### 2.2 Session-242 audit ledger (the fresh-eyes round over the v2.38.0 ship state)

Three Mode-C passes (the R-38 cure surfaces · the API/auth/security layer ·
the UI/a11y/shell layer); every material claim re-verified at file:line by
the driving session before planning. NEW findings after dedup (the passes
re-confirmed the documented postures without exception):
0 Critical / 0 High / 1 Medium / 5 Low / 3 Informational.

| ID | Severity | Finding (adjudicated) | Location | Disposition |
|---|---|---|---|---|
| F-242a | Low | **THE CSP FETCH-DIRECTIVE HEADROOM — the registered F-241h rider, now with the source inventory it was waiting for.** The shipped five directives (frame-ancestors, script-src, object-src, base-uri, form-action) leave every fetch directive on the browser's allow-all default: with script-src already carrying 'unsafe-inline' (the Next.js floor), the marginal risk is the exfiltration/beacon surface — an injected script could img-src/connect-src to any origin. The pass-B inventory swept the tree for every external URL, fetch/EventSource/WebSocket, next/script, img/next/image, data:/blob: URIs, @font-face/next/font, @import, and iframes: the app consumes ZERO third-party origins (all store/login/reset fetches same-origin relative paths; the images are the logo, the metadata icons, the og-image, and the /api/uploads capability URLs — all same-origin; no webfonts ship; the charts' inline style attributes need only style-src 'unsafe-inline'; the analytics CSV export is an anchor-click DOWNLOAD, not a fetch — ungoverned by the fetch directives; the one caveat: the PWA manifest builds icon URLs from siteUrl(), so a deployment whose serving origin differs from NEXT_PUBLIC_SITE_URL must fix the env, documented in the pin's comment). The pinned form: `default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; connect-src 'self'` joining the shipped five, the dev-only 'unsafe-eval' branch on script-src preserved (the F-235k live lesson). | `next.config.ts:130-135` | **cured in R-39** (the pin + the served-header e2e leg + the zero-violation sweep + the Export-CSV download canary + the live curl on the standalone) |
| F-242b | Low | **The F-241c battery's cleanup sweep is watermark-gated off — its "restoring headroom" claim is behaviorally false.** The earlier crossing leg pins `sweepWatermark` at ~t+4,000,001 ms (~66 min ahead of wall clock); the battery's closing cleanup calls `sweepRateLimits(Date.now() + 120_000)` which never crosses the watermark, so the gate's O(1) skip returns 0 and reclaims NOTHING — yet the map still holds >10,000 expired fill keys and the comment claims the sweep "reclaims the fill keys... restoring headroom for any later legs". The final `cap-after-sweep` assertion passes only because the fresh key routes to the shared overflow bucket (count 4 ≤ 10) — it proves headroom was NOT restored. No current behavioral impact (the core cardinality assertions are genuine), but a hidden order-coupling trap: any leg appended after this battery inherits a >10k-entry map plus a gated sweep. | `tests/rate-limit.test.ts:327-330` (the cleanup), `:185-195` (the watermark-pinning crossing leg), `src/lib/rate-limit.ts:146` (the gate) | **cured in R-39** (the sweep's now crosses the pinned watermark; the reclaimed count asserted > 0 so a gated no-op fails loudly; the fresh key's own-bucket recovery proven by the remaining-9 assertion) |
| F-242c | Low | **The parity-240 F-240b leg's title still names the retired live-user key.** The R-38 recalibration re-keyed the assertions inside the leg (the era form: `sessionClearSeq === entryClearSeq`) but the it-title still reads "behind the live-user key" — a reader scanning titles gets the wrong contract, the docblock-truth genus the repo's own pins police (the F-240e precedent). | `tests/parity-240.test.ts:154` | **cured in R-39** (the retitle to the clear-era form) |
| F-242d | Informational | **The popover focus-return docblock over-claims the outside-pointerdown path is "naturally spared."** In Chrome/Firefox a pointerdown on non-focusable page space moves focus to `<body>` (the mousedown default), so that close path can also satisfy the `activeElement === body` identity check and fire the focus return (the subsequent mousedown may then move focus again — timing/browser-dependent, not "spared"). The behavior itself is benign-to-desirable; only the exclusion claim is broader than reality. The over-claim echoes in THREE carriers: the page effect + both test comments. | `src/app/(app)/expenses/page.tsx:150-158`, `tests/expenses-popover.test.ts:75-86`, `tests/parity-241.test.ts:334-341` | **cured in R-39** (all three reworded: the toggle path is spared by construction; outside pointerdowns keep whatever focus the mousedown lands on) |
| F-242e | Low | **The only two template-literal class strings in src ride the login card — static constants today, the exact prohibited shape tomorrow.** `className={\\`flex rounded-lg ... ${LOGIN_VERIFY_LAYOUT.codeInput}\\`}` (the OTP boxes) and `className={\\`${LOGIN_LAYOUT.footerLink} font-medium\\`}` (the forgot link) are the only `className` template literals in src (grep-verified). Both interpolate STATIC strings from lib/login-reset.ts + page-layout.ts (inside the @source scan set), so every class extracts today — but the pattern is the exact shape the Tailwind v4 discipline prohibits: a future edit interpolating a runtime value (state, props) would silently emit NO CSS under v4's JIT with no warning. The conversion to the cn() appendage form is byte-identical under twMerge (verified: no conflicting utility groups in either pair — the codeInput's text-center/w-10/h-11/text-base/font-semibold/md-text-sm conflict with nothing in the base string; footerLink carries no font-weight class against font-medium). | `src/components/layout/login-card.tsx:585`, `:808` | **cured in R-39** (both converted to the cn() appendage form, twMerge byte-identity live-verified; the no-template-literal genus pin guards the tree) |
| F-242f | Low | **The globals/page-layout comment truths: a self-contradictory pin docblock + four class-shaped comment citations.** (1) The session-228 neutral-token pin docblock declares `secondary` LIVE ("only the two LIVE members remain — input... and secondary...") then names it RETIRED in the same breath ("The other six (the secondary, accent, muted, popover...)") — a future token-sweep acting on the comment could retire the live token (4 consumers). (2) Four comments cite utilities in class form — the globals prelude token (`text-primary-navy`), the card pair (`text-card-foreground` / `bg-card`), the stock-card citation (`bg-card`), and the nav-overflow citation (`overflow-y-auto`) — the F-224v doctrine exists because v4 content-scans prose; every citation is live TODAY so the parity-229 invariant passes, but if any cited utility is ever retired while its citation survives, the retirement silently no-ops. | `src/app/globals.css:83-96` (the docblock), `:65`, `:75-76`, `src/lib/page-layout.ts:63`, `:182` | **cured in R-39** (the docblock reworded to the actual retired set; the four citations reworded to token/property form — the safe direction, fewer comment carriers) |
| F-242g | Informational | **The two F-239c hydration rationales describe a mismatch the AppShell loading gate precludes.** Both suppressHydrationWarning comments (the analytics date inputs, the PageHeader subtitle carrier) justify the suppression by "a server and client on different calendar dates diverge at the text level" — but AppShell gates children behind `{!hydrated || loading ? <LoadingBlock/> : children}` and the store's initial state is `hydrated: false, loading: true`, so NO page content ever renders during SSR: pages mount only after the client hydrate() resolves, making every page-level render-time clock hydration-safe and the suppressions inert belt-and-suspenders. The cost is documentation accuracy — if the loading gate is ever relaxed (SSR-ing seeded store data), the un-suppressed render-time clocks become live risks and these comments are the only map. | `src/app/(app)/analytics/page.tsx:193-206`, `src/components/shared/page-parts.tsx:32-39` | **cured in R-39** (both reworded to the true mechanism — the loading gate makes them inert, kept as belt-and-suspenders, the gate dependency recorded so a future SSR change re-triggers the review) |
| F-242h | Informational | **The desktop sidebar's brand h2 precedes the page h1 in DOM order.** On desktop the document's first heading is the brand h2; the page's h1 follows inside `<main>` (the mobile header correctly uses a span). Axe's heading-order rule only flags upward skips (h1→h3), so the descent passes every gate; the landmark-scoped brand heading is a defensible reference-parity choice. A DOM change on censused/swept surfaces shifts the standing allowances (the F-236e doctrine), so the cure (a span, matching the mobile header) is not worth the re-derivation for an informational. | `src/components/layout/sidebar.tsx:55` | recorded (the span form if a future round touches the sidebar family; re-derive the interior census allowances same-commit) |
| F-242i | Medium | **The in-band-delivery production default — the F-217m owner-decision family, with the pass-B escalation recorded.** In-app OTP/reset-link delivery is default-ON regardless of NODE_ENV (the knobs `NEO_DISABLE_IN_APP_OTP`/`NEO_DISABLE_IN_APP_RESET` gate it; boot-env warns loudly at production boot). The escalation: for a production deploy that ignores the boot warning, the posture is a working account-takeover vector (POST forgot-password with a known email → read `resetUrl` from the 200 → complete the reset → the F-239b cure clears verification too → full takeover). The flip (default OFF under NODE_ENV=production, opt-in via "0") trades the zero-config self-host demo posture — a self-hoster without a mail transport gets NO code delivery, signup unusable — for the hardening. The e2e battery would also need its env pins changed (it pins the empty string, i.e. enabled, and its signup/reset legs read the in-band payloads). This is a product decision, not a pure security hardening; it stays the owner's call. | `src/app/api/auth/{signup,forgot-password,resend}/route.ts`, `src/lib/boot-env.ts:103-110`, `playwright.config.ts:87-88` | recorded (the F-217m family; the escalation + the flip's blast radius documented — the owner's explicit ask flips it) |

"""

F241H_OLD = "| `next.config.ts:130-135` | recorded (the hardening headroom; land with a source inventory the next time the config is touched) |"
F241H_NEW = "| `next.config.ts:130-135` | **cured in R-39** (F-242a — the session-242 pass-B inventory delivered the source inventory; the pin landed) |"

R39_SECTION = """\
### R-39 — The CSP-inventory pin, test-hygiene, and carrier-truth round (session 242) — Status: Done(v2.39.0)

The session-242 findings-led round over the v2.38.0 ship state. Seven cures
(F-242a-g), two registrations (F-242h-i), the F-241h rider closed.

1. **R-39.1 — the pins born RED**: tests/parity-242.test.ts (the source
   battery: the CSP directive set + the dev branch preserved + the
   manifest-icon caveat comment; the login-card cn() conversion + the
   no-template-literal genus guard; the rate-limit cleanup's crossing form;
   the parity-240 retitle; the popover docblock truth across all three
   carriers; the globals docblock + citation rewords; the
   hydration-rationale truths); tests/http-headers.test.ts + parity-235
   recalibrations (the new directive string); the e2e additions (the
   served-header leg RED against the pre-cure standalone; the
   zero-violation sweep + the Export-CSV download canary green at birth
   as the coverage legs).
2. **R-39.2 — the cures**:
   - **F-242a**: THE CSP FETCH-DIRECTIVE PIN — `default-src 'self'`,
     `style-src 'self' 'unsafe-inline'`, `img-src 'self'`,
     `font-src 'self'`, `connect-src 'self'` join the shipped five in
     next.config.ts; the dev 'unsafe-eval' branch preserved; the comment
     carries the inventory (zero third-party origins; the manifest-icon
     siteUrl caveat; the CSV-download note). The http-headers +
     parity-235 pins recalibrated same-commit.
   - **F-242b**: the rate-limit battery's cleanup sweep crosses the
     pinned watermark (now ≈ +5,000,000 ms), asserts its reclaimed
     count > 0, and proves the fresh key earns its OWN bucket (remaining
     9 — the shared overflow would answer differently).
   - **F-242c**: the parity-240 F-240b leg retitled to the clear-era form.
   - **F-242d**: the popover docblock truth — the toggle path spared by
     construction; outside pointerdowns keep whatever focus the
     mousedown lands on (three carriers reworded).
   - **F-242e**: the two login-card template-literal class strings →
     the cn() appendage form (twMerge byte-identity live-verified).
   - **F-242f**: the neutral-token pin docblock's retired set corrected;
     the four class-shaped citations reworded to token/property form.
   - **F-242g**: the two F-239c rationales reworded to the true
     mechanism (the loading gate; belt-and-suspenders; the gate
     dependency recorded).
3. **R-39.3 — the verification**: lint 0/0 · tsc 0 · the full unit suite
   (the new pins counted) · build · smoke 15/15 · the e2e battery (the
   three new legs counted) · the six parity drift gates (the cn()
   conversion computed-identical, the comment rewords prose-only, the
   CSP a header change invisible to the DOM gates) · census MATCH ·
   `bun audit` unchanged · the live curl of the served header on the
   standalone (the F-235k protocol) · the captures under
   docs/screenshots/.

"""

R38_ANCHOR = "### R-38 — The clear-era, creation-path, and seam-completion round (session 241) — Status: Done(v2.38.0)"

EXEC_ROW_NEW = "| v2.39.0 | 242 | **R-39** (the CSP-inventory, test-hygiene, and carrier-truth round — findings-led, the standing directive with the reference STABLE on all standing drift layers and the TRUE-390 mobile menu re-verified by probe:ref; the cold baseline GREEN at HEAD 1b038d7 — the v2.38.0 ship state reproduced exactly, no discovery). The audit round first: the standing layers re-verified (probe:ref STABLE; `bun audit` unchanged; neo-crm unchanged (b3d0fbe); the SEO surface green (smoke leg 12); the .env contract, the vitest/playwright configs, the .env.example standing). The session-242 fresh-eyes audit (three Mode-C passes: the R-38 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 0 High / 1 Medium / 5 Low / 3 Informational NEW after dedup, every material claim re-verified at file:line by the driving session; all seven R-38 cure surfaces verified holding). The plan v2.39.0 written (the F-242a-i ledger + the R-39 section) and validated against the tree. **R-39.1** the pins born RED → **R-39.2** the cures (THE CSP FETCH-DIRECTIVE PIN — the F-241h rider closed with the pass-B source inventory; THE RATE-LIMIT CLEANUP FIX; THE PARITY-240 RETITLE; THE POPOVER DOCBLOCK TRUTH; THE LOGIN-CARD CONVERSION; THE GLOBALS/PAGE-LAYOUT COMMENT TRUTHS; THE HYDRATION-RATIONALE TRUTH) → **R-39.3** the verification (the full gate + the six drift gates + census + the captures + the docs lockstep) | lint 0/0 · tsc 0 · **(the new pin count) unit ((the new file count) files)** · build · smoke 15/15 · **(the new e2e count) e2e** · six drift gates CLEAN · census MATCH | (this session's execution commit) |\n"

TAIL_OLD = """> revocation-signal round (R-37) at v2.37.0, and the session-241
> clear-era round (R-38) at v2.38.0"""
TAIL_NEW = """> revocation-signal round (R-37) at v2.37.0, the session-241
> clear-era round (R-38) at v2.38.0, and the session-242
> CSP-inventory round (R-39) at v2.39.0"""


def main() -> None:
    text = PLAN.read_text()
    # 1. The header: insert the new Current above the old, retitle old → Previous.
    assert text.count(OLD_CURRENT_MARK) == 1, "old current-version mark not unique"
    text = text.replace(OLD_CURRENT_MARK, HEADER_NEW + OLD_CURRENT_REPLACEMENT, 1)

    # 2. The F-241h disposition: the rider is closed by this round.
    assert text.count(F241H_OLD) == 1, "F-241h disposition row not unique"
    text = text.replace(F241H_OLD, F241H_NEW, 1)

    # 3. The session-242 audit ledger: after the F-241i row, before §3.
    anchor = "\n## 3. The remediation program (R-items)"
    assert text.count(anchor) == 1, "§3 anchor not unique"
    text = text.replace(anchor, "\n" + LEDGER_NEW + "## 3. The remediation program (R-items)", 1)

    # 4. The R-39 section: above R-38's.
    assert text.count(R38_ANCHOR) == 1, "R-38 anchor not unique"
    text = text.replace(R38_ANCHOR, R39_SECTION + R38_ANCHOR, 1)

    # 5. The §5 execution row: below the table header.
    exec_anchor = "| v2.38.0 | 241 |"
    assert text.count(exec_anchor) == 1, "v2.38.0 execution row not unique"
    text = text.replace(exec_anchor, EXEC_ROW_NEW + "| v2.38.0 | 241 |", 1)

    # 6. The tail note: extend the running list.
    assert text.count(TAIL_OLD) == 1, "tail-note anchor not unique"
    text = text.replace(TAIL_OLD, TAIL_NEW, 1)

    PLAN.write_text(text)

    # Re-verify every insertion.
    out = PLAN.read_text()
    assert "> **Current version: v2.39.0** (session 242" in out
    assert "> **Previous version: v2.38.0** (session 241" in out
    assert "### 2.2 Session-242 audit ledger" in out
    assert "| F-242a | Low |" in out and "| F-242i | Medium |" in out
    assert F241H_NEW in out
    assert "### R-39 — The CSP-inventory pin" in out
    assert "| v2.39.0 | 242 |" in out
    assert TAIL_NEW in out
    print("plan v2.39.0 written — all insertions verified")


if __name__ == "__main__":
    main()
