The workspace exists. Let me check git status and pull the latest changes.
Pull successful — `docs/session_94.md` is new. Let me set up the task tracking and review all the key documents.
Now let me read CLAUDE.md and the session docs.
The picture is clear: R-52 shipped at `4a420fa`, the owner's `1e1f6be` carries the session-255 transcript (`docs/session_94.md`). The re-sent standing directive means this is **session 256 (R-53)** — the findings-led iteration round. Let me read the remediation plan structure and check the environment state.
Now let me check the environment state and kick off the cold baseline gate.
Environment standing: census MATCH (80/4/3/6/5/7, users=1), .env contract correct, db/ at repo root. Let me kick off the cold baseline gate — lint and typecheck first.
Lint 0/0, tsc 0. Now the unit suite (expecting 1731 checks / 107 files).
1731/1731 unit green (107 files). Now the build, then smoke + e2e.
**COLD BASELINE GATE GREEN at HEAD `1e1f6be`** — the v2.52.0 ship state reproduced exactly: lint 0/0 · tsc 0 · 1731/1731 unit (107 files) · build · smoke 15/15 · 152/152 e2e · census MATCH. No discovery.

Now the standing asks. Let me check the reference drift probe tooling and the bun audit + neo-crm upstream checks.
Let me run the reference drift probe and the audit check in parallel.
Reference STABLE on every layer. Now the mobile-navigation comparison — let me review the session-255 script and adapt it.
**MOBILE-NAV COMPARISON PASS on BOTH sides at TRUE 390×844** — identical destinations + Sign Out; the clone closes with the aria-expanded flip; both PNGs valid. No Tailwind v4 regression. Now `bun audit` and the neo-crm upstream check.
All standing asks verified: `bun audit` unchanged (1 moderate dev-chain minimatch — documented deferral), neo-crm unchanged (b3d0fbe), `.env.example` six-knob set standing, SEO surface green (smoke leg 12), `.env`/db contract standing.

Now the fresh-eyes audit — three Mode-C passes per the house rhythm. Let me first verify the R-52 cure surfaces myself, then dispatch the API and UI layer audits in parallel.
All six R-52 cure surfaces verified holding (parity-255 9/9 green). Now let me dispatch the two remaining Mode-C audit passes in parallel — AUDIT-2 (API/auth/security layer) and AUDIT-3 (UI/a11y/shell layer).
Both audit passes returned:
- **AUDIT-2 (API/auth/security): 0 Critical / 0 High / 0 Medium / 0 Low / 2 Informational — the ninth consecutive clean bill.** Both R-52 cure surfaces holding. The two Informationals are process notes (my audit charter named a nonexistent `budgets/[id]` route — budgets are category-keyed; and the documented in-band OTP knob-gated posture).
- **AUDIT-3 (UI/a11y/shell): 0 Critical / 0 High / 0 Medium / 2 Low / 1 Informational** — all three are CRM-era docblock-truth debt in the UI primitives' header blocks.

Per house discipline, I must re-verify every material claim at file:line myself. Let me verify the three AUDIT-3 findings.
Finding 1 VERIFIED — the live ring is 2px token-keyed (`ring-2 ring-ring`, `--color-ring: #1c1917` light / `#f5f5f4` dark), not "1px #0a0a0a". Now findings 2 and 3.
All three AUDIT-3 findings VERIFIED at file:line:
1. **button.tsx:20-21** — claims "1px near-black, --color-ring = #0a0a0a"; live truth is the 2px `ring-2 ring-ring` arm with `#1c1917` light / `#f5f5f4` dark
2. **tabs.tsx:20-26** — the Session-12 block's three present-tense claims all falsified: track ink is `text-stone-600 dark:text-stone-300` (not muted-ink), active pill is `shadow-sm` (not bare shadow), and the underline variant carries hover classes
3. **dialog.tsx:101-118** — title ink is explicit `text-stone-900 dark:text-stone-100` (not "inheriting #0a0a0a"), and muted-ink is `#78716c` (not "#737373")

