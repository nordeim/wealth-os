import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-238 (R-35): the source-tier pins for the history-width,
// third-window, and slice-hygiene round. Every pin was born RED over
// the pre-cure tree (the F-238 ledger rows in docs/remediation_plan_v2.md
// carry the verified evidence). Source-scanning contracts per the house
// convention: read the file, assert the contract.

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// ---- F-238a: the history-width restoration -----------------------------------

describe("F-238a — the Expenses history panels live OUTSIDE the header flex row", () => {
  it("the pre-cure nesting is gone (no Tabs closing inside the header row)", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    // The pre-cure shape: <Tabs …>…</Tabs> closed INSIDE the mb-4
    // header div (the </div> between </Tabs> and </section>) — at every
    // viewport ≥ sm the entire history list collapsed to a ~427px
    // right-side column (live-measured: ul x=957 w=427 inside the
    // 1120px card at 1440). The history section is the page's only
    // Tabs, so the </section> anchor scopes the shape.
    expect(src).not.toMatch(/<Tabs[\s\S]*?<\/Tabs>\s*<\/div>\s*<\/section>/);
  });

  it("the cured shape: the header row closes BEFORE the Tabs opens (siblings)", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    // The reference's own form (live-probed): the title's header block,
    // then the tablist + content full-width below — never the list
    // inside the header's flex row.
    expect(src).toMatch(/<\/h2>\s*<\/div>\s*<Tabs/);
    // And the Tabs closes directly against the section.
    expect(src).toMatch(/<\/Tabs>\s*<\/section>/);
  });
});

// ---- F-238b: the third revocation window --------------------------------------

describe("F-238b — a mutation 401 commits the wall (the third window)", () => {
  it("the shared mutation wrapper checks the failure arm's code", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("async function mutate<");
    expect(start).toBeGreaterThan(-1);
    const end = src.indexOf("function createStore");
    expect(end).toBeGreaterThan(start);
    const body = src.slice(start, end);
    expect(body).toMatch(/const token = sessionWriteToken;/);
    expect(body).toMatch(/await refreshAll\(token, set\)/);
    expect(body).toMatch(/res\.code === "UNAUTHORIZED" && token === sessionWriteToken/);
    expect(body).toMatch(/commitRevocationWall\(set\)/);
  });

  it("the wrapper captures the F-217l entry token BEFORE its fetch", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("async function mutate<");
    const end = src.indexOf("function createStore");
    const body = src.slice(start, end);
    const tokenAt = body.indexOf("const token = sessionWriteToken;");
    const fetchAt = body.indexOf("await call<");
    expect(tokenAt).toBeGreaterThan(-1);
    expect(fetchAt).toBeGreaterThan(tokenAt);
  });

  it("every refreshAll-family action rides the wrapper (18 call sites)", () => {
    const src = read("src/stores/wealthos-store.ts");
    const wrapperCalls = src.match(/mutate<[^>]+>\(/g) ?? [];
    // 18 action call sites + the wrapper's own definition line.
    expect(wrapperCalls.length).toBe(19);
    // And no action keeps the bare pre-cure shape.
    expect(src).not.toMatch(/if \(res\.ok\) await refreshAll\(token, set\);/);
  });

  it("updateSettings and askCoach carry the inline 401 arm (the non-refreshing pair)", () => {
    const src = read("src/stores/wealthos-store.ts");
    const settings = src.match(/updateSettings: async \(body\) => \{[\s\S]*?\n    \},/);
    expect(settings?.[0] ?? "").toMatch(/res\.code === "UNAUTHORIZED" && token === sessionWriteToken/);
    expect(settings?.[0] ?? "").toMatch(/commitRevocationWall\(set\)/);
    const coach = src.match(/askCoach: async \(question\) => \{[\s\S]*?\n    \},/);
    expect(coach?.[0] ?? "").toMatch(/res\.code === "UNAUTHORIZED" && token === sessionWriteToken/);
    expect(coach?.[0] ?? "").toMatch(/commitRevocationWall\(set\)/);
  });
});

// ---- F-238c: the slice hygiene -------------------------------------------------

describe("F-238c — the UNAUTHORIZED branches clear the domain slices", () => {
  it("the shared wall commit empties every slice (the logout-clear parity)", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("function commitRevocationWall(");
    const end = src.indexOf("async function refreshAll");
    expect(start).toBeGreaterThan(-1);
    expect(end).toBeGreaterThan(start);
    const body = src.slice(start, end);
    expect(body).toMatch(/loading: false,/);
    expect(body).toMatch(/user: null,/);
    expect(body).toMatch(/error: null,/);
    expect(body).toMatch(/transactions: \[\],/);
    expect(body).toMatch(/incomeSources: \[\],/);
    expect(body).toMatch(/accounts: \[\],/);
    expect(body).toMatch(/investments: \[\],/);
    expect(body).toMatch(/goals: \[\],/);
    expect(body).toMatch(/budgets: \[\],/);
    expect(body).toMatch(/settings: null,/);
    expect(body).toMatch(/settingsSettled: false,/);
  });

  it("both UNAUTHORIZED branches ride the shared commit (hydrate keeps its hydrated:true)", () => {
    const src = read("src/stores/wealthos-store.ts");
    const refreshAll = src.slice(
      src.indexOf("async function refreshAll"),
      src.indexOf("async function mutate<"),
    );
    expect(refreshAll).toMatch(/res\.code === "UNAUTHORIZED"/);
    expect(refreshAll).toMatch(/commitRevocationWall\(set\);/);
    const hydrate = src.slice(
      src.indexOf("hydrate: async () =>"),
      src.indexOf("logout: async"),
    );
    expect(hydrate).toMatch(/res\.code === "UNAUTHORIZED"/);
    expect(hydrate).toMatch(/commitRevocationWall\(set, \{ hydrated: true \}\);/);
  });
});

