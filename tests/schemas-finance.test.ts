import { describe, expect, it } from "vitest";
import {
  aiCoachSchema,
  bankAccountCreateSchema,
  bankAccountUpdateSchema,
  budgetUpsertSchema,
  csvImportSchema,
  goalCreateSchema,
  goalUpdateSchema,
  incomeSourceCreateSchema,
  incomeSourceUpdateSchema,
  investmentCreateSchema,
  investmentUpdateSchema,
  settingsUpdateSchema,
  transactionCreateSchema,
  transactionUpdateSchema,
} from "@/lib/schemas";

// The finance CRUD Zod seam — nothing reaches Prisma unvalidated.

describe("transactionCreateSchema", () => {
  const valid = {
    description: "Whole Foods run",
    amount: 142.67,
    type: "expense",
    date: "2026-11-08",
  };

  it("applies the documented defaults (category Other, needs, non-recurring)", () => {
    const parsed = transactionCreateSchema.parse(valid);
    expect(parsed.category).toBe("Other");
    expect(parsed.budgetCategory).toBe("needs");
    expect(parsed.recurring).toBe(false);
  });

  it("rejects an unknown type with the route's message", () => {
    const res = transactionCreateSchema.safeParse({ ...valid, type: "transfer" });
    expect(res.success).toBe(false);
  });

  it("rejects negative and non-finite amounts", () => {
    expect(transactionCreateSchema.safeParse({ ...valid, amount: -1 }).success).toBe(false);
    expect(
      transactionCreateSchema.safeParse({ ...valid, amount: Number.POSITIVE_INFINITY }).success,
    ).toBe(false);
  });

  it("rejects a blank description and an unparsable date", () => {
    expect(
      transactionCreateSchema.safeParse({ ...valid, description: "   " }).success,
    ).toBe(false);
    expect(transactionCreateSchema.safeParse({ ...valid, date: "not-a-date" }).success).toBe(
      false,
    );
  });
});

describe("dateField — calendar-true dates (F-216h, session 216)", () => {
  // The pre-216 refine was Date.parse-based: V8 ROLLS invalid calendar
  // dates ("2026-02-30" → 2026-03-02) and accepts free-form strings
  // ("March 5, 2026") — silently storing the wrong day. The in-app
  // surfaces always send yyyy-mm-dd (type="date" inputs) or full ISO
  // (the Import page's toISOString) — everything else is rejected.
  const valid = {
    description: "Whole Foods run",
    amount: 142.67,
    type: "expense",
  };

  it.each(["2026-02-30", "2026-04-31", "02/30/2026", "March 5, 2026", "5/3/2026", "2026-2-3"])(
    "rejects the non-calendar or non-ISO form %j",
    (date) => {
      expect(transactionCreateSchema.safeParse({ ...valid, date }).success).toBe(false);
    },
  );

  it("accepts the two payload forms the app itself sends", () => {
    expect(transactionCreateSchema.safeParse({ ...valid, date: "2026-11-08" }).success).toBe(
      true,
    );
    expect(
      transactionCreateSchema.safeParse({
        ...valid,
        date: "2026-11-08T00:00:00.000Z",
      }).success,
    ).toBe(true);
  });

  it("still rejects the classic unparsable date", () => {
    expect(transactionCreateSchema.safeParse({ ...valid, date: "not-a-date" }).success).toBe(
      false,
    );
  });

  // Session-217 (R-14, F-217j): the pre-217 shape regex's `(T.*)?` tail
  // admitted offset datetimes and zoneless datetimes — the UTC round-trip
  // then accepted or rejected them depending on the offset crossing the
  // UTC day boundary (and the server's TZ for zoneless forms).
  // Third-party API callers got semi-random 400s on valid-looking ISO
  // strings. The cure: ONLY the two sanctioned forms — the bare calendar
  // date and the Z-suffixed ISO datetime — everything else rejects
  // deterministically.
  it.each([
    "2026-01-15T23:30:00+05:00", // offset form (the day-boundary roulette)
    "2026-01-15T00:30:00+05:00",
    "2026-01-15T23:30:00-05:00",
    "2026-01-15T23:30:00",       // zoneless datetime (TZ-dependent)
    "2026-01-15T23:30:00.000",   // zoneless with millis
    "2026-01-15 23:30:00",       // space separator
  ])("rejects the unsanctioned datetime form %j (F-217j)", (date) => {
    expect(transactionCreateSchema.safeParse({ ...valid, date }).success).toBe(false);
  });

  it("accepts the Z-suffixed datetime without millis (a sanctioned form)", () => {
    expect(
      transactionCreateSchema.safeParse({ ...valid, date: "2026-11-08T23:30:00Z" }).success,
    ).toBe(true);
  });
});

