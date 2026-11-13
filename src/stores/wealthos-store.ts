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
  // Session-234 (R-31, F-234a): the settings fetch's settled flag —
  // hydrate commits its loading drop BEFORE the settings await, so
  // slice-null alone cannot distinguish "in flight" from "failed"
  // (the Settings page's amber guard flashed on every hard load under
  // real latency). The flag flips in BOTH arms of the fetch and resets
  // on every hydrate/logout cycle; the page keys its reason line on it
  // instead of the loading drop.
  settingsSettled: boolean;

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

/** Session-238 (R-35, F-238c): the revocation wall's store commit — the
 *  logout-clear parity. Both UNAUTHORIZED branches and the mutation
 *  wrapper's 401 arm commit this shape: the user nulls WITH error-null
 *  (the F-237a discriminator the shell gate reads — the wall fires),
 *  and every domain slice empties exactly as the logout branch empties
 *  them. Pre-cure the wall branches committed only the user/error pair,
 *  leaving the previous user's ledger standing in the globalThis store:
 *  on the compound path (revocation-without-logout → a different user
 *  signs in → their first hydrate fails non-401) the error face
 *  rendered the PREVIOUS user's financial data under the banner. The
 *  wall never leaves a standing ledger. */
function commitRevocationWall(
  set: (partial: Partial<WealthOsState>) => void,
  extra: Partial<WealthOsState> = {},
): void {
  set({
    ...extra,
    loading: false,
    user: null,
    error: null,
    transactions: [],
    incomeSources: [],
    accounts: [],
    investments: [],
    goals: [],
    budgets: [],
    settings: null,
    settingsSettled: false,
  });
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
  } else if (res.code === "UNAUTHORIZED") {
    // Session-237 (R-34, F-237a): the mid-session revocation window.
    // Pre-cure this arm set only the error — a session revoked between
    // mutations rendered "Sign in required" in the banner over a stale
    // workspace (the user object survived, so the shell's revocation
    // gate never fired). Mirrors hydrate's UNAUTHORIZED branch: the
    // user nulls, the error stays null, and the shell re-establishes
    // the login wall with the from_url round-trip — the F-236f intent
    // completed on both windows. Session-238 (R-35, F-238c): the
    // commit rides the shared wall shape — the slices clear too.
    commitRevocationWall(set);
  } else {
    set({ loading: false, error: res.error });
  }
  return res;
}

/** Session-238 (R-35, F-238b): the third revocation window. The
 *  F-236f/F-237a wall covered hydrate and refreshAll — but every
 *  mutation action refreshed only on success, so a revocation (the TTL
 *  crossed, a password reset in another tab) surfacing on the mutation
 *  POST itself returned 401 to the page, which toasted "Save failed —
 *  Sign in required" over a dead stale workspace: the store committed
 *  nothing, the user survived, the gate never fired, and section pages
 *  carry no Refresh control — the wall was unreachable without a
 *  navigation. The wrapper keeps the F-217l entry-captured token and
 *  the F-216d post-success refresh; a failure arm carrying
 *  UNAUTHORIZED commits the wall behind the token guard, and every
 *  mutation action inherits it. */
