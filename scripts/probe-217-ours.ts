// Session-217 OUR-APP probe: the "before" evidence for the dark-mode
// cluster (F-217c-1/2/9: dialog panel, select listbox, user-menu resting
// ink, toast face, outline/ghost buttons) + the live M-1 repro (the
// Expenses filters popover closes on Select-option pointerdown — the
// category filter unreachable by mouse).
import { chromium, type Page } from "@playwright/test";

if (!process.argv[1]?.endsWith("probe-217-ours.ts")) process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

async function login(page: Page) {
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(1500);
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const report: string[] = [];
  await login(page);

  // force dark
  await page.evaluate(() => {
    localStorage.setItem("wealthos-theme", "dark");
  });
  await page.goto(`${BASE}/dashboard`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  report.push(`htmlClass=${await page.evaluate(() => document.documentElement.className)}`);
  report.push(`body color=${await page.evaluate(() => getComputedStyle(document.body).color)}`);

  // 1. dialog in dark (Accounts → Add Account)
  await page.goto(`${BASE}/accounts`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const addBtn = page.locator("button", { hasText: /add (your first )?account/i }).first();
  if (await addBtn.count()) {
    await addBtn.click();
    await page.waitForTimeout(800);
    const dlg = await page.evaluate(() => {
      const d = document.querySelector('[role="dialog"]');
      if (!d) return { found: false };
      const cs = getComputedStyle(d);
      const h = d.querySelector("h2,h3");
      const lab = d.querySelector("label");
      return {
        found: true,
        bg: cs.backgroundColor,
        border: cs.borderColor,
        heading: h?.textContent?.trim().slice(0, 20) ?? null,
        headingColor: h ? getComputedStyle(h).color : null,
        labelColor: lab ? getComputedStyle(lab).color : null,
      };
    });
    report.push(`OUR dialog dark: ${JSON.stringify(dlg)}`);
    await page.screenshot({ path: "/home/z/my-project/scripts/our-dark-dialog-before.png" });
    await page.keyboard.press("Escape");
  }

  // 2. the user-menu resting ink in dark
  await page.locator("header button:has(svg)").first().click().catch(() => {});
  // desktop: the sidebar avatar menu
  const avatar = page.locator("aside button, header button").filter({ hasText: /sepnetflix/i }).first();
  if (await avatar.count()) await avatar.click().catch(() => {});
  await page.waitForTimeout(700);
  const menu = await page.evaluate(() =>
    [...document.querySelectorAll('[role="menuitem"]')].map((it) => ({
      text: (it.textContent ?? "").trim().slice(0, 18),
      color: getComputedStyle(it).color,
    })),
  );
  report.push(`OUR user menu dark: ${JSON.stringify(menu)}`);

  // 3. M-1 LIVE REPRO (light mode is fine for this): Expenses filters
  //    popover → open the Category select → click an option by MOUSE.
  await page.evaluate(() => localStorage.setItem("wealthos-theme", "light"));
  await page.goto(`${BASE}/expenses`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const filterBtn = page.locator('button[aria-label="Expense filters"], button:has(svg)').filter({ hasText: /filter/i }).first();
  const anyFilter = page.locator("button", { hasText: /filter/i }).first();
  const trigger = (await filterBtn.count()) ? filterBtn : anyFilter;
  await trigger.click();
  await page.waitForTimeout(700);
  // the Select inside the popover
  const selectTrigger = page.locator('[aria-label="Expense filters"] [role="combobox"], [aria-label="Expense filters"] button').first();
  if (await selectTrigger.count()) {
    await selectTrigger.click();
    await page.waitForTimeout(700);
    const opt = page.locator('[role="option"]').nth(2);
    const optText = (await opt.count()) ? await opt.textContent() : null;
    if (optText) {
      await opt.click(); // MOUSE click on the portaled option
      await page.waitForTimeout(700);
      const stillOpen = await page.evaluate(() => {
        const pop = document.querySelector('[aria-label="Expense filters"]');
        const stillMounted = !!pop;
        const sel = document.querySelector('[role="combobox"]');
        return { stillMounted, selectValue: sel?.textContent?.trim().slice(0, 24) ?? null };
      });
      report.push(`M-1 REPRO: clicked option "${optText.trim()}" → popover still mounted=${stillOpen.stillMounted}, select now="${stillOpen.selectValue}"`);
      await page.screenshot({ path: "/home/z/my-project/scripts/m1-popover-after-click.png" });
    } else {
      report.push("M-1 REPRO: no options rendered");
    }
  } else {
    report.push(`M-1 REPRO: no select trigger inside popover (filterBtn=${await trigger.textContent()})`);
  }

  console.log(report.join("\n"));
  await browser.close();
}

main().catch((e) => { console.error("PROBE FAILED:", e); process.exit(1); });
