#!/usr/bin/env python3
"""Session-276 cures (R-73.2) — every site asserted exactly-once (or the
stated count) before any write:

  F-276a  the §5 execution-history table's GFM structure repaired
          (the delimiter under the header; the nine blank separators
          dropped; the orphan delimiter dropped; the v2.47.0 row's
          gate + commit cells restored from the session-250 record)
  F-276b  the ten §2-ledger rows' in-cell pipes escaped (F-247i form)
  F-276c  the three open-state a11y legs gain the modal-rationale
          comment (the phantom ledger element completed in the tree)
  F-276d  the api.ts body-ceiling docblock's family census reworded
          to the fifteen-route truth (the budgets pair named)
  F-276e  the AGENTS a11y contract line gains the floor pointer

The F-229d discipline binds every reword: describe with spaces and
numbers, never coin a hyphenated form a scanner could read as a class
("the fifteen-route census", not a utility citation)."""

import re
import sys


def sub(text: str, old: str, new: str, label: str, count: int = 1) -> str:
    n = text.count(old)
    if n != count:
        sys.exit(f"[{label}] expected {count} occurrence(s), found {n}: {old[:70]!r}")
    return text.replace(old, new)


def rw(path: str, pairs: list[tuple[str, str, str, int]]) -> None:
    with open(path, encoding="utf-8") as f:
        s = f.read()
    for old, new, label, count in pairs:
        s = sub(s, old, new, label, count)
    with open(path, "w", encoding="utf-8") as f:
        f.write(s)
    print(f"cured {path}")


def rw_line(path: str, row_prefix: str, pairs: list[tuple[str, str, str, int]]) -> None:
    """Row-scoped replacement (the F-242j scope lesson): operate inside
    the single line carrying row_prefix, asserting the row exists and
    each pair's occurrence count within that line. Resumable: a pair
    already applied (the new form present) skips; a pair with neither
    form present is an error."""
    with open(path, encoding="utf-8") as f:
        lines = f.readlines()
    hits = [i for i, l in enumerate(lines) if l.startswith(row_prefix)]
    if len(hits) != 1:
        sys.exit(f"[{row_prefix}] expected 1 row, found {len(hits)}")
    i = hits[0]
    line = lines[i]
    applied = 0
    for old, new, label, count in pairs:
        if new in line:
            continue  # already applied (a resumed run)
        n = line.count(old)
        if n != count:
            sys.exit(f"[{row_prefix}:{label}] expected {count} in-row occurrence(s), found {n}: {old[:60]!r}")
        line = line.replace(old, new)
        applied += 1
    lines[i] = line
    with open(path, "w", encoding="utf-8") as f:
        f.writelines(lines)
    print(f"cured {path} :: {row_prefix} ({applied} pair(s) applied)")


# ---- F-276a: the §5 execution-history table's structure --------------------

with open("docs/remediation_plan_v2.md", encoding="utf-8") as f:
    p = f.read()

HEADER = "| Version | Session | R-items executed | Gate at ship | Commit |"
if p.count(HEADER + "\n") != 1:
    sys.exit("[F-276a] the §5 header row not found exactly once")

# The v2.47.0 row's tail: its prose cell swallows what the sibling rows
# split into the gate + commit cells. The session-250 ship counts come
# from the worklog's own record (1668 unit / 102 files, 151 e2e, the
# six drift gates CLEAN at the re-derived baselines).
COMMIT_CELL = "(this session's execution commit)"
if COMMIT_CELL not in next(
    (l for l in p.split("\n") if l.startswith("| v2.47.0 |")), ""
):
    rw_line("docs/remediation_plan_v2.md", "| v2.47.0 | 250 |", [
        (
            "the worklog + docs/session_83.md). |",
            "the worklog + docs/session_83.md). "
            "| lint 0/0 · tsc 0 · **1668 unit (102 files, +23)** · build · "
            "smoke 15/15 · **151 e2e** · six drift gates CLEAN (re-derived "
            "baselines) · census MATCH | (this session's execution commit) |",
            "the v2.47.0 gate + commit cells",
            1,
        ),
    ])
else:
    print("skip: the v2.47.0 row already carries its gate + commit cells")

# Rebuild the table block: delimiter under the header, the rows in
# order, no internal blanks, no orphan delimiter, the trailing blank
# before the blockquote retained. Resumable: an already-healed table
# (the delimiter directly under the header, zero internal blanks)
# skips; a half-cured shape refuses loudly.
with open("docs/remediation_plan_v2.md", encoding="utf-8") as f:
    p = f.read()
h = p.index(HEADER)
after = p.index("\n", h) + 1
lines = p[after:].split("\n")
j = 0
while j < len(lines) and (lines[j].startswith("|") or lines[j] == ""):
    j += 1
table_region = lines[:j]
rows = [l for l in table_region if l.startswith("| v2.")]
orphans = [l for l in table_region if re.match(r"^\|[-| ]+\|$", l) and l != ""]
blanks = sum(1 for l in table_region if l == "")
if len(rows) < 60:
    sys.exit(f"[F-276a] expected >=60 §5 rows, found {len(rows)}")
if len(orphans) == 1 and blanks == 0 and lines[0] == "|---|---|---|---|---|":
    print("skip: the §5 table already healed (delimiter under header, no blanks)")
else:
    if not (len(orphans) >= 1 and blanks >= 9):
        sys.exit(
            f"[F-276a] the pre-cure shape not found (blanks={blanks}, "
            f"delimiters={len(orphans)}) — refusing to run on a healed tree"
        )
    rebuilt = (
        [HEADER, "|---|---|---|---|---|"]
        + rows
        + [""]
    )
    p = p[:h] + "\n".join(rebuilt) + "\n".join(lines[j:])
    with open("docs/remediation_plan_v2.md", "w", encoding="utf-8") as f:
        f.write(p)
    print("cured docs/remediation_plan_v2.md :: the §5 table structure")

