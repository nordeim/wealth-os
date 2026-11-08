import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Landmark,
  Wallet,
  Download,
  PieChart,
  Target,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

/**
 * Main nav — the reference app's sidebar order + glyphs, live-extracted
 * from its DOM (session-199 walk): Dashboard (layout-dashboard), Income
 * (trending-up), Expenses (trending-down), Accounts (landmark — the
 * 4-line + gable-path bank glyph), Investments (wallet), Import
 * (download), Analytics (pie-chart), Goals (target), Settings (gear).
 * All nine ride ONE nav group; the sidebar footer carries the Synced
 * pill + the user row (the reference's own construction).
 */
export const NAV_ITEMS: NavItem[] = [
  { href: "/Dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/Income", label: "Income", icon: TrendingUp },
  { href: "/Expenses", label: "Expenses", icon: TrendingDown },
  { href: "/Accounts", label: "Accounts", icon: Landmark },
  { href: "/Investments", label: "Investments", icon: Wallet },
  { href: "/Import", label: "Import", icon: Download },
  { href: "/Analytics", label: "Analytics", icon: PieChart },
  { href: "/Goals", label: "Goals", icon: Target },
  { href: "/Settings", label: "Settings", icon: Settings },
];

export const NAV_FOOTER_ITEMS: NavItem[] = [];

/**
 * The shared nav-active predicate — case-insensitive (the reference's
 * sidebar links carry the capitalized hrefs while its router serves both
 * casings), the Dashboard root special case (the post-login redirect
 * lands on / while its Dashboard link points at /Dashboard), and the
 * prefix rule for nested segments.
 */
export function isNavActive(pathname: string, href: string): boolean {
  const p = pathname.toLowerCase();
  const h = href.toLowerCase();
  if (h === "/dashboard") return p === "/" || p === "/dashboard";
  return p === h || p.startsWith(`${h}/`);
}
