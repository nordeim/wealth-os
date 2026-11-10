import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { parseBody, readBoundedJson, MAX_AUTH_BODY_BYTES , MAX_AI_BODY_BYTES } from "@/lib/api";
import { aiCoachSchema } from "@/lib/schemas";

// Session-217 (R-14, F-217b — the AI coach body-cap pin): the coach
// schema contracts `history: 30 × content-max-4000` ("rides the request
// for a future LLM provider", the route's own docblock) — a worst-case
// LEGAL payload (quote-heavy content JSON-escapes to ~2 bytes/char)
// measures ≈242KB, but the route called parseBody on the GLOBAL 16KB
// auth-family ceiling: the exact F-216a conflict class, one route left
// behind by the R-13 parameterization. These pins freeze the cure: the
// route rides its own cap sized to the schema's worst case (the
// import-body-cap pattern).

const ROOT = path.resolve(import.meta.dirname, "..");
const API = readFileSync(path.join(ROOT, "src/lib/api.ts"), "utf-8");
const COACH_ROUTE = readFileSync(
  path.join(ROOT, "src/app/api/ai/coach/route.ts"),
  "utf-8",
);

const JSON_HEADERS = { "content-type": "application/json" };

/** The schema's worst LEGAL payload: 30 history turns of 4000 quote
 *  characters each — every byte JSON-escapes, so the wire form is
 *  roughly double the raw char count. */
function worstCaseCoachBody(): string {
  return JSON.stringify({
    question: "How am I doing?",
    history: Array.from({ length: 30 }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: '"'.repeat(4000),
    })),
  });
}

describe("R-14: the coach route rides its own cap (F-217b)", () => {
  it("the schema's worst legal payload is past the default ceiling", async () => {
    const body = worstCaseCoachBody();
    expect(body.length).toBeGreaterThan(16 * 1024);
    expect(body.length).toBeLessThan(256 * 1024); // quote-escape worst case; the control-char form rides ~720KB (F-218s)
    // …and the schema itself accepts it (the contract is real).
    expect(aiCoachSchema.safeParse(JSON.parse(body)).success).toBe(true);
  });

  it("readBoundedJson rejects the worst-case payload at the default ceiling", async () => {
    const req = new Request("http://x/api/ai/coach", {
      method: "POST",
      headers: JSON_HEADERS,
      body: worstCaseCoachBody(),
    });
    const read = await readBoundedJson(req);
    expect(read.tooLarge).toBe(true);
  });

  it("parseBody accepts the worst-case payload at the coach-specific cap", async () => {
    const req = new Request("http://x/api/ai/coach", {
      method: "POST",
      headers: JSON_HEADERS,
      body: worstCaseCoachBody(),
    });
    const parsed = await parseBody(req, z.object({ question: z.string() }), MAX_AI_BODY_BYTES);
    expect(parsed.ok).toBe(true);
  });

  it("api.ts declares the coach-specific ceiling", () => {
    expect(API).toMatch(/export const MAX_AI_BODY_BYTES = 1024 \* 1024/);
  });

  it("the coach route passes MAX_AI_BODY_BYTES to parseBody", () => {
    // The exact convergence form — the route must not ride the default.
    expect(COACH_ROUTE).toMatch(
      /parseBody\(req, aiCoachSchema, MAX_AI_BODY_BYTES\)/,
    );
  });

  it("the coach ceiling is documented against the schema's worst case", () => {
    expect(API).toContain("30 × 4000");
  });
});
