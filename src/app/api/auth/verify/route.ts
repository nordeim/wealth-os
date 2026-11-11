import { db } from "@/lib/db";
import { ok, fail, ERR, parseBody } from "@/lib/api";
import { setSessionCookie } from "@/lib/auth";
import { verifySchema } from "@/lib/schemas";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import {
  VERIFICATION_MAX_ATTEMPTS,
  isVerificationLockedOut,
  isVerificationPending,
  verificationLockoutMessage,
  verificationRemainingMessage,
} from "@/lib/verification";
import { verifyVerificationCode } from "@/lib/verification-server";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/verify — session-21 (S21-P5), the verify-email view's
 * submit. Every banner string is live-verified against the reference
 * (2026-10-01, the wrong-code ladder across two throwaway signups):
 * "Please enter all 6 digits" → "Invalid verification code. N attempts
 * remaining." (4…1) → "Too many failed attempts. Please request a new
 * verification code." (the 5th failure and every one after; the button
 * stays enabled, the message repeats). A correct code signs the account
 * in and redirects to the dashboard.
 */
export async function POST(req: Request) {
  const limit = rateLimit(`verify:${clientKey(req)}`, 20, 15 * 60 * 1000);
  // Session-38 (S38-P6): the opportunistic bucket sweep (login's
  // placement — see the signup note; S39-P7 moved it before the denied
  // return so denied requests sweep too).
  sweepRateLimits();
  // Session-67 (N-67h): the denied 429 carries the Retry-After header
  // like the rest of the family.
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  // Session-163: the Zod parse seam (pre-gate + email/code schema in one
  // call — the digit-stripping and the 6-length check ride the schema).
  const parsed = await parseBody(req, verifySchema);
  if (!parsed.ok) return parsed.response;
  const { email, code } = parsed.data;

  // Session-37 (S37-P1): the whole DB tail joins the envelope — the
  // findUnique and both user.update failures stay inside { ok, error }.
  // The 4xx returns inside the try bypass the catch by construction
  // (returns are not throws); setSessionCookie is cookie-signing only
  // (no DB) and rides the try for simplicity.
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user || !user.verificationCodeHash || !isVerificationPending(user.verificationExpiresAt)) {
      // No pending code: behave like the reference's generic failure (the
      // banner family) without leaking whether the account exists.
      // Session-223 (R-20, F-223l): the remaining-message form — the
      // old lockout-shaped answer was a pending-state enumeration
      // oracle (a known+live code answered the LADDER text while
      // every other case answered the lockout text); the unified form
      // makes the two 400 bodies identical for any email.
      return fail(
        "VERIFICATION_INVALID",
        verificationRemainingMessage(VERIFICATION_MAX_ATTEMPTS),
        400,
      );
    }

    // The lockout check rides BEFORE the code compare (the reference's
    // ladder: five wrong submissions, then the lockout message repeats).
    if (isVerificationLockedOut(user.verificationAttempts)) {
      return fail("VERIFICATION_LOCKED", verificationLockoutMessage(), 429);
    }

    if (!verifyVerificationCode(code, user.verificationCodeHash)) {
      // Session-67 (N-67c): the counter increments ATOMICALLY server-side
      // (the DB's own increment) — the read-modify-write form could let
      // concurrent submissions overshoot the 5-wrong lockout against one
      // code. Prisma's update returns the post-increment record, which
      // carries the value the lockout/remaining ladder reads.
      const { verificationAttempts: attempts } = await db.user.update({
        where: { id: user.id },
        data: { verificationAttempts: { increment: 1 } },
      });
      if (isVerificationLockedOut(attempts)) {
        return fail("VERIFICATION_LOCKED", verificationLockoutMessage(), 429);
      }
      const remaining = VERIFICATION_MAX_ATTEMPTS - attempts;
      return fail("VERIFICATION_INVALID", verificationRemainingMessage(remaining), 400);
    }

    // Success: clear the code, sign the account in (the reference's
    // post-verification funnel completes into the session).
    await db.user.update({
      where: { id: user.id },
      data: {
        verificationCodeHash: null,
        verificationAttempts: 0,
        verificationExpiresAt: null,
      },
    });
    // Session-163 (the digma S67-A port): the mint carries the live
    // row's tokenVersion.
    await setSessionCookie(user.id, user.tokenVersion);
    return ok({ id: user.id, email: user.email, verified: true });
  } catch {
    return ERR.INTERNAL();
  }
}
