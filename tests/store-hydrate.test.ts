import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Session-237 (R-34, F-237a/F-237c): the hydrate/refreshAll honesty
// pair's behavioral pin. Two windows shipped wrong inside the F-236f
// round's blast radius:
//
// (a) the revocation gate keyed on storeUser-null, but the non-401
//     failure branch ALSO leaves user at its initial null on a first
//     load — ANY first-load failure bounced a valid-session user to
//     the login wall with the error banner unreachable (F-237a). The
//     store-level contract: user stays null ONLY on the UNAUTHORIZED
//     arm (which also commits error-null — the discriminator the
//     shell gate now reads); the failure arm commits the error; the
//     mid-session refresh joins the same split.
// (b) the mount effect's hydrate() unconditionally re-gated with
//     loading:true — the `/` ↔ section-route AppShell remount flashed
//     the full-screen loader over already-loaded data (F-237c). The
//     contract: a remount (the store holds a live user) refreshes in
//     place without the re-gate; a first load still gates.
//
// The store is exercised directly (zustand works headless in node):
// fetch is mocked per leg; the assertions read the live state.

type StoreModule = typeof import("../src/stores/wealthos-store");

const user = {
  id: "u1",
  email: "demo@example.com",
  name: "Demo",
  avatarColor: "#f59e0b",
  photoUrl: null,
  role: "user",
};

function jsonRes(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function dashboardEnvelope() {
  return jsonRes({
    ok: true,
    data: {
      transactions: [],
      incomeSources: [],
      accounts: [],
      investments: [],
      goals: [],
      budgets: [],
      user,
    },
  });
}

// Response bodies are single-use — factories, never shared constants
// (a reused Response answers json() with null and the call() seam's
// fallback message — the first draft of this battery tripped on it).
function internal500(): Response {
  return jsonRes({
    ok: false,
    error: { code: "INTERNAL", message: "Something went wrong. Please try again." },
  }, 500);
}

function unauthorized401(): Response {
  return jsonRes({
    ok: false,
    error: { code: "UNAUTHORIZED", message: "Sign in required" },
  }, 401);
}

// The store rides globalThis (the code-split singleton doctrine) — a
// module re-import alone does NOT build a fresh store, so each leg
// drops the global key first or the previous test's user leaks into
// the next (the first draft's first-load control leg tripped on it).
async function freshStore(): Promise<StoreModule["useWealthOs"]> {
  delete (globalThis as { __wealthosStore?: unknown }).__wealthosStore;
  const mod = (await import("../src/stores/wealthos-store")) as StoreModule;
  return mod.useWealthOs;
}

describe("F-237a — the revocation/failure split (user stays null ONLY on the auth arm)", () => {
  let store: StoreModule["useWealthOs"];
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.resetModules();
    fetchMock = vi.fn();
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    store = await freshStore();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("a first-load 401 commits user-null AND error-null (the wall face)", async () => {
    fetchMock.mockResolvedValueOnce(unauthorized401());
    await store.getState().hydrate();
    const s = store.getState();
    expect(s.hydrated).toBe(true);
    expect(s.loading).toBe(false);
    expect(s.user).toBeNull();
    expect(s.error).toBeNull();
  });

  it("a first-load 500 commits the error with user untouched-at-null (the banner face precondition)", async () => {
    // Genus guard (green at the pre-cure tree by design): the store
    // branch itself never changed — this leg pins the PRECONDITION the
    // shell gate discriminates on (error set ⇒ not the wall).
    fetchMock.mockResolvedValueOnce(internal500());
    await store.getState().hydrate();
    const s = store.getState();
    expect(s.hydrated).toBe(true);
    expect(s.loading).toBe(false);
    expect(s.user).toBeNull();
    expect(s.error).toBe("Something went wrong. Please try again.");
  });

  it("a mid-session refresh 401 nulls the user and the error (the mid-session wall)", async () => {
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [{ id: "t1" }] as never,
    });
    fetchMock.mockResolvedValueOnce(unauthorized401());
    const res = await store.getState().refresh();
    expect(res.ok).toBe(false);
    const s = store.getState();
    expect(s.user).toBeNull();
    expect(s.error).toBeNull();
    expect(s.loading).toBe(false);
  });

  it("a mid-session refresh 500 keeps the user and surfaces the error (the banner over the workspace)", async () => {
    // Genus guard: the non-auth failure arm's shape (pre-cure and
    // post-cure alike) — the split must never swallow this face.
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [{ id: "t1" }] as never,
    });
    fetchMock.mockResolvedValueOnce(internal500());
    const res = await store.getState().refresh();
    expect(res.ok).toBe(false);
    const s = store.getState();
    expect(s.user).toEqual(user);
    expect(s.error).toBe("Something went wrong. Please try again.");
  });
});

