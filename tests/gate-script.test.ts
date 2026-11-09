import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-38 pins (S38-P6): the gate umbrella script. The documented
// gate order (AGENTS.md "Gate order before every push") was manual —
// five commands run by hand in order, with the known hazard that
// `test:e2e` does not depend on `build` (a leftover standalone server
// on :3100 silently tests STALE code, per the deferred ledger's N7).
// The `gate` script encodes the order in one command.
//
// Session-39 correction (S39-P1): chaining `build` before `test:e2e`
// does NOT by itself guarantee the fresh tree — playwright.config's
// `reuseExistingServer: !process.env.CI` reuses a leftover :3100
// listener regardless of build timing (a running process holds the OLD
// code in memory while the rebuild swaps static assets underneath).
// The gate's e2e step therefore runs with `CI=1`, which forces
// `reuseExistingServer: false`: the gate ALWAYS boots a fresh server
// from the just-built tree and kills it on exit. Plain `bun run
// test:e2e` keeps the reuse ergonomics for iteration.

const pkg = JSON.parse(
  readFileSync(path.resolve(import.meta.dirname, "..", "package.json"), "utf-8"),
) as {
  scripts?: Record<string, string>;
  name?: string;
  description?: string;
};

describe("session-38: the gate umbrella script (S38-P6)", () => {
  it("package.json ships a `gate` script", () => {
    expect(typeof pkg.scripts?.gate).toBe("string");
    expect(pkg.scripts!.gate.length).toBeGreaterThan(0);
  });

  it("the chain is lint → typecheck → test → build → smoke → CI=1 test:e2e (the AGENTS.md order — session-170 inserts the §13.4/§14 smoke leg between build and e2e)", () => {
    const steps = pkg.scripts!.gate.split("&&").map((s) => s.trim());
    expect(steps).toEqual([
      "bun run lint",
      "bun run typecheck",
      "bun run test",
      "bun run build",
      "./scripts/smoke-test.sh",
      "CI=1 bun run test:e2e",
    ]);
  });

  it("the build step precedes the e2e boot (the no-build hazard, closed in-script)", () => {
    expect(pkg.scripts!.gate.indexOf("bun run build")).toBeLessThan(
      pkg.scripts!.gate.indexOf("bun run test:e2e"),
    );
  });
});

describe("session-39: the gate's fresh-boot guarantee (S39-P1)", () => {
  it("the e2e step runs with CI=1 so a leftover :3100 server is never reused", () => {
    // reuseExistingServer: !process.env.CI in playwright.config.ts —
    // under CI=1 the gate always boots the just-built standalone
    // server (and kills it on exit). Without the prefix, a leftover
    // listener would serve STALE in-memory code through the whole e2e
    // leg — the s38 "closed the stale-server class" claim was false
    // in exactly this scenario.
    expect(pkg.scripts!.gate).toMatch(/CI=1\s+bun run test:e2e/);
  });

  it("plain `test:e2e` keeps the reuse ergonomics (the prefix lives only in the gate)", () => {
    // The iteration workflow (bun run test:e2e against an
    // already-running server) is documented local ergonomics — the
    // CI=1 prefix must not leak into the standalone script.
    expect(pkg.scripts!["test:e2e"]).toBe("playwright test");
  });
});

describe("session-39: the lint warning enforcement (S39-P6)", () => {
  it("the lint script fails on warnings (--max-warnings 0) — the documented 0/0 standard is load-bearing", () => {
    // `eslint .` exits 0 on warnings; every doc says "lint 0/0" as the
    // gate standard, but nothing enforced it. The flag makes the
    // convention a contract.
    expect(pkg.scripts!.lint).toMatch(/--max-warnings\s+0/);
  });
});

describe("session-69: the E2E_PORT single source (N-69g)", () => {
  // The 69-c rotation's find: the "3100" default was hardcoded TWICE —
  // playwright.config.ts (Number(process.env.E2E_PORT ?? 3100)) and the
  // crm.spec 401 probe (process.env.E2E_PORT ?? "3100") — so a default
  // change in one place silently sends the probe at a dead port. The
  // fix: tests/e2e/e2e-port.ts owns the default + the env resolution;
  // both consumers import it (the S68-P4 constant-wiring class).
  function stripComments(src: string): string {
    return src
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "");
  }
  function read(rel: string): string {
    const p = path.resolve(import.meta.dirname, "..", rel);
    return existsSync(p) ? readFileSync(p, "utf-8") : "";
  }

  it("the 3100 default lives exactly once (in e2e-port.ts) and both consumers import it", () => {
    const port = stripComments(read("tests/e2e/e2e-port.ts"));
    expect(port).toContain('"3100"');
    const config = stripComments(read("playwright.config.ts"));
    const spec = stripComments(read("tests/e2e/wealthos.spec.ts"));
    // neither consumer carries the literal anymore
    expect(config).not.toContain("?? 3100");
    expect(spec).not.toContain('?? "3100"');
    // both consume the shared module
    expect(config).toMatch(/e2e-port/);
    expect(spec).toMatch(/e2e-port|BASE_URL/);
  });
});

