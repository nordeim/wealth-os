#!/usr/bin/env python3
"""Fix the §2.11 placement: the F-251 rows must live under their own
'### 2.11 Session-251 audit ledger' heading AFTER §2.10's table ends
(after the F-250p row), not interleaved before F-250p."""

import sys

p = "docs/remediation_plan_v2.md"
t = open(p, encoding="utf-8").read()

FIRST = "| F-251a | Medium |"
LAST = "otherwise the documented one-hand-rolled-site) |\n"

def sub(old, new, label):
    global t
    n = t.count(old)
    if n != 1:
        sys.exit(f"REFUSED: {label} matched {n} times")
    t = t.replace(old, new, 1)
    print("edited:", label)

# Locate the misplaced F-251 block (from the F-251a row start to the
# F-251k row end, immediately before the F-250p row).
start = t.index(FIRST)
end = t.index(LAST, start) + len(LAST)
block = t[start:end]
assert block.count("\n| F-251") == 10, f"expected 11 rows, got {block.count(chr(10)+'| F-251')+1}"

# 1. Remove the misplaced block (leaving the F-250p row in place).
t = t[:start] + t[end:]
print("removed the misplaced block")

# 2. Insert the §2.11 section after the F-250p row, before '## 3.'.
sub(
    """recorded (the structural fix — server version tokens — is its own architecture round) |

## 3. The remediation program (R-items)""",
    """recorded (the structural fix — server version tokens — is its own architecture round) |

### 2.11 Session-251 audit ledger (the fresh-eyes round over the v2.47.0 ship state)

Three Mode-C passes (the R-47 cure surfaces driven by the session · the
API/auth/security layer · the UI/a11y/shell layer); every material claim
re-verified at file:line by the driving session before planning (the
prisma-config divergence LIVE-PROBED under the repo's own bun). NEW
findings after dedup (the passes re-confirmed the documented postures
without exception — all seven R-47 cure surfaces verified holding; the
Tailwind v4 standing-ask hunt clean on every axis: zero phantom
breakpoints, zero unpinned tokens, no config file, no misused renamed
utilities; the API layer's envelope/guard/ownership/rate-limit/
injection/session posture all standing; the negative results are
recorded in the session record so the next pass does not re-chase
them): 0 Critical / 0 High / 1 Medium / 6 Low cured + 2 Informational
cured-as-riders + 3 Informational registered.

| ID | Severity | Finding (adjudicated) | Location | Disposition |
|---|---|---|---|---|
""" + block.rstrip("\n") + "\n\n## 3. The remediation program (R-items)",
    "the §2.11 section",
)

open(p, "w", encoding="utf-8").write(t)
print("§2.11 placed correctly")
