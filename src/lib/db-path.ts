// SQLite path normalization (contract pinned by tests/db-path.test.ts).
//
// The Prisma CLI resolves relative `file:` URLs against prisma/schema.prisma;
// the runtime must follow the SAME rule so `next dev`, `next build` and the
// standalone server all land on <repo>/db/custom.db regardless of the
// process working directory.
//
// Anchor order:
//  1. Next standalone output — `server.js` runs `process.chdir()` into
//     .next/standalone, whose traced prisma/schema.prisma copy would
//     otherwise capture the CWD rule. Recognize that folder and return the
//     real repo two levels up.
//  2. This module's own repo root (validated by the source file existing
//     on disk — the standalone bundle rewrites import.meta.url into a
//     virtual path that must be ignored).
//  3. process.cwd() as a last resort.
//
// Anchors 1–2 are VALIDATED (a prisma/schema.prisma really exists at the
// root they report), so their candidate is accepted unconditionally and the
// database folder is created on demand (first boot). Falling through with
// the raw relative URL instead would hand the path to the Prisma engine,
// which resolves it against the process CWD — landing one directory
// OUTSIDE the repo. That exact bug shipped once: the dev server opened
// /home/z/my-project/db/custom.db while the repo expected
// <repo>/db/custom.db.
//
// BUN ABSOLUTIZATION (the second half of that same bug): when bun runs a
// script (`bun run dev`, `bun run db:seed`, `bun x prisma …`) it loads the
// repo .env AND rewrites a relative `file:` DATABASE_URL into an ABSOLUTE
// path resolved against THE .ENV FILE'S OWN DIRECTORY. With the mandated
// root contract DATABASE_URL="file:../db/custom.db" that absolute path is
// <parent-of-repo>/db/custom.db — outside the repo — and it sails through
// resolveDatabaseUrl untouched (absolute URLs are passed through by
// design, e.g. for production deployments). effectiveDatabaseUrl detects
// exactly that signature (env var == absolutization of the .env value) and
// re-derives the URL from the RAW .env value via the schema rule. Any other
// env value (a caller override such as the e2e suite's absolute db/e2e.db pin —
// its global-setup builds the absolute form at runtime,
// a postgres URL, a production absolute path) is respected as-is.

import { existsSync, mkdirSync, readFileSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

// Session-261 (R-58, F-261d): module-local — the export keyword
// retired (the vestigial-export genus; the only consumer is this
// file's own fallback arm below; the db-path tests import the four
// seam functions, not the constant).
const DEFAULT_DATABASE_URL = "file:../db/custom.db";

function repoRootFromModule(): string | null {
  try {
    const here = dirname(fileURLToPath(import.meta.url)); // <repo>/src/lib
    const root = resolve(here, "..", "..");
    if (existsSync(join(root, "prisma", "schema.prisma"))) return root;
  } catch {
    // import.meta.url unavailable (unusual runtime) — fall through.
  }
  return null;
}

function repoRootFromStandaloneCwd(dir: string = process.cwd()): string | null {
  try {
    if (!dir.includes(".next")) return null;
    // <repo>/.next/standalone -> <repo>
    const root = resolve(dir, "..", "..");
    if (existsSync(join(root, "prisma", "schema.prisma"))) return root;
  } catch {
    // ignore
  }
  return null;
}

/**
 * Absolute `file:` URL for a schema-relative reference, anchored at a
 * VALIDATED repo root. Creates the database's parent directory on demand
 * (first boot) so the Prisma engine never receives a relative URL from a
 * proven anchor.
 */
export function urlForRoot(root: string, ref: string): string {
  const candidate = join(root, "prisma", ref); // mirror the CLI rule
  mkdirSync(dirname(candidate), { recursive: true });
  return `file:${candidate}`;
}

export function resolveDatabaseUrl(rawUrl: string): string {
  if (!rawUrl.startsWith("file:")) return rawUrl; // postgres etc. — pass through
  const ref = rawUrl.slice("file:".length);
  if (!ref || ref.startsWith("/")) return rawUrl; // absolute or in-memory

  // Validated anchors: trust them even on first boot (db/ may not exist
  // yet) — urlForRoot creates the folder.
  const validated: Array<() => string | null> = [
    repoRootFromStandaloneCwd,
    repoRootFromModule,
  ];
  for (const anchor of validated) {
    const root = anchor();
    if (root) return urlForRoot(root, ref);
  }

  // Unvalidated last resort: only accept when the target already exists —
  // never mkdir from an unproven root (a stray CWD must not create a db/).
  const candidate = join(process.cwd(), "prisma", ref);
  if (existsSync(candidate) || existsSync(dirname(candidate))) {
    return `file:${candidate}`;
  }
  return rawUrl;
}

/** Minimal dotenv parser: quotes stripped, comments/blanks skipped. */
export function parseEnvFile(contents: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of contents.split(/\r?\n/)) {
    const match = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line);
    if (!match) continue; // comment or blank line
    let value = match[2].trim();
    const first = value[0];
    const last = value[value.length - 1];
    if (
      value.length >= 2 &&
      ((first === '"' && last === '"') || (first === "'" && last === "'"))
    ) {
      value = value.slice(1, -1);
    }
    out[match[1]] = value;
  }
  return out;
}

