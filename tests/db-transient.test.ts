import { describe, expect, it } from "vitest";
import { Prisma } from "@/generated/prisma/client";
import { isTransientDbError } from "@/lib/db";

// Session-238 (R-35, F-238i): the transient-seam BEHAVIORAL rider. The
// F-236b/F-237b family pins are source-form regexes (the F-237j recorded
// residual: they cannot see semantics); this rider drives the helper
// itself — a constructed P2024/P2028 must classify transient, everything
// else must not. A future refactor of the helper (dropping a code,
// changing the error class) now fails a behavioral gate, not just the
// source pins. The client import is construction-only (no query runs);
// the generated tree is the prisma-7 contract's own home.
//
// The constructor form (prisma 7, @prisma/client-runtime-utils):
//   new PrismaClientKnownRequestError(message, { code, clientVersion })

function knownRequestError(code: string): Prisma.PrismaClientKnownRequestError {
  return new Prisma.PrismaClientKnownRequestError("synthetic", {
    code,
    clientVersion: "7.10.1",
  });
}

describe("F-238i — isTransientDbError's acceptance set (the behavioral rider)", () => {
  it("P2024 (connection-pool timeout) is transient", () => {
    expect(isTransientDbError(knownRequestError("P2024"))).toBe(true);
  });

  it("P2028 (transaction-interaction timeout) is transient", () => {
    expect(isTransientDbError(knownRequestError("P2028"))).toBe(true);
  });

  it("P2001 (record not found's cousin) is NOT transient", () => {
    expect(isTransientDbError(knownRequestError("P2001"))).toBe(false);
  });

  it("P2025 (record vanished mid-mutation) is NOT transient (the P2025 seam owns it)", () => {
    expect(isTransientDbError(knownRequestError("P2025"))).toBe(false);
  });

  it("a plain Error is NOT transient", () => {
    expect(isTransientDbError(new Error("P2024-as-a-message"))).toBe(false);
  });

  it("a non-error value is NOT transient", () => {
    expect(isTransientDbError(undefined)).toBe(false);
    expect(isTransientDbError(null)).toBe(false);
    expect(isTransientDbError("P2024")).toBe(false);
  });
});
