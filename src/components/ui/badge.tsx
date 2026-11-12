import * as React from "react";
import { cn } from "@/lib/utils";

// Session-66 (N-66i): the STOCK shadcn Badge mirror, re-derived from the
// reference's bundle (the `zn` component over the `fie` cva — a DIV with
// rounded-md px-2.5 py-0.5 text-xs font-semibold + the stock variant set
// default/secondary/destructive/outline). The scaffold-era primitive was a
// rounded-full px-2 font-medium SPAN with an invented variant set — never
// re-derived because the reference renders no badges at its persistent
// zero data (the live probes could not see them) and the s27–s31 decodes
// pinned the CALL-SITE class maps, not the chrome.
//
// The reference's --primary is the STOCK DARK #171717 (not its app blue —
// the s5 DIALOG_SUBMIT finding) while OUR --primary token is the amber
// #f59e0b (the session-199 "Premium Finance Suite" rebrand; the s13-era
// comment cited the pre-rebrand app blue — corrected session 228), so
// the computed-equal expressions for the token-riding variants are the
// neutral literals — the s13 PROFILE_LAYOUT.badge live-probed form:
//   reference default     -> bg-neutral-900 text-neutral-50 (+shadow)
//   reference secondary   -> bg-neutral-100 text-neutral-900
//                            (neutral-100 = hsl(0 0% 96.1%) = its --secondary)
//   reference destructive -> bg-danger text-neutral-50
//                            (our --danger #ef4444 IS its --destructive)
//   reference outline     -> text-foreground (the bare `border` color rides
//                            the base-layer * { border-color: --color-line })
interface BadgeProps extends React.ComponentProps<"div"> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants: Record<string, string> = {
    default: "border-transparent bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/80",
    // Session-222 (R-19, F-222k fold): the latent dark arm — zero
    // consumers today, but an unflipped secondary badge on a dark
    // card is a latent AA miss.
    secondary: "border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-800/80",
    // Session-227 (R-24, F-227f — the F-225l/F-226m register): LATENT
    // sub-AA arm — zero consumers today. Measured: text-neutral-50 on
    // --color-danger #ef4444 = 3.76:1 at badge text sizes (the F-218j
    // measurement family) — below the 4.5:1 AA bar. A live consumer
    // should pin an ink pair or darken the fill, never inherit this
    // silently.
    destructive: "border-transparent bg-danger text-neutral-50 shadow hover:bg-danger/80",
    outline: "text-foreground",
  };
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
