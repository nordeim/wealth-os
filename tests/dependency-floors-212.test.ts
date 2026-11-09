import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-212 (R-8, the dependency round — the plan v2.9.0 cure for F-212b,
// plus the F-212a lockfile-identity residue the round's audit found): the
// ledger's standing deferral said "10 advisories, all dev-toolchain" — but
// 8 of the 10 were curable WITHIN the existing semver ranges all along; the
// lockfile had simply never been re-resolved. These pins make the cured
// floors a contract instead of an accident, reading bun.lock (the
// resolution record `bun audit` itself walks):
//
//   1. The zod floor — EVERY zod resolution >= 4.6.6 (GHSA-mrhx-c7xc-m3w5,
//      "Zod can exhaust memory while validating oversized constrained
//      collections"). The runtime copy was already 4.6.7 (the session-203
//      R-1 floor pin guards that one); the NESTED copy under
//      eslint-plugin-react-hooks resolved 4.6.5 — one patch inside the
//      vulnerable range — because the parent range
//      "^3.25.0 || ^4.0.0" had never been re-resolved since the scaffold.
//   2. The vite floor — EVERY vite resolution >= 8.3.3, outside the
//      advisory window 8.3.0–8.3.2 that carried six advisories (the three
//      Vite GHSAs plus the launch-editor trio attributed to the same
//      window). Reaches us only through vitest's dev chain.
//   3. The source-map-js floor — EVERY resolution >= 1.2.2
//      (GHSA-68fv-2mgg-jv7q, event-loop DoS through indexed source-map
//      section offsets; postcss's ^1.2.1 range admits the fix).
//   4. The lockfile identity (F-212a — the F-211a sibling): the root
//      workspace block still carried the scaffold-era "activity-map" name
//      because bun only rewrites the workspaces mirror when resolutions
//      change — and session 211's cure changed none. No scaffold-era name
//      may survive in the lockfile.
//
// What these pins deliberately do NOT assert: minimatch (typescript-estree
// pins ^10.2.2; the GHSA-g3hv-75wg-m249 fix needs 11.0.1 — unreachable
// until typescript-eslint bumps it) and deepmerge-ts (@prisma/config
// exact-pins 7.1.5 — unreachable until a prisma release). Those two stay
// the PAD §10 ledger's documented deferral, re-triaged per the AGENTS
// pre-push duty.

// The advisory floors (the fixed-in versions the resolutions must clear).
const ZOD_FLOOR = "4.6.6";
const VITE_FLOOR = "8.3.3";
const SOURCE_MAP_JS_FLOOR = "1.2.2";

const LOCKFILE_PATH = path.resolve(import.meta.dirname, "..", "bun.lock");
const lockfileRaw = readFileSync(LOCKFILE_PATH, "utf-8");

// bun.lock is JSON with trailing commas (bun's own format) — strip them
// before parsing. The idiom is deliberately conservative: only a comma
// immediately before a closing brace/bracket (possibly across whitespace)
// is removed, so no comma inside a string literal can be touched (a string
// containing ",}" would need a quote-aware parser; no package name, spec,
// or hash in a lockfile can contain that sequence).
const lockfile = JSON.parse(lockfileRaw.replace(/,(\s*[}\]])/g, "$1")) as {
  workspaces?: Record<string, { name?: string }>;
  packages?: Record<string, unknown>;
};

// Minimal numeric x.y.z compare (no semver dep — the security-ledger pin's
// self-contained idiom; prerelease tags are out of scope for these plain
// dev-toolchain versions).
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

// Collect every resolved version of a package across the whole lockfile,
// including nested resolutions (the "eslint-plugin-react-hooks/zod"-style
// keys). The resolution record is the array's first element, "name@version".
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

function expectEveryResolutionClearsFloor(
  packageName: string,
  floor: string,
  advisory: string,
): void {
  const resolutions = resolvedVersions(packageName);
  // A package with zero resolutions means the dep left the tree entirely —
  // also a pass (nothing vulnerable remains). Guard against a silent empty
  // map from a malformed lockfile by requiring the parse to have seen the
  // packages section at all.
  expect(Object.keys(lockfile.packages ?? {}).length, "bun.lock carries no packages section — malformed lockfile?").toBeGreaterThan(0);
  for (const [key, version] of resolutions) {
    expect(
      versionAtLeast(version, floor),
      `${key} resolves ${packageName}@${version}, inside the vulnerable range (< ${floor}, ${advisory})`,
    ).toBe(true);
  }
}

describe("session-212: the dependency floors (R-8 — the cured advisory resolutions are a contract)", () => {
  it("every zod resolution in bun.lock clears the GHSA-mrhx-c7xc-m3w5 floor (>= 4.6.6) — including the nested eslint-plugin-react-hooks copy", () => {
    expectEveryResolutionClearsFloor("zod", ZOD_FLOOR, "GHSA-mrhx-c7xc-m3w5");
    // The known-offender census: the tree must actually carry zod (the
    // runtime dep) — an empty resolution map must never pass silently.
    expect(resolvedVersions("zod").size, "no zod resolution found in bun.lock").toBeGreaterThan(0);
  });

  it("every vite resolution in bun.lock is outside the 8.3.0–8.3.2 advisory window (>= 8.3.3 — the six-advisory block incl. the launch-editor trio)", () => {
    expectEveryResolutionClearsFloor("vite", VITE_FLOOR, "GHSA-9jrq-w75r-8gcw & the 8.3.0–8.3.2 window");
  });

  it("every source-map-js resolution in bun.lock clears the GHSA-68fv-2mgg-jv7q floor (>= 1.2.2)", () => {
    expectEveryResolutionClearsFloor("source-map-js", SOURCE_MAP_JS_FLOOR, "GHSA-68fv-2mgg-jv7q");
    expect(resolvedVersions("source-map-js").size, "no source-map-js resolution found in bun.lock").toBeGreaterThan(0);
  });

  it("the lockfile's root workspace identity is wealth-os — no scaffold-era names survive (F-212a, the F-211a sibling)", () => {
    const rootName = lockfile.workspaces?.[""]?.name;
    expect(rootName, "bun.lock workspaces root name").toBe("wealth-os");
    // The scaffold-era identities may not survive anywhere in the file —
    // "activity-map" (the lockfile's never-re-keyed mirror name) and
    // "neo-crm" (the manifest name F-211a cured).
    expect(lockfileRaw).not.toContain("activity-map");
    expect(lockfileRaw).not.toContain("neo-crm");
  });
});
