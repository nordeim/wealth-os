# WealthOS — Master Project Architecture Document (PAD) v2.0.0

**Classification:** Internal Engineering Reference
**Status:** DEFINITIVE, PRODUCTION-LOCKED BLUEPRINT
**Companion Document:** `docs/implementation-plan-session-199-wealthos.md` (the transformation plan)
**Last Updated:** 2026-11-09
**Audience:** Senior Engineers, Tech Leads, DevOps, and Onboarding Engineers
**Rule:** Every architectural decision in this document traces to a specific rationale.
Nothing is here "because it's popular."

---

#### Revision Block — v2.0.0 (Tracked Changes)

Every change is tagged with its source: `[RES]` = validated by web research,
`[SR]` = self-review, `[CA]` = critical analysis, `[SYN]` = synthesis,
`[SAN]` = sanitization pass, `[AUTH]` = auth alignment.

- `[SYN]` v2.0.0 — Full rewrite for the WealthOS transformation (session
  199): the product domain changed from NEO CRM to personal finance; every
  section re-derived from the live tree (schema, API family, shell, tests).
  The v1.x CRM-era PAD is superseded; the infrastructure chapters (auth,
  db-path, gate, Tailwind v4 pins) carried forward where the code kept them.
- `[SR]` v2.11.0 (session 214, R-10 + R-11): the tenancy gap CLOSED —
  `Budget` and `Setting` gained `ownerId` (the §4 ER finally true),
  `/api/reset` wipes only the caller's data, and `GET /api/users` answers
  the session record (the CRM-era owners list retired); the Tailwind v4
  palette completed — 23 (family, step) pairs re-pinned to v3 values and
  the 7 shadcn neutral semantic tokens + `.dark` flips pinned (the
  A-209 inert-class tail), both under the complete-enumeration guard
  (`tests/palette-pins.test.ts`); the boot gate warns on in-app
  OTP/reset delivery enabled in production (F-214f); eslint re-enabled
  `react-hooks/exhaustive-deps` + the three dead-branch rules (F-214k,
  tree verified clean); the unit-count lockstep moved 630 → 657 / 45 →
  47 files with the owner-scoping + palette-pins pins (family 19 → 21).
- `[SR]` The census contract re-derived: transactions are BOUNDS-pinned
  (54..108) — the generator never seeds future-dated rows, so the total is
  legitimately date-dependent.
- `[SR]` v2.8.0 (session 211, R-4.5): the `gate:full` parity chain
  RE-ACTIVATED — dormant (since the session-201 honesty fix D-201b) →
  active, green end-to-end from cold. §2 ADR-006, §7, §9.2, §10 carry the
  live state; the unit-count lockstep moved 614 → 616 with the F-211a
  package-identity pin (`tests/gate-script.test.ts`); the pre-push
  doctrine: `bun run gate` before every push, `gate:full` when parity
  surfaces changed or per the standing cadence (the sweep legs need the
  live reference — the offline bar stays `gate`).
- `[SR]` v2.9.0 (session 212, R-8 — the dependency round): the advisory
  census moved 10 → 2 — eight dev-toolchain advisories cured by the
  lockfile re-resolution within existing semver ranges (vite 8.3.6 out of
  the 8.3.0–8.3.2 window · source-map-js 1.2.2 · the nested
  eslint-plugin-react-hooks zod deduped onto 4.6.7), the F-212a
  lockfile-identity residue cured (the workspaces mirror re-keyed to
  wealth-os), the resolved-version columns of §2 re-anchored (next 16.4.5 ·
  tailwind 4.3.5 · vitest 5.1.0 · playwright 1.65.0 · axe 4.14.0 ·
  zustand 5.1.0 · html2canvas-pro 2.6.3), and the unit-count lockstep
  moved 616 → 620 with the dependency-floors pin
  (`tests/dependency-floors-212.test.ts`); the two range-unreachable
  advisories (minimatch, deepmerge-ts) stay §10's documented deferral.
