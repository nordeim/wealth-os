"use client";

// Toast system — a lightweight subscribe/store hook + viewport. Mirrors the
// @radix-ui/react-toast API shape but with far less ceremony (and no portal
// key pitfalls). Auto-dismiss with hover-pause.
// Session-62 (N-62a): the @radix-ui/react-toast PACKAGE was retired — this
// file never imported it (a from-scratch design since the scaffold); the
// reference above documents the API contract it mirrors, not a dependency.

import * as React from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "info";

export interface ToastItem {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
}

let toastSeq = 0;

// Module-level store so any component (or plain function via `toast()`) can
// publish without prop drilling.
type Listener = (toasts: ToastItem[]) => void;
const listeners = new Set<Listener>();
let toasts: ToastItem[] = [];

function emit() {
  for (const l of listeners) l(toasts);
}

function dismiss(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

function push(title: string, variant: ToastVariant = "info", description?: string) {
  toastSeq += 1;
  const item: ToastItem = { id: toastSeq, title, description, variant };
  toasts = [...toasts, item].slice(-4); // keep the viewport tidy
  emit();
  return item.id;
}

/** Imperative helper usable from anywhere client-side. */
export const toast = {
  success: (title: string, description?: string) => push(title, "success", description),
  error: (title: string, description?: string) => push(title, "error", description),
  info: (title: string, description?: string) => push(title, "info", description),
  dismiss,
};

function useToasts(): ToastItem[] {
  const [state, setState] = React.useState<ToastItem[]>(toasts);
  React.useEffect(() => {
    const listener: Listener = (next) => setState(next);
    listeners.add(listener);
    return () => listeners.delete(listener) as unknown as void;
  }, []);
  return state;
}

const ICONS: Record<ToastVariant, React.ReactNode> = {
  // Session-221 (R-18, F-221m): the success/info icons darken one step
  // on light (emerald-600 = 3.66:1, amber-700 = 4.83:1 — the old
  // emerald-500/amber-500 computed 2.54:1/2.15:1) with dark arms
  // keeping the bright steps; error already passed at 3.76:1.
  success: <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />,
  error: <AlertCircle className="h-4.5 w-4.5 text-danger" />,
  info: <Info className="h-4.5 w-4.5 text-amber-700 dark:text-amber-400" />,
};

function Toaster() {
  const items = useToasts();
  return (
    <div
      aria-label="Notifications"
      role="region"
      // Session-218 (R-15, F-218h): the ALWAYS-MOUNTED viewport is the
      // polite live region — a live region that ARRIVES with its
      // content is not announced (the region must pre-exist in the
      // a11y tree), so the pre-cure per-card role="status" was silent
      // for screen-reader users. Toasts are the sole feedback channel
      // for every mutation outcome; they announce now.
      aria-live="polite"
      // Session-7 live pin: the reference viewport is top-of-screen on
      // phones and bottom-right from sm (sonner-style), a 420px cap at
      // md (ours rides the md variant; the reference's is bare).
      className="pointer-events-none fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
    >
      {items.map((t) => (
        <ToastCard key={t.id} item={t} />
      ))}
    </div>
  );
}

function ToastCard({ item }: { item: ToastItem }) {
  // Auto-dismiss (hover-pause via timer reset).
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(() => dismiss(item.id), 4000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [paused, item.id]);

  return (
    <div
      // Session-218 (R-15, F-218h): NO per-card live role — the viewport
      // above is the live region; a nested live role double-announces.
      className={cn(
        "pointer-events-auto flex items-start gap-3 rounded-xl border p-3.5 shadow-lg outline-none",
        // Session-131 (D-131a1): the scaffold-era data-[state] animation
        // family RETIRED — the ToastCard never set data-state, so the
        // state-keyed enter/exit animation utilities (the animate,
        // fade, and bottom slide arms) NEVER applied (zero animation
        // since the
        // scaffold — live-censused tc.animName=none at walk22). The
        // F-131c1 record: the reference's toast system is DOM-DEAD (four
        // Ix.* calls in its bundle, ZERO rendered elements on any trigger
        // path) — no reference surface contracts an animation; retired per
        // the D-124a7 dead-code doctrine. The tw-animate.css vendor import
        // stays (the Radix dialog family rides it).
        item.variant === "success" && "border-emerald-200 bg-surface dark:border-emerald-800",
        item.variant === "error" && "border-rose-200 bg-surface dark:border-rose-800",
        item.variant === "info" && "border-line bg-surface",
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="mt-0.5 shrink-0">{ICONS[item.variant]}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{item.title}</p>
        {item.description && <p className="mt-0.5 text-xs text-muted dark:text-stone-400">{item.description}</p>}
      </div>
      <button
        type="button"
        onClick={() => dismiss(item.id)}
        // Session-131 (D-131a0): the hover TEXT arm is the neutral-900
        // literal (hover:text-foreground #0a0a0a → hover:text-neutral-900
        // #171717) — the F-128c1 genus's FOURTH arm (s128 menu-item ink ·
        // s129 outline hover text · s130 ghost hover text; the reference's
        // stock interactive-hover ink #171717). The reference's toast
        // surface is DOM-DEAD (F-131c1 — no live face to parity), so the
        // fix rides OUR superset by the trio precedent + internal
        // consistency: the LAST live hover:text-foreground ride in src/.
        // Session-217 (R-14, F-217c): the panel rides bg-surface (the
        // token flips dark — bg-white would strand light text on white)
        // and the hover pair gains its dark arm (neutral-900 on the
        // #262626 hover wash is dark-on-dark).
        // Session-222 (R-19, F-222g): the house focus ring joins the
        // dismiss control (the UA default outline was its only
        // affordance — the globals outline-color tints it ≈3:1).
        className="shrink-0 rounded-md p-1 text-muted transition-colors hover:bg-line-soft hover:text-neutral-900 dark:hover:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Dismiss notification"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export { Toaster };
