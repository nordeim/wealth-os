"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleAlert, Lock } from "lucide-react";

import { LOGIN_LAYOUT } from "@/lib/page-layout";

/**
 * ResetPasswordScreen — session-163 (the digma S46/RA-65/RA-66 port): the
 * /reset-password landing card. Two states keyed on the ?token= query
 * param: only a NON-EMPTY token opens the "Set new password" form; a
 * missing, empty, or differently-named param renders the "Invalid reset
 * link" card. The submit's invalid/expired/consumed token answers 400
 * "Invalid or expired reset token" rendered as the inline destructive
 * alert; the mismatch guard ("Passwords do not match") blocks the submit
 * client-side (the signup view's own family). Success renders the
 * confirmation card and returns to /login — NO session opens (the user
 * signs in with the new password).
 *
 * Class vocabulary: the login card's own families (LOGIN_LAYOUT) — the
 * same borderless glass card, the 44px→48px slate inputs, the
 * slate-900 submit — so the reset surface reads as one design system
 * with the login/signup cards.
 */
export function ResetPasswordScreen() {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [done, setDone] = React.useState(false);

  async function onResetSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (pending) return;
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reset_token: token, new_password: password }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.ok) {
        setError(body?.error?.message ?? "Invalid or expired reset token");
        return;
      }
      setDone(true);
    } catch {
      setError("Network error — check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  // The invalid-link state: a missing, empty, or differently-named param.
  if (!token) {
    return (
      <div className="w-full max-w-md">
        <div className={LOGIN_LAYOUT.card}>
          <div className={LOGIN_LAYOUT.accent} aria-hidden="true" />
          <div className={LOGIN_LAYOUT.inner}>
            <div className={LOGIN_LAYOUT.centered}>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
                  <CircleAlert className="h-5 w-5 text-red-600" aria-hidden="true" />
                </div>
                <h1 className={LOGIN_LAYOUT.title}>Invalid reset link</h1>
                <p className={LOGIN_LAYOUT.subtitle}>
                  This password reset link is invalid or has expired.
                </p>
                <button
                  type="button"
                  className={LOGIN_LAYOUT.submit}
                  onClick={() => router.push("/login")}
                >
                  Back to login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className={LOGIN_LAYOUT.card}>
        <div className={LOGIN_LAYOUT.accent} aria-hidden="true" />
        <div className={LOGIN_LAYOUT.inner}>
          <div className={LOGIN_LAYOUT.centered}>
            {done ? (
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                  <Lock className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                </div>
                <h1 className={LOGIN_LAYOUT.title}>Password reset</h1>
                <p className={LOGIN_LAYOUT.subtitle}>
                  Your password has been reset successfully. Sign in with your new password.
                </p>
                <button
                  type="button"
                  className={LOGIN_LAYOUT.submit}
                  onClick={() => router.push("/login")}
                >
                  Back to login
                </button>
              </div>
            ) : (
              <form onSubmit={onResetSubmit} className={LOGIN_LAYOUT.form} noValidate>
                <div className="space-y-2 sm:space-y-3">
                  <h1 className={LOGIN_LAYOUT.title}>Set new password</h1>
                  <p className={LOGIN_LAYOUT.subtitle}>Enter your new password for WealthOS</p>
                </div>

                <div className={LOGIN_LAYOUT.fields}>
                  <div className={LOGIN_LAYOUT.field}>
                    <label htmlFor="password" className={LOGIN_LAYOUT.label}>
                      New password
                    </label>
                    <div className={LOGIN_LAYOUT.inputWrap}>
                      <Lock className={LOGIN_LAYOUT.inputIcon} aria-hidden="true" />
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength={8}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={LOGIN_LAYOUT.input}
                      />
                    </div>
                    <p className="text-sm text-slate-500">Must be at least 8 characters</p>
                  </div>
                  <div className={LOGIN_LAYOUT.field}>
                    <label htmlFor="confirmPassword" className={LOGIN_LAYOUT.label}>
                      Confirm password
                    </label>
                    <div className={LOGIN_LAYOUT.inputWrap}>
                      <Lock className={LOGIN_LAYOUT.inputIcon} aria-hidden="true" />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength={8}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={LOGIN_LAYOUT.input}
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50/70 px-4 py-3 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}

                <button type="submit" disabled={pending} className={LOGIN_LAYOUT.submit}>
                  {pending ? "Please wait…" : "Reset password"}
                </button>

                <button
                  type="button"
                  /* Session-223 (R-20, F-223h): the amber ring genus —
                     the last bare back on the auth faces joins the
                     F-222g family (rounded-md so the ring renders). */
                  className="w-full rounded-md text-sm text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
                  onClick={() => router.push("/login")}
                >
                  Back to login
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
