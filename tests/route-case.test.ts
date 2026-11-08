import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-24 route-case + URL-state pins (S24-P1/P2/P3): the reference
// serves EVERY app route at BOTH casings, live-verified on 2026-10-01 —
// its sidebar links point at CAPITALIZED paths (/Dashboard, /Accounts,
// /Contacts, /Leads, /Calendar, /Activities, /Reports, /Settings —
// byte-extracted from its live DOM) and its account menu ships
// <A href="/Profile">. Probing each capital URL browser-side: all NINE
// render the real page IN PLACE with NO normalization (the URL bar keeps
// the casing the visitor typed/clicked), and each casing is a
// first-class SSR route — /Reports serves og:url + canonical at
// …/Reports while /reports serves them at …/reports; /Dashboard serves
// the ROOT head exactly like /. The auth routes are the deliberate
// exception: /Login and /Signup render the reference's 404 view (its
// client router does not case-fold them) — our clone 404s both too, and
// these tests pin that NO capital auth aliases appear.
//
// S24-P2: the active-state matcher is CASE-INSENSITIVE on the reference
// (at lowercase /reports the Reports item — href /Reports — carries the
// active background; the Dashboard item is active at BOTH / and
// /Dashboard), and our nav hrefs must byte-match the reference's.
//
// S24-P3: the reference's dashboard "More..." ghost button is a complete
// NO-OP (domDelta 0, no navigation) — our router.push("/leads") was an
// invention.
//
// These tests parse the component/page sources so the contract is pinned
// at the unit layer without a browser; the live capital-route rendering,
// the URL preservation and the sidebar href bytes are pinned by the e2e
// route-case checks (tests/e2e/crm.spec.ts).

const APP = "src/app";
const CAPITAL_ROUTES = [
  { route: "Income", page: "Income", comp: "page" },
  { route: "Expenses", page: "Expenses", comp: "page" },
  { route: "Accounts", page: "Accounts", comp: "page" },
  { route: "Investments", page: "Investments", comp: "page" },
  { route: "Import", page: "Import", comp: "page" },
  { route: "Analytics", page: "Analytics", comp: "page" },
  { route: "Goals", page: "Goals", comp: "page" },
  { route: "Settings", page: "Settings", comp: "page" },
] as const;

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : null;
}

// Source pins read RULES, not documentation: strip comments first (the
// s21/s22 own-doc-comment hazard — the retirement notes themselves name
// the retired constructs).
function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

