import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-248 (R-45) — the guard-advance, pause-composition, and
// write-path-select round's source battery. Every pin here anchors on the
// CODE form (the F-244e lesson: never on any string a comment can also
// carry) and was born RED against the pre-cure tree unless its header says
// green-by-design. The round's behavioral proof (the composed pause
// surviving a pointer exit with focus held) is a captures canary, not a
// unit leg — the composition is DOM-event semantics the jsdom-free unit
// layer cannot drive.

const read = (rel: string): string =>
  readFileSync(path.resolve(import.meta.dirname, "..", rel), "utf-8");

// ---- F-248b: the toast pause composition ---------------------------------------

describe("F-248b — the toast pause composes hover and focus as independent flags", () => {
  it("the card declares two flags and ORs them into the paused the timer reads", () => {
    const src = read("src/components/ui/toast.tsx");
    // The F-247c cure shared ONE boolean between the hover and focus
    // pairs — a pointer EXITING the card un-paused the timer while
    // keyboard focus still sat on the Dismiss button, re-opening the
    // exact 4s death-with-focus the cure targeted (the mixed-modality
    // arm). The CODE forms:
    expect(src).toContain("const [hoverPaused, setHoverPaused] = React.useState(false);");
    expect(src).toContain("const [focusPaused, setFocusPaused] = React.useState(false);");
    expect(src).toContain("const paused = hoverPaused || focusPaused;");
  });

  it("each pair writes only its own flag (no writer can un-pause the other modality)", () => {
    const src = read("src/components/ui/toast.tsx");
    expect(src).toContain("onMouseEnter={() => setHoverPaused(true)}");
    expect(src).toContain("onMouseLeave={() => setHoverPaused(false)}");
    expect(src).toContain("onFocus={() => setFocusPaused(true)}");
    expect(src).toContain("onBlur={() => setFocusPaused(false)}");
    // The retired single-boolean writers are gone — the composition is
    // the only form (a revert to the shared flag fails here).
    expect(src).not.toContain("onMouseLeave={() => setPaused(false)}");
    expect(src).not.toContain("onBlur={() => setPaused(false)}");
  });
});

// ---- F-248c: the import Discard commit-window guard ------------------------------

describe("F-248c — the import Discard button rides disabled through the commit window", () => {
  it("the Step 2 Discard carries the busy rider beside the input's (the F-247e completion)", () => {
    const src = read("src/app/(app)/import/page.tsx");
    // The F-247e rider covered the file input only; the Discard button
    // stayed live through the import POST — a mid-flight Discard read
    // as a cancellation but the import still landed (and a failed
    // import destroyed the review the user meant to keep).
    const anchor = 'className="text-xs text-stone-500 dark:text-stone-400"';
    const at = src.indexOf(anchor);
    expect(at, "the Discard button's class literal not found").toBeGreaterThan(-1);
    // The 700-char window rides THROUGH the cure's own comment block —
    // the rider must land inside the Button element itself, past the
    // docblock, before the closing onClick (the F-247e window lesson).
    const slice = src.slice(at, at + 700);
    expect(slice).toContain("disabled={busy}");
  });
});

// ---- F-248d: the seven sibling walkers admit the jsx bridges ----------------------

describe("F-248d — every src-enumerating test walker admits the jsx bridges (the F-243d doctrine)", () => {
  // The F-243d whole-tree doctrine was applied to parity-229/242,
  // route-case, and (F-247f) palette-pins only; these seven siblings
  // still excluded the nine capital-route bridges — a latent escape
  // hatch for every invariant they feed. The widenings are
  // green-by-design over the live tree (the bridges are pure
  // re-exports), but the pins pin the NEW forms so the genus cannot
  // silently recur.

  const fourCure = "else if (/\\.(ts|tsx|jsx|css)$/.test(name)) files.push(p);";
  const twoCure = "else if (/\\.(tsx?|jsx|css)$/.test(name)) out.push(p);";
  const gateCure = "else if (/\\.(ts|tsx|jsx)$/.test(entry.name)) files.push(p);";

  it("the parity-230/231/232/233 walkers admit jsx (the four-arm form)", () => {
    for (const file of [
      "tests/parity-230.test.ts",
      "tests/parity-231.test.ts",
      "tests/parity-232.test.ts",
      "tests/parity-233.test.ts",
    ]) {
      const src = read(file);
      expect(src, file).toContain(fourCure);
      // The retired jsx-less filter is gone from the walker.
      expect(src, file).not.toContain("else if (/\\.(ts|tsx|css)$/.test(name)) files.push(p);");
    }
  });

  it("the parity-240/241 walkers admit jsx (the two-arm form)", () => {
    for (const file of ["tests/parity-240.test.ts", "tests/parity-241.test.ts"]) {
      const src = read(file);
      expect(src, file).toContain(twoCure);
      expect(src, file).not.toContain("else if (/\\.(tsx?|css)$/.test(name)) out.push(p);");
    }
  });

  it("the gate-script walker admits jsx (the rendered-brand ban's tree completion)", () => {
    const src = read("tests/gate-script.test.ts");
    expect(src).toContain(gateCure);
    expect(src).not.toContain("else if (/\\.(ts|tsx)$/.test(entry.name)) files.push(p);");
  });
});

