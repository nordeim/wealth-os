"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Lock, Mail, ShieldCheck } from "lucide-react";
import { LOGIN_LAYOUT } from "@/lib/page-layout";
import {
  canSubmitReset,
  LOGIN_ERROR_CALLOUT,
  LOGIN_INFO_CALLOUT,
  LOGIN_RESET_LAYOUT,
  LOGIN_SIGNUP_LAYOUT,
  LOGIN_VERIFY_LAYOUT,
  nextLoginView,
  type LoginView,
  type LoginViewIntent,
} from "@/lib/login-reset";
import {
  VERIFICATION_CODE_LENGTH,
  applyCodeInput,
  verificationIncompleteMessage,
  verificationResentMessage,
} from "@/lib/verification";
import { toast } from "@/components/ui/toast";

type Mode = "signin" | "signup";

/** Session-147 (F-147c2 — walk37): the reference's from_url round-trip.
 *  Its new auth wall lands guests on /login?from_url=<absolute-url> and
 *  returns them to the target after a successful sign-in. THE
 *  OPEN-REDIRECT GUARD: the param is untrusted query input — only a
 *  SAME-ORIGIN URL navigates (relative values resolve against our own
 *  origin, foreign origins fall back to the plain-login target "/",
 *  malformed values too). Never router.push(<the raw param>). */
function resolveFromUrl(raw: string): string {
  try {
    const u = new URL(raw, window.location.origin);
    if (u.origin !== window.location.origin) return "/";
    return `${u.pathname}${u.search}` || "/";
  } catch {
    return "/";
  }
}

/** The info banner's auto-dismiss (live-bounded 1.6–3.2s on the reference). */
const INFO_BANNER_MS = 3000;

/**
 * Login card — session-7 re-pin (LOGIN_LAYOUT contracts): the reference's
 * slate design. A borderless glass card (`bg-white/95 backdrop-blur-sm
 * shadow-2xl`) with a gradient accent strip, centered logo/title column,
 * white Google button, the 44px→48px slate inputs and a slate-900 submit.
 * The logo is a CSS brand mark (the reference hotlinks a screenshot image;
 * we reproduce the white-circle + blue-dot shape with no external asset).
 *
 * Session-11 (S11-P1): the card swaps IN PLACE through the reset flow
 * (reset → sent) — the URL never changes.
 *
 * Session-21 (S21-P2/P3/P4/P5): the same in-place architecture extended to
 * the WHOLE auth funnel, live-verified on the reference: "Need an account?
 * Sign up" is a BUTTON that swaps to a minimal signup view (Email /
 * Password / Confirm Password — NO name field, NO Google button, NO
 * divider), whose success swaps again to the verify-email view (six
 * single-digit inputs + the attempts ladder). Every error renders the
 * reference's Callout banner; ZERO toasts fire on the auth flows (login
 * failure = the banner only, login/signup success = a silent redirect).
 * The `/signup` page (the reference 404s it) stays as our documented
 * working superset — it renders this card starting at the signup view.
 */
