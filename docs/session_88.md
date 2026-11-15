I'll start by checking the current workspace state and setting up a comprehensive plan for this multi-phase task.
Both repos cloned. Let me survey the wealth-os structure and read the core docs.
The repo is well-developed (sessions up to ~199, remediation rounds R-44 to R-48 already executed). Let me check the session files and latest state.
Context is clear: the repo is at v2.48.0 (R-48 shipped as `b89b486`), and my session continues the documented rhythm — I'll be repo session 252 (R-49). Let me read the core docs.
Now let me review the remediation plan structure — the current version block, the §2.11 recorded ledger, and execution history.
I have full context now. This session is repo session 252 (R-49), continuing the findings-led rhythm. Let me begin the intake: environment setup.
Census MATCH (80/4/3/6/5/7, users=1). Now the chromium toolchain check and the cold baseline gate.
Chromium-1254 installed (the documented toolchain step). Now the cold baseline gate: lint → typecheck → test.
1686/1686 unit (103 files) — the v2.48.0 ship state. Now build + smoke.
Build clean (4 documented Turbopack warnings), smoke 15/15. Now the e2e battery.
One timing-leg failure (the known flake family documented in session 250). Re-running to confirm.
151/151 e2e — cold baseline gate GREEN. Now the standing asks. First, the reference drift probe.
Reference STABLE on all layers. Now the explicit mobile-navigation comparison on both sides at TRUE 390×844 via agent-browser.
Reference drawer opens with 9 destinations. Now verify Sign Out presence and the close toggle.
Let me do a clean open/close verification sequence on the reference.
The hamburger toggles to an X icon when open. Closing via the X.
Reference mobile nav verified: opens with 9 destinations + Sign Out, closes on the X toggle. Now boot our dev server for the clone-side comparison.
Logged in, landed on `/`. The labeled superset is visible (skip link, navigation landmark). Now open our drawer via the labeled hamburger.
Sign Out lives in the drawer footer (sibling of the nav). Checking the full drawer container.
Both sides verified. Let me capture comparison evidence screenshots for the record.
The screenshots came out 1280px wide — the viewport may have reset. Let me redo the mobile-nav verification with the viewport explicitly set to TRUE 390×844.
TRUE 390×844 confirmed. Re-verifying the reference side cleanly at this viewport.
`offsetParent` is null for fixed elements — false negative. Using computed visibility instead.
Mobile navigation parity confirmed on both sides at TRUE 390×844. Now `bun audit` and the neo-crm upstream check.
All standing asks verified. Now the fresh-eyes audit — three Mode-C passes per house convention. First, let me gather the R-48 cure surfaces and recorded-not-cured ledger for the auditors.
All three passes returned: all eight R-48 cure surfaces HOLDING; raw tally 0 Critical / 0 High / 1 Medium / 4 Low / 6 Informational. Per house convention, I must re-verify every material claim at file:line myself before planning.
F-252a verified. Checking the forgot-password sibling's always-present key form for the cure pattern.
C-1 verified. Let me study the house's superset ring pattern on similar surfaces (PeriodSegment, ai-coach chips) to design the cure.
The house pattern is `focus-visible:ring-2 focus-visible:ring-ring` (+ `ring-offset-background` on panel surfaces). Before designing the cure, check which pins watch these forms.
Now verify N-1 (DashboardData.user type lag), N-2 (stripComments gap), C-2 (scrollbar-thin), C-3 (vestigial literal), C-4 (useTheme fallback).
All material claims verified. Now the pre-cure pin survey — which existing tests watch the surfaces I'm about to change.
Now let me check the resend e2e/unit coverage and login-recovery consumption of the miss arm.
All math verified with code. Now let me check the docs-counts structural pin (the guard trio) that must advance with the v2.49.0 block.
The structural guard is clear. Now let me study the plan's edit points for v2.49.0 — the version header, §2.11 tail, R-48 section head, and §5.
Let me check the remaining pre-cure details: the auth-contract resend pin, the budgetDelete message consumers, and the a11y register structure.
Pre-cure survey complete. Now writing the remediation plan v2.49.0 via the assert-each-insertion convention.
Plan written. Verify docs-counts still green after the plan edits.
Plan validated. Now R-49.1 — pins born RED. First, capture the exact current forms for precise pin design.
Wait — dropdown.tsx:152 uses MENU_ITEM but the audit cited a separate form at :67. Let me clarify the DropdownItem structure.
All boundaries clear. Writing the R-49.1 pin battery — tests/parity-252.test.ts.
HONEST RED: 18/18. Verifying the failure reasons are the expected defects, not harness errors.
Honest RED verified — every failure is the expected defect. Now **R-49.2 — the cures**. Starting with the flagship F-252a (the list-item keyboard ring).
Now the SelectItem and DropdownItem arms.
Flagship cures 1-3 landed. Now Cure 2 (F-252b) — the resend miss-arm shape.
Cure 3 (F-252c) — the wire type widening and cast retirement.
Cure 4 (F-252d) — the palette census trailing-comment arm.
Cure 5 (F-252e) — the scrollbar dark arm.
Cure 6 (F-252f) — the latent offset arms on tabs underline variant and badge.
Now Rider 7 (F-252g) — the vestigial literal retirement plus the three citing comments.
Now the e2e comment truth (wealthos.spec.ts:59).
Rider 8 (F-252h) — the red over-budget register note in the a11y spec.
Rider 9 (F-252i) — the two e2e-pin prose truths.
Rider 10 (F-252j) — the three Zod message fields.
All cures landed. Running the parity-252 battery for the GREEN proof.
17/18 — one failure in the F-252g comment pin. Inspecting.
The phrase is split across a comment line boundary. Fixing the comment to keep the pin's watched form contiguous.
The nets caught my own cure comments — the F-229d discipline (four hyphenated coins + the still-split phrase). Fixing all five comment rewords.
All five affected batteries GREEN. Now the full unit suite (the wall-machinery re-validation).
My comment re-wrap split the pinned phrase "background token consumer" across lines. Fixing the wrap.
FULL UNIT SUITE GREEN: 1704/1704 (104 files, +18). Now the e2e ring leg — the F-252a live proof. Let me study the F-221b leg form.
Adding the F-252a e2e ring leg after the F-221b leg.
Let me verify the e2e storageState's theme posture — whether localStorage rides the auth state.
storageState carries no localStorage — the default run is the dark posture. Running the new e2e leg in isolation.
The ring isn't painting — boxShadow "none". Debugging live against the dev server (Mode B: reproduce and isolate).
The ring paints under agent-browser (synthetic events) but not in Playwright (trusted events). Writing a minimal Playwright probe to isolate.
The probe proves the ring paints. The e2e failure is a stale build — the e2e server serves the standalone artifact I built pre-cure. Confirming the webServer config.
Confirmed — the e2e boots the standalone artifact, which predates the cures. Rebuilding and re-running the leg.
The flagship is proven live. Removing the scratch probe, then the full gate.
FULL GATE GREEN — 1704 unit, 152 e2e (+1). Now the six parity drift gates.
All six parity drift gates CLEAN, census MATCH. Now the captures — studying the prior session's capture convention.
Writing captures-252.ts — the round's five faces (207-211).
Now stop the incumbent dev server on :3000 (the F-225e refusal), then run the captures.
Face 209's harness bug: `??` coalesces null — the route is correct (three keys present). Fixing the assertion to distinguish null from missing.
All five captures landed with live assertions. PNG validation + blank detection, plus the pre-ship `bun audit` re-triage.
All captures valid; audit unchanged. Now the docs lockstep — survey the live-tense count sites.
All structures mapped. Writing the scoped count-ladder + docs-lockstep script.
The re-run's REFUSED is expected (already applied), but 6 docs-counts legs fail — some doc sites still lag. Inspecting.
The timed-out run partially applied part 2. Checking which sites landed.
All part-2 edits landed (the assert-each convention caught the double-application). Running docs-counts.
docs-counts 17/17. Now the worklog entry and session record.
Now the session record — docs/session_87.md.
Session record written. Now the FINAL GATE from cold (all docs changes included).
The parity-243 mirror pin (the known lockstep companion from R-48) needs the same-commit recalibration. Reading it.
FINAL GATE GREEN. Now tree hygiene + the pre-commit checks.
Clean — only the repo's documented demo-login references (the standing precedent). Now the commit, then the SSH-wrapper push. Reading the runbook first.
Runbook understood. First the commit.
Commit `99bf966` on main. No ssh binary — deploying the paramiko shim per the runbook.
Key verified. Dry-run first (authenticates, touches no refs).
Dry-run clean. The real push.
**Push verified — remote @ `99bf966` == local HEAD. Operator key shredded. Tree clean.**
**Session complete — repo session 252 (R-49) shipped and pushed.** Commit `99bf966` on `main`, remote ref verified over SSH, deploy key shredded, working tree clean.

