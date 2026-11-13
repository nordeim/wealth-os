"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

// Session-147 (F-147c2 — the guest re-gating): the reference's new bundle
// LOGIN-WALLS its marketing pages (walk37: guest /About → 200 HTML, then
// a CLIENT-side guard redirect to /login?from_url=<absolute-url>; its
// post-login returns to the from_url target). This shim is that guard,
// mirrored: the LAYOUT makes the session decision SERVER-side (a guest
// never receives the page's HTML — the shim renders instead of the
// shell + children), and the navigation itself rides the client, the
// reference's own mechanism. The (app) group's old server 307 retired
// with it: the from_url round-trip needs the current URL, which a
// server layout cannot know (headers() carries no path — probed live
// this session), and the reference's own guard is client-side anyway.
//
// Session-235 (R-32, F-235j): the shim used to render NOTHING between
// paint and redirect — a blank, silent page for unauthenticated
// deep-link visits. The status face below fills the window (sighted
// visitors see where they are going).
// Session-237 (R-34, F-237h): the F-218h genus' fifth surface — a
// live region that ARRIVES with its content is not announced, and
// this face mounted exactly that way. The F-235a form seeds the
// label through a zero-delay timer: the region commits empty and
// the text lands as a content change (announced), with the cleanup
// pair cancelling the StrictMode double-invoke.
export function GuestLoginRedirect() {
  const router = useRouter();
  const [seeded, setSeeded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setSeeded(true), 0);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    // location.href (the ABSOLUTE URL, query included) — the reference's
    // own from_url form, urlencoded exactly like its guard
    router.replace(`/login?from_url=${encodeURIComponent(window.location.href)}`);
  }, [router]);

  return (
    <div
      role="status"
      className="flex min-h-screen items-center justify-center bg-background"
    >
      {seeded ? (
        <p className="text-sm text-muted">Redirecting to sign in…</p>
      ) : null}
    </div>
  );
}
