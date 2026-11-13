import { db, isTransientDbError } from "@/lib/db";
import { ERR, isGuarded, logApiError, ok, readBoundedJson, requireSession } from "@/lib/api";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/** Destructive reset of all domain data (users and settings survive). */
export async function POST(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-218 (R-15, F-218g): the DESTRUCTIVE wipe — 3 / 15 min / IP
  // (the e2e battery's two reset legs ride comfortably under it; the
  // confirm-gate stays the primary guard, the bucket bounds replays).
  const limit = rateLimit(`data-reset:${clientKey(req)}`, 3, 15 * 60 * 1000);
  sweepRateLimits();
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

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

  // Session-36 (S36-P2): the deleteMany calls run INSIDE one
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
  } catch (error) {
    logApiError("reset POST", error);
    // Session-235 (R-32, F-235c): the honest-failure arm the sibling auth
    // routes already carry — this wipe is the app's BIGGEST transaction
    // (six owner-scoped deleteManys over the dataset the recorded growth
    // posture allows to grow unbounded), precisely where the interactive
    // timeout fires first. A generic 500 tells the user "try again" —
    // advice that cannot succeed until the dataset shrinks; the 503
    // family copy names the timeout honestly.
    // Session-238 (R-35, F-238k): the seam arm replaces the hand-rolled
    // inline form (the F-236b hoist this route predated).
    if (isTransientDbError(error)) return ERR.UNAVAILABLE();
    return ERR.INTERNAL();
  }
}
