import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import * as path from "node:path";

// Session-255 (R-52): the strict-parse, derived-truth, and
// docblock-precision round's source pins. The round's verified
// defects: the proxy-depth parse accepted trailing garbage the
// docblock and the boot warning both promise to reject ("2x" parsed
// as depth 2, "0x" as depth 0 — the bucket keyed an attacker-padded
// hop or dropped to direct exposure while the warning called the
// value inert); the settings route's P2002 recovery re-read with a
// throwing finder that itself dies on an out-of-band row vanish; and
// three docblocks carried precision debt (the store's selector
// parenthetical undercounted its own family, the Tabs component
// described the CRM-era consumers, the login card's zero-toast claim
// read card-wide). This battery also carries the F-255b structural
// rider: the derived-truth legs — the R-51 census pins proved the
// comments' wording, never the code order; these legs DERIVE the
// ordinal, the spatial claim, and the bare-call census from the
// tree itself, so a future reorder fails the unit gate instead of
// silently re-staling the prose. The five cure legs were born RED
// against the pre-round tree; the three derived-truth legs were born
// GREEN by design (they pin truths that already hold — the F-215b
// precedent).

const read = (p: string) => readFileSync(p, "utf8");

const sliceFrom = (src: string, startMark: string, endMark: string) => {
  const start = src.indexOf(startMark);
  expect(start).toBeGreaterThan(-1);
  const end = src.indexOf(endMark, start);
  expect(end).toBeGreaterThan(-1);
  return src.slice(start, end);
};

// ---- F-255a: the strict digit-run gate ------------------------------------

describe("F-255a — the proxy-depth parse keeps the fail-closed promise", () => {
  it("proxyHopDepth gates on a bare digit run before any parse", () => {
    const fn = sliceFrom(
      read("src/lib/rate-limit.ts"),
      "export function proxyHopDepth",
      "\n}",
    );
    // The behavioral legs (tests/rate-limit.test.ts) prove the
    // observable: a trailing-garbage value must key the LAST hop,
    // never a deeper attacker-padded one. This source pin holds the
    // FORM — a bare parseInt accepts exactly the garbage the
    // docblock above the function and the boot warning both promise
    // to reject, so the gate must ride ahead of it.
    expect(fn).toContain('if (!/^\\d+$/.test(raw)) return 1;');
    // The old finite/negative checks are dead under the digit gate
    // (a digit run can be neither) — their survival would mean the
    // gate never landed.
    expect(fn).not.toContain("Number.isFinite(parsed)");
    expect(fn).not.toContain("parsed < 0");
  });
});

// ---- F-255b: the derived-truth legs (the structural rider) -----------------

describe("F-255b — the auth census's arithmetic is DERIVED, not just stated", () => {
  it("five API signup posts; the recovery leg's is the fourth, the revoke leg's the fifth (burns seven and eight)", () => {
    const spec = read("tests/e2e/auth.spec.ts");
    const apiPosts = [
      ...spec.matchAll(/request\.post\("\/api\/auth\/signup"/g),
    ].map((m) => m.index);
    // The F-253b census's "five API posts" — derived, so a future
    // leg that posts a sixth signup breaks the arithmetic loudly
    // instead of silently burning the shared bucket past its cap.
    expect(apiPosts.length).toBe(5);
    const titles = [...spec.matchAll(/test\("([^"]+)"/g)];
    const titleAt = (idx: number): string => {
      const enclosing = titles
        .filter((m) => (m.index ?? 0) < idx)
        .at(-1);
      return enclosing?.[1] ?? "";
    };
    const recovery = apiPosts.findIndex((idx) =>
      titleAt(idx).includes("Resend re-arms"),
    );
    const revoke = apiPosts.findIndex((idx) =>
      titleAt(idx).includes("revokes the session"),
    );
    // The F-254a ordinal, derived: the recovery leg's signup is the
    // FOURTH API post — burn seven counting the three burning UI
    // submits above it — and the revoke leg's is the fifth (eighth).
    expect(recovery).toBe(3);
    expect(revoke).toBe(4);
    expect(recovery).toBeLessThan(revoke);
  });

  it("exactly three BURNING UI form submits — the guard-blocked click is the only non-burning one", () => {
    const spec = read("tests/e2e/auth.spec.ts");
    const clicks = [
      ...spec.matchAll(/name: "Create account" \}\)\.click\(\)/g),
    ].map((m) => m.index);
    const titles = [...spec.matchAll(/test\("([^"]+)"/g)];
    const starts = titles.map((m) => m.index ?? 0);
    const fullSliceOf = (idx: number): string => {
      const t = starts.filter((s) => s < idx).length - 1;
      const end = starts[t + 1] ?? spec.length;
      return spec.slice(starts[t], end);
    };
    // The mismatch-confirm test's click is blocked client side (its
    // test body asserts the guard banner) — every other click burns.
    // The census's "three UI form submits" is therefore DERIVED: a
    // fourth burning click breaks the EIGHT total against the ten
    // cap and this leg fails with it.
    expect(clicks.length).toBe(4);
    const burning = clicks.filter(
      (idx) => !fullSliceOf(idx).includes("Passwords do not match"),
    );
    expect(burning.length).toBe(3);
  });
});

describe("F-255b — the wealthos census's spatial claim is DERIVED", () => {
  it("both bucket describes precede the census comment in file order", () => {
    const spec = read("tests/e2e/wealthos.spec.ts");
    const loginBucket = spec.indexOf(
      'test.describe("the per-account login bucket',
    );
    const verifyResend = spec.indexOf(
      'test.describe("the per-account verify/resend buckets',
    );
    const census = spec.indexOf("signup budget sits exactly");
    expect(loginBucket).toBeGreaterThan(-1);
    expect(verifyResend).toBeGreaterThan(-1);
    expect(census).toBeGreaterThan(-1);
    // The F-254b cure trued the directional word to "above"; this
    // leg derives the positions, so a future leg move that puts a
    // describe BELOW the census flips the prose stale and fails here.
    expect(loginBucket).toBeLessThan(census);
    expect(verifyResend).toBeLessThan(census);
  });
});

describe("F-255b — the bare page idiom's call-site census is pinned", () => {
  it("exactly fourteen call sites subscribe bare across the pages and dialogs", () => {
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        if (e.name === "generated") continue;
        const p = path.join(dir, e.name);
        if (e.isDirectory()) walk(p);
        else if (/\.(ts|tsx)$/.test(e.name)) files.push(p);
      }
    };
    walk("src");
    // The assignment form counts CALL SITES only — the docblock's
    // own parenthetical example does not match it. The F-254e
    // blessing names "fourteen page and dialog call sites"; this leg
    // makes the number a gate, so the next page or dialog that
    // subscribes bare updates the census consciously.
    const count = files.reduce(
      (n, f) => n + (read(f).match(/= useWealthOs\(\)/g)?.length ?? 0),
      0,
    );
    expect(count).toBe(14);
  });
});

