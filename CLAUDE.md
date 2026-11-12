---
IMPORTANT: File is read fresh for every conversation. Be brief and practical.
---

# WealthOS

## Core Identity & Purpose

WealthOS is a self-hostable premium personal-finance workspace: income,
expenses, bank accounts, investments, budgets, savings goals, CSV import,
analytics, and an AI financial coach in one dashboard. It is a functional
superset of the original Base44 reference app (`wealth-os-d93bd04e.base44.app`)
at visual parity with it. Maintained by nordeim; developed through
agent sessions recorded in `worklog.md`.

The stack: Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4
(CSS-first), Prisma/SQLite, Zod, Zustand, Radix primitives, recharts,
Vitest + Playwright. Single deployment artifact (standalone output).

## Foundational Principles

### Meticulous Approach (Six-Phase Workflow)

Follow this six-phase workflow for all implementation tasks:

1. **ANALYZE** — mine requirements deeply; never assume surface-level
   reading is enough. Read the repo docs (`AGENTS.md`, this file, the PAD,
   `docs/remediation_plan_v2.md` (the living findings ledger),
   `docs/Tailwind-V4-Validation-Report.md`, `wealth-os_SKILL.md` — the
   distilled engineering skill) and `skills/skills-catalog.md`
   before building.
2. **PLAN** — structured roadmap; save substantive plans under `docs/`.
3. **VALIDATE** — confirm the plan against the codebase's pinned
   contracts (tests are the executable spec).
4. **IMPLEMENT** — modular, tested, documented; smallest safe diff.
5. **VERIFY** — run the full gate; evidence over assertion (never claim
   "works" without executing it).
6. **DELIVER** — conventional commits on main; push via the SSH wrapper;
   update `worklog.md` and this doc set when behavior changes.

### Project-Specific Principles

- **Parity + superset**: match the reference's visual genus exactly
  (computed styles are ground truth, not screenshots); exceed it only in
  functionality.
- **Determinism everywhere**: the seed, the AI coach, and the test data
  are all deterministic — no `Math.random()` in seeded paths.
- **The gate is the contract**: lint 0/0 · tsc 0 · 1282 unit · build ·
  smoke 15/15 · 140 e2e. A green gate achieved by weakening a guardrail is
  not a fix.
- **Offline-capable by default**: no runtime third-party calls (fonts,
  AI, analytics). The AI coach is a local engine.

## Implementation Standards

### General Coding Practices

- Early returns over nested conditionals; composition over inheritance.
- Self-documenting names; comments explain WHY, never WHAT.
- Test-driven where the environment supports it (RED → GREEN → REFACTOR).
- Never use `any` — `unknown` + narrowing. Prefer `interface` for object
  shapes, `type` for unions.

### TypeScript / React 19 / Next.js 16

- Server Components by default; `'use client'` only where interactivity
  demands it (pages under `src/app/(app)/<section>/` are client pages fed
  by the API).
- React 19: no `forwardRef`; function components with `ref` as a prop.
- Route handlers return the `ok()/ERR.*` envelope from `src/lib/api.ts`;
  guard with `requireSession()`; parse with the Zod schemas in
  `src/lib/schemas.ts` — copy the shape of
  `src/app/api/transactions/route.ts`.
- Metadata ONLY through `pageMetadata()` (`src/lib/site.ts`); absolute
  titles; sitemap/robots/manifest derive from the same source.
- Tailwind v4: tokens in `@theme` (globals.css), literal hex, no config
  file, v3-re-pinned palette values (v4 oklch defaults render differently).

### State & Data

- Client state: `src/stores/wealthos-store.ts` (Zustand). Server state:
  fetch from the API family; keep derived UI state out of the store.
- Domain math lives in `src/lib/finance.ts` (pure, tested functions) —
  never inline rollups in components.
- Prisma access ONLY through `src/lib/db` (the path-anchored singleton;
  prisma 7: the PrismaLibSql driver adapter + the generated client in
  `src/generated/prisma`, postinstall-regenerated). `DATABASE_URL=`
  `"file:../db/custom.db"` resolves through the db-path seam — keep `db/`
  at the repo root, git-ignored.

## Development Workflow

### Environment Setup

```bash
bun install
cp .env.example .env          # DATABASE_URL is ready for local dev
bun run db:push && bun run db:seed
bun run dev                   # http://localhost:3000
```

Demo login: `sepnetflix2023@outlook.com` / `$Abcd1234`.

### Build Commands

