import { hashPassword, verifyPassword, generateVerifyCode } from "@/lib/password";

export { generateVerifyCode };

/**
 * The server side of the email-verification machinery — session 21
 * (S21-P5). SERVER-ONLY by convention (the routes that consume it are
 * server routes). Session-163 (the digma S70-D port): the crypto trio +
 * the code generator moved to the PURE seam `src/lib/password.ts`
 * (node:crypto-only — importable from the seed script); this module
 * keeps the verification-shaped wrappers on the seam and re-exports
 * the generator under its historical name for any stragglers (the
 * routes now import `generateVerifyCode` from the seam directly).
 * The client-safe constants and message builders live in
 * `src/lib/verification.ts`.
 */

/** Hashes a code for storage (the scrypt format the auth layer already uses). */
export async function hashVerificationCode(code: string): Promise<string> {
  return hashPassword(code);
}

/**
 * Constant-time-ish code check routed through the auth layer's scrypt
 * verify (salted + timing-safe digest comparison under the hood).
 */
export async function verifyVerificationCode(
  code: string,
  storedHash: string,
): Promise<boolean> {
  return verifyPassword(code, storedHash);
}
