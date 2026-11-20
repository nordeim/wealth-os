#!/usr/bin/env python3
"""Session-278 cures — R-75.2 (the census-family, indented-walker, and
register-hygiene round).

Five cure sites, every one asserted exactly-once, the script RESUMABLE
(the F-242j doctrine: a half-cured shape refuses loudly, an
already-healed site skips):

  1. neo-crm_SKILL.md:1133      the debugging row's command pipe escapes
  2. implementation-plan:123     the stack-mapping row's envelope pipe
                                escapes
  3. tests/parity-276.test.ts   the DOCS list extends to the family, the
                                census comments carry the scope truth,
                                the walker gains the indented-row
                                predicate
  4. tests/parity-277.test.ts   the same extension + hardening on the
                                orphan census's own list and walker
  5. tests/e2e/a11y.spec.ts     the register's duplicate matcher de-dups
                                with the single-cite annotation

ZERO application behavior changed: two doc rows, three test files."""

import sys


def heal(text: str, old: str, new: str, label: str, fname: str) -> str:
    """Replace exactly-once; resume if already healed; refuse ambiguity."""
    if new in text and old not in text:
        print(f"  [skip] {fname}: {label} already healed")
        return text
    n = text.count(old)
    if n != 1:
        sys.exit(f"[{label}] {fname}: expected exactly 1 old form, found {n}")
    if text.count(new) != 0:
        sys.exit(f"[{label}] {fname}: the new form already present alongside the old")
    print(f"  [cure] {fname}: {label}")
    return text.replace(old, new, 1)


# ---- 1. the sibling skill doc's debugging row ---------------------------
with open("neo-crm_SKILL.md", encoding="utf-8") as f:
    t = f.read()
t = heal(
    t,
    "| DB \"outside the repo\" | bun absolutization | `for pid in $(pgrep -f next-server); do ls -l /proc/$pid/fd | grep .db; done`",
    "| DB \"outside the repo\" | bun absolutization | `for pid in $(pgrep -f next-server); do ls -l /proc/$pid/fd \\| grep .db; done`",
    "the debugging row's in-cell pipe escape",
    "neo-crm_SKILL.md",
)
with open("neo-crm_SKILL.md", "w", encoding="utf-8") as f:
    f.write(t)

# ---- 2. the session-199 implementation plan's stack-mapping row --------
with open("docs/implementation-plan-session-199-wealthos.md", encoding="utf-8") as f:
    t = f.read()
t = heal(
    t,
    "(envelope `{ok,data|error}`)",
    "(envelope `{ok,data\\|error}`)",
    "the stack-mapping row's in-cell pipe escape",
    "docs/implementation-plan-session-199-wealthos.md",
)
with open("docs/implementation-plan-session-199-wealthos.md", "w", encoding="utf-8") as f:
    f.write(t)

# ---- 3. parity-276: the DOCS list, the census truth, the walker --------
with open("tests/parity-276.test.ts", encoding="utf-8") as f:
    t = f.read()

OLD_DOCS = """    const DOCS = [
      "docs/remediation_plan_v2.md",
      "README.md",
      "AGENTS.md",
      "CLAUDE.md",
      "wealth-os_SKILL.md",
      "Project_Architecture_Document.md",
      "worklog.md",
    ] as const;"""
NEW_DOCS = """    const DOCS = [
      "docs/remediation_plan_v2.md",
      "README.md",
      "AGENTS.md",
      "CLAUDE.md",
      "wealth-os_SKILL.md",
      "Project_Architecture_Document.md",
      "worklog.md",
      "docs/DEPLOYMENT.md",
      "docs/Tailwind-V4-Validation-Report.md",
      "docs/coding_agent_prompt.md",
      "docs/how-to-git-push-using-ssh-wrapper_SKILL.md",
      "docs/implementation-plan-session-199-wealthos.md",
      "docs/skills-inventory.md",
      "docs/web-app-codebase-evaluation-report.md",
      "neo-crm_SKILL.md",
    ] as const;"""
t = heal(t, OLD_DOCS, NEW_DOCS, "the DOCS list extension", "tests/parity-276.test.ts")

OLD_CENSUS_COMMENT = """    // in GFM. The census walks every table in the seven-file doc set
    // and fails on any offender — future rows must escape their
    // in-cell pipes or update this pin with a stated reason.
    // Session-277 (R-74, F-277d) hardened the census on two gaps:
    // pipe-prefixed lines inside fenced code blocks are CODE, never
    // table rows (stripFences toggles the fence state at every fence
    // line and blanks the fenced lines before the walk), and
    // worklog.md — the seventh living doc — joins the DOCS list."""
