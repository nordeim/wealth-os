import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-215 (R-12, F-215b — the guarded-export pin): the analytics
// exportCsv was the only LIVE CSV export in the app, and it hand-rolled
// quote-doubling with NO guardFormulaPrefix — while the guarded seam
// (toCsv, S48-P1 posture-(b)) sat unused in src/lib/csv.ts and its own
// docblock claimed coverage of a phantom entity-export.ts. These pins
// freeze the convergence: the only export surface MUST serialize
// through the guarded seam.

const ROOT = path.resolve(import.meta.dirname, "..");
const PAGE = readFileSync(
  path.join(ROOT, "src/app/(app)/analytics/page.tsx"),
  "utf-8",
);

describe("R-12: the analytics export serializes through the guarded seam", () => {
  it("imports toCsv from @/lib/csv", () => {
    expect(PAGE).toMatch(/import\s*\{[^}]*toCsv[^}]*\}\s*from\s*"@\/lib\/csv"/);
  });

  it("carries NO hand-rolled quote-doubling escape (the unguarded form)", () => {
    // The F-215b tell: inline quote-doubling on a free-text field —
    // quoting alone does NOT stop spreadsheet formula evaluation.
    expect(PAGE).not.toMatch(/replace\(\s*\/"\s*\/\s*g,\s*'""'\s*\)/);
  });

  it("the free-text columns flow through the seam (no raw interpolation of description/category)", () => {
    // The template-literal row form — every cell hand-joined — is the
    // bypass shape; toCsv's column form replaces it.
    expect(PAGE).not.toMatch(/\$\{t\.description\.replace/);
  });
});
