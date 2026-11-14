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
  // Session-239 (R-36, F-239a): the wall ADVANCES the write token —
  // the logout branch's own F-217l contract, applied to the third
  // window. Without the bump, a fetch already in flight when the wall
  // fired (its server-side read predating the revocation, so it
  // answers 200 with the old user's data) still held the live token
  // and committed AFTER the wall — re-populating the just-cleared
  // ledger over the login wall until the next fetch 401s and
  // re-walls. Every in-flight success-guard (refreshAll's token+sequence
  // pair, hydrate's dashboard and settings-tail guards, the inline
  // arms' own token-equality re-checks) evaluates against the
  // advanced token and discards the late landing.
  //
  // Session-240 (R-37, F-240a): the CALLER contract is the live user,
  // not the entry token — every 401 caller (refreshAll, mutate,
  // hydrate's dashboard arm, hydrate's settings tail, updateSettings,
  // askCoach — six sites) keys on `get().user !== null` (hydrate's
  // dashboard arm adds the fresh-token disjunct for the first load's
  // revocation window). The token equality form was a skip-hole: a
  // concurrent hydrate's own ENTRY bump (the shell-remount re-hydrate)
  // stales the captured token without any clear happening, so a
  // genuine session-death 401 was discarded alongside the stale
  // writes it was meant to guard. The wall and the logout are the
  // only clear-owners that null the user — user-standing is exactly
  // "no deliberate clear owns the face" — so a 401 under a standing
  // user always walls, the F-217l logout contract survives (logout
  // nulls the user before the late landing can check), and the wall
  // stays idempotent for later 401s (the user is already null).
  sessionWriteToken += 1;
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
  get: () => WealthOsState,
): Promise<Result<DashboardData, string>> {
  // Session-220 (R-17, F-220l): the sequence guard — two quick
  // mutations A→B can resolve out of order (A's fetch landing after
  // B's), overwriting B's fresher slices with stale ones; the
  // write-token guard below protects against logout only. A response
  // whose sequence is older than the latest issued is discarded
  // (last-request-wins).
  const seq = ++refreshSeq;
  const res = await call<DashboardData>("/api/dashboard");
  // Session-240 (R-37, F-240a): a 401 keys on the LIVE USER, above
  // the combined guard — pre-cure, a live-session 401 was discarded
  // on the stale-SEQUENCE dimension alone (two overlapping dashboard
  // fetches whose server reads straddle a revocation: the older-seq
  // read postdating it → 401 discarded, the newer-seq read predating
  // it → 200 committing the old user's ledger over the live store —
  // the F-239a threat model through the sequence dimension), and a
  // concurrent hydrate's own entry bump stales the token without any
  // clear happening. User-standing means no deliberate clear owns the
  // face → wall; user-null means the wall or logout already owns it
  // → the idempotent skip.
  if (!res.ok && res.code === "UNAUTHORIZED") {
    if (get().user !== null) commitRevocationWall(set);
    return res;
  }
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
  get: () => WealthOsState,
): Promise<Result<T, string>> {
  const token = sessionWriteToken; // F-217l: captured at entry
  const res = await call<T>(path, init);
  if (res.ok) {
    await refreshAll(token, set, get);
  } else if (res.code === "UNAUTHORIZED" && get().user !== null) {
    // Session-238 (R-35, F-238b): the third revocation window — the
    // wall behind the guard. Session-240 (R-37, F-240a): the guard is
    // the LIVE USER, not the entry token — a concurrent hydrate's own
    // entry bump stales the captured token without any clear
    // happening, so the token equality form skipped genuine
    // session-death 401s; the logout contract survives the re-key
    // (the logout clear nulls the user before this landing checks).
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
      // Session-240 (R-37, F-240a): the 401 arm rides ABOVE the
      // entry-token guard — a concurrent hydrate's own entry bump
      // (this action's remount twin) stales the token without any
      // clear happening, so a standing user's 401 walls regardless of
      // the token; the fresh-token disjunct keeps the FIRST-LOAD
      // revocation walling (user null, no clear owns the face yet).
      if (!res.ok && res.code === "UNAUTHORIZED") {
        if (get().user !== null || token === sessionWriteToken) {
          // Session-220 (R-17, F-220j): the code-keyed branch (was a
          // message-substring match). Session-238 (R-35, F-238c): the
          // commit rides the shared wall shape — hydrated stays true
          // (the wall's semantics) and the slices clear (the
          // logout-clear parity).
          commitRevocationWall(set, { hydrated: true });
        }
        return;
      }
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
        // Session-240 (R-37, F-240b): a 401 here means the revocation
        // landed between hydrate's two calls (the dashboard 200
        // predated it, the settings GET postdates it) — the wall, not
        // the amber could-not-load settle the old arm rendered over
        // the revoked user's standing ledger.
        if (!settingsRes.ok && settingsRes.code === "UNAUTHORIZED" && get().user !== null) {
          commitRevocationWall(set);
          return;
        }
        if (token === sessionWriteToken) {
          // Session-234 (R-31, F-234a): flip the settled flag in BOTH
          // arms — the in-flight window renders nothing on the Settings
          // page; only a settled-and-missing slice is a failure face.
          set({
            settingsSettled: true,
            ...(settingsRes.ok ? { settings: settingsRes.data } : {}),
          });
        }
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
      return refreshAll(token, set, get);
    },

    // Session-238 (R-35, F-238b): every refreshAll-family action rides
    // the shared mutate wrapper — the F-217l entry token, the F-216d
    // post-success refresh, and the third-window 401 wall all live in
    // one place (a future action cannot forget the arm).
    createTransaction: (body) =>
      mutate<Transaction>("/api/transactions", {
        method: "POST",
        body: JSON.stringify(body),
      }, set, get),
    updateTransaction: (id, body) =>
      mutate<Transaction>(`/api/transactions/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }, set, get),
    deleteTransaction: (id) =>
      mutate<{ id: string }>(`/api/transactions/${id}`, {
        method: "DELETE",
      }, set, get),
    importTransactions: (rows) =>
      mutate<{ imported: number }>("/api/import", {
        method: "POST",
        body: JSON.stringify({ rows }),
      }, set, get),

    createIncomeSource: (body) =>
      mutate<IncomeSource>("/api/income-sources", {
        method: "POST",
        body: JSON.stringify(body),
      }, set, get),
    updateIncomeSource: (id, body) =>
      mutate<IncomeSource>(`/api/income-sources/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }, set, get),
    deleteIncomeSource: (id) =>
      mutate<{ id: string }>(`/api/income-sources/${id}`, {
        method: "DELETE",
      }, set, get),

    createAccount: (body) =>
      mutate<BankAccount>("/api/accounts", {
        method: "POST",
        body: JSON.stringify(body),
      }, set, get),
    updateAccount: (id, body) =>
      mutate<BankAccount>(`/api/accounts/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }, set, get),
    deleteAccount: (id) =>
      mutate<{ id: string }>(`/api/accounts/${id}`, {
        method: "DELETE",
      }, set, get),

    createInvestment: (body) =>
      mutate<Investment>("/api/investments", {
        method: "POST",
        body: JSON.stringify(body),
      }, set, get),
    updateInvestment: (id, body) =>
      mutate<Investment>(`/api/investments/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }, set, get),
    deleteInvestment: (id) =>
      mutate<{ id: string }>(`/api/investments/${id}`, {
        method: "DELETE",
      }, set, get),

    createGoal: (body) =>
      mutate<Goal>("/api/goals", {
        method: "POST",
        body: JSON.stringify(body),
      }, set, get),
    updateGoal: (id, body) =>
      mutate<Goal>(`/api/goals/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }, set, get),
    deleteGoal: (id) =>
      mutate<{ id: string }>(`/api/goals/${id}`, {
        method: "DELETE",
      }, set, get),

    upsertBudget: (body) =>
      mutate<Budget>("/api/budgets", {
        method: "POST",
        body: JSON.stringify(body),
      }, set, get),
    deleteBudget: (category) =>
      mutate<{ category: string }>("/api/budgets", {
        method: "DELETE",
        body: JSON.stringify({ category }),
      }, set, get),

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
      // toasting over the stale shell. Session-240 (R-37, F-240a): the
      // guard is the LIVE USER (a concurrent hydrate's entry bump
      // stales the token without a clear; the logout nulls the user
      // first, so its contract survives the re-key).
      if (res.code === "UNAUTHORIZED" && get().user !== null) {
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
      // Session-240 (R-37, F-240a): the live-user key (the hydrate-bump
      // staleness window; the logout nulls the user first).
      if (!res.ok && res.code === "UNAUTHORIZED" && get().user !== null) {
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
