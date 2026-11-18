#!/usr/bin/env python3
"""Session-272 cures — R-69.2 (the census-reanchor, phantom-primitive,
and layer-map round).

Every swap asserts the old form appears exactly once before replacing
(the F-242j lesson: unscoped replacements corrupt historical blocks).
ZERO application behavior changes except the boxText wiring, which is
class-string consolidation over a byte-identical DOM."""

import sys


def swap(text: str, old: str, new: str, label: str) -> str:
    n = text.count(old)
    if n != 1:
        sys.exit(f"[{label}] expected 1 occurrence, found {n}: {old[:70]!r}")
    return text.replace(old, new, 1)


def read(rel: str) -> str:
    with open(rel, encoding="utf-8") as f:
        return f.read()


def write(rel: str, content: str) -> None:
    with open(rel, "w", encoding="utf-8") as f:
        f.write(content)


# ==========================================================================
# A. the PAD §10 advisories row — the census re-anchor 2 → 1 (F-272a)
# ==========================================================================
pad = read("Project_Architecture_Document.md")

pad = swap(
    pad,
    "Dev-toolchain advisories census (`bun audit`, re-triaged session 268): 2 advisories: 1 high / 1 moderate — all dev-toolchain, zero runtime chains",
    "Dev-toolchain advisories census (`bun audit`, re-triaged session 272): 1 advisory: 1 moderate — all dev-toolchain, zero runtime chains",
    "pad-census-count",
)

pad = swap(
    pad,
    " | NEW at session 268 (R-65, F-268d): picomatch GHSA-fc5q-39xc-vjpf",
    " | RE-ANCHORED at session 272 (R-69, F-272a): the picomatch HIGH (GHSA-fc5q-39xc-vjpf / CVE-2026-112366) dropped off npm's audit data against the same picomatch@4.0.7 the lockfile still resolves (verified at the registry's bulk advisory endpoint; the GitHub advisory page still publishes it — affected ≤ 4.0.7, no patch released; 26 terminal dev-chain paths, zero runtime); the re-triage duty watches its return. NEW at session 268 (R-65, F-268d): picomatch GHSA-fc5q-39xc-vjpf",
    "pad-census-decode",
)

pad = swap(
    pad,
    "Accepted (re-triaged session 268; cured floors pinned:",
    "Accepted (re-triaged session 272; cured floors pinned:",
    "pad-census-status",
)

# ==========================================================================
# B. the phantom-primitive family (F-272c/F-272d/F-272e/F-272q)
# ==========================================================================
pad = swap(
    pad,
    "popover 1.3.1 · label 2.1.17 · slot 1.5.0",
    "popover 1.3.1 · slot 1.5.0",
    "pad-stack-row",
)

pad = swap(
    pad,
    "│   │   └── ui/                  # Radix-wrapped primitives: button, input, select,\n│   │                            # tabs, dialog, dropdown, label, popover, textarea",
    "│   │   └── ui/                  # 8 primitives: avatar, badge, button, dialog,\n│   │                            # dropdown, select, tabs, toast (button/dialog/\n│   │                            # dropdown/select ride Radix; tabs, badge, toast\n│   │                            # are native-ARIA; avatar is a helper seam)",
    "pad-32-ui-inventory",
)

pad = swap(
    pad,
    "Radix wrapped by `src/components/ui/*` (button/input/select/tabs/dialog/\ndropdown/popover/label/textarea) styled with cva variants + the token\nclasses.",
    "`src/components/ui/*` (avatar, badge, button, dialog, dropdown, select,\ntabs, toast — button/dialog/dropdown/select ride Radix; tabs, badge, and\ntoast are native-ARIA; avatar exports the avatarTextColor helper)\nstyled with cva variants + the token classes.",
    "pad-53-ui-inventory",
)

