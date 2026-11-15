import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-246 (R-43) — the guard-advance, seam-convergence, and
// palette-truth round's source battery. Every pin here anchors on the
// CODE form (the F-244e lesson: never on any string a comment can also
// carry) and was born RED against the pre-cure tree unless its header
// says green-by-design.

const read = (rel: string): string =>
  readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf-8");

// ---- F-246b: the logout seam convergence ------------------------------------

describe("F-246b — logout joins the requireJsonContentType seam", () => {
  it("the route imports and calls the seam before the writes burn", () => {
    const src = read("src/app/api/auth/logout/route.ts");
    expect(src).toContain("requireJsonContentType");
    const gateAt = src.indexOf("await requireJsonContentType(req)");
    const burnAt = src.indexOf("rateLimit(`writes:");
    expect(gateAt, "the seam call not found").toBeGreaterThan(-1);
    expect(burnAt, "the writes burn not found").toBeGreaterThan(-1);
    // The F-234g/F-243a order, converged edition: the seam's call is the
    // gate; the burn still rides inside the sessioned arm after it.
    expect(gateAt).toBeLessThan(burnAt);
  });

  it("the inline predicate retires (the family converged through one wrapper)", () => {
    // The F-238b never-N-copies rule, executed on its own seventh
    // surface: the predicate lived at three hand-maintained sites
    // (readBoundedJson's Layer 1, the seam, logout's inline copy); the
    // route now carries ZERO inline copies — the seam is the one call.
    const src = read("src/app/api/auth/logout/route.ts");
    expect(src).not.toContain('req.headers.get("content-type")');
    expect(src).not.toContain("contentType.toLowerCase()");
  });
});

// ---- F-246d: the auth-family select narrowings -------------------------------

describe("F-246d — the four public-funnel reads carry explicit selects", () => {
  // The F-228h getSessionUser precedent, brought to the four public
  // auth routes: a full-row read hauls passwordHash/resetToken/
  // verificationCodeHash into handler scope where a subset is consumed;
  // the explicit select is the insurance a future "return the fetched
  // row" edit cannot silently convert into a secret leak.

  it("login selects the credential/verification/session/response fields", () => {
    const src = read("src/app/api/auth/login/route.ts");
    expect(src).toMatch(/findUnique\(\{\s*where: \{ email \},\s*select: \{/);
    const at = src.indexOf("findUnique({");
    const slice = src.slice(at, at + 600);
    expect(slice).toContain("passwordHash: true");
    expect(slice).toContain("verificationCodeHash: true");
    expect(slice).toContain("tokenVersion: true");
    // The route never reads the reset funnel's secrets — they stay
    // out of scope.
    expect(slice).not.toContain("resetToken");
    expect(slice).not.toContain("photoUrl");
  });

  it("verify selects the verification trio + identity + version", () => {
    const src = read("src/app/api/auth/verify/route.ts");
    expect(src).toMatch(/findUnique\(\{\s*where: \{ email \},\s*select: \{/);
    const at = src.indexOf("findUnique({");
    const slice = src.slice(at, at + 600);
    expect(slice).toContain("verificationCodeHash: true");
    expect(slice).toContain("verificationExpiresAt: true");
    expect(slice).toContain("verificationAttempts: true");
    expect(slice).toContain("tokenVersion: true");
    // The route never reads the credential or the reset funnel.
    expect(slice).not.toContain("passwordHash");
    expect(slice).not.toContain("resetToken");
  });

  it("resend selects the hash-present check + identity only", () => {
    const src = read("src/app/api/auth/resend/route.ts");
    expect(src).toMatch(/findUnique\(\{\s*where: \{ email \},\s*select: \{/);
    const at = src.indexOf("findUnique({");
    const slice = src.slice(at, at + 400);
    expect(slice).toContain("verificationCodeHash: true");
    expect(slice).toContain("id: true");
    // The re-arm route reads no credential and no reset secret.
    expect(slice).not.toContain("passwordHash");
    expect(slice).not.toContain("resetToken");
  });

  it("forgot-password selects id only (the strongest narrowing)", () => {
    const src = read("src/app/api/auth/forgot-password/route.ts");
    expect(src).toMatch(/findUnique\(\{\s*where: \{ email \},\s*select: \{ id: true \}\s*,?\s*\}\);?\s*$/m);
    // The no-enumeration funnel consumes existence alone; every secret
    // column stays out of the handler's scope.
    const at = src.indexOf("findUnique({");
    const slice = src.slice(at, at + 300);
    expect(slice).not.toContain("passwordHash");
    expect(slice).not.toContain("verificationCodeHash");
    expect(slice).not.toContain("resetToken");
  });
});

// ---- F-246e: the unused import retirement ------------------------------------

describe("F-246e — forgot-password's api import carries no dead identifiers", () => {
  it("the @/lib/api import line lists only the route's live consumers", () => {
    const src = read("src/app/api/auth/forgot-password/route.ts");
    const importLine = src
      .split("\n")
      .find((l) => l.includes('from "@/lib/api"'));
    expect(importLine, "the api import line not found").toBeDefined();
    // The pre-cure line imported `fail` without ever calling it — the
    // strict-ts blind spot (no noUnusedLocals). The pin keys on the
    // import line itself so a re-added dead identifier fails here.
    expect(importLine).not.toMatch(/\bfail\b/);
  });
});

// ---- F-246f: the grow zero-match symmetry leg ---------------------------------

describe("F-246f — the sixth retired bare word carries its dedicated leg", () => {
  it("the two former grow carriers stay reworded (the parity-245 symmetry)", () => {
    // Five of the six F-245e words carry parity-245 zero-match legs;
    // grow relied solely on the BARE_UTILITY_WORDS net (whose csv.ts
    // regex-swallow blind spot could fabricate liveness in its span).
    // The dedicated two-file leg closes the asymmetry — green-by-design
    // at birth over the already-reworded tree, a regression guard
    // exactly like its five siblings.
    for (const file of ["src/app/api/reset/route.ts", "src/lib/db-path.ts"]) {
      expect(read(file), `${file}: the retired word resurfaced`).not.toMatch(
        /\bgrow\b/,
      );
    }
  });
});