// ---- F-255c: the settings recovery stays total ------------------------------

describe("F-255c — the settings recovery stays total on the vanished-row window", () => {
  it("the P2002 recovery re-reads with findUnique and retries the create once — no throwing finder", () => {
    const src = read("src/app/api/settings/route.ts");
    // The lazy-create contract answers a missing row with a fresh
    // create; the recovery's re-read must not be able to die on the
    // out-of-band vanish window the contract already covers.
    expect(src).not.toContain("findUniqueOrThrow");
    const recovery = sliceFrom(
      src,
      "The unique-constraint race",
      "throw e;",
    );
    expect(recovery).toContain("findUnique({");
    expect(recovery).toContain("db.setting.create");
  });
});

// ---- F-255d: the store docblock's selector parenthetical -------------------

describe("F-255d — the store docblock's selector parenthetical names its non-shell member", () => {
  it("the coach dialog's single-slice read joins the shell in the parenthetical", () => {
    const src = read("src/stores/wealthos-store.ts");
    const start = src.indexOf("The store hook");
    expect(start).toBeGreaterThan(-1);
    const docblock = src.slice(start, src.indexOf("*/", start));
    // The live selector family is eight sites — the shell's five,
    // the sidebar, the mobile nav, and the coach dialog's single
    // ask. A parenthetical naming only the shell invites a wrong
    // "fix" of the coach dialog's narrow read.
    expect(docblock).toContain("coach dialog");
  });
});

// ---- F-255e: the Tabs docblock cites the WealthOS consumers ----------------

describe("F-255e — the Tabs docblock cites the WealthOS consumers, not the CRM-era pages", () => {
  it("no activities or reports prose remains; both live consumers named", () => {
    const src = read("src/components/ui/tabs.tsx");
    // The CRM-era page names rode three comment sites while the live
    // consumers are the Expenses filter and the Analytics section
    // tabs. The reword describes the WealthOS pair.
    expect(src).not.toContain("activities");
    expect(src).not.toContain("reports");
    expect(src).toContain("Analytics");
    expect(src).toContain("Expenses");
  });
});

// ---- F-255f: the login card's zero-toast claim is scoped -------------------

describe("F-255f — the login card's zero-toast claim is scoped to the submits", () => {
  it("the claim rides the submits and names the social disclosure as its exception", () => {
    const src = read("src/components/layout/login-card.tsx");
    const head = src.slice(0, src.indexOf("export function LoginCard"));
    // The submits fire no toasts (failure = the banner, success =
    // the silent redirect) — but the card's social buttons fire the
    // deliberate unconfigured disclosure, so the claim must carry
    // its own exception instead of reading card-wide. (The wording
    // rides one unhyphenated word — the F-229d carrier net caught
    // this cure's first hyphenated coin mid-round.)
    expect(head).toContain("ZERO toasts fire on the auth submits");
    expect(head).toContain("unconfigured");
  });
});
