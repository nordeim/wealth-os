import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-231 (R-28): the source-tier pins for the a11y-tail,
// logging-grain, and dead-family round. Every pin was born RED over the
// pre-cure tree (the F-231 ledger rows in docs/remediation_plan_v2.md
// carry the verified evidence, the probe-231/b/c adjudication included).
// Source-scanning contracts per the house convention: read the file,
// assert the contract.

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
}

/** Walk src (ts/tsx/css), skipping the generated prisma client. */
function walkSrc(dir: string, files: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === "generated") continue;
    const p = path.join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkSrc(p, files);
    else if (/\.(ts|tsx|css)$/.test(name)) files.push(p);
  }
  return files;
}

const SRC_ROOT = path.resolve(import.meta.dirname, "..", "src");

// ---- F-231a: the expenses dialog decorative glyph -----------------------

describe("F-231a — the Add/Edit Expense title's decorative $ tile is hidden", () => {
  it("the amber tile span carries aria-hidden (the F-225k family complete)", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    const tile = src.match(/<span[^>]*className="flex h-8 w-8[^"]*"[^>]*>\s*\$\s*<\/span>/);
    expect(tile).not.toBeNull();
    // the matched span must carry the hiding attribute
    expect(tile![0]).toMatch(/aria-hidden="true"/);
  });
});

// ---- F-231b: the auth-card view-swap focus ------------------------------

describe("F-231b — every auth-card view transition lands focus", () => {
  it("the unified effect focuses the heading, value-guarded (StrictMode-safe)", () => {
    const src = read("src/components/layout/login-card.tsx");
    // The value-comparison guard: only a real view CHANGE moves focus —
    // a boolean mount flag fires on the dev server's StrictMode
    // double-invoke (live-caught by the captures face)
    expect(src).toMatch(/prevViewRef\.current !== view/);
    expect(src).toMatch(/if \(!changed\) return;/);
    expect(src).toMatch(/titleRef\.current\?\.focus\(\)/);
    // the verify box-1 pattern survives inside the unified effect
    expect(src).toMatch(/if \(view === "verify"\) \{[^}]*codeRefs\.current\[0\]\?\.focus\(\)/);
  });

  it("every non-verify view heading is focusable (tabIndex -1 + the shared ref)", () => {
    const src = read("src/components/layout/login-card.tsx");
    const count = (src.match(/<h1[^>]*ref=\{titleRef\}[^>]*tabIndex=\{-1\}/g) ?? []).length;
    // the four non-verify views: reset, signup, sent, signin
    expect(count).toBe(4);
  });

  it("the reset screen's done swap gains the same technique", () => {
    const src = read("src/components/layout/reset-password-screen.tsx");
    expect(src).toMatch(/tabIndex=\{-1\}/);
    expect(src).toMatch(/titleRef\.current\?\.focus\(\)/);
  });
});

// ---- F-231c: the DropdownContent z-pin -----------------------------------

describe("F-231c — the vendored DropdownContent rides the menu layer", () => {
  it("the content class pins z-50, not the skip-link's 60-level", () => {
    const src = read("src/components/ui/dropdown.tsx");
    const cls = src.match(/"z-(\S+) min-w-\[10rem\][^"]*"/);
    expect(cls).not.toBeNull();
    // the captured step is the scale's menu layer (50), never the
    // skip-link's dedicated 60
    expect(cls![1]).toBe("50");
  });
});

// ---- F-231d + N-89c6: the icons.tsx retirement ---------------------------