function isRelativeFileUrl(url: string | undefined): url is string {
  if (!url) return false;
  if (!url.startsWith("file:")) return false;
  const ref = url.slice("file:".length);
  return ref.length > 0 && !ref.startsWith("/");
}

/**
 * The URL Bun would export for a relative `file:` value loaded from a .env
 * file: the value resolved against the .env file's own directory.
 */
function bunAbsolutized(envFileUrl: string, envFileDir: string): string {
  const ref = envFileUrl.slice("file:".length);
  return `file:${resolve(envFileDir, ref)}`;
}

/**
 * Pick the effective database URL from the two places it can come from:
 * the process environment (possibly rewritten by bun) and the raw .env
 * file. A process-env value that is exactly bun's absolutization of the
 * .env value is treated as derived (re-anchored on the schema rule);
 * anything else wins as an intentional override.
 */
export function effectiveDatabaseUrl(input: {
  envUrl?: string | undefined;
  envFileUrl?: string | undefined;
  envFileDir: string;
}): string {
  const { envUrl, envFileUrl, envFileDir } = input;
  if (envUrl && isRelativeFileUrl(envFileUrl)) {
    if (envUrl === bunAbsolutized(envFileUrl, envFileDir)) {
      return resolveDatabaseUrl(envFileUrl);
    }
  }
  return resolveDatabaseUrl(envUrl ?? envFileUrl ?? DEFAULT_DATABASE_URL);
}

/** The DATABASE_URL value of the .env file at `dir`, if one exists. */
function readDatabaseUrlFromEnvAt(dir: string): string | undefined {
  const envPath = join(dir, ".env");
  if (existsSync(envPath)) {
    return parseEnvFile(readFileSync(envPath, "utf8")).DATABASE_URL;
  }
  return undefined;
}

/**
 * Runtime convenience: combines process.env.DATABASE_URL with the .env
 * file at `cwd` (if any) through effectiveDatabaseUrl. Used by the Prisma
 * client singleton (src/lib/db.ts), the seed script (prisma/seed.ts) and
 * the CLI wrapper (scripts/prisma-env.ts) so every consumer applies the
 * same rules.
 *
 * STANDALONE LAUNCH RECOVERY (session-34): the standalone server.js runs
 * `process.chdir(__dirname)` at boot — AFTER bun already absolutized a
 * relative `file:` DATABASE_URL against the LAUNCH directory's .env
 * (typically <repo>/.env via `bun run start` from the repo root). The
 * cwd-side bun signature (computed against the post-chdir cwd, whose .env
 * is the traced .next/standalone copy) then MISSES that value, and the
 * env var would be mistaken for an intentional override — handing the
 * engine a parent-of-repo path that cannot even be created. Before
 * accepting that, test the signature of the .env at the validated
 * standalone repo root (the launch directory). A caller-provided override
 * (e.g. the e2e suite's file:../db/e2e.db) matches neither signature and
 * is still honored exactly as before.
 */
export function runtimeDatabaseUrl(cwd: string = process.cwd()): string {
  const envUrl = process.env.DATABASE_URL;
  const envFileUrl = readDatabaseUrlFromEnvAt(cwd);
  if (envUrl && isRelativeFileUrl(envFileUrl)) {
    if (envUrl === bunAbsolutized(envFileUrl, cwd)) {
      return resolveDatabaseUrl(envFileUrl);
    }
    const launchDir = repoRootFromStandaloneCwd(cwd);
    if (launchDir && launchDir !== cwd) {
      const launchEnvUrl = readDatabaseUrlFromEnvAt(launchDir);
      // Session-35 guard: only a RELATIVE launch value can be a bun
      // absolutization candidate. An absolute launch .env value (the
      // documented production form, docs/DEPLOYMENT.md §4) passes through
      // path.resolve unchanged inside bunAbsolutized(), so its signature
      // would MATCH and the seam would re-anchor it into a corrupted
      // <repo>/prisma/var/lib/… path. Absolute URLs are intentional
      // overrides by this seam's own header contract.
      if (
        launchEnvUrl &&
        isRelativeFileUrl(launchEnvUrl) &&
        envUrl === bunAbsolutized(launchEnvUrl, launchDir)
      ) {
        // Re-anchor on the launch directory's own value through the
        // ALREADY-VALIDATED standalone root (the schema rule — identical
        // to resolveDatabaseUrl, but anchored exactly where bun loaded it).
        const ref = launchEnvUrl.slice("file:".length);
        return urlForRoot(launchDir, ref);
      }
    }
  }
  return effectiveDatabaseUrl({
    envUrl,
    envFileUrl,
    envFileDir: cwd,
  });
}
