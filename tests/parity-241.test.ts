import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-241 (R-38): the source-tier pins for the clear-era,
// creation-path, and seam-completion round. Every pin was born RED over
// the pre-cure tree (the F-241 ledger rows in docs/remediation_plan_v2.md
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

// ---- F-241a: the clear-era key ------------------------------------------------

describe("F-241a — every 401 arm keys on the clear era, not the live user", () => {
  it("the module carries the clear-era counter beside the write token", () => {
    const src = read("src/stores/wealthos-store.ts");
    // The era discriminator: user-standing cannot distinguish "no
    // deliberate clear owns the face" from "a clear happened and a NEW
    // session now owns it" — the era counter can. It advances ONLY on
    // deliberate clears (the wall's commit, logout's entry).
    expect(src).toMatch(/let sessionClearSeq = 0;/);
  });

  it("commitRevocationWall advances the era beside the write token", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("function commitRevocationWall(");
    expect(start).toBeGreaterThan(-1);
    const body = src.slice(start, start + 2400);
    const tokenBump = body.indexOf("sessionWriteToken += 1;");
    expect(tokenBump).toBeGreaterThan(-1);
    const eraBump = body.indexOf("sessionClearSeq += 1;");
    expect(eraBump).toBeGreaterThan(-1);
    // Both bumps ride the wall's commit — the wall is a deliberate
    // clear, so every 401 arm keyed on a pre-wall entry discards its
    // late landing (the cross-era contract).
    expect(Math.abs(tokenBump - eraBump)).toBeLessThan(200);
  });

  it("logout advances the era at ENTRY — before the POST await", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("logout: async (): Promise<boolean> => {");
    expect(start).toBeGreaterThan(-1);
    const post = src.indexOf('call("/api/auth/logout"', start);
    expect(post).toBeGreaterThan(start);
    const entry = src.slice(start, post);
    expect(entry).toContain("sessionClearSeq += 1;");
    // The clear-intent bump rides the ENTRY (beside the token bump),
    // so a 401 landing inside the POST window is era-stale and the
    // clear completes — the mid-logout leg's cure.
    expect(entry).toContain("++sessionWriteToken");
  });

  it("hydrate's entry bump does NOT advance the era (the F-240a requirement preserved)", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("hydrate: async () => {");
    expect(start).toBeGreaterThan(-1);
    const entry = src.slice(start, src.indexOf("const remount", start));
    // Hydrate is the non-clearing bumper: its entry bump stales the
    // TOKEN (the R-37 genus) but must leave the ERA untouched, or the
    // concurrent-hydrate 401s the R-37 round cured would go stale too.
    expect(entry).toContain("++sessionWriteToken");
    expect(entry).not.toContain("sessionClearSeq += 1");
  });

  it("refreshAll's 401 arm keys on the era match, above the combined guard", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("async function refreshAll(");
    expect(start).toBeGreaterThan(-1);
    const end = src.indexOf("async function mutate", start);
    const body = src.slice(start, end);
    // The entry capture rides the fetch, not the landing.
    expect(body).toContain("const entryClearSeq = sessionClearSeq;");
    const armIndex = body.indexOf('res.code === "UNAUTHORIZED"');
    expect(armIndex).toBeGreaterThan(-1);
    const guardIndex = body.indexOf(
      "if (token !== sessionWriteToken || seq !== refreshSeq) return res;",
    );
    expect(guardIndex).toBeGreaterThan(-1);
    expect(armIndex).toBeLessThan(guardIndex);
    const armBlock = body.slice(armIndex, body.indexOf("return res;", armIndex));
    expect(armBlock).toContain("sessionClearSeq === entryClearSeq");
    expect(armBlock).toContain("commitRevocationWall(set)");
    // The live-user key is retired from the arm (the error-face leg:
    // user-null with no clear owning the face must still wall).
    expect(armBlock).not.toContain("get().user !== null");
  });

  it("mutate's 401 arm keys on the era match", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("async function mutate");
    expect(start).toBeGreaterThan(-1);
    const end = src.indexOf("function createStore()", start);
    const body = src.slice(start, end);
    expect(body).toContain("const entryClearSeq = sessionClearSeq;");
    const arm = body.indexOf('res.code === "UNAUTHORIZED"');
    expect(arm).toBeGreaterThan(-1);
    const armBlock = body.slice(arm, body.indexOf("return res;", arm));
    expect(armBlock).toContain("sessionClearSeq === entryClearSeq");
    expect(armBlock).toContain("commitRevocationWall(set)");
    expect(armBlock).not.toContain("get().user !== null");
  });

  it("hydrate's dashboard 401 arm keys on the era match — the fresh-token disjunct is retired", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("hydrate: async () => {");
    const end = src.indexOf("logout: async", start);
    const body = src.slice(start, end);
    expect(body).toContain("const entryClearSeq = sessionClearSeq;");
    const arm = body.indexOf('res.code === "UNAUTHORIZED"');
    expect(arm).toBeGreaterThan(-1);
    const guard = body.indexOf("if (token !== sessionWriteToken) return;");
    expect(guard).toBeGreaterThan(-1);
    expect(arm).toBeLessThan(guard);
    const armBlock = body.slice(arm, guard);
    expect(armBlock).toContain("sessionClearSeq === entryClearSeq");
    expect(armBlock).toContain("commitRevocationWall(set, { hydrated: true })");
    // The disjunct is SUBSUMED: a first-load 401 walls by era-match
    // (nothing cleared since the fetch was issued); the token form's
    // first-load twin hole (the entry bump of a concurrent hydrate)
    // closes with it.
    expect(armBlock).not.toContain("token === sessionWriteToken");
    expect(armBlock).not.toContain("get().user !== null");
  });

  it("hydrate's settings-tail 401 arm keys on the era match", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("hydrate: async () => {");
    const end = src.indexOf("logout: async", start);
    const body = src.slice(start, end);
    const tail = body.slice(body.indexOf('call<Settings>("/api/settings")'));
    expect(tail).toContain('settingsRes.code === "UNAUTHORIZED"');
    const arm = tail.slice(
      tail.indexOf('settingsRes.code === "UNAUTHORIZED"'),
      tail.indexOf("}", tail.indexOf("commitRevocationWall", tail.indexOf('settingsRes.code === "UNAUTHORIZED"'))) + 1,
    );
    expect(arm).toContain("sessionClearSeq === entryClearSeq");
    expect(arm).toContain("commitRevocationWall(set)");
    expect(arm).not.toContain("get().user !== null");
  });

  it("updateSettings' and askCoach's inline 401 arms key on the era match", () => {
    const src = read("src/stores/wealthos-store.ts");
    for (const anchor of ["updateSettings: async", "askCoach: async"]) {
      const start = src.indexOf(anchor);
      expect(start).toBeGreaterThan(-1);
      const end = src.indexOf("},", src.indexOf("return res;", start));
      const body = src.slice(start, end);
      expect(body).toContain("const entryClearSeq = sessionClearSeq;");
      const arm = body.indexOf('res.code === "UNAUTHORIZED"');
      expect(arm).toBeGreaterThan(-1);
      const armBlock = body.slice(arm, body.indexOf("return res;", arm));
      expect(armBlock).toContain("sessionClearSeq === entryClearSeq");
      expect(armBlock).toContain("commitRevocationWall(set)");
      expect(armBlock).not.toContain("get().user !== null");
    }
  });

  it("askCoach's dead token capture is gone and its docblock names the era contract", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("askCoach: async");
    const end = src.indexOf("},", src.indexOf("return res;", start));
    const body = src.slice(start, end);
    // Pre-cure the R-37 re-key left the captured token DEAD (its only
    // consumer was the removed guard) while the docblock still claimed
    // the cross-era protection the code no longer provided. The era key
    // restores the claim and the dead capture retires.
    expect(body).not.toMatch(/const token = sessionWriteToken/);
    expect(body).toMatch(/era/i);
  });

  it("the helpers' dead get carrier is retired (the era key's only consumer of it removed)", () => {
    const src = read("src/stores/wealthos-store.ts");
    // R-37 added the get param for the live-user read; the era key
    // reads module state, so the carrier is dead weight on both
    // helpers — retired with the same-commit call-site sweep (the
    // parity-217/238 carrier pins recalibrated in this commit). The
    // two banned forms are the helper call sites' exact shapes — the
    // store's own create signature keeps its (set, get) pair (the
    // remount discriminator still reads get()).
    expect(src).not.toContain("token, set, get");
    expect(src).not.toContain("}, set, get");
  });

  it("the app-shell Try-again button carries the in-flight busy guard", () => {
    const src = read("src/components/layout/app-shell.tsx");
    // Anchor on the LAST void-hydrate call (the F-239e lesson: the
    // mount effect's own call and the button's label both appear
    // earlier in the file — the button's onClick is the last one).
    const start = src.lastIndexOf("void hydrate()");
    expect(start).toBeGreaterThan(-1);
    const button = src.slice(src.lastIndexOf("<button", start), src.indexOf("</button>", start));
    // The double-click twin vector (two concurrent first-load
    // hydrates) closes at the UI seam too: the loading gate the retry
    // re-arms doubles as the busy guard.
    expect(button).toContain("disabled={loading}");
  });
});

