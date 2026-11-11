"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { MENU_CONTENT, MENU_ITEM } from "@/lib/page-layout";

// Lightweight dropdown built on @radix-ui/react-popover (already a project
// dependency) with menu semantics — click-to-toggle, outside-press closes,
// items render as buttons/links by the caller.

const Dropdown = PopoverPrimitive.Root;
const DropdownTrigger = PopoverPrimitive.Trigger;

function DropdownContent({
  className,
  align = "end",
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-[60] min-w-[10rem] overflow-hidden rounded-lg border border-line bg-surface p-1 text-foreground shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
        onClick={(e) => {
          props.onClick?.(e);
          // Session-46 (S46-P7): click containment — the items render in
          // a portal, but React synthetic clicks still bubble through the
          // REACT tree to clickable ancestors (a TableRow's onClick), so
          // every row-menu action ALSO opened the row-click dialog (the
          // F-46g ghost). Item handlers run first; the bubbling stops
          // here. Radix's composeEventHandlers does not stop it for us
          // (source-verified in @radix-ui/primitive).
          e.stopPropagation();
        }}
      />
    </PopoverPrimitive.Portal>
  );
}

function DropdownItem({
  className,
  destructive = false,
  ...props
}: React.ComponentProps<"button"> & { destructive?: boolean }) {
  // Session-29 (S29-P2): items close the popover on click — the
  // reference's ⋮ menus are real Radix DropdownMenus whose items
  // auto-close on select (its DEAD "Convert to Opportunity" item closes
  // the menu too). PopoverPrimitive.Close composes with the child's own
  // onClick (the caller's handler runs, then the popover closes).
  return (
    <PopoverPrimitive.Close asChild>
      <button
        type="button"
        className={cn(
          "flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-line-soft focus-visible:bg-line-soft",
          destructive ? "text-danger hover:bg-danger-soft" : "text-foreground",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Close>
  );
}

// Session-73 (S73-P1): DropdownSeparator RETIRED — its last consumer was
// the leads row menu's separator, and the reference's row menus ship no
// separators (bundle-decoded: all five Yg contents are flat $s lists).
// DropdownLabel STAYS (the N-56e operator KEEP — the vendored stock
// mirror's completeness is part of the parity contract).

function DropdownLabel({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-2 py-1.5 text-xs font-medium text-muted", className)} {...props} />;
}

export { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownLabel };

// ---------------------------------------------------------------------------
// Session-13 (S13-P4): the STOCK DropdownMenu primitives. The reference's
// account menu AND its four row-action menus are real Radix DropdownMenus
// (role=menu with menuitems, z-50/rounded-md/shadow-md surface, rounded-sm
// items with focus:bg-accent + cursor-default) — class-dumped on the live
// reference (2026-09-30) + bundle-decoded (session 73: five Yg align:"end"
// contents — the account menu + the accounts/contacts/leads/calendar row
// menus, 13 stock $s items, ALL text-only). Session-73 (S73-P1): the four
// row menus migrated here from the Popover family. The Popover-based
// Dropdown above stays as the vendored stock family for future superset
// menus (session-224, F-224q: the CRM-era citations retired — WealthOS
// renders no Popover menus today; the N-56e operator KEEP stands, and
// --color-danger-soft now flips in .dark so the destructive hover
// cannot paint a light chip on a dark surface). Token VALUES are preserved via our
// own variables where the reference uses popover tokens (bg-popover = our
// --color-surface white, border = --color-line #e5e5e5, text =
// --color-foreground).
// ---------------------------------------------------------------------------

const Menu = DropdownMenuPrimitive.Root;
const MenuTrigger = DropdownMenuPrimitive.Trigger;

function MenuContent({
  className,
  align = "end",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(MENU_CONTENT, className)}
        {...props}
        // Session-73 (S73-P1): the S46-P7 click containment, extended to
        // the Menu family with the migration — React synthetic clicks on
        // DropdownMenu portals bubble through the REACT tree to clickable
        // ancestors (a TableRow's onClick) exactly the way the Popover
        // portals do; the composed handler preserves a caller's onClick
        // then stops the bubbling.
        onClick={(e) => {
          props.onClick?.(e);
          e.stopPropagation();
        }}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function MenuItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return <DropdownMenuPrimitive.Item className={cn(MENU_ITEM, className)} {...props} />;
}

export { Menu, MenuTrigger, MenuContent, MenuItem };
