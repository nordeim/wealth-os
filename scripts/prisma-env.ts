// Prisma CLI wrapper: pins DATABASE_URL to the repo contract before
// spawning the CLI.
//
// Why this exists (R-1 remediation, pinned by tests/db-path.test.ts):
//   • bun loads the repo .env for every `bun run`/`bun x` process AND
//     rewrites a relative `file:` DATABASE_URL into an absolute path
//     resolved against the .env file's own directory — with the mandated
//     contract DATABASE_URL="file:../db/custom.db" that lands one
//     directory OUTSIDE the repo.
//   • a raw relative URL handed to the Prisma engine is resolved against
//     the process CWD — same wrong place.
// The shared resolver (src/lib/db-path.ts, runtimeDatabaseUrl) re-anchors
// everything on the Prisma-CLI schema rule, so `bun run db:push` creates
// <repo>/db/custom.db — the same file `next dev` and the standalone
// server use. A caller-provided DATABASE_URL that differs from bun's
// signature (e.g. a postgres URL) is respected.
//
// Run: bun scripts/prisma-env.ts <prisma args…>
//   e.g. bun scripts/prisma-env.ts db push --accept-data-loss

import { spawnSync } from "node:child_process";
import path from "node:path";
import { runtimeDatabaseUrl } from "../src/lib/db-path";

function main(): void {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("usage: bun scripts/prisma-env.ts <prisma args…>");
    process.exit(2);
  }

  const result = spawnSync(process.execPath, ["x", "prisma", ...args], {
    stdio: "inherit",
    env: { ...process.env, DATABASE_URL: runtimeDatabaseUrl() },
  });
  process.exit(result.status ?? 1);
}

// Only take over the process when executed directly (not when imported by
// the Vitest suite). Session-215 (R-12, F-215l): the EXACT basename form
// (the F-210c lesson — a suffix form is a guard a sibling's filename can
// satisfy; the four capture tools took this form at session 210).
const invokedAsScript =
  process.argv[1] !== undefined &&
  path.basename(process.argv[1]) === "prisma-env.ts";
if (invokedAsScript) main();
