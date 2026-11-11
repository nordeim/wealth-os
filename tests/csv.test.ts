import { afterEach, describe, expect, it } from "vitest";
import { toCsv, parseCsv, csvFilename, stageCsvDate, type CsvColumn } from "@/lib/csv";

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

// Session-220 (R-17, F-220m): the import page's date STAGING seam — the
// F-218d doctrine brought to the last raw `new Date(<user text>)` site.
// The page's old `parsedDate.toISOString()` staged a LOCAL-midnight
// parse as a shifted instant for every east-of-UTC user (a Tokyo
// "05/03/2026" staged as 2026-05-02T15:00:00.000Z — the previous
// calendar day in UTC-calendar terms, inconsistent with every
// UI-created row). The seam stages the UTC MIDNIGHT of the parsed
// LOCAL calendar date — the exact form dateField-created rows store.
describe("stageCsvDate (F-220m)", () => {
  it("stages a bare ISO date as UTC midnight (identity with the dateField contract)", () => {
    expect(stageCsvDate("2026-11-01")).toBe("2026-11-01T00:00:00.000Z");
  });

  it("stages a locale-format date as the UTC midnight of the PARSED LOCAL calendar date (the Tokyo west-shift case)", () => {
    // "05/03/2026" parses (V8, MDY assumption — documented) as May 3
    // LOCAL midnight; the seam must stage May 3's UTC midnight, not
    // the local-midnight instant (which shifts a day west/east).
    process.env.TZ = "Asia/Tokyo";
    expect(stageCsvDate("05/03/2026")).toBe("2026-05-03T00:00:00.000Z");
    process.env.TZ = "America/New_York";
    expect(stageCsvDate("05/03/2026")).toBe("2026-05-03T00:00:00.000Z");
    process.env.TZ = "UTC";
  });

  it("stages a full ISO timestamp as UTC midnight of its UTC calendar date (zoneless zone-safety)", () => {
    expect(stageCsvDate("2026-11-01T18:30:00.000Z")).toBe("2026-11-01T00:00:00.000Z");
  });

  it("returns null for unparseable dates (the caller surfaces the skip)", () => {
    expect(stageCsvDate("not a date")).toBeNull();
    expect(stageCsvDate("25/13/2026")).toBeNull();
    expect(stageCsvDate("")).toBeNull();
  });

  it("returns null for empty/absent input", () => {
    expect(stageCsvDate("   ")).toBeNull();
  });
});

// Session-221 (R-18, F-221a/F-221c): the F-220a doctrine ("pin the
// FORM with TZ-switching tests") applied to the seam the doctrine
// missed. The R-17 implementation read LOCAL accessors off every
// parse: a bare yyyy-mm-dd cell parses as UTC midnight, so west of
// UTC the local parts read the PRIOR day (New York "2026-11-01" →
// 2026-10-31 — live-reproduced); a Z-suffixed timestamp east of UTC
// reads the NEXT day (Tokyo "2026-11-01T18:30:00Z" → Nov 2, and the
// year boundary "2026-12-31T23:30:00Z" → 2027-01-01). The pins flip
// TZ per-assertion exactly like tests/finance.test.ts's F-220a rows.
describe("stageCsvDate TZ-switching (F-221a/F-221c — the form-branch contract)", () => {
  afterEach(() => {
    process.env.TZ = "UTC";
  });

  it("F-221a: a bare yyyy-mm-dd cell stages ITS OWN day west of UTC (New York)", () => {
    process.env.TZ = "America/New_York";
    // Pre-cure (live-reproduced): 2026-10-31T00:00:00.000Z — the
    // most common bank-CSV date form stored one day early for the
    // Americas.
    expect(stageCsvDate("2026-11-01")).toBe("2026-11-01T00:00:00.000Z");
    expect(stageCsvDate("2026-01-01")).toBe("2026-01-01T00:00:00.000Z");
  });

  it("F-221a: a bare yyyy-mm-dd cell stages its own day east of UTC (Tokyo)", () => {
    process.env.TZ = "Asia/Tokyo";
    expect(stageCsvDate("2026-11-01")).toBe("2026-11-01T00:00:00.000Z");
  });

  it("F-221c: a Z-suffixed timestamp stages the UTC calendar day east of UTC (Tokyo)", () => {
    process.env.TZ = "Asia/Tokyo";
    // Pre-cure (live-reproduced): 2026-11-02T00:00:00.000Z — the
    // local accessors read Nov 2 off the Nov-1 18:30Z instant.
    expect(stageCsvDate("2026-11-01T18:30:00.000Z")).toBe(
      "2026-11-01T00:00:00.000Z",
    );
  });

  it("F-221c: the year boundary stages the UTC calendar day (Tokyo, Dec 31 23:30Z)", () => {
    process.env.TZ = "Asia/Tokyo";
    // Pre-cure (live-reproduced): 2027-01-01T00:00:00.000Z.
    expect(stageCsvDate("2026-12-31T23:30:00Z")).toBe(
      "2026-12-31T00:00:00.000Z",
    );
  });

  it("F-221c: a Z-suffixed timestamp stages the UTC calendar day west of UTC (New York)", () => {
    process.env.TZ = "America/New_York";
    expect(stageCsvDate("2026-11-01T18:30:00.000Z")).toBe(
      "2026-11-01T00:00:00.000Z",
    );
  });

  it("the locale forms KEEP the local-accessor staging under both zones (the F-220m contract stands)", () => {
    process.env.TZ = "Asia/Tokyo";
    expect(stageCsvDate("05/03/2026")).toBe("2026-05-03T00:00:00.000Z");
    process.env.TZ = "America/New_York";
    expect(stageCsvDate("05/03/2026")).toBe("2026-05-03T00:00:00.000Z");
  });
});

