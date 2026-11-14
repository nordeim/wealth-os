import { existsSync, mkdirSync } from "fs";
import { readdir, stat } from "node:fs/promises";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

// Session-30 (S30-P1): the uploads seam's path + vocabulary helpers.
//
// The reference's four UploadFile call sites (bundle index-DZ-xbrIm.js)
// funnel through the base44 files CDN; our self-hosted mirror stores the
// bytes under <repo>/uploads/ — gitignored like db/ — and serves them
// from /api/uploads/<name>. The repo-root resolution mirrors
// src/lib/db-path.ts (the validated-anchor pattern) so next dev, next
// build and the standalone server all land on the same folder regardless
// of the process working directory.

// Session-57 (N-57b): the `export` keyword narrowed off this constant —
// zero external consumers repo-wide (the N-56a lint-invisible class,
// EXPORT variant). The constant itself stays: uploadsDir()'s repo-root
// resolution below consumes it.
const UPLOADS_DIR_NAME = "uploads";

/**
 * The 5MB ceiling the reference's own profile hint advertises
 * ("JPG, PNG or GIF. Max 5MB.").
 */
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/**
 * Session-228 (R-25, F-228f): the self-hosted capacity ceilings. The
 * uploads surface is write-only (nothing in src/ deletes a file, and
 * the surface has zero UI consumers today), so the per-request rate
 * cap bounds growth per window but NOT over time — a sessioned caller
 * could park ~9.6 GB/day. These ceilings are the honest single-box
 * guard: the POST route refuses with 507 STORAGE_FULL when either
 * would break. The count ceiling also bounds the capacity walk's own
 * stat cost. The owner-tag/retention design (per-user cleanup needs a
 * schema change — files are anonymous UUIDs today) is recorded in the
 * F-228f ledger row for a future round.
 */
export const MAX_UPLOADS_TOTAL_BYTES = 256 * 1024 * 1024;
export const MAX_UPLOAD_FILES = 4096;

export interface UploadsCapacity {
  files: number;
  bytes: number;
}

/** The directory walk behind the ceiling check — regular files only,
 *  sizes summed; subdirectories (none are written today) are ignored.
 *  Session-238 (R-35, F-238d): the walk is ASYNC — the F-235d
 *  availability doctrine's fs edition. The pre-cure walk read the
 *  directory and every entry's size SYNCHRONOUSLY, twice per upload
 *  POST, on the request path: at the 4096-file ceiling that is
 *  ~8,192 blocking stat syscalls stalling the single-process event
 *  loop — the same genus the scrypt promisification cured. The
 *  promises-based fs family keeps the per-entry guard semantics (a
 *  vanished entry carries nothing); both call sites already await. */
export async function uploadsCapacity(dir: string): Promise<UploadsCapacity> {
  let files = 0;
  let bytes = 0;
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    // An absent (or unreadable) directory carries nothing.
    return { files: 0, bytes: 0 };
  }
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    // Session-234 (R-31, F-234e): the per-entry guard — a file that
    // vanishes between the directory read and this size read carries
    // nothing; skip it instead of throwing past the envelope (both
    // capacity call sites ride inside the route's try since F-237d,
    // so a raw throw answers ERR.INTERNAL — and the post-write site
    // would skip the breach-unlink).
    try {
      bytes += (await stat(join(dir, entry.name))).size;
      files += 1;
    } catch {
      // A vanished entry occupies no capacity.
    }
  }
  return { files, bytes };
}

/**
 * Stored names are `<32-hex>.<ext>` — the GET route accepts exactly this
 * charset (no separators, no traversal surface).
 */
export const UPLOAD_NAME_RE = /^[0-9a-f]{32}\.(jpg|png|webp|gif)$/;

/** Content types for the extensions the POST route writes. */
export const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

/** The extension written for each accepted MIME type. */
export const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

/**
 * The image family a buffer's magic bytes declare — the values match
 * EXT_BY_MIME's (so the route compares the sniffed family directly
 * against the declared MIME's extension).
 *
 * Session-244 (R-41, F-244b): the upload POST's only content gate on
 * the STORED bytes used to be the multipart part's client-declared
 * Content-Type — the buffer itself was never inspected, so a sessioned
 * caller could store arbitrary non-image bytes (polyglots, HTML,
 * binaries) under a pinned image extension while the GET served them
 * with the extension's image content-type on immutable 1-year
 * caching. Stored-XSS was already closed by three independent layers
 * (the SVG-excluding MIME map, the nosniff header, the
 * extension-pinned content-type that never serves text/html); the
 * residual is arbitrary-content hosting on the app's own origin —
 * this seam closes the declaration gap by trusting the bytes, not
 * the headers. Pure and deterministic: same bytes, same family,
 * every call — pinned by tests/upload-sniff.test.ts (the TDD battery
 * born RED over the pre-cure tree).
 */
