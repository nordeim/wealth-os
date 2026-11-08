# AGENTS.md — WealthOS

High-signal operating instructions for AI coding agents working in this repo.
Read this before touching anything. Everything here is load-bearing — verify
against the executable sources (`package.json`, config files) if unsure.

## What this repo is

WealthOS: a self-hostable personal-finance workspace (Next.js 16 App Router
+ React 19 + TS strict + Tailwind v4 CSS-first + Prisma/SQLite + Zod +
Vitest/Playwright). It is a functional superset of the original Base44
reference app with visual parity. **main branch only** — never create
branches; push via `docs/ssh_git_wrapper_v3.py` (runbook:
`docs/how-to-git-push-using-ssh-wrapper_SKILL.md`).

## Commands

| Task | Command |
|---|---|
| Install | `bun install` |
| Dev server | `bun run dev` (:3000, tees to `dev.log`) |
| Lint (fails on warnings) | `bun run lint` |
| Typecheck | `bun run typecheck` |
| Unit tests | `bun run test` |
| Single unit file | `CI=1 ./node_modules/.bin/vitest run tests/<file>.test.ts` |
| E2E (boots own server) | `CI=1 bun run test:e2e` |
| Single e2e spec | `CI=1 ./node_modules/.bin/playwright test tests/e2e/<spec>.spec.ts` |
| Build (standalone) | `bun run build` |
| Smoke (needs build first) | `bun run smoke` |
| **Full gate (run before push)** | `bun run gate` = lint → typecheck → test → build → smoke → `CI=1 test:e2e` |
| Parity gate | `bun run gate:full` — dormant: the sweep/census scripts still target the NEO-CRM reference and page set (the WealthOS re-derivation is the named next round); the pre-push bar is `bun run gate` |
| DB push / seed / census | `bun run db:push` / `db:seed` / `db:census` |

## Non-negotiable conventions

- **Gate order is fixed**: lint → typecheck → test → build → smoke → e2e.
  No hosted CI exists; the local gate is the only gate. Never weaken it
  (no `--max-warnings` increases, no skipped tests, no `any`).
- **Pre-ship `bun audit` re-triage** (the security ledger, PAD §10): re-run
  it before every push. A NEW runtime-chain advisory is cured same-session,
  never deferred; dev-toolchain bumps wait for a dedicated dependency round.
  The census + the runtime-zod floor are pinned
  (`tests/security-ledger.test.ts`) — keep the ledger and the pins in
  lockstep.
- **The db lives at `<repo>/db/custom.db`** (`DATABASE_URL="file:../db/custom.db"`
  in `.env`, resolved against `prisma/schema.prisma` in CLI, `next build`,
  AND the running server — `src/lib/db-path.ts` implements the anchor
  logic; `tests/db-path.test.ts` pins it). Never introduce a raw
  `new PrismaClient()` outside `src/lib/db` — the CWD/bun-absolutization
  trap opens a mirror db elsewhere.
- **E2E has its own database**: `playwright.config.ts` pins
  `DATABASE_URL=file:../db/e2e.db` and global-setup reseeds it. The e2e
  port literal ("3100") lives ONLY in `tests/e2e/e2e-port.ts`.
- **API envelope** (`src/lib/api.ts`): every handler returns
  `{ ok, data } | { ok, error: { code, message } }`, guards with
  `requireSession()`, and parses bodies through a Zod schema
  (`src/lib/schemas.ts`). Follow `src/app/api/transactions/route.ts` as
  the reference implementation.
- **Capital + lowercase route twins**: the reference serves
  `/Dashboard` and `/dashboard`. The lowercase dirs hold the real pages;
  the capital dirs re-export via a `.jsx` bridge (TS1149 technique — a
  `.tsx` re-export of a client page breaks the build). Keep both when
  adding sections; `tests/route-case.test.ts` polices the parity.
- **Tailwind v4 gotchas** (see `docs/Tailwind-V4-Validation-Report.md`):
  CSS-first `@theme` in `globals.css`, NO `tailwind.config.js`, NO
  `var()` chains inside `@theme` (semantic tokens are literal hex).
  v4 re-derived the default palette in oklch — the app pins the v3
  values it needs (shadows/blur renames included). New colors must be
  re-pinned the same way, not pulled from v4 defaults.