describe("F-237c — the remount hydrate never re-gates", () => {
  let store: StoreModule["useWealthOs"];
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.resetModules();
    fetchMock = vi.fn();
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    store = await freshStore();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("a remount (live user in the store) keeps loading FALSE through the in-flight window", async () => {
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [{ id: "t1" }] as never,
    });
    // A fetch we hold pending — the in-flight window the mount effect
    // used to spend behind the full-screen loader.
    let release!: (r: Response) => void;
    fetchMock.mockReturnValueOnce(
      new Promise<Response>((resolve) => {
        release = resolve;
      }),
    );
    const pending = store.getState().hydrate();
    // Synchronous read: the entry write must NOT have flipped loading.
    expect(store.getState().loading).toBe(false);
    release(dashboardEnvelope());
    fetchMock.mockResolvedValueOnce(jsonRes({ ok: true, data: {} })); // settings
    await pending;
    const s = store.getState();
    expect(s.loading).toBe(false);
    expect(s.error).toBeNull();
    expect(s.user).toEqual(user);
  });

  it("a FIRST load still gates (loading true through the in-flight window)", async () => {
    // Genus guard: the first-load gating must survive the remount
    // cure — the discriminator must not over-fire.
    let release!: (r: Response) => void;
    fetchMock.mockReturnValueOnce(
      new Promise<Response>((resolve) => {
        release = resolve;
      }),
    );
    const pending = store.getState().hydrate();
    expect(store.getState().loading).toBe(true);
    release(dashboardEnvelope());
    fetchMock.mockResolvedValueOnce(jsonRes({ ok: true, data: {} })); // settings
    await pending;
    expect(store.getState().loading).toBe(false);
  });
});

// Session-238 (R-35, F-238b/F-238c): the third-window and slice-hygiene
// extensions. The F-236f/F-237a wall covered hydrate and refreshAll;
// a revocation surfacing on the mutation POST itself returned 401 to
// the page, which toasted "Save failed — Sign in required" over a dead
// stale workspace (F-238b). And neither UNAUTHORIZED branch cleared the
// domain slices — on the compound path (revocation-without-logout →
// different-user sign-in → failed first hydrate) the PREVIOUS user's
// financial data rendered under the error banner (F-238c).
describe("F-238b — a mutation 401 commits the wall (the third window)", () => {
  let store: StoreModule["useWealthOs"];
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.resetModules();
    fetchMock = vi.fn();
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    store = await freshStore();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("a mutation POST answering 401 nulls the user and the error, clearing the slices", async () => {
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [{ id: "t1" }] as never,
    });
    fetchMock.mockResolvedValueOnce(unauthorized401());
    const res = await store.getState().createTransaction({ description: "x" });
    expect(res.ok).toBe(false);
    const s = store.getState();
    // The wall face — never the toast-only stale workspace.
    expect(s.user).toBeNull();
    expect(s.error).toBeNull();
    expect(s.loading).toBe(false);
    // F-238c rides the same commit: no standing ledger.
    expect(s.transactions).toEqual([]);
  });

  it("a mutation POST answering 500 keeps the workspace (the caller's toast stays honest)", async () => {
    // Genus guard: the non-auth failure arm's shape — a failed save
    // must NOT wall (the banner genus, the F-237a split preserved).
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [{ id: "t1" }] as never,
    });
    fetchMock.mockResolvedValueOnce(internal500());
    const res = await store.getState().createTransaction({ description: "x" });
    expect(res.ok).toBe(false);
    const s = store.getState();
    expect(s.user).toEqual(user);
    expect(s.transactions).toEqual([{ id: "t1" }]);
  });
});

