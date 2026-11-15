import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-217 (R-14, F-217k/F-217l — the store's state-hygiene pins):
// (k) hydrate() never cleared a stale `error` at entry — the R-13
//     error banner's Try-again rendered BOTH the stale banner and the
//     LoadingBlock mid-retry, and a 401 retry left the stale non-auth
//     error showing after the failure mode changed.
// (l) the mutation actions read sessionWriteToken at refreshAll-
//     INVOCATION time (after their fetch resolved), violating the
//     write-guard's own "captured at entry" contract — a logout
//     completing in between let refreshAll(N+1) write the previous
//     user's dashboard payload into the cleared store.

const ROOT = path.resolve(import.meta.dirname, "..");
const STORE = readFileSync(
  path.join(ROOT, "src/stores/wealthos-store.ts"),
  "utf-8",
);

describe("R-14: hydrate clears the stale error face (F-217k)", () => {
  it("hydrate's entry write resets error alongside loading", () => {
    // Session-234 (R-31, F-234a) recalibration: the entry write also
    // resets the settings settled flag — a new hydrate cycle retires
    // the previous cycle's settled state.
    // Session-237 (R-34, F-237c) recalibration: the entry write is
    // remount-aware — a remount (the store holds a live user) skips
    // the loading re-gate (the `/` ↔ section AppShell transition
    // flashed the full-screen loader over loaded data); a first load
    // keeps the gate. The error/st settled resets hold on BOTH arms.
    expect(STORE).toMatch(
      /set\(\s*remount\s*\?\s*\{ error: null, settingsSettled: false \}\s*:\s*\{ loading: true, error: null, settingsSettled: false \},\s*\);/,
    );
    expect(STORE).toMatch(/const remount = get\(\)\.hydrated && get\(\)\.user !== null;/);
  });

  it("the 401 branch no longer leaves a stale error standing", () => {
    // Session-238 (R-35, F-238c) recalibration: the 401 commit rides
    // the shared wall shape — the helper carries the error-null the
    // stale-face cure pinned (hydrated stays true for the wall).
    expect(STORE).toMatch(/commitRevocationWall\(set, \{ hydrated: true \}\);/);
  });
});

describe("R-14: the mutation actions capture the write token at entry (F-217l)", () => {
  it("no action passes the LIVE token to refreshAll after its fetch", () => {
    // The pre-cure pattern: `if (res.ok) await refreshAll(sessionWriteToken, set);`
    // — the token read AFTER the mutation resolves. Zero occurrences
    // is the contract.
    expect(STORE).not.toMatch(/refreshAll\(sessionWriteToken, set\)/);
  });

  it("the write-path actions capture the token before their first await", () => {
    // Session-249 (R-46, F-249c): the F-217l entry-capture contract
    // split along the guard re-key — refreshAll's commit re-keyed to
    // the caller's entry era + the sequence (a remount hydrate's
    // non-clearing token bump used to discard a mutation's fresher
    // post-write payload), so the token capture now lives only on
    // the WRITE paths (updateSettings' commit; hydrate's landing
    // guards). The era arrives at refreshAll as a parameter — the
    // threading vehicle.
    expect(STORE).toMatch(/const token = sessionWriteToken;/);
    expect(STORE).toMatch(/refreshAll\(entryClearSeq, set\)/);
    expect(STORE).not.toMatch(/refreshAll\(token, set\)/);
  });

  it("refresh captures the era at entry too (the F-217l moment, the era key)", () => {
    // Session-249 (R-46, F-249c): the capture at action entry — the
    // same moment the token was captured pre-R-46, in the era key
    // the commit guard now reads. The comment between the brace and
    // the capture is fine — the pin allows the documentation line(s)
    // the cure carries.
    expect(STORE).toMatch(/refresh: async \(\) => \{\s*(?:\/\/[^\n]*\n\s*)*const entryClearSeq = sessionClearSeq;/);
  });
});
