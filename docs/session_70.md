我将开始执行这项多阶段任务。让我先制定一个 TODO 计划，并从第一阶段：工作空间刷新开始。
Repository cloned successfully — on `main`, up to date with origin. Now Phase 2: reviewing the core documentation.
Now let me read CLAUDE.md and the Project Architecture Document.
Now let me review the session status documents — session_67.md, session_68.md, and the latest worklog entries.
Session 67/68 describe repo session 242 (R-39) shipped as faf229c. Let me check the worklog and remediation plan's current state.
Core docs reviewed. Now validating understanding against the codebase and starting environment setup (long-running).
`bun install` will take a while. Let me start it in the background and review the skills catalog in parallel.
While install runs, let me clone the neo-crm reference repo and inspect key config files.
neo-crm HEAD is b3d0fbe — unchanged from what session 242 recorded (nothing to port). Let me validate key config files.
The background install died silently. Re-running in foreground to see the error.
Database seeded, census MATCH. Now installing chromium for e2e and starting the cold baseline gate.
Lint 0/0 GREEN. Now typecheck + unit tests.
1539/1539 unit (92 files) — matches v2.39.0 ship state. Now the build.
Smoke 15/15 PASS (leg 12 confirms SEO surface: sitemap + robots + manifest 200). Checking chromium install for e2e.
Background processes get killed in this sandbox. Running chromium install in foreground.
**COLD BASELINE GATE GREEN** — v2.39.0 ship state reproduced exactly: lint 0/0 · tsc 0 · 1539 unit (92 files) · build · smoke 15/15 · 150 e2e · census MATCH.

Now the standing asks: reference probe + bun audit.
All standing checks verified: **probe:ref STABLE** (bundle md5 unchanged, TRUE-390 mobile menu opens with 9 links), **bun audit unchanged** (1 moderate dev-chain, documented deferral).

