# Implementation Plan — Session 199: The WealthOS Transformation

**Target:** `https://wealth-os-d93bd04e.base44.app/` (Base44 app id `69838104f8e87b03d93bd04e`)
**Repo:** `nordeim/wealth-os` (this checkout), branch `main` only
**Method:** six-phase workflow (ANALYZE → PLAN → VALIDATE → IMPLEMENT → VERIFY → DELIVER)
**Date:** 2026-11-08

---

## 1. Situation

The repository's prior 198 sessions built **NEO CRM** — a clone of a different
(closed-platform CRM) reference. This session's operator directive names a NEW
reference: **WealthOS**, a personal-finance workspace on Base44. The directive
explicitly instructs to use the cloned repo "for scaffolding purposes —
customize and extend it as necessary", i.e. **transform the codebase into a
WealthOS clone** while retaining the battle-tested infrastructure (Next.js 16
App Router + React 19 + TS strict + Tailwind v4 CSS-first + Prisma/SQLite +
Zod + Vitest/Playwright + the local gate + the SSH push wrapper).

## 2. Reference evidence (live-observed, agent-browser + VLM)

Credentials for the authorized account were supplied by the operator
(`sepnetflix2023@outlook.com`). They are never written into the tree.

### 2.1 Route matrix (all Verified by live navigation)

| Route | Access | Observed content |
|---|---|---|
| `/` | authed → dashboard; guest → `/login?from_url=…` | Redirect only |
| `/login` | public | Single centered white card on light blue-gray bg; circular logo badge; "Welcome to WealthOS"; 4 social buttons (Google/Microsoft/Facebook/Apple); OR divider; Email+Password; "Sign in" navy button; "Forgot password?" / "Need an account? Sign up" |
| `/Dashboard` (capital D) | authed | "Financial Dashboard" + date; AI Coach / Refresh / Add Transaction buttons; 4 KPI cards (Monthly Income, Monthly Expenses, Net Balance, Savings Rate); Cash Flow Overview (1M/3M/6M/1Y segmented, area chart, legend Income/Expenses/Net Savings); Financial Health Score (gauge + 3 metric bars + amber callout); Expense Breakdown (pie, empty state); Budget vs Actual; Upcoming & Alerts; Recent Activity; AI Insights (+ Ask AI); Quick Actions (Add Income/Add Expense/Set Goal/View Reports as links) |
| `/Income` | authed | "Income Sources" + "Track and manage all your income streams"; Add Income Source; Total Monthly Income card; empty state "No Income Sources Yet" |
| `/Expenses` | authed | "Expenses" + "Track and categorize all your spending"; Add Expense; Total + Needs/Wants/Savings summary; search box; "Filters" button (badge count); tabs All/Needs/Wants/Savings; Expense History (n); empty state |
| `/Accounts` | authed | "My Accounts" + "Manage your connected bank accounts"; Add Account; empty state |
| `/Investments` | authed | "Investments" + "Track your portfolio performance"; Portfolio Value / Total Gain-Loss / Total Return % KPIs; Portfolio Performance chart (1M/3M/6M/1Y); Asset Allocation; risk analytics; Portfolio Holdings table (Asset, Name, Type, Invested, Current Value, Gain/Loss, % of Portfolio); empty state |
| `/Import` | authed | "Import Transactions" + "Upload a CSV from your bank to quickly add expenses."; Step 1: Upload File (CSV/XLS/XLSX ≤ 10MB); "Upload and Extract" (disabled until file) |
| `/Analytics` | authed | "Analytics & Reports" + "Real-time insights into your financial performance"; date-from/date-to pickers; period combobox (6 Months); Refresh; Export; tabs Overview/Expenses/Income/Investments; charts (Income vs Expenses Trend etc.) |
| `/Goals` | authed | "Savings Goals" + "Set and track your financial objectives"; New Goal; empty state |
| `/Settings` | authed | "Settings" + "Customize your budget planning experience"; Profile Settings (Default Currency, Date Format); Notifications (4 switches); Export Your Data (GDPR JSON, "Export All Data"); Import warning ("Select Finara Export File"); Your Data Summary badges (Encrypted/Synced/Multi-Device/Private/Your Eyes Only/GDPR Compliant); Save Settings |