describe("F-238c — the 401 branches clear the domain slices", () => {
  let store: StoreModule["useWealthOs"];
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.resetModules();
    fetchMock = vi.fn();
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    store = await freshStore();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("a first-load 401 empties every domain slice (the cross-user compound path)", async () => {
    // The compound path: user A revoked (the wall) → A's slices stand
    // in the globalThis store → user B signs in (the login card never
    // touches the store) → B's hydrate takes the FIRST-LOAD path → a
    // 401 here must clear A's data, never render it.
    store.setState({
      user: null,
      hydrated: false,
      transactions: [{ id: "t1" }] as never,
      incomeSources: [{ id: "i1" }] as never,
      accounts: [{ id: "a1" }] as never,
      investments: [{ id: "v1" }] as never,
      goals: [{ id: "g1" }] as never,
      budgets: [{ id: "b1" }] as never,
      settings: { currency: "USD" } as never,
      settingsSettled: true,
      loading: false,
      error: null,
    });
    fetchMock.mockResolvedValueOnce(unauthorized401());
    await store.getState().hydrate();
    const s = store.getState();
    expect(s.user).toBeNull();
    expect(s.transactions).toEqual([]);
    expect(s.incomeSources).toEqual([]);
    expect(s.accounts).toEqual([]);
    expect(s.investments).toEqual([]);
    expect(s.goals).toEqual([]);
    expect(s.budgets).toEqual([]);
    expect(s.settings).toBeNull();
    expect(s.settingsSettled).toBe(false);
  });

  it("a mid-session refresh 401 clears the slices too (the wall leaves no standing ledger)", async () => {
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [{ id: "t1" }] as never,
      settings: { currency: "USD" } as never,
      settingsSettled: true,
    });
    fetchMock.mockResolvedValueOnce(unauthorized401());
    const res = await store.getState().refresh();
    expect(res.ok).toBe(false);
    const s = store.getState();
    expect(s.user).toBeNull();
    expect(s.transactions).toEqual([]);
    expect(s.settings).toBeNull();
  });
});

// Session-239 (R-36): the wall-token and coverage-completion extensions.
// F-239a: commitRevocationWall never bumped the write token — a fetch
// already in flight when the wall fired (its server-side read predating
// the revocation, so it answers 200 with the OLD user's data) passed
// every write-guard and re-populated the just-cleared ledger over the
// login wall. The wall now advances the token; a late landing must
// discard. F-239d: the two INLINE 401 arms (updateSettings, askCoach)
// and the mutation-200→refresh-401 composition had no behavioral legs.
describe("F-239a — a late-landing 200 cannot re-populate the walled store", () => {
  let store: StoreModule["useWealthOs"];
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.resetModules();
    fetchMock = vi.fn();
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    store = await freshStore();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("a pre-revocation dashboard 200 resolving AFTER a mutation-401 wall leaves every slice empty", async () => {
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [{ id: "t1" }] as never,
      settings: { currency: "USD" } as never,
      settingsSettled: true,
    });
    // An in-flight manual refresh whose dashboard read predates the
    // revocation — it answers 200 with the old user's data, but it
    // LANDS after the wall. Held pending so the wall fires first.
    let releaseRefresh!: (r: Response) => void;
    fetchMock.mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          releaseRefresh = resolve;
        }),
    );
    const pendingRefresh = store.getState().refresh();
    // The mutation itself answers 401 — the wall commits NOW.
    fetchMock.mockResolvedValueOnce(unauthorized401());
    const res = await store.getState().deleteTransaction("t1");
    expect(res.ok).toBe(false);
    const walled = store.getState();
    expect(walled.user).toBeNull();
    expect(walled.transactions).toEqual([]);
    // The late 200 lands — the pre-cure tree re-populated user +
    // slices here (the guard still passed: the wall never bumped).
    releaseRefresh(dashboardEnvelope());
    await pendingRefresh;
    const s = store.getState();
    expect(s.user).toBeNull();
    expect(s.transactions).toEqual([]);
    expect(s.settings).toBeNull();
    expect(s.error).toBeNull();
  });

  it("a SECOND 401 landing after the wall stays walled (the idempotent skip)", async () => {
    // Genus guard: the bump must not break the wall's own idempotence —
    // a later 401 (the refresh's own arm) compares its stale token,
    // skips the wall commit, and the store stays on the wall face.
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [{ id: "t1" }] as never,
    });
    fetchMock.mockResolvedValueOnce(unauthorized401());
    await store.getState().createTransaction({ description: "x" });
    expect(store.getState().user).toBeNull();
    // The in-flight refresh from the SAME pre-wall entry also 401s.
    fetchMock.mockResolvedValueOnce(unauthorized401());
    await store.getState().refresh();
    const s = store.getState();
    expect(s.user).toBeNull();
    expect(s.error).toBeNull();
    expect(s.transactions).toEqual([]);
  });
});

