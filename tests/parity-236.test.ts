import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-236 (R-33): the source-tier pins for the empty-put,
// transient-503, and revocation-face round. Every pin was born RED over
// the pre-cure tree (the F-236 ledger rows in docs/remediation_plan_v2.md
// carry the verified evidence). Source-scanning contracts per the house
// convention: read the file, assert the contract.

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// The 18 route files whose DB-touching catch arms gain the transient
// arm (F-236b). /api/reset already carries it (the F-235c cure).
const TRANSIENT_FAMILY = [
  "src/app/api/transactions/route.ts",
  "src/app/api/transactions/[id]/route.ts",
  "src/app/api/income-sources/route.ts",
  "src/app/api/income-sources/[id]/route.ts",
  "src/app/api/accounts/route.ts",
  "src/app/api/accounts/[id]/route.ts",
  "src/app/api/investments/route.ts",
  "src/app/api/investments/[id]/route.ts",
  "src/app/api/goals/route.ts",
  "src/app/api/goals/[id]/route.ts",
  "src/app/api/budgets/route.ts",
  "src/app/api/settings/route.ts",
  "src/app/api/users/route.ts",
  "src/app/api/import/route.ts",
  "src/app/api/export/route.ts",
  "src/app/api/search/route.ts",
  "src/app/api/ai/coach/route.ts",
  "src/app/api/dashboard/route.ts",
  "src/app/api/upload/route.ts",
];

// ---- F-236a: the empty-put 400 -------------------------------------------