// Session-222 (R-19, F-222a/b/c/d): the zone-designator completion.
// The R-18 form-branch left three escape hatches open, all
// live-reproduced under TZ-switching probes: (a) the UTC_DESIGNATED
// regex is case-sensitive, so RFC-3339-legal lowercase `z` falls into
// the locale branch and stages one day off on both zone edges (New
// York "2026-11-01T01:30:00z" → 2026-10-31; Tokyo
// "2026-11-01T18:30:00z" → Nov 2; the year boundary → 2027-01-01);
// (b) NON-UTC offsets (+09:00, -05:00) staged the VIEWER's calendar
// date — the identical file imported different books for different
// users (+09:00 in New York → Oct 31; -05:00 in Tokyo → Nov 2; the
// year boundary -05:00 in Tokyo → 2027-01-01); (c) partial ISO forms
// ("2026", "2026-11") escaped every branch and staged a rolled day
// west of UTC (New York "2026-11" → 2026-10-31, "2026" → 2025-12-31);
// (d) the calendar-rollover guard covered the bare branch only
// ("02/30/2026" staged Mar 2 while "2026-02-30" correctly nulled).
// The completed contract: EVERY zone-designated ISO datetime (Z/z or
// ±HH:MM/±HHMM/±HH) stages the WRITTEN date literal — the offset's
// own wall-clock date, never the viewer's; partial ISO forms skip
// (null — never an invented day); every literal-staging branch
// round-trips its calendar.
describe("stageCsvDate zone-designator completion (F-222a/b/c/d)", () => {
  afterEach(() => {
    process.env.TZ = "UTC";
  });

  it("F-222a: lowercase-z is a UTC designator — stages its UTC calendar day west of UTC (New York)", () => {
    process.env.TZ = "America/New_York";
    // Pre-cure (live-reproduced): 2026-10-31T00:00:00.000Z — the
    // locale branch's local accessors read Oct 31 off the 01:30z
    // instant.
    expect(stageCsvDate("2026-11-01T01:30:00z")).toBe(
      "2026-11-01T00:00:00.000Z",
    );
  });

  it("F-222a: lowercase-z stages its UTC calendar day east of UTC (Tokyo)", () => {
    process.env.TZ = "Asia/Tokyo";
    // Pre-cure (live-reproduced): 2026-11-02T00:00:00.000Z.
    expect(stageCsvDate("2026-11-01T18:30:00z")).toBe(
      "2026-11-01T00:00:00.000Z",
    );
  });

  it("F-222a: the lowercase-z year boundary stages its UTC calendar day (Tokyo, Dec 31 23:30z)", () => {
    process.env.TZ = "Asia/Tokyo";
    // Pre-cure (live-reproduced): 2027-01-01T00:00:00.000Z.
    expect(stageCsvDate("2026-12-31T23:30:00z")).toBe(
      "2026-12-31T00:00:00.000Z",
    );
  });

  it("F-222b: a non-UTC offset stages the WRITTEN date west of UTC (New York reading +09:00)", () => {
    process.env.TZ = "America/New_York";
    // The written date is Nov 1 in +09:00. Pre-cure
    // (live-reproduced): 2026-10-31T00:00:00.000Z — the local
    // accessors read the New York calendar day off the instant.
    expect(stageCsvDate("2026-11-01T08:30:00+09:00")).toBe(
      "2026-11-01T00:00:00.000Z",
    );
  });

  it("F-222b: a non-UTC offset stages the WRITTEN date east of UTC (Tokyo reading -05:00)", () => {
    process.env.TZ = "Asia/Tokyo";
    // The written date is Nov 1 in -05:00. Pre-cure
    // (live-reproduced): 2026-11-02T00:00:00.000Z.
    expect(stageCsvDate("2026-11-01T18:30:00-05:00")).toBe(
      "2026-11-01T00:00:00.000Z",
    );
  });

  it("F-222b: the non-UTC-offset year boundary stages the WRITTEN date (Tokyo, Dec 31 23:30 -05:00)", () => {
    process.env.TZ = "Asia/Tokyo";
    // Pre-cure (live-reproduced): 2027-01-01T00:00:00.000Z.
    expect(stageCsvDate("2026-12-31T23:30:00-05:00")).toBe(
      "2026-12-31T00:00:00.000Z",
    );
  });

  it("F-222b: the offset family is zone-invariant — the same cell stages identically in both zones", () => {
    process.env.TZ = "America/New_York";
    const ny = stageCsvDate("2026-11-01T08:30:00+09:00");
    process.env.TZ = "Asia/Tokyo";
    const tokyo = stageCsvDate("2026-11-01T08:30:00+09:00");
    expect(ny).toBe("2026-11-01T00:00:00.000Z");
    expect(tokyo).toBe(ny);
  });

  it("F-222b: the compact offset form (+0900) stages the written date; the hour-only form (+09) is V8-invalid (null)", () => {
    process.env.TZ = "America/New_York";
    expect(stageCsvDate("2026-11-01T08:30:00+0900")).toBe(
      "2026-11-01T00:00:00.000Z",
    );
    // V8 rejects the hour-only offset outright (NaN — probed live):
    // the whole-string parity check nulls it (unparseable, the skip
    // path), never an invented day.
    expect(stageCsvDate("2026-11-01T08:30:00+09")).toBeNull();
  });

  it("F-222b: ±00:00 keeps staging its written (UTC) calendar day under both zones", () => {
    process.env.TZ = "Asia/Tokyo";
    expect(stageCsvDate("2026-11-01T18:30:00+00:00")).toBe(
      "2026-11-01T00:00:00.000Z",
    );
    process.env.TZ = "America/New_York";
    expect(stageCsvDate("2026-12-31T23:30:00-00:00")).toBe(
      "2026-12-31T00:00:00.000Z",
    );
  });

  it("F-222c: partial ISO forms skip (null) — never an invented day", () => {
    // V8 parses these as UTC day 1 of the written period; the locale
    // branch's local accessors then read the PRIOR day west of UTC
    // (pre-cure, live-reproduced: "2026-11" → 2026-10-31 and "2026" →
    // 2025-12-31 in New York).
    process.env.TZ = "America/New_York";
    expect(stageCsvDate("2026-11")).toBeNull();
    expect(stageCsvDate("2026")).toBeNull();
    process.env.TZ = "Asia/Tokyo";
    expect(stageCsvDate("2026-11")).toBeNull();
    expect(stageCsvDate("2026")).toBeNull();
  });

  it("F-222d: a rolled locale date (02/30/2026) is unparseable — the round-trip guard's locale arm", () => {
    // Pre-cure (live-reproduced): 2026-03-02T00:00:00.000Z — V8's
    // lenient parser rolled Feb 30 to Mar 2 and the locale branch
    // staged it (the bare branch already nulled "2026-02-30").
    expect(stageCsvDate("02/30/2026")).toBeNull();
    expect(stageCsvDate("02/29/2027")).toBeNull(); // 2027 is not a leap year
  });

  it("F-222d: a rolled zone-designated date is unparseable (the designated branch inherits the guard)", () => {
    expect(stageCsvDate("2026-02-30T00:00:00Z")).toBeNull();
    expect(stageCsvDate("2026-02-30T00:00:00+09:00")).toBeNull();
  });

  it("F-222d: an invalid TIME with a valid written date is unparseable (V8 parity — the whole string must parse)", () => {
    expect(stageCsvDate("2026-11-01T25:00:00Z")).toBeNull();
    expect(stageCsvDate("2026-11-01T12:99:00+09:00")).toBeNull();
  });

  it("the numeric locale controls keep staging under the guard (MDY, YMD-slash, dotted-MDY, two-digit year)", () => {
    process.env.TZ = "America/New_York";
    expect(stageCsvDate("11/01/2026")).toBe("2026-11-01T00:00:00.000Z");
    expect(stageCsvDate("2026/11/01")).toBe("2026-11-01T00:00:00.000Z");
    // The documented dotted-form ambiguity: V8 reads dots as MDY, so
    // "01.11.2026" is January 11 (the MDY round-trip holds — this is
    // the recorded DMY-ambiguity residual, not a cure target).
    expect(stageCsvDate("01.11.2026")).toBe("2026-01-11T00:00:00.000Z");
    // Two-digit years keep V8's remap ("26" → 2026); the guard only
    // round-trips four-digit-year forms (the remap boundary is
    // engine-internal — documented residual).
    expect(stageCsvDate("11/1/26")).toBe("2026-11-01T00:00:00.000Z");
  });

  it("F-222d: the DMY slash form stays unparseable (the US-MDY assumption, documented)", () => {
    // V8 rejects month > 12 in slash forms outright (NaN) — day-first
    // exports never parsed; recorded so the guard is not blamed.
    expect(stageCsvDate("25/12/2026")).toBeNull();
  });

  it("the offset-less ISO datetime keeps the LOCAL wall-clock staging (the ES-spec form)", () => {
    // "2026-11-01T18:30:00" carries no designator — the ES spec
    // parses it as a local wall-clock, so the local accessors are
    // the correct staging arm (unchanged by R-19).
    process.env.TZ = "Asia/Tokyo";
    expect(stageCsvDate("2026-11-01T18:30:00")).toBe(
      "2026-11-01T00:00:00.000Z",
    );
    process.env.TZ = "America/New_York";
    expect(stageCsvDate("2026-11-01T01:30:00")).toBe(
      "2026-11-01T00:00:00.000Z",
    );
  });
});

