// WealthOS domain vocabulary — the finance constants (session-199).
// Every list here is either live-observed from the reference (the Add
// Expense quick-select chips, the Needs/Wants/Savings tabs, the Settings
// currency/date options) or a documented superset choice.

export type BudgetCategory = "needs" | "wants" | "savings";

export const BUDGET_CATEGORIES: BudgetCategory[] = ["needs", "wants", "savings"];

export const BUDGET_CATEGORY_META: Record<
  BudgetCategory,
  { label: string; color: string; soft: string }
> = {
  needs: { label: "Needs", color: "#3b82f6", soft: "#eff6ff" },
  wants: { label: "Wants", color: "#a855f7", soft: "#faf5ff" },
  savings: { label: "Savings", color: "#10b981", soft: "#ecfdf5" },
};

/** The reference's Add Expense quick-select chips (live-observed, emoji
 *  labels included — the emoji are functional markers, preserved
 *  deliberately per the replicate-web-app skill). */
export const QUICK_EXPENSE_CATEGORIES: Array<{
  emoji: string;
  label: string;
  budgetCategory: BudgetCategory;
}> = [
  { emoji: "🏠", label: "Rent/Mortgage", budgetCategory: "needs" },
  { emoji: "🛒", label: "Groceries", budgetCategory: "needs" },
  { emoji: "⚡", label: "Utilities", budgetCategory: "needs" },
  { emoji: "🚗", label: "Transportation", budgetCategory: "needs" },
  { emoji: "🏥", label: "Healthcare", budgetCategory: "needs" },
];

/** The full expense-category vocabulary (the reference's category
 *  combobox + our seeded genera). Emoji map the quick-select face. */
export const EXPENSE_CATEGORIES: Array<{
  label: string;
  emoji: string;
  budgetCategory: BudgetCategory;
}> = [
  { emoji: "🏠", label: "Rent/Mortgage", budgetCategory: "needs" },
  { emoji: "🛒", label: "Groceries", budgetCategory: "needs" },
  { emoji: "⚡", label: "Utilities", budgetCategory: "needs" },
  { emoji: "🚗", label: "Transportation", budgetCategory: "needs" },
  { emoji: "🏥", label: "Healthcare", budgetCategory: "needs" },
  { emoji: "🎓", label: "Education", budgetCategory: "needs" },
  { emoji: "🛡️", label: "Insurance", budgetCategory: "needs" },
  { emoji: "🍽️", label: "Dining Out", budgetCategory: "wants" },
  { emoji: "🎬", label: "Entertainment", budgetCategory: "wants" },
  { emoji: "👕", label: "Shopping", budgetCategory: "wants" },
  { emoji: "✈️", label: "Travel", budgetCategory: "wants" },
  { emoji: "☕", label: "Coffee", budgetCategory: "wants" },
  { emoji: "🎮", label: "Subscriptions", budgetCategory: "wants" },
  { emoji: "💰", label: "Savings Transfer", budgetCategory: "savings" },
  { emoji: "📈", label: "Investment", budgetCategory: "savings" },
  { emoji: "💳", label: "Debt Payment", budgetCategory: "savings" },
  { emoji: "📦", label: "Other", budgetCategory: "wants" },
];

// Session-229 (R-26, F-229f): the income-category chip map retired —
// zero consumers
// (the income dialog's chips ride QUICK_PICK's income arm and the type
// select rides the source-type map). Reintroduce WITH a consumer.

export const INCOME_SOURCE_TYPES = [
  { value: "salary", label: "Salary" },
  { value: "freelance", label: "Freelance" },
  { value: "business", label: "Business" },
  { value: "investment", label: "Investment" },
  { value: "rental", label: "Rental" },
  { value: "other", label: "Other" },
] as const;

export const INCOME_FREQUENCIES = [
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Bi-weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annually", label: "Annually" },
] as const;

/** Monthly-equivalent multiplier per frequency (the Income page's Total
 *  Monthly Income card normalizes every source onto a monthly footing). */
export const FREQUENCY_TO_MONTHLY: Record<string, number> = {
  weekly: 52 / 12,
  biweekly: 26 / 12,
  monthly: 1,
  quarterly: 1 / 3,
  annually: 1 / 12,
};

export const ACCOUNT_TYPES = [
  { value: "checking", label: "Checking", icon: "🏦" },
  { value: "savings", label: "Savings", icon: "🐖" },
  { value: "credit", label: "Credit Card", icon: "💳" },
  { value: "investment", label: "Investment", icon: "📈" },
  { value: "cash", label: "Cash", icon: "💵" },
] as const;

