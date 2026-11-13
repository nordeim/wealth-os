import { db, isTransientDbError } from "@/lib/db";
import { ERR, logApiError, ok, parseBody } from "@/lib/api";
import { resendSchema } from "@/lib/schemas";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { VERIFICATION_TTL_MS, verificationResentMessage } from "@/lib/verification";
import { hashVerificationCode } from "@/lib/verification-server";
import { generateVerifyCode } from "@/lib/password";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/resend — session-21 (S21-P5), the verify-email view's
 * "Didn't receive the code? Resend". The reference answers with the info
 * banner "New verification code sent to your email" (live-verified) and
 * the resend resets the attempts ladder (the lockout message names the
 * resend as the recovery path). Like the signup route, the fresh code is
 * stored hashed and logged to the SERVER console — never shipped to the
 * client.
 */
export async function POST(req: Request) {
  const limit = rateLimit(`resend:${clientKey(req)}`, 5, 15 * 60 * 1000);
  // Session-38 (S38-P6): the opportunistic bucket sweep (login's
  // placement — see the signup note; S39-P7 moved it before the denied
  // return so denied requests sweep too).
  sweepRateLimits();
  // Session-67 (N-67h): the denied 429 carries the Retry-After header
  // like the rest of the family.
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  // Session-163: the Zod parse seam (pre-gate + the email contract).
  const parsed = await parseBody(req, resendSchema);
  if (!parsed.ok) return parsed.response;
  const { email } = parsed.data;

  // Session-225 (R-22, F-225c): the email-keyed secondary bucket —
  // the F-222n mirror. Resend re-arms ANY hash-present account and
  // RESETS the attempts ladder, so a rotating caller could cycle
  // resend -> 5 verify guesses -> resend indefinitely under the
  // per-IP caps alone (the old F-222p citation's "5/IP" bound is
  // the exact voidable cap F-222n documented). Sized above the
  // per-IP cap (10 vs 5) so single-IP flows are unchanged; fired
  // BEFORE any account-existence check (no oracle added).
  //
  // Session-226 (R-23, F-226h) — the recorded trade-off: the bucket
  // is third-party-exhaustable (10 junk resends / 15 min on a known
  // email 429 the victim's legitimate resends for the window).
  // Deliberate, same as verify: existence-check-first would reopen
  // the enumeration oracle; the self-healing bounded lockout is the
  // lesser risk.
  const acctLimit = rateLimit(`resend-acct:${email}`, 10, 15 * 60 * 1000);
  if (!acctLimit.allowed) return ERR.RATE_LIMITED(acctLimit.retryAfterSec);

  // Session-37 (S37-P1): the auth family joins the envelope — the
  // findUnique/update failures stay inside { ok, error }.
  try {
    const user = await db.user.findUnique({ where: { email } });
    // Session-217 (R-14, F-217d): the resend re-arms for ANY hash-present
    // account — the pre-217 `!isVerificationPending(...)` arm no-opped
    // for expired codes, locking a never-verified account out of its
    // own recovery path (the login gate blocks it, the resend cannot
    // refresh it). A present hash = never verified (verify-success
    // clears it); unknown accounts keep the identical non-leaking
    // banner.
    if (!user || !user.verificationCodeHash) {
      // Unknown account or nothing to resend: answer with the same info
      // banner (the reference's non-leaking posture) — a rate-limited no-op.
      // Session-228 (R-25, F-228e): the timing equalizer — the miss
      // branch burns the SAME scrypt shape the known branch burns
      // (hashVerificationCode over a freshly generated code), so latency
      // cannot distinguish the never-verified state the identical banner
      // hides (login's S72-C pattern). The known branch's DB-write tail
      // remains a documented fsync-scale residual.
      await hashVerificationCode(generateVerifyCode());
      return ok({ resent: true, message: verificationResentMessage() });
    }

    const code = generateVerifyCode();
    const verificationCodeHash = await hashVerificationCode(code);
    await db.user.update({
      where: { id: user.id },
      data: {
        verificationCodeHash,
        verificationAttempts: 0,
        verificationExpiresAt: new Date(Date.now() + VERIFICATION_TTL_MS),
      },
    });

    // Session-216 (R-13, F-216g): the OTP log rides the in-app branch —
    // the code prints ONLY when the response also carries it (the demo
    // dev posture). With NEO_DISABLE_IN_APP_OTP=1 (the production
    // posture: codes hashed at rest, a mail transport owns the delivery)
    // a code-less audit line is all that lands in the logs.
    const inAppOtpEnabled = process.env.NEO_DISABLE_IN_APP_OTP !== "1";
    if (inAppOtpEnabled) {
      console.info(`[verification] code for ${email}: ${code} (expires in 15 minutes)`);
    } else {
      console.info(`[verification] verification code issued for ${email} (delivery delegated to the mail transport)`);
    }

    // Session-163 (the digma ADR-014 port): the in-app OTP delivery —
    // the fresh code rides the response for the demo workflow (and the
    // e2e resend funnel), NEO_DISABLE_IN_APP_OTP=1 gated.
    return ok({
      resent: true,
      message: verificationResentMessage(),
      verificationCode: inAppOtpEnabled ? code : null,
    });
  } catch (error) {
    logApiError("auth/resend POST", error);
    // Session-237 (R-34, F-237b): the transient arm joins the auth
    // family — the sibling forgot-password/reset-password/reset routes
    // already answered a pool/transaction timeout with the honest 503;
    // these catches answered the generic 500 with retry advice for a
    // condition a retry cannot clear.
    if (isTransientDbError(error)) return ERR.UNAVAILABLE();
    return ERR.INTERNAL();
  }
}
