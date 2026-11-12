"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DIALOG_CLOSE,
  DIALOG_CONTENT,
  DIALOG_FOOTER,
  DIALOG_HEADER,
  DIALOG_OVERLAY,
  DIALOG_TITLE,
} from "@/lib/page-layout";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  // Session-15 (S15-P2): the reference ships the STOCK black/80 fade —
  // NO backdrop blur (our scaffold's gray-900/45 + blur(2px) wash retired).
  return (
    <DialogPrimitive.Overlay
      className={cn(
        DIALOG_OVERLAY,
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  // Session-15 (S15-P1): the STOCK shadcn geometry — `w-full` (FULL-BLEED
  // at phone widths, not calc(100vw-2rem)), `sm:rounded-lg` (0 radius
  // below 640), shadow-lg, and the slide-in/out animations the scaffold
  // never shipped.
  // Session-231 (R-28, F-231h): the CRM-era wide-family citation retired
  // with its arms — the wide geometry + the wide footer + their component
  // were zero-consumer WealthOS-dead constructs (the F-229f re-entry rule);
  // WealthOS's one wide dialog (the AI coach) passes the 672px cap
  // directly at its call site.
  // Session-71 (L-71d4): the invented `hideClose` prop retired — zero
  // consumers since its scaffold birth, not stock shadcn (the N-57
  // dead-prop class); the close button renders unconditionally.
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          DIALOG_CONTENT,
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className={DIALOG_CLOSE}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  // Session-229 (R-26, F-229e — the S15-P3 claim corrected): the
  // reference's dialog titles are LEFT-ALIGNED at every width
  // (live-probed on its Add-Expense panel at 390×844, probe-229-dialog4:
  // the title element computes textAlign start — no centering below sm,
  // no stock-shadcn header pair). Our DIALOG_HEADER already carries the
  // genus; the pre-229 docblock's "centers below sm" claim was false.
  // The old right-side clearance is gone (the X is the opacity pattern
  // now).
  return <div className={cn(DIALOG_HEADER, className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  // Session-15 (S15-P5): the STOCK footer — the column-reverse stack
  // flipping to a row with end-justified buttons at sm (no gap class:
  // the buttons touch when stacked on phones, 8px margin at sm).
  // Session-231 (R-28, F-231h): the between-justified footer twin cited
  // here retired with its family — zero consumers, the F-229f re-entry
  // rule; reintroduce WITH a consumer if a between-footer dialog ever
  // lands.
  return <div className={cn(DIALOG_FOOTER, className)} {...props} />;
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  // Session-13 (S13-P9): the stock string — `text-lg font-semibold
  // leading-none tracking-tight` (reference class dump), inheriting the
  // #0a0a0a default foreground.
  return <DialogPrimitive.Title className={cn(DIALOG_TITLE, className)} {...props} />;
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  // Session-15 (S15-P4): the reference's five CREATE dialogs ship NO
  // description (h2 only — verified on the live app).
  // Session-231 (R-28, F-231h): the CRM-era "contacts scan-card"
  // citation retired with the family round — the live WealthOS consumer
  // is the AI-coach dialog's sr-only description.
  // Session-26 (S26-P6): the color realigned to the reference's live
  // import dialog (its muted-foreground token #737373 = our muted-ink token).
  return <DialogPrimitive.Description className={cn("text-sm text-muted-ink", className)} {...props} />;
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
