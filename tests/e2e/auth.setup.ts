import { expect, test } from "@playwright/test";

// Sign the demo user in ONCE through the real login UI and persist the
// browser storage state for the whole chromium project (the auth
// endpoints are rate-limited per IP/15 min — login 10 / signup 10 /
// resend 5 / verify 20, the per-route budgets — so per-test logins
// would trip the limiter mid-suite).

const STORAGE = "tests/e2e/.auth/user.json";

test("authenticate demo user", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email").fill("sepnetflix2023@outlook.com");
  await page.getByLabel("Password").fill("$Abcd1234");
  await page.getByRole("button", { name: "Sign in" }).click();

  await page.waitForURL("/");
  await expect(page.getByRole("heading", { name: "Financial Dashboard" })).toBeVisible();

  await page.context().storageState({ path: STORAGE });
});
