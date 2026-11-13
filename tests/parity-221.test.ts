// Session-221 (R-18): the date-staging correctness and
// perceivable-controls round's source pins. Every pin was born RED
// against the pre-round tree and carries its finding's citation. The
// round's verified defects: the R-17 stageCsvDate seam stages the bare
// yyyy-mm-dd form one day early west of UTC and the Z-form one day late
// east of UTC (the behavioral pins live in tests/csv.test.ts); the
// SelectItem focus wash computes 1.18:1 in dark mode; the Settings
// Export button computes 3.38:1; the a11y two-gate never scrolls; the
// F-219q/F-220i null-clear contract is unreachable from the app's own
// forms; the low tail (the reset-password read swallow, the shares cap
// gap, the label associations, the ink family, the busy affordances,
// the logout bucket, the export completeness).
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const read = (p: string) => readFileSync(p, "utf8");

// ---- F-221b: the SelectItem dark focus wash ----------------------------------

describe("F-221b — the SelectItem carries dark focus arms (the 1.18:1 wash)", () => {
  it("the item wash pairs every light arm with its dark arm (the MENU_ITEM precedent)", () => {
    const src = read("src/components/ui/select.tsx");
    expect(src).toContain(
      "focus:bg-line-soft focus:text-neutral-900 dark:focus:bg-stone-800 dark:focus:text-stone-100",
    );
  });
});

// ---- F-221d: the null-clear rider on the seven page forms ---------------------

describe("F-221d — the page forms can actually CLEAR optional fields", () => {
  it("expenses: notes rides the raw string (the schema normalizes '' per mode) and nextDate clears on edit", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).not.toContain("notes: notes || undefined");
    expect(src).toContain("if (editing) body.nextDate = recurring ? date : null;");
  });

  it("income: notes rides the raw string and nextPaymentDate clears on edit", () => {
    const src = read("src/app/(app)/income/page.tsx");
    expect(src).not.toContain("notes: notes || undefined");
    expect(src).toContain(
      "if (editing) body.nextPaymentDate = nextPaymentDate || null;",
    );
  });

  it("investments: purchaseDate clears on edit (the create arm keeps the omit form)", () => {
    const src = read("src/app/(app)/investments/page.tsx");
    expect(src).toContain("if (editing) body.purchaseDate = purchaseDate || null;");
  });

  it("goals: targetDate clears on edit", () => {
    const src = read("src/app/(app)/goals/page.tsx");
    expect(src).toContain("if (editing) body.targetDate = targetDate || null;");
  });

  it("accounts: institution rides the raw string (the string-field clear form)", () => {
    const src = read("src/app/(app)/accounts/page.tsx");
    expect(src).not.toContain("institution: institution || undefined");
    expect(src).toMatch(/\binstitution,\n/);
  });
});

// ---- F-221e: the Settings Export button ink -----------------------------------

describe("F-221e — the Export All Data button's ink is white on blue-600", () => {
  it("the blue CTA carries text-white (stone-900 on blue-600 measured 3.38:1)", () => {
    const src = read("src/app/(app)/settings/page.tsx");
    expect(src).toContain(
      'className="w-full bg-blue-600 hover:bg-blue-700 text-white"',
    );
  });
});

// ---- F-221f: the a11y two-gate scrolls -----------------------------------------

describe("F-221f — the a11y two-gate scrolls before axe.run()", () => {
  it("the spec defines the scrollThrough helper", () => {
    const src = read("tests/e2e/a11y.spec.ts");
    expect(src).toContain("async function scrollThrough");
  });

  it("the helper is applied in the light loops AND the dark loop (>= 3 call sites)", () => {
    const src = read("tests/e2e/a11y.spec.ts");
    const calls = (src.match(/await scrollThrough\(page\)/g) ?? []).length;
    expect(calls).toBeGreaterThanOrEqual(3);
  });
});

// ---- F-221j: the ExpenseDialog label associations ------------------------------

describe("F-221j — the ExpenseDialog Select labels are programmatically associated", () => {
  it("both selects carry htmlFor + trigger id (the F-218u pattern)", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toContain('htmlFor="expense-budget-category"');
    expect(src).toContain('id="expense-budget-category"');
    expect(src).toContain('htmlFor="expense-category"');
    expect(src).toContain('id="expense-category"');
  });
});

// ---- F-221k: the goals Paused badge light arm ----------------------------------

describe("F-221k — the goals Paused badge light arm is stone-600", () => {
  it("the paused arm darkens one step (stone-500 on stone-100 measured 4.40:1)", () => {
    const src = read("src/app/(app)/goals/page.tsx");
    expect(src).toContain(
      "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300",
    );
  });
});

// ---- F-221l: the DIALOG_CLOSE ink ----------------------------------------------

describe("F-221l — the dialog close ink passes 1.4.11 in light mode", () => {
  it("the ✕ drops the opacity and rides stone-500 (the F-220f toast cure's mirror)", () => {
    const src = read("src/lib/page-layout.ts");
    // Session-235 (R-32, F-235f): the hit-area padding joins the string —
    // the contiguous form carries it between the radius and the ink.
    expect(src).toContain(
      "rounded-md p-1.5 text-stone-500 transition-colors hover:text-stone-600",
    );
    const closeLine = src.slice(
      src.indexOf("DIALOG_CLOSE"),
      src.indexOf("as const", src.indexOf("DIALOG_CLOSE")),
    );
    expect(closeLine).not.toContain("opacity-70");
  });
});

// ---- F-221m: the toast variant icon steps ---------------------------------------

