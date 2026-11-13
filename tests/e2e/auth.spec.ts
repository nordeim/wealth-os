import { expect, test } from "@playwright/test";

// Logged-out surface (no storage state for this spec).

test.use({ storageState: { cookies: [], origins: [] } });

test("login page renders the WealthOS card", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Welcome to WealthOS" })).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Continue with Google" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
});

test("rejects wrong credentials with a visible error", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("sepnetflix2023@outlook.com");
  await page.getByLabel("Password").fill("wrong-password");
  await page.getByRole("button", { name: "Sign in" }).click();
  // Session-21 (S21-P1): the reference's banner text — "Invalid email or
  // password" (was "Incorrect…", wrong-password probes on both apps). And
  // S21-P2: ZERO toasts fire on the auth flows — the banner is the only
  // surface (the reference's login failure renders no sonner toast).
  await expect(
    page.getByRole("alert").filter({ hasText: /Invalid email or password/i }),
  ).toBeVisible();
  // The Callout vocabulary (bg-red-50/70) — scoped past Next's built-in
  // route announcer, which also carries role=alert.
  await expect(
    page.getByRole("alert").filter({ hasText: /Invalid email or password/i }),
  ).toHaveClass(/bg-red-50\/70/);
  // S21-P2: ZERO toast cards fire (the empty Notifications region itself
  // ships on both apps — the reference's sonner viewport included).
  await expect(page.getByRole("status")).toHaveCount(0);
});

test("unauthenticated visits login-wall with from_url (the reference's own guard genus)", async ({ page }) => {
  // Session-199: the WealthOS reference login-walls its root — a guest
  // on `/` lands on /login?from_url=<abs> (live-observed). Our (app)
  // group keeps the SERVER-side session decision (the guest never
  // receives the page's HTML) and lands on the same wall via the
  // GuestLoginRedirect shim, with the same from_url round-trip.
  await page.goto("/");
  await page.waitForURL(/\/login\?from_url=/);
  await expect(page.getByRole("heading", { name: "Welcome to WealthOS" })).toBeVisible();
  // the section pages login-wall the same way:
  await page.goto("/Expenses");
  await page.waitForURL(/\/login\?from_url=/);
  await expect(page.getByRole("heading", { name: "Welcome to WealthOS" })).toBeVisible();
});

