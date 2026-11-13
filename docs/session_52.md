仓库克隆成功。我注意到仓库中已经包含 `db/`、`.env.example`、`vitest.config.ts` 和 `playwright.config.ts` —— 之前的会话已经进行了大量的修复工作。让我制定一个任务计划并开始第一阶段。
Repo 包含到 session_50 的会话日志。现在让我先阅读核心文档（阶段 1）。
AGENTS.md read. Now CLAUDE.md and README.md.
现在让我来阅读会话日志（49、50）——这些日志反映了该项目的近期历史。
The repo is at session-233 ship state (v2.30.0, R-30 done). My session continues the rhythm as session 234. Let me read the worklog top and the remediation plan status.
现在让我查看整改计划结构以及待发现项的当前状态。
我已完全掌握了这个成熟代码仓库的情况。我的会话（234）延续了既定的节奏。现在让我开始环境配置 —— 先检查工具链并开始安装。
While install runs, let me review the PAD and skills catalog.
The skill's §9 selector rule connects directly to the recorded F-232j finding (whole-store subscription at 14 sites — "a dedicated round"). Let me check install progress and continue environment intake.
Install died during prisma generate. Let me re-run it in the foreground to see the error.
Install complete, prisma client generated. Now set up `.env` and the database.
Wait — the census reports the db at `/home/z/my-project/db/custom.db`, not the repo root. Bun picked up the sandbox's own `.env` (parent dir walk). Let me investigate.
The sandbox's own `/home/z/my-project/.env` (pre-existing, absolute DATABASE_URL) is hijacking the repo's db path. Let me read the db-path seam to understand the resolution order.
Confirmed: the sandbox shell exports `DATABASE_URL=file:/home/z/my-project/db/custom.db` — a real env var that wins over the repo `.env` (dotenv semantics). The seam honors it as an intentional override. Let me prove the repo-root contract still resolves correctly without the interference.
The seam works correctly — with the shell var unset it resolves to the repo-root db (empty, hence the table errors). The sandbox's exported `DATABASE_URL` is honored as an intentional override by design, and all default runs are self-consistent at the sandbox-root db (census MATCH). Let me clean up my probe artifact and start the cold baseline gate.
Lint 0/0, tsc 0. Now the unit suite.
1282/1282 unit green (81 files) — exactly the v2.30.0 ship state. Now the build.
Smoke 15/15 (SEO surface verified at leg 12). Now check chromium and run e2e.
The e2e needs chromium-1254 (cache has 1200). Installing per the standing intake.
**Cold baseline gate GREEN at HEAD 7fccaab** — the v2.30.0 ship state reproduced exactly: lint 0/0 · tsc 0 · 1282/1282 unit · build · smoke 15/15 · 140/140 e2e. Now the standing asks: `bun audit` and the reference stability probe.
`bun audit` unchanged (1 moderate dev-chain minimatch — the documented deferral). Now the reference stability probe.
Reference STABLE on all layers — including the TRUE-390 mobile menu with 9 destination links (the standing operator ask). Now the neo-crm upstream check.
neo-crm upstream unchanged (b3d0fbe) — nothing to port. Let me verify the remaining config asks concretely (vitest/playwright configs, sitemap, SEO surface).
All standing asks verified. Now Phase 2 — the fresh-eyes audit. Let me first verify the R-30 cure surfaces hold, then run the three Mode-C passes.
All nine R-30 pinned cures verified holding at file:line. Now the three fresh-eyes Mode-C audit passes (findings only, no fixes) — launched in parallel.
三次审计完成：**0 严重 / 0 高 / 0 中 / 6 低 / 8 提示性** 原始结果。现在进入驱动会话规范——在编写计划之前，核实每个重要声明在 file:line 处的情况。
A-1 and A-2 verified at file:line. Let me verify the A-3 seam behavior against existing test pins, and B-1/L-1/I-2/I-3.
A-3 fix rule (`digits.length === box count` → restart at 0) breaks none of the five existing paste pins. Verifying the remaining claims.
All 14 material claims verified at file:line. Now let me study the cure-design dependencies — the store's settings lifecycle, the logout route, and the e2e verify legs.
Now let me check the pin patterns that touch the files I'll edit (the F-229d discipline — no pin may break silently).
All pins survive the planned cures. I have the complete validated picture — now writing the plan v2.31.0.
All design dependencies validated. Writing the plan v2.31.0 now — header version block first.
Header updated. Now trim the oldest previous-version block (v2.23.0) to keep the chain at 8.
The convention keeps the full chain — no trim needed. Now the F-234 ledger rows in §2.
Ledger rows landed. Now the R-31 section before §5.
Plan written. Now the TDD execution — R-31.1, the pins born RED. Let me check the test helpers first.
Now writing the RED pins — first the verification-code behavioral units for F-234c.
Now the parity-234 source pins file (born RED over the pre-cure tree).
**19 RED + 11 green** (10 pre-existing battery + 1 green-by-design boundary guard) — the honest shape. Now the cures (R-31.2). First F-234c, the seam.
Cure 2: F-234a — the store tri-state.
Now the settings page reason-line (F-234a page side) and the budget Add guard (F-234f).
Now wire the `busyAdd` state declaration and the set calls.
Note: the `const onthlyReports` display artifact is the known bash ANSI-scrubber quirk (eats `[m` pairs) — tsc passed at baseline so the file bytes are fine. Adding the busyAdd state and set calls.
Cure 3: F-234b — the import parse sequence guard.
The nested try structure needs review — my outer try may be unclosed. Let me inspect.
The outer try is unclosed and the early-return branches would strand `parsing=true`. Restructuring to a single flat try.
Structure is clean now. Quick syntax verification, then the remaining cures.
Now cures 4-7: F-234e (uploads guard), F-234g (logout gate), F-234h (glyph), F-234i (class string).
Now F-234j — the dead-export retirements.
Now F-234d (the e2e paste leg) + F-234k (comment rewords) in auth.spec.ts.
Now the second comment reword (the F-218a leg).
Now the two same-commit parity-233 pin recalibrations.
The F-233d recalibration landed; the F-233e one needs its exact description. Fixing.
All cures and recalibrations are in. Now verify the new pins turn GREEN.
The pin regex expected post-increment; the cure uses pre-increment. Fixing the pin.
17/17 GREEN, lint clean. Now the full unit suite to surface interactions.
Two interactions: the parity-217 hydrate pin (needs same-commit recalibration) and — the recursive F-229d genus caught by the whole-tree invariant — my own comment coined the class-shaped "from-edited-box". Rewording per the discipline.
**1302/1302 unit green (82 files)** — the recursive genus caught and cured. Now tsc + lint, then the e2e RED proof via stash round-trip.
**Honest RED confirmed** — the rotated distribution at the pre-cure build (Digit 2 holds the wrong digit). Restoring the cure and verifying GREEN.
Stash round-trip complete: RED at pre-cure, GREEN at cure. Now the full e2e suite.
Full offline gate GREEN: lint 0/0 · tsc 0 · 1302/1302 unit (82 files) · build · smoke 15/15 · 140/140 e2e · census MATCH · audit unchanged. Now the six parity drift gates.
The sweep's env guards resolve to the repo-root db, which is unpushed (my earlier push/seed landed on the sandbox-exported path). Let me check how `db:push` handles the platform var.
The sweep's env guards resolve to the repo-root db (the .env contract), which lacks schema — my earlier push/seed rode the platform-exported path. Pushing + seeding the repo-root db now.
**All six parity drift gates CLEAN at 0-event margin.** Now the docs-counts lockstep — updating the constants first, then chasing every site.
11 stale sites enumerated. Chasing them all now.
Now the PAD §7.1 pins row and the remaining assertions.
docs-counts 13/13. Full unit suite re-verification.
All green. Now the captures — studying the captures-233 convention first.
Writing captures-234.ts — three faces: the standing mobile-drawer ask, the OTP type-then-paste restart (F-234c), and the import retry-disabled surface (F-234b).
All three captures verified with in-DOM assertions; census tripwire MATCH. Let me visually confirm them.
The captures' in-DOM assertions are the ground-truth verification (per the repo's own measurement doctrine). Now the docs lockstep remainder. First the AGENTS gotcha count and the new F-234a lesson.
Now the README program row — prepending the R-31 summary.
Now the PAD revision block.
Now close R-31 in the plan and add the §5 execution row.
Row placed correctly. Now the worklog entry and the session record.
Session record written. Now the final full gate post-lockstep.
Build exit 0 (the 4 Turbopack warnings are the standing `@source`/tracing notices — same as baseline). Final e2e.
**Final full gate GREEN.** Now the commit and push. First the SSH wrapper runbook.
The runbook is clear. Let me check the commit conventions (authorship of the "update session log" commits).
One atomic execution commit (matching the R-30 convention). Verifying nothing sensitive rides in, then committing.
Commit `8dda9c8` on main. Now the push — materialize the key outside the repo and check the ssh toolchain.
No ssh binary — deploying the paramiko shim per the runbook, then materializing the key.
Dry-run green — remote at 7fccaab, fast-forward to 8dda9c8. Real push.
Session 234 (R-31) is complete and pushed. Here's the delivery report:

