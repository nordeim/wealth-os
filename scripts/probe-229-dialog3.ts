// Session-229 exploratory probe 3 (L2): click the reference's "Add
// Expense" at 390 and dump EVERY overlay-ish element that appears.
import { chromium, type Page } from "@playwright/test";
import * as path from "node:path";

if (path.basename(process.argv[1] ?? "") !== "probe-229-dialog3.ts") process.exit(0);

const REF = "https://wealth-os-d93bd04e.base44.app";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

async function login(page: Page) {
  await page.goto(`${REF}/login`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('input[type="email"]', { timeout: 30000 });
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 45000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(3000);
}

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();
try {
  await login(page);
  await page.goto(`${REF}/Expenses`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(4000);
  await page.getByRole("button", { name: /Add Expense/i }).first().click();
  await page.waitForTimeout(2500);
  // Dump every element that looks like an overlay/panel.
  const overlays = await page.evaluate(() => {
    const out: Array<Record<string, string>> = [];
    const all = document.querySelectorAll<HTMLElement>("body *");
    for (const el of all) {
      const cs = getComputedStyle(el);
      const pos = cs.position;
      const z = Number(cs.zIndex || 0);
      const cls = el.getAttribute("class") ?? "";
      const looksOverlay =
        pos === "fixed" || pos === "absolute" || (z >= 30 && cls.length > 0) || el.getAttribute("role") === "dialog";
      if (!looksOverlay) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width < 40 || rect.height < 20) continue;
      const text = (el.textContent ?? "").trim().slice(0, 60);
      out.push({
        tag: el.tagName,
        role: el.getAttribute("role") ?? "",
        z: String(z),
        pos,
        w: String(Math.round(rect.width)),
        h: String(Math.round(rect.height)),
        textAlign: cs.textAlign,
        cls: cls.slice(0, 240),
        text,
      });
    }
    return out.slice(0, 14);
  });
  console.log("[overlay dump]", JSON.stringify(overlays, null, 1));
  await page.screenshot({ path: "/tmp/ref-dialog-390.png" });
  console.log("[screenshot] /tmp/ref-dialog-390.png");
  // Also dump any h1/h2/h3 inside the tallest overlay for title alignment.
  const title = await page.evaluate(() => {
    const heads = Array.from(document.querySelectorAll<HTMLElement>('[role="dialog"] h2, [role="dialog"] h3, .fixed h2, .fixed h3'));
    return heads.slice(0, 4).map((h) => ({
      tag: h.tagName,
      text: (h.textContent ?? "").slice(0, 50),
      textAlign: getComputedStyle(h).textAlign,
      parentCls: (h.parentElement?.getAttribute("class") ?? "").slice(0, 200),
    }));
  });
  console.log("[titles]", JSON.stringify(title, null, 1));
} catch (err) {
  console.log("[probe] FAILED:", String(err));
} finally {
  await browser.close();
}
