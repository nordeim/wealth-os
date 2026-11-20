仓库已克隆 —— 这将是一个持续进行的项目，目前已进行到第 142 个阶段。现在让我来阅读核心文档。先从 `README.md` 和最近的会话日志开始。
I now have context: this is session 280 (R-77) of a long-running remediation program. docs/session_141.md is the session-279 record, docs/session_142.md is the prior transcript. Let me set up my TODO plan and read the core docs.
Now let me read the remediation plan structure — the conventions (§2) and the latest revision blocks.
Let me kick off the environment rebuild in the background while I continue reading docs.
bun install is complete. Now let me set up the environment (.env, db push + seed, census) per the standing intake convention.
Census MATCH (81/4/3/6/5/7, users=1). Now let me install the e2e toolchain (chromium) and paramiko in the background, and read the skills catalog.
The toolchain is ready. Now let me run the cold baseline gate at HEAD (lint → typecheck → test → build → smoke → e2e).
2042/2042 unit in 131 files — matches the v2.76.0 ship state. Now the build.
Build done (the 4 documented Turbopack warnings), smoke 15/15. Now the e2e battery.
Cold baseline gate fully GREEN at HEAD — the v2.76.0 ship state reproduced exactly (lint 0/0 · tsc 0 · 2042/2042 unit · build · smoke 15/15 · 161/161 e2e · census MATCH). Now the standing layers: probe:ref first.
probe:ref STABLE on every layer. Now the clone-side mobile-nav comparison at TRUE 390×844.
Mobile-nav verified on BOTH sides at TRUE 390×844 — no Tailwind v4 regression. Now bun audit and neo-crm check.
All standing layers verified: probe:ref STABLE · mobile-nav both sides TRUE 390×844 · bun audit UNCHANGED (2 dev-chain vulns, runtime clean) · neo-crm unchanged (b3d0fbe) · SEO surface green (smoke leg 12 + unit pins). Now the fresh-eyes audit — three Mode-C passes as parallel research subagents per the house convention.
All three Mode-C passes returned. Per the house convention, now I must re-verify every material claim at file:line myself before acting. Let me verify the key findings.
The predicate shape is verified. Now the critical question for F-280a: does GFM actually require ≥1 hyphen per delimiter cell? Let me verify against the spec.
The spec sources confirm "each delimiter cell needs at least one hyphen". Let me verify against the cmark-gfm reference implementation (what GitHub actually runs).
The table.c gate is `scan_table_start`. Let me check the actual scanner definition in ext_scanners.re.
F-280a is now fully verified against the cmark-gfm reference scanner: `table_marker = spacechar*[:]?[-]+[:]?spacechar*` — each delimiter cell requires at least one hyphen. Our predicate `[\s:|-]+` admits hyphen-less cells that render no table. Now let me re-verify the pass-C findings at file:line.
F-2802 verified — the net is file-scoped (9 pages + 6 components), tree clean today. Now let me re-derive the live census myself (the driving-session discipline) to validate F-280a's zero-live claim and the new predicate's live behavior.
The driving-session census confirms: 127 tables live, zero hyphen-less/colon-misplaced delimiter rows (the gap is latent), and the hardened predicate passes the 12-form matrix. Now spot-check the pass-B census and verify F-2801's a11y open-state legs.
All findings verified. Let me spot-check the two pass-B informational claims before registering them.
All claims verified. Now let me study the plan-279.py model to write plan v2.77.0 in the house form.
现在我来研究一下 parity-279 电池模型，以设计 parity-280 电池。
Now let me check the critical scan surfaces before writing the plan: the @source directives (markdown content scanning) and the parity-229 walkSrc form (for the whole-tree net cure).
Let me verify the widened net is green at birth over the whole src tree right now.
Zero offenders across 116 src files — the widened net is green at birth. Now let me study the docs-counts trio mechanism before writing the plan.
Let me check the §5-scoped residual regexes in parity-276 to confirm they don't conflict with the existing pins.
The §5-scoped forms differ from the pinned retired form — no conflict. Now let me enumerate ALL predicate carrier sites for the cure.
All four carrier sites enumerated (parity-276:45, 277:89, 278:87, 279:89). Now let me pre-flight the new e2e leg against the live app before committing to the design. Let me look at the a11y spec's helper section first.
Now let me pre-flight the F-280j e2e leg with a scratch spec before designing the full cure.
Pre-flight result: the filters card open state is axe-clean (zero violations) — the leg rides green from birth as a coverage closure. Deleting the scratch spec.
All design points verified. Now writing the plan v2.77.0 script (R-77.0).
Plan v2.77.0 written. Now validating it against the standing censuses (the plan file is in the family).
所有 45 个 parity legs 在修改后的计划树（plan-modified tree）上均已通过。现在进行 R-77.1 —— 正在编写 parity-280 测试套件。首先，确认之前未覆盖文件的路径。
Now writing the parity-280 battery — born honest RED.
parity-280 born honest RED — 6 fail / 4 pass, exactly the standing form. Now R-77.2 — building the cures script. Let me capture the exact anchor texts.
APP_PAGES/pageSrc stay used by other legs. Now writing the cures script (R-77.2).
The pipe inside the char class isn't backslash-escaped in the source. Fixing the anchors.
The append-style prefix edge (the session-279 lesson). Adding marker guards for the append-style sites.
Now the same marker guard for the a11y leg site.
parity-280 GREEN 10/10, cures resumable. Now the sibling batteries and consistency group.
One standing pin tripped — the parity-275 scrollThrough census counts 13 helper calls; my new leg makes 14. This is the same-commit recalibration doctrine. Let me read the pin.
The pin's own comment mandates the same-commit update. Adding the recalibration as cure site 7.
2052/2052 unit in 132 files. Now the full gate ladder: lint, typecheck, build, smoke, e2e.
Full e2e battery GREEN at 162/162 with the new leg. Confirming census, then the captures.
Captures landed live-asserted. Validating the PNGs programmatically.
Both PNGs validated (390×844 and 1280×800, real content variance). Let me do a quick visual verification of the two captures.
The programmatic validation stands as the evidence (vision unavailable here — the session-279 precedent). Now the docs lockstep. Let me study the docs-279-lockstep model.
Now let me enumerate all live-tense count sites for the lockstep.
Writing the docs lockstep script.
The battery run hung — likely a stray dev-server process from the captures run. Let me check.
The tests ran in 206ms — one real failure: the PAD §7.1 distribution leg (the process-exit hang is a separate environment quirk). Let me see the failure detail.
The expected string's count literal stayed at 99. Fixing it directly and recording the site in the lockstep script.
The trio pin set is [77, 75, 74] — the v2.76.0 line must replace the aged v2.74.0 pin. Fixing.
Now the §5 execution-history row. Studying the history-279 model.
Writing the history-280 script (the §5 execution-history row).
All censuses green over the modified tree. Now the session record (docs/session_143.md) and worklog Task 280.
Now the worklog Task 280 entry (prepended at the top).
I mistakenly overwrote the full worklog — restoring it from git and prepending the entry correctly.
Worklog restored with the new entry prepended (1720 lines). Now the final verification at the ship tree.
Now staging and committing the round.
Committed as e6076e40. Now the push — reading the SSH wrapper runbook first.
No ssh binary — deploying the paramiko shim and the operator key per the runbook.
Dry-run verified (remote fast-forwards 39da530e → e6076e40). Now the real push.
The wrapper already verified the remote (step 6), but let me do the independent verification with the key.
Session 280 / **R-77 delivered and pushed** — the hyphen-required, whole-tree-net, and open-axe round, committed as `e6076e40` on main, remote verified == HEAD, operator key shredded.

