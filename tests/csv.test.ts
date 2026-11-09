import { describe, expect, it } from "vitest";
import { toCsv, parseCsv, csvFilename, type CsvColumn } from "@/lib/csv";

interface Row {
  name: string;
  email: string | null;
  value: number;
}

const columns: CsvColumn<Row>[] = [
  { header: "Name", value: (r) => r.name },
  { header: "Email", value: (r) => r.email },
  { header: "Value", value: (r) => r.value },
];

describe("toCsv", () => {
  it("serializes rows with headers", () => {
    const csv = toCsv([{ name: "Ada", email: null, value: 3 }], columns);
    expect(csv).toBe("Name,Email,Value\r\nAda,,3");
  });

  it("escapes commas, quotes and newlines", () => {
    const csv = toCsv([{ name: 'Say "hi", ok', email: "a@b.c", value: 1 }], columns);
    expect(csv).toBe('Name,Email,Value\r\n"Say ""hi"", ok",a@b.c,1');
  });

  it("handles empty row sets", () => {
    expect(toCsv([], columns)).toBe("Name,Email,Value");
  });
});

describe("parseCsv", () => {
  it("round-trips exported CSV", () => {
    const rows = [
      { name: "Ada Lovelace", email: "ada@example.com", value: 42 },
      { name: "Alan, Turing", email: null, value: 7 },
    ];
    const csv = toCsv(rows, columns);
    const parsed = parseCsv(csv);
    expect(parsed[0]).toEqual(["Name", "Email", "Value"]);
    expect(parsed[1]).toEqual(["Ada Lovelace", "ada@example.com", "42"]);
    expect(parsed[2]).toEqual(["Alan, Turing", "", "7"]);
  });

  it("strips a leading BOM", () => {
    expect(parseCsv("\uFEFFa,b\n1,2")).toEqual([
      ["a", "b"],
      ["1", "2"],
    ]);
  });

  it("drops blank trailing lines", () => {
    expect(parseCsv("a\n\n")).toEqual([["a"]]);
  });

  it("treats CRLF and CR as line breaks", () => {
    expect(parseCsv("a,b\r\n1,2\r3,4")).toHaveLength(3);
  });

  it("treats a quote inside an UNQUOTED field as a literal (RFC 4180, F-214h)", () => {
    // A bank CSV like `Grocer"y,24.50` must split on the comma; the
    // pre-214 parser flipped into quote mode at the quote and swallowed
    // the rest of the row into one cell.
    expect(parseCsv('Grocer"y,24.50\n"Quo""ted",10')).toEqual([
      ['Grocer"y', "24.50"],
      ['Quo"ted', "10"],
    ]);
  });
});

describe("csvFilename", () => {
  it("embeds the prefix and the ISO date (the reference's convention)", () => {
    // Session-25 (S25-P5): the reference's downloads are
    // prefix_YYYY-MM-DD.csv (leads_2026-10-01.csv) — underscore + ISO.
    const name = csvFilename("contacts");
    expect(name.startsWith("contacts_")).toBe(true);
    expect(name.endsWith(".csv")).toBe(true);
    expect(name).toMatch(/_\d{4}-\d{2}-\d{2}\.csv$/);
  });
});
