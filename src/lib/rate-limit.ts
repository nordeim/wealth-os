// Fixed-window rate limiter (per-process, single-node deploy — same contract
// as the scaffold family). Used by the auth routes with PER-ROUTE limits
// (all per 15 min / IP — Session-63 (N-63e) corrected this header, which
// used to claim a flat "10 attempts"): login 10, signup 10, resend 5,
// verify 20. Session-67 (N-67e) added the sessioned upload route at 20
// (post-guard); session-68 (F-68a3) recorded it here. Session-163 added
// forgot 10 + reset 10 (the reset funnel's own buckets).
// Session-240 (R-37, F-240c): signup ALSO carries a process-level
// creation ceiling (20 per 15 min, keyed WITHOUT the IP — the uploads
// capacity precedent), bounding the direct-exposure worst case the
// per-IP key alone cannot. Session-241 (R-38, F-241b): the ceiling
// rides the CREATION PATH (after the body parse and the duplicate-
// email check) under the hyphenated signup-process-ceiling key — the
// entry form counted denied/invalid attempts and its colon-carried
// key was client-mintable from the per-IP keyspace.
//
// Session-173 (F-173a): rateLimit takes `now = Date.now()` — the
// session-164 sweepRateLimits form extended to the rateLimit path, the
// module's own injectable precedent. PURELY ADDITIVE: the default is the
// wall clock, every call site (the rate-limited routes) rides
// unchanged, and the fixed-window arithmetic became property-testable
// (tests/property.test.ts P-n…P-q — the crossing, the retryAfter
// ceiling, and the remaining monotonicity over a generated space).

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Session-241 (R-38, F-241c): the cardinality cap — the per-account
// buckets (login-acct:, verify-acct:, resend-acct:, forgot-acct:)
// mint keys from CALLER-SUPPLIED strings on unauthenticated routes,
// and the sweep bounds entry LIFETIME, never entry COUNT within a
// window: a sustained random-email flood held an unbounded live set
// (~R×900 entries at 15 min) regardless of proxy depth — memory
// amplification on the single-process self-hosted posture. The cap
// is far above legit single-node scale; a FRESH key arriving at cap
// joins the shared overflow bucket (fail-closed: the degradation
// never widens to fail-open — the flood's keys churn in overflow
// while EXISTING keys keep their own buckets and count normally, and
// the overflow verdict still applies each caller's own limit).
const MAX_BUCKETS = 10_000;
const OVERFLOW_KEY = "__overflow__";

// Session-164 (the digma S76-G port): the sweep WATERMARK — the earliest
// live resetAt seen at the last sweep. Every auth route calls
// sweepRateLimits() on every request (13+ call sites), so the pre-164
// always-full O(n) walk cost O(n^2) across rotated-key bursts. Calls
// before the watermark crossing are O(1) no-ops; an expired key still
// resets LAZILY at its own access (the rateLimit path); only the memory
// reclamation of UN-ACCESSED keys waits for the crossing. Per-key
// observable behavior is identical to the always-sweep form — only the
// cost profile changes (the never-weakened guarantee).
let sweepWatermark = 0;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSec: number;
}

export function rateLimit(key: string, limit: number, windowMs: number, now = Date.now()): RateLimitResult {
  let existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    // Session-241 (R-38, F-241c): the cap rides the INSERTION path
    // only (existing-key updates never pay the routing cost, and the
    // check is O(1) — no eviction scan for a flood to abuse). A fresh
    // key at cap degrades onto the shared overflow bucket; the
    // overflow key itself is exempt so the degradation carrier can
    // always land.
    if (
      !existing &&
      key !== OVERFLOW_KEY &&
      buckets.size >= MAX_BUCKETS
    ) {
      key = OVERFLOW_KEY;
      existing = buckets.get(key);
    }
    if (!existing || existing.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return { allowed: true, remaining: limit - 1, retryAfterSec: 0 };
    }
  }
  existing.count += 1;
  if (existing.count > limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }
  return { allowed: true, remaining: limit - existing.count, retryAfterSec: 0 };
}

export function clientKey(req: Request): string {
  // Session-163 (the digma S62-D/S69-A port): the limiter keys on the
  // LAST x-forwarded-for hop — the proxy-APPENDED real IP. The pre-163
  // FIRST-hop keying trusted a client-suppliable value: a spoofing client
  // PREPENDS a fake IP and the proxy appends the real one after it, so
  // the first hop was attacker-chosen and the brute-force defense
  // (10/IP/15min) was evadable by rotating the header. A single-value
  // header (the e2e suites' dedicated-bucket form) is both first and
  // last — unaffected.
  //
  // The trust depth is DEPLOY-DECLARED through NEO_PROXY_HOPS: unset
  // (the default) = 1 — exactly one appending proxy. 0 = direct exposure
  // (the client-suppliable header family is ignored entirely — one
  // honest shared bucket instead of a per-request rotation that fully
  // bypasses the limiter). N >= 2 = N trusted appending proxies (keys on
  // the hop the Nth trusted proxy preserved). Unparsable or negative
  // values fail CLOSED onto the default — a bad env var never widens
  // trust. A list shorter than the declared depth fails closed onto
  // "unknown" (an attacker sending single-value headers under a declared
  // depth of 2 cannot rotate buckets). The x-real-ip fallback applies
  // only at depth >= 1 with XFF absent — ignored entirely at depth 0.
  const depth = proxyHopDepth();
  if (depth === 0) return "unknown";
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) {
    const hops = fwd.split(",").map((hop) => hop.trim()).filter(Boolean);
    if (hops.length < depth) return "unknown";
    return hops[hops.length - depth] ?? "unknown";
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Session-163 (the digma S69-A port): the declared proxy-topology trust
 *  depth. NEO_PROXY_HOPS: unset/empty = 1; unparsable or negative fails
 *  CLOSED onto 1; 0 = direct exposure; N >= 2 = N appending proxies. */
export function proxyHopDepth(): number {
  const raw = process.env.NEO_PROXY_HOPS;
  if (raw === undefined || raw === "") return 1;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) return 1;
  return parsed;
}

// Opportunistic cleanup so the map never grows unbounded. Session-164
// (the digma S76-G port): AMORTIZED — the watermark gates the walk and
// the return value is the number of entries swept (the honest observable
// for the amortization; every route call site ignores it — the void ->
// number widening is additive).
export function sweepRateLimits(now = Date.now()): number {
  if (now < sweepWatermark) return 0;
  let swept = 0;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
      swept += 1;
    }
  }
  sweepWatermark = computeWatermark(buckets, now);
  return swept;
}

/** Session-164 (the digma S76-G port): the pure watermark seam — the
 *  next gate time for a buckets map: the MINIMUM live resetAt, or `now`
 *  when nothing is live (an empty sweep is O(1) and the next call sweeps
 *  again). Structural param typing keeps the module's Bucket interface
 *  private. */
export function computeWatermark(
  map: ReadonlyMap<string, { resetAt: number }>,
  now: number,
): number {
  let min: number | null = null;
  for (const bucket of map.values()) {
    if (bucket.resetAt > now && (min === null || bucket.resetAt < min)) min = bucket.resetAt;
  }
  return min ?? now;
}
