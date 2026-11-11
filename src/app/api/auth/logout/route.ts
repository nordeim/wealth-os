import { ok, ERR } from "@/lib/api";
import { clearSessionCookie } from "@/lib/auth";
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
 * (cookie-clear only, no DB write, CSRF-gated: low abuse value, but
 * uniformity closes the class; the session-220 count enumeration
 * named 14 where 13 new buckets landed).
 */
export async function POST(req: Request) {
  const limit = rateLimit(`writes:${clientKey(req)}`, 60, 15 * 60 * 1000);
  sweepRateLimits();
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return ERR.BAD_REQUEST("Invalid request body");
  }
  await clearSessionCookie();
  return ok({ signedOut: true });
}