## The round in brief

**Intake & baseline** — Fresh clone; cold-baseline gate GREEN at HEAD `04fd4f6` (the exact v2.48.0 ship state: lint 0/0 · tsc 0 · 1686 unit · build · smoke 15/15 · 151 e2e · census MATCH; one known-flake timing leg, green twice after). Standing asks re-verified: reference STABLE on every drift layer (bundle md5 + stylesheet fingerprint unchanged); **mobile navigation compared on BOTH sides at TRUE 390×844 via agent-browser** — the reference's drawer and ours each open with the same 9 destinations + Sign Out and close on the toggle (ours adds the labeled superset); **no Tailwind v4 regression** (five-leg token-discipline verdict clean); `bun audit` unchanged; neo-crm unchanged; sitemap/robots/manifest green; the `.env` `DATABASE_URL="file:../db/custom.db"` contract, `db/` at repo root, vitest/playwright configs, and `.env.example` all standing.

**Fresh-eyes audit** (three Mode-C passes, every claim re-verified at file:line, contrast math re-computed by code): 0 Critical / 0 High / **1 Medium / 5 Low cured + 4 Info riders + 1 Info registered**; all eight R-48 cure surfaces holding; the API layer's fifth consecutive clean bill.

**R-49 cures (TDD: honest RED 18 → GREEN)** — the flagship **list-item keyboard-focus ring** (F-252a — menu items and Select options indicated keyboard focus through a 1.09:1 wash; the ring arm joins it at 17.49:1/18.15:1, proven live by computed-style capture + a new e2e leg); the **resend shape oracle** (F-252b — both arms three-key, closing an enumeration signal that survived the production OTP knob); the **dashboard user type lag** (F-252c); the **palette census trailing-comment arm** (F-252d); the **theme-blind scrollbar dark arm** (F-252e); the **latent ring-offset arms** (F-252f); plus riders (the vestigial dark-wash literal, the red meter register note, prose truths, Zod messages).

**Final gate** — lint 0/0 · tsc 0 · **1704 unit (104 files, +18)** · build · smoke 15/15 · **152 e2e (+1)** · six parity drift gates CLEAN · census MATCH · captures 207-211 in `docs/screenshots/` · docs lockstep complete (plan v2.49.0, PAD revision block + guard-trio advance, README/AGENTS/CLAUDE/SKILL counts, worklog, `docs/session_87.md`).

**Recorded, not cured**: F-252k plus the standing families (plan §2.12). To continue the rhythm, re-send the standing directive next session.
