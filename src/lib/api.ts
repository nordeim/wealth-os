// API envelope + guards for route handlers.
// Every handler returns { ok, data } | { ok, error: { code, message } }.

import { NextResponse } from "next/server";
import type { z } from "zod";
import { getSessionUser, type SessionUser } from "./auth";
import { isTransientDbError } from "./db";

export type ApiError = { code: string; message: string };
export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError };

export function ok<T>(data: T, init?: number): NextResponse {
  // Session-217 (R-14, F-217g): every envelope response carries
  // `Cache-Control: no-store` — the financial-data GETs (transactions,
  // dashboard, export — the GDPR dump) must never sit in a browser or
  // intermediary cache. The uploads GET is NOT an envelope response
  // (its own immutable caching on capability URLs stands).
  return NextResponse.json({ ok: true, data } satisfies ApiResult<T>, {
    status: init ?? 200,
    headers: { "Cache-Control": "no-store" },
  });
}

export function fail(code: string, message: string, status = 400): NextResponse {
  return NextResponse.json({ ok: false, error: { code, message } } satisfies ApiResult<never>, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export const ERR = {
  UNAUTHORIZED: () => fail("UNAUTHORIZED", "Sign in required", 401),
  // Session-221 (R-18, F-221t): the 403 arm retired — zero consumers
  // repo-wide, and the 404-never-403 posture (resource-existence
  // hiding) means a dead 403 arm is a drift hazard: a future
  // contributor reaching for it would reintroduce existence-leaking
  // 403s. NOT_FOUND is the family's answer for other users' rows.
  NOT_FOUND: (what = "Record") => fail("NOT_FOUND", `${what} not found`, 404),
  BAD_REQUEST: (msg: string) => fail("BAD_REQUEST", msg, 400),
  // Session-67 (N-67h): the 429 family carries Retry-After consistently —
  // login used to hand-build its own (bypassing fail()) while the
  // siblings shipped no header at all. The optional param keeps the
  // zero-arg calls valid; the envelope shape is identical either way.
  RATE_LIMITED: (retryAfterSec?: number): NextResponse =>
    retryAfterSec === undefined
      ? fail("RATE_LIMITED", "Too many attempts. Try again later.", 429)
      : NextResponse.json(
          { ok: false, error: { code: "RATE_LIMITED", message: "Too many attempts. Try again later." } } satisfies ApiResult<never>,
          { status: 429, headers: { "Retry-After": String(Math.max(1, retryAfterSec)), "Cache-Control": "no-store" } },
        ),
  INTERNAL: () => fail("INTERNAL", "Something went wrong. Please try again.", 500),
  // Session-236 (R-33, F-236b): the transient-DB family's honest answer —
  // a pool/transaction timeout is 503 with the auth family's byte-identical
  // copy (F-221g's inline arms hoisted into the envelope; the sessioned
  // CRUD routes join the family through isTransientDbError in src/lib/db).
  UNAVAILABLE: () =>
    fail("UNAVAILABLE", "The request took too long — the database timed out. Try again.", 503),
  // Session-228 (R-25, F-228f): the uploads capacity ceiling's honest
  // answer — 507 (Insufficient Storage) is the semantically correct
  // code for a self-hosted disk guard, not a 400 (the caller's request
  // is fine) and not a bare 500 (nothing failed). Admin-facing: the
  // operator clears <repo>/uploads/.
  STORAGE_FULL: () =>
    fail("STORAGE_FULL", "Upload storage is full. Please contact the administrator.", 507),
};

/** Session-226 (R-23, F-226c): the server-side error trace. Every
 * handler's catch used to discard the error object entirely — a
 * SQLITE_BUSY, an ENOSPC, or a libsql timeout left ZERO trace (the
 * client envelope stays generic by design; the OPERATOR side was the
 * gap). The seam prints the route scope + the error before the
 * envelope is returned; no secrets are logged (the envelopes never
 * carry them, and the thrown objects are driver errors). */
export function logApiError(scope: string, error: unknown): void {
  console.error(`[api] ${scope}`, error);
}

/** Guard: returns the session user or a 401 response (callers must return it). */
export async function requireSession(): Promise<{ user: SessionUser } | { response: NextResponse }> {
  // Session-41 (S41-P4): the shared session read joined the envelope —
  // getSessionUser()'s findUnique is the one DB call EVERY protected route
  // makes, and a SQLITE_BUSY-class failure here used to answer a raw
  // non-JSON 500. The 401 path (no session / bad cookie) is unchanged.
  let user: SessionUser | null;
  try {
    user = await getSessionUser();
  } catch (error) {
    logApiError("session read", error);
    // Session-237 (R-34, F-237b): the seam the F-236b family missed —
    // this catch is the one DB call EVERY protected route makes, and
    // it answered the generic 500 for a pool/transaction timeout
    // while the routes' own arms (which sit AFTER this guard returns)
    // carried the honest 503. The arm rides here now: every guarded
    // route inherits the transient answer through the seam.
    if (isTransientDbError(error)) return { response: ERR.UNAVAILABLE() };
    return { response: ERR.INTERNAL() };
  }
  if (!user) return { response: ERR.UNAUTHORIZED() };
  return { user };
}

export function isGuarded(x: { user: SessionUser } | { response: NextResponse }): x is { response: NextResponse } {
  return "response" in x;
}

// ---- the auth-family body pre-gate (session-67, N-67d) ---------------------

/** Session-67 (N-67d): the declared-size ceiling for the public auth
 * routes' JSON bodies — the S36-P3 upload precedent extended to the
 * family that buffers req.json() with no default cap. The honest bodies
 * are tiny (email capped at 160 chars + password + a 6-digit code), so
 * 16KB is beyond generous. Documented limitation (inherited from the
 * upload gate): a chunked body without a Content-Length header bypasses
 * this check; the JSON parse's own failure mode stays the backstop.
 * Session-68 (F-68a2): the SAME ceiling + helper now gate the sessioned
 * CRUD family too — placed after requireSession, before the parse; the
 * honest CRUD bodies are asString-capped fields, far below the ceiling.
 * Session-72 (M-72c2) + session-73 (N-73a1): the family is THIRTEEN
 * routes (the sessioned resource families x(root+[id]) + settings +
 * users + reset — the users PATCH joined at s72; this comment's "12"
 * enumeration was the s72 record's unlanded half). Session-220
 * (F-220n): the stale CRM-era route names (activities/contacts/
 * events/leads) retired from the enumeration. */
export const MAX_AUTH_BODY_BYTES = 16 * 1024;

/** True when the request DECLARES a body larger than the ceiling —
 * call before `req.json()` so an oversized body is rejected without ever
 * being read into memory. The `maxBytes` parameter lets a route with a
 * larger honest payload (the import commit) raise its own bar. */
export function isBodyTooLarge(req: Request, maxBytes: number = MAX_AUTH_BODY_BYTES): boolean {
  return Number(req.headers.get("content-length") ?? 0) > maxBytes;
}

/** Session-216 (R-13, F-216a): the Import commit's OWN body ceiling.
 * csvImportSchema contracts 5000 rows and the Import page posts them
 * in ONE request — the global 16KB auth-family ceiling (whose honest
 * bodies are tiny single-record CRUD) rejected any real import of
 * ≳140 minimal rows against the UI's own promise. 5000 rows × the
 * worst-case ~250-byte row (a 200-char description + the capped
 * fields) ≈ 1.25MB — 4MB keeps generous headroom while still bounding
 * the read (the seam's whole point). Every other route keeps the
 * 16KB default. */
export const MAX_IMPORT_BODY_BYTES = 4 * 1024 * 1024;

/** Session-217 (R-14, F-217b): the AI coach route's OWN body ceiling.
 * aiCoachSchema contracts `history: 30 × content-max-4000` ("rides the
 * request for a future LLM provider", the route's own docblock) — the
 * worst-case LEGAL payload quote-escapes every byte (2× per char,
 * ~242KB) AND control characters escape to SIX bytes each (`\u0001` —
 * 30 × 4000 → ~720KB on the wire, the F-218s correction of the
 * session-217 budget math). 1MB covers the schema's true worst case
 * with headroom while still bounding the read. The first-party client
 * sends only { question } (≤ ~600B) — the cap guards the CONTRACT,
 * not a live consumer. */
export const MAX_AI_BODY_BYTES = 1024 * 1024;

// ---- the bounded body reader (session-165 — the digma S148-A/S75-B -----
// port): the ONE seam every JSON body parse site consumes.

/** The bounded read result: `tooLarge` answers the shared "Request body
 *  too large" 400; `value` carries the parsed JSON (null when
 *  unparseable OR unparseable-by-policy — the sites' historical
 *  `.catch(() => null)` contract, digma's documented form). */
export type BoundedJson =
  | { tooLarge: true }
  | { tooLarge: false; value: Record<string, unknown> | null };

/** Session-165: read + bound a JSON request body. Two closed classes,
 *  both digma ports (the s163 doctrine: the auth-mechanics reference
 *  is the port donor):
 *
 *  THE CONTENT-TYPE CSRF GATE (digma S148-A / B148-L1): a JSON-parse
 *  seam blocks unparseable bodies, never form-originated transports —
 *  an HTML `<form method="POST" enctype="text/plain">` (the classic
 *  name/value trick) posts a body that parses as valid JSON, so
 *  req.json() alone never barred the cross-site form POST, and the
 *  public auth family MINTS cookies on POST (login/signup/verify) —
 *  the login-CSRF class: the attacker's session planted in the
 *  victim's jar (SameSite=Lax gates cookie SENDING on cross-site
 *  POSTs, never cookie SETTING). The gate: a Content-Type not
 *  carrying application/json (case-insensitive; the "; charset="
 *  suffix tolerated) is unparseable-by-policy — the null contract
 *  below, the call sites' 400 vocabulary untouched, zero call-site
 *  changes. First-party consumers all send application/json (the
 *  lead-verified census: the store's call() seam, the five
 *  login-card fetches, the reset screen, the e2e in-page fetch
 *  headers, Playwright's object-data default, the sweep's UI-form
 *  login). The stream is cancelled like the tooLarge path — a
 *  kept-open stream would hold the connection.
 *
 *  THE STREAM COUNTER (digma S75-B / B75-F1): the pre-165 form (the
 *  isBodyTooLarge declared-length check before an unbounded
 *  req.json()) left the chunked-transfer family open — a
 *  Transfer-Encoding: chunked request carries NO Content-Length, so
 *  the gate passed and the parse buffered the whole body before any
 *  per-field cap ran. The counter: request.body read chunk-by-chunk,
 *  rejecting + cancelling the read past the ceiling. The declared
 *  fast path (isBodyTooLarge — the N-67d lineage, unchanged) stays
 *  ahead of it so an over-declared body rejects before ANY read.
 *  Session-216 (R-13, F-216a): the ceiling is PARAMETERIZED — the
 *  default stays MAX_AUTH_BODY_BYTES for every existing consumer;
 *  the import route passes its own MAX_IMPORT_BODY_BYTES. */
export async function readBoundedJson(
  req: Request,
  maxBytes: number = MAX_AUTH_BODY_BYTES,
): Promise<BoundedJson> {
  // Layer 1 — the content-type CSRF gate, ahead of every byte read.
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    await req.body?.cancel().catch(() => {});
    return { tooLarge: false, value: null };
  }
  // Layer 2 — the declared-length fast path (an over-declared body
  // rejects before any byte is read; the unconsumed stream is
  // cancelled — the symmetric twin of the counter's own cancel below).
  if (isBodyTooLarge(req, maxBytes)) {
    await req.body?.cancel().catch(() => {});
    return { tooLarge: true };
  }
  const body = req.body;
  if (!body) {
    // No stream to bound (a body-less request): the standard parse,
    // guarded the same way the sites' old form was.
    try {
      return { tooLarge: false, value: (await req.json()) as Record<string, unknown> };
    } catch {
      return { tooLarge: false, value: null };
    }
  }
  // Layer 3 — the stream counter: the chunked family's only bound.
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      total += value.byteLength;
      if (total > maxBytes) {
        // Stop the producer before returning — a kept-open stream
        // would hold the connection and buffer the remaining chunks
        // server-side.
        await reader.cancel().catch(() => {});
        return { tooLarge: true };
      }
      chunks.push(value);
    }
  }
  // The decode+parse tail keeps the null-on-unparseable contract, so
  // the call sites' field narrowing is untouched.
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return { tooLarge: false, value: JSON.parse(new TextDecoder().decode(merged)) as Record<string, unknown> };
  } catch {
    return { tooLarge: false, value: null };
  }
}