export const INVESTMENT_TYPES = [
  // Session-218 (R-15, F-218k): `text` is the readable ink for the type
  // chip — the 500-level `color` renders 2.1–3.7:1 as text-xs on its own
  // 10% tint; the 600/700-level steps carry 4.5:1+ while the tint keeps
  // the type's hue.
  // Session-223 (R-20, F-223g): `textDark` is the dark-surface ink —
  // the 10% tint over a dark card is near-black, where the 600/700
  // steps compute ≈2:1; the 400-level steps pass on the same tint
  // (the page selects via isDark).
  { value: "stock", label: "Stock", color: "#3b82f6", text: "#1d4ed8", textDark: "#93c5fd" },
  { value: "etf", label: "ETF", color: "#10b981", text: "#047857", textDark: "#6ee7b7" },
  { value: "bond", label: "Bond", color: "#f59e0b", text: "#b45309", textDark: "#fcd34d" },
  { value: "crypto", label: "Crypto", color: "#a855f7", text: "#6d28d9", textDark: "#d8b4fe" },
  { value: "realestate", label: "Real Estate", color: "#f43f5e", text: "#be123c", textDark: "#fda4af" },
  { value: "other", label: "Other", color: "#78716c", text: "#57534e", textDark: "#d6d3d1" },
] as const;

export const GOAL_CATEGORIES = [
  { value: "emergency", label: "Emergency Fund", emoji: "🛡️" },
  { value: "vacation", label: "Vacation", emoji: "✈️" },
  { value: "house", label: "House", emoji: "🏠" },
  { value: "car", label: "Car", emoji: "🚗" },
  { value: "retirement", label: "Retirement", emoji: "🏖️" },
  { value: "education", label: "Education", emoji: "🎓" },
  { value: "other", label: "Other", emoji: "🎯" },
] as const;

/** The reference's Settings currency list (observed option "USD - US
 *  Dollar ($)"; siblings follow the same label shape). */
export const CURRENCIES = [
  { value: "USD", label: "USD - US Dollar ($)" },
  { value: "EUR", label: "EUR - Euro (€)" },
  { value: "GBP", label: "GBP - British Pound (£)" },
  { value: "JPY", label: "JPY - Japanese Yen (¥)" },
  { value: "AED", label: "AED - UAE Dirham (د.إ)" },
  { value: "SGD", label: "SGD - Singapore Dollar (S$)" },
  { value: "AUD", label: "AUD - Australian Dollar (A$)" },
  { value: "CAD", label: "CAD - Canadian Dollar (C$)" },
] as const;

export const DATE_FORMATS = [
  { value: "MM/dd/yyyy", label: "MM/dd/yyyy (12/25/2024)" },
  { value: "dd/MM/yyyy", label: "dd/MM/yyyy (25/12/2024)" },
  { value: "yyyy-MM-dd", label: "yyyy-MM-dd (2024-12-25)" },
  { value: "MMM d, yyyy", label: "MMM d, yyyy (Dec 25, 2024)" },
] as const;

/** The dashboard's segmented period control (live-observed: 1M 3M 6M 1Y,
 *  6M active by default). */
export const PERIOD_OPTIONS = ["1M", "3M", "6M", "1Y"] as const;
export type PeriodOption = (typeof PERIOD_OPTIONS)[number];

export const PERIOD_MONTHS: Record<PeriodOption, number> = {
  "1M": 1,
  "3M": 3,
  "6M": 6,
  "1Y": 12,
};

/** Chart palette — the reference's cash-flow genus (live-observed legend
 *  dots): Income teal, Expenses rose, Net Savings amber. */
export const CHART_COLORS = {
  income: "#14b8a6",
  expenses: "#f43f5e",
  net: "#f59e0b",
} as const;

export const CATEGORY_PALETTE = [
  "#f59e0b",
  "#14b8a6",
  "#f43f5e",
  "#a855f7",
  "#3b82f6",
  "#10b981",
  "#f97316",
  "#64748b",
  "#eab308",
  "#ec4899",
] as const;

/** The AI Coach's suggested questions (live-observed chips). */
export const AI_SUGGESTED_QUESTIONS = [
  "How much did I spend on dining this month?",
  "What are my top spending categories?",
  "Am I on track with my savings goals?",
  "Show me unusual transactions",
  "How can I save more money?",
] as const;

// Session-229 (R-26, F-229f): the currency-symbol map retired — zero
// consumers
// (formatMoney carries its own $ symbol; the Settings currency select is
// the documented decorative parity control, F-228m). Reintroduce WITH a
// consumer (e.g. the F-228m default-currency wiring).

export const APP_NAME = "WealthOS";
export const APP_TAGLINE = "Premium Finance Suite";
