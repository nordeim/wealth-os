/**
 * The login card's reset-password flow — session 11 (S11-P1).
 *
 * The reference's "Forgot password?" button is NOT dead: it swaps the login
 * card IN PLACE (the URL stays /login) through two views:
 *
 *   signin → (Forgot password?) → reset → (Send reset link) → sent
 *                              └── (Back to sign in) ──┘
 *
 * The reference never sends an email — its demo renders the "Check your
 * email" confirmation purely from client state (no network call fires; the
 * request log shows only analytics pings). Our clone mirrors the two views
 * exactly; a self-hosted deployment can wire a real sender behind
 * {@link canSubmitReset} without touching the view classes.
 *
 * Every class string below is DOM-extracted from the live reference at
 * 1512×945 and pinned by tests/login-reset.test.ts. Both views replace the
 * login column's content entirely — the logo, the Google button and the
 * divider are NOT part of them.
 *
 * ------------------------------------------------------------------
 * Session 21 (S21-P3/P4/P5) — the same in-place architecture extended to
 * the auth funnel the s10 pin misread as a "dead login button":
 *
 *   signin → (Need an account? Sign up) → signup → (Create account) →
 *            verify → (Verify email / Back to sign in) → signin
 *
 * The reference's "Need an account? Sign up" is an onclick BUTTON (no
 * href, verified live): the card swaps to a MINIMAL signup form — Email /
 * Password / Confirm Password, NO Name field, NO Google button, NO
 * divider — with "Back to sign in" and a one-size-down stock submit
 * "Create account". A successful signup swaps again to the verify-email
 * view (six single-digit inputs + the attempts ladder). The signup view's
 * error banner is the Callout vocabulary below (the red variant of the
 * s11 sent-callout). Session-79 (M-79c2) v4-FALSIFIED the s21 claim
 * that the back buttons' -mb-2 mirrors verbatim: under v4's
 * :where() margin-BOTTOM space-y, the negative own-class margin WINS
 * the specificity fight and computes a -8px OVERLAP (LIVE-measured on
 * our dev server) where the reference computes +8px at BOTH widths —
 * mb-2 (signup/verify) and mb-2 sm:mb-4 (reset) are the v4-correct
 * expressions of the reference's computed gaps.
 */

/** The five card views. `signin` is the default (the /signup page starts at `signup`). */
export type LoginView = "signin" | "reset" | "sent" | "signup" | "verify";

/** The user intents that move between views. */
export type LoginViewIntent = "forgot" | "send" | "back" | "signup" | "verify";

/**
 * The pure view state machine. Unknown combinations keep the current view
 * (e.g. "back" from signin is a no-op — the button does not render there).
 */
export function nextLoginView(view: LoginView, intent: LoginViewIntent): LoginView {
  if (view === "signin" && intent === "forgot") return "reset";
  if (view === "signin" && intent === "signup") return "signup";
  if (view === "reset" && intent === "send") return "sent";
  if ((view === "reset" || view === "sent") && intent === "back") return "signin";
  if (view === "signup" && intent === "verify") return "verify";
  if ((view === "signup" || view === "verify") && intent === "back") return "signin";
  return view;
}

/**
 * The Send reset link guard. The reference keeps the reset view when the
 * email field is empty or malformed; a non-empty local part + "@" + host
 * part swaps to the sent view.
 */
export function canSubmitReset(email: string): boolean {
  const at = email.indexOf("@");
  return at > 0 && at < email.length - 1 && email.indexOf("@", at + 1) === -1;
}

