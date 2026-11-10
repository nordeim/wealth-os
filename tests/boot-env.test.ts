// Session-170 (WP-3): THE BOOT GATE — the instrumentation.ts fail-fast
// ported from the scandihaven reference (its parseServerEnv + flag-typo
// guard), recast in the house pure-seam form: bootEnvCheck(env) is PURE
// (returns { fatal, warnings } — no process access, fully unit-testable
// over env-shaped records), applyBootEnvReport applies it (prints the
// warnings via the injectable logger, throws the fatal — the [boot]
// message family mirroring the s169 secret() throw).
//
// The six-knob contract validated at boot:
//   AUTH_SECRET     production + missing/<16 chars -> FATAL (the s169
//                   runtime seam front-run: the server refuses to BOOT
//                   instead of failing at the first session op)
//   NEXT_PUBLIC_SITE_URL  production + unset/localhost -> WARNING (the
//                   metadata/robots/sitemap/OG family would advertise
//                   http://localhost:3000; dev is exempt — localhost IS
//                   the dev origin)
//   NEO_* unknown   any NEO_-prefixed var outside the closed 3-knob set
//                   -> WARNING (the scandihaven flag-typo guard, warn
//                   form: a mistyped kill switch silently no-ops today)
//   NEO_DISABLE_*   values outside ""/"1" -> WARNING (every other value
//                   silently behaves as unset)
//   NEO_PROXY_HOPS  unparsable/negative -> WARNING (the rate-limit seam
//                   already fails CLOSED onto 1 — the boot warning adds
//                   the visibility)
//
// src/instrumentation.ts (the Next hook): register() skips the edge
// runtime (no fs/console contract) + the phase-production-build workers
// (next build must never need AUTH_SECRET — verified live), then
// dynamically imports the seam and applies it. Dev/test boot SOFT (the
// DX posture unchanged: the DEV fallback stays documented in auth.ts).
//
// RED at birth (the seam does not exist yet); GREEN when WP-3 lands it.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { applyBootEnvReport, bootEnvCheck, KNOWN_NEO_VARS } from "../src/lib/boot-env";