describe("session-24: the capital-route render aliases (S24-P1)", () => {
  for (const { route, page, comp } of CAPITAL_ROUTES) {
    it(`(app)/${route}/page.jsx renders the lowercase page IN PLACE (no redirect)`, () => {
      // The alias is a .jsx file ON PURPOSE (gate-caught): TypeScript's
      // TS1149 — NOT flag-controllable — fires whenever one program
      // includes two real files whose paths differ ONLY in casing, which
      // a page.tsx at (app)/${route} would do against the canonical
      // (app)/${route.toLowerCase()}/page.tsx (Next's generated validator
      // imports both). The .jsx extension breaks the collision and
      // resolves through allowJs exactly like the validator's page.js
      // import; the lowercase page.tsx stays canonical + type-checked.
      const src = read(`${APP}/(app)/${route}/page.jsx`);
      expect(src, `src/app/(app)/${route}/page.jsx must exist`).not.toBeNull();
      expect(
        existsSync(path.resolve(import.meta.dirname, "..", `${APP}/(app)/${route}/page.tsx`)),
      ).toBe(false);
      const code = stripComments(src!);
      expect(code).toMatch(new RegExp(`import ${page}Page from "\\.\\./[a-z]+/${comp}"`));
      expect(code).not.toMatch(/redirect\(/);
      expect(code).not.toMatch(/next\/navigation/);
      expect(code).toMatch(new RegExp(`return <${page}Page />`));
    });

    it(`(app)/${route}/page.jsx emits pageMetadata with the CAPITAL route "/${route}"`, () => {
      const code = stripComments(read(`${APP}/(app)/${route}/page.jsx`)!);
      expect(code).toMatch(new RegExp(`pageMetadata\\(\\{ page: "${page}", route: "/${route}" \\}\\)`));
    });
  }

  it("(app)/Dashboard/page.jsx renders the root dashboard IN PLACE with NO metadata export", () => {
    const src = read(`${APP}/(app)/Dashboard/page.jsx`);
    expect(src, "src/app/(app)/Dashboard/page.jsx must exist").not.toBeNull();
    const code = stripComments(src!);
    // Session-142 (D-142a0): the dashboard source moved to
    // (app)/dashboard/page.tsx (the root `/` became the PUBLIC landing).
    expect(code).toMatch(/import DashboardPage from "\.\.\/dashboard\/page"/);
    expect(code).toMatch(/return <DashboardPage \/>/);
    expect(code).not.toMatch(/redirect\(/);
    // The reference's /Dashboard serves the ROOT head (og:url/canonical at
    // the origin, og:title "WealthOS") — the alias must NOT carry its own
    // per-route metadata or it would emit /Dashboard og:url tags.
    expect(code).not.toMatch(/export const metadata/);
    expect(code).not.toMatch(/pageMetadata/);
  });

  it("no stray top-level capital aliases exist outside the (app) group", () => {
    for (const cap of ["Dashboard", "Income", "Expenses", "Accounts", "Investments", "Import", "Analytics", "Goals", "Settings"]) {
      expect(read(`${APP}/${cap}/page.tsx`)).toBeNull();
      expect(read(`${APP}/${cap}/page.jsx`)).toBeNull();
    }
  });

  it("NO capital auth-route aliases exist (/Login + /Signup must keep 404ing like the reference)", () => {
    // The reference's client router case-folds its 9 app routes but NOT
    // its auth routes — /Login and /Signup render its 404 view. Our clone
    // 404s them too (parity by coincidence): pin that no alias sneaks in.
    expect(read(`${APP}/Login/page.tsx`)).toBeNull();
    expect(read(`${APP}/Signup/page.tsx`)).toBeNull();
    expect(read(`${APP}/(app)/Login/page.tsx`)).toBeNull();
    expect(read(`${APP}/(app)/Signup/page.tsx`)).toBeNull();
    expect(read(`${APP}/Login/page.jsx`)).toBeNull();
    expect(read(`${APP}/Signup/page.jsx`)).toBeNull();
    expect(read(`${APP}/(app)/Login/page.jsx`)).toBeNull();
    expect(read(`${APP}/(app)/Signup/page.jsx`)).toBeNull();
  });

  it("next.config.ts still carries NO redirects() (the s14 case-insensitive loop hazard)", () => {
    const configSrc = read("next.config.ts")!;
    expect(configSrc).not.toMatch(/redirects\(\)/);
  });
});

describe("session-24: the nav href byte-contract + case-insensitive active state (S24-P2)", () => {
  const navSrc = read("src/components/layout/nav-config.ts")!;
  const nav = stripComments(navSrc);

  it("NAV_ITEMS hrefs are the reference's CAPITALIZED paths — Dashboard at /Dashboard, not /", () => {
    expect(nav).toMatch(/href: "\/Dashboard", label: "Dashboard"/);
    expect(nav).toMatch(/href: "\/Income", label: "Income"/);
    expect(nav).toMatch(/href: "\/Expenses", label: "Expenses"/);
    expect(nav).toMatch(/href: "\/Accounts", label: "Accounts"/);
    expect(nav).toMatch(/href: "\/Investments", label: "Investments"/);
    expect(nav).toMatch(/href: "\/Import", label: "Import"/);
    expect(nav).toMatch(/href: "\/Analytics", label: "Analytics"/);
    expect(nav).toMatch(/href: "\/Goals", label: "Goals"/);
    expect(nav).toMatch(/href: "\/Settings", label: "Settings"/);
  });

  it("zero lowercase nav hrefs remain in nav-config", () => {
    expect(nav).not.toMatch(/href: "\/accounts"/);
    expect(nav).not.toMatch(/href: "\/contacts"/);
    expect(nav).not.toMatch(/href: "\/leads"/);
    expect(nav).not.toMatch(/href: "\/calendar"/);
    expect(nav).not.toMatch(/href: "\/activities"/);
    expect(nav).not.toMatch(/href: "\/reports"/);
    expect(nav).not.toMatch(/href: "\/settings"/);
    expect(nav).not.toMatch(/href: "\/"/);
  });

  it("the shared isNavActive is CASE-INSENSITIVE with the Dashboard root special case (s147: extracted to nav-config)", () => {
    const navConfig = stripComments(read("src/components/layout/nav-config.ts")!);
    // The reference highlights Reports (href /Reports) at lowercase
    // /reports, and Dashboard at BOTH / and /Dashboard. Session-147
    // (D-147a1): the predicate moved from SidebarNav's closure to the
    // shared isNavActive — the desktop sidebar AND the mobile Sheet
    // drawer resolve the same active state (its unit pins:
    // tests/nav-config.test.ts).
    expect(navConfig).toMatch(/export function isNavActive/);
    expect(navConfig).toMatch(/pathname\.toLowerCase\(\)/);
    expect(navConfig).toMatch(/href\.toLowerCase\(\)/);
    expect(navConfig).toMatch(/h === "\/dashboard"/);
    expect(navConfig).toMatch(/p === "\/" \|\| p === "\/dashboard"/);
    // the sidebar delegates to the shared predicate
    const sidebar = stripComments(read("src/components/layout/sidebar.tsx")!);
    expect(sidebar).toMatch(/isNavActive\(pathname, item\.href\)/);
    // The old case-SENSITIVE one-liner contract is gone.
    expect(sidebar).not.toMatch(/href === "\/" \? pathname === "\/"/);
  });

  it("the sidebar user menu carries the reference's Dark Mode + Sign Out items (session-199)", () => {
    const sidebar2 = stripComments(read("src/components/layout/sidebar.tsx")!);
    expect(sidebar2).toMatch(/Dark Mode/);
    expect(sidebar2).toMatch(/Sign Out/);
    const topbar = stripComments(read("src/components/layout/sidebar.tsx")!);
    // Session-73 (L-73c5): the reference renders the Profile menuitem
    // asChild wrapping a REAL anchor (its ox Link → <a href="/Profile">)
    // — the middle-click/open-in-new-tab semantics the router.push
    // form lost. Our next/link twin keeps the client-side nav.
    expect(topbar).not.toMatch(/<Link href="\/Profile">/);
  });
});

describe("session-24 → session-148: the dashboard More... button RETIRED (S24-P3 → F-147c3)", () => {
  const dash = stripComments(read("src/app/(app)/dashboard/page.tsx")!);

  it("the ghost is GONE (walk38k: the reference's bar ends with the search)", () => {
    expect(dash).not.toMatch(/More\.\.\./);
  });

  it("retires the now-unused useRouter import + hook", () => {
    expect(dash).not.toMatch(/useRouter/);
  });
});

describe("session-24: URL-state parity holds (the s39 pointer, CLOSED)", () => {
  it("no page or component writes filter/view state into the URL (no useSearchParams anywhere)", () => {
    // Both apps live-verified: filters, sorting, periods, calendar
    // months, view switchers, tabs and search write ZERO URL state, and
    // deep-link params are ignored by both. Our only router targets are
    // NAVIGATION pushes (topbar search rows + account menu + login) —
    // never state serialization.
    const searchResults = [
      ...globFiles("src/app"),
      ...globFiles("src/components"),
    ];
    const offenders = searchResults.filter(
      // Session-66 (N-66e — the N-65p note (b) closed): the scan now sees
      // the NINE capital-route .jsx RENDER aliases too (the loading-layer
      // tsx?|jsx? precedent) — a .tsx-only filter left them invisible to
      // the zero-URL-state claim.
      // Session-147 (F-147c2): the login card READS ?from_url — the
      // reference's own auth-wall round-trip (guest /About → the wall →
      // back to /About). An auth-flow INPUT read, never filter/view
      // state serialization: the s39 contract is "no page WRITES UI
      // state to the URL", and the login card never writes it.
      // Session-163: the reset-password screen READS ?token — the digma
      // RA-66 landing contract (a non-empty token opens the set-password
      // form). The same auth-flow INPUT class; it never writes it.
      (f) =>
        /\.(tsx|jsx)$/.test(f) &&
        !f.endsWith("login-card.tsx") &&
        !f.endsWith("reset-password-screen.tsx") &&
        /useSearchParams|history\.pushState|history\.replaceState/.test(readFileSync(f, "utf8")),
    );
    expect(offenders).toEqual([]);
  });
});

function globFiles(dir: string): string[] {
  // Small recursive walk (node:fs) — the repo has no deep glob dep at the
  // unit layer and this keeps the test hermetic.
  const out: string[] = [];
  const abs = path.resolve(import.meta.dirname, "..", dir);
  if (!existsSync(abs)) return out;
  const stack = [abs];
  while (stack.length) {
    const d = stack.pop()!;
    for (const entry of readdirSync(d)) {
      const full = path.join(d, entry);
      if (statSync(full).isDirectory()) stack.push(full);
      else out.push(full);
    }
  }
  return out;
}
