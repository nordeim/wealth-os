# WealthOS — Master Project Architecture Document (PAD) v2.0.0

**Classification:** Internal Engineering Reference
**Status:** DEFINITIVE, PRODUCTION-LOCKED BLUEPRINT
**Companion Document:** `docs/implementation-plan-session-199-wealthos.md` (the transformation plan)
**Last Updated:** 2026-11-11
**Audience:** Senior Engineers, Tech Leads, DevOps, and Onboarding Engineers
**Rule:** Every architectural decision in this document traces to a specific rationale.
Nothing is here "because it's popular."

---

#### Revision Block — v2.0.0 (Tracked Changes)

Every change is tagged with its source: `[RES]` = validated by web research,
`[SR]` = self-review, `[CA]` = critical analysis, `[SYN]` = synthesis,
`[SAN]` = sanitization pass, `[AUTH]` = auth alignment.

- [SR] v2.19.0 (session 222, R-19 — the zone-designator completion
  and focus-affordance round): the fresh-eyes audit found the R-18
  form-branch carrying its target class twice more — the
  `UTC_DESIGNATED` regex was CASE-SENSITIVE, so RFC-3339-legal
  lowercase `z` fell into the locale branch and staged one day off
  on both zone edges (live-reproduced: New York
  "2026-11-01T01:30:00z" → 2026-10-31; Tokyo
  "2026-11-01T18:30:00z" → Nov 2; the year boundary → 2027-01-01),
  and it recognized only ±00:00, so NON-UTC offsets staged the
  VIEWER's calendar date — the identical file imported different
  books for different users ("+09:00" in New York → Oct 31;
  "-05:00" in Tokyo → Nov 2, the year boundary → 2027-01-01, all
  live). THE ZONE-DESIGNATOR CURE (F-222a/b Medium): the designated
  branch widens to every zone-designated ISO datetime (`[Zz]`,
  ±HH:MM/±HHMM) and stages the WRITTEN date literal — the offset's
  own wall-clock date, never the viewer's (for the Z/±00:00 forms
  observationally identical to the R-18 cure, so those pins stand);
  the partial-ISO rejection (F-222c: "2026"/"2026-11" → null — V8
  parses them as UTC day-1, and a skip beats an invented day); the
  rollover guard extends to every literal-staging branch (F-222d:
  "02/30/2026" rolled to Mar 2 while the bare branch nulled — now
  the locale numeric forms round-trip the MDY/YMD read of their
  digits). THE FOCUS-AFFORDANCE FAMILY (F-222g Medium): the
  hand-rolled interactives (PeriodSegment, the toast ✕, the
  app-shell Try-again, the auth face's Google/footer/back/resend
  buttons, the Expenses chips) carried no house focus ring — the UA
  default outline (≈3:1 under the globals tint) was their only
  affordance; the shared constants now carry the ring (the amber
  genus on the auth face). THE PERCEIVABLE TAIL (F-222e/f/h/i/j/k):
  the import-preview income ink's dark arm (3.15:1 → emerald-400);
  the 404 + segment-error DARK ARMS — the theme seam resolves DARK
  for any non-auth path, so the fresh-visitor 404 rendered light
  under html.dark (the reference's SPA serves its 404 inside the
  dark shell — dark arms are the parity-correct genus); DIALOG_CLOSE's
  dark hover mirror; the recharts tooltips joined the isDark family
  on all three chart pages; the accounts red pair; the tabs/badge
  latent arms (+ the `--color-neutral-800` pin — the v4 inert-token
  trap closed at the source). THE SECURITY HARDENING (F-222n/o):
  email-keyed per-account secondary buckets on login (30/15) and
  forgot-password (20/15) — the default proxy posture (unset
  NEO_PROXY_HOPS) keys clientKey on client-suppliable
  XFF/x-real-ip, so a header-rotating caller voided every per-IP
  cap on a direct-exposure deploy; the caps sit ABOVE the IP caps
  (10/15) so the smoke ladder, the e2e battery, and the capture
  toolchain never trip them first (a rotating-XFF e2e leg proves
  the bound); the P2025 seam — a record that vanishes between the
  ownership findFirst and the mutation answers NOT_FOUND, never
  INTERNAL, across all five `[id]` families. THE INTERACTION TAIL
  (F-222l/m): the F-221q busy rider's last two surfaces (the
  Expenses row-delete; the Settings budget-delete, which also
  discarded its result — it now toasts) and the import skip copy.
  The suite: 1005 unit (67 files, +44) · 110 e2e (+2: the dark-404
  leg, the rotating-header bound) · smoke 14/14; all six parity
  drift gates CLEAN; census MATCH; audit unchanged (the standing
  minimatch moderate, dev-chain).
