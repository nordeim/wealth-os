// Session-162 (the 162-c rotation): the sweep's CROSS-PROCESS AUTH STATE —
// the login-consolidation doctrine's third application (s160 census ·
// s161 rhythm · s162 sweeps). The four sweep invocations are SEPARATE
// PROCESSES, so a per-invocation pre-flight cannot cure the seam: each
// process would still pay its own login pair. The cure is a shared
// storageState FILE — the combined pair state (the ref's Base44 cookie +
// our stateless neo_session, two origins one jar) written by the first
// invocation and reused by every subsequent one while fresh.
//
// The guard trio (L-162c2 — validation-by-use, never trust):
//   1. TTL: the file's mtime bounds reuse at 15 minutes (the
//      login-window semantics — reuse within one gate chain, never
//      across rounds or dev-server generations).
//   2. The authenticated probe: a fresh file is still VERIFIED by use —
//      one throwaway context, an authenticated check per app (the
//      /dashboard probe must NOT redirect to /login). Every failure mode
//      (rotated AUTH_SECRET · the 7-day cookie TTL · the ref platform
//      session loss · a corrupt file) surfaces as that same redirect,
//      and one guard covers them all — a miss falls back to the fresh
//      login pair and REWRITES the file (the self-heal).
//   3. Mid-run invalidation stays backstopped by the drift gate itself:
//      a login-wall screenshot is a catastrophic diff — the gate fails
//      LOUDLY, never silently. The probe converts the confusing failure
//      into the early diagnostic.
//
// The security posture (L-162c3 — the db-binary discipline): the file
// is live session material on disk — git-ignored (.gitignore pins the
// path), written 0600 atomically (tmp + rename), TTL-bounded, and its
// contents are the DEMO account's credentials (documented publicly in
// AGENTS.md/README.md — localhost dev + the demo reference only).
//
// The license is the s160 pair of proofs: the stateless HMAC cookie
// survives context recreation (the s160 pre-plan probe), and the
// zero-data phase keeps the users table (scripts/zero-data.ts), so the
// cookie survives every sweep's zeroing — L-160c1 (the count is the
// budget's true axis) + L-160c2 (the stateless cookie is the license).
//
// Exports (the pure seams are node-testable without a browser —
// tests/sweep-tool.test.ts's session-162 describe pins them):
//   SWEEP_STATE_FILE / SWEEP_STATE_TTL_MS — the constants
//   loadSweepState(file?) — read + parse + the TTL freshness check
//   saveSweepState(state, file?) — the atomic 0600 write
//   preflightPairState(browser) — the cross-process pre-flight

import { chmodSync, existsSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

import { login } from "./sweep";

const REPO = path.resolve(import.meta.dirname, "..");

/** The cached pair state — a dotfile in scripts/, git-ignored (the
 *  .gitignore line is pinned by test: live session material never
 *  enters the tree). */
export const SWEEP_STATE_FILE = path.join(REPO, "scripts", ".sweep-auth-state.json");

/** 15 minutes — the login-window semantics: the state is reused within
 *  one gate chain, never across rounds. The TTL bounds the cache's
 *  lifetime; the authenticated probe is the real guard. */
export const SWEEP_STATE_TTL_MS = 15 * 60 * 1000;

const OUR_URL = process.env.OUR_URL ?? "http://localhost:3000";
// Session-204 (R-4.1): re-anchored with scripts/sweep.ts's own default (the
// login-chain consistency — this module probes + logs into the reference on
// its own, so a stale default here would pair our cookies with the wrong app).
const REF_URL = process.env.REF_URL ?? "https://wealth-os-d93bd04e.base44.app";

const log = (s: string) => console.log(`[sweep-state] ${s}`);

/** The stored shape — a Playwright storageState (cookies + origins),
 *  the census's AuthState idiom. */
export type SweepPairState = Awaited<
  ReturnType<import("@playwright/test").BrowserContext["storageState"]>
>;

/** Read + parse + the TTL freshness check. A missing, corrupt, or
 *  stale (mtime past the TTL) file returns null — never a throw (the
 *  pure seam; the caller falls back to the login pair). */
export function loadSweepState(file: string = SWEEP_STATE_FILE): SweepPairState | null {
  try {
    if (!existsSync(file)) return null;
    const { mtimeMs } = statSync(file);
    if (Date.now() - mtimeMs > SWEEP_STATE_TTL_MS) return null; // stale
    const parsed = JSON.parse(readFileSync(file, "utf8"));
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.cookies)) {
      return null; // corrupt shape
    }
    return parsed as SweepPairState;
  } catch {
    return null; // corrupt JSON / unreadable — a miss, not a crash
  }
}

