// Shared client-side domain types (API wire shapes) — session-199
// (WealthOS finance domain).

export type Result<T, E> = { ok: true; data: T } | { ok: false; error: E };

export interface User {
  id: string;
  email: string;
  name: string;
  avatarColor: string;
  photoUrl: string | null;
  role: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense" | string;
  category: string;
  budgetCategory: string;
  date: string;
  notes: string | null;
  recurring: boolean;
  nextDate: string | null;
  accountId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IncomeSource {
  id: string;
  name: string;
  type: string;
  amount: number;
  frequency: string;
  active: boolean;
  nextPaymentDate: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BankAccount {
  id: string;
  name: string;
  type: string;
  institution: string | null;
  balance: number;
  currency: string;
  lastSyncedAt: string;
  color: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Investment {
  id: string;
  symbol: string;
  name: string;
  type: string;
  shares: number;
  avgCost: number;
  currentValue: number;
  purchaseDate: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string | null;
  category: string;
  status: string;
  icon: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  period: string;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  defaultCurrency: string;
  dateFormat: string;
  pushNotifications: boolean;
  emailAlerts: boolean;
  budgetWarnings: boolean;
  monthlyReports: boolean;
  theme: string;
}

export interface DashboardData {
  transactions: Transaction[];
  incomeSources: IncomeSource[];
  accounts: BankAccount[];
  investments: Investment[];
  goals: Goal[];
  budgets: Budget[];
  // Session-252 (R-49, F-252c): the full User shape — the F-251d
  // route projection widened past this Pick and left the store's
  // upcasts load-bearing (a future route narrowing would compile
  // silently); the type seam now matches the wire, and the casts are
  // gone from the store.
  user: User;
}

// Session-217 (R-14, F-217i): the SearchResults interface retired —
// R-13 deleted store.search (its only consumer) and this export was
// left with zero importers (the F-216j dead-export doctrine). The
// /api/search ROUTE stays — a real, owner-scoped API surface.

export interface InsightDto {
  id: string;
  tone: "positive" | "neutral" | "warning";
  title: string;
  body: string;
}
