"use client";

// WealthOS shared page building blocks — session-199: the page header,
// KPI card, empty state, stat rows and card titles every page shares.

import * as React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { CARD, EMPTY_STATE, KPI_TONES, PAGE_HEADER } from "@/lib/page-layout";
import type { LucideIcon } from "lucide-react";

/** Page title row with actions — the reference's page-header anatomy
 * (session-207, F-207e): the lg: rhythm + mb-8 band; the H1 stone tone
 * on Dashboard/Investments and the navy `text-primary-navy` token on
 * the other seven sections; muted subtitle; actions right on lg+,
 * stacked on phones. */
export function PageHeader({
  title,
  subtitle,
  actions,
  tone = "stone",
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  tone?: "stone" | "navy";
}) {
  return (
    <div className={PAGE_HEADER.root}>
      <div className="space-y-1">
        <h1 className={tone === "navy" ? PAGE_HEADER.titleNavy : PAGE_HEADER.title}>{title}</h1>
        {/* Session-239 (R-36, F-239c; reworded session-242/R-39,
            F-242g): the subtitle carrier opts out of the hydration
            text comparison — the dashboard's date subtitle derives
            from a render-time clock. The AppShell loading gate means
            page content only renders AFTER the client hydrate()
            resolves — no page markup ever server-renders — so the
            text comparison cannot fire today. The suppression stays
            as belt-and-suspenders (the theme bootstrap's own pattern
            for inherent server/client divergence): if the loading
            gate is ever relaxed (SSR-ing store data), the clock
            becomes a live hydration risk again and this carrier is
            already covered — inert for every static-string consumer
            either way. */}
        {subtitle ? <p className={PAGE_HEADER.subtitle} suppressHydrationWarning>{subtitle}</p> : null}
      </div>
      {actions ? <div className={PAGE_HEADER.actions}>{actions}</div> : null}
    </div>
  );
}

/** The dashboard/page KPI card: label, big value, delta line and the
 * reference's saturated gradient icon tile (session-208, F-208a):
 * `w-12 h-12 rounded-xl <KPI_TONES gradient> flex items-center justify-center`
 * with a `text-white` icon — the top-right tile, fixed size. */