// Session-223 (R-20, F-223d): the F-222d rollover guard's `$`-anchored
// NUMERIC_LOCALE cannot match a trailing time, so the common US
// bank-datetime shape staged the rolled day silently (live-reproduced,
// TZ-independent: "02/30/2026 10:00" → Mar 2 while the date-only form
// nulls; "02/29/2026 12:00 AM" → Mar 1 on the non-leap year). The
// anchor widens to a `(?!\d)` prefix match — the guard fires on the
// rolled digits while VALID time-suffixed forms keep staging (both
// pinned below, TZ-switched per the house doctrine).
describe("stageCsvDate time-suffixed rollover guard (F-223d)", () => {
  it("a ROLLED numeric date with a trailing time is unparseable (the guard fires through the time)", () => {
    for (const tz of ["UTC", "America/New_York", "Asia/Tokyo"]) {
      process.env.TZ = tz;
      expect(stageCsvDate("02/30/2026 10:00")).toBeNull();
      expect(stageCsvDate("02/30/2026 10:00 AM")).toBeNull();
      expect(stageCsvDate("2/30/2026 10:00 AM")).toBeNull();
      expect(stageCsvDate("02/29/2026 12:00 AM")).toBeNull();
    }
  });

  it("a VALID numeric date with a trailing time keeps staging its written day", () => {
    for (const tz of ["UTC", "America/New_York", "Asia/Tokyo"]) {
      process.env.TZ = tz;
      expect(stageCsvDate("11/01/2026 10:00")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("11/01/2026 10:00 AM")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("2026/11/01 10:00")).toBe("2026-11-01T00:00:00.000Z");
    }
  });

  it("the date-only forms keep their standing contract (the anchor change is invisible to them)", () => {
    process.env.TZ = "America/New_York";
    expect(stageCsvDate("02/30/2026")).toBeNull();
    expect(stageCsvDate("11/01/2026")).toBe("2026-11-01T00:00:00.000Z");
    expect(stageCsvDate("2026/11/01")).toBe("2026-11-01T00:00:00.000Z");
  });
});

