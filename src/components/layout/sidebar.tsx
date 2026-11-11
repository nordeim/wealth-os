"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DollarSign, LogOut, Moon, Wifi } from "lucide-react";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from "@/components/ui/dropdown";
import { NAV_ITEMS, isNavActive } from "./nav-config";
import { NAV_LAYOUT } from "@/lib/page-layout";
import { avatarTextColor } from "@/components/ui/avatar"; // F-218n: the luminance seam
import { useTheme } from "./theme";
import { useWealthOs } from "@/stores/wealthos-store";
import { cn } from "@/lib/utils";
import type { User } from "@/types";

/**
 * The desktop sidebar — the reference's construction (live-extracted
 * class strings ride NAV_LAYOUT): the amber-bordered brand block, the
 * gradient nav with the amber→emerald active chip, and the footer's
 * ✓ Synced pill + user row. The user row opens the dropdown whose two
 * items are the reference's own: Dark Mode and Sign Out.
 */
export function Sidebar({ user }: { user: User }) {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col">
      <div className={NAV_LAYOUT.container}>
        <BrandMark />
        <SidebarNav />
        <SidebarFooter user={user} />
      </div>
    </aside>
  );
}

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={NAV_LAYOUT.brand}>
      <div className="flex items-center gap-3">
        <div className={NAV_LAYOUT.brandLogo} aria-hidden="true">
          <DollarSign className="h-5 w-5 text-stone-900" strokeWidth={2.5} />
        </div>
        {!compact && (
          <div>
            <h2 className={NAV_LAYOUT.brandWordmark}>WealthOS</h2>
            <p className={NAV_LAYOUT.brandTagline}>Premium Finance Suite</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation" className={NAV_LAYOUT.nav}>
      {NAV_ITEMS.map((item) => {
        const active = isNavActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              active ? NAV_LAYOUT.linkActive : NAV_LAYOUT.link,
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60",
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" strokeWidth={2} />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarFooter({ user }: { user: User }) {
  const logout = useWealthOs((s) => s.logout);
  const router = useRouter();
  const { toggle } = useTheme();
  const initial = (user.name || user.email).charAt(0).toUpperCase();

  const signOut = async () => {
    // Session-224 (R-21, F-224e): navigate only on a completed
    // sign-out — a failed POST leaves the session honest (the
    // store-error banner carries the failure).
    if (!(await logout())) return;
    router.push("/login");
    router.refresh();
  };

  return (
    <div className={NAV_LAYOUT.footer}>
      {/* The Synced status pill (session-207, F-207h; session-223,
          F-223f): the reference's badge genus — rounded-md, semibold,
          green + the wifi glyph. The SIDEBAR's gradient is near-black
          in both themes, so NAV_LAYOUT.syncedPill carries the
          dark-surface pairing (green-400/green-600) unconditionally
          here — the MOBILE twin keeps its light/dark arms. */}
      <div className="flex">
        <span className={NAV_LAYOUT.syncedPill}>
          <Wifi className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
          Synced
        </span>
      </div>

      <Menu>
        <MenuTrigger
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors",
            "hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60",
          )}
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
            style={{ backgroundColor: user.avatarColor || "#fbbf24", color: avatarTextColor(user.avatarColor || "#fbbf24") }} /* F-218n: the ink derives from the fill */
            aria-hidden="true"
          >
            {initial}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-stone-100">
              {user.name}
            </span>
            <span className="block truncate text-xs text-stone-400">{user.email}</span>
          </span>
        </MenuTrigger>
        <MenuContent align="start" side="top" className="w-52">
          <MenuItem onSelect={() => toggle()} className="gap-2">
            <Moon className="h-4 w-4" />
            Dark Mode
          </MenuItem>
          <MenuItem
            // Session-223 (R-20, F-223a): the navigating helper, not the
            // bare store logout — logout() alone clears the store to
            // hydrated:false/loading:true and nothing re-renders the
            // server layout, dead-ending on the loading gate.
            onSelect={() => void signOut()}
            className="gap-2 text-red-600 focus:text-red-600 dark:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </MenuItem>
        </MenuContent>
      </Menu>
    </div>
  );
}
