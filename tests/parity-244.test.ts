import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-244 (R-41): the source-tier pins for the guard-advance,
// upload-sniff, and select-seam round. Every RED pin was born over the
// pre-cure tree (the F-244 ledger rows in docs/remediation_plan_v2.md
// carry the verified evidence). Source-scanning contracts per the house
// convention: read the file, assert the contract. The two green-by-design
// legs are regression guards for the surfaces the round must preserve
// (the EXT_BY_MIME vocabulary, the sibling views' aria-hidden genus).

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

// ---- F-244b: the upload magic-byte sniff --------------------------------------

describe("F-244b — the upload route sniffs the stored bytes' magic", () => {
  it("the pure seam exports from src/lib/uploads.ts", () => {
    const src = read("src/lib/uploads.ts");
    expect(src).toContain("export function sniffImageMagic(");
  });

  it("the route imports the seam and gates the family match before the write", () => {
    const src = read("src/app/api/upload/route.ts");
    expect(src).toContain("sniffImageMagic,");
    // The family-match gate: the sniffed family must equal the declared
    // MIME's extension — a null (unknown bytes) or a cross-family
    // polyglot answers 400, never a write.
    expect(src).toContain("sniffImageMagic(bytes)");
    expect(src).toContain("sniffed !== ext");
    // The gate must precede the writeFile (the pre-write position —
    // the stored set stays images by construction, not by cleanup).
    const gateAt = src.indexOf("sniffImageMagic(bytes)");
    const writeAt = src.indexOf("await writeFile(");
    expect(gateAt).toBeGreaterThan(-1);
    expect(writeAt).toBeGreaterThan(-1);
    expect(gateAt).toBeLessThan(writeAt);
  });

  it("the mismatch answers the 400 envelope with the family truth", () => {
    const src = read("src/app/api/upload/route.ts");
    expect(src).toMatch(/BAD_REQUEST\([^)]*declared image type/);
  });
});

// ---- F-244c: the select-trigger appendage conversion ---------------------------

describe("F-244c — the select trigger joins the cn() appendage family", () => {
  it("the trigger rides the appendage form (no interpolated class string)", () => {
    const src = read("src/components/ui/select.tsx");
    // The F-229f appendage convention, the F-242e doctrine: the base
    // genus constants join through cn() as separate arguments — never
    // through string interpolation. A future runtime-value edit must
    // trip the lint shape, not silently emit no CSS under the v4 JIT.
    expect(src).toContain("SELECT_TRIGGER.base,");
    expect(src).toContain("SELECT_TRIGGER.placeholderState,");
    expect(src).toContain("SELECT_TRIGGER.focusRing,");
    expect(src).toContain('"disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"');
    // The retired template form — the one cn( + backtick site in src/.
    expect(src).not.toContain("${SELECT_TRIGGER.base}");
  });

  it("the parity-242 genus guard catches a backtick arriving inside cn()", () => {
    const src = read("tests/parity-242.test.ts");
    // The widened net: the guard flagged only the className={ backtick
    // form; the select trigger's cn( backtick form was invisible to it
    // (the F-242e genus's one escape). The pin asserts the guard's own
    // scan form, not a comment about it (the F-244e lesson: prose-
    // satisfiable pins prove nothing).
    expect(src).toContain('text.includes("cn(`")');
  });
});

// ---- F-244d: the OTP docblock console truths ----------------------------------

describe("F-244d — the OTP docblocks state the knob's console-side effect", () => {
  it("the signup docblock records the code-less audit entry", () => {
    const src = read("src/app/api/auth/signup/route.ts");
    expect(src).toContain("drops the console line to a code-less audit entry");
  });

  it("the resend docblock records the same truth", () => {
    const src = read("src/app/api/auth/resend/route.ts");
    expect(src).toContain("drops the console line to a code-less audit entry");
  });
});

// ---- F-244e: the parity-243 pin hardening --------------------------------------

describe("F-244e — the parity-243 legs assert forms, not prose", () => {
  it("the scanner pins carry the walker character-class forms", () => {
    const src = read("tests/parity-243.test.ts");
    // The F-244e lesson: toContain("jsx") was satisfiable by the
    // Session-243 comment inside the walker ("jsx joins the filter") —
    // a regex revert keeping the comment passed. The hardened legs
    // assert the FILTER FORMS themselves.
    expect(src).toContain("(ts|tsx|jsx|css)");
    expect(src).toContain("(tsx?|jsx|css)");
  });

  it("the F-243a battery pins the arm containment (the burn inside the if-user arm)", () => {
    const src = read("tests/parity-243.test.ts");
    // The order-only leg (burnAt > readAt) let a burn relocated after
    // the session read but OUTSIDE the sessioned arm pass — re-opening
    // the guest-burn poisoning. The hardened battery carries the arm
    // anchor form.
    expect(src).toContain('src.indexOf("if (user) {")');
    expect(src).toContain("the tokenVersion update");
  });
});

// ---- F-244f: the session-token TTL bound --------------------------------------

describe("F-244f — verifySessionToken bounds exp against iat", () => {
  it("the span guard rides the verifier", () => {
    const src = read("src/lib/auth.ts");
    // The far-future exp under a VALID signature nulls when its span
    // past iat exceeds the session TTL (plus a small slack for the
    // clock-skew window) — a future signer bug (a ms-vs-s unit slip)
    // surfaces at the verifier, not in production sessions.
    expect(src).toContain("payload.exp - (payload.iat ?? 0) > SESSION_TTL_MS");
  });
});

// ---- F-244g: the signin icons' aria-hidden riders -------------------------------

describe("F-244g — the signin view's field icons carry the explicit aria-hidden", () => {
  it("the Mail and Lock icons match the sibling views' genus", () => {
    const src = read("src/components/layout/login-card.tsx");
    expect(src).toContain('<Mail className={LOGIN_LAYOUT.inputIcon} aria-hidden="true" />');
    expect(src).toContain('<Lock className={LOGIN_LAYOUT.inputIcon} aria-hidden="true" />');
  });
});

// ---- F-244h: the role docblock truth -------------------------------------------

describe("F-244h — the role column's no-authority truth rides the mint site", () => {
  it("the signup mint documents that role gates nothing today", () => {
    const src = read("src/app/api/auth/signup/route.ts");
    expect(src).toContain("carries NO authority");
  });
});

// ---- the green-by-design regression guards --------------------------------------

describe("the round's preserved surfaces (green by design)", () => {
  it("the EXT_BY_MIME vocabulary keeps its five-entry family (F-221r genus)", () => {
    const src = read("src/lib/uploads.ts");
    expect(src).toContain('"image/jpeg": "jpg"');
    expect(src).toContain('"image/jpg": "jpg"');
    expect(src).toContain('"image/png": "png"');
    expect(src).toContain('"image/webp": "webp"');
    expect(src).toContain('"image/gif": "gif"');
  });

  it("the sibling views keep their aria-hidden icon genus (the F-244g family's other faces)", () => {
    const src = read("src/components/layout/login-card.tsx");
    // The reset/signup/verify/sent views carry the explicit form the
    // signin view joins — count at least four more carriers so the
    // rider cannot silently delete the genus instead of joining it.
    const carriers = src.match(/aria-hidden="true" \/>/g) ?? [];
    expect(carriers.length).toBeGreaterThanOrEqual(4);
  });
});
