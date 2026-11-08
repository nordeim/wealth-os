"use client";

// The WealthOS mobile drawer — session-199, the reference's OWN
// construction (live-extracted): a FULL-SCREEN gradient overlay
// (`fixed inset-0 z-40 bg-gradient-to-br from-stone-900 via-stone-800
// to-stone-900`) that opens under the sticky mobile header (z-50) and
// starts its content at pt-20. The reference's drawer is a PLAIN
// conditional render — NOT a modal dialog (no focus trap, no
// aria-hidden isolation: its header's ✕ close stays in the
// accessibility tree). We mirror that construction exactly — a Radix
// Dialog here would aria-hide the mobile header (the e2e-caught defect:
// the ✕ button vanished from the accessibility tree while remaining
// visible on screen).
//
// Kept behavioral supersets:
//  - auto-close when the viewport grows past lg (the sidebar's range),
//  - the MAIN-scroller lock (`main` owns scrolling in the shell model),
//  - the route-change close (AppShell's adjust-during-render),
//  - Escape closes (our own keydown listener — the reference ships none).

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { NAV_ITEMS, isNavActive } from "./nav-config";
import { MOBILE_NAV_LAYOUT, MOBILE_NAV_SHEET } from "@/lib/page-layout";
import { useWealthOs } from "@/stores/wealthos-store";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  // Escape closes (our superset — a plain keydown listener, no modal).
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  // Auto-close when the viewport grows past the lg breakpoint — the
  // query MUST match the sidebar's `lg:flex` show range (1024px).
  React.useEffect(() => {
    if (!open) return;
    const mql = window.matchMedia(MOBILE_NAV_LAYOUT.autoCloseQuery);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) onOpenChange(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [open, onOpenChange]);

  // The MAIN-scroller lock: `main` is the shell's ONLY scroller.
  React.useEffect(() => {
    if (!open) return;
    const scroller = document.querySelector<HTMLElement>("main");
    const prevScrollerOverflow = scroller?.style.overflow ?? "";
    if (scroller) scroller.style.overflow = "hidden";
    return () => {
      if (scroller) scroller.style.overflow = prevScrollerOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className={MOBILE_NAV_SHEET.content} role="dialog" aria-label="WealthOS navigation">
      <DrawerNav onNavigate={() => onOpenChange(false)} />
    </div>
  );
}

function DrawerNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useWealthOs((s) => s.logout);

  const signOut = async () => {
    onNavigate?.();
    await logout();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className={MOBILE_NAV_SHEET.inner}>
      <nav aria-label="Main navigation" className={MOBILE_NAV_SHEET.nav}>
        {NAV_ITEMS.map((item) => {
          const active = isNavActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                active ? MOBILE_NAV_SHEET.linkActive : MOBILE_NAV_SHEET.link,
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60",
              )}
            >
              <item.icon className="w-6 h-6 shrink-0" strokeWidth={2} />
              <span className={MOBILE_NAV_SHEET.label}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className={MOBILE_NAV_SHEET.footer}>
        <button
          type="button"
          className={MOBILE_NAV_SHEET.signOut}
          onClick={() => void signOut()}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
