import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-214 (R-10, the owner-scoping round — the plan v2.11.0 contract
// pin): the PAD's ER and §4.2 claim "all owner-scoped" — but until this
// round Budget and Setting carried no ownerId, /api/reset wiped the WHOLE
// install, and GET /api/users enumerated every account (the CRM-era
// "owners list" residue). These pins freeze the owner-scoped shape so a
// regression — an unscoped deleteMany, a global budget read, the user
// list resurrected — fails loudly instead of drifting silently:
//
//   1. schema.prisma: Budget and Setting carry ownerId + the owner
//      relation (Budget keyed @@unique([ownerId, category, period]));
//   2. /api/reset: every deleteMany scopes through the session owner;
//   3. the budgets family: GET/POST/DELETE scope reads, the upsert key,
//      and the delete filter through the owner;
//   4. the budget READS (dashboard, ai/coach, export) scope findMany;
//   5. the settings family: GET/PUT resolve the row BY OWNER (the
//      singleton-by-id form is gone);
//   6. /api/users GET answers the SESSION USER only (no findMany of the
//      user table anywhere in the route).

const ROOT = path.resolve(import.meta.dirname, "..");
const read = (rel: string): string => readFileSync(path.join(ROOT, rel), "utf-8");
const norm = (s: string): string => s.replace(/\s+/g, " ");
const API = path.join(ROOT, "src/app/api");

function routeSrcs(dir: string): Array<[string, string]> {
  const base = path.join(API, dir);
  const out: Array<[string, string]> = [];
  for (const entry of readdirSync(base, { recursive: true })) {
    const p = path.join(base, entry as string);
    if (p.endsWith("route.ts") && existsSync(p)) {
      out.push([`src/app/api/${dir}/${entry}`, readFileSync(p, "utf-8")]);
    }
  }
  return out;
}

describe("R-10: the schema carries the owner relation on Budget + Setting", () => {
  const schema = norm(read("prisma/schema.prisma"));

  it("Budget has ownerId + the owner relation + the owner-keyed unique", () => {
    const budget = norm(schema.slice(
      schema.indexOf("model Budget {"),
      schema.indexOf("model Setting {"),
    ));
    expect(budget).toContain("ownerId String");
    expect(budget).toMatch(/owner User @relation/);
    expect(budget).toContain("@@unique([ownerId, category, period])");
  });

  it("Setting has ownerId + the owner relation (per-user settings rows)", () => {
    const setting = schema.slice(schema.indexOf("model Setting {"));
    expect(setting).toContain("ownerId");
    expect(setting).toMatch(/owner\s+User\s+@relation/);
    expect(setting).toContain("@unique");
  });

  it("the seed writes owner-bound budgets and the owner-bound setting row", () => {
    const seed = norm(read("prisma/seed.ts"));
    expect(seed).toMatch(/budget\.create[\s\S]*ownerId:\s*demo\.id/);
    expect(seed).toMatch(/setting\.create[\s\S]*ownerId:\s*demo\.id/);
  });
});

describe("R-10: /api/reset scopes every delete to the session owner", () => {
  const src = read("src/app/api/reset/route.ts");

  it("every deleteMany carries the owner filter", () => {
    const deletes = src.match(/db\.\w+\.deleteMany\(\{[^}]*\}/g) ?? [];
    expect(deletes.length).toBeGreaterThanOrEqual(6);
    for (const d of deletes) {
      expect(norm(d)).toContain("ownerId");
    }
  });

  it("no unscoped deleteMany exists anywhere in the reset route", () => {
    expect(src).not.toMatch(/deleteMany\(\s*\)/);
  });

  // Session-215 (R-12, F-215c — the pin-strength cure): the substring
  // form above passes even if a future edit scopes a delete to a
  // body-supplied id or a wrong guard field. The EXACT form pins the
  // semantic: the session owner's id, spelled out.
  it("every deleteMany scopes through the SESSION owner exactly (F-215c)", () => {
    const deletes = src.match(/db\.\w+\.deleteMany\(\{[^}]*\}/g) ?? [];
    expect(deletes.length).toBeGreaterThanOrEqual(6);
    for (const d of deletes) {
      expect(norm(d)).toMatch(/where:\s*\{\s*ownerId:\s*guard\.user\.id\s*\}/);
    }
  });
});

describe("R-10: the budgets family is owner-scoped", () => {
  const src = read("src/app/api/budgets/route.ts");

  it("GET scopes findMany by the session owner", () => {
    expect(norm(src)).toMatch(
      /budget\.findMany\(\{\s*where:\s*\{ ownerId: guard\.user\.id \}/,
    );
  });

  it("POST upserts through the owner-keyed composite", () => {
    expect(src).toContain("ownerId_category_period");
    expect(src).toContain("ownerId: guard.user.id");
  });

  it("DELETE scopes the deleteMany by owner", () => {
    const deletes = src.match(/deleteMany\(\{[^}]*\}/g) ?? [];
    for (const d of deletes) {
      expect(norm(d)).toContain("ownerId");
    }
  });
});

describe("R-10: the budget reads (dashboard · ai/coach · export) are owner-scoped", () => {
  for (const [rel, src] of [
    ...routeSrcs("dashboard"),
    ...routeSrcs("ai"),
    ...routeSrcs("export"),
  ] as Array<[string, string]>) {
    it(`${rel}: every budget findMany scopes by owner`, () => {
      const reads = src.match(/budget\.findMany\([^)]*\)/g) ?? [];
      expect(reads.length).toBeGreaterThan(0);
      for (const r of reads) {
        expect(norm(r)).toContain("ownerId");
      }
    });
  }
});

describe("R-10: the settings family resolves the row BY OWNER", () => {
  const src = norm(read("src/app/api/settings/route.ts"));

  it("no singleton-by-id lookup remains", () => {
    expect(src).not.toContain('where: { id: "singleton" }');
    expect(src).not.toContain('data: { id: "singleton" }');
  });

  it("the read/upsert keys on the owner", () => {
    expect(src).toContain("ownerId");
  });

  // Session-215 (R-12, F-215i — the lazy-create race cure): two
  // concurrent first-touch GETs both find null and both create; the
  // loser dies on the Setting.ownerId unique constraint. The cure's
  // source shape: the unique-constraint catch + the re-read.
  it("readSettings survives the concurrent first-touch race (F-215i)", () => {
    expect(src).toMatch(/P2002|unique constraint/i);
    expect(src).toMatch(/findUniqueOrThrow/);
  });
});

describe("R-10: /api/users answers the session user only", () => {
  const src = norm(read("src/app/api/users/route.ts"));

  it("GET no longer enumerates the user table", () => {
    expect(src).not.toMatch(/user\.findMany/);
    expect(src).toContain("guard.user");
  });
});

// Session-217 (R-14, F-217i — the search tails): R-13 retired
// store.search but left the `SearchResults` interface exported with
// zero importers (dead code that will drift) and /api/search with no
// coverage of any kind. The route STAYS (a real, owner-scoped API
// surface the README documents); the dead interface retires and the
// route joins the exact-form pin family.

describe("R-14: /api/search scopes through the owner (F-217i)", () => {
  const src = norm(read("src/app/api/search/route.ts"));

  it("every family query keys on ownerId", () => {
    expect(src).toContain("ownerId: guard.user.id");
    const ownerIdCount = (src.match(/ownerId: guard\.user\.id/g) ?? []).length;
    // transactions + accounts + investments + goals — four families.
    expect(ownerIdCount).toBe(4);
  });

  it("the route is session-gated", () => {
    expect(src).toContain("requireSession()");
  });
});

describe("R-14: the dead SearchResults interface is retired (F-217i)", () => {
  it("types/index.ts no longer exports SearchResults", () => {
    // Comment-stripped (the needle-in-own-docs rule): the retirement
    // comment names the interface it retired.
    const src = read("src/types/index.ts").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
    expect(src).not.toContain("SearchResults");
  });
});