describe("transactionUpdateSchema (three-state PUT)", () => {
  it("absent fields stay undefined; null notes/nextDate mean the explicit clear", () => {
    const parsed = transactionUpdateSchema.parse({ amount: 10 });
    expect(parsed.description).toBeUndefined();
    expect(parsed.recurring).toBeUndefined();

    // Session-219 (R-16, F-219q): an EXPLICIT null now survives the parse
    // so the routes' `!== undefined` spreads WRITE the clear — the old
    // null→undefined collapse made notes/institution unclearable (no
    // payload could ever clear them). nextDate keeps its null (a true
    // nullable); the string-nullable fields join it.
    const cleared = transactionUpdateSchema.parse({ notes: null, nextDate: null });
    expect(cleared.notes).toBeNull();
    expect(cleared.nextDate).toBeNull();
  });

  it("an empty string also means the clear (not a skip) — F-219q", () => {
    const cleared = transactionUpdateSchema.parse({ notes: "" });
    expect(cleared.notes).toBeNull();
  });

  it("a present notes value round-trips", () => {
    const parsed = transactionUpdateSchema.parse({ notes: "keep me" });
    expect(parsed.notes).toBe("keep me");
  });

  it("still validates present fields", () => {
    expect(
      transactionUpdateSchema.safeParse({ budgetCategory: "luxury" }).success,
    ).toBe(false);
  });
});

describe("incomeSourceCreateSchema", () => {
  it("defaults type salary / frequency monthly / active true", () => {
    const parsed = incomeSourceCreateSchema.parse({ name: "Side gig", amount: 500 });
    expect(parsed.type).toBe("salary");
    expect(parsed.frequency).toBe("monthly");
    expect(parsed.active).toBe(true);
  });

  it("rejects an unknown frequency", () => {
    expect(
      incomeSourceCreateSchema.safeParse({ name: "x", amount: 1, frequency: "sometimes" })
        .success,
    ).toBe(false);
  });
});

describe("bankAccountCreateSchema", () => {
  it("defaults checking / USD / balance 0 and accepts negative credit balances", () => {
    const parsed = bankAccountCreateSchema.parse({ name: "Card" });
    expect(parsed.type).toBe("checking");
    expect(parsed.currency).toBe("USD");
    expect(parsed.balance).toBe(0);

    const credit = bankAccountCreateSchema.parse({ name: "Card", balance: -1284.32 });
    expect(credit.balance).toBe(-1284.32);
  });

  it("validates the color hex shape", () => {
    expect(
      bankAccountCreateSchema.safeParse({ name: "x", color: "blue" }).success,
    ).toBe(false);
    expect(
      bankAccountCreateSchema.safeParse({ name: "x", color: "#3b82f6" }).success,
    ).toBe(true);
  });
});

describe("investmentCreateSchema", () => {
  it("uppercases the symbol and requires positive shares", () => {
    const parsed = investmentCreateSchema.parse({
      symbol: "aapl",
      name: "Apple Inc.",
      shares: 10,
      avgCost: 100,
      currentValue: 150,
    });
    expect(parsed.symbol).toBe("AAPL");
    expect(
      investmentCreateSchema.safeParse({
        symbol: "x",
        name: "x",
        shares: 0,
        avgCost: 1,
        currentValue: 1,
      }).success,
    ).toBe(false);
  });
});

// Session-221 (R-18, F-221h): the update twin's shares cap — the
// create arm capped at 1e9 while the update arm accepted any finite
// positive, so PUT /api/investments/[id] with shares=1e15 stored and
// shares×currentValue overflowed to Infinity inside portfolioStats.
describe("investmentUpdateSchema (F-221h — the shares cap parity)", () => {
  it("rejects shares above 1e9 on BOTH arms (the create cap, the update gap)", () => {
    const base = { symbol: "aapl", name: "x", shares: 10, avgCost: 100, currentValue: 150 };
    expect(investmentCreateSchema.safeParse({ ...base, shares: 1e15 }).success).toBe(false);
    // Pre-cure: the update arm accepted 1e15 (finite, positive).
    expect(investmentUpdateSchema.safeParse({ shares: 1e15 }).success).toBe(false);
    expect(investmentUpdateSchema.safeParse({ shares: 10 }).success).toBe(true);
    expect(investmentUpdateSchema.safeParse({ shares: 0 }).success).toBe(false);
  });
});

