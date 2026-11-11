// Session-226 design probe (the R-23 F-226a cure — the V8 validation
// doctrine): probe V8's actual parsing of every form the WIDENED
// designated-tail family would route to the written-literal arm. The
// doctrine: every new arm's forms must whole-parse in V8 (the guard
// depends on it), the rolled ones must roll (the round-trip guard), and
// unknown names must NaN (the null path).
import * as path from "node:path";
if (path.basename(process.argv[1]) === "probe-226-v8.ts") {
  const forms: Array<[string, string]> = [
    // Case-insensitive tails
    ["Nov 1, 2026 utc", "lowercase utc"],
    ["Nov 1, 2026 Gmt", "mixed Gmt"],
    ["2026-11-01 10:00 utc", "ISO + lowercase utc"],
    // Leading weekday
    ["Sun, Nov 1, 2026 UTC", "weekday + named MDY"],
    ["Sunday, Nov 1, 2026 UTC", "full weekday"],
    ["Thu, 01 Jan 2026 00:00:00 GMT", "RFC-822 full"],
    ["Fri Nov 1, 2026 UTC", "weekday no comma"],
    // Separator lenience
    ["Nov  1, 2026 UTC", "double space"],
    ["Nov 1,2026 UTC", "comma no space"],
    ["Nov 1 , 2026 UTC", "space before comma"],
    ["Nov.1.2026 UTC", "periods"],
    // Meridiem before designator
    ["Nov 1, 2026 11:00 PM UTC", "PM + UTC"],
    ["Nov 1, 2026 11:00 A.M. UTC", "dotted meridiem (expect NaN?)"],
    ["01 Nov 2026 11:00 PM GMT", "day-first PM"],
    ["11/01/2026 11:00 PM UTC", "numeric PM"],
    ["2026-11-01 11:00 PM +09:00", "ISO-ish PM + offset (expect NaN?)"],
    // V8 named zones
    ["Nov 1, 2026 8:00 PM EST", "EST"],
    ["Nov 1, 2026 8:00 PM EDT", "EDT"],
    ["Nov 1, 2026 8:00 PM CST", "CST"],
    ["Nov 1, 2026 8:00 PM CST+8", "CST+8"],
    ["Nov 1, 2026 8:00 PM CET", "CET"],
    ["Nov 1, 2026 8:00 PM JST", "JST"],
    ["Nov 1, 2026 8:00 PM BST", "BST"],
    ["Nov 1, 2026 8:00 PM AEST", "AEST"],
    ["Nov 1, 2026 8:00 PM UT", "UT"],
    ["Nov 1, 2026 8:00 PM XYZ", "garbage zone (expect NaN)"],
    ["Nov 1, 2026 8:00 PM PST", "PST"],
    // Compound tails
    ["Nov 1, 2026 UTC+01:00", "UTC+01:00"],
    ["Nov 1, 2026 GMT+5", "GMT+5"],
    ["Nov 1, 2026 UTC -05:00", "UTC with space offset"],
    ["Jan 1, 2026 GMT+05:30", "GMT+05:30 year edge"],
    // Rolled (must round-trip-fail → the guard's job)
    ["Nov 31, 2026 UTC", "rolled Nov 31"],
    ["Feb 30, 2026 UTC", "rolled Feb 30"],
    // Two-digit years (skip doctrine)
    ["Nov 1, 26 UTC", "two-digit named"],
    ["11/01/26 UTC", "two-digit numeric"],
    ["01 Nov 26 GMT", "two-digit day-first"],
    // Controls (current behavior must hold)
    ["Nov 1, 2026 10:00 +09", "bare ±HH (stages today)"],
    ["2026-11-01T10:00:00Z", "ISO Z"],
    ["2026-11-01T24:00:00Z", "ISO 24:00 edge"],
  ];
  console.log("form | V8 iso | NaN?");
  for (const [form, label] of forms) {
    const d = new Date(form);
    console.log(
      `${JSON.stringify(form)} (${label}) | ${Number.isNaN(d.getTime()) ? "NaN" : d.toISOString()} | ${Number.isNaN(d.getTime())}`,
    );
  }
  // What does V8 do with a trailing unknown token on a KNOWN form?
  for (const s of ["Nov 1, 2026 UTC garbage", "Nov 1, 2026 26", "Nov 1, 2026 10:00 AM"]) {
    const d = new Date(s);
    console.log(`${JSON.stringify(s)} | ${Number.isNaN(d.getTime()) ? "NaN" : d.toISOString()}`);
  }
}
