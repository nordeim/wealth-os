import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Session-249 (R-46, F-249c/F-249d): the remount-interleaving battery —
// F-248f's dedicated round. The store's fetch coordination carried three
// windows where a STALE read won over a FRESH one, or a stale guard
// discarded a fresh write / mis-reported a completed clear:
//
// (a) THE REGISTERED LEG (F-248f): a mutation issued from a section page
//     and a root-crossing remount hydrate interleaved so the hydrate's
//     pre-write dashboard payload committed while the mutation's
//     post-write refreshAll was discarded on the token dimension alone
//     (the hydrate's entry bump staled it with no clear happening) — the
//     user saw the row they deleted beside its success toast until the
//     next fetch.
// (b) THE REVERSE LEG (S1): hydrate's GET issued before a mutation's
//     POST landed carried a pre-write read that OVERWROTE the mutation's
//     fresher refreshAll commit — no ordering dimension existed between
//     the two dashboard-GET families.
// (c) THE ERA-THREADING LEG (I-3): refreshAll re-captured its OWN era at
//     entry instead of the mutate wrapper's, so a mutation landing 200
//     after a completed logout re-captured the post-logout era and its
//     401 arm WALLED over the logout face (loading:false over the
//     F-240f login-transition discriminator).
// (d) THE LOGOUT-RETURN LEG (F-249d): a remount hydrate entering inside
//     logout's POST window bumped the token, staled the return guard,
//     and flipped a server-SUCCESSFUL logout to false with no clear.
//
// The cure (one seam, three coordinated re-keys): refreshAll's
// success/failure commit guards on the CALLER's entry era + the shared
// sequence; mutate threads its entry era; hydrate's dashboard GET joins
// the sequence at issue time (the later-issued read wins in both landing
// orders) and the superseded landing skips only the slice commit — the
// settings tail still runs (the F-234a cycle settles; the guards no-op
// on dead sessions). The write paths keep the token key.
//
// The store is exercised directly (zustand works headless in node):
// fetch is mocked per leg with held-Promise responders where an
// interleaving needs landing-order control; the assertions read the
// live state.

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

// Response bodies are single-use — factories, never shared constants.
function dashboardEnvelopeWithRow(): Response {
  return jsonRes({
    ok: true,
    data: {
      transactions: [{ id: "t1" }],
      incomeSources: [],
      accounts: [],
      investments: [],
      goals: [],
      budgets: [],
      user,
    },
  });
}

