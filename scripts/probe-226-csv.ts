// Session-226 verification probe: re-verify the Pass-A audit's csv escape-family
// claims (F-226 candidates) under TZ switching, plus the controls that must
// stay correct. Direct execution guard (the F-210c doctrine):
import path from "node:path";
if (path.basename(process.argv[1]) === "probe-226-csv.ts") {
  const { stageCsvDate } = await import("../src/lib/csv");
  const zones = ["UTC", "America/New_York", "Asia/Tokyo"];
  const forms = [
    // The audit's claimed ESCAPE families (claimed: wrong day in some zone)
    ["Nov 1, 2026 utc", "case-insensitive utc"],
    ["Thu, 01 Jan 2026 00:00:00 GMT", "RFC-822 weekday prefix"],
    ["Nov  1, 2026 UTC", "double space"],
    ["Nov 1, 2026 11:00 PM UTC", "meridiem before designator"],
    ["Nov 1, 2026 8:00 PM EST", "V8 named zone EST"],
    ["Dec 31, 2026 8:00 PM EST", "named zone year boundary"],
    ["Nov 1, 2026 UTC+01:00", "compound tail"],
    // Controls (must stay: written-day staging)
    ["Nov 1, 2026 UTC", "control: named MDY UTC"],
    ["Jan 1, 2026 GMT", "control: year-boundary GMT"],
    ["2026-11-01 10:00 +09:00", "control: ISO + offset"],
    ["11/01/2026 UTC", "control: numeric MDY UTC"],
    ["01 Nov 2026 UTC", "control: day-first named"],
    // Documented residuals
    ["02/30/26", "residual: two-digit rolled"],
  ];
  const results: Array<[string, string, Array<string | null>]> = [];
  for (const [form, label] of forms) {
    const staged = zones.map((z) => {
      process.env.TZ = z;
      const v = stageCsvDate(form);
      return v === null ? null : v.slice(0, 10);
    });
    results.push([form, label, staged]);
  }
  process.env.TZ = "UTC";
  const written = (s: string): string => {
    // The WRITTEN calendar date of the form's own digits
    if (s.startsWith("Nov 1, 2026") || s.startsWith("2026-11-01") || s.startsWith("11/01/2026") || s.startsWith("01 Nov 2026") || s.startsWith("Nov  1, 2026")) return "2026-11-01";
    if (s.startsWith("Jan 1, 2026") || s.startsWith("Thu, 01 Jan 2026")) return "2026-01-01";
    if (s.startsWith("Dec 31, 2026")) return "2026-12-31";
    return "";
  };
  console.log("form | label | UTC | NY | Tokyo | verdict");
  for (const [form, label, staged] of results) {
    const expect = written(form);
    const verdict = staged.map((v) => {
      if (v === null) return "SKIP";
      if (expect && v !== expect) return `WRONG(want ${expect})`;
      return "ok";
    });
    console.log(`${JSON.stringify(form)} | ${label} | ${staged.join(" | ")} | ${verdict.join(",")}`);
  }
}
