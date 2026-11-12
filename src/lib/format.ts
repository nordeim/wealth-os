// The date-input bridge — the one live calendar helper (the expense and
// income edit prefill seams). The money formatters live in finance.ts
// (formatMoney/formatAxisMoney); the month/week/year boundary helpers the
// domain math needs live there too (finance.ts carries its own month
// boundary — F-229f: the five unused calendar exports that once
// rode this file retired with their nonexistent-test citation;
// reintroduce WITH a consumer).

/** yyyy-MM-dd for native date inputs. */
export function toDateInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
