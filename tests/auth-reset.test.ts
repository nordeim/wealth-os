import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-163 (WP-3 — the digma reset-flow port): the route-contract pins
// for the two NEW auth endpoints. House convention (the s67 auth-contract
// precedent): source-contract pins read COMMENT-STRIPPED sources — a
// literal pinned by a record comment alone is a vacuous pin. The surfaces:
// - forgot-password: the no-enumeration 200 (same body known/unknown), the
//   randomBytes(32) token, the 60-min TTL, the P2025-swallow, the
//   P2024/P2028→503 family, the NEO_DISABLE_IN_APP_RESET knob.
// - reset-password: the token-FIRST ordering, the atomic conditional
//   updateMany consumption (token + live expiry in the WHERE, count===0 →
//   the invalid-token 400), the tokenVersion increment (the eviction), the
//   8..200 password window, the P2024/P2028→503 family.

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : null;
}

function stripComments(src: string) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const forgotRoute = () => stripComments(read("src/app/api/auth/forgot-password/route.ts") ?? "");
const resetRoute = () => stripComments(read("src/app/api/auth/reset-password/route.ts") ?? "");

describe("forgot-password route contract (session-163, digma S46/S64/S66/S124)", () => {
  it("exists", () => {
    expect(existsSync(path.resolve(import.meta.dirname, "..", "src/app/api/auth/forgot-password/route.ts"))).toBe(true);
  });

  it("rate-limits on its own forgot: bucket (10/15min, the auth family's posture)", () => {
    const src = forgotRoute();
    expect(src).toContain('rateLimit(`forgot:${clientKey(req)}`, 10, 15 * 60 * 1000)');
  });

  it("parses through the Zod seam (parseBody composes the N-67d declared-size pre-gate)", () => {
    const src = forgotRoute();
    expect(src).toContain("await parseBody(req, forgotPasswordSchema)");
  });

  it("carries the no-enumeration 200 message verbatim (known and unknown emails alike)", () => {
    const src = forgotRoute();
    expect(src).toContain(
      '"If an account exists with this email, you will receive a password reset link."',
    );
  });

  it("mints a 32-byte crypto-random token with a 60-minute TTL", () => {
    const src = forgotRoute();
    expect(src).toContain("randomBytes(32).toString");
    expect(src).toContain("60 * 60 * 1000");
  });

  it("stores the token HASHED at rest (session-164 — the skill §12 compliance; the raw token lives only in the delivery URL)", () => {
    const src = forgotRoute();
    expect(src).toContain("resetToken: hashResetToken(token)");
    expect(src).not.toContain("resetToken: token,");
  });

  it("gates the in-app resetUrl delivery behind NEO_DISABLE_IN_APP_RESET", () => {
    const src = forgotRoute();
    expect(src).toContain('process.env.NEO_DISABLE_IN_APP_RESET !== "1"');
  });

  it("renders the reset URL RELATIVE (the standalone-deploy cookie contract)", () => {
    const src = forgotRoute();
    expect(src).toContain("`/reset-password?token=${token}`");
  });

  it("swallows P2025 to the no-enumeration 200 and surfaces P2024/P2028 as 503", () => {
    const src = forgotRoute();
    expect(src).toContain('"P2025"');
    expect(src).toContain('"P2024"');
    expect(src).toContain('"P2028"');
    expect(src).toContain("503");
  });
});

