import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-228 (R-25): the source-tier pins for the second holdings
// surface and hygiene round. Every pin was born RED over the pre-cure
// tree (the F-228 ledger rows in docs/remediation_plan_v2.md carry the
// verified evidence). Source-scanning contracts per the house
// convention: read the file, assert the contract.

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// ---- F-228a: the Analytics chart rides the per-symbol fold ----------

describe("F-228a — the second holdings surface keys by the folded symbol", () => {
  const src = read("src/app/(app)/analytics/page.tsx");

  it("the Holdings Performance data rides gainBySymbol (one bar per symbol)", () => {
    expect(src).toContain("gainBySymbol(stats.holdings)");
  });

  it("the Cells key the folded rows (duplicate keys impossible by construction)", () => {
    // Pre-cure: `<Cell key={h.symbol}` over the raw per-lot holdings —
    // two same-symbol lots duplicated the key AND overlapped one bar.
    expect(src).not.toMatch(/<Cell key=\{h\.symbol\}/);
  });
});

// ---- F-228c: the CSV export Date column slices the string ------------

describe("F-228c — the Analytics CSV Date column carries no Date math", () => {
  it("the Date column slices the stored string (the inverse-hazard eliminated)", () => {
    const src = read("src/app/(app)/analytics/page.tsx");
    // Pre-cure: `new Date(t.date).toISOString().slice(0, 10)` — correct
    // today (a UTC-midnight identity), but a future toDate "tidy" would
    // emit the previous day for every UTC+ viewer (the F-219e mirror).
    // The slice is unambiguous on both the .000Z and bare forms.
    expect(src).toContain('value: (t) => t.date.slice(0, 10)');
    expect(src).not.toContain("new Date(t.date).toISOString().slice(0, 10)");
  });
});

// ---- F-228d: the Upcoming list keys by the carried id ----------------