describe("F-231d — FilterPolygon and icons.tsx retire", () => {
  it("the file is gone and no src file references the glyph", () => {
    expect(existsSync(path.resolve(SRC_ROOT, "components/ui/icons.tsx"))).toBe(false);
    for (const f of walkSrc(SRC_ROOT)) {
      expect(readFileSync(f, "utf8")).not.toContain("FilterPolygon");
    }
  });

  it("the N-89c6 lucide-injection note survives at the KpiCard delta icons", () => {
    const src = read("src/components/shared/page-parts.tsx");
    expect(src).toMatch(/aria-hidden/);
    expect(src).toMatch(/lucide-react[^\n]*inject|injects?\s+`?aria-hidden/);
  });
});

// ---- F-231e: the day-of-week fill -----------------------------------------

describe("F-231e — the day-of-week bars ride the spending hue", () => {
  it("the Analytics bar fill is CHART_COLORS.expenses (our own superset card)", () => {
    const src = read("src/app/(app)/analytics/page.tsx");
    const bar = src.match(/<Bar dataKey="value" name="Spending"[^/]*fill=\{CHART_COLORS\.(\w+)\}/);
    expect(bar).not.toBeNull();
    expect(bar![1]).toBe("expenses");
  });
});

// ---- F-231f: the upload multipart log -------------------------------------

describe("F-231f — the upload POST's multipart parse failure leaves a trace", () => {
  it("the formData catch logs before the 400 (the F-226c genus closed)", () => {
    const src = read("src/app/api/upload/route.ts");
    expect(src).toMatch(/formData\(\)\.catch\(\((?:error|err)[^)]*\) => \{[^}]*logApiError/);
  });
});

// ---- F-231g: the uploads GET ENOENT gate -----------------------------------

describe("F-231g — a capability-URL miss is not an error-level event", () => {
  it("the GET gates ENOENT out of the error log; real failures still log", () => {
    const src = read("src/app/api/uploads/[name]/route.ts");
    expect(src).toMatch(/ENOENT/);
    // the miss guard precedes the log call
    const guard = src.indexOf("ENOENT");
    const log = src.indexOf('logApiError("uploads/:name GET"');
    expect(guard).toBeGreaterThan(-1);
    expect(log).toBeGreaterThan(-1);
    expect(guard).toBeLessThan(log);
  });
});

// ---- F-231h: the CRM-era dead-family retirement ----------------------------

describe("F-231h — the CRM-era zero-consumer constructs retire", () => {
  it("DialogFooterWide, DIALOG_FOOTER_WIDE, DIALOG_CONTENT.wide, Avatar, initialsOf are gone", () => {
    const dialog = read("src/components/ui/dialog.tsx");
    expect(dialog).not.toContain("DialogFooterWide");
    expect(dialog).not.toContain("DIALOG_FOOTER_WIDE");
    const layout = read("src/lib/page-layout.ts");
    expect(layout).not.toMatch(/wide:\s*"max-w-2xl/);
    expect(layout).not.toContain("DIALOG_FOOTER_WIDE");
    const avatar = read("src/components/ui/avatar.tsx");
    expect(avatar).not.toContain("initialsOf");
    expect(avatar).not.toMatch(/function Avatar\(/);
    // the live seam stays
    expect(avatar).toContain("avatarTextColor");
  });

  it("the Event/Activity citations are reworded to the historical record", () => {
    const dialog = read("src/components/ui/dialog.tsx");
    expect(dialog).not.toContain("Event/Activity");
  });

  it("the shadcn-stock arms stay (the F-227f register, not retirement)", () => {
    const dialog = read("src/components/ui/dialog.tsx");
    // the primitive re-exports are stock API and stay registered
    expect(dialog).toContain("DialogPrimitive.Trigger");
    expect(dialog).toContain("DialogPrimitive.Close");
    expect(dialog).toContain("DialogPrimitive.Portal");
    const button = read("src/components/ui/button.tsx");
    expect(button).toMatch(/link:/);
    expect(button).toMatch(/secondary:/);
  });
});

// ---- F-231i: the TrendingDown symmetry -------------------------------------

describe("F-231i — both KpiCard delta icons carry the explicit hiding", () => {
  it("TrendingDown matches TrendingUp's aria-hidden", () => {
    const src = read("src/components/shared/page-parts.tsx");
    expect(src).toMatch(/<TrendingDown[^>]*aria-hidden="true"/);
  });
});

// ---- F-231j: the expenses memo ----------------------------------------------

describe("F-231j — the expenses filter memoizes on the stable identity", () => {
  it("expenses rides useMemo keyed on store.transactions", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toMatch(
      /const expenses = React\.useMemo\(\s*\(\) => store\.transactions\.filter\(\(t\) => t\.type === "expense"\),\s*\[store\.transactions\],\s*\);/,
    );
  });
});

// ---- F-231k: the settings peer retirement ------------------------------------

describe("F-231k — the settings switch drops the vestigial peer class", () => {
  it("no peer class rides the toggle (no peer-* consumer exists)", () => {
    const src = read("src/app/(app)/settings/page.tsx");
    expect(src).not.toMatch(/"peer inline-flex/);
    expect(src).not.toMatch(/"peer\s/);
  });
});

// ---- F-231l: the login-card trailing docblock ---------------------------------

describe("F-231l — the trailing doc-block rot retires", () => {
  it("no comment documents the retired bar-chart function", () => {
    const src = read("src/components/layout/login-card.tsx");
    expect(src).not.toMatch(/this function\s+used to draw/);
    expect(src).not.toMatch(/used to draw is retired/);
  });
});
