The clone succeeded and I can see R-33 (`60ae3a7` + `0773de0` session log) is already on the remote — the previous round's commit+push landed. Now this message kicks off the next round. Let me set up the full plan.
R-33 shipped completely (50 files, screenshots through #151, .env.example, docs). `0773de0` added `docs/session_56.md` afterwards — that's the newest doc to review. Starting Phase 1.
session_56.md confirms R-33 shipped as `60ae3a7`. This round is the next iteration (session 237 / R-34). Let me set up the environment in the background while reading the docs.
Install is running (network-dependent). While waiting, let me read the skills catalog and web-application skill for the audit phase.
The background install died. Running it in the foreground with a proper timeout.
Census MATCH (78/4/3/6/5/7, users=1) — the recorded state. Starting the cold baseline gate.
Unit suite green: 1391/1391 (84 files) — the recorded ship state. Now the build leg.
Chromium isn't installed in this fresh sandbox. Installing it.
**Cold baseline gate GREEN at HEAD `0773de0`**: lint 0/0 · tsc 0 · 1391/1391 unit (84 files) · build · smoke 15/15 · 142/142 e2e. No cold-baseline discovery — the v2.33.0 ship state reproduced exactly. Now the standing asks.
`bun audit`: 1 moderate (the documented minimatch dev-chain residue — unchanged). Now the reference stability probe.
Reference STABLE on all layers, including the TRUE-390 mobile menu with 9 links (the operator ask). Now the neo-crm upstream check.
neo-crm upstream unchanged (b3d0fbe) — nothing to port. All standing asks verified. Launching the three fresh-eyes Mode-C audit passes as parallel subagents.
All three audit passes are back. Raw tally: **0 Critical / 1 High / 3 Medium / 8 Low / 12 Informational** (one Medium deduped across passes A/B — the transient-arm family gap). Now re-verifying every material claim at file:line myself before planning.
HIGH-1 confirmed at file:line — the store's non-401 branch (line 219-221) leaves `user` at its initial `null`, so the shell gate (line 61) fires before the error banner can render. Now verifying the transient-arm claims.
C-1 confirmed — two AppShell tree positions (`src/app/page.tsx` root + `(app)/layout.tsx`) with post-login landing on `/`. Now checking the pins that will need recalibration for the planned cures.
All material claims verified at file:line. The audit consolidates to: **0 Critical / 1 High (F-236f regression: the revocation gate swallows the first-load error face) / 3 Medium / 8 Low**, plus the informational tail. Now writing the plan v2.34.0 into the remediation plan.
Writing the plan v2.34.0 — header, ledger rows, R-34 section, §5 row.
Header done. Now the F-237 ledger rows.
Now the R-34 section and §5 execution history row.
The §5 table is forward-chronological — my row landed at the top instead of after v2.33.0. Fixing.
The §5 row is placed. The tail note still references session 236 — updating.
Plan v2.34.0 written. Now R-34.1 — writing the pins born RED. First studying the existing test forms.
Now writing the pin file `tests/parity-237.test.ts`.
Now the behavioral battery `tests/store-hydrate.test.ts`.
Now the e2e 500-hydrate leg.
All pins written. Verifying they're born RED against the pre-cure tree.
19/21 parity pins RED as designed. Two pins need attention: the refreshAll-mirror regex matched hydrate's existing branch (ambiguous), and the mid-session-500 genus guard failed unexpectedly. Diagnosing.
Two test-authoring bugs on my side: shared `Response` objects get their bodies consumed on first read (must be factories), and the refreshAll-mirror regex matched hydrate's existing branch. Fixing both pins.
**Honest RED: 26 RED** (21 parity-237 + 3 schema riders + 2 store behavioral) **+ 4 genus guards green by design.** Now the e2e RED proof against the standing pre-cure build.
E2E leg RED against the pre-cure build (bounced to the login wall) while the standing 401 leg passes — the honest proof. **R-34.1 complete.** Now R-34.2 — the cures. Starting with F-237a/F-237c (the store + shell).
No cycle risk. Applying the store cures (F-237a refreshAll branch + F-237c remount entry).
Now the shell gate (F-237a).
F-237a applied. Now F-237b — requireSession's catch first.
Now the six auth routes. Let me check their import blocks and catch forms first.
F-237b applied. Now F-237d — the upload route wrap.
F-237d applied. Now F-237e — the five trim-aware guards in schemas.ts.
F-237e applied. Now F-237f — the import pending face.
F-237f applied. Now F-237g — the refresh riders.
F-237g applied. Now F-237h — the redirect-face live-region seed.
F-237h applied. Now F-237i — the register completion.
Now the same-commit pin recalibrations — parity-236's F-236f gate pin and F-236c preprocess pin, parity-217's F-217k entry pin.
All cures and recalibrations applied. Verifying the pins flip GREEN.
Six pin-authoring issues to fix: the globalThis store singleton persists across tests (needs explicit reset), the api.ts arm form ends `) };` not `);`, and three phrase pins trip on prettier's line wrapping (the house's s198/F-230e lesson).
Now the store singleton reset in store-hydrate.
`require()` won't work in vitest's ESM context — fixing to the dynamic-import form with the key drop.
The comment marker `//` survives plain whitespace collapse — using the comment-continuation collapse instead.
All pins GREEN, tsc 0, lint 0/0. Running the full unit suite to surface interactions.
Two anticipated same-commit recalibrations. Reading both pins.
**1421/1421 unit green (86 files)** — the carrier invariant holds over the cure comments. Rebuilding and running the e2e battery.
**143/143 e2e** — the RED-proven 500-hydrate leg is GREEN on the cured build. Now smoke + census + the six drift gates.
The new leg passed standalone but failed inside the full battery — checking the page state at failure.
A strict-mode violation — Next's `__next-route-announcer__` also carries `role="alert"`. The bare locator is never unique on app pages; filtering by text.
143/143. Now the six parity drift gates.
**All six parity drift gates CLEAN at 0-event margin** — the cures touched no census-visible surface, as designed. Full offline gate + parity chain complete. Now the captures — studying last round's capture script to mirror the house pattern.
Writing this round's capture script — 152 (drawer, standing ask), 153 (the 500 error-banner face), 154 (the 503 transient face).
Lint clean. Running the captures (spawns its own dev server on captures.db).
All three captures verified in-DOM, census tripwire MATCH. Now the VLM verification pass.
Pixel-verified non-blank. The house doctrine also runs a VLM pass — checking the vlm skill's CLI form.
The SDK isn't in the repo's node_modules. Setting up a scratch VLM verifier outside the repo (the repo's manifest must not change).
All three faces VLM-verified. Now the docs lockstep — running docs-counts to enumerate stale sites.
docs-counts unexpectedly passes — reading the test to understand what it verifies.
The pins hard-code constants that must move with the docs in the same commit. Enumerating every stale site.
Now applying the full docs lockstep with an assert-each-replacement script.
docs-counts 13/13. Now pass 2 — the narrative lockstep. First the README program row.
Now the PAD revision block entry.
Now the AGENTS.md gotchas — four new lessons from this round.
Now filling the ship counts into the plan's §5 row and R-34.3.
Now the worklog entry and the session record.
Now the formal session record `docs/session_57.md`.
Session record written. Running the final full offline gate before the commit.
**Final full offline gate GREEN.** Now tree hygiene and the commit. First the runbook.
Key-scan matches are the pre-existing redacted/demo blocks only. Staging and committing the atomic execution commit.
Commit `eeabf52` on main. Now the push — reading the runbook first.
Runbook internalized. Deploying the key, the paramiko shim, and running the dry-run.
Key parses (ed25519). Now deploying the shim outside the repo.
Dry-run green — remote at `0773de0`, fast-forward to `eeabf52` approved. Real push.
Session 237 (R-34) is complete and pushed. The delivery report:

## What was done

**Intake & standing asks** — Fresh clone at HEAD `0773de0`; workspace rebuilt (.env with the `DATABASE_URL="file:../db/custom.db"` contract, db push/seed, census MATCH 78/4/3/6/5/7). Cold baseline gate reproduced the v2.33.0 ship state exactly: lint 0/0 · tsc 0 · 1391 unit · build · smoke 15/15 · 142 e2e. All standing asks verified: reference STABLE (**TRUE-390 mobile menu opens with 9 links** — the operator ask), `bun audit` unchanged, neo-crm unchanged (nothing to port), SEO green, vitest/playwright configs and `.env.example` standing.

**Fresh-eyes audit** — Three Mode-C passes: **0 Critical / 1 High / 3 Medium / 8 Low / 12 Informational**, every claim re-verified at file:line. The High was a **regression shipped inside R-33's own cure** — live-reproduced by the audit against the standalone.

**R-34 cures (TDD — 26 pins born RED; the 500-hydrate e2e leg RED-proven against the pre-cure build)**: the **error-face restoration** (F-237a — the F-236f gate keyed on storeUser-null, but the store's failure branch also leaves user null on first load, so any 500/503/network drop bounced a valid-session user to the login wall with the error banner unreachable; the gate now fires only on the auth-specific signal, and the mid-session revocation window joins the wall); the **transient-seam completion** (F-237b — requireSession's catch + six auth routes gain the 503 arm); the **remount gate** (F-237c — the post-login `/` → first-sidebar-click transition stops flashing the loader and refetching everything); plus the upload wrap, whitespace-clear normalization, import pending face, refresh busy riders, redirect-face live-region seed, and register tail.

**Verification** — lint 0/0 · tsc 0 · **1421 unit (86 files)** · build · smoke 15/15 · **143 e2e** · **all six parity drift gates CLEAN** · census MATCH · audit unchanged. Captures **152-154** (drawer census, failure face, 503 face) in-DOM asserted, census-tripwired, pixel- and VLM-verified.

**Delivery** — Docs lockstep complete (README, AGENTS + 4 new gotchas, CLAUDE, PAD v2.34.0, SKILL, plan with R-34 closed, worklog, `docs/session_57.md`). Committed `eeabf52` and pushed to **main** via the SSH wrapper — remote ref verified == local HEAD (re-confirmed over HTTPS), key shredded, shim removed. No branches created.

**Recorded, not cured** (in the plan): F-237j-r plus the standing families. Next session defaults to findings-led iteration — re-send the standing directive to continue the rhythm.
