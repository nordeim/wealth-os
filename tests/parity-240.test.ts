import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-240 (R-37): the source-tier pins for the revocation-signal,
// signup-ceiling, and form-seam round. Every pin was born RED over the
// pre-cure tree (the F-240 ledger rows in docs/remediation_plan_v2.md
// carry the verified evidence). Source-scanning contracts per the house
// convention: read the file, assert the contract.
//
// Session-241 (R-38, F-241a/b/g): the same-commit recalibrations — the
// 401 arms re-keyed from the live user to the CLEAR-ERA match (the
// F-241a cure: the era key restores the cross-era contract the
// live-user form lost), the signup ceiling moved to the creation path
// under the hyphenated key (F-241b — its exact form now pinned), the
// get carrier retired from the helpers (the era key reads module
// state), and the F-240b no-op assertion repaired (F-241g).

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
}

function listSrcFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) out.push(...listSrcFiles(p));
    else if (/\.(tsx?|css)$/.test(name)) out.push(p);
  }
  return out;
}

// ---- F-240a: the user-keyed 401 arms -------------------------------------------

describe("F-240a — every 401 arm keys on the clear era (the R-38 recalibration of the live-user key)", () => {
  it("refreshAll's 401 arm is hoisted above the combined token+sequence guard", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("async function refreshAll(");
    expect(start).toBeGreaterThan(-1);
    // The wrapper's declaration is generic — match through the type
    // parameter, not the bare call-form paren.
    const end = src.indexOf("async function mutate", start);
    expect(end).toBeGreaterThan(start);
    const body = src.slice(start, end);
    // A live-session 401 discarded on the SEQUENCE dimension alone left
    // a fresher-seq pre-revocation 200 committing the old user's ledger
    // over the live store (the F-239a threat model through the sequence
    // dimension). The arm must sit ABOVE the combined guard; its key is
    // the CLEAR-ERA match (session 241: the live-user form could not
    // distinguish "no deliberate clear owns the face" from "a clear
    // happened and a new session owns it").
    const armIndex = body.indexOf('res.code === "UNAUTHORIZED"');
    expect(armIndex).toBeGreaterThan(-1);
    const guardIndex = body.indexOf(
      "if (token !== sessionWriteToken || seq !== refreshSeq) return res;",
    );
    expect(guardIndex).toBeGreaterThan(-1);
    expect(armIndex).toBeLessThan(guardIndex);
    expect(body.slice(armIndex, guardIndex)).toContain("sessionClearSeq === entryClearSeq");
    // The arm commits the wall (not just the error face).
    const armBlock = body.slice(armIndex, body.indexOf("return res;", armIndex));
    expect(armBlock).toContain("commitRevocationWall(set)");
  });

  it("refreshAll keeps the combined guard for the SUCCESS arm (the last-request-wins contract)", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("async function refreshAll(");
    const end = src.indexOf("async function mutate", start);
    const body = src.slice(start, end);
    // The sequence guard's own job (F-220l — two quick mutations
    // resolving out of order) is untouched: only the 401 arm moved
    // above it.
    expect(body).toContain(
      "if (token !== sessionWriteToken || seq !== refreshSeq) return res;",
    );
  });

  it("the helpers' signatures carry the set carrier (the R-38 recalibration: the get carrier retired with the live-user key)", () => {
    const src = read("src/stores/wealthos-store.ts");
    // Session-241 (R-38): the era key reads module state — the get
    // param R-37 added for the live-user read became dead weight and
    // retired with the same-commit call-site sweep.
    expect(src).toMatch(
      /async function refreshAll\(\s*token: number,\s*set: \(partial: Partial<WealthOsState>\) => void,?\s*\)/,
    );
    expect(src).toMatch(
      /async function mutate<T>\(\s*path: string,\s*init: RequestInit,\s*set: \(partial: Partial<WealthOsState>\) => void,?\s*\)/,
    );
    expect(src).not.toMatch(/refreshAll\(token, set, get\)/);
  });

  it("mutate's 401 arm keys on the clear era (the F-217l logout contract preserved)", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("async function mutate");
    const end = src.indexOf("function createStore()", start);
    const body = src.slice(start, end);
    // A concurrent hydrate's own ENTRY bump stales mutate's captured
    // token without any clear happening — the mutation POST's 401 must
    // still wall (the era is unchanged). The logout contract survives
    // the re-key: logout advances the era at entry, before the late
    // landing can check.
    const arm = body.indexOf('res.code === "UNAUTHORIZED"');
    expect(arm).toBeGreaterThan(-1);
    const armBlock = body.slice(arm, body.indexOf("return res;", arm));
    expect(armBlock).toContain("sessionClearSeq === entryClearSeq");
    expect(armBlock).toContain("commitRevocationWall(set)");
    // The stale-era mutation landing must NOT reach the arm's wall
    // once the clear advanced the era — the token equality form is
    // retired from this arm.
    expect(armBlock).not.toContain("token === sessionWriteToken");
  });

  it("updateSettings' and askCoach's inline 401 arms key on the clear era", () => {
    const src = read("src/stores/wealthos-store.ts");
    for (const anchor of ["updateSettings: async", "askCoach: async"]) {
      const start = src.indexOf(anchor);
      expect(start).toBeGreaterThan(-1);
      const end = src.indexOf("},", src.indexOf("return res;", start));
      const body = src.slice(start, end);
      const arm = body.indexOf('res.code === "UNAUTHORIZED"');
      expect(arm).toBeGreaterThan(-1);
      const armBlock = body.slice(arm, body.indexOf("return res;", arm));
      expect(armBlock).toContain("sessionClearSeq === entryClearSeq");
      expect(armBlock).not.toContain("token === sessionWriteToken");
    }
  });

  it("hydrate's dashboard 401 arm is hoisted above the entry-token guard", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("hydrate: async () => {");
    expect(start).toBeGreaterThan(-1);
    const end = src.indexOf("logout: async", start);
    const body = src.slice(start, end);
    // Session-241 (R-38): the era match — a standing user's 401 walls
    // even when a concurrent refresh staled the entry token; a
    // first-load 401 walls by the same match (nothing cleared since
    // the fetch was issued); a 401 under a deliberate clear is
    // era-stale and skips.
    const arm = body.indexOf('res.code === "UNAUTHORIZED"');
    expect(arm).toBeGreaterThan(-1);
    const guard = body.indexOf("if (token !== sessionWriteToken) return;");
    expect(guard).toBeGreaterThan(-1);
    expect(arm).toBeLessThan(guard);
    const armBlock = body.slice(arm, guard);
    expect(armBlock).toContain("sessionClearSeq === entryClearSeq");
    expect(armBlock).toContain("commitRevocationWall(set, { hydrated: true })");
  });
});

