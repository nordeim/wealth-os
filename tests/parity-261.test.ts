import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-261 (R-58): the source-tier pins for the heading-prose,
// dead-brand, and citation-truing round. Every leg was born RED over
// the pre-cure tree (the F-261 ledger rows in
// docs/remediation_plan_v2.md §2.19 carry the verified evidence — the
// whole-tree sweeps bounded each genus: seven h2 prose carriers across
// three files, the 19-export census's only dead pair, the mis-cited
// figure at exactly two carriers, the vestigial-export genus's two
// survivors; the contrast figure recomputed by code twice).
//
// The round's genus: PROSE AND DECLARATION TRUTH, not behavior — the
// rendered construction (the five h1 auth titles, the class strings,
// the runtime seams) is unchanged by every cure; the pins therefore
// assert the prose describes the tree as it renders and that the
// dead declarations retire.

function read(rel: string): string {
  return readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf8");
}

// ---- F-261a: the auth-view heading prose genus ------------------------------

describe("F-261a — the auth-view heading prose genus (prose trued to the rendered h1)", () => {
  it("the login-reset vocabulary describes the rendered h1 (no h2 claims anywhere in the seam)", () => {
    const src = read("src/lib/login-reset.ts");
    expect(src).not.toMatch(/\bh2\b/);
  });

  it("the rendered construction the prose must describe: five h1 titles, zero h2, in the login card", () => {
    const card = read("src/components/layout/login-card.tsx");
    const h1s = card.match(/<h1/g) ?? [];
    expect(h1s).toHaveLength(5);
    expect(card).not.toMatch(/<h2/);
  });

  it("the login-reset test comment describes the DOM the card actually renders", () => {
    const src = read("tests/login-reset.test.ts");
    expect(src).not.toMatch(/DOM: <h2/);
    expect(src).not.toMatch(/<\/h2>/);
  });

  it("the login-views prose (comment and test title) names the rendered h1", () => {
    const src = read("tests/login-views.test.ts");
    expect(src).not.toMatch(/\bh2\b/);
  });
});

// ---- F-261b: the never-consumed brand constants ------------------------------

describe("F-261b — the never-consumed brand constants retire", () => {
  it("constants.ts carries no APP_NAME / APP_TAGLINE declarations", () => {
    const src = read("src/lib/constants.ts");
    expect(src).not.toContain("APP_NAME");
    expect(src).not.toContain("APP_TAGLINE");
    // the live families stay (the retirement is surgical, not wholesale)
    expect(src).toContain("export const BUDGET_CATEGORIES");
    expect(src).toContain("export const CHART_COLORS");
  });

  it("the GENUS census: every exported member of constants.ts has an external consumer", () => {
    const src = read("src/lib/constants.ts");
    const names = [...src.matchAll(/^export const ([A-Z][A-Z_0-9]+)\b/gm)].map(
      (m) => m[1],
    );
    expect(names.length).toBeGreaterThanOrEqual(17);
    // The walk excludes constants.ts itself AND THIS FILE — a pin that
    // names the dead tokens in its own assertions would otherwise
    // satisfy its own census (the self-mention trap; the first run of
    // this leg proved it live: APP_NAME read as consumed through the
    // pin's own expect string).
    const exclusions = new Set([
      path.resolve(import.meta.dirname, "..", "src/lib/constants.ts"),
      path.resolve(import.meta.dirname, "parity-261.test.ts"),
    ]);
    const external = (name: string): boolean => {
      for (const rel of [
        "src/app",
        "src/components",
        "src/lib",
        "src/stores",
        "tests",
        "scripts",
        "prisma",
      ]) {
        const dir = path.resolve(import.meta.dirname, "..", rel);
        // token-level presence outside the exclusions
        if (mentionsToken(dir, name, exclusions)) return true;
      }
      return false;
    };
    const dead = names.filter((n) => !external(n));
    expect(dead).toEqual([]);
  });

  it("the brand literals live on at their three inline sites (the F-229f re-entry safety)", () => {
    const sidebar = read("src/components/layout/sidebar.tsx");
    expect(sidebar).toContain('>WealthOS</h2>');
    expect(sidebar).toContain("Premium Finance Suite");
    const header = read("src/components/layout/mobile-header.tsx");
    expect(header).toContain(">WealthOS</span>");
    const layout = read("src/lib/page-layout.ts");
    expect(layout).toContain("© 2026 WealthOS — Premium Finance Suite");
  });
});

// ---- F-261c: the settings-switch citation truing ------------------------------

describe("F-261c — the mis-cited figure trues to the computed value", () => {
  it("the settings comment cites the computed figure (no 1.63:1; the white thumb reads 1.49:1)", () => {
    const src = read("src/app/(app)/settings/page.tsx");
    expect(src).not.toContain("1.63:1");
    // the trued form: the white thumb against the stone-300 track
    expect(src).toContain("1.49:1");
  });

  it("the plan's F-221n register row carries the trued figure (the row-scoped form)", () => {
    const plan = read("docs/remediation_plan_v2.md");
    const rowStart = plan.indexOf("| F-221n |");
    expect(rowStart).toBeGreaterThan(-1);
    const rowEnd = plan.indexOf("\n", rowStart);
    const row = plan.slice(rowStart, rowEnd);
    expect(row).not.toContain("1.63:1");
    expect(row).toContain("1.49:1");
  });
});

// ---- F-261d: the vestigial-export genus's next two carriers -------------------

describe("F-261d — the vestigial exports retire their keywords", () => {
  it("BrandMark is module-local in the sidebar (the export keyword dropped)", () => {
    const src = read("src/components/layout/sidebar.tsx");
    expect(src).not.toMatch(/export function BrandMark/);
    expect(src).toMatch(/^function BrandMark\(\) \{/m);
    // the call site survives (the wordmark renders)
    expect(src).toMatch(/<BrandMark \/>/);
  });

  it("DEFAULT_DATABASE_URL is module-local in db-path (the export keyword dropped)", () => {
    const src = read("src/lib/db-path.ts");
    expect(src).not.toMatch(/export const DEFAULT_DATABASE_URL/);
    expect(src).toMatch(/^const DEFAULT_DATABASE_URL = "file:\.\.\/db\/custom\.db";$/m);
    // the fallback arm survives (the seam still defaults to the root contract)
    expect(src).toContain("envUrl ?? envFileUrl ?? DEFAULT_DATABASE_URL");
  });
});

// ---- the shared external-mention walker (F-261b's census engine) -------------

function mentionsToken(dir: string, token: string, excludeFiles: Set<string>): boolean {
  if (!existsSync(dir)) return false;
  for (const name of readdirSync(dir)) {
    if (name === "generated") continue; // the regenerated prisma client
    const p = path.join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (mentionsToken(p, token, excludeFiles)) return true;
    } else if (/\.(ts|tsx|jsx)$/.test(name) && !excludeFiles.has(p)) {
      if (new RegExp(`\\b${token}\\b`).test(readFileSync(p, "utf8"))) return true;
    }
  }
  return false;
}