/** The reset/sent views' class vocabulary (DOM-extracted, see header). */
export const LOGIN_RESET_LAYOUT = {
  /** The w-full column that replaces the login column's content. */
  viewColumn: "w-full",
  /** The space-y-4 sm:space-y-6 stack both views render inside. */
  viewStack: "space-y-4 sm:space-y-6",
  /** The reset view's left-aligned Back to sign in. NOTE: the reference's
   *  class is `… -mb-2`, which under ITS v3-era space-y (margin-TOP on
   *  following siblings) collapses to an 8px gap at <640 (under space-y-4)
   *  and a 16px gap at >=640 (under sm:space-y-6) — LIVE-measured at 390
   *  and 1512 (session-79). Under OUR Tailwind v4, space-y is wrapped in
   *  :where() and sets margin-BOTTOM — where any own mb class WINS the
   *  specificity fight — so `mb-2 sm:mb-4` expresses the SAME computed
   *  ladder directly. (Session-11 VLM round: the clone rendered -8px
   *  until the re-pin; session-79: the flat mb-4 was 8px too tall at
   *  phones.) Session-222 (R-19, F-222g): the house focus ring joins
   *  the auth funnel's hand-rolled buttons (the amber genus). */
  back: "flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors mb-2 sm:mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 rounded-md",
  /** The reset view's mail icon — the LIGHTER slate-400 family (the
   *  reference's reset/signup views ride slate-400 icons where the
   *  signin view rides slate-500; session-79 L-79c10, live-extracted). */
  inputIcon: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400",
  /** The back button's ArrowLeft icon size. */
  backIcon: "h-4 w-4",
  /** Both views' h2 — one step below the login h1 (text-xl vs text-2xl). */
  title: "text-xl sm:text-2xl font-bold text-slate-900",
  /** Both views' description / email line. */
  description: "text-slate-600 text-sm sm:text-base",
  /** The reset view's submit — one size below Sign in (h-10 sm:h-11);
   *  Session-79 (M-79c1/N-79c12): text-sm (14px at all widths, the
   *  reference's stock Button) + the disabled/keyboard-ring chrome. */
  send:
    "w-full h-10 sm:h-11 bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-sm rounded-xl transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-sm",
  /** The reset view's email input — the login input family one size down
   *  (h-10 sm:h-11 vs the sign-in form's h-11 sm:h-12), same pl-10 mail
   *  icon + slate-50/50 surface. The placeholder is LIGHTER than the
   *  sign-in fields' (slate-400 vs slate-600 — the reference's own
   *  inconsistency, mirrored; DOM: rgb(148,163,184)). Session-79
   *  (M-79c1/M-79c4): the stock text-base md:text-sm pair + the SOLID
   *  slate-400 ring with the 2px offset (live-probed on the reference). */
  resetInput:
    "h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 placeholder:text-slate-400 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 text-base md:text-sm sm:h-11",
  /** The sent view's heading stack (icon circle + title block). */
  sentHeadingStack: "text-center space-y-3 sm:space-y-4",
  /** The sent view's icon circle wrap. */
  sentIconWrap:
    "mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center",
  /** The sent view's lucide-mail icon. */
  sentIcon: "h-7 w-7 sm:h-8 sm:w-8 text-slate-700",
  /** The title + email line stack inside the sent heading. */
  sentTitleStack: "space-y-2",
  /** The "We've sent password reset instructions to" paragraph. */
  sentEmailLine: "text-slate-600 text-sm sm:text-base",
  /** The email itself — medium-weight slate-900. */
  sentEmailSpan: "font-medium text-slate-900",
  /** The green callout box (no icon renders on the reference).
   *  Session-111 [D5, inert]: the reference's callout carries the FULL
   *  [&>svg] arm family — the same form the error/info callouts ship
   *  (the s11 extraction's asymmetry); no svg ever renders on the
   *  auth surfaces, the arms are byte-parity only. */
  sentCallout:
    "relative w-full border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground text-foreground bg-green-50/70 border-green-200 rounded-xl",
  /** The callout's text (leading-relaxed green-700 14px). */
  sentCalloutText: "[&_p]:leading-relaxed text-green-700 text-sm",
  /** The sent view's full-width centered Back to sign in. */
  sentBack:
    "w-full flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors",
} as const;

/**
 * The signup view's class vocabulary — session 21 (S21-P4), DOM-extracted
 * from the live reference at 1512×844 (the in-place swap the s10 pin
 * misread as a dead button). The column/stack/back/title/submit all ride
 * the SAME families the s11 reset views pinned; only the form spacing
 * (space-y-3 sm:space-y-4 + the space-y-3 fields group) is the signup
 * view's own.
 */
