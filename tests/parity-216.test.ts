import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-216 (R-13 — the parity-216 shape pins): the session's
// UI/security/hygiene cures that have no natural behavioral home in
// the unit suite. Each pin freezes one convergence:
//   F-216e — the QuickAction's nested-interactive cure (axe-core's
//            nested-interactive rule only matches childrenPresentational
//            roles — `button` yes, `link` no — so the a11y two-gate is
//            STRUCTURALLY blind to link-wrapped buttons; this pin sees
//            what axe cannot)
//   F-216g — the OTP log line sits inside the inAppOtpEnabled branch
//            (the code logs only when the response also carries it)
//   F-216i — the Expenses filters popover closes on Escape + outside
//   F-216j — the dead-export sweep (install_packages.sh gone, the
//            Import page's no-op ternary collapsed)

const ROOT = path.resolve(import.meta.dirname, "..");
const read = (rel: string): string => readFileSync(path.join(ROOT, rel), "utf-8");
const DASHBOARD = read("src/app/(app)/dashboard/page.tsx");
const EXPENSES = read("src/app/(app)/expenses/page.tsx");
const IMPORT_PAGE = read("src/app/(app)/import/page.tsx");
const SIGNUP = read("src/app/api/auth/signup/route.ts");
const RESEND = read("src/app/api/auth/resend/route.ts");

describe("parity-216: the QuickAction nested-interactive cure (F-216e)", () => {
  it("the dashboard renders NO button nested inside a link", () => {
    // The pre-216 shape: <Link href={href}><button type="button" ...>
    // — two tab stops, ambiguous SR announcement. The cure moves the
    // classes onto the anchor (single focusable, identical genus).
    expect(DASHBOARD).not.toMatch(/<Link[^>]*>\s*<button/);
  });

  it("the QuickAction anchor carries the interactive classes directly", () => {
    // The moved classes: the anchor itself is the button-faced element.
    expect(DASHBOARD).toMatch(/<Link[^>]*href=\{href\}[^>]*className=\{cn\(/);
  });
});

describe("parity-216: the Expenses filters popover closes (F-216i)", () => {
  it("the popover wires an Escape handler", () => {
    expect(EXPENSES).toMatch(/Escape/);
    expect(EXPENSES).toMatch(/addEventListener|onKeyDown/);
  });

  it("the popover closes on an outside pointerdown", () => {
    expect(EXPENSES).toMatch(/pointerdown/);
  });
});

describe("parity-216: the OTP log rides the in-app branch (F-216g)", () => {
  it("signup logs the code only inside the inAppOtpEnabled branch", () => {
    // The pre-216 shape logged the live code unconditionally BEFORE
    // the branch — in the production posture (kill-switch =1, codes
    // hashed at rest) a live OTP + PII still landed in server logs.
    const branch = SIGNUP.indexOf("inAppOtpEnabled");
    const log = SIGNUP.indexOf("[verification] code for");
    expect(branch).toBeGreaterThan(-1);
    expect(log).toBeGreaterThan(branch);
  });

  it("resend logs the code only inside the inAppOtpEnabled branch", () => {
    const branch = RESEND.indexOf("inAppOtpEnabled");
    const log = RESEND.indexOf("[verification] code for");
    expect(branch).toBeGreaterThan(-1);
    expect(log).toBeGreaterThan(branch);
  });

  it("the disabled posture still logs a code-less audit line", () => {
    // The operator keeps an email-only trail when a mail transport
    // owns the delivery.
    expect(SIGNUP + RESEND).toMatch(/verification code issued|code issued for/);
  });
});

describe("parity-216: the hygiene sweep (F-216f/j)", () => {
  it("the scaffold-era npm bootstrap script is gone (bun install is the path)", () => {
    expect(existsSync(path.join(ROOT, "scripts/install_packages.sh"))).toBe(false);
  });

  it("the Import page's no-op ternary is collapsed", () => {
    // The pre-216 vestige: `type === "income" ? "Other" : "Other"`.
    expect(IMPORT_PAGE).not.toMatch(/\?\s*"Other"\s*:\s*"Other"/);
  });
});
