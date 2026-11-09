import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";

// Session-203 (R-1, the security ledger — the plan v2 cure for F-203a): the
// pre-ship `bun audit` doctrine, ported from the neo-crm s164/s198 lineage.
// The census at session 203: 10 advisories (4 high / 5 moderate / 1 low),
// ALL dev-toolchain, ZERO runtime chains. The one advisory that NAMES a
// runtime dependency — GHSA-mrhx-c7xc-m3w5, "Zod can exhaust memory while
// validating oversized constrained collections", vulnerable range zod<4.6.6 —
// resolves ONLY through the nested dev copy under
// eslint-config-next › eslint-plugin-react-hooks (its own zod 3.x); the
// RUNTIME zod the app imports is ^4.6.7 (safe). These pins make that state
// a contract instead of an accident:
//
//   1. The runtime-zod floor pin — resolve the zod module the app actually
//      imports and assert its version >= the advisory floor. A downgrade or
//      a resolution drift of the runtime dep trips this RED.
//   2. The PAD census pin — the §10 advisories row must carry the recorded
//      census, so the ledger cannot silently rot between re-triages.
//
// The re-triage duty itself (re-run `bun audit` before every push; a NEW
// runtime-chain advisory is cured same-session, never deferred) lives in
// AGENTS.md's gate discipline — operators read it there.
//
// Session-213 (R-9, the prisma 6→7 major): the census moved 2 → 1 —
// the deepmerge-ts HIGH cured by taking the ORM major (@prisma/config
// 7.x carries deepmerge-ts 8.0.2; every 6.x stable exact-pins the
// vulnerable 7.1.5), with the bun-compatibility decode recorded in the
// PAD §10 row (prisma 7's better-sqlite3 adapter is hard-blocked under
// bun — oven-sh/bun#4290 — so the runtime chain is PrismaLibSql). The
// one that remains is UNREACHABLE within its parent's range: minimatch
// (typescript-estree pins ^10.2.2; the fix is 11.0.1) — the PAD §10 row
// below carries the live census and its decode.

// The GHSA-mrhx-c7xc-m3w5 vulnerable range is zod < 4.6.6 — the floor the
// runtime resolution must clear.
const ZOD_ADVISORY_FLOOR = "4.6.6";

const require = createRequire(import.meta.url);

function resolvedRuntimeZodVersion(): string {
  // Resolve the module specifier the app's own imports use ("zod"), then
  // walk up to the owning package — this reads the RESOLUTION the app gets,
  // not just the first copy on disk (the s198 nested-copy lesson).
  const entry = require.resolve("zod");
  let dir = path.dirname(entry);
  while (!existsSync(path.join(dir, "package.json"))) {
    const parent = path.dirname(dir);
    if (parent === dir) {
      throw new Error(`no package.json above the resolved zod entry: ${entry}`);
    }
    dir = parent;
  }
  const pkg = JSON.parse(readFileSync(path.join(dir, "package.json"), "utf-8")) as {
    name?: string;
    version?: string;
  };
  if (pkg.name !== "zod" || typeof pkg.version !== "string") {
    throw new Error(`unexpected package resolved for "zod": ${pkg.name}@${pkg.version}`);
  }
  return pkg.version;
}

// Minimal numeric x.y.z compare (no semver dep — keep the test
// self-contained; prerelease tags are out of scope for the runtime dep,
// which ships plain versions).
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

const norm = (s: string): string => s.replace(/\s+/g, " ");

describe("session-203: the security ledger (R-1 — the bun audit doctrine has teeth)", () => {
  it("the RUNTIME zod resolution clears the GHSA-mrhx-c7xc-m3w5 floor (zod >= 4.6.6)", () => {
    const version = resolvedRuntimeZodVersion();
    // The known-offender check: the nested lint-chain copy is zod 3.x — if
    // the RUNTIME resolution ever lands there, this fails loudly with the
    // evidence in the message.
    expect(
      versionAtLeast(version, ZOD_ADVISORY_FLOOR),
      `runtime zod@${version} is inside the vulnerable range (< ${ZOD_ADVISORY_FLOOR}, GHSA-mrhx-c7xc-m3w5)`,
    ).toBe(true);
  });

  it("the PAD §10 advisories row carries the recorded census (the ledger cannot rot silently)", () => {
    const pad = norm(
      readFileSync(path.resolve(import.meta.dirname, "..", "Project_Architecture_Document.md"), "utf-8"),
    );
    // Session-213 (R-9): the census re-anchored 2 → 1 after the prisma
    // 6→7 major cured the deepmerge-ts HIGH (the ORM major carried
    // @prisma/config's own fix). The remaining one is range-unreachable —
    // the row must keep saying so.
    expect(pad).toContain("1 advisory: 0 high / 1 moderate — all dev-toolchain, zero runtime chains");
    expect(pad).toContain("GHSA-g3hv-75wg-m249");
    expect(pad).toContain("Re-triage: re-run `bun audit` before every push");
  });
});
