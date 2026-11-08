"use client";

// The WealthOS mobile header — session-199: the sticky lg:hidden bar
// (z-50, above the z-40 drawer) carrying the brand, the ✓ Synced pill,
// the theme (moon) toggle and the hamburger. When the drawer is open
// the hamburger renders as the ✕ close face (the reference's own
// behavior — the header stays visible above the full-screen drawer).

import * as React from "react";
import { Check, Menu, Moon, Sun, X, DollarSign } from "lucide-react";
import { MOBILE_HEADER } from "@/lib/page-layout";
import { useIsDark, useTheme } from "./theme";
import { cn } from "@/lib/utils";

export function MobileHeader({
  drawerOpen,
  onDrawerOpenChange,
}: {
  drawerOpen: boolean;
  onDrawerOpenChange: (open: boolean) => void;
}) {
  const { toggle } = useTheme();
  const isDark = useIsDark();

  return (
    <header className={MOBILE_HEADER.root}>
      <div className={MOBILE_HEADER.inner}>
        <div className={MOBILE_HEADER.brandRow}>
          <div className={MOBILE_HEADER.brandLogo} aria-hidden="true">
            <DollarSign className="h-4.5 w-4.5 h-5 w-5 text-stone-900" strokeWidth={2.5} />
          </div>
          <span className={MOBILE_HEADER.brandWordmark}>WealthOS</span>
          <span className={cn(MOBILE_HEADER.syncedPill, "hidden xs:inline-flex sm:inline-flex")}>
            <Check className="h-3 w-3" strokeWidth={3} />
            Synced
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={MOBILE_HEADER.iconButton}
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            className={MOBILE_HEADER.iconButton}
            onClick={() => onDrawerOpenChange(!drawerOpen)}
            aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={drawerOpen}
          >
            {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