describe("goalCreateSchema + budgetUpsertSchema", () => {
  it("goal defaults: category other, status active, current 0", () => {
    const parsed = goalCreateSchema.parse({ name: "Trip", targetAmount: 8000 });
    expect(parsed.category).toBe("other");
    expect(parsed.status).toBe("active");
    expect(parsed.currentAmount).toBe(0);
  });

  it("budget upsert pins the monthly period and validates the amount", () => {
    expect(budgetUpsertSchema.parse({ category: "Groceries", amount: 550 }).period).toBe(
      "monthly",
    );
    expect(
      budgetUpsertSchema.safeParse({ category: "Groceries", amount: -5 }).success,
    ).toBe(false);
  });
});

describe("settingsUpdateSchema", () => {
  it("accepts the currency/date/switch vocabulary and rejects strangers", () => {
    expect(
      settingsUpdateSchema.safeParse({ defaultCurrency: "EUR", emailAlerts: true }).success,
    ).toBe(true);
    expect(settingsUpdateSchema.safeParse({ defaultCurrency: "XYZ" }).success).toBe(false);
    expect(settingsUpdateSchema.safeParse({ dateFormat: "dd.mm.yyyy" }).success).toBe(false);
  });
});

describe("csvImportSchema", () => {
  const rows = [
    {
      description: "Coffee",
      amount: 4.5,
      type: "expense",
      date: "2026-11-01",
    },
  ];

  it("applies row defaults and enforces the 5000-row cap", () => {
    const parsed = csvImportSchema.parse({ rows });
    expect(parsed.rows[0].category).toBe("Other");
    expect(
      csvImportSchema.safeParse({ rows: Array.from({ length: 5001 }, () => rows[0]) }).success,
    ).toBe(false);
  });

  it("rejects an empty row set with the route's message", () => {
    const res = csvImportSchema.safeParse({ rows: [] });
    expect(res.success).toBe(false);
  });
});

describe("aiCoachSchema", () => {
  it("requires a non-empty question and caps history at 30 turns", () => {
    expect(aiCoachSchema.safeParse({ question: "  " }).success).toBe(false);
    expect(
      aiCoachSchema.safeParse({
        question: "How am I doing?",
        history: Array.from({ length: 31 }, () => ({ role: "user", content: "x" })),
      }).success,
    ).toBe(false);
    expect(
      aiCoachSchema.parse({ question: "How am I doing?" }).history,
    ).toEqual([]);
  });
});

// Session-236 (R-33, F-236a): the no-fields guard. All five update
// schemas are all-optional by design (three-state PUT semantics), but a
// body with NO known fields parses to {} and Prisma short-circuits
// updateMany({ data: {} }) to count 0 — the routes answered 404 for an
// existing, owned record (live-reproduced against the exact client).
// The refine makes the no-field body an honest 400.
describe("the update schemas' no-fields guard (F-236a)", () => {
  it.each([
    ["transactionUpdateSchema", transactionUpdateSchema],
    ["incomeSourceUpdateSchema", incomeSourceUpdateSchema],
    ["bankAccountUpdateSchema", bankAccountUpdateSchema],
    ["investmentUpdateSchema", investmentUpdateSchema],
    ["goalUpdateSchema", goalUpdateSchema],
  ] as const)("%s rejects a body with no known fields", (_name, schema) => {
    expect(schema.safeParse({}).success).toBe(false);
    // Unknown keys are stripped by zod — a body of ONLY unknown keys is
    // the same no-fields update.
    expect(schema.safeParse({ nonsense: 1 }).success).toBe(false);
  });

  it("the guard's message maps through parseBody's issue mapping", () => {
    const res = transactionUpdateSchema.safeParse({});
    expect(res.success).toBe(false);
    if (!res.success) expect(res.error.issues[0].message).toBe("No fields to update");
  });

  it("a single-field PUT keeps its three-state semantics (the guard does not overreach)", () => {
    const parsed = transactionUpdateSchema.parse({ amount: 10 });
    expect(parsed.amount).toBe(10);
    expect(parsed.notes).toBeUndefined();
  });
});

