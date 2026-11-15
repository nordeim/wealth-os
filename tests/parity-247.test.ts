import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-247 (R-44) — the guard-advance, iat-bound, and focus-pause
// round's source battery. Every pin here anchors on the CODE form (the
// F-244e lesson: never on any string a comment can also carry) and was
// born RED against the pre-cure tree unless its header says
// green-by-design. The round's two behavioral legs (a future iat, a
// non-numeric iat) live in tests/auth.test.ts beside the F-244f TTL
// legs they extend.

const read = (rel: string): string =>
  readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf-8");

// ---- F-247b: the iat shape-and-present bound ----------------------------------

describe("F-247b — verifySessionToken's iat carries its own shape-and-present bound", () => {
  it("the shape guard mirrors the exp/v family form for a present iat", () => {
    const src = read("src/lib/auth.ts");
    // The F-244f span guard closed only the exp half of the signer-bug
    // class its own docblock names; pre-cure, a non-numeric iat NaN'd
    // the span comparison into a silent pass while flowing the raw
    // value into SessionPayload. The CODE forms (not the docblock
    // prose — the F-244e lesson):
    expect(src).toContain('typeof payload.iat !== "number"');
    expect(src).toContain("Number.isFinite(payload.iat)");
  });

  it("the present bound rejects a future iat beyond the skew slack", () => {
    const src = read("src/lib/auth.ts");
    // A future iat (iat = now + X with a valid exp−iat span) was
    // honored X + TTL; the bound mirrors the span guard's own 60s
    // clock-skew slack.
    expect(src).toContain("payload.iat > now + 60_000");
    // The no-iat strict arm stays — a MISSING iat still reads as the
    // epoch against the span bound (the documented F-244f posture);
    // the new guard only touches a PRESENT iat.
    expect(src).toContain("if (payload.iat !== undefined) {");
  });
});

// ---- F-247c: the toast focus-pause riders -------------------------------------

describe("F-247c — the toast auto-dismiss pauses on keyboard focus too", () => {
  it("the card carries the onFocus/onBlur pair alongside the hover pair", () => {
    const src = read("src/components/ui/toast.tsx");
    // The 4s auto-dismiss paused on hover only; a keyboard user tabbed
    // onto the card's Dismiss button got no pause — the card died at
    // 4s with the focused button inside it. React's synthetic
    // onFocus/onBlur bubble from the button to the card, so the pair
    // completes the design's keyboard arm.
    // Session-248 (R-45, F-248b — the same-commit recalibration): the
    // four writers now target their OWN flags (hover and focus pause
    // independently, OR-composed — a pointer exit can no longer
    // un-pause a focus-held card; the parity-248 battery pins the
    // composition and this pin keeps the pair's presence).
    expect(src).toContain("onFocus={() => setFocusPaused(true)}");
    expect(src).toContain("onBlur={() => setFocusPaused(false)}");
    // The hover pair stays — the design's mouse arm, live-proven.
    expect(src).toContain("onMouseEnter={() => setHoverPaused(true)}");
    expect(src).toContain("onMouseLeave={() => setHoverPaused(false)}");
  });
});

// ---- F-247d: the auth-family select residuals ---------------------------------

describe("F-247d — the two residual auth-family reads carry their narrowings", () => {
  // F-246d narrowed the four public-funnel reads; the family's two
  // remaining full-row hauls (signup's existence check, reset-password's
  // token read) join them — the F-228h insurance doctrine completed.

  it("signup's existence check selects id only", () => {
    const src = read("src/app/api/auth/signup/route.ts");
    expect(src).toMatch(
      /findUnique\(\{\s*where: \{ email \},\s*select: \{ id: true \}\s*,?\s*\}\);?\s*$/m,
    );
    // The existence check consumes truthiness alone; every secret
    // column stays out of the handler's scope.
    const at = src.indexOf("findUnique({");
    const slice = src.slice(at, at + 300);
    expect(slice).not.toContain("passwordHash");
    expect(slice).not.toContain("resetToken");
    expect(slice).not.toContain("verificationCodeHash");
  });

  it("reset-password's token read selects id + expiry only", () => {
    const src = read("src/app/api/auth/reset-password/route.ts");
    expect(src).toMatch(
      /findFirst\(\{\s*where: \{ resetToken: hashResetToken\(resetToken\) \},\s*select: \{ id: true, resetTokenExpiresAt: true \},?\s*\}\)/,
    );
    // The funnel consumes id (the conditional updateMany's WHERE) and
    // the expiry (the alive gate); the credential and verification
    // secrets stay out of scope.
    const at = src.indexOf("findFirst({");
    const slice = src.slice(at, at + 300);
    expect(slice).not.toContain("passwordHash");
    expect(slice).not.toContain("verificationCodeHash");
  });
});

// ---- F-247e: the import commit-window guard ------------------------------------

describe("F-247e — the import file input is disabled inside the commit window", () => {
  it("the input carries the busy rider (a commit-window re-pick is a no-op)", () => {
    const src = read("src/app/(app)/import/page.tsx");
    // F-234b's monotonic parse token guards the parse window only; the
    // commit window was unguarded — a re-pick during the import POST
    // nulled rows mid-commit while the in-flight success path cleared
    // whatever the new parse staged. The rider closes the window.
    const inputAt = src.indexOf('type="file"');
    expect(inputAt, "the file input not found").toBeGreaterThan(-1);
    // The 700-char window rides THROUGH the cure's own comment block —
    // the rider must land inside the input element itself, past the
    // docblock, before the closing onChange.
    const slice = src.slice(inputAt, inputAt + 700);
    expect(slice).toContain("disabled={busy}");
  });
});

// ---- F-247f: the palette walker's jsx completion --------------------------------

describe("F-247f — the palette walker admits the jsx bridges (the F-243d doctrine)", () => {
  it("collectSrcFiles' filter carries the jsx arm and the docblock follows", () => {
    const src = read("tests/palette-pins.test.ts");
    // The F-243d whole-tree doctrine (pinned for the parity-229/242
    // walkers): class-string walkers must admit the nine .jsx capital
    // bridges. The palette walker admitted only .ts/.tsx — a latent
    // escape hatch for both legs (the bridges are pure re-exports, so
    // the widening is green-by-design over the live tree).
    expect(src).toContain('p.endsWith(".jsx"))');
    expect(src).toContain("{ts,tsx,jsx}");
  });
});
