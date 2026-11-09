import { db } from "@/lib/db";
import { ok, ERR, readBoundedJson, isGuarded, requireSession  } from "@/lib/api";

export const dynamic = "force-dynamic";

/** Destructive reset of all domain data (users and settings survive). */
export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-68 (F-68a2) + session-165 (the digma S148-A/S75-B port):
  // the bounded reader BEFORE the parse — the N-67d declared-length
  // fast path, the content-type CSRF gate, and the chunked-stream
  // counter in ONE seam (the pre-165 form parsed req.json() unbounded
  // and regardless of content-type; the honest CRUD bodies are far
  // smaller than the 16KB ceiling).
  const read = await readBoundedJson(req);
  if (read.tooLarge) return ERR.BAD_REQUEST("Request body too large");

  const body = read.value;
  if (!body || body.confirm !== "RESET") {
    return ERR.BAD_REQUEST('Type "RESET" to confirm');
  }

  // Session-36 (S36-P2): the seven deleteMany calls run INSIDE one
  // $transaction — a mid-chain failure used to leave a PARTIAL wipe plus a
  // raw non-envelope 500; now the wipe is atomic and the failure path is
  // envelope-held.
  // Session-214 (R-10, F-214a): every delete scopes through the session
  // owner — the install-wide wipe died with the owner-scoping round
  // (open signup + unscoped deleteMany = any user could erase every
  // account's data). Users and settings rows survive, as always.
  try {
    await db.$transaction([
      db.transaction.deleteMany({ where: { ownerId: guard.user.id } }),
      db.incomeSource.deleteMany({ where: { ownerId: guard.user.id } }),
      db.bankAccount.deleteMany({ where: { ownerId: guard.user.id } }),
      db.investment.deleteMany({ where: { ownerId: guard.user.id } }),
      db.goal.deleteMany({ where: { ownerId: guard.user.id } }),
      db.budget.deleteMany({ where: { ownerId: guard.user.id } }),
    ]);

    return ok({ reset: true });
  } catch {
    return ERR.INTERNAL();
  }
}