// ---- the Zod parse seam (session-163 — the auth family's validation) ----

/** Session-163: parse + validate a JSON body against a Zod schema.
 *  Session-165: composes the bounded reader (readBoundedJson — the
 *  content-type CSRF gate + the declared fast path + the stream
 *  counter) ahead of safeParse, and maps the first schema issue onto
 *  the BAD_REQUEST envelope as a ready-made response — the route
 *  returns it verbatim. The schemas live in src/lib/schemas.ts (the
 *  seam). Session-216 (R-13, F-216a): the optional `maxBytes` threads
 *  to the reader — the import route passes its own ceiling, every
 *  other consumer keeps the default. */
export async function parseBody<S extends z.ZodTypeAny>(
  req: Request,
  schema: S,
  maxBytes?: number,
): Promise<{ ok: true; data: z.output<S> } | { ok: false; response: NextResponse }> {
  const read = await readBoundedJson(req, maxBytes);
  if (read.tooLarge) return { ok: false, response: ERR.BAD_REQUEST("Request body too large") };
  const raw: unknown = read.value;
  if (raw === null) return { ok: false, response: ERR.BAD_REQUEST("Invalid request body") };
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const message = first?.message ?? "Invalid request body";
    return { ok: false, response: ERR.BAD_REQUEST(message) };
  }
  return { ok: true, data: parsed.data };
}

