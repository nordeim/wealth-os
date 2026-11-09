import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-216 (R-13, F-216c/d — the client data-layer state pin): the
// store tracked `loading` and `error` from birth, but NO page consumed
// either — LoadingBlock shipped as dead code while every hard load
// flashed the misleading "No X yet" empty state, and a failed hydrate
// or Refresh was a silent no-op (refreshAll had no failure branch).
// These pins freeze the convergence: the shell owns the loading gate
// and the error banner (one seam, all nine sections covered).

const ROOT = path.resolve(import.meta.dirname, "..");
const SHELL = readFileSync(
  path.join(ROOT, "src/components/layout/app-shell.tsx"),
  "utf-8",
);
const STORE = readFileSync(
  path.join(ROOT, "src/stores/wealthos-store.ts"),
  "utf-8",
);

describe("R-13: the loading gate (F-216c — LoadingBlock gains its first consumer)", () => {
  it("the AppShell renders LoadingBlock while the store loads", () => {
    expect(SHELL).toMatch(/LoadingBlock/);
    expect(SHELL).toMatch(/loading/);
    expect(SHELL).toMatch(/hydrated/);
  });

  it("the gate lives inside the main column (the shell chrome stays mounted)", () => {
    // The sidebar/header render unconditionally; only the page content
    // swaps to the loading face.
    expect(SHELL).toMatch(/<main/);
  });

  it("the store still tracks the loading + hydrated flags the gate rides", () => {
    expect(STORE).toMatch(/hydrated: false/);
    expect(STORE).toMatch(/loading: true/);
  });
});

describe("R-13: the error face (F-216d — failures surface, retry exists)", () => {
  it("the AppShell renders the store error as an alert banner", () => {
    expect(SHELL).toMatch(/role="alert"/);
    // The shell subscribes to the store's error slice (the zustand
    // selector form — the storeError variable reads it for the banner).
    expect(SHELL).toMatch(/useWealthOs\(\(s\) => s\.error\)/);
  });

  it("the banner carries a retry affordance wired to hydrate()", () => {
    // A labeled control that re-runs the bootstrap fetch — not the
    // shell's own mount-effect call (the pre-216 false positive).
    expect(SHELL).toMatch(/role="alert"[\s\S]{0,600}hydrate\(\)/);
  });

  it("refreshAll no longer swallows failures (the else branch exists INSIDE refreshAll)", () => {
    // The pre-216 shape: refreshAll's `if (res.ok) { set({...}) }` had
    // no else — a failed refresh died silently. The hydrate function's
    // own else branches must not satisfy this pin: the failure branch
    // must live inside refreshAll itself.
    const fn = STORE.match(/async function refreshAll\([\s\S]*?\n\}/);
    expect(fn).not.toBeNull();
    expect(fn?.[0] ?? "").toMatch(/\} else \{/);
    expect(fn?.[0] ?? "").toContain("error");
  });

  it("refresh returns the Result so the Refresh buttons can toast on failure", () => {
    const fn = STORE.match(/refresh: async \(\) => \{[\s\S]*?\n    \},/);
    expect(fn).not.toBeNull();
    expect(fn?.[0] ?? "").toMatch(/return refreshAll\(/);
  });
});
