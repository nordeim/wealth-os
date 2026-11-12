# Session 49 — repo session 233 (R-30): the OTP-paste, live-region, and dependency-hygiene round

The owner re-sent the standing directive after the R-29 record pair
(docs/session_47.md + the owner's session_48.md log capture of the
session-232 round). Per the recorded rhythm, this session defaulted to
findings-led iteration: refresh, re-audit, remediate, verify, capture,
document, commit, push — with the operator's named asks (the mobile
navigation comparison, the Tailwind v4 state, the .env/db contract,
the vitest/playwright configs, the sitemap/SEO surface, the
.env.example, the screenshots, the SSH-wrapper push) re-verified along
the way.

## Intake — a green cold baseline

A fresh clone (sandbox reset); bun install; the .env rebuilt from
.env.example (the DATABASE_URL="file:../db/custom.db" contract +
a fresh 64-char AUTH_SECRET); db:push/db:seed; the census MATCH
(78/4/3/6/5/7, users=1); the chromium-1254 install the e2e battery
needs.

The baseline gate was GREEN at HEAD 9747583 — the exact v2.29.0
ship state reproduced, no cold-baseline discovery this round: lint
0/0 · tsc 0 · 1254/1254 unit (79 files) · build · smoke 15/15 ·
139/139 e2e.

The standing asks: probe:ref STABLE on every layer (the bundle md5
6d3779af… unchanged, the demo data zero, the desktop nav 256/9, the
TRUE-390 menu census standing — the reference's own mobile menu
opens with 9 destination links). `bun audit` unchanged (1 moderate
dev-chain). The neo-crm upstream check: unchanged (b3d0fbe) —
nothing to port. The SEO surface verified (smoke leg 12: sitemap +
robots + manifest 200 on the standalone artifact). The .env
contract, the db/ at the repo root, the vitest/playwright configs,
and the .env.example six-knob set all standing.

## The fresh-eyes audit — one Medium, and the tail re-verified

Three Mode-C passes (the R-29 cure surfaces driven by the session ·
the API/auth/security layer · the UI/a11y/shell layer):
**0 Critical / 0 High / 1 Medium / 5 Low / 10 Informational** raw.
The driving session re-verified every material claim at file:line;
R-29's nine pinned cures all verified holding. One audit-brief
location attribution was corrected against the plan's own row (the
F-232h revoke deferral lives in the analytics page, not the format
seam — recorded as F-233o).

The headline Medium: **the six-box verification-code entry discards
pasted and auto-filled multi-digit values.** `onCodeDigit` kept only
the last character of whatever landed in a box, and the first box
carries `autoComplete="one-time-code"` — so Chrome/Android/iOS
insert the FULL code there, the handler collapses it to its final
digit, and submit blocks at the "enter all 6 digits" guard. Every
paste of the full code (the password-manager and SMS-copy flows)
failed the same way. The most common, most accessible entry path
was degraded; single-digit typing worked.

The Lows: the **orphaned `@radix-ui/react-label` dependency** (the
F-232a file deletion retired its sole consumer but left the package
riding the manifest — the dead-stock genus, dependency edition);
the **login InfoCallout mounting its status role with its content**
(the F-218h genus on the last uncurated surface — the resend
confirmation was silent for screen-reader users); the **silently
swallowed settings fetch** (a transient failure left the Settings
form offering hard-coded defaults a Save would persist over stored
preferences); the **import double-parse** (the extract button
re-parsed an already-parsed file on every flow-through); the
**reset token riding the URL** for its whole 60-minute life; the
**upload breach-unlink 500-on-fault edge** (a faulting unlink
escalated the honest 507); and the **missing auth-face Suspense
boundaries** (login/signup safe only while force-dynamic stands).
The recorded tail re-verified unchanged — with one count
correction: the F-232j whole-store census is FOURTEEN sites, not
fifteen (mis-recorded, not drifted).

## The plan and the TDD execution