describe("F-221m — the toast variant icons pass 3:1 in light mode", () => {
  it("success and info darken one step with dark arms (error already passes)", () => {
    const src = read("src/components/ui/toast.tsx");
    expect(src).toContain("text-emerald-600 dark:text-emerald-400");
    expect(src).toContain("text-amber-700 dark:text-amber-400");
  });
});

// ---- F-221n: the settings switch track boundary ----------------------------------

describe("F-221n — the settings switch unchecked boundary passes 3:1", () => {
  it("the unchecked track darkens one step AND gains a visible border", () => {
    const src = read("src/app/(app)/settings/page.tsx");
    expect(src).toContain(
      'checked ? "bg-emerald-600" : "bg-stone-400 border-stone-500 dark:bg-stone-700 dark:border-stone-600"',
    );
  });
});

// ---- F-221o: the reset submit pending affordance ----------------------------------

describe("F-221o — the reset view's submit carries the busy affordance", () => {
  it("the Send reset link button disables while pending (the sibling pattern)", () => {
    const src = read("src/components/layout/login-card.tsx");
    expect(src).toMatch(
      /<button type="submit" disabled=\{pending\} className=\{LOGIN_RESET_LAYOUT\.send\}>/,
    );
    expect(src).toContain('{pending ? "Please wait…" : "Send reset link"}');
  });
});

// ---- F-221p: the OS-flip listener's auth-face gate -------------------------------

describe("F-221p — the OS theme-flip listener respects the auth faces' forced light", () => {
  it("the gate resolves through the seam (stored system + auth face → no OS follow)", () => {
    const src = read("src/components/layout/theme.tsx");
    expect(src).toContain(
      'defaultThemeForPath(window.location.pathname, "system") === "system"',
    );
  });
});

// ---- F-221q: the card-level busy affordances --------------------------------------

describe("F-221q — the card mutation buttons disable during flight", () => {
  it("income: busyId state + the disabled rider on Pause/Activate", () => {
    const src = read("src/app/(app)/income/page.tsx");
    expect(src).toContain("busyId, setBusyId");
    expect(src).toContain("setBusyId(source.id)");
    expect(src).toContain("disabled={busyId === source.id}");
  });

  it("goals: busyId state + the disabled rider on Delete", () => {
    const src = read("src/app/(app)/goals/page.tsx");
    expect(src).toContain("busyId, setBusyId");
    expect(src).toContain("setBusyId(goal.id)");
    expect(src).toContain("disabled={busyId === goal.id}");
  });

  it("accounts: busyId state + the busy prop threading into the card's Remove", () => {
    const src = read("src/app/(app)/accounts/page.tsx");
    expect(src).toContain("busyId, setBusyId");
    expect(src).toContain("busy={busyId === account.id}");
    expect(src).toContain("disabled={busy}");
  });

  it("investments: busyId state + the disabled rider on the row Delete", () => {
    const src = read("src/app/(app)/investments/page.tsx");
    expect(src).toContain("busyId, setBusyId");
    expect(src).toContain("disabled={inv ? busyId === inv.id : false}");
  });
});

// ---- F-221r: the logout bucket ----------------------------------------------------

describe("F-221r — auth/logout joins the writes family", () => {
  it("the logout POST carries the writes bucket (the one unbucketed mutating handler)", () => {
    const src = read("src/app/api/auth/logout/route.ts");
    expect(src).toMatch(/rateLimit\(`writes:\$\{clientKey\(req\)\}`/);
  });
});

// ---- F-221s: the export completeness ----------------------------------------------

describe("F-221s — the GDPR export carries the settings row + profile metadata", () => {
  it("the payload includes the owner-scoped settings read", () => {
    const src = read("src/app/api/export/route.ts");
    expect(src).toContain("settings,");
    expect(src).toMatch(/setting\.findFirst\(\{ where: \{ ownerId: guard\.user\.id \} \}\)/);
  });

  it("the user block carries photoUrl + createdAt", () => {
    const src = read("src/app/api/export/route.ts");
    expect(src).toContain("photoUrl");
    expect(src).toContain("createdAt");
  });
});

// ---- F-221t: the hygiene tail -------------------------------------------------------

describe("F-221t — the informational cheap arms", () => {
  it("ERR.FORBIDDEN is retired (the dead 403 arm — the 404-never-403 posture)", () => {
    const src = read("src/lib/api.ts");
    expect(src).not.toContain("FORBIDDEN");
  });

  it("budgets DELETE imports its schema statically (no request-time dynamic import)", () => {
    const src = read("src/app/api/budgets/route.ts");
    expect(src).not.toContain("await import(");
    expect(src).toContain("budgetDeleteSchema");
  });

  it("the boot warning names the x-real-ip fallback (the F-218t half it never named)", () => {
    const src = read("src/lib/boot-env.ts");
    expect(src).toMatch(/[Xx]-[Rr]eal-[Ii][Pp]/);
  });

  it("the import skip counter covers the amount/description classes (not just dates)", () => {
    const src = read("src/app/(app)/import/page.tsx");
    expect(src).toContain(
      "if (!description || !Number.isFinite(rawAmount) || rawAmount === 0) {",
    );
    expect(src).not.toContain(
      "if (!description || !Number.isFinite(rawAmount) || rawAmount === 0) continue;",
    );
  });

  it("the unused underline tab's active arm is AA (amber-600 border + amber-700 ink)", () => {
    const src = read("src/components/ui/tabs.tsx");
    expect(src).toContain("border-amber-600 text-amber-700");
    expect(src).not.toContain('"border-primary text-primary"');
  });

  it("the health route documents its unthrottled posture (the I-2b record)", () => {
    const src = read("src/app/api/health/route.ts");
    expect(src).toMatch(/unthrottled|deliberately unbucketed/);
  });
});
