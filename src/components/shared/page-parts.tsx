"use client";

// WealthOS shared page building blocks — session-199: the page header,
// KPI card, empty state, stat rows and card titles every page shares.

import * as React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
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
        {subtitle ? <p className={PAGE_HEADER.subtitle}>{subtitle}</p> : null}
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
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  delta?: string | null;
  deltaDirection?: "up" | "down" | "flat";
  icon: LucideIcon;
  tone: keyof typeof KPI_TONES;
}) {
  const deltaTone =
    deltaDirection === "up"
      ? "text-emerald-700 dark:text-emerald-400"
      : deltaDirection === "down"
        ? "text-red-600 dark:text-red-400" // F-218j: red-500 was 3.76:1 at text-xs
        : "text-stone-500 dark:text-stone-500";
  return (
    <div className={cn(CARD.kpi)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-stone-500 dark:text-stone-500">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-stone-900 md:text-3xl dark:text-stone-50">
            {value}
          </p>
          {delta != null ? (
            <p className={cn("mt-1 flex items-center gap-1 text-xs font-semibold", deltaTone)}>
              {deltaDirection === "up" ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : deltaDirection === "down" ? (
                <TrendingDown className="h-3.5 w-3.5" />
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
 * right and the white/70 label + font-black value + white/60 sub left. */
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
    <div className={cn("rounded-xl text-card-foreground border-0 shadow-2xl text-white p-6", gradient)}>
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
            "px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200",
            value === option
              ? "bg-amber-500 text-white shadow-sm"
              : "text-stone-600 hover:text-stone-900 dark:text-stone-500 dark:hover:text-stone-100",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

/** Loading skeleton block. */
export function LoadingBlock({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex min-h-40 items-center justify-center p-8">
      <p className="text-sm text-stone-500">{label}</p>
    </div>
  );
}
