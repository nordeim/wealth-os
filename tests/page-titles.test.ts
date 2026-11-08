import { describe, expect, it } from "vitest";
// Session-13 (S13-P1): the auth pages SSR DOUBLED titles. The root layout
// runs `title.template = "%s | WealthOS"`, and both auth pages declared
// RELATIVE titles — login `title: "WealthOS"` (SSRed as
// "WealthOS | WealthOS") and signup `title: "Sign up | WealthOS"` (which
// already contains the suffix, SSRed as
// "Sign up | WealthOS | WealthOS"). The live reference's login tab is plain
// "WealthOS". Same bug class as the session-12 404 title: the fix is
// `title: { absolute: … }` on both pages.
//
// These tests import the pages' exported metadata objects directly — no
// browser needed; the shape `{ absolute: string }` is what Next.js needs
// to escape the root template.
import { metadata as loginMetadata } from "@/app/login/page";
import { metadata as signupMetadata } from "@/app/signup/page";

describe("session-13: auth page absolute titles (S13-P1)", () => {
  it("login declares an ABSOLUTE title that escapes the root template", () => {
    const title = loginMetadata.title;
    expect(title).toBeDefined();
    // A plain string would ride the template ("WealthOS | WealthOS").
    expect(typeof title).toBe("object");
    expect((title as { absolute?: string }).absolute).toBe("WealthOS");
  });

  it("signup declares an ABSOLUTE title with the suffix exactly once", () => {
    const title = signupMetadata.title;
    expect(title).toBeDefined();
    expect(typeof title).toBe("object");
    expect((title as { absolute?: string }).absolute).toBe("Sign up | WealthOS");
  });
});
