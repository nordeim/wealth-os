/**
 * The email-verification machinery — session 21 (S21-P5).
 *
 * The reference's signup flow swaps the login card to a "Verify your email"
 * view after account creation: a 6-digit code is sent to the signup email,
 * and the view accepts it through six single-digit inputs. Five wrong
 * submissions lock the code out until a resend ("Too many failed attempts.
 * Please request a new verification code."), and a resend mints a fresh
 * code with a reset attempt counter ("New verification code sent to your
 * email."). An UNVERIFIED account that tries to sign in gets "Please verify
 * your email before logging in. Check your email for the verification
 * code." — every string in this module is live-verified against the
 * reference (2026-10-01, eleven wrong-code submissions across two throwaway
 * signups).
 *
 * This module is CLIENT-SAFE by design: pure constants and message
 * builders, zero imports — the login card consumes the banner strings
 * directly. The code generator and the scrypt hashing ride
 * `src/lib/verification-server.ts` (server-only: node:crypto + the auth
 * layer). Self-hosted delivery: the reference emails the code through its
 * platform; a self-hosted clone has no mail transport, so the code is
 * logged to the SERVER console at signup/resend time (never shipped to the
 * client, never committed).
 */

/** The code length — six single-digit inputs on the reference's view. */
export const VERIFICATION_CODE_LENGTH = 6;

/** Total wrong submissions before lockout (the live ladder: 4…1 then out). */
export const VERIFICATION_MAX_ATTEMPTS = 5;

/** The code's lifetime in milliseconds (15 minutes). */
export const VERIFICATION_TTL_MS = 15 * 60 * 1000;

/** "Invalid verification code. N attempts remaining." — the ladder body. */
export function verificationRemainingMessage(remaining: number): string {
  return `Invalid verification code. ${remaining} attempts remaining.`;
}

/** The post-ladder lockout message (verbatim from the reference). */
export function verificationLockoutMessage(): string {
  return "Too many failed attempts. Please request a new verification code.";
}

/** The unverified-login refusal (verbatim from the reference). */
export function verificationRequiredMessage(): string {
  return "Please verify your email before logging in. Check your email for the verification code.";
}

/** The resend confirmation (verbatim from the reference). */
export function verificationResentMessage(): string {
  return "New verification code sent to your email";
}

/** The empty/incomplete-code message (verbatim from the reference). */
export function verificationIncompleteMessage(): string {
  return "Please enter all 6 digits";
}

/** True when the stored attempts have exhausted the ladder. */
export function isVerificationLockedOut(attempts: number): boolean {
  return attempts >= VERIFICATION_MAX_ATTEMPTS;
}

/**
 * True when a stored expiry timestamp (epoch ms) is still in the future.
 * A null expiry (pre-session-21 rows, the seeded demo users) means
 * "no verification required" — the account predates the flow.
 */
export function isVerificationPending(expiresAt: Date | string | null | undefined): boolean {
  if (expiresAt === null || expiresAt === undefined) return false;
  const exp = typeof expiresAt === "string" ? new Date(expiresAt).getTime() : expiresAt.getTime();
  return Number.isFinite(exp) && exp > Date.now();
}

/**
 * Session-233 (R-30, F-233a): the six-box code-entry reducer. Applies a
 * raw edit to ONE box and returns the next code array plus the box focus
 * should land on.
 *
 * The pre-cure handler kept only the LAST character of whatever landed in
 * a box — correct for typing, catastrophic for the multi-digit forms: the
 * first box carries autoComplete="one-time-code", so Chrome/Android/iOS
 * insert the FULL code there and the collapse reduced it to one digit;
 * every whole-code paste failed the same way (the "enter all 6 digits"
 * guard blocked a submit the user believed they had completed).
 *
 * Contract (behavioral pins in tests/verification-code.test.ts):
 *  - a single digit fills the box and focus advances (the last box keeps
 *    focus — the pre-cure walk, byte-identical);
 *  - an empty or non-digit edit clears the box and never moves focus
 *    (the pre-cure clear);
 *  - a MULTI-digit edit (paste, autofill, an over-typed box) distributes
 *    its digits across the boxes from the edited one — overwriting any
 *    prior values there, truncating at the final box — and focus lands
 *    on the box AFTER the last filled one (the final box when full).
 *
 * NO maxLength rides the inputs: a browser-enforced cap truncates a paste
 * BEFORE the change handler ever sees the full value, which would
 * re-break the exact path this seam cures.
 */
export function applyCodeInput(
  prev: readonly string[],
  idx: number,
  raw: string,
): { next: string[]; focusIndex: number } {
  const digits = raw.replace(/\D/g, "");
  if (digits === "") {
    const next = [...prev];
    next[idx] = "";
    return { next, focusIndex: idx };
  }
  if (digits.length > 1) {
    const next = [...prev];
    // Session-234 (R-31, F-234c): an edit carrying EXACTLY the code's
    // length restarts the distribution at box 1 — the session-233 form
    // started at the EDITED box, so the type-then-paste flow (one digit
    // typed, the whole code pasted after it) produced a complete but
    // ROTATED code that passed the length guard and burned an attempt
    // (the fails-safe-to-fails-dangerous residue of the F-233a cure).
    // Partial pastes keep distributing from the edited box.
    const start = digits.length === next.length ? 0 : idx;
    let last = start;
    for (let k = 0; k < digits.length && start + k < next.length; k++) {
      next[start + k] = digits[k] ?? "";
      last = start + k;
    }
    return { next, focusIndex: Math.min(last + 1, next.length - 1) };
  }
  const next = [...prev];
  next[idx] = digits;
  return { next, focusIndex: Math.min(idx + 1, next.length - 1) };
}
