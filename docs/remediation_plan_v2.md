# WealthOS Remediation Plan — v2

> The living, versioned remediation program for this repo. This file is the
> single source of truth for: what the audits found, what is being fixed, in
> what order, by which iteration session, and with what verification. It
> replaces the session-203 placeholder (a one-line dummy committed by the
> owner with the directive *"create validated remediation plan with versioning
> for each iteration session"* — this document is that plan).

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
| F-205b | Medium (programmed) | **The reference's import + settings pages carry their own navy/blue treatment** — a navy bg wash on import (rgb(26,35,50) vs our rgb(14,20,17): Δblue=33, every pixel differs); navy-tinted cards + the blue "Export All Data" button + the blue GDPR box on settings — while every other page keeps the app-wide amber/warm genus our clone mirrors (7 of 9 page backgrounds match within tolerance). The original app's own inconsistency; a parity round re-skinning those two pages (then re-deriving their baselines) is the cure. Standing shares until then: import 75.1/92.3/93.0/76.5, settings 57.1/74.5/77.5/60.3 (desktop/phone/tablet/landscape). | The VLM page reads + the bg-sample table (session 205) | **R-7** |
| F-205c | Low (programmed) | **The smaller styling deltas the theme-matched maiden exposed** (all dark-mode): the ref's solid saturated stat-icon fills vs our tinted badges; its line-segment chart legend vs our dots; its gauge health score vs our blobs; our sidebar active pill (the ref shows none); the mobile auth-face layouts (login/reset run 13.2–14.0 at phone/tablet vs 3.9–7.1 at desktop). Each is a small share; together they are the residual under the data genus. | The VLM dashboard/settings reads (session 205) | **R-7** |
| F-206a | Medium | **The R-4.2 "demo corpus" belief was a misdecode — the reference's workspace renders EMPTY STATES.** The session-206 maiden probes found every section showing its empty-state copy ("No expenses yet", "No Income Sources Yet", "No accounts yet", "No Goals Set Yet", "0 holdings", $0.00 KPIs) — and the session-205 captures, re-read, show the same (the genus was decoded from the diff shares, never verified against the captures). Both sides run empty: the true first genus is the EMPTY-STATE CONSTRUCTION delta, not data-vs-empty. The living language (the sweep's STANDING_BASELINES docblock + standingExplained, zero-data.ts's header, this plan's R-4.2 bullet) asserted the corpus belief as live doctrine. | The session-206 quiescence-settled census + the re-read session-205 captures; scripts/drift-probe.ts DEMO_SENTINELS (the live-measured phrases) | **R-4.3** (cured in-commit) |
| F-206b | Medium (programmed) | **The R-4.3 census decode surfaced the construction genera in detail** — measured, baked into the census's STANDING_CENSUS allowances, programmed as R-7 convergence work: the section-shell wrapper stack (ours `p-4 md:p-6 lg:p-8 space-y-6` vs the ref's `flex-1 pt-16 lg:pt-0` + `max-w-{6,7}xl mx-auto` inner container); the page-header vocabulary (the ref's `lg:` breakpoints, its H1 `text-primary-navy` tokens, its `mb-8`/`mb-2` rhythms); the auth-card family (the ref's `border-0 shadow-2xl bg-white/95` vs our bordered `shadow-xl`, its slate accent bar vs our amber, its taller padding driving login mainH −40); the reference's reset-password face carrying NO `<main>` (ours keeps the landmark — the superset; the census's anchor fallback covers it); the investments height genus (−649 desktop); the mobile topbar's Synced-pill placement (the ref's right cluster beside sun+hamburger vs our left beside the wordmark). | The four-axis census maidens (the STANDING_CENSUS decode) + the TRUE-390 anatomy probes | **R-7** |

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

### R-4 — The gate:full WealthOS re-derivation — Status: In progress (R-4.1 Done at v2.1.0; R-4.2 Done at v2.2.0; R-4.3 Done at v2.3.0; R-4.4 next)

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
- **R-4.4** `fullpage-sweep.ts` page set + baselines.
- **R-4.5** `gate:full` reactivation: un-dormant the five docs (README,
  AGENTS, CLAUDE, PAD, SKILL), wire `bun run gate:full` back into the
  pre-push doctrine.

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

### R-7 — The dark-mode parity convergence (import + settings navy genus + the styling deltas) — Status: Programmed

The optional F-205b/F-205c work the R-4.2 decode surfaced: re-skin the
import + settings pages to the reference's own navy/blue treatment
(its bg wash, its navy cards, its blue Export/GDPR accents), walk the
smaller deltas (stat-icon fills, legend markers, the health-score
gauge, the sidebar active pill, the mobile auth faces), and re-derive
the affected baselines DOWNWARD as each converges (the drift gate only
catches upward drift — lowering a baseline is a deliberate, pinned
re-derivation). Entry criteria: a session with a green gate and no
open Critical/High findings; slices are independently shippable per
page. Not scheduled — the R-4 ladder (R-4.3–R-4.5) has priority.

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

> The next iteration session (207) picks up **R-4.4** by default — the
> fullpage-sweep.ts re-anchor (its page set + baselines, following the
> R-4.1/R-4.2/R-4.3 pattern: pin born RED against the CRM-era config,
> re-anchor, maiden run) — or any Critical/High finding a fresh audit
> surfaces (findings always pre-empt the program). R-7 (the dark-mode +
> construction parity convergence, now carrying F-206b's decoded genera)
> is available as an alternate slice if the owner prefers parity work
> over tooling.