describe("F-236a — the five update schemas carry the no-fields guard", () => {
  it("the guard helper builds an update schema that rejects a body with no known fields", () => {
    const src = read("src/lib/schemas.ts");
    expect(src).toMatch(/const updateSchema = <T extends z\.ZodRawShape>\(/);
    expect(src).toMatch(/Object\.keys\(v\)\.length > 0/);
    expect(src).toMatch(/"No fields to update"/);
  });

  it.each([
    "transactionUpdateSchema",
    "incomeSourceUpdateSchema",
    "bankAccountUpdateSchema",
    "investmentUpdateSchema",
    "goalUpdateSchema",
  ])("%s is built through the guard", (name) => {
    const src = read("src/lib/schemas.ts");
    expect(src).toMatch(new RegExp(`export const ${name} = updateSchema\\(`));
  });
});

// ---- F-236b: the transient-503 family ------------------------------------

describe("F-236b — the transient-DB 503 arm is a family, not three routes", () => {
  it("isTransientDbError joins the db helpers (the P2024/P2028 shape)", () => {
    const src = read("src/lib/db.ts");
    expect(src).toMatch(/export function isTransientDbError\(/);
    expect(src).toMatch(/"P2024"/);
    expect(src).toMatch(/"P2028"/);
  });

  it("ERR.UNAVAILABLE joins the envelope family with the auth routes' copy", () => {
    const src = read("src/lib/api.ts");
    expect(src).toMatch(
      /UNAVAILABLE: \(\) =>\s*fail\("UNAVAILABLE", "The request took too long — the database timed out\. Try again\.", 503\)/,
    );
  });

  it.each(TRANSIENT_FAMILY)("the transient check arms %s", (rel) => {
    const src = read(rel);
    expect(src.length).toBeGreaterThan(0);
    expect(src).toMatch(/isTransientDbError\(/);
    expect(src).toMatch(/ERR\.UNAVAILABLE\(\)/);
  });
});

// ---- F-236c: the uniform clear contract ----------------------------------

describe("F-236c — the clearable-date seam and the nullable create twins", () => {
  it("the clearable-date seam preprocesses the empty string to the null clear", () => {
    const src = read("src/lib/schemas.ts");
    expect(src).toMatch(/const clearableDateField = \(message: string\) =>/);
    expect(src).toMatch(/z\.preprocess\(\s*\(v\) => \(v === "" \? null : v\),\s*dateField\(message\)\.nullable\(\)\.optional\(\),\s*\)/);
  });

  it("all eight nullable-date sites ride the seam", () => {
    const src = read("src/lib/schemas.ts");
    const uses = src.match(/clearableDateField\(/g) ?? [];
    // The 8 call sites (the definition binds with `=`, not a call).
    expect(uses.length).toBe(8);
  });

  it("the color and icon fields normalize the empty string to null on both twins", () => {
    const src = read("src/lib/schemas.ts");
    // The date seam + color create/update + icon create/update all ride
    // the PREPROCESS form (the F-219q transform form cannot express it:
    // the regex and min(1) checks fire AHEAD of any downstream
    // transform, so the guard must run before the validation chain).
    const guards = src.match(/z\.preprocess\(\s*\(v\) => \(v === "" \? null : v\),/g) ?? [];
    expect(guards.length).toBe(5);
  });
});

// ---- F-236d: the toast dismiss hit area ----------------------------------

describe("F-236d — the toast dismiss clears the 24px touch floor", () => {
  it("the padding joins the DIALOG_CLOSE family (the 14px glyph + 12px padding = 26px)", () => {
    const src = read("src/components/ui/toast.tsx");
    expect(src).toContain("rounded-md p-1.5 text-muted");
  });
});

// ---- F-236e: the dashboard glyph wrap ------------------------------------

describe("F-236e — the health-advice glyph is aria-hidden", () => {
  it("the bare emoji is wrapped like every other decorative glyph", () => {
    const src = read("src/app/(app)/dashboard/page.tsx");
    expect(src).toContain('<span aria-hidden="true">💡</span>');
  });
});

// ---- F-236f: the mid-flight revocation face ------------------------------

describe("F-236f — the shell re-establishes the login wall on a mid-flight revocation", () => {
  it("the post-hydrate null-user gate renders the guest-wall face", () => {
    const src = read("src/components/layout/app-shell.tsx");
    expect(src).toMatch(/import \{ GuestLoginRedirect \} from "@\/components\/layout\/guest-login-redirect";/);
    expect(src).toMatch(/hydrated && !loading && storeUser === null/);
  });

  it("the store's UNAUTHORIZED branch still nulls the user (the gate's input)", () => {
    const src = read("src/stores/wealthos-store.ts");
    expect(src).toMatch(/res\.code === "UNAUTHORIZED"/);
    expect(src).toMatch(/user: null/);
  });
});

// ---- F-236g: the stale F-218a comment ------------------------------------

describe("F-236g — the login card no longer asserts the 403 proves the password right", () => {
  it("the falsified claim is retired", () => {
    const src = read("src/components/layout/login-card.tsx");
    expect(src).not.toContain("the credentials were RIGHT");
  });

  it("the reworded comment encodes the post-F-235b semantics", () => {
    const src = read("src/components/layout/login-card.tsx");
    expect(src).toMatch(/F-235b/);
    expect(src).toMatch(/both arms answer 403/);
  });
});

// ---- F-236i: the goals progressbar precision -----------------------------

describe("F-236i — the goals progressbar carries the displayed precision", () => {
  it("the unrounded value passes through (clamped upstream by goalProgress)", () => {
    const src = read("src/app/(app)/goals/page.tsx");
    expect(src).toContain("aria-valuenow={progress.pct}");
    expect(src).not.toContain("aria-valuenow={Math.round(progress.pct)}");
  });
});

// ---- F-236j: the dead-arm register ----------------------------------------

describe("F-236j — the vendored dead arms document their standing (the F-229f register)", () => {
  // The docs-counts s198 lesson: pins hold CONTENT, never the wrap —
  // the marker phrases hard-wrap at 80 cols.
  const norm = (s: string): string => s.replace(/\s+/g, " ");

  it("button's variant and size arms carry the marker", () => {
    const src = norm(read("src/components/ui/button.tsx"));
    expect(src).toMatch(/F-236j[^|]*?zero consumers today/);
    const markers = src.match(/F-236j/g) ?? [];
    expect(markers.length).toBe(2); // the variant pair + the size family
  });

  it("badge's outline arm carries the marker", () => {
    const src = norm(read("src/components/ui/badge.tsx"));
    expect(src).toMatch(/F-236j[^|]*?zero consumers today/);
  });
});
