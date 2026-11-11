// Session-225 (R-22): the designated-tail completion and
// tooling-hygiene round's source pins. Every pin was born RED
// against the pre-round tree and carries its finding's citation.
// The round's verified defects: the numeric year-month partials
// ("2026/11") staged the invented day 1 while the hyphen partials
// nulled; the designator taxonomy missed " UTC"/" GMT" tails and a
// space before the offset (the named designated forms staged the
// VIEWER's calendar — a wrong day west of the designation — and the
// 4-digit numeric designated forms null-or-staged by zone); the
// verify/resend routes never received the F-222n email-keyed mirror
// (the OTP surface bounded only by voidable per-IP caps); the
// skip-to-content link painted UNDER the sticky mobile header when
// focused below lg (equal z-50, the header later in DOM); the
// capture tools signed up scratch accounts against the dev database
// (the census MISMATCHed at users=2); the search docblock
// overstated the strip's contract; the uploads GET carried no
// bucket while the health note claimed it was the only exception;
// global-error rendered landmark-less; six decorative icons missed
// aria-hidden; the DropdownItem destructive ink carried no
// measured-value citation; the app-shell block misindented; the
// mobile sheet container carried a dead focus:outline-none.
// The behavioral csv pins live in tests/csv.test.ts; the e2e legs
// (the 390 topmost skip link, the search strip, the verify/resend
// acct buckets) live in tests/e2e/.
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = (p: string) => readFileSync(p, "utf8");

// ---- F-225c: the email-keyed verify/resend buckets -------------------------

describe("F-225c — the verify/resend per-account buckets (the F-222n mirror)", () => {
  it("verify carries the email-keyed secondary bucket, sized above the IP cap", () => {
    const src = read("src/app/api/auth/verify/route.ts");
    expect(src).toContain("verify-acct:");
    expect(src).toMatch(/verify-acct:\$\{email\}[\s\S]{0,200}?,\s*60,/);
  });

  it("resend carries the email-keyed secondary bucket, sized above the IP cap", () => {
    const src = read("src/app/api/auth/resend/route.ts");
    expect(src).toContain("resend-acct:");
    expect(src).toMatch(/resend-acct:\$\{email\}[\s\S]{0,200}?,\s*10,/);
  });

  // Session-226 (R-23, F-226p): the WINDOW — a cap without its window is
  // half a contract (a shrink to 15s passed the source pins and the e2e
  // legs complete well inside 15s). The pins extend through the window.
  it("the verify bucket carries the 15-minute window (F-226p)", () => {
    const src = read("src/app/api/auth/verify/route.ts");
    expect(src).toMatch(/verify-acct:\$\{email\}[\s\S]{0,200}?,\s*60,\s*15 \* 60 \* 1000/);
  });

  it("the resend bucket carries the 15-minute window (F-226p)", () => {
    const src = read("src/app/api/auth/resend/route.ts");
    expect(src).toMatch(/resend-acct:\$\{email\}[\s\S]{0,200}?,\s*10,\s*15 \* 60 \* 1000/);
  });

  it("the F-222p citation is corrected (the voidable per-IP bound no longer cited as the mitigation)", () => {
    const verify = read("src/app/api/auth/verify/route.ts");
    const resend = read("src/app/api/auth/resend/route.ts");
    expect(verify).toContain("F-225c");
    expect(resend).toContain("F-225c");
  });
});

// ---- F-225d: the skip link rises above the header layer -------------------

describe("F-225d — the focused skip link paints above the mobile header", () => {
  it("the anchor's focus utilities clear the z-50 header/drawer/dialog layer", () => {
    const src = read("src/components/layout/app-shell.tsx");
    expect(src).toContain("focus:z-[60]");
  });
});

// ---- F-225e: the capture family rides its own database --------------------

