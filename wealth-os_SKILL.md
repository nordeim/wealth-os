---
name: wealth-os
description: >
  Complete engineering skill for the WealthOS codebase — a production-grade,
  self-hostable personal-finance workspace (income, expenses, accounts,
  investments, budgets, goals, CSV import, analytics, AI coach) on Next.js 16
  App Router + React 19 + TypeScript strict + Tailwind CSS v4 (CSS-first) +
  Prisma/SQLite + Zod + Zustand + recharts, with a three-tier verification
  layer (Vitest 657 / Playwright 84 / smoke 14). Covers the design system,
  the finance domain seams, the db-path contract, the route-twin technique,
  the mobile-drawer construction, auth, the deterministic AI coach, the
  anti-pattern ledger, and the full debugging playbook. Use it to extend,
  debug, onboard, or replicate this architecture.
version: 1.0.0
last_updated: 2026-11-08
---

# WealthOS — Complete Engineering Skill

> **How to use this document:** it is the single-source-of-truth engineering
> reference for the WealthOS codebase, distilled at session 199's ship state
> (remote main `8849248`). Every version, count, hex, and path below was
> verified against the tree at distillation time. Read §1–§3 before your
> first change; grep §9/§10 when something breaks; walk §11 before every
> push. Companion docs: `AGENTS.md` (the compact agent contract),
> `CLAUDE.md` (the workflow framework), `README.md` (the product face),
> `Project_Architecture_Document.md` (the ADRs and layer model),
> `docs/implementation-plan-session-199-wealthos.md` (the transformation
> plan with live reference evidence), `worklog.md` (session history).

## Table of Contents

