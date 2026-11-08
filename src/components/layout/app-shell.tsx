"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";
import { MobileHeader } from "./mobile-header";
import { useWealthOs } from "@/stores/wealthos-store";
import { APP_FOOTER, SHELL_LAYOUT } from "@/lib/page-layout";
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

  return (
    <div className={SHELL_LAYOUT.root}>
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
          <main className={SHELL_LAYOUT.main}>
            {children}
            <footer className={APP_FOOTER.footer}>
              <span>{APP_FOOTER.copyright}</span>
            </footer>
          </main>
        </div>
      </div>
  );
}
