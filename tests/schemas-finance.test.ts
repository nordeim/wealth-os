import { describe, expect, it } from "vitest";
import {
  aiCoachSchema,
  bankAccountCreateSchema,
  budgetUpsertSchema,
  csvImportSchema,
  goalCreateSchema,
  incomeSourceCreateSchema,
  investmentCreateSchema,
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

    const cleared = transactionUpdateSchema.parse({ notes: null, nextDate: null });
    expect(cleared.notes).toBeUndefined();
    expect(cleared.nextDate).toBeNull();
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
