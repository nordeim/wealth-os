我将系统地处理这个全面的任务。让我先从建立待办事项计划并检查工作区开始。
Repo cloned successfully. Now let me review the core documentation files.
Now let me read AGENTS.md and check the docs folder structure.
Now let me review the session documents and remediation plan.
Now let me check the worklog head and the latest commit to establish the current session number.
The rhythm is clear: last shipped round was Session 272 (R-69); this session is **repo session 273, R-70, plan v2.70.0, record riding docs/session_129.md, worklog Task ID 273**. Let me review the remediation plan's conventions and latest ledger.
Documentation review is nearly complete. Now let me read the SSH push runbook and check the skills catalog, since the push is a critical final step.
Now let me build the environment cold. First check tooling and the .env contract.
Bun 1.3.14 is available; paramiko needs installing for the SSH shim. Let me set up the environment now.
Census MATCH (81/4/3/6/5/7, users=1) — the documented state reproduces. Now the cold baseline gate at HEAD.
1972/1972 unit (124 files) — matches the ship state. Now the build.
Smoke 15/15 PASS (leg 12 covers the SEO surface). Now the e2e suite.
The known cold-start chromium deviation. Let me install the pinned build.
**COLD BASELINE GATE GREEN AT HEAD** — the v2.69.0 ship state reproduces exactly: lint 0/0 · tsc 0 · 1972/1972 unit (124 files) · build · smoke 15/15 · 161/161 e2e · census MATCH. Now the standing asks — probe:ref, bun audit, neo-crm.
`bun audit` shows 1 moderate (minimatch, dev-chain) — unchanged from the R-69 re-anchored census. Now the reference stability probe.
probe:ref STABLE on every layer. Now the clone-side mobile-nav comparison at TRUE 390×844.
Clone-side mobile-nav VERIFIED at TRUE 390×844 (pre-open 0 · 9 destinations + Sign Out · aria-expanded flip · post-close 0 · census MATCH · no Tailwind v4 regression). Now neo-crm.
neo-crm unchanged (b3d0fbe). All standing asks verified. Now let me consult the skills catalog before dispatching the audit passes.
The standing toolchain operationalizes the agent-browser/web-application/tdd skills. Now dispatching the three Mode-C audit passes as parallel research subagents per the house convention.
All three passes returned: **A) 17/17 R-69 cures HOLDING · B) API layer's 26th consecutive clean bill (0 Critical/High/Medium) · C) all 8 UI/shell contracts HOLDING**, with one genuine Low finding (`h-screen` vs `h-dvh`). Per the house convention, let me re-verify every material claim at file:line myself before planning.
The h-screen claim is verified at file:line. But before planning the `h-dvh` cure, the parity doctrine requires checking what the reference itself uses — computed styles are ground truth. Let me probe the reference.
Key discovery: the `h-screen` genus is ALREADY REGISTERED as part of F-220p (R-17): "`h-screen` (100vh) can extend under iOS Safari's collapsed toolbar (`h-dvh` is the robust form — reference construction unknown)". This session I can decode the reference construction: per F-207e/F-210a, the reference uses document-scroll with `min-h-screen` shells — no fixed-height shell exists in the reference, so no parity constraint binds our shell's height mechanism (our internal-scroller shell is the documented F-210a superset). Let me verify the remaining claims and check for pins.
No test pins `h-screen` on the shell root (the `min-h-screen` pins are the page shells — a different surface). Let me capture the exact vitest warning text and check the docs-count ripple a rename would cause.
The vitest warning is real and its cure path is a mechanical rename. Let me verify the remaining surfaces: e2e references to the shell root, raw 100vh in CSS, the SEO metadata pins, and empirically test the .mts rename before planning.
All surfaces verified: the h-dvh swap is isolated to `page-layout.ts:12` + the app-shell comment; SEO pins green (30/30); the vitest rename ripple is contained (2 test sites + 2 doc sites). Let me empirically validate the .mts rename path before planning it.
The rename empirically cures the warning and trips the parity-229 pin exactly as expected (born-RED by design). Now let me enumerate every `h-screen` carrier in src/ — the F-228b whole-tree doctrine.
The register note lives in the ledger's F-220p row (immutable history); the new F-273a row will record the promotion and decode. Let me check the remaining vitest.config.ts reference sites.
All ripple sites enumerated. Let me check the PAD §7.1 rows and docs-counts trio state for the lockstep planning.
State confirmed: arch pins 92→93 with parity-273, trio advances to v2.68.0/v2.69.0/v2.70.0. Now let me examine the plan structure for the R-70 section insert and §5 history table.
Let me map the plan's version-block structure precisely before writing the plan script.
The insertion mechanics are clear. Let me model the plan script on the previous round's.
I have the complete model. Now writing the plan script for **v2.70.0 (R-70 — the dynamic-viewport, config-loader, and register-promotion round)**.
Plan v2.70.0 written with all three insertions verified. Now **R-70.1 — the pins born honest RED**. Let me model the battery on parity-272.
Let me check tsconfig and eslint coverage for .mts files before writing the battery.
Critical detail: `tsconfig.json` includes `**/*.ts` which does NOT match `.mts` — the rename would silently escape the type gate. The cure must add `"**/*.mts"` to the include. Let me validate the complete rename path empirically.
The full path validates: tsc 0 · lint 0/0 · warning cured. Reverting to pre-cure state (the change lands in R-70.2).
Now writing the parity-273 battery. Let me check parity-229's tree-walker idiom first.
The scanner net will auto-flag comment-carried `h-screen` post-cure (class-shaped, head `h`, not live). Now writing the parity-273 battery.
The walker has a bug — let me fix it with the correct dirent form.
**R-70.1 complete — 9 legs born honest RED.** Now **R-70.2 — the cures**. First a final check for any other reference sites.
All cures landed. Now **R-70.3 — verification**. First the round's battery and siblings.
The F-247e window doctrine bites: the second list (`ROOT_CONFIGS`) is indented 4 spaces (inside the describe callback) — my 2-space pattern matched only the first. Writing the continuation cure per the one-shot-record convention.
All sibling batteries GREEN (131/131). Now the full unit suite — docs-counts will RED until the lockstep, as expected.
Full unit suite GREEN at 1981/1981 (125 files, +9). Now lint, typecheck, build, smoke.
The 4 Turbopack warnings are the documented upload-route tracing set. Now smoke and the full e2e battery.
e2e 161/161. Now the drift chain re-run — the round changed a swept surface (shell root class), so the honest verification is the six drift gates themselves.
The sweep runs one width per invocation. Running the remaining three classes.
All four sweep classes CLEAN — the dvh==vh property demonstrated, not asserted. Now the fullpage sweep and interior census.
**ALL SIX PARITY DRIFT GATES CLEAN + census MATCH** — the shell-root change is proven pixel-neutral end-to-end. Now the captures. Let me model on the standing convention.
Writing the round's captures script. Let me check the footer constant for the reachability assertion.
All three captures landed, live-asserted, with the computed-height dvh proof. Let me visually validate them per the house convention.
The captures are validated (correct dimensions, solid dark surfaces, live-asserted DOM state). Now the docs lockstep. Let me survey the live-tense count sites and model on the previous round's lockstep.
Now I have the complete lockstep map. Let me verify PAD:3335's context, then write the lockstep script.
All sites confirmed live-tense. Writing the lockstep script.
docs-counts and parity-243 GREEN at the advanced trio (the 24th gate-enforced ride). Now the full unit suite at the final state.
Full suite GREEN at 1981/1981 (125 files). Now the §5 execution-history row.
Now the session record docs/session_129.md, modeled on the house convention.
Now the worklog entry (Task ID 273, prepended).
Worklog prepended. Now the final pre-ship verification — tree state and the full gate at the ship state.
Tree state is clean per the house convention. Running the complete final gate chain.
**FULL GATE GREEN at the ship state**: lint 0/0 · tsc 0 · 1981/1981 unit (125 files) · build · smoke 15/15 · 161/161 e2e · census MATCH · the six drift gates CLEAN. Now the commit.
Committed (29 files, rename detected). Now the push via the SSH wrapper — materializing the key outside the repo, shim on PATH, dry-run first.
Dry-run authenticated cleanly. Now the real push.
**PUSHED AND VERIFIED** — remote `main` @ `a2ddc41b` == local HEAD, both key copies shredded, tree clean.
**Session 273 (R-70) — the dynamic-viewport, config-loader, and register-promotion round — delivered and pushed to `main` as `a2ddc41b`** (remote ref verified by the wrapper, key shredded, tree clean).