/** The atomic 0600 write (the db-binary discipline): the tmp file +
 *  rename never leaves a half-written state for the next process, and
 *  the perms keep the live session material private to the user. */
export function saveSweepState(state: SweepPairState, file: string = SWEEP_STATE_FILE): void {
  const tmp = `${file}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(state, null, 2), "utf8");
  chmodSync(tmp, 0o600);
  renameSync(tmp, file);
}

/** The authenticated probe: navigate the app's shell route with the
 *  state's cookies — an authenticated visit stays on /dashboard; an
 *  unauthenticated one redirects to /login (both apps redirect there —
 *  the shared login() helper's own waitForURL idiom inverted). The
 *  settle beat covers the reference's client-side router redirect
 *  (the Base44 SPA fires it post-render). */
async function ctxAuthenticated(
  ctx: import("@playwright/test").BrowserContext,
  base: string,
): Promise<boolean> {
  const page = await ctx.newPage();
  try {
    await page.goto(`${base}/dashboard`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(1000);
    return new URL(page.url()).pathname !== "/login";
  } catch {
    return false;
  } finally {
    await page.close();
  }
}

/** The cross-process pre-flight: the reuse-or-derive pair state.
 *
 *  (a) A fresh cached file is probed — ONE throwaway context carrying
 *      the state, an authenticated check per app; both pass -> the
 *      state returns with ZERO logins this invocation (the
 *      cross-process reuse).
 *  (b) Any miss (no file · stale · corrupt · either app's check
 *      failed) -> the census's preflightLoginPair construction: ONE
 *      context -> login the reference -> login ours -> storageState()
 *      -> close -> the file saved -> the state returns (the
 *      self-heal).
 *
 *  On the login-pair failure the budget hint logs to STDERR (the
 *  s159/s160/s161 contract) then rethrows — fail-fast, never a silent
 *  fall-back. */
export async function preflightPairState(
  browser: import("@playwright/test").Browser,
): Promise<SweepPairState> {
  const cached = loadSweepState();
  if (cached) {
    const probe = await browser.newContext({ storageState: cached });
    try {
      const oursOk = await ctxAuthenticated(probe, OUR_URL);
      const refOk = await ctxAuthenticated(probe, REF_URL);
      if (oursOk && refOk) {
        log("reusing the fresh sweep auth state — ZERO logins this invocation (the cross-process file)");
        return cached;
      }
      log(
        `the cached sweep auth state failed the authenticated probe (ours=${oursOk} ref=${refOk}) — re-deriving the pair (the self-heal)`,
      );
    } finally {
      await probe.close();
    }
  }

  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  try {
    const page = await ctx.newPage();
    log(`the pre-flight login pair: the reference ${REF_URL}…`);
    await login(page, REF_URL);
    log(`the pre-flight login pair: ours ${OUR_URL}…`);
    await login(page, OUR_URL);
    const state = await ctx.storageState();
    saveSweepState(state);
    log("the pre-flight pair captured + saved (one ref-login + one our-login — the combined state file)");
    return state;
  } catch (e) {
    console.error(
      `[sweep-state] the pre-flight login pair FAILED — if the dev log shows 429s, the\n` +
        `10-per-IP/15-min login window is exhausted (the L-158c3/L-160c1 budget\n` +
        `doctrine); the fix: a dev-server restart, then a single sweep re-run.\n` +
        `The app's own login limiter is a deliberate security contract — never\n` +
        `weakened; the sweep chain consolidates its logins instead (one pair per\n` +
        `chain, shared cross-process through the state file).`,
    );
    throw e;
  } finally {
    await ctx.close();
  }
}