function dashboardEnvelopeWithoutRow(): Response {
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

function okEnvelope(): Response {
  return jsonRes({ ok: true, data: {} });
}

function unauthorized401(): Response {
  return jsonRes({
    ok: false,
    error: { code: "UNAUTHORIZED", message: "Sign in required" },
  }, 401);
}

function settingsEnvelope(): Response {
  return jsonRes({ ok: true, data: { currency: "USD" } });
}

// The store rides globalThis (the code-split singleton doctrine) — drop
// the key per leg or the previous test's state leaks into the next.
async function freshStore(): Promise<StoreModule["useWealthOs"]> {
  delete (globalThis as { __wealthosStore?: unknown }).__wealthosStore;
  const mod = (await import("../src/stores/wealthos-store")) as StoreModule;
  return mod.useWealthOs;
}

describe("F-249c — the remount-hydrate stale-read interleavings", () => {
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

  it("the registered leg: the mutation's post-write refresh wins over the remount's pre-write payload", async () => {
    // The workspace stands hydrated with one transaction; the user
    // deletes it from a section page and the shell crosses to the root
    // route inside the POST window (the AppShell remount).
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [{ id: "t1" }] as never,
      settings: { currency: "USD" } as never,
      settingsSettled: true,
    });
    // The DELETE POST is held mid-commit...
    let releaseMutation!: (r: Response) => void;
    fetchMock.mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          releaseMutation = resolve;
        }),
    );
    const pendingMutation = store.getState().deleteTransaction("t1");
    // ...the remount hydrate lands FIRST with the pre-write payload
    // (its server read predates the DELETE's commit) and a fresh
    // settings read.
    fetchMock.mockResolvedValueOnce(dashboardEnvelopeWithRow());
    fetchMock.mockResolvedValueOnce(settingsEnvelope());
    await store.getState().hydrate();
    // Pre-cure the store already stood here — the proof is what
    // happens when the mutation completes.
    // The DELETE commits server-side; the mutation's refreshAll reads
    // POST-write (the row gone).
    fetchMock.mockResolvedValueOnce(dashboardEnvelopeWithoutRow());
    releaseMutation(okEnvelope());
    await pendingMutation;
    const s = store.getState();
    // THE REGISTERED DEFECT: the stale hydrate payload stood beside
    // the success result (the refreshAll commit was discarded on the
    // token dimension alone — the hydrate's entry bump staled it with
    // no clear happening). The cure: the era-keyed commit lands.
    expect(s.transactions).toEqual([]);
    expect(s.user).not.toBeNull();
    expect(s.error).toBeNull();
  });

  it("the reverse leg: a hydrate GET issued before the mutation's POST lands cannot overwrite the fresher commit", async () => {
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [{ id: "t1" }] as never,
      settings: { currency: "USD" } as never,
      settingsSettled: true,
    });
    // The remount hydrate's dashboard GET is held (issued BEFORE the
    // mutation's POST lands — its server read predates the write).
    let releaseHydrate!: (r: Response) => void;
    fetchMock.mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          releaseHydrate = resolve;
        }),
    );
    const pendingHydrate = store.getState().hydrate();
    // The mutation completes: POST 200, then the refreshAll GET reads
    // post-write (the row gone) and commits.
    fetchMock.mockResolvedValueOnce(okEnvelope());
    fetchMock.mockResolvedValueOnce(dashboardEnvelopeWithoutRow());
    const res = await store.getState().deleteTransaction("t1");
    expect(res.ok).toBe(true);
    expect(store.getState().transactions).toEqual([]);
    // The stale hydrate GET lands LAST with the pre-write payload —
    // pre-cure its landing committed unconditionally (its token was
    // live) and the deleted row reappeared.
    releaseHydrate(dashboardEnvelopeWithRow());
    await pendingHydrate;
    const s = store.getState();
    // The cure: the superseded landing skips the slice commit (the
    // later-issued dashboard read owns the store).
    expect(s.transactions).toEqual([]);
    expect(s.user).not.toBeNull();
    // The settings-tail settle rider: the superseded remount landing
    // still settles its F-234a cycle (no stranded in-flight face).
    expect(s.settingsSettled).toBe(true);
  });

  it("the era-threading leg: a mutation 200 landing after a completed logout must not wall over the logout face", async () => {
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [{ id: "t1" }] as never,
    });
    // The mutation POST is in flight when the logout starts.
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
    // The logout completes: the clear commits with the
    // login-transition loading gate (the F-240f discriminator).
    fetchMock.mockResolvedValueOnce(okEnvelope());
    const loggedOut = await store.getState().logout();
    expect(loggedOut).toBe(true);
    expect(store.getState().loading).toBe(true);
    // The mutation's POST lands 200 (the server applied it before the
    // eviction); its refreshAll reads a dead session — the 401 arm
    // must recognize the logout's ownership and SKIP the wall.
    fetchMock.mockResolvedValueOnce(unauthorized401());
    releaseMutation(okEnvelope());
    await pendingMutation;
    const s = store.getState();
    // THE ERA-THREADING DEFECT: pre-cure refreshAll re-captured its
    // own era at entry (post-logout), the arm matched, and the wall
    // fired over the logout face — flipping the loading gate the
    // login transition rides.
    expect(s.loading).toBe(true);
    expect(s.user).toBeNull();
    expect(s.hydrated).toBe(false);
  });
});

describe("F-249d — the logout return guard survives a remount hydrate inside the POST window", () => {
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

  it("a hydrate entering the POST window cannot flip a server-successful logout to false", async () => {
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [{ id: "t1" }] as never,
    });
    // The logout's POST is held; inside the window the shell remounts
    // and re-hydrates (the root crossing) — the hydrate's entry bump
    // staled the OLD token-keyed return guard.
    let releaseLogout!: (r: Response) => void;
    fetchMock.mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          releaseLogout = resolve;
        }),
    );
    const pendingLogout = store.getState().logout();
    // The remount hydrate lands its pre-logout reads (200s — the
    // session still stands server-side inside the window).
    fetchMock.mockResolvedValueOnce(dashboardEnvelopeWithRow());
    fetchMock.mockResolvedValueOnce(settingsEnvelope());
    await store.getState().hydrate();
    expect(store.getState().user).not.toBeNull();
    // The logout POST succeeds server-side.
    releaseLogout(okEnvelope());
    const loggedOut = await pendingLogout;
    // THE F-249d DEFECT: pre-cure the hydrate's entry bump staled the
    // token guard and the SERVER-SUCCESSFUL logout returned false
    // with no clear (the signOut helper then skipped the login
    // navigation). The cure: the exactly-own-bump era form.
    expect(loggedOut).toBe(true);
    const s = store.getState();
    expect(s.user).toBeNull();
    expect(s.hydrated).toBe(false);
    expect(s.loading).toBe(true);
  });
});

