// Session-264 evidence: live-measure the DESKTOP sidebar's content stack
// (the F-264b ≈620px citation) — the reference-standard second-engine form
// (the session-262 lesson: measure the LIVE surface). Rides the production
// artifact on the scratch comparison db, single invocation (session-98).
import { chromium } from "@playwright/test";
import { unlinkSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import * as path from "node:path";

if (path.basename(process.argv[1] ?? "") !== "probe-264.ts") process.exit(0);

const PORT = "3221";
const BASE = `http://localhost:${PORT}`;
const EMAIL = "sepnetflix2023@outlook.com";
const PASSWORD = "$Abcd1234";
const COMPARISON_DB_URL = "file:../db/comparison.db";

function seedComparisonDb() {
  try {
    unlinkSync(path.join(process.cwd(), "db", "comparison.db"));
  } catch {
    /* absent */
  }
  for (const cmd of [["run", "db:push"], ["run", "db:seed"]] as const) {
    const r = spawnSync("bun", [...cmd], {
      cwd: process.cwd(),
      env: { ...process.env, DATABASE_URL: COMPARISON_DB_URL },
      stdio: "ignore",
    });
    if (r.status !== 0) throw new Error(`bun ${cmd.join(" ")} failed (${r.status})`);
  }
}

function bootArtifact() {
  const env: NodeJS.ProcessEnv = {
    ...process.env,
    DATABASE_URL: COMPARISON_DB_URL,
    AUTH_SECRET: process.env.AUTH_SECRET ?? "comparison-secret-0123456789ab",
    PORT,
    NODE_ENV: "production",
  };
  delete env.NEXT_PUBLIC_SITE_URL;
  return spawn("bun", [".next/standalone/server.js"], {
    cwd: process.cwd(),
    env,
    stdio: "ignore",
    detached: true,
  });
}

async function waitOnUrl(url: string, ms: number): Promise<boolean> {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

async function main(): Promise<number> {
  seedComparisonDb();
  const server = bootArtifact();
  let exit = 1;
  const browser = await chromium.launch();
  try {
    if (!(await waitOnUrl(`${BASE}/api/health`, 30_000))) {
      throw new Error("the standalone artifact never came up on :" + PORT);
    }
    // Desktop-class viewport so the DESKTOP sidebar renders (lg+).
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 480 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/login`);
    await page.getByLabel("Email", { exact: true }).fill(EMAIL);
    await page.getByLabel("Password", { exact: true }).fill(PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.waitForURL(/dashboard|\/$/, { timeout: 20_000 });
    await page.waitForLoadState("networkidle");

    const m = await page.evaluate(() => {
      const aside = document.querySelector("aside");
      const container = aside?.firstElementChild ?? undefined;
      const brand = container?.firstElementChild;
      const nav = container?.querySelector("nav");
      const footer = container?.lastElementChild;
      const r = (el: Element | null | undefined) =>
        el ? Math.round((el as HTMLElement).getBoundingClientRect().height) : null;
      return {
        asideClass: aside?.className.slice(0, 60) ?? null,
        viewport: { w: window.innerWidth, h: window.innerHeight },
        brandH: r(brand),
        navH: r(nav),
        navScrollH: nav ? Math.round((nav as HTMLElement).scrollHeight) : null,
        navChildUnion: nav && nav.firstElementChild ? Math.round(nav.lastElementChild!.getBoundingClientRect().bottom - nav.firstElementChild!.getBoundingClientRect().top + 24) : null,
        footerH: r(footer),
        stackTotal:
          (r(brand) ?? 0) + (nav ? Math.round((nav as HTMLElement).scrollHeight) : 0) + (r(footer) ?? 0),
      };
    });
    console.log(`[probe-264] LIVE sidebar stack at ${m.viewport.w}x${m.viewport.h}:`);
    console.log(`[probe-264] brand=${m.brandH} nav(scroll)=${m.navScrollH} footer=${m.footerH} TOTAL=${m.stackTotal}`);
    exit = 0;
  } finally {
    await browser.close().catch(() => undefined);
    if (server.pid) {
      try {
        process.kill(-server.pid, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
  }
  return exit;
}

process.exit(await main());