NEW_CENSUS_COMMENT = """    // in GFM. The census walks every table in the fifteen-file
    // curated tracked-doc family and fails on any offender — future
    // rows must escape their in-cell pipes or update this pin with a
    // stated reason.
    // Session-277 (R-74, F-277d) hardened the census on two gaps:
    // pipe-prefixed lines inside fenced code blocks are CODE, never
    // table rows (stripFences toggles the fence state at every fence
    // line and blanks the fenced lines before the walk), and
    // worklog.md — the seventh living doc — joins the DOCS list.
    // Session-278 (R-75, F-278a) extended the list to the curated
    // tracked-doc family (the seven living docs plus the eight
    // curated files: the deployment guide, the Tailwind validation
    // report, the coding agent prompt, the push runbook, the
    // session-199 implementation plan, the skills inventory, the
    // web-app evaluation report, and the sibling skill doc at the
    // root). The transcript family (docs/session_*.md and
    // docs/prompt-to-*.md) and the skills/ library stay outside the
    // census — the immutable-record doctrine and the owner's
    // exclusion directive; docs/worklog.md is the parity-227-pinned
    // symlink of the censused root log."""
t = heal(
    t,
    OLD_CENSUS_COMMENT,
    NEW_CENSUS_COMMENT,
    "the census comment truth (the family scope)",
    "tests/parity-276.test.ts",
)

OLD_WALKER = """        const line = lines[i] as string;
        if (!line.startsWith("|")) {
          headerCount = null; // a table block ends
          continue;
        }
        if (/^\\|[-| ]+\\|$/.test(line)) continue; // the delimiter row"""
NEW_WALKER = """        const line = lines[i] as string;
        if (!isPipeRow(line)) {
          headerCount = null; // a table block ends
          continue;
        }
        if (/^ {0,3}\\|[-| ]+\\|$/.test(line)) continue; // the delimiter row"""
t = heal(
    t,
    OLD_WALKER,
    NEW_WALKER,
    "the census walker's indented-row predicate",
    "tests/parity-276.test.ts",
)

OLD_ISPIPEROW_ANCHOR = """const normComment = (s: string): string =>
  norm(s.replace(/^[ \\t]*(?:\\/\\/|\\*)[ \\t]*/gm, " "));
"""
NEW_ISPIPEROW = """const normComment = (s: string): string =>
  norm(s.replace(/^[ \\t]*(?:\\/\\/|\\*)[ \\t]*/gm, " "));

// The indented-row predicate (session 278, R-75, F-278b): GFM admits
// tables indented up to three leading spaces — a column-0-only
// predicate is blind to an indented orphan block exactly the way the
// pre-F-277d walker was blind to fenced pipe lines.
const isPipeRow = (l: string) => /^ {0,3}\\|/.test(l);
"""
if "const isPipeRow" in t:
    print("  [skip] tests/parity-276.test.ts: the module-level indented-row predicate already healed")
else:
    t = heal(
        t,
        OLD_ISPIPEROW_ANCHOR,
        NEW_ISPIPEROW,
        "the module-level indented-row predicate",
        "tests/parity-276.test.ts",
    )

with open("tests/parity-276.test.ts", "w", encoding="utf-8") as f:
    f.write(t)

# ---- 4. parity-277: the same extension + hardening ---------------------
with open("tests/parity-277.test.ts", encoding="utf-8") as f:
    t = f.read()

OLD_DOCS_277 = """// The doc set the table-truth censuses walk (the seven living docs —
// worklog.md joined at this round, the F-277d scope cure).
const DOCS = [
  "docs/remediation_plan_v2.md",
  "README.md",
  "AGENTS.md",
  "CLAUDE.md",
  "wealth-os_SKILL.md",
  "Project_Architecture_Document.md",
  "worklog.md",
] as const;"""
NEW_DOCS_277 = """// The doc set the table-truth censuses walk (the fifteen-file curated
// tracked-doc family — worklog.md joined the seven living docs at
// session 277's F-277d scope cure; session 278's F-278a extension
// added the eight curated files: the deployment guide, the Tailwind
// validation report, the coding agent prompt, the push runbook, the
// session-199 implementation plan, the skills inventory, the web-app
// evaluation report, and the sibling skill doc at the root; the
// transcript family and the skills library stay outside the census —
// the immutable-record doctrine and the owner's exclusion directive;
// docs/worklog.md is the parity-227-pinned symlink of the censused
// root log).
const DOCS = [
  "docs/remediation_plan_v2.md",
  "README.md",
  "AGENTS.md",
  "CLAUDE.md",
  "wealth-os_SKILL.md",
  "Project_Architecture_Document.md",
  "worklog.md",
  "docs/DEPLOYMENT.md",
  "docs/Tailwind-V4-Validation-Report.md",
  "docs/coding_agent_prompt.md",
  "docs/how-to-git-push-using-ssh-wrapper_SKILL.md",
  "docs/implementation-plan-session-199-wealthos.md",
  "docs/skills-inventory.md",
  "docs/web-app-codebase-evaluation-report.md",
  "neo-crm_SKILL.md",
] as const;"""
t = heal(t, OLD_DOCS_277, NEW_DOCS_277, "the DOCS list extension", "tests/parity-277.test.ts")

