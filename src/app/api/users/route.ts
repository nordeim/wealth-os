import { db } from "@/lib/db";
import { ok, ERR, readBoundedJson, isGuarded, requireSession } from "@/lib/api";
import { profileUpdateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

/** Owners list (for filter dropdowns + rep leaderboards). */
export async function GET() {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  // Session-42 (S42-P1): the list read joined the envelope.
  try {
    const users = await db.user.findMany({
      orderBy: { name: "asc" },
      select: { id: true, email: true, name: true, avatarColor: true, photoUrl: true, role: true },
    });
    return ok(users);
  } catch {
    return ERR.INTERNAL();
  }
}

/** Update the signed-in user's own profile (Full Name + photo — email/role
 * are fixed). Session-30 (S30-P3): the photoUrl mirrors the reference's
 * updateMe({display_name, profile_picture}) — an explicit null clears it,
 * an absent key leaves it untouched.
 * Session-72 (M-72c2): the body pre-gate — the 13th sessioned
 * req.json() route joined the F-68a2 family at s72.
 * Session-166: the profile joins the Zod seam through the ROUTE-LOCAL
 * readBoundedJson + safeParse form (NOT parseBody) — this route's null
 * body answers its own "Invalid JSON body" message (the one divergent
 * sibling of the family's shared "Invalid request body"; the s165
 * zero-message-drift doctrine extended at s166). The name ≥2 rule + the
 * photoUrl prefix contract + the 500 cap live in profileUpdateSchema
 * (the cap converting from the s37 slice(0,500) truncation to the
 * honest reject — the s163 email precedent). */
export async function PATCH(request: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

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