The plan v2.30.0 written (the F-233a-o ledger + the R-30 section)
and validated against the tree. The pins born RED: 25 checks (18
parity-233 source pins + the 10-check verification-code behavioral
battery over the missing `applyCodeInput` seam — three of the
parity checks green-by-design genus guards), plus one e2e leg born
RED with the honest URL failure (the query stayed in the address
bar at the pre-cure build, proven by the stash round-trip).

The cures: **the OTP paste/autofill distribution** (F-233a — the
pure `applyCodeInput` seam in the verification lib: multi-digit
edits distribute across the boxes from the edited one, focus lands
after the last filled, single-digit typing and the backspace walk
byte-identical; NO maxLength on the boxes — a browser-enforced cap
truncates a paste before the handler ever sees it); **the
label-primitive dependency retirement** (F-233b — removed through
the package manager, lockfile regenerated, import + manifest +
lockfile pins); **the login info-callout live region** (F-233c —
the sr-only status region pre-exists in the verify view, empty when
idle; the InfoCallout is the visual only; the F-219v pin
re-anchored to the new seam); **the settings save guard** (F-233d —
Save disables while the slice is missing, the amber reason line
states the protection); **the import double-parse retirement**
(F-233e — the button is the retry affordance, disabled once the
review stands); **the reset-token URL strip** (F-233f — captured
once at mount, `history.replaceState` clears the query; the
round-trip leg's URL assertion recalibrated in the same commit);
**the upload breach-unlink isolation** (F-233g); **the auth-face
Suspense boundaries** (F-233h); the low tail (F-233i/j/k).

The recursive F-229d genus, caught twice more — in two NEW domains:
the plan's own F-232j correction note spelled the mis-recorded word
("fifteen") and tripped the correction's own pin; and the
Suspense-boundary comments named the hook the route-case URL-state
scan greps for, making both auth pages offenders on the comment
alone. Both reworded per the discipline; the second catch became a
new AGENTS gotcha (the test-source-scan edition).

## The verification

The full offline gate: **lint 0/0 · tsc 0 · 1282/1282 unit (81
files, +28) · build · smoke 15/15 · 140/140 e2e** (+1 — the strip
leg). ALL SIX parity drift gates CLEAN at 0-event margin (the four
sweep classes 1440/390/768/1024 + the fullpage sweep + the interior
census). census MATCH; `bun audit` unchanged; docs-counts 13/13
after the lockstep.

The capture set 140-142 (scripts/captures-233.ts, on the
own-database convention + the F-226g liveness check): **140** the
mobile drawer at 390×844 with all 9 destinations + Sign Out (the
standing operator ask, asserted by link census); **141** the verify
view with the whole code (940846) distributed across all six boxes
from a single entry — every box's value asserted against its digit,
focus on the final box (F-233a); **142** the set-password form
rendered from a tokened link with the one-time credential stripped
from the address bar — the bare URL asserted, the form live off the
captured value (F-233f). The census tripwire MATCHed at exit;
custom.db untouched.

## The lockstep and the delivery

docs-counts 1254→1282 / 79→81 / 139→140 / the badge 1393→1422 /
the pins row 51→52 with parity-233 (+ the domain-seams family to 4
with verification-code); README (the badge, the stack table, the
testing table, the hierarchy, the verification row, the R-30
program row); AGENTS (the counts + two new gotchas: the maxLength
paste-truncation trap; the F-229d test-source-scan edition); CLAUDE
(the gate contract); PAD (the v2.30.0 revision block, the §7.1
distribution rows, the live-tense sites); SKILL (the counts); the
plan closed (R-30 → Done, the §5 execution row); the worklog entry;
this record.

R-30 is shipped and verified. No open R-item; the recorded-not-cured
tail (F-233l the pre-parse rate-bucket burn — the correct
anti-brute-force order kept, the browser-originated burn face
documented; F-233m the data-reset posture — no UI consumer, an
e2e/operator utility; F-233n the theme pathname effect's one-paint
residual; F-233o the audit-brief attribution record; plus the
standing F-232j/k/l/m/n/o and F-217m/F-215m/F-210a/F-214l/F-230b/
F-230g/F-231m-r family) stays documented in the plan. Next session
defaults to findings-led iteration — re-send the standing directive
and it will refresh, re-audit, and continue the rhythm.