// ---- F-240b: the hydrate settings-tail wall --------------------------------------

describe("F-240b — the hydrate settings-tail 401 walls instead of settling the amber face", () => {
  it("the settings tail branches on UNAUTHORIZED behind the live-user key", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("hydrate: async () => {");
    const end = src.indexOf("logout: async", start);
    const body = src.slice(start, end);
    const tail = body.slice(body.indexOf('call<Settings>("/api/settings")'));
    // A revocation landing between hydrate's two calls (the dashboard
    // 200 predated it, the settings GET postdated it) must wall — not
    // settle the amber could-not-load face over the revoked user.
    expect(tail).toContain('settingsRes.code === "UNAUTHORIZED"');
    const arm = tail.slice(
      tail.indexOf('settingsRes.code === "UNAUTHORIZED"'),
      tail.indexOf("}", tail.indexOf("commitRevocationWall", tail.indexOf('settingsRes.code === "UNAUTHORIZED"'))) + 1,
    );
    expect(arm).toContain("sessionClearSeq === entryClearSeq");
    expect(arm).toContain("commitRevocationWall(set)");
    // The F-234a settled contract survives for NON-auth failures: the
    // settled flag still flips in the non-401 arm. (Session-241,
    // F-241g: the first draft's slice-of-indexOf was a NO-OP — an
    // absent target made indexOf return −1 and slice(−1) yield the
    // last character, so the length assertion could never fail
    // independently; the indexOf assertion below is the real pin.)
    expect(tail.indexOf("settingsSettled: true")).toBeGreaterThan(-1);
  });
});

// ---- F-240c: the signup process ceiling --------------------------------------------

