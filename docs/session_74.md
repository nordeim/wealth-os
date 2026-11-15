Repo cloned successfully — it's on `main` with extensive prior work (db/ folder, vitest/playwright configs, .env.example already exist). Now let me review the core documents.
This is a mature, heavily-remediated project (244 internal sessions, R-41 shipped, all gates green). Let me review CLAUDE.md and the latest session docs.
Now I understand the rhythm — this is a standing directive; I'm executing Session 73 (repo session 245, the R-42 round). Let me read AGENTS.md and the remediation plan structure.
Now let me examine the remediation plan's structure and the open findings ledger.
I now have the full house-convention picture. This session = repo session 245 (plan v2.42.0, the R-42 findings-led round). Let me set up the environment. First, check bun availability and the key configs while reading the skills catalog.
While the install runs, let me study the skills catalog and web-application skill for the audit methodology.
The background install died (sandbox process management). Let me run it in the foreground with a long timeout.
Census MATCH. Now install the Playwright chromium and start the cold baseline gate (lint → typecheck → unit).
chromium-1254 is needed (playwright 1.65); only 1200 is present. Installing:
Lint 0/0 · tsc 0 · **1581/1581 unit (95 files)** — the exact v2.41.0 ship state. Now the build:
**COLD BASELINE GATE GREEN** — v2.41.0 ship state reproduced exactly. Now the standing reference probe:
All standing checks verified (ref STABLE · audit unchanged · neo-crm b3d0fbe unchanged · SEO green). Now the fresh-eyes audit — dispatching three parallel Mode-C passes per house convention:
All three passes returned. Raw tally: 0 Critical / 0 High / 0 Medium / 7 Low / 4 Informational. Per house convention, every material claim must now be re-verified at file:line by the driving session before planning:
B-1 verified across all six public routes (burn before parseBody's content-type gate) vs the cured logout shape (content-type check first). Now verify the C findings (dead CSS carriers):
All three carriers verified in the built CSS. Now the key question — why did the parity-229 whole-tree invariant miss them? Let me examine it:
The parity-229 invariant misses bare (unhyphenated) single-word utilities — `isClassShaped` requires a hyphen or colon. That's the genus behind C-1/C-2/C-3. Now verifying the remaining material claims before planning:
All 21 lowercase sites enumerated. Now check the existing 429/content-type pins that the gate-order cure must preserve:
All e2e volleys use JSON content-type (Playwright auto-sets it) — the cure preserves every existing 429 pin. Now the api.ts gate form:
The cure design is clear — a shared `requireJsonContentType` seam mirroring logout's cured form. Let me check for existing ordering pins my cure might break:
Pins are compatible. Now a systematic probe: which bare-word utilities appear in src comments (dead carriers) — the evidence base for the parity-229 hardening:
"lowercase" reads as LIVE in my probe — a string literal somewhere. Let me find it:
My probe flagged "lowercase" as LIVE — contradicts rg. Let me find the code-site token:
The inline script's shell quoting broke. Let me instrument the probe file directly instead:
"lowercase" is LIVE via a string in csv.ts — that string itself is a content-scanner carrier. Let me see it:
The probe exposed a second blind spot: csv.ts line 44's regex-literal quote makes the splitter mis-swallow later comments as "code" (fake liveness). Let me now get the emission-verified single-word utility set from the built CSS:
The probe exposes more dead carriers than pass C found: `inline`, `invisible`, `grow` are comment-carried, NOT in live tokens, and emitted in the built CSS. Let me verify each precisely:
The emission-verified dead-carrier census is larger than pass C found — 6 words: `antialiased`, `flow-root`, `lowercase`, `inline`, `invisible`, `grow`. Let me enumerate the line-level carriers:
tw-animate.css's `@theme inline` is a CSS at-rule (not a class usage). The bare "inline" occurrences are all comments. Now enumerate `invisible` and `grow` carriers:
Let me check for existing pins that grep the comment strings I plan to reword, and pins on the six public routes' burn positions:
The parity-241 head pin stays compatible (gate isn't a rateLimit call). Check uploads GET ordering pins:
All claims verified. Now let me study the house's plan-insertion script convention (docs-244.py) before writing the plan:
Now let me look at the F-243a volley canary e2e pattern to mirror for the F-245a canary:
All anchors verified. Now writing the plan v2.42.0 into the ledger via the house assert-each-insertion convention:
Plan written. Before R-42.1, I must resolve the "lowercase" fake-liveness attribution (it affects the parity-229 leg's honesty). Let me instrument:
The docblock terminates early at a `*/` inside its text — the F-224v(a) genus in a TS docblock. Let me find the early terminator:
The docblock is cut mid-sentence at offset 10350 — a `*/` sequence inside the prose. Let me see the exact text:
The design is settled (splitter mis-track documented, not fixed — blast-radius doctrine). Now **R-42.1 — the pins born RED**. Let me study the house pin style first:
Now writing the R-42.1 pins born RED — first `tests/parity-245.test.ts`:
The F-245b/c/d meta-pins I wrote are prose-satisfiable (the F-244e trap). Let me fix — keep only strong source pins in parity-245, put the real legs in docs-counts:
Now add the e2e volley canary to wealthos.spec.ts:
Now the docs-counts legs. Let me review its current structure:
Now the docs-counts edits — trio advance, PAD hierarchy leg, §7.1 rows + arithmetic. First the trio:
Now update the §7.1 family-row pins and add the new legs:
Now add the new legs at the file's end:
Now add the BARE_UTILITY_WORDS leg to parity-229:
All RED pins written. Before the RED proof, check whether any existing pin counts test files on disk (my new file changes the disk count):
Now the RED proof — run the pin batteries against the pre-cure tree:
FALSE GREEN caught — `COMMENT_TOKENS` only collects class-shaped tokens, so bare words never enter the map (my own F-244e lesson). The leg must derive its own unfiltered comment tokens:
Honest RED: 21 offender sites. Now the docs-counts RED proof:
docs-counts RED captured (3 failed: rows 62≠65, hierarchy 93≠95, arithmetic 92≠95; the trio advance green-by-design). Now the e2e canary RED proof:
**E2E canary RED confirmed: Received 429 vs expected 401** — exactly the predicted pre-cure failure. Honest RED tally: 11 RED + 1 green-by-design. Now **R-42.2 — the cures**. First the flagship gate-order cure — the seam in api.ts:
Seam landed. Now wire the six public routes — login first:
Six routes gated. Now the uploads GET reorder:
F-245a complete. Now F-245f — the health docblock:
Now the PAD corrections (F-245c/d):
PAD corrected. Now the F-245e reword pass — 46 sites. First the two single-site carriers:
The colon doesn't necessarily break the scanner's candidate — the token `flow-root` still appears. Safest is removing the token entirely. Fixing:
Still has the token — fixing properly with the two-word form:
Now the multi-site rewords. csv.ts first (3 lowercase sites):
Now the 9 aliases + 8 layouts — same phrase in each, batch edit:
Dashboard's alias doesn't carry the word — census is 8+8+5=21 ✓. Batch-edit the identical phrases:
All 21 lowercase sites done. Now the 15 inline sites — reading contexts in batches:
All inline clean. Now the 6 invisible + 2 grow rewords:
All 46 rewords applied. Now the GREEN proof on the pin batteries:
The 3 remaining failures are the expected lockstep-time legs (constants still 95/1581 — resolved at lockstep). Now the build probe — verify the six dead rules vanish from the stylesheet:
5 of 6 vanished but `.inline` still emits — a carrier outside src/. Let me find it:
Markdown is excluded. Check public/ and other actual content roots:
`next.config.ts` (root-level .ts — a content source) carries "inline". Reword it:
Still emitting. Scan every remaining non-gitignored root file:
The remaining candidates: the CSP `'unsafe-inline'` strings (un-rewordable — they're the security policy) and tsconfig.json. Let me determine empirically which extracts `inline` with a scratch Tailwind run:
The probe itself is broken (even a plain utility doesn't emit). Fix the probe setup first:
Direct approach — enumerate every tracked file (excluding excluded dirs) carrying the bare word:
tsconfig.json:16 is the only remaining text carrier. Reword it and rebuild:
**ALL SIX DEAD RULES VANISHED.** The census extended beyond src/ (next.config.ts + tsconfig.json carriers). Let me pin those root carriers and update the plan census:
Now update the plan/ledger census (46→49 sites, the walker-scope discovery) and the R-42 section:
Plan updated. Now the e2e canary GREEN proof:
Canary GREEN. Now the full unit suite for the lockstep counts:
The 4th failure is parity-243's own trio pin — the same-commit recalibration the house convention expects. Let me recalibrate it:
Now the lockstep. Let me enumerate the live-tense count sites via the docs-counts pins:
Full inventory captured. Now write the scoped lockstep script:
Two missed live-tense sites. Find them:
docs-counts GREEN. Add the two missed sites to the committed lockstep script (the F-245c lesson — no dropped legs):
Lockstep complete. Now the full gate:
**FULL GATE GREEN** — lint 0/0 · tsc 0 · 1591 unit (96 files) · build · smoke 15/15 · 151 e2e. Now the six parity drift gates:
All six drift gates CLEAN, census MATCH, audit unchanged. Now the captures — study the house's captures script convention:
Now write the captures script — three asserted faces (drawer standing ask, volley canary, uploads sibling):
The volley ran from `about:blank` (cross-origin fetch fails). Navigate to the login page first:
The 184 upload must ride the browser's automatic cookie jar (httpOnly cookies are invisible to document.cookie). Fix:
182+183 landed. Debug the 184 upload failure with the response body:
The binary PNG got corrupted through string serialization (byte 0x89 → UTF-8 two bytes). Check how captures-244 handled it:
Session 244 used FormData + File (binary-safe). Rewrite 184's upload:
All three captures verified. Now the PNG non-blank pixel check:
Visual spot-check on the standing-ask capture (mobile drawer):
In-DOM assertions + pixel checks are the evidence bar (per house precedent). Now the remaining docs lockstep — PAD revision block first:
Now the PAD v2.42.0 revision block:
Now close the plan (R-42 → Done, §5 gate row) and update the README program row:
Now the AGENTS.md gotchas (two new lessons):
Now the worklog Task 245 entry:
Now the session record `docs/session_73.md`:
Clean up scratch probes and run the FINAL gate:
**FINAL GATE GREEN** — lint 0/0 · tsc 0 · 1591 unit (96 files) · build · smoke 15/15 · 151 e2e. Now prepare the commit — check the tree and read the SSH push runbook:
Tree is clean — all changes wanted, ignore classes covered. Now read the SSH push runbook:
Runbook internalized. Now commit (the wrapper pushes commits, not the working tree):
Commit `aea2653` on main. Now deploy the key (outside the repo) and the paramiko shim:
Dry-run green — remote at 30a261d, fast-forward to aea2653 approved. The real push:
Push verified — remote ref == local HEAD, key shredded, main only, tree clean. Final safety verification of the commit contents:
The 3 matches are the repo's own documented demo seed credential (README quickstart convention) — no key material or real secrets. Everything is delivered. Updating todos and finalizing:
**Session 73 (R-42) shipped and pushed** — commit `aea2653` on `main`, remote ref verified over SSH, deploy key shredded, no branches created.

The round in brief: the fresh-eyes audit found 0 Critical / 0 High / 6 Low / 2 Info. The flagship **public-family gate-order cure** — the six public auth routes burned their per-IP rate-limit buckets *before* the CSRF content-type gate, letting a cross-site plain-text volley 429 a victim's real logins for renewable 15-minute windows; a shared `requireJsonContentType` seam now gates first, with the uploads GET sibling reordered the same way, and the canary proved it live (the pre-cure e2e RED received exactly 429; post-cure receives 401). Plus the guard-trio advance (the genus's third recurrence, cured first this time), the PAD hierarchy/§7.1 family-row truths with structural pins, the retirement of **six dead bare-word CSS carriers** (49 comment sites, including two root-config files the src-scoped walker can't see — all six rules proven vanished from the built stylesheet), and the health docblock truth.

Final gate: lint 0/0 · tsc 0 · **1591 unit / 96 files** · build · smoke 15/15 · **151 e2e** · six drift gates CLEAN · census MATCH · captures 182-184 in `docs/screenshots/`.

To continue the rhythm, re-send the standing directive — the next session defaults to findings-led iteration, with the guard-trio advance as its first docs act.
