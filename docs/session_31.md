I'll start by internalizing the operating instructions and setting up my workspace. Let me create a comprehensive TODO plan first, then work through it systematically.
Repo cloned (3722 files, on `main`, clean tree). Now let me review the core documentation. I'll read the main docs first:
AGENTS.md gives me a solid picture — this is a mature repo (Next.js 16 + React 19 + TS strict + Tailwind v4 CSS-first + Prisma 7/SQLite + Zod + Vitest/Playwright, bun-managed, main-only). Let me read the other core docs:
Session 28/29 records confirm: repo session 223 (R-20) shipped and pushed, no open R-items. This session will be repo session 224. Let me read the worklog head and remediation plan state:
The plan confirms: v2.20.0 shipped, session 224 (this session) has no open R-item — fresh-audit findings pre-empt. Now let me review the skills catalog and web-application skill:
Now let me review the PAD's recent revision block and key sections, plus the wealth-os_SKILL.md outline:
Docs are consistent with v2.20.0. Now let me validate my understanding against the codebase. First the source tree and key contracts:
The workspace was reset — node_modules, .env, and db are gone. Let me set up the environment (this matches the documented cold-start procedure):
Database seeded, census MATCH. Now the cold-baseline gate. Let me start lint + typecheck, and review the test configs while those run:
Configs match documented contracts. Now the unit suite (1029 checks expected):
1029/1029 unit — exact documented state. Now the build:
Smoke 14/14 — sitemap/robots/manifest verified (leg 12). Now e2e — first check chromium availability since the sandbox was reset:
Browser revision mismatch (installed 1200, needs 1254) — the documented sandbox-reset situation. Installing:
**Full cold-baseline gate GREEN**: lint 0/0 · tsc 0 · 1029/1029 unit · build · smoke 14/14 · 111/111 e2e — exactly the documented v2.20.0 state. Now the `bun audit` re-triage and the reference drift probe:
Reference STABLE on all four standing layers — including the TRUE-390 functional mobile menu (the user's named focus). No parity event. Let me update my progress and scope the R-20 diff for the audit:
R-20 touched 22 files. Now dispatching the three parallel Mode-C audit passes (the house pattern) — each as a self-contained subagent:
All three audit passes are back: **0 Critical / 0 High / 2 Medium / 11 Low / 14 Informational** raw. Per the house pattern, I must re-verify every material claim at file:line before it enters the ledger. Let me verify the two Mediums and key Lows myself:
The YMD guard bug is visible in the source: `c.length !== 4` gates on the MDY year position — for YMD shape (`2026/02/30`) the third group is the *day*, so the guard is skipped before the YMD comparison runs. Let me live-verify both Medium claims and the verify-route claim:
F-224a and F-224c both live-confirmed (note: my "2026/02/29 valid leap" control was mislabeled — 2026 is not a leap year, so that's another rolled-date instance staging Mar 1, re-confirming the bug). Now the verify-route oracle claim:
F-224b verified: `remaining=5` is unreachable on the genuine path (post-increment yields 4…1), so one probe still distinguishes pending from no-pending. Now verifying the remaining headline claims:
All headline claims verified at file:line (both Mediums live-confirmed). Now completing verification of the remaining cure surfaces and the neo-crm pattern check before writing the plan:
The N-56e "vendored stock KEEP" precedent changes my F-224q approach — arm the latent trap rather than retire. Let me read the remaining cure surfaces:
All cure surfaces mapped. Now the quick neo-crm pattern check (task 6):
Neo-crm comparison confirms full stack alignment (same gate/scripts/dependency families; wealth-os is actually ahead on prisma 7). Nothing new to port. Now let me study the plan structure to write v2.21.0 correctly:
Now let me verify the remaining implementation details before writing the plan — census/sweep basis (will the skip link trip the drift gates?), a11y spec structure, and the reversed month-year probe:
Pixel-based sweeps + main-scoped census means a visually-hidden skip link outside `main` trips no drift gate. Final probes before writing the plan:
`2026 Nov` (reversed month-year) also stages an invented day 1 — a real gap the doctrine should cover. Let me probe V8's readings to design the precise fix:
V8 confirms the design: `"Nov 2026 15"` is day-carrying (must keep staging) while `"2026 Nov 10:00"` invents day 1 (must reject). I have everything needed. Now writing the remediation plan v2.21.0:
All design details settled (including reconciling F-224p with the recorded F-223m adjudication — the F-222f genus mirror is world-robust either way). Writing the remediation plan v2.21.0:
Plan written (28 F-224 rows). Now validating the plan against the codebase — checking the three cure sites I haven't fully read yet:
All cure sites validated — the plan is aligned with the codebase. Now executing R-21 with TDD. First, let me study the existing pin styles, then write the RED pins:
Now writing the RED pins. First the unit pins — csv, schemas, the search seam, parity-224 source pins, and the behavioral store test:
Now writing all the RED pins:
25 pins RED across csv/schemas/search/parity-224. Let me check the store-logout test result specifically:
All 28 pins RED (25 + 3 store-logout). Now the cures. **Cure 1 — the csv guard family:**
The year-gate fix exposed a latent scope bug: `NUMERIC_LOCALE`'s `\D+` separator matches letter runs, so named forms like `"2026 Nov 15 10:00"` ride the numeric guard and fail it. The guard's scope must tighten to genuinely numeric separators:
CSV 46/46 GREEN. **Cure 2 — the verify first-rung answer (F-224b):**
Now the F-224l docblock note on the lockout branch, and the F-224k notes on login/forgot:
**Cure 3 — the logout honesty pair (F-224e):** the store + both signOut helpers:
**Cures 4-8 — global-error dark arms, LoadingBlock, error main landmark, skip link, password max:**
**Cures 9-13 — the search seam, globals.css family, dropdown docblock, stale comments:**
Now the globals.css family (danger-soft flip, reserved-token comment, @source not):
Now the metadata.test header fix and the PAD §10 / DEPLOYMENT rows (F-224w, F-224i):
Now let me run the full unit suite to check the cures' GREEN state:
4 failures — the expected pin-recalibration class (legitimate contract changes) plus one pin-construction error of mine (F-224y: the comment sits BEFORE the constant). Let me recalibrate:
**Unit 1060/1060 GREEN** (71 files, +31 checks). Now the e2e legs. Let me study the spec structures:
The exact form: `.rounded-full{border-radius:2147483647px}` in `.next/standalone/.next/static/chunks/*.css`. Now writing the e2e legs and smoke leg:
One flake risk: my wrong-code probe `"000000"` could theoretically collide with the real code (1/10⁶). Let me make it deterministic by reading the in-app-delivered code from the signup response:
Now the a11y phone-dark legs, the mobile-nav skip-link leg + afterEach hardening:
Wait — I must check the describe boundaries: if non-sign-out tests share the describe, the afterEach would re-mint unnecessarily:
Only ONE describe holds all tests — my unconditional afterEach would fire 11+ times and blow the login budget. Restructuring into a nested sign-out describe:
Unit + typecheck green. Now the build, with the @source before/after verification:
The build failed — the `@source not` directives broke PostCSS. Let me see the full error:
Classic CSS comment trap: my comment contains the glob `skills/**/html-tailwind.csv` — the `*/` inside it **terminates the block comment early**. Fixing:
CSS shrank 43% (201KB → 116KB). But `.text-success` still appears once — let me find its remaining source:
My own comment's class-like strings are being scanned — the exact F-220 lesson. Rewording:
Two sentinels remain — their source is `neo-crm_SKILL.md` at the repo ROOT (not covered by my directory excludes). Root-level markdown needs a glob exclude:
The @source change is fully verified: 0 dead sentinels, all live utilities present, CSS 48% smaller. Now the smoke ladder (15 legs):
Smoke 15/15 (leg 15 green: 2147483647px). Now the full e2e suite with all the new legs:
The logout POST lacks a Content-Type (the F-218p CSRF gate rejects it) — Playwright only sets `application/json` when there's a body. Now the skip-link failure:
Two leg-construction errors (not cure errors): the logout POST needs the JSON content-type, and `sr-only` gives a 1×1 box which Playwright counts as "visible". Fixing both legs:
The shell is temporarily failing. Let me wait and retry:
All tools have failed 10+ consecutive times — the sandbox's tool service has dropped. **All work is safely persisted on disk**, but I can no longer execute commands in this session.

**Please click the restart button in the top right corner to restart the session, then re-send your directive.** The work will resume exactly where it left off.

Here is the precise state so nothing is lost:

## Session 224 (R-21) progress — all saved on disk, uncommitted

**Done and verified:**
1. ✅ Intake complete: repo cloned @ `d8098e6`, all docs reviewed, cold-baseline gate GREEN (lint 0/0 · tsc 0 · 1029 unit · build · smoke 14/14 · 111 e2e · census MATCH), `bun audit` unchanged, reference drift probe STABLE on all four layers (incl. the TRUE-390 mobile menu — your named focus), neo-crm pattern check: aligned
2. ✅ Three parallel Mode-C audit passes: **0 Critical / 0 High / 2 Medium / 11 Low / 14 Informational** — every material claim re-verified at file:line; both Mediums live-reproduced (YMD rollover bypass `2026/02/30`→Mar 2; verify-oracle numeric tell "5 attempts remaining")
3. ✅ Remediation plan **v2.21.0 (R-21)** written into `docs/remediation_plan_v2.md` (28 F-224 ledger rows) and validated against the codebase
4. ✅ TDD execution: 28 pins born RED → all cures landed → **unit 1060/1060 GREEN (71 files)**, lint 0/0, tsc 0, build green, **smoke 15/15** (new leg 15: rounded-full infinity radius)
5. ✅ `@source not` verified with before/after build probes: 0 dead sentinels, all live utilities kept, CSS 201KB→104KB (48% smaller — skills/tests/docs prose can no longer emit production CSS)

**Fixed on disk, awaiting one re-run:** the last e2e run was 120 passed / 2 failed — both failures were **test-leg construction errors, not cure errors**, and both fixes are already saved: the logout-replay leg now sends the JSON content-type (F-218p gate), and the skip-link leg asserts the 1×1 sr-only box instead of Playwright visibility.

**Remaining after restart:** re-run e2e (expect 123/123) → six parity drift gates + census → dev-server screenshots to `docs/screenshots/` → docs lockstep (counts 1060/71/123/15 + README/AGENTS/CLAUDE/PAD/SKILL/worklog + plan close + docs-counts) → atomic commits on main → SSH-wrapper push → key shred.

Both leg fixes are in place. Let me see the exact logout-replay leg construction:
Both leg fixes confirmed. Now let me check the environment files (.env, db path, .env.example) and verify the state of the full setup before re-running e2e:
Environment fully intact — `.env` and `.env.example` both carry `DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root. Let me set up the TODO list for the remaining work, then resume.
Browsers intact. Let me check the playwright config's webServer setup, then launch the full e2e run:
Config confirmed — e2e drives the production standalone server. Let me verify the build is current relative to the source tree, then run the full e2e suite:
Build is current (10:32:14 > all src files). Now running the full e2e suite:
Exit code 1 with an unusual test listing. Let me capture the full output head to see what actually happened:
122 tests total, but the run interrupted after 32 passed. Let me capture the full output to find the actual failure point:
The run hung past the 600s limit. Let me examine the partial log to find the hang point:
All mobile-navigation legs are failing — this is new versus the previous session's 120/2. Let me see the full failure picture from the start:
The new a11y F-224r legs pass. Let me find where the first failure begins:
Test 60 (the fixed logout leg) passes in 70ms. The first failure is mobile-navigation.spec.ts:24 — the hamburger drawer leg. Yet a11y test 26 opened the drawer fine. Let me look at that leg and its failure detail:
The leg expects `dialog` role and an "Open navigation menu" button. Let me get the exact assertion failure from the test-results:
The page snapshot is decisive: the browser landed on the **login page** — the shared session died right before the mobile-navigation spec. Let me isolate: run the mobile spec alone to separate order-poisoning from a real app break:
The login-page snapshot means the shared demo session was revoked somewhere in auth.spec (which opts out of storageState and doesn't exercise it). Data-import uses a scratch user — so the last proof of life was a11y (test 46). Let me run the mobile spec in isolation to confirm order-poisoning:
All 16 pass in isolation — the legs and the app are healthy. This is order-poisoning from an earlier spec. The only specs between the last demo-session use (a11y, test 46) and the failure (test 62) are auth.spec tests. Let me read auth.spec.ts in full:
Let me diff auth.spec.ts against HEAD to see exactly what changed this session:
The F-224b probe and F-224d logout leg are the new demo-account touches. Let me look at the sign-out family's re-mint machinery at the end of mobile-navigation.spec.ts, and the verify route's no-pending branch:
Now the mechanism is clear. The re-mint comment states it: **the F-223k logout bumps the USER's tokenVersion** — so the F-224d leg's logout (on the demo account) kills the shared storageState session for every later spec. In the previous run the leg failed at the 415 gate (logout never executed), masking this. Let me confirm by reading the logout route:
Confirmed — logout bumps the USER-level `tokenVersion` (multi-device eviction). Let me also rule out the verify route as a second poison source:
Verify only reads tokenVersion — no second poison. The diagnosis is airtight:

**Root cause**: the F-224d leg logs out the *demo* user; logout bumps the demo user's `tokenVersion`, killing the shared `auth.setup` storageState cookie for every subsequent spec. The previous 120/2 run masked this because the leg failed at the 415 content-type gate — the logout never executed.

**Fix**: rewrite the leg onto a scratch user (the data-import doctrine — "the demo corpus is never touched"), keeping the pin's semantics (mint → capture → logout → replay) intact:
Now rewriting the leg onto a scratch user, with the poisoning lesson documented:
Leg rewritten. Let me verify the full leg reads correctly, then typecheck:
Leg complete, typecheck clean. Now the full e2e suite again:
**122/122 e2e passed.** The poisoning is cured. Marking task 2 complete; now the parity drift gates + census. Let me find the standing procedure from the docs:
The gate is `bun run gate:full`. Let me check its composition and how session 29 ran it:
`gate:full` is the complete cold ladder plus the six drift legs. Launching it detached and polling:
No test processes are running, yet the log is stuck at lint. Let me check the parent process state:
The sandbox reaped the detached process — background jobs don't survive between calls. I'll run the gate ladder in explicit segments matching the `gate:full` composition exactly. Segment 1 — lint + typecheck:
Lint 0/0, tsc 0, unit 1060/1060 (71 files) — exactly the expected counts. Segment 3 — build:
Smoke 15/15. Segment 5 — e2e re-run on the fresh build (matching gate:full order exactly):
122/122 again on the fresh build. Now the six drift legs — let me first check how the sweep boots (server needs):
The sweep manages its own dev server and caches the reference login pair. Running the six drift legs in sequence — leg 1 (1440×900, pays the login pair):
Leg 1 CLEAN (2m38s). Leg 2 — 390×844 (the mobile-nav width, the user's named focus):
Fullpage CLEAN (exit 0, every page within baseline + margin). Leg 6 — interior census:
All six drift gates CLEAN. Verifying the restored seed census:
Task 3 done — all gates CLEAN + census MATCH. Now the screenshots. Let me review the existing captures pattern and folder:
The capture pattern is clear (next number after the R-20 set). Let me get the true last number and the full mechanics of captures-223 (login + assertion style):
Last number is 110; the R-21 set starts at 111. Before designing the faces, let me check the plan v2.21.0 for its own capture guidance:
Let me read the plan's R-21 section directly for the intended capture set:
Let me read the R-21 rows and its execution/verification guidance at the plan's tail:
The exit criteria are explicit. Before writing `captures-224.ts`, let me verify the actual delivered forms of the cures I'll capture (password max, import staging vocabulary, search strip, skip link):
The password cure is schema-level (`.max(200)`) — no DOM face; skip it. Let me study the import-preview capture block (face 110) as the model for the new date-guard face:
Now verifying each capture face's cure surface exists in the code (skip link, error main, search seam, expenses empty state):
Now the Expenses search face — checking the e2e leg and the empty-state surface:
The strip lives in `/api/search` (server route). Let me find its consumer surface:
No UI consumer for /api/search — the F-224j strip is API-level, carried by unit pins, so no honest UI face for it. Let me check the danger-soft flip's usage (potential 8th face):
No app surface renders the destructive dropdown — the danger-soft flip stays token-level. And the error.tsx `<main>` is untriggerable without fault injection; the honest set is 6 faces. Let me read the exact head/tail of captures-223.ts to model the new script:
Now let me check how the sweep manages the dev server (to reuse its boot/kill convention):
I have the complete pattern. Writing `scripts/captures-224.ts` — the six-face R-21 evidence set with the sweep's dev-server boot/kill convention:
Running the capture set (the script boots its own dev server):
All six faces committed with assertions passing. Verifying the dev server was reaped and the PNGs exist:
Tasks 3-4 complete. Now the docs lockstep — first, the docs-counts contract:
Now updating the constants. First let me check the e2e spec count and the PAD §7.1 table structure:
The §7.1 E2E row (99) is itself a stale site the pins missed — I'll pin it too. Updating the constants first, then letting the RED pins enumerate every doc site:
Constants updated. Running the pins to enumerate every stale doc site:
11 RED pins enumerate the sites. Fixing each doc — first the exact current lines in CLAUDE.md:
The CLAUDE smoke line (14) and other unpinned sites remain. Let me grep comprehensively for every stale number across the doc set:
Full inventory classified (live-tense vs historical). Let me check the README status table and PAD header/version blocks before batch-editing:
The F-224i §10 row is already in place. Now the batch of live-tense fixes. CLAUDE.md smoke line first:
Now the batch edits. CLAUDE.md, AGENTS.md command table:
README count sites:
Now prepending the R-21 summary to the README remediation-program row:
PAD count sites now:
PAD :550 has another unpinned stale site — "Playwright e2e (88)":
Now pinning the two newly-found site classes in the docs-counts file:
Now the SKILL count sites:
All count sites updated. Verifying the pins go GREEN:
docs-counts 13/13 GREEN. Now the AGENTS gotchas — reading the section to place the R-21 lessons:
Adding the R-21 gotchas to AGENTS.md:
Now the PAD revision block — prepending the v2.21.0 entry:
Fixing the missing newline between the entries:
PAD entry in place. Now closing the plan — checking the R-20 status form, the §5 table tail, and the header:
Adding the v2.21.0 execution row, flipping the R-21 status, and updating the closing pointer:
Plan closed. Now the worklog entry — reading the head to model the form:
Prepending the session-224 worklog entry:
Now the session record — reading session_29.md's shape:
Writing the session-224 record (docs/session_30.md):
All docs complete. Final full-suite verification before committing:
Full suite green. Now the atomic commits — checking the R-20 commit pattern for the house form:
The commit pattern is clear (fix → screenshots → lockstep → session record). Let me check the lockstep commit's file composition and the execution commit's message head:
Now the four-commit sequence. First, the complete current status to stage precisely:
All transient paths are ignored. Commit 1 — the execution commit (cures + pins + smoke):
Commit 2 — the evidence set:
All four commits in, tree clean. Now the SSH-wrapper push — reading the runbook first:
The runbook is clear. Checking the environment: ssh binary, paramiko, the wrapper's default remote, and any surviving shim from the previous session:
No ssh binary, no paramiko, and the wrapper's default remote is the wrong repo — I must pass `--remote git@github.com:nordeim/wealth-os.git` explicitly. Deploying the toolchain (paramiko + the Appendix A shim):
Shim deployed. Now materializing the operator key (0600, outside the repo, per the runbook) and running the fingerprint sanity check:
Key verified. Dry-run (authenticates, touches no refs):
Dry-run green — remote main at d8098e6, a clean fast-forward to c3ca9d2. The real push:
Push verified — remote main @ c3ca9d2 == local HEAD. Now shredding the operator key per the runbook:
Key shredded, tree clean, branch up to date with origin/main. Final cleanup of the scratch commit-message files:
Remote main independently confirmed at `c3ca9d2` via the GitHub API — exactly the local HEAD. All tasks complete:
R-21 is shipped and pushed. The session resumed exactly where the tooling died: the saved e2e leg fixes held, but the re-run exposed a real defect — the new logout-replay leg was evicting the shared test session for every later spec (the logout bump is USER-level). Root-caused at the source, the leg rewritten onto a scratch user, and the suite went 122/122.

From there the full ladder passed end-to-end: lint 0/0 · tsc 0 · 1060/1060 unit (71 files) · build · smoke 15/15 · 122/122 e2e · all six parity drift gates CLEAN (mobile menu included — your named focus) · census MATCH. Six new evidence screenshots, the complete docs lockstep (counts, plan v2.21.0 closed, worklog, session record), and four atomic commits on `main` — no new branch.

The push rode the SSH wrapper with the explicit wealth-os remote; the remote ref was verified twice (wrapper post-push + GitHub API) and the key was shredded afterward.

Next session defaults to findings-led iteration with no open R-item — just re-send your standing directive and it will refresh, re-audit, and continue the rhythm.
