// Session-219 (R-16, F-219c + F-219t): the DEFAULT-THEME parity pins.
//
// The live reference decodes (this session, fresh-context probes):
//   - the authenticated shell renders DARK for a fresh visitor
//     (html.class="dark", body rgb(10,10,10) on /Dashboard);
//   - the auth faces serve LIGHT always (login html.class=""), and a
//     stored choice persists SERVER-SIDE (no localStorage key at all);
//   - our app: the choice persists in localStorage (the functional
//     superset — kept), but the DEFAULT was "system" (light under a
//     no-preference client) — the parity gap.
//
// The contract under test (the cure):
//   1. defaultThemeForPath — the PURE seam: a stored choice wins
//      everywhere; with NO stored choice an app route resolves DARK and
//      an auth face resolves LIGHT.
//   2. The no-FOUC bootstrap in the root layout mirrors the same
//      default (source pin — the script is inline pre-paint JS, it
//      cannot import the seam, so the pin keeps the two honest with
//      each other).
//   3. The AppShell applies the default on shell entry (source pin —
//      closes the login→dashboard CLIENT-NAV hole the script cannot
//      see: the script runs on full loads only).
//   4. The auth faces FORCE light: the bootstrap REMOVES .dark on auth
//      faces even when a dark choice is stored (the reference's
//      always-light auth genus + the F-219t stranded-body-color close).
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { defaultThemeForPath, AUTH_FACE_PATHS } from "@/lib/theme-default";

const read = (p: string) => readFileSync(p, "utf8");

describe("defaultThemeForPath — the pure default seam (F-219c)", () => {
  it("resolves DARK on app routes when no choice is stored", () => {
    expect(defaultThemeForPath("/Dashboard", null)).toBe("dark");
    expect(defaultThemeForPath("/dashboard", null)).toBe("dark");
    expect(defaultThemeForPath("/", null)).toBe("dark");
    expect(defaultThemeForPath("/expenses", null)).toBe("dark");
    expect(defaultThemeForPath("/Settings", null)).toBe("dark");
  });

  it("resolves LIGHT on the auth faces when no choice is stored", () => {
    for (const p of AUTH_FACE_PATHS) {
      expect(defaultThemeForPath(p, null)).toBe("light");
    }
    expect(defaultThemeForPath("/login", null)).toBe("light");
    expect(defaultThemeForPath("/signup", null)).toBe("light");
    expect(defaultThemeForPath("/reset-password", null)).toBe("light");
  });

  it("a stored choice wins on the app routes (the superset persistence)", () => {
    expect(defaultThemeForPath("/Dashboard", "light")).toBe("light");
    expect(defaultThemeForPath("/expenses", "dark")).toBe("dark");
  });

  it("the auth faces force light even when dark is stored (F-219t)", () => {
    expect(defaultThemeForPath("/login", "dark")).toBe("light");
    expect(defaultThemeForPath("/reset-password?token=x", "dark")).toBe("light");
  });

  it("a stored system choice keeps following the OS preference at resolve time", () => {
    // "system" stored → the resolved state is the OS preference; the
    // seam returns the LABEL (the provider + bootstrap resolve it).
    expect(defaultThemeForPath("/Dashboard", "system")).toBe("system");
  });
});

describe("the no-FOUC bootstrap mirrors the seam (source pins)", () => {
  const layout = read("src/app/layout.tsx");

  it("the bootstrap carries the auth-face regex and the dark default", () => {
    // The inline script: stored wins; otherwise dark unless the pathname
    // is an auth face (the F-219c default + the F-219t force-light).
    expect(layout).toMatch(/login\|signup\|reset-password/);
    expect(layout).toMatch(/classList\.add\("dark"\)/);
  });

  it("the bootstrap REMOVES dark on auth faces even when stored dark (F-219t)", () => {
    expect(layout).toMatch(/classList\.remove\("dark"\)/);
  });

  it("the bootstrap no longer defaults to system", () => {
    // The old form: `var t=localStorage.getItem("wealthos-theme")||"system"`
    expect(layout).not.toMatch(/\|\|"system"/);
  });
});

describe("the ThemeProvider re-resolves on client navigation (source pin)", () => {
  const theme = read("src/components/layout/theme.tsx");

  it("the provider watches the pathname through the seam", () => {
    expect(theme).toMatch(/usePathname\(\)/);
    expect(theme).toMatch(/defaultThemeForPath\(pathname/);
  });

  it("the provider writes NOTHING to storage in the effect (the choice stays user-owned)", () => {
    const effect = theme.match(/const pathname = usePathname\(\);[\s\S]{0,400}/)?.[0] ?? "";
    expect(effect).not.toMatch(/localStorage\.setItem/);
  });
});
