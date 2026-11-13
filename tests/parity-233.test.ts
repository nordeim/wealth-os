import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-233 (R-30): the source-tier pins for the OTP-paste,
// live-region, and dependency-hygiene round. Every pin was born RED
// over the pre-cure tree (the F-233 ledger rows in
// docs/remediation_plan_v2.md carry the verified evidence).
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
const SRC_FILES = walkSrc(SRC_ROOT);

// ---- F-233a: the OTP paste/autofill distribution --------------------------

describe("F-233a — the six-box code entry distributes multi-digit edits", () => {
  it("the pure applyCodeInput seam exists in the verification lib", () => {
    const src = read("src/lib/verification.ts");
    expect(src).toMatch(/export function applyCodeInput\(/);
  });

  it("the login card delegates its digit handler to the seam", () => {
    const src = read("src/components/layout/login-card.tsx");
    expect(src).toMatch(/applyCodeInput\(/);
    // the collapse-to-last-digit form the seam replaced is gone
    expect(src).not.toMatch(/\.replace\(\/\\D\/g, ""\)\.slice\(-1\)/);
  });

  it("the code inputs carry NO maxLength — a browser-enforced cap would truncate a paste before the handler ever sees it", () => {
    const src = read("src/components/layout/login-card.tsx");
    const inputs = src.match(/codeDigits\.map\([\s\S]{0,1800}?\)\)/)?.[0] ?? "";
    expect(inputs).not.toContain("maxLength");
  });
});

// ---- F-233b: the orphaned label-primitive dependency retirement -------------

describe("F-233b — @radix-ui/react-label retires with its deleted consumer", () => {
  it("no src file imports the label primitive", () => {
    for (const f of SRC_FILES) {
      expect(
        readFileSync(f, "utf8"),
        `${f} must not import @radix-ui/react-label`,
      ).not.toContain('"@radix-ui/react-label"');
    }
  });

  it("the manifest no longer carries the dependency", () => {
    const pkg = JSON.parse(read("package.json")) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    expect(pkg.dependencies?.["@radix-ui/react-label"]).toBeUndefined();
    expect(pkg.devDependencies?.["@radix-ui/react-label"]).toBeUndefined();
  });

  it("the lockfile no longer carries the package (the N-62a react-toast precedent)", () => {
    const lock = read("bun.lock");
    expect(lock).not.toContain('"@radix-ui/react-label"');
  });
});

// ---- F-233c: the login info-callout live region ------------------------------

describe("F-233c — the verify view's status region pre-exists (the F-218h form)", () => {
  it("the always-mounted sr-only region carries the polite status role", () => {
    const src = read("src/components/layout/login-card.tsx");
    // the region renders unconditionally inside the verify view: the
    // info value swaps INSIDE the region, never gating its mount
    const region = src.match(
      /<div role="status"[\s\S]{0,400}?<\/div>/,
    )?.[0] ?? "";
    expect(region).not.toBe("");
    expect(region).toMatch(/sr-only/);
    // empty-when-idle: the ternary form, not a conditional mount
    expect(region).toMatch(/\{info \?/);
  });

  it("the InfoCallout is the visual only — no live semantics ride it", () => {
    const src = read("src/components/layout/login-card.tsx");
    const fn = src.match(/function InfoCallout[\s\S]{0,600}/)?.[0] ?? "";
    expect(fn).not.toContain('role="status"');
    expect(fn).not.toContain("aria-live");
  });

  it("the verify view still mounts its green banner visually on info", () => {
    const src = read("src/components/layout/login-card.tsx");
    expect(src).toMatch(/\{info && <InfoCallout message=\{info\} \/>\}/);
  });
});

// ---- F-233d: the settings save guard -----------------------------------------

describe("F-233d — Save disables while the settings slice is missing", () => {
  it("the Save button's disabled condition includes the missing slice", () => {
    const src = read("src/app/(app)/settings/page.tsx");
    expect(src).toContain("disabled={busy || !settings}");
  });

  it("the card states the reason while the slice is missing", () => {
    const src = read("src/app/(app)/settings/page.tsx");
    // Session-234 (R-31, F-234a) recalibration: the condition keys on
    // the store's settled flag — the loading drop lands before the
    // settings await, so the slice alone read the in-flight window as
    // failure (the flash on every hard load under real latency).
    expect(src).toContain("!settings && store.settingsSettled");
    expect(src).toMatch(/could not be loaded/i);
  });
});

// ---- F-233e: the import retry affordance --------------------------------------

describe("F-233e — the extract button is the retry affordance, not a re-parse", () => {
  it("the button disables once the review stands", () => {
    const src = read("src/app/(app)/import/page.tsx");
    // Session-234 (R-31, F-234b) recalibration: the disabled set gains
    // the parse in-flight flag — the button sat enabled inside the
    // parse window, re-firing the exact re-parse this pin guards.
    expect(src).toContain("disabled={!file || busy || parsing || rows !== null}");
  });
});

// ---- F-233f: the reset-token URL strip -----------------------------------------

describe("F-233f — the one-time token leaves the address bar", () => {
  it("the screen captures the token once and strips the query", () => {
    const src = read("src/components/layout/reset-password-screen.tsx");
    // captured once at mount (the hook's value would follow the strip)
    expect(src).toMatch(/useState\((?:\(\) => )?token\)/);
    // the strip
    expect(src).toMatch(/history\.replaceState/);
    expect(src).toMatch(/"\/reset-password"/);
  });
});

// ---- F-233g: the upload breach-unlink isolation ---------------------------------

describe("F-233g — a failing breach-unlink never turns the 507 into a 500", () => {
  it("the unlink rides its own try/catch inside the breach branch", () => {
    const src = read("src/app/api/upload/route.ts");
    // Session-238 (R-35, F-238d) recalibration: the settled walk is
    // async now (await ahead of the call).
    const breach = src.match(
      /const settled = await uploadsCapacity[\s\S]{0,900}?STORAGE_FULL/,
    )?.[0] ?? "";
    expect(breach).not.toBe("");
    // the isolation: an inner try around the unlink, ahead of the
    // STORAGE_FULL answer, so the breach answer survives an unlink fault
    expect(breach).toMatch(/try\s*\{[\s\S]*unlink[\s\S]*\}\s*catch/);
  });
});

// ---- F-233h: the auth-face suspense boundaries -----------------------------------

describe("F-233h — login/signup wrap their search-params reader in Suspense", () => {
  it("both auth pages carry the boundary (the reset-password precedent)", () => {
    for (const rel of ["src/app/login/page.tsx", "src/app/signup/page.tsx"]) {
      const src = read(rel);
      expect(src, `${rel} imports Suspense`).toMatch(
        /import \{ Suspense \} from "react"/,
      );
      expect(src, `${rel} wraps LoginCard`).toMatch(/<Suspense>/);
    }
  });
});

// ---- F-233i: the F-232j count correction ------------------------------------------

describe("F-233i — the recorded whole-store census says fourteen", () => {
  it("the F-232j row carries the corrected count", () => {
    const plan = read("docs/remediation_plan_v2.md");
    const row = plan.match(/\| F-232j \|[^|]*\|[^|]*\|/)?.[0] ?? "";
    expect(row).toContain("fourteen");
    expect(row).not.toContain("fifteen");
  });
});

// ---- F-233j: the amber-arm comment scope -------------------------------------------

describe("F-233j — the retired amber arm cites the registered white-ink exception", () => {
  it("the comment scopes its claim and names the KPI-tile family", () => {
    const src = read("tests/e2e/a11y.spec.ts");
    const arm = src.match(/F-232f[\s\S]{0,700}/)?.[0] ?? "";
    expect(arm).not.toBe("");
    expect(arm).toMatch(/gradient tile/i);
    expect(arm).toMatch(/F-226m/);
  });
});

// ---- F-233k: the select.tsx checkbox narration --------------------------------------

describe("F-233k — the reference-bundle checkbox narration drops the caps collision", () => {
  it("the comment no longer reads as a citation of the retired constant", () => {
    const src = read("src/components/ui/select.tsx");
    expect(src).not.toContain("the CHECKBOX's");
    expect(src).toMatch(/reference bundle's checkbox/);
  });
});
