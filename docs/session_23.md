I'll start by setting up my workspace and understanding the full scope of this task. Let me create a TODO plan first.
The repo is cloned. I notice both `.jsx` and `.tsx` page variants and lots of session docs. Let me read the core documentation files:
Now the Project Architecture Document (it's large, let me read it in parts):
Now let me read the wealth-os_SKILL.md (63KB - I'll read it in parts):
Core docs read. Now the remediation plan, worklog, and session docs:
The remediation plan is large (91.7KB). Let me read key sections strategically:
Now let me read the worklog to understand the session history and house patterns:
I have the full picture of the house pattern. My session is 219. Now let me review the skills catalog and key skills:
Let me examine the key skills mentioned in the task. First the web-application skill (the audit anchor):
Now let me clone neo-crm (for tech-stack patterns) and set up the wealth-os environment in parallel:
neo-crm patterns confirmed (same architecture family). Now let me set up the wealth-os environment:
Database seeded, census MATCH. Now the cold baseline gates:
817/817 unit tests pass. Now the build:
Version mismatch — the project's Playwright 1.65 needs chromium build 1254. Let me install it:
**Cold baseline gate FULLY GREEN**: lint 0/0 · tsc 0 · 817/817 unit · build · smoke 14/14 · e2e 97/97 — exactly the documented v2.15.0 state. Now the standing `bun audit` re-triage:
`bun audit`: 1 moderate (minimatch, range-unreachable) — the documented standing state, no new runtime advisories. Now let me probe the live reference site. First, let me check the house capture-script pattern:
Now let me look at the existing reference probe to follow the house pattern, then write my session-219 probe:
The repo has a standing reference-stability probe. Let me run it:
Reference is STABLE on all layers. Now let me start our dev server and write a session-219 side-by-side probe (reference vs ours) focusing on the user's parity asks:
The round-trip link resolved to a hidden nav (desktop sidebar hidden at 390px). Let me fix the selector to target only visible links:
The probe has selector artifacts (our header is `sticky` not `fixed`; the reference topbar is class-based). Let me check the captured screenshots and fix the probe:
Let me check how drift-probe.ts selects the hamburger (the proven approach):
Let me check our dashboard H1 implementation and verify the reference's H1 context with the VLM:
Let me use the VLM skill to inspect the captured reference dashboard screenshot:
**Major parity finding**: The reference `/Dashboard` renders in **dark mode by default** (html.dark, near-black page, white H1). Let me verify our app's default theme behavior:
Confirmed: reference defaults to **dark**, ours defaults to **light**. Let me check the login pages and our theme default logic:
The login pages match (both light), but the reference's **authenticated shell defaults to dark**. Let me probe the theme mechanics on both apps precisely:
Our default is "system"→light in headless. Let me write a precise theme-mechanics probe for both apps:
The reference's Dashboard is dark by default with **no localStorage theme key** — it's the authed-shell default. Let me probe the toggle behavior at mobile width where the sun button is visible:
**Theme parity decoded**:
- Reference: authed shell defaults **dark** (html.class="dark", body rgb(10,10,10)), persists choice server-side
- Ours: defaults **system→light** in headless, persists via localStorage

Let me check whether any prior session decided on the default theme question:
Session 217 explicitly deferred the default-theme question as "the documented F-205a posture — not reopening". Let me find F-205a:
F-205a documented the theme genus but the default was deferred ("not reopening"). With the user's explicit parity directive this session, this is now the headline R-item. Let me fix the parity probe's selector artifacts and get the complete comparison:
Revealing run — the reference now renders LIGHT because **my earlier theme probe toggled the demo user's server-persisted theme to light**. This confirms the reference persists theme server-side per user. I must restore the reference's standing DARK posture:
Reference restored to its standing DARK posture. Now let me dispatch the fresh-eyes audit (Mode C, three parallel passes — the house pattern):
Three audit reports returned: **0 Critical / 3 High / 11 Medium / 16 Low / 17 Informational** total. Per the house iron rule, I must verify every material finding at file:line before it enters the plan. Let me verify the key ones:
All four date-parsing findings VERIFIED. Now audit2's findings:
All VERIFIED. Now the critical adjudication — what does the REFERENCE's primary button actually look like? This decides the H-1 cure direction:
The probe matched the sidebar link. Let me refine to actual page CTA buttons:
**Major decode**: the reference's "Add Transaction" = amber gradient `rgb(245,158,11)→rgb(202,138,4)` with **stone-900 DARK text** (not white!). Let me check our primary button genus:
Our Add Expense is solid amber+white; the reference uses **rose→red gradient** for Expenses and **stone-900 text on amber** for Dashboard. Let me map the reference's full per-page CTA genus:
Shell quoting issue — let me use the Write tool instead:
The reference deploys a **per-page CTA genus**: amber+stone-900 (Dashboard/Accounts/Goals/Settings), emerald→teal+white (Income/Investments), rose→red+white (Expenses). Let me map ours:
Our CTA map vs reference shows systematic divergence. But first — why doesn't our axe battery flag the 2.15:1 amber+white buttons? Let me investigate:
**Mystery solved**: the a11y spec's sanctioned register cites "white-on-amber primaries — the reference's own palette" — but my live probe just proved the reference's amber CTAs carry **stone-900 text** (rgb(28,25,23)), not white. The citation is stale; the cure fixes parity AND AA together. Let me verify the remaining audit findings:
All verified. Now let me live-verify the drawer-clip finding (M-4) — critical for the user's mobile menu focus — at a short viewport:
**M-4 LIVE-VERIFIED**: Sign Out is unreachable at 390×667 and 844×390 (bottom at 787px, no scroll container). Let me check what the reference does at short viewports:
The reference has the same clip defect — so internal scrolling is a **functional superset** fix (like Escape-to-close). Let me check the remaining items — Analytics Export button and sitemap/SEO:
Sitemap/SEO is solid (live-verified parity, metadata-rich twins). Before writing the plan, I must check how the sweep's theme-match works — the default-theme change could affect the drift gates:
The sweep writes our theme explicitly to match the reference per page — the default change is drift-gate-safe. Let me check whether the e2e/a11y specs explicitly set themes:
The a11y main legs rely on default light — they'll need explicit light-setting in-commit. Let me check for other theme-dependent e2e assertions:
Let me verify the auth-face rendering when dark is stored (the state that exists today on logout):
Confirmed a latent bug: stored-dark on /login strands near-white body text on light bg. Let me check how the root `/` route handles the shell (it serves the dashboard to sessioned users):
I have the complete verified picture. Let me check the sweep re-derivation mechanism (needed for the plan since CTA changes move baselines):
All context gathered. Now let me write the remediation plan v2.16.0. First, let me check the exact structure for the plan edits:
F-218w's citation ("white bold label on primaries") is exactly what my live probe disproved. Now let me write the plan v2.16.0:
Now the findings ledger rows and the R-16 section:
Now the R-16 section itself:
Plan written. Now the mandated **plan-validation pass** — verifying every touch-point against the codebase. First the CTA sites and AppShell:
I notice possible display corruption in the AppShell output (`obileNavOpen`, `ydrate`). Let me verify the actual file bytes:
The file genuinely contains malformed code but the gate passed — let me investigate immediately:
tsc passes but the file shows invalid syntax — let me hexdump the region:
False alarm — the hexdump proves the bytes are correct (`const [m`obileNavOpen — the `[m`/`[h` sequences are being eaten by the tool-output display as ANSI codes). The file is valid; tsc passing confirms. Continuing plan validation — the CTA component sites:
All five section CTAs use the bare `<Button>` default. Let me check the Button API for className merging:
The Button API is clear. Let me probe the reference's dialog submit genus (the in-dialog "Add Account" buttons) before finalizing the cure design:
The reference's dialog submits carry the same per-page genus. Plan validated for CTAs. Now let me validate the rate-bucket pattern and remaining touch-points:
Plan validated — all touch-points confirmed. The storageState carries no theme (localStorage untouched by login). Now **Stage A: the RED pins**. First the theme-default pin:
Now the parity-219 pin file:
Now let me check the existing schemas and rate-limit test files to extend them:
The existing "three-state PUT" test codifies the buggy null→undefined behavior — it needs an in-commit update with the F-219q cure. Let me write all the extensions:
Now the e2e legs. Let me check the spec structures:
Now let me add the e2e legs and in-commit updates:
Now the mobile-navigation spec — the drawer scroll leg + the moon test update:
Now the a11y spec main legs — make the light theme explicit:
Now let me run the new pins to confirm they're RED with exact evidence:
**Stage A complete: 39 RED pins with exact evidence.** Now **Stage B — the cures**. Starting with A (the theme-default seam):
Now update the no-FOUC bootstrap in layout.tsx:
I need to fix the force-light logic — the auth face must override even a stored dark choice. Let me correct the seam, the pin, and the script:
Now fix the bootstrap script to match (auth faces force light unconditionally):
The 404/error pages now render html.dark by default — I need to handle their washes coherently. Let me check the logout flow and the standalone page washes:
The logout uses `router.push` (client nav) — the force-light needs a client-side seam too. The ThemeProvider pathname effect is the single clean point. Let me check the 404 layout classes first:
The 404/error pages ride explicit slate classes — readable under html.dark exactly as today. Now the ThemeProvider pathname effect:
Now update the pin to match the final design (provider seam, not AppShell):
Theme cure GREEN (10/10). Now **Cure B — the CTA genus**. First the token and page-layout constants:
Now the page-layout BUTTONS block — fix primary, retire the dead constants, add the CTA genera:
Let me fix the dead-constants pin (my regex was malformed), then apply CTAs to the section pages:
All 15 CTA sites cured. Now the ai-coach bubble, PeriodSegment, and filter badge:
Now update the stale a11y register arm (the citation retires):
Now **Cure C** (drawer scroll) + **Cure D** (date-seam completion) + **Cure E** (perceivability constants):
Now the analytics refs, goals card, and income label date cures:
Now **Cure E** — the perceivability constants and the dark-metadata sweep:
Now the display-text cluster (F-219k) and ring leftovers (F-219n):
Now **Cure F** (ai-coach live region) and the **InfoCallout** fix:
Now **Cure G** — the rate buckets. First the key collision, then the CRUD/read buckets:
The dashboard/export GET() signatures take no `req` — I must add the parameter:
Now **Cure H** — the remaining low tail (logout case, moneyField 2dp, nullable-clear, analytics empty states):
Now the analytics empty-state gates (F-219r):
Now I must close the ternaries after each chart's closing div:
Typecheck green. Let me run the full unit suite:
Three pin-literal refinements needed (my pins didn't match the actual forms) plus one existing pin to update in-commit. Let me find the 4th failure first:
**869/869 unit GREEN** (+52 checks / +2 files). Now lint + build + smoke:
11 e2e failures — let me inspect the failure details:
The test passes alone — the full-battery failures are shared-state exhaustion from my new rate buckets. Let me check the store's API call volume per page load:
Each page mount = 1 dashboard read; ~100+ across the battery → my 60/15min reads bucket exhausts. The bucket budget must respect the battery. Let me check the auth.spec failures too:
The auth failures are my InfoCallout role change — the specs target `getByRole("alert")`. Let me check the dark-default leg, then fix everything:
html.dark landed but the body's `bg-background` never flips (the shell wrapper carries the visible dark). My assertion targeted the wrong element — let me check the shell layout:
Now fix the auth.spec role="alert" targets and raise the read buckets to battery-safe levels:
Now raise the read buckets to battery-safe budgets (240/15min reads, 60/15min search):
The dashboard and export share the `reads:` key — the same collision class as F-219l. Distinct keys:
All bucket keys distinct. Rebuild and re-run the full e2e battery:
**E2E 99/99 GREEN** (+2). Full verification chain re-run:
Core gate FULLY GREEN. Now the six parity drift gates — the CTA changes moved pixels, so re-derivation is expected:
Every page moved DOWN (the convergence direction — CTA genera now match). Let me collect the other sweep classes:
All classes moved DOWN (convergence) except analytics-phone (+1.13 from the new EmptyState faces — the construction genus absorbed). Re-deriving all four tables:
Four sweep gates CLEAN. Now the fullpage sweep and interior census:
One drift: phone analytics (the EmptyState construction). Let me get the desktop fullpage numbers too, then re-derive:
Fullpage gate CLEAN. Now the sixth gate — the interior census:
The census trips on the moved interior geometry. Let me re-derive the allowances (the session-217 precedent):
Let me run the census report-only to capture the measured values for re-derivation:
I have all measured values. The decode: +3 on income/accounts/goals (the CTA class-stack events), +5..+11 on analytics (the EmptyState construction). Let me re-derive with the documented decode:
The test pins literal tables — both files need the same-commit update. Let me re-derive both:
The census failures reveal a design flaw: the dashboard bucket exhausts across the parity toolchain's page loads (every navigation = 1 read; sweeps+census+fullpage share one dev server). Rate-limiting the per-navigation aggregate read is structurally wrong — I'll drop that bucket, keeping export/search/writes:
Now restart the dev server (its in-memory buckets are exhausted from the earlier runs) and re-run the census:
The build caught a TS error — my `/s` regex flag isn't supported by the tsconfig target. Fix:
**All six drift gates CLEAN.** Now the final cold gate + captures:
The tool-test literal pins need the same-commit lockstep update:
**Full gate GREEN: 869/869 · smoke 14/14 · e2e 99/99 · 6 drift gates CLEAN.** Now the session-219 capture set:
Faces 82-85 verified. The "Ask AI" selector missed — let me check the coach dialog's actual button names:
Found a leftover amber+white site (the coach send button) and the right selector (suggested-question chips). Fixing both:
The selector matched a button outside the dialog (intercepted by the overlay). Scope it to the dialog:
The login rate bucket (10/15min) exhausted from repeated capture runs. Restart the dev server and re-run:
The `[aria-live="polite"]` selector matches the Toaster viewport first (also a live region). Scope to the dialog:
Face 87's throwaway user hits the verification wall (the F-218a flow). Let me check the verify API shape to complete the flow:
Login bucket tripped again from repeated runs. One more restart + single clean run:
All faces verified. Let me VLM-verify the key captures (the house doctrine):
**VLM-verified: near pixel match on the fresh-visitor dark Dashboard.** Now the docs lockstep. First the docs-counts pin structure:
Now the doc-set lockstep. Let me update all count sites and status rows across the five docs:
Two README stragglers — the file-hierarchy count and the Theme System row (different prefix):
docs-counts green. Now complete the plan (R-16 → Done + §5 row), worklog, and session log:
Now the session log (docs/session_22.md, following the house naming):
Tree ready, env parity OK. Final full gate before committing:
The captures left throwaway users (the session-218 lesson). Clean up via the db singleton, reseed, re-census:
**FULL GATE GREEN** (census MATCH restored). Let me verify .env.example covers all env reads before committing:
.env.example is complete (all 6 config vars; the rest are probe-script/Next internals). Now the atomic commits:
Three atomic commits landed. Now the push — let me read the SSH wrapper runbook:
The runbook is clear. Let me deploy the paramiko shim and materialize the key:
Now materialize the operator key to a 0600 temp file outside the repo:
Key parses (ed25519). Now the dry-run (authenticates, touches no refs):
Dry-run authenticated cleanly (bd97385..f48773e would push). Now the real push:
**Pushed and remote-verified**: `refs/heads/main @ f48773e == local HEAD`. Now shred the operator key:
All work is complete. Final verification of the delivered state:
**Session 219 (R-16) delivered and pushed to `main @ f48773e`** — remote ref independently verified equal to local HEAD, working tree clean, key shredded.

## What was done

**Intake & validation** — Fresh clone at `bd97385`; all core docs reviewed; cold baseline gate green at exactly the documented v2.15.0 state (817 unit · 97 e2e · smoke 14/14 · census MATCH); `bun audit` unchanged; the `.env`/`db/` contract, vitest/playwright configs, sitemap/SEO, and Tailwind v4 hygiene all verified standing.

**The live-reference decode** (your parity ask) — The reference's authenticated shell **defaults DARK** for fresh visitors (choice persists server-side per user); its **amber CTAs carry stone-900 ink, not white** (the a11y register's citation was stale — white was 2.15:1); per-page CTA gradients measured (emerald→teal Income/Investments, rose→red Expenses); the **mobile menu compared functionally on both apps** — it works and matches, but both apps clipped the drawer below ~800px (Sign Out unreachable).

**R-16 cures (TDD: 39+ pins born RED → GREEN)** — default-theme parity via a three-seam design (`src/lib/theme-default.ts` + bootstrap mirror + provider pathname effect; auth faces force light); the full CTA genus convergence; the drawer's internal scroll (superset); the date-seam completion (incl. the investments per-edit date walk-back); rate-bucket fixes (key collision + CRUD family); the perceivability tail (dark metadata family, coach announcements, contrast cluster).

**Evidence** — Gate: lint 0/0 · tsc 0 · **869 unit/64 files** (+52) · build · smoke 14/14 · **e2e 99/99** (+2) · **all six parity drift gates CLEAN** on re-derived tables · census MATCH; 18 asserted screenshots (82-87 incl. the reference's dark /Dashboard beside ours — VLM-verified near pixel match); plan → v2.16.0; full docs lockstep.

Session 220 defaults to no open R-item. Suggested next steps: a findings-led iteration, or the standing owner-decision items (F-217m in-band delivery default, R-5 LLM wiring).
