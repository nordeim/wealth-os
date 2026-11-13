import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-235 (R-32): the source-tier pins for the oracle-reorder,
// async-scrypt, and live-region-seed round. Every pin was born RED over
// the pre-cure tree (the F-235 ledger rows in docs/remediation_plan_v2.md
// carry the verified evidence). Source-scanning contracts per the house
// convention: read the file, assert the contract.

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// ---- F-235a: the AI-coach greeting live-region seed -------------------------

describe("F-235a — the coach greeting seeds in an effect so the region announces it", () => {
  it("the render-time seed form is retired (the region must not mount with content)", () => {
    const src = read("src/components/shared/ai-coach.tsx");
    expect(src).not.toMatch(/if \(open && !greeted\)/);
  });

  it("the greeting seeds inside an effect keyed on open (the F-218h doctrine)", () => {
    const src = read("src/components/shared/ai-coach.tsx");
    expect(src).toMatch(
      /React\.useEffect\(\(\) => \{\s*if \(!open \|\| greeted\) return;/,
    );
    expect(src).toMatch(/setGreeted\(true\);/);
  });

  it("the polite region stays on the message list (the F-219j contract unchanged)", () => {
    const src = read("src/components/shared/ai-coach.tsx");
    expect(src).toMatch(/aria-live="polite"/);
  });
});

// ---- F-235b: the login verification oracle reorder ---------------------------

describe("F-235b — the unverified-account gate sits above the credential check", () => {
  it("the gate block appears before the verify call in the route source", () => {
    const src = read("src/app/api/auth/login/route.ts");
    const gate = src.indexOf("if (user.verificationCodeHash)");
    const verify = src.indexOf("verifyPassword(password, user.passwordHash)");
    expect(gate).toBeGreaterThan(-1);
    expect(verify).toBeGreaterThan(-1);
    expect(gate).toBeLessThan(verify);
  });

  it("the gate branch burns the equalizer (latency cannot distinguish the arms)", () => {
    const src = read("src/app/api/auth/login/route.ts");
    const gate = src.indexOf("if (user.verificationCodeHash)");
    const verify = src.indexOf("verifyPassword(password, user.passwordHash)");
    const gateBlock = src.slice(gate, verify);
    expect(gateBlock).toContain("timingEqualizerHash");
  });

  it("the unknown-email miss branch still burns the equalizer (the S72-C contract)", () => {
    const src = read("src/app/api/auth/login/route.ts");
    expect(src).toContain("if (!user)");
    expect(src).toMatch(
      /if \(!user\) \{[\s\S]*?await verifyPassword\(password, await timingEqualizerHash\(\)\);/,
    );
  });
});

// ---- F-235c: the reset honest-failure arm ------------------------------------

describe("F-235c — the reset transaction answers the transient-timeout family honestly", () => {
  it("the catch carries the pool/interactive-timeout arm before the INTERNAL fallback", () => {
    const src = read("src/app/api/reset/route.ts");
    const arm = src.indexOf("P2024");
    const internal = src.indexOf("ERR.INTERNAL()");
    expect(arm).toBeGreaterThan(-1);
    expect(internal).toBeGreaterThan(-1);
    expect(arm).toBeLessThan(internal);
    expect(src).toMatch(/P2024/);
    expect(src).toMatch(/P2028/);
  });
});

// ---- F-235d: the async-scrypt seam -------------------------------------------

describe("F-235d — the crypto seam never blocks the event loop", () => {
  it("the seam promisifies the callback form (the synchronous API is retired)", () => {
    const src = read("src/lib/password.ts");
    expect(src).not.toContain("scryptSync");
    expect(src).toMatch(/promisify/);
  });

  it("the seam's three entry points are async", () => {
    const src = read("src/lib/password.ts");
    expect(src).toMatch(/export async function hashPassword\(/);
    expect(src).toMatch(/export async function verifyPassword\(/);
    expect(src).toMatch(/export async function timingEqualizerHash\(/);
  });

  it("every auth route call site awaits the seam", () => {
    const routes = [
      "src/app/api/auth/login/route.ts",
      "src/app/api/auth/signup/route.ts",
      "src/app/api/auth/verify/route.ts",
      "src/app/api/auth/resend/route.ts",
      "src/app/api/auth/reset-password/route.ts",
    ];
    for (const rel of routes) {
      const src = read(rel);
      const bare = src.match(/(?<!await )(?:hashPassword|verifyPassword|hashVerificationCode|verifyVerificationCode)\(/g);
      expect(bare, `${rel} must await every crypto call`).toBeNull();
    }
  });

  it("the seed awaits the seam (the demo hash)", () => {
    const src = read("prisma/seed.ts");
    expect(src).toMatch(/await hashPassword\(/);
    expect(src).not.toMatch(/(?<!await )hashPassword\(/);
  });
});

// ---- F-235e: the busy guards' functional clears -------------------------------

describe("F-235e — a completing row cannot re-enable a sibling's in-flight button", () => {
  const sites: Array<[string, string]> = [
    ["src/app/(app)/income/page.tsx", "setBusyId"],
    ["src/app/(app)/expenses/page.tsx", "setBusyId"],
    ["src/app/(app)/accounts/page.tsx", "setBusyId"],
    ["src/app/(app)/goals/page.tsx", "setBusyId"],
    ["src/app/(app)/investments/page.tsx", "setBusyId"],
    ["src/app/(app)/settings/page.tsx", "setBusyBudget"],
  ];

  it.each(sites)("%s clears its busy slot only when it still owns it", (rel, setter) => {
    const src = read(rel);
    expect(src).toMatch(new RegExp(`${setter}\\(\\(prev\\) =>`));
    expect(src).not.toContain(`${setter}(null);`);
  });
});

// ---- F-235f: the dialog-close hit area ----------------------------------------

describe("F-235f — the dialog close target meets the touch floor", () => {
  it("the close constant carries padding around the glyph", () => {
    const src = read("src/lib/page-layout.ts");
    const closeLine = src.slice(
      src.indexOf("DIALOG_CLOSE"),
      src.indexOf("as const", src.indexOf("DIALOG_CLOSE")),
    );
    expect(closeLine).toContain("p-1.5");
  });
});

// ---- F-235g: the emoji wraps in the Select options ----------------------------

describe("F-235g — the option emoji are decorative, not announced", () => {
  const sites = [
    "src/app/(app)/expenses/page.tsx",
    "src/app/(app)/accounts/page.tsx",
    "src/app/(app)/goals/page.tsx",
  ];

  it.each(sites)("%s hides its option emoji from the name", (rel) => {
    const src = read(rel);
    const items = src.match(/<SelectItem[\s\S]*?<\/SelectItem>/g) ?? [];
    const emojiItems = items.filter((item) =>
      /emoji}|\.icon}/.test(item),
    );
    expect(emojiItems.length).toBeGreaterThan(0);
    for (const item of emojiItems) {
      expect(item).toContain('aria-hidden="true"');
    }
  });
});

// ---- F-235h: the tablist naming -----------------------------------------------

describe("F-235h — the tab strips are named", () => {
  it("the Tabs component wires an optional label onto the tablist", () => {
    const src = read("src/components/ui/tabs.tsx");
    expect(src).toMatch(/ariaLabel\??: string/);
    expect(src).toMatch(/aria-label=\{ariaLabel\}/);
  });

  it("both multi-strip consumers pass a label", () => {
    const expenses = read("src/app/(app)/expenses/page.tsx");
    expect(expenses).toMatch(/ariaLabel="[^"]+"/);
    const analytics = read("src/app/(app)/analytics/page.tsx");
    expect(analytics).toMatch(/ariaLabel="[^"]+"/);
  });
});

// ---- F-235i: the KPI glyph/tone decoupling -------------------------------------

describe("F-235i — the Expenses delta glyph agrees with its signed number", () => {
  it("the KpiCard accepts an optional tone override beside the direction", () => {
    const src = read("src/components/shared/page-parts.tsx");
    expect(src).toMatch(/deltaTone\??: "good" \| "bad"/);
  });

  it("the Expenses card drives the glyph by the sign and the tone by good/bad", () => {
    const src = read("src/app/(app)/dashboard/page.tsx");
    expect(src).toMatch(/expenseDelta == null \? "flat" : expenseDelta >= 0 \? "up" : "down"/);
    expect(src).toMatch(/deltaTone=\{expenseDelta != null && expenseDelta <= 0 \? "good" : "bad"\}/);
  });

  it("the down-delta ink family the F-218j pin watches survives the decoupling", () => {
    const src = read("src/components/shared/page-parts.tsx");
    expect(src).toMatch(/text-red-600 dark:text-red-400/);
    expect(src).toMatch(/text-emerald-700 dark:text-emerald-400/);
  });
});

// ---- F-235j: the guest-wall status face -----------------------------------------

describe("F-235j — the guest wall renders a visible redirect status", () => {
  it("the shim answers a status element, not emptiness", () => {
    const src = read("src/components/layout/guest-login-redirect.tsx");
    expect(src).not.toMatch(/return null;/);
    expect(src).toMatch(/role="status"/);
    expect(src).toContain("Redirecting to sign in");
  });
});

// ---- F-235k: the additive CSP hardening -----------------------------------------

describe("F-235k — the CSP carries the containment backstop", () => {
  it("the policy adds the script/object/base/form directives", () => {
    const src = read("next.config.ts");
    expect(src).toContain("script-src 'self' 'unsafe-inline'");
    expect(src).toContain("object-src 'none'");
    expect(src).toContain("base-uri 'self'");
    expect(src).toContain("form-action 'self'");
    expect(src).toContain("frame-ancestors 'self'");
  });
});

// ---- F-235l: the users-PATCH record-not-found arm --------------------------------

describe("F-235l — the profile update answers a vanished session user honestly", () => {
  it("the catch carries the record-not-found arm", () => {
    const src = read("src/app/api/users/route.ts");
    expect(src).toMatch(/isRecordNotFound\(error\)/);
  });
});

// ---- F-235m: the dead HealthGauge transition retirement ---------------------------

describe("F-235m — the gauge carries no inert transition style", () => {
  it("the arc path rides no transition", () => {
    const src = read("src/app/(app)/dashboard/page.tsx");
    expect(src).not.toContain("stroke-dasharray");
  });
});

// ---- F-235n: the progressbar roles ----------------------------------------------

describe("F-235n — the meter bars are programmatically determinable", () => {
  it("the goals page names its progress track", () => {
    const src = read("src/app/(app)/goals/page.tsx");
    expect(src).toContain('role="progressbar"');
    expect(src).toMatch(/aria-valuenow=/);
  });

  it("the dashboard budget and health meters join the family", () => {
    const src = read("src/app/(app)/dashboard/page.tsx");
    const tracks = src.match(/role="progressbar"/g) ?? [];
    expect(tracks.length).toBeGreaterThanOrEqual(2);
    expect(src).toMatch(/aria-valuemin=/);
    expect(src).toMatch(/aria-valuemax=/);
  });
});
