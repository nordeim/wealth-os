// Zod schemas — session-199 (WealthOS): the auth family preserved from
// the hardened 163/166 seam, the CRUD family recast onto the finance
// domain. Nothing reaches Prisma unvalidated (the web-application-
// engineering §6.3 doctrine: Zod at every API boundary).

import { z } from "zod";

import { VERIFICATION_CODE_LENGTH } from "@/lib/verification";
import {
  ACCOUNT_TYPES,
  BUDGET_CATEGORIES,
  CURRENCIES,
  DATE_FORMATS,
  GOAL_CATEGORIES,
  INCOME_FREQUENCIES,
  INCOME_SOURCE_TYPES,
  INVESTMENT_TYPES,
} from "@/lib/constants";

/** The shared email contract: trimmed, lowercased, the 160-char cap that
 *  bounds the SQLite lookup. */
const emailField = (typeMessage: string) =>
  z
    .string({ message: typeMessage })
    .trim()
    .toLowerCase()
    .max(160, "Email must be reasonably sized");

const emailFormat = emailField("Enter a valid email address").regex(
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  "Enter a valid email address",
);

export const emailSchema = emailFormat;

/** Passwords: the 8-char minimum every password-setting surface enforces. */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

export const loginSchema = z
  .object({
    email: z
      .string({ message: "Email and password are required" })
      .trim()
      .toLowerCase()
      .max(160, "Email must be reasonably sized"),
    password: z.string({ message: "Email and password are required" }),
  })
  .superRefine((body, ctx) => {
    if (!body.email || !body.password) {
      ctx.addIssue({ code: "custom", message: "Email and password are required", path: [] });
    }
  });

export const signupSchema = z.object({
  name: z
    .string({ message: "Invalid name" })
    .trim()
    .max(80)
    .transform((v) => (v === "" ? undefined : v))
    .optional(),
  email: emailFormat,
  password: passwordSchema,
});

export const verifySchema = z.object({
  email: emailField("Email is required").min(1, "Email is required"),
  code: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length === VERIFICATION_CODE_LENGTH, "Please enter all 6 digits"),
});

export const resendSchema = z.object({
  email: emailField("Email is required").min(1, "Email is required"),
});

export const forgotPasswordSchema = z.object({
  email: emailFormat,
});

export const resetPasswordSchema = z.object({
  reset_token: z
    .string({ message: "Invalid or expired reset token" })
    .trim()
    .min(1, "Invalid or expired reset token")
    .max(200, "Token must be reasonably sized"),
  new_password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(200, "Password must be reasonably sized"),
});

// ---------------------------------------------------------------------------
// Finance CRUD — the shared field builders
// ---------------------------------------------------------------------------

const moneyField = (message: string) =>
  z
    .number({ message })
    .finite(message)
    .min(0, "Amount must be zero or more")
    .max(1_000_000_000, "Amount is too large");

const signedMoneyField = (message: string) =>
  z
    .number({ message })
    .finite(message)
    .min(-1_000_000_000, "Amount is too large")
    .max(1_000_000_000, "Amount is too large");

// Session-216 (R-13, F-216h): calendar-true dates. The pre-216 refine
// was Date.parse-based — V8 ROLLS invalid calendar dates ("2026-02-30"
// → 2026-03-02) and accepts free-form strings ("March 5, 2026"),
// silently storing the wrong day. The app's own surfaces send exactly
// two forms — `yyyy-mm-dd` (the type="date" inputs) and a full ISO
// datetime (the Import page's toISOString) — so the field now accepts
// ONLY those shapes, with a calendar round-trip (the parsed UTC date
// must equal the date the user wrote) killing the rollovers.
const dateField = (message: string) =>
  z
    .string({ message })
    .trim()
    .min(1, message)
    .refine((v) => {
      if (!/^\d{4}-\d{2}-\d{2}(T.*)?$/.test(v)) return false;
      const d = new Date(v);
      return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v.slice(0, 10);
    }, "Enter a valid date");