// Session-223 (R-20, F-223e): month-only named forms invented day 1
// ("Nov 2026" → 2026-11-01, live-reproduced TZ-independent) while the
// ISO partials "2026"/"2026-11" correctly null — the F-222c doctrine
// ("a skip beats an invented day") never covered the named twins. A
// month-year CSV cell (statement periods) carries no day the user
// chose.
describe("stageCsvDate month-only named rejection (F-223e)", () => {
  it("month-year named forms are unparseable (no day was chosen)", () => {
    for (const tz of ["UTC", "America/New_York", "Asia/Tokyo"]) {
      process.env.TZ = tz;
      expect(stageCsvDate("Nov 2026")).toBeNull();
      expect(stageCsvDate("January 2026")).toBeNull();
    }
  });

  it("named forms WITH a day keep staging (the rejection is month-only)", () => {
    process.env.TZ = "America/New_York";
    expect(stageCsvDate("Nov 1, 2026")).toBe("2026-11-01T00:00:00.000Z");
    expect(stageCsvDate("November 15, 2026")).toBe("2026-11-15T00:00:00.000Z");
  });
});

// Session-224 (R-21, F-224a): the YMD-slash rollover bypass —
// localeRollover's year-length gate read the MDY year group only, so
// every YMD rolled date skipped the guard and staged silently
// (live-reproduced: "2026/02/30" → Mar 2, and "2026/02/29" in the
// NON-LEAP 2026 → Mar 1, while the MDY twins correctly null).
describe("stageCsvDate YMD rollover guard (F-224a)", () => {
  it("YMD-slash rolled dates are unparseable in every zone", () => {
    for (const tz of ["UTC", "America/New_York", "Asia/Tokyo"]) {
      process.env.TZ = tz;
      expect(stageCsvDate("2026/02/30")).toBeNull();
      expect(stageCsvDate("2026/02/29")).toBeNull(); // 2026 is not a leap year
      expect(stageCsvDate("2026/02/30 10:00")).toBeNull();
    }
  });

  it("valid YMD-slash dates keep staging — including the leap-year control", () => {
    for (const tz of ["UTC", "America/New_York", "Asia/Tokyo"]) {
      process.env.TZ = tz;
      expect(stageCsvDate("2028/02/29")).toBe("2028-02-29T00:00:00.000Z"); // 2028 IS a leap year
      expect(stageCsvDate("2026/11/01")).toBe("2026-11-01T00:00:00.000Z");
    }
  });
});

