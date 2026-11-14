#!/usr/bin/env python3
"""Session-242 (R-39) rider: the F-242j row (the count-lockstep
historical-block corruption, discovered during the round's docs
lockstep) joins the session-242 audit ledger, the R-39 section gains
the cure line, the header gains the mention, and the README program
row's narrative is already carrying it. Assert-each-insertion."""

from pathlib import Path

PLAN = Path("docs/remediation_plan_v2.md")
src = PLAN.read_text()

# 1. The F-242j ledger row, after F-242i's.
F242I_TAIL = "recorded (the F-217m family; the escalation + the flip's blast radius documented — the owner's explicit ask flips it) |"
F242J_ROW = F242I_TAIL + """
| F-242j | Low | **The count-lockstep replacement scripts of sessions 240 AND 241 each over-replaced the then-most-recent HISTORICAL revision block's verification line** (discovered during this round's own docs lockstep, at the F-242g reword pass). Session 240's 1469→1485 pass rewrote the v2.36.0 block's counts (1469/89 → 1485/90); session 241's 1485→1519 pass rewrote the v2.37.0 block's (1485/90 → 1519/91) — each session corrupted exactly the block the PREVIOUS session wrote, both times invisibly (the docs-counts pin checks only live-tense sites; the historical blocks are excluded by the doctrine's own scope note; git diff against the ship commits proved both). The assert-each-replacement scripts counted occurrences across the whole file instead of scoping to live-tense sections. Cure: both blocks restored to their own ship counts (verified against the plan §5 rows and the git ship states); docs-counts gains the over-replacement guard (the three most recent revision blocks must carry their OWN ship counts — the next over-broad replacement fails `bun run test`). The same pass also caught two unpinned blind-spot sites: the arch-pins §7.1 row had lagged two rounds (parity-240/241 unlisted; now 62 with parity-242) and the PAD's file-hierarchy line said 72 suites against 92 reality (both re-pinned same-commit). | `Project_Architecture_Document.md` (the v2.36.0 + v2.37.0 revision blocks; §7.1 arch-pins row; the file-hierarchy line), `tests/docs-counts.test.ts` | **cured in R-39** (both restorations + the guard pin + the two blind-spot re-pins) |"""

assert src.count(F242I_TAIL) == 1, "F-242i tail not unique"
src = src.replace(F242I_TAIL, F242J_ROW, 1)

# 2. The R-39 section gains the F-242j cure line.
OLD_LINE = """   - **F-242g**: the two F-239c rationales reworded to the true
     mechanism (the loading gate; belt-and-suspenders; the gate
     dependency recorded)."""
NEW_LINE = OLD_LINE + """
   - **F-242j** (the round's own discovery, at the docs pass): the two
     over-replaced HISTORICAL revision blocks (v2.36.0, v2.37.0)
     restored to their own ship counts; the docs-counts
     over-replacement guard pins the three most recent blocks; the
     arch-pins row completed (parity-240/241/242 — it had lagged two
     rounds) and the PAD's file-hierarchy line re-pinned (72→92)."""
assert src.count(OLD_LINE) == 1, "R-39 F-242g line not unique"
src = src.replace(OLD_LINE, NEW_LINE, 1)

# 3. The header: the round's list gains the F-242j flagship mention.
OLD_HDR = """and the hydration-rationale
> truth (F-242g — the two F-239c suppressions' comments describe a
> server/client divergence the AppShell loading gate precludes; now
> they record the true mechanism + the gate dependency)."""
NEW_HDR = """the hydration-rationale
> truth (F-242g — the two F-239c suppressions' comments describe a
> server/client divergence the AppShell loading gate precludes; now
> they record the true mechanism + the gate dependency), and the
> count-lockstep historical-block restoration (F-242j — the
> round's own discovery at the docs pass: the v2.36.0 and v2.37.0
> revision blocks had been overwritten by the two prior sessions'
> over-broad count replacements; both restored to their own ship
> counts and pinned by the docs-counts over-replacement guard)."""
assert src.count(OLD_HDR) == 1, "header F-242g mention not unique"
src = src.replace(OLD_HDR, NEW_HDR, 1)

# 4. The raw tally in the ledger intro: 5 Low -> 6 Low.
OLD_TALLY = """NEW findings after dedup (the passes
re-confirmed the documented postures without exception):
0 Critical / 0 High / 1 Medium / 5 Low / 3 Informational."""
NEW_TALLY = """NEW findings after dedup (the passes
re-confirmed the documented postures without exception):
0 Critical / 0 High / 1 Medium / 6 Low / 3 Informational (F-242j
joined mid-round, discovered by the driving session's own docs
lockstep pass)."""
assert src.count(OLD_TALLY) == 1, "ledger tally not unique"
src = src.replace(OLD_TALLY, NEW_TALLY, 1)

PLAN.write_text(src)

out = PLAN.read_text()
assert "| F-242j | Low |" in out
assert "the round's own discovery, at the docs pass" in out
assert "count-lockstep historical-block restoration (F-242j" in out
assert "1 Medium / 6 Low / 3 Informational" in out
print("F-242j row + R-39 line + header + tally written")
