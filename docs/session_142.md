I'll start by internalizing the operating instructions and then work through this comprehensive task systematically. Let me set up my TODO plan first.
Repo cloned successfully. Now let me read the key documentation files.
The repo has an extensive history. Let me read the core documentation files.
Now let me read AGENTS.md (the operational guide) and key session docs.
Now let me read the session docs and remediation plan (checking sizes first).
Session docs confirm the project is at session 278 / R-75 shipped. Let me read the worklog and remediation plan headers to understand the current state.
I have a clear picture of the project state: session 278 / R-75 / v2.75.0 shipped. This session will be session 279 / R-76. Let me mark progress and check the skills catalog and codebase structure.
Let me read the key skill files (web-application, agent-browser, tdd) as instructed.
Now let me examine the codebase structure and key configs, then kick off the environment rebuild.
Census MATCH confirms the exact v2.75.0 ship state. Let me install the e2e toolchain and paramiko while reviewing key configs.
Environment rebuilt (bun install 594 packages, census MATCH, chromium headless-shell 1254, paramiko 5.1.0). Now running the cold baseline gate at HEAD.
Unit suite matches the v2.75.0 ship state exactly (2029/130). Now the build.
**冷基准测试已通过** — v2.75.0 的交付状态已完全复现：lint 0/0 · tsc 0 · 2029 单元测试 (130 个文件) · 构建 · 冒烟测试 15/15 · 161 个端到端测试 · 普查结果一致（MATCH）。

现在开始进行常规需求验证——首先进行 `probe:ref`（参考站点稳定性）测试。
probe:ref STABLE on every layer. Now the clone-side mobile-nav comparison at TRUE 390×844.
Mobile-nav verified on BOTH sides at TRUE 390×844 — no Tailwind v4 regression. Now bun audit and neo-crm check.
neo-crm unchanged (b3d0fbe). All standing layers verified. Let me quickly verify the R-75 cure surfaces hold, then dispatch the fresh-eyes audit.
All three R-75 cure surfaces verified holding. Now let me read the §2.36 audit ledger for contract enumeration, then dispatch the three Mode-C audit passes.
All standing layers verified. Now dispatching the three Mode-C research passes (the house convention) as parallel subagents for the session-279 fresh-eyes audit.
All three Mode-C passes returned. Pass B: thirty-second consecutive clean bill. Pass C: all eight standing contracts hold (2 Informational). Pass A: R-75 surfaces hold but reports 3 latent Low findings. Per house convention, let me re-verify each material claim at file:line.
All findings verified. Let me check the session-record convention and what the last owner commit changed.
The record convention is clear: this session (279) rides docs/session_141.md. Let me re-verify the latent findings programmatically (the driving-session census over the 15-file family).
All three latent findings re-verified live: 16 colon-rows walked as data (F-279a), 0 live cell-drops (F-279b latent), 0 live indented-fence pipes (F-279c latent). Now let me study the round's script models (plan-278.py) before writing plan v2.76.0.
Now I understand the full round mechanics. Let me check the docs-counts trio-advance mechanism before writing the plan.
I have the complete round mechanics. Let me update the TODO list and write the plan v2.76.0 (scripts/plan-279.py).
**Critical self-check**: my ledger rows contain regex code spans with literal pipes — I must verify they're properly escaped (the F-247i house form), since remediation_plan_v2.md is itself in the census family.
Row F-279a has 2 extra unescaped pipes (the regex code spans). Let me inspect and fix them.
The regex code spans carry unescaped internal pipes. Let me fix the plan script (escape them, the F-247i house form), revert, and re-run.
Now fix the regex code spans inside the LEDGER and NEW_HEAD strings of the script.
All rows are now proper 5-cell tables. Let me verify the standing censuses still pass with my insertions.
Plan v2.76.0 passes all standing censuses. Now R-76.1 — the parity-279 battery born honest RED. Let me read the parity-278 model first.
Now let me check parity-277's helpers and scan for nested indented fences inside column-0 fences (the F-279c tracker's edge case).
Let me check parity-229's scanner heuristic before writing the comment riders (they land in src/).
The scanner heuristics are safe for my comment riders. Now writing the parity-279 battery (R-76.1) — born honest RED.
**parity-279 born honest RED — 10 fail / 3 pass** (the live-census legs green-by-design from birth, exactly per the standing form). Now R-76.2 — let me study the cures-278.py resumable pattern, then write cures-279.py.
Now let me get the exact current text of all cure sites.
All anchors captured. Now writing the cures script (R-76.2).
One leg remains RED — the retired form still rides parity-276. Let me locate it.
There are additional delimiter predicates at lines 72/91/100. Let me examine them.
The remaining RED is my pin being too broad — the F-276a §5-scoped legs legitimately use the plain column-0 form. Let me verify the file is intact and scope the pin to the retired WALK form.
File intact (display artifact). The walk's retired form is now absent; the pin just needs scoping to the walk-specific form (with the indent prefix) to avoid tripping the legitimate §5-scoped legs.
A standing F-277d pin asserts the old toggle form (`fence = !fence`) in parity-276. My hardening legitimately changed the form — the pin needs same-commit recalibration. Let me read the leg.
The F-277d pin needs same-commit recalibration to the hardened form. Adding it as cure site 9 in cures-279.py.
The resumable design caught an append-style edge: the else-arm's old form is a prefix of the new. Let me add marker guards (the house pattern).
Same prefix edge on the comment riders. Adding marker guards to sites 7/8.
All four parity batteries GREEN (45/45). Now the consistency group: parity-229 (the whole-tree invariant over my new src comments), security-ledger, parity-272, docs-counts.
The comment rider changed finance.ts's line count (969→972). Let me check the F-272n file-card census and update the SKILL doc in lockstep.
The F-272n pin is gate-enforcing — the SKILL file-card must move with the finance.ts change in the same commit. Fixing now (pre-gate).
Unit suite at the new ship state: **2042/2042 in 131 files**. Now the full gate ladder.
**FULL GATE GREEN** — lint 0/0 · tsc 0 · 2042 unit (131 files) · build · smoke 15/15 · 161 e2e · census MATCH. Now the captures (model on captures-278.ts).
Captures landed live-asserted. Let me verify the PNGs programmatically (dimensions + solid surfaces).
Both captures validated. Let me visually verify them per the standing evidence protocol.
The visual check needs vision capabilities unavailable here; the programmatic validation (dimensions, byte variance, live-asserted surfaces, census tripwire) is the standing evidence. Now the docs lockstep — let me verify the current count sites.
Now writing the docs lockstep script (scripts/docs-279-lockstep.py).
Found it — the docs-counts pin's expected string still carries `98` while the PAD now says `99`. Also checking the hang cause. Let me fix the test pin's arch count.
My comment insertion missed the `//` prefixes on continuation lines (the session-278 authoring lesson recurring). Fixing the file and the script.
Lockstep batteries green. Now the full unit suite at the lockstep state.
Full suite green at the ship state. Now the §5 history row and session records. Let me study the history-278.py model.
Now writing history-279.py with the v2.76.0 execution-history row.
History row landed clean. Now the session record (worklog Task 279 + docs/session_141.md).
Final verification — the full unit suite at the final tree (the worklog and plan edits must pass the censuses).
All green. Now reviewing the change set and preparing the commit.
Now staging and committing the round.
Committed. Now the push via the SSH wrapper — let me read the runbook first.
Following the runbook exactly. Deploying the key (outside the repo), the paramiko shim, then the dry-run.
Dry-run verified (remote fast-forwards bda839a8 → dc433ced). Now the real push.
The push is verified (remote refs/heads/main @ dc433ce == local HEAD, tree clean, key shredded). Let me finalize the TODO list.
Session 279 / **R-76 delivered and pushed** — the walker-unification, cell-count, and indented-fence round.

