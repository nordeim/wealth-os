import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-18: the DOCUMENT METADATA layer — the <head> surface never swept
// before (meta description, OpenGraph/Twitter cards, favicon, robots.txt,
// sitemap.xml). Every pin below is DOM/HTTP-verified against the live
// reference (2026-10-01 audit):
//   - the reference's meta[name=description] is a reference marketing
//     paragraph (em-dash at char 321) — mirrored verbatim;
//   - the reference ships og:title/description/image/url/type/site_name +
//     twitter:card summary_large_image / title / description / image / url;
//   - the reference ships a PNG favicon; ours is the app-router file
//     convention (src/app/icon.png → <link rel=icon> injected by Next);
//   - the reference serves /sitemap.xml (9 URLs, weekly, 1.0/0.8) and a
//     robots.txt with a Sitemap line. OUR sitemap lists the CAPITAL
//     locs (F-217f, session 217: the reference's own casing — the
//     lowercase twins self-canonicalize to the homepage, so the
//     metadata-rich Capital routes are the crawlable truth);
//   - the reference's og:image/favicon URLs are its platform's CDN assets —
//     the self-hosted expression is OUR public/og-image.png (1200×630).
//
// Session-201 (D-201a): the sitemap pins re-anchored to the WealthOS
// reference's own URL set (its sitemap fetched live 2026-11-08: the root
// at 1.0 plus the eight finance sections at 0.8). The scaffold-era pins
// still named the NEO-CRM route list — eight locs that 404 on this app
// since the session-199 transformation; a green pin on a dead sitemap
// was the exact failure mode this file exists to prevent.
//
// NEXT_PUBLIC_SITE_URL was documented in .env.example/README/CLAUDE as
// "used for metadata, sitemap.xml, and robots.txt" but consumed NOWHERE
// before this session — the siteUrl() seam closes that documented gap.
//
// The seam imports are DYNAMIC (and the source reads existence-guarded)
// so the red state fails check-by-check instead of erroring the file.

const REFERENCE_DESCRIPTION =
  "WealthOS is a premium finance suite that brings your whole financial life into one polished dashboard. Track income and expenses, manage bank accounts, follow your investments, and set savings goals — with budgeting insights, AI-powered coaching, and rich analytics that turn raw transactions into clear decisions.";

const repoFile = (rel: string) =>
  path.resolve(import.meta.dirname, "..", rel);

