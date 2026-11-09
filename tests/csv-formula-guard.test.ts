import { describe, expect, it } from "vitest";
import { guardFormulaPrefix, toCsv, parseCsv, type CsvColumn } from "@/lib/csv";

// Session-216 (R-13, F-216b — the formula-guard pin, the phantom
// reference made real): the S48-P1 guard rode the analytics export
// since R-12, but its ONLY "coverage" was a csv.ts docblock citing a
// tests/csv-formula-guard.test.ts that died in the session-199 suite
// rewrite — a regression of the regex or the escapeCell call would
// ship green (the exact "cure lands where nothing pins it" class
// F-215a cured). This file is the promised pin: the full OWASP
// posture-(b) contract, including the round-trip trade-off.

interface Row {
  name: string;
  value: number;
}

const columns: Array<CsvColumn<Row>> = [
  { header: "Name", value: (r) => r.name },
  { header: "Value", value: (r) => r.value },
];

describe("guardFormulaPrefix (the S48-P1 posture-(b) contract)", () => {
  it.each(["=cmd()", "+971555", "@SUM(A1)", "\t tabbed", "\r CR-prefixed"])(
    "guards the %j vector with Excel's text marker",
    (cell) => {
      expect(guardFormulaPrefix(cell)).toBe(`'${cell}`);
    },
  );

  it("keeps `-`-prefixed cells byte-identical (the (b)-vs-(c) exclusion)", () => {
    // Negative numbers and dash-prefixed free text stay exact — full
    // OWASP would mangle them for a materially narrower vector.
    expect(guardFormulaPrefix("-42.50")).toBe("-42.50");
    expect(guardFormulaPrefix("Coffee - large")).toBe("Coffee - large");
  });

  it("keeps safe cells byte-identical", () => {
    expect(guardFormulaPrefix("Ada Lovelace")).toBe("Ada Lovelace");
    expect(guardFormulaPrefix("")).toBe("");
  });
});

describe("toCsv routes every cell through the guard (the live export surface)", () => {
  it("marks formula-prefixed cells inside RFC-4180 quoting", () => {
    const csv = toCsv([{ name: "=1+1", value: 2 }], columns);
    expect(csv).toBe("Name,Value\r\n'=1+1,2");
  });

  it("guards a vector cell that ALSO needs comma quoting (the marker inside the quotes)", () => {
    const csv = toCsv([{ name: "=SUM(A1,B1)", value: 2 }], columns);
    expect(csv).toBe('Name,Value\r\n"\'=SUM(A1,B1)",2');
  });

  it("leaves safe rows untouched (byte-identical — the s41-P2 precedent)", () => {
    const csv = toCsv([{ name: "Ada", value: 3 }], columns);
    expect(csv).toBe("Name,Value\r\nAda,3");
  });

  it("leaves negative-number cells untouched", () => {
    const csv = toCsv([{ name: "Transfer", value: -42.5 }], columns);
    expect(csv).toBe("Name,Value\r\nTransfer,-42.5");
  });
});

describe("the round-trip trade-off (the documented residual)", () => {
  it("parseCsv preserves the marker — a re-imported guarded cell stays visibly marked", () => {
    const exported = toCsv([{ name: "=cmd()", value: 1 }], columns);
    const rows = parseCsv(exported);
    expect(rows[1][0]).toBe("'=cmd()");
  });
});
