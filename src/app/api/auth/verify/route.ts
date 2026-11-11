import { db } from "@/lib/db";
import { ERR, fail, logApiError, ok, parseBody } from "@/lib/api";
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

  // Session-225 (R-22, F-225c): the email-keyed secondary bucket —
  // the F-222n mirror this route never received. The per-IP 20/15
  // above is voidable by a rotating XFF (the login route's own
  // decode), and this route's success path SIGNS THE CALLER IN, so
  // the OTP-guessing surface needs the bound the IP cap cannot
  // give. Sized above the per-IP cap (60 vs 20) so single-IP flows
  // are unchanged; fired BEFORE any account-existence check (a
  // per-email key adds no oracle). This supersedes the old F-222p
  // mitigation citation ("bounded by 6-digit entropy + 5/IP" on
  // resend — the same voidable bound F-222n proved); the honest
  // bound is the email-keyed bucket on BOTH routes.
  //
  // Session-226 (R-23, F-226h) — the recorded trade-off: the bucket
  // keys on the caller-supplied email and increments BEFORE any
  // existence check, so a third party who knows a victim's email
  // can EXHAUST it (60 junk probes / 15 min) and 429 the victim's
  // legitimate verification for the window. Deliberate: the
  // alternative (existence-check-first) reopens the enumeration
  // oracle the no-leak banners exist to close; a self-healing,
  // bounded lockout is the lesser risk. The e2e rotating legs
  // demonstrate exactly this burn.
  const acctLimit = rateLimit(`verify-acct:${email}`, 60, 15 * 60 * 1000);
  if (!acctLimit.allowed) return ERR.RATE_LIMITED(acctLimit.retryAfterSec);

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
      // every other case answered the lockout text).
      // Session-224 (R-21, F-224b): the FIRST RUNG — the wrong-code
      // branch increments BEFORE replying, so its reachable values
      // are 4…1 (then 429); answering MAX left a numeric tell (a
      // single probe read "5 attempts remaining" ⟺ no pending code).
      // The residual two-probe differential (4,4 vs 4,3) is
      // documented: full closure needs per-email state on this
      // stateless branch, and a mimic counter would diverge from the
      // real ladder on restart and on fresh signups — rejected.
      return fail(
        "VERIFICATION_INVALID",
        verificationRemainingMessage(VERIFICATION_MAX_ATTEMPTS - 1),
        400,
      );
    }

    // The lockout check rides BEFORE the code compare (the reference's
    // ladder: five wrong submissions, then the lockout message repeats).
    // Session-224 (F-224l): this 429 is the attempt-COUNTER response,
    // not the limiter's — it carries no Retry-After because the
    // lockout lifts only on a RESEND (no deterministic retry instant
    // exists; the code is VERIFICATION_LOCKED, not RATE_LIMITED).
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
  } catch (error) {
    logApiError("auth/verify POST", error);
    return ERR.INTERNAL();
  }
}
