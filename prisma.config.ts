// Prisma CLI configuration (R-9, session 213 — the prisma 7 migration).
//
// In prisma 7 the CLI's config home moved here from the schema's env()
// wiring and package.json: the datasource URL, the schema path, and the
// seed command all live in this file. Two load-bearing choices:
//
//   • the URL routes through resolveDatabaseUrl — the SAME db-path seam
//     the app, the seed, and the prisma-env wrapper use (src/lib/
//     db-path.ts, pinned by tests/db-path.test.ts). The v6 schema rule
//     resolved a relative `file:` URL against prisma/schema.prisma; the
//     v7 config passes the URL through as-given, which would hand a
//     relative URL to the CLI's CWD rule. The seam re-anchors every
//     relative reference on the validated repo root so no invocation
//     pattern can land the database outside <repo>/db/.
//   • dotenv loads the repo .env for node-run invocations (bun loads it
//     natively). dotenv never overrides an already-set variable, so the
//     wrapper's absolute DATABASE_URL (scripts/prisma-env.ts) and the
//     e2e global-setup's absolute pin always win.
//
// `prisma db push` / `migrate` read datasource.url from here; the runtime
// client does NOT (it gets its adapter from src/lib/db.ts).

import "dotenv/config";
import { defineConfig } from "prisma/config";
import { resolveDatabaseUrl } from "./src/lib/db-path";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: resolveDatabaseUrl(process.env.DATABASE_URL ?? "file:../db/custom.db"),
  },
  migrations: {
    seed: "bun prisma/seed.ts",
  },
});
