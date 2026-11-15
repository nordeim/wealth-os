I'll continue the task. Let me start by checking the current workspace state and refreshing the repository.
The workspace exists with prior work. Let me refresh it and check the current state.
The repo is updated with extensive prior work (remediation rounds R-41 to R-45, session 80 just added). Let me set up the task plan.
Excellent context. The project is mature (R-45 shipped, session 248). Now let me review the session docs and remediation plan.
Now I understand the rhythm — this is repo session 249 (R-46). Let me review the remediation plan's key sections and worklog tail.
Let me understand the session file numbering convention from git history.
The convention is clear: R-44 agent wrote session_77.md (owner captured as 78), R-45 agent wrote session_79.md (owner captured as 80). **This session = repo session 249 (R-46), agent Session 81, writing docs/session_81.md.** Let me finish reviewing the core docs.
Core docs internalized. Now let me check the skills catalog and validate the codebase state.
The skills catalog is reviewed (345 skills; key ones for this round: web-application, tdd, code-review-checklist, verification-and-review-protocol, agent-browser, clone-app-pat-pro). Now let me validate the codebase state against the documented contracts.
The `.env` contract is standing. Now let me verify the guard-trio aging (the expected first docs act) and key configs.
**Guard-trio aging CONFIRMED — the genus's SEVENTH edition**: the trio pins v2.42.0/v2.43.0/v2.44.0 while the PAD's newest blocks are v2.43.0/v2.44.0/v2.45.0. Let me check the v2.45.0 block's counts and the parity-243 mirror pin.
The environment structure is verified. Now let me set up the environment and run the cold baseline (the workspace survived — node_modules and db exist).
Census MATCH — the environment reproduces the ship state. Now the cold baseline gate, starting with lint and typecheck.
Unit suite green — 1622/1622 across 99 files, the exact v2.45.0 ship state. Now the build.
Smoke 15/15 with the SEO surface verified (leg 12). Now the e2e battery — the final cold-baseline leg.
**COLD BASELINE GATE GREEN** — the exact v2.45.0 ship state reproduced (lint 0/0 · tsc 0 · 1622 unit · build · smoke 15/15 · 151 e2e · census MATCH). Now the standing asks — the reference drift probe first.
Reference STABLE on all layers including the TRUE-390 mobile menu (9 destinations — the standing operator ask). Now `bun audit` and the neo-crm upstream check.
neo-crm unchanged (b3d0fbe — nothing to port). Let me get the exact bun audit tally.
All standing asks verified. Now the **FIRST DOCS ACT** — the guard-trio advance (the genus's SEVENTH edition), green-by-design before this session's own lockstep pass.
Now the parity-243 mirror pin recalibration (same-commit):
**Guard-trio advance green-by-design (30/30)** — the SEVENTH edition cured first, per the F-244a rule. Now the fresh-eyes audit — three parallel Mode-C passes per the house convention.
All three passes returned. Raw tally: **0 Critical / 0 High / 1 Medium (the documented ADR-014 posture re-confirmation) / 6 Low / 8 Informational NEW after dedup**. Per house convention, I must now re-verify every material claim at file:line before planning. Starting with the flagship — the store's F-248f mechanics.
The store mechanics are verified exactly as the audit mapped them — the F-248f defect, I-1, and I-3 all confirmed at code level. Critically, `mutate` awaits `refreshAll` before returning (so the caller's toast fires after the fresh commit — no visible flash with the C+B cure). Now let me verify the other findings at file:line.
LOW-4 verified. Now the critical pre-cure step — checking pin compatibility: the existing source pins on the store machinery that my cure will touch.
Key pin compatibility findings — several pins watch the exact forms my cure changes. Let me read them fully.
Now I have the full picture of the pinned forms. Let me comprehensively survey every pin that watches the store forms my cure changes.
The recalibration set is now clear: parity-217 (2), parity-238 (3), parity-240 (4), parity-241 (3). Let me read the exact pin regions to prepare precise recalibrations.
The pin inventory is complete. Let me check the behavioral battery's harness pattern for the new pins.
Let me verify the two legs whose hydrate landings become superseded — checking their mock queues accommodate the settings tail.
The F-241a legs all survive the cure design. Let me verify the last two potentially-affected legs (F-239d's logout-mid-mutation and the refresh-composition leg).
All legs verified against the cure design. Let me read the store's module-state declarations and `call` helper for the docblock updates.
`call`'s catch-all confirmed. Last verification: the PAD's [SR] block ordering for the structural guard leg.
Let me check the last two pin batteries that reference the store (parity-237's arm mirror and loading-states).
All pin compatibility and behavioral-leg analyses are complete. The cure design is fully validated. Now let me write the plan v2.46.0 (the F-249 ledger + R-46 section) via the assert-each-insertion script convention.
Plan v2.46.0 written and anchors verified. Let me confirm the plan edit didn't break any existing pins, then execute R-46.1 — the pins born RED.
All 280 green — the plan edit is clean. Now **R-46.1 — the pins born RED**. First the behavioral battery:
Now the source battery — `tests/parity-249.test.ts`:
Now the docs-counts structural leg (F-249b — green-by-design at birth):
Now the honest RED proof — running the new batteries against the pre-cure tree:
**HONEST RED: 4/4** — all behavioral legs fail pre-cure. Let me verify the failure reasons are the expected defects (not harness bugs), then the source battery.
All four RED for the exactly-expected defect reasons. Now the source battery:
**HONEST RED: 16** (the 2 green pins are the negative controls — the untouched contracts — proving the blast radius is scoped exactly). Now verify the structural leg is green-by-design:
The structural leg is green-by-design (17/17). **R-46.1 complete: HONEST RED 20** (4 behavioral + 16 source) + green-by-design legs. Now **R-46.2 — the cures**. Starting with the flagship — the store's three coordinated re-keys:
Now the hydrate restructure (the seq mint + superseded landing + tail):
The flagship store cure is landed. Now the three smaller cures — signup select, logout arm envelope, and the walker docblocks:
Now the GREEN proof on the new batteries, then the same-commit recalibrations:
**GREEN: 22/22.** Now the same-commit recalibrations — the old pins watching the changed forms, per the F-247d precedent:
Now parity-240's four recalibrations:
Now parity-241's three recalibrations:
Let me verify the parity-241 logout-entry pins region and run all the recalibrated batteries:
**All 86 green.** Now the wall-machinery re-validation — the full behavioral battery plus every store-adjacent pin:
One missed pin in parity-224 — let me examine it:
The classic F-247e slice-window lesson — my F-249d rationale block pushed the POST call beyond the 900-char window. Widening the window past the comment the same commit writes:
The parity-229 carrier net caught my own cure comments — the F-229d discipline. Let me find the offender:
The offender: `last-issued` in my comments — a hyphenated coin the class-shape scanner reads as a utility. Per the F-229d discipline, describe with spaces:
**FULL UNIT SUITE GREEN: 1645/1645 across 101 files (+23: 4 behavioral + 18 source + 1 structural).** Now build, smoke, and e2e:
**FULL GATE GREEN: lint 0/0 · tsc 0 · 1645 unit · build · smoke 15/15 · 151 e2e.** Now the six parity drift gates:
**All six parity drift gates CLEAN + census MATCH.** Now the captures — let me study the previous session's capture script convention:
The convention is clear. Let me check the expenses page's delete button and the sidebar's Sign Out/nav link forms for the capture design:
The design is set. Let me verify the store's globalThis key name, then write the captures script:
Faces 194-195 passed (the flagship's live proof). Face 196's Sign Out button wasn't found — let me check the sidebar's structure:
The Sign Out lives inside the user dropdown. Let me fix face 196 to open the menu first:
**All three captures verified with the census tripwire MATCH** — the flagship proven live. Now the PNG structural validation + blank detection:
All captures RENDERED. **R-46.3 verification complete.** Now the docs lockstep — first, survey every live-tense count site:
Now let me write the comprehensive docs-lockstep script. First, the AGENTS gotcha's current tail:
Now the lockstep script for the count sites, trio advance, PAD revision block, and plan closure:
The test run hangs — let me check for stray processes and diagnose:
The run completes — one pin needs its hardcoded row updated (the §7.1 arch-pins row form). Let me find and recalibrate it:
**31 passed** — the lockstep is green with the structural leg's first gate-enforced trio advance. Now the worklog entry and the session record:
Now the session record — `docs/session_81.md`:
Now the **FINAL gate** before commit — the full chain from cold:
Build clean (0 errors — the exit code is grep's no-match) and smoke 15/15. The final e2e leg:
**FINAL GATE GREEN.** The tree shows exactly the round's 30 files. Let me verify hygiene (no unwanted classes) and check the .env.example is tracked:
Tree is clean. Now the commit and the SSH-wrapper push — reading the runbook first:
Runbook internalized. First the commit (Conventional Commit on main):
Commit `352078f` on main. Now the SSH-wrapper push — deploy the operator key and check the shim state:
The paramiko shim is standing and paramiko is installed. Deploying the operator key (outside the repo, 0600):
Dry-run green — remote at `d10b299`, fast-forward to `352078f` approved. The real push:
Push verified. Final safety scan of the commit for key material (the standing duty):
**Session 81 (repo session 249, R-46) shipped and pushed** — commit `352078f` on `main`, remote ref verified over SSH, deploy key shredded, no branches created.

**The round in brief** — the standing rhythm (refresh → audit → plan → TDD → verify → capture → document → push):

- **Intake & baseline**: workspace intact; cold-baseline gate GREEN at HEAD d10b299 — the exact v2.45.0 ship state reproduced (1622 unit · 151 e2e · smoke 15/15 · census MATCH). Standing asks re-verified: **the reference STABLE** (TRUE-390 mobile menu with 9 destinations re-probed live — the mobile-navigation comparison), `bun audit` unchanged, neo-crm unchanged (b3d0fbe), sitemap/robots/manifest green, the `.env` `DATABASE_URL="file:../db/custom.db"` contract + `db/` at root + vitest/playwright configs + `.env.example` all standing.
- **The flagship — the remount-hydrate stale-read cure (F-249c)**: F-248f's dedicated round. A mutation and a root-crossing remount hydrate interleaved so the hydrate's pre-write payload stood while the mutation's post-write refresh was discarded on the token dimension — the user saw the row they deleted beside its success toast. Three coordinated re-keys on one seam (caller-era commit guard, era threading, hydrate's GET joins the shared sequence), **proven live**: the held-POST remount interleaving captured, the store's committed slice asserted post-write after the release.
- **The structural guard leg (F-249b)**: after **seven** recurrences of the guard-trio aging genus, the docs-counts battery now derives the PAD's newest revision block at test time and asserts the pinned window covers it — the eighth edition fails the unit gate inside its own ship commit. The manual first-docs-act convention retires.
- Plus the logout-return era re-key (**proven live** at /login through the held-logout window), the signup create-arm select, the logout vanished-row arm's envelope, and the four walker docblock truths.
- **Final gate**: lint 0/0 · tsc 0 · **1645 unit (101 files, +23)** · build · smoke 15/15 · 151 e2e · **all six parity drift gates CLEAN** · census MATCH · captures 194-196 · docs lockstep complete (plan v2.46.0, PAD revision block, README/AGENTS/CLAUDE/SKILL counts, worklog, `docs/session_81.md`).

**Recorded, not cured**: F-249h-n plus the standing families (see plan §2.9). To continue the rhythm, re-send the standing directive — the guard-trio advance is now a gate-enforced lockstep leg (no longer the next session's first docs act).
