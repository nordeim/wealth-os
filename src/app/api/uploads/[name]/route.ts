import { readFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";
import { ERR, fail, logApiError } from "@/lib/api";
import { CONTENT_TYPES, UPLOAD_NAME_RE, uploadsDir } from "@/lib/uploads";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Params = { params: Promise<{ name: string }> };

/**
 * Session-30 (S30-P1, restored session-35): the public GET half of the
 * self-hosted UploadFile mirror. The reference's file_urls are public CDN
 * links — no session guard here.
 *
 * The stored-name charset is PINNED (`UPLOAD_NAME_RE`: 32 hex chars + a
 * whitelisted image extension) — a name that does not match is a 404 and is
 * never turned into a filesystem lookup, so there is no traversal surface.
 * Names are content-random and never rewritten, so the bytes are served
 * with immutable caching.
 */
export async function GET(req: Request, { params }: Params) {
  // Session-225 (R-22, F-225i): the light per-IP bucket — the export
  // precedent (240/15). The health route's F-221t note claimed this
  // was the only unthrottled public family; now every public family
  // carries a bucket. The name charset is pinned below (no traversal),
  // immutable caching rides the 200s, and no seeded upload files
  // exist — the bucket cannot trip any test battery.
  const limit = rateLimit(`uploads:${clientKey(req)}`, 240, 15 * 60 * 1000);
  sweepRateLimits();
  if (!limit.allowed) {
    // Session-226 (R-23, F-226e): the family contract — the ERR arm
    // carries Retry-After and the family copy (this hand-built 429 was
    // the one drift site among the 36).
    return ERR.RATE_LIMITED(limit.retryAfterSec);
  }
  const { name } = await params;
  if (!UPLOAD_NAME_RE.test(name)) {
    return fail("NOT_FOUND", "File not found", 404);
  }

  const ext = name.slice(name.lastIndexOf(".") + 1);
  let bytes: Buffer;
  try {
    bytes = await readFile(join(uploadsDir(), name));
  } catch (error) {
    // Session-231 (R-28, F-231g): a miss on a capability URL is the 404
    // normal case, not a server fault — ENOENT stays out of the error
    // log (up to 240 scans/15min/IP would drown the seam); every other
    // I/O failure still logs before the envelope.
    const miss =
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT";
    if (!miss) logApiError("uploads/:name GET", error);
    return fail("NOT_FOUND", "File not found", 404);
  }

  return new NextResponse(new Uint8Array(bytes), {
    status: 200,
    headers: {
      "Content-Type": CONTENT_TYPES[ext] ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
