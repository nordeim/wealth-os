"use client";

// The ROOT error boundary (session-170, WP-4 — the scandihaven port).
// global-error replaces the root layout entirely when the layout itself
// fails — so it must render its own <html lang="en"> + <body> AND import
// ./globals.css itself: a crashed root layout never loaded the global
// stylesheet, and the Tailwind classes below would otherwise render as
// bare prose (the Next docs' own caveat — the import is the robust
// form; it is deduplicated when the stylesheet is already loaded).
//
// Same contract as the segment boundary (src/app/error.tsx): the
// stale-chunk self-heal in useEffect, the digest correlation handle,
// the reset() affordance, and ZERO component-tree imports — the root
// failure must not stand on the tree that broke.

import "./globals.css";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { reloadOnStaleChunk } from "@/lib/chunk-recovery";

export default function GlobalError({
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
    <html lang="en">
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-md w-full">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-light text-slate-500">Something went wrong</h1>
                <div className="h-0.5 w-16 bg-slate-200 mx-auto" aria-hidden="true" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-medium text-slate-800">
                  An unexpected error occurred
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  We have logged the issue{error.digest ? ` (ref: ${error.digest})` : ""}.
                  Please try again.
                </p>
              </div>
              <div className="pt-6">
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-stone-900 bg-primary rounded-lg hover:bg-primary-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
