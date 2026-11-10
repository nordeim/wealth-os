import { db } from "@/lib/db";
import { ok, ERR, readBoundedJson, isGuarded, requireSession } from "@/lib/api";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import { profileUpdateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

/** The session user's own record. R-10 (session 214, F-214c): the
 *  CRM-era "owners list" (every account's email/name/photo to any
 *  session — built for filter dropdowns + rep leaderboards that died
 *  with the session-199 transformation, zero UI consumers since) is
 *  retired; a session reads ITS OWN profile only. */
export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  return ok({
    id: guard.user.id,
    email: guard.user.email,
    name: guard.user.name,
    avatarColor: guard.user.avatarColor,
    photoUrl: guard.user.photoUrl,
    role: guard.user.role,
  });
}

/** Update the signed-in user's own profile — the display NAME only.
 * Session-215 (R-12, F-215g — the docblock cure): the pre-215 block
 * described a photoUrl round-trip ("an explicit null clears it, an
 * absent key leaves it untouched") and schema rules that do not exist
 * — profileUpdateSchema is name-only (trim, 1–80), photoUrl is
 * read-only display metadata, and no UI surface writes it.
 * Session-72 (M-72c2): the body pre-gate — the 13th sessioned
 * req.json() route joined the F-68a2 family at s72.
 * Session-166: the profile joins the Zod seam through the ROUTE-LOCAL
 * readBoundedJson + safeParse form (NOT parseBody) — this route's null
 * body answers its own "Invalid JSON body" message (the one divergent
 * sibling of the family's shared "Invalid request body"; the s165
 * zero-message-drift doctrine extended at s166). */
export async function PATCH(request: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-220 (R-17, F-220c): the writes bucket — the sessioned
  // mutation family (the F-219m threat model names the profile write).
  const limit = rateLimit(`writes:${clientKey(request)}`, 60, 15 * 60 * 1000);
  sweepRateLimits();
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  const read = await readBoundedJson(request);
  if (read.tooLarge) return ERR.BAD_REQUEST("Request body too large");

  const body = read.value;
  if (!body) return ERR.BAD_REQUEST("Invalid JSON body");

  // Session-166: the schema seam — the same issue-to-400 mapping
  // parseBody carries, inlined so the null branch above keeps this
  // route's own message.
  const parsed = profileUpdateSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return ERR.BAD_REQUEST(first?.message ?? "Invalid JSON body");
  }
  const { name } = parsed.data;

  // Session-36 (S36-P2): the update is envelope-held.
  try {
    const user = await db.user.update({
      where: { id: guard.user.id },
      data: { name },
      select: { id: true, email: true, name: true, avatarColor: true, photoUrl: true, role: true },
    });
    return ok(user);
  } catch {
    return ERR.INTERNAL();
  }
}
