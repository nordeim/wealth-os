I'll internalize the operating instructions and start working through this systematically. This is a large multi-phase task, so let me set up a structured plan first.
Both repos cloned. Now let me explore the wealth-os structure and read the core docs:
Now let me read the core documentation files. First checking sizes:
The docs are large; let me read them in manageable chunks:
Now let me read the worklog and remediation plan (key sections):
I have the architecture picture. Now validating against the codebase — checking key files, configs, and the src tree:
The codebase state is well documented. Now let me set up the environment — first the install (long-running), and create `.env`:
Install complete. Now push and seed the database:
Database seeded, census MATCH. Now reading the repo skills catalog and web-application skill:
Now I have the core skill methodology. Let me install chromium for e2e and start the cold baseline gate:
Cold baseline so far: lint 0/0, tsc 0, 1552/1552 unit — exactly the v2.40.0 ship state. Now the build:
Smoke 15/15. Now the e2e battery:
**COLD BASELINE GATE GREEN** — v2.40.0 ship state reproduced exactly: lint 0/0 · tsc 0 · 1552 unit (93 files) · build · smoke 15/15 · 150 e2e. Now the standing reference probe:
**probe:ref STABLE** — all layers verified including the TRUE-390 mobile menu with 9 destination links. Now `bun audit` and the neo-crm upstream check:
All standing checks verified. Now updating the todo list and starting the fresh-eyes audit — first, let me review the registered-not-cured findings from the plan:
Now dispatching the fresh-eyes audit as three parallel Mode-C passes (the house convention). The `skills/` folder is excluded from code checking per the user's directive:
All three passes report the layers holding, with a set of NEW Low/Informational findings. Per the house convention, I must now re-verify every material claim at file:line before planning. Let me verify the key findings:
L-1 verified — the guard has aged out exactly as reported. Verifying the remaining claims:
All findings verified at file:line. Let me study the captures convention before planning:
Now let me study the plan-insertion script convention and the parity test house style:
I've internalized all the house conventions. Now writing the remediation plan v2.41.0 into the ledger via the assert-each-insertion script convention:
Let me examine the parity-242 guard and auth test files to plan the pins precisely:
I now have everything needed. Writing the v2.41.0 plan into the ledger via the house assert-each-insertion convention:
Plan written. Now **R-41.1 — the pins born RED**. First, checking where session-token verification is behaviorally tested:
Now let me read the full upload route to place the sniff gate correctly:
Let me check the token-forging pattern in the existing auth tests:
Now writing the R-41.1 pins born RED. First the source battery:
Now the behavioral battery for the sniff seam:
Now adding the TTL-bound behavioral legs to the auth test:
I need to correct the third test leg — with the `?? 0` form, a missing iat makes the span huge (strict, not lenient). Fixing to pin the honest semantics:
Now the docs-counts guard advance (green-by-design, before the lockstep pass per the F-242j rule):
Now running the RED proof against the pre-cure tree:
**HONEST RED: 25** (+3 green-by-design, +1 docs-counts guard advance green-by-design). Now **R-41.2 — the cures**. First the sniff seam:
Now the route gate — hoisting the bytes read and adding the family-match check:
Now the select-trigger appendage conversion:
Now widening the parity-242 genus guard. First verifying no other `cn(\`` sites exist in src:
Clean — zero `cn(\`` sites remain. Now widening the genus guard:
Now the OTP docblock truths (F-244d):
Now F-244e — hardening the parity-243 legs. First confirming the logout route's arm structure:
Structure confirmed. Now hardening the parity-243 legs:
Let me reword one comment phrase to respect the carrier-comment discipline (no hyphenated coinage):
Now the F-243a arm-containment leg — checking the current end of that describe block:
The arm leg landed. Now the session-token TTL bound (F-244f):
Now the signin icons' aria-hidden riders (F-244g):
Now the role docblock truth (F-244h):
All eight cures applied. Now the GREEN proof — running the pin batteries:
6 failures to analyze — several are my own authoring defects (the house line-wrap and anchor lessons). Let me examine each:
The parity-243 "advance" pin needs same-commit recalibration (it pins the trio I just advanced). Let me also check the PAD v2.40.0 verification line format:
All six failures are authoring defects of my own (the house line-wrap and anchor lessons) plus one same-commit recalibration. Fixing each:
Now the GIF test buffer fix and the docs-counts v2.40.0 pin form:
Now the parity-243 fixes — the arm-leg anchor and the "advance" pin recalibration:
Re-running the affected batteries:
All 95 green. Now the full unit suite:
Full suite: 1581/1581 (95 files, +29). Now lint and typecheck:
Build green (exit 0; the 4 Turbopack warnings are the pre-existing dynamic-path tracing notices on the upload route's `join()` — same shape as baseline). Now smoke + e2e:
**FULL GATE GREEN** — lint 0/0 · tsc 0 · 1581 unit (95 files) · build · smoke 15/15 · 150 e2e. Now the six parity drift gates (need the live reference):
All six drift gates CLEAN + census MATCH. Now the captures. Let me check the SELECT_TRIGGER constants for the computed-identical assertion:
Now writing the captures script (captures-244.ts):
Fixing a typo I introduced in the BASE constant:
Now running the captures:
All four captures verified with assertions + census tripwire. Quick pixel verification (non-blank check):
Captures verified non-blank. Let me visually inspect the key capture — the mobile drawer (the standing ask):
The in-DOM assertions + pixel checks are the evidence bar (same as prior sessions). Now the docs lockstep — first finding the stale count sites:
19 sites re-pinned, all green, idempotent. Now the PAD v2.41.0 revision block:
PAD block done. Now the README program row:
The edit left dangling text from the old row. Cleaning it up:
Now updating AGENTS.md with the round's gotchas:
Now updating the plan — R-41 to Done and filling the execution row:
Now the worklog Task 244 entry:
Now the session record (docs/session_71.md):
Session record written. Now the FINAL full gate before commit:
One missed live-tense site — the README file-hierarchy line. Fixing:
Full suite green. Final build + smoke + e2e to complete the FINAL gate:
**FINAL GATE GREEN** — lint 0/0 · tsc 0 · 1581 unit (95 files) · build · smoke 15/15 · 150 e2e · six drift gates CLEAN · census MATCH. Now preparing the commit:
Tree is clean — all changes wanted, secrets/dbs ignored. Let me read the SSH push runbook before committing:
Runbook internalized. First the commit:
Commit `102252a` on main, tree clean. Now the push — deploying the key (outside the repo) and the paramiko shim:
Now deploying the paramiko ssh shim (Appendix A) outside the repo:
No system ssh — the shim is required. Dry-run first:
Dry-run green — remote at b5e1be6, fast-forward to 102252a approved. The real push:
Push verified — remote ref `102252a` == local HEAD. Now shredding the operator key and verifying final state:
Final safety verification of the commit contents:
**Session 244 (R-41) shipped and pushed** — commit `102252a` on `main`, remote ref verified == local HEAD over HTTPS, deploy key shredded, no branches created.

## What was delivered

**Intake & standing asks** — fresh clone; cold baseline GREEN at HEAD `b5e1be6` (the v2.40.0 ship state reproduced exactly: lint 0/0 · tsc 0 · 1552 unit · build · smoke 15/15 · 150 e2e · census MATCH). Reference STABLE on every drift layer incl. the **TRUE-390 mobile menu with 9 destination links**; `bun audit` unchanged (1 documented dev-chain moderate); neo-crm unchanged (b3d0fbe) — nothing to port; SEO surface green (smoke leg 12: sitemap + robots + manifest 200); `.env`/`DATABASE_URL="file:../db/custom.db"`/db-at-root/vitest+playwright configs/`.env.example` all standing.

**Fresh-eyes audit** (three Mode-C passes, every claim re-verified at file:line) — **0 Critical / 0 High / 0 Medium / 5 Low / 9 Informational** NEW; all eight R-40 cure surfaces holding.

**R-41 TDD execution (25 honest RED pins born first)** — flagship: **the upload magic-byte sniff** (F-244b — the route trusted the client-declared Content-Type; the pure `sniffImageMagic` seam now gates the stored bytes' family against the declaration, **proven live by the polyglot canary**: HTML-as-png and JPEG-as-png both 400, the valid PNG round-trip 200 serving image/png). Plus the F-243b guard-advance recurrence cure, the select-trigger appendage conversion (computed-identical by twMerge) + widened genus guard, the OTP docblock console truths, the parity-243 pin hardening, the session-token TTL bound, the signin aria-hidden riders, and the role no-authority docblock.

**Verification** — lint 0/0 · tsc 0 · **1581 unit (95 files, +29)** · build · smoke 15/15 · 150 e2e · **all six parity drift gates CLEAN at 0-event margin** · census MATCH · **captures 178-181** (mobile drawer at 390 with 9 destinations + Sign Out asserted, the Select open face, the signin riders, the polyglot canary — all PNG-verified non-blank). Docs lockstep complete (docs-counts 14/14, PAD v2.41.0, README, AGENTS +2 gotchas, CLAUDE, SKILL, plan closed R-41 → Done, worklog Task 244, `docs/session_71.md`).

**Recorded, not cured**: F-244i–n (tee'd OTP logs, `__Host-` prefix, whole-store subscriptions, per-render clocks, picked-state label, live-utility prose) plus the standing families (F-242h/i, F-240k-n, F-239l-s). To continue the rhythm, re-send the standing directive — the next session defaults to findings-led iteration with the guard advance as its first docs act.
