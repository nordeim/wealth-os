import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Session-251 (R-48): the source battery for the focus-ring, cli-anchor,
// and settings-flag round. Every pin slices its target region from a
// unique construction-site anchor (the F-247e/F-248e slice window
// doctrine — the pin watches the cure's form, not its neighborhood).

const ROOT = join(__dirname, "..");

function read(p: string): string {
  return readFileSync(join(ROOT, p), "utf8");
}

const STORE = read("src/stores/wealthos-store.ts");

function region(haystack: string, start: string, end: string): string {
  const s = haystack.indexOf(start);
  expect(s).toBeGreaterThan(-1);
  const e = haystack.indexOf(end, s);
  expect(e).toBeGreaterThan(s);
  return haystack.slice(s, e);
}

// ---- F-251a: the auth-face focus rings join the submits' ring-ring ------

describe("F-251a — the nine auth-face constants adopt the F-218i ring-ring ink", () => {
  it("page-layout's LOGIN_LAYOUT constants carry ring-ring (google/submit/footerLink)", () => {
    const src = read("src/lib/page-layout.ts");
    // Pre-cure all three carried focus-visible:ring-amber-400 — 1.67:1 on
    // the white card (below the 3:1 non-text bar), the only focus
    // affordance on their controls. The cure adopts the submits' own
    // ring-ring ink (17.5:1) — the contiguous ring-before-offset form.
    expect(src.match(/focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2/g)?.length).toBe(3);
    // The Sign in submit carries no ring-offset-2 — its ring swaps in
    // place ahead of the text-sm tail.
    expect(src).toContain("focus-visible:ring-2 focus-visible:ring-ring text-sm");
  });

  it("page-layout's amber ring survives ONLY on the navy drawer surface (the /60 arm)", () => {
    const src = read("src/lib/page-layout.ts");
    // The drawer Sign Out rides the navy wash where amber-400/60 computes
    // ~4.4:1 — the one legitimate amber-ring site in the file.
    expect(src.match(/ring-amber-400/g)?.length).toBe(1);
    expect(src).toContain("focus-visible:ring-amber-400/60");
  });

  it("login-reset's five constants join the three submits at ring-ring (8 total)", () => {
    const src = read("src/lib/login-reset.ts");
    expect(src).not.toMatch(/ring-amber-400/);
    expect(src.match(/focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2/g)?.length).toBe(8);
  });

  it("the reset-password screen's Back to login joins the family", () => {
    const src = read("src/components/layout/reset-password-screen.tsx");
    expect(src).not.toMatch(/ring-amber-400/);
    expect(src).toContain("focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2");
  });
});

// ---- F-251b: the prisma.config CLI anchor routes through the seam --------

