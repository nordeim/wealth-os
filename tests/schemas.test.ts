import { describe, expect, it } from "vitest";
import {
  emailSchema,
  forgotPasswordSchema,
  loginSchema,
  passwordSchema,
  resendSchema,
  resetPasswordSchema,
  signupSchema,
  verifySchema,
} from "@/lib/schemas";

// Session-163 (WP-6 — the Zod layer): declarative schemas for the auth
// family, following zero-balance's pattern (zod ^4, per-route schemas,
// field-level messages) at digma's seam placement (a dedicated server-side
// validation module consumed by every auth route). Every message below is
// the CURRENT route string — the migration must not change a single
// user-facing word the unit + e2e suites pin.

describe("emailSchema", () => {
  it("trims, lowercases, and accepts a valid email", () => {
    const parsed = emailSchema.parse("  User@Example.COM ");
    expect(parsed).toBe("user@example.com");
  });

  it("rejects a malformed email with the pinned message", () => {
    const result = emailSchema.safeParse("not-an-email");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Enter a valid email address");
    }
  });

  it("rejects an email beyond the 160-char cap (the SQLite-lookup bound)", () => {
    const long = `${"a".repeat(150)}@example.com`;
    expect(long.length).toBeGreaterThan(160);
    const result = emailSchema.safeParse(long);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Email must be reasonably sized");
    }
  });
});

describe("passwordSchema", () => {
  it("accepts an 8+ character password", () => {
    expect(passwordSchema.safeParse("12345678").success).toBe(true);
  });

  it("rejects a short password with the pinned message", () => {
    const result = passwordSchema.safeParse("1234567");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Password must be at least 8 characters");
    }
  });
});

describe("loginSchema", () => {
  it("parses a well-formed login body (email normalized)", () => {
    const parsed = loginSchema.parse({ email: " User@Example.com ", password: "Demo1234!" });
    expect(parsed.email).toBe("user@example.com");
    expect(parsed.password).toBe("Demo1234!");
  });

  it("answers the composite required message when either field is empty", () => {
    for (const body of [{ email: "", password: "x" }, { email: "a@b.co", password: "" }, {}]) {
      const result = loginSchema.safeParse(body);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Email and password are required");
      }
    }
  });

  it("rejects a non-string password with the composite message (the typeof guard's contract)", () => {
    const result = loginSchema.safeParse({ email: "a@b.co", password: 42 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Email and password are required");
    }
  });
});

describe("signupSchema", () => {
  it("parses a minimal signup (name optional, derived later by the route)", () => {
    const parsed = signupSchema.parse({ email: "a@b.co", password: "Demo1234!" });
    expect(parsed.name).toBeUndefined();
    expect(parsed.email).toBe("a@b.co");
  });

  it("accepts and trims an explicit name within 80 chars", () => {
    const parsed = signupSchema.parse({ email: "a@b.co", password: "Demo1234!", name: " Ada " });
    expect(parsed.name).toBe("Ada");
  });

  it("rejects a non-string name (the isBadFK guard's contract: 'Invalid name')", () => {
    const result = signupSchema.safeParse({ email: "a@b.co", password: "Demo1234!", name: 123 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid name");
    }
  });

  it("normalizes an empty-string name to undefined (nameFromEmail derives it)", () => {
    const parsed = signupSchema.parse({ email: "a@b.co", password: "Demo1234!", name: "   " });
    expect(parsed.name).toBeUndefined();
  });

  it("rejects a malformed email with the pinned format message", () => {
    const result = signupSchema.safeParse({ email: "nope", password: "Demo1234!" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Enter a valid email address");
    }
  });

  it("rejects a short password with the pinned message", () => {
    const result = signupSchema.safeParse({ email: "a@b.co", password: "short" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Password must be at least 8 characters");
    }
  });
});

describe("verifySchema", () => {
  it("parses an email + 6-digit code", () => {
    const parsed = verifySchema.parse({ email: "a@b.co", code: "123456" });
    expect(parsed.code).toBe("123456");
  });

  it("strips non-digits before the length check (the route's replace(/\\D/g,'') contract)", () => {
    // A spaced 6-digit code STRIPS to six digits and parses.
    const parsed = verifySchema.parse({ email: "a@b.co", code: " 123 456 " });
    expect(parsed.code).toBe("123456");
    // A stripped-to-5 code is rejected with the incomplete message.
    const result = verifySchema.safeParse({ email: "a@b.co", code: "12 45 6" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Please enter all 6 digits");
    }
  });

  it("rejects a non-6-digit code with the incomplete message", () => {
    for (const code of ["12345", "1234567", "", "12a456"]) {
      const result = verifySchema.safeParse({ email: "a@b.co", code });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Please enter all 6 digits");
      }
    }
  });

  it("rejects a missing email with 'Email is required'", () => {
    const result = verifySchema.safeParse({ code: "123456" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Email is required");
    }
  });
});

describe("resendSchema", () => {
  it("parses and normalizes an email", () => {
    expect(resendSchema.parse({ email: " A@B.co " }).email).toBe("a@b.co");
  });

  it("rejects a missing email with 'Email is required'", () => {
    const result = resendSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Email is required");
    }
  });
});

describe("forgotPasswordSchema", () => {
  it("parses and normalizes an email", () => {
    expect(forgotPasswordSchema.parse({ email: " A@B.co " }).email).toBe("a@b.co");
  });

  it("rejects a malformed email with the format message", () => {
    const result = forgotPasswordSchema.safeParse({ email: "nope" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Enter a valid email address");
    }
  });
});

describe("resetPasswordSchema", () => {
  it("parses a token + new password", () => {
    const parsed = resetPasswordSchema.parse({
      reset_token: "abc123",
      new_password: "NewPass1234!",
    });
    expect(parsed.reset_token).toBe("abc123");
    expect(parsed.new_password).toBe("NewPass1234!");
  });

  it("trims the token (the reference's measured contract)", () => {
    const parsed = resetPasswordSchema.parse({
      reset_token: "  abc123  ",
      new_password: "NewPass1234!",
    });
    expect(parsed.reset_token).toBe("abc123");
  });

  it("rejects an empty token with the invalid-token message (token validated FIRST)", () => {
    const result = resetPasswordSchema.safeParse({ reset_token: "", new_password: "NewPass1234!" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid or expired reset token");
    }
  });

  it("rejects a token beyond 200 chars with the size message", () => {
    const result = resetPasswordSchema.safeParse({
      reset_token: "x".repeat(201),
      new_password: "NewPass1234!",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Token must be reasonably sized");
    }
  });

  it("rejects a short new password with the 8-char message", () => {
    const result = resetPasswordSchema.safeParse({ reset_token: "abc", new_password: "short" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Password must be at least 8 characters long");
    }
  });

  it("rejects a new password beyond 200 chars with the size message", () => {
    const result = resetPasswordSchema.safeParse({ reset_token: "abc", new_password: "x".repeat(201) });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Password must be reasonably sized");
    }
  });
});

// Session-224 (R-21, F-224h): the password-length contract is
// unified across the auth family — signup's passwordSchema gains the
// reset flow's own max(200) bound, so a >200-char password can no
// longer be SET at signup while reset rejects it (the cross-surface
// drift a password manager could trip).
describe("passwordSchema max bound (F-224h)", () => {
  it("rejects a signup password beyond 200 chars with the size message", () => {
    const result = passwordSchema.safeParse("x".repeat(201));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Password must be reasonably sized");
    }
  });

  it("accepts the 200-char boundary", () => {
    const result = passwordSchema.safeParse("x".repeat(200));
    expect(result.success).toBe(true);
  });
});
