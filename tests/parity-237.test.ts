import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-237 (R-34): the source-tier pins for the error-face,
// transient-seam, and remount-gate round. Every pin was born RED over
// the pre-cure tree (the F-237 ledger rows in docs/remediation_plan_v2.md
// carry the verified evidence). Source-scanning contracts per the house
// convention: read the file, assert the contract.

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// ---- F-237b: the transient seam beyond the route files ---------------------

// The F-236b family counted only the arms inside the 19 route files'
// own try blocks. The session-read seam (requireSession's catch — the
// one DB call EVERY protected route makes) and the six auth routes'
// catches answered the generic 500 for a P2024/P2028. These seven
// sites join the family (F-237b).
const TRANSIENT_SEAM_FAMILY = [
  "src/lib/api.ts",
  "src/app/api/auth/login/route.ts",
  "src/app/api/auth/signup/route.ts",
  "src/app/api/auth/verify/route.ts",
  "src/app/api/auth/resend/route.ts",
  "src/app/api/auth/logout/route.ts",
  "src/app/api/auth/me/route.ts",
];

// The tightened arm form (F-237j's answer for the presence-only
// residual): the arm must READ as the guarded call returning the
// envelope, not merely coexist anywhere in the file (the seam's
// object-wrapping return and the routes' bare return both match).
const TRANSIENT_ARM_FORM = /if \(isTransientDbError\(\w+\)\) return (?:\{ response: )?ERR\.UNAVAILABLE\(\) ?\}?;/;

describe("F-237b — the transient-503 arm reaches the seam and the auth family", () => {
  it("requireSession's catch carries the transient arm ahead of the generic 500", () => {
    const src = read("src/lib/api.ts");
    expect(src).toMatch(/import \{ isTransientDbError \} from "\.\/db";/);
    expect(src).toMatch(TRANSIENT_ARM_FORM);
  });

  it.each(TRANSIENT_SEAM_FAMILY)("the transient arm arms %s", (rel) => {
    const src = read(rel);
    expect(src.length).toBeGreaterThan(0);
    expect(src).toMatch(TRANSIENT_ARM_FORM);
    expect(src).toMatch(/isTransientDbError/);
  });

  it("the auth routes import the helper from the db seam", () => {
    for (const rel of TRANSIENT_SEAM_FAMILY.slice(1)) {
      const src = read(rel);
      expect(src).toMatch(/import \{[^}]*isTransientDbError[^}]*\} from "@\/lib\/db";/);
    }
  });

  it("the parity-236 family comment matches its list (the 19 route files)", () => {
    const src = read("tests/parity-236.test.ts");
    // Comment continuations collapse — the phrase wraps across lines
    // (the house's own line-wrap lesson, F-230e's pin form).
    const flat = src.replace(/\s*\/\/\s*/g, " ");
    expect(flat).toContain("The 19 route files whose DB-touching catch arms carry the transient arm");
  });
});

// ---- F-237a: the error-face restoration ------------------------------------

describe("F-237a — the revocation gate discriminates the failure face", () => {
  it("the shell gate fires only on the auth-specific signal (user null AND error null)", () => {
    const src = read("src/components/layout/app-shell.tsx");
    // The 401 branch commits error-null alongside user-null; the
    // non-401 failure branch commits the error — so !storeError is
    // the discriminator that keeps the F-216c/d banner reachable.
    expect(src).toMatch(/hydrated && !loading && storeUser === null && !storeError/);
  });

  it("refreshAll's UNAUTHORIZED branch mirrors hydrate's (the mid-session wall)", () => {
    const src = read("src/stores/wealthos-store.ts");
    // Scoped to the refreshAll function body — hydrate's own branch
    // (which this mirrors) must not satisfy the pin.
    const start = src.indexOf("async function refreshAll");
    const end = src.indexOf("function createStore");
    expect(start).toBeGreaterThan(-1);
    expect(end).toBeGreaterThan(start);
    const body = src.slice(start, end);
    expect(body).toMatch(/res\.code === "UNAUTHORIZED"/);
    expect(body).toMatch(/user: null, error: null/);
  });
});

// ---- F-237c: the remount gate ------------------------------------------------

