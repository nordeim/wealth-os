import * as React from "react";
import { cn } from "@/lib/utils";

// Session-16 (S16-P3/P4): the kit rides the STOCK shadcn strings — the
// container is `relative w-full overflow-auto` (not overflow-x-auto +
// scrollbar-thin), TableHead/TableCell carry the stock checkbox variant
// classes, and TableRow ships the stock hover/50 + data-[state=selected]
// pair (token-spelled: the reference's muted SURFACE is our line-soft
// #f5f5f5 — the s14 re-pin). The reference's platform also resets
// `th, td { padding: 1px }` globally (mirrored in globals.css base
// layer) — utility classes override it, so it only fills the unclassed
// axes (standard th compute 1px vertical → 43px header rows; the
// dashboard compact th/td gain the 1px horizontal).

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="relative w-full overflow-auto">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn("[&_tr]:border-b [&_tr]:border-line", className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn(
        "border-b border-line transition-colors hover:bg-line-soft/50 data-[state=selected]:bg-line-soft",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      // Session-79 (M-79c5 — the N-77c17 adjudication, deferred since
      // s77): the reference's stock TableHead rides its muted-foreground
      // token and computes rgb(115,115,115) (#737373) on every table (live-
      // probed on its /accounts); our `text-muted` (#6b7280) rendered
      // one shade darker family-wide. Our computed-equal token for the
      // #737373 role is `text-muted-ink` (the s10 muted-ink token the
      // tabs track + stock placeholders already ride). Per-surface th
      // color overrides (the contacts gray-700 etc.) are unaffected.
      className={cn(
        "h-10 px-2 text-left align-middle font-medium text-muted-ink [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
