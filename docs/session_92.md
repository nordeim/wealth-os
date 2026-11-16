I'll start by internalizing the operating instructions and setting up the workspace. This is a large, multi-phase task, so let me create a structured plan first.
Repo cloned, on `main` branch. I can see it already has some structure (vitest.config.ts, playwright.config.ts, .env.example, db/). Let me review the key documentation. Given the large file sizes, I'll use a mix of direct reads and parallel subagent analysis.
The repo is a Next.js 16 + React 19 + Prisma/SQLite app with extensive prior sessions (90+). Let me read the core docs directly.
Solid understanding forming. Now let me read the session docs and recent worklog entries.
The rhythm is clear: this is repo session 254 (R-51), continuing the findings-led iteration pattern. Let me read AGENTS.md and the skills catalog.
Now let me examine the remediation plan structure and the latest state, then set up the environment.
Now let me set up the environment. First check bun, .env, and the SSH wrapper runbook.
The `.env` is missing (workspace reset). Let me create it and install dependencies.
Environment standing: census MATCH (80/4/3/6/5/7, users=1). Now the cold baseline gate — lint, typecheck, unit tests first.
Lint 0/0 · tsc 0 · 1712/1712 unit (105 files). Now build + smoke.
Build clean (4 documented Turbopack warnings), smoke 15/15 — SEO surface verified (leg 12: sitemap+robots+manifest 200). Now the e2e battery.
Playwright browsers missing (infrastructure, not source debt). Installing:
Cold baseline gate GREEN at HEAD 0d236d3: lint 0/0 · tsc 0 · 1712/1712 unit · build · smoke 15/15 · 152/152 e2e. Now the standing asks: `bun audit`, neo-crm upstream check, and the reference drift probe.
All standing checks pass: audit unchanged (1 moderate dev-chain minimatch, documented deferral), neo-crm unchanged (b3d0fbe), reference STABLE on every layer. Now the mobile-navigation comparison at TRUE 390×844 via agent-browser. Let me check the tooling.
Let me review the agent-browser skill from the repo's skills folder, as the user directed.
Let me check agent-browser's viewport/screenshot syntax, then write the atomic mobile-nav comparison script.
Minor quoting artifact in the eval output. Fixing:
The snapshot uses `[ref=eNN]` format, not `@eNN`. Fixing the extraction:
The snapshot ran before the page rendered (timing race). Let me add render-wait polling to the script:
Mobile-nav comparison PASS at TRUE 390×844 on both sides: reference menu opens with 9 destinations + Sign Out; clone carries identical destinations + the labeled superset (aria-expanded flip on close). Both captures valid PNG at 390×844. Let me visually verify the captures.
The reference rendered LIGHT (79.5%) while our clone rendered DARK (70.3%). Per the documented posture, the reference's fresh-visitor default is dark — let me check whether the reference's theme posture drifted vs the committed session-253 captures.
The committed session-253 captures show the same posture (reference light for this account, clone dark = documented fresh-visitor default). The reference drift probe already verified all layers STABLE. Let me check the pixel-diff magnitude between my captures and the committed ones.
Clone capture 99.1% deterministic (0.9% header-area variance); reference's 9% is live-content noise (probe:ref already verified layer-level stability). The standing ask is verified: mobile menu works as expected on both sides, parity + superset, no Tailwind v4 regression.

Now the fresh-eyes audit — three Mode-C passes. Let me identify the R-50 cure surfaces first.
I have the six R-50 cure surfaces. Now dispatching the three parallel Mode-C audit passes (per the house rhythm: R-50 cure surfaces · API/auth/security · UI/a11y/shell).
All three audit passes returned. Summary: R-50 cure surfaces 6/6 HOLDING; API/auth/security layer SEVENTH consecutive clean bill; UI/a11y/shell layer clean. New findings: 2 Low + 2 Informational (e2e-battery comment accuracy + pin authoring) + 1 Informational (store subscription idiom). Per the house discipline, let me re-verify every material claim at file:line myself before planning.
Finding 1 VERIFIED: burns in order are #1-3 UI (:178,:267,:343), #4-6 API (:350,:357,:366), #7 recovery (:414), #8 revoke (:499) — the comment at :400 claims "EIGHTH" for the recovery leg, which is actually the SEVENTH. Now Finding 2:
Finding 2 VERIFIED: the bucket legs (:541-648) are above the comment (:760-772). Now Finding 3 and 4 — the parity-253 pin authoring:
Findings 3 VERIFIED at parity-253.test.ts:151-152 (the `[^}]*` regex cannot cross a nested brace; `toBeGreaterThanOrEqual(3)` keeps passing on stale matches if a future nested arm is added). Now let me check Finding 4's anchor claim in the actual leg:
Finding 4 VERIFIED: the pin's `toContain("no account")` matches the historical narrative parenthetical at :599, not the premise sentence ("NO account at all" — uppercase, :594). Now AUDIT-3's INFO-1 — the store subscription idiom:
All five findings verified at file:line. Now let me do the deeper sitemap/SEO check (beyond smoke leg 12's 200s) and verify the captures-db hygiene, then write the remediation plan.
Sitemap/SEO verified: 9-URL reference-parity sitemap (capital twins, priority formatting preserved), byte-verified robots, manifest, all test-pinned. Now let me study the remediation plan's version-block structure and the docs-counts guard to write v2.51.0 correctly.
I notice the guard's pin lines show v2.50.0 repeated four times (48, 49, 50, 50, 50, 50). Let me check whether this duplication is a session-253 defect:
**New discovery (my own, verified via git):** session 253's guard-trio advance introduced a duplication defect — the pin lines are [v2.48.0, v2.49.0, v2.50.0, v2.50.0, v2.50.0, v2.50.0] (the v2.50.0 line pasted 4×; R-49's correct form was 3 distinct lines). Functionally benign today but a pin-hygiene defect. That's F-254f.

