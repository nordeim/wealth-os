import { randomUUID } from "crypto";
import { isTransientDbError } from "@/lib/db";
import { unlink, writeFile } from "fs/promises";
import { join } from "path";
import { ERR, isGuarded, logApiError, ok, requireSession } from "@/lib/api";
import { clientKey, rateLimit, sweepRateLimits } from "@/lib/rate-limit";
import {
  EXT_BY_MIME,
  MAX_UPLOAD_BYTES,
  MAX_UPLOAD_FILES,
  MAX_UPLOADS_TOTAL_BYTES,
  uploadsCapacity,
  uploadsDir,
} from "@/lib/uploads";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Session-30 (S30-P1): our self-hosted mirror of the reference's base44
 * `rt.integrations.Core.UploadFile({file})` → `{file_url}` contract.
 *
 * The reference validates the image type CLIENT-side in its contact
 * dialog (`type.startsWith("image/")` else the native alert "Please
 * upload an image file (JPG or PNG)") and its own profile hint
 * advertises "Max 5MB" — both are enforced here server-side so the
 * stored set is always images within the advertised ceiling.
 */
export async function POST(request: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  // Session-67 (N-67e): the one route that writes user bytes to disk
  // joins the rate-limit family — 20 uploads / 15 min / IP, the verify
  // route's budget. DELIBERATELY after the session guard (the auth
  // family limits first because it is public; here the unauth 401 is
  // already cheap — a cookie parse, no DB read without a valid
  // signature — and bucketing pre-auth would let an attacker exhaust a
  // legitimate IP's upload budget without ever holding a session).
  const limit = rateLimit(`upload:${clientKey(request)}`, 20, 15 * 60 * 1000);
  sweepRateLimits();
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  // Session-36 (S36-P3): pre-gate on the declared Content-Length BEFORE
  // formData() buffers the body — a multi-GB body must be rejected without
  // ever being read into memory. The 64KB allowance covers multipart
  // overhead (boundaries + part headers).
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_UPLOAD_BYTES + 64 * 1024) {
    return ERR.BAD_REQUEST("File too large (max 5MB)");
  }

  // Session-218 (R-15, F-218f): the chunked-multipart bypass closed.
  // The Content-Length pre-gate above is skipped by
  // `Transfer-Encoding: chunked`, and formData() buffers the ENTIRE
  // body before the post-parse file.size ceiling runs — that ceiling
  // bounds the STORED file, not the BUFFERED memory (the S36-P3 comment
  // called it "the backstop"; it never was one for this path). A
  // counting TransformStream bounds the stream itself: the moment the
  // byte count passes the same MAX+64KB allowance, the stream errors,
  // formData() rejects, and the caller answers the too-large 400 — a
  // sessioned multi-GB chunked POST can no longer OOM the process.
  const maxStreamBytes = MAX_UPLOAD_BYTES + 64 * 1024;
  let streamBytes = 0;
  let streamOverflowed = false;
  const bound = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      streamBytes += chunk.byteLength;
      if (streamBytes > maxStreamBytes) {
        streamOverflowed = true;
        throw new Error("upload stream exceeded the size bound");
      }
      controller.enqueue(chunk);
    },
  });
  const bodyStream = request.body ? request.body.pipeThrough(bound) : undefined;
  const boundedRequest = new Request(request.url, {
    method: "POST",
    headers: request.headers,
    body: bodyStream,
    // Node/undici require the duplex option for streaming request
    // bodies (not yet in the TS DOM lib's RequestInit — the spread-cast
    // carries it without an any).
    ...({ duplex: "half" } as RequestInit),
  });
  // Session-231 (R-28, F-231f): the parse failure leaves a trace before
  // the 400 — the lambda-catch form had silently swallowed the multipart
  // error (the one F-226c-genus site the retrofit sweep missed; the 400
  // "No file provided" answer below is unchanged).
  const form = await boundedRequest.formData().catch((error: unknown) => {
    logApiError("upload POST multipart parse", error);
    return null;
  });
  if (streamOverflowed) {
    return ERR.BAD_REQUEST("File too large (max 5MB)");
  }
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return ERR.BAD_REQUEST("No file provided");
  }

  // The reference's own check (the AAe onChange), server-enforced.
  if (!file.type.startsWith("image/")) {
    return ERR.BAD_REQUEST("Please upload an image file (JPG or PNG)");
  }
  const ext = EXT_BY_MIME[file.type];
  if (!ext) return ERR.BAD_REQUEST("Unsupported image type");

  // The 5MB ceiling the reference's profile hint advertises.
  if (file.size > MAX_UPLOAD_BYTES) {
    return ERR.BAD_REQUEST("File too large (max 5MB)");
  }

  // Session-38 (S38-P5): the write path joins the envelope — an
  // ENOSPC/EACCES on the uploadsDir() mkdir or the writeFile answers
  // ERR.INTERNAL inside { ok, error } instead of a raw non-JSON 500
  // mid-upload (the I/O face of the DB-envelope family).
  // Session-237 (R-34, F-237d): the PRE-WRITE leg rides inside too.
  // The capacity read used to run before this try — its uploadsDir()
  // call is the very mkdir the S38-P5 contract names, and a failing
  // mkdir escaped as the raw non-envelope 500 the docblock disclaims
  // (the F-234e class, at the one site that cure left exposed).
  try {
    // Session-228 (R-25, F-228f): the self-hosted capacity ceiling —
    // the write-only surface's over-time disk guard (nothing ever
    // deletes an upload; the per-request rate cap bounds growth per
    // window only). Either ceiling breaking refuses the write with
    // 507 STORAGE_FULL.
    const dir = uploadsDir();
    const capacity = uploadsCapacity(dir);
    if (
      capacity.files >= MAX_UPLOAD_FILES ||
      capacity.bytes + file.size > MAX_UPLOADS_TOTAL_BYTES
    ) {
      return ERR.STORAGE_FULL();
    }

    const name = `${randomUUID().replace(/-/g, "")}.${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    await writeFile(join(dir, name), bytes);

    // Session-232 (R-29, F-232g): the POST-WRITE re-check — the
    // check-then-write race cured. Concurrent in-flight uploads at
    // (ceiling − ε) all passed the pre-write guard above before any
    // write landed; each writer now re-reads the settled capacity and
    // unlinks its own just-written file when the pair breached — the
    // overshoot closes to a single write's duration, fail-closed, and
    // the next request still sees an honest ceiling.
    const settled = uploadsCapacity(uploadsDir());
    if (
      settled.files > MAX_UPLOAD_FILES ||
      settled.bytes > MAX_UPLOADS_TOTAL_BYTES
    ) {
      // Session-233 (R-30, F-233g): the unlink rides its own guard — a
      // faulting unlink (EACCES on the just-written file) must not
      // escalate the honest 507 into a 500 and swallow the breach
      // verdict. Log-and-continue: the next capacity read still sees
      // the overshoot, and every later writer keeps failing closed.
      try {
        await unlink(join(uploadsDir(), name));
      } catch (unlinkError) {
        logApiError("upload POST breach-unlink", unlinkError);
      }
      return ERR.STORAGE_FULL();
    }

    return ok({ file_url: `/api/uploads/${name}` });
  } catch (error) {
    logApiError("upload POST", error);
    if (isTransientDbError(error)) return ERR.UNAVAILABLE();
    return ERR.INTERNAL();
  }
}