// Session-224 (R-21, F-224c): the month-year family completion. The
// F-223e rejection's `$` anchor could not see a trailing time
// ("Nov 2026 10:00" staged the invented day 1), and the REVERSED
// twins ("2026 Nov" / "2026-Nov" — live-probed, V8 reads 2026-11-01)
// were never covered at all. The rejection family is now
// form-precise: separator class [\s.-], an optional TIME tail, and
// the reversed twin — while every day-carrying form keeps staging.
describe("stageCsvDate month-year family completion (F-224c)", () => {
  it("time-suffixed month-year forms are unparseable (no day was chosen)", () => {
    for (const tz of ["UTC", "America/New_York", "Asia/Tokyo"]) {
      process.env.TZ = tz;
      expect(stageCsvDate("Nov 2026 10:00")).toBeNull();
      expect(stageCsvDate("January 2026 8:30 AM")).toBeNull();
    }
  });

  it("the REVERSED month-year twins are unparseable (with and without time)", () => {
    for (const tz of ["UTC", "America/New_York", "Asia/Tokyo"]) {
      process.env.TZ = tz;
      expect(stageCsvDate("2026 Nov")).toBeNull();
      expect(stageCsvDate("2026-Nov")).toBeNull();
      expect(stageCsvDate("2026 Nov 10:00")).toBeNull();
      expect(stageCsvDate("Nov-2026")).toBeNull();
    }
  });

  it("day-carrying named forms keep staging through the widened family", () => {
    process.env.TZ = "America/New_York";
    expect(stageCsvDate("Nov 2026 15")).toBe("2026-11-15T00:00:00.000Z");
    expect(stageCsvDate("2026 Nov 15")).toBe("2026-11-15T00:00:00.000Z");
    expect(stageCsvDate("2026 Nov 15 10:00")).toBe("2026-11-15T00:00:00.000Z");
    process.env.TZ = "Asia/Tokyo";
    expect(stageCsvDate("Nov 15 2026")).toBe("2026-11-15T00:00:00.000Z");
    expect(stageCsvDate("15 Nov 2026")).toBe("2026-11-15T00:00:00.000Z");
  });
});

