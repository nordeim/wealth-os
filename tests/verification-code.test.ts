import { describe, expect, it } from "vitest";
import {
  applyCodeInput,
  VERIFICATION_CODE_LENGTH,
} from "../src/lib/verification";

// Session-233 (R-30, F-233a): the OTP box-entry reducer — the pure seam
// behind the six verification-code inputs. The pre-cure handler kept
// only the LAST digit of whatever landed in a box, so a paste or a
// one-time-code autofill of the full code collapsed to a single digit
// and the length guard blocked submission (the primary code-entry path
// degraded). The seam distributes multi-digit edits across the boxes
// from the edited one and lands focus after the last filled box;
// single-digit typing and the clear path are byte-identical to the
// pre-cure semantics (the walk forward, the stay-at-last, the clear
// without a focus move).

const boxes = (filled: string): string[] => {
  const next = Array<string>(VERIFICATION_CODE_LENGTH).fill("");
  for (let i = 0; i < filled.length; i++) next[i] = filled[i] ?? "";
  return next;
};

describe("applyCodeInput — the single-digit walk (pre-cure semantics preserved)", () => {
  it("a single digit mid-walk fills the box and advances focus", () => {
    const prev = boxes("12");
    const got = applyCodeInput(prev, 2, "3");
    expect(got.next).toEqual(boxes("123"));
    expect(got.focusIndex).toBe(3);
  });

  it("a single digit at the last box fills it and keeps focus there", () => {
    const prev = boxes("12345");
    const got = applyCodeInput(prev, 5, "6");
    expect(got.next).toEqual(boxes("123456"));
    expect(got.focusIndex).toBe(5);
  });

  it("an over-typed box distributes its digits (the append form rides the paste branch)", () => {
    const prev = boxes("1");
    // typing into a box that already holds a digit appends — the value
    // "89" is multi-digit, so it distributes (the common OTP-input
    // convention: any multi-character value is treated as a paste)
    const got = applyCodeInput(prev, 1, "89");
    expect(got.next).toEqual(boxes("189"));
    expect(got.focusIndex).toBe(3);
  });

  it("a non-digit edit clears the box and never moves focus", () => {
    const prev = boxes("123");
    const got = applyCodeInput(prev, 2, "");
    expect(got.next).toEqual(boxes("12"));
    expect(got.focusIndex).toBe(2);

    const junk = applyCodeInput(prev, 2, "ab");
    expect(junk.next).toEqual(boxes("12"));
    expect(junk.focusIndex).toBe(2);
  });

  it("the input array is never mutated", () => {
    const prev = boxes("12");
    const snapshot = [...prev];
    applyCodeInput(prev, 0, "9");
    applyCodeInput(prev, 2, "456");
    expect(prev).toEqual(snapshot);
  });
});

describe("applyCodeInput — the multi-digit distribution (the F-233a cure)", () => {
  it("a full-code paste into box 1 distributes across all six boxes", () => {
    const got = applyCodeInput(boxes(""), 0, "941372");
    expect(got.next).toEqual(boxes("941372"));
    // focus lands after the last filled box — the final box when full
    expect(got.focusIndex).toBe(5);
  });

  it("a partial paste into a mid box distributes forward", () => {
    const prev = boxes("1");
    const got = applyCodeInput(prev, 1, "234");
    expect(got.next).toEqual(boxes("1234"));
    expect(got.focusIndex).toBe(4);
  });

  it("a junk-laden paste distributes only its digits", () => {
    const got = applyCodeInput(boxes(""), 0, "1a2b3c4d5e6f");
    expect(got.next).toEqual(boxes("123456"));
    expect(got.focusIndex).toBe(5);
  });

  it("an overflowing paste truncates at the final box", () => {
    const prev = boxes("12");
    const got = applyCodeInput(prev, 2, "34567");
    // boxes 3..6 take 3456; the 7 has nowhere to land
    expect(got.next).toEqual(boxes("123456"));
    expect(got.focusIndex).toBe(5);
  });

  it("a paste over an already-filled suffix overwrites from the edited box", () => {
    const prev = boxes("123456");
    const got = applyCodeInput(prev, 1, "99");
    expect(got.next).toEqual(boxes("199456"));
    expect(got.focusIndex).toBe(3);
  });
});

// Session-234 (R-31, F-234c): the full-code restart rule. The session-233
// distribution started at the EDITED box, so the type-then-paste flow (one
// digit typed, then the whole code pasted after it) produced a COMPLETE
// but ROTATED code that passed the length guard and burned an attempt —
// the fails-safe-to-fails-dangerous residue of the F-233a cure. An edit
// carrying exactly the code's length now restarts at box 1; partial
// pastes keep distributing from the edited box (the pins above).

describe("applyCodeInput — the full-code restart (F-234c)", () => {
  it("the type-then-paste flow: one digit typed, the whole code pasted into box 2", () => {
    // The typed digit is the code's own first digit — the shape of the
    // real flow (the user types the digit they are reading, then pastes
    // the whole code the message carries).
    const prev = boxes("9");
    const got = applyCodeInput(prev, 1, "941372");
    expect(got.next).toEqual(boxes("941372"));
    expect(got.focusIndex).toBe(5);
  });

  it("a junk-laden full-code paste into a mid box restarts at box 1", () => {
    const got = applyCodeInput(boxes(""), 3, "9a4b1c3d7e2f");
    expect(got.next).toEqual(boxes("941372"));
    expect(got.focusIndex).toBe(5);
  });

  it("a longer-than-code paste at a later box keeps truncating from the edited box", () => {
    // Seven extracted digits is not the exact code length — the
    // restart rule must not fire; the overflow truncates as before.
    const prev = boxes("12");
    const got = applyCodeInput(prev, 2, "3456789");
    expect(got.next).toEqual(boxes("123456"));
    expect(got.focusIndex).toBe(5);
  });
});
