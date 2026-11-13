import { expect, test } from "@playwright/test";
import { e2ePort } from "./e2e-port";

// The WealthOS section + CRUD journeys — every sidebar destination, the
// dashboard's card genus, the Add Expense round-trip (the quick-select
// two-step dialog), capital/lowercase route equivalence, and the
// AI Coach modal.

const BASE = `http://localhost:${e2ePort()}`;

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

  // Session-219 (R-16, F-219c): the reference's authenticated shell
  // renders DARK for fresh visitors (live-measured: html.dark, body
  // #0a0a0a, no localStorage theme key — the app's own default). The
  // storageState carries cookies only, so this context IS the fresh
  // visitor: no stored choice, the no-FOUC bootstrap's app-route
  // default applies.
  test("the fresh visitor's Dashboard renders DARK by default (F-219c)", async ({ page }) => {
    await page.goto("/Dashboard");
    await expect(page.locator("html")).toHaveClass(/dark/);
    // The SHELL root carries the visible wash (`dark:bg-[#0e1310]` —
    // page-layout.ts:7); the body's bg-background token never flips (the
    // auth faces' light mechanism, F-219t).
    const shellBg = await page.evaluate(() => {
      const shell = document.querySelector(".page-wash") ?? document.body;
      return getComputedStyle(shell).backgroundColor;
    });
    expect(shellBg).toBe("rgb(14, 19, 16)"); // #0e1310 — the dark wash
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

  test("the Cash Flow Overview carries the 1M/3M/6M/1Y segment — and NO legend row (the reference renders none)", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Cash Flow Overview" })).toBeVisible();
    for (const period of ["1M", "3M", "6M", "1Y"]) {
      await expect(page.getByRole("group", { name: "Chart period" }).getByRole("button", { name: period })).toBeVisible();
    }
    // Session-208 (F-208b): the custom dot-marker legend row is REMOVED —
    // the reference's Cash Flow card renders no legend (the tooltip
    // carries it); "Net Savings" existed ONLY in our retired chip row.
    const section = page.locator("section[aria-label='Cash Flow Overview']");
    await expect(section.getByText("Net Savings", { exact: true })).toHaveCount(0);
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

    // Session-232 (R-29, F-232c): the step swaps land focus on the new
    // view's primary control (the F-231b genus on the dialog surface) —
    // quick→form the description input, form→quick the Quick Select
    // heading. Pre-cure, focus fell to the dialog container on both
    // swaps (Radix's FocusScope recovery) with no announcement.
    await dialog.getByRole("button", { name: "Back to Quick Select" }).click();
    await expect(dialog.getByRole("heading", { name: "Quick Select Category" })).toBeFocused();
    await dialog.getByRole("button", { name: "Or fill manually" }).click();
    await expect(dialog.getByLabel("Description")).toBeFocused();
    await dialog.getByRole("button", { name: "Cancel" }).click();
  });
});