- [SR] v2.18.0 (session 221, R-18 — the date-staging correctness
  and perceivable-controls round): the fresh-eyes audit's headline
  was the R-17 seam reintroducing its own target class —
  `stageCsvDate` read LOCAL accessors off every parse, so the bare
  `yyyy-mm-dd` bank-CSV form staged one day EARLY west of UTC
  (live-reproduced: New York "2026-11-01" → 2026-10-31) and the
  Z-suffixed form one day LATE east of UTC (Tokyo year boundary →
  2027-01-01). THE FORM-BRANCH CURE (F-221a/c High/Medium): bare
  ISO → `Date.UTC` of the literal groups (the `dateField` identity),
  UTC-designated forms → UTC accessors, locale forms keep the local
  accessors — with per-assertion TZ-switching behavioral pins (the
  F-220a doctrine applied to the seam it missed). THE DARK SELECT
  WASH (F-221b High): the `SelectItem` focus pair
  `focus:bg-line-soft focus:text-neutral-900` carried no dark arms —
  the highlighted option computed 1.18:1 (neutral-900 on line-soft's
  #262626 flip), live-verified on the dark-mode Income combobox;
  the MENU_ITEM precedent's arms landed (stone-100 on stone-800,
  13.9:1) + a dark-mode e2e highlight leg. THE PERCEIVABLE-TAIL:
  the Settings Export CTA ink → white on blue-600 (F-221e —
  stone-900 measured 3.38:1, live + axe; the F-219a genus was
  measured on amber, never on this saturated blue); the a11y
  two-gate now SCROLLS before every `axe.run()` (F-221f — live A/B:
  0 violations unscrolled vs the 3.38:1 failure scrolled into
  view; the below-the-fold class was structurally invisible to
  every gate); the null-clear UI rider (F-221d — seven page forms
  stopped collapsing emptied optional fields; date fields send
  explicit null on edit, string fields ride the raw value); the
  low tail (the reset-password read-path 503s — the F-220k sibling
  the R-17 round missed; the `shares` update cap — unbounded
  shares × the currentValue cap overflowed to Infinity inside
  portfolioStats; the cross-user `[id]` 404 behavioral legs in the
  multi-user spec; the ExpenseDialog htmlFor/id associations; the
  goals Paused light arm stone-600; the DIALOG_CLOSE ink; the toast
  variant icons' one-step-darker light arms; the switch-track
  stone-500 boundary; the reset-submit pending affordance; the
  OS-flip listener's auth-face gate; the card-level busy-disable on
  four pages (income/accounts/goals/investments); auth/logout
  joining the writes family; the GDPR export's settings row +
  photoUrl/createdAt; the hygiene tail — the dead `ERR.FORBIDDEN`
  403 arm retired, the budgets static import, the boot warning
  naming the `x-real-ip` fallback, the import skip-counter covering
  every dropped-row class, the unused underline tab's AA steps, the
  health route's unthrottled posture documented).
- [SR] v2.16.0 (session 219, R-16 — the parity-default and
  perceivability round): the owner's explicit parity directive drove
  the round. THE DEFAULT-THEME PARITY (F-219c High): the reference's
  authenticated shell renders DARK for fresh visitors (html.dark,
  body #0a0a0a — live-measured with the toggle round-trip; no
  localStorage key; the choice persists SERVER-SIDE per user); ours
  defaulted system/light. The cure: `src/lib/theme-default.ts` (the
  pure seam — stored choice wins on app routes, otherwise DARK; the
  auth faces FORCE light, closing the F-219t stranded-ink state),
  mirrored inline by the no-FOUC bootstrap + re-applied by the
  ThemeProvider's pathname effect (the client-nav holes). F-205a's
  "not reopening" deferral superseded by the directive. THE CTA
  GENUS (F-219a/b High): the reference's amber CTAs compute
  stone-900 ink rgb(28,25,23) (the a11y register's "white-on-amber"
  citation was STALE — white measured 2.15:1); the per-page gradient
  families measured (emerald→teal+white Income/Investments,
  rose→red+white Expenses, amber+stone-900
  Dashboard/Accounts/Goals/Settings) — `CTA` constants in
  page-layout.ts, `--color-primary-foreground: #1c1917`, the stale
  register arm retired. THE MOBILE DRAWER SCROLL (F-219h): Sign Out
  was UNREACHABLE below ~800px viewport height (live-measured at
  390×667/844×390; the reference clips too — the cure is the
  functional superset): `overflow-y-auto` on the sheet's inner
  column. THE DATE-SEAM COMPLETION (F-219d/e/f/g): the investments
  purchaseDate prefill (the FIFTH raw-parse site — per-edit date
  walk-back), the analytics mixed-mode regression (the refs vs the
  toDate rows), the goals card + income labels. THE RATE BUCKETS
  (F-219l/m): the `reset:` key collision split (`data-reset:` vs
  `pw-reset:`); the sessioned-CRUD writes family bucketed (60/15) +
  export 240/15 + search 60/15 — with the per-navigation dashboard
  aggregate DELIBERATELY unbucketed (the maiden census trip decoded
  the design: every hydrate fires it; the toolchain legitimately
  exceeds any cap). THE PERCEIVABILITY TAIL: the dark metadata
  family (dark:text-stone-500 3.16–4.13:1 → stone-400, ~30 sites),
  EMPTY_STATE/FOOTER/KpiCard constants, the AI coach's polite live
  region + sr-only thinking text, the display-text cluster (Quick
  Actions h2, HealthGauge ink, error h1s, import emerald-700), the
  ring leftovers, InfoCallout role=status, the analytics empty-state
  gates, moneyField 2dp normalization, the nullable-clear semantics,
  the dead BUTTONS.outline/ghost retired. The four sweep class
  tables + the fullpage tables + the interior-census allowances
  RE-DERIVED in-commit (every page's diff moved DOWN — the
  convergence). The unit-count lockstep moved 817 → 869 / 62 → 64
  files with the R-16 pin family (36 → 38: theme-default,
  parity-219); e2e 97 → 99 (+2: the fresh-visitor dark default, the
  drawer scroll at 390×667).
- [SR] v2.15.0 (session 218, R-15 — the recovery-loop and
  perceivability round): two families the gates structurally cannot
  drive, cured. The RECOVERY LOOPS: the signin 403
  VERIFICATION_REQUIRED now lands the verify view (F-218a High — the
  Resend was unreachable from the signin arm, so an expired-code
  account was locked out of the very recovery path R-14 built
  server-side; the e2e recovery journey proves the loop end-to-end);
  the Expenses filters trigger toggles again (F-218b High — the R-14
  popover cure removed the bare expanded-button guard without landing
  the trigger-scoped replacement its comment claimed; the toggle
  flicker-reopened, live-reproduced — now a filtersTriggerRef with the
  positive pin + the toggle e2e leg); /api/export carries
  Cache-Control: no-store (F-218c — the GDPR dump rode a raw response
  past the envelope's F-217g claim); the UTC-midnight calendar
  normalization (F-218d — toDate re-anchors stored UTC-midnight ISO
  strings to local midnight of the same calendar date; 1st-of-month
  rows rendered as the prior day/month for every UTC-negative user,
  and the edit prefill re-stored the wrong day — the sandbox's UTC
  posture is why every gate was blind; the TZ-switching pins run
  America/New_York for real). The PERCEIVABILITY cluster: the toast
  viewport is the polite live region (F-218h — per-card role="status"
  arriving WITH its content is unannounced); the focus-indicator
  family (F-218i — --color-ring never flipped in .dark, input-base's
  dark focus ring was invisible, the F-217c token class on the ring
  token; the light-surface amber-400 rings computed 1.67:1 against
  SC 1.4.11's 3:1 — now ring-ring, the token working both modes; the
  three ring-1 sites became ring-2 for SC 2.4.11); red-500 small text
  darkened to red-600 (F-218j); the investment badges ride dark-step
  text over their tints (F-218k); HealthGauge role="img" (F-218m);
  the sidebar avatar's luminance seam (F-218n); F-217s promoted — the
  Expenses tabs' four aria-controls resolve (F-218o, the active panel
  carries the content); the low tail (the updateSettings token guard
  F-218e; the upload chunked-stream bound F-218f; the heavy-endpoint
  rate buckets import/coach/reset F-218g; the muted/subtle dark flips
  F-218l; the logout content-type gate F-218p; the forgot/reset
  fallthrough F-218q; the signup P2002 arm F-218r; the AI cap 1MB vs
  the control-char worst case F-218s; F-217u executed — the
  NEO_PROXY_HOPS boot warning + the DEPLOYMENT row F-218t; the label
  associations + the checkbox accent F-218u; the UNAUTHORIZED
  message-stability pin F-218v). F-218w records the amber register's
  breadth. The unit-count lockstep moved 767 → 817 / 60 → 62 files
  with the R-15 pin family (34 → 36: login-recovery, parity-218); e2e
  95 → 97 (7 specs; +2: the signin→verify→resend recovery journey,
  the filters-trigger toggle).
- [SR] v2.14.0 (session 217, R-14 — the parity-completion round): the
  dark-mode token set COMPLETED (the `.dark` block flips the seven
  app-native tokens — surface #0a0a0a / foreground #fafafa / ink
  #f5f5f4 / muted-ink #a8a29e / line #262626 / line-soft #262626 /
  line-strong #404040, the reference's own measured dark family —
  F-217c High: every dialog, the Select listbox, and the sidebar
  user-menu had rendered white panels with light text, 1.09:1/1.00:1,
  invisible to every gate because the sweeps capture settled pages
  and the a11y two-gate ran light-mode only; the toast/button
  explicit-light tails ride the flips; the a11y gate gained the DARK
  leg — whose maiden run caught the destructive red-600 buttons'
  3.3:1 on the dark cards, cured with dark:red-400/300 arms); the
  Expenses filters popover's outside-close guard spares the PORTALED
  Radix surfaces (F-217a Medium — the F-216i listener unmounted the
  popover mid-pick on any Select option pointerdown; mouse users
  could not apply a category filter, live-reproduced); the AI coach
  route rides MAX_AI_BODY_BYTES = 256KB (F-217b — the F-216a
  schema-vs-cap class, one route left behind); the verification gate
  keys on the hash, not the TTL (F-217d Medium — an unverified
  account used to sign in once the code expired while the resend
  no-opped, locking it out of recovery); the mobile drawer's focus
  contract (F-217e — focus moves in on open, Tab cycles the modal
  surface, focus returns to the trigger); the sitemap lists the
  Capital metadata-rich twins (F-217f — the reference's own casing;
  the lowercase locs self-canonicalized to the homepage); the
  envelope carries Cache-Control: no-store (F-217g) + the global
  frame-ancestors 'self' (F-217h); the low tail (SearchResults
  retired + /api/search pinned F-217i; dateField's two sanctioned
  forms F-217j; hydrate's error hygiene F-217k; the mutation
  actions' entry-time write-token capture F-217l). F-217m (the
  in-band delivery default posture) recorded as the owner-decision
  item. The unit-count lockstep moved 719 → 767 / 55 → 60 files with
  the R-14 pin family (29 → 34 pins: ai-body-cap, expenses-popover,
  dark-tokens, mobile-navigation-focus, parity-217); e2e 88 → 95
  (7 specs; +7: the popover mouse-pick + outside-close legs, the
  three drawer-focus legs, the two dark a11y legs); the four sweep
  class tables + the fullpage tables re-derived (every page's diff
  moved DOWN — the dark convergence; phone dashboard 16.5 → 14.47).
- [SR] v2.13.0 (session 216, R-13 — the verification-gap convergence
  round): the bounded reader PARAMETERIZED (readBoundedJson/parseBody/
  isBodyTooLarge take maxBytes; the import route rides its own
  MAX_IMPORT_BODY_BYTES = 4MB — the 16KB auth-family default had
  silently capped the 5000-row Import contract at ~140 rows, F-216a);
  the formula-injection guard's behavioral pin recreated
  (tests/csv-formula-guard.test.ts — the phantom-reference cure,
  F-216b); the client data layer's faces wired (the AppShell loading
  gate + the store-error alert banner with retry; refreshAll's failure
  branch; the Refresh toasts — LoadingBlock had been dead code,
  F-216c/d); the QuickAction single-anchor a11y cure (F-216e — the
  reference's own <a><button/></a> nesting deliberately diverged from;
  the dashboard's interior-census standing allowances re-derived per
  the R-7.5 doctrine: 254/270/259/254); dateField calendar-true
  (F-216h); the OTP log gated behind the in-app branch (F-216g); the
  Expenses popover Escape/outside close (F-216i); the dead exports
  retired (F-216j) + the F-215h doc tail cured (SKILL's PDF row,
  PAD's "JSON/PDF", DEPLOYMENT's seed wording, install_packages.sh
  deleted). The unit-count lockstep moved 676 → 719 / 51 → 55 files
  with the verification-gap pin family (25 → 29: import-body-cap,
  csv-formula-guard, loading-states, parity-216); e2e 85 → 88
  (6 → 7 specs).
