"use client";

// Single Zustand store for all WealthOS server state (the ONE-store
// doctrine — web-application-engineering §4.3). Actions call the API
// envelope through call(), then refresh the affected slice. The store
// instance rides globalThis so code-split chunks share ONE copy (the
// digma ADR-007 lesson: module-level singletons can be duplicated
// across Turbopack chunks).

import { create } from "zustand";
import type {
  BankAccount,
  Budget,
  DashboardData,
  Goal,
  IncomeSource,
  Investment,
  Result,
  SearchResults,
  Settings,
  Transaction,
  User,
} from "@/types";

interface ApiEnvelope<T> {
  ok: boolean;
  data?: T;
  error?: { code: string; message: string };
}

async function call<T>(path: string, init?: RequestInit): Promise<Result<T, string>> {
  try {
    const res = await fetch(path, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    });
    const body = (await res.json().catch(() => null)) as ApiEnvelope<T> | null;
    if (!res.ok || !body || body.ok === false) {
      const message =
        body && body.error ? body.error.message : `Request failed (${res.status})`;
      return { ok: false, error: message };
    }
    return { ok: true, data: body.data as T };
  } catch {
    return { ok: false, error: "Network error — check your connection and try again." };
  }
}

// The logout write-guard: every fetch captures this token at entry and
// may only write while it still matches; logout bumps it immediately
// before clearing — a logout landing mid-fetch can never re-populate
// the cleared slices with the previous user's data.
let sessionWriteToken = 0;

export interface WealthOsState {
  // session
  user: User | null;
  hydrated: boolean;

  // domain slices
  transactions: Transaction[];
  incomeSources: IncomeSource[];
  accounts: BankAccount[];
  investments: Investment[];
  goals: Goal[];
  budgets: Budget[];
  settings: Settings | null;

  // ui
  loading: boolean;
  error: string | null;

  // actions
  hydrate: () => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;

  createTransaction: (body: Record<string, unknown>) => Promise<Result<Transaction, string>>;
  updateTransaction: (id: string, body: Record<string, unknown>) => Promise<Result<Transaction, string>>;
  deleteTransaction: (id: string) => Promise<Result<{ id: string }, string>>;
  importTransactions: (
    rows: ReadonlyArray<{ description: string; amount: number; type: string; category: string; budgetCategory: string; date: string }>,
  ) => Promise<Result<{ imported: number }, string>>;

  createIncomeSource: (body: Record<string, unknown>) => Promise<Result<IncomeSource, string>>;
  updateIncomeSource: (id: string, body: Record<string, unknown>) => Promise<Result<IncomeSource, string>>;
  deleteIncomeSource: (id: string) => Promise<Result<{ id: string }, string>>;

  createAccount: (body: Record<string, unknown>) => Promise<Result<BankAccount, string>>;
  updateAccount: (id: string, body: Record<string, unknown>) => Promise<Result<BankAccount, string>>;
  deleteAccount: (id: string) => Promise<Result<{ id: string }, string>>;

  createInvestment: (body: Record<string, unknown>) => Promise<Result<Investment, string>>;
  updateInvestment: (id: string, body: Record<string, unknown>) => Promise<Result<Investment, string>>;
  deleteInvestment: (id: string) => Promise<Result<{ id: string }, string>>;

  createGoal: (body: Record<string, unknown>) => Promise<Result<Goal, string>>;
  updateGoal: (id: string, body: Record<string, unknown>) => Promise<Result<Goal, string>>;
  deleteGoal: (id: string) => Promise<Result<{ id: string }, string>>;

  upsertBudget: (body: { category: string; amount: number }) => Promise<Result<Budget, string>>;
  deleteBudget: (category: string) => Promise<Result<{ category: string }, string>>;

  updateSettings: (body: Partial<Settings>) => Promise<Result<Settings, string>>;

  askCoach: (question: string) => Promise<Result<{ answer: string }, string>>;
  search: (q: string) => Promise<SearchResults>;
}

/** Shared post-mutation refresh: refetch the dashboard aggregate and
 *  swap every slice (the replace contract — full-list replacement, no
 *  partial PATCH merging). */
async function refreshAll(
  token: number,
  set: (partial: Partial<WealthOsState>) => void,
): Promise<void> {
  const res = await call<DashboardData>("/api/dashboard");
  if (token !== sessionWriteToken) return;
  if (res.ok) {
    set({
      transactions: res.data.transactions,
      incomeSources: res.data.incomeSources,
      accounts: res.data.accounts,
      investments: res.data.investments,
      goals: res.data.goals,
      budgets: res.data.budgets,
      user: res.data.user as User,
      loading: false,
      error: null,
    });
  }
}

