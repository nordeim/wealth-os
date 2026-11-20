#!/usr/bin/env python3
"""Session-279 driving-session re-verification census over the curated 15-file family.

Checks (the three latent genus findings from the fresh-eyes audit):
1. F-279b live scan: any table whose delimiter cell count != header cell count
   (GFM renders no table; all three standing censuses pass).
2. F-279c live scan: any pipe-prefixed line inside an INDENTED (list-item) fence
   (the column-0-only fence strippers never blank them).
3. F-279a live scan: the colon-aligned delimiter rows parity-276 walks as data
   rows (the drift's live population).
"""
import re
from pathlib import Path

ROOT = Path("/home/z/my-project/wealth-os")
FAMILY = [
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
]

is_pipe_row = re.compile(r"^ {0,3}\|")
is_delim_277 = re.compile(r"^\s*\|[\s:|-]+\|\s*$")     # colon-tolerant (parity-277/278)
is_delim_276 = re.compile(r"^ {0,3}\|[-| ]+\|$")        # colon-blind (parity-276)
fence_col0 = re.compile(r"^```")

cell_drop = []      # F-279b live instances
indented_pipe = []  # F-279c live instances
colon_walked = []   # F-279a live population

for rel in FAMILY:
    raw_lines = (ROOT / rel).read_text(encoding="utf8").split("\n")
    # Column-0 fence stripping (the standing form all three walkers ship).
    lines = []
    fence = False
    for raw in raw_lines:
        if fence_col0.match(raw):
            fence = not fence
            lines.append("")
            continue
        lines.append("" if fence else raw)
    # F-279a: colon-aligned delimiters (matched by 277's shape, NOT 276's).
    for i, line in enumerate(lines):
        if is_delim_277.match(line) and not is_delim_276.match(line):
            colon_walked.append(f"{rel}:{i + 1}")
    # F-279b: header vs delimiter cell count over every pipe block.
    i = 0
    while i < len(lines):
        if is_pipe_row.match(lines[i] or ""):
            j = i
            while j < len(lines) and is_pipe_row.match(lines[j] or ""):
                j += 1
            block = lines[i:j]
            if len(block) >= 2 and is_delim_277.match(block[1] or ""):
                header_cells = block[0].replace("\\|", "").count("|") - 1
                delim_cells = block[1].replace("\\|", "").count("|") - 1
                if header_cells != delim_cells:
                    cell_drop.append(
                        f"{rel}:{i + 2} header={header_cells} delim={delim_cells}"
                    )
            i = j
        else:
            i += 1
    # F-279c: pipe rows inside indented fences (never stripped by the walkers).
    fence = False
    fence_indent = ""
    for k, raw in enumerate(raw_lines):
        m = re.match(r"^( {1,3})```", raw)
        if m and not fence:
            fence = True
            fence_indent = m.group(1)
            continue
        if fence and raw.startswith(fence_indent + "```"):
            fence = False
            continue
        if fence and is_pipe_row.match(raw):
            indented_pipe.append(f"{rel}:{k + 1}")

print(f"[F-279a] colon-aligned delimiter rows walked as DATA by parity-276: "
      f"{len(colon_walked)} live")
for c in colon_walked[:20]:
    print(f"    {c}")
print(f"[F-279b] header-vs-delimiter cell-count mismatches (render as paragraphs): "
      f"{len(cell_drop)} live")
for c in cell_drop[:20]:
    print(f"    {c}")
print(f"[F-279c] pipe rows inside indented fences (never stripped): "
      f"{len(indented_pipe)} live")
for c in indented_pipe[:20]:
    print(f"    {c}")