export function LoginCard({ mode = "signin" }: { mode?: Mode }) {
  const router = useRouter();
  // Session-147: the auth wall's return target (null on a plain /login —
  // the s142/s145 plain-login post-submit stays "/")
  const fromUrl = useSearchParams().get("from_url");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  // S21-P5: the resend confirmation rides its own green Callout — the
  // reference auto-dismisses it (~3s) while the error banners persist.
  const [info, setInfo] = React.useState<string | null>(null);
  // Session-67 (N-67k): the resend's own in-flight flag — the link's
  // budget is 5/15 min, so a double-click must not burn two sends.
  const [resending, setResending] = React.useState(false);
  // Session-163 (the digma ADR-014 port): the SELF-HOSTED in-app
  // deliveries — the reset link the forgot-password response carries
  // (rendered in the sent view only when present) and the verification
  // code hint (signup/resend responses). Both degrade to nothing when a
  // production deploy sets the NEO_DISABLE_* knobs — the sent card and
  // the verify view render exactly as before.
  const [resetUrl, setResetUrl] = React.useState<string | null>(null);
  const [verifyCodeHint, setVerifyCodeHint] = React.useState("");
  // Session-11 (S11-P1) + session-21: the card's five in-place views.
  const [view, setView] = React.useState<LoginView>(mode === "signup" ? "signup" : "signin");
  // S21-P5: the six single-digit code inputs.
  const [codeDigits, setCodeDigits] = React.useState<string[]>(() =>
    Array(VERIFICATION_CODE_LENGTH).fill(""),
  );
  const codeRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    if (!info) return;
    const timer = setTimeout(() => setInfo(null), INFO_BANNER_MS);
    return () => clearTimeout(timer);
  }, [info]);

  // Session-111 [D1, the s111 login-family re-walk]: the reference
  // lands focus on the FIRST code box when the verify view mounts —
  // live-measured as the 2px ring on box 1 only (box 6 rests at none),
  // reproduced twice at both viewports. A DOM focus, never setState;
  // fires only on transitions INTO verify.
  //
  // Session-231 (R-28, F-231b): the verify arm generalized — EVERY view
  // transition now lands focus somewhere useful. The other four swaps
  // (signin↔signup, signin→reset, reset→sent) replace the focused
  // control wholesale; unmanaged, focus fell to <body> and SR/keyboard
  // users got no signal the view changed. Each non-verify view's h1
  // carries the shared titleRef + tabIndex -1 (the heading-focus
  // technique). The guard compares the PREVIOUS VIEW VALUE, never a
  // boolean "has mounted" flag — the dev server's StrictMode
  // double-invoke sees the flag already set on its second pass and
  // fired the focus on the INITIAL load (live-caught by the captures
  // face; a value guard is idempotent under double-invocation).
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const prevViewRef = React.useRef(view);
  React.useEffect(() => {
    const changed = prevViewRef.current !== view;
    prevViewRef.current = view;
    if (!changed) return;
    if (view === "verify") {
      codeRefs.current[0]?.focus();
    } else {
      titleRef.current?.focus();
    }
  }, [view]);

  /** Swap the card's view via the login state machine (s11 + s21). */
  function goto(intent: LoginViewIntent) {
    setError(null);
    setInfo(null);
    setView((v) => nextLoginView(v, intent));
  }

  /** S21-P2: the sign-in submit — the reference fires NO toast: the banner
   *  on failure, a silent redirect on success. */
  async function onSigninSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.ok) {
        // Session-218 (R-15, F-218a): a VERIFICATION_REQUIRED 403 means
        // the credentials were RIGHT — the account simply carries an
        // unverified (or expired) code. Render the banner dead-end and
        // the user is locked out: the verify view (the only surface
        // with the Resend) was reachable solely via signup success,
        // re-signup answers "already exists", and the reset flow never
        // clears the hash. Land the verify view instead — its Resend
        // re-arms the code (the F-217d server cure).
        if (body?.error?.code === "VERIFICATION_REQUIRED") {
          setCodeDigits(Array(VERIFICATION_CODE_LENGTH).fill(""));
          setError(null);
          setInfo(null);
          setVerifyCodeHint("");
          setView("verify");
          return;
        }
        setError(body?.error?.message ?? "Sign in failed. Try again.");
        return;
      }
      router.push(resolveFromUrl(fromUrl ?? "/"));
      router.refresh();
    } catch {
      setError("Network error — check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  /** S21-P4: the signup view's submit — the mismatch guard first ("Passwords
   *  do not match", the reference's banner), then the account creation; a
   *  success swaps to the verify view (no toast, no session yet). */
  async function onSignupSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.ok) {
        setError(body?.error?.message ?? "Could not create account. Try again.");
        return;
      }
      setCodeDigits(Array(VERIFICATION_CODE_LENGTH).fill(""));
      setError(null);
      setInfo(null);
      // Session-163 (the digma ADR-014 port): the code hint rides the
      // signup response for the self-hosted demo workflow.
      setVerifyCodeHint(String(body?.data?.verificationCode ?? ""));
      setView("verify");
    } catch {
      setError("Network error — check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  /** S21-P5: the verify view's submit — the incomplete guard first ("Please
   *  enter all 6 digits"), then the code check; success signs the account
   *  in and redirects (no toast). */
  async function onVerifySubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = codeDigits.join("");
    if (code.length !== VERIFICATION_CODE_LENGTH) {
      setError(verificationIncompleteMessage());
      return;
    }
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.ok) {
        setError(body?.error?.message ?? "Invalid verification code.");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Network error — check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  /** S21-P5: "Didn't receive the code? Resend" — the reference answers with
   *  the auto-dismissing green Callout. Session-67 (N-67k/N-67l): the
   *  in-flight guard (the 5/15-min budget must survive a double-click)
   *  and the honest envelope read — the route's message field nests at
   *  body.data, not the envelope root. */
  async function onResend() {
    if (resending) return;
    setError(null);
    setResending(true);
    try {
      const res = await fetch("/api/auth/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.ok) {
        setError(body?.error?.message ?? "Could not resend the code. Try again.");
        return;
      }
      setInfo(body?.data?.message ?? verificationResentMessage());
      // Session-163 (the digma ADR-014 port): the fresh code rides the
      // response for the self-hosted demo workflow.
      setVerifyCodeHint(String(body?.data?.verificationCode ?? ""));
      setCodeDigits(Array(VERIFICATION_CODE_LENGTH).fill(""));
    } catch {
      setError("Network error — check your connection and try again.");
    } finally {
      setResending(false);
    }
  }

  /** Session-163 (the digma S46 port): the reset view's submit — the
   *  CLIENT-SIDE THEATER retires. The pre-163 form swapped to the sent
   *  view from pure client state (the reference app's own demo never
   *  fired a network call); the retrofit wires the REAL forgot-password
   *  endpoint. The no-enumeration contract: a 2xx swaps to the sent view
   *  for known AND unknown emails alike; the in-app reset link rides the
   *  response when the self-hosted delivery is enabled. */
  async function onSendResetLink(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmitReset(email)) {
      setError("Enter a valid email address to reset your password.");
      return;
    }
    if (pending) return;
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.ok) {
        setError(body?.error?.message ?? "Could not send the reset link. Try again.");
        return;
      }
      // The graceful form: the link renders in the sent view only when
      // the field is a string (the knob-off production posture answers
      // null and the card renders exactly as before).
      setResetUrl(typeof body?.data?.resetUrl === "string" ? body.data.resetUrl : null);
      setView("sent");
    } catch {
      setError("Network error — check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  /** S21-P5: a single code input's change — the pure applyCodeInput
   *  seam (session-233, F-233a). The pre-cure form kept only the LAST
   *  digit of the raw value, so a whole-code paste or a one-time-code
   *  autofill collapsed to a single digit and the length guard blocked
   *  the submit. The seam distributes multi-digit edits across the
   *  boxes and lands focus after the last filled one; single-digit
   *  typing and the clear path are the pre-cure semantics. */
  function onCodeDigit(idx: number, raw: string) {
    const applied = applyCodeInput(codeDigits, idx, raw);
    setCodeDigits(applied.next);
    if (applied.focusIndex !== idx) {
      codeRefs.current[applied.focusIndex]?.focus();
    }
  }

  /** S21-P5: backspace on an empty box steps back and clears it (the OTP
   *  walk the six boxes imply). */
  function onCodeKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !codeDigits[idx] && idx > 0) {
      e.preventDefault();
      setCodeDigits((prev) => {
        const next = [...prev];
        next[idx - 1] = "";
        return next;
      });
      codeRefs.current[idx - 1]?.focus();
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className={LOGIN_LAYOUT.card}>
        {/* Gradient accent strip along the card's top edge. */}
        <div className={LOGIN_LAYOUT.accent} aria-hidden="true" />

        <div className={LOGIN_LAYOUT.inner}>
          <div className={LOGIN_LAYOUT.centered}>
            {view !== "signin" ? (
              <>
                {/* S11-P1 + S21-P4/P5: the reset/sent/signup/verify views
                    replace the login column entirely (no logo, no Google
                    button, no divider — DOM-verified on the reference). */}
                <div className={LOGIN_RESET_LAYOUT.viewColumn}>
                  {/* Session-111 [D3, the s111 re-walk]: the signup view
                      rides its OWN FLAT space-y-4 stack — the s21-authored
                      LOGIN_SIGNUP_LAYOUT.viewStack const, correct but never
                      wired (the shared reset stack's sm:space-y-6 arm rode
                      +8px at >=640 in the title->form gap; the reference's
                      signup stack is FLAT, LIVE-measured on the re-walk). */}
                  <div
                    className={
                      view === "signup" ? LOGIN_SIGNUP_LAYOUT.viewStack : LOGIN_RESET_LAYOUT.viewStack
                    }
                  >
                    {view === "reset" ? (
                      <>
                        <button
                          type="button"
                          className={LOGIN_RESET_LAYOUT.back}
                          onClick={() => goto("back")}
                        >
                          <ArrowLeft className={LOGIN_RESET_LAYOUT.backIcon} aria-hidden="true" />
                          Back to sign in
                        </button>
                        <div className="text-center space-y-2">
                          {/* F-231b: the shared heading ref — the swap lands
                              focus here (tabIndex -1, programmatic only). */}
                          <h1 ref={titleRef} tabIndex={-1} className={LOGIN_RESET_LAYOUT.title}>
                            Reset your password
                          </h1>
                          <p className={LOGIN_RESET_LAYOUT.description}>
                            Enter your email and we'll send you a link to reset your password
                          </p>
                        </div>
                        <form className="space-y-4 sm:space-y-5" onSubmit={onSendResetLink} noValidate>
                          {error && <ErrorCallout message={error} />}
                          <div className={LOGIN_LAYOUT.field}>
                            <label htmlFor="email" className={LOGIN_LAYOUT.label}>
                              Email
                            </label>
                            <div className={LOGIN_LAYOUT.inputWrap}>
                              <Mail className={LOGIN_RESET_LAYOUT.inputIcon} aria-hidden="true" />
                              <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                placeholder="you@example.com"
                                className={LOGIN_RESET_LAYOUT.resetInput}
                              />
                            </div>
                          </div>
                          {/* Session-221 (R-18, F-221o): the busy affordance
                              every sibling submit already carries (signin/
                              signup/verify) — the pending guard prevented
                              the double send, but the button never showed
                              it. */}
                          <button type="submit" disabled={pending} className={LOGIN_RESET_LAYOUT.send}>
                            {pending ? "Please wait…" : "Send reset link"}
                          </button>
                        </form>
                      </>
                    ) : view === "signup" ? (
                      <>
                        {/* S21-P4: the reference's in-place signup view — a
                            minimal form (NO name field, NO Google button,
                            NO divider), the mb-2 back button (S79-P2: the
                            v4-correct expression of the reference's
                            computed +8px gap), and the one-size-down
                            submit. */}
                        <button
                          type="button"
                          className={LOGIN_SIGNUP_LAYOUT.back}
                          onClick={() => goto("back")}
                        >
                          <ArrowLeft className={LOGIN_SIGNUP_LAYOUT.backIcon} aria-hidden="true" />
                          Back to sign in
                        </button>
                        {/* Session-111 [D3b]: the reference's signup h2
                            is a DIRECT stack child (its census:
                            [BUTTON, H2, FORM] — no titleStack wrapper);
                            the s21-era wrapper was an inert single-child
                            text-center space-y-2 div. */}
                        <h1 ref={titleRef} tabIndex={-1} className={LOGIN_SIGNUP_LAYOUT.title}>
                          Create your account
                        </h1>
                        <form className={LOGIN_SIGNUP_LAYOUT.form} onSubmit={onSignupSubmit} noValidate>
                          <div className={LOGIN_SIGNUP_LAYOUT.fields}>
                            <div className={LOGIN_SIGNUP_LAYOUT.field}>
                              <label htmlFor="email" className={LOGIN_SIGNUP_LAYOUT.label}>
                                Email
                              </label>
                              <div className={LOGIN_LAYOUT.inputWrap}>
                                <Mail className={LOGIN_SIGNUP_LAYOUT.inputIcon} aria-hidden="true" />
                                <input
                                  id="email"
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                  autoComplete="email"
                                  placeholder="you@example.com"
                                  className={LOGIN_SIGNUP_LAYOUT.input}
                                />
                              </div>
                            </div>

                            <div className={LOGIN_SIGNUP_LAYOUT.field}>
                              <label htmlFor="password" className={LOGIN_SIGNUP_LAYOUT.label}>
                                Password
                              </label>
                              <div className={LOGIN_LAYOUT.inputWrap}>
                                <Lock className={LOGIN_SIGNUP_LAYOUT.inputIcon} aria-hidden="true" />
                                <input
                                  id="password"
                                  type="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                                  minLength={8}
                                  autoComplete="new-password"
                                  placeholder="Min. 8 characters"
                                  className={LOGIN_SIGNUP_LAYOUT.input}
                                />
                              </div>
                            </div>

                            <div className={LOGIN_SIGNUP_LAYOUT.field}>
                              <label htmlFor="confirmPassword" className={LOGIN_SIGNUP_LAYOUT.label}>
                                Confirm Password
                              </label>
                              <div className={LOGIN_LAYOUT.inputWrap}>
                                <Lock className={LOGIN_SIGNUP_LAYOUT.inputIcon} aria-hidden="true" />
                                <input
                                  id="confirmPassword"
                                  type="password"
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                  required
                                  minLength={8}
                                  autoComplete="new-password"
                                  placeholder="Re-enter password"
                                  className={LOGIN_SIGNUP_LAYOUT.input}
                                />
                              </div>
                            </div>
                          </div>

                          {error && <ErrorCallout message={error} />}

                          <button type="submit" disabled={pending} className={LOGIN_SIGNUP_LAYOUT.submit}>
                            {pending ? "Please wait…" : "Create account"}
                          </button>
                        </form>
                      </>
                    ) : view === "verify" ? (
                      <>
                        {/* S21-P5 + session-79 (M-79c3): the reference's
                            verify-email view — the SHIELDCHECK tile (the
                            s21 pin wrongly recorded the sent view's Mail;
                            live-extracted: lucide-shield-check slate-700),
                            the six single-digit inputs, the attempts
                            ladder, and the resend line. */}
                        <button
                          type="button"
                          className={LOGIN_VERIFY_LAYOUT.back}
                          onClick={() => goto("back")}
                        >
                          <ArrowLeft className={LOGIN_VERIFY_LAYOUT.backIcon} aria-hidden="true" />
                          Back to sign in
                        </button>
                        <div className={LOGIN_VERIFY_LAYOUT.headingStack}>
                          <div className={LOGIN_VERIFY_LAYOUT.iconWrap} aria-hidden="true">
                            <ShieldCheck className={LOGIN_VERIFY_LAYOUT.icon} />
                          </div>
                          <div className={LOGIN_VERIFY_LAYOUT.titleStack}>
                            <h1 className={LOGIN_VERIFY_LAYOUT.title}>Verify your email</h1>
                            <p className={LOGIN_VERIFY_LAYOUT.emailLine}>
                              We've sent a 6-digit code to
                              <br />
                              <span className={LOGIN_VERIFY_LAYOUT.emailSpan}>{email}</span>
                            </p>
                          </div>
                        </div>
                        {/* Session-79 (L-79c8): the verify view's OWN form
                            family (space-y-4 sm:space-y-6) — not the
                            signup's tighter pair. */}
                        <form className={LOGIN_VERIFY_LAYOUT.form} onSubmit={onVerifySubmit} noValidate>
                          {/* Session-79 (L-79c7/L-79c11): the codeWrap + the
                              hint line ride the SAME plain wrapper div —
                              the hint's mt-3 must not ride the form's
                              space-y (margin collapse would eat it; the
                              reference's own structure). The code inputs
                              are the FLAT stock mirror — the scaffold-era
                              shadow-sm / transition-colors / ring-offset
                              extras retire (the reference's OTP boxes ship
                              none of them). */}
                          <div>
                            <div className={LOGIN_VERIFY_LAYOUT.codeWrap}>
                              {codeDigits.map((digit, idx) => (
                                <input
                                  key={idx}
                                  ref={(el) => {
                                    codeRefs.current[idx] = el;
                                  }}
                                  type="text"
                                  inputMode="numeric"
                                  autoComplete={idx === 0 ? "one-time-code" : "off"}
                                  aria-label={`Digit ${idx + 1}`}
                                  value={digit}
                                  onChange={(e) => onCodeDigit(idx, e.target.value)}
                                  onKeyDown={(e) => onCodeKeyDown(idx, e)}
                                  className={`flex rounded-lg border border-input bg-white px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${LOGIN_VERIFY_LAYOUT.codeInput}`}
                                />
                              ))}
                            </div>
                            <p className={LOGIN_VERIFY_LAYOUT.hint}>
                              {LOGIN_VERIFY_LAYOUT.hintLine}
                            </p>
                            {/* Session-163 (the digma ADR-014 port): the
                                self-hosted code hint — the signup/resend
                                response carries the 6-digit code for the
                                demo workflow (no mail transport); renders
                                only when present, and never when the
                                NEO_DISABLE_IN_APP_OTP knob is set. */}
                            {verifyCodeHint && (
                              <p className="text-sm text-slate-500">
                                Demo code:{" "}
                                <span className="font-semibold text-slate-700">{verifyCodeHint}</span>
                              </p>
                            )}
                          </div>

                          {/* Session-233 (R-30, F-233c): the ALWAYS-MOUNTED
                              status region — a live region that ARRIVES
                              with its content is not announced (the
                              F-218h genus; the toast viewport and the
                              shell's loading gate already ride this
                              form). The green resend banner below stays
                              the sighted-user visual only. */}
                          <div role="status" aria-live="polite" className="sr-only">
                            {info ?? ""}
                          </div>
                          {error && <ErrorCallout message={error} />}
                          {info && <InfoCallout message={info} />}

                          <div className={LOGIN_VERIFY_LAYOUT.buttonsGroup}>
                            <button type="submit" disabled={pending} className={LOGIN_VERIFY_LAYOUT.submit}>
                              {pending ? "Please wait…" : "Verify email"}
                            </button>
                            <div className={LOGIN_VERIFY_LAYOUT.resendWrap}>
                              <p className={LOGIN_VERIFY_LAYOUT.resendLine}>
                                Didn't receive the code?{" "}
                                <button
                                  type="button"
                                  className={LOGIN_VERIFY_LAYOUT.resendButton}
                                  onClick={onResend}
                                  disabled={resending}
                                >
                                  Resend
                                </button>
                              </p>
                            </div>
                          </div>
                        </form>
                      </>
                    ) : (
                      <>
                        <div className={LOGIN_RESET_LAYOUT.sentHeadingStack}>
                          <div className={LOGIN_RESET_LAYOUT.sentIconWrap} aria-hidden="true">
                            <Mail className={LOGIN_RESET_LAYOUT.sentIcon} />
                          </div>
                          <div className={LOGIN_RESET_LAYOUT.sentTitleStack}>
                            <h1 ref={titleRef} tabIndex={-1} className={LOGIN_RESET_LAYOUT.title}>
                              Check your email
                            </h1>
                            <p className={LOGIN_RESET_LAYOUT.sentEmailLine}>
                              We've sent password reset instructions to
                              <br />
                              <span className={LOGIN_RESET_LAYOUT.sentEmailSpan}>{email}</span>
                            </p>
                          </div>
                        </div>
                        <div className={LOGIN_RESET_LAYOUT.sentCallout}>
                          {/* Session-79 (N-79c13): the reference's callout
                              text is a BARE text node — the [&_p] arm stays
                              inert (its line-height never fires there). */}
                          <div className={LOGIN_RESET_LAYOUT.sentCalloutText}>
                            Please check your email for the password reset link. It may take a few
                            minutes to arrive.
                          </div>
                          {/* Session-163 (the digma ADR-014 port): the
                              self-hosted in-app delivery — the reset link
                              rides the forgot-password response (graceful:
                              renders only when the field is a string; a
                              knob-off production deploy sees exactly the
                              pre-163 card). */}
                          {resetUrl && (
                            <a
                              href={resetUrl}
                              className="mt-2 block break-all text-sm font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
                            >
                              Open your password reset link
                            </a>
                          )}
                        </div>
                        <button type="button" className={LOGIN_RESET_LAYOUT.sentBack} onClick={() => goto("back")}>
                          <ArrowLeft className={LOGIN_RESET_LAYOUT.backIcon} aria-hidden="true" />
                          Back to sign in
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
            {/* Logo — the WealthOS brand mark: the reference's own
                192×192 image asset (fetched to public/wealthos-logo.png,
                session-208/F-208e) in its round `sm:`-upsizing wrapper —
                the retired construction was a CSS bar-chart mark. */}
            <div className={LOGIN_LAYOUT.logoWrap}>
              <span className={LOGIN_LAYOUT.logo}>
                <img
                  src="/wealthos-logo.png"
                  alt="WealthOS logo"
                  className="aspect-square h-full w-full object-cover"
                />
              </span>
            </div>

            <div className="space-y-2">
              <h1 ref={titleRef} tabIndex={-1} className={LOGIN_LAYOUT.title}>
                Welcome to WealthOS
              </h1>
              <p className={LOGIN_LAYOUT.subtitle}>Sign in to continue</p>
            </div>

            {/* Session-96 (S96-P0, the 96-c form-family walk): ONE w-full
                BLOCK section wrapping [the google button + the divider +
                the form] — the reference's own construction (DOM-verified:
                its form's parent chain runs form → div.w-full m=[24/0] →
                the centered column). Inside the block section the
                adjacent margins COLLAPSE (googleWrap mb 0 vs the
                divider's my-6 mt 24 → 24; the divider's mb 24 vs the
                form's mt 0 → 24). The s95-era flat shape (the three as
                DIRECT children of the flex column) STACKED v4 space-y's
                margin-bottom with the divider's my-6 — flex containers do
                not collapse margins — 48px vs the reference's 24 at 390
                (56 vs 24 at 1440). The google button's own wrap keeps the
                reference's inert space-y-3 class. */}
            <div className="w-full">
              <div className="space-y-3">
              {([
                { label: "Continue with Google", icon: <GoogleIcon /> },
                { label: "Continue with Microsoft", icon: <MicrosoftIcon /> },
                { label: "Continue with Facebook", icon: <FacebookIcon /> },
                { label: "Continue with Apple", icon: <AppleIcon /> },
              ] as const).map((provider) => (
                <button
                  key={provider.label}
                  type="button"
                  className={LOGIN_LAYOUT.google}
                  onClick={() =>
                    toast.info(
                      "Social sign-in not configured",
                      "This self-hosted clone uses email and password sign-in (demo credentials in the README).",
                    )
                  }
                >
                  <div className={LOGIN_LAYOUT.googleIcon}>{provider.icon}</div>
                  <span>{provider.label}</span>
                </button>
              ))}
              </div>

            <div className={LOGIN_LAYOUT.divider} aria-hidden="true">
              <div className="absolute inset-0 flex items-center">
                <div className={LOGIN_LAYOUT.dividerLine} />
              </div>
              <div className={LOGIN_LAYOUT.dividerLabel}>
                <span className={LOGIN_LAYOUT.dividerLabelSpan}>or</span>
              </div>
            </div>

            <form onSubmit={onSigninSubmit} className={LOGIN_LAYOUT.form} noValidate>
              <div className={LOGIN_LAYOUT.fields}>
                <div className={LOGIN_LAYOUT.field}>
                  <label htmlFor="email" className={LOGIN_LAYOUT.label}>
                    Email
                  </label>
                  <div className={LOGIN_LAYOUT.inputWrap}>
                    <Mail className={LOGIN_LAYOUT.inputIcon} />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={LOGIN_LAYOUT.input}
                    />
                  </div>
                </div>

                <div className={LOGIN_LAYOUT.field}>
                  <label htmlFor="password" className={LOGIN_LAYOUT.label}>
                    Password
                  </label>
                  <div className={LOGIN_LAYOUT.inputWrap}>
                    <Lock className={LOGIN_LAYOUT.inputIcon} />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className={LOGIN_LAYOUT.input}
                    />
                  </div>
                </div>
              </div>

              {error && <ErrorCallout message={error} />}

              <div className="space-y-3">
                <button type="submit" disabled={pending} className={LOGIN_LAYOUT.submit}>
                  {pending ? "Please wait…" : "Sign in"}
                </button>
                <div className={LOGIN_LAYOUT.footer}>
                  <button
                    type="button"
                    className={`${LOGIN_LAYOUT.footerLink} font-medium`}
                    onClick={() => goto("forgot")}
                  >
                    Forgot password?
                  </button>
                  {/* S21-P4: the reference's onclick BUTTON — the card swaps
                      to the signup view IN PLACE (no navigation). */}
                  <button type="button" className={LOGIN_LAYOUT.footerLink} onClick={() => goto("signup")}>
                    Need an account? <span className={LOGIN_LAYOUT.footerLinkStrong}>Sign up</span>
                  </button>
                </div>
              </div>
            </form>
            </div>
              </>
            )}
          </div>

        </div>
      </div>
      {/* Session-79 (L-79c6, live-extracted on all five reference views):
          the trailing mobile-only nbsp spacer rides INSIDE the max-w-md
          wrapper AFTER the card — mt-8 + text-xs slate-400, hidden from sm
          up (16px tall + the 32px margin at 390). */}
      <div className="mt-8 text-center text-xs text-slate-400 sm:hidden">
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

/**
 * S21-P3: the reference's error banner — the shadcn Callout pattern (the
 * red variant of the s11 sent-callout), DOM-extracted live: bg-red-50/70 +
 * border-red-200 + p-4 + the inner red-700 text-sm div. The `[&>svg]`
 * classes position an icon the reference never renders on the auth
 * surfaces; they ship verbatim. Session-79 (N-79c13): the text renders
 * as a BARE text node — the [&_p] arm stays inert like the reference's
 * own.
 */
function ErrorCallout({ message }: { message: string }) {
  return (
    <div role="alert" className={LOGIN_ERROR_CALLOUT.callout}>
      <div className={LOGIN_ERROR_CALLOUT.text}>{message}</div>
    </div>
  );
}

/**
 * S21-P5: the reference's resend confirmation — the GREEN Callout
 * (bg-green-50/70 + border-green-200), auto-dismissed by the card after
 * the live-bounded ~3s. Session-233 (R-30, F-233c): visual only — the
 * announcement lives in the verify view's pre-existing sr-only status
 * region (the F-218h form); a live region that arrives with its
 * content is not announced.
 */
function InfoCallout({ message }: { message: string }) {
  return (
    <div className={LOGIN_INFO_CALLOUT.callout}>
      <div className={LOGIN_INFO_CALLOUT.text}>{message}</div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.3h6.5c-.1 1.1-.8 2.7-2.4 3.8l-.1.1 3.5 2.7c2-1.9 3.1-4.7 3.1-8.1v-.6z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.8-2.9c-1 .7-2.4 1.2-4.1 1.2-3.1 0-5.8-2.1-6.8-5l-.1.1-3.6 2.8C3.5 21.3 7.4 24 12 24z"
      />
      <path fill="#FBBC05" d="M5.2 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4V9.5L1.3 6.7C.5 8.3 0 10.1 0 12s.5 3.7 1.3 5.3l3.9-2.9z" />
      <path
        fill="#EA4335"
        d="M12 4.7c2.2 0 3.7.9 4.5 1.7l3.3-3.2C17.9 1.2 15.2 0 12 0 7.4 0 3.5 2.7 1.3 6.7l3.9 3c1-2.9 3.7-5 6.8-5z"
      />
    </svg>
  );
}

/** The Microsoft four-square mark. */
function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022" />
      <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00" />
      <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF" />
      <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
    </svg>
  );
}

/** The Facebook f-in-circle mark. */
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#fff"
        d="M13.4 21v-7.9h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5h1.65V3.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.45-4 4.1v2.3H7.5v3.1h2.7V21h3.2z"
      />
    </svg>
  );
}

/** The Apple glyph. */
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#000"
        d="M17.05 12.54c-.03-2.89 2.36-4.27 2.47-4.34-1.35-1.97-3.44-2.24-4.18-2.27-1.78-.18-3.47 1.05-4.37 1.05-.9 0-2.29-1.02-3.77-1-1.94.03-3.72 1.13-4.72 2.86-2.01 3.49-.51 8.66 1.45 11.5.96 1.38 2.1 2.93 3.6 2.87 1.45-.06 2-.93 3.75-.93s2.25.93 3.78.9c1.56-.03 2.55-1.41 3.5-2.8 1.1-1.6 1.56-3.16 1.58-3.24-.04-.02-3.04-1.17-3.09-4.6zM14.14 4.06c.8-.97 1.34-2.31 1.19-3.66-1.15.05-2.56.77-3.39 1.73-.74.86-1.39 2.23-1.22 3.54 1.29.1 2.6-.65 3.42-1.61z"
      />
    </svg>
  );
}

