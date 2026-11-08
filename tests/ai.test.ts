import { describe, expect, it } from "vitest";
import { getAiProvider, type AiContext } from "@/lib/ai";

// The deterministic local AI engine — pinned against worked literals so
// the coach's answers stay trustworthy without any network dependency.

const REF = new Date(2026, 10, 8); // Nov 8, 2026

function ctx(overrides: Partial<AiContext> = {}): AiContext {
  return {
    transactions: [
      { description: "Salary", amount: 7800, type: "income", category: "Salary", date: new Date(2026, 10, 1) },
      { description: "Rent", amount: 2150, type: "expense", category: "Rent/Mortgage", budgetCategory: "needs", date: new Date(2026, 10, 1) },
      { description: "Whole Foods", amount: 142.67, type: "expense", category: "Groceries", budgetCategory: "needs", date: new Date(2026, 10, 4) },
      { description: "Dinner at Lucia", amount: 76.5, type: "expense", category: "Dining Out", budgetCategory: "wants", date: new Date(2026, 10, 15) },
      { description: "Coffee", amount: 18.75, type: "expense", category: "Coffee", budgetCategory: "wants", date: new Date(2026, 10, 6) },
    ],
    incomeSources: [
      { name: "Salary", amount: 7800, frequency: "monthly", active: true },
    ],
    investments: [
      { symbol: "VTI", name: "Vanguard", type: "etf", shares: 10, avgCost: 200, currentValue: 250 },
    ],
    goals: [
      { name: "Emergency Fund", targetAmount: 20000, currentAmount: 15600, targetDate: new Date(2027, 4, 1), status: "active" },
    ],
    budgets: [{ category: "Groceries", amount: 100, period: "monthly" }],
    now: REF,
    ...overrides,
  };
}

describe("the local AI provider: insights", () => {
  it("derives the spend-trend insight from the month-over-month delta", () => {
    const insights = getAiProvider().insights(ctx());
    const trend = insights.find((i) => i.id === "spend-trend");
    // November has expenses, October none → deltaPct is null (zero base)
    expect(trend).toBeUndefined();
  });

  it("derives the budget-breach insight when a category goes over", () => {
    const insights = getAiProvider().insights(ctx());
    const breach = insights.find((i) => i.id === "budget-breach");
    expect(breach).toBeDefined();
    expect(breach!.title).toContain("Groceries");
  });

  it("derives the portfolio insight with the all-time return", () => {
    const insights = getAiProvider().insights(ctx());
    const portfolio = insights.find((i) => i.id === "portfolio");
    expect(portfolio).toBeDefined();
    expect(portfolio!.title).toContain("25% all time");
  });

  it("derives the goal-pacing insight with the per-month need", () => {
    const insights = getAiProvider().insights(ctx());
    const pacing = insights.find((i) => i.id === "goal-pacing");
    expect(pacing).toBeDefined();
    expect(pacing!.title).toContain("78% funded");
  });

  it("caps the insight list at 4", () => {
    const insights = getAiProvider().insights(ctx());
    expect(insights.length).toBeLessThanOrEqual(4);
  });

  it("empty context yields zero insights (the empty-state genus)", () => {
    const insights = getAiProvider().insights({
      transactions: [],
      incomeSources: [],
      investments: [],
      goals: [],
      budgets: [],
      now: REF,
    });
    expect(insights).toHaveLength(0);
  });
});

describe("the local AI provider: coach", () => {
  it("answers the top-categories question with a ranked list", () => {
    const { answer } = getAiProvider().coach("What are my top spending categories?", ctx());
    expect(answer).toContain("Rent/Mortgage");
    expect(answer).toMatch(/1\./);
  });

  it("answers the dining question with the food-family total", () => {
    const { answer } = getAiProvider().coach("How much did I spend on dining this month?", ctx());
    expect(answer).toContain("$95.25"); // 76.50 + 18.75
  });

  it("answers the goals question with per-goal pacing", () => {
    const { answer } = getAiProvider().coach("Am I on track with my savings goals?", ctx());
    expect(answer).toContain("Emergency Fund");
    expect(answer).toContain("78%");
  });

  it("answers the save-more question with concrete levers", () => {
    const { answer } = getAiProvider().coach("How can I save more money?", ctx());
    expect(answer).toMatch(/Trim .+ by 15%/);
  });

  it("falls back to the health snapshot for generic questions", () => {
    const { answer } = getAiProvider().coach("hello there", ctx());
    expect(answer).toMatch(/financial health \d+\/100/);
  });

  it("handles the empty-data genus honestly", () => {
    const empty = {
      transactions: [],
      incomeSources: [],
      investments: [],
      goals: [],
      budgets: [],
      now: REF,
    };
    const { answer } = getAiProvider().coach("What are my top spending categories?", empty);
    expect(answer).toContain("no expenses recorded");
  });
});