- **The mobile drawer is a plain conditional `<div>`**, NOT Radix Dialog —
  Radix marks outside content `aria-hidden`, which hides the header's ✕
  from the a11y tree (a real e2e failure). Don't "upgrade" it.
- **The AI coach is deterministic and local** (`src/lib/ai.ts`), per the
  replicate-web-app AI-stub policy — no network calls, no API keys.
- **`pageMetadata()`** (`src/lib/site.ts`) is the only metadata factory;
  titles are absolute strings; sitemap/robots/manifest derive from it.
  `tests/metadata.test.ts` + `tests/pwa-metadata.test.ts` pin the family.
- **Session cookie is `neo_session`** (HMAC-signed, 7-day TTL) — the name
  survives from the scaffold; the smoke ladder greps it by name.

## Testing rules

- Write the failing test first for new logic (RED → GREEN → REFACTOR).
- Bug fixes need a regression test that fails before and passes after.
- Architecture contracts are pinned in tests (`gate-script`, `db-census`,
  `docs-counts`, `route-case`, `nav-config`, `page-titles`). When a
  contract legitimately changes, update the pin in the same commit and say
  why — never delete a pin to make a gate pass.
- The seed's transaction total is **date-dependent by design** (never seeds
  future rows); the census pins it as bounds 54..108, static entities
  exactly. Recalibrate bounds only when the generator plan changes.
- a11y: every page must stay axe-clean at WCAG 2.2 AA; contrast fixes
  prefer darkening one Tailwind step over restyling.

## Git

- main only, Conventional Commits (`feat:`, `fix:`, `test:`, `docs:` …),
  atomic commits, message explains **why**.
- Never commit: `.env`, `db/*.db`, `dev.log`, `test-results/`, keys,
  scratch scripts. `.gitignore` covers the classes; keep it that way.
- Push ONLY through `python3 docs/ssh_git_wrapper_v3.py --key-file <key>
  --remote git@github.com:nordeim/wealth-os.git` (the wrapper verifies the
  remote ref equals local HEAD afterward). The sandbox has no `ssh`
  binary — deploy the paramiko shim from the runbook's Appendix A on
  PATH first. Shred the key after use.

## Where things live

- Domain math (monthly rollups, 50/30/20, cashflow series): `src/lib/finance.ts`
- AI coach engine: `src/lib/ai.ts` (provider seam + deterministic insights)
- Validation: `src/lib/schemas.ts` (Zod; money/date/enum field helpers)
- Shell family: `src/components/layout/` (app-shell, sidebar, mobile-nav,
  mobile-header, theme, nav-config)
- Shared page building blocks: `src/components/shared/page-parts.tsx`
- Client state: `src/stores/wealthos-store.ts` (Zustand)
- Layout constants (dialogs, tables, login): `src/lib/page-layout.ts`
- Skills library: `skills/skills-catalog.md` (grep it before building
  anything non-trivial — replication, engineering, doc, and push skills)
- The living remediation program: `docs/remediation_plan_v2.md` (the
  versioned findings ledger + R-item program — read §2 before auditing,
  append an execution-history row every session that ships a cure)
- The distilled engineering skill: `wealth-os_SKILL.md` (repo root — the
  20-section reference: design tokens, domain seams, anti-pattern ledger,
  debugging guide, pre-ship checklist; every fact verified against the
  tree at session 199's ship state)
- Session history: `worklog.md` (append your session at the top)

## Gotchas that have bitten before

- **Bun absolutizes relative `file:` DATABASE_URL** against the `.env`
  file's directory when running scripts — `src/lib/db-path.ts` re-anchors;
  don't bypass the `db` singleton.
- **Radix Dialog + outside interactive elements** = `aria-hidden` trap (see
  the mobile drawer note above).
- **`document`/`window` in module scope** breaks SSR — use the `useIsDark()`
  hook pattern (`src/components/layout/theme.tsx`) for theme reads.
- **Deleting a file still imported by `layout.tsx`** kills the build with an
  oblique TS1149 — check importers before deleting under `src/app`/
  `src/components/layout/`.
- **A stale `node_modules/.prisma`** after schema edits: rerun
  `bun run db:generate` before blaming the query code.
