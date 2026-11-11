// CSV serialization for the export surface (the analytics export, through
// toCsv — unit-tested seam; the guard's contract in tests/csv-formula-guard.test.ts).

export interface CsvColumn<T> {
  header: string;
  value: (row: T) => string | number | null | undefined;
}

/**
 * Session-48 (S48-P1): the CSV formula-injection guard — the operator's
 * posture-(b) decision. Session-215 (R-12, F-215b): the guard's live
 * consumers are the toCsv column form (below) and, through it, the
 * analytics export — the pre-215 docblock claimed coverage of an
 * "entity-export.ts" that never existed in this repo while the ONE live
 * export hand-rolled its own quoting. A cell whose FIRST character is
 * `=`, `+`, `@`, tab (U+0009) or CR (U+000D) is a formula-entry vector
 * in spreadsheet consumers (OWASP CSV injection); prefixing the single
 * quote — Excel's own text marker — renders the cell as text while
 * keeping the artifact RFC-4180-well-formed. Every safe cell stays
 * BYTE-IDENTICAL (the s41-P2 quote-doubling precedent: the pinned
 * reference format untouched for safe fixtures).
 *
 * `-` is DELIBERATELY EXCLUDED (the (b)-vs-(c) line): negative numbers
 * and dash-prefixed free text stay exact — full-OWASP would mangle them
 * for a materially narrower residual vector (modern Excel blocks DDE by
 * default). The phone cost of guarding `+` is accepted and documented:
 * Excel renders `+971…` MORE faithfully as text than the current
 * formula-evaluated `971…`; raw-text/re-import consumers see the `'`
 * (parseCsv strips no markers — tests/csv-formula-guard.test.ts pins the
 * whole contract, including the round-trip trade-off; recreated session
 * 216 after the session-199 suite rewrite deleted the original).
 *
 * Static example/template content authored by THIS app (none today —
 * the Import wizard's own UI copy) stays OUTSIDE the guard — our own
 * content, no attacker-controlled data.
 */
export function guardFormulaPrefix(s: string): string {
  return /^[=+@\t\r]/.test(s) ? `'${s}` : s;
}

