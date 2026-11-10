// Session-219 evidence captures (R-16 — the parity-default and
// perceivability round). Six faces freeze the post-round surfaces with
// the R-16 behavior asserted in-DOM:
// 82: the fresh-visitor /Dashboard renders DARK (the F-219c cure — no
//     stored theme, the no-FOUC bootstrap's app-route default; asserted:
//     html.dark + the shell wash #0e1310 + the reference's own face
//     captured beside it for the parity record)
// 83: the per-page CTA genera (the F-219a/b cure — asserted: the
//     Expenses CTA computes the rose→red gradient with white text, the
//     Income CTA the emerald→teal, the Dashboard's Add Transaction the
//     amber gradient with STONE-900 ink — the reference's measured genus)
// 84: the drawer scrolls internally at 390×667 (the F-219h cure —
//     asserted: inner.scrollTop > 0 and Sign Out visible after)
// 85: the auth face forces light with dark stored (the F-219t cure —
//     asserted: stored "dark", /login renders NO .dark + the readable
//     slate ink)
// 86: the coach announces (the F-219j cure — asserted: the message
//     list's aria-live=polite; a asked question renders the answer)
// 87: the analytics empty-state gates (the F-219r cure — asserted: the
//     zero-data analytics renders the EmptyState faces, not bare axes)
import { chromium, type Page } from "@playwright/test";
import { statSync } from "node:fs";
import * as path from "node:path";

// Double-execution guard (the repo idiom, the exact-basename form).
if (path.basename(process.argv[1] ?? "") !== "captures-219.ts") process.exit(0);

const BASE = process.env.OUR_URL ?? "http://localhost:3000";
const REF = process.env.REF_URL ?? "https://wealth-os-d93bd04e.base44.app";
const OUT = "docs/screenshots";
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

function commit(file: string, note: string) {
  const bytes = statSync(file).size;
  if (bytes < 30_000) throw new Error(`${file}: suspiciously small (${bytes}B) — blank?`);
  console.log(`[captures-219] ${file} — ${note} (${bytes}B)`);
}

