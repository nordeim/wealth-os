// Session-215 evidence captures (R-12 — the live-seam convergence round:
// the Import page's live parser now rides the shared csv.ts seam, the
// analytics export rides the guarded toCsv seam, the honest XLS branch
// names the limitation, and the parity surfaces stay byte-identical).
// Four faces freeze the post-round surfaces with the R-12 behavior
// asserted in-DOM/in-event:
// 55: the Import page at 1440×900 with a BOM-PREFIXED bank CSV uploaded —
//     Step 2's preview table renders the parsed rows (the F-215a live
//     proof: header detection sees THROUGH the BOM, which the pre-215
//     inline parser could not)
// 56: the Import page's honest XLS error — a binary .xlsx pick gets the
//     "export as CSV" guidance instead of a garbage column-detection
//     failure (F-215f; the accept + hint stay byte-identical to the
//     reference)
// 57: the Analytics page at 1440×900 with the export download EVENT
//     asserted — the suggested filename carries the reference's
//     prefix_YYYY-MM-DD convention (csvFilename, F-215b) and the blob
//     body starts with the guarded header row
// 58: the mobile drawer OPEN at 390×844 (the directive's standing
//     mobile-nav emphasis — all 9 destinations visible inside the dialog)
import { chromium, type Page } from "@playwright/test";
import { statSync } from "node:fs";
import * as path from "node:path";

// Double-execution guard (the repo idiom): importing this module from any
// other script or runner must never fire the captures — only a direct
// `bun scripts/captures-215.ts` invocation proceeds past this line.
if (path.basename(process.argv[1] ?? "") !== "captures-215.ts") process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
// NOTE: the demo password STARTS WITH "$" — always single-quoted in shells.
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

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
] as const;

/** The sweep.ts login protocol, verbatim: goto /login, the hydration
 *  settle (filling during hydration gets cleared by the re-render before
 *  submit — the observed 400 race), the fill, then the click racing
 *  waitForURL off /login. */
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

/** Commit one capture: verify it exists non-trivially (a blank viewport
 *  PNG compresses far under 30KB) and print the path + assert result. */
