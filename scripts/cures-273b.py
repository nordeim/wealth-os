#!/usr/bin/env python3
"""Session-273 cures, part B (R-70.2) — the parity-229 ROOT_CONFIGS
twin the first script's 2-space window missed (the F-247e slice-window
lesson: the two lists differ by indentation — ROOT_CONFIG_FILES rides
module scope at 2 spaces, ROOT_CONFIGS rides the describe callback at
4). Every site asserted exactly-once; exits before any write."""

import os
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

full = os.path.join(REPO, "tests/parity-229.test.ts")
with open(full, encoding="utf-8") as f:
    s = f.read()

old = (
    '  const ROOT_CONFIGS = [\n'
    '    "next.config.ts",\n'
    '    "playwright.config.ts",\n'
    '    "eslint.config.mjs",\n'
    '    "vitest.config.ts",\n'
    '    "prisma.config.ts",\n'
    '    "postcss.config.mjs",\n'
    '    "components.json",\n'
    '    "tsconfig.json",\n'
    '    "package.json",\n'
    '  ];\n'
)
new = old.replace('"vitest.config.ts",', '"vitest.config.mts",')

n = s.count(old)
if n != 1:
    sys.exit(f"[parity-229 ROOT_CONFIGS] expected 1 occurrence, found {n}")
s = s.replace(old, new, 1)

with open(full, "w", encoding="utf-8") as f:
    f.write(s)
print("cured tests/parity-229.test.ts (the ROOT_CONFIGS twin, 4-space form)")
