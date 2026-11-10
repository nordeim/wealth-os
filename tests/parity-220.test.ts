// Session-220 (R-17): the date-seam completion and dark-surface round's
// source pins. Every pin was born RED against the pre-round tree and
// carries its finding's citation. The round's verified defects: the
// F-219e analytics cure was a NO-OP for the bare yyyy-mm-dd form (the
// headline, live-reproduced under TZ=America/New_York — behavioral
// pins live in tests/finance.test.ts); the writes bucket landed only
// on collection POSTs; ~14 muted-text sites carry no dark arm (dark is
// the fresh-visitor default); --color-background never flips while the
// inert base-layer .dark body rule sits beside it; the error pages'
// Try-again focus ring is amber-on-amber.
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = (p: string) => readFileSync(p, "utf8");

// ---- F-220c: the writes bucket on EVERY mutating handler --------------------

describe("F-220c — the writes bucket covers every mutating handler", () => {
  const mutatingRoutes = [
    "src/app/api/transactions/[id]/route.ts",
    "src/app/api/goals/[id]/route.ts",
    "src/app/api/accounts/[id]/route.ts",
    "src/app/api/income-sources/[id]/route.ts",
    "src/app/api/investments/[id]/route.ts",
    "src/app/api/budgets/route.ts",
    "src/app/api/settings/route.ts",
    "src/app/api/users/route.ts",
  ];
  for (const r of mutatingRoutes) {
    it(`${r}: carries the writes bucket`, () => {
      const src = read(r);
      expect(src).toMatch(/rateLimit\(`writes:\$\{clientKey\((?:req|request)\)\}`/);
    });
  }

  it("the [id] routes bucket BOTH the PUT and the DELETE", () => {
    for (const r of [
      "src/app/api/transactions/[id]/route.ts",
      "src/app/api/goals/[id]/route.ts",
      "src/app/api/accounts/[id]/route.ts",
      "src/app/api/income-sources/[id]/route.ts",
      "src/app/api/investments/[id]/route.ts",
    ]) {
      const src = read(r);
      const puts = (src.match(/export async function PUT/g) ?? []).length;
      const dels = (src.match(/export async function DELETE/g) ?? []).length;
      const buckets = (src.match(/rateLimit\(/g) ?? []).length;
      expect(buckets, `${r}: ${puts} PUT + ${dels} DELETE need buckets`).toBe(
        puts + dels,
      );
    }
  });
});

// ---- F-220b: the dark-arm completion ----------------------------------------

describe("F-220b — the muted-text sites carry dark arms", () => {
  const sites: Array<[string, RegExp]> = [
    ["src/components/shared/page-parts.tsx", /text-sm text-stone-500 dark:text-stone-400/],
    ["src/app/(app)/income/page.tsx", /text-xs text-stone-500 dark:text-stone-400/],
    ["src/app/(app)/dashboard/page.tsx", /text-xs text-stone-500 dark:text-stone-400/],
    ["src/app/(app)/analytics/page.tsx", /text-xs text-stone-500 dark:text-stone-400/],
    ["src/app/(app)/accounts/page.tsx", /text-xs text-stone-500 dark:text-stone-400/],
    ["src/app/(app)/settings/page.tsx", /text-sm text-stone-500 dark:text-stone-400/],
    ["src/app/(app)/import/page.tsx", /text-xs text-stone-500 dark:text-stone-400/],
    ["src/app/(app)/expenses/page.tsx", /className="text-stone-500 dark:text-stone-400"/],
  ];
  for (const [file, pattern] of sites) {
    it(`${file}: the caption family carries the dark arm`, () => {
      expect(read(file)).toMatch(pattern);
    });
  }

  it("the two Paused badges flip their ink with the chip (stone-600/500 → stone-300)", () => {
    expect(read("src/app/(app)/income/page.tsx")).toMatch(
      /bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300/,
    );
    expect(read("src/app/(app)/goals/page.tsx")).toMatch(
      /bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-300/,
    );
  });

  it("the search/coach placeholders carry the dark arm (stone-500 on stone-900 is 3.9:1)", () => {
    expect(read("src/app/(app)/expenses/page.tsx")).toMatch(
      /placeholder:text-stone-500 dark:placeholder:text-stone-400/,
    );
    expect(read("src/components/shared/ai-coach.tsx")).toMatch(
      /placeholder:text-stone-500 dark:placeholder:text-stone-400/,
    );
  });

  it("no text-stone-500 rides a bare className on the section pages (the missing-arm class is closed)", () => {
    // The F-219i sweep banned dark:text-stone-500 (the flipped-WRONG
    // form); this pin closes the MISSING-ARM form on the audited
    // surfaces: every LINE carrying text-stone-500 must also carry a
    // dark arm in the same class string.
    const files = [
      "src/components/shared/page-parts.tsx",
      "src/app/(app)/income/page.tsx",
      "src/app/(app)/dashboard/page.tsx",
      "src/app/(app)/analytics/page.tsx",
      "src/app/(app)/accounts/page.tsx",
      "src/app/(app)/settings/page.tsx",
      "src/app/(app)/import/page.tsx",
      "src/app/(app)/expenses/page.tsx",
    ];
    for (const f of files) {
      const bare =
        read(f)
          .split("\n")
          .filter((l) => /text-stone-500/.test(l) && !/dark:/.test(l)) ?? [];
      expect(bare, `${f}: text-stone-500 without a dark arm`).toHaveLength(0);
    }
  });
});

// ---- F-220d: the background token flip --------------------------------------

describe("F-220d — the background token flips in .dark", () => {
  const css = read("src/app/globals.css");

  it("flips --color-background inside the .dark block", () => {
    const darkBlock = css.slice(css.indexOf("\n.dark {"));
    expect(darkBlock).toMatch(/--color-background:\s*#0e1310/);
  });

  it("the inert base-layer .dark body rule is DELETED (the F-217c mechanism)", () => {
    expect(css).not.toMatch(/\.dark body\s*\{/);
  });

  it("the settings switch thumb no longer reads the unflipped token (bg-white knob)", () => {
    expect(read("src/app/(app)/settings/page.tsx")).not.toMatch(
      /rounded-full bg-background shadow-lg/,
    );
    expect(read("src/app/(app)/settings/page.tsx")).toMatch(
      /rounded-full bg-white shadow-lg/,
    );
  });
});

// ---- F-220e/f: the error-page ring + toast dismiss ---------------------------

describe("F-220e — the error pages' Try-again focus ring", () => {
  for (const f of ["src/app/error.tsx", "src/app/global-error.tsx"]) {
    it(`${f}: focus-visible:ring-ring (not amber-on-amber)`, () => {
      const src = read(f);
      expect(src).not.toMatch(/focus:ring-primary/);
      expect(src).toMatch(/focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring/);
    });
  }
});

describe("F-220f — the toast dismiss ink (2.52:1 → text-muted)", () => {
  it("the dismiss button rides text-muted (4.74:1 light / ~7:1 dark)", () => {
    expect(read("src/components/ui/toast.tsx")).toMatch(
      /p-1 text-muted transition-colors/,
    );
    expect(read("src/components/ui/toast.tsx")).not.toMatch(/p-1 text-subtle/);
  });
});

// ---- F-220g/h: the theme seam mirrors ---------------------------------------

describe("F-220g — the bootstrap's invalid-value branch matches the seam", () => {
  it("a non-light/dark/system stored value resolves the ROUTE default (not light)", () => {
    const layout = read("src/app/layout.tsx");
    // The bootstrap must treat an invalid value as ABSENT: light only
    // when stored==="light"; system only when stored==="system";
    // everything else (incl. "banana"/null) → the route default.
    expect(layout).toMatch(
      /t==="light"\?false:\(t==="system"\?window\.matchMedia\("\(prefers-color-scheme: dark\)"\)\.matches:true\)/,
    );
  });
});

describe("F-220h — the OS theme-flip listener gates on the EXACT storage read", () => {
  it("the listener follows the OS only when the stored choice IS system (not the null→system default)", () => {
    const src = read("src/components/layout/theme.tsx");
    expect(src).toMatch(
      /localStorage\.getItem\(STORAGE_KEY\) === "system"/,
    );
    expect(src).not.toMatch(/readStoredTheme\(\) === "system"/);
  });
});

// ---- F-220i: the accountId clear contract -----------------------------------

describe("F-220i — accountId null survives the parse (the F-219q contract)", () => {
  it("the transform normalizes only the empty string (null is a legal clear)", async () => {
    const mod = await import("@/lib/schemas");
    const parsed = mod.transactionUpdateSchema.safeParse({ accountId: null });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.accountId).toBeNull(); // pre-cure: undefined (collapsed)
    }
  });

  it("an empty string also means the clear (the documented contract)", async () => {
    const mod = await import("@/lib/schemas");
    const parsed = mod.transactionUpdateSchema.safeParse({ accountId: "" });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.accountId).toBeNull();
    }
  });

  it("a real id passes through", async () => {
    const mod = await import("@/lib/schemas");
    const parsed = mod.transactionUpdateSchema.safeParse({ accountId: "abc123" });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.accountId).toBe("abc123");
    }
  });
});