function createStore() {
  return create<WealthOsState>((set, get) => ({
    user: null,
    hydrated: false,
    transactions: [],
    incomeSources: [],
    accounts: [],
    investments: [],
    goals: [],
    budgets: [],
    settings: null,
    loading: true,
    error: null,

    hydrate: async () => {
      const token = ++sessionWriteToken;
      set({ loading: true });
      const res = await call<DashboardData>("/api/dashboard");
      if (token !== sessionWriteToken) return;
      if (res.ok) {
        set({
          transactions: res.data.transactions,
          incomeSources: res.data.incomeSources,
          accounts: res.data.accounts,
          investments: res.data.investments,
          goals: res.data.goals,
          budgets: res.data.budgets,
          user: res.data.user as User,
          hydrated: true,
          loading: false,
          error: null,
        });
        const settingsRes = await call<Settings>("/api/settings");
        if (token === sessionWriteToken && settingsRes.ok) {
          set({ settings: settingsRes.data });
        }
      } else if (res.error.includes("authenticate") || res.error.includes("Sign in")) {
        set({ hydrated: true, loading: false, user: null });
      } else {
        set({ hydrated: true, loading: false, error: res.error });
      }
    },

    logout: async () => {
      const token = ++sessionWriteToken;
      await call("/api/auth/logout", { method: "POST" });
      if (token !== sessionWriteToken) return;
      set({
        user: null,
        transactions: [],
        incomeSources: [],
        accounts: [],
        investments: [],
        goals: [],
        budgets: [],
        settings: null,
        hydrated: false,
        loading: true,
        error: null,
      });
    },

    refresh: async () => {
      await refreshAll(sessionWriteToken, set);
    },

    createTransaction: async (body) => {
      const res = await call<Transaction>("/api/transactions", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(sessionWriteToken, set);
      return res;
    },
    updateTransaction: async (id, body) => {
      const res = await call<Transaction>(`/api/transactions/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(sessionWriteToken, set);
      return res;
    },
    deleteTransaction: async (id) => {
      const res = await call<{ id: string }>(`/api/transactions/${id}`, {
        method: "DELETE",
      });
      if (res.ok) await refreshAll(sessionWriteToken, set);
      return res;
    },
    importTransactions: async (rows) => {
      const res = await call<{ imported: number }>("/api/import", {
        method: "POST",
        body: JSON.stringify({ rows }),
      });
      if (res.ok) await refreshAll(sessionWriteToken, set);
      return res;
    },

    createIncomeSource: async (body) => {
      const res = await call<IncomeSource>("/api/income-sources", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(sessionWriteToken, set);
      return res;
    },
    updateIncomeSource: async (id, body) => {
      const res = await call<IncomeSource>(`/api/income-sources/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(sessionWriteToken, set);
      return res;
    },
    deleteIncomeSource: async (id) => {
      const res = await call<{ id: string }>(`/api/income-sources/${id}`, {
        method: "DELETE",
      });
      if (res.ok) await refreshAll(sessionWriteToken, set);
      return res;
    },

    createAccount: async (body) => {
      const res = await call<BankAccount>("/api/accounts", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(sessionWriteToken, set);
      return res;
    },
    updateAccount: async (id, body) => {
      const res = await call<BankAccount>(`/api/accounts/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(sessionWriteToken, set);
      return res;
    },
    deleteAccount: async (id) => {
      const res = await call<{ id: string }>(`/api/accounts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) await refreshAll(sessionWriteToken, set);
      return res;
    },

    createInvestment: async (body) => {
      const res = await call<Investment>("/api/investments", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(sessionWriteToken, set);
      return res;
    },
    updateInvestment: async (id, body) => {
      const res = await call<Investment>(`/api/investments/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(sessionWriteToken, set);
      return res;
    },
    deleteInvestment: async (id) => {
      const res = await call<{ id: string }>(`/api/investments/${id}`, {
        method: "DELETE",
      });
      if (res.ok) await refreshAll(sessionWriteToken, set);
      return res;
    },

    createGoal: async (body) => {
      const res = await call<Goal>("/api/goals", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(sessionWriteToken, set);
      return res;
    },
    updateGoal: async (id, body) => {
      const res = await call<Goal>(`/api/goals/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(sessionWriteToken, set);
      return res;
    },
    deleteGoal: async (id) => {
      const res = await call<{ id: string }>(`/api/goals/${id}`, {
        method: "DELETE",
      });
      if (res.ok) await refreshAll(sessionWriteToken, set);
      return res;
    },

    upsertBudget: async (body) => {
      const res = await call<Budget>("/api/budgets", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(sessionWriteToken, set);
      return res;
    },
    deleteBudget: async (category) => {
      const res = await call<{ category: string }>("/api/budgets", {
        method: "DELETE",
        body: JSON.stringify({ category }),
      });
      if (res.ok) await refreshAll(sessionWriteToken, set);
      return res;
    },

    updateSettings: async (body) => {
      const res = await call<Settings>("/api/settings", {
        method: "PUT",
        body: JSON.stringify(body),
      });
      if (res.ok) set({ settings: res.data });
      return res;
    },

    askCoach: async (question) => {
      return call<{ answer: string }>("/api/ai/coach", {
        method: "POST",
        body: JSON.stringify({ question }),
      });
    },

    search: async (q) => {
      if (q.length < 2) {
        return { transactions: [], accounts: [], investments: [], goals: [] };
      }
      const res = await call<SearchResults>(
        `/api/search?q=${encodeURIComponent(q)}`,
      );
      if (res.ok) return res.data;
      return { transactions: [], accounts: [], investments: [], goals: [] };
    },
  }));
}

// The globalThis singleton — one store across every code-split chunk.
interface WealthOsGlobal {
  __wealthosStore?: ReturnType<typeof createStore>;
}

const globalScope = globalThis as unknown as WealthOsGlobal;

/** The store hook — created ONCE per JS realm (globalThis), then used
 *  exactly like a zustand hook: `useWealthOs((s) => s.transactions)`. */
export const useWealthOs: ReturnType<typeof createStore> =
  (globalScope.__wealthosStore ??= createStore());
