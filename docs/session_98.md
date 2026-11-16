仓库已克隆 —— 之前的修复轮次（R-52、R-53）已存在。让我彻底审阅一下文档。
This is a continuation of the standing rhythm — session 257 (R-54). Let me set up task tracking and continue the document review.
现在让我阅读完整的 `AGENTS.md` 内容和修复计划状态。
文档审查已完成。现在让我验证环境状态并启动冷基线门控。
Fresh clone — `.env` needs creating from the example. Let me check the environment files.
环境已就绪。正在启动冷基线检查 —— 先进行 lint 和 typecheck。
Lint 0/0 and tsc 0. Now the unit suite.
1737/1737 unit green (108 files) — matches the v2.53.0 ship state. Now build + smoke.
Build green (the 4 documented Turbopack warnings), smoke 15/15. Now the e2e battery.
**COLD BASELINE GATE GREEN** — the v2.53.0 ship state reproduced exactly: lint 0/0 · tsc 0 · 1737/1737 unit (108 files) · build · smoke 15/15 · 152/152 e2e · census MATCH. No discovery.

Now the standing asks — reference drift probe, bun audit, neo-crm upstream.
Reference STABLE on every layer. Now `bun audit` and the neo-crm upstream check.
All standing layers verified: probe:ref STABLE · bun audit unchanged (1 moderate dev-chain minimatch) · neo-crm unchanged (b3d0fbe). Now the mobile-nav comparison at TRUE 390×844 — per the session-253 toolchain note, the clone side rides the production artifact.
The comparison captures from session 256 are standing. Let me re-run the comparison fresh this session using agent-browser. First let me check the agent-browser skill.
agent-browser is ready. Let me start the production standalone artifact for the clone-side comparison.
I'll boot the production standalone artifact for the clone-side comparison (the session-253 toolchain note).
The standalone server must run from the repo root. Let me boot it with a dedicated scratch db on :3220 for the comparison.
Server healthy on :3220. Now the agent-browser comparison at TRUE 390×844 — reference side first.
TRUE 390×844 verified. Login to the reference and open the mobile menu.
Reference drawer opens with the 9 destinations + Sign Out. Screenshot and verify the close.
Reference side verified: drawer opens (9 destinations + Sign Out) and closes on the X toggle, PNG valid at 390×844. Now the clone side — the production artifact on :3220.
The server died with the shell session. Let me reboot it properly detached.
curl succeeds but the browser refuses — likely IPv6/IPv4 mismatch. Let me use 127.0.0.1 explicitly.
The server died again. Let me check the log.
Background processes are killed between bash invocations in this sandbox. I'll run the whole clone-side comparison in a single invocation.
The eval-based fill didn't trigger React's controlled inputs. Let me use agent-browser's native fill/click with refs in a single invocation.
Refs went stale across invocations. Let me snapshot and act in the same invocation, parsing refs dynamically.
The ref format is `ref=eNN`, not `@eNN`. Fixing the parse.
Ref doubled the "e" prefix. Quick fix.
Login succeeded, drawer opened with 9 destinations + Sign Out. But the aria-expanded probe is ambiguous — likely matching a different button in DOM order. Let me check the screenshot and refine.
Screenshot valid (390×844, 100% non-white — the dark open drawer). Let me precisely verify the aria-expanded flip with a targeted probe.
The hamburger flip works on open (Open→Close navigation menu, expanded true), but the close click didn't register. Let me examine the actual component structure.
The toggle handler is plain. Let me debug the close click with output visible.
Found it — the agent-browser eval context shares scope, so `const b` re-declaration threw SyntaxError and the close click never ran. Let me use IIFE-wrapped evals.
**MOBILE-NAV COMPARISON PASS on BOTH sides at TRUE 390×844** — the reference's drawer opens with 9 destinations + Sign Out and closes on the X toggle; our drawer (production artifact) carries the identical destinations, opens with the aria-expanded flip (Open→Close navigation menu), and closes with the sheet unmounted and zero visible nav links — parity plus the documented superset, NO Tailwind v4 regression. Both comparison captures re-saved PNG-valid at the true viewport.