function commit(file: string, note: string) {
  const bytes = statSync(file).size;
  if (bytes < 30_000) throw new Error(`${file}: suspiciously small (${bytes}B) — blank?`);
  console.log(`[captures-215] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  const browser = await chromium.launch();
  try {
    // ---- (a) desktop 1440×900: Import — the BOM'd CSV live parse --------
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await login(page);
    await page.goto(`${BASE}/import`, { waitUntil: "domcontentloaded" });
    await page.getByRole("heading", { name: "Import Transactions" }).waitFor({ state: "visible", timeout: 20000 });
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000); // hydration settle (the captures-211 lesson)

    // The F-215a fixture: a BOM-prefixed CSV (the Excel "CSV UTF-8"
    // signature) with a bare-quote description row (the RFC 4180 §2.7
    // case) — the pre-215 inline parser failed BOTH: header detection
    // read "\uFEFFDescription" and the quote flipped quote mode.
    const bomCsv =
      "\uFEFFDescription,Amount,Date,Category\n" +
      'Coffee with O"Brien,4.50,2026-11-04,Dining Out\n' +
      "Monthly salary,5200.00,2026-11-01,Salary\n" +
      'Grocery "run",88.24,2026-11-05,Groceries\n';
    await page.setInputFiles(
      'input[type="file"]',
      { name: "bank-export.csv", mimeType: "text/csv", buffer: Buffer.from(bomCsv, "utf-8") },
    );
    // pickFile auto-extracts: Step 2 renders with the parsed rows
    const step2 = page.locator('section[aria-label="Step 2: Review"]');
    await step2.waitFor({ state: "visible", timeout: 15000 });
    await step2.getByText("3 transactions detected").waitFor({ state: "visible", timeout: 10000 });
    const desc = await step2.locator("tbody tr").first().innerText();
    if (!/O"Brien/.test(desc)) throw new Error(`import: bare-quote row wrong: ${desc}`);
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/55-session215-import-bom-csv.png`, fullPage: false });
    commit(`${OUT}/55-session215-import-bom-csv.png`, "ASSERT OK: BOM'd CSV parsed — 3 rows detected, the bare-quote description intact (the F-215a live seam)");

    await ctx.close();

    // ---- (b) desktop: Import — the honest XLS error (F-215f) ------------
    const xlsCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const xlsPage = await xlsCtx.newPage();
    await login(xlsPage);
    await xlsPage.goto(`${BASE}/import`, { waitUntil: "domcontentloaded" });
    await xlsPage.getByRole("heading", { name: "Import Transactions" }).waitFor({ state: "visible", timeout: 20000 });
    await xlsPage.waitForLoadState("networkidle");
    await xlsPage.waitForTimeout(2000);
    // A binary .xlsx pick (a zip magic bytes buffer — the real format's
    // signature): the honest branch must fire, not a garbage decode.
    const xlsxMagic = Buffer.from([0x50, 0x4b, 0x03, 0x04, 0x14, 0x00, 0x06, 0x00]);
    await xlsPage.setInputFiles(
      'input[type="file"]',
      { name: "statements.xlsx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", buffer: xlsxMagic },
    );
    await xlsPage.getByRole("alert").filter({ hasText: /export your spreadsheet as CSV/i }).waitFor({ state: "visible", timeout: 10000 });
    const hint = await xlsPage.locator('section[aria-label="Step 1: Upload File"]').innerText();
    if (!/CSV, XLS, XLSX up to 10MB/.test(hint)) throw new Error("import: the parity hint text changed");
    await xlsPage.waitForTimeout(400);
    await xlsPage.screenshot({ path: `${OUT}/56-session215-import-xls-error.png`, fullPage: false });
    commit(`${OUT}/56-session215-import-xls-error.png`, "ASSERT OK: honest XLS guidance + the byte-identical parity hint (F-215f)");

    await xlsCtx.close();

    // ---- (c) desktop 1440×900: Analytics — the guarded export -----------
    const anCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const anPage = await anCtx.newPage();
    await login(anPage);
    await anPage.goto(`${BASE}/analytics`, { waitUntil: "domcontentloaded" });
    await anPage.getByRole("heading", { name: "Analytics & Reports" }).waitFor({ state: "visible", timeout: 20000 });
    await anPage.locator("main").first().waitFor({ state: "visible", timeout: 15000 });
    await anPage.waitForTimeout(2500); // the KPI row + charts settle
    const bodyText = await anPage.locator("main").innerText();
    if (!/Avg Monthly/i.test(bodyText)) throw new Error("analytics: the stat row missing");
    // The export click → the download event (F-215b behavioral): the
    // suggested filename carries the prefix_YYYY-MM-DD convention.
    const [download] = await Promise.all([
      anPage.waitForEvent("download", { timeout: 15000 }),
      anPage.getByRole("button", { name: "Export", exact: true }).click(),
    ]);
    const fname = download.suggestedFilename();
    if (!/^wealthos-analytics_\d{4}-\d{2}-\d{2}\.csv$/.test(fname)) {
      throw new Error(`analytics: export filename wrong: ${fname}`);
    }
    // The blob body: the guarded header row leads (formula-guarded cells
    // would carry the ' prefix only on injection-prefixed data).
    const stream = await download.createReadStream();
    const chunks: Buffer[] = [];
    for await (const chunk of stream) chunks.push(chunk as Buffer);
    const csv = Buffer.concat(chunks).toString("utf-8");
    if (!csv.startsWith("Date,Description,Type,Category,Budget Category,Amount")) {
      throw new Error(`analytics: export header wrong: ${csv.slice(0, 60)}`);
    }
    await anPage.screenshot({ path: `${OUT}/57-session215-analytics-export.png`, fullPage: false });
    commit(`${OUT}/57-session215-analytics-export.png`, `ASSERT OK: Analytics + the guarded export (download "${fname}", ${csv.split("\n").length} lines)`);

    await anCtx.close();

    // ---- (d) mobile 390×844: the drawer census ---------------------------
    const phoneCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const phone = await phoneCtx.newPage();
    await login(phone);
    await phone.goto(`${BASE}/Dashboard`, { waitUntil: "domcontentloaded" });
    await phone.locator("main").first().waitFor({ state: "visible", timeout: 15000 });
    // Dev-server hydration tolerance (the captures-211 lesson): a click
    // before React attaches the onClick handler does nothing. The "Open
    // navigation menu" aria-label only exists while the drawer is CLOSED,
    // so a retry click can never toggle it shut — retry until the dialog
    // mounts.
    await phone.waitForLoadState("networkidle");
    await phone.waitForTimeout(3000);
    const dialog = phone.getByRole("dialog");
    let drawerOpen = false;
    for (let attempt = 1; attempt <= 4 && !drawerOpen; attempt++) {
      const trigger = phone.getByRole("button", { name: "Open navigation menu" });
      await trigger.waitFor({ state: "visible", timeout: 10000 });
      await trigger.click();
      try {
        await dialog.waitFor({ state: "visible", timeout: 4000 });
        drawerOpen = true;
      } catch {
        console.log(`[captures-215] drawer not open after click #${attempt} — retrying (dev hydration)`);
        await phone.waitForTimeout(1500);
      }
    }
    if (!drawerOpen) throw new Error("drawer never opened after 4 clicks");
    for (const label of SECTIONS) {
      await dialog.getByRole("link", { name: label, exact: true }).waitFor({ state: "visible", timeout: 5000 });
    }
    await phone.waitForTimeout(400);
    await phone.screenshot({ path: `${OUT}/58-session215-mobile-drawer-open.png`, fullPage: false });
    commit(`${OUT}/58-session215-mobile-drawer-open.png`, `ASSERT OK: drawer dialog open + ${SECTIONS.length}/${SECTIONS.length} nav links visible (${SECTIONS.join(", ")})`);

    await phoneCtx.close();
  } finally {
    await browser.close();
  }
  console.log("[captures-215] done");
}
main().catch((e) => { console.error(e); process.exit(1); });
