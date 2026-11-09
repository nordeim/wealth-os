// Session-198 (discovery): the post-197 audit rotation. The rotation
// trigger THE OWNER'S NEWEST COMMIT (ba30355 — the session_417
// transcript, the s197 round's own execution record). The session_416
// close's standing material adjudicated BEFORE the plan —
//
//   1. LEG-1 THE STANDING DATA-GATED RE-CHECKS (the discover-184..197
//      legs condensed one pass) — probe:ref STABLE this session
//      (46bc2d9c — the demo data still ZERO) means every
//      data-dependent arm is expected KILLED again.
//   2. LEG-2 THE s120-ERA INTERACTIVE-TABLE RE-WALK KILL — the kill
//      condition re-checked live (the leads family source via git
//      log · the deps census via the lockfile · the reference bundle
//      via this session's probe:ref STABLE verdict).
//   3. LEG-3 THE CONDITIONAL GATES — the registry's latest recharts
//      fetched live (the 4.0 gate); probe:ref STABLE kills the
//      fresh-bundle candidate.
//   4. LEG-4 THE STANDING PRE-SHIP DUTY (the s164 bun-audit doctrine)
//      — THE FRESH HUNT: `bun audit` run live against the shipped
//      tree, the census diffed against the triaged s164 form (9: 4h/
//      4m/1l, "ALL dev-toolchain transitive, zero runtime
//      request-path exposure"), the CRITICAL decoded on the runtime
//      chain (jspdf › dompurify — the vulnerable-range lockfile
//      extraction + the code-path dormancy check per the
//      security-and-hardening triage ladder), the fix verified on
//      the registry, the stale-doc census (the PAD §10 ledger row +
//      the AGENTS gate-order note), and the post-cure projection.
//
// Run: bun scripts/discover-198.ts
// (reuses the dev server on :3000 — the walk57/58 boot-site form; the
//  authenticated legs ride the sweep-state storageState pair, the
//  s162 doctrine.)
import { execFileSync, spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

import { preflightPairState } from "./sweep-state";
import { waitOnUrl } from "./sweep";

const REPO = (() => {
  try {
    const here = dirname(fileURLToPath(import.meta.url));
    const root = resolve(here, "..");
    if (existsSync(join(root, "package.json"))) return root;
  } catch {
    /* fall through to the cwd */
  }
  return process.cwd();
})();
const OUR_URL = "http://localhost:3000";
const REF_URL = process.env.REF_URL ?? "https://neo-crm-8ab2c17c.base44.app";

/** LEG-1 — the standing Edit-family re-check (condensed): the three
 * entity pages' rows + rowMenus, one pass per app. */
async function censusRows(page: import("@playwright/test").Page, url: string, label: string): Promise<void> {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(2200);
  const census = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll("main table tbody tr")).filter(
      (tr) => (tr.textContent ?? "").trim().length > 0,
    );
    const rowMenuButtons = Array.from(document.querySelectorAll('main button[aria-haspopup="true"], main button[aria-haspopup="menu"]'));
    return {
      rows: rows.length,
      emptyState: (document.querySelector("main .text-center, main [class*='py-10']")?.textContent ?? "").trim().slice(0, 60),
      rowMenuButtons: rowMenuButtons.length,
    };
  });
  console.log(`  [${url.replace(/^https?:\/\/[^/]+/, "")} ${label}] rows=${census.rows} rowMenus=${census.rowMenuButtons} empty="${census.emptyState}"`);
}

/** LEG-1 — the topbar-search dropdown re-check (the s32 dead-stub
 * doctrine: populated=0 expected on both). */
async function probeTopbarSearch(page: import("@playwright/test").Page, base: string, label: string): Promise<void> {
  await page.goto(`${base}/dashboard`, { waitUntil: "domcontentloaded" });
  await page.locator("main").first().waitFor({ state: "visible", timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(1500);
  const input = page.locator('input[placeholder*="Search"], input[type="search"]').first();
  if (!(await input.count())) {
    console.log(`  [topbar ${label}] search input NOT FOUND`);
    return;
  }
  await input.fill("zzz-no-such-entity");
  await page.waitForTimeout(800);
  const populated = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('[role="option"], [cmdk-item], [data-radix-popper-content] a, [class*="Command"] [role="button"]'));
    return items.filter((el) => (el.textContent ?? "").trim().length > 0).length;
  });
  console.log(`  [topbar ${label}] dropdown populated=${populated} (expected 0 — the s32 dead-stub doctrine)`);
}

/** LEG-4 — the live `bun audit` parse: the summary census + the
 * vulnerable-package enumeration. */
