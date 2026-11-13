import { db, isTransientDbError } from "@/lib/db";
import { ERR, fail, logApiError, ok, parseBody } from "@/lib/api";
import { hashPassword, hashResetToken } from "@/lib/password";
import { resetPasswordSchema } from "@/lib/schemas";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/** The token-validation failure text (digma's RA-65 measured text — the
 *  reference's reset submit answers this for an invalid, expired, or
 *  already-consumed token alike). */
const INVALID_TOKEN_MESSAGE = "Invalid or expired reset token";

/**
 * POST /api/auth/reset-password — session-163 (the digma S67-A/S76-A/
 * S124-A port): the reset-submit half of the password-reset funnel.
 *
 * The token is validated BEFORE the password (digma's measured ordering —
 * an invalid token + a weak password still answers the TOKEN error). The
 * consumption is ATOMIC and SINGLE-USE (digma's S76-A form): the write is
 * a conditional updateMany whose WHERE carries the token AND the live
 * expiry, so a racing replay whose read interleaved before this commit
 * lands count 0 (the token is already consumed) and answers the
 * invalid-token 400 instead of overwriting the just-reset password on the
 * bare row id. The token CLEARS on success (a replay answers the
 * invalid-token 400) and NO session opens (the user signs in with the new
 * password on /login).
 *
 * The eviction (digma's S67-A): tokenVersion increments on the reset —
 * every cookie minted before this reset embeds the pre-increment version
 * and dies at the getSessionUser comparison. A stolen/observed session no
 * longer outlives the reset performed specifically to kill it.
 */
export async function POST(req: Request) {
  const limit = rateLimit(`pw-reset:${clientKey(req)}`, 10, 15 * 60 * 1000);
  // Session-163: the family's sweep placement (denied requests sweep too).
  sweepRateLimits();
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  // Session-163: the Zod parse seam — the schema's field order encodes the
  // measured contract (token presence/size FIRST, then the password
  // window), and the first issue answers.
  const parsed = await parseBody(req, resetPasswordSchema);
  if (!parsed.ok) return parsed.response;
  const { reset_token: resetToken, new_password: newPassword } = parsed.data;

  // The token check comes FIRST (the measured ordering). An unknown token
  // and a dead token answer identically (no oracle between them).
  // Session-164 (the skill §12 hashed-at-rest compliance): the row stores
  // the token's SHA-256 hex, so BOTH lookups key on the hash — the raw
  // token arrives from the URL and never touches the query.
  // Session-221 (R-18, F-221g): the read path joins the honest-failure
  // family — the old blanket `.catch(() => null)` mapped a P2024/P2028
  // (pool/transaction timeout) to "invalid token", telling a user
  // holding a VALID single-use link that it expired during a DB outage
  // (the F-220k class forgot-password's read path cured; this route's
  // own update path cured it in F-218q). A MISSING row is not an error;
  // a broken DB is a 503, never a token verdict.
  let user: Awaited<ReturnType<typeof db.user.findFirst>> = null;
  try {
    user = await db.user.findFirst({ where: { resetToken: hashResetToken(resetToken) } });
  } catch (error) {
    logApiError("auth/reset-password POST", error);
    // Session-238 (R-35, F-238k): the seam arm replaces the hand-rolled
    // inline form (the F-236b hoist this route predated).
    if (isTransientDbError(error)) return ERR.UNAVAILABLE();
    return ERR.INTERNAL();
  }
  const alive =
    user?.resetTokenExpiresAt instanceof Date && user.resetTokenExpiresAt.getTime() > Date.now();
  if (!user || !alive) {
    return fail("VALIDATION", INVALID_TOKEN_MESSAGE, 400);
  }

  // The success path: the hash updates, the token CLEARS (single-use), the
  // version bumps (the eviction), and no session opens. The write is the
  // ATOMIC conditional form — the WHERE carries the token AND the live
  // expiry; a zero count means the token went stale between the pre-read
  // and this commit (the racing-replay shape) and answers the
  // invalid-token 400, never a success envelope.
  //
  // The P2025 arm is absent BY DESIGN: updateMany answers a vanished row
  // with count 0 — the invalid-token 400 below already covers it; the code
  // never throws P2025. The transient-abort family (P2024/P2028) surfaces
  // honestly as a 503 with the human copy, never a bare 500 past it (the
  // no-bare-throw discipline).
  try {
    const newPasswordHash = await hashPassword(newPassword);
    const result = await db.user.updateMany({
      where: { id: user.id, resetToken: hashResetToken(resetToken), resetTokenExpiresAt: { gt: new Date() } },
      data: {
        passwordHash: newPasswordHash,
        resetToken: null,
        resetTokenExpiresAt: null,
        // The eviction: every pre-reset cookie dies at the getSessionUser
        // version comparison.
        tokenVersion: { increment: 1 },
        // Session-239 (R-36, F-239b): a successful reset clears the
        // pending verification state too. The reset token's possession
        // proves email control (delivered to the registered address) —
        // exactly what verification attests. Pre-cure, a never-verified
        // account that completed the entire reset funnel still hit
        // login's verification gate (403 above the credential check):
        // the recovery funnel completed but the account stayed locked
        // out. In the demo posture the in-band OTP made the standing
        // hash no real protection either (an attacker could verify
        // in-band the same way) — the clear closes the owner's
        // recovery without opening anything.
        verificationCodeHash: null,
        verificationExpiresAt: null,
        verificationAttempts: 0,
      },
    });
    if (result.count === 0) {
      return fail("VALIDATION", INVALID_TOKEN_MESSAGE, 400);
    }
  } catch (error) {
    logApiError("auth/reset-password POST", error);
    // Session-238 (R-35, F-238k): the seam arm (the F-236b hoist).
    if (isTransientDbError(error)) return ERR.UNAVAILABLE();
    return ERR.INTERNAL(); // F-218q: the no-bare-throw discipline the comment claims
  }

  return ok({ message: "Password reset successfully" });
}
