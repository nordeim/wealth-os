import { getSessionUser } from "@/lib/auth";
import { AppShell } from "@/components/layout/app-shell";
import { GuestLoginRedirect } from "@/components/layout/guest-login-redirect";
import DashboardPage from "./(app)/dashboard/page";

export const dynamic = "force-dynamic";

// The reference serves the dashboard at `/` for authenticated visitors and
// login-walls guests (live-observed: guest `/` → /login?from_url=…; the
// authed root renders the Financial Dashboard). The session decision is
// SERVER-side; the guest navigation rides the client shim (the reference's
// own from_url mechanism).
export default async function RootDashboardRoute() {
  const user = await getSessionUser();
  if (!user) return <GuestLoginRedirect />;
  return (
    <AppShell user={user}>
      <DashboardPage />
    </AppShell>
  );
}
