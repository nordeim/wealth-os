import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-226 (R-23): the source-tier pins for the escape-family
// completion and per-casing metadata round. Every pin was born RED over
// the pre-cure tree (the F-226 ledger rows in docs/remediation_plan_v2.md
// carry the live-verified evidence). Source-scanning contracts per the
// house convention: read the file, assert the contract.

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
}

const SECTIONS = [
  { dir: "income", page: "Income" },
  { dir: "expenses", page: "Expenses" },
  { dir: "accounts", page: "Accounts" },
  { dir: "investments", page: "Investments" },
  { dir: "import", page: "Import" },
  { dir: "analytics", page: "Analytics" },
  { dir: "goals", page: "Goals" },
  { dir: "settings", page: "Settings" },
] as const;

// ---- F-226b: the lowercase routes serve per-casing metadata ----------------

describe("F-226b — the lowercase section routes carry per-route metadata", () => {
  it.each(SECTIONS)(
    "the lowercase %s segment layout exports pageMetadata at its own route",
    ({ dir, page }) => {
      const src = read(`src/app/(app)/${dir}/layout.tsx`);
      expect(src).toContain("pageMetadata");
      expect(src).toContain(`page: "${page}"`);
      expect(src).toContain(`route: "/${dir}"`);
    },
  );

  it("the Dashboard twin keeps the ROOT head (the reference's own posture — no per-route export)", () => {
    const src = read("src/app/(app)/Dashboard/page.jsx");
    expect(src).not.toContain("pageMetadata");
    expect(src).not.toContain("export const metadata");
  });
});

// ---- F-226c: every API catch site logs before the envelope -----------------

