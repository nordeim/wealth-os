import { afterEach, describe, expect, it } from "vitest";
import {
  addMonths,
  assetAllocation,
  budgetCategorySplit,
  budgetVsActual,
  cashFlowSeries,
  categoryTrend,
  deltaPct,
  expenseBreakdown,
  financialHealthScore,
  formatAxisMoney,
  formatMoney,
  goalProgress,
  healthAdvice,
  healthBand,
  longDate,
  monthlyExpenses,
  monthlyIncomeFromTx,
  netBalance,
  portfolioStats,
  previousMonth,
  recentActivity,
  round1,
  round2,
  sameMonth,
  savingsRate,
  startOfMonth,
  toDate,
  totalMonthlyIncome,
  transactionsInMonth,
  unusualTransactions,
  upcomingAlerts,
  type TxLike,
} from "@/lib/finance";

// Deterministic fixtures — the math must be pinned against literals
// computed independently of the implementation (the TDD doctrine).
const REF = new Date(2026, 10, 8); // Nov 8, 2026

function tx(partial: Partial<TxLike> & { amount: number; type: string; date: Date }): TxLike {
  return {
    description: partial.description ?? "Fixture",
    category: partial.category ?? "Other",
    budgetCategory: partial.budgetCategory ?? "wants",
    ...partial,
  };
}

const NOV = [
  tx({ description: "Salary", amount: 7800, type: "income", date: new Date(2026, 10, 1), category: "Salary" }),
  tx({ description: "Rent", amount: 2150, type: "expense", date: new Date(2026, 10, 1), category: "Rent/Mortgage", budgetCategory: "needs" }),
  tx({ description: "Groceries", amount: 142.67, type: "expense", date: new Date(2026, 10, 4), category: "Groceries", budgetCategory: "needs" }),
  tx({ description: "Cinema", amount: 42, type: "expense", date: new Date(2026, 10, 22), category: "Entertainment", budgetCategory: "wants" }),
  tx({ description: "Savings", amount: 500, type: "expense", date: new Date(2026, 10, 5), category: "Savings Transfer", budgetCategory: "savings" }),
];
const OCT = [
  tx({ description: "Salary", amount: 7800, type: "income", date: new Date(2026, 9, 1), category: "Salary" }),
  tx({ description: "Rent", amount: 2150, type: "expense", date: new Date(2026, 9, 1), category: "Rent/Mortgage", budgetCategory: "needs" }),
];
const TXS = [...NOV, ...OCT];

describe("monthly aggregates", () => {
  it("sums the month's income and expenses separately", () => {
    expect(monthlyIncomeFromTx(TXS, REF)).toBe(7800);
    expect(monthlyExpenses(TXS, REF)).toBe(round2(2150 + 142.67 + 42 + 500));
  });

  it("net = income − expenses", () => {
    expect(netBalance(TXS, REF)).toBe(round2(7800 - 2834.67));
  });

  it("savings rate guards divide-by-zero and rounds to 0.1", () => {
    expect(savingsRate(TXS, REF)).toBe(round1(((7800 - 2834.67) / 7800) * 100));
    expect(savingsRate([], REF)).toBe(0);
  });

  it("deltaPct handles zero bases honestly", () => {
    expect(deltaPct(100, 50)).toBe(100);
    expect(deltaPct(50, 100)).toBe(-50);
    expect(deltaPct(0, 0)).toBe(0);
    expect(deltaPct(10, 0)).toBeNull();
  });

  it("previousMonth walks back across the year boundary", () => {
    const jan = new Date(2027, 0, 15);
    expect(previousMonth(jan).getMonth()).toBe(11);
    expect(previousMonth(jan).getFullYear()).toBe(2026);
  });
});

describe("income sources", () => {
  it("normalizes frequencies onto the monthly footing (active only)", () => {
    expect(
      totalMonthlyIncome([
        { name: "salary", amount: 2600, frequency: "weekly", active: true },
        { name: "rental", amount: 3000, frequency: "quarterly", active: true },
        { name: "paused", amount: 1000, frequency: "monthly", active: false },
      ]),
    ).toBe(round2(2600 * (52 / 12) + 3000 * (1 / 3)));
  });
});

describe("cash flow series", () => {
  it("builds trailing monthly buckets with the Jun-26 label genus", () => {
    const series = cashFlowSeries(TXS, 3, REF);
    expect(series).toHaveLength(3);
    expect(series[2].label).toBe("Nov 26");
    expect(series[2].income).toBe(7800);
    expect(series[2].expenses).toBe(round2(2834.67));
    expect(series[2].net).toBe(round2(7800 - 2834.67));
    expect(series[0].label).toBe("Sep 26");
  });
});

