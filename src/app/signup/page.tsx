import { Suspense } from "react";
import { LoginCard } from "@/components/layout/login-card";
import { LOGIN_LAYOUT } from "@/lib/page-layout";
import { pageMetadata } from "@/lib/site";

// Session-10: the reference has no /signup (404 + a dead login button —
// kept as our working superset). Its title follows the same scheme.
// Session-13 (S13-P1): ABSOLUTE — the string already contains the
// suffix, so the root template doubled it (the "Sign up | <app> | <app>"
// form, decoded against the CRM-era name — session-220, F-220n: the
// stale name retired from the living comment).
// Session-19 (S19-P4/P5): the per-route canonical/OG/Twitter family —
// the reference has no signup to mirror, so this is our superset's own
// self-consistent expression (the factory's unprefixed family + the
// absolute suffixed title the s13 pin freezes).
export const metadata = pageMetadata({ page: null, route: "/signup", title: "Sign up | WealthOS" });

export const dynamic = "force-dynamic";

// Session-67 (N-67f): NO authenticated redirect here either — /login
// dropped its session-read redirect at s23-P2 as an invented scaffold
// pattern (the reference serves the login card to authed visitors too);
// /signup is our documented superset (the reference 404s it), so the
// same pure-render shape applies. The page makes no session read — no
// DB round-trip per visit — and the s43 deferred-ledger "signup-page
// session read" entry closes with it.
export default function SignupPage() {
  return (
    <main className={LOGIN_LAYOUT.page}>
      {/* Session-233 (R-30, F-233h): the boundary the reset-password twin
          already carries — LoginCard reads the search params (the from_url
          round-trip), safe today only because this page is force-dynamic;
          the boundary defuses that coupling (the family-consistency
          form). */}
      <Suspense>
        <LoginCard mode="signup" />
      </Suspense>
    </main>
  );
}
