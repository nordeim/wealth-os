import { siteUrl } from "@/lib/site";

// Session-201 (D-201a): /sitemap.xml — the WealthOS reference's URL set,
// fetched live 2026-11-08: 9 URLs — the root at priority "1.0" plus the
// eight finance sections (Accounts, Analytics, Expenses, Goals, Import,
// Income, Investments, Settings) at "0.8", changefreq weekly, LF-only, no
// trailing newline, 4-space URL indent. Served through an explicit route
// handler because Next's sitemap.ts serializer DROPS the number formatting
// ("1.0" serializes as "1") — and its MetadataRoute type spells the field
// changeFrequency, easy to mis-pin.
// Session-217 (R-14, F-217f): the locs are the CAPITAL twins — the
// reference's own casing (re-verified live 2026-11-10). Both casings
// carry per-route metadata since F-226b (the lowercase sections'
// pass-through segment layouts mirror the capital bridges' own
// pageMetadata() calls — the "use client" pages render unchanged
// inside them), so the casing choice is the reference's parity, not
// a metadata workaround. The route twins (ADR-004) serve BOTH
// casings, so every loc resolves.
// The reference lists NO /Dashboard (its root IS the dashboard for
// signed-in visitors) and no auth pages — mirrored exactly.
export const dynamic = "force-static";

const ROUTES: Array<{ path: string; priority: string }> = [
  { path: "/", priority: "1.0" },
  { path: "/Accounts", priority: "0.8" },
  { path: "/Analytics", priority: "0.8" },
  { path: "/Expenses", priority: "0.8" },
  { path: "/Goals", priority: "0.8" },
  { path: "/Import", priority: "0.8" },
  { path: "/Income", priority: "0.8" },
  { path: "/Investments", priority: "0.8" },
  { path: "/Settings", priority: "0.8" },
];

export function GET(): Response {
  const origin = siteUrl();
  const urls = ROUTES.map(
    ({ path, priority }) => `    <url>
        <loc>${origin}${path}</loc>
        <changefreq>weekly</changefreq>
        <priority>${priority}</priority>
    </url>`,
  ).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, {
    // Session-20 (S20-P4): bare `application/xml` — the reference's exact
    // content-type (GET-verified 2026-10-01; ours had shipped a charset
    // suffix, the s18 "viewport 1 vs 1.0" cosmetic-serialization class).
    headers: { "content-type": "application/xml" },
  });
}
