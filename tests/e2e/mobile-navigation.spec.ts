import { expect, test } from "@playwright/test";

// The WealthOS mobile drawer — session-199: the reference's OWN
// full-screen gradient drawer (live-extracted: `fixed inset-0 z-40`,
// stone-900→800→900 gradient, pt-20 content, text-lg py-4 items, Sign
// Out at the bottom) under the sticky mobile header (z-50) whose
// hamburger flips to ✕ while open. This suite pins the drawer + the
// kept behavioral supersets (resize-past-lg auto-close, the main-scroller
// lock, the route-change close, Escape).

const SECTIONS = [
  "Dashboard",
  "Income",
  "Expenses",
  "Accounts",
  "Investments",
  "Import",
  "Analytics",
  "Goals",
  "Settings",
];

test.describe("mobile navigation drawer", () => {
  test("hamburger opens the drawer with every nav destination + Sign Out", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/Dashboard");

    // No desktop sidebar at 390px.
    await expect(page.locator("aside").first()).toBeHidden();

    // The mobile header's hamburger (aria-labeled).
    const trigger = page.getByRole("button", { name: "Open navigation menu" });
    await expect(trigger).toBeVisible();
    await trigger.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Every destination is reachable from the drawer.
    for (const label of SECTIONS) {
      await expect(dialog.getByRole("link", { name: label, exact: true })).toBeVisible();
    }
    await expect(dialog.getByRole("button", { name: "Sign Out" })).toBeVisible();
  });

  test("the trigger flips to the close (✕) face while the drawer is open", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/Dashboard");

    const trigger = page.getByRole("button", { name: "Open navigation menu" });
    await trigger.click();
    await expect(
      page.getByRole("button", { name: "Close navigation menu" }),
    ).toBeVisible();
  });

  test("tapping a drawer link navigates (CAPITAL path) and closes the drawer", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/Dashboard");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("link", { name: "Expenses", exact: true }).click();

    // The nav hrefs are the reference's CAPITALIZED paths.
    await page.waitForURL("**/Expenses");
    await expect(page.getByRole("heading", { name: "Expenses" })).toBeVisible();
    // The route-change close (the kept superset).
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("Escape closes the drawer and restores the trigger face", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/Dashboard");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(
      page.getByRole("button", { name: "Open navigation menu" }),
    ).toBeVisible();
  });

  test("opening the drawer moves focus into it (F-217e)", async ({ page }) => {
    // Session-217 (R-14): the sheet renders BEFORE the main column in
    // DOM, so natural Tab order ran under the full-screen overlay.
    // The cure: focus moves into the sheet on open.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/Dashboard");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    // Focus now lives INSIDE the drawer (the first nav link).
    const inDrawer = await page.evaluate(() => {
      const sheet = document.querySelector('[role="dialog"]');
      return !!sheet && sheet.contains(document.activeElement);
    });
    expect(inDrawer).toBe(true);
  });

  test("Tab cycles the modal surface, never the content behind the overlay (F-217e)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/Dashboard");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    // Walk the WHOLE Tab order (header buttons + 9 links + Sign Out +
    // the wrap) — activeElement must never leave the modal surface
    // (the sticky header + the sheet).
    for (let i = 0; i < 14; i++) {
      await page.keyboard.press("Tab");
      const escaped = await page.evaluate(() => {
        const el = document.activeElement;
        const inHeader = !!el?.closest("header");
        const inSheet = !!el?.closest('[role="dialog"]');
        return !(inHeader || inSheet);
      });
      expect(escaped, `Tab #${i + 1} ran under the overlay`).toBe(false);
    }
  });

  test("closing the drawer returns focus to the trigger (F-217e)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/Dashboard");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    // Focus lands back on the hamburger/✕ trigger.
    const onTrigger = await page.evaluate(() => {
      const el = document.activeElement;
      return el instanceof HTMLButtonElement && el.getAttribute("aria-expanded") !== null;
    });
    expect(onTrigger).toBe(true);
  });

  test("the drawer auto-closes when the viewport grows past lg (the kept superset)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/Dashboard");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(page.getByRole("dialog")).toBeHidden();
    // The desktop sidebar takes over.
    await expect(page.locator("aside").first()).toBeVisible();
  });

  test("the moon toggle in the mobile header flips dark mode (persisted)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/Dashboard");

    const moon = page.getByRole("button", { name: "Switch to dark mode" });
    await moon.click();

    await expect(page.locator("html")).toHaveClass(/dark/);
    // The button face swaps to the sun.
    await expect(page.getByRole("button", { name: "Switch to light mode" })).toBeVisible();

    // Persisted across a reload (the localStorage round-trip).
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Back to light.
    await page.getByRole("button", { name: "Switch to light mode" }).click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });

  test("the desktop sidebar is visible at lg and carries the brand + Synced pill", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/Dashboard");

    const sidebar = page.locator("aside").first();
    await expect(sidebar).toBeVisible();
    await expect(sidebar.getByRole("heading", { name: "WealthOS" })).toBeVisible();
    await expect(sidebar.getByText("Premium Finance Suite")).toBeVisible();
    await expect(sidebar.getByText("Synced")).toBeVisible();
    for (const label of SECTIONS) {
      await expect(
        sidebar.getByRole("link", { name: label, exact: true }),
      ).toBeVisible();
    }
  });

  test("the sidebar user menu carries Dark Mode + Sign Out (the reference's two items)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/Dashboard");

    await page.getByRole("button", { name: /sepnetflix2023/ }).click();
    const menu = page.getByRole("menu");
    await expect(menu.getByRole("menuitem", { name: "Dark Mode" })).toBeVisible();
    await expect(menu.getByRole("menuitem", { name: "Sign Out" })).toBeVisible();
  });

  test("Sign Out from the drawer returns to the login wall", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/Dashboard");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await page.getByRole("button", { name: "Sign Out" }).click();

    await page.waitForURL("**/login**");
    await expect(page.getByRole("heading", { name: "Welcome to WealthOS" })).toBeVisible();
  });
});
