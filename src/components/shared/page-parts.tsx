"use client";

// WealthOS shared page building blocks — session-199: the page header,
// KPI card, empty state, stat rows and card titles every page shares.

import * as React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { CARD, EMPTY_STATE, PAGE_HEADER } from "@/lib/page-layout";
import type { LucideIcon } from "lucide-react";

/** Page title row with actions — the reference's page-header anatomy:
 * title (text-3xl md:text-4xl bold) + muted subtitle, actions right on
 * md+, stacked on phones. */
export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className={PAGE_HEADER.root}>
      <div className="space-y-1">
        <h1 className={PAGE_HEADER.title}>{title}</h1>
        {subtitle ? <p className={PAGE_HEADER.subtitle}>{subtitle}</p> : null}
      </div>
      {actions ? <div className={PAGE_HEADER.actions}>{actions}</div> : null}
    </div>
  );
}

/** The dashboard/page KPI card: label, big value, delta line and the
 * colored icon tile (the reference's rounded-xl tile, top-right). */
export function KpiCard({
  label,
  value,
  delta,
  deltaDirection,
  icon: Icon,
  iconColor,
  iconSoft,
}: {
  label: string;
  value: string;
  delta?: string | null;
  deltaDirection?: "up" | "down" | "flat";
  icon: LucideIcon;
  iconColor: string;
  iconSoft: string;
}) {
  const deltaTone =
    deltaDirection === "up"
      ? "text-emerald-700 dark:text-emerald-400"
      : deltaDirection === "down"
        ? "text-red-500 dark:text-red-400"
        : "text-stone-500 dark:text-stone-500";
  return (
    <div className={cn(CARD.base, CARD.padding, "relative overflow-hidden")}>
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
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl md:h-14 md:w-14"
          style={{ backgroundColor: iconSoft }}
        >
          <Icon className="h-6 w-6" style={{ color: iconColor }} />
        </div>
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

/** The reference's segmented period control (1M 3M 6M 1Y). */
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
    <div className="inline-flex items-center rounded-lg bg-stone-100 p-1 dark:bg-stone-800" role="group" aria-label="Chart period">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={value === option}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
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
