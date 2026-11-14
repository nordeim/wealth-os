import { describe, expect, it } from "vitest";
import { rateLimit, sweepRateLimits, clientKey } from "@/lib/rate-limit";

describe("rateLimit", () => {
  it("allows up to the limit then blocks", () => {
    const key = `test-${Math.random()}`;
    for (let i = 0; i < 10; i += 1) {
      expect(rateLimit(key, 10, 60_000).allowed).toBe(true);
    }
    const blocked = rateLimit(key, 10, 60_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
  });

  it("tracks remaining quota", () => {
    const key = `test-${Math.random()}`;
    rateLimit(key, 3, 60_000);
    rateLimit(key, 3, 60_000);
    expect(rateLimit(key, 3, 60_000).remaining).toBe(0);
  });

  it("isolates keys", () => {
    const a = `a-${Math.random()}`;
    const b = `b-${Math.random()}`;
    rateLimit(a, 1, 60_000);
    expect(rateLimit(a, 1, 60_000).allowed).toBe(false);
    expect(rateLimit(b, 1, 60_000).allowed).toBe(true);
  });

  it("sweeps expired buckets", () => {
    const key = `sweep-${Math.random()}`;
    rateLimit(key, 1, -1); // already expired window
    sweepRateLimits();
    expect(rateLimit(key, 1, 60_000).allowed).toBe(true);
  });
});

// ---- session-163: the deploy-declared proxy topology (digma S62-D/S69-A) --
// clientKey re-keys onto the LAST x-forwarded-for hop — the proxy-APPENDED
// real IP. The pre-163 FIRST-hop keying trusted a client-suppliable value:
// a spoofing client PREPENDS a fake IP and the proxy appends the real one
// after it, so the first hop was attacker-chosen and the brute-force
// defense (10/IP/15min) was evadable by rotating the header. The trust
// depth is DEPLOY-DECLARED through NEO_PROXY_HOPS: unset = 1 (exactly one
// appending proxy), 0 = direct exposure (header family ignored entirely),
// N >= 2 = N trusted appending proxies. Unparsable or negative values
// fail CLOSED onto the default — a bad env var never widens trust.

describe("clientKey (session-163: last-hop trust + declared depth)", () => {
  const ORIGINAL = process.env.NEO_PROXY_HOPS;

  it("keys on the LAST x-forwarded-for hop at the default depth (the proxy-appended real IP)", () => {
    delete process.env.NEO_PROXY_HOPS;
    const req = new Request("http://x", {
      headers: { "x-forwarded-for": "203.0.113.7, 10.0.0.1" },
    });
    expect(clientKey(req)).toBe("10.0.0.1");
  });

  it("a single-value XFF is both first and last — the e2e form is unaffected", () => {
    delete process.env.NEO_PROXY_HOPS;
    const req = new Request("http://x", {
      headers: { "x-forwarded-for": "198.51.100.46" },
    });
    expect(clientKey(req)).toBe("198.51.100.46");
  });

  it("depth 0 (direct exposure): the client-suppliable header family is ignored entirely", () => {
    process.env.NEO_PROXY_HOPS = "0";
    const req = new Request("http://x", {
      headers: { "x-forwarded-for": "203.0.113.7, 10.0.0.1", "x-real-ip": "192.0.2.9" },
    });
    expect(clientKey(req)).toBe("unknown");
  });

  it("depth 2: keys on the hop the second trusted proxy preserved", () => {
    process.env.NEO_PROXY_HOPS = "2";
    const req = new Request("http://x", {
      headers: { "x-forwarded-for": "203.0.113.7, 10.0.0.1, 192.0.2.9" },
    });
    expect(clientKey(req)).toBe("10.0.0.1");
  });

  it("a list shorter than the declared depth fails closed onto unknown", () => {
    process.env.NEO_PROXY_HOPS = "2";
    const req = new Request("http://x", {
      headers: { "x-forwarded-for": "203.0.113.7" },
    });
    expect(clientKey(req)).toBe("unknown");
  });

  it("unparsable or negative depths fail CLOSED onto the default (last hop)", () => {
    for (const bad of ["abc", "-1", ""]) {
      process.env.NEO_PROXY_HOPS = bad;
      const req = new Request("http://x", {
        headers: { "x-forwarded-for": "203.0.113.7, 10.0.0.1" },
      });
      expect(clientKey(req)).toBe("10.0.0.1");
    }
  });

  it("x-real-ip applies only at depth >= 1 with XFF absent", () => {
    delete process.env.NEO_PROXY_HOPS;
    const req = new Request("http://x", { headers: { "x-real-ip": "192.0.2.9" } });
    expect(clientKey(req)).toBe("192.0.2.9");
  });

  it("falls back to unknown with no headers at all", () => {
    delete process.env.NEO_PROXY_HOPS;
    expect(clientKey(new Request("http://x"))).toBe("unknown");
  });

  it("restores the environment after the battery", () => {
    if (ORIGINAL === undefined) delete process.env.NEO_PROXY_HOPS;
    else process.env.NEO_PROXY_HOPS = ORIGINAL;
  });
});

// ---- session-164: the amortized sweep (the digma S76-G port) --------------
// The pre-164 posture: sweepRateLimits() ran the FULL O(n) walk on every
// call — and every auth route calls it on every request (13+ call sites),
// so rotated-key traffic cost O(n^2) across the burst. The digma S76-G
// cure (its WP-7 stretch, deferred at s163 without the note — landed
// here): a module-level WATERMARK (the earliest live resetAt seen at the
// last sweep) gates the walk. Calls before the watermark crossing are
// O(1) no-ops; an expired key still resets LAZILY at its own access (the
// rateLimit path); only the memory reclamation of UN-ACCESSED keys waits
// for the crossing. Per-key observable behavior is identical to the
// always-sweep form — only the cost profile changes.

import { readFileSync } from "node:fs";
import path from "node:path";
import { computeWatermark } from "@/lib/rate-limit";

describe("the amortized sweep (session-164, digma S76-G)", () => {
  // A banded monotonic timeline: the module watermark persists across the
  // file's tests, so each test's `now` values start past every prior
  // band's live maxima (the production analogue: Date.now() is monotonic).
  const T0 = Date.now();
  const BAND = 10_000_000;

  it("computeWatermark: an empty map returns now (the next call sweeps again — an empty sweep is O(1))", () => {
    const now = T0 + BAND;
    expect(computeWatermark(new Map(), now)).toBe(now);
  });

  it("computeWatermark: the MINIMUM live resetAt wins; expired entries are excluded", () => {
    const now = T0 + 2 * BAND;
    const map = new Map<string, { resetAt: number }>([
      ["live-a", { resetAt: now + 60_000 }],
      ["live-b", { resetAt: now + 30_000 }],
      ["dead", { resetAt: now - 1 }],
    ]);
    expect(computeWatermark(map, now)).toBe(now + 30_000);
  });

  it("computeWatermark: an all-expired map returns now (nothing live holds the watermark)", () => {
    const now = T0 + 3 * BAND;
    const map = new Map<string, { resetAt: number }>([["dead", { resetAt: now - 1 }]]);
    expect(computeWatermark(map, now)).toBe(now);
  });

  it("sweepRateLimits returns the swept count; an immediate re-call is an O(1) SKIP (the watermark holds)", () => {
    // rateLimit mints its buckets at REAL Date.now() by default (the
    // s173 clock seam is additive — this wall-clock test form rides the
    // default), so the band arithmetic rides sweepRateLimits' own now
    // param and a window DOMINANT over the band.
    const t = Date.now();
    const key = `amort-${Math.random()}`;
    rateLimit(key, 10, 2_000_000); // resetAt = t + 2_000_000 (the dominant window)
    // open the gate past every earlier bucket (this file's earlier tests
    // use <= 60_000 windows) while OUR bucket stays live:
    const tFlush = t + 1_000_000;
    sweepRateLimits(tFlush); // the full walk — our bucket survives it
    // watermark now = t + 2_000_000 (the only live entry): the immediate
    // re-call is gated OFF — an O(1) no-op that sweeps nothing.
    expect(sweepRateLimits(tFlush + 1)).toBe(0);
    // and the skip never weakened the limiter: the bucket is still live
    expect(rateLimit(key, 10, 2_000_000).allowed).toBe(true);
    expect(rateLimit(key, 10, 2_000_000).remaining).toBe(7); // 3 of 10 consumed
  });

  it("crossing the earliest live expiry re-opens the full walk (the dead bucket is reclaimed)", () => {
    // Band 2 dominates the prior test's watermark (t_prev + 2_000_000).
    const t = Date.now();
    const key = `reopen-${Math.random()}`;
    rateLimit(key, 10, 4_000_000); // resetAt = t + 4_000_000
    // cross the PRIOR watermark (t_prev + 2M ~ t + 2M): the gate opens and
    // the walk runs — our long-window bucket survives it, watermark := t + 4M
    sweepRateLimits(t + 2_500_000);
    expect(rateLimit(key, 10, 4_000_000).allowed).toBe(true); // count 2 — still live
    // still under the watermark: the O(1) skip
    expect(sweepRateLimits(t + 2_600_000)).toBe(0);
    // cross OUR bucket's expiry: the gate opens, the full walk reclaims it
    expect(sweepRateLimits(t + 4_000_001)).toBe(1);
    expect(rateLimit(key, 10, 4_000_000).allowed).toBe(true); // fresh window
  });

  it("the gate is the FIRST statement of sweepRateLimits (the O(1)-until-crossing construction)", () => {
    const src = readFileSync(path.resolve(import.meta.dirname, "..", "src/lib/rate-limit.ts"), "utf8");
    const stripped = src
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "");
    // [\s\S]*? spans the nested parens of the default param (Date.now())
    const body = stripped.match(/export function sweepRateLimits\([\s\S]*?\):\s*number\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
    expect(body.trimStart().startsWith("if (now < sweepWatermark) return 0;")).toBe(true);
    // and the walk still runs to completion once the gate opens (the
    // never-weakened guarantee: a crossing sweep is the full O(n) form)
    expect(body).toContain("buckets.delete(key)");
    expect(body).toContain("sweepWatermark = computeWatermark(buckets, now)");
  });
});

describe("the injectable clock seam (session-173, F-173a)", () => {
  // The s164 sweepRateLimits form extended to the rateLimit path:
  // `rateLimit(key, limit, windowMs, now = Date.now())` — PURELY
  // ADDITIVE. The wall-clock battery above could never STATE the
  // crossing (a 60s window cannot be waited out inside a test); the
  // injected clock makes the fixed-window arithmetic example-pinnable
  // (the property family P-n…P-q carries the generated space).
  const T0 = 1_760_000_000_000;

  it("the injectable clock drives the window: a key blocked at t₀ resets AT the crossing with a fresh count", () => {
    const key = `clock-a-${Math.random()}`;
    const windowMs = 5 * 60_000;
    for (let i = 0; i < 3; i += 1) {
      expect(rateLimit(key, 3, windowMs, T0).allowed).toBe(true);
    }
    expect(rateLimit(key, 3, windowMs, T0).allowed).toBe(false); // blocked
    expect(rateLimit(key, 3, windowMs, T0 + windowMs - 1).allowed).toBe(false); // one ms before: still blocked
    const after = rateLimit(key, 3, windowMs, T0 + windowMs); // AT the crossing
    expect(after.allowed).toBe(true);
    expect(after.remaining).toBe(2); // the FRESH count (3 − 1)
    expect(after.retryAfterSec).toBe(0);
  });

  it("retryAfterSec reports the exact ceiling: ceil((resetAt − now)/1000), floored at 1", () => {
    const key = `clock-b-${Math.random()}`;
    const windowMs = 90_000;
    rateLimit(key, 1, windowMs, T0); // resetAt = T0 + 90_000
    const blocked = rateLimit(key, 1, windowMs, T0 + 30_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSec).toBe(60); // ceil(60_000/1000)
    const nearMiss = rateLimit(key, 1, windowMs, T0 + 89_999);
    expect(nearMiss.retryAfterSec).toBe(1); // ceil(1/1000) — the floor
  });

  it("the default form: the 3-arg call and the 4-arg call at Date.now() agree (the additive seam — zero behavior change)", () => {
    const k1 = `clock-c1-${Math.random()}`;
    const k2 = `clock-c2-${Math.random()}`;
    const a = rateLimit(k1, 5, 60_000);
    const b = rateLimit(k2, 5, 60_000, Date.now());
    expect(a.allowed).toBe(b.allowed);
    expect(a.remaining).toBe(b.remaining);
    expect(a.retryAfterSec).toBe(b.retryAfterSec);
    // and the source carries the additive signature (the s164 form)
    const src = readFileSync(path.resolve(import.meta.dirname, "..", "src/lib/rate-limit.ts"), "utf8");
    const stripped = src
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "");
    expect(stripped).toContain("export function rateLimit(key: string, limit: number, windowMs: number, now = Date.now())");
  });
});

