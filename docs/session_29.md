I'll continue with the wealth-os remediation task. Let me start by checking the workspace state and setting up the repository.
The repo exists. Let me refresh it with git pull and check its status.
Pulled latest — `docs/session_27.md` is new. Now let me set up a task list and read the core documents.
Now let me read README.md and Project_Architecture_Document.md.
The PAD is large. Let me read the most recent sections and the wealth-os_SKILL.md.
Session 27 (repo session 222, R-19) is complete and pushed. Now let me read the worklog head and the remediation plan's current state.
I now have a clear picture: the repo is at v2.19.0 (session 222/R-19 shipped, all pushed, no open R-items). This session continues the standing directive. Let me read the skills catalog and check the environment state.
The environment persisted from the previous session (node_modules, .env, db, generated prisma client all intact). Let me verify the state: .env parity, census, and check git state.
Census MATCH. Now running the cold-baseline gate (the house pattern — before any edit): lint → typecheck → test.
1005/1005 unit tests green. Now the build + smoke:
Smoke 14/14. Now the e2e suite:
**Full cold-baseline gate GREEN**: lint 0/0 · tsc 0 · 1005/1005 unit · build · smoke 14/14 · 110/110 e2e · census MATCH — exactly the documented v2.19.0 state. Now the security re-triage and the reference drift probe:
Audit unchanged (1 moderate minimatch, dev-chain — the standing ledger). Now the reference drift probe:
**Reference STABLE on all four layers** — no parity event. Now the fresh-eyes audit (the house pattern: three parallel Mode-C passes). First, let me scope the R-19 diff:
Full R-19 diff scoped. Now dispatching three parallel Mode-C audit passes (the house pattern):
All three audit passes are back with substantive findings. Now the house pattern: re-verify every material claim at file:line before it enters the ledger. Let me adjudicate the headline findings:
**Key adjudication**: Pass B's "Critical/High" (in-app reset/OTP delivery) are re-discoveries of **F-217m** — already recorded at line 412 as the owner-decision item (rejected for this round with documented rationale: the demo/e2e flows depend on it). Not re-entered as new findings. But the other findings need verification. Let me verify the headline claims:
Both bare Tooltip sites confirmed. Now the sidebar Sign Out dead code and the remaining ring sites:
The dead `signOut` is confirmed. Let me verify the impact claim (infinite loading gate) by checking the store's logout and the app-shell's hydration gating:
The bug mechanics are confirmed. Let me verify the mobile drawer's logout works (contrast) and the remaining ring sites:
Now let me verify the csv time-suffix bypass live and check the remaining sites (income tiles, import alert, logout route):
Both csv findings confirmed live (TZ-independent). Now the remaining verification sites:
All contrast claims verified. Now the key adjudication — the H-2 gradient family vs the sanctioned parity register. Let me read the a11y spec's deviation register:
The gradient-ink family is explicitly sanctioned in the a11y register ("the reference's own palette", F-219b) — parity-mandated, not a defect. Let me verify the last code sites (expenses tiles, accounts alpha approach, pin locations):
All pin sites verified. Let me check the verify route ladder and the csv test structure, then assemble the remediation plan:
Let me check whether the pastel-tile finding is the recorded F-218k residual, and look at INVESTMENT_TYPES + the pill consumers:
All adjudication complete. Let me check the auth tokenVersion machinery and verify message helpers for the two Low cures:
The e2e patterns are clear. Now let me write the remediation plan v2.20.0. First, check the ledger format and where R-20 goes:
Now writing the remediation plan v2.20.0. First the header:
Now I need to remove the old v2.18.0 previous-version block (the chain keeps only current + previous):
Good — the file keeps the full previous-version chain, so the edit is correct as-is. Now the F-223 ledger rows:
Let me check a possible typo I introduced in the F-222p row (OWSP vs OWASP):
I introduced an "OWSP" typo — fixing it now:
Typo fixed. Now the R-20 section after R-19:
The plan v2.20.0 is in place. Now executing R-20 with TDD — first the RED pins. Let me study the existing pin styles:
Now writing the RED pins. First the csv extensions (F-223d/e):
正确的红灯状态（2 个失败 —— F-223d 滚动防护 + F-223e 仅月份拒绝）。现在处理 parity-223 源码 pins。让我先研究一下 parity-222 的结构：
Now let me check the isDark hook pattern in the pages before writing pins:
dashboard/income/investments have isDark; expenses needs the hook. Now writing the parity-223 RED pins:
17 RED / 2 GREEN — the correct RED state. Now the desktop sign-out e2e leg:
All pins are RED. Now the cures. **Cure 1 — F-223a (the dead signout):**
**Cure 2 — F-223b (the dark-arm regression):**
Now recalibrate the parity-222 pin for F-223b (line 102):
**Cure 3 — F-223c (the two missed donut Tooltips).** Let me read the sibling form first:
**Cure 4 — F-223d/e (the csv guard completion):**
CSV 41/41 GREEN. **Cure 5 — F-223f (the desktop synced pill):**
Now update the shell-parity pin (the legitimate contract change):
**Cure 6 — F-223g (the investments chip dark ink):**
Now the investments page chip selection:
Let me refine the fallbacks (the original had a `#57534e` fallback for unknown types):
**Cure 7 — F-223h (the focus-ring tail):**
Now the two pin recalibrations for the ring changes:
**Cure 8 — F-223i (the pastel tiles).** First check the expenses page imports:
Now the income page tile:
**Cures 9-11 — F-223j (import alert), F-223k (logout revocation), F-223l (verify message):**
I accidentally dropped the `{error}` child — fixing immediately:
Now F-223k — the logout revocation. Let me check the reset-password route's bump pattern first:
The docblock now says "no DB write" — stale. Let me fix it and add error handling:
**Critical check needed**: the tokenVersion bump could poison the shared e2e storageState cookie. Let me verify the Playwright setup:
`workers: 1` with a static shared storageState — the tokenVersion bump would poison every test after the sign-out legs. Let me check how auth.setup.ts mints the state:
The fix: the sign-out legs must re-authenticate and refresh the shared state file. Let me count current e2e logins against the 10/IP/15min budget:
~7 logins on the real-IP bucket (limit 10) — my 2 re-auths fit. Now update both sign-out legs to re-mint the shared state after the F-223k eviction:
Now **F-223l** — the verify route message unification:
Let me check whether any tests pin the old verify message behavior:
All imports valid. Now typecheck + lint, then the full unit suite:
The income page's isDark lives in a different component scope. Let me check the structure:
The income page never had isDark (my earlier grep output was conflated). Adding the import + hook:
Clean. Now the full unit suite:
Classic pin-construction collision — my comment contains the literal the pin bans (the known F-220 lesson). Rewording:
Now fix the MOBILE_HEADER pin (its anchor hits my new comment first):
**Unit 1029/1029 GREEN** (+24 checks, +1 file). Now build + smoke + the full e2e:
The 2 warnings are the documented pre-existing Turbopack tracing heuristics (upload/route.ts, untouched this round). Now smoke:
**E2E 111/111 GREEN** (+1 — the new desktop sign-out leg). Let me confirm the new legs explicitly, then run census:
Both sign-out legs green; census MATCH. Now the six parity drift gates (perceivable surfaces changed). Let me check the gate:full script composition:
**All six parity drift gates CLEAN** (0-event margin, no re-derivation needed). Now the capture set for the cured faces. Let me model captures-223 on the house pattern:
Let me see how captures-222 hovered the chart tooltip, then check the dev server:
Starting the dev server, then writing the capture script:
The selector grabbed the wrong span (the brand). Fixing to target the "Synced" pill:
The programmatic `.focus()` doesn't trigger `:focus-visible` — needs real keyboard navigation. Fixing with Shift+Tab from the input:
The dev server's in-memory login bucket (10/15min) is exhausted from the capture re-runs. Restarting the dev server clears it (the documented N-69a behavior):
All 8 capture faces committed (103-110). Now the docs lockstep. First, the docs-counts contract:
Updating the docs-counts constants, then letting the pins drive every doc site:
The pins enumerate every stale site. Updating CLAUDE.md:
Now README.md:
Now the README status row (the R-20 summary):
Now AGENTS.md counts + the new gotcha:
Now wealth-os_SKILL.md count sites:
Now the PAD count sites + the v2.20.0 revision block:
docs-counts GREEN. Now the PAD v2.20.0 revision block:
Now close the plan — R-20 → Done, the §5 execution row, and the closing pointer:
Now the §5 execution history row and the closing pointer:
The v2.20.0 row landed in the wrong position, and I notice v2.19/v2.18 were already swapped in the file. Let me fix the ordering:
Now the worklog entry and the session record:
Worklog intact. Now docs/session_28.md (the session record):
Now the final full gate before commit:
**FULL GATE EXIT 0.** Now the atomic commits — let me check the house grouping from session 222:
House grouping confirmed. Let me stage and commit (fix → screenshots → docs lockstep → session log):
All 4 atomic commits landed. Now the SSH push — reading the runbook first:
I have the full runbook. Let me check for the existing shim deployment (the workspace survived the recycle):
The shim survives from the previous session. Now materialize the key and verify it:
Dry-run green — remote at `e873beb`, push range `e873beb..ab58ec0`. Executing the real push:
**Session 223 (R-20) complete and pushed** — remote verified at `ab58ec0` == local HEAD, key shredded. Cleaning up the dev server and closing out the task list:
**会话 223（R-20 轮次）已完成并推送** — 远端 `main` 已验证至 `ab58ec0`，密钥已销毁。