const enumField = <T extends readonly string[]>(
  values: T,
  message: string,
) => z.string({ message }).refine((v) => (values as readonly string[]).includes(v), message);

// ---- transactions (income + expense) ----------------------------------------

export const transactionCreateSchema = z.object({
  description: z
    .string({ message: "Description is required" })
    .trim()
    .min(1, "Description is required")
    .max(200, "Description must be reasonably sized"),
  amount: moneyField("Amount is required"),
  type: enumField(["income", "expense"], "Invalid transaction type"),
  category: z
    .string({ message: "Category is required" })
    .trim()
    .min(1, "Category is required")
    .max(80, "Category must be reasonably sized")
    .default("Other"),
  budgetCategory: enumField(BUDGET_CATEGORIES, "Invalid budget category").default("needs"),
  date: dateField("Date is required"),
  notes: z
    .string()
    .trim()
    .max(1000, "Notes must be reasonably sized")
    .transform((v) => (v === "" ? undefined : v))
    .optional(),
  recurring: z.boolean().default(false),
  nextDate: dateField("Enter a valid next date").optional(),
  accountId: z
    .string()
    .trim()
    .max(64)
    .transform((v) => (v === "" ? undefined : v))
    .optional(),
});

export const transactionUpdateSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(200, "Description must be reasonably sized")
    .optional(),
  amount: moneyField("Amount is required").optional(),
  type: enumField(["income", "expense"], "Invalid transaction type").optional(),
  category: z
    .string()
    .trim()
    .min(1, "Category is required")
    .max(80, "Category must be reasonably sized")
    .optional(),
  budgetCategory: enumField(BUDGET_CATEGORIES, "Invalid budget category").optional(),
  date: dateField("Date is required").optional(),
  notes: z
    .string()
    .trim()
    .max(1000, "Notes must be reasonably sized")
    .nullable()
    .transform((v) => (v === null || v === "" ? undefined : v))
    .optional(),
  recurring: z.boolean().optional(),
  nextDate: dateField("Enter a valid next date").nullable().optional(),
  accountId: z
    .string()
    .trim()
    .max(64)
    .nullable()
    .transform((v) => (v === null || v === "" ? undefined : v))
    .optional(),
});

// ---- income sources -----------------------------------------------------------

export const incomeSourceCreateSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .trim()
    .min(1, "Name is required")
    .max(120, "Name must be reasonably sized"),
  type: enumField(
    INCOME_SOURCE_TYPES.map((t) => t.value),
    "Invalid income type",
  ).default("salary"),
  amount: moneyField("Amount is required"),
  frequency: enumField(
    INCOME_FREQUENCIES.map((f) => f.value),
    "Invalid frequency",
  ).default("monthly"),
  active: z.boolean().default(true),
  nextPaymentDate: dateField("Enter a valid next payment date").optional(),
  notes: z
    .string()
    .trim()
    .max(1000, "Notes must be reasonably sized")
    .transform((v) => (v === "" ? undefined : v))
    .optional(),
});

export const incomeSourceUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(120, "Name must be reasonably sized")
    .optional(),
  type: enumField(
    INCOME_SOURCE_TYPES.map((t) => t.value),
    "Invalid income type",
  ).optional(),
  amount: moneyField("Amount is required").optional(),
  frequency: enumField(
    INCOME_FREQUENCIES.map((f) => f.value),
    "Invalid frequency",
  ).optional(),
  active: z.boolean().optional(),
  nextPaymentDate: dateField("Enter a valid next payment date").nullable().optional(),
  notes: z
    .string()
    .trim()
    .max(1000, "Notes must be reasonably sized")
    .nullable()
    .transform((v) => (v === null || v === "" ? undefined : v))
    .optional(),
});

// ---- bank accounts --------------------------------------------------------------

