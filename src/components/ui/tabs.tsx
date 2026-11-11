"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TABS_PILL, TABS_SEGMENTED } from "@/lib/page-layout";

// Native-ARIA tab strip. `variant="underline"` matches the reference's
// plain text tabs; `variant="segmented"` renders the segmented control
// used by the Activities priority tabs and the Settings tabs — the
// reference track is `h-9 grid w-full grid-cols-{n} rounded-lg bg-muted
// p-1 text-muted-foreground` with an equal-width column per tab and the
// active tab a raised white pill; `variant="pill"` renders the Reports
// tab bar — white bordered container `grid grid-cols-2 lg:grid-cols-{n}`,
// active tab `bg-blue-50 text-blue-700`.
//
// Session-12 (S12-P4): the tracks carry text-muted-ink (the reference's
// tablist text-muted-foreground — inactive tabs INHERIT #737373 instead
// of carrying gray-500) and the triggers are the reference's STOCK Radix
// classes: natural height (no h-7), transition-all, ring-offset-background,
// the bare `shadow` on the active state (the s6 shadow-sm pin was one step
// light), data-[state=active]:* variants riding a data-state attribute,
// and NO hover classes (the reference ships none on any tab variant).
// The reference's own tabs are all tabIndex=-1 (keyboard-unreachable
// platform defect) — our roving tabindex stays the accessible fix.
//
// Session-23 (S23-P1): the reference's tab strips are Radix Tabs and ship
// the full ARIA contract — every trigger carries an id + aria-controls
// pointing at its panel's id, every panel carries an id + aria-labelledby
// pointing back, all N panel shells stay mounted (inactive ones hidden
// with EMPTY content), and the tablist supports the keyboard model:
// ArrowLeft/ArrowRight with wrap, Home/End, automatic activation
// (selection follows focus). This component now wires the same contract:
// `useId()` generates the trigger/panel id pair, the component renders
// the reference's wrapper anatomy (`<div class=…>[tablist, panels…]` —
// the wrapper className is page-specific: space-y-6 on settings/reports,
// bare on activities where it nests inside the toolbar), and `TabsPanel`
// renders the wired shells as the wrapper's children. Our roving tabindex
// (selected tab = 0) remains the documented superset over the reference's
// all-=-1 platform defect.

interface TabsProps {
  tabs: ReadonlyArray<{ id: string; label: string; count?: number }>;
  value: string;
  onValueChange: (value: string) => void;
  /** The wrapper div's classes — the reference's per-page Tabs region
   * (space-y-6 on settings/reports; bare on activities). */
  className?: string;
  variant?: "underline" | "segmented" | "pill";
  /** Equal-width grid columns for segmented/pill tracks (reference: one per tab). */
  cols?: number;
  /** The TabsPanel shells — rendered inside the wrapper after the tablist. */
  children?: React.ReactNode;
}

interface TabsPanelProps extends React.ComponentProps<"div"> {
  /** The tab id this panel belongs to — wires id/aria-labelledby/hidden. */
  tab: string;
}

const TabsContext = React.createContext<{ uid: string; value: string } | null>(null);

// Static class maps — Tailwind v4 scans source for literal class strings, so
// dynamic `grid-cols-${n}` templates would never compile.
const GRID_COLS: Record<number, string> = {
  2: "grid grid-cols-2",
  3: "grid grid-cols-3",
  4: "grid grid-cols-4",
  5: "grid grid-cols-5",
  6: "grid grid-cols-6",
};
// Session-66 (N-66b): GRID_COLS_LG retired — zero references repo-wide (the
// pill variant's responsive lg:grid-cols-5 lives in page-layout.ts's
// TABS_PILL contract, not here). The s54 fully-dead class, CONST variant.

