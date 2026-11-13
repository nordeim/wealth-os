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
