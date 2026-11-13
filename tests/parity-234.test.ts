import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-234 (R-31): the source-tier pins for the in-flight-guard,
// OTP-restart, and logout-gate round. Every pin was born RED over the
// pre-cure tree (the F-234 ledger rows in docs/remediation_plan_v2.md
// carry the verified evidence). Source-scanning contracts per the house
// convention: read the file, assert the contract.

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// ---- F-234a: the settings-fetch tri-state ----------------------------------

describe("F-234a — the settings-fetch settled flag (the in-flight window is not failure)", () => {
  it("the store declares the settled flag on its state", () => {
    const src = read("src/stores/wealthos-store.ts");
    expect(src).toMatch(/settingsSettled: boolean;/);
    expect(src).toContain("settingsSettled: false,");
  });

  it("the settings fetch flips the flag in BOTH arms (the ok arm carries the slice, the failure arm flips alone)", () => {
    const src = read("src/stores/wealthos-store.ts");
    expect(src).toMatch(
      /set\(\{\s*settingsSettled: true,\s*\.\.\.\(settingsRes\.ok \? \{ settings: settingsRes\.data \} : \{\}\),\s*\}\);/,
    );
  });

  it("every hydrate cycle and the logout clear reset the flag", () => {
    const src = read("src/stores/wealthos-store.ts");
    // Session-237 (R-34, F-237c) recalibration: the entry write is
    // remount-aware — BOTH arms reset the flag (the remount arm skips
    // only the loading re-gate).
    expect(src).toMatch(
      /set\(\s*remount\s*\?\s*\{ error: null, settingsSettled: false \}\s*:\s*\{ loading: true, error: null, settingsSettled: false \},?\s*\);/,
    );
    // the logout clear block resets it beside the slice
    expect(src).toMatch(/settings: null,\s*settingsSettled: false,/);
  });

  it("the page's reason line keys on the settled flag, not the loading drop", () => {
    const src = read("src/app/(app)/settings/page.tsx");
    expect(src).toContain("!settings && store.settingsSettled");
    // the flash condition the cure retires is gone
    expect(src).not.toContain("!settings && !store.loading");
  });
});

// ---- F-234b: the import parse sequence guard -------------------------------

describe("F-234b — the import parse lands only while it is the newest parse", () => {
  it("the page carries the monotonic parse token and the in-flight flag", () => {
    const src = read("src/app/(app)/import/page.tsx");
    expect(src).toMatch(/const seq = \+\+parseSeq\.current;/);
    expect(src).toMatch(/useState[\s\S]*parsing|parsing[\s\S]*useState/);
  });

  it("the read's completion is guarded by the sequence token", () => {
    const src = read("src/app/(app)/import/page.tsx");
    expect(src).toMatch(/if \(seq !== parseSeq\.current\) return;/);
  });

  it("only the newest parse clears the in-flight flag", () => {
    const src = read("src/app/(app)/import/page.tsx");
    expect(src).toMatch(/if \(seq === parseSeq\.current\) setParsing\(false\);/);
  });

  it("the extract button is disabled inside the parse window (the retired re-parse stays retired)", () => {
    const src = read("src/app/(app)/import/page.tsx");
    expect(src).toContain("disabled={!file || busy || parsing || rows !== null}");
  });
});

// ---- F-234c: the full-code paste restart ------------------------------------

describe("F-234c — an exactly-full-length edit restarts the distribution at box 1", () => {
  it("the seam carries the restart rule", () => {
    const src = read("src/lib/verification.ts");
    expect(src).toMatch(
      /const start = digits\.length === next\.length \? 0 : idx;/,
    );
  });
});

// ---- F-234e: the uploads capacity-walk guard --------------------------------

describe("F-234e — the capacity walk's per-entry size read rides its own guard", () => {
  it("a vanished entry skips both counters instead of throwing past the envelope", () => {
    const src = read("src/lib/uploads.ts");
    // the size read and the file counter sit inside their own try
    expect(src).toMatch(
      /try \{\s*bytes \+= statSync\(join\(dir, entry\.name\)\)\.size;\s*files \+= 1;\s*\} catch \{/,
    );
  });
});

// ---- F-234f: the budget-add busy guard --------------------------------------

describe("F-234f — the budget Add button carries the busy rider", () => {
  it("the handler guards its entry and the button its window", () => {
    const src = read("src/app/(app)/settings/page.tsx");
    expect(src).toMatch(/const \[busyAdd, setBusyAdd\] = React\.useState\(false\);/);
    expect(src).toMatch(/if \(busyAdd\) return;/);
    expect(src).toContain("disabled={busyAdd}");
  });
});

// ---- F-234g: the logout gate-first order ------------------------------------

describe("F-234g — the logout content-type gate precedes the shared writes bucket", () => {
  it("the gate reads the header before the route burns a bucket slot", () => {
    const src = read("src/app/api/auth/logout/route.ts");
    const gateAt = src.indexOf('req.headers.get("content-type")');
    const bucketAt = src.indexOf("rateLimit(`writes:");
    expect(gateAt).toBeGreaterThan(-1);
    expect(bucketAt).toBeGreaterThan(-1);
    expect(gateAt).toBeLessThan(bucketAt);
  });
});

// ---- F-234h: the investments glyph joins the aria-hidden convention ---------

describe("F-234h — the investments row-delete glyph is hidden from the name", () => {
  it("the visible glyph carries the aria-hidden wrap beside its screen-reader label", () => {
    const src = read("src/app/(app)/investments/page.tsx");
    expect(src).toContain('<span aria-hidden="true">✕</span>');
  });
});

// ---- F-234i: the cascade-dead ink token retires ------------------------------

describe("F-234i — the gradient KPI card's class string drops the shadowed ink token", () => {
  it("the merge chain no longer carries the token twMerge always dropped", () => {
    const src = read("src/components/shared/page-parts.tsx");
    expect(src).toContain(
      'cn("rounded-xl border-0 shadow-2xl text-white p-6", gradient)',
    );
  });
});

// ---- F-234j: the dead-export retirement --------------------------------------

describe("F-234j — the expenses dialog and the theme resolver lose their vestigial exports", () => {
  it("the dialog stays module-local (consumed only at its own page)", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toMatch(/function ExpenseDialog\(/);
    expect(src).not.toMatch(/export function ExpenseDialog\(/);
  });

  it("the theme resolver stays module-local (consumed only by its own file)", () => {
    const src = read("src/components/layout/theme.tsx");
    expect(src).toMatch(/function resolveTheme\(/);
    expect(src).not.toMatch(/export function resolveTheme\(/);
  });
});

// ---- F-234k: the e2e status-role attribution reword --------------------------

describe("F-234k — the e2e comments name the element the locators match", () => {
  it("no spec comment attributes the status role to the visual callout", () => {
    const src = read("tests/e2e/auth.spec.ts");
    expect(src).not.toContain('InfoCallout (role="status")');
  });
});