const readOr = (rel: string): string => {
  const p = repoFile(rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
};

const layoutSrc = () => readOr("src/app/layout.tsx");
const sitemapSrc = () => readOr("src/app/sitemap.xml/route.ts");
const robotsSrc = () => readOr("src/app/robots.txt/route.ts");

describe("session-18: the siteUrl seam (S18-P4)", () => {
  it("falls back to the canonical localhost origin when the env var is unset", async () => {
    const { DEFAULT_SITE_URL, siteUrl } = await import("@/lib/site");
    expect(siteUrl(undefined)).toBe(DEFAULT_SITE_URL);
    expect(DEFAULT_SITE_URL).toBe("http://localhost:3000");
  });

  it("honors NEXT_PUBLIC_SITE_URL and strips trailing slashes", async () => {
    const { siteUrl } = await import("@/lib/site");
    expect(siteUrl("https://crm.example.com")).toBe("https://crm.example.com");
    expect(siteUrl("https://crm.example.com/")).toBe("https://crm.example.com");
    expect(siteUrl("  ")).toBe("http://localhost:3000");
  });

  it("is consumed by the metadata surface (layout, sitemap, robots)", () => {
    expect(layoutSrc()).toContain('from "@/lib/site"');
    expect(sitemapSrc()).toContain('from "@/lib/site"');
    expect(robotsSrc()).toContain('from "@/lib/site"');
  });
});

describe("session-18: meta description parity (S18-P1)", () => {
  it("ships the reference's exact reference paragraph", async () => {
    const { SITE_DESCRIPTION } = await import("@/lib/site");
    expect(SITE_DESCRIPTION).toBe(REFERENCE_DESCRIPTION);
    expect(REFERENCE_DESCRIPTION).toHaveLength(314);
    // The em-dash (U+2014) at char 321 — never a hyphen drift.
    expect(REFERENCE_DESCRIPTION.charCodeAt(199)).toBe(0x2014);
  });

  it("wires the description into the root layout metadata", () => {
    expect(layoutSrc()).toContain("description: SITE_DESCRIPTION");
  });
});

describe("session-18: OpenGraph + Twitter cards (S18-P2)", () => {
  it("declares the reference's openGraph block", () => {
    const src = layoutSrc();
    expect(src).toContain("openGraph:");
    expect(src).toMatch(/title:\s*"WealthOS"/);
    expect(src).toContain('type: "website"');
    expect(src).toContain('siteName: "WealthOS"');
    expect(src).toContain("description: SITE_DESCRIPTION");
  });

  it("declares the 1200x630 social card image", () => {
    const src = layoutSrc();
    expect(src).toContain('url: "/og-image.png"');
    expect(src).toContain("width: 1200");
    expect(src).toContain("height: 630");
  });

  it("declares the reference's twitter card family", () => {
    const src = layoutSrc();
    expect(src).toContain("twitter:");
    expect(src).toContain('card: "summary_large_image"');
    // twitter:url — emitted through the `other` escape hatch because the
    // Next twitter metadata object has no url field (verified against
    // next 16.3.6's metadata-types).
    expect(src).toMatch(/"twitter:url":\s*siteUrl\(\)/);
  });

  it("anchors every relative URL on metadataBase from the seam", () => {
    expect(layoutSrc()).toContain("metadataBase: new URL(siteUrl())");
  });
});

describe("session-18: the favicon (S18-P3)", () => {
  it("ships the app-router icon file (file-convention favicon)", () => {
    const icon = repoFile("src/app/icon.png");
    expect(existsSync(icon)).toBe(true);
    const buf = readFileSync(icon);
    expect(buf.length).toBeGreaterThan(1000);
    // PNG magic bytes.
    expect([...buf.slice(0, 8)]).toEqual([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);
  });

  it("ships the 1200x630 OG image as a public asset", () => {
    const og = repoFile("public/og-image.png");
    expect(existsSync(og)).toBe(true);
    const buf = readFileSync(og);
    expect([...buf.slice(0, 8)]).toEqual([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);
    // IHDR: bytes 16-23 are width/height, big-endian.
    expect(buf.readUInt32BE(16)).toBe(1200);
    expect(buf.readUInt32BE(20)).toBe(630);
  });
});

describe("session-18: sitemap.xml + robots.txt (S18-P4)", () => {
  it("serves the reference's nine WealthOS URLs at the Capital metadata-rich twins", () => {
    const src = sitemapSrc();
    // The WealthOS reference's sitemap (fetched live 2026-11-08; casing
    // re-verified 2026-11-10): 9 URLs — the root at 1.0 plus Accounts/
    // Analytics/Expenses/Goals/Import/Income/Investments/Settings at 0.8.
    // Session-217 (R-14, F-217f): the locs moved to the CAPITAL twins —
    // the reference's own casing AND the only form that carries per-route
    // metadata (the lowercase page.tsx files are "use client" and cannot
    // export metadata, so the lowercase locs self-canonicalized every
    // sitemap URL to the homepage — functionally inert for crawlers).
    // The route twins serve BOTH casings (ADR-004), so nothing 404s
    // either way; the s14 case-sensitivity concern is moot for the
    // listed set.
    for (const route of [
      "/",
      "/Accounts",
      "/Analytics",
      "/Expenses",
      "/Goals",
      "/Import",
      "/Income",
      "/Investments",
      "/Settings",
    ]) {
      expect(src).toContain(`{ path: "${route}"`);
    }
    // The cadence: weekly across the board, 1.0 for the root, 0.8 for the
    // rest — as STRING literals because the reference's bytes say "1.0"
    // (a JS number would serialize as "1").
    expect(src).toContain('<changefreq>weekly</changefreq>');
    expect(src).toContain('priority: "1.0"');
    expect(src).toContain('priority: "0.8"');
    // The metadata-poor lowercase twins are gone from the loc set.
    expect(src).not.toContain('{ path: "/accounts"');
  });

  it("session-201 (D-201a): carries no loc the router does not serve", () => {
    const src = sitemapSrc();
    // The session-199 transformation rebuilt the route tree, but the
    // scaffold-era sitemap kept advertising the NEO-CRM sections plus the
    // s142 marketing pair — eight locs that 404 on this app. A sitemap
    // entry names a route the router serves; this pin guards that
    // contract so the class cannot regress silently.
    for (const dead of [
      "/contacts",
      "/leads",
      "/calendar",
      "/activities",
      "/reports",
      "/profile",
      "/about",
      "/contact",
    ]) {
      expect(src).not.toContain(`{ path: "${dead}"`);
    }
  });

  it("serves robots.txt in the reference's byte format", () => {
    // The reference's robots.txt (byte-verified): "User-agent" with a
    // LOWERCASE a, LF-only, no trailing newline, one blank line before
    // the Sitemap line. Next's robots.ts serializer emits "User-Agent"
    // (capital A) — hence the explicit route handler.
    const src = robotsSrc();
    expect(src).toContain("User-agent: *\nAllow: /\n\nSitemap: ");
    expect(src).toContain("${siteUrl()}/sitemap.xml");
    expect(src).toContain('export const dynamic = "force-static"');
  });

  it("retires the static public/robots.txt (route conflict)", () => {
    expect(existsSync(repoFile("public/robots.txt"))).toBe(false);
  });
});