describe("F-225e — the capture tools' own-database doctrine (the e2e convention)", () => {
  const scripts = [
    "scripts/captures-218.ts",
    "scripts/captures-219.ts",
    "scripts/captures-224.ts",
    // Session-226 (R-23, F-226f): the round's own capture script joins
    // the family — it was "born on the convention" but unpinned.
    "scripts/captures-225.ts",
  ] as const;

  it.each(scripts)("the spawned dev server rides db/captures.db (%s)", (p) => {
    const src = read(p);
    expect(src).toContain("captures.db");
  });

  it.each(scripts)("the census tripwire runs at exit (%s)", (p) => {
    const src = read(p);
    expect(src).toMatch(/db:census|census\.ts/);
  });
});

// ---- F-225f: the search docblock states the delivered truth ----------------

describe("F-225f — the search seam's docblock", () => {
  it("the docblock carries the metacharacter-free qualifier (the under-inclusion trade documented)", () => {
    const src = read("src/lib/search-query.ts");
    expect(src).toMatch(/metacharacter-free/i);
    expect(src).toMatch(/under-inclusion/i);
  });
});

// ---- F-225i: the uploads GET bucket ---------------------------------------

describe("F-225i — the uploads GET carries a bucket", () => {
  it("the route rate-limits at the export precedent", () => {
    const src = read("src/app/api/uploads/[name]/route.ts");
    expect(src).toContain("rateLimit(");
    expect(src).toContain("rateLimit(`uploads:${clientKey(req)}`, 240, 15 * 60 * 1000)");
  });

  it("the health route's F-221t note names the corrected enumeration", () => {
    const src = read("src/app/api/health/route.ts");
    expect(src).toContain("F-225i");
  });
});

// ---- F-225j: the global-error <main> landmark ------------------------------

describe("F-225j — global-error's third-face landmark", () => {
  it("the wrapper renders <main> (the F-224aa rationale's third face)", () => {
    const src = read("src/app/global-error.tsx");
    expect(src).toMatch(/<main className="min-h-screen/);
  });
});

// ---- F-225k: the decorative icons ------------------------------------------

describe("F-225k — the six decorative icon sites carry aria-hidden", () => {
  it("the sidebar nav-link icons, the menu icons, and the KpiCard trend arrow", () => {
    const sidebar = read("src/components/layout/sidebar.tsx");
    expect(sidebar).toContain(`<item.icon className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden="true" />`);
    expect(sidebar).toContain(`<Moon className="h-4 w-4" aria-hidden="true" />`);
    expect(sidebar).toContain(`<LogOut className="h-4 w-4" aria-hidden="true" />`);
    const mobileNav = read("src/components/layout/mobile-nav.tsx");
    expect(mobileNav).toContain(`<item.icon className="w-6 h-6 shrink-0" strokeWidth={2} aria-hidden="true" />`);
    expect(mobileNav).toContain(`<LogOut className="h-4 w-4" aria-hidden="true" />`);
    const pageParts = read("src/components/shared/page-parts.tsx");
    expect(pageParts).toContain(`<TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />`);
  });
});

// ---- F-225l: the destructive-ink citation + the consumer wording -----------

describe("F-225l — the latent destructive-ink arm carries its measured value", () => {
  it("the dropdown docblock cites the 3.76:1 measurement beside the F-224q citation", () => {
    const src = read("src/components/ui/dropdown.tsx");
    expect(src).toContain("3.76");
    expect(src).toContain("F-225l");
  });

  it("the globals.css consumer wording is disambiguated (rendered vs referenced)", () => {
    const src = read("src/app/globals.css");
    expect(src).toMatch(/rendered consumers/i);
  });
});

// ---- F-225m: the shell hygiene ---------------------------------------------

describe("F-225m — the shell hygiene batch", () => {
  it("the mobile sheet container no longer carries the dead focus:outline-none", () => {
    const src = read("src/lib/page-layout.ts");
    const sheet = src.slice(src.indexOf("MOBILE_NAV_SHEET"), src.indexOf("MOBILE_NAV_SHEET") + 600);
    expect(sheet).not.toContain("focus:outline-none");
  });
});

// ---- F-225n: the localeRollover comment ------------------------------------

describe("F-225n — the localeRollover YMD-arm note", () => {
  it("the unreachable YMD arm is annotated", () => {
    const src = read("src/lib/csv.ts");
    expect(src).toContain("can only fire in the MDY arm");
  });
});
