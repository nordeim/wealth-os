// Session-225 verification probe (R-22 intake audit — the driving
// session's independent re-verification of the audit Pass C M-1 claim).
//
//   C-M1 — the skip-to-content link, when focused below lg, is painted
//          UNDER the sticky mobile header: the revealed pill and the
//          header are both positioned z-50 in the same stacking context
//          and the header is later in DOM, so the header wins the paint
//          order — the focused link is invisible at phone widths (the
//          e2e leg runs at 1280x800 only; axe cannot model paint order).
//
// The probe boots (or reuses) the dev server on :3000 — the sweep
// convention — logs in as the demo user, then at 390x844: Tab once,
// assert focus is ON the skip link, take its center point, and ask the
// browser which element is topmost there (the honest form of "is the
// link visible when focused"). The desktop 1280x800 control runs the
// same steps (the header is display:none there, so the link must be
// topmost). A functional control asserts Enter lands focus on
// #main-content (the bypass still works — this is a paint defect, not
// a functional one).
import { chromium, type Page } from "@playwright/test";
import { spawn } from "node:child_process";
import * as path from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "probe-225-skip.ts") process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const EMAIL = process.env.REF_EMAIL ?? "sepnetflix2023@outlook.com";
const PASSWORD = process.env.REF_PASSWORD ?? "$Abcd1234";

async function login(page: Page, base: string) {
  await page.goto(`${base}/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.endsWith("/login"), { timeout: 30000 }),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(1800);
}

async function waitOnUrl(url: string, ms: number): Promise<boolean> {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(url, { redirect: "follow" });
      if (r.ok) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

function describe(el: Element | null): string {
  if (!el) return "<none>";
  const tag = el.tagName.toLowerCase();
  const cls = el.getAttribute("class") ?? "";
  const id = el.getAttribute("id") ?? "";
  const text = (el.textContent ?? "").trim().slice(0, 24);
  return `<${tag}${id ? ` id=${id}` : ""}${cls ? ` class="${cls.slice(0, 60)}"` : ""}> "${text}"`;
}

async function probeViewport(page: Page, width: number, height: number, label: string) {
  await page.setViewportSize({ width, height });
  await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.keyboard.press("Tab");
  await page.waitForTimeout(400);
  const focused = await page.evaluate(() => {
    const a = document.activeElement;
    if (!a) return null;
    const r = a.getBoundingClientRect();
    return {
      tag: a.tagName.toLowerCase(),
      text: (a.textContent ?? "").trim(),
      href: a.getAttribute("href"),
      rect: { x: r.x, y: r.y, w: r.width, h: r.height },
    };
  });
  if (!focused || focused.tag !== "a" || focused.href !== "#main-content") {
    console.log(`  [${label}] first Tab did NOT focus the skip link — got ${JSON.stringify(focused)}`);
    return;
  }
  const topmost = await page.evaluate(
    ({ x, y }) => {
      const el = document.elementFromPoint(x, y);
      return el ? { tag: el.tagName.toLowerCase(), cls: el.getAttribute("class") ?? "", text: (el.textContent ?? "").trim().slice(0, 24) } : null;
    },
    { x: focused.rect.x + focused.rect.w / 2, y: focused.rect.y + focused.rect.h / 2 },
  );
  const skipIsTopmost = topmost?.tag === "a";
  console.log(
    `  [${label}] focused link rect ${JSON.stringify(focused.rect)} — topmost at center: ${describe2(topmost)} — skip topmost: ${skipIsTopmost}`,
  );
  // The functional control: Enter must land focus on #main-content.
  await page.keyboard.press("Enter");
  await page.waitForTimeout(400);
  const landed = await page.evaluate(() => {
    const a = document.activeElement;
    return a ? (a.getAttribute("id") ?? a.tagName.toLowerCase()) : "<none>";
  });
  console.log(`  [${label}] Enter landed focus on: ${landed}`);
}

function describe2(el: { tag: string; cls: string; text: string } | null): string {
  if (!el) return "<none>";
  return `<${el.tag} class="${el.cls.slice(0, 60)}"> "${el.text}"`;
}

async function main() {
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${BASE}/login`, 5000)) {
    console.log(`[probe-225-skip] reusing the dev server on ${BASE}`);
  } else {
    console.log("[probe-225-skip] booting the dev server (bun run dev)…");
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL;
    spawned = spawn("bun", ["run", "dev"], { cwd: process.cwd(), env: devEnv, stdio: "ignore", detached: true });
    if (!(await waitOnUrl(`${BASE}/login`, 90_000))) {
      console.error("[probe-225-skip] the dev server never came up on :3000");
      process.exit(1);
    }
    console.log("[probe-225-skip] dev server up");
  }
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await login(page, BASE);
    await probeViewport(page, 390, 844, "phone-390");
    await probeViewport(page, 1280, 800, "desktop-1280-ctl");
    await browser.close();
    console.log("[probe-225-skip] done");
  } finally {
    if (spawned?.pid) {
      try {
        process.kill(-spawned.pid, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
  }
}

main().catch((err) => {
  console.error(`[probe-225-skip] FAILED: ${err.message}`);
  process.exit(1);
});
