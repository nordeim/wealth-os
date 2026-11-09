import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { parseBody, readBoundedJson, MAX_AUTH_BODY_BYTES } from "@/lib/api";

// Session-216 (R-13, F-216a — the import body-cap pin): the Import
// commit contracts 5000 rows (csvImportSchema) and the page posts ALL
// of them in ONE request — but parseBody rode the GLOBAL 16KB
// readBoundedJson ceiling (the auth-family cap), so a real import of
// ≳140 minimal rows (~60–100 realistic rows) died with "Request body
// too large" against the UI's own promise. No e2e ever posted a >16KB
// import, so the conflict was invisible to the gate. These pins freeze
// the cure: the seam is PARAMETERIZED (the 16KB default unchanged for
// every existing consumer) and the import route passes an
// import-specific cap sized to its own schema's worst case.

const ROOT = path.resolve(import.meta.dirname, "..");
const API = readFileSync(path.join(ROOT, "src/lib/api.ts"), "utf-8");
const IMPORT_ROUTE = readFileSync(
  path.join(ROOT, "src/app/api/import/route.ts"),
  "utf-8",
);

const JSON_HEADERS = { "content-type": "application/json" };

/** A body of `rows` rows, comfortably past the 16KB default ceiling. */
function largeImportBody(rows: number): string {
  const payload = {
    rows: Array.from({ length: rows }, (_, i) => ({
      description: `Imported transaction ${i} — grocery run at the market`,
      amount: 24.5,
      type: "expense",
      category: "Groceries",
      budgetCategory: "needs",
      date: "2026-01-15",
    })),
  };
  return JSON.stringify(payload);
}

describe("R-13: the bounded reader parameterizes its ceiling (F-216a)", () => {
  it("readBoundedJson accepts an explicit maxBytes above the default", async () => {
    const body = largeImportBody(200); // ~28KB > 16KB default
    expect(body.length).toBeGreaterThan(MAX_AUTH_BODY_BYTES);
    const req = new Request("http://x/api/import", {
      method: "POST",
      headers: JSON_HEADERS,
      body,
    });
    const read = await readBoundedJson(req, 4 * 1024 * 1024);
    expect(read.tooLarge).toBe(false);
  });

  it("readBoundedJson still rejects the same body at the default ceiling", async () => {
    const req = new Request("http://x/api/import", {
      method: "POST",
      headers: JSON_HEADERS,
      body: largeImportBody(200),
    });
    const read = await readBoundedJson(req);
    expect(read.tooLarge).toBe(true);
  });

  it("parseBody threads the ceiling through to the schema parse", async () => {
    const schema = z.object({ rows: z.array(z.unknown()) });
    const req = new Request("http://x/api/import", {
      method: "POST",
      headers: JSON_HEADERS,
      body: largeImportBody(200),
    });
    const parsed = await parseBody(req, schema, 4 * 1024 * 1024);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) expect(parsed.data.rows).toHaveLength(200);
  });
});

describe("R-13: the import route rides its own cap (the contract, the seam, the surface)", () => {
  it("api.ts declares the import-specific ceiling", () => {
    expect(API).toMatch(
      /export const MAX_IMPORT_BODY_BYTES = 4 \* 1024 \* 1024/,
    );
  });

  it("the import route passes MAX_IMPORT_BODY_BYTES to parseBody", () => {
    // The exact convergence form — the route must not ride the default.
    expect(IMPORT_ROUTE).toMatch(
      /parseBody\(req, csvImportSchema, MAX_IMPORT_BODY_BYTES\)/,
    );
  });

  it("the import ceiling is documented against the 5000-row worst case", () => {
    expect(API).toContain("5000 rows");
  });
});
