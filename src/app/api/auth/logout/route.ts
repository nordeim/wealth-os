import { ERR, logApiError, ok } from "@/lib/api";
import { clearSessionCookie, getSessionUser } from "@/lib/auth";
import { db, isRecordNotFound, isTransientDbError } from "@/lib/db";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/**
 * Session-218 (R-15, F-218p): the content-type gate joins the s165
 * CSRF family. The handler reads no body, so the family's JSON gate
 * never applied — a cross-site `fetch(..., { mode: "no-cors",
 * method: "POST" })` carried no content-type but STILL got the
 * cookie-clearing Set-Cookie applied (SameSite=Lax gates sending,
 * never setting). Nuisance forced sign-out, no state destruction. The
 * first-party `call()` always sends application/json — compatible by
 * construction.
 *
 * Session-221 (R-18, F-221r): the POST joins the `writes:` family —
 * the one mutating handler the F-219m/F-220c rounds left unbucketed
 * (cookie-clear only at the time, CSRF-gated: low abuse value, but
 * uniformity closes the class; the session-220 count enumeration
 * named 14 where 13 new buckets landed).
 *
 * Session-223 (R-20, F-223k): the route now WRITES — the tokenVersion
 * eviction (below) is a one-row indexed update on the session's user.
 */
export async function POST(req: Request) {
  // Session-234 (R-31, F-234g): the gate moves ABOVE the bucket. The
  // pre-parse burn genus's seventh surface, at broader scope: this
  // route burned a slot of the SHARED writes bucket (the family every
  // sessioned mutation rides) before the content-type gate rejected a
  // cross-site plain-text volley — 60 cookie-less no-preflight posts
  // 429'd the victim's CRUD for a renewable 15-minute window. Logout
  // reads no body and owns no brute-force surface (possession of the
  // cookie IS the credential), so the gate is its CSRF defense, not an
  // anti-brute-force bound — gate-first: the cross-site burn dies at
  // 400 un-bucketed, and the first-party JSON path rides the bucket
  // exactly as before.
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return ERR.BAD_REQUEST("Invalid request body");
  }
  const limit = rateLimit(`writes:${clientKey(req)}`, 60, 15 * 60 * 1000);
  sweepRateLimits();
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);
  try {
    // Session-223 (R-20, F-223k): "sign out" means REVOKE — the same
    // tokenVersion eviction the reset flow rides. An exfiltrated cookie
    // previously survived logout for up to its 7-day TTL; the bump (one
    // indexed update, fire-before-clear so a failure surfaces) kills
    // every previously minted cookie at the getSessionUser comparison. A
    // guest logout (no session) stays a no-op 200. Multi-device
    // semantic: signing out one device evicts all — the secure default
    // for a finance app.
    const user = await getSessionUser();
    if (user) {
      await db.user.update({
        where: { id: user.id },
        data: { tokenVersion: { increment: 1 } },
      });
    }
  } catch (error) {
    logApiError("auth/logout POST", error);
    // Session-241 (R-38, F-241d): the vanished-row arm — the session's
    // user row disappeared between the session read and the
    // tokenVersion eviction. The session cannot outlive its row (the
    // next getSessionUser misses either way), so the logout COMPLETES:
    // clear the cookie and answer the guest-logout no-op 200 form
    // (never the generic 500 — the F-222o doctrine).
    if (isRecordNotFound(error)) {
      await clearSessionCookie();
      return ok({ signedOut: true });
    }
    // Session-237 (R-34, F-237b): the transient arm joins the auth
    // family — the sibling forgot-password/reset-password/reset routes
    // already answered a pool/transaction timeout with the honest 503;
    // these catches answered the generic 500 with retry advice for a
    // condition a retry cannot clear.
    if (isTransientDbError(error)) return ERR.UNAVAILABLE();
    return ERR.INTERNAL();
  }
  await clearSessionCookie();
  return ok({ signedOut: true });
}