function escapeCell(v: string | number | null | undefined): string {
  if (v === null || v === undefined) return "";
  const s = guardFormulaPrefix(String(v));
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function toCsv<T>(rows: readonly T[], columns: readonly CsvColumn<T>[]): string {
  const head = columns.map((c) => escapeCell(c.header)).join(",");
  const body = rows.map((row) => columns.map((c) => escapeCell(c.value(row))).join(","));
  return [head, ...body].join("\r\n");
}

// Session-124 (D-124a7, the N-124a2 find): the BOM-wrapping helper
// retired as src-dead — the s123 D-123a1 BOM retirement removed the
// route's import; the definition survived with zero callers until this
// session (the s48/s49 retirement lineage). The reference's own
// artifacts are BOM-less (the 123-c live walk); nothing wraps a BOM
// anymore.
export function csvFilename(prefix: string): string {
  // Session-25 (S25-P5): the reference's convention is
  // prefix_YYYY-MM-DD.csv (leads_2026-10-01.csv, captured from its
  // downloads) — underscore + ISO date, not prefix-YYYYMMDD.
  const d = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${prefix}_${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}.csv`;
}

/** Minimal RFC-4180-ish parser used by the Import feature (bank-transaction
 *  CSV).
 *  Session-172 (F-172e): line-ending normalization runs INSIDE the state
 *  machine, OUTSIDE quotes only — a quoted CRLF/CR is FIELD DATA
 *  (RFC 4180 §2.6); the pre-172 global replace mutated quoted cells
 *  silently (a `\r\n` inside quotes became `\n` on import). Unquoted
 *  CRLF and lone CR still act as row breaks (the pinned s26 behavior). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  const src = text.replace(/^\uFEFF/, "");
  const breakRow = () => {
    row.push(cell);
    rows.push(row);
    row = [];
    cell = "";
  };
  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === '"') {
      // Session-214 (F-214h): a quote inside an UNQUOTED field is a
      // LITERAL character (RFC 4180 §2.7 — fields containing quotes
      // must be quoted; a bare quote is just data). The pre-214 parser
      // flipped into quote mode here, swallowing the next comma (and
      // potentially the rest of the row) into one cell. Only a quote at
      // a FIELD BOUNDARY (the cell still empty) opens a quoted field.
      if (cell === "") {
        inQuotes = true;
      } else {
        cell += '"';
      }
    } else if (ch === "\n") {
      breakRow();
    } else if (ch === "\r") {
      // CRLF or a lone CR ends the row (the s26 mixed-endings contract)
      if (src[i + 1] === "\n") i += 1;
      breakRow();
    } else {
      cell += ch;
    }
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim().length > 0));
}

/**
 * Session-220 (R-17, F-220m): the import page's date STAGING seam — the
 * F-218d doctrine ("a stored calendar date is the UTC-midnight ISO of
 * the date the USER chose — not an instant to zone-shift") brought to
 * the last raw `new Date(<user text>)` site. The page's old
 * `parsedDate.toISOString()` staged a LOCAL-midnight parse as a shifted
 * instant for every east-of-UTC user (a Tokyo "05/03/2026" staged as
 * 2026-05-02T15:00:00.000Z — the previous calendar day in UTC-calendar
 * terms, inconsistent with every dateField-created row and a different
 * bucketing genus in cross-timezone views).
 *
 * Session-221 (R-18, F-221a/F-221c): the original implementation read
 * LOCAL accessors off every parse — correct for the locale forms but
 * WRONG for both ISO forms, reintroducing the exact F-218d/F-220a class
 * at this seam: a bare yyyy-mm-dd cell parses as UTC MIDNIGHT, so west
 * of UTC the local parts read the PRIOR day (New York "2026-11-01"
 * staged 2026-10-31 — live-reproduced); a Z-suffixed timestamp east of
 * UTC reads the NEXT day (Tokyo "2026-11-01T18:30:00Z" staged Nov 2;
 * the year boundary "2026-12-31T23:30:00Z" staged 2027-01-01).
 *
 * The contract, FORM-BRANCHED: the bare ISO form stages the LITERAL
 * date it writes (the identity with the dateField contract — never an
 * instant to zone-shift); ISO forms carrying ANY zone designator (Z/z
 * case-insensitive, or ±HH:MM / ±HHMM — the ±HH bare form is
 * regex-tolerated but V8-REJECTED, so the row skips, never stages)
 * stage the WRITTEN date literal — the designator's own wall-clock
 * date, never the viewer's (a +09:00 cell is Nov 1 in +09:00
 * regardless of who imports it); every other parseable form (the
 * locale formats — MM/DD/YYYY with the documented US-MDY assumption)
 * keeps the local accessors (the parsed LOCAL calendar date's UTC
 * midnight). Partial ISO forms (yyyy, yyyy-mm) and month-year named
 * forms (forward AND reversed, with or without a trailing time)
 * carry no day the user chose — unparseable. A ROLLED calendar date
 * is unparseable on every literal-staging branch (the round-trip
 * must land on the day the digits wrote). Unparseable text returns
 * null; the caller surfaces the skip in the preview instead of
 * dropping silently.
 *
 * Session-225 (R-22, F-225a/b): the partial and designated-tail
 * completion. The partial family gains the NUMERIC year-month twins
 * ("2026/11" / "2026.11" / "2026 11" / "2026/1" — the hyphen partials
 * already nulled); the designated family widens to EVERY designated
 * tail on EVERY shape — the ISO arm tolerates a space before the
 * designator and the named UTC/GMT tails, and the locale-designated
 * arms (named MDY, day-first named, numeric MDY/YMD by the a≥1000
 * shape convention) stage the WRITTEN calendar, whole-parse-guarded
 * and round-trip-guarded. The two-digit-year designated numerics
 * SKIP (the remap boundary is engine-internal — a visible skip beats
 * a silent wrong day).
 *
 * Session-226 (R-23, F-226a): the escape-family completion — R-22's
 * own "recorded residual: nothing" claim was FALSE (the session-226
 * audit live-probed seven families this taxonomy still missed, all
 * staging the viewer's calendar: case-insensitive utc/gmt, the
 * leading weekday (RFC-822), separator lenience, the meridiem, V8's
 * named zones EST/EDT/CST/CDT/MST/MDT/PST/PDT/UT, the compound
 * UTC±/GMT± tails, and the month-year family WITH a tail). Every
 * designated tail now routes to the written-literal doctrine: the
 * tail regexes are case-insensitive (`i`), carry the named-zone set
 * and compound suffixes, the weekday prefix, the meridiem, and the
 * lenient separators; the name-YEAR-day twin ("Nov 2026 15 UTC")
 * joins the arms; the month-year rejection family carries the
 * designated NAMED tail (never the bare offset — see the
 * DESIGNATED_NAMED_TAIL comment for the ISO-date hazard). Recorded
 * residual (probed, deliberate): the two-digit-year rolled numerics
 * ("02/30/26") still stage the roll (F-225g); V8-rejected zone names
 * (CET/JST/BST/AEST) null through the whole-parse guard; a garbage
 * trailing token ("UTC garbage") is V8-NaN and nulls.
 *
 * Session-222 (R-19, F-222a/b/c/d): the R-18 branch's completion.
 * The UTC_DESIGNATED test was case-sensitive (RFC-3339-legal
 * lowercase z fell to the locale branch — a day off on both zone
 * edges, live-reproduced) and it recognized only ±00:00 (a +09:00
 * cell staged the VIEWER's calendar date — the identical file
 * imported different books for different users, live-reproduced at
 * the year boundary); "2026"/"2026-11" escaped every branch and
 * staged a rolled day west of UTC; and the rollover guard covered
 * the bare branch only (02/30/2026 staged Mar 2). The designated
 * branch now stages the written literal — for the Z/±00:00 forms
 * this is observationally identical to the R-18 UTC-accessor cure
 * (the written date IS the UTC date), so those pins stand unchanged.
 */
const BARE_ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
// Any zone-designated ISO datetime: the date groups before the T are
// the designator's own wall-clock date — the literal IS the staged
// day (never an instant to zone-shift).
// Session-225 (R-22, F-225b): the tail widens — an optional SPACE
// before the designator ("2026-11-01 10:00 +09:00") and the named
// UTC/GMT tails (a named zone IS +00:00; its written wall clock is
// the date portion before the tail). V8 accepts both; the R-19
// taxonomy missed them and the forms fell to the locale arm, which
// staged the VIEWER's calendar — a wrong day west of the designation
// (live-reproduced session 225; see the locale-designated family
// below for the non-ISO shapes).
// Session-226 (R-23, F-226a): the `i` flag — V8 accepts lowercase
// "utc"/"gmt" on the space-separated shape ("2026-11-01 10:00 utc"),
// and the case-sensitive tail let it fall to the locale arm (a zone
// split at the evening hours east of UTC). The designator stays
// REQUIRED — a bare ISO datetime is a LOCAL form, not designated.
const ZONE_DESIGNATED =
  /^(\d{4})-(\d{2})-(\d{2})[Tt ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?\s*(?:[Zz]|UTC|GMT|[+-]\d{2}(?::?\d{2})?)$/i;
// Partial ISO forms (year / year-month): V8 parses them as UTC day 1
// of the written period, but no day was chosen — a skip, never an
// invented day.
const PARTIAL_ISO = /^\d{4}(-\d{2})?$/;
// Session-226 (R-23, F-226a): the designated NAMED tail the rejection
// family carries — the named zones and their compound suffixes ONLY.
// The BARE ±HH:MM offset is deliberately EXCLUDED: a bare-offset tail
// on the numeric partial would make every ISO date ("2026-11-01", read
// as year/11/-01-offset) match the partial rejector and null the most
// common form in the seam. The bare-offset partials ("Nov 2026 +09:00")
// are V8-NaN and null through the locale arm's whole-parse check
// (probed, session 226). The `i` flag: V8 accepts lowercase utc/gmt.
const DESIGNATED_NAMED_TAIL =
  "(?:\\s*(?:[Zz]|(?:UTC|GMT|UT|EST|EDT|CST|CDT|MST|MDT|PST|PDT)(?:\\s*[+-]\\d{1,2}(?::?\\d{2})?)?))?$";
// Session-225 (R-22, F-225a): the NUMERIC year-month partials —
// "2026/11", "2026.11", "2026 11", "2026/1" — the statement-period
// shapes the month-year family's own rationale cites. The hyphen
// partials ride PARTIAL_ISO above; these slash/dot/space twins
// escaped every arm (NUMERIC_LOCALE needs three digit groups) and
// V8's day-1 default staged the invented day. `$`-anchored ON
// PURPOSE (the F-223d lesson inverted): a partial IS a two-group
// form — the three-group "2026/11/01" / "2026 11 01" carry two
// separators and never match. The separator class is NON-LETTER
// (the NUMERIC_LOCALE convention): a named form never rides a
// numeric arm. Session-226 (R-23, F-226a): the designated NAMED
// tail joins (the same DESIGNATED_NAMED_TAIL as the named family —
// "2026/11 UTC" invented day 1 and zone-shifted; the bare offset
// stays excluded for the ISO-date hazard documented above).
const NUMERIC_MONTH_YEAR_PARTIAL = new RegExp(
  `^\\d{4}[^\\dA-Za-z]+\\d{1,2}${DESIGNATED_NAMED_TAIL}`,
  "i",
);
// The 3-group numeric locale forms (the documented US-MDY assumption,
// the YMD-slash shape, and the dotted-MDY read): the rollover guard's
// match arm. The separators are NON-LETTER runs — a letter in the
// separator means a NAMED form, which never rides the numeric guard
// (session-224, F-224a's decode: the old \D+ matched " Nov ", so
// "2026 Nov 15 10:00" matched as a=2026/b=15/c=10 and the widened
// year gate failed a form the guard was never meant to judge).
// Two-digit-year forms skip the guard (V8's remap boundary is
// engine-internal). Session-223 (R-20, F-223d): the anchor is a
// `(?![0-9])` lookahead, not `$` — a trailing TIME ("02/30/2026
// 10:00", the common US bank-datetime shape) must still reach the
// guard, which the `$`-anchored form could not match (the rolled day
// staged silently, live-reproduced TZ-independent).
const NUMERIC_LOCALE = /^(\d{1,4})[^\dA-Za-z]+(\d{1,2})[^\dA-Za-z]+(\d{2,4})(?!\d)/;
// Month-only named forms, forward and reversed, with an optional
// trailing TIME (the F-223d anchor lesson: a bare `$` cannot see
// "Nov 2026 10:00", and a bare lookahead would reject the
// day-carrying "Nov 2026 15" — the tail is TIME-shaped or nothing).
// Session-223 (R-20, F-223e) covered the bare forward form; session
// 224 (R-21, F-224c) completed the family: separators [\s.-], the
// time tail, and the REVERSED twin ("2026 Nov" / "2026-Nov" —
// live-probed, V8 reads 2026-11-01 — no day was chosen in any of
// them; the day-carrying named forms keep staging through the
// locale fallback).
// Session-226 (R-23, F-226a): the family carries DESIGNATED_NAMED_TAIL
// too ("Nov 2026 UTC" — V8 invents day 1 AND the locale arm zone-shifts
// it: 2026-10-31 in New York, live).
const MONTH_YEAR_TIME =
  "(?:\\s+\\d{1,2}:\\d{2}(?::\\d{2})?\\s*(?:[APap][Mm])?)?";
const MONTH_ONLY = new RegExp(
  `^[A-Za-z]{3,9}[\\s.-]+\\d{4}${MONTH_YEAR_TIME}${DESIGNATED_NAMED_TAIL}`,
  "i",
);
const REV_MONTH_ONLY = new RegExp(
  `^\\d{4}[\\s.-]+[A-Za-z]{3,9}${MONTH_YEAR_TIME}${DESIGNATED_NAMED_TAIL}`,
  "i",
);

// Session-225 (R-22, F-225b): the designated-tail completion, the
// locale half. V8 accepts designators the R-19 taxonomy missed — a
// space before the offset and the named UTC/GMT tails — on non-ISO
// shapes too. Those forms fell to the locale fallback below, which
// stages the VIEWER's local calendar (New York read "Nov 1, 2026
// UTC" as 2026-10-31 — a wrong day; "Jan 1, 2026 UTC" as
// 2025-12-31 — a wrong day AND year — while Tokyo staged the written
// day: the identical file imported different books for different
// users, the exact F-222a/b class surviving inside the taxonomy),
// and the 4-digit NUMERIC designated forms null-or-staged by zone
// (the guard converted the shift to a skip west of the designation).
// The doctrine for EVERY designated tail: stage the date the digits
// WROTE — the designator's own wall-clock calendar, never the
// viewer's zone, never a zone-shifted instant. Each arm below
// whole-parses through V8 first (an invalid TIME invalidates the
// string even when the written date is fine — the designated-arm
// parity) and round-trips the written calendar (a rolled date is
// unparseable — the standing doctrine).
// The shared tail — an optional space, then Z/z, UTC/GMT (case-insensitive
// with the family's `i` flag), V8's named zones, or ±HH:MM/±HHMM offsets;
// the named zones take an optional compound ±[H]H[:MM] suffix ("UTC+01:00",
// "GMT+5"). The bare ±HH form stages the written day too — V8 ACCEPTS it
// on these shapes (session 226, F-226n: "Nov 1, 2026 10:00 +09" parses and
// the designated arm stages the written calendar; the old docblock's
// "V8-rejected, so the row skips" claim was false for the locale arms).
// Session-226 (R-23, F-226a): the named-zone set is V8's own empirical
// table (UT/EST/EDT/CST/CDT/MST/MDT/PST/PDT — probe-226-v8); CET/JST/BST/
// AEST and garbage tokens are V8-rejected and null through the whole-parse
// guard. Every tail routes to the written-literal doctrine below.
const DESIGNATED_TAIL =
  "\\s*(?:[Zz]|(?:UTC|GMT|UT|EST|EDT|CST|CDT|MST|MDT|PST|PDT)(?:\\s*[+-]\\d{1,2}(?::?\\d{2})?)?|[+-]\\d{2}(?::?\\d{2})?)";
// The optional TIME before the tail (the MONTH_YEAR_TIME convention), now
// with the meridiem (F-226a: "11:00 PM UTC" previously escaped the family
// and staged the viewer's calendar east of UTC):
const OPT_TIME =
  "(?:\\s+\\d{1,2}:\\d{2}(?::\\d{2})?(?:\\.\\d+)?\\s*(?:[APap][Mm])?)?";
// The optional leading weekday (F-226a: RFC-822 shapes — "Thu, 01 Jan 2026
// 00:00:00 GMT" — previously fell to the locale arm and staged the wrong
// day AND year west of the designation). The full names ride the [A-Za-z]*
// tail ("Sunday, Nov 1, 2026 UTC"); no month name starts with a weekday
// prefix, so the class cannot eat a month.
const OPT_WEEKDAY = "(?:(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)[A-Za-z]*[\\s.,]*)?";
// Month-name → index (case-insensitive; 3–9 letters covers V8's
// accepted set — "Sept" and "September" both included). An unknown
// name is a NaN in V8 — the arms null it.
const MONTH_NAMES: Record<string, number> = {
  jan: 1, january: 1, feb: 2, february: 2, mar: 3, march: 3,
  apr: 4, april: 4, may: 5, jun: 6, june: 6, jul: 7, july: 7,
  aug: 8, august: 8, sep: 9, sept: 9, september: 9,
  oct: 10, october: 10, nov: 11, november: 11, dec: 12, december: 12,
};
// "Nov 1, 2026 UTC" / "Nov 1, 2026 10:00 +09:00" (the comma and the
// name/day separator are optional-form tolerant — "Nov 1 2026",
// "Nov. 1, 2026", and since F-226a the lenient runs "Nov  1, 2026",
// "Nov 1,2026", "Nov 1 , 2026", "Nov.1.2026" all live). The year group is
// two-digit-TOLERANT so the arm CATCHES "Nov 1, 26 UTC" (V8 remaps it —
// the locale arm would stage the viewer's calendar) and the length check
// inside skips it (the remap doctrine, the named half). The `i` flag, the
// weekday prefix, the meridiem, and the widened tail are the F-226a
// escape-family completion (case-insensitive utc/gmt, RFC-822 shapes,
// the named zones, the compound tails).
const NAMED_MDY_DESIGNATED = new RegExp(
  `^${OPT_WEEKDAY}([A-Za-z]{3,9})[^\\dA-Za-z]*(\\d{1,2})[\\s.,]+(\\d{2,4})${OPT_TIME}${DESIGNATED_TAIL}$`,
  "i",
);
// "15 Nov 2026 UTC" — the day-first named twin (V8 parses it; the
// family would be incomplete without it). Two-digit-tolerant year
// group + the length check, as above; the weekday prefix and the
// lenient month-year separator are F-226a ("Thu, 01 Jan 2026 00:00:00
// GMT" — the RFC-822 shape):
const DAY_FIRST_NAMED_DESIGNATED = new RegExp(
  `^${OPT_WEEKDAY}(\\d{1,2})[\\s.-]+([A-Za-z]{3,9})[\\s.,]+(\\d{2,4})${OPT_TIME}${DESIGNATED_TAIL}$`,
  "i",
);
// "11/01/2026 UTC" / "2026/11/01 10:00 -05:00" — the numeric twin,
// three digit groups with NON-LETTER separators (the NUMERIC_LOCALE
// convention), shape-resolved by the a≥1000 convention below (YMD
// reads the year from group a; MDY from group c). Four-digit years
// only — the two-digit-year designated numerics SKIP ("11/01/26
// UTC"): the remap boundary is engine-internal (the standing
// two-digit doctrine), and a visible skip beats a silent wrong day.
// The weekday prefix is F-226a ("Sun 11/01/2026 UTC" — V8 parses it).
const NUMERIC_DESIGNATED = new RegExp(
  `^${OPT_WEEKDAY}(\\d{1,4})[^\\dA-Za-z]+(\\d{1,2})[^\\dA-Za-z]+(\\d{1,4})${OPT_TIME}${DESIGNATED_TAIL}$`,
  "i",
);
// Session-226 (R-23, F-226a): the name-YEAR-day twin — "Nov 2026 15 UTC".
// V8 reads the day AFTER the year on the named month-year shape (the
// F-224c day-carrying family), so with a designated tail the locale arm
// would read the LOCAL calendar of a designated instant — a wrong day
// west of the designation (live: New York staged Nov 14 where 15 was
// written). The arm stages the written calendar like its siblings.
const NAMED_YEAR_DAY_DESIGNATED = new RegExp(
  `^${OPT_WEEKDAY}([A-Za-z]{3,9})[\\s.,]+(\\d{2,4})[\\s.,]+(\\d{1,2})${OPT_TIME}${DESIGNATED_TAIL}$`,
  "i",
);

/** F-225b: stage the WRITTEN calendar — the designator's own
 * wall-clock date — as UTC midnight, round-trip-guarded (a rolled
 * date is unparseable: the round-trip must land on the day the
 * digits wrote). Pure: decision + one construction. */
function stageWrittenLiteral(year: number, month: number, day: number): string | null {
  const d = new Date(Date.UTC(year, month - 1, day));
  return d.getUTCFullYear() === year &&
    d.getUTCMonth() === month - 1 &&
    d.getUTCDate() === day
    ? d.toISOString()
    : null;
}

/** F-222d: the numeric locale rollover guard — a 4-digit-year numeric
 * form must round-trip under the MDY or YMD interpretation of its
 * digits, else it is unparseable (V8's lenient parser rolls 02/30 to
 * Mar 2; the bare branch's guard doctrine extended to the locale
 * arm). Pure: no Date construction, decision only.
 *
 * Session-224 (R-21, F-224a): the year-length gate reads the group
 * that HOLDS the year per shape — pre-cure it read group c
 * unconditionally (the year for MDY, the DAY for YMD), so every
 * YMD-slash rolled date ("2026/02/30" → Mar 2, "2026/02/29" in the
 * non-leap 2026 → Mar 1) skipped the guard and staged silently
 * while the MDY twins nulled — live-reproduced, TZ-independent. */
function localeRollover(
  a: string,
  b: string,
  c: string,
  parsed: Date,
): boolean {
  // The shape decides which group holds the year: YMD (a >= 1000)
  // reads the year from group a; MDY reads it from group c. The
  // guard round-trips only four-digit-year forms — the two-digit-year
  // remap (V8: "26" → 2026, "68" → 1968) is engine-internal and not
  // worth replicating.
  // NB (session 225, F-225n): with `a` captured by \d{1,4}, `a` is
  // ALWAYS exactly 4 digits when ymd is true — so the year-length
  // check below can only fire in the MDY arm. It stays as defense
  // against future regex edits; there is no YMD skip path to hunt.
  const ymd = Number(a) >= 1000;
  const yearGroup = ymd ? a : c;
  if (yearGroup.length !== 4) return true;
  const month = parsed.getMonth() + 1;
  const day = parsed.getDate();
  const year = parsed.getFullYear();
  if (ymd) {
    // YMD shape (2026/11/01): year-month-day.
    return year === Number(a) && month === Number(b) && day === Number(c);
  }
  // MDY shape (11/01/2026, and the dotted-MDY read 01.11.2026 → Jan
  // 11 — the documented ambiguity): month-day-year.
  return month === Number(a) && day === Number(b) && year === Number(c);
}

export function stageCsvDate(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  // Partial ISO forms carry no day — unparseable (F-222c). The
  // numeric year-month partials join them (F-225a): a two-group
  // numeric form chose no day either.
  if (PARTIAL_ISO.test(trimmed)) return null;
  if (NUMERIC_MONTH_YEAR_PARTIAL.test(trimmed)) return null;
  // Month-only named forms carry no day either (F-223e/F-224c) —
  // forward and reversed, time-suffixed or bare.
  if (MONTH_ONLY.test(trimmed) || REV_MONTH_ONLY.test(trimmed)) return null;
  // The literal-staging branches: the bare form and every
  // zone-designated datetime stage the date the digits wrote (the
  // identity; never parsed as an instant, so no zone can shift it).
  const bare = BARE_ISO_DATE.exec(trimmed);
  const designated = bare ? null : ZONE_DESIGNATED.exec(trimmed);
  const literal = bare ?? designated;
  if (literal) {
    // The designated form must still parse as a whole (V8 parity —
    // an invalid TIME invalidates the string even when the written
    // date is fine).
    if (designated && Number.isNaN(new Date(trimmed).getTime())) {
      return null;
    }
    const d = new Date(
      Date.UTC(Number(literal[1]), Number(literal[2]) - 1, Number(literal[3])),
    );
    // A rolled/invalid calendar date (2026-02-30) is unparseable —
    // the round-trip must land on the day the user wrote.
    return d.getUTCFullYear() === Number(literal[1]) &&
      d.getUTCMonth() === Number(literal[2]) - 1 &&
      d.getUTCDate() === Number(literal[3])
      ? d.toISOString()
      : null;
  }
  // Session-225 (R-22, F-225b): the locale designated family — every
  // designated tail stages the date the digits WROTE. Each arm
  // whole-parses through V8 first (an invalid TIME invalidates the
  // string); an unknown month name is V8's NaN and nulls; the
  // numeric arm skips two-digit years (the remap doctrine).
  const namedDesig = NAMED_MDY_DESIGNATED.exec(trimmed);
  if (namedDesig) {
    if (Number.isNaN(new Date(trimmed).getTime())) return null;
    if (namedDesig[3].length !== 4) return null; // two-digit year: the remap doctrine — skip
    const month = MONTH_NAMES[namedDesig[1].toLowerCase()];
    if (!month) return null;
    return stageWrittenLiteral(Number(namedDesig[3]), month, Number(namedDesig[2]));
  }
  const dayFirstDesig = DAY_FIRST_NAMED_DESIGNATED.exec(trimmed);
  if (dayFirstDesig) {
    if (Number.isNaN(new Date(trimmed).getTime())) return null;
    if (dayFirstDesig[3].length !== 4) return null; // two-digit year: the remap doctrine — skip
    const month = MONTH_NAMES[dayFirstDesig[2].toLowerCase()];
    if (!month) return null;
    return stageWrittenLiteral(Number(dayFirstDesig[3]), month, Number(dayFirstDesig[1]));
  }
  const numericDesig = NUMERIC_DESIGNATED.exec(trimmed);
  if (numericDesig) {
    if (Number.isNaN(new Date(trimmed).getTime())) return null;
    const a = numericDesig[1];
    const desigYmd = Number(a) >= 1000;
    const yearGroup = desigYmd ? a : numericDesig[3];
    if (yearGroup.length !== 4) return null;
    const year = Number(yearGroup);
    const month = desigYmd ? Number(numericDesig[2]) : Number(numericDesig[1]);
    const day = desigYmd ? Number(numericDesig[3]) : Number(numericDesig[2]);
    return stageWrittenLiteral(year, month, day);
  }
  // Session-226 (R-23, F-226a): the name-YEAR-day twin — "Nov 2026 15
  // UTC" (V8 reads the day after the year on the named month-year
  // shape; with a designated tail the locale arm would read the LOCAL
  // calendar of the designated instant — a wrong day west of it).
  const namedYearDay = NAMED_YEAR_DAY_DESIGNATED.exec(trimmed);
  if (namedYearDay) {
    if (Number.isNaN(new Date(trimmed).getTime())) return null;
    if (namedYearDay[2].length !== 4) return null; // two-digit year: the remap doctrine — skip
    const month = MONTH_NAMES[namedYearDay[1].toLowerCase()];
    if (!month) return null;
    return stageWrittenLiteral(Number(namedYearDay[2]), month, Number(namedYearDay[3]));
  }
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return null;
  // The locale forms keep the local calendar parts (the F-220m
  // contract) — under the rollover guard for the numeric shapes.
  const numeric = NUMERIC_LOCALE.exec(trimmed);
  if (numeric && !localeRollover(numeric[1], numeric[2], numeric[3], parsed)) {
    return null;
  }
  return new Date(
    Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()),
  ).toISOString();
}
