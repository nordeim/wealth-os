I'll continue this comprehensive engineering task on the wealth-os codebase. Let me set up the task plan and begin with Phase 1: workspace refresh.
仓库已克隆——我可以看到 `db/`、`tests/`、`vitest.config.ts` 和 `playwright.config.ts` 的先前工作，以及最新提交中的 R-38 一致性轮次。现在进入第二阶段：审查核心文档。
The project is at a mature state (R-38 shipped). Let me read the full AGENTS.md and other core docs:
Now let me read CLAUDE.md and the session status documents:
Session 66 = repo session 241 (R-38), pushed as ae773a6. This session will be repo session 242 / R-39. Let me review the remediation plan's key sections and worklog:
I now have the full picture: the repo is at v2.38.0 (session 241 / R-38, commit ae773a6). This session will be repo session 242 / R-39 following the established rhythm. Let me start environment setup (long-running) and review the skills catalog in parallel:
Install complete (594 packages). Setting up the environment (.env with fresh AUTH_SECRET, db push/seed, census):
Census MATCH (79/4/3/6/5/7, users=1). Now installing chromium and starting the cold baseline gate:
1519/1519 单元（91 个文件）——与 v2.38.0 一致。现在开始构建：
Build OK (exit 0; the 4 upload-route warnings are the documented known set). Now smoke ladder:
**COLD BASELINE GATE GREEN** — v2.38.0 ship state reproduced exactly: lint 0/0 · tsc 0 · 1519 unit (91 files) · build · smoke 15/15 · 147 e2e · census MATCH. Now the standing asks — reference probe, audit, neo-crm check:
All standing asks verified: **probe:ref STABLE** (bundle md5 unchanged, TRUE-390 mobile menu with 9 links), **audit unchanged** (1 moderate dev-chain minimatch — documented deferral), **neo-crm unchanged** (b3d0fbe — nothing to port). Now dispatching the fresh-eyes audit as three parallel Mode-C passes:
Passes A and B complete. Pass C timed out — retrying with a tighter scope:
三通道审计结果：原始统计 **0 严重 / 0 高危 / 1 中危 / 8 低危 / 11 信息级**（包含每一个 R-38 修复面保持）。B 通道交付了 CSP 源清单（已注册的 F-241g-rider 明确指出这是必需的——现在是 R-39 的核心项目）。根据既定原则，在规划之前，我现在必须在 file:line 验证每一个实质性主张。首先从核心项目开始：
The F-241h registration explicitly says "land with a source inventory the next time the config is touched" — Pass B delivered that inventory. Verifying the remaining material claims:
E2E 在生产环境独立服务器上运行——这非常适合作为新的 CSP pin 的 behavioral pin。让我检查一下 `login-card` 转换细节（`twMerge` 安全性）以及登录布局常量：
All audit claims verified at file:line. Both login-card conversions are twMerge-safe (no conflicting groups). Let me check the parity-229 scanner logic (reword direction safety) and the plan-writing convention from last session:
The parity-229 allowlist direction is safe for rewords (fewer carriers). Let me check the scanner's tokenization heuristic to ensure CSP directive strings won't trip it, and the http-headers pin form:
The scanner only walks `src/` (next.config.ts is outside it), and `font-src` would be class-shaped under src — so the CSP comment stays in next.config.ts only. Let me read the full http-headers pin and the captures convention:
I have the full picture. Now writing the remediation plan v2.39.0 into the ledger, following the house assert-each-insertion convention. First, let me check the exact anchors:
Now let me check the header block structure and the §5 table top to prepare the plan insertion script:
Now writing the plan v2.39.0 into the ledger via the house assert-each-insertion script convention:
Plan v2.39.0 written. Now **R-39.1 — the pins born RED**. Let me study the house pin style first:
现在让我完整阅读 parity-235 F-235k describe 和 http-headers pin，以及我需要重新措辞的精确 globals.css 注释，以便编写精准的 pin：
The audit's carrier list may be incomplete (the F-228b lesson). Let me do the comprehensive grep for backticked class-shaped citations in both files:
已找到全部 6 个引用站点（audit 的列表 + 我在 globals.css:339/350 的发现）。现在让我检查一下分析导出按钮和上传图像界面，以进行 e2e canary 设计：
我已经准备好了。正在写入 `tests/parity-242.test.ts` —— 该测试针对 `pre-cure` 树为 RED 状态：
Now the RED proof against the pre-cure tree:
17 RED — 但 F-242g 的 mismatch-phrase 断言被意外判定为绿色（该短语在 `page-parts.tsx` 中跨行折行 —— 正好是 F-239f 的教训）。正在修复该 pin 以捕获折行形式：
**HONEST RED: 18** (17 source pins + the wrapped-phrase catch) + 1 green-by-design genus guard (the dev eval branch — preserved unchanged). Now the http-headers recalibration (RED until the config cure) and the e2e legs:
Now the e2e legs. Let me check the wealthos.spec.ts structure to place them properly:
Appending the F-242a e2e legs to wealthos.spec.ts:
Now the RED proof for the served-header leg against the current (pre-cure) standalone:
RED 已证实：served-header 测试用例针对 pre-cure build 失败（失败）；两个 coverage 测试用例在初始状态下均通过（显示为绿色）。现在进行 **R-39.2 —— 修复 (cures)**。首先，对 `login-card` 的转换进行实时的 `twMerge` 字节一致性验证：
Byte-identity verified for both sites. Applying the cures — first the flagship CSP pin in next.config.ts:
Now the login-card conversions (F-242e):
Now F-242b — the rate-limit battery cleanup fix:
Let me check what tests follow the battery in the file (state-coupling check):
Battery green (25/25), no state coupling. Now F-242c (retitle) and F-242d (popover docblock truths, three carriers):
Now the two test-file echoes of the popover over-claim:
Now F-242f — the comment truths. Reading the exact sites:
现在处理 page-layout.ts 的引用位置：
Now F-242g — the hydration-rationale truths:
All cures applied. Running the round's test batteries:
4 pin defects — classic F-239e/F-239f authoring lessons (regex-escaping a pin-on-a-test, line-wrap mismatches, case sensitivity). Fixing the pins:
All 157 green. Now the full unit suite + lint + typecheck (checking for pin interactions across the whole battery):
1538/1538 (92 files, +19). Now the rebuild (which bakes the new CSP header) + smoke:
**150/150 e2e** (147 + 3 new legs). Now the direct curl verification of the served header on the standalone (the F-235k protocol), plus the dev-server form:
Served header verified — exact pinned form, strict production. Now the six parity drift gates (the login-card conversion must prove byte-identical on the sweeps):
All six drift gates CLEAN at 0-event margin. Now the captures — reading the captures-241.ts convention to mirror it:
现在正在写入 R-39 捕获面的 captures-242.ts。首先，检查 e2e 测试套件是如何驱动注册验证视图的：
Writing captures-242.ts — the four R-39 faces:
All four captures verified in-DOM, census tripwire MATCH. Quick pixel verification (non-blank check):
All four PNG-verified non-blank. Now the **docs lockstep**. First, the docs-counts pin to find all live-tense count sites:
docs-counts passes at the stale constants — now updating them to the new reality (1538/150/92/1688) and enumerating every live-tense site:
让我检查一下 `PAD` 的 `v2.37.0` 历史块数量与 `git` 历史记录（存在潜在的上一会话文档损坏）：
Found it — session 241's replacement script over-replaced the historical v2.37.0 block (1485→1519). Let me check the full extent of the over-replacement:
The PAD v2.37.0 historical block was corrupted by session 241's script. Let me also verify the v2.36.0 block (it may have the same genus from session 240's pass):
v2.36.0 块中也存在相同的缺陷（会话 240 的脚本：1469→1485）。让我系统地检查所有历史块与计划中权威的 §5 记录：
Exactly two corrupted blocks confirmed (v2.36.0 and v2.37.0 — each corrupted by the following session's lockstep pass). This becomes finding **F-242j**. Now writing the full docs lockstep script with scoped historical-block restoration:
PAD 写入是原子的（在写入前触发了断言）。v2.36.0 代码块使用了不同的折行方式 —— 正在修复该模式：
Run 2 partially completed (sections 1-4 written; PAD failed). Making the script idempotent and re-running:
docs-counts 15/15 GREEN. Now appending the R-39 gotchas to AGENTS.md:
Now adding the F-242j finding (discovered mid-round) to the plan ledger, plus the R-39 section and header amendments:
现在进行工作日志条目和会话记录：
Session record written. Now the **FINAL full gate** before commit:
1540 (expected 1538) — the idempotent re-run duplicated insertions. Checking for duplicates:
1539 is the true intended count (I under-counted by omitting the docs-counts pin itself) and the re-run duplicated the pin. Fixing both:
1539 confirmed. Fixing the count sites (1538→1539, badge 1688→1689) across all docs:
All counts consistent. **FINAL full gate**:
**FINAL GATE GREEN** — lint 0/0 · tsc 0 · 1539 unit (92 files) · build · smoke 15/15 · 150 e2e · census MATCH. Now the commit + push. Reading the SSH wrapper runbook:
Runbook internalized. First, the commit — checking the tree is clean of unwanted files:
Commit `faf229c` on main, tree clean. Deploying the paramiko shim (Appendix A) outside the repo:
Key parses (ed25519). Dry-run — authenticates and negotiates, touches no refs:
Dry-run green — remote at 1b038d7, fast-forward to faf229c approved. The real push:
**PUSHED AND VERIFIED** — remote ref `faf229c` == local HEAD (re-confirmed over HTTPS), key shredded, shim removed, tree clean, main-only.
**Session 242 (R-39) 已完成并推送到 main 分支** —— commit `faf229c`，远程 ref 已验证 == 本地 HEAD（已通过 HTTPS 重新确认），deploy key 已销毁，paramiko shim 已移除，未创建任何分支。

## 已完成的工作

**验收与常规要求** —— 在 HEAD `1b038d7` 处全新克隆并建立绿色冷基线（精确复现了 v2.38.0 的发布状态：lint 0/0 · tsc 0 · 1519 unit · build · smoke 15/15 · 147 e2e · census 匹配）。参考站点在每一层都保持 **稳定 (STABLE)**，包括 **TRUE-390 移动端菜单成功打开并显示 9 个目标链接**（您提到的移动端导航要求）；`bun audit` 无变化；neo-crm 无变化（无需移植的内容）；SEO 页面绿色（sitemap/robots/manifest 为 200）；`.env` `DATABASE_URL="file:../db/custom.db"` 约定、根目录下的 `db/`、vitest/playwright 配置以及 `.env.example` 均已就绪。

**以新视角进行审计**（三次 Mode-C 检查，每个主张均在 file:line 处重新验证）—— 新发现 0 个严重 / 0 个高风险 / 1 个中风险 / 6 个低风险 / 3 个信息类问题；所有 7 个 R-38 修复面均保持有效。

**R-39 TDD 执行（21 个真实的 RED 证明）** —— 旗舰任务是 **CSP fetch-directive 锁定**（关闭了已注册的 F-241h 待办项 —— pass-B 源清单证明了零第三方源消耗，因此所有五个 fetch 指令均锁定为 'self'；已通过 3 个新的 e2e 用例 + 实时 curl 验证）。此外：限流清理修复（watermark-gated no-op）、登录卡片 template-literal 到 `cn()` 的转换（twMerge 字节完全一致）、popover/文档注释/token 的真值修正，以及本轮自身的发现 —— **此前两个会话的计数脚本过度替换了 v2.36.0/v2.37.0 的历史 PAD 块**（已恢复至其原始发布时的计数并加了锁定）。

**验证** —— lint 0/0 · tsc 0 · **1539 unit (92 个文件, +20)** · build · smoke 15/15 · **150 e2e (+3)** · 所有六个奇偶校验漂移门在 0 事件边距处均 **清除 (CLEAN)** · census 匹配 · 捕获的截图 170-173 已进行 PNG 验证。文档保持同步更新（README, AGENTS +3 条注意事项, CLAUDE, PAD v2.39.0, SKILL, 计划已关闭, 工作日志, `docs/session_67.md`）。

**已记录，未修复**：侧边栏品牌标题顺序 (F-242h) 以及应用内交付生产环境的默认值 (F-242i —— 这是需要您决策的项目；已记录升级步骤：在忽略启动警告的生产环境部署中，默认开启状态会升级为账号接管；将其翻转会影响无配置的演示体验，因此这由您来决定）。要继续此节奏，请重新发送常规指令。
