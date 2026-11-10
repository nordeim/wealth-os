// Session-217 reference probe, leg 2: the dialog family in dark mode.
// Leg 1 proved the reference defaults dark (html.dark, body #0a0a0a/#fafafa)
// and its Select listbox flips dark. Now: open each section's Add dialog and
// read the panel/title/label computed styles + capture screenshots.
import { chromium, type Page } from "@playwright/test";

if (!process.argv[1]?.endsWith("probe-217-reference2.ts")) process.exit(0);

const BASE = process.env.REF_URL ?? "https://wealth-os-d93bd04e.base44.app";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

async function login(page: Page) {
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2000);
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 45000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(2500);
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const report: string[] = [];
  await login(page);
  report.push(`landed: ${page.url()} htmlClass=${await page.evaluate(() => document.documentElement.className)}`);

  // dump the buttons on /Accounts to find the Add trigger
  await page.goto(`${BASE}/Accounts`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2000);
  const buttons = await page.evaluate(() =>
    [...document.querySelectorAll("button")].map((b) => ({
      text: (b.textContent ?? "").trim().slice(0, 30),
      label: b.getAttribute("aria-label")?.slice(0, 30) ?? "",
      expanded: b.getAttribute("aria-expanded"),
    })).filter((b) => b.text || b.label),
  );
  report.push(`ACCOUNTS buttons: ${JSON.stringify(buttons).slice(0, 1200)}`);

  // try clicking a button whose text mentions Add/New/Account
  const add = page.locator('button', { hasText: /^(add|new|create)|add (a )?(new )?account|new account/i }).first();
  if (await add.count()) {
    await add.click();
    await page.waitForTimeout(1500);
    const dlg = await page.evaluate(() => {
      const d = document.querySelector('[role="dialog"], [data-state="open"].fixed, .fixed.inset-0');
      const anyFixed = [...document.querySelectorAll("body > *")].filter(
        (el) => getComputedStyle(el).position === "fixed",
      );
      const target = d ?? anyFixed[anyFixed.length - 1];
      if (!target) return { found: false, fixedCount: anyFixed.length };
      const cs = getComputedStyle(target);
      const h = target.querySelector("h1,h2,h3,h4");
      const lab = target.querySelector("label");
      return {
        found: true,
        tag: target.tagName,
        role: target.getAttribute("role"),
        bg: cs.backgroundColor,
        border: cs.borderColor,
        heading: h?.textContent?.trim().slice(0, 24) ?? null,
        headingColor: h ? getComputedStyle(h).color : null,
        labelColor: lab ? getComputedStyle(lab).color : null,
        fixedCount: anyFixed.length,
      };
    });
    report.push(`ACCOUNTS dialog: ${JSON.stringify(dlg)}`);
    await page.screenshot({ path: "/home/z/my-project/scripts/ref-dark-dialog.png" });
    report.push("shot: scripts/ref-dark-dialog.png");
    await page.keyboard.press("Escape");
  } else {
    report.push("no add button matched");
  }

  // The sidebar user-menu (avatar dropdown) resting colors in dark
  const avatar = page.locator('button:has(img), [data-avatar], button:has(svg)').last();
  await avatar.click().catch(() => {});
  await page.waitForTimeout(1000);
  const menu = await page.evaluate(() => {
    const items = [...document.querySelectorAll('[role="menuitem"]')];
    return items.map((it) => {
      const cs = getComputedStyle(it);
      return { text: (it.textContent ?? "").trim().slice(0, 20), color: cs.color };
    });
  });
  report.push(`USER MENU: ${JSON.stringify(menu)}`);

  console.log(report.join("\n"));
  await browser.close();
}

main().catch((e) => { console.error("PROBE FAILED:", e); process.exit(1); });
