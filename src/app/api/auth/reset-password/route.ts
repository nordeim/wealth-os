import { Prisma } from "@/generated/prisma/client";

import { db } from "@/lib/db";
import { ok, fail, ERR, parseBody } from "@/lib/api";
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
  const limit = rateLimit(`reset:${clientKey(req)}`, 10, 15 * 60 * 1000);
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
  const user = await db.user.findFirst({ where: { resetToken: hashResetToken(resetToken) } }).catch(() => null);
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
    const result = await db.user.updateMany({
      where: { id: user.id, resetToken: hashResetToken(resetToken), resetTokenExpiresAt: { gt: new Date() } },
      data: {
        passwordHash: hashPassword(newPassword),
        resetToken: null,
        resetTokenExpiresAt: null,
        // The eviction: every pre-reset cookie dies at the getSessionUser
        // version comparison.
        tokenVersion: { increment: 1 },
      },
    });
    if (result.count === 0) {
      return fail("VALIDATION", INVALID_TOKEN_MESSAGE, 400);
    }
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      (error.code === "P2024" || error.code === "P2028")
    ) {
      return fail("UNAVAILABLE", "The request took too long — the database timed out. Try again.", 503);
    }
    throw error;
  }

  return ok({ message: "Password reset successfully" });
}
