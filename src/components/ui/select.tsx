"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { SELECT_TRIGGER } from "@/lib/page-layout";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      // Session-10 (S10-2): the stock shadcn trigger, DOM-extracted from the
      // live reference: rounded-md (6px), NO gap-2 (justify-between only),
      // bg-transparent, placeholder #737373, chevron
      // h-4 w-4 opacity-50 (50% of the inherited ink).
      // Session-77 (N-77c11, bundle-falsified S10-2 model): the focus ring
      // is PLAIN focus: — it FIRES on mouse click, like the reference's
      // stock Tr (the Input/Button bases stay focus-visible on BOTH
      // apps). No base w-full — surfaces add it (270px rails yes /
      // w-full sm:w-32 toolbars; the reference's bundle base carries
      // w-full but our per-surface additions compute equal everywhere).
      // Session-81 (M-81c3, bundle re-decoded + live-DOM-confirmed on the
      // settings x2 + dashboard x3 selects): the span arm is the
      // reference's [&>span]:line-clamp-1 — its trigger span computes
      // display flow-root / overflow hidden / text-overflow clip /
      // line-clamp 1 where our truncate computed block/ellipsis/none.
      // Session-133 (D-133a0, F-133c1) → Session-185 (D-185a1, the
      // walk58 live find): the s133 retirement REVERSED — the walk58
      // two-app census proved the reference's CURRENT trigger carries
      // the stock data-[placeholder] arm (its placeholder-state Related
      // To (Type) select computes the muted rgb(115,115,115); the s133
      // retirement left ours at the foreground ink). The arm restores
      // via SELECT_TRIGGER.placeholderState (the muted-ink token pair);
      // the s133 round's own protected face — the density select —
      // retired upstream at s148, so the restoration diverges nothing.
      className={cn(
        `${SELECT_TRIGGER.base} ${SELECT_TRIGGER.placeholderState} ${SELECT_TRIGGER.focusRing} disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1`,
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        {/* Session-81 (M-81c3): the reference's chevron is bare
            h-4 w-4 opacity-50 — the bundle's `h-4 w-4 shrink-0` is
            the CHECKBOX's class, not the chevron's. */}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        // Session-81 (M-81c1, live-DOM-decoded on the reference's open
        // Select popovers — settings x2, computed-probed at 1440): the
        // reference's content ships z-50 max-h-96 rounded-md shadow-md
        // + the FULL animation arm set (fade + zoom + all four
        // slide-in-from-* arms + all four per-side translates, all
        // unconditional on its single popper construction). OURS
        // shipped the scaffold-era draft (z-[60] max-h-72 rounded-lg
        // shadow-lg, fade+zoom+the two vertical translates behind a
        // position ternary) — never pinned in 80 sessions. The token
        // substitutions (border-line / bg-surface / text-foreground)
        // are the computed-equal expressions of its border-input /
        // bg-popover / text-popover-foreground (all verified: #e5e5e5,
        // white, #0a0a0a on both apps).
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-line bg-surface text-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return <SelectPrimitive.Label className={cn("px-2 py-1.5 text-xs font-medium text-muted", className)} {...props} />;
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      // Session-81 (M-81c2, live-computed on both apps' open popovers):
      // the reference's items ship rounded-sm computing 4px (its shadcn
      // radius derivation — ours computed 6px as rounded-md) + the
      // focus WASH pair focus:bg-accent focus:text-accent-foreground —
      // the highlighted item's text SHIFTS #0a0a0a -> #171717 (LIVE:
      // the highlighted "Month" computed rgb(23,23,23) while the
      // resting "Week" computed rgb(10,10,10)). Our computed-equals:
      // focus:bg-line-soft (#f5f5f5 = its accent) +
      // focus:text-neutral-900 (#171717 — the s80 badge precedent for
      // expressing its accent-foreground).
      // Session-221 (R-18, F-221b): the dark arms join the pair — the
      // light-only form computed neutral-900 on line-soft's #262626
      // dark flip = 1.18:1 (live-verified on the dark-mode Income
      // combobox; every Select unreadable at the highlight moment in
      // the fresh-visitor default mode). The MENU_ITEM precedent:
      // stone-100 on stone-800 = 13.9:1.
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-line-soft focus:text-neutral-900 dark:focus:bg-stone-800 dark:focus:text-stone-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          {/* Session-81 (M-81c2): the reference's check is BARE h-4 w-4
              — inheriting the near-black ink (#0a0a0a resting /
              #171717 highlighted). The text-primary retires: ours
              rendered a BLUE check (#2563eb — the app blue, not the
              reference's popover ink) on every selected item. */}
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator className={cn("-mx-1 my-1 h-px bg-line", className)} {...props} />;
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};