// Session-236 (R-33, F-236c): the uniform clear contract. The F-219q
// string family (notes/institution/accountId) treats "" and null as THE
// CLEAR; the dates 400'd on "" (dateField's min(1) fires ahead of any
// transform) and the create twins rejected the null the update twins
// accept. The clearable-date seam normalizes both forms on both twins;
// color and icon join the contract.
describe("the uniform clear contract (F-236c)", () => {
  const txValid = {
    description: "Whole Foods run",
    amount: 142.67,
    type: "expense",
    date: "2026-11-08",
  };
  const isValid = { name: "Side gig", amount: 500 };
  const invValid = { symbol: "aapl", name: "Apple", shares: 10, avgCost: 100, currentValue: 150 };
  const goalValid = { name: "Trip", targetAmount: 8000 };
  const acctValid = {
    name: "Checking",
    type: "checking",
    balance: 1000,
    institution: "House Bank",
  };

  it("the empty string clears the nullable dates on the update twins", () => {
    expect(transactionUpdateSchema.parse({ nextDate: "" }).nextDate).toBeNull();
    expect(incomeSourceUpdateSchema.parse({ nextPaymentDate: "" }).nextPaymentDate).toBeNull();
    expect(investmentUpdateSchema.parse({ purchaseDate: "" }).purchaseDate).toBeNull();
    expect(goalUpdateSchema.parse({ targetDate: "" }).targetDate).toBeNull();
  });

  it("the empty string clears the nullable dates on the create twins too (one uniform shape)", () => {
    expect(transactionCreateSchema.parse({ ...txValid, nextDate: "" }).nextDate).toBeNull();
    expect(incomeSourceCreateSchema.parse({ ...isValid, nextPaymentDate: "" }).nextPaymentDate).toBeNull();
    expect(investmentCreateSchema.parse({ ...invValid, purchaseDate: "" }).purchaseDate).toBeNull();
    expect(goalCreateSchema.parse({ ...goalValid, targetDate: "" }).targetDate).toBeNull();
  });

  it("null joins the create twins (the update twins already accept it)", () => {
    expect(transactionCreateSchema.parse({ ...txValid, nextDate: null }).nextDate).toBeNull();
    expect(goalCreateSchema.parse({ ...goalValid, targetDate: null, icon: null }).targetDate).toBeNull();
    expect(
      goalCreateSchema.parse({ ...goalValid, targetDate: null, icon: null }).icon,
    ).toBeNull();
    expect(bankAccountCreateSchema.parse({ ...acctValid, color: null }).color).toBeNull();
  });

  it("the empty string clears color and icon on both twins", () => {
    expect(bankAccountCreateSchema.parse({ ...acctValid, color: "" }).color).toBeNull();
    expect(bankAccountUpdateSchema.parse({ color: "" }).color).toBeNull();
    expect(goalCreateSchema.parse({ ...goalValid, icon: "" }).icon).toBeNull();
    expect(goalUpdateSchema.parse({ icon: "" }).icon).toBeNull();
  });

  it("a present valid date still round-trips on both twins", () => {
    expect(transactionUpdateSchema.parse({ nextDate: "2026-06-01" }).nextDate).toBe("2026-06-01");
    expect(
      transactionCreateSchema.parse({ ...txValid, nextDate: "2026-06-01" }).nextDate,
    ).toBe("2026-06-01");
  });

  it("the REQUIRED date fields still reject the empty string (the guard is per-field, not global)", () => {
    expect(transactionCreateSchema.safeParse({ ...txValid, date: "" }).success).toBe(false);
  });

  it("a present valid hex color still round-trips", () => {
    expect(bankAccountCreateSchema.parse({ ...acctValid, color: "#3b82f6" }).color).toBe("#3b82f6");
  });

  // Session-237 (R-34, F-237e): whitespace-only joins the uniform clear.
  // Pre-cure "  " diverged across the family — the icon stored the
  // empty string (the clear never happened), color and the clearable
  // dates 400'd, only the F-219q transform family cleared. All five
  // preprocess guards ride the trim-aware form now.
  it("whitespace-only clears the nullable dates on the update twins", () => {
    expect(transactionUpdateSchema.parse({ nextDate: "   " }).nextDate).toBeNull();
    expect(incomeSourceUpdateSchema.parse({ nextPaymentDate: "  " }).nextPaymentDate).toBeNull();
    expect(investmentUpdateSchema.parse({ purchaseDate: "  " }).purchaseDate).toBeNull();
    expect(goalUpdateSchema.parse({ targetDate: "  " }).targetDate).toBeNull();
  });

  it("whitespace-only clears color and icon on both twins", () => {
    expect(bankAccountCreateSchema.parse({ ...acctValid, color: "  " }).color).toBeNull();
    expect(bankAccountUpdateSchema.parse({ color: "   " }).color).toBeNull();
    expect(goalCreateSchema.parse({ ...goalValid, icon: "  " }).icon).toBeNull();
    expect(goalUpdateSchema.parse({ icon: "  " }).icon).toBeNull();
  });

  it("the REQUIRED fields still reject whitespace-only (only the clearable family widens)", () => {
    expect(transactionCreateSchema.safeParse({ ...txValid, date: "  " }).success).toBe(false);
    expect(bankAccountUpdateSchema.safeParse({ color: "  " }).success).toBe(true);
  });
});
