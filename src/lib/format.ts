// The date-input bridge — the one live calendar helper (the expense and
// income edit prefill seams). The money formatters live in finance.ts
// (formatMoney/formatAxisMoney); the month/week/year boundary helpers the
// domain math needs live there too (finance.ts carries its own month
// boundary — F-229f: the five unused calendar exports that once
// rode this file retired with their nonexistent-test citation;
// reintroduce WITH a consumer).

/**
 * yyyy-MM-dd for native date inputs.
 *
 * Session-269 (R-66, F-269a): the year pads to four digits. The month
 * and day were always padded, but a stored year-206 row prefilled a
 * three-digit-year string the native input treats as NO value and the
 * boundary rejects on save — the boundary admits the whole year-100
 * and up class, so the bridge must re-emit every year it admits (the
 * F-268a consumer chain's last mile). Current-era consumers are
 * byte-identical: a four-digit year pads to itself.
 */
export function toDateInputValue(date: Date): string {
  const y = String(date.getFullYear()).padStart(4, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
