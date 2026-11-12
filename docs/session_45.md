# Session 45 — repo session 231 (R-28): the a11y-tail, logging-grain, and dead-family round

The owner re-sent the standing directive after the R-27 record pair
(docs/session_43.md + the owner's session_44.md log capture). Per the
recorded rhythm, this session defaulted to findings-led iteration:
refresh, re-audit, remediate, verify, capture, document, commit, push
— with the operator's named asks (the mobile navigation comparison,
the Tailwind v4 state, the .env/db contract, the vitest/playwright
configs, the sitemap/SEO surface, the .env.example, the screenshots,
the SSH-wrapper push) re-verified along the way.

## Intake — a green cold baseline

A git pull (HEAD 80c07b3, the owner's session_44.md log commit) over
the standing workspace. The census MATCH (78/4/3/6/5/7, users=1),
chromium-1254, :3000 free.

The baseline gate was GREEN at HEAD — the exact v2.27.0 ship state
reproduced, no cold-baseline discovery this round: lint 0/0 · tsc 0 ·
1218/1218 unit (77 files) · build · smoke 15/15 · 138/138 e2e.

The standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the demo data zero, the desktop nav 256/9, the
TRUE-390 menu census standing — the reference's own mobile menu opens
with 9 destination links). `bun audit` unchanged (1 moderate
dev-chain). The neo-crm upstream check: unchanged (b3d0fbe) —
nothing to port. The SEO surface verified (smoke leg 12: sitemap +
robots + manifest 200 on the standalone artifact). The .env contract
(`DATABASE_URL="file:../db/custom.db"`, db/ at the repo root), the
vitest/playwright configs, and the .env.example six-knob set all
standing.

A session quirk, discovered and resolved: the bash tool's output
layer eats literal `[m` character pairs (an over-aggressive ANSI
scrubber) — the ai-coach `const [messages` line displayed as `const
essages` through every bash pipe (sed, grep, cat -A, even python
repr) while the Read tool and every gate saw the true bytes. A
hexdump corroborated the file: valid. When a bash-read line looks
like it is missing `[m`, re-read with the Read tool before
concluding anything.

## The fresh-eyes audit — one live-probe adjudication and two brief errors

Three Mode-C passes (the R-27 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 0 High / 0 Medium / 8 Low / 12 Informational** raw.
The driving session re-verified every material claim at file:line —
and live-probed the reference for the one adjudication call:

- The headline Low (F-231e): **the Analytics "Spending by Day of
  Week" card rides the Net-Savings amber on a spending series.**
  ADJUDICATED by probes (probe-231/b/c): the card is OUR OWN SUPERSET
  — the reference's four Analytics tabs (walked at its standing zero
  demo data) carry no day-of-week card on any tab, and the
  reference's 1.4 MB JS bundle contains neither the card title nor
  any adjacent form. The amber was never reference parity but our
  own palette mis-assignment; the cure is the palette doctrine's own
  spending hue (CHART_COLORS.expenses) — drift-inert by construction
  (the sweep baselines are zero-data; the card renders its
  EmptyState there).
- The two Pass-B "Lows" were adjudicated as **AUDIT-BRIEF
  CONTRACT-TEXT ERRORS** (F-231s): the uploads GET is
  public-by-design capability-URL serving (its own docblock + the
  recorded F-225i/F-217g posture), and forgot-password is 10/15 per
  the F-222n ledger — the code matches the repo's documented
  contracts in both cases; the audit brief misstated both. Recorded
  so the next brief quotes the ledger verbatim.
- The UI pass Lows: the Expenses dialog's decorative "$" tile
  without aria-hidden (F-231a — the F-225k family's one miss; the
  accessible name computed "$ Add Expense"); the auth-card view
  swaps dropping focus (F-231b — four of five transitions replaced
  the focused control with nothing; the verify view's box-1 focus
  proved the pattern in-tree); the dead DropdownContent pinning the
  skip-link's 60-level (F-231c); FilterPolygon dead with a false
  "Used by" citation naming CRM-era surfaces that do not exist in
  WealthOS (F-231d); the CRM-era dead family in live files
  (F-231h — the wide-footer component, the wide geometry arm, the
  wide footer constant, the initials-avatar family, and the two
  "Event/Activity" citations).