const root = join(import.meta.dirname, "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

// An env-record builder (the pure seam takes env-shaped records — no
// process access anywhere in the seam). Session-214 (F-214f): the
// builder defaults to the REAL-DEPLOYMENT delivery posture (both
// kill-switches on — no in-app code/reset-link responses), so the
// pre-214 warning-count pins stay honest; the delivery-warning block
// below unsets the knobs to pin the demo posture instead.
// Session-218 (R-15, F-218t): the real-deployment posture now also
// sets the proxy hop depth EXPLICITLY (NEO_PROXY_HOPS: "1") — the
// default-ride warning fires when the knob is unset in production, so
// the count pins need the explicit posture to stay honest.
type Env = Record<string, string | undefined>;
const env = (over: Env = {}): Env => ({
  NODE_ENV: "production",
  AUTH_SECRET: "a".repeat(32),
  NEXT_PUBLIC_SITE_URL: "https://crm.example.com",
  DATABASE_URL: "file:../db/custom.db",
  NEO_DISABLE_IN_APP_OTP: "1",
  NEO_DISABLE_IN_APP_RESET: "1",
  NEO_PROXY_HOPS: "1",
  ...over,
});

// Session-218 (R-15, F-218t — the default-ride warning's own pins):
// unset NEO_PROXY_HOPS in production means the limiter keys on the
// last, client-suppliable XFF hop — the direct-exposure bypass. The
// warning makes the posture visible at boot (the F-214f warn-throw
// discipline: never fatal).
describe("session-218: the NEO_PROXY_HOPS default-ride warning (F-218t)", () => {
  it("production + unset hops: the direct-exposure warning", () => {
    const report = bootEnvCheck(env({ NEO_PROXY_HOPS: undefined }));
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("NEO_PROXY_HOPS is unset");
    expect(report.warnings[0]).toContain("DIRECT-exposure");
    expect(report.warnings[0]).toContain("NEO_PROXY_HOPS=0");
  });

  it("production + the empty-string form: the same warning", () => {
    const report = bootEnvCheck(env({ NEO_PROXY_HOPS: "" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("NEO_PROXY_HOPS is unset");
  });

  it("production + hops=0 (the direct-exposure posture): NO warning — the operator chose", () => {
    const report = bootEnvCheck(env({ NEO_PROXY_HOPS: "0" }));
    expect(report.warnings).toHaveLength(0);
  });

  it("development + unset hops: NO warning (localhost is not the exposure)", () => {
    const report = bootEnvCheck(env({ NODE_ENV: "development", NEO_PROXY_HOPS: undefined }));
    expect(report.warnings).toHaveLength(0);
  });
});

describe("session-170 (WP-3): the production AUTH_SECRET boot gate (the s169 seam front-run)", () => {
  it("production + a healthy secret: no fatal, no warnings", () => {
    const report = bootEnvCheck(env());
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(0);
  });

  it("production + MISSING secret: FATAL, the actionable message (openssl + the 16-char floor)", () => {
    const report = bootEnvCheck(env({ AUTH_SECRET: undefined }));
    expect(report.fatal).toBeTypeOf("string");
    expect(report.fatal).toContain("[boot]");
    expect(report.fatal).toContain("AUTH_SECRET");
    expect(report.fatal).toContain("openssl rand -hex 32");
    expect(report.fatal).toContain("16");
  });

  it("production + a SHORT secret (15 chars): FATAL (the same floor secret() enforces)", () => {
    const report = bootEnvCheck(env({ AUTH_SECRET: "a".repeat(15) }));
    expect(report.fatal).toContain("AUTH_SECRET");
  });

  it("production + the 16-char boundary secret: passes (>= 16, mirroring secret())", () => {
    const report = bootEnvCheck(env({ AUTH_SECRET: "a".repeat(16) }));
    expect(report.fatal).toBeNull();
  });

  it("development + missing secret: SOFT (no fatal — the DEV fallback posture documented in auth.ts)", () => {
    const report = bootEnvCheck(env({ NODE_ENV: "development", AUTH_SECRET: undefined }));
    expect(report.fatal).toBeNull();
  });

  it("test + missing secret: SOFT (the unit/e2e batteries run secretless)", () => {
    const report = bootEnvCheck(env({ NODE_ENV: "test", AUTH_SECRET: undefined }));
    expect(report.fatal).toBeNull();
  });
});

describe("session-170 (WP-3): the NEXT_PUBLIC_SITE_URL misconfig warning", () => {
  it("production + UNSET site url: the metadata-family warning", () => {
    const report = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: undefined }));
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("NEXT_PUBLIC_SITE_URL");
    expect(report.warnings[0]).toContain("sitemap");
  });

  it("production + localhost site url: the same warning (the advertised-origin trap)", () => {
    const report = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: "http://localhost:3000" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("localhost");
  });

  it("production + 127.0.0.1: the same warning", () => {
    const report = bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: "http://127.0.0.1:3000" }));
    expect(report.warnings).toHaveLength(1);
  });

  it("development + localhost site url: NO warning (localhost IS the dev origin)", () => {
    const report = bootEnvCheck(env({ NODE_ENV: "development" }));
    expect(report.warnings).toHaveLength(0);
  });
});

