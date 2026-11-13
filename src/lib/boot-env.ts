// The boot gate (session-170, WP-3 — the scandihaven instrumentation.ts
// boot-validation port, recast in the house pure-seam form).
//
// WHY THIS EXISTS: the s169 production secret gate is a RUNTIME seam —
// secret() throws at the FIRST SESSION OP. A misconfigured production
// boot (missing/short AUTH_SECRET) still boots, serves every static
// page, and only explodes when the first user signs in. The
// web-app-foundation §6.2 posture + the scandihaven parseServerEnv
// pattern prescribe fail-fast AT BOOT: the server refuses to start with
// the actionable message. src/instrumentation.ts wires this seam into
// Next's register() hook — the throw crashes the standalone boot before
// the first request (verified live this round: "Failed to prepare
// server Error: An error occurred while loading instrumentation hook").
//
// THE PURE FORM (the house doctrine): bootEnvCheck takes an env-shaped
// record — no process access — and returns { fatal, warnings }.
// applyBootEnvReport applies it (the injectable logger prints the
// warnings; the fatal throws — the [boot] message family mirroring
// auth.ts's secret() throw, so the operator sees one vocabulary).
//
// WARN-THROW DISCIPLINE (the scandihaven posture): only the
// forgeable-sessions case is fatal. The metadata-family misconfig
// (NEXT_PUBLIC_SITE_URL) and the NEO_* toggle family warn — a bad
// toggle must never take a working deployment down, and dev/test boot
// SOFT (the DX posture unchanged: the DEV fallback stays documented in
// auth.ts; NODE_ENV !== "production" never fatals).

/** The closed NEO_* knob set (the six-knob contract's 3 server knobs). */
export const KNOWN_NEO_VARS: ReadonlySet<string> = new Set([
  "NEO_PROXY_HOPS",
  "NEO_DISABLE_IN_APP_OTP",
  "NEO_DISABLE_IN_APP_RESET",
]);

/** The values the NEO_DISABLE_* kill-switches actually read ("1" = disable). */
const DISABLE_KNOB_VALUES = new Set(["", "1"]);

export interface BootEnvReport {
  fatal: string | null;
  warnings: string[];
}

/**
 * Validate an env-shaped record against the six-knob contract.
 * PURE: same input, same report — tests drive every branch without a
 * process (tests/boot-env.test.ts).
 */
