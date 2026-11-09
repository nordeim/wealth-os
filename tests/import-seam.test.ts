import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-215 (R-12, F-215a/f — the live-seam convergence pin): the
// F-214h bare-quote cure + the BOM strip landed in src/lib/csv.ts —
// but the Import page shipped its OWN inline parser copy with the
// PRE-214 defect, and the lib form had ZERO production consumers
// (the regression pin exercised a dead seam). These pins freeze the
// convergence: the live Import surface MUST parse through the shared,
// guarded, unit-tested seam — the "cure lands in a dead module" class
// can never resurface silently.

const ROOT = path.resolve(import.meta.dirname, "..");
const PAGE = readFileSync(
  path.join(ROOT, "src/app/(app)/import/page.tsx"),
  "utf-8",
);

describe("R-12: the Import page parses through the shared csv.ts seam", () => {
  it("imports parseCsv from @/lib/csv (no inline copy)", () => {
    expect(PAGE).toMatch(/import\s*\{[^}]*parseCsv[^}]*\}\s*from\s*"@\/lib\/csv"/);
  });

  it("carries NO local parser definition (the pre-214 defect's home)", () => {
    // The dead-copy tell: a module-local `function parseCsv(`. The page
    // must not re-declare what the seam owns.
    expect(PAGE).not.toMatch(/function parseCsv\s*\(/);
  });

  it("no other inline CSV state machine hides in the page", () => {
    // The parser's signature loop shape — if someone re-inlines the
    // machine under a different name, this catches the resurrection.
    expect(PAGE).not.toMatch(/let inQuotes\s*=\s*false/);
  });
});

describe("R-12: the honest non-CSV branch (F-215f — parity kept, UX honest)", () => {
  it("the accept attribute stays byte-identical to the reference (the parity surface)", () => {
    // Live-probed session 215: the reference's input carries exactly
    // ".csv,.xls,.xlsx" and its hint reads "CSV, XLS, XLSX up to 10MB"
    // — the reference's own false advertising, inherited byte-for-byte.
    expect(PAGE).toContain('accept=".csv,.xls,.xlsx"');
    expect(PAGE).toContain("CSV, XLS, XLSX up to 10MB");
  });

  it("a non-CSV extension gets the honest export-as-CSV guidance", () => {
    // The reference's bundle carries NO xlsx library (the only "xlsx"
    // occurrence IS its accept string) — neither app parses binary
    // sheets. Our superset: name the limitation instead of letting the
    // file decode to garbage and die in column detection.
    expect(PAGE).toMatch(/\.xlsx?\b/i);
    expect(PAGE).toMatch(/export.*csv.*re-?upload|save.*csv.*upload/i);
  });
});