## What was done

**Intake & validation** — Fresh clone at HEAD `7fccaab`; workspace rebuilt (.env with the `DATABASE_URL="file:../db/custom.db"` contract + fresh 64-char AUTH_SECRET, db push/seed, census MATCH 78/4/3/6/5/7). The cold baseline gate reproduced the v2.30.0 ship state exactly: lint 0/0 · tsc 0 · 1282 unit · build · smoke 15/15 · 139→140 e2e. All standing asks verified: reference STABLE on every drift layer (**probe:ref — TRUE-390 mobile menu opens with 9 links**, the operator ask), `bun audit` unchanged, neo-crm unchanged (b3d0fbe — nothing to port), SEO surface green (sitemap/robots/manifest 200), `.env.example` six-knob set standing, vitest/playwright configs standing. One sandbox wrinkle resolved: the platform shell exports an absolute `DATABASE_URL` that the seam honors as an override — the repo-root db was additionally pushed/seeded so the env-guarded sweep tooling rides the contract path.

**Fresh-eyes audit** — Three Mode-C passes (R-30 cures · API/auth/security · UI/a11y/shell): **0 Critical / 0 High / 0 Medium / 6 Low / 8 Informational**, every claim re-verified at file:line; R-30's nine cures all held.

**R-31 cures (TDD — 19 pins born RED, the e2e leg proven RED→GREEN via stash round-trip)**: the **settings-fetch tri-state** (the amber "could not be loaded" guard flashed on every hard load — hydrate drops `loading` *before* the settings await; a settled flag now flips in both arms); the **import parse sequence guard** (a re-pick mid-parse could land the wrong review — the monotonic parse token + in-flight flag); the **full-code paste restart** (a whole-code paste into a later box submitted a *rotated* code and burned an attempt; exactly-full-length edits now restart at box 1); the **OTP paste e2e leg** (browser-level pin for the paste/autofill path, riding the existing signup budget); the **uploads capacity-walk guard**; the **budget-add busy guard**; the **logout gate reorder** (the shared writes bucket no longer burns before the CSRF gate); the low tail (glyph aria-hidden, cascade-dead ink token, dead exports, comment re-attributions). The recursive F-229d genus was caught once more by the whole-tree invariant (my own cure comment coined a class-shaped hyphenation) — reworded, catch six.

**Verification** — lint 0/0 · tsc 0 · **1302/1302 unit (82 files, +20)** · build · smoke 15/15 · **140/140 e2e** · **all six parity drift gates CLEAN at 0-event margin** · census MATCH · `bun audit` unchanged. Captures **143-145** saved to `docs/screenshots/` with in-DOM assertions (mobile drawer 390, the OTP restart distribution, the import retry-disabled face); census tripwire MATCHed.

**Delivery** — Docs lockstep complete (README, AGENTS + 2 new gotcha riders, CLAUDE, PAD v2.31.0, SKILL, plan with R-31 closed + §5 row, worklog, `docs/session_51.md`). Committed `8dda9c8` and pushed to `main` via the SSH wrapper — remote ref verified (`8dda9c8` == local HEAD, re-confirmed over HTTPS), key shredded, shim removed.

**Recorded, not cured** (in the plan): the verify write's unconditional form (benign), the derivation genus beyond the Dashboard, the footer year (parity-constrained), plus the standing family (incl. F-232j whole-store migration — the dedicated-round plan). Next session defaults to findings-led iteration — re-send the standing directive to continue the rhythm.