# ---- F-276b: the ten §2 rows' in-cell pipes escaped ------------------------

rw_line("docs/remediation_plan_v2.md", "| F-222a |", [
    ("`/(?:Z|[+-]00:00)$/`", r"`/(?:Z\|[+-]00:00)$/`", "the designated-tail regex", 1),
])
rw_line("docs/remediation_plan_v2.md", "| F-226k |", [
    ("income Edit/Pause|Activate", r"income Edit/Pause\|Activate", "the action pair", 1),
])
rw_line("docs/remediation_plan_v2.md", "| F-236f |", [
    ("`!hydrated || loading` gate", r"`!hydrated \|\| loading` gate", "the shell gate", 1),
])
rw_line("docs/remediation_plan_v2.md", "| F-238k |", [
    (r'(error.code === "P2024" || …)', r'(error.code === "P2024" \|\| …)', "the transient codes", 1),
])
rw_line("docs/remediation_plan_v2.md", "| F-238n |", [
    (r'`!key.startsWith("NEO_") || key === "NODE_ENV"`',
     r'`!key.startsWith("NEO_") \|\| key === "NODE_ENV"`', "the dead disjunct", 1),
])
rw_line("docs/remediation_plan_v2.md", "| F-242g |", [
    (r"`{!hydrated || loading ? <LoadingBlock/> : children}`",
     r"`{!hydrated \|\| loading ? <LoadingBlock/> : children}`", "the loading gate", 1),
])
rw_line("docs/remediation_plan_v2.md", "| F-244e |", [
    (r"(ts|tsx|jsx|css)`", r"(ts\|tsx\|jsx\|css)`", "the walker classes A", 1),
    (r"`(tsx?|jsx|css)`", r"`(tsx?\|jsx\|css)`", "the walker classes B", 1),
])
rw_line("docs/remediation_plan_v2.md", "| F-244i |", [
    (r'"… | tee dev.log"', r'"… \| tee dev.log"', "the dev tee", 1),
    (r'"… | tee server.log"', r'"… \| tee server.log"', "the start tee", 1),
])
rw_line("docs/remediation_plan_v2.md", "| F-251d |", [
    (r'`Pick<User, "id"|"name"|"email"|"avatarColor">`',
     r'`Pick<User, "id"\|"name"\|"email"\|"avatarColor">`', "the Pick fields", 1),
])
rw_line("docs/remediation_plan_v2.md", "| F-257r |", [
    (r"`^/(login|signup|reset-password)(/|$|\?)`",
     r"`^/(login\|signup\|reset-password)(/\|$\|\?)`", "the auth-path regex", 1),
])

# ---- F-276c: the three open-state legs gain the comment ---------------------

rw("tests/e2e/a11y.spec.ts", [
    (
        """    await expect(page.getByRole("dialog")).toBeVisible();
    await scrollThrough(page);""",
        """    await expect(page.getByRole("dialog")).toBeVisible();
    // The modal surfaces lock the main scroller (the drawer's own
    // lock, Radix's body lock), so the helper is a no-op here today —
    // kept for the F-221f letter's uniformity (a tall dialog at
    // phone widths would otherwise slip the leg).
    await scrollThrough(page);""",
        "F-276c the open-state trio's comment",
        3,
    ),
])

# ---- F-276d: the api.ts docblock's fifteen-route census truth ---------------

rw("src/lib/api.ts", [
    (
        """ * Session-72 (M-72c2) + session-73 (N-73a1): the family is THIRTEEN
 * routes (the sessioned resource families x(root+[id]) + settings +
 * users + reset — the users PATCH joined at s72; this comment's "12"
 * enumeration was the s72 record's unlanded half). Session-220
 * (F-220n): the stale CRM-era route names (activities/contacts/
 * events/leads) retired from the enumeration. */""",
        """ * Session-72 (M-72c2) + session-73 (N-73a1): the family was thirteen
 * routes then (the sessioned resource families x(root+[id]) +
 * settings + users + reset — the users PATCH joined at s72; that
 * enumeration's "12" was the s72 record's unlanded half). Session-220
 * (F-220n): the stale CRM-era route names (activities/contacts/
 * events/leads) retired from the enumeration. Session-276 (R-73,
 * F-276d): the honest census is FIFTEEN routes — the budgets POST
 * and budgets DELETE pair rides this default ceiling too (parseBody,
 * the same placement; the s73 count predates the pair and was never
 * re-counted; the pass-B twenty-ninth consecutive clean bill caught
 * it). */""",
        "F-276d the fifteen-route census",
        1,
    ),
])

# ---- F-276e: the AGENTS a11y line's floor pointer ---------------------------

rw("AGENTS.md", [
    (
        "- a11y: every page must stay axe-clean at WCAG 2.2 AA; contrast fixes\n"
        "  prefer darkening one Tailwind step over restyling.",
        "- a11y: every page must stay axe-clean at WCAG 2.2 AA (the design\n"
        "  target — the blanket axe run evaluates the default-enabled 2.0\n"
        "  and 2.1 set; the 2.2-only criteria ride the bespoke hit-area\n"
        "  pins, see the a11y spec header note); contrast fixes prefer\n"
        "  darkening one Tailwind step over restyling.",
        "F-276e the floor pointer",
        1,
    ),
])

print("cures-276 complete: F-276a table · F-276b pipes · F-276c comment · F-276d census · F-276e pointer")
