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
  Settings,
  Transaction,
  User,
} from "@/types";

interface ApiEnvelope<T> {
  ok: boolean;
  data?: T;
  error?: { code: string; message: string };
}

// Session-220 (R-17, F-220j): the failure arm carries the envelope's
// error CODE alongside the message — hydrate used to 401-detect by
// message substring ("authenticate"/"Sign in"), an unpinned coupling
// where a reword of ERR.UNAUTHORIZED silently degraded session-expiry
// handling to the red error banner. Structurally compatible with
// Result<T, string> (code is additive), so every existing consumer
// that reads .error keeps compiling unchanged.
type CallResult<T> = { ok: true; data: T } | { ok: false; error: string; code?: string };

async function call<T>(path: string, init?: RequestInit): Promise<CallResult<T>> {
  try {
    const res = await fetch(path, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    });
    const body = (await res.json().catch(() => null)) as ApiEnvelope<T> | null;
    if (!res.ok || !body || body.ok === false) {
      const message =
        body && body.error ? body.error.message : `Request failed (${res.status})`;
      return { ok: false, error: message, code: body && body.error ? body.error.code : undefined };
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

// Session-220 (R-17, F-220l): the refreshAll sequence — monotonic,
// last-request-wins (see refreshAll).
let refreshSeq = 0;

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
  logout: () => Promise<boolean>;
  refresh: () => Promise<Result<DashboardData, string>>;

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
}

/** Shared post-mutation refresh: refetch the dashboard aggregate and
 * swap every slice (the replace contract — full-list replacement, no
 * partial PATCH merging). Session-216 (R-13, F-216d): the failure
 * branch — a failed refresh used to die silently (no else); the
 * error now lands in the store (behind the write-token guard) for
 * the shell's alert banner, and the Result rides back to the caller
 * so the Refresh buttons can toast. */
async function refreshAll(
  token: number,
  set: (partial: Partial<WealthOsState>) => void,
): Promise<Result<DashboardData, string>> {
  // Session-220 (R-17, F-220l): the sequence guard — two quick
  // mutations A→B can resolve out of order (A's fetch landing after
  // B's), overwriting B's fresher slices with stale ones; the
  // write-token guard below protects against logout only. A response
  // whose sequence is older than the latest issued is discarded
  // (last-request-wins).
  const seq = ++refreshSeq;
  const res = await call<DashboardData>("/api/dashboard");
  if (token !== sessionWriteToken || seq !== refreshSeq) return res;
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
  } else {
    set({ loading: false, error: res.error });
  }
  return res;
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
      // Session-217 (R-14, F-217k): clear the stale error at entry — the
      // error banner's Try-again re-entered here with the previous error
      // still set (the banner + the LoadingBlock rendered together
      // mid-retry), and a 401 landing left a stale non-auth error
      // standing after the failure mode changed.
      set({ loading: true, error: null });
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
      } else if (res.code === "UNAUTHORIZED") {
        // Session-220 (R-17, F-220j): the code-keyed branch (was a
        // message-substring match on "authenticate"/"Sign in").
        set({ hydrated: true, loading: false, user: null, error: null });
      } else {
        set({ hydrated: true, loading: false, error: res.error });
      }
    },

    // Session-224 (R-21, F-224e): the honest sign-out. The POST's
    // result is checked — a failed logout (500 from the tokenVersion
    // write, 429 off the shared writes bucket, a network drop)
    // surfaces through the store-error banner and keeps the session
    // state intact (the httpOnly cookie cannot be cleared client-
    // side, so "pretend it worked" would strand a live session the
    // next app-route load silently re-establishes). Returns whether
    // the sign-out completed; the signOut helpers gate their
    // navigation on it.
    logout: async (): Promise<boolean> => {
      const token = ++sessionWriteToken;
      const res = await call("/api/auth/logout", { method: "POST" });
      if (token !== sessionWriteToken) return false;
      if (!res.ok) {
        set({ hydrated: true, loading: false, error: res.error });
        return false;
      }
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
      return true;
    },

    refresh: async () => {
      // Session-217 (R-14, F-217l): capture the write token at ENTRY —
      // the pre-217 form read the LIVE token after the fetch resolved,
      // so a logout completing in between bumped the token first and the
      // post-fetch guard passed, writing the previous user's payload
      // into the cleared store.
      const token = sessionWriteToken;
      return refreshAll(token, set);
    },

    createTransaction: async (body) => {
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<Transaction>("/api/transactions", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(token, set);
      return res;
    },
    updateTransaction: async (id, body) => {
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<Transaction>(`/api/transactions/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(token, set);
      return res;
    },
    deleteTransaction: async (id) => {
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<{ id: string }>(`/api/transactions/${id}`, {
        method: "DELETE",
      });
      if (res.ok) await refreshAll(token, set);
      return res;
    },
    importTransactions: async (rows) => {
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<{ imported: number }>("/api/import", {
        method: "POST",
        body: JSON.stringify({ rows }),
      });
      if (res.ok) await refreshAll(token, set);
      return res;
    },

    createIncomeSource: async (body) => {
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<IncomeSource>("/api/income-sources", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(token, set);
      return res;
    },
    updateIncomeSource: async (id, body) => {
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<IncomeSource>(`/api/income-sources/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(token, set);
      return res;
    },
    deleteIncomeSource: async (id) => {
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<{ id: string }>(`/api/income-sources/${id}`, {
        method: "DELETE",
      });
      if (res.ok) await refreshAll(token, set);
      return res;
    },

    createAccount: async (body) => {
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<BankAccount>("/api/accounts", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(token, set);
      return res;
    },
    updateAccount: async (id, body) => {
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<BankAccount>(`/api/accounts/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(token, set);
      return res;
    },
    deleteAccount: async (id) => {
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<{ id: string }>(`/api/accounts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) await refreshAll(token, set);
      return res;
    },

    createInvestment: async (body) => {
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<Investment>("/api/investments", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(token, set);
      return res;
    },
    updateInvestment: async (id, body) => {
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<Investment>(`/api/investments/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(token, set);
      return res;
    },
    deleteInvestment: async (id) => {
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<{ id: string }>(`/api/investments/${id}`, {
        method: "DELETE",
      });
      if (res.ok) await refreshAll(token, set);
      return res;
    },

    createGoal: async (body) => {
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<Goal>("/api/goals", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(token, set);
      return res;
    },
    updateGoal: async (id, body) => {
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<Goal>(`/api/goals/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(token, set);
      return res;
    },
    deleteGoal: async (id) => {
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<{ id: string }>(`/api/goals/${id}`, {
        method: "DELETE",
      });
      if (res.ok) await refreshAll(token, set);
      return res;
    },

    upsertBudget: async (body) => {
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<Budget>("/api/budgets", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (res.ok) await refreshAll(token, set);
      return res;
    },
    deleteBudget: async (category) => {
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<{ category: string }>("/api/budgets", {
        method: "DELETE",
        body: JSON.stringify({ category }),
      });
      if (res.ok) await refreshAll(token, set);
      return res;
    },

    updateSettings: async (body) => {
      // F-218e: the write-guard family's one missing member — the
      // token must be captured at ENTRY and the set guarded, or a
      // logout/hydrate landing mid-PUT writes the PREVIOUS user's
      // settings into the cleared store (the docblock's own contract).
      const token = sessionWriteToken;
      const res = await call<Settings>("/api/settings", {
        method: "PUT",
        body: JSON.stringify(body),
      });
      if (res.ok && token === sessionWriteToken) set({ settings: res.data });
      return res;
    },

    askCoach: async (question) => {
      return call<{ answer: string }>("/api/ai/coach", {
        method: "POST",
        body: JSON.stringify({ question }),
      });
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