describe("F-251b — prisma.config's datasource URL routes through runtimeDatabaseUrl", () => {
  it("the config computes its datasource URL through the signature-aware seam", () => {
    const src = read("prisma.config.ts");
    // Pre-cure the direct resolveDatabaseUrl(process.env…) form passed
    // bun's absolutized DATABASE_URL through untouched — a direct
    // `bun x prisma …` operated on the parent-of-repo mirror db while
    // the app served the repo db (live-probed). The seam re-anchors
    // every invocation shape.
    expect(src).toMatch(/datasource:\s*\{\s*url:\s*runtimeDatabaseUrl\(\)/);
  });

  it("the direct resolveDatabaseUrl env form is retired from the config", () => {
    const src = read("prisma.config.ts");
    expect(src).not.toMatch(/resolveDatabaseUrl\(process\.env\.DATABASE_URL/);
  });
});

// ---- F-251c: the settingsSettled rider on the PUT's commit ---------------

describe("F-251c — updateSettings' success commit re-flips settingsSettled", () => {
  it("the PUT's commit carries the settle rider beside the fresh slice", () => {
    const body = region(STORE, "updateSettings: async", "askCoach: async");
    // Pre-cure the commit set only { settings: res.data } — a superseded
    // hydrate tail left settingsSettled false over a fresh, committed
    // slice until the next full hydrate (the F-234a both-arms contract's
    // one uncovered arm). The rider settles the cycle in the write's own
    // commit.
    expect(body).toContain("if (sessionClearSeq === entryClearSeq)");
    expect(body).toMatch(/set\(\{\s*\n\s*settings: res\.data,\s*\n\s*settingsSettled: true,\s*\n\s*\}\)/);
  });
});

// ---- F-251d: the dashboard user projection widens to the User shape ------

describe("F-251d — the dashboard route's user projection carries the full User shape", () => {
  it("photoUrl and role join the projection (the store's `as User` casts honest)", () => {
    const src = read("src/app/api/dashboard/route.ts");
    expect(src).toContain("avatarColor: guard.user.avatarColor,");
    expect(src).toContain("photoUrl: guard.user.photoUrl,");
    expect(src).toContain("role: guard.user.role,");
  });
});

// ---- F-251e: the drift-probe's CSS positive selection + exit hygiene -----

describe("F-251e — the drift-probe positively identifies the /assets/ stylesheet", () => {
  it("the styling layer selects the /assets/ stylesheet (not css[0] alone)", () => {
    const src = read("scripts/drift-probe.ts");
    const layer = region(src, "const styleUrl = await page.evaluate", "if (!styleUrl)");
    expect(layer).toContain('includes("/assets/")');
  });

  it("the in-main failure exits set exitCode and return (the finally's close runs)", () => {
    const src = read("scripts/drift-probe.ts");
    const main = region(src, "async function main()", "// run only when executed directly");
    // Pre-cure four in-main process.exit(1) paths skipped the finally's
    // browser.close(). The exitCode+return form keeps the teardown on
    // every path; the outer catch's own exit stays.
    expect(main.match(/process\.exitCode = 1;/g)?.length).toBeGreaterThanOrEqual(4);
    expect(main).not.toMatch(/process\.exit\(1\)/);
  });
});

// ---- F-251f: the dead gray-500 pin retires + the census strips comments ---

describe("F-251f — the gray-500 pin retirement and the palette census comment-strip", () => {
  it("globals.css carries no dead gray-500 pin", () => {
    const src = read("src/app/globals.css");
    expect(src).not.toContain("--color-gray-500");
  });

  it("the tabs docblock no longer cites the token (describe, never cite)", () => {
    const src = read("src/components/ui/tabs.tsx");
    expect(src).not.toMatch(/gray-500/);
  });

  it("the palette-pins census strips comment spans before matching (the F-224v genus cure)", () => {
    const src = read("tests/palette-pins.test.ts");
    expect(src).toMatch(/function stripComments/);
    expect(src).toMatch(/const code = stripComments\(text\)/);
  });
});

// ---- F-251g: the white ring-offset halo retires on the dark-capable faces -

describe("F-251g — the four ring-offset sites adopt the flipped token", () => {
  it("the Tabs panel base carries ring-offset-background", () => {
    const src = read("src/components/ui/tabs.tsx");
    const base = region(src, "const PANEL_BASE =", "function Tabs(");
    expect(base).toContain("focus-visible:ring-offset-background");
  });

  it("the error pages' Try-again buttons carry the offset token", () => {
    for (const f of ["src/app/error.tsx", "src/app/global-error.tsx"]) {
      const src = read(f);
      expect(src).toContain("ring-offset-background");
      // The F-220e contiguous ring form stays intact (the token rides
      // before the focus-visible chain, the TABS_SEGMENTED house form).
      expect(src).toMatch(/focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring/);
    }
  });

  it("the 404 home button carries the offset token", () => {
    const src = read("src/lib/page-layout.ts");
    const nf = region(src, "export const NOT_FOUND_LAYOUT", "} as const;");
    expect(nf).toContain("ring-offset-background");
  });
});

// ---- F-251h: the amber meter-fill exemption register entry ---------------

describe("F-251h — the a11y spec's exemption register documents the meter fills", () => {
  it("the F-220p block carries the meter-fill entry with its measured values", () => {
    const src = read("tests/e2e/a11y.spec.ts");
    const block = region(src, "Session-220 (R-17, F-220p)", "Session-221");
    expect(block).toMatch(/meter/i);
    expect(block).toContain("progressbar");
  });
});
