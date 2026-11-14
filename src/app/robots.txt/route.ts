import { siteUrl } from "@/lib/site";

// Session-18 (S18-P4): /robots.txt — the reference's exact format
// (byte-verified 2026-10-01: LF-only, no trailing newline, lower-case
// "User-agent", one blank line before the Sitemap entry). Served through
// an explicit route handler because Next's robots.ts serializer emits
// "User-Agent" (capital A) — a cosmetic drift from the reference's
// "User-agent". Static content: prerendered at build time (NEXT_PUBLIC_
// SITE_URL is inlined — set it before `bun run build` in production).
export const dynamic = "force-static";

export function GET(): Response {
  const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl()}/sitemap.xml`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
