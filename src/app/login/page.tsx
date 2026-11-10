import { LoginCard } from "@/components/layout/login-card";
import { LOGIN_LAYOUT } from "@/lib/page-layout";
import { pageMetadata } from "@/lib/site";

// Session-10 (S10-10): the reference's login page title is the plain
// app name (document.title probe) — not "Sign in | <app>". (The
// sessions below were decoded against the CRM-era reference name;
// the WealthOS family serves the same shapes with "WealthOS" —
// session-220, F-220n: the stale name retired from the living comment.)
// Session-13 (S13-P1): the title must be ABSOLUTE — a relative string
// rides the root layout's "%s | <app>" template and SSRs the DOUBLED
// "<app> | <app>" (curl-verified; same bug class as the s12 404).
// Session-19 (S19-P4/P5): the reference ships the UNPREFIXED metadata
// family on /login too — the plain 405-char description,
// og:url/twitter:url + canonical at origin/login — built through the
// pageMetadata() factory (page: null = the unprefixed family; the
// factory keeps the ABSOLUTE title).
export const metadata = pageMetadata({ page: null, route: "/login" });

export const dynamic = "force-dynamic";

// Session-23 (S23-P2): NO authenticated redirect here. The reference
// serves the login card to AUTHENTICATED visitors too (live-verified:
// its /login renders the card with the session cookie present, and an
// authed wrong-password attempt draws the error banner on the card) —
// our `if (user) redirect("/")` was an invented scaffold pattern, never
// a reference behavior. The page stays force-dynamic (the reference
// serves /login dynamically; the s19 metadata family is
// runtime-stable either way).
export default function LoginPage() {
  return (
    <main className={LOGIN_LAYOUT.page}>
      <LoginCard />
    </main>
  );
}