// ---- hand-rolled validation helpers (the query-param GET family + the -----
// behavior battery — the CRUD body-guard forms RETIRED at session-166:
// the twelve body routes ride parseBody/safeParse against
// src/lib/schemas.ts now; asString/asDate survive on the URL-param
// surfaces — events' from/to windows, the reports/export/search
// period+q parses — and the isBad*/asFKId/asNumber/asInt predicates
// stay exported for their pure-function battery,
// tests/coercion-guards.test.ts, the living record of the semantics
// the schema field-builders recast)

export function asString(v: unknown, { max = 500, optional = false } = {}): string | undefined {
  if (v === undefined || v === null) return optional ? undefined : "";
  if (typeof v !== "string") return optional ? undefined : "";
  const s = v.trim();
  if (s.length === 0) return optional ? undefined : "";
  return s.slice(0, max);
}

/** Session-37 (S37-P3): a PRESENT FK payload must be a string (or an
 *  explicit null). Non-string values used to ride asString's optional
 *  coercion to `undefined` → `null` — a SILENT FK clear on PUT. Routes
 *  pair this with a 400 ("Invalid company/owner/contact selection"). */
export function isBadFK(v: unknown): boolean {
  return v !== undefined && v !== null && typeof v !== "string";
}

/** Session-37 (S37-P3): FK id parse — null/""/whitespace → null (the
 *  explicit clear), a string → the trimmed id. Guard with isBadFK first:
 *  this helper silently clears non-strings by design (the asString
 *  semantics the selects' "" emissions rely on). */
