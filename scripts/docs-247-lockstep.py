#!/usr/bin/env python3
"""Session-247 (R-44) docs lockstep — the 1601→1610 / 97→98 / badge
1752→1761 replacement round (unit-only: e2e and smoke unchanged).

House convention (assert-each-insertion, the F-242j lesson): every
replacement is scoped to a UNIQUE anchor and asserts the OLD form
exactly once before writing. Idempotent: a second run finds the new
form and skips.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
changes = 0


def swap(file: str, old: str, new: str) -> None:
    """Unique-anchor replacement with assert-once + idempotent skip."""
    global changes
    p = ROOT / file
    src = p.read_text(encoding="utf-8")
    if new in src and old not in src:
        return  # already applied
    assert src.count(old) == 1, f"{file}: anchor not found once ({old[:60]!r}, count={src.count(old)})"
    p.write_text(src.replace(old, new, 1), encoding="utf-8")
    changes += 1


def append_after(file: str, anchor: str, text: str) -> None:
    """Assert-once insertion after a unique anchor."""
    global changes
    p = ROOT / file
    src = p.read_text(encoding="utf-8")
    if text.strip() in src:
        return  # already applied
    assert src.count(anchor) == 1, f"{file}: append anchor not found once"
    p.write_text(src.replace(anchor, anchor + text, 1), encoding="utf-8")
    changes += 1


# ---------------------------------------------------------------------------
# 1. tests/docs-counts.test.ts — the constants + the arch-pins row pin.
# ---------------------------------------------------------------------------
swap("tests/docs-counts.test.ts", "const UNIT_TOTAL = 1601;", "const UNIT_TOTAL = 1610;")
swap("tests/docs-counts.test.ts", "const TEST_FILES = 97;", "const TEST_FILES = 98;")
swap(
    "tests/docs-counts.test.ts",
    "| — architecture pins | 66 | (gate-script,",
    "| — architecture pins | 67 | (gate-script,",
)
swap(
    "tests/docs-counts.test.ts",
    "parity-245, parity-246, db-transient) |",
    "parity-245, parity-246, parity-247, db-transient) |",
)
append_after(
    "tests/docs-counts.test.ts",
    "existing family file, no new row): 4 + 66 + 27 = 97.",
    "\n    // Session-247 (R-44): parity-247 joins the architecture family\n"
    "    // (66 → 67; the two auth.test.ts iat legs add tests inside an\n"
    "    // existing domain file, no new row): 4 + 67 + 27 = 98.",
)

# ---------------------------------------------------------------------------
# 2. Project_Architecture_Document.md — the live-tense count sites.
# ---------------------------------------------------------------------------
swap("Project_Architecture_Document.md", "→ vitest (1601) →", "→ vitest (1610) →")
swap("Project_Architecture_Document.md", "# 97 unit suites (incl. architecture pins)", "# 98 unit suites (incl. architecture pins)")
swap("Project_Architecture_Document.md", "| Unit | 97 | 1601 |", "| Unit | 98 | 1610 |")
swap(
    "Project_Architecture_Document.md",
    "| — architecture pins | 66 | (gate-script,",
    "| — architecture pins | 67 | (gate-script,",
)
swap(
    "Project_Architecture_Document.md",
    "parity-245, parity-246, db-transient) |",
    "parity-245, parity-246, parity-247, db-transient) |",
)
swap("Project_Architecture_Document.md", "`bun run test` → 1601/1601", "`bun run test` → 1610/1610")
swap("Project_Architecture_Document.md", "| 1601 unit / 151 e2e |", "| 1610 unit / 151 e2e |")
swap("Project_Architecture_Document.md", "tsc 0 · 1601 unit · build · smoke 15/15 ·", "tsc 0 · 1610 unit · build · smoke 15/15 ·")

# ---------------------------------------------------------------------------
# 3. CLAUDE.md — the gate line + the pyramid rows.
# ---------------------------------------------------------------------------
swap("CLAUDE.md", "tsc 0 · 1601 unit · build ·", "tsc 0 · 1610 unit · build ·")
swap("CLAUDE.md", "Unit suite (Vitest, 1601 checks)", "Unit suite (Vitest, 1610 checks)")
swap("CLAUDE.md", "1601 checks / 97 files.", "1610 checks / 98 files.")

# ---------------------------------------------------------------------------
# 4. README.md — the badge + the tables + the program row.
# ---------------------------------------------------------------------------
swap("README.md", "tests-1752%20checks", "tests-1761%20checks")
swap("README.md", "1601 checks incl. property tests", "1610 checks incl. property tests")
swap("README.md", "# 97 unit suites + 📂 e2e/ 7 specs", "# 98 unit suites + 📂 e2e/ 7 specs")
swap("README.md", "1601 checks / 97 files", "1610 checks / 98 files")
swap("README.md", "1601 unit · 151 e2e · 15 smoke · full gate green", "1610 unit · 151 e2e · 15 smoke · full gate green")

# The program row: replace the R-43 row with the R-44 row.
README = ROOT / "README.md"
src = README.read_text(encoding="utf-8")
if "R-44 shipped — the guard-advance, iat-bound, and focus-pause round" not in src:
    lines = src.split("\n")
    row_idx = [i for i, l in enumerate(lines) if l.startswith("| Remediation program |")]
    assert len(row_idx) == 1, "the Remediation program row not found once"
    idx = row_idx[0]
    assert "R-43 shipped" in lines[idx], "the program row does not carry the R-43 form"
    lines[idx] = (
        "| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program "
        "(session 247: **R-44 shipped — the guard-advance, iat-bound, and focus-pause round**: the fresh-eyes audit (three Mode-C passes — "
        "the R-43 cure surfaces · the API/auth/security layer · the UI/a11y/shell layer — 0 Critical / 0 High / 0 Medium / 6 Low / "
        "6 Informational NEW after dedup, every material claim re-verified at file:line; all seven R-43 cure surfaces holding — "
        "the guard advance aged out by its own ship again, the F-243b/F-244a genus's FIFTH recurrence); the cold baseline GREEN at "
        "HEAD c19c242 (the v2.43.0 ship state reproduced exactly); the reference STABLE on every drift layer incl. the TRUE-390 "
        "mobile menu with 9 destinations); the flagship **iat shape-and-present bound** (F-247b — the F-244f TTL guard closed only "
        "the exp half of the signer-bug class its own docblock names: a future iat kept a valid exp−iat span and was honored "
        "iat+TTL, and a non-numeric iat NaN'd the span comparison into a silent pass while flowing the raw value into "
        "SessionPayload — the iat now carries the exp/v family's own shape guard plus a present bound at the 60s clock-skew slack, "
        "**proven live by the captures canary**: the minted cookie 200 on the gated family, the future-iat and non-numeric-iat "
        "forged cookies (same secret, same uid) both 401, the forged session landing the login wall); the **guard-trio advance** "
        "(F-247a — v2.41.0/v2.42.0/v2.43.0, green-by-design FIRST, the F-244a rule executed before its own lockstep); the "
        "**toast focus-pause riders** (F-247c — onFocus/onBlur join the hover pair so a tabbed-to Dismiss button no longer dies at "
        "4s with the focus inside it, asserted live at 4.6s); the **auth-family select residuals** (F-247d — signup's existence "
        "check and reset-password's token read, the two F-246d misses, narrowed to explicit selects); the **import "
        "commit-window guard** (F-247e — the file input rides disabled through the import POST, closing the re-pick window the "
        "F-234b parse token never covered); and the **palette enumerator jsx completion** (F-247f — the walker admits the nine "
        ".jsx bridges per the F-243d doctrine). Registered, not cured: F-247g-l, plus the standing families. Gate: lint 0/0 · tsc 0 "
        "· **1610 unit / 98 files** · build · smoke 15/15 · 151 e2e · all six parity drift gates CLEAN (0-event margin) · census "
        "MATCH · captures 188-190) |"
    )
    README.write_text("\n".join(lines), encoding="utf-8")
    changes += 1

# ---------------------------------------------------------------------------
# 5. AGENTS.md — the commands table + the two gotchas.
# ---------------------------------------------------------------------------
swap("AGENTS.md", "| Unit tests (1601) | `bun run test` |", "| Unit tests (1610) | `bun run test` |")
append_after(
    "AGENTS.md",
    "build probe between every cure and its ship.",
    "\n- **A SOURCE PIN'S SLICE WINDOW MUST RIDE THROUGH THE CURE'S OWN\n"
    "  COMMENT (session 247, R-44, the F-247e authoring lesson)**: the\n"
    "  import rider pin sliced 400 chars forward from the input's\n"
    "  `type=\"file\"` — the cure's own four-line docblock sat between the\n"
    "  anchor and the rider, and the pin went RED against its own cure at\n"
    "  GREEN-proof time (the rider was present, past the window). The\n"
    "  doctrine: size the window past the comment the same commit writes,\n"
    "  or anchor directly on the attribute's exact form — a window that\n"
    "  cannot see the cure's own documentation shape was never a pin on\n"
    "  the cure.\n"
    "- **A MARKDOWN TABLE CELL CARRIES ITS PIPES ESCAPED — the plan\n"
    "  writer's escape warning is the correct-form signal (session 247,\n"
    "  R-44, the F-247i authoring lesson)**: a ledger row's `||` inside a\n"
    "  code span must ride `\\|\\|` in the table cell (a raw pipe splits\n"
    "  the row into phantom cells); the python invalid-escape warning\n"
    "  fired on exactly the correct form, and the unescaped \"fix\" broke\n"
    "  the table. The doctrine: in generated markdown tables, escape every\n"
    "  literal pipe inside cell content, and silence the writer's warning\n"
    "  with the doubled-backslash form instead of removing the escape.",
)

# ---------------------------------------------------------------------------
# 6. wealth-os_SKILL.md — the four live-tense sites.
# ---------------------------------------------------------------------------
swap("wealth-os_SKILL.md", "Vitest 1601 / Playwright 151 / smoke 15", "Vitest 1610 / Playwright 151 / smoke 15")
swap("wealth-os_SKILL.md", "Node env, jsdom-free; 1601 checks / 97 files", "Node env, jsdom-free; 1610 checks / 98 files")
swap("wealth-os_SKILL.md", "`bun run test` (1601 checks)", "`bun run test` (1610 checks)")
swap("wealth-os_SKILL.md", "`bun run test` — 1601 passed / 97 files", "`bun run test` — 1610 passed / 98 files")

# ---------------------------------------------------------------------------
# 7. Project_Architecture_Document.md — the v2.44.0 revision block (above
#    the v2.43.0 block).
# ---------------------------------------------------------------------------
PAD = ROOT / "Project_Architecture_Document.md"
src = PAD.read_text(encoding="utf-8")
if "- [SR] v2.44.0 (session 247, R-44" not in src:
    anchor = "- [SR] v2.43.0 (session 246, R-43 — the guard-advance, seam-"
    assert src.count(anchor) == 1, "the v2.43.0 revision block head not found once"
    block = """- [SR] v2.44.0 (session 247, R-44 — the guard-advance, iat-bound, and
  focus-pause round): the fresh-eyes audit (three Mode-C passes — the
  R-43 cure surfaces driven by the session, the API/auth/security
  layer, and the UI/a11y/shell layer; 0 Critical / 0 High / 0 Medium /
  6 Low / 6 Informational NEW after dedup, every material claim
  re-verified at file:line by the driving session; all seven R-43
  cure surfaces verified holding — the guard advance itself aged out
  by one block again, the F-243b/F-244a genus's FIFTH edition, cured
  first per its own rule; the API layer clean again — owner-scoping,
  Zod, buckets, injection, enumeration, session, errors, secrets all
  clean; the UI layer clean, with the toast focus-pause and import
  commit-window edges surfaced by the pass). The round's flagship:
  THE IAT SHAPE-AND-PRESENT BOUND (F-247b — the F-244f TTL guard
  closed only the exp half of the signer-bug class its own docblock
  names: a future iat kept a valid exp−iat span and was honored
  iat+TTL, and a non-numeric iat NaN'd the span comparison into a
  silent pass while flowing the raw value into SessionPayload; the
  iat now carries the exp/v family's own shape guard plus a present
  bound at the 60s clock-skew slack — the no-iat strict arm untouched;
  the captures canary proved it live: the minted cookie 200 on the
  gated family, the future-iat and non-numeric-iat forged cookies
  (same secret, same uid) both 401, the forged session landing the
  login wall). Plus: THE GUARD-TRIO ADVANCE (F-247a —
  v2.41.0/v2.42.0/v2.43.0, green-by-design before this session's own
  lockstep pass, the parity-243 mirror recalibrated same-commit); THE
  TOAST FOCUS-PAUSE RIDERS (F-247c — the onFocus/onBlur pair joins
  the onMouseEnter/Leave pair; the capture proved the focused toast
  ALIVE at 4.6s and dismissed ~4s after the blur); THE AUTH-FAMILY
  SELECT RESIDUALS (F-247d — signup's existence check and
  reset-password's token read, the two F-246d misses, narrowed to
  explicit selects, the F-228h insurance doctrine completed; the
  auth-reset pin recalibrated same-commit); THE IMPORT
  COMMIT-WINDOW GUARD (F-247e — the file input rides disabled through
  the import POST, closing the re-pick window the F-234b parse token
  never covered); and THE PALETTE ENUMERATOR JSX COMPLETION (F-247f —
  the walker admits the nine .jsx bridges per the F-243d whole-tree
  doctrine, green-by-design over the re-export-only bridges).
  Registered, not cured: the sessioned-family burn-before-gate
  consistency (F-247g), the login password cap asymmetry (F-247h), the
  csvImport category min(1) asymmetry (F-247i), the useTheme
  fallback's unresolved system arm (F-247j — latent), the theme-label
  bootstrap gap (F-247k — latent), and the avatar luminance heuristic
  (F-247l — decorative), plus the standing families (F-246g/h,
  F-245g/h, F-244i-n, F-242h/i, F-240k-n, F-239l-s).
  The verification: lint 0/0 · tsc 0 · 1610 unit (98 files, +9) ·
  build · smoke 15/15 · 151 e2e · ALL SIX parity drift gates CLEAN —
  the standing allowances held UNMOVED (the round's surfaces are a
  server-side verifier bound, attribute-only focus riders, select
  narrowing, an input-disable rider, and a test-walker widening —
  pixel-invisible by construction) · census MATCH · `bun audit`
  unchanged · docs-counts 16/16 · captures 188-190 (the mobile drawer
  at 390 — the standing operator ask; the iat-bound canary — the
  minted 200, both forged twins 401, the login-wall face; the
  focus-pause face — the focused toast alive at 4.6s, dismissed after
  the blur).

"""
    PAD.write_text(src.replace(anchor, block + anchor, 1), encoding="utf-8")
    changes += 1

print(f"docs-247-lockstep.py: {changes} replacement(s) applied")
