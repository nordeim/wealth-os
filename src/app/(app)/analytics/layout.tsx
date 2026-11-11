// Session-226 (R-23, F-226b): the lowercase route's own head. The
// section page below is a client component ("use client" — metadata
// export forbidden), so /analytics inherited the ROOT layout's family
// (title "WealthOS", canonical "/") and declared itself a duplicate
// of the homepage — while the reference serves per-casing canonicals
// at BOTH casings (its own route-case posture, live-verified). A
// pass-through segment layout is the smallest cure: the metadata
// rides the layout, the page renders unchanged inside it.
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ page: "Analytics", route: "/analytics" });

export default function AnalyticsSectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
