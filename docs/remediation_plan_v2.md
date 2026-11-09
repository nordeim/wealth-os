# WealthOS Remediation Plan — v2

> The living, versioned remediation program for this repo. This file is the
> single source of truth for: what the audits found, what is being fixed, in
> what order, by which iteration session, and with what verification. It
> replaces the session-203 placeholder (a one-line dummy committed by the
> owner with the directive *"create validated remediation plan with versioning
> for each iteration session"* — this document is that plan).
>
> **Current version: v2.9.0** (session 212 — the R-8 dependency round:
> 8 of the 10 standing dev-toolchain advisories cured within existing
> semver ranges + the F-212a lockfile-identity cure; §5 carries
> the execution history).

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

> The next iteration session (213) has **no open R-item by default** — the
> R-4 ladder CLOSED at v2.8.0, the R-7 card arc at v2.6.0, and the R-8
> dependency round at v2.9.0 (the advisory census now 2, both fixes
> range-unreachable — they cure automatically when typescript-estree or
> @prisma/config move their ranges; the re-triage duty stays). A fresh
> audit's findings always pre-empt (Critical/High first); the natural next
> rounds are the standing residuals' watch (the F-210a scroll-model genus —
> cure only if a future round re-architects the shell) or R-5 (the LLM
> provider wiring) on the owner's explicit ask. The standing residuals stay
> the documented content supersets (the populated tables/charts our corpus
> renders where the reference's empty workspace shows placeholders) + the
> F-210a scroll-model genus (absorbed into the fullpage tables by the
> stability call — cure only if a future round re-architects the shell).
