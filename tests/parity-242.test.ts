import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-242 (R-39): the source-tier pins for the CSP-inventory,
// test-hygiene, and carrier-truth round. Every pin was born RED over
// the pre-cure tree (the F-242 ledger rows in docs/remediation_plan_v2.md
// carry the verified evidence). Source-scanning contracts per the house
// convention: read the file, assert the contract.

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
}

function listSrcFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "generated") continue; // the regenerated prisma client
      out.push(...listSrcFiles(p));
    // Session-243 (R-40, F-243d): jsx joins the filter — the nine
    // capital-route .jsx bridges were invisible to this genus guard
    // (the parity-229 walker's same gap, widened in the same commit).
    } else if (/\.(tsx?|jsx|css)$/.test(name)) out.push(p);
  }
  return out;
}

// ---- F-242a: the CSP fetch-directive pin (the F-241h rider closed) -----------

describe("F-242a — the CSP carries the pinned fetch directives on the source inventory", () => {
  it("the policy leads with default-src and keeps the frame rule", () => {
    const src = read("next.config.ts");
    expect(src).toContain("default-src 'self'; frame-ancestors 'self'");
  });

  it("the style/image/font/connect directives are pinned (the inventory: zero third-party origins)", () => {
    const src = read("next.config.ts");
    expect(src).toContain(
      "; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; connect-src 'self';",
    );
  });

  it("the dev eval branch survives the pin (the F-235k live lesson)", () => {
    const src = read("next.config.ts");
    expect(src).toContain('process.env.NODE_ENV === "production" ? "" : " \'unsafe-eval\'"');
  });

  it("the manifest-icon caveat is documented at the pin (the siteUrl origin dependency)", () => {
    const src = read("next.config.ts");
    const pin = src.indexOf("key: \"Content-Security-Policy\"");
    expect(pin).toBeGreaterThan(-1);
    // The comment block above the pin carries the inventory's one
    // deployment caveat: the PWA manifest's icon URLs derive from the
    // configured site origin, so a mismatched env must be fixed (or
    // the origin added) — not silently served cross-origin.
    const comment = src.slice(Math.max(0, pin - 1600), pin);
    expect(comment).toContain("manifest");
    expect(comment).toContain("NEXT_PUBLIC_SITE_URL");
  });

  it("the http-headers pin carries the new directive string (the same-commit recalibration)", () => {
    const src = read("tests/http-headers.test.ts");
    // The recalibrated regex's head + the fetch-directive tail, as
    // plain substrings of the pin source (a regex-on-regex form would
    // need double escaping of the pin's own escapes).
    expect(src).toContain("default-src 'self'; frame-ancestors 'self'");
    expect(src).toContain(
      "; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'",
    );
  });
});

// ---- F-242e: the login-card conversion + the genus guard -----------------------

describe("F-242e — no template-literal class strings anywhere in src", () => {
  it("the OTP code-input site rides the cn() appendage form", () => {
    const src = read("src/components/layout/login-card.tsx");
    // The F-229f appendage convention: the base genus string and the
    // layout constant join through cn(), never through string
    // interpolation — a future runtime-value edit must trip the lint
    // shape, not silently emit no CSS under the v4 JIT.
    expect(src).toContain(
      '"flex rounded-lg border border-input bg-white px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"',
    );
    expect(src).toContain("LOGIN_VERIFY_LAYOUT.codeInput,");
  });

  it("the forgot-link site rides the cn() appendage form", () => {
    const src = read("src/components/layout/login-card.tsx");
    expect(src).toContain("cn(LOGIN_LAYOUT.footerLink");
    expect(src).toContain('"font-medium")');
  });

  it("the genus guard: zero interpolated class strings across src", () => {
    const offenders: string[] = [];
    for (const f of listSrcFiles(path.resolve(import.meta.dirname, "..", "src"))) {
      const text = readFileSync(f, "utf8");
      if (text.includes("className={`")) offenders.push(path.basename(f));
    }
    expect(offenders, `files still interpolating class strings:\n  ${offenders.join("\n  ")}`).toEqual([]);
  });
});

// ---- F-242b: the rate-limit battery's cleanup actually reclaims ----------------