// Session-250 (R-47, F-250a/F-250b): the settings round's three legs.
//
// (a) THE SUPERSEDED-ERROR LEG (F-250a): hydrate's failure path carried
//     a pre-R-46 leftover duplicate error commit OUTSIDE the F-249c
//     superseded dimension — a slow-failing dashboard GET landing after
//     a fresher refresh committed its stale error over a fully loaded
//     workspace (the could-not-load banner over live data).
// (b) THE SETTINGS STALE-OVERWRITE LEG (F-250b, window A): the hydrate
//     tail's settings GET guarded its commit on the write token alone
//     (a GET never bumps it), so a pre-PUT read landing after the PUT's
//     commit silently reverted the saved preferences under their
//     success toast (the Settings page's render-time form sync follows
//     the revert).
// (c) THE SETTINGS DROPPED-WRITE LEG (F-250b, window B): a remount
//     hydrate's entry token bump staled updateSettings' captured token
//     mid-PUT — the fresh commit was skipped while the page toasted
//     success; convergence then depended on the tail's own read.
//
// The cure: a module-level settings sequence (the F-249c machinery on
// the settings slice) — the tail's GET mints it at issue and guards its
// settle and commit on era + sequence; the PUT bumps it at entry
// (staling every in-flight older read) and re-keys its own commit from
// the token to the era.

function settingsEnvelopeFor(currency: string): Response {
  return jsonRes({ ok: true, data: { currency } });
}

function error500(): Response {
  return jsonRes(
    { ok: false, error: { code: "INTERNAL", message: "boom" } },
    500,
  );
}

describe("F-250a — the superseded failure landing cannot commit a stale error", () => {
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

  it("a failed hydrate GET landing after a fresher refresh keeps the loaded face", async () => {
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [{ id: "t1" }] as never,
      settings: { currency: "USD" } as never,
      settingsSettled: true,
    });
    // The remount hydrate's dashboard GET is held and will FAIL (a
    // transient 500, a network drop).
    let releaseHydrate!: (r: Response) => void;
    fetchMock.mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          releaseHydrate = resolve;
        }),
    );
    const pendingHydrate = store.getState().hydrate();
    // The mutation completes: POST 200, then the refreshAll GET reads
    // post-write (the row gone) and commits the fresh state.
    fetchMock.mockResolvedValueOnce(okEnvelope());
    fetchMock.mockResolvedValueOnce(dashboardEnvelopeWithoutRow());
    const res = await store.getState().deleteTransaction("t1");
    expect(res.ok).toBe(true);
    expect(store.getState().transactions).toEqual([]);
    expect(store.getState().error).toBeNull();
    // The failed hydrate GET lands LAST — superseded on the sequence
    // dimension (the mutation's refresh was issued after it).
    releaseHydrate(error500());
    await pendingHydrate;
    const s = store.getState();
    // THE F-250a DEFECT: pre-cure the trailing else arm committed the
    // stale error over the fresh state — the guarded failure arm above
    // it had correctly skipped. The cure: the else arm is retired.
    expect(s.error).toBeNull();
    expect(s.transactions).toEqual([]);
    expect(s.loading).toBe(false);
  });
});

