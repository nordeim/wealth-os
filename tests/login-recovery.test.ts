import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-218 (R-15, F-218a — the expired-verification recovery loop):
// R-14's server cure keyed the login gate on the verification HASH (an
// expired code 403s VERIFICATION_REQUIRED, exactly like a fresh one)
// and re-armed the resend for hash-present accounts — but the CLIENT
// rendered the 403 as a banner only. The verify view (the ONLY surface
// with the Resend link) was reachable solely via signup success;
// `nextLoginView` has no signin→verify edge and re-signup answers
// "already exists" — an account whose code expired was locked out of
// the UI recovery path the server cure built. These pins freeze the
// client half: the signin failure arm keys on the error CODE and swaps
// to the verify view with fresh digit boxes.

const ROOT = path.resolve(import.meta.dirname, "..");
const CARD = readFileSync(
  path.join(ROOT, "src/components/layout/login-card.tsx"),
  "utf-8",
);

// The s64/s65/s66 needle-in-own-docs rule: an absence pin reads a
// comment-stripped source.
const stripComments = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
const CLEAN = stripComments(CARD);

describe("R-15: the signin 403 lands the verify view (F-218a)", () => {
  it("the signin failure arm keys on the VERIFICATION_REQUIRED code", () => {
    expect(CLEAN).toMatch(/VERIFICATION_REQUIRED/);
  });

  it("the transition exists on the SIGNIN arm — not only the signup success arm", () => {
    // Pre-cure, setView("verify") appeared exactly once (the signup
    // success arm). The contract now needs the second, inside
    // onSigninSubmit's 403 branch.
    const signinArm = CLEAN.slice(
      CLEAN.indexOf("onSigninSubmit"),
      CLEAN.indexOf("onSignupSubmit"),
    );
    expect(signinArm).toMatch(/setView\("verify"\)/);
  });

  it("the transition resets the code digits before entering the verify view", () => {
    // The signup success arm's own entry ritual — fresh boxes for a
    // fresh recovery, never the stale digits of a prior attempt.
    expect(CLEAN).toMatch(
      /setCodeDigits\(Array\(VERIFICATION_CODE_LENGTH\)\.fill\(""\)\);[\s\S]*?setView\("verify"\)/,
    );
  });

  it("the verify view's Resend closes the loop (the re-arm is already server-side)", () => {
    expect(CLEAN).toMatch(/onResend/);
    expect(CLEAN).toMatch(/\/api\/auth\/resend/);
  });
});
