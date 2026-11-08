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
  Trash2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { CARD, PAGE_ROOT } from "@/lib/page-layout";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

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
    <div className={cn(PAGE_ROOT.standard, "max-w-4xl")}>
      <PageHeader
        title="Settings"
        subtitle="Customize your budget planning experience"
        actions={
          <Button onClick={() => void save()} disabled={busy}>
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
        }
      />

      {/* Profile settings */}
      <section className={cn(CARD.base, CARD.padding)} aria-label="Profile Settings">
        <div className="mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-amber-500" />
          <h2 className={CARD.title}>Profile Settings</h2>
        </div>
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
      </section>

      {/* Notifications */}
      <section className={cn(CARD.base, CARD.padding)} aria-label="Notification settings">
        <div className="mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5 text-amber-500" />
          <h2 className={CARD.title}>Notifications</h2>
        </div>
        <div className="space-y-1">
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

      {/* Budgets */}
      <section className={cn(CARD.base, CARD.padding)} aria-label="Category Budgets">
        <div className="mb-4 flex items-center gap-2">
          <SettingsIcon className="h-5 w-5 text-amber-500" />
          <h2 className={CARD.title}>Category Budgets</h2>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            list="budget-category-options"
            value={budgetCategory}
            onChange={(e) => setBudgetCategory(e.target.value)}
            placeholder="Category (e.g. Groceries)"
            aria-label="Budget category"
            className="h-10 flex-1 rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
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
            className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:w-32 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
          />
          <Button variant="outline" onClick={() => void addBudget()}>
            <PlusCircle className="h-4 w-4" />
            Add
          </Button>
        </div>
        {store.budgets.length > 0 ? (
          <ul className="mt-4 divide-y divide-stone-200/70 dark:divide-stone-800">
            {store.budgets.map((budget) => (
              <li key={budget.id} className="flex items-center justify-between py-2.5">
                <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                  {budget.category}
                </span>
                <span className="flex items-center gap-3">
                  <span className="text-sm text-stone-600 dark:text-stone-500">
                    ${budget.amount.toLocaleString("en-US", { minimumFractionDigits: 0 })}/mo
                  </span>
                  <Button
                    variant="ghost"
                    className="h-7 px-2 text-xs text-red-600 hover:text-red-700"
                    aria-label={`Delete ${budget.category} budget`}
                    onClick={() => void store.deleteBudget(budget.category)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-stone-500">No budgets yet — add one above.</p>
        )}
      </section>

      {/* Export */}
      <section className={cn(CARD.base, CARD.padding)} aria-label="Export Your Data">
        <div className="mb-2 flex items-center gap-2">
          <Download className="h-5 w-5 text-amber-500" />
          <h3 className="font-semibold text-stone-900 dark:text-stone-100">GDPR Compliant Export</h3>
        </div>
        <p className="mb-4 text-sm text-stone-500 dark:text-stone-500">
          Download all your data in JSON format. This includes expenses, income, goals, and
          account information.
        </p>
        {/* A real anchor: the endpoint answers with
            Content-Disposition: attachment — the browser download flow,
            not a client-side navigation. */}
        <Button variant="outline" asChild>
          <a href="/api/export" download>
            <Download className="h-4 w-4" />
            Export All Data
          </a>
        </Button>
      </section>

      {/* Import warning */}
      <section
        className={cn(
          CARD.base,
          CARD.padding,
          "border-amber-200 bg-amber-50/60 dark:border-amber-500/20 dark:bg-amber-500/5",
        )}
        aria-label="Import warning"
      >
        <div className="mb-2 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <h3 className="font-semibold text-stone-900 dark:text-stone-100">Import Warning</h3>
        </div>
        <p className="text-sm text-stone-600 dark:text-stone-500">
          Importing will add data to your existing records. Make sure to backup your current data
          first. Use the Import page to upload a bank CSV.
        </p>
      </section>

      {/* Data summary badges */}
      <section className={cn(CARD.base, CARD.padding)} aria-label="Your Data Summary">
        <h2 className={cn(CARD.title, "mb-4")}>Your Data Summary</h2>
        <div className="flex flex-wrap gap-2">
          <DataBadge icon={<Lock className="h-3.5 w-3.5" />} label="Encrypted" />
          <DataBadge label="Synced" />
          <DataBadge label="Multi-Device" />
          <DataBadge label="Private" />
          <DataBadge label="Your Eyes Only" />
          <DataBadge label="GDPR" />
          <DataBadge label="Compliant" />
        </div>
      </section>
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
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <label htmlFor={`switch-${id}`} className="text-sm font-medium text-stone-900 dark:text-stone-100">
          {label}
        </label>
        <p className="text-xs text-stone-500 dark:text-stone-500">{description}</p>
      </div>
      <button
        id={`switch-${id}`}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
          checked ? "bg-amber-500" : "bg-stone-300 dark:bg-stone-700",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
            checked ? "left-[22px]" : "left-0.5",
          )}
        />
      </button>
    </div>
  );
}

function DataBadge({ icon, label }: { icon?: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
      {icon}
      {label}
    </span>
  );
}
