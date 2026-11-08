// Pure formatting/date helpers (unit-tested seam — tests/format.test.ts).
// Session-199: the WealthOS formatters. The money formatters live in
// finance.ts (formatMoney/formatAxisMoney); this module keeps the
// calendar helpers the pages share.

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfWeek(date: Date, firstDay: "sunday" | "monday" = "sunday"): Date {
  const d = startOfDay(date);
  const day = d.getDay();
  const shift = firstDay === "sunday" ? day : (day + 6) % 7;
  d.setDate(d.getDate() - shift);
  return d;
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function startOfYear(date: Date): Date {
  return new Date(date.getFullYear(), 0, 1);
}

/** `subMonths(now, 3)` with month-end clamping (Mar 31 - 1m = Feb 28). */
export function subMonthsClamped(date: Date, months: number): Date {
  const d = new Date(date);
  const day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() - months);
  const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, daysInMonth));
  return d;
}

/** yyyy-MM-dd for native date inputs. */
export function toDateInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** The Settings date-format vocabulary applied to display dates. */
export function formatDateByPattern(
  date: Date,
  pattern: string,
): string {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();
  switch (pattern) {
    case "dd/MM/yyyy":
      return `${dd}/${mm}/${yyyy}`;
    case "yyyy-MM-dd":
      return `${yyyy}-${mm}-${dd}`;
    case "MMM d, yyyy":
      return `${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}, ${yyyy}`;
    case "MM/dd/yyyy":
    default:
      return `${mm}/${dd}/${yyyy}`;
  }
}
