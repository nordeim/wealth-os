I've internalized the operating instructions (six-phase workflow: ANALYZE → PLAN → VALIDATE → IMPLEMENT → VERIFY → DELIVER, evidence-based verification, audit discipline, etc.). Let me set up a task plan and refresh the workspace first.
Cloned. Now let me get the repo structure, recent history, and clone the neo-crm reference repo in parallel.
Repo cloned at `main` (latest: R-72 parity round). Now let me inspect root-level files, the skills catalogs, and key docs.
Both repos cloned. The wealth-os repo already has `db/`, `.env.example`, `playwright.config.ts`, `vitest.config.mts`, and a rich `skills/` folder. Now let me read the core documents — starting with the most recent session docs, remediation plan, README, and CLAUDE.md.
The repo is mature (R-72 parity round done; `.env.example`, `db/`, vitest/playwright configs, sitemap route all already exist). Now reading the core docs in full — session docs, README, CLAUDE.md first.
This is a continuing remediation program at R-72 ship state (session 275). Now this session is 276 / R-73. Let me read CLAUDE.md and AGENTS.md in full.
Now reading AGENTS.md in full (1006 lines).
Let me read AGENTS.md directly in chunks instead.
AGENTS.md fully absorbed. Now reading the worklog head, remediation plan structure, and the SSH push runbook — all critical operational contracts.
The push runbook is clear. Let me now read the worklog entry (from persisted output) and the remediation plan's governing sections.
The worklog rhythm is clear. Now the remediation plan's governing rules and latest blocks.
Now let me check the environment toolchain (bun availability), package.json scripts, and the repo's scripts folder.
Environment status: bun ✓, node ✓, paramiko ✗ (install later), no `ssh` binary (need shim). Now rebuilding the environment from cold — `bun install` first.
Install done in 6s. Now creating `.env`, pushing + seeding the DB, and installing playwright chromium + paramiko.
Schema pushed, `db/custom.db` at repo root. Now seed + census, plus playwright chromium install.
Census MATCH — environment contract restored exactly. Now installing Playwright chromium and paramiko for the SSH shim.
Chromium + paramiko installed. Now the cold baseline gate at HEAD — lint → typecheck first.
Lint 0/0 · tsc 0. Now the unit suite.
1997/1997 unit (127 files) — exact match with the ship state. Now the build.
Build green (route twins standing). Now smoke ladder + e2e battery.
Smoke 15/15. Now the full e2e battery (161 checks, boots own server on :3100).
**COLD BASELINE GATE GREEN AT HEAD** — lint 0/0 · tsc 0 · 1997/1997 unit · build · smoke 15/15 · 161/161 e2e · census MATCH. The v2.72.0 ship state reproduced exactly. Now the standing asks: `bun audit`, neo-crm state, and probe:ref.
`bun audit` unchanged (1 dev-chain moderate) · neo-crm unchanged (b3d0fbe). Now running the reference-stability probe (probe:ref) against the live reference.
Reference STABLE on every layer. Now the clone-side mobile-nav comparison at TRUE 390×844 (comparison-265.ts over the scratch db).
Clone-side mobile nav VERIFIED (pre-open 0 · 9 destinations + Sign Out · aria-expanded flip · post-close 0 · census tripwire MATCH · no Tailwind v4 regression). All standing asks green.

