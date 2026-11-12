// Session-229 adjudication probe (the L2 finding — DialogHeader drift):
//
//   L2 — our DialogHeader docblock claims the reference centers dialog
//        titles below sm (`text-center sm:text-left` — "the stock
//        shadcn header", S15-P3), but DIALOG_HEADER carries
//        `flex flex-col gap-1.5 text-left` — left at every width. The
//        sweep gates never open dialogs at 390, so the drift survived.
//
//        Does the REFERENCE center its dialog titles at 390? If yes →
//        add the classes (parity cure); if left → correct the docblock.
//
// The probe logs into the reference at 390x844 (phone), walks the
// section pages, opens the first dialog it can trigger, and reads the
// dialog header's computed text-align + the title's own alignment.
import { chromium, type Page } from "@playwright/test";
import * as path from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "probe-229-dialog.ts") process.exit(0);

const REF = "https://wealth-os-d93bd04e.base44.app";
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";

const PAGES = ["/Dashboard", "/Income", "/Expenses", "/Accounts", "/Investments", "/Goals"];

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

async function probeDialogOn(page: Page, route: string): Promise<boolean> {
  await page.goto(`${REF}${route}`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(4000);
  // Candidate triggers: buttons whose text suggests adding/editing.
  const triggers = page.locator(
    'button:has-text("Add"), button:has-text("New"), button:has-text("Edit"), button:has-text("Create"), button:has-text("quick"), button:has-text("Quick")',
  );
  const n = await triggers.count();
  for (let i = 0; i < Math.min(n, 6); i++) {
    const btn = triggers.nth(i);
    if (!(await btn.isVisible().catch(() => false))) continue;
    await btn.click().catch(() => {});
    await page.waitForTimeout(1200);
    const dialog = page.locator('[role="dialog"]').first();
    if (await dialog.count().catch(() => 0)) {
      const read = await dialog.evaluate((el) => {
        const cs = getComputedStyle(el);
        // The header-ish container: the dialog's first flex-col child, or
        // any child whose text looks like a title. Read BOTH the dialog
        // root and its first two children's text-align + classes.
        const kids = Array.from(el.children).slice(0, 2).map((k) => {
          const kcs = getComputedStyle(k);
          return {
            tag: k.tagName,
            cls: (k.getAttribute("class") ?? "").slice(0, 200),
            textAlign: kcs.textAlign,
            width: k.getBoundingClientRect().width,
          };
        });
        return { cls: el.getAttribute("class")?.slice(0, 200), textAlign: cs.textAlign, kids };
      });
      console.log(`[${route}] dialog found via trigger ${i}:`, JSON.stringify(read, null, 2));
      return true;
    }
    // Close anything that opened without role=dialog (popover etc.)
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
  }
  console.log(`[${route}] no dialog triggered (${n} candidates)`);
  return false;
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
  console.log("[probe] logged in; probing the reference at 390x844");
  for (const route of PAGES) {
    if (await probeDialogOn(page, route)) break;
  }
} catch (err) {
  console.log("[probe] FAILED:", String(err));
} finally {
  await browser.close();
}