**Intake & baseline** — Fresh clone at `39da530e`; environment rebuilt cold; the cold baseline gate reproduced the v2.76.0 ship state exactly: lint 0/0 · tsc 0 · 2042 unit (131 files) · build · smoke 15/15 · 161 e2e · census MATCH.

**Standing asks verified** — probe:ref STABLE on every layer; mobile navigation compared on **both sides at TRUE 390×844** (reference: 9 destinations via the TRUE-390 menu census; clone: 9 destinations + Sign Out, aria-expanded flip, post-close 0 — no Tailwind v4 regression); bun audit unchanged; neo-crm unchanged (b3d0fbe); sitemap/robots/manifest 200 with metadata pins green; `.env` on the `DATABASE_URL="file:../db/custom.db"` contract with `db/` at the repo root; vitest/playwright configs and `.env.example` standing.

**Fresh-eyes audit** (three Mode-C passes, every claim re-verified at file:line, plus my own live derivations: 127 tables / 127 count-matched / zero hyphen-less delimiter rows; zero phantom variants across all 116 src files; the filters card pre-flighted axe-clean): the API/auth/security layer's **33rd consecutive clean bill**; all eight UI/shell contracts holding; **0 Critical / 0 High / 0 Medium / 4 Low / 8 Informational** new after dedup.

**TDD cures (R-77)** — parity-280 battery born honest RED (6 fail) → seven cure sites → GREEN 10/10:
- **F-280a flagship**: all four census batteries' delimiter predicate now requires a hyphen per cell, exactly matching the cmark-gfm reference scanner (verified against its source) — a hyphen-less row renders no table on GitHub while passing every shape/count gate; zero live carriers
- **F-280k**: the phantom-breakpoint net widened from 15 enumerated files to the whole 116-file src tree (the F-207a Tailwind v4 genus returning as a coverage hole)
- **F-280j**: the Expenses filters card's OPEN state joined the a11y two-gate's open-state family (the parity-275 census recalibrated same-commit)
- Nine findings registered (incl. the skills-library count-mismatch table — outside scope per your exclusion directive)

**Ship state** — lint 0/0 · tsc 0 · **2052 unit (132 files, +10)** · build · smoke 15/15 · **162 e2e (+1)** · census MATCH; captures live-asserted in `docs/screenshots/` (281: mobile drawer 390×844; 282: dashboard 1280×800); docs lockstep across README/AGENTS/CLAUDE/SKILL/PAD (count ladder, trio advance — the 31st gate-enforced ride, §5 history row, `docs/session_143.md`, worklog Task 280).

Next round defaults to findings-led iteration — re-send the standing directive to continue the rhythm.
