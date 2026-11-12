import * as React from "react";
import { DIALOG_TEXTAREA, INPUT_BASE } from "@/lib/page-layout";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      // Session-7: stock shadcn base — rounded-md (the reference's toolbar
      // searches and settings inputs all use the stock rounded-md input,
      // verified live on the contacts search).
      // Session-9 (S9-12, S9-16): `text-base md:text-sm` (16px below md —
      // the reference's phones render 16px input text) and a 1px near-black
      // focus ring with the border color unchanged (the ring color
      // token).
      // Session-10 (S10-2): the reference's stock Input is bg-transparent
      // (no bg class — the surface shows through, exactly like the live
      // computed probes) with NO text color class — typed text inherits its
      // --foreground #0a0a0a (text-ink) and placeholders use #737373
      // (--color-muted-ink). Ours shipped bg-white + #111827 + #9ca3af.
      className={cn(
        `flex h-9 w-full rounded-md border border-line ${INPUT_BASE.bg} px-3 py-1 ${INPUT_BASE.size} ${INPUT_BASE.ink} shadow-sm ${INPUT_BASE.transition} ${INPUT_BASE.file} ${INPUT_BASE.placeholder} ${INPUT_BASE.focusRing} disabled:cursor-not-allowed disabled:opacity-50`,
        className,
      )}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      // Session-10 (S10-2): transparent bg + ink + placeholder tokens like
      // the reference's stock textarea (no bg/text color classes there).
      // Session-15 (S15-P12/P13): the reference's dialog Description
      // textareas ship a 60px min-height at the stock rounded-md radius
      // (class dump on the live
      // Event/Activity dialogs) — ours had shipped a 72px min-height at
      // the larger radius.
      className={cn(DIALOG_TEXTAREA, className)}
      {...props}
    />
  );
}

export { Input, Textarea };
