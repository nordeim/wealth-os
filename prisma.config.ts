// Prisma CLI configuration (R-9, session 213 — the prisma 7 migration).
//
// In prisma 7 the CLI's config home moved here from the schema's env()
// wiring and package.json: the datasource URL, the schema path, and the
// seed command all live in this file. Two load-bearing choices:
//
//   • the URL routes through runtimeDatabaseUrl — the SAME signature-
//     aware db-path seam the app's db singleton, the seed, and the
//     prisma-env wrapper use (src/lib/db-path.ts, pinned by
//     tests/db-path.test.ts). Session-251 (R-48, F-251b): the previous
//     direct resolveDatabaseUrl(process.env…) form passed bun's
//     ABSOLUTIZED DATABASE_URL through untouched — under bun a relative
//     `file:../db/custom.db` from the .env is rewritten against the
//     .env file's own directory to file:/<parent-of-repo>/db/custom.db,
//     so a direct `bun x prisma db push` (or migrate/studio) operated on
//     a MIRROR db one directory outside the repo while the app served
//     the repo db (live-probed). runtimeDatabaseUrl detects exactly that
//     signature and re-anchors on the schema rule, while honoring every
//     intentional override (the wrapper's absolute URL, a postgres URL,
//     the e2e suite's absolute db/e2e.db pin — its global-setup builds
//     the absolute form at runtime) — no invocation pattern can
//     land the database outside <repo>/db/.
//   • dotenv loads the repo .env for node-run invocations (bun loads it
//     natively). dotenv never overrides an already-set variable, so the
//     wrapper's absolute DATABASE_URL (scripts/prisma-env.ts) and the
//     e2e global-setup's absolute pin always win.
//
// `prisma db push` / `migrate` read datasource.url from here; the runtime
// client does NOT (it gets its adapter from src/lib/db.ts).

import "dotenv/config";
import { defineConfig } from "prisma/config";
import { runtimeDatabaseUrl } from "./src/lib/db-path";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: runtimeDatabaseUrl(),
  },
  migrations: {
    seed: "bun prisma/seed.ts",
  },
});