Now Phase 3 — the fresh-eyes audit, three Mode-C passes as parallel research subagents per the house convention.
All three passes returned. Raw ledger: **0 Critical / 0 High / 0 Medium / 5 Low / 7 Informational**. Now re-verifying every material claim at file:line myself before planning, per the house convention.
L-2 structure verified: header at 11087 with no delimiter row, orphan delimiter at 11110, blank lines breaking the table. Let me map the exact row layout.
L-3 verified — the v2.47.0 row is missing its gate/commit cells. Now verifying the other claims: the ten §2 pipe rows, the F-275d phantom comment, api.ts census, AGENTS:99.
L-4 verified — the plan claims a "modal-rationale comment" that never shipped. Now api.ts and AGENTS.md:99.
All five Low claims verified at file:line. The audit ledger stands: **0 Critical / 0 High / 0 Medium / 5 Low / 7 Informational**. Now studying the R-72 round's scripts to model R-73 precisely.
Session 250's ship counts found (1668 unit/102 files, 151 e2e). Now studying the R-72 script models.
I have the full R-72 model. Now VALIDATE the R-73 plan against the tree — cure anchors, pin compatibility, docs-counts gates, and the content-scan surface.
Now validating the exact cure anchors: the ten pipe rows, the a11y trio shapes, api.ts text, AGENTS line.
Let me run a complete unescaped-pipe census over ALL table rows in the plan file (not just the ten the audit found) — the cure must sweep the whole genus.
My census was naive — different tables have different legitimate column counts. Let me redo it properly per-table (header's count vs data rows).
Complete census: exactly 11 offender rows, all in the plan file (ten §2 pipe rows + the v2.47.0 §5 row). All other docs CLEAN. Now the a11y trio's exact anchors for the comment insertion.
Now checking sibling §5 row tails for the commit-cell convention, and the oldest rows' forms.
All anchors validated. Pre-mortem: checking for existing pins that watch the §5 table or the v2.47.0 row, before writing the plan.
The F-258i §5 ordering pin is regex-based — my structural cure is compatible. Now checking the PAD's [SR] block form and §7.1 rows for the lockstep model.
Now checking the captures model and script-guards pin before writing the plan.
All validation complete. Now writing the plan v2.73.0 (R-73 — the table-structure, census-truth, and phantom-comment round).
Plan v2.73.0 written. Now **R-73.1** — the parity-276 battery, born honest RED (10 legs).
Let me fix the F-276c comment-shape leg to avoid the slice-window fragility (the F-247e lesson — never window a pin narrower than the cure's own shape).
Now proving the battery is born honest RED against the pre-cure tree.
10 failed, 1 passed (11 legs). Let me find the passing leg — the battery must be honest RED.
The passing leg is a pin-authoring bug — the THIRTEEN phrase is hard-wrapped across comment lines, so the raw containment check is vacuous. Applying the F-239f comment-wrap normalization.
The docblock uses ` * ` prefixes, not `//` — the normalization must strip both comment forms. Fixing.
**11/11 RED — battery born honest.** Now R-73.2: extracting the exact in-cell pipe contexts per row to write the cures script.
All pipe sites mapped. Now writing the cures script (R-73.2) — every site asserted exactly-once (or the stated count), all replacements scoped.
The script failed mid-run (non-atomic writes). Let me check exactly what was already written before deciding how to resume.
F-276a landed fully; 3 of 10 pipe rows escaped. Making the script resumable (idempotent skips for already-healed sites) and re-running.
All cures landed. Now the verification chain — parity-276 GREEN first.
Three pin-authoring bugs (my pin counted pipes as cells; and the comment's line-start capitalization). Fixing the pins.
**parity-276 GREEN 11/11.** Now the full unit suite (expecting 1997+11=2008 / 128 files).
The api.ts docblock grew 446→451 lines; the skill doc's file-card claim must ride the same commit (the documented pin-update doctrine). Finding the claim site.
Lint 0/0 · tsc 0. Now build → smoke → e2e.
e2e 161/161. Now the captures — reading the rest of the captures-275 model.
Writing captures-276.ts — the round's touched-family face (the Accounts dark dialog leg) + the standing drawer + dashboard faces.
Captures landed + census tripwire MATCH. Validating the PNGs (dimensions + solid surfaces) per the house convention.
All captures validated (dimensions + 100% solid surfaces). Now the docs lockstep — first mapping every live-tense count site.
Now writing the docs lockstep script — every replacement scoped to live-tense sites, each asserted.
Now the §5 execution-history row (history-276.py) — riding the healed table.
One missed live-tense site — the README's file-hierarchy line. Patching.
Count gates green. Now writing the session record (docs/session_135.md) and the worklog entry.
Now the worklog entry (Task ID 276, prepended).
Now the full final gate at the exact ship state.
**FULL FINAL GATE GREEN** — lint 0/0 · tsc 0 · 2008 unit (128 files) · build · smoke 15/15 · 161 e2e · census MATCH. Now the final tree review before the commit.
Tree is surgical. Verifying the src-scoped diffs are comment-only (zero behavior change).
Diffs surgical, gitignore covers secrets. Committing to main.
Committed as `92f7d0ce` on main. Now the push via the SSH wrapper — checking the existing shim state first.
Deploying the paramiko shim outside the repo and materializing the operator key.
Shim deployed, key parses. Dry-run, then the real push.
The dry-run authenticated — but its output echoes a push line, so let me verify the dry-run semantics before the real push.
Dry-run clean (git push --dry-run — remote untouched). Now the real push.
Pushed and verified (remote @ 92f7d0c == local HEAD). Now shredding the operator key per the runbook.
**Session 276 (R-73) — delivered and pushed to `main` as `92f7d0ce`** (remote ref verified by the wrapper, tree clean, key shredded).

**Verified evidence:**
- **Intake & baseline** — workspace reset; fresh clone at HEAD `009f5035`; environment rebuilt cold (bun install, `.env` on the `file:../db/custom.db` contract, db push + seed, census MATCH). Cold baseline gate reproduced the v2.72.0 ship state exactly: lint 0/0 · tsc 0 · 1997 unit · build · smoke 15/15 · 161 e2e.
- **Standing asks** — probe:ref STABLE on every layer (bundle + stylesheet md5s, demo-data ZERO, desktop nav 256px · 9 links); mobile nav verified on BOTH sides at TRUE 390×844 (no Tailwind v4 regression); `bun audit` unchanged; neo-crm unchanged; SEO green (sitemap/robots/manifest + pins); `.env.example`, `db/` at root, vitest/playwright configs standing.
- **Audit** — three Mode-C passes, every claim re-verified at file:line: 0 Critical / 0 High / 0 Medium / 5 Low / 7 Informational; the API layer's 29th consecutive clean bill.
- **TDD cures** — flagship **F-276a**: the plan's own §5 execution-history table never rendered as a table (GFM structure broken, the v2.47.0 row 3 cells short) — repaired with the row's cells restored from the session-250 record. Riders: **F-276b** ten §2 rows' pipes escaped + a whole-doc per-table census pin · **F-276c** the R-72 phantom modal-rationale comment landed at the three open-state a11y legs · **F-276d** the api.ts fifteen-route census truth · **F-276e** the AGENTS design-target/floor pointer.
- **Gate** — parity-276 born honest RED 11/11 → GREEN; **2008 unit (128 files, +11) · 161 e2e · smoke 15/15 · census MATCH**; captures 272–274 live-asserted in `docs/screenshots/`; docs lockstep complete (trio advance v2.71/72/73.0, README status row, `docs/session_135.md`, worklog Task 276).

Next round defaults to findings-led iteration — re-send the standing directive to continue the rhythm.
