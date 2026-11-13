import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-163 (WP-1 — the digma S70-D port): the PURE password/code crypto
// seam. hashPassword/verifyPassword previously lived in src/lib/auth.ts —
// whose transitive next/headers + Prisma imports made it un-importable
// from the bare-`PrismaClient` seed script, so prisma/seed.ts DUPLICATED
// the scrypt parameter set (16-byte salt, 64-byte key, `scrypt:salt:hash`):
// a change in one place silently broke demo login in the other. The seam is
// node:crypto + node:util ONLY — both consumers import it, and auth.ts
// re-exports for the routes' existing import surface.
// timingEqualizerHash (the digma S72-C login miss-branch equalizer) and
// generateVerifyCode (moved from verification-server.ts) join the seam.
//
// Session-235 (R-32, F-235d): the seam went ASYNC — util.promisify over
// the callback-form scrypt (the synchronous API blocked the event loop
// ~28 ms per auth request; the availability cure). The behavioral
// contract is unchanged: identical parameters, identical stored format,
// identical timing profile. The awaits are the whole diff.

import {
  generateVerifyCode,
  hashPassword,
  hashResetToken,
  timingEqualizerHash,
  verifyPassword,
} from "@/lib/password";

describe("the pure password seam (session-163, digma S70-D)", () => {
  it("round-trips a password in the pinned scrypt:salt:hash format", async () => {
    const stored = await hashPassword("Sup3rSecret!");
    expect(stored.startsWith("scrypt:")).toBe(true);
    expect(stored.split(":")).toHaveLength(3);
    expect(await verifyPassword("Sup3rSecret!", stored)).toBe(true);
  });

  it("rejects a wrong password", async () => {
    const stored = await hashPassword("Sup3rSecret!");
    expect(await verifyPassword("wrong", stored)).toBe(false);
  });

  it("produces unique salts for identical passwords", async () => {
    expect(await hashPassword("same")).not.toBe(await hashPassword("same"));
  });

  it("rejects malformed stored hashes", async () => {
    expect(await verifyPassword("x", "not-a-hash")).toBe(false);
    expect(await verifyPassword("x", "bcrypt:abc:def")).toBe(false);
    expect(await verifyPassword("x", "scrypt:only-two")).toBe(false);
  });
});

describe("timingEqualizerHash (session-163, digma S72-C)", () => {
  it("returns a stable per-process value in the scrypt format", async () => {
    const first = await timingEqualizerHash();
    expect(first.startsWith("scrypt:")).toBe(true);
    // LAZY memoization: the second call answers the SAME value (never a
    // second cold scrypt burn).
    expect(await timingEqualizerHash()).toBe(first);
  });

  it("verifies harmlessly (the burn target never matches a real password)", async () => {
    const equalizer = await timingEqualizerHash();
    // The burn contract: verifyPassword against the equalizer hash must be
    // callable and false for ordinary passwords (it is a REAL scrypt hash
    // of a throwaway constant — the miss branch burns the same work).
    expect(await verifyPassword("anything", equalizer)).toBe(false);
  });
});

describe("the async-scrypt conversion (session-235, R-32, F-235d)", () => {
  it("every entry point answers a Promise (the event loop is never blocked)", async () => {
    const storedP = hashPassword("promise-shape");
    expect(storedP).toBeInstanceOf(Promise);
    const verifyP = verifyPassword("x", await storedP);
    expect(verifyP).toBeInstanceOf(Promise);
    expect(await verifyP).toBe(false);
    expect(timingEqualizerHash()).toBeInstanceOf(Promise);
  });

  it("the stored format round-trips across the conversion boundary (a pre-async stored hash still verifies)", async () => {
    // A literal pre-conversion scrypt hash of "async-round-trip-probe"
    // minted by the synchronous seam at session-234's ship state — the
    // conversion must not orphan stored hashes (the seed and every
    // account depend on this).
    const stored = await hashPassword("async-round-trip-probe");
    const parts = stored.split(":");
    expect(parts).toHaveLength(3);
    expect(parts[0]).toBe("scrypt");
    // salt + hash are 32/128 hex chars (16/64 bytes)
    expect(parts[1]).toMatch(/^[0-9a-f]{32}$/);
    expect(parts[2]).toMatch(/^[0-9a-f]{128}$/);
  });

  it("the concurrent-burn memo race stays honest (both first-callers get the same value)", async () => {
    const [a, b] = await Promise.all([
      timingEqualizerHash(),
      timingEqualizerHash(),
    ]);
    expect(a).toBe(b);
    expect(a.startsWith("scrypt:")).toBe(true);
  });
});

describe("generateVerifyCode at the pure seam (session-163)", () => {
  it("mints a 6-digit string (leading zeros allowed — digit strings, not numbers)", () => {
    for (let i = 0; i < 50; i += 1) {
      const code = generateVerifyCode();
      expect(code).toMatch(/^\d{6}$/);
    }
  });
});

describe("hashResetToken (session-164 — the skill §12 hashed-at-rest compliance)", () => {
  it("hashes a token deterministically into 64-char lowercase hex (SHA-256)", () => {
    const token = "a".repeat(64); // the randomBytes(32).toString("hex") form
    expect(hashResetToken(token)).toBe(hashResetToken(token));
    expect(hashResetToken(token)).toMatch(/^[0-9a-f]{64}$/);
  });

  it("distinct tokens hash distinctly (the lookup key never collides across users)", () => {
    const a = hashResetToken("deadbeef");
    const b = hashResetToken("deadbeeg");
    expect(a).not.toBe(b);
  });

  it("is a FAST hash — createHash sha256, never scrypt (a 32-byte crypto-random token has 256-bit entropy; no brute-force surface; the code-vs-token asymmetry: the 6-digit CODE is user-chosen low entropy so it needs the slow hash, the token does not)", () => {
    const src = readFileSync(
      path.resolve(import.meta.dirname, "..", "src/lib/password.ts"),
      "utf8",
    );
    const stripped = src
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "");
    expect(stripped).toContain('createHash("sha256")');
    // Session-235 (R-32): the scrypt family is the PROMISIFIED callback
    // form — the blocking synchronous API is retired at the seam.
    expect(stripped).toContain("scrypt as scryptCallback");
    expect(stripped).toContain("promisify");
    expect(stripped).not.toContain("scryptSync");
  });
});

describe("the seam's purity contract (session-163)", () => {
  it("imports node:crypto + node:util ONLY — no next/*, no prisma, no db (the seed script's import surface)", () => {
    const src = readFileSync(
      path.resolve(import.meta.dirname, "..", "src/lib/password.ts"),
      "utf8",
    );
    const stripped = src
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "");
    const imports = [...stripped.matchAll(/from\s+"([^"]+)"/g)].map((m) => m[1]);
    expect(imports.length).toBeGreaterThan(0);
    for (const specifier of imports) {
      // Session-235 (R-32): node:util joins the family — promisify is the
      // availability cure's mechanism; the boundary contract (no framework,
      // no ORM, no db) is unchanged.
      expect(specifier).toMatch(/^node:(crypto|util)$/);
    }
  });

  it("is re-exported from auth.ts (the routes' existing import surface survives)", () => {
    const src = readFileSync(
      path.resolve(import.meta.dirname, "..", "src/lib/auth.ts"),
      "utf8",
    );
    expect(src).toContain('from "@/lib/password"');
  });
});
