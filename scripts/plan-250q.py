#!/usr/bin/env python3
"""Session-250 (R-47): record F-250q (the reference styling-event
response) in the plan — the ledger row + the R-47 section update."""

import sys

p = "docs/remediation_plan_v2.md"
t = open(p, encoding="utf-8").read()

def sub(old, new, label):
    global t
    n = t.count(old)
    if n != 1:
        sys.exit(f"REFUSED: {label} matched {n} times")
    t = t.replace(old, new, 1)
    print("edited:", label)

sub(
    "| F-250h | Informational | **THE SSR THEME-GLYPH FLASH",
    """| F-250q | Medium | **THE REFERENCE STYLING-EVENT BLIND SPOT — the platform redeployed the reference's CSS with the JS bundle byte-identical, and the stability probe could not see it.** The R-47.3 verification's six-gate run tripped the desktop sweep at dashboard 12.24% (allowed 9.00) and investments 10.42% (allowed 8.60), deterministic across re-runs and IDENTICAL on the pre-cure tree (the stash bisect); our side stood verified (the interior census clean at 0-event margin, the fullpage sweep within its allowances, all DOM censuses standing). The decode: the reference's app stylesheet (index-D-BGHME3.css) carried last-modified 2026-11-15T10:11:55Z — a platform restyle landed mid-session with the app bundle's md5 unchanged, so probe:ref read STABLE on every layer while the pixel diff grew on exactly the two most restyle-affected pages (the cluster decode: five bands across the KPI row, the lower cards, the sidebar, the header). The reference also loads cdn.tailwindcss.com at runtime (an in-browser style compiler whose content can move independently of every reference-owned file). | `scripts/drift-probe.ts` (the standing layers); `scripts/sweep.ts` (the four class tables); the live reference's stylesheet headers | **cured in R-47** (two-part: the probe's standing set gains the STYLING fingerprints — the app stylesheet's content hash (md5 + bytes) and the runtime Tailwind CDN script's content hash, both wired into the CHANGED gate and the JSON report, so the next styling-only redeploy reads CHANGED instead of STABLE; and the eight affected per-class baselines re-derived from the measured standing shares (desktop dashboard 8.5→12.3 · investments 8.1→10.5; phone 14.5→23.0 · 26.4→28.7; tablet 7.2→12.7 · 20.3→24.9; landscape 10.5→14.3 · 23.2→26.3) with the event documented at every table — the R-7.5 re-derivation doctrine, executed against the reference's measurement-stable state) |
| F-250h | Informational | **THE SSR THEME-GLYPH FLASH""",
    "the F-250q ledger row",
)

sub(
    """The session-250 findings-led round over the v2.46.0 ship state. Six
cures (F-250a-f), one re-adjudication (F-250g), nine registrations
(F-250h-p).""",
    """The session-250 findings-led round over the v2.46.0 ship state. Seven
cures (F-250a-f + F-250q, the verification-time reference styling-event
response), one re-adjudication (F-250g), nine registrations (F-250h-p).""",
    "the R-47 intro counts",
)

sub(
    """   THE EXPENSES BUCKET A11Y CURE (F-250f).
3. **R-47.3 — the verification**: the full gate (lint 0/0 · tsc 0 ·""",
    """   THE EXPENSES BUCKET A11Y CURE (F-250f); THE REFERENCE
   STYLING-EVENT RESPONSE (F-250q — the verification-time discovery:
   the probe's standing set gains the stylesheet + runtime-CDN content
   fingerprints, and the eight affected per-class sweep baselines
   re-derive against the reference's restyled state, the event
   documented at every table).
3. **R-47.3 — the verification**: the full gate (lint 0/0 · tsc 0 ·""",
    "the R-47.2 cure list",
)

open(p, "w", encoding="utf-8").write(t)
print("plan updated with F-250q")
