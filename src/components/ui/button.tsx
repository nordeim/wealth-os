"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { BUTTON_BASE } from "@/lib/page-layout";
import { cn } from "@/lib/utils";

// Session-82 (M-82c1): the reference's stock Button base (the bundle's
// uie, decoded verbatim) carries NO svg-margin arms — its icon-text
// spacing rides EACH SURFACE'S OWN svg margin class (a 16px margin on
// the header/export family = the 16px icon-text gap s9 measured; a
// 4px margin on the compact family — the slide-over actions, the
// mobile cards, the Check-as-completed ghost). The s9 iconGap
// invention (a per-svg 8px margin pair with a zero-margin only-child
// override) retired: its cascade
// nullified every per-surface svg margin on svg+bare-text buttons
// (the only-child override at (0,2,1) beat the svg's own (0,1,0)
// classes — LIVE-measured 0px where the reference computes 4/8px).
// Focus rings are 1px near-black (the ring token,
// --color-ring = #0a0a0a).
const buttonVariants = cva(
  cn(
    // Session-13 (S13-P3): rounded-md — the reference renders 6px radius
    // on EVERY button (computed sweep, all pages + dialogs + icon
    // buttons). Ours shipped rounded-lg on the base.
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none",
    // Session-73 (N-73c5): the stock svg size — the reference's base
    // carries [&_svg]:size-4 here (between pointer-events-none and
    // shrink-0); the cascade that computes its 20px-classed icons at
    // 16px.
    BUTTON_BASE.svgSize,
    "[&_svg]:shrink-0",
    BUTTON_BASE.focusRing,
  ),
  {
    variants: {
      variant: {
        // Session-17 (S17-P4): BARE shadow — the reference's blue
        // primaries (New Account/Lead/Event/Contact + the activities
        // Filter) compute rgba(0,0,0,.1) 0 1px 3px 0 (the bare scale);
        // shadow-sm was one step light under the s9-re-pinned scale.
        default: "bg-primary text-primary-foreground shadow hover:bg-primary-hover",
        // Session-217 (R-14, F-217c): secondary rides bg-surface (the
        // token flips dark) — bg-white would strand the flipped light
        // text on a white chip in dark mode.
        secondary: "bg-surface text-foreground border border-line shadow-sm hover:bg-line-soft",
        // Session-17 (S17-P5): NO base text color — the stock ghost. The
        // reference's ghost carries only the hover pair; its one
        // text-bearing ghost ("Save All") renders the inherited #0a0a0a.
        // Our old text-muted rendered it gray.
        // Session-130 (F-130c1): the hover TEXT arm is the neutral-900
        // literal — live-walked two-app on the accounts rail's Save All
        // ghost (@1440): our hover computed rgb(10,10,10)
        // (hover:text-foreground) where the reference computes
        // rgb(23,23,23) — its stock ghost's accent hover ink
        // #171717. The F-128c1/F-129c3 value pair on the ghost variant
        // (s128 the menu-item ink · s129 the outline hover text · s130
        // the ghost hover text); the s80 badge precedent.
        // Session-217 (R-14, F-217c): the dark arm — neutral-900 on the
        // #262626 dark hover wash is dark-on-dark.
        ghost: "hover:bg-line-soft hover:text-neutral-900 dark:hover:text-neutral-50",
        // Session-129 (F-129c2): the destructive hover is the ALPHA form —
        // live-walked on the Danger Zone reset (both viewports): ours
        // computed the SOLID darker step rgb(220,38,38) (the old solid
        // red-600 hover) where the reference computes
        // rgba(239,68,68,0.9) — its destructive at 90% ALPHA. The M-80c1
        // genus (the s80 Save precedent: the reference's hovers are the
        // /90 alpha form, never the solid darker step).
        // Session-227 (R-24, F-227f — the F-225l/F-226m register):
        // LATENT sub-AA arm — zero consumers today. Measured: text-white
        // on --color-danger #ef4444 = 3.76:1 at text-sm (the F-218j
        // measurement) — below the 4.5:1 AA bar. A live consumer should
        // pin a --color-danger-ink pair (red-600/red-400) or darken the
        // fill, never inherit this silently.
        destructive: "bg-danger text-white shadow-sm hover:bg-danger/90",
        // Session-236 (R-33, F-236j — the F-229f register): the sidebar and
        // link variant arms are vendored shadcn stock — zero consumers
        // today; retained for the family's completeness.
        sidebar: "bg-white/10 text-white hover:bg-white/20",
        // Session-129 (F-129c3): the outline variant gains the hover TEXT
        // arm — live-walked on BOTH censused outline surfaces (the
        // Data-tab template button + the profile Upload Photo, both
        // viewports): our hover text stayed rgb(10,10,10) (text-foreground,
        // no hover arm) where the reference computes rgb(23,23,23) — its
        // stock outline's accent hover ink #171717. The
        // F-128c1 value pair; the s80 badge precedent expresses that
        // accent pair ink as our neutral-900 literal.
        outline: "border border-line bg-surface text-foreground shadow-sm hover:bg-line-soft hover:text-neutral-900 dark:hover:text-neutral-50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // Session-236 (R-33, F-236j — the F-229f register): the icon,
        // small-icon, pill, large, and small size arms are vendored
        // shadcn stock — zero consumers today (the F-237i completion:
        // the small size arm is the fifth, missed by the first census).
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-6",
        icon: "h-9 w-9",
        iconSm: "h-7 w-7 rounded-md",
        pill: "rounded-full px-4 py-1.5 h-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
