import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

// Global setup: prepare an isolated SQLite database for the E2E run
// (db/e2e.db — schema-pushed + seeded), independent of the dev database.
//
// IMPORTANT: never DELETE the db file between runs. `reuseExistingServer`
// may keep the standalone server (and its open SQLite handle) alive —
// swapping the file underneath leaves the server reading a deleted inode
// (stale data) while later clients read the fresh file. The seed script is
// idempotent IN PLACE (deleteMany + create), which every reader observes.
// NOTE: no import.meta here — Playwright loads this file as CJS.
//
// R-9 (session 213, the prisma 7 migration): two v7 cures live here.
//   • the v6 generate-skip flag on `prisma db push` was REMOVED (it now
//     errors); v7 also no longer auto-generates on push, so the flag is
//     simply gone.
//   • the v6 schema rule resolved a relative `file:` URL against
//     prisma/schema.prisma; the v7 CLI reads the URL from prisma.config.ts
//     as-given. The e2e target is therefore pinned by ABSOLUTE url — the
//     db-path seam's validated-root idiom, inlined (this file is
//     CJS-loaded, so the seam module itself — import.meta-based — cannot
//     be imported here).
//
// F-214m (session 214, discovered live during the R-10 verification):
// `--accept-data-loss` alone REFUSES a push that adds a REQUIRED column
// to a populated table (prisma 7: "Added the required column `ownerId` …
// There are N rows in this table, it is not possible to execute this
// step") — a stale-schema e2e.db killed the setup with the flag present.
// `--force-reset` recreates the schema IN PLACE (same file inode — the
// deleted-inode hazard above does not apply; every reader sees the new
// tables), making the push idempotent against ANY schema drift, not just
// data drift. The seed that follows provisions the corpus from zero.
export default function globalSetup() {
  const root = process.cwd();
  if (!existsSync(path.join(root, "prisma", "schema.prisma"))) {
    throw new Error(
      `e2e global-setup: prisma/schema.prisma not found under ${root} — run playwright from the repo root`,
    );
  }
  const e2eUrl = `file:${path.join(root, "db", "e2e.db")}`;
  execSync("bunx prisma db push --force-reset", {
    stdio: "inherit",
    env: { ...process.env, DATABASE_URL: e2eUrl },
  });
  execSync("bun prisma/seed.ts", {
    stdio: "inherit",
    env: { ...process.env, DATABASE_URL: e2eUrl },
  });
}
