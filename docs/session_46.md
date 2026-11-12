The workspace exists. Let me refresh it with git pull.
Workspace refreshed — the pull brought in the new `docs/session_44.md`. Let me set up the task plan and begin the document review.
session_44.md is the owner's log of repo session 230 (R-27, plan v2.27.0). Let me read session_43.md and the plan state.
Session 43/44 confirm: R-27 shipped, plan v2.27.0, no open R-item — this round is repo session 231 (findings-led). Now the core docs review.
AGENTS.md reviewed. Now CLAUDE.md and README.md.
README reviewed — R-27 state confirmed. Now the PAD's v2.27.0 revision block and SKILL structure.
The worklog confirms the session-230 state. Now the remediation plan's current state — header, R-27 closure, and the §5 tail.
Docs review complete — the plan is at v2.27.0, R-27 Done, no open R-item. This round is repo session 231 (findings-led). Now validating against the codebase: environment state first.
Environment intact from prior sessions. Running the census and checking the e2e prerequisites.
Census MATCH, port free, chromium ready. Now the cold-baseline gate — lint and typecheck first.
Unit suite: 1218/1218 (77 files) — exact v2.27.0 ship state. Now build + smoke.
Cold-baseline gate fully GREEN — the exact v2.27.0 ship state (lint 0/0 · tsc 0 · 1218 unit · build · smoke 15/15 · 138 e2e · census MATCH). Now the standing asks: reference probe, security audit, neo-crm upstream.
All standing asks verified: reference STABLE (mobile menu 9 links at TRUE-390), audit unchanged, neo-crm unchanged. Now the audit phase — loading the repo skills.
Skill absorbed. Now checking the skills-catalog for the relevant audit skills.
The audit pattern is set. I'll drive Pass A (R-27 cure surfaces) myself while dispatching Passes B and C as parallel Mode-C subagents. First, verifying the R-27 cures hold.
All R-27 cures verified in place — but I spotted something odd at ai-coach.tsx line ~48: `const [essages, setMessages]`. Let me check this precisely.
Line 48 looks malformed but the gate passes — let me inspect the raw bytes.
Raw bytes confirm the oddity — and lines 71 vs 112 reference both `essages` and `messages`. Let me read the full file to understand how this parses.
The Read tool shows valid code (`const [messages, setMessages]`) while bash pipes show `essages` — a suspicious discrepancy. Let me get byte-level truth via Python.
A serious anomaly: bash tools show corrupt bytes while Read shows valid code — yet all gates passed. Checking git's view of the file, which is decisive.
git HEAD also shows the corrupt bytes — yet gates passed earlier. Checking the file mtime and re-running typecheck right now to pin down when/whether this diverged.
The hexdump is decisive: the file bytes are `...20 63 6f 6e 73 74 20 5b 6d 65 73 73...` = `const [messages...` — **the file is valid**. The bash output layer eats literal `[m` pairs (an over-aggressive ANSI scrubber); the Read tool and all gates see the true bytes. Pass A verified: all five R-27 cures hold.