describe("session-170 (WP-3): the NEO_* flag-typo guard (the scandihaven port, warn form)", () => {
  it("the closed known set is the documented 3-knob family", () => {
    expect([...KNOWN_NEO_VARS].sort()).toEqual([
      "NEO_DISABLE_IN_APP_OTP",
      "NEO_DISABLE_IN_APP_RESET",
      "NEO_PROXY_HOPS",
    ]);
  });

  it("an UNKNOWN NEO_* var warns (a mistyped kill switch would silently no-op)", () => {
    const report = bootEnvCheck(env({ NEO_DISABLE_INAPP_OTP: "1" })); // the typo form
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("NEO_DISABLE_INAPP_OTP");
    expect(report.warnings[0]).toContain("known");
  });

  it("the KNOWN knobs at their documented values: no warning", () => {
    const report = bootEnvCheck(env({ NEO_PROXY_HOPS: "2", NEO_DISABLE_IN_APP_OTP: "1" }));
    expect(report.warnings).toHaveLength(0);
  });

  it("NEO_DISABLE_IN_APP_OTP with an off-vocabulary value warns (only ''/'1' are meaningful)", () => {
    const report = bootEnvCheck(env({ NEO_DISABLE_IN_APP_OTP: "true" }));
    // Two warnings: the typo guard for "true" AND the F-214f delivery
    // warning ("true" is not "1" — the OTP channel is still in-app).
    expect(report.warnings).toHaveLength(2);
    expect(report.warnings[0]).toContain("NEO_DISABLE_IN_APP_OTP");
    expect(report.warnings[0]).toContain("true");
    expect(report.warnings[1]).toContain("In-app delivery");
  });

  it("NEO_PROXY_HOPS unparsable warns (the seam fails closed onto 1 — the boot warning adds visibility)", () => {
    const report = bootEnvCheck(env({ NEO_PROXY_HOPS: "abc" }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("NEO_PROXY_HOPS");
  });

  it("NEO_PROXY_HOPS negative warns the same way", () => {
    const report = bootEnvCheck(env({ NEO_PROXY_HOPS: "-1" }));
    expect(report.warnings).toHaveLength(1);
  });
});

describe("session-170 (WP-3): applyBootEnvReport — the warnings print, the fatal throws", () => {
  it("the fatal throws the message verbatim (the [boot] family)", () => {
    const report = bootEnvCheck(env({ AUTH_SECRET: undefined }));
    expect(() => applyBootEnvReport(report, { logger: console })).toThrow(report.fatal as string);
  });

  it("the warnings print once each via the injectable logger; a clean report prints nothing", () => {
    const printed: string[] = [];
    const logger = { warn: (msg: string) => printed.push(msg) };
    applyBootEnvReport(bootEnvCheck(env({ NEXT_PUBLIC_SITE_URL: undefined })), { logger });
    expect(printed).toHaveLength(1);
    applyBootEnvReport(bootEnvCheck(env()), { logger });
    expect(printed).toHaveLength(1); // no new lines
  });
});

describe("session-170 (WP-3): the instrumentation hook (the Next form, source-pinned)", () => {
  const hook = read("src/instrumentation.ts");

  it("exports register() and skips the edge runtime + the build workers", () => {
    expect(hook).toContain("export async function register()");
    expect(hook).toContain('NEXT_RUNTIME === "edge"');
    expect(hook).toContain('NEXT_PHASE === "phase-production-build"');
  });

  it("dynamically imports the seam (the standalone bundle traces it)", () => {
    expect(hook).toContain('import("./lib/boot-env")');
    expect(hook).toContain("applyBootEnvReport");
  });
});

describe("session-214 (F-214f): the in-app delivery warning (warn form — never fatal)", () => {
  it("production + both knobs unset: ONE warning naming BOTH knobs", () => {
    const report = bootEnvCheck(
      env({ NEO_DISABLE_IN_APP_OTP: undefined, NEO_DISABLE_IN_APP_RESET: undefined }),
    );
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("NEO_DISABLE_IN_APP_OTP");
    expect(report.warnings[0]).toContain("NEO_DISABLE_IN_APP_RESET");
  });

  it("production + both knobs at 1 (real mail transport): no warning", () => {
    const report = bootEnvCheck(env());
    expect(report.fatal).toBeNull();
    expect(report.warnings).toHaveLength(0);
  });

  it("production + one knob set, one unset: the warning still fires (half-disabled is half-exposed)", () => {
    const report = bootEnvCheck(env({ NEO_DISABLE_IN_APP_RESET: undefined }));
    expect(report.warnings).toHaveLength(1);
    expect(report.warnings[0]).toContain("In-app delivery");
  });

  it("development + knobs unset: NO warning (the demo DX posture unchanged)", () => {
    const report = bootEnvCheck(
      env({
        NODE_ENV: "development",
        NEO_DISABLE_IN_APP_OTP: undefined,
        NEO_DISABLE_IN_APP_RESET: undefined,
      }),
    );
    expect(report.warnings).toHaveLength(0);
    expect(report.fatal).toBeNull();
  });
});