describe("stageCsvDate R-22 completion (F-225a/b — the numeric partials and the designated tails)", () => {
  afterEach(() => {
    process.env.TZ = "UTC";
  });

  // ---- F-225a: the numeric year-month partials (a skip, never an invented day)
  it("the numeric year-month partials null — slash/dot/space separators, 1- or 2-digit months", () => {
    for (const zone of ["UTC", "America/New_York", "Asia/Tokyo"]) {
      process.env.TZ = zone;
      expect(stageCsvDate("2026/11")).toBeNull();
      expect(stageCsvDate("2026.11")).toBeNull();
      expect(stageCsvDate("2026 11")).toBeNull();
      expect(stageCsvDate("2026/1")).toBeNull();
    }
  });

  it("the three-group numeric forms keep staging (the null-arm is $-anchored — a partial is exactly two groups)", () => {
    process.env.TZ = "UTC";
    expect(stageCsvDate("2026/11/01")).toBe("2026-11-01T00:00:00.000Z");
    expect(stageCsvDate("2026 11 01")).toBe("2026-11-01T00:00:00.000Z");
    expect(stageCsvDate("11/1/26")).toBe("2026-11-01T00:00:00.000Z");
  });

  // ---- F-225b: the designated tails stage the WRITTEN day in every zone
  it("the named UTC/GMT tails stage the written day — New York and Tokyo agree (pre-cure: the viewer's calendar, a wrong day west of the designation)", () => {
    process.env.TZ = "America/New_York";
    expect(stageCsvDate("Nov 1, 2026 UTC")).toBe("2026-11-01T00:00:00.000Z");
    expect(stageCsvDate("Jan 1, 2026 UTC")).toBe("2026-01-01T00:00:00.000Z");
    expect(stageCsvDate("Nov 1, 2026 GMT")).toBe("2026-11-01T00:00:00.000Z");
    process.env.TZ = "Asia/Tokyo";
    expect(stageCsvDate("Nov 1, 2026 UTC")).toBe("2026-11-01T00:00:00.000Z");
    expect(stageCsvDate("Jan 1, 2026 UTC")).toBe("2026-01-01T00:00:00.000Z");
  });

  it("a space before the offset is a designated form — the named and ISO twins stage the written day in every zone (pre-cure: the viewer's calendar)", () => {
    process.env.TZ = "America/New_York";
    expect(stageCsvDate("Nov 1, 2026 10:00 +09:00")).toBe("2026-11-01T00:00:00.000Z");
    expect(stageCsvDate("2026-11-01 10:00 +09:00")).toBe("2026-11-01T00:00:00.000Z");
    process.env.TZ = "Asia/Tokyo";
    expect(stageCsvDate("Nov 1, 2026 10:00 +09:00")).toBe("2026-11-01T00:00:00.000Z");
    expect(stageCsvDate("2026-11-01 10:00 +09:00")).toBe("2026-11-01T00:00:00.000Z");
  });

  it("the 4-digit numeric designated forms stage the written day in every zone (pre-cure: null west of the designation, staged east — the zone split)", () => {
    process.env.TZ = "America/New_York";
    expect(stageCsvDate("2026/11/01 UTC")).toBe("2026-11-01T00:00:00.000Z");
    expect(stageCsvDate("11/01/2026 UTC")).toBe("2026-11-01T00:00:00.000Z");
    expect(stageCsvDate("2026/11/01 10:00 -05:00")).toBe("2026-11-01T00:00:00.000Z");
    process.env.TZ = "Asia/Tokyo";
    expect(stageCsvDate("2026/11/01 UTC")).toBe("2026-11-01T00:00:00.000Z");
    expect(stageCsvDate("11/01/2026 UTC")).toBe("2026-11-01T00:00:00.000Z");
    expect(stageCsvDate("2026/11/01 10:00 -05:00")).toBe("2026-11-01T00:00:00.000Z");
  });

  it("a rolled designated calendar nulls (the round-trip doctrine on the new arms)", () => {
    process.env.TZ = "UTC";
    expect(stageCsvDate("Nov 31, 2026 UTC")).toBeNull();
    expect(stageCsvDate("02/30/2026 UTC")).toBeNull();
    expect(stageCsvDate("2026/02/30 UTC")).toBeNull();
  });

  it("an unknown month name nulls (V8 NaN parity on the named designated arm)", () => {
    process.env.TZ = "UTC";
    expect(stageCsvDate("Foo 1, 2026 UTC")).toBeNull();
  });

  it("the two-digit-year designated numerics SKIP (the remap boundary is engine-internal — a visible skip beats a silent wrong day)", () => {
    for (const zone of ["UTC", "America/New_York", "Asia/Tokyo"]) {
      process.env.TZ = zone;
      expect(stageCsvDate("11/01/26 UTC")).toBeNull();
      expect(stageCsvDate("11/01/26 10:00 +09:00")).toBeNull();
      expect(stageCsvDate("Nov 1, 26 UTC")).toBeNull();
      expect(stageCsvDate("15 Nov 26 UTC")).toBeNull();
    }
  });

  // ---- F-225g: the two-digit-year rolled numeric residual, recorded
  it("the two-digit-year rolled numeric date stages the roll (the recorded residual — pinned, not cured)", () => {
    for (const zone of ["UTC", "America/New_York", "Asia/Tokyo"]) {
      process.env.TZ = zone;
      expect(stageCsvDate("02/30/26")).toBe("2026-03-02T00:00:00.000Z");
    }
  });
});

