import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-239 (R-36): the source-tier pins for the wall-token,
// recovery-gate, and hydration-window round. Every pin was born RED
// over the pre-cure tree (the F-239 ledger rows in
// docs/remediation_plan_v2.md carry the verified evidence).
// Source-scanning contracts per the house convention: read the file,
// assert the contract.

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// ---- F-239a: the wall's write-token bump --------------------------------------

describe("F-239a — the revocation wall advances the write token before its set", () => {
  it("the wall body bumps the token (the logout branch's own F-217l contract)", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("function commitRevocationWall(");
    expect(start).toBeGreaterThan(-1);
    const end = src.indexOf("async function refreshAll");
    expect(end).toBeGreaterThan(start);
    const body = src.slice(start, end);
    // The bump: an in-flight pre-revocation 200 (its server-side read
    // predating the revocation) must fail every write-guard and
    // discard its landing — the exact contract logout's own bump
    // carries, missing from the wall's commit until this round.
    expect(body).toMatch(/sessionWriteToken \+= 1;/);
    // The bump rides BEFORE the set (a late guard evaluation between
    // the two would be the same hole the bump closes).
    expect(body.indexOf("sessionWriteToken += 1;")).toBeLessThan(
      body.indexOf("set({"),
    );
  });
});

// ---- F-239b: the recovery gate -------------------------------------------------

describe("F-239b — a successful password reset clears the pending verification state", () => {
  it("the reset's atomic write clears the verification pair + attempts alongside the token pair", () => {
    const src = read("src/app/api/auth/reset-password/route.ts");
    const start = src.indexOf("db.user.updateMany({");
    expect(start).toBeGreaterThan(-1);
    const end = src.indexOf("});", start);
    const block = src.slice(start, end);
    // The reset token's possession proves email control — exactly what
    // verification attests. Pre-cure, a never-verified account that
    // completed the whole reset funnel still answered the login gate's
    // 403 (the gate reads the standing hash).
    expect(block).toContain("verificationCodeHash: null");
    expect(block).toContain("verificationExpiresAt: null");
    expect(block).toContain("verificationAttempts: 0");
    // The eviction + single-use pair ride the same write (standing
    // contract — the addition must not disturb them).
    expect(block).toContain("tokenVersion: { increment: 1 }");
    expect(block).toContain("resetToken: null");
  });
});

// ---- F-239c: the hydration timezone window --------------------------------------

describe("F-239c — the time-derived render outputs suppress the inherent hydration comparison", () => {
  it("the PageHeader's subtitle carrier opts out of the text comparison", () => {
    const src = read("src/components/shared/page-parts.tsx");
    // The dashboard's date subtitle derives from a render-time clock on
    // a server-rendered client page: a server and client on different
    // calendar dates (the daily TZ window) diverge at the text level —
    // a React 19 hydration error. The theme bootstrap's own pattern:
    // the divergence is inherent (the server's date is unknowable
    // client-side), so the carrier suppresses the comparison; the
    // texts agree in every non-window load.
    expect(src).toMatch(
      /<p className=\{PAGE_HEADER\.subtitle\} suppressHydrationWarning>/,
    );
  });

  it("both analytics date inputs opt out of the attribute comparison", () => {
    const src = read("src/app/(app)/analytics/page.tsx");
    // JSX inputs span lines and carry arrow handlers (whose => would
    // end a naive [^>]* match) — split on the opening tag and inspect
    // each date input's full attribute block, through its self-close.
    const chunks = src.split("<input");
    const dateInputs = chunks.filter((c) => /^\s*type="date"/.test(c));
    expect(dateInputs.length).toBe(2);
    for (const chunk of dateInputs) {
      const attrBlock = chunk.slice(0, chunk.indexOf("/>"));
      expect(attrBlock).toContain("suppressHydrationWarning");
    }
  });
});

// ---- F-239e: the logout↔wall clear parity ---------------------------------------

