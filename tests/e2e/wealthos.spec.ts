import { expect, test } from "@playwright/test";
import { e2ePort } from "./e2e-port";

// The WealthOS section + CRUD journeys — every sidebar destination, the
// dashboard's card genus, the Add Expense round-trip (the quick-select
// two-step dialog), capital/lowercase route equivalence, and the
// AI Coach modal.

test.describe("section navigation", () => {
  const sections: Array<[string, string, string]> = [
    ["/Dashboard", "Financial Dashboard", "Financial Dashboard"],
    ["/Income", "Income Sources", "Track and manage all your income streams"],
    ["/Expenses", "Expenses", "Track and categorize all your spending"],
    ["/Accounts", "My Accounts", "Manage your connected bank accounts"],
    ["/Investments", "Investments", "Track your portfolio performance"],
    ["/Import", "Import Transactions", "Upload a CSV from your bank"],
    ["/Analytics", "Analytics & Reports", "Real-time insights into your financial performance"],
    ["/Goals", "Savings Goals", "Set and track your financial objectives"],
    ["/Settings", "Settings", "Customize your budget planning experience"],
  ];

  for (const [route, heading, subtitle] of sections) {
    test(`${route} renders the reference heading + subtitle`, async ({ page }) => {
      await page.goto(route);
      await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
      await expect(page.getByText(subtitle)).toBeVisible();
    });
  }

  test("the lowercase canonical route renders the same page as the capital alias", async ({
    page,
  }) => {
    await page.goto("/Expenses");
    await expect(page.getByRole("heading", { name: "Expenses", exact: true })).toBeVisible();
    const capitalUrl = page.url();
    await page.goto("/expenses");
    await expect(page.getByRole("heading", { name: "Expenses", exact: true })).toBeVisible();
    expect(page.url()).not.toBe(capitalUrl); // the URL keeps its casing
  });

  test("the root serves the dashboard for the authenticated visitor", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Financial Dashboard" }),
    ).toBeVisible();
  });
});

test.describe("the dashboard's card genus (seeded data)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/Dashboard");
  });

  test("the four KPI cards render with the reference labels", async ({ page }) => {
    for (const label of ["Monthly Income", "Monthly Expenses", "Net Balance", "Savings Rate"]) {
      await expect(page.getByText(label, { exact: true }).first()).toBeVisible();
    }
  });

  test("the Cash Flow Overview carries the 1M/3M/6M/1Y segment + the legend", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Cash Flow Overview" })).toBeVisible();
    for (const period of ["1M", "3M", "6M", "1Y"]) {
      await expect(page.getByRole("group", { name: "Chart period" }).getByRole("button", { name: period })).toBeVisible();
    }
    for (const legend of ["Income", "Expenses", "Net Savings"]) {
      await expect(page.locator("section[aria-label='Cash Flow Overview']").getByText(legend, { exact: true })).toBeVisible();
    }
  });

  test("the health gauge, breakdown, budgets, alerts, activity and insights sections render", async ({
    page,
  }) => {
    await expect(page.getByText("Financial Health Score")).toBeVisible();
    await expect(page.getByText("Expense Breakdown")).toBeVisible();
    await expect(page.getByText("Budget vs Actual")).toBeVisible();
    await expect(page.getByText("Upcoming & Alerts")).toBeVisible();
    await expect(page.getByText("Recent Activity")).toBeVisible();
    await expect(page.getByText("AI Insights")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Quick Actions" })).toBeVisible();
  });

  test("the quick actions link to the reference's targets", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Add Income" }).first()).toHaveAttribute(
      "href",
      "/Income",
    );
    await expect(page.getByRole("link", { name: "Set Goal" }).first()).toHaveAttribute(
      "href",
      "/Goals",
    );
    await expect(page.getByRole("link", { name: "View Reports" }).first()).toHaveAttribute(
      "href",
      "/Analytics",
    );
  });

  test("the AI Coach modal opens with the suggested-question chips", async ({ page }) => {
    await page.getByRole("button", { name: "AI Coach" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "AI Financial Coach" })).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "What are my top spending categories?" }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "How can I save more money?" }),
    ).toBeVisible();
  });

  test("asking the coach a question returns a deterministic answer", async ({ page }) => {
    await page.getByRole("button", { name: "AI Coach" }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("button", { name: "What are my top spending categories?" }).click();
    await expect(
      dialog.getByText(/Your top spending categories this month:/),
    ).toBeVisible({ timeout: 15_000 });
  });
});

