import { ERR, logApiError, ok, requireJsonContentType } from "@/lib/api";
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
 *
 * Session-243 (R-40, F-243a): the bucket burn rides the SESSIONED path,
 * after the session read. The pre-243 order (gate → burn → session read)
 * was the only writes-family shape whose burn preceded its auth guard:
 * a cookie-less direct caller posting JSON content-type passed the
 * F-234g gate, burned 60 slots of the SHARED writes bucket every
 * sessioned mutation rides, and collected the guest-logout no-op 200 —
 * on the default direct-exposure posture (no XFF, every browser keys
 * the same client bucket) a renewable unauthenticated write-DoS across
 * all users. Possession of the cookie IS the credential (this route's
 * own doctrine), so the bucket guards the sessioned write and burns
 * with it; a guest logout consumes nothing.
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
  // Session-246 (R-43, F-246b): the duplicated predicate converges onto
  // the shared seam — the family's one wrapper (the F-238b
  // never-N-copies rule, executed on its own seventh surface). The
  // behavior is byte-identical: the seam's check, 400 copy, and stream
  // cancel carry the same contract the route's former local gate did
  // (the cancel is a no-op for a bodyless route; the copy is the
  // seam's own).
  const gate = await requireJsonContentType(req);
  if (gate) return gate;
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
      // Session-243 (R-40, F-243a): the burn rides HERE — after the
      // session read, inside the sessioned arm. Only a live session
      // consumes writes capacity; the guest no-op below burns nothing
      // (the upload route's own doctrine: pre-auth bucketing lets a
      // session-less caller exhaust the shared budget).
      const limit = rateLimit(`writes:${clientKey(req)}`, 60, 15 * 60 * 1000);
      sweepRateLimits();
      if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);
      await db.user.update({
        where: { id: user.id },
        data: { tokenVersion: { increment: 1 } },
        // Session-248 (R-45, F-248e): the write-path narrowing — the
        // F-228h insurance doctrine's read-path completion
        // (F-246d/F-247d) left the returned row full, materializing
        // every secret column in scope for a result no consumer reads.
        select: { id: true },
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
      // Session-249 (R-46, F-249f): the arm's clear rides its own
      // minimal try — a throw from INSIDE a catch block is not caught
      // by that catch, so an unprotected clear here would surface a
      // raw non-JSON 500 for an already-completed eviction (the
      // F-248g envelope doctrine, completed across the route's two
      // clear sites). The arm still answers the completed sign-out
      // either way — the session cannot outlive its vanished row.
      try {
        await clearSessionCookie();
      } catch (clearError) {
        logApiError("auth/logout POST (vanished-row cookie clear)", clearError);
      }
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
  // Session-248 (R-45, F-248g): the final clear joins the envelope —
  // it sat AFTER the catch, the auth family's one unprotected cookie
  // operation (a framework-level failure would surface a raw non-JSON
  // 500 for an already-completed eviction). The minimal arm still
  // answers the completed sign-out: the eviction committed above, and
  // the cookie dies at the next session read by the version bump
  // regardless — a failed clear must not mask it.
  try {
    await clearSessionCookie();
  } catch (error) {
    logApiError("auth/logout POST (cookie clear)", error);
  }
  return ok({ signedOut: true });
}
