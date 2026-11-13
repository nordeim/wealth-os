import { createHmac } from "crypto";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { hashPassword, verifyPassword, signSession, verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

describe("password hashing", () => {
  // Session-235 (R-32, F-235d): the seam went async — the awaits are the
  // whole diff (identical parameters, format, and timing profile).
  it("round-trips a password", async () => {
    const stored = await hashPassword("Sup3rSecret!");
    expect(stored.startsWith("scrypt:")).toBe(true);
    expect(await verifyPassword("Sup3rSecret!", stored)).toBe(true);
  });

  it("rejects a wrong password", async () => {
    const stored = await hashPassword("Sup3rSecret!");
    expect(await verifyPassword("wrong", stored)).toBe(false);
  });

  it("produces unique salts for identical passwords", async () => {
    expect(await hashPassword("same")).not.toBe(await hashPassword("same"));
  });

  it("rejects malformed stored hashes", async () => {
    expect(await verifyPassword("x", "not-a-hash")).toBe(false);
    expect(await verifyPassword("x", "bcrypt:abc:def")).toBe(false);
    expect(await verifyPassword("x", "scrypt:only-two")).toBe(false);
  });
});

describe("session tokens", () => {
  it("signs and verifies a session", () => {
    const token = signSession("user_123");
    const payload = verifySessionToken(token);
    expect(payload?.uid).toBe("user_123");
    expect(typeof payload?.exp).toBe("number");
  });

  it("rejects tampered signatures", () => {
    const token = signSession("user_123");
    const tampered = `${token.slice(0, -4)}dead`;
    expect(verifySessionToken(tampered)).toBeNull();
  });

  it("rejects expired tokens", () => {
    const now = Date.now();
    // Session-163: the signature gained the tokenVersion parameter —
    // (uid, version, now).
    const token = signSession("user_123", 0, now - 8 * 24 * 60 * 60 * 1000); // 8 days ago
    expect(verifySessionToken(token, now)).toBeNull();
  });

  it("rejects garbage tokens", () => {
    expect(verifySessionToken(null)).toBeNull();
    expect(verifySessionToken("")).toBeNull();
    expect(verifySessionToken("no-dot")).toBeNull();
    expect(verifySessionToken("....")).toBeNull();
  });

  it("exports the expected cookie name", () => {
    expect(SESSION_COOKIE).toBe("neo_session");
  });
});

// ---- session-163: the tokenVersion revocation dimension (digma S67-A) ----
// The payload gains a version field that rides the signed body; a password
// reset (or any future revocation event) increments the live row's version
// and every previously minted cookie dies at the getSessionUser comparison.

describe("session token versioning (session-163)", () => {
  // ---- session-164: the ambient-env test-isolation cure --------------------
  // The RED that named the round: @prisma/client's module init auto-loads
  // the repo .env into process.env (bisected live: @/lib/password UNSET ->
  // @/lib/db-path UNSET -> @/lib/db SET — the generated client's dotenv
  // pass), so any workspace whose .env carries a >=16-char AUTH_SECRET
  // flips secret() off the DEV fallback these hand-signed constructions
  // hard-code. The battery is now env-PINNED: beforeAll plants the ambient
  // condition ON PURPOSE (so the pin is exercised even where the import
  // chain leaks nothing), beforeEach deletes AUTH_SECRET before every
  // hand-signed construction (the fix), afterAll restores whatever the
  // process carried. A test that hard-codes a fallback constant inherits
  // every ambient env leak of its import graph — pin the env or the test
  // is environment-dependent (the L-164c1 lesson).
  const AMBIENT_AUTH_SECRET = "f".repeat(64);
  let savedAuthSecret: string | undefined;
  beforeAll(() => {
    savedAuthSecret = process.env.AUTH_SECRET;
    process.env.AUTH_SECRET = AMBIENT_AUTH_SECRET;
  });
  afterAll(() => {
    if (savedAuthSecret === undefined) delete process.env.AUTH_SECRET;
    else process.env.AUTH_SECRET = savedAuthSecret;
  });
  beforeEach(() => {
    delete process.env.AUTH_SECRET;
  });

  it("signs a versioned token and round-trips it", () => {
    const token = signSession("user_123", 3);
    const payload = verifySessionToken(token);
    expect(payload?.uid).toBe("user_123");
    expect(payload?.v).toBe(3);
  });

  it("defaults the version to 0 (the pre-retrofit row's value)", () => {
    const token = signSession("user_123");
    const payload = verifySessionToken(token);
    expect(payload?.v).toBe(0);
  });

  it("accepts a PRE-RETROFIT token (no v field) as version 0 — no forced fleet re-login", () => {
    // The pre-163 payload shape: {uid, iat, exp} with a valid HMAC under
    // the dev secret (unset AUTH_SECRET in the test environment).
    const payload = { uid: "user_123", iat: Date.now(), exp: Date.now() + 60_000 };
    const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const sig = createHmac("sha256", "neo-crm-dev-only-insecure-secret").update(body).digest("hex");
    const parsed = verifySessionToken(`${body}.${sig}`);
    expect(parsed?.uid).toBe("user_123");
    expect(parsed?.v).toBe(0);
  });

  it("rejects a non-integer version even under a valid signature", () => {
    const payload = { uid: "user_123", iat: Date.now(), exp: Date.now() + 60_000, v: "x" };
    const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const sig = createHmac("sha256", "neo-crm-dev-only-insecure-secret").update(body).digest("hex");
    expect(verifySessionToken(`${body}.${sig}`)).toBeNull();
  });

  it("rejects a fractional version even under a valid signature", () => {
    const payload = { uid: "user_123", iat: Date.now(), exp: Date.now() + 60_000, v: 1.5 };
    const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const sig = createHmac("sha256", "neo-crm-dev-only-insecure-secret").update(body).digest("hex");
    expect(verifySessionToken(`${body}.${sig}`)).toBeNull();
  });

  it("rejects a negative version even under a valid signature", () => {
    const payload = { uid: "user_123", iat: Date.now(), exp: Date.now() + 60_000, v: -1 };
    const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const sig = createHmac("sha256", "neo-crm-dev-only-insecure-secret").update(body).digest("hex");
    expect(verifySessionToken(`${body}.${sig}`)).toBeNull();
  });

  it("is env-pinned: an ambient AUTH_SECRET never reaches the hand-signed constructions (session-164)", () => {
    // The regression pin for the isolation defect itself. beforeAll
    // planted the 64-char ambient AUTH_SECRET (the @prisma/client
    // .env auto-load condition that shipped the round — the baseline
    // gate was RED on a fresh workspace because of it); the
    // beforeEach pin must have removed it before this construction
    // ran, and the DEV-secret-signed pre-retrofit token must verify.
    expect(process.env.AUTH_SECRET).toBeUndefined();
    const payload = { uid: "pin_check", iat: Date.now(), exp: Date.now() + 60_000 };
    const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const sig = createHmac("sha256", "neo-crm-dev-only-insecure-secret").update(body).digest("hex");
    const parsed = verifySessionToken(`${body}.${sig}`);
    expect(parsed?.uid).toBe("pin_check");
    expect(parsed?.v).toBe(0);
  });

  it("rejects the ambient secret's own signature as a foreign key (the battery stays honest)", () => {
    // The mirror face: a token signed with the AMBIENT secret (not the
    // pinned DEV fallback) must NOT verify inside the pinned battery —
    // proving the rejection tests reject at the right layer (the
    // signature comparison under the pinned secret), never vacuously.
    const payload = { uid: "user_123", iat: Date.now(), exp: Date.now() + 60_000, v: 0 };
    const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const sig = createHmac("sha256", AMBIENT_AUTH_SECRET).update(body).digest("hex");
    expect(verifySessionToken(`${body}.${sig}`)).toBeNull();
  });
});

// ---- session-169: the production secret gate (F-169p — the code face) ----
// The web-app-foundation §6.2 posture (the L-164c3 doctrine: the repo's
// own distilled companion skill is the bar): production FAILS HARD on a
// missing OR short AUTH_SECRET — the warn-once fallback shipped forgeable
// sessions silently (and .env.example misdocumented a "hard error an
// unset value raises" that never existed — both faces cured this round).
// The gate rides secret(), which every session op calls: the first op
// surfaces the actionable message instead of minting forgeable cookies.
// Dev/test keep the documented DEV fallback — the existing hand-signed
// battery above IS that face; the pin below makes the development face
// explicit. The env-pinning follows the s164 idiom (restore in afterAll).

describe("the production secret gate (session-169)", () => {
  let savedAuthSecret: string | undefined;
  let savedNodeEnv: string | undefined;

  beforeAll(() => {
    savedAuthSecret = process.env.AUTH_SECRET;
    savedNodeEnv = process.env.NODE_ENV;
  });
  afterAll(() => {
    if (savedAuthSecret === undefined) delete process.env.AUTH_SECRET;
    else process.env.AUTH_SECRET = savedAuthSecret;
    // NODE_ENV is read-only in @types/node's ProcessEnv — restore (and
    // mutate below) through the writable view
    const env = process.env as Record<string, string | undefined>;
    if (savedNodeEnv === undefined) delete env.NODE_ENV;
    else env.NODE_ENV = savedNodeEnv;
  });

  it("production + a MISSING AUTH_SECRET → the session seam THROWS (no forgeable sessions)", () => {
    delete process.env.AUTH_SECRET;
    (process.env as Record<string, string | undefined>).NODE_ENV = "production";
    expect(() => signSession("user_123", 0)).toThrow(
      /AUTH_SECRET is missing or shorter than 16 chars/,
    );
  });

  it("production + a SHORT AUTH_SECRET → the session seam THROWS (either face, not just unset)", () => {
    process.env.AUTH_SECRET = "short-secret"; // 12 chars < 16
    (process.env as Record<string, string | undefined>).NODE_ENV = "production";
    expect(() => signSession("user_123", 0)).toThrow(/AUTH_SECRET/);
  });

  it("development keeps the documented DEV fallback (the DX story unchanged)", () => {
    delete process.env.AUTH_SECRET;
    (process.env as Record<string, string | undefined>).NODE_ENV = "development";
    const token = signSession("user_123", 0);
    expect(verifySessionToken(token)?.uid).toBe("user_123");
  });
});
