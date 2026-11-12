// Session-229 probe 4 (L2 final): the reference's Add-Expense panel —
// dump the panel element tree and every text-bearing child's computed
// text-align, to adjudicate the S15-P3 docblock claim (centered below
// sm vs left at all widths).
import { chromium, type Page } from "@playwright/test";
import * as path from "node:path";

if (path.basename(process.argv[1] ?? "") !== "probe-229-dialog4.ts") process.exit(0);

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
  const panel = await page.evaluate(() => {
    // The overlay is `fixed inset-0 ... z-50`; the PANEL is its child.
    const overlay = Array.from(document.querySelectorAll<HTMLElement>("body div.fixed")).find(
      (el) => (el.getAttribute("class") ?? "").includes("bg-black/50"),
    );
    if (!overlay) return { error: "no overlay" };
    const panelEl = overlay.firstElementChild as HTMLElement | null;
    if (!panelEl) return { error: "no panel child", overlayCls: overlay.getAttribute("class") };
    const dump = (el: HTMLElement, depth: number): Array<Record<string, string>> => {
      const out: Array<Record<string, string>> = [];
      if (depth > 3) return out;
      const cs = getComputedStyle(el);
      const text = Array.from(el.childNodes)
        .map((n) => (n.nodeType === 3 ? n.textContent?.trim() : ""))
        .join("")
        .slice(0, 40);
      if (text) {
        out.push({
          depth: String(depth),
          tag: el.tagName,
          text,
          textAlign: cs.textAlign,
          cls: (el.getAttribute("class") ?? "").slice(0, 160),
        });
      }
      for (const child of Array.from(el.children)) {
        out.push(...dump(child as HTMLElement, depth + 1));
      }
      return out;
    };
    return {
      panelCls: panelEl.getAttribute("class") ?? "",
      panelTextAlign: getComputedStyle(panelEl).textAlign,
      children: dump(panelEl, 0).slice(0, 20),
    };
  });
  console.log(JSON.stringify(panel, null, 1));
} catch (err) {
  console.log("[probe] FAILED:", String(err));
} finally {
  await browser.close();
}
