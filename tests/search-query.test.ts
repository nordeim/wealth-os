import { describe, expect, it } from "vitest";
import { sanitizeSearchQuery } from "@/lib/search-query";

// Session-224 (R-21, F-224j): the search LIKE-metacharacter seam.
// Prisma's `contains` compiles to SQLite LIKE without escaping, so a
// literal "%" or "_" in the query acted as a WILDCARD — q="%" matched
// the first 5 rows of every family (over-broad, not injection — the
// parameterization holds). A finance search box never means a
// wildcard: the seam strips the LIKE metacharacters so every query
// is a literal substring search.
describe("sanitizeSearchQuery (F-224j)", () => {
  it("strips the LIKE metacharacters from a wildcard-only query", () => {
    expect(sanitizeSearchQuery("%")).toBe("");
    expect(sanitizeSearchQuery("_")).toBe("");
    expect(sanitizeSearchQuery("%_%")).toBe("");
  });

  it("keeps the literal text around the metacharacters", () => {
    expect(sanitizeSearchQuery("100%")).toBe("100");
    expect(sanitizeSearchQuery("net_salary")).toBe("netsalary");
    expect(sanitizeSearchQuery("café rent")).toBe("café rent");
  });

  it("leaves an ordinary query untouched", () => {
    expect(sanitizeSearchQuery("amazon")).toBe("amazon");
    expect(sanitizeSearchQuery("Rent 2026")).toBe("Rent 2026");
  });
});
