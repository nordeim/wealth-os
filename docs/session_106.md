I'll start by setting up a task plan and then refreshing the workspace as instructed.
Repo cloned successfully. It already has `.env.example`, `db/` at root, and vitest/playwright configs from prior sessions. Now let me review the core docs. Starting with README and CLAUDE.md:
Let me read the README in chunks directly:
README reviewed. Now let me check the docs folder and read CLAUDE.md:
Now I understand the rhythm. Let me read CLAUDE.md and the key parts of AGENTS.md:
Now let me read AGENTS.md strategically (structure + key sections):
Now let me review the remediation plan structure and the worklog's latest entry:
Docs reviewed. Now let me validate understanding against the codebase — checking package.json, configs, and key source files:
Codebase aligns with docs — this is session 261 (R-58 round) of the standing rhythm. Now let me rebuild the environment from cold:
Census MATCH. Now playwright chromium and the cold baseline gate:
Lint 0/0 · tsc 0 · 1789/1789 unit. Now build + smoke:
**COLD BASELINE GATE GREEN** — lint 0/0 · tsc 0 · 1789/1789 unit · build · smoke 15/15 · 152/152 e2e · census MATCH. Now the standing asks — reference drift probe and audit:
The neo-crm dir is an empty shell from the sandbox reset. Let me clone it fresh:
neo-crm unchanged (b3d0fbe) — nothing to port. Let me confirm the bun audit state:
Standing asks verified so far. Now the mobile-nav comparison at TRUE 390×844. Let me check the agent-browser skill usage:
Now the reference-side mobile-nav comparison at TRUE 390×844:
Logged in. At 390 the mobile header shows the menu button. Let me open the reference drawer and census:
Drawer open: 9 visible destinations, X toggle flipped. Now close and verify:
Reference side verified: opens with 9 destinations + Sign Out, closes via X, zero visible links after close. Now the clone side — production artifact on scratch db per the session-253 toolchain note:
The server dies when its parent shell exits — the session-98 lesson: single invocation. Let me write the comparison runner script:
The refs went stale after filling. Let me check agent-browser's selector-based click syntax:
Let me verify the mobile-header aria-label implementation to get the close-toggle name right:
Script verified against the implementation. Running the corrected comparison:
Clone-side comparison verified: 9 destinations + Sign Out, aria-expanded flip on open AND close, zero visible links after close. Let me validate both captures:
Both captures valid — matching documented values exactly. Now the audit phase. First, re-verify the R-57 cure surfaces hold (parity-260 battery):
parity-260 green 10/10 — R-57 cures hold. Now dispatching the two Mode-C audit passes in parallel:
Both audits returned: API layer — **14th consecutive clean bill** (0/0/0/0/0 NEW, census 45/30 exact); UI layer — 0 Critical / 0 High / 0 Medium / 3 Low / 1 Informational NEW. Per house discipline, I must re-verify every material claim at file:line myself:
LOW-1 verified. Let me check whether the h1 rendering was a documented decision (heading-order normalization):
The h1 renders are the documented F-231b/R-28 heading-focus construction — the cure direction is prose-truing, not tag restoration. Now verifying LOW-2, LOW-3, INFO-1:
LOW-3 needs exact recomputation. Let me compute the contrast figures by code:
All figures recomputed — the 1.63 does not reproduce (true value 1.49:1); the 4.75 and 1.48/1.49 companions check out. Now INFO-1:
All four findings verified. Now the driving-session whole-tree sweeps to bound each genus:
Genus 1 bounded: exactly 7 carriers. Now genus 2 — the whole constants file census:
Genus 2 bounded: APP_NAME/APP_TAGLINE are the only never-consumed exports. Now genus 3 — ratio citations sweep:
Genus 3 bounded: 1.63 rides at exactly 2 sites. Now genus 4 — the vestigial-export whole-tree sweep:
All genera bounded. The round is clear — let me study the parity-260 battery's harness before writing the R-58 plan:
Now let me study the plan-lockstep script convention from session 260:
I have the full pattern. Let me examine the login-reset.ts layout docblocks to write correct trued prose:
All context gathered. Let me check if docs-counts pins the plan version header, then write the plan script:
Now writing the plan-261.py script (the v2.58.0 plan):
Table integrity confirmed (5-column schema matches §2.18). Now let me check the parity-229 comment-discipline invariants before writing the battery:
Now let me verify the h1/h2 census in login-card before writing the battery:
Writing the parity-261 battery (born honest RED):
Let me fix the battery — imports at top and the census regex bug:
Now the honest-RED proof — run the battery against the pre-cure tree:
8/11 RED but the census leg is self-satisfying (my own battery mentions APP_NAME as a string literal). Fixing the self-mention trap:
HONEST RED: 9 RED legs + 2 green-by-design riders. Spot-checking each leg fails on exactly its own defect:
Every leg fails on exactly its own defect — honest RED confirmed. Now **R-58.2 — the cures**. F-261a first (the 7 prose carriers):
Now the test-file prose carriers:
F-261a done. Now F-261b — retire the dead brand constants:
F-261b done. Now F-261c — the citation truing at both carriers:
Now the plan's F-221n register row:
F-261c done. Now F-261d — the two vestigial export keywords:
All four cures applied. Now the GREEN proof:
The battery's regex has an escaping error (extra slash after the colon). Fixing:
**GREEN — parity-261 11/11.** Now the full verification ladder — lint, typecheck, full unit suite:
The regression contract caught my own prose — "inline" is a bare Tailwind utility word. Let me check the bare-word set and reword:
The pin caught its own cure's prose (the F-229d discipline). Rewording:
1800/1800 unit (113 files, +11). Truing the plan's pre-written count (I estimated +10; actual +11):
Let me add the regression-contract catches to the R-58 section in the plan:
Now the full gate — build + smoke + e2e:
**FULL GATE GREEN on the cured tree.** Now the captures — let me check the naming convention:
Now let me write the captures-261 script. First checking the signin h1 text and settings switch structure:
Writing captures-261.ts:
All captures landed with in-flight assertions. Validating the PNGs:
All PNGs valid. Now the docs lockstep. Let me study the previous session's lockstep script:
Writing the docs-261 lockstep script (count ladder + PAD block + guard trio):
docs-counts green 17/17. Now the README program row's R-58 summary:
Now prepending the R-58 summary to the README program row:
Now the worklog entry and session record:
Docs lockstep complete. Now the final full gate on the fully-edited tree:
The known parity-243 mirror pin needs its twelfth ride (the F-247d companion). Updating:
Now fixing the captures-261.ts type error (`spawned.pid` possibly undefined):
**FINAL FULL GATE GREEN** — lint 0/0 · tsc 0 · 1800/1800 unit · build · smoke 15/15 · 152/152 e2e · census MATCH · audit unchanged. Now the commit — verifying the change set:
Committed at 929f4a72. Now the SSH-wrapper push — reading the runbook first:
Runbook read. Checking for `ssh` and paramiko availability first:
Now materializing the operator key outside the repo (0600):
Key parses (ed25519). Deploying the paramiko ssh shim outside the repo:
Dry-run clean — fast-forward negotiated. Now the real push:
The wrapper's own post-push verification already confirmed `refs/heads/main @ 929f4a7 == local HEAD` (my extra ls-remote lacked the key since the wrapper shredded its temp copy — by design). Key shredded. Confirming final tree state:
**Session 261 (R-58) delivered — pushed to `main` at `929f4a72`, remote ref SSH-wrapper-verified, operator key shredded, tree clean.**