export type ImageFamily = "jpg" | "png" | "webp" | "gif";

export function sniffImageMagic(bytes: Uint8Array): ImageFamily | null {
  // Every accepted family's header fits in 12 bytes (JPEG 3 · PNG 8 ·
  // GIF 4 · WEBP 12); a shorter buffer carries no family's magic. The
  // floor also rejects the empty buffer.
  if (bytes.length < 12) return null;
  // JPEG: the FF D8 FF SOI marker.
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
  // PNG: 89 50 4E 47 0D 0A 1A 0A (the 8-byte signature).
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return "png";
  }
  // GIF: "GIF8" — both the 87a and 89a dialects open with it.
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) {
    return "gif";
  }
  // WEBP: the RIFF container whose bytes 8-11 spell WEBP. A RIFF
  // container without that payload is an AVI or WAV cousin, not an
  // image — it nulls rather than reading as webp.
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "webp";
  }
  return null;
}

function validatedRoot(candidate: string): string | null {
  return existsSync(join(candidate, "prisma", "schema.prisma")) ? candidate : null;
}

/**
 * The repo-root anchor chain, as a PURE seam (the db-path
 * `resolveDatabaseUrl` pattern — pinnable by tests/uploads-path.test.ts
 * with fixture layouts instead of a live standalone boot).
 *
 * Anchor order (F-121c1, session-121): the standalone-cwd anchor comes
 * FIRST — the standalone bundle rewrites import.meta.url into a VIRTUAL
 * path (<repo>/.next/standalone/src/lib/uploads.ts) whose ../..
 * VALIDATES .next/standalone itself (the output-file trace puts
 * prisma/schema.prisma INSIDE the build output), silently landing the
 * uploads folder in the EPHEMERAL .next tree (wiped by every `next
 * build`). The chdir'd cwd of the standalone server
 * (<repo>/.next/standalone) resolves ../.. to the REAL repo root — the
 * exact session-34 anchor order src/lib/db-path.ts already guards.
 */
export function repoRootFor(moduleUrl: string | undefined, cwd: string): string {
  // Anchor 1: the standalone server's chdir'd CWD
  // (<repo>/.next/standalone -> <repo>).
  if (cwd.includes(".next")) {
    const root = validatedRoot(resolve(cwd, "..", ".."));
    if (root) return root;
  }
  // Anchor 2: this module's own repo root (<repo>/src/lib -> <repo>) —
  // dev / seed / vitest (their cwd is the repo, outside .next).
  if (moduleUrl) {
    try {
      const here = dirname(fileURLToPath(moduleUrl));
      const root = validatedRoot(resolve(here, "..", ".."));
      if (root) return root;
    } catch {
      // a non-file:// or unavailable module URL — fall through.
    }
  }
  return cwd;
}

// Session-228 (R-25, F-228i): memoized per process — the anchor chain
// (existsSync probes) ran on every upload GET/POST for a path that
// cannot move at runtime. The on-demand first-use resolution stays;
// only the repeated walk retires.
let cachedRoot: string | null = null;

function repoRoot(): string {
  cachedRoot ??= repoRootFor(import.meta.url, process.cwd());
  return cachedRoot;
}

/**
 * Absolute path of the uploads directory, created on demand (first
 * upload) — the same contract as db-path's urlForRoot.
 * Session-238 (R-35, F-238d): the mkdir memoizes behind a module-level
 * ensured flag — the pre-cure form ran mkdirSync on EVERY call (the
 * GET route paid it per request); the directory cannot vanish at
 * runtime (nothing deletes it), so one syscall per process is the
 * honest bound.
 */
let uploadsDirEnsured = false;

export function uploadsDir(): string {
  const dir = join(repoRoot(), UPLOADS_DIR_NAME);
  if (!uploadsDirEnsured) {
    mkdirSync(dir, { recursive: true });
    uploadsDirEnsured = true;
  }
  return dir;
}