OLD_WALKER_277 = """      while (i < lines.length) {
        if ((lines[i] ?? "").startsWith("|")) {
          let j = i;
          while (j < lines.length && (lines[j] ?? "").startsWith("|")) j += 1;"""
NEW_WALKER_277 = """      while (i < lines.length) {
        if (isPipeRow(lines[i] ?? "")) {
          let j = i;
          while (j < lines.length && isPipeRow(lines[j] ?? "")) j += 1;"""
t = heal(
    t,
    OLD_WALKER_277,
    NEW_WALKER_277,
    "the orphan census walker's indented-row predicate",
    "tests/parity-277.test.ts",
)

OLD_DELIM_277 = """// The delimiter-row shape a GFM table's second line must carry.
const isDelimiter = (l: string): boolean => /^\\s*\\|[\\s:|-]+\\|\\s*$/.test(l);"""
NEW_DELIM_277 = """// The delimiter-row shape a GFM table's second line must carry.
const isDelimiter = (l: string): boolean => /^\\s*\\|[\\s:|-]+\\|\\s*$/.test(l);

// The indented-row predicate (session 278, R-75, F-278b): GFM admits
// tables indented up to three leading spaces — the census's row
// predicate must admit them too (the fence-awareness hardening's
// soundness sibling).
const isPipeRow = (l: string) => /^ {0,3}\\|/.test(l);"""
if "const isPipeRow" in t:
    print("  [skip] tests/parity-277.test.ts: the module-level indented-row predicate already healed")
else:
    t = heal(
        t,
        OLD_DELIM_277,
        NEW_DELIM_277,
        "the module-level indented-row predicate",
        "tests/parity-277.test.ts",
    )

OLD_277D_COMMENT = """    // The pre-cure DOCS list covered six files; worklog.md — the
    // seventh living doc — was absent (luck-of-the-tree: zero
    // pipe-prefixed blocks there today). The hardened census walks
    // all seven."""
NEW_277D_COMMENT = """    // The pre-cure DOCS list covered six files; worklog.md — the
    // seventh living doc — was absent (luck-of-the-tree: zero
    // pipe-prefixed blocks there today). The hardened census walked
    // all seven until session 278 (R-75, F-278a) extended both DOCS
    // lists to the fifteen-file curated tracked-doc family."""
t = heal(
    t,
    OLD_277D_COMMENT,
    NEW_277D_COMMENT,
    "the F-277d leg's extension note",
    "tests/parity-277.test.ts",
)

with open("tests/parity-277.test.ts", "w", encoding="utf-8") as f:
    f.write(t)

# ---- 5. the a11y register's duplicate de-dup ---------------------------
with open("tests/e2e/a11y.spec.ts", encoding="utf-8") as f:
    t = f.read()

OLD_ARM = """    {
      // the muted micro-captions (the % funded, the synced pill)
      any: ["text-stone-400", "text-stone-500"],
      cite: "the muted caption family — the reference's own palette",
    },"""
NEW_ARM = """    {
      // the muted micro-captions (the % funded, the synced pill)
      // Session-278 (R-75, F-278c): the stone 400 caption matcher
      // de-dups to the gradient arm's cite above — one cite covers
      // both surfaces (the F-220p stale-arm class's de-dup
      // edition; the register's union is unchanged).
      any: ["text-stone-500"],
      cite: "the muted caption family — the reference's own palette",
    },"""
t = heal(t, OLD_ARM, NEW_ARM, "the register's duplicate matcher de-dup", "tests/e2e/a11y.spec.ts")

with open("tests/e2e/a11y.spec.ts", "w", encoding="utf-8") as f:
    f.write(t)

print("[cures-278] all five sites cured (or verified healed) — zero application behavior changed.")