describe("financial health score", () => {
  const investments = [
    { symbol: "VTI", name: "Vanguard", type: "etf", shares: 10, avgCost: 200, currentValue: 250 },
  ];

  it("scores the three 40/30/30 rows and clamps each", () => {
    const score = financialHealthScore(TXS, investments, REF);
    const [savings, spending, invests] = score.metrics;
    expect(savings.max).toBe(40);
    expect(spending.max).toBe(30);
    expect(invests.max).toBe(30);
    expect(score.total).toBe(savings.score + spending.score + invests.score);
    expect(score.total).toBeLessThanOrEqual(100);
    expect(score.total).toBeGreaterThanOrEqual(0);
  });

  it("empty data lands in the Needs Work band with zero everywhere", () => {
    const score = financialHealthScore([], [], REF);
    expect(score.total).toBe(0);
    expect(score.band).toBe("Needs Work");
  });

  it("bands partition 0-100", () => {
    expect(healthBand(0)).toBe("Needs Work");
    expect(healthBand(39)).toBe("Needs Work");
    expect(healthBand(40)).toBe("Fair");
    expect(healthBand(59)).toBe("Fair");
    expect(healthBand(60)).toBe("Good");
    expect(healthBand(79)).toBe("Good");
    expect(healthBand(80)).toBe("Excellent");
    expect(healthBand(100)).toBe("Excellent");
  });

  it("advice names the weakest dimension", () => {
    const empty = financialHealthScore([], [], REF);
    expect(healthAdvice(empty)).toMatch(/reducing expenses|portfolio/i);
  });
});