### 2.2 Shell construction (computed-style ground truth)

- **Desktop sidebar**: `aside.hidden.lg:flex.lg:w-64.lg:flex-col` →
  `div.flex.flex-col.flex-1.min-h-0.sidebar-gradient.relative`; brand block
  `h-16 px-6 border-b border-amber-500/20`; logo `w-10 h-10
  bg-gradient-to-br from-amber-400 to-yellow-600 rounded-xl
  shadow-lg shadow-amber-500/20` with dark `$` glyph; wordmark
  `text-xl font-bold` gradient text `from-amber-200 via-yellow-300
  to-amber-200 bg-clip-text text-transparent`; subtitle `text-xs
  text-amber-400/80` "Premium Finance Suite". Nav items `px-4 py-3
  rounded-xl`; **active** = `bg-gradient-to-r from-amber-500/20
  to-emerald-600/20 text-amber-200 shadow-lg border border-amber-400/30
  backdrop-blur-sm`; **inactive** = `text-stone-300` + hover gradient
  `from-white/5 to-amber-500/5`. Footer: `✓ Synced` green pill + user row
  (avatar initial, name, email) → dropdown with **Dark Mode** / **Sign Out**.
- **`.sidebar-gradient`** (extracted from CSSOM):
  `linear-gradient(rgb(15,20,25) 0%, rgb(28,25,23) 50%, rgb(15,20,25) 100%)`
  + `::before` overlay
  `linear-gradient(135deg, rgba(212,175,55,.05), transparent 50%, rgba(4,120,87,.05))`;
  dark variant `rgb(12,10,9)/rgb(28,25,23)/rgb(12,10,9)`.
- **Mobile drawer** (< lg): `lg:hidden fixed inset-0 z-40
  bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900` — a
  FULL-SCREEN gradient drawer (not a side sheet): `flex flex-col h-full
  pt-20`, nav `flex-1 px-4 py-6 space-y-2`, items `px-4 py-4 rounded-xl`
  with `text-lg` labels and `w-6 h-6` icons (same active/inactive
  treatment as desktop), **Sign Out** button at the bottom. Header keeps
  the brand + theme toggle + hamburger (moon icon + menu icon at `w-4 h-4`/
  `w-5 h-5`).
- **Dark mode**: `document.documentElement.className === "dark"` — toggled
  from the user menu ("Dark Mode" menu item) and the mobile header moon
  button. Dark surfaces: page bg ≈ `#0e1310` green-black; warm dark cards
  ≈ `#131210` with faint amber border; cool cards ≈ `#1d2733`.
- **Topbar (page header)**: H1 `text-3xl md:text-4xl font-bold` +
  long-date subtitle; right-aligned buttons.
- **Typography**: Inter (Google Fonts, weights 400–800) — the reference
  loads it via `@import`; we register Noto-Sans-class system stack with
  Inter first (no external font fetch in the self-hosted clone; documented
  deviation) — `--font-sans: Inter, ui-sans-serif, system-ui, …`.
- **Primary button**: amber gradient (`from-amber-500 to-yellow-600`
  family), rounded-lg, white bold text.
- **KPI cards**: white, rounded-xl~2xl, soft shadow; label; big value;
  delta with arrow; colored icon tile right (emerald income / rose
  expenses / amber wallet / purple target).
- **Cash Flow legend colors**: Income teal `#2dd4bf`/`#14b8a6`, Expenses
  rose `#ef3e5c`/`#f43f5e`, Net Savings amber `#e0a82e`.
- **Reference stack notes**: Tailwind v3 via `cdn.tailwindcss.com` (console
  warning observed), React, recharts-style SVG charts, Base44 entities API
  (`/api/apps/{appId}/entities/{Entity}`), session re-auth on 403.
- **Add Expense modal**: header ($ icon + title + ×); "Quick Select
  Category" — 5 emoji chips (🏠 Rent/Mortgage, 🛒 Groceries, ⚡ Utilities,
  🚗 Transportation, 🏥 Healthcare); "Or fill manually" → form:
  Description (required, prefilled by chip), Amount (USD, required) with
  +$1/+$5/+$10/+$50/+$100/+$500 quick-add, budget-category combobox
  (Needs), category combobox (Groceries), date picker (default today),
  Notes (optional), "This is a recurring expense" switch; buttons
  "← Back to Quick Select", "Cancel", "Add Expense".