describe("F-237c — a remounted shell refreshes in place (no re-gate)", () => {
  it("hydrate's entry distinguishes the remount from the first load", () => {
    const src = read("src/stores/wealthos-store.ts");
    // The store holds a live user on remount (the `/` ↔ section-route
    // AppShell transition) — the loading re-gate must NOT fire there.
    expect(src).toMatch(/const remount = get\(\)\.hydrated && get\(\)\.user !== null;/);
    expect(src).toMatch(
      /set\(\s*remount\s*\?\s*\{ error: null, settingsSettled: false \}\s*:\s*\{ loading: true, error: null, settingsSettled: false \},?\s*\);/,
    );
  });
});

// ---- F-237d: the upload pre-write wrap ---------------------------------------

describe("F-237d — the upload capacity read rides inside the try", () => {
  it("the dir resolution + capacity read precede the write INSIDE the try", () => {
    const src = read("src/app/api/upload/route.ts");
    const tryAt = src.indexOf("try {");
    const capacityAt = src.indexOf("uploadsCapacity(");
    const writeAt = src.indexOf("writeFile(");
    expect(tryAt).toBeGreaterThan(-1);
    expect(capacityAt).toBeGreaterThan(tryAt);
    expect(writeAt).toBeGreaterThan(capacityAt);
  });
});

// ---- F-237e: the whitespace-clear normalization -------------------------------

describe("F-237e — whitespace-only means the clear on every clearable field", () => {
  it("the five preprocess guards ride the trim-aware form", () => {
    const src = read("src/lib/schemas.ts");
    const guards = src.match(
      /z\.preprocess\(\s*\(v\) => \(typeof v === "string" && v\.trim\(\) === "" \? null : v\),/g,
    ) ?? [];
    // clearableDateField's definition + color create/update + icon
    // create/update = five sites (the F-236c set, trim-aware now).
    expect(guards.length).toBe(5);
  });

  it("the exact-empty-string form no longer rides the guards (superseded)", () => {
    const src = read("src/lib/schemas.ts");
    expect(src).not.toMatch(/z\.preprocess\(\s*\(v\) => \(v === "" \? null : v\),/);
  });
});

// ---- F-237f: the import pending face ------------------------------------------

describe("F-237f — the import parse window carries a visible pending face", () => {
  it("the extract control's label keys on the parsing flag", () => {
    const src = read("src/app/(app)/import/page.tsx");
    expect(src).toMatch(/\{parsing \? "Reading file…"/);
  });
});

// ---- F-237g: the refresh busy riders -------------------------------------------

describe("F-237g — the refresh controls carry the busy rider", () => {
  it("the dashboard's two refresh controls disable + spin in flight", () => {
    const src = read("src/app/(app)/dashboard/page.tsx");
    expect(src).toMatch(/const \[refreshing, setRefreshing\] = React\.useState\(false\);/);
    const riders = src.match(/disabled=\{refreshing\}/g) ?? [];
    expect(riders.length).toBeGreaterThanOrEqual(2);
    expect(src).toMatch(/refreshing && "animate-spin"/);
  });

  it("the analytics refresh control disables in flight", () => {
    const src = read("src/app/(app)/analytics/page.tsx");
    expect(src).toMatch(/disabled=\{refreshing\}/);
    expect(src).toMatch(/refreshing && "animate-spin"/);
  });
});

// ---- F-237h: the redirect-face live-region seed --------------------------------

describe("F-237h — the redirect face seeds its live region (the F-218h genus)", () => {
  it("the status region commits empty; the label lands as a content change", () => {
    const src = read("src/components/layout/guest-login-redirect.tsx");
    // The F-235a form: a zero-delay timer seeds the label so the
    // region (which arrives WITH the component) never carries its
    // content at commit — plus the cleanup pair.
    expect(src).toMatch(/const \[seeded, setSeeded\] = React\.useState\(false\);/);
    expect(src).toMatch(/setTimeout\(\(\) => setSeeded\(true\), 0\)/);
    expect(src).toMatch(/clearTimeout/);
    expect(src).toMatch(/\{seeded \? \(\s*<p className="text-sm text-muted">Redirecting to sign in…<\/p>\s*\) : null\}/);
  });
});

// ---- F-237i: the register completion ---------------------------------------------

describe("F-237i — the dead-arm register names the small size arm", () => {
  it("the register enumerates all five zero-consumer button arms (in words)", () => {
    const src = read("src/components/ui/button.tsx");
    // Comment continuations collapse — the phrase wraps across the
    // register's comment lines (the F-230e pin form).
    const flat = src.replace(/\s*\/\/\s*/g, " ");
    expect(flat).toContain("icon, small-icon, pill, large, and small size arms");
  });
});
