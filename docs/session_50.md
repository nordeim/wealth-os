Repo cloned successfully — this is a mature codebase (232+ sessions of prior work). Let me review the core docs now.
Now let me read the other core docs.
Let me check the current state via worklog and the latest session docs.
The codebase is at session-232 ship state (v2.29.0, R-29 done). Let me read the latest session docs — session_47 and session_48.
docs/session_48.md is the owner's log capture of session 232 — my session (233) continues the standing rhythm and will write session_49.md. Let me update my plan and start the environment intake while reviewing the remediation plan.
Install done. Now set up the environment: `.env` from `.env.example`, db push/seed.
I mistakenly shredded the file I just created. Recreating:
Census MATCH (78/4/3/6/5/7, users=1). Now install chromium and run the cold baseline gate.
Chromium-1254 installed. Now the cold baseline gate — lint and typecheck first:
1254/1254 unit green (79 files). Now the build:
Cold baseline gate fully GREEN (v2.29.0 state reproduced exactly). Now the standing asks — reference stability probe, bun audit, neo-crm upstream check:
The repo has the standing `drift-probe.ts` tool. Let me run it against the live reference:
Reference STABLE on all layers — including the TRUE-390 mobile menu with 9 destination links. Now `bun audit` and the neo-crm upstream check:
All standing asks verified. Now the fresh-eyes audit — three Mode-C passes in parallel (findings only, no fixes):
All three passes complete: **0 Critical / 0 High / 1 Medium / 5 Low / 10 Informational** raw. Now the driving-session discipline — re-verify every material claim at file:line before writing the plan:
C-1 and L-2(A) confirmed at file:line. Let me verify the InfoCallout definition and the other claims:
All material claims verified. `/api/reset` has no UI consumer (e2e-only utility — that adjudicates B-3 to "recorded deliberate posture"). Now let me study the cure-design dependencies:
Now let me study the remaining design dependencies — the verification seam, the reset-password e2e spec, and the parity-232 pin style:
I have the full validated picture. Now writing the plan v2.30.0 — first the F-233 ledger rows in §2:
Now let me read the R-29 section to match the plan format for R-30:
Now I'll write the plan v2.30.0. First the header version block:
Header updated. Now the F-233 ledger rows in §2:
Now the F-232j count correction (F-233i) and the R-30 section:
Now the R-30 section before §5:
Plan written. Now VALIDATE it against the tree — blast-radius sweep on the pins and sweeps my cures could touch:
Validation complete — the plan aligns with the tree (two pins need same-commit re-anchoring: parity-219 F-219v and the login-views comment). Now the TDD execution — first the RED pins. Let me check the login-card imports:
Now writing the RED pins — first the pure-seam behavioral battery:
Now the parity-233 source pins (born RED over the pre-cure tree):
Now the e2e leg for the reset-token strip (born RED):
Now run the pins to confirm they're born RED:
25 RED + 3 green-by-design genus guards. One failure is my own recursive genus — the F-232j correction note contains the word "fifteen" and trips my own pin. Rewording per the F-229d discipline:
14 RED + 4 green-by-design genus guards — the honest shape. Now the cures. **F-233a** — the pure seam in the verification lib:
Let me fix a misleading test name in my battery (the over-typed box now distributes, per the paste convention):
Now wire the login-card delegation — the handler and the import:
**F-233c** — the always-mounted status region in the verify view, InfoCallout becomes visual-only:
Now re-anchor the two existing pins that reference the old InfoCallout role (same-commit recalibration, per the house rule):
**F-233d** — the Settings Save guard:
The Save control is a plain `<button>`, not the `<Button>` component — fixing my pin to match the actual markup:
Good — the Save button is the only disabled-bearing match. Now **F-233e** — the import retry affordance:
**F-233f** — the reset-token URL strip:
**F-233g** — the upload breach-unlink isolation:
**F-233h** — the Suspense boundaries on login/signup:
**F-233b** — retire the orphaned dependency through the package manager:
Dependency retired cleanly. Now the low-tail riders — **F-233j** (amber-arm comment scope) and **F-233k** (select.tsx narration):
All cures executed. Running the new pins to confirm GREEN:
Three pin-regex failures — the `=>` arrow in the onClick breaks my `[^>]*` patterns. Simplifying to honest literal assertions:
All 18 GREEN. Now prove the e2e leg was born RED via the stash round-trip. First check how the e2e server boots:
The e2e rides the standalone build. Stash the cure, rebuild, prove the leg RED:
The honest RED confirmed. Restoring the cure and verifying GREEN:
The strip leg passes but the full round-trip broke. Investigating:
The round-trip leg pins the OLD contract (token visible in URL). Recalibrating it to the new strip contract:
All 10 pass. Now the full unit suite to find remaining interactions:
The recursive genus again — my comments literally name `useSearchParams`, tripping the route-case URL-state scan. Rewording per the F-229d discipline (describe, never cite):
1282/1282 green. Let me check why docs-counts didn't trip — it pins the old counts:
The docs-counts constants and docs are stale together — the lockstep comes after the gate establishes final counts. First lint + typecheck:
Lint 0/0, tsc 0. Update the docs-counts constants, then run the full e2e for the definitive count:
11 doc sites to chase. Enumerating every stale count site:
The §7.1 arithmetic: domain seams 3→4 (+verification-code), pins 51→52 (+parity-233), infrastructure 25 — total 81. Executing the doc chase:
Now executing all the doc updates:
7 sites left (PAD + SKILL + README F-204a sites). Fixing the PAD:
Now the SKILL file and the docs-counts pins-row assertion:
The test run is hanging — checking for stray processes:
Two left — the docs-counts pin itself needs the 52/parity-233 update, plus a SKILL site. Checking both assertions:
Now update the docs-counts pins-row assertion itself (51→52 + parity-233):
docs-counts 13/13. Now the full verification gate — R-30.3:
Full offline gate GREEN: lint 0/0 · tsc 0 · 1282/1282 unit (81 files) · build · smoke 15/15 · 140/140 e2e. Now the six parity drift gates:
The gate:full exceeds the single-command timeout — my wrapper killed it mid-sweep. Running the six sweep legs individually:
All six parity drift gates CLEAN at 0-event margin. Final verification — census + audit:
Now the captures. Studying the captures-232 convention first:
Writing captures-233.ts — the standing mobile-drawer ask plus the F-233a and F-233f cure faces:
Fixing the ambiguous label selector — capture 140 passed; 141 needs exact matching:
All three captures verified with in-DOM assertions; census tripwire MATCH. Visual spot-check of the two cure faces:
All captures verified non-blank with correct dimensions. Now the docs lockstep — first the README program row:
README program row done. Now the AGENTS gotchas — two new lessons from this round:
Now the PAD v2.30.0 revision block:
Now close R-30 in the plan and add the §5 execution row:
The row landed after the file's trailing blockquote — outside the table. Repositioning it right after the v2.29.0 row:
Row placed correctly. Now the worklog entry (prepended per convention):
Now docs/session_49.md — the session record:
Now the final full gate post-lockstep:
Complete final gate GREEN post-lockstep. Now the commit:
Commit f8f18d6 on main, tree clean. Now the push — reading the SSH wrapper runbook first:
Now materialize the operator key (outside the repo, 0600) and run the fingerprint sanity check:
Key parses cleanly (ed25519). Dry-run first — authenticates without touching refs:
Dry-run green — remote at 9747583, fast-forward to f8f18d6. Real push:
Session 233 (R-30) is complete and pushed. Here's the delivery report:

## What was done

**Intake & validation** — Fresh clone at HEAD `9747583`; workspace rebuilt (.env with the `DATABASE_URL="file:../db/custom.db"` contract, db push/seed, census MATCH 78/4/3/6/5/7). The cold baseline gate reproduced the v2.29.0 ship state exactly: lint 0/0 · tsc 0 · 1254 unit · build · smoke 15/15 · 139 e2e. All standing asks verified: reference STABLE on every drift layer (probe:ref — bundle md5 unchanged, **TRUE-390 mobile menu opens with 9 links**, the operator ask), `bun audit` unchanged (1 moderate dev-chain), neo-crm upstream unchanged (b3d0fbe — nothing to port), SEO surface green (sitemap/robots/manifest 200), `.env.example` six-knob set standing, vitest/playwright configs standing.

**Fresh-eyes audit** — Three Mode-C passes (R-29 cures · API/auth/security · UI/a11y/shell): **0 Critical / 0 High / 1 Medium / 5 Low / 10 Informational**, every claim re-verified at file:line; R-29's nine cures all held.

**R-30 cures (TDD — pins born RED, e2e leg proven RED→GREEN via stash round-trip)**: the **OTP paste/autofill distribution** (the Medium — autofill/paste of the full code collapsed to one digit and blocked submission; the pure `applyCodeInput` seam distributes it, no maxLength — a browser cap would truncate the paste); the orphaned `@radix-ui/react-label` dependency retired; the login info-callout live region (F-218h genus completed); the Settings save guard (no more defaults-over-stored-prefs overwrite); the import double-parse retired; the reset-token URL strip; the upload breach-unlink isolation; the auth-face Suspense boundaries; the low tail. The recursive F-229d genus was caught twice more in two new domains (plan-text + test-source-scan) — both reworded, one became a new AGENTS gotcha.

**Verification** — lint 0/0 · tsc 0 · **1282/1282 unit (81 files, +28)** · build · smoke 15/15 · **140/140 e2e** · **all six parity drift gates CLEAN at 0-event margin** · census MATCH · `bun audit` unchanged. Captures 140-142 saved to `docs/screenshots/` with in-DOM assertions (mobile drawer 390, the distributed OTP code, the stripped reset URL); census tripwire MATCHed.

**Delivery** — Docs lockstep complete (README, AGENTS, CLAUDE, PAD, SKILL, plan v2.30.0 with R-30 closed, worklog, `docs/session_49.md`). Committed `f8f18d6` and pushed to `main` via the SSH wrapper — remote ref verified (`f8f18d6` == local HEAD, re-confirmed over HTTPS), key shredded, shim removed.

**Recorded, not cured** (in the plan): the pre-parse rate-bucket burn (correct anti-brute-force order kept), the data-reset posture (no UI consumer), the theme one-paint residual, plus the standing family (incl. the whole-store/useShallow migration — 14 sites, still the dedicated-round plan). Next session defaults to findings-led iteration — re-send the standing directive to continue the rhythm.
