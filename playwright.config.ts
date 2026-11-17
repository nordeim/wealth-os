import { defineConfig, devices } from "@playwright/test";
import { e2ePort } from "./tests/e2e/e2e-port";

// E2E layer (v2.3): boots the PRODUCTION standalone server on an isolated
// port with its own scratch database (db/e2e.db, schema-pushed + seeded by
// the global setup), then drives the real UI in Chromium.
//
// Prerequisites: `bun run build` (the standalone server must exist).
// Run with: `bun run test:e2e`.
//
// Auth strategy: the "setup" project signs the demo user in ONCE and saves
// the session cookie to tests/e2e/.auth/user.json; every spec in the main
// project starts with that storageState. This is not just speed — the auth
// endpoints are rate-limited per IP/15 min (login 10, signup 10, resend 5,
// verify 20), so per-test logins would trip the limiter mid-suite.
// tests/e2e/auth.spec.ts opts back out with an empty storageState because
// it tests the logged-out surface.
//
// The unit layer stays in Vitest (see vitest.config.ts — it matches
// *.test.ts only, so these *.spec.ts / *.setup.ts files are never picked
// up twice).

const PORT = Number(e2ePort());
const BASE_URL = `http://localhost:${PORT}`;
// Deliberately NOT env-driven (unlike the port above): the e2e database
// is PINNED so a stray DATABASE_URL in the environment can never point
// the suite at the dev db — the isolation is the contract (db-path
// resolves the relative URL against the repo root for the CLI and the
// runtime alike).
const E2E_DATABASE_URL = "file:../db/e2e.db";
const AUTH_STATE = "tests/e2e/.auth/user.json";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1, // one worker: the specs share a single seeded SQLite file
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "setup",
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: "chromium",
      dependencies: ["setup"],
      testIgnore: /auth\.setup\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: AUTH_STATE,
      },
    },
  ],
  globalSetup: "./tests/e2e/global-setup.ts",
  webServer: {
    command: "bun .next/standalone/server.js",
    url: `${BASE_URL}/api/health`,
    timeout: 60_000,
    reuseExistingServer: !process.env.CI,
    // Session-69 (N-69a): the LOCAL-ONLY limiter hazard — a reused
    // server keeps its IN-MEMORY rate buckets alive across runs while
    // global-setup reseeds the DB, so a third run inside 15 minutes can
    // trip resend (6>5) or verify (21>20) and fail the ladder tests
    // with spurious 429s. The gate is immune (its CI=1 prefix forces
    // the fresh boot); for repeated local runs export CI=1 or wait out
    // the window (it heals itself in 15 min).
    env: {
      ...process.env,
      PORT: String(PORT),
      NODE_ENV: "production",
      DATABASE_URL: E2E_DATABASE_URL,
      AUTH_SECRET: "playwright-e2e-session-secret",
      // Session-195 (D-195a3): the in-app delivery kill-switches pinned
      // OFF — a polluted parent shell exporting these would silently
      // hide the OTP/reset payloads the ladder tests assert (the signup
      // code + the reset link), failing e2e with confusing symptoms.
      // Pinning the empty string makes the child server's responses
      // deterministic regardless of shell state (the config's own
      // N-69a "the dev server lies" family — here on the env axis).
      NEO_DISABLE_IN_APP_OTP: "",
      NEO_DISABLE_IN_APP_RESET: "",
    } as Record<string, string>,
  },
});
