#!/usr/bin/env python3
"""Session-250 (R-47, F-250q): re-derive the 8 sweep baselines (the
reference styling event) with the event documented at each table."""

import sys

p = "scripts/sweep.ts"
t = open(p, encoding="utf-8").read()

def sub(old, new, label):
    global t
    n = t.count(old)
    if n != 1:
        sys.exit(f"REFUSED: {label} matched {n} times")
    t = t.replace(old, new, 1)
    print("re-derived:", label)

NOTE = """  // Session-250 (R-47, F-250q): the reference-side STYLING EVENT
  // re-derivation — the platform redeployed the reference's CSS
  // 2026-11-15 while the JS bundle stayed byte-identical: every DOM
  // census read STANDING, the pixel diff on the two pages grew,
  // deterministic across 40 minutes of measurement; our side stood
  // verified (the interior census clean at 0-event margin, the
  // stash-test bisect reproduced the drift on the pre-cure tree). The
  // probe now fingerprints the styling layer so the next such redeploy
  // reads CHANGED, not STABLE.
"""

sub(
    """  // 1440x900 — the desktop class (>= 1280) — session-209 re-derivation
  desktop: {
    dashboard: 8.5,""",
    """  // 1440x900 — the desktop class (>= 1280) — session-209 re-derivation.
""" + NOTE + """  desktop: {
    dashboard: 12.3,""",
    "desktop dashboard",
)
sub("""    investments: 8.1,
    import: 9.3,""", """    investments: 10.5,
    import: 9.3,""", "desktop investments")

sub(
    """  // 390x844 — the phone class (< 768) — session-209 re-derivation
  phone: {
    dashboard: 14.5,""",
    """  // 390x844 — the phone class (< 768) — session-209 re-derivation.
""" + NOTE + """  phone: {
    dashboard: 23.0,""",
    "phone dashboard",
)
sub("""    investments: 26.4,
    import: 13.3,""", """    investments: 28.7,
    import: 13.3,""", "phone investments")

sub(
    """  tablet: {
    dashboard: 7.2,""",
    """  // Session-250 (R-47, F-250q): the reference styling event (the
  // desktop table's note) — dashboard 7.2→12.7 · investments
  // 20.3→24.9.
  tablet: {
    dashboard: 12.7,""",
    "tablet dashboard",
)
sub("""    investments: 20.3,
    import: 8.8,""", """    investments: 24.9,
    import: 8.8,""", "tablet investments")

sub(
    """  landscape: {
    dashboard: 10.5,""",
    """  // Session-250 (R-47, F-250q): the reference styling event (the
  // desktop table's note) — dashboard 10.5→14.3 · investments
  // 23.2→26.3.
  landscape: {
    dashboard: 14.3,""",
    "landscape dashboard",
)
sub("""    investments: 23.2,
    import: 11.7,""", """    investments: 26.3,
    import: 11.7,""", "landscape investments")

open(p, "w", encoding="utf-8").write(t)
print("baselines re-derived: 8 constants across 4 classes")