Let me clean up and close the browser session.
All standing asks verified. Now the fresh-eyes audit. First the skill-consultation step per the directive, then the R-53 cure-surface verification.
R-53 cure surfaces hold (parity-256 6/6, parity-255 + docs-counts 26/26). Let me check the standing registers before dispatching the audit passes.
R-53 cure surfaces hold. Now dispatching the two remaining Mode-C audit passes in parallel.
Both audit passes returned. Per house discipline, I must re-verify every material claim at file:line myself before planning. Let me verify the six findings.
The Badge has an import in settings — let me check if it's actually rendered live.
The Badge IS live in settings (4+ renders) — the "zero consumers" claims in badge.tsx may be stale. Let me trace the history.
The history shows the Badge consumer landed in settings (b1d38de, the R-7.6-R-7.8 era) BEFORE the F-252f comment claimed "zero consumers today" (99bf966, session 252) — the comment was false at birth. My verification caught what the audit missed. Let me sweep the tree for the genus per the F-228b lesson.
The variant-arm claims (secondary/destructive/outline) are TRUE — settings uses the default variant. The false claim is the F-252f focus-frame comment's "zero consumers today". Let me spot-check the other zero-consumers claims.
All other zero-consumers claims are retirement notes (true by construction). Now the second genus sweep — dead-arm `dark:` overrides (the toast F-257o genus).
The dead-arm genus has exactly one carrier (toast.tsx:158) — the others are live stone-palette pairs. Let me verify no test pins BUTTON_BASE.rounded before retiring it.
All findings verified. The round shapes up as **0 Critical / 0 High / 0 Medium / 4 Low / 3 Informational NEW** — R-54: the stale-consumer, dead-arm, and glyph-citation round. Let me study the docs-counts pin structure before writing the plan.
Let me study the parity-229 carrier-net rules so the reworded comments won't trip them.
I have all the models. Let me write the R-54 plan into the remediation plan — first check the insertion points.
Now let me write the R-54 plan into the remediation plan. First, read the exact insertion-point texts.
Writing the plan v2.54.0 — first the current-version header.
Now the §2.15 audit ledger insertion before "## 3. The remediation program".
Now the R-54 section before R-53.
Now the §5 execution-history row — append after the v2.53.0 row.
Row landed correctly (newest-first table). Now the next-iteration pointer at the tail.
Plan written. Before writing the pins, let me verify the exact cure-site structures (login-card header position, badge block boundaries).
Structure confirmed. First fix the "four" → "five" focus-arm count in the plan (the audit's prose undercounted — there are five arms).
Plan complete. Now **R-54.1 — the pins born RED**. Writing the parity-257 battery.
Now run the battery at baseline — expecting honest RED on every leg.
**HONEST RED: 7/7** — every leg fails for exactly the expected defect. Now **R-54.2 — the cures**.
Cure 1 done. Now the login-card header.
Cure 2 done. Now the toast dead arm.
Cure 3 done. Now the BUTTON_BASE member retirement.
Cure 4 done. Now the badge comment reword + the five focus-arm swaps.
All five cures applied. Now the GREEN proof — parity-257 first, then the carrier nets that judge the reworded comments.
6/7 green — one leg fails. Let me see the exact assertion.
The pin's expected string spans a comment line-wrap — the harness needs whitespace normalization (the s198 lesson). Fixing the pin, not the cure.
The comment-continuation asterisk survives normalization — the harness needs to strip ` * ` continuations. Fixing.
**GREEN — parity-257 7/7.** The harness needed two fixes (line-wrap span + comment-asterisk strip). Per the honest-RED discipline, let me re-prove the RED against the pre-cure tree via stash.
**HONEST RED re-proven: 7/7 against the pre-cure tree** — every leg fails for exactly the expected defect. Cures restored. Now the full unit suite for the new counts.
The regression contract working as designed — three existing pins caught the cures. Let me read them to recalibrate same-commit.
The three companion pins need same-commit recalibration per the doctrine. Applying.
**1744/1744 unit GREEN (109 files, +7)**. The plan predicted +6 — truing it to the actual +7. First lint + typecheck.
Lint 0/0, tsc 0. Now build + smoke + e2e.
**FULL GATE GREEN** — lint 0/0 · tsc 0 · 1744 unit (109 files) · build · smoke 15/15 · 152 e2e · census MATCH · bun audit unchanged. Now the captures — adapting the captures-256 pattern.
I have the full model. Writing captures-257.ts — three faces: the standing mobile drawer, the dashboard desktop, and the round's consumers face.
All three captures landed with live assertions. Validating the PNGs.
All captures valid. Now the **docs lockstep** — the count ladder first. Let me enumerate all count sites.
I have the full inventory. Let me check the exact pin forms in docs-counts and the PAD §7.1/§9/§10 sites.
Now I'll write the docs-lockstep script with per-edit asserts — count ladder, guard trio, mirror pin, PAD revision block, README program row.
Part 1 done. Let me verify no stray escaped v2.51.0 forms remain in the guard slice.
The pins found the remaining companions. Let me fix the hierarchy sites and insert the PAD v2.54.0 block (part 2).
Now the PAD v2.54.0 revision block — inserting above v2.53.0 (newest-first).
Both green. Now the README program row — prepending the R-54 summary.
All green. Now the worklog entry and session record.
Worklog complete. Now the session record — `docs/session_97.md`.
Session record written. Final verification pass — lint, typecheck, unit suite on the fully-edited tree.
Change set is clean. Running the remaining gate legs (build, smoke, e2e) on the final tree before commit.
**FULL GATE GREEN on the final tree.** Now the commit and SSH-wrapper push. Let me read the runbook and check the shim state.
No ssh binary, no shim, no paramiko. Let me read Appendix A and set up the shim.
I have the complete shim. Setting up paramiko and the shim outside the repo.
Shim deployed. Now materialize the operator key outside the repo and verify its fingerprint.
Key verified. Now committing the round.
Dry-run clean — auth verified, fast-forward negotiated. Real push.
**Session 257 (R-54) delivered — pushed to main at `9ad69e1`, remote ref SSH-wrapper-verified, key shredded, tree clean.**

**Round narrative:** The sandbox had reset, so the workspace was freshly cloned and rebuilt from cold; the baseline gate reproduced the v2.53.0 ship state exactly (1737 unit · build · smoke 15/15 · 152 e2e · census MATCH). All standing asks verified: reference STABLE on every drift layer, **mobile navigation compared on BOTH sides at TRUE 390×844** (identical 9 destinations + Sign Out; ours opens/closes with the aria-expanded flip — no Tailwind v4 regression), sitemap/robots/manifest green, `.env`/db contract, vitest/playwright configs, and `.env.example` standing.

**The audit (3 Mode-C passes):** R-53 cures all holding; the API layer's **tenth consecutive clean bill**; UI layer yielded **5 Low / 2 Informational** — one genus: stale consumer-truth and dead-arm prose (retired glyph/logo citations, a byte-equal dark arm, a dead constant, a false-at-birth "zero consumers" claim my verification caught against the audit's own premise).

**R-54 TDD:** 7 pins born honest-RED (re-proven via stash) → 5 cures + 3 companion-pin recalibrations → **GREEN**. Gate: lint 0/0 · tsc 0 · **1744 unit (109 files)** · build · smoke 15/15 · **152 e2e** · census MATCH · captures 225-227 + both comparison captures. Docs lockstep complete (plan v2.54.0, PAD block, count ladder, worklog, `docs/session_97.md`).

To continue the rhythm, re-send the standing directive.
