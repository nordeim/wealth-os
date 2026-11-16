import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

// Session-253 (R-50): the order-dependence, burn-ledger, and fixed-email
// round's source pins. Every pin was born RED against the pre-round tree
// and carries its finding's citation. The round's verified defects: the
// F-225c verify-bucket e2e leg's premise rode the battery's accidental
// signup denial (its setup signup 429s on the exhausted shared no-XFF
// bucket in battery order, so no account exists and the miss arm answers
// every probe; in isolation the signup succeeds, the pending-code ladder
// answers locked 429s from the fifth probe, and the leg fails — the
// AGENTS-documented single-spec invocation was RED); the F-229a
// signup-budget census arithmetic was wrong (auth.spec burns EIGHT
// no-XFF signups — three UI form submits plus five API posts — not
// five; the battery burned twelve against the ten cap, the last two
// denials landing silently on the bucket legs' own ignored signups)
// while data-import's and multi-user's success-asserting signups sat
// at burns nine and ten with zero headroom; the F-222n login-bucket
// leg probed a compile-time-constant email, so the per-account
// 30-per-15-minute bucket survives a reused-server re-run inside the
// window (the N-69a class, per-account edition); the resend route's
// vanished-row catch still shipped the two-key envelope — the F-252b
// shape oracle's one surviving arm, invisible to the parity-252 pin
// because that pin slices only the miss arm; and the auth spec's CSRF
// probe comment still described the pre-F-245a bucket-before-parse
// order the gate-first cure retired.

const read = (p: string) => readFileSync(p, "utf8");
const stripComments = (s: string) =>
  s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");

const spec = () => read("tests/e2e/wealthos.spec.ts");

const sliceBetween = (src: string, startMark: string, endMark: string) => {
  const start = src.indexOf(startMark);
  expect(start).toBeGreaterThan(-1);
  const end = src.indexOf(endMark, start);
  expect(end).toBeGreaterThan(-1);
  return src.slice(start, end);
};

// ---- F-253a: the verify-bucket leg's order-independent form ------------------

describe("F-253a — the verify-bucket leg rides the miss arm, not a signup", () => {
  it("the leg posts NO signup — the probes ride an email with no account", () => {
    const leg = sliceBetween(
      spec(),
      'test("61 rotating-XFF verify probes',
      'test("11 rotating-XFF resends',
    );
    // The order-dependence lived in the setup signup: its no-XFF burn
    // 429s in battery order (no account — the miss arm answers every
    // probe) but SUCCEEDS in isolation (a pending code — the
    // wrong-code ladder answers locked 429s from the fifth probe and
    // the 60-by-400 assertion dies). An email with no account at all
    // is the only premise that holds in every invocation shape.
    expect(stripComments(leg)).not.toContain("/api/auth/signup");
    // The premise is stated, not implied.
    expect(leg).toContain("no account");
  });

  it("the resend-bucket leg posts NO signup either (both arms answer the non-leaking 200)", () => {
    const leg = sliceBetween(
      spec(),
      'test("11 rotating-XFF resends',
      "// Session-245 (R-42, F-245a)",
    );
    // The resend leg was order-INVARIANT by luck (the known and miss
    // arms both answer 200) but its signup was a silent shared-bucket
    // burn and its comment claimed a fresh in-app code the miss arm
    // never mints. The signup retires with the premise trued.
    expect(stripComments(leg)).not.toContain("/api/auth/signup");
    expect(leg).toContain("miss arm");
  });
});

// ---- F-253b: the corrected signup-budget ledger -------------------------------

