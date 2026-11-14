// Session-224 (R-21): the date-guard completion and
// resilience-surface round's source pins. Every pin was born RED
// against the pre-round tree and carries its finding's citation.
// The round's verified defects: localeRollover's year-length gate
// read the MDY year group only (every YMD rolled date staged
// silently); the verify route's no-pending branch answered "5
// attempts remaining" — a value the genuine wrong-code ladder can
// never produce (the numeric tell the F-223l form-unification left);
// MONTH_ONLY's $-anchor missed time-suffixed month-year forms and
// the REVERSED twins were never covered; a failed logout POST was
// silently treated as success (the store discarded the result);
// global-error.tsx — the third resilience face — missed the F-222f
// dark-arm family (its recovery ring invisible under a surviving
// html.dark); LoadingBlock was unannounced; the error face rendered
// landmark-less; no skip-to-content mechanism existed; page-parts
// carried a dead import; --color-danger-soft had no .dark flip; the
// dropdown docblock cited CRM-era surfaces; Tailwind v4's content
// detection scanned skills/tests/docs so prose emitted production
// CSS; two stale comments asserted the cured pill was green-700.
// The behavioral csv/store pins live in tests/csv.test.ts and
// tests/store-logout.test.ts; the e2e legs (logout-revocation
// replay, verify byte-identical, phone-dark a11y ×9, the skip-link
// Tab-focus) live in tests/e2e/.
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = (p: string) => readFileSync(p, "utf8");

// ---- F-224b: the verify no-pending branch answers the first rung -------------

describe("F-224b — the verify no-pending branch carries no numeric tell", () => {
  it("the no-pending reply is the FIRST rung (MAX-1), matching a fresh pending code's single-probe reply", () => {
    const src = read("src/app/api/auth/verify/route.ts");
    expect(src).toContain("verificationRemainingMessage(VERIFICATION_MAX_ATTEMPTS - 1)");
  });

  it("the residual two-probe differential is documented (full closure needs state the branch cannot hold)", () => {
    const src = read("src/app/api/auth/verify/route.ts");
    expect(src).toContain("two-probe");
  });
});

// ---- F-224e: the logout failure surfaces — the honest sign-out ---------------