describe("session-97 (S97-P3): the gate:full composite — the drift gate promoted into the CI chain", () => {
  // The s96 suggested next #3: the standing `gate` chain proves the
  // code, but the PARITY regression (a page drifting from its standing
  // screenshot genus) only fails inside `bun run sweep -- --fail-on-drift`.
  // `gate:full` chains the standing gate + the three walked viewport
  // classes so the one command proves code AND parity.
  it("package.json ships a `gate:full` script", () => {
    expect(typeof pkg.scripts?.["gate:full"]).toBe("string");
    expect(pkg.scripts!["gate:full"].length).toBeGreaterThan(0);
  });

  it("gate:full = the standing gate chain (with the s170 smoke leg) + the SIX drift gates (desktop, phone 390, tablet 768, landscape 1024 — the s99 fourth sweep — + the s149 FULLPAGE landing gate + the s152 INTERIOR census gate)", () => {
    const steps = pkg.scripts!["gate:full"].split("&&").map((s) => s.trim());
    expect(steps).toEqual([
      "bun run lint",
      "bun run typecheck",
      "bun run test",
      "bun run build",
      "./scripts/smoke-test.sh",
      "CI=1 bun run test:e2e",
      "bun run sweep -- --fail-on-drift",
      "bun run sweep -- --width 390 --height 844 --fail-on-drift",
      "bun run sweep -- --width 768 --height 1024 --fail-on-drift",
      "bun run sweep -- --width 1024 --height 768 --fail-on-drift",
      // s149 (F-149c3): the FIFTH gate — the below-the-fold landing axis
      // (the full-page capture pair the owner's skill motivated; the
      // four viewport sweeps structurally clip at y≈900)
      "bun run sweep:fullpage -- --fail-on-drift",
      // s152 (the 152-c rotation): the SIXTH gate — the interior
      // full-geometry census (the L-151c2 dead-zone cure: the five
      // pixel gates clip at their capture height; the census walks
      // every element inside main.overflow-auto at 390×844)
      // s158 (the 158-c rotation): the census leg runs the probe-validated
      // concurrency — the four axis walks CONCURRENTLY (logins staggered);
      // the six-gate chain stays six commands
      "bun run census:interior -- --fail-on-drift --parallel 4",
    ]);
  });

  it("the plain `gate` carries the smoke leg (session-170: the §14 order — build → smoke → e2e)", () => {
    expect(pkg.scripts!.gate).toBe(
      "bun run lint && bun run typecheck && bun run test && bun run build && ./scripts/smoke-test.sh && CI=1 bun run test:e2e",
    );
  });

  it("every drift gate in gate:full carries --fail-on-drift (a report-only gate would gate nothing)", () => {
    const gates = pkg.scripts!["gate:full"]
      .split("&&")
      .map((s) => s.trim())
      .filter((s) => /^(bun run sweep|bun run census)/.test(s));
    expect(gates.length).toBe(6); // the four viewport sweeps + the s149 fullpage gate + the s152 interior census gate
    for (const s of gates) expect(s).toContain("--fail-on-drift");
  });
});

describe("session-201 (D-201c): no scaffold-era brand strings in the rendered tree", () => {
  // The WealthOS transformation (session 199) rebuilt every page, but
  // the reset-password card's subtitle still greeted users with "NEO
  // CRM" — the scaffold's product name, live in the rendered UI. The
  // lowercase identifiers (neo_session, NEO_PROXY_HOPS, the
  // neo-crm-prefixed localStorage/secret constants) are documented
  // scaffold legacy; the HUMAN-READABLE brand is not. Historical
  // comments keep the name (they are session records); rendered
  // strings may not carry it. The scan walks the whole src/ tree with
  // comments stripped — the N-69g stripComments idiom — so the class
  // (any future paste wearing the old brand) trips a RED here, not a
  // user's screenshot.
  const stripBrandComments = (src: string): string =>
    src
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "");

  const walkSources = (dir: string): string[] => {
    const files: string[] = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) files.push(...walkSources(p));
      else if (/\.(ts|tsx)$/.test(entry.name)) files.push(p);
    }
    return files;
  };

  it("no .ts/.tsx source renders the NEO CRM product name", () => {
    const srcDir = path.resolve(import.meta.dirname, "..", "src");
    const offenders: string[] = [];
    for (const file of walkSources(srcDir)) {
      const stripped = stripBrandComments(readFileSync(file, "utf8"));
      if (/(NEO|Neo)\s+CRM/.test(stripped)) {
        offenders.push(path.relative(srcDir, file));
      }
    }
    expect(offenders, `brand-string offenders: ${offenders.join(", ")}`).toEqual([]);
  });
});

describe("session-211 (F-211a): the package manifest carries the WealthOS identity", () => {
  // The D-201c brand scan polices the RENDERED tree; the manifest itself
  // escaped it — package.json still introduced the repo as "neo-crm" with
  // the CRM description two full product generations after the WealthOS
  // transformation. The scaffold-heritage IDENTIFIERS that AGENTS.md
  // documents as intentional (neo_session, NEO_PROXY_HOPS, the dev-secret
  // constant) survive; the product NAME in the manifest is identity, not
  // identifier — it is what every tool, lockfile, and npm/Bun surface
  // prints as the project. The pin keeps it honest.
  it("package.json name is wealth-os (the product identity, not the scaffold's)", () => {
    expect(pkg.name).toBe("wealth-os");
  });

  it("package.json describes the finance domain (no CRM description)", () => {
    expect(pkg.description).toMatch(/personal-finance|finance/i);
    expect(pkg.description).not.toMatch(/CRM/i);
  });
});