Now dispatching the fresh-eyes audit — Passes B and C as parallel Mode-C subagents.
Both passes are in: **B: 0/0/0 + 2 Low + 4 Info; C: 0/0/0 + 4 Low + 8 Info** — with the two B-Lows being audit-brief contract-text divergences (the repo's recorded design is public-capability-URL uploads GET and forgot 10/15; my brief misstated both — the code matches the repo's own documented contract). Now I re-verify every material cure claim at file:line before the ledger.
All claims verified. Now checking the day-of-week chart's provenance and the doctrine records for the dead-arms mapping.
The chart is the reference's own genus — the fill color needs a live-probe adjudication. Let me check the probe conventions and write probe-231.
Writing probe-231 — the day-of-week bar fill adjudication against the live reference.
The card wasn't found — need a broader dump to see the reference's actual analytics structure. Refining the probe.
The Overview tab shows only the trend chart + stat tiles. The day-of-week card must live on another tab — probing the Expenses tab.
The card is absent on every reference tab at zero data. Decisive check without mutating the reference: grep its JS bundle for the card title string and nearby fill colors.
Decisive: the reference bundle has **no** "Spending by Day of Week" card — it's our superset surface. The amber fill is our own mis-assignment (spending series should ride the expenses hue). Let me confirm the card's provenance in our tree.
The card is a session-199 superset surface; the fill is our own mis-assignment. Before curing, verify no e2e leg pins that bar's fill.
No pins on the fill — the cure is safe. Now the doctrine records for the dead-arms mapping and the seed docblock.
The doctrine mapping is set. One caution before retiring FilterPolygon — the S17-P2b note says the reference ships the old polygon glyph on its Filter buttons. Checking what our dashboard actually renders.
FilterPolygon is CRM-era dead code — the reference bundle has no polygon glyph, our dashboard imports no Filter icon. Checking the rest of icons.tsx before retiring.
icons.tsx is entirely dead (only exports FilterPolygon, zero importers). Checking test pins before designing the retirement.
No pins, no importers — retirement is clean. Now designing the auth-card focus cure; reading the view structure.
The focus-cure design is settled. Now examining the upload route catch and logApiError seam for the logging cures.
All cure designs are settled. Spot-verifying the remaining recorded-only claims (button/dialog/avatar dead arms) before writing the plan.
All claims verified. The findings set is complete — now writing the plan v2.28.0. First, locating the insertion points.
Writing the plan v2.28.0 — header surgery first.
Now removing the demoted v2.26.0 Previous block (v2.27.0 takes its place).
The header keeps a chain of Previous blocks — my removal was wrong. Restoring v2.26.0 in its proper place between v2.27.0 and v2.25.0.
The chain is restored. Now appending the F-231 ledger rows after F-230h.
Ledger rows in. Now the R-28 section after R-27.
Now the §5 execution-history row (counts will be corrected after verification if needed).
Plan v2.28.0 written. Now the TDD phase — studying the parity-230 pin form first.
Writing the parity-231 pins — born RED over the current tree.
16 RED / 1 green — the honest RED state. Checking which pin is green-by-design.
The RED state is honest: 16 RED cures + 1 green-by-design register guard. Now the e2e leg — checking the auth spec structure.
Adding the e2e focus leg after the signup-swap leg.
E2e leg in. Now executing the cures — F-231a first (the "$" glyph).
The pin's regex must be attribute-order-agnostic — fixing it.
Pin discipline holds (both forms RED pre-cure). Now F-231b — the login-card focus cure. Reading the exact regions.
Now the four h1s get the shared ref + tabIndex.
All four h1s wired. Now the reset-password-screen done swap.
F-231b complete. Now the batch of quick cures: z-pin, fill, TrendingDown, memo, peer.
Now the two API logging cures.
Now the F-231d retirement — deleting icons.tsx (the note is relocated).
F-231d done. Now F-231h — reading dialog.tsx fully for the retirement edits.
Making the F-231h edits to dialog.tsx.
MultiEdit is atomic — one block mismatched. Applying the edits individually.
Something's off — checking the actual bytes of the import block.
The MultiEdit was partially applied — checking the full current state.
The file shifted and the comma situation is odd — raw bytes to be sure.
The signature has no trailing comma — applying the remaining edits with exact current bytes.
dialog.tsx complete. Now page-layout.ts — retiring the two dead constants.
DIALOG_CONTENT is now flat — updating the .base consumer in dialog.tsx and checking for others.
Now the avatar.tsx retirement — keeping only the live seam.
The F-229d lesson bites again — my retirement notes quote the retired names and trip my own pins. Rewording the comments (the recursive-carrier discipline).
Now F-231l — the login-card trailing docblock.
The story is already folded at the img site — deleting the trailing orphan.
All cures applied. Running the pins for GREEN.
Pin bug — the capture group excludes the "z-" prefix. Fixing the assertion.
Dropping the unneeded `/s` flags (negated classes and `\s` already span newlines).
One more `/s` flag at line 115 — locating it.
Pins GREEN, lint/tsc clean. Running the full unit suite.
The parity-229 whole-tree invariant caught my cures: the z-50 re-pin orphaned two comments that cited `z-[60]` as live code, and my own `peer-*` comment is class-shaped. The F-229d doctrine applies — reword all three.
1235/1235 unit (78 files, +17). Now build + smoke.
Full offline gate GREEN — 139 e2e (+1). Now the six parity drift gates (they need the live reference).
The offline legs are already green — running the six drift gates directly.
All six drift gates CLEAN, census MATCH. Verifying the interior census result line and the audit state.
All gates green. Now the capture set — studying the captures-230 convention.
Writing captures-231.ts — the three R-28 faces on the own-database convention.
Face 135 caught a real defect — the dev server double-invokes effects (StrictMode), defeating the boolean mount guard. The e2e (production build) passed, but dev mode exposes it. Checking the config, then fixing the guard to compare values instead.
No explicit config — App Router defaults StrictMode on in dev. Fixing the guard to the value-comparison form (idempotent under double-invoke) in both files.
Updating the F-231b pin to the value-guard form.
All three faces verified — the value guard holds under dev StrictMode. Source changed after the last full gate — re-running the complete chain.
Full gate GREEN with the final form. Now the docs lockstep — checking the docs-counts constants first.
Updating the docs-counts pin constants (1235/139/78/50) and the pins-row list.
Walking the live-tense count sites across the five docs.
Two more stale sites in README and SKILL — finding the exact assertion texts.
docs-counts 13/13. Now the README R-28 program row.
Checking the row termination — my prepend may have merged rows.
The merged-row structure matches the existing README convention (each session prepends its entry into the standing row). Now the AGENTS.md gotcha.
The anchor was wrong — using the actual last line.
Now the PAD v2.28.0 revision block.
Now correcting the plan's verification counts and the F-231b StrictMode discovery.
Now the worklog entry and the session record.
Session record written. Now the final full-gate verification at the committed state.
Final gate GREEN end-to-end. Now the pre-commit hygiene check.
The tree matches the expected change set. Checking the R-27 commit split pattern for the probes.
Executing the three atomic commits per the house pattern.
Three atomic commits, tree clean. Now the SSH-wrapper push — reading the runbook first.
Runbook absorbed. Deploying the shim byte-for-byte from the runbook file (the session-230 lesson).
Dry-run green — clean fast-forward 80c07b3..40d8c7e. Executing the real push.
**R-28 shipped — repo session 231 complete, pushed, and verified** (remote `main` @ `40d8c7e` == local HEAD, confirmed independently over HTTPS; key shredded; tree clean).