describe("F-224e — a failed logout POST is not silently treated as success", () => {
  it("the store's logout checks the call result before clearing", () => {
    const src = read("src/stores/wealthos-store.ts");
    // Session-241 (R-38, F-241a): the window widened — logout's entry
    // now carries the clear intent era bump (its own rationale block)
    // between the declaration and the POST call.
    expect(src).toMatch(/logout: async \(\)[\s\S]{0,900}const res = await call\("\/api\/auth\/logout"/);
    expect(src).toMatch(/if \(!res\.ok\)/);
  });

  it("the failure arm surfaces through the error state and returns false (the session stays honest)", () => {
    const src = read("src/stores/wealthos-store.ts");
    expect(src).toMatch(/if \(!res\.ok\) \{[\s\S]{0,300}error: res\.error[\s\S]{0,200}return false;/);
    expect(src).toMatch(/return true;\s*\},/);
  });

  it("both signOut helpers gate their navigation on the logout result", () => {
    for (const f of ["src/components/layout/sidebar.tsx", "src/components/layout/mobile-nav.tsx"]) {
      const src = read(f);
      expect(src).toMatch(/if \(!\(await logout\(\)\)\) return;/);
    }
  });
});

// ---- F-224p: global-error joins the F-222f dark-arm family -------------------

describe("F-224p — global-error.tsx carries the dark arms (the third resilience face)", () => {
  it("the body wash and inks flip in dark mode (the error.tsx genus)", () => {
    const src = read("src/app/global-error.tsx");
    expect(src).toContain("dark:bg-[#0a0a0a]");
    expect(src).toMatch(/dark:text-stone-400/);
    expect(src).toMatch(/dark:text-stone-100/);
  });
});

// ---- F-224aa: the loading gate announces; the error face has a landmark ------

describe("F-224aa — LoadingBlock announces; the error face regains <main>", () => {
  // Session-232 (R-29, F-232e): the announcement moved — a live region
  // that ARRIVES with its content is not announced (the F-218h genus),
  // so the role/status div left LoadingBlock (now the visual only) for
  // the ALWAYS-MOUNTED sr-only region in app-shell, outside main. The
  // contract stands, at its new seam; pinned in parity-232.
  it("the shell's always-mounted region carries role=status + aria-live=polite", () => {
    const shell = read("src/components/layout/app-shell.tsx");
    expect(shell).toMatch(/role="status"/);
    expect(shell).toMatch(/aria-live="polite"/);
  });

  it("the error boundary card renders inside a <main> landmark", () => {
    const src = read("src/app/error.tsx");
    expect(src).toMatch(/<main/);
  });
});

// ---- F-224s: the skip-to-content bypass --------------------------------------

describe("F-224s — the skip-to-content link (WCAG 2.4.1 bypass blocks)", () => {
  it("the shell renders the skip link as its FIRST child, before the sidebar", () => {
    const src = read("src/components/layout/app-shell.tsx");
    const rootAt = src.indexOf('<div className={SHELL_LAYOUT.root}>');
    const skipAt = src.indexOf('href="#main-content"');
    const sidebarAt = src.indexOf("<Sidebar");
    expect(rootAt).toBeGreaterThan(-1);
    expect(skipAt).toBeGreaterThan(rootAt);
    expect(skipAt).toBeLessThan(sidebarAt);
  });

  it("the link is visually hidden until focus (the sr-only/not-sr-only pattern)", () => {
    const src = read("src/components/layout/app-shell.tsx");
    expect(src).toMatch(/sr-only focus:not-sr-only/);
  });

  it("the main scroller carries the target id", () => {
    const src = read("src/components/layout/app-shell.tsx");
    expect(src).toMatch(/<main[^>]*id="main-content"/);
  });
});

// ---- F-224q: the dead import retired; the latent dark flip lands -------------

describe("F-224q — the dead import retired, the danger-soft dark flip lands", () => {
  it("page-parts no longer imports the unused Card/CardContent", () => {
    const src = read("src/components/shared/page-parts.tsx");
    expect(src).not.toMatch(/from "@\/components\/ui\/card"/);
  });

  it("--color-danger-soft flips in .dark (the latent F-222k-class trap armed)", () => {
    const css = read("src/app/globals.css");
    const darkAt = css.indexOf(".dark {");
    const flipAt = css.indexOf("--color-danger-soft", darkAt);
    expect(flipAt).toBeGreaterThan(-1);
  });

  it("the dropdown docblock cites WealthOS surfaces, not the CRM-era ones", () => {
    const src = read("src/components/ui/dropdown.tsx");
    expect(src).not.toContain("quick-create + export dropdowns");
  });
});

// ---- F-224t: the reserved-token families are documented ----------------------

describe("F-224t — the reserved-but-unwired token families carry the drift warning", () => {
  it("globals.css notes the chart/radius families are reserved (not the live chart path)", () => {
    const css = read("src/app/globals.css");
    expect(css).toMatch(/reserved-but-unwired/i);
  });
});

// ---- F-224v: the content-detection set excludes the prose carriers ------------

describe("F-224v — @source not excludes skills/tests/docs/scripts from content detection", () => {
  it("globals.css carries the four negative-source directives", () => {
    const css = read("src/app/globals.css");
    expect(css).toContain('@source not "../../skills"');
    expect(css).toContain('@source not "../../tests"');
    expect(css).toContain('@source not "../../docs"');
    expect(css).toContain('@source not "../../scripts"');
  });
});

// ---- F-224f: the stale pill comments cured -----------------------------------

describe("F-224f — no comment asserts the cured pill is green-700", () => {
  it("the sidebar and mobile pill comments cite the F-223f pairing, not green-700", () => {
    const sidebar = read("src/components/layout/sidebar.tsx");
    const layout = read("src/lib/page-layout.ts");
    for (const src of [sidebar, layout]) {
      expect(src).not.toMatch(/green-700 = the AA/);
    }
  });
});

// ---- F-224y: the brand wordmark carries the logo-exemption citation ----------

describe("F-224y — the brandWordmark cites the logo exemption + the measured ratios", () => {
  it("the constant's comment records the WCAG 1.4.3 brand-name exemption", () => {
    const src = read("src/lib/page-layout.ts");
    // The citation sits directly ABOVE the constant (F-224y).
    expect(src).toMatch(/F-224y[\s\S]{0,500}brandWordmark/);
    expect(src).toMatch(/part of a logo or brand name/);
  });
});