export const LOGIN_SIGNUP_LAYOUT = {
  /** The w-full column that replaces the login column's content. */
  viewColumn: "w-full",
  /** The space-y-4 stack (NO sm variant — unlike the reset view's sm:space-y-6). */
  viewStack: "space-y-4",
  /** The back button — the reference's computed +8px gap (its -mb-2
   *  collapses under v3 space-y-4 at ALL widths; session-79 M-79c2
   *  LIVE-falsified the s21 "verbatim -mb-2" claim: under our v4 the
   *  own class WINS the :where() fight and computed an 8px OVERLAP —
   *  `mb-2` is the v4-correct direct expression). Session-222 (R-19,
   *  F-222g): the house focus ring (the amber genus). */
  back: "flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors mb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 rounded-md",
  /** The back button's ArrowLeft icon size (the s11 pin). */
  backIcon: "h-4 w-4",
  /** The view's h2 — the s11 title family. */
  title: "text-xl sm:text-2xl font-bold text-slate-900",
  /** The form — one step tighter than the signin form. */
  form: "space-y-3 sm:space-y-4",
  /** The fields group inside the form. */
  fields: "space-y-3",
  /** The signup view's mail/lock icons — the LIGHTER slate-400 family
   *  (the reset view's twin; session-79 L-79c10, live-extracted). */
  inputIcon: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400",
  /** The field wrapper + label — the signin family (the v4-correct
   *  mt-on-following spacing + the stock-label slate-700), DOM-verified
   *  on the signup view. Session-96 (S96-P0): the v3 `space-y-1.5`
   *  string is v4-FALSIFIED (margin-bottom on the INLINE label is
   *  ignored — the 6px gap silently lost); `[&>*+*]:mt-1.5` expresses
   *  the reference's computed mechanism (the M-79c2 doctrine). */
  field: "[&>*+*]:mt-1.5",
  label: "text-sm font-medium text-slate-700",
  /** The input — the s11 resetInput family (h-10 sm:h-11, ONE size down
   *  from the signin form's h-11 sm:h-12), DOM-verified on the reference's
   *  signup view: …pl-10 h-10 sm:h-11 bg-slate-50/50 border-slate-200
   *  focus:border-slate-400 focus:ring-slate-400 rounded-xl
   *  placeholder:text-slate-400 text-sm sm:text-base. */
  input:
    "h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 placeholder:text-slate-400 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 text-sm sm:text-base md:text-sm sm:h-11",
  /** The submit — the s11 one-size-down send family (the text-sm +
   *  chrome ride the shared send record). */
  submit: "w-full h-10 sm:h-11 bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-sm rounded-xl transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-sm",
} as const;

/**
 * The verify-email view's class vocabulary — session 21 (S21-P5),
 * DOM-extracted from the live reference at 1512×844. Every element rides
 * the families the s11 sent view already pinned (the icon tile, the title,
 * the email line); the six code inputs are the stock Input plus the
 * reference's center/size overrides.
 */
