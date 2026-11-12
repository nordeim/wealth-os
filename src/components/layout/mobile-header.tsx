"use client";

// The WealthOS mobile header — session-199, re-pinned session-207
// (F-207a/b): the sticky lg:hidden bar (z-50, above the z-40 drawer)
// carrying the brand, the theme (moon) toggle and the hamburger — with
// the ✓→wifi Synced pill in the RIGHT cluster beside them (the
// reference's own placement, always visible at 390 — the pill's old
// form rode a phantom sub-sm breakpoint Tailwind v4 never defines,
// which hid it below the small viewport; the F-207a cure retired the
// construction). When the drawer is open the
// hamburger renders as the ✕ close face (the reference's own behavior
// — the header stays visible above the full-screen drawer).

import * as React from "react";
import { Menu, Moon, Sun, Wifi, X, DollarSign } from "lucide-react";
import { MOBILE_HEADER } from "@/lib/page-layout";
import { useIsDark, useTheme } from "./theme";

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
            <DollarSign className="h-5 w-5 text-stone-900" strokeWidth={2.5} />
          </div>
          <span className={MOBILE_HEADER.brandWordmark}>WealthOS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={MOBILE_HEADER.syncedPill}>
            <Wifi className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
            Synced
          </span>
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
            // Session-232 (R-29, F-232d): the trigger↔drawer programmatic
            // association — the expenses-filters precedent (aria-expanded
            // AND aria-controls; the id rides the conditionally-mounted
            // sheet, a benign dangling reference while closed).
            aria-controls="mobile-nav-drawer"
          >
            {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
