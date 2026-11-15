import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-245 (R-42): the source-tier pins for the gate-order,
// bare-carrier, and lockstep-truth round. Every RED pin was born over the
// pre-cure tree (the F-245 ledger rows in docs/remediation_plan_v2.md
// carry the verified evidence). Source-scanning contracts per the house
// convention: read the file, assert the contract.

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

// ---- F-245a: the public-family gate-order cure ---------------------------------

// The six public auth routes and their per-IP bucket prefixes (the burn
// whose position moves after the content-type gate).
const PUBLIC_ROUTES: Array<[string, string]> = [
  ["login", "login:"],
  ["signup", "signup:"],
  ["verify", "verify:"],
  ["resend", "resend:"],
  ["forgot-password", "forgot:"],
  ["reset-password", "pw-reset:"],
];

describe("F-245a — the public auth family gates before it burns", () => {
  it("the shared seam exports from src/lib/api.ts (one seam, never N copies)", () => {
    const src = read("src/lib/api.ts");
    // The F-238b rule: a family converges through ONE shared wrapper.
    // Session-246 (R-43, F-246b): logout joined the seam — the family's
    // last inline copy retired; the seam + the bounded reader's Layer 1
    // (structurally distinct — the null-value contract) are the only
    // two forms left.
    expect(src).toContain("export async function requireJsonContentType(");
    expect(src).toContain('ERR.BAD_REQUEST("Invalid request body")');
    expect(src).toMatch(/requireJsonContentType[\s\S]*?req\.body\?\.cancel\(\)/);
  });

  it("each of the six public routes calls the gate before the per-IP burn", () => {
    for (const [name, prefix] of PUBLIC_ROUTES) {
      const src = read(`src/app/api/auth/${name}/route.ts`);
      expect(src, `${name}: the gate call`).toContain("await requireJsonContentType(req)");
      const gateAt = src.indexOf("await requireJsonContentType(req)");
      const burnAt = src.indexOf(`rateLimit(\`${prefix}`);
      expect(gateAt, `${name}: gate call not found`).toBeGreaterThan(-1);
      expect(burnAt, `${name}: per-IP burn not found`).toBeGreaterThan(-1);
      // The F-243a doctrine, public-family edition: burn on the path
      // that carries the cost the bucket bounds — the cross-site
      // plain-text volley dies at the gate's 400 un-bucketed, so the
      // victim's own IP budget survives the volley (the F-234g genus
      // closed on its last surface).
      expect(gateAt).toBeLessThan(burnAt);
    }
  });

  it("the gate answers with the parseBody gate's own 400 copy (no new vocabulary)", () => {
    const src = read("src/lib/api.ts");
    const gateStart = src.indexOf("export async function requireJsonContentType(");
    const gateSlice = src.slice(gateStart, gateStart + 700);
    expect(gateSlice).toContain('ERR.BAD_REQUEST("Invalid request body")');
  });

  it("the uploads GET regex-404s before it burns (the F-243a sibling)", () => {
    const src = read("src/app/api/uploads/[name]/route.ts");
    const regexAt = src.indexOf("UPLOAD_NAME_RE.test(name)");
    const burnAt = src.indexOf("rateLimit(`uploads:");
    expect(regexAt).toBeGreaterThan(-1);
    expect(burnAt).toBeGreaterThan(-1);
    // The name check carries no cost (no I/O); the readFile does. An
    // invalid-name volley of image tags must not burn the victim's
    // 240-slot uploads budget.
    expect(regexAt).toBeLessThan(burnAt);
  });
});

// ---- F-245e: the bare-word carrier genus net ----------------------------------

