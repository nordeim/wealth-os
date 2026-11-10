I'll continue with the wealth-os multi-stage task. Let me start by setting up a task plan and refreshing the local workspace.
The workspace exists at `/home/z/my-project/wealth-os/` from prior sessions. Let me check its git state and refresh it.
`git pull` 快进更新并引入了新的 `docs/session_20.md`。现在我来查看一下关键文档。首先，检查文件大小以便规划阅读：
`docs/session_20.md` records session 217 (R-14) delivered at `ae50258` — meaning **my session is session 218**, which defaults to no open R-item (fresh audit round). Now let me review the core documentation:
Now let me read the README and Project Architecture Document:
Now let me read the remediation plan (the living program document):
I now have the full picture. Let me read the remaining core docs — wealth-os_SKILL.md and the skills catalog:
Environment is intact (bun 1.3.14, node_modules, db/, .env + .env.example). Let me verify .env content and read key SKILL sections:
Now the skills catalog and web-application skill (the audit anchors):
Documentation review is complete. Key state: **plan v2.14.0, session 217 (R-14) shipped at `ae50258`; my session is 218 with no open R-item — fresh audit round per the house pattern**. Now let me set up the environment and run the cold baseline gates:
Lint 0/0 · tsc 0 · **767/767 unit (60 files)** — matches the documented v2.14.0 state. Now build → smoke → e2e:
**Cold baseline — FULL GATE GREEN from cold**: lint 0/0 · tsc 0 · 767/767 unit (60 files) · build · smoke 14/14 · **e2e 95/95** · census MATCH — exactly the documented v2.14.0 state. Security ledger re-triaged: the standing 1 moderate (minimatch, range-unreachable) — unchanged, no new runtime-chain advisory.

