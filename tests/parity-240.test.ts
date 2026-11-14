import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-240 (R-37): the source-tier pins for the revocation-signal,
// signup-ceiling, and form-seam round. Every pin was born RED over the
// pre-cure tree (the F-240 ledger rows in docs/remediation_plan_v2.md
// carry the verified evidence). Source-scanning contracts per the house
// convention: read the file, assert the contract.

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

describe("F-240a — every 401 arm keys on the live user, not the entry token", () => {
  it("refreshAll's 401 arm is hoisted above the combined token+sequence guard", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("async function refreshAll(");
    expect(start).toBeGreaterThan(-1);
    // The wrapper's declaration is generic — match through the type
    // parameter, not the bare call-form paren.
    const end = src.indexOf("async function mutate<T>(", start);
    expect(end).toBeGreaterThan(start);
    const body = src.slice(start, end);
    // A live-session 401 discarded on the SEQUENCE dimension alone left
    // a fresher-seq pre-revocation 200 committing the old user's ledger
    // over the live store (the F-239a threat model through the sequence
    // dimension). The arm must sit ABOVE the combined guard and key on
    // the live user — the wall and the logout are the only clear-owners
    // that null the user, so user-standing means no deliberate clear
    // owns the face and a 401 always walls.
    const armIndex = body.indexOf('res.code === "UNAUTHORIZED"');
    expect(armIndex).toBeGreaterThan(-1);
    const guardIndex = body.indexOf(
      "if (token !== sessionWriteToken || seq !== refreshSeq) return res;",
    );
    expect(guardIndex).toBeGreaterThan(-1);
    expect(armIndex).toBeLessThan(guardIndex);
    expect(body.slice(armIndex, guardIndex)).toContain("get().user !== null");
    // The arm commits the wall (not just the error face).
    const armBlock = body.slice(armIndex, body.indexOf("return res;", armIndex));
    expect(armBlock).toContain("commitRevocationWall(set)");
  });

  it("refreshAll keeps the combined guard for the SUCCESS arm (the last-request-wins contract)", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("async function refreshAll(");
    const end = src.indexOf("async function mutate<T>(", start);
    const body = src.slice(start, end);
    // The sequence guard's own job (F-220l — two quick mutations
    // resolving out of order) is untouched: only the 401 arm moved
    // above it.
    expect(body).toContain(
      "if (token !== sessionWriteToken || seq !== refreshSeq) return res;",
    );
  });

  it("refreshAll and mutate carry the get parameter (the live-user key's carrier)", () => {
    const src = read("src/stores/wealthos-store.ts");
    expect(src).toMatch(
      /async function refreshAll\(\s*token: number,\s*set: \(partial: Partial<WealthOsState>\) => void,\s*get: \(\) => WealthOsState,?\s*\)/,
    );
    expect(src).toMatch(
      /async function mutate<T>\(\s*path: string,\s*init: RequestInit,\s*set: \(partial: Partial<WealthOsState>\) => void,\s*get: \(\) => WealthOsState,?\s*\)/,
    );
  });

  it("mutate's 401 arm keys on the live user (the F-217l logout contract preserved)", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("async function mutate<T>(");
    const end = src.indexOf("function createStore()", start);
    const body = src.slice(start, end);
    // A refresh's own ENTRY bump stales mutate's captured token without
    // any clear happening — the mutation POST's 401 must still wall
    // while the user stands. The logout contract survives the re-key:
    // logout nulls the user before the late landing can check.
    const arm = body.indexOf('res.code === "UNAUTHORIZED"');
    expect(arm).toBeGreaterThan(-1);
    const armBlock = body.slice(arm, body.indexOf("return res;", arm));
    expect(armBlock).toContain("get().user !== null");
    expect(armBlock).toContain("commitRevocationWall(set)");
    // The stale-token mutation landing must NOT reach the arm's wall
    // once the logout cleared (user null) — the token equality form is
    // retired from this arm.
    expect(armBlock).not.toContain("token === sessionWriteToken");
  });

  it("updateSettings' and askCoach's inline 401 arms key on the live user", () => {
    const src = read("src/stores/wealthos-store.ts");
    for (const anchor of ["updateSettings: async", "askCoach: async"]) {
      const start = src.indexOf(anchor);
      expect(start).toBeGreaterThan(-1);
      const end = src.indexOf("},", src.indexOf("return res;", start));
      const body = src.slice(start, end);
      const arm = body.indexOf('res.code === "UNAUTHORIZED"');
      expect(arm).toBeGreaterThan(-1);
      const armBlock = body.slice(arm, body.indexOf("return res;", arm));
      expect(armBlock).toContain("get().user !== null");
      expect(armBlock).not.toContain("token === sessionWriteToken");
    }
  });

  it("hydrate's dashboard 401 arm is hoisted above the entry-token guard", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("hydrate: async () => {");
    expect(start).toBeGreaterThan(-1);
    const end = src.indexOf("logout: async", start);
    const body = src.slice(start, end);
    // The user-or-fresh-token condition: a standing user's 401 walls
    // even when a concurrent refresh staled the entry token; a
    // first-load 401 (user null, fresh token) still walls; a 401 under
    // a deliberate clear (user null, stale token) still skips.
    const arm = body.indexOf('res.code === "UNAUTHORIZED"');
    expect(arm).toBeGreaterThan(-1);
    const guard = body.indexOf("if (token !== sessionWriteToken) return;");
    expect(guard).toBeGreaterThan(-1);
    expect(arm).toBeLessThan(guard);
    const armBlock = body.slice(arm, guard);
    expect(armBlock).toContain("get().user !== null");
    expect(armBlock).toContain("token === sessionWriteToken");
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
    expect(arm).toContain("get().user !== null");
    expect(arm).toContain("commitRevocationWall(set)");
    // The F-234a settled contract survives for NON-auth failures: the
    // settled flag still flips in the non-401 arm.
    const settledArm = tail.slice(tail.indexOf("settingsSettled: true"));
    expect(settledArm.length).toBeGreaterThan(0);
    expect(tail.indexOf("settingsSettled: true")).toBeGreaterThan(-1);
  });
});

// ---- F-240c: the signup process ceiling --------------------------------------------

describe("F-240c — the signup POST carries an IP-independent process ceiling", () => {
  it("a non-IP-keyed global bucket rides beside the per-IP one", () => {
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
    expect(head).toMatch(/rateLimit\(\s*"signup:/);
    // The ceiling's limit sits above the e2e battery's ten-signup
    // budget (retries: 0 — the F-229a census).
    const globalCall = head.match(/rateLimit\(\s*"signup:[^"]*",\s*(\d+)/);
    expect(globalCall).not.toBeNull();
    expect(Number(globalCall![1])).toBeGreaterThanOrEqual(20);
    // Both denials answer the family's 429 envelope.
    const postSweep = src.slice(
      src.indexOf("sweepRateLimits()", start),
      src.indexOf("const parsed", start),
    );
    expect(postSweep).toContain("ERR.RATE_LIMITED(limit.retryAfterSec)");
    expect(postSweep.match(/RATE_LIMITED/g)?.length).toBe(2);
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
    expect(docblock).not.toContain("no gap class");
    expect(docblock).toMatch(/gap/i);
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
