"use client";

import * as React from "react";
import { Landmark, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState, PageHeader } from "@/components/shared/page-parts";
import { useWealthOs } from "@/stores/wealthos-store";
import { ACCOUNT_TYPES, CURRENCIES } from "@/lib/constants";
import { formatMoney, toDate } from "@/lib/finance";
import { CARD, PAGE_ROOT, STOCK_CARD, CTA } from "@/lib/page-layout";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import type { BankAccount } from "@/types";

const TYPE_ICON: Record<string, string> = Object.fromEntries(
  ACCOUNT_TYPES.map((t) => [t.value, t.icon]),
);

export default function AccountsPage() {
  const store = useWealthOs();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<BankAccount | null>(null);
  // Session-221 (R-18, F-221q): the card-level busy rider — a rapid
  // double-click on Remove fired two requests (the second 404s and
  // toasts a spurious "Delete failed").
  const [busyId, setBusyId] = React.useState<string | null>(null);

  const accounts = store.accounts;
  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);

  const openCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  return (
    <div className={PAGE_ROOT.standard}>
      <div className={PAGE_ROOT.containerMid}>
        <PageHeader
          tone="navy"
          title="My Accounts"
          subtitle="Manage your connected bank accounts"
          actions={
            <Button onClick={openCreate} className={CTA.amber}>
              <PlusCircle className="h-4 w-4" />
              Add Account
            </Button>
          }
        />

        {accounts.length === 0 ? (
          <div className={cn(STOCK_CARD, CARD.padding)}>
            <EmptyState
              icon={Landmark}
              title="No accounts yet"
              subtitle="Add a bank account to start tracking your finances."
              action={
                <Button onClick={openCreate} className={CTA.amber}>
                  <PlusCircle className="h-4 w-4" />
                  Add your first account
                </Button>
              }
            />
          </div>
        ) : (
          <>
            <div className={cn(STOCK_CARD, CARD.padding, "flex items-center gap-4")}>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-500/10">
                <Landmark className="h-6 w-6 text-amber-500" />
              </span>
              <div>
                <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Net Balance</p>
                <p
                  className={cn(
                    "text-2xl font-bold",
                    totalBalance >= 0 ? "text-stone-900 dark:text-stone-50" : "text-red-600 dark:text-red-400",
                  )}
                >
                  {formatMoney(totalBalance)}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">Across {accounts.length} accounts</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {accounts.map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  busy={busyId === account.id}
                  onEdit={() => {
                    setEditing(account);
                    setDialogOpen(true);
                  }}
                  onDelete={async () => {
                    setBusyId(account.id);
                    const res = await store.deleteAccount(account.id);
                    setBusyId(null);
                    if (res.ok) toast.success("Account deleted");
                    else toast.error("Delete failed", res.error);
                  }}
                />
              ))}
            </div>
          </>
        )}

        <AccountDialog open={dialogOpen} onOpenChange={setDialogOpen} editing={editing} />
      </div>
    </div>
  );
}

function AccountCard({
  account,
  busy,
  onEdit,
  onDelete,
}: {
  account: BankAccount;
  busy: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const typeLabel = ACCOUNT_TYPES.find((t) => t.value === account.type)?.label ?? account.type;
  const color = account.color ?? "#f59e0b";
  return (
    <div className={cn(STOCK_CARD, CARD.padding)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl text-xl"
            style={{ backgroundColor: `${color}1a` }}
            aria-hidden="true"
          >
            {TYPE_ICON[account.type] ?? "🏦"}
          </span>
          <div>
            <p className="font-semibold text-stone-900 dark:text-stone-100">{account.name}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {typeLabel}
              {account.institution ? ` · ${account.institution}` : ""}
            </p>
          </div>
        </div>
      </div>
      <p
        className={cn(
          "mt-4 text-2xl font-bold",
          account.balance >= 0 ? "text-stone-900 dark:text-stone-50" : "text-red-600 dark:text-red-400",
        )}
      >
        {formatMoney(account.balance)}
      </p>
      <p className="text-xs text-stone-500 dark:text-stone-400">
        {account.currency} · synced{" "}
        {toDate(account.lastSyncedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      </p>
      <div className="mt-4 flex gap-2">
        <Button variant="outline" className="h-8 flex-1 text-xs" onClick={onEdit}>
          Edit
          <span className="sr-only">{account.name}</span>
        </Button>
        <Button
          variant="ghost"
          className="h-8 flex-1 text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          disabled={busy}
          onClick={onDelete}
        >
          Remove
          <span className="sr-only">{account.name}</span>
        </Button>
      </div>
    </div>
  );
}

function AccountDialog({
  open,
  onOpenChange,
  editing,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: BankAccount | null;
}) {
  const store = useWealthOs();
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("checking");
  const [institution, setInstitution] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  // Prefill on open — RENDER-TIME adjustment (the sanctioned
  // pattern; no setState inside an effect): when the dialog's
  // identity changes, adjust this component's own state during
  // render before the children commit.
  const [formKey, setFormKey] = React.useState<string | null>(null);
  const nextKey = open ? (editing ? `edit-${editing.id}` : "create") : null;
  if (formKey !== nextKey) {
    setFormKey(nextKey);
      setName(editing?.name ?? "");
      setType(editing?.type ?? "checking");
      setInstitution(editing?.institution ?? "");
      setBalance(editing ? String(editing.balance) : "");
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const body: Record<string, unknown> = {
      name,
      type,
      balance: Number(balance),
      // Session-221 (R-18, F-221d): the raw string, not the || undefined
      // collapse — the create schema normalizes "" to undefined and the
      // update schema to null (the F-219q clear contract), so an
      // emptied Institution actually clears on edit.
      institution,
    };
    const res = editing
      ? await store.updateAccount(editing.id, body)
      : await store.createAccount(body);
    setBusy(false);
    if (res.ok) {
      toast.success(editing ? "Account updated" : "Account added");
      onOpenChange(false);
    } else {
      toast.error("Save failed", res.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "Edit Account" : "Add Account"}</DialogTitle>
          <DialogDescription>
            {editing ? "Update your account details." : "Connect a bank account to track in WealthOS."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="account-name" className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Account Name
            </label>
            <input
              id="account-name"
              required
              maxLength={120}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Everyday Checking"
              className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="account-type" className="text-sm font-medium text-stone-700 dark:text-stone-300">Account Type</label> {/* F-218u */}
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="account-type" aria-label="Account type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ACCOUNT_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.icon} {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="account-balance" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Current Balance (USD)
              </label>
              <input
                id="account-balance"
                required
                type="number"
                step="0.01"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="0.00"
                className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="account-institution" className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Institution (optional)
            </label>
            <input
              id="account-institution"
              maxLength={120}
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="e.g. Chase Bank"
              className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={busy} className={CTA.amber}>
              {editing ? "Save Changes" : "Add Account"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