export function asFKId(v: unknown): string | null {
  return asString(v, { optional: true }) ?? null;
}

/** Session-40 (S40-P1): the general present-non-string predicate —
 *  isBadFK's class, named for the non-FK fields it guards (email, phone,
 *  notes, status…). A PRESENT non-string used to ride asString's
 *  optional coercion to undefined → `?? null` — a SILENT field clear
 *  on PUT. Routes pair this with a 400 ("Invalid <thing>"). */
export function isBadString(v: unknown): boolean {
  return v !== undefined && v !== null && typeof v !== "string";
}

/** Session-40 (S40-P1): dates have a parseable shape, so the guard is
 *  stricter than isBadString — an UNPARSEABLE string is bad too
 *  (asDate("garbage") → undefined → `?? null` silently cleared the
 *  field). "" stays the explicit clear (the asFKId convention); a
 *  parseable string (ISO, date-only) passes. */
export function isBadDate(v: unknown): boolean {
  if (v === undefined || v === null || v === "") return false;
  if (typeof v !== "string") return true;
  return Number.isNaN(new Date(v).getTime());
}

/** Session-40 (S40-P1): Number()'s truthy/array edges are the hazard —
 *  Number(true)=1, Number([5])=5, Number([])=0, Number(" ")=0 — so a
 *  JSON boolean/array payload silently stored a number. Accepted: a
 *  finite number, or a numeric string (the UI's Number()/parseFloat
 *  shapes serialize through JSON as strings only when hand-written).
 *  "" stays absent (asNumber's own special case); a whitespace-only
 *  string is BAD (it would silently store 0). */
export function isBadNumber(v: unknown): boolean {
  if (v === undefined || v === null || v === "") return false;
  if (typeof v === "number") return !Number.isFinite(v);
  if (typeof v === "string") return v.trim() === "" || !Number.isFinite(Number(v));
  return true;
}

/** Session-42 (S42-P2): the strict-bool silent-clear family —
 *  `data.isKey = body.isKey === true` silently stored FALSE for a
 *  present non-boolean ({"isKey":"yes"} → 200 + false) and silently
 *  CLEARED an existing true on PUT (a key account de-keyed without an
 *  error — LIVE-proven). The isBadString shape one type over: only a
 *  PRESENT non-boolean is bad; absent/null keep the false-default
 *  (POST) and no-change (PUT) semantics. The UI writers are real
 *  checkbox booleans (Radix onCheckedChange) or absent — the surface
 *  is API-only. */
export function isBadBool(v: unknown): boolean {
  return v !== undefined && v !== null && typeof v !== "boolean";
}

export function asNumber(v: unknown): number | undefined {
  if (v === undefined || v === null || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export function asInt(v: unknown): number | undefined {
  const n = asNumber(v);
  return n === undefined ? undefined : Math.trunc(n);
}

export function asDate(v: unknown): Date | undefined {
  if (typeof v !== "string" || !v) return undefined;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d;
}