// The reference's stock Radix TabsContent classes (byte-extracted from the
// live reference on 2026-10-01): the focus-visible ring family rides every
// panel shell; the per-page mt-*/space-y-* classes are appended by the
// pages (mt-4 space-y-2 on activities, mt-2 space-y-4 on settings, mt-2 on
// reports — the mt-* collapses against the wrapper's space-y margin).
// Session-129 (F-129c1): the extracted string's ring-offset-background is
// the COMPUTED-CONTRACT EXCEPTION, retired per the s11 DIALOG_CLOSE
// precedent — the reference's ride computes hsl(0 0% 100%) = #ffffff; OUR
// --color-background is the page bg #f9fafb (the F-119c2 inverted-token
// genus), so the class drifts the panel's 2px focus-visible halo; the v4
// DEFAULT offset color is #fff — byte-equal with the class absent.
const PANEL_BASE =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function Tabs({ tabs, value, onValueChange, className, variant = "underline", cols, children }: TabsProps) {
  const uid = React.useId();
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const moveFocus = (next: number) => {
    onValueChange(tabs[next].id);
    // Focus follows selection in the same keydown pass (automatic
    // activation, the reference's Radix model). The button exists in the
    // DOM already — the re-render only flips tabIndex/data-state.
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const idx = tabs.findIndex((t) => t.id === value);
    let next = -1;
    if (e.key === "ArrowRight") {
      next = (idx + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      next = (idx - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = tabs.length - 1;
    }
    if (next >= 0) {
      // Swallow the key so the page/focus does not scroll or move.
      e.preventDefault();
      moveFocus(next);
    }
  };

  const trackClass =
    variant === "segmented"
      ? cn(TABS_SEGMENTED.track, cols && "w-full", cols ? GRID_COLS[cols] ?? null : "flex items-center gap-1 overflow-x-auto scrollbar-thin")
      : variant === "pill"
        ? TABS_PILL.track
        : cn(
            "flex items-center gap-1 overflow-x-auto scrollbar-thin border-b border-line",
          );
  const triggerClass = variant === "segmented" ? TABS_SEGMENTED.trigger : variant === "pill" ? TABS_PILL.trigger : null;
  const underline = variant === "underline";
  return (
    <TabsContext.Provider value={{ uid, value }}>
      <div className={className}>
        <div
          role="tablist"
          aria-orientation="horizontal"
          className={trackClass}
          onKeyDown={onKeyDown}
        >
          {tabs.map((tab, i) => {
            const isActive = tab.id === value;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${uid}-trigger-${tab.id}`}
                aria-controls={`${uid}-content-${tab.id}`}
                aria-selected={isActive}
                data-state={isActive ? "active" : "inactive"}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onValueChange(tab.id)}
                className={cn(
                  // Stock Radix trigger classes from the S12-P4 contracts —
                  // the active styling rides the data-[state=active]
                  // variants, so the string is identical on every tab.
                  triggerClass,
                  underline &&
                    "-mb-px whitespace-nowrap rounded-t-md border-b-2 px-3.5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  // Session-221 (R-18, F-221t): the active arm's amber
                  // steps — the old border-primary/text-primary computed
                  // 2.15:1 on light (the F-220p stale-genus class: zero
                  // consumers render this variant today, but a latent
                  // sub-3:1 arm invites regression). amber-600 border
                  // 3.21:1, amber-700 ink 4.83:1.
                  underline && (isActive ? "border-amber-600 text-amber-700" : "border-transparent text-muted hover:border-line hover:text-foreground"),
                )}
              >
                {tab.label}
                {typeof tab.count === "number" && (
                  // Session-66 (N-66d): the reference's literal count span —
                  // the activities Overdue tab's red badge
                  // (P.overdue.length>0 && <span className="ml-2 px-2 py-0.5
                  // text-xs bg-red-100 text-red-800 rounded-full">). Always the
                  // red tint, active or not; the >0 guard lives at the call
                  // site exactly like the reference's `>0 &&`.
                  <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabsPanel({ tab, className, children, ...props }: TabsPanelProps) {
  const ctx = React.useContext(TabsContext);
  const uid = ctx?.uid ?? "";
  const active = ctx?.value === tab;
  return (
    <div
      role="tabpanel"
      id={`${uid}-content-${tab}`}
      aria-labelledby={`${uid}-trigger-${tab}`}
      hidden={!active}
      // Session-81 (L-81c5, live-DOM on the reference's settings strip):
      // its Radix panels carry the stock data-state/data-orientation/
      // tabindex trio alongside the id/aria-labelledby/hidden wiring
      // our s23 shell already ships. tabindex=0 is the a11y-relevant
      // one — the panel enters the tab order; data-state is the Radix
      // data-attribute contract (the tw-animate data-[state] arms
      // read it).
      data-state={active ? "active" : "inactive"}
      data-orientation="horizontal"
      tabIndex={0}
      className={cn(PANEL_BASE, className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tabs, TabsPanel };
