#!/usr/bin/env python3
"""Session-272 docs lockstep, part B — the two hierarchy-line sites the
part-A pass missed (README's file-tree comment and the PAD's §3.2 tree
comment carry their own '123 unit suites' forms). Same asserted
exactly-once form; the part-A script stays the round's canonical record."""

import sys


def swap(text: str, old: str, new: str, label: str) -> str:
    n = text.count(old)
    if n != 1:
        sys.exit(f"[{label}] expected 1 occurrence, found {n}: {old[:70]!r}")
    return text.replace(old, new, 1)


with open("README.md", encoding="utf-8") as f:
    r = f.read()
r = swap(r, "# 123 unit suites + 📂 e2e/ 7 specs", "# 124 unit suites + 📂 e2e/ 7 specs", "readme-hierarchy")
with open("README.md", "w", encoding="utf-8") as f:
    f.write(r)

with open("Project_Architecture_Document.md", encoding="utf-8") as f:
    p = f.read()
p = swap(p, "# 123 unit suites (incl. architecture pins) + e2e/ 7 specs", "# 124 unit suites (incl. architecture pins) + e2e/ 7 specs", "pad-hierarchy")
with open("Project_Architecture_Document.md", "w", encoding="utf-8") as f:
    f.write(p)

print("hierarchy lines: 123 → 124 — done")