// ---- F-238d: the async uploads walk ---------------------------------------------

describe("F-238d — the uploads request path stops blocking the event loop", () => {
  it("the capacity walk rides fs/promises (no per-entry sync stats)", () => {
    const src = read("src/lib/uploads.ts");
    expect(src).toMatch(/async function uploadsCapacity/);
    expect(src).not.toMatch(/readdirSync/);
    expect(src).not.toMatch(/statSync/);
    expect(src).toMatch(/import \{ readdir, stat \} from "node:fs\/promises";/);
  });

  it("the uploadsDir mkdir memoizes behind the ensured flag (one call site)", () => {
    const src = read("src/lib/uploads.ts");
    expect(src).toMatch(/uploadsDirEnsured/);
    const mkdirs = src.match(/mkdirSync\(/g) ?? [];
    expect(mkdirs.length).toBe(1);
  });

  it("both POST call sites await the async walk", () => {
    const upload = read("src/app/api/upload/route.ts");
    const awaited = upload.match(/await uploadsCapacity\(/g) ?? [];
    expect(awaited.length).toBe(2);
  });
});

// ---- F-238e: the dompurify retirement --------------------------------------------

describe("F-238e — the manifest carries no dead security overrides", () => {
  it("package.json carries no overrides block for a package absent from the graph", () => {
    const src = read("package.json");
    expect(src).not.toMatch(/dompurify/);
    const lock = read("bun.lock");
    expect(lock).not.toMatch(/dompurify/);
  });
});

// ---- F-238f: the popover scroll-close ----------------------------------------------

describe("F-238f — the Expenses filters popover closes on scroller movement", () => {
  it("the outside-close effect carries the scroll listener pair", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    // The genus: a non-portal popover anchored to the trigger slides
    // under the sticky z-50 header when the main scroller moves while
    // open — closing on scroll is the one-line cure (the z-map stays).
    expect(src).toMatch(/const onScroll = \(\) => setFiltersOpen\(false\);/);
    expect(src).toMatch(/addEventListener\("scroll", onScroll/);
    expect(src).toMatch(/removeEventListener\("scroll", onScroll/);
  });
});

// ---- F-238k: the transient-arm unification -----------------------------------------

describe("F-238k — the five inline transient arms join the seam", () => {
  const HAND_ROLLED_FAMILY = [
    "src/app/api/auth/forgot-password/route.ts",
    "src/app/api/auth/reset-password/route.ts",
    "src/app/api/reset/route.ts",
  ];

  it.each(HAND_ROLLED_FAMILY)("%s carries the seam arm, not the inline form", (rel) => {
    const src = read(rel);
    expect(src.length).toBeGreaterThan(0);
    expect(src).toMatch(/import \{[^}]*isTransientDbError[^}]*\} from "@\/lib\/db";/);
    expect(src).toMatch(/if \(isTransientDbError\(error\)\) return ERR\.UNAVAILABLE\(\);/);
    // The hand-rolled P2024/P2028 inline form retires (the seam owns
    // the codes now).
    expect(src).not.toMatch(/error\.code === "P2024"/);
  });

  it("the reset routes keep the no-enumeration swallow arms (the P2025 family)", () => {
    // The unification must not touch the adjacent DELIBERATE arms:
    // forgot/reset swallow P2025 to the no-enumeration 200 (F-220k).
    const forgot = read("src/app/api/auth/forgot-password/route.ts");
    expect(forgot).toMatch(/P2025/);
    const reset = read("src/app/api/auth/reset-password/route.ts");
    expect(reset).toMatch(/P2025/);
  });
});

// ---- F-238m: the explicit-any net ----------------------------------------------------

describe("F-238m — the explicit-any rule is a live net (the F-214k precedent)", () => {
  it("eslint.config.mjs carries the rule as warn (a hard gate under --max-warnings 0)", () => {
    const src = read("eslint.config.mjs");
    expect(src).toMatch(/"@typescript-eslint\/no-explicit-any": "warn"/);
    expect(src).not.toMatch(/"@typescript-eslint\/no-explicit-any": "off"/);
  });
});

// ---- F-238n: the dead boot-loop arm ---------------------------------------------------

describe("F-238n — the boot-env NEO_ loop carries no dead disjunct", () => {
  it("the guard reads the prefix alone (NODE_ENV never starts with NEO_)", () => {
    const src = read("src/lib/boot-env.ts");
    expect(src).not.toMatch(/\|\| key === "NODE_ENV"/);
    expect(src).toMatch(/if \(!key\.startsWith\("NEO_"\)\) continue;/);
  });
});