describe("F-253b — the signup-budget census states the true arithmetic", () => {
  it("the auth spec's budget note counts this file's EIGHT no-XFF burns", () => {
    const src = read("tests/e2e/auth.spec.ts");
    const start = src.indexOf("NOTE the signup budget");
    expect(start).toBeGreaterThan(-1);
    const note = src.slice(start, src.indexOf("test(", start));
    // The stale census called this leg the battery's tenth and final
    // signup POST while counting this file's API posts alone (five) —
    // the three UI form submits burn the same shared bucket (the
    // route burns before the parse), and the bucket legs' own
    // signups were the silent eleventh and twelfth denials.
    expect(note).toContain("EIGHT");
    expect(note).toContain("three UI form submits");
    expect(note).not.toContain("10th and FINAL");
  });

  it("the wealthos spec's census carries the same corrected count", () => {
    const src = spec();
    const start = src.indexOf("signup budget sits exactly");
    expect(start).toBeGreaterThan(-1);
    const note = src.slice(start, src.indexOf("test.describe(", start));
    expect(note).toContain("EIGHT");
    expect(note).toContain("dedicated");
    expect(note).not.toContain("auth.spec's five");
  });

  it("the two success-asserting scratch signups ride dedicated XFF keys (the reset-password doctrine)", () => {
    for (const file of [
      "tests/e2e/data-import.spec.ts",
      "tests/e2e/multi-user.spec.ts",
    ]) {
      const src = read(file);
      const start = src.indexOf("/api/auth/signup");
      expect(start).toBeGreaterThan(-1);
      // Slice the signup POST's options — the header rides the same
      // call (within the following lines, before the closing paren).
      const post = src.slice(start, start + 400);
      expect(post).toContain("x-forwarded-for");
    }
  });
});

// ---- F-253c: the login-bucket leg's timestamp mint ----------------------------

describe("F-253c — the login-bucket leg mints its probe email", () => {
  it("the per-account probe email is timestamped (a reused server cannot inherit its bucket)", () => {
    const leg = sliceBetween(
      spec(),
      'test("31 rotating-XFF attempts',
      'test.describe("the per-account verify/resend buckets',
    );
    // A compile-time-constant email keys a per-account bucket that
    // survives a reused-server re-run inside the window (count
    // already past 30 — every probe 429s). The sibling legs mint;
    // this one joins them.
    expect(leg).toContain("acct-bucket-probe-${Date.now()}");
    expect(leg).not.toContain("acct-bucket-probe@example.com");
  });
});

// ---- F-253d / F-253e: every resend arm carries the third key ------------------

describe("F-253d — the resend route's every success envelope is three-key", () => {
  it("every ok( return in the route carries the verificationCode key (the whole-route form)", () => {
    const src = stripComments(read("src/app/api/auth/resend/route.ts"));
    // The F-252b pin slices only the miss arm — the coverage gap that
    // let the vanished-row catch keep the two-key envelope (the shape
    // oracle's one surviving arm, reachable only for a hash-present
    // row: under the production delivery knob a two-key 200 signaled
    // a never-verified account existed at read time). The whole-route
    // form closes the genus: no arm of this route may ship an
    // envelope any other arm does not.
    const returns = [...src.matchAll(/ok\(\{[^}]*\}\)/g)].map((m) => m[0]);
    expect(returns.length).toBeGreaterThanOrEqual(3);
    for (const body of returns) {
      expect(body).toContain("verificationCode");
    }
  });
});

// ---- F-253f: the CSRF probe comment's gate-first truth ------------------------

describe("F-253f — the CSRF probe comment cites the gate-first ordering", () => {
  it("the probe's rationale names the content-type gate ABOVE the burn", () => {
    const src = read("tests/e2e/auth.spec.ts");
    const start = src.indexOf("The probe rides its OWN rate-limit bucket");
    expect(start).toBeGreaterThan(-1);
    const note = src.slice(start, src.indexOf("const csrfShape", start));
    // The stale rationale claimed the route "buckets before it
    // parses" — the pre-F-245a order. The content-type gate now dies
    // the text/plain volley un-bucketed; the dedicated hop is
    // belt-and-suspenders, and the comment says so.
    expect(note).toContain("content-type gate");
    expect(note).toContain("un-bucketed");
    expect(note).not.toContain("buckets before it parses");
  });
});