// Session-226 (R-23, F-226a): the designated-tail ESCAPE families —
// seven regex-shape classes the R-22 taxonomy missed still staged the
// VIEWER's calendar (live-reproduced under TZ switching in three zones,
// scripts/probe-226-csv.ts; the V8 acceptance of every form validated by
// scripts/probe-226-v8.ts BEFORE the cure). Every escape now routes to
// the written-literal staging doctrine; every control keeps its behavior.
describe("stageCsvDate designated-tail escapes (F-226a — the R-22 completion)", () => {
  const ZONES = ["UTC", "America/New_York", "Asia/Tokyo"] as const;
  afterEach(() => {
    process.env.TZ = "UTC";
  });

  it("case-insensitive utc/gmt tails stage the written day (pre-cure: 2026-10-31 in New York — a wrong day)", () => {
    for (const zone of ZONES) {
      process.env.TZ = zone;
      expect(stageCsvDate("Nov 1, 2026 utc")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Nov 1, 2026 Gmt")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("2026-11-01 10:00 utc")).toBe("2026-11-01T00:00:00.000Z");
    }
  });

  it("a leading weekday is tolerated — the RFC-822 shape stages the written day in every zone (pre-cure: 'Thu, 01 Jan 2026 00:00:00 GMT' staged 2025-12-31 in New York — a wrong day AND year)", () => {
    for (const zone of ZONES) {
      process.env.TZ = zone;
      expect(stageCsvDate("Sun, Nov 1, 2026 UTC")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Sunday, Nov 1, 2026 UTC")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Thu, 01 Jan 2026 00:00:00 GMT")).toBe("2026-01-01T00:00:00.000Z");
      expect(stageCsvDate("Fri Nov 1, 2026 UTC")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Sun 11/01/2026 UTC")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Thu, 01 Jan 2026 00:00:00 -0500")).toBe("2026-01-01T00:00:00.000Z");
      expect(stageCsvDate("Thu, 01 Jan 2026 00:00:00 EST")).toBe("2026-01-01T00:00:00.000Z");
    }
  });

  it("separator lenience — double spaces, comma-no-space, and space-before-comma all stage the written day (pre-cure: the viewer's calendar in New York)", () => {
    for (const zone of ZONES) {
      process.env.TZ = zone;
      expect(stageCsvDate("Nov  1, 2026 UTC")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Nov 1,2026 UTC")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Nov 1 , 2026 UTC")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Nov.1.2026 UTC")).toBe("2026-11-01T00:00:00.000Z");
    }
  });

  it("the meridiem before the designator stages the written day (pre-cure: 'Nov 1, 2026 11:00 PM UTC' staged Nov 2 in Tokyo)", () => {
    for (const zone of ZONES) {
      process.env.TZ = zone;
      expect(stageCsvDate("Nov 1, 2026 11:00 PM UTC")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("01 Nov 2026 11:00 PM GMT")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("11/01/2026 11:00 PM UTC")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("2026-11-01 11:00 PM +09:00")).toBe("2026-11-01T00:00:00.000Z");
    }
  });

  it("V8's named zones stage the written day in every zone (pre-cure: 'Nov 1, 2026 8:00 PM EST' staged Nov 2 in UTC/Tokyo; 'Dec 31, 2026 8:00 PM EST' staged 2027-01-01 — a wrong year)", () => {
    for (const zone of ZONES) {
      process.env.TZ = zone;
      expect(stageCsvDate("Nov 1, 2026 8:00 PM EST")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Nov 1, 2026 8:00 PM EDT")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Nov 1, 2026 8:00 PM CST")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Nov 1, 2026 8:00 PM CDT")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Nov 1, 2026 8:00 PM MST")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Nov 1, 2026 8:00 PM MDT")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Nov 1, 2026 8:00 PM PST")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Nov 1, 2026 8:00 PM PDT")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Nov 1, 2026 8:00 PM UT")).toBe("2026-11-01T00:00:00.000Z");
      // The year boundary — the audit's wrong-year repro
      expect(stageCsvDate("Dec 31, 2026 8:00 PM EST")).toBe("2026-12-31T00:00:00.000Z");
      // The zone-split twin: the ISO-space form's V8 instant previously
      // staged-by-luck in New York and nulled in Tokyo
      expect(stageCsvDate("2026-11-01 10:00 EST")).toBe("2026-11-01T00:00:00.000Z");
    }
  });

  it("V8-REJECTED named zones null safely in every zone (CET/JST/BST/AEST — V8 NaN, the whole-parse guard)", () => {
    for (const zone of ZONES) {
      process.env.TZ = zone;
      expect(stageCsvDate("Nov 1, 2026 8:00 PM CET")).toBeNull();
      expect(stageCsvDate("Nov 1, 2026 8:00 PM JST")).toBeNull();
      expect(stageCsvDate("Nov 1, 2026 8:00 PM BST")).toBeNull();
      expect(stageCsvDate("Nov 1, 2026 8:00 PM AEST")).toBeNull();
      expect(stageCsvDate("Nov 1, 2026 8:00 PM XYZ")).toBeNull();
    }
  });

  it("compound UTC/GMT± tails stage the written day in every zone (pre-cure: 'Nov 1, 2026 UTC+01:00' staged 2026-10-31 in two zones; 'Jan 1, 2026 GMT+05:30' staged 2025-12-31)", () => {
    for (const zone of ZONES) {
      process.env.TZ = zone;
      expect(stageCsvDate("Nov 1, 2026 UTC+01:00")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Nov 1, 2026 GMT+5")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Nov 1, 2026 UTC -05:00")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Jan 1, 2026 GMT+05:30")).toBe("2026-01-01T00:00:00.000Z");
      expect(stageCsvDate("Nov 1, 2026 UTC+1")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Nov 1, 2026 gmt+05:30")).toBe("2026-11-01T00:00:00.000Z");
    }
  });

  it("the month-year family WITH a designated tail nulls — no day was written (pre-cure: 'Nov 2026 UTC' staged 2026-10-31 in New York — the invented day AND the zone shift)", () => {
    for (const zone of ZONES) {
      process.env.TZ = zone;
      expect(stageCsvDate("Nov 2026 UTC")).toBeNull();
      expect(stageCsvDate("Nov 2026 GMT")).toBeNull();
      expect(stageCsvDate("Nov 2026 10:00 UTC")).toBeNull();
      expect(stageCsvDate("Nov 2026 10:00 AM UTC")).toBeNull();
      expect(stageCsvDate("Nov 2026 10:00 UTC+01:00")).toBeNull();
      expect(stageCsvDate("2026 Nov 10:00 UTC")).toBeNull();
      expect(stageCsvDate("2026/11 UTC")).toBeNull();
      expect(stageCsvDate("2026/11 Z")).toBeNull();
      expect(stageCsvDate("2026/11 GMT")).toBeNull();
      expect(stageCsvDate("2026 11 UTC")).toBeNull();
      expect(stageCsvDate("2026-11 UTC")).toBeNull();
    }
  });

  it("the day-carrying month-year form WITH a designated tail stages the WRITTEN day (pre-cure: 'Nov 2026 15 UTC' staged Nov 14 in New York — the written day was 15)", () => {
    for (const zone of ZONES) {
      process.env.TZ = zone;
      expect(stageCsvDate("Nov 2026 15 UTC")).toBe("2026-11-15T00:00:00.000Z");
    }
  });

  it("the controls keep their standing behavior (the escape cure must not regress the covered forms)", () => {
    for (const zone of ZONES) {
      process.env.TZ = zone;
      // The R-22 covered tails
      expect(stageCsvDate("Nov 1, 2026 UTC")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("Jan 1, 2026 GMT")).toBe("2026-01-01T00:00:00.000Z");
      expect(stageCsvDate("2026-11-01 10:00 +09:00")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("11/01/2026 UTC")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("01 Nov 2026 UTC")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("2026-11-01T10:00:00z")).toBe("2026-11-01T00:00:00.000Z");
      // The rejections and residuals
      expect(stageCsvDate("2026/11")).toBeNull();
      expect(stageCsvDate("Nov 2026")).toBeNull();
      expect(stageCsvDate("Nov 2026 10:00")).toBeNull();
      expect(stageCsvDate("2026 Nov")).toBeNull();
      expect(stageCsvDate("Nov 1, 26 UTC")).toBeNull();
      expect(stageCsvDate("11/01/26 UTC")).toBeNull();
      expect(stageCsvDate("Nov 31, 2026 UTC")).toBeNull();
      // The day-carrying named forms keep staging through the locale arm
      expect(stageCsvDate("Nov 2026 15")).toBe("2026-11-15T00:00:00.000Z");
      expect(stageCsvDate("2026 Nov 15 10:00")).toBe("2026-11-15T00:00:00.000Z");
      // ISO dates are NOT the numeric month-year partial (the tail-design hazard)
      expect(stageCsvDate("2026-11-01")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("2026/11/01 UTC")).toBe("2026-11-01T00:00:00.000Z");
      // The bare ±HH forms stage the written day (the F-226n truth)
      expect(stageCsvDate("Nov 1, 2026 10:00 +09")).toBe("2026-11-01T00:00:00.000Z");
      expect(stageCsvDate("2026-11-01 10:00 +09")).toBe("2026-11-01T00:00:00.000Z");
    }
  });

  it("the ISO end-of-day edge stages the WRITTEN day (the doctrine-consistent reading — V8 reads 24:00 as the next day; the digits wrote Nov 1)", () => {
    for (const zone of ZONES) {
      process.env.TZ = zone;
      expect(stageCsvDate("2026-11-01T24:00:00Z")).toBe("2026-11-01T00:00:00.000Z");
    }
  });

  it("rolled designated calendars null on the widened arms (the round-trip doctrine extends)", () => {
    for (const zone of ZONES) {
      process.env.TZ = zone;
      expect(stageCsvDate("Nov 31, 2026 utc")).toBeNull();
      expect(stageCsvDate("Sun, Nov 31, 2026 UTC")).toBeNull();
      expect(stageCsvDate("Nov 2026 32 UTC")).toBeNull(); // the day-after-year arm round-trips
      expect(stageCsvDate("Xxx 1, 2026 UTC")).toBeNull(); // unknown month, weekday-shaped
      expect(stageCsvDate("Nov 1, 2026 11:00 PM EST")).toBe("2026-11-01T00:00:00.000Z"); // the meridiem × named-zone cross
    }
  });
});
