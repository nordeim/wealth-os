// Session-222 (R-19): the zone-designator completion and
// focus-affordance round's source pins. Every pin was born RED against
// the pre-round tree and carries its finding's citation. The round's
// verified defects: the R-18 UTC_DESIGNATED test was case-sensitive
// (lowercase-z staged a day off on both zone edges) and recognized
// only ±00:00 (non-UTC offsets staged the VIEWER's calendar date —
// the behavioral pins live in tests/csv.test.ts); the import-preview
// income ink carried no dark arm (3.15:1); the 404/error faces
// rendered light-only under the dark default; the hand-rolled
// interactives carried no house focus ring; DIALOG_CLOSE's hover
// stepped DOWN in dark; the recharts tooltips stayed light-locked;
// the F-221q busy rider missed the two delete surfaces; the
// login/forgot routes carried no per-account bucket (the default
// proxy posture keys on client-suppliable headers); the [id]
// mutations surfaced the vanish race as INTERNAL.
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = (p: string) => readFileSync(p, "utf8");

// ---- F-222a/b/c/d: the csv seam's designator family --------------------------

describe("F-222a/b — every zone-designated ISO datetime stages the WRITTEN literal", () => {
  it("the designator family: Z/z case-insensitive, ±HH:MM, ±HHMM, ±HH — and the retired case-sensitive UTC_DESIGNATED", () => {
    const src = read("src/lib/csv.ts");
    expect(src).toContain(
      "(?:[Zz]|[+-]\\d{2}(?::?\\d{2})?)",
    );
    expect(src).not.toContain("const UTC_DESIGNATED");
  });

  it("the designated branch consumes the same literal path as the bare form (one staging doctrine)", () => {
    const src = read("src/lib/csv.ts");
    expect(src).toContain(
      'const bare = BARE_ISO_DATE.exec(trimmed);',
    );
    expect(src).toContain(
      "const designated = bare ? null : ZONE_DESIGNATED.exec(trimmed);",
    );
  });

  it("the whole-string V8 parity check guards the designated branch (an invalid TIME invalidates the cell)", () => {
    const src = read("src/lib/csv.ts");
    expect(src).toContain(
      'if (designated && Number.isNaN(new Date(trimmed).getTime())) {',
    );
  });
});

describe("F-222c — partial ISO forms skip (never an invented day)", () => {
  it("the PARTIAL_ISO rejection rides the seam head", () => {
    const src = read("src/lib/csv.ts");
    expect(src).toContain("const PARTIAL_ISO = /^\\d{4}(-\\d{2})?$/;");
    expect(src).toContain("if (PARTIAL_ISO.test(trimmed)) return null;");
  });
});

describe("F-222d — the rollover guard covers every literal-staging branch", () => {
  it("the locale numeric guard exists and round-trips the MDY/YMD shapes", () => {
    const src = read("src/lib/csv.ts");
    expect(src).toContain("function localeRollover(");
    expect(src).toContain(
      "if (numeric && !localeRollover(numeric[1], numeric[2], numeric[3], parsed)) {",
    );
  });
});

// ---- F-222e: the import-preview income ink -----------------------------------

describe("F-222e — the import-preview income ink carries its dark arm", () => {
  it('the income branch pairs emerald-700 with dark:text-emerald-400 (the sibling pattern)', () => {
    const src = read("src/app/(app)/import/page.tsx");
    expect(src).toContain(
      '"text-emerald-700 dark:text-emerald-400"',
    );
  });
});

// ---- F-222f: the 404/error dark arms -----------------------------------------

describe("F-222f — the 404 and segment-error faces render dark under the dark default", () => {
  it("NOT_FOUND_LAYOUT: the wash, the inks, the divider, and the home button all flip", () => {
    const src = read("src/lib/page-layout.ts");
    const block = src.slice(src.indexOf("export const NOT_FOUND_LAYOUT"));
    expect(block).toContain("bg-slate-50 dark:bg-[#0a0a0a]");
    expect(block).toContain("text-slate-500 dark:text-stone-400");
    expect(block).toContain("bg-slate-200 mx-auto dark:bg-stone-800");
    expect(block).toContain("text-slate-800 dark:text-stone-100");
    expect(block).toContain("text-slate-600 dark:text-stone-400");
    expect(block).toContain(
      "dark:text-stone-200 dark:bg-stone-900 dark:border-stone-700",
    );
  });

  it("error.tsx: the wash, the inks, the divider, and the Try-again ink all flip", () => {
    const src = read("src/app/error.tsx");
    expect(src).toContain("bg-slate-50 dark:bg-[#0a0a0a]");
    expect(src).toContain("text-slate-500 dark:text-stone-400");
    expect(src).toContain("bg-slate-200 mx-auto dark:bg-stone-800");
    expect(src).toContain("text-slate-800 dark:text-stone-100");
    expect(src).toContain("text-slate-600 dark:text-stone-400");
    expect(src).toContain("dark:text-stone-50");
  });
});