export const bankAccountCreateSchema = z.object({
  name: z
    .string({ message: "Account name is required" })
    .trim()
    .min(1, "Account name is required")
    .max(120, "Account name must be reasonably sized"),
  type: enumField(
    ACCOUNT_TYPES.map((t) => t.value),
    "Invalid account type",
  ).default("checking"),
  institution: z
    .string()
    .trim()
    .max(120, "Institution must be reasonably sized")
    .transform((v) => (v === "" ? undefined : v))
    .optional(),
  balance: signedMoneyField("Balance is required").default(0),
  currency: enumField(
    CURRENCIES.map((c) => c.value),
    "Invalid currency",
  ).default("USD"),
  color: z
    .string()
    .trim()
    .regex(/^#[0-9a-fA-F]{6}$/, "Color must be a hex value like #3b82f6")
    .optional(),
});

export const bankAccountUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Account name is required")
    .max(120, "Account name must be reasonably sized")
    .optional(),
  type: enumField(
    ACCOUNT_TYPES.map((t) => t.value),
    "Invalid account type",
  ).optional(),
  institution: z
    .string()
    .trim()
    .max(120, "Institution must be reasonably sized")
    .nullable()
    .transform((v) => (v === null || v === "" ? undefined : v))
    .optional(),
  balance: signedMoneyField("Balance is required").optional(),
  currency: enumField(
    CURRENCIES.map((c) => c.value),
    "Invalid currency",
  ).optional(),
  color: z
    .string()
    .trim()
    .regex(/^#[0-9a-fA-F]{6}$/, "Color must be a hex value like #3b82f6")
    .nullable()
    .optional(),
});

// ---- investments -------------------------------------------------------------------

export const investmentCreateSchema = z.object({
  symbol: z
    .string({ message: "Symbol is required" })
    .trim()
    .min(1, "Symbol is required")
    .max(20, "Symbol must be reasonably sized")
    .transform((v) => v.toUpperCase()),
  name: z
    .string({ message: "Name is required" })
    .trim()
    .min(1, "Name is required")
    .max(160, "Name must be reasonably sized"),
  type: enumField(
    INVESTMENT_TYPES.map((t) => t.value),
    "Invalid investment type",
  ).default("stock"),
  shares: z
    .number({ message: "Shares is required" })
    .finite("Shares is required")
    .positive("Shares must be greater than zero")
    .max(1_000_000_000, "Shares is too large"),
  avgCost: moneyField("Cost per share is required"),
  currentValue: moneyField("Current price is required"),
  purchaseDate: dateField("Enter a valid purchase date").optional(),
  notes: z
    .string()
    .trim()
    .max(1000, "Notes must be reasonably sized")
    .transform((v) => (v === "" ? undefined : v))
    .optional(),
});

export const investmentUpdateSchema = z.object({
  symbol: z
    .string()
    .trim()
    .min(1, "Symbol is required")
    .max(20, "Symbol must be reasonably sized")
    .transform((v) => v.toUpperCase())
    .optional(),
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(160, "Name must be reasonably sized")
    .optional(),
  type: enumField(
    INVESTMENT_TYPES.map((t) => t.value),
    "Invalid investment type",
  ).optional(),
  shares: z
    .number()
    .finite()
    .positive("Shares must be greater than zero")
    .optional(),
  avgCost: moneyField("Cost per share is required").optional(),
  currentValue: moneyField("Current price is required").optional(),
  purchaseDate: dateField("Enter a valid purchase date").nullable().optional(),
  notes: z
    .string()
    .trim()
    .max(1000, "Notes must be reasonably sized")
    .nullable()
    .transform((v) => (v === null || v === "" ? undefined : v))
    .optional(),
});

// ---- goals ----------------------------------------------------------------------------