// ---- F-220j: the store's error-code plumbing --------------------------------

describe("F-220j — call() carries error.code; hydrate branches on UNAUTHORIZED", () => {
  it("call() returns the code alongside the message", () => {
    const src = read("src/stores/wealthos-store.ts");
    expect(src).toMatch(/code: body && body\.error \? body\.error\.code : undefined/);
  });

  it("hydrate() branches on the UNAUTHORIZED code (not message substrings)", () => {
    const src = read("src/stores/wealthos-store.ts");
    expect(src).toMatch(/res\.code === "UNAUTHORIZED"/);
    expect(src).not.toMatch(/res\.error\.includes\("authenticate"\)/);
    expect(src).not.toMatch(/res\.error\.includes\("Sign in"\)/);
  });
});

// ---- F-220k: forgot-password's read path ------------------------------------

describe("F-220k — forgot-password's read path 503s the transient-abort family", () => {
  it("the findUnique catch distinguishes P2024/P2028 (no blanket swallow)", () => {
    const src = read("src/app/api/auth/forgot-password/route.ts");
    expect(src).toMatch(
      /findUnique[\s\S]{0,600}P2024" \|\| error\.code === "P2028/,
    );
    expect(src).not.toMatch(/findUnique\(\{ where: \{ email \} \}\)\.catch\(\(\) => null\)/);
  });
});

