import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-53 pins (S53-P2, N-53b): the census seam. A raw
// `new PrismaClient()` run from the repo root opens the SANDBOX-ROOT
// mirror db — not the repo's — under BOTH node (the relative `file:` URL
// resolves against the process CWD, not the schema dir) and bun (which
// additionally absolutizes the .env value against the .env location).
// Session-53 proved it live: the orchestrator's own intake census read
// the mirror (it carries the s51 zombie server's probe event), briefly
// misread it as repo-db residue, and only `PRAGMA database_list` exposed
// the engine's true file — the repo db was pristine all along. The
// systemic closure: DB censuses go through the app's own client
// (`src/lib/db` — the SAME singleton the running server uses,
// re-anchored by runtimeDatabaseUrl) and PRINT the resolved path, so a
// count is always bound to a named file.
// scripts/census.ts is that census, wired as `bun run db:census`.

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : null;
}

function stripComments(src: string) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const census = () => stripComments(read("scripts/census.ts") ?? "");
const pkg = () => JSON.parse(read("package.json") ?? "{}") as {
  scripts?: Record<string, string>;
};

describe("session-53: the census seam (S53-P2, N-53b)", () => {
  it("scripts/census.ts exists and counts through the app's db singleton — never a raw PrismaClient", () => {
    const src = census();
    expect(src.length).toBeGreaterThan(0);
    // The whole point of the seam: the census uses the SAME client the
    // app uses (src/lib/db re-anchors through runtimeDatabaseUrl), so it
    // can never be misdirected at a mirror db by ambient env.
    expect(src).toMatch(/from "\.\.\/src\/lib\/db"/);
    expect(src).not.toMatch(/new PrismaClient/);
  });

  it("prints the resolved database URL — a count without its path is not evidence", () => {
    const src = census();
    expect(src).toMatch(/runtimeDatabaseUrl/);
    // The URL is surfaced to the operator (console.log), not just used
    // internally. Session-54 strengthening (N-54e): pin the ACTUAL print
    // form — the s53 pin only asserted any console call, so deleting the
    // `database: ${url}` line while keeping the counts log would have
    // passed (the count-without-path regression the seam exists to close).
    expect(src).toMatch(/`database: \$\{url\}`/);
  });

  it("the MATCH banner derives from EXPECTED — no hardcoded count literal (N-54d)", () => {
    // Session-54 (S54-P3): the banner duplicated EXPECTED as a literal
    // ("15/24/10/23/12 + 4 users") — a future EXPECTED re-sync would
    // leave the printed contract silently stale. The banner now derives
    // from the EXPECTED table; comment-stripped source carries no
    // hardcoded count run.
    expect(census()).not.toMatch(/15\/24\/10\/23\/12/);
  });

  it("carries the seed-contract expectations and fails on drift (the N-53a guard)", () => {
    const src = census();
    // The prisma/seed.ts row counts: the STATIC entities pinned exactly
    // (incomeSources / bankAccounts / investments / goals / users), and
    // transactions BOUNDED (54..108) — the generator is date-dependent by
    // design (never seeds the future; deterministic occasional-row skips),
    // so a scalar would drift on every reseed. Plus a non-zero exit on
    // mismatch — the probe-residue check.
    expect(src).toMatch(/transactions:\s*\{\s*min:\s*54,\s*max:\s*108\s*\}/);
    expect(src).toMatch(/incomeSources:\s*4/);
    expect(src).toMatch(/bankAccounts:\s*3/);
    expect(src).toMatch(/investments:\s*6/);
    expect(src).toMatch(/goals:\s*5/);
    expect(src).toMatch(/users:\s*1/);
    expect(src).toMatch(/process\.exit\(1\)/);
  });

  it("the db:census package script is wired", () => {
    expect(pkg().scripts?.["db:census"]).toBe("bun scripts/census.ts");
  });
});
