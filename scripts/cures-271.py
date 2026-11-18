#!/usr/bin/env python3
"""Session-271 cures (R-68.2) — the doc-truth, pin-depth, and
register-note round. Every replacement asserted exactly-once (the
F-242j lesson); the battery (tests/parity-271.test.ts) was born RED
over exactly these false forms and must flip GREEN."""

import sys


def swap(text: str, old: str, new: str, label: str) -> str:
    n = text.count(old)
    if n != 1:
        sys.exit(f"[{label}] expected 1 occurrence, found {n}: {old[:60]!r}")
    return text.replace(old, new, 1)


# ---- wealth-os_SKILL.md ---------------------------------------------------
with open("wealth-os_SKILL.md", encoding="utf-8") as f:
    s = f.read()

# F-271l: the design-genus delta line (the reference's own red sat at
# the lighter 500 step; our F-218j re-pin darkened it).
s = swap(
    s,
    "- Positive deltas are emerald, negative are red/rose; the reference's KPI\n"
    "  deltas use `emerald-700`/`red-700`-class values for AA contrast at small\n"
    "  sizes.",
    "- Positive deltas are emerald, negative are red/rose; the KPI delta genus\n"
    "  is the `emerald-700`/`red-600` pair in light mode with the `400`\n"
    "  dark-mode arms (the F-218j AA re-pin — the reference's own red sat at\n"
    "  the lighter 500 step and failed AA at small sizes).",
    "skill:93",
)

# F-271d: the stack table names slot, not the phantom label package.
s = swap(
    s,
    "`-dropdown-menu`, `-popover`, `-label`)",
    "`-dropdown-menu`, `-popover`, `-slot`)",
    "skill:119",
)

# F-271d: the component inventory heading + the ui row.
s = swap(
    s,
    "**Component inventory (23 tsx files + nav-config.ts):**",
    "**Component inventory (18 tsx files + nav-config.ts):**",
    "skill:327",
)
s = swap(
    s,
    "| `src/components/ui/` | 13 tsx | Radix-wrapped primitives: avatar, badge, button, card, dialog, dropdown, icons, input, label, select, table, tabs, toast |",
    "| `src/components/ui/` | 8 tsx | Radix-wrapped primitives: avatar, badge, button, dialog, dropdown, select, tabs, toast |",
    "skill:332",
)

# F-271e: the import paragraph's two-step wizard.
s = swap(
    s,
    "**The CSV import (`src/lib/csv.ts` + `/api/import`):** smart column\n"
    "detection (header name matching with fallbacks), 3-step wizard (upload →\n"
    "detection preview → review & commit), 10 MB cap, CSV/XLS/XLSX.",
    "**The CSV import (`src/lib/csv.ts` + `/api/import`):** smart column\n"
    "detection (header name matching with fallbacks, a synchronous in-pick\n"
    "pass), 2-step wizard (upload → review & import), 10 MB cap,\n"
    "CSV/XLS/XLSX.",
    "skill:474",
)

# F-271c: the §8 a11y battery opener — the real count and viewports.
s = swap(
    s,
    "Verified by the axe battery in `tests/e2e/a11y.spec.ts` (10 checks across\n"
    "the section pages + dialogs) at the 1440×900 and 390×844 viewports.",
    "Verified by the axe battery in `tests/e2e/a11y.spec.ts` — 46 tests (45\n"
    "axe legs: light + dark at desktop and phone across all nine sections,\n"
    "the anonymous faces, the 404, and the open drawer/dialog states, plus\n"
    "the devDep declaration leg) at the 1280×800 and 390×844 viewports.",
    "skill:479",
)

# F-271l: the §8 contrast figures.
s = swap(
    s,
    "- **Contrast**: the reference's own inactive-tab `stone-500` on\n"
    "  `stone-100` measured 4.0:1 — darkened one step to `stone-600` (AA,\n"
    "  negligible visual delta). KPI deltas use `emerald-700`/`red-700`-class\n"
    "  values. The rule: contrast fixes prefer darkening one Tailwind step\n"
    "  over restyling.",
    "- **Contrast**: the reference's own inactive-tab `stone-500` on\n"
    "  `stone-100` computed 4.40:1 — darkened one step to `stone-600` (AA,\n"
    "  negligible visual delta). KPI deltas carry the `emerald-700`/\n"
    "  `red-600` pair in light mode with the `400` dark-mode arms. The rule:\n"
    "  contrast fixes prefer darkening one Tailwind step over restyling.",
    "skill:482",
)

# F-271h: the §8 focus bullet — the per-component ring.
s = swap(
    s,
    "- **Focus**: a global focus-visible ring (`--color-ring` ink) in\n"
    "  `@layer base`; keyboard operability for every dialog/select/dropdown via\n"
    "  the Radix primitives.",
    "- **Focus**: the house ring rides per-component focus-visible utilities\n"
    "  (the Button base, the menu item, the select item — every raw control\n"
    "  carries its own); the base layer only tints the UA outline color.\n"
    "  Keyboard operability for every dialog/select/dropdown via the Radix\n"
    "  primitives.",
    "skill:487",
)

