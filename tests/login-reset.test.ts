import { describe, expect, it } from "vitest";
import {
  canSubmitReset,
  LOGIN_RESET_LAYOUT,
  nextLoginView,
  type LoginView,
} from "@/lib/login-reset";

/**
 * Session 11 (S11-P1): the reference's "Forgot password?" is NOT dead — it
 * swaps the login card IN PLACE (URL stays /login) through two views:
 *
 *   signin → (Forgot password?) → reset → (Send reset link) → sent
 *                              └── (Back to sign in) ──┘
 *
 * The reference never sends an email (its demo renders the confirmation
 * purely from client state — no network call fires). Our clone mirrors the
 * two views exactly; the class vocabulary below is DOM-extracted from the
 * live reference at 1512×945.
 */

describe("login reset flow — view state machine", () => {
  it("Forgot password? moves signin → reset", () => {
    expect(nextLoginView("signin", "forgot")).toBe("reset");
  });

  it("Send reset link moves reset → sent", () => {
    expect(nextLoginView("reset", "send")).toBe("sent");
  });

  it("Back to sign in returns from BOTH views (reset and sent)", () => {
    expect(nextLoginView("reset", "back")).toBe("signin");
    expect(nextLoginView("sent", "back")).toBe("signin");
  });

  it("unknown transitions keep the current view", () => {
    expect(nextLoginView("signin", "back")).toBe("signin");
    expect(nextLoginView("sent", "send")).toBe("sent");
  });

  it("canSubmitReset requires a non-empty email with an @ sign", () => {
    // The reference's Send reset link button validates the email field
    // before swapping (empty/malformed input keeps the reset view).
    expect(canSubmitReset("")).toBe(false);
    expect(canSubmitReset("no-at-sign")).toBe(false);
    expect(canSubmitReset("leading@")).toBe(false);
    expect(canSubmitReset("@host.only")).toBe(false);
    expect(canSubmitReset("user@example.com")).toBe(true);
  });
});

