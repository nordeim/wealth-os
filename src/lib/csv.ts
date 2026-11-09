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