**Verified evidence:**
- **Intake & baseline** — fresh clone at HEAD `545710ad`, env rebuilt cold, census MATCH; the v2.69.0 ship state reproduced exactly (lint 0/0 · tsc 0 · 1972 unit · smoke 15/15 · 161 e2e).
- **Standing asks** — probe:ref STABLE on every layer; mobile nav verified on BOTH sides at TRUE 390×844 (no Tailwind v4 regression); `bun audit` unchanged (1 dev-chain moderate); neo-crm unchanged; SEO green (sitemap/robots/manifest + 30/30 metadata pins); `.env` on the `file:../db/custom.db` contract with `db/` at the root.
- **Audit** — three Mode-C passes: R-69 cures 17/17 HOLDING; the API layer's **26th consecutive clean bill**; all 8 UI/shell contracts holding. New findings: 0 Critical / 0 High / 0 Medium / 2 Low / 3 Informational.
- **TDD cures** — flagship **F-273a**: shell root `h-screen` → `h-dvh` (the F-220p register entry, promoted with the reference construction decoded — parity-neutral; the iOS Safari bottom-truncation genus fixed) + the toast max-height twin; rider **F-273b**: `vitest.config.mts` (+ tsconfig `**/*.mts` include + 6 reference sites). Parity-273 born RED 9/9 → GREEN.
- **Gate** — 1981 unit (125 files, +9) · 161 e2e · smoke 15/15 · **the six parity drift gates re-run CLEAN** (the dvh==vh property demonstrated at pixel level) · census MATCH · captures 263–265 (incl. the computed-height dvh proof).
- **Docs & ship** — plan v2.70.0, session record [session_129.md](/home/z/my-project/wealth-os/docs/session_129.md), worklog Task ID 273, full count-lockstep across all five docs.

Next round defaults to findings-led iteration — re-send the standing directive to continue the rhythm.
