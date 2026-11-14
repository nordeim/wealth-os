import { db, isTransientDbError } from "@/lib/db";
import { ERR, logApiError, ok, parseBody } from "@/lib/api";
import { hashPassword } from "@/lib/auth";
import { signupSchema } from "@/lib/schemas";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { VERIFICATION_TTL_MS } from "@/lib/verification";
import { hashVerificationCode } from "@/lib/verification-server";
import { generateVerifyCode } from "@/lib/password";

export const dynamic = "force-dynamic";

const NAME_COLORS = ["#2563eb", "#0891b2", "#7c3aed", "#059669", "#d97706", "#dc2626", "#db2777"];

/** Derives the account name from the email's local part — the reference's
 *  signup form collects NO name (Email / Password / Confirm Password only,
 *  DOM-verified), so the account carries the local part until edited. */
function nameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  const cleaned = local.replace(/[._-]+/g, " ").trim();
  if (!cleaned) return email;
  return cleaned
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function POST(req: Request) {
  const limit = rateLimit(`signup:${clientKey(req)}`, 10, 15 * 60 * 1000);
  // Session-38 (S38-P6): the opportunistic bucket sweep — the audit
  // found it ran ONLY from login, so the signup/verify/resend buckets
  // were cleaned only when someone next logged in (bounded, but
  // dishonest).
  // Session-39 (S39-P7): login's EXACT placement — before the denied
  // return, so denied requests sweep too (the s38 placement was after
  // the return, and the code finally matches its own "mirrored"
  // comment).
  sweepRateLimits();
  // Session-67 (N-67h): the denied 429 carries the Retry-After header
  // like the rest of the family.
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  // Session-163: the Zod parse seam — the pre-gate + the name/email/
  // password contract (the s38/s39/s21 semantics: optional trimmed name
  // <= 80 with the empty-string -> undefined normalization, the derived
  // fallback, the email format, the 8-char password floor) ride the
  // signupSchema in one call. The derived name keeps the explicit-name
  // ceiling: nameFromEmail returns the email local part, up to ~150
  // chars under the 160 email cap.
  const parsed = await parseBody(req, signupSchema);
  if (!parsed.ok) return parsed.response;
  const name = (parsed.data.name ?? nameFromEmail(parsed.data.email)).slice(0, 80);
  const { email, password } = parsed.data;

  // Session-37 (S37-P1): the auth family joins the envelope — the
  // findUnique/count/create failures (SQLITE_BUSY-class) stay inside
  // { ok, error } instead of a raw non-JSON 500. The validation prefixes
  // above touch no DB and stay outside.
  try {
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      // Session-21 (S21-P6): the reference's banner text — "A user with this
      // email already exists" (ours said "An account with…"; existing-email
      // probes on both apps).
      return ERR.BAD_REQUEST("A user with this email already exists");
    }

    // Session-241 (R-38, F-241b): the process-level creation ceiling —
    // the per-IP key above is voidable under the documented default
    // direct-exposure posture (a client-suppliable XFF hop, the F-218t
    // boot warning), and unlike the sibling public routes (per-email
    // secondaries) every successful signup here creates PERSISTENT
    // state (a User row) and burns TWO scrypts. The uploads family's
    // own capacity precedent: a global bucket keyed WITHOUT the IP,
    // sized 2x the e2e battery's ten-signup budget (retries: 0).
    // The CREATION-PATH placement (session 241): the R-37 entry form
    // counted every attempt that reached the handler — one client's
    // ten per-IP-DENIED requests saturated the global bucket and
    // blocked every signup app-wide for fifteen minutes (an
    // availability bound inverted into a kill-switch), and the
    // colon-carried key was mintable from the client-suppliable per-IP
    // keyspace (an XFF hop of "process" made both calls share one
    // bucket). Here only fresh-email creation attempts consume
    // capacity: junk bodies die at the parse, duplicate-email floods
    // die at the check above, and the hyphenated key is unreachable
    // from the `signup:<hop>` namespace.
    const totalLimit = rateLimit("signup-process-ceiling", 20, 15 * 60 * 1000);
    if (!totalLimit.allowed) return ERR.RATE_LIMITED(totalLimit.retryAfterSec);

    const count = await db.user.count();

    // Session-21 (S21-P5): signup no longer signs the account in — it mints
    // a 6-digit verification code and the login card swaps to the verify
    // view ("Verify your email", live-verified on the reference). The code
    // is stored HASHED (scrypt, the auth layer's format) with a 15-minute
    // expiry. Delivery is the digma ADR-014 in-band family: with no mail
    // transport, the code rides BOTH the SERVER console log AND the
    // response body while NEO_DISABLE_IN_APP_OTP is unset (the F-217m /
    // F-242i posture — the boot warning names the knob; setting it nulls
    // the response copy and leaves the console log for the operator).
    const code = generateVerifyCode();
    const passwordHash = await hashPassword(password);
    const verificationCodeHash = await hashVerificationCode(code);
    let user;
    try {
      user = await db.user.create({
        data: {
          name,
          email,
          passwordHash,
          avatarColor: NAME_COLORS[count % NAME_COLORS.length],
          role: count === 0 ? "admin" : "rep",
          verificationCodeHash,
          verificationAttempts: 0,
          verificationExpiresAt: new Date(Date.now() + VERIFICATION_TTL_MS),
        },
      });
    } catch (e) {
      logApiError("auth/signup POST", e);
      // Session-218 (R-15, F-218r): the findUnique→create race — two
      // concurrent first-signups for one email slip past the explicit
      // duplicate check above and the unique constraint answers a raw
      // 500 "Something went wrong". The P2002 arm answers the same
      // duplicate 400 the explicit check does (the settings route's
      // pattern).
      if (typeof e === "object" && e !== null && "code" in e && (e as { code?: string }).code === "P2002") {
        return ERR.BAD_REQUEST("A user with this email already exists");
      }
      throw e;
    }

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

    // Session-163 (the digma ADR-014 port): the SELF-HOSTED in-app OTP
    // delivery — the code rides the response for existing demo workflows
    // (and the e2e scratch-account funnel) exactly as digma's register NEO_DISABLE_IN_APP_OTP=1 nulls it for production (an
    // email service owns the delivery).
    return ok({
      id: user.id,
      email: user.email,
      requiresVerification: true,
      verificationCode: inAppOtpEnabled ? code : null,
    });
  } catch (error) {
    logApiError("auth/signup POST", error);
    // Session-237 (R-34, F-237b): the transient arm joins the auth
    // family — the sibling forgot-password/reset-password/reset routes
    // already answered a pool/transaction timeout with the honest 503;
    // these catches answered the generic 500 with retry advice for a
    // condition a retry cannot clear.
    if (isTransientDbError(error)) return ERR.UNAVAILABLE();
    return ERR.INTERNAL();
  }
}
