Repo cloned — it's at an advanced remediation state (session-219 in log). Note: repo already has `.env.example`, `db/`, `vitest.config.ts`, `playwright.config.ts`. Let me review the docs and current state.
The repo is already at an advanced state (R-16 remediation round, session 219 evidence). Let me read the core docs to understand the project.
The repo is at an advanced remediation state (session 219, R-16 shipped). Let me read the remaining core docs and the latest session/status files.
工作日志显示会话 219 (R-16) 交付了同一常设指令的上一轮。让我检查一下当前的整改计划状态以及用户提到的会话文件。
上下文已明确：该仓库目前处于 v2.16.0 / 会话 219 状态（R-16 已在上一轮交付）。本次会话（220）遵循既定指令：重建环境 → 冷基线门控 → 审计 → 发现导向的迭代 → 捕获 → 文档同步 → 推送。让我验证一下环境工具并开始重建。
Census MATCH, lint clean. Running the remaining cold-baseline gates.
E2E setup failure — likely the known chromium version mismatch. Let me check details.
Full cold-baseline gate GREEN: lint 0/0 · tsc 0 · 869/869 unit · build · smoke 14/14 · 99/99 e2e · census MATCH. Now the `bun audit` re-triage per the standing security ledger.
Audit matches the documented standing state (1 moderate, dev-chain minimatch, range-unreachable — no new runtime-chain advisory). Cold baseline fully verified at v2.16.0.
Now running the reference-stability drift probe (checks if the live Base44 reference has moved).
Reference is STABLE on all four layers — no parity event. Now dispatching the fresh-eyes audit (Mode C, three parallel passes per the house pattern).
All three audit passes returned. Consolidated: **0 Critical / 1 High / 5 Medium (2 deduped) / ~10 Low / ~12 Informational**. Per the house iron rule, I must verify every material finding at file:line before it enters the plan. Verifying now.
H-1 live-verified: the bare `yyyy-mm-dd` form falls through and mis-buckets west of UTC. Now verifying the Medium findings.
All Medium findings verified at file:line. Now reading the cure-surface files completely to design the R-17 round.
All cure surfaces are now fully understood. Let me examine the remediation plan structure and test conventions to build R-17 correctly.
现在我将编写补救计划 v2.17.0（R-17 部分）。首先找到精确的插入点。
Now adding the F-220 findings ledger rows:
Now adding the R-17 section after R-16:
Plan v2.17.0 committed to the file. Now executing TDD — pins first (RED). Let me check the existing TZ-test pattern in finance.test.ts.
RED confirmed (3 new F-220a pins fail). Now the cure:
F-220a GREEN. Now the csv staging seam (F-220m) — RED pin first:
RED confirmed. Implementing `stageCsvDate` in csv.ts:
Seam GREEN. Now writing the parity-220 pin file (all source pins, RED first):
Now writing the comprehensive pin file:
RED confirmed (39 failing pins). Now executing the cures. First the writes buckets (F-220c):
Now budgets DELETE, settings PUT, users PATCH:
F-220c complete (14 handlers). Now the dark arms (F-220b):
F-220b complete. Now F-220d — the background token flip:
Now F-220e (error rings) and F-220f (toast dismiss):
Now F-220g/h/n — the theme seam. First check what theme-default.test.ts pins:
Now update the theme-default test header + add the F-220g invalid-value pins:
Now F-220i (accountId) and F-220j (store plumbing):
Now the store cures (F-220j call code + F-220l seq guard):
Now F-220k (forgot-password read path):
F-220k 已完成。接下来是导入页面 (F-220m)：
These are CRM-era historical comments making living-tense claims. Updating them to name WealthOS while preserving the session history:
Now the a11y spec (F-220o/p). Reading the current structure:
Updating the a11y spec — dark legs to all 9 sections + register hygiene:
Now fixing the DARK_SECTIONS pin in parity-220 (array form, not template):
Comment-literal vs pin conflicts. Fixing each — first check the remaining expenses sites:
All 46 pins GREEN. Running the full unit suite for regressions:
The new background-flip comment pushed content beyond the test's fixed 2000-char window. Updating the pin (legitimate contract refinement, same commit):
Unit suite GREEN: 924/924 (65 files, +55 checks). Running lint + typecheck + build:
Pre-existing Turbopack warnings (upload route, unchanged this session). Build green. Running smoke + e2e:
E2E GREEN: 107/107 (+8 dark legs). Full offline gate green. Now census + audit + the parity drift gates (dark-mode surfaces changed this round):
Desktop sweep CLEAN. Running the remaining drift-gate legs:
**ALL SIX parity drift gates CLEAN.** Full verification: lint 0/0 · tsc 0 · 924/924 unit · build · smoke 14/14 · 107/107 e2e · 6 drift gates · census MATCH · audit unchanged. Now capturing session-220 screenshots:
Writing the session-220 capture script per the house pattern:
Faces 88-90 committed. Checking the drawer trigger's actual label:
Login rate-limit (10/15min) tripped from repeated capture runs. Restarting the dev server (in-memory bucket) and re-running:
All five capture faces committed with in-DOM assertions. Stopping the server, restoring seed, and doing docs lockstep:
docs-counts GREEN. Now the architecture-pins row lockstep (parity-220 joins the family):
现在进行 AGENTS.md 的行为说明以及 worklog 记录：
Now the README Project Status row and the worklog entry:
Now the worklog entry (Task ID 220) and the plan's execution-history row:
Docs lockstep complete. Final gate re-run and commit preparation:
All green. Creating the atomic commits per the house pattern:
All 4 commits landed. Now the SSH push — reading the runbook first:
Now deploying the paramiko ssh shim (Appendix A) outside the repo:
Dry-run green — auth works, remote at 4c4b0b9 (no drift), push would be 4c4b0b9..c4c5288. Real push:
Session 220 (R-17) is complete and pushed. Summary:

