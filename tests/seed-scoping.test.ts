import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-215 (R-12, F-215e — the seed-scoping pin): the seed's main()
// opened with SEVEN unscoped deleteMany() calls — an install-wide wipe
// on every `bun run db:seed`. R-10's own premise (open signup, multiple
// accounts) makes that the seed-side edition of F-214a. The cure: the
// demo user upserts FIRST (its id resolvable), then every delete scopes
// through the demo owner — a demo-corpus refresh that never touches
// another account's rows.

const ROOT = path.resolve(import.meta.dirname, "..");
const SEED = readFileSync(path.join(ROOT, "prisma/seed.ts"), "utf-8");
const norm = (s: string): string => s.replace(/\s+/g, " ");

describe("R-12: the seed scopes every wipe to the demo owner", () => {
  it("every deleteMany carries the owner filter", () => {
    const deletes = SEED.match(/deleteMany\(\{[^)]*\}\)/g) ?? [];
    // The seven domain wipes (F-215e's evidence): transaction, income,
    // bank, investment, goal, budget, setting.
    expect(deletes.length).toBeGreaterThanOrEqual(7);
    for (const d of deletes) {
      expect(norm(d)).toContain("ownerId: demo.id");
    }
  });

  it("no unscoped deleteMany exists anywhere in the seed", () => {
    expect(SEED).not.toMatch(/deleteMany\(\s*\)/);
  });

  it("the demo upsert PRECEDES the scoped deletes (the id must resolve first)", () => {
    const upsertAt = SEED.indexOf("user.upsert");
    const firstDeleteAt = SEED.indexOf("deleteMany");
    expect(upsertAt).toBeGreaterThan(-1);
    expect(firstDeleteAt).toBeGreaterThan(-1);
    expect(upsertAt).toBeLessThan(firstDeleteAt);
  });
});
