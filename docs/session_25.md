The workspace has been reset — I need to clone the repo fresh. Let me set up the task plan and get started.
现在处理那两份长架构文档：
该项目处于 v2.17.0 / 会话 220 状态，没有默认打开的 R-item。本次会话将遵循常规指令。让我查看一下技能目录并配置环境。
Now let me set up the environment and rebuild it (Task 3-4 in progress).
Census MATCH. Now running the cold-baseline gates before any edit:
924/924 unit (65 files) — matches documented state. Now build + smoke:
E2E setup 失败 —— 沙盒重置后已知的 chromium 不匹配。我来检查一下详情：
Full cold-baseline gate GREEN: lint 0/0 · tsc 0 · 924/924 unit · build · smoke 14/14 · 107/107 e2e · census MATCH — the documented v2.17.0 state exactly. Now the security ledger re-triage:
Audit unchanged (1 moderate minimatch, dev-chain — the documented standing state). Now the reference-stability drift probe:
Reference STABLE on all four standing layers — no parity event. Now dispatching the fresh-eyes audit (Mode C, three parallel passes per the house pattern):
三次审计均已返回。综合结果：**0 严重 / 2 高 / 4 中 / ~12 低 / ~10 信息**（已去重）。根据内部铁律，在将每个重大发现纳入计划之前，我都会在 `file:line` 处对其进行验证。现在开始核实：
H-1a/M-2a 已实时复现 —— 确认存在日期损坏类 bug。现在开始验证其他发现：
All material findings verified at file:line. Let me verify the remaining Low-tier sites:
所有发现已验证。现在让我研究 test-pin 系列模式，以便在编写计划之前正确设计 R-18 轮次：
所有模式均已理解。现在开始编写补救计划 v2.18.0（F-221 发现记录 + R-18 计划）。让我先检查一下计划的结构以确定插入点：
Now writing the plan v2.18.0 — the header, F-221 findings ledger, and R-18 section:
Header updated. Now adding the F-221 findings ledger rows:
Ledger rows in. Now adding the R-18 section after R-17:
R-18 计划已提交。现在开始执行 TDD —— 首先是固定内容（红色）。让我研究一下现有的固定模式：
现在正在为日期分段修复（F-221a/c）编写 RED pins：
RED confirmed — 3 failing pins matching the live-reproduced defects exactly. Now the remaining RED pins. First, study the test files:
现在进行 `auth-reset` read-path pin：
现在，在编写 null-clear pin 之前，让我先验证一下这些字段的确切 schema 形状：
Schema 语义已明确。现在让我分批读取所有剩余的修复点，以便编写精确的 pins：
我已掌握所有上下文。现在正在编写 parity-221 引脚文件（RED）：
所有 31 个 pin 均处于 RED 状态。现在执行修复。**修复 A — `stageCsvDate` 表单分支 (F-221a/c)：**
CSV 修复 GREEN (20/20)。**修复 B — SelectItem 深色手臂 (F-221b)：**
**Cure C — the null-clear rider on the seven page forms (F-221d):**
接下来是投资、目标和账户表单：
**Cure D — Export button ink + remaining ink family (F-221e, k, l, m, n):**
Now DIALOG_CLOSE, toast icons, switch track:
**Cure E — the low tail.** Reset-password read path (F-221g):
Now the shares cap (F-221h) and ExpenseDialog labels (F-221j):
现在是重置提交等待 (F-221o) 以及 OS-flip auth-face gate (F-221p)：
已导入。现在开始这四个页面中卡片层级的 busy-disable (F-221q)：
接下来是账户和投资：
现在处理登出 bucket (F-221r)、导出完整性 (F-221s) 以及 hygiene 尾部 (F-221t)：
现在处理 hygiene tail (F-221t)。让我查看一下相关站点：
Now the boot-env warning, import skip counter, tabs underline arm, and health docblock:
所有源代码修复已完成。现在正在修复 parity-221 pin，使其与账户 busy-prop 形式精确匹配：
现在进行 e2e 扩展。首先是 a11y scrollThrough 辅助函数 (F-221f)：
`<main>` 是滚动容器。添加 scrollThrough 辅助函数，并将其应用到所有三个循环中：
现在进行 multi-user [id] e2e 测试项 (F-221i)：
现在是 wealthos.spec.ts 中的深色 Select 高亮部分：
All cures written. Running the full pin suite to verify GREEN:
Three comment-literal vs pin collisions (the known F-220 lesson). Fixing the comments and the income pin:
All pins GREEN. Running the full unit suite for regressions:
需要两个 in-commit 的 pin 优化（此轮的修复已合理更改了这些合约）。正在使用该原则更新它们：
Unit suite GREEN: 961/961 (66 files, +37). Now lint + typecheck + build:
All green. Now smoke + e2e:
Playwright 的 `APIResponse.status` 是一个方法。正在修复：
E2E GREEN：108/108。完整离线门控为绿色（lint 0/0 · tsc 0 · 961 单元 · build · smoke 14/14 · 108 e2e）。现在，由于可感知表面已发生变化，将执行六个奇偶校验漂移门控：
All six drift gates CLEAN. Now the session-221 captures — studying the house capture pattern first:
Now writing the session-221 capture script. Let me check the expenses edit flow first:
在运行前，根据实际的应用结构验证捕获脚本的假设：
正在修复 capture script 的 selectors 以匹配实际应用：
Now booting a fresh dev server and running the captures:
面 93–96 已提交。面 97 需要一个已暂停的目标 —— 正在检查种子数据：
The cure landed — the badge computes stone-600 (#57534e = rgb(87,83,78)); my expected constant was wrong. Fixing:
The known login-bucket trip from repeated capture runs (session-220's exact experience). Restarting the dev server to clear the in-memory bucket:
All five faces committed. Now stopping the server, restoring the seed, and doing docs lockstep:
现在进行文档同步。首先更新 docs-counts 常量：
现在更新各文档集中的所有实时时态计数点：
docs-counts 已通过（GREEN）。现在是 README 中的 Project Status 行、PAD 修订块以及 AGENTS 中的注意事项（gotchas）：
我引入了一个悬空的占位行，损坏了 v2.16.0 条目。让我检查一下 git diff 并进行妥善修复：
原始 PAD 没有 v2.17.0 条目（会话 220 仅更新了计数）。正在恢复已损坏的 v2.16.0 标题：
现在处理 AGENTS.md 中的注意事项——扩展日期格式（date-form）相关的注意事项，并添加 `a11y-scroll` 课程：
Now the worklog entry (Task ID 221):
接下来是该计划的第 5 节执行历史行及尾部指针：
计划已更新。正在进行 docs lockstep 的最终验证：
全部通过。现在运行完整的 pre-push gate 进行最终验证：
完整 GATE EXIT 0。现在正在创建原子提交。首先检查 `house commit` 的分组：
模式已确认。正在按既定分组创建三个原子提交：
三个提交已合并到 main 分支。现在开始 SSH 推送 —— 优先阅读运行手册：
Runbook understood. Deploying the paramiko shim and setting up the push:
试运行通过 — 远程仓库位于 1ad3ec3，推送内容为 1ad3ec3..3dc23ba。正在执行正式推送：
Session 221 (R-18) 已完成并推送。以下是总结：

## 已完成的工作

**接收与基线** — 在 `1ad3ec3` 重新克隆；完整审阅了文档集；重建了环境（`bun install`, `.env` 配合 `DATABASE_URL="file:../db/custom.db"`, db:push + seed — census 匹配）。冷基线门控准确重现了文档中记录的 v2.17.0 状态：lint 0/0 · tsc 0 · 924/924 unit · build · smoke 14/14 · 107/107 e2e。

**参考检查** — 对所有四个层级的漂移探测结果为稳定（STABLE）（bundle fingerprint, demo census, desktop nav, TRUE-390 mobile menu — 可正常打开，包含 9 个目标）。无一致性事件；R-16/R-17 基线保持不变。

**审计** — 三个并行的 Mode-C 通过（R-17 cure surfaces · API/auth/security · UI/a11y/shell）：**0 Critical / 2 High / 4 Medium / ~12 Low / ~10 Informational**，每个实质性声明均已在 file:line 处重新验证。核心问题已**实时重现**：R-17 的 `stageCsvDate` seam 重新引入了它原本要修复的 bug 类 — 在 UTC 以西，纯 `yyyy-mm-dd` 的 CSV 单元格会提前一天暂存（纽约时间 "2026-11-01" → 10-31），而在 UTC 以东，Z-form 会延后一天（东京时间年份边界 → 2027-01-01）。

**R-18 已发布（TDD，31+ pins 出生时为 RED）** — date-staging FORM-BRANCH + TZ-switching pins；SelectItem 深色聚焦 wash（实测为 1.18:1 → 13.9:1）；Settings Export 墨迹（3.38:1 → 白色）；a11y two-gate 现在在 `axe.run()` 之前会进行滚动（below-the-fold 盲区，实时 A/B 验证）；针对 7 个页面表单的 null-clear rider；低优先级尾部（reset-password 读取 503s、shares 上限、跨用户 `[id]` e2e 测试、标签、墨迹系列、忙碌禁用、logout bucket、导出设置/`photoUrl`/`createdAt`、清理尾部）。

**验证** — 完整门控：lint 0/0 · tsc 0 · **961/961 unit** · build · smoke 14/14 · **108/108 e2e** · **所有六个对等漂移门控（parity drift gates）均正常（CLEAN）** · census 匹配 · audit 无变化。已提交五个截图面 (93–97)，每个都在 DOM 中进行了断言。

**交付** — 文档同步（plan → v2.18.0，worklog，README/AGENTS/CLAUDE/PAD/SKILL + docs-counts），在 **main** 上进行了 3 次原子提交，通过 SSH wrapper 推送 — 远程已在 `3dc23ba` 验证，密钥已销毁。
