// Session-215 quick probe: the reference Import page's file-input contract
// (accept attr + hint text + any XLS handling) — read-only, one-shot.
import { chromium } from "@playwright/test";

const REF_URL = process.env.REF_URL ?? "https://wealth-os-d93bd04e.base44.app";
const REF_EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const REF_PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

const log = (s: string) => console.log(`[probe] ${s}`);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
try {
  await page.goto(`${REF_URL}/login`, { waitUntil: "networkidle" });
  await page.waitForSelector('input[type="email"]', { timeout: 20000 });
  await page.fill('input[type="email"]', REF_EMAIL);
  await page.fill('input[type="password"]', REF_PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30000 }),
    page.click('button[type="submit"]'),
  ]);
  log("logged in");

  await page.goto(`${REF_URL}/import`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("input[type=file]", { timeout: 20000 });
  const accept = await page.getAttribute("input[type=file]", "accept");
  log(`accept attr: ${JSON.stringify(accept)}`);
  const body = await page.evaluate(() => document.body.innerText);
  const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);
  const hint = lines.find((l) => /csv|xls|spreadsheet|10\s*mb/i.test(l));
  log(`hint text: ${JSON.stringify(hint)}`);
  const csvMentions = lines.filter((l) => /xls/i.test(l));
  log(`xls-mentioning lines: ${JSON.stringify(csvMentions)}`);
} finally {
  await browser.close();
}
