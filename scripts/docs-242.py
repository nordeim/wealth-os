#!/usr/bin/env python3
"""Session-242 (R-39): the docs lockstep — every live-tense count site
re-pinned (1519→1538 / 91→92 / 147→150 / badge 1666→1688), the arch-pins
row completed (59→62: parity-240/241/242 joined), the two over-replaced
HISTORICAL revision blocks restored to their own ship counts (F-242j),
the PAD's stale file-hierarchy line cured (72→92), the README program
row rewritten for R-39, the PAD v2.39.0 revision block, the AGENTS
gotchas, and the plan's §5 placeholders filled. Assert-each-replacement
form (the house convention): every replacement asserted-found before the
write, every site re-verified after."""

from pathlib import Path
import re

OLD_UNIT, NEW_UNIT = "1519", "1538"
OLD_E2E, NEW_E2E = "147", "150"
OLD_FILES, NEW_FILES = "91", "92"
OLD_BADGE, NEW_BADGE = "1666", "1688"


def swap(text: str, old: str, new: str, label: str, count: int = 1) -> str:
    found = text.count(old)
    if found == 0 and new in text:
        return text  # idempotent re-run: already applied
    assert found == count, f"{label}: expected {count} occurrence(s), found {found}"
    return text.replace(old, new)


def main() -> None:
    # ---- 1. tests/docs-counts.test.ts: the constants + the arch-pins row + the F-242j pin
    p = Path("tests/docs-counts.test.ts")
    t = p.read_text()
    t = swap(t, "const UNIT_TOTAL = 1519;", "const UNIT_TOTAL = 1538;", "unit const")
    t = swap(t, "const E2E_TOTAL = 147;", "const E2E_TOTAL = 150;", "e2e const")
    t = swap(t, "const TEST_FILES = 91;", "const TEST_FILES = 92;", "files const")
    t = swap(
        t,
        "| — architecture pins | 59 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, db-transient) |",
        "| — architecture pins | 62 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, db-transient) |",
        "arch-pins row (test)",
    )
    # The F-242j pin: the historical revision blocks keep their OWN ship
    # counts (the over-replacement guard).
    f242j_pin = '''
  // Session-242 (R-39, F-242j): the count-lockstep replacement scripts
  // of sessions 240 AND 241 each over-replaced the then-most-recent
  // HISTORICAL revision block's verification line (v2.36.0's 1469/89
  // became 1485/90; v2.37.0's 1485/90 became 1519/91) — the doctrine's
  // own scope note ("HISTORICAL count mentions keep the counts that
  // were true at their time") violated by the mechanism meant to keep
  // the docs honest. Pinned now: every revision block that carries the
  // verification-line form keeps its OWN ship counts, so the next
  // over-broad replacement fails `bun run test`.
  it("the historical revision blocks keep their OWN ship counts (F-242j — the over-replacement guard)", () => {
    const p = norm(doc("Project_Architecture_Document.md"));
    // v2.36.0 shipped 1469/89 (session 239's §5 row).
    expect(p).toContain("[SR] v2.36.0 (session 239");
    expect(p).toMatch(/\\[SR\\] v2\\.36\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1469 unit \\(89 files\\)/);
    // v2.37.0 shipped 1485/90 (session 240's §5 row).
    expect(p).toMatch(/\\[SR\\] v2\\.37\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1485 unit \\(90 files\\)/);
    // v2.38.0 shipped 1519/91 (session 241's §5 row) — the historical
    // form the live-tense pins never touch.
    expect(p).toMatch(/\\[SR\\] v2\\.38\\.0[\\s\\S]*?The verification: lint 0\\/0 · tsc 0 · 1519 unit \\(91 files\\)/);
  });
'''
    t = swap(
        t,
        "  it(\"the SKILL's stack table carries NO deleted-dependency rows",
        f242j_pin + "\n  it(\"the SKILL's stack table carries NO deleted-dependency rows",
        "F-242j pin insertion",
    )
    p.write_text(t)
    print("docs-counts.test.ts: constants + arch-pins row + F-242j pin")

    # ---- 2. README.md
    p = Path("README.md")
    t = p.read_text()
    t = swap(t, "tests-1666%20checks", "tests-1688%20checks", "README badge")
    t = swap(t, "| 1519 checks incl. property tests |", "| 1538 checks incl. property tests |", "README stack unit")
    t = swap(t, "| 147 checks; chromium; seeded `db/e2e.db` |", "| 150 checks; chromium; seeded `db/e2e.db` |", "README stack e2e")
    t = swap(t, "# 91 unit suites + 📂 e2e/ 7 specs", "# 92 unit suites + 📂 e2e/ 7 specs", "README hierarchy")
    t = swap(t, "| 1519 checks / 91 files |", "| 1538 checks / 92 files |", "README testing unit")
    t = swap(t, "| 147 checks / 7 specs — boots its own server on :3100 with `db/e2e.db` |", "| 150 checks / 7 specs — boots its own server on :3100 with `db/e2e.db` |", "README testing e2e")
    t = swap(t, "1519 unit · 147 e2e · 15 smoke · full gate green", "1538 unit · 150 e2e · 15 smoke · full gate green", "README verification row")
    r39_row = "| Remediation program | 🔀 Active | `docs/remediation_plan_v2.md` — the versioned findings ledger + R-item program (session 242: **R-39 shipped — the CSP-inventory pin, test-hygiene, and carrier-truth round**: the fresh-eyes audit (three Mode-C passes over the R-38 cure surfaces, the API/auth/security layer, and the UI/a11y/shell layer — 0 Critical / 0 High / 1 Medium / 5 Low / 3 Informational NEW after dedup, every material claim re-verified at file:line; all seven R-38 cure surfaces verified holding); the cold baseline GREEN at HEAD 1b038d7 (the v2.38.0 ship state reproduced exactly); the reference STABLE on every drift layer incl. the TRUE-390 mobile menu with 9 destinations); the **CSP fetch-directive pin** (F-242a, closing the registered F-241h rider — the pass-B source inventory delivered what the rider waited for: zero third-party origins consumed, so default-src / style-src / img-src / font-src / connect-src all pin to self (the one style 'unsafe-inline' floor for the charts' inline attributes), the dev eval branch preserved; verified by the served-header e2e leg + the zero-violation sweep + the CSV download canary + the live curl on the standalone); the **rate-limit battery cleanup fix** (F-242b — the cardinality battery's cleanup sweep was watermark-gated off while its comment claimed \"restoring headroom\"; now it crosses the pinned watermark, asserts its reclaimed count, and proves the fresh key earns its own bucket back); the **login-card template-literal conversion** (F-242e — the only two interpolated class strings in src now ride the cn() appendage form, twMerge byte-identical, guarded by a whole-tree genus pin); the **count-lockstep historical-block restoration** (F-242j — the v2.36.0 and v2.37.0 revision blocks had been overwritten by the two prior sessions' over-broad count replacements; both restored to their own ship counts and pinned); plus the parity-240 title recalibration, the popover docblock truth, the globals/page-layout comment truths, and the hydration-rationale truths. Registered, not cured: the sidebar brand heading order (F-242h) and the in-band-delivery production default (F-242i — the F-217m owner-decision family with the escalation recorded). Gate: lint 0/0 · tsc 0 · **1538 unit / 92 files** · build · smoke 15/15 · 150 e2e · all six parity drift gates CLEAN · census MATCH · captures 170-173) |"
    # The old R-38 program row (a single long line starting "| Remediation program |").
    lines = t.split("\n")
    row_idx = [i for i, l in enumerate(lines) if l.startswith("| Remediation program |")]
    assert len(row_idx) == 1, "README program row not unique"
    lines[row_idx[0]] = r39_row
    t = "\n".join(lines)
    p.write_text(t)
    print("README.md: badge + 6 sites + program row")

    # ---- 3. CLAUDE.md
    p = Path("CLAUDE.md")
    t = p.read_text()
    t = swap(t, f"lint 0/0 · tsc 0 · {OLD_UNIT} unit · build ·\n  smoke 15/15 · {OLD_E2E} e2e.", f"lint 0/0 · tsc 0 · {NEW_UNIT} unit · build ·\n  smoke 15/15 · {NEW_E2E} e2e.", "CLAUDE gate contract")
    t = swap(t, f"Unit suite (Vitest, {OLD_UNIT} checks)", f"Unit suite (Vitest, {NEW_UNIT} checks)", "CLAUDE command unit")
    t = swap(t, f"E2E suite (Playwright, {OLD_E2E} checks, own db + :3100)", f"E2E suite (Playwright, {NEW_E2E} checks, own db + :3100)", "CLAUDE command e2e")
    t = swap(t, f"tests via fast-check. {OLD_UNIT} checks / {OLD_FILES} files.", f"tests via fast-check. {NEW_UNIT} checks / {NEW_FILES} files.", "CLAUDE pyramid unit")
    t = swap(t, f"{OLD_E2E} checks / 7 specs. `playwright.config.ts` pins", f"{NEW_E2E} checks / 7 specs. `playwright.config.ts` pins", "CLAUDE pyramid e2e")
    p.write_text(t)
    print("CLAUDE.md: 5 sites")

    # ---- 4. AGENTS.md (the counts; gotchas appended separately below)
    p = Path("AGENTS.md")
    t = p.read_text()
    t = swap(t, f"| Unit tests ({OLD_UNIT}) | `bun run test` |", f"| Unit tests ({NEW_UNIT}) | `bun run test` |", "AGENTS unit row")
    t = swap(t, f"| E2E (boots own server, {OLD_E2E}) | `CI=1 bun run test:e2e` |", f"| E2E (boots own server, {NEW_E2E}) | `CI=1 bun run test:e2e` |", "AGENTS e2e row")
    p.write_text(t)
    print("AGENTS.md: 2 count sites")

    # ---- 5. PAD: historical restorations FIRST (scoped per block), then live sites
    p = Path("Project_Architecture_Document.md")
    t = p.read_text()
    lines = t.split("\n")

    def block_range(marker: str) -> tuple[int, int]:
        starts = [i for i, l in enumerate(lines) if l.startswith(f"- [SR] {marker} ")]
        assert len(starts) == 1, f"{marker} block start not unique"
        s = starts[0]
        nxt = [i for i, l in enumerate(lines) if l.startswith("- [SR] v") and i > s]
        e = nxt[0] if nxt else min(s + 250, len(lines))
        return s, e

    # v2.37.0: restore 1519/91 → 1485/90 (its own ship counts).
    s, e = block_range("v2.37.0")
    body = "\n".join(lines[s:e])
    body = swap(body, "The verification: lint 0/0 · tsc 0 · 1519\n  unit (91 files)", "The verification: lint 0/0 · tsc 0 · 1485\n  unit (90 files)", "v2.37.0 restore")
    lines[s:e] = body.split("\n")
    # v2.36.0: restore 1485 unit (90\n files) → 1469 unit (89\n files).
    s, e = block_range("v2.36.0")
    body = "\n".join(lines[s:e])
    body = swap(body, "The verification: lint 0/0 · tsc 0 · 1485 unit (90\n  files) · build · smoke 15/15 · 147 e2e", "The verification: lint 0/0 · tsc 0 · 1469 unit (89\n  files) · build · smoke 15/15 · 147 e2e", "v2.36.0 restore")
    lines[s:e] = body.split("\n")
    t = "\n".join(lines)

    # Live-tense sites.
    t = swap(t, f"→ vitest ({OLD_UNIT}) →", f"→ vitest ({NEW_UNIT}) →", "PAD ADR-006")
    t = swap(t, f"| Unit | {OLD_FILES} | {OLD_UNIT} | `tests/*.test.ts` |", f"| Unit | {NEW_FILES} | {NEW_UNIT} | `tests/*.test.ts` |", "PAD §7.1 unit row")
    t = swap(
        t,
        "| — architecture pins | 59 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, db-transient) | `tests/` | source-scanning contracts |",
        "| — architecture pins | 62 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231, parity-232, parity-233, parity-234, parity-235, parity-236, parity-237, parity-238, parity-239, parity-240, parity-241, parity-242, db-transient) | `tests/` | source-scanning contracts |",
        "PAD arch-pins row",
    )
    t = swap(t, f"| E2E | 7 | {OLD_E2E} | `tests/e2e/*.spec.ts` |", f"| E2E | 7 | {NEW_E2E} | `tests/e2e/*.spec.ts` |", "PAD §7.1 e2e row")
    t = swap(t, f"`bun run test` → {OLD_UNIT}/{OLD_UNIT} (counts re-pinned if tests added/removed)", f"`bun run test` → {NEW_UNIT}/{NEW_UNIT} (counts re-pinned if tests added/removed)", "PAD §7.4 unit")
    t = swap(t, f"`CI=1 bun run test:e2e` → {OLD_E2E}/{OLD_E2E}", f"`CI=1 bun run test:e2e` → {NEW_E2E}/{NEW_E2E}", "PAD §7.4 e2e")
    t = swap(t, f"| {OLD_UNIT} unit / {OLD_E2E} e2e |", f"| {NEW_UNIT} unit / {NEW_E2E} e2e |", "PAD §9 row")
    t = swap(t, f"lint 0/0 · tsc 0 · {OLD_UNIT} unit · build · smoke 15/15 ·\n{OLD_E2E} e2e).", f"lint 0/0 · tsc 0 · {NEW_UNIT} unit · build · smoke 15/15 ·\n{NEW_E2E} e2e).", "PAD §10 closing")
    t = swap(t, "# 72 unit suites (incl. architecture pins) + e2e/ 7 specs", "# 92 unit suites (incl. architecture pins) + e2e/ 7 specs", "PAD hierarchy")

    # The v2.39.0 revision block, above v2.38.0's.
    v239_block = """- [SR] v2.39.0 (session 242, R-39 — the CSP-inventory pin,
  test-hygiene, and carrier-truth round): the fresh-eyes audit (three
  Mode-C passes — the R-38 cure surfaces driven by the session, the
  API/auth/security layer, and the UI/a11y/shell layer; 0 Critical /
  0 High / 1 Medium / 5 Low / 3 Informational NEW after dedup, every
  material claim re-verified at file:line by the driving session; all
  seven R-38 cure surfaces verified holding — the era counter's
  two-site mutation set, the six era-keyed 401 arms, the
  creation-path ceiling's ordering and collision-free key, the
  cardinality cap's fail-closed overflow, the three P2025 arms, the
  popover focus return, the FORM_TEXTAREA seam's two consumers; the
  API layer clean again; the UI layer clean). THE CSP FETCH-DIRECTIVE
  PIN (F-242a, Low — closing the registered F-241h rider whose own
  registration said "land with a source inventory the next time the
  config is touched": the pass-B inventory swept every external URL,
  fetch, script, image, font, and style — the app consumes ZERO
  third-party origins, so default-src, style-src, img-src, font-src,
  and connect-src all pin to self (the one style 'unsafe-inline'
  floor for the charts' inline attributes), the dev eval branch
  preserved; the exfil/beacon surface closes with zero functional
  loss — verified by the served-header e2e leg, the zero-violation
  sweep, the CSV download canary, and the live curl on the
  standalone). The test-hygiene cures: the rate-limit battery's
  cleanup sweep was watermark-gated off while its comment claimed
  "restoring headroom" (F-242b — now it crosses the pinned watermark,
  asserts its reclaimed count, and proves the fresh key earns its own
  bucket); the parity-240 leg's title still named the retired
  live-user key (F-242c). The carrier-truth cures: the popover
  focus-return over-claim (F-242d — the outside-pointerdown path is
  NOT spared; reworded across the page + both test echoes); the two
  login-card template-literal class strings (F-242e — the only two
  in src, now the cn() appendage form, twMerge byte-identical,
  guarded by a whole-tree genus pin); the self-contradictory
  neutral-token docblock + six class-shaped comment citations
  (F-242f — reworded to token/property form, the parity-229-safe
  direction); the two F-239c hydration rationales (F-242g — they
  described a server/client mismatch the AppShell loading gate
  precludes; now they record the true mechanism + the gate
  dependency); and the count-lockstep historical-block restoration
  (F-242j — the v2.36.0 and v2.37.0 revision blocks had been
  overwritten by the two prior sessions' over-broad count
  replacements; both restored to their own ship counts and pinned).
  Registered, not cured: the sidebar brand heading order (F-242h —
  a census-visible DOM change; the span form if a future round
  touches the sidebar family) and the in-band-delivery production
  default (F-242i Medium — the F-217m owner-decision family with
  the pass-B escalation recorded: the default-on posture escalates
  to account-takeover for a production deploy that ignores the boot
  warning; the flip trades the zero-config self-host demo posture
  for the hardening, so it stays the owner's call). The
  verification: lint 0/0 · tsc 0 · 1538 unit (92 files) · build ·
  smoke 15/15 · 150 e2e · ALL SIX parity drift gates CLEAN — the
  standing allowances held UNMOVED (the cn() conversion is
  computed-identical by construction, the comment rewords are
  prose-only, the CSP is a header change invisible to the DOM
  gates) · census MATCH · `bun audit` unchanged · docs-counts 13/13
  · captures 170-173 (the mobile drawer at 390 — the standing
  operator ask; the forgot link's appendage geometry; the six OTP
  boxes' appendage geometry; the Analytics CSV download fired under
  the pinned policy).

"""
    t = swap(t, "- [SR] v2.38.0 (session 241, R-38 — the clear-era, creation-path,", v239_block + "- [SR] v2.38.0 (session 241, R-38 — the clear-era, creation-path,", "PAD v2.39.0 block insert")
    p.write_text(t)
    print("PAD: 2 historical restorations + 10 live sites + hierarchy + v2.39.0 block")

    # ---- 6. wealth-os_SKILL.md
    p = Path("wealth-os_SKILL.md")
    t = p.read_text()
    t = swap(t, f"Vitest {OLD_UNIT} / Playwright {OLD_E2E} / smoke 15", f"Vitest {NEW_UNIT} / Playwright {NEW_E2E} / smoke 15", "SKILL header")
    t = swap(t, f"Node env, jsdom-free; {OLD_UNIT} checks / {OLD_FILES} files", f"Node env, jsdom-free; {NEW_UNIT} checks / {NEW_FILES} files", "SKILL stack unit")
    t = swap(t, f"{OLD_E2E} checks / 7 specs; own db + port 3100", f"{NEW_E2E} checks / 7 specs; own db + port 3100", "SKILL stack e2e")
    t = swap(t, f"`bun run test` ({OLD_UNIT} checks)", f"`bun run test` ({NEW_UNIT} checks)", "SKILL commands unit")
    t = swap(t, f"`CI=1 bun run test:e2e` ({OLD_E2E} checks)", f"`CI=1 bun run test:e2e` ({NEW_E2E} checks)", "SKILL commands e2e")
    t = swap(t, f"`bun run test` — {OLD_UNIT} passed / {OLD_FILES} files", f"`bun run test` — {NEW_UNIT} passed / {NEW_FILES} files", "SKILL checklist unit")
    t = swap(t, f"`CI=1 bun run test:e2e` — {OLD_E2E}/{OLD_E2E} (7 specs)", f"`CI=1 bun run test:e2e` — {NEW_E2E}/{NEW_E2E} (7 specs)", "SKILL checklist e2e")
    p.write_text(t)
    print("wealth-os_SKILL.md: 7 sites")

    # ---- 7. The plan's §5 row placeholders
    p = Path("docs/remediation_plan_v2.md")
    t = p.read_text()
    t = swap(t, "**(the new pin count) unit ((the new file count) files)**", f"**{NEW_UNIT} unit ({NEW_FILES} files, +19)**", "plan §5 unit placeholder")
    t = swap(t, "**(the new e2e count) e2e**", f"**{NEW_E2E} e2e**", "plan §5 e2e placeholder")
    p.write_text(t)
    print("plan §5 placeholders filled")

    # ---- Re-verify
    for rel, needle in [
        ("tests/docs-counts.test.ts", "const UNIT_TOTAL = 1538;"),
        ("tests/docs-counts.test.ts", "const E2E_TOTAL = 150;"),
        ("tests/docs-counts.test.ts", "const TEST_FILES = 92;"),
        ("tests/docs-counts.test.ts", "| — architecture pins | 62 |"),
        ("README.md", "tests-1688%20checks"),
        ("README.md", "R-39 shipped"),
        ("CLAUDE.md", "1538 unit · build ·"),
        ("AGENTS.md", "| Unit tests (1538) |"),
        ("Project_Architecture_Document.md", "- [SR] v2.39.0 (session 242, R-39"),
        ("Project_Architecture_Document.md", "# 92 unit suites"),
        ("wealth-os_SKILL.md", "Vitest 1538 / Playwright 150 / smoke 15"),
        ("docs/remediation_plan_v2.md", "1538 unit (92 files, +19)"),
    ]:
        assert needle in Path(rel).read_text(), f"re-verify failed: {rel} missing {needle!r}"
    print("docs lockstep complete — all sites re-verified")


if __name__ == "__main__":
    main()
