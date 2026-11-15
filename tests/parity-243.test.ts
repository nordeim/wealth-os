import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-243 (R-40): the source-tier pins for the logout-bucket,
// guard-advance, and label-truth round. Every RED pin was born over the
// pre-cure tree (the F-243 ledger rows in docs/remediation_plan_v2.md
// carry the verified evidence). Source-scanning contracts per the house
// convention: read the file, assert the contract. The two green-by-design
// legs are regression guards for the surfaces the F-243a move must
// preserve (the F-234g gate-first order, the F-221r bucket form).

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
}

/** Slice a function definition out of a source file (start marker to the
 * next closing brace at the same nesting depth is approximated by the
 * next blank-line-delimited block end — the walkers are short). */
function sliceFunction(src: string, name: string): string {
  const start = src.indexOf(`function ${name}(`);
  expect(start, `${name} not found`).toBeGreaterThan(-1);
  // The walkers in this repo end with a lone "}" line before the next
  // top-level construct — slice to the third closing brace line.
  let depth = 0;
  let end = -1;
  for (let i = start; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  expect(end).toBeGreaterThan(-1);
  return src.slice(start, end);
}

// ---- F-243a: the logout burn rides the sessioned path -----------------------

describe("F-243a — the logout writes-bucket burn sits AFTER the session read", () => {
  it("the burn lands inside the sessioned arm, after getSessionUser", () => {
    const src = read("src/app/api/auth/logout/route.ts");
    // Anchor on the CALL SITE (the F-239e lesson: a bare indexOf on the
    // identifier matches the import line first — a false green born over
    // the pre-cure tree).
    const readAt = src.indexOf("await getSessionUser()");
    const burnAt = src.indexOf("rateLimit(`writes:");
    expect(readAt).toBeGreaterThan(-1);
    expect(burnAt).toBeGreaterThan(-1);
    // The poisoning shape: the burn preceded the session read, so a
    // cookie-less direct caller (JSON content-type, no session) burned
    // the SHARED writes bucket every sessioned mutation rides while
    // collecting the guest-logout no-op 200.
    expect(burnAt).toBeGreaterThan(readAt);
  });

  it("the F-234g gate-first order survives the move (the regression guard)", () => {
    const src = read("src/app/api/auth/logout/route.ts");
    // Session-246 (R-43, F-246b): the gate converged onto the shared
    // seam — the pin follows the code form, the order unchanged.
    const gateAt = src.indexOf("await requireJsonContentType(req)");
    const bucketAt = src.indexOf("rateLimit(`writes:");
    expect(gateAt).toBeGreaterThan(-1);
    expect(bucketAt).toBeGreaterThan(-1);
    expect(gateAt).toBeLessThan(bucketAt);
  });

  it("the F-221r writes-bucket form survives the move (the regression guard)", () => {
    const src = read("src/app/api/auth/logout/route.ts");
    expect(src).toMatch(/rateLimit\(`writes:\$\{clientKey\(req\)\}`/);
  });

  // Session-244 (R-41, F-244e): the arm-containment leg — the order-only
  // legs above let a burn relocated after the session read but OUTSIDE
  // the sessioned arm (a burn after the try block, still "after" the
  // read) pass every pin while re-opening the guest-burn poisoning the
  // cure exists to close. The containment form: the burn sits between
  // the if-user arm's opening and the tokenVersion update it guards,
  // and it is the route's ONLY rateLimit call.
  it("the burn sits INSIDE the if-user arm, between its opening and the tokenVersion update", () => {
    const src = read("src/app/api/auth/logout/route.ts");
    // The F-239e lesson's own lesson: anchor the eviction on its CODE
    // form (the increment site), not the identifier — the route's own
    // docblock names the field BEFORE the arm, so a bare indexOf on the
    // name matched the comment instead of the update.
    const armAt = src.indexOf("if (user) {");
    const burnAt = src.indexOf("rateLimit(`writes:");
    const evictionAt = src.indexOf("tokenVersion: {");
    expect(armAt, "the if-user arm not found").toBeGreaterThan(-1);
    expect(evictionAt, "the tokenVersion eviction site not found").toBeGreaterThan(-1);
    expect(burnAt).toBeGreaterThan(armAt);
    expect(evictionAt).toBeGreaterThan(burnAt);
    // The burn is the route's ONLY bucket call — a second call outside
    // the sessioned arm re-opens the class regardless of ordering.
    const calls = src.match(/rateLimit\(/g) ?? [];
    expect(calls.length).toBe(1);
  });
});

// ---- F-243b: the v2.39.0 block's docs-counts truth ---------------------------

describe("F-243b — the v2.39.0 revision block records the true docs-counts leg count", () => {
  it("the block says 14/14 (the F-242j guard itself was the 14th it)", () => {
    const p = read("Project_Architecture_Document.md");
    const start = p.indexOf("[SR] v2.39.0 (session 242");
    expect(start).toBeGreaterThan(-1);
    const end = p.indexOf("[SR] v2.38.0", start);
    const block = p.slice(start, end);
    // Session 242's own delivery record (docs/session_67.md) says
    // "docs-counts 14/14"; the block shipped "13/13" — stale at birth.
    expect(block).toContain("docs-counts 14/14");
    expect(block).not.toContain("docs-counts 13/13");
  });

  it("the over-replacement guard pins the three most recent blocks (the advance)", () => {
    const t = read("tests/docs-counts.test.ts");
    // The F-242j doctrine: the three most recent revision blocks carry
    // their OWN ship counts — the next over-broad count replacement
    // fails `bun run test`. Session-244 (R-41, F-244a — the F-243b
    // recurrence) advanced the trio; Session-245 (R-42, F-245b — the
    // THIRD edition) advanced it again; Session-246 (R-43, F-246a — the
    // FOURTH edition) advanced it once more; Session-247 (R-44, F-247a
    // — the FIFTH edition) advanced it again; Session-248 (R-45, F-248a
    // — the SIXTH edition) advances it once more: after this round it is
    // v2.42.0/v2.43.0/v2.44.0 (the v2.41.0 pin ages out; its counts
    // no longer appear live anywhere a lockstep script would target).
    const guardIt = t.slice(
      t.indexOf("the historical revision blocks keep their OWN ship counts"),
    );
    expect(guardIt).toContain("v2\\.42\\.0");
    expect(guardIt).toContain("v2\\.43\\.0");
    expect(guardIt).toContain("v2\\.44\\.0");
    expect(guardIt).not.toContain("v2\\.41\\.0");
    expect(guardIt).toContain("1610 unit \\(98 files");
  });
});

// ---- F-243c: the OTP delivery docblock truths --------------------------------

describe("F-243c — the three OTP carriers record the in-band delivery truth", () => {
  it("signup's S21-P5 docblock names the in-band family (no 'never shipped' claim)", () => {
    const src = read("src/app/api/auth/signup/route.ts");
    expect(src).not.toContain("never shipped to the client");
    expect(src).toContain("in-band");
  });

  it("resend's docblock names the in-band family (no 'never shipped' claim)", () => {
    const src = read("src/app/api/auth/resend/route.ts");
    expect(src).not.toContain("never shipped to the client");
    expect(src).toContain("in-band");
  });

  it("verification.ts's docblock names the in-band family (no 'never shipped' claim)", () => {
    const src = read("src/lib/verification.ts");
    expect(src).not.toContain("never shipped to the client");
    expect(src).toContain("in-band");
  });
});

// ---- F-243d: the whole-tree scanners admit the .jsx bridges -------------------

describe("F-243d — both whole-tree class-string walkers scan the jsx bridges", () => {
  it("the parity-229 walker's filter admits jsx (the nine capital bridges join the scan)", () => {
    const src = read("tests/parity-229.test.ts");
    const walker = sliceFunction(src, "walkSrc");
    // Session-244 (R-41, F-244e): the FILTER FORM, not prose — the
    // pre-hardening leg matched the Session-243 comment inside the
    // walker (the prose note about jsx joining the filter), so a
    // regex revert that kept the comment passed both pins. The
    // character class is the contract.
    expect(walker).toContain("(ts|tsx|jsx|css)");
  });

  it("the parity-242 walker's filter admits jsx (the template-literal genus guard joins)", () => {
    const src = read("tests/parity-242.test.ts");
    const walker = sliceFunction(src, "listSrcFiles");
    expect(walker).toContain("(tsx?|jsx|css)");
  });
});

// ---- F-243e: the import dropzone label-in-name -------------------------------

describe("F-243e — the import input's accessible name contains the visible label", () => {
  it("the aria-label contains the visible 'Upload a file' phrase (WCAG 2.5.3)", () => {
    const src = read("src/app/(app)/import/page.tsx");
    // The old label ("Upload a CSV file") overrode the wrapping label
    // without containing its visible text — speech-input users saying
    // "click Upload a file" got no match.
    expect(src).not.toContain('aria-label="Upload a CSV file"');
    expect(src).toContain('aria-label="Upload a file');
  });
});

// ---- F-243f: the readStoredTheme export retirement ----------------------------

describe("F-243f — the theme reader stays module-local (the F-234j genus)", () => {
  it("readStoredTheme loses its vestigial export keyword (consumed only in its own file)", () => {
    const src = read("src/components/layout/theme.tsx");
    expect(src).toMatch(/function readStoredTheme\(/);
    expect(src).not.toMatch(/export function readStoredTheme\(/);
  });
});

// ---- F-243g: the globals prose carries no utility-form background mentions ----

describe("F-243g — the globals dark-flip comment names the token, not the utility", () => {
  it("the two plain-prose utility mentions are gone (token-form prose)", () => {
    const src = read("src/app/globals.css");
    // The F-224v doctrine: prose names the token, never the utility
    // form — the non-backticked cousin the F-242f round's scope missed.
    expect(src).not.toContain("bg-background consumer");
    expect(src).not.toContain("bg-background read");
    expect(src).toContain("background token consumer");
  });
});
