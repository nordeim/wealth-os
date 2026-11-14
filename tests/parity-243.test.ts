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
    const gateAt = src.indexOf('req.headers.get("content-type")');
    const bucketAt = src.indexOf("rateLimit(`writes:");
    expect(gateAt).toBeGreaterThan(-1);
    expect(bucketAt).toBeGreaterThan(-1);
    expect(gateAt).toBeLessThan(bucketAt);
  });

  it("the F-221r writes-bucket form survives the move (the regression guard)", () => {
    const src = read("src/app/api/auth/logout/route.ts");
    expect(src).toMatch(/rateLimit\(`writes:\$\{clientKey\(req\)\}`/);
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
    // fails `bun run test`. After this round the trio is
    // v2.37.0/v2.38.0/v2.39.0 (the v2.36.0 pin ages out; its counts
    // no longer appear live anywhere a lockstep script would target).
    const guardIt = t.slice(
      t.indexOf("the historical revision blocks keep their OWN ship counts"),
    );
    expect(guardIt).toContain("v2\\.37\\.0");
    expect(guardIt).toContain("v2\\.38\\.0");
    expect(guardIt).toContain("v2\\.39\\.0");
    expect(guardIt).not.toContain("v2\\.36\\.0");
    expect(guardIt).toContain("1539 unit \\(92 files\\)");
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
    expect(walker).toContain("jsx");
  });

  it("the parity-242 walker's filter admits jsx (the template-literal genus guard joins)", () => {
    const src = read("tests/parity-242.test.ts");
    const walker = sliceFunction(src, "listSrcFiles");
    expect(walker).toContain("jsx");
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