describe("F-239e — the logout clear and the wall clear empty the SAME keys", () => {
  it("the wall's clear-set is contained in the logout clear-set (the structural tie)", () => {
    const src = read("src/stores/wealthos-store.ts");
    const wallStart = src.indexOf("function commitRevocationWall(");
    const wallEnd = src.indexOf("async function refreshAll");
    const logoutStart = src.indexOf("logout: async (): Promise<boolean> => {");
    expect(wallStart).toBeGreaterThan(-1);
    expect(logoutStart).toBeGreaterThan(-1);
    // Slice each region's CLEAR call (the wall's set({…}); logout's
    // last set({…}) — the success clear, not the failure arm's inline
    // one). Indentation-agnostic key extraction: one key per line.
    const wallClear = src
      .slice(wallStart, wallEnd)
      .slice(src.slice(wallStart, wallEnd).indexOf("set({"));
    const logoutAll = src.slice(
      logoutStart,
      src.indexOf("return true;", logoutStart),
    );
    const logoutClear = logoutAll.slice(logoutAll.lastIndexOf("set({"));
    const keysOf = (block: string): Set<string> => {
      const set = new Set<string>();
      for (const m of block.matchAll(/^\s+(\w+):/gm)) set.add(m[1]);
      return set;
    };
    const wallKeys = keysOf(wallClear);
    const logoutKeys = keysOf(logoutClear);
    // The wall's fixed clear-set must be a SUBSET of the logout clear
    // (the logout-clear parity F-238c established) — a future slice
    // added to only one literal regresses the genus silently without
    // this tie.
    for (const k of ["user", "error", "transactions", "incomeSources",
      "accounts", "investments", "goals", "budgets", "settings",
      "settingsSettled", "loading"]) {
      expect(wallKeys.has(k)).toBe(true);
      expect(logoutKeys.has(k)).toBe(true);
    }
    // The single documented divergence: logout also resets the
    // hydrated flag (the wall's callers carry it through the extra
    // parameter instead) — no OTHER asymmetric key may appear.
    const logoutOnly = [...logoutKeys].filter((k) => !wallKeys.has(k));
    expect(logoutOnly).toEqual(["hydrated"]);
    const wallOnly = [...wallKeys].filter((k) => !logoutKeys.has(k));
    expect(wallOnly).toEqual([]);
  });
});

// ---- F-239f: the 507 operator copy ----------------------------------------------