- `[SYN]` v2.0.0 — Full rewrite for the WealthOS transformation (session
  199): the product domain changed from NEO CRM to personal finance; every
  section re-derived from the live tree (schema, API family, shell, tests).
  The v1.x CRM-era PAD is superseded; the infrastructure chapters (auth,
  db-path, gate, Tailwind v4 pins) carried forward where the code kept them.
- `[SR]` v2.12.0 (session 215, R-12 — the live-seam convergence round):
  the Import page's live parser converged onto the shared `csv.ts` seam
  (F-215a High: the F-214h cure had landed in a production-dead module
  while the live parser kept the bare-quote bug + no BOM strip); the
  analytics export rebuilt through `toCsv` + `csvFilename` (F-215b:
  the S48-P1 formula-injection guard live on the only export surface);
  the seed scoped to the demo owner — demo upsert first, then seven
  `ownerId`-scoped wipes (F-215e); the settings lazy-create race
  cured (P2002 catch + re-read, F-215i); the AI break-even verdict its
  own neutral line (F-215j); the users PATCH docblock corrected to the
  name-only truth (F-215g); the dead PDF tail retired (`jspdf` +
  `html2canvas-pro` removed — zero consumers; the honest data-export
  story in the doc set); the F-215d upgrade procedure documented
  (DEPLOYMENT.md §5.1); `prisma-env.ts` took the exact-basename guard
  (F-215l); the smoke db legs made loud-on-fail (F-215o); the PAD
  diagram's uploads node corrected to 5MB (F-215k). The R-10 pins
  strengthened (`ownerId: guard.user.id` exact) + the behavioral
  two-user e2e isolation spec (`tests/e2e/multi-user.spec.ts`,
  F-215c). The unit-count lockstep moved 657 → 676 / 47 → 51 files
  with the live-seam pin family (21 → 25: import-seam,
  analytics-export-seam, seed-scoping, script-guards); e2e 84 → 85
  (5 → 6 specs).
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
  → vitest (1005) → `next build` → the 14-assertion smoke ladder on the
  standalone artifact → Playwright e2e (88) against a pinned `db/e2e.db`.
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
    FS[Uploads store<br/>uploads/ 5MB bounded]
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
upload store is same-disk; the export path streams JSON from the db (the CSV export is client-side through the guarded toCsv seam).
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
├── tests/                       # 55 unit suites (incl. architecture pins) + e2e/ 7 specs
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
| Unit | 67 | 1005 | `tests/*.test.ts` | Vitest 5 + fast-check |
| — domain seams | 3 | (finance, ai, schemas-finance) | `tests/finance|ai|schemas-finance.test.ts` | property + example based |
| — architecture pins | 41 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222) | `tests/` | source-scanning contracts |
| — infrastructure | 23 | auth, rate-limit, csv, uploads, headers, boot-env, … | `tests/` | behavior |
| E2E | 7 | 99 | `tests/e2e/*.spec.ts` | Playwright (chromium) + axe-core |
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
- [ ] `bun run test` → 1005/1005 (counts re-pinned if tests added/removed)
- [ ] `bun run build` → green, routes listed
- [ ] `./scripts/smoke-test.sh` → 14/14 (incl. boot-gate + hygiene)
- [ ] `CI=1 bun run test:e2e` → 110/110
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
| `bun run test` / `CI=1 bun run test:e2e` | root | 1005 unit / 110 e2e |
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
the time of writing (lint 0/0 · tsc 0 · 1005 unit · build · smoke 14/14 ·
110 e2e).

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
