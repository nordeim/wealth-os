# WealthOS Remediation Plan — v2

> The living, versioned remediation program for this repo. This file is the
> single source of truth for: what the audits found, what is being fixed, in
> what order, by which iteration session, and with what verification. It
> replaces the session-203 placeholder (a one-line dummy committed by the
> owner with the directive *"create validated remediation plan with versioning
> for each iteration session"* — this document is that plan).
>
> **Current version: v2.14.0** (session 217 — the parity-completion
> round R-14: the fresh-eyes audit's blind-spot cluster cured — the
> surfaces the gates structurally cannot see. The dark-mode token
> completion (F-217c High: `--color-surface/foreground/ink/muted-ink/
> line/line-soft/line-strong` never flipped in `.dark`, so every
> dialog, the Select listbox, and the sidebar user-menu rendered
> WHITE panels with light text — 1.09:1, live-verified, while the
> reference's own dark surfaces measure #0a0a0a/#262626/#fafafa);
> the Expenses filters popover's F-216i outside-close killing the
> portaled Select (F-217a Medium — mouse users could not apply a
> category filter, live-reproduced); the AI coach route's
> schema-vs-cap conflict (F-217b Medium — the exact F-216a class the
> round before cured, one route left behind); the verification gate
> dissolving after the 15-minute TTL (F-217d Medium — an unverified
> account signs in once the code expires, and the resend no-ops, so
> the "gate" is cosmetic); the mobile drawer's focus order running
> under the overlay (F-217e Medium); and the low tail (the sitemap's
> metadata-poor lowercase locs F-217f, the missing envelope
> `Cache-Control: no-store` F-217g, the missing `frame-ancestors`
> F-217h, the F-216j search tails F-217i, `dateField`'s offset-form
> inconsistency F-217j, the hydrate stale-error face F-217k, the
> mutation actions' late write-token read F-217l); §5 carries the
> execution history).
>
> **Previous version: v2.13.0** (session 216 — the verification-gap
> convergence round R-13: the fresh-eyes audit's unpinned-behavior
> cluster cured — the Import commit's 5000-row contract un-blocked from
> the 16KB global body ceiling (F-216a Medium: real imports of ≳140
> rows failed "Request body too large" against the UI's own promise),
> the S48-P1 formula-injection guard given its behavioral pin + the
> phantom test reference made real (F-216b), the client data layer's
> missing loading/error faces wired (F-216c/d — LoadingBlock was dead
> code, refreshAll swallowed failures), the QuickAction nested-
> interactive cured (F-216e — the a11y two-gate is structurally blind
> to link-wrapped buttons), the F-215h doc tail completed (F-216f), and
> the low tail (OTP log gating F-216g, calendar-true dates F-216h, the
> Expenses popover Escape F-216i, the dead-export sweep F-216j);
> §5 carries the execution history).

---

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

> The next iteration session (218) has **no open R-item by default** —
> the R-4 ladder CLOSED at v2.8.0, the R-7 card arc at v2.6.0, the R-8
> dependency round at v2.9.0, the R-9 prisma major at v2.10.0, the
> session-214 rounds (R-10 owner-scoping + R-11 palette-completion) at
> v2.11.0, the session-215 live-seam convergence (R-12) at v2.12.0,
> the session-216 verification-gap convergence (R-13) at v2.13.0, and
> the session-217 parity-completion round (R-14) at v2.14.0
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
