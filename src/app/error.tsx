"use client";

// The route-segment error boundary (session-170, WP-4 — the scandihaven
// port, the s169-deferred "new visual surface" rotation). An uncaught
// error in ANY page below the root layout unwinds here: the root layout
// (html/body/fonts) stays alive around this card, so the surface keeps
// the house chrome. The stale-chunk self-heal rides the useEffect — a
// redeployed build's hashed chunks heal with one guarded reload before
// the user ever reads the card; every OTHER error is a real bug and the
// card is the honest surface (the digest is the operator's correlation
// handle — Next attaches it server-side and in the logs).
//
// The styling mirrors the reference's own 404 family (the slate
// centered card + divider + the bordered pill — the NOT_FOUND_LAYOUT
// idiom): the boundary is a SUPERSET surface (the reference ships
// none), so it speaks the house dialect the 404 already established.
//
// Deliberately imports NOTHING from the component tree beyond the
// recovery seam — a resilience surface must not depend on the tree that
// might be broken.

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { reloadOnStaleChunk } from "@/lib/chunk-recovery";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reloadOnStaleChunk(error);
  }, [error]);

  return (
    // Session-222 (R-19, F-222f): the dark arms — the theme seam resolves
    // DARK for any non-auth path with no stored choice, so a fresh dark
    // visitor's error card rendered light under html.dark (the NOT_FOUND
    // twin; the reference's SPA serves these faces inside the dark shell).
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-[#0a0a0a]">
      <div className="max-w-md w-full">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-light text-slate-500 dark:text-stone-400">Something went wrong</h1>
            <div className="h-0.5 w-16 bg-slate-200 mx-auto dark:bg-stone-800" aria-hidden="true" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-medium text-slate-800 dark:text-stone-100">An unexpected error occurred</h2>
            <p className="text-slate-600 dark:text-stone-400 leading-relaxed">
              We have logged the issue{error.digest ? ` (ref: ${error.digest})` : ""}. Please
              try again.
            </p>
          </div>
          <div className="pt-6">
            <button
              type="button"
              onClick={reset}
              // Session-223 (R-20, F-223b): no dark ink arm — bg-primary
              // (amber #f59e0b) does not flip in .dark, so the R-19
              // round's stone-50 dark arm painted 2.06:1 ink on the
              // unflipped fill (the light arm computes 8.14:1). The
              // F-219a genus: stone-900 on amber in both modes, like
              // every other amber CTA in the tree.
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-stone-900 bg-primary rounded-lg hover:bg-primary-hover transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
            >
              <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