**本轮成果**：
- **基线**：冷启动门控在 v2.19.0 状态全绿（1005 单元 · 110 e2e · 冒烟 14/14）；参考站在全部四层 STABLE（TRUE-390 移动端菜单开启、9 个目的地 — 常设关注点再次实测通过）
- **审计**（3 路并行 Mode-C，逐条 file:line 复核）：**2 High / 6 Medium / 4 Low**；两项最高安全评级裁定为 F-217m 既有 owner-decision 记录的再发现，未重开
- **R-20 已交付（TDD，+24 单元 pin，+1 e2e leg）**：桌面端 Sign Out 死锁修复（dead `signOut` 从未被调用 → 无限加载门）；R-19 自己引入的 2.06:1 深色墨水回归；两处漏网的 donut Tooltip；csv 守卫补全（时间后缀滚动日期 + 仅月份形式）；桌面 Synced 徽章 3.49:1；投资类型芯片深色 2.02:1；四枚焦点环补齐；**登出即吊销**（tokenVersion）；verify 消息统一
- **已验证**：完整门控 EXIT 0（**1029 单元 · 111 e2e**）· 六项奇偶漂移门控全部 CLEAN（0-event，无需重导基线）· 普查 MATCH · 8 张截图（103-110）逐张断言
- **交付**：计划 v2.20.0 · 文档全同步 · main 分支 4 个原子提交，SSH 包装器推送并验证

下一步：无未结 R-item，下个会话默认按发现驱动迭代。