test.describe("Income / Goals / Accounts surfaces", () => {
  test("the Income page totals the seeded monthly income", async ({ page }) => {
    await page.goto("/Income");
    await expect(page.getByText("Total Monthly Income")).toBeVisible();
    // The seeded salary (7800) + freelance (1200) are active.
    // (.first(): the F-226k row-context sr-only spans now also carry the
    // source names inside the row's Edit/Pause buttons.)
    await expect(page.getByText("From 3 active sources")).toBeVisible();
    await expect(page.getByText("Software Engineering Salary").first()).toBeVisible();
  });

  test("the Goals page renders the seeded goals with progress", async ({ page }) => {
    await page.goto("/Goals");
    await expect(page.getByText("Emergency Fund").first()).toBeVisible();
    await expect(page.getByText("Japan Trip 2027").first()).toBeVisible();
    await expect(page.getByText(/% funded/).first()).toBeVisible();
  });

  test("the Accounts page lists the seeded bank accounts", async ({ page }) => {
    await page.goto("/Accounts");
    // (.first(): the F-226k row-context sr-only spans, same as Income.)
    await expect(page.getByText("Everyday Checking").first()).toBeVisible();
    await expect(page.getByText("High-Yield Savings").first()).toBeVisible();
    await expect(page.getByText("Net Balance")).toBeVisible();
  });

  test("the Investments page renders the holdings table headers", async ({ page }) => {
    await page.goto("/Investments");
    for (const header of ["Asset", "Invested", "Current Value", "Gain/Loss"]) {
      await expect(page.getByRole("columnheader", { name: header })).toBeVisible();
    }
  });

  // Session-227 (R-24, F-227b): two same-symbol lots are normal portfolio
  // state; the table's row actions must resolve their target by ID. Born
  // RED on the pre-cure tree (the symbol-keyed form opened the FIRST
  // lot's record from the SECOND lot's row — live-reproduced).
  test("two same-symbol holdings keep their identities — Edit on the second prefills the SECOND record (F-227b)", async ({ page }) => {
    const lot = (name: string) => ({
      symbol: "DUPL",
      name,
      type: "stock",
      shares: 10,
      avgCost: 100,
      currentValue: 110,
    });
    const first = await page.request.post("/api/investments", { data: lot("First Duplicate Lot") });
    const second = await page.request.post("/api/investments", { data: lot("Second Duplicate Lot") });
    expect(first.ok()).toBe(true);
    expect(second.ok()).toBe(true);
    const firstId = ((await first.json()) as { data: { id: string } }).data.id;
    const secondId = ((await second.json()) as { data: { id: string } }).data.id;

    try {
      await page.goto("/Investments");
      const secondRow = page.getByRole("row", { name: /Second Duplicate Lot/ });
      await expect(secondRow).toBeVisible();
      await secondRow.getByRole("button", { name: /^Edit/ }).click();
      // The dialog prefills the SECOND lot's own record (pre-cure: the
      // first-match symbol find opened "First Duplicate Lot").
      await expect(page.getByLabel("Name")).toHaveValue("Second Duplicate Lot");
      await page.keyboard.press("Escape");
    } finally {
      await page.request.delete(`/api/investments/${firstId}`);
      await page.request.delete(`/api/investments/${secondId}`);
    }
  });

  // Session-228 (R-25, F-228a): the second holdings surface — the
  // Analytics chart rides the per-symbol gain fold. Born RED on the
  // pre-cure tree (8 bar rectangles — the two same-symbol lots overlap
  // at one category); the folded form renders ONE bar per symbol:
  // the 6 seeded symbols + the shared FOLD symbol = 7.
  test("two same-symbol holdings render ONE aggregated bar on the Analytics chart (F-228a)", async ({ page }) => {
    const lot = (name: string) => ({
      symbol: "FOLD",
      name,
      type: "stock",
      shares: 10,
      avgCost: 100,
      currentValue: 110,
    });
    const first = await page.request.post("/api/investments", { data: lot("First Fold Lot") });
    const second = await page.request.post("/api/investments", { data: lot("Second Fold Lot") });
    expect(first.ok()).toBe(true);
    expect(second.ok()).toBe(true);
    const firstId = ((await first.json()) as { data: { id: string } }).data.id;
    const secondId = ((await second.json()) as { data: { id: string } }).data.id;

    try {
      await page.goto("/Analytics");
      await page.getByRole("tab", { name: "Investments", exact: true }).click();
      // The seeded corpus carries 6 distinct symbols; two FOLD lots fold
      // to one bar — pre-cure the chart rendered 8 overlapping bars.
      await expect(page.locator(".recharts-bar-rectangle")).toHaveCount(7);
    } finally {
      await page.request.delete(`/api/investments/${firstId}`);
      await page.request.delete(`/api/investments/${secondId}`);
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

  test("the filters popover closes on Escape (F-216i)", async ({ page }) => {
    // Session-216 (R-13): every other transient surface (the drawer,
    // the dialogs, the dropdowns) closes on Escape — the filters
    // popover was the one that did not; keyboard users had to tab
    // back to the ✕. The cure: Escape + pointerdown-outside.
    await page.goto("/Expenses");
    await page.getByRole("button", { name: /Filters/ }).click();
    await expect(page.getByRole("group", { name: "Expense filters" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("group", { name: "Expense filters" })).toHaveCount(0);
  });

  test("a mouse pick on the portaled Select option applies the filter (F-217a)", async ({ page }) => {
    // Session-217 (R-14): the F-216i outside-close guard fired on the
    // Category Select's PORTALED options (they live in document.body,
    // outside the popover group) — the popover unmounted mid-pick and
    // the filter never applied for mouse users (live-reproduced).
    // The cure: the guard spares the Radix portal surfaces.
    await page.goto("/Expenses");
    await page.getByRole("button", { name: /Filters/ }).click();
    const popover = page.getByRole("group", { name: "Expense filters" });
    await expect(popover).toBeVisible();
    await page.locator("#expense-category-filter").click();
    await page.getByRole("option", { name: /Groceries/ }).click();
    // The popover SURVIVES the pick and the filter APPLIES — the
    // history count collapses to the seeded Groceries rows.
    await expect(popover).toBeVisible();
    await expect(page.locator("#expense-category-filter")).toContainText(/Groceries/);
    // Close cleanly and assert the list is filtered.
    await page.getByRole("button", { name: "Close filters" }).click();
    await expect(popover).toHaveCount(0);
    await expect(page.getByText("Whole Foods Run").first()).toBeVisible();
    await expect(page.getByText("Apartment Rent")).toHaveCount(0);
  });

  test("outside pointerdown still closes the popover (the F-216i contract kept)", async ({ page }) => {
    await page.goto("/Expenses");
    await page.getByRole("button", { name: /Filters/ }).click();
    const popover = page.getByRole("group", { name: "Expense filters" });
    await expect(popover).toBeVisible();
    // A pointerdown on the page HEADING (outside the popover, not a
    // portal surface, not an expanded trigger) closes it.
    await page.getByRole("heading", { name: /Expenses/ }).first().click();
    await expect(popover).toHaveCount(0);
  });

  test("the DARK-mode Select highlight stays readable (F-221b — the 1.18:1 wash)", async ({ page }) => {
    // Session-221 (R-18): the SelectItem's focus wash carried no dark
    // arms — the highlighted option computed neutral-900 rgb(23,23,23)
    // on line-soft's #262626 dark flip = 1.18:1 (live-verified on this
    // exact combobox), unreadable for keyboard AND mouse in the
    // fresh-visitor default mode. The cure: the MENU_ITEM precedent's
    // dark arms. This leg asserts the highlighted option's computed
    // INK differs from the pre-cure near-black wash.
    await page.addInitScript(() => {
      try {
        localStorage.setItem("wealthos-theme", "dark");
      } catch {
        /* the storage sandbox */
      }
    });
    await page.goto("/Expenses");
    await page.getByRole("button", { name: /Filters/ }).click();
    await expect(page.getByRole("group", { name: "Expense filters" })).toBeVisible();
    await page.locator("#expense-category-filter").click();
    const option = page.getByRole("option").first();
    await expect(option).toBeVisible();
    await page.keyboard.press("ArrowDown");
    const highlighted = page.getByRole("option").nth(1);
    await expect(highlighted).toBeFocused();
    const ink = await highlighted.evaluate((el) => getComputedStyle(el).color);
    // The pre-cure wash computed rgb(23, 23, 23) (neutral-900); the
    // cure's dark arm computes stone-100 rgb(245, 245, 244).
    expect(ink).toBe("rgb(245, 245, 244)");
  });

  test("the filters TRIGGER toggles the popover closed (F-218b — the R-14 regression's own face)", async ({ page }) => {
    // Session-218 (R-15): the R-14 popover cure removed the bare
    // button[aria-expanded] outside-close guard without landing the
    // trigger-scoped replacement its comment claimed — pointerdown on
    // the toggle fired setFiltersOpen(false), the effect detached, and
    // the subsequent click toggled false→true: the popover flicker-
    // reopened (live-reproduced — every mouse user clicking the primary
    // toggle to dismiss found it dead). The cure: the trigger's own
    // pointerdown never closes; the click alone toggles.
    await page.goto("/Expenses");
    const trigger = page.getByRole("button", { name: /^Filters/ });
    await trigger.click();
    const popover = page.getByRole("group", { name: "Expense filters" });
    await expect(popover).toBeVisible();
    await trigger.click();
    await expect(popover).toHaveCount(0);
    // And it reopens cleanly (the toggle is a real toggle).
    await trigger.click();
    await expect(popover).toBeVisible();
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

// Session-222 (R-19, F-222n): the per-account login bucket's behavioral
// leg. The default proxy posture (unset NEO_PROXY_HOPS = depth 1) keys
// clientKey on client-suppliable XFF — rotating the header hands every
// attempt a fresh per-IP bucket, the exact direct-exposure void the
// finding describes. The email-keyed secondary bucket (30/15min, fired
// after the Zod parse and before any account-existence check) bounds
// the attack where the IP cap cannot — and returns the SAME 429 for
// known and unknown emails (no enumeration oracle).
test.describe("the per-account login bucket (F-222n — the rotating-header bound)", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  const ORIGIN = `http://localhost:${e2ePort()}`;

  test("31 rotating-XFF attempts on one email: the IP buckets never fire, the account bucket caps the 31st", async ({ request }) => {
    const statuses: number[] = [];
    for (let i = 0; i < 31; i++) {
      const res = await request.post(`${ORIGIN}/api/auth/login`, {
        headers: { "x-forwarded-for": `198.51.100.${i}` },
        data: {
          email: "acct-bucket-probe@example.com",
          password: "wrong-password-probe",
        },
      });
      statuses.push(res.status());
    }
    // Attempts 1..30 pass both buckets (401 — the timing-equalized
    // unknown-email miss); the 31st trips the per-account 429 while
    // every per-IP bucket has seen exactly one request.
    expect(statuses.filter((s) => s === 401)).toHaveLength(30);
    expect(statuses[30]).toBe(429);
    const body = (await request
      .post(`${ORIGIN}/api/auth/login`, {
        headers: { "x-forwarded-for": "198.51.100.250" },
        data: {
          email: "acct-bucket-probe@example.com",
          password: "wrong-password-probe",
        },
      })
      .then((r) => r.json())) as { ok: boolean; error: { code: string } };
    expect(body.ok).toBe(false);
    expect(body.error.code).toBe("RATE_LIMITED");
  });
});

// Session-225 (R-22, F-225c): the F-222n email-keyed mirror extended
// to verify/resend. The e2e legs ride rotating XFF exactly as the
// F-222n leg does (per-IP caps never fire); the buckets are keyed on
// the submitted email, fired after the Zod parse and before any
// account-existence check — sized above the IP caps so single-IP
// flows are unchanged.
test.describe("the per-account verify/resend buckets (F-225c — the F-222n mirror)", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  const ORIGIN = `http://localhost:${e2ePort()}`;

  test("61 rotating-XFF verify probes on one email: the IP buckets never fire, the account bucket caps the 61st", async ({ request }) => {
    // A no-pending account (signed up, never verified): every probe
    // answers the F-224b first-rung reply — no ladder progression,
    // no lockout interference with the bucket's assertions.
    const email = `verify-acct-${Date.now()}@example.com`;
    await request.post(`${ORIGIN}/api/auth/signup`, {
      data: { email, password: "TestPass123" },
    });
    const codes: string[] = [];
    for (let i = 0; i < 61; i++) {
      const res = await request.post(`${ORIGIN}/api/auth/verify`, {
        headers: { "x-forwarded-for": `198.51.100.${i}` },
        data: { email, code: "000000" },
      });
      codes.push(String(res.status()));
    }
    // Attempts 1..60 pass the per-IP caps (400 first-rung replies);
    // the 61st trips the per-account 429 while every per-IP bucket
    // has seen exactly one request.
    expect(codes.filter((c) => c === "400")).toHaveLength(60);
    expect(codes[60]).toBe("429");
    const body = (await request
      .post(`${ORIGIN}/api/auth/verify`, {
        headers: { "x-forwarded-for": "198.51.100.250" },
        data: { email, code: "000000" },
      })
      .then((r) => r.json())) as { ok: boolean; error: { code: string } };
    expect(body.ok).toBe(false);
    expect(body.error.code).toBe("RATE_LIMITED");
  });

  test("11 rotating-XFF resends on one email: the IP buckets never fire, the account bucket caps the 11th", async ({ request }) => {
    const email = `resend-acct-${Date.now()}@example.com`;
    await request.post(`${ORIGIN}/api/auth/signup`, {
      data: { email, password: "TestPass123" },
    });
    const statuses: number[] = [];
    for (let i = 0; i < 11; i++) {
      const res = await request.post(`${ORIGIN}/api/auth/resend`, {
        headers: { "x-forwarded-for": `198.51.100.${i}` },
        data: { email },
      });
      statuses.push(res.status());
    }
    // Attempts 1..10 pass the per-IP caps (200 + a fresh in-app code);
    // the 11th trips the per-account 429.
    expect(statuses.filter((s) => s === 200)).toHaveLength(10);
    expect(statuses[10]).toBe(429);
  });
});

// Session-225 (R-22, F-225h): the route-level search strip pin — the
// end-to-end seam the sanitizer-only pin cannot see. A literal "%"
// query is stripped to the empty string and the route's length gate
// answers an empty result for every family (never every row); a real
// term finds the seeded corpus. Rides the injected session.
test.describe("the search LIKE strip, end-to-end (F-225h)", () => {
  const ORIGIN = `http://localhost:${e2ePort()}`;

  test('q="%" returns every family empty; q="Whole" finds the seeded corpus', async ({ request }) => {
    const pct = (await request.get(`${ORIGIN}/api/search?q=%`).then((r) => r.json())) as {
      data: { transactions?: unknown[]; incomeSources?: unknown[]; bankAccounts?: unknown[]; investments?: unknown[] };
    };
    expect(pct.data.transactions ?? []).toHaveLength(0);
    expect(pct.data.incomeSources ?? []).toHaveLength(0);
    expect(pct.data.bankAccounts ?? []).toHaveLength(0);
    expect(pct.data.investments ?? []).toHaveLength(0);

    const real = (await request.get(`${ORIGIN}/api/search?q=Whole`).then((r) => r.json())) as {
      data: { transactions?: { description?: string }[] };
    };
    expect((real.data.transactions ?? []).some((t) => /Whole Foods/i.test(t.description ?? ""))).toBe(true);
  });
});

// Session-226 (R-23, F-226b): the per-casing metadata — the lowercase
// section routes used to inherit the ROOT head (title "WealthOS",
// canonical "/") while the reference serves per-casing canonicals at
// BOTH casings (its own route-case posture, live-verified). The eight
// lowercase segments now carry pass-through layouts exporting
// pageMetadata at their own route; /Dashboard keeps the ROOT head (the
// reference's own posture). This leg pins the delivered titles.
test.describe("the per-casing route metadata (F-226b)", () => {
  const SECTIONS: Array<[string, string]> = [
    ["income", "Income"],
    ["expenses", "Expenses"],
    ["accounts", "Accounts"],
    ["investments", "Investments"],
    ["import", "Import"],
    ["analytics", "Analytics"],
    ["goals", "Goals"],
    ["settings", "Settings"],
  ];

  for (const [dir, page] of SECTIONS) {
    test(`/${dir} serves its own head ("${page} | WealthOS", not the root title)`, async ({ page: p }) => {
      await p.goto(`/${dir}`);
      await expect(p).toHaveTitle(`${page} | WealthOS`);
      // The canonical link self-canonicalizes to the lowercase route
      // (the reference's per-casing posture) — never "/".
      const canonical = await p.evaluate(
        () => document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
      );
      expect(canonical).toContain(`/${dir}`);
      expect(canonical.endsWith(`/${dir}`)).toBe(true);
    });
  }

  test("/Dashboard keeps the ROOT head (the reference's own posture — the bare title)", async ({ page: p }) => {
    await p.goto("/Dashboard");
    await expect(p).toHaveTitle("WealthOS");
  });
});

// Session-229 (R-26, F-229a — the Income tab's empty-state repair): the
// F-219r gate read `incomeTrend.length === 0`, but categoryTrend
// unconditionally returns one zero point per month — the empty state was
// structurally unreachable and a zero-income viewer saw a flat all-zero
// chart. This leg drives the REAL zero-income state on the demo session:
// a from/to range BEFORE the seeded corpus's first row (the seed never
// writes the past beyond six months) empties the range domain the gate
// reads. No scratch signup — the battery's signup budget sits exactly at
// its documented 10/15min cap (the F-223k login-budget lesson applies to
// signups; the two ORIGIN-template signups in this file + auth.spec's
// five + multi-user's + data-import's = 10).
test.describe("the Analytics Income tab empty state (F-229a)", () => {
  test("a zero-income range shows the empty state, not a flat chart", async ({ page }) => {
    await page.goto("/Analytics");
    await expect(page.getByRole("heading", { name: "Analytics & Reports", exact: true })).toBeVisible();
    // A range entirely before the corpus — no rows, income or otherwise.
    await page.getByLabel("From date").fill("2024-01-01");
    await page.getByLabel("To date").fill("2024-03-31");
    await page.getByRole("tab", { name: "Income" }).click();
    // Post-cure: the income-presence gate renders the informative
    // empty state. Pre-cure: the always-n-points chart rendered and
    // this assertion failed (born RED on the pre-cure tree).
    const incomeCard = page.locator("section").filter({ hasText: "Income Trend" }).first();
    await expect(incomeCard.getByText("No income in range")).toBeVisible();
    // And no recharts surface rides the card — the EmptyState's own
    // icon svg is fine; a flat all-zero area chart is not.
    await expect(incomeCard.locator("svg.recharts-surface")).toHaveCount(0);
  });
});

// Session-236 (R-33, F-236a): the empty-put 400, end-to-end. The
// five [id] PUT routes' update schemas are all-optional (three-state
// semantics); a body with no known fields parsed to {} and Prisma
// short-circuits updateMany({ data: {} }) to count 0 — the route
// answered 404 for an existing, OWNED row. The no-fields refine makes
// it the honest 400. This probe was born RED against the pre-cure
// tree (the 404 answered).
test.describe("the empty-put 400 (F-236a — the no-fields guard)", () => {
  test("a PUT with no known fields answers 400, never 404 on an existing row", async ({ request }) => {
    // An existing, owned row through the authenticated list.
    const list = await request.get("/api/transactions");
    const body = await list.json();
    expect(body.ok).toBe(true);
    const id = body.data?.[0]?.id;
    expect(id).toBeTruthy();

    const res = await request.put(`/api/transactions/${id}`, { data: {} });
    expect(res.status()).toBe(400);
    const parsed = await res.json();
    expect(parsed.ok).toBe(false);
    expect(parsed.error?.message).toBe("No fields to update");

    // A body of ONLY unknown keys is the same no-fields update (zod
    // strips them ahead of the refine).
    const unknownOnly = await request.put(`/api/transactions/${id}`, {
      data: { nonsense: true },
    });
    expect(unknownOnly.status()).toBe(400);
  });
});

// Session-236 (R-33, F-236f): the mid-flight revocation face. The
// (app) layout's server gate PASSED (the cookie is valid at request
// time); the client hydrate's /api/dashboard leg answers UNAUTHORIZED
// (a tokenVersion bumped in another tab, or the TTL crossed). The
// shell's post-hydrate null-user gate re-establishes the login wall
// client-side — the guest-wall face with the from_url round-trip.
// The route interception is the deterministic trigger (the bump
// window itself cannot be raced reliably).
test.describe("the mid-flight revocation face (F-236f)", () => {
  test("a hydrate that answers UNAUTHORIZED renders the login wall, not an empty workspace", async ({ page }) => {
    await page.route("**/api/dashboard", (route) =>
      route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({
          ok: false,
          error: { code: "UNAUTHORIZED", message: "Sign in required" },
        }),
      }),
    );
    await page.goto("/dashboard");
    // The guest-wall face (F-235j's status surface, re-used by the gate).
    await expect(page.getByText("Redirecting to sign in…")).toBeVisible({ timeout: 10_000 });
    // The from_url round-trip: the redirect carries the current URL.
    await page.waitForURL(/\/login\?from_url=/, { timeout: 10_000 });
    await page.unroute("**/api/dashboard");
  });
});
