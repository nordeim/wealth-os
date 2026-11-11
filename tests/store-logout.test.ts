import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Session-224 (R-21, F-224e): the logout honesty pair's behavioral
// pin. Pre-cure the store's logout() discarded the call() result and
// cleared the slices unconditionally — a failed POST (500 from the
// tokenVersion write, 429 off the shared writes bucket, a network
// drop) was silently treated as success: the store cleared, the
// helper navigated to /login, and the httpOnly cookie (which the
// client CANNOT clear) kept the session alive server-side — the next
// app-route load silently re-established it. The cure: check the
// result, surface the failure through the store-error banner (the
// role="alert" seam), return false, and let the signOut helpers keep
// the user where they are — honest state, visible error, retryable.
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

describe("F-224e — the store's logout surfaces failure (the honest sign-out)", () => {
  let store: StoreModule["useWealthOs"];
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.resetModules();
    fetchMock = vi.fn();
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    const mod = (await import("../src/stores/wealthos-store")) as StoreModule;
    store = mod.useWealthOs;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function seedSignedIn() {
    store.setState({
      user,
      hydrated: true,
      loading: false,
      error: null,
      transactions: [{ id: "t1" }] as never,
    });
  }

  it("a FAILED logout POST keeps the session (state intact, error surfaced, false returned)", async () => {
    seedSignedIn();
    fetchMock.mockResolvedValueOnce(
      jsonRes({ ok: false, error: { code: "INTERNAL", message: "Something went wrong" } }, 500),
    );

    const result = await store.getState().logout();

    expect(result).toBe(false);
    const s = store.getState();
    expect(s.user).not.toBeNull(); // the session stays honest
    expect(s.hydrated).toBe(true);
    expect(s.transactions).toHaveLength(1);
    expect(s.error).toBe("Something went wrong"); // the banner seam
  });

  it("a 429 (the shared writes bucket) also keeps the session", async () => {
    seedSignedIn();
    fetchMock.mockResolvedValueOnce(
      jsonRes(
        { ok: false, error: { code: "RATE_LIMITED", message: "Too many requests. Please try again later." } },
        429,
      ),
    );

    const result = await store.getState().logout();

    expect(result).toBe(false);
    expect(store.getState().user).not.toBeNull();
    expect(store.getState().error).toMatch(/Too many requests/);
  });

  it("a SUCCESSFUL logout clears the store and returns true", async () => {
    seedSignedIn();
    fetchMock.mockResolvedValueOnce(jsonRes({ ok: true, data: { ok: true } }));

    const result = await store.getState().logout();

    expect(result).toBe(true);
    const s = store.getState();
    expect(s.user).toBeNull();
    expect(s.hydrated).toBe(false);
    expect(s.loading).toBe(true); // the shell's loading gate re-arms
    expect(s.transactions).toHaveLength(0);
    expect(s.error).toBeNull();
  });
});