Let me check for pins that watch parity-253/auth.spec comments and the parity-229 scanner heuristic before writing cures.
The census pins in parity-253 assert `toContain("EIGHT")` — my F-254a rewording must keep an uppercase EIGHTH (for the revoke leg) so the existing pin stays green without recalibration. Now let me check the docs-counts family/arithmetic legs to plan the count ladder correctly.
Now I have the complete picture. Let me survey all live-tense count sites across the doc set for the count ladder.
Let me verify a suspicious pattern I noticed: the README program row appears to repeat the session 253 summary text multiple times.
**Another new discovery (F-254g):** session 253's README program row pasted the R-50 summary THREE times (vs. the correct 1× at the prior commit). Same genus as the trio's 4× duplication — session 253's lockstep script had duplicated insertions. Let me sweep all docs for this duplication genus:
The PAD carries `[SR] v2.50.0` three times while v2.49.0 appears once — asymmetric. Let me inspect:
**CONFIRMED — the PAD's v2.50.0 block appears 3× in the revision list** (lines 19, 75, 131 — each a full ~56-line block; v2.49.0 correctly appears 1×). The duplication genus from session 253's lockstep has three carriers: the docs-counts trio (4×), the README program row (3×), and the PAD revision list (3×). Let me check the plan header and verify the duplicated blocks are byte-identical:
The plan's header "Previous version: v2.40.0" is the historical preamble (the live pointer is the "Current version" block at line 1524) — not a defect. My findings set is now complete: **6 Low + 2 Informational**, with F-254f/g/h forming one genus (session 253's lockstep duplicated insertions at three sites: docs-counts trio 4×, README program row 3×, PAD revision list 3×).