- **AI Coach modal**: "AI Financial Coach" header (bot icon tile),
  scrollable messages, 5 suggested-question chips ("How much did I spend
  on dining this month?", "What are my top spending categories?", "Am I
  on track with my savings goals?", "Show me unusual transactions?",
  "How can I save more money?"), input "Ask me about your finances..." +
  send.
- **Quick Action links** (dashboard): Add Transaction→/Expenses,
  Add Income→/Income, Add Expense→/Expenses, Set Goal→/Goals,
  View Reports→/Analytics (live-extracted hrefs).

### 2.3 Reference empty-state genus

The operator's account carries **zero data** — every list/chart renders its
empty state. Our seeded demo workspace (rich data, alive charts) is the
established repo convention; empty states are implemented and exercised by
tests (fresh signup users see exactly the reference's empty genus).

## 3. Architecture decisions (Stack Decision Record)

| Area | Reference | Clone | Rationale |
|---|---|---|---|
| Framework | React SPA on Base44 | Next.js 16 App Router (kept scaffold) | Preserve the repo's proven stack; server components + API routes |
| Styling | Tailwind v3 CDN runtime | Tailwind v4 CSS-first `@theme` (kept) | The repo's v4 hardening (v3 palette re-pins, hover-variant unwrap, shadow/blur renames) is exactly the skill-validated approach; tokens re-pinned to WealthOS values |
| Dark mode | `.dark` class | `@custom-variant dark` + class strategy + `localStorage` + system default | Reference behavior; no FOUC via inline script |
| Fonts | Inter via Google `@import` | `Inter` first in `--font-sans` stack, no external fetch | Self-hosted production posture; no runtime third-party dependency (deviation documented) |
| DB / API | Base44 entities API | Prisma/SQLite + Zod-validated `/api/*` routes (envelope `{ok,data|error}`) | Real backend, per replicate-web-app skill (never proxy the platform) |
| Auth | Base44 session (email+social) | Kept hardened scrypt + HMAC httpOnly cookies + rate limiting + verification/reset funnels | Security superset; social buttons rendered for parity, click explains configuration (no dead controls) |
| Charts | recharts-like SVG | recharts 3 (already a dep) | Same chart genus, tested |
| AI | Base44 AI (LLM) | `AiProvider` seam: deterministic `LocalInsightsProvider` (rule-based finance analysis) + optional env-configured LLM provider | Fully functional offline; no hardcoded keys (skill §AI-stub policy) |
| Brand | WealthOS "Premium Finance Suite" | kept verbatim | Authorized clone |

## 4. Data model (Prisma, SQLite)

`User` (kept: auth fields, tokenVersion, verification/reset) minus CRM
relations, plus finance relations. New entities:

- **IncomeSource** — name, type (salary|freelance|business|investment|rental|other),
  amount, frequency (monthly default), active, nextPaymentDate?, notes?, icon?
- **Transaction** — description, amount, type (income|expense),
  category, budgetCategory (needs|wants|savings), date, notes?,
  recurring (bool), nextDate? (upcoming/recurring), accountId?
- **Account** — name, type (checking|savings|credit|investment|cash),
  institution, balance, currency, lastSyncedAt, color?
- **Investment** — symbol, name, type (stock|etf|bond|crypto|realestate|other),
  shares, avgCost, currentValue, purchaseDate?, notes?
- **Goal** — name, targetAmount, currentAmount, targetDate?,
  category (emergency|vacation|house|car|retirement|education|other),
  status (active|completed|paused), icon?
- **Budget** — category, amount, period (monthly)
- **Setting** (singleton) — defaultCurrency, dateFormat, notifications
  (push/email/budgetWarnings/monthlyReports), theme

Seed: rich demo workspace for `sepnetflix2023@outlook.com` (the repo's
established demo login) — income sources, ~60 transactions across 6 months,
bank accounts, investments, goals, budgets.

## 5. Work packages

| WP | Content | Key files |
|---|---|---|
| WP-1 | Design tokens: WealthOS palette (light+dark), sidebar-gradient, Inter stack, dark variant | `src/app/globals.css` |
| WP-2 | Prisma finance schema + seed | `prisma/schema.prisma`, `prisma/seed.ts` |
| WP-3 | Nav + constants + format + domain seams (health score, cash-flow series, KPI deltas, allocation, budget-vs-actual, gain/loss, savings rate, AI insights rules, CSV import/export) | `src/lib/*` |
| WP-4 | API routes: transactions, income-sources, accounts, investments, goals, budgets, dashboard, analytics, ai/coach, import, export (keep auth/users/search/health/upload/reset) | `src/app/api/**` |
| WP-5 | Shell: sidebar, topbar (hamburger + theme toggle + user menu), FULL-SCREEN mobile drawer (reference construction + kept supersets), theme provider, app-shell | `src/components/layout/**` |
| WP-6 | Login/signup (WealthOS card) | `src/app/login`, `src/app/signup`, `login-card.tsx` |
| WP-7 | Dashboard page (KPIs, cash-flow chart, health gauge, expense pie, budget-vs-actual, upcoming, recent activity, AI insights, quick actions) | `src/app/(app)/dashboard` |
| WP-8 | Income + Expenses pages (dialogs incl. quick-select) | `src/app/(app)/income`, `expenses` |
| WP-9 | Accounts + Investments pages | `src/app/(app)/accounts`, `investments` |
| WP-10 | Import (CSV 3-step), Analytics (4 tabs), Goals, Settings | `src/app/(app)/import`, `analytics`, `goals`, `settings` |
| WP-11 | AI Coach modal (provider seam, suggested questions) | `src/components/shared/ai-coach.tsx` |
| WP-12 | Tests: unit seams + page-layout/tokens + e2e journeys (login, 9 sections, add-expense round-trip, mobile drawer, dark mode) | `tests/**` |
| WP-13 | Docs: README, AGENTS, CLAUDE, PAD, this plan, worklog | root + `docs/` |
| WP-14 | Screenshots (desktop/mobile/drawer), full gate, SSH push | `docs/screenshots/`, wrapper |

Route aliases: reference serves the dashboard at BOTH `/` and `/Dashboard`
(caps) — keep the `.jsx` alias technique (TS1149 casing guard) for
`/Dashboard`, `/Income`, `/Expenses`, `/Accounts`, `/Investments`,
`/Import`, `/Analytics`, `/Goals`, `/Settings`.

## 6. Acceptance criteria

1. `bun run lint && bun run typecheck && bun run test && bun run build` green;
   smoke + e2e green (CI=1).
2. All 11 reference routes render with visual parity (structure, palette,
   typography, empty states) — agent-browser side-by-side + VLM check.
3. Mobile drawer works: opens from hamburger (< lg), full-screen gradient,
   Sign Out at bottom, closes on nav/Escape/resize-past-lg; e2e-pinned.
4. Dark mode persists via user menu + mobile moon toggle.
5. `.env` keeps `DATABASE_URL="file:../db/custom.db"`; `db/` at repo root.
6. Vitest + Playwright suites cover the finance seams and journeys.
7. Docs set (README/AGENTS/CLAUDE/PAD/worklog) describes the WealthOS app.
8. Screenshots under `docs/screenshots/`.
9. Conventional commits on `main`; push via `docs/ssh_git_wrapper_v3.py`.

## 7. Risks / deviations ledger

| Area | Deviation | Rationale |
|---|---|---|
| Fonts | No Google Fonts fetch; Inter-first system stack | Self-hosted production; no third-party runtime dep |
| Social login buttons | Rendered, click → explanatory toast | No OAuth client configured; no dead controls |
| AI answers | Deterministic local engine (LLM optional via env) | Offline-capable, testable, no key leakage |
| Demo data | Seeded demo user (reference account is empty) | "Fully functioning" + alive charts; empty states kept for fresh users |
| Base44 edit badge | Not replicated | Platform chrome, not app functionality |
| Analytics depth | 4 tabs implemented with real aggregations | Parity + superset |