Now let me review the recent code changes (the R-14 diff) and dispatch the fresh-eyes audit:
R-14 touched 45 files. Now dispatching the three parallel fresh-eyes audits (Mode C) per the house pattern, while I personally verify the standing deliverables and probe the live reference:
Three audit reports returned: **0 Critical / 3 High / 12 Medium / 13 Low / 7 Informational** total. Per the house iron rule, I must verify every material finding myself at file:line before it enters the plan. Starting with the two High findings:
The guard at line 87 excludes `[aria-label="Expense filters"]`. Let me check whether the actual trigger button carries that aria-label:
**HIGH-2 VERIFIED at file:line**: the trigger button (line 181) carries NO `aria-label="Expense filters"` — that label is on the popover panel (line 194), a *sibling* not an ancestor, so `closest()` from the trigger never matches it. Pointerdown on the trigger → `setFiltersOpen(false)` → the subsequent click toggles it back open. Let me check the pin that let this ship, and verify the second High finding:
Confirmed — the pin asserts only the negative (bare selector absent), never a positive trigger-scoped guard. Now verifying HIGH-1 (expired-verification lockout):
HIGH-1 mechanism verified: line 136-138 shows the login 403 only renders a banner — the verify view (with the Resend link) is reachable solely via successful signup (line 177). Let me check the login route's error code and the resend route:
Line 57 confirms the distinctive `VERIFICATION_REQUIRED` code the client ignores. Let me check the verify view's resend handler to confirm the recovery loop closes:
HIGH-1 fully verified — the server recovery loop (resend re-arm) is unreachable from the client. Now verifying the Medium findings:
M-1 and the updateSettings gap both verified. Now the deepest finding — M-2 (UTC date bucketing). Let me trace the mechanism through finance.ts:
M-2 mechanism confirmed: `sameMonth`/`startOfMonth` use **local** accessors while stored dates are **UTC midnight**. Let me verify the display side and the sandbox TZ (why the gates are blind to this):
M-2 fully verified — the sandbox runs UTC (gates blind), but in UTC-negative TZs a Nov 1 transaction displays as 10/31 and buckets into October. Now batch-verifying the remaining Medium/Low findings:
M-3 and M-4 verified (both real; M-4's own comment admits the chunked gap). Now the UI findings:
The store's `call()` always sends `Content-Type: application/json` — the logout CSRF gate is compatible. The amber primary register is live-observed reference genus (sanctioned). Let me finish verification — counting e2e rate-limit exposure and checking the HealthGauge band:
HealthGauge colors are reference-cited genus (docblock says so) — register class. E2E exposure is 1-3 calls per API — modest rate buckets are safe. Let me size the focus-ring cure scope:
所有实质性发现均已验证。在撰写计划之前，让我先测试一下运行时是否支持动态 TZ 切换 —— 这决定了针对 `UTC-date` 修复（F-218d）的 TDD 测试项（pin）能否真正呈现出 RED 状态：
Both runtimes honor dynamic TZ — the F-218d pin can present RED properly. Let me check the remaining seam consumers (`toDateInputValue`, dashboard series, monthLabel) to design the cure precisely:
`toDate` is the central seam and the dialog prefills bypass it with raw `new Date` — those need routing through toDate too. One more check — is `--color-ring` flipped in `.dark` (the focus-ring cure's dark arm depends on it):
`--color-ring` is NOT flipped in `.dark` — meaning the `input-base` focus ring is near-black-on-dark (invisible) in dark mode — a new latent finding. The clean cure: flip the token in `.dark`, then light-surface `ring-amber-400` sites can adopt `ring-ring` for both modes. Let me verify ai.ts date bucketing quickly:
All verification complete. ai.ts flows through the same finance seams — the toDate cure covers it. Now I'll write the remediation plan **v2.15.0**. Let me check the exact ledger row format and insertion points:
Now I'll write the plan v2.15.0. Let me get the exact header text for the byte-precise edit script:
Plan v2.15.0 written. Now the mandated **plan-validation pass** — verifying every planned touch-point against the codebase before execution:
Critical validation catch needed — the smoke ladder's logout call (leg 10) might not send a content-type. Checking before designing the logout gate:
Smoke leg 10 sends no Content-Type — the logout gate cure must update the smoke curl in-commit. Let me check the remaining validation details:
Boot-env structure confirmed — the warning joins the F-214f family (production-conditional). The reset-password spec's logout fetch needs the header added in-commit. Now checking the analytics tabs model for the expenses cure:
All touch-points validated. One last check — `formatDateByPattern` callers (do any parse dates raw?), then I'll write the RED pins:
`formatDateByPattern` has zero callers — let me find what the tables actually use to render dates:
Complete picture — the expenses table renders dates via raw `new Date(tx.date)` (line 274), another raw-parse site for the cure. All touch-points validated. Now **Stage A — writing the RED pins**. First, the house style models:
Now writing the RED pins. Let me check the remaining test file structures for the extension points:
`count > limit` denies — the 10th signup is allowed (9 existing + 1 mine = exactly at cap; I'll note the budget in the test). Now writing all the RED pins:
Now extending the existing pin files — expenses-popover, http-headers, finance, dark-tokens, auth-contract, toast-anatomy:
Now the two e2e legs — the recovery journey in auth.spec and the toggle leg in wealthos.spec:
Wait — I placed `test.use()` inside the test body, which is invalid. Let me check auth.spec's file-level guest handling:
File-level guest opt-out covers the whole spec. Now **RED verification** — all new pins must fail with exact evidence:
**Stage A complete — 38 RED pins with exact evidence.** Now **Stage B — the cures**. Starting with F-218a (the recovery transition):
Now F-218b — the trigger-scoped popover guard:
The Button needs to accept the ref (React 19 ref-as-prop). Checking:
Button spreads `ref` via props (React 19) — the ref works. Now F-218c (export) and F-218d (toDate normalization):
Now the raw-parse call sites — expenses table + the three edit prefills:
Now F-218e (updateSettings guard) and F-218f (upload stream bound):
Now F-218g — the rate buckets. Let me check the three routes' heads:
Now F-218h (toast live region) and F-218i/l (globals.css token cures):
Now the globals.css token cures (F-218i ring flip + F-218l muted/subtle) and the light-surface focus rings:
Now the focus-ring cures — enumerate all light-surface sites and apply `ring-ring` (the token now flips in `.dark`):
:350 (the navy login button) also uses the full token but must KEEP it (dark surface). Let me handle it explicitly:
The /60 sites are prefix-matched too. Let me do it precisely per-site:
Focus rings cured. Now the contrast + UI fixes (F-218j/k/m/n):
Now F-218k (badge dark steps), F-218o (tabs panels), F-218u (labels + checkbox):
Now F-218p/q/r/s/t — the API-layer cures (logout gate, fallthroughs, P2002, AI cap, boot warning):
The ai-body-cap pin may pin the old 256KB value — checking and updating in-commit:
The fixture needs the in-commit update (builder defaults to the real-deployment posture — now including the hop depth) + the new warning's own pins:
Now F-218u — the label associations and the checkbox accent form:
Now the logout-gate consumers (smoke ladder + reset spec) and the docs/env cures (F-218t):
Now sync `.env` with the updated `.env.example` and strengthen the weak labels pin:
Now the GREEN check — lint, typecheck, and the full unit suite:
Two pin-literal refinements needed (my pins didn't follow the actual cure forms):
**817/817 unit GREEN** (+50 checks / +2 files), lint 0/0, tsc 0. Now Stage C — build → smoke → e2e:
The failure is decoded — my 4-panel cure duplicated the list into hidden panels, breaking text-uniqueness (`.first()` resolved to a hidden copy). The honest fix: only the ACTIVE panel carries content (aria-controls still resolves for all). Let me check TabsPanel's rendering first:
TabsPanel keeps hidden panels in the DOM. Refining the cure — only the active panel carries content:
The e2e boots the standalone build — stale from before the refinement (the session-217 precedent). Rebuilding and re-running:
**E2E 97/97 GREEN** (+2 legs). Re-running smoke on the fresh artifact + census, then the six parity drift gates:
The gate's core legs are green on this tree. Now the six parity drift gates (each boots its own dev server + probes the live reference):
**All six parity drift gates CLEAN** (four sweeps + fullpage + interior census at margin 0). Now the docs-counts lockstep — the counts moved 767→817 unit / 95→97 e2e / 60→62 files:
The pin correctly trips 11 doc sites. Now the full docs lockstep — survey the sites and update them all:
Counts locked. Now the round's contract-text additions — PAD revision block, README status row, AGENTS gotchas:
Now the plan's R-15 completion + §5 execution row, and the worklog entry:
The test itself hardcodes the expected pin-row literal — needs the in-commit update. Let me find the three expectation literals:
docs-counts green. Now the **capture set** (screenshots 71-76 with live assertions). Let me check the prior session's capture pattern:
Writing the session-218 capture set (six faces with in-DOM assertions):
My `commit()` calls pass bare filenames while screenshots write to `docs/screenshots/`. Fixing:
The ring DID flip — `rgb(245, 245, 244)` (the token is #f5f5f4 — my regex expected 245,245,245). Fixing the assertion:
All six faces + the export header verified. Now cleanup: kill the dev server, reseed (the toast test deleted a row), and run the final cold gate:
The capture signups left throwaway users in the dev db (seed wipes only the demo owner's rows). Cleaning up via the db singleton:
Census MATCH. Now the final cold gate before commit — lint → tsc → unit → build → smoke → e2e:
**FULL GATE GREEN from cold**: lint 0/0 · tsc 0 · 817/817 · build · smoke 14/14 · e2e 97/97 · census MATCH. Now the atomic commits — checking the tree first:
Tree is clean (no scratch files). Let me visually verify two key captures before committing:
All captures validated (1440×900, content-rich, live-asserted). Now the three atomic commits:
Three atomic commits landed, tree clean. Now the push — reading the SSH wrapper runbook first:
Runbook internalized. The paramiko shim already exists in the workspace bin. Deploying the key and running the dry-run:
**Session 218 (R-15) delivered and pushed to `main @ 54f0885`** — remote ref independently verified equal to local HEAD, working tree clean, key shredded.
## Session 218 — R-15 “the recovery-loop and perceivability round” — delivered

**The round's headline cures** (all verified before fixing, TDD throughout — 38 pins born RED → GREEN, +2 e2e legs):

**The recovery loops** (paths the gates structurally cannot drive):
- **The expired-verification lockout (F-218a High)** — a signin 403 `VERIFICATION_REQUIRED` rendered a banner dead-end; the verify view (with its Resend) was reachable only via signup success. The client now keys on the error code and lands the verify view — the e2e journey proves the loop R-14 built server-side is finally reachable.
- **The Expenses filters trigger regression (F-218b High)** — R-14's popover cure removed the outside-close guard without landing its claimed trigger-scoped replacement; the toggle flicker-reopened. Cured with a `filtersTriggerRef`, a *positive* pin (the negative-only pin let it ship), and the toggle e2e leg.
- **/api/export no-store (F-218c)** — the GDPR dump rode a raw response past the envelope's own claim.
- **The UTC-midnight date bug (F-218d)** — rent dated the 1st rendered as the prior day/month for every user west of UTC (the sandbox's UTC posture kept every gate blind). `toDate` now re-anchors stored calendar dates; TZ-switching pins run America/New_York for real.

**The perceivability cluster**: the toast viewport became the polite live region (WCAG 4.1.3); `--color-ring` gained its dark flip (input-base's focus ring was invisible in dark mode — the F-217c token class on the ring token) and the 1.67:1 light-surface rings adopted the compliant token; red-500 small text and the investment badges darkened to AA steps; plus the low tail (the updateSettings token guard, the upload chunked-stream bound, import/coach/reset rate buckets, the logout content-type gate, the P2002 arm, the proxy-hops boot warning, the label associations).

**Evidence (all executed)**: lint 0/0 · tsc 0 · **817 unit / 62 files** (+50) · build · smoke 14/14 · **e2e 97/97** (+2) · **all six parity drift gates CLEAN** (the mobile menu verified at 390×844) · census MATCH · six asserted screenshot faces (71–76) · `bun audit` unchanged.

**Shipped** as three atomic commits on `main` (`cd87e17` → `54f0885`), pushed via the SSH wrapper — remote ref verified, key shredded. Plan → v2.15.0; session 219 defaults to no open R-item.
