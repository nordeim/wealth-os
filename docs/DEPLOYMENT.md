# Deployment Guide

ORBITAL ships as a single Next.js **standalone** build with a SQLite file
database — one process, zero external services. This guide covers the
supported production paths and the environment contract.

## 1. Build

```bash
bun install
bun run build          # next build + standalone assembly (.next/standalone)
```

The build compiles the page shell and the 29 API route files (41 verb handlers), then copies
`.next/static` and `public/` into `.next/standalone/` (see the `build`
script in `package.json`). `next.config.ts` pins `outputFileTracingRoot` to
the repo root — keep it; the standalone trace depends on it.

## 2. Run

```bash
bun run start          # NODE_ENV=production bun .next/standalone/server.js
```

The server listens on port 3000 by default (`PORT` overrides). Always start
it from the repo root via the npm/bun script — the scripts guarantee the
working directory that the SQLite path resolution and the standalone trace
rely on. **Cookie scheme note (session-67):** the session cookie's `Secure`
flag derives from `NODE_ENV` (set in production boots) — the app NEVER reads
`X-Forwarded-Proto` or any other request header to decide it. Behind an
HTTPS-terminating reverse proxy that speaks plain HTTP to the app,
`NODE_ENV=production` is what marks the cookie `Secure`; a plain-HTTP
production boot still sets `Secure`, and browsers will silently drop the
cookie (a login loop) — serve the app over HTTPS end-to-end or terminate
TLS at the app process if you must run without the flag.

## 3. Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | Yes | SQLite connection string. See §4. |
| `AUTH_SECRET` | **Yes in production** | HMAC secret for session cookies. Generate with `openssl rand -hex 32`. Must be at least 16 characters — shorter values fall back to the insecure dev constant (with a server warning) instead of the run-time error an absent value raises. Never ship the dev constant. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical public origin, used for metadata URLs and `sitemap.xml` (e.g. `https://orbital.example.com`). |
| `NEO_PROXY_HOPS` | **Set it explicitly in production** | Trusted-proxy depth for rate-limit IP keying. Unset = 1 (correct behind exactly one reverse proxy; CLIENT-SUPPLIABLE on a direct-exposure deployment — a rotating `X-Forwarded-For` bypasses every rate limit, and the production boot warns). Direct exposure: `0`. Behind N appending proxies: `N`. See §2 for the direct-exposure path. |

## 4. Database location (§4 — the `.env.example` reference)

`DATABASE_URL` accepts three forms:

1. **Relative `file:` URL (the default, zero-config local story).**
   ```
   DATABASE_URL="file:../db/custom.db"
   ```
   Relative URLs resolve against the **`prisma/` directory that owns
   `schema.prisma`** — exactly like the Prisma CLI — so this string points
   at `<repo>/db/custom.db` for `prisma db push`, `prisma/seed.ts`,
   `next build` and the running server alike, regardless of the process
   working directory. The resolution rule lives in
   `src/lib/db-path.ts` and is pinned by `tests/db-path.test.ts`.

2. **Absolute `file:` URL (recommended for production).**
   ```
   DATABASE_URL="file:/var/lib/orbital/custom.db"
   ```
   Absolute paths pass through untouched — immune to any working-directory
   ambiguity across service managers, containers, or cron wrappers. Point
   them at a persisted volume and back the file up.

3. **PostgreSQL.** Switch `provider = "postgresql"` in
   `prisma/schema.prisma`, set a `postgresql://` URL, then
   `bun run db:push && bun run db:seed`.

Initialize (or reset) the database with:

```bash
bun run db:push        # apply schema (db push — no migrations folder)
bun run db:seed        # idempotent demo workspace (scoped to the demo owner — R-12)
```

> **Public deployments: skip `db:seed`.** The seed upserts the
> README-documented demo account (a known email + password) so the
> first login has data to show — on an internet-exposed instance that
> is a guessable live account (owner-scoped, but persistent). Create
> the first account through `/signup` instead (session-224, F-224i;
> the PAD §10 register row).

`db/*.db` is gitignored; every fresh clone recreates it from the two
commands above.

## 5. Updating

```bash
git pull
bun install
bunx prisma generate   # after schema changes
bun run db:push
bun run build
# restart the server process
```

### 5.1 Upgrading across schema changes that add REQUIRED columns

Session-215 (R-12, F-215d): prisma 7 REFUSES to add a required column to
a POPULATED table even under `db push --accept-data-loss` ("Added the
required column … There are N rows in this table, it is not possible to
execute this step") — the flag covers data-losing steps it can execute,
not unexecutable ones. This bit for real across the session-214 owner-
scoping migration (Budget/Setting gained required `ownerId`). If your
database predates such a change, pick one:

**Option A — export, rebuild, re-import (simple, safe):**

```bash
# 1. Back up, then export YOUR data while the OLD build still runs
cp db/custom.db db/custom.db.bak
#    (log in, click Settings → Export All Data — the JSON download)

# 2. Rebuild the database at the NEW schema, then reimport
bun run db:push -- --force-reset    # recreates the schema in place
bun run build && bun run start      # re-import via Settings → Import
```

**Option B — hand-migrate (no downtime, SQL):** add the column nullable,
backfill from the joinable parent, then tighten. For the session-214
ownerId columns:

```sql
-- sqlite3 db/custom.db
ALTER TABLE "Budget" ADD COLUMN "ownerId" TEXT;
UPDATE "Budget" SET "ownerId" = (SELECT id FROM "User"
  WHERE email = 'your-login@example.com');
ALTER TABLE "Setting" ADD COLUMN "ownerId" TEXT NOT NULL DEFAULT '';
UPDATE "Setting" SET "ownerId" = (SELECT id FROM "User"
  WHERE email = 'your-login@example.com');
-- (single-user installs: one UPDATE covers every row)
```

Multi-user installs upgrading across R-10 must attribute each row to its
true owner before the tightening step — run the per-row UPDATE from your
own provenance records.

## 6. Verification checklist

```bash
curl -s https://your-host/api/health          # {"status":"ok",...}
bun run lint && bun run typecheck && bun run test
bun run gate                                  # the one-command gate (local)
bun run test:e2e                              # Playwright suite (local)
```

## 7. Common production issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Error code 14: Unable to open the database file` | Server started from a directory that has no `prisma/schema.prisma` and no absolute `DATABASE_URL` | Start via `bun run start`, or set an absolute `file:` URL (§4) |
| Logins loop back to `/login` | `AUTH_SECRET` changed between restarts | Keep the secret stable across restarts |
| Rate-limited logins (429) | 10 attempts/IP/15 min fixed window | Wait for `Retry-After`, or restart to clear the in-memory buckets (single-node) |
