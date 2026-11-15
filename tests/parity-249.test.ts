import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Session-249 (R-46): the source battery for the stale-read, era-thread,
// and guard-structural round. Every pin slices its target region from a
// unique construction-site anchor and sizes its windows past the
// documentation the same commit writes (the F-247e/F-248e slice-window
// doctrine — a window that cannot admit the cure's own comment shape
// was never a pin on the cure).

const ROOT = join(__dirname, "..");

function read(p: string): string {
  return readFileSync(join(ROOT, p), "utf8");
}

const STORE = read("src/stores/wealthos-store.ts");

function region(start: string, end: string): string {
  const s = STORE.indexOf(start);
  expect(s).toBeGreaterThan(-1);
  const e = STORE.indexOf(end, s);
  expect(e).toBeGreaterThan(s);
  return STORE.slice(s, e);
}

// ---- F-249c: the flagship — the remount-hydrate stale-read cure -------

describe("F-249c — refreshAll's commit re-keys to the caller's era + the sequence", () => {
  it("the signature carries the CALLER's entry era (the threading vehicle)", () => {
    expect(STORE).toMatch(
      /async function refreshAll\(\s*entryClearSeq: number,\s*set: \(partial: Partial<WealthOsState>\) => void,?\s*\)/,
    );
  });

  it("the combined guard is the era + the sequence (the token disjunct retired)", () => {
    const body = region("async function refreshAll(", "async function mutate");
    expect(body).toContain(
      "if (sessionClearSeq !== entryClearSeq || seq !== refreshSeq) return res;",
    );
    // The retired form: the entry-token disjunct was the F-248f
    // defect's discarding arm (a remount hydrate's non-clearing bump
    // staled it and discarded the mutation's fresher post-write
    // payload). The 401 arm above the guard stays era-keyed.
    expect(body).not.toContain("token !== sessionWriteToken");
  });

  it("the 401 arm stays era-keyed and hoisted above the combined guard", () => {
    const body = region("async function refreshAll(", "async function mutate");
    const armIndex = body.indexOf('res.code === "UNAUTHORIZED"');
    expect(armIndex).toBeGreaterThan(-1);
    const guardIndex = body.indexOf(
      "if (sessionClearSeq !== entryClearSeq || seq !== refreshSeq) return res;",
    );
    expect(guardIndex).toBeGreaterThan(-1);
    expect(armIndex).toBeLessThan(guardIndex);
    expect(body.slice(armIndex, guardIndex)).toContain(
      "sessionClearSeq === entryClearSeq",
    );
    const armBlock = body.slice(armIndex, body.indexOf("return res;", armIndex));
    expect(armBlock).toContain("commitRevocationWall(set)");
  });
});

describe("F-249c — mutate threads its entry era into the post-success refresh", () => {
  it("the wrapper captures the era at entry and passes it to refreshAll", () => {
    const body = region("async function mutate", "function createStore");
    expect(body).toContain("const entryClearSeq = sessionClearSeq;");
    expect(body).toContain("await refreshAll(entryClearSeq, set)");
    // The retired form: the token capture existed only to feed the
    // refreshAll call — with the era-keyed guard it is dead weight
    // (and its F-217l contract survives in the era key: logout and
    // the wall advance the era in the same commit as the token).
    expect(body).not.toContain("const token = sessionWriteToken;");
  });

  it("the failure arm keeps the clear-era match (the F-238b contract)", () => {
    const body = region("async function mutate", "function createStore");
    expect(body).toMatch(
      /res\.code === "UNAUTHORIZED" && sessionClearSeq === entryClearSeq/,
    );
    expect(body).toContain("commitRevocationWall(set)");
  });
});

describe("F-249c — hydrate's dashboard GET joins the shared refresh sequence", () => {
  it("the sequence mint rides the GET issue (not the landing)", () => {
    const body = region("hydrate: async () => {", "logout: async");
    const mintAt = body.indexOf("const seq = ++refreshSeq;");
    expect(mintAt).toBeGreaterThan(-1);
    const fetchAt = body.indexOf('call<DashboardData>("/api/dashboard")');
    expect(fetchAt).toBeGreaterThan(mintAt);
    // The mint must precede the fetch — the sequence orders ISSUES,
    // so a mint after the await would order landings instead.
    expect(mintAt).toBeLessThan(fetchAt);
  });

  it("the landing guard is the token + the sequence (the superseded form)", () => {
    const body = region("hydrate: async () => {", "logout: async");
    expect(body).toContain(
      "const superseded = token !== sessionWriteToken || seq !== refreshSeq;",
    );
  });

  it("the superseded landing skips ONLY the slice commit (the settings tail still runs)", () => {
    const body = region("hydrate: async () => {", "logout: async");
    const supersededAt = body.indexOf("const superseded =");
    expect(supersededAt).toBeGreaterThan(-1);
    // Both commit arms ride the NOT-superseded conjunction...
    const commitArm = body.indexOf("if (!superseded && res.ok) {");
    expect(commitArm).toBeGreaterThan(supersededAt);
    const failureArm = body.indexOf("if (!superseded && !res.ok) {");
    expect(failureArm).toBeGreaterThan(supersededAt);
    // ...while the settings tail rides only the res-ok dimension —
    // a superseded remount landing still settles its F-234a cycle
    // (the tail's own era and sequence guards no-op on dead sessions
    // and stale issues).
    const tailAt = body.indexOf('call<Settings>("/api/settings")');
    expect(tailAt).toBeGreaterThan(commitArm);
    expect(tailAt).toBeGreaterThan(failureArm);
    // The tail's settle arm: session-250 (R-47, F-250b) re-keyed it
    // from the token to the era + the settings sequence — the
    // recalibrated form (the token key let a pre-PUT read overwrite
    // the PUT's commit; the F-247d precedent for a one-session-old
    // pin whose watched form legitimately changed).
    const tail = body.slice(tailAt);
    expect(tail).toContain("settingsSettled: true");
    expect(tail).toContain(
      "if (sessionClearSeq === entryClearSeq && sseq === settingsSeq) {",
    );
  });

  it("the dashboard 401 arm stays era-keyed above the landing guard", () => {
    const body = region("hydrate: async () => {", "logout: async");
    const arm = body.indexOf('res.code === "UNAUTHORIZED"');
    expect(arm).toBeGreaterThan(-1);
    const guard = body.indexOf("const superseded =");
    expect(guard).toBeGreaterThan(-1);
    expect(arm).toBeLessThan(guard);
    expect(body.slice(arm, guard)).toContain(
      "commitRevocationWall(set, { hydrated: true })",
    );
  });
});

