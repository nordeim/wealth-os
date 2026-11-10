// Session-217 reference probe (the parity question raised by the fresh-eyes
// audit's dark-mode findings): what does the LIVE REFERENCE do in dark mode
// on (a) the dialog family, (b) the sidebar user menu, (c) the select
// listbox, (d) body text inheritance — plus the sitemap's route casing.
// Ground-truth protocol: computed styles, not screenshots.
import { chromium, type Page } from "@playwright/test";
import * as path from "node:path";

// Double-execution guard (the repo idiom, F-215l's exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "probe-217-reference.ts") process.exit(0);

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

  // ---- 0. the sitemap's route casing (F-217c-5 decode) ------------------
  const sitemap = await page.request.get(`${BASE}/sitemap.xml`);
  const sitemapBody = await sitemap.text();
  report.push(`SITEMAP status=${sitemap.status()}`);
  report.push(`SITEMAT locs: ${[...sitemapBody.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).join(" ")}`);

  await login(page);
  const url = page.url();
  report.push(`LOGIN landed: ${url}`);

  // ---- 1. find the theme toggle on the reference -------------------------
  // Probe the html class first (is it already dark?)
  const initialHtmlClass = await page.evaluate(() => document.documentElement.className);
  report.push(`HTML class (initial): "${initialHtmlClass}"`);

  // Try common toggle carriers: a button with moon/sun svg, aria-labels
  const toggleCandidates = await page.evaluate(() => {
    const out: string[] = [];
    document.querySelectorAll("button").forEach((b) => {
      const label = b.getAttribute("aria-label") ?? "";
      const text = (b.textContent ?? "").trim().slice(0, 24);
      const svg = b.querySelector("svg");
      if (/dark|light|theme|moon|sun/i.test(label) || /dark|light/i.test(text)) {
        out.push(`button[aria-label="${label}"] text="${text}" svg=${!!svg}`);
      }
    });
    return out;
  });
  report.push(`TOGGLE candidates: ${JSON.stringify(toggleCandidates)}`);

  // The reference's dark toggle: click the moon/moon-ish button (mobile or
  // in the avatar dropdown). Open the avatar menu first if needed.
  const avatarBtn = page.locator('button:has(svg)').last();
  await avatarBtn.click().catch(() => {});
  await page.waitForTimeout(800);
  const menuItems = await page.evaluate(() => {
    const out: string[] = [];
    document.querySelectorAll('[role="menuitem"], [role="menu"] *').forEach((el) => {
      const t = (el.textContent ?? "").trim();
      if (t && !out.includes(t)) out.push(t.slice(0, 40));
    });
    return out;
  });
  report.push(`AVATAR menu items: ${JSON.stringify(menuItems)}`);

  // Look for a Dark Mode menu item and click it
  const darkItem = page.locator('[role="menuitem"], [role="menu"] *', { hasText: /dark/i }).first();
  if (await darkItem.count()) {
    await darkItem.click().catch(() => {});
    await page.waitForTimeout(1200);
  } else {
    // fallback: any button with moon icon
    const moon = page.locator('button:has(svg)').filter({ hasText: /dark/i }).first();
    if (await moon.count()) { await moon.click(); await page.waitForTimeout(1200); }
  }
  const htmlClass = await page.evaluate(() => document.documentElement.className);
  report.push(`HTML class (post-toggle attempt): "${htmlClass}"`);
  const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const bodyColor = await page.evaluate(() => getComputedStyle(document.body).color);
  report.push(`BODY dark: bg=${bodyBg} color=${bodyColor}`);

  // ---- 2. the dialog family in dark mode --------------------------------
  for (const section of ["Accounts", "Income"]) {
    await page.goto(`${BASE}/${section}`, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(1500);
    // find an "Add"-ish button
    const addBtn = page.locator('button', { hasText: /add|new/i }).first();
    if (await addBtn.count()) {
      await addBtn.click();
      await page.waitForTimeout(1000);
      const dialogInfo = await page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"]');
        if (!dlg) return { found: false };
        const cs = getComputedStyle(dlg);
        const heading = dlg.querySelector("h1,h2,h3,h4,[role=\"heading\"]");
        const hcs = heading ? getComputedStyle(heading) : null;
        const label = dlg.querySelector("label");
        const lcs = label ? getComputedStyle(label) : null;
        return {
          found: true,
          bg: cs.backgroundColor,
          border: cs.borderColor,
          headingColor: hcs?.color ?? null,
          headingText: heading?.textContent?.trim().slice(0, 30) ?? null,
          labelColor: lcs?.color ?? null,
        };
      });
      report.push(`DIALOG ${section} dark: ${JSON.stringify(dialogInfo)}`);
      await page.keyboard.press("Escape");
      await page.waitForTimeout(500);
    } else {
      report.push(`DIALOG ${section}: no add button found`);
    }
  }

  // ---- 3. a Select listbox in dark mode (Settings has selects) -----------
  await page.goto(`${BASE}/Settings`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(1500);
  const selectTrigger = page.locator('button[role="combobox"], [role="combobox"]').first();
  if (await selectTrigger.count()) {
    await selectTrigger.click();
    await page.waitForTimeout(800);
    const listbox = await page.evaluate(() => {
      const lb = document.querySelector('[role="listbox"]');
      if (!lb) return { found: false };
      const cs = getComputedStyle(lb);
      return { found: true, bg: cs.backgroundColor, color: cs.color };
    });
    report.push(`SELECT listbox dark: ${JSON.stringify(listbox)}`);
    await page.keyboard.press("Escape");
  } else {
    report.push(`SELECT: no combobox on Settings`);
  }

  // ---- 4. sidebar menu resting color in dark -----------------------------
  const menuProbe = await page.evaluate(() => {
    const items = document.querySelectorAll('[role="menuitem"]');
    const out: string[] = [];
    items.forEach((it) => {
      const cs = getComputedStyle(it);
      out.push(`"${(it.textContent ?? "").trim().slice(0, 18)}" color=${cs.color}`);
    });
    return out;
  });
  report.push(`MENU resting colors: ${JSON.stringify(menuProbe)}`);

  // ---- 5. a dark-mode screenshot for the visual record -------------------
  await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "/home/z/my-project/scripts/ref-dark-dashboard.png" });
  report.push("Screenshot: scripts/ref-dark-dashboard.png");

  console.log(report.join("\n"));
  await browser.close();
}

main().catch((e) => { console.error("PROBE FAILED:", e); process.exit(1); });
