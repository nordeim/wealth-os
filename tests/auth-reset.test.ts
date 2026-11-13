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

  it("swallows P2025 to the no-enumeration 200 and surfaces the transient family as 503", () => {
    const src = forgotRoute();
    expect(src).toContain('"P2025"');
    // Session-238 (R-35, F-238k) recalibration: the P2024/P2028 arms
    // joined the isTransientDbError seam (the F-236b hoist) — the
    // route asserts the seam import + both arm usages (the read
    // path's single-line form and the update path's else-if chain).
    expect(src).toMatch(/import \{[^}]*isTransientDbError[^}]*\} from "@\/lib\/db";/);
    expect(src.match(/isTransientDbError\(error\)/g)?.length ?? 0).toBe(2);
    expect(src.match(/ERR\.UNAVAILABLE\(\);/g)?.length ?? 0).toBe(2);
  });
});

describe("reset-password route contract (session-163, digma S67-A/S76-A/S124-A)", () => {
  it("exists", () => {
    expect(existsSync(path.resolve(import.meta.dirname, "..", "src/app/api/auth/reset-password/route.ts"))).toBe(true);
  });

  it("rate-limits on its own pw-reset: bucket (10/15min — the F-219l disjoint key)", () => {
    const src = resetRoute();
    expect(src).toContain('rateLimit(`pw-reset:${clientKey(req)}`, 10, 15 * 60 * 1000)');
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
    // (the call site, not the import). Session-235 (R-32, F-235d): the
    // hash is computed into a local before the update (the async seam) —
    // the ordering contract is unchanged.
    const routeSrc = resetRoute();
    expect(routeSrc.indexOf("findFirst")).toBeLessThan(
      routeSrc.indexOf("await hashPassword(newPassword)"),
    );
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

  it("read path surfaces P2024/P2028 as 503 — the F-220k sibling the R-17 cure missed (F-221g)", () => {
    // The blanket `.catch(() => null)` on the token lookup maps a
    // pool/transaction timeout to "invalid token" — a user holding a
    // VALID single-use link is told it expired during a DB outage.
    // The forgot-password read path (F-220k) and THIS route's update
    // path (F-218q) both cure the class; the read path must mirror.
    // The pin asserts the POSITIVE form (the guard exists), not
    // merely the catch's absence — the F-218b lesson.
    const src = resetRoute();
    expect(src).not.toMatch(/findFirst\([\s\S]*?\)\.catch\(\(\) => null\)/);
    // The read arm carries its own transient-abort 503 BEFORE the
    // invalid-token 400 fires (the same family the update path
    // answers). Session-238 (R-35, F-238k) recalibration: the seam
    // arm form (the inline codes joined the F-236b hoist) — the
    // ordering compares the ARM's usage, not the import line.
    const readArm = src.slice(0, src.indexOf("updateMany"));
    expect(readArm).toMatch(/if \(isTransientDbError\(error\)\) return ERR\.UNAVAILABLE\(\);/);
    expect(readArm.indexOf("if (isTransientDbError(error))")).toBeGreaterThan(readArm.indexOf("findFirst"));
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

  it("surfaces the transient family as the 503 arm (both catch blocks)", () => {
    const src = resetRoute();
    // Session-238 (R-35, F-238k) recalibration: the seam form.
    expect(src).toMatch(/import \{[^}]*isTransientDbError[^}]*\} from "@\/lib\/db";/);
    expect(src.match(/if \(isTransientDbError\(error\)\) return ERR\.UNAVAILABLE\(\);/g)?.length ?? 0).toBe(2);
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
    // Session-235 (R-32): the seam went async — the burn carries its
    // awaits, and F-235b moved the unverified gate above the credential
    // check with its own equalizer burn (both gate arms answer 403).
    expect(src).toContain("await verifyPassword(password, await timingEqualizerHash())");
    // the gate branch (the F-235b oracle closure) burns the same equalizer
    const gateBurns = src.match(/await verifyPassword\(password, await timingEqualizerHash\(\)\);/g) ?? [];
    expect(gateBurns.length).toBeGreaterThanOrEqual(2);
  });

  it("the 401 envelope stays byte-identical (INVALID_CREDENTIALS, 'Invalid email or password')", () => {
    const src = stripComments(read("src/app/api/auth/login/route.ts") ?? "");
    expect(src).toContain('"INVALID_CREDENTIALS"');
    expect(src).toContain('"Invalid email or password"');
  });
});
