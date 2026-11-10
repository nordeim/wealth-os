import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/toast";
import { ThemeProvider } from "@/components/layout/theme";
import { PWA_META, SITE_DESCRIPTION, siteUrl } from "@/lib/site";
import "./globals.css";

// Session-22 (S22-P1): the Inter webfont is RETIRED. The reference app
// ships ZERO webfonts — no @font-face rule in its 79.5KB stylesheet,
// document.fonts empty, every surface computing Tailwind's stock default
// sans stack (byte-extracted from its preflight html rule). The scaffold's
// next/font/google Inter made every text surface render in the wrong
// typeface (measured: same 62-char string at 16px — reference 466.8px/
// 522.4px regular/bold vs ours 439px/451.3px). The reference's EXACT
// stack is pinned in globals.css @theme --font-sans (Tailwind 4.3's own
// default is the v4.0 -apple-system list and NOT byte-identical).

export const metadata: Metadata = {
  // Session-18: the document metadata layer — the reference's 405-char
  // description paragraph + the full OG/Twitter card family + the
  // build-time-inlined canonical origin (NEXT_PUBLIC_SITE_URL, consumed
  // through src/lib/site.ts since that session).
  // Session-19: + the PWA/installable family (the manifest link, the
  // apple-touch-icon, the mobile-web-app-capable/apple metas, the
  // #000000 theme-color — all live-verified on the reference) + the root
  // canonical link (the reference ships link[rel=canonical] per-route).
  // The apple-touch-icon rides the src/app/apple-icon.png FILE
  // CONVENTION (180x180 BrandMark tile) — declaring metadata.icons would
  // REPLACE the file-convention link[rel=icon] (gate-caught: the s18
  // favicon test failed with icons present), so both icons ship as file
  // conventions and this object declares NEITHER.
  metadataBase: new URL(siteUrl()),
  manifest: `${siteUrl()}/manifest.json`,
  title: {
    default: "WealthOS",
    // Session-10 (S10-10): the reference's separator is a pipe
    // ("Accounts | WealthOS" — document.title probes on all 10 routes).
    template: "%s | WealthOS",
  },
  description: SITE_DESCRIPTION,
  // The reference's canonical link: origin + route (the dashboard's is
  // the bare origin). Next's URL resolution strips the root's trailing
  // slash (verified live: `${siteUrl()}/` emits the same slashless href —
  // the s18 "viewport 1 vs 1.0" cosmetic-serialization class). Inner
  // pages override this through pageMetadata().
  alternates: { canonical: "/" },
  openGraph: {
    title: "WealthOS",
    description: SITE_DESCRIPTION,
    url: siteUrl(),
    type: "website",
    siteName: "WealthOS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WealthOS",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  // The Next twitter metadata object has no url field (verified against
  // next 16.3.6's twitter-types) — the reference ships twitter:url, so it
  // rides the `other` escape hatch. PWA_META adds the reference's
  // mobile-web-app-capable + apple pair (also without first-class
  // fields). NOTE: page-level metadata REPLACES this map (shallow merge),
  // which is why pageMetadata() re-declares all of it per page.
  other: {
    "twitter:url": siteUrl(),
    ...PWA_META,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Session-19 (S19-P2): the reference's meta[name=theme-color] is
  // #000000 (black — probed on both its login page and the authed shell).
  // Ours had shipped #2563eb since the scaffold.
  themeColor: "#000000",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Session-22 (S22-P2): the antialiased utility is RETIRED — the
          reference ships no font-smoothing (computed auto) and no
          text-rendering override; the scaffold-era shadcn double-smoothing
          (this class + the retired html rule in globals.css) rendered
          thinner text than the reference on macOS. */}
      <body className="min-h-screen bg-background font-sans text-foreground">
        {/* The no-FOUC theme bootstrap: applies the theme class BEFORE
            first paint. Session-219 (R-16, F-219c + F-219t — the
            parity-default cure): a STORED choice wins everywhere;
            otherwise app routes default DARK (the reference's
            fresh-visitor posture — its authed shell renders html.dark,
            body #0a0a0a, live-measured) and the AUTH FACES
            (login/signup/reset-password) default LIGHT and FORCE it —
            .dark is REMOVED even when stored dark (the reference's
            always-light pre-login genus; the stored-dark login
            previously stranded the flipped body ink on the light wash).
            Mirrors src/lib/theme-default.ts (the pure seam — kept
            honest by tests/theme-default.test.ts's source pins). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var p=location.pathname;var a=/^\\/(login|signup|reset-password)(\\/|$|\\?)/.test(p);var t=localStorage.getItem("wealthos-theme");var d=!a&&(t==="light"?false:(t==="system"?window.matchMedia("(prefers-color-scheme: dark)").matches:true));if(d){document.documentElement.classList.add("dark");}else{document.documentElement.classList.remove("dark");}}catch(e){}`,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