describe("F-239d — the inline 401 arms and the refreshAll-wall composition", () => {
  let store: StoreModule["useWealthOs"];
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.resetModules();
    fetchMock = vi.fn();
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    store = await freshStore();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("updateSettings answering 401 commits the wall (the inline arm)", async () => {
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [{ id: "t1" }] as never,
    });
    fetchMock.mockResolvedValueOnce(unauthorized401());
    const res = await store.getState().updateSettings({ theme: "dark" });
    expect(res.ok).toBe(false);
    const s = store.getState();
    expect(s.user).toBeNull();
    expect(s.error).toBeNull();
    expect(s.transactions).toEqual([]);
  });

  it("askCoach answering 401 commits the wall (the inline arm)", async () => {
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [{ id: "t1" }] as never,
    });
    fetchMock.mockResolvedValueOnce(unauthorized401());
    const res = await store.getState().askCoach("how am I doing?");
    expect(res.ok).toBe(false);
    const s = store.getState();
    expect(s.user).toBeNull();
    expect(s.error).toBeNull();
    expect(s.transactions).toEqual([]);
  });

  it("a mutation 200 whose post-success refresh 401s commits the wall via refreshAll's arm", async () => {
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [{ id: "t1" }] as never,
    });
    // The mutation itself succeeds (200 + ok:true envelope)…
    fetchMock.mockResolvedValueOnce(
      jsonRes({ ok: true, data: { id: "t2" } }),
    );
    // …but the session died between the write and the refresh — the
    // dashboard GET answers 401. The wall must fire through
    // refreshAll's own arm (the composition F-238b's wrapper relies
    // on but no leg ever drove).
    fetchMock.mockResolvedValueOnce(unauthorized401());
    const res = await store.getState().createTransaction({ description: "x" });
    expect(res.ok).toBe(true);
    const s = store.getState();
    expect(s.user).toBeNull();
    expect(s.error).toBeNull();
    expect(s.transactions).toEqual([]);
  });

  it("a logout landing mid-mutation prevents BOTH the write and a spurious wall (the F-217l guard)", async () => {
    // Genus guard: the entry-captured token exists to protect the
    // LOGOUT clear — a mutation resolving after a logout must neither
    // re-populate the store nor wall it (the user deliberately left;
    // the login wall is the next route's own face).
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [{ id: "t1" }] as never,
    });
    // The mutation is in flight when the logout lands.
    let releaseMutation!: (r: Response) => void;
    fetchMock.mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          releaseMutation = resolve;
        }),
    );
    const pendingMutation = store.getState().createTransaction({
      description: "x",
    });
    // The logout: bumps the token, succeeds, clears.
    fetchMock.mockResolvedValueOnce(jsonRes({ ok: true, data: {} }));
    const loggedOut = await store.getState().logout();
    expect(loggedOut).toBe(true);
    expect(store.getState().user).toBeNull();
    expect(store.getState().hydrated).toBe(false);
    // The mutation's 401 lands LATE — the wrapper's token guard must
    // skip the wall (the logout already owns the store's face).
    releaseMutation(unauthorized401());
    await pendingMutation;
    const s = store.getState();
    expect(s.user).toBeNull();
    expect(s.hydrated).toBe(false);
    expect(s.transactions).toEqual([]);
  });
});