# ==========================================================================
# C. the count family (F-272h/F-272i/F-272j/F-272k/F-272p/F-272t)
# ==========================================================================
pad = swap(pad, "20 families]", "18 families]", "pad-mermaid-families")
pad = swap(pad, "# 20 families: transactions, income-sources, accounts,", "# 18 families: transactions, income-sources, accounts,", "pad-32-families-count")
pad = swap(
    pad,
    "│   │   │   │                    # analytics, auth/*, export, reset, search, settings,\n│   │   │   │                    # users, health, upload(s)",
    "│   │   │   │                    # auth/*, export, reset, search, settings, users,\n│   │   │   │                    # health, upload, uploads",
    "pad-32-families-enum",
)
pad = swap(pad, "(PageCard, KpiCard, EmptyState, …)", "(PageHeader, KpiCard, EmptyState, …)", "pad-pageparts-gloss")
pad = swap(pad, "(Transaction, AccountView, …)", "(Transaction, BankAccount, …)", "pad-types-gloss")
pad = swap(pad, "The 14-assertion artifact ladder", "The 15-assertion artifact ladder", "pad-smoke-count")
pad = swap(pad, "| `--color-muted` | `#78716c` stone-500 | Secondary text | 4.7:1 on white (AA) |", "| `--color-muted` | `#78716c` stone-500 | Secondary text | 4.80:1 on white (AA) |", "pad-muted-contrast")
pad = swap(pad, "| emerald-700 | `#047857` | Positive deltas, income | 5.2:1 (AA) |", "| emerald-700 | `#047857` | Positive deltas, income | 5.48:1 (AA) |", "pad-emerald-contrast")
pad = swap(pad, "| red-600 | `#dc2626` | Negative deltas, destructive | 4.5:1 (AA) |", "| red-600 | `#dc2626` | Negative deltas, destructive | 4.83:1 (AA) |", "pad-red-contrast")
pad = swap(pad, "| Toolchain | Bun | ≥1.3.14 |", "| Toolchain | Bun | ≥ 1.3 |", "pad-bun-floor")

# ---- the PAD §11 ~line counts (F-272o) -----------------------------------
PAD11 = [
    ("| `prisma/schema.prisma` | ~150 |", "| `prisma/schema.prisma` | ~230 |"),
    ("| `prisma/seed.ts` | ~300 |", "| `prisma/seed.ts` | ~330 |"),
    ("| `src/lib/finance.ts` | ~400 |", "| `src/lib/finance.ts` | ~970 |"),
    ("| `src/lib/ai.ts` | ~350 |", "| `src/lib/ai.ts` | ~310 |"),
    ("| `src/lib/schemas.ts` | ~510 |", "| `src/lib/schemas.ts` | ~660 |"),
    ("| `src/lib/api.ts` | ~120 |", "| `src/lib/api.ts` | ~450 |"),
    ("| `src/lib/auth.ts` | ~180 |", "| `src/lib/auth.ts` | ~230 |"),
    ("| `src/lib/db-path.ts` | ~100 |", "| `src/lib/db-path.ts` | ~230 |"),
    ("| `src/lib/site.ts` | ~180 |", "| `src/lib/site.ts` | ~120 |"),
    ("| `src/lib/page-layout.ts` | ~200 |", "| `src/lib/page-layout.ts` | ~530 |"),
    ("| `src/components/layout/app-shell.tsx` | ~120 |", "| `src/components/layout/app-shell.tsx` | ~160 |"),
    ("| `src/components/layout/mobile-nav.tsx` | ~110 |", "| `src/components/layout/mobile-nav.tsx` | ~220 |"),
    ("| `src/components/shared/page-parts.tsx` | ~200 |", "| `src/components/shared/page-parts.tsx` | ~280 |"),
    ("| `src/app/(app)/dashboard/page.tsx` | ~400 |", "| `src/app/(app)/dashboard/page.tsx` | ~700 |"),
    ("| `src/app/globals.css` | ~250 |", "| `src/app/globals.css` | ~590 |"),
    ("| `scripts/smoke-test.sh` | ~160 |", "| `scripts/smoke-test.sh` | ~200 |"),
    ("| `tests/e2e/wealthos.spec.ts` | ~260 |", "| `tests/e2e/wealthos.spec.ts` | ~1200 |"),
    ("| `docs/ssh_git_wrapper_v3.py` | ~300 |", "| `docs/ssh_git_wrapper_v3.py` | ~340 |"),
]
for old, new in PAD11:
    pad = swap(pad, old, new, f"pad11-{old[2:30]}")

write("Project_Architecture_Document.md", pad)
print("PAD: census re-anchor + phantom family + counts + §11 — done")

# ==========================================================================
# README cures (F-272c/F-272h/F-272q)
# ==========================================================================
readme = read("README.md")
readme = swap(readme, "Dialog, Select, Tabs, Dropdown, Popover, Label", "Dialog, Select, Dropdown, Popover, Slot", "readme-arch-row")
readme = swap(readme, "20 resource families", "18 resource families", "readme-mermaid")
readme = swap(readme, "20 route-handler families", "18 route-handler families", "readme-tree")
readme = swap(readme, "20 API families", "18 API families", "readme-status")
readme = swap(
    readme,
    "│   └── 📂 ui/                 # Radix-wrapped primitives (button, input, tabs, …)",
    "│   └── 📂 ui/                 # ui primitives (button, dialog, dropdown, select, tabs, toast, …)",
    "readme-ui-tree",
)
write("README.md", readme)
print("README: arch row + families + ui tree — done")

# ==========================================================================
# SKILL cures (F-272b/F-272f/F-272g/F-272j/F-272l/F-272m/F-272n/F-272q)
# ==========================================================================
skill = read("wealth-os_SKILL.md")