// ---- F-248e: the auth-family write-path selects -----------------------------------

describe("F-248e — the five auth-family updates select only their consumed fields", () => {
  // Prisma update without select returns the complete post-update row;
  // the F-228h insurance doctrine's read-path completion (F-246d/F-247d)
  // left the write path hauling passwordHash/resetToken/
  // verificationCodeHash into handler scope. The selects complete the
  // doctrine (the users-PATCH form).

  it("logout's tokenVersion eviction selects id only", () => {
    const src = read("src/app/api/auth/logout/route.ts");
    // The window rides THROUGH the cure's own comment block (the
    // F-247e lesson): any number of comment lines may sit between the
    // data and the select inside the update call.
    expect(src).toMatch(
      /data: \{ tokenVersion: \{ increment: 1 \} \},\s*\n\s*(?:\/\/[^\n]*\n\s*)*select: \{ id: true \},/,
    );
  });

  it("forgot-password's token store selects id only", () => {
    const src = read("src/app/api/auth/forgot-password/route.ts");
    expect(src).toMatch(
      /resetTokenExpiresAt: new Date\(Date\.now\(\) \+ RESET_TOKEN_TTL_MS\),\s*\n\s*\},\s*\n\s*(?:\/\/[^\n]*\n\s*)*select: \{ id: true \},/,
    );
  });

  it("verify's attempt counter selects the one field it destructures", () => {
    const src = read("src/app/api/auth/verify/route.ts");
    expect(src).toMatch(
      /data: \{ verificationAttempts: \{ increment: 1 \} \},\s*\n\s*(?:\/\/[^\n]*\n\s*)*select: \{ verificationAttempts: true \},/,
    );
  });

  it("verify's success-path clear selects id only", () => {
    const src = read("src/app/api/auth/verify/route.ts");
    expect(src).toMatch(
      /verificationExpiresAt: null,\s*\n\s*\},\s*\n\s*(?:\/\/[^\n]*\n\s*)*select: \{ id: true \},/,
    );
  });

  it("resend's code rotation selects id only", () => {
    const src = read("src/app/api/auth/resend/route.ts");
    expect(src).toMatch(
      /verificationExpiresAt: new Date\(Date\.now\(\) \+ VERIFICATION_TTL_MS\),\s*\n\s*\},\s*\n\s*(?:\/\/[^\n]*\n\s*)*select: \{ id: true \},/,
    );
  });
});

// ---- F-248g: the logout clear joins the envelope ----------------------------------

describe("F-248g — the logout final clear rides inside the envelope", () => {
  it("the post-try clear carries its own arm answering the completed sign-out", () => {
    const src = read("src/app/api/auth/logout/route.ts");
    // The final clearSessionCookie sat OUTSIDE the try — the family's
    // one envelope escape (a framework-level cookie failure would
    // surface a raw non-JSON 500 for an already-completed eviction).
    // The CODE form: the clear wrapped in its own try with the ok
    // answer outside it (a failed clear must not mask the completed
    // sign-out; the cookie dies at the next session read by the
    // tokenVersion bump regardless).
    const tail = src.slice(src.indexOf("isTransientDbError(error)"));
    // The window rides THROUGH the cure's own comment block (the
    // F-247e lesson, applied to the arm form).
    expect(tail).toMatch(
      /return ERR\.INTERNAL\(\);\s*\n\s*\}\s*\n\s*(?:\/\/[^\n]*\n\s*)*try \{\s*\n\s*await clearSessionCookie\(\);\s*\n\s*\} catch \(error\) \{\s*\n\s*logApiError\("auth\/logout POST \(cookie clear\)", error\);/,
    );
    // The bare unprotected form is gone.
    expect(src).not.toMatch(/\}\n\s*await clearSessionCookie\(\);\s*\n\s*return ok\(/);
  });
});