describe("F-226c — the API error-logging seam", () => {
  it("src/lib/api.ts exports the logApiError seam", () => {
    const src = read("src/lib/api.ts");
    expect(src).toMatch(/export function logApiError/);
    expect(src).toMatch(/console\.error/);
  });

  it("the reference route handler logs its caught errors", () => {
    const src = read("src/app/api/transactions/route.ts");
    expect(src).toMatch(/catch \(error\)/);
    expect(src).toMatch(/logApiError\(/);
  });

  it("the route family carries no bare swallow-left catch (every catch binds and logs the error)", () => {
    const routes = [
      "src/app/api/dashboard/route.ts",
      "src/app/api/export/route.ts",
      "src/app/api/reset/route.ts",
      "src/app/api/search/route.ts",
      "src/app/api/settings/route.ts",
      "src/app/api/users/route.ts",
      "src/app/api/ai/coach/route.ts",
      "src/app/api/import/route.ts",
      "src/app/api/upload/route.ts",
      "src/app/api/budgets/route.ts",
      "src/app/api/transactions/[id]/route.ts",
    ];
    for (const r of routes) {
      const src = read(r);
      // No catch block may discard the error silently
      expect(src, r).not.toMatch(/catch\s*\{/);
      if (src.includes("catch")) {
        expect(src, r).toMatch(/logApiError\(/);
      }
    }
  });
});

// ---- F-226d: the Transaction compound index --------------------------------

describe("F-226d — the Transaction compound index (the heavy read family's sort)", () => {
  it("the schema carries @@index([ownerId, date]) on Transaction", () => {
    const src = read("prisma/schema.prisma");
    expect(src).toMatch(/@@index\(\[ownerId,\s*date\]\)/);
  });
});

// ---- F-226e: the uploads GET 429 joins the ERR.RATE_LIMITED family ----------

describe("F-226e — the uploads GET 429 carries Retry-After", () => {
  it("the route uses ERR.RATE_LIMITED (the family contract)", () => {
    const src = read("src/app/api/uploads/[name]/route.ts");
    expect(src).toMatch(/ERR\.RATE_LIMITED\(limit\.retryAfterSec\)/);
    expect(src).not.toMatch(/fail\("RATE_LIMITED"/);
  });
});

// ---- F-226f: the captures-225 pin joins the F-225e family ------------------

describe("F-226f — captures-225 joins the own-database pin family", () => {
  it("the parity-225 scripts list includes captures-225.ts", () => {
    const src = read("tests/parity-225.test.ts");
    expect(src).toContain('"scripts/captures-225.ts"');
  });
});

// ---- F-226g: the captures-225 spawn-liveness check --------------------------

describe("F-226g — the captures-225 spawn-liveness check", () => {
  it("the script asserts the spawned server is alive after the wait", () => {
    const src = read("scripts/captures-225.ts");
    expect(src).toMatch(/exitCode/);
    expect(src).toMatch(/spawned is alive|child.*alive|!spawned\.killed/i);
  });
});

// ---- F-226h: the bucket-exhaustion record -----------------------------------

describe("F-226h — the verify/resend exhaustion trade-off is recorded", () => {
  it("the verify route documents the third-party-exhaustable trade-off", () => {
    const src = read("src/app/api/auth/verify/route.ts");
    expect(src).toMatch(/exhaust/i);
  });
  it("the resend route documents the third-party-exhaustable trade-off", () => {
    const src = read("src/app/api/auth/resend/route.ts");
    expect(src).toMatch(/exhaust/i);
  });
});

// ---- F-226i: the TABS_SEGMENTED ring-offset ADD (the inverted claim) --------

describe("F-226i — TABS_SEGMENTED carries ring-offset-background (the reference's own class)", () => {
  it("the segmented trigger carries the class (a WHITE focus halo otherwise paints on dark pages)", () => {
    const src = read("src/lib/page-layout.ts");
    const seg = src.match(/TABS_SEGMENTED = \{[\s\S]*?\} as const;/)?.[0] ?? "";
    expect(seg).toContain("ring-offset-background");
  });
  it("SELECT_TRIGGER and TABS_PILL KEEP the class (byte-extracted from the reference)", () => {
    const src = read("src/lib/page-layout.ts");
    const sel = src.match(/SELECT_TRIGGER = \{[\s\S]*?\} as const;/)?.[0] ?? "";
    const pill = src.match(/TABS_PILL = \{[\s\S]*?\} as const;/)?.[0] ?? "";
    expect(sel).toContain("ring-offset-background");
    expect(pill).toContain("ring-offset-background");
  });
});

// ---- F-226j: the quick-adder group role --------------------------------------

describe("F-226j — the Expenses quick-adder wrapper carries a real role", () => {
  it("the wrapper is a group (aria-label on a role-less div is inert — the F-218m doctrine)", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toMatch(/role="group" aria-label="Quick amount adders"/);
  });
});

// ---- F-226k: the per-row action buttons carry row context --------------------

describe("F-226k — per-row action buttons carry row context", () => {
  it("the expenses Edit buttons name their row (the sr-only tail, the sibling-delete pattern)", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toMatch(/Edit\s*<span className="sr-only">\{tx\.description\}<\/span>/);
  });
  it("the accounts Edit/Remove buttons name their row", () => {
    const src = read("src/app/(app)/accounts/page.tsx");
    expect(src).toMatch(/Edit\s*<span className="sr-only">\{account\.name\}<\/span>/);
    expect(src).toMatch(/Remove\s*<span className="sr-only">\{account\.name\}<\/span>/);
  });
  it("the goals Edit/Delete buttons name their row", () => {
    const src = read("src/app/(app)/goals/page.tsx");
    expect(src).toMatch(/Edit\s*<span className="sr-only">\{goal\.name\}<\/span>/);
    expect(src).toMatch(/Delete\s*<span className="sr-only">\{goal\.name\}<\/span>/);
  });
  it("the income Edit/Pause buttons name their row", () => {
    const src = read("src/app/(app)/income/page.tsx");
    expect(src).toMatch(/Edit\s*<span className="sr-only">\{source\.name\}<\/span>/);
    expect(src).toMatch(/<span className="sr-only">\{source\.name\}<\/span>/);
  });
});

// ---- F-226l: MenuContent joins the token family ------------------------------

describe("F-226l — MenuContent rides the flipped token family (the reference's measured dark panel)", () => {
  it("the constant uses border-line bg-surface (light byte-identical, dark measures #0a0a0a/#262626)", () => {
    const src = read("src/lib/page-layout.ts");
    const menu = src.match(/MENU_CONTENT =[\s\S]*?as const;/)?.[0] ?? "";
    expect(menu).toContain("bg-surface");
    expect(menu).toContain("border-line");
    expect(menu).not.toContain("dark:bg-stone-900");
    expect(menu).not.toContain("dark:border-stone-700");
  });
});

// ---- F-226m: the gradient-contrast exemption register ------------------------

describe("F-226m — the gradient CTA/KPI contrast family is registered (the F-224y pattern)", () => {
  it("the CTA constants carry the measured-value citation", () => {
    const src = read("src/lib/page-layout.ts");
    expect(src).toMatch(/F-226m/);
    expect(src).toMatch(/2\.5[0-9]:1/); // white on emerald-500, the measured floor
  });
  it("the GradientKpiCard site carries the citation", () => {
    const src = read("src/components/shared/page-parts.tsx");
    expect(src).toMatch(/F-226m/);
  });
});

// ---- F-226n: the ±HH comment truth ------------------------------------------

describe("F-226n — the ±HH bare-offset comment tells the truth", () => {
  it("the csv docblock no longer claims the V8-rejected skip on the locale-designated shapes", () => {
    const src = read("src/lib/csv.ts");
    expect(src).not.toMatch(/±HH bare form is regex-tolerated but V8-rejected/);
  });
  it("the bare ±HH forms stage the written day (the docblock names the truth)", () => {
    // The behavioral arm lives in csv.test.ts's controls; here the source
    // contract: the docblock names the staging truth (F-226n).
    expect(read("src/lib/csv.ts")).toMatch(/stages the written day/i);
  });
});

// ---- F-226p: the F-225c window pin extension ---------------------------------

describe("F-226p — the verify/resend bucket pins carry the WINDOW", () => {
  it("the parity-225 pin extends through 15 * 60 * 1000 (the literal regex text)", () => {
    const src = read("tests/parity-225.test.ts");
    expect(src).toContain("60,\\s*15 \\* 60 \\* 1000");
    expect(src).toContain("10,\\s*15 \\* 60 \\* 1000");
  });
});

// ---- F-226r: the verify/resend email format ----------------------------------

describe("F-226r — verifySchema/resendSchema enforce the email format", () => {
  it("both schemas compose emailFormat", async () => {
    const mod = await import("../src/lib/schemas");
    const badVerify = mod.verifySchema.safeParse({ email: "nodot@", code: "123456" });
    const badResend = mod.resendSchema.safeParse({ email: "nodot@" });
    expect(badVerify.success).toBe(false);
    expect(badResend.success).toBe(false);
  });
});