## What was done

**Intake & baseline** — Re-cloned at `4c4b0b9`, rebuilt the environment (bun install, `.env` from `.env.example` with `DATABASE_URL="file:../db/custom.db"`, db:push + seed — census MATCH). Cold-baseline gates reproduced the documented v2.16.0 state exactly: lint 0/0 · tsc 0 · 869/869 unit · build · smoke 14/14 · 99/99 e2e · `bun audit` unchanged.

**Reference check** — The drift probe confirmed the live Base44 reference **STABLE on all four standing layers** (bundle fingerprint, demo census, desktop nav, TRUE-390 mobile menu — opens, 9 destinations). No parity event; the mobile drawer was re-verified live at 390×844 in the captures.

**Audit** — Three parallel Mode-C passes → **0 Critical / 1 High / 5 Medium / 10 Low / 12 Informational**, every material claim re-verified at file:line. The headline (live-reproduced under `TZ=America/New_York`): the session-219 `toDate()` analytics cure was a **verified no-op** — the pattern matched only the stored `.000Z` form while the analytics refs pass bare `yyyy-mm-dd` date-input values, so 1st-of-month buckets keyed the prior month and rows dropped from every series west of UTC.

**R-17 shipped (TDD, 55 new checks all born RED)** — the bare-form date-seam cure; a pure `stageCsvDate` import seam (+ skipped-row surfacing); ~14 dark-arm contrast completions; the `--color-background` dark flip (F-217c trap class) with the settings-thumb coordination; the writes bucket on **all 14 mutating handlers** (was 6); error-page focus rings; toast dismiss ink; theme-mirror agreement on invalid values; the `accountId` clear contract; store `UNAUTHORIZED` code plumbing; forgot-password honest 503s; the refreshAll sequence guard; dark a11y legs on all 9 sections; register hygiene.

**Verification** — Full gate: lint 0/0 · tsc 0 · **924/924 unit** · build · smoke 14/14 · **107/107 e2e** · census MATCH · **all six parity drift gates CLEAN** (no baseline re-derivation needed). Five screenshot faces (88–92) committed to `docs/screenshots/`, each asserted in-DOM.

**Delivery** — Docs lockstep (plan → v2.17.0, worklog, README/AGENTS/CLAUDE/PAD/SKILL + the docs-counts constants), 4 atomic Conventional Commits on **main**, pushed via the SSH wrapper — remote verified at `c4c5288`, key shredded.