describe("reset-password route contract (session-163, digma S67-A/S76-A/S124-A)", () => {
  it("exists", () => {
    expect(existsSync(path.resolve(import.meta.dirname, "..", "src/app/api/auth/reset-password/route.ts"))).toBe(true);
  });

  it("rate-limits on its own reset: bucket (10/15min)", () => {
    const src = resetRoute();
    expect(src).toContain('rateLimit(`reset:${clientKey(req)}`, 10, 15 * 60 * 1000)');
  });

  it("parses through the Zod seam (parseBody composes the declared-size pre-gate)", () => {
    expect(resetRoute()).toContain("await parseBody(req, resetPasswordSchema)");
  });

  it("validates the token BEFORE the password (the schema's field order carries digma's measured ordering)", () => {
    const schemaSrc = stripComments(read("src/lib/schemas.ts") ?? "");
    const tokenIndex = schemaSrc.indexOf("reset_token");
    const passwordIndex = schemaSrc.indexOf("new_password");
    expect(tokenIndex).toBeGreaterThan(-1);
    expect(passwordIndex).toBeGreaterThan(tokenIndex);
    // And the route's DB-level token-alive check precedes the hash write
    // (the call site, not the import).
    const routeSrc = resetRoute();
    expect(routeSrc.indexOf("findFirst")).toBeLessThan(routeSrc.indexOf("passwordHash: hashPassword"));
  });

  it("consumes the token ATOMICALLY: updateMany with the HASHED token + live expiry in the WHERE", () => {
    const src = resetRoute();
    expect(src).toContain("updateMany");
    expect(src).toMatch(/where:\s*\{\s*id: user\.id,\s*resetToken: hashResetToken\(resetToken\),[\s\S]*?resetTokenExpiresAt:\s*\{\s*gt:\s*new Date\(\)\s*\}/);
  });

  it("looks the row up by the HASHED token (a DB read compromise never mints live reset URLs — session-164)", () => {
    const src = resetRoute();
    expect(src).toContain("findFirst({ where: { resetToken: hashResetToken(resetToken) } })");
  });

  it("answers the invalid-token 400 when the conditional write lands count 0 (the racing replay)", () => {
    const src = resetRoute();
    expect(src).toContain("result.count === 0");
    expect(src).toContain('"Invalid or expired reset token"');
  });

  it("increments tokenVersion on reset (the eviction — every pre-reset cookie dies)", () => {
    const src = resetRoute();
    expect(src).toContain("tokenVersion: { increment: 1 }");
  });

  it("clears the consumed token (single-use — a replay answers the invalid-token 400)", () => {
    const src = resetRoute();
    expect(src).toContain("resetToken: null");
    expect(src).toContain("resetTokenExpiresAt: null");
  });

  it("surfaces P2024/P2028 as the 503 family", () => {
    const src = resetRoute();
    expect(src).toContain('"P2024"');
    expect(src).toContain('"P2028"');
    expect(src).toContain("503");
  });
});

describe("the session eviction wiring (session-163, digma S67-A)", () => {
  it("getSessionUser compares the live row's tokenVersion against the token's v", () => {
    const src = stripComments(read("src/lib/auth.ts") ?? "");
    expect(src).toContain("tokenVersion");
  });

  it("the schema carries the three new User columns", () => {
    const schema = read("prisma/schema.prisma") ?? "";
    expect(schema).toContain("tokenVersion");
    expect(schema).toContain("resetToken");
    expect(schema).toContain("resetTokenExpiresAt");
  });

  it("the schema comment documents the hashed-at-rest storage (session-164)", () => {
    const schema = read("prisma/schema.prisma") ?? "";
    expect(schema).toContain("hashResetToken");
    expect(schema).toContain("hashed");
  });

  it("the seed's user upserts CLEAR the reset funnel (a stale pending token never survives a re-seed — session-164)", () => {
    const seed = stripComments(read("prisma/seed.ts") ?? "");
    // every update block carries the null-clearing pair, the same posture
    // as the verification fields
    const updateBlocks = seed.match(/update:\s*\{[\s\S]*?\},/g) ?? [];
    expect(updateBlocks.length).toBeGreaterThanOrEqual(1);
    for (const block of updateBlocks) {
      expect(block).toContain("resetToken: null");
      expect(block).toContain("resetTokenExpiresAt: null");
    }
  });
});

describe("the login timing equalizer wiring (session-163, digma S72-C)", () => {
  it("the login route burns the equalizer scrypt on the unknown-email miss branch", () => {
    const src = stripComments(read("src/app/api/auth/login/route.ts") ?? "");
    expect(src).toContain("timingEqualizerHash");
    expect(src).toContain("verifyPassword(password, timingEqualizerHash())");
  });

  it("the 401 envelope stays byte-identical (INVALID_CREDENTIALS, 'Invalid email or password')", () => {
    const src = stripComments(read("src/app/api/auth/login/route.ts") ?? "");
    expect(src).toContain('"INVALID_CREDENTIALS"');
    expect(src).toContain('"Invalid email or password"');
  });
});