export function bootEnvCheck(env: Record<string, string | undefined>): BootEnvReport {
  const warnings: string[] = [];
  const isProduction = env.NODE_ENV === "production";

  // ---- AUTH_SECRET: the only FATAL (the forgeable-sessions case) ------
  const secret = env.AUTH_SECRET;
  if (isProduction && (!secret || secret.length < 16)) {
    return {
      fatal:
        "[boot] AUTH_SECRET is missing or shorter than 16 chars in production — sessions would be forgeable, so the server refuses to boot. Generate one with: openssl rand -hex 32 — then set AUTH_SECRET in the environment (or .env) and restart",
      warnings,
    };
  }

  // ---- NEXT_PUBLIC_SITE_URL: the advertised-origin family --------------
  const siteUrl = env.NEXT_PUBLIC_SITE_URL;
  if (isProduction && (!siteUrl || /localhost|127\.0\.0\.1/.test(siteUrl))) {
    warnings.push(
      `[boot] NEXT_PUBLIC_SITE_URL is ${
        siteUrl ? `"${siteUrl}"` : "unset"
      } in production — metadataBase, /robots.txt, /sitemap.xml and the OG/Twitter cards would advertise a localhost origin. Set the canonical public origin BEFORE \`bun run build\` (it is inlined at build time).`,
    );
  }

  // ---- The NEO_* family: the flag-typo guard (warn form) ----------------
  // Session-238 (R-35, F-238n): the guard reads the prefix alone — the
  // old second disjunct (a NODE_ENV equality check) was unreachable
  // dead code, same genus as the F-237q arm.
  for (const key of Object.keys(env)) {
    if (!key.startsWith("NEO_")) continue;
    if (!KNOWN_NEO_VARS.has(key)) {
      warnings.push(
        `[boot] Unknown NEO_* environment variable ${key} — the known knobs are: ${[...KNOWN_NEO_VARS].join(", ")}. A typo here silently no-ops (the closed set is read verbatim).`,
      );
    }
  }
  for (const key of ["NEO_DISABLE_IN_APP_OTP", "NEO_DISABLE_IN_APP_RESET"]) {
    const value = env[key];
    if (value !== undefined && !DISABLE_KNOB_VALUES.has(value)) {
      warnings.push(
        `[boot] ${key}="${value}" — only the empty string (unset: in-app delivery) and "1" (disable) are meaningful; every other value silently behaves as unset.`,
      );
    }
  }

  // ---- Session-214 (F-214f): the in-app delivery posture warning --------
  // The ADR-014 demo posture serves signup codes and single-use reset
  // links IN the HTTP response — a production deployment that forgets
  // the knobs hands a known email a working takeover vector. The two
  // knobs guard DIFFERENT channels (OTP: signup codes; RESET: reset
  // links), so the warning fires while EITHER is unset — half-disabled
  // is still half-exposed. WARN, never fatal (the warn-throw
  // discipline: a bad toggle must not take a working deployment down —
  // the self-hosted no-mail flow stays functional); the warning makes
  // the posture visible at boot instead of living only in the docs.
  if (
    isProduction &&
    (env.NEO_DISABLE_IN_APP_OTP !== "1" || env.NEO_DISABLE_IN_APP_RESET !== "1")
  ) {
    warnings.push(
      "[boot] In-app delivery of the signup code and the reset link is ENABLED in production — the responses carry them (the self-hosted demo posture; ADR-014). Anyone who knows a user's email can read a single-use reset link from the forgot-password response. For real deployments set NEO_DISABLE_IN_APP_OTP=1 and NEO_DISABLE_IN_APP_RESET=1 and let a mail transport own the delivery.",
    );
  }

  const hops = env.NEO_PROXY_HOPS;
  if (hops !== undefined && hops !== "" && !/^\d+$/.test(hops)) {
    warnings.push(
      `[boot] NEO_PROXY_HOPS="${hops}" is unparsable — the rate-limit seam fails CLOSED onto hop 1 (a bad value never widens trust); fix the value to unset, 0, or an N ≥ 1.`,
    );
  }

  // ---- Session-218 (R-15, F-218t): the default-ride warning ----------
  // Unset NEO_PROXY_HOPS defaults the limiter to depth 1 — it keys on
  // the LAST X-Forwarded-For hop (the one an appending proxy writes).
  // That is correct behind exactly one proxy but client-SUPPLIABLE on
  // a direct-exposure deployment (the DEPLOYMENT.md §2 `bun run start`
  // path): a rotating XFF header rotates the buckets and bypasses
  // every rate limit. The default stays 1 (flipping it would share
  // one "unknown" bucket across every user behind an unconfigured
  // proxy — the mass-lockout trade is worse); the warning names the
  // knob so a direct-exposure operator sets it explicitly.
  if (isProduction && (hops === undefined || hops === "")) {
    warnings.push(
      // Session-221 (R-18, F-221t): the warning names BOTH client-
      // suppliable headers — the limiter falls back to X-Real-IP when
      // X-Forwarded-For is absent, so omitting XFF and rotating
      // X-Real-IP rotates the buckets exactly the same way (the
      // unnamed half of F-218t).
      "[boot] NEO_PROXY_HOPS is unset — the rate limiter assumes ONE trusted proxy and keys on the last X-Forwarded-For hop (falling back to X-Real-IP when XFF is absent — both are client-suppliable without a proxy). On a DIRECT-exposure deployment (no reverse proxy) a client can rotate those headers to bypass every rate limit: set NEO_PROXY_HOPS=0 (one honest shared bucket). Behind a proxy, set the hop depth explicitly.",
    );
  }

  return { fatal: null, warnings };
}

/**
 * Apply a report: print each warning via the injectable logger, throw
 * the fatal. Called from src/instrumentation.ts's register() (and from
 * tests with logger/report doubles).
 */
export function applyBootEnvReport(
  report: BootEnvReport,
  deps: { logger?: Pick<Console, "warn"> } = {},
): void {
  const logger = deps.logger ?? console;
  for (const warning of report.warnings) logger.warn(warning);
  if (report.fatal !== null) throw new Error(report.fatal);
}