// Session-11 (S11-P1): the reference's Forgot-password flow — an in-card
// view swap (no URL change). The reset view replaces the login column (no
// logo / Google button / divider). Session-163: the sent view is now the
// REAL endpoint's answer — the pre-163 form was client-side theater (no
// network call fired; the reference's own demo behavior); the retrofit
// wires POST /api/auth/forgot-password, whose no-enumeration 200 swaps
// the card for known and unknown emails alike.
test("forgot password swaps the card to the reset view and back", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Forgot password?" }).click();
  await expect(page.getByRole("heading", { name: "Reset your password" })).toBeVisible();
  await expect(
    page.getByText("Enter your email and we'll send you a link to reset your password"),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Send reset link" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Back to sign in" })).toBeVisible();
  // The login-only chrome is gone on the reset view.
  await expect(page.getByRole("button", { name: "Continue with Google" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Welcome to WealthOS" })).toHaveCount(0);
  // The URL never changes — the swap is in-card.
  await expect(page).toHaveURL(/\/login$/);

  await page.getByRole("button", { name: "Back to sign in" }).click();
  await expect(page.getByRole("heading", { name: "Welcome to WealthOS" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
});

test("send reset link swaps to the check-your-email view", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Forgot password?" }).click();
  await page.getByLabel("Email").fill("demo@example.com");
  await page.getByRole("button", { name: "Send reset link" }).click();
  await expect(page.getByRole("heading", { name: "Check your email" })).toBeVisible();
  await expect(
    page.getByText("We've sent password reset instructions to"),
  ).toBeVisible();
  await expect(page.getByText("demo@example.com")).toBeVisible();
  await expect(
    page.getByText("Please check your email for the password reset link."),
  ).toBeVisible();

  await page.getByRole("button", { name: "Back to sign in" }).click();
  await expect(page.getByRole("heading", { name: "Welcome to WealthOS" })).toBeVisible();
});

// ---------------------------------------------------------------------
// Session-21 (S21-P4/P5): the reference's in-place signup + verify-email
// views — "Need an account? Sign up" is an onclick BUTTON that swaps the
// card (the s10 pin's "dead login button" claim disproven live): a minimal
// form (Email / Password / Confirm Password — NO name field, NO Google
// button, NO divider), then the verify view with six single-digit inputs
// and the attempts ladder. All DOM-verified on the reference 2026-10-01.

test("need an account swaps the card to the minimal signup view and back", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Need an account? Sign up" }).click();

  await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Confirm Password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Create account" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Back to sign in" })).toBeVisible();

  // The login-only chrome is GONE on the signup view (the reference's
  // column-replacement architecture, same as the reset view).
  await expect(page.getByRole("button", { name: "Continue with Google" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Welcome to WealthOS" })).toHaveCount(0);
  // The URL never changes — the swap is in-card.
  await expect(page).toHaveURL(/\/login$/);

  await page.getByRole("button", { name: "Back to sign in" }).click();
  await expect(page.getByRole("heading", { name: "Welcome to WealthOS" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
});

test("view swaps land focus on the new view's heading (F-231b)", async ({ page }) => {
  // Session-231 (R-28, F-231b): the in-place transitions replace the
  // focused control — unmanaged, focus falls to <body> and SR/keyboard
  // users get no signal the view changed. Every swap now lands focus on
  // the new view's heading (the verify view's box-1 pattern, which
  // stays as the verify arm of the same unified effect).
  await page.goto("/login");

  await page.getByRole("button", { name: "Need an account? Sign up" }).click();
  await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Create your account" })).toBeFocused();

  await page.getByRole("button", { name: "Back to sign in" }).click();
  await expect(page.getByRole("heading", { name: "Welcome to WealthOS" })).toBeFocused();

  await page.getByRole("button", { name: "Forgot password?" }).click();
  await expect(page.getByRole("heading", { name: "Reset your password" })).toBeFocused();

  // The initial page load keeps natural focus (the mount guard) — the
  // swap legs above prove transitions; this reload proves the guard.
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Welcome to WealthOS" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Welcome to WealthOS" })).not.toBeFocused();
});

test("signup view guards mismatched confirm passwords", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Need an account? Sign up" }).click();

  await page.getByLabel("Email").fill("mismatch@example.com");
  await page.getByLabel("Password", { exact: true }).fill("TestPass123");
  await page.getByLabel("Confirm Password").fill("DifferentPass");
  await page.getByRole("button", { name: "Create account" }).click();

  await expect(
    page.getByRole("alert").filter({ hasText: "Passwords do not match" }),
  ).toBeVisible();
  // Still on the signup view (no navigation, no network call for the guard).
  await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
});

test("a fresh signup swaps to the verify-email view with its ladder", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Need an account? Sign up" }).click();

  const signupEmail = `e2e-verify-${Date.now()}@example.com`;
  await page.getByLabel("Email").fill(signupEmail);
  await page.getByLabel("Password", { exact: true }).fill("TestPass123");
  await page.getByLabel("Confirm Password").fill("TestPass123");
  await page.getByRole("button", { name: "Create account" }).click();

  // The verify view: the envelope tile + h2 + the email line + six inputs.
  await expect(page.getByRole("heading", { name: "Verify your email" })).toBeVisible();
  // S111 (D1, the s111 login-family re-walk): the first code box is
  // FOCUSED on mount — the reference's focus-entry (live-measured: the
  // 2px ring rests on box 1 only, box 6 at none); ours made keyboard
  // users Tab to box 1 before the fix.
  await expect(page.locator('input[inputmode="numeric"]').first()).toBeFocused();
  await expect(page.getByText("We've sent a 6-digit code to")).toBeVisible();
  await expect(page.getByText(signupEmail)).toBeVisible();
  for (let i = 1; i <= 6; i += 1) {
    await expect(page.getByLabel(`Digit ${i}`)).toBeVisible();
  }
  await expect(page.getByRole("button", { name: "Verify email" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Resend" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Back to sign in" })).toBeVisible();

  // The incomplete guard: submitting with no digits.
  await page.getByRole("button", { name: "Verify email" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Please enter all 6 digits" }),
  ).toBeVisible();

  // The wrong-code ladder: one wrong submission → 4 remaining.
  for (let i = 1; i <= 6; i += 1) {
    await page.getByLabel(`Digit ${i}`).fill(String(i % 10));
  }
  await page.getByRole("button", { name: "Verify email" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Invalid verification code. 4 attempts remaining." }),
  ).toBeVisible();

  // The resend: the green info Callout (auto-dismissing on the reference).
  // Session-234 (R-31, F-234d): arm the response capture BEFORE the
  // click — the paste leg below needs the FRESH code the resend mints
  // (the in-app delivery the e2e environment pins on).
  const resendResponse = page.waitForResponse(
    (r) => r.url().includes("/api/auth/resend") && r.request().method() === "POST",
  );
  await page.getByRole("button", { name: "Resend" }).click();
  await expect(
    // Session-219 (R-16, F-219v): the polite live region carries the
    // resend confirmation (the status role) — ErrorCallout keeps the
    // assertive role. Session-233 (R-30, F-233c): the region pre-exists
    // in the verify view; the visual callout is the banner only.
    page.getByRole("status").filter({ hasText: "New verification code sent to your email" }),
  ).toBeVisible();
  const resendBody = (await (await resendResponse).json()) as {
    data?: { verificationCode?: string | null };
  };
  const wholeCode = resendBody.data?.verificationCode ?? "";
  expect(wholeCode).toMatch(/^\d{6}$/);

  // Session-234 (R-31, F-234d): the paste/autofill path — the whole
  // code delivered as ONE edit into a LATER box. The browser
  // one-time-code autofill inserts the full code into the first
  // focused box and a whole-code paste behaves identically at the
  // change-event layer; fill() delivers exactly that event shape.
  // With one digit already typed (the type-then-paste flow), the seam
  // must restart the distribution at box 1 (F-234c) — the session-233
  // form rotated the code from the edited box and burned an attempt.
  await page.getByLabel("Digit 1").fill(wholeCode[0]!);
  await page.getByLabel("Digit 2").fill(wholeCode);
  for (let i = 1; i <= 6; i += 1) {
    await expect(page.getByLabel(`Digit ${i}`)).toHaveValue(wholeCode[i - 1]!);
  }
  await expect(page.getByLabel("Digit 6")).toBeFocused();
  await page.getByRole("button", { name: "Verify email" }).click();
  // The resend reset the attempt ladder, so the correct code signs in —
  // the verify success lands the app's root (the dashboard).
  await expect(page.getByRole("heading", { name: "Financial Dashboard", exact: true })).toBeVisible();
});

// Session-67 (N-67 family coverage closure): the ladder beyond rung 1 —
// the 67-c rotation found the attempts 2→5 climb, the lockout repeat,
// and the post-lockout resend never driven anywhere. Six wrong
// submissions against a throwaway signup (the verify budget is 20/IP —
// the sibling test above spends 1 POST: its incomplete-guard click is
// blocked CLIENT-SIDE before the fetch; this one spends 6 — 7 total
// per run, comfortably under the ceiling).
test("the wrong-code ladder climbs to lockout and repeats its message", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Need an account? Sign up" }).click();

  const signupEmail = `e2e-lockout-${Date.now()}@example.com`;
  await page.getByLabel("Email").fill(signupEmail);
  await page.getByLabel("Password", { exact: true }).fill("TestPass123");
  await page.getByLabel("Confirm Password").fill("TestPass123");
  await page.getByRole("button", { name: "Create account" }).click();

  await expect(page.getByRole("heading", { name: "Verify your email" })).toBeVisible();

  const submitWrongCode = async () => {
    for (let i = 1; i <= 6; i += 1) {
      await page.getByLabel(`Digit ${i}`).fill(String((i + 4) % 10));
    }
    await page.getByRole("button", { name: "Verify email" }).click();
  };

  // Rungs 1-4: the attempts-remaining countdown (4 down to 1).
  for (let remaining = 4; remaining >= 1; remaining -= 1) {
    await submitWrongCode();
    await expect(
      page
        .getByRole("alert")
        .filter({ hasText: `Invalid verification code. ${remaining} attempts remaining.` }),
    ).toBeVisible();
  }

  // Rung 5: the lockout banner.
  await submitWrongCode();
  await expect(
    page
      .getByRole("alert")
      .filter({ hasText: "Too many failed attempts. Please request a new verification code." }),
  ).toBeVisible();

  // Rung 6: the lockout message REPEATS (the ladder does not reset on
  // its own — the resend is the only recovery path).
  await submitWrongCode();
  await expect(
    page
      .getByRole("alert")
      .filter({ hasText: "Too many failed attempts. Please request a new verification code." }),
  ).toBeVisible();

  // The post-lockout resend: the non-leaking info banner (the route
  // answers identically for a locked-out account and resets the ladder
  // server-side).
  await page.getByRole("button", { name: "Resend" }).click();
  await expect(
    // Session-219 (R-16, F-219v): the polite live region carries the
    // resend confirmation (the status role) — ErrorCallout keeps the
    // assertive role. Session-233 (R-30, F-233c): the region pre-exists
    // in the verify view; the visual callout is the banner only.
    page.getByRole("status").filter({ hasText: "New verification code sent to your email" }),
  ).toBeVisible();
});

test("the /signup page renders the same minimal signup view", async ({ page }) => {
  await page.goto("/signup");
  await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Confirm Password")).toBeVisible();
  // The reference 404s /signup (our documented working superset page) —
  // its content mirrors the reference's real signup form: no Google
  // button, no divider, no name field.
  await expect(page.getByRole("button", { name: "Continue with Google" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Welcome to WealthOS" })).toHaveCount(0);
});

test("the signup 4xx negatives: the duplicate surfaces in the card + the API quartet (S73-P7b + the S165-P1 CSRF probe)", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Need an account? Sign up" }).click();
  await expect(page.getByLabel("Confirm Password")).toBeVisible();

  // The UI-reachable negative: the DUPLICATE email (the seeded demo
  // user) — the server's exact message surfaces in the card's
  // ErrorCallout (the native type=email + minLength=8 guards block the
  // other two at the form level, mirroring the reference's own form).
  await page.getByLabel("Email").fill("sepnetflix2023@outlook.com");
  await page.getByLabel("Password", { exact: true }).fill("TestPass123");
  await page.getByLabel("Confirm Password").fill("TestPass123");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByText("A user with this email already exists")).toBeVisible();

  // The API-level quartet (the s69 sessioned-pre-gate probe pattern,
  // + the s165 CSRF probe): the invalid email, the short password, the
  // oversized body, and the text/plain login-CSRF shape — the route's
  // own 4xx vocabulary, pinned at the envelope level.
  const invalidEmail = await page.request.post("/api/auth/signup", {
    data: { email: "not-an-email", password: "TestPass123" },
  });
  expect(invalidEmail.status()).toBe(400);
  const invalidBody = await invalidEmail.json();
  expect(invalidBody.error.message).toBe("Enter a valid email address");

  const shortPassword = await page.request.post("/api/auth/signup", {
    data: { email: "valid@example.com", password: "short" },
  });
  expect(shortPassword.status()).toBe(400);
  const shortBody = await shortPassword.json();
  expect(shortBody.error.message).toBe("Password must be at least 8 characters");

  // The oversized body (the N-67d declared-length pre-gate, 16KB cap):
  // an oversized name rides to the family's shared guard.
  const oversized = await page.request.post("/api/auth/signup", {
    data: { email: "valid2@example.com", password: "TestPass123", name: "x".repeat(20 * 1024) },
  });
  expect(oversized.status()).toBe(400);
  const oversizedBody = await oversized.json();
  expect(oversizedBody.error.message).toBe("Request body too large");

  // Session-165 (WP-1 — the digma S148-A port): the content-type CSRF
  // gate's live pin. The login-CSRF attack shape: a text/plain body
  // carrying a VALID JSON credential payload (the enctype="text/plain"
  // cross-site form family) — the bounded reader rejects it
  // by-policy BEFORE the schema ever runs, answering the parse seam's
  // own invalid-body 400. The probe rides its OWN rate-limit bucket
  // (the dedicated XFF hop, the s163 reset-round-trip doctrine — the
  // login route buckets before it parses, so a rejected probe still
  // spends the shared localhost budget otherwise); no session cookie
  // is minted either way.
  const csrfShape = await page.request.post("/api/auth/login", {
    headers: { "content-type": "text/plain", "x-forwarded-for": "198.51.100.165" },
    data: JSON.stringify({ email: "sepnetflix2023@outlook.com", password: "$Abcd1234" }),
  });
  expect(csrfShape.status()).toBe(400);
  const csrfBody = await csrfShape.json();
  expect(csrfBody.error.message).toBe("Invalid request body");
});

// Session-218 (R-15, F-218a — the expired-verification recovery loop,
// the e2e leg): R-14's hash-gate 403s VERIFICATION_REQUIRED for any
// hash-present account (expired code or fresh — the client path is
// identical), and the resend re-arms server-side. Pre-cure the client
// rendered the 403 as a banner dead-end: the verify view (the ONLY
// surface with the Resend link) was reachable solely via signup
// success. NOTE the signup budget: this leg is the battery's 10th and
// FINAL signup-IP POST (the route's own cap) — any future signup-adding
// leg must consolidate.
test("the signin 403 lands the verify view and the Resend re-arms (F-218a)", async ({ page }) => {
  const email = `e2e-recovery-${Date.now()}@example.com`;
  // A hash-present account (an unverified signup) via the API. The
  // in-app delivery (pinned ON for e2e) returns the code — captured
  // so the F-224b wrong-code probe below can never collide with the
  // real one (deterministic, zero-flake).
  const signupRes = await page.request.post("/api/auth/signup", {
    data: { email, password: "TestPass123" },
  });
  const signupBody = (await signupRes.json()) as { data?: { verificationCode?: string | null } };
  const realCode = signupBody.data?.verificationCode ?? null;

  // The UI signin — the 403 arm must land the verify view, never the
  // banner dead-end that locked expired-code accounts out.
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill("TestPass123");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Verify your email" })).toBeVisible();
  await expect(page.getByText("We've sent a 6-digit code to")).toBeVisible();
  await expect(page.getByText(email)).toBeVisible();

  // The Resend completes the recovery loop (the F-217d re-arm).
  await page.getByRole("button", { name: "Resend" }).click();
  await expect(
    // Session-219 (R-16, F-219v): the polite live region carries the
    // resend confirmation (the status role) — ErrorCallout keeps the
    // assertive role. Session-233 (R-30, F-233c): the region pre-exists
    // in the verify view; the visual callout is the banner only.
    page.getByRole("status").filter({ hasText: "New verification code sent to your email" }),
  ).toBeVisible();

  // Session-224 (R-21, F-224b — consolidated here per the signup
  // budget): the verify oracle's NUMERIC tell is closed. The wrong-code
  // ladder increments BEFORE replying (reachable values 4…1), so the
  // no-pending branch must answer the FIRST rung — the single-probe
  // reply is byte-identical to a fresh pending code's. This account
  // just re-armed (attempts reset), so its first wrong code answers
  // "4 attempts remaining"; the demo account (seeded with NO pending
  // code) must answer the SAME body.
  const wrongCode = !realCode || realCode === "000000" ? "000001" : "000000";
  const pendingProbe = await page.request.post("/api/auth/verify", {
    data: { email, code: wrongCode },
  });
  const pendingBody = (await pendingProbe.json()) as { error?: { message?: string } };
  const noPendingProbe = await page.request.post("/api/auth/verify", {
    data: { email: "sepnetflix2023@outlook.com", code: "000000" },
  });
  const noPendingBody = (await noPendingProbe.json()) as { error?: { message?: string } };
  expect(pendingProbe.status()).toBe(400);
  expect(noPendingProbe.status()).toBe(400);
  expect(pendingBody.error?.message).toBe("Invalid verification code. 4 attempts remaining.");
  expect(noPendingBody.error?.message).toBe(pendingBody.error?.message);

  // Session-235 (R-32, F-235b — the login verification-oracle closure,
  // riding this leg's existing signup): a WRONG password on this
  // never-verified account must answer the SAME 403 the correct one
  // does — pre-cure it answered 401 INVALID_CREDENTIALS, confirming
  // credential validity through the 403/401 split. The gate now sits
  // above the credential check with the equalizer burned on its branch;
  // the probe asserts the closed oracle (403 + the verify message) with
  // zero new signups.
  const wrongPwProbe = await page.request.post("/api/auth/login", {
    data: { email, password: "DefinitelyNotThePassword1" },
  });
  const wrongPwBody = (await wrongPwProbe.json()) as {
    error?: { code?: string; message?: string };
  };
  expect(wrongPwProbe.status()).toBe(403);
  expect(wrongPwBody.error?.code).toBe("VERIFICATION_REQUIRED");
});

// Session-224 (R-21, F-224d): the logout REVOCATION's first behavioral
// pin. The smoke leg replays the CLEARED jar — it proves the cookie is
// gone from the client, not that the server REJECTS the pre-logout
// cookie. This leg mints a session, captures the cookie value, logs
// out, then REPLAYS the captured cookie against /api/auth/me — the
// tokenVersion bump (F-223k) must reject it server-side.
//
// The mint rides a SCRATCH user (the data-import doctrine — the demo
// corpus is never touched): the F-223k bump is USER-level, so a
// demo-account logout here would evict the shared auth.setup
// storageState (its cookie embeds the pre-bump version) and every
// later shared-state spec would land on the login wall. The pin is
// user-agnostic — a scratch account exercises the identical
// mint/capture/logout/replay path without the order coupling.
test("logout revokes the session server-side — a replayed pre-logout cookie is dead (F-224d)", async ({
  request,
}) => {
  // -- the scratch user comes to be (in-app OTP by default in e2e)
  const email = `e2e-revoke-${Date.now()}@example.com`;
  const signup = await request.post("/api/auth/signup", {
    data: { email, password: "TestPass123" },
  });
  expect(signup.ok()).toBe(true);
  const signupBody = (await signup.json()) as {
    data: { verificationCode: string | null };
  };
  expect(signupBody.data.verificationCode).toMatch(/^\d{6}$/);
  const verify = await request.post("/api/auth/verify", {
    data: { email, code: signupBody.data.verificationCode },
  });
  expect(verify.ok()).toBe(true);

  // The mint: a genuine login for the now-verified scratch account.
  const login = await request.post("/api/auth/login", {
    data: { email, password: "TestPass123" },
  });
  expect(login.ok()).toBe(true);
  const setCookie = login.headers()["set-cookie"];
  const sessionCookie = (Array.isArray(setCookie) ? setCookie : [setCookie])
    .find((c) => c.startsWith("neo_session="));
  expect(sessionCookie).toBeTruthy();
  const cookieValue = sessionCookie!.split(";")[0];

  // F-218p: the logout route gates on the JSON content-type — the
  // request must carry it (an empty data object makes Playwright set
  // application/json).
  const logout = await request.post("/api/auth/logout", {
    headers: { cookie: cookieValue },
    data: {},
  });
  expect(logout.ok()).toBe(true);

  // The replay: the cookie the client HELD at logout time — the
  // server must treat it as dead (data:null, NOT the session record).
  const replay = await request.get("/api/auth/me", {
    headers: { cookie: cookieValue },
  });
  expect(replay.ok()).toBe(true);
  const body = (await replay.json()) as { data: unknown };
  expect(body.data).toBeNull();
});
