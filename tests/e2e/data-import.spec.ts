import { expect, test } from "@playwright/test";
import { e2ePort } from "./e2e-port";

// Session-216 (R-13, F-216a — the BEHAVIORAL large-import leg): the
// Import commit contracts 5000 rows, but parseBody rode the global
// 16KB body ceiling — a real import of ≳140 minimal rows died with
// "Request body too large". No e2e had ever posted a >16KB import, so
// the conflict was invisible to the gate (the schema test bypasses
// the HTTP seam). This spec drives the REAL route with a 500-row
// payload (~74KB — past the old ceiling by 4.6x):
//
//   a dedicated scratch user signs up → imports 500 rows in ONE
//   request → the count lands (and the rows are readable back
//   through /api/transactions) → the user's reset cleans up (the
//   multi-user.spec pattern — the demo corpus is never touched).

const BASE = `http://localhost:${e2ePort()}`;

test("a 500-row (>16KB) import lands through the real route", async ({
  playwright,
}) => {
  // -- the scratch user comes to be (in-app OTP by default in e2e)
  const email = `e2e-import-${Date.now()}@example.com`;
  const anon = await playwright.request.newContext({ baseURL: BASE });
  const signup = await anon.post("/api/auth/signup", {
    data: { email, password: "TestPass123" },
  });
  expect(signup.ok()).toBeTruthy();
  const signupBody = (await signup.json()) as {
    ok: boolean;
    data: { verificationCode: string | null };
  };
  expect(signupBody.ok).toBe(true);
  expect(signupBody.data.verificationCode).toMatch(/^\d{6}$/);

  const verify = await anon.post("/api/auth/verify", {
    data: { email, code: signupBody.data.verificationCode },
  });
  expect(verify.ok()).toBeTruthy();
  const token = /neo_session=([^;]+)/.exec(verify.headers()["set-cookie"] ?? "")?.[1] ?? "";
  expect(token).not.toBe("");
  await anon.dispose();

  const user = await playwright.request.newContext({
    baseURL: BASE,
    extraHTTPHeaders: { cookie: `neo_session=${token}` },
  });

  try {
    // -- the payload: 500 rows, ~74KB of JSON — far past the 16KB
    //    ceiling that used to reject it, comfortably inside the
    //    import route's own cap.
    const rows = Array.from({ length: 500 }, (_, i) => ({
      description: `Bulk import row ${i} — grocery run at the corner market`,
      amount: 12.34,
      type: "expense",
      category: "Groceries",
      budgetCategory: "needs",
      date: "2026-01-15",
    }));
    const serialized = JSON.stringify({ rows });
    expect(serialized.length).toBeGreaterThan(16 * 1024);

    const imported = await user.post("/api/import", {
      data: { rows },
    });
    expect(imported.ok()).toBeTruthy();
    const importBody = (await imported.json()) as {
      ok: boolean;
      data: { imported: number };
    };
    expect(importBody.ok).toBe(true);
    expect(importBody.data.imported).toBe(500);

    // -- the rows read back through the transactions family
    const listed = await user.get("/api/transactions");
    expect(listed.ok()).toBeTruthy();
    const listBody = (await listed.json()) as {
      ok: boolean;
      data: unknown[];
    };
    expect(listBody.ok).toBe(true);
    expect(listBody.data).toHaveLength(500);

    // -- the scratch user's reset cleans up (the demo corpus untouched)
    const reset = await user.post("/api/reset", { data: { confirm: "RESET" } });
    expect(reset.ok()).toBeTruthy();
    const after = await user.get("/api/transactions");
    const afterBody = (await after.json()) as { ok: boolean; data: unknown[] };
    expect(afterBody.data).toHaveLength(0);
  } finally {
    await user.dispose();
  }
});
