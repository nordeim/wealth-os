I'll start by internalizing the operating instructions, then work through this comprehensive task systematically. Let me set up a TODO plan first.
The repo is mature (session 213, Prisma 7, vitest+playwright already present). Let me read the core documents now.
Now let me read the remediation plan (the key living document), the worklog top, and session_16.
Remediation plan understood: v2.10.0 @ session 213, no open R-items, next session = 214 (mine). Let me read the worklog top and session_16.
Now let me review the wealth-os_SKILL.md structure and the skills catalog.
I have a solid understanding of the skill framework. Now let me set up the environment and validate the documented state with cold baseline gates.
Database seeded, census MATCH. Now running the cold baseline gates (lint → typecheck → unit tests).
Cold baseline matches the documented v2.10.0 state exactly (630/630). Now the security ledger re-triage and standing deliverables audit.
Sitemap is properly implemented. Now let me examine the mobile navigation (a key user concern) and the test configs.
Test configs are solid. Let me verify the db-path seam and site.ts (SEO), then run the build.
The db-path seam is exactly as documented. Let me start the build, and meanwhile delegate neo-crm reference review to a subagent.
neo-crm patterns confirmed — wealth-os follows the family patterns (and is ahead on Prisma 7). Let me check the build and then browse the reference app.
The background build was reaped by the sandbox (as documented in session_16: "sandbox reaps processes between calls"). Running synchronously:
Build green with all routes. Now smoke + e2e:
E2E auth setup failed. Let me investigate the root cause.
Root cause: Playwright browsers not installed in this fresh sandbox (environment issue, not codebase). Installing chromium:
Full gate green: lint 0/0 · tsc 0 · 630 unit · build · smoke 14/14 · e2e 84/84 · census MATCH. The documented v2.10.0 state is validated cold. Now the reference app stability probe and mobile nav audit.
Reference app is STABLE on every layer (bundle fingerprint, zero-data census, 256px/9-link sidebar, TRUE-390 functional mobile menu). Let me examine the mobile-nav e2e coverage and run a side-by-side mobile census.
The mobile-nav e2e battery is comprehensive (all green). Let me run the standing parity sweep leg at 390×844 (the mobile axis) to verify our tree against the live reference.
Phone sweep CLEAN. Let me also run the desktop sweep leg (1440×900):
Both sweep legs CLEAN — parity intact. Now the skills-guided audit of recent code changes (R-8/R-9 rounds = last two sessions).
Let me audit the R-9-touched runtime files in detail.
SEO/metadata seam is solid. Now let me run the systematic audit checks — security surface, recent-change quality, and leftover issues.
Auth patterns are hardened. Let me complete the remaining two drift gates (interior census + fullpage sweep) for the full audit evidence set.
Interior census gate CLEAN. Now the fullpage sweep:
Fullpage gate CLEAN. Running the remaining two sweep classes (tablet 768, landscape 1024) for the complete evidence set:
All six drift gates CLEAN + census MATCH. Now let me check git status and hunt for any new audit findings.
Git hygiene is clean. Let me dispatch a fresh-eyes code audit subagent while I check dependency health.
The audit found real material. Now I must verify each finding at file:line myself (the plan's Iron Law). Let me verify the High and key findings.
H-1 verified — the six `deleteMany` calls are unscoped. Let me verify M-1 (ownerless Budget/Setting, users list) and the schema.
No UI consumes `GET /api/users` — dead scaffold surface. Now verifying M-3 (unpinned color pairs) against globals.css:
M-3 verified. Let me check the globals.css header contract and verify L-1:
boot-env has the exact warn-seam for the M-2 cure. Now let me comprehensively enumerate ALL color pairs used in src/ vs @theme pins (the M-3 verification):
M-3 is bigger than initially found: **23 unpinned pairs + 7 missing semantic tokens**. Let me read the full @theme block and .dark flips to design the cure:
The finding set is solid. Let me complete verification of the remaining items (settings route, csv parser, AI insight gap, section heading):
All findings verified. Let me check budget consumers across routes and test pins before finalizing the plan scope:
Full consumer map established. Let me test the L-4 ESLint rule question before finalizing the plan:
All four rules pass clean — the re-enable is safe. Final verification: smoke ladder's endpoint coverage and the analytics route:
All evidence gathered. Now let me read the exact plan format sections I'll extend (§2 findings rows and R-8/R-9 style):
Now let me check the search route scoping and any other db.setting readers, then write the plan addendum:
All verifications complete. Now writing the remediation plan v2.11.0 addendum:
Header applied; now adding the F-214 findings rows:
Findings rows landed. Now adding R-10 and R-11 sections after R-9:
Now the execution history row and trailing pointer update:
Plan v2.11.0 complete. Per the Iron Law, let me validate the v3 palette values against the neo-crm sibling (same doctrine) before executing:
v3 values cross-validated (neo-crm pins 8 of them identically; the rest are the standard v3 sequences consistent with the existing family pins). Plan validated. Now **Stage A (RED)** — writing the failing pins:
Now the palette-pins test (the complete enumeration pin):
Now the in-commit cure test extensions. Let me check the existing test files' relevant areas:
Now adding the RED test cases to the three existing test files:
Now the finance.test.ts overdue-window pin (F-214g):
Now running the RED check — the new pins must fail with precise evidence:
**RED confirmed: 21 failures with precise evidence** (exactly the expected set). Now **Stage B (GREEN)**. Starting with the R-10 schema migration:
Bytes are clean; the mismatch must be subtle whitespace. Using smaller unique anchors:
Schema migrated. Now the seed's owner-bound writes:
Now the route re-scoping. First /api/reset:
Now the budgets route (GET/POST/DELETE owner-scoping):
Now the dashboard, ai/coach, and export routes' budget reads:
Now the settings route — owner-keyed row resolution:
Now the users route — GET answers the session user only:
SessionUser carries all fields — users route is correct. Now R-11: the globals.css palette completion:
Now the 7 semantic tokens (with the .dark flips, following the F-209a mechanism):
Now the in-commit cures: boot-env delivery warning, csv quote fix, ai zero-income insight, finance docblock:
The test expects the warning to fire when EITHER knob is unset (each controls a different takeover channel). Fixing the condition to OR semantics:
Let me check the existing "no warning" knob test that my new warning could break:
The existing pins assert exact warning counts — the new warning legitimately changes the contract. Updating the fixtures (builder defaults the knobs to the production posture; the delivery block unsets them explicitly):
Now the CSV parser fix (F-214h) and the AI zero-income insight (F-214j):
Now the AI coach zero-income fix (F-214j):
Now the finance.ts docblock (F-214g) and the eslint re-enable (F-214k):
Now the F-214i doc fixes in README and PAD:
I accidentally duplicated the Expenses row. Let me fix the feature table:
Now the PAD fixes (upload cap + ER + §4.2 + §6.3 single-user claim):
Now regenerate the prisma client, apply the schema, and reseed — then run the GREEN check:
P2022 — adding required columns to populated tables. Let me see the full push error:
Push succeeded on re-run. Now the seed:
Schema migrated, seeded, census MATCH. Now the GREEN check:
Three fixable issues: the test regex rejects digit-ending tokens, rose-300 was missed in the pins, and the schema pin is too whitespace-specific. Fixing all:
All new pins GREEN. Now the full suite (expecting the docs-counts lockstep pins to fail until the docs edits land):
657/657 in 47 files — all green! Let me check why docs-counts passed (the count claims should have moved):
docs-counts constants are now stale (630→657, 45→47) — the lockstep must move in this commit. First lint + typecheck on the code changes:
Lint 0/0 under the strengthened rules + tsc 0. Now the docs-counts lockstep — finding all live-tense count sites:
Now the PAD revision-block entry for session 214:
Now run the full unit suite to verify the lockstep:
One site left — the README file-hierarchy "45 unit suites". Fixing:
657/657 green. Now Stage C — the build + smoke + e2e legs:
Those 2 warnings are pre-existing (upload route tracing — untouched this session; smoke's artifact-hygiene leg polices it). Running smoke:
The smoke ladder dies at its first `db:push`. Let me reproduce:
Push works on a fresh db. The issue is pushing onto the old-schema populated db. Let me check the wrapper's flag handling:
The stale scratch db killed the ladder — a brittleness at the root (scratch dbs must be removed before push). Let me check the e2e global-setup too:
Both custom.db and smoke.db have the new schema; e2e.db is stale and WILL break the next e2e run. The root fix: scratch dbs must be recreated idempotently. Let me check what the R-9 pin says about the e2e push command first:
The pin allows the change. Implementing the F-214m cure (the live discovery: scratch-db schema drift):
The sed line is convoluted — simplifying to the direct form:
SMOKE 14/14 with owner-scoped routes live. Now the e2e suite (exercising the force-reset setup on the stale e2e.db):
E2E 84/84 — full offline gate green. Now the parity drift legs (the palette pins changed computed colors — the critical R-11.3 verification):
Desktop CLEAN. Now the phone leg (390×844 — the mobile axis):
The interior census needs more than the tool window. Running it in background while I proceed with the fullpage sweep:
My persistent shell is jammed. Let me try a subagent with a fresh shell to test whether it's session-level or environment-level:
Environment is fine — only my persistent shell is jammed. Subagent shells work, so I'll continue driving verification through subagents while doing doc edits directly. First, the remaining drift gates:
All parity gates green (interior census margin 0, fullpage 22 legs, reference STABLE, census MATCH). Now updating the plan statuses and adding F-214m:
My session's direct tool access has degraded, but subagents work reliably. Routing the remaining work through them. First, the documentation lockstep (plan statuses + F-214m + worklog entry):
Docs lockstep applied (32/32 green). Now the screenshot captures for the remediated codebase:
All 4 captures verified (DOM-asserted, non-blank). Let me visually spot-check the two key captures:
Both captures LOOKS-GOOD (mobile drawer: 9 items, active pill, Sign Out footer — exactly the mobile nav the task focused on). Now the final pre-push gate — a full cold run at the shipped state:
**Full gate 8/8 PASSED** — lint 0/0 · tsc 0 · 657/657 · build · smoke 14/14 · e2e 84/84 · census MATCH. Now the atomic commits and the SSH-wrapper push:
Session 214 is shipped and pushed — remote `main @ 09a39c4` verified equal to local HEAD, working tree clean, key shredded.

**What this round delivered:** After validating the documented v2.10.0 state cold (all gates + all six parity drift gates + a STABLE reference probe, mobile menu census confirmed both apps), a fresh-eyes skills-guided audit found the session's material: `/api/reset` could wipe the whole install (High), Budget/Setting were ownerless contradicting the PAD's own ER, `/api/users` leaked every account's email, and the Tailwind v4 token bug had a third edition — 23 color pairs silently computing v4-oklch values plus 7 fully inert shadcn tokens. All cured via the plan v2.11.0 with strict TDD (21 RED → 657/657 GREEN), plus six smaller cures (boot-time delivery warning, RFC 4180 CSV fix, zero-income AI warning, eslint re-enabled 4 rules, doc drift). A live discovery — stale scratch DBs refusing the schema push — was root-caused and cured in-commit. Evidence: screenshots 51–54, and every gate green at the shipped tree.

**Note:** my main shell session jamged mid-run; all subsequent verification ran through subagent shells with identical results.

**Suggested next steps:** the plan's trailing pointer names session 215's defaults — findings-led iterations, the F-210a scroll-genus watch, or R-5 (LLM provider wiring) whenever you want it.