**The round** (findings-led, no open R-item carried in): the cold baseline reproduced the v2.27.0 ship state exactly (lint 0/0 · tsc 0 · 1218 unit · smoke 15/15 · 138 e2e). The fresh-eyes audit (three Mode-C passes, 0 Critical / 0 High / 0 Medium / 8 Low / 12 Informational) had one claim **adjudicated by live probes + a bundle grep** — the Analytics "Spending by Day of Week" card is OUR OWN SUPERSET (probe-231/b/c walked the reference's four Analytics tabs at its standing zero demo data and grepped its 1.4 MB bundle: no such card exists there — the amber fill was never parity but our own palette mis-assignment) — and two API-pass "Lows" adjudicated as **audit-brief contract-text errors** (the uploads GET public posture and the forgot 10/15 bucket are the recorded contracts the code matches).

**Cured, all TDD** (16 pins born RED + 1 green-by-design genus guard + 1 e2e leg born RED): the Expenses dialog "$" glyph aria-hidden (the F-225k family complete); the auth-card view-swap focus (every transition lands focus on the new heading — the first boolean mount-guard design **fell to the dev server's StrictMode double-invoke, live-caught by the captures face** while prod e2e passed; cured to the value-comparison guard, a new AGENTS gotcha); the DropdownContent z-50 re-pin; the icons.tsx retirement (FilterPolygon + its false citation, N-89c6 note relocated); the day-of-week fill (the spending rose); the upload multipart log (the F-226c genus closed); the uploads GET ENOENT gate; the CRM-era dead-family retirement (five constructs + the Event/Activity citations reworded); the low tail. The parity-229 carrier invariant caught the round's own recursive genus twice — both reworded.

**Verified:** lint 0/0 · tsc 0 · **1235 unit (78 files, +17)** · build · smoke 15/15 · **139 e2e (+1)** · all six parity drift gates CLEAN · census MATCH · reference STABLE (mobile menu 9 links at TRUE-390) · `bun audit` unchanged · captures 134-136 committed with in-DOM assertions. Docs lockstep everywhere; plan at **v2.28.0**.

No open R-item — next session defaults to findings-led iteration; re-send the standing directive to continue the rhythm.
