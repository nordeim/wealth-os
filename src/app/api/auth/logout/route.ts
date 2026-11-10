import { ok, ERR } from "@/lib/api";
import { clearSessionCookie } from "@/lib/auth";

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
 */
export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return ERR.BAD_REQUEST("Invalid request body");
  }
  await clearSessionCookie();
  return ok({ signedOut: true });
}