- `[SR]` v2.10.0 (session 213, R-9 — the prisma 6→7 major migration): the
  ORM taken across the major — prisma / @prisma/client 6.19.3 → 7.10.1
  (the Rust-free `prisma-client` generator emitting into
  `src/generated/prisma`, postinstall-regenerated, git+eslint-ignored),
  the PrismaLibSql driver adapter replacing the removed `datasources`
  constructor option in both constructor sites (`src/lib/db.ts` +
  `prisma/seed.ts` — the db-path seam unchanged), `prisma.config.ts` (the
  CLI's config home, the URL routed through `resolveDatabaseUrl` so a
  relative `file:` reference can never ride the v7 CWD rule out of the
  repo), the e2e global-setup re-pinned (the removed generate-skip flag
  gone; the e2e db pinned by absolute url), and the serverExternalPackages
  chain for the native/wasm runtime. The decode worth recording: bun
  HARD-BLOCKS better-sqlite3 (oven-sh/bun#4290) — the upgrade guide's
  named SQLite adapter — so the runtime chain is @prisma/adapter-libsql +
  @libsql/client (the bun-compatible NAPI driver, verified live under
  bun, the standalone artifact, and the full gate). The advisory census
  moved 2 → 1 (the deepmerge-ts HIGH cured — @prisma/config 7.x carries
  8.0.2; every 6.x stable exact-pins the vulnerable 7.1.5); the
  unit-count lockstep moved 620 → 630 / 43 → 45 files with the
  dependency-floors-213 + prisma-7-contract pins.

### Table of Contents

1. [System Overview & Decisions](#1-system-overview--decisions)
2. [High-Level System Topology](#2-high-level-system-topology)
3. [Application Architecture](#3-application-architecture)
4. [Data Architecture](#4-data-architecture)
5. [Design System Reference](#5-design-system-reference)
6. [Security Architecture](#6-security-architecture)
7. [Testing Strategy](#7-testing-strategy)
8. [Build & Deployment](#8-build--deployment)
9. [Developer Handbook](#9-developer-handbook)
10. [Known Issues & Outstanding Tasks](#10-known-issues--outstanding-tasks)
11. [Key Files Reference](#11-key-files-reference)
12. [Glossary](#12-glossary)

---

## 1. System Overview & Decisions

### 1.1 Document Metadata & Purpose

WealthOS is a self-hostable premium personal-finance workspace — a single
Next.js application that unifies income, expenses, bank accounts,
investments, budgets, savings goals, CSV import, analytics, and an
AI financial coach. The product is a functional **superset** of the
original Base44 reference app at **visual parity** with it.

**How to use this document:** a new engineer reads §1–§3 for the mental
model, §9 to get running, and §10 to know the edges. A debugging engineer
jumps to §3.3 (code patterns), §4 (data), §6 (security). A reviewer of
technical choices reads §1.3 (ADRs) — every consequential decision and its
rejected alternatives live there.

### 1.2 Technology Stack Summary

| Layer | Technology | Version | Key Rationale |
|-------|-----------|---------|---------------|
| Web framework | Next.js (App Router) | 16.4.5 | Server components + route handlers in one artifact; standalone output for a single-node, no-Vercel deploy |
| UI runtime | React | 19.3.1 | Current React; no forwardRef ceremony |
| Language | TypeScript (strict) | 5.9.3 | Compile-time contract; `tsc --noEmit` is a gate |
| Styling | Tailwind CSS | 4.3.5 | CSS-first `@theme` (no config file); v3-re-pinned palette because v4's oklch re-derivation renders visibly different colors |
| UI primitives | Radix UI | dialog 1.3.1 · select 2.4.1 · dropdown 2.2.1 · popover 1.3.1 · label 2.1.17 · slot 1.5.0 | Accessible primitives the design wraps, not rebuilds |
| Icons | lucide-react | 0.525.0 | Consistent stroke family |
| Charts | recharts | 3.10.1 | Declarative SVG charts (area, donut, bars) |
| State | Zustand | 5.1.0 | Minimal client store without Context ceremony |
| ORM | Prisma (@prisma/client + adapter-libsql) | 7.10.1 | Typed queries + SQLite default; PostgreSQL-ready. R-9 (session 213): the prisma 7 major — Rust-free generated client (`src/generated/prisma`, postinstall-regenerated) + the PrismaLibSql driver adapter (bun hard-blocks better-sqlite3 — oven-sh/bun#4290) |
| Validation | Zod | 4.6.7 | Boundary parsing; message-carrying failures |
| Unit tests | Vitest + fast-check | 5.1.0 / 4.10.2 | Fast, ESM-native; property tests for money math |
| E2E tests | Playwright + axe-core | 1.65.0 / 4.14.0 | Real-browser journeys + a11y assertions |
| PDF export | jspdf + html2canvas-pro | 4.2.1 / 2.6.3 | Client-side statement export; no server render farm |
| Toolchain | Bun | ≥1.3.14 | Fast installs/scripts; node-compatible build |

### 1.3 Architecture Decision Records (ADRs)

**ADR-001: Next.js App Router single-artifact deployment**

- **Context:** The app must be self-hostable on a single node (no platform
  lock-in), yet needs server-side session decisions, route handlers, and a
  polished client UI.
- **Decision:** Next.js 16 App Router with `output: "standalone"`; pages are
  server components by default, section pages are client components fed by
  the `/api/*` family.
- **Rationale:** One build artifact serves pages + API; the standalone
  output runs under plain `node`/`bun` with a traced dependency tree; the
  smoke ladder validates exactly what ships.
- **Consequences:** + simple deploys, one language. − the server/client
  boundary must be respected (see ADR-004's SSR trap).
- **Alternatives Rejected:** Vite SPA + separate API (two artifacts, double
  deploy surface); Remix (weaker standalone story at decision time).

**ADR-002: Prisma + SQLite default, PostgreSQL optional**

- **Context:** A personal-finance workspace must be trivially self-hostable
  (zero-config) yet able to grow.
- **Decision:** Prisma 6 with SQLite at `db/custom.db`; flip
  `provider` + `DATABASE_URL` for PostgreSQL. Relative `file:` URLs resolve
  against `prisma/schema.prisma` — implemented identically in CLI, build,
  and runtime by `src/lib/db-path.ts`.
- **Rationale:** Zero-config local story; typed queries; the path seam
  closes the classic "runtime opens a different db than the CLI" trap
  (bun additionally absolutizes `.env` `file:` URLs — the seam re-anchors).
- **Consequences:** + one-command setup. − SQLite's single-writer model
  bounds concurrent writes (acceptable for the workload).
- **Alternatives Rejected:** better-sqlite3 direct (no typed schema);
  Drizzle (fine, but Prisma's schema-as-document + seed ergonomics won).

**ADR-003: Hand-rolled HMAC cookie auth (no NextAuth, no JWT library)**

- **Context:** Session auth with revocation, no external identity provider,
  no library surface area beyond need.
- **Decision:** scrypt password hashes (`src/lib/password.ts`,
  node:crypto-only so the seed script can import it) + HMAC-SHA256 signed
  stateless cookie `neo_session` (7-day TTL) with a `tokenVersion`
  revocation dimension; production boots fail hard without a ≥16-char
  `AUTH_SECRET` (warn-once dev fallback).
- **Rationale:** ~150 auditable lines replace a framework; timing-safe
  comparisons; password reset kills all prior cookies by bumping the
  version column.
- **Consequences:** + zero auth deps, full control. − every session
  feature (rotation, MFA) is hand-rolled from here.
- **Alternatives Rejected:** NextAuth/Auth.js (adapter ceremony for a
  single-email app); JWTs (revocation requires a denylist anyway).

**ADR-004: The route twins — capital + lowercase — via `.jsx` bridges**

- **Context:** The reference serves `/Dashboard` AND `/dashboard`; a `.tsx`
  re-export of a client page trips TS1149 (a default export of a client
  component is not a valid page module when re-exported typed).
- **Decision:** Lowercase dirs hold the real pages; capital dirs contain a
  one-line `.jsx` re-export (`export { default } from "../dashboard/page"`).
- **Rationale:** TS1149 does not apply to `.jsx`; the twin resolves to the
  same component; URL casing is preserved.
- **Consequences:** + exact reference parity. − every new section must add
  both dirs; `tests/route-case.test.ts` polices the twins' equivalence.
- **Alternatives Rejected:** Redirects (changes the URL bar — the reference
  keeps its casing); middleware rewrites (opaque, breaks client nav state).

**ADR-005: Deterministic local AI coach (no LLM dependency)**

- **Context:** The reference has an "AI Coach" chat; production clones
  must not ship API keys or network dependencies.
- **Decision:** `src/lib/ai.ts` is a provider seam whose default provider
  computes insights from the user's real data locally (spending trends,
  budget adherence, savings rate) — deterministic, tested, offline.
- **Rationale:** The replicate-web-app AI-stub policy: an offline clone
  with a real, explainable engine beats a broken network call; the seam
  allows a future LLM provider via env without touching callers.
- **Consequences:** + works offline, testable. − the "AI" is rule-based
  (honest labeling in the UI).
- **Alternatives Rejected:** Hard-coded canned responses (not data-driven);
  mandatory OpenAI key (breaks self-hosting).

**ADR-006: The verification gate as the only CI**

- **Context:** No hosted CI runs on this repo; the local gate must prove
  everything.
- **Decision:** `bun run gate` = `eslint --max-warnings 0` → `tsc --noEmit`
  → vitest (657) → `next build` → the 14-assertion smoke ladder on the
  standalone artifact → Playwright e2e (84) against a pinned `db/e2e.db`.
  `gate:full`'s extra legs (per-viewport drift sweeps + the fullpage
  axis + interior censuses) are **active** (re-activated v2.8.0 /
  R-4.5, session 211 — green end-to-end from cold): the sweep,
  drift-probe, and interior-census legs are WealthOS-native (session
  204's R-4.1 re-anchor + session
  205's R-4.2 theme-matched baselines + session 206's R-4.3 + session
  207's R-7.5 re-derivation (the parity convergence): the
  reference-stability probe — bundle fingerprint, sentinel demo
  census, functional mobile-menu check — and the interior census with
  its four-axis standing allowances at zero margin, proven live at all
  four widths with mutation-proof teeth); the fullpage leg re-anchored
  at session 210 (R-4.4). The sweep legs need the live reference, so
  the pre-push bar stays `bun run gate` (the offline gate);
  `gate:full` runs when parity surfaces changed or per the standing
  cadence.
- **Rationale:** Each leg catches a class the others miss: lint (smells),
  tsc (contracts), unit (logic), build (route/module graph), smoke (the
  shipped artifact + boot posture), e2e (journeys + a11y).
- **Consequences:** + a single command is the release bar. − long local
  runs; no PR-time enforcement (the wrapper refuses nothing — the
  discipline is documented in AGENTS.md/CLAUDE.md).
- **Alternatives Rejected:** GitHub Actions (the operator's push path is a
  deploy key; hosted CI was explicitly out of scope).

---

## 2. High-Level System Topology

```mermaid
flowchart TB
  subgraph Clients
    D[Desktop browser]
    M[Mobile browser 390px+]
  end
  subgraph Edge
    LB[Reverse proxy / LB<br/>X-Forwarded-For]
  end
  subgraph Server["Node / Bun — single standalone process"]
    NEXT[Next.js 16 server]
    PAGES[App Router pages<br/>9 sections × route twins]
    API[Route handlers /api/*<br/>20 families]
    AUTH[Auth seam<br/>scrypt + HMAC cookie]
    RL[Rate limiter<br/>per-IP buckets]
    AISEAM[AI provider seam<br/>deterministic local engine]
  end
  subgraph Data
    DB[(SQLite db/custom.db<br/>8 Prisma models)]
    FS[Uploads store<br/>uploads/ 10MB bounded]
  end
  D --> LB --> NEXT
  M --> LB
  NEXT --> PAGES
  PAGES --> API
  API --> AUTH
  API --> RL
  API --> AISEAM
  API --> DB
  API --> FS
```

**Runtime notes:** one process serves everything (pages + API + static
assets from `public/`); scaling is vertical. The rate limiter keys on the
client IP derived from `NEO_PROXY_HOPS` trust depth (fails closed). The
upload store is same-disk; the export path streams JSON/PDF from the db.
No external services are called at runtime — fonts are the system stack,
the AI engine is local, analytics-free by design.

---

## 3. Application Architecture

### 3.1 The Layer Model

```
Layer 0: prisma/schema.prisma — the data contract. Every model change
         starts here; db:push applies, seed.ts provisions.
Layer 1: src/lib/* — the seams. Pure, tested modules: finance (domain
         math), ai (provider), schemas (Zod), api (envelope+guards),
         auth (sessions), db/db-path (persistence), site (metadata),
         page-layout (layout constants). NO React here (except types).
Layer 2: src/app/api/* — route handlers. Thin: guard → parse →
         db call → envelope. Business logic lives in Layer 1.
Layer 3: src/components/* — the shell + ui + shared page-parts.
         Client components; data arrives via fetch from Layer 2.
Layer 4: src/app/(app)/*/page.tsx + route twins — section pages.
         Compose Layer 3; own their fetch/loading/dialog state.
```

**The Golden Rule:** data flows DOWN the layers (page → api → seam → db);
types flow UP (a page may import a Layer-1 type; a seam never imports a
component). A route twin re-exports its lowercase sibling — never the
reverse.

### 3.2 Annotated Directory Structure

```
wealth-os/
├── prisma/
│   ├── schema.prisma            # 8 models; SQLite provider; relative file: URL
│   └── seed.ts                  # idempotent (deleteMany-first); deterministic corpus
├── db/                          # SQLite files (git-ignored; .gitkeep tracked)
├── src/
│   ├── instrumentation.ts       # boot-env check: no AUTH_SECRET in prod = refuse to serve
│   ├── app/
│   │   ├── layout.tsx           # root layout: fonts (system stack), theme script, metadata
│   │   ├── page.tsx             # root: sessioned → Dashboard; guest → login wall (server-side)
│   │   ├── globals.css          # Tailwind v4 @theme tokens (v3-re-pinned palette)
│   │   ├── login/ · signup/ · reset-password/
│   │   ├── (app)/               # auth-gated group; layout makes the session decision
│   │   │   ├── layout.tsx       # server: getSessionUser → AppShell | redirect
│   │   │   ├── dashboard/       # the flagship page (+ Dashboard/ twin)
│   │   │   ├── income/ expenses/ accounts/ investments/
│   │   │   ├── import/ analytics/ goals/ settings/
│   │   │   └── <Capital>/page.jsx  # one-line re-export twins (ADR-004)
│   │   ├── api/                 # 20 families: transactions, income-sources, accounts,
│   │   │   │                    # investments, goals, budgets, ai, import, dashboard,
│   │   │   │                    # analytics, auth/*, export, reset, search, settings,
│   │   │   │                    # users, health, upload(s)
│   │   └── manifest.json/ robots.txt/ sitemap.xml/   # SEO family (derive from site.ts)
│   ├── components/
│   │   ├── layout/              # app-shell, sidebar, mobile-nav (plain div, NOT Radix),
│   │   │                        # mobile-header, theme (+useIsDark hook), nav-config,
│   │   │                        # login-card, guest-login-redirect
│   │   ├── shared/              # page-parts.tsx (PageCard, KpiCard, EmptyState, …),
│   │   │                        # ai-coach.tsx (the coach dialog)
│   │   └── ui/                  # Radix-wrapped primitives: button, input, select,
│   │                            # tabs, dialog, dropdown, label, popover, textarea
│   ├── lib/                     # Layer 1 seams (see §3.1)
│   ├── stores/wealthos-store.ts # Zustand: theme + UI state
│   └── types/index.ts           # shared domain types (Transaction, AccountView, …)
├── tests/                       # 45 unit suites (incl. architecture pins) + e2e/ 5 specs
├── scripts/                     # smoke-test.sh, census.ts, sweep.ts, fullpage-sweep.ts,
│                                # interior-census.ts, drift-probe.ts, zero-data.ts, …
├── skills/                      # the skill library; skills-catalog.md is the index
├── docs/                        # plans, validation reports, SSH runbook, screenshots/
└── AGENTS.md · CLAUDE.md · README.md · wealth-os_SKILL.md · worklog.md
```

### 3.3 Critical Code Patterns

**Pattern 1 — The API envelope + guard + parse (every route handler)**

```typescript
// src/app/api/transactions/route.ts — the reference implementation.
import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { transactionCreateSchema } from "@/lib/schemas";

export async function POST(req: Request) {
  const guard = await requireSession();        // 1. session wall → 401 envelope
  if (isGuarded(guard)) return guard.response;
  const parsed = await parseBody(req, transactionCreateSchema);  // 2. Zod at the boundary
  if (!parsed.ok) return parsed.response;      //    → 400 with the field message
  const body = parsed.data;
  try {
    if (body.accountId) {                      // 3. ownership check → 404, never 403
      const account = await db.bankAccount.findFirst({
        where: { id: body.accountId, ownerId: guard.user.id },
      });
      if (!account) return ERR.BAD_REQUEST("Selected account does not exist");
    }
    const transaction = await db.transaction.create({ /* … */ });
    return ok(transaction);                    // 4. the { ok, data } envelope
  } catch {
    return ERR.INTERNAL();                     // 5. never leak stack traces
  }
}
```

*Why this pattern:* one shape for every endpoint (clients assert the
envelope, the smoke ladder greps `"ok":true`), validation before the db,
ownership as a 404 (no resource enumeration), and a single catch-all that
hides internals. ADR-006's unit + e2e suites pin this family.

**Pattern 2 — The db-path seam (runtime == CLI database)**

```typescript
// src/lib/db-path.ts (abridged) — the anchor ladder that defeats the
// CWD/bun-absolutization traps:
//  1. Next standalone output: server.js chdir's into .next/standalone,
//     whose traced schema copy would capture the relative rule —
//     recognize it and return the real repo two levels up.
//  2. This module's own repo root (validated: prisma/schema.prisma
//     exists on disk there).
//  3. process.cwd() as the last resort.
// Anchors 1–2 are VALIDATED, so the db folder is created on demand.
export function runtimeDatabaseUrl(): string { /* resolves file:../db/custom.db
  to <repo>/db/custom.db under next dev, next build, AND the standalone
  server, regardless of process CWD */ }
```

*Why this pattern:* the classic Prisma+Next failure is three different
databases opened by CLI, build, and server. The seam makes them agree by
construction; `tests/db-path.test.ts` pins it, and every census prints the
resolved URL (a count without its path is not evidence).

**Pattern 3 — The route twin bridge (ADR-004)**

```jsx
// src/app/(app)/Dashboard/page.jsx — the entire capital-route twin:
export { default } from "../dashboard/page";
```

*Why this pattern:* the reference serves `/Dashboard` and `/dashboard`
with URL casing intact. Redirects would rewrite the bar; middleware
rewrites hide the truth from client navigation. A `.jsx` re-export dodges
TS1149 (default-exporting a typed client page through a `.tsx` bridge is
not a valid page module); the twin resolves to the identical component.
`tests/route-case.test.ts` walks both casings.

**Pattern 4 — The SSR-safe theme read**

```tsx
// src/components/layout/theme.tsx (shape) — the hook that ended the
// "document is not defined" SSR crash:
function useIsDark(): boolean {
  const [dark, setDark] = React.useState(false);          // server: false (no window)
  React.useEffect(() => {                                  // client-only read
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  return dark;
}
```

*Why this pattern:* theme state lives in the DOM (class on `<html>`), so
module-scope or render-scope `document` access crashes server render. The
hook reads in an effect; hydration stays stable; the store persists the
choice.

**Pattern 5 — The deterministic AI engine**

```typescript
// src/lib/ai.ts (shape) — the provider seam:
export interface AiProvider { answer(q: string, ctx: AiContext): CoachAnswer }
export function getAiProvider(): AiProvider {
  // env-configurable provider; the default is the local engine that
  // derives insights (top movers, budget adherence, savings trend) from
  // ctx — the user's REAL transactions/accounts/goals.
}
```

*Why this pattern:* the coach must work offline, stay testable (property
tests over synthesized contexts), and never leak keys (ADR-005). The seam
keeps callers ignorant of the engine; a future LLM provider slots in via
env alone.

---

## 4. Data Architecture

### 4.1 Database Schema

```mermaid
erDiagram
  User ||--o{ Transaction : owns
  User ||--o{ IncomeSource : owns
  User ||--o{ BankAccount : owns
  User ||--o{ Investment : owns
  User ||--o{ Goal : owns
  User ||--o{ Budget : owns
  User ||--o| Setting : has
  BankAccount ||--o{ Transaction : "accountId (nullable)"
  Transaction {
    string id PK
    string ownerId FK
    string description
    float amount
    string type "income | expense"
    string category
    string budgetCategory "needs | wants | savings"
    datetime date
    boolean recurring
    datetime nextDate "nullable"
    string accountId FK "nullable"
  }
  IncomeSource { string id PK string ownerId FK string name string category float amount boolean active }
  BankAccount { string id PK string ownerId FK string name string institution string type float balance }
  Investment { string id PK string ownerId FK string symbol string name string type float investedAmount float currentValue }
  Goal { string id PK string ownerId FK string name float targetAmount float currentAmount string deadline }
  Budget { string id PK string ownerId FK string category float limit float spent }
  Setting { string id PK string ownerId FK json settings }
  User { string id PK string email unique string name string passwordHash int tokenVersion }
```

### 4.2 Data Models

Eight models, all owner-scoped (`ownerId` on every finance row — Budget
and Setting included since session-214's R-10; handlers filter by it).
`User.tokenVersion` is the session-revocation dimension
(ADR-003). Amounts are floats at the SQLite layer — money entering through
API boundaries is Zod-normalized (2-dp coercion) before persistence, and
all display math goes through `src/lib/finance.ts` (rounded, deterministic).

### 4.3 Persistence Strategy

- **Migrations:** `bun run db:push` (schema-first, dev velocity; the repo
  intentionally ships no migration journal — the seed is the provisioner).
- **Seeding:** idempotent (`deleteMany` per model, then createMany); the
  transaction generator is calendar-aware — it never emits future-dated
  rows and skips occasional rows by deterministic month parity, so its
  total varies with the seeding date (census pins bounds 54..108; static
  entities exact).
- **Connection:** one PrismaClient singleton (`src/lib/db`) per process;
  e2e and smoke run on dedicated scratch databases (`db/e2e.db`,
  `db/smoke.db`) pinned by their configs so the dev database is never
  touched by tests.

---

## 5. Design System Reference

### 5.1 Typographic System

Inter-first **system stack** (`-apple-system, BlinkMacSystemFont, "Segoe UI",
Inter, …`) — zero runtime font fetches (offline posture). Weights: 600 for
headings, 500 for emphasized labels, 400 body. Scale: `text-sm` base for
dense data surfaces, `text-3xl`/`text-4xl` page + KPI numerals.

### 5.2 Color Tokens

Measured from the reference (live computed styles + VLM probes); defined
as **literal hex in `@theme`** (`src/app/globals.css`):

| Token | Value | Usage | Contrast |
|-------|-------|-------|----------|
| `--color-primary` | `#f59e0b` amber-500 | Primary buttons (amber→yellow-600 gradient), active-nav chip | on white 2.2:1 — decorative fills; text uses stone-900 |
| `--color-primary-hover` | `#d97706` amber-600 | Hover | — |
| `--color-primary-navy` | `#0f1419` | The section-H1 navy (7 of 9 pages — `text-primary-navy`, live-computed on the reference, session 207) | 16.9:1 on white (AAA) |
| KPI tone gradients | `KPI_TONES` (page-layout.ts) | The reference's saturated stat tiles (session 208, F-208a): `from-emerald-500 via-teal-500 to-emerald-600` · rose/red · amber/yellow · purple/violet — `w-12 h-12 rounded-xl` + `text-white` icons; Investments renders them as FULL-CARD gradients (`GradientKpiCard`, shadow-2xl) | white-on-gradient (the icons ride the 500–600 band) |
| The four card families | `CARD`/`GLASS_CARD`/`STOCK_CARD`/`QUICK_ACTIONS_CARD` (page-layout.ts) | The per-surface card genera (session 209, F-209a): **warm-simple** `CARD.base` (`from-white/90 to-stone-50/90` gradient, amber-100/50 border, shadow-xl — Dashboard mid + Investments); **warm-hover** `CARD.kpi` (the KPI row: + `via-amber-50/20` + `card-hover` + `p-6` in-base + backdrop-blur-md); **glass** `GLASS_CARD` (Expenses/Income/Goals/Analytics + Dashboard's bottom row; + `card-hover` on Expenses' summary trio); **stock** `STOCK_CARD` (`border bg-card` — Accounts/Import); the Quick Actions one-off (`via-30`, rounded-2xl, amber-200 border). Padding is a flat `p-6` | card-foreground #0a0a0a on near-white gradients 17+:1 (AAA) |
| Card tokens + hover utility | `--color-card-foreground` / `--color-card` + `.card-hover` (globals.css) | The shadcn tokens behind the families (`#0a0a0a`/`#ffffff`, flipped `#fafafa`/`#0a0a0a` by the `.dark` runtime override — the reference's own mechanism; live-decoded session 209) + the reference's custom hover utility (`translateY(-2px)` + the xl shadow pair, CSSOM-verbatim) | #fafafa on stone-900/90 dark cards 15+:1 (AAA) |
| Analytics stat gradients | `STAT_GRADIENTS` (page-layout.ts) | The reference's three saturated `to-r` stat tiles under the Analytics header (session 209, F-209b): emerald (Avg Monthly Income, TrendingUp) · red (Avg Monthly Expenses, TrendingUp `rotate-180`) · blue (Avg Monthly Savings, Calendar) — `text-white` values + `text-X-100` labels over the tested `monthlyAverages()` | white-on-gradient (large text) |
| Settings glass genus | `SETTINGS_CARD` (page-layout.ts) | The settings page's OWN card family (F-205b's second half, session 208): `bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg` + the shadcn CardHeader/CardTitle/CardContent anatomy + the blue GDPR box (`bg-blue-600` Export button) + the amber import box | blue-800 on blue-50 = 7.2:1 (AA) |
| `--color-background` | `#faf9f7` | Light page wash | — |
| `--color-foreground` | `#1c1917` stone-900 | Headings/body | 16.1:1 on background (AAA) |
| `--color-muted` | `#78716c` stone-500 | Secondary text | 4.7:1 on white (AA) |
| `--color-line` | `#e7e5e4` stone-200 | Card borders | decorative |
| emerald-700 | `#047857` | Positive deltas, income | 5.2:1 (AA) |
| red-600 | `#dc2626` | Negative deltas, destructive | 4.5:1 (AA) |

Dark theme re-maps the same token set via `.dark` (values in globals.css).
Inactive tab labels were deliberately darkened stone-500→stone-600 in
places where text-on-stone-100 needed AA (a11y spec pins it).

### 5.3 Component Primitives

Radix wrapped by `src/components/ui/*` (button/input/select/tabs/dialog/
dropdown/popover/label/textarea) styled with cva variants + the token
classes. Layout genus constants (dialog widths, table paddings, login
card metrics) live in `src/lib/page-layout.ts` so pages and tests share
one source.

### 5.4 Motion / Animation

`tw-animate-css` powers Radix `data-[state=open]` transitions (fade/zoom
on dialogs, slide on dropdowns). The mobile drawer animates via a CSS
transform class. No JS animation loop; `prefers-reduced-motion` respected
by the utility layer.

---

## 6. Security Architecture

### 6.1 Security Rules

| Rule | Enforcement |
|------|-------------|
| Every `/api/*` handler (except `/api/health`) requires a session | `requireSession()` guard; e2e 401 probe + smoke assertions 02/03 |
| All input parsed at the boundary | Zod schemas (`src/lib/schemas.ts`); `parseBody()` returns the 400 envelope |
| Ownership on every row access | `ownerId` in every `where`; lookups 404 (no enumeration) |
| Passwords never stored/ logged in clear | scrypt hashes (`src/lib/password.ts`); no PII in logs |
| Session cookies signed + timing-safe | HMAC-SHA256 + `timingSafeEqual` (`src/lib/auth.ts`) |
| Password reset revokes sessions | `tokenVersion` bump; cookie comparison fails |
| Login/signup/reset rate-limited | per-IP buckets (10/15min login+signup; 5 resend), `Retry-After` header, keyed on trusted-proxy-derived IP |
| Production boots without `AUTH_SECRET` refuse to serve | `src/instrumentation.ts` → boot-env fail-fast |
| Uploads bounded + path-guarded | 5 MB cap (the reference's own ceiling); `[name]` route validates against traversal |
| No secrets in the tree | `.gitignore` (`.env`, `db/*.db`, keys); smoke artifact-hygiene leg asserts the standalone output carries none of `.env/.git/db/skills/docs/uploads` |

### 6.2 Security Utilities

`src/lib/auth.ts` (sessions, cookie mint/teardown), `src/lib/password.ts`
(scrypt hash/verify — node:crypto-only, importable by the seed),
`src/lib/rate-limit.ts` (buckets + IP derivation from `NEO_PROXY_HOPS`),
`src/lib/boot-env.ts` (the boot gate), `src/lib/api.ts` (envelope + the
`ERR` family including `RATE_LIMITED` with `Retry-After`).

### 6.3 Authentication & Authorization

Single-role model: the session user. `/` and `(app)/*` pages make the
session decision **server-side** (the (app) layout redirects; the root
renders `GuestLoginRedirect` — a client shim that mirrors the reference's
`/login?from_url=` mechanism). API handlers re-verify per call. No RBAC
by design. **Session-214 (R-10) closed the tenancy gap**: the product is
multi-account-capable — every finance row (Budget and Setting included
since session 214) carries `ownerId`, every handler filters by it,
`/api/reset` wipes only the caller's data, and `GET /api/users` answers
the session user's own record (the CRM-era owners list is retired).

### 6.4 Threat Model

| Vector | Mitigation |
|--------|-----------|
| Cookie forgery | HMAC-SHA256 signature; timing-safe compare; ≥16-char secret enforced in prod |
| Credential stuffing | Rate limits + generic auth failures (no enumeration) |
| Account enumeration (signup/forgot) | Uniform 200 responses; in-app delivery kill-switches for real mail transports |
| SQL injection | Prisma parameterized queries only |
| XSS | React escaping; no `dangerouslySetInnerHTML`; Zod-normalized strings |
| Path traversal (uploads) | Slug validation in `/api/uploads/[name]` |
| Resource exhaustion | Upload size cap; rate buckets; bounded JSON bodies |
| Secret leakage via artifact | Standalone-output hygiene assertions in the smoke ladder |

---

## 7. Testing Strategy

### 7.1 Test Distribution

| Category | Files | Checks | Location | Framework |
|----------|-------|--------|----------|-----------|
| Unit | 47 | 657 | `tests/*.test.ts` | Vitest 5 + fast-check |
| — domain seams | 3 | (finance, ai, schemas-finance) | `tests/finance|ai|schemas-finance.test.ts` | property + example based |
| — architecture pins | 21 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins) | `tests/` | source-scanning contracts |
| — infrastructure | 23 | auth, rate-limit, csv, uploads, headers, boot-env, … | `tests/` | behavior |
| E2E | 5 | 84 | `tests/e2e/*.spec.ts` | Playwright (chromium) + axe-core |
| Smoke | 1 | 14 | `scripts/smoke-test.sh` | bash + curl on the standalone artifact |

*docs-counts pins are re-anchored when doc/test counts change — keep them
in lockstep with real counts.

### 7.2 Test Patterns

- **Envelope-first API tests**: assert `{ ok, error.code }` shapes, 401/404
  semantics, and Zod 400s — observable behavior, not internals.
- **Source-scanning architecture pins**: read the file, strip comments,
  assert the contract (e.g., the e2e port literal lives only in
  `e2e-port.ts`). When a contract legitimately changes, the pin updates in
  the same commit — never deleted to pass.
- **Journey e2e**: login once (storageState), then per-section assertions,
  the mobile drawer at 390×844, the Add-Expense two-step dialog, and the
  guest 401 probe that opts OUT of storageState (the config injects it
  into every project by default — the opt-out IS the test).
- **Property tests**: money math (rounding, rollups) over randomized
  transaction sets via fast-check.

### 7.3 Coverage Thresholds

No numeric coverage gate; the bar is structural: every API family has
schema tests, every seam has unit tests, every section has e2e presence,
a11y stays axe-clean. The gate failing ANY leg blocks the push.

### 7.4 Pre-Push Checklist

- [ ] `bun run lint` → 0 problems, 0 warnings
- [ ] `bun run typecheck` → 0 errors
- [ ] `bun run test` → 657/657 (counts re-pinned if tests added/removed)
- [ ] `bun run build` → green, routes listed
- [ ] `./scripts/smoke-test.sh` → 14/14 (incl. boot-gate + hygiene)
- [ ] `CI=1 bun run test:e2e` → 84/84
- [ ] No secrets staged; `git status` clean of scratch files
- [ ] Docs lockstep: README/PAD/AGENTS/CLAUDE/worklog updated with behavior changes

---

## 8. Build & Deployment

### 8.1 Production Build

```bash
bun run build
# next build → .next/standalone (traced tree) + static assets copied in;
# the build script also removes any .env from the artifact.
bun run start          # NODE_ENV=production, PORT configurable
```

### 8.2 Environment Variables

| Name | Required | Description | Default |
|------|----------|-------------|---------|
| `DATABASE_URL` | yes | `file:../db/custom.db` (SQLite, resolves against `prisma/schema.prisma`) or a PostgreSQL URL | — |
| `AUTH_SECRET` | prod | Session HMAC key, ≥16 chars; prod boot refuses without it | dev-only fallback + warning |
| `NEXT_PUBLIC_SITE_URL` | build | Canonical origin for metadata/OG/sitemap/manifest | `http://localhost:3000` |
| `NEO_PROXY_HOPS` | no | Trusted proxy depth for rate-limit IP keying (unparsable fails closed to 1) | `1` |
| `NEO_DISABLE_IN_APP_OTP` | no | `"1"` = don't return the signup code in responses | off |
| `NEO_DISABLE_IN_APP_RESET` | no | `"1"` = don't return the reset link in responses | off |

### 8.3 Docker Configuration

None shipped — the standalone artifact IS the deployment unit (run under
node/bun behind any reverse proxy). `docs/DEPLOYMENT.md` carries the
generic single-node procedure.

### 8.4 CI/CD Pipeline

No hosted CI (ADR-006). The pipeline is: local `bun run gate` →
conventional commit on main → push via
`python3 docs/ssh_git_wrapper_v3.py --key-file <key> --remote
git@github.com:nordeim/wealth-os.git` (the wrapper verifies the remote
ref equals local HEAD and syncs the tracking ref; runbook in
`docs/how-to-git-push-using-ssh-wrapper_SKILL.md`, including the paramiko
ssh shim for ssh-less sandboxes).

---

## 9. Developer Handbook

### 9.1 Local Setup

```bash
bun install
cp .env.example .env
bun run db:push && bun run db:seed
bun run dev                 # http://localhost:3000
# demo login: sepnetflix2023@outlook.com / $Abcd1234
bun run db:census           # expect "census: MATCH"
```

Full verification setup (what CI-less agents run before pushing):
`bun run gate` (~5–8 min: lint, tsc, unit, build, smoke, e2e).

### 9.2 Common Commands

| Command | Location | Purpose |
|---------|----------|---------|
| `bun run dev` | repo root | Dev server :3000, log teed to `dev.log` |
| `bun run test` / `CI=1 bun run test:e2e` | root | 657 unit / 84 e2e |
| `bun run db:push` · `db:seed` · `db:census` | root | Schema apply · demo data · contract check |
| `bun run sweep -- --width 390 --height 844` | root | visual drift sweep at a viewport (WealthOS-native: R-4.1 re-anchor + R-4.2's theme match + derived baselines; `--fail-on-drift` gates against the class tables) |
| `bun run probe:ref` | root | live reference-stability probe (WealthOS-native, R-4.3: the bundle fingerprint + the sentinel demo census + the functional mobile-menu check) |
| `bun run gate` / `gate:full` | root | The chain / chain + the active parity sweeps — the sweep + fullpage + interior-census legs WealthOS-native (through R-4.4, baselines re-derived at R-7.5/R-7.9/R-7.10 + the session-210 fullpage maiden; `gate:full` green end-to-end from cold at v2.8.0/R-4.5 — run it when parity surfaces changed) |

### 9.3 Code Style Rules

Enforced by `eslint.config.mjs` (+ `--max-warnings 0`) and `tsconfig.json`
(strict). Conventions that matter: early returns; `unknown` over `any`;
seams stay React-free; route handlers stay thin; one component per file;
comments explain why.

### 9.4 Git Workflow

- **main only** — no branches (operator contract).
- Conventional Commits, atomic units, why-driven bodies.
- Push only through the SSH wrapper (§8.4); shred the key after.
- Never commit `.env`, `db/*.db`, logs, `test-results/`, scratch files.

---

## 10. Known Issues & Outstanding Tasks

| Priority | Issue | Impact | Status |
|----------|-------|--------|--------|
| MEDIUM | Dev-toolchain advisories census (`bun audit`, re-triaged session 213): 1 advisory: 0 high / 1 moderate — all dev-toolchain, zero runtime chains | Chain (the lone residue — fix UNREACHABLE within its parent's range): minimatch←typescript-estree pins `^10.2.2` while the GHSA-g3hv-75wg-m249 fix is 11.0.1. CURED at R-9 (session 213, the prisma 6→7 major): the deepmerge-ts HIGH (GHSA-ggr8-5vv4-36mx) — @prisma/config 7.x carries deepmerge-ts 8.0.2 while every 6.x stable exact-pins the vulnerable 7.1.5; the migration contract is pinned (`tests/prisma-7-contract.test.ts` + `tests/dependency-floors-213.test.ts`). The eight CURED at R-8 (session 212, within ranges): the vite/launch-editor six (vite 8.3.0→8.3.6) · source-map-js 1.2.1→1.2.2 · the nested eslint-plugin-react-hooks zod 4.6.5→deduped onto the runtime 4.6.7 (the RUNTIME `zod@^4.6.7` stays safe — floor-pinned against GHSA-mrhx-c7xc-m3w5, vulnerable range `zod < 4.6.6`) | Accepted (re-triaged session 213; cured floors pinned: `tests/security-ledger.test.ts` + `tests/dependency-floors-212.test.ts` + `tests/dependency-floors-213.test.ts`; Re-triage: re-run `bun audit` before every push — a parent-range bump that unlocks the fix is cured same-session) |
| LOW | Session cookie name is `neo_session` (scaffold legacy) | Cosmetic; smoke + specs grep it — a rename is a coordinated change | Accepted |
| LOW | No migration journal (db:push workflow) | Schema history lives in git, not SQL files — acceptable for the single-user product | Accepted |
| LOW | AI coach is rule-based (honest labeling) | No LLM answers offline; the provider seam exists for a future engine | By design (ADR-005) |
| INFO | `AUTH_SECRET` dev fallback exists (warn-once) | Dev-only; production fails hard | By design |
| INFO | Social login buttons render but explain (no OAuth client) | No dead clicks; wiring a provider is additive | Documented deviation |

No CRITICAL or HIGH issues are open. The verification gate is green at
the time of writing (lint 0/0 · tsc 0 · 657 unit · build · smoke 14/14 ·
84 e2e).

**Re-triage: re-run `bun audit` before every push.** A NEW runtime-chain
advisory is cured same-session, never deferred; dev-toolchain bumps stay
under the no-mid-rotation toolchain posture (bump them in a dedicated
dependency round, gate-verified). The census row above and the runtime-zod
floor are pinned in `tests/security-ledger.test.ts` — a stale ledger or a
vulnerable runtime resolution trips the unit gate.

---

## 11. Key Files Reference

| File | Lines | Purpose |
|------|-------|---------|
| `prisma/schema.prisma` | ~150 | The 8-model data contract |
| `prisma/seed.ts` | ~300 | Deterministic demo corpus (idempotent) |
| `src/lib/finance.ts` | ~400 | Domain math: rollups, 50/30/20, cashflow series |
| `src/lib/ai.ts` | ~350 | The AI provider seam + local insight engine |
| `src/lib/schemas.ts` | ~510 | Every Zod boundary schema |
| `src/lib/api.ts` | ~120 | The ok/ERR envelope + guards |
| `src/lib/auth.ts` | ~180 | HMAC cookie sessions, tokenVersion revocation |
| `src/lib/db-path.ts` | ~100 | The runtime==CLI database anchor |
| `src/lib/site.ts` | ~180 | Metadata factory (titles, OG, sitemap source) |
| `src/lib/page-layout.ts` | ~200 | Layout genus constants (dialogs, tables, login) |
| `src/components/layout/app-shell.tsx` | ~120 | The authenticated shell |
| `src/components/layout/mobile-nav.tsx` | ~110 | The plain-div mobile drawer (NOT Radix) |
| `src/components/shared/page-parts.tsx` | ~200 | Shared page building blocks |
| `src/app/(app)/dashboard/page.tsx` | ~400 | The flagship dashboard |
| `src/app/globals.css` | ~250 | Tailwind v4 @theme tokens (v3-pinned palette) |
| `scripts/smoke-test.sh` | ~160 | The 14-assertion artifact ladder |
| `tests/e2e/wealthos.spec.ts` | ~260 | The 26-journey section + CRUD spec |
| `docs/ssh_git_wrapper_v3.py` | ~300 | The verified SSH push wrapper |

## 12. Glossary

| Term | Meaning |
|------|---------|
| **Route twin** | The capital + lowercase page pair (`/Dashboard` + `/dashboard`) bridged by a `.jsx` re-export |
| **The envelope** | `{ ok: true, data } \| { ok: false, error: { code, message } }` — every API response |
| **Seam** | A pure, tested `src/lib/*` module that isolates one concern (finance math, AI, auth, db-path) |
| **The gate** | `bun run gate`: lint → typecheck → unit → build → smoke → e2e |
| **Drift sweep** | A viewport-rendered screenshot census compared against the standing genus (`sweep.ts`) |
| **Census** | A db count check bound to a printed resolved path (`scripts/census.ts`) |
| **tokenVersion** | The User column whose bump revokes all previously minted session cookies |
| **50/30/20** | The needs/wants/savings budget framework the Expenses tabs and Analytics use |
| **The wrapper** | `docs/ssh_git_wrapper_v3.py` — the key-materializing, ref-verifying push tool |
| **Standing genus** | The visual class of a page as pinned by captures/sweeps — parity's ground truth alongside computed styles |