describe("F-250b — the settings sequence (the F-249h windows)", () => {
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

  it("window A: a tail GET issued before the PUT cannot overwrite the PUT's commit", async () => {
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [] as never,
      settings: { currency: "USD" } as never,
      settingsSettled: true,
    });
    // The hydrate's dashboard GET lands ok; its settings tail is HELD
    // (issued BEFORE the PUT — its server read predates the write).
    fetchMock.mockResolvedValueOnce(dashboardEnvelopeWithRow());
    let releaseTail!: (r: Response) => void;
    let tailIssued!: () => void;
    const tailIssuedPromise = new Promise<void>((resolve) => {
      tailIssued = resolve;
    });
    fetchMock.mockImplementationOnce(() => {
      tailIssued();
      return new Promise<Response>((resolve) => {
        releaseTail = resolve;
      });
    });
    const pendingHydrate = store.getState().hydrate();
    await tailIssuedPromise;
    // The PUT lands and commits the fresh settings (the page toasts
    // its success).
    fetchMock.mockResolvedValueOnce(settingsEnvelopeFor("EUR"));
    const res = await store.getState().updateSettings({
      currency: "EUR",
    } as never);
    expect(res.ok).toBe(true);
    // The stale tail GET lands LAST with the pre-PUT read.
    releaseTail(settingsEnvelopeFor("USD"));
    await pendingHydrate;
    // THE F-250b WINDOW-A DEFECT: pre-cure the tail's token guard was
    // live (a GET never bumps it) and the stale read reverted the
    // store under the success toast. The cure: the PUT's sequence bump
    // stales the older issued read.
    expect(store.getState().settings).toEqual({ currency: "EUR" });
  });

  it("window B: a remount hydrate's entry bump cannot drop the PUT's commit", async () => {
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [] as never,
      settings: { currency: "USD" } as never,
      settingsSettled: true,
    });
    // The PUT is held mid-commit.
    let releasePut!: (r: Response) => void;
    fetchMock.mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          releasePut = resolve;
        }),
    );
    const pendingPut = store.getState().updateSettings({
      currency: "EUR",
    } as never);
    // The remount hydrate enters INSIDE the PUT window: its dashboard
    // GET and settings tail land (the tail reads PRE-PUT — the
    // server-side out-of-order case).
    fetchMock.mockResolvedValueOnce(dashboardEnvelopeWithRow());
    fetchMock.mockResolvedValueOnce(settingsEnvelopeFor("USD"));
    await store.getState().hydrate();
    expect(store.getState().settings).toEqual({ currency: "USD" });
    // The PUT completes server-side (its response carries the fresh
    // row).
    releasePut(settingsEnvelopeFor("EUR"));
    await pendingPut;
    // THE F-250b WINDOW-B DEFECT: pre-cure the hydrate's entry token
    // bump staled the PUT's captured token and its commit was skipped
    // — the store kept the pre-PUT settings under the success toast.
    // The cure: the era key (a hydrate never advances it — the
    // F-249c reasoning applied to the settings write).
    expect(store.getState().settings).toEqual({ currency: "EUR" });
  });
});

// Session-251 (R-48, F-251c): the settingsSettled strand — the R-47
// sequence's one uncovered arm. The settle guard skips BOTH the settings
// commit and the settingsSettled flip when the tail is superseded, so a
// remount hydrate in flight (entry flipped the flag false) whose tail is
// then superseded by a PUT left the flag false over a fresh, committed
// slice until the next full hydrate — the F-234a both-arms contract
// silently violated. The rider: the PUT's own commit settles the cycle.
describe("F-251c — a superseded tail cannot strand settingsSettled over fresh data", () => {
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

  it("the settled flag rides the PUT's commit when the tail is superseded", async () => {
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [] as never,
      settings: { currency: "USD" } as never,
      settingsSettled: true,
    });
    // The remount hydrate's dashboard GET lands ok; its settings tail
    // is HELD (its read predates the PUT — the superseded case).
    fetchMock.mockResolvedValueOnce(dashboardEnvelopeWithRow());
    let releaseTail!: (r: Response) => void;
    let tailIssued!: () => void;
    const tailIssuedPromise = new Promise<void>((resolve) => {
      tailIssued = resolve;
    });
    fetchMock.mockImplementationOnce(() => {
      tailIssued();
      return new Promise<Response>((resolve) => {
        releaseTail = resolve;
      });
    });
    const pendingHydrate = store.getState().hydrate();
    await tailIssuedPromise;
    // The hydrate's entry flipped settingsSettled false (the in-flight
    // window); the PUT lands and commits the fresh slice.
    fetchMock.mockResolvedValueOnce(settingsEnvelopeFor("EUR"));
    const res = await store.getState().updateSettings({
      currency: "EUR",
    } as never);
    expect(res.ok).toBe(true);
    // The superseded tail lands LAST with the pre-PUT read — the
    // sequence guard skips its settle AND its commit.
    releaseTail(settingsEnvelopeFor("USD"));
    await pendingHydrate;
    // THE F-251c DEFECT: pre-cure the flag stayed false over the fresh
    // EUR slice (nothing re-flipped it until the next full hydrate).
    // The rider: the PUT's commit settles the cycle itself.
    expect(store.getState().settings).toEqual({ currency: "EUR" });
    expect(store.getState().settingsSettled).toBe(true);
  });
});