// ---- F-220l: the refreshAll sequence guard ----------------------------------

describe("F-220l — refreshAll discards stale sequences", () => {
  it("a monotonic sequence guards the slice swap (last-request-wins)", () => {
    const src = read("src/stores/wealthos-store.ts");
    expect(src).toMatch(/refreshSeq/);
    expect(src).toMatch(/seq !== refreshSeq/);
  });
});

// ---- F-220m: the import staging seam ----------------------------------------

describe("F-220m — the import page stages through the csv seam", () => {
  it("the page stages dates through stageCsvDate (no raw toISOString staging)", () => {
    const src = read("src/app/(app)/import/page.tsx");
    expect(src).toMatch(/stageCsvDate\(/);
    expect(src).not.toMatch(/parsedDate\.toISOString\(\)/);
  });

  it("the preview cell routes through toDate (the F-218d display contract)", () => {
    const src = read("src/app/(app)/import/page.tsx");
    expect(src).toMatch(/toDate\(row\.date\)\.toLocaleDateString/);
    expect(src).not.toMatch(/new Date\(row\.date\)\.toLocaleDateString/);
  });

  it("the skipped-row count is surfaced in the review step", () => {
    const src = read("src/app/(app)/import/page.tsx");
    expect(src).toMatch(/skipped/);
  });
});

// ---- F-220n: the hygiene tail ------------------------------------------------

describe("F-220n — the hygiene tail", () => {
  it("the theme seam's dead exports are gone", () => {
    const src = read("src/lib/theme-default.ts");
    expect(src).not.toMatch(/export function routeDefaultsToDark/);
    expect(src).not.toMatch(/export function routeIsAuthFace/);
  });

  it("the theme seam's mechanism comment names the ThemeProvider effect (not a phantom AppShell call)", () => {
    const src = read("src/lib/theme-default.ts");
    expect(src).not.toMatch(/AppShell calls it on shell entry/);
    expect(src).toMatch(/ThemeProvider pathname effect/);
  });

  it("formatDateByPattern (the dead export) is gone", () => {
    expect(read("src/lib/format.ts")).not.toMatch(/formatDateByPattern/);
  });

  it("api.ts's body-cap comment no longer enumerates CRM routes", () => {
    expect(read("src/lib/api.ts")).not.toMatch(/activities\/contacts\/events\/leads/);
  });

  it("the auth-face docblocks no longer describe NEO CRM titles", () => {
    expect(read("src/app/login/page.tsx")).not.toMatch(/NEO CRM/);
    expect(read("src/app/signup/page.tsx")).not.toMatch(/NEO CRM/);
    expect(read("src/app/not-found.tsx")).not.toMatch(/NEO CRM/);
  });
});

// ---- F-220o/p: the verification tail ----------------------------------------

describe("F-220o/p — the dark a11y legs + the register hygiene", () => {
  it("the dark a11y leg walks ALL nine sections", () => {
    const src = read("tests/e2e/a11y.spec.ts");
    expect(src).toMatch(/DARK_SECTIONS/);
    const start = src.indexOf("DARK_SECTIONS");
    const end = src.indexOf("test.describe", start);
    const block = src.slice(start, end);
    for (const s of [
      "/Dashboard",
      "/Income",
      "/Expenses",
      "/Accounts",
      "/Investments",
      "/Import",
      "/Analytics",
      "/Goals",
      "/Settings",
    ]) {
      expect(block, `the dark leg must cover ${s}`).toContain(s);
    }
  });

  it("the register's stale arms are retired (text-amber-500; the residual bg-primary/submit umbrella)", () => {
    const src = read("tests/e2e/a11y.spec.ts");
    expect(src).not.toMatch(/"text-amber-500"/);
    expect(src).not.toMatch(/'button\[type="submit"\]'/);
  });

  it("the chart-stroke deviation carries its register citation (WCAG 1.4.11, the reference's own palette)", () => {
    const src = read("tests/e2e/a11y.spec.ts");
    expect(src).toMatch(/CHART_COLORS/);
  });
});
