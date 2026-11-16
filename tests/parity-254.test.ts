import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

// Session-254 (R-51): the ordinal, spatial-reference, and
// lockstep-duplication round's source pins. Every pin was born RED
// against the pre-round tree and carries its finding's citation. The
// round's verified defects: the corrected F-253b census named the
// recovery leg's signup as the file's EIGHTH no-XFF burn while it is
// the SEVENTH (the revoke leg's signup, later in the same file, is
// the eighth — the total EIGHT and the two-spare headroom were
// already true); the wealthos-side census pointed DOWN the file at
// bucket legs that sit ABOVE it; the parity-253 whole-route pin's
// at-least-three assertion cannot see a future arm whose body carries
// a nested brace (the match window stops at the first closing brace)
// and would keep passing on the stale three matches — the exact-count
// form forces the conscious update; the F-253a premise pin anchored
// the historical narrative's parenthetical instead of the premise
// sentence (the uppercase premise phrase); the store hook's docblock
// prescribed the selector form alone while fourteen page and dialog
// call sites subscribe bare (the house page idiom); and the
// session-253 docs-lockstep script duplicated its own insertions at
// three sites — the docs-counts guard trio's v2.50.0 pin line
// four-fold, the README program row's round summary three-fold, and
// the PAD revision list's v2.50.0 block three-fold (byte-identical) —
// every gate green through all three because no pin watched
// occurrence multiplicity. The no-duplicate pins close that genus.

const read = (p: string) => readFileSync(p, "utf8");

const sliceFrom = (src: string, startMark: string, endMark: string) => {
  const start = src.indexOf(startMark);
  expect(start).toBeGreaterThan(-1);
  const end = src.indexOf(endMark, start);
  expect(end).toBeGreaterThan(-1);
  return src.slice(start, end);
};

// ---- F-254a: the census ordinal names the leg's true position ----------

describe("F-254a — the auth census's ordinal and the eighth's attribution", () => {
  it("the recovery leg's signup is the SEVENTH burn; the revoke leg's is the named EIGHTH", () => {
    const note = sliceFrom(
      read("tests/e2e/auth.spec.ts"),
      "NOTE the signup budget",
      'test("the signin 403 lands',
    );
    // The total (EIGHT: three UI form submits + five API posts) and
    // the two-spare headroom were already true — the ordinal alone
    // was wrong: in file and run order the recovery leg's signup is
    // burn seven and the revoke leg's signup (later in this same
    // file) is the eighth. The ordinal must name the true position
    // and attribute the eighth to the leg that owns it.
    expect(note).toContain("SEVENTH");
    expect(note).toContain("revoke leg's signup below is the EIGHTH");
    expect(note).not.toContain("file's EIGHTH");
  });
});

// ---- F-254b: the wealthos census's spatial truth -------------------------

describe("F-254b — the wealthos census points at the legs it describes", () => {
  it("the bucket legs sit ABOVE the census comment, and the census says so", () => {
    const note = sliceFrom(
      read("tests/e2e/wealthos.spec.ts"),
      "signup budget sits exactly",
      'test.describe("the Analytics Income tab empty state',
    );
    // The per-account bucket legs (the login-bucket describe and the
    // verify and resend legs) precede this census comment in file
    // order and battery order — the directional word must point up
    // the file, not down it.
    expect(note).toContain("the bucket legs above");
    expect(note).not.toContain("the bucket legs below");
  });
});

// ---- F-254c: the whole-route pin's exact-count form ----------------------

describe("F-254c — the parity-253 whole-route pin counts its arms exactly", () => {
  it("the pin asserts the exact arm count, not an at-least floor", () => {
    const block = sliceFrom(
      read("tests/parity-253.test.ts"),
      'describe("F-253d — the resend route',
      "// ---- F-253f:",
    );
    // The match window cannot cross a nested closing brace, so a
    // future arm with a nested body would silently drop out of the
    // match set — an at-least floor would keep passing on the stale
    // matches while the new arm goes uninspected. The exact count
    // turns any arm change into a conscious pin update.
    expect(block).toContain("expect(returns.length).toBe(3);");
    expect(block).not.toContain("toBeGreaterThanOrEqual(3)");
  });
});

