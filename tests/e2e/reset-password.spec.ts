import { expect, test } from "@playwright/test";

// Session-163 (the digma reset-password.spec.ts port): the reset funnel's
// behavioral battery. The spec OPTS OUT of the shared storageState (the
// surface is public and session-agnostic) and declares its OWN
// X-Forwarded-For bucket — a single-value header is both first and last
// hop, so the session-163 last-hop re-key leaves this isolation form
// byte-identical — so its auth calls (the scratch account's signup +
// verify + the round-trip's forgot + reset + old-login + new-login, plus
// the invalid-token submit's reset POST) never touch the auth.spec.ts
// shared budget.
//
// The round-trip runs on a DEDICATED SCRATCH ACCOUNT (digma's S67-A
// lesson): resetting the DEMO user mid-suite would bump its tokenVersion
// and evict the shared storageState's cookie for every spec running
// after this file alphabetically.

test.use({ storageState: { cookies: [], origins: [] } });
test.use({ extraHTTPHeaders: { "X-Forwarded-For": "198.51.100.46" } });

test.describe("reset-password landing (no token → the invalid-link card)", () => {
  test("renders the invalid-link card and Back to login navigates to /login", async ({ page }) => {
    await page.goto("/reset-password");
    await expect(page.getByRole("heading", { name: "Invalid reset link" })).toBeVisible();
    await expect(
      page.getByText("This password reset link is invalid or has expired."),
    ).toBeVisible();

    await page.getByRole("button", { name: "Back to login" }).click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: "Welcome to WealthOS" })).toBeVisible();
  });

  test("an empty token and a differently-named param both render the invalid card", async ({ page }) => {
    await page.goto("/reset-password?token=");
    await expect(page.getByRole("heading", { name: "Invalid reset link" })).toBeVisible();
    await page.goto("/reset-password?code=abc123");
    await expect(page.getByRole("heading", { name: "Invalid reset link" })).toBeVisible();
  });
});

test.describe("reset-password form (a non-empty token)", () => {
  test("renders the set-password form with the helper text", async ({ page }) => {
    await page.goto("/reset-password?token=e2e-shape-probe");
    await expect(page.getByRole("heading", { name: "Set new password" })).toBeVisible();
    await expect(page.getByText("Enter your new password for WealthOS")).toBeVisible();

    const password = page.locator("input#password");
    const confirm = page.locator("input#confirmPassword");
    await expect(password).toBeVisible();
    await expect(confirm).toBeVisible();
    await expect(page.getByText("Must be at least 8 characters")).toBeVisible();
    await expect(page.getByRole("button", { name: "Reset password", exact: true })).toBeVisible();
  });

  test("mismatched passwords render the inline error and do not submit", async ({ page }) => {
    await page.goto("/reset-password?token=e2e-shape-probe");
    await page.locator("input#password").fill("NewPass1234!");
    await page.locator("input#confirmPassword").fill("Different99!");
    await page.getByRole("button", { name: "Reset password", exact: true }).click();
    await expect(page.getByRole("alert").filter({ hasText: "Passwords do not match" })).toBeVisible();
    // Still on the reset page — the guard blocked the submit.
    await expect(page).toHaveURL(/\/reset-password/);
  });

  test("the invalid-token submit renders the inline alert", async ({ page }) => {
    await page.goto("/reset-password?token=e2e-invalid-token");
    await page.locator("input#password").fill("NewPass1234!");
    await page.locator("input#confirmPassword").fill("NewPass1234!");
    await page.getByRole("button", { name: "Reset password", exact: true }).click();
    const alert = page.getByRole("alert").filter({ hasText: "Invalid or expired reset token" });
    await expect(alert).toBeVisible({ timeout: 15_000 });
  });

  test("the bare Back to login link returns to the sign-in card", async ({ page }) => {
    await page.goto("/reset-password?token=e2e-shape-probe");
    await page.getByRole("button", { name: "Back to login" }).first().click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: "Welcome to WealthOS" })).toBeVisible();
  });

  test("the one-time token leaves the address bar once the form renders (F-233f)", async ({ page }) => {
    // Session-233 (R-30, F-233f): the token rode the query string for
    // its whole 60-minute life (browser history, back-forward cache,
    // intermediary logs). The screen captures it once at mount and
    // strips the query — the OAuth-callback hygiene form. The form
    // itself keeps working off the captured value.
    await page.goto("/reset-password?token=e2e-shape-probe");
    await expect(page.getByRole("heading", { name: "Set new password" })).toBeVisible();
    // the query is gone from the address bar…
    await expect(page).toHaveURL(/\/reset-password$/);
    // …and the captured token still drives the form (the inputs and
    // the submit stay live — a strip that broke the form would be a
    // cure worse than the finding)
    const password = page.locator("input#password");
    await expect(password).toBeVisible();
    await password.fill("NewPass1234!");
    await page.locator("input#confirmPassword").fill("NewPass1234!");
    await page.getByRole("button", { name: "Reset password", exact: true }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: "Invalid or expired reset token" }),
    ).toBeVisible({ timeout: 15_000 });
    // the tokenless URL never re-renders the invalid-link card mid-flow
    await expect(page.getByRole("heading", { name: "Set new password" })).toBeVisible();
  });
});

