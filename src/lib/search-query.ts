/**
 * Session-224 (R-21, F-224j): the search query seam. Prisma's
 * `contains` compiles to SQLite LIKE without escaping, so a literal
 * `%` or `_` in the query acted as a WILDCARD — q="%" matched the
 * first rows of every family (over-broad, never injection: the
 * parameterization holds). A finance search box never means a
 * wildcard, so the seam strips the LIKE metacharacters and every
 * query is a literal substring search. (SQLite LIKE has no default
 * ESCAPE clause and Prisma does not expose one — stripping is the
 * honest available literal-ization.)
 */
export function sanitizeSearchQuery(q: string): string {
  return q.replace(/[%_]/g, "");
}