async function mutate<T>(
  path: string,
  init: RequestInit,
  set: (partial: Partial<WealthOsState>) => void,
): Promise<Result<T, string>> {
  const token = sessionWriteToken; // F-217l: captured at entry
  const res = await call<T>(path, init);
  if (res.ok) {
    await refreshAll(token, set);
  } else if (res.code === "UNAUTHORIZED" && token === sessionWriteToken) {
    commitRevocationWall(set);
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
    settingsSettled: false,
    loading: true,
    error: null,

    hydrate: async () => {
      const token = ++sessionWriteToken;
      // Session-237 (R-34, F-237c): the remount discriminator. The root
      // dashboard route and the (app) group render two AppShell tree
      // positions — the post-login landing on `/` makes the first
      // sidebar click a REMOUNT, and the mount effect re-entered here
      // unconditionally re-gating with loading:true (a full-screen
      // loader over already-loaded data + a redundant refetch of both
      // endpoints). A remount (the store holds a live user) refreshes
      // in place: no loading flip, the chrome and slices stay painted,
      // the fetches land underneath. First loads and the Try-again
      // retry (user null on the failure face) keep the gate.
      const remount = get().hydrated && get().user !== null;
      // Session-217 (R-14, F-217k): clear the stale error at entry — the
      // error banner's Try-again re-entered here with the previous error
      // still set (the banner + the LoadingBlock rendered together
      // mid-retry), and a 401 landing left a stale non-auth error
      // standing after the failure mode changed.
      set(
        remount
          ? { error: null, settingsSettled: false }
          : { loading: true, error: null, settingsSettled: false },
      );
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
        if (token === sessionWriteToken) {
          // Session-234 (R-31, F-234a): flip the settled flag in BOTH
          // arms — the in-flight window renders nothing on the Settings
          // page; only a settled-and-missing slice is a failure face.
          set({
            settingsSettled: true,
            ...(settingsRes.ok ? { settings: settingsRes.data } : {}),
          });
        }
      } else if (res.code === "UNAUTHORIZED") {
        // Session-220 (R-17, F-220j): the code-keyed branch (was a
        // message-substring match on "authenticate"/"Sign in").
        // Session-238 (R-35, F-238c): the commit rides the shared
        // wall shape — hydrated stays true (the wall's semantics) and
        // the slices clear (the logout-clear parity).
        commitRevocationWall(set, { hydrated: true });
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
        settingsSettled: false,
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

    // Session-238 (R-35, F-238b): every refreshAll-family action rides
    // the shared mutate wrapper — the F-217l entry token, the F-216d
    // post-success refresh, and the third-window 401 wall all live in
    // one place (a future action cannot forget the arm).
    createTransaction: (body) =>
      mutate<Transaction>("/api/transactions", {
        method: "POST",
        body: JSON.stringify(body),
      }, set),
    updateTransaction: (id, body) =>
      mutate<Transaction>(`/api/transactions/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }, set),
    deleteTransaction: (id) =>
      mutate<{ id: string }>(`/api/transactions/${id}`, {
        method: "DELETE",
      }, set),
    importTransactions: (rows) =>
      mutate<{ imported: number }>("/api/import", {
        method: "POST",
        body: JSON.stringify({ rows }),
      }, set),

    createIncomeSource: (body) =>
      mutate<IncomeSource>("/api/income-sources", {
        method: "POST",
        body: JSON.stringify(body),
      }, set),
    updateIncomeSource: (id, body) =>
      mutate<IncomeSource>(`/api/income-sources/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }, set),
    deleteIncomeSource: (id) =>
      mutate<{ id: string }>(`/api/income-sources/${id}`, {
        method: "DELETE",
      }, set),

    createAccount: (body) =>
      mutate<BankAccount>("/api/accounts", {
        method: "POST",
        body: JSON.stringify(body),
      }, set),
    updateAccount: (id, body) =>
      mutate<BankAccount>(`/api/accounts/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }, set),
    deleteAccount: (id) =>
      mutate<{ id: string }>(`/api/accounts/${id}`, {
        method: "DELETE",
      }, set),

    createInvestment: (body) =>
      mutate<Investment>("/api/investments", {
        method: "POST",
        body: JSON.stringify(body),
      }, set),
    updateInvestment: (id, body) =>
      mutate<Investment>(`/api/investments/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }, set),
    deleteInvestment: (id) =>
      mutate<{ id: string }>(`/api/investments/${id}`, {
        method: "DELETE",
      }, set),

    createGoal: (body) =>
      mutate<Goal>("/api/goals", {
        method: "POST",
        body: JSON.stringify(body),
      }, set),
    updateGoal: (id, body) =>
      mutate<Goal>(`/api/goals/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }, set),
    deleteGoal: (id) =>
      mutate<{ id: string }>(`/api/goals/${id}`, {
        method: "DELETE",
      }, set),

    upsertBudget: (body) =>
      mutate<Budget>("/api/budgets", {
        method: "POST",
        body: JSON.stringify(body),
      }, set),
    deleteBudget: (category) =>
      mutate<{ category: string }>("/api/budgets", {
        method: "DELETE",
        body: JSON.stringify({ category }),
      }, set),

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
      if (res.ok) {
        if (token === sessionWriteToken) set({ settings: res.data });
        return res;
      }
      // Session-238 (R-35, F-238b): the third window joins here too —
      // this action sets its slice directly instead of refreshing, so
      // the arm rides inline: a revoked settings PUT walls instead of
      // toasting over the stale shell.
      if (res.code === "UNAUTHORIZED" && token === sessionWriteToken) {
        commitRevocationWall(set);
      }
      return res;
    },

    askCoach: async (question) => {
      // Session-238 (R-35, F-238b): the third window — a revoked coach
      // POST walls instead of toasting inside the dialog over a dead
      // workspace. The token guard is the F-217l race family: a coach
      // answer landing after a logout → different-user sign-in must
      // never clear the NEW session.
      const token = sessionWriteToken; // F-217l: captured at entry
      const res = await call<{ answer: string }>("/api/ai/coach", {
        method: "POST",
        body: JSON.stringify({ question }),
      });
      if (!res.ok && res.code === "UNAUTHORIZED" && token === sessionWriteToken) {
        commitRevocationWall(set);
      }
      return res;
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
