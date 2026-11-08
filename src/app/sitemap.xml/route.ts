import { siteUrl } from "@/lib/site";

// Session-201 (D-201a): /sitemap.xml — the WealthOS reference's URL set,
// fetched live 2026-11-08: 9 URLs — the root at priority "1.0" plus the
// eight finance sections (Accounts, Analytics, Expenses, Goals, Import,
// Income, Investments, Settings) at "0.8", changefreq weekly, LF-only, no
// trailing newline, 4-space URL indent. Served through an explicit route
// handler because Next's sitemap.ts serializer DROPS the number formatting
// ("1.0" serializes as "1") — and its MetadataRoute type spells the field
// changeFrequency, easy to mis-pin.
// The reference's locs are CAPITALIZED (/Accounts…) — its platform routes
// case-insensitively; our router is case-sensitive (the documented s14
// decision), so this sitemap lists the real lowercase routes the router
// actually serves. The reference lists NO /Dashboard (its root IS the
// dashboard for signed-in visitors) and no auth pages — mirrored exactly.
// The scaffold-era CRM list (contacts/leads/calendar/activities/reports/
// profile + the s142 /about + /contact marketing pair) died with the
// session-199 transformation — every one of those locs 404'd here.
export const dynamic = "force-static";

const ROUTES: Array<{ path: string; priority: string }> = [
  { path: "/", priority: "1.0" },
  { path: "/accounts", priority: "0.8" },
  { path: "/analytics", priority: "0.8" },
  { path: "/expenses", priority: "0.8" },
  { path: "/goals", priority: "0.8" },
  { path: "/import", priority: "0.8" },
  { path: "/income", priority: "0.8" },
  { path: "/investments", priority: "0.8" },
  { path: "/settings", priority: "0.8" },
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
