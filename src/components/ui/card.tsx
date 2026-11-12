import * as React from "react";
import { CARD } from "@/lib/page-layout";
import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  // Session-7: the reference's bordered cards (settings picklists, calendar
  // cards, KPI stat cards, filter rails) carry `shadow`, not `shadow-sm`.
  return (
    <div
      className={cn("rounded-xl border border-line bg-surface shadow", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  // Session-98 (F-98c1, the M-79c2 v4 doctrine): the reference's base
  // stacks its children with the v3 sibling-gap token at the 1.5 step —
  // margin-TOP on FOLLOWING siblings, so a call-site row-direction
  // override (the reports tab-2 table cards) makes the gap vertically
  // INERT. Under
  // our v4 the space-y family flips to margin-BOTTOM on :not(:last-child)
  // — landing on the TITLE in a row header and growing the flex line's
  // cross-size (+6px per card, measured live at 390). The mt-on-following
  // form below is the v4 expression of the reference's own v3 COMPUTED
  // semantics: identical 6px gaps in column mode, inert in row mode, and
  // no margin on single-child headers either way.
  return <div className={cn("flex flex-col [&>*+*]:mt-1.5 p-6", className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  // S9-3: card titles are DIVs on the reference (no heading semantics on
  // any card except the activities h2s and the profile name h3, both
  // separately pinned). Color is inherited from the card foreground.
  // Session-13 (S13-P6): the DEFAULT is now the STOCK shadcn string
  // (`font-semibold leading-none tracking-tight`, 16px — the reports +
  // profile surfaces); the bigger reference variants (the dashboard and
  // leads titles stepping up at sm, filter rails + by-type at the base
  // step, settings at the larger step) arrive via the per-call
  // className override over this base (session-230, F-230f: the old
  // docblock named a constant that never existed).
  return <div className={cn(CARD.title, className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-xs text-muted", className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center p-5 pt-0", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