describe("F-245e — the parity-229 invariant gains the bare-word leg", () => {
  it("the parity-229 battery carries the BARE_UTILITY_WORDS net", () => {
    const src = read("tests/parity-229.test.ts");
    // The F-244e lesson: pin the guard's own scan form, not prose about
    // it. The bare-word genus (single-word utilities carry no hyphen or
    // colon, so the class-shape heuristic is blind to them) needed its
    // own net — six dead rules shipped through it.
    expect(src).toContain("BARE_UTILITY_WORDS");
  });

  it("the retired bare words vanish from src (the reword proof for the fake-live word)", () => {
    // The parity-229 bare-word leg's LIVE derivation has a recorded
    // blind spot (the csv.ts regex-quote swallow fabricates liveness
    // for words in its span) — so the round's reword gets its own
    // zero-match legs for the unambiguous words. Word-boundary safe:
    // "lowercased" (schemas.ts) does not match \blowercase\b, and
    // "inline-flex"/"flow-root" compounds are handled per-word below.
    const layout = read("src/app/layout.tsx");
    expect(layout).not.toMatch(/\bantialiased\b/);
    const select = read("src/components/ui/select.tsx");
    expect(select).not.toMatch(/\bflow-root\b/);
    for (const rel of [
      "src/lib/csv.ts",
      "src/app/robots.txt/route.ts",
      "src/app/sitemap.xml/route.ts",
    ]) {
      expect(read(rel), `${rel}: the case-transform word retired`).not.toMatch(/\blowercase\b/);
    }
    // The route twins and section layouts: all 17 lowercase-route
    // comment sites (the nine capital aliases' page.jsx bridges + the
    // eight lowercase segment layouts).
    const aliasDirs = [
      "Dashboard", "Expenses", "Accounts", "Income", "Analytics",
      "Goals", "Import", "Investments", "Settings",
    ];
    for (const dir of aliasDirs) {
      expect(read(`src/app/(app)/${dir}/page.jsx`), `${dir}: the case word retired`).not.toMatch(
        /\blowercase\b/,
      );
    }
    const sections = [
      "accounts", "expenses", "investments", "income", "analytics",
      "settings", "goals", "import",
    ];
    for (const dir of sections) {
      expect(read(`src/app/(app)/${dir}/layout.tsx`), `${dir}: the case word retired`).not.toMatch(
        /\blowercase\b/,
      );
    }
    // The visibility word: six comment carriers, zero code usage.
    for (const rel of [
      "src/lib/uploads.ts",
      "src/lib/page-layout.ts",
      "src/components/layout/app-shell.tsx",
      "src/components/ui/select.tsx",
      "src/app/(app)/expenses/page.tsx",
    ]) {
      expect(read(rel), `${rel}: the visibility word retired from prose`).not.toMatch(
        /\binvisible\b/,
      );
    }
    // The display word: the parity-229 walker is src/-scoped, but the
    // content detection set scans the ROOT config files too (the
    // @source not directives exclude only directories + *.md) — the
    // census found two more carriers OUTSIDE the walker's net
    // (next.config.ts's two comment sites + tsconfig.json's one). The
    // CSP 'unsafe-inline' value strings are CODE, not prose, and the
    // build probe proves them non-extracting (all six rules vanished
    // with the prose carriers reworded and the CSP strings untouched).
    const configProse = read("next.config.ts").replace(/'unsafe-inline'/g, "");
    expect(configProse).not.toMatch(/\binline\b/);
    expect(read("tsconfig.json")).not.toMatch(/\binline\b/);
  });
});

// ---- F-245f: the health docblock's exception enumeration -----------------------

describe("F-245f — the health docblock records the second unbucketed family", () => {
  it("the enumeration names auth/me as the co-exception", () => {
    const src = read("src/app/api/health/route.ts");
    // The F-221t note claimed health is "the only deliberate
    // exception"; auth/me is the second (session-optional, structurally
    // mitigated — a garbage cookie fails the HMAC in microseconds and
    // never reaches the DB). The census prose now says so, in the
    // exact phrase (no prose-satisfiable substring).
    expect(src).toContain("/api/auth/me");
    expect(src).toContain("the second deliberate exception");
  });
});

// ---- F-245c/F-245d: the PAD truth legs live in the docs-counts battery ------
// (The real pins — the trio advance, the PAD hierarchy line, the §7.1 rows
// and their arithmetic — are legs of tests/docs-counts.test.ts itself: they
// read Project_Architecture_Document.md and assert the live forms. A
// meta-pin asserting the pin-file's prose would be the F-244e
// prose-satisfiability trap, so none rides here.)
