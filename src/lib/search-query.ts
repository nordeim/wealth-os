/**
 * Session-224 (R-21, F-224j): the search query seam. Prisma's
 * `contains` compiles to SQLite LIKE without escaping, so a literal
 * `%` or `_` in the query acted as a WILDCARD — q="%" matched the
 * first rows of every family (over-broad, never injection: the
 * parameterization holds). A finance search box never means a
 * wildcard, so the seam strips the LIKE metacharacters: every
 * METACHARACTER-FREE query is a literal substring search.
 * (SQLite LIKE has no default ESCAPE clause and Prisma does not
 * expose one — stripping is the honest available literal-ization.)
 * Session-225 (R-22, F-225f): the delivered truth, stated —
 * metacharacter-bearing queries are stripped, a documented
 * UNDER-INCLUSION: "net_salary" becomes "netsalary", which does NOT
 * match a stored "net_salary" (substring absent) — a silent miss for
 * underscore/percent-bearing terms (plausible in imported bank
 * labels). Deliberate, unit-pinned; the literal-preserving
 * alternative ($queryRaw + ESCAPE) was considered and declined this
 * round — revisit only if literal fidelity is ever wanted.
 */
export function sanitizeSearchQuery(q: string): string {
  return q.replace(/[%_]/g, "");
}
