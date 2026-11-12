"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CHECKBOX } from "@/lib/page-layout";

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      // Session-13 (S13-P13): the STOCK shadcn Label — `text-sm font-medium
      // leading-none peer-disabled:cursor-not-allowed
      // peer-disabled:opacity-70` (reference class dump on the New
      // Account dialog, 14px). Ours shipped a 12px text-xs custom with a
      // /80 foreground wash.
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
}

// Session-17 (S17-P3): the STOCK Radix-style checkbox — the reference
// ships button-role checkboxes (`<button type="button" role="checkbox"
// aria-checked data-state value="on">`) on EVERY filter rail (accounts
// tiers / calendar types+dates / activities Activity-Type + the by-type
// footer), with a Check h-4 w-4 indicator that mounts ONLY when checked.
// The button element keeps keyboard semantics native (Space/Enter fire
// click on buttons) and the label's htmlFor still forwards clicks to a
// labelable button. Ours shipped native inputs styled with an
// appearance reset hack — no check glyph ever rendered, the checked
// fill was the app
// blue (the reference's computes #171717, the dark stock primary), and
// the focus ring was 2px translucent blue instead of the 1px near-black.

interface CheckboxProps extends Omit<React.ComponentProps<"button">, "onChange" | "value"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
}

function Checkbox({
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  label,
  id,
  ...props
}: CheckboxProps) {
  const generated = React.useId();
  const inputId = id ?? generated;
  const [uncontrolled, setUncontrolled] = React.useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : uncontrolled;

  const toggle = () => {
    if (!isControlled) setUncontrolled((v) => !v);
    onCheckedChange?.(!isChecked);
  };

  const box = (
    <button
      type="button"
      role="checkbox"
      id={inputId}
      aria-checked={isChecked}
      data-state={isChecked ? "checked" : "unchecked"}
      value="on"
      className={cn(CHECKBOX.control, className)}
      onClick={toggle}
      {...props}
    >
      {isChecked ? (
        <span data-state="checked" className={CHECKBOX.indicator} style={{ pointerEvents: "none" }}>
          <Check className="h-4 w-4" />
        </span>
      ) : null}
    </button>
  );
  if (!label) return box;
  return (
    <div className={CHECKBOX.row}>
      {box}
      <label htmlFor={inputId} className={CHECKBOX.label}>
        {label}
      </label>
    </div>
  );
}

export { Label, Checkbox };