**Intake & baseline** — Fresh clone at `bda839a8`; environment rebuilt cold; the cold baseline gate reproduced the v2.75.0 ship state exactly: lint 0/0 · tsc 0 · 2029 unit (130 files) · build · smoke 15/15 · 161 e2e · census MATCH.

**Standing asks verified** — probe:ref STABLE on every layer (bundle md5 6d3779af…, TRUE-390 menu census 9 destinations); mobile navigation compared on **both sides at TRUE 390×844** (reference via probe:ref, clone via comparison-265: pre-open 0 → 9 destinations + Sign Out → post-close 0, no Tailwind v4 regression); bun audit unchanged; neo-crm unchanged (b3d0fbe); sitemap/robots/manifest 200 (smoke leg 12) with metadata pins green; `.env` on the `DATABASE_URL="file:../db/custom.db"` contract with `db/` at the repo root; vitest/playwright configs and `.env.example` standing.

**Fresh-eyes audit** (three Mode-C passes, every claim re-verified at file:line) — the API/auth/security layer's **32nd consecutive clean bill**; all eight UI/shell contracts holding; the R-75 surfaces all holding. New findings: 0 Critical / 0 High / 0 Medium / **3 Low / 2 Informational** — all latent genus gaps in the census-walker family, re-derived live by my own census (16 colon-aligned delimiter rows walked as data by parity-276, 0 live cell-drops, 0 live pipe rows inside indented fences).

**TDD cures (R-76)** — parity-279 battery born honest RED (10 fail) → nine cure sites → GREEN: **F-279a** parity-276's colon-blind delimiter predicate unified to the shared colon-tolerant shape (the 16-row luck dependency retired); **F-279b** all three censuses gain the header-vs-delimiter cell-count comparison; **F-279c** all three fence strippers admit indented list-item fences (opener-indent tracker); **F-279d** the two instant-parse sites gain instant-vs-calendar comments; plus the F-277d pin's same-commit recalibration.

**Ship state** — lint 0/0 · tsc 0 · **2042 unit (131 files, +13)** · build · smoke 15/15 · 161 e2e · census MATCH; captures live-asserted (`docs/screenshots/279-session279-mobile-drawer-390.png`, `280-session279-dashboard-1280.png` + the standing clone face); docs lockstep across README/AGENTS/CLAUDE/SKILL/PAD (count ladder 2029→2042, trio advance v2.74.0/v2.75.0/v2.76.0, §5 history row, `docs/session_141.md`, worklog Task 279). Pushed to main via the SSH wrapper as `dc433ced` — remote verified == HEAD, operator key shredded.

Next round defaults to findings-led iteration — re-send the standing directive to continue the rhythm.
