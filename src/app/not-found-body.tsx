"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { NOT_FOUND_LAYOUT } from "@/lib/page-layout";

/**
 * Client body of the custom 404 (session-12 S12-P2) — the reference's
 * message interpolates the unmatched PATHNAME inside a font-medium
 * slate-700 span, which only a client component can read. Structure
 * (VLM round-1 + DOM-verified): space-y-6 center with THREE children —
 * the space-y-2 heading group (404 + the 2px×64px slate-200 divider
 * bar), the space-y-3 text group (Page Not Found + message), and the
 * pt-6 button group (Go Home).
 *
 * Session-194 (D-194a1): the reference interpolates its router path
 * WITHOUT the leading slash — `The page "x" could not be found…` (the
 * walk67 maiden decode: the span 604,459 103x19 on the reference vs
 * our verbatim-usePathname form 601,459 108x19). Next's usePathname()
 * carries the leading slash, so the interpolation strips it:
 * pathname.replace(/^\//, "") (the deep-path form "/a/b" → "a/b"
 * matches the reference's router path on both).
 *
 * Session-194 (D-194a2): the Go Home arm is a <Link href="/"> — an
 * ANCHOR, the WCAG-correct link semantics for a navigation affordance
 * (role=link, the href affordances: right-click, cmd-click, AT
 * announcements). The reference renders a <button> with NO href (its
 * SPA JS-router idiom) — its own platform gap, the D-112a2
 * a11y-superset doctrine's next member, never mirrored. Every VISIBLE
 * layer byte-equal (the walk67 decode: box 658,556 123x38 · color ·
 * bg · border · radius · font · padding identical two-app), and the
 * rides byte-equal (both land at the landing "/").
 *
 * Session-194 (D-194a3): the Go Home glyph is the reference's
 * HEROICONS home outline inlined verbatim — exactly ONE path, NO
 * stroke-width attr (computed weight 1 — the reference's visibly
 * lighter stroke the walk decoded against lucide's weight-2 default),
 * NO width/height attrs, the bare w-4 h-4 mr-2 class. The M-82c2
 * icon-identity family's first CROSS-LIBRARY member (the D-186a1
 * pen-cure precedent — the reference's exact glyph restored); the
 * lucide `house` import retires at this one site (the reference's 404
 * view is its platform template's own origin — the one non-lucide
 * icon family in its tree). OUR aria-hidden stays (the s19 superset
 * family — the reference's svg carries none, its own a11y gap).
 */
export function NotFoundBody() {
  const pathname = usePathname();
  return (
    <main className={NOT_FOUND_LAYOUT.page}>
      <div className={NOT_FOUND_LAYOUT.card}>
        <div className={NOT_FOUND_LAYOUT.center}>
          <div className={NOT_FOUND_LAYOUT.headingGroup}>
            <h1 className={NOT_FOUND_LAYOUT.h1}>404</h1>
            <div className={NOT_FOUND_LAYOUT.divider} aria-hidden="true" />
          </div>
          <div className={NOT_FOUND_LAYOUT.textGroup}>
            <h2 className={NOT_FOUND_LAYOUT.h2}>Page Not Found</h2>
            <p className={NOT_FOUND_LAYOUT.p}>
              The page{" "}
              <span className={NOT_FOUND_LAYOUT.pathSpan}>&quot;{pathname.replace(/^\//, "")}&quot;</span> could not be
              found in this application.
            </p>
          </div>
          <div className={NOT_FOUND_LAYOUT.buttonGroup}>
            <Link href={NOT_FOUND_LAYOUT.homeHref} className={NOT_FOUND_LAYOUT.homeButton}>
              <svg
                className={NOT_FOUND_LAYOUT.homeIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