# -- the stack table's phantom -tabs (F-272b)
skill = swap(
    skill,
    "(`@radix-ui/react-dialog`, `-select`, `-tabs`, `-dropdown-menu`, `-popover`, `-slot`)",
    "(`@radix-ui/react-dialog`, `-select`, `-dropdown-menu`, `-popover`, `-slot`)",
    "skill-stack-tabs",
)

# -- the §4 mirror (F-272g)
skill = swap(
    skill,
    "--color-primary-foreground: #ffffff;\n",
    "--color-primary-foreground: #1c1917;  /* stone-900 ink on amber (session 219) */\n",
    "skill-mirror-primary-fg",
)
skill = swap(skill, "--color-subtle: #a8a29e;           /* stone-400 */\n", "", "skill-mirror-subtle")
skill = swap(
    skill,
    "--radius-card: 0.75rem;            /* 12px cards */\n--radius-button: 0.5rem;           /* 8px buttons */\n--radius-pill: 9999px;             /* badges/chips */\n",
    "",
    "skill-mirror-radius",
)
skill = swap(
    skill,
    "5. `@layer utilities` — `.dark body`, `.sidebar-gradient`, `.page-wash`\n   re-maps: dark mode re-declares the semantic tokens once and every\n   surface follows",
    "5. `@utility` declarations — `card-hover`, `sidebar-gradient`, `.page-wash`\n   (each with its own `.dark` variant); dark mode re-declares the\n   semantic tokens once in the `.dark` block and every surface follows",
    "skill-structure-utilities",
)

# -- the §18 z-index layer map (F-272f)
skill = swap(
    skill,
    "| 20 | `z-20` | expenses table sticky header | row header stays above cells |\n| 40 | `z-40` | mobile header (`mobile-header.tsx`) + drawer overlay (`mobile-nav.tsx`) | the sticky bar the drawer slides UNDER |\n| 50 | `z-50` | drawer content, select/dropdown content (`select.tsx`, `dropdown.tsx`) | pop above page chrome |\n| 60 | `z-[60]` | elevated select/dropdown surfaces | above the drawer when both open |\n| 100 | `z-[100]` | toast viewport (`toast.tsx`) | always last |",
    "| 10 | `z-10` | sidebar interior (brand, nav, footer — NAV_LAYOUT) | above the sidebar gradient |\n| 40 | `z-40` | drawer overlay + sheet (`mobile-nav.tsx`, MOBILE_NAV) | slides under the sticky header |\n| 50 | `z-50` | mobile header (MOBILE_HEADER), dialog overlay + content, select/dropdown/menu content | page chrome + portals |\n| 60 | `z-[60]` | skip link's focused reveal (app-shell, the F-225d cure) | above the whole z-50 family |\n| 100 | `z-[100]` | toast viewport (`toast.tsx`) | always last |",
    "skill-z-map",
)
skill = swap(
    skill,
    "Rules: toasts outrank everything; portal content (Radix) at 50/60; page\nchrome at 20/40. New overlays join the ladder — no ad-hoc `z-[999]`.",
    "Rules: toasts outrank everything; portal content (Radix) at 50; the\nskip link clears the whole z-50 family at 60; page chrome at 10/40.\nNew overlays join the ladder — no ad-hoc `z-[999]`.",
    "skill-z-rules",
)

# -- the §19 table + dark mechanism + ramps (F-272g/F-272m)
skill = swap(
    skill,
    "| `--color-primary-foreground` | `#ffffff` | | text on primary |",
    "| `--color-primary-foreground` | `#1c1917` | | text on primary |",
    "skill-19-primary-fg",
)
skill = swap(skill, "| `--color-subtle` | `#a8a29e` | | tertiary text |\n", "", "skill-19-subtle")
skill = swap(
    skill,
    "**Dark theme:** `.dark` class on `<html>` + `@custom-variant dark`;\n`.dark body`, `.sidebar-gradient`, `.page-wash` re-map the semantic set\n(stone-950 washes, stone-800 surfaces, stone-100 ink); the `.dark` block\nflips the seven app-native tokens too (session-217 — see §2). Because\nsurfaces read the semantic tokens, a re-map propagates everywhere — new\nsurfaces must consume tokens, not hex.",
    "**Dark theme:** `.dark` class on `<html>` + `@custom-variant dark`; the\n`.dark` block flips the semantic set AND the seven app-native tokens\n(session-217 — see §2); the `sidebar-gradient` and `page-wash` utilities\ncarry their own `.dark` variants. Because surfaces read the semantic\ntokens, a flip propagates everywhere — new surfaces must consume tokens,\nnot hex.",
    "skill-19-dark-mechanism",
)
skill = swap(
    skill,
    "**Re-pinned ramps (v3 hex, the full `@theme` set):** amber 50–900\n(`#fffbeb` → `#78350f`), blue 50–700 (`#eff6ff` → `#1d4ed8`), cyan\n400/500 (`#22d3ee`/`#06b6d4`), emerald 50–800 (`#ecfdf5` → `#065f46`),\nred 50–700 (`#fef2f2` → `#b91c1c`), rose 50–700 (`#fff1f2` →\n`#be123c`), stone 50–950 (`#fafaf9` → `#0c0a09`), teal 50–700\n(`#f0fdfa` → `#0f766e`).",
    "**Re-pinned ramps (v3 hex, the full `@theme` set):** amber 50–950\n(`#fffbeb` → `#451a03`), blue 50–950 (`#eff6ff` → `#172554`), cyan 500\n(`#06b6d4`), emerald 50–950 (`#ecfdf5` → `#022c22`), red 50–950\n(`#fef2f2` → `#450a0a`), rose 50–950 non-contiguous (`#fff1f2` →\n`#4c0519`; no 100, no 700), stone 50–950 (`#fafaf9` → `#0c0a09`), teal\n500–700 (`#14b8a6` → `#0f766e`).",
    "skill-19-ramps",
)
skill = swap(
    skill,
    "body `stone-500`+ never below 4.5:1 on `stone-100`.",
    "body text `stone-600`+ (`stone-500` on `stone-100` computes 4.40:1 —\nsub-AA for body).",
    "skill-19-stone-arithmetic",
)

