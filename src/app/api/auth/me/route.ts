import { ERR, logApiError, ok } from "@/lib/api";
import { isTransientDbError } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  // Session-41 (S41-P4): the only route that reads the session directly
  // (it is NOT requireSession-gated by design — a logged-out caller gets
  // data:null, not a 401). A DB failure here now answers the envelope
  // instead of a raw non-JSON 500.
  try {
    const user = await getSessionUser();
    return ok(user); // data: user | null
  } catch (error) {
    logApiError("auth/me GET", error);
    // Session-237 (R-34, F-237b): the transient arm joins the auth
    // family — the sibling forgot-password/reset-password/reset routes
    // already answered a pool/transaction timeout with the honest 503;
    // these catches answered the generic 500 with retry advice for a
    // condition a retry cannot clear.
    if (isTransientDbError(error)) return ERR.UNAVAILABLE();
    return ERR.INTERNAL();
  }
}
