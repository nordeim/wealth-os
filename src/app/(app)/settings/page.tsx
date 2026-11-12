"use client";

import * as React from "react";
import {
  AlertTriangle,
  Bell,
  Download,
  Lock,
  PlusCircle,
  Save,
  Settings as SettingsIcon,
  ShieldCheck,
  Trash2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/shared/page-parts";
import { useWealthOs } from "@/stores/wealthos-store";
import { CURRENCIES, DATE_FORMATS, EXPENSE_CATEGORIES } from "@/lib/constants";
import { PAGE_ROOT, SETTINGS_CARD } from "@/lib/page-layout";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

// Session-208 (F-208d, the F-205b second half): the settings page carries
// the reference's OWN glass-card genus — border-0 white/80 frosted-glass
// (blur wash)
// + shadow-lg cards with the shadcn CardHeader/CardTitle/CardContent
// anatomy and the navy CardTitle token — plus its blue GDPR accents (the
// blue box + the blue Export button) and the amber import box INSIDE a
// standard card (the amber CARD-WASH is our retired construction). The
// Save Settings button rides the reference's bottom `flex justify-end`
// footer row. Every other page keeps CARD (the warm genus — the
// reference's own split). Category Budgets stays OUR functional superset
// (the reference has no such card), restyled to this genus.

export default function SettingsPage() {
  const store = useWealthOs();
  const settings = store.settings;

  const [currency, setCurrency] = React.useState("USD");
  const [dateFormat, setDateFormat] = React.useState("MM/dd/yyyy");
  const [pushNotifications, setPushNotifications] = React.useState(false);
  const [emailAlerts, setEmailAlerts] = React.useState(false);
  const [budgetWarnings, setBudgetWarnings] = React.useState(true);
  const [monthlyReports, setMonthlyReports] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [budgetCategory, setBudgetCategory] = React.useState("");
  const [budgetAmount, setBudgetAmount] = React.useState("");
  // Session-222 (R-19, F-222l): the budget-delete busy rider — the
  // F-221q round's last uncovered surface (the void-discarded result
  // also meant failures were fully silent; the result now toasts).
  const [busyBudget, setBusyBudget] = React.useState<string | null>(null);

  const deleteBudget = async (category: string) => {
    setBusyBudget(category);
    const res = await store.deleteBudget(category);
    setBusyBudget(null);
    if (res.ok) {
      toast.success("Budget deleted");
    } else {
      toast.error("Delete failed", res.error);
    }
  };

  // Sync the form when the store's settings identity changes —
  // RENDER-TIME adjustment (no setState inside an effect).
  const [settingsKey, setSettingsKey] = React.useState(settings ?? null);
  if (settingsKey !== settings) {
    setSettingsKey(settings);
    if (settings) {
      setCurrency(settings.defaultCurrency);
      setDateFormat(settings.dateFormat);
      setPushNotifications(settings.pushNotifications);
      setEmailAlerts(settings.emailAlerts);
      setBudgetWarnings(settings.budgetWarnings);
      setMonthlyReports(settings.monthlyReports);
    }
  }

  const save = async () => {
    if (busy) return;
    setBusy(true);
    const res = await store.updateSettings({
      defaultCurrency: currency,
      dateFormat,
      pushNotifications,
      emailAlerts,
      budgetWarnings,
      monthlyReports,
    });
    setBusy(false);
    if (res.ok) toast.success("Settings saved");
    else toast.error("Save failed", res.error);
  };

  const addBudget = async () => {
    const category = budgetCategory.trim();
    const amount = Number(budgetAmount);
    if (!category || !Number.isFinite(amount) || amount <= 0) {
      toast.error("Enter a category and a positive amount");
      return;
    }
    const res = await store.upsertBudget({ category, amount });
    if (res.ok) {
      toast.success(`Budget for ${category} saved`);
      setBudgetCategory("");
      setBudgetAmount("");
    } else {
      toast.error("Save failed", res.error);
    }
  };


  return (
    <div className={PAGE_ROOT.standard}>
      <div className={PAGE_ROOT.containerNarrow}>
        <PageHeader
          tone="navy"
          title="Settings"
          subtitle="Customize your budget planning experience"
        />

        {/* Profile settings */}
        <section className={SETTINGS_CARD.base} aria-label="Profile Settings">
          <div className={SETTINGS_CARD.header}>
            <h2 className={SETTINGS_CARD.title}>
              <User className="h-5 w-5" aria-hidden="true" />
              Profile Settings
            </h2>
          </div>
          <div className={SETTINGS_CARD.content}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="settings-currency" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  Default Currency
                </label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="settings-currency" aria-label="Default currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="settings-date-format" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  Date Format
                </label>
                <Select value={dateFormat} onValueChange={setDateFormat}>
                  <SelectTrigger id="settings-date-format" aria-label="Date format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DATE_FORMATS.map((f) => (
                      <SelectItem key={f.value} value={f.value}>
                        {f.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className={SETTINGS_CARD.base} aria-label="Notification settings">
          <div className={SETTINGS_CARD.header}>
            <h2 className={SETTINGS_CARD.title}>
              <Bell className="h-5 w-5" aria-hidden="true" />
              Notifications
            </h2>
          </div>
          <div className={SETTINGS_CARD.content}>
            <NotificationRow
              id="push"
              label="Push Notifications"
              description="Receive notifications in your browser"
              checked={pushNotifications}
              onChange={setPushNotifications}
            />
            <NotificationRow
              id="email"
              label="Email Alerts"
              description="Get important alerts via email"
              checked={emailAlerts}
              onChange={setEmailAlerts}
            />
            <NotificationRow
              id="budget"
              label="Budget Warnings"
              description="Alert me when approaching budget limits"
              checked={budgetWarnings}
              onChange={setBudgetWarnings}
            />
            <NotificationRow
              id="reports"
              label="Monthly Reports"
              description="Receive monthly spending summaries"
              checked={monthlyReports}
              onChange={setMonthlyReports}
            />
          </div>
        </section>

        {/* Budgets — OUR functional superset (the reference has no such
            card), carried in the reference's glass genus. */}
        <section className={SETTINGS_CARD.base} aria-label="Category Budgets">
          <div className={SETTINGS_CARD.header}>
            <h2 className={SETTINGS_CARD.title}>
              <SettingsIcon className="h-5 w-5" aria-hidden="true" />
              Category Budgets
            </h2>
          </div>
          <div className={SETTINGS_CARD.content}>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                list="budget-category-options"
                value={budgetCategory}
                onChange={(e) => setBudgetCategory(e.target.value)}
                placeholder="Category (e.g. Groceries)"
                aria-label="Budget category"
                className="h-10 flex-1 rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
              />
              <datalist id="budget-category-options">
                {EXPENSE_CATEGORIES.map((c) => (
                  <option key={c.label} value={c.label} />
                ))}
              </datalist>
              <input
                type="number"
                min="0"
                step="0.01"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
                placeholder="Monthly $"
                aria-label="Monthly budget amount"
                className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-32 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
              />
              <Button variant="outline" onClick={() => void addBudget()}>
                <PlusCircle className="h-4 w-4" />
                Add
              </Button>
            </div>
            {store.budgets.length > 0 ? (
              <ul className="divide-y divide-stone-200/70 dark:divide-stone-800">
                {store.budgets.map((budget) => (
                  <li key={budget.id} className="flex items-center justify-between py-2.5">
                    <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                      {budget.category}
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="text-sm text-stone-600 dark:text-stone-400">
                        ${budget.amount.toLocaleString("en-US", { minimumFractionDigits: 0 })}/mo
                      </span>
                      <Button
                        variant="ghost"
                        className="h-7 px-2 text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        aria-label={`Delete ${budget.category} budget`}
                        disabled={busyBudget === budget.category}
                        onClick={() => void deleteBudget(budget.category)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-stone-500 dark:text-stone-400">No budgets yet — add one above.</p>
            )}
          </div>
        </section>

        {/* Export */}
        <section className={SETTINGS_CARD.base} aria-label="Export Your Data">
          <div className={SETTINGS_CARD.header}>
            <h2 className={SETTINGS_CARD.title}>
              <Download className="h-5 w-5" aria-hidden="true" />
              Export Your Data
            </h2>
          </div>
          <div className={SETTINGS_CARD.content}>
            <div className={SETTINGS_CARD.gdprBox}>
              <div className={SETTINGS_CARD.boxBody}>
                <ShieldCheck className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <div>
                  <h3 className={SETTINGS_CARD.gdprTitle}>GDPR Compliant Export</h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    Download all your data in JSON format. This includes expenses, income, goals,
                    and account information.
                  </p>
                </div>
              </div>
            </div>
            {/* A real anchor: the endpoint answers with
                Content-Disposition: attachment — the browser download flow,
                not a client-side navigation. */}
            {/* Session-221 (R-18, F-221e): text-white — the default
                variant's text-primary-foreground (stone-900) on blue-600
                measured 3.38:1 (live + axe); white computes 5.17:1. The
                F-219a stone-900 genus was measured on AMBER fills, never
                on this saturated blue. */}
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <a href="/api/export" download>
                <Download className="h-4 w-4" />
                Export All Data
              </a>
            </Button>
          </div>
        </section>

        {/* Import warning */}
        <section className={SETTINGS_CARD.base} aria-label="Import Data">
          <div className={SETTINGS_CARD.header}>
            <h2 className={SETTINGS_CARD.title}>
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              Import Data
            </h2>
          </div>
          <div className={SETTINGS_CARD.content}>
            <div className={SETTINGS_CARD.importBox}>
              <div className={SETTINGS_CARD.boxBody}>
                <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                <div>
                  <h3 className={SETTINGS_CARD.importTitle}>Import Warning</h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    Importing will add data to your existing records. Make sure to backup your
                    current data first. Use the Import page to upload a bank CSV.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data summary badges — the reference's four shadcn badges. */}
        <section className={SETTINGS_CARD.base} aria-label="Your Data Summary">
          <div className={SETTINGS_CARD.header}>
            <h2 className={SETTINGS_CARD.title}>
              <Lock className="h-5 w-5" aria-hidden="true" />
              Your Data Summary
            </h2>
          </div>
          <div className={SETTINGS_CARD.content}>
            <div className="flex flex-wrap gap-2">
              <Badge className="border-transparent hover:bg-secondary/80 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                Encrypted
              </Badge>
              <Badge className="border-transparent hover:bg-secondary/80 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                Multi-Device
              </Badge>
              <Badge className="border-transparent hover:bg-secondary/80 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                Your Eyes Only
              </Badge>
              <Badge className="border-transparent hover:bg-secondary/80 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                Compliant
              </Badge>
            </div>
          </div>
        </section>

        {/* The reference's Save footer — the bottom right-aligned row. */}
        <div className={SETTINGS_CARD.saveRow}>
          {/* Session-233 (R-30, F-233d): the preferences guard — the
              settings fetch can fail silently inside hydrate() while the
              dashboard data landed fine; the form then shows local
              defaults a Save would persist OVER the stored preferences.
              Save disables while the slice is missing and the amber
              line states the protection (the import-warning genus). */}
          {!settings && !store.loading ? (
            <p className="mr-auto flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400">
              <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
              Settings could not be loaded — saving is disabled to protect your
              stored preferences. Try reloading.
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => void save()}
            disabled={busy || !settings}
            className={SETTINGS_CARD.saveButton}
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationRow({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <label htmlFor={`switch-${id}`} className="text-base font-medium text-stone-900 dark:text-stone-100">
          {label}
        </label>
        <p className="text-sm text-stone-500 dark:text-stone-400">{description}</p>
      </div>
      <button
        id={`switch-${id}`}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          // Session-231 (R-28, F-231k): the vestigial `peer` class retired
          // — no sibling-reading consumer exists in the row (a v2-era
          // checkbox idiom survivor; the label precedes the button in DOM).
          "inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          // Session-221 (R-18, F-221n): the unchecked track darkens one
          // step AND gains a visible border — the old stone-300 track on
          // the white/80 card measured 1.49:1 (the white thumb vs it
          // 1.63:1); the stone-500 border computes 4.95:1 for the state
          // boundary while the checked emerald arm is untouched.
          checked ? "bg-emerald-600" : "bg-stone-400 border-stone-500 dark:bg-stone-700 dark:border-stone-600",
        )}
      >
        <span
          className={cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform",
            checked ? "translate-x-4" : "translate-x-0",
          )}
        />
      </button>
    </div>
  );
}