Let me study the captures convention, then write the remediation plan v2.51.0.
Now I have all the forms. Let me write the remediation plan v2.51.0. First, locate the insertion points:
Now I'll write the remediation plan v2.51.0 — the R-51 section with the findings ledger, register rows, and execution plan. Writing the section content first:
Plan applied. Now R-51.1 — the parity-254 pin battery born RED. First, check the scanner's UTILITY_HEADS to write safe comments:
Now let me check the parity-229 walker's actual scan scope (src-only or tests too), then write the parity-254 battery:
Walker scope confirmed: src/ only. Now writing the parity-254 pin battery (R-51.1 — born RED):
I have a slice bug in F-254c — the end mark "describe(" matches at the start position itself. Fixing with comment-section anchors:
Now the honest-RED proof — running the parity-254 battery at baseline (every pin must fail for the expected defect, not a harness error):
**HONEST RED: 8/8** — every pin fails for exactly the expected defect. Now R-51.2 — the cures. First the five source edits (F-254a/b/c/d/e):
Now F-254c and F-254d — the parity-253 pin edits:
Now F-254e — the store docblock blessing:
4 pins GREEN (b/c/d/e), parity-253 and parity-229 unregressed. F-254a still failing — let me inspect:
The phrase wraps across comment lines. Fixing the pin to anchor the single-line form:
5/8 GREEN. Now the docs lockstep (F-254f/g/h cures + count ladder). Let me study the PAD v2.50.0 block's full form for replication:
Before the docs lockstep, let me confirm the new unit count by running the full suite (docs-counts still passes since docs match its current constants):
Count confirmed: **1720 checks / 106 files** (1717 pass + 3 expected docs-lockstep REDs). Now the full docs-lockstep script:
The block boundary is wrong — each block ends at the next `- [SR]` line, not at v2.49.0. Fixing:
The collapse only removed one of two duplicate copies. Fixing the removal logic:
The failed run may have partially applied PAD edits. Let me check the PAD state before re-running:
PAD fully applied in run 2; README onward not yet. Making the script idempotent so re-runs skip completed sections:
The if/else is broken structurally. Since PAD is already fully applied, let me verify all its count sites landed, then simplify the script to run only the remaining sections:
All PAD sites landed. Fixing the script's idempotency cleanly:
Indentation is still broken. Rewriting the script cleanly — PAD section becomes a verification-only check:
All lockstep edits applied. Now the GREEN proof — full unit suite:
The known lockstep companion — parity-243's mirror pin needs same-commit recalibration (the F-247d precedent, documented in session 253's transcript). Let me examine it:
The mirror pin needs its fifth same-commit recalibration (F-247d precedent). Updating:
**GREEN: 1720/1720 unit / 106 files.** Now lint, typecheck, build:
Full gate GREEN: lint 0/0 · tsc 0 · 1720/1720 unit · build · smoke 15/15 · 152/152 e2e · census MATCH. Now the six parity drift gates (the ship verification — the reference is reachable):
All six parity drift gates CLEAN. Now the captures 216-218 — let me study the full captures-253 convention:
Now let me check the script-guards pin (new capture tools may need registration):
The captures tools aren't in the standing census — no pin update needed. Writing captures-254.ts:
All three captures landed with live assertions and the census tripwire passed. Validating the PNGs:
All captures valid. Now checking tree hygiene — what session scripts get committed per house convention:
House convention confirmed: capture tools + session record + worklog get committed; one-shot lockstep scripts stay scratch. Cleaning up and re-running lint/tsc with the new captures script present:
Now the worklog entry and session record:
Now the session record (docs/session_91.md):
Now the final verification — full unit suite (worklog/session records added after the last run):
1720/1720 + docs-counts 17/17. Let me verify the PAD revision list structure and move the scratch scripts out of the repo:
All structures verified. Now let me read the SSH wrapper runbook before committing:
I have the runbook. Now let me check the ssh binary situation and prepare the commit:
No ssh binary and no paramiko (workspace reset). Deploying the paramiko shim per the runbook's Appendix A:
Shim deployed. Now the commit — staging the round's intended files:
Commit 47a0688 on main. Now the SSH-wrapper push — materializing the key, dry-run, then push:
Dry-run clean — authentication verified, fast-forward 0d236d3..47a0688 negotiated. Real push:
**Session 254 (R-51) delivered — pushed to main at commit `47a0688`, remote ref verified by the SSH wrapper, key shredded, working tree clean.**
**Session 254 (R-51) delivered — pushed to main at `47a0688`, remote ref SSH-wrapper-verified, key shredded, tree clean.**

**Round narrative:** After re-cloning the reset workspace and standing up the environment (census MATCH), the cold baseline gate reproduced the v2.50.0 ship state exactly (lint 0/0 · tsc 0 · 1712 unit · build · smoke 15/15 · 152 e2e). All standing asks verified: reference STABLE on every drift layer, `.env`/db contract standing, sitemap/robots/manifest green, `.env.example` six-knob set intact.

**Mobile navigation (the explicit ask):** compared at TRUE 390×844 on BOTH sides via agent-browser — the reference drawer (9 destinations + Sign Out, X-toggle close) and our drawer (identical destinations + the labeled superset: skip link, nav landmark, aria-label hamburger, aria-expanded flip). **Parity + superset, no Tailwind v4 regression.**

**The audit (3 Mode-C passes):** R-50 cures all holding; API layer's 7th consecutive clean bill; UI source clean. New findings: 0 Critical / 0 High / 0 Medium / 6 Low / 2 Informational — headline was a **genus I discovered myself**: session 253's docs-lockstep had duplicated insertions at three sites (guard-trio pin 4×, README program row 3×, PAD revision block 3× byte-identical), invisible to every gate because no pin watched occurrence multiplicity.

**R-51 TDD execution:** 8 pins born honest-RED → 8 cures (census ordinal, spatial word, exact-count pin form, premise anchor, docblock blessing, trio advance+dedup, program-row collapse, revision-list dedup) → **GREEN 8/8**. Structural rider: the parity-254 no-duplicate invariant battery — a future lockstep duplication now fails `bun run test`.

**Verification:** lint 0/0 · tsc 0 · **1720 unit (106 files, +8)** · build · smoke 15/15 · **152 e2e** · **all six parity drift gates CLEAN** · census MATCH · captures 216-218 (own-db convention, live-asserted) + both comparison captures. Docs lockstep complete across all six documents + plan v2.51.0 + worklog + session_91.

To continue the rhythm, re-send the standing directive.