describe("F-242b — the cardinality battery's cleanup crosses the pinned watermark", () => {
  it("the cleanup sweep's now is past the crossing leg's pinned watermark", () => {
    const src = read("tests/rate-limit.test.ts");
    // The earlier crossing leg pins the sweep watermark ~4,000,001 ms
    // ahead of ITS wall clock; a cleanup at +120_000 never crosses it
    // (the O(1) skip reclaimed nothing while the comment claimed
    // "restoring headroom"). The fix: a now the watermark cannot
    // outrun within the file's runtime.
    expect(src).toContain("sweepRateLimits(Date.now() + 5_000_000)");
    expect(src).not.toContain("sweepRateLimits(Date.now() + 120_000)");
  });

  it("the reclaimed count is asserted — a gated no-op fails loudly", () => {
    const src = read("tests/rate-limit.test.ts");
    expect(src).toMatch(/const reclaimed = sweepRateLimits\(Date\.now\(\) \+ 5_000_000\);/);
    expect(src).toContain("expect(reclaimed).toBeGreaterThan(0);");
  });

  it("the own-bucket recovery is proven by the remaining-9 form", () => {
    const src = read("tests/rate-limit.test.ts");
    // In the shared overflow bucket the fresh key's remaining would
    // reflect the SHARED count; remaining 9 proves the key earned its
    // OWN bucket back — headroom actually restored.
    expect(src).toContain("expect(fresh.remaining).toBe(9);");
  });
});

// ---- F-242c: the parity-240 F-240b title names the live contract --------------

describe("F-242c — the F-240b leg's title names the live contract", () => {
  it("the title carries the clear-era form, not the retired live-user key", () => {
    const src = read("tests/parity-240.test.ts");
    expect(src).toContain(
      'it("the settings tail branches on UNAUTHORIZED behind the clear-era match (the R-38 recalibration)", () => {',
    );
    expect(src).not.toContain("behind the live-user key");
  });
});

// ---- F-242d: the popover docblock tells the truth about the outside path -------

describe("F-242d — the popover focus-return comments tell the truth about the outside path", () => {
  const carriers = [
    "src/app/(app)/expenses/page.tsx",
    "tests/expenses-popover.test.ts",
    "tests/parity-241.test.ts",
  ];

  it("no carrier claims the outside pointerdown path is naturally spared", () => {
    for (const rel of carriers) {
      expect(read(rel), `${rel} still carries the over-claim`).not.toContain("naturally spared");
    }
  });

  it("the page's comment describes the mousedown focus landing", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toContain("keep whatever focus the mousedown");
  });
});

// ---- F-242f: the neutral-token docblock + the six citation rewords -------------

describe("F-242f — the globals/page-layout comment truths", () => {
  it("the neutral-token docblock names the actual retired set (no live token retired in prose)", () => {
    const src = read("src/app/globals.css");
    // The session-228 docblock declared the secondary token LIVE and
    // retired in the same breath; the reworded retired set is the
    // accent family, the muted pair, and the popover pair.
    const block = src.slice(
      src.indexOf("of the shadcn neutral semantic set"),
      src.indexOf("--color-input:"),
    );
    expect(block).toContain("retired set");
    expect(block).not.toMatch(/\(the secondary,/);
  });

  it("the globals citations are token-form (no backticked utility citations)", () => {
    const src = read("src/app/globals.css");
    // The F-224v doctrine: prose names the token, never the utility
    // form — a citation outliving its utility silently re-emits it.
    expect(src).not.toContain("`text-primary-navy`");
    expect(src).not.toContain("`text-card-foreground`");
    expect(src).not.toContain("`bg-card`");
    expect(src).not.toContain("`bg-background`");
  });

  it("the page-layout citations are token/property form", () => {
    const src = read("src/lib/page-layout.ts");
    expect(src).not.toContain("(`bg-card`");
    expect(src).not.toContain("overflow-y-auto — the sheet scrolls");
  });
});

// ---- F-242g: the two F-239c rationales record the true mechanism ---------------

describe("F-242g — the two F-239c rationales record the true mechanism", () => {
  const carriers = [
    "src/app/(app)/analytics/page.tsx",
    "src/components/shared/page-parts.tsx",
  ];

  it("both carriers cite the loading gate (the invariant that makes them inert)", () => {
    for (const rel of carriers) {
      expect(read(rel), `${rel} does not record the gate dependency`).toContain("loading gate");
    }
  });

  it("neither carrier claims a live server/client text mismatch (the gate precludes it)", () => {
    for (const rel of carriers) {
      const src = read(rel);
      // Per-phrase matching (the F-239f authoring lesson): the
      // original rationale wraps across lines, so a contiguous
      // sentence match can never see it. The reworded comments
      // describe the gate mechanism and never claim the mismatch.
      expect(src, `${rel} still describes the impossible mismatch`).not.toContain(
        "different calendar dates",
      );
      expect(src).not.toContain("calendar divergence");
    }
  });
});