// ---- session-219 (R-16, F-219l): the reset-family key disjointness --------
// /api/reset (the destructive data wipe, 3/15min) and
// /api/auth/reset-password (the password reset, 10/15min) BOTH keyed
// `reset:<ip>` — one fixed-window bucket shared by two different
// endpoints, silently merging to the lower threshold. The cure: distinct
// prefixes (`data-reset:` vs `pw-reset:`), pinned at the source level
// (the keys are string literals at the call sites).
describe("the reset-family bucket keys are disjoint (F-219l)", () => {
  it("the two routes key distinct prefixes", () => {
    const data = readFileSync(
      path.resolve(import.meta.dirname, "..", "src/app/api/reset/route.ts"),
      "utf8",
    );
    const pw = readFileSync(
      path.resolve(import.meta.dirname, "..", "src/app/api/auth/reset-password/route.ts"),
      "utf8",
    );
    expect(data).toContain("data-reset:");
    expect(data).not.toContain("`reset:");
    expect(pw).toContain("pw-reset:");
    expect(pw).not.toContain("`reset:");
  });
});

// ---- session-241 (R-38, F-241c): the cardinality cap -------------------------
// The per-account buckets (login-acct:, verify-acct:, resend-acct:,
// forgot-acct:) mint keys from CALLER-SUPPLIED strings on unauthenticated
// routes — a sustained random-email flood held ~R×900 live entries at 15
// minutes regardless of proxy depth (the sweep bounds entry LIFETIME,
// never entry COUNT within a window). The cure: a MAX_BUCKETS cap with
// fail-closed overflow routing — a FRESH key arriving at cap joins the
// shared overflow bucket (whose count the caller's own limit bounds);
// EXISTING keys keep their own buckets and count normally.
describe("the cardinality cap (F-241c)", () => {
  it("a fresh key at cap joins the shared overflow bucket; an existing key keeps its own", () => {
    // Seed the "existing" key BEFORE the fill: it must keep its OWN
    // bucket when the map later hits the cap.
    const existingKey = `cap-existing-${Math.random()}`;
    expect(rateLimit(existingKey, 10, 60_000).allowed).toBe(true);
    // Fill the map past the cap with distinct EXPIRED-window keys (the
    // injectable-now seam's own trick): they occupy cardinality, and
    // their expired windows keep the overflow bucket they briefly
    // route through itself expired (each overflow landing replaces it
    // fresh), so the post-fill overflow state is deterministic.
    for (let i = 0; i < 10_000; i += 1) {
      rateLimit(`cap-fill-${i}`, 10, -1); // already-expired window
    }
    // The EXISTING key counts against its OWN bucket (count 2 of 10,
    // remaining 8 — not the overflow count).
    const existing = rateLimit(existingKey, 10, 60_000);
    expect(existing.allowed).toBe(true);
    expect(existing.remaining).toBe(8);
    // FRESH keys at cap share the OVERFLOW bucket: the first
    // replaces it fresh (deterministic count 1)…
    expect(rateLimit(`cap-fresh-a-${Math.random()}`, 10, 60_000).allowed).toBe(true);
    // …the second at a limit of 1 sees the shared count of 2 and is
    // DENIED (fail-closed: the degradation never widens to fail-open)…
    expect(rateLimit(`cap-fresh-b-${Math.random()}`, 1, 60_000).allowed).toBe(false);
    // …while a limit-10 caller against the same shared count of 3 is
    // still allowed (the verdict applies each caller's OWN limit —
    // conservative per-route bounding, never a global deny).
    expect(rateLimit(`cap-fresh-c-${Math.random()}`, 10, 60_000).allowed).toBe(true);
    // Cleanup: sweep at a now the earlier crossing leg's watermark
    // cannot outrun (it pinned the watermark ~4,000,001 ms ahead of
    // ITS wall clock — a +120s sweep never crossed it, the O(1) skip
    // reclaimed nothing, and this comment's old form claimed it did).
    // The reclaimed count is asserted: a gated no-op returns 0 and
    // fails loudly. Session-242 (R-39, F-242b).
    const reclaimed = sweepRateLimits(Date.now() + 5_000_000);
    expect(reclaimed).toBeGreaterThan(0);
    // Headroom actually restored: the fresh key earns its OWN bucket
    // back (count 1, remaining 9 — the shared overflow would have
    // answered with the accumulated shared count instead).
    const fresh = rateLimit(`cap-after-sweep-${Math.random()}`, 10, 60_000);
    expect(fresh.allowed).toBe(true);
    expect(fresh.remaining).toBe(9);
  });

  it("the overflow bucket rides inside the cap check, not beside it (the source form)", () => {
    const src = readFileSync(
      path.resolve(import.meta.dirname, "..", "src/lib/rate-limit.ts"),
      "utf-8",
    );
    // The cap check lives in the INSERTION path (a new key), so
    // existing-key updates never pay the routing cost and the check
    // is O(1) — no eviction scan for a flood to abuse.
    const start = src.indexOf("export function rateLimit(");
    const body = src.slice(start, src.indexOf("export function clientKey", start));
    expect(body).toContain("buckets.size >= MAX_BUCKETS");
    expect(body).toContain("OVERFLOW_KEY");
    expect(src).toMatch(/const MAX_BUCKETS = 10_000;/);
  });
});
