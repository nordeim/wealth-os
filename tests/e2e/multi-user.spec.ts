import { expect, test } from "@playwright/test";
import { e2ePort } from "./e2e-port";

// Session-215 (R-12, F-215c — the BEHAVIORAL multi-user isolation
// ladder): R-10 scoped every finance surface through the session owner,
// but the whole suite verified it single-user — the owner-scoping pins
// are source-level (string shapes), so a semantic regression (a delete
// scoped to the wrong variable) would ship green. This spec drives the
// REAL two-user behavior end-to-end through the production server:
//
//   B signs up → B's rows are visible to B alone → B resets → B's rows
//   are gone → the DEMO user's rows SURVIVE B's reset (the F-214a
//   threat model, behaviorally pinned).
//
// B is additive (a fresh timestamped email per run) and B's signup and
// session ride a SEPARATE anonymous context — the shared `request`
// fixture's demo cookie jar stays untouched (a verify through it would
// overwrite the demo session with B's).

const BASE = `http://localhost:${e2ePort()}`;

test("a second user's data is invisible to the demo user and survives their reset — and vice versa", async ({
  request,
  playwright,
}) => {
  // -- B comes to be: signup (in-app OTP by default) → verify → session
  const bEmail = `e2e-multiuser-${Date.now()}@example.com`;
  const anon = await playwright.request.newContext({ baseURL: BASE });
  const bSignup = await anon.post("/api/auth/signup", {
    data: { email: bEmail, password: "TestPass123" },
  });
  expect(bSignup.ok()).toBeTruthy();
  const bSignupBody = (await bSignup.json()) as {
    ok: boolean;
    data: { verificationCode: string | null };
  };
  expect(bSignupBody.ok).toBe(true);
  // The e2e server pins NEO_DISABLE_IN_APP_OTP="" — the code rides the
  // response (the deterministic e2e delivery posture).
  expect(bSignupBody.data.verificationCode).toMatch(/^\d{6}$/);

  const bVerify = await anon.post("/api/auth/verify", {
    data: { email: bEmail, code: bSignupBody.data.verificationCode },
  });
  expect(bVerify.ok()).toBeTruthy();
  const bToken = /neo_session=([^;]+)/.exec(bVerify.headers()["set-cookie"] ?? "")?.[1] ?? "";
  expect(bToken).not.toBe("");
  await anon.dispose();

  const b = await playwright.request.newContext({
    baseURL: BASE,
    extraHTTPHeaders: { cookie: `neo_session=${bToken}` },
  });

  try {
    // -- B creates one transaction + one budget
    const bCreateTx = await b.post("/api/transactions", {
      data: {
        description: "B's private expense",
        amount: 42.5,
        type: "expense",
        category: "Coffee",
        budgetCategory: "wants",
        date: "2026-11-05",
      },
    });
    expect(bCreateTx.ok()).toBeTruthy();
    const bCreateBudget = await b.post("/api/budgets", {
      data: { category: "Coffee", amount: 50, period: "monthly" },
    });
    expect(bCreateBudget.ok()).toBeTruthy();

    // -- Isolation, direction 1: B sees ONLY B's rows (the demo user's
    //    seeded transactions + budgets are invisible to B)
    const bTx = (await (await b.get("/api/transactions")).json()) as {
      ok: boolean;
      data: Array<{ description: string }>;
    };
    expect(bTx.ok).toBe(true);
    expect(bTx.data).toHaveLength(1);
    expect(bTx.data[0].description).toBe("B's private expense");
    const bBudgets = (await (await b.get("/api/budgets")).json()) as {
      ok: boolean;
      data: unknown[];
    };
    expect(bBudgets.data).toHaveLength(1);

    // -- Isolation, direction 2: the DEMO session (the shared request
    //    fixture, its cookie jar untouched) sees ONLY the demo corpus
    const demoTx = (await (await request.get("/api/transactions")).json()) as {
      ok: boolean;
      data: Array<{ description: string }>;
    };
    expect(demoTx.ok).toBe(true);
    expect(demoTx.data.length).toBeGreaterThanOrEqual(50);
    expect(demoTx.data.some((t) => t.description === "B's private expense")).toBe(false);

    // -- Isolation, direction 3 (Session-221, R-18, F-221i): B's [id]
    //    MUTATIONS against a demo-owned row answer 404 with the demo
    //    row intact. The correct findFirst({ id, ownerId }) posture
    //    was pinned only by source-string containment before — the
    //    exact limitation F-215c recorded ("a future regression
    //    scoping to any other variable passes the pin"); these legs
    //    pin the BEHAVIOR.
    const demoTxId = demoTx.data[0] && (demoTx.data[0] as { id?: string }).id;
    expect(demoTxId).toBeTruthy();
    const bPutForeign = await b.put(`/api/transactions/${demoTxId}`, {
      data: { description: "hijacked", amount: 1, type: "expense", category: "X", budgetCategory: "needs", date: "2026-11-05" },
    });
    expect(bPutForeign.status()).toBe(404);
    const bDeleteForeign = await b.delete(`/api/transactions/${demoTxId}`);
    expect(bDeleteForeign.status()).toBe(404);
    // The demo row survived both attempts untouched.
    const demoTxGuard = (await (await request.get("/api/transactions")).json()) as {
      ok: boolean;
      data: Array<{ description: string }>;
    };
    expect(demoTxGuard.ok).toBe(true);
    expect(demoTxGuard.data.length).toBeGreaterThanOrEqual(50);
    expect(demoTxGuard.data.some((t) => t.description === "hijacked")).toBe(false);

    // -- B resets: B's rows vanish, the DEMO corpus SURVIVES (the
    //    F-214a/F-215c behavioral contract). The route's confirm gate
    //    rides the body ({ confirm: "RESET" } — the CSRF content-type
    //    seam requires the JSON form).
    const bReset = await b.post("/api/reset", {
      data: { confirm: "RESET" },
    });
    expect(bReset.ok()).toBeTruthy();
    const bTxAfter = (await (await b.get("/api/transactions")).json()) as {
      ok: boolean;
      data: unknown[];
    };
    expect(bTxAfter.data).toHaveLength(0);
    const bBudgetsAfter = (await (await b.get("/api/budgets")).json()) as {
      ok: boolean;
      data: unknown[];
    };
    expect(bBudgetsAfter.data).toHaveLength(0);

    const demoTxAfter = (await (await request.get("/api/transactions")).json()) as {
      ok: boolean;
      data: unknown[];
    };
    expect(demoTxAfter.ok).toBe(true);
    expect(demoTxAfter.data.length).toBeGreaterThanOrEqual(50);
  } finally {
    await b.dispose();
  }
});