describe("F-228d — upcomingAlerts carries the id; the dashboard keys by it", () => {
  it("the seam maps the transaction id onto UpcomingItem", () => {
    const src = read("src/lib/finance.ts");
    expect(src).toMatch(/interface UpcomingItem \{[\s\S]*?id: string;/);
  });

  it("the dashboard Upcoming <li> keys by the id (not description+index)", () => {
    const src = read("src/app/(app)/dashboard/page.tsx");
    expect(src).not.toContain("key={`${item.description}-${i}`}");
    expect(src).toMatch(/key=\{item\.id\}/);
  });
});

// ---- F-228e: the verify/resend miss-branch equalizers ----------------

describe("F-228e — the timing-equalizer family completes on verify/resend", () => {
  it("verify burns the equalizer on the no-pending-code miss branch", () => {
    const src = read("src/app/api/auth/verify/route.ts");
    // The login S72-C pattern: the miss branch burns the same scrypt
    // shape the known branch burns, so latency cannot distinguish the
    // pending-verification state the byte-identical banners hide.
    expect(src).toContain("verifyVerificationCode(code, timingEqualizerHash())");
  });

  it("resend burns the equalizer on the unknown-account miss branch", () => {
    const src = read("src/app/api/auth/resend/route.ts");
    expect(src).toContain("hashVerificationCode(generateVerifyCode())");
  });
});

// ---- F-228f: the upload capacity ceiling ------------------------------

describe("F-228f — the uploads surface carries a capacity ceiling", () => {
  it("the seam declares the byte and file-count ceilings", () => {
    const src = read("src/lib/uploads.ts");
    expect(src).toContain("MAX_UPLOADS_TOTAL_BYTES");
    expect(src).toContain("MAX_UPLOAD_FILES");
    expect(src).toContain("uploadsCapacity");
  });

  it("the POST route refuses past either ceiling with STORAGE_FULL", () => {
    const src = read("src/app/api/upload/route.ts");
    expect(src).toContain("uploadsCapacity(uploadsDir())");
    expect(src).toContain("ERR.STORAGE_FULL()");
  });

  it("the envelope carries the 507 STORAGE_FULL member", () => {
    const src = read("src/lib/api.ts");
    expect(src).toMatch(/STORAGE_FULL[^\n]*507/);
  });
});

// ---- F-228g: the schema round (accountId + resetToken indexes) -------

describe("F-228g — the schema round indexes the FK and the reset lookup", () => {
  it("Transaction carries @@index([accountId]) (the SetNull cascade's lookup)", () => {
    const src = read("prisma/schema.prisma");
    expect(src).toMatch(/@@index\(\[accountId\]\)/);
  });

  it("User carries @@index([resetToken]) (the F-227h recorded round)", () => {
    const src = read("prisma/schema.prisma");
    expect(src).toMatch(/@@index\(\[resetToken\]\)/);
  });
});

// ---- F-228h: the getSessionUser projection ---------------------------

describe("F-228h — getSessionUser selects its consumed fields", () => {
  it("the findUnique carries an explicit select (no secret columns in scope)", () => {
    const src = read("src/lib/auth.ts");
    expect(src).toMatch(/findUnique\(\{\s*where: \{ id: payload\.uid \},\s*select: \{/);
    const selectBlock = src.slice(
      src.indexOf("where: { id: payload.uid },"),
      src.indexOf("});", src.indexOf("where: { id: payload.uid },")),
    );
    expect(selectBlock).not.toContain("passwordHash");
    expect(selectBlock).not.toContain("resetToken");
    expect(selectBlock).not.toContain("verificationCodeHash");
  });
});

// ---- F-228j: the budgets DELETE count contract -----------------------

describe("F-228j — budgets DELETE answers NOT_FOUND on the miss", () => {
  it("the deleteMany count feeds a NOT_FOUND arm (the [id] doctrine)", () => {
    const src = read("src/app/api/budgets/route.ts");
    expect(src).toMatch(/count === 0/);
    expect(src).toContain('ERR.NOT_FOUND("Budget")');
  });
});

// ---- F-228k: the expenses filters aria-controls pair ------------------

describe("F-228k — the Expenses filters trigger/panel are id-linked", () => {
  it("the trigger carries aria-controls; the panel carries the id", () => {
    const src = read("src/app/(app)/expenses/page.tsx");
    expect(src).toContain('aria-controls="expense-filters"');
    expect(src).toContain('id="expense-filters"');
  });
});

// ---- F-228l: the stale docblocks corrected ---------------------------

describe("F-228l — the two stale docblocks carry the true facts", () => {
  it("spendingByDayOfWeek's docblock says day-of-WEEK", () => {
    const src = read("src/lib/finance.ts");
    expect(src).not.toContain("Day-of-month spending histogram");
  });

  it("badge.tsx cites the amber primary token (the session-199 rebrand)", () => {
    const src = read("src/components/ui/badge.tsx");
    expect(src).not.toContain("#2563eb");
  });
});

// ---- F-228b: the dead token family retired ---------------------------

describe("F-228b — the eight dead tokens retire; the live set stands", () => {
  const css = read("src/app/globals.css");

  it("the unconsumed tokens are gone from BOTH @theme and .dark", () => {
    for (const token of [
      "--color-brand",
      "--color-subtle",
      "--color-secondary-foreground",
      "--color-accent",
      "--color-accent-foreground",
      "--color-muted-foreground",
      "--color-popover",
      "--color-popover-foreground",
    ]) {
      expect(css).not.toContain(`${token}:`);
    }
  });

  it("the LIVE members of the set stay (input, secondary, the card pair)", () => {
    expect(css).toMatch(/--color-input:\s*#e5e5e5/);
    expect(css).toMatch(/--color-secondary:\s*#f5f5f5/);
    expect(css).toMatch(/--color-card:\s*#ffffff/);
    expect(css).toMatch(/--color-card-foreground:\s*#0a0a0a/);
  });

  it("the comment carriers no longer name the class-shaped strings (F-224v)", () => {
    const carriers = [
      "src/components/ui/select.tsx",
      "src/components/ui/dropdown.tsx",
      // table.tsx retired at session 232 (F-232a — zero-consumer stock)
      "src/components/ui/tabs.tsx",
      "src/components/ui/dialog.tsx",
      "src/components/ui/button.tsx",
      "src/app/(app)/dashboard/page.tsx",
    ];
    const classShaped = [
      "bg-popover",
      "text-popover-foreground",
      "text-muted-foreground",
      "focus:bg-accent",
      "focus:text-accent-foreground",
      "hover:text-accent-foreground",
      "bg-secondary-foreground",
      "text-secondary-foreground",
    ];
    for (const file of carriers) {
      const src = read(file);
      for (const candidate of classShaped) {
        expect(src, `${file} still names "${candidate}" in a comment`).not.toContain(candidate);
      }
    }
  });
});