// ---- F-254d: the premise pin anchors the premise sentence ----------------

describe("F-254d — the F-253a pin anchors the premise, not the narrative", () => {
  it("the premise containment rides the uppercase premise phrase", () => {
    const block = sliceFrom(
      read("tests/parity-253.test.ts"),
      'describe("F-253a — the verify-bucket leg',
      "// ---- F-253b:",
    );
    // The leg's premise sentence reads "an email with NO account at
    // all" (uppercase) while the pre-round narrative carries a
    // lowercase parenthetical — a case-sensitive containment on the
    // lowercase form anchors the history, not the contract. The pin
    // must ride the sentence that states the contract.
    expect(block).toContain('toContain("NO account at all")');
  });
});

// ---- F-254e: the store docblock blesses the bare page idiom --------------

describe("F-254e — the store docblock names the bare page idiom", () => {
  it("the hook's docblock blesses the bare subscription alongside the selector form", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("The store hook");
    expect(start).toBeGreaterThan(-1);
    const docblock = src.slice(start, src.indexOf("*/", start));
    // Fourteen page and dialog call sites subscribe bare — the
    // deliberate idiom for components reading many slices while the
    // app renders one page at a time. A docblock that prescribes the
    // selector form alone invites a wrong "fix"; the blessing closes
    // the doc-versus-code divergence.
    expect(docblock).toContain("BARE");
    expect(docblock).toContain("house idiom");
  });
});

// ---- F-254f: the guard trio's no-duplicate pin census --------------------

describe("F-254f — the docs-counts guard trio carries three DISTINCT pins", () => {
  it("the pinned-version census holds exactly three versions with no duplicates", () => {
    const self = read("tests/docs-counts.test.ts");
    const guardStart = self.indexOf(
      "the historical revision blocks keep their OWN ship counts",
    );
    expect(guardStart).toBeGreaterThan(-1);
    const guardSlice = self.slice(guardStart, self.indexOf("});", guardStart));
    // The escaped pin forms only — prose mentions cannot satisfy the
    // extraction (the F-249b structural leg's own rule). The
    // three-most-recent window is three LINES; the session-253
    // lockstep pasted its new pin four-fold, and no gate watched
    // occurrence multiplicity. The census now does.
    const pinned = [
      ...guardSlice.matchAll(/\\\[SR\\\] v2\\\.(\d+)\\\.0/g),
    ].map((m) => Number(m[1]));
    expect(pinned.length).toBe(3);
    expect(new Set(pinned).size).toBe(3);
  });
});

// ---- F-254g: the README program row's each-session-once ------------------

describe("F-254g — the README program row carries each round summary once", () => {
  it("no session summary appears twice in the Project Status program row", () => {
    const readme = read("README.md");
    // The program row's convention: the newest session's summary
    // once, then the nested prior-rounds chain (each once). The
    // session-253 lockstep pasted its summary three-fold.
    const sessions = [
      ...readme.matchAll(/session (\d+): \*\*R-\d+ shipped/g),
    ].map((m) => m[1]);
    expect(sessions.length).toBeGreaterThan(0);
    const dupes = sessions.filter((s, i) => sessions.indexOf(s) !== i);
    expect(dupes, `duplicated session summaries: ${dupes.join(", ")}`).toEqual([]);
  });
});

// ---- F-254h: the PAD revision list's each-version-once -------------------

describe("F-254h — the PAD revision list carries each version block once", () => {
  it("no revision block appears twice in the revision list", () => {
    const pad = read("Project_Architecture_Document.md");
    // The revision list's standing form: one block per version. The
    // session-253 lockstep pasted the v2.50.0 block three-fold
    // (byte-identical).
    const blocks = [
      ...pad.matchAll(/- \[SR\] v2\.(\d+)\.0 \(/g),
    ].map((m) => m[1]);
    expect(blocks.length).toBeGreaterThan(0);
    const dupes = blocks.filter((b, i) => blocks.indexOf(b) !== i);
    expect(dupes, `duplicated revision blocks: v2.${dupes.join(".0, v2.")}.0`).toEqual([]);
  });
});