describe("F-240c — the signup POST carries an IP-independent process ceiling (the R-38 creation-path recalibration)", () => {
  it("a non-IP-keyed global bucket rides the creation path beside the per-IP one", () => {
    const src = read("src/app/api/auth/signup/route.ts");
    const start = src.indexOf("export async function POST");
    expect(start).toBeGreaterThan(-1);
    const head = src.slice(start, src.indexOf("sweepRateLimits()", start));
    // The per-IP key is voidable under the documented default
    // direct-exposure posture (client-suppliable XFF); each successful
    // signup creates persistent state and burns two scrypts. The
    // process-level ceiling is keyed WITHOUT the IP — the uploads
    // family's capacity precedent.
    expect(head).toMatch(/rateLimit\(`signup:\$\{clientKey\(req\)\}`/);
    // Session-241 (R-38, F-241b): the ceiling moved to the CREATION
    // path — the entry form counted every attempt (ten per-IP-DENIED
    // requests saturated it app-wide) and its colon-carried key was
    // client-mintable. The head now carries ONLY the per-IP call.
    expect(head.match(/rateLimit\(/g)?.length).toBe(1);
    // The exact 20-per-15-minute form, on the creation path (after the
    // duplicate-email early-return, before the double scrypt) under
    // the hyphenated, collision-free key. The R-37 pin asserted only
    // ≥20 with the window unpinned — a 20/1min regression passed.
    expect(src).toContain(
      'rateLimit("signup-process-ceiling", 20, 15 * 60 * 1000)',
    );
    const ceiling = src.indexOf('rateLimit("signup-process-ceiling"');
    const dup = src.indexOf("A user with this email already exists", start);
    const scrypt = src.indexOf("await hashPassword", start);
    expect(dup).toBeLessThan(ceiling);
    expect(ceiling).toBeLessThan(scrypt);
    // Both denials answer the family's 429 envelope with their own
    // Retry-After.
    expect(src).toContain("ERR.RATE_LIMITED(limit.retryAfterSec)");
    expect(src).toContain("ERR.RATE_LIMITED(totalLimit.retryAfterSec)");
  });
});

// ---- F-240d: the FORM_INPUT seam ---------------------------------------------------

describe("F-240d — the section-page form-input literal rides the shared seam", () => {
  it("page-layout.ts exports the constant", () => {
    const src = read("src/lib/page-layout.ts");
    // The F-232a retirement note sanctioned the re-entry: reintroduce
    // WITH a consumer. The constant's value is the exact byte string
    // the sixteen sites carried (the sweeps compare pixels, and the
    // swap must compute identically).
    expect(src).toMatch(/export const FORM_INPUT =/);
    expect(src).toContain(
      '"h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"',
    );
  });

  it("all six section pages consume the constant (the re-entry rule's consumer half)", () => {
    for (const page of [
      "income",
      "expenses",
      "accounts",
      "investments",
      "goals",
      "settings",
    ]) {
      const src = read(`src/app/(app)/${page}/page.tsx`);
      expect(src).toContain("FORM_INPUT");
    }
  });

  it("zero bare copies of the literal remain in src (the divergence point is closed)", () => {
    // Walk src/ the way the whole-tree invariants do; any surviving
    // paste (a comment carrier included — the F-229d discipline) fails
    // this pin. The seam's own definition in page-layout.ts is the one
    // sanctioned carrier and is skipped.
    const literal =
      "h-10 w-full rounded-lg border border-stone-200 bg-white px-3";
    for (const f of listSrcFiles(
      path.resolve(import.meta.dirname, "..", "src"),
    )) {
      if (f.endsWith(path.join("src", "lib", "page-layout.ts"))) continue;
      const src = readFileSync(f, "utf8");
      expect(src.includes(literal), `${f} still carries the bare literal`).toBe(
        false,
      );
    }
  });
});

// ---- F-240e: the DialogFooter docblock truth -----------------------------------------

describe("F-240e — the DialogFooter docblock describes the constant it documents", () => {
  it("the no-gap claim is gone; the gap superset is named in words", () => {
    const src = read("src/components/ui/dialog.tsx");
    const start = src.indexOf("function DialogFooter(");
    const end = src.indexOf("return", start);
    const docblock = src.slice(start, end);
    // Pre-cure the comment claimed the stock no-gap form while the
    // constant carried the gap superset at every width — the F-232b
    // mis-audit genus. The reword describes the actual construction.
    // (Session-241, F-241g: the anchor names the construction phrase,
    // not any gap mention.)
    expect(docblock).not.toContain("no gap class");
    expect(docblock).toMatch(/gap superset|8px gap/i);
  });
});

// ---- F-240i: the verify lockout equalizer --------------------------------------------

describe("F-240i — the verify route's lockout arm joins the timing-equalizer family", () => {
  it("both the miss arm and the locked arm burn the equalizer", () => {
    const src = read("src/app/api/auth/verify/route.ts");
    // Every other arm of the verify/resend/login family burns one
    // scrypt shape; the locked arm's ~0 ms 429 beside the miss arm's
    // ~28 ms 400 was the family's one uncovered arm (zero marginal
    // disclosure today — the status and text already distinguish —
    // but the latency channel closes with the burn).
    const burns = src.match(
      /await verifyVerificationCode\(code, await timingEqualizerHash\(\)\)/g,
    );
    expect(burns).not.toBeNull();
    expect(burns!.length).toBe(2);
    // The locked branch carries its burn BEFORE its 429. Anchor on the
    // actual fail CALL — the state's name also appears in the arm's
    // rationale comment above the branch, which an indexOf anchored on
    // the bare string would find first (the F-239e authoring lesson).
    const lockedCall = src.indexOf('fail("VERIFICATION_LOCKED"');
    expect(lockedCall).toBeGreaterThan(-1);
    const branchStart = src.lastIndexOf("isVerificationLockedOut(", lockedCall);
    expect(branchStart).toBeGreaterThan(-1);
    const branchBlock = src.slice(branchStart, lockedCall);
    expect(branchBlock).toContain(
      "await verifyVerificationCode(code, await timingEqualizerHash())",
    );
  });
});

// F-240h lives in tests/parity-239.test.ts (the F-239g pin's own
// forbidden set — the bulk form joins the single-record form there).