| Command | Purpose |
|---------|---------|
| `bun run dev` | Dev server (:3000) |
| `bun run build` | Production standalone build |
| `bun run start` | Serve the standalone artifact (needs build) |
| `bun run test` | Unit suite (Vitest, 1282 checks) |
| `CI=1 bun run test:e2e` | E2E suite (Playwright, 140 checks, own db + :3100) |
| `bun run lint` | ESLint, fails on warnings |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run gate` | The full chain: lint → typecheck → test → build → smoke → e2e |
| `bun run gate:full` | The chain + the six parity drift gates (active since v2.8.0/R-4.5 — run when parity surfaces changed; needs the live reference) |

## Testing Strategy

### Test Pyramid

- **Unit (Vitest)**: domain math, schemas, AI engine, auth contract,
  architecture pins (`gate-script`, `db-census`, `route-case`…), property
  tests via fast-check. 1282 checks / 81 files.
- **E2E (Playwright, chromium)**: journeys per section, mobile drawer at
  390×844 (incl. the short-viewport scroll leg), the fresh-visitor dark
  default, dialogs, route-alias equivalence, the 401 auth-wall probe.
  140 checks / 7 specs. `playwright.config.ts` pins `db/e2e.db`, global
  setup reseeds, storageState authenticates; specs opt OUT with an empty
  storageState when testing guests.
- **Smoke (bash)**: boots the standalone artifact on :3210 with a scratch
  db; 15 assertions including the AUTH_SECRET boot-gate and artifact
  hygiene.

### Conventions

- Regression test required for every bug fix (fails before, passes after).
- Architecture contracts are pinned — update the pin in the same commit
  as a legitimate contract change, with the rationale in the commit body.
- The seed's transaction count is date-dependent (never seeds the
  future); the census pins static entities exactly and transactions as
  bounds 54..108.

## Code Quality Standards

### Linting & Formatting

```bash
bun run lint        # eslint . --max-warnings 0 — the 0/0 standard is load-bearing
bun run typecheck   # tsc --noEmit
```

## Git & Version Control

### Branching Strategy

- **main only** — no feature branches, ever. All commits land on main.

### Commit Standards

- Conventional Commits; atomic commits; the message explains why.
- Push ONLY via `python3 docs/ssh_git_wrapper_v3.py --key-file <key>
  --remote git@github.com:nordeim/wealth-os.git` — it verifies the remote
  ref equals local HEAD after the push. Runbook (incl. the paramiko ssh
  shim for ssh-less sandboxes): `docs/how-to-git-push-using-ssh-wrapper_SKILL.md`.
- Run `bun run gate` before every push; run `bun run gate:full` (the
  parity chain — active since v2.8.0/R-4.5) when parity surfaces
  changed or per the standing cadence. Commit before push (the wrapper
  pushes commits, not the working tree).

## Error Handling & Debugging

- API handlers: `try/catch` → `ERR.INTERNAL()`; validation failures →
  `ERR.BAD_REQUEST(msg)` with the Zod message; ownership checks → 404,
  never 403 (no resource enumeration).
- Client: explicit loading/empty/error states; toasts on mutation
  outcomes; buttons disabled during async.
- Reproduce before fixing; find the root cause; the repo's distilled
  failure modes are in `AGENTS.md` § "Gotchas that have bitten before"
  (bun DATABASE_URL absolutization, Radix aria-hidden trap, SSR window
  access, stale .prisma client).
- Visual parity evidence: the e2e battery + VLM-verified captures
  (`docs/screenshots/`); the sweep, drift-probe, and interior-census
  legs are WealthOS-native through R-4.3 and the baselines re-derived
  at session 207's R-7.5 (the parity convergence: the theme-matched baseline
  class tables; the reference-stability probe — bundle fingerprint,
  sentinel demo census, functional mobile-menu check; the interior
  census — four-axis standing allowances at zero margin with
  mutation-proof teeth; the R-7 convergence dropped every section share —
  import collapsed 75.1→31.2 desktop); the fullpage leg re-anchored at
  session 210 (R-4.4: the 11-page below-the-fold axis, the zero-data
  sentinel, the derived per-class baselines — clean at both classes).

## Communication & Documentation

- Explain why, not just what; document assumptions and constraints.
- When behavior/interfaces change, update README + PAD + this file +
  `worklog.md` in the same session (docs lockstep).
- Session log: prepend your session to `worklog.md` (Task ID, what
  changed, what was verified, what remains).

## Project-Specific Standards

### Architecture

- **Route twins**: lowercase dirs hold the real pages; capital dirs
  re-export through `.jsx` bridges (TS1149 technique). Both must exist.
- **Shell**: `src/components/layout/app-shell.tsx` wraps every `(app)`
  page (sidebar + mobile drawer + header + theme); the (app) layout
  makes the session decision server-side.
- **Root `/`** serves the dashboard to authenticated visitors and
  login-walls guests server-side (client redirect shim with `from_url`).

### API Design

REST-ish resource families under `/api/*` with the unified envelope;
Zod at every boundary; destructive endpoints marked and rate-limited.

### Database / Data Layer

Prisma + SQLite (PostgreSQL-ready: flip provider + `DATABASE_URL`).
8 models: User, IncomeSource, Transaction, BankAccount, Investment,
Goal, Budget, Setting. Migrations via `bun run db:push`; the seed is
idempotent (`deleteMany` first).

### Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | SQLite/Postgres URL; relative `file:` resolves against `prisma/schema.prisma` | `file:../db/custom.db` |
| `AUTH_SECRET` | Session-cookie HMAC key; prod boot refuses to serve without ≥16 chars | `openssl rand -hex 32` |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (metadata/SEO); inlined at build | `https://wealthos.example.com` |
| `NEO_PROXY_HOPS` | Trusted proxy depth for rate-limit keying (fails closed) | `""` |
| `NEO_DISABLE_IN_APP_OTP` / `NEO_DISABLE_IN_APP_RESET` | `"1"` = stop returning codes/links in responses (real mail transport owns delivery) | `""` |

## Anti-Patterns to Avoid

- **Weakening gates**: skipping tests, raising warning budgets, `any`
  casts to silence tsc — never; fix the code.
- **Raw PrismaClient** outside `src/lib/db` — the mirror-db trap.
- **Radix Dialog for the mobile drawer** — the aria-hidden trap.
- **v4 default palette classes** in new UI — pin v3 values per the
  Tailwind validation report.
- **`Math.random()`/`Date.now()` in seeds or test fixtures** — breaks
  determinism (the dashboard test uses a stable `now`).
- **Network fetches at runtime** (fonts, AI, CDNs) — offline by design.