The round shapes up as **0 Critical / 0 High / 0 Medium / 2 Low / 1 Informational NEW** — the F-255e genus's missed tail: CRM-era construction-claim header blocks in the UI primitives. Let me sweep for sibling stale blocks before planning, and study the parity-255 pin model.
More `#0a0a0a` citations exist — I must adjudicate each: true reference-decodes stay, false claims about OUR tokens get cured. Let me read them.
The `button.tsx:50`, `select.tsx:20-22`, `layout.tsx:105`, `theme-default.ts:5` citations are TRUE reference-decodes (the reference's own tokens ARE neutral `#0a0a0a`/`#737373`) — they stay. `toast.tsx:164` is a dated history note with an arrow — defensible history. But `select.tsx:100` claims "computed-equal... on both apps" for OUR tokens — let me verify that against the live palette.
`select.tsx:100` and `:136` are FALSE at HEAD too (our `--color-line` is `#e7e5e4` stone-200 not `#e5e5e5`; `--color-foreground` is `#1c1917` not `#0a0a0a`; `--color-line-soft` is `#f5f5f4` not `#f5f5f5`) — the session-199 rebrand (neutral→stone) orphaned these "computed-equal" citations. My sweep found the same genus beyond the audit's three sites. Let me complete the whole-tree sweep for the genus.
The sweep is complete — 7 sites of the genus (AUDIT-3's 3 + 4 more: `dropdown.tsx:119`, `select.tsx:99-100`, `select.tsx:136`). The `badge.tsx` block is already corrected (session 228), and `page-layout.ts:408/:482` are true decodes/live code. Now let me study the parity-255 pin model and the parity-229 scanner rules before designing R-53.
Now let me check the parity-229 carrier-net rules so the reworded comments won't trip them.
I have the complete model. Before writing the plan, let me comply with the directive's skill-consultation step and check the skills catalog + the web-application skill reference.
技能咨询已确认——`web-application` 技能的契约与本次审计所应用的内部规范一致。现在让我来撰写 R-53 计划。首先，检查计划的结构以确定插入点。
现在，在编辑之前，让我先研究一下约束文档结构的 docs-counts 引脚（guard trio、§7.1 算术、count ladder）。
The docs model is clear. Now let me verify the pin design constraints — enumerate `--color` citations in ui/ comments and check for code-side occurrences.
The regex needs tempering so a citation can't cross a sibling `--color-` token. Let me refine and check the whole src tree scope.
结构性支撑设计在整棵树上均可行——目前仅存的 2 个过期的 `--color` 引用正是修复目标。现在让我检查一下 `docs-counts` 计数阶梯的所有支撑，以枚举锁定步骤所需的每一次计数更新。
All models gathered. Updating the task list and writing the plan v2.53.0.
计划第一部分已应用，docs-counts 仍为 17/17。现在进行 **R-53.1 — 基于 RED 的 pins**。首先进行唯一性检查，然后处理测试套件。
Now the honest-RED proof — running the battery at baseline (pre-cure):
**HONEST RED: 6/6** — every leg fails for exactly the expected defect. Now **R-53.2 — the cures**. Applying the seven rewords.
Now the select.tsx sites — let me read the exact current text first.
All 7 cures applied. Now the GREEN proof — parity-256 first, then the full unit suite (the parity-229 nets will judge my reworded comments).
The F-256e leg has a harness bug — a missing `continue` after the directory recursion causes EISDIR. That means its baseline RED was NOT the honest defect-RED. Fixing the walk, then re-proving the RED against the pre-cure tree via stash.
**Honest RED re-proven** — the structural leg fails on the pre-cure tree with exactly the two expected stale sites. Cures restored. Now the GREEN proof.
**GREEN** — parity-256 6/6, full unit suite **1737/1737 (108 files, +6/+1)**. Now lint + typecheck, then the rest of the gate.
**FULL GATE GREEN** — lint 0/0 · tsc 0 · 1737 unit (108 files) · build · smoke 15/15 · 152 e2e · census MATCH · bun audit unchanged. Now the captures. Let me study the captures-255 model.
R-53 的捕获遵循该约定：移动抽屉（常设请求）、仪表板桌面端，以及本轮的特性面——实时验证重新修改后的引用在已治愈组件上实际渲染的效果。让我找一下 AI-coach 的触发器和 Expenses 标签页结构。
Now writing captures-256.ts — the standing mobile-drawer face, the dashboard desktop face, and the round's primitives face (the reworded citations proven live: the Expenses segmented tab ink and the coach-dialog title/description inks).
All 3 captures landed with live assertions — the reworded citations compute exactly on the cured components. Let me validate the PNGs and visually inspect them.
Captures verified — none blank, all content-rich (the dialog scrim share on 224 is exactly right for an open dialog). Now the **docs lockstep**. Let me collect the current count-ladder forms across the doc set.
All 23+ count sites mapped. Let me check the PAD §7.1 family rows and the exact current forms for the lockstep script.
Now writing the docs-lockstep script — the count ladder, the PAD revision block + trio advance, and the README program row, with per-edit asserts.
Count ladder applied. Now part 2 — the PAD v2.53.0 revision block, the README program row, and the plan §5 execution-history row.
The §7.1 family-row pin inside docs-counts itself needs the same-commit recalibration (the F-245c structural leg — the pin carries the row literal). Updating the pin to the new form.
docs-counts 17/17 green. Now the full unit suite to catch any remaining known-companion recalibrations.
The parity-243 mirror pin — the known companion's seventh ride. Recalibrating it to the advanced trio.
**1737/1737 GREEN** (108 files). Now the worklog entry and the session record. Let me check the worklog's format.
Now writing the worklog entry and the session record.
Now the session record — `docs/session_95.md`.
Final verification pass. First, let me confirm the Tailwind content-scan exclusions cover the test/docs changes, then run the full gate's remaining legs.
All green. Now the commit and the SSH-wrapper push. Let me check the runbook and the shim state first.
Shim present, paramiko 5.1.0 ready. Committing the round.
Commit `f452af4` on main. Now the SSH-wrapper push — materializing the key outside the repo, dry-run, then the real push.
Dry-run clean — auth verified, fast-forward negotiated. Real push:
The wrapper shredded its own temp copy, but my key file still stands — shredding it now per the operator contract.
**Session 256 (R-53) delivered — pushed to main at `f452af4`, remote ref SSH-wrapper-verified, key shredded, working tree clean.**

**Round narrative:** The workspace pulled to HEAD `1e1f6be` and the cold baseline gate reproduced the v2.52.0 ship state exactly (lint 0/0 · tsc 0 · 1731 unit · build · smoke 15/15 · 152 e2e · census MATCH). All standing asks verified: reference STABLE on every drift layer, **mobile navigation compared on BOTH sides at TRUE 390×844** (identical 9 destinations + Sign Out; ours closes with the aria-expanded flip — no Tailwind v4 regression), sitemap/robots/manifest green, `.env`/db contract, vitest/playwright configs, and `.env.example` standing.

**The audit (3 Mode-C passes):** all six R-52 cure surfaces holding; the API layer's **ninth consecutive clean bill** (one charter correction recorded: budgets is category-keyed); UI layer clean except **2 Low / 1 Informational** — one genus: the primitives' stale post-rebrand token citations (CRM-era header blocks citing neutral-era geometry/values as present-tense truth). My whole-tree sweep caught **four more carriers** beyond the audit's three (the F-228b lesson recurring).

**R-53 TDD execution:** 6 pins born honest-RED (the structural leg's harness bug caught at GREEN-proof time and the RED stash-reproven on the pre-cure tree) → 7 comment cures → **GREEN**. The structural rider **F-256e (the token-citation truth leg)** derives the palette from globals.css at test time — the next rebrand fails the unit gate instead of silently re-staling prose.

**Verification:** lint 0/0 · tsc 0 · **1737 unit (108 files, +6)** · build · smoke 15/15 · **152 e2e** · census MATCH · captures 222-224 (the reworded citations proven live: the Expenses segmented ink and the coach-dialog title/description inks each computing the exact cited pair) + both comparison captures. Docs lockstep complete: plan v2.53.0, PAD revision block + guard-trio advance (seventh ride), count ladder, worklog, `docs/session_95.md`.

To continue the rhythm, re-send the standing directive.
