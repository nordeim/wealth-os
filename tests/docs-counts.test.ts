import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-203 (R-2, the docs-counts port — the plan v2 cure for F-203b/F-203c):
// the count-lockstep doctrine. The exact check totals live in the doc set
// (AGENTS/CLAUDE/README/PAD/SKILL) and must move in the SAME commit as any
// test change — or the docs rot. The evidence: D-201c's brand guard took the
// unit suite 497 → 498 (session 201) and six live-tense doc sites silently
// kept claiming 497 (and the README badge 581 = 497+84) for two sessions.
// This pin is the neo-crm docs-counts mechanism ported to this repo: every
// live-tense gate-count site is pinned to the constants below, so a count
// change without the doc lockstep fails `bun run test`.
//
// Scope note: HISTORICAL count mentions (the SKILL's verification-history
// table, worklog entries, session logs) are session records — they keep the
// counts that were true at their time and are deliberately NOT pinned. Only
// live-tense claims (what the gate IS, not what it WAS) ride this contract.

const UNIT_TOTAL = 1235;
const E2E_TOTAL = 139;
const SMOKE_TOTAL = 15;
const TEST_FILES = 78;
// The README badge arithmetic: unit + e2e checks.
const CHECK_BADGE = UNIT_TOTAL + E2E_TOTAL;

const doc = (rel: string): string =>
  readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf-8");

// Whitespace-normalized containment: the docs hard-wrap at ~80 cols, so the
// pin must hold the CONTENT, never the wrap (the s198 lesson — a pin that
// depends on line breaks fails on the next innocent rewrap).
const norm = (s: string): string => s.replace(/\s+/g, " ");