# F-271d: the §8 labels bullet — the real association.
s = swap(
    s,
    "- **Labels**: every input pairs with the Radix `Label` primitive; the\n"
    "  hamburger's accessible name is \"Open navigation menu\" — the e2e and\n"
    "  capture scripts target it by role+name, never by DOM position.",
    "- **Labels**: every input pairs an explicit `<label htmlFor>`\n"
    "  association (the vendored Radix label stock retired at F-232a); the\n"
    "  hamburger's accessible name is \"Open navigation menu\" — the e2e and\n"
    "  capture scripts target it by role+name, never by DOM position.",
    "skill:492",
)

# F-271i: the §8 touch-target bullet + the second battery-count site.
s = swap(
    s,
    "- **Touch targets**: nav rows and buttons meet the 44px-class targets;\n"
    "  the mobile battery (`mobile-navigation.spec.ts`, 10 checks) exercises\n"
    "  the drawer at 390×844.",
    "- **Touch targets**: interactive targets meet the WCAG 2.5.8 24px floor\n"
    "  (the smallest glyphs carry the F-235f/F-236d/F-268b padding\n"
    "  extensions); nav rows are 44px-class. The mobile battery\n"
    "  (`mobile-navigation.spec.ts`, 19 checks) exercises the drawer at\n"
    "  390×844.",
    "skill:499",
)
s = swap(
    s,
    "The e2e mobile battery (10 checks) and the 390 sweep\nhold this contract.",
    "The e2e mobile battery (19 checks) and the 390 sweep\nhold this contract.",
    "skill:990",
)

# F-271l (the third carrier, caught by the battery's whole-file pin):
# the §19 AA-critical pairings list.
s = swap(
    s,
    "`stone-600` on `stone-100`; KPI deltas `emerald-700`/`red-700`-class;",
    "`stone-600` on `stone-100`; KPI deltas the `emerald-700`/`red-600` pair\n"
    "light / `400` dark;",
    "skill:1062",
)

with open("wealth-os_SKILL.md", "w", encoding="utf-8") as f:
    f.write(s)
print("wealth-os_SKILL.md: 10 sites trued")

# ---- README.md ------------------------------------------------------------
with open("README.md", encoding="utf-8") as f:
    r = f.read()

r = swap(
    r,
    "| 📥 CSV Import | 3-step wizard (upload → smart column detection → review & commit), 10 MB cap, CSV/XLS/XLSX |",
    "| 📥 CSV Import | 2-step wizard (upload → review & import, with in-pick smart column detection), 10 MB cap, CSV/XLS/XLSX |",
    "readme:39",
)
r = swap(
    r,
    "| 🎯 Savings Goals | Named targets with progress bars and contribution round-trips |",
    "| 🎯 Savings Goals | Named targets with progress bars and an editable saved-amount round-trip |",
    "readme:41",
)
r = swap(
    r,
    "| 🤖 AI Coach | Deterministic local financial-intelligence engine (optional LLM provider via env) — no API key needed |",
    "| 🤖 AI Coach | Deterministic local financial-intelligence engine (an LLM provider seam is reserved but unwired) — no API key needed |",
    "readme:43",
)
r = swap(
    r,
    "Resource CRUD (goals carry contribution round-trips)",
    "Resource CRUD (goals carry an editable saved-amount round-trip)",
    "readme:191",
)
r = swap(
    r,
    "CSV commit (rows validated client-side through the 3-step wizard; GET returns the column-hint vocabulary)",
    "CSV commit (rows validated client-side through the 2-step wizard; GET returns the column-hint vocabulary)",
    "readme:194",
)

with open("README.md", "w", encoding="utf-8") as f:
    f.write(r)
print("README.md: 5 rows trued")

# ---- the forgot-password rationale (F-271j) -------------------------------
with open("src/app/api/auth/forgot-password/route.ts", encoding="utf-8") as f:
    fp = f.read()

fp = swap(
    fp,
    "signup's 409 openly enumerates by design",
    "signup's 400 openly enumerates by design",
    "forgot-password:85",
)

with open("src/app/api/auth/forgot-password/route.ts", "w", encoding="utf-8") as f:
    f.write(fp)
print("forgot-password: status citation trued")

# ---- the vendored link variant's register note (F-271k) --------------------
with open("src/components/ui/button.tsx", encoding="utf-8") as f:
    b = f.read()

b = swap(
    b,
    '        link: "text-primary underline-offset-4 hover:underline",',
    "        // Session-271 (R-68, F-271k — the F-227f register's link\n"
    "        // edition): the link arm rides the amber primary as its text\n"
    "        // color — roughly 2.1 to 1 on the light surface (the\n"
    "        // dashboard's own measured family). Zero consumers today\n"
    "        // (the vendored stock register); a future consumer must pin a darker\n"
    "        // ink pair or reserve the arm for large text — never inherit\n"
    "        // this silently.\n"
    '        link: "text-primary underline-offset-4 hover:underline",',
    "button:92",
)

with open("src/components/ui/button.tsx", "w", encoding="utf-8") as f:
    f.write(b)
print("button.tsx: the link variant's register note landed")