# -- the line counts + anchors (F-272n)
skill = swap(skill, "`src/app/globals.css` (396 lines)", "`src/app/globals.css` (589 lines)", "skill-globals-count")
skill = swap(skill, "(`src/lib/api.ts`, 308 lines)", "(`src/lib/api.ts`, 446 lines)", "skill-api-count")
skill = swap(skill, "store (384 lines):", "store (738 lines):", "skill-store-count")
skill = swap(skill, "`src/stores/wealthos-store.ts:383`", "`src/stores/wealthos-store.ts:737`", "skill-store-anchor")
skill = swap(skill, "`src/lib/finance.ts` (622 lines, pure and", "`src/lib/finance.ts` (969 lines, pure and", "skill-finance-count")
skill = swap(skill, "(`prisma/seed.ts`, 305 lines, deterministic)", "(`prisma/seed.ts`, 333 lines, deterministic)", "skill-seed-count")
skill = swap(skill, "(`src/lib/ai.ts`, 280 lines)", "(`src/lib/ai.ts`, 308 lines)", "skill-ai-count")
skill = swap(skill, "`src/components/layout/theme.tsx:111`", "`src/components/layout/theme.tsx:154`", "skill-usetheme-anchor")
skill = swap(skill, "`src/components/layout/theme.tsx:63`", "`src/components/layout/theme.tsx:78`", "skill-useisdark-anchor")
skill = swap(skill, "(`src/lib/page-layout.ts`, 262 lines)", "(`src/lib/page-layout.ts`, 526 lines)", "skill-pagelayout-count")
skill = swap(skill, "(`src/lib/schemas.ts`, 504 lines, 24 exported)", "(`src/lib/schemas.ts`, 658 lines, 24 exported)", "skill-schemas-count")

# -- the inventory gloss + StatCard (F-272j/F-272q)
skill = swap(
    skill,
    "| `src/components/ui/` | 8 tsx | Radix-wrapped primitives: avatar, badge, button, dialog, dropdown, select, tabs, toast |",
    "| `src/components/ui/` | 8 tsx | avatar (the avatarTextColor helper), badge, button, dialog, dropdown, select, tabs, toast — button/dialog/dropdown/select ride Radix; badge/tabs/toast are native-ARIA |",
    "skill-inventory-gloss",
)
skill = swap(skill, "PageHeader, StatCard, EmptyState, …", "PageHeader, KpiCard, EmptyState, …", "skill-statcard")

# -- Appendix D's smoke count (F-272l)
skill = swap(skill, "(`scripts/smoke-test.sh`, 14 checks)", "(`scripts/smoke-test.sh`, 15 checks)", "skill-appd-smoke")

write("wealth-os_SKILL.md", skill)
print("SKILL: stack + mirror + z-map + counts + glosses — done")

# ==========================================================================
# D. the boxText wiring (F-272r) — the one src change
# ==========================================================================
settings = read("src/app/(app)/settings/page.tsx")
n = settings.count('className="text-sm text-stone-600 dark:text-stone-400"')
if n != 3:
    sys.exit(f"[boxText] expected 3 literal sites, found {n}")
settings = settings.replace(
    'className="text-sm text-stone-600 dark:text-stone-400"',
    "className={SETTINGS_CARD.boxText}",
)
write("src/app/(app)/settings/page.tsx", settings)
print("settings: the three box-text sites wired to SETTINGS_CARD.boxText — done")