describe("session-203: the docs-counts lockstep (R-2 — counts move with tests or the gate goes RED)", () => {
  it("CLAUDE.md's gate-contract line carries the live counts", () => {
    expect(norm(doc("CLAUDE.md"))).toContain(
      `lint 0/0 · tsc 0 · ${UNIT_TOTAL} unit · build · smoke ${SMOKE_TOTAL}/${SMOKE_TOTAL} · ${E2E_TOTAL} e2e`,
    );
  });

  it("README's test badge carries the unit+e2e arithmetic", () => {
    expect(doc("README.md")).toContain(
      `tests-${CHECK_BADGE}%20checks`,
    );
  });

  it("README's verification-layer status row carries the live counts", () => {
    expect(norm(doc("README.md"))).toContain(
      `${UNIT_TOTAL} unit · ${E2E_TOTAL} e2e · ${SMOKE_TOTAL} smoke · full gate green`,
    );
  });

  it("the PAD's §7.1 distribution table carries the live unit totals", () => {
    expect(norm(doc("Project_Architecture_Document.md"))).toContain(
      `| Unit | ${TEST_FILES} | ${UNIT_TOTAL} |`,
    );
    // Session-215 (R-12): the live-seam pins joined the family (25:
    // +import-seam, analytics-export-seam, seed-scoping, script-guards)
    // and the four files took the suite to 51; session-218 (R-15) added
    // login-recovery + parity-218 (25 → 27 pins, 34 → 36 rows; session-219:
    // theme-default + parity-219, 36 → 38 rows — the arithmetic
    // 3 + 39 + 23 = 65 now closes; session-220 added parity-220;
    // session-221 added parity-221 — 40 rows; session-222 added
    // parity-222 — 41 rows; session-223 added parity-223 — 42 rows;
    // session-224 added parity-224 — 43 rows; session-225 added
    // parity-225 — 44 rows; session-226 added parity-226 — 45 rows;
    // session-227 added parity-227 — 46 rows; session-228 added
    // parity-228 — 47 rows; session-229 added parity-229 — 48 rows;
    // session-230 added parity-230 — 49 rows; session-231 added
    // parity-231 — 50 rows).
    expect(norm(doc("Project_Architecture_Document.md"))).toContain(
      "| — architecture pins | 50 | (gate-script, db-census, docs-counts, security-ledger, sweep-tool, route-case, nav-config, page-titles, metadata, pwa-metadata, drift-probe-tool, interior-census-tool, shell-parity, parity-208, parity-209, fullpage-sweep-tool, dependency-floors-212, dependency-floors-213, prisma-7-contract, owner-scoping, palette-pins, import-seam, analytics-export-seam, seed-scoping, script-guards, import-body-cap, csv-formula-guard, loading-states, parity-216, ai-body-cap, expenses-popover, dark-tokens, mobile-navigation-focus, parity-217, login-recovery, parity-218, theme-default, parity-219, parity-220, parity-221, parity-222, parity-223, parity-224, parity-225, parity-226, parity-227, parity-228, parity-229, parity-230, parity-231) |",
    );
    // Session-224 (R-21, the F-204a site-inventory completion's own
    // lesson applied to itself): the §7.1 E2E row carried a stale 99
    // through two lockstep passes — a live-tense site no pin watched.
    // Pinned now: the distribution table's E2E row must carry the live
    // e2e total.
    expect(norm(doc("Project_Architecture_Document.md"))).toContain(
      `| E2E | 7 | ${E2E_TOTAL} |`,
    );
  });

  it("the PAD's §9 command-table row carries the live counts", () => {
    expect(norm(doc("Project_Architecture_Document.md"))).toContain(
      `${UNIT_TOTAL} unit / ${E2E_TOTAL} e2e`,
    );
  });

  it("the PAD's §10 closing line carries the live gate state", () => {
    expect(norm(doc("Project_Architecture_Document.md"))).toContain(
      `lint 0/0 · tsc 0 · ${UNIT_TOTAL} unit · build · smoke ${SMOKE_TOTAL}/${SMOKE_TOTAL}`,
    );
  });

  it("wealth-os_SKILL.md's header carries the live suite sizes", () => {
    expect(norm(doc("wealth-os_SKILL.md"))).toContain(
      `Vitest ${UNIT_TOTAL} / Playwright ${E2E_TOTAL} / smoke ${SMOKE_TOTAL}`,
    );
  });

  it("AGENTS.md names this pin among the architecture contracts (the F-203b phantom-reference cure)", () => {
    // AGENTS.md listed `docs-counts` among the pinned contracts since the
    // session-199 doc rewrite — but the file did not exist until this
    // session. The reference and the artifact must stay in lockstep.
    expect(doc("AGENTS.md")).toContain("docs-counts");
  });

  // Session-204 (R-6, the F-204a cure): the site inventory completed. The
  // R-2 port pinned seven sites — but the doc set carries MORE live-tense
  // count claims, and ten of them silently kept the stale 497/35-files
  // numbers through the session-203 lockstep pass (the exact rot this pin
  // exists to prevent, recurring inside its own blind spot). The four
  // blocks below pin every remaining live-tense gate-count site: the
  // command tables, the stack/architecture tables, the file-hierarchy
  // line, the ADR-006 gate chain, the §7.4 pre-push checklist, and the
  // SKILL's commands + pre-ship checklist — the complete inventory, so
  // the next count change (unit OR e2e OR smoke OR file count) fails
  // `bun run test` until EVERY site moves in the same commit.

  it("CLAUDE.md's command table + test pyramid carry the live counts (the F-204a sites)", () => {
    const c = norm(doc("CLAUDE.md"));
    expect(c).toContain(`Unit suite (Vitest, ${UNIT_TOTAL} checks)`);
    expect(c).toContain(`E2E suite (Playwright, ${E2E_TOTAL} checks, own db + :3100)`);
    expect(c).toContain(`property tests via fast-check. ${UNIT_TOTAL} checks / ${TEST_FILES} files.`);
    expect(c).toContain(`${E2E_TOTAL} checks / 7 specs.`);
    // Session-224 (R-21): the CLAUDE smoke-pyramid line and the PAD's
    // ADR-006 e2e count were live-tense sites no pin watched — the
    // §7.1 E2E row's lesson applied to its own blind spot.
    expect(c).toContain(`db; ${SMOKE_TOTAL} assertions including the AUTH_SECRET boot-gate`);
  });

  it("README's stack table + file hierarchy + testing table carry the live counts (the F-204a sites)", () => {
    const r = norm(doc("README.md"));
    expect(r).toContain(`${UNIT_TOTAL} checks incl. property tests`);
    expect(r).toContain(`${E2E_TOTAL} checks; chromium; seeded`);
    expect(r).toContain(`# ${TEST_FILES} unit suites + 📂 e2e/ 7 specs`);
    expect(r).toContain(`| Unit (Vitest) | \`bun run test\` | ${UNIT_TOTAL} checks / ${TEST_FILES} files |`);
    expect(r).toContain(`${E2E_TOTAL} checks / 7 specs — boots its own server`);
    expect(r).toContain(`${SMOKE_TOTAL} assertions incl. boot-gate + artifact hygiene`);
  });

  it("the PAD's ADR-006 gate chain + §7.4 pre-push checklist carry the live counts (the F-204a sites)", () => {
    const p = norm(doc("Project_Architecture_Document.md"));
    expect(p).toContain(`→ vitest (${UNIT_TOTAL}) →`);
    expect(p).toContain(`Playwright e2e (${E2E_TOTAL}) against a pinned`);
    expect(p).toContain(`\`bun run test\` → ${UNIT_TOTAL}/${UNIT_TOTAL} (counts re-pinned if tests added/removed)`);
    expect(p).toContain(`→ ${SMOKE_TOTAL}/${SMOKE_TOTAL} (incl. boot-gate + hygiene)`);
    expect(p).toContain(`\`CI=1 bun run test:e2e\` → ${E2E_TOTAL}/${E2E_TOTAL}`);
  });

  it("wealth-os_SKILL.md's stack table + commands + pre-ship checklist carry the live counts (the F-204a sites)", () => {
    const s = norm(doc("wealth-os_SKILL.md"));
    expect(s).toContain(`Node env, jsdom-free; ${UNIT_TOTAL} checks / ${TEST_FILES} files`);
    expect(s).toContain(`${E2E_TOTAL} checks / 7 specs; own db + port 3100`);
    expect(s).toContain(`\`bun run test\` (${UNIT_TOTAL} checks)`);
    expect(s).toContain(`\`CI=1 bun run test:e2e\` (${E2E_TOTAL} checks)`);
    expect(s).toContain(`\`bun run smoke\` (${SMOKE_TOTAL} assertions; needs build)`);
    expect(s).toContain(`\`bun run test\` — ${UNIT_TOTAL} passed / ${TEST_FILES} files`);
    expect(s).toContain(`\`CI=1 bun run test:e2e\` — ${E2E_TOTAL}/${E2E_TOTAL} (7 specs)`);
    expect(s).toContain(`\`bun run smoke\` — ${SMOKE_TOTAL}/${SMOKE_TOTAL} (boot-gate`);
  });

  it("the SKILL's stack table carries NO deleted-dependency rows (F-216f, the retired-forms negative ladder)", () => {
    // Session-216 (R-13): the F-215h lockstep claimed "the dead PDF
    // rows retired across README/PAD/SKILL" but left SKILL:127
    // advertising jspdf + html2canvas-pro + src/lib/pdf-export.ts —
    // deps deleted at b78a8a6. A claims-vs-reality negative pin: the
    // living stack table may not name what the tree does not carry.
    const s = norm(doc("wealth-os_SKILL.md"));
    expect(s).not.toContain("PDF export |");
    expect(s).not.toContain("jspdf");
    expect(s).not.toContain("html2canvas");
    expect(s).not.toContain("pdf-export");
  });
});
