import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-218 (R-15 — the round's misc source pins): every cure lands
// with its contract pinned in the same commit. Families:
//   F-218e  updateSettings captures the write token at entry (the
//           F-217l contract's one unguarded writer)
//   F-218f  the upload route bounds the STREAM before formData() (the
//           chunked-multipart memory bypass)
//   F-218g  the heavy sessioned endpoints ride rate buckets
//   F-218d  the raw-parse date sites route through toDate
//   F-218p  the logout route gates on the JSON content-type
//   F-218q  forgot/reset answer the envelope on the fallthrough
//   F-218r  signup's P2002 race answers the duplicate 400
//   F-218s  MAX_AI_BODY_BYTES ≥ the control-char worst case
//   F-218t  boot-env warns when NEO_PROXY_HOPS rides the default
//   F-218u  the Select labels associate; the checkbox rides accent-
//   F-218j  the red-500 small-text sites darken to red-600
//   F-218k  the investment badges ride dark-step text constants
//   F-218m  HealthGauge carries role="img"
//   F-218n  the sidebar avatar reuses the luminance seam
//   F-218o  the Expenses tabs render one panel per trigger

const ROOT = path.resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(path.join(ROOT, p), "utf-8");
const stripComments = (s: string) =>
  s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");

const STORE = stripComments(read("src/stores/wealthos-store.ts"));
const UPLOAD = stripComments(read("src/app/api/upload/route.ts"));
const IMPORT = stripComments(read("src/app/api/import/route.ts"));
const COACH = stripComments(read("src/app/api/ai/coach/route.ts"));
const RESET = stripComments(read("src/app/api/reset/route.ts"));
const LOGOUT = stripComments(read("src/app/api/auth/logout/route.ts"));
const FORGOT = stripComments(read("src/app/api/auth/forgot-password/route.ts"));
const RESETPW = stripComments(read("src/app/api/auth/reset-password/route.ts"));
const SIGNUP = stripComments(read("src/app/api/auth/signup/route.ts"));
const API = stripComments(read("src/lib/api.ts"));
const BOOTENV = read("src/lib/boot-env.ts");
const EXPENSES = stripComments(read("src/app/(app)/expenses/page.tsx"));
const INCOME = stripComments(read("src/app/(app)/income/page.tsx"));
const ACCOUNTS = stripComments(read("src/app/(app)/accounts/page.tsx"));
const INVESTMENTS = stripComments(read("src/app/(app)/investments/page.tsx"));
const GOALS = stripComments(read("src/app/(app)/goals/page.tsx"));
const DASHBOARD = stripComments(read("src/app/(app)/dashboard/page.tsx"));
const PAGE_PARTS = stripComments(read("src/components/shared/page-parts.tsx"));
const CONSTANTS = read("src/lib/constants.ts");
const SIDEBAR = stripComments(read("src/components/layout/sidebar.tsx"));

describe("R-15: updateSettings joins the write-guard family (F-218e)", () => {
  it("captures the token at entry and guards the set", () => {
    // Session-238 (R-35, F-238b) recalibration: the guard nests under
    // the ok arm (the failure arm now carries the third-window 401
    // wall — the compound condition could not narrow the union).
    expect(STORE).toMatch(
      /updateSettings: async \(body\) => \{[\s\S]*?const token = sessionWriteToken;[\s\S]*?if \(res\.ok\) \{\s*if \(token === sessionWriteToken\) set\(\{ settings: res\.data \}\);/,
    );
  });

  it("no unguarded settings write remains", () => {
    expect(STORE).not.toMatch(/if \(res\.ok\) set\(\{ settings: res\.data \}\)/);
  });
});

describe("R-15: the upload stream bound (F-218f)", () => {
  it("the body is piped through a counting bound BEFORE formData()", () => {
    expect(UPLOAD).toMatch(/TransformStream/);
    expect(UPLOAD).toMatch(/pipeThrough/);
    const boundAt = UPLOAD.search(/pipeThrough/);
    const parseAt = UPLOAD.search(/formData\(\)/);
    expect(boundAt).toBeGreaterThan(-1);
    expect(parseAt).toBeGreaterThan(boundAt);
  });

  it("an overflow answers the too-large 400 (never a silent no-file)", () => {
    expect(UPLOAD).toMatch(/File too large/);
    expect(UPLOAD).toMatch(/overflowed|tooLarge|exceeded/i);
  });
});

describe("R-15: the heavy sessioned endpoints ride rate buckets (F-218g)", () => {
  it("import carries its own bucket", () => {
    expect(IMPORT).toMatch(/rateLimit\(/);
  });
  it("the coach carries its own bucket", () => {
    expect(COACH).toMatch(/rateLimit\(/);
  });
  it("the destructive reset carries its own bucket", () => {
    expect(RESET).toMatch(/rateLimit\(/);
  });
});

describe("R-15: the raw-parse date sites route through toDate (F-218d)", () => {
  it("the expenses table date line no longer parses raw", () => {
    expect(EXPENSES).not.toMatch(/new Date\(tx\.date\)/);
    expect(EXPENSES).toMatch(/toDate\(tx\.date\)/);
  });
  it("the edit prefills no longer parse raw (expenses/income/goals)", () => {
    expect(EXPENSES).not.toMatch(/new Date\(editing\.date\)/);
    expect(EXPENSES).toMatch(/toDate\(editing\.date\)/);
    expect(INCOME).not.toMatch(/new Date\(editing\.nextPaymentDate\)/);
    expect(INCOME).toMatch(/toDate\(editing\.nextPaymentDate\)/);
    expect(GOALS).not.toMatch(/new Date\(editing\.targetDate\)/);
    expect(GOALS).toMatch(/toDate\(editing\.targetDate\)/);
  });
});

describe("R-15: the logout content-type gate (F-218p)", () => {
  it("the cookie clears only for a JSON content-type request", () => {
    expect(LOGOUT).toMatch(/content-type/i);
    expect(LOGOUT).toMatch(/application\/json/);
    expect(LOGOUT).toMatch(/clearSessionCookie/);
  });
  it("a non-JSON request answers the envelope, never the teardown", () => {
    // The cross-site no-cors POST (no content-type) must NOT clear.
    expect(LOGOUT).toMatch(/ERR\.|fail\(/);
  });
});

describe("R-15: the auth fallthrough arms answer the envelope (F-218q)", () => {
  it("forgot-password never re-throws past the handler", () => {
    expect(FORGOT).not.toMatch(/throw error/);
  });
  it("reset-password never re-throws past the handler", () => {
    expect(RESETPW).not.toMatch(/throw error/);
  });
});

describe("R-15: signup's P2002 race answers the duplicate 400 (F-218r)", () => {
  it("the catch arm recognizes the unique-constraint code", () => {
    expect(SIGNUP).toMatch(/P2002/);
    expect(SIGNUP).toMatch(/A user with this email already exists/);
  });
});

describe("R-15: the AI cap covers the control-char worst case (F-218s)", () => {
  it("MAX_AI_BODY_BYTES rides at least 1MB (30 × 4000 × 6-byte escapes ≈ 720KB)", () => {
    expect(API).toMatch(/MAX_AI_BODY_BYTES = 1024 \* 1024/);
  });
});

describe("R-15: boot-env warns when NEO_PROXY_HOPS rides the default (F-218t)", () => {
  it("the production default-ride warning exists", () => {
    expect(BOOTENV).toMatch(/NEO_PROXY_HOPS is unset/);
    expect(BOOTENV).toMatch(/isProduction/);
  });
});

describe("R-15: the label associations + the checkbox accent (F-218u)", () => {
  it("the Select labels carry htmlFor wired to their triggers' ids (income ×2, accounts, investments, goals)", () => {
    const pairs: Array<[string, string]> = [
      [INCOME, "income-type"],
      [INCOME, "income-frequency"],
      [ACCOUNTS, "account-type"],
      [INVESTMENTS, "investment-type"],
      [GOALS, "goal-category"],
    ];
    for (const [src, id] of pairs) {
      expect(src).toContain(`htmlFor="${id}"`);
      expect(src).toContain(`id="${id}"`);
    }
  });
  it("the expense checkbox rides the working accent- form (text- classes are no-ops on a native input)", () => {
    expect(EXPENSES).toMatch(/accent-amber-600/);
    expect(EXPENSES).not.toMatch(/type="checkbox"[^/]*text-amber-600/);
  });
});

describe("R-15: the red-500 small-text sites darken (F-218j)", () => {
  it("KpiCard's down-delta rides red-600 in light mode", () => {
    expect(PAGE_PARTS).toMatch(/text-red-600 dark:text-red-400/);
    expect(PAGE_PARTS).not.toMatch(/text-red-500 dark:text-red-400/);
  });
  it("the dashboard budget-over row rides red-600 in light mode", () => {
    expect(DASHBOARD).not.toMatch(/text-red-500 dark:text-red-400/);
  });
  it("the investments loss cell rides red-600 in light mode", () => {
    expect(INVESTMENTS).not.toMatch(/text-red-500/);
    expect(INVESTMENTS).toMatch(/text-red-600/);
  });
});

describe("R-15: the investment badges ride dark-step text (F-218k)", () => {
  it("the constants carry a readable text color per type (the 500-level fills stay as tints)", () => {
    expect(CONSTANTS).toMatch(/text:/);
    // The dark steps: 600/700-level values over the 10% tints.
    expect(CONSTANTS).toMatch(/#1d4ed8|#b45309|#047857|#6d28d9/);
  });
  it("the badge renders the text color from the constant, not the saturated fill", () => {
    expect(INVESTMENTS).not.toMatch(/color: meta\?\.color \?\? "#78716c"/);
    expect(INVESTMENTS).toMatch(/meta\?\.text|\.text \?\?|textColor/);
  });
});

describe("R-15: HealthGauge carries a role (F-218m)", () => {
  it("the wrapper is role=img so the aria-label reaches the tree", () => {
    expect(DASHBOARD).toMatch(/role="img"/);
  });
});

describe("R-15: the sidebar avatar reuses the luminance seam (F-218n)", () => {
  it("the initials' ink derives from the background, not a fixed stone-900", () => {
    expect(SIDEBAR).toMatch(/avatarTextColor/);
    expect(SIDEBAR).not.toMatch(/rounded-full text-sm font-bold text-stone-900/);
  });
});

describe("R-15: the Expenses tabs render one panel per trigger (F-218o)", () => {
  it("the four tabs each carry a panel (no dangling aria-controls)", () => {
    // The cure renders the four panels through one map over the tab ids
    // — every trigger's aria-controls resolves.
    expect(EXPENSES).toMatch(
      /\(\["all", "needs", "wants", "savings"\] as const\)\.map\(\(panelId\) => \(/,
    );
    expect(EXPENSES).toMatch(/<TabsPanel key=\{panelId\} tab=\{panelId\}>/);
    // only the ACTIVE panel carries the content (hidden shells stay
    // empty — text selectors stay unique)
    expect(EXPENSES).toMatch(/\{tab === panelId \? historyBody : null\}/);
    // the pre-cure single-panel form is gone
    expect(EXPENSES).not.toMatch(/<TabsPanel tab=\{tab\}>/);
  });
});
