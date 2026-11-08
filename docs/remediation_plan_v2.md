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
   count toward the suite, so the totals re-converged): the final live
   counts are **508 unit / 37 files / 592 badge** (CLAUDE gate line ·
   README badge + status row · PAD §7.1 distribution + §9 command table +
   §10 closing line · SKILL header; historical rows untouched — they keep
   the counts that were true at their time).
3. The phantom-reference cure rides along: with the file now real, the
   AGENTS.md:80 and PAD:566 references become true statements — and the
   PAD's pin inventory row is now honestly "9 architecture pins"
   (security-ledger joined the list).

### R-3 — The vitest.config.ts comment cure (session 203) — Status: Done(v2.0.0)

The cure for F-203d: rewrite the header comment for the finance domain
(the seam list: db-path resolution, scrypt/HMAC auth, finance math, schemas,
CSV import codec, rate limiter). Comment-only; zero behavior change; the
unit suite re-run green is the equivalence proof.

### R-4 — The gate:full WealthOS re-derivation — Status: Programmed (sessions ≥ 204)

The multi-session program for F-203e. Sub-item ladder (each its own session
slice, TDD where a pin exists, in dependency order):

- **R-4.1** `sweep.ts` re-anchor: `REF_URL` default → the WealthOS reference
  (`https://wealth-os-d93bd04e.base44.app`), the page list → the 9 sections
  (+login/reset-password public faces), the CRM genera/baselines retired.
- **R-4.2** Baseline derivation at the four widths (390/768/1024/1440) with
  the data-vs-empty genus handled per the reference's own empty-state rows.
- **R-4.3** `drift-probe.ts` + `interior-census.ts` re-anchor (page sets +
  the WealthOS reference census).
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
| v2.0.0 | 203 | plan created; **R-1** (security ledger + zod floor pin + PAD/AGENTS lockstep) · **R-2** (docs-counts port + 8 site fixes incl. §7.1) · **R-3** (vitest.config comment) | lint 0/0 · tsc 0 · **508 unit** (37 files; +10: 8 docs-counts + 2 security-ledger) · build · smoke 14/14 · e2e 84/84 · census MATCH | `<filled at commit>` |

> The next iteration session (204) picks up **R-4.1** by default, or any
> Critical/High finding a fresh audit surfaces (findings always pre-empt the
> program).