export const goalCreateSchema = z.object({
  name: z
    .string({ message: "Goal name is required" })
    .trim()
    .min(1, "Goal name is required")
    .max(120, "Goal name must be reasonably sized"),
  targetAmount: moneyField("Target amount is required"),
  currentAmount: moneyField("Current amount is required").default(0),
  targetDate: dateField("Enter a valid target date").optional(),
  category: enumField(
    GOAL_CATEGORIES.map((c) => c.value),
    "Invalid goal category",
  ).default("other"),
  status: enumField(["active", "completed", "paused"], "Invalid status").default("active"),
  icon: z.string().trim().max(40).optional(),
});

export const goalUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Goal name is required")
    .max(120, "Goal name must be reasonably sized")
    .optional(),
  targetAmount: moneyField("Target amount is required").optional(),
  currentAmount: moneyField("Current amount is required").optional(),
  targetDate: dateField("Enter a valid target date").nullable().optional(),
  category: enumField(
    GOAL_CATEGORIES.map((c) => c.value),
    "Invalid goal category",
  ).optional(),
  status: enumField(["active", "completed", "paused"], "Invalid status").optional(),
  icon: z.string().trim().max(40).nullable().optional(),
});

// ---- budgets -------------------------------------------------------------------------------

export const budgetUpsertSchema = z.object({
  category: z
    .string({ message: "Category is required" })
    .trim()
    .min(1, "Category is required")
    .max(80, "Category must be reasonably sized"),
  amount: moneyField("Amount is required"),
  period: enumField(["monthly"], "Invalid period").default("monthly"),
});

export const budgetDeleteSchema = z.object({
  category: z.string().trim().min(1).max(80),
});

// ---- settings (the singleton) ------------------------------------------------------------------

export const settingsUpdateSchema = z.object({
  defaultCurrency: enumField(
    CURRENCIES.map((c) => c.value),
    "Invalid currency",
  ).optional(),
  dateFormat: enumField(
    DATE_FORMATS.map((f) => f.value),
    "Invalid date format",
  ).optional(),
  pushNotifications: z.boolean().optional(),
  emailAlerts: z.boolean().optional(),
  budgetWarnings: z.boolean().optional(),
  monthlyReports: z.boolean().optional(),
  theme: enumField(["light", "dark", "system"], "Invalid theme").optional(),
});

export const profileUpdateSchema = z.object({
  name: z
    .string({ message: "Invalid name" })
    .trim()
    .min(1, "Invalid name")
    .max(80, "Invalid name"),
});

// ---- CSV import ----------------------------------------------------------------------------------

export const csvImportSchema = z.object({
  rows: z
    .array(
      z.object({
        description: z
          .string({ message: "Description is required" })
          .trim()
          .min(1, "Description is required")
          .max(200, "Description must be reasonably sized"),
        amount: moneyField("Amount is required"),
        type: enumField(["income", "expense"], "Invalid transaction type"),
        category: z.string().trim().max(80).default("Other"),
        budgetCategory: enumField(BUDGET_CATEGORIES, "Invalid budget category").default("needs"),
        date: dateField("Date is required"),
      }),
    )
    .min(1, "No valid rows to import")
    .max(5000, "Import is limited to 5000 rows"),
});

// ---- AI coach --------------------------------------------------------------------------------------

export const aiCoachSchema = z.object({
  question: z
    .string({ message: "Question is required" })
    .trim()
    .min(1, "Question is required")
    .max(500, "Question must be reasonably sized"),
  history: z
    .array(
      z.object({
        role: enumField(["user", "assistant"], "Invalid role"),
        content: z.string().max(4000),
      }),
    )
    .max(30)
    .default([]),
});

export type TransactionCreate = z.infer<typeof transactionCreateSchema>;
export type TransactionUpdate = z.infer<typeof transactionUpdateSchema>;
export type IncomeSourceCreate = z.infer<typeof incomeSourceCreateSchema>;
export type BankAccountCreate = z.infer<typeof bankAccountCreateSchema>;
export type InvestmentCreate = z.infer<typeof investmentCreateSchema>;
export type GoalCreate = z.infer<typeof goalCreateSchema>;
export type SettingsUpdate = z.infer<typeof settingsUpdateSchema>;
