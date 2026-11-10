// Session-219 (R-16, F-219c + F-219t): the DEFAULT-THEME parity seam.
//
// The live reference's posture (fresh-context probes, this session):
//   - the AUTHENTICATED shell renders DARK for a fresh visitor
//     (html.class="dark", body #0a0a0a on /Dashboard — measured on
//     every section; no localStorage theme key exists at all, and the
//     choice persists SERVER-SIDE per user: toggle → reload keeps it
//     with still no localStorage write);
//   - the AUTH FACES serve LIGHT always (login html.class="" — the
//     pre-login shell has no theme mechanism);
//   - our app keeps the localStorage persistence (the functional
//     superset) — the DEFAULT is what changes: app routes resolve DARK
//     when no choice is stored; the auth faces resolve LIGHT and the
//     bootstrap REMOVES .dark there even when a dark choice is stored
//     (the reference's always-light auth genus + the F-219t close: a
//     stored-dark login previously stranded the flipped body
//     text-foreground rgb(250,250,250) on the unflipped light
//     #faf9f7 wash — live-measured).
//
// The seam is PURE (no React, no window): the no-FOUC bootstrap in the
// root layout mirrors it inline (pre-paint JS cannot import — the
// theme-default.test.ts source pins keep the two honest), and the
// ThemeProvider pathname effect calls it on every client navigation
// (closing the login→dashboard and logout→login holes the bootstrap
// cannot see — the bootstrap runs on full loads only).
// Session-220 (R-17, F-220g): an INVALID stored value (anything not
// light/dark/system) is treated as ABSENT — the app-route default is
// dark, not light (the bootstrap's old ternary painted light for it;
// the three mirrors now agree).

/** The auth faces — pre-login routes that always render light. */
export const AUTH_FACE_PATHS = ["/login", "/signup", "/reset-password"] as const;

function isAuthFace(pathname: string): boolean {
  // Prefix match: /login?from_url=… and /reset-password?token=… are
  // auth faces too. The root "/" is NOT (it serves the dashboard to
  // sessioned visitors server-side; the guest shim renders null).
  return AUTH_FACE_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}?`) || pathname.startsWith(`${p}/`));
}

/**
 * The default-theme resolution for a route.
 *
 * - App routes: a STORED choice wins ("light" | "dark" | "system" —
 *   system returns as its label; the caller resolves it against
 *   prefers-color-scheme); with no stored choice → "dark" (the
 *   reference's fresh-visitor posture).
 * - Auth faces (login/signup/reset-password): ALWAYS "light" — the
 *   force-light genus (the reference's pre-login shell has no theme
 *   mechanism; a stored-dark auth face previously stranded the
 *   flipped body ink on the unflipped light wash — F-219t).
 */
export function defaultThemeForPath(
  pathname: string,
  stored: string | null,
): "light" | "dark" | "system" {
  if (isAuthFace(pathname)) return "light";
  if (stored === "light" || stored === "dark" || stored === "system") return stored;
  return "dark";
}
