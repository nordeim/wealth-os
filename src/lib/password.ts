// Session-163 (the digma S70-D port): the PURE password/code crypto seam.
// These functions previously lived in src/lib/auth.ts — whose transitive
// next/headers + Prisma imports made it un-importable from the bare-
// `PrismaClient` seed script, so prisma/seed.ts DUPLICATED the scrypt
// parameter set (16-byte salt, 64-byte key, `scrypt:salt:hash`): a change
// in one place silently broke demo login in the other. This module is
// node:crypto ONLY — both consumers import it, and auth.ts re-exports for
// the routes' existing import surface.
//
// Session-235 (R-32, F-235d): the seam went ASYNC. The synchronous
// scrypt blocked the single-threaded server ~28 ms per call, and every
// public auth route burns exactly one (the timing equalizers included)
// — an unauthenticated availability amplifier (~35 concurrent requests
// saturate one core's loop time). util.promisify over the callback form
// keeps the parameters, the stored format, and the timing profile
// byte-identical; every call site was already async (routes, seed,
// tests) — the awaits are the whole diff.
import {
  createHash,
  randomBytes,
  randomInt,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback) as (
  password: string,
  salt: string,
  keylen: number,
) => Promise<Buffer>;

const KEY_LENGTH = 64;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scrypt(password, salt, KEY_LENGTH)).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const parts = stored.split(":");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  const [, salt, expected] = parts;
  const actual = (await scrypt(password, salt, KEY_LENGTH)).toString("hex");
  const a = Buffer.from(actual, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

// Session-163 (the digma S72-C port): the login route's timing equalizer.
// The pre-fix `!user || !verifyPassword(...)` short-circuit skipped the
// scrypt work for unknown emails — response latency distinguished
// registered emails even after the status-code envelope was unified. The
// fix burns the SAME scrypt work on the miss branch against a precomputed
// hash of a throwaway constant (the constant-work envelope; the 401
// envelope family stays byte-identical). LAZY: computed once on the first
// miss, never a cold-start scrypt on every module import — the login route
// is the only consumer.
let equalizerHash: string | null = null;

export async function timingEqualizerHash(): Promise<string> {
  // The memo race is benign: two concurrent initial callers both
  // compute the same constant and the final write wins — the value is
  // deterministic.
  if (equalizerHash === null) {
    equalizerHash = await hashPassword("neo-crm-timing-equalizer-constant");
  }
  return equalizerHash;
}

// Session-164 (the skill §12 hashed-at-rest compliance): the reset-token
// lookup hash. The token is a 32-byte crypto-random value (256-bit
// entropy) carried in the delivery URL; the DB stores only its SHA-256
// hex — a read compromise of the database never mints live reset URLs.
// A FAST hash is the correct tool here (no brute-force surface on
// 256-bit input), unlike the password/verify-code family whose
// user-chosen low entropy needs the slow scrypt: the code-vs-token
// asymmetry.
export function hashResetToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

// Session-163: moved verbatim from src/lib/verification-server.ts (the
// seam's sixth-digit family — uniformly random, leading zeros allowed, the
// reference's inputs are digit strings, not numbers).
export function generateVerifyCode(): string {
  let code = "";
  for (let i = 0; i < 6; i += 1) code += String(randomInt(10));
  return code;
}
