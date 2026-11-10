"use client";

// The WealthOS theme seam — session-199. The reference toggles dark mode
// by writing `dark` on <html> (live-observed) from BOTH the user menu's
// "Dark Mode" item and the mobile header's moon button. The choice
// persists in localStorage under "wealthos-theme"; the no-FOUC inline
// script in the root layout applies it before first paint. "system"
// follows prefers-color-scheme live.
// Session-219 (R-16, F-219c + F-219t): the DEFAULT is now the parity
// default — app routes resolve DARK for fresh visitors (the reference's
// own posture, live-measured), the auth faces FORCE light (the
// reference's always-light pre-login genus). The inline bootstrap owns
// full page loads; the provider's pathname effect below owns CLIENT
// navigations (the login→dashboard and logout→login holes the bootstrap
// cannot see). The resolution logic lives in src/lib/theme-default.ts
// (the pure seam both mirrors).

import * as React from "react";
import { usePathname } from "next/navigation";
import { defaultThemeForPath } from "@/lib/theme-default";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "wealthos-theme";

export function resolveTheme(value: string | null): Theme {
  return value === "dark" || value === "light" || value === "system"
    ? value
    : "system";
}

export function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  return resolveTheme(window.localStorage.getItem(STORAGE_KEY));
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  const dark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.classList.toggle("dark", dark);
}

export interface ThemeContextValue {
  theme: Theme;
  /** Toggles light↔dark explicitly (the two button faces' behavior). */
  toggle: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

/** The external store: <html>.classList — the no-FOUC inline script (and
 *  every setTheme call) mutates it; useSyncExternalStore subscribes every
 *  consumer to the SAME source of truth with no effect-setState. */
function subscribeToDarkClass(callback: () => void): () => void {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  mql.addEventListener("change", callback);
  return () => {
    observer.disconnect();
    mql.removeEventListener("change", callback);
  };
}

/** The CURRENT resolved theme (light|dark) straight off the DOM class. */
export function useIsDark(): boolean {
  return React.useSyncExternalStore(
    subscribeToDarkClass,
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // The theme LABEL rides localStorage (the choice), the RESOLVED state
  // rides the DOM class (the effect) — the inline bootstrap script has
  // already applied the class before hydration.
  const [theme, setThemeState] = React.useState<Theme>("system");
  const isDark = useIsDark();

  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      // Session-220 (R-17, F-220h): gate on the EXACT stored read —
      // readStoredTheme() maps null→"system", so a fresh visitor (no
      // stored choice, the DARK default) would follow the OS on flip,
      // contradicting the no-choice→dark invariant until the next
      // route change.
      if (window.localStorage.getItem(STORAGE_KEY) === "system") applyTheme("system");
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Session-219 (R-16, F-219c + F-219t): re-resolve the theme on every
  // pathname change — the CLIENT-NAV seam. Full loads are owned by the
  // no-FOUC bootstrap; this effect owns login→dashboard (the default
  // dark must land without a reload) and logout→login (the auth face
  // must force light even with a dark choice stored). A stored choice
  // wins on app routes; nothing is written to storage here.
  const pathname = usePathname();
  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    applyTheme(defaultThemeForPath(pathname ?? "/", stored));
  }, [pathname]);

  // Keep the label in step with external changes (the toggle writes both,
  // but the OS-level system switch resolves through the class alone).
  const [lastDark, setLastDark] = React.useState(isDark);
  if (lastDark !== isDark) {
    setLastDark(isDark);
    setThemeState(readStoredTheme());
  }

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }, []);

  const toggle = React.useCallback(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  }, [setTheme]);

  const value = React.useMemo(() => ({ theme, toggle, setTheme }), [theme, toggle, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    // Defensive: the provider is wired in the root layout; a consumer
    // outside it still gets a working no-op-free instance.
    return {
      theme: "system",
      toggle: () => {
        document.documentElement.classList.toggle("dark");
      },
      setTheme: (t) => {
        document.documentElement.classList.toggle("dark", t === "dark");
      },
    };
  }
  return ctx;
}