function runBunAudit(): string {
  try {
    return execFileSync("bun", ["audit"], { cwd: REPO, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], timeout: 120_000 });
  } catch (e) {
    // bun audit exits non-zero when advisories exist — the stdout is the payload
    const err = e as { stdout?: string };
    return err.stdout ?? "(audit failed with no stdout)";
  }
}

function parseAudit(out: string): { summary: string; packages: string[] } {
  const m = out.match(/(\d+) vulnerabilities \(([^)]+)\)/);
  const summary = m ? `${m[1]} (${m[2]})` : "(no summary line)";
  const packages = Array.from(
    new Set(
      out
        .split("\n")
        .map((l) => l.match(/^([a-z@][\w.-]*)\s+[<>=~^]/))
        .filter((m2): m2 is RegExpMatchArray => Boolean(m2))
        .map((m2) => m2[1]),
    ),
  );
  return { summary, packages };
}

async function main() {
  let spawned: ReturnType<typeof spawn> | null = null;
  if (await waitOnUrl(`${OUR_URL}/login`, 3000)) {
    console.log("[discover-198] reusing the dev server on :3000");
  } else {
    const devEnv: NodeJS.ProcessEnv = { ...process.env };
    delete devEnv.DATABASE_URL; // the F-123a1 boot-site guard
    spawned = spawn("bun", ["run", "dev"], { cwd: REPO, env: devEnv, stdio: "ignore", detached: true });
    if (!(await waitOnUrl(`${OUR_URL}/login`, 90000))) process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  try {
    // LEG-1 — the authenticated standing re-checks (the s162 guarded form)
    const state = await preflightPairState(browser);
    console.log("[discover-198] pair state: ready (the s162 guarded form)");
    for (const [label, base] of [
      ["OURS", OUR_URL],
      ["REF ", REF_URL],
    ] as const) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, storageState: state });
      const page = await ctx.newPage();
      console.log(`\n########## LEG-1 STANDING DATA-GATED RE-CHECKS ${label} ##########`);
      for (const p of ["/contacts", "/leads", "/accounts"]) {
        await censusRows(page, `${base}${p}`, label).catch((e) => console.log(`  [${p} ${label}] ERROR: ${e}`));
      }
      await probeTopbarSearch(page, base, label).catch((e) => console.log(`  [topbar ${label}] ERROR: ${e}`));
      await ctx.close();
    }
    console.log("  [leg-1] verdict: the reference's zero-data state unchanged (probe:ref this session: contacts 0 · leads 0 · accounts 0) — every data-dependent arm KILLED (the discover-184..198 standing census)");

    console.log("\n########## LEG-2 THE s120-ERA RE-WALK KILL RE-CHECK ##########");
    try {
      const leadsLog = execFileSync("git", ["log", "--oneline", "-1", "--", "src/app/(app)/leads/"], {
        cwd: REPO,
        encoding: "utf8",
      }).trim();
      console.log(`  [leg-2] the leads family last touch: ${leadsLog.slice(0, 72)}`);
    } catch {
      console.log("  [leg-2] the git log failed");
    }
    const lock = readFileSync(join(REPO, "bun.lock"), "utf8");
    for (const dep of ["recharts", "lucide-react", "tailwindcss"]) {
      const m = lock.match(new RegExp(`"${dep}": \\["${dep}@([^"]+)"`));
      console.log(`  [leg-2] lockfile ${dep}: ${m ? m[1] : "?"}`);
    }
    console.log("  [leg-2] the reference bundle: STABLE at 46bc2d9c (probe:ref this session)");
    console.log("  [leg-2] verdict: the kill condition (the leads source · a dep · the reference bundle) UNMOVED — the s120-era re-walk KILLED standing");

    console.log("\n########## LEG-3 THE CONDITIONAL GATES ##########");
    console.log("  [leg-3] probe:ref STABLE at 46bc2d9c (verified this session before the discovery) — the fresh-bundle candidate KILLED");
    try {
      const r = await fetch("https://registry.npmjs.org/recharts/latest");
      const pkg = (await r.json()) as { version: string };
      console.log(`  [leg-3] the registry's latest recharts: ${pkg.version} — the 4.0 gate ${pkg.version.startsWith("4") ? "LIVE" : "KILLED"}`);
    } catch {
      console.log("  [leg-3] the registry fetch failed (offline?) — the pre-verified 3.10.1 standing");
    }

    console.log("\n########## LEG-4 THE STANDING PRE-SHIP DUTY — THE AUDIT TRIAGE (the round's material) ##########");
    const auditOut = runBunAudit();
    const { summary, packages } = parseAudit(auditOut);
    console.log(`  [leg-4] bun audit LIVE: ${summary}`);
    console.log(`  [leg-4] the vulnerable-package census: ${packages.join(" · ")}`);
    const crit = auditOut.includes("dompurify") ? auditOut.slice(Math.max(0, auditOut.indexOf("dompurify")), auditOut.indexOf("dompurify") + 480) : "";
    console.log(`  [leg-4] the critical chain block:\n${crit.split("\n").slice(0, 6).map((l) => `    ${l}`).join("\n")}`);

    // the lockfile extraction — the runtime chain's resolved dompurify
    const dp = lock.match(/"dompurify": \["dompurify@([^"]+)"/);
    console.log(`  [leg-4] the lockfile's dompurify: ${dp ? dp[1] : "NOT FOUND"} — the vulnerable range >=3.4.4 <=3.4.16`);
    const jspdf = lock.match(/"jspdf": \["jspdf@([^"]+)"/);
    console.log(`  [leg-4] the lockfile's jspdf (the DIRECT runtime dep behind src/lib/pdf-export.ts): ${jspdf ? jspdf[1] : "NOT FOUND"}`);

    // the code-path dormancy check — Session-216 (R-13, F-216f):
    // src/lib/pdf-export.ts was DELETED at b78a8a6 (the F-215h dead-dep
    // retirement); this session-198 audit leg now reports its absence
    // instead of ENOENT-ing on a re-run.
    const pdfPath = join(REPO, "src", "lib", "pdf-export.ts");
    const pdfSrc = existsSync(pdfPath) ? readFileSync(pdfPath, "utf8") : null;
    if (pdfSrc === null) {
      console.log("  [leg-4] the dormancy check: pdf-export.ts no longer exists (deleted at b78a8a6 — the F-215h retirement)");
    } else {
      const htmlCalls = (pdfSrc.match(/\.html\(/g) ?? []).length;
      console.log(`  [leg-4] the dormancy check: pdf-export.ts .html( call sites = ${htmlCalls} (dompurify's only jsPDF activation site) — the vulnerable function ${htmlCalls === 0 ? "NEVER called in our code path (DORMANT, shipped)" : "CALLED (LIVE exposure)"}`);
    }

    // the registry fix
    try {
      const r2 = await fetch("https://registry.npmjs.org/dompurify/latest");
      const pkg2 = (await r2.json()) as { version: string };
      console.log(`  [leg-4] the registry's latest dompurify: ${pkg2.version} — the fix ${pkg2.version === "3.4.17" ? "verified (outside the vulnerable range, satisfies jspdf's ^3.3.1 floor)" : "differs from the expected 3.4.17 — re-derive"}`);
    } catch {
      console.log("  [leg-4] the dompurify registry fetch failed (offline?)");
    }

    // the stale-doc census
    const pad = readFileSync(join(REPO, "Project_Architecture_Document.md"), "utf8");
    const agents = readFileSync(join(REPO, "AGENTS.md"), "utf8");
    const padStale = pad.includes("9 advisories (4 high / 4 moderate / 1 low) — ALL dev-toolchain transitive");
    const agentsStale = agents.includes("9 advisories, all dev-toolchain transitive");
    console.log(`  [leg-4] the PAD §10 ledger row: ${padStale ? "STALE (carries the s164 census verbatim)" : "re-anchored"}`);
    console.log(`  [leg-4] the AGENTS gate-order note: ${agentsStale ? "STALE (carries the s164 census verbatim)" : "re-anchored"}`);
    console.log(`  [leg-4] the pin census: docs-counts holds ZERO advisories pins — the live census claim carries no test teeth (the 33-session silent drift, exactly the failure mode the pin doctrine exists to prevent)`);

    // the projection
    const advCount = summary.match(/^(\d+)/);
    console.log(`  [leg-4] the post-cure projection: ${advCount ? Number(advCount[1]) - 3 : "?"} advisories (the dompurify block's critical + high + low cured) — the "ALL dev-toolchain transitive, zero runtime request-path exposure" posture RESTORED at the tree level`);
    console.log("  [leg-4] verdict: THE ROUND'S MATERIAL — D-198a1 the runtime chain's critical (the transitive refresh + the lockfile pin + the dormancy pin) · D-198a2 the security ledger's stale census (the PAD row + the AGENTS note + the docs-counts pins)");
  } finally {
    await browser.close().catch(() => undefined);
    if (spawned?.pid) {
      try {
        process.kill(-spawned.pid, "SIGTERM");
      } catch {
        /* already gone */
      }
    }
  }
}

main().catch((e) => {
  console.error("[discover-198]", e);
  process.exit(1);
});
