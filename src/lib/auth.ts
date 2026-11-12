// Hand-rolled session auth (no NextAuth, no JWTs — matches the scaffold
// family conventions): scrypt password hashes + HMAC-SHA256 signed
// stateless cookie (`neo_session`, 7-day TTL).
//
// Cookie payload: base64url(JSON{uid,iat,exp,v}) + "." + hex HMAC — the
// `v` (session-163, the digma S67-A port) is the revocation dimension: a
// password reset increments the row's tokenVersion and every previously
// minted cookie dies at the getSessionUser comparison.

import { createHmac, timingSafeEqual } from "crypto";
// Session-163 (the digma S70-D port): the pure crypto trio lives in
// src/lib/password.ts (the node:crypto-only seam the seed script can
// import); this module re-exports it so the routes' existing import
// surface (import { hashPassword } from "@/lib/auth") survives
// byte-identically.
import { hashPassword, timingEqualizerHash, verifyPassword } from "@/lib/password";
export { hashPassword, timingEqualizerHash, verifyPassword };
import { cookies } from "next/headers";
import { db } from "./db";

export const SESSION_COOKIE = "neo_session";
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const DEV_SECRET = "neo-crm-dev-only-insecure-secret";

// Session-63 (N-63g): the short-secret case used to fall back as
// silently as the unset case — production would ship forgeable
// sessions with no signal. Warn ONCE: secret() rides every session op.
// Session-169 (F-169p — the web-app-foundation §6.2 posture): production
// now FAILS HARD instead — the warn-once fallback shipped forgeable
// sessions silently (and .env.example misdocumented a "hard error an
// unset value raises" that never existed for either face). The throw
// rides secret(), which every session op calls: the first op surfaces
// the actionable message instead of minting forgeable cookies. Dev/test
// keep the documented DEV fallback (the DX story unchanged — the
// warn-once survives for the non-production faces only).
let warnedInsecureSecret = false;

function secret(): string {
  const env = process.env.AUTH_SECRET;
  if (env && env.length >= 16) return env;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "[auth] AUTH_SECRET is missing or shorter than 16 chars in production — sessions would be forgeable. Generate one with: openssl rand -hex 32",
    );
  }
  if (!warnedInsecureSecret) {
    warnedInsecureSecret = true;
    console.warn(
      "[auth] AUTH_SECRET is missing or shorter than 16 chars — falling back to the insecure dev-only secret (dev/test only; production fails hard). Generate one with: openssl rand -hex 32",
    );
  }
  return DEV_SECRET;
}

// ---- password hashing ------------------------------------------------------
// (Session-163: the implementation moved to the pure seam —
// src/lib/password.ts — re-exported above.)

// ---- session token ---------------------------------------------------------

export interface SessionPayload {
  uid: string;
  iat: number;
  exp: number;
  // Session-163 (the digma S67-A port): the revocation dimension. The
  // version rides the SIGNED payload — a password reset increments the
  // live row's tokenVersion and every previously minted cookie dies at
  // the getSessionUser comparison. A MISSING v (a pre-163 token) reads as
  // 0 — the pre-retrofit rows' value — so the fleet is not force-logged
  // out at deploy; the first reset/eviction event is what separates the
  // eras.
  v: number;
}

function b64url(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url");
}

function unb64url(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

export function signSession(uid: string, tokenVersion = 0, now = Date.now()): string {
  const payload: SessionPayload = {
    uid,
    iat: now,
    exp: now + SESSION_TTL_MS,
    v: tokenVersion,
  };
  const body = b64url(JSON.stringify(payload));
  const sig = createHmac("sha256", secret()).update(body).digest("hex");
  return `${body}.${sig}`;
}

export function verifySessionToken(token: string | undefined | null, now = Date.now()): SessionPayload | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", secret()).update(body).digest("hex");
  const a = Buffer.from(sig, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(unb64url(body)) as Partial<SessionPayload>;
    if (typeof payload.uid !== "string" || typeof payload.exp !== "number") return null;
    if (payload.exp < now) return null;
    // Session-163: the version's own shape guard — a non-integer,
    // fractional, or negative v is rejected even under a valid signature
    // (unforgeable in practice — the v rides the HMAC payload — but the
    // parse must never widen what the mint sites can write). A MISSING v
    // is the pre-163 form and reads as 0.
    const version = payload.v ?? 0;
    if (typeof version !== "number" || !Number.isInteger(version) || version < 0) return null;
    return { uid: payload.uid, iat: payload.iat ?? 0, exp: payload.exp, v: version };
  } catch {
    return null;
  }
}

// ---- request helpers -------------------------------------------------------

export async function setSessionCookie(uid: string, tokenVersion = 0): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, signSession(uid, tokenVersion), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  // Session-67 (N-67j): the flag family mirrors the set-side twin —
  // deletion only ever needed name+path match, but a future cookie-policy
  // change now stays consistent across set/clear by construction.
  store.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  avatarColor: string;
  // Session-30 (S30-P3): carried so the topbar avatar can render the
  // uploaded photo (the reference's profile_picture).
  photoUrl: string | null;
  role: string;
  // Session-221 (R-18, F-221s): the profile-metadata field the GDPR
  // export carries in its user block (the account's creation date).
  createdAt: Date;
}

/** Resolve the signed-in user from the request cookie, or null. */
export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  const payload = verifySessionToken(token);
  if (!payload) return null;
  // Session-228 (R-25, F-228h): an explicit select of exactly the
  // consumed fields — the bare findUnique hauled passwordHash,
  // resetToken, and verificationCodeHash (two 200+ char hashes) into
  // scope on every sessioned request's hot path for nothing.
  const user = await db.user.findUnique({
    where: { id: payload.uid },
    select: {
      id: true,
      email: true,
      name: true,
      avatarColor: true,
      photoUrl: true,
      role: true,
      tokenVersion: true,
      createdAt: true,
    },
  });
  // Session-163 (the digma S67-A port): the database-seam version check —
  // a token minted before a password reset still parses and still carries
  // a valid signature, but its embedded version no longer matches the
  // holder's live row. This is the eviction the stateless format needed:
  // the reset increments tokenVersion and every pre-reset cookie dies
  // with it (a stolen/observed session no longer outlives the reset
  // performed specifically to kill it).
  if (!user || user.tokenVersion !== payload.v) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatarColor: user.avatarColor,
    photoUrl: user.photoUrl,
    role: user.role,
    createdAt: user.createdAt,
  };
}