Now dispatching the fresh-eyes audit as three parallel Mode-C passes (the house convention).
Three-pass audit complete: **0 Critical / 0 High / 1 Medium / 5 Low / 5 Informational** NEW after dedup. Now, per the house convention, I must verify every material claim at file:line myself before planning.
B1 verified at logout/route.ts:43 — the `writes:` burn precedes the session read (line 55). Let me verify clientKey and the other findings.
B1 fully verified — the poisoning path is real. Verifying the remaining findings.
A2 verified: 14 its vs the v2.39.0 block's "13/13" claim (worklog says 14/14). Verifying B2, C1, C2, C3.
All key findings verified at file:line. Let me check the session-file convention and remaining details before planning.
All findings verified. Now let me check a few final details before writing the remediation plan.
Precedents confirmed. Final validation greps before writing the plan.
所有引脚均兼容。现在开始将 R-40 救改计划写入账本。首先，检查插入锚点。
Let me examine a capital-route bridge file to confirm the widened scanners will stay green.
All bridges clean. Now writing the remediation plan v2.40.0 into the ledger via the house assert-each-insertion script convention.
Plan v2.40.0 written. Now validating it against the codebase — checking the house pin style first.
Now **R-40.1 — the pins born RED**. Writing tests/parity-243.test.ts following the house style.
One false green caught (the F-239e authoring lesson): `indexOf("getSessionUser")` matches the IMPORT, not the call site. Fixing the pin.
**HONEST RED: 11** + 2 green-by-design regression guards. Now **R-40.2 — the cures**. Starting with the flagship: the logout writes-bucket cure.
Logout cure applied. Now F-243b: the PAD truth fix + the docs-counts guard advance.
Guard advanced. Now F-243c: the three OTP docblock truths.
Now F-243d (scanner filters), F-243e (aria-label), F-243f (export drop), F-243g (globals prose).
The duplicated comment text is confusing — fixing it to describe readStoredTheme accurately.
All cures applied. Running the parity-243 battery for the GREEN proof.
One pin defect in my own authoring (a sloppy regex — the F-239e lesson again). Fixing it.
All 13 pins GREEN. Now the full unit suite + lint + typecheck.
**1552 unit (93 files, +13)**. Now build + smoke + e2e.
Full gate GREEN: lint 0/0 · tsc 0 · 1552 unit (93 files) · build · smoke 15/15 · 150 e2e. Now the six parity drift gates.
**ALL SIX drift gates CLEAN** + census MATCH. Now the captures. Reading the captures-242 convention to mirror it.
Now writing captures-243.ts. First checking the expense-creation flow used by e2e.
All four captures verified with census tripwire MATCH. Quick pixel verification, then the docs lockstep.
所有捕获已验证。现在进行**文档同步** —— 首先枚举实时的计数点。
Inventory complete. Writing the scoped docs-lockstep script (the F-242j discipline: per-site asserts, historical blocks untouched).
The guard assertion itself was wrong (line-wrap: "The" and "verification:" span lines in the raw text). The swaps completed before it. Verifying state and fixing the guard.
The v2.39.0 block is intact (my guard checked the wrong raw form — "The" wraps to the previous line). Fixing the guard for the committed script, then verifying.
docs-counts 14/14 GREEN. Now the PAD v2.40.0 revision block and the remaining docs.
Now the plan's R-40 → Done + §5 execution row, the README program row, and the AGENTS gotcha.
The README program row follows the "describe the latest round" convention. Rewriting it for R-40.
Now the worklog Task 243 entry and the session record (docs/session_69.md).
Session record written. Now the **FINAL full gate** before commit.
Build exit 0 (earlier "1" was grep's no-match code). Final e2e:
**FINAL GATE GREEN**: lint 0/0 · tsc 0 · 1552 unit (93 files) · build · smoke 15/15 · 150 e2e. Now the commit + push. First, the runbook.
Runbook internalized. First: check the tree state and commit.
Tree is clean (env/dbs/logs all ignored). Committing.
Commit `d128ee2` on main, tree clean. Now deploying the paramiko shim and pushing via the wrapper.
Dry-run green — remote at ddf2396, fast-forward to d128ee2 approved. The real push:
All verified: key shredded, shim removed, remote ref `d128ee2` == local HEAD (re-confirmed over HTTPS), tree clean, main-only. Final checks on the user's named deliverables:
**Session 243 (R-40) 已完成并推送** — commit `d128ee2` 到 `main` 分支，远程引用已验证 == 本地 HEAD（通过 HTTPS 重新确认），deploy key 已销毁，未创建任何分支。

## 已交付的内容

**验收与常规要求** — 在 HEAD `ddf2396` 处全新克隆，冷基准测试 **GREEN**（准确复现了 v2.39.0 的交付状态：lint 0/0 · tsc 0 · 1539 unit · build · smoke 15/15 · 150 e2e · census MATCH）。参考网站在每一层都保持 **STABLE**，包括 **TRUE-390 移动端菜单成功打开并显示 9 个目标链接**；Tailwind v4 准则已清理；`bun audit` 无变化；neo-crm 无变化（b3d0fbe）；SEO surface 绿色；`.env` / `DATABASE_URL="file:../db/custom.db"` / db-at-root / vitest+playwright configs / `.env.example` 全部保持现状。

**全新视角审计**（三次 Mode-C 检查，每个结论均在 file:line 处重新验证）— **0 Critical / 0 High / 1 Medium / 5 Low / 5 Informational** 个 NEW；所有八个 R-39 修复表面均保持有效。

**R-40 TDD 执行（11 个真实的 RED 证明）** — 重点项目：**登出写入存储桶中毒修复**（这是唯一一个在会话读取前消耗其共享 `writes:` 存储桶的写入族路由 — 无 cookie 的 JSON 调用者可能会导致每个用户的 CRUD 操作受到速率限制；现在该消耗操作已随已登录路径进行，**已通过 70 次请求的齐射 canary 实时证明**）。此外：F-242j 防护推进（现在锁定了三个最近的 PAD 块 + 14/14 真相），三个 OTP docblock 真相，扫描器 jsx 补全（9 个桥接加入两次扫描），导入 dropzone **WCAG 2.5.3 label-in-name 修复**，以及两次卫生清理修复。

**验证** — lint 0/0 · tsc 0 · **1552 unit (93 files, +13)** · build · smoke 15/15 · **150 e2e** · **所有六个奇偶校验漂移门 CLEAN**（配额未移动）· census MATCH · 捕获数据 **174-177** 已进行 PNG 验证。文档保持同步（README, AGENTS +2 gotchas, CLAUDE, PAD v2.40.0, SKILL, plan closed, worklog, `docs/session_69.md`）。

**已记录，尚未修复**：F-242i（应用内投递生产默认值 — 由您决定），F-242h，以及新的 F-243h/i/j 惰性/信息性系列。要继续此节奏，请重新发送常规指令。