describe("expense breakdown + budget split", () => {
  it("ranks categories desc with palette, pct and sum ≈ total", () => {
    const slices = expenseBreakdown(TXS, REF);
    expect(slices[0].category).toBe("Rent/Mortgage");
    const total = slices.reduce((s, x) => s + x.value, 0);
    expect(total).toBeCloseTo(2834.67, 1);
    expect(slices[0].pct).toBeGreaterThan(slices[slices.length - 1].pct);
    expect(slices[0].color).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("splits needs/wants/savings", () => {
    const split = budgetCategorySplit(TXS, REF);
    expect(split.needs).toBe(round2(2150 + 142.67));
    expect(split.wants).toBe(42);
    expect(split.savings).toBe(500);
  });
});

describe("budget vs actual", () => {
  it("computes remaining, pct and the over flag", () => {
    const rows = budgetVsActual(
      TXS,
      [
        { category: "Groceries", amount: 100, period: "monthly" },
        { category: "Rent/Mortgage", amount: 2500, period: "monthly" },
      ],
      REF,
    );
    const groceries = rows.find((r) => r.category === "Groceries")!;
    expect(groceries.over).toBe(true);
    expect(groceries.remaining).toBe(round2(100 - 142.67));
    const rent = rows.find((r) => r.category === "Rent/Mortgage")!;
    expect(rent.over).toBe(false);
    expect(rent.pct).toBe(round1((2150 / 2500) * 100));
  });
});

describe("upcoming & alerts", () => {
  it("lists recurring nextDates inside the 14-day horizon, soonest first", () => {
    const soon = tx({
      description: "Rent",
      amount: 2150,
      type: "expense",
      date: new Date(2026, 10, 1),
      recurring: true,
      nextDate: new Date(2026, 10, 12),
    });
    const later = tx({
      description: "Netflix",
      amount: 20,
      type: "expense",
      date: new Date(2026, 10, 2),
      recurring: true,
      nextDate: new Date(2026, 10, 25),
    });
    const out = upcomingAlerts([soon, later], REF);
    expect(out).toHaveLength(1);
    expect(out[0].description).toBe("Rent");
    expect(out[0].daysAway).toBe(4);
  });

  it("includes month-to-date OVERDUE rows but drops previous-month ones (the deliberate window, F-214g)", () => {
    // The section is "Upcoming & Alerts": a bill that came due earlier
    // THIS month stays visible as an overdue alert (negative daysAway,
    // rendered "Due N days ago"), while a nextDate from a PREVIOUS
    // month is stale and drops out. Pinned so the window cannot drift
    // silently — the docblock in finance.ts is the contract.
    const overdue = tx({
      description: "Phone bill",
      amount: 45,
      type: "expense",
      date: new Date(2026, 10, 1),
      recurring: true,
      nextDate: new Date(2026, 10, 5), // 3 days before REF (Nov 8)
    });
    const stale = tx({
      description: "Old gym",
      amount: 30,
      type: "expense",
      date: new Date(2026, 8, 1),
      recurring: true,
      nextDate: new Date(2026, 9, 28), // October — previous month
    });
    const out = upcomingAlerts([overdue, stale], REF);
    expect(out.map((o) => o.description)).toEqual(["Phone bill"]);
    expect(out[0].daysAway).toBe(-3);
  });
});

describe("portfolio", () => {
  const holdings = [
    { symbol: "AAPL", name: "Apple", type: "stock", shares: 10, avgCost: 100, currentValue: 150 },
    { symbol: "BND", name: "Bond", type: "bond", shares: 10, avgCost: 100, currentValue: 90 },
  ];

  it("computes value, invested, gain/loss, return % and per-holding shares", () => {
    const stats = portfolioStats(holdings);
    expect(stats.value).toBe(2400);
    expect(stats.invested).toBe(2000);
    expect(stats.gainLoss).toBe(400);
    expect(stats.returnPct).toBe(20);
    const aapl = stats.holdings.find((h) => h.symbol === "AAPL")!;
    expect(aapl.gainLoss).toBe(500);
    expect(aapl.gainPct).toBe(50);
    expect(aapl.pctOfPortfolio).toBe(round1((1500 / 2400) * 100));
  });

  it("allocates by type, sorted desc", () => {
    const alloc = assetAllocation(holdings);
    expect(alloc[0].type).toBe("stock");
    expect(alloc[0].pct).toBe(round1((1500 / 2400) * 100));
  });

  it("guards zero invested (no divide-by-zero NaN)", () => {
    const stats = portfolioStats([]);
    expect(stats.returnPct).toBe(0);
    expect(stats.value).toBe(0);
  });
});

describe("goals", () => {
  it("computes pct (capped at 100), remaining and monthly pacing", () => {
    const g = { name: "Trip", targetAmount: 8000, currentAmount: 9000, targetDate: addMonths(REF, 10), status: "active" };
    const p = goalProgress(g, REF);
    expect(p.pct).toBe(100);
    expect(p.remaining).toBe(0);
    expect(p.perMonthNeeded).toBe(0);

    const g2 = { ...g, currentAmount: 2000 };
    const p2 = goalProgress(g2, REF);
    expect(p2.pct).toBe(25);
    expect(p2.remaining).toBe(6000);
    expect(p2.monthsLeft).toBe(10);
    expect(p2.perMonthNeeded).toBe(600);
  });
});

describe("recent activity + anomalies", () => {
  it("sorts by date desc and caps the limit", () => {
    const rows = recentActivity(TXS, 2);
    expect(rows).toHaveLength(2);
    expect(rows[0].date.getTime()).toBeGreaterThanOrEqual(rows[1].date.getTime());
  });

  it("flags rows ≥ 2× their category mean (min 3 samples)", () => {
    const groceries = [
      tx({ description: "g1", amount: 100, type: "expense", date: new Date(2026, 10, 2), category: "Groceries" }),
      tx({ description: "g2", amount: 110, type: "expense", date: new Date(2026, 10, 9), category: "Groceries" }),
      tx({ description: "g3", amount: 90, type: "expense", date: new Date(2026, 10, 16), category: "Groceries" }),
      tx({ description: "big shop", amount: 400, type: "expense", date: new Date(2026, 10, 20), category: "Groceries" }),
    ];
    const unusual = unusualTransactions(groceries, REF);
    expect(unusual).toHaveLength(1);
    expect(unusual[0].description).toBe("big shop");
    expect(unusual[0].reason).toContain("400.00");
  });
});

describe("analytics series", () => {
  it("categoryTrend buckets one category across months", () => {
    const trend = categoryTrend(TXS, 2, REF, "Salary", "income");
    expect(trend).toHaveLength(2);
    expect(trend[0].value).toBe(7800); // October
    expect(trend[1].value).toBe(7800); // November
  });

  it("transactionsInMonth filters by type", () => {
    expect(transactionsInMonth(TXS, REF, "expense")).toHaveLength(4);
    expect(transactionsInMonth(TXS, REF, "income")).toHaveLength(1);
  });
});

describe("formatting", () => {
  it("formatMoney renders the $0.00 genus with signs and separators", () => {
    expect(formatMoney(0)).toBe("$0.00");
    expect(formatMoney(1234.5)).toBe("$1,234.50");
    expect(formatMoney(-42)).toBe("-$42.00");
  });

  it("formatAxisMoney compacts to $4k genus", () => {
    expect(formatAxisMoney(0)).toBe("$0");
    expect(formatAxisMoney(4200)).toBe("$4.2k");
    expect(formatAxisMoney(4000)).toBe("$4k");
    expect(formatAxisMoney(-2500)).toBe("-$2.5k");
  });

  it("longDate renders the reference's weekday genus", () => {
    expect(longDate(new Date(2026, 10, 8))).toBe("Sunday, November 8, 2026");
  });
});

// Session-218 (R-15, F-218d — the UTC-midnight calendar normalization):
// dateField accepts yyyy-mm-dd; new Date("2026-11-01") parses as UTC
// midnight; Prisma returns 2026-11-01T00:00:00.000Z — and the bucketing
// seams (sameMonth/startOfMonth) plus the raw-parse display sites read
// LOCAL calendar parts. Verified live: in America/New_York a Nov 1
// transaction rendered 10/31/2026 and bucketed into October — rent on
// the 1st, the canonical case — for every UTC-negative user (the
// sandbox runs UTC, which is why every gate was blind). The cure:
// toDate re-anchors UTC-midnight ISO strings to LOCAL midnight of the
// same calendar date; true timestamps keep their instant. Both engines
// honor dynamic process.env.TZ (verified), so the pins run the real
// zone rather than reasoning about it.
describe("session-218: UTC-midnight calendar normalization (F-218d)", () => {
  const SAVED_TZ = process.env.TZ;
  afterEach(() => {
    process.env.TZ = SAVED_TZ;
  });

  it("a UTC-midnight ISO string re-anchors to the same LOCAL calendar date in a UTC-negative zone", () => {
    process.env.TZ = "America/New_York";
    const d = toDate("2026-11-01T00:00:00.000Z");
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(10); // November — pre-cure: 9 (October)
    expect(d.getDate()).toBe(1); // the 1st — pre-cure: 31
  });

  it("sameMonth buckets a 1st-of-month row into its own month (rent on the 1st)", () => {
    process.env.TZ = "America/New_York";
    const stored = toDate("2026-11-01T00:00:00.000Z");
    expect(sameMonth(stored, new Date(2026, 10, 15))).toBe(true);
    expect(sameMonth(stored, new Date(2026, 9, 15))).toBe(false);
  });

  it("transactionsInMonth counts the 1st-of-month row in its own month", () => {
    process.env.TZ = "America/New_York";
    const txs: TxLike[] = [
      { id: "1", description: "rent", amount: 2000, type: "expense", category: "Housing", budgetCategory: "needs", date: "2026-11-01T00:00:00.000Z" },
    ];
    expect(transactionsInMonth(txs, new Date(2026, 10, 15))).toHaveLength(1);
    expect(transactionsInMonth(txs, new Date(2026, 9, 15))).toHaveLength(0);
  });

  it("non-midnight instants keep their time (true timestamps are not calendar dates)", () => {
    process.env.TZ = "America/New_York";
    expect(toDate("2026-11-01T18:30:00.000Z").toISOString()).toBe(
      "2026-11-01T18:30:00.000Z",
    );
  });

  it("Date inputs pass through untouched (the seed and tests construct local Dates)", () => {
    process.env.TZ = "America/New_York";
    const d = new Date(2026, 10, 1);
    expect(toDate(d)).toBe(d);
  });

  it("the yyyy-mm-dd bare form stays a UTC-midnight anchor (the dateField contract)", () => {
    process.env.TZ = "America/New_York";
    // The API layer stores new Date("2026-11-01") — UTC midnight —
    // serialized back as the .000Z form the re-anchor keys on.
    expect(new Date("2026-11-01").toISOString()).toBe("2026-11-01T00:00:00.000Z");
  });

  // Session-220 (R-17, F-220a): the BARE form is a calendar date too —
  // the analytics refs hold toDateInputValue() strings ("2026-11-01"),
  // and the F-219e "cure" routed them through a toDate whose pattern
  // matched only the stored .000Z form (a verified no-op: the trailing
  // bucket keyed October for a UTC-negative user on a 1st-of-month `to`,
  // and the Nov-1 rows dropped from every series — live-reproduced).
  it("toDate re-anchors the BARE yyyy-mm-dd form (the F-220a cure)", () => {
    process.env.TZ = "America/New_York";
    const d = toDate("2026-11-01");
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(10); // November — pre-cure: 9 (October)
    expect(d.getDate()).toBe(1); // the 1st — pre-cure: 31
  });

  it("startOfMonth keys the month the user sees on a bare-form ref (the analytics trailing bucket)", () => {
    process.env.TZ = "America/New_York";
    expect(startOfMonth(toDate("2026-11-01")).getMonth()).toBe(10); // November
  });

  it("cashFlowSeries keeps a 1st-of-month row in its own bucket on a bare-form ref", () => {
    process.env.TZ = "America/New_York";
    const txs: TxLike[] = [
      { id: "1", description: "rent", amount: 2000, type: "expense", category: "Housing", budgetCategory: "needs", date: "2026-11-01T00:00:00.000Z" },
    ];
    const series = cashFlowSeries(txs, 3, toDate("2026-11-30"));
    const last = series[series.length - 1];
    expect(last.label).toContain("Nov");
    expect(last.expenses).toBe(2000); // pre-cure: 0 — the row dropped
  });
});