test.describe("the full reset round-trip (the in-app delivery)", () => {
  test("forgot → the sent card carries the link → set a new password → sign in with it", async ({ page }) => {
    // The scratch flow: signup, then the reset round-trip. The scratch
    // account is disposable; the e2e DB re-seeds per run. No restore
    // step is needed.
    // Session-239 (R-36, F-239b): the scratch account stays
    // NEVER-VERIFIED through the reset — the exact population the
    // recovery gate serves (signed up, never verified, locked out).
    // The reset clears the pending verification state alongside the
    // token pair, so the post-reset login reaches the Dashboard; the
    // pre-cure tree answered the login gate's 403 here (the standing
    // hash survived the reset) — this leg was RED against it.
    const scratchEmail = `s163-reset-${Date.now()}@e2e.test`;
    await page.goto("/login");
    const registered = await page.evaluate(
      async ({ email }) => {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: "Scratch1234!" }),
        });
        return res.json();
      },
      { email: scratchEmail },
    );
    expect(registered.ok).toBe(true);
    expect(typeof registered.data.verificationCode).toBe("string");
    // Deliberately NOT verified: the account carries its pending
    // verification state into the funnel below.

    // 1. The forgot request on the scratch account (the reset view's
    //    submit is now the REAL endpoint — the client-side theater is
    //    retired).
    await page.getByRole("button", { name: "Forgot password?" }).click();
    await page.getByLabel("Email").fill(scratchEmail);
    await page.getByRole("button", { name: "Send reset link" }).click();
    await expect(page.getByRole("heading", { name: "Check your email" })).toBeVisible({ timeout: 15_000 });

    // 2. The self-hosted in-app delivery: the sent card carries the reset
    //    link (a RELATIVE href resolving against the page's own origin).
    const infoLink = page.getByRole("link", { name: /reset link/i });
    await expect(infoLink).toBeVisible({ timeout: 15_000 });
    const href = await infoLink.evaluate((el) => (el as HTMLAnchorElement).href);
    expect(href).toMatch(/\/reset-password\?token=.+/);

    // 3. Follow the link → the form renders with the LIVE token.
    //    (Session-233, R-30, F-233f: the screen strips the token from
    //    the address bar once the form stands — the URL assertion moved
    //    from "still carries the token" to "the stripped form"; the
    //    form's own liveness is the heading + the submit round-trip
    //    below, which rides the captured value.)
    await infoLink.click();
    await expect(page.getByRole("heading", { name: "Set new password" })).toBeVisible();
    await expect(page).toHaveURL(/\/reset-password$/);

    // 4. Set the new password.
    await page.locator("input#password").fill("Reset1234!");
    await page.locator("input#confirmPassword").fill("Reset1234!");
    await page.getByRole("button", { name: "Reset password", exact: true }).click();

    // 5. The success card, then back to login.
    await expect(page.getByRole("heading", { name: "Password reset" })).toBeVisible({ timeout: 15_000 });
    await page.getByRole("button", { name: "Back to login" }).first().click();
    await expect(page).toHaveURL(/\/login$/);

    // 6. The OLD password no longer signs in; the NEW one does.
    await page.getByLabel("Email").fill(scratchEmail);
    await page.getByLabel("Password").fill("Scratch1234!");
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await expect(page.getByRole("alert").filter({ hasText: "Invalid email or password" })).toBeVisible();

    await page.getByLabel("Password").fill("Reset1234!");
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible({ timeout: 15_000 });

    // 7. The new session is live: /api/auth/me answers with the scratch
    //    user (the me route answers 200 with data:null when signed out,
    //    so the honest form asserts the resolved user).
    const me = await page.request.get("/api/auth/me");
    expect(me.status()).toBe(200);
    const meBody = await me.json();
    expect(meBody.data?.email).toBe(scratchEmail);
  });

  test("a pre-reset session dies at the version comparison (the S67-A eviction, behavioral)", async ({ page }) => {
    // The eviction's honest behavioral pin: mint a session, reset the
    // password through the API, then the OLD cookie no longer resolves a
    // user. (The reset bumps tokenVersion; the old token embeds the
    // pre-increment version.)
    const scratchEmail = `s163-evict-${Date.now()}@e2e.test`;
    await page.goto("/login");
    const registered = await page.evaluate(
      async ({ email }) => {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: "Scratch1234!" }),
        });
        return res.json();
      },
      { email: scratchEmail },
    );
    expect(registered.ok).toBe(true);
    const verified = await page.evaluate(
      async ({ email, code }) => {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code }),
        });
        return res.json();
      },
      { email: scratchEmail, code: registered.data.verificationCode },
    );
    expect(verified.ok).toBe(true);

    // The scratch session is live (verify signs the account in).
    const before = await page.request.get("/api/auth/me");
    expect((await before.json()).data?.email).toBe(scratchEmail);

    // The forgot + reset through the API (the page.request context rides
    // the browser's cookie jar — but the reset endpoint needs no session).
    const forgot = await page.evaluate(
      async ({ email }) => {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        return res.json();
      },
      { email: scratchEmail },
    );
    expect(forgot.ok).toBe(true);
    expect(typeof forgot.data.resetUrl).toBe("string");
    const token = String(forgot.data.resetUrl).split("token=")[1];

    const reset = await page.evaluate(
      async ({ token }) => {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reset_token: token, new_password: "Evicted1234!" }),
        });
        return res.json();
      },
      { token },
    );
    expect(reset.ok).toBe(true);

    // THE EVICTION: the still-held cookie no longer resolves a user (the
    // live row's tokenVersion moved past the token's embedded version).
    const after = await page.request.get("/api/auth/me");
    expect(after.status()).toBe(200);
    const afterBody = await after.json();
    expect(afterBody.data).toBeNull();

    // And the consumed token is single-use: a replay answers the
    // invalid-token 400.
    const replay = await page.evaluate(
      async ({ token }) => {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reset_token: token, new_password: "Replayed1234!" }),
        });
        return { status: res.status, body: await res.json() };
      },
      { token },
    );
    expect(replay.status).toBe(400);
    expect(replay.body.error.message).toBe("Invalid or expired reset token");
  });
});