**What shipped:**

- **Intake & baseline**: workspace re-cloned from cold to `74e7eec5`; environment rebuilt (`.env` on the `DATABASE_URL="file:../db/custom.db"` contract, `db/` at repo root, census MATCH). Cold baseline gate reproduced the v2.57.0 ship state exactly — no discovery.
- **Standing asks**: reference STABLE on every drift layer; **mobile-nav comparison at TRUE 390×844 on BOTH sides** via agent-browser (identical 9 destinations + Sign Out; ours with the aria-expanded flip superset — no Tailwind v4 regression); `bun audit` unchanged; neo-crm unchanged; sitemap/robots/manifest 200; `.env.example` and vitest/playwright configs standing.
- **Audit (3 Mode-C passes)**: API layer — **14th consecutive clean bill** (45 handlers / 30 routes confirmed); UI layer — 4 new findings, all re-verified at file:line with genus-bounding sweeps.
- **R-58 (TDD)**: parity-261 battery born honest RED (9 RED legs) → four cures (seven h2-prose carriers trued to the rendered h1; dead `APP_NAME`/`APP_TAGLINE` retired; mis-cited 1.63:1 contrast figure trued to the computed 1.49:1; two vestigial export keywords dropped) → GREEN 11/11, with two regression-contract catches along the way (the census leg's self-mention trap; the parity-229 bare-word invariant catching the round's own "inline" coinage).
- **Gate**: lint 0/0 · tsc 0 · **1800 unit (113 files, +11)** · build · smoke 15/15 · **152 e2e** · census MATCH. Captures 236–238 + both TRUE-390 comparison captures saved. Docs lockstep complete (plan v2.58.0, PAD revision block, count ladder, guard-trio twelfth advance, README row, worklog, `docs/session_105.md`).

To continue the rhythm, re-send the standing directive — the next session defaults to findings-led iteration.