describe("F-239f — the STORAGE_FULL guidance names the files-inside form", () => {
  it("the copy never tells the operator to remove the folder itself", () => {
    const src = read("src/lib/api.ts");
    // The uploads directory is created once per process (the F-238d
    // memoization); a removed folder is never recreated until restart.
    // The guidance must name the FILES INSIDE, never the folder —
    // wrap-tolerant matching (comment lines wrap mid-phrase with the
    // prefix between), so each phrase is asserted on its own.
    const flat = src.replace(/\/\/+/g, " ").replace(/\s+/g, " ");
    expect(flat).toMatch(/deletes the FILES/);
    expect(flat).toMatch(/INSIDE <repo>\/uploads\//);
    expect(flat).not.toMatch(/clears <repo>\/uploads\//);
  });
});

// ---- F-239g: the settings upsert -------------------------------------------------

describe("F-239g — the settings PUT rides the upsert (the budgets-POST house form)", () => {
  it("the PUT writes through db.setting.upsert, not the read-create-then-update pair", () => {
    const src = read("src/app/api/settings/route.ts");
    const putStart = src.indexOf("export async function PUT");
    const put = src.slice(putStart);
    expect(put).toContain("db.setting.upsert({");
    expect(put).not.toMatch(/db\.setting\.update\(/);
    // Session-240 (R-37, F-240h): the count-mapped bulk form joins the
    // forbidden set — that form short-circuits an empty data object to
    // count 0 without executing (the F-236a class), and a count-mapped
    // 404 arm built on it would answer NOT_FOUND for an existing,
    // owned row while passing the single-record ban above.
    expect(put).not.toMatch(/db\.setting\.updateMany\(/);
    // The create arm seeds the owner (the lazy-create contract the
    // pair carried) and the update arm carries the parsed fields.
    expect(put).toMatch(/create:\s*\{\s*ownerId:/);
    // The concurrent-first-touch race keeps its recovery (the budgets
    // family's single retry).
    expect(put).toMatch(/P2002/);
    // The response projects the row's fields (the readSettings shape).
    expect(put).toMatch(/defaultCurrency: row\.defaultCurrency/);
  });
});

// ---- F-239h: the upload family's catch arms ---------------------------------------

describe("F-239h — the upload family answers honest failure classes honestly", () => {
  it("the GET splits the ENOENT miss (404) from real I/O failures (500)", () => {
    const src = read("src/app/api/uploads/[name]/route.ts");
    // A real server fault (EACCES, EMFILE) is not a capability-URL
    // miss: the miss keeps its quiet 404, every other failure answers
    // the internal-error envelope.
    const miss = src.indexOf("if (!miss)");
    expect(miss).toBeGreaterThan(-1);
    const internal = src.indexOf("ERR.INTERNAL()");
    expect(internal).toBeGreaterThan(miss);
    // The ENOENT miss still answers the 404 (the standing contract).
    expect(src.indexOf('fail("NOT_FOUND"')).toBeGreaterThan(-1);
  });

  it("the POST's catch answers a physical disk-full with the 507 family", () => {
    const src = read("src/app/api/upload/route.ts");
    const catchStart = src.lastIndexOf("} catch (error) {");
    const tail = src.slice(catchStart);
    // ENOSPC/EDQUOT from the OS (not the app ceiling) surfaces as the
    // storage-full envelope, not the generic 500 — the route's own
    // documented operator contract.
    expect(tail).toMatch(/ENOSPC/);
    expect(tail).toMatch(/EDQUOT/);
    expect(tail).toMatch(/ERR\.STORAGE_FULL\(\)/);
  });
});

// ---- F-239i: the Dark-Mode state suffix -------------------------------------------

describe("F-239i — the desktop Dark-Mode item exposes its state", () => {
  it("the item carries the sr-only state suffix (the mobile header's own pattern)", () => {
    const src = read("src/components/layout/sidebar.tsx");
    // The visible label stays the reference's own string; the
    // screen-reader arm learns whether the click will enable or
    // disable (WCAG 4.1.2) — the a11y-superset pattern.
    expect(src).toMatch(/sr-only/);
    expect(src).toMatch(/currently (on|off)/);
    expect(src).toMatch(/useIsDark\(\)/);
  });
});

// ---- F-239j: the desktop sidebar's internal scroll ----------------------------------

describe("F-239j — the desktop sidebar nav scrolls internally on short viewports", () => {
  it("NAV_LAYOUT.nav carries the overflow pair (the F-219h drawer cure's desktop twin)", () => {
    const src = read("src/lib/page-layout.ts");
    const start = src.indexOf("export const NAV_LAYOUT = {");
    const end = src.indexOf("} as const;", start);
    const block = src.slice(start, end);
    expect(block).toMatch(/nav:\s*"flex-1 [^"]*overflow-y-auto scrollbar-thin/);
  });
});

// ---- F-239k: the dead animation-token retirement ------------------------------------

describe("F-239k — the zero-consumer animation tokens retire", () => {
  it("globals.css carries neither the transition-shorthand tokens nor their keyframes", () => {
    const src = read("src/app/globals.css");
    // Two decorative animation tokens and their keyframe blocks rode
    // the theme with zero class consumers (the Radix transitions ride
    // the vendored animation import); the dead stock retires. The
    // retirement is described here in words — never cited (the
    // carrier discipline).
    expect(src).not.toMatch(/--animate-fade-in/);
    expect(src).not.toMatch(/--animate-slide-in-right/);
    expect(src).not.toMatch(/@keyframes fade-in/);
    expect(src).not.toMatch(/@keyframes slide-in-right/);
  });
});
