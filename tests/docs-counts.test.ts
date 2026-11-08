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

const UNIT_TOTAL = 508;
const E2E_TOTAL = 84;
const SMOKE_TOTAL = 14;
const TEST_FILES = 37;
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
});
