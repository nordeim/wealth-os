import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-20: the HTTP response-header layer — the surface never swept
// before (the reference's edge-injected security set + the static-file
// content-types). Every pin below is HTTP-verified against the live
// reference (2026-10-01 census, curl -I / curl -D - GET probes):
//   - the reference ships `referrer-policy: strict-origin-when-cross-origin`
//     on EVERY response — login, /Dashboard, /Leads, /settings, /signup,
//     /Reports, the CSS asset, /manifest.json (after its 302 → the
//     /api/apps/manifests/… hop), and its SPA-fallback 200s;
//   - it ships `x-content-type-options: nosniff` on the same census;
//   - it ships `strict-transport-security: max-age=31536000` (bare
//     max-age — no includeSubDomains, no preload) on its HTML routes and
//     the CSS asset (its platform edge, Cloudflare/Caddy, injects the
//     set; the self-hosted expression is next.config.ts headers());
//   - its /sitemap.xml serves content-type `application/xml` — BARE, no
//     charset suffix (ours shipped `application/xml; charset=utf-8`, the
//     s18 "viewport 1 vs 1.0" cosmetic-serialization class);
//   - its /robots.txt serves `text/plain; charset=utf-8` and its manifest
//     `application/json` — ours already match exactly (regression guards
//     below).
//
// The source reads are existence-guarded so the red state fails
// check-by-check instead of erroring the file (the s18/s19 pattern).

const repoFile = (rel: string) =>
  path.resolve(import.meta.dirname, "..", rel);

const readOr = (rel: string): string => {
  const p = repoFile(rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
};

const configSrc = () => readOr("next.config.ts");
const sitemapSrc = () => readOr("src/app/sitemap.xml/route.ts");
const robotsSrc = () => readOr("src/app/robots.txt/route.ts");
const manifestSrc = () => readOr("src/app/manifest.json/route.ts");

describe("session-20: the security-header set (S20-P1/P2/P3)", () => {
  it("next.config.ts declares an async headers() field", () => {
    const src = configSrc();
    expect(src).toMatch(/async\s+headers\s*\(\s*\)\s*\{/);
  });

  it("headers() covers every path (source: \"/:path*\")", () => {
    const src = configSrc();
    expect(src).toContain('source: "/:path*"');
  });

  it("ships Referrer-Policy: strict-origin-when-cross-origin (S20-P1)", () => {
    const src = configSrc();
    expect(src).toMatch(
      /key:\s*"Referrer-Policy",\s*value:\s*"strict-origin-when-cross-origin"/,
    );
  });

  it("ships X-Content-Type-Options: nosniff (S20-P2)", () => {
    const src = configSrc();
    expect(src).toMatch(
      /key:\s*"X-Content-Type-Options",\s*value:\s*"nosniff"/,
    );
  });

  it("ships Strict-Transport-Security: max-age=31536000 — bare, the reference's exact value (S20-P3)", () => {
    const src = configSrc();
    expect(src).toMatch(
      /key:\s*"Strict-Transport-Security",\s*value:\s*"max-age=31536000"/,
    );
    // The reference ships NO includeSubDomains and NO preload — the pin
    // must not invent them.
    expect(src).not.toMatch(/includeSubDomains/);
    expect(src).not.toMatch(/preload/);
  });

  it("the standing config pins survive (standalone output + tracing root + no dev indicator)", () => {
    const src = configSrc();
    expect(src).toContain('output: "standalone"');
    expect(src).toContain("outputFileTracingRoot");
    expect(src).toContain("devIndicators: false");
  });
});

describe("session-20: the static-file content-types (S20-P4)", () => {
  it("sitemap.xml serves bare application/xml — no charset suffix", () => {
    const src = sitemapSrc();
    expect(src).toContain('"content-type": "application/xml"');
    expect(src).not.toContain('"application/xml; charset=utf-8"');
  });

  it("robots.txt keeps its reference-matching text/plain; charset=utf-8 (regression guard)", () => {
    const src = robotsSrc();
    expect(src).toContain('"content-type": "text/plain; charset=utf-8"');
  });

  it("manifest.json keeps its reference-matching application/json (regression guard)", () => {
    const src = manifestSrc();
    expect(src).toContain('"content-type": "application/json"');
  });
});

// Session-217 (R-14, F-217g/F-217h — the response-hardening pair):
// (g) the API envelope carried no Cache-Control — financial-data GETs
//     (/api/transactions, /api/dashboard, /api/export — the GDPR dump)
//     could be heuristically cached by browsers/intermediaries. The
//     cure: `Cache-Control: no-store` on the ok()/fail() envelope (the
//     uploads GET keeps its own immutable caching — capability URLs).
// (h) the app shipped no frame-ancestors — the authed surfaces were
//     framable (the JSON CSRF gate + SameSite=Lax constrain practical
//     exploitation; the header closes the class). A functional
//     superset, sanctioned by the parity doctrine.

describe("session-217: the response-hardening pair (F-217g/F-217h)", () => {
  it("the envelope sets Cache-Control: no-store on ok()", async () => {
    const { ok } = await import("@/lib/api");
    const res = ok({ x: 1 });
    expect(res.headers.get("cache-control")).toBe("no-store");
  });

  it("the envelope sets Cache-Control: no-store on fail() and the 429 arm", async () => {
    const { ERR } = await import("@/lib/api");
    expect(ERR.BAD_REQUEST("x").headers.get("cache-control")).toBe("no-store");
    expect(ERR.RATE_LIMITED(30).headers.get("cache-control")).toBe("no-store");
  });

  it("next.config.ts ships Content-Security-Policy: frame-ancestors 'self' (F-217h)", () => {
    const src = configSrc();
    expect(src).toMatch(
      /key:\s*"Content-Security-Policy",\s*value:\s*"frame-ancestors 'self'"/,
    );
  });

  it("the bare-HSTS reference-parity pins survive the addition", () => {
    const src = configSrc();
    expect(src).not.toMatch(/includeSubDomains/);
    expect(src).not.toMatch(/preload/);
  });
});

// Session-218 (R-15, F-218c): /api/export — the GDPR dump — returned a
// raw NextResponse (Content-Type + Content-Disposition only) and never
// rode the ok()/fail() envelope whose F-217g no-store api.ts's own
// comment claims for it ("transactions, dashboard, export — the GDPR
// dump"). Live-reproduced: the authenticated 200 answered cc:null.
describe("session-218: the export route carries the no-store posture (F-218c)", () => {
  it("/api/export sets Cache-Control: no-store on the dump", () => {
    const src = readFileSync(repoFile("src/app/api/export/route.ts"), "utf-8");
    expect(src).toMatch(/"Cache-Control":\s*"no-store"/);
  });

  it("the Content-Disposition attachment survives the addition (the download contract)", () => {
    const src = readFileSync(repoFile("src/app/api/export/route.ts"), "utf-8");
    expect(src).toMatch(/Content-Disposition/);
    expect(src).toMatch(/wealthos-export\.json/);
  });
});