1. [Project Identity & Design Philosophy](#1-project-identity--design-philosophy)
2. [Tech Stack & Environment](#2-tech-stack--environment)
3. [Bootstrapping & Configuration](#3-bootstrapping--configuration)
4. [The Design System (Code-First)](#4-the-design-system-code-first)
5. [Component Architecture & Patterns](#5-component-architecture--patterns)
6. [Custom Hooks Deep Dive](#6-custom-hooks-deep-dive)
7. [Data & Domain Layer](#7-data--domain-layer)
8. [Accessibility (WCAG 2.2 AA) Implementation](#8-accessibility-wcag-22-aa-implementation)
9. [Anti-Patterns & Common Bugs](#9-anti-patterns--common-bugs)
10. [Debugging Guide](#10-debugging-guide)
11. [Pre-Ship Checklist](#11-pre-ship-checklist)
12. [Lessons Learnt & How to Avoid Them](#12-lessons-learnt--how-to-avoid-them)
13. [Pitfalls to Avoid](#13-pitfalls-to-avoid)
14. [Best Practices](#14-best-practices)
15. [Coding Patterns](#15-coding-patterns)
16. [Coding Anti-Patterns](#16-coding-anti-patterns)
17. [Responsive Breakpoint Reference](#17-responsive-breakpoint-reference)
18. [Z-Index Layer Map](#18-z-index-layer-map)
19. [Color Reference (Complete)](#19-color-reference-complete)
20. [The Complete TypeScript Interface Reference](#20-the-complete-typescript-interface-reference)
- [Appendix A — Architecture Decision Records](#appendix-a--architecture-decision-records)
- [Appendix B — Verification History](#appendix-b--verification-history)
- [Appendix C — The SSH Push Runbook](#appendix-c--the-ssh-push-runbook)
- [Appendix D — Post-Deploy Live-Site Validation](#appendix-d--post-deploy-live-site-validation)
- [Appendix E — The Skills Library](#appendix-e--the-skills-library)

---

## 1. Project Identity & Design Philosophy

**One sentence:** WealthOS is a self-hostable premium personal-finance
workspace — a functional superset of the original Base44 reference app
(`wealth-os-d93bd04e.base44.app`) at visual parity with it, maintained by
nordeim and built through agent sessions recorded in `worklog.md`.

**The product question it answers:** *where is my money actually going?*
One dashboard unifies transactions, income sources, bank accounts,
investment holdings, budgets, savings goals, CSV imports, and analytics —
then an AI coach turns those numbers into concrete recommendations.

**The parity + superset doctrine (the load-bearing rule):**

- **Visual parity**: match the reference's visual genus exactly. Computed
  styles are ground truth, not screenshots. The reference's own palette
  (warm stone neutrals + amber primary) is the sanctioned register; every
  color it ships was live-extracted and re-pinned (see §19).
- **Functional superset**: exceed the reference only in functionality —
  e.g. our drawer adds Escape-to-close, auto-close past `lg`, route-change
  close, and a main-scroller lock that the reference ships without.
- **Superset in code, never in visuals**: an element the reference renders
  plain must not grow chrome here. The amber primary button was added to
  the sanctioned register *by citation* (the reference's own gradient), not
  by taste.

**Non-negotiable design rules:**

- Warm-minimal editorial genus: `#faf9f7` page wash, white cards,
  `#1c1917` ink, `#e7e5e4` hairlines, amber-500 `#f59e0b` primary with a
  subtle amber→yellow gradient on CTAs.
- Positive deltas are emerald, negative are red/rose; the reference's KPI
  deltas use `emerald-700`/`red-700`-class values for AA contrast at small
  sizes.
- No purple-gradient-on-white clichés, no generic dashboard blue, no
  runtime font fetching (Inter-first system stack, inlined at build).
- Charts use the reference's own triad: teal income `#14b8a6`, rose
  expense `#f43f5e`, amber net `#f59e0b`.

**Determinism everywhere:** the seed, the AI coach, and the test data are
all deterministic — no `Math.random()` in seeded paths, no future-dated
rows. A fresh clone renders the same charts on every run date (within the
documented month-parity bounds — §7).

**Offline-capable by default:** no runtime third-party calls — fonts, AI,
analytics all local. The AI coach is a deterministic local engine behind a
provider seam (§7), so no API key is needed to run the full product.

## 2. Tech Stack & Environment

Locked versions from `package.json` (verified at distillation):

| Layer | Technology | Version | Critical Note |
|---|---|---|---|
| Web framework | `next` (App Router) | 16.4.5 | Standalone output; `outputFileTracingRoot` pinned at repo root; `proxy.ts`-era conventions (no `middleware.ts`) |
| UI runtime | `react` / `react-dom` | 19.3.1 | No `forwardRef` anywhere — `ref` as a plain prop |
| Language | `typescript` | 5.9.3 | `tsc --noEmit` gate; strict; zero `any` in `src/` |
| Styling | `tailwindcss` | 4.3.5 | CSS-first `@theme` in `src/app/globals.css`; NO `tailwind.config.js`; v3-re-pinned palette (§4) |
| UI primitives | Radix UI (`@radix-ui/react-dialog`, `-select`, `-tabs`, `-dropdown-menu`, `-popover`, `-label`) | 1.3–2.4 | Wrapped in `src/components/ui/*`; the mobile drawer deliberately does NOT use Dialog (§9 A-1) |
| Icons | `lucide-react` | 0.525 | Parity pin — the reference's own bundle-decoded version |
| Charts | `recharts` | 3.10.1 | Cashflow area, category donut, budget bars, portfolio allocation |
| State | `zustand` | 5.1.0 | ONE store: `src/stores/wealthos-store.ts` |
| ORM | `prisma` + `@prisma/client` + `@prisma/adapter-libsql` | 7.10.1 | SQLite dev (PostgreSQL-ready); 8 models; db at repo root (§3); R-9: the prisma 7 major — generated client in `src/generated/prisma` (postinstall), PrismaLibSql driver adapter (bun hard-blocks better-sqlite3 — oven-sh/bun#4290), `prisma.config.ts` on the db-path seam |
| Validation | `zod` | 4.6.7 | 24 exported schemas in `src/lib/schemas.ts`; every API boundary parses |
| Unit tests | `vitest` + `fast-check` | 5.1.0 / 4.10.2 | Node env, jsdom-free; 657 checks / 47 files |
| E2E tests | `@playwright/test` + `axe-core` | 1.65.0 / 4.14.0 | Chromium; 84 checks / 5 specs; own db + port 3100 |
| PDF export | `jspdf` + `html2canvas-pro` | 4.2.1 / 2.6.3 | Client-side statements (`src/lib/pdf-export.ts`); `dompurify` override-pinned at 3.4.17 (session 198's critical cure, inherited) |
| Animations | `tw-animate-css` | (pinned) | Radix open/close transitions only; no Framer Motion |
| Runtime tooling | `bun` | ≥ 1.3 | `bun run` scripts; Node-compatible build/start |

**Environment variables (6, matching `.env.example`):**

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes | `file:../db/custom.db` — RELATIVE `file:` URLs resolve against `prisma/schema.prisma` via `src/lib/db-path.ts` (§3) |
| `AUTH_SECRET` | prod | HMAC key for the session cookie; ≥16 chars or the production boot refuses to serve (§3) |
| `NEXT_PUBLIC_SITE_URL` | build | Canonical origin for metadataBase, OG/Twitter cards, robots, sitemap, manifest — inlined at build |
| `NEO_PROXY_HOPS` | no | Trusted proxy depth for rate-limit IP keying; default 1; unparsable values fail CLOSED onto 1 |
| `NEO_DISABLE_IN_APP_OTP` | no | `"1"` = signup/resend responses stop carrying the verification code |
| `NEO_DISABLE_IN_APP_RESET` | no | `"1"` = forgot-password responses stop carrying the reset link |

## 3. Bootstrapping & Configuration

**From zero to running (Bun ≥ 1.3; Node ≥ 20 with `npm run` also works):**

```bash
git clone https://github.com/nordeim/wealth-os.git
cd wealth-os
bun install                 # respects bun.lock — never hand-edit manifests
cp .env.example .env        # DATABASE_URL is ready for local dev as-shipped
bun run db:push             # apply prisma/schema.prisma to db/custom.db
bun run db:seed             # demo user + 6 months of deterministic finance data
bun run dev                 # http://localhost:3000 (tees to dev.log)
```

**Verify setup:** log in with `sepnetflix2023@outlook.com` / `$Abcd1234`
(the seed's demo credentials) — the Financial Dashboard must render with
populated KPI cards and charts. Then `bun run db:census` must print
`census: MATCH` (§7 for the bounds contract).

**The database path contract (the #1 trap in this family of codebases):**

- The `db/` folder lives at the REPO ROOT and is git-ignored
  (`db/custom.db` dev · `db/e2e.db` e2e · `db/smoke.db` smoke ladder).
- `DATABASE_URL="file:../db/custom.db"` is RELATIVE, and the prisma 7
  CLI reads it from `prisma.config.ts` (routed through
  `src/lib/db-path.ts` — the single anchor that makes CLI, build, and
  runtime agree; `tests/db-path.test.ts` pins it) — but **Bun absolutizes
  relative `file:` URLs against the `.env` file's directory when running
  scripts**, and `next build` resolves against yet another CWD.
- **Never instantiate `new PrismaClient()` outside `src/lib/db.ts`** — a
  raw client opened from a different CWD silently opens a MIRROR database
  elsewhere and the app reads phantom data. This failure mode has bitten
  multiple sibling codebases; the singleton is the cure. (prisma 7: the
  constructor takes the PrismaLibSql driver adapter — never the removed
  v6 datasource-URL option.)

**Critical configuration files:**

| File | Role |
|---|---|
| `next.config.ts` | `output: "standalone"` + `outputFileTracingRoot` pinned + `outputFileTracingExcludes` artifact hygiene (keeps `.env`, `.git/`, `db/`, `skills/`, `docs/` out of the deployable — see the F-170a comment in-file) |
| `tsconfig.json` | Strict; the `@/*` path alias to `src/*` |
| `eslint.config.*` | Flat config; the gate runs `--max-warnings 0` — zero-warning budget is load-bearing |
| `vitest.config.ts` | Node environment, jsdom-free, `tests/` include |
| `playwright.config.ts` | Port 3100; pins `DATABASE_URL=file:../db/e2e.db`; global-setup reseeds; authenticated `storageState`; specs opt OUT with an empty storageState for guest tests |
| `prisma/schema.prisma` | 8 models, SQLite provider (PostgreSQL-ready) |
| `src/instrumentation.ts` → `src/lib/boot-env.ts` | The production boot gate: missing/short `AUTH_SECRET` FAILS HARD AT BOOT with a message naming `.env` and the `openssl rand -hex 32` command |

**Production:** `bun run build && bun run start` (standalone artifact on
`PORT`), with a real `AUTH_SECRET`. The build script also copies
`.next/static` + `public/` into `.next/standalone/` and removes any
`.env` Next copied there (the double-cure for artifact hygiene).

**The command set (from `package.json` scripts):**

| Task | Command |
|---|---|
| Dev server | `bun run dev` (:3000) |
| Lint (fails on warnings) | `bun run lint` |
| Typecheck | `bun run typecheck` |
| Unit tests | `bun run test` (657 checks) |
| E2E (boots own server) | `CI=1 bun run test:e2e` (84 checks) |
| Build (standalone) | `bun run build` |
| Smoke ladder | `bun run smoke` (14 assertions; needs build) |
| DB push / seed / census | `bun run db:push` / `db:seed` / `db:census` |
| Full gate | `bun run gate` = lint → typecheck → test → build → smoke → e2e |
| Parity gate | `bun run gate:full` — **active** (re-activated v2.8.0 / R-4.5, green end-to-end from cold): the standing gate + the six WealthOS-native drift gates — the sweep classes (theme-matched baselines re-derived R-7.5/R-7.9/R-7.10), the reference-stability probe's family, the interior census's four-axis standing allowances, the fullpage below-the-fold axis with the zero-data sentinel; run it when parity surfaces changed (the sweep legs need the live reference; the pre-push bar stays `bun run gate`; see §11) |

## 4. The Design System (Code-First)

Everything lives in `src/app/globals.css` (396 lines) — Tailwind v4
CSS-first, no config file. Structure:

1. `@import "tailwindcss";` + `@import "tw-animate-css";`
2. `@custom-variant dark (&:where(.dark, .dark *));` — class-based dark mode
3. The `@theme` block (§19 has the complete token tables)
4. `@layer base` — body wash, focus-visible ring, scrollbar rules
5. `@layer utilities` — `.dark body`, `.sidebar-gradient`, `.page-wash`
   re-maps: dark mode re-declares the semantic tokens once and every
   surface follows

**Semantic tokens (the design decisions):**

```css
--color-primary: #f59e0b;          /* amber-500 — the reference's own CTA hue */
--color-primary-hover: #d97706;    /* amber-600 */
--color-primary-foreground: #ffffff;
--color-primary-navy: #0f1419;      /* the section-H1 navy — 7 of 9 pages (session 207) */
/* Session-208 parity genera (live-extracted):
   KPI_TONES — the stat-tile gradients (emerald/teal · rose/red · amber/yellow ·
     purple/violet) + GradientKpiCard (Investments' full-card gradients);
   SETTINGS_CARD — the settings page's OWN glass genus (bg-white/80
     backdrop-blur border-0 shadow-lg + the blue GDPR box + blue Export
     button + amber import box + the shadcn badge family + the bottom
     Save footer);
   public/wealthos-logo.png — the reference's own 192×192 login logo asset
     (fetched session 208; the CSS bar-chart mark retired).
   Session-209 (F-209a) — the per-surface card families (the reference deploys
     FOUR by surface, not one):
   CARD.base — the warm-simple genus (from-white/90 to-stone-50/90 gradient,
     amber-100/50 border, shadow-xl; Dashboard mid + Investments);
   CARD.kpi — the warm-hover KPI genus (+ via-amber-50/20 + card-hover +
     p-6 in-base + backdrop-blur-md; the Dashboard KPI row);
   GLASS_CARD — the glass genus (bg-white/80 dark:bg-gray-800/80
     backdrop-blur border-0 shadow-lg; Expenses/Income/Goals/Analytics +
     Dashboard's bottom row; .hover appends card-hover on the summary trio);
   STOCK_CARD — the shadcn stock card (border bg-card; Accounts/Import);
   QUICK_ACTIONS_CARD — the one-off (via-30, rounded-2xl, amber-200 border);
   STAT_GRADIENTS — the Analytics saturated to-r stat row (F-209b, over the
     tested monthlyAverages() in finance.ts).
   CARD.padding is a flat p-6 (the reference's effective 24px everywhere). */
--color-card-foreground: #0a0a0a; /* the shadcn card ink (flipped #fafafa by
                                 the .dark runtime override — session 209) */
--color-card: #ffffff;            /* the stock card bg (flipped #0a0a0a) */
--color-background: #faf9f7;       /* warm stone page wash */
--color-surface: #ffffff;          /* cards */
--color-foreground: #1c1917;       /* stone-900 ink */
--color-muted: #78716c;            /* stone-500 secondary text */
--color-subtle: #a8a29e;           /* stone-400 */
--color-line: #e7e5e4;             /* stone-200 hairlines */
--color-line-strong: #d6d3d1;      /* stone-300 */
--color-line-soft: #f5f5f4;        /* stone-100 table stripes */
--color-ring: #1c1917;             /* focus ring */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--radius-card: 0.75rem;            /* 12px cards */
--radius-button: 0.5rem;           /* 8px buttons */
--radius-pill: 9999px;             /* badges/chips */
```

**Status family** (soft backgrounds pair with solid text): success
`#10b981`/`#ecfdf5` · warning `#f59e0b`/`#fffbeb` · danger `#ef4444`/
`#fef2f2` · info `#06b6d4`/`#ecfeff`.

**Chart triad:** `--color-chart-income: #14b8a6` (teal) ·
`--color-chart-expense: #f43f5e` (rose) · `--color-chart-net: #f59e0b`
(amber).

**Typography:** `--font-sans: Inter, ui-sans-serif, system-ui,
-apple-system, …` — Inter-first system stack, NO runtime font fetch
(`next/font` local or none; offline doctrine). Hierarchy is size + weight
(600/500 headings over 400 body), tracking tight on large numerals.

**The Tailwind v4 pins (why the palette is re-declared):** v4 re-derived
the default palette in oklch, which renders measurably different from the
v3 values the reference ships. The app therefore RE-PINS every color it
uses to the exact v3 hex (`--color-amber-500: #f59e0b;` etc.) inside
`@theme`, including the renamed shadow/blur primitives. Rules:

- New UI colors must be re-pinned the same way, never pulled from v4
  defaults.
- NO `var()` chains inside `@theme` — semantic tokens are literal hex.
- NO `tailwind.config.js` — it would silently re-enter the config era.
- Full conventions: `docs/Tailwind-V4-Validation-Report.md`.

**Motion:** `tw-animate-css` classes for Radix open/close (fade/zoom
~150ms). No Framer Motion, no scroll-triggered animations. The reference
is calm; motion is functional (state feedback) only.

## 5. Component Architecture & Patterns

**The layer model (imports flow downward only):**

```
src/app/(app)/*/page.tsx     ← client pages (all nine sections)
src/components/layout|shared|ui
src/stores/wealthos-store.ts  ← the ONE Zustand store
src/lib/*                     ← the seams (finance, ai, schemas, api, auth, db, …)
prisma/schema.prisma          ← the data model
```

**Component inventory (23 tsx files + nav-config.ts):**

| Directory | Files | Purpose |
|---|---|---|
| `src/components/layout/` | 8 tsx + nav-config.ts | app-shell, sidebar, mobile-nav (the drawer), mobile-header, theme, login-card, guest-login-redirect, reset-password-screen |
| `src/components/shared/` | 2 tsx | page-parts (shared page building blocks: PageHeader, StatCard, EmptyState, …), ai-coach (the floating coach dialog) |
| `src/components/ui/` | 13 tsx | Radix-wrapped primitives: avatar, badge, button, card, dialog, dropdown, icons, input, label, select, table, tabs, toast |

**Client vs Server decision tree:**

- The `(app)` section pages are CLIENT pages (`"use client"` first line —
  verified in `dashboard/page.tsx`) fed by the API family; the (app)
  `layout.tsx` makes the session decision SERVER-side and wraps pages in
  the `AppShell`.
- Root `/` serves the dashboard to authenticated visitors and
  login-walls guests server-side (`guest-login-redirect.tsx` — a client
  redirect shim carrying `from_url`).
- `/login`, `/signup`, `/reset-password` are server-rendered routes with
  client island cards.
- Route handlers (`src/app/api/**/route.ts`) are the server surface.

**The route twins (capital + lowercase):** the reference's own sidebar
links point at CAPITALIZED routes (`/Dashboard`, `/Income`, …) while the
canonical sources live in lowercase dirs. Both must exist:

```
src/app/(app)/dashboard/page.tsx    ← the real page
src/app/(app)/Dashboard/page.jsx    ← the bridge:
  import DashboardPage from "../dashboard/page";
  export default function DashboardCapitalRoute() { return <DashboardPage />; }
```

The bridge is `.jsx`, NOT `.tsx`: TypeScript's TS1149 fires when one
program includes two real files whose paths differ only in casing. The
extension keeps the alias out of that collision. `tests/route-case.test.ts`
polices the parity for all nine sections.

**The shell construction (`app-shell.tsx`):** sidebar (desktop ≥ lg) +
mobile header (sticky, z-50) + mobile drawer (plain conditional div, z-40
overlay under the header) + theme provider. The (app) layout mounts it
around every section page. Route changes close the drawer during render
(the `usePathname` effect in AppShell).

**The API route idiom** (follow `src/app/api/transactions/route.ts`):

```ts
export async function GET() {
  const session = await requireSession();     // 401 envelope if none
  // …prisma read through src/lib/db…
  return ok(data);
}
export async function POST(req: Request) {
  const session = await requireSession();
  const body = await parseBody(req, transactionCreateSchema);  // 400 envelope
  // …create…
  return ok(created, { status: 201 });
}
```

Every handler: `try/catch` → `ERR.INTERNAL()`, Zod for input, ownership
checks return 404 (never 403 — no resource enumeration), the envelope is
`{ ok: true, data } | { ok: false, error: { code, message } }`
(`src/lib/api.ts`, 308 lines).

**The AI provider seam** (`src/lib/ai.ts`): `getAiProvider()` returns the
deterministic local engine; the route (`/api/ai/coach`) and the
`ai-coach.tsx` dialog consume only the `AiProvider` interface, so a real
LLM can be wired by adding one provider behind the same seam (§15 P-6).

## 6. Custom Hooks Deep Dive

The hook surface is deliberately tiny — three, all in the layout/theme and
store layers:

**`useTheme(): ThemeContextValue`** — `src/components/layout/theme.tsx:111`.
Reads/writes the theme (light/dark) with `localStorage` persistence and
the `.dark` class on `<html>`. Why it exists: the SSR-safe read (below).

**`useIsDark(): boolean`** — `src/components/layout/theme.tsx:63`. The
SSR-safe dark-mode read: returns `false` on the server, then the real
value after mount, WITHOUT referencing `document` during the server
render. **Never** read `document.documentElement.classList` at module
scope or in a render path that can run server-side — that was the live
e2e-caught SSR crash (§9 A-2). Grep for `useIsDark()` and use it.

**`useWealthOs`** — `src/stores/wealthos-store.ts:383`. The ONE Zustand
store (384 lines): theme-independent UI state (drawer open, coach open,
toasts). Server state (finance data) does NOT live here — pages fetch
from the API family and keep derived UI state local. Adding a second
store needs a stronger reason than convenience.

Cleanup patterns: the mobile drawer's Escape listener is a plain
`useEffect` with early return when closed and proper teardown — the
reference ships no Escape handling at all (our superset).

## 7. Data & Domain Layer

**Prisma schema (`prisma/schema.prisma`, SQLite, 8 models):**

| Model | Role | Notable fields |
|---|---|---|
| `User` | auth + profile | scrypt hash, verification/reset state |
| `IncomeSource` | recurring income | amount, frequency, nextDate |
| `Transaction` | the ledger | type (INCOME/EXPENSE), category, amount, date, recurring flag |
| `BankAccount` | connected accounts | institution, type, balance |
| `Investment` | holdings | symbol, shares, costBasis, currentValue |
| `Goal` | savings targets | targetAmount, savedAmount, deadline |
| `Budget` | category budgets | category, monthlyLimit |
| `Setting` | per-user settings | key/value JSON |

**The domain math lives in `src/lib/finance.ts` (622 lines, pure and
unit-tested — never inline rollups in components):** monthly income/
expense rollups, `netBalance`, `savingsRate`, MoM `deltaPct`,
`cashFlowSeries`, `financialHealthScore` (0–100 with bands + advice),
`expenseBreakdown`, `budgetVsActual`, `upcomingAlerts`,
`portfolioStats`, `assetAllocation`, `goalProgress`, `recentActivity`,
`categoryTrend`, `spendingByDayOfWeek`, `unusualTransactions`. All
functions take plain `*Like` interfaces (§20) so tests run without
Prisma.

**The seed (`prisma/seed.ts`, 305 lines, deterministic):** deleteMany
first (idempotent), one demo user, 4 income sources, 3 bank accounts, 6
investments, 5 goals, 7 budgets, and six months of transactions whose
count is **date-dependent by design** (never future rows; occasional
skips by month parity). The census contract pins static entities exactly
and transactions as bounds 54..108 — `tests/db-census.test.ts` +
`scripts/census.ts` enforce it. Recalibrate bounds only when the
generator plan changes.

**The AI coach (`src/lib/ai.ts`, 280 lines):** a deterministic local
financial-intelligence engine. Input is `AiContext` (the finance data);
output is `CoachAnswer { answer }` plus typed `Insight` cards (positive /
neutral / warning tones). It computes health bands, top categories,
goal pacing, unusual transactions — same inputs, same outputs, every
run. The store calls `/api/ai/coach`; per the replicate-web-app AI-stub
policy: no network, no keys, no non-determinism.

**The CSV import (`src/lib/csv.ts` + `/api/import`):** smart column
detection (header name matching with fallbacks), 3-step wizard (upload →
detection preview → review & commit), 10 MB cap, CSV/XLS/XLSX.

## 8. Accessibility (WCAG 2.2 AA) Implementation

Verified by the axe battery in `tests/e2e/a11y.spec.ts` (10 checks across
the section pages + dialogs) at the 1440×900 and 390×844 viewports.

- **Contrast**: the reference's own inactive-tab `stone-500` on
  `stone-100` measured 4.0:1 — darkened one step to `stone-600` (AA,
  negligible visual delta). KPI deltas use `emerald-700`/`red-700`-class
  values. The rule: contrast fixes prefer darkening one Tailwind step
  over restyling.
- **Focus**: a global focus-visible ring (`--color-ring` ink) in
  `@layer base`; keyboard operability for every dialog/select/dropdown via
  the Radix primitives.
- **Heading order**: normalized h1 → h2 → h3 per page (the e2e
  heading-order checks; the reference had violations we did NOT copy).
- **Labels**: every input pairs with the Radix `Label` primitive; the
  hamburger's accessible name is "Open navigation menu" — the e2e and
  capture scripts target it by role+name, never by DOM position.
- **The drawer is NOT a modal**: it is a plain conditional div, so the
  header's ✕ stays in the accessibility tree (§9 A-1 — the Radix Dialog
  variant aria-hid outside content, which e2e caught as a vanished
  button).
- **Touch targets**: nav rows and buttons meet the 44px-class targets;
  the mobile battery (`mobile-navigation.spec.ts`, 10 checks) exercises
  the drawer at 390×844.

## 9. Anti-Patterns & Common Bugs

Each entry: symptom → root cause → fix → the pin that prevents recurrence.

### A-1. Radix Dialog aria-hid the mobile drawer's ✕ (Critical, e2e-caught)

**Symptom:** the drawer's close button vanished from the accessibility
tree while remaining visible — e2e `getByRole("button")` failed, axe
flagged the page.
**Root cause:** Radix Dialog marks outside content `aria-hidden` while
open; the sticky mobile header (holding ✕) is outside the dialog portal.
**Fix:** the drawer is a PLAIN conditional `<div>` — full-screen gradient
overlay, no focus trap, no portal. Superset behaviors kept (Escape,
auto-close past `lg`, route-change close, main-scroller lock).
**Pin:** the mobile-nav e2e battery + the construction comment at the top
of `src/components/layout/mobile-nav.tsx`. **Do not "upgrade" it back to
Radix Dialog.**

### A-2. `document` referenced during SSR (Critical, e2e-caught)

**Symptom:** server-render crash in the theme read path.
**Root cause:** reading `document.documentElement` at module scope /
server render.
**Fix:** the `useIsDark()` hook (§6). **Pin:** e2e smoke on cold boot.

### A-3. Two page files differing only in casing → TS1149 (High)

**Symptom:** build breaks when adding `/Dashboard` aliases as `.tsx`
re-exports.
**Root cause:** TS1149 — one program, two real files, paths differ only
by case.
**Fix:** the `.jsx` bridge technique (§5). **Pin:** `tests/route-case.test.ts`.

### A-4. Tailwind v4 oklch palette drift (High, visual)

**Symptom:** colors render differently from the reference despite
"correct" class names.
**Root cause:** v4 re-derived defaults in oklch.
**Fix:** every used color re-pinned to v3 hex inside `@theme` (§4/§19).
**Pin:** the sweep/census drift tools (`bun run sweep -- --fail-on-drift`).

### A-5. Contrast AA failures on small text (Medium)

**Symptom:** axe contrast violations on inactive tabs / KPI deltas.
**Root cause:** the reference's own `stone-500`-on-`stone-100` (4.0:1).
**Fix:** darken one step (`stone-600`; `emerald-600`→`700` for deltas).
**Pin:** the a11y battery.

### A-6. The E2E port literal escaped its single source (Medium, N-69g)

**Symptom:** the session-69 architecture test failed after the spec
rewrite.
**Root cause:** `wealthos.spec.ts` no longer imported the shared
`tests/e2e/e2e-port.ts` (`e2ePort()`/`BASE_URL`).
**Fix:** a REAL auth-wall probe wired through `e2ePort()` — unauthenticated
`/api/transactions` MUST 401; `/api/health` stays public. Two live catches
on the way green: the config's `storageState` authenticates the `request`
fixture (probe must opt out with an empty storageState, like
`auth.spec.ts`), and the error envelope is `{ ok, error: { code, message } }`.
**Pin:** `tests/gate-script.test.ts` (the N-69g single-source contract).

### A-7. The census pinned a date-dependent total as a scalar (Medium)

**Symptom:** `db:census` reported a mismatch (expected 151, actual 75).
**Root cause:** the seed never emits future-dated rows, so the transaction
total varies with the run date; the old scalar could never hold.
**Fix:** static entities pinned exactly; transactions as bounds 54..108;
the unit pin re-anchored in the same commit.
**Pin:** `tests/db-census.test.ts` + `scripts/census.ts`.

### A-8. The mirror-database trap (High, inherited from the family)

**Symptom:** app reads phantom/empty data though migrations "ran".
**Root cause:** a raw `new PrismaClient()` in a different CWD resolved
`file:../db/custom.db` against another anchor, opening a mirror db.
**Fix:** Prisma ONLY through `src/lib/db.ts` (the db-path-anchored
singleton). **Pin:** `tests/db-path.test.ts`.

### A-9. Stale `node_modules/.prisma` after schema edits (Medium)

**Symptom:** query code "wrongly" missing fields after a schema change.
**Fix:** `bun run db:generate` before blaming the query. **Pin:**
the gotchas ledger (AGENTS.md).

### A-10. Deleting a file still imported by `layout.tsx` (High)

**Symptom:** build dies with an oblique module-resolution error.
**Root cause:** the root layout's import graph reaches wide
(guest-login-redirect etc.).
**Fix:** grep importers before deleting under `src/app/` or
`src/components/layout/`.

### A-11. Playwright `page.request` relative-URL bug under Bun (Medium)

**Symptom:** capture scripts failed resolving relative URLs against the
dev server.
**Fix:** log in through the real UI (the e2e `auth.setup.ts` pattern)
and use absolute URLs built from the port.

### A-12. The capture script clicked the theme toggle instead of the hamburger (Medium, process)

**Symptom:** the "drawer open" screenshot showed a closed dark-mode
dashboard.
**Root cause:** positional selector (`header button first()`).
**Fix:** accessible-name selector — `getByRole("button", { name: "Open
navigation menu" })`. **Lesson:** target roles and names, never positions.

## 10. Debugging Guide

Symptom → root cause → fix, all encountered in this codebase's history.

**Build breaks after adding a capitalized route**
→ A-3: use the `.jsx` bridge; check `tests/route-case.test.ts` parity.

**Build breaks after deleting a component**
→ A-10: grep importers first; the root layout's graph is wide.

**App data looks empty / phantom after a script ran**
→ A-8: a raw PrismaClient opened a mirror db; route everything through
`src/lib/db.ts`; verify with `bun run db:census`.

**`db:census` reports a transaction-count mismatch**
→ Check the date: the seed's total is date-dependent (A-7). If static
entities mismatch, someone edited the seed plan — recalibrate BOTH
`scripts/census.ts` bounds and `tests/db-census.test.ts` pins in the same
commit.

**E2E fails on a button that is visibly on screen**
→ Suspect `aria-hidden`: something wrapped it in a modal context (A-1);
or the selector is positional (A-12) — use role+name.

**E2E server-render crash mentioning `document`**
→ A-2: route the read through `useIsDark()` / useEffect.

**Colors subtly off from the reference**
→ A-4: check the token is re-pinned in `@theme` (v3 hex), not a v4
oklch default; run the drift sweep.

**API test gets 401 where you expected data (or vice versa)**
→ The `request` fixture inherits the config's authenticated
`storageState`; guest probes must opt out with an empty storageState
(A-6). The envelope is `{ ok, error: { code, message } }`.

**Prisma "field does not exist" after a schema edit**
→ A-9: `bun run db:generate`, then re-run.

**The drawer will not close on route change**
→ The close rides AppShell's pathname effect; ensure the page renders
inside `(app)/layout.tsx` (the shell), not a bare route.

**Vitest passes but Playwright fails on the same logic**
→ The dev server lies about production (the family's testing law): the
e2e suite boots the REAL standalone artifact on :3100 with its own db.
Trust e2e for render/auth truths; fix the unit seam only after e2e
narrows the cause.

**`bun run smoke` fails at boot with an AUTH_SECRET message**
→ That is the boot gate working (§3): set a ≥16-char secret. In smoke's
scratch context the ladder itself provisions one — read
`scripts/smoke-test.sh` header before "fixing" it.

## 11. Pre-Ship Checklist

The gate IS the checklist — run it whole, in order, before every push:

```bash
bun run gate        # lint → typecheck → test → build → smoke → e2e
```

Expected steady-state numbers (verify, don't assume):

- [ ] `bun run lint` — 0 errors, 0 warnings (`--max-warnings 0`)
- [ ] `bun run typecheck` — 0 errors
- [ ] `bun run test` — 657 passed / 47 files
- [ ] `bun run build` — green; all WealthOS routes + capital twins listed
- [ ] `bun run smoke` — 14/14 (boot-gate + artifact hygiene + the
      finance API walk + the guest-root server-side wall)
- [ ] `CI=1 bun run test:e2e` — 84/84 (5 specs)
- [ ] `bun run db:census` — `census: MATCH`
- [ ] Parity chain when parity surfaces changed (active since
      v2.8.0/R-4.5): `bun run gate:full` — the four sweep class drift
      gates + the fullpage drift gate + the interior-census drift gate,
      green end-to-end from cold; the e2e battery + VLM-verified
      captures under `docs/screenshots/` (the sweep, drift-probe, and
      interior-census legs are WealthOS-native through R-4.3 —
      theme-matched baselines, the reference-stability probe, the
      interior census's four-axis standing allowances; the fullpage leg
      re-anchored at session 210 — R-4.4)

Security items (each traces to a real incident class in the family):

- [ ] No secrets in the tree (`rg "BEGIN OPENSSH PRIVATE KEY"` — only
      the repo's own skill/wrapper demo blocks may match; never an
      operator key)
- [ ] `.env`, `db/*.db`, `dev.log`, `test-results/` not staged
      (`.gitignore` covers the classes)
- [ ] New API routes: `requireSession()` + Zod parse + the envelope
- [ ] Ownership checks 404, never 403
- [ ] Rate limits intact on auth routes (login 10, signup 10, resend 5,
      forgot 10, reset 10 per 15 min/IP)
- [ ] The artifact excludes `.env`/`.git`/`db`/`skills`/`docs`
      (F-170a) — the smoke ladder's hygiene loop checks this

Ship procedure: commit (Conventional Commits, main only) → push via
`docs/ssh_git_wrapper_v3.py` (Appendix C) → the wrapper verifies the
remote ref equals local HEAD → shred the key.

## 12. Lessons Learnt & How to Avoid Them

**L-1. Computed styles are ground truth, not screenshots.** The reference
recon extracted live computed styles and byte-extracted link hrefs; every
visual claim in this skill traces to that evidence. When in doubt, probe
the reference (`bun run probe:ref`) rather than eyeballing.

**L-2. The reference's construction IS the spec.** The drawer is a plain
div because the reference's drawer is a plain div — matching the genus
outweighs "improving" it with a modal (A-1). Superset behaviors are
additive, never replacements.

**L-3. Architecture contracts belong in tests, not prose.** E2E_PORT
single-source (A-6), route twins (A-3), census bounds (A-7), db-path
(A-8), metadata family — all pinned. When a contract legitimately
changes, update the pin in the same commit and say why; never delete a
pin to make a gate pass.

**L-4. A weakened gate is not a green gate.** No `--max-warnings`
increases, no skipped tests, no `any` casts to silence tsc, no loosened
pins. Fix the code or flag the debt.

**L-5. Determinism is a feature you design in, not luck.** The seed's
date-dependence (A-7) was modeled as bounds rather than frozen dates,
because freezing would fake data. When a total cannot be static, pin the
GENERATOR's contract (bounds), not a snapshot.

**L-6. Positional selectors lie (A-12).** The theme toggle sat where the
hamburger was expected. Accessible names and roles survive re-layouts
and theme changes.

**L-7. The dev server lies about production.** Unit-green ≠ e2e-green:
the SSR crash (A-2) and the aria-hidden trap (A-1) both passed unit and
failed only against the real server. The e2e tier boots the real
standalone artifact for exactly this reason.

**L-8. One canonical seam beats thirty consumer edits.** db-path (A-8),
pageMetadata (§15 P-4), the envelope (§5) — fix at the source and the
consumers inherit correctness.

**L-9. Session context is precious — persist state early.** The
session-199 transformation survived an interrupted context because the
plan doc and worklog recorded decisions as they were made. Write plans
under `docs/`, append worklog entries, commit in logical units.

**L-10. Artifact hygiene is a security property.** The F-170a excludes
keep `.env` (real secrets), `.git/`, `db/` (user rows), and `skills/`
(194 MB) out of every deployable — a tracing bug once shipped ~550 MB
including the real AUTH_SECRET. The smoke hygiene loop re-checks it.

## 13. Pitfalls to Avoid

- **Don't create branches.** main only — the operator's standing order;
  the wrapper pushes main.
- **Don't hand-edit `package.json` or lockfiles.** Use the package
  manager; `bun.lock` is the resolved truth.
- **Don't instantiate PrismaClient outside `src/lib/db.ts`** (A-8).
- **Don't wrap the mobile drawer in Radix Dialog** (A-1).
- **Don't read `document`/`window` outside client effects** (A-2).
- **Don't add a `tailwind.config.js`** or use v4-default palette classes
  without re-pinning (A-4).
- **Don't use `Math.random()`/`Date.now()` in seeds or test fixtures** —
  the dashboard test uses a stable `now`.
- **Don't inline domain math in components** — it belongs in
  `src/lib/finance.ts` (pure, tested).
- **Don't build metadata by hand per page** — `pageMetadata()` is the
  only factory; absolute titles; the family derives from it.
- **Don't return 403 for missing/foreign resources** — 404 (no
  enumeration).
- **Don't fetch at runtime** (fonts/CDNs/AI) — offline by design.
- **Don't skip the gates because "it's just a docs change"** — the
  doc-scanning pins (page-titles, docs-counts lineage) ride the unit
  suite.
- **Don't commit `db/*.db`, `.env`, `dev.log`, `test-results/`, keys,
  or scratch scripts.**
- **Don't push with plain `git push`** — the SSH wrapper verifies the
  remote ref (Appendix C).

## 14. Best Practices

- **Follow the six-phase workflow** (ANALYZE → PLAN → VALIDATE →
  IMPLEMENT → VERIFY → DELIVER) as framed in `CLAUDE.md`; save
  substantive plans under `docs/`.
- **TDD where the environment supports it**: write the failing test
  first; bug fixes need a regression test that fails before and passes
  after (A-6's probe is the exemplar — a contract fix that ALSO became a
  real security regression test).
- **Keep the API idiom uniform**: envelope + `requireSession()` + Zod +
  404-ownership; copy `transactions/route.ts` when adding a family.
- **Route everything visual through tokens**: semantic names
  (`--color-primary`), re-pinned hex (§19); no raw hex in components.
- **Name things by role**: `pageMetadata()`, `useIsDark()`,
  `requireSession()`, `parseBody()` — the seam names read as a contract.
- **Comment WHY, never WHAT** — the codebase's comments carry decision
  history (session IDs, trap explanations); preserve that register.
- **Docs lockstep**: when behavior changes, update README + PAD +
  AGENTS/CLAUDE + this skill + `worklog.md` in the same session.
- **Commit atomically with Conventional Commits**; the message explains
  why. Session-199 shipped six logical units (data → core → api → ui →
  test → docs) — that granularity is the house style.
- **Capture + VLM-verify after visual changes** (the sweep, drift-probe,
  and interior-census legs are WealthOS-native through R-4.3 —
  theme-matched baselines, the reference-stability probe, the interior
  census's four-axis standing allowances; the fullpage leg re-anchored
  at session 210 (R-4.4 — clean at both classes); the operative parity
  evidence is the e2e battery
  + VLM-verified captures).
- **VLM-verify screenshots** when capturing evidence (the A-12 catch was
  a VLM find); save captures under `docs/screenshots/`.

## 15. Coding Patterns

### P-1. The API route handler (canonical: `src/app/api/transactions/route.ts`)

```ts
import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { transactionCreateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const guard = await requireSession();          // the guard seam
  if (isGuarded(guard)) return guard.response;   // 401 envelope if none

  const parsed = await parseBody(req, transactionCreateSchema);
  if (!parsed.ok) return parsed.response;        // 400 envelope w/ Zod msg
  const body = parsed.data;

  try {
    const transaction = await db.transaction.create({
      data: { ...body, ownerId: guard.user.id },  // scoped to the owner
    });
    return ok(transaction);
  } catch {
    return ERR.INTERNAL();                       // never leak internals
  }
}
```

### P-2. The ownership check (404, never 403)

```ts
const row = await db.transaction.findFirst({
  where: { id: params.id, ownerId: guard.user.id },  // scoped by owner
});
if (!row) return ERR.NOT_FOUND();               // foreign OR missing — no enumeration
```

### P-3. Pure domain math (`src/lib/finance.ts`)

```ts
export interface TxLike {                          // no Prisma import
  type: string;  /* "income" | "expense" */
  amount: number; date: Date | string; category: string;  // …
}
export function monthlyExpenses(txs: TxLike[], ref: Date): number {
  return sumAmount(transactionsInMonth(txs, ref, "expense"));
}
```
Inputs are `*Like` interfaces so unit tests run without a database.

### P-4. The metadata factory (`src/lib/site.ts`)

```ts
export function pageMetadata(opts: {
  page: string | null;      // null = the root "WealthOS" identity
  route: string;            // canonical route, feeds og:url + alternates
  title?: string;           // optional absolute override
}): Metadata {
  const page = opts.page;
  const fullTitle = page !== null ? `${page} | WealthOS` : "WealthOS";
  // …canonical alternates + the OG/Twitter card family + PWA_META…
}
```
Page-level metadata REPLACES the root map (shallow merge), so the
factory re-declares the whole family per page; the dashboard
deliberately inherits the root layout's metadata wholesale (the
reference's own unprefixed family for `/` and `/Dashboard`).
`/robots.txt`, `/sitemap.xml`, `/manifest.json` route handlers derive
from the same source; `tests/metadata.test.ts` +
`tests/pwa-metadata.test.ts` pin the family.

### P-5. The db-path anchor (`src/lib/db-path.ts`)

```ts
// ONE resolver that CLI (prisma migrate/seed), next build, AND the
// running server all share — the cure for the mirror-db trap (A-8).
// tests/db-path.test.ts pins: file:../db/custom.db → <repo>/db/custom.db
```

### P-6. The AI provider seam (`src/lib/ai.ts`)

```ts
export interface AiProvider {
  readonly name: string;
  insights(ctx: AiContext): Insight[];          // the coach's insight cards
  coach(question: string, ctx: AiContext): CoachAnswer;
}
export function getAiProvider(): AiProvider {
  // Future: read WEALTHOS_AI_PROVIDER (+ credentials) and return an
  // LLM-backed implementation. Today: the deterministic engine — always
  // available, never keyed.
  return localProvider;
}
```
The route and the dialog consume the interface only; an LLM lands
behind the same seam without touching callers.

### P-7. The route twin bridge (`src/app/(app)/Dashboard/page.jsx`)

```jsx
import DashboardPage from "../dashboard/page";
export default function DashboardCapitalRoute() {
  return <DashboardPage />;              // .jsx — dodges TS1149 (A-3)
}
```

### P-8. The plain-div drawer (`src/components/layout/mobile-nav.tsx`)

```tsx
{open && (
  <div className={MOBILE_NAV_SHEET.content} role="dialog"
       aria-label="WealthOS navigation">  {/* a semantic label, but NOT a
                                         Radix Dialog (A-1) — no portal, no
                                         focus trap, no aria-hidden isolation */}
    <nav aria-label="Main navigation" className={MOBILE_NAV_SHEET.nav}>
      …NAV_ITEMS links (aria-current on the active row) + Sign Out…
    </nav>
  </div>
)}
```

### P-9. The guest wall (`src/app/page.tsx` + `guest-login-redirect.tsx`)

Server-side: authenticated → render the dashboard; guest → the redirect
shim carrying `from_url` (client redirect to `/login`). The smoke
ladder's check 05 asserts the guest root serves NO dashboard HTML.

### P-10. The deterministic seed (`prisma/seed.ts`)

`deleteMany` first (idempotent) → static entities → six months of
transactions generated from date arithmetic only (no random, no future
rows) → counts verifiable via `bun run db:census` (bounds 54..108).

## 16. Coding Anti-Patterns

| Don't | Do instead | Why |
|---|---|---|
| `new PrismaClient()` in a route | `import { db } from "@/lib/db"` | A-8 mirror db |
| Radix Dialog for the drawer | the plain conditional div | A-1 aria-hidden |
| `document` at module scope | `useIsDark()` / `useEffect` | A-2 SSR crash |
| `tailwind.config.js` | `@theme` in `globals.css` | A-4 config era |
| v4 default palette classes | re-pinned tokens (§19) | A-4 oklch drift |
| `/Dashboard/page.tsx` twin | the `.jsx` bridge | A-3 TS1149 |
| Inline rollups in pages | `src/lib/finance.ts` | testability |
| Hand-rolled `Metadata` objects | `pageMetadata()` | shallow-merge trap |
| `any` to silence tsc | `unknown` + narrowing | the 0-`any` gate |
| 403 on foreign resources | 404 | no enumeration |
| `Math.random()` in seeds | date arithmetic | determinism |
| Runtime font/CDN fetch | the local Inter-first stack | offline doctrine |
| `git push` direct | the SSH wrapper (Appendix C) | remote verification |
| Deleting imports blindly | grep importers first | A-10 |
| Positional selectors | role + accessible name | A-12 |

## 17. Responsive Breakpoint Reference

Tailwind v4 defaults, no custom breakpoints. Usage census (verified):

| Breakpoint | Where it bites | Pattern |
|---|---|---|
| `sm:` 640px | login card, dialogs, toasts, expenses/settings/investments tables | single-column → two-up grids; dialog becomes a centered sheet |
| `md:` 768px | page-parts grids | KPI card rows go 2-up |
| `lg:` 1024px | **the shell flip**: sidebar appears, mobile header/drawer retire | `lg:` grid columns on dashboard/analytics; sidebar `lg:flex` |
| `xl:`/`2xl:` | sparse (dense tables) | — |

**The mobile story (390×844 is the pinned test viewport):** sticky
mobile header (z-50: hamburger + brand + theme toggle), drawer overlay
z-40 sliding under it with content starting `pt-20`, Sign Out pinned at
the drawer's bottom. The drawer auto-closes when the viewport grows past
`lg` (superset). The e2e mobile battery (10 checks) and the 390 sweep
hold this contract.

## 18. Z-Index Layer Map

Complete census (verified by grep; keep additions inside this ladder):

| Layer | Class | Element / Location | Purpose |
|---|---|---|---|
| 20 | `z-20` | expenses table sticky header | row header stays above cells |
| 40 | `z-40` | mobile header (`mobile-header.tsx`) + drawer overlay (`mobile-nav.tsx`) | the sticky bar the drawer slides UNDER |
| 50 | `z-50` | drawer content, select/dropdown content (`select.tsx`, `dropdown.tsx`) | pop above page chrome |
| 60 | `z-[60]` | elevated select/dropdown surfaces | above the drawer when both open |
| 100 | `z-[100]` | toast viewport (`toast.tsx`) | always last |

Rules: toasts outrank everything; portal content (Radix) at 50/60; page
chrome at 20/40. New overlays join the ladder — no ad-hoc `z-[999]`.

## 19. Color Reference (Complete)

Every hex below was verified against `src/app/globals.css` `@theme` at
distillation. The full v3-re-pinned palette exists because of A-4; the
semantic layer is the API you should actually use.

**Semantic tokens (light theme):**

| Token | Hex | Class family | Usage |
|---|---|---|---|
| `--color-primary` | `#f59e0b` | `bg-primary` | CTA buttons (amber→yellow gradient), brand |
| `--color-primary-hover` | `#d97706` | | hover state |
| `--color-primary-foreground` | `#ffffff` | | text on primary |
| `--color-background` | `#faf9f7` | `bg-background` | page wash |
| `--color-surface` | `#ffffff` | `bg-surface` | cards |
| `--color-foreground` / `--color-ink` | `#1c1917` | `text-foreground` | headings/body |
| `--color-muted` / `--color-muted-ink` | `#78716c` | `text-muted` | secondary text |
| `--color-subtle` | `#a8a29e` | | tertiary text |
| `--color-line` | `#e7e5e4` | `border-line` | card borders, dividers |
| `--color-line-strong` | `#d6d3d1` | | emphasized borders |
| `--color-line-soft` | `#f5f5f4` | | table stripes |
| `--color-ring` | `#1c1917` | | focus-visible ring |
| `--color-success` / soft | `#10b981` / `#ecfdf5` | | income/positive |
| `--color-warning` / soft | `#f59e0b` / `#fffbeb` | | upcoming alerts |
| `--color-danger` / soft | `#ef4444` / `#fef2f2` | | negative/destructive |
| `--color-info` / soft | `#06b6d4` / `#ecfeff` | | neutral notices |
| `--color-chart-income` | `#14b8a6` | | cashflow income series |
| `--color-chart-expense` | `#f43f5e` | | expense series, donut |
| `--color-chart-net` | `#f59e0b` | | net line |

**Re-pinned ramps (v3 hex, the full `@theme` set):** amber 50–900
(`#fffbeb` → `#78350f`), blue 50–700 (`#eff6ff` → `#1d4ed8`), cyan
400/500 (`#22d3ee`/`#06b6d4`), emerald 50–800 (`#ecfdf5` → `#065f46`),
red 50–700 (`#fef2f2` → `#b91c1c`), rose 50–700 (`#fff1f2` → `#be123c`),
stone 50–950 (`#fafaf9` → `#0c0a09`), teal 50–700 (`#f0fdfa` →
`#0f766e`).

**Dark theme:** `.dark` class on `<html>` + `@custom-variant dark`;
`.dark body`, `.sidebar-gradient`, `.page-wash` re-map the semantic set
(stone-950 washes, stone-800 surfaces, stone-100 ink). Because surfaces
read the semantic tokens, a re-map propagates everywhere — new surfaces
must consume tokens, not hex.

**AA-critical pairings (pinned by the a11y battery):** inactive tabs
`stone-600` on `stone-100`; KPI deltas `emerald-700`/`red-700`-class;
body `stone-500`+ never below 4.5:1 on `stone-100`.

**Forbidden:** v4-default (oklch) classes; raw hex in components; new
hues outside the sanctioned register without a reference citation.

## 20. The Complete TypeScript Interface Reference

The contract surfaces (verify against source; all paths exist):

**The API envelope (`src/lib/api.ts`):**

```ts
type Envelope<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string } };
```

**Domain interfaces (`src/lib/finance.ts`)** — pure inputs/outputs,
Prisma-free (exact source shapes, verified line-by-line):

```ts
interface TxLike { id?: string; description: string; amount: number;
  type: string; /* "income" | "expense" (lowercase — the reference's own
                    convention; don't "fix" it to uppercase enums) */
  category: string; budgetCategory?: string; date: Date | string;
  recurring?: boolean; nextDate?: Date | string | null }
interface IncomeSourceLike { id?: string; name: string; amount: number;
  frequency: string; active: boolean }
interface InvestmentLike { id?: string; symbol: string; name: string;
  type: string; shares: number; avgCost: number; currentValue: number }
interface GoalLike { id?: string; name: string; targetAmount: number;
  currentAmount: number; targetDate?: Date | string | null; status: string }
interface BudgetLike { category: string; amount: number; period: string }

interface CashFlowPoint { label: string; income: number;
  expenses: number; net: number }   // label rides the "Jun 26" genus
interface HealthMetric { key: "savingsRate" | "spendingControl" | "investments";
  label: string; score: number; max: number }
interface HealthScore { total: number;
  band: "Excellent" | "Good" | "Fair" | "Needs Work";
  metrics: HealthMetric[] }        // SavingsRate 0-40 · Spending 0-30 · Investments 0-30
interface CategorySlice { category: string; value: number; pct: number;
  color: string }                   // color from CATEGORY_PALETTE in rank order
interface BudgetRow { category: string; budget: number; actual: number;
  remaining: number; pct: number; over: boolean }
interface UpcomingItem { description: string; amount: number; nextDate: Date;
  daysAway: number; category: string }
interface PortfolioStats { value: number; invested: number; gainLoss: number;
  returnPct: number; holdings: Array<{ symbol: string; name: string;
  type: string; /* …per-holding stats */ }> }
interface AllocationSlice { type: string; value: number; pct: number }
interface GoalProgress { pct: number; remaining: number;
  monthsLeft: number | null; perMonthNeeded: number | null;
  onTrack: boolean | null }
interface RecentActivityRow { id: string; description: string;
  amount: number; type: string; category: string; date: Date }
interface UnusualTx { description: string; amount: number; category: string;
  date: Date; reason: string }      // ≥2× category mean, min 3 samples
```

**The AI seam (`src/lib/ai.ts`):**

```ts
interface AiContext { transactions: TxLike[];
  incomeSources: IncomeSourceLike[]; investments: InvestmentLike[];
  goals: GoalLike[]; budgets: BudgetLike[]; currency?: string; now?: Date }
interface Insight { id: string; tone: "positive" | "neutral" | "warning";
  title: string; body: string }
interface CoachAnswer { answer: string }
interface AiProvider { readonly name: string;
  insights(ctx: AiContext): Insight[];
  coach(question: string, ctx: AiContext): CoachAnswer }
```
`getAiProvider()` returns the deterministic local engine today; the
source comments name `WEALTHOS_AI_PROVIDER` (+ credentials) as the future
swap point for an LLM-backed provider.

**Auth (`src/lib/auth.ts`):** `SESSION_COOKIE = "neo_session"` (name
survives from the scaffold; the smoke ladder greps it by name),
`SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000`; scrypt password hashes +
HMAC-SHA256-signed stateless cookie: `base64url(JSON{uid,iat,exp,v}) +
"." + hex HMAC`.

**Layout constants (`src/lib/page-layout.ts`, 262 lines):** the
structured shapes the ui primitives consume — `DIALOG_*`, `TABLE_*`,
`LOGIN_LAYOUT`, `MOBILE_NAV_LAYOUT`, `MOBILE_NAV_SHEET`, tab panel
constants. The ui primitives import these; keep the shapes structured
(objects), not flat strings.

**Zod schemas (`src/lib/schemas.ts`, 504 lines, 24 exported):** the
transaction/income-source/account/investment/goal/budget create+update
families, auth payloads (login/signup/verify/reset), import payloads,
with money/date/enum field helpers.

---

## Appendix A — Architecture Decision Records

The full ADR set with rationale lives in
`Project_Architecture_Document.md` §1.3. Index:

| ADR | Decision | Core rationale |
|---|---|---|
| ADR-001 | Next.js 16 App Router, standalone output | self-contained deploys; the e2e tier boots the real artifact |
| ADR-002 | SQLite dev / PostgreSQL-ready | zero-config local story; flip provider + URL |
| ADR-003 | Tailwind v4 CSS-first, v3-re-pinned palette | visual parity demands exact hex (A-4) |
| ADR-004 | Prisma through ONE path-anchored singleton | the mirror-db trap (A-8) |
| ADR-005 | Deterministic local AI coach behind a provider seam | offline doctrine; swap-in point for a real LLM |
| ADR-006 | Route twins via `.jsx` bridges | the reference's capitalized links (A-3) |

## Appendix B — Verification History

| Session | Scope | Gate state at ship |
|---|---|---|
| 199 (the transformation) | NEO-CRM scaffold → WealthOS: finance schema+seed, the core seams (23 lib modules), the 19-family / 30-handler API, shell + 9 sections + twins, theme, AI coach, full verification-layer rebuild, doc set, 13 VLM-verified screenshots | lint 0/0 · tsc 0 · 497 unit · build · smoke 14/14 · e2e 84/84 · census MATCH |
| 199 (continuation cures) | D-199a the N-69g port single-source (401 probe) · D-199b the smoke ladder's finance walk · D-199c the census bounds model | same, re-verified from cold |
| Pre-199 (scaffold lineage) | the NEO CRM remediation sessions (1–198) whose infra survives: auth family, db-path, boot gate, artifact hygiene, rate limits, the skills library | see `worklog.md` |

Push lineage: remote main verified at `8849248` (the session-199 ship)
via the SSH wrapper; both pushes remote-verified, key shredded each time.

## Appendix C — The SSH Push Runbook

Full instructions: `docs/how-to-git-push-using-ssh-wrapper_SKILL.md`.
The essentials:

1. The sandbox has NO `ssh` binary — deploy the paramiko shim (the
   runbook's Appendix A) on `PATH` first.
2. Materialize the operator key to a 0600 temp file OUTSIDE the repo
   (e.g. `/tmp/wealth_os_key`), never inside the tree.
3. Dry-run, then push:
   ```bash
   python3 docs/ssh_git_wrapper_v3.py --key-file /tmp/wealth_os_key \
     --remote git@github.com:nordeim/wealth-os.git
   ```
   The wrapper defaults to an older target repo — ALWAYS pass
   `--remote` explicitly. It verifies the remote ref equals local HEAD
   after the push.
4. Shred the key (`shred -u` / 3-pass overwrite) immediately after.
5. Never commit the key; never let it reach `docs/` or any tracked path.

## Appendix D — Post-Deploy Live-Site Validation

- **Smoke ladder** (`scripts/smoke-test.sh`, 14 checks): boots the
  standalone artifact on :3210 with a scratch `db/smoke.db`; walks the
  finance API (401 wall → sessioned read → Zod 400 → minimal create),
  the guest-root server-side wall, the `neo_session` cookie, and the
  artifact-hygiene loop.
- **Reference probing** (`bun run probe:ref`): drift-probes the live
  reference for genus changes.
- **Sweeps** (`bun run sweep` / `sweep:fullpage` / `census:interior`):
  `sweep.ts` is WealthOS-native through session 205's R-4.2 (the R-4.1
  re-anchor — URL + 11-page set — plus the per-page resolved-theme
  match and the four derived baseline class tables; pinned in
  tests/sweep-tool.test.ts), and `drift-probe.ts` + `interior-census.ts`
  are WealthOS-native through session 206's R-4.3 (the
  reference-stability probe — bundle fingerprint + sentinel demo census
  + the functional mobile-menu check, pinned in
  tests/drift-probe-tool.test.ts; the interior census — 11-page set,
  anchor fallback, four-axis standing allowances at zero margin, pinned
  in tests/interior-census-tool.test.ts); `sweep:fullpage` re-anchored
  at session 210 (R-4.4 — the 11-page below-the-fold axis at the sweep's
  own classes, the zero-data sentinel, the derived per-class baselines,
  pinned in tests/fullpage-sweep-tool.test.ts). Until R-4.5 reactivates
  `gate:full`, parity evidence
  = e2e + VLM captures.
- **agent-browser + VLM**: for capturing evidence (login, nine sections,
  mobile faces, drawer-open) — save under `docs/screenshots/`, verify
  with the VLM battery (the A-12 catch was a VLM find), and target
  controls by role+name.

## Appendix E — The Skills Library

`skills/` (excluded from code checking, testing, and compilation) carries
the operator's skill library — `skills/skills-catalog.md` indexes it.
The load-bearing ones for this repo:

- `skills/web-application/SKILL.md` — the generalized engineering skill
  this codebase's conventions distill from (§0 scaffolding order through
  §20 known-issues register).
- `skills/replicate-web-app/` — the parity doctrine (computed styles as
  ground truth, AI-stub policy, empty-state genus).
- `skills/tdd/`, `skills/test-driven-development/` — the RED → GREEN →
  REFACTOR discipline.
- `skills/clone-app-pat-pro/`, `skills/agent-browser/` — reference
  recon and browser automation.
- `skills/readme-md/`, `skills/agents-md/`, `skills/claude-md/`,
  `skills/project-architecture-document-md/` — the doc-set conventions.
- `skills/distill-codebase-skill/` + `skills/to-distill-project-into-skill/`
  — the meta-skill this file was produced with (six-phase distillation;
  every claim verified against the tree).
- `skills/how-to-git-push-using-ssh-wrapper/` — mirrors Appendix C.

Grep the catalog before building anything non-trivial — the library
predates this app and most traps already have a distilled cure.

---

*End of skill. Produced by the six-phase distillation process
(ANALYZE → PLAN → VALIDATE → IMPLEMENT → VERIFY → DELIVER) at the
session-199 ship state; every version, count, hex, and path was verified
against the working tree. Maintenance contract: bump the minor version
on every sprint that changes any pinned fact; re-verify all counts and
hexes before trusting a stale copy (§6 of the meta-skill).*