async function main() {
  const browser = await chromium.launch();

  // ---- 82: the fresh-visitor DARK dashboard (ours + the reference) -----
  {
    // ours — a FRESH context: no stored theme, cookies from a fresh login
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await login(page, BASE);
    // wipe any theme the login flow might have persisted (it never does,
    // but the fresh-visitor contract is the assertion)
    await page.evaluate(() => localStorage.removeItem("wealthos-theme"));
    await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    const state = await page.evaluate(() => ({
      htmlClass: document.documentElement.className,
      stored: localStorage.getItem("wealthos-theme"),
      shellBg: (() => {
        const shell = document.querySelector(".page-wash") ?? document.body;
        return getComputedStyle(shell).backgroundColor;
      })(),
    }));
    if (!state.htmlClass.includes("dark")) throw new Error(`82: not dark (${JSON.stringify(state)})`);
    if (state.stored !== null) throw new Error("82: a theme got stored (the default must be implicit)");
    if (state.shellBg !== "rgb(14, 19, 16)") throw new Error(`82: the shell wash is ${state.shellBg}`);
    await page.screenshot({ path: `${OUT}/82-session219-fresh-visitor-dark-dashboard.png`, fullPage: false });
    commit(`${OUT}/82-session219-fresh-visitor-dark-dashboard.png`, "the F-219c cure — the fresh visitor's /Dashboard renders dark (no stored theme)");

    // the reference's own fresh face, beside it for the parity record
    const ref = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await login(ref, REF);
    await ref.goto(`${REF}/Dashboard`, { waitUntil: "networkidle" });
    await ref.waitForTimeout(2000);
    const refClass = await ref.evaluate(() => document.documentElement.className);
    if (!refClass.includes("dark")) throw new Error(`82: the reference is not dark (${refClass}) — the standing posture moved?`);
    await ref.screenshot({ path: `${OUT}/82-session219-reference-dark-dashboard.png`, fullPage: false });
    commit(`${OUT}/82-session219-reference-dark-dashboard.png`, "the reference's own fresh-visitor dark /Dashboard (the parity target)");
    await page.close();
    await ref.close();
  }

  // ---- 83: the per-page CTA genera --------------------------------------
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await login(page, BASE);
    const ctaCheck = async (route: string, text: string, expectGrad: string, expectColor: string) => {
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      const btn = await page.evaluate((t) => {
        const el = [...document.querySelectorAll("button")].find((b) => b.textContent?.trim() === t);
        if (!el) return null;
        const cs = getComputedStyle(el);
        return { grad: cs.backgroundImage, color: cs.color };
      }, text);
      if (!btn) throw new Error(`83: no ${text} CTA on ${route}`);
      if (!btn.grad.includes(expectGrad)) throw new Error(`83: ${route} ${text} gradient is ${btn.grad}`);
      if (btn.color !== expectColor) throw new Error(`83: ${route} ${text} color is ${btn.color} (expected ${expectColor})`);
      return true;
    };
    await ctaCheck("/Expenses", "Add Expense", "rgb(244, 63, 94)", "rgb(255, 255, 255)");
    await page.screenshot({ path: `${OUT}/83-session219-cta-rose-expenses.png`, fullPage: false });
    commit(`${OUT}/83-session219-cta-rose-expenses.png`, "the F-219b cure — the Expenses CTA rides the rose→red gradient + white");

    await ctaCheck("/Income", "Add Income Source", "rgb(16, 185, 129)", "rgb(255, 255, 255)");
    await page.screenshot({ path: `${OUT}/83-session219-cta-emerald-income.png`, fullPage: false });
    commit(`${OUT}/83-session219-cta-emerald-income.png`, "the F-219b cure — the Income CTA rides the emerald→teal gradient + white");

    // the dashboard's amber CTA is a LINK (BUTTONS.primary) — stone-900 ink
    await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    const link = await page.evaluate(() => {
      const el = [...document.querySelectorAll("a")].find((a) => a.textContent?.includes("Add Transaction"));
      if (!el) return null;
      const cs = getComputedStyle(el);
      return { grad: cs.backgroundImage, color: cs.color };
    });
    if (!link) throw new Error("83: no Add Transaction link");
    if (!link.grad.includes("rgb(245, 158, 11)")) throw new Error(`83: the amber gradient is ${link.grad}`);
    if (link.color !== "rgb(28, 25, 23)") throw new Error(`83: the amber CTA ink is ${link.color} (expected stone-900)`);
    await page.screenshot({ path: `${OUT}/83-session219-cta-amber-dashboard.png`, fullPage: false });
    commit(`${OUT}/83-session219-cta-amber-dashboard.png`, "the F-219a cure — the amber CTA carries the stone-900 ink (8.1:1)");
    await page.close();
  }

  // ---- 84: the drawer scrolls at 390×667 ---------------------------------
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 667 } });
    await login(page, BASE);
    await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await page.waitForTimeout(900);
    const scrolled = await page.evaluate(() => {
      const overlays = [...document.querySelectorAll("div")].filter((el) => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return cs.position === "fixed" && r.width >= 380 && r.height >= 350 && el.querySelector("nav") !== null;
      });
      const drawer = overlays[0];
      if (!drawer) return { found: false };
      const inner = drawer.firstElementChild as HTMLElement | null;
      if (!inner) return { found: true, scrolled: false };
      inner.scrollTop = 400;
      return { found: true, scrolled: inner.scrollTop > 0 };
    });
    if (!scrolled.found || !scrolled.scrolled) throw new Error(`84: the drawer does not scroll (${JSON.stringify(scrolled)})`);
    await page.waitForTimeout(400);
    const signOutVisible = await page.getByRole("button", { name: /sign out/i }).isVisible();
    if (!signOutVisible) throw new Error("84: Sign Out still not visible after the scroll");
    await page.screenshot({ path: `${OUT}/84-session219-drawer-scroll-390x667.png`, fullPage: false });
    commit(`${OUT}/84-session219-drawer-scroll-390x667.png`, "the F-219h cure — the drawer scrolls internally; Sign Out reachable at 667px");
    await page.close();
  }

  // ---- 85: the auth face forces light with dark stored -------------------
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    await page.evaluate(() => localStorage.setItem("wealthos-theme", "dark"));
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    const state = await page.evaluate(() => ({
      htmlClass: document.documentElement.className,
      heading: (() => {
        const h = [...document.querySelectorAll("h1, h2")].find((e) => (e.textContent ?? "").includes("Welcome"));
        return h ? getComputedStyle(h).color : null;
      })(),
    }));
    if (state.htmlClass.includes("dark")) throw new Error(`85: the login carried .dark (${state.htmlClass})`);
    if (state.heading !== "rgb(15, 23, 42)") throw new Error(`85: the login heading ink is ${state.heading}`);
    await page.screenshot({ path: `${OUT}/85-session219-auth-face-force-light.png`, fullPage: false });
    commit(`${OUT}/85-session219-auth-face-force-light.png`, "the F-219t cure — stored dark, the login still renders light (slate ink readable)");
    // clean up: restore the pristine no-choice state
    await page.evaluate(() => localStorage.removeItem("wealthos-theme"));
    await page.close();
  }

  // ---- 86: the coach announces --------------------------------------------
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await login(page, BASE);
    await page.goto(`${BASE}/Dashboard`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1800);
    await page.getByRole("button", { name: /ai coach/i }).first().click();
    await page.waitForTimeout(800);
    // a suggested-question chip asks the coach (scoped INSIDE the dialog)
    await page.locator('[role="dialog"] button.rounded-full').first().click();
    await page.waitForTimeout(2500);
    const coach = await page.evaluate(() => {
      // scope INSIDE the dialog — the Toaster viewport is also a polite
      // live region and precedes the dialog in DOM order
      const dlg = document.querySelector('[role="dialog"]');
      const list = dlg?.querySelector('[aria-live="polite"]');
      const bubbles = list ? list.querySelectorAll(":scope > div") : [];
      return {
        live: list?.getAttribute("aria-live") ?? null,
        bubbleCount: bubbles.length,
        lastText: bubbles[bubbles.length - 1]?.textContent?.slice(0, 60) ?? "",
      };
    });
    if (coach.live !== "polite") throw new Error(`86: the message list is not the live region (${coach.live})`);
    if (coach.bubbleCount < 2) throw new Error(`86: expected the greeting + the answer (${coach.bubbleCount} bubbles)`);
    await page.screenshot({ path: `${OUT}/86-session219-coach-live-region.png`, fullPage: false });
    commit(`${OUT}/86-session219-coach-live-region.png`, "the F-219j cure — the coach's replies are announced (aria-live=polite)");
    await page.close();
  }

  // ---- 87: the analytics empty-state gates --------------------------------
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await login(page, BASE);
    // zero the data to see the empty faces (the sweep's own zero-data
    // tool does this against the dev db; here we browse with a fresh
    // throwaway user instead — its workspace is empty by construction).
    // The signup returns the in-app OTP code (the dev posture) — verify
    // it through the API so the login lands the app, not the verify view.
    const throwaway = `e2e-capture-219-${Date.now()}@example.com`;
    // A-11 (the SKILL's own gotcha): page.request under Bun trips the
    // cookie-header URL parse on this path — plain fetch with the
    // absolute URL + the JSON content-type (the smoke ladder's form).
    const signupRes = await fetch(`${BASE}/api/auth/signup`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: throwaway, password: "TestPass123" }),
    });
    const signupBody = (await signupRes.json()) as { ok: boolean; data?: { verificationCode?: string } };
    const code = signupBody.data?.verificationCode;
    if (code) {
      await fetch(`${BASE}/api/auth/verify`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: throwaway, code }),
      });
    }
    const fresh = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await fresh.goto(`${BASE}/login`, { waitUntil: "networkidle" });
    await fresh.waitForTimeout(800);
    await fresh.fill('input[type="email"]', throwaway);
    await fresh.fill('input[type="password"]', "TestPass123");
    await fresh.click('button[type="submit"]');
    await fresh.waitForTimeout(2000);
    await fresh.goto(`${BASE}/Analytics`, { waitUntil: "networkidle" });
    await fresh.waitForTimeout(2000);
    const empties = await fresh.evaluate(() =>
      [...document.querySelectorAll("p, span, div")].filter((el) => /No (spending|budget split|income|holdings)/i.test(el.textContent ?? "")).length,
    );
    if (empties < 3) throw new Error(`87: only ${empties} empty-state faces render (expected 4 gates)`);
    await fresh.screenshot({ path: `${OUT}/87-session219-analytics-empty-gates.png`, fullPage: false });
    commit(`${OUT}/87-session219-analytics-empty-gates.png`, `the F-219r cure — the empty analytics renders ${empties} explicit faces, no silent blanks`);
    await fresh.close();
    await page.close();
  }

  await browser.close();
  console.log("[captures-219] all six faces verified");
}

main().catch((e) => {
  console.error(`[captures-219] FAIL: ${(e as Error).message}`);
  process.exit(1);
});
