# WealthOS Remediation Plan — v2

> The living, versioned remediation program for this repo. This file is the
> single source of truth for: what the audits found, what is being fixed, in
> what order, by which iteration session, and with what verification. It
> replaces the session-203 placeholder (a one-line dummy committed by the
> owner with the directive *"create validated remediation plan with versioning
> for each iteration session"* — this document is that plan).
>
> **Current version: v2.33.0** (session 236 — the empty-put,
> transient-503, and revocation-face round R-33: the owner's
> standing directive — refresh → review → validate → audit →
> parity iteration → remediation plan → TDD execution →
> captures → docs lockstep → commit → push, with the reference
> STABLE on all standing drift layers and the TRUE-390 mobile
> menu re-verified this session; the cold-baseline gate GREEN
> at HEAD — no discovery this round, the v2.32.0 ship state
> reproduced exactly). The session-236 fresh-eyes audit (three
> Mode-C passes: the R-32 cure surfaces driven by the session,
> the API/auth/security layer, and the UI/a11y/shell layer —
> 0 Critical / 0 High / 1 Medium / 8 Low / 11 Informational
> raw after dedup, every material claim re-verified at
> file:line by the driving session; R-32's fourteen pinned
> cures all verified holding — the effect-keyed greeting
> seed, the gate-before-verify order, the reset transient
> arm, the async scrypt, the six functional busy clears, the
> padded close, the four emoji wraps, the named tablists, the
> KPI decoupling, the guest-wall status face, the additive
> CSP, the users arm, the retired transition, and the three
> progressbar roles each re-checked at their cure sites).
> The round cures: THE EMPTY-PUT 400 (F-236a — an all-fields-
> optional update body of `{}` parses, the five `[id]` PUTs
> build an empty data object, and Prisma short-circuits
> `updateMany({ data: {} })` to count 0 WITHOUT executing a
> query — a legitimate no-change PUT answered 404 for an
> existing, owned record, indistinguishable from the vanished
> row the arm exists for; the no-fields refine on the five
> update schemas answers the honest 400 through the existing
> parseBody machinery); THE TRANSIENT-503 FAMILY COMPLETION
> (F-236b — the P2024/P2028 → 503 arm existed on only the
> three auth/reset routes; the sessioned CRUD family answered
> the generic 500 with retry advice for a transient server
> condition; a shared `isTransientDbError` helper joins
> `isRecordNotFound`/`isForeignKeyViolation` in `src/lib/db`
> and `ERR.UNAVAILABLE()` joins the envelope family, applied
> across every DB-touching catch arm); THE FIELD-CLEAR
> NORMALIZATION (F-236c — the clear contract was asymmetric:
> `""` cleared the F-219q string family but 400'd every
> nullable date, and the create twins rejected the `null` the
> update twins accept; the clearable-date seam normalizes
> both forms on both twins, color/icon join the nullable
> contract); the toast-dismiss hit area (F-236d — the 22px
> target under the 24px floor joins the DIALOG_CLOSE family);
> the dashboard glyph wrap (F-236e); THE MID-FLIGHT
> REVOCATION FACE (F-236f — a session revoked between the
> server layout's pass and the client hydrate's 401 rendered
> an empty workspace with a stale sidebar and no explanation;
> the shell's post-hydrate null-user gate now renders the
> guest-wall face — the login wall is re-established client-
> side); the stale F-218a comment (F-236g — falsified by the
> F-235b reorder); the parity-235 timer pins (F-236h); the
> goals progressbar precision (F-236i); the dead-arm register
> (F-236j); the PAD retrospective forms (F-236k). Adjudicated
> and recorded, not cured: the SSR/hydration date stability
> (F-236l — the cure's blast radius spans the flagship page's
> whole now-derived render tree for a recoverable
> console-noise class), the pagination posture (F-236m), the
> first-admin race (F-236n), the CSP breadth (F-236o), the
> upload magic bytes (F-236p), the dialog glyph shift
> (F-236q), the informational tail (F-236r). §5 carries the
> execution history.)
>
> **Previous version: v2.32.0** (session 235 — the oracle-reorder,
> async-scrypt, and live-region-seed round R-32: the owner's
> standing directive — refresh → review → validate → audit →
> parity iteration → remediation plan → TDD execution →
> captures → docs lockstep → commit → push, with the reference
> STABLE on all standing drift layers and the TRUE-390 mobile
> menu re-verified this session; the cold-baseline gate GREEN
> at HEAD — no discovery this round, the v2.31.0 ship state
> reproduced exactly). The session-235 fresh-eyes audit (three
> Mode-C passes: the R-31 cure surfaces driven by the session,
> the API/auth/security layer, and the UI/a11y/shell layer —
> 0 Critical / 0 High / 1 Medium / 9 Low / 5 Informational
> raw, every material claim re-verified at file:line by the
> driving session; R-31's nine pinned cures all verified
> holding — the settled flag in both arms, the parse token +
> the in-flight flag, the full-length restart rule, the paste
> e2e leg, the capacity-walk guard, the busy rider, the
> gate-first logout, the glyph wrap, and the dead-export
> retirements each re-checked at their cure sites). The round
> cures: THE AI-COACH GREETING LIVE-REGION SEED (F-235a — the
> greeting seeds DURING RENDER, so the polite live region
> (inside DialogContent, unmounted while closed) ARRIVES with
> the greeting already in it — per the repo's own F-218h
> doctrine a live region that arrives with its content is
> never announced; SR users got silence on the flagship AI
> surface's opening message; the seed moves to an effect keyed
> on open — the region mounts empty, the greeting lands as a
> content change and is announced); THE LOGIN VERIFICATION
> ORACLE REORDER (F-235b — the password was verified BEFORE
> the unverified-account gate, so a correct password answered
> 403 VERIFICATION_REQUIRED while a wrong one answered 401 —
> a password-confirmation oracle on every never-verified
> account; the gate moves above the verify with the equalizer
> burned on its branch: both arms 403, every branch still
> burns exactly one scrypt); THE RESET HONEST-FAILURE ARM
> (F-235c — the app's biggest transaction mapped every
> failure to the generic 500; the P2024/P2028 → 503 arm the
> sibling auth routes already carry); THE ASYNC-SCRYPT SEAM
> (F-235d — scryptSync blocks the single-threaded server
> ~28 ms per auth request: an unauthenticated availability
> amplifier under the default direct-exposure posture; the
> pure seam promisifies crypto.scrypt, every call site was
> already async, the stored format byte-identical); the busy
> guards' functional clears (F-235e — a completing row
> re-enabled a sibling's in-flight button at six single-slot
> sites); the dialog-close hit area (F-235f); the emoji
> aria-hidden wraps in the Select options (F-235g — the
> quick-select chips' own pattern, four sites, DOM-inert on
> every captured face); the tablist naming (F-235h); the
> Expenses KPI glyph decoupling (F-235i — the glyph now agrees
> with the signed number while the tone keeps the good/bad
> channel); the guest-wall status face (F-235j — no more blank
> flash); the low tail (F-235k the additive CSP hardening,
> F-235l the users-PATCH record-not-found arm, F-235m the
> dead HealthGauge transition retirement, F-235n the
> progressbar roles). Adjudicated and recorded, not cured:
> the coach's user-message echo into the live region doubles
> as the SR send-confirmation — deliberate. §5 carries the
> execution history.)
>
> **Previous version: v2.31.0** (session 234 — the in-flight-guard,
> OTP-restart, and logout-gate round R-31: the owner's
> standing directive — refresh → review → validate → audit →
> parity iteration → remediation plan → TDD execution →
> captures → docs lockstep → commit → push, with the reference
> STABLE on all standing drift layers and the TRUE-390 mobile
> menu re-verified this session; the cold-baseline gate GREEN
> at HEAD — no discovery this round, the v2.30.0 ship state
> reproduced exactly). The session-234 fresh-eyes audit (three
> Mode-C passes: the R-30 cure surfaces driven by the session,
> the API/auth/security layer, and the UI/a11y/shell layer —
> 0 Critical / 0 High / 0 Medium / 6 Low / 8 Informational
> raw, every material claim re-verified at file:line by the
> driving session; R-30's nine pinned cures all verified
> holding — the seam, the delegation, the dependency
> retirement, the live region, the save guard, the retry
> affordance, the URL strip, the unlink isolation, and the
> suspense boundaries each re-checked at their cure sites).
> The round cures: THE SETTINGS-FETCH TRI-STATE (F-234a — the
> amber could-not-load guard rendered on every hard load
> under real latency: hydrate commits its loading drop BEFORE
> the settings await, so the guard read the in-flight window
> as failure; the store gains a settled flag flipped in BOTH
> arms of the settings fetch and reset on hydrate/logout,
> and the page's reason line keys on it — the flash is gone,
> the failure face unchanged); THE IMPORT PARSE SEQUENCE
> GUARD (F-234b — the file pick had no staleness protection:
> a re-pick mid-parse let the slower extract's state land last
> (a wrong-review-committed path), and the extract button sat
> enabled inside the parse window (the redundant re-parse the
> F-233e round retired, reachable again in-flight); the page
> gains the monotonic parse-sequence token — the store's own
> refresh-genus, page-local — plus an in-flight flag joining
> the button's disabled set); THE FULL-CODE PASTE RESTART
> (F-234c — a whole-code edit landing in a LATER box
> distributed from the edited box, so the type-then-paste
> flow submitted a ROTATED code that passed the length guard
> and burned an attempt — the fails-safe-to-fails-dangerous
> residue of the F-233a cure; an exactly-full-length edit now
> restarts at box 1, partial pastes keep the from-edited-box
> semantics every existing pin holds); THE OTP PASTE E2E LEG
> (F-234d — the paste/autofill path had no browser-level pin
> (the R-30 headline was covered only by pure units and
> source scans); the signup-ladder leg extends with the
> whole-code delivery into a later box — the autofill event
> shape at the change layer — asserting the distributed
> boxes, the final-box focus, and the signed-in landing,
> riding the leg's EXISTING signup so the battery's IP
> budget is untouched); THE UPLOADS CAPACITY-WALK GUARD
> (F-234e — the per-entry size read was unguarded: a file
> vanishing between the directory read and the size read
> threw past the envelope at the pre-write call site (a raw
> non-JSON 500) and skipped the breach-unlink at the
> post-write one; vanished entries now skip the counters);
> THE BUDGET-ADD BUSY GUARD (F-234f — the settings page's
> budget Add button was the mutation family's last unguarded
> trigger: a double-click fired two POSTs and twin toasts
> over an idempotent upsert; the busy rider mirrors the
> sibling delete control four lines up); THE LOGOUT GATE
> REORDER (F-234g — the route burned a slot of the SHARED
> writes bucket before the content-type gate, the pre-parse
> burn genus's seventh surface with broader scope — a
> cross-site plain-text volley could 429 the victim's every
> sessioned mutation for the window; the gate moves above
> the bucket: logout reads no body and owns no brute-force
> surface, the gate is its CSRF defense); the low tail
> (F-234h the investments row-delete glyph joins its
> screen-reader label under the aria-hidden convention;
> F-234i the gradient KPI card's cascade-dead ink token
> retires from its class string — a live-source carrier of
> the dead-utility genus the content scan cannot see; F-234j
> the dead-export retirement — the expenses dialog's and the
> theme resolver's export keywords, zero importers each;
> F-234k the two e2e comments re-attributed to the live
> region the locators actually match). Recorded, not cured:
> F-234l (the verify success write is unconditional — a
> racing resend's fresh code can be wiped by a verify landing
> on the old one; benign, self-healing, the conditional form
> rides the next touch of the route), F-234m (the
> un-memoized-derivation genus extends beyond the Dashboard —
> folds into the recorded derivation finding), F-234n (the
> footer copyright's hardcoded year — parity-constrained).
> §5 carries the execution history.)
>
> **Previous version: v2.30.0** (session 233 — the OTP-paste,
> live-region, and dependency-hygiene round R-30: the owner's
> standing directive — refresh → review → validate → audit →
> parity iteration → remediation plan → TDD execution →
> captures → docs lockstep → commit → push, with the reference
> STABLE on all standing drift layers and the TRUE-390 mobile
> menu re-verified this session; the cold-baseline gate GREEN
> at HEAD — no discovery this round, the v2.29.0 ship state
> reproduced exactly). The session-233 fresh-eyes audit (three
> Mode-C passes: the R-29 cure surfaces driven by the session,
> the API/auth/security layer, and the UI/a11y/shell layer —
> 0 Critical / 0 High / 1 Medium / 5 Low / 10 Informational
> raw, every material claim re-verified at file:line by the
> driving session; R-29's nine pinned cures all verified
> holding — the F-232c value guard StrictMode-idempotent, the
> dead-stock retirement intact with zero surviving imports, the
> carrier net whole, the z-layer and token systems airtight;
> ONE location attribution in the driving brief corrected
> against the plan's own row — the F-232h revoke deferral
> lives in the analytics page, not the format seam). The round
> cures: THE OTP PASTE/AUTOFILL DISTRIBUTION (F-233a — the
> six-box code entry kept only the last digit of a multi-digit
> input, so the one-time-code autofill and every paste of the
> full code collapsed to a single digit and the length guard
> blocked submission — the primary verification entry path
> degraded for paste and password-manager users; the pure
> applyCodeInput seam in the verification lib distributes
> multi-digit edits across the boxes and lands focus after the
> last filled one, single-digit typing and the backspace walk
> byte-identical); THE ORPHANED LABEL-PRIMITIVE DEPENDENCY
> RETIREMENT (F-233b — the F-232a file deletion left
> @radix-ui/react-label riding the manifest with zero
> importers, the dependency edition of the dead-stock genus,
> retired with the N-62a pin form); THE LOGIN INFO-CALLOUT
> LIVE REGION (F-233c — the resend confirmation banner mounted
> its status role with its content, the F-218h genus on the
> last uncurated surface; the region now pre-exists in the
> verify view, empty when idle, the callout is the visual
> only); THE SETTINGS SAVE GUARD (F-233d — a silently failed
> settings fetch left the form offering hard-coded defaults a
> Save would persist over stored preferences; Save disables
> and the card states the reason while the slice is missing);
> THE IMPORT DOUBLE-PARSE RETIREMENT (F-233e — the extract
> button re-parsed an already-parsed file on every
> flow-through; the button is the retry affordance now,
> disabled once the review stands); THE RESET-TOKEN URL STRIP
> (F-233f — the one-time token rode the address bar for its
> 60-minute life; the screen captures it once and strips the
> query, the standard one-time-credential hygiene); THE UPLOAD
> BREACH-UNLINK ISOLATION (F-233g — a failing unlink on the
> TOCTOU breach path answered 500 instead of the honest 507);
> THE AUTH-FACE SUSPENSE BOUNDARIES (F-233h — login/signup
> gain the boundary their reset-password twin already carries,
> defusing the force-dynamic coupling); the low tail (F-233i
> the F-232j count correction fifteen→fourteen; F-233j the
> amber-arm comment scope; F-233k the select.tsx checkbox
> narration). Recorded, not cured: F-233l (the pre-parse
> rate-bucket burn — the correct anti-brute-force order, the
> bucket-lockout trade's third face), F-233m (the data-reset
> posture — no UI consumer, an e2e/operator utility adding no
> capability a session-holder lacks), F-233n (the theme
> pathname effect's one-paint residual — the documented
> design), F-233o (the audit-brief attribution record). §5
> carries the execution history.)
>
> **Previous version: v2.29.0** (session 232 — the dead-stock
> retirement, carrier-net repair, and dialog-focus round R-29: the
> owner's standing directive — refresh → review → validate → audit →
> parity iteration → remediation plan → TDD execution → captures →
> docs lockstep → commit → push, with the reference STABLE on all
> standing drift layers and the TRUE-390 mobile menu re-verified
> this session; the cold-baseline gate GREEN at HEAD — no discovery
> this round, the v2.28.0 ship state reproduced exactly). The
> session-232 fresh-eyes audit (three Mode-C passes: the R-28 cure
> surfaces driven by the session, the API/auth/security layer, and
> the UI/a11y/shell layer — 0 Critical / 0 High / 0 Medium /
> 13 Low / 9 Informational raw, every material claim re-verified at
> file:line by the driving session; R-28's twelve pinned cures all
> verified holding — the F-231b value-comparison guards are
> StrictMode-idempotent across every view swap, the F-231h
> retirement family intact, no new carriers, no aria-hidden misuse,
> no layer-map violations). The round cures: THE VENDORED
> DEAD-STOCK RETIREMENT (F-232a — card.tsx, table.tsx, label.tsx,
> input.tsx: four zero-consumer shadcn-stock files with no KEEP
> register entry, retiring per the F-231h Avatar precedent, with
> their page-layout riders INPUT_BASE + DIALOG_TEXTAREA + CHECKBOX
> whose last consumers were the dead files; the surviving
> input.tsx Event/Activity citation retires with its file); THE
> CARRIER-NET REPAIR (F-232b — the tabs.tsx border-primary citation
> reworded per F-229d AND the parity-229 PROSE_ALLOWLIST compound
> entry that hid the dead utility REMOVED — the allowlist is not a
> carrier sanctuary; the globals.css danger-soft hover citation
> reworded to prose); THE EXPENSES DIALOG STEP-SWAP FOCUS (F-232c —
> the F-231b genus on the dialog surface: quick→form lands focus on
> the description input, form→quick lands on the Quick Select
> heading, value-guarded, plus the e2e leg); THE HAMBURGER
> ARIA-CONTROLS (F-232d — id on the drawer + aria-controls on the
> trigger, the expenses-filters precedent); THE ALWAYS-MOUNTED
> LOADING LIVE REGION (F-232e — the F-218h genus: the region
> pre-exists outside main, empty when idle, the label swaps in);
> THE STALE AMBER ARM RETIREMENT (F-232f — the bg-amber-500 axe
> sanction arm retires per F-220p: every live amber fill carries
> stone-900 ink since F-219a); THE UPLOAD CAPACITY POST-WRITE
> RE-CHECK (F-232g — the TOCTOU cure: re-read after the write,
> unlink + STORAGE_FULL on breach); the low tail (F-232h the
> CURRENCIES import, the BrandMark compact arm, the
> SHELL_LAYOUT.sidebar consumption + the icon/bare member
> retirements, the exportCsv revoke defer); THE LINE-STRONG
> REGISTRATION (F-232i — the token joins the F-224t reserved
> register with its citation). Recorded, not cured: F-232j (the
> whole-store subscription idiom — 15 sites, a dedicated round),
> F-232k (the import commit replay guard), F-232l (the first-admin
> count race — role is inert), F-232m (the CSP posture — documented
> deliberate), F-232n (the login-card logo narration), F-232o (the
> between-footer comment refresh). §5 carries the execution
> history.)
>
> **Previous version: v2.28.0** (session 231 — the a11y-tail,
> logging-grain, and dead-family round R-28: the owner's
> standing directive — refresh → review → validate → audit →
> parity iteration → remediation plan → TDD execution →
> captures → docs lockstep → commit → push, with the reference
> STABLE on all standing drift layers and the TRUE-390 mobile
> menu re-verified this session; the cold-baseline gate GREEN
> at HEAD — no discovery this round, the v2.27.0 ship state
> reproduced exactly). The session-231 fresh-eyes audit (three
> Mode-C passes: the R-27 cure surfaces driven by the session,
> the API/auth/security layer, and the UI/a11y/shell layer —
> 0 Critical / 0 High / 0 Medium / 8 Low / 12 Informational
> raw, every material claim re-verified at file:line by the
> driving session, ONE claim adjudicated by live reference
> probes plus a bundle grep — the Analytics "Spending by Day
> of Week" card is OUR OWN SUPERSET (probe-231/b/c walked the
> reference's four Analytics tabs at its standing zero demo
> data: no day-of-week card on any tab, and the reference's
> JS bundle carries no such string — the amber fill was never
> reference parity but our own palette mis-assignment, spending
> riding the Net-Savings hue); the two Pass-B "Lows" were
> adjudicated as AUDIT-BRIEF CONTRACT-TEXT ERRORS (the uploads
> GET is public-by-design capability-URL serving per its own
> docblock + the recorded F-225i/F-217g posture, and
> forgot-password is 10/15 per the F-222n ledger — the code
> matches the repo's documented contracts; the brief misstated
> both). The round cures: THE EXPENSES DIALOG DECORATIVE-GLYPH
> HIDING (F-231a — the amber "$" tile in the Add/Edit Expense
> title carried no aria-hidden, the one F-225k-family miss;
> screen readers announced "dollar sign Add Expense"); THE
> AUTH-CARD VIEW-SWAP FOCUS MANAGEMENT (F-231b — four of five
> in-place view transitions dropped focus to body with no
> announcement; the verify view's box-1 focus proved the
> pattern in-tree; every transition now lands focus on the new
> view's heading, mount-guarded so the initial page load keeps
> natural focus); THE DEAD DROPDOWNCONTENT Z-PIN (F-231c — the
> vendored Popover family's content pinned the skip-link's
> z-60 layer instead of the menu family's z-50; re-pinned to
> the flat scale); THE ICONS.TSX RETIREMENT (F-231d —
> FilterPolygon, a CRM-era hand-rolled glyph with zero
> consumers and a "Used by the dashboard Filter, leads Filters
> and contacts Filters" citation naming surfaces that do not
> exist in WealthOS; the file retires per the F-229f re-entry
> rule and the N-89c6 lucide-injection note relocates to the
> KpiCard delta icons it documents); THE DAY-OF-WEEK FILL
> (F-231e — the bar rides CHART_COLORS.expenses now, the
> palette doctrine's own spending hue; the sweep baselines are
> zero-data so the change is drift-inert by construction); THE
> UPLOAD MULTIPART LOG (F-231f — the formData catch swallowed
> the parse error, the one F-226c-genus site outside the
> logging retrofit; it logs before the 400 now); THE UPLOADS
> GET ENOENT GATE (F-231g — a 404 on a capability URL is the
> normal miss, not a server fault; ENOENT stays out of the
> error log, real I/O failures still log); THE CRM-ERA
> DEAD-FAMILY RETIREMENT (F-231h — DialogFooterWide +
> DIALOG_FOOTER_WIDE + DIALOG_CONTENT.wide + the Avatar family
> retire: five zero-consumer CRM-era constructs in live files,
> and the two "Event/Activity dialogs" citations reworded to
> the truth; the shadcn-stock arms stay per the F-227f
> register); the low tail (F-231i the TrendingDown explicit
> aria-hidden symmetry; F-231j the expenses memo defeat; F-231k
> the vestigial peer class; F-231l the trailing docblock rot).
> Recorded, not cured: F-231m (the button dead stock
> variants/sizes + the Dialog primitive re-exports — the
> N-56e/F-227f register doctrine), F-231n (the expenses filters
> popover focus-out — the reference's own genus), F-231o (the
> Checkbox onClick clobber — dead stock, latent), F-231p (the
> seed's one-shot PrismaClient letter), F-231q (the
> create/update null asymmetry), F-231r (the unbounded
> aggregate reads — the standing architecture), F-231s (the
> audit-brief contract-text errors, recorded so the next brief
> quotes the repo contracts verbatim). §5 carries the execution
> history.)
>
> **Previous version: v2.27.0** (session 230 — the register
> and hygiene round R-27: the owner's standing directive —
> refresh → review → validate → audit → parity iteration →
> remediation plan → TDD execution → captures → docs lockstep →
> commit → push, with the reference STABLE on all standing drift
> layers and the TRUE-390 mobile menu re-verified this session;
> the cold-baseline gate GREEN at HEAD — no discovery this
> round, the v2.26.0 ship state reproduced exactly). The
> session-230 fresh-eyes audit (three Mode-C passes: the R-26
> cure surfaces driven by the session, the API/auth/security
> layer, and the UI/a11y/shell layer — 0 Critical / 0 High /
> 2 Medium / 4 Low / 5 Informational raw, every material claim
> re-verified at file:line, TWO claims adjudicated by live
> reference probes — the StatCard genus CONFIRMED (the register
> is the cure, never a recolor) and the Cash Flow zero-data
> claim INVERTED (the reference renders its chart
> unconditionally at zero data; our render IS the genus)). The
> round cures: THE STATCARD REGISTER ENTRY (F-230a — the
> analytics Avg Monthly tiles' sub-AA ink arms join the F-224y
> WCAG exemption register at their own surface, all three arms
> measured (2.24:1 / 3.08:1 / 3.01:1 labels; the white
> text-2xl values 2.54:1 at the emerald-500 side, passing on
> the 600 side), the genus re-confirmed live on the reference's
> own tiles); THE LASTSYNCEDAT TODATE TIDY (F-230c — the last
> raw new Date() at a display seam routes through toDate, the
> F-227m behavior-identical precedent); THE PHANTOM-BREAKPOINT
> COMMENT REWORDS (F-230d — the two sites quoting the retired
> phantom-xs construction reworded to prose, the F-229d
> discipline); THE AI-COACH MESSAGE-ID KEYS (F-230e — the
> append-only list keys by a minted id, future-proofing the
> retry-replaces-a-message class; the import preview and OTP
> boxes documented as index-identity by design); the
> CARD_TITLE_OVERRIDE docblock truth (F-230f). Recorded, not
> cured: F-230b (the inverted Cash Flow adjudication), F-230g
> (the pre-auth fetch standing), F-230h (the clean-surface
> confirmations + the recorded-tail re-derivations). §5
> carries the execution history.)
>

>
> **Previous version: v2.26.0** (session 229 — the empty-state
> repair and dead-carrier retirement round R-26: the owner's
> standing directive — refresh → review → validate → audit →
> parity iteration → remediation plan → TDD execution →
> captures → docs lockstep → commit → push, with the reference
> STABLE on all standing drift layers and the TRUE-390 mobile
> menu re-verified this session; the cold-baseline gate GREEN
> at HEAD — no discovery this round, the v2.25.0 ship state
> reproduced exactly). The session-229 fresh-eyes audit (three
> Mode-C passes: the R-25 cure surfaces driven by the session,
> the API/auth/security layer, and the UI/a11y/shell layer —
> 0 Critical / 0 High / 1 Medium / 6 Low / 5 Informational raw,
> every material claim re-verified at file:line, two claims
> ADJUDICATED INVERTED by live reference
> probes). The round cures: THE INCOME-TAB EMPTY-STATE REPAIR
> (F-229a Medium — the F-219r gate's birth defect: categoryTrend
> unconditionally returns one point per month, so the Income tab's
> length===0 gate NEVER fired and a zero-income viewer saw a flat
> all-zero chart instead of the intended empty state; the gate now
> rides an income-presence predicate, e2e-proven on a scratch
> user); THE BUDGETS P2002 RACE ARM (F-229b — the one unique-keyed
> mutation surface missing the settings family's concurrent-create
> arm); THE SEED UTC-MIDNIGHT STAGING (F-229c — the seed was the
> sole writer of local-noon calendar instants, shifting every
> seeded date a day for viewers 12h+ ahead of the seeding server);
> THE DEAD-CARRIER RETIREMENT (F-229d — the F-228b residue: THIRTY
> comment-only class-shaped tokens emit dead utilities, the fixed
> carrier list the R-25 pin shipped caught none of them; ~28
> comment sites reworded across 16 files, a whole-tree carrier
> invariant joins the pins, the CSS sentinel-probed); THE DIALOG
> DOCBLOCK TRUTH (F-229e — the S15-P3 "centers below sm" claim
> live-probed FALSE: the reference's own dialog title is
> left-aligned at 390); THE DEAD-API RETIREMENT (F-229f — the
> presetCategory prop, two constant maps, five format helpers, the
> empty nav array, and the pill Tabs variant + cols + GRID_COLS,
> all zero-consumer); the low tail (F-229h the search Postgres-path
> note, F-229j the hygiene tail). §5 carries the execution history.)
>
> **Previous version: v2.25.0** (session 228 — the second holdings
> surface and hygiene round R-25: the owner's standing directive —
> refresh → review → validate → audit → parity iteration →
> remediation plan → TDD execution → captures → docs lockstep →
> commit → push, with the reference STABLE on all standing drift
> layers and the TRUE-390 mobile menu re-verified this session; the
> cold-baseline gate GREEN at HEAD — no discovery this round, the
> v2.24.0 ship state reproduced exactly). The session-228 fresh-eyes
> audit (three parallel Mode-C passes: the R-24 cure surfaces, the
> API/auth/security layer, and the UI/a11y/shell layer —
> 0 Critical / 0 High / 0 Medium / 7 Low / 10 Informational raw,
> every material claim re-verified at file:line by the driving
> session). The round cures: THE SECOND HOLDINGS SURFACE (F-228a —
> the Analytics Holdings Performance chart still keyed by SYMBOL,
> the F-227b genus surviving in its last surface; a per-symbol gain
> fold joins the finance seams and the chart renders one bar per
> symbol); THE TIMING-EQUALIZER FAMILY COMPLETION (F-228e — verify/
> resend leak pending-state through scrypt latency on their miss
> branches; both now burn the equalizer, the login S72-C pattern);
> THE UPLOAD CAPACITY CEILING (F-228f — the write-only uploads
> surface grows unbounded over time; a 256 MB / 4096-file ceiling
> answers 507 STORAGE_FULL, the owner-tag design recorded); THE
> SCHEMA ROUND (F-228g + F-227h — @@index([accountId]) on
> Transaction backs the SetNull cascade, @@index([resetToken]) on
> User lands the recorded next-schema-round item); the low tail
> (F-228b/c/d + F-228h–l). §5 carries the execution history.)
>
> **Previous version: v2.24.0** (session 227 — the build-gate repair
> and wrong-row identity round R-24: the owner's standing directive —
> refresh → review → validate → audit → parity iteration →
> remediation plan → TDD execution → captures → docs lockstep →
> commit → push, with the reference STABLE on all four standing drift
> layers and the TRUE-390 mobile menu re-verified this session). The
> session-227 fresh-eyes audit (three parallel Mode-C passes: the
> R-23 cure surfaces, the API/auth/security layer, and the
> UI/a11y/shell layer — 0 Critical / 1 High / 1 Medium / 6 Low / 8
> Informational raw, every material claim re-verified at file:line by
> the driving session — the High is the session's own cold-baseline
> discovery: the owner's post-226 session-log commits created
> `docs/worklog.md` as a symlink targeting `worklog.md` — relative to
> docs/, resolving to ITSELF, an infinite loop — and `bun run build`
> FAILED at HEAD, Turbopack's DirAssetReference walking the loop
> through the upload routes' file tracing; the Medium is the
> investments holdings table resolving rows by SYMBOL — two holdings
> sharing a ticker (normal multi-lot behavior) get duplicate React
> keys and Edit/Delete act on the WRONG row, live-reproduced by the
> audit pass and re-verified on the driving session). The round
> cures: THE SYMLINK-LOOP BUILD REPAIR (F-227a High — repointed to
> `../worklog.md`, the owner's alias intent preserved); THE HOLDINGS
> IDENTITY CURE (F-227b Medium — the id rides the portfolioStats
> seam, the table keys and resolves by id); THE CONDITIONAL-MUTATION
> REFACTOR (F-227c Low — the 10 [id] PUT/DELETE sites across 5
> resource families move to the atomic updateMany/deleteMany form
> with ownerId in the WHERE, the house's own reset-password pattern,
> + the P2003 FK-violation arm on the transactions account link);
> the low tail (F-227d–f, F-227m/n). §5 carries the execution
> history.)
>
> **Previous version: v2.23.0** (session 226 — the escape-family
> completion and per-casing metadata round R-23: the owner's standing
> directive — refresh → review → validate → audit → parity iteration →
> remediation plan → TDD execution → captures → docs lockstep →
> commit → push, with the reference STABLE on all four standing drift
> layers and the TRUE-390 mobile menu re-verified this session). The
> session-226 fresh-eyes audit (three parallel Mode-C passes: the
> R-22 cure surfaces, the API/auth/security layer, and the
> UI/a11y/shell layer — 0 Critical / 0 High / 4 Medium / 8 Low / 8
> Informational raw, every material claim re-verified at file:line by
> the driving session — the csv escape claims live-probed under TZ
> switching across three zones (scripts/probe-226-csv.ts: seven
> families the R-22 regexes miss still stage the VIEWER's calendar),
> the dark menu surface live-probed on BOTH apps
> (scripts/probe-226-menu.ts: the reference's dark panel measures
> rgb(10,10,10)/rgb(38,38,38) — the token family, not our stone-900),
> the ring-offset claim ADJUDICATED INVERTED by live probe
> (scripts/probe-226-ring.ts: the REFERENCE itself carries
> ring-offset-background — the cure ADDS the class to TABS_SEGMENTED,
> it does not retire it), and the V8 design probes run BEFORE
> implementation (scripts/probe-226-v8.ts: the named-zone set
> UT/EST/EDT/CST/CDT/MST/MDT/PST/PDT; CET/JST/BST/AEST are
> V8-rejected and null through the whole-parse guard). The round
> cures: THE DESIGNATED-TAIL ESCAPE COMPLETION (F-226a Medium);
> THE PER-CASING METADATA (F-226b Medium — the lowercase section
> routes served the ROOT head while the reference serves per-casing
> canonicals); THE API ERROR LOGGING (F-226c Medium — 31 catch sites
> swallowed errors with zero server-side trace); THE TRANSACTION
> COMPOUND INDEX (F-226d); the low tail (F-226e–r). §5 carries the
> execution history.)
>
> **Previous version: v2.22.0** (session 225 — the designated-tail
> completion and tooling-hygiene round R-22: the owner's standing
> directive — refresh → review → validate → audit → parity iteration →
> remediation plan → TDD execution → captures → docs lockstep →
> commit → push, with the reference STABLE on all four standing drift
> layers and the TRUE-390 mobile menu re-verified this session). The
> session-225 fresh-eyes audit (three parallel Mode-C passes: the R-21
> cure surfaces, the API/auth/security layer, the UI/a11y/shell layer
> — 0 Critical / 1 High (the standing F-217m owner-ask re-confirmed,
> NOT reopened) / 5 Medium / 8 Low / 9 Informational raw, every
> material claim re-verified at file:line by the driving session —
> the two csv claims live-probed under TZ switching across three
> zones, the skip-link paint order live-reproduced against the real
> dev server at both zone edges: elementFromPoint at the revealed
> pill's center returns the HEADER's wordmark at 390 while the link
> itself answers at 1280; the driving session's own finding — the
> capture-tool dev-db mutation — live-confirmed by the census
> MISMATCH it left behind; the neo-crm pattern check re-confirmed
> aligned: no new upstream commits, nothing to port). The round
> cures: THE NUMERIC YEAR-MONTH PARTIALS (F-225a Medium: "2026/11",
> "2026.11", "2026 11", "2026/1" — the statement-period shapes the
> family's own rationale cites — stage the invented day 1 through
> the locale fallback while the hyphen partials and "11/2026" null;
> the null-arm joins the partial family, `$`-anchored so the
> three-group forms ("2026/11/01") keep staging, separator class
> non-letter so named forms never ride it — the NUMERIC_LOCALE
> convention; TZ-switching-pinned in three zones); THE
> DESIGNATED-TAIL COMPLETION (F-225b Medium: the R-19 designator
> taxonomy misses " UTC"/" GMT" named tails and a space before the
> offset — "Nov 1, 2026 UTC" staged the VIEWER's calendar (New York
> reads 2026-10-31, wrong day; "Jan 1, 2026 UTC" reads 2025-12-31,
> wrong day AND year; Tokyo stages the written day — the identical
> file imports different books for different users, the exact
> F-222a/b class surviving inside the R-19/R-21 taxonomy), and the
> 4-digit numeric designated forms null-or-stage by zone (null in
> New York, stage in Tokyo — the guard converts the shift to a skip
> west of the designation); the cure routes EVERY designated tail to
> the written-literal staging doctrine — the ISO arm tolerates
> \s* before the designator and recognizes UTC|GMT, the
> named/numeric MDY-and-YMD designated forms (4-digit years,
> round-trip-guarded, month-names mapped, shape by the a≥1000
> convention) stage their WRITTEN calendar, and the two-digit-year
> designated numerics SKIP — the remap boundary stays engine-internal
> (the standing doctrine), a visible skip beats a silent wrong day;
> TZ-switching-pinned on both zone edges); THE VERIFY/RESEND
> PER-ACCOUNT BUCKETS (F-225c Medium: the F-222n mirror was never
> extended — verify 20/IP and resend 5/IP only, both voidable by the
> rotating-XFF decode the doctrine itself documents; resend re-arms
> ANY hash-present account and resets the attempts ladder, so a
> rotating caller cycles resend → 5 verify guesses → resend
> indefinitely against a known email (verify's success path signs
> the caller in); the F-222p mitigation citation is in tension with
> itself — it cites the very bound F-222n proved voidable; the cure:
> email-keyed secondary buckets (verify-acct 60/15, resend-acct
> 10/15 — sized above the IP caps so single-IP flows are unchanged)
> fired after the Zod parse and before any account-existence check,
> mirroring login-acct; the e2e legs ride rotating XFF exactly as
> the F-222n leg does); THE SKIP LINK'S PAINT ORDER (F-225d Medium:
> the F-224s reveal paints UNDER the sticky mobile header — both
> positioned z-50 in the same stacking context, the header later in
> DOM, so the focused pill is invisible below lg (keyboard users at
> phone widths, and 200%-zoom desktops — 1.4.4 reflow territory, Tab
> to a link that is focused but completely covered); the bypass
> still functions (Enter lands #main-content) — the e2e leg ran
> 1280-only and axe cannot model paint order, which is why 122/122
> stayed green; the cure raises the focused link above the header
> layer (focus:z-[60]) — clearing the z-50 header/drawer/dialog
> layer, staying under toasts — and a 390 e2e leg asserts the
> revealed link is topmost by elementFromPoint); THE CAPTURE-TOOL
> DATABASE DOCTRINE (F-225e Medium: the capture tools sign up
> scratch accounts against the DEV database — the class spans
> captures-218/219/224, every capture set since session 218 that
> needed a fresh signup; the reseed's deletes are owner-scoped so
> the scratch user SURVIVES db:seed and the census MISMATCHes (live
> this session: "users expected 1, found 2" — the R-21 gates
> verified the census BEFORE the capture set ran, so the shipped
> state carries the breakage silently); the cure moves the capture
> family onto its own database — the e2e doctrine: db/captures.db
> recreated + seeded per run, the spawned dev server rides it,
> custom.db never touched, a census tripwire at script exit);
> THE HYGIENE TAIL (F-225f the search docblock's overstatement
> reworded — "every query is a literal substring search" was false
> for exactly the metacharacter-bearing queries the strip exists to
> treat (net_salary → netsalary silently misses stored net_salary);
> the trade now documented as deliberate under-inclusion;
> F-225g the two-digit-year rolled residual pinned ("02/30/26" →
> 2026-03-02, recorded not cured); F-225h the route-level search pin
> (q="%" → all families empty, q="Whole" → populated — the
> end-to-end seam the sanitizer-only pin could not see); F-225i the
> uploads GET bucket (240/15, the export precedent — the route is
> cold in every test battery, grep-verified, so the bucket cannot
> trip any gate; the health route's "except this one" enumeration
> becomes true again); F-225j the global-error <main> landmark (the
> F-224aa rationale's third face); F-225k the six decorative icons
> aria-hidden; F-225l the DropdownItem destructive-ink measured-value
> note (3.76:1 on white — the F-218j value; the latent N-56e KEEP
> armed with the citation, not retired) + the globals.css "consumer"
> wording pair clarified; F-225m the app-shell re-indent + the dead
> focus:outline-none retirement). §5 carries the execution history.)
>
> **Previous version: v2.21.0** (session 224 — the date-guard
> completion and resilience-surface round R-21: the owner's standing
> directive — refresh → review → validate → audit → parity iteration
> → remediation plan → TDD execution → captures → docs lockstep →
> commit → push, with the mobile navigation menu named and the
> reference STABLE on all four standing drift layers). The
> session-224 fresh-eyes audit (three parallel Mode-C passes: the
> R-20 cure surfaces, the API/auth/security layer, the UI/a11y/shell
> layer — 0 Critical / 0 High / 2 Medium / 11 Low / 14 Informational
> raw, every material claim re-verified at file:line, both Mediums
> live-reproduced). The round cures: the shape-aware YMD year gate;
> the verify oracle's first-rung answer (the numeric tell retired);
> the month-year family completion (separator class + TIME tail +
> the reversed twin); the logout honesty pair with the
> revocation-replay pin; the resilience faces (global-error's dark
> genus, LoadingBlock aria, the error <main>); the skip-to-content
> link; the phone×dark a11y legs; the password max(200); the search
> LIKE strip; the @source not family (the built CSS −48%); the
> danger-soft dark flip (the N-56e KEEP armed); the docblock/comment
> corrections; the PAD §10 demo-seed register row. The mid-flight
> order-poisoning lesson (the USER-level logout bump evicted the
> shared e2e storageState — the leg rewritten onto a scratch user).
> Gate at ship: lint 0/0 · tsc 0 · 1060 unit (71 files) · build ·
> smoke 15/15 · 122 e2e · six drift gates CLEAN · census MATCH.

## 0. Versioning contract (how this file evolves)

- **Version shape**: `v2.<N>.<M>`
  - `2` — the plan's **generation**. Generation 1 was the session-199
    transformation plan
    (`docs/implementation-plan-session-199-wealthos.md` — delivered, shipped,
    closed). This file is generation 2: the post-ship remediation program.
  - `<N>` — the **iteration-session counter**. It bumps by one for every
    session that executes at least one R-item, in the same commit that ships
    that execution.
  - `<M>` — **text-only corrections** (plan wording, no execution). Bumping
    `<M>` alone is allowed only when zero R-items moved.
- **Every iteration session appends one row** to §5 (Execution history) and
  updates the affected R-item statuses in §3 — same commit, never a separate
  docs commit (the count-lockstep doctrine).
- **An R-item may only be marked `Done`** when its regression pins are green
  in the same commit that ships the cure — no "done" without evidence (the
  verification-and-review-protocol Iron Law).
- **Plan-text claims are re-validated against the tree** at every version
  bump (§4 records the method); a plan that has drifted from the codebase is
  a bug in the plan, fixed the same session it is found.

## 1. Creation & validation record

| Field | Value |
|---|---|
| Created | Session 203 (2026-11-08), at tree `4de2217` (owner's `update session log` — docs/session_4.md + this file's dummy + the worklog prune) |
| Method | Workspace refresh → doc-set review → cold baseline gates → skills-guided audit (`skills/web-application/SKILL.md` §14–§20, `skills/tdd`, `skills/verification-and-review-protocol`, catalog: `code-review-checklist`, `blast-radius`, `code-quality-standards`) → findings ledger (every finding verified at file:line) → this plan → §4 re-validation |
| Baseline gate (cold, this session, pre-plan) | lint 0/0 · tsc 0 · **498/498** unit (35 files) · build · smoke **14/14** · e2e **84/84** · census MATCH (transactions=75 in bounds 54..108, statics exact) |
| Dependency census (`bun audit`) | **10 advisories: 4 high / 5 moderate / 1 low — ALL dev-toolchain, zero runtime chains** (decode in R-1) |
| Standing deliverables verified | `.env` (`DATABASE_URL="file:../db/custom.db"`, gitignored) · `.env.example` (6/6 key parity with `.env`) · `db/` at repo root (gitignored) · `docs/screenshots/` 14 faces · `wealth-os_SKILL.md` · README/AGENTS/CLAUDE/PAD · README quickstart ordering correct (`cp .env.example .env` precedes the first db command) · local main == origin/main |

## 2. Findings ledger (session-203 audit)

Every finding was verified against the tree at `4de2217` before entering
this table. Severity per the house taxonomy (Critical/High/Medium/Low/Info).

| ID | Severity | Finding | Evidence (file:line) | R-item |
|---|---|---|---|---|
| F-203a | Medium | **Security ledger absent.** The `bun audit` census is recorded nowhere in the doc set; the family doctrine (the neo-crm s164/s198 lineage: PAD §10 census row + dormancy decode + per-session re-triage clause + a runtime-floor pin on every known runtime-chain advisory) was never ported to this repo. The known zod advisory (**GHSA-mrhx-c7xc-m3w5**, `zod <4.6.6`, high) has no guard: the **runtime** `zod@4.6.7` is SAFE (declared `^4.6.7`, resolved 4.6.7); the vulnerable resolution is the **nested dev copy** under `eslint-config-next › eslint-plugin-react-hooks` (`zod: "^3.25.0 \|\| ^4.0.0"` → 3.x). A future downgrade of the runtime dep would ship silently. | `bun audit` (10 total); `package.json` (`zod: ^4.6.7`); `node_modules/eslint-plugin-react-hooks/package.json`; PAD §10 (no advisories row) | **R-1** |
| F-203b | Medium | **Phantom pin reference.** AGENTS.md and the PAD name `docs-counts` among the pinned architecture contracts, but `tests/docs-counts.test.ts` does not exist in this repo — a neo-crm artifact referenced as if ported. The docs claim a guard that is not there. | AGENTS.md:80; PAD:566 + footnote 571; `ls tests/` (35 files, no docs-counts) | **R-2** |
| F-203c | Medium | **Live doc-rot on gate counts.** Six live-tense sites carry the stale 497-unit claim (the suite has been 498 since D-201c added the brand guard) and the README badge says 581 checks (497+84; truth 582 = 498+84): CLAUDE.md:47 · README.md:8 + :224 · PAD:669 + :702 · wealth-os_SKILL.md:9. Historical records (SKILL:1104's session-199 row, worklog, session logs) correctly keep 497 as history. This is the exact failure mode the docs-counts pin exists to prevent — and the evidence that F-203b has live consequences. | grep over the doc set (this session) | **R-2** |
| F-203d | Low | **Scaffold-era comment in a load-bearing config.** `vitest.config.ts`'s header still describes "the pure domain seams of the CRM" — the finance-domain reality is transactions/finance/auth/CSV-import seams. Comments are docs; this one misleads. | vitest.config.ts:3–6 | **R-3** |
| F-203e | Medium (programmed) | **The `gate:full` parity toolchain is CRM-era** — dormant, documented honestly since D-201b. `sweep.ts` defaults `REF_URL` to the NEO-CRM reference and walks contacts/leads; `drift-probe.ts`, `interior-census.ts`, `fullpage-sweep.ts` carry the same era's page sets and CRM-measured baselines. Re-derivation against the WealthOS reference is a multi-session parity-walk program (the CRM original took ~190 sessions to converge). | scripts/sweep.ts:97, :156–157, :285–286; AGENTS.md gate:full row (dormant status) | **R-4** |
| F-203f | Info (by design) | **The AI provider seam ships deterministic-local only** (`WEALTHOS_AI_PROVIDER` is a named future hook, not a wired env). Honest per ADR-005 and the PAD known-issues row; an LLM-backed implementation is additive, on-demand work. | src/lib/ai.ts:54–55, :274–275; PAD §10 row 3 | **R-5** |
| F-204a | Medium | **The docs-counts pin's site inventory is incomplete.** The R-2 port pinned seven sites — but the doc set carries more live-tense count claims, and ten of them silently kept the stale 497/35-files numbers THROUGH the session-203 lockstep pass (the exact rot the pin exists to prevent, recurring inside its own blind spot): CLAUDE.md:109 + :121 · README.md:62 + :103 + :170 · PAD:165 + :599 · SKILL:125 + :200 + :623. Verified by grep + the cold 508/508 baseline this session (the stale sites claimed 497/35 while the suite measured 508/37). | grep over the doc set (session 204); tests/docs-counts.test.ts (the R-2 site list) | **R-6** |
| F-205a | High | **The maiden table's ~85% section shares were a THEME genus, not the data genus the session-204 record hypothesized.** The theme-matched maiden decode (cluster buckets + region pixel fingerprints + VLM page reads, session 205): every section's diff was 98.4–99.7% ONE full-frame bucket because the reference serves its app shell DARK (whole-frame ≈ rgb(28,24,21)) while ours rendered LIGHT (≈ rgb(211,210,207)) — and the auth faces match (both light), exactly why login/reset sat at 6.96%/3.84%. Baking a full-frame inversion into the baselines would have blinded the drift gate permanently. | scripts/sweep.ts maiden runs (session 205); the fingerprint probe; docs/screenshots/ sweep captures | **R-4.2** |
| F-205b | Medium (programmed) | **The reference's import + settings pages carry their own navy/blue treatment** — a navy bg wash on import (rgb(26,35,50) vs our rgb(14,20,17): Δblue=33, every pixel differs); navy-tinted cards + the blue "Export All Data" button + the blue GDPR box on settings — while every other page keeps the app-wide amber/warm genus our clone mirrors (7 of 9 page backgrounds match within tolerance). The original app's own inconsistency; a parity round re-skinning those two pages (then re-deriving their baselines) is the cure. Standing shares until then: import 75.1/92.3/93.0/76.5, settings 57.1/74.5/77.5/60.3 (desktop/phone/tablet/landscape). *(Session-207 update: the IMPORT half is CURED — import carries its own navy wash, its shares re-derived to 31.2/36.2/31.5/33.9; the settings accents remain the open half.)* | The VLM page reads + the bg-sample table (session 205) | **R-7** (half-cured at v2.4.0) |
| F-205c | Low (programmed) | **The smaller styling deltas the theme-matched maiden exposed** (all dark-mode): the ref's solid saturated stat-icon fills vs our tinted badges; its line-segment chart legend vs our dots; its gauge health score vs our blobs; our sidebar active pill (the ref shows none); the mobile auth-face layouts (login/reset run 13.2–14.0 at phone/tablet vs 3.9–7.1 at desktop). Each is a small share; together they are the residual under the data genus. | The VLM dashboard/settings reads (session 205) | **R-7** |
| F-206a | Medium | **The R-4.2 "demo corpus" belief was a misdecode — the reference's workspace renders EMPTY STATES.** The session-206 maiden probes found every section showing its empty-state copy ("No expenses yet", "No Income Sources Yet", "No accounts yet", "No Goals Set Yet", "0 holdings", $0.00 KPIs) — and the session-205 captures, re-read, show the same (the genus was decoded from the diff shares, never verified against the captures). Both sides run empty: the true first genus is the EMPTY-STATE CONSTRUCTION delta, not data-vs-empty. The living language (the sweep's STANDING_BASELINES docblock + standingExplained, zero-data.ts's header, this plan's R-4.2 bullet) asserted the corpus belief as live doctrine. | The session-206 quiescence-settled census + the re-read session-205 captures; scripts/drift-probe.ts DEMO_SENTINELS (the live-measured phrases) | **R-4.3** (cured in-commit) |
| F-206b | Medium (programmed) | **The R-4.3 census decode surfaced the construction genera in detail** — measured, baked into the census's STANDING_CENSUS allowances, programmed as R-7 convergence work: the section-shell wrapper stack (ours `p-4 md:p-6 lg:p-8 space-y-6` vs the ref's `flex-1 pt-16 lg:pt-0` + `max-w-{6,7}xl mx-auto` inner container); the page-header vocabulary (the ref's `lg:` breakpoints, its H1 `text-primary-navy` tokens, its `mb-8`/`mb-2` rhythms); the auth-card family (the ref's `border-0 shadow-2xl bg-white/95` vs our bordered `shadow-xl`, its slate accent bar vs our amber, its taller padding driving login mainH −40); the reference's reset-password face carrying NO `<main>` (ours keeps the landmark — the superset; the census's anchor fallback covers it); the investments height genus (−649 desktop); the mobile topbar's Synced-pill placement (the ref's right cluster beside sun+hamburger vs our left beside the wordmark). | The four-axis census maidens (the STANDING_CENSUS decode) + the TRUE-390 anatomy probes | **R-7** |
| F-207a | High | **The mobile header's Synced pill is INVISIBLE at phone widths — a phantom-breakpoint class (the Tailwind v4 bug the owner flagged).** The pill carries `hidden xs:inline-flex sm:inline-flex` (mobile-header.tsx:33): `xs` is NOT a default Tailwind v4 breakpoint and this repo ships no config file to define it, so the `xs:inline-flex` variant silently generates NO CSS (v4 drops unknown variants without warning) — the pill stays `display:none` until `sm` (640px). Live-verified: ours computed `display: none` at 390×844; the reference renders its pill in the topbar's RIGHT cluster at 390, visible. | src/components/layout/mobile-header.tsx:33; src/lib/page-layout.ts (MOBILE_HEADER.syncedPill); agent-browser probes both apps (session 207) | **R-7.1** |
| F-207b | Medium | **The mobile topbar's wash/brand genus diverges.** Reference (live-extracted): gradient wash `bg-gradient-to-r from-stone-50 via-amber-50/50 to-stone-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 backdrop-blur-md border-b border-amber-500/20 shadow-lg`; logo `w-8 h-8`; wordmark GRADIENT-CLIP text (`from-amber-600 via-yellow-600 to-amber-600` / dark `from-amber-400 via-yellow-300`); pill genus `rounded-md … text-xs font-semibold text-green-600 border-green-300` with the WIFI icon; icon buttons are BORDERLESS ghosts (`rounded-md h-9 w-9 text-gray-700 hover:bg-accent`). Ours: flat `bg-[#faf9f7]/90` wash, stone border, no shadow; `w-9 h-9` logo; solid-amber wordmark; `rounded-full font-medium` emerald pill with a Check icon; bordered chip icon buttons. | The session-207 topbar DOM probes (both apps); src/lib/page-layout.ts MOBILE_HEADER | **R-7.1** |
| F-207c | WITHDRAWN (session 207) | **The "drawer active pill is added chrome" hypothesis was a probe artifact — the reference's drawer DOES render the active pill.** The session-206-era decode sampled link classes truncated at 150 chars (the base `text-stone-300 hover:…` prefix fills exactly that window; the active suffix `bg-gradient-to-r from-amber-500/20 to-emerald-600/20 text-amber-200 shadow-lg border border-amber-400/30` was cut off). The session-207 full-class census on the logged-in reference found the current-page drawer link carrying the pill — byte-identical to our MOBILE_NAV_SHEET.linkActive. Our drawer active state is CORRECT parity; no change. (Recorded so the phantom finding cannot resurface.) | The session-207 race-free drawer census (full class strings, /Dashboard current) | n/a (withdrawn) |
| F-207d | Low | **The drawer footer + sheen diverge.** Reference: footer wrapper `p-4 border-t border-amber-500/20`; Sign Out a ghost button (`h-9 px-4 py-2 w-full text-white border-slate-600 hover:bg-white/10`, rounded-md); the drawer sheet carries a subtle gold/emerald 3%-alpha sheen overlay (`linear-gradient(135deg, rgba(212,175,55,.03), transparent 50%, rgba(4,120,87,.03))`). Ours: `mx-4 mb-6` margin-footer, a filled `rounded-xl border-stone-700 bg-stone-800/60` button, no sheen. Note: the reference's sheet is a transparent VEIL (its light mode ships unreadable stone-300-on-light text — a reference flaw); our opaque gradient drawer is the sanctioned readable superset — we add only the sheen layer, keeping opacity. | The session-207 drawer DOM + pixel probes (dark AND light veils); src/lib/page-layout.ts MOBILE_NAV_SHEET | **R-7.2** |
| F-207e | Medium | **The section shells, page headers, and H1 tokens diverge** (the F-206b shell/header genera, now fully mapped per page). Reference (live census, all 9 pages): shell `p-4 lg:p-8 bg-gradient-to-br from-stone-50 via-amber-50/30 to-emerald-50/40 dark:from-stone-950 dark:via-stone-900 dark:to-emerald-950/30 min-h-screen` + inner containers per page (7xl: Dashboard/Expenses/Investments/Analytics · 6xl: Income/Accounts/Import/Goals · 4xl: Settings); page header `flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4`; H1 `text-3xl lg:text-4xl font-bold` + NO tracking-tight + `dark:text-white` + `mb-1` on Dashboard/Investments and `text-primary-navy … mb-2` on the other seven (primary-navy computed `rgb(15,20,25)` = `#0f1419`). Ours: flat `p-4 md:p-6 lg:p-8 space-y-6` wash (no gradient, no min-h-screen, no inner container except import/settings), `md:` breakpoints, `tracking-tight`, `dark:text-stone-50`, uniform stone H1, no mb rhythm. | The session-207 nine-page census (wash/container/H1 per page, both apps); src/lib/page-layout.ts PAGE_ROOT/PAGE_HEADER | **R-7.3** |
| F-207f | Medium | **The auth-card family diverges from BOTH the reference and our own doc comment** (the F-206b auth genus). Reference login card: `border-0 shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl`, accent bar `from-slate-200 via-slate-300 to-slate-200`, inner `p-8 sm:p-10 md:pt-12 md:pb-10 md:px-10`. Ours (LOGIN_LAYOUT): `border border-slate-200/60 bg-white shadow-xl`, AMBER accent `from-amber-300 via-yellow-400`, `p-8 sm:p-10` — while login-card.tsx's own docblock claims "A borderless glass card (bg-white/95 backdrop-blur-sm shadow-2xl)": the code drifted from a documented re-pin that never landed. | The session-207 login-face probes; src/lib/page-layout.ts LOGIN_LAYOUT; login-card.tsx docblock | **R-7.4** |
| F-207g | Medium | **The Import page's navy wash is missing** (the F-205b genus, precisely mapped). Reference /Import shell wash: `bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800` — its own navy/blue treatment, distinct from the other eight pages' warm wash; its inner container max-w-6xl. Ours: the standard warm shell + `max-w-3xl`. (Settings KEEPS the standard warm wash on the reference — its navy treatment lives in the export/GDPR accents only, F-205b.) | The session-207 wash census (Import navy confirmed twice, logged in, both themes) | **R-7.3** |
| F-207h | Low | **The sidebar footer's Synced pill shares the topbar's divergence** — reference: `rounded-md … font-semibold text-green-600 border-green-300` with the wifi icon (same badge genus as the topbar); ours: `rounded-full … font-medium` emerald with a Check. | The session-207 sidebar-footer probe; src/components/layout/sidebar.tsx | **R-7.1** |
| F-208a | Medium | **The KPI stat faces diverge — the flat tinted tiles (and Investments' plain cards) vs the reference's saturated gradient genus.** Reference Dashboard tiles (live, all four): `w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 flex items-center justify-center` (+ `from-rose-500 via-red-500 to-rose-600` / `from-amber-500 via-yellow-500 to-amber-600` / `from-purple-500 via-violet-500 to-purple-600`) with `w-6 h-6 text-white` icons — FIXED size, no md: upsize. Ours (KpiCard, page-parts.tsx:84–89): inline-style tinted tiles (`backgroundColor: #ecfdf5` etc.), colored-not-white icons, `h-12 w-12 md:h-14 md:w-14`. Reference Investments KPI row (live, all three): FULL-CARD gradients — `rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 text-white border-0 shadow-2xl` (Portfolio Value) / `from-emerald-500 via-teal-500 to-emerald-600` (Total Gain/Loss) / `from-amber-500 via-yellow-500 to-amber-600` (Total Return %) — `p-6` + `flex items-center justify-between`, label `text-white/70 text-sm font-medium mb-1`, value `text-3xl font-black text-white`, sub `text-white/60 text-xs mt-1`, ghost icon `w-12 h-12 text-white/30`. Ours: three standard KpiCards with tinted tiles. | The session-208 logged-in DOM census (both apps, agent-browser, full class strings) | **R-7.6** |
| F-208b | Low | **The Dashboard Cash Flow card adds a custom dot-marker legend row the reference does not render — and the period segmented control carries micro-deltas.** Reference Cash Flow card: CardHeader + title + segmented control (`flex gap-1 bg-stone-100 dark:bg-stone-800/80 rounded-lg p-1`, buttons `px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200`) and NO legend row under the chart (the tooltip carries it). Ours: a `mt-3 flex flex-wrap items-center justify-center gap-6` chip row with `h-2.5 w-2.5 rounded-full` DOT markers (the F-205c "line-segment legend vs our dots" decode — the reference simply has none on this card); our segmented control `inline-flex items-center rounded-lg bg-stone-100 p-1 dark:bg-stone-800` + `font-medium transition-colors` buttons. | The session-208 DOM census (both apps) | **R-7.6** |
| F-208c | Low | **The Financial Health widget's score bars and tip box diverge.** Reference (live): bar labels `flex justify-between text-xs` (ours `text-sm` + `mb-1` wrapper), fills SOLID band colors via inline style (measured `rgb(244,63,94)` rose at score 0; ours `bg-gradient-to-r from-amber-400 to-emerald-500` gradient), the amber tip box `mt-4 p-3 rounded-xl bg-amber-50/60 dark:bg-amber-900/10 border border-amber-200/40 dark:border-amber-800/30` + `text-xs text-amber-800 dark:text-amber-300 leading-relaxed` ("💡 …" advice — ours renders none), gauge overlay `absolute inset-0 flex flex-col items-center justify-end pb-1` with `text-3xl font-black` (ours `inset-x-0 bottom-0` + `font-extrabold`). | The session-208 DOM census (both apps) | **R-7.6** |
| F-208d | Medium | **The F-205b settings tail, precisely mapped** (the blue/navy accents + the glass card genus): reference Settings cards are a DIFFERENT GENUS from every other page — `rounded-xl text-card-foreground bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg` with shadcn CardHeader `flex flex-col space-y-1.5 p-6` + CardTitle `font-semibold leading-none tracking-tight flex items-center gap-2 text-primary-navy dark:text-white` + CardContent `p-6 pt-0 space-y-4`; card titles "Profile Settings" / "Notifications" / "Export Your Data" / "Import Data" / "Your Data Summary"; the GDPR box `bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4` + h4 `font-semibold text-blue-800 dark:text-blue-200 mb-1`; the Export button `bg-blue-600 hover:bg-blue-700 … w-full`; the Import-warning box the SAME construction in amber (`bg-amber-50 dark:bg-amber-900/20 …` + h4 `text-amber-800 dark:text-amber-200`) INSIDE a standard glass card (ours washes the whole card amber); the data-summary badges shadcn Badge `rounded-md px-2.5 py-0.5 text-xs font-semibold` in green/blue/purple/indigo variants (ours: rounded-full emerald pills ×7 with different labels); the Save footer a `flex justify-end` row at the page bottom (ours: header actions top-right). Ours: stone cards `border-stone-200/70 bg-white shadow-sm`, H2 titles, no blue anywhere. Our Category Budgets card is a functional superset (the reference has none) — kept, restyled to the glass genus. | The session-208 logged-in DOM census (both apps, full class strings) | **R-7.7** |
| F-208e | Low | **The auth-face residuals**: our title/subtitle use drifted hexes — `text-[#1b2437]` / `text-[#6b7688]` (LOGIN_LAYOUT) vs the reference's tokens `text-slate-900` / `text-slate-500` (live-verified on its H1/p); our login logo is a CSS bar-chart mark in a navy circle (documented superset: "the reference hotlinks a screenshot image; we reproduce the shape with no external asset") while the reference renders a real 192×192 image asset (navy square + cyan mark — now FETCHED clean, 37 KB PNG) in `flex shrink-0 overflow-hidden rounded-full relative h-20 w-20 sm:h-24 sm:w-24 shadow-lg ring-4 ring-white/50 group-hover:shadow-xl transition-all duration-300` + `img aspect-square h-full w-full object-cover`; our wrapper lacks the `sm:h-24 sm:w-24` upsize. The card/padding/form genera were already converged at R-7.4 — these are the last deltas (the F-205c "mobile auth-face layouts" residual: login cardH 826 vs 848 at 390). | The session-208 390×844 census (both apps); the fetched asset | **R-7.8** |
| F-208f | Low | **The Analytics income-vs-expenses chart's recharts legend renders series in the wrong order** — the reference's legend reads Income, Expenses; ours Expenses, Income (the series order differs). | The session-208 DOM census (both apps) | **R-7.6** |
| F-208g | Medium (programmed) | **The app-wide in-page card genus diverges on every page** (the biggest F-205c-adjacent residual, deliberately deferred — blast radius: all 9 pages × every card). Reference (live, Dashboard KPI card, full class): `rounded-xl text-card-foreground p-6 card-hover bg-gradient-to-br from-white/90 via-amber-50/20 to-white/90 dark:from-stone-900/90 dark:via-amber-950/10 dark:to-stone-900/90 backdrop-blur-md border border-amber-100/50 dark:border-amber-900/30 shadow-xl` — a warm gradient + hover + p-6 card. Ours (CARD.base): `rounded-xl border border-stone-200/70 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900/60` + `p-4 md:p-6`. Every in-page card on the reference carries the gradient genus (Dashboard confirmed; the Settings glass cards are F-208d's own genus). The R-7.5 standing shares still carry this delta (dashboard 12.39% desktop). The next parity slice after the R-7 tail. | The session-208 DOM census (both apps) | **R-7.10** (programmed) |
| F-209a | Medium (refines F-208g) | **The reference's card reality is per-surface, not one genus** — the session-209 census (every page walked, full class strings) resolves F-208g's single-genus belief into FOUR families deployed by surface: **(1) WARM-HOVER** (Dashboard KPI ×4): the F-208g class verbatim (via-amber-50/20 + card-hover + p-6 in-base + backdrop-blur-md); **(2) WARM-SIMPLE** (Dashboard mid ×5 — cash flow carries backdrop-blur-md too; Investments charts/tables ×5): `rounded-xl text-card-foreground bg-gradient-to-br from-white/90 to-stone-50/90 dark:from-stone-900/90 dark:to-stone-950/90 border border-amber-100/50 dark:border-amber-900/30 shadow-xl` (± h-full; NO via, NO card-hover, NO p-6 in-base — padding via the shadcn CardHeader/CardContent p-6 anatomy, effective 24px); **(3) GLASS** (Expenses summary ×3 WITH card-hover appended + content card; Analytics chart cards; Dashboard Recent Activity + AI Insights bottom row `grid lg:grid-cols-2 gap-6 mb-8`; Income + Goals dashed empty states): `rounded-xl text-card-foreground bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg`; **(4) STOCK** (Accounts, Import): `rounded-xl border bg-card text-card-foreground shadow` (± dashed empty variant `text-center p-12 border-dashed`). Two primitives behind the families were never ported: the custom `.card-hover` utility (live CSSOM: `transition: 0.3s cubic-bezier(0.4,0,0.2,1)`; `:hover { transform: translateY(-2px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04) }`) and the shadcn tokens (`:root --card: 0 0% 100% / --card-foreground: 0 0% 3.9%`; `.dark --card: 0 0% 3.9% / --card-foreground: 0 0% 98%`) — our session-208 `text-card-foreground` usages are INERT (no token in `@theme`; the A-209 audit finding). Ours: every page renders the one stone CARD.base + `p-4 md:p-6`. | The session-209 DOM census (every reference page walked, both apps logged in, CSSOM rules extracted) | **R-7.10** |
| F-209b | Medium | **Our Analytics lacks the reference's stat row** — the reference renders, directly under the page header (above the tabs), a `grid md:grid-cols-3 gap-6` of three saturated to-r gradient stat cards: **Avg Monthly Income** (`bg-gradient-to-r from-emerald-500 to-emerald-600`, TrendingUp `w-8 h-8 text-emerald-200`) · **Avg Monthly Expenses** (`from-red-500 to-red-600`, TrendingUp `rotate-180` `text-red-200`) · **Avg Monthly Savings** (`from-blue-500 to-blue-600`, Calendar `text-blue-200`) — each `rounded-xl <gradient> text-white border-0 shadow-lg` > `div.p-6` > `flex items-center justify-between` (label `text-X-100 text-sm font-medium mb-1`, value `text-2xl font-bold`). Ours renders no stat cards on Analytics at all (charts start immediately). Display-only math over the existing cashFlowSeries. | The session-209 DOM census (reference Analytics, full HTML) | **R-7.10** |
| F-210a | Informational (decoded, absorbed) | **The two apps' scroll MODELS diverge** — the R-4.4 maiden's docH telemetry: the reference's app pages scroll the DOCUMENT (dashboard 2054px desktop / 3311px phone; settings 1460/1768; investments 1632/2236; expenses 1262; analytics 1232 at phone; the auth faces 928-940) while OUR shell is the viewport-locked internal scroller (`h-screen overflow-hidden` + `main.overflow-y-auto` — the neo-crm lineage; our docH is exactly 900/844 on every app page). The viewport sweeps never saw it (both first viewports match; the clip); the interior census encodes it implicitly (its mainH allowances); the fullpage axis makes it the dominant standing genus (the padTo white rows below our document). Deliberately ABSORBED into the fullpage baselines, not cured: the shell re-architecture would invalidate every standing table for a genus invisible at the viewport, and the internal scroller is the documented functional superset (the sidebar never scrolls away; the reference's document-scroll is the Base44 original). | The session-210 fullpage maiden (docH telemetry both apps, both classes) | absorbed into **R-4.4**'s tables |
| F-210b | High (cured in-commit) | **The first R-4.4 maiden's our-side captures were corrupted mid-run** — analytics/goals/settings rendered the SEEDED demo corpus while dashboard..import rendered the empty states (the zero-data state was undone between captures). Root-caused to F-210c; the cure is the ZERO-DATA SENTINEL: `assertZeroData` probes `/api/dashboard` (all six domain arrays) after the zero and after EACH class's our-side loop, and throws naming the violated tables — a corrupted state fails LOUDLY, never silently bakes into the baselines (the login-wall doctrine's state edition). The sentinel PROVED itself: the second maiden run tripped it, the third (post-F-210c-fix) ran clean end-to-end. Pinned in `tests/fullpage-sweep-tool.test.ts` (the `zeroDataIntact` PURE seam + the wiring pins). | The session-210 maiden diff (band decode + VLM read: the "corrupted" goals capture showed 5 seeded goal cards; the controlled probes reproduced the sweep's captures byte-identically, isolating the anomaly to the maiden's own process) | **R-4.4** (cured) |
| F-210c | High (cured in-commit) | **The direct-execution guards' suffix collision** — `"fullpage-sweep.ts".endsWith("sweep.ts")` is TRUE, so the moment the re-anchored fullpage tool imported `./sweep` (the reuse doctrine), sweep.ts's guard fired THE SWEEP inside the fullpage's own process: its zero → its 22 captures → ITS RESEED landed mid-fullpage-run — the F-210b corruption's root cause, masquerading as "an external actor" until the process-list + log evidence settled it. The class cure: all four tool guards (sweep, fullpage-sweep, interior-census, drift-probe) are now `path.basename(process.argv[1]) === "<name>.ts"` — EXACT basename, immune to sibling filename suffixes. A guard a sibling's filename can satisfy is not a guard. Pinned in `tests/fullpage-sweep-tool.test.ts`. | The session-210 forensic chain (the background-maiden + db polling caught the reseed landing; the log's `[sweep] captured` lines inside the fullpage's output named the actor) | **R-4.4** (cured) |
| F-211a | Low | **The package manifest still carries the scaffold-era identity.** `package.json` reads `"name": "neo-crm"` + `"description": "NEO CRM — Next.js 16 + React 19 + Prisma/SQLite CRM application"` — the CRM scaffold's name in the WealthOS repo's most load-bearing manifest (the file every quickstart, gate, and tooling run keys on). The scaffold-heritage strings that ARE documented as intentional (`neo_session` cookie, `NEO_PROXY_HOPS`, the `neo-crm-dev-only-insecure-secret` dev constant, `neo-crm:chunk-reload-at`) survive by the AGENTS doctrine; the package NAME is not in that family — it is the product identity, and no doc pins it as intentional. No test pins the name (verified: `tests/gate-script.test.ts` reads package.json for the scripts only; `tests/uploads-path.test.ts` uses the string only as a tempdir disjunct). | package.json:2–3 (read this session); grep over tests/ (no name pin) | **R-4.5** (cured in-commit) |
| F-212a | Low | **The lockfile still carries a SECOND scaffold-era identity.** `bun.lock`'s workspaces mirror reads `"name": "activity-map"` — an identity older than the neo-crm scaffold F-211a cured (bun rewrites the workspaces mirror only when resolutions change; the manifest renames never re-keyed it). Session 211's F-211a verification grepped for `neo-crm` (0 hits — true) but this older name sat in the tree all along; `bun update` alone leaves it stale. | bun.lock workspaces block (read this session); the post-update lockfile still carrying it (empirical) | **R-8** (cured in-commit) |
| F-212b | Medium | **8 of the 10 ledger advisories were curable within existing semver ranges all along.** The standing deferral treated the census as fixed, but the lockfile's transitive resolutions had never been re-resolved since the scaffold era: vite 8.3.0 (the six-advisory window 8.3.0–8.3.2 incl. the launch-editor trio — fixed 8.3.3; vitest's peer range `^6.4.0 \|\| ^7.0.0 \|\| ^8.0.0` admits 8.3.6), source-map-js 1.2.1 (GHSA-68fv-2mgg-jv7q — fixed 1.2.2; postcss's `^1.2.1` admits it), and the nested eslint-plugin-react-hooks zod 4.6.5 (GHSA-mrhx-c7xc-m3w5 — floor 4.6.6; the parent range `^3.25.0 \|\| ^4.0.0` admits 4.6.7, and a fresh resolution dedupes onto the runtime copy). `bun update` moves direct deps but does NOT re-resolve transitives — a fresh lockfile generation does. | `bun audit` + the bun.lock resolutions (this session); registry checks confirming 8.3.6 / 1.2.2 / 4.6.7 in-range | **R-8** |
| F-212c | Info (documented deferral) | **The 2 remaining advisories are range-unreachable.** minimatch 10.2.6 (GHSA-g3hv-75wg-m249, fix 11.0.1 — typescript-estree pins `^10.2.2`) and deepmerge-ts 7.1.5 (GHSA-ggr8-5vv4-36mx, fix 8.0.0 — `@prisma/config` exact-pins `7.1.5`). Both cure automatically when their parents' ranges move; the PAD §10 row carries the decode and the re-triage clause. | bun.lock parent ranges (this session) | **R-8** (documented) |
| F-214a | High | **`/api/reset` wipes the WHOLE install's finance data — the only unscoped writes in the tree.** The six `deleteMany` calls carry no `ownerId` filter while signup is open: any visitor can sign up, then POST `{"confirm":"RESET"}` and destroy every account's rows (users and the Setting row survive). Every other CRUD family is owner-scoped; the reference-family's own "404-not-403" discipline makes this the outlier. | `src/app/api/reset/route.ts:30-37` (no `where` on any of the six deletes) | **R-10** |
| F-214b | Medium | **`Budget` is ownerless and read/written globally — the PAD's ER (§4.1) and the "all owner-scoped" claim (§4.2) are false for it.** The shipped model has no `ownerId` (`@@unique([category, period])`), so the budgets CRUD, the dashboard aggregate, the AI coach context, and the GDPR-style export all read/write EVERY user's budget rows; user A's category edit mutates user B's budget-vs-actual analytics. | `prisma/schema.prisma:172-182`; `src/app/api/budgets/route.ts:11,32,51`; `src/app/api/dashboard/route.ts:25`; `src/app/api/ai/coach/route.ts:29`; `src/app/api/export/route.ts:24`; PAD §4.1 ER + §4.2 | **R-10** |
| F-214c | Medium | **`GET /api/users` enumerates every account's email/name to any session (CRM residue), and `Setting` is a global singleton.** The "Owners list (for filter dropdowns + rep leaderboards)" comment describes CRM functionality that died with the session-199 transformation — zero UI consumers remain (verified) — yet the endpoint still answers the full user table (id/email/name/avatar/photo/role). The Setting singleton is the same tenancy genus: any user's settings write mutates the install-wide row. | `src/app/api/users/route.ts:9-21` (comment + findMany, no scope); consumer grep (src/stores, pages — none); `prisma/schema.prisma:184-194`; `src/app/api/settings/route.ts:8-46` | **R-10** |
| F-214d | Medium | **23 (family, step) color pairs used in src/ are NOT pinned in `@theme` — the documented v3 re-pin contract is false.** globals.css:24-26 + :104-106 claim "every literal (family, step) pair used in src/ is re-pinned to the v3 palette", but amber-950, blue-300/800/900/950, emerald-900/950, green-200/300/800/900, indigo-100/300/800/900, purple-300/800/900, red-800, rose-300/900/950, and violet-500 compute through v4's oklch defaults instead. Not inert (v4's default palette still generates them) — silently the WRONG values, the F-207a lesson's next edition, invisible to the sweep baselines (derived from our own renders — the genus is baked in). | enumeration script (this session): 103 pairs used, 80 pinned, 23 missing; `src/lib/page-layout.ts:142,167`; `src/app/(app)/dashboard/page.tsx:526-529`; `src/app/(app)/settings/page.tsx:338-347` | **R-11** |
| F-214e | Low | **7 shadcn semantic tokens used in src/ exist in NO theme — the classes are INERT (the A-209 cure's missed tail).** `border-input` (login-card verify input, ui/select), `hover:bg-secondary/80` (the Settings badge family), `accent`/`accent-foreground` (ui/dropdown, ui/select, ui/button, dashboard), `muted-foreground` (ui/dialog, ui/table, ui/tabs), `popover`/`popover-foreground` (ui/dropdown, ui/select) generate NO CSS — v4 drops unknown tokens without warning. | same enumeration: `--color-input/secondary/accent/accent-foreground/muted-foreground/popover/popover-foreground` absent from globals.css; `src/components/layout/login-card.tsx:529`; `src/app/(app)/settings/page.tsx:338-347` | **R-11** |
| F-214f | Medium | **In-app OTP/reset-link delivery is ON by default in production with zero boot-time visibility.** The ADR-014 kill-switches (`NEO_DISABLE_IN_APP_OTP/RESET`) document the demo posture, but a production deployment that forgets the knobs serves single-use reset links and signup codes in HTTP responses — the no-enumeration login can't help when the response itself is the takeover vector. The boot gate (boot-env.ts) warns on the site-URL family and knob typos but is SILENT on this, the larger risk. | `src/app/api/auth/forgot-password/route.ts:68,107-109`; `src/app/api/auth/signup/route.ts:98-104`; `src/lib/boot-env.ts:48-96` (no delivery-mode warning) | **in-commit** |
| F-214g | Low | **`upcomingAlerts`' window contradicts its docblock and is unpinned at the edges.** The filter lower-bounds at `startOfMonth(ref)` (month-to-date overdue rows IN — rendered "Due N days ago" under "Upcoming & Alerts"), while the docblock says "within the horizon (default 14 days)"; previous-month overdue rows vanish. Defensible as the "Alerts" half of the section, but the deliberate window is documented nowhere and no test pins the overdue edge. | `src/lib/finance.ts:370-384`; `tests/finance.test.ts:207-211` (future-only fixture) | **in-commit** |
| F-214h | Low | **`parseCsv` treats a mid-field quote in an unquoted field as an opening quote.** RFC 4180: a quote inside an unquoted field is a literal character; the parser flips into quote mode instead, swallowing the following comma (and potentially the rest of the row) into one cell — malformed bank CSVs mis-parse. | `src/lib/csv.ts:96-97` | **in-commit** |
| F-214i | Low | **Doc/code drift, four sites.** README:198 + PAD:581 claim a "10 MB" upload cap (code: 5 MB — `MAX_UPLOAD_BYTES`); README:194 lists `/api/analytics` GET — no such route exists (the Analytics page aggregates client-side from /api/dashboard); README:195 says `/api/ai` — the route is `/api/ai/coach`; schema.prisma:32's role comment says "user \| admin" while signup writes `"admin" \| "rep"` (CRM residue; the seed writes "user"). | README.md:194,195,198; Project_Architecture_Document.md:581; `prisma/schema.prisma:32`; `src/app/api/auth/signup/route.ts:84`; `src/lib/uploads.ts:25`; `ls src/app/api/` (no analytics dir) | **in-commit** |
| F-214j | Low | **The AI coach is silent on spend-with-zero-income.** The savings-rate verdict's `else if (monthlyIncomeFromTx(...) > 0)` requires income, so a month with $0 income and real expenses produces neither the savings-rate card nor the overspending warning — the most alarming financial state gets no insight. | `src/lib/ai.ts:94-111` | **in-commit** |
| F-214k | Low | **eslint.config.mjs disables four rules the tree is clean under.** `react-hooks/exhaustive-deps`, `no-unreachable`, `no-fallthrough`, `no-useless-escape` are all "off" (scaffold posture); this session re-ran all four LIVE over src+scripts+prisma — zero issues. The safety net is switched off for nothing. | `eslint.config.mjs:23,36,38,39`; live `eslint --rule` run (this session, 0 issues) | **in-commit** |
| F-214l | Info | **Whole-store `useWealthOs()` subscriptions (all 12 pages).** No `useShallow` misuse exists (no object-literal selectors — verified), so this is coarse-but-correct at the app's scale; recorded as the standing performance note, no cure scheduled. | all `src/app/(app)/*/page.tsx` | none (recorded) |
| F-214m | Medium (cured in-commit) | **The scratch-db schema-drift refusal — discovered live during the R-10 verification.** Prisma 7's `db push --accept-data-loss` REFUSES to add a REQUIRED column to a populated table ("Added the required column `ownerId` … There are N rows in this table, it is not possible to execute this step") — the flag covers data-losing steps it can execute, not unexecutable ones. The stale-schema `db/e2e.db`/`db/smoke.db` therefore killed the e2e global-setup and (silently — the push is `>/dev/null`'d) the whole smoke ladder on any machine that had run the pre-R-10 gate. Cures: the smoke scratch db is RECREATED each run (`rm -f db/smoke.db` — the ladder boots its own server after the push, so the deleted-inode hazard never applies) and the e2e setup pushes with `--force-reset` (schema recreated IN PLACE — same file inode, the reuse-server hazard documented in the setup's own header stays respected, the push idempotent against any schema drift). | `scripts/smoke-test.sh` (the db leg); `tests/e2e/global-setup.ts` (the refusal reproduced live against the stale e2e.db this session) | **in-commit** |
| F-215a | High | **The F-214h cure landed in a production-DEAD module — the live Import parser still carries the bug, plus no BOM strip.** `src/lib/csv.ts`'s `parseCsv` (the F-214h bare-quote fix, line 99-110, + the BOM strip, line 76) is imported ONLY by `tests/csv.test.ts` — zero production consumers. The Import page ships its OWN inline copy (`src/app/(app)/import/page.tsx:24-60`) with the PRE-214 quote-flip defect (line 42-43: any bare quote mid-field flips into quote mode and swallows the next comma — `O"Brien,12.50` shifts columns and silently drops rows) and no BOM strip (Excel "CSV UTF-8" exports — the common bank-export format — fail header detection with "Could not detect the required columns": the header cell reads `\uFEFFDescription`). The shipped regression pin (`tests/csv.test.ts:60`) exercises the dead seam, so it can never catch this. | `src/app/(app)/import/page.tsx:42-43` (byte-verified); `src/lib/csv.ts:76,99-110`; `rg parseCsv src/` (zero production importers of the lib form) | **R-12** |
| F-215b | Medium | **The only LIVE CSV export bypasses the documented formula-injection guard.** The analytics `exportCsv` (`src/app/(app)/analytics/page.tsx:95-108`) hand-rolls quote-doubling (`t.description.replace(/"/g,'""')`) with NO `guardFormulaPrefix` — a description/category beginning with `=`, `+`, `@`, tab or CR exports unguarded (the OWASP CSV-injection class the repo adopted posture-(b) against at S48-P1). The guarded seam's own docblock (`src/lib/csv.ts:8-30`) claims coverage of "entity-export.ts's qq()" — a file that does not exist; `toCsv`/`guardFormulaPrefix`/`csvFilename` have ZERO production consumers. (Note: an initial audit pass mis-read the export line as a syntax error — byte-level verification (`od`) showed valid code; the display pipeline had eaten a `[[h` sequence. The guard bypass is the real, verified defect.) | `src/app/(app)/analytics/page.tsx:99` (the unguarded escape); `src/lib/csv.ts:10-11` (the false docblock); `rg "guardFormulaPrefix\|toCsv" src/` (zero production hits) | **R-12** |
| F-215c | Medium | **R-10's pins are string-contains only; no behavioral multi-user test exists anywhere.** `tests/owner-scoping.test.ts:71-77` asserts each reset `deleteMany` CONTAINS the substring `ownerId` — a future regression scoping to any other variable (a body-supplied id, a wrong guard field) passes the pin. The settings pin (line 122-133) asserts only that `ownerId` appears somewhere in the file. Repo-wide: zero cross-user/second-user tests; the e2e suite runs single-user. The ROUTES are correct today (`guard.user.id` verified on every delete) — the pins just cannot catch semantic regressions. | `tests/owner-scoping.test.ts:71-77,122-133`; `rg "second user\|cross-user\|other user" tests/` (zero hits) | **R-12** |
| F-215d | Medium | **No upgrade path for a populated pre-R-10 database across the required-column change.** No `prisma/migrations` exists (the documented workflow is `db:push`); prisma 7 REFUSES to add a required column to a populated table even under `--accept-data-loss` (the F-214m live proof). A real self-hosted install upgrading across R-10 must either `--force-reset` (loses ALL data) or hand-migrate SQL. DEPLOYMENT.md §5 documents neither. | `prisma/` (no migrations dir); `docs/DEPLOYMENT.md:82-91` (§5 "Updating" — no schema-change note); F-214m's live refusal | **R-12** (documented procedure) |
| F-215e | Medium | **The seed wipes EVERY account's domain data.** `prisma/seed.ts` main() opens with SEVEN unscoped `deleteMany()` calls (transaction/incomeSource/bankAccount/investment/goal/budget/setting — install-wide) before the demo upsert. R-10's own premise (open signup, multiple accounts) makes the documented `bun run db:seed` an operator-triggered install-wide wipe on any multi-user deployment — the same class F-214a cured in the API, alive in the seed. | `prisma/seed.ts` (main()'s seven unscoped deletes, verified by direct read); the demo upsert that follows them | **R-12** |
| F-215f | Medium | **Import advertises XLS/XLSX but parses CSV text only.** `accept=".csv,.xls,.xlsx,text/csv"` + the hint "CSV, XLS, XLSX up to 10MB" (`src/app/(app)/import/page.tsx:195,201`) + README:39 — but `extract()` is `f.text()` + `parseCsv`: a binary .xlsx decodes to garbage and dies with the misleading "Could not detect the required columns". The reference probe (session 215, live): the reference's accept attr + hint are BYTE-IDENTICAL to ours — and its bundle carries NO xlsx parsing library (the only "xlsx" occurrence IS the accept string) — the false advertising is the reference's own, inherited. The accept + hint are therefore PARITY SURFACES (kept byte-identical); the cure is the honest error branch on the non-CSV path (a functional superset, no happy-path DOM change). | `src/app/(app)/import/page.tsx:104-105,195,201`; the live reference probe (`scripts/ref-import-probe.ts`, this session); `grep -c xlsx` on the reference bundle = 1 (the accept string) | **R-12** |
| F-215g | Low | **The users PATCH docblock describes behavior that does not exist; the photo/upload surface is dead.** The docblock claims "an explicit null clears it, an absent key leaves it untouched" and "the photoUrl prefix contract + the 500 cap live in profileUpdateSchema" — the schema (`src/lib/schemas.ts:449-455`) is name-only (min 1, max 80); PATCH updates `name` alone; `photoUrl` is read-only everywhere; `/api/upload` + `/api/uploads/[name]` have zero UI consumers; `next.config.ts:36-37` claims "the photo-upload e2e pair ran GREEN" — no such spec exists. | `src/app/api/users/route.ts` (PATCH docblock + handler); `src/lib/schemas.ts:449-455`; `rg "api/upload" src/` (zero UI consumers) | **R-12** (docblock + comment cures; the upload ROUTES stay — bounded, guarded, and the PAD documents them) |
| F-215h | Low | **Two runtime dependencies serve only dead modules.** `jspdf` + `html2canvas-pro` are imported solely by `src/lib/pdf-export.ts` (zero consumers); `src/lib/download.ts` is also consumer-free; README:46,64 + PAD:129 + SKILL:127 advertise "PDF export / client-side statements" — a feature that does not exist in the UI (the Settings export button is a real anchor to `/api/export`, the JSON GDPR export). Dead runtime weight on the lockfile + `bun audit` surface. | `rg "pdf-export\|@/lib/download\|jspdf\|html2canvas" src/` (zero non-self hits); `src/app/(app)/settings/page.tsx` (the real `/api/export` anchor) | **R-12** |
| F-215i | Low | **The settings lazy-create race can 500.** `readSettings` (`src/app/api/settings/route.ts:13-23`): findUnique → null → create, with no P2002 catch — two concurrent first-touch GETs (a user's first visit opening parallel tabs) both create; the loser hits the `Setting.ownerId @unique` constraint and surfaces `ERR.INTERNAL()`. | `src/app/api/settings/route.ts:13-23`; the R-10 schema (`Setting.ownerId @unique`) | **R-12** |
| F-215j | Low | **The break-even month gets the "spending more than you earn" verdict.** Insight #2 gates on `rate > 0` (`src/lib/ai.ts`); `savingsRate` returns 0 for zero income AND for exact break-even (and rounds sub-0.05% to 0) — a month with income ≈ expenses (>0) renders the warning "You're spending more than you earn" — false at equality. The F-214j cure fixed the zero-income half; the equal half remains. | `src/lib/ai.ts` (the `if (rate > 0)` gate + the else-if branch); `src/lib/finance.ts` savingsRate (0 at break-even) | **R-12** |
| F-215k | Low | **PAD architecture-diagram drift: "uploads/ 10MB bounded"** vs `MAX_UPLOAD_BYTES = 5MB` (`src/lib/uploads.ts:25`). The F-214i doc-drift cure fixed PAD:594 but missed the diagram node (PAD:266). | `Project_Architecture_Document.md:266`; `src/lib/uploads.ts:25` | **R-12** (in-commit) |
| F-215l | Low | **`scripts/prisma-env.ts:40` ships the suffix-form direct-execution guard** (`process.argv[1]?.endsWith("prisma-env.ts")`) — the exact anti-pattern the F-210c lesson banned and cured for the four capture tools (exact `path.basename` match). No sibling currently collides; the doctrine's own wording ("a guard a sibling's filename can satisfy is not a guard") makes this a standing inconsistency. | `scripts/prisma-env.ts:40`; the F-210c cure (`tests/fullpage-sweep-tool.test.ts:302-324` pins the exact form for the four tools) | **R-12** (in-commit) |
| F-215m | Informational | **The role dimension is inert.** Signup's first user becomes `"admin"` (`src/app/api/auth/signup/route.ts:84`, `schema.prisma:32`) but no admin surface exists (the users list died with R-10); role is display-only metadata. Documented here; no cure programmed (removing it would be a schema change for zero behavior gain). | `src/app/api/auth/signup/route.ts:84`; `prisma/schema.prisma:32` | none |
| F-215n | Informational | **The lowercase route twins carry no per-page metadata** (documented-by-design at `src/lib/site.ts:44-49` — the capital `.jsx` bridges own the `pageMetadata()` calls; `/settings` inherits the root layout title). Noted for the record; the design is deliberate. | `src/lib/site.ts:44-49` | none |
| F-215o | Informational | **The smoke ladder's silenced `db:push`/`db:seed` (`>/dev/null 2>&1`) can die with zero output** — the "dead script" failure mode F-214m itself named. The `rm -f db/smoke.db` cure makes failure unlikely; a loud on-fail path would make it observable. | `scripts/smoke-test.sh:63-64` | **R-12** (in-commit) |
| F-216a | Medium | **The Import commit's 5000-row contract is blocked by the global 16KB body ceiling.** `parseBody` rides `readBoundedJson`, which enforces `MAX_AUTH_BODY_BYTES = 16 * 1024` (the auth-family ceiling) on EVERY route — while `csvImportSchema` contracts `.max(5000)` rows and the Import page slices the preview to 5001 rows and posts ALL of them in ONE request. A minimal row is ~115 bytes → 16KB ≈ ~140 rows; realistic rows (~40–80-char descriptions) cap at ~60–100. A real bank-CSV import above that dies with "Request body too large" against the UI's own "all will be imported" promise. No e2e ever posts a >16KB import, so the conflict is invisible to the gate (the schema test bypasses the HTTP seam). | `src/lib/api.ts:76` (the ceiling) + `:128/:161` (readBoundedJson layers 2–3); `src/lib/schemas.ts:476` (.max(5000)); `src/app/(app)/import/page.tsx:97` (slice 5001) + `src/stores/wealthos-store.ts` (the single-request commit) | **R-13** |
| F-216b | Medium | **The S48-P1 formula-injection guard has ZERO behavioral coverage, and `csv.ts` cites a test file that does not exist.** The docblock claims "tests/csv-formula-guard.test.ts pins the whole contract, including the round-trip trade-off" — that file died in the session-199 suite rewrite (`git log --diff-filter=D`) and was never recreated. `tests/csv.test.ts`'s three toCsv cases use no `=`/`+`/`@`/tab/CR cells; `guardFormulaPrefix` appears in no test file (only a comment in analytics-export-seam). Since R-12 the guard rides the analytics export — a regression of the regex or the escapeCell call ships green. The exact "cure lands where nothing pins it" class F-215a cured, plus the phantom-reference class F-215b cured. | `src/lib/csv.ts:28-29` (the phantom claim) + `:36` (the guard); `ls tests/` (no csv-formula-guard); `tests/csv.test.ts:16-29` (no formula fixtures) | **R-13** |
| F-216c | Medium | **No loading states on any client page — `LoadingBlock` is dead code.** The store sets `loading` (`wealthos-store.ts`) but NO page consumes it; `LoadingBlock` (`page-parts.tsx:211`) has zero consumers. Every hard load flashes the misleading "No X yet" empty state (with its "Add your first X" CTA) while `/api/dashboard` is in flight. | `src/components/shared/page-parts.tsx:211` (dead); `src/stores/wealthos-store.ts` (loading set, never read by pages); all 9 `src/app/(app)/*/page.tsx` | **R-13** |
| F-216d | Medium | **Hydrate/refresh failures are silent.** `refreshAll` has no failure branch (errors swallowed — `if (res.ok) {...}` with no else); `store.error` is written by `hydrate` but rendered by NO page; the dashboard/analytics Refresh buttons fire-and-forget (`void store.refresh()`). A failed initial hydrate leaves the page in the empty state with no retry affordance; a failed Refresh click is a dead no-op. | `src/stores/wealthos-store.ts` (refreshAll, error); `src/app/(app)/dashboard/page.tsx:120` (onRefresh); `src/app/(app)/analytics/page.tsx` (its Refresh) | **R-13** |
| F-216e | Medium | **Nested interactive elements: the QuickAction renders `<Link><button/></Link>`.** Two tab stops for one destination, ambiguous SR announcement — invalid HTML nesting. axe-core's `nested-interactive` rule only matches roles with `childrenPresentational` (`button` yes, `link` no), so the a11y two-gate is STRUCTURALLY blind to link-wrapped buttons — the e2e green is real but the defect class is invisible to it. The code comment honestly notes the reference ships the same nesting (F-209a parity-inherited); the cure keeps the visual genus (same classes on the anchor) while fixing the nesting. | `src/app/(app)/dashboard/page.tsx:562-573` (QuickAction) | **R-13** |
| F-216f | Medium | **The F-215h doc cure is incomplete — the claims-vs-reality tail the round itself existed to close.** `wealth-os_SKILL.md:127` still advertises the deleted PDF export (`jspdf` 4.2.1 + `html2canvas-pro` 2.6.3 + `src/lib/pdf-export.ts`) — the lockstep commit's own message named "SKILL:127" as cured; `Project_Architecture_Document.md:303` still says the export path "streams JSON/PDF"; `docs/DEPLOYMENT.md:76` still says the seed "wipes domain tables" (R-12 scoped it to the demo owner); the reset route's session-36 comment says "seven deleteMany" (six run); `scripts/install_packages.sh` still installs the dead deps (via npm, no less); `scripts/discover-198.ts:195` readFileSync's the deleted module (ENOENT if re-run); `src/lib/csv.ts:1/:69` keeps the neo-crm lineage ("export endpoints" plural, "contacts CSV" — the Import is bank-transaction CSV). | `wealth-os_SKILL.md:127`; `Project_Architecture_Document.md:303`; `docs/DEPLOYMENT.md:76`; `src/app/api/reset/route.ts:25`; `scripts/install_packages.sh`; `scripts/discover-198.ts:195`; `src/lib/csv.ts:1,:69` | **R-13** |
| F-216g | Low | **The live OTP code + email land in server logs unconditionally.** `console.info` at signup:91 and resend:55 prints the 6-digit code regardless of `NEO_DISABLE_IN_APP_OTP` — in the production posture (kill-switch `=1`, codes hashed at rest, absent from responses) a live OTP + PII still lands in the logs, defeating the hashed-at-rest posture for anyone with log access. | `src/app/api/auth/signup/route.ts:91`; `src/app/api/auth/resend/route.ts:55` | **R-13** |
| F-216h | Low | **`dateField` accepts free-form and rollover dates.** Verified live: `Date.parse("2026-02-30")` is NOT NaN in V8 — it rolls to 2026-03-02 and stores silently as March 2; `"02/30/2026"` rolls the same; `"March 5, 2026"` passes free-form. No in-app surface produces these (dialogs send `yyyy-mm-dd` from `type="date"` inputs; the Import page sends full ISO) — the tightening is defense-in-depth at the boundary. | `src/lib/schemas.ts:113-118`; node repro (this session): `"2026-02-30" → 2026-03-02T00:00:00.000Z` | **R-13** |
| F-216i | Low | **The Expenses filters popover lacks Escape/outside-click close.** A plain conditional div — every other transient surface (the drawer, dialogs, dropdowns) closes on Escape; keyboard users must tab back to the ✕. No WCAG failure; a usability gap against the app's own patterns. | `src/app/(app)/expenses/page.tsx:147-182` | **R-13** |
| F-216j | Low | **Dead exports and vestiges — drift hazards for future consumers.** `MOBILE_NAV_SHEET.overlay` (a scrim the real full-screen drawer intentionally does not render), `NAV_LAYOUT.icon`/`label`, `PERIOD_SEGMENT`, `GRID_COLS` (`page-layout.ts`); the `chart-no-outline` `@utility` (`globals.css`); the `search` store action (zero UI consumers); the Import page's no-op ternary (`type === "income" ? "Other" : "Other"`). | `src/lib/page-layout.ts`; `src/app/globals.css:454`; `src/stores/wealthos-store.ts:361`; `src/app/(app)/import/page.tsx:108-110` | **R-13** |
| F-216k | Informational (dismissed, verified) | **The settings `{}`-body suspicion is NOT a bug.** The audit flagged `settingsUpdateSchema` all-optional → `db.setting.update({ data: {} })` as a possible 500; verified live against Prisma 7 this session: the empty-data update is a clean no-op returning the row (200). Recorded so the next audit does not re-derive it. | `src/app/api/settings/route.ts` (PUT); live probe this session (`RESULT empty-update-ok currency=USD`) | none |
| F-217a | Medium | **The F-216i outside-close listener breaks the Expenses filters popover's own Select — mouse users cannot apply a category filter.** The listener closes on any `pointerdown` outside `[aria-label="Expense filters"]` or a `button[aria-expanded]` — but the Category `<Select>` renders its options through a **body portal** (`select.tsx:68` `SelectPrimitive.Portal`), outside the popover group, and a `SelectItem` is a `div[role="option"]` (not a `button[aria-expanded]`): pointerdown on an option fires `setFiltersOpen(false)` mid-pick, the popover (parent of the Select root) unmounts, and the selection never registers. Live-reproduced this session: mouse-pick "🛒 Groceries" → popover unmounts, select value unchanged, filter NOT applied. Keyboard (Enter) still works — the e2e Escape leg never covered the pointer path. Also: the `button[aria-expanded]` guard matches ANY expanded button (the drawer hamburger included), and one Escape closes both the Select and the popover (Radix `preventDefault` does not `stopPropagation`). | `src/app/(app)/expenses/page.tsx:70-75` (the guard); `src/components/ui/select.tsx:68` (the portal); live repro `scripts/probe-217-m1.ts` (this session) | **R-14** |
| F-217b | Medium | **`/api/ai/coach` still carries the F-216a conflict class: the schema admits ~242KB, the seam caps at 16KB.** `aiCoachSchema.history` = 30 × content-max-4000 (JSON-escaped worst case ≈ 242KB with quote-heavy content) while the route calls `parseBody(req, aiCoachSchema)` on the 16KB default — a schema-legal payload dies "Request body too large" before validation. The route's own docblock sanctions `history` "for a future LLM provider" — exactly the large-honest-payload class `maxBytes` was built for. No first-party impact today (the client sends only `{ question }`, ≤ ~600B) — a latent contract inconsistency, the incomplete tail of the F-216a cure. | `src/app/api/ai/coach/route.ts:15` (default cap); `src/lib/schemas.ts:499-507` (the 30×4000 history); `src/lib/api.ts:82,145` (the parameterization R-13 shipped) | **R-14** |
| F-217c | High | **The dark-mode token set is incomplete — 7 tokens never flip, so every dialog, the Select listbox, and the sidebar user-menu render white panels with light text (1.09:1 / 1.00:1 — invisible).** The `.dark` block (`globals.css:322-335`, R-11's F-214e) flips the shadcn neutral set (card/popover/secondary/accent/muted-foreground/input) but NOT `--color-surface/foreground/ink/muted-ink/line/line-soft/line-strong`. Consequences, live-verified this session (dark mode, our dev server): the Accounts dialog panel computes `rgb(255,255,255)` while its title computes `rgb(245,245,244)` — 1.09:1; the sidebar user-menu's "Dark Mode" item computes `rgb(28,25,23)` on the `dark:bg-stone-900` menu — 1.00:1 (the desktop dark-mode toggle-off is INVISIBLE to the very users who need it); `DIALOG_CONTENT.base` is `bg-surface`, `SelectContent` is `bg-surface text-foreground`, `MENU_ITEM` inherits the body's `text-foreground` — all unflipped. The `.dark body { color:#f5f5f4 }` base-layer rule (globals.css:312-315) is INERT — a base-layer declaration can never beat the `text-foreground` utility on `<body>`. Meanwhile the LIVE REFERENCE (probed this session, fresh-context login): defaults `html.dark`, body `#0a0a0a`/`#fafafa`, its dialog panel measures **#0a0a0a** with #262626 border and #fafafa labels, its Select listbox `rgb(10,10,10)`/`rgb(250,250,250)` — our white panels are a genuine PARITY DIVERGENCE, invisible to the gates because the sweeps capture settled pages (dialogs/menus closed) and the a11y two-gate runs light-mode only. Page surfaces are unaffected (every page-card genus carries its own explicit `dark:` arms — verified by grep: `bg-surface`/`border-line`/`text-ink` appear in NO page surface, only in the dialog/select/dropdown/button/toast seams). | `src/app/globals.css:322-335` (the .dark block) + `:46-85` (the unflipped tokens) + `:312-315` (the inert rule); `src/lib/page-layout.ts:237,243-244,283-284` (DIALOG_CONTENT/DIALOG_TITLE/MENU_ITEM); `src/components/ui/select.tsx:84`, `dropdown.tsx:28`, `button.tsx:43,56,74` (bg-white/bg-surface/neutral-900 tails), `toast.tsx:117-119,140`; live probes: our `scripts/probe-217-ours.ts` + the reference `scripts/probe-217-reference{,2}.ts` (this session) | **R-14** |
| F-217d | Medium | **The email-verification gate dissolves after the 15-minute TTL — and the resend no-ops for the same accounts.** `isVerificationPending` returns `exp > Date.now()` (verification.ts:70-74), and login blocks ONLY while pending (login route:50-52): an account that never verified has a past expiry → pending false → login proceeds to a session. The gate's own contract ("an unverified account cannot sign in", S21-P5, the reference's live-verified banner) holds for exactly 15 minutes. The pass-through comment cites "pre-session-21 rows" — but those carry a NULL hash and already pass via the null check; the expired branch guards only never-verified accounts. Compounding: the resend route (resend:39) requires `isVerificationPending` — for an expired account it answers the no-op banner, so the locked-out account cannot even get a fresh code. Cure: login gates on `verificationCodeHash != null` (any hash = never verified, expired or not; verify-success clears the hash, verify:84-87), and resend re-arms for hash-present accounts. | `src/app/api/auth/login/route.ts:44-53`; `src/lib/verification.ts:70-74`; `src/app/api/auth/resend/route.ts:39`; `src/app/api/auth/verify/route.ts:84-87` (the hash clear) | **R-14** |
| F-217e | Medium | **The mobile drawer's keyboard Tab order runs into the page content behind the opaque overlay.** MobileNav renders BEFORE the header+main in DOM (app-shell.tsx:45-59) and nothing moves focus on open: from the hamburger, Tab lands on page content `inDrawer:false` — behind the fixed full-screen overlay (WCAG 2.4.3). The drawer's links are reachable only by repeated Shift+Tab. The non-Radix construction (correct — the aria-hidden trap) simply never grew the compensating focus management; the shell's other closers (dialogs) get it from Radix. | `src/components/layout/app-shell.tsx:45-59` (DOM order); `src/components/layout/mobile-nav.tsx:70-76` (no focus move); audit 217-c live probe (Tab from the hamburger → "AI Coach" behind the overlay) | **R-14** |
| F-217f | Low | **The sitemap advertises the metadata-poor lowercase twins — every listed URL declares the homepage canonical.** `sitemap.xml/route.ts` lists `/accounts`…`/settings`, but the per-route metadata (title/canonical/OG) lives ONLY on the Capital `.jsx` twins (the lowercase `page.tsx` files are `"use client"` and cannot export metadata): `/income` renders title "WealthOS" + canonical `/` — the sitemap's nine URLs all self-canonicalize to the homepage, functionally inert for any crawler. The reference's sitemap lists the CAPITAL locs (live-fetched this session: `/Accounts /Analytics /Expenses /Goals /Import /Income /Investments /Settings`); our lowercase choice was the documented s14 decision ("the real lowercase routes the router actually serves") — but the twins serve BOTH forms, so the Capital locs are both reference-cased and metadata-rich. | `src/app/sitemap.xml/route.ts:21-31`; the reference sitemap (live fetch this session); `tests/metadata.test.ts` (the pin to update in-commit) | **R-14** |
| F-217g | Low | **Authenticated API responses carry no `Cache-Control`.** The `ok()/fail()` envelope (api.ts) sets only the JSON content-type + the global security headers — financial-data GETs (`/api/transactions`, `/api/dashboard`, `/api/export` — the full GDPR dump) can be heuristically cached by browsers/intermediaries on shared machines or caching proxies. The uploads GET is unaffected (its own `public, max-age=31536000, immutable` — correct for capability URLs). | `src/lib/api.ts` (ok/fail); live curl of `/api/auth/me` + `/api/transactions` (audit 217-b, verified: no Cache-Control) | **R-14** |
| F-217h | Low | **No CSP `frame-ancestors` / `X-Frame-Options`.** `next.config.ts:100-114` ships Referrer-Policy/nosniff/HSTS only — the authed app is framable (clickjacking surface; practical exploitation constrained by the JSON CSRF gate + SameSite=Lax, but the one-line functional-superset header closes it). The header set is pinned by `tests/http-headers.test.ts` — the pin extends in-commit with the addition (the bare-HSTS reference-parity pin stays untouched). | `next.config.ts:100-114`; `tests/http-headers.test.ts:60-75` | **R-14** |
| F-217i | Low | **The F-216j dead-export sweep left two tails: the `SearchResults` interface and the untested `/api/search` route.** R-13 deleted `store.search` (zero UI consumers) but `SearchResults` (`types/index.ts:113-118`) remains exported with zero importers — and the route that shaped it has no test coverage of any kind (no unit pin, no e2e leg, no smoke rung). The route itself is a real, owner-scoped API surface (README documents it) — it stays; the dead interface retires (the F-216j doctrine) and the route joins the owner-scoping pin family. | `src/types/index.ts:113-118`; `src/app/api/search/route.ts`; `rg "SearchResults" src/ tests/` (zero importers) | **R-14** |
| F-217j | Low | **`dateField` accepts offset datetimes inconsistently and zoneless datetimes TZ-dependently.** The F-216h round-trip compares the UTC-normalized date against the string's literal prefix: `"2026-01-15T23:30:00+05:00"` passes but `"2026-01-15T00:30:00+05:00"` rejects; `"2026-01-15T23:30:00"` (zoneless) passes on a UTC server and rejects on UTC−5. In-app senders are all safe (`type="date"` inputs + the Import page's Z-form `toISOString()` — verified) — third-party API callers get semi-random 400s. Cure: tighten the regex to the two sanctioned forms (`yyyy-mm-dd` and `yyyy-mm-ddTHH:mm:ss(.sss)?Z`), pin both. | `src/lib/schemas.ts:121-130`; audit 217-a empirical matrix (this session) | **R-14** |
| F-217k | Low | **`hydrate()` never clears a stale `error` at entry — the retry face shows contradictory state.** The R-13 error banner's Try-again calls `hydrate()`, which sets `loading: true` but leaves the previous `error` set until the fetch resolves: mid-retry the shell renders BOTH the stale banner and the LoadingBlock; and a retry landing on 401 sets `{ hydrated: true, loading: false, user: null }` without touching `error` — a stale non-auth error keeps showing after the failure mode changed. | `src/stores/wealthos-store.ts:153-155,175-179`; `src/components/layout/app-shell.tsx:61-82` | **R-14** |
| F-217l | Low | **The mutation actions read `sessionWriteToken` at `refreshAll`-invocation time, violating the write-guard's own "captured at entry" contract.** The docblock (store:48-52) says every fetch captures the token at entry; `hydrate`/`logout` comply, but the mutation actions pass the CURRENT `sessionWriteToken` to `refreshAll` only AFTER their mutation fetch resolves — a logout completing in between bumps the token first, the post-fetch guard passes, and `refreshAll(N+1)` can write the previous user's dashboard payload into the cleared store (single-tab sub-second window; login re-bumps the token, so no cross-user persistence). | `src/stores/wealthos-store.ts:202-347` (the pattern); the docblock `:48-52` | **R-14** |
| F-217m | High (recorded — owner decision required) | **The in-band delivery default posture: the forgot-password response carries the live reset link, the resend response the live OTP, whenever the `NEO_DISABLE_IN_APP_*` knobs are unset** — the shipped default. Documented demo posture (the digma ADR-014 family), boot-warned in production since F-214f, knob-gated, no-enumeration envelope preserved. The audit's recommendation: invert the production default (in-band only when `NODE_ENV !== "production"`) or make the posture boot-fatal like AUTH_SECRET. Rejected THIS round: flipping the default changes the env contract's semantics and the demo/e2e flows (the Playwright standalone boots NODE_ENV=production and relies on in-app delivery); the posture is ADR-documented and boot-warned. Recorded for the owner's explicit ask — the same standing status as R-5. | `src/app/api/auth/forgot-password/route.ts:68,107-112`; `src/app/api/auth/resend/route.ts:60-74`; `src/lib/boot-env.ts:100-107` (the warn); `.env.example:57` | none (owner ask) |
| F-217n | Informational | **The a11y two-gate runs light-mode only — the entire F-217c family was invisible to it.** Folded into R-14 as the dark-mode axe leg (a per-section dark variant of the SECTIONS loop). | `tests/e2e/a11y.spec.ts:112-126` (no theme write) | **R-14** (the dark leg) |
| F-217o | Informational (deferred) | **Upload content-type validation trusts the client-declared MIME** — no magic-byte sniffing; a sessioned user can store arbitrary bytes (≤5MB) served as `image/*` at unguessable URLs under nosniff (content-hosting abuse, not XSS). Hardening candidate; deferred (Low, self-hosted threat model). | `src/app/api/upload/route.ts:54-58` | none |
| F-217p | Informational (deferred) | **scrypt rides the Node default cost (N=16384)** — below OWASP's interactive floor (N ≥ 2^16). Salt/key-length/timing-equalizer correct; the residual is offline-cracking pace on a stolen DB. Deferred (a cost bump re-hashes nothing retroactively — needs the versioned-hash format first). | `src/lib/password.ts:15` | none |
| F-217q | Informational (standing) | **The whole-store `useWealthOs()` subscription pattern persists across all 9 pages (14 call sites)** — F-214l's standing note, re-flagged by this audit. No correctness impact (no derived state in store); the `useShallow` sweep stays "only if a page ever proves render-bound". | 14 call sites (audit 217-c enumeration) | none (standing) |
| F-217r | Informational (parity) | **Destructive deletes carry no confirmation** — one click permanently removes financial records (accounts/expenses/budgets/investments). The reference's own UX (no confirms observed on its faces); parity genus, recorded. | `src/app/(app)/*/page.tsx` (the delete buttons) | none |
| F-217s | Informational (deferred) | **The Expenses filter-tabs' inactive `aria-controls` dangle** (4 tabs, one panel — three referenced ids don't exist). Minor ARIA wiring; the Analytics tabs use the component correctly. Deferred. | `src/app/(app)/expenses/page.tsx:213-292`; `src/components/ui/tabs.tsx:150` | none |
| F-217t | Informational (parity) | **No `noindex` on the auth pages; robots.txt allows all** — mirrors the reference's own robots (live-fetched: `Allow: /`). The auth faces are sitemap-excluded; recorded as the reference genus. | `src/app/robots.txt/route.ts:13-16`; the reference robots (live fetch) | none |
| F-217u | Informational (doc note) | **Rate-limit IP keying trusts the last XFF hop when `NEO_PROXY_HOPS` is unset (default 1)** — fail-open for the direct-exposure topology (no proxy present, client-suppliable XFF). The knob (`0`) exists and fails closed; DEPLOYMENT.md should name it in the direct-exposure path. | `src/lib/rate-limit.ts:79-99` | none (doc note) |
| F-217v | Informational (deferred) | **The seed re-writes the publicly documented demo credential on every run** — any production install that runs `db:seed` keeps a known-credential account forever (role "user", demo data only). A production-seed guard is the candidate; deferred (self-hosted demo posture). | `prisma/seed.ts:5,45,58` | none |
| F-218a | High | **The expired-verification lockout — the signin 403 has no client recovery path.** R-14's server cure is coherent (login 403s `VERIFICATION_REQUIRED` for any hash-present account; resend re-arms it), but the client renders the 403 as a banner only: the verify view — the ONLY surface with the Resend link — is entered solely via a successful signup (`setView("verify")` appears once, on the signup success arm), `nextLoginView` has no signin→verify edge, re-signup answers "already exists", and the password-reset flow never clears the hash. An account whose code expired (sign up → return later — a common path) is permanently locked out of the UI; pre-R-14 it signed in. | `src/app/api/auth/login/route.ts:56-57` (the code-carrying 403); `src/components/layout/login-card.tsx:136-138` (banner only), `:177` (the only verify transition); `src/lib/login-reset.ts:54-62`; `src/app/api/auth/resend/route.ts:36-49` (the re-arm the client cannot reach) | **R-15** |
| F-218b | High | **The Expenses filters trigger cannot close its own popover — an R-14 regression (live-reproduced).** F-217a's cure deleted the pre-R-14 `button[aria-expanded]` outside-close guard but never landed the trigger-scoped replacement its own comment claims ("the expanded-button guard is scoped to the popover's OWN trigger"): the trigger carries no `aria-label="Expense filters"` (that label rides the popover PANEL, a DOM sibling — `closest()` never matches), so pointerdown on the trigger fires `setFiltersOpen(false)`, the effect detaches, and the subsequent click toggles false→true — the popover flicker-reopens. Every mouse user clicking the primary toggle to dismiss finds it dead; ✕/Escape/outside-click still work (why the e2e battery — which covers the Select pick and the outside close, never the trigger toggle — stayed green). | `src/app/(app)/expenses/page.tsx:85-93` (the guard family), `:181` (the label-less trigger), `:194` (the panel carrying the label); `tests/expenses-popover.test.ts:33-37` (the negative-only pin that let it ship) | **R-15** |
| F-218c | Medium | **`/api/export` — the GDPR dump — carries no `Cache-Control: no-store`** (live-reproduced: the authenticated 200 answers `cc:null`). The route returns a raw `NextResponse` (Content-Type + Content-Disposition only) and never rides the `ok()/fail()` envelope whose F-217g no-store it is named in — api.ts's comment claims "transactions, dashboard, export — the GDPR dump" coverage; the http-headers pins only cover the envelope arms. The most sensitive response in the app (every transaction, account, balance, goal) ships with no cache prohibition — RFC 9111's absent-directive default lets intermediaries store it. | `src/app/api/export/route.ts:40-45`; `src/lib/api.ts:11-21` (the claim); `tests/http-headers.test.ts:104-108` (the pin gap) | **R-15** |
| F-218d | Medium | **UTC-midnight storage + local-accessor bucketing mis-renders 1st-of-month rows for every UTC-negative user.** `dateField` accepts `yyyy-mm-dd`; `new Date("2026-11-01")` parses as UTC midnight; Prisma returns `2026-11-01T00:00:00.000Z`; then `sameMonth`/`startOfMonth`/`addMonths` (finance.ts:64-75) and `formatDateByPattern`/`toDateInputValue` (format.ts:38-69) read LOCAL calendar parts. Verified live: in America/New_York a Nov 1 transaction renders `10/31/2026`, buckets into October (dashboard KPIs, cashflow series, budget-vs-actual, health score, the AI coach's own seams), and the edit prefill — a RAW `new Date(editing.date)` bypassing `toDate` — would re-store the wrong day on save. The sandbox runs UTC, which is why every gate is blind. Rent/mortgage on the 1st is the canonical case. | `src/lib/finance.ts:60-75,114` (the local-accessor seams behind `toDate`); `src/lib/format.ts:38-69`; the raw-parse prefill sites `src/app/(app)/expenses/page.tsx:360`, `income/page.tsx:215`, `goals/page.tsx:208` | **R-15** |
| F-218e | Medium | **`updateSettings` is the only store writer outside the sessionWriteToken guard.** The module's own docblock ("every fetch captures this token at entry and may only write while it still matches") holds for all 19 other fetchers; updateSettings writes `set({ settings })` unguarded — a logout or hydrate landing mid-PUT lets the stale response write the PREVIOUS user's settings (currency, dateFormat, theme, alerts) into the cleared store. R-14's exclusion reasoning ("it set()s directly, no refreshAll") missed that the guard exists for the set() itself. | `src/stores/wealthos-store.ts:48-52` (the contract), `:379-386` (the unguarded writer) | **R-15** |
| F-218f | Medium | **The upload route's chunked-multipart bypass — `formData()` buffers unbounded memory before any size check.** The Content-Length pre-gate is skipped by `Transfer-Encoding: chunked`; `request.formData()` then buffers the entire body and only the POST-PARSE `file.size` ceiling runs — it bounds the stored file, not the buffered memory (the in-repo comment admits the gap and calls the post-parse ceiling "the backstop"). Any sessioned caller (signup is open) can OOM the single-process server with one chunked multi-GB POST. | `src/app/api/upload/route.ts:42-63` | **R-15** |
| F-218g | Medium | **The heaviest sessioned endpoints ride no rate buckets** — `/api/import` (a 4MB / 5000-row `createMany` per request), `/api/ai/coach` (five full-table `findMany`s per request), `/api/reset` (the destructive wipe) are unlimited while the lone sessioned limited route (upload) carries 20/15min. One open-signup session can hammer SQLite contention for all users; the destructive reset replays freely. | `src/app/api/import/route.ts`; `src/app/api/ai/coach/route.ts`; `src/app/api/reset/route.ts`; the family precedent `src/app/api/upload/route.ts:21` | **R-15** |
| F-218h | Medium | **Toasts are unannounced to screen readers (WCAG 4.1.3).** The always-mounted viewport is `role="region"` — NOT a live region; each ToastCard inserts with `role="status"` AT PUSH TIME, and a live region that arrives with its content is not announced (the region must pre-exist in the a11y tree). Toasts are the sole feedback channel for every mutation outcome; the coach's busy dots and replies share the class. | `src/components/ui/toast.tsx:72-87,102-105`; `src/components/shared/ai-coach.tsx:122`; `tests/toast-anatomy.test.ts:80` (the pin that freezes the wrong anatomy) | **R-15** |
| F-218i | Medium | **The focus-indicator family fails SC 1.4.11 on light surfaces — and `--color-ring` never flips in `.dark`.** amber-400 rings on white compute 1.67:1 (at /60 ≈1.4:1, at /40 ≈1.3:1), slate-400 ≈2.5:1 — against the 3:1 non-text bar — across the dialog close, the tab strips, the checkboxes, the login inputs, and every page-level bespoke input (`focus-visible:ring-amber-400`, ~30 light-surface sites). Meanwhile `--color-ring` (#1c1917) is unflipped in `.dark`, so input-base's focus box-shadow is near-black on dark inputs — invisible — the exact F-217c token class on the ring token. The dark-surface amber-400/60 rings (sidebar/drawer gradient) pass ≈9:1 and keep their cited genus. | `src/lib/page-layout.ts:204,209,253,288,299,305,348`; `src/lib/login-reset.ts:114,186`; the page-level inputs (accounts/expenses/goals/import/income/investments/settings/ai-coach); `src/app/globals.css:82` (the unflipped token), `:488` (input-base's invisible dark ring) | **R-15** |
| F-218j | Medium | **`text-red-500` at small sizes — 3.76:1, the latent two-gate red.** The KpiCard down-deltas (`text-xs font-semibold`), the dashboard's budget-over rows, and the investments loss cells render sub-AA exactly when users most need them; the axe gate stays green only while the seeded corpus happens to produce no negative delta on the swept faces. The repo's own doctrine (AGENTS a11y rule: "darken one Tailwind step") names the cure; the accounts balance figures are text-2xl bold (3:1 large-text bar — passing, not in scope). | `src/components/shared/page-parts.tsx:63`; `src/app/(app)/dashboard/page.tsx:369`; `src/app/(app)/investments/page.tsx:283` | **R-15** |
| F-218k | Medium | **Investment type badges: saturated 500-level inline colors on 10% tints — 2.1–3.7:1.** `style={{ backgroundColor: color+"1a", color }}` — Bond #f59e0b ≈2.1:1, ETF #10b981 ≈2.5:1, Crypto #a855f7 ≈3.2:1, Stock #3b82f6 ≈3.7:1 — all `text-xs font-medium`. The inline-style pattern is invisible to the class-based sanctioned matchers. | `src/app/(app)/investments/page.tsx:269-274`; `src/lib/constants.ts:105-112` | **R-15** |
| F-218l | Low | **`--color-muted` / `--color-subtle` unflipped in `.dark`** — the latent F-217c class on the last two app-native tokens (`--color-muted` rides the disabled-input text; the dead exports CardDescription/SelectLabel/DropdownLabel would compute 2.9:1 on dark surfaces if ever used). | `src/app/globals.css:48-49` (the tokens), `:322-355` (the .dark block without them), `:492-497` (the live consumer) | **R-15** |
| F-218m | Low | **HealthGauge's `aria-label` sits on a role-less div** (ignored by AT; the inner SVG is role="presentation") — the score/band is visual-only. | `src/app/(app)/dashboard/page.tsx:617-618` | **R-15** |
| F-218n | Low | **The sidebar avatar hardcodes `text-stone-900` under an arbitrary `avatarColor`** — a dark NAME_COLORS value renders dark-on-dark initials; the correct luminance-based `avatarTextColor(bg)` already exists in the avatar primitive. | `src/components/layout/sidebar.tsx:114-120`; the correct seam `src/components/ui/avatar.tsx:17-25` | **R-15** |
| F-218o | Low | **F-217s promoted to a cure: the Expenses tabs render ONE panel under four aria-controls triggers** — three triggers reference dead ids; Analytics renders all four correctly. | `src/app/(app)/expenses/page.tsx:243`; `src/components/ui/tabs.tsx:150` | **R-15** |
| F-218p | Low | **`POST /api/auth/logout` has no CSRF/content-type gate** — the handler never reads a body, so the s165 JSON gate never applies; a cross-site `fetch(..., {mode:"no-cors", method:"POST"})` still gets the cookie-clearing Set-Cookie applied (SameSite=Lax gates sending, never setting). Nuisance forced sign-out; no state destruction. The first-party `call()` always sends `application/json` — the gate is compatible. | `src/app/api/auth/logout/route.ts:6-9`; `src/stores/wealthos-store.ts:34,189` | **R-15** |
| F-218q | Low | **forgot/reset re-throw unexpected Prisma errors past the envelope** — both routes' comments claim "never a bare 500 past it (the no-bare-throw discipline)" yet the fallthrough arm is `throw error`, a raw non-envelope 500 where every sibling answers `ERR.INTERNAL()`. | `src/app/api/auth/forgot-password/route.ts:103-104`; `src/app/api/auth/reset-password/route.ts:95` | **R-15** |
| F-218r | Low | **signup's findUnique→create race answers 500 on P2002** — two concurrent first-signups for one email slip past the explicit duplicate check; the misleading "Something went wrong" instead of the duplicate message. The budgets upsert shares the class (create-then-catch). | `src/app/api/auth/signup/route.ts:60-89` (no P2002 arm); the family precedent `src/app/api/settings/route.ts` (the P2002 catch) | **R-15** |
| F-218s | Low | **MAX_AI_BODY_BYTES (256KB) < the aiCoachSchema's true worst case (~720KB)** — the budget comment assumes 2× quote-escaping but control characters JSON-escape to 6 bytes each (`\u0001`): a schema-legal 30×4000 control-char history is rejected "Request body too large" despite satisfying the schema. No live consumer sends it; the cap-vs-contract honesty is the point. | `src/lib/api.ts:106-115`; `src/lib/schemas.ts:507-515` | **R-15** |
| F-218t | Low | **F-217u executed: the `NEO_PROXY_HOPS` posture.** Unset defaults to depth 1 (the last, client-suppliable XFF hop keys the limiter — full bypass on a direct-exposure deployment, the DEPLOYMENT.md §2 path); DEPLOYMENT.md's env table never lists the knob and the boot gate warns only on unparsable values. Cure: the boot warning when the default rides (name the knob, name 0 for direct exposure) + the DEPLOYMENT.md row + the .env.example comment — the default stays 1 (flipping it would share one bucket across every user behind an unconfigured proxy — the mass-lockout trade is worse). | `src/lib/rate-limit.ts:79-99`; `src/lib/boot-env.ts`; `docs/DEPLOYMENT.md` §2-3; `.env.example` | **R-15** |
| F-218u | Low | **Six Select labels unassociated (no htmlFor/id)** — income ×2, accounts, investments, goals (naming falls back to the trigger's aria-label; clicking the label does nothing; Expenses/Settings already do it correctly) — and the ExpenseDialog's native checkbox carries inert color classes (`text-amber-600` on a native input is a no-op; the accent- property is the working form). | `src/app/(app)/income/page.tsx:270,285`; `accounts/page.tsx:258`; `investments/page.tsx:427`; `goals/page.tsx:294`; `expenses/page.tsx:561-567` | **R-15** |
| F-218v | Low | **hydrate's 401 discrimination keys on the message substring** ("authenticate"/"Sign in") — `call()` discards the envelope's error.code, so any rewording of ERR.UNAUTHORIZED silently converts the auth-redirect path into a hard-error banner. Threading the code through Result is a seam change; this round pins the message stability so a rewording trips a test. | `src/stores/wealthos-store.ts:180`; `src/lib/api.ts` (ERR.UNAUTHORIZED's message) | **R-15** |
| F-218w | Informational (register) | **The amber register's breadth — matcher-level sanctions exceed citation-level genus.** The a11y register's `any:` matchers (`text-white`, `bg-primary`, `bg-amber-500`, `text-amber-500`) sanction every element carrying the class, while the citations justify specific faces (the live-observed amber gradient + white bold label on primaries; the 6M chip; the sidebar gradient captions). Our superset additions wearing the register classes (the coach chat bubble, the Quick Actions h2, the filter-count badge, the HealthGauge band colors — the reference's own RadialBar genus per its docblock) ride the umbrella. Recorded: the genus is the reference's own; per-face tightening is a design decision for the owner, not a defect cure. *(Session-219 update: the citation's "white bold label on primaries" clause is DISPROVEN — F-219a's live probe measured the reference's amber primaries at stone-900 rgb(28,25,23); the umbrella's primary-button arm retires with the F-219a cure.)* | `tests/e2e/a11y.spec.ts:33-57`; the riding faces | none (register note; superseded in part by F-219a) |
| F-219a | High | **The amber CTA text genus — ours `text-white`, the reference's stone-900; the a11y register's citation is stale.** Live-measured this session (fresh login, /Dashboard + /Accounts + /Goals + /Settings): the reference's amber CTAs ("Add Transaction" `linear-gradient(to right, rgb(245,158,11), rgb(202,138,4))`, "Add Account", "New Goal", "Save Settings") compute text color **rgb(28,25,23) stone-900** — NOT white. Ours: `BUTTONS.primary` (`page-layout.ts:209`) carries `text-white`; the Button default variant rides `--color-primary-foreground: #ffffff`; the AI-coach user bubble `bg-amber-500 text-white`; the error boundaries' "Try again" rides the token. White on amber-500 measures 2.15:1 — a systemic WCAG 1.4.3 failure on the app's most-used control, latent through every gate because the sanctioned register's arm (`bg-primary`/`button[type="submit"]`/`text-white` — "the reference's own palette") carries the stale citation. The reference's own genus IS the AA cure: stone-900 on amber measures 8.1:1. | `src/lib/page-layout.ts:209` (BUTTONS.primary) + `:237` (--color-primary-foreground consumer via button.tsx:42); `src/app/globals.css` (the token); `src/components/shared/ai-coach.tsx:114`; `src/app/error.tsx:56` + `global-error.tsx:56`; the live probe (this session); `tests/e2e/a11y.spec.ts:41-57` (the stale arm) | **R-16** |
| F-219b | High | **The per-page CTA gradient genus — the reference deploys THREE CTA families by page; ours renders solid amber everywhere.** Live-measured: Income "Add Income Source" + Investments "Add Investment" = `emerald-500→teal-600` gradient + white text; Expenses "Add Expense" = `rose-500→red-600` gradient + white text; Dashboard/Accounts/Goals/Settings = the amber gradient + stone-900 (F-219a). Ours: every section CTA renders solid `bg-primary` amber + white (the Button default variant) — a systematic genus divergence on all five section toolbars. | The per-page live probe (this session); `src/app/(app)/{income,investments,expenses,accounts,goals}/page.tsx` (the CTA sites); `src/components/ui/button.tsx:42` | **R-16** |
| F-219c | High (owner-directed) | **The authenticated shell's default theme — the reference defaults DARK, ours system/light.** Live-decoded this session: a fresh-context login to the reference lands `/Dashboard` with `html.class="dark"`, body `rgb(10,10,10)`; NO theme key exists in localStorage (the default is the app's own, and the choice persists SERVER-SIDE per user — the toggle round-trip proves it: flip to light → reload → light, still no localStorage); the auth faces serve light (`/login` html.class=""). Ours: the no-FOUC bootstrap defaults `"system"` (light under a no-preference headless client) — the F-205a deferral ("not reopening"). The owner's session-219 directive ("achieve visual and functional parity with … /Dashboard") supersedes the deferral: the fresh-visitor /Dashboard is the single most visible parity surface and it renders dark there, light here. The sweeps are unaffected (planThemeWrites stores explicit per-page themes); the e2e/a11y legs that rely on the light default need explicit light in-commit. | `src/app/layout.tsx:100` (the bootstrap) + `src/components/layout/theme.tsx:75` (the "system" default); the live probes (`scripts/probe-219-theme.ts` runs, this session); `docs/session_20.md:28-29` (the deferral) | **R-16** |
| F-219d | High | **The investments purchaseDate edit-prefill still raw-parses (the FIFTH F-218d site — per-edit data drift).** `new Date(editing.purchaseDate)` in the Investment dialog prefill; purchaseDate is a `dateField` (yyyy-MM-dd → stored UTC-midnight ISO). For every UTC-negative user the prefill shows the prior day and saving re-stores it — each edit-save cycle walks the purchase date back one day (cumulative silent corruption). The parity-218 pin enumerated only "expenses/income/goals" — the exact negative-pin blind spot the R-15 commit message itself warns about. | `src/app/(app)/investments/page.tsx:371-373`; `src/lib/schemas.ts:354/388`; `tests/parity-218.test.ts:96-103` | **R-16** |
| F-219e | Medium | **The analytics month-bucketing refs are raw while the rows now re-anchor — a mixed-mode regression the F-218d cure itself introduced.** The page passes `new Date(to)` (raw; `to` is yyyy-MM-dd → UTC midnight) as the `ref` into cashFlowSeries/expenseBreakdown/budgetCategorySplit/spendingByDayOfWeek/categoryTrend, while those seams now bucket rows via `toDate(t.date)` (local midnight). When `to`'s day-of-month is 1 and the user is UTC-negative, `new Date(to)` lands on the last day of the previous month local — the trailing bucket of every series keys on the wrong month for a full day (the default `to` = today). | `src/app/(app)/analytics/page.tsx:86-92` | **R-16** |
| F-219f | Medium | **The goals card renders targetDate with a raw parse — one month early for 1st-of-month targets.** The GoalDialog prefill directly above it was cured (`toDate(editing.targetDate)`), but the card's "by {Mon YYYY}" label still uses `new Date(goal.targetDate)` — the label disagrees with the cured `goalProgress()` math beside it. | `src/app/(app)/goals/page.tsx:131-137` | **R-16** |
| F-219g | Low | **The income "next payment" relative-day label raw-parses** — `relativeDays(new Date(source.nextPaymentDate), new Date())`; the sibling dialog prefill was cured. Off-by-one-day display for UTC-negative users. | `src/app/(app)/income/page.tsx:156-158` | **R-16** |
| F-219h | Medium | **The mobile drawer clips below ~800px viewport height — Sign Out unreachable, no internal scroll.** Live-verified: at 390×667 and 844×390 the Sign Out button's bottom renders at 787px (viewport 667/390), `innerOverflow: "visible"` — the fixed inset-0 sheet has no `overflow-y-auto` while `main`'s scroll is locked. Even the last nav link (Settings, bottom 710px) is cut at 667px. The REFERENCE shares the defect (Sign Out bottom 721px, no scroll) — so the cure is the house functional-superset class (the Escape-to-close doctrine): an internal scroll on the sheet. | `src/lib/page-layout.ts:53-54` (MOBILE_NAV_SHEET inner/nav); the live probes (this session, both apps) | **R-16** |
| F-219i | Medium | **The dark metadata family fails AA — `dark:text-stone-500` at 3.16–4.13:1 on ~30 sites — plus the EMPTY_STATE subtitle (2.52:1 light) and the APP_FOOTER.** The `text-xs text-stone-500 dark:text-stone-500` metadata (dates, categories, card labels) dominates every dark-mode page; stone-500 #78716c measures 3.16:1 on stone-900 cards. The sibling constants that already carry the correct arm (`CARD.subtitle`, `SETTINGS_CARD.boxText` → `dark:text-stone-400`) prove the pattern. The EMPTY_STATE subtitle `text-stone-400 dark:text-stone-500` renders 2.52:1 in LIGHT mode; the footer `text-xs text-stone-400` same. Constant-level cures clear the whole family. | `src/lib/page-layout.ts:220,225`; the ~30 `dark:text-stone-500` sites (expenses/income/accounts/goals/import/dashboard/investments/page-parts) | **R-16** |
| F-219j | Medium | **The AI coach's assistant replies are never announced — the aria-live wraps only the textless bouncing-dots row; the user bubble rides the amber+white genus (F-219a).** A screen-reader user submits a question and hears nothing when the answer lands (WCAG 4.1.3); the busy row announces nothing either (no text). | `src/components/shared/ai-coach.tsx:92-133` | **R-16** |
| F-219k | Medium | **The display-text cluster fails AA on light surfaces.** Dashboard "Quick Actions" h2 `text-xl font-bold text-amber-500` = 2.09:1; HealthGauge score/band text in the band colors (emerald 2.54 / teal 2.49 / amber 2.15); import preview income amounts `text-emerald-600` at text-sm = 3.77:1 (the F-218j one-step precedent applies); the error boundaries' h1 `text-slate-300` on slate-50 = 1.42:1 (superset surfaces — no parity constraint); the KpiCard flat delta arm `text-stone-500` fails both modes on tinted cards. | `src/app/(app)/dashboard/page.tsx:532,629-635`; `src/app/(app)/import/page.tsx:244`; `src/app/error.tsx:42` + `global-error.tsx:40`; `src/components/shared/page-parts.tsx:64` | **R-16** |
| F-219l | Medium | **Rate-limit bucket key collision: `reset:` shared by two different endpoints.** `/api/reset` (data wipe, 3/15min) and `/api/auth/reset-password` (password reset, 10/15min) both key `rateLimit(\`reset:${clientKey(req)}\`, …)` — the fixed-window buckets silently merge to the lower threshold; the module's own header comment ("forgot 10 + reset 10") is falsified. | `src/app/api/reset/route.ts:15`; `src/app/api/auth/reset-password/route.ts:37` | **R-16** |
| F-219m | Medium | **The sessioned CRUD family and the heavy reads carry no rate buckets.** transactions/accounts/budgets/goals/investments/income-sources (+[id]) /users/settings mutations and the dashboard/export/search reads are unbounded (only login/signup/resend/verify/forgot/reset-password/upload/import/coach/reset are bucketed — 10 of 21+). Any signed-up user can hammer single-row creates (bypassing the import route's own 5/15 cap) or the six-full-table-findMany dashboard read — a co-tenant DoS on the single-node SQLite file. | grep `rateLimit(` over `src/app/api` (10 sites); the CRUD family | **R-16** |
| F-219n | Low | **The F-218i ring family's leftovers.** The dashboard quick-action Link keeps `focus-visible:ring-1` (the ring-1→ring-2 swap missed the bespoke literal); the Import dropzone's `focus-within:ring-amber-400/40` on `bg-stone-50/50` ≈1.3:1 — the exact class F-218i's own math cites. | `src/app/(app)/dashboard/page.tsx:576`; `src/app/(app)/import/page.tsx:158` | **R-16** |
| F-219o | Low | **The logout content-type gate is case-sensitive** — `contentType.includes("application/json")` while the family seam (`readBoundedJson`) lowercases. A legal `Application/JSON` client gets a 400 and cannot sign out (latent — first-party callers send lowercase). | `src/app/api/auth/logout/route.ts:17-19` | **R-16** |
| F-219p | Low | **`moneyField` accepts non-2dp amounts** — finite+range only; `3.14159` passes and stores as Float, drifting aggregates (budget-vs-actual, portfolio, health score) with sub-cent residue. | `src/lib/schemas.ts:99-111` | **R-16** |
| F-219q | Low | **Nullable-string "clear" semantics silently no-op** — `notes`/`institution` map `null`/`""` → `undefined` and the routes' `!== undefined` spreads skip the key: no payload can clear these fields once set (contrast nextDate/targetDate which handle null correctly). | `src/lib/schemas.ts:196-202,309-315,389-395,259-265` | **R-16** |
| F-219r | Low | **Four analytics chart sections render silent blanks on empty data** — Spending by Day of Week, Needs vs Wants, Income Trend, Portfolio Composition have no `length === 0 → EmptyState` gating (the sibling sections do). | `src/app/(app)/analytics/page.tsx:246-256,260-280,325-341,349-380` | **R-16** |
| F-219s | Low | **The Analytics Export button genus** — ours renders the amber primary (Button default); the reference's Export is the secondary/dark genus (measured rgb(10,10,10)+white in its dark mode = the outline family). | `src/app/(app)/analytics/page.tsx:167-170`; the live probe | **R-16** |
| F-219t | Low (latent, live-verified) | **Stored-dark on the auth faces strands the flipped body text color** — with `wealthos-theme=dark` stored, `/login` renders html.dark + bg-background #faf9f7 (the token never flips, keeping the auth faces light — parity-correct) BUT body's `text-foreground` DID flip (R-14's token family) → rgb(250,250,250) on the light wash (live-measured). The card's own slate text carries the page today; the stranded body color is one unmigrated surface away from invisible text. The reference's auth faces are ALWAYS light — the cure (force light on auth faces regardless of stored choice) is both the parity genus and the latent-bug close. | `src/app/layout.tsx:100` (the bootstrap applies stored dark globally); the live probe (this session) | **R-16** |
| F-219u | Informational | **Dead constants with sub-3:1 focus rings** — `BUTTONS.outline`/`BUTTONS.ghost` (zero consumers repo-wide) carry `focus-visible:ring-stone-400` ≈2.2:1. Delete (the live Button variants carry the real outline/ghost genera). | `src/lib/page-layout.ts:211,213` | **R-16** |
| F-219v | Informational | **The low tail.** `rate-limit.ts`'s header comment says "the 7 rate-limited routes" (there are 10, 11+ after F-219m); InfoCallout (the green resend banner) uses `role="alert"` (assertive) for a non-error status — `role="status"` is the semantic; the `--animate-fade-in`/`--animate-slide-in-right` tokens + keyframes have zero consumers; the upload route trusts the declared part MIME (nosniff-mitigated — magic-byte validation is defense-in-depth); the a11y main legs rely on the light DEFAULT (must go explicit when F-219c lands); the moon-toggle e2e test starts from the default (same). | `src/lib/rate-limit.ts:13`; `src/components/layout/login-card.tsx:807-813`; `src/app/globals.css:261-262`; `tests/e2e/a11y.spec.ts:122-135`; `tests/e2e/mobile-navigation.spec.ts:159-180` | **R-16** |
| F-220a | High | **`toDate()` re-anchors only the STORED `…T00:00:00(.000)Z` form — the bare `yyyy-mm-dd` form falls through, making the F-219e analytics cure a VERIFIED NO-OP.** The analytics refs ride `toDate(to)` where `to` holds a date-INPUT value (`toDateInputValue` → `"2026-11-01"`), which the `UTC_MIDNIGHT_ISO` regex rejects → raw `new Date(value)` → UTC midnight → local accessors read the PRIOR day west of UTC. Live-reproduced under `TZ=America/New_York`: `toDate("2026-11-01")` local parts = Oct 31, `startOfMonth` month index 9 (October) — the 1st-of-month trailing bucket keys the previous month and the Nov-1 rows drop from every series (trend/breakdown/split/byDay/incomeTrend) while `inRange` (epoch-vs-UTC-midnight) still INCLUDES them — charts and export disagree. Fires the whole local day on the 1st of every month (the default `to` is today) and on any 1st picked as range end. The bare form IS a calendar date under the F-218d doctrine ("the UTC-calendar prefix is the date the USER chose — not an instant to zone-shift"). | `src/lib/finance.ts:64,80-85`; `src/app/(app)/analytics/page.tsx:92`; `src/lib/format.ts:38-44`; live TZ repro (session 220) | **R-17** |
| F-220b | Medium | **~14 muted-text sites carry NO dark arm — the F-219i sweep's missing-arm class** (it banned the flipped-wrong `dark:text-stone-500`, not the absent arm). Dark is the fresh-visitor DEFAULT (F-219c), so these fail AA on first paint: LoadingBlock's label (3.65:1 on #0e1310 — every hydrate, every page); captions on income (2), dashboard, analytics, accounts (2), settings, import (2), expenses; the expenses placeholder + ai-coach placeholder; the two Paused badges — income's `bg-stone-100 text-stone-600 dark:bg-stone-800` = stone-600 on stone-800 **1.99:1**, goals' stone-500-on-stone-800 3.16:1 (bg flips, ink doesn't). Gates blind: the F-219i pin only bans the flipped-wrong form; the a11y register umbrella-sanctions `text-stone-500`; the dark e2e legs cover only /Dashboard + /Accounts-dialog. | `src/components/shared/page-parts.tsx:214`; `src/app/(app)/{income:95,150,dashboard:339,analytics:327,accounts:92,160,settings:266,import:206,256,expenses:264,615}/page.tsx`; `src/components/shared/ai-coach.tsx:167`; `income/page.tsx:142`; `goals/page.tsx:102` | **R-17** |
| F-220c | Medium | **The F-219m writes bucket landed ONLY on the six collection POSTs — every `[id]` PUT/DELETE, budgets DELETE, settings PUT, and users PATCH ride unbucketed** (the transactions route comment's own claim — "60 / 15 min / IP across the resource family" — is false as written). A sessioned runaway client can hammer single-row updates/deletes unbounded (2 queries each) on the single-node SQLite file; bounded by requireSession + owner-scoping (no anonymous/cross-user exposure), but the import-bypass rationale ("direct single-row POSTs") applies identically to direct PUT/DELETE loops. | `src/app/api/{transactions,goals,accounts,income-sources,investments}/[id]/route.ts` (zero `rateLimit` hits); `src/app/api/budgets/route.ts:65-80` (DELETE); `src/app/api/settings/route.ts:57`; `src/app/api/users/route.ts:38`; `tests/parity-219.test.ts:204-218` (the pin enumerates only the collection POSTs) | **R-17** |
| F-220d | Medium | **`--color-background` never flips in `.dark` while the base-layer `.dark body { background-color:#0e1310 }` rule sits INERT beside it** — the F-217c trap class, background edition (utilities-layer `bg-background` on `<body>` always beats the base-layer rule; the visible dark wash comes from `SHELL_LAYOUT.root`'s local `dark:bg-[#0e1310]` patch). Residual exposure: the CSS-canvas overscroll color propagates from body → light flash on every iOS rubber-band in dark mode; any future `bg-background` consumer silently renders light. ONE deliberate consumer depends on the unflipped token: the settings switch thumb (`bg-background` as the light knob — must move to `bg-white` with the flip). The prophylactic `--color-muted`/`--color-subtle` flips (F-218l) were landed on exactly this reasoning; the background token was skipped. | `src/app/globals.css:50,317-320,327-373`; `src/app/layout.tsx:95`; `src/lib/page-layout.ts:7`; `src/app/(app)/settings/page.tsx:405` | **R-17** |
| F-220e | Medium | **The error pages' Try-again button carries `focus:ring-primary`** — an amber-500 ring on an amber-500 button: 1:1 against the button, ≈2.1:1 against the white offset — WCAG 1.4.11/2.4.7 failure on the primary control of the error-recovery surface (keyboard users on a crashed route get a near-invisible focus ring). Never visited by any gate (sweeps/axe census skip error pages). | `src/app/error.tsx:55-56`; `src/app/global-error.tsx:55-56` | **R-17** |
| F-220f | Low | **The toast dismiss ✕ carries `text-subtle`** — #a8a29e on `bg-surface` #ffffff ≈ **2.52:1** (light mode; the F-218i class, non-text control). Dark passes (subtle flips #78716c). axe does not test SVG-icon contrast. | `src/components/ui/toast.tsx:152` | **R-17** |
| F-220g | Low | **The no-FOUC bootstrap diverges from the pure seam on an INVALID stored value** — bootstrap `t ? (t==="dark"\|\|(t==="system"&&mql)) : true` paints LIGHT for `wealthos-theme="banana"` on an app route, while `defaultThemeForPath` resolves DARK (the provider effect re-adds it post-hydration): a one-flash light→dark flip on corrupted/hand-edited storage. Three different invalid-value semantics in one family (bootstrap→light, seam→dark, resolveTheme→system). | `src/app/layout.tsx:110` vs `src/lib/theme-default.ts:53-54`; `src/components/layout/theme.tsx:26-30` | **R-17** |
| F-220h | Low | **The OS theme-flip listener overrides the fresh-visitor DARK default** — `readStoredTheme()` maps null→"system", so a fresh visitor (no stored key) whose OS `prefers-color-scheme` flips mid-session gets `applyTheme("system")` — the app follows the OS, contradicting the "no stored choice → dark" invariant until the next route change. | `src/components/layout/theme.tsx:88-95` | **R-17** |
| F-220i | Low | **The F-219q null-clear contract is dead code for `accountId`** — the transform collapses `null`/`""` → `undefined` (the exact collapse F-219q cured for `notes`/`institution`), so the `[id]` route's clear arm `body.accountId !== undefined && { accountId: body.accountId ?? null }` never fires: a transaction's account link cannot be cleared via PUT. Latent only (no UI surface sends it today). | `src/lib/schemas.ts:218-224` vs the F-219q comment at :205-208; `src/app/api/transactions/[id]/route.ts:45` | **R-17** |
| F-220j | Low | **The store's `call()` discards `error.code` — `hydrate()` 401-detects by message substring** (`res.error.includes("authenticate") \|\| res.error.includes("Sign in")`), an unpinned coupling: a future reword of `ERR.UNAUTHORIZED`'s message silently degrades session-expiry handling from the quiet signed-out state to the red error banner (the login card already branches on `error.code === "VERIFICATION_REQUIRED"` — the store is the lone substring consumer). | `src/stores/wealthos-store.ts:37-40,180` | **R-17** |
| F-220k | Low | **forgot-password's read path swallows ALL DB failures into the no-enumeration 200** — `findUnique({...}).catch(() => null)` maps a P2024/P2028 (pool/transaction timeout) to "unknown email" → 200 "If an account exists…", while the SAME route's update path honestly 503s the identical error family: during a DB outage the user is told a reset link was sent when none was minted. | `src/app/api/auth/forgot-password/route.ts:70` vs `:95-105` | **R-17** |
| F-220l | Low | **Out-of-order `refreshAll` responses can render stale slices after rapid mutations** — two quick mutations A→B: A's dashboard fetch can resolve after B's, overwriting B's fresher slices (the write-token guard protects against logout only; no sequence guard). Transient stale UI until the next refresh; single-user, self-healing. | `src/stores/wealthos-store.ts:115-137` + the mutation actions | **R-17** |
| F-220m | Low | **The import page stages dates through the raw `new Date(rawDate)` + `.toISOString()`** — the F-218d doctrine's banned form on user text: (a) locale-format CSV dates parse as LOCAL midnight → east-of-UTC users store the previous calendar day as a non-UTC-midnight instant (inconsistent with every UI-created row); (b) the preview cell's raw `new Date(row.date).toLocaleDateString` renders the previous day west of UTC for zoneless-ISO CSVs while the committed row later displays the right day in Expenses (preview/post-import disagree); (c) unparseable dates drop SILENTLY (the preview count is the only signal). | `src/app/(app)/import/page.tsx:101,103,115,231` | **R-17** |
| F-220n | Low | **The hygiene tail.** `theme-default.ts:23` claims "the AppShell calls it on shell entry" (no such call — the ThemeProvider pathname effect is the third mirror) while `routeDefaultsToDark`/`routeIsAuthFace` are dead exports; `format.ts`'s `formatDateByPattern` is a dead export; `api.ts:81-84` still enumerates CRM routes (activities/contacts/events/leads) that don't exist here; login/signup/not-found docblocks still describe "NEO CRM" titles. | `src/lib/theme-default.ts:23,58-65`; `src/lib/format.ts:51`; `src/lib/api.ts:81-84`; `src/app/{login,signup}/page.tsx`, `src/app/not-found.tsx` docblocks | **R-17** |
| F-220o | Low | **The dark a11y legs cover only 2 of 9 sections** — /Dashboard + /Accounts-dialog; Expenses/Income/Goals/Analytics/Investments/Import/Settings never run the two-gate in the mode that is the fresh-visitor default (F-220b is exactly the class these legs would catch). | `tests/e2e/a11y.spec.ts:216-249` | **R-17** |
| F-220p | Informational | **Register + deviation documentation.** The a11y register's `text-amber-500` arm (zero live consumers since F-219k) and the `bg-primary`/`button[type="submit"]` residual-submit arm (all migrated to the per-page constants) are stale sanctions — a future white-on-amber regression would ride them; the CHART_COLORS strokes (teal #14b8a6 ≈2.49:1, amber #f59e0b ≈2.15:1 on white cards — WCAG 1.4.11 graphical objects) are the reference's live-observed palette (parity-mandated) but carry NO register citation, unlike the text-side sanctions; the recharts tooltips hardcode light `labelStyle`/border in both themes (readable, inconsistent on dark); `h-screen` (100vh) can extend under iOS Safari's collapsed toolbar (`h-dvh` is the robust form — reference construction unknown). | `tests/e2e/a11y.spec.ts:29,48-59`; `src/lib/constants.ts:162-166`; `src/app/(app)/dashboard/page.tsx:229-234`; `src/lib/page-layout.ts:7` | **R-17** |
| F-221a | High | **`stageCsvDate` stages bare `yyyy-mm-dd` CSV cells one day EARLY for every UTC-negative user — the R-17 seam reintroduced the exact F-218d/F-220a class at the site its own commit called "the last raw `new Date(<user text>)` site".** V8 parses a bare ISO date as UTC midnight; the seam then reads the LOCAL Y/M/D of that instant and re-stages `Date.UTC(localParts)` — in `TZ=America/New_York`, `stageCsvDate("2026-11-01")` returns `2026-10-31T00:00:00.000Z` (live-reproduced). The wrong day survives the full round trip (`dateField` accepts the Z-form, Prisma stores it, `toDate` re-anchors it faithfully) — the most common bank-CSV date form silently stores every transaction one day early for the Americas. The round's own doctrine ("pin the FORM with TZ-switching tests") was applied to `toDate` but NOT to this seam: the bare-ISO pin runs under the runner's ambient UTC. | `src/lib/csv.ts:153-161` (impl), `:146-151` (docblock); consumer `src/app/(app)/import/page.tsx:114,131`; `tests/csv.test.ts:90-93` (ambient-TZ pin); live TZ repro (session 221) | **R-18** |
| F-221b | High | **The Radix `SelectItem` focus/highlight wash has no dark arms — the highlighted option is 1.18:1 (invisible) in dark mode, the fresh-visitor default.** The item classes are `focus:bg-line-soft focus:text-neutral-900` with no `dark:` arms; Radix moves real DOM focus to options on both keyboard and mouse, so the highlighted option in dark mode computes `rgb(23,23,23)` (neutral-900) on `rgb(38,38,38)` (line-soft's `#262626` dark flip) — live-verified on the dark-mode Income combobox (initial + ArrowDown states both 1.18:1). Every Select in the app (the section dialogs, the Expenses filters, Settings currency/date-format, Analytics period) is unreadable at the moment of highlight/selection. The sibling `MENU_ITEM` constant carries the correct dark arms (`dark:focus:bg-stone-800 dark:focus:text-stone-100`) — the F-217c dark-token round fixed the listbox panel, not the item wash. No call-site `<SelectItem className>` overrides exist. | `src/components/ui/select.tsx:121-125`; the token flips `src/app/globals.css:343,370`; the precedent `src/lib/page-layout.ts:311` (MENU_ITEM); live computed-style probe (session 221) | **R-18** |
| F-221c | Medium | **`stageCsvDate` stages Z-suffixed timestamps one day LATE for every UTC-positive user (year boundary included) — same root cause as F-221a, opposite direction.** Live-reproduced under `TZ=Asia/Tokyo`: `stageCsvDate("2026-11-01T18:30:00.000Z")` returns `2026-11-02T00:00:00.000Z`; `stageCsvDate("2026-12-31T23:30:00Z")` returns `2027-01-01T00:00:00.000Z`. The existing pin's own name claims "UTC midnight of its UTC calendar date (zoneless zone-safety)" — true only at UTC; the implementation reads local accessors, so the pin and the code disagree for every non-UTC zone. | `src/lib/csv.ts:158-160`; `tests/csv.test.ts:106-108`; live TZ repro (session 221) | **R-18** |
| F-221d | Medium | **The F-219q/F-220i null-clear API contract is unreachable from the app's own forms — seven page submit transforms collapse emptied optional fields to `undefined`.** The API layer honors clears (`notes`/`accountId`/`institution`/`targetDate`/`purchaseDate`/`nextDate`: `"" → null`, null survives, routes spread on `!== undefined`), but `field \|\| undefined` drops the key from the JSON body, so the clear arm can never fire: edit a record, empty an optional field (Notes, purchase/target date, institution, next-payment date, recurring nextDate), save → success toast → after `refreshAll` the old value is back. Exactly the class the F-219q/F-220i docblocks describe ("no payload could ever clear these fields once set") — still true for every first-party form. | `src/app/(app)/expenses/page.tsx:435,438`; `src/app/(app)/income/page.tsx:229,231`; `src/app/(app)/investments/page.tsx:388`; `src/app/(app)/goals/page.tsx:221`; `src/app/(app)/accounts/page.tsx:218` | **R-18** |
| F-221e | Medium | **The Settings "Export All Data" button renders stone-900 ink on blue-600 = 3.38:1 — WCAG 1.4.3 failure, live + axe-verified.** `<Button asChild className="w-full bg-blue-600 hover:bg-blue-700">` rides the default variant's `text-primary-foreground` (#1c1917); `cn()`/twMerge strips the conflicting `bg-primary` but keeps the ink → rgb(28,25,23) on #2563eb. White on blue-600 = 5.17:1. The F-219a round retired the stone-900-on-saturated-fill assumption for amber (measured); the blue button — the F-205b settings-navy genus — was never measured and silently kept the assumption. | `src/app/(app)/settings/page.tsx:295`; `src/components/ui/button.tsx:42`; live axe probe (session 221) | **R-18** |
| F-221f | Medium | **The a11y two-gate never scrolls — below-the-fold contrast failures are structurally invisible to it.** The SECTIONS loops run `goto → waitForLoadState("networkidle") → axe.run()` with no scroll at fixed 1280×800 / 390×844 viewports; axe only evaluates what is (or can be) rendered in view. Live A/B on /Settings light, identical page state: **0** color-contrast violations unscrolled vs the F-221e 3.38:1 finding surfaced once the Export section scrolled into view. A whole class of real AA failures (anything below the first viewport — the Export card since session 208) passes every gate; the same "surfaces the gates structurally cannot see" genus as F-217c/F-217n. | `tests/e2e/a11y.spec.ts:153-173` (light loops), `:244-261` (dark loops); live A/B probe (session 221) | **R-18** |
| F-221g | Low | **reset-password's read path swallows ALL DB failures into the invalid-token 400 — the F-220k sibling the R-17 cure missed.** The blanket `.catch(() => null)` maps P2024/P2028 (pool/transaction timeout) to `user = null` → `400 "Invalid or expired reset token"`: during a transient DB outage a user holding a VALID single-use reset link is told the token is invalid (they may discard it); the operator gets no signal. The identical class was cured in forgot-password's read path (F-220k) and in this very route's update path (F-218q) — the read path kept the swallow, and the route's own docblock claims the "no-bare-throw discipline". | `src/app/api/auth/reset-password/route.ts:54` vs `src/app/api/auth/forgot-password/route.ts:78-88` | **R-18** |
| F-221h | Low | **`investmentUpdateSchema.shares` lacks the upper bound its create twin enforces.** Create: `.max(1_000_000_000, "Shares is too large")`; update: finite+positive only — `PUT /api/investments/[id]` with `{"shares": 1e15}` passes and stores; shares × currentValue (cap 1e9) overflows to `Infinity`, propagating into `portfolioStats`, the health score, and AI-coach text until re-edited. The single asymmetric money-field cap in the schema family (every other update field keeps its cap). | `src/lib/schemas.ts:406-410` vs `:372-376` | **R-18** |
| F-221i | Low | **Cross-user `[id]` mutation posture has no behavioral test.** The multi-user spec drives B's collection-GET isolation + reset, but never B's PUT/DELETE against a demo-owned `[id]`. The correct `findFirst({ id, ownerId }) → 404` posture is pinned only by source-string containment — the exact limitation F-215c recorded for the reset family before its behavioral spec landed ("a future regression scoping to any other variable passes the pin"). Code verified correct today across all five resource families. | `tests/e2e/multi-user.spec.ts` (whole file) vs `tests/owner-scoping.test.ts:71-77,122-133` | **R-18** |
| F-221j | Low | **ExpenseDialog's two Select labels are not programmatically associated** — bare `<label className>` with no `htmlFor`; the SelectTriggers carry `aria-label` but no `id`. Clicking the visible label doesn't focus the combobox. Every other surface uses the F-218u `htmlFor` + trigger-id pattern (income:270-272, accounts:258-260, goals:294-296, settings:126-130). | `src/app/(app)/expenses/page.tsx:542,555` | **R-18** |
| F-221k | Low | **Goals "Paused" badge computes 4.40:1 in light mode** (stone-500 #78716c on stone-100 #f5f5f4, 11px semibold — needs 4.5). The income page's sibling badge uses `text-stone-600` (6.99:1) — the F-220b fix landed the dark arm but goals' light arm kept stone-500. | `src/app/(app)/goals/page.tsx:102` vs `src/app/(app)/income/page.tsx:142` | **R-18** |
| F-221l | Low | **`DIALOG_CLOSE` ✕ computes ≈1.85:1 at rest in light mode** — `text-stone-400 opacity-70` over white blends below the 3:1 non-text bar (full-opacity stone-400 is 2.52:1). Stock-shadcn parity, but the repo cured the identical class on the toast ✕ in F-220f and the family doctrine is one-step-darker. | `src/lib/page-layout.ts:279-280`; consumer `src/components/ui/dialog.tsx:60` | **R-18** |
| F-221m | Low | **Toast variant icons compute below 3:1 in light mode** — success `text-success` (#10b981) = 2.54:1, info `text-primary` (#f59e0b) = 2.15:1 on the white card (error 3.76 passes; dark passes ~7:1). The success/error distinction is icon+color-only, so the icons are arguably informative, not decorative. | `src/components/ui/toast.tsx:66-70` | **R-18** |
| F-221n | Low | **Settings switch: the unchecked track/thumb boundary computes below 3:1** — unchecked `bg-stone-300` track on the white/80 glass card = 1.49:1; white thumb vs stone-300 track = 1.63:1 (WCAG 1.4.11 on the state boundary; the thumb's `shadow-lg` partially compensates). The R-17 note recorded the thumb's `bg-white` move but not the tracks. | `src/app/(app)/settings/page.tsx:398-408` | **R-18** |
| F-221o | Low | **The reset view's "Send reset link" submit lacks `disabled={pending}`** — the only auth submit without the busy affordance (signin:748, signup:483, verify:570 all carry it). The `if (pending) return` guard prevents the double send; this is affordance-only. | `src/components/layout/login-card.tsx:392-394` | **R-18** |
| F-221p | Low | **The OS theme-flip listener can break the auth faces' forced light when the stored theme is `"system"`.** The F-220h gate reads the storage key but performs no auth-face check: a visitor on `/login` with stored `"system"` whose OS flips to dark mid-page gets `applyTheme("system")` → a dark auth face, violating the F-219t always-light genus the pathname effect enforces. Narrow trigger, cosmetic, self-heals on navigation — but the gate is one `isAuthFacePath` check from complete. | `src/components/layout/theme.tsx:96` vs `src/lib/theme-default.ts:57` | **R-18** |
| F-221q | Low | **Card-level mutation buttons are not disabled during async** — income Pause/Activate, accounts Remove, goals Delete/contribute, investments Delete: a rapid double-click fires two requests (e.g. two DELETEs → the second 404s → a spurious "Delete failed" toast). All dialog submits are guarded; the inline card buttons are not. The store's seq/write-token guards keep the data safe — feedback noise only. | `src/app/(app)/income/page.tsx:164-170`; `accounts/page.tsx:168-174`; `goals/page.tsx:156-166`; `investments/page.tsx:309-317` | **R-18** |
| F-221r | Low | **`auth/logout` POST is the one mutating handler with no bucket** (cookie-clear only, content-type CSRF-gated, no DB write — low abuse value). The R-17 "14 handlers" enumeration was also off by one (5×2 [id] + budgets DELETE + settings PUT + users PATCH = 13 new + 6 collection POSTs = 19 total in the writes family; the material claim "every sessioned mutating handler" was TRUE except logout). | `src/app/api/auth/logout/route.ts:16-23`; grep census (session 221) | **R-18** |
| F-221s | Low | **The "GDPR-compliant full export" omits the user's settings row and profile metadata.** The per-user `Setting` row (defaultCurrency, dateFormat, four notification booleans, theme — owner-keyed since R-10) and the user's `photoUrl`/`createdAt` are absent from the dump; the Settings page copy promises "Download all your data in JSON format". A user re-importing into a fresh account loses their preferences. | `src/app/api/export/route.ts:36-48` | **R-18** |
| F-221t | Informational | **The informational tail (recorded; the cheap arms cured in-commit).** `ERR.FORBIDDEN` is exported but dead (the 404-never-403 posture holds everywhere — the dead arm is a drift hazard); budgets DELETE loads its schema via a request-time dynamic import while the file already statically imports from `@/lib/schemas`; the boot warning names only X-Forwarded-For while the rate-limit fallback's `x-real-ip` is equally client-suppliable at the default proxy depth (the I-4b documentation gap); the import preview still drops invalid-amount/empty-description rows silently (the F-220m skip counter covers the date class only); the unused `variant="underline"` tab carries a latent 2.15:1 active state (zero consumers — the F-220p stale-genus class); `/api/health` is an unthrottled public DB probe (monitoring posture — documented, not cured); the forgot-password WRITE-path 503 is an account-existence oracle under partial outage (pre-existing, within the declared threat model — recorded); `hydrate()` does not participate in the `refreshSeq` protocol (benign — no observable divergence reachable); the investments table's Edit/Delete target the first row with a matching symbol (duplicate-symbol edge); pages subscribe to the whole store without selectors (sanctioned by the one-store doctrine). | `src/lib/api.ts:32`; `src/app/api/budgets/route.ts:75`; `src/lib/rate-limit.ts:87` + `src/lib/boot-env.ts:126-130`; `src/app/(app)/import/page.tsx:115`; `src/components/ui/tabs.tsx:162`; `src/app/api/health/route.ts:14-21`; `src/app/api/auth/forgot-password/route.ts:113-124`; `src/stores/wealthos-store.ts:173-207`; `src/app/(app)/investments/page.tsx:259` | **R-18** |
| F-222a | Medium | **`stageCsvDate`'s `UTC_DESIGNATED` regex is case-sensitive — RFC-3339-legal lowercase-`z` timestamps fall into the locale branch and stage one day off on both zone edges.** V8 parses `"2026-11-01T01:30:00z"` (lowercase `z`, RFC 3339 §5.6 NOTE) as a UTC-designated instant; the regex `/(?:Z|[+-]00:00)$/` misses it, the LOCAL accessors read the viewer's calendar date, and New York stages `2026-10-31` (one day EARLY) while Tokyo's `2026-11-01T18:30:00z` stages `2026-11-02` (one day LATE) and the year boundary `2026-12-31T23:30:00z` stages `2027-01-01` — the exact F-221a/F-221c class surviving INSIDE the R-18 cure, live-reproduced on both zone edges. Only the uppercase form is pinned. | `src/lib/csv.ts:166` (the regex), `:193-195` (the branch); `tests/csv.test.ts` (uppercase-only pins); live TZ repro (session 222) | **R-19** |
| F-222b | Medium | **ISO datetimes carrying NON-UTC offsets (`+09:00`, `-05:00`, …) stage the VIEWER's calendar date — the identical file imports different books for different users.** The form-branch treats every non-`Z`/non-`±00:00` form as a "locale form" with local accessors, but an offset-carrying ISO datetime is a fully designated instant whose source calendar date is the date in ITS OWN offset. Live: `2026-11-01T08:30:00+09:00` in New York stages `2026-10-31`; `2026-11-01T18:30:00-05:00` in Tokyo stages `2026-11-02`; the year boundary `2026-12-31T23:30:00-05:00` in Tokyo stages `2027-01-01`. The docblock's own doctrine ("the date the USER chose") demands the offset's own wall-clock date. | `src/lib/csv.ts:166` (the designator set), `:187-196`; live TZ repro (session 222) | **R-19** |
| F-222c | Low | **Partial ISO forms (`2026`, `2026-11`) escape every branch and silently stage a rolled day west of UTC.** `BARE_ISO_DATE` requires the full `yyyy-mm-dd`; V8 parses the year and year-month forms as UTC midnight of day 1, the locale branch's local accessors then read the prior day in the Americas: `"2026-11"` in New York stages `2026-10-31`, bare `"2026"` stages `2025-12-31` — a day the user never wrote. A skip (null) is the honest answer for a form carrying no day. | `src/lib/csv.ts:165` (the anchored regex family); live TZ repro (session 222) | **R-19** |
| F-222d | Low | **The calendar-rollover guard covers the bare branch only — `02/30/2026` stages Mar 2 while `2026-02-30` correctly nulls.** V8's lenient parser rolls the locale form; the R-18 round-trip guard landed on the bare branch alone, creating the asymmetry (and the designated branch `2026-02-30T00:00:00Z` inherits the same hole). | `src/lib/csv.ts:179-185` (the guarded branch) vs `:187-196` (unguarded); live probe (session 222) | **R-19** |
| F-222e | Medium | **The import-preview income ink carries no dark arm — 3.15:1 in the fresh-visitor default mode.** `row.type === "income" ? "text-emerald-700" : "text-stone-900 dark:text-stone-100"` — the expense arm flips, the income arm doesn't: emerald-700 `#047857` on the dark stone-900 tbody computes ≈3.15:1 < 4.5:1 at 14px semibold. The F-220b sweep's last content-surface miss (every sibling income site uses `dark:text-emerald-400`). | `src/app/(app)/import/page.tsx:270`; computed-contrast probe (session 222) | **R-19** |
| F-222f | Medium | **The 404 and segment-error faces render light-only under the dark default — a theme-whiplash defect on the faces the theme seam resolves DARK.** `NOT_FOUND_LAYOUT` and `error.tsx` are all-slate with zero `dark:` arms, while `defaultThemeForPath` resolves dark for ANY non-auth path with no stored choice — a fresh dark visitor's 404 is a light page under `html.dark`. The reference (a client SPA) serves its 404 INSIDE the authenticated shell — dark for fresh visitors — so the parity-correct cure is dark arms, not force-light. | `src/lib/page-layout.ts:386-402` (NOT_FOUND_LAYOUT); `src/app/error.tsx:38-64`; `src/lib/theme-default.ts` (the seam); live reference decode (session 222) | **R-19** |
| F-222g | Medium | **The hand-rolled interactive family carries no house focus ring — the UA default outline is the only keyboard affordance.** Every primitive (Button/Tabs/Select/inputs) ships `focus-visible:ring-2 ring-ring`; the raw `<button>` sites don't: PeriodSegment, the toast ✕, the app-shell store-error Try-again, the auth face's Google/footer/back/resend buttons, the Expenses filter-close/quick-category/back-to-form/quick-amount chips. None set `outline:none`, so 2.4.7 technically passes on the UA default — but the globals `outline-color` color-mix tint renders it ≈3:1 borderline, and the affordance is off-genus on the auth face (every visitor's first surface). | `src/components/shared/page-parts.tsx:191-205`; `src/components/ui/toast.tsx:141-160`; `src/components/layout/app-shell.tsx:69-75`; `src/lib/page-layout.ts:366,383`; `src/lib/login-reset.ts:159,206,251`; `src/app/(app)/expenses/page.tsx:290,484,495,537`; `src/app/globals.css` (the outline-color tint) | **R-19** |
| F-222h | Low | **`DIALOG_CLOSE` has no dark arms — the hover affordance DEGRADES in dark.** stone-500 on the dark surface token passes at ≈3.9:1, but `hover:text-stone-600` steps DOWN to ≈2.47:1 — the F-221l light cure (4.95:1) never gained its dark mirror. | `src/lib/page-layout.ts:279-284`; computed contrast (session 222) | **R-19** |
| F-222i | Low | **Recharts tooltip panels stay light-locked while the axes/grid flip via `isDark`.** `labelStyle={{ color: "#1c1917" }}` + the light `#e7e5e4` border ride every Tooltip; the panels render white chips floating over dark cards (readable, off-genus — the one chart seam the isDark work missed). | `src/app/(app)/dashboard/page.tsx:229-230`; `src/app/(app)/investments/page.tsx:168`; `src/app/(app)/analytics/page.tsx` | **R-19** |
| F-222j | Low | **Accounts negative balances use `text-red-500` with no dark arm** — the house F-218j pattern is `text-red-600 dark:text-red-400`; the accounts pair keeps the single arm (passes at 24px bold, consistency only). | `src/app/(app)/accounts/page.tsx:91,164` | **R-19** |
| F-222k | Low | **The tabs' latent arms (underline-active, count chip) carry no dark arms** — zero consumers today (the F-221t re-pin), but any future consumer inherits a dark-mode AA miss (amber-700 ≈3.87:1 on dark; the red chip pair unflipped). | `src/components/ui/tabs.tsx:168,179` | **R-19** |
| F-222l | Low | **The F-221q busy-disable rider covers 4 of 6 delete/mutate surfaces — the Expenses row-delete and the Settings budget-delete remain double-fireable.** The commit's own rationale ("a rapid double-click fired two requests — the second 404s and toasts a spurious Delete failed") applies verbatim to the app's highest-traffic delete; the Settings budget-delete additionally discards its result (`void store.deleteBudget(...)`) so failures are fully silent. | `src/app/(app)/expenses/page.tsx:193-201,208-212`; `src/app/(app)/settings/page.tsx:253-260` | **R-19** |
| F-222m | Low | **The import preview's skip copy still says "(unparseable date)" while the F-221t counter now counts every dropped-row class** (empty description, non-finite/zero amount, bad date) — misleading diagnosis for the two newer classes. | `src/app/(app)/import/page.tsx:227` vs `:120-127` | **R-19** |
| F-222n | Medium | **Login and forgot-password carry no per-account secondary rate bucket — the DEFAULT proxy posture keys on client-suppliable headers.** With `NEO_PROXY_HOPS` unset (default depth 1), `clientKey` reads the last `x-forwarded-for` hop (or `x-real-ip`) straight from the request — on a direct-exposure deploy (the documented `bun run start` path) a client rotating those headers gets a fresh bucket per request, voiding every per-IP cap (login 10/15, forgot 10/15, writes 60/15…). The posture is self-documented (the F-218t boot warning + DEPLOYMENT.md), but the default is the vulnerable one and the accepted-findings list never adjudicated it. A per-account bucket keyed by the SUBMITTED email (fired before any account-existence check — no enumeration oracle) bounds distributed credential attacks regardless of IP keying. | `src/lib/rate-limit.ts:79-88` (clientKey); `src/app/api/auth/login/route.ts:11`; `src/app/api/auth/forgot-password/route.ts` | **R-19** |
| F-222o | Low | **The `[id]` mutations key on `{ id }` alone after the ownership `findFirst` — a between-check-and-write delete surfaces P2025 as a 500.** Not an ownership bypass today (no route mutates `ownerId`), but the TOCTOU-shaped gap turns a benign race into INTERNAL instead of NOT_FOUND (the reset-password route's conditional form is the in-repo precedent). | `src/app/api/transactions/[id]/route.ts:39-41` + the four sibling `[id]` families | **R-19** |
| F-222p | Informational | **The recorded-not-cured tail (session 222 adjudication).** The family GETs ride unbucketed — the same F-219m per-navigation class as `/api/dashboard` (the store's `refreshAll` fires them on every hydrate; capping them re-trips the toolchain) — the posture now documented beside the dashboard route's own; the forgot-password timing residual (fsync-scale, in-code documented); signup's open enumeration (cross-referenced, accepted); the resend attempt-ladder reset (bounded by 6-digit entropy + 5/IP); the unconsumed `role` label (zero admin surface); scrypt N=16384 (the OWASP floor); no `__Host-` cookie prefix (single-origin posture); upload MIME trust (magic-byte sniff, mitigated by the extension whitelist + nosniff); `scrollThrough`'s anon-face legs (short single-card pages — the class closed for the section loops); the dotted-DMY ambiguity (pre-existing, documented); the chart-token duality (`--color-chart-*` pinned but `CHART_COLORS` is the working palette); the ai-coach index key (append-only thread); the category icon-tile tints (cosmetic, F-218k documented). | the audit passes (session 222) | **R-19** (recorded) |
| F-223a | High | **The desktop sidebar's Sign Out dead-ends on the infinite loading gate — the navigating `signOut` helper sits DEAD beside the call site.** `SidebarFooter` defines `signOut` (logout + `router.push("/login")` + `router.refresh()`) but the Sign Out `MenuItem` calls bare `logout()`: the store clears to `hydrated:false, loading:true`, no navigation or refresh fires, and the AppShell renders "Loading your workspace…" indefinitely until a manual reload (the server layout's guest wall never re-renders). The mobile drawer's Sign Out works (its own `signOut` IS wired); the e2e battery covers the drawer path and only asserts the desktop menu's ITEM VISIBILITY — the dead path is untested. The dead variable survives the gate because `no-unused-vars` is off. | `src/components/layout/sidebar.tsx:89-93` (the dead helper), `:136-140` (the bare-logout call); the store's clear-to-loading (`src/stores/wealthos-store.ts` logout); live code-path trace (session 223) | **R-20** |
| F-223b | High | **The R-19 dark-arm regression: error.tsx's Try-again carries `dark:text-stone-50` on the UNFLIPPED amber `bg-primary` — 2.06:1 in the fresh-visitor default mode.** `--color-primary` (#f59e0b) does not flip in `.dark`, so the round's own dark arm paints near-white ink on amber (hover 3.05:1) while the light arm computes 8.14:1. Every other amber CTA in the tree (BUTTONS.primary, SETTINGS_CARD.saveButton, CTA.amber, global-error.tsx) correctly carries NO dark ink arm — the F-219a genus (stone-900 on amber in both modes). The R-19 parity pin (`tests/parity-222.test.ts:102` `toContain("dark:text-stone-50")`) ENSHRINED the defect. | `src/app/error.tsx:60`; `tests/parity-222.test.ts:102`; computed contrast (session 223) | **R-20** |
| F-223c | Medium | **Two `<Tooltip>` sites missed the F-222i isDark completion — the dashboard Expense-Breakdown donut and the investments Asset-Allocation donut render recharts' default white chip over dark cards.** The sibling sites carry the `tooltipInk`/`tooltipStyle` form; the parity-222 pins for dashboard/investments were presence-only (only analytics counts sites) — the gate could not see the misses. These are the only two bare Tooltip sites repo-wide. | `src/app/(app)/dashboard/page.tsx:334`; `src/app/(app)/investments/page.tsx:218`; `tests/parity-222.test.ts:173,182` (the presence-only pins) | **R-20** |
| F-223d | Medium | **The F-222d rollover guard misses time-suffixed numeric dates — the common US bank-datetime shape stages a rolled day silently.** `NUMERIC_LOCALE`'s `$` anchor cannot match a trailing time, so the guard is skipped while `new Date()` happily rolls: "02/30/2026 10:00" → stages Mar 2, "02/30/2026 10:00 AM" → Mar 2, "2/30/2026 10:00 AM" → Mar 2, "02/29/2026 12:00 AM" → Mar 1 (non-leap) — live-reproduced, TZ-independent (identical under UTC / America/New_York / Asia/Tokyo). The date-only forms correctly null. Valid time-suffixed forms (11/01/2026 10:00, 2026/11/01 10:00) stage correctly and must keep staging. | `src/lib/csv.ts:197` (the `$` anchor), `:204-224` (localeRollover); live TZ probe (session 223) | **R-20** |
| F-223e | Low | **Month-only named forms invent day 1 — the F-222c doctrine ("a skip beats an invented day") never covered the named twins.** "Nov 2026" → stages 2026-11-01, "January 2026" → 2026-01-01 (live, TZ-independent) while the ISO partials "2026"/"2026-11" correctly null. A month-year CSV cell (statement periods) carries no day the user chose. | `src/lib/csv.ts:226-266` (the locale fallback); live TZ probe (session 223) | **R-20** |
| F-223f | Medium | **The desktop synced pill's light arm renders on the ALWAYS-DARK sidebar-gradient — 3.49:1 in light mode.** `NAV_LAYOUT.syncedPill` shares the mobile topbar's `text-green-700` light arm, but the desktop sidebar surface is the near-black `sidebar-gradient` in BOTH themes (light arm 3.49-3.69:1 for the 12px pill; the dark arm green-400 computes 10.04:1). The F-207h "green-700 = the AA step" measurement rode the mobile topbar's light wash (4.77:1 there — correct); the desktop consumer needs the dark-surface pairing unconditionally. | `src/lib/page-layout.ts:34-35`; `src/components/layout/sidebar.tsx:102`; `src/app/globals.css` sidebar-gradient (near-black in light); computed contrast (session 223) | **R-20** |
| F-223g | Medium | **The investments type chips' 600/700 `text` inks compute 2.02:1 on their 10% tints over DARK cards — the F-218k cure measured light cards only.** `style={{ backgroundColor: color+"1a", color: text }}` with text = blue-700 #1d4ed8 etc.: on the light card the tint is a pastel and the ink passes (the F-218k cure); in dark mode the same 10% tint over ≈#1c1917 is near-black and the ink fails (blue-700 2.02:1, all six types similar). The page already computes `isDark` for its chart colors. | `src/app/(app)/investments/page.tsx:285-290`; `src/lib/constants.ts:105-116` (INVESTMENT_TYPES.text); computed contrast (session 223) | **R-20** |
| F-223h | Medium | **The F-222g focus-ring family's tail: four hand-rolled controls still carry only the UA-default outline.** The sent view's Back (`LOGIN_RESET_LAYOUT.sentBack` — the fourth back in the same auth funnel its three siblings got rings for), the AI-coach suggested-question chips + Send button (the dialog's most-used controls), and the reset-password "Back to login". None set `outline:none` (2.4.7 technically passes) — the affordance is off-genus and ≈3:1-tinted by the globals outline-color. | `src/lib/login-reset.ts:139-140`; `src/components/shared/ai-coach.tsx:148-155,169-176`; `src/components/layout/reset-password-screen.tsx:181-187` | **R-20** |
| F-223i | Medium | **The income/expenses pastel icon tiles render bright light chips on dark cards — the hand-picked hex pastels cannot adapt.** `style={{ backgroundColor: style.soft }}` with soft = #ecfdf5-family: on the dark GLASS_CARD the tile is a bright light square (decorative aria-hidden icons — exempt from 1.4.11, but visually jarring in the fresh-visitor default mode). The accounts family's `${color}1a` alpha tints adapt to both surfaces; the income TYPE_STYLES.soft and expenses BUDGET_CATEGORY_META.soft hex pastels don't. | `src/app/(app)/income/page.tsx:35-42,131-136`; `src/lib/constants.ts:10-17` (BUDGET_CATEGORY_META.soft) used at `src/app/(app)/expenses/page.tsx:165-170` | **R-20** |
| F-223j | Low | **The import error alert's light arm is red-600 on red-50 = 4.41:1** (needs 4.5 for the 14px role=alert text); every sibling error surface uses red-700/red-800 (5.9-7.6:1). The dark arm already passes. | `src/app/(app)/import/page.tsx:206`; computed contrast (session 223) | **R-20** |
| F-223k | Low | **Logout performs no server-side revocation — an exfiltrated session cookie survives "sign out" for up to 7 days.** The `tokenVersion` eviction machinery exists (password reset bumps it; every previously minted cookie dies at the getSessionUser comparison) but the logout route only clears the client cookie. Bumping the version on logout (one indexed PK update) makes "sign out" mean revoke — the standard expectation for a finance app; the multi-device semantic (signing out one device evicts all) is the secure default. | `src/app/api/auth/logout/route.ts:31`; `src/lib/auth.ts:7-8` (the machinery); the reset-password route (the precedent) | **R-20** |
| F-223l | Low | **The verify route's no-pending branch returns the lockout message while the wrong-code branch returns the remaining-message — a pending-state enumeration oracle.** Both are 400 VERIFICATION_INVALID, but the message text distinguishes "account with a live pending code" (remaining-ladder) from "no pending code" (lockout form) for any unauthenticated prober. Unifying the no-pending branch to the remaining-message shape (full attempts) makes the two 400s identical. | `src/app/api/auth/verify/route.ts:53` vs `:76` | **R-20** |
| F-223m | Informational | **The recorded-not-cured tail (session 223 adjudication).** The audit's two top security ratings (forgot-password's in-band reset URL; resend's in-band OTP — both "default ON") are RE-DISCOVERIES of the standing F-217m owner-decision record (same exploit chains, same knobs, same boot warning) — not reopened; the root ↔ /Dashboard tree-crossing remount (post-login lands on `/` — the reference's own from_url default — while nav links to /Dashboard; crossing the root-page/(app)-layout boundary remounts AppShell → a transient loading flash; both URL-parity-preserving cures change the observable URL vs the reference, and the layout-group re-architecture is the F-210a-class shell rework) — recorded with the same "only if a future round re-architects the shell" posture; the gradient-ink family (white/100-tint on 500-level gradients — CTA.emerald/rose, GradientKpiCard, StatCard) re-confirmed as the sanctioned register's documented parity deviation (the reference's own measured families, F-219b/F-208a); the per-account login cap 30/15 + its lockout trade-off re-confirmed (the designed, documented bounds); the named-month rolled forms ("Feb 30, 2026" → Mar 2 — outside the numeric-scope guard, pre-existing) recorded; the T24:00 branch divergence (designated stages the written literal, locale follows V8's next-day roll — both per their documented branch contracts); the dashboard tooltip docblock's swatch claim (recharts 3.10 has no swatch element — corrected in-commit with F-223c); global-error.tsx renders its own `<html>` without the theme class (the platform artifact of layout replacement — dark arms cannot activate there); the AI-coach chip/send `disabled` states already block the double-send. | the audit passes (session 223) | **R-20** (recorded) |
| F-224a | Medium | **The YMD-slash rollover bypass — localeRollover's year-length gate checks the MDY year position only, so every YMD rolled date skips the guard and stages silently.** `if (c.length !== 4) return true` reads group c — the year for MDY ("02/30/2026"), the DAY for YMD ("2026/02/30": a=2026, b=02, c=30 — 2 digits, guard skipped) — so the YMD comparison below never fires for exactly the shapes it exists to check: "2026/02/30" stages 2026-03-02, and "2026/02/29" in the NON-LEAP 2026 stages 2026-03-01 (live-reproduced; the MDY twins correctly null). The F-222d docblock claims "a 4-digit-year numeric form must round-trip under the MDY **or YMD** interpretation" — false for the YMD arm. | `src/lib/csv.ts:221` (the c.length gate), `:207-211` (the docblock); live probe (session 224) | **R-21** |
| F-224b | Medium | **The F-223l unification left the verify oracle a NUMERIC tell — the no-pending branch answers a value the genuine ladder can never produce.** The wrong-code branch increments `verificationAttempts` BEFORE replying, so its reachable remaining-values are 4…1 (then 429); the no-pending branch returns `verificationRemainingMessage(VERIFICATION_MAX_ATTEMPTS)` = "5 attempts remaining." One probe with any 6-digit code: 5 ⟺ no pending code (or no account), 4/3/2/1/429 ⟺ account with a live pending code. The commit's "the two 400 bodies identical for any email" claim is true of the FORM, false of the VALUE. | `src/app/api/auth/verify/route.ts:58-62` vs `:77-85`; `src/lib/verification.ts:30` | **R-21** |
| F-224c | Low | **MONTH_ONLY's `$` anchor repeats the F-223d disease one regex down — and the REVERSED month-year twins were never covered at all.** "Nov 2026 10:00" and "January 2026 8:30 AM" stage the invented day 1 (live; the `$`-anchored rejection cannot see the trailing time), and "2026 Nov" / "2026-Nov" stage day 1 through the locale fallback (live-probed this session — V8 reads 2026-11-01 for both; no day was chosen in any of them). The day-carrying named forms ("Nov 2026 15" → V8 Nov 15, "2026 Nov 15 10:00" → Nov 15) must keep staging — the rejection family needs a TIME tail, not a bare lookahead. | `src/lib/csv.ts:205` (MONTH_ONLY); live probes (session 224) | **R-21** |
| F-224d | Low | **The F-223k logout revocation has no behavioral pin — the smoke leg replays the CLEARED jar.** Smoke leg 10 posts logout with `-b/-c` on one jar (the response's Set-Cookie clears it) then reads /me with the cleared jar: data:null proves the cookie is gone from the CLIENT, not that the server REJECTED the pre-logout cookie. The parity-223 pin is source-containment only (`toContain("tokenVersion: { increment: 1 }")`). The reset flow's twin leg (mint → reset → replay the old cookie → data:null) is the missing pattern. | `scripts/smoke-test.sh:141-148`; `tests/parity-223.test.ts:193-199`; the precedent `tests/e2e/reset-password.spec.ts:172-243` | **R-21** |
| F-224e | Low | **A failed logout POST is silently treated as success — the store discards the call() result and clears anyway.** R-20 added the tokenVersion DB write and the shared `writes:` bucket as new failure modes (500/429), but `logout()` still clears the store, pushes /login, and refreshes unconditionally — the user believes the sign-out happened while the httpOnly cookie (uncleared client-side — the client CANNOT clear it) keeps the session alive server-side; the next app-route load silently re-establishes it. | `src/stores/wealthos-store.ts:209-226` (the discarded result); `src/app/api/auth/logout/route.ts:28-53` | **R-21** |
| F-224f | Low | **Two stale comments assert the pill is green-700 after the F-223f cure made the desktop pairing unconditionally green-400.** The sidebar's pill comment ("green-700 = the AA step, see NAV_LAYOUT.syncedPill") and the mobile pill's own comment ("green-700 = the AA superset") now mislead the next contrast audit — the code-wins doctrine's doc half was skipped at the consumers. | `src/components/layout/sidebar.tsx:97-100`; `src/lib/page-layout.ts:93-97` | **R-21** |
| F-224g | Informational | **The e2e re-mint is success-path-only — a failed sign-out leg cascades.** The re-mint runs as the leg's last step; a failure between the Sign Out click and the re-mint leaves the shared storageState dead for every later spec (one real failure → many reds). Also the commit's "login budget counted 7/10" overstates: shared-IP login POSTs per clean run = 5 (setup 1, two re-mints, auth.spec's two) — safe direction. | `tests/e2e/mobile-navigation.spec.ts:258-264` (the helper), `:277`, `:299` | **R-21** (the afterEach hardening) |
| F-224h | Low | **The password-length contract is inconsistent across the auth family.** `passwordSchema` (signup) has min(8) and NO max; `loginSchema.password` is unbounded (fine — compare-only); only `resetPasswordSchema.new_password` caps at max(200). A user whose password manager sets a >200-char password can sign up and log in forever but can never re-set a password of that length. | `src/lib/schemas.ts:37-39` vs `:91-92` | **R-21** |
| F-224i | Low | **The publicly-documented demo credential rides the documented production seeding path, absent from the Known Issues register.** The seed upserts the demo owner with the README-documented password; DEPLOYMENT.md's production legs run `db:seed`; PAD §10 carries no row for the posture (an internet-exposed deployment following the docs ships a guessable live account — bounded by owner-scoping, but persistent). | `prisma/seed.ts:41-45`; `docs/DEPLOYMENT.md:69-78`; the register gap `Project_Architecture_Document.md:§10` | **R-21** (the register row + the DEPLOYMENT warning) |
| F-224j | Low | **Search `contains` does not strip SQLite LIKE metacharacters — a literal "%" or "_" query matches every row.** Prisma's contains compiles to LIKE without escaping, so q="%" returns the first 5 rows of every family (over-broad, not injection — parameterized, owner-scoped, take:5, 60/15min). The `.toLowerCase()` is also redundant for ASCII (LIKE is already ASCII-case-insensitive). | `src/app/api/search/route.ts:21,31-66` | **R-21** |
| F-224k | Informational | **The per-account login/forgot buckets enable a targeted 15-minute login-DoS on a known email** (30 garbage attempts from rotating IPs lock every legitimate login for the window; same at forgot's 20) — the anti-brute-force rationale is documented, the lockout-DoS half is not. Standard trade-off; record it (the accepted-and-written-risk rule). | `src/app/api/auth/login/route.ts:37-42`; `src/app/api/auth/forgot-password/route.ts:65-66` | **R-21** (the docblock note) |
| F-224l | Informational | **The verify-lockout 429 is the family's only 429 without Retry-After** — an attempt-counter response, not the limiter; the code is VERIFICATION_LOCKED not RATE_LIMITED. No deterministic retry time exists (the lockout lifts only on resend). Leave as-is with the docblock note. | `src/app/api/auth/verify/route.ts:68,82` vs `src/lib/api.ts:43-49` | **R-21** (the docblock note) |
| F-224m | Informational | **The stageCsvDate docblock overstates the ±HH designator family.** "±HH:MM / ±HHMM / ±HH stage the written date literal" — the regex tolerates ±HH but V8 rejects it ("2026-12-01T23:30:00+09" → null, live), so the row is SKIPPED, not staged. Safe behavior (skip beats a wrong day); the comment claims more than the code delivers. | `src/lib/csv.ts:156-160` vs `:187-188,249-253` | **R-21** (the docblock correction, folded into the F-224a work) |
| F-224n | Informational | **Upload trusts the multipart-declared file.type; no magic-byte validation.** Arbitrary bytes declared image/png are stored and served Content-Type: image/png — inert in browsers (nosniff global, SVG rejected by the extension map, no execution path). Defense-in-depth gap mirroring the reference's own posture. | `src/app/api/upload/route.ts:88-92` | recorded |
| F-224o | Informational | **The budgets upsert has no P2002 arm on the create race** (two concurrent same-category POSTs → the loser answers 500 instead of the settings route's friendly re-read; near-unreachable at single-user scale, the unique constraint holds). | `src/app/api/budgets/route.ts:43-62`; the precedent `src/app/api/settings/route.ts:27-36` | recorded |
| F-224p | Low | **global-error.tsx — the third resilience face — missed the F-222f dark-arm family, and its recovery ring goes invisible under a surviving html.dark.** The face is light-only literals (bg-slate-50/text-slate-900) while both siblings carry dark arms; on a client-side root crash the imperatively-set .dark class is not React-owned, so the card can render light-on-dark — and `focus-visible:ring-ring` reads the FLIPPED token (#f5f5f4): ~1.04:1 on the light card, an invisible focus indicator on the only exit. The F-223m "cannot activate" recording described the SSR path; the client path keeps the class. The error.tsx genus mirror is world-robust either way (dead classes if the class strips, correct rendering if it survives). | `src/app/global-error.tsx:35,56`; the precedent `src/app/error.tsx:42-74`; `src/app/globals.css` --color-ring flip | **R-21** |
| F-224q | Low | **The dead-import + latent-trap family: page-parts' unused {Card, CardContent} import, the unflipped --color-danger-soft, and the dropdown docblock's stale CRM citations.** The four stock primitive files (card/table/input/label) have zero consumers — kept per the N-56e vendored-stock precedent — but the dead import is pure lint-invisible rot; DropdownItem destructive's `hover:bg-danger-soft` has NO .dark flip (a future dark popover renders a near-white hover chip — the F-222k latent-arm class); dropdown.tsx's docblock cites CRM-era surfaces ("the dashboard quick-create + export dropdowns") that do not exist in WealthOS. | `src/components/shared/page-parts.tsx:9`; `src/components/ui/dropdown.tsx:64,93-95`; `src/app/globals.css:103` | **R-21** (arm + fix, not retire) |
| F-224r | Low | **The a11y two-gate never runs the phone viewport in dark mode — the coverage quadrature's missing cell.** Light×desktop ×9, light×phone ×9, dark×desktop ×9 — dark×phone ×9 absent, though dark is the fresh-visitor DEFAULT and mobile the majority posture (mobile-only arms — the lg:hidden header, stacked grids — are unchecked in dark). The family's history says this gap-class ships real defects (F-217n, F-220o). | `tests/e2e/a11y.spec.ts:191-198` vs `:296-314` | **R-21** |
| F-224s | Low | **No skip-to-content mechanism (WCAG 2.4.1 bypass blocks).** Desktop keyboard users Tab through the full sidebar (~10 controls) before reaching main on every route; the landmark structure mitigates for SR users, not keyboard-only. The repo deliberately supersedes the reference on a11y — this is the one standard bypass mechanism absent. A visually-hidden-until-focus anchor OUTSIDE main trips no drift gate (the sweeps are pixel-based, the census main-scoped). | `src/components/layout/app-shell.tsx:45-60`; repo-wide grep for skip | **R-21** |
| F-224t | Informational | **~14 pinned-but-unconsumed @theme tokens (the reserved families): brand, subtle, success/-soft, warning/-soft, info/-soft, danger-soft, radius-card/button/pill, chart-income/expense/net, the animate keyframes.** The pins' complete-enumeration guard IS the token contract (palette-pins SEMANTIC_TOKENS) — the risk is drift (someone "fixes" a chart to var(--color-chart-income) and diverges from CHART_COLORS), not correctness. A reserved-family comment kills the drift risk cheaply. | `src/app/globals.css:43-125,267-286`; `tests/palette-pins.test.ts:40-49` | **R-21** (the comment) |
| F-224u | Informational | **`rounded-full` computes 2147483647px with no radius>1000 pin** — the skill §12 rule half-adopted; a future "normalization" to a finite value would pass every gate silently. | built CSS `.rounded-full`; ~40 src sites; no pin | **R-21** (the pin) |
| F-224v | Informational | **Tailwind v4's content detection scans skills/tests/docs — prose emits production CSS, and skills-folder edits can change the built stylesheet.** `.text-success`/`.rounded-card`/`.text-subtle` ride the built CSS with only prose mentions (skills CSVs, pin files) — harmless bloat, but "is this utility live?" is unanswerable from src alone, and the skills/ folder (excluded from code checking) leaking into the artifact is a standing hazard. `@source not` removes the classes of dirs from the detection set; used utilities (all under src/) are untouched. | built CSS vs `rg` evidence (session 224); Tailwind v4 content-detection | **R-21** |
| F-224w | Informational | **metadata.test.ts's header prose contradicts its own Capital-loc assertions** ("OUR sitemap lists the real lowercase routes" — the assertions pin the Capital twins since F-217f). Doc-rot inside a pin file. | `tests/metadata.test.ts:17-18` vs `:144-177` | **R-21** (the comment fix) |
| F-224x | Informational | **The lowercase route twins inherit the root canonical `/`** (documented residual — the sitemap's own comment records the trade; all internal links, the sitemap, and the bridges use Capital paths; a redirect would close it permanently but is an owner call against the parity doctrine). Confirmed still true. | `src/app/sitemap.xml/route.ts:14-17` | recorded (standing) |
| F-224y | Informational | **The mobile brand wordmark's light arm computes 2.81-3.05:1** (amber-600/yellow-600 gradient on the near-white topbar wash) — WCAG 1.4.3's logo/brand-name exemption applies, the dark arm passes easily, and the genus is the reference's own (F-207b) — but the computed values are absent from any register citation, so a future arm-retirement sweep could "discover" it. | `src/lib/page-layout.ts:92` | **R-21** (the constant-site citation) |
| F-224z | Informational | **The drawer Sign Out's ghost border computes 2.31:1 against the dark sheet** (slate-600 on the #1c1917→#292524 sheen; WCAG 1.4.11 non-text) — the genus is live-extracted parity (pinned in shell-parity as "the reference's ghost"), and the text-white label (17.5:1) carries the affordance. | `src/lib/page-layout.ts:75`; `src/app/globals.css:447-456` | recorded (standing) |
| F-224aa | Informational | **LoadingBlock is not announced and the error face renders landmark-less.** The loading gate swaps main content silently for SR users (no role="status"/aria-live — the banner and toasts carry their own); error.tsx's card replaces the shell with no <main> landmark (heading order is correct). | `src/components/shared/page-parts.tsx:215-221`; `src/app/error.tsx:42-74` | **R-21** |
| F-224bb | Informational | **The session-224 audit's clean-surface confirmations (the negative results, recorded for the next audit's baseline).** All 30 API handlers follow the envelope+requireSession+Zod idiom; the rate-bucket matrix matches the documented contract exactly; owner scoping airtight; the csv forms staged correctly under 19 live probes; the Tailwind v4 trap sweep clean (zero phantom breakpoints, zero inert token classes, no var() chains, no space-y double-spacing); every icon-only control labeled; the theme three-way seam consistent; the SEO family complete and pinned; bun audit unchanged (1 dev-chain minimatch, range-unreachable). | the three audit passes (session 224) | recorded |

| F-225a | Medium | **The R-21 month-year family completion misses the NUMERIC year-month partials — "2026/11" stages the invented day 1.** The F-224c cure nulls month-year cells for the ISO-hyphen partials (PARTIAL_ISO) and the letter-anchored named family (MONTH_ONLY + the reversed twin); a numeric year-month cell with a slash/dot/space separator matches no rejection branch and no guard arm (NUMERIC_LOCALE requires three digit groups), so V8's day-1 default stages — the exact statement-period shape the family's own rationale cites ("a month-year CSV cell carries no day the user chose"), violating the file's own "a skip beats an invented day" doctrine. Not recorded in any prior round (F-222c pinned the hyphen twins only). | `src/lib/csv.ts:195,209,220-227`; live probe (session 225, three TZs — identical in all); `tests/csv.test.ts:392-397` (the family's rationale) | **R-22** |
| F-225b | Medium | **Zone-carrying forms the designator taxonomy misses stage the VIEWER's calendar — a silent wrong day west of the designation; the 4-digit numeric designated forms null-or-stage by zone.** V8 accepts designators the R-19 regex family doesn't: a space before the offset ("Nov 1, 2026 10:00 +09:00", and the ISO twin "2026-11-01 10:00 +09:00") and the named UTC/GMT tails ("Nov 1, 2026 UTC"). Those forms fall to the locale arm, which stages the viewer's local calendar date — New York stages "Nov 1, 2026 UTC" as 2026-10-31 (wrong day) and "Jan 1, 2026 UTC" as 2025-12-31 (wrong day AND year) while Tokyo stages the written day: the identical file imports different books for different users — the exact F-222a/b class surviving inside the R-19/R-21 taxonomy. The 4-digit numeric designated forms ("2026/11/01 UTC", "2026-11-01 10:00 +09:00") NULL in New York (the F-224a guard converts the shift to a skip) and stage in Tokyo — the zone inconsistency the designated doctrine exists to end. | `src/lib/csv.ts:190-191,299-309`; live probe (session 225, NY/Tokyo edges) | **R-22** |
| F-225c | Medium | **The F-222n per-account bucket doctrine was never extended to verify/resend — the OTP-guessing surface is bounded only by per-IP caps the doctrine itself declares voidable.** Verify carries 20/IP and resend 5/IP, no email-keyed mirror (login and forgot have theirs); login's own docblock records the decode — with NEO_PROXY_HOPS unset (the default posture) the per-IP key reads client-suppliable headers, so a rotating caller voids every per-IP cap. Resend re-arms ANY hash-present account and resets the attempts ladder, so the cycle resend → 5 verify guesses → resend runs indefinitely against a known email; verify's success path signs the caller in. The recorded mitigation is in tension with itself: F-222p cites "bounded by 6-digit entropy + 5/IP" — the same bound F-222n proved voidable. | `src/app/api/auth/verify/route.ts:28`; `src/app/api/auth/resend/route.ts:21`; the mirror at `login/route.ts:42-47` | **R-22** |
| F-225d | Medium | **The skip-to-content link is INVISIBLE when focused below lg — painted under the sticky mobile header.** The F-224s reveal (focus:absolute left-2 top-2, z-50) positions the focused pill exactly where the mobile header sits (lg:hidden sticky top-0 z-50, opaque gradient wash, h-16); both are positioned z-50 in the same stacking context and the header is later in DOM, so the header wins the paint order. Keyboard users at phone widths (and 200%-zoom desktops — 1.4.4 reflow territory) Tab to a link that is focused but completely covered; the bypass still functions (Enter lands #main-content). The e2e leg runs 1280-only; axe cannot model paint order — which is why 122/122 stayed green. | `src/components/layout/app-shell.tsx:53-58` vs `src/lib/page-layout.ts:86`; live repro against the dev server (session 225: elementFromPoint at the pill's center returns the header's wordmark at 390, the link itself at 1280) | **R-22** |
| F-225e | Medium | **The capture tools sign up scratch accounts against the DEV database — the census contract breaks for every later run.** Face 115's fresh-signup need (the verify first-rung answer) creates `e2e-capture-<ts>@example.com` in custom.db; the reseed's deletes are owner-scoped, so the scratch user SURVIVES `db:seed` and `db:census` MISMATCHes (live this session: "users expected 1, found 2" — the R-21 gates verified the census BEFORE the capture set ran, so the shipped state carries the breakage silently). The class spans captures-218/219/224 — every capture set since session 218 that needed a fresh signup. | `scripts/captures-224.ts:252-263` (the signup, no cleanup — the finally only kills the server); `prisma/seed.ts:64-70` (the owner-scoped deletes); the live census (session 225) | **R-22** |
| F-225f | Low | **The search seam's docblock overstates the contract.** "Every query is a literal substring search" is false for exactly the metacharacter-bearing queries the strip exists to treat: `net_salary` → `netsalary`, which does NOT match a stored `net_salary` (substring absent) — the user gets zero results for text that exists, silently. The trade is deliberate and unit-pinned, but the docblock claims more than the delivered behavior. | `src/lib/search-query.ts:7-8,13` | **R-22** (the docblock reword) |
| F-225g | Low | **The two-digit-year rolled numeric date stages the roll — the documented residual is unpinned.** `stageCsvDate("02/30/26")` → 2026-03-02 (V8 remaps "26"→2026 then rolls Feb 30; the guard's two-digit pass-through lets it stage). Documented in code ("the remap boundary is engine-internal") but no pin records the rolled outcome, and it sits in tension with the round-trip doctrine the same file states. | `src/lib/csv.ts:203-205,249-254`; live probe (session 225, three TZs) | **R-22** (the pin — not a behavior change) |
| F-225h | Low | **F-224j has no route-level behavioral pin — the "% → no matches" half of the ledger's claim is unpinned.** The sanitizer-only pin cannot see the route wiring (the `q.length < 2` short-circuit after the strip); a reordering or removal would restore `contains: ""` matching every row with no red gate. | `tests/search-query.test.ts` (sanitizer-only); `src/app/api/search/route.ts:27-32`; grep (session 225 — no test exercises the route) | **R-22** (the e2e leg) |
| F-225i | Low | **`uploads/[name]` GET — the only other public session-less route family — carries no rate bucket; the health route's F-221t enumeration is stale.** The route is unauthenticated by design (the public CDN mirror posture) with a pinned name charset (no traversal), but an unthrottled flood contends the event loop/FS, and health's "every public route family carries a bucket except this one" no longer holds — uploads is a second unthrottled family the note never names. No seeded upload files and no test battery touch the route (grep-verified — the bucket cannot trip any gate). | `src/app/api/uploads/[name]/route.ts:23-44` (no rateLimit); `src/app/api/health/route.ts:14-19` | **R-22** (the bucket, the export precedent) |
| F-225j | Low | **global-error.tsx still renders landmark-less — the F-224aa <main> cure covered the segment boundary, not the third face.** The rationale ("a face that replaces the shell leaves the page landmark-less") applies identically to global-error (it replaces the ENTIRE document), but its card sits in a plain div; the sibling got `<main>` and the pin covers error.tsx only. | `src/app/global-error.tsx:45` vs `src/app/error.tsx:45`; `tests/parity-224.test.ts:86-89` | **R-22** |
| F-225k | Low | **Six decorative icons are not aria-hidden — inconsistent with the house pattern on every other surface.** The established genus marks decorative lucide glyphs aria-hidden (sidebar:44,108,124; page-parts:86,118,139,164; error/global-error); the nav-link icons, the Dark Mode/Sign Out menu icons, and the KpiCard trend arrows are bare — no WCAG failure (unnamed SVGs are generically ignored) but the pattern is inconsistent, and the next icon audit must re-litigate each site. | `src/components/layout/sidebar.tsx:74,136,147`; `src/components/layout/mobile-nav.tsx:165,177`; `src/components/shared/page-parts.tsx:75` | **R-22** |
| F-225l | Low | **DropdownItem's destructive ink is a latent sub-AA arm on the exact line F-224q half-armed; the globals.css "consumer" wording pair reads as a contradiction.** The item's ink rides text-danger = #ef4444 — the same 3.76:1-on-white value the house itself measured and darkened to red-600 for the KPI delta (F-218j); the Popover family has zero live consumers (the N-56e KEEP), so this is the latent-arm class — but the measured value sits nowhere beside the F-224q citation, and a future consumer inherits it silently. The reserved-token comment's "zero live consumers today" vs the dropdown docblock's "consumed by a stock primitive" uses "consumer" in two senses the next auditor must re-litigate. | `src/components/ui/dropdown.tsx:64`; `src/app/globals.css:117-123,412-417`; the precedent `page-parts.tsx:62` | **R-22** (the measured-value notes; the KEEP stands) |
| F-225m | Low | **The app-shell return block is misindented 2 spaces; the mobile sheet container carries a dead focus:outline-none.** The F-224s edit left the child block at 8 spaces under a 4-space root (closing at 6) — cosmetic only, lint passes; the sheet container's focus:outline-none is inert (no tabIndex) and would suppress the focus outline outright if the container ever became programmatically focusable (the F-222g genus this repo retired elsewhere). | `src/components/layout/app-shell.tsx:47-100`; `src/lib/page-layout.ts:55` | **R-22** |
| F-225n | Informational | **localeRollover's year-length check is unreachable in the YMD arm** — `ymd = Number(a) >= 1000` with `a` captured by `\d{1,4}` means a is always exactly 4 digits when ymd is true, so the check can only fire in the MDY arm. Harmless (defensive against future regex edits); noted so the next reader doesn't hunt for a YMD skip path that cannot exist. | `src/lib/csv.ts:252-254` | **R-22** (the one-line comment) |
| F-225o | Informational | **Session-mint TOCTOU on tokenVersion — fail-closed, self-healing.** A concurrent password reset between the row read and the mint embeds the pre-bump version; the fresh cookie dies at the getSessionUser comparison and the user signs in again. No action. | `src/app/api/auth/login/route.ts:87`; `src/app/api/auth/verify/route.ts:111` | recorded (standing) |
| F-225p | Informational | **Signup's first-user admin bootstrap is a TOCTOU, but `role` gates nothing** — grep confirms zero authz consumers in the server surface (display fields only); no privilege boundary exists to cross. The F-224i demo-credential posture remains the recorded standing item. | `src/app/api/auth/signup/route.ts:68,86` | recorded (standing) |
| F-225q | Informational | **`@source not "../../**/*.md"` is root-wide — a future markdown content file under src/ would be silently excluded from detection.** Correct for the current tree (glob-verified empty), but the bound is by assertion, not structure; if markdown content ever lands under src/, scope the negative glob to the root/docs levels. | `src/app/globals.css:22` | recorded (standing) |
| F-225r | Informational | **Neither error boundary announces itself or moves focus on mount.** When a boundary replaces the page, focus typically dies to body and the card mounts unannounced (no role="alert", no focus-to-heading); only the Try-again button is focusable — one Tab away. The in-shell banner already models the genus; future superset round. | `src/app/error.tsx:37-77`; `src/app/global-error.tsx:33-75` | recorded (standing) |
| F-225s | Informational | **LoadingBlock is an inserted-and-removed live region rather than a persistent one.** role="status" aria-live="polite" is correct, but announcement of an inserted region is inconsistent across AT pairs; the robust form toggles a persistent region's content. Acceptable as-is. | `src/components/shared/page-parts.tsx:216-226` | recorded (standing) |
| F-225t | Informational | **`scrollbar-thin` has no dark arm** — the thumb is hardcoded #d1d5db in both themes (visible light gray on the dark wash — arguably good contrast, but inconsistent with the token-flip doctrine). The drift gates don't police scrollbars. | `src/app/globals.css:520-537` | recorded (standing) |
| F-225u | Informational | **The sidebar brand renders an h2 before every page's h1 in reading order** (the aside precedes main). Upward heading skips (h2→h1) are allowed — axe-clean — but heading-list users get the wordmark as noise. The genus is live-extracted parity — confirm the reference's own tag first. | `src/components/layout/sidebar.tsx:49` | recorded (standing) |
| F-225v | Informational | **The session-225 audit's clean-surface confirmations (the negative results, recorded for the next audit's baseline).** All 30 API handlers follow the envelope+requireSession+Zod idiom; owner scoping airtight (~52 query sites, every one ownerId-guarded); the F-224b cure landed byte-identical with a behavioral e2e pin; the F-224j strip is applied at the ONLY contains surface in the repo; the F-224h password bound unified; the R-21 cure surfaces all re-verified green under the fresh audit (the dotted-YMD read, the day-carrying reversed twins, the store's mocked-fetch legs, the @source before/after probes, the F-224f pill comments at both sites); the F-217m standing item re-confirmed unchanged (the boot warning verified present and accurate — no R-21 regression); the theme three-way seam consistent; bun audit unchanged (1 dev-chain minimatch, range-unreachable). | the three audit passes (session 225) | recorded |

### Session-226 audit (three Mode-C passes, every material claim re-verified)

| ID | Severity | Finding | Evidence (file:line) | R-item |
|---|---|---|---|---|
| F-226a | Medium | **The designated-tail escape families — the F-225b wrong-day class SURVIVES in seven regex-shape families the R-22 taxonomy missed.** V8 accepts designators and shapes the strict allowlist does not: (1) case-insensitive `utc`/`gmt` ("Nov 1, 2026 utc" staged 2026-10-31 in New York); (2) the leading weekday — RFC-822's "Thu, 01 Jan 2026 00:00:00 GMT" staged 2025-12-31 in New York (wrong day AND year); (3) separator lenience ("Nov  1, 2026 UTC" double space, "Nov 1,2026 UTC" comma-no-space); (4) the meridiem before the designator ("Nov 1, 2026 11:00 PM UTC" staged Nov 2 in Tokyo); (5) V8's named zones — "Nov 1, 2026 8:00 PM EST" staged Nov 2 in UTC/Tokyo and "Dec 31, 2026 8:00 PM EST" staged **2027-01-01** (V8's set: UT/EST/EDT/CST/CDT/MST/MDT/PST/PDT; CET/JST/BST/AEST are V8-rejected and null safely); (6) compound tails ("Nov 1, 2026 UTC+01:00" staged 2026-10-31 in two zones, "GMT+5"); (7) the month-year family WITH a designated tail — "Nov 2026 UTC"/"2026/11 UTC" stage the invented day 1 AND the zone shift (2026-10-31 in New York), and the name-year-day form "Nov 2026 15 UTC" staged Nov 14 in New York (the written day was 15). The R-22 docblock's "Recorded residual: nothing — every designated tail this seam has observed is covered" is FALSE. All live-reproduced under TZ switching in three zones (scripts/probe-226-csv.ts); the V8 design probes (scripts/probe-226-v8.ts) validated every widened arm before implementation. | `src/lib/csv.ts:280-319` (the regex family), `:411-443` (the dispatch), `:183-184` (the false residual claim); the probe (session 226) | **R-23** |
| F-226b | Medium | **The lowercase section routes serve the ROOT head — title "WealthOS", canonical "/" — while the reference serves per-casing canonicals.** The eight lowercase section pages are `"use client"` (metadata export forbidden), so /income inherits the root layout's family and declares itself a duplicate of the homepage; only the Capital bridges export `pageMetadata()`. The repo's own route-case header records the reference's posture ("`/Reports` serves og:url + canonical at …/Reports while `/reports` serves them at …/reports" — live-verified 2026-10-01). Eight reachable URLs carry the wrong tab title and a self-canonicalization to "/". | `src/app/(app)/{income,expenses,accounts,investments,import,analytics,goals,settings}/page.tsx` (no metadata export); `src/app/(app)/Income/page.jsx:8` (the only per-route export); `tests/route-case.test.ts:12-14` (the reference's recorded posture) | **R-23** |
| F-226c | Medium | **Every API catch site swallows the error with zero server-side logging.** ~31 `catch` sites across `src/app/api/**` return the generic `ERR.INTERNAL()`/`fail()` envelope and discard the error object — a repo-wide grep finds NO console.error anywhere in the catch paths (only the OTP info lines and the boot warning). A SQLITE_BUSY, an ENOSPC on the upload write, or a libsql timeout leaves no trace: production failures are undiagnosable (the auth family maps P2024/P2028 to 503; every CRUD route maps them to an anonymous 500). | `src/lib/api.ts:60-64`; e.g. `src/app/api/transactions/route.ts:24-26`, `src/app/api/dashboard/route.ts:49-51`, `src/app/api/reset/route.ts:52-54`; the grep (session 226) | **R-23** |
| F-226d | Medium | **The heavy read family ships unbounded `findMany` with single-column indexes.** transactions/dashboard (6 concurrent full reads, fires on every navigation by design)/export (7 reads + pretty-print)/ai-coach load the owner's ENTIRE dataset per call — no `take` ceiling — and the `ownerId+date` sort runs an in-memory sort at scale (the Transaction indexes are single-column). The import route permits 5×5000 rows per 15 min, so 10⁵+ rows is a legitimate state; every dashboard hydrate then fetches the full table. Self-DoS only (owner-scoped), but correct-but-degrading. | `src/app/api/transactions/route.ts:19-23`; `src/app/api/dashboard/route.ts:22-33`; `prisma/schema.prisma` (the Transaction indexes) | **R-23** (the compound index; the read-family posture documented) |
| F-226e | Low | **The uploads GET 429 drifts from the ERR.RATE_LIMITED family** — hand-built via `fail("RATE_LIMITED", "Too many requests, please try again later", 429)`: no `Retry-After` header (the family's documented contract), different copy than the other 35 sites. | `src/app/api/uploads/[name]/route.ts:31-35` vs `src/lib/api.ts:43-47` | **R-23** |
| F-226f | Low | **Parity-225's F-225e pin list omits captures-225.ts** — the round's own capture script (the one "born on the convention") is the unguarded member of the family; a future edit dropping the override/tripwire/refusal passes the whole suite. | `tests/parity-225.test.ts:65-69` | **R-23** |
| F-226g | Low | **captures-225 has no spawn-liveness check** — a slow-booting incumbent on :3000 can win the race: the 2.5s refusal probe returns "free" before the incumbent answers, the spawned child dies on EADDRINUSE silently (stdio ignored), and the 90s wait succeeds against the INCUMBENT — whose database is unknowable, the exact scenario the refusal exists to exclude. | `scripts/captures-225.ts:120-133` (the probe), `:55-63` (stdio ignore), `:66-80` (the tripwire detects, never prevents) | **R-23** |
| F-226h | Low | **The verify/resend email-keyed buckets are third-party-exhaustable — the DoS trade-off is unrecorded.** Anyone knowing a victim's email can burn verify-acct (60/15) and resend-acct (10/15) with unauthenticated junk, 429ing the victim's legitimate verification funnel for 15-minute windows (the route's own e2e legs demonstrate the burn). Placement remains correct (the existence oracle is worse); the residual just needs recording. | `src/app/api/auth/verify/route.ts:54-55`; `src/app/api/auth/resend/route.ts:43-44` | **R-23** (the record) |
| F-226i | Low | **The audit's ring-offset retirement claim is INVERTED — the reference itself carries `ring-offset-background`, and our TABS_SEGMENTED LACKS it.** Live probe (scripts/probe-226-ring.ts): the reference's Analytics tab triggers carry `ring-offset-background` byte-extractable in their class strings, computing the offset to its `--background` token (hsl 0 0% 3.9% = #0a0a0a in the fresh-visitor dark posture). Our TABS_SEGMENTED.trigger (the family Analytics + Expenses actually render) omits the class — the focused tab's ring offset paints the v4 DEFAULT #fff: a WHITE 2px halo under the focus ring on a dark page where the reference paints #0a0a0a. SELECT_TRIGGER and TABS_PILL already carry the class (byte-extracted) and must KEEP it. (The neo-crm F-129c1 retirement doctrine does NOT transfer — that reference's background was the divergent value; here the class IS the reference's own.) | `src/lib/page-layout.ts:313-314` (SELECT_TRIGGER keeps), `:349-350` (TABS_PILL keeps), `:340-343` (TABS_SEGMENTED lacks it); the probe (session 226) | **R-23** (the ADD, recorded so the inverted claim cannot resurface — the F-207c pattern) |
| F-226j | Low | **The Expenses quick-adder wrapper carries aria-label on a role-less div** — inert attribute, the F-218m doctrine class (HealthGauge got role="img" for exactly this). | `src/app/(app)/expenses/page.tsx:548` | **R-23** |
| F-226k | Low | **Per-row action buttons lack row context on four surfaces — inconsistent with the three sites the repo already corrected.** expenses Edit, accounts Edit/Remove, goals Edit/Delete, income Edit/Pause|Activate all announce bare "Edit, button" N times; the sibling deletes (expenses, investments, settings budgets) carry sr-only context. | `src/app/(app)/expenses/page.tsx:193-202`; `accounts/page.tsx:174-184`; `goals/page.tsx:154-177`; `income/page.tsx:177-187` | **R-23** |
| F-226l | Low | **MenuContent's dark arm diverges from the reference's measured panel** — ours renders stone literals (`dark:bg-stone-900` #1c1917, `dark:border-stone-700` #44403c) while the reference's dark user-menu panel measures rgb(10,10,10)/rgb(38,38,38) — the flipped token family every sibling popover rides (Select listbox, dialogs, Popover). Live-probed on BOTH apps (scripts/probe-226-menu.ts). Light-mode values are byte-identical either way (#ffffff/#e7e5e4). | `src/lib/page-layout.ts:325-326`; the probe (session 226) | **R-23** |
| F-226m | Informational | **The gradient CTA/KPI contrast family is parity-sanctioned but unregistered** — white/white-alpha text on the emerald→teal and rose→red gradient CTAs and the KPI/Stat tiles computes 1.6–3.7:1 across most of each gradient; the a11y gate sanctions the arms (F-219b/F-208a citations) but unlike the brand wordmark (F-224y) there is no measured-value register entry — a future contrast sweep will "discover" it again. | `src/lib/page-layout.ts:243-250`; `src/components/shared/page-parts.tsx:97-122`; `src/app/(app)/analytics/page.tsx:197-219` | **R-23** (the register, the F-224y pattern) |
| F-226n | Informational | **The ±HH bare-offset comment is wrong for the locale-designated shapes** — "the ±HH bare form is regex-tolerated but V8-rejected on these shapes, so the row skips" is false: "Nov 1, 2026 10:00 +09" and its siblings PARSE in V8 and stage the WRITTEN day through the designated arms (live-probed, all three zones — arguably better than documented). A future maintainer "fixing" toward the documented skip would change real behavior. | `src/lib/csv.ts:281-282`, `:158-159` | **R-23** (the comment truth + a pin) |
| F-226o | Informational | **"2026-11-01T24:00:00Z" stages the WRITTEN day while V8 reads the next day** — ISO 8601 end-of-day; the written-literal doctrine says the digits wrote Nov 1 (doctrine-consistent), but the edge is unpinned. | `src/lib/csv.ts:211-212, 390-410` | **R-23** (the pin) |
| F-226p | Informational | **The F-225c source pins do not pin the bucket WINDOW** — `, 60,` stops before `15 * 60 * 1000`; a window shrink (e.g. to 15s) passes the source pins AND the e2e legs (61 requests complete well inside 15s). Placement (before findUnique) is likewise unpinned at the source tier. | `tests/parity-225.test.ts:33-50` | **R-23** (the extension) |
| F-226q | Informational | **Signup's first-user admin assignment is a count-then-create TOCTOU** (two concurrent first signups can both read count===0) — role gates nothing (zero authz consumers), the invariant "exactly one admin" is unenforced. F-225p re-met by the session-226 audit; standing. | `src/app/api/auth/signup/route.ts:68,86` | recorded (standing) |
| F-226r | Low | **verifySchema/resendSchema accept non-format emails** — `emailField` without the `emailFormat` regex signup/forgot apply (verified by execution: "nodot@" parses); arbitrary strings become acct-bucket keys. login's omission is the deliberate don't-reveal choice; verify/resend gain nothing from it. | `src/lib/schemas.ts:71-81` | **R-23** |
| F-226s | Informational | **The session-226 audit's clean-surface confirmations (the negative results, recorded for the next audit's baseline).** The rate-limit doctrine exact at every standing number (19 buckets verified); ownership/authz airtight across all 29 routes (404-never-403 holds); auth crypto sound (timing-safe, tokenVersion wired, hashed reset tokens, atomic consumption); CSRF closed (content-type gate + SameSite=Lax); body caps correct (16KB/4MB/1MB/5MB seams); injection closed (parameterized, static raw SQL, LIKE strip); the R-22 cures re-verified (bucket placement/sizing, skip-link z-[60], the captures-225 normal path); the Tailwind v4 token audit CLEAN (every used palette family/step and semantic token compiles in the built CSS — verified against the production chunk); no phantom xs: variant; the .dark block flips both token families; the mobile drawer's full contract implemented and e2e-pinned; the OTP paste/whole-store-subscription/button-type/meter-bar/error-toast/h-screen items noted as Informational with no action this round. | the three audit passes (session 226) | recorded |

### Session-227 audit (three Mode-C passes, every material claim re-verified)

| ID | Severity | Finding | Evidence (file:line) | R-item |
|---|---|---|---|---|
| F-227a | High | **The owner's post-226 session-log commits created `docs/worklog.md` as a SYMLINK LOOP — `bun run build` FAILED at HEAD.** Commit 3bd0255 created the alias as a relative symlink targeting `worklog.md`; relative targets resolve from the SYMLINK'S OWN DIRECTORY, so `docs/worklog.md` → `docs/worklog.md` — an infinite loop. The cold-baseline build reproduced the failure exactly: Turbopack's DirAssetReference (the upload routes' file tracing walks the project tree) hit `Symlink docs/worklog.md is in a symlink loop` and the build exited 1 — the gate was unshippable at HEAD (lint/tsc/unit/smoke/e2e all pass; only the build leg walks the loop). The owner's intent (an alias so legacy `docs/worklog.md` references resolve to the canonical root log) is preserved by repointing the target to `../worklog.md`. | the cold baseline (session 227): `bun run build` exit 1 at 3bd0255, `Symlink docs/worklog.md is in a symlink loop: ["docs/worklog.md"]`; git show 3bd0255 (mode 120000, content `worklog.md`); the fixed symlink + the green build after | **R-24** |
| F-227b | Medium | **The investments holdings table resolves rows by SYMBOL — duplicate-symbol holdings get duplicate React keys and Edit/Delete act on the WRONG row.** `stats.holdings` (the portfolioStats seam) drops the id that InvestmentLike carries; the page resolves each row's action target via `investments.find((i) => i.symbol === row.symbol)` (first match wins) and keys `<tr key={row.symbol}>`. Two holdings sharing a ticker is NORMAL portfolio behavior (multiple lots, a double-entered symbol) and neither the Zod schema nor the Prisma schema forbids it. Live-reproduced by the audit pass (two ZZQA holdings: React logged the duplicate-key warning; the Edit button on the row displaying "SECOND HOLDING" opened the dialog prefilled with FIRST HOLDING's record — and Delete on the second silently deletes the FIRST: user-visible wrong-row data mutation). The F-221t informational tail carried this edge; promoted to a cure this round. | `src/app/(app)/investments/page.tsx:282` (find by symbol), `:285` (key by symbol), `:324-335` (Edit), `:336-351` (Delete); `src/lib/finance.ts:456-481` (the seam drops the id); the live repro (session 227, scratch rows cleaned up) | **R-24** |
| F-227c | Low | **The [id] mutation family splits the ownership guard from the mutation — a TOCTOU window where the write's WHERE carries only `id`.** All 5 resource families (transactions, accounts, income-sources, investments, goals — 10 PUT/DELETE sites) first prove ownership with a scoped `findFirst({ id, ownerId })`, then mutate by BARE id (`update/delete({ where: { id } })`). No API path mutates ownerId today, so the guard holds in practice — but the pattern diverges from the house's own atomic conditional form (reset-password's `updateMany` with id+token+expiry in the WHERE) and silently becomes a cross-account-write hole the moment any ownership-mutating surface lands. The cure is mechanical: `updateMany/deleteMany({ where: { id, ownerId } })` with `count === 0` answering NOT_FOUND (PUT re-reads the fresh row for the response envelope — the store refreshes after every mutation and never consumes the stale record). | `src/app/api/transactions/[id]/route.ts:27-30,39-41,82` and the same shape in accounts/income-sources/investments/goals `[id]/route.ts`; the atomic precedent `src/app/api/auth/reset-password/route.ts:87-93` | **R-24** |
| F-227d | Low | **`wealth-os_SKILL.md` (64 KB) is missing from `outputFileTracingExcludes`** — the F-170a artifact-hygiene list names every OTHER root-level doc (AGENTS, CLAUDE, README, PAD, neo-crm_SKILL, worklog) but not the repo's own distilled skill doc, so it rides every standalone artifact under the documented nft repo-root fallback. Pure hygiene, no secrets, no runtime effect. | `next.config.ts:46-75` (the list); `wealth-os_SKILL.md` at repo root (63 KB) | **R-24** |
| F-227e | Low | **The investments Edit button lacks the row-context sr-only tail — the F-226k cure's missed fifth surface.** The round landed the tails on expenses/accounts/goals/income but not investments' Edit — which sits BESIDE a Delete that already carries `<span className="sr-only">Delete {row.symbol}</span>`, making the surface internally inconsistent (a screen-reader user hears "Edit, button" N times with no row context). | `src/app/(app)/investments/page.tsx:324-335` (bare Edit) vs `:349` (the tailed Delete); the parity-226 pin family `tests/parity-226.test.ts:167-184` | **R-24** |
| F-227f | Low | **Two latent sub-AA destructive variants carry no measured-value citation.** Button's `destructive: "bg-danger text-white"` and Badge's `destructive: "bg-danger text-neutral-50"` both ride white/neutral-50 on --color-danger #ef4444 ≈ 3.76:1 — below the 4.5:1 AA bar for normal text. Zero live consumers today (all live variant usage is outline/ghost), so nothing renders sub-AA — but the F-225l/F-226m measured-value-citation pattern exists exactly so a future consumer doesn't inherit the arm silently. | `src/components/ui/button.tsx:69`; `src/components/ui/badge.tsx:36`; the F-218j/F-225l measurement family | **R-24** (the register) |
| F-227g | Informational | **scrypt rides Node's default cost (N=16384), 8× below OWASP's 2^17 recommendation.** Online attacks are bounded (login 10/IP + 30/acct per 15 min, timing equalizer), so this is purely the offline-cracking cost after a hypothetical credential-store exfiltration. The migration hazard is real: the stored format `scrypt:salt:hash` does not encode cost params, so raising N invalidates every stored hash — the honest cure is the param-encoded format `scrypt:N:r:p:salt:hash` with legacy dual-read in verifyPassword and rehash-on-login, a dedicated auth round. Recorded with the design so the next dependency/security round can execute it deliberately. | `src/lib/password.ts:13-17` (no options object) | recorded (the design) |
| F-227h | Informational | **User.resetToken has no index — the public reset lookup is a full table scan.** Negligible at self-hosted user counts (route capped 10/IP/15min); the documented single-owner-scale posture (the F-226d family). An `@@index([resetToken])` joins the next schema round if the users table ever grows. | `prisma/schema.prisma:46` (column, no index); `src/app/api/auth/reset-password/route.ts:63` | recorded (standing) |
| F-227i | Informational | **login's per-account bucket keys on a format-unvalidated email** — the F-226r half that stayed loose (login's omission is the deliberate don't-reveal choice). Each unique junk string mints a Map entry for 15 min, bounded by the per-IP cap on honest deployments; rides the already-documented F-218t XFF residual. If ever tightened without giving up the posture: key the bucket on a fixed-length digest of the email. | `src/lib/schemas.ts:45-53` (bare emailField); `src/app/api/auth/login/route.ts:42-47` | recorded (standing) |
| F-227j | Informational | **signup's first-user-admin assignment races** (two concurrent first signups can both read count===0 and both receive "admin") — role gates nothing (zero authorization consumers, display-only), the P2002 email-uniqueness cure already holds. F-225p/F-226q re-met by the session-227 audit; standing. | `src/app/api/auth/signup/route.ts:68,86` | recorded (standing) |
| F-227k | Informational | **Global search misses non-ASCII case folds** — SQLite's LIKE folds ASCII only, so a stored `CAFÉ` is not found by query `café` while the ASCII parts fold. Plausible with imported bank labels; edge-case misses only, no security dimension. Same "revisit" family as the F-225f literal-fidelity note. | `src/app/api/search/route.ts:27-29` + Prisma contains → SQLite LIKE | recorded (standing) |
| F-227l | Informational | **The transactions account-link TOCTOU answers 500, not 400** — an account deleted between the ownership check and the create/update makes the write hit the FK constraint (P2003), which the catch maps to INTERNAL (isRecordNotFound checks P2025 only). No data corruption (the FK holds); a rare ms-window 500. Folded into the F-227c cure: a P2003 arm answering BAD_REQUEST("Selected account does not exist") on POST and PUT. | `src/app/api/transactions/route.ts:46-51,53-67`; `src/app/api/transactions/[id]/route.ts:32-37,39-55` | **R-24** (folded) |
| F-227m | Informational | **The Analytics range filter parses stored dates with raw `new Date()`** — self-consistent today (both comparison sides resolve to UTC-midnight instants; agrees with the toDate-routed seams on the calendar date), but a letter-violation of the toDate doctrine and one edit away from the F-219e mixed-mode regression. Tidied this round: all three parses route through toDate (behavior-identical) so the doctrine holds uniformly at the seam. | `src/app/(app)/analytics/page.tsx:89-96` | **R-24** (the tidy) |
| F-227n | Informational | **Three dead radius tokens in @theme** — `--radius-card/--radius-button/--radius-pill` have zero consumers repo-wide (every radius rides literal rounded-* utilities) and no reserved-token register entry; the next token sweep re-litigates them. Retired this round (the F-225m dead-outline retirement precedent). | `src/app/globals.css:146-148` | **R-24** (the retirement) |
| F-227o | Informational | **The session-227 audit's clean-surface confirmations (the negative results, recorded for the next audit's baseline).** The API layer: every catch site logs through the seam (F-226c holds), owner-scoping airtight across all sessioned Prisma calls, envelope contract exact on all 30 handlers, no injection surfaces, body caps correct, sessions/cookies sound (timing-safe, httpOnly/SameSite/Secure-in-prod, tokenVersion eviction), headers complete; the import route's 5000-row worst case live-executed clean through PrismaLibSql (~1.5 s). The UI layer: the Tailwind v4 hazard scan CLEAN (no phantom breakpoints, zero unpinned palette steps, every semantic token resolves, no var() chains in @theme, the @source not family intact); the .dark flips complete token-by-token; the toDate doctrine held at every display/prefill seam (the one raw new Date() on a true timestamp is per-doctrine); hydration safety sound (the loading-gate pattern); the mobile drawer's full contract intact; focus/kbd/a11y contracts held; route twins + the per-casing metadata family complete; recharts v3 cures standing; the store clean. The reference STABLE on all four standing layers (bundle md5, zero-data census, 256/9 sidebar, TRUE-390 menu opens with 9 links); `bun audit` unchanged (1 moderate dev-chain minimatch, range-unreachable); neo-crm upstream unchanged since Nov 5 (b3d0fbe); the SEO surface live-verified (sitemap 9 URLs, robots, manifest). The Expenses history layout's odd genus (the full list in a narrow right column) verified as the REFERENCE'S OWN via the session-199 capture — parity, not a defect. | the three audit passes (session 227) | recorded |

### Session-228 audit (three Mode-C passes, every material claim re-verified)

The findings-led round (no open R-item carried in; R-24 closed clean at
v2.24.0). The cold-baseline gate GREEN at HEAD b89d5b2 — lint 0/0 ·
tsc 0 · 1162/1162 unit (74 files) · build · smoke 15/15 · 136/136 e2e ·
census MATCH — the v2.24.0 ship state reproduced exactly, no discovery.
The standing layers re-verified: the reference STABLE (probe:ref — the
bundle md5 unchanged, the demo data zero, the desktop nav 256/9, the
TRUE-390 menu opens with 9 destination links); `bun audit` unchanged
(1 moderate dev-chain minimatch, the documented deferral); neo-crm
upstream unchanged since Nov 5 (b3d0fbe) — nothing to port; the SEO
surface (smoke leg 12: sitemap + robots + manifest 200); the .env
contract + the .env.example six-knob set. The re-lettered ledger (the
passes' raw labels F-228-B1…B8 and F-228a…i folded into one series):

| ID | Severity | Finding (verified at file:line by the driving session) | Evidence | Disposition |
|---|---|---|---|---|
| F-228a | Low | **The Analytics "Holdings Performance" chart still keys by SYMBOL — the F-227b duplicate-symbol genus survives in the second holdings surface.** The chart maps `stats.holdings` (which now carries each lot's id) straight to bar data: `data={stats.holdings.map((h) => ({ symbol: h.symbol, gain: h.gainLoss }))}` with `<Cell key={h.symbol}>` and the XAxis on `dataKey="symbol"`. Two same-symbol lots — the exact normal multi-lot state F-227b premised — produce duplicate React keys AND two bars mapped to one category (recharts renders both at the same x, the second over the first). Display-only (no row actions here), but the wrong-display genus and the console warning both fire. The cure: a per-symbol GAIN FOLD joins the finance seams (`gainBySymbol` — one bar per symbol, gains summed, symbols unique by construction) and the chart rides it. | `src/app/(app)/analytics/page.tsx:439` (the data map), `:450-451` (the Cell keys); the seam `src/lib/finance.ts:444-489` carrying id since R-24 | **R-25** |
| F-228b | Low | **A dead/unregistered @theme token family rides every build — several "live-looking" utilities compile ONLY because code comments name them.** `--color-brand` (a #f59e0b duplicate of --color-primary) and `--color-subtle` have zero consumers repo-wide (no bg-/text-/border-/ring- class anywhere; no utility in the built CSS) and neither is in the F-224t reserved register; of the F-214e shadcn neutral set, `popover`/`popover-foreground`/`secondary-foreground`/`accent`/`accent-foreground`/`muted-foreground` also have zero code consumers — yet `.bg-popover`, `.text-popover-foreground`, `.text-muted-foreground`, `.focus\:bg-accent`, `.focus\:text-accent-foreground` all compile into the production CSS purely because COMMENT STRINGS in select/dropdown/table/tabs/dialog carry the class-shaped text (the exact F-224v doctrine violation: "reword the comment; don't add a glob for it"). The live members of the set (`--color-input` via border-input, `--color-secondary` via hover:bg-secondary, the card pair) stay. The cure: retire the eight dead tokens + their .dark flips, reword the comment carriers, recalibrate the dark-tokens pin (its --color-subtle flip assertion), and prove the built CSS shrank (the before/after sentinel probe — the dead utilities disappear, a live utility stays). | `src/app/globals.css:63` (brand), `:74` (subtle), `:96-101` (the six), `:375-378` (the .dark flips); the carriers `src/components/ui/select.tsx:81,114`, `dropdown.tsx:98,108`, `table.tsx:47`, `tabs.tsx:11,17`, `dialog.tsx:107`, `src/app/(app)/dashboard/page.tsx:591`; the built-chunk verification (the audit pass) | **R-25** |
| F-228c | Low | **The Analytics CSV export's Date column parses the stored date RAW — correct today, but the INVERSE hazard of F-227m: a future doctrine-uniformity "tidy" would corrupt it east of UTC.** `value: (t) => new Date(t.date).toISOString().slice(0, 10)` is a letter-violation of the toDate doctrine, yet it is the one place the raw parse is CORRECT: `t.date` is the stored UTC-midnight ISO form, so raw-parse → toISOString is an identity in every zone. Ironically routing it through toDate() (the "doctrinal" edit) would re-anchor to LOCAL midnight and emit the PREVIOUS day for every UTC+ viewer — the mirror image of the F-219e regression. The strictly safer form eliminates the Date math entirely: `t.date.slice(0, 10)` (unambiguous on both the stored .000Z form and a bare yyyy-mm-dd). | `src/app/(app)/analytics/page.tsx:128`; the F-227m comment block at `:89-93` covering only inRange | **R-25** (the string-slice) |
| F-228d | Low | **`upcomingAlerts` drops the transaction id; the dashboard Upcoming list keys by description+index.** The seam's `UpcomingItem` carries no `id` (its `RecentActivityRow` sibling does, and the dashboard keys that list by `row.id`), so the Upcoming `<li>` compensates with `key={`${item.description}-${i}`}` — two recurring rows sharing a description ("Rent" twice) fall back to index identity. No row actions on this list (cosmetic reconciliation risk only), but it violates the list-identity doctrine the F-227b cure just re-affirmed. | `src/lib/finance.ts:391-397` (the interface), `:423-433` (the map drops t.id); `src/app/(app)/dashboard/page.tsx:421-423` (the composite key) | **R-25** |
| F-228e | Low | **verify/resend leak pending-verification state through a scrypt TIMING side-channel — the no-leak banner design's own unfinished tail.** Both routes answer the unknown-email/no-pending-code case IMMEDIATELY while the known branch burns scrypt (~50–100 ms): verify only reaches `verifyVerificationCode` (scrypt) for a known email with a live pending code and not locked out; resend only reaches `hashVerificationCode` (a full scrypt + DB write) for a known email with a hash present. Latency therefore distinguishes account states the byte-identical banners (F-223l/F-224b) deliberately hide. Login solved this exact class with `timingEqualizerHash()` (S72-C); forgot-password documented its fsync-scale residual; this pair never got the equalizer. The cure: burn the same work shape on the miss branches (verify: `verifyVerificationCode(code, timingEqualizerHash())`; resend: `hashVerificationCode(generateVerifyCode())`), the DB-write residual documented — the login-posture family now uniform. | `src/app/api/auth/verify/route.ts:73-94` (fast miss) vs `:106` (the burn); `src/app/api/auth/resend/route.ts:64-68` (fast miss) vs `:70-78` (the burn + write); the equalizer `src/lib/password.ts:39-46`; the login precedent `src/app/api/auth/login/route.ts:63` | **R-25** |
| F-228f | Low | **The uploads surface is write-only with no capacity bound and no lifecycle — disk growth is rate-bounded per window but unbounded over time.** Nothing in `src/` ever deletes an upload (grep-verified: no unlink/rm/deleteFile); the surface has ZERO UI consumers today (photoUrl is read-only display metadata, profileUpdateSchema is name-only — so the audit's "orphaned profile photos" angle is theoretical), but the API accepts 20 × 5 MB / 15 min / IP ≈ 9.6 GB/day from one sessioned caller (worse under the recorded F-218t XFF-rotation residual on direct-exposure deploys). The deeper design gap: uploaded files are ANONYMOUS (UUID names, no owner tag, no DB row) — per-user cleanup is impossible without a schema change. The cure this round: an honest self-hosted capacity ceiling (256 MB total / 4096 files, a new 507 STORAGE_FULL envelope member, the check before the write) + the repo-root memoization (F-228i); the owner-tag/retention design recorded for a future round. | `src/app/api/upload/route.ts:103-108` (the only write, no bound beyond per-file size); the zero-consumer greps (photoUrl/upload); the rate caps `:32` | **R-25** (the ceiling) + recorded (the owner-tag design) |
| F-228g | Low | **`Transaction.accountId` has no index — the `onDelete: SetNull` cascade full-scans the transactions table on every account delete.** SQLite does not auto-index FKs and Prisma does not add one; deleting a BankAccount (single delete or /api/reset's owner wipe) fires `UPDATE Transaction SET accountId = NULL WHERE accountId = ?` — a table scan per deleted row at exactly the scale the import ceiling grows (5×5000 rows/15 min). Correctness unaffected (the FK holds); a perf-at-scale gap in the heavy table. Folds the recorded F-227h (`User.resetToken` unindexed — the public reset lookup scans the users table) into the same schema round: both indexes are additive, db:push-safe on populated dbs. | `prisma/schema.prisma:96,101` (the column + the SetNull relation), `:104-114` (the index block — ownerId/date/type/category/budgetCategory/[ownerId,date], no accountId); `src/app/api/accounts/[id]/route.ts` + `reset/route.ts` (the delete paths) | **R-25** (+ F-227h folded) |
| F-228h | Informational | **`getSessionUser()` fetches the FULL User row — passwordHash, resetToken, and verificationCodeHash ride every sessioned request.** No leak (the secrets never leave the server; the seam returns a 7-field projection) — but ~25 protected handlers pay for three extra columns (two 200+ char hashes) on the hot path, and secret material sits in scope without need. The cure: an explicit `select` of exactly the consumed fields (id, email, name, avatarColor, photoUrl, role, tokenVersion, createdAt). | `src/lib/auth.ts:170-177` | **R-25** (the projection) |
| F-228i | Informational | **`uploadsDir()` re-resolves the repo-root anchor chain and issues `mkdirSync` on every upload GET/POST.** Cheap (one stat/mkdir pair per request) but avoidable on the hot public GET route; the capacity check (F-228f) adds a directory walk per upload, so the memoization lands with it: the resolved root caches per process (the root cannot move at runtime), the on-demand create stays. | `src/lib/uploads.ts:98-102`; the consumers `upload/route.ts:106`, `uploads/[name]/route.ts:47` | **R-25** (folded into F-228f) |
| F-228j | Informational | **budgets DELETE answers a 200 no-op for an unknown category — the one mutation surface diverging from the count===0→NOT_FOUND doctrine the [id] families just uniformed.** The `deleteMany` result is ignored: a category that never existed (or was already deleted) answers `{ok:true}` exactly like a hit. Idempotent delete-by-key is defensible in isolation, but the R-24 refactor made conditional-mutation semantics the house norm; a future contributor applying either pattern to the other surface is the drift hazard. Aligned: `count === 0 → ERR.NOT_FOUND("Budget")` (zero e2e/UI legs delete the same budget twice — verified). | `src/app/api/budgets/route.ts:80-88` | **R-25** (the alignment) |
| F-228k | Informational | **The Expenses filters trigger carries `aria-expanded` but no `aria-controls`; the popover is not id-linked.** The trigger↔panel programmatic link is the remaining ARIA-completeness gap for a non-modal popover (Escape + outside-close + the F-217a/F-218b portal exclusions all hold). The accepted pattern for a conditional panel: the id exists when open, `aria-controls` references it from the trigger. | `src/app/(app)/expenses/page.tsx:282-295` (trigger), `:296-301` (the panel) | **R-25** |
| F-228l | Informational | **Two stale docblocks carry factually wrong claims (the F-220n family).** (a) `spendingByDayOfWeek`'s comment says "Day-of-month spending histogram … early/late month weight" while the function buckets by `getDay()` (day of WEEK, Sun–Sat) and the Analytics card is titled "Spending by Day of Week" — a maintainer "fixing" the code toward its comment would change real behavior. (b) badge.tsx's variant comment claims "OUR --primary token is deliberately the app blue #2563eb" while globals.css pins `--color-primary: #f59e0b` (the session-199 amber rebrand) — the neutral-literal reasoning still holds, only the cited value is stale. Both corrected in-commit. | `src/lib/finance.ts:598-599`; `src/components/ui/badge.tsx:13-17` | **R-25** (the corrections) |
| F-228m | Informational | **Settings' Default Currency and Date Format selects persist preferences no display seam consumes** — a user selecting EUR + dd/MM/yyyy sees $ and US dates forever (formatMoney defaults USD at every call site; all dates render via hardcoded en-US formats). The F-220n retirement note documents the formatter's zero consumers; the user-facing half (a control that promises a preference) is its own superset gap. The reference ships the same decorative controls (parity genus). Recorded: wire `defaultCurrency` through the store as formatMoney's default in a future superset round; the date format needs a re-introduced consumer per F-220n's own re-entry condition. | `src/app/(app)/settings/page.tsx:139-173`; `src/lib/finance.ts:660` | recorded (standing) |
| F-228n | Informational | **Three index-keyed lists are structurally safe but off-doctrine (note-only).** The AI-coach transcript (append-only), the import preview's 50-row slice (rebuilt wholesale per file), and the six OTP boxes (fixed length) have no reorder/splice path — no wrong-identity behavior is reachable. If the chat ever gains transcript-clearing/splice, re-key by a monotonic counter. | `src/components/shared/ai-coach.tsx:96-98`; `src/app/(app)/import/page.tsx:256-257`; `src/components/layout/login-card.tsx:537-539` | recorded (standing) |
| F-228o | Informational | **The two monthly-trend charts ship no text alternative** (dashboard Cash Flow Overview, analytics Income vs Expenses) — the one chart genus whose data is not duplicated in sibling text (the donut/bar families carry legend lists; the HealthGauge carries role="img" + aria-label). The reference ships the identical construction (parity genus). A future superset could add a visually-hidden summary line ("6-month net trend: +$X/mo avg"); no parity action. | `src/app/(app)/dashboard/page.tsx:204-274`; `src/app/(app)/analytics/page.tsx:237-269` | recorded (standing) |
| F-228p | Informational | **The full-dataset reads (dashboard/export/coach) grow linearly with the import ceiling** — 6 unbounded findManys per navigation × the 25k-rows/hour import contract; the [ownerId, date] index backs the sort, not the payload. Deliberate client-side-derivation architecture (the F-219m family); this note names the growth consequence the ledger had not stated. Future consideration: window the dashboard payload (last N months + server aggregates) when real usage justifies it, or a soft row-count advisory at import. | `src/app/api/dashboard/route.ts:22-33`; `export/route.ts:29-41`; `ai/coach/route.ts:31-41` | recorded (standing) |
| F-228q | Informational | **The security-header set is the documented parity posture with a hardening ceiling: no Permissions-Policy, CSP is frame-ancestors-only.** The shipped set (Referrer-Policy, nosniff, HSTS, CSP frame-ancestors 'self' — F-217h) is sound and pinned (`tests/http-headers.test.ts`); the app uses no camera/geo/mic and no third-party scripts (the one dangerouslySetInnerHTML is the static theme bootstrap). A future hardening round could add `Permissions-Policy: camera=(), geolocation=(), microphone=()` and evaluate a nonce-based CSP once the theme bootstrap is movable. | `next.config.ts:103-126` | recorded (the next hardening round) |
| F-228r | Informational | **The session-228 audit's clean-surface confirmations (the negative results, recorded for the next audit's baseline).** The R-24 cures verified holding in BOTH passes and the driving session: the holdings table keys/resolves by row.id at table + seam, the investments Edit sr-only tail, the analytics range filter's toDate routing, all 10 [id] conditional-mutation sites + the P2003 seam, the logApiError family, owner-scoping airtight, the envelope exact on all 30 handlers, the bounded-reader CSRF/size gates, hashed single-use reset tokens, timing-safe compares, cookie flags, the rate-limit placement census, the search LIKE strip, the uploads GET name regex, the seed scoping. The UI layer: the toDate doctrine held at every display/prefill seam (the accounts lastSyncedAt raw parse is a per-doctrine true timestamp); the Tailwind v4 hazard scan CLEAN (no phantom breakpoints, every live utility/token verified compiled, no var() chains, .dark complete); hydration safety sound; the mobile drawer contract intact; the theme bootstrap logically equivalent to the seam; route twins + per-casing metadata complete; keyboard/focus/aria contracts held; the store write-token pattern complete. The reference STABLE on all standing layers; `bun audit` unchanged; neo-crm unchanged; the SEO surface verified. | the three audit passes (session 228) | recorded |
| F-229a | Medium | **The Analytics Income tab's empty state is UNREACHABLE — the F-219r gate's birth defect.** The gate reads `incomeTrend.length === 0`, but `categoryTrend` unconditionally pushes one point per month (`for (let i = months - 1; i >= 0; i--) … points.push(…)`), so the array always carries 3/6/12 zero points and the `EmptyState "No income in range"` branch can never render. A fresh user (or any income-free range) sees a flat all-zero area chart instead of the intended informative empty state — the one card whose gate is structurally unreachable (every sibling's gate is slice-correct). Live-probed on the reference: its zero-data Income tab renders NO chart at all (the whole card omitted); our informative-empty-state superset pattern is the established genus — the predicate was simply wrong from the F-219r birth. The cure: gate on income PRESENCE (`inRange.some(t => t.type === "income")`), the sibling-consistent range-domain predicate matching the message text; e2e-proven on a scratch user (the leg born RED on the pre-cure tree). | `src/app/(app)/analytics/page.tsx:383` (the gate), `:115-118` (the memo); `src/lib/finance.ts:620-633` (the unconditional loop); scripts/probe-229-income*.ts (the reference's empty Income tab) | **R-26** |
| F-229b | Low | **The budgets POST upsert lacks the P2002 concurrent-create arm — the one unique-keyed mutation surface missing the settings family's race cure.** Two concurrent POSTs for the same (owner, category, period) with no existing row both miss the upsert's read; the loser's create surfaces P2002 → the bare `ERR.INTERNAL()` 500 (a transient "Something went wrong" on a plausible client double-fire; retry succeeds, the constraint holds). The settings route's F-215i arm is the house precedent: catch P2002, recover gracefully. For budgets the semantically-correct recovery is a single upsert RETRY — the winner's row now exists, the update arm fires, the loser's amount applies last-writer-wins exactly like any concurrent update. | `src/app/api/budgets/route.ts:44-64` (the POST catch, INTERNAL-only); the precedent `src/app/api/settings/route.ts:25-36`; the unique key `prisma/schema.prisma` (`@@unique([ownerId, category, period])`) | **R-26** |
| F-229c | Low | **The seed is the sole writer of local-NOON calendar instants — a UTC-midnight convention deviation with a real viewer edge.** Every user-created calendar date routes through `dateField` → stored as UTC midnight (the `toDate` doctrine's exact form); the seed constructs local-noon `Date`s (`setHours(12, 0, 0, 0)` / `new Date(y, m, day, 12, 0, 0, 0)`), so `toDate`'s UTC-midnight re-anchor never matches and the raw instant passes through. A viewer whose zone is 12h+ AHEAD of the seeding server (Americas-seeded demo viewed from East Asia/Oceania) sees every seeded calendar date — and its month bucketing, relative-day labels, and edit prefill — shifted one day. No docblock documents the deviation (searched). The cure: stage every seed calendar date as UTC midnight (`Date.UTC(y, m, d)` — the `dateField` identity); the `date > now` future guard keeps working (today's UTC midnight ≤ now), the census bounds absorb the today-edge row delta, and every zone reads the written calendar. | `prisma/seed.ts:24-29` (`dayOffset`'s noon), `:224` (the tx date), `:236` (nextDate); `src/lib/finance.ts:88` (the UTC-midnight form `toDate` matches) | **R-26** |
| F-229d | Low | **THIRTY comment-only class-shaped tokens emit dead utilities — the F-228b genus the fixed-carrier-list pin cannot see.** The R-25 retirement caught the eight dead-token families, but the whole-tree scan (built-CSS × live-code diff, the emission ground truth) finds 30 more tokens quoted only in comments across 16 files: the biggest families are the reference-extraction docblocks (the reference's input heights `sm:h-12` ×4 sites, its slate-400 focus arms, its stone gradient stops, its card title `sm:text-lg`, its `max-w-[420px]` toast viewport, its `accent-foreground` ink ×7 sites incl. the F-228b retirement note itself re-quoting the token in globals.css) and the historical-retirement records (`md:h-14 md:w-14`, `md:p-6`, `p-12`, `mr-0`/`mr-1`, `pr-6`, `pt-4`, `max-h-72`, `animate-out`, `slide-in-from-bottom-4`, `appearance-none`, `bg-muted`, `flex-row`, `ring-ring` bare, `text-blue-700` bare, `lg:grid-cols-5`). Each emits a real rule (verified in the built stylesheet, e.g. `.accent-foreground{accent-color:var(--color-foreground)}`); none has a live consumer. The audit pass named 9; the whole-tree doctrine found 30 — the F-228b lesson a third time. The cure: reword ~28 comment sites (describe, never quote) + a WHOLE-TREE carrier invariant pin (any class-shaped comment token must be live or on a prose allowlist — the fixed-list pin retires) + the CSS sentinel probe (all 30 selectors disappear, live forms stay). | the locator table (session 229): `button.tsx:12,15,17,19,55,82,84`; `select.tsx:76,114,120`; `toast.tsx:90,121,122`; `label.tsx:33`; `tabs.tsx:10,14,72`; `card.tsx:19,37`; `dialog.tsx:71,72,79,86`; `input.tsx:14,36`; `mobile-nav.tsx:5-6`; `login-reset.ts:108,186,188`; `login-card.tsx:51`; `reset-password-screen.tsx:22`; `page-layout.ts:149,173,192,202,393`; `settings/page.tsx:33`; `globals.css:88`; `dashboard/page.tsx:591` | **R-26** |
| F-229e | Low | **The DialogHeader docblock's S15-P3 claim is FALSE — the reference does NOT center dialog titles below sm.** The docblock claims "the reference centers the title below sm (`text-center sm:text-left`) — the stock shadcn header," but `DIALOG_HEADER = "flex flex-col gap-1.5 text-left"` carries neither class and the reference's own live dialog (its Add-Expense panel at 390×844, this session's probe) renders its title `textAlign: start` — left-aligned at phone width, no centering anywhere. Our constant's left alignment IS the reference genus; the docblock (and its dead `sm:text-left` carrier, folded into F-229d) is corrected to record the truth. | `src/components/ui/dialog.tsx:70-73` vs `src/lib/page-layout.ts:290`; scripts/probe-229-dialog4.ts (the live measurement: panel title `textAlign: start` at 390) | **R-26** (the docblock truth; no constant change — the genus already matches) |
| F-229f | Low | **Six dead API surfaces ride the tree — the F-216j/F-220n family (zero consumers each, grep-verified).** (a) `ExpenseDialog`'s `presetCategory` prop: destructured, never read in the body, never passed by any caller; (b) `INCOME_CATEGORIES` and `CURRENCY_SYMBOLS` in constants.ts: zero src/test consumers (formatMoney carries its own symbol ternary); (c) format.ts's `startOfDay`/`startOfWeek`/`startOfMonth`/`startOfYear`/`subMonthsClamped`/`MONTHS_SHORT`: zero consumers (only `toDateInputValue` is live; finance.ts defines its own `startOfMonth`), and the file header cites `tests/format.test.ts` which does not exist; (d) `NAV_FOOTER_ITEMS = []`: zero consumers; (e) THE DRIVING SESSION'S OWN: the Tabs `pill` variant + `TABS_PILL` + the `cols` prop + `GRID_COLS` — only two Tabs consumers exist, both `variant="segmented"`, neither passes `cols` (the pill branch, the cols machinery, and the GRID_COLS map are unreachable; the N-66b comment's `lg:grid-cols-5` claim about page-layout is factually wrong — the constant carries no grid-cols at all). The `underline` variant (also currently uncalled) stays: it is the component's documented default genus — recorded with the F-220n re-entry condition (retire when Tabs gains a third consumer family or lose the default). | `src/app/(app)/expenses/page.tsx:382-387`; `src/lib/constants.ts:60-68,194-203`; `src/lib/format.ts:6-48`; `src/components/layout/nav-config.ts:41`; `src/components/ui/tabs.tsx:41-73` + `src/lib/page-layout.ts:375-379`; the consumer census (analytics:236, expenses:343 — both segmented) | **R-26** |
| F-229g | Low | **ADJUDICATED INVERTED by live probe — the Analytics cards' caption-less state IS the reference genus.** The audit claim: the month-scoped "Expenses by Category" / "Needs vs Wants vs Savings" cards lack the "This month" caption their Dashboard twins carry (data-semantics ambiguity on multi-month ranges). The probes: the reference's DASHBOARD captions exactly "Expense Breakdown" and "Budget vs Actual" with "This month" (our dashboard matches — genus), while its ANALYTICS cards carry NO captions at all (our two uncaptioned cards match the genus). The reference's own design is the split: dashboard captioned, analytics not. Our day-of-week card's "This month" caption is a superset honesty affordance (it disambiguates the ref-month bucket) and stays documented as such. No parity action; recorded so the next audit does not re-derive it. | scripts/probe-229-analytics.ts + probe-229-dash.ts (both card sets, live-read); `src/app/(app)/analytics/page.tsx:303,340`; `src/app/(app)/dashboard/page.tsx:312` | recorded (adjudicated) |
| F-229h | Informational | **Search's case-insensitive matching rides SQLite's ASCII-case-insensitive LIKE — a latent regression on the documented PostgreSQL path.** The route lowercases `q` then uses Prisma `contains` (SQLite LIKE: ASCII-CI by default — correct today). On PostgreSQL (the `.env.example` migration path, step-by-step), Prisma `contains` is case-SENSITIVE by default: "salary" would silently stop matching "Salary Deposit". Cure: the delivered-truth docblock note (the F-225f pattern) naming the dependency and the migration step (`mode: "insensitive"` on the four contains arms). | `src/app/api/search/route.ts:27-32`; `.env.example` (the PostgreSQL migration block) | **R-26** (the docblock note) |
| F-229i | Informational | **The Dashboard's KPI derivations recompute ~10 full transaction-filter passes per render outside useMemo.** Harmless at personal-finance scale (the heavy seams — series/breakdown/budget/upcoming/recent/health/insights — are already memoized with correct deps; `now` is render-stable). The F-214l family: touch only if a page ever proves render-bound. | `src/app/(app)/dashboard/page.tsx:81-91` | recorded (standing) |
| F-229j | Informational | **The source-hygiene tail.** (a) `mobile-nav.tsx` imports `next/navigation` twice (usePathname + useRouter on separate lines); (b) the `tone="navy"` PageHeader prop is misindented on 7 section pages; (c) the dashboard's Quick Actions h2 block carries an 8-space-indented comment. Zero behavior impact; cured in-commit as one hygiene pass (the F-225m precedent). | `src/components/layout/mobile-nav.tsx:29,31`; accounts:55, analytics:155, import:172, goals:52, settings:125, expenses:232, income:87; `dashboard/page.tsx:552-554` | **R-26** (in-commit) |
| F-229k | Informational | **The session-229 audit's clean-surface confirmations (the negative results, recorded for the next audit's baseline).** The R-25 cures verified holding in all three passes: gainBySymbol rides the analytics chart (one bar per symbol), the verify/resend equalizers burn on their miss branches, the uploads ceilings + STORAGE_FULL + the memoized root, both schema indexes, the getSessionUser projection, the budgets DELETE NOT_FOUND arm, the expenses aria-controls pair, the eight dead tokens stay retired, the CSV Date slice, the upcoming id. The API layer: the envelope, owner-scoping, logApiError, conditional mutations, P2003, body caps, rate-limit placement, no-enumeration, cookie flags — all clean (Pass B: 0/0/0 beyond the ledgered Lows). The UI layer: key discipline, dialog prefill identity, theme resolution, dark flips, a11y contracts, recharts posture, toDate at every display seam — clean (Pass C beyond the ledgered items). The Tailwind v4 hazard scan CLEAN (no phantom breakpoints; every USED token pinned — the dead carriers are comment-only, not code). The B3 upload-MIME claim re-derives the recorded F-222p tail (not reopened); the I1 whole-store subscription claim re-derives F-214l (not reopened). | the three audit passes (session 229) | recorded |
| F-230a | Medium | **The analytics StatCard's sub-AA ink arms carry no in-surface register entry — the F-224y WCAG exemption register's one uncovered surface.** The Avg Monthly stat tiles render `text-emerald-100`/`text-red-100`/`text-blue-100` labels (`text-sm font-medium`) and `text-2xl font-bold` white values over the saturated STAT_GRADIENTS 500→600 fills. Measured this session: emerald-100 #d1fae5 on emerald-500 #10b981 = **2.24:1**, red-100 #fee2e2 on red-500 #ef4444 = **3.08:1**, blue-100 #dbeafe on blue-500 #3b82f6 = **3.01:1** (AA bar 4.5:1 at 14px); the white values: 2.54:1 at the emerald-500 side (large-text bar 3:1 — passing only on the 600 side), 3.76:1 red-500 / 3.68:1 blue-500. Every sibling sub-AA genus carries the register note (GradientKpiCard — page-parts.tsx:98-105, which mentions this surface's emerald-100 label in passing; the CTA arms — page-layout.ts:248-257; syncedPill; brandWordmark); the StatCard docblock (analytics:484-487) describes the genus with no contrast note. ADJUDICATED by live probe (probe-230c): the genus is the REFERENCE'S OWN — its /Analytics tiles measured emerald-100 rgb(209,250,229), red-100 rgb(254,226,226), blue-100 rgb(219,234,254) on the identical `from-X-500 to-X-600` gradients with white bold $0.00 values, at its standing zero demo data. The cure: the register entry at the StatCard docblock (measured values + the probe citation) — NEVER a recolor (that would deviate from parity, the F-226i lesson class; the audit's "darken the label ink" recommendation was rejected). | `src/app/(app)/analytics/page.tsx:219-241` (the tiles), `:484-507` (the docblock + StatCard body); `src/lib/page-layout.ts:184-188` (STAT_GRADIENTS); scripts/probe-230c.ts (the live measurement); the register precedents page-parts.tsx:98-105 + page-layout.ts:248-257 | **R-27** (the register entry) |
| F-230b | Medium | **ADJUDICATED INVERTED by live probe — the dashboard Cash Flow Overview card renders UNCONDITIONALLY on the reference itself at zero data; our unconditional render IS the parity genus.** The audit claim: every chart wrapper declares a zero-data policy except this one — `cashFlowSeries` always returns N points (finance.ts:191-207), so a zero-transaction viewer sees a flat all-zero chart, and the recommendation was a presence-predicate gate (the F-229a form). The probe (probe-230, the reference's standing ZERO demo state — its dashboard IS the zero-data case): the reference's own Cash Flow Overview card renders FOUR recharts surfaces with flat zero axes ("Jun 26 … $0k", no empty-state text, the card present). The reference's own design is the split: Cash Flow renders unconditionally; Expense Breakdown / Budget vs Actual / Upcoming carry the empty states (all three re-confirmed by the same probe, matching our gates). The F-229a cure applied to the Analytics Income tab because THERE the reference omits the card entirely at zero data — the two surfaces' genera differ by the reference's own design; the audit's recommendation would deviate from parity. No cure; recorded so the next audit does not re-derive it. | scripts/probe-230.ts (the live evidence); `src/app/(app)/dashboard/page.tsx:202-274` (the section); `src/lib/finance.ts:191-207` (the series contract) | recorded (adjudicated) |
| F-230c | Low | **The accounts lastSyncedAt display seam parses a raw `new Date()` on a stored field — the sole raw-parse survivor at a display seam.** `accounts/page.tsx:171` reads `new Date(account.lastSyncedAt).toLocaleDateString(...)` while every sibling seam routes through `toDate()` (expenses/income/goals and all dialog prefills). Behavior-identical today — `lastSyncedAt` is a true-timestamp `DateTime @default(now())`, so `toDate`'s fall-through branch yields the identical instant (finance.ts:92) — but the doctrine's grep is no longer clean and the seam is one edit away from the F-218d mixed-mode class. The cure: route through `toDate` (the F-227m doctrine-uniform precedent: behavior-identical, the tidy buys uniformity). | `src/app/(app)/accounts/page.tsx:171`; `prisma/schema.prisma` (BankAccount.lastSyncedAt); `src/lib/finance.ts:88-92` | **R-27** (the tidy) |
| F-230d | Low | **Two comments quote the retired phantom-breakpoint construction (`hidden xs:inline-flex`) — the F-207a history, violating the comment-invariant's letter.** mobile-header.tsx:8 and page-layout.ts:101 both narrate the F-207a cure by quoting the old class string. ADJUDICATED INERT as a carrier (xs is not a real v4 variant; no CSS emits; the parity-229 invariant's prefix set correctly excludes it — the carrier scan's output is prose false-positives only), but the letter of the comment-invariant ("no comment quotes a class-shaped string that is not live code") is broken and invites re-litigation at the next carrier sweep. The cure: reword both to non-class-shaped prose (the F-229d discipline — describe with spaces and words, never coin a new hyphenated form while retiring another). | `src/components/layout/mobile-header.tsx:8`; `src/lib/page-layout.ts:101`; scripts/carrier-scan-229.ts (the inert adjudication) | **R-27** (the rewords) |
| F-230e | Low | **Index keys on two append-only lists; the OTP boxes adjudicated acceptable.** (a) The ai-coach message list maps `key={i}` (ai-coach.tsx:96-98) — append-only today, but a future "retry replaces a message" edit would mis-associate DOM state; the cure: a minted id per message (the CoachMessage model gains an id; a ref counter mints at the three construction sites). (b) The import preview rows map `key={i}` (import/page.tsx:256-257) — a frozen `rows.slice(0, 50)` re-created wholesale per parse; the index IS the row's identity in that slice (a composite `${row.date}-${i}` still varies by index — nothing real); documented as index-identity by design. (c) The OTP boxes `key={idx}` (login-card.tsx:537-539) — fixed six slots; the index IS the box identity; documented. No wrong-record risk exists anywhere today (no actions attached to any of the three). | `src/components/shared/ai-coach.tsx:96-98,22,34,45,61,65`; `src/app/(app)/import/page.tsx:256-257`; `src/components/layout/login-card.tsx:537-539` | **R-27** (the ai-coach id keys; b/c documented) |
| F-230f | Informational | **The card.tsx docblock cites a constant that never existed — `CARD_TITLE_OVERRIDE`.** The comment claims the bigger reference title variants "arrive via CARD_TITLE_OVERRIDE at the call sites"; grep finds the name only in this comment — the call sites pass `className` directly (the CARD.title base + per-call `cn` overrides). A documentation inaccuracy only (not class-shaped; outside the carrier genus). The cure: reword to name the real mechanism. | `src/components/ui/card.tsx:35-40` | **R-27** (the reword) |
| F-230g | Informational | **The pre-auth faces hand-roll envelope parsing over six raw `fetch()` sites — the `call()` helper is module-private in the store by design.** login-card.tsx (×5) and reset-password-screen.tsx (×1) parse `{ok,error}` shapes inline (`res.json().catch(() => null)`, `body?.error?.message ?? fallback`). The reads were verified careful line-by-line; the authenticated surfaces all ride the store's `call()`. Recorded as a standing residual (the F-214l family): exporting `call()` would widen the client API for zero behavior gain — the envelope shape is pinned by the smoke ladder + the e2e battery, and the pre-auth faces need per-face error copy the destructive-toast helper does not model. Touch only if the envelope ever drifts (the pins would fail first). | `src/components/layout/login-card.tsx:130,177,214,243,282`; `src/components/layout/reset-password-screen.tsx:45`; `src/stores/wealthos-store.ts:39` | recorded (standing) |
| F-230h | Informational | **The session-230 audit's clean-surface confirmations + the recorded-tail re-derivations.** The R-26 cures verified holding across all three passes: the budgets P2002 retry arm present and correct, the seed stages UTC midnights (four Date.UTC constructions, zero setHours), the dead-API surfaces stay retired (presetCategory, the constant maps, the format helpers, NAV_FOOTER_ITEMS, the pill variant family), the hasIncome gate rides the Analytics Income tab, gainBySymbol renders one bar per symbol, the whole-tree carrier scan outputs prose false-positives only, the dialog docblock records the left-aligned truth, the search route names the Postgres path, mobile-nav carries one next/navigation import. Pass B's findings re-derived the recorded tail without new information: the in-band delivery default (its Medium — the standing F-217m owner-ask, boot-warned, knob-gated, not reopened), the signup admin-role TOCTOU (role has zero authorization consumers — the F-215m inert dimension; the race mints at most a second display-only admin), the console OTP print (rides the same F-217m knob), the XFF default posture (the F-218t documented trade), the signup 409 enumeration + the per-email bucket lockout-DoS (the F-224k recorded trade-off), the P2002-recovery no-trace nit (the settings family precedent — a recovered race logging nothing is the family's shape), the uploads check-then-write window (bounded by the 256MB/4096 ceilings — the F-228f family). Pass C's clean surfaces: the z-ladder, the theme three-way seam, the plain-div drawer contract, the `.dark` token flips, the route twins, the chart zero-data policies (analytics 7/7, investments 2/2, dashboard 5/6 + the Cash Flow adjudication above), the recharts Legend sorter, the store's single-client discipline. | the three audit passes (session 230) | recorded |

| F-231a | Low | **The Add/Edit Expense dialog's decorative amber "$" tile carries no aria-hidden — the F-225k family's one miss.** The DialogTitle renders `<span class="flex h-8 w-8 ... bg-amber-50 text-amber-600">$</span>` before the title text with no aria-hidden, so the dialog's accessible name computes "$ Add Expense" / "$ Edit Expense" — screen readers announce a stray "dollar sign". Every sibling decorative tile in the tree carries the attribute (the six F-225k icons, the ai-coach avatar spans, the KpiCard delta icons); this tile is the family's sole survivor, born at the session-199 transformation and invisible to every gate (axe evaluates the settled page, not the open dialog's title computation at the name level; the a11y legs never asserted the dialog's accessible name). | `src/app/(app)/expenses/page.tsx:478-483`; the family precedent `src/components/shared/ai-coach.tsx:117-127` | **R-28** (the aria-hidden) |
| F-231b | Low | **Four of the five auth-card view transitions drop focus to body with no announcement.** The login card swaps views in place (signin↔signup, signin→reset, reset→sent) and the reset screen swaps form→done — the focused control unmounts with the old view, focus falls to `<body>`, and nothing announces the new view. The verify view proves the pattern in-tree (its effect focuses code box 1 on transition, live-measured twice at both viewports); `goto()` is pure `setView`. Not a hard WCAG 2.2 SC failure (the context change follows explicit submission) but a real gap on the app's front-door funnel for SR/keyboard users. | `src/components/layout/login-card.tsx:112-121` (the verify pattern + goto), `:357-658` (the five views); `src/components/layout/reset-password-screen.tsx:95-116` (the done swap) | **R-28** (the heading-focus technique, value-guarded — the first boolean mountedRef design fell to the dev server's StrictMode double-invoke, live-caught by the captures face: the second invoke saw the flag set and fired the focus on the INITIAL load while the production-build e2e passed; the value-comparison guard (prevViewRef.current !== view) is idempotent under double-invocation — a new AGENTS gotcha) |
| F-231c | Low | **The dead Popover-family DropdownContent pins `z-[60]` — the skip-link's dedicated layer, off the flat z-scale.** The vendored dropdown's content class hard-codes the 60-level layer while its live MenuContent sibling rides z-50 (MENU_CONTENT). Zero rendered consumers today (the N-56e KEEP family), but a future consumer inherits a menu that paints above dialogs AND the skip-link's focused reveal — a latent violation of the documented z-ladder. | `src/components/ui/dropdown.tsx:28`; the scale `src/lib/page-layout.ts:351` (z-50) + the skip-link z-[60] (F-225d/F-224s) | **R-28** (re-pin z-50) |
| F-231d | Low | **FilterPolygon is dead and its docblock names three consumer surfaces that do not exist in WealthOS.** The hand-rolled CRM-era glyph (S17-P2b: lucide 0.525 dropped the old polygon `filter` shape) has zero consumers repo-wide — the WealthOS dashboard imports no Filter icon at all, "leads"/"contacts" are neo-crm surfaces, and the reference's own bundle carries no polygon glyph — while the docblock asserts "Used by the dashboard `Filter`, leads `Filters` and contacts `Filters` buttons". The file's second docblock (N-89c6, the lucide aria-hidden-injection superset note) is live documentation the audits cite and must survive the retirement. | `src/components/ui/icons.tsx:1-46` (the whole file); the F-229f re-entry rule; the N-89c6 note's new home `src/components/shared/page-parts.tsx` | **R-28** (retire the file; relocate the note) |
| F-231e | Low | **The Analytics "Spending by Day of Week" bar rides the Net-Savings hue on a spending series.** The chart paints `fill={CHART_COLORS.net}` (#f59e0b amber) while the palette doctrine assigns amber to Net Savings and rose (#f43f5e) to Expenses. ADJUDICATED by live probes (probe-231/b/c): the card is OUR OWN SUPERSET — the reference's four Analytics tabs (walked at its standing zero demo data) carry no day-of-week card on any tab, and the reference's JS bundle (1,402,874 bytes, md5-verified the standing fingerprint) contains neither the card title nor the polygon-adjacent strings; the card was born at the session-199 transformation. The amber was never reference parity — a palette mis-assignment on our own surface. The cure is drift-inert by construction: the sweep baselines are zero-data and the card renders its EmptyState at zero data (no recharts surface, no fill computed). | `src/app/(app)/analytics/page.tsx:306`; the doctrine `src/lib/constants.ts:159-165` (CHART_COLORS); scripts/probe-231.ts + probe-231b.ts + probe-231c.ts (the adjudication) | **R-28** (fill={CHART_COLORS.expenses}) |
| F-231f | Low | **The upload POST's multipart parse failure is swallowed with zero server-side trace — the one F-226c-genus site outside the logging retrofit.** `boundedRequest.formData().catch(() => null)` discards the parse error entirely (the 400 "No file provided" answer is correct, but the operator cannot distinguish attacker garbage from a network abort — exactly the class the F-226c retrofit cured across 31 catch sites; this lambda-catch form escaped the sweep). | `src/app/api/upload/route.ts:85`; the doctrine `src/lib/api.ts:67-69` (logApiError); the F-226c precedent | **R-28** (log inside the catch) |
| F-231g | Low | **The uploads GET logs every ENOENT miss at error level — a 404 on a capability URL is the normal case, not a fault.** The public serving route answers 404 for any unknown/unexpired name, and each miss flows through `logApiError` — up to 240 error-level lines per 15 minutes per IP from ordinary scanning, drowning the real I/O failures the seam exists to surface. | `src/app/api/uploads/[name]/route.ts:46-51` | **R-28** (gate ENOENT out of the error log) |
| F-231h | Low | **Five CRM-era zero-consumer constructs ride live files, and two comments cite "Event/Activity dialogs" that do not exist in WealthOS.** DialogFooterWide (the max-w-2xl family footer), DIALOG_FOOTER_WIDE, DIALOG_CONTENT.wide, Avatar + initialsOf (only avatarTextColor is live — the F-218n luminance seam): all zero-consumer CRM-era constructs in live files (grep-verified; no test pins), while the ai-coach dialog passes max-w-2xl directly — the .wide arm's only story is the CRM-era citation. The two "Event/Activity dialogs" comment citations (dialog.tsx:44-45, 87) name neo-crm surfaces, the F-224q docblock-truth genus. The shadcn-STOCK dead arms (button variants link/secondary/sidebar, sizes icon/iconSm/pill; DialogTrigger/Close/Portal re-exports) are a different doctrine — the vendored-stock KEEP (N-56e/F-227f) — and stay registered, not retired. | `src/components/ui/dialog.tsx:44-45,87,93-95,125-126`; `src/lib/page-layout.ts:292` (DIALOG_CONTENT.wide); `src/components/ui/avatar.tsx` | **R-28** (retire the five; reword the two citations) |
| F-231i | Informational | **The KpiCard TrendingDown glyph omits the explicit aria-hidden its TrendingUp twin carries.** Functionally safe — lucide-react 0.525 injects aria-hidden on any icon without an a11y prop (verified against the installed package source) — but the asymmetry invites re-litigation, and the KpiCard is the natural home for the relocated N-89c6 library-injection note. | `src/components/shared/page-parts.tsx:74-78` | **R-28** (the symmetry + the note) |
| F-231j | Informational | **The Expenses `visible` useMemo is defeated by a per-render filter.** `store.transactions.filter(...)` mints a fresh array identity every render, so the memo's dependency `[expenses, ...]` never hits — the memoization recomputes every render for nothing. Results identical; list sizes small; pure wasted work. | `src/app/(app)/expenses/page.tsx:78,131-141` | **R-28** (memoize expenses on [store.transactions]) |
| F-231k | Informational | **The Settings switch carries a vestigial `peer` class with no peer-* consumer.** The toggle button's class opens with `peer inline-flex...` but no sibling reads it (the label precedes the button in DOM) — a dead utility, likely a Tailwind v2-era checkbox idiom survivor. | `src/app/(app)/settings/page.tsx:421` | **R-28** (drop the class) |
| F-231l | Informational | **A trailing docblock in login-card.tsx documents a function that no longer exists.** "The WealthOS login logo — session-208 (F-208e): ... The CSS bar-chart mark this function used to draw is retired." — no function follows the comment; the `<img>` it references sits ~850 lines above. Comment-only doc rot. | `src/components/layout/login-card.tsx:877-881` (at the audit's line numbers) | **R-28** (fold into the img's comment) |
| F-231m | Informational | **Dead shadcn-stock arms in live vendored files — the register doctrine, not retirement.** Button variants `link`/`secondary`/`sidebar` + sizes `icon`/`iconSm`/`pill` (0 consumers; `destructive`'s deadness already registered F-227f), the DialogTrigger/DialogClose/DialogPortal re-exports (0 src consumers — every dialog opens via controlled state), and the Avatar family are stock-shaped API surface: deleting them makes the vendored file non-stock, and the F-227f pattern (register with citations, never silently inherit) governs. Recorded here so the next dead-code sweep finds the ledger row. | `src/components/ui/button.tsx:77-95`; `src/components/ui/dialog.tsx:18-20,125-126`; the F-227f/N-56e doctrine | recorded (the KEEP register) |
| F-231n | Informational | **The Expenses filters popover leaves `aria-controls` dangling while closed and does not close on Tab-away.** The `id="expense-filters"` div unmounts when closed (the attribute references nothing while inert — harmless), and keyboard users who Tab out leave the popover open (Escape + outside-pointer close work; the F-218b/F-217a cures). The reference's own popover is the same plain-div genus — closing on focus-out would be a superset behavior, not a parity fix. | `src/app/(app)/expenses/page.tsx:287,297-332` | recorded (the reference genus; superset optional) |
| F-231o | Informational | **The vendored Checkbox's own onClick can be silently clobbered by consumer props.** `onClick={toggle}` precedes `{...props}` on the button, so a consumer-supplied onClick replaces the toggle entirely (unlike MenuContent/DropdownContent which compose handlers). Zero consumers today (stock-file KEEP) — a latent footgun only. | `src/components/ui/label.tsx:66-83` | recorded (dead stock; compose if ever consumed) |
| F-231p | Informational | **The seed constructs its own PrismaClient — the letter of the singleton rule vs the one-shot script.** The rule guards the Next server (CWD/bun-absolutization mirror-dbs, hot-reload handle exhaustion); the seed is a one-shot bun script whose URL flows through the same `runtimeDatabaseUrl()` seam, so the hazard cannot fire. The census pin scopes to `src/` by design. Recorded so the next audit does not re-litigate. | `prisma/seed.ts:20-27`; the rule's scope `AGENTS.md` + `tests/db-census.test.ts:44` | recorded (the one-shot exemption) |
| F-231q | Informational | **Create schemas reject explicit null on optional fields where the update twins accept it as the clear.** Create-side optionals (`nextDate`, `nextPaymentDate`, `purchaseDate`, `targetDate`, `notes`, `institution`) fail an explicit null with 400; the update twins' `.nullable()` is the F-219q sanctioned clear. Defensible ("nothing to clear at create"); first-party UI omits the fields. Documented asymmetry, not a defect. | `src/lib/schemas.ts:187,261,387,450` vs `:227,287,426,468` | recorded (documented design) |
| F-231r | Informational | **The aggregate read surfaces return unbounded result sets.** The dashboard route returns six full-table findManys, export seven, coach five, the family GETs one each — the documented thin-read architecture (client-side derivation through finance.ts/ai.ts), bounded per-user by the import ceiling (25k rows/15min max). A scalability ceiling on the single-node box at multi-year volumes, not a correctness bug; server-side pagination is the recorded future seam. | `src/app/api/dashboard/route.ts:22-33`; the family | recorded (standing architecture) |
| F-231s | Informational | **The session-231 audit brief's own contract text misstated two recorded contracts — the adjudication record.** The brief claimed "uploads GET-by-name is sessioned" (the recorded contract is public capability-URL serving: the route's own docblock + F-225i + the F-217g note; names are 32-hex unguessable, MIME-allowlisted, immutable-cached) and "forgot-password 5/15" (the recorded F-222n contract is 10/IP/15min + the 20/15 forgot-acct secondary). The CODE matches the repo's documented contracts in both cases — the findings were adjudicated as brief errors, zero repo change. Recorded so the next audit brief quotes the ledger verbatim instead of memory. | `src/app/api/uploads/[name]/route.ts` (the docblock); `src/app/api/auth/forgot-password/route.ts:47`; the ledgers F-225i/F-222n | recorded (adjudication) |

### Session-232 audit (three Mode-C passes, every material claim re-verified)

Pass A (the R-28 cure surfaces): all twelve pinned cures verified holding
at file:line — the F-231b guards idempotent, the F-231h family intact,
the parity-231 pins honest. Pass B (API/auth/security): the envelope
discipline, scoping, injection surface, rate inventory, and error
handling all clean beyond the recorded tail. Pass C (UI/a11y/shell):
the token system mechanically airtight, the layer map, drawer contract,
and portal exclusions intact. The findings below were each re-verified
by the driving session before the row was written.

| ID | Severity | Finding (verified evidence) | Location | Disposition |
|---|---|---|---|---|
| F-232a | Low | **Four vendored shadcn-stock files carry zero consumers and no KEEP register entry — the F-231h genus, file edition.** `card.tsx` (the whole Card family), `table.tsx` (the Table kit), `label.tsx` (`Label` + the Checkbox), `input.tsx` (`Input` + `Textarea`) are imported nowhere in src (import census: ui/dialog, ui/avatar, ui/dropdown, ui/toast, ui/select, ui/badge, ui/button, ui/tabs, ui/popover only); pages hand-roll their tables, labels, and inputs. The F-231m register keeps button's dead arms and dialog's re-exports; the N-56e note keeps the dropdown family — these four files carry no register rationale. Their page-layout riders `INPUT_BASE`, `DIALOG_TEXTAREA`, `CHECKBOX` lose their last consumers with them (grep-verified; no test pins any of the three). The `input.tsx` Event/Activity citation (the F-231h sweep's one miss, Pass A) retires with its file. The F-230f pin (reads card.tsx) and the parity-228 carriers-list entry (table.tsx) retire/recalibrate in the same commit. | `src/components/ui/card.tsx`, `src/components/ui/table.tsx`, `src/components/ui/label.tsx`, `src/components/ui/input.tsx`; the riders `src/lib/page-layout.ts:318-329,358-364`; the precedent `src/components/ui/avatar.tsx` (F-231h) | **R-29** (retire the files + riders + the two pin recalibrations) |
| F-232b | Low | **The parity-229 PROSE_ALLOWLIST itself carries a compound entry whose first part is a dead utility — the F-229d genus, allowlist edition.** The tabs.tsx comment "the old border-primary/text-primary computed" rides the allowlist entry `"border-primary/text-primary"` (line 264, the multi-class prose-run family) — but `text-primary` is live (button.tsx link arm) while `border-primary` appears NOWHERE in live code: the compound form hides the dead half from the whole-tree invariant, and the comment is the sole carrier emitting the dead `.border-primary` rule. Companion: the globals.css:408 comment names `hover:bg-danger-soft` in prose — the utility is live (dropdown.tsx emits it) so no NET dead CSS, but the F-224v doctrine keeps comments carrier-free. | `src/components/ui/tabs.tsx:150`; `tests/parity-229.test.ts:264` (the allowlist entry); `src/app/globals.css:408` | **R-29** (reword both comments per F-229d; REMOVE the compound allowlist entry so the invariant nets the genus) |
| F-232c | Low | **The Expenses dialog's quick→form step swap drops focus to the dialog container with no announcement — the F-231b genus on the app's highest-traffic dialog.** Every expense creation passes through the quick-select → form swap (`pickQuick` sets `setStep("form")`; "Or fill manually" and "Back to Quick Select" the same), and edit-mode opens land on the form via the formKey adjust-during-render reset. The swap unmounts the focused control; Radix's FocusScope recovers to the DialogContent container — focus never escapes the dialog (no hard WCAG failure), but nothing lands on the new view's primary control and no live announcement marks the change. The project cured this exact genus on the auth faces (F-231b: value-guarded focus, live-measured); the dialog surface was left to Radix. | `src/app/(app)/expenses/page.tsx:433-437` (pickQuick), `:394-422` (the formKey reset), `:500-525` (the quick view), `:649` (Back); the cured pattern `src/components/layout/login-card.tsx:124-135` | **R-29** (the value-guarded step effect: quick→form focuses the description input, form→quick the Quick Select heading with tabIndex -1; + the e2e leg) |
| F-232d | Low | **The mobile hamburger carries aria-expanded but no aria-controls — the drawer has no id to reference.** The house's own preferred shape is the expenses filters trigger (`aria-expanded` AND `aria-controls="expense-filters"`, expenses/page.tsx:292-293). State is still conveyed (aria-expanded + the dialog role announcing on open), so this is enhancement, not failure — the two-gate and the F-217e focus contract are unaffected. | `src/components/layout/mobile-header.tsx:51-57` (the trigger); `src/components/layout/mobile-nav.tsx:127` (the sheet div, no id) | **R-29** (id="mobile-nav-drawer" on the sheet + aria-controls on the trigger, the expenses-filters precedent) |
| F-232e | Low | **The LoadingBlock live region arrives with its content — the F-218h genus applied to the loading gate.** The shell mounts `<div role="status" aria-live="polite">` only when `!hydrated \|\| loading` flips true — a live region that arrives with its content is not announced. The initial full-page load is read wholesale anyway; the gap is the mid-session "Try again" path (app-shell.tsx:90 re-enters hydrate(), the region mounts fresh). The F-218h toast cure established the pattern: the region must pre-exist in the a11y tree. Placement note: the interior census fingerprints `main.querySelectorAll("*")`, so the always-mounted region must live OUTSIDE main (the toast viewport precedent). | `src/components/shared/page-parts.tsx:234-244`; the consumer `src/components/layout/app-shell.tsx:97-99`; the doctrine `src/components/ui/toast.tsx:78-88` (F-218h) | **R-29** (the always-mounted sr-only region outside main; LoadingBlock becomes the visual only) |
| F-232f | Low | **The a11y sanction register's bg-amber-500 arm is stale — a future white-on-amber regression would be auto-sanctioned.** The arm's cite describes "the active period chip (bg-amber-500 + white 12px)" — but since F-219a every live amber fill carries stone-900 ink: the PeriodSegment active chip is `from-amber-500 to-yellow-600 text-stone-900` (page-parts.tsx:220), the expenses filters badge `bg-amber-500 … text-stone-900` (expenses:298), the ai-coach user bubbles `bg-amber-500 text-stone-900` (ai-coach.tsx:122,133). All pass contrast outright; the arm can only ever fire on a future violating white-on-amber node — the exact defect the F-220p round articulated when it retired the text-amber-500 and bg-primary arms. | `tests/e2e/a11y.spec.ts:60-66`; the F-220p precedent `:28-50`; the ink census page-parts.tsx:220, expenses:298, ai-coach:122/133 | **R-29** (retire the arm with the F-220p comment form) |
| F-232g | Low | **The upload capacity guard is a check-then-write race (TOCTOU).** The F-228f ceiling reads `uploadsCapacity()` then writes after multiple await boundaries (`file.arrayBuffer()`, `writeFile`) — concurrent uploads at (ceiling − ε) all pass the check before any write lands; up to (N−1) extra files (≤5 MB each) beyond 256 MB/4096 files. The per-window rate cap (20/15) bounds N; the guard's documented purpose is bounding drift, not an exact invariant — but the honest close is cheap. | `src/app/api/upload/route.ts:117-132` | **R-29** (re-read capacity after the write; unlink the just-written file + STORAGE_FULL on breach) |
| F-232h | Low | **The low tail: four hygiene items.** (a) The accounts page imports `CURRENCIES` it never uses (line 23; lint-invisible — no-unused-vars is off); (b) `BrandMark`'s `compact` prop is a dead arm (one call site, never passed — the F-229f genus, prop edition); (c) three dead page-layout members: `SHELL_LAYOUT.sidebar` is bypassed by the sidebar's own literal (a latent divergence point), `MOBILE_NAV_SHEET.icon` and `PAGE_ROOT.bare` have zero references; (d) the analytics `exportCsv` revokes the object URL synchronously after `click()` — evergreen browsers initiate synchronously so it works, but the robust idiom defers the revoke. | `src/app/(app)/accounts/page.tsx:23`; `src/components/layout/sidebar.tsx:32,40-47`; `src/lib/page-layout.ts:8,68,140`; `src/app/(app)/analytics/page.tsx:158` | **R-29** (drop the import + the prop; consume SHELL_LAYOUT.sidebar in sidebar.tsx, retire the icon/bare members; defer the revoke) |
| F-232i | Low | **`--color-line-strong` is pinned and dark-flipped but has zero utility consumers and no register entry.** One of the F-217c seven app-native tokens, pinned by tests/dark-tokens.test.ts:45 — but no `border-line-strong`/`bg-line-strong`/`text-line-strong` exists in src or tests. Unlike the F-224t reserved family (success/warning/info/-soft, danger-soft, chart-*) it carries no keep citation; it is two dead custom-property declarations pending a register-or-retire decision. | `src/app/globals.css:101` + `:394`; the register family `globals.css:114-129`; the pin `tests/dark-tokens.test.ts:45` | **R-29** (register in the F-224t reserved family with the citation — the semantic tier stays; retiring would need the dark-tokens pin change and removes a design-system tier the token architecture names) |
| F-232j | Informational | **All fourteen page call sites subscribe to the whole store — no `useShallow` anywhere in src.** The bare `const store = useWealthOs()` form re-renders the mounted page on every `set()` (settings writes, loading/error transitions), drifting from the web-application skill §9 one-store/useShallow architecture. Mitigated in practice: `React.useMemo` derivations key on stable slice identities so chart data never recomputes, and mutations trigger `refreshAll` the page needs to see anyway. The migration is a wide mechanical edit (each page's full slice census + selector rewrite) — a dedicated round, not a rider. (Count set to fourteen by F-233i — the mis-recorded figure was verified against the R-29 ship refs.) | `src/app/(app)/*/page.tsx` (14 sites across 9 files); the split idiom `src/components/layout/app-shell.tsx:23-28` | recorded (the dedicated-round plan) |
| F-232k | Informational | **The import commit has no idempotency/replay guard.** The 5000-row `createMany` carries no dedup/batch key — a replayed POST (a retrying middlebox, a duplicate tab) duplicates up to 5000 rows, visible and individually deletable. UI-side single-fire is guarded (`if (!rows \|\| busy) return;`); first-party fetch never auto-retries POSTs — the residual is retry-infrastructure only. An opaque client `batchId` on the rows (or a short-TTL body-hash replay cache) closes it if ever needed. | `src/app/api/import/route.ts:31-43`; the UI guard `src/app/(app)/import/page.tsx:154` | recorded (the batchId seam if replay ever bites) |
| F-232l | Informational | **The first-user admin assignment is a count-then-write race — and `role` has no authorization consumer.** Two concurrent first signups on a fresh deploy can both read `count === 0` and both become admin. Zero impact today: `role` is stored and echoed (login, users GET/PATCH) but never checked for authorization anywhere in src (the only `.role ===` matches are AI-coach chat messages). When role ever gains authz weight, derive first-admin atomically (a unique singleton flag row or a transactional count) — or drop the unused dimension. | `src/app/api/auth/signup/route.ts:68,86` | recorded (inert until role gains weight) |
| F-232m | Informational | **The CSP is frame-ancestors-only (no script-src).** The global header set is Referrer-Policy, nosniff, HSTS, and `Content-Security-Policy: frame-ancestors 'self'` — the documented deliberate posture (the reference's three-header edge set + the frame-ancestors superset; "headers are function, not visuals"). No injection surface was found in the Pass-B sweep; a nonce-based `script-src` (+ `object-src 'none'`, `base-uri 'self'`) is the defense-in-depth next step when the header posture is revisited. | `next.config.ts:103-126` | recorded (documented deliberate posture) |
| F-232n | Informational | **The login-card logo docblock still narrates the retired construction ("the retired construction was a CSS bar-chart mark").** F-231l's pins target the "used to draw" phrasings and pass; this sentence describes the current construction's provenance — contextual history rather than a dead-contract docblock, but the same narrative genus F-231l pruned. | `src/components/layout/login-card.tsx:672-675` | recorded (optional trim in a future lockstep) |
| F-232o | Informational | **The dialog.tsx "reintroduce WITH a consumer" comment predates the live between-footer pattern.** The retired DIALOG_FOOTER_WIDE constant's use-case is expressed live via the expenses call-site `sm:justify-between` override on the base DialogFooter (tailwind-merge resolves the conflict) — the sanctioned F-231h replacement pattern working as designed; the comment's scope (the constant) is accurate. | `src/components/ui/dialog.tsx:88-91` vs `src/app/(app)/expenses/page.tsx:644` | recorded (comment refresh optional) |
| F-233a | Medium | **The six-box verification-code entry discards pasted and auto-filled multi-digit values — the primary code-entry path degrades.** `onCodeDigit` keeps only the LAST character of whatever lands in a box (`raw.replace(/\D/g, "").slice(-1)`), and the inputs carry no distribution: the first box's `autoComplete="one-time-code"` makes Chrome/Android/iOS insert the FULL six-digit code into box 1, where the handler collapses it to its final digit — submit then blocks at the "enter all 6 digits" guard. Every paste of the full code (the password-manager and SMS-copy flows) fails the same way. Single-digit typing and the backspace walk are correct; the failure is fails-safe (no attempt burned). | `src/components/layout/login-card.tsx:327-337` (the handler), `:564-578` (the inputs); the length guard `src/lib/verification.ts` | **R-30** (the pure `applyCodeInput` seam in the verification lib — multi-digit edits distribute across the boxes from the edited one, focus lands after the last filled; single-digit typing and the backspace walk byte-identical) |
| F-233b | Low | **`@radix-ui/react-label` is orphaned — the F-232a file deletion retired its sole consumer but left the dependency riding the manifest.** The deleted `src/components/ui/label.tsx` was the only importer (verified against the pre-deletion tree); zero files in src/, tests/, or scripts/ import it now, yet it remains a runtime `dependencies` entry. Dead weight in the install and the artifact — the exact dead-stock genus F-232a was curing, dependency edition; the repo retired `@radix-ui/react-toast` the same way when toast.tsx was rewritten (N-62a). | `package.json:34` (the entry); `bun.lock` (the chain); the precedent N-62a | **R-30** (remove the dependency via the package manager, regen the lockfile, pin the import-absence + manifest-absence the N-62a way) |
| F-233c | Low | **The login InfoCallout still mounts its `role="status"` with its content — the F-218h genus on the last uncurated surface.** The green resend-confirmation banner renders `{info && <InfoCallout …/>}`: the live region is mounted at the same instant its message arrives, so screen readers do not announce the resend confirmation (a WCAG 4.1.3 status message — confirmation of a user action, no focus change). The genus was cured for the toast viewport (F-218h) and the loading gate (F-232e); the verify view's info banner is the surviving instance. | `src/components/layout/login-card.tsx:599` (the conditional mount), `:843-849` (the role); the doctrine `src/components/ui/toast.tsx:78-88` | **R-30** (the always-mounted sr-only status region in the verify view, empty when idle — the F-232e form; the InfoCallout becomes the visual only) |
| F-233d | Low | **`hydrate()` swallows a failed `/api/settings` fetch — the Settings form then offers defaults a Save would persist over stored preferences.** The settings follow-up has no failure branch (only `if (… settingsRes.ok)`); on a transient failure the slice stays null, nothing is surfaced, and the Settings page initializes its form from hard-coded local defaults indistinguishable from stored values. A user who then clicks Save Settings overwrites their persisted currency/date-format/notification preferences with those defaults — the render-time sync never fires because the slice identity never changes. | `src/stores/wealthos-store.ts:196-199` (the silent branch); the form `src/app/(app)/settings/page.tsx:48-53,75-86` | **R-30** (the Settings Save guard: Save disables while the slice is missing, the card states the reason — closes the overwrite path exactly where it bites without muddying the dashboard's error semantics) |
| F-233e | Low | **The Import page parses the selected file twice on every flow-through.** `pickFile` runs `extract(f)` immediately on selection, and the "Upload and Extract" button then calls `extract(file)` again on the same `File` — a redundant re-read/re-parse (up to the 10 MB cap) with identical results on every completed import. The Step 2 review already renders at selection time, so the button's only real function is as a retry after a failed parse — its label promises work that has already happened. | `src/app/(app)/import/page.tsx:61-66` (the eager parse), `:213` (the button) | **R-30** (the button is the retry affordance: disabled once the review stands — `rows !== null` joins the disabled condition; the eager-parse UX is the shipped, captured behavior and stays) |
| F-233f | Low | **The reset token rides the URL query string and is never stripped from the address bar.** The reset link is delivered as `/reset-password?token=<256-bit-hex>`; the screen reads the param and never cleans it — the token persists in browser history/back-forward cache for its 60-minute life and can appear in intermediary logs. Marginal in practice (single-use, TTL'd, strict-origin-when-cross-origin referrer policy; the in-band delivery chain is the recorded F-217m) — but the residual applies on the production email path too, and the strip is the standard one-time-credential hygiene. | `src/components/layout/reset-password-screen.tsx:28,62,78`; the mint `src/app/api/auth/forgot-password/route.ts:142-144` | **R-30** (capture the token once at mount, then `history.replaceState` the query away — the OAuth-callback hygiene form; the refresh-after-strip trade documented in the seam) |
| F-233g | Low | **A failing breach-unlink answers 500 instead of the honest 507 and leaves the breached file on disk.** The F-232g re-check's `unlink` sits inside the route's outer `try` — if the unlink itself throws (EACCES/EPERM on the just-written file), the caller gets `ERR.INTERNAL()` and the over-ceiling file persists with no deletion surface. Exotic double-fault only (the write succeeded, so the filesystem is writable); the TOCTOU cure itself is correct on every non-degenerate path. | `src/app/api/upload/route.ts:141-154` | **R-30** (isolate the unlink in its own try/catch — log-and-continue, the breach always answers STORAGE_FULL) |
| F-233h | Low | **login/signup render `useSearchParams` without a Suspense boundary — safe only while `force-dynamic` stands.** LoginCard reads `from_url` through the hook on both pages; the reset-password twin wraps its identical read in `<Suspense>`. If `force-dynamic` is ever lifted, prerendering fails (or bails to full client rendering) — an invisible config coupling across the three auth faces. | `src/app/login/page.tsx:35-40`; `src/app/signup/page.tsx` (same shape); the wrapped twin `src/app/reset-password/page.tsx:20-22` | **R-30** (wrap `<LoginCard />` in `<Suspense>` on both pages — family consistency, the reset-password precedent) |
| F-233i | Informational | **The F-232j recorded count is off by one — fourteen whole-store sites, not fifteen.** The bare `const store = useWealthOs()` census counts 14 call sites across 9 page files, and counted 14 at the R-29 ship commit too (verified against both refs) — the count was mis-recorded, not drifted. The substance (whole-store subscription everywhere, zero useShallow in src) is unchanged. | `docs/remediation_plan_v2.md` (the F-232j row); the sites `src/app/(app)/*/page.tsx` (14 across 9 files) | **R-30** (correct the count in the F-232j row — lockstep rider) |
| F-233j | Informational | **The retired amber-arm comment overstates its scope — "every live amber fill carries stone-900 ink" misses the registered white-ink exception.** The Investments amber KPI tile is white-on-amber (the amber→yellow gradient family with white values, riding the F-226m WCAG-exemption register; if axe ever flags it, the surviving text-white sanction arm covers it). No gate hole — the arm retirement is sound; the comment's scope claim is imprecise about the KPI-tile family. | `tests/e2e/a11y.spec.ts:60-66`; the exception `src/app/(app)/investments/page.tsx:141` + `src/components/shared/page-parts.tsx:107-136` | **R-30** (reword the comment to scope the claim to fill-carrying controls and cite the registered exception — the F-229d discipline) |
| F-233k | Informational | **The select.tsx session-81 comment's "the CHECKBOX's class" narration reads ambiguously post-retirement.** The comment backticks the box-sizing utilities and calls them "the CHECKBOX's class, not the chevron's" — narrating the REFERENCE bundle's checkbox, not the retired page-layout constant. All three tokens are live code, so the whole-tree carrier invariant passes; the capitalized identifier simply invites misreading as a citation of the retired constant (the F-232a genus, narrative edition). | `src/components/ui/select.tsx:52-55` | **R-30** (reword to "the reference bundle's checkbox class" — lowercase, no caps-identifier collision; lockstep rider) |
| F-233l | Informational | **The pre-auth rate-limit buckets are burnable by cross-site form POSTs that fail the content-type CSRF gate — the bucket-lockout trade's third face.** Every public auth route increments its per-IP bucket BEFORE `parseBody`'s content-type gate rejects the request: a cross-site page in the victim's browser can burn `login:`/`signup:`/`verify:`/`resend:`/`forgot:`/`pw-reset:` buckets with no-prefetch `text/plain` POSTs (CORS-safelisted, no cookies needed) that die at the gate after the bucket is consumed. Locks the victim (and NAT/proxy neighbors) out of the auth family for a renewable 15-minute window. Counting invalid attempts pre-parse is the correct anti-brute-force order — moving the limiter below the gate would weaken the bound; the honest disposition is the ledger, beside F-224k (per-email lockout) and F-218t (XFF trust). | `src/app/api/auth/login/route.ts:11-22` (the shape, all six public routes); the gate `src/lib/api.ts:194-197` | recorded (the correct order kept; the browser-originated burn face documented) |
| F-233m | Informational | **The `/api/reset` destructive wipe requires no credential re-confirmation — and has no UI consumer.** The route atomically deletes every owned finance row gated by session + content-type gate + the literal `confirm: "RESET"` + a 3/15min bucket, with no password re-entry and no undo. Adjudication: the endpoint is an e2e/operator utility with zero src consumers (only the e2e battery rides it — the settings page exposes no reset control); a session-holder can already destroy the same rows through the per-row DELETE family the UI offers, so the bulk form adds no capability — the confirm string + CSRF gate + bucket remain the documented posture. | `src/app/api/reset/route.ts:8-56`; the consumer census (tests/e2e only) | recorded (documented deliberate posture — test/operator utility) |
| F-233n | Informational | **Theme resolution on client navigation is a passive effect — a one-paint light flash is possible on fresh-visitor login→app transitions.** The pathname effect re-resolves the theme post-paint; for a fresh visitor (no stored choice) signing in on the force-light login, the client nav to the dashboard commits and paints before `.dark` lands. The mechanism is the documented design ("the default dark must land without a reload" — the bootstrap covers full loads, the effect covers navigations); the residual is the paint window between commit and effect flush. | `src/components/layout/theme.tsx:119-123` | recorded (the adjust-during-render enhancement noted if the flash ever surfaces in captures) |
| F-233o | Informational | **Audit-brief location correction: the F-232h revoke-deferral cure lives in the analytics page's export helper, not the format seam.** The session-233 Pass-A brief attributed the deferred object-URL revoke to `src/lib/format.ts` (a 15-line module holding only the date-input helper); the plan's own F-232h row and the code locate it at the analytics page's export. The repo is correct; the record prevents the next audit from chasing a phantom surface (the F-231s brief-error genus). | `src/app/(app)/analytics/page.tsx:158-162` (the cure); `src/lib/format.ts` (the phantom) | recorded (no repo change — the attribution is corrected in this row) |
| F-234a | Low | **The settings could-not-load guard renders on every hard load under real latency — the in-flight window reads as failure.** `hydrate()` commits the dashboard slices with its loading drop FIRST and only then awaits `/api/settings`; the shell renders children the moment loading drops, so the page paints `settings === null && loading === false` — exactly the F-233d amber condition — for one settings round-trip (30–300 ms on a real deploy). The guard cannot distinguish "fetch in flight" from "fetch failed"; a user who obeys the "Try reloading" line sees the same flash again. Invisible to every gate because localhost/e2e coalesce the two commits into one paint. The Save-disable during the window is the desired protection; the false failure message is the defect. | `src/stores/wealthos-store.ts:184-199` (the sequencing); `src/app/(app)/settings/page.tsx:384-390` (the guard); `src/components/layout/app-shell.tsx:112-116` (the render gate) | **R-31** (the settled-flag tri-state) |
| F-234b | Low | **The import file pick has no staleness or in-flight guard — interleaved extracts can land the wrong review, and the retired re-parse is reachable mid-parse.** `pickFile` fires the eager parse with no sequence token and no busy flag (busy lives only on commit). Two hazards: (1) a re-pick while the first parse is in flight runs two extracts concurrently — the slower one's `setRows`/`setError` lands last, so the dropzone can show file B's name over file A's rows (a user importing on the mismatched review commits the wrong file's data — the store's own refresh-sequence genus, absent at the page level); (2) during the in-flight window `rows === null && busy === false`, so the "Upload and Extract" button is ENABLED — clicking it re-fires the extract the F-233e round retired, now reachable inside the parse window. | `src/app/(app)/import/page.tsx:61-66` (the pick), `:68-151` (the parse), `:220-226` (the button) | **R-31** (the parse-sequence token + the in-flight flag) |
| F-234c | Low | **A full-code paste into a later box distributes from the EDITED box — the type-then-paste flow submits a rotated code and burns an attempt.** The F-233a seam distributes a multi-digit edit starting at the edited box. If earlier boxes already hold digits (type one digit, then paste the whole code from the email/SMS), the paste shifts the code right and drops the overflow — a COMPLETE but WRONG code that passes the client length guard and submits. The pre-cure failure was fails-safe (the length guard blocked); the cure introduced a fails-dangerous variant for this flow. One rung of the 5-attempt ladder burned plus genuine confusion; recoverable via Resend. | `src/lib/verification.ts:113-121` (the distribution branch); `src/components/layout/login-card.tsx:333-339` (the delegation) | **R-31** (the full-length restart rule) |
| F-234d | Low | **The paste/autofill path has no browser-level pin — the R-30 headline cure is covered only by pure-function units and source scans.** The e2e battery enters codes one fill per box (the typing path); nothing in the suite pastes, clipboards, or autofills. The no-cap premise (the load-bearing assumption of the paste cure) is enforced only by a source regex, and the delegation wiring (change-event shape, focus landing after distribution) has no browser-level regression net — the original defect lived precisely in the browser-event layer. | `tests/e2e/auth.spec.ts:202-205` (the per-box entry); `tests/verification-code.test.ts` (the pure seam); `tests/parity-233.test.ts:47-51` (the regex pins) | **R-31** (the e2e leg extension, riding the existing signup budget) |
| F-234e | Low | **The uploads capacity walk can throw past the envelope contract — the per-entry size read is unguarded and the pre-write call sits outside the route's try.** `uploadsCapacity()` wraps only the directory read in try/catch; the per-entry `statSync` is bare. A file vanishing between the readdir and the stat (the route's own concurrent actors: a racing breach-unlink, an operator clearing the uploads dir mid-traffic) throws ENOENT out of the helper — at the pre-write call site it escapes the handler as a raw non-JSON 500 (breaking the envelope contract the route's own docblock claims), and at the post-write site it lands as ERR.INTERNAL AFTER the write, skipping the breach-unlink (a stray over-ceiling file persists, bounded by the next request's re-check). | `src/lib/uploads.ts:59-64` (the walk); `src/app/api/upload/route.ts:117` (the pre-write call, outside the try at 129); `:141` (the post-write call) | **R-31** (the per-entry guard) |
| F-234f | Low | **The budget Add button is the mutation family's last unguarded trigger.** Every other mutate control in the tree carries a busy rider (dialog submits, card toggles, per-row deletes, the sibling budget delete) — the budget Add sets no busy state and its button is never disabled. A rapid double-click fires two POSTs over the idempotent upsert (the server-side P2002 retry absorbs the data risk): redundant writes plus twin toasts ("did I create two?" confusion). Pattern-completeness defect in a family the ledger tracks. | `src/app/(app)/settings/page.tsx:104-119` (the handler), `:253-256` (the button) | **R-31** (the busy rider) |
| F-234g | Low | **The logout route burns the SHARED writes bucket before the content-type gate — the pre-parse burn genus's seventh surface, at broader scope.** The six public auth routes' pre-parse burn is recorded (the correct anti-brute-force order kept); `/api/auth/logout` shares the shape but its bucket is the shared 60/15 writes family that gates EVERY sessioned mutation — a cross-site plain-text volley in the victim's browser burns all 60 slots and 429s the victim's CRUD (not just the auth family) for a renewable window. Uniquely reorderable at zero cost: logout reads no body and owns no brute-force surface (possession of the cookie IS the credential), so the content-type gate is its CSRF defense, not an anti-brute-force bound — the gate can precede the bucket without weakening anything. Every other sessioned route is safe from this shape (the session guard precedes the bucket and blocks cookie-less cross-site posts). | `src/app/api/auth/logout/route.ts:28-34` (the order); the genus row F-233l | **R-31** (the gate-first reorder) |
| F-234h | Informational | **The investments row-Delete button's accessible name carries the raw ✕ glyph.** The sr-only label spans "Delete {symbol}" but the visible glyph is not aria-hidden, so the computed name appends the bare character. Every sibling delete surface rides the icon convention (library icons auto-hide); this one is a text node. AT name noise only — no information loss, no WCAG failure (the row context cure is present). | `src/app/(app)/investments/page.tsx:356-357` | **R-31** (the aria-hidden wrap, rider) |
| F-234i | Informational | **The gradient KPI card's ink token is cascade-dead — dropped by tailwind-merge before the DOM.** The class string pairs a semantic ink token with a literal white in the same merge chain; twMerge keeps only the later, so the semantic token never reaches the DOM (verified empirically). Harmless today (the card is always white-on-gradient by design) but a live-source dead carrier of the dead-utility genus the content scan cannot see — a future edit removing the literal would silently activate a different ink in dark mode. | `src/components/shared/page-parts.tsx:129` | **R-31** (the retirement, rider) |
| F-234j | Informational | **Two dead exports: the expenses dialog component and the theme resolver.** Both symbols carry the export keyword with zero importers outside their own modules (the dialog is consumed only at its own page; the resolver only by its own file's stored-theme reader). Drift hazards for future consumers per the recorded dead-export genus; the export keywords are vestigial. | `src/app/(app)/expenses/page.tsx:384`; `src/components/layout/theme.tsx:26` | **R-31** (the keyword retirement, rider) |
| F-234k | Informational | **Two e2e comments still attribute the status role to the visual callout — post-cure the locators match the live region.** The session-233 live-region cure made the always-mounted sr-only region the role carrier; both spec comments still name the visual component. Misleading narration only (the tests pass); the attribution-drift genus. | `tests/e2e/auth.spec.ts:213-216`, `:277-280` | **R-31** (the reword, rider) |
| F-234l | Informational | **The verify success write is unconditional — a racing resend's freshly minted code can be wiped by a verify landing on the old one.** The verify route clears the code hash keyed on id only; a resend committing between the verify's read and its update destroys the NEW code while signing in on the old one. Benign and self-healing (the account is verified either way; the wiped-code user resends). The reset-password route uses the conditional mutation form for exactly this interleaving class; verify/resend never got it. | `src/app/api/auth/verify/route.ts:134-141`; `src/app/api/auth/resend/route.ts:78-85` | recorded (the conditional form rides the next touch of the route) |
| F-234m | Informational | **The un-memoized-derivation genus extends beyond the Dashboard.** The expenses budget split recomputes per render outside the visible-rows memo; the investments page folds the portfolio stats twice (the allocation helper re-runs the fold); analytics adds a third; income allocates a fresh now per card; goals/accounts hold per-render folds. No memoization defects exist where memos are present (deps are primitives/slice identities). The Dashboard remains the only material member, as the recorded finding judged. | `src/app/(app)/expenses/page.tsx:77,85`; `src/app/(app)/investments/page.tsx:68-69`; `src/app/(app)/analytics/page.tsx:129,135-136`; `src/app/(app)/income/page.tsx:173`; `src/app/(app)/goals/page.tsx:41`; `src/app/(app)/accounts/page.tsx:44` | recorded (folds into the recorded derivation finding) |
| F-234n | Informational | **The footer copyright hardcodes "© 2026".** A literal year that goes stale on 2027-01-01; no test pins it. Parity-constrained (the reference's own footer genus), so a dynamic year is a deviation decision. | `src/lib/page-layout.ts:281` | recorded (deliberate — the owner's call if the year ever rolls) |
| F-235a | Medium | **The AI-coach greeting seeds during render — the polite live region arrives WITH its content and is never announced (the F-218h genus, fourth surface).** The message list is the aria-live="polite" region (F-219j) and lives inside `DialogContent`, which Radix unmounts while closed. The greeting seeds via the render-time `if (open && !greeted)` adjustment, so the first render of the open dialog already contains it — the region mounts non-empty and screen readers hear nothing on open (the exact defect class cured on the toast, the shell loading, and the login verify surfaces; the coach was never given the treatment because its region is conditionally mounted). Replies that land while mounted (including the thinking flip) announce correctly. | `src/components/shared/ai-coach.tsx:51-61` (the render-time seed), `:111` (the region inside DialogContent) | **R-32** (the effect-keyed seed — the region mounts empty, the greeting lands as a content change) |
| F-235b | Low | **The login route's VERIFICATION_REQUIRED 403 is a password-correctness oracle for never-verified accounts.** The password is verified before the unverified-account gate: a wrong password answers 401 INVALID_CREDENTIALS (byte-identical to the unknown-email case) while a correct password answers 403 — confirming the submitted password is valid for any account stuck in the never-verified state. The no-enumeration/timing-equalizer work protects account existence, not credential validity. Subsumed under the default in-app-OTP posture (such accounts are take-overable anyway, the recorded F-217m); a genuine password-reuse confirmation oracle under the production posture. | `src/app/api/auth/login/route.ts:57-82` | **R-32** (the gate moves above the verify; the equalizer burns on the gate branch — both arms 403, every branch still burns one scrypt) |
| F-235c | Low | **The /api/reset catch maps every failure to the generic 500 — the honest P2024/P2028 → 503 arm is missing on the app's biggest transaction.** The wipe runs six owner-scoped deleteManys inside one interactive $transaction over the dataset the recorded growth posture allows to grow unbounded; Prisma's default interactive timeout is 5 s, and a big wipe is precisely where P2028 fires first. The forgot/reset families already answer the pool/interactive-timeout codes with the 503 UNAVAILABLE human copy; the user here is told "Something went wrong" — advice that cannot succeed until the dataset shrinks. | `src/app/api/reset/route.ts:41-55` | **R-32** (the sibling arm joins the catch) |
| F-235d | Low | **scryptSync blocks the event loop ~28 ms per public auth request — an unauthenticated availability amplifier.** Every login/verify/signup/resend request burns exactly one scrypt (including the timing-equalizer miss branches) through the fully synchronous API: measured 28.2 ms/op, so ~35 concurrent requests/sec saturate one core's loop time and stall every user of the single-process deployment. The per-IP buckets are the only bound, and under the recorded default direct-exposure posture (F-218t: unset NEO_PROXY_HOPS trusts a client-suppliable XFF) the bound is voidable with header rotation. The ledger's scrypt rows weigh only offline-cracking cost; the online blocking face was unrecorded. | `src/lib/password.ts:15,23` (the seam); consumers `login/verify/signup/resend/reset-password` routes + `prisma/seed.ts` | **R-32** (the promisified crypto.scrypt seam — every call site already async, the stored format and timing profile byte-identical) |
| F-235e | Low | **The single-slot busyId guards are cleared by OTHER rows' completions — the double-fire race survives the F-221q family at six sites.** Every row-level busy guard is one string slot: `setBusyId(id)` → await → `setBusyId(null)`. When row A's request completes while row B's is in flight, A's clear re-enables B's button and a second click on B fires a duplicate mutation (the spurious-404/toast class). The store's refreshSeq keeps data consistent; the defect is UX noise plus a burned request result. | `src/app/(app)/income/page.tsx:72-81`; `expenses/page.tsx:226-232`; `accounts/page.tsx:109-115`; `goals/page.tsx:169-175`; `investments/page.tsx:347-354`; `settings/page.tsx:64-73` (the busyBudget slot) | **R-32** (the functional clear — only the still-owner row nulls the slot) |
| F-235f | Low | **The dialog ✕ close button's hit area is the bare 16 px glyph — below the WCAG 2.5.8 24 px floor's intent.** DIALOG_CLOSE carries no padding or size classes; the button's box is essentially the h-4 w-4 X icon. The house's own toast dismiss carries p-1 for exactly this reason (the F-220f/F-222g family). Parity-invisible to fix (padding changes no captured class axis). | `src/lib/page-layout.ts:309-317` (DIALOG_CLOSE), consumed `src/components/ui/dialog.tsx:63-66` | **R-32** (p-1.5 joins the constant) |
| F-235g | Low | **Emoji ride inside Select option/trigger accessible names at four sites — SR users hear "shopping cart Groceries".** The category/type Selects put the raw emoji into the role=option name and the SelectValue echo. The sibling surfaces already do it right: the quick-select chips wrap the emoji in an aria-hidden span (the reference's own chips face), the card pills too, and the Settings datalist is clean. The emoji map is our own superset on the full category list (the reference's chips carry them; its combobox genus is served by our list), so the wrap is superset polish, not parity drift. | `src/app/(app)/expenses/page.tsx:332,627`; `accounts/page.tsx:281-283`; `goals/page.tsx:319-321` | **R-32** (the aria-hidden span wrap — DOM-inert on every captured face: the filter defaults to the plain "all" option, the other three live in closed dialogs) |
| F-235h | Low | **role="tablist" is unnamed at both call sites — the Tabs API offers no way to name it.** The tablist div carries the role and orientation but no aria-label/aria-labelledby; with two strips on Expenses (the 50/30/20 filter) and Analytics (the section tabs), SR wayfinding cannot distinguish them. Best-practice tier (not an axe error). | `src/components/ui/tabs.tsx:120-125`; consumers `expenses/page.tsx:346-356`, `analytics/page.tsx:247-257` | **R-32** (the optional ariaLabel prop wires aria-label onto the tablist; both consumers pass names) |
| F-235i | Low | **The Expenses KPI delta glyph contradicts its signed number in both arms — "↑ −5%" renders on spending that fell.** deltaDirection is inverted to express good/bad (expenseDelta <= 0 → "up") while the delta string keeps the sign, so the glyph points opposite the number; income and net are sign-consistent. The KpiCard couples glyph AND tone through deltaDirection, so the inversion was the only way to keep emerald-on-good. No reference citation pins either encoding (the reference's zero-data deltas never render; our populated corpus is the superset). | `src/app/(app)/dashboard/page.tsx:181-182`; the coupling `src/components/shared/page-parts.tsx:55-62` | **R-32** (the decoupling — KpiCard gains an optional deltaTone override; the glyph follows the sign, the tone keeps the good/bad channel) |
| F-235j | Low | **The guest wall renders null — a blank, silent page until the client redirect fires.** The (app) layout's server-side decision mounts GuestLoginRedirect for guests, which returns null and redirects in an effect: between paint and redirect, sighted guests get an empty body and SR users an empty tree (the reference serves its HTML then redirects; the null face is our fix-over-defect — but nothing about the fix requires emptiness). | `src/components/layout/guest-login-redirect.tsx:20-27` | **R-32** (the minimal visible status face — role="status", "Redirecting to sign in…") |
| F-235k | Informational | **CSP is frame-ancestors 'self' only — no script-injection containment backstop.** The shipped header set (F-217h) carries no script-src/object-src/base-uri/form-action directives. For a finance app where any XSS is full account-data compromise, a minimal additive policy is cheap defense-in-depth. | `next.config.ts` headers() block | **R-32** (the additive minimal policy; the http-headers pin recalibrated in the same commit) |
| F-235l | Informational | **users PATCH is the one mutation whose catch lacks the isRecordNotFound arm.** The R-19/R-24 rounds added the P2025 → 404 arm to all ten [id] PUT/DELETE catches; the users update kept the bare INTERNAL form. Unreachable today (no user-delete API), drift hazard for the next contributor. | `src/app/api/users/route.ts:66-76` | **R-32** (the arm joins — a vanished session user answers UNAUTHORIZED) |
| F-235m | Informational | **HealthGauge transitions a property it never animates — inert dead CSS.** stroke-dasharray 0.5s ease rides the arc path, but the arc redraws via the d attribute; dasharray is never set. A future contributor may assume the gauge animates. | `src/app/(app)/dashboard/page.tsx:648` | **R-32** (the dead style retires) |
| F-235n | Informational | **The progress bars carry no role="progressbar" — text equivalents exist, the bars are not programmatically determinable.** The goal/budget/health meters are bare divs with inline widths; WCAG 1.1.1 is satisfied by adjacent text, the role would add AT semantics. Census-safe (role is not a measured axis). | `src/app/(app)/goals/page.tsx:126-135`; `dashboard/page.tsx:291-298,396-403` | **R-32** (role + aria-valuenow/min/max + aria-label at the three sites) |
| F-235o | Informational | **The AI coach echoes the user's own message into the polite live region.** The user's question lands in the same list the region wraps, so SR users hear their own typed text read back before the reply. ADJUDICATED DELIBERATE: the echo doubles as the send-confirmation for SR users (the message registered) — removing it would leave submission silent; the reference's own coach genus offers no citation either way. | `src/components/shared/ai-coach.tsx:76` | recorded (the confirmation semantics are the wanted behavior) |

### Session-236 audit (three Mode-C passes, every material claim re-verified)

Pass A (the R-32 cure surfaces): all fourteen pinned cures verified
holding at file:line — the effect-keyed greeting seed with its cleanup
and persistence guard, the gate-before-verify order with the equalizer
on the gate branch, the reset transient arm, the promisified scrypt
with byte-identical format and every call site awaited, the six
functional busy clears, the 28px close target, the four emoji wraps,
the named tablists, the KPI tone override, the guest-wall status face,
the dev-branched CSP, the users arm, the retired gauge transition, and
the three progressbar roles. Pass B (API/auth/security): the envelope
discipline, owner scoping, injection surface, and session guards all
clean beyond the recorded tail — the layer's one Medium is the
empty-put 404 (F-236a). Pass C (UI/a11y/shell): the token system
verified by an out-of-tree compile (no phantom breakpoints, every
custom-token utility compiles against its pin, zero dead-family
emissions), the layer contract and portal exclusions intact; the
aria-live viewport's immunity to Radix hideOthers verified in
node_modules (the aria-hidden package spares live regions — toasts
fired inside open dialogs ARE announced). The findings below were
each re-verified by the driving session before the row was written.

| ID | Severity | Finding (verified evidence) | Location | Disposition |
|---|---|---|---|---|
| F-236a | Medium | **An empty-body PUT on the five `[id]` mutation routes answers 404 for an existing, owned record.** Every field of the five update schemas is `.optional()`, so a body of `{}` — or any body of only unknown keys, which Zod strips — parses to `{}`; the route's conditional spreads build an empty `data`, and Prisma SHORT-CIRCUITS `updateMany` with empty data to `count: 0` WITHOUT executing a query (live-reproduced against the exact client: a control mutation with real data returns 1 on the same row, the empty call returns 0) — indistinguishable from the vanished/foreign row the 404 arm exists for. A diff-based client sending `{}` on no-change is told the record does not exist. Unreachable from the first-party UI (dialogs always send ≥1 field); no cross-user leak. | `src/app/api/transactions/[id]/route.ts:39-56` + the four sibling `[id]` PUTs; the all-optional schemas `src/lib/schemas.ts` (transactionUpdate :196, incomeSourceUpdate, bankAccountUpdate, investmentUpdate, goalUpdate) | **R-33** (the no-fields refine on the five update schemas → the honest 400 "No fields to update" through the existing parseBody machinery) |
| F-236b | Low | **The P2024/P2028 → 503 transient arm exists on only 3 of the DB-touching routes.** forgot-password, reset-password, and /api/reset answer pool/transaction timeouts with the 503 UNAVAILABLE family copy; every sessioned CRUD route (34 catch arms across 15 files) falls through to the generic 500 "Something went wrong. Please try again." — the exact answer the auth family's own comments call dishonest for this failure class, since a retry cannot succeed until the contention clears. | present: `auth/forgot-password/route.ts:97-104,133-140`, `auth/reset-password/route.ts:66-72,110-115`, `reset/route.ts:63-68`; absent: the 34 `ERR.INTERNAL()` arms under `src/app/api/**` (census: transactions ×4, income-sources ×4, accounts ×4, investments ×4, goals ×4, budgets ×4, settings ×2, users ×1, import ×1, export ×1, search ×1, ai/coach ×1, dashboard ×1, upload ×1) | **R-33** (the shared `isTransientDbError` helper joins `src/lib/db`, `ERR.UNAVAILABLE()` joins the envelope family, the arm lands in every DB-touching catch arm) |
| F-236c | Low | **The field-clear contract is asymmetric across three axes.** (1) `""` clears the F-219q string family (notes, institution, accountId) but 400s on every nullable date (`dateField`'s `.min(1)` fires before any downstream transform — `nextDate: ""` answers "Enter a valid next date"). (2) The create twins reject the `null` the update twins accept: `nextDate`/`nextPaymentDate`/`purchaseDate`/`targetDate`/`color`/`icon` are `.optional()` but not `.nullable()` on create — a uniform "clear" payload 400s on create and clears on update. (3) `icon` (both twins) and `color` lack the "" → null normalization, so the empty string stores as `""`. A third-party API consumer sending one uniform clear shape gets surprising 400s and a half-applied contract. All POST routes already pass `null` through to nullable columns (`? new Date(x) : null`, `body.color`) — the schema layer is the only gap. | `src/lib/schemas.ts:146-155` (dateField's min(1)), `:187,227` (nextDate create/update), `:261,287` (nextPaymentDate), `:324,354` (color), `:387,426` (purchaseDate), `:450,468` (targetDate), `:456,474` (icon) | **R-33** (the clearable-date seam — preprocess "" → null over the nullable date; the create twins join the nullable contract; color/icon normalize "" → null on both twins) |
| F-236d | Low | **The toast dismiss control computes a ~22×22px hit area — under the WCAG 2.5.8 24px floor.** `p-1` (4px) around the 14px glyph = 22px; the F-235f dialog-close cure cited this very control as its "p-1 superset family" precedent while lifting the dialog ✕ to 28px — the precedent itself sits under the floor. Likely still compliant via 2.5.8's spacing exception (isolated target), but divergent from the house convention the dialog cure established. | `src/components/ui/toast.tsx:161-165` | **R-33** (the padding joins the family — 26×26px) |
| F-236e | Low | **A bare 💡 emoji rides the dashboard health-advice line — the one decorative glyph the F-235g round missed.** Every other glyph in the tree is wrapped (goals, accounts, investments, the expense chips, the account-type options); this raw text emoji is announced as "light bulb" before the advice. | `src/app/(app)/dashboard/page.tsx:314` | **R-33** (the aria-hidden wrap) |
| F-236f | Low | **A session revoked between the server layout's pass and the client hydrate's 401 renders an empty workspace instead of the login wall.** The (app) layout's server-side gate passed (the cookie was valid at request time); the client's /api/dashboard answers UNAUTHORIZED (tokenVersion bumped in another tab, or the 7-day TTL crossed); hydrate's code-keyed branch sets `hydrated: true, user: null` and the shell's `!hydrated || loading` gate falls through to children with EMPTY slices — a $0 dashboard, the stale server-prop sidebar user, and no explanation until the next full load hits the guest wall. Self-healing, but silent and wrong-faced. | `src/stores/wealthos-store.ts:215-218` (the UNAUTHORIZED branch); the gate `src/components/layout/app-shell.tsx:112-116` | **R-33** (the shell's post-hydrate null-user gate renders the guest-wall face — the login wall re-established client-side; the logout path is untouched: it resets hydrated/loading so the gate never fires there) |
| F-236g | Low | **The login card's F-218a comment still asserts the 403 proves the password was right — falsified by the F-235b reorder.** Post-reorder, a wrong password on a never-verified account also answers 403 (the e2e probe proves it); the live-tense comment now documents a false invariant that could mislead a future maintainer into treating the verify-view entry as credential-gated. | `src/components/layout/login-card.tsx:159-166` | **R-33** (the reword — the 403 encodes account existence, never credential validity) |
| F-236h | Low | **parity-235's F-235a pin does not pin the deferral mechanism.** The three pins check the retired render-time form, the effect guard, and the live region — but not the `setTimeout`/`clearTimeout` pair; a regression to a synchronous `setMessages` inside the effect body (the announcement-breaking shape) passes all three. The round's only Medium-severity cure carries the file's weakest pin. | `tests/parity-235.test.ts:18-36` | **R-33** (the timer/cleanup pins join the describe) |
| F-236i | Low | **The goals progressbar aria-valuenow rounds away the displayed precision.** `Math.round(progress.pct)` beside the visible one-decimal `{progress.pct}% funded` — a minor AT/visual disagreement (42.3% announced as 42). The value is already clamped ≤100 upstream by `goalProgress`, so no ARIA range violation exists; the other two meters are exact. | `src/app/(app)/goals/page.tsx:130` vs `:145` | **R-33** (the unrounded value passes through) |
| F-236j | Low | **Six vendored dead arms lack the "zero consumers today" register marker the F-229f re-entry doctrine asks for.** button variants `sidebar`/`link`, sizes `icon`/`iconSm`/`pill`/`lg`, and badge variant `outline` carry zero consumers (compile/grep-verified) and no retention note — unlike the sub-AA arms (F-227f/F-222k) and the dropdown family (N-56e), which document their standing. | `src/components/ui/button.tsx:77,87,93-95`; `src/components/ui/badge.tsx:44` | **R-33** (the register markers — describe in words, never coin a class-shaped form) |
| F-236k | Low | **The PAD's F-228e retrospective quotes the pre-async call shapes.** The verification-history passage cites the verification-server wrappers' synchronous forms; the live code (and parity-228's updated pins) now awaits both — a reader cross-checking the quoted forms finds them absent. | `Project_Architecture_Document.md` (the F-228e retrospective) | **R-33** (the doc edit rides the lockstep) |
| F-236l | Informational | **Time-dependent values computed at render cause SSR/hydration text mismatches for date-offset users.** The dashboard's `now` state and the analytics from/to seeds mint on both sides of hydration; when the client's calendar date differs from the server's (users ahead of the deployment timezone, or a midnight crossing), React 19 logs recoverable hydration errors and re-renders the affected subtrees — console noise, no visual breakage. The full cure (post-mount seeding of every now-derived render value) spans the flagship page's whole KPI/rollup tree — the blast radius outweighs the recoverable-noise impact for a self-hosted app whose users usually share the server's zone. | `src/app/(app)/dashboard/page.tsx:75,149`; `src/app/(app)/analytics/page.tsx:65-70` | recorded (revisit on a report of visual breakage; the reference itself is client-rendered and cannot mismatch) |
| F-236m | Informational | **No pagination or row ceiling on any owner-scoped list GET.** The family GETs and the dashboard aggregate return the owner's full dataset (client-side derivation is the documented architecture; the reset route's own comment names the recorded growth posture). A scalability ceiling for a self-hosted personal-finance app, not a defect. | `src/app/api/transactions/route.ts:15-28` + siblings; `/api/dashboard` | recorded (the documented posture; a take/cursor param when growth materializes) |
| F-236n | Informational | **The signup first-user race can mint two admins.** Two concurrent first signups can both read `count === 0` before either create lands. No route branches on `role` today (display metadata only) — latent privilege-labeling, not access control. | `src/app/api/auth/signup/route.ts:68,88` | recorded (role is decorative until an authz consumer exists) |
| F-236o | Informational | **CSP covers only five directives — no default-src/connect-src/img-src.** Marginal today because `script-src 'unsafe-inline'` (the Next.js inline-bootstrap floor) already nullifies XSS containment; the exfiltration surfaces should close in the same change as the anticipated nonce architecture. | `next.config.ts:130-135` | recorded (awaiting the nonce migration) |
| F-236p | Informational | **Upload trusts the declared multipart MIME for extension selection — no magic-byte validation.** A non-image payload can be stored under a .png-family name. Mitigations verified: svg+xml is excluded from the whitelist, served Content-Type is pinned to the extension map, nosniff applies, names are server-minted UUIDs — no execution path found. | `src/app/api/upload/route.ts:102-106` | recorded (defense-in-depth; a magic-number sniff would make the stored set honest) |
| F-236q | Informational | **The DIALOG_CLOSE padding shifts the ✕ glyph ~6px inward of its pre-cure anchor.** `right-4 top-4` anchors the button box, so the p-1.5 padding moves the glyph left/down; the 28×28 target cure holds. Cosmetic; the captures re-anchored the baseline and the drift gates are clean. An offset compensation would shift visuals and need a baseline re-derivation. | `src/lib/page-layout.ts:317-321`; `src/components/ui/dialog.tsx:63-66` | recorded (the target size was the cure; the glyph anchor is the reference's own genus at 28px) |
| F-236r | Informational | **The informational tail.** (a) The dashboard/analytics refresh buttons carry no in-flight disabling — double-clicks issue parallel GETs, harmless under refreshAll's monotonic sequence guard; (b) every page subscribes to the full store (Zustand v5 without selectors) — a render-volume note, mutations refresh all slices anyway; (c) the dialog date fields ride the `input-base` genus while their text siblings ride the byte-extracted literal — byte-parity with the reference is gate-verified, the divergence is internal; (d) the parity-235 await-pin enumerates the five auth routes + seed — a future consumer is unpinned (the house's enumerated-file pin style); (e) the DIALOG_CLOSE citation's "p-1 superset family" framing overstated the toast precedent's own compliance (subsumed by F-236d's cure). | `dashboard/page.tsx:138-142`; `analytics/page.tsx:200-210`; the eight page files' store subscriptions; `tests/parity-235.test.ts:98-117` | recorded (postures, not defects) |

## 3. The remediation program (R-items)

Status legend: `Done(v2.N.M)` · `In progress` · `Programmed(session ≥ 204)` ·
`On demand`.

### R-1 — The security ledger (session 203) — Status: Done(v2.0.0)

The cure for F-203a, in the neo-crm s198 form adapted to this repo:

1. **`tests/security-ledger.test.ts`** (new, TDD):
   - *The runtime-zod floor pin*: resolve the zod module the app actually
     imports (`require.resolve("zod/package.json")` from the test), parse its
     version, assert `>= 4.6.6` (the GHSA-mrhx-c7xc-m3w5 vulnerable range is
     `<4.6.6`). Catches the regression class: a downgrade or resolution drift
     of the runtime dep. Mutation-proven (floor temporarily raised above the
     installed version → exactly 1 RED → restored → GREEN).
   - *The PAD census pin*: the §10 advisories row must match the recorded
     census (whitespace-normalized content match) — a stale PAD census trips
     the unit gate.
2. **PAD §10**: the advisories census row (10: 4 high / 5 moderate / 1 low,
   all dev-toolchain) + the chain decode (minimatch via eslint · deepmerge-ts
   via prisma CLI · vite/launch-editor via vitest · zod via the nested
   eslint-plugin-react-hooks copy · source-map-js via postcss) + the
   re-triage clause (re-run `bun audit` pre-push; any NEW runtime-chain
   advisory is cured same-session, never deferred; dev-toolchain bumps stay
   under the no-mid-rotation toolchain posture).
3. **AGENTS.md**: the pre-ship duty line (`bun audit` re-run + ledger
   re-triage) added to the gate discipline.

### R-2 — The docs-counts port (session 203) — Status: Done(v2.0.0)

The cure for F-203b + F-203c — port the neo-crm count-lockstep mechanism:

1. **`tests/docs-counts.test.ts`** (new, TDD — genuinely RED at birth: the
   stale sites carried 497, the pin asserted 498): constants `UNIT_TOTAL`,
   `E2E_TOTAL`, `SMOKE_TOTAL`, `TEST_FILES`, `CHECK_BADGE` (= UNIT+E2E), then
   per-site content pins (whitespace-normalized) for every live-tense
   gate-count claim in the living docs — CLAUDE.md, README.md (badge +
   status table), PAD (§7.1 distribution table + §9 command table + §10
   closing line), wealth-os_SKILL.md (header). A count change now fails `bun
   run test` until the docs are updated in the same commit.
2. **The site fixes** (the GREEN step, two passes — the pin's own tests
   count toward the suite, so the totals re-converged): the counts landed
   at **508 unit / 37 files / 592 badge** at v2.0.0 (CLAUDE gate line ·
   README badge + status row · PAD §7.1 distribution + §9 command table +
   §10 closing line · SKILL header; historical rows untouched — they keep
   the counts that were true at their time). Session 204's R-6 then found
   ten more sites the pin had missed (F-204a) and moved the live totals to
   521/38/605 with the completed inventory.
3. The phantom-reference cure rides along: with the file now real, the
   AGENTS.md:80 and PAD:566 references become true statements — and the
   PAD's pin inventory row is now honestly "9 architecture pins"
   (security-ledger joined the list).

### R-3 — The vitest.config.ts comment cure (session 203) — Status: Done(v2.0.0)

The cure for F-203d: rewrite the header comment for the finance domain
(the seam list: db-path resolution, scrypt/HMAC auth, finance math, schemas,
CSV import codec, rate limiter). Comment-only; zero behavior change; the
unit suite re-run green is the equivalence proof.

### R-4 — The gate:full WealthOS re-derivation — Status: Done (R-4.1 Done at v2.1.0; R-4.2 Done at v2.2.0; R-4.3 Done at v2.3.0; the baselines re-derived at v2.4.0's R-7.5; R-4.4 Done at v2.7.0; R-4.5 Done at v2.8.0 — the ladder CLOSED)

The multi-session program for F-203e. Sub-item ladder (each its own session
slice, TDD where a pin exists, in dependency order):

- **R-4.1** `sweep.ts` re-anchor — **Status: Done(v2.1.0)** (session 204).
  Shipped: `REF_URL` default → `https://wealth-os-d93bd04e.base44.app`
  (both `scripts/sweep.ts` and `scripts/sweep-state.ts` — the login-chain
  consistency: the pair-state module probes/logs into the reference on its
  own); the page list → the 11-entry WealthOS set (the 9 sections + the
  login/reset-password public faces, all verified 200 on the reference live
  at re-anchor time); the CRM genera/baselines RETIRED (the four class
  tables emptied — every page judges at baseline 0 + margin, the fail-fast
  pending state); the header's live-tense CRM claims rewritten. The TDD vehicle:
  `tests/sweep-tool.test.ts` (new, 9 pins — genuinely RED at birth against
  the CRM-era config, GREEN after the re-anchor; the CRM page names now
  fail `--pages` fast, the re-anchor's own regression guard). The maiden
  report-only run executed end-to-end: the re-anchored login pair worked
  against the WealthOS reference, all 11 pages captured both sides at
  1440×900, the diff table produced (the ~85–87% section shares are the
  data genus — ours zeroed vs the reference's demo corpus, exactly R-4.2's
  first derivation question; login 6.96% / reset-password 3.84% are
  comparable-genus auth faces), the seed restored, census MATCH after.
- **R-4.2** Baseline derivation at the four widths — **Status: Done(v2.2.0)**
  (session 205). Shipped, TDD throughout:
  - **The F-205a cure first** (the derivation's opening finding): the
    per-page resolved-theme match — `planThemeWrites` (PURE, pinned 3×)
    turns the reference's probed `html.dark` per page into our
    `wealthos-theme` localStorage writes at theme boundaries only (the
    app-dark/auth-light genus pays exactly two writes; a missing probe
    fails fast). The probe rides the reference capture's existing settle
    (zero extra navigation); our no-FOUC inline script applies each write
    at the next navigation's document start. The table collapsed
    ~85% → 12–75% and the auth faces held byte-identical (6.96/3.84).
  - **The four class tables derived** from the theme-matched maidens at
    390×844 / 768×1024 / 1024×768 / 1440×900 — every page at its measured
    standing share rounded up to the next 0.1pct (12 literal values per
    table, deep-pinned in tests/sweep-tool.test.ts; the three session-204
    pending-state pins replaced in the same commit, per the doctrine).
  - **The noise calibration**: a byte-identical 1440×900 re-run (every
    page within 0.01pct) — the 0.5pct margin's headroom is real.
  - **The zero-data state kept, by the stability call**: BOTH sides
    render their empty states (the F-206a correction, session 206 — the
    R-4.2-era "demo corpus" belief was a misdecode; a seeded our-side
    would roll with the calendar and drift its own baseline);
    zero-data.ts's CRM-era header comment rewritten for the honest
    rationale.
  - **The live proof**: all four `--fail-on-drift` runs clean, PLUS the
    live teeth check (`--drift-margin -5` trips exactly as designed:
    `dashboard 12.39% > allowed 7.40%`) and census MATCH after the chain.
  - **The genera decoded** (clusters + pixel fingerprints + VLM reads):
    the data-vs-empty genus (dominant on income/expenses/analytics/goals),
    the import+settings navy genus (F-205b), the smaller styling deltas
    (F-205c) — all documented in the STANDING_BASELINES docblock and
    printed per run by the rewritten standingExplained().
- **R-4.3** `drift-probe.ts` + `interior-census.ts` re-anchor —
  **Status: Done(v2.3.0)** (session 206). Shipped, TDD throughout:
  - **drift-probe.ts**: the reference URL, the standing fingerprint
    (index-BMU57229.js · md5 6d3779af… · 1,402,874 bytes), the desktop
    sidebar census (256px + 9 links), the FUNCTIONAL TRUE-390
    mobile-menu check (the reference's icon-only hamburger opens its
    full-screen plain-div drawer — 0 links before the click, 9 after;
    drift in either direction is the event), and the demo-data census
    re-based on per-page EMPTY-STATE SENTINELS (the F-206a decode: the
    reference's workspace is EMPTY — the standing state; a re-seed
    changes every zero-data baseline and the probe catches it). The
    CRM marketing-landing census RETIRED (the WealthOS `/` login-walls
    guests — verified live). Pins: tests/drift-probe-tool.test.ts
    (born RED 8, GREEN 11). The live probe run: every standing layer
    STABLE, exit 0.
  - **interior-census.ts**: the 11-page WealthOS set (lockstep with
    the sweep's PAGES — pinned), the public leg RETIRED (empty
    PUBLIC_PAGES; the machinery stays), the data-page scope re-anchored
    to the 9 sections, the reset-password ANCHOR FALLBACK (the
    reference's no-main card face — div.min-h-screen.bg-gray-50.p-4),
    and the verdict re-based on the STANDING_CENSUS allowances: the
    four-axis maidens' measured unexplained counts + mainH deltas per
    page per axis (44 literal values, deep-pinned), CENSUS_MARGIN cut
    2 → 0 by the PROOF-A decode (an inline header ghost slipped inside
    a 2-event margin; the zero margin is licensed by the
    three-measurement-per-axis noise calibration, all byte-identical),
    the fail-safe zero for unknown pages. Pins:
    tests/interior-census-tool.test.ts (new, born RED 5, GREEN 12).
  - **The live proofs**: the four-axis `--fail-on-drift --parallel 4`
    run CLEAN (all 44 legs exactly at standing) + BOTH teeth classes
    RED (the inline header ghost: 286 > allowed 285; the below-fold
    displacing ghost: mainH −79 ≠ standing −105) + the seed restored
    every run.
- **R-4.4** `fullpage-sweep.ts` page set + baselines — **Status:
  Done(v2.7.0)** (session 210). Shipped, TDD throughout, following the
  R-4.1/R-4.2/R-4.3 pattern: the pin (`tests/fullpage-sweep-tool.test.ts`)
  rewritten and born RED 11/19 against the CRM-era config, GREEN 22/22 at
  ship. The re-anchor: REF -> the WealthOS reference (env-overridable);
  the page set -> sweep.ts's PAGES IMPORTED (the 11-entry lockstep, the
  interior-census idiom); the GUEST doctrine RETIRED with the marketing
  landing (the 9 sections are auth-walled both sides — the tool rides
  preflightPairState, the shared cross-process login pair); the theme
  match (planThemeWrites + the per-page probe, the F-205a cure); the
  zero-data + seed-restore protocol with the restore in a FINALLY; the
  classes -> the sweep's own desktop/phone (1440×900 + 390×844 — the
  five gates' axes coincide); the baselines -> per-class per-page tables
  derived from the clean theme-matched zero-data maiden (the round-up
  doctrine) with the byte-identical noise calibration (worst delta
  0.000pct across all 22 measurements). The maiden's own findings cured
  in-commit: **F-210b** the zero-data sentinel (`assertZeroData` — the
  six-array /api/dashboard probe, after the zero + after each class's
  our-side loop; it caught the corruption live on its second run) and
  **F-210c** the exact-basename guard cure (the suffix collision that
  let the sweep fire inside the fullpage process — all four tool guards
  hardened); **F-210a** (the scroll-model genus) decoded and absorbed
  into the tables. The live proofs: all 22 legs CLEAN at both classes
  under `--fail-on-drift`, the teeth check (`--pages login
  --fail-on-drift --drift-margin -3` → exit 1 with the allowed values
  named), census MATCH after every run.
- **R-4.5** `gate:full` reactivation: un-dormant the five docs (README,
  AGENTS, CLAUDE, PAD, SKILL), wire `bun run gate:full` back into the
  pre-push doctrine — **Status: Done(v2.8.0)** (session 211). Shipped:
  the cold end-to-end `bun run gate:full` chain executed as the ship
  evidence (lint → typecheck → test → build → smoke → e2e → the four
  sweep class drift gates → the fullpage drift gate → the interior
  census drift gate, every leg green from cold); the five dormant
  doc sites re-activated (README:174, AGENTS:31, PAD:167/685,
  SKILL:206 — CLAUDE.md's gate line joined the count lockstep); the
  pre-push doctrine upgraded from `bun run gate` to "gate before every
  push, gate:full when parity surfaces changed or per the standing
  cadence". The session's own F-211a rode along (the package-identity
  pin born RED → cured → GREEN, `bun install` re-keying bun.lock).
  The R-4 ladder's exit criteria are met: gate:full green end-to-end
  from cold, every doc row updated in-commit.

**Entry criteria**: a session with a green `bun run gate` baseline and no
open Critical/High findings. **Exit criteria**: `gate:full` green end-to-end
from cold, every doc row updated in-commit. **Estimate**: 3–6 iteration
sessions (R-4.1–R-4.4 are each independently shippable; R-4.5 last).

### R-5 — The LLM provider wiring — Status: On demand

The optional F-203f work: implement an `AiProvider` backed by a real LLM
behind `WEALTHOS_AI_PROVIDER` + credentials, keeping the deterministic
engine as the default/fallback. Only on the owner's explicit ask (it changes
the offline/no-keys posture of ADR-005). Not scheduled.

### R-6 — The docs-counts site-inventory completion (session 204) — Status: Done(v2.1.0)

The cure for F-204a, completing R-2's port: the pin now covers EVERY
live-tense gate-count site in the doc set, not seven of them. Four new
grouped pins (genuinely RED at birth against the ten stale sites):
CLAUDE's command table + test pyramid · README's stack table + file
hierarchy + testing table · the PAD's ADR-006 gate chain + §7.4 pre-push
checklist · the SKILL's stack table + commands + pre-ship checklist —
unit AND e2e AND smoke AND file-count claims alike, so the next count
change of any kind fails `bun run test` until every site moves in the
same commit. The ten stale sites fixed in the same stroke (497/35 → the
live totals), and the totals re-converged with the round's own new tests:
**521 unit / 38 files / 605 badge** (the sweep-tool pin's 9 + the
docs-counts extension's 4 joined the suite).

### R-7 — The parity convergence (shells, headers, mobile family, auth cards, navy genus) — Status: In progress (R-7.1–R-7.5 executed at v2.4.0; R-7.6–R-7.9 executed at v2.5.0 — the named tail CLOSED; R-7.10 executed at v2.6.0 — the F-209a per-surface card convergence + the F-209b stat row; the R-7 program's card arc is CLOSED; R-4.4 next)

The F-205b/F-205c/F-206b convergence work, executed by the session-207
slice after a fresh live census (both apps, agent-browser, logged-in,
both themes) re-derived every genus at full fidelity (the F-207
findings). Slices, in dependency order:

- **R-7.1 The mobile header + pill family (F-207a/b/h)** — the
  phantom-`xs:` cure (the pill moves to the reference's RIGHT cluster,
  always visible at 390), the topbar's gradient wash + amber border +
  shadow-lg, the `w-8 h-8` logo, the gradient-clip wordmark, the
  borderless ghost icon buttons, and the badge genus everywhere
  (`rounded-md … font-semibold text-green-600 border-green-300` + the
  wifi icon — topbar AND sidebar footer). The kept supersets: sticky
  positioning (vs the ref's fixed — our in-flow model), aria-labels,
  the focus-visible ring.
- **R-7.2 The drawer footer + sheen (F-207d)** — the `p-4 border-t
  border-amber-500/20` footer wrapper, the ghost Sign Out
  (`border-slate-600 hover:bg-white/10`), the 3% gold/emerald sheen
  layer (a globals.css utility) over our opaque gradient (the
  readability superset — the reference's transparent veil ships
  unreadable light-mode text; F-207c's withdrawal keeps the active
  pill, proven reference parity).
- **R-7.3 The section shells + headers + H1 tokens (F-207e/g)** — the
  warm gradient wash + `p-4 lg:p-8` + `min-h-screen` on all nine
  shells; the per-page inner containers (7xl: Dashboard/Expenses/
  Investments/Analytics · 6xl: Income/Accounts/Import/Goals · 4xl:
  Settings); the page-header `lg:` breakpoints + `mb-8 gap-4` rhythm;
  the H1 navy token (`--color-primary-navy: #0f1419`) on the seven
  navy pages + the mb-1/mb-2 rhythm + `dark:text-white`, tracking-tight
  dropped; the Import page's own navy wash
  (`from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800`).
- **R-7.4 The auth-card family (F-207f)** — `border-0 shadow-2xl
  bg-white/95 backdrop-blur-sm`, the slate accent bar, the taller
  `md:pt-12 md:pb-10 md:px-10` padding (login + reset faces).
- **R-7.5 The baseline re-derivation** — after the convergence, the
  four-width sweep maidens + the interior census re-run, the standing
  baselines/allowances re-derived DOWNWARD (the drift gate only
  catches upward drift — lowering is a deliberate, pinned
  re-derivation in the same commit), per the R-7 doctrine.

Entry criteria: a session with a green gate and no open Critical/High
findings (met at v2.3.0 → 535/535 green, F-207a the round's High).

The session-208 tail (owner-directed again over the R-4.4 default — the
standing directive re-emphasizes visual/functional parity, and the plan's
routing rule sends the parity slice first; R-4.4 stays next):

- **R-7.6 The stat faces** (F-208a/b/c/f) — the KpiCard tile genus
  (tone-based gradient tiles `w-12 h-12 rounded-xl bg-gradient-to-r
  from-X-500 via-Y-500 to-X-600` + `text-white` icons, fixed size);
  the Investments KPI row as three full-card gradient cards
  (blue/cyan · emerald/teal · amber/yellow, ghost `w-12 h-12
  text-white/30` icons); the Cash Flow dot-legend row REMOVED (the
  reference renders none) + the PeriodSegment micro-deltas
  (`flex gap-1 bg-stone-100 dark:bg-stone-800/80 rounded-lg p-1` +
  `font-semibold transition-all duration-200` buttons); the health
  widget's score bars (text-xs labels, solid band-colored fills) +
  the amber tip box + the gauge overlay construction; the Analytics
  legend series order (Income first).
- **R-7.7 The settings navy/blue tail** (F-208d, the F-205b second
  half) — the glass card genus + shadcn CardHeader/CardTitle
  (navy)/CardContent anatomy, the blue GDPR box + blue Export
  button, the amber Import-warning INNER box, the shadcn badge
  family (green/blue/purple/indigo), the Save footer at the page
  bottom, the reference's card titles; Category Budgets kept as the
  documented functional superset, restyled.
- **R-7.8 The auth-face residuals** (F-208e) — the fetched
  `public/wealthos-logo.png` asset in the reference's wrapper
  construction (round, `sm:h-24 sm:w-24` upsize, ring-white/50),
  the title/subtitle slate tokens replacing the drifted hexes.
- **R-7.9 The baseline re-derivation** — after the convergence, the
  four-width sweep maidens + the interior census re-run for the
  touched faces, the standing baselines/allowances re-derived
  DOWNWARD per the R-7 doctrine, both drift gates proven clean.
- **R-7.10 (executed at v2.6.0 — the F-209a per-surface card
  convergence, refining F-208g's single-genus belief)** — the four
  decoded families ported to the constants seam
  (`src/lib/page-layout.ts`): CARD.base → the WARM-SIMPLE genus
  (Dashboard mid + Investments charts/tables); CARD.kpi (new) → the
  WARM-HOVER genus (Dashboard KPI ×4, p-6 in-base, card-hover,
  backdrop-blur-md); GLASS_CARD (new) → the glass genus base + hover
  variant (Expenses summary ×3 +hover, Expenses content, Analytics
  charts, Dashboard Recent Activity + AI Insights, Income, Goals);
  STOCK_CARD (new) → the shadcn stock card (Accounts, Import);
  STAT_GRADIENTS (new) → the Analytics saturated stat row. The two
  primitives: the `.card-hover` @utility (the reference's CSSOM rule
  verbatim) and the `--color-card` / `--color-card-foreground` @theme
  tokens + `.dark` runtime overrides (the A-209 inert-class cure).
  CARD.padding → `p-6` fixed (the reference's effective 24px; the
  `p-4 md:p-6` upsize retired). Plus **F-209b**: the Analytics stat
  row (three gradient cards over a new tested `monthlyAverages()`
  helper in `src/lib/finance.ts`). Settings untouched (converged at
  R-7.7). Then the R-7.9-style four-width sweep + interior-census
  re-derivation. After it: R-4.4 (the fullpage-sweep re-anchor).

### R-8 — The dependency round (session 212) — Status: Done(v2.9.0)

The ledger's standing deferral, taken per the trailing pointer's default
for the no-open-R-item state. The audit's finding (F-212b): the lockfile's
transitive resolutions had never been re-resolved since the scaffold era,
so 8 of the 10 advisories the ledger deferred were curable within the
parents' own semver ranges.

- **R-8.1 The floors pin (TDD)** — `tests/dependency-floors-212.test.ts`
  born RED 4/4, each failure naming its evidence: every zod resolution
  ≥ 4.6.6 (GHSA-mrhx-c7xc-m3w5 — the nested eslint-plugin-react-hooks
  copy sat at 4.6.5), every vite resolution ≥ 8.3.3 (outside the
  8.3.0–8.3.2 six-advisory window), every source-map-js resolution
  ≥ 1.2.2 (GHSA-68fv-2mgg-jv7q), and the lockfile identity (the
  workspaces mirror = `wealth-os`; no `activity-map`/`neo-crm` anywhere
  — F-212a). The pin parses bun.lock directly (trailing-comma strip +
  JSON.parse — the resolution record `bun audit` itself walks), including
  nested keys, and requires a non-empty packages section so an empty
  parse can never pass silently.
- **R-8.2 The cure** — `bun update` moved the direct deps within ranges
  (next 16.4.2→16.4.5 · eslint-config-next 16.4.2→16.4.5 · tailwind +
  @tailwindcss/postcss 4.3.3→4.3.5 · vitest 5.0.5→5.1.0 · playwright
  1.64.1→1.65.0 · axe-core 4.13.0→4.14.0 · zustand 5.0.15→5.1.0 ·
  html2canvas-pro 2.5.2→2.6.3 · @types/node 26.6.5→26.6.6) but KEPT the
  stale transitive resolutions; the fresh lockfile generation (`rm
  bun.lock` + `bun install` — the package manager's own regeneration, the
  fresh-clone-equivalent state) re-resolved everything: vite 8.3.6 ·
  source-map-js 1.2.2 · the nested zod GONE (deduped onto the runtime
  4.6.7) · the workspaces mirror re-keyed to wealth-os. The census:
  **10 → 2** (deepmerge-ts high + minimatch moderate — F-212c's
  range-unreachable pair). The dompurify override-pin (3.4.17) verified
  intact through the regeneration; the prisma census verified MATCH
  post-regeneration (the blocked `@prisma/client` postinstall was the
  auto-generate convenience only — the generated client + engine
  persisted and serve queries).
- **R-8.3 The lockstep** — the PAD §10 advisories row re-anchored to the
  live census (2: 1 high / 1 moderate, both range-unreachable, the
  cured-eight decode recorded); the security-ledger PAD-census pin
  re-anchored in-commit; the resolved-version columns re-anchored across
  README/PAD/SKILL (the badge row included); the unit-count lockstep
  616 → 620 / 42 → 43 files (the architecture-pins family 16 → 17 with
  dependency-floors-212; the §7.1 infra sub-row corrected to its real
  23 — the sub-row arithmetic 3 + 17 + 23 = 43 now closes); the full
  gate re-run cold at the new resolutions, the drift legs included
  (parity surfaces changed with the next + tailwind bumps).

### R-9 — The prisma 6→7 major migration (session 213) — Status: Done(v2.10.0)

The trailing pointer's default for the no-open-R-item state was the
standing residuals' watch — but the round's ledger re-triage went one
level deeper and found the material: **the F-212c "range-unreachable"
decode for deepmerge-ts is STALE**. `@prisma/config` 7.x (the new major
line — 16 stable releases deep, prisma 8 already in RC) moved its
dependency to deepmerge-ts **8.0.2**, the GHSA-ggr8-5vv4-36mx fixed
version, while every 6.x stable (the line ends at 6.19.3) exact-pins the
vulnerable 7.1.5 forever. The HIGH advisory is now curable — but only
across a major ORM migration.

- **F-213a — the deferred HIGH is now curable, but only across a major**.
  The migration surface was walked file-by-file before planning (the
  plan-validation pass): `prisma/schema.prisma`'s generator
  (`prisma-client-js` → `prisma-client`, `output` now required — the
  client no longer lands in node_modules); `src/lib/db.ts` +
  `prisma/seed.ts` (the only two PrismaClient constructors — the
  driver adapter replaces the `datasources` URL option); the two auth
  routes importing the `Prisma` namespace (forgot/reset-password — the
  namespace moves to the generated path); `tests/e2e/global-setup.ts`
  (`--skip-generate` removed in v7; the relative-URL resolution moves
  from the schema rule to `prisma.config.ts`, so the e2e db push pins
  its target by ABSOLUTE url); the bun `allowScripts` keys; and the
  generated-client dir (gitignore + eslint ignore + the standalone
  wasm-trace question the smoke ladder answers empirically). The
  db-path seam itself (`runtimeDatabaseUrl`) is UNTOUCHED — the adapter
  consumes the same resolved URL the engine did.
- **R-9.1 The floors pin (TDD)** — `tests/dependency-floors-213.test.ts`
  born RED: every deepmerge-ts resolution ≥ 8.0.0 (the advisory floor);
  every prisma / @prisma/client resolution on the 7.x line (the major
  itself is the contract — a 6.x regression re-opens the advisory);
  the `@prisma/adapter-better-sqlite3` + `better-sqlite3` resolutions
  present (the runtime adapter chain the client now requires).
- **R-9.2 The migration-contract pin (TDD)** —
  `tests/prisma-7-contract.test.ts` born RED: the schema's generator is
  `prisma-client` with an output path; both constructor sites build
  through the adapter and pass NO `datasources` option;
  `prisma.config.ts` exists with the schema + datasource env seam; the
  e2e global-setup carries no removed `--skip-generate` flag and pins
  the e2e db by absolute url; the generated dir is gitignored +
  eslint-ignored; package.json wires the postinstall generate (the
  fresh-clone DX contract: `bun install` yields a typecheckable tree).
- **R-9.3 The cure** — the dependency moves (`@prisma/client@^7.10.1` +
  `@prisma/adapter-libsql@^7.10.1` + `@libsql/client@^0.17.4` into
  dependencies; `prisma@^7.10.1` into devDependencies per the upgrade
  guide — the CLI is not runtime; dotenv for `prisma.config.ts`); the
  generator swap (`prisma-client` + `output = "../src/generated/prisma"`)
  + the postinstall generate; the two constructor rewrites through the
  adapter seam; the namespace import moves in the two auth routes;
  `prisma.config.ts` (dotenv + `resolveDatabaseUrl` — a relative URL can
  never ride the v7 CWD rule out of the repo, and the prisma-env
  wrapper's absolute URL flows through unchanged); the e2e setup
  re-pin (the removed generate-skip flag gone, the e2e db pinned by
  validated-root ABSOLUTE url); the eslint/gitignore excludes; the
  `serverExternalPackages` chain. **The round's own discovery (F-213b):
  bun HARD-BLOCKS better-sqlite3** — `require` loads but the
  constructor throws `not yet supported in Bun` (oven-sh/bun#4290), and
  the prisma 7 upgrade guide names exactly that adapter for SQLite. The
  first install proved it live (seed/census ERR_DLOPEN_FAILED under the
  guide's adapter); the bun-compatible runtime chain is
  `@prisma/adapter-libsql` + `@libsql/client` (the NAPI libsql driver,
  verified live under bun: read queries against the real db, the full
  seed/reseed cycle, the standalone artifact boot, and the whole gate).
  The schema's datasource `url` property was also removed (v7 rejects it
  — P1012); the lockfile regenerated (`rm bun.lock` + `bun install` —
  the F-212b lesson again: `bun remove` left the stale better-sqlite3
  resolution behind; the regeneration cleared it, dompurify override
  intact).
- **R-9.4 The verification** — lint 0/0 · tsc 0 · **630 unit (45 files,
  +10: the two new pins)** · build (all routes + capital twins + the SEO
  family; the standalone artifact carries the full native+wasm chain —
  94MB) · smoke 14/14 (the standalone boots under bun with the adapter —
  the login/session/rate-limit/artifact-hygiene ladder green) · **e2e
  84/84** (the v7 global-setup rewire + the adapter under the production
  server, mobile-drawer battery included) · **two sweep legs CLEAN**
  (1440×900 + 390×844 at margin 0.5pct — the tools zero/reseed through
  the adapter; parity surfaces unchanged, as expected for a
  backend-only migration) · census MATCH after every leg · **the audit
  census 2 → 1** (0 high / 1 moderate — minimatch stays the lone
  range-unreachable deferral until typescript-estree moves; the
  security-ledger pin + PAD §10 re-anchored in-commit) · the docs
  lockstep (stack versions everywhere, counts 620→630 / 43→45 / badge
  704→714, the §7.1 pins family 17→19, the AGENTS gotcha, the README
  quickstart note, the PAD revision block).

### R-10 — The owner-scoping round (session 214) — Status: Done(v2.11.0)

The session-214 fresh-eyes audit's tenancy cluster (F-214a/b/c): the
"single-user-per-install" posture the PAD describes was never ENFORCED,
while signup is open — `/api/reset` wipes the whole install, `Budget`
and `Setting` are global, and `GET /api/users` enumerates every account.
The cure brings the two stragglers onto the same `ownerId` contract the
other five finance models already carry (the PAD's own ER, finally
true), scopes every read/write to the session user, and retires the
dead CRM "owners list".

- **R-10.1 The pin (TDD)** — `tests/owner-scoping.test.ts` born RED:
  the schema carries `ownerId` on Budget + Setting (with the relation
  and the `@@unique([ownerId, category, period])` key); `/api/reset`
  scopes every delete through `where: { ownerId }`; the budgets family
  (GET/POST/DELETE), the dashboard/ai-coach/export budget reads, the
  settings GET/PUT, and the users GET all reference the session owner.
- **R-10.2 The cure** — the schema migration (Budget.ownerId + the
  compound unique; Setting.ownerId unique, the row becomes per-user
  with the demo seed writing it); the seed's budget/setting writes go
  owner-bound; the five route families re-scoped; `GET /api/users`
  answers the session user's own record only (the PATCH half is
  unchanged); `db:push` + reseed; PAD §4 ER + §4.2 + README API rows
  lockstep.
- **R-10.3 The verification** — the full gate + the census (statics
  unchanged: 7 budgets / 1 setting row, now owner-bound) + the drift
  legs (the UI is unchanged for the demo user — the parity surfaces
  must not move).

### R-11 — The palette-completion round (session 214) — Status: Done(v2.11.0)

The session-214 audit's Tailwind v4 cluster (F-214d/e): the F-207a
phantom-variant lesson has a THIRD edition — 23 (family, step) pairs
used in src/ compute through v4's oklch defaults (silently the wrong
values), and 7 shadcn semantic tokens are fully INERT (v4 drops
unknown tokens without warning). The F-209a card-token cure fixed two
tokens; the complete enumeration finds the rest of the tail.

- **R-11.1 The pin (TDD)** — `tests/palette-pins.test.ts` born RED:
  a complete enumeration — every (family, step) pair (including
  `/opacity` forms) and every semantic token used in any class string
  under src/ MUST be pinned in globals.css's `@theme`. The audit's
  enumeration script promoted into the unit gate, so the class of bug
  (F-207a token edition, F-209a, F-214d/e) cannot resurface.
- **R-11.2 The cure** — the 23 missing pairs pinned to their v3
  palette values (amber-950 #451a03 · blue-300 #93c5fd / 800 #1e40af /
  900 #1e3a8a / 950 #172554 · emerald-900 #064e3b / 950 #022c22 ·
  green-200 #bbf7d0 / 300 #86efac / 800 #166534 / 900 #14532d ·
  indigo-100 #e0e7ff / 300 #a5b4fc / 800 #3730a3 / 900 #312e81 ·
  purple-300 #d8b4fe / 800 #6b21a8 / 900 #581c87 · red-800 #991b1b ·
  rose-300 #fda4af / 900 #881337 / 950 #4c0519 · violet-500 #8b5cf6);
  the 7 shadcn semantic tokens pinned in the reference's own neutral
  family (input #e5e5e5 · secondary #f5f5f5 · secondary-foreground
  #171717 · accent #f5f5f5 · accent-foreground #171717 ·
  muted-foreground #737373 · popover #ffffff · popover-foreground
  #0a0a0a) with the `.dark` runtime flips (the F-209a mechanism:
  #262626 · #fafafa · #a3a3a3 · #0a0a0a per the shadcn neutral dark
  set).
- **R-11.3 The verification** — the full gate + the four sweep class
  drift legs + the interior census at margin 0: the pins change
  computed colors ONLY where v4-oklch ≠ v3-hex (the 23 pairs) and turn
  INERT classes on (the 7 tokens — e.g. the login verify-input border,
  the Settings badge hovers, the dropdown/select hover states); any
  standing-baseline trip is decoded with `--clusters` and the affected
  page's baseline re-derived per the R-7.5 doctrine.

### The in-commit cures (session 214)

- **F-214f** — the boot-gate delivery warning: `bootEnvCheck` warns
  (never fatals — the warn-throw discipline) when `NODE_ENV=production`
  and the in-app OTP/RESET knobs are unset, naming both knobs; pinned
  in `tests/boot-env.test.ts`.
- **F-214g** — `upcomingAlerts`' window made deliberate: the docblock
  documents the month-to-date-overdue + horizon window (the "Alerts"
  half of the section), the overdue edge pinned in
  `tests/finance.test.ts`.
- **F-214h** — `parseCsv` treats an unquoted-field quote as a literal
  (RFC 4180), pinned with a mid-field-quote fixture in
  `tests/csv.test.ts`.
- **F-214i** — the doc drift: README upload row 10 MB → 5 MB, the
  phantom `/api/analytics` row corrected (client-side aggregation),
  `/api/ai` → `/api/ai/coach`, the schema role comment aligned to the
  signup truth, PAD §10's cap row.
- **F-214j** — the AI coach's zero-income overspend warning: the
  else-if fires on `income === 0 && expenses > 0` with its own copy;
  pinned in `tests/ai.test.ts`.
- **F-214k** — eslint.config.mjs re-enables
  `react-hooks/exhaustive-deps`, `no-unreachable`, `no-fallthrough`,
  `no-useless-escape` (all verified 0-issue live this session — the
  gate strengthens, nothing weakens).
- **F-214m** — the scratch-db schema-drift cure (discovered live during
  the R-10 verification): the smoke scratch db is recreated each run,
  and the e2e global-setup pushes with `--force-reset` (in-place schema
  recreation — idempotent against any schema drift; see the findings
  row for the prisma-7 refusal decode).

### R-12 — The live-seam convergence round (session 215) — Status: Done(v2.12.0)

The session-215 fresh-eyes audit's completeness cluster: the F-214h
cure landed in a module no production code imports while the live
Import parser still carries the bug (F-215a High), the only live CSV
export bypasses the formula-injection guard the docs claim (F-215b),
the R-10 security round's pins can't catch semantic regressions and no
behavioral multi-user test exists (F-215c), the seed still wipes the
whole install (F-215e), and a tail of smaller cures (F-215d/f/g/h/i/j/
k/l/o). The round's spine: converge the live surfaces onto the guarded,
tested seams — then pin the convergence so the "cure lands in a dead
module" class cannot resurface.

- **R-12.1 The pins (TDD)** —
  `tests/import-seam.test.ts` born RED: the Import page imports
  `parseCsv` from `@/lib/csv`, carries NO local parser definition, and
  the non-CSV extension branch (the F-215f honest error) exists with
  its message; `tests/analytics-export-seam.test.ts` born RED: the
  analytics page imports `toCsv` from `@/lib/csv` and carries no
  hand-rolled quote-doubling escape; `tests/owner-scoping.test.ts`
  extended RED: every reset `deleteMany` carries the EXACT
  `ownerId: guard.user.id` form (not the substring); the seed pin born
  RED (`tests/seed-scoping.test.ts`): every seed `deleteMany` is
  owner-scoped and the demo upsert precedes the deletes; the AI
  break-even pin born RED (`tests/ai.test.ts` extended: income equal
  to expenses renders the neutral break-even line, NOT the overspend
  warning); the settings P2002 pin born RED (source form: readSettings
  carries the unique-constraint catch + re-read); the prisma-env guard
  pin born RED (the exact-basename form, F-210c doctrine);
  `tests/e2e/multi-user.spec.ts` born GREEN BY DESIGN (the behavioral
  contract pin — the routes are correct today; F-215c's point is that
  nothing would catch the semantic-regression class, not that it is
  broken now): the two-user isolation ladder (signup B → B's rows
  visible to B only → B resets → B's rows gone → the demo user's rows
  SURVIVE B's reset).
- **R-12.2 The cures** — the Import parser swap (the page's inline
  copy deleted; `import { parseCsv } from "@/lib/csv"` — the BOM strip
  and the F-214h bare-quote fix go live); the non-CSV extension branch
  (accept + hint stay byte-identical to the reference — parity
  surfaces; a `.xls`/`.xlsx` pick gets "export as CSV" guidance);
  the analytics `exportCsv` rebuilt through `toCsv` + `csvFilename`
  (the S48-P1 guard goes live on the only export surface); the
  `csv.ts` docblock corrected (the phantom entity-export.ts claim
  retired); the seed re-ordered (demo upsert FIRST, then
  `deleteMany({ where: { ownerId: demo.id } })` × 7 — `bun run
  db:seed` refreshes the demo corpus without touching any other
  account); `readSettings` catches the unique-constraint error and
  re-reads (the concurrent first-touch 500 cured); the AI verdict's
  break-even half (its own neutral line); the users PATCH docblock
  corrected to the name-only truth; the dead PDF tail retired
  (`src/lib/pdf-export.ts` + `src/lib/download.ts` deleted;
  `jspdf` + `html2canvas-pro` removed from package.json; the
  README/PAD/SKILL rows corrected to the real data-export story);
  `next.config.ts`'s phantom photo-upload comment corrected;
  DEPLOYMENT.md §5's upgrade note (the F-215d procedure: backup →
  `--force-reset` → reimport, or the ALTER+backfill SQL path); the
  PAD:266 diagram node (10MB → 5MB); the smoke db legs made
  loud-on-fail; the prisma-env exact-basename guard.
- **R-12.3 The verification** — the full gate (lint → tsc → unit →
  build → smoke → e2e incl. the new multi-user spec) + the census
  (statics unchanged) + the import/analytics sweep legs (the parity
  surfaces are untouched by design — accept + hint byte-identical,
  the export change is behavior-only; any trip is decoded with
  `--clusters` per the standing doctrine) + `bun audit` re-triage
  (the two removed runtime deps shrink the surface).

### R-13 — The verification-gap convergence round (session 216) — Status: Done(v2.13.0)

The session-216 fresh-eyes audit (three parallel Mode-C passes: the
R-12 cure surfaces, the API/auth/security layer, the UI/a11y layer —
0 Critical, 0 High, 6 Medium, 11 Low, 19 Informational, every
material claim re-verified at file:line by the driving session, one
audit suspicion DISMISSED by live probe: F-216k). The round's theme:
**claims vs reality and unpinned behavior** — the import path's
5000-row promise blocked by a ceiling nothing tests (F-216a), a
security guard whose pin is a phantom file (F-216b), client states
the store tracks but no page renders (F-216c/d), an a11y defect the
two-gate cannot see (F-216e), and the doc tail of the round that
existed to close doc claims (F-216f). The spine: make every claim
executable — the contract, the pin, and the surface converge.

- **R-13.1 The pins (TDD)** —
  `tests/import-body-cap.test.ts` born RED: the seam parameterizes
  its ceiling (`readBoundedJson(req, maxBytes)` + `parseBody(req,
  schema, maxBytes)` — the 16KB default unchanged for every existing
  consumer) and the import route passes `MAX_IMPORT_BODY_BYTES`
  (4MB — 5000 rows × the worst-case ~250B row ≈ 1.25MB, generous
  headroom); behavioral legs: a >16KB Request accepted at the import
  cap, rejected at the default cap. `tests/csv-formula-guard.test.ts`
  born RED (the phantom reference made real): `=/+/@`/tab/CR cells
  get the `'` marker inside RFC-4180 quoting; `-`-prefixed cells
  byte-identical (the (b)-vs-(c) exclusion); safe cells
  byte-identical; the parseCsv round-trip preserves the marker; the
  toCsv column-form integration escapes through the guard.
  `tests/schemas-finance.test.ts` extended RED: `"2026-02-30"`,
  `"02/30/2026"`, `"March 5, 2026"` rejected; `"2026-01-01"` and a
  full ISO datetime pass (the dialog + import payload forms).
  `tests/loading-states.test.ts` born RED: the AppShell gates its
  children on the store's `loading`/`hydrated` state rendering
  `LoadingBlock` (the component gains its first consumer), and the
  `store.error` banner (role="alert" + the retry affordance) exists
  in the shell. `tests/parity-216.test.ts` born RED: the QuickAction
  carries NO nested interactive (no `<button` inside `<Link` — the
  classes move onto the anchor); the Expenses filters popover closes
  on Escape + pointerdown-outside; the signup/resend OTP log line
  sits INSIDE the inAppOtpEnabled branch; the scaffold-era
  `scripts/install_packages.sh` is gone; the Import page's no-op
  ternary is collapsed. `tests/docs-counts.test.ts` extended RED:
  the SKILL's §2 table carries no "PDF export" row and no "jspdf".
  E2E born RED/GREEN by design: `tests/e2e/data-import.spec.ts` (the
  F-216a behavioral leg — a dedicated scratch user imports a 500-row
  >16KB payload through the REAL route, the count lands, the user's
  reset cleans up; the demo corpus untouched, the multi-user.spec
  pattern); the a11y census gains the anon `/reset-password` leg
  (the missing surface, I-c6); the Expenses spec gains the
  filters-open → Escape-closed leg.
- **R-13.2 The cures** —
  `src/lib/api.ts`: `readBoundedJson`/`parseBody`/`isBodyTooLarge`
  parameterized (default `MAX_AUTH_BODY_BYTES`; the import route's
  `MAX_IMPORT_BODY_BYTES = 4 * 1024 * 1024` exported + documented);
  the import route passes it. `src/stores/wealthos-store.ts`:
  `refreshAll` gains the failure branch (error set behind the
  write-token guard), `refresh` returns the Result, the Refresh
  handlers toast on failure (the house pattern); the dead `search`
  action retired. `src/components/layout/app-shell.tsx`: the loading
  gate (`!hydrated || loading` → LoadingBlock in the main column)
  + the error banner with a Try-again button (store.hydrate()).
  `src/app/(app)/dashboard/page.tsx`: the QuickAction's button
  wrapper dropped — the anchor carries the classes (single tab stop,
  identical computed styles). `src/app/(app)/expenses/page.tsx`: the
  filters popover Escape + pointerdown-outside effect.
  `src/app/(app)/import/page.tsx`: the no-op ternary collapsed.
  `src/app/api/auth/signup` + `resend`: the OTP `console.info` gated
  behind the inAppOtpEnabled branch (the code logs only when the
  response also carries it; a code-less email audit line otherwise).
  `src/lib/schemas.ts`: `dateField` gains the ISO-shape regex + the
  calendar round-trip refinement. The F-216f doc tail: SKILL:127's
  PDF row deleted (the dompurify-override note re-homed); PAD:303
  "JSON/PDF" → "JSON"; DEPLOYMENT.md:76 owner-scoped wording; the
  reset comment "seven" → "six"; `src/lib/csv.ts`'s docblock
  corrected (the real test file + the bank-transaction domain + the
  one export surface); `scripts/install_packages.sh` deleted (the
  scaffold-era npm artifact contradicting package.json — `bun
  install` is the documented path); `scripts/discover-198.ts`'s
  leg-4 guarded with existsSync; `scripts/smoke-test.sh`'s cleanup
  trap also kills the boot-gate server (GATE_PID — the interrupt
  leak); the dead exports retired (MOBILE_NAV_SHEET.overlay,
  NAV_LAYOUT.icon/label, PERIOD_SEGMENT, GRID_COLS,
  chart-no-outline, store.search); `reset-password-screen.tsx`'s
  password inputs gain the signup family's minLength={8}.
- **R-13.3 The verification** — the full gate (lint → tsc → unit →
  build → smoke → e2e incl. the new legs) + the census + the six
  parity drift gates re-run (the AppShell/Dashboard/Expenses
  surfaces changed — the loading gate alters only the pre-hydrate
  DOM the settled-state sweeps never capture; the QuickAction keeps
  its computed classes on the anchor; the popover effect is
  behavior-only; any trip is decoded with `--clusters` per the
  standing doctrine) + `bun audit` re-triage (no dependency change
  — the ledger stands at the 1 documented moderate). The live
  verification’s one event, decoded and cured in-commit: the interior
  census tripped on the dashboard’s unexplained counts (+6/+6/+6/+9
  across the four axes) — the QuickAction single-anchor divergence
  from the reference’s own nested <a><button/></a> DOM (a DELIBERATE
  a11y superset; every other page matched its standing allowance
  exactly, proving the shell’s loading gate + error banner add
  nothing at the settled state; the four pixel sweep classes + the
  fullpage axis stayed CLEAN) — the dashboard’s standing allowances
  re-derived per the R-7.5 doctrine (254/270/259/254, the decode
  documented in the census tool).

### R-14 — The parity-completion round (session 217) — Status: Done(v2.14.0)

The session-217 fresh-eyes audit (three parallel Mode-C passes: the
R-13 cure surfaces, the API/auth/security layer, the UI/a11y/shell
layer — 0 Critical / 3 High / 6 Medium / 17 Low / 10 Informational,
every material claim re-verified at file:line by the driving session
— the two live-repro classes: the Expenses popover Select kill and
the dark-mode invisible surfaces; the reference probed live for the
dark genus: its dialog panel measures #0a0a0a with #262626 borders
and #fafafa labels, its sitemap lists the Capital locs). The round's
theme: **the surfaces the gates structurally cannot see** —
closed-state surfaces (dialogs, menus, listboxes) in the theme half
the a11y gate never runs, portal overlays outside every DOM-scoped
guard, and auth states that expire between test runs. F-217m (the
in-band delivery default posture) is RECORDED as the owner-decision
item — the same standing status as R-5.

- **R-14.1 The pins (TDD, born RED)** —
  `tests/expenses-popover.test.ts`: the outside-close guard's portal
  exclusion (the closest() list covers `[role="option"]` /
  `[role="listbox"]` / `[data-radix-popper-content-wrapper]`) + the
  trigger-scoped `button[aria-expanded]` guard + the e2e MOUSE-PICK
  leg (pick a category by click → popover stays open, the filter
  applies — the path the Escape-only pin missed).
  `tests/ai-body-cap.test.ts` (the import-body-cap pattern): the
  coach schema's worst-case legal payload (30 × 4000 escaped-quote
  chars ≈ 242KB) passes at the route's own cap and the default cap
  still rejects it.
  `tests/dark-tokens.test.ts`: the `.dark` block flips the 7
  app-native tokens (`--color-surface/foreground/ink/muted-ink/line/
  line-soft/line-strong`) to the reference-measured dark family;
  the toast/button tails ride the flips (toast `bg-surface`,
  button secondary `bg-surface`, the ghost/outline
  `dark:hover:text-neutral-50` arms); `tests/palette-pins.test.ts`
  extends in-commit (the complete-enumeration guard).
  `tests/auth-contract.test.ts` extension: login blocks on
  hash-present (expired or not — the null-hash pre-flow/verified
  pass-through intact); resend re-arms for hash-present accounts
  (the expired account's recovery path).
  `tests/mobile-navigation-focus.test.ts` (source pin) + the e2e
  legs: opening the drawer moves focus inside it; Tab cycles
  {header trigger ↔ drawer links} and never lands in the page
  content behind the overlay.
  `tests/metadata.test.ts` extension: the sitemap's locs are the
  Capital twins (the reference's own casing, the metadata-rich
  form).
  `tests/http-headers.test.ts` extension:
  `Content-Security-Policy: frame-ancestors 'self'` on the global
  header set + the envelope's `Cache-Control: no-store`.
  `tests/owner-scoping.test.ts` extension: `/api/search` joins the
  exact-form pin family; `SearchResults` (types/index.ts) deleted
  (the F-216j doctrine — zero importers).
  `tests/schemas-finance.test.ts` extension: `dateField` accepts
  ONLY the two sanctioned forms (`yyyy-mm-dd`,
  `yyyy-mm-ddTHH:mm:ss(.sss)?Z`); offset/zoneless forms reject.
  `tests/loading-states.test.ts` extension: `hydrate` clears
  `error` at entry and on the 401 branch.
  `tests/parity-217.test.ts`: the store's mutation actions capture
  `sessionWriteToken` at ENTRY (the write-guard contract
  restated as a source pin).
  `tests/e2e/a11y.spec.ts`: the DARK leg (per-section, the
  theme written before goto — the F-217n gap).
- **R-14.2 The cures** —
  (a) the Expenses popover guard: the portal exclusion list + the
  trigger-scoped expanded-button check (F-217a);
  (b) `MAX_AI_BODY_BYTES = 256KB` on the coach route (F-217b);
  (c) the `.dark` token completion (the 7 flips, values from the
  reference-measured family: surface #0a0a0a, foreground #fafafa,
  ink #f5f5f4 [the existing `.dark .input-base` precedent],
  muted-ink #a8a29e, line #262626, line-soft #262626,
  line-strong #404040) + the toast/button tails (F-217c) — the
  page surfaces are untouched (their card genera carry explicit
  `dark:` arms; the flips touch only the dialog/select/dropdown/
  button/toast seams);
  (d) the login hash-gate + the resend re-arm (F-217d);
  (e) the drawer focus move + Tab cycle + focus return (F-217e);
  (f) the sitemap's Capital locs + the docblock's s14 correction
  (F-217f);
  (g) `Cache-Control: no-store` on the `ok()/fail()` envelope
  (F-217g);
  (h) `Content-Security-Policy: frame-ancestors 'self'` in
  next.config headers (F-217h);
  (i) the `SearchResults` retirement + the search route's
  owner-scoping pin (F-217i);
  (j) `dateField`'s sanctioned-forms regex (F-217j);
  (k) `hydrate`'s error hygiene (F-217k);
  (l) the entry-time token capture across the mutation actions
  (F-217l).
- **R-14.3 The verification** — the full gate cold + the six drift
  gates (the four sweep classes' standing baselines RE-DERIVED for
  the pages whose outline buttons flip dark — the divergence to the
  reference DECREASES, so the cure tightens the tables; the
  fullpage axis likewise; the interior census untouched — DOM
  counts unchanged) + census MATCH + the capture set (the dark
  dialog/menu faces before → after, the popover mouse-pick, the
  drawer focus) + the docs lockstep (README/PAD/AGENTS/SKILL
  counts + the dark-family documentation).

  **Shipped (the execution record):** R-14.1's pins born RED 34
  (ai-body-cap 6 · expenses-popover 4 · dark-tokens 11 ·
  mobile-navigation-focus 4 · parity-217 5 · the six extension
  families) + the e2e legs (+7: the popover mouse-pick +
  outside-close, the three drawer-focus legs, the two dark a11y
  legs); R-14.2's cures landed as programmed PLUS the dark leg's
  maiden-run catch — the destructive `text-red-600` buttons
  computed 3.3:1 on the dark cards (five pages, cured with
  `dark:text-red-400 dark:hover:text-red-300` arms) and the axe
  selector-fragility decode (the amber-primary register matcher
  gained the `button[type="submit"]` needle — the same genus, a
  context-dependent selector form); the sweep tables + fullpage
  tables re-derived in-commit (every page's diff moved DOWN — the
  dark convergence; phone dashboard 16.5 → 14.47) with the
  sweep-tool/fullpage-tool literal pins updated in the same commit;
  the store cure's updateSettings exception (it set()s directly,
  no refreshAll — the capture would have been an unused variable).
  R-14.3's verification: lint 0/0 · tsc 0 · **767 unit / 60 files**
  · build · smoke 14/14 · **e2e 95/95 / 7 specs** · **all six drift
  gates CLEAN** (the re-derived tables) · census MATCH.

### R-15 — The recovery-loop and perceivability round (session 218) — Status: Done(v2.15.0)

The session-218 fresh-eyes audit (three parallel Mode-C passes over the
R-14 cure surfaces, the API/auth/security layer, and the UI/a11y/shell
layer — 0 Critical / 3 High / 12 Medium / 13 Low / 7 Informational;
every material claim re-verified at file:line by the driving session;
the two live-repro classes: the filters-trigger regression and the
export header). The round's theme: **the paths the gates structurally
cannot drive** — recovery loops that only a user mid-journey hits (the
expired-code lockout, the toggle that cannot toggle) and perceivability
surfaces the settled-page gates never render (toasts at push time,
focus indicators, sub-AA reds that only real data summons). Two prior
ledger rows promote/execute here: F-217s (the tabs cure) and F-217u
(the proxy-hops posture).

- **R-15.1 The pins (TDD, born RED)** —
  `tests/login-recovery.test.ts` (new): the signin 403 arm keys on
  `error.code === "VERIFICATION_REQUIRED"` and swaps to the verify
  view (the source pin: the transition exists on the signin failure
  arm, not only the signup success arm).
  `tests/expenses-popover.test.ts` extension: the trigger-scoped guard
  EXISTS (the positive form — a `filtersTriggerRef` contains-guard or
  the equivalent), not merely the absent bare selector.
  `tests/http-headers.test.ts` extension: the export route's response
  carries `Cache-Control: no-store`.
  `tests/finance.test.ts` extension (the F-218d family, TZ-switching):
  under `process.env.TZ = "America/New_York"`, `sameMonth(toDate("2026-11-01T00:00:00.000Z"), new Date(2026, 10, 15))`
  is TRUE, `formatDateByPattern(toDate(...), "MM/dd/yyyy")` renders
  "11/01/2026", the edit-prefill sites route through `toDate`, and
  non-midnight ISO instants keep their time.
  `tests/parity-218.test.ts` (new): updateSettings captures the token
  at entry and guards the set; the upload route bounds the stream
  before `formData()`; import/coach/reset carry their rate buckets;
  the logout route gates on the JSON content-type; forgot/reset
  answer `ERR.INTERNAL()` on the fallthrough (no bare `throw error`);
  signup's P2002 arm answers the duplicate 400; MAX_AI_BODY_BYTES ≥
  the documented control-char worst case; boot-env warns when
  NEO_PROXY_HOPS rides the default; the six label htmlFor/id pairs;
  the checkbox's accent- form.
  `tests/toast-anatomy.test.ts` update (in-commit): the viewport
  carries `aria-live="polite"` and the per-card role retires.
  `tests/dark-tokens.test.ts` extension: `--color-ring` flips in
  `.dark` (+ the muted/subtle flips, F-218l).
  `tests/a11y-register` family — the red-500 sites pin to their
  red-600 light arms; the investment badge colors pin to their
  dark-step text constants; HealthGauge pins `role="img"`; the
  sidebar avatar pins the `avatarTextColor` seam.
  `tests/auth-contract.test.ts` extension: ERR.UNAUTHORIZED's message
  keeps its "Sign in" discriminator (F-218v).
  e2e legs: the signin→verify→resend recovery journey (a fresh
  signup, an expired code — the TTL shortened via the verification
  seam, then the 403 lands the verify view and the Resend re-arms);
  the filters-trigger toggle leg (click Filters → open; click Filters
  again → CLOSED — the regression's own face).
- **R-15.2 The cures** —
  (a) the signin VERIFICATION_REQUIRED transition (F-218a);
  (b) the trigger-scoped popover guard via a `filtersTriggerRef` (F-218b);
  (c) `Cache-Control: no-store` on the export response (F-218c);
  (d) `toDate` re-anchors UTC-midnight ISO strings to local midnight
  of the same calendar date (the regex form
  `^\d{4}-\d{2}-\d{2}T00:00:00(?:\.000)?Z$`); the three prefill
  sites route through `toDate` (F-218d);
  (e) updateSettings' entry-time token capture + guarded set (F-218e);
  (f) the upload route's counting TransformStream bound before
  `formData()` — overflow answers the too-large 400 (F-218f);
  (g) the rate buckets: import 5/15min, coach 30/15min, reset 3/15min
  (F-218g);
  (h) the toast viewport becomes the polite live region; the per-card
  role retires (F-218h);
  (i) `--color-ring` flips in `.dark` (#f5f5f4); the light-surface
  amber-400/slate-400 focus rings adopt `ring-ring`; the dark-surface
  amber-400/60 arms keep; the three ring-1 sites become ring-2
  (SC 2.4.11) (F-218i);
  (j) the red-500 small-text sites take `text-red-600` light arms
  (F-218j);
  (k) the investment badges take dark-step text constants over the
  10% tints (F-218k);
  (l) the `--color-muted`/`--color-subtle` dark flips (F-218l);
  (m) HealthGauge `role="img"` (F-218m);
  (n) the sidebar avatar reuses `avatarTextColor` (F-218n);
  (o) the Expenses per-tab panels (F-218o);
  (p) the logout JSON content-type gate (F-218p);
  (q) the forgot/reset fallthrough → `ERR.INTERNAL()` (F-218q);
  (r) signup's P2002 → the duplicate 400 (F-218r);
  (s) MAX_AI_BODY_BYTES → 1MB + the corrected budget comment (F-218s);
  (t) the boot-env default-ride warning + the DEPLOYMENT.md row + the
  .env.example comment (F-218t);
  (u) the six htmlFor/id label pairs + the checkbox's accent-amber-600
  (F-218u);
  (v) the ERR.UNAUTHORIZED message-stability pin (F-218v).
- **R-15.3 The verification** — the full gate cold + the six drift
  gates (the focus-ring and toast cures are settled-state-invisible —
  the sweeps capture no focus and no push-time toasts; the toDate cure
  is a numeric no-op under the UTC sandbox — the TZ-switching pins
  carry the proof) + census MATCH + the capture set (the recovery
  journey's faces, the toggle's closed state, the export headers via
  curl) + the docs lockstep (README/PAD/AGENTS/CLAUDE/SKILL/worklog
  counts + the round's contracts).

  **Shipped (the execution record):** R-15.1's pins born RED 38
  (login-recovery 3 RED of 4 · expenses-popover 2 · http-headers 1 ·
  finance TZ 3 · dark-tokens 2 · toast-anatomy 2 · parity-218 25) +
  the e2e legs (+2: the signin→verify→resend recovery journey — the
  battery's 10th and FINAL signup-IP POST, the budget noted in the
  spec; the filters-trigger toggle); the in-commit pin updates
  (toast-anatomy's role retirement, ai-body-cap's 1MB ceiling,
  boot-env's explicit-posture fixtures + the warning's own four pins,
  docs-counts 817/97/62); the two pin-literal refinements (the AI cap
  pin matches the multiplication form; the tabs pin matches the map
  form) + the maiden-e2e decode (the quadruplicated hidden panels —
  only the ACTIVE panel carries the content now, the hidden shells
  stay empty so text selectors stay unique). R-15.2's cures landed as
  programmed. R-15.3's verification: lint 0/0 · tsc 0 · **817 unit /
  62 files** · build · smoke 14/14 · **e2e 97/97 / 7 specs** · **all
  six drift gates CLEAN** (the four sweep classes, the fullpage, the
  interior census at margin 0 — the red-600/badge color moves stayed
  within the standing baselines; no re-derivation needed) · census
  MATCH.

### R-17 — The date-seam completion and dark-surface round (session 220) — Status: Done(v2.17.0)

The session-220 fresh-eyes audit (three parallel Mode-C passes over the
R-16 cure surfaces, the API/auth/security layer, and the UI/a11y/shell
layer — 0 Critical / 1 High / 5 Medium / 10 Low / 12 Informational raw,
adjudicated to the F-220 ledger after the driving session re-verified
every material claim at file:line; the headline live-reproduced under
`TZ=America/New_York`); the reference-stability drift probe STABLE on
all four standing layers before the audit (no parity event — the R-16
baselines stand). The round's theme: **the seams the previous round's
own cures left incomplete** — the date-seam's bare-form hole, the
dark-surface family the F-219i sweep's negative-only pin could not see,
and the writes-bucket family the F-219m comment claimed but the code
never landed.

Adjudications recorded before execution:
- F-220a's fix shape: extend the seam's pattern to the bare form
  (`yyyy-mm-dd` with the `T…Z` suffix OPTIONAL) — safe because every
  caller passes stored ISO (the T-form), true timestamps (never match),
  or Dates (pass through); the bare form is a calendar date under the
  F-218d doctrine. The seed/tests construct local Dates — unaffected.
- F-220c's family membership: settings PUT + users PATCH JOIN the
  writes family (session-guarded writes on the same SQLite file; the
  F-219m threat model names them).
- F-220d's coordination: the flip lands WITH the settings thumb's
  `bg-background` → `bg-white` move and the dead base-layer rule's
  deletion (one commit, no intermediate state); the shell's local
  `dark:bg-[#0e1310]` patch stays (same value — no visual change, the
  belt-and-suspenders the sweeps re-verify).
- F-220p's deviations are DOCUMENTED, not cured: the chart strokes are
  the reference's live palette (parity-mandated — the register gains
  the citation); the recharts tooltip styling and `h-dvh` are recorded
  deferred-debt (reference construction unprobed this session).

- **R-17.1 The pins (TDD, born RED)**
  - `tests/finance.test.ts` extension: the BEHAVIORAL bare-form pin —
    `toDate("2026-11-01")` under `TZ=America/New_York` reads local
    Nov 1 (month index 10), `startOfMonth` keys November, and the
    trailing `cashFlowSeries` bucket includes a Nov-1 row (the exact
    live repro, red before the cure); plus the stored/timestamp/Date
    forms keep their existing semantics.
  - `tests/parity-220.test.ts` (new): every `[id]` PUT/DELETE +
    budgets DELETE + settings PUT + users PATCH carries the `writes:`
    bucket; the ~14 dark-arm sites carry `dark:text-stone-400` (or
    `-300` for the badges); `--color-background` flips in `.dark` +
    the base-layer `.dark body` rule is GONE + the settings thumb
    rides `bg-white`; the error pages carry `focus-visible:ring-ring`;
    the toast dismiss rides `text-muted`; the bootstrap's
    invalid-value branch matches the seam's (non-light/dark/system →
    the route default, not light); the OS-flip listener gates on the
    EXACT `localStorage.getItem(...) === "system"` read; `accountId`
    null survives the parse (the F-219q contract); `call()` returns
    the code and hydrate branches on `UNAUTHORIZED` (not substrings);
    forgot-password's read path 503s P2024/P2028 (source pin);
    `refreshAll` carries the sequence guard; the import page stages
    through the csv seam + previews through `toDate` + surfaces the
    skipped-row count; the theme seam's dead exports are gone; the
    a11y register's stale arms are retired.
  - `tests/csv.test.ts` extension: the staging seam —
    `stageCsvDate("2026-11-01")` → the UTC-midnight ISO; a
    local-format date ("05/03/2026", MDY assumption documented) →
    UTC midnight of the PARSED LOCAL calendar date (the Tokyo
    west-shift case); unparseable → null.
- **R-17.2 The cures**
  - A. The date seam (F-220a): `UTC_MIDNIGHT_ISO` gains the optional
    `T…Z` suffix — the bare date-input form re-anchors to local
    midnight of the same calendar date (analytics' five series read
    the month the user sees).
  - B. The import staging (F-220m): a pure `stageCsvDate` seam in
    `src/lib/csv.ts` (parsed local calendar date → UTC-midnight ISO;
    null for unparseable); the page stages through it, previews
    through `toDate`, and surfaces "N skipped" in the review subtitle.
  - C. The dark-surface family (F-220b/d/e/f): the missing dark arms
    (`dark:text-stone-400` captions / `-300` badges); the
    `--color-background` `.dark` flip + dead-rule deletion + the
    settings thumb `bg-white`; the error pages'
    `focus-visible:ring-ring`; the toast dismiss `text-muted`.
  - D. The writes bucket (F-220c): `rateLimit(\`writes:${clientKey}\`,
    60, 15*60*1000)` on the five `[id]` PUT/DELETE pairs, budgets
    DELETE, settings PUT, users PATCH.
  - E. The theme seam (F-220g/h/n): the bootstrap's invalid-value
    branch collapses to the seam's semantics; the OS-flip listener
    gates on the exact storage read; the stale mechanism comment
    reworded + the dead exports deleted (+ `formatDateByPattern`).
  - F. The API/store tail (F-220i/j/k/l): `accountId` null survives
    (the notes form); `call()` carries `code` and hydrate branches on
    `UNAUTHORIZED`; forgot-password's read 503s the transient-abort
    family; `refreshAll` discards stale sequences.
  - G. The verification tail (F-220o/p): the dark a11y legs extended
    to all 9 sections; the register's stale arms retired + the chart-
    stroke deviation documented in-register.
- **R-17.3 The verification**: lint 0/0 · tsc 0 · **924/924 unit**
  (65 files; +55) · build · smoke 14/14 · **e2e 107/107** (7 specs;
  +8 — the nine-section dark legs replaced the two hardcoded) ·
  **ALL SIX parity drift gates CLEAN** (the four sweep classes
  1440/390/768/1024 + the fullpage sweep + the interior census — the
  dark-arm additions and the background flip stayed within every
  standing baseline/allowance; no re-derivation needed) · census MATCH
  · `bun audit` unchanged (1 moderate minimatch, dev-chain,
  range-unreachable) · the captures 88-92 (five faces, each asserted
  in-DOM before commit: the stone-400 captions, the #0e1310 body via
  the token + the white thumb + the light face unharmed, the Nov-1
  import preview + the surfaced skip, the 390 drawer with 9
  scrollable destinations, the 61st [id] PUT 429 with Retry-After).

### R-18 — The date-staging correctness and perceivable-controls round (session 221) — Status: Done(v2.18.0)

The session-221 fresh-eyes audit (three parallel Mode-C passes over the
R-17 cure surfaces, the API/auth/security layer, and the UI/a11y/shell
layer — 0 Critical / 2 High / 4 Medium / ~12 Low / ~10 Informational
raw, adjudicated to the F-221 ledger after the driving session
re-verified every material claim at file:line; the headline
live-reproduced under TZ-switching probes: the R-17 `stageCsvDate`
seam stages the bare `yyyy-mm-dd` form one day early west of UTC and
the Z-suffixed form one day late east of UTC — the exact F-218d/F-220a
class reintroduced at the seam the round shipped to cure it; the
SelectItem dark wash measured live at 1.18:1; the Export-button and
a11y-gate findings live + axe-verified). The reference-stability
probe ran first: STABLE on all four standing layers — no parity
event, the R-16/R-17 baselines stand. The cold baseline was verified
green at the documented v2.17.0 state before any edit (lint 0/0 ·
tsc 0 · 924/924 unit · build · smoke 14/14 · 107/107 e2e · census
MATCH · audit unchanged).

Design decisions (settled before the cures, validated against the tree):

- F-221a/c's fix shape: a FORM-BRANCH inside `stageCsvDate` — the
  bare `^\d{4}-\d{2}-\d{2}$` form takes `Date.UTC` of the literal
  groups (the identity with the `dateField` contract); ISO forms
  carrying the UTC designator (`T…Z` / `…+00:00`) take the UTC
  accessors; every other parseable form (the locale formats — MDY
  with the documented US assumption) keeps the LOCAL accessors.
  The behavioral pins flip `process.env.TZ` per-assertion (the
  `tests/finance.test.ts` F-220a doctrine applied to the seam the
  doctrine missed).
- F-221b's fix shape: `dark:focus:bg-stone-800 dark:focus:text-stone-100`
  on the SelectItem — the `MENU_ITEM` precedent (stone-100 on
  stone-800 = 13.9:1), zero call-site changes (no `<SelectItem
  className>` overrides exist).
- F-221d's fix shape: the seven page transforms send the RAW string
  (empty string included) — the schemas' `"" → null` normalization
  already implements the clear semantics at the boundary, so the
  forms stop collapsing (`notes: notes` not `notes: notes || undefined`);
  the conditional arms (`if (recurring)…`, `if (nextPaymentDate)…`)
  become unconditional sends. Both create and edit paths ride the
  same schemas (verified), so one form serves both.
- F-221f's fix shape: a `scrollThrough(page)` helper (the app's
  `main` scroller stepped to the bottom in 600px increments with a
  settle between steps, then back to top) applied before every
  `axe.run()` in BOTH the light and dark loops. The gate may surface
  new below-the-fold findings on its maiden scrolled run — each gets
  cured or register-cited in-commit (that is the point of the gate
  cure).
- F-221n's fix shape: the unchecked track darkens one step
  (`bg-stone-400`) AND gains a `border-stone-500` boundary — computed
  ≥3:1 for the track-vs-card boundary while keeping the visual genus
  (the checked state is untouched).
- F-221r's fix shape: `auth/logout` POST JOINS the `writes:` family
  (uniformity closes the class; the cookie-clear is cheap) — the
  route's docblock documents the membership.
- F-221s's fix shape: the export payload gains `data.settings` (the
  owner-scoped `readSettings` shape) + `user.photoUrl`/`createdAt`.
- The informational tail's cheap arms cured in-commit: `ERR.FORBIDDEN`
  deleted (the dead-code doctrine), `budgetDeleteSchema` folded into
  budgets' static import, the boot warning names the `x-real-ip`
  fallback, the import skip-counter extends to the amount/description
  classes, the unused `underline` tab variant retired. Recorded NOT
  cured: the health-probe throttle posture (documented in the route
  docblock), the forgot-password write-path oracle (declared threat
  model), the hydrate seq non-participation (benign), the investments
  duplicate-symbol edge, the whole-store subscription (sanctioned).

- **R-18.1 The pins (TDD, born RED)**
  - `tests/csv.test.ts` extension: the BEHAVIORAL TZ-switching pins —
    `stageCsvDate("2026-11-01")` under `TZ=America/New_York` returns
    `2026-11-01T00:00:00.000Z` (the exact live repro); under
    `TZ=Asia/Tokyo` the Z-suffixed forms keep their UTC calendar day
    (`2026-11-01T18:30:00Z` → Nov 1; the year boundary
    `2026-12-31T23:30:00Z` → Dec 31); the MDY control keeps the local
    accessors under both zones. RED before the cure (verified
    against the live repro).
  - `tests/parity-221.test.ts` (new): the SelectItem dark arms; the
    Export button's `text-white`; the seven null-clear sites send the
    raw field (no `|| undefined` collapse, no conditional guard); the
    a11y spec scrolls before `axe.run()` in both loops; the
    reset-password read-path 503 arm; the `shares` update cap; the
    ExpenseDialog `htmlFor`/`id` associations; the goals Paused
    light arm; the DIALOG_CLOSE ink; the toast icon steps; the
    switch track boundary; the reset-submit pending affordance; the
    OS-flip auth-face gate; the logout bucket; the export settings
    completeness; the hygiene tail (no `ERR.FORBIDDEN`, the static
    budgets import, the boot-warning `x-real-ip` naming, the import
    skip-count classes, the retired underline variant).
  - `tests/schemas-finance.test.ts` extension: the `shares` update
    `.max` behavioral pin (both arms — create and update reject
    >1e9).
  - `tests/auth-reset.test.ts` extension: the reset-password
    read-path 503 for P2024/P2028 (the F-220k mirror pin).
  - `tests/e2e/multi-user.spec.ts` extension: the cross-user `[id]`
    behavioral legs — B's PUT and DELETE against a demo-owned
    transaction id answer 404 with the demo row intact.
  - `tests/e2e/a11y.spec.ts` extension: the `scrollThrough` helper +
    its application in both loops (the F-221f gate cure).
  - `tests/e2e/wealthos.spec.ts` extension: the dark-mode Select
    highlight leg (open the Income type combobox in dark, ArrowDown,
    assert the highlighted option's computed text ≠ 1.18:1 genus —
    the F-221b behavioral face).

- **R-18.2 The cures**
  - A. The date-staging form-branch (F-221a/c) in `src/lib/csv.ts`.
  - B. The SelectItem dark arms (F-221b) in `src/components/ui/select.tsx`.
  - C. The null-clear rider (F-221d): the seven page transforms.
  - D. The Export button ink (F-221e) + the a11y gate scroll (F-221f).
  - E. The low tail: the reset-password read 503s (F-221g); the
    `shares` cap (F-221h); the multi-user `[id]` legs (F-221i); the
    ExpenseDialog labels (F-221j); the goals badge light arm
    (F-221k); the DIALOG_CLOSE ink (F-221l); the toast icon steps
    (F-221m); the switch track boundary (F-221n); the reset-submit
    pending (F-221o); the OS-flip auth-face gate (F-221p); the
    card-level busy-disable (F-221q); the logout bucket (F-221r);
    the export completeness (F-221s); the informational cheap arms
    (F-221t).
  - F. The docs lockstep: the plan's v2.18.0 record; the worklog
    entry; the README/AGENTS/CLAUDE/PAD/SKILL count + behavior rows;
    `tests/docs-counts.test.ts` constants in the same commit.

- **R-18.3 The verification**: the full offline gate (lint → tsc →
  unit → build → smoke → e2e) + the census + the `bun audit`
  re-triage + the six parity drift gates (perceivable surfaces
  changed: the SelectItem wash, the Export ink, the badge/close/toast/
  switch inks ride inside the standing allowances — if any leg moves
  beyond them, re-derive per the R-4 doctrine and document).

### R-19 — The zone-designator completion and focus-affordance round (session 222) — Status: Done(v2.19.0)

The session-222 fresh-eyes audit (three parallel Mode-C passes over the
R-18 cure surfaces, the API/auth/security layer, and the UI/a11y/shell
layer — 0 Critical / 5 Medium / 8 Low / ~12 Informational raw,
adjudicated to the F-222 ledger after the driving session re-verified
every material claim at file:line; the date-seam headline
live-reproduced under TZ-switching probes on both zone edges and at
the year boundary; the reference-stability probe ran first: STABLE on
all four standing layers — no parity event; the cold baseline verified
green at the documented v2.18.0 state before any edit: lint 0/0 ·
tsc 0 · 961/961 unit · build · smoke 14/14 · 108/108 e2e · census
MATCH · audit unchanged).

Design decisions (settled before the cures, validated against the tree):

- F-222a/b's fix shape: the designated branch WIDENS to every
  zone-designated ISO datetime — `[Zz]` (case-insensitive) or
  `[+-]HH:MM` / `[+-]HHMM` — and stages the WRITTEN DATE LITERAL (the
  `yyyy-mm-dd` groups before the `T`). The written date IS the
  calendar date in the designator's own zone (the offset's own
  wall-clock), so no offset arithmetic is needed and no viewer zone
  can shift it — the F-218d doctrine's natural completion. For the
  Z-forms this is observationally identical to the R-18 UTC-accessor
  cure (the written date IS the UTC date), so the standing Z pins
  keep passing; for the non-UTC offsets it changes the staged day to
  the source-zone date (the cure). The calendar round-trip guard
  extends to the designated branch (`2026-02-30T00:00:00Z` → null).
- F-222c: partial ISO forms (`2026`, `2026-11`) return null — a skip
  in the preview — never an invented day (V8 parses them as UTC day 1;
  the honest answer for a form carrying no day).
- F-222d: the locale branch gains the numeric-form rollover guard —
  a 3-group numeric locale form must round-trip under the MDY (the
  documented US assumption), DMY, or YMD-shape interpretation with
  V8's two-digit-year remap, else null (`02/30/2026` → null; `11/01/2026`
  and `2026/11/01` keep staging).
- F-222f: the 404/error faces gain dark arms (NOT force-light) — the
  reference's SPA serves its 404 inside the authenticated shell (dark
  for fresh visitors; the live decode), so dark arms are the
  parity-correct genus and light mode is untouched.
- F-222g: the house ring (`focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-ring` + the offset arm on
  card-surface buttons; `ring-amber-400` on the auth face, matching
  its own submit genus) lands on the shared constants —
  `LOGIN_LAYOUT.google/footerLink`, the login/reset/verify `back` and
  `resendButton` constants, PeriodSegment, the toast ✕, the app-shell
  Try-again, and the Expenses chips — so the fix is a constants edit,
  not a per-page hunt.
- F-222n: email-keyed SECONDARY buckets on login (`login-acct:`,
  30/15min) and forgot-password (`forgot-acct:`, 20/15min), checked
  AFTER the IP bucket and the Zod parse but BEFORE any
  account-existence lookup (no enumeration oracle — the 429 is
  identical for known and unknown emails). The caps sit ABOVE the
  per-IP caps (10/15) so every single-IP flow — the smoke ladder's
  10-logins-then-429, the e2e battery, the capture toolchain — trips
  the IP bucket first: zero behavior change for every legitimate
  flow, a hard bound (30 attempts/15min ≈ 2,880/day) for the
  distributed credential attack the default posture currently
  permits.
- F-222o: a `isRecordNotFound(error)` seam in `src/lib/db.ts`
  (P2025) consumed by every `[id]` mutation catch — the race answer
  is NOT_FOUND, never INTERNAL. The ownership `findFirst` stays (the
  primary guard); this is the defense-in-depth mirror of the
  reset-password route's conditional form.

The cure list (each with its pins, all born RED):

1. `src/lib/csv.ts` — the ZONE_DESIGNATED branch (F-222a/b), the
   PARTIAL_ISO rejection (F-222c), the designated-branch round-trip
   guard + the locale numeric rollover guard (F-222d), the docblock
   updated to the completed contract.
2. `src/app/(app)/import/page.tsx` — the income ink's
   `dark:text-emerald-400` (F-222e) + the skip copy
   (F-222m: "unparseable date, amount, or missing description").
3. `src/lib/page-layout.ts` + `src/app/error.tsx` — the 404/error
   dark arms (F-222f); the homeButton's focus ring modernized to the
   house form.
4. The focus-ring family (F-222g): `page-parts.tsx` (PeriodSegment),
   `toast.tsx` (✕), `app-shell.tsx` (Try-again), `page-layout.ts`
   (`LOGIN_LAYOUT.google/footerLink`), `login-reset.ts` (back ×2,
   resendButton), `expenses/page.tsx` (the four chip sites).
5. `src/lib/page-layout.ts` — `DIALOG_CLOSE` dark arms (F-222h:
   `dark:text-stone-400 dark:hover:text-stone-300`).
6. The chart tooltip isDark completion (F-222i): dashboard,
   investments, analytics — `contentStyle`/`labelStyle`/`itemStyle`
   driven off the page's existing `isDark` like `axisColor`.
7. `accounts/page.tsx` — the F-218j red pair (F-222j);
   `tabs.tsx` — the latent dark arms (F-222k); `badge.tsx` — the
   secondary variant's dark arm (folded, latent).
8. `expenses/page.tsx` — the row-delete busy-disable;
   `settings/page.tsx` — the budget-delete busy-disable + the result
   surfaced (F-222l).
9. `src/app/api/auth/login/route.ts` +
   `forgot-password/route.ts` — the per-account secondary buckets
   (F-222n); the family-GET posture documented beside the dashboard
   route's own (F-222p's recorded arm).
10. `src/lib/db.ts` + the five `[id]` route families — the P2025 →
    NOT_FOUND seam (F-222o).
11. `tests/e2e/a11y.spec.ts` — the scrollThrough helper extended to
    the anon-face legs (the F-221f completion, folded as cheap).

**R-19.1 The pins (TDD, born RED)**

- `tests/csv.test.ts` extension: the behavioral TZ-switching pins —
  lowercase-z under both zones + the year boundary; the non-UTC
  offsets under both zones + the year boundary (staging the WRITTEN
  date); the partial-ISO nulls; the locale rollover null; the
  designated rollover null; the YMD-slash and MDY controls; the
  dotted-form ambiguity documented.
- `tests/parity-222.test.ts` (new): the source pins — the csv seam's
  designator family; the import ink + skip copy; the 404/error dark
  arms; the focus-ring constants (the POSITIVE form — the ring EXISTS
  on each named site, the F-218b lesson); DIALOG_CLOSE's dark arms;
  the tooltip isDark wiring on all three pages; the accounts red
  pair; the tabs/badge latent arms; the busy-disable sites + the
  budget-delete result; the per-account bucket call sites + caps +
  the no-oracle ordering (bucket before the lookup); the P2025 seam
  + every `[id]` catch consuming it.
- `tests/e2e/wealthos.spec.ts` + `a11y.spec.ts` extension: the
  per-account bucket's behavioral leg (31 rotating-XFF login attempts
  → the 31st is the per-account 429, the IP bucket never firing) and
  the dark-404 leg (fresh dark visitor → html.dark + the dark wash on
  the 404 card + axe-clean).

**R-19.2 The verification bar**

The full gate (lint → typecheck → unit → build → smoke → e2e) + the
census + the `bun audit` re-triage + the six parity drift gates
(perceivable surfaces changed: the import ink, the 404/error dark
arms, the DIALOG_CLOSE/toast/tabs inks ride inside the standing
allowances — if any leg moves beyond them, re-derive per the R-4
doctrine and document). The captures: the session-222 evidence set
under `docs/screenshots/`.

**R-19.3 Status: Done (v2.19.0)** — executed in session 222's commit
set: the cures and pins landed GREEN end-to-end (the verification bar
below); the five capture faces committed (98–102); §5 carries the
execution row.

### R-16 — The parity-default and perceivability round (session 219) — Status: Done(v2.16.0)

The session-219 fresh-eyes audit (three parallel Mode-C passes over the
R-15 cure surfaces, the API/auth/security layer, and the UI/a11y/shell
layer — 0 Critical / 3 High / 11 Medium / 16 Low / 17 Informational raw,
adjudicated to the F-219 ledger after the driving session re-verified
every material claim at file:line; three live-probe classes: the
per-page CTA genus measurement on the live reference, the default-theme
end-to-end decode incl. the server-side persistence proof and the
reference restore, the drawer-clip measurements on both apps) PLUS the
owner's explicit parity directive — the round's theme: **the default
postures and the genus faces the parity directive names** (the
fresh-visitor /Dashboard, the CTA family, the mobile menu) and the
perceivability tail the same audit surfaced.

Adjudications recorded before execution:
- F-217m (the in-app delivery default) and the NEO_PROXY_HOPS
  fail-closed escalation (the M-1 class) REMAIN the owner-decision
  items — the R-15 boot-warning posture stands; not reopened here.
- F-219a's cure direction is set by the reference's OWN genus (stone-900
  on amber — measured): parity and AA point the same way; the a11y
  register's stale arm retires with the cure.
- F-219b's emerald/rose gradients + white text ride the reference's own
  register (the F-208a KPI_TONES class) — the register gains the
  measured citations.
- F-219h's cure is the functional superset (the reference clips too).
- F-219t's cure (auth faces force light) is BOTH the reference's genus
  and the latent stranded-color close.
- The GradientKpiCard/StatCard text-on-gradient genus (the audit's M-6)
  stays the recorded F-208a/F-209b register — not reopened.

- **R-16.1 The pins (TDD, born RED)**
  - `tests/theme-default.test.ts` (new): the no-FOUC bootstrap's
    default resolves DARK on app routes and LIGHT on auth faces when no
    choice is stored; a stored choice wins everywhere (pure seam: a
    `defaultThemeForPath(pathname, stored)` helper in theme.tsx, probed
    by the pin); the AppShell mount applies the default when entering
    the shell without one.
  - `tests/parity-219.test.ts` (new): BUTTONS.primary carries
    `text-stone-900` (not text-white); `--color-primary-foreground` is
    `#1c1917`; the per-page CTA constants (the emerald/rose/amber
    genera) exist and carry the measured gradients; MOBILE_NAV_SHEET
    carries `overflow-y-auto`; the analytics refs route through
    `toDate`; the investments prefill routes through `toDate`; the
    goals card + income label route through `toDate`; EMPTY_STATE
    subtitle + APP_FOOTER carry the AA arms; the display-text cluster
    cures (amber-700/emerald-700/slate-500 h1); the drawer constant's
    scroll arm; the logout gate lowercases; moneyField rounds to 2dp;
    the rate bucket keys are disjoint; the CRUD family carries buckets.
  - `tests/rate-limit.test.ts` extension: the two reset-family keys are
    distinct strings.
  - `tests/schemas.test.ts` extension: 2dp normalization + null-clear
    semantics.
  - e2e legs (+2): the fresh-visitor /Dashboard renders DARK by default
    (html.dark + the dark body genus); the drawer scrolls internally at
    390×667 (Sign Out visible after scroll). In-commit: the a11y main
    legs set light explicitly; the moon-toggle test stores light first.
- **R-16.2 The cures**
  - A. The default-theme parity (F-219c + F-219t): the no-FOUC
    bootstrap — stored choice wins; otherwise DARK except the auth
    faces (login/signup/reset-password), which FORCE light (removing
    .dark even when stored dark — the reference's always-light auth
    genus); the AppShell mount applies the default on shell entry
    (closes the login→dashboard client-nav hole); theme.tsx gains the
    pure `defaultThemeForPath` seam.
  - B. The CTA genus (F-219a/b/s): `--color-primary-foreground`
    `#1c1917`; BUTTONS.primary `text-stone-900`; the per-page section
    CTAs adopt the measured genera (Income/Investments
    emerald→teal+white, Expenses rose→red+white — new CTA constants in
    page-layout.ts carrying the citations); the ai-coach user bubble
    stone-900; the Analytics Export → the outline genus; the a11y
    register's stale arm retires, the gradient arms gain citations.
  - C. The mobile drawer scroll (F-219h): `overflow-y-auto` on the
    sheet's inner column (the superset; parity untouched).
  - D. The date-seam completion (F-219d/e/f/g): the investments
    prefill, the analytics refs (a shared `refDate` through toDate),
    the goals card label, the income relative-day label.
  - E. The perceivability tail (F-219i/k/n): the page-layout constants
    (EMPTY_STATE subtitle, APP_FOOTER, KpiCard flat arm); the ~30
    `dark:text-stone-500` metadata sites → `dark:text-stone-400` (a
    scripted sweep); the Quick Actions h2, the HealthGauge band text,
    the import amounts, the error h1s; the ring leftovers (ring-2,
    ring-ring).
  - F. The AI coach announcements (F-219j): the messages container is
    the polite live region; the busy row carries sr-only text.
  - G. The rate buckets (F-219l/m): distinct keys (`pw-reset:` vs
    `data-reset:`); a shared sessioned-CRUD bucket (60 writes/15min)
    + light read buckets (dashboard/export 60/15min, search 30/15min).
  - H. The low tail: the logout case-insensitivity; moneyField 2dp
    transform; the nullable-clear semantics (distinguish absent vs
    explicit null); the four analytics empty-state gates; InfoCallout
    role="status"; the dead constants retired; the stale comments.
- **R-16.3 The verification + the evidence** — the full gate (lint →
  tsc → unit → build → smoke → e2e) from cold; the six drift gates with
  the sweep/fullpage/census tables RE-DERIVED in-commit (the CTA genus
  moves the captured pixels — the session-217 precedent); the capture
  set under docs/screenshots/ (the fresh-visitor dark /Dashboard vs the
  reference, the CTA genera per page, the drawer scroll at 390×667, the
  dark metadata family, the coach announcement); the docs lockstep
  (README/AGENTS/CLAUDE/PAD/SKILL/worklog + this plan's §5 row).

R-16.1's pins were born RED 39+ (theme-default 10 · parity-219 29 · the
rate-limit disjointness 1 · the schemas-finance null-clear contract
change 2) and went GREEN with the cures (39 + the in-commit pin-literal
refinements: the analytics toDate form, the APP_FOOTER block form, the
sweep/fullpage/census re-derivation literals, the auth-reset key, the
login-views status/alert split). R-16.2's cures landed as programmed
(with TWO design refinements decoded mid-execution: the reads bucket —
the per-navigation dashboard aggregate CANNOT carry a per-IP cap (the
maiden census run tripped mid-run; the toolchain's page loads
legitimately exceed any budget) — it stays unbucketed BY DESIGN with
the heavy EXPLICIT actions bucketed (writes 60/15, export 240/15,
search 60/15); and the auth faces force light through ALL THREE seams
(bootstrap + provider pathname effect + the stored-dark removal) —
closing the F-219t stranded-ink state the R-15 tree shipped). One
in-commit catch: the ai-coach's send button carried the amber+white
genus the F-219a sweep missed — cured with the round. R-16.3's
verification: lint 0/0 · tsc 0 · **869 unit / 64 files** (+52) ·
build · smoke 14/14 · **e2e 99/99 (7 specs; +2: the fresh-visitor
dark default, the drawer scroll at 390×667)** · **all six parity
drift gates CLEAN with the tables RE-DERIVED in-commit** (every
page's diff moved DOWN — the CTA convergence; the analytics
empty-state construction absorbed; the census allowances +3/+3/+3 on
income/accounts/goals (the CTA class stacks) and the analytics shifts
(the EmptyState gates), decode documented) · census MATCH · the
capture set 82-87 (eight files incl. the reference's own dark
/Dashboard beside ours — VLM-verified a near pixel match on the
fresh-visitor genus) · `bun audit` unchanged (1 moderate minimatch,
range-unreachable).

### R-20 — The dead-signout and dark-surface completion round (session 223) — Status: Done(v2.20.0)

The session-223 fresh-eyes audit (three parallel Mode-C passes over
the R-19 cure surfaces, the API/auth/security layer, and the
UI/a11y/shell layer — 0 Critical / 2 High / 6 Medium / 4 Low raw,
adjudicated to the F-223 ledger after the driving session re-verified
every material claim at file:line (the two csv claims live-reproduced
under TZ-switching probes on all three zones; the contrast claims
computed to two decimals; the dead-signout code path traced through
the store's state machine); the audit's two top security ratings
adjudicated as RE-DISCOVERIES of the standing F-217m owner-decision
record — not reopened; the reference-stability probe ran first:
STABLE on all four standing layers — no parity event; the cold
baseline verified green at the documented v2.19.0 state before any
edit: lint 0/0 · tsc 0 · 1005/1005 unit · build · smoke 14/14 ·
110/110 e2e · census MATCH · audit unchanged).

Design decisions (settled before the cures, validated against the
tree):

- F-223a's fix shape: the MenuItem wires to the EXISTING `signOut`
  helper (logout + push + refresh — the mobile drawer's own form);
  no new navigation machinery. The e2e leg mirrors the drawer's
  sign-out leg at 1280×800 (menu → Sign Out → waitForURL /login +
  the login heading).
- F-223b: the dark arm is DROPPED, not re-inked — stone-900 on the
  unflipped amber passes in both modes (8.14:1 / 8.14:1); the
  parity-222 pin flips to the NEGATIVE form (the arm's absence) so
  the class cannot re-enter.
- F-223c: the two missed donut Tooltips take the SIBLING form
  (`labelStyle={{ color: tooltipInk, fontWeight: 600 }}` +
  `itemStyle={{ color: tooltipInk }}` + `contentStyle={tooltipStyle}`);
  the pins become per-page SITE COUNTS (every `<Tooltip` occurrence
  carries `contentStyle={tooltipStyle}`) — the presence-only pins
  retire. The dashboard docblock's stale "swatch keeps the series
  color" claim (recharts 3.10 has no swatch element) is corrected
  in-commit.
- F-223d: `NUMERIC_LOCALE`'s `$` anchor becomes a `(?!\d)` lookahead
  — the date-prefix groups match with a trailing time tolerated, the
  guard fires on the rolled digits; valid time-suffixed forms keep
  staging (TZ-switching pins over both).
- F-223e: a MONTH_ONLY named-form rejection (`/^[A-Za-z]{3,9}\s+\d{4}$/`
  → null) joins PARTIAL_ISO — the named twins of the same "no day
  was chosen" doctrine.
- F-223f: `NAV_LAYOUT.syncedPill` carries the dark-surface pairing
  UNCONDITIONALLY (`text-green-400 border-green-600` — the sidebar
  gradient is near-black in both themes); `MOBILE_HEADER.syncedPill`
  keeps its light/dark arms (the topbar wash IS light in light mode).
  The shell-parity pin updates in-commit (the legitimate contract
  change: the desktop pill's surface).
- F-223g: `INVESTMENT_TYPES` gains a `textDark` 400-level step per
  type; the chip selects `isDark ? textDark : text` (the page's
  existing isDark).
- F-223h: the house ring on the four tail controls — the amber genus
  + offset on the auth faces (`sentBack`, the reset-password back),
  the neutral ring on the AI-coach chips/Send; the parity-222
  login-reset count pin recalibrates 4 → 5.
- F-223i: the income/expenses tile backgrounds become isDark
  ternaries (`${color}1a` in dark, the hex pastel in light — the
  light rendering is byte-identical, no sweep risk; the accounts
  alpha pattern is the dark genus). The icon inks stay (aria-hidden
  decorative).
- F-223k: logout resolves the session user (the same getSessionUser
  seam the app layout rides) and bumps `tokenVersion` before
  clearing the cookie — a guest logout (no session) stays a no-op
  200. "Sign out" means revoke.
- F-223l: the no-pending branch returns
  `verificationRemainingMessage(VERIFICATION_MAX_ATTEMPTS)` — the
  two 400 bodies become identical for unknown accounts, wrong
  codes, and expired codes alike.

The cure list (each with its pins, all born RED):

1. `src/components/layout/sidebar.tsx` — the MenuItem wires
   `signOut()` (F-223a) + the desktop sign-out e2e leg.
2. `src/app/error.tsx` — the `dark:text-stone-50` arm dropped
   (F-223b); `tests/parity-222.test.ts` recalibrated to the negative
   form.
3. `src/app/(app)/dashboard/page.tsx` + `src/app/(app)/investments/page.tsx`
   — the two donut Tooltips cured (F-223c) + the per-page site-count
   pins (parity-223) + the docblock correction.
4. `src/lib/csv.ts` — the `(?!\d)` anchor (F-223d) + the MONTH_ONLY
   rejection (F-223e) + the TZ-switching pins over each new form.
5. `src/lib/page-layout.ts` — `NAV_LAYOUT.syncedPill`'s
   unconditional dark-surface pairing (F-223f) + the shell-parity
   pin update.
6. `src/lib/constants.ts` + `src/app/(app)/investments/page.tsx` —
   the `textDark` steps + the isDark chip ink (F-223g).
7. The focus-ring tail (F-223h): `login-reset.ts` (sentBack),
   `ai-coach.tsx` (chips + Send), `reset-password-screen.tsx`
   (back) + the count recalibration.
8. `src/app/(app)/income/page.tsx` + `src/app/(app)/expenses/page.tsx`
   — the isDark tile ternaries (F-223i).
9. `src/app/(app)/import/page.tsx` — the light arm red-700
   (F-223j).
10. `src/app/api/auth/logout/route.ts` — the tokenVersion bump
    (F-223k).
11. `src/app/api/auth/verify/route.ts` — the unified no-pending
    message (F-223l).

Exit criteria: the full offline gate green (lint → typecheck → unit
with the new pins → build → smoke → e2e with the desktop sign-out
leg); the six parity drift gates CLEAN (the dark-surface cures
re-derived only if a class trips — the light rendering is unchanged
by construction); census MATCH before/after; the capture set for the
cured faces; docs lockstep (README counts + status, AGENTS counts,
CLAUDE, PAD revision block, SKILL counts, docs-counts constants).

Executed (session 223): the pins born RED 19 (parity-223's 17 + the
csv TZ-switching pair) + the recalibrations (parity-222's error.tsx
negative form + the login-reset count 4→5, shell-parity's
NAV_LAYOUT pill, login-reset's sentBack string, the mobile-header
arms protected) → the cures (all eleven ledger items) → the
verification: lint 0/0 · tsc 0 · **1029/1029 unit** (68 files, +24:
parity-223 +19 · csv +6 − the suite arithmetic) · build · smoke
14/14 · **111/111 e2e** (+1: the desktop sign-out leg, with the
F-223k re-mint rider on both sign-out legs) · **all six parity
drift gates CLEAN** (0-event margin — no baseline re-derivation
needed; the light rendering unchanged by construction) · census
MATCH before/after · `bun audit` unchanged (1 moderate minimatch,
dev-chain, range-unreachable) · the capture set 103-110 (eight
faces, each asserted in-DOM).


### R-21 — The date-guard completion and resilience-surface round (session 224) — Status: Done(v2.21.0)

The session-224 fresh-eyes audit (three parallel Mode-C passes over
the R-20 cure surfaces, the API/auth/security layer, and the
UI/a11y/shell layer — 0 Critical / 0 High / 2 Medium / 11 Low /
14 Informational raw, adjudicated to the F-224 ledger after the
driving session re-verified every material claim at file:line — the
YMD csv claim and the month-year family live-reproduced under
probes including the reversed twins this session discovered, the
verify-oracle arithmetic traced through the post-increment ladder,
the contrast claims computed from the pinned hexes; the cold
baseline verified green at the documented v2.20.0 state before any
edit: lint 0/0 · tsc 0 · 1029/1029 unit · build · smoke 14/14 ·
111/111 e2e · census MATCH · audit unchanged; the reference-stability
probe ran first: STABLE on all four standing layers — no parity
event; the neo-crm pattern check: aligned — same script/dependency/
gate families, the vendored web-application skill IS the distilled
neo-crm pattern set, nothing new to port).

Design decisions (settled before the cures, validated against the
tree):

- F-224a: `localeRollover` resolves the SHAPE first — the year
  group is `a` when `Number(a) >= 1000` (YMD), else `c` (MDY) — and
  the four-digit gate reads THAT group; the YMD round-trip
  comparison then actually fires for rolled YMD dates. The docblock
  is corrected to the delivered truth (and the ±HH overstatement,
  F-224m, in the same pass).
- F-224b: the no-pending branch answers the FIRST rung
  (`VERIFICATION_MAX_ATTEMPTS - 1` = "4 attempts remaining") — the
  single-probe reply is byte-identical to a fresh pending code's.
  The residual two-probe differential (4,4 vs 4,3) is documented in
  the route docblock: full closure needs per-email state on a
  stateless branch (a mimic counter that diverges from the real
  ladder on restart and on fresh signups — rejected). The e2e pin
  asserts the two 400 bodies byte-identical (a throwaway signup's
  first wrong code vs the demo account's no-pending probe).
- F-224c: the month-year rejection family becomes FORM-PRECISE —
  separator class `[\s.-]`, an optional TIME tail (the F-223d
  lesson: a bare lookahead would reject the day-carrying "Nov 2026
  15"), and the REVERSED twin (`^\d{4}[\s.-]+[A-Za-z]{3,9}(time)?$`)
  joining the doctrine: no day chosen → null. The day-carrying
  forms ("Nov 5 2026", "Nov 2026 15", "2026 Nov 15", "2026 Nov 15
  10:00", "15 Nov 2026") keep staging — pinned, TZ-switching.
- F-224d/e: the logout honesty pair — the store's `logout()`
  checks the `call()` result, surfaces the failure through the
  store-error banner (the role="alert" seam), and returns a boolean;
  both `signOut` helpers (sidebar + mobile-nav) gate their
  push/refresh on it. A new e2e leg replays the PRE-logout cookie
  against /api/auth/me after logout and asserts `data:null` — the
  revocation's first behavioral pin.
- F-224p: global-error takes the error.tsx genus (dark:bg-[#0a0a0a]
  + dark inks + dark dividers) — world-robust under either
  activation reading; the recovery ring stays ring-ring (visible in
  whichever world activates). LoadingBlock gains role="status" +
  aria-live="polite"; error.tsx's card regains a <main> landmark.
- F-224r/s: nine phone×dark a11y legs (the DARK_SECTIONS loop at
  390×844); the skip-to-content anchor — visually hidden until
  focus, first child of the shell root (before the sidebar), href
  to the main scroller (id + tabIndex -1) — pinned by a Tab-focus
  e2e leg. Placement outside <main> keeps every drift gate green
  (pixel sweeps, main-scoped census).
- F-224h: `passwordSchema` gains `.max(200)` (the reset flow's own
  bound) — the set-time contract unified; login stays unbounded
  (compare-only, 16KB body-capped).
- F-224j: a small pure seam strips the SQLite LIKE metacharacters
  (`%`, `_`) from the search query before the contains calls — a
  finance search box never means a wildcard; the strip is pinned
  (literal "%" → no matches rather than everything).
- F-224q: the vendored-stock KEEP precedent respected — the dead
  import retired, `--color-danger-soft` gains its .dark flip
  (#3f1d1d-family), the dropdown docblock re-cited to WealthOS
  surfaces. The four stock files stay (N-56e).
- F-224v: `@source not "../../skills"` (+ tests/docs/scripts) in
  globals.css — the content-detection set loses the prose carriers;
  the built CSS must keep every used utility (verified by a
  before/after build probe: a sentinel dead utility disappears, a
  live utility stays) and the drift gates must stay CLEAN (used
  utilities are untouched by construction).
- The named-month ROLLED forms ("Feb 30, 2026" → Mar 2) stay
  RECORDED (the F-223m adjudication — outside this round's numeric
  guard scope; a named-month round-trip seam is future work).

The cure list (each with its pins, all born RED):

1. `src/lib/csv.ts` — the shape-aware year gate (F-224a) + the
   month-year family (separator class, time tail, the reversed
   twin — F-224c) + the two docblock corrections (F-224m) + the
   TZ-switching pins over every new and preserved form.
2. `src/app/api/auth/verify/route.ts` — the no-pending first-rung
   answer (F-224b) + the residual docblock + the byte-identical
   e2e pin (auth.spec).
3. `src/stores/wealthos-store.ts` + `sidebar.tsx` + `mobile-nav.tsx`
   — the logout result check, the error-banner surfacing, the
   boolean return, the signOut navigation gates (F-224e) + the
   behavioral store pin (mocked fetch) + the source pins.
4. `tests/e2e/auth.spec.ts` — the logout-revocation replay leg
   (F-224d) + the verify byte-identical leg.
5. `src/app/global-error.tsx` — the F-222f genus mirror (F-224p) +
   the dark-arms pin.
6. `src/components/shared/page-parts.tsx` — the dead import
   retired + LoadingBlock role="status" aria-live="polite"
   (F-224aa) + the pins.
7. `src/app/error.tsx` — the <main> landmark (F-224aa) + the pin.
8. `tests/e2e/a11y.spec.ts` — the nine phone×dark legs (F-224r).
9. `src/components/layout/app-shell.tsx` — the skip-to-content
   anchor + the main id (F-224s) + the Tab-focus e2e leg.
10. `src/lib/schemas.ts` — passwordSchema `.max(200)` (F-224h) +
    the pin.
11. The search seam (F-224j) — the LIKE-metachar strip + pins.
12. `src/components/shared/page-parts.tsx` (import) + `src/app/
    globals.css` (the danger-soft dark flip, the reserved-token
    comment, the @source not family) + `src/components/ui/
    dropdown.tsx` (the docblock) (F-224q/t/v) + the pins
    (danger-soft flip, @source family, rounded-full radius —
    F-224u).
13. `tests/metadata.test.ts` — the header comment (F-224w);
    `src/lib/page-layout.ts` + `src/components/layout/sidebar.tsx`
    — the stale pill comments (F-224f) + the brandWordmark
    citation (F-224y).
14. `tests/e2e/mobile-navigation.spec.ts` — the re-mint afterEach
    hardening (F-224g).
15. `src/app/api/auth/login/route.ts` + `forgot-password/route.ts`
    + `verify/route.ts` — the lockout-DoS and Retry-After docblock
    notes (F-224k/l).
16. `Project_Architecture_Document.md` §10 + `docs/DEPLOYMENT.md`
    — the demo-seed register row + the production warning
    (F-224i).

Exit criteria: the full offline gate green (lint → typecheck →
unit with the new pins → build → smoke → e2e with the new legs);
the six parity drift gates CLEAN (the cures are visually inert by
construction — the skip link is outside main and pixel-invisible,
the dark arms ride faces the sweeps never capture, the @source
change touches no used utility — any tripping class re-derived
in-commit with the decode); census MATCH before/after; the capture
set for the cured faces; docs lockstep (README counts + status,
AGENTS counts + the new gotchas, CLAUDE, PAD revision block, SKILL
counts, docs-counts constants).

### R-22 — The designated-tail completion and tooling-hygiene round (session 225) — Status: Done(v2.22.0)

The session-225 fresh-eyes audit (three parallel Mode-C passes over
the R-21 cure surfaces, the API/auth/security layer, and the
UI/a11y/shell layer — 0 Critical / 1 High (the standing F-217m
owner-ask re-confirmed, not reopened) / 5 Medium / 8 Low / 9
Informational raw, adjudicated to the F-225 ledger after the driving
session re-verified every material claim at file:line — the two csv
claims live-probed under TZ switching across three zones
(scripts/probe-225-csv.ts, born this session and committed with the
round), the skip-link paint order live-reproduced against the real
dev server at both width edges (scripts/probe-225-skip.ts: the
focused pill's center answers the HEADER's wordmark at 390 while the
link itself answers at 1280, Enter lands #main-content at both — a
paint defect, not a functional one); the cold baseline verified
green at the documented v2.21.0 state before any edit: lint 0/0 ·
tsc 0 · 1060/1060 unit · build · smoke 15/15 · 122/122 e2e · census
MATCH (after the driving session's intake finding was cured by a
reseed: the R-21 capture set's scratch user had left custom.db at
users=2 — F-225e); the six parity drift gates ran CLEAN at 0-event
margin with the census MATCH; `bun audit` re-triaged unchanged (1
moderate, dev-chain); the neo-crm pattern check: aligned, no new
upstream commits, nothing to port).

Design decisions (settled before the cures, validated against the
tree):

- F-225a: the null-arm `^\d{4}[^\dA-Za-z]+\d{1,2}$` joins the
  partial family — separator class NON-LETTER (the NUMERIC_LOCALE
  convention: named forms never ride a numeric arm), `$`-ANCHORED
  (the F-223d lesson inverted: here the anchor is exactly right — a
  partial IS a two-group form; the three-group forms "2026/11/01"
  and "2026 11 01" carry two separators and never match), placed
  beside PARTIAL_ISO so every no-day numeric partial nulls in one
  read. "11/2026" keeps nulling through V8's own rejection; the
  hyphen partials stay PARTIAL_ISO.
- F-225b: the doctrine routes EVERY designated tail to the
  written-literal staging — never the viewer's zone, never a
  zone-shifted instant. (1) The ISO arm (ZONE_DESIGNATED) tolerates
  `\s*` before the designator and recognizes UTC|GMT as
  designators (a named zone IS +00:00; the written wall clock is
  the date portion before the tail). (2) A new
  LOCALE-designated family: named ("Nov 1, 2026 10:00 +09:00") and
  numeric ("11/01/2026 UTC", "2026/11/01 10:00 -05:00" — YMD by
  the a≥1000 shape convention), 4-digit years only, month-names
  mapped (3-9 letters, case-insensitive; an unknown name nulls —
  V8 NaN parity), the optional TIME tolerated before the tail,
  the written calendar round-trip-guarded (a rolled date nulls)
  and staged as the literal. (3) Two-digit-year designated
  numerics SKIP (null) — the remap boundary stays engine-internal
  (the standing two-digit doctrine); a visible skip beats a silent
  wrong day. The pre-cure zone-split (null in New York / stage in
  Tokyo) ends: every designated form stages the SAME written day
  in every zone.
- F-225c: the email-keyed secondary buckets mirror login-acct
  exactly — fired after the Zod parse, before any account-existence
  check (a per-email key adds no oracle), sized ABOVE the IP caps
  so single-IP flows are unchanged (verify-acct 60/15 over 20/IP;
  resend-acct 10/15 over 5/IP). The e2e legs ride rotating XFF
  (the F-222n leg's pattern) on scratch emails; the verify leg
  rides a no-pending account (the first-rung reply — no ladder
  progression, no lockout interference), the resend leg counts the
  in-app-delivered code. The F-222p citation is corrected in the
  route docblocks (the voidable bound no longer cited as the
  mitigation).
- F-225d: the focused link rises above the header layer
  (focus:z-[60] on the anchor's focus utilities) — clearing the
  z-50 header/drawer/dialog layer, staying under the toasts. The
  new 390 e2e leg asserts the revealed link is the topmost element
  at its own center (elementFromPoint — the honest form of "is the
  focused link visible"); the existing 1280 leg stays (the control
  edge). The bypass's functional halves (first Tab reaches it,
  Enter lands #main-content) are already pinned.
- F-225e: the capture family moves onto its own database — the
  e2e doctrine. db/captures.db is recreated (rm + db:push) and
  seeded per run; the spawned dev server rides
  DATABASE_URL=file:../db/captures.db (the F-123a1 override
  becomes an explicit SET, not a delete — a stale platform
  DATABASE_URL is replaced, not merely unset); custom.db is never
  touched; a census tripwire runs at script exit (`bun run
  db:census` against .env's custom.db — fail the run on
  MISMATCH). Retrofit captures-218/219/224 (the class), write
  captures-225 on the convention. The AGENTS gotcha: a capture
  tool that needs fresh signups rides its own database — the
  owner-scoped reseed never removes non-demo users; the census
  (users=1) is the tripwire.
- F-225f: the docblock rewords to the delivered truth — "every
  metacharacter-free query is a literal substring search;
  metacharacter-bearing queries are stripped (documented
  under-inclusion: net_salary → netsalary can miss stored
  net_salary)". The sanitizer pin stands unchanged.
- F-225g: the pin records the rolled outcome ("02/30/26" →
  2026-03-02, all zones) with the ledger row — recorded, not
  cured (the remap doctrine stands; a deterministic replication
  was considered and rejected this round — the boundary claim is
  the recorded adjudication).
- F-225h: the e2e leg (wealthos.spec, the injected session): q="%"
  (and "%%_") → all four families empty; q="Whole" → the Whole
  Foods row present. The route wiring (strip → length gate →
  contains) is pinned end-to-end.
- F-225i: a light per-IP bucket (240/15, the export precedent) on
  the uploads GET; the health route's F-221t note becomes true
  again (uploads carries a bucket). The route is cold in every
  battery (no seeded uploads, no e2e/smoke/sweep touch,
  grep-verified) — the bucket cannot trip any gate.
- F-225j/k/l/m: the hygiene batch — global-error's <main> (the
  parity-224 pin extended to the third face), aria-hidden on the
  six decorative icon sites, the DropdownItem destructive-ink
  measured-value note (3.76:1 on white — the F-218j value; the
  N-56e KEEP stands, armed with the citation) + the globals.css
  "consumer" wording clause, the app-shell re-indent, and the dead
  focus:outline-none retirement.

The cure list (each with its pins, all born RED):

1. `src/lib/csv.ts` — the numeric year-month partial arm (F-225a)
   + the designated-tail family (F-225b: the ISO arm widened, the
   locale-designated arms, the two-digit skip) + the F-225n
   comment + the TZ-switching pins over every new and preserved
   form (three zones; the four A-M2 probes + the A-M1 probes +
   the A-L2 pin, F-225g).
2. `src/app/api/auth/verify/route.ts` + `resend/route.ts` — the
   email-keyed buckets (F-225c) + the F-222p citation corrections
   + the rotating-XFF e2e legs (wealthos.spec).
3. `src/components/layout/app-shell.tsx` — focus:z-[60] (F-225d)
   + the re-indent (F-225m) + the 390 topmost e2e leg
   (mobile-navigation.spec).
4. `scripts/captures-218.ts` + `captures-219.ts` + `captures-224.ts`
   — the own-database retrofit (F-225e): the captures-db boot
   convention + the census tripwire at exit.
5. `src/lib/search-query.ts` — the docblock reword (F-225f) + the
   route-level e2e leg (F-225h, wealthos.spec).
6. `src/app/api/uploads/[name]/route.ts` — the 240/15 bucket
   (F-225i) + the health-note truth check.
7. `src/app/global-error.tsx` — the <main> landmark (F-225j) + the
   parity-224 pin extension.
8. `sidebar.tsx` + `mobile-nav.tsx` + `page-parts.tsx` — the six
   aria-hidden icons (F-225k).
9. `src/components/ui/dropdown.tsx` + `src/app/globals.css` — the
   destructive-ink measured-value note + the consumer wording
   clause (F-225l).
10. `src/lib/page-layout.ts` — the dead focus:outline-none
    retirement (F-225m) + the source pins (parity-225.test.ts for
    the batch).

Exit criteria: the full offline gate green (lint → typecheck →
unit with the new pins → build → smoke → e2e with the new legs);
the six parity drift gates CLEAN (the cures are visually inert by
construction — the z-[60] ride only paints the focused pill above
the header at phone widths, a state no settled capture holds; the
@source family is untouched this round; the csv arms change
staging semantics only, never a rendered surface — any tripping
class re-derived in-commit with the decode); census MATCH
before/after (the capture-tool retrofit makes the census the
round's own tripwire); the capture set for the cured faces (the
skip link at 390 topmost, the import preview with the new partial
and designated-tail forms); docs lockstep (README counts + status,
AGENTS counts + the capture-db gotcha, CLAUDE, PAD revision block,
SKILL counts, docs-counts constants, the plan close, §5 row).

### R-23 — The escape-family completion and per-casing metadata round (session 226) — Status: Done(v2.23.0)

The session-226 fresh-eyes audit (three parallel Mode-C passes over
the R-22 cure surfaces, the API/auth/security layer, and the
UI/a11y/shell layer — 0 Critical / 0 High / 4 Medium / 8 Low / 8
Informational raw, adjudicated to the F-226 ledger after the driving
session re-verified every material claim: the csv escapes
live-probed under TZ switching in three zones (probe-226-csv), the
dark menu surface live-probed on BOTH apps (probe-226-menu — the
reference's panel measures the token family), the ring-offset claim
ADJUDICATED INVERTED by live probe (probe-226-ring — the reference
itself carries the class; our TABS_SEGMENTED lacks it), the V8
design probes run before implementation (probe-226-v8 — the
named-zone set, the compound tails, the meridiem, the weekday
prefix, the separator lenience), the unbounded-read and
catch-swallow claims verified by grep + read across the route
family, the metadata claim verified against the route-case header's
own recorded reference posture).

**R-23.1 — the pins born RED.** The csv escape-family pins
(TZ-switching, three zones, every escape family + every control +
every documented residual); the per-casing metadata pins (each
lowercase segment's layout carries pageMetadata at its own route);
the error-logging pins (every catch site calls the seam); the
compound-index pin; the uploads Retry-After pin; the ring-offset ADD
pin (TABS_SEGMENTED carries the class; SELECT_TRIGGER and TABS_PILL
keep it); the MenuContent token-family pin; the quick-adder
role="group" pin; the row-context pins; the email-format pin; the
window extension (F-225c through `15 * 60 * 1000`); the parity-225
scripts-list extension (captures-225).

**R-23.2 — the cures.** THE DESIGNATED-TAIL ESCAPE COMPLETION
(F-226a): the DESIGNATED_TAIL widens (case-insensitive via the `i`
flag; the named-zone set UT/EST/EDT/CST/CDT/MST/MDT/PST/PDT; the
compound `(UTC|GMT)±[H]H[:MM]` tails); OPT_TIME gains the meridiem;
an optional leading weekday prefixes the three designated arms; the
NAMED_MDY separators lenient (`[^\dA-Za-z]*` name-day, `[\s.,]+`
day-year; the day-first twin's month-year separator); a NEW
name-year-day arm ("Nov 2026 15 UTC" — the day-after-year shape);
the month-year rejection family carries the designated tail
(MONTH_ONLY, REV_MONTH_ONLY, NUMERIC_MONTH_YEAR_PARTIAL — the named
zones and compound tails but NOT the bare offset: the "2026-11-01"
hazard, where a bare-offset tail would make every ISO date match the
partial rejector); ZONE_DESIGNATED gains the `i` flag (lowercase
"utc" on the space form); the docblock's false "no residual" claim
corrected; every widened arm keeps the whole-parse and round-trip
guards, and the two-digit-year remap doctrine still skips. THE
PER-CASING METADATA (F-226b): eight pass-through segment layouts
(income, expenses, accounts, investments, import, analytics, goals,
settings) each export `pageMetadata({ page, route: "/<lowercase>" })`
— the lowercase routes now serve their own title/canonical/OG family
exactly as the reference does at both casings; /Dashboard keeps the
ROOT head (the reference's own posture). THE API ERROR LOGGING
(F-226c): a `logApiError(scope, error)` seam in src/lib/api.ts;
every catch site logs `[api] <route> <verb>` with the error before
the envelope — the P2024/P2028→503 mapping in the auth family keeps
its specific arms. THE TRANSACTION COMPOUND INDEX (F-226d):
`@@index([ownerId, date])` — the heavy read family's ownerId+date
sort is index-backed; the read-family posture (unbounded by design,
single-owner scale) documented in the schema comment. THE LOW TAIL:
F-226e the uploads GET 429 joins the ERR.RATE_LIMITED family
(Retry-After + the family copy); F-226f captures-225 joins the
parity-225 scripts list (override + tripwire + refusal asserted);
F-226g the spawn-liveness check (the child must be alive after
waitOnUrl — a dead spawn fails loudly); F-226h the bucket-exhaustion
trade-off recorded at both routes + the ledger; F-226i the
TABS_SEGMENTED ring-offset ADD (the F-129c1 doctrine does NOT
transfer to this reference); F-226j the quick-adder wrapper promoted
to role="group"; F-226k the row-context sr-only tail on the four
surfaces; F-226l MenuContent joins the token family
(`border-line bg-surface` — light byte-identical, dark measures the
reference's own panel); F-226m the gradient-contrast exemption
register (the F-224y pattern: measured-value citations at the
constant sites); F-226n the ±HH comment truth + pin; F-226o the
24:00:00Z edge pin; F-226p the bucket-window pin extension; F-226r
the verify/resend email format.

**R-23.3 — the verification.** The full offline gate (lint 0/0 ·
tsc 0 · unit · build · smoke 15/15 · e2e — counts re-pinned) with
every new pin green; the six parity drift gates CLEAN (the cures are
visually inert by construction except the menu/ring dark arms —
menu-closed pages for the former, focus-state-only for the latter);
census MATCH; `bun audit` re-triaged (unchanged). The standing
operator asks re-verified: the .env DATABASE_URL contract, the
vitest/playwright configs, the sitemap/robots/manifest family, the
mobile-nav comparison (the drawer battery + probe:ref's TRUE-390),
the .env.example six-knob contract, the screenshots, the docs
lockstep.

### R-24 — The build-gate repair and wrong-row identity round (session 227) — Status: Done(v2.24.0)

The session-227 fresh-eyes audit (three parallel Mode-C passes over
the R-23 cure surfaces, the API/auth/security layer, and the
UI/a11y/shell layer — 0 Critical / 1 High / 1 Medium / 6 Low / 8
Informational raw, adjudicated to the F-227 ledger after the driving
session re-verified every material claim: the symlink-loop build
break reproduced by the session's own cold baseline (build exit 1 at
HEAD 3bd0255, green after the repoint); the investments wrong-row
bug live-reproduced by the UI pass (two same-symbol holdings: the
duplicate-key warning + the Edit prefill landing on the FIRST row's
record) and re-verified at file:line by the driving session; the
TOCTOU/excludes/sr-only/contrast claims verified by read; the
clean-surface confirmations recorded in F-227o).

**R-24.1 — the pins born RED.** The symlink-hygiene pin (the
docs/worklog.md alias must RESOLVE — no ELOOP — and its content must
be the canonical root worklog); the holdings-identity behavioral
pins (portfolioStats rows carry the id; two same-symbol investments
produce two rows with distinct ids, each mapping back to its own
record); the parity-227 source pins (the investments page keys and
resolves by row.id; the Edit sr-only tail; the 10 conditional-
mutation sites assert the updateMany/deleteMany + ownerId-in-WHERE
form and the count===0 NOT_FOUND arm; the P2003 arm on the
transactions POST/PUT; next.config excludes wealth-os_SKILL.md; the
destructive-variant measured-value citations; the analytics toDate
routing; the dead radius tokens retired); the e2e leg (the
duplicate-symbol pair: Edit on the second row prefills the SECOND
record's name — born RED on the pre-cure tree).

**R-24.2 — the cures.** THE SYMLINK-LOOP BUILD REPAIR (F-227a):
`docs/worklog.md` repointed from `worklog.md` (a self-loop from
docs/) to `../worklog.md` (the root canonical log) — the owner's
alias intent preserved, the build gate green again. THE HOLDINGS
IDENTITY CURE (F-227b): the portfolioStats holdings rows carry
`id: i.id ?? ""` (InvestmentLike already had the optional id; the
seam dropped it); the investments table keys `<tr key={row.id}>`
and resolves `investments.find((i) => i.id === row.id)` — an
id-less row's buttons go inert (strictly better than acting on the
wrong row) instead of silently mutating the first same-symbol
holding. THE CONDITIONAL-MUTATION REFACTOR (F-227c + F-227l): all
10 [id] PUT/DELETE sites across the 5 resource families move to the
atomic conditional form — `updateMany({ where: { id, ownerId } })`
with `count === 0` answering NOT_FOUND and a fresh re-read feeding
the PUT response envelope (the store refreshes after every mutation
and never consumes the stale record); `deleteMany({ where: { id,
ownerId } })` likewise; the transactions POST/PUT gain the P2003
FK-violation arm (isForeignKeyViolation in db.ts) answering
BAD_REQUEST("Selected account does not exist") — the account-link
race's ms-window 500 becomes the honest 400. THE LOW TAIL: F-227d
`wealth-os_SKILL.md` joins the outputFileTracingExcludes list;
F-227e the investments Edit button gains the row-context sr-only
tail (mirroring its own tailed Delete); F-227f the Button/Badge
destructive variants gain the measured-value citations (the
F-225l/F-226m register pattern); F-227m the analytics range filter
routes its three raw parses through toDate (behavior-identical,
doctrine-uniform); F-227n the three dead radius tokens retire from
@theme.

**R-24.3 — the verification.** The full offline gate (lint 0/0 ·
tsc 0 · unit · build · smoke 15/15 · e2e — counts re-pinned) with
every new pin green; the six parity drift gates CLEAN (the cures
visually inert by construction: the id changes touch no rendered
output, the sr-only span is invisible, the dead tokens were never
consumed, the toDate tidy is behavior-identical); census MATCH;
`bun audit` re-triaged (unchanged). The standing operator asks
re-verified: the .env DATABASE_URL contract, the vitest/playwright
configs, the sitemap/robots/manifest family, the mobile-nav
comparison (the drawer battery + probe:ref's TRUE-390), the
.env.example six-knob contract, the screenshots, the docs lockstep.

### R-25 — The second holdings surface and hygiene round (session 228) — Status: Done(v2.25.0)

The session-228 fresh-eyes audit (three parallel Mode-C passes over
the R-24 cure surfaces, the API/auth/security layer, and the
UI/a11y/shell layer — 0 Critical / 0 High / 0 Medium / 7 Low / 10
Informational raw, adjudicated to the F-228 ledger after the driving
session re-verified every material claim at file:line; the cold
baseline GREEN at HEAD — the v2.24.0 ship state reproduced exactly,
no discovery this round). No Critical/High/Medium: the R-24 cures
verified holding in both passes; the residue is the duplicate-symbol
genus's last surface, two security-posture completions, a schema
round, and the hygiene tail.

**R-25.1 — the pins born RED.** The gainBySymbol behavioral pins
(two same-symbol lots fold to one summed row; distinct symbols
passthrough; empty input; rounding at the seam) and the
upcomingAlerts id pin (the UpcomingItem carries the transaction id —
the recentActivity pattern); the parity-228 source pins (the
analytics chart's data + Cells ride gainBySymbol; the CSV Date
column's string-slice form; the dashboard Upcoming key by id; the
verify/resend miss-branch equalizer burns; the upload route's
capacity check + the STORAGE_FULL envelope member; the two schema
index lines; the getSessionUser select projection; the budgets
count===0 NOT_FOUND arm; the expenses filters aria-controls pair;
the two docblock corrections; the eight dead tokens retired —
negative pins on @theme and .dark — plus the comment carriers
reworded); the uploads-capacity seam pins (the bytes/count ceilings
+ the dir walk on a temp-dir fixture); the e2e leg (the Analytics
investments tab with two same-symbol lots renders ONE bar for the
shared symbol — seeded 6 + 1 aggregated = 7 bars, pre-cure 8 — born
RED on the pre-cure tree).

**R-25.2 — the cures.** THE SECOND HOLDINGS SURFACE (F-228a): a
`gainBySymbol(holdings)` fold joins the finance seams (one row per
symbol, gains summed, round2 at the boundary, first-appearance
order preserved — stats.holdings arrives value-sorted); the
Analytics Holdings Performance chart's data and Cells ride it —
one bar per symbol, duplicate keys impossible by construction, the
overlapping-bar display bug cured with the key warning. THE
TIMING-EQUALIZER FAMILY COMPLETION (F-228e): verify's miss branch
burns `verifyVerificationCode(code, timingEqualizerHash())`;
resend's miss branch burns `hashVerificationCode(generateVerifyCode())`
— the same work shape as their known branches (the login S72-C
pattern; the DB-write residual documented in-comment, the
forgot-password fsync-scale posture). THE UPLOAD CAPACITY CEILING
(F-228f + F-228i): `MAX_UPLOADS_TOTAL_BYTES` (256 MB) +
`MAX_UPLOAD_FILES` (4096) join the uploads seam with a
`uploadsCapacity(dir)` walk (readdir → count gate → stat-sum); the
POST route refuses with the new `ERR.STORAGE_FULL()` (507 — the
envelope's first non-4xx/5xx-generic member besides INTERNAL) when
either ceiling would break; the resolved repo root memoizes per
process (the anchor chain walks once, the on-demand mkdir stays);
the owner-tag/retention design recorded (F-228f's ledger row). THE
SCHEMA ROUND (F-228g + F-227h): `@@index([accountId])` on
Transaction (the SetNull cascade's lookup) and `@@index([resetToken])`
on User (the recorded next-schema-round item) — additive, db:push
lands both on the populated dev/e2e/captures dbs without data
movement; `bun run db:generate` after the edit. THE LOW TAIL:
F-228b the eight dead tokens retire from @theme + .dark (brand,
subtle, and the six unconsumed F-214e members — input/secondary/
card pair stay, they are live) and the eight comment carriers
reword (the F-224v doctrine: no class-shaped strings in comments);
the dark-tokens pin recalibrates (its --color-subtle flip assertion
retires with the token); F-228c the CSV Date column slices the
string (no Date math at all — the inverse-hazard eliminated);
F-228d the upcomingAlerts seam carries the id and the dashboard
keys by it; F-228h getSessionUser selects its eight consumed
fields; F-228j budgets DELETE answers NOT_FOUND on count===0; 
F-228k the expenses filters pair aria-controls with the popover's
id; F-228l the two stale docblocks corrected (day-of-WEEK, amber
#f59e0b).

**R-25.3 — the verification.** The full offline gate (lint 0/0 ·
tsc 0 · unit · build · smoke 15/15 · e2e — counts re-pinned) with
every new pin green; the CSS sentinel probe (the built stylesheet
shrank — the five dead utilities disappear, a live utility stays);
the six parity drift gates CLEAN (every cure visually inert or
error-path by construction: the fold changes rendered output ONLY
in the duplicate-symbol state the baselines never carry, the
equalizers burn on miss branches, the ceiling is an error path,
the indexes touch no query semantics, the token retirements had
zero consumers, the slice is behavior-identical, the id keys
change no DOM, the projection/count/aria/docblock edits are
invisible); census MATCH; `bun audit` re-triaged. The standing
operator asks re-verified along the way (the .env contract, the
vitest/playwright configs, the sitemap/robots/manifest family,
the mobile-nav comparison — the drawer battery + probe:ref's
TRUE-390, the .env.example, the captures, the docs lockstep).

### R-26 — The empty-state repair and dead-carrier retirement round (session 229) — Status: Done(v2.26.0)

The session-229 fresh-eyes audit (three Mode-C passes over the
R-25 cure surfaces driven by the session, the API/auth/security
layer, and the UI/a11y/shell layer — 0 Critical / 0 High /
1 Medium / 6 Low / 5 Informational raw, adjudicated to the F-229
ledger after the driving session re-verified every material claim
at file:line, live-probed the reference for the two adjudication
calls — the dialog-title alignment (F-229e, the docblock claim
INVERTED) and the analytics captions (F-229g, the finding itself
INVERTED) — and ran the whole-tree dead-carrier scan that grew
the audit's nine tokens to thirty). The cold baseline GREEN at
HEAD — the v2.25.0 ship state reproduced exactly, no discovery
this round.

**R-26.1 — the pins born RED.** The parity-229 source pins: the
Income tab's gate rides the income-presence predicate (and NOT
the structurally-dead length form); the budgets POST catch
carries the P2002 arm; the seed stages every calendar date as UTC
midnight (no setHours-noon form; the Date.UTC constructions at
the three sites); the thirty dead-carrier tokens appear in NO
comment anywhere under src (ts/tsx/css, generated excluded) — the
whole-tree form; the dialog docblock records the left-aligned
genus; the six dead API surfaces retire (presetCategory,
INCOME_CATEGORIES, CURRENCY_SYMBOLS, the five format helpers +
MONTHS_SHORT, NAV_FOOTER_ITEMS, TABS_PILL + the pill variant +
cols + GRID_COLS); the search route's docblock names the Postgres
case-folding dependency; mobile-nav carries one next/navigation
import. The finance behavioral pin (green at birth — the design
input): categoryTrend returns exactly n points on empty input —
the invariant that made the length gate unreachable. The e2e leg
(the scratch-user Analytics Income tab shows the "No income in
range" empty state) born RED on the pre-cure tree — the chart
renders instead. The whole-tree carrier invariant (the genus
cure): every class-shaped token found in any src comment must
either appear in comment-stripped live code or sit on the
prose allowlist (self-heal, first-party, break-even …) — the
fixed-list pin form retires with it.

**R-26.2 — the cures.** THE INCOME-TAB EMPTY-STATE REPAIR
(F-229a): `hasIncome` — an income-presence predicate over the
range domain (the sibling convention; the message text's own
domain) — gates the EmptyState; a flat all-zero chart is no
longer reachable for the income-free viewer. THE BUDGETS P2002
RACE ARM (F-229b): the POST catch recognizes
PrismaClientKnownRequestError P2002 and retries the upsert ONCE
(the winner's row now exists; the update arm fires; the loser's
amount applies last-writer-wins — the settings F-215i family
completed); a second failure falls through to the logged INTERNAL
arm. THE SEED UTC-MIDNIGHT STAGING (F-229c): dayOffset and the
transaction/nextDate constructions build Date.UTC calendar
midnights (the dateField identity); the future guard and the
census bounds hold; the dev/e2e/captures dbs reseeded. THE
DEAD-CARRIER RETIREMENT (F-229d): ~28 comment sites across 16
files reworded (describe, never quote — the F-228b pattern),
including the F-228b retirement note's own re-quote and the
factually-wrong N-66b grid-cols claim; the CSS sentinel probe
proves all 30 selectors leave the built stylesheet with the live
forms staying. THE DIALOG DOCBLOCK TRUTH (F-229e): the S15-P3
claim corrected — the reference's dialog title is left-aligned at
every width (live-probed at 390); our constant already carries
the genus; no constant change. THE DEAD-API RETIREMENT (F-229f):
the presetCategory prop, INCOME_CATEGORIES, CURRENCY_SYMBOLS, the
five format helpers + MONTHS_SHORT (the header corrected),
NAV_FOOTER_ITEMS, and the pill Tabs variant + TABS_PILL + the
cols prop + GRID_COLS all retire (zero consumers, grep-verified;
the underline variant stays as the documented default genus with
the F-220n re-entry condition). THE LOW TAIL: F-229h the search
route's docblock names the SQLite-LIKE case-folding dependency
and the Postgres `mode: "insensitive"` migration step; F-229j the
hygiene pass (the mobile-nav import merge, the seven tone="navy"
indents, the dashboard comment indent).

**R-26.3 — the verification.** The full offline gate (lint 0/0 ·
tsc 0 · unit · build · smoke 15/15 · e2e — counts re-pinned) with
every new pin green; THE CSS SENTINEL PROBE (the pre-cure chunk
carries all 30 dead selectors; the post-cure build drops every
one, the live forms — the md: viewport, the focus-visible ring
color, the variant-prefixed animation arms — stay, the stylesheet
shrinks); the six parity drift gates CLEAN (every cure visually
inert or error-path by construction: the Income gate changes
rendered output ONLY in the zero-income state the seeded
baselines never carry, the P2002 arm is an error path, the seed
restaging is display-identical in the UTC sandbox, the comment
rewords and docblock corrections emit no DOM, the retirements had
zero consumers); census MATCH after the reseed (the today-edge
row delta inside the 54..108 bounds); `bun audit` re-triaged. The
standing operator asks re-verified along the way (the .env
contract, the vitest/playwright configs, the sitemap/robots/
manifest family, the mobile-nav comparison — the drawer battery +
probe:ref's TRUE-390, the .env.example, the captures, the docs
lockstep).

### R-27 — The register-and-hygiene round (session 230) — Status: Done(v2.27.0)

The session-230 fresh-eyes audit (three Mode-C passes over the
R-26 cure surfaces driven by the session, the API/auth/security
layer, and the UI/a11y/shell layer — 0 Critical / 0 High /
2 Medium / 4 Low / 5 Informational raw, adjudicated to the
F-230 ledger after the driving session re-verified every
material claim at file:line and live-probed the reference for
the two adjudication calls — the StatCard genus CONFIRMED
(probe-230c: the reference's own Avg Monthly tiles carry the
identical saturated gradients + -100 labels + white bold
values, at its standing zero demo data) and the Cash Flow
zero-data claim INVERTED (probe-230: the reference's own card
renders four recharts surfaces unconditionally at zero data —
our unconditional render IS the genus). The cold baseline
GREEN at HEAD — the v2.26.0 ship state reproduced exactly, no
discovery this round.

**R-27.1 — the pins born RED.** The parity-230 source pins:
the analytics StatCard docblock carries the WCAG exemption
register entry (the measured trio + the value note + the
probe citation); the accounts lastSyncedAt seam routes through
toDate (the raw-parse form absent); no src file quotes the
retired phantom-xs construction; the ai-coach message list
keys by a minted id (the key={i} form absent from the
component); card.tsx cites no CARD_TITLE_OVERRIDE. Six pins
born RED on the pre-cure tree + the genus-guard pin green by
design (the register is a record, never a recolor — the guard
asserts the parity classes stand).

**R-27.2 — the cures.** THE STATCARD REGISTER ENTRY
(F-230a): the F-224y-form note lands on the StatCard docblock
— measured 2.24:1 / 3.08:1 / 3.01:1 labels, the white values
2.54:1 at the emerald-500 side passing on the 600 side, the
genus citation (probe-230c), the a11y two-gate sanction, and
the standing instruction that a future contrast sweep reads
the register instead of discovering the arms. NO visual change
— a recolor would deviate from parity (the F-226i lesson;
the audit's darken recommendation rejected). THE LASTSYNCEDAT
TODATE TIDY (F-230c): accounts:171 routes through toDate —
behavior-identical (the true-timestamp fall-through), the
doctrine's grep clean again (the F-227m precedent). THE
PHANTOM-BREAKPOINT COMMENT REWORDS (F-230d): mobile-header.tsx
and page-layout.ts:101 narrate the F-207a history in prose —
no class-shaped quote, no new hyphenated coinage (the F-229d
discipline). THE AI-COACH MESSAGE-ID KEYS (F-230e): the
CoachMessage model gains an id; a module-level counter mints
at the three construction sites (the greeting, the user push,
the assistant reply) — a ref counter trips react-hooks/refs
because the greeting consumes the mint DURING render; the list
keys by message.id — the
retry-replaces-a-message class can no longer mis-associate
DOM state. The import preview rows and the OTP boxes stay
index-keyed, documented as index-identity by design (the
frozen slice; the fixed slots). THE CARD_TITLE_OVERRIDE TRUTH
(F-230f): the docblock names the real mechanism (per-call
className overrides over the CARD.title base).

**R-27.3 — the verification.** The full offline gate (lint
0/0 · tsc 0 · unit · build · smoke 15/15 · e2e — counts
re-pinned) with every new pin green; the six parity drift
gates CLEAN (every cure visually inert by construction: the
register note and the two comment rewords emit no DOM, the
toDate tidy is behavior-identical, the ai-coach keys change
no rendered output); census MATCH; `bun audit` re-triaged.
The standing operator asks re-verified along the way (the
.env contract, the vitest/playwright configs, the
sitemap/robots/manifest family, the mobile-nav comparison —
the drawer battery + probe:ref's TRUE-390, the .env.example,
the captures, the docs lockstep).

## 4. Plan validation (the re-check, session 203)

After this plan text was drafted, every §2 claim was re-verified against the
tree before shipping (the plan-validation pass the task spec mandates):

| Claim | Method | Result |
|---|---|---|
| Baseline gate green at `4de2217` | lint + tsc + vitest + census executed cold this session | Verified (498/498 · MATCH) |
| `bun audit` census 10 = 4H/5M/1L, all dev-toolchain | `bun audit` output parsed; every chain walked to its dev consumer; runtime `zod` resolution checked (`require.resolve`) | Verified (zod@4.6.7 ≥ 4.6.6 — safe; vulnerable copy is the nested lint-chain one) |
| Phantom `docs-counts` reference | `ls tests/` + grep for docs-counts across the doc set | Verified (named at AGENTS.md:80, PAD:566; file absent) |
| Six stale count sites | grep `497 unit\|581` over the five living docs, each hit classified live-tense vs historical | Verified (5× 497 + 1× 581 live; historical rows excluded) |
| vitest.config CRM comment | file read | Verified (lines 3–6) |
| sweep.ts CRM-era config | grep for REF_URL/pages/baselines | Verified (:97, :156–157, :285–286) |
| AI seam per ADR-005 | src/lib/ai.ts read | Verified (:54–55, :274–275) |
| `.env`/`.env.example` parity | key-set diff | Verified (6/6 keys) |
| README quickstart ordering | README read | Verified (cp precedes db:push) |


### R-28 — The a11y-tail, logging-grain, and dead-family round (session 231) — Status: Done(v2.28.0)

The session-231 fresh-eyes audit (three Mode-C passes over the
R-27 cure surfaces driven by the session, the API/auth/security
layer, and the UI/a11y/shell layer — 0 Critical / 0 High /
0 Medium / 8 Low / 12 Informational raw, every material claim
re-verified at file:line by the driving session). ONE claim
adjudicated by live reference probes plus a bundle grep: the
Analytics "Spending by Day of Week" card is OUR OWN SUPERSET
(probe-231 walked the reference's /Analytics at its standing
zero demo data — no day-of-week card on any of the four tabs;
probe-231b/c confirmed the tabs' real surfaces; the reference's
JS bundle carries no such string) — the amber fill was never
reference parity but our own palette mis-assignment. The two
Pass-B Lows were adjudicated as AUDIT-BRIEF CONTRACT-TEXT
ERRORS (F-231s — the code matches the repo's recorded
contracts in both cases). The cold baseline GREEN at HEAD —
the v2.27.0 ship state reproduced exactly, no discovery this
round.

**R-28.1 — the pins born RED.** The parity-231 source pins
(fourteen): the expenses "$" glyph aria-hidden; the auth-card
heading-focus effect (the value-comparison guard, StrictMode-safe) + the tabIndex -1 h1s; the DropdownContent
z-50 re-pin; the icons.tsx retirement (the file gone + no
FilterPolygon in src); the N-89c6 note relocated to
page-parts; the TrendingDown aria-hidden; the day-of-week fill
(CHART_COLORS.expenses); the expenses memo; the settings peer
retirement; the login-card trailing-docblock retirement; the
upload multipart log; the uploads GET ENOENT gate; the
CRM-era dead-family retirement (DialogFooterWide,
DIALOG_FOOTER_WIDE, DIALOG_CONTENT.wide, Avatar/initialsOf
absent); the Event/Activity citation reword. Plus ONE e2e leg
born RED (the auth-card view-swap focus — the signup link
lands focus on the "Create your account" heading).

**R-28.2 — the cures.** THE EXPENSES DIALOG GLYPH HIDING
(F-231a — the amber "$" tile gains aria-hidden, the F-225k
family complete); THE AUTH-CARD VIEW-SWAP FOCUS (F-231b —
every transition lands focus on the new view's heading via the
unified mount-guarded effect; the verify view's box-1 focus
preserved inside the same effect; the reset screen's done swap
gains the same technique); THE DROPDOWNCONTENT Z-PIN (F-231c —
z-50, the menu family's layer); THE ICONS.TSX RETIREMENT
(F-231d — the file deleted; the N-89c6 lucide-injection note
relocated to the KpiCard delta icons); THE DAY-OF-WEEK FILL
(F-231e — CHART_COLORS.expenses, the palette doctrine's own
spending hue; drift-inert by construction — the sweeps are
zero-data and the card renders its EmptyState at zero data);
THE UPLOAD MULTIPART LOG (F-231f — the formData catch logs the
parse error before the 400, the F-226c genus closed); THE
UPLOADS GET ENOENT GATE (F-231g — the miss stays out of the
error log; real I/O failures still log); THE CRM-ERA
DEAD-FAMILY RETIREMENT (F-231h — DialogFooterWide,
DIALOG_FOOTER_WIDE, DIALOG_CONTENT.wide, Avatar + initialsOf
retired; the two Event/Activity citations reworded to the
historical record; avatarTextColor — the live F-218n seam —
stays); the low tail (F-231i the TrendingDown symmetry + the
note's new home; F-231j the expenses memo on
[store.transactions]; F-231k the vestigial peer dropped;
F-231l the trailing docblock folded).

**R-28.3 — the verification.** The full offline gate: lint
0/0 · tsc 0 · **1235 unit (78 files, +17)** · build · smoke
15/15 · **139 e2e (+1 — the view-swap focus leg)**. ALL SIX
parity drift gates CLEAN at 0-event margin (the four sweep
classes 1440/390/768/1024 + the fullpage sweep + the interior
census) · census MATCH · `bun audit` unchanged. The
parity-229 whole-tree carrier invariant caught the round's own
recursive genus twice (the z-50 re-pin orphaned two comments
citing the retired token as live code; the settings reword
coined a class-shaped marker) — both reworded, the invariant
holds. The capture set 134-136 (the own-database convention +
the census tripwire): **134** the mobile drawer at 390×844
with all 9 destinations + Sign Out (the standing operator
ask); **135** the auth-card signup swap with focus landed on
the heading (asserted: activeElement is the h1; the mount
guard kept the initial load natural — the face that
live-caught the StrictMode defect); **136** the Spending by
Day of Week bars in the spending rose (asserted: #f43f5e bars
present, zero #f59e0b). The census tripwire MATCHed at exit;
custom.db untouched. The recorded tail (F-231m through
F-231s) stays documented in the ledger above.


### R-29 — The dead-stock retirement, carrier-net repair, and dialog-focus round (session 232) — Status: Done(v2.29.0)

The session-232 fresh-eyes audit (three Mode-C passes over the
R-28 cure surfaces driven by the session, the API/auth/security
layer, and the UI/a11y/shell layer — 0 Critical / 0 High /
0 Medium / 13 Low / 9 Informational raw, every material claim
re-verified at file:line by the driving session; R-28's twelve
pinned cures all verified holding). The cold baseline GREEN at
HEAD — the v2.28.0 ship state reproduced exactly, no discovery
this round.

**R-29.1 — the pins born RED.** The parity-232 source pins
(twenty checks across the nine cure surfaces — eighteen born RED
+ two green-by-design genus guards: the import-absence census and
the live-family keep list): the four-file dead-stock retirement
(each file absent + no ui import + the riders retired from
page-layout); the carrier-net repair (no border-primary token
anywhere in src; the parity-229 allowlist carries no compound whose
parts include a dead utility; the globals.css comment names no
hover-form); the expenses step-swap focus (the prevStepRef
value-guard effect + the description-input ref + the heading
tabIndex -1); the hamburger aria-controls + the drawer id; the
always-mounted loading region (outside main, the F-218h form); the
amber arm retirement; the upload post-write re-check (unlink on
breach); the low tail (the CURRENCIES import, the BrandMark collapse
arm, the SHELL_LAYOUT.sidebar consumption, the icon/bare
retirements, the revoke defer); the line-strong registration. Plus
ONE e2e leg born RED with the honest focus failure (the +$10
quick-add leg extended with the two step-swap focus assertions —
Expected focused, Received inactive at the pre-cure build, verified
by the stash round-trip).

**R-29.2 — the cures.** THE VENDORED DEAD-STOCK RETIREMENT
(F-232a — card.tsx, table.tsx, label.tsx, input.tsx deleted;
INPUT_BASE + DIALOG_TEXTAREA + CHECKBOX retired with them; the
Event/Activity citation gone with its file; the F-230f pin block
retired — its subject file no longer exists; the parity-228
carriers list drops its table.tsx entry); THE CARRIER-NET REPAIR
(F-232b — the tabs.tsx citation reworded to prose per F-229d, the
PROSE_ALLOWLIST compound entry "border-primary/text-primary"
REMOVED so the whole-tree invariant nets the genus, the
globals.css danger-soft hover citation reworded); THE EXPENSES
DIALOG STEP-SWAP FOCUS (F-232c — the value-guarded prevStepRef
effect: quick→form focuses the description input, form→quick the
Quick Select heading tabIndex -1; edit-open lands on the
description input — the form IS the view; the initial open keeps
Radix's natural focus — no transition, no fire); THE HAMBURGER
ARIA-CONTROLS (F-232d — id="mobile-nav-drawer" on the sheet +
aria-controls on the trigger, the expenses-filters precedent);
THE ALWAYS-MOUNTED LOADING LIVE REGION (F-232e — the sr-only
region renders unconditionally OUTSIDE main, empty when idle, the
label swaps in on the loading flip; the LoadingBlock loses its
aria attrs and becomes the visual only); THE STALE AMBER ARM
RETIREMENT (F-232f — the bg-amber-500 arm retires with the
F-220p comment form: every live amber fill carries stone-900 ink
since F-219a); THE UPLOAD CAPACITY POST-WRITE RE-CHECK (F-232g —
re-read capacity after the write; on breach unlink the just-
written file and answer STORAGE_FULL — the TOCTOU window closes
to a single write's overshoot, then self-corrects); the low tail
(F-232h — the CURRENCIES import dropped, the BrandMark compact
arm dropped, the sidebar consumes SHELL_LAYOUT.sidebar,
MOBILE_NAV_SHEET.icon + PAGE_ROOT.bare retired, the exportCsv
revoke deferred); THE LINE-STRONG REGISTRATION (F-232i — the
token joins the F-224t reserved register with its citation).

**R-29.3 — the verification.** The full offline gate: lint
0/0 · tsc 0 · **1254 unit (79 files, +19: +20 parity-232 − the
retired F-230f block)** · build · smoke 15/15 · **139 e2e** (the
step-swap focus assertions extend the existing +$10 quick-add leg —
the check count unchanged). ALL SIX parity drift gates CLEAN at
0-event margin (the four sweep classes 1440/390/768/1024 + the
fullpage sweep + the interior census — every cure visually inert
or attribute-only by construction). census MATCH; `bun audit`
unchanged (the 1 moderate dev-chain minimatch, the documented
deferral). The parity-229 whole-tree carrier invariant holds over
the post-retirement tree — and CAUGHT the round's own recursive
genus twice more (the retirement comments themselves named the
retired identifiers and the utility forms; reworded per the F-229d
discipline — the net has now caught the genus five times across
three sessions). The captures and the docs lockstep per the
standing rhythm; the recorded tail (F-232j through F-232o) stays
documented in the ledger above.

### R-30 — The OTP-paste, live-region, and dependency-hygiene round (session 233) — Status: Done(v2.30.0)

The session-233 fresh-eyes audit (three Mode-C passes over the
R-29 cure surfaces driven by the session, the API/auth/security
layer, and the UI/a11y/shell layer — 0 Critical / 0 High /
1 Medium / 5 Low / 10 Informational raw, every material claim
re-verified at file:line by the driving session; R-29's nine
pinned cures all verified holding). The cold baseline GREEN at
HEAD — the v2.29.0 ship state reproduced exactly, no discovery
this round.

**R-30.1 — the pins born RED.** The parity-233 source pins +
the verification-seam behavioral units: the applyCodeInput
distribution contract (multi-digit paste/autofill distributes
from the edited box, focus lands after the last filled; the
single-digit walk and the clear path byte-identical to the
pre-cure semantics — the pure-seam unit battery: full-code
paste, partial paste, junk-laden paste, overflow truncation,
mid-box paste, last-box typing, non-digit clear); the
label-primitive dependency retirement (no src import + no
manifest entry — the N-62a form); the login info-callout
region (pre-existing in the verify view, the callout
visual-only); the settings save guard (disabled while the
slice is missing + the reason line); the import retry
affordance (the extract button disabled once the review
stands); the reset-token strip (captured once, the query
stripped); the upload breach-unlink isolation; the auth-face
suspense boundaries; the lockstep riders (the count correction
landed, the amber-arm scope, the checkbox narration). Plus
ONE e2e leg born RED (the reset-token strip — the address bar
keeps the query at the pre-cure build).

**R-30.2 — the cures.** THE OTP PASTE/AUTOFILL DISTRIBUTION
(F-233a — the pure applyCodeInput seam in the verification
lib; the login card's onCodeDigit delegates; no maxLength on
the boxes — a browser-enforced cap would truncate the paste
before the handler ever sees it); THE ORPHANED
LABEL-PRIMITIVE DEPENDENCY RETIREMENT (F-233b — removed
through the package manager, lockfile regenerated, the
import-absence + manifest-absence pins); THE LOGIN
INFO-CALLOUT LIVE REGION (F-233c — the sr-only status region
renders unconditionally in the verify view, empty when idle;
the InfoCallout loses its role and becomes the visual only);
THE SETTINGS SAVE GUARD (F-233d — Save disables while the
settings slice is missing, the amber reason line states the
protection); THE IMPORT DOUBLE-PARSE RETIREMENT (F-233e —
`rows !== null` joins the extract button's disabled condition;
the eager-parse-at-selection UX stays — it is the shipped,
captured behavior); THE RESET-TOKEN URL STRIP (F-233f — the
token captured once at mount, `history.replaceState` clears
the query; the refresh-after-strip trade documented in the
seam); THE UPLOAD BREACH-UNLINK ISOLATION (F-233g — the
unlink rides its own try/catch, log-and-continue, the breach
always answers STORAGE_FULL); THE AUTH-FACE SUSPENSE
BOUNDARIES (F-233h — LoginCard wrapped on login/signup, the
reset-password precedent); the low tail (F-233i the count
correction; F-233j the amber-arm scope reword; F-233k the
checkbox narration reword).

**R-30.3 — the verification.** The full offline gate: lint
0/0 · tsc 0 · unit (the new parity-233 + verification-seam
counts) · build · smoke 15/15 · e2e (the strip leg adds its
check). The six parity drift gates CLEAN at 0-event margin.
census MATCH; `bun audit` unchanged (the 1 moderate dev-chain
minimatch, the documented deferral — and the label-primitive
removal drops one chain from the tree). The parity-229
whole-tree carrier invariant holds over the post-cure tree
(the rewords ride the F-229d discipline — describe, never
cite). The captures and the docs lockstep per the standing
rhythm; the recorded tail (F-233l through F-233o, plus the
standing family) stays documented in the ledger above.

### R-31 — The in-flight-guard, OTP-restart, and logout-gate round (session 234) — Status: Done(v2.31.0)

The session-234 fresh-eyes audit (three Mode-C passes over the
R-30 cure surfaces driven by the session, the API/auth/security
layer, and the UI/a11y/shell layer — 0 Critical / 0 High /
0 Medium / 6 Low / 8 Informational raw, every material claim
re-verified at file:line by the driving session; R-30's nine
pinned cures all verified holding). The cold baseline GREEN at
HEAD — the v2.30.0 ship state reproduced exactly, no discovery
this round. The standing layers re-verified: probe:ref STABLE
on every layer (the bundle fingerprint unchanged, the demo data
zero, the desktop nav 256/9, the TRUE-390 mobile menu opens
with 9 destination links), `bun audit` unchanged (1 moderate
dev-chain), neo-crm upstream unchanged, the SEO surface green
(smoke leg 12), the .env contract, the vitest/playwright
configs, and the .env.example standing.

**R-31.1 — the pins born RED.** The parity-234 source pins
(one per cure contract: the settled flag in both arms of the
settings fetch, the parse-sequence token + the in-flight flag,
the full-length restart rule, the capacity-walk per-entry
guard, the budget-add busy rider, the logout gate-first order,
the glyph wrap, the class-string retirement, the dead-export
retirements) + the verification-seam behavioral units (the
full-code paste into a later box restarts at box 1; the
junk-laden full-code restart; the longer-than-code paste keeps
the from-edited-box truncation — the boundary pin) + the e2e
leg extension born RED with the honest rotation failure (the
type-then-paste flow submits the rotated code at the pre-cure
build, proven by the stash round-trip). Two same-commit pin
recalibrations identified: the parity-233 settings-guard
reason-line pin (the condition gains the settled flag) and
the parity-233 import-retry pin (the disabled set gains the
in-flight flag).

**R-31.2 — the cures.** THE SETTINGS-FETCH TRI-STATE (F-234a —
the store's settled flag flips in BOTH arms of the settings
fetch (reset on hydrate start and logout); the page's amber
reason line keys on the flag instead of the loading drop —
the in-flight window renders nothing, the failure face is
unchanged); THE IMPORT PARSE SEQUENCE GUARD (F-234b — the
monotonic parse-sequence token guards every state landing
(the store's refresh-sequence genus, page-local), the in-flight
flag joins the extract button's disabled set — the newest pick
wins, the retired re-parse stays retired inside the window);
THE FULL-CODE PASTE RESTART (F-234c — an exactly-full-length
edit restarts the distribution at box 1; partial pastes keep
the from-edited-box semantics every existing pin holds); THE
OTP PASTE E2E LEG (F-234d — the signup-ladder leg extends:
one digit typed, the whole code delivered into box 2 (the
autofill event shape at the change layer), the six
distributed boxes + the final-box focus + the signed-in
landing asserted — riding the leg's EXISTING signup, the
battery's IP budget untouched); THE UPLOADS CAPACITY-WALK
GUARD (F-234e — the per-entry size read rides its own guard;
a vanished entry skips both counters); THE BUDGET-ADD BUSY
GUARD (F-234f — the busy rider guards the handler entry and
the button, mirroring the sibling delete control); THE LOGOUT
GATE REORDER (F-234g — the content-type gate moves above the
bucket: the cross-site burn dies at 400 un-bucketed, the
first-party JSON path rides the bucket exactly as before);
the low tail (F-234h the glyph wrap; F-234i the cascade-dead
ink token retires from the class string; F-234j the two
dead-export keywords retire; F-234k the two e2e comments
re-attributed to the live region).

**R-31.3 — the verification.** The full offline gate: lint
0/0 · tsc 0 · unit (the parity-234 + verification-seam counts,
the docs-counts lockstep in the same commit) · build · smoke
15/15 · e2e (the leg extension adds its assertions inside the
existing test — the count carries the suite's standing total).
The six parity drift gates CLEAN at 0-event margin. census
MATCH; `bun audit` unchanged. The parity-229 whole-tree
carrier invariant holds over the post-cure tree. The captures
and the docs lockstep per the standing rhythm; the recorded
tail (F-234l through F-234n, plus the standing family) stays
documented in the ledger above.

### R-32 — The oracle-reorder, async-scrypt, and live-region-seed round (session 235) — Status: Done(v2.32.0)

The session-235 fresh-eyes audit (three Mode-C passes over the
R-31 cure surfaces driven by the session, the API/auth/security
layer, and the UI/a11y/shell layer — 0 Critical / 0 High /
1 Medium / 9 Low / 5 Informational raw, every material claim
re-verified at file:line by the driving session; R-31's nine
pinned cures all verified holding). The cold baseline GREEN at
HEAD — the v2.31.0 ship state reproduced exactly, no discovery
this round. The standing layers re-verified: probe:ref STABLE
on every layer (the bundle fingerprint unchanged, the demo data
zero, the desktop nav 256/9, the TRUE-390 mobile menu opens
with 9 destination links), `bun audit` unchanged (1 moderate
dev-chain), neo-crm upstream unchanged, the SEO surface green
(smoke leg 12), the .env contract, the vitest/playwright
configs, and the .env.example standing.

**R-32.1 — the pins born RED.** The parity-235 source pins (one
per cure contract: the effect-keyed greeting seed with the
render-time form retired, the gate-before-verify order with the
equalizer burn on the gate branch, the reset transient arm, the
async-scrypt seam shape at the seam and every route call site,
the functional busy clears at six sites, the close-button
padding, the aria-hidden emoji wraps at four sites, the tablist
naming, the KPI glyph/tone decoupling, the guest-wall status,
the additive CSP, the users record-not-found arm, the dead
transition retirement, the progressbar roles) + the behavioral
riders in the password-seam battery (the async round-trip: the
stored format byte-identical, the equalizer memo settles). Two
same-commit pin recalibrations identified: the auth-reset login
source pin (the equalizer form gains its awaits) and the
http-headers CSP pin (the policy value). One e2e extension
riding the existing F-218a leg (the request-level
wrong-password probe answers 403 VERIFICATION_REQUIRED — the
oracle closed — with zero new signups: the battery's IP budget
untouched).

**R-32.2 — the cures.** THE AI-COACH GREETING LIVE-REGION SEED
(F-235a — the greeting seeds in an effect keyed on open: the
region mounts empty and the greeting lands as a content change
on a pre-existing region, announced; the thread-persistence
semantics unchanged, the first-open announcement is the scope);
THE LOGIN VERIFICATION ORACLE REORDER (F-235b — the
verificationCodeHash gate moves above the verifyPassword call
with the equalizer burned on its branch: a never-verified
account answers 403 for BOTH wrong and correct passwords — the
403 leaks only account existence, already open by signup's
design, never credential validity; all four branches still burn
exactly one scrypt); THE RESET HONEST-FAILURE ARM (F-235c —
P2024/P2028 answers the 503 UNAVAILABLE family copy, the
sibling auth-route arm); THE ASYNC-SCRYPT SEAM (F-235d —
util.promisify over crypto.scrypt at the pure seam; the
stored format, parameters, and timing profile byte-identical;
every call site was already async — routes, seed, tests); the
functional busy clears (F-235e — the still-owner guard at six
sites); the dialog-close hit area (F-235f — the padding joins
DIALOG_CLOSE); the aria-hidden emoji wraps (F-235g — four
Select sites, the quick-chips' own pattern); the tablist
naming (F-235h — the ariaLabel prop + the two consumer names);
the KPI glyph decoupling (F-235i — the optional deltaTone
override; the Expenses glyph follows the sign while the tone
keeps the good/bad channel); the guest-wall status face
(F-235j — the visible role="status" redirect notice); the low
tail (F-235k the additive CSP — script-src/object-src/base-uri/
form-action join frame-ancestors; F-235l the users-PATCH
record-not-found arm; F-235m the dead HealthGauge transition
retires; F-235n the progressbar roles at three sites).

**R-32.3 — the verification.** The full offline gate: lint
0/0 · tsc 0 · unit (the parity-235 + password-seam counts, the
docs-counts lockstep in the same commit) · build · smoke
15/15 · e2e 140 (the F-218a leg extends with the oracle probe
inside the existing test). The six parity drift gates CLEAN at
0-event margin. census MATCH; `bun audit` unchanged. The
parity-229 whole-tree carrier invariant holds over the
post-cure tree. The captures and the docs lockstep per the
standing rhythm; the recorded tail (F-235o the deliberate
user-echo adjudication, plus the F-234l-n and standing
families) stays documented in the ledger above.

### R-33 — The empty-put, transient-503, and revocation-face round (session 236) — Status: Done(v2.33.0)

The session-236 fresh-eyes audit (three Mode-C passes over the
R-32 cure surfaces driven by the session, the API/auth/security
layer, and the UI/a11y/shell layer — 0 Critical / 0 High /
1 Medium / 8 Low / 11 Informational raw after dedup, every
material claim re-verified at file:line by the driving session;
R-32's fourteen pinned cures all verified holding). The cold
baseline GREEN at HEAD — the v2.32.0 ship state reproduced
exactly, no discovery this round. The standing layers
re-verified: probe:ref STABLE on every layer (the bundle
fingerprint unchanged, the demo data zero, the desktop nav
256/9, the TRUE-390 mobile menu opens with 9 destination
links), `bun audit` unchanged (1 moderate dev-chain), neo-crm
upstream unchanged, the SEO surface green (smoke leg 12), the
.env contract, the vitest/playwright configs, and the
.env.example standing.

**R-33.1 — the pins born RED.** The parity-236 source pins (one
per cure contract: the no-fields refine on the five update
schemas, the isTransientDbError helper + the ERR.UNAVAILABLE
family arm, the clearable-date seam + the nullable create twins,
the toast dismiss padding, the glyph wrap, the shell's
revocation gate, the reworded login-card comment, the goals
valuenow precision, the dead-arm register markers) + the
behavioral riders in the schemas-finance battery (the empty-PUT
400 across the five schemas, the ""/null clear semantics on the
dates/color/icon across both twins). The parity-235 F-235a
describe gains the timer/cleanup pins (F-236h). One e2e leg
extension riding the existing transactions CRUD leg (the
request-level empty-PUT probe answers 400, never 404 on an
existing row) + one new revocation-face leg (the /api/dashboard
leg route-intercepted to the 401 envelope — the face renders
and the from_url redirect fires; zero new logins: the shared
storageState authenticates).

**R-33.2 — the cures.** THE EMPTY-PUT 400 (F-236a — the
no-fields refine on the five update schemas: `{}` and
unknown-keys-only bodies answer the honest 400 "No fields to
update" through the existing parseBody issue-mapping; a
single-field PUT keeps its three-state semantics unchanged);
THE TRANSIENT-503 FAMILY COMPLETION (F-236b — isTransientDbError
joins isRecordNotFound/isForeignKeyViolation in src/lib/db,
ERR.UNAVAILABLE() joins the envelope family with the auth
routes' byte-identical copy, and the arm lands in every
DB-touching catch arm across the 15 route files — a transient
pool/transaction timeout answers 503 with the honest retry
posture everywhere, never the generic 500); THE FIELD-CLEAR
NORMALIZATION (F-236c — the clearable-date seam preprocesses
"" → null over the nullable date at all eight sites, the create
twins join the nullable contract, and color/icon normalize
"" → null on both twins — one uniform clear shape now works on
every clearable field on both create and update); the
toast-dismiss hit area (F-236d — the padding joins the
DIALOG_CLOSE family, 26×26px over the floor); the dashboard
glyph wrap (F-236e); THE MID-FLIGHT REVOCATION FACE (F-236f —
the shell's post-hydrate null-user gate renders the
guest-wall face: a session revoked between the server layout's
pass and the client hydrate's 401 re-establishes the login
wall client-side instead of rendering an empty workspace; the
logout path's hydrated/loading reset keeps it clear); the
stale F-218a comment reword (F-236g); the parity-235 timer
pins (F-236h); the goals progressbar precision (F-236i — the
unrounded value passes through, clamped upstream); the
dead-arm register markers (F-236j — the six arms document
their zero-consumer standing per the F-229f doctrine, in
words); the PAD retrospective forms (F-236k — rides the docs
lockstep).

**R-33.3 — the verification.** The full offline gate: lint
0/0 · tsc 0 · unit (the parity-236 + schemas-finance rider
counts, the docs-counts lockstep in the same commit) · build ·
smoke 15/15 · e2e (the empty-PUT probe extends the existing
leg; the revocation-face leg adds its own) · the six parity
drift gates CLEAN at 0-event margin. census MATCH; `bun audit`
unchanged. The parity-229 whole-tree carrier invariant holds
over the post-cure tree (the register markers describe in
words). The captures and the docs lockstep per the standing
rhythm; the recorded tail (F-236l-r + the standing families)
stays documented in the ledger above.

## 5. Execution history

| Version | Session | R-items executed | Gate at ship | Commit |
|---|---|---|---|---|
| v2.0.0 | 203 | plan created; **R-1** (security ledger + zod floor pin + PAD/AGENTS lockstep) · **R-2** (docs-counts port + 8 site fixes incl. §7.1) · **R-3** (vitest.config comment) | lint 0/0 · tsc 0 · **508 unit** (37 files; +10: 8 docs-counts + 2 security-ledger) · build · smoke 14/14 · e2e 84/84 · census MATCH | `905b8a4` (the execution commit) |
| v2.1.0 | 204 | **R-4.1** (the sweep re-anchor: REF_URL + the 11-page WealthOS set + the CRM baselines retired, both sweep.ts and sweep-state.ts; tests/sweep-tool.test.ts born RED 9/9 → GREEN; the maiden report-only run green end-to-end) · **R-6** (the F-204a docs-counts site-inventory completion: 4 grouped pins born RED against 10 stale sites; totals re-converged 508/37/592 → 521/38/605) | lint 0/0 · tsc 0 · **521 unit** (38 files; +13: 9 sweep-tool + 4 docs-counts) · build · smoke 14/14 · e2e 84/84 (1.4m) · census MATCH · the maiden sweep report (login pair + 11×2 captures + seed restore) | (this session's execution commit) |
| v2.2.0 | 205 | **R-4.2** (the maiden derivation: the F-205a per-page resolved-theme match — planThemeWrites born RED 3× → GREEN, the table collapsed ~85% → 12–75%; the four class tables derived from the theme-matched maidens at 390/768/1024/1440 — 12 literal values each, deep-pinned with the 3 session-204 pending-state pins replaced; the byte-identical re-run noise calibration; all four --fail-on-drift runs clean + the live --drift-margin -5 teeth check; the genera decoded — data-vs-empty, F-205b import+settings navy, F-205c styling deltas; R-7 programmed for the parity convergence) | lint 0/0 · tsc 0 · **524 unit** (38 files; +3 net: 3 planThemeWrites + 3 derived-state − 3 pending-state) · build · smoke 14/14 · e2e 84/84 (1.4m) · census MATCH · 4× drift-gate clean | (this session's execution commit) |
| v2.3.0 | 206 | **R-4.3** (the drift-probe + interior-census re-anchor: the probe's standing layers re-derived — the bundle fingerprint, the 256/9 sidebar, the functional mobile-menu census, the sentinel demo-data census; the census's 11-page set + anchor fallback + the STANDING_CENSUS four-axis allowances at zero margin, the mutation-proof teeth proven on both ghost classes) · **F-206a cured in-commit** (the demo-corpus misdecode: the living language corrected across the sweep docblock/standingExplained/zero-data header/the pin label/this plan's R-4.2 bullet) · **F-206b programmed** (the census-decoded construction genera → R-7) | lint 0/0 · tsc 0 · **535 unit** (39 files; +11 net: the new 12-test interior-census-tool pin + the drift-probe-tool rewrite 12→11) · build · smoke 14/14 · e2e 84/84 (1.4m) · census MATCH · the four-axis census gate clean (exit 0) + both teeth proofs RED · the live probe run STABLE | (this session's execution commit) |
| v2.4.0 | 207 | **R-7.1–R-7.5** (the parity convergence, owner-directed over the R-4.4 default — a fresh live census both apps/both themes re-derived every genus at full class length): **R-7.1** the mobile family (F-207a High — the phantom-`xs:` Tailwind v4 bug cured: the Synced pill now rides the reference's RIGHT cluster, visible at 390; F-207b the topbar gradient wash + amber border + shadow-lg + w-8 logo + gradient-clip wordmark + ghost icon buttons; F-207h the badge genus everywhere: rounded-md semibold green + the wifi glyph, green-700 = the AA step) · **R-7.2** the drawer footer band + ghost Sign Out + the 3% gold/emerald sheen utility (F-207d; F-207c WITHDRAWN — the reference's drawer DOES render the active pill, the session-206-era "no active state" read was a 150-char truncation artifact; the withdrawal is pinned so it cannot resurface) · **R-7.3** the section shells (the warm gradient wash + `p-4 lg:p-8` + min-h-screen + `transition-colors duration-300` + the per-page 7xl/6xl/4xl inner containers) + the page headers (the lg: rhythm + mb-8) + the H1 navy token (`--color-primary-navy: #0f1419` on the seven navy pages, stone+mb-1 on Dashboard/Investments, tracking-tight dropped) + Import's own navy wash (F-207e/g) · **R-7.4** the auth-card family — border-0 shadow-2xl bg-white/95 backdrop-blur-sm, the slate accent bar, the taller md: padding (F-207f) · **R-7.5** the baseline re-derivation: the four sweep class tables re-derived (import collapsed 75.1→31.2 desktop — the navy wash was its dominant genus; every section dropped 2–6pct; phone reset-password alone rose 14.0→16.5, the auth re-pin's honest record) + the STANDING_CENSUS allowances re-derived (44 entries, every one at or below its v2.3.0 value except phone settings/analytics +2 each) + both drift gates proven clean at all four widths. Pins: tests/shell-parity.test.ts born RED 26/27 → GREEN 27/27 (the 27th = the F-207c withdrawal pin, green at birth by design) | lint 0/0 · tsc 0 · **562 unit** (40 files; +27: the shell-parity pin) · build · smoke 14/14 · e2e 84/84 (1.5m) · census MATCH · 4× sweep drift-gate clean + the 4-axis interior-census gate clean at margin 0 · docs lockstep (535/39/619 → 562/40/646 everywhere; the pins row 12→13 with shell-parity) | (this session's execution commit) |
| v2.5.0 | 208 | **R-7.6–R-7.9** (the R-7 tail, owner-directed over the R-4.4 default per the plan's routing rule — a fresh logged-in DOM census mapped the F-208 findings): **R-7.6** the stat faces (F-208a — KpiCard re-pinned to the reference's gradient-tile genus: KPI_TONES emerald/teal · rose/red · amber/yellow · purple/violet, `w-12 h-12 rounded-xl` + `text-white` icons, the retired inline-tint tiles and md: upsize gone; Investments' KPI row re-pinned as THREE full-card gradients — blue/cyan · emerald/teal · amber/yellow, shadow-2xl, ghost `text-white/30` icons; F-208b the Cash Flow dot-legend row REMOVED — the reference renders none — + the PeriodSegment micro-deltas; F-208c the health widget — text-xs score-bar labels, solid band-colored fills, the amber tip box, the `inset-0 justify-end pb-1` font-black gauge overlay; F-208f the Analytics legend order — `<Legend itemSorter={null} />` cures recharts v3's alphabetical sort, Income first) · **R-7.7** the settings navy/blue tail (F-208d, the F-205b second half CURED — SETTINGS_CARD: the glass genus `bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg` + the shadcn CardHeader/CardTitle(navy)/CardContent anatomy, the blue GDPR box + `bg-blue-600` Export button, the amber import box INSIDE a standard card, the shadcn badge family in green/blue/purple/indigo, the bottom `flex justify-end` Save footer, the reference's card titles; Category Budgets kept as the functional superset; the h2/h3 semantic superset keeps the a11y heading-order gate green) · **R-7.8** the auth-face residuals (F-208e — the reference's own 192×192 logo asset fetched to `public/wealthos-logo.png`, rendered in its round `sm:`-upsizing wrapper; the title/subtitle slate tokens replacing the drifted `#1b2437`/`#6b7688` hexes; the CSS bar-chart mark retired) · **R-7.9** the baseline re-derivation: the four sweep class tables re-derived (settings collapsed 51.9→20.0 desktop, 68.9→18.7 phone, 72.9→32.4 tablet, 58.1→19.6 landscape — the glass genus was its dominant delta; investments 19.3→9.6 desktop / 49.3→27.7 phone, rising honestly at tablet/landscape 22.3/24.8 — the F-208g card genus residual; login 6.7→6.0 desktop) + the STANDING_CENSUS allowances re-derived (44 entries; settings unexplained 175/182/176/175→53/68/53/55, dashboard/investments/login all re-measured; the h2-superset tag events honestly absorbed) + both drift gates proven clean at all four widths. Pins: tests/parity-208.test.ts born RED 20/20 → GREEN 20/20; tests/sweep-tool.test.ts + tests/interior-census-tool.test.ts literals re-pinned in-commit | lint 0/0 · tsc 0 · **582 unit** (41 files; +20: the parity-208 pin) · build · smoke 14/14 · e2e 84/84 · census MATCH · 4× sweep drift-gate clean + the 4-axis interior-census gate clean at margin 0 · docs lockstep (562/40/646 → 582/41/666 everywhere; the pins row 13→14 with parity-208) | (this session's execution commit) |
| v2.6.0 | 209 | **R-7.10** (the F-209a per-surface card convergence + F-209b, executed per the plan's default pointer — a fresh every-page DOM census refined F-208g's single-genus belief into FOUR families deployed by surface): **the constants seam** — CARD.base re-pinned to the WARM-SIMPLE genus (`from-white/90 to-stone-50/90` gradient + amber-100/50 border + shadow-xl; Dashboard mid + Investments), CARD.kpi born as the WARM-HOVER genus (the F-208g class verbatim: via-amber-50/20 + card-hover + p-6 in-base + backdrop-blur-md; the Dashboard KPI row), GLASS_CARD born (base + hover variants — Expenses' summary trio carries card-hover like the reference's own; Expenses content, Analytics charts, Dashboard's Recent Activity + AI Insights bottom row, Income, Goals), STOCK_CARD born (the shadcn `border bg-card` stock card; Accounts + Import), QUICK_ACTIONS_CARD born (the reference's one-off: via-30, rounded-2xl, amber-200 border), STAT_GRADIENTS born (the Analytics saturated to-r trio) · **the two primitives**: the `.card-hover` @utility (CSSOM-verbatim: 0.3s cubic-bezier + hover translateY(-2px) + the xl shadow pair) and the `--color-card-foreground`/`--color-card` @theme tokens + the `.dark` runtime flip (the A-209 inert-class cure — the session-208 usages were generating NO CSS) · **CARD.padding → p-6 flat** (the reference's effective 24px; the p-4 md:p-6 upsize retired) · **F-209b**: the Analytics stat row born (Avg Monthly Income/Expenses/Savings — TrendingUp · TrendingUp rotate-180 · Calendar, over the new tested `monthlyAverages()` in finance.ts) · **the Quick Action tiles** re-pinned to the reference's shadcn-outline tone buttons (h-16 flex-col, the per-tone border/hover classes, View Reports = TrendingUp; the icon's effective 16px measured live) · **the baseline re-derivation**: the four sweep tables re-derived (the biggest drops of the program — goals 33.4→7.2 desktop / 41.2→11.7 phone / 34.4→6.6 tablet / 36.1→9.9 landscape; import 31.2→9.4 desktop; income 48.2→30.0 desktop; expenses 47.3→13.5 desktop; analytics 53.8→40.4 desktop / 49.0→31.5 landscape; investments honest phone rise 27.7→27.9; the untouched settings/login/reset flat — the sanity signature) + the STANDING_CENSUS allowances re-derived (44 entries; analytics unexplained 66/74/73/60→76/78/78/90 + mainH rose with the stat row; dashboard 257/317/262/258→248/264/253/245) + both drift gates proven clean at all four widths. Pins: tests/parity-209.test.ts born RED 20/20 → GREEN 22/22; tests/sweep-tool.test.ts + tests/interior-census-tool.test.ts + tests/docs-counts.test.ts literals re-pinned in-commit | lint 0/0 · tsc 0 · **604 unit** (42 files; +22: the parity-209 pin) · build · smoke 14/14 · e2e 84/84 · census MATCH · 4× sweep drift-gate clean + the 4-axis interior-census gate clean at margin 0 · docs lockstep (582/41/666 → 604/42/688 everywhere; the pins row 14→15 with parity-209) | (this session's execution commit) |
| v2.7.0 | 210 | **R-4.4** (the fullpage re-anchor, the plan's default pointer — the fifth gate re-anchored to the WealthOS reference following the R-4.1/R-4.2/R-4.3 pattern): **the pin** — tests/fullpage-sweep-tool.test.ts rewritten, born RED 11/19 against the CRM-era config (the NEO-CRM REF, the single-page guest landing, the 1920×1080 class, the 0.14/0.49 pill baselines) → GREEN 22/22 at ship · **the re-anchor** — REF → the WealthOS reference; PAGES imported from ./sweep (the 11-entry lockstep); the GUEST doctrine RETIRED (preflightPairState — the shared login pair); planThemeWrites + the per-page probe (the F-205a theme match); zero-data + the seed restore in a FINALLY; the classes → the sweep's own 1440×900 + 390×844 (the five gates' axes coincide); driftVerdict reused (one implementation) · **the maiden's own findings, cured in-commit**: F-210b the ZERO-DATA SENTINEL (assertZeroData — the six-array /api/dashboard probe after the zero + after each class's our-side loop; born from the first maiden's corrupted captures — analytics/goals/settings rendered the seeded corpus mid-run — and PROVEN live: it tripped the second run, the third ran clean) · F-210c the EXACT-BASENAME GUARD CURE (the root cause: `"fullpage-sweep.ts".endsWith("sweep.ts")` is TRUE, so importing ./sweep fired THE SWEEP inside the fullpage process — its reseed was the "external actor"; all four tool guards now `path.basename(argv[1]) === "<name>.ts"`) · F-210a the scroll-model genus DECODED + ABSORBED (the reference scrolls the document — dashboard 2054/3311; ours locks at the viewport — the padTo white rows are the dominant standing genus, not a cure target) · **the derivation** — the clean maiden's 22 measurements + the byte-identical noise calibration (0.000pct worst delta) → the per-class tables (desktop: dashboard 60.1 · investments 49.5 · settings 50.7 · import 26.6 (the horizontal-overflow genus — the reference pokes to 1778px wide) · income 30.0 · expenses 13.5 · accounts 10.9 · analytics 40.4 · goals 7.2 · login 7.9 · reset 3.9; phone: dashboard 78.5 · investments 80.9 · settings 61.0 · expenses 61.1 · analytics 67.3 · income 45.4 · import 31.3 · login 16.5 · reset 16.5 · goals 17.9 · accounts 23.3 — where both documents are viewport-height the values track the sweep's own tables, the shared-viewport cross-check) · **the live proofs** — all 22 legs CLEAN at both classes under --fail-on-drift; the teeth check (--pages login --fail-on-drift --drift-margin -3 → exit 1, the allowed values named); census MATCH after every run. Pins: tests/fullpage-sweep-tool.test.ts 12 → 22 (the sentinel seam + the collision guard + the derived literals + the genera decode) | lint 0/0 · tsc 0 · **614 unit** (42 files; +10 net: the fullpage pin 12→22) · build · smoke 14/14 · e2e 84/84 · census MATCH · the fullpage drift gate clean at both classes + live-proven teeth · docs lockstep (604/42/688 → 614/42/698 everywhere; the pins row 15→16 with fullpage-sweep-tool) | (this session's execution commit) |
| v2.8.0 | 211 | **R-4.5** (the gate:full reactivation — the plan's default pointer from docs/session_13.md; the R-4 ladder's closing slice) + **F-211a cured in-commit** (the package-identity cure). The audit round first: the cold baseline gates green at the documented v2.7.0 ship state (614/614 · smoke 14/14 · e2e 84/84 · census MATCH); the live reference-stability probe STABLE on every layer (bundle fingerprint · the empty-state demo census · the 256/9 sidebar · the TRUE-390 functional mobile-menu census opens/9 — plus a fresh side-by-side 390×844 mobile-nav census both apps: 9/9 destinations, pill visible in the right cluster, drawer navigation + Escape + close-face all live — ours the labeled superset); the security ledger re-triaged (10 advisories = 4H/5M/1L, all dev-toolchain — no NEW runtime-chain advisory); the standing deliverables verified (.env `file:../db/custom.db` + db/ at root · .env.example parity 6/6 · sitemap/robots/manifest live + the per-route OG family · no phantom `xs:` variants · the card/card-foreground @theme pins standing). The one open structural item = R-4.5 itself; the one new finding = F-211a. Shipped: **F-211a** — the package-identity pin (tests/gate-script.test.ts extended: name === "wealth-os" + the finance description, born RED against "neo-crm") → package.json re-identified (name/description) → `bun install` re-keyed bun.lock → GREEN; **R-4.5** — the cold end-to-end gate:full chain executed as the ship evidence (every leg green: lint 0/0 · tsc 0 · the unit suite with the new pin · build · smoke 14/14 · e2e 84/84 · the four sweep class drift gates CLEAN · the fullpage drift gate 22 legs CLEAN · the interior-census drift gate CLEAN at margin 0 · census MATCH after the chain) and the five docs un-dormanted (README:174 · AGENTS:31 · PAD:167/685 · SKILL:206 · CLAUDE.md's gate rows joined the count lockstep) with the pre-push doctrine re-wired | (the execution gate legs recorded in the session-211 worklog row) · census MATCH | (this session's execution commit) |
| v2.9.0 | 212 | **R-8** (the dependency round — the trailing pointer's default for the no-open-R-item state) + **F-212a cured in-commit** (the lockfile-identity cure). The audit round first: the cold baseline gates green at the documented v2.8.0 ship state (lint 0/0 · tsc 0 · 616/616 · census MATCH); the ledger re-triaged (the standing 10, no new runtime-chain advisory) — and this round's decode found F-212b (8 of the 10 curable in-range, never re-resolved) + F-212a (the lockfile's `activity-map` workspaces mirror) + F-212c (the 2 range-unreachable: minimatch ←typescript-estree `^10.2.2`, deepmerge-ts ←`@prisma/config` exact `7.1.5`). Shipped: **R-8.1** the floors pin born RED 4/4 (every zod ≥ 4.6.6 / every vite ≥ 8.3.3 / every source-map-js ≥ 1.2.2 / the workspaces identity — bun.lock parsed directly, nested keys included) → **R-8.2** the cure: `bun update` (direct deps in-range: next 16.4.5 · eslint-config-next 16.4.5 · tailwind 4.3.5 · vitest 5.1.0 · playwright 1.65.0 · axe 4.14.0 · zustand 5.1.0 · html2canvas-pro 2.6.3) then the fresh lockfile generation (`rm bun.lock` + `bun install`) re-resolving the transitives — vite 8.3.6 · source-map-js 1.2.2 · the nested zod deduped onto the runtime 4.6.7 · the mirror re-keyed to wealth-os; **census 10 → 2**; the dompurify override (3.4.17) verified intact; prisma census MATCH post-regeneration → **R-8.3** the lockstep: PAD §10 re-anchored (2: 1H/1M range-unreachable, the cured-eight decode), the security-ledger pin re-anchored in-commit, the version columns re-anchored (README badge + stack · PAD §1.2 · SKILL §2), the counts 616→620 / 42→43 (pins family 16→17 with dependency-floors-212; the §7.1 infra sub-row corrected to 23), the full gate + the drift legs re-run cold at the new resolutions (parity surfaces changed with the next/tailwind bumps) | lint 0/0 · tsc 0 · **620 unit** (43 files; +4: the dependency-floors pin) · build · smoke 14/14 · e2e 84/84 · census MATCH · the drift legs re-run clean | (this session's execution commit) |
| v2.10.0 | 213 | **R-9** (the prisma 6→7 major migration — the round's audit finding, F-213a, pre-empting the trailing pointer's standing-residuals default). The audit round first: the cold baseline gates green at the documented v2.9.0 ship state (lint 0/0 · tsc 0 · 620/620 · census MATCH); the reference probe STABLE on every layer; the ledger re-triage decoded the deepmerge-ts deferral as STALE — @prisma/config 7.x carries the fixed deepmerge-ts 8.0.2 while every 6.x stable exact-pins the vulnerable 7.1.5 (the line ended at 6.19.3) — so the HIGH is curable, but only across the ORM major. Shipped: **R-9.1** the floors pin born RED 3/3 (every deepmerge-ts ≥ 8.0.0 · every prisma/@prisma/client on 7.x · the adapter chain resolved, better-sqlite3 barred) + **R-9.2** the migration-contract pin born RED 7/7 (the generator + output · the adapter constructors + no removed option + generated imports · prisma.config.ts on the seam · the e2e absolute-url re-pin + no removed flag · the git/eslint ignores · the package.json wiring · the externals) → **R-9.3** the cure: the generator swap + postinstall generate; both constructors through PrismaLibSql; the two namespace imports moved; prisma.config.ts (dotenv + resolveDatabaseUrl); the e2e setup re-pinned; the schema's datasource url removed (P1012); **F-213b discovered live**: bun HARD-BLOCKS better-sqlite3 (oven-sh/bun#4290) — the upgrade guide's named SQLite adapter — so the chain is @prisma/adapter-libsql + @libsql/client 0.17.4 (verified live under bun end-to-end); the lockfile regenerated (bun remove left the stale better-sqlite3 resolution — the F-212b lesson again; dompurify override intact) → **R-9.4** the verification + lockstep: **census 2 → 1** (0H/1M minimatch, range-unreachable), the security-ledger pin + PAD §10 re-anchored in-commit, the counts 620→630 / 43→45 / badge 704→714 (pins family 17→19), the version columns re-anchored everywhere, the AGENTS bun/better-sqlite3 gotcha, the PAD revision block | lint 0/0 · tsc 0 · **630 unit** (45 files; +10: the two new pins) · build · smoke 14/14 · e2e 84/84 · two sweep legs CLEAN (1440 + 390) · census MATCH | (this session's execution commit) |
| v2.11.0 | 214 | **R-10** (the owner-scoping round) + **R-11** (the palette-completion round) + six in-commit cures (F-214f/g/h/i/j/k). The audit round first: the cold baseline gates green at the documented v2.10.0 ship state (lint 0/0 · tsc 0 · 630/630 · smoke 14/14 · e2e 84/84 · census MATCH); the reference probe STABLE on every layer; **all six drift gates CLEAN cold** (the four sweep classes + the fullpage + the interior census at margin 0 — the full parity evidence set); the ledger re-triaged (the standing 1 moderate minimatch, range-unreachable — no new advisory); the skills-guided fresh-eyes audit (Mode C, `skills/web-application` §14–§20 + `skills/tdd`) found the session's material: the tenancy cluster (F-214a High — `/api/reset` unscoped; F-214b/c — Budget/Setting ownerless, `/api/users` enumerating), the Tailwind v4 tail (F-214d — 23 unpinned pairs; F-214e — 7 inert semantic tokens), and the in-commit family (the boot delivery warning, the CSV quote edge, the AI zero-income gap, the doc drift, the disabled-but-clean eslint rules). Shipped: **R-10.1** `tests/owner-scoping.test.ts` born RED → **R-10.2** the Budget/Setting ownerId migration + the five route families scoped + the users GET retired to the session record + the seed re-bound → **R-10.3** the gate + census + drift legs; **R-11.1** `tests/palette-pins.test.ts` born RED (the complete enumeration) → **R-11.2** the 23 v3 pins + the 7 shadcn neutral tokens + the `.dark` flips → **R-11.3** the gate + the four sweep classes + the interior census; the in-commit cures as programmed | (the gate legs recorded in the session-214 worklog row) · census MATCH | (this session's execution commit) |

| v2.12.0 | 215 | **R-12** (the live-seam convergence round) + the in-commit tail. The audit round first: the cold baseline gates green at the documented v2.11.0 ship state (lint 0/0 · tsc 0 · 657/657 · build · smoke 14/14 · e2e 84/84 · census MATCH); the reference probe STABLE on every layer; **all six drift gates CLEAN cold**; the ledger re-triaged (the standing 1 moderate minimatch, range-unreachable — no new advisory); the skills-guided fresh-eyes audit (Mode C, `skills/web-application` + `skills/tdd`) found the session's material: the completeness cluster — **F-215a High** (the F-214h cure landed in a production-DEAD module while the live Import parser kept the bare-quote bug + no BOM strip), **F-215b** (the only live CSV export bypassed the formula-injection guard; the seam's docblock claimed a phantom entity-export.ts), **F-215c** (the R-10 pins were string-contains only; zero behavioral multi-user tests), **F-215e** (the seed's seven unscoped deleteMany — the install-wide wipe alive in the seed under R-10's own open-signup premise), **F-215f** (XLS/XLSX advertised, CSV-only parsed — the reference probe proved its bundle carries no spreadsheet library either, so the accept+hint are parity surfaces and the cure is the honest error branch), and the tail (F-215d upgrade path, F-215g users docblock, F-215h dead PDF deps, F-215i settings race, F-215j break-even verdict, F-215k PAD node, F-215l suffix guard, F-215o smoke loudness). A live method lesson recorded: an audit pass mis-read a valid export line as a syntax error — the DISPLAY pipeline ate a `[[h` sequence; byte-level verification (`od`) is now the rule for impossible-looking syntax findings. Shipped: **R-12.1** the pins born RED 14 (import-seam 5 · analytics-export-seam 3 · seed-scoping 3 · script-guards 1 · the ai break-even 1 · the settings-race 1) + the owner-scoping exact-form and the four standing-guard pins green-at-birth + `tests/e2e/multi-user.spec.ts` born GREEN by design (the behavioral contract pin — B's rows invisible to demo, B's reset wipes only B, the demo corpus SURVIVES) → **R-12.2** the cures (the parser swap + the XLS branch; the toCsv rebuild + the docblock corrections; the seed re-order + scoping; the P2002 catch; the break-even line; the name-only docblock; the dead deps retired; DEPLOYMENT §5.1; the smoke loud-on-fail legs; the exact-basename guard) → **R-12.3** the verification: lint 0/0 · tsc 0 · **676 unit** (51 files; +19) · build · smoke 14/14 · **e2e 85/85** (6 specs; +1) · **all six drift gates CLEAN** (the four sweep classes + the fullpage + the interior census — the accept-attr convergence is invisible to pixels, the XLS branch is an error path, the export is behavior-only) · census MATCH · the ledger unchanged (1 moderate, range-unreachable) | lint 0/0 · tsc 0 · **676 unit** (51 files) · build · smoke 14/14 · **e2e 85/85** · census MATCH · six drift gates CLEAN | (this session's execution commit) |

| v2.13.0 | 216 | **R-13** (the verification-gap convergence round) + the in-commit tail. The audit round first: the cold baseline gates green at the documented v2.12.0 ship state (lint 0/0 · tsc 0 · 676/676 · build · smoke 14/14 · e2e 85/85 · census MATCH); the reference probe STABLE on every layer; **all six drift gates CLEAN cold**; the ledger re-triaged (the standing 1 moderate minimatch, range-unreachable — no new advisory); the skills-guided fresh-eyes audit (Mode C, three parallel passes: the R-12 cure surfaces, the API/auth/security layer, the UI/a11y layer — 0 Critical / 0 High / 6 Medium / 11 Low / 19 Informational, every material claim re-verified at file:line by the driving session, one suspicion DISMISSED by live probe: the settings {}-body 500, F-216k — Prisma 7's empty-data update is a clean no-op). The session's material: **F-216a Medium** (the Import commit's 5000-row contract blocked by the global 16KB body ceiling — real imports of ≳140 rows failed "Request body too large"), **F-216b** (the S48-P1 formula-injection guard's pin was a phantom test file; zero behavioral coverage since the session-199 rewrite), **F-216c/d** (LoadingBlock dead code, no page consumed loading/error, refreshAll swallowed failures, the Refresh buttons fire-and-forget), **F-216e** (the QuickAction <a><button/></a> nesting — the a11y two-gate is STRUCTURALLY blind to link-wrapped buttons), **F-216f** (the F-215h doc tail: SKILL:127's PDF row, PAD:303's "JSON/PDF", DEPLOYMENT:76's "wipes domain tables", the reset comment's "seven", install_packages.sh, discover-198's ENOENT, csv.ts's lineage rot), and the low tail (F-216g OTP log gating, F-216h calendar-true dates — "2026-02-30" verifiably rolled to March 2, F-216i the Expenses popover Escape, F-216j the dead-export sweep). Shipped: **R-13.1** the pins born RED 26 (import-body-cap 5 · schemas-finance dateField 6 · loading-states 5 · parity-216 9 · docs-counts negative 1) + csv-formula-guard 12 born GREEN by design (the guard's code pre-existed — the pin prevents its regression) + `tests/e2e/data-import.spec.ts` (the 500-row >16KB behavioral leg, the multi-user scratch-user pattern) + the a11y /reset-password anon leg + the Expenses Escape leg → **R-13.2** the cures (the seam parameterized — MAX_IMPORT_BODY_BYTES 4MB; refreshAll's failure branch + refresh returning the Result + the Refresh toasts; the AppShell loading gate + error banner with retry; the QuickAction single-anchor form; the popover Escape/outside; the no-op ternary collapsed; the OTP log gated behind inAppOtpEnabled; dateField's ISO-shape regex + calendar round-trip; reset-password's minLength; the dead exports retired — MOBILE_NAV_SHEET.overlay, NAV_LAYOUT.icon/label, PERIOD_SEGMENT, GRID_COLS, chart-no-outline, store.search; the smoke trap's GATE_PID; discover-198's existsSync; install_packages.sh deleted; the doc tail cured + the dompurify note re-homed; the error banner's red-300/900/950 pinned per the A-209 doctrine) → **R-13.3** the verification: lint 0/0 · tsc 0 · **719 unit** (55 files; +43) · build · smoke 14/14 · **e2e 88/88** (7 specs; +3) · **all six drift gates CLEAN** (the four sweep classes + the fullpage; the interior census after the dashboard's standing allowances re-derived per the R-7.5 doctrine — the QuickAction divergence decode, every other page at its standing value exactly) · census MATCH · the ledger unchanged (1 moderate, range-unreachable) | lint 0/0 · tsc 0 · **719 unit** (55 files) · build · smoke 14/14 · **e2e 88/88** · census MATCH · six drift gates CLEAN | (this session's execution commit) |

| v2.14.0 | 217 | **R-14** (the parity-completion round — the fresh-eyes audit's blind-spot cluster: the surfaces the gates structurally cannot see). The audit round first: the cold baseline gates green at the documented v2.13.0 ship state (lint 0/0 · tsc 0 · 719/719 · build · smoke 14/14 · e2e 88/88 · census MATCH; the browser binaries reinstalled after the sandbox reset); the ledger re-triaged (the standing 1 moderate minimatch, range-unreachable — no new advisory); the skills-guided fresh-eyes audit (Mode C, three parallel passes: the R-13 cure surfaces, the API/auth/security layer, the UI/a11y/shell layer — 0 Critical / 3 High / 6 Medium / 17 Low / 10 Informational, every material claim re-verified at file:line by the driving session, the two live-repro classes verified with probe scripts: the Expenses popover Select kill + the dark-mode invisible surfaces; the LIVE REFERENCE probed for the dark genus — its dialog panel measures #0a0a0a with #262626 borders and #fafafa labels, its sitemap lists the Capital locs; one High RECORDED as the owner-decision item: F-217m, the in-band delivery default posture). The session's material: **F-217c High** (the .dark block never flipped the seven app-native tokens — every dialog, the Select listbox, and the user-menu rendered white panels with light text, 1.09:1/1.00:1, live-verified), **F-217a Medium** (the F-216i outside-close killed the portaled Select — mouse users could not apply a category filter, live-reproduced), **F-217b** (the coach route's schema-vs-cap conflict — the F-216a class one route over), **F-217d** (the verification gate dissolved after its TTL; the resend no-opped the same accounts), **F-217e** (the drawer's Tab order ran under the overlay), and the low tail (F-217f the sitemap's metadata-poor lowercase locs, F-217g no Cache-Control on the envelope, F-217h no frame-ancestors, F-217i the SearchResults/search tails, F-217j dateField's offset roulette, F-217k the hydrate stale-error face, F-217l the late write-token read). Shipped: **R-14.1** the pins born RED 34 (ai-body-cap 6 · expenses-popover 4 · dark-tokens 11 · mobile-navigation-focus 4 · parity-217 5 + the six extension families: auth-contract 2, metadata 1, http-headers 3, owner-scoping 2, schemas-finance 8, palette-pins 1) + the e2e legs (+7: the popover mouse-pick + outside-close, the three drawer-focus legs, the two dark a11y legs) → **R-14.2** the cures (the .dark token completion — the seven app-native flips in the reference's measured family + the toast/button tails + the destructive buttons' dark arms; the popover portal exclusion; MAX_AI_BODY_BYTES 256KB; the login hash-gate + the resend re-arm; the drawer focus contract; the sitemap's Capital locs; the envelope's Cache-Control: no-store + the global frame-ancestors; SearchResults retired + /api/search pinned; dateField's two sanctioned forms; the hydrate error hygiene; the entry-time token capture across the 19 mutation actions) — the dark a11y leg's maiden run CAUGHT the destructive red-600 3.3:1 (cured) and the axe selector-fragility (the register gained the button[type=submit] needle, same citation); the useEffect-cleanup timing decode (focus return keys on "not in header", never "in the removed sheet") → **R-14.3** the verification: lint 0/0 · tsc 0 · **767 unit** (60 files; +48) · build · smoke 14/14 · **e2e 95/95** (7 specs; +7) · **all six drift gates CLEAN with the tables RE-DERIVED** (every page's diff moved down — the dark convergence; phone dashboard 16.5 → 14.47; the sweep-tool + fullpage-tool literal pins updated in-commit) · census MATCH · the ledger unchanged (1 moderate, range-unreachable) | lint 0/0 · tsc 0 · **767 unit** (60 files) · build · smoke 14/14 · **e2e 95/95** · census MATCH · six drift gates CLEAN (re-derived tables) | (this session's execution commit) |
| v2.15.0 | 218 | **R-15** (the recovery-loop and perceivability round: F-218a the signin 403 → verify view · F-218b the trigger-scoped popover guard · F-218c the export no-store · F-218d the toDate UTC-midnight re-anchor · F-218e the updateSettings guard · F-218f the upload stream bound · F-218g the import/coach/reset buckets · F-218h the toast live region · F-218i the ring-token dark flip + the light-surface rings · F-218j the red-600 steps · F-218k the badge dark-steps · F-218l the muted/subtle flips · F-218m HealthGauge role · F-218n the avatar seam · F-218o the tabs' four panels · F-218p the logout gate · F-218q the fallthroughs · F-218r the P2002 arm · F-218s the 1MB AI cap · F-218t the proxy-hops warning · F-218u the labels + accent · F-218v the message-stability pin) | lint 0/0 · tsc 0 · **817 unit (62 files; +50)** · build · smoke 14/14 · **e2e 97/97 (7 specs; +2)** · all six drift gates CLEAN · census MATCH | (this session's execution commit) |
| v2.16.0 | 219 | **R-16** (the parity-default and perceivability round — the owner's explicit parity directive) + the in-commit refinements (the reads-bucket design decode; the auth-face three-seam force-light; the coach send-button straggler). The audit round first: the cold baseline gates green at the documented v2.15.0 ship state (lint 0/0 · tsc 0 · 817/817 · build · smoke 14/14 · e2e 97/97 · census MATCH; the browser reinstalled after the sandbox reset); the ledger re-triaged (1 moderate minimatch — unchanged); the LIVE REFERENCE deeply probed per the directive: the drift-probe STABLE on all four standing layers; the theme posture decoded END-TO-END (fresh login → html.dark + body #0a0a0a, NO localStorage key, the choice persists SERVER-SIDE per user — the toggle round-trip proved it, then the standing DARK posture restored after the probe mutated it); the per-page CTA genus measured (amber+stone-900 on Dashboard/Accounts/Goals/Settings; emerald→teal+white Income/Investments; rose→red+white Expenses — the dialog submits carry the same families); the mobile drawer measured on both apps (Sign Out unreachable below ~800px on BOTH — the reference shares the clip); the fresh-eyes audit (Mode C ×3: the R-15 cure surfaces · the API/auth/security layer · the UI/a11y/shell layer — 0 Critical / 3 High / 11 Medium / 16 Low / 17 Informational raw, every material claim re-verified at file:line, three live-repro classes). Shipped: **R-16.1** the pins born RED 39+ (theme-default · parity-219 · rate-limit disjointness · the schemas null-clear contract change) → **R-16.2** the cures (the theme-default seam + the bootstrap mirror + the provider pathname effect; --color-primary-foreground #1c1917 + BUTTONS.primary stone-900 + the CTA constants + the 15 section button sites + the coach/error/period/filter-badge tails; the drawer overflow-y-auto; the four date-seam sites; the AA constants + the 25-site dark metadata sweep + the display-text cluster + the ring leftovers; the coach live region; the rate buckets (data-reset:/pw-reset: + the writes family + export/search); the low tail) → **R-16.3** the verification (lint 0/0 · tsc 0 · **869/869** · build · smoke 14/14 · **e2e 99/99** · the six drift gates CLEAN on the RE-DERIVED tables · census MATCH · the captures 82-87) | lint 0/0 · tsc 0 · **869 unit** (64 files; +52) · build · smoke 14/14 · **e2e 99/99** · census MATCH · six drift gates CLEAN (re-derived tables) | (this session's execution commit) |
| v2.17.0 | 220 | **R-17** (the date-seam completion and dark-surface round — findings-led, the standing directive with the reference STABLE on all four drift layers). The audit round first: the cold baseline gates green at the documented v2.16.0 ship state (lint 0/0 · tsc 0 · 869/869 · build · smoke 14/14 · e2e 99/99 · census MATCH; the browser reinstalled after the sandbox reset); the ledger re-triaged (1 moderate minimatch — unchanged); the drift probe STABLE (no parity event); the fresh-eyes audit (Mode C ×3: the R-16 cure surfaces · the API/auth/security layer · the UI/a11y/shell layer — 0 Critical / 1 High / 5 Medium / 10 Low / 12 Informational raw, every material claim re-verified at file:line, the headline live-reproduced under TZ=America/New_York). Shipped: **R-17.1** the pins born RED 46+9 (parity-220 new · finance +4 behavioral · csv +5 · the dark-tokens window refinement in-commit) → **R-17.2** the cures (the toDate bare-form re-anchor; the stageCsvDate import seam + the toDate preview + the skipped-count; the ~14 dark arms; the --color-background flip + the dead-rule deletion + the bg-white thumb; the writes bucket on all 14 mutating handlers; the error rings; the toast ink; the bootstrap/listener theme-mirror agreement; the accountId clear; the call() code plumbing; the forgot-password read 503s; the refreshAll sequence guard; the nine-section dark legs; the register retirements + the chart-stroke citation) → **R-17.3** the verification (the full gate + ALL SIX drift gates CLEAN without re-derivation + the captures 88-92 + the docs lockstep incl. the docs-counts constants) | lint 0/0 · tsc 0 · **924 unit** (65 files; +55) · build · smoke 14/14 · **e2e 107/107** (+8) · census MATCH · six drift gates CLEAN (standing baselines) | (this session's execution commit) |
| v2.18.0 | 221 | **R-18** (the date-staging correctness and perceivable-controls round — findings-led, the standing directive with the reference STABLE on all four drift layers). The audit round first: the cold baseline gates green at the documented v2.17.0 ship state (lint 0/0 · tsc 0 · 924/924 · build · smoke 14/14 · e2e 107/107 · census MATCH; the browser reinstalled after the sandbox reset); the ledger re-triaged (1 moderate minimatch — unchanged); the drift probe STABLE (no parity event); the fresh-eyes audit (Mode C ×3: the R-17 cure surfaces · the API/auth/security layer · the UI/a11y/shell layer — 0 Critical / 2 High / 4 Medium / ~12 Low / ~10 Informational raw, every material claim re-verified at file:line, the headline live-reproduced under TZ-switching probes — the R-17 stageCsvDate seam stages the bare form a day early west of UTC and the Z-form a day late east of UTC, the F-218d/F-220a class reintroduced at its own cure site; the SelectItem dark wash live-measured 1.18:1; the Export ink live + axe 3.38:1; the a11y gate's scroll blind spot live A/B-verified). Shipped: **R-18.1** the pins born RED 31+ (csv +7 TZ-switching — 3 RED on the live-reproduced legs · parity-221 new 30 · schemas-finance +1 · auth-reset +1) + the e2e legs (+1 spec test: the dark-mode Select highlight; the multi-user [id] 404 legs; the scrollThrough in both a11y loops) → **R-18.2** the cures (the stageCsvDate FORM-BRANCH; the SelectItem dark arms; the seven-site null-clear rider; the Export text-white; the a11y scrollThrough; the reset-password read 503s; the shares cap; the cross-user [id] legs; the ExpenseDialog labels; the goals badge light arm; the DIALOG_CLOSE ink; the toast icons; the switch boundary; the reset-submit pending; the OS-flip auth-face gate; the busyId card busy-disable ×4; the logout bucket; the export settings/photoUrl/createdAt; the hygiene tail) with the in-commit pin refinements (parity-220's badge pin, toast-anatomy's icon pins, three comment-literal collisions) → **R-18.3** the verification (the full gate + ALL SIX drift gates CLEAN on the standing baselines + the captures 93-97 + the docs lockstep incl. the docs-counts constants) | lint 0/0 · tsc 0 · **961 unit** (66 files; +37) · build · smoke 14/14 · **e2e 108/108** (+1) · census MATCH · six drift gates CLEAN (standing baselines) | (this session's execution commit) |
| v2.19.0 | 222 | **R-19** (the zone-designator completion and focus-affordance round — the trailing pointer's default for the no-open-R-item state). The audit round first: the cold baseline gates green at the documented v2.18.0 ship state (lint 0/0 · tsc 0 · 961/961 · build · smoke 14/14 · 108/108 e2e · census MATCH; the Playwright chromium re-pinned 1254 after the sandbox reset); the reference-stability probe STABLE on all four standing layers (bundle fingerprint BMU57229 · the ZERO demo census · the 256/9 desktop sidebar · the TRUE-390 functional mobile menu, opens with 9 destinations — the owner's named focus verified live again); the ledger re-triaged (the standing 1 minimatch moderate, dev-chain, range-unreachable — no NEW runtime-chain advisory); the standing deliverables re-verified (.env `file:../db/custom.db` + census MATCH · .env.example parity · sitemap/robots/manifest + OG family · the Tailwind v4 sweep clean — zero phantom breakpoints, zero inert tokens). The session-222 fresh-eyes audit (three parallel Mode-C passes: the R-18 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 5 Medium / 8 Low / ~12 Informational raw, every material claim re-verified at file:line, the date-seam headline live-reproduced under TZ-switching probes on BOTH zone edges + the year boundary). Shipped: **R-19.1** the pins born RED (csv.test.ts +16 behavioral — lowercase-z both zones + the year boundary, the non-UTC offsets both zones + the year boundary + zone-invariance + the compact/hour-only offset family, the partial-ISO nulls, the locale + designated rollover nulls, the V8-parity invalid-TIME nulls, the numeric-locale controls, the DMY/dotted documentation; parity-222.test.ts born RED 28 — the designator family, the import ink + skip copy, the 404/error dark arms, the focus-ring family in the POSITIVE form, DIALOG_CLOSE's dark mirror, the tooltip isDark wiring ×3 pages, the accounts red pair, the tabs/badge latent arms + the neutral-800 @theme pin, the two busy riders + the retired void-discard, the per-account buckets + the no-oracle ordering, the P2025 seam + all ten [id] catches; e2e +2) → **R-19.2** the cures: the ZONE-DESIGNATED branch (every designator stages the WRITTEN literal; the whole-string V8-parity check), the PARTIAL_ISO rejection, the locale numeric rollover guard (MDY/YMD round-trip, the 2-digit-year remap documented as engine-internal); the import ink + skip copy; the 404/error dark arms (the reference's SPA serves its 404 inside the dark shell — dark arms, not force-light); the focus-ring family on the shared constants (PeriodSegment · toast ✕ · app-shell Try-again · LOGIN google/footer · the login/reset/verify back trio + resend · the four Expenses chips); DIALOG_CLOSE's dark hover; the tooltip isDark completion (dashboard/investments/analytics — 9 Tooltip sites); the accounts red pair; the tabs/badge latent arms + the `--color-neutral-800` @theme pin (the inert-token trap closed at the source); the two busy riders (Expenses row-delete; Settings budget-delete + the result surfaced); the per-account buckets (login-acct 30/15, forgot-acct 20/15 — above the IP caps, before the lookups, no enumeration oracle); the isRecordNotFound seam + the ten [id] catch arms; the a11y scrollThrough extension to the five anon legs → **R-19.3** the verification: three in-commit pin recalibrations (the login-reset exact-string family — the ring arm joins the constants; the docs-counts lockstep 961→1005 / 66→67 / 108→110 / the badge 1069→1115 / the pins row 40→41 with parity-222; the V8 hour-only-offset pin corrected to the probed reality — `+09` is NaN, null is the contract answer); the dark-404 e2e selector re-pinned to `main.min-h-screen` (the wash rides the main element) | lint 0/0 · tsc 0 · **1005 unit** (67 files; +44) · build · smoke 14/14 · **110 e2e** (+2: the dark-404 leg, the rotating-XFF per-account bound) · all six parity drift gates CLEAN (4 sweeps + fullpage + interior census, 0-event margin) · census MATCH · the five capture faces 98–102 committed (each asserted in-DOM; the 404's minimal-face floor pixel-verified) · docs lockstep everywhere | (this session's execution commit) |
| v2.20.0 | 223 | **R-20** (the dead-signout and dark-surface completion round — findings-led, the standing directive with the reference STABLE on all four drift layers). The audit round first: the cold baseline gates green at the documented v2.19.0 ship state (lint 0/0 · tsc 0 · 1005/1005 · build · smoke 14/14 · e2e 110/110 · census MATCH — the environment SURVIVED the sandbox recycle, no rebuild needed); the reference-stability probe STABLE on all four standing layers (bundle fingerprint BMU57229 · the ZERO demo census · the 256/9 desktop sidebar · the TRUE-390 functional mobile menu — the owner's named focus verified live again); the ledger re-triaged (the standing 1 minimatch moderate, dev-chain, range-unreachable — no NEW runtime-chain advisory); the standing deliverables re-verified (.env `file:../db/custom.db` + census MATCH · .env.example parity (diff clean) · sitemap/robots/manifest + OG family · the vitest + playwright configs standing · the Tailwind v4 sweep clean — zero phantom breakpoints, zero inert tokens). The session-223 fresh-eyes audit (three parallel Mode-C passes: the R-19 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 2 High / 6 Medium / 4 Low raw, every material claim re-verified at file:line — the two csv claims live-reproduced under TZ-switching probes on ALL THREE zones, the contrast claims computed to two decimals, the dead-signout code path traced through the store's state machine; the audit's two top security ratings adjudicated as RE-DISCOVERIES of the standing F-217m owner-decision record — not reopened; the gradient-ink family re-confirmed as the sanctioned register's documented parity deviation). Shipped: **R-20.1** the pins born RED 19 (parity-223.test.ts born RED 17 — the signOut wiring, the error.tsx negative form, the per-page tooltip site counts, the csv anchor + MONTH_ONLY, the pill pairing split, the textDark family, the four ring sites, the tile ternaries, the import ink, the logout revocation, the verify unification; csv.test.ts +6 TZ-switching behavioral — the time-suffixed rolled nulls, the valid time-suffixed staging, the month-only nulls, the named-with-day controls) + the e2e leg (+1: the DESKTOP sign-out — with the F-223k discovery mid-flight: the tokenVersion eviction poisons the suite's shared storageState, both sign-out legs re-mint the state file; the login budget counted 7/10) + the in-commit recalibrations (parity-222's error.tsx pin → the negative form; the login-reset ring count 4→5; shell-parity's NAV_LAYOUT pill; login-reset's sentBack exact string) → **R-20.2** the cures: the signOut wiring (the dead helper called at last); the error.tsx arm dropped (the F-219a genus restored); the two donut Tooltips (the sibling form; the per-page site counts replace the presence-only pins); the csv `(?!\d)` anchor + the MONTH_ONLY rejection (the doctrine's completion); the NAV_LAYOUT pill split (the desktop pairing unconditional, the mobile twin keeps its arms); the INVESTMENT_TYPES textDark steps + the isDark chip ink; the four ring sites (sentBack · the coach chips + Send · the reset-password back); the income/expenses isDark tile ternaries (the light rendering byte-identical — all six drift gates stayed CLEAN with no re-derivation); the import alert red-700; the logout tokenVersion bump (the try/catch + the stale docblock cured in-commit); the verify no-pending unification → **R-20.3** the verification: the full offline gate + ALL SIX drift gates CLEAN (0-event margin) + census MATCH + `bun audit` unchanged + the capture set 103-110 (eight faces, each asserted in-DOM: the desktop menu + the post-signout login wall; the light-mode green-400 pill; the dark 400-level chip inks; the dark alpha-tint tiles; the keyboard-focused coach chip ring; the dark donut tooltip panel; the time-suffixed staging preview) + the docs lockstep (docs-counts 1005→1029 / 67→68 / 110→111 / the badge 1115→1140 / the pins row 41→42 with parity-223; README badge + stack + hierarchy + testing + status; AGENTS counts + the storageState-revocation gotcha; CLAUDE gate contract; PAD v2.20.0 revision block + the live sites; SKILL counts) | lint 0/0 · tsc 0 · **1029 unit** (68 files; +24) · build · smoke 14/14 · **111 e2e** (+1) · all six parity drift gates CLEAN (0-event margin, no re-derivation) · census MATCH · the eight capture faces 103-110 committed (each asserted in-DOM) · docs lockstep everywhere | (this session's execution commit) |
| v2.21.0 | 224 | **R-21** (the date-guard completion and resilience-surface round — findings-led, the standing directive with the reference STABLE on all four drift layers). The audit round first: the cold baseline gates green at the documented v2.20.0 ship state (lint 0/0 · tsc 0 · 1029/1029 · build · smoke 14/14 · 111/111 e2e · census MATCH); the reference-stability probe STABLE on all four standing layers (incl. the TRUE-390 functional mobile menu — the owner's named focus); the ledger re-triaged (unchanged); the neo-crm pattern check aligned (same gate/script/dependency families — the vendored web-application skill IS the distilled pattern set, nothing new to port). The session-224 fresh-eyes audit (three parallel Mode-C passes: the R-20 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 0 High / 2 Medium / 11 Low / 14 Informational raw, every material claim re-verified at file:line, both Mediums live-reproduced: the YMD-slash rollover staged “2026/02/30” as Mar 2 under probes, the verify-oracle numeric tell read off the post-increment ladder). Shipped: **R-21.1** the pins born RED 28 (25 across csv/schemas/search-query/parity-224 + the 3 store-logout behavioral set) + the e2e legs (+11: the nine phone×dark a11y legs, the skip-link Tab-focus leg, the logout-replay leg) + the smoke leg (+1: rounded-full's infinity radius) → **R-21.2** the cures (the 16-item list per §R-21's design): the shape-aware year gate (F-224a), the form-precise month-year family with the TIME tail + the reversed twin (F-224c), the verify first-rung answer (F-224b), the logout honesty pair (F-224d/e — the store checks the `call()` result, surfaces failure through the store-error banner, both signOut helpers gate navigation on the boolean), the global-error dark genus + LoadingBlock aria + the error `<main>` landmark (F-224p/aa), the skip-to-content link (F-224s — first child, sr-only until focus, `#main-content` with `tabIndex -1`), the password `.max(200)` (F-224h), the search LIKE strip (F-224j), the `@source not` family (F-224v — the CSS shrank 48%, verified by before/after sentinel probes; the CSS-comment `*/`-in-glob trap and the root-level-markdown lesson cured mid-flight), the danger-soft `.dark` flip + the vendored-stock KEEP (F-224q), the docblock/comment corrections (F-224f/k/l/m/n/y/w) → **R-21.3** the verification: the full offline gate, then ALL SIX drift gates CLEAN (0-event margin, no re-derivation — the cures visually inert by construction) + census MATCH + `bun audit` unchanged. **Mid-flight discovery (the order-poisoning lesson)**: the F-224d logout-replay leg originally minted the DEMO account — the fixed content-type fix let the logout EXECUTE, the USER-level tokenVersion bump evicted the shared auth.setup storageState, and every later shared-state spec failed with login-wall redirects (each passing in isolation); the leg rewritten onto a SCRATCH user (the data-import doctrine), the suite 122/122. The capture set 111-116 (six faces, each asserted in-DOM: the import date-guard preview; the skip link revealed on first Tab; the phone 390 dark Dashboard + Expenses; the verify first-rung; the drawer sign-out wall) + the docs lockstep (docs-counts 1029→1060 / 68→71 / 111→122 / 14→15 / the badge 1140→1182 / the pins row 42→43 with parity-224 + the two new site pins — the §7.1 E2E row and the ADR-006 e2e count, live-tense sites no pin had watched; README badge + stack + hierarchy + testing + status rows; AGENTS counts + the @source family + the order-poisoning + the rounded-full gotchas; CLAUDE gate contract + smoke line; PAD v2.21.0 revision block + the live sites + §10's F-224i row; DEPLOYMENT's production warning; SKILL counts) | lint 0/0 · tsc 0 · **1060 unit** (71 files; +31) · build · smoke 15/15 · **122 e2e** (+11) · all six parity drift gates CLEAN (0-event margin) · census MATCH · the six capture faces 111-116 committed (each asserted in-DOM) · docs lockstep everywhere | (this session's execution commit) |
| v2.22.0 | 225 | **R-22** (the designated-tail completion and tooling-hygiene round — findings-led, the standing directive with the reference STABLE and the TRUE-390 mobile menu re-verified). The audit round first: the cold baseline gates green at the documented v2.21.0 ship state (lint 0/0 · tsc 0 · 1060 unit · build · smoke 15/15 · 122 e2e · census MATCH — after the INTAKE FINDING was cured by a reseed: the R-21 capture set's scratch user had left custom.db at users=2, the census the tripwire); the six drift gates CLEAN + census MATCH; `bun audit` unchanged; the neo-crm pattern check aligned (no new upstream commits). The session-225 fresh-eyes audit (three parallel Mode-C passes: the R-21 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 1 High standing (F-217m re-confirmed, not reopened) / 5 Medium / 8 Low / 9 Informational raw, every material claim re-verified at file:line, the two csv claims live-probed across three zones, the skip-link paint order live-reproduced against the real dev server at both width edges, the V8 design probes validated before implementation). Shipped: **R-22.1** the pins born RED (9 csv tests + 19 parity-225 source pins + 4 e2e legs; one legitimate recalibration — the parity-222 designator pin, the contract grew) → **R-22.2** the cures: the numeric year-month partial null-arm (F-225a); the designated-tail family (F-225b — the ISO arm's \s* + UTC/GMT tails, the named/day-first/numeric locale-designated arms staging the WRITTEN calendar, whole-parse- and round-trip-guarded, the two-digit designated numerics skipping per the remap doctrine); the verify/resend email-keyed buckets (F-225c — verify-acct 60/15, resend-acct 10/15, the F-222p citation corrected); the skip link's focus:z-[60] (F-225d); the capture family's own-database retrofit (F-225e — captures-218/219/224 + captures-225 born on the convention: db/captures.db seeded per run, the census tripwire at exit, the :3000 refusal; live-verified end-to-end); the hygiene tail (F-225f–m) → **R-22.3** the verification: the full offline gate, then ALL SIX drift gates CLEAN at 0-event margin + census MATCH + `bun audit` unchanged. The capture set 117-118 (two faces, each asserted in-DOM: the skip link at 390 topmost; the import preview with the designated tails staging Nov 1 in New York while the numeric partial skips) + the docs lockstep (docs-counts 1060→1088 / 71→72 / 122→126 / the badge 1182→1214 / the pins row 43→44 with parity-225; README + AGENTS + CLAUDE + PAD + SKILL; the AGENTS gotchas: the capture-db doctrine, the equal-z paint order) | lint 0/0 · tsc 0 · **1088 unit** (72 files; +28) · build · smoke 15/15 · **126 e2e** (+4) · all six parity drift gates CLEAN (0-event margin) · census MATCH · the two capture faces 117-118 committed (each asserted in-DOM) · docs lockstep everywhere | (this session's execution commit) |
| v2.24.0 | 227 | **R-24** (the build-gate repair and wrong-row identity round — findings-led, the standing directive with the reference STABLE on all four standing drift layers and the TRUE-390 mobile menu re-verified by probe:ref). The audit round first: the cold baseline FAILED at HEAD — `bun run build` exited 1 on the owner's post-226 session-log commits (the `docs/worklog.md` symlink loop, F-227a; lint/tsc/unit/smoke/e2e all passed — only the build leg walks symlinks); after the repoint the full baseline gates green at the exact v2.23.0 ship state (lint 0/0 · tsc 0 · 1136/1136 unit (73 files) · build · smoke 15/15 · 135/135 e2e · census MATCH); the reference-stability probe STABLE (the bundle md5 unchanged, the demo data zero, the desktop nav + the TRUE-390 menu standing); `bun audit` unchanged (1 moderate dev-chain, the documented deferral); the neo-crm pattern check aligned (no new upstream commits since Nov 5 — nothing to port); the SEO surface live-verified (sitemap 9 URLs, robots, manifest). The session-227 fresh-eyes audit (three Mode-C passes: the R-23 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 1 High / 1 Medium / 6 Low / 8 Informational raw, every material claim re-verified at file:line by the driving session — the investments wrong-row bug live-reproduced by the UI pass (two ZZQA lots: the duplicate-key warning + the Edit prefill landing on the FIRST record) and re-verified at file:line; the TOCTOU/excludes/sr-only/contrast claims verified by read). Shipped: **R-24.1** the pins born RED (21 of 23 parity-227 source pins RED — the two F-227a pins green by design, the symlink repair was the cold-baseline fix; 3 finance behavioral pins RED; 1 e2e leg RED with the honest wrong-row failure — Expected "Second Duplicate Lot" / Received "First Duplicate Lot"; one legitimate recalibration — the parity-222 F-222o import-line pin, a contract that grew) → **R-24.2** the cures: THE SYMLINK-LOOP BUILD REPAIR (F-227a — `docs/worklog.md` repointed to `../worklog.md` via git plumbing, the owner's alias intent preserved); THE HOLDINGS IDENTITY CURE (F-227b — the id rides the portfolioStats seam, `<tr key={row.id}>`, resolve by `i.id === row.id`, id-less rows' buttons inert); THE CONDITIONAL-MUTATION REFACTOR (F-227c + F-227l — the 10 [id] PUT/DELETE sites across the five families on the atomic updateMany/deleteMany form with ownerId in the WHERE, the P2003 isForeignKeyViolation seam answering BAD_REQUEST on the transactions account-link race); the low tail (F-227d the artifact excludes; F-227e the investments Edit sr-only tail; F-227f the destructive-variant contrast citations; F-227m the analytics toDate routing; F-227n the dead radius tokens retired) → **R-24.3** the verification: the full offline gate, then ALL SIX drift gates CLEAN + census MATCH + `bun audit` unchanged. The capture set 122-124 (three faces on the own-database convention, each asserted in-DOM: the duplicate-symbol Edit dialog opening the SECOND record; the mobile drawer at 390 with the 9 destinations + Sign Out; the row-context Edit buttons on the seeded corpus) + the docs lockstep (docs-counts 1136→1162 / 73→74 / 135→136 / the badge 1271→1298 / the pins row 45→46 with parity-227; README + AGENTS + CLAUDE + PAD + SKILL; the AGENTS gotcha: the relative-symlink resolution doctrine) | lint 0/0 · tsc 0 · **1162 unit** (74 files; +26) · build · smoke 15/15 · **136 e2e** (+1) · all six parity drift gates CLEAN · census MATCH · the three capture faces 122-124 committed (each asserted in-DOM) · docs lockstep everywhere | (this session's execution commit) |
| v2.23.0 | 226 | **R-23** (the escape-family completion and per-casing metadata round — findings-led, the standing directive with the reference STABLE on all four standing drift layers and the TRUE-390 mobile menu re-verified by probe:ref). The audit round first: the cold baseline gates green at the documented v2.22.0 ship state (lint 0/0 · tsc 0 · 1088 unit (72 files) · build · smoke 15/15 · 126 e2e · census MATCH — the pristine-clone intake: bun install · fresh .env · db:push/db:seed · the chromium-1254 install); the reference-stability probe STABLE (the bundle md5 unchanged, the demo data zero, the desktop nav + the TRUE-390 menu standing); the six drift gates CLEAN at 0-event margin; `bun audit` unchanged (1 moderate dev-chain, the documented deferral); the neo-crm pattern check aligned (no new upstream commits since Nov 5 — nothing to port). The session-226 fresh-eyes audit (three Mode-C passes: the R-22 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 0 High / 4 Medium / 8 Low / 8 Informational raw, every material claim re-verified at file:line by the driving session — the csv escape claims live-probed under TZ switching across three zones (probe-226-csv: seven families staging wrong days AND a wrong year), the dark menu surface live-probed on BOTH apps (probe-226-menu: the reference's panel measures the token family rgb(10,10,10)/rgb(38,38,38) vs our stone-900 literals), the ring-offset claim ADJUDICATED INVERTED by live probe (probe-226-ring: the reference itself carries ring-offset-background and computes the offset to its --background — our TABS_SEGMENTED lacked the class and painted a #fff halo on dark pages), and the V8 design probes run BEFORE implementation (probe-226-v8: the named-zone acceptance set, the compound tails, the meridiem, the weekday prefix, the separator lenience, plus the rejector-tail design hazard probe — "2026-11-01" would match a bare-offset tail). Shipped: **R-23.1** the pins born RED (12 csv escape tests + 34 parity-226 source pins + the parity-225 window/list extensions + 9 per-casing e2e legs; three legitimate recalibrations — the parity-222 designator pin, the parity-223 MONTH_ONLY pin, the schemas verify/resend message pins, all contracts that grew) → **R-23.2** the cures: the designated-tail escape completion (F-226a — the `i` flag, the named-zone set, the compound suffixes, the weekday prefix, the meridiem, the lenient separators, the name-year-day arm, the rejector family's designated NAMED tail with the bare offset deliberately excluded); the per-casing metadata (F-226b — eight pass-through segment layouts exporting pageMetadata at the lowercase routes; /Dashboard keeps the ROOT head); the API error logging (F-226c — the logApiError seam + every catch site across the 30 route files + the session guard); the Transaction compound index (F-226d); the low tail (F-226e–r) → **R-23.3** the verification: the full offline gate, then ALL SIX drift gates CLEAN + census MATCH + `bun audit` unchanged. The capture set 119-121 (three faces, each asserted in-DOM: the lowercase /income serving its own head + canonical while /Dashboard keeps the bare title; the open user menu measuring the reference's dark token panel; the focused Analytics tab painting the dark ring offset) + the docs lockstep (docs-counts 1088→1136 / 72→73 / 126→135 / the badge 1214→1271 / the pins row 44→45 with parity-226; README + AGENTS + CLAUDE + PAD + SKILL; the AGENTS gotchas: the V8-probe doctrine, the sibling-doctrine non-transfer, the rejector-tail hazard) | lint 0/0 · tsc 0 · **1136 unit** (73 files; +48) · build · smoke 15/15 · **135 e2e** (+9) · all six parity drift gates CLEAN · census MATCH · the three capture faces 119-121 committed (each asserted in-DOM) · docs lockstep everywhere | (this session's execution commit) |
| v2.25.0 | 228 | **R-25** (the second holdings surface and hygiene round — findings-led, the standing directive with the reference STABLE on all standing drift layers and the TRUE-390 mobile menu re-verified by probe:ref; the cold baseline GREEN at HEAD — the v2.24.0 ship state reproduced exactly, no discovery). The audit round first: the standing layers re-verified (the reference STABLE — bundle md5 unchanged, demo data zero, the desktop nav 256/9, the TRUE-390 menu opens with 9 links; `bun audit` unchanged — 1 moderate dev-chain, the documented deferral; neo-crm unchanged since Nov 5 — nothing to port; the SEO surface verified on the artifact). The session-228 fresh-eyes audit (three Mode-C passes: the R-24 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 0 High / 0 Medium / 7 Low / 10 Informational raw, every material claim re-verified at file:line by the driving session — the chart-symbol/CSV-date/upcoming-id/equalizer/upload-lifecycle/FK-index/projection/budgets/aria/docblock/token claims all verified by read; the R-24 cures re-verified holding in both passes). Shipped: **R-25.1** the pins born RED (20 parity-228 source pins — 19 RED + 1 green-by-design, the LIVE-members-stay pin; 6 finance behavioral pins — 4 gainBySymbol + 2 upcomingAlerts id; 4 uploads-capacity seam pins on temp-dir fixtures; 1 e2e leg RED with the honest overlap failure — Expected 7 bars / Received 8) → **R-25.2** the cures: THE SECOND HOLDINGS SURFACE (F-228a — gainBySymbol joins the finance seams, the chart data + Cells ride it, one bar per symbol); THE TIMING-EQUALIZER FAMILY COMPLETION (F-228e — verify/resend burn the equalizer on their miss branches, the login S72-C pattern, the DB-write residual documented); THE UPLOAD CAPACITY CEILING (F-228f + F-228i — 256 MB / 4096 files, uploadsCapacity walk, ERR.STORAGE_FULL 507, the memoized repo root); THE SCHEMA ROUND (F-228g + F-227h — @@index([accountId]) on Transaction, @@index([resetToken]) on User, db:generate + db:push landed); the low tail (F-228b the eight dead tokens retire + eleven comment carriers reworded — two in button.tsx the audit missed — the built CSS sentinel-probed 104,409 → 103,673 bytes with the live utilities staying; F-228c the CSV Date string-slice; F-228d the upcoming id; F-228h the getSessionUser projection; F-228j the budgets NOT_FOUND alignment; F-228k the aria-controls pair; F-228l the two docblocks) → **R-25.3** the verification: the full offline gate, the CSS sentinel probe, ALL SIX drift gates CLEAN + census MATCH + `bun audit` unchanged; two legitimate pin recalibrations (the palette-pins F-214e row and the dark-tokens subtle-flip assertion — contracts that legitimately shrank). The capture set 125-127 (the aggregated chart, the mobile drawer at 390, the filters aria link) + the docs lockstep (docs-counts 1162→1192 / 74→75 / 136→137 / the badge 1298→1329 / the pins row 46→47 with parity-228; README + AGENTS (two new gotchas: the inverse-hazard tidy lesson, the whole-tree carrier grep) + CLAUDE + PAD + SKILL) | lint 0/0 · tsc 0 · **1192 unit** (75 files; +30) · build · smoke 15/15 · **137 e2e** (+1) · all six parity drift gates CLEAN · census MATCH · the CSS sentinel probe (104,409 → 103,673 bytes) · the three capture faces 125-127 committed (each asserted in-DOM) · docs lockstep everywhere | (this session's execution commit) |
| v2.26.0 | 229 | **R-26** (the empty-state repair and dead-carrier retirement round): the cold baseline GREEN at the v2.25.0 ship state (lint 0/0 · tsc 0 · 1192/1192 unit (75 files) · build · smoke 15/15 · 137/137 e2e · census MATCH); the standing asks re-verified (probe:ref STABLE — the bundle md5 unchanged, the demo data zero, the desktop nav 256/9, the TRUE-390 menu opens with 9 links; `bun audit` unchanged (1 moderate dev-chain); neo-crm unchanged (b3d0fbe); the SEO surface green (smoke leg 12); the .env contract, the vitest/playwright configs, the .env.example standing); the fresh-eyes audit (three Mode-C passes → 0 Critical / 0 High / 1 Medium / 6 Low / 5 Informational raw, every claim re-verified; two claims ADJUDICATED INVERTED by live probes; the whole-tree scan grew the audit's nine dead carriers to thirty); the plan v2.26.0 written and validated. **R-26.1** the pins born RED (16 parity-229 source pins; the finance design-input pin green at birth; the e2e leg RED with the honest flat-chart failure) → **R-26.2** the cures (the Income-tab gate F-229a; the budgets P2002 arm F-229b; the seed UTC-midnight staging F-229c; the ~28-site carrier retirement F-229d; the dialog docblock truth F-229e; the dead-API retirement F-229f; the search note F-229h; the hygiene pass F-229j) + two legitimate pin recalibrations (parity-226's pill arm; docs-counts) → **R-26.3** the verification: lint 0/0 · tsc 0 · **1211 unit (76 files, +19)** · build · smoke 15/15 · **138 e2e (+1 — the Income empty-state leg)** · THE CSS SENTINEL PROBE (all 30 dead selectors leave the built stylesheet — 103,673 → 100,431 bytes — every live form stays) · ALL SIX drift gates CLEAN · census MATCH after the reseed (78 transactions, the today-edge inside the 54..108 bounds) · `bun audit` unchanged | lint 0/0 · tsc 0 · **1211 unit (76 files)** · build · smoke 15/15 · **138 e2e** · six drift gates CLEAN · census MATCH | (this session's execution commit) |
| v2.27.0 | 230 | **R-27** (the register-and-hygiene round — findings-led, the standing directive with the reference STABLE on all standing drift layers and the TRUE-390 mobile menu re-verified by probe:ref; the cold baseline GREEN at HEAD — the v2.26.0 ship state reproduced exactly, no discovery). The audit round first: the standing layers re-verified (probe:ref STABLE — the bundle md5 unchanged, the demo data zero, the desktop nav 256/9, the TRUE-390 menu opens with 9 links; `bun audit` unchanged (1 moderate dev-chain, the documented deferral); neo-crm unchanged (b3d0fbe); the SEO surface green (smoke leg 12); the .env contract, the vitest/playwright configs, the .env.example standing). The session-230 fresh-eyes audit (three Mode-C passes: the R-26 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 0 High / 2 Medium / 4 Low / 5 Informational raw, every material claim re-verified at file:line by the driving session; TWO claims adjudicated by live reference probes — the StatCard genus CONFIRMED (probe-230c: the reference's own Avg Monthly tiles carry the identical saturated gradients + minus-100 labels + white bold values) and the Cash Flow zero-data claim INVERTED (probe-230: the reference's own card renders four recharts surfaces unconditionally at its standing zero demo data — our unconditional render IS the genus); the Pass B findings re-derived the recorded tail (F-217m/F-215m/F-218t/F-224k) without new information). The plan v2.27.0 written (the F-230a-h ledger + the R-27 section) and validated against the tree. **R-27.1** the pins born RED (7 parity-230 checks — six RED: the StatCard register entry, the toDate tidy, the phantom-comment retirement, the ai-coach message-id keys ×2, the CARD_TITLE_OVERRIDE truth; one green-by-design genus guard) → **R-27.2** the cures: THE STATCARD REGISTER ENTRY (F-230a — the F-224y-form note on the analytics StatCard docblock, all three arms measured 2.24:1 / 3.08:1 / 3.01:1 + the white-value note, the genus citation probe-230c; NO visual change — a recolor would deviate from parity); THE LASTSYNCEDAT TODATE TIDY (F-230c — accounts:171 routes through toDate, behavior-identical); THE PHANTOM-BREAKPOINT COMMENT REWORDS (F-230d — the two F-207a-history quotes reworded to prose); THE AI-COACH MESSAGE-ID KEYS (F-230e — the model gains an id, a module-level counter mints at the three construction sites (a ref counter trips react-hooks/refs — the greeting consumes the mint DURING render; the module form is the sanctioned mint), the list keys by message.id; the import preview + OTP boxes documented as index-identity); THE CARD_TITLE_OVERRIDE TRUTH (F-230f) → **R-27.3** the verification: lint 0/0 · tsc 0 · **1218 unit (77 files, +7)** · build · smoke 15/15 · **138 e2e** (no new leg — every cure visually inert or comment-only by construction) · ALL SIX drift gates CLEAN · census MATCH · `bun audit` unchanged; the recorded-not-cured tail stays documented (F-230b the inverted Cash Flow adjudication, F-230g the pre-auth fetch standing, F-230h the clean-surface records) | lint 0/0 · tsc 0 · **1218 unit (77 files)** · build · smoke 15/15 · **138 e2e** · six drift gates CLEAN · census MATCH | (this session's execution commit) |
| v2.28.0 | 231 | **R-28** (the a11y-tail, logging-grain, and dead-family round — findings-led, the standing directive with the reference STABLE on all standing drift layers and the TRUE-390 mobile menu re-verified by probe:ref; the cold baseline GREEN at HEAD — the v2.27.0 ship state reproduced exactly, no discovery). The audit round first: the standing layers re-verified (probe:ref STABLE — the bundle md5 unchanged, the demo data zero, the desktop nav 256/9, the TRUE-390 menu opens with 9 links; `bun audit` unchanged (1 moderate dev-chain, the documented deferral); neo-crm unchanged (b3d0fbe); the SEO surface green (smoke leg 12); the .env contract, the vitest/playwright configs, the .env.example standing). The session-231 fresh-eyes audit (three Mode-C passes: the R-27 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 0 High / 0 Medium / 8 Low / 12 Informational raw, every material claim re-verified at file:line by the driving session; ONE claim adjudicated by live probes + a bundle grep — the Analytics day-of-week card is OUR OWN SUPERSET (probe-231/b/c: no such card on any of the reference's four Analytics tabs at its standing zero demo data, and the reference bundle carries no such string — the amber fill was a palette mis-assignment, never parity); the two Pass-B Lows adjudicated as AUDIT-BRIEF CONTRACT-TEXT ERRORS (F-231s — the uploads GET public capability-URL posture and the forgot 10/15 bucket are the recorded contracts; the code matches them)). The plan v2.28.0 written (the F-231a-s ledger + the R-28 section) and validated against the tree. **R-28.1** the pins born RED (the parity-231 source pins — the glyph aria-hidden, the heading-focus effect + h1 tabIndex arms, the z-50 re-pin, the icons.tsx retirement, the N-89c6 relocation, the TrendingDown symmetry, the day-of-week fill, the expenses memo, the peer retirement, the docblock fold, the multipart log, the ENOENT gate, the dead-family absence, the citation reword; one e2e leg RED with the honest focus-failure) → **R-28.2** the cures: THE EXPENSES DIALOG GLYPH HIDING (F-231a); THE AUTH-CARD VIEW-SWAP FOCUS (F-231b — mount-guarded heading focus on every transition, the verify box-1 pattern preserved); THE DROPDOWNCONTENT Z-PIN (F-231c); THE ICONS.TSX RETIREMENT (F-231d — the N-89c6 note relocated); THE DAY-OF-WEEK FILL (F-231e — CHART_COLORS.expenses, drift-inert by construction); THE UPLOAD MULTIPART LOG (F-231f); THE UPLOADS GET ENOENT GATE (F-231g); THE CRM-ERA DEAD-FAMILY RETIREMENT (F-231h — DialogFooterWide, DIALOG_FOOTER_WIDE, DIALOG_CONTENT.wide, Avatar/initialsOf; the Event/Activity citations reworded; the F-227f register keeps the shadcn-stock arms); the low tail (F-231i-l) → **R-28.3** the verification: lint 0/0 · tsc 0 · **1235 unit (78 files, +17)** · build · smoke 15/15 · **139 e2e (+1 — the view-swap focus leg)** · ALL SIX drift gates CLEAN · census MATCH · `bun audit` unchanged; the whole-tree carrier invariant caught the round's own recursive genus twice (both reworded); the capture set 134-136 verified in-DOM with the census tripwire MATCH; the recorded tail stays documented (F-231m-s) | lint 0/0 · tsc 0 · **1235 unit (78 files)** · build · smoke 15/15 · **139 e2e** · six drift gates CLEAN · census MATCH | (this session's execution commit) |
| v2.29.0 | 232 | **R-29** (the dead-stock retirement, carrier-net repair, and dialog-focus round — findings-led, the standing directive with the reference STABLE on all standing drift layers and the TRUE-390 mobile menu re-verified by probe:ref; the cold baseline GREEN at HEAD — the v2.28.0 ship state reproduced exactly, no discovery). The audit round first: the standing layers re-verified (probe:ref STABLE — the bundle md5 unchanged, the demo data zero, the desktop nav 256/9, the TRUE-390 menu opens with 9 links; `bun audit` unchanged (1 moderate dev-chain, the documented deferral); neo-crm unchanged (b3d0fbe); the SEO surface green (smoke leg 12); the .env contract, the vitest/playwright configs, the .env.example standing). The session-232 fresh-eyes audit (three Mode-C passes: the R-28 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 0 High / 0 Medium / 13 Low / 9 Informational raw, every material claim re-verified at file:line by the driving session; R-28's twelve pinned cures all verified holding — the F-231b guards StrictMode-idempotent, the F-231h family intact, the token system mechanically airtight, the z-layer map and portal exclusions standing; no adjudications this round — every claim confirmed as-found). The plan v2.29.0 written (the F-232a-o ledger + the R-29 section) and validated against the tree. **R-29.1** the pins born RED (the parity-232 source pins — twenty checks, eighteen RED + two green-by-design genus guards; one e2e leg RED with the honest focus failure — Expected focused, Received inactive, verified by the stash round-trip) → **R-29.2** the cures: THE VENDORED DEAD-STOCK RETIREMENT (F-232a — card/table/label/input.tsx + the INPUT_BASE/DIALOG_TEXTAREA/CHECKBOX riders + the surviving Event/Activity citation + the F-230f pin retirement + the parity-228 carriers-list recalibration); THE CARRIER-NET REPAIR (F-232b — the tabs citation reworded, the PROSE_ALLOWLIST compound entry REMOVED, the globals comment reworded); THE EXPENSES DIALOG STEP-SWAP FOCUS (F-232c — the prevStepRef value-guard effect); THE HAMBURGER ARIA-CONTROLS (F-232d); THE ALWAYS-MOUNTED LOADING LIVE REGION (F-232e — outside main, the F-218h form; the parity-224 F-224aa pin re-anchored to the new seam); THE STALE AMBER ARM RETIREMENT (F-232f); THE UPLOAD CAPACITY POST-WRITE RE-CHECK (F-232g — unlink on breach); the low tail (F-232h); THE LINE-STRONG REGISTRATION (F-232i) → **R-29.3** the verification: lint 0/0 · tsc 0 · **1254 unit (79 files, +19)** · build · smoke 15/15 · **139 e2e** (the focus assertions extend the +$10 quick-add leg) · ALL SIX drift gates CLEAN · census MATCH · `bun audit` unchanged; the whole-tree carrier invariant caught the round's own recursive genus twice more (the retirement comments named the retired identifiers; reworded — five catches across three sessions); the captures verified in-DOM with the census tripwire MATCH; the recorded tail stays documented (F-232j-o) | lint 0/0 · tsc 0 · **1254 unit (79 files)** · build · smoke 15/15 · **139 e2e** · six drift gates CLEAN · census MATCH | (this session's execution commit) |
| v2.30.0 | 233 | **R-30** (the OTP-paste, live-region, and dependency-hygiene round — findings-led, the standing directive with the reference STABLE on all standing drift layers and the TRUE-390 mobile menu re-verified by probe:ref; the cold baseline GREEN at HEAD — the v2.29.0 ship state reproduced exactly, no discovery). The audit round first: the standing layers re-verified (probe:ref STABLE — the bundle md5 unchanged, the demo data zero, the desktop nav 256/9, the TRUE-390 menu opens with 9 links; `bun audit` unchanged (1 moderate dev-chain, the documented deferral); neo-crm unchanged (b3d0fbe); the SEO surface green (smoke leg 12); the .env contract, the vitest/playwright configs, the .env.example standing). The session-233 fresh-eyes audit (three Mode-C passes: the R-29 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 0 High / 1 Medium / 5 Low / 10 Informational raw, every material claim re-verified at file:line by the driving session; R-29's nine pinned cures all verified holding; ONE audit-brief location attribution corrected against the plan's own row). The plan v2.30.0 written (the F-233a-o ledger + the R-30 section) and validated against the tree. **R-30.1** the pins born RED (the parity-233 source pins — 18 checks, fourteen RED + four green-by-design genus guards; the verification-code behavioral battery — 10 checks, all RED at the missing seam; one e2e leg RED with the honest URL failure — the query stayed in the address bar at the pre-cure build, verified by the stash round-trip) → **R-30.2** the cures: THE OTP PASTE/AUTOFILL DISTRIBUTION (F-233a — the pure applyCodeInput seam + the login-card delegation, no maxLength on the boxes); THE ORPHANED LABEL-PRIMITIVE DEPENDENCY RETIREMENT (F-233b — bun remove + lockfile regen + the import/manifest/lockfile pins); THE LOGIN INFO-CALLOUT LIVE REGION (F-233c — the pre-existing sr-only region in the verify view; the InfoCallout visual-only; the F-219v pin re-anchored); THE SETTINGS SAVE GUARD (F-233d); THE IMPORT DOUBLE-PARSE RETIREMENT (F-233e); THE RESET-TOKEN URL STRIP (F-233f — captured-once + replaceState; the round-trip leg recalibrated); THE UPLOAD BREACH-UNLINK ISOLATION (F-233g); THE AUTH-FACE SUSPENSE BOUNDARIES (F-233h); the low tail (F-233i/j/k) → **R-30.3** the verification: lint 0/0 · tsc 0 · **1282 unit (81 files, +28)** · build · smoke 15/15 · **140 e2e** (+1) · ALL SIX drift gates CLEAN · census MATCH · `bun audit` unchanged; the recursive F-229d genus caught twice more in two new domains (the plan-text correction note tripping its own pin; the Suspense comments naming the hook the route-case scan greps for — the test-source edition); the captures 140-142 verified in-DOM with the census tripwire; the recorded tail stays documented (F-233l-o) | lint 0/0 · tsc 0 · **1282 unit (81 files)** · build · smoke 15/15 · **140 e2e** · six drift gates CLEAN · census MATCH | (this session's execution commit) |
| v2.31.0 | 234 | **R-31** (the in-flight-guard, OTP-restart, and logout-gate round — findings-led, the standing directive with the reference STABLE on all standing drift layers and the TRUE-390 mobile menu re-verified by probe:ref; the cold baseline GREEN at HEAD — the v2.30.0 ship state reproduced exactly, no discovery). The audit round first: the standing layers re-verified (probe:ref STABLE — the bundle md5 unchanged, the demo data zero, the desktop nav 256/9, the TRUE-390 menu opens with 9 links; `bun audit` unchanged (1 moderate dev-chain, the documented deferral); neo-crm unchanged (b3d0fbe); the SEO surface green (smoke leg 12); the .env contract, the vitest/playwright configs, the .env.example standing). The session-234 fresh-eyes audit (three Mode-C passes: the R-30 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 0 High / 0 Medium / 6 Low / 8 Informational raw, every material claim re-verified at file:line by the driving session; R-30's nine pinned cures all verified holding). The plan v2.31.0 written (the F-234a-n ledger + the R-31 section) and validated against the tree. **R-31.1** the pins born RED (the parity-234 source pins — 17 checks; the verification-code restart battery — 3 checks, two RED at the seam + one green-by-design boundary guard; one e2e leg extension born RED with the honest rotation failure — Digit 2 carried the wrong digit at the pre-cure build, verified by the stash round-trip) → **R-31.2** the cures: THE SETTINGS-FETCH TRI-STATE (F-234a — the settled flag in both arms, reset on hydrate/logout; the page's reason line re-keyed; the parity-233 F-233d pin + the parity-217 F-217k pin recalibrated in the same commit); THE IMPORT PARSE SEQUENCE GUARD (F-234b — the monotonic parse token + the in-flight flag; the parity-233 F-233e pin recalibrated); THE FULL-CODE PASTE RESTART (F-234c); THE OTP PASTE E2E LEG (F-234d — riding the existing signup budget); THE UPLOADS CAPACITY-WALK GUARD (F-234e); THE BUDGET-ADD BUSY GUARD (F-234f); THE LOGOUT GATE REORDER (F-234g — gate-first, the cross-site burn dies at 400 un-bucketed); the low tail (F-234h/i/j/k) → **R-31.3** the verification: lint 0/0 · tsc 0 · **1302 unit (82 files, +20)** · build · smoke 15/15 · **140 e2e** (the paste leg extends the existing test) · ALL SIX drift gates CLEAN at 0-event margin · census MATCH · `bun audit` unchanged; the recursive F-229d genus caught once more (the restart cure's own comment coined a hyphenated form — reworded, catch six, the cure-comment edition); the captures 143-145 verified in-DOM with the census tripwire; the recorded tail stays documented (F-234l-n) | lint 0/0 · tsc 0 · **1302 unit (82 files)** · build · smoke 15/15 · **140 e2e** · six drift gates CLEAN · census MATCH | (this session's execution commit) |
| v2.32.0 | 235 | **R-32** (the oracle-reorder, async-scrypt, and live-region-seed round — findings-led, the standing directive with the reference STABLE on all standing drift layers and the TRUE-390 mobile menu re-verified by probe:ref; the cold baseline GREEN at HEAD — the v2.31.0 ship state reproduced exactly, no discovery). The audit round first: the standing layers re-verified (probe:ref STABLE — the bundle md5 unchanged, the demo data zero, the desktop nav 256/9, the TRUE-390 menu opens with 9 links; `bun audit` unchanged (1 moderate dev-chain, the documented deferral); neo-crm unchanged (b3d0fbe); the SEO surface green (smoke leg 12); the .env contract, the vitest/playwright configs, the .env.example standing). The session-235 fresh-eyes audit (three Mode-C passes: the R-31 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 0 High / 1 Medium / 9 Low / 5 Informational raw, every material claim re-verified at file:line by the driving session; R-31's nine pinned cures all verified holding). The plan v2.32.0 written (the F-235a-o ledger + the R-32 section) and validated against the tree (the blast-radius sweep: every cure DOM-inert on the captured faces by construction — the filter Select defaults to the plain option, the dialog Selects are closed, the padding/role/aria changes touch no measured census axis). **R-32.1** the pins born RED (the parity-235 source pins + the password-seam async riders; the auth-reset + http-headers pins recalibrated in the same commit; the F-218a e2e leg extends with the request-level oracle probe — zero new signups) → **R-32.2** the cures: THE AI-COACH GREETING LIVE-REGION SEED (F-235a); THE LOGIN VERIFICATION ORACLE REORDER (F-235b — gate above verify, equalizer burned on the gate branch); THE RESET HONEST-FAILURE ARM (F-235c — the P2024/P2028 → 503 arm); THE ASYNC-SCRYPT SEAM (F-235d — promisified crypto.scrypt, format byte-identical, every call site already async); the functional busy clears (F-235e, six sites); the dialog-close hit area (F-235f); the aria-hidden emoji wraps (F-235g, four sites); the tablist naming (F-235h); the KPI glyph decoupling (F-235i); the guest-wall status face (F-235j); the low tail (F-235k/l/m/n) → **R-32.3** the verification: lint 0/0 · tsc 0 · unit (the parity-235 + recalibrated counts, the docs-counts lockstep in the same commit) · build · smoke 15/15 · 140 e2e (the oracle probe extends the existing leg) · ALL SIX drift gates CLEAN at 0-event margin · census MATCH · `bun audit` unchanged; the captures per the standing rhythm with the census tripwire; the recorded tail stays documented (F-235o + the F-234l-n + standing families) | lint 0/0 · tsc 0 · unit (docs-counts lockstep) · build · smoke 15/15 · 140 e2e · six drift gates CLEAN · census MATCH | (this session's execution commit) |
| v2.33.0 | 236 | **R-33** (the empty-put, transient-503, and revocation-face round — findings-led, the standing directive with the reference STABLE on all standing drift layers and the TRUE-390 mobile menu re-verified by probe:ref; the cold baseline GREEN at HEAD — the v2.32.0 ship state reproduced exactly, no discovery). The audit round first: the standing layers re-verified (probe:ref STABLE — the bundle md5 unchanged, the demo data zero, the desktop nav 256/9, the TRUE-390 menu opens with 9 links; `bun audit` unchanged (1 moderate dev-chain, the documented deferral); neo-crm unchanged (b3d0fbe); the SEO surface green (smoke leg 12); the .env contract, the vitest/playwright configs, the .env.example standing). The session-236 fresh-eyes audit (three Mode-C passes: the R-32 cure surfaces · API/auth/security · UI/a11y/shell — 0 Critical / 0 High / 1 Medium / 8 Low / 11 Informational raw after dedup, every material claim re-verified at file:line by the driving session; R-32's fourteen pinned cures all verified holding; the empty-put 404 live-reproduced against the exact client before planning). The plan v2.33.0 written (the F-236a-r ledger + the R-33 section) and validated against the tree. **R-33.1** the pins born RED (the parity-236 source pins — 39 checks, 38 RED + 1 green-by-design genus guard; the schemas-finance riders — 14 checks, all RED at the missing seams; the parity-235 timer pin; two e2e legs RED against the pre-cure build — the empty-put probe answered 404 and the revocation face never rendered, the stash-free proof via the standing pre-cure .next artifact) → **R-33.2** the cures: THE EMPTY-PUT 400 (F-236a — the updateSchema guard on the five update schemas, `{}` and unknown-only bodies answer the honest 400); THE TRANSIENT-503 FAMILY COMPLETION (F-236b — isTransientDbError joins src/lib/db, ERR.UNAVAILABLE joins the envelope, every DB-touching catch arm across the 19 route files); THE FIELD-CLEAR NORMALIZATION (F-236c — the clearable-date seam at all eight sites, the nullable create twins, color/icon on both twins); the toast-dismiss hit area (F-236d); the dashboard glyph wrap (F-236e); THE MID-FLIGHT REVOCATION FACE (F-236f — the shell's post-hydrate null-user gate renders the guest-wall face); the stale comment reword (F-236g); the parity-235 timer pins (F-236h); the goals valuenow precision (F-236i); the dead-arm register (F-236j); the PAD retrospective forms (F-236k) → **R-33.3** the verification: lint 0/0 · tsc 0 · **1391 unit (84 files, +54)** · build · smoke 15/15 · **142 e2e** (+2, both RED-proven) · ALL SIX drift gates CLEAN at 0-event margin (the interior census after the F-236e standing-allowance re-derivation per the R-7.10 doctrine — +1 unexplained on desktop/phone/landscape, the tablet axis classifies the span into the wrapper-twin genus; the tool-test pins recalibrated same-commit); census MATCH · `bun audit` unchanged; the captures 149-151 verified in-DOM with the census tripwire (the mobile drawer 390 — the standing ask; the revocation face — the round's live lesson: the dev-server face window is sub-poll, the capture holds the /login navigation briefly; the toast dismiss at 26×26px), all three VLM-verified; the F-220f + F-222o pin recalibrations rode the same commit; the recorded tail stays documented (F-236l-r + the standing families) | lint 0/0 · tsc 0 · **1391 unit (84 files)** · build · smoke 15/15 · **142 e2e** · six drift gates CLEAN · census MATCH | (this session's execution commit) |

> The next iteration session (236) has **no open R-item by default** —
> the R-4 ladder CLOSED at v2.8.0, the R-7 card arc at v2.6.0, the R-8
> dependency round at v2.9.0, the R-9 prisma major at v2.10.0, the
> session-214 rounds (R-10 owner-scoping + R-11 palette-completion) at
> v2.11.0, the session-215 live-seam convergence (R-12) at v2.12.0,
> the session-216 verification-gap convergence (R-13) at v2.13.0, and
> the session-217 parity-completion round (R-14) at v2.14.0, and
> the session-218 recovery-loop and perceivability round (R-15)
> at v2.15.0, the session-219 parity-default round (R-16) at
> v2.16.0, the session-220 date-seam completion and dark-surface
> round (R-17) at v2.17.0, the session-221 date-staging
> correctness and perceivable-controls round (R-18) at v2.18.0,
> the session-222 zone-designator completion round (R-19) at
> v2.19.0, and the session-223 dead-signout and dark-surface
> completion round (R-20) at v2.20.0, the session-224 date-guard
> round (R-21) at v2.21.0, the session-225 designated-tail round
> (R-22) at v2.22.0, the session-226 escape-family round (R-23)
> at v2.23.0, the session-227 build-gate round (R-24) at v2.24.0,
> the session-228 holdings round (R-25) at v2.25.0, the session-229
> empty-state round (R-26) at v2.26.0, and the session-230
> register-and-hygiene round (R-27) at v2.27.0
> (the advisory census still 1 — minimatch alone, range-unreachable
> until typescript-estree moves; the re-triage duty stays). A fresh
> audit's findings always pre-empt (Critical/High first); the natural
> next rounds are the standing residuals' watch (the F-210a scroll-model
> genus — cure only if a future round re-architects the shell),
> F-214l's whole-store subscription note (a `useShallow` sweep, only if
> a page ever proves render-bound), F-215m's inert role dimension (a
> schema cleanup, only if tenancy ever needs roles), the F-217m
> in-band-delivery default posture (the owner-decision item), or R-5
> (the LLM provider wiring) on the owner's explicit ask. The standing
> residuals stay the documented content supersets (the populated
> tables/charts our corpus renders where the reference's empty
> workspace shows placeholders) + the F-210a scroll-model genus
> (absorbed into the
> fullpage tables by the stability call — cure only if a future round
> re-architects the shell).
