"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";
import { MobileHeader } from "./mobile-header";
import { GuestLoginRedirect } from "@/components/layout/guest-login-redirect";
import { useWealthOs } from "@/stores/wealthos-store";
import { APP_FOOTER, SHELL_LAYOUT } from "@/lib/page-layout";
import { LoadingBlock } from "@/components/shared/page-parts";
import type { User as AppUser } from "@/types";

/**
 * App chrome — the WealthOS shell: an `flex h-screen` row holds the
 * dark sidebar as an in-flow flex child (visible from lg) and a
 * `flex-1 … overflow-hidden` main column whose `main` is the ONLY
 * scroller. Below lg the sticky mobile header + the full-screen
 * gradient drawer own navigation. Kept supersets: resize-past-lg
 * auto-close, the main-scroller lock, the route-change close.
 */
export function AppShell({ user, children }: { user: AppUser; children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const hydrate = useWealthOs((s) => s.hydrate);
  // Session-216 (R-13, F-216c/d): the loading gate + the error face —
  // the store tracked both since birth; no page ever rendered them.
  const loading = useWealthOs((s) => s.loading);
  const hydrated = useWealthOs((s) => s.hydrated);
  const storeError = useWealthOs((s) => s.error);
  // Session-236 (R-33, F-236f): the store's OWN user — the server-prop
  // user stays valid for the chrome, but a hydrate that answers
  // UNAUTHORIZED (a tokenVersion bumped in another tab, or the 7-day
  // TTL crossed between the server layout's pass and the client fetch)
  // nulls it. The gate below re-establishes the login wall client-side
  // instead of rendering an empty workspace.
  const storeUser = useWealthOs((s) => s.user);

  // Close the drawer on navigation — adjust-during-render for this
  // component's OWN state (the sanctioned React pattern; non-link
  // navigations like browser back also land here).
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (mobileNavOpen) setMobileNavOpen(false);
  }

  // One-time bootstrap of the client store from the session cookie.
  React.useEffect(() => {
    void hydrate();
  }, [hydrate]);

  // Session-236 (R-33, F-236f): the mid-flight revocation face. The
  // (app) layout's server gate PASSED (the cookie was valid at request
  // time); the client hydrate answered UNAUTHORIZED — pre-cure the
  // `!hydrated || loading` gate fell through to children with EMPTY
  // slices (a $0 dashboard, the stale sidebar, no explanation). The
  // guest-wall face re-establishes the login wall client-side with
  // the from_url round-trip. The logout path is clear by construction:
  // it resets hydrated/loading, so the loading gate owns it.
  // Session-237 (R-34, F-237a): the auth-specific discriminator. The
  // store's non-401 failure branch ALSO leaves user at its initial
  // null on a first load — keying on storeUser alone swallowed the
  // error face (a 500/503/network hydrate bounced a valid-session
  // user to this wall with the banner + Try-again unreachable). The
  // 401 branch commits error-null alongside user-null; the failure
  // branch commits the error — so !storeError fires the wall ONLY
  // for the revocation, and the failure face keeps the F-216c/d
  // banner. The mid-session window joins through refreshAll's own
  // UNAUTHORIZED branch (it nulls the user the same way).
  if (hydrated && !loading && storeUser === null && !storeError) {
    return <GuestLoginRedirect />;
  }

  return (
    <div className={SHELL_LAYOUT.root}>
      {/* Session-224 (R-21, F-224s): the skip-to-content bypass
        (WCAG 2.4.1) — visually hidden until focus, FIRST in the
        tab order (before the sidebar's ~10 controls), jumping to
        the main scroller. Outside <main> on purpose: the interior
        census is main-scoped and the pixel sweeps never see an
        sr-only element.
        Session-225 (R-22, F-225d): the focused link rises ABOVE the
        header layer (the 60-level reveal over the 50-level
        header/drawer/dialog family, under the toasts) — the F-224s reveal painted the
        pill exactly where the sticky mobile header sits, and the
        equal z-50 + later-DOM header won the paint order: the
        focused link was invisible below lg (keyboard users at phone
        widths; the 1280-only leg and axe could not see it). */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-stone-900"
      >
        Skip to main content
      </a>
      {/* Session-232 (R-29, F-232e): the ALWAYS-MOUNTED loading live
          region — the F-218h genus. A live region that ARRIVES with its
          content is not announced: the pre-cure LoadingBlock mounted
          its role=status div exactly when the loading flip hit (the
          mid-session "Try again" path re-entered hydrate() and the
          region mounted fresh, silent for SR users). The region now
          pre-exists in the a11y tree, empty when idle, and the label
          swaps in on the flip. Placement: OUTSIDE main, mirroring the
          toast viewport — the interior census fingerprints
          main.querySelectorAll("*"), so a region inside main would
          shift the element census and trip the drift gate. The visible
          LoadingBlock below is the sighted-user surface only. */}
      <div role="status" aria-live="polite" className="sr-only">
        {!hydrated || loading ? "Loading your workspace…" : ""}
      </div>
      {/* Desktop sidebar — in-flow flex child, visible from lg. */}
      <Sidebar user={user} />

      {/* Mobile drawer (< lg) — the reference's full-screen gradient. */}
      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />

      {/* Main column: mobile header (below lg) + main scroller. Pages
          own their padding — no blanket wrapper. */}
      <div className={SHELL_LAYOUT.mainColumn}>
        <MobileHeader
          drawerOpen={mobileNavOpen}
          onDrawerOpenChange={setMobileNavOpen}
        />
        <main id="main-content" tabIndex={-1} className={SHELL_LAYOUT.main}>
          {storeError ? (
            <div
              role="alert"
              className="mx-auto mt-4 flex max-w-2xl flex-col gap-2 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/40"
            >
              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                Couldn't load your data — {storeError}
              </p>
              <button
                type="button"
                onClick={() => void hydrate()}
                disabled={loading}
                className="self-start rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-800 transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-60 dark:border-red-800 dark:text-red-200 dark:hover:bg-red-900/40"
              >
                Try again
              </button>
            </div>
          ) : null}
          {!hydrated || loading ? (
            <LoadingBlock label="Loading your workspace…" />
          ) : (
            children
          )}
          <footer className={APP_FOOTER.footer}>
            <span>{APP_FOOTER.copyright}</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