export const LOGIN_VERIFY_LAYOUT = {
  /** The w-full column + stack — session-79 (L-79c8, live-extracted):
   *  the verify view's own stack carries the sm:space-y-6 arm (the
   *  space-y-4-only pin was the s21 misread). */
  viewColumn: "w-full",
  viewStack: "space-y-4 sm:space-y-6",
  /** The back button (left-aligned — the reset view's mb-2 sm:mb-4
   *  twin; session-111 [D4]: the reference's verify back->heading gap
   *  computes 16 at >=640 [its -mb-2 collapses with the v3 mt 24;
   *  LIVE-measured on the s111 re-walk] — the flat mb-2 rode 8px at
   *  all widths, 8px short at desktop). Session-222 (R-19, F-222g):
   *  the house focus ring (the amber genus). */
  back: "flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors mb-2 sm:mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 rounded-md",
  backIcon: "h-4 w-4",
  /** The centered heading stack — session-111 [D2, inert]: the
   *  reference's own class is text-center space-y-2 (the s21 "the sent
   *  view's family" misread); INERT on both apps — the tile's own
   *  mb-3 sm:mb-4 always overrides the stack's space-y (the heading
   *  heights measure 168/144 identical); re-pinned for byte parity. */
  headingStack: "text-center space-y-2",
  /** The envelope tile — the sent view's icon circle + its own mb. */
  iconWrap:
    "mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3 sm:mb-4",
  icon: "h-7 w-7 sm:h-8 sm:w-8 text-slate-700",
  /** The title + email line stack inside the heading. */
  titleStack: "space-y-2",
  /** The view's h2. */
  title: "text-xl sm:text-2xl font-bold text-slate-900",
  /** The "We've sent a 6-digit code to" paragraph. */
  emailLine: "text-slate-600 text-sm sm:text-base",
  /** The email itself — medium-weight slate-900. */
  emailSpan: "font-medium text-slate-900",
  /** The six code inputs' wrap (DOM: flex items-center justify-center gap-1.5). */
  codeWrap: "flex items-center justify-center gap-1.5",
  /** Each code input — the stock Input + the reference's overrides
   *  (DOM: …text-center w-10 h-11 text-base font-semibold — with the
   *  stock md:text-sm winning at desktop, computed 14px; inputMode
   *  numeric; the FIRST input carries autoComplete="one-time-code", the
   *  rest "off"). NOTE: no w-full — the reference's own w-full+w-10
   *  conflict resolves to 40px under ITS v3 cascade; under our v4 the
   *  same pair flex-shrinks to ~56px, so only w-10 ships. */
  codeInput: "text-center w-10 h-11 text-base font-semibold md:text-sm",
  /** The form — session-79 (L-79c8, live-extracted): the verify view's
   *  own space-y-4 sm:space-y-6 family (NOT the signup's tighter pair). */
  form: "space-y-4 sm:space-y-6",
  /** The submit — the s11 one-size-down send family. */
  submit: "w-full h-10 sm:h-11 bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-sm rounded-xl transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-sm",
  /** The "Didn't receive the code? Resend" line (the P itself). */
  resendLine: "text-sm text-slate-600",
  /** The resend line's centered wrapper (DOM: div.text-center > p). */
  resendWrap: "text-center",
  /** The Resend button inside the line. Session-222 (R-19, F-222g):
   *  the house focus ring (the amber genus). */
  resendButton: "font-medium text-slate-700 hover:text-slate-900 disabled:opacity-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 rounded-sm",
  /** The form's buttons group (DOM: div.space-y-3 holding the submit +
   *  the resend line — the verify view's own bottom-of-form family). */
  buttonsGroup: "space-y-3",
  /** The hint line under the six code inputs — session-79 (L-79c7,
   *  live-extracted): `<p class="text-xs text-slate-500 text-center
   *  mt-3">Enter the verification code sent to your email</p>` riding
   *  the SAME plain wrapper div as the codeWrap (the mt-3 must not ride
   *  the form's space-y — margin collapse would eat it). */
  hint: "text-xs text-slate-500 text-center mt-3",
  hintLine: "Enter the verification code sent to your email",
} as const;

/**
 * The error-banner Callout — session 21 (S21-P3), DOM-extracted from the
 * live reference (the red variant of the s11 sent-callout, the shadcn
 * Callout pattern). The `[&>svg]` classes position an icon the reference
 * never renders on the auth surfaces — they are part of its own Callout
 * markup and ship verbatim.
 */
export const LOGIN_ERROR_CALLOUT = {
  /** The Callout box. */
  callout:
    "relative w-full border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground text-foreground bg-red-50/70 border-red-200 rounded-xl",
  /** The inner text div. */
  text: "[&_p]:leading-relaxed text-red-700 text-sm",
} as const;

/**
 * The info-banner Callout — session 21 (S21-P5), the GREEN variant the
 * reference renders for the resend confirmation ("New verification code
 * sent to your email", DOM: bg rgba(240,253,244,.7) + border
 * rgb(187,247,208)). It auto-dismisses (~3s, live-bounded 1.6–3.2s)
 * where the error banners persist — the card drives that timing.
 */
export const LOGIN_INFO_CALLOUT = {
  /** The Callout box. */
  callout:
    "relative w-full border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground text-foreground bg-green-50/70 border-green-200 rounded-xl",
  /** The inner text div. */
  text: "[&_p]:leading-relaxed text-green-700 text-sm",
} as const;
