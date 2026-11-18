#!/usr/bin/env python3
"""Session-273 cures (R-70.2) — every site asserted exactly-once; the
script exits BEFORE any write on failure (atomic per file). The one-shot
record convention: a site whose anchor no longer matches aborts the run.

F-273a — the dynamic-viewport swap: the shell root h-screen → h-dvh,
both comment carriers reworded, the toast column's max-h-screen →
max-h-dvh (the same-genus completion).
F-273b — the config-loader cure: vitest.config.ts → vitest.config.mts
+ the tsconfig *.mts include (the type gate must cover the renamed
file) + the six reference sites."""

import os
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def cure(rel: str, pairs: list[tuple[str, str]]) -> None:
    full = os.path.join(REPO, rel)
    with open(full, encoding="utf-8") as f:
        s = f.read()
    for old, new in pairs:
        n = s.count(old)
        if n != 1:
            sys.exit(f"[{rel}] expected 1 occurrence, found {n}: {old[:70]!r}")
        s = s.replace(old, new, 1)
    with open(full, "w", encoding="utf-8") as f:
        f.write(s)
    print(f"cured {rel}")


# ---- F-273a: the dynamic-viewport swap ----------------------------------

cure(
    "src/lib/page-layout.ts",
    [
        # The code site (the iOS dynamic-viewport trap; the F-220p
        # register entry promoted with the reference construction
        # decoded — no parity constraint binds the height mechanism,
        # and 100dvh equals 100vh in headless Chromium).
        (
            'root: "flex h-screen overflow-hidden bg-background page-wash",',
            'root: "flex h-dvh overflow-hidden bg-background page-wash",',
        ),
        # The comment carrier (a comment-carried h-screen emits dead
        # CSS once the code site is cured — the F-229d net's trigger).
        (
            "inside the h-screen overflow-hidden",
            "inside the h-dvh overflow-hidden",
        ),
    ],
)

cure(
    "src/components/layout/app-shell.tsx",
    [
        # The docblock carrier — the dynamic viewport form.
        (
            "an `flex h-screen` row holds the",
            "an `flex h-dvh` row holds the",
        ),
    ],
)

cure(
    "src/components/ui/toast.tsx",
    [
        # The same-genus completion: a fixed-position element capped at
        # the STATIC viewport on the mobile widths where the dynamic
        # toolbar lives.
        (
            "flex max-h-screen w-full flex-col-reverse",
            "flex max-h-dvh w-full flex-col-reverse",
        ),
    ],
)

# ---- F-273b: the config-loader cure --------------------------------------

old_cfg = os.path.join(REPO, "vitest.config.ts")
new_cfg = os.path.join(REPO, "vitest.config.mts")
if os.path.exists(old_cfg):
    if os.path.exists(new_cfg):
        sys.exit("[rename] vitest.config.mts already exists")
    os.rename(old_cfg, new_cfg)
    print("renamed vitest.config.ts -> vitest.config.mts")
elif not os.path.exists(new_cfg):
    sys.exit("[rename] neither vitest.config.ts nor .mts found")

cure(
    "tsconfig.json",
    [
        # "**/*.ts" does not match ".mts" — without this include the
        # renamed config silently leaves the tsc program (the gate
        # must cover the file in its new form).
        (
            '"**/*.ts",',
            '"**/*.ts",\n    "**/*.mts",',
        ),
    ],
)

cure(
    "next.config.ts",
    [
        # The outputFileTracingExcludes entry (artifact hygiene —
        # smoke leg 14's class).
        (
            '"vitest.config.ts",',
            '"vitest.config.mts",',
        ),
    ],
)

cure(
    "playwright.config.ts",
    [
        # The unit-layer pointer comment.
        (
            "(see vitest.config.ts — it matches",
            "(see vitest.config.mts — it matches",
        ),
    ],
)

cure(
    "tests/parity-229.test.ts",
    [
        # The root-config walk lists (both sites — the contract-change
        # rule: the pin updates in the same commit as the rename).
        (
            '  "eslint.config.mjs",\n  "vitest.config.ts",\n  "prisma.config.ts",\n  "postcss.config.mjs",\n  "components.json",\n  "tsconfig.json",\n',
            '  "eslint.config.mjs",\n  "vitest.config.mts",\n  "prisma.config.ts",\n  "postcss.config.mjs",\n  "components.json",\n  "tsconfig.json",\n',
        ),
    ],
)

cure(
    "README.md",
    [
        # The file-tree row.
        (
            "📄 vitest.config.ts        # Node environment, jsdom-free",
            "📄 vitest.config.mts       # Node environment, jsdom-free",
        ),
    ],
)

cure(
    "wealth-os_SKILL.md",
    [
        # The file card.
        (
            "| `vitest.config.ts` | Node environment, jsdom-free, `tests/` include |",
            "| `vitest.config.mts` | Node environment, jsdom-free, `tests/` include |",
        ),
    ],
)

# ---- the ledger trues (the F-273b disposition gains the tsconfig site) ---

cure(
    "docs/remediation_plan_v2.md",
    [
        (
            "git mv to vitest.config.mts + the six reference sites trued: next.config.ts:75 exclusion entry, tests/parity-229.test.ts:172,261 walk lists, README.md:107 tree row, wealth-os_SKILL.md:185 file card, playwright.config.ts:19 comment; pinned by the parity-273 rename legs",
            "git mv to vitest.config.mts + the tsconfig.json include extended with **/*.mts (the renamed file cannot escape the type gate) + the six reference sites trued: next.config.ts:75 exclusion entry, tests/parity-229.test.ts:172,261 walk lists, README.md:107 tree row, wealth-os_SKILL.md:185 file card, playwright.config.ts:19 comment; pinned by the parity-273 rename legs",
        ),
    ],
)

print("cures-273 complete: F-273a (4 sites) + F-273b (rename + 7 sites) + the ledger trues")