- The API pass beyond the brief errors: the upload multipart parse
  swallow (F-231f — the one F-226c-genus site outside the logging
  retrofit) and the uploads GET ENOENT noise (F-231g — a 404 on a
  capability URL is the normal miss, not an error-level event);
  everything else clean beyond the recorded tail.

## The plan and the TDD execution

The plan v2.28.0 written (the F-231a-s ledger + the R-28 section)
and validated against the tree. The pins born RED: 17 parity-231
checks — sixteen RED + one green-by-design genus guard (the F-227f
register keeps the shadcn-stock arms) — plus one e2e leg born RED
(the view-swap focus, with the honest failure).

The cures: **the Expenses dialog glyph hiding** (F-231a); **the
auth-card view-swap focus** (F-231b — every transition lands focus
on the new view's heading; the first boolean mountedRef design FELL
TO THE DEV SERVER'S STRICTMODE DOUBLE-INVOKE, live-caught by the
captures face 135: the second invoke saw the flag set and fired the
focus on the INITIAL load while the production-build e2e passed —
cured to the value-comparison guard (prevViewRef.current !== view),
idempotent under double-invocation; a new AGENTS gotcha); **the
DropdownContent z-pin** (F-231c — z-50, the menu family's layer);
**the icons.tsx retirement** (F-231d — the N-89c6
lucide-injection note relocated to the KpiCard); **the day-of-week
fill** (F-231e); **the upload multipart log** (F-231f); **the
uploads GET ENOENT gate** (F-231g); **the CRM-era dead-family
retirement** (F-231h — avatarTextColor, the live F-218n seam,
stays); the low tail (F-231i-l).

The recursive genus, caught twice by the parity-229 whole-tree
carrier invariant: the z-50 re-pin ORPHANED two comments citing the
old token as live code (app-shell, select), and the settings reword
coined a class-shaped peer marker — all three reworded per the
F-229d discipline (spaces and numbers, never a hyphenated form).

## The verification

The full offline gate: **lint 0/0 · tsc 0 · 1235/1235 unit (78
files, +17) · build · smoke 15/15 · 139/139 e2e (+1 — the
view-swap focus leg)**. ALL SIX parity drift gates CLEAN at 0-event
margin (the four sweep classes 1440/390/768/1024 + the fullpage
sweep + the interior census). census MATCH; `bun audit` unchanged;
docs-counts 13/13 after the lockstep.

The capture set 134-136 (scripts/captures-231.ts, on the
own-database convention + the F-226g liveness check): **134** the
mobile drawer open at 390×844 with all 9 destinations + Sign Out
(the standing operator ask, asserted by link census); **135** the
auth-card signup swap with focus landed on the heading (asserted:
activeElement is the h1 + the initial load keeps natural focus —
the face that live-caught the StrictMode defect); **136** the
Spending by Day of Week bars in the spending rose (asserted: the
#f43f5e bars present, zero #f59e0b). The census tripwire MATCHed at
exit; custom.db untouched.

## The lockstep and the delivery

docs-counts 1218→1235 / 77→78 / 138→139 / the badge 1356→1374 / the
pins row 49→50 with parity-231; README (the badge, the stack table,
the testing table, the hierarchy, the verification row, the R-28
program row); AGENTS (the counts + the new gotcha: a boolean
"has mounted" guard on a focus effect breaks under the dev server's
StrictMode double-invoke — the value-comparison guard is the
sanctioned form); CLAUDE (the gate contract); PAD (the v2.28.0
revision block, the live sites, the pins row); SKILL (the counts);
the plan closed (R-28 → Done, the §5 execution row); the worklog
entry; this record.

R-28 is shipped and verified. No open R-item; the recorded-not-cured
tail (F-231m the shadcn-stock dead-arm register, F-231n the
filters-popover focus-out genus, F-231o the Checkbox onClick
clobber, F-231p the seed PrismaClient letter, F-231q the
create/update null asymmetry, F-231r the unbounded aggregate reads,
F-231s the audit-brief contract-text errors, plus the standing
F-217m/F-215m/F-210a/F-214l/F-230b/F-230g family) stays documented
in the plan. Next session defaults to findings-led iteration —
re-send the standing directive and it will refresh, re-audit, and
continue the rhythm.
