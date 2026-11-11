import { db } from "@/lib/db";
import { ok, fail, ERR, parseBody } from "@/lib/api";
import { verifyPassword, timingEqualizerHash, setSessionCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/schemas";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { verificationRequiredMessage } from "@/lib/verification";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const limit = rateLimit(`login:${clientKey(req)}`, 10, 15 * 60 * 1000);
  sweepRateLimits();
  // Session-67 (N-67h): the 429 joins the ERR family — the hand-built
  // NextResponse block is retired; the Retry-After header it carried
  // moves into ERR.RATE_LIMITED so every auth route ships it.
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  // Session-163: the Zod parse seam (the declared-size pre-gate + the
  // schema + the composite required message, one call — the N-67d pre-gate
  // and the N-63i email cap ride inside parseBody).
  const parsed = await parseBody(req, loginSchema);
  if (!parsed.ok) return parsed.response;
  const { email, password } = parsed.data;

  // Session-222 (R-19, F-222n): the per-account secondary bucket —
  // the default proxy posture (unset NEO_PROXY_HOPS = depth 1) keys
  // clientKey on client-suppliable XFF/x-real-ip, so a
  // header-rotating caller voids every per-IP cap on a
  // direct-exposure deploy. The email-keyed bucket bounds the
  // distributed credential attack regardless of IP keying: 30/15min
  // sits ABOVE the per-IP cap (10/15) so every single-IP flow (the
  // smoke ladder's 10-then-429, the e2e battery, the capture
  // toolchain) trips the IP bucket first — zero behavior change for
  // legitimate flows. Fired BEFORE any account-existence check: the
  // 429 is identical for known and unknown emails (no enumeration
  // oracle).
  const acctLimit = rateLimit(
    `login-acct:${email}`,
    30,
    15 * 60 * 1000,
  );
  if (!acctLimit.allowed) return ERR.RATE_LIMITED(acctLimit.retryAfterSec);

  // Session-40 (S40-P5): the read + verification + cookie-set tail
  // joins the envelope — this was the ONLY auth-route DB read left
  // unwrapped (a SQLITE_BUSY-class failure answered a raw non-JSON
  // 500; signup/verify/resend wrapped theirs in s37). The returns
  // inside the try are the handler's own responses — the catch only
  // fires on a thrown DB failure.
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user || !verifyPassword(password, user.passwordHash)) {
      // Session-163 (the digma S72-C port): the timing equalizer — the
      // miss branch burns the SAME scrypt work against a precomputed
      // throwaway-constant hash, so response latency no longer
      // distinguishes registered emails (the 401 envelope stays
      // byte-identical; the burn is LAZY-memoized at the pure seam).
      if (!user) verifyPassword(password, timingEqualizerHash());
      // Session-21 (S21-P1): the reference's banner text — "Invalid email or
      // password" (ours said "Incorrect…"; wrong-password probes on both apps).
      return fail("INVALID_CREDENTIALS", "Invalid email or password", 401);
    }

    // Session-21 (S21-P5): an unverified account cannot sign in — the
    // reference answers "Please verify your email before logging in. Check
    // your email for the verification code." (live-verified with a throwaway
    // signup). Pre-session-21 rows (verificationCodeHash null) pass through
    // — the seeded demo account predates the flow. Session-217 (R-14,
    // F-217d): the gate now keys on the HASH, not the TTL — an expired
    // code used to pass isVerificationPending and sign the never-verified
    // account straight in (the gate held for exactly 15 minutes), while
    // the resend route's same predicate no-opped, locking the account out
    // of its own recovery. A present hash = never verified (verify-success
    // clears it); the resend re-arms expired accounts with a fresh code.
    if (user.verificationCodeHash) {
      return fail("VERIFICATION_REQUIRED", verificationRequiredMessage(), 403);
    }

    // Session-163 (the digma S67-A port): the mint carries the live row's
    // tokenVersion — a later reset increments it and this cookie dies at
    // the getSessionUser comparison.
    await setSessionCookie(user.id, user.tokenVersion);
    return ok({
      id: user.id,
      email: user.email,
      name: user.name,
      avatarColor: user.avatarColor,
      role: user.role,
    });
  } catch {
    return ERR.INTERNAL();
  }
}
