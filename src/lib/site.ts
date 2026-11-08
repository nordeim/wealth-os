// Canonical site origin seam (contract pinned by tests/metadata.test.ts
// and tests/pwa-metadata.test.ts).
//
// NEXT_PUBLIC_SITE_URL has been documented in .env.example / README / CLAUDE
// as "used for metadata, sitemap.xml, and robots.txt" since the scaffold —
// but before session-18 it was consumed NOWHERE. Every metadata surface
// (the root layout's metadataBase + OG/Twitter cards, app/sitemap.ts,
// app/robots.ts) derives from siteUrl() so the documented contract is
// finally true.
//
// Session-19 extended the seam with the per-route metadata factory: the
// reference ships PER-ROUTE canonical/OG/Twitter on every inner page
// (og:title "<Page> | WealthOS", og:url origin+route, og:description
// "<Page> on WealthOS. " + the root paragraph — live-verified on all 10
// routes 2026-10-01), so the pages build their metadata through
// pageMetadata() instead of hand-rolling ten copies.
//
// NEXT_PUBLIC_* values are INLINED AT BUILD TIME by Next — set the variable
// before `bun run build` in production (docs/DEPLOYMENT.md).

import type { Metadata } from "next";

export const DEFAULT_SITE_URL = "http://localhost:3000";

/** The reference's meta description, mirrored verbatim (405 chars). */
export const SITE_DESCRIPTION =
  "WealthOS is a premium finance suite that brings your whole financial life into one polished dashboard. Track income and expenses, manage bank accounts, follow your investments, and set savings goals — with budgeting insights, AI-powered coaching, and rich analytics that turn raw transactions into clear decisions.";

/**
 * Canonical public origin: NEXT_PUBLIC_SITE_URL when set (trailing slashes
 * stripped — URL composition below always appends paths), otherwise the
 * localhost dev default.
 */
export function siteUrl(
  env: string | undefined = process.env.NEXT_PUBLIC_SITE_URL,
): string {
  const raw = (env ?? "").trim();
  if (!raw) return DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, "");
}

/**
 * Session-19: the per-route OG description prefix — every
 * inner page's og/twitter description is
 * `"<Page> on WealthOS. " + <the 405-char root paragraph>`
 * (live-verified on the reference's inner pages; consumed here by the
 * eight section pages + login/signup/reset-password through
 * pageMetadata(); the root and /Dashboard inherit the layout's
 * metadata wholesale — the unprefixed family).
 */
export function pageOgDescription(page: string): string {
  return `${page} on WealthOS. ${SITE_DESCRIPTION}`;
}

/**
 * Session-19: the three PWA metas the reference ships in its <head>
 * (mobile-web-app-capable + the apple pair). Next's Metadata object has
 * no first-class fields for them, so they ride `metadata.other` — and
 * because page-level metadata REPLACES the layout's `other` map (shallow
 * merge), the per-page factory re-declares them on every page.
 */
export const PWA_META: Record<string, string> = {
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-status-bar-style": "black",
  "apple-mobile-web-app-title": "WealthOS",
};

/**
 * Session-19: the per-route metadata factory. The reference ships
 * PER-ROUTE canonical + OG/Twitter (og:title "<Page> | WealthOS",
 * og:url origin+route, the prefixed description, twitter:title/url —
 * live-verified on all 10 routes); Next shallow-merges page metadata over
 * the layout's, so every page re-declares the FULL openGraph/twitter/
 * other sets (otherwise the page would lose the layout's images/card/
 * PWA metas). The OG image is static across the reference's routes (the
 * same URL on root and inner pages — verified), so /og-image.png ships
 * everywhere.
 *
 * - `page: null` → the unprefixed root/login family ("WealthOS" + the
 *   plain paragraph). Login keeps its ABSOLUTE title (the s13
 *   anti-doubling pin); pass `title` for other absolute spellings
 *   (signup: "Sign up | WealthOS").
 * - The dashboard needs NO factory call — it inherits the root layout's
 *   metadata wholesale (og:url = the origin root, which is exactly the
 *   reference's unprefixed family for / and /Dashboard).
 */
export function pageMetadata(opts: {
  page: string | null;
  route: string;
  title?: string;
}): Metadata {
  const page = opts.page;
  const fullTitle = page !== null ? `${page} | WealthOS` : "WealthOS";
  const description = page !== null ? pageOgDescription(page) : SITE_DESCRIPTION;
  return {
    title:
      opts.title !== undefined
        ? { absolute: opts.title }
        : page !== null
          ? page
          : { absolute: "WealthOS" },
    alternates: { canonical: opts.route },
    openGraph: {
      title: fullTitle,
      description,
      url: opts.route,
      type: "website",
      siteName: "WealthOS",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og-image.png"],
    },
    other: {
      "twitter:url": `${siteUrl()}${opts.route}`,
      ...PWA_META,
    },
  };
}