describe("F-249c — the write paths (session-250: the settings write joins the era key)", () => {
  it("updateSettings' commit is era-guarded with a settings-sequence bump at entry (the F-250b re-key)", () => {
    const m = STORE.match(/updateSettings: async \(body\) => \{[\s\S]*?\n    \},/);
    // Session-250 (R-47, F-250b): the token key retired on the
    // settings write — a remount hydrate's entry bump used to drop
    // the PUT's fresh commit under its success toast. The commit now
    // keys on the era (the F-249c reasoning); the sequence bump at
    // entry stales every in-flight older read. Pinned in
    // parity-250's own battery; this pin keeps the recalibrated
    // form honest here.
    expect(m?.[0] ?? "").toMatch(
      /if \(sessionClearSeq === entryClearSeq\) set\(\{ settings: res\.data \}\);/,
    );
    expect(m?.[0] ?? "").toContain("++settingsSeq;");
  });

  it("refresh captures the era at action entry (the F-217l moment, the era key)", () => {
    expect(STORE).toMatch(
      /refresh: async \(\) => \{\s*(?:\/\/[^\n]*\n\s*)*const entryClearSeq = sessionClearSeq;/,
    );
    expect(STORE).toContain("return refreshAll(entryClearSeq, set);");
  });
});

// ---- F-249d: the logout return guard's era re-key -----------------------

describe("F-249d — logout's return guard is the exactly-own-bump era form", () => {
  it("the guard requires era === entry + 1 (own bump, no wall)", () => {
    const body = region("logout: async", "refresh: async");
    // The capture rides BEFORE the entry bump...
    const captureAt = body.indexOf("const entryClearSeq = sessionClearSeq;");
    expect(captureAt).toBeGreaterThan(-1);
    const bumpAt = body.indexOf("sessionClearSeq += 1;");
    expect(bumpAt).toBeGreaterThan(captureAt);
    // ...and the return guard compares the exactly-own-bump form.
    expect(body).toContain(
      "if (sessionClearSeq !== entryClearSeq + 1) return false;",
    );
    // The retired token-keyed guard: a remount hydrate's entry bump
    // (a non-clearing bump) staled it and flipped a server-successful
    // logout to false with no clear.
    expect(body).not.toContain("if (token !== sessionWriteToken) return false;");
  });
});

// ---- F-249e: the signup create-arm select --------------------------------

describe("F-249e — signup's create returns only its consumed fields", () => {
  it("the create carries the consumed-fields select (the F-228h create arm)", () => {
    const src = read("src/app/api/auth/signup/route.ts");
    const createAt = src.indexOf("db.user.create({");
    expect(createAt).toBeGreaterThan(-1);
    // The window must ride through the create's own data block (with
    // its documentation comments) to the select — the F-248e
    // comment-admission doctrine.
    const window = src.slice(createAt, createAt + 2400);
    expect(window).toMatch(
      /data: \{[\s\S]*?\},\s*(?:\/\/[^\n]*\n\s*)*select: \{ id: true, email: true \},/,
    );
  });
});

// ---- F-249f: the logout vanished-row arm's envelope ----------------------

describe("F-249f — the vanished-row arm's clear rides its own minimal try", () => {
  it("the arm's clear is protected inside the catch (a throw cannot escape as a raw 500)", () => {
    const src = read("src/app/api/auth/logout/route.ts");
    const armAt = src.indexOf("if (isRecordNotFound(error)) {");
    expect(armAt).toBeGreaterThan(-1);
    const arm = src.slice(armAt, src.indexOf("}", src.indexOf("signedOut: true", armAt)) + 1);
    expect(arm).toContain("try {");
    expect(arm).toContain("await clearSessionCookie();");
    expect(arm).toContain("logApiError(");
    // The arm still answers the completed sign-out even when the
    // clear itself fails (the session cannot outlive its vanished
    // row — the F-241d doctrine).
    expect(arm).toContain("signedOut: true");
  });
});

// ---- F-249g: the four walker docblock truths ------------------------------

describe("F-249g — the widened walkers' docblocks carry the jsx truth", () => {
  for (const file of ["parity-230", "parity-231", "parity-232", "parity-233"]) {
    it(`${file}'s walkSrc docblock names every admitted extension`, () => {
      const src = read(`tests/${file}.test.ts`);
      const docAt = src.indexOf("Walk src (");
      expect(docAt).toBeGreaterThan(-1);
      const doc = src.slice(docAt, src.indexOf("*/", docAt));
      expect(doc).toContain("ts/tsx/jsx/css");
      // The filter itself admits jsx (the F-248d widening).
      expect(src).toMatch(/\.\(ts\|tsx\|jsx\|css\)\$/);
    });
  }
});
