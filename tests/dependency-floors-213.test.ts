import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-213 (R-9, the prisma 6→7 major migration — the plan v2.10.0 cure
// for F-213a): the R-8 ledger left deepmerge-ts as "range-unreachable"
// (@prisma/config exact-pins 7.1.5, the fix is 8.0.0) — but that decode
// was only true INSIDE the 6.x line. @prisma/config 7.x moved the
// dependency to deepmerge-ts 8.0.2 (the GHSA-ggr8-5vv4-36mx fixed
// version), and the 6.x line ended at 6.19.3. The HIGH advisory is cured
// by taking the ORM major. These pins make the cured state a contract
// instead of an accident, reading bun.lock (the resolution record
// `bun audit` itself walks — the dependency-floors-212 idiom):
//
//   1. The deepmerge-ts floor — EVERY resolution >= 8.0.0, outside
//      GHSA-ggr8-5vv4-36mx ("DeepmergeTS has stack exhaustion when
//      merging recursive object graphs"). The prisma 7 CLI chain is the
//      only consumer; a prisma downgrade re-opens it.
//   2. The prisma major — EVERY prisma / @prisma/client resolution on
//      the 7.x line. The major itself is the contract: 6.x carries the
//      vulnerable @prisma/config forever, and 8.x is still RC.
//   3. The runtime adapter chain — the prisma-client generator's client
//      REQUIRES a driver adapter; @prisma/adapter-libsql (with its
//      @libsql/client peer) must be resolved in the tree. libsql, not
//      the upgrade guide's better-sqlite3: bun hard-blocks better-sqlite3's
//      constructor (oven-sh/bun#4290) and this repo runs every process
//      under bun — the libsql NAPI binding is the bun-compatible SQLite
//      driver.
//
// What this pin deliberately does NOT assert: minimatch (typescript-estree
// pins ^10.2.2; the GHSA-g3hv-75wg-m249 fix needs 11.0.1 — still
// unreachable) — the lone PAD §10 deferral, re-triaged per the AGENTS
// pre-push duty.

// The advisory floor + the major line (the fixed-in versions the
// resolutions must clear).
const DEEPMERGE_TS_FLOOR = "8.0.0";
const PRISMA_MAJOR = 7;
const LIBSQL_CLIENT_PEER_FLOOR = "0.17.0";

const LOCKFILE_PATH = path.resolve(import.meta.dirname, "..", "bun.lock");
const lockfileRaw = readFileSync(LOCKFILE_PATH, "utf-8");

// bun.lock is JSON with trailing commas (bun's own format) — the
// dependency-floors-212 conservative strip (a comma immediately before a
// closing brace/bracket, possibly across whitespace; no lockfile string
// can contain that sequence).
const lockfile = JSON.parse(lockfileRaw.replace(/,(\s*[}\]])/g, "$1")) as {
  workspaces?: Record<string, { name?: string }>;
  packages?: Record<string, unknown>;
};

// Minimal numeric x.y.z compare (the security-ledger pin's self-contained
// idiom; prerelease tags are out of scope for these plain versions).
function versionAtLeast(actual: string, floor: string): boolean {
  const a = actual.split(".").map((p) => Number.parseInt(p, 10));
  const f = floor.split(".").map((p) => Number.parseInt(p, 10));
  for (let i = 0; i < Math.max(a.length, f.length); i += 1) {
    const av = a[i] ?? 0;
    const fv = f[i] ?? 0;
    if (av > fv) return true;
    if (av < fv) return false;
  }
  return true;
}

function majorOf(version: string): number {
  return Number.parseInt(version.split(".")[0] ?? "0", 10);
}

// Collect every resolved version of a package across the whole lockfile,
// including nested resolutions. The resolution record is the array's
// first element, "name@version" (the dependency-floors-212 idiom).
function resolvedVersions(packageName: string): Map<string, string> {
  const found = new Map<string, string>();
  for (const [key, value] of Object.entries(lockfile.packages ?? {})) {
    if (!Array.isArray(value) || typeof value[0] !== "string") continue;
    const spec = value[0];
    if (!spec.startsWith(`${packageName}@`)) continue;
    const version = spec.slice(packageName.length + 1);
    if (version.length > 0) found.set(key, version);
  }
  return found;
}

describe("session-213: the prisma-7 dependency floors (R-9 — the cured major is a contract)", () => {
  it("every deepmerge-ts resolution in bun.lock clears the GHSA-ggr8-5vv4-36mx floor (>= 8.0.0)", () => {
    expect(
      Object.keys(lockfile.packages ?? {}).length,
      "bun.lock carries no packages section — malformed lockfile?",
    ).toBeGreaterThan(0);
    const resolutions = resolvedVersions("deepmerge-ts");
    // The prisma CLI chain must actually carry it — an empty map must
    // never pass silently.
    expect(resolutions.size, "no deepmerge-ts resolution found in bun.lock").toBeGreaterThan(0);
    for (const [key, version] of resolutions) {
      expect(
        versionAtLeast(version, DEEPMERGE_TS_FLOOR),
        `${key} resolves deepmerge-ts@${version}, inside the vulnerable range (< ${DEEPMERGE_TS_FLOOR}, GHSA-ggr8-5vv4-36mx)`,
      ).toBe(true);
    }
  });

  it("every prisma and @prisma/client resolution is on the 7.x line (the major that carries the cure)", () => {
    for (const packageName of ["prisma", "@prisma/client"]) {
      const resolutions = resolvedVersions(packageName);
      expect(
        resolutions.size,
        `no ${packageName} resolution found in bun.lock`,
      ).toBeGreaterThan(0);
      for (const [key, version] of resolutions) {
        expect(
          majorOf(version) === PRISMA_MAJOR,
          `${key} resolves ${packageName}@${version} — the migration contract is the 7.x line (a 6.x regression re-opens GHSA-ggr8-5vv4-36mx; 8.x is RC)`,
        ).toBe(true);
      }
    }
  });

  it("the runtime adapter chain is resolved: @prisma/adapter-libsql (7.x) + @libsql/client (>= 0.17.0, the adapter's peer floor)", () => {
    const adapters = resolvedVersions("@prisma/adapter-libsql");
    expect(adapters.size, "no @prisma/adapter-libsql resolution found in bun.lock").toBeGreaterThan(0);
    for (const [key, version] of adapters) {
      expect(
        majorOf(version) === PRISMA_MAJOR,
        `${key} resolves @prisma/adapter-libsql@${version} — the adapter must track the prisma 7 line`,
      ).toBe(true);
    }
    const drivers = resolvedVersions("@libsql/client");
    expect(drivers.size, "no @libsql/client resolution found in bun.lock").toBeGreaterThan(0);
    for (const [key, version] of drivers) {
      expect(
        versionAtLeast(version, LIBSQL_CLIENT_PEER_FLOOR),
        `${key} resolves @libsql/client@${version}, below the adapter's peer floor (^0.17.0)`,
      ).toBe(true);
    }
    // The bun-blocked driver must NOT ride the tree (oven-sh/bun#4290:
    // bun hard-blocks better-sqlite3's constructor — its presence would
    // be a dead-end runtime chain, not a fallback).
    expect(
      resolvedVersions("better-sqlite3").size,
      "better-sqlite3 must not be resolved in bun.lock — bun blocks it (oven-sh/bun#4290)",
    ).toBe(0);
  });
});