describe("login reset flow — reference class vocabulary", () => {
  it("the reset view's Back to sign in matches the reference's responsive 8px/16px gap ladder", () => {
    // DOM: <button class="flex items-center gap-2 text-sm text-slate-500
    // hover:text-slate-700 font-medium transition-colors -mb-2"> …
    // <svg lucide-arrow-left h-4 w-4> Back to sign in</button>
    // The reference's -mb-2 + v3 space-y (margin-TOP semantics) collapses
    // to 8px under space-y-4 (<640) and 16px under sm:space-y-6 (>=640) —
    // LIVE-measured 8px at 390 / 16px at 1512 (session-79). Under our v4,
    // :where(space-y) sets margin-BOTTOM and loses specificity to any own
    // mb class — `mb-2 sm:mb-4` expresses the SAME computed ladder
    // directly. (Session-11 VLM round: the clone rendered -8px until the
    // re-pin; session-79: the flat mb-4 was 8px too tall at phones.)
    expect(LOGIN_RESET_LAYOUT.back).toBe(
      // Session-222 (R-19, F-222g): the focus-ring arm joins the constant
      // (the house amber genus — a legitimate contract change, updated
      // in the same commit as the cure).
      "flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors mb-2 sm:mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 rounded-md",
    );
    expect(LOGIN_RESET_LAYOUT.backIcon).toBe("h-4 w-4");
  });

  it("the reset title + description match the reference (smaller than the login h1)", () => {
    // DOM: <h2 class="text-xl sm:text-2xl font-bold text-slate-900">
    //   Reset your password</h2> — one step below the login card's
    // text-2xl sm:text-3xl title.
    expect(LOGIN_RESET_LAYOUT.title).toBe("text-xl sm:text-2xl font-bold text-slate-900");
    expect(LOGIN_RESET_LAYOUT.description).toBe("text-slate-600 text-sm sm:text-base");
  });

  it("the Send reset link button is one size below Sign in (h-10 sm:h-11)", () => {
    // DOM: …px-3 py-2 w-full h-10 sm:h-11 bg-slate-900 hover:bg-slate-800
    // text-white font-medium shadow-sm rounded-xl transition-all
    // duration-200 — the login's Sign in is h-11 sm:h-12.
    // Session-79 (M-79c1/N-79c12): the record gained the stock text-sm
    // (14px at all widths, live-measured) + the disabled/keyboard-ring
    // chrome the reference's stock Button carries.
    expect(LOGIN_RESET_LAYOUT.send).toBe(
      "w-full h-10 sm:h-11 bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-sm rounded-xl transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-sm",
    );
  });

  it("the reset email input is the login input one size down (h-10 sm:h-11)", () => {
    // DOM: the stock Input base + `pl-10 h-10 sm:h-11 bg-slate-50/50
    // border-slate-200 focus:border-slate-400 focus:ring-slate-400
    // rounded-xl placeholder:text-slate-400` — the same construction as
    // the sign-in fields but one size smaller, WITH the mail icon and a
    // LIGHTER placeholder (slate-400 vs the sign-in fields' slate-600 —
    // the reference's own inconsistency, mirrored).
    expect(LOGIN_RESET_LAYOUT.resetInput).toContain("h-10 ");
    expect(LOGIN_RESET_LAYOUT.resetInput).toContain("sm:h-11");
    expect(LOGIN_RESET_LAYOUT.resetInput).toContain("pl-10");
    expect(LOGIN_RESET_LAYOUT.resetInput).toContain("bg-slate-50/50");
    expect(LOGIN_RESET_LAYOUT.resetInput).toContain("placeholder:text-slate-400");
    expect(LOGIN_RESET_LAYOUT.resetInput).not.toContain("h-11 ");
    expect(LOGIN_RESET_LAYOUT.resetInput).not.toContain("sm:h-12");
    expect(LOGIN_RESET_LAYOUT.resetInput).not.toContain("placeholder:text-slate-600");
  });

  it("the sent view's icon circle + mail icon match the reference", () => {
    // DOM: <div class="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-slate-100
    // rounded-full flex items-center justify-center"> wrapping
    // <svg lucide-mail class="h-7 w-7 sm:h-8 sm:w-8 text-slate-700">.
    expect(LOGIN_RESET_LAYOUT.sentIconWrap).toBe(
      "mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center",
    );
    expect(LOGIN_RESET_LAYOUT.sentIcon).toBe("h-7 w-7 sm:h-8 sm:w-8 text-slate-700");
  });

  it("the sent view's email line + green callout match the reference", () => {
    // DOM: <p class="text-slate-600 text-sm sm:text-base">We've sent
    // password reset instructions to<br><span class="font-medium
    // text-slate-900">{email}</span></p> then a green callout:
    // <div class="relative w-full border p-4 … bg-green-50/70
    // border-green-200 rounded-xl"> (no icon actually renders on the
    // reference — the [&>svg] children classes are defensive) wrapping
    // <div class="[&_p]:leading-relaxed text-green-700 text-sm">.
    expect(LOGIN_RESET_LAYOUT.sentEmailLine).toBe("text-slate-600 text-sm sm:text-base");
    expect(LOGIN_RESET_LAYOUT.sentEmailSpan).toBe("font-medium text-slate-900");
    // Session-111 (D5, the s111 re-walk): the reference's sent callout
    // carries the FULL inert [&>svg] arm family (the same form the
    // error/info callouts ship — the s11 extraction's asymmetry; no svg
    // ever renders on the auth surfaces).
    expect(LOGIN_RESET_LAYOUT.sentCallout).toBe(
      "relative w-full border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground text-foreground bg-green-50/70 border-green-200 rounded-xl",
    );
    expect(LOGIN_RESET_LAYOUT.sentCalloutText).toBe(
      "[&_p]:leading-relaxed text-green-700 text-sm",
    );
  });

  it("the sent view's Back to sign in is the full-width centered variant", () => {
    // DOM: <button class="w-full flex items-center justify-center gap-2
    // text-sm text-slate-500 hover:text-slate-700 font-medium
    // transition-colors"> — unlike the reset view's left-aligned -mb-2 one.
    expect(LOGIN_RESET_LAYOUT.sentBack).toBe(
      "w-full flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors",
    );
  });

  it("the shared view scaffold replaces the login column (no logo / google / divider)", () => {
    // Both reset views render inside: centered > DIV.w-full >
    // DIV.space-y-4 sm:space-y-6 — the logo, Google button and divider
    // are NOT part of the reset/sent views (DOM-verified).
    expect(LOGIN_RESET_LAYOUT.viewColumn).toBe("w-full");
    expect(LOGIN_RESET_LAYOUT.viewStack).toBe("space-y-4 sm:space-y-6");
    expect(LOGIN_RESET_LAYOUT.sentHeadingStack).toBe("text-center space-y-3 sm:space-y-4");
    expect(LOGIN_RESET_LAYOUT.sentTitleStack).toBe("space-y-2");
  });

  it("the view strings used by the state machine are the three DOM views", () => {
    // Session-64 (N-64f): the length assert on a locally-declared literal
    // is tautological AT RUNTIME (the literal's own length — it cannot
    // fail). The it's residual value is the TYPE annotation: the array
    // must satisfy LoginView[], so a view string drifting out of the
    // union fails HERE at the tsc gate, not at runtime.
    const views: LoginView[] = ["signin", "reset", "sent"];
    expect(views).toHaveLength(3);
  });
});