export function KpiCard({
  label,
  value,
  delta,
  deltaDirection,
  deltaTone: toneOverride,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  delta?: string | null;
  deltaDirection?: "up" | "down" | "flat";
  /** Session-235 (R-32, F-235i): the optional good/bad override. The
   * direction drives the glyph (sign semantics); the tone carries the
   * good/bad channel. Expenses needs them decoupled — spending that
   * falls is a DOWN glyph in GOOD green (the old form coupled both to
   * the direction and rendered an upward arrow beside a negative
   * number). Omitted: the tone follows the direction (the income/net
   * genus, where sign IS good/bad). */
  deltaTone?: "good" | "bad";
  icon: LucideIcon;
  tone: keyof typeof KPI_TONES;
}) {
  const deltaTone =
    toneOverride === "good"
      ? "text-emerald-700 dark:text-emerald-400"
      : toneOverride === "bad"
        ? "text-red-600 dark:text-red-400" // F-218j: red-500 was 3.76:1 at text-xs
        : deltaDirection === "up"
          ? "text-emerald-700 dark:text-emerald-400"
          : deltaDirection === "down"
            ? "text-red-600 dark:text-red-400" // F-218j: red-500 was 3.76:1 at text-xs
            : "text-stone-600 dark:text-stone-400";
  return (
    <div className={cn(CARD.kpi)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-stone-600 dark:text-stone-400">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-stone-900 md:text-3xl dark:text-stone-50">
            {value}
          </p>
          {delta != null ? (
            <p className={cn("mt-1 flex items-center gap-1 text-xs font-semibold", deltaTone)}>
              {/* Session-231 (R-28, F-231i): both delta icons carry the
                  explicit aria-hidden — lucide-react 0.525 already injects
                  it on any icon lacking an a11y prop (the N-89c6
                  library-level superset, verified against the installed
                  package source: Icon.js spreads `...!children &&
                  !hasA11yProp(rest) && { "aria-hidden": "true" }` — the
                  reference's older lucide renders bare svgs); the explicit
                  attribute keeps the pair symmetric and documents the
                  injection without relying on it. */}
              {deltaDirection === "up" ? (
                <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              ) : deltaDirection === "down" ? (
                <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
              ) : null}
              {delta}
            </p>
          ) : null}
        </div>
        <div
          className={cn("w-12 h-12 rounded-xl flex items-center justify-center", KPI_TONES[tone])}
        >
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

/** The Investments KPI card — the reference's FULL-CARD gradient genus
 * (session-208, F-208a): the whole card is the gradient (`to-br`,
 * text-white, border-0, shadow-2xl) with the ghost `text-white/30` icon
 * right and the white/70 label + font-black value + white/60 sub left.
 *
 * Session-226 (R-23, F-226m) — the WCAG exemption register (the F-224y
 * pattern): the white-alpha labels on these gradients compute below AA
 * — measured: text-white/70 on emerald-500 ≈ 1.9:1, text-white/60 ≈
 * 1.6:1, the emerald-100 stat-card label ≈ 2.24:1. The genus is the
 * reference's own (F-208a, live-extracted); the a11y two-gate
 * sanctions the arms; the register entry keeps a future contrast
 * sweep from "discovering" them. The large font-black values ride the
 * large-text threshold; the labels are the registered exemption. */
export function GradientKpiCard({
  label,
  value,
  sub,
  icon: Icon,
  gradient,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  gradient: string;
}) {
  return (
    // Session-234 (R-31, F-234i): the semantic ink token retired from
    // this string — twMerge drops it before the DOM whenever the
    // literal white rides the same chain, so it was a cascade-dead
    // carrier (a live-source member of the dead-utility genus the
    // content scan cannot see; removing the literal later would have
    // silently activated a different ink in dark mode).
    <div className={cn("rounded-xl border-0 shadow-2xl text-white p-6", gradient)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/70 text-sm font-medium mb-1">{label}</p>
          <p className="text-3xl font-black text-white">{value}</p>
          {sub ? <p className="text-white/60 text-xs mt-1">{sub}</p> : null}
        </div>
        <Icon className="w-12 h-12 text-white/30" aria-hidden="true" />
      </div>
    </div>
  );
}

/** The centered empty state (the reference's genus: gray icon, semibold
 * title, lighter subtitle, optional CTA). */
export function EmptyState({
  icon: Icon,
  title,
  subtitle,
  action,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={EMPTY_STATE.root}>
      <Icon className={EMPTY_STATE.icon} aria-hidden="true" />
      <h2 className={EMPTY_STATE.title}>{title}</h2>
      {subtitle ? <p className={cn(EMPTY_STATE.subtitle, "max-w-sm")}>{subtitle}</p> : null}
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}

/** Card title row with optional trailing control (the "This month"
 * captions, segmented period pickers). */
export function CardTitleRow({
  icon: Icon,
  title,
  caption,
  trailing,
}: {
  icon?: LucideIcon;
  title: string;
  caption?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        {Icon ? (
          <Icon className="h-5 w-5 text-amber-500" aria-hidden="true" />
        ) : null}
        <h2 className={CARD.title}>{title}</h2>
        {caption ? <span className={CARD.subtitle}>{caption}</span> : null}
      </div>
      {trailing}
    </div>
  );
}

/** The reference's segmented period control (1M 3M 6M 1Y) — the
 * session-208 (F-208b) convergence: `flex gap-1 bg-stone-100
 * dark:bg-stone-800/80 rounded-lg p-1` container, `font-semibold
 * transition-all duration-200` buttons. */
export function PeriodSegment({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}) {
  return (
    <div className="flex gap-1 bg-stone-100 dark:bg-stone-800/80 rounded-lg p-1" role="group" aria-label="Chart period">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={value === option}
          className={cn(
            // Session-222 (R-19, F-222g): the house focus ring — the
            // primitives all carry it; this raw <button> rode the UA
            // default outline (tinted ≈3:1 by the globals
            // outline-color) as its only affordance.
            "px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            value === option
              ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-stone-900 shadow-sm"
              : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

/** Loading skeleton block — the sighted-user surface. Session-224
 * (R-21, F-224aa) made it a polite live region; session 232 (R-29,
 * F-232e) moved the announcement to the always-mounted sr-only region
 * in app-shell (the F-218h genus) — this block is the visual only. */
export function LoadingBlock({ label = "Loading…" }: { label?: string }) {
  // Session-232 (R-29, F-232e): the visual surface only. The polite
  // announcement moved to the ALWAYS-MOUNTED sr-only live region in
  // app-shell (the F-218h genus: a live region that arrives with its
  // content is not announced — the region must pre-exist in the a11y
  // tree, empty when idle, the label swapping in on the flip).
  return (
    <div className="flex min-h-40 items-center justify-center p-8">
      <p className="text-sm text-stone-500 dark:text-stone-400">{label}</p>
    </div>
  );
}
