import { NotFoundBody } from "./not-found-body";

export default function NotFound() {

// Session-12 (S12-P2): the reference's custom 404 — a designed slate-family
// surface (NOT the stock Next.js built-in): centered on bg-slate-50 with a
// font-light "404" display heading, "Page Not Found", the quoted-pathname
// message and a white bordered Go Home pill that navigates to `/`. No app
// shell (the reference renders it bare — live-verified at both contexts).
// The pathname interpolation lives in the client body (usePathname).
//
// Session-194 (D-194a4): the s12 ABSOLUTE title
// ("This Page Does Not Exist | <app>") is a PRE-DRIFT decode — the
// reference's CURRENT build (bundle 46bc2d9c, live-verified at both
// contexts, 3s settles) ships the bare app name on its 404, and the
// title machinery is byte-equal on every real route (both ship the bare
// name on /dashboard — the s10 pins stand; the section form on the
// inner routes). The metadata export RETIRES: the root layout's
// title.default renders, byte-equal two-app. (Decoded against the
// CRM-era reference name; the WealthOS family serves "WealthOS" —
// session-220, F-220n: the stale name retired from the living comment.)
//
// Session-194 (D-194a5): the 404 is SESSION-INDEPENDENT by design — no
// session resolution, no redirect. The reference's auth-first client-router
// guard redirects anon unknown-routes to /login?from_url=<absolute-url>
// (its designed 404 appears only PAST the guard; its SPA never ships a
// real HTTP 404 status at all — 200 everywhere). OURS adjudicates
// routability first: known guarded routes → the wall; unknown routes →
// the designed 404 with the true 404 status, for anon and authenticated
// visitors alike. The reference's posture is its SPA platform artifact
// (the s149 family) — never mirrored.
  return <NotFoundBody />;
}