// ---- F-241b: the signup creation-path ceiling ----------------------------------

describe("F-241b — the signup process ceiling rides the creation path", () => {
  it("the ceiling call sits after the body parse and the duplicate check, before the scrypt work", () => {
    const src = read("src/app/api/auth/signup/route.ts");
    const start = src.indexOf("export async function POST");
    expect(start).toBeGreaterThan(-1);
    const parse = src.indexOf("const parsed = await parseBody", start);
    const dup = src.indexOf("A user with this email already exists", start);
    const ceiling = src.indexOf('rateLimit("signup-process-ceiling"');
    const scrypt = src.indexOf("await hashPassword", start);
    for (const at of [parse, dup, ceiling, scrypt]) expect(at).toBeGreaterThan(-1);
    // The R-37 entry form counted every attempt that reached the
    // handler — ten per-IP-DENIED requests from one client saturated
    // the global bucket and blocked every signup app-wide. The
    // creation-path placement counts only fresh-email creation
    // attempts: junk bodies and duplicate-email floods consume nothing.
    expect(parse).toBeLessThan(ceiling);
    expect(dup).toBeLessThan(ceiling);
    expect(ceiling).toBeLessThan(scrypt);
  });

  it("the head carries ONLY the per-IP bucket (the global call is not at the entry)", () => {
    const src = read("src/app/api/auth/signup/route.ts");
    const start = src.indexOf("export async function POST");
    const head = src.slice(start, src.indexOf("sweepRateLimits()", start));
    expect(head).toMatch(/rateLimit\(`signup:\$\{clientKey\(req\)\}`/);
    // The pre-cure head matched a second rateLimit call before the
    // sweep — the entry-form ceiling this round moved.
    expect(head.match(/rateLimit\(/g)?.length).toBe(1);
  });

  it("the exact 20-per-15-minute form (the R-37 pin asserted only ≥20, window unpinned)", () => {
    const src = read("src/app/api/auth/signup/route.ts");
    // 2x the e2e battery's ten-signup budget, at the family's window.
    expect(src).toContain('rateLimit("signup-process-ceiling", 20, 15 * 60 * 1000)');
    // The denial answers the family's 429 envelope with the ceiling's
    // own Retry-After.
    const ceiling = src.indexOf('rateLimit("signup-process-ceiling"');
    const denial = src.indexOf("ERR.RATE_LIMITED(totalLimit.retryAfterSec)", ceiling);
    expect(denial).toBeGreaterThan(-1);
    expect(denial - ceiling).toBeLessThan(400);
  });

  it("the ceiling key is unreachable from the client-mintable per-IP keyspace", () => {
    const src = read("src/app/api/auth/signup/route.ts");
    // The per-IP keys are always `signup:<hop>` (a colon follows the
    // family prefix); the pre-cure key "signup:process" was EXACTLY
    // mintable from a client-supplied XFF hop. The hyphenated form
    // cannot collide with any per-IP key.
    expect(src).not.toContain('"signup:process"');
    expect(src).toContain('"signup-process-ceiling"');
  });
});

// ---- F-241c: the limiter's cardinality cap --------------------------------------

describe("F-241c — the buckets map carries a fail-closed cardinality cap", () => {
  it("the cap constant and the overflow bucket exist", () => {
    const src = read("src/lib/rate-limit.ts");
    expect(src).toMatch(/const MAX_BUCKETS = 10_000;/);
    expect(src).toMatch(/const OVERFLOW_KEY = "/);
  });

  it("a fresh key arriving at cap routes to the shared overflow bucket", () => {
    const src = read("src/lib/rate-limit.ts");
    const start = src.indexOf("export function rateLimit(");
    expect(start).toBeGreaterThan(-1);
    const body = src.slice(start, src.indexOf("export function clientKey", start));
    // The per-account buckets mint unbounded in-memory keys on the
    // unauthenticated routes (caller-supplied emails); the cap bounds
    // the map and the overflow bucket keeps the degradation
    // fail-closed — existing keys keep their own buckets and count
    // normally; only FRESH keys at cap share.
    expect(body).toContain("buckets.size >= MAX_BUCKETS");
    expect(body).toMatch(/OVERFLOW_KEY/);
  });
});

// ---- F-241d: the P2025 arms on the auth writers ---------------------------------

describe("F-241d — the auth writers answer the vanished-row forms", () => {
  it("verify's catch carries the isRecordNotFound arm (the no-enumeration miss answer)", () => {
    const src = read("src/app/api/auth/verify/route.ts");
    const start = src.indexOf("} catch (error) {");
    expect(start).toBeGreaterThan(-1);
    const tail = src.slice(start);
    expect(tail).toContain("isRecordNotFound(error)");
    // The arm answers the miss arm's own no-enumeration form — a
    // vanished row IS a miss (never the generic 500).
    const armEnd = tail.indexOf("ERR.INTERNAL()");
    expect(tail.slice(0, armEnd)).toMatch(/VERIFICATION_INVALID/);
  });

  it("resend's catch carries the isRecordNotFound arm", () => {
    const src = read("src/app/api/auth/resend/route.ts");
    const start = src.indexOf("} catch (error) {");
    expect(start).toBeGreaterThan(-1);
    expect(src.slice(start)).toContain("isRecordNotFound(error)");
  });

  it("logout's catch completes the sign-out when the row vanished (clear + ok)", () => {
    const src = read("src/app/api/auth/logout/route.ts");
    const start = src.indexOf("} catch (error) {");
    expect(start).toBeGreaterThan(-1);
    const tail = src.slice(start);
    expect(tail).toContain("isRecordNotFound(error)");
    // The session cannot outlive its user row: the cookie clears and
    // the logout answers ok (the guest-logout no-op 200 form).
    const armEnd = tail.indexOf("ERR.INTERNAL()");
    expect(tail.slice(0, armEnd)).toContain("clearSessionCookie");
    expect(tail.slice(0, armEnd)).toMatch(/ok\(/);
  });
});

// ---- F-241e: the popover focus return -------------------------------------------

describe("F-241e — the expenses filters popover restores focus on close", () => {
  it("the open-effect's cleanup lands focus that died to body back on the trigger", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    const start = src.indexOf("React.useEffect(() => {");
    expect(start).toBeGreaterThan(-1);
    // The drawer's own pattern: cleanups run AFTER the commit that
    // removed the popover, so focus that died to <body> is detectable
    // exactly there. The toggle path (focus on the trigger) is spared
    // by construction; the outside-pointer path can also fire the
    // return (a non-focusable pointerdown moves focus to <body> in
    // Chrome/Firefox — the F-242d truth reword).
    expect(src).toContain("document.activeElement === document.body");
    expect(src).toContain("trigger?.focus()");
  });
});

// ---- F-241f: the FORM-INPUT-family seam completion -------------------------------

describe("F-241f — the dialog-textarea genus and the settings variant join the seam", () => {
  it("page-layout.ts exports FORM_TEXTAREA with the exact byte string", () => {
    const src = read("src/lib/page-layout.ts");
    expect(src).toMatch(/export const FORM_TEXTAREA =/);
    expect(src).toContain(
      '"min-h-16 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"',
    );
  });

  it("both notes-textarea consumers ride the constant (the re-entry rule's consumer half)", () => {
    for (const page of ["expenses", "income"]) {
      const src = read(`src/app/(app)/${page}/page.tsx`);
      expect(src).toContain("FORM_TEXTAREA");
    }
  });

  it("the settings inline input rides FORM_INPUT with the flex appendage", () => {
    const src = read("src/app/(app)/settings/page.tsx");
    // One utility swapped (w-full → flex-1): the appendage form the
    // F-240d round established — w-auto overrides w-full in the
    // twMerge width group, flex-1 governs the flex row.
    expect(src).toContain('cn(FORM_INPUT, "w-auto flex-1")');
  });

  it("zero bare copies of the textarea literal remain in src (the divergence point is closed)", () => {
    // The F-232h divergence-point genus, textarea edition: the two
    // notes fields carried the byte-identical paste. Any surviving
    // paste (the seam's own definition in page-layout.ts excepted)
    // fails this pin.
    const literal = "min-h-16 w-full rounded-lg border border-stone-200 bg-white";
    for (const f of listSrcFiles(
      path.resolve(import.meta.dirname, "..", "src"),
    )) {
      if (f.endsWith(path.join("src", "lib", "page-layout.ts"))) continue;
      const src = readFileSync(f, "utf8");
      expect(src.includes(literal), `${f} still carries the bare textarea literal`).toBe(
        false,
      );
    }
  });

  it("the icon-bearing search input stays a literal — the registered single-site genus", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    // Nothing to diverge from (one site): the asymmetric padding pair
    // and the placeholder arms are a genuinely different input genus,
    // the R-37 round's own deliberate call — now documented in the
    // seam's docblock rather than re-grown silently.
    expect(src).toMatch(/pl-9 pr-3/);
  });
});