// ---- F-222g: the focus-ring family --------------------------------------------

describe("F-222g — the hand-rolled interactives carry the house focus ring", () => {
  it("PeriodSegment (page-parts): focus-visible ring on the raw button", () => {
    const src = read("src/components/shared/page-parts.tsx");
    expect(src).toContain(
      "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    );
  });

  it("the toast dismiss ✕: focus-visible ring", () => {
    const src = read("src/components/ui/toast.tsx");
    expect(src).toContain(
      "dark:hover:text-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    );
  });

  it("the app-shell store-error Try-again: focus-visible ring", () => {
    const src = read("src/components/layout/app-shell.tsx");
    expect(src).toContain(
      "hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    );
  });

  it("the auth face's Google + footer links (page-layout): the amber ring genus", () => {
    const src = read("src/lib/page-layout.ts");
    expect(src).toContain(
      "hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2",
    );
    expect(src).toContain(
      "hover:text-[#1b2437] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 rounded-sm",
    );
  });

  it("the auth funnel's back buttons + resend (login-reset): the amber ring genus", () => {
    const src = read("src/lib/login-reset.ts");
    const ring =
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2";
    // three back constants + the resend button
    expect(src.match(new RegExp(ring.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"))?.length).toBe(4);
  });

  it("the Expenses chips (filters-close, quick-category, back-to-form, quick-amount): the ring", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
    const count = src.split(ring).length - 1;
    expect(count).toBeGreaterThanOrEqual(4);
  });
});

// ---- F-222h: DIALOG_CLOSE dark arms -------------------------------------------

describe("F-222h — DIALOG_CLOSE's hover rises in dark too", () => {
  it("the 400/300 dark mirror joins the stone-500/600 light pair", () => {
    const src = read("src/lib/page-layout.ts");
    expect(src).toContain(
      "text-stone-500 transition-colors hover:text-stone-600",
    );
    expect(src).toContain(
      "dark:text-stone-400 dark:hover:text-stone-300",
    );
  });
});

// ---- F-222i: the recharts tooltip isDark completion ---------------------------

describe("F-222i — the chart tooltips join the isDark family", () => {
  it("dashboard: labelStyle/itemStyle/contentStyle ride tooltipInk/tooltipStyle", () => {
    const src = read("src/app/(app)/dashboard/page.tsx");
    expect(src).toContain('const tooltipInk = isDark ? "#f5f5f4" : "#1c1917";');
    expect(src).toContain("labelStyle={{ color: tooltipInk, fontWeight: 600 }}");
    expect(src).toContain("itemStyle={{ color: tooltipInk }}");
    expect(src).toContain("contentStyle={tooltipStyle}");
    expect(src).not.toContain('labelStyle={{ color: "#1c1917", fontWeight: 600 }}');
  });

  it("investments: the tooltip rides the isDark styles", () => {
    const src = read("src/app/(app)/investments/page.tsx");
    expect(src).toContain('const tooltipInk = isDark ? "#f5f5f4" : "#1c1917";');
    expect(src).toContain("contentStyle={tooltipStyle}");
    expect(src).not.toContain('border: "1px solid #e7e5e4"');
  });

  it("analytics: every tooltip rides the shared isDark styles (no bare <Tooltip />)", () => {
    const src = read("src/app/(app)/analytics/page.tsx");
    expect(src).toContain("labelStyle={tooltipLabelStyle}");
    const bare = src.match(/<Tooltip formatter=\{\(v\) => formatMoney\(Number\(v\)\)\} \/>/);
    expect(bare).toBeNull();
    const styled = src.split("contentStyle={tooltipStyle}").length - 1;
    expect(styled).toBeGreaterThanOrEqual(7);
  });
});

// ---- F-222j/k: the accounts red pair + the tabs/badge latent arms --------------

describe("F-222j — the accounts negative balance carries the F-218j pair", () => {
  it("both sites pair red-600 with dark:red-400", () => {
    const src = read("src/app/(app)/accounts/page.tsx");
    const pair = '"text-red-600 dark:text-red-400"';
    expect(src.split(pair).length - 1).toBe(2);
    expect(src).not.toContain('"text-red-500"');
  });
});

describe("F-222k — the latent dark arms (tabs underline/count, badge secondary)", () => {
  it("tabs: the underline-active and count-chip arms flip", () => {
    const src = read("src/components/ui/tabs.tsx");
    expect(src).toContain(
      '"border-amber-600 text-amber-700 dark:border-amber-500 dark:text-amber-400"',
    );
    expect(src).toContain(
      "bg-red-100 text-red-800 rounded-full dark:bg-red-950 dark:text-red-300",
    );
  });

  it("badge: the secondary variant flips (and the neutral-800 token is pinned — the v4 inert-token trap)", () => {
    const src = read("src/components/ui/badge.tsx");
    expect(src).toContain(
      "dark:bg-neutral-800 dark:text-neutral-100",
    );
    const css = read("src/app/globals.css");
    expect(css).toContain("--color-neutral-800: #262626;");
  });
});

// ---- F-222l: the busy rider's last two surfaces --------------------------------

describe("F-222l — the Expenses row-delete and Settings budget-delete join the busy rider", () => {
  it("expenses: busyId guards the row delete", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toContain(
      "const [busyId, setBusyId] = React.useState<string | null>(null);",
    );
    expect(src).toContain("disabled={busyId === tx.id}");
    expect(src).toContain("setBusyId(tx.id);");
  });

  it("settings: the budget delete is busy-guarded AND surfaces its result (the void-discard retired)", () => {
    const src = read("src/app/(app)/settings/page.tsx");
    expect(src).toContain(
      "const [busyBudget, setBusyBudget] = React.useState<string | null>(null);",
    );
    expect(src).toContain("disabled={busyBudget === budget.category}");
    expect(src).not.toContain("void store.deleteBudget(budget.category)");
    expect(src).toContain('toast.success("Budget deleted");');
  });
});

// ---- F-222m: the import skip copy ----------------------------------------------

describe("F-222m — the skip copy names every dropped-row class", () => {
  it("the parenthetical covers date, amount, and description", () => {
    const src = read("src/app/(app)/import/page.tsx");
    expect(src).toContain(
      "skipped (unparseable date, amount, or missing description).",
    );
    expect(src).not.toContain("skipped (unparseable date).");
  });
});

// ---- F-222n: the per-account secondary buckets ---------------------------------

describe("F-222n — login/forgot carry email-keyed secondary buckets above the IP caps", () => {
  it("login: the login-acct bucket, 30/15, fires after the parse and before the lookup", () => {
    const src = read("src/app/api/auth/login/route.ts");
    expect(src).toContain('rateLimit(\n    `login-acct:${email}`,');
    expect(src).toContain("30,\n    15 * 60 * 1000,");
    // the no-oracle ordering: the bucket call precedes the findUnique
    const bucketAt = src.indexOf("login-acct:");
    const lookupAt = src.indexOf("db.user.findUnique");
    expect(bucketAt).toBeGreaterThan(-1);
    expect(lookupAt).toBeGreaterThan(bucketAt);
  });

  it("forgot-password: the forgot-acct bucket, 20/15, fires before the account lookup", () => {
    const src = read("src/app/api/auth/forgot-password/route.ts");
    expect(src).toContain('rateLimit(`forgot-acct:${email}`, 20, 15 * 60 * 1000)');
    // the no-oracle ordering: the bucket call precedes the lookup
    const bucketAt = src.indexOf("forgot-acct:");
    const lookupAt = src.indexOf("db.user.findUnique");
    expect(bucketAt).toBeGreaterThan(-1);
    expect(lookupAt).toBeGreaterThan(bucketAt);
  });
});

// ---- F-222o: the P2025 → NOT_FOUND seam -----------------------------------------

describe("F-222o — the [id] vanish race answers NOT_FOUND, never INTERNAL", () => {
  it("the seam exists in src/lib/db.ts (P2025)", () => {
    const src = read("src/lib/db.ts");
    expect(src).toContain("export function isRecordNotFound(error: unknown): boolean");
    expect(src).toContain('error.code === "P2025"');
  });

  it("every [id] mutation catch consumes the seam (the five families, PUT + DELETE)", () => {
    const routes = [
      "src/app/api/transactions/[id]/route.ts",
      "src/app/api/income-sources/[id]/route.ts",
      "src/app/api/accounts/[id]/route.ts",
      "src/app/api/investments/[id]/route.ts",
      "src/app/api/goals/[id]/route.ts",
    ];
    for (const route of routes) {
      const src = read(route);
      expect(src).toContain('import { db, isRecordNotFound } from "@/lib/db";');
      const seams = src.split("if (isRecordNotFound(e)) return ERR.NOT_FOUND();").length - 1;
      expect(seams).toBe(2);
      expect(src).not.toMatch(/\} catch \{\n\s*return ERR\.INTERNAL\(\);\n\s*\}/);
    }
  });
});