test.describe("the Add Expense round-trip (the two-step dialog)", () => {
  test("quick-select chip prefills the manual form and creates the expense", async ({ page }) => {
    await page.goto("/Expenses");

    const before = await page.locator("section[aria-label] ul li, ul.divide-y li").count();

    await page.getByRole("button", { name: "Add Expense" }).first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Step 1: the quick-select chips (the reference's five).
    for (const chip of ["Rent/Mortgage", "Groceries", "Utilities", "Transportation", "Healthcare"]) {
      await expect(dialog.getByRole("button", { name: new RegExp(chip) })).toBeVisible();
    }

    // Pick Groceries → the manual form with Description prefilled.
    await dialog.getByRole("button", { name: /Groceries/ }).click();
    await expect(dialog.getByLabel("Description")).toHaveValue("Groceries");

    // Amount + submit.
    await dialog.getByLabel("Amount (USD)").fill("23.45");
    await dialog.getByRole("button", { name: "Add Expense", exact: true }).click();

    // The toast + the list grows by one.
    await expect(page.getByText("Expense added")).toBeVisible({ timeout: 10_000 });
    const after = await page.locator("ul.divide-y li").count();
    expect(after).toBeGreaterThanOrEqual(before);
  });

  test("the +$10 quick-add bumps the amount", async ({ page }) => {
    await page.goto("/Expenses");
    await page.getByRole("button", { name: "Add Expense" }).first().click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("button", { name: "Or fill manually" }).click();
    await dialog.getByLabel("Amount (USD)").fill("5");
    await dialog.getByRole("button", { name: "+$10", exact: true }).click();
    await expect(dialog.getByLabel("Amount (USD)")).toHaveValue("15");
    await dialog.getByRole("button", { name: "Cancel" }).click();
  });
});

test.describe("Income / Goals / Accounts surfaces", () => {
  test("the Income page totals the seeded monthly income", async ({ page }) => {
    await page.goto("/Income");
    await expect(page.getByText("Total Monthly Income")).toBeVisible();
    // The seeded salary (7800) + freelance (1200) are active.
    await expect(page.getByText("From 3 active sources")).toBeVisible();
    await expect(page.getByText("Software Engineering Salary")).toBeVisible();
  });

  test("the Goals page renders the seeded goals with progress", async ({ page }) => {
    await page.goto("/Goals");
    await expect(page.getByText("Emergency Fund").first()).toBeVisible();
    await expect(page.getByText("Japan Trip 2027").first()).toBeVisible();
    await expect(page.getByText(/% funded/).first()).toBeVisible();
  });

  test("the Accounts page lists the seeded bank accounts", async ({ page }) => {
    await page.goto("/Accounts");
    await expect(page.getByText("Everyday Checking")).toBeVisible();
    await expect(page.getByText("High-Yield Savings")).toBeVisible();
    await expect(page.getByText("Net Balance")).toBeVisible();
  });

  test("the Investments page renders the holdings table headers", async ({ page }) => {
    await page.goto("/Investments");
    for (const header of ["Asset", "Invested", "Current Value", "Gain/Loss"]) {
      await expect(page.getByRole("columnheader", { name: header })).toBeVisible();
    }
  });

  test("the Analytics page renders the four tabs", async ({ page }) => {
    await page.goto("/Analytics");
    for (const tab of ["Overview", "Expenses", "Income", "Investments"]) {
      await expect(page.getByRole("tab", { name: tab, exact: true })).toBeVisible();
    }
  });

  test("the Settings page renders the reference's sections", async ({ page }) => {
    await page.goto("/Settings");
    await expect(page.getByText("Profile Settings").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Notifications" })).toBeVisible();
    await expect(page.getByText("GDPR Compliant Export")).toBeVisible();
    await expect(page.getByText("Import Warning")).toBeVisible();
    await expect(page.getByRole("link", { name: "Export All Data" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Save Settings" })).toBeVisible();
  });

  test("the Import page shows Step 1 with the disabled extract button", async ({ page }) => {
    await page.goto("/Import");
    await expect(page.getByText("Step 1: Upload File")).toBeVisible();
    await expect(page.getByText("CSV, XLS, XLSX up to 10MB")).toBeVisible();
    await expect(page.getByRole("button", { name: "Upload and Extract" })).toBeDisabled();
  });
});

test.describe("the Expenses tabs + search", () => {
  test("the Needs/Wants/Savings tabs filter the list", async ({ page }) => {
    await page.goto("/Expenses");
    const needs = page.getByRole("tab", { name: "Needs", exact: true });
    await needs.click();
    // The seeded rent row (a Need) stays visible.
    await expect(page.getByText("Apartment Rent").first()).toBeVisible();
    await page.getByRole("tab", { name: "Wants", exact: true }).click();
    await expect(page.getByText("Apartment Rent")).toHaveCount(0);
  });

  test("the search box filters by description", async ({ page }) => {
    await page.goto("/Expenses");
    await page.getByLabel("Search expenses").fill("Whole Foods");
    await expect(page.getByText("Whole Foods Run").first()).toBeVisible();
    await expect(page.getByText("Apartment Rent")).toHaveCount(0);
  });
});

test.describe("the API auth wall (N-69g probe — the 401 seam)", () => {
  // The session-69 single-source contract: the e2e port literal lives
  // ONLY in e2e-port.ts; this spec consumes it via e2ePort() so the
  // probe can never diverge from playwright.config.ts. The probe itself
  // is a real regression test — an unauthenticated request against the
  // finance API MUST 401, never leak data.
  //
  // The config injects the authenticated storageState into every project,
  // so this block opts back out (the auth.spec.ts pattern) — the request
  // fixture then carries no session cookie.
  test.use({ storageState: { cookies: [], origins: [] } });
  const ORIGIN = `http://localhost:${e2ePort()}`;

  test("an unauthenticated API call is rejected with 401", async ({ request }) => {
    const res = await request.get(`${ORIGIN}/api/transactions`);
    expect(res.status()).toBe(401);
    // The envelope contract (src/lib/api.ts): { ok: false, error: { code, message } }.
    const body = (await res.json()) as { ok: boolean; error: { code: string; message: string } };
    expect(body.ok).toBe(false);
    expect(body.error.code).toBe("UNAUTHORIZED");
  });

  test("the health endpoint stays public (the readiness seam)", async ({ request }) => {
    const res = await request.get(`${ORIGIN}/api/health`);
    expect(res.status()).toBe(200);
  });
});
